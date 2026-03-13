import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ReportViewer from "../ReportViewer";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

function renderViewer(props: Partial<React.ComponentProps<typeof ReportViewer>> = {}) {
  return render(
    <MemoryRouter>
      <ReportViewer
        src="/reports/test.html"
        title="Test Report"
        {...props}
      />
    </MemoryRouter>
  );
}

describe("ReportViewer", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders iframe with correct src and title", () => {
    renderViewer();
    const iframe = screen.getByTitle("Test Report");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", "/reports/test.html");
  });

  it("iframe has sandbox attribute for security", () => {
    renderViewer();
    const iframe = screen.getByTitle("Test Report");
    expect(iframe).toHaveAttribute("sandbox", "allow-same-origin");
  });

  it("displays the title text", () => {
    renderViewer();
    expect(screen.getByText("Test Report")).toBeInTheDocument();
  });

  it("navigates to default backTo on back button click", () => {
    renderViewer();
    const backBtn = screen.getByText("Back to Resources");
    fireEvent.click(backBtn);
    expect(mockNavigate).toHaveBeenCalledWith("/resources");
  });

  it("uses custom backTo and backLabel", () => {
    renderViewer({ backTo: "/sectors", backLabel: "Back to Sectors" });
    const backBtn = screen.getByText("Back to Sectors");
    fireEvent.click(backBtn);
    expect(mockNavigate).toHaveBeenCalledWith("/sectors");
  });
});
