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
      className="rounded-[20px] p-12 text-center"
      style={{ background: C.white, boxShadow: C.cardShadow }}
    >
      <div className="text-[48px] mb-4">📚</div>
      <h2
        className="text-[26px] font-bold m-0 mb-3"
        style={{ fontFamily: font.display, color: C.primary }}
      >
        Community Resources
      </h2>
      <p
        className="text-[15px] max-w-[420px] mx-auto mb-7 mt-0 leading-[1.6]"
        style={{ color: C.muted }}
      >
        Guides, sector briefs, toolkits, and knowledge assets curated for
        BRIDGE community members. Coming soon.
      </p>
      <div
        className="inline-flex items-center gap-2 py-2.5 px-6 rounded-[20px] font-bold text-[13px]"
        style={{
          background: C.accent + "22",
          border: `1.5px solid ${C.accent}`,
          color: C.primary,
          fontFamily: font.body,
        }}
      >
        <BookOpen size={14} /> Coming Soon
      </div>
    </div>
  );
}
