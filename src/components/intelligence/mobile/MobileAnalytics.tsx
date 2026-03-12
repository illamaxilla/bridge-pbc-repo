import { useState } from "react";
import { Target, LineChart, Radio, Building2, Globe } from "lucide-react";
import { M } from "../constants";
import { SECTORS, Sector } from "../sectorData";

export function ScoreRing({ score, color, size = 80 }) {
  const r = 28,
    circ = 2 * Math.PI * r,
    dash = (score / 100) * circ;
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" style={{ transform: "rotate(-90deg)" }}>
      <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5" />
      <circle
        cx="36"
        cy="36"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
      />
      <text
        x="36"
        y="36"
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fill: M.text,
          fontSize: 14,
          fontWeight: 800,
          fontFamily: "Inter,sans-serif",
          transform: "rotate(90deg)",
          transformOrigin: "36px 36px",
        }}
      >
        {score}
      </text>
    </svg>
  );
}

export function MModule({ icon, label, badge, children, defaultOpen = false, accentColor }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      style={{
        borderRadius: 12,
        background: M.card,
        border: `1px solid ${open ? M.borderAct : M.border}`,
        overflow: "hidden",
        marginBottom: 10,
        transition: "border-color .2s",
      }}
    >
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "13px 14px",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: open ? `${accentColor || M.accent}18` : M.accentDim,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background .2s",
          }}
        >
          {icon}
        </div>
        <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: M.text, fontFamily: "DM Sans,sans-serif" }}>
          {label}
        </span>
        {badge && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: M.accent,
              fontFamily: "Inter,sans-serif",
              background: M.accentDim,
              padding: "2px 8px",
              borderRadius: 20,
            }}
          >
            {badge}
          </span>
        )}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform .22s", flexShrink: 0 }}
        >
          <path d="M4 6l4 4 4-4" stroke={M.muted} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      {open && <div style={{ borderTop: `1px solid ${M.border}`, padding: "12px 14px" }}>{children}</div>}
    </div>
  );
}

export function MKpi({ label, value, sub, trend, icon }) {
  const up = trend && trend.startsWith("+");
  return (
    <div style={{ background: M.card, borderRadius: 12, border: `1px solid ${M.border}`, padding: "13px 14px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: M.accentDim,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
        {trend && (
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "Inter,sans-serif", color: up ? M.green : M.red }}>
            {trend}
          </span>
        )}
      </div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: M.text,
          letterSpacing: "-0.5px",
          lineHeight: 1,
          marginBottom: 3,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, color: M.sub, fontFamily: "Inter,sans-serif" }}>{label}</div>
      {sub && <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>{sub}</div>}
    </div>
  );
}

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

export function MobileSignals({ s }) {
  const allActivity = SECTORS.flatMap((sec) =>
    sec.activity.map((a) => ({ ...a, sector: sec.short, sColor: sec.color })),
  );
  const bullish = allActivity.filter((a) => a.sig === "Bullish");
  const watch = allActivity.filter((a) => a.sig === "Watch");
  return (
    <div>
      <MModule
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.green} strokeWidth="2">
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
          </svg>
        }
        label="Bullish Signals"
        badge={`${bullish.length}`}
        defaultOpen={true}
        accentColor={M.green}
      >
        {bullish.slice(0, 6).map((a, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              padding: "10px 0",
              borderBottom: `1px solid ${i < 5 ? M.border : "transparent"}`,
            }}
          >
            <div
              style={{ width: 6, height: 6, borderRadius: "50%", background: M.green, marginTop: 5, flexShrink: 0 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: M.text, lineHeight: 1.35, marginBottom: 3 }}>
                {a.h}
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "Inter,sans-serif",
                    background: "rgba(255,255,255,0.06)",
                    padding: "1px 6px",
                    borderRadius: 4,
                  }}
                >
                  {a.sector}
                </span>
                <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{a.cat}</span>
              </div>
            </div>
          </div>
        ))}
      </MModule>
      <MModule
        icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={M.yellow} strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        }
        label="Watch Signals"
        badge={`${watch.length}`}
        accentColor={M.yellow}
      >
        {watch.slice(0, 4).map((a, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              padding: "10px 0",
              borderBottom: `1px solid ${i < 3 ? M.border : "transparent"}`,
            }}
          >
            <div
              style={{ width: 6, height: 6, borderRadius: "50%", background: M.yellow, marginTop: 5, flexShrink: 0 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: M.text, lineHeight: 1.35, marginBottom: 3 }}>
                {a.h}
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "Inter,sans-serif",
                    background: "rgba(255,255,255,0.06)",
                    padding: "1px 6px",
                    borderRadius: 4,
                  }}
                >
                  {a.sector}
                </span>
              </div>
            </div>
          </div>
        ))}
      </MModule>
    </div>
  );
}

