// ─── FORUM: TAGS ──────────────────────────────────────────────
// Placeholder for the Forum > Tags sub-section.

interface TagsProps {
  C: {
    primary: string; accent: string; accentDark: string; bg: string;
    white: string; dark: string; line: string; muted: string; text: string;
    cardShadow: string; deepShadow: string;
  };
  font: { display: string; body: string };
}

export default function Tags({ C, font }: TagsProps) {
  // ─────────────────────────────────────────────────────────────
  // PASTE YOUR TAGS SUB-SECTION CODE HERE
  // ─────────────────────────────────────────────────────────────

  return (
    <div className="py-8 px-6 text-center">
      <div className="text-[40px] mb-3">🏷️</div>
      <h3 className="text-xl font-bold m-0 mb-2" style={{ fontFamily: font.display, color: C.primary }}>
        Tags
      </h3>
      <p className="text-sm m-0" style={{ color: C.muted }}>
        Paste your Tags content here.
      </p>
    </div>
  );
}
