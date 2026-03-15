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

// Mock SearchModal — renders a testable placeholder when open
vi.mock("@/components/SearchModal", () => ({
  SearchModal: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) =>
    isOpen ? (
      <div data-testid="search-modal">
        <button aria-label="Close search" onClick={onClose} />
      </div>
    ) : null,
  default: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) =>
    isOpen ? (
      <div data-testid="search-modal">
        <button aria-label="Close search" onClick={onClose} />
      </div>
    ) : null,
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

  it("opens search modal when search button is clicked", () => {
    renderHeader();
    fireEvent.click(screen.getByLabelText("Search"));

    expect(screen.getByTestId("search-modal")).toBeInTheDocument();
  });

  it("closes search modal when close button is clicked", () => {
    renderHeader();
    fireEvent.click(screen.getByLabelText("Search"));
    expect(screen.getByTestId("search-modal")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Close search"));
    expect(screen.queryByTestId("search-modal")).not.toBeInTheDocument();
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