export function MobileVentures({ s }) {
  const [sortBy, setSortBy] = useState("score");
  const sorted = [...s.keyPlayers].sort((a, b) => (sortBy === "score" ? b.score - a.score : b.capNum - a.capNum));
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {[
          ["score", "By Score"],
          ["capNum", "By Cap"],
        ].map(([k, l]) => (
          <button
            key={k}
            onClick={() => setSortBy(k)}
            style={{
              flex: 1,
              padding: "8px 0",
              borderRadius: 8,
              border: `1px solid ${sortBy === k ? M.accent : M.border}`,
              background: sortBy === k ? M.accentDim : M.card,
              fontSize: 11,
              fontWeight: 700,
              color: sortBy === k ? M.accent : M.sub,
              fontFamily: "Inter,sans-serif",
              cursor: "pointer",
            }}
          >
            {l}
          </button>
        ))}
      </div>
      {sorted.map((p, i) => {
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
              gap: 12,
              padding: "12px 14px",
              borderRadius: 12,
              marginBottom: 7,
              background: M.card,
              border: `1px solid ${M.border}`,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                background: `rgba(${rr},${gg},${bb},0.15)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: 11,
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
                  fontSize: 13,
                  fontWeight: 700,
                  color: M.text,
                  marginBottom: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {p.name}
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>#{p.ticker}</span>
                <span
                  style={{ fontSize: 10, fontWeight: 600, color: up ? M.green : M.red, fontFamily: "Inter,sans-serif" }}
                >
                  {p.change}
                </span>
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: M.text, fontFamily: "Inter,sans-serif" }}>
                {p.cap}
              </div>
              <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>Score: {p.score}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function MobileMap({ s }) {
  const continents = [
    {
      id: "NA",
      pts: "33,83 83,56 167,28 250,39 333,56 375,83 347,119 314,128 278,181 250,194 208,194 172,161 172,128 156,114 83,89",
    },
    { id: "GL", pts: "333,28 389,14 417,28 403,56 361,61 333,50" },
    {
      id: "SA",
      pts: "222,194 278,183 328,194 375,217 403,261 403,272 389,306 361,328 333,389 306,403 292,389 278,356 264,317 256,261 250,228 222,211",
    },
    {
      id: "EU",
      pts: "444,78 472,61 514,53 528,61 550,50 578,53 600,72 583,89 561,94 536,100 514,92 500,100 486,111 472,106 458,100 444,89",
    },
    {
      id: "AF",
      pts: "458,100 528,94 583,100 617,128 628,150 636,167 642,194 628,228 617,261 597,317 583,350 567,367 544,372 519,361 500,356 481,350 464,328 453,294 447,261 450,228 453,194 453,161 458,128",
    },
    {
      id: "AS",
      pts: "583,89 617,78 650,56 700,39 750,28 833,28 900,39 944,56 967,78 961,100 922,119 883,133 861,150 833,161 806,167 778,194 750,211 722,222 700,228 667,217 650,194 628,172 617,128 583,100",
    },
    { id: "AU", pts: "806,272 861,261 900,267 933,283 939,306 928,328 906,344 872,350 844,344 817,328 806,306" },
  ];
  const regions = [
    { f: "🇺🇸", l: "North America", pct: 42 },
    { f: "🇪🇺", l: "Europe", pct: 28 },
    { f: "🌏", l: "Asia Pacific", pct: 21 },
    { f: "🌎", l: "Latam", pct: 5 },
    { f: "🌍", l: "Other", pct: 4 },
  ];
  const gx = 499,
    gy = 228;
  return (
    <div>
      <div
        style={{
          background: M.card,
          borderRadius: 14,
          border: `1px solid ${M.border}`,
          overflow: "hidden",
          marginBottom: 10,
        }}
      >
        <div
          style={{ padding: "12px 14px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: M.text }}>Global Investor Distribution</span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: M.accent,
              fontFamily: "Inter,sans-serif",
              background: M.accentDim,
              padding: "2px 8px",
              borderRadius: 20,
            }}
          >
            5 Regions
          </span>
        </div>
        <svg viewBox="0 0 1000 500" style={{ width: "100%", display: "block" }}>
          <rect width="1000" height="500" fill="#0A1510" />
          {continents.map((c) => (
            <polygon key={c.id} points={c.pts} fill="#172318" stroke="#1E3328" strokeWidth="1.5" />
          ))}
          <circle cx={gx} cy={gy} r="16" fill={`${s.color}15`} />
          <circle cx={gx} cy={gy} r="9" fill={`${s.color}30`} />
          <circle cx={gx} cy={gy} r="5" fill={s.color} />
          <text x={gx + 12} y={gy - 8} fill={s.color} fontSize="18" fontWeight="800" fontFamily="Inter,sans-serif">
            GH
          </text>
        </svg>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {regions.map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 10,
              background: M.card,
              border: `1px solid ${M.border}`,
            }}
          >
            <span style={{ fontSize: 18 }}>{r.f}</span>
            <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: M.text }}>{r.l}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 60,
                  height: 4,
                  background: "rgba(255,255,255,0.07)",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <div style={{ height: "100%", width: `${r.pct}%`, background: s.color, borderRadius: 2 }} />
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: M.accent,
                  fontFamily: "Inter,sans-serif",
                  minWidth: 28,
                  textAlign: "right",
                }}
              >
                {r.pct}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
              const totalAct = s.activity.length || 1;
              const earnCnt = s.activity.filter((a) => a.cat === "Earnings" || a.cat === "Policy").length;
              const newsCnt = s.activity.filter(
                (a) => a.cat === "Launch" || a.cat === "Market" || a.cat === "Finance",
              ).length;
              const analCnt = totalAct - earnCnt - newsCnt;
              const [rr, gg, bb] = [
                parseInt(s.color.slice(1, 3), 16),
                parseInt(s.color.slice(3, 5), 16),
                parseInt(s.color.slice(5, 7), 16),
              ];
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

// ─── Coming Soon placeholder for inactive tabs ────────────────────────
export function MobileComingSoon({ label, icon }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 60,
        paddingBottom: 60,
        gap: 16,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: M.accentDim,
          border: `1px solid ${M.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: M.text, marginBottom: 6 }}>{label}</div>
        <div style={{ fontSize: 12, color: M.muted, fontFamily: "Inter,sans-serif", lineHeight: 1.5 }}>
          This section will reflect
          <br />
          data for the selected sector.
        </div>
      </div>
      <div style={{ padding: "8px 18px", borderRadius: 20, border: `1px solid ${M.border}`, background: M.card }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: M.muted,
            fontFamily: "Inter,sans-serif",
            letterSpacing: "0.5px",
          }}
        >
          COMING SOON
        </span>
      </div>
    </div>
  );
}

