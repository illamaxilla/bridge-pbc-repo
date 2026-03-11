import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SiteFooter from "../SiteFooter";

// Mock the supabase client so the component can import it without errors
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: () => ({
      insert: vi.fn().mockResolvedValue({ error: null }),
    }),
  },
}));

describe("SiteFooter", () => {
  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <SiteFooter />
      </MemoryRouter>
    );
    // The footer element should be in the document
    const footer = document.querySelector("footer");
    expect(footer).toBeInTheDocument();
  });

  it("contains the BRIDGE PBC copyright text", () => {
    render(
      <MemoryRouter>
        <SiteFooter />
      </MemoryRouter>
    );
    expect(screen.getByText(/BRIDGE PBC/)).toBeInTheDocument();
  });
});
