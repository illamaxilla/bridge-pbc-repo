import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "../AuthContext";

// ---------- Mock Supabase ----------
// vi.hoisted ensures these are available when vi.mock is hoisted to top of file

const { mockSignInWithPassword, mockSignOut, mockUnsubscribe, getMockSession, setMockSession, getAuthChangeCallback } = vi.hoisted(() => {
  let _mockSession: any = null;
  let _authChangeCallback: ((event: string, session: any) => void) | null = null;
  return {
    mockSignInWithPassword: vi.fn(),
    mockSignOut: vi.fn(),
    mockUnsubscribe: vi.fn(),
    getMockSession: () => _mockSession,
    setMockSession: (s: any) => { _mockSession = s; },
    getAuthChangeCallback: () => _authChangeCallback,
  };
});

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      getSession: vi.fn(() => Promise.resolve({ data: { session: getMockSession() } })),
      onAuthStateChange: vi.fn((cb: any) => {
        // Store the callback so tests can trigger auth state changes
        // We use a side-channel via the hoisted module
        (globalThis as any).__authChangeCallback = cb;
        return { data: { subscription: { unsubscribe: mockUnsubscribe } } };
      }),
      signInWithPassword: mockSignInWithPassword,
      signOut: mockSignOut,
    },
  },
}));

// ---------- Helper component to read context ----------

function AuthConsumer() {
  const { user, loading, tier, signIn, signOut } = useAuth();
  return (
    <div>
      <span data-testid="loading">{String(loading)}</span>
      <span data-testid="user">{user ? user.id : "null"}</span>
      <span data-testid="tier">{tier}</span>
      <button onClick={() => signIn("a@b.com", "pw")}>Sign In</button>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}

// ---------- Tests ----------

describe("AuthContext", () => {
  beforeEach(() => {
    setMockSession(null);
    delete (globalThis as any).__authChangeCallback;
    vi.clearAllMocks();
  });

  it("provides default public state when no session exists", async () => {
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    expect(screen.getByTestId("user").textContent).toBe("null");
    expect(screen.getByTestId("tier").textContent).toBe("public");
  });

  it("provides user and free tier when session has a user without paid metadata", async () => {
    setMockSession({
      user: { id: "user-123", user_metadata: {} },
    });

    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    expect(screen.getByTestId("user").textContent).toBe("user-123");
    expect(screen.getByTestId("tier").textContent).toBe("free");
  });

  it("resolves paid tier from user metadata", async () => {
    setMockSession({
      user: { id: "user-paid", user_metadata: { membership_tier: "paid" } },
    });

    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("tier").textContent).toBe("paid");
    });
  });

  it("calls supabase signInWithPassword when signIn is invoked", async () => {
    mockSignInWithPassword.mockResolvedValue({ error: null });

    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    await act(async () => {
      screen.getByText("Sign In").click();
    });

    expect(mockSignInWithPassword).toHaveBeenCalledWith({
      email: "a@b.com",
      password: "pw",
    });
  });

  it("calls supabase signOut when signOut is invoked", async () => {
    mockSignOut.mockResolvedValue({ error: null });

    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    await act(async () => {
      screen.getByText("Sign Out").click();
    });

    expect(mockSignOut).toHaveBeenCalled();
  });

  it("updates state when onAuthStateChange fires", async () => {
    render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    expect(screen.getByTestId("user").textContent).toBe("null");

    const authChangeCallback = (globalThis as any).__authChangeCallback;

    // Simulate auth state change
    await act(async () => {
      authChangeCallback?.("SIGNED_IN", {
        user: { id: "new-user", user_metadata: {} },
      });
    });

    expect(screen.getByTestId("user").textContent).toBe("new-user");
    expect(screen.getByTestId("tier").textContent).toBe("free");
  });

  it("unsubscribes from auth listener on unmount", async () => {
    const { unmount } = render(
      <AuthProvider>
        <AuthConsumer />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false");
    });

    unmount();
    expect(mockUnsubscribe).toHaveBeenCalled();
  });

  it("throws when useAuth is called outside AuthProvider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<AuthConsumer />)).toThrow(
      "useAuth must be used within an AuthProvider"
    );

    spy.mockRestore();
  });
});
