// ─── FORUM: MOST ANSWERED ─────────────────────────────────────
// Placeholder for the Forum > Most Answered sub-section.

interface MostAnsweredProps {
  C: {
    primary: string; accent: string; accentDark: string; bg: string;
    white: string; dark: string; line: string; muted: string; text: string;
    cardShadow: string; deepShadow: string;
  };
  font: { display: string; body: string };
}

export default function MostAnswered({ C, font }: MostAnsweredProps) {
  // ─────────────────────────────────────────────────────────────
  // PASTE YOUR MOST ANSWERED SUB-SECTION CODE HERE
  // ─────────────────────────────────────────────────────────────

  return (
    <div style={{ padding: "32px 24px", textAlign: "center" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>⭐</div>
      <h3 style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, color: C.primary, margin: "0 0 8px" }}>
        Most Answered
      </h3>
      <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>
        Paste your Most Answered content here.
      </p>
    </div>
  );
}
