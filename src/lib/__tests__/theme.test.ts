import { describe, it, expect } from "vitest";
import { colors, layout } from "../theme";

describe("theme colors", () => {
  it("exports a colors object with expected keys", () => {
    const expectedKeys = [
      "primary", "accent", "accentLight", "accentText", "accentDark",
      "background", "white", "dark", "line", "muted", "ctaGreen", "lightGreen",
    ];
    expectedKeys.forEach((key) => {
      expect(colors).toHaveProperty(key);
    });
  });

  it("all color values are valid hex color strings", () => {
    const hexRegex = /^#[0-9A-Fa-f]{6}$/;
    Object.entries(colors).forEach(([key, value]) => {
      expect(value, `${key} should be a valid hex color`).toMatch(hexRegex);
    });
  });

  it("primary color is the expected brand green", () => {
    expect(colors.primary).toBe("#1B4D3E");
  });

  it("accent color is the expected lime green", () => {
    expect(colors.accent).toBe("#B8D935");
  });

  it("white is #FFFFFF", () => {
    expect(colors.white).toBe("#FFFFFF");
  });
});

describe("theme layout", () => {
  it("exports a layout object with maxWidth and mobileBreakpoint", () => {
    expect(layout).toHaveProperty("maxWidth");
    expect(layout).toHaveProperty("mobileBreakpoint");
  });

  it("maxWidth is a valid CSS pixel string", () => {
    expect(layout.maxWidth).toMatch(/^\d+px$/);
  });

  it("mobileBreakpoint is a positive number", () => {
    expect(typeof layout.mobileBreakpoint).toBe("number");
    expect(layout.mobileBreakpoint).toBeGreaterThan(0);
  });

  it("mobileBreakpoint is a reasonable value (between 320 and 1024)", () => {
    expect(layout.mobileBreakpoint).toBeGreaterThanOrEqual(320);
    expect(layout.mobileBreakpoint).toBeLessThanOrEqual(1024);
  });

  it("maxWidth numeric value is greater than mobileBreakpoint", () => {
    const maxWidthNum = parseInt(layout.maxWidth, 10);
    expect(maxWidthNum).toBeGreaterThan(layout.mobileBreakpoint);
  });
});
