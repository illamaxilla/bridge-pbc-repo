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
    <div className="py-8 px-6 text-center">
      <div className="text-[40px] mb-3">🏠</div>
      <h3 className="text-xl font-bold m-0 mb-2" style={{ fontFamily: font.display, color: C.primary }}>
        Forum Home
      </h3>
      <p className="text-sm m-0" style={{ color: C.muted }}>
        Paste your Forum Home / Q&A feed content here.
      </p>
    </div>
  );
}
