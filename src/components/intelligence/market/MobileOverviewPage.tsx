import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
  Target,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  SCORE_DIMS,
  THESIS,
  RISKS,
  M,
  msigCol,
  msigDim,
  scoreToSig,
  compute,
  genTrend,
  riskCol,
  riskDim,
} from "./data";
import { MCard, MSection, MSignalRow } from "./MobileComponents";

/* ════════════════════════════════════════
   OVERVIEW PAGE
   ════════════════════════════════════════ */
export function OverviewHero({ s }) {
  const SIcon = s.icon;
  const c = compute(s);
  const totalV = (s.t1?.length || 0) + (s.t2?.length || 0) + (s.t3?.length || 0);
  const sig = scoreToSig(s.score);
  const sigC = msigCol(sig);
  const sigD = msigDim(sig);
  return (
    <MCard style={{ marginBottom: 10 }}>
      {/* Header */}
      <div
        style={{
          padding: "14px 14px 12px",
          borderBottom: `1px solid ${M.border}`,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* Score ring — LEFT */}
        <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="26" fill="none" stroke={M.faint} strokeWidth="4" />
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke={M.accent}
              strokeWidth="4"
              strokeDasharray={`${(s.score / 100) * 163.4} 163.4`}
              strokeLinecap="round"
              transform="rotate(-90 32 32)"
            />
          </svg>
          <div
            style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <span style={{ fontSize: 17, fontWeight: 800, color: M.white, fontFamily: "Inter,sans-serif" }}>
              {s.score}
            </span>
          </div>
        </div>
        {/* Text — RIGHT */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: M.accent,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              fontFamily: "Inter,sans-serif",
              marginBottom: 4,
            }}
          >
            Overview · {s.tag}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: M.white, lineHeight: 1.2, marginBottom: 8 }}>
            {s.full}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: 4,
                background: M.faint,
                border: `1px solid ${M.border}`,
                color: M.white,
                fontFamily: "Inter,sans-serif",
              }}
            >
              Cap{" "}
              <span style={{ color: M.accent }}>
                ${s.capLow}–{s.capHigh}M
              </span>
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: 4,
                background: M.faint,
                border: `1px solid ${M.border}`,
                color: M.white,
                fontFamily: "Inter,sans-serif",
              }}
            >
              IRR <span style={{ color: M.accent }}>{s.irrHigh}%</span>
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "2px 7px",
                borderRadius: 4,
                background: M.faint,
                border: `1px solid ${M.border}`,
                color: M.white,
                fontFamily: "Inter,sans-serif",
              }}
            >
              Score <span style={{ color: M.accent }}>{s.score}</span>
            </span>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "10px 16px 14px", gap: 4 }}>
        {[
          { l: "Capital Range", v: `$${s.capLow}–${s.capHigh}M` },
          { l: "IRR Target", v: `${s.irrLow}–${s.irrHigh}%` },
          { l: "Ventures", v: `${totalV} identified` },
        ].map((item, i) => (
          <div key={i} style={{ textAlign: i === 1 ? "center" : i === 2 ? "right" : "left" }}>
            <div
              style={{
                fontSize: 8,
                fontWeight: 600,
                color: M.muted,
                fontFamily: "Inter,sans-serif",
                textTransform: "uppercase",
                letterSpacing: ".5px",
                marginBottom: 3,
              }}
            >
              {item.l}
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: M.white, letterSpacing: "-.3px" }}>{item.v}</div>
          </div>
        ))}
      </div>
      {/* Signal pill */}
      <div
        style={{
          margin: "0 14px 12px",
          padding: "8px 12px",
          borderRadius: 10,
          background: sigD,
          border: `1px solid ${sigC}33`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: sigC, boxShadow: `0 0 7px ${sigC}` }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: sigC }}>{sig}</span>
          <span style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>Market Signal</span>
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              style={{
                width: 3,
                height: 12,
                borderRadius: 1.5,
                background: i < Math.round(s.score / 10) ? M.accent : M.faint,
              }}
            />
          ))}
        </div>
      </div>
    </MCard>
  );
}

