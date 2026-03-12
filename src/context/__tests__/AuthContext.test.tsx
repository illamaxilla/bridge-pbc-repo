import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "../AuthContext";

// ---------- Mock supabase client ----------

const mockGetSession = vi.fn();
const mockOnAuthStateChange = vi.fn();
const mockSignInWithPassword = vi.fn();
const mockSignOut = vi.fn();

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      getSession: (...args: unknown[]) => mockGetSession(...args),
      onAuthStateChange: (...args: unknown[]) => mockOnAuthStateChange(...args),
      signInWithPassword: (...args: unknown[]) => mockSignInWithPassword(...args),
      signOut: (...args: unknown[]) => mockSignOut(...args),
    },
  },
}));

// ---------- Helpers ----------

/** A component that exposes auth state for assertions. */
function AuthConsumer() {
  const { user, loading, tier, signIn, signOut } = useAuth();
  return (
    <div>
      <span data-testid="loading">{String(loading)}</span>
      <span data-testid="tier">{tier}</span>
      <span data-testid="user">{user ? user.id : "none"}</span>
      <button onClick={() => signIn("a@b.com", "pw")}>Sign In</button>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}

// ---------- Tests ----------

describe("AuthContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Default: no session
    mockGetSession.mockResolvedValue({ data: { session: null } });
    mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: vi.fn() } },
    });
    mockSignInWithPassword.mockResolvedValue({ error: null });
    mockSignOut.mockResolvedValue({ error: null });
  });

  it("throws when useAuth is used outside AuthProvider", () => {
    // Suppress console.error from React error boundary
    const originalConsoleError = console.error;
    console.error = vi.fn();

    expect(() => render(<AuthConsumer />)).toThrow(
      "useAuth must be used within an AuthProvider"
    );

    console.error = originalConsoleError;
  });

  it("starts with loading=true", () => {
    // Prevent getSession from resolving so loading stays true
    mockGetSession.mockReturnValue(new Promise(() => {}));

    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId("loading").textContent).toBe("true");
  });

  it('defaults tier to "public" when there is no session', async () => {
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    expect(screen.getByTestId("tier").textContent).toBe("public");
    expect(screen.getByTestId("user").textContent).toBe("none");
  });

  it("signIn calls supabase.auth.signInWithPassword", async () => {
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => {
      expect(mockSignInWithPassword).toHaveBeenCalledWith({
        email: "a@b.com",
        password: "pw",
      });
    });
  });

  it("signOut calls supabase.auth.signOut", async () => {
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign Out" }));

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
    });
  });

  it('resolves tier to "free" for authenticated user without tier metadata', async () => {
    mockGetSession.mockResolvedValue({
      data: {
        session: {
          user: { id: "user-1", user_metadata: {} },
        },
      },
    });

    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    expect(screen.getByTestId("tier").textContent).toBe("free");
    expect(screen.getByTestId("user").textContent).toBe("user-1");
  });

  it('resolves tier to "paid" for user with membership_tier = "paid"', async () => {
    mockGetSession.mockResolvedValue({
      data: {
        session: {
          user: { id: "user-2", user_metadata: { membership_tier: "paid" } },
        },
      },
    });

    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    expect(screen.getByTestId("tier").textContent).toBe("paid");
  });
});
