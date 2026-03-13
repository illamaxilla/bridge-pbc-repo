import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PaidRoute } from "../PaidRoute";

// ---------- Mock AuthContext ----------

const mockUseAuth = vi.fn();

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => mockUseAuth(),
}));

// ---------- Tests ----------

describe("PaidRoute", () => {
  it("shows loading state when loading is true", () => {
    mockUseAuth.mockReturnValue({ user: null, loading: true, tier: "public" });

    render(
      <MemoryRouter>
        <PaidRoute>
          <div>Paid content</div>
        </PaidRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByText("Paid content")).not.toBeInTheDocument();
  });

  it("redirects to /login when user is null", () => {
    mockUseAuth.mockReturnValue({ user: null, loading: false, tier: "public" });

    render(
      <MemoryRouter initialEntries={["/resources/impact-score"]}>
        <Routes>
          <Route
            path="/resources/impact-score"
            element={
              <PaidRoute>
                <div>Paid content</div>
              </PaidRoute>
            }
          />
          <Route path="/login" element={<div data-testid="login-page">Login</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText("Paid content")).not.toBeInTheDocument();
    expect(screen.getByTestId("login-page")).toBeInTheDocument();
  });

  it("redirects free-tier users to /membership", () => {
    mockUseAuth.mockReturnValue({
      user: { id: "user-1" },
      loading: false,
      tier: "free",
    });

    render(
      <MemoryRouter initialEntries={["/resources/impact-score"]}>
        <Routes>
          <Route
            path="/resources/impact-score"
            element={
              <PaidRoute>
                <div>Paid content</div>
              </PaidRoute>
            }
          />
          <Route path="/membership" element={<div data-testid="membership-page">Membership</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText("Paid content")).not.toBeInTheDocument();
    expect(screen.getByTestId("membership-page")).toBeInTheDocument();
  });

  it("renders children for paid-tier users", () => {
    mockUseAuth.mockReturnValue({
      user: { id: "user-1" },
      loading: false,
      tier: "paid",
    });

    render(
      <MemoryRouter>
        <PaidRoute>
          <div>Paid content</div>
        </PaidRoute>
      </MemoryRouter>
    );

    expect(screen.getByText("Paid content")).toBeInTheDocument();
  });

  it("does not show loading text when authenticated with paid tier", () => {
    mockUseAuth.mockReturnValue({
      user: { id: "user-1" },
      loading: false,
      tier: "paid",
    });

    render(
      <MemoryRouter>
        <PaidRoute>
          <div>Paid content</div>
        </PaidRoute>
      </MemoryRouter>
    );

    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.getByText("Paid content")).toBeInTheDocument();
  });
});
