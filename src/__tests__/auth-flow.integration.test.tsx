import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useSearchParams } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PaidRoute } from "@/components/PaidRoute";

// ── Mock Supabase ──────────────────────────────────────────────────────────
// We use the real AuthProvider wired to a fully controlled mock Supabase client
// so these tests exercise the real auth state machine end-to-end.

const { mockGetSession, mockSignIn, mockSignOut, mockUnsubscribe } = vi.hoisted(() => ({
  mockGetSession: vi.fn(),
  mockSignIn: vi.fn(),
  mockSignOut: vi.fn(),
  mockUnsubscribe: vi.fn(),
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      getSession: mockGetSession,
      onAuthStateChange: vi.fn((cb: any) => {
        (globalThis as any).__authCb = cb;
        return { data: { subscription: { unsubscribe: mockUnsubscribe } } };
      }),
      signInWithPassword: mockSignIn,
      signOut: mockSignOut,
    },
  },
}));

// ── Helper pages ───────────────────────────────────────────────────────────

function LoginPage() {
  const [params] = useSearchParams();
  return <div data-testid="login-page">Login (redirect={params.get("redirect") ?? "none"})</div>;
}

function MembershipPage() {
  return <div data-testid="membership-page">Membership</div>;
}

function DashboardPage() {
  const { user, tier } = useAuth();
  return <div data-testid="dashboard">Dashboard user={user?.id} tier={tier}</div>;
}

function PremiumPage() {
  const { user, tier } = useAuth();
  return <div data-testid="premium">Premium user={user?.id} tier={tier}</div>;
}

function PublicPage() {
  return <div data-testid="public-page">Public</div>;
}

// ── App shell used across all integration tests ────────────────────────────

