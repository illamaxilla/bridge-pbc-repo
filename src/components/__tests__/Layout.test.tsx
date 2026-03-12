import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Layout } from "../Layout";

// Mock SiteHeader and SiteFooter to simplify
vi.mock("../SiteHeader", () => ({
  default: () => <header data-testid="site-header">Header</header>,
}));
vi.mock("../SiteFooter", () => ({
  default: () => <footer data-testid="site-footer">Footer</footer>,
}));

function renderLayout(props: { hideFooter?: boolean } = {}) {
  return render(
    <MemoryRouter>
      <Layout {...props}>
        <div>Page content</div>
      </Layout>
    </MemoryRouter>
  );
}

describe("Layout", () => {
  it("renders children inside main element", () => {
    renderLayout();
    expect(screen.getByText("Page content")).toBeInTheDocument();
    expect(screen.getByRole("main")).toContainElement(
      screen.getByText("Page content")
    );
  });

  it("renders header and footer by default", () => {
    renderLayout();
    expect(screen.getByTestId("site-header")).toBeInTheDocument();
    expect(screen.getByTestId("site-footer")).toBeInTheDocument();
  });

  it("hides footer when hideFooter is true", () => {
    renderLayout({ hideFooter: true });
    expect(screen.getByTestId("site-header")).toBeInTheDocument();
    expect(screen.queryByTestId("site-footer")).not.toBeInTheDocument();
  });

  it("has a skip-to-content link", () => {
    renderLayout();
    const skipLink = screen.getByText("Skip to content");
    expect(skipLink).toHaveAttribute("href", "#main-content");
  });

  it("main has id for skip link target", () => {
    renderLayout();
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
  });
});
