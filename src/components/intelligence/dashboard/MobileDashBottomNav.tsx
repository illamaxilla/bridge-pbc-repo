import { M } from "./constants";

export interface MobileDashBottomNavProps {
  dashSub: string;
  setDashSub: (sub: string) => void;
  pressedTab: string | null;
  setPressedTab: (t: string | null) => void;
}

const NAV_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    svg: (c: string) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: "ventures",
    label: "Ventures",
    svg: (c: string) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    id: "signals",
    label: "Signals",
    svg: (c: string) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <circle cx="12" cy="20" r="1" fill={c} />
      </svg>
    ),
  },
  {
    id: "companies",
    label: "Companies",
    svg: (c: string) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
  },
  {
    id: "analytics",
    label: "Analytics",
    svg: (c: string) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

export default function MobileDashBottomNav({
  dashSub,
  setDashSub,
  pressedTab,
  setPressedTab,
}: MobileDashBottomNavProps) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#080E09",
        borderTop: `1px solid ${M.divider}`,
        display: "flex",
        alignItems: "stretch",
        zIndex: 100,
        paddingBottom: "env(safe-area-inset-bottom)",
        height: "calc(56px + env(safe-area-inset-bottom))",
      }}
    >
      {NAV_ITEMS.map((n) => {
        const act = dashSub === n.id;
        const col = act ? M.accent : "rgba(255,255,255,0.28)";
        return (
          <button
            key={n.id}
            onClick={() => setDashSub(n.id)}
            onPointerDown={() => setPressedTab(n.id)}
            onPointerUp={() => setTimeout(() => setPressedTab(null), 120)}
            onPointerLeave={() => setTimeout(() => setPressedTab(null), 120)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              background: "none",
              border: "none",
              cursor: "pointer",
              position: "relative",
              padding: 0,
              transform: pressedTab === n.id ? "scale(0.82)" : "scale(1)",
              transition: "transform 0.12s cubic-bezier(0.36,0.07,0.19,0.97)",
            }}
          >
            {act && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 28,
                  height: 2,
                  borderRadius: "0 0 2px 2px",
                  background: M.accent,
                }}
              />
            )}
            {n.svg(col)}
            <span
              style={{
                fontSize: 9,
                fontWeight: act ? 700 : 400,
                color: col,
                fontFamily: "Inter,sans-serif",
                letterSpacing: ".3px",
                transition: "all .15s",
              }}
            >
              {n.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
