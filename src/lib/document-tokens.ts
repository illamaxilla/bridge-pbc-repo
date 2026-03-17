// ============================================================================
// BRIDGE PBC — Shared Document Page Tokens
// Single source of truth for the Lovable-generated BRIDGE_*.jsx pages.
// Import these instead of redefining C/F/etc. in every page.
// ============================================================================

/**
 * Light-mode color palette used by the majority of document pages.
 * Matches the local `C` object in Cannabis Licence, Budget, Impact Score, etc.
 */
export const DOC_COLORS = {
  ink: "#0D1A10",
  paper: "#FAF8F3",
  paperDark: "#F0EDE4",
  forest: "#1B4D3E",
  lime: "#B8D935",
  limeDark: "#8FA825",
  muted: "#5C6B5E",
  faint: "#9AAA9C",
  border: "#D8D4C8",
  teal: "#2E5A4D",
  red: "#A8200D",
  amber: "#B8730A",
  positive: "#1A6B2F",
  white: "#FFFFFF",
} as const;

/**
 * Dark-mode color palette used by tech/handoff documents.
 * Matches the local `C` object in AI Chat Dev Handoff, etc.
 */
export const DOC_COLORS_DARK = {
  bg: "#0D1A10",
  card: "rgba(255,255,255,0.04)",
  card2: "rgba(255,255,255,0.07)",
  lime: "#B8D935",
  forest: "#1B4D3E",
  teal: "#2E5A4D",
  paper: "#FAF8F3",
  muted: "rgba(250,248,243,0.55)",
  faint: "rgba(250,248,243,0.28)",
  line: "rgba(255,255,255,0.08)",
  red: "#C0392B",
  amber: "#D4890A",
  green: "#27AE60",
} as const;

/**
 * Document font stacks — matches the `F` object used across all JSX pages.
 */
export const DOC_FONTS = {
  display: '"Playfair Display","Georgia",serif',
  body: '"Source Serif 4","Georgia",serif',
  sans: '"DM Sans","Helvetica Neue",sans-serif',
  mono: '"DM Mono","Courier New",monospace',
} as const;

/** Short aliases matching the abbreviated F keys (d/b/s/m) used in some pages. */
export const DOC_FONTS_SHORT = {
  d: DOC_FONTS.display,
  b: DOC_FONTS.body,
  s: DOC_FONTS.sans,
  m: DOC_FONTS.mono,
} as const;

export type DocColors = typeof DOC_COLORS;
export type DocColorsDark = typeof DOC_COLORS_DARK;
export type DocFonts = typeof DOC_FONTS;
