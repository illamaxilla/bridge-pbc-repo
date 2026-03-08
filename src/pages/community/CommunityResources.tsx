// ─── COMMUNITY: RESOURCES PAGE ──────────────────────────────────
// This is a placeholder. Paste your Resources page JSX below.
// Props: C (design tokens) and font (font tokens) are passed from
// the parent CommunityDashboard so you don't need to redefine them.

import { BookOpen } from "lucide-react";

interface CommunityResourcesPageProps {
  C: {
    primary: string; accent: string; accentDark: string; bg: string;
    white: string; dark: string; line: string; muted: string; text: string;
    cardShadow: string; deepShadow: string;
  };
  font: { display: string; body: string };
}

export default function CommunityResourcesPage({ C, font }: CommunityResourcesPageProps) {
  // ─────────────────────────────────────────────────────────────
  // PASTE YOUR RESOURCES PAGE CODE HERE
  // Replace everything below (including the placeholder return) with
  // your full Resources page JSX. Keep the function signature above.
  // ─────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        background: C.white,
        borderRadius: 20,
        padding: 48,
        boxShadow: C.cardShadow,
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 16 }}>📚</div>
      <h2
        style={{
          fontFamily: font.display,
          fontSize: 26,
          fontWeight: 700,
          color: C.primary,
          margin: "0 0 12px",
        }}
      >
        Community Resources
      </h2>
      <p
        style={{
          fontSize: 15,
          color: C.muted,
          maxWidth: 420,
          margin: "0 auto 28px",
          lineHeight: 1.6,
        }}
      >
        Guides, sector briefs, toolkits, and knowledge assets curated for
        BRIDGE community members. Coming soon.
      </p>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 24px",
          borderRadius: 20,
          background: C.accent + "22",
          border: `1.5px solid ${C.accent}`,
          color: C.primary,
          fontWeight: 700,
          fontSize: 13,
          fontFamily: font.body,
        }}
      >
        <BookOpen size={14} /> Coming Soon
      </div>
    </div>
  );
}
