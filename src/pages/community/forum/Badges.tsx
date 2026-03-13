// ─── FORUM: BADGES ────────────────────────────────────────────
// Placeholder for the Forum > Badges sub-section.

interface BadgesProps {
  C: {
    primary: string; accent: string; accentDark: string; bg: string;
    white: string; dark: string; line: string; muted: string; text: string;
    cardShadow: string; deepShadow: string;
  };
  font: { display: string; body: string };
}

export default function Badges({ C, font }: BadgesProps) {
  // ─────────────────────────────────────────────────────────────
  // PASTE YOUR BADGES SUB-SECTION CODE HERE
  // ─────────────────────────────────────────────────────────────

  return (
    <div className="py-8 px-6 text-center">
      <div className="text-[40px] mb-3">🏅</div>
      <h3 className="text-xl font-bold m-0 mb-2" style={{ fontFamily: font.display, color: C.primary }}>
        Badges
      </h3>
      <p className="text-sm m-0" style={{ color: C.muted }}>
        Paste your Badges content here.
      </p>
    </div>
  );
}
