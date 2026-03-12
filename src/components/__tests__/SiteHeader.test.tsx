import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SiteHeader from "../SiteHeader";

// Mock useScrollLock to avoid module-level lockCount side effects
vi.mock("@/hooks/useScrollLock", () => ({
  useScrollLock: vi.fn(),
}));

// Mock BridgeLogo to simplify rendering
vi.mock("@/components/BridgeLogo", () => ({
  BridgeLogo: ({ height }: { height: number }) => (
    <div data-testid="bridge-logo" style={{ height }} />
  ),
}));

describe("SiteHeader", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function renderHeader(route = "/") {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <SiteHeader />
      </MemoryRouter>
    );
  }

  it("renders the logo", () => {
    renderHeader();
    expect(screen.getByTestId("bridge-logo")).toBeInTheDocument();
  });

  it("renders search, account, and menu toggle buttons", () => {
    renderHeader();
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
    expect(screen.getByLabelText("Account")).toBeInTheDocument();
    expect(screen.getByLabelText("Toggle menu")).toBeInTheDocument();
  });

  it("menu toggle has aria-expanded=false initially", () => {
    renderHeader();
    const menuBtn = screen.getByLabelText("Toggle menu");
    expect(menuBtn.getAttribute("aria-expanded")).toBe("false");
  });

  it("opens the navigation overlay when menu toggle is clicked", () => {
    renderHeader();
    const menuBtn = screen.getByLabelText("Toggle menu");
    fireEvent.click(menuBtn);

    expect(menuBtn.getAttribute("aria-expanded")).toBe("true");
    // Navigation links should appear
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Sectors")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("shows all 11 nav items when menu is open", () => {
    renderHeader();
    fireEvent.click(screen.getByLabelText("Toggle menu"));

    const expectedLabels = [
      "Home", "About", "Methodology", "Services", "Sectors",
      "Insight", "BRIDGE Intelligence", "Community", "Resources",
      "Contact", "Policy Updates",
    ];
    expectedLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it("opens search overlay when search button is clicked", () => {
    renderHeader();
    fireEvent.click(screen.getByLabelText("Search"));

    expect(screen.getByPlaceholderText("Search pages and sectors...")).toBeInTheDocument();
    expect(screen.getByLabelText("Close search")).toBeInTheDocument();
  });

  it("closes search overlay when close button is clicked", () => {
    renderHeader();
    fireEvent.click(screen.getByLabelText("Search"));
    expect(screen.getByPlaceholderText("Search pages and sectors...")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Close search"));
    expect(screen.queryByPlaceholderText("Search pages and sectors...")).not.toBeInTheDocument();
  });

  it("filters search results by query", () => {
    renderHeader();
    fireEvent.click(screen.getByLabelText("Search"));

    const input = screen.getByPlaceholderText("Search pages and sectors...");
    fireEvent.change(input, { target: { value: "Energy" } });

    // Should show Energy & Renewables but not e.g. "About"
    expect(screen.getByText("Energy & Renewables")).toBeInTheDocument();
    // "About" should not be shown when filtering for "Energy"
    expect(screen.queryByText("About")).not.toBeInTheDocument();
  });

  it("shows 'No results' when search query has no matches", () => {
    renderHeader();
    fireEvent.click(screen.getByLabelText("Search"));

    const input = screen.getByPlaceholderText("Search pages and sectors...");
    fireEvent.change(input, { target: { value: "xyznonexistent" } });

    expect(screen.getByText(/No results for/)).toBeInTheDocument();
  });

  it("closes menu when Escape key is pressed", () => {
    renderHeader();
    fireEvent.click(screen.getByLabelText("Toggle menu"));
    expect(screen.getByText("Home")).toBeInTheDocument();

    fireEvent.keyDown(window, { key: "Escape" });
    // Menu should be closed — nav items should be gone
    expect(screen.queryByText("Request Access")).not.toBeInTheDocument();
  });

  it("shows Request Access CTA in the menu overlay", () => {
    renderHeader();
    fireEvent.click(screen.getByLabelText("Toggle menu"));
    expect(screen.getByText("Request Access")).toBeInTheDocument();
  });
});
