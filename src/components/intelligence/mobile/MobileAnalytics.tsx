import { M } from "../constants";
import { SECTORS } from "../sectorData";
import { ScoreRing, MModule, MKpi } from "./MobileShared";
import { MobileMap } from "./MobileMap";

// Re-export all components so existing imports continue to work
export { ScoreRing, MModule, MKpi, MobileComingSoon } from "./MobileShared";
export { MobileOverview } from "./MobileOverview";
export { MobileSectors } from "./MobileSectors";
export { MobileSignals } from "./MobileSignals";
export { MobileVentures } from "./MobileVentures";
export { MobileMap } from "./MobileMap";
export { MobileBottomNav } from "./MobileBottomNav";
export { MSectorDrawer } from "./MSectorDrawer";
export { MobileApp } from "./MobileAppRoot";

// ─── Analytics Sub-section Pill Nav ──────────────────────────────────
export function AnalyticsSubNav({ sub, setSub }) {
  const subs = [
    { id: "kpis", label: "KPIs" },
    { id: "performance", label: "Performance" },
    { id: "activity", label: "Activity" },
    { id: "companies", label: "Companies" },
    { id: "map", label: "Map" },
  ];
  return (
    <div style={{ overflowX: "auto", scrollbarWidth: "none", flexShrink: 0, paddingBottom: 2 }}>
      <div style={{ display: "flex", gap: 6, padding: "0 0 2px" }}>
        {subs.map((item) => {
          const act = item.id === sub;
          return (
            <button
              key={item.id}
              onClick={() => setSub(item.id)}
              style={{
                flexShrink: 0,
                padding: "6px 14px",
                borderRadius: 20,
                border: `1px solid ${act ? M.accent : M.border}`,
                background: act ? M.accentDim : "transparent",
                fontSize: 11,
                fontWeight: act ? 700 : 500,
                color: act ? M.accent : M.muted,
                fontFamily: "Inter,sans-serif",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Analytics Sub-section Content ───────────────────────────────────
export function MobileAnalytics({ s, sub }) {
  const capTotal = (s.capLow + s.capHigh) / 2;

  const subContent = () => {
    if (sub === "kpis") {
      const MONTHS = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
      const [rr, gg, bb] = [
        parseInt(s.color.slice(1, 3), 16),
        parseInt(s.color.slice(3, 5), 16),
        parseInt(s.color.slice(5, 7), 16),
      ];
      const sparkData = MONTHS.map((_, i) =>
        Math.round(capTotal * 0.6 + Math.sin(i * 0.9 + s.score * 0.05) * capTotal * 0.25 + i * 0.4),
      );
      const sparkMax = Math.max(...sparkData);
      const sparkMin = Math.min(...sparkData);
      const toY = (v, h) => h - Math.round(((v - sparkMin) / (sparkMax - sparkMin || 1)) * (h - 8)) - 4;
      const sparkW = 280;
      const sparkH = 52;
      const pts = sparkData
        .map((_, i) => `${Math.round(i * (sparkW / (MONTHS.length - 1)))},${toY(sparkData[i], sparkH)}`)
        .join(" ");
      const areapts = `0,${sparkH} ${pts} ${sparkW},${sparkH}`;
      return (
        <div>
          {/* 4 KPI cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
            <MKpi
              label="Market Cap"
              value={`$${capTotal.toFixed(1)}B`}
              sub="Sector aggregate"
              trend="+5.1%"
              icon={<span style={{ fontSize: 14, fontWeight: 800, color: M.accent }}>$</span>}
            />
            <MKpi
              label="IRR Ceiling"
              value={`${s.irrHigh}%`}
              sub="Target return"
              trend="+2.4%"
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.green} strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              }
            />
            <MKpi
              label="Sub-sector Rev"
              value={`$${((s.subSectors[0]?.pct / 100) * capTotal * 1.4).toFixed(1)}B`}
              sub="Lead segment"
              trend="+3.8%"
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.accent} strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              }
            />
            <MKpi
              label="BRIDGE Score"
              value={`${s.score}`}
              sub="Composite signal"
              trend="+1.2%"
              icon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4l3 3" />
                </svg>
              }
            />
          </div>

          {/* Recent Signals */}
          <div
            style={{
              background: M.card,
              borderRadius: 14,
              border: `1px solid ${M.border}`,
              padding: "14px 16px",
              marginBottom: 10,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: M.muted,
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  fontFamily: "Inter,sans-serif",
                }}
              >
                Recent Signals
              </div>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: M.accent,
                  fontFamily: "Inter,sans-serif",
                  background: M.accentDim,
                  padding: "2px 8px",
                  borderRadius: 20,
                }}
              >
                {s.activity.length} signals
              </span>
            </div>
            {s.activity.map((a, i) => {
              const bull = a.sig === "Bullish";
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    paddingBottom: 10,
                    marginBottom: i < s.activity.length - 1 ? 10 : 0,
                    borderBottom: i < s.activity.length - 1 ? `1px solid ${M.border}` : "none",
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    {bull ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={M.green} strokeWidth="2.5">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 2 17" />
                        <polyline points="17 6 23 6 23 12" />
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={M.yellow} strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: M.text, lineHeight: 1.35, marginBottom: 4 }}>
                      {a.h}
                    </div>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: bull ? M.green : M.yellow,
                          fontFamily: "Inter,sans-serif",
                        }}
                      >
                        {a.sig}
                      </span>
                      <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                      <span
                        style={{
                          fontSize: 9,
                          color: M.muted,
                          fontFamily: "Inter,sans-serif",
                          background: "rgba(255,255,255,0.05)",
                          padding: "1px 6px",
                          borderRadius: 4,
                        }}
                      >
                        {a.cat}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deployment Pipeline */}
          <div
            style={{
              background: M.card,
              borderRadius: 14,
              border: `1px solid ${M.border}`,
              padding: "14px 16px",
              marginBottom: 10,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: M.muted,
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  fontFamily: "Inter,sans-serif",
                }}
              >
                Deployment Pipeline
              </div>
              <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>Active deals</span>
            </div>
            {(() => {
              const stages = [
                {
                  label: "Prospecting",
                  count: Math.round(s.score * 0.28 + 4),
                  pct: 85,
                  color: `rgba(${rr},${gg},${bb},0.3)`,
                },
                {
                  label: "Due Diligence",
                  count: Math.round(s.score * 0.14 + 2),
                  pct: 58,
                  color: `rgba(${rr},${gg},${bb},0.55)`,
                },
                {
                  label: "Term Sheet",
                  count: Math.round(s.score * 0.07 + 1),
                  pct: 34,
                  color: `rgba(${rr},${gg},${bb},0.75)`,
                },
                { label: "Deployed", count: Math.round(s.score * 0.04 + 1), pct: 18, color: s.color },
              ];
              const total = stages.reduce((a, x) => a + x.count, 0);
              return (
                <div>
                  {/* Stacked bar */}
                  <div
                    style={{
                      display: "flex",
                      height: 10,
                      borderRadius: 6,
                      overflow: "hidden",
                      gap: 2,
                      marginBottom: 14,
                    }}
                  >
                    {stages.map((st, i) => (
                      <div
                        key={i}
                        style={{
                          flex: st.pct,
                          background: st.color,
                          borderRadius: i === 0 ? "6px 0 0 6px" : i === stages.length - 1 ? "0 6px 6px 0" : "0",
                        }}
                      />
                    ))}
                  </div>
                  {/* Stage rows */}
                  {stages.map((st, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: i < stages.length - 1 ? 10 : 0,
                      }}
                    >
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: st.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 11, color: M.sub, flex: 1, fontFamily: "Inter,sans-serif" }}>
                        {st.label}
                      </span>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 800,
                          color: M.text,
                          fontFamily: "Inter,sans-serif",
                          lineHeight: 1,
                        }}
                      >
                        {st.count}
                      </span>
                      <span
                        style={{
                          fontSize: 9,
                          color: M.muted,
                          fontFamily: "Inter,sans-serif",
                          width: 28,
                          textAlign: "right",
                        }}
                      >
                        {Math.round((st.count / total) * 100)}%
                      </span>
                    </div>
                  ))}
                  <div
                    style={{
                      marginTop: 12,
                      paddingTop: 10,
                      borderTop: `1px solid ${M.border}`,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>Total active</span>
                    <span style={{ fontSize: 15, fontWeight: 800, color: M.text, fontFamily: "Inter,sans-serif" }}>
                      {total} deals
                    </span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Sub-sector donut + bar combo */}
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
            defaultOpen={false}
            accentColor={s.color}
          >
            <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
              {/* Mini donut */}
              {(() => {
                const size = 80;
                const cx = 40;
                const cy = 40;
                const r = 28;
                const circ = 2 * Math.PI * r;
                let cum = 0;
                return (
                  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flexShrink: 0 }}>
                    {s.subSectors.map((ss, i) => {
                      const alpha = [1, 0.75, 0.55, 0.38, 0.22][i] || 0.22;
                      const col = `rgba(${rr},${gg},${bb},${alpha})`;
                      const dash = circ * (ss.pct / 100);
                      const gap = circ - dash;
                      const rot = -90 + (cum / 100) * 360;
                      cum += ss.pct;
                      return (
                        <circle
                          key={i}
                          cx={cx}
                          cy={cy}
                          r={r}
                          fill="none"
                          stroke={col}
                          strokeWidth="12"
                          strokeDasharray={`${dash} ${gap}`}
                          strokeLinecap="butt"
                          transform={`rotate(${rot} ${cx} ${cy})`}
                        />
                      );
                    })}
                    <text
                      x={cx}
                      y={cy - 4}
                      textAnchor="middle"
                      fill={M.text}
                      fontSize="13"
                      fontWeight="800"
                      fontFamily="Inter,sans-serif"
                    >
                      {s.subSectors.length}
                    </text>
                    <text
                      x={cx}
                      y={cy + 9}
                      textAnchor="middle"
                      fill={M.muted}
                      fontSize="7"
                      fontFamily="Inter,sans-serif"
                    >
                      sectors
                    </text>
                  </svg>
                );
              })()}
              {/* Legend */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                {s.subSectors.map((ss, i) => {
                  const alpha = [1, 0.75, 0.55, 0.38, 0.22][i] || 0.22;
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: 2,
                          background: `rgba(${rr},${gg},${bb},${alpha})`,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 10,
                          color: M.sub,
                          flex: 1,
                          fontFamily: "Inter,sans-serif",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {ss.name}
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
                        {ss.pct}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Bar chart */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 48, marginTop: 4 }}>
              {s.subSectors.map((ss, i) => {
                const alpha = [1, 0.75, 0.55, 0.38, 0.22][i] || 0.22;
                return (
                  <div
                    key={i}
                    style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}
                  >
                    <span style={{ fontSize: 8, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
                      {ss.pct}%
                    </span>
                    <div
                      style={{
                        width: "100%",
                        background: `rgba(${rr},${gg},${bb},${alpha})`,
                        borderRadius: "3px 3px 0 0",
                        height: `${(ss.pct / 40) * 36 + 8}px`,
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", gap: 5, marginTop: 2 }}>
              {s.subSectors.map((ss, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center" }}>
                  <span style={{ fontSize: 7, color: M.muted, fontFamily: "Inter,sans-serif", lineHeight: 1 }}>
                    {ss.name.split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>
          </MModule>

          {/* Sector comparison strip */}
          <MModule
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.accent} strokeWidth="2">
                <path d="M18 20V10M12 20V4M6 20v-6" />
              </svg>
            }
            label="Sector vs Portfolio"
            badge="12 sectors"
            defaultOpen={false}
            accentColor={s.color}
          >
            <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif", marginBottom: 10 }}>
              BRIDGE score across all sectors
            </div>
            {[...SECTORS]
              .sort((a, b) => b.score - a.score)
              .map((sec, i) => {
                const isActive = sec.id === s.id;
                const [srr, sgg, sbb] = [
                  parseInt(sec.color.slice(1, 3), 16),
                  parseInt(sec.color.slice(3, 5), 16),
                  parseInt(sec.color.slice(5, 7), 16),
                ];
                return (
                  <div key={sec.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                    <span
                      style={{
                        fontSize: 9,
                        color: isActive ? M.accent : M.muted,
                        fontFamily: "Inter,sans-serif",
                        width: 16,
                        textAlign: "right",
                        flexShrink: 0,
                      }}
                    >
                      #{i + 1}
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: isActive ? 700 : 400,
                        color: isActive ? M.text : M.sub,
                        width: 72,
                        flexShrink: 0,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {sec.short}
                    </span>
                    <div
                      style={{
                        flex: 1,
                        height: 5,
                        background: "rgba(255,255,255,0.06)",
                        borderRadius: 3,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${sec.score}%`,
                          background: isActive ? sec.color : `rgba(${srr},${sgg},${sbb},0.4)`,
                          borderRadius: 3,
                          transition: "width .4s ease",
                        }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: isActive ? 800 : 500,
                        color: isActive ? M.accent : M.muted,
                        fontFamily: "Inter,sans-serif",
                        width: 24,
                        textAlign: "right",
                        flexShrink: 0,
                      }}
                    >
                      {sec.score}
                    </span>
                  </div>
                );
              })}
          </MModule>
        </div>
      );
    }

    if (sub === "performance")
      return (
        <div>
          <MModule
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.accent} strokeWidth="2">
                <circle cx="7" cy="7" r="3" />
                <circle cx="17" cy="7" r="5" />
                <circle cx="12" cy="17" r="4" />
              </svg>
            }
            label="Volatility vs Growth Rate"
            badge="Sub-sectors"
            defaultOpen={true}
            accentColor={s.color}
          >
            <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif", marginBottom: 10 }}>
              Risk-return profile · bubble size = market share
            </div>
            {s.subSectors.map((ss, i) => {
              const [rr, gg, bb] = [
                parseInt(s.color.slice(1, 3), 16),
                parseInt(s.color.slice(3, 5), 16),
                parseInt(s.color.slice(5, 7), 16),
              ];
              const alpha = [1, 0.78, 0.55, 0.38, 0.2][i] || 0.2;
              const col = `rgba(${rr},${gg},${bb},${alpha})`;
              const growthVal = Math.round(ss.pct * 1.4 + 18);
              const riskVal = Math.round(15 + i * 18);
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div
                    style={{
                      width: Math.max(28, ss.pct * 1.1),
                      height: Math.max(28, ss.pct * 1.1),
                      borderRadius: "50%",
                      background: col,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontSize: 9, fontWeight: 700, color: "#fff", fontFamily: "Inter,sans-serif" }}>
                      {ss.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 3)}
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: M.text }}>{ss.name}</span>
                      <span style={{ fontSize: 10, color: M.accent, fontWeight: 700, fontFamily: "Inter,sans-serif" }}>
                        {ss.pct}%
                      </span>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                        Growth <span style={{ color: M.green, fontWeight: 700 }}>{growthVal}%</span>
                      </span>
                      <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                        Risk <span style={{ color: M.yellow, fontWeight: 700 }}>{riskVal}%</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </MModule>
          <MModule
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.accent} strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            }
            label="Sector Performance Index"
            badge="8-Month"
            defaultOpen={true}
            accentColor={s.color}
          >
            {(() => {
              const MONTHS = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
              const [rr, gg, bb] = [
                parseInt(s.color.slice(1, 3), 16),
                parseInt(s.color.slice(3, 5), 16),
                parseInt(s.color.slice(5, 7), 16),
              ];
              const data = MONTHS.map((m, i) => {
                const actual = Math.min(
                  13,
                  Math.round(14 * 0.35 + Math.sin(i * 0.85 + s.score * 0.05) * 14 * 0.18 + i * 0.5),
                );
                const insight = Math.min(14, actual + Math.round(1 + Math.sin(i * 1.3 + s.score * 0.03) * 2));
                return { month: m, actual, insight };
              });
              const maxV = 14;
              return (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
                      <span style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>Actual</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: `${s.color}55`,
                          border: `1px solid ${s.color}88`,
                        }}
                      />
                      <span style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                        AI Projection
                      </span>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 80 }}>
                    {data.map((d, i) => (
                      <div
                        key={i}
                        style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}
                      >
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            height: 68,
                            gap: 1,
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              borderRadius: "2px 2px 0 0",
                              background: `rgba(${rr},${gg},${bb},0.3)`,
                              height: `${(d.insight / maxV) * 100}%`,
                            }}
                          />
                          <div
                            style={{
                              width: "100%",
                              borderRadius: "2px 2px 0 0",
                              background: s.color,
                              height: `${(d.actual / maxV) * 100}%`,
                              marginTop: -Math.round((d.insight / maxV) * 68),
                            }}
                          />
                        </div>
                        <span style={{ fontSize: 8, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                          {d.month.slice(0, 1)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
          </MModule>
        </div>
      );

    if (sub === "activity")
      return (
        <div>
          <MModule
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.accent} strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
              </svg>
            }
            label="Activity Heatmap"
            badge="7 Days"
            defaultOpen={true}
            accentColor={s.color}
          >
            {(() => {
              const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
              const HOURS = ["00", "04", "08", "12", "16", "20"];
              const hv = (d, h, seed) =>
                Math.max(
                  5,
                  Math.min(
                    98,
                    Math.round(50 + Math.sin(d * 2.3 + h * 1.7 + seed * 0.1) * 30 + Math.sin(d * 0.9 + h * 2.1) * 18),
                  ),
                );
              const hc = (val, col) =>
                val < 20
                  ? "rgba(255,255,255,0.04)"
                  : val < 40
                    ? `${col}30`
                    : val < 65
                      ? `${col}60`
                      : val < 82
                        ? `${col}90`
                        : col;
              return (
                <div>
                  <div style={{ display: "flex", marginLeft: 28, marginBottom: 4, gap: 2 }}>
                    {HOURS.map((h) => (
                      <div
                        key={h}
                        style={{
                          flex: 1,
                          fontSize: 8,
                          color: M.muted,
                          fontFamily: "Inter,sans-serif",
                          textAlign: "center",
                        }}
                      >
                        {h}
                      </div>
                    ))}
                  </div>
                  {DAYS.map((day, di) => (
                    <div key={di} style={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 3 }}>
                      <div
                        style={{
                          width: 24,
                          fontSize: 8,
                          color: M.muted,
                          fontFamily: "Inter,sans-serif",
                          flexShrink: 0,
                          textAlign: "right",
                        }}
                      >
                        {day.slice(0, 2)}
                      </div>
                      {HOURS.map((h, hi) => (
                        <div
                          key={hi}
                          style={{
                            flex: 1,
                            height: 18,
                            borderRadius: 3,
                            background: hc(hv(di, hi * 4, s.score), s.color),
                          }}
                        />
                      ))}
                    </div>
                  ))}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                    <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>Low</span>
                    {[0.04, 0.3, 0.6, 0.9, 1].map((a, i) => (
                      <div
                        key={i}
                        style={{
                          width: 14,
                          height: 10,
                          borderRadius: 2,
                          background:
                            a < 0.1
                              ? `rgba(255,255,255,0.04)`
                              : `${s.color}${Math.round(a * 255)
                                  .toString(16)
                                  .padStart(2, "0")}`,
                        }}
                      />
                    ))}
                    <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>Peak</span>
                  </div>
                </div>
              );
            })()}
          </MModule>
          <MModule
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.accent} strokeWidth="2">
                <path d="M18 20V10M12 20V4M6 20v-6" />
              </svg>
            }
            label="Signal Source Breakdown"
            badge="+180%"
            defaultOpen={false}
            accentColor={s.color}
          >
            {(() => {
              const [rr, gg, bb] = [
                parseInt(s.color.slice(1, 3), 16),
                parseInt(s.color.slice(3, 5), 16),
                parseInt(s.color.slice(5, 7), 16),
              ];
              const totalAct = s.activity.length || 1;
              const earnCnt = s.activity.filter((a) => a.cat === "Earnings" || a.cat === "Policy").length;
              const newsCnt = s.activity.filter(
                (a) => a.cat === "Launch" || a.cat === "Market" || a.cat === "Finance",
              ).length;
              const analCnt = totalAct - earnCnt - newsCnt;
              const srcs = [
                { l: "Earnings & Policy", v: Math.round((earnCnt / totalAct) * 100) || 48, color: s.color },
                {
                  l: "News & Media",
                  v: Math.round((newsCnt / totalAct) * 100) || 32,
                  color: `rgba(${rr},${gg},${bb},0.65)`,
                },
                {
                  l: "Analyst Ratings",
                  v: Math.round((analCnt / totalAct) * 100) || 20,
                  color: `rgba(${rr},${gg},${bb},0.35)`,
                },
              ];
              const tot = srcs.reduce((a, x) => a + x.v, 0);
              const normed = srcs.map((x) => ({ ...x, v: Math.round((x.v / tot) * 100) }));
              return (
                <div>
                  <div
                    style={{
                      display: "flex",
                      height: 28,
                      borderRadius: 8,
                      overflow: "hidden",
                      gap: 2,
                      marginBottom: 12,
                    }}
                  >
                    {normed.map((src, i) => (
                      <div
                        key={i}
                        style={{
                          flex: src.v,
                          background: src.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {src.v > 18 && (
                          <span style={{ fontSize: 9, fontWeight: 700, color: "#fff", fontFamily: "Inter,sans-serif" }}>
                            {src.v}%
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  {normed.map((src, i) => (
                    <div key={i} style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 7, height: 7, borderRadius: "50%", background: src.color }} />
                          <span style={{ fontSize: 11, fontWeight: 600, color: M.text }}>{src.l}</span>
                        </div>
                        <span
                          style={{ fontSize: 11, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}
                        >
                          {src.v}%
                        </span>
                      </div>
                      <div
                        style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 2, overflow: "hidden" }}
                      >
                        <div style={{ height: "100%", width: `${src.v}%`, background: src.color, borderRadius: 2 }} />
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}
          </MModule>
          <MModule
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.accent} strokeWidth="2">
                <path d="M22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            }
            label="30-Day Engagement"
            badge="Live"
            defaultOpen={false}
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
              const anomalies = [6, 13, 22];
              return (
                <div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 12 }}>
                    {[
                      {
                        v: Math.round(s.activity.length * 241 + s.score * 8).toLocaleString(),
                        l: "Active Signals",
                        b: "+56%",
                      },
                      { v: Math.round(s.score * 13 + 240), l: "Conversion", b: "+43%" },
                      { v: Math.round(s.score * 112 + 1800), l: "Avg Duration", b: "+28%" },
                    ].map((st, i) => (
                      <div
                        key={i}
                        style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "8px 10px" }}
                      >
                        <div style={{ fontSize: 14, fontWeight: 800, color: M.text, lineHeight: 1, marginBottom: 2 }}>
                          {st.v}
                        </div>
                        <div style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{st.l}</div>
                        <span style={{ fontSize: 9, fontWeight: 700, color: M.green, fontFamily: "Inter,sans-serif" }}>
                          {st.b}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div style={{ height: 52, display: "flex", alignItems: "flex-end", gap: 2 }}>
                    {bars.map((b, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          borderRadius: "2px 2px 0 0",
                          background: anomalies.includes(i) ? s.color : `rgba(${rr},${gg},${bb},0.45)`,
                          height: `${(b / mx) * 100}%`,
                          minHeight: 2,
                        }}
                      />
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                    {["Feb 5", "Feb 15", "Feb 25", "Mar 1"].map((d) => (
                      <span key={d} style={{ fontSize: 8, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })()}
          </MModule>
        </div>
      );

    if (sub === "companies")
      return (
        <div>
          <MModule
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.accent} strokeWidth="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
              </svg>
            }
            label="Top Companies"
            badge={`${s.keyPlayers.length} active`}
            defaultOpen={true}
            accentColor={s.color}
          >
            {[...s.keyPlayers]
              .sort((a, b) => b.score - a.score)
              .map((p, i) => {
                const up = p.change.startsWith("+");
                const [rr, gg, bb] = [
                  parseInt(s.color.slice(1, 3), 16),
                  parseInt(s.color.slice(3, 5), 16),
                  parseInt(s.color.slice(5, 7), 16),
                ];
                return (
                  <div
                    key={p.ticker}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 0",
                      borderBottom: `1px solid ${i < s.keyPlayers.length - 1 ? M.border : "transparent"}`,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: `rgba(${rr},${gg},${bb},0.15)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontSize: 10,
                        fontWeight: 800,
                        color: s.color,
                        fontFamily: "Inter,sans-serif",
                      }}
                    >
                      {i + 1}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: M.text,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {p.name}
                      </div>
                      <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 2 }}>
                        <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>#{p.ticker}</span>
                        <span
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            color: up ? M.green : M.red,
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {p.change}
                        </span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: M.text, fontFamily: "Inter,sans-serif" }}>
                        {p.cap}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          justifyContent: "flex-end",
                          marginTop: 2,
                        }}
                      >
                        <div
                          style={{
                            width: 28,
                            height: 3,
                            background: "rgba(255,255,255,0.07)",
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <div style={{ height: "100%", width: `${p.score}%`, background: s.color, borderRadius: 2 }} />
                        </div>
                        <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{p.score}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
          </MModule>
          <MModule
            icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.accent} strokeWidth="2">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
            }
            label="Market Signals"
            badge={`${s.activity.length}`}
            defaultOpen={false}
            accentColor={s.color}
          >
            {s.activity.map((a, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "10px 0",
                  borderBottom: `1px solid ${i < s.activity.length - 1 ? M.border : "transparent"}`,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: a.sig === "Bullish" ? M.green : M.yellow,
                    marginTop: 5,
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: M.text, lineHeight: 1.35, marginBottom: 3 }}>
                    {a.h}
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: a.sig === "Bullish" ? M.green : M.yellow,
                        fontFamily: "Inter,sans-serif",
                      }}
                    >
                      {a.sig}
                    </span>
                    <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                    <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{a.cat}</span>
                  </div>
                </div>
              </div>
            ))}
          </MModule>
        </div>
      );

    if (sub === "map") return <MobileMap s={s} />;

    return null;
  };

  return (
    <div>
      {/* Hero score strip */}
      <div
        style={{
          background: M.card,
          borderRadius: 14,
          border: `1px solid ${M.border}`,
          padding: "14px 16px",
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div style={{ flexShrink: 0 }}>
          <ScoreRing score={s.score} color={s.color} size={64} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: M.accent,
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontFamily: "Inter,sans-serif",
              marginBottom: 2,
            }}
          >
            Analytics · {s.short}
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, color: M.text, lineHeight: 1.2, marginBottom: 6 }}>{s.full}</div>
          <div style={{ display: "flex", gap: 6 }}>
            {[
              { l: "Cap", v: `$${s.capLow}–${s.capHigh}M` },
              { l: "IRR", v: `${s.irrHigh}%` },
              { l: "Score", v: `${s.score}` },
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
                <span style={{ fontSize: 8, color: M.muted, fontFamily: "Inter,sans-serif", lineHeight: 1 }}>
                  {k.l}
                </span>
                <span
                  style={{
                    fontSize: 9,
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
      {/* Sub-section content */}
      {subContent()}
    </div>
  );
}
