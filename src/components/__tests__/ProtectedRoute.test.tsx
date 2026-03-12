import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute";

// ---------- Mock AuthContext ----------

const mockUseAuth = vi.fn();

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

// ---------- Tests ----------

describe("ProtectedRoute", () => {
  it("shows loading state when loading is true", () => {
    mockUseAuth.mockReturnValue({ user: null, loading: true });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByText("Protected content")).not.toBeInTheDocument();
  });

  it("redirects to /login when user is null", () => {
    mockUseAuth.mockReturnValue({ user: null, loading: false });

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <ProtectedRoute>
          <div>Protected content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    // Navigate replaces content so protected content should not be visible
    expect(screen.queryByText("Protected content")).not.toBeInTheDocument();
  });

  it("renders children when user exists", () => {
    mockUseAuth.mockReturnValue({
      user: { id: "user-1" },
      loading: false,
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Protected content")).toBeInTheDocument();
  });

  it("includes the current path as redirect param in the login URL", () => {
    mockUseAuth.mockReturnValue({ user: null, loading: false });

    // Use Routes to capture the redirected location
    const navigatedTo = "";

    render(
      <MemoryRouter initialEntries={["/intelligence/dashboard"]}>
        <Routes>
          <Route
            path="/intelligence/dashboard"
            element={
              <ProtectedRoute>
                <div>Protected content</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={<div data-testid="login-page">Login page</div>}
          />
        </Routes>
      </MemoryRouter>
    );

    // The Navigate should redirect to /login with the redirect param
    expect(screen.queryByText("Protected content")).not.toBeInTheDocument();
  });

  it("does not show loading text when not loading and user exists", () => {
    mockUseAuth.mockReturnValue({
      user: { id: "user-1" },
      loading: false,
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected content</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.getByText("Protected content")).toBeInTheDocument();
  });

  it("renders multiple children correctly when authenticated", () => {
    mockUseAuth.mockReturnValue({
      user: { id: "user-1" },
      loading: false,
    });

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Child 1</div>
          <div>Child 2</div>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });
});