// ─── Mobile Bottom Nav (5 tabs → 5 content sections) ─────────────────
export function MobileBottomNav({ sub, setSub }) {
  const tabs = [
    { id: "kpis", label: "KPIs", icon: (c) => <Target size={20} color={c} /> },
    { id: "performance", label: "Performance", icon: (c) => <LineChart size={20} color={c} /> },
    { id: "activity", label: "Activity", icon: (c) => <Radio size={20} color={c} /> },
    { id: "companies", label: "Companies", icon: (c) => <Building2 size={20} color={c} /> },
    { id: "map", label: "Map", icon: (c) => <Globe size={20} color={c} /> },
  ];
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        background: M.surface,
        borderTop: `1px solid ${M.border}`,
        display: "flex",
        alignItems: "stretch",
        zIndex: 300,
        backdropFilter: "blur(12px)",
      }}
    >
      {tabs.map((t) => {
        const act = t.id === sub;
        return (
          <div
            key={t.id}
            onClick={() => setSub(t.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              cursor: "pointer",
              position: "relative",
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
                  borderRadius: "0 0 3px 3px",
                  background: M.accent,
                }}
              />
            )}
            {t.icon(act ? M.accent : M.muted)}
            <span
              style={{
                fontSize: 9,
                fontWeight: act ? 700 : 400,
                color: act ? M.accent : M.muted,
                fontFamily: "Inter,sans-serif",
                letterSpacing: "0.3px",
              }}
            >
              {t.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export function MSectorDrawer({ s, setS, open, onClose }) {
  const sorted = [...SECTORS].sort((a, b) => b.score - a.score);
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.65)" }} onClick={onClose}>
      <div
        className="drawer"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#0F1A12",
          borderRadius: "20px 20px 0 0",
          maxHeight: "82vh",
          display: "flex",
          flexDirection: "column",
          paddingBottom: "env(safe-area-inset-bottom,16px)",
          border: "1px solid rgba(184,217,53,0.15)",
          borderBottom: "none",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div
          style={{
            width: 36,
            height: 4,
            borderRadius: 2,
            background: "rgba(255,255,255,0.15)",
            margin: "12px auto 0",
            flexShrink: 0,
          }}
        />
        {/* Header */}
        <div
          style={{
            padding: "12px 20px 8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#6B7280",
              fontFamily: "Inter,sans-serif",
              letterSpacing: "0.8px",
              textTransform: "uppercase",
            }}
          >
            Select Sector
          </span>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "none",
              borderRadius: 7,
              padding: "4px 10px",
              fontSize: 11,
              color: "rgba(255,255,255,0.4)",
              cursor: "pointer",
              fontFamily: "Inter,sans-serif",
            }}
          >
            Done
          </button>
        </div>
        {/* Scrollable list */}
        <div style={{ overflowY: "auto", flex: 1, scrollbarWidth: "none" }}>
          {sorted.map((sec, i) => {
            const act = sec.id === s.id;
            const totalV = sec.keyPlayers?.length || 5;
            return (
              <div
                key={sec.id}
                onClick={() => {
                  setS(sec);
                  onClose();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "13px 20px",
                  borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  background: act ? "rgba(184,217,53,0.07)" : "transparent",
                  cursor: "pointer",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 11,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: act ? "rgba(184,217,53,0.15)" : "rgba(255,255,255,0.06)",
                  }}
                >
                  {sec.svgIcon(act ? "#B8D935" : "rgba(255,255,255,0.35)", 16)}
                </div>
                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: act ? 700 : 500,
                      color: act ? "#fff" : "rgba(255,255,255,0.7)",
                      fontFamily: "DM Sans,sans-serif",
                    }}
                  >
                    {sec.short}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.3)",
                      fontFamily: "Inter,sans-serif",
                      marginTop: 1,
                    }}
                  >
                    {totalV} ventures · ${sec.capLow}–{sec.capHigh}M
                  </div>
                </div>
                {/* Score */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      fontFamily: "Inter,sans-serif",
                      color: act ? "#B8D935" : "rgba(255,255,255,0.28)",
                    }}
                  >
                    {sec.score}
                  </div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", fontFamily: "Inter,sans-serif" }}>
                    score
                  </div>
                </div>
                {act && (
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#B8D935", flexShrink: 0 }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function MobileApp() {
  const [s, setS] = useState(SECTORS[1]);
  const [sub, setSub] = useState("kpis");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const SUB_LABELS = {
    kpis: "KPIs",
    performance: "Performance",
    activity: "Activity",
    companies: "Companies",
    map: "Global Map",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: M.bg,
        fontFamily: "'DM Sans',sans-serif",
        color: M.text,
        overflowX: "hidden",
      }}
    >
      <style>{`*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}::-webkit-scrollbar{display:none;}`}</style>

      {/* Top header — sector selector only */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: 56,
          background: `${M.surface}EE`,
          borderBottom: `1px solid ${M.border}`,
          backdropFilter: "blur(16px)",
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          flexShrink: 0,
        }}
      >
        {/* Sector selector */}
        <div
          onClick={() => setDrawerOpen(true)}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            background: "rgba(255,255,255,0.06)",
            borderRadius: 10,
            padding: "6px 10px 6px 8px",
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: "rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {s.svgIcon("#B8D935", 13)}
          </div>
          <span
            style={{
              flex: 1,
              fontSize: 13,
              fontWeight: 600,
              color: "#FFFFFF",
              fontFamily: "DM Sans,sans-serif",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {s.short}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#B8D935", fontFamily: "Inter,sans-serif" }}>
              {s.score}
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#B8D935"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hamburger menu drawer */}
      {menuOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(0,0,0,0.65)" }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="drawer"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "#0F1A12",
              borderRadius: "20px 20px 0 0",
              border: "1px solid rgba(184,217,53,0.15)",
              borderBottom: "none",
              paddingBottom: "env(safe-area-inset-bottom,24px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div
              style={{
                width: 36,
                height: 4,
                borderRadius: 2,
                background: "rgba(255,255,255,0.15)",
                margin: "12px auto 0",
              }}
            />
            {/* Header */}
            <div
              style={{
                padding: "12px 20px 8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#6B7280",
                  fontFamily: "Inter,sans-serif",
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                }}
              >
                Menu
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "none",
                  borderRadius: 7,
                  padding: "4px 10px",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  fontFamily: "Inter,sans-serif",
                }}
              >
                Done
              </button>
            </div>

            {/* Profile block */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 20px 16px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "rgba(184,217,53,0.12)",
                  border: "1.5px solid rgba(184,217,53,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#B8D935"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "DM Sans,sans-serif" }}>
                  Joseph Asante
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "Inter,sans-serif",
                    marginTop: 2,
                  }}
                >
                  BRIDGE Intelligence · Analyst
                </div>
              </div>
              <div
                style={{
                  background: "rgba(184,217,53,0.12)",
                  border: "1px solid rgba(184,217,53,0.2)",
                  borderRadius: 6,
                  padding: "3px 8px",
                }}
              >
                <span style={{ fontSize: 10, fontWeight: 700, color: "#B8D935", fontFamily: "Inter,sans-serif" }}>
                  Pro
                </span>
              </div>
            </div>

            {/* Return to website */}
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "15px 20px",
                background: "transparent",
                border: "none",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 11,
                  background: "rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "DM Sans,sans-serif" }}>
                  Return to Website
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "Inter,sans-serif",
                    marginTop: 2,
                  }}
                >
                  Back to bridge-pbc.com
                </div>
              </div>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            {/* Nav links */}
            {[
              {
                label: "About BRIDGE",
                desc: "Our mission, model & sectors",
                icon: (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                ),
              },
              {
                label: "Switch to Desktop",
                desc: "Full dashboard experience",
                icon: (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                ),
              },
              {
                label: "Notifications",
                desc: "Manage alert preferences",
                icon: (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 01-3.46 0" />
                  </svg>
                ),
              },
              {
                label: "Help & Support",
                desc: "Docs, guides & contact",
                icon: (
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => setMenuOpen(false)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "13px 20px",
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 11,
                    background: "rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.85)",
                      fontFamily: "DM Sans,sans-serif",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.3)",
                      fontFamily: "Inter,sans-serif",
                      marginTop: 2,
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            ))}

            {/* Sign out */}
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 20px",
                background: "transparent",
                border: "none",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 11,
                  background: "rgba(239,68,68,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(239,68,68,0.6)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "rgba(239,68,68,0.75)",
                    fontFamily: "DM Sans,sans-serif",
                  }}
                >
                  Sign Out
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Notifications dropdown */}
      {notifOpen && (
        <div
          style={{
            position: "fixed",
            top: 60,
            right: 12,
            width: 280,
            background: M.surface,
            border: `1px solid ${M.border}`,
            borderRadius: 14,
            boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
            zIndex: 200,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 14px",
              borderBottom: `1px solid ${M.border}`,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: M.text }}>Alerts</span>
            <span
              style={{ fontSize: 11, color: M.accent, fontWeight: 700, cursor: "pointer" }}
              onClick={() => setNotifOpen(false)}
            >
              Mark all read
            </span>
          </div>
          {s.activity.slice(0, 3).map((a, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: 10, padding: "10px 14px", borderBottom: `1px solid ${M.border}` }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: a.sig === "Bullish" ? M.green : M.yellow,
                  marginTop: 4,
                  flexShrink: 0,
                }}
              />
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: M.text, lineHeight: 1.3 }}>{a.h}</div>
                <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
                  {a.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Page label */}
      <div style={{ padding: "8px 16px 0", flexShrink: 0 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: M.muted,
            letterSpacing: "0.8px",
            textTransform: "uppercase",
            fontFamily: "Inter,sans-serif",
          }}
        >
          {SUB_LABELS[sub]}
        </div>
      </div>

      {/* Page content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "10px 16px 80px", minHeight: 0 }}>
        <MobileAnalytics s={s} sub={sub} />
      </div>

      <MobileBottomNav sub={sub} setSub={setSub} />
      <MSectorDrawer s={s} setS={setS} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
