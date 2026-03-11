// ============================================================================
// BRIDGE PBC — Shared Design Tokens
// Single source of truth for colors, layout constants, and breakpoints.
// ============================================================================

export const colors = {
  primary: "#1B4D3E",
  accent: "#B8D935",
  accentLight: "#E8F5E0",
  accentText: "#5C7A1F",
  accentDark: "#96B020",
  background: "#F3F5F2",
  white: "#FFFFFF",
  dark: "#191919",
  line: "#DEDEDE",
  muted: "#8A9E98",
  ctaGreen: "#2E5A4D",
  lightGreen: "#3D4F4F",
} as const;

export const layout = {
  maxWidth: "1200px",
  mobileBreakpoint: 768,
} as const;

export type Colors = typeof colors;
export type Layout = typeof layout;