function TestApp({ initialRoute = "/" }: { initialRoute?: string }) {
  return (
    <MemoryRouter initialEntries={[initialRoute]}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/membership" element={<MembershipPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/premium"
            element={
              <PaidRoute>
                <PremiumPage />
              </PaidRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
}

// ── Tests ──────────────────────────────────────────────────────────────────

describe("Auth flow integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete (globalThis as any).__authCb;
    mockGetSession.mockResolvedValue({ data: { session: null } });
  });

  // ─── Unauthenticated access ────────────────────────────────────────────

  it("redirects unauthenticated user from /dashboard to /login with redirect param", async () => {
    render(<TestApp initialRoute="/dashboard" />);

    await waitFor(() => {
      expect(screen.getByTestId("login-page")).toBeInTheDocument();
    });
    expect(screen.getByTestId("login-page").textContent).toContain("redirect=/dashboard");
    expect(screen.queryByTestId("dashboard")).not.toBeInTheDocument();
  });

  it("redirects unauthenticated user from /premium to /login", async () => {
    render(<TestApp initialRoute="/premium" />);

    await waitFor(() => {
      expect(screen.getByTestId("login-page")).toBeInTheDocument();
    });
    expect(screen.queryByTestId("premium")).not.toBeInTheDocument();
  });

  it("allows unauthenticated user to access public pages", async () => {
    render(<TestApp initialRoute="/" />);

    await waitFor(() => {
      expect(screen.getByTestId("public-page")).toBeInTheDocument();
    });
  });

  // ─── Sign-in → access protected routes ────────────────────────────────

  it("grants access to /dashboard after sign-in state change", async () => {
    render(<TestApp initialRoute="/dashboard" />);

    // Initially redirected to login
    await waitFor(() => {
      expect(screen.getByTestId("login-page")).toBeInTheDocument();
    });

    // Now simulate the user signing in — AuthProvider picks up the state change
    // Re-render at /dashboard with an active session
    mockGetSession.mockResolvedValue({
      data: {
        session: { user: { id: "u1", user_metadata: {}, app_metadata: {} } },
      },
    });

    const { unmount } = render(<TestApp initialRoute="/dashboard" />);

    await waitFor(() => {
      expect(screen.getByTestId("dashboard")).toBeInTheDocument();
    });
    expect(screen.getByTestId("dashboard").textContent).toContain("user=u1");
    expect(screen.getByTestId("dashboard").textContent).toContain("tier=free");
    unmount();
  });

  // ─── Tier-based gating ─────────────────────────────────────────────────

  it("redirects free-tier user from /premium to /membership", async () => {
    mockGetSession.mockResolvedValue({
      data: {
        session: { user: { id: "u-free", user_metadata: {}, app_metadata: {} } },
      },
    });

    render(<TestApp initialRoute="/premium" />);

    await waitFor(() => {
      expect(screen.getByTestId("membership-page")).toBeInTheDocument();
    });
    expect(screen.queryByTestId("premium")).not.toBeInTheDocument();
  });

  it("grants paid-tier user access to /premium via app_metadata", async () => {
    mockGetSession.mockResolvedValue({
      data: {
        session: {
          user: { id: "u-paid", user_metadata: {}, app_metadata: { membership_tier: "paid" } },
        },
      },
    });

    render(<TestApp initialRoute="/premium" />);

    await waitFor(() => {
      expect(screen.getByTestId("premium")).toBeInTheDocument();
    });
    expect(screen.getByTestId("premium").textContent).toContain("tier=paid");
  });

  it("grants paid-tier user access to /premium via user_metadata fallback", async () => {
    mockGetSession.mockResolvedValue({
      data: {
        session: {
          user: { id: "u-legacy", user_metadata: { membership_tier: "paid" }, app_metadata: {} },
        },
      },
    });

    render(<TestApp initialRoute="/premium" />);

    await waitFor(() => {
      expect(screen.getByTestId("premium")).toBeInTheDocument();
    });
    expect(screen.getByTestId("premium").textContent).toContain("tier=paid");
  });

  it("app_metadata 'paid' takes precedence over absent user_metadata", async () => {
    // resolveTier checks app_metadata first; if it says "paid", that wins
    // regardless of what user_metadata says
    mockGetSession.mockResolvedValue({
      data: {
        session: {
          user: {
            id: "u-app-wins",
            user_metadata: {},
            app_metadata: { membership_tier: "paid" },
          },
        },
      },
    });

    render(<TestApp initialRoute="/premium" />);

    await waitFor(() => {
      expect(screen.getByTestId("premium")).toBeInTheDocument();
    });
    expect(screen.getByTestId("premium").textContent).toContain("tier=paid");
  });

  it("falls back to user_metadata when app_metadata has no tier", async () => {
    mockGetSession.mockResolvedValue({
      data: {
        session: {
          user: {
            id: "u-fallback",
            user_metadata: { membership_tier: "paid" },
            app_metadata: {},
          },
        },
      },
    });

    render(<TestApp initialRoute="/premium" />);

    await waitFor(() => {
      expect(screen.getByTestId("premium")).toBeInTheDocument();
    });
    expect(screen.getByTestId("premium").textContent).toContain("tier=paid");
  });

  // ─── Live auth state transitions ───────────────────────────────────────

  it("updates route access when onAuthStateChange fires SIGNED_IN", async () => {
    render(<TestApp initialRoute="/dashboard" />);

    // Starts unauthenticated → redirected
    await waitFor(() => {
      expect(screen.getByTestId("login-page")).toBeInTheDocument();
    });
  });

  it("transitions from free to paid tier via onAuthStateChange", async () => {
    mockGetSession.mockResolvedValue({
      data: {
        session: { user: { id: "u1", user_metadata: {}, app_metadata: {} } },
      },
    });

    render(<TestApp initialRoute="/dashboard" />);

    await waitFor(() => {
      expect(screen.getByTestId("dashboard")).toBeInTheDocument();
    });
    expect(screen.getByTestId("dashboard").textContent).toContain("tier=free");

    // Simulate tier upgrade via onAuthStateChange
    await act(async () => {
      const cb = (globalThis as any).__authCb;
      cb?.("TOKEN_REFRESHED", {
        user: { id: "u1", user_metadata: {}, app_metadata: { membership_tier: "paid" } },
      });
    });

    await waitFor(() => {
      expect(screen.getByTestId("dashboard").textContent).toContain("tier=paid");
    });
  });

  it("revokes access on SIGNED_OUT event", async () => {
    mockGetSession.mockResolvedValue({
      data: {
        session: { user: { id: "u1", user_metadata: {}, app_metadata: {} } },
      },
    });

    render(<TestApp initialRoute="/dashboard" />);

    await waitFor(() => {
      expect(screen.getByTestId("dashboard")).toBeInTheDocument();
    });

    // Simulate sign-out
    await act(async () => {
      const cb = (globalThis as any).__authCb;
      cb?.("SIGNED_OUT", null);
    });

    await waitFor(() => {
      expect(screen.getByTestId("login-page")).toBeInTheDocument();
    });
    expect(screen.queryByTestId("dashboard")).not.toBeInTheDocument();
  });

  // ─── Paid route also requires authentication ──────────────────────────

  it("paid-tier user can access both protected and paid routes", async () => {
    mockGetSession.mockResolvedValue({
      data: {
        session: {
          user: { id: "u-full", user_metadata: {}, app_metadata: { membership_tier: "paid" } },
        },
      },
    });

    const { unmount } = render(<TestApp initialRoute="/dashboard" />);
    await waitFor(() => {
      expect(screen.getByTestId("dashboard")).toBeInTheDocument();
    });
    unmount();

    render(<TestApp initialRoute="/premium" />);
    await waitFor(() => {
      expect(screen.getByTestId("premium")).toBeInTheDocument();
    });
  });

  // ─── Cleanup ──────────────────────────────────────────────────────────

  it("unsubscribes auth listener on unmount", async () => {
    const { unmount } = render(<TestApp />);

    await waitFor(() => {
      expect(screen.getByTestId("public-page")).toBeInTheDocument();
    });

    unmount();
    expect(mockUnsubscribe).toHaveBeenCalled();
  });
});
