// ─── Shared Design Tokens ────────────────────────────────────────────────────
// Centralized color and font tokens used across all BRIDGE pages and components.
// Replaces the duplicated `const C = {...}` and `const F = {...}` patterns.

/** Intelligence/report page color palette (used by BRIDGE_*.jsx pages) */
export const C = {
  ink: '#0D1A10',
  paper: '#FAF8F3',
  paperDark: '#F0EDE4',
  forest: '#1B4D3E',
  lime: '#B8D935',
  limeDark: '#8FA825',
  muted: '#5C6B5E',
  faint: '#9AAA9C',
  border: '#D8D4C8',
  teal: '#2E5A4D',
  red: '#A8200D',
  amber: '#B8730A',
  positive: '#1A6B2F',
  white: '#FFFFFF',
  // Aliases used by paid document pages
  deep: '#0D1A10',
  cover: '#0D1A10',
  primary: '#1B4D3E',
  accent: '#B8D935',
  bg: '#FAF8F3',
  card: '#F0EDE4',
  subtle: '#5C6B5E',
  text: '#2A2A2A',
  line: '#D8D4C8',
} as const;

/** Font stack tokens (used by BRIDGE_*.jsx pages) */
export const F = {
  display: '"Playfair Display","Georgia",serif',
  body: '"Source Serif 4","Georgia",serif',
  sans: '"DM Sans","Helvetica Neue",sans-serif',
  mono: '"DM Mono","Courier New",monospace',
} as const;

/** Membership/modal color palette (used by modals, FAQ, membership pages) */
export const colors = {
  primary: '#1B4D3E',
  primaryDark: '#163f32',
  primaryDeep: '#0f2e24',
  accent: '#B8D935',
  accentLight: '#E8F5E0',
  accentDark: '#8FA825',
  accentText: '#5C7A1F',
  bg: '#F3F5F2',
  background: '#F3F5F2',
  paperDark: '#ECEDE8',
  white: '#FFFFFF',
  dark: '#191919',
  ink: '#0D1A10',
  mid: '#666666',
  faint: '#999999',
  muted: '#6B8078',
  line: '#DEDEDE',
  lineStrong: '#C8C8C8',
  teal: '#2E5A4D',
} as const;

export const CONTENT_MAX_WIDTH = '1200px';
