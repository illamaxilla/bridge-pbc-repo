// ─── FORUM: HOME ──────────────────────────────────────────────
// This file holds the default Forum landing view (the Q&A feed).
// The existing Q&A feed lives in index.tsx — paste your replacement here.
// Props: all forum-level state and handlers are passed down from index.tsx.

interface ForumHomeProps {
  C: {
    primary: string; accent: string; accentDark: string; bg: string;
    white: string; dark: string; line: string; muted: string; text: string;
    cardShadow: string; deepShadow: string;
  };
  font: { display: string; body: string };
}

export default function ForumHome({ C, font }: ForumHomeProps) {
  // ─────────────────────────────────────────────────────────────
  // PASTE YOUR FORUM HOME / Q&A FEED CODE HERE
  // ─────────────────────────────────────────────────────────────

  return (
    <div style={{ padding: "32px 24px", textAlign: "center" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>🏠</div>
      <h3 style={{ fontFamily: font.display, fontSize: 20, fontWeight: 700, color: C.primary, margin: "0 0 8px" }}>
        Forum Home
      </h3>
      <p style={{ fontSize: 14, color: C.muted, margin: 0 }}>
        Paste your Forum Home / Q&A feed content here.
      </p>
    </div>
  );
}
