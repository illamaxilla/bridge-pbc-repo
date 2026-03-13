import { M } from "../constants";
import { ScoreRing, MModule } from "./MobileShared";

export function MobileOverview({ s }) {
  const capTotal = (s.capLow + s.capHigh) / 2;
  return (
    <div>
      <div
        style={{
          background: M.card,
          borderRadius: 14,
          border: `1px solid ${M.border}`,
          padding: "18px 16px",
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div style={{ flexShrink: 0 }}>
          <ScoreRing score={s.score} color={s.color} size={78} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: M.accent,
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontFamily: "Inter,sans-serif",
              marginBottom: 4,
            }}
          >
            Active Sector
          </div>
          <div style={{ fontSize: 17, fontWeight: 800, color: M.text, lineHeight: 1.2, marginBottom: 8 }}>{s.full}</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[
              { l: "Cap", v: `$${s.capLow}–${s.capHigh}M` },
              { l: "IRR", v: `${s.irrHigh}%` },
            ].map((k, i) => (
              <div
                key={i}
                style={{
                  background: M.accentDim,
                  borderRadius: 4,
                  padding: "4px 9px",
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif", lineHeight: 1 }}>
                  {k.l}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: M.accent,
                    fontFamily: "Inter,sans-serif",
                    lineHeight: 1,
                  }}
                >
                  {k.v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MModule
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.accent} strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
        }
        label="Sub-sector Breakdown"
        badge={`${s.subSectors.length} segments`}
        accentColor={s.color}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {s.subSectors.map((ss, i) => {
            const [rr, gg, bb] = [
              parseInt(s.color.slice(1, 3), 16),
              parseInt(s.color.slice(3, 5), 16),
              parseInt(s.color.slice(5, 7), 16),
            ];
            const alpha = [1, 0.75, 0.55, 0.38, 0.22][i] || 0.22;
            const col = `rgba(${rr},${gg},${bb},${alpha})`;
            return (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: M.text }}>{ss.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
                    {ss.pct}%
                  </span>
                </div>
                <div style={{ height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${ss.pct}%`, background: col, borderRadius: 3 }} />
                </div>
              </div>
            );
          })}
        </div>
      </MModule>
      <MModule
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.accent} strokeWidth="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
        }
        label="30-Day Activity"
        badge="Live"
        accentColor={s.color}
      >
        {(() => {
          const bars = Array.from({ length: 30 }, (_, i) =>
            Math.max(8, Math.round(40 + Math.sin(i * 0.9 + s.score * 0.04) * 28 + Math.sin(i * 2.1) * 12)),
          );
          const mx = Math.max(...bars);
          const [rr, gg, bb] = [
            parseInt(s.color.slice(1, 3), 16),
            parseInt(s.color.slice(3, 5), 16),
            parseInt(s.color.slice(5, 7), 16),
          ];
          return (
            <div style={{ height: 56, display: "flex", alignItems: "flex-end", gap: 2 }}>
              {bars.map((b, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    borderRadius: "2px 2px 0 0",
                    background: `rgba(${rr},${gg},${bb},${0.3 + 0.5 * (b / mx)})`,
                    height: `${(b / mx) * 100}%`,
                    minHeight: 2,
                  }}
                />
              ))}
            </div>
          );
        })()}
      </MModule>
    </div>
  );
}
