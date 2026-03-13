// ─── FORUM: SECTORS ───────────────────────────────────────────
// Placeholder for the Forum > Sectors sub-section.
// Named ForumSectors to avoid conflict with the site-level Sectors page.

interface ForumSectorsProps {
  C: {
    primary: string; accent: string; accentDark: string; bg: string;
    white: string; dark: string; line: string; muted: string; text: string;
    cardShadow: string; deepShadow: string;
  };
  font: { display: string; body: string };
}

export default function ForumSectors({ C, font }: ForumSectorsProps) {
  // ─────────────────────────────────────────────────────────────
  // PASTE YOUR FORUM SECTORS SUB-SECTION CODE HERE
  // ─────────────────────────────────────────────────────────────

  return (
    <div className="py-8 px-6 text-center">
      <div className="text-[40px] mb-3">🌐</div>
      <h3 className="text-xl font-bold m-0 mb-2" style={{ fontFamily: font.display, color: C.primary }}>
        Sectors
      </h3>
      <p className="text-sm m-0" style={{ color: C.muted }}>
        Paste your Sectors content here.
      </p>
    </div>
  );
}
