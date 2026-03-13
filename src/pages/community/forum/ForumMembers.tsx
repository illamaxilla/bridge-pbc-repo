// ─── FORUM: MEMBERS ───────────────────────────────────────────
// Placeholder for the Forum > Members sub-section (inside the Forum left-nav).
// This is separate from the top-level /community/members Members tab.

interface ForumMembersProps {
  C: {
    primary: string; accent: string; accentDark: string; bg: string;
    white: string; dark: string; line: string; muted: string; text: string;
    cardShadow: string; deepShadow: string;
  };
  font: { display: string; body: string };
}

export default function ForumMembers({ C, font }: ForumMembersProps) {
  // ─────────────────────────────────────────────────────────────
  // PASTE YOUR FORUM MEMBERS SUB-SECTION CODE HERE
  // ─────────────────────────────────────────────────────────────

  return (
    <div className="py-8 px-6 text-center">
      <div className="text-[40px] mb-3">👤</div>
      <h3 className="text-xl font-bold m-0 mb-2" style={{ fontFamily: font.display, color: C.primary }}>
        Forum Members
      </h3>
      <p className="text-sm m-0" style={{ color: C.muted }}>
        Paste your Forum Members content here.
      </p>
    </div>
  );
}
