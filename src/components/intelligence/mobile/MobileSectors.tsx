import { M } from "../constants";
import { SECTORS } from "../sectorData";

export function MobileSectors({ s, setS }) {
  const sorted = [...SECTORS].sort((a, b) => b.score - a.score);
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: M.muted,
          letterSpacing: "1.2px",
          textTransform: "uppercase",
          fontFamily: "Inter,sans-serif",
          marginBottom: 10,
        }}
      >
        All Sectors · Score Ranked
      </div>
      {sorted.map((sec, i) => {
        const act = sec.id === s.id;
        const [rr, gg, bb] = [
          parseInt(sec.color.slice(1, 3), 16),
          parseInt(sec.color.slice(3, 5), 16),
          parseInt(sec.color.slice(5, 7), 16),
        ];
        return (
          <div
            key={sec.id}
            onClick={() => setS(sec)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              borderRadius: 12,
              marginBottom: 7,
              background: act ? `rgba(${rr},${gg},${bb},0.12)` : M.card,
              border: `1px solid ${act ? `rgba(${rr},${gg},${bb},0.4)` : M.border}`,
              cursor: "pointer",
              transition: "all .15s",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                background: act ? `rgba(${rr},${gg},${bb},0.2)` : "rgba(255,255,255,0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {sec.svgIcon(act ? sec.color : "rgba(255,255,255,0.3)", 15)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                <span
                  style={{ fontSize: 13, fontWeight: act ? 700 : 500, color: M.text, fontFamily: "DM Sans,sans-serif" }}
                >
                  {sec.short}
                </span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: sec.color,
                    fontFamily: "Inter,sans-serif",
                    background: `rgba(${rr},${gg},${bb},0.12)`,
                    padding: "1px 6px",
                    borderRadius: 4,
                  }}
                >
                  #{i + 1}
                </span>
              </div>
              <div
                style={{
                  height: 3,
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 2,
                  overflow: "hidden",
                  marginTop: 4,
                }}
              >
                <div style={{ height: "100%", width: `${sec.score}%`, background: sec.color, borderRadius: 2 }} />
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: act ? sec.color : M.sub,
                  fontFamily: "Inter,sans-serif",
                  lineHeight: 1,
                }}
              >
                {sec.score}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
