// ============================================================================
// BRIDGE PBC — Shared Document Page Tokens
// Single source of truth for the Lovable-generated BRIDGE_*.jsx pages.
// Import these instead of redefining C/F/etc. in every page.
// ============================================================================

/**
 * Document color palette — matches the `C` object used across all JSX pages.
 * Use `DOC_COLORS` (or alias as `C`) to replace per-page redefinitions.
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
  white: "#FFFFFF",
  dark: "#191919",
  red: "#C0392B",
  gold: "#D4A843",
  teal: "#1A8C7B",
  blue: "#2471A3",
} as const;

/**
 * Document font stacks — matches the `F` object used across all JSX pages.
 * Use `DOC_FONTS` (or alias as `F`) to replace per-page redefinitions.
 */
export const DOC_FONTS = {
  display: '"Playfair Display","Georgia",serif',
  body: '"Source Serif 4","Georgia",serif',
  sans: '"DM Sans","Helvetica Neue",sans-serif',
  mono: '"DM Mono","Courier New",monospace',
  serif: '"DM Serif Display","Georgia",serif',
} as const;

export type DocColors = typeof DOC_COLORS;
export type DocFonts = typeof DOC_FONTS;
