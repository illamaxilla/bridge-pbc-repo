import { describe, it, expect } from "vitest";
import { colors, layout } from "../theme";

describe("theme", () => {
  describe("colors", () => {
    it("exports primary color", () => {
      expect(colors.primary).toBe("#1B4D3E");
    });

    it("exports accent color", () => {
      expect(colors.accent).toBe("#B8D935");
    });

    it("has all expected color keys", () => {
      const keys = Object.keys(colors);
      expect(keys).toContain("primary");
      expect(keys).toContain("accent");
      expect(keys).toContain("background");
      expect(keys).toContain("white");
      expect(keys).toContain("dark");
    });
  });

  describe("layout", () => {
    it("exports maxWidth", () => {
      expect(layout.maxWidth).toBe("1200px");
    });

    it("exports mobileBreakpoint", () => {
      expect(layout.mobileBreakpoint).toBe(768);
    });
  });
});