export function OverviewTab({ s }) {
  const [trendF, setTF] = useState("7D");
  const td = genTrend(s, trendF);
  const c = compute(s);
  const bullishCount = s.activity.filter((a) => a.sig === "Bullish").length;
  return (
    <div style={{ paddingTop: 8, paddingLeft: 16, paddingRight: 16, paddingBottom: 0 }}>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#6B7280",
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          fontFamily: "Inter,sans-serif",
          marginBottom: 10,
        }}
      >
        Overview · {s.tag}
      </div>
      <OverviewHero s={s} />

      {/* Intelligence Signals */}
      <MSection icon={Zap} title="Intelligence Signals" badge={`${bullishCount} Bullish`} defaultOpen={true}>
        {s.activity.map((a, i) => (
          <MSignalRow key={i} a={a} />
        ))}
      </MSection>

      {/* Opportunity Index chart */}
      <MSection icon={TrendingUp} iconColor={M.green} title="Opportunity Index" badge="Trending">
        <div style={{ padding: "12px 14px 14px" }}>
          <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
            {["7D", "30D", "90D"].map((v) => (
              <button
                key={v}
                onClick={() => setTF(v)}
                style={{
                  padding: "4px 12px",
                  borderRadius: 6,
                  border: `1px solid ${trendF === v ? M.accentBorder : M.border}`,
                  background: trendF === v ? M.accentDim : M.faint,
                  fontSize: 10,
                  fontWeight: 700,
                  color: trendF === v ? M.accent : M.muted,
                  cursor: "pointer",
                  fontFamily: "Inter,sans-serif",
                }}
              >
                {v}
              </button>
            ))}
          </div>
          <div style={{ height: 140 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={td} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                <defs>
                  <linearGradient id="mg1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={M.accent} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={M.accent} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={M.faint} vertical={false} />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 9, fill: M.muted, fontFamily: "Inter" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 9, fill: M.muted }}
                  axisLine={false}
                  tickLine={false}
                  domain={["auto", "auto"]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={M.accent}
                  strokeWidth={2}
                  fill="url(#mg1)"
                  dot={false}
                  activeDot={{ r: 3, fill: M.accent, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </MSection>

      {/* Market Sentiment */}
      <MSection icon={BarChart3} iconColor="#60A5FA" title="Market Sentiment">
        <div style={{ padding: "12px 14px 14px" }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 36, fontWeight: 800, color: M.white, letterSpacing: "-2px", lineHeight: 1 }}>
              {c.sentimentScore}%
            </div>
            <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
              Positive Sentiment Score
            </div>
          </div>
          {[
            ["Activity Signals", Math.min(c.sentimentScore + 5, 98), M.green],
            ["Policy Alignment", s.score, M.accent],
            ["Capital Readiness", c.inflow, "#60A5FA"],
          ].map(([l, v, col]) => (
            <div key={l} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 10, color: M.mid, fontFamily: "Inter,sans-serif" }}>{l}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: M.white, fontFamily: "Inter,sans-serif" }}>
                  {v}%
                </span>
              </div>
              <div style={{ height: 5, background: M.faint, borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${v}%`, height: "100%", background: col, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>
      </MSection>

      {/* Sub-sector Activity */}
      <MSection
        icon={Activity}
        iconColor={M.amber}
        title="Sub-sector Activity"
        badge={`${s.subSectors.length} segments`}
      >
        <div style={{ padding: "10px 14px 14px" }}>
          {s.subSectors.map((ss, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: M.white }}>{ss.name}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
                  {ss.pct}%
                </span>
              </div>
              <div style={{ height: 5, background: M.faint, borderRadius: 3, overflow: "hidden" }}>
                <div
                  style={{
                    width: `${ss.pct}%`,
                    height: "100%",
                    background: ss.color === "#E5E7EB" ? M.faint : M.accent,
                    borderRadius: 3,
                    opacity: ss.color === "#E5E7EB" ? 0.3 : 1,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </MSection>

      {/* BRIDGE Score Breakdown */}
      <OverviewScoreBreakdown s={s} />

      {/* Investment Thesis */}
      <OverviewThesis s={s} />

      {/* Key Risks */}
      <OverviewRisks s={s} />
      <div style={{ height: 16 }} />
    </div>
  );
}

/* ── BRIDGE Score Breakdown ── */
// SCORE_DIMS imported from data
export function OverviewScoreBreakdown({ s }) {
  const d = SCORE_DIMS[s.id] || { pp: 82, sf: 84, fe: 80, ss: 81 };
  const dims = [
    { label: "Peace & Prosperity", abbr: "P&P", val: d.pp, col: M.accent },
    { label: "Strategic Fit", abbr: "SF", val: d.sf, col: M.green },
    { label: "Feasibility & Execution", abbr: "F&E", val: d.fe, col: "#60A5FA" },
    { label: "Scalability & Sustainability", abbr: "S&S", val: d.ss, col: M.amber },
  ];
  const avg = Math.round((d.pp + d.sf + d.fe + d.ss) / 4);
  return (
    <MSection icon={Target} iconColor={M.accent} title="BRIDGE Score Breakdown" badge={`${avg} avg`}>
      <div style={{ padding: "12px 14px 14px" }}>
        <div style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif", marginBottom: 12 }}>
          4-dimension composite · Peace & Prosperity framework
        </div>
        {dims.map((d, i) => (
          <div key={i} style={{ marginBottom: 11 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: d.col, flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 500, color: M.white }}>{d.label}</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 800, color: d.col, fontFamily: "Inter,sans-serif" }}>
                {d.val}
              </span>
            </div>
            <div style={{ height: 5, background: M.faint, borderRadius: 3, overflow: "hidden" }}>
              <div
                style={{
                  width: `${d.val}%`,
                  height: "100%",
                  background: d.col,
                  borderRadius: 3,
                  transition: "width 0.6s ease",
                }}
              />
            </div>
          </div>
        ))}
        {/* Mini score card row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6, marginTop: 4 }}>
          {dims.map((d, i) => (
            <div key={i} style={{ background: M.faint, borderRadius: 8, padding: "7px 6px", textAlign: "center" }}>
              <div
                style={{ fontSize: 14, fontWeight: 800, color: d.col, fontFamily: "Inter,sans-serif", lineHeight: 1 }}
              >
                {d.val}
              </div>
              <div style={{ fontSize: 8, color: M.muted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>{d.abbr}</div>
            </div>
          ))}
        </div>
      </div>
    </MSection>
  );
}

// THESIS imported from data


export function OverviewThesis({ s }) {
  const points = THESIS[s.id] || THESIS.infrastructure;
  return (
    <MSection icon={ArrowUpRight} iconColor={M.green} title="Investment Thesis" badge="3 reasons">
      <div style={{ padding: "10px 14px 14px" }}>
        {points.map((p, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < points.length - 1 ? 14 : 0 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: M.faint,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: 15,
              }}
            >
              {p.icon}
            </div>
            <div style={{ flex: 1, paddingTop: 2 }}>
              <div style={{ fontSize: 11, color: M.white, lineHeight: 1.55, fontWeight: 500 }}>{p.point}</div>
            </div>
          </div>
        ))}
      </div>
    </MSection>
  );
}

// RISKS imported from data

// riskCol imported from data
// riskDim imported from data

export function OverviewRisks({ s }) {
  const risks = RISKS[s.id] || RISKS.infrastructure;
  const highCount = risks.filter((r) => r.level === "HIGH").length;
  const badge = highCount > 0 ? `${highCount} High` : "Monitored";
  const badgeStyle = highCount > 0 ? { background: M.redDim, border: `1px solid ${M.red}44`, color: M.red } : {};
  return (
    <MSection
      icon={TrendingDown}
      iconColor={M.red}
      title="Key Risks & Watchpoints"
      badge={badge}
      badgeStyle={badgeStyle}
    >
      <div style={{ padding: "10px 14px 14px" }}>
        {risks.map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              padding: "10px 12px",
              borderRadius: 10,
              background: riskDim(r.level),
              border: `1px solid ${riskCol(r.level)}22`,
              marginBottom: i < risks.length - 1 ? 8 : 0,
            }}
          >
            <div style={{ flexShrink: 0, marginTop: 1 }}>
              <span
                style={{
                  fontSize: 8,
                  fontWeight: 800,
                  padding: "2px 5px",
                  borderRadius: 4,
                  background: riskDim(r.level),
                  border: `1px solid ${riskCol(r.level)}44`,
                  color: riskCol(r.level),
                  fontFamily: "Inter,sans-serif",
                  letterSpacing: ".5px",
                }}
              >
                {r.level}
              </span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: M.white, marginBottom: 3 }}>{r.title}</div>
              <div style={{ fontSize: 10, color: M.mid, lineHeight: 1.5, fontFamily: "Inter,sans-serif" }}>
                {r.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </MSection>
  );
}
