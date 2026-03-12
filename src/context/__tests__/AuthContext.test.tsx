import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "../AuthContext";

// ---------- Mock Supabase ----------

let mockSession: any = null;
let authChangeCallback: ((event: string, session: any) => void) | null = null;
const mockUnsubscribe = vi.fn();

const mockSignInWithPassword = vi.fn();
const mockSignOut = vi.fn();

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      getSession: vi.fn(() => Promise.resolve({ data: { session: mockSession } })),
      onAuthStateChange: vi.fn((cb: any) => {
        authChangeCallback = cb;
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
    mockSession = null;
    authChangeCallback = null;
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
    mockSession = {
      user: { id: "user-123", user_metadata: {} },
    };

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
    mockSession = {
      user: { id: "user-paid", user_metadata: { membership_tier: "paid" } },
    };

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
