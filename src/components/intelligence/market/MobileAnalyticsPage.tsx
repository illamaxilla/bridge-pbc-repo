import React, { useState } from "react";
import {
  TrendingUp,
  BarChart3,
  Activity,
  LayoutGrid,
  Target,
  ArrowUpRight,
  Bookmark,
  User,
} from "lucide-react";
import {
  BarChart as RBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  M,
  msigCol,
  msigDim,
  ANALYTICS_SUBS,
  compute,
  genVolume,
} from "./data";
import { MCard, MSection } from "./MobileComponents";

/* ════════════════════════════════════════
   ANALYTICS PAGE
   ════════════════════════════════════════ */

/* KPIs sub-tab */
export function AnalyticsKPIs({ s }) {
  const total = Math.round((((s.capLow + s.capHigh) / 2) * s.score) / 10);
  const subRev = Math.round(total * 0.56);
  const kpis = [
    { icon: TrendingUp, label: "Market Cap", val: `$${total}B`, sub: "Sector aggregate", chg: "+5.1%" },
    { icon: ArrowUpRight, label: "IRR Ceiling", val: `${s.irrHigh}%`, sub: "Target return", chg: "+2.4%" },
    { icon: LayoutGrid, label: "Sub-sector Rev", val: `$${subRev}B`, sub: "Lead segment", chg: "+3.8%" },
    { icon: Target, label: "BRIDGE Score", val: `${s.score}`, sub: "/ 100 composite", chg: "+1.2%" },
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
        {kpis.map((k, i) => (
          <MCard key={i} style={{ padding: "13px 13px 12px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  background: M.accentDim,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <k.icon size={12} color={M.accent} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: M.green, fontFamily: "Inter,sans-serif" }}>
                {k.chg}
              </span>
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: M.white,
                letterSpacing: "-1px",
                lineHeight: 1,
                marginBottom: 3,
              }}
            >
              {k.val}
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, color: M.mid }}>{k.label}</div>
            <div style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>{k.sub}</div>
          </MCard>
        ))}
      </div>
      {/* Sub-sector Breakdown */}
      <MSection
        icon={LayoutGrid}
        title="Sub-sector Breakdown"
        badge={`${s.subSectors.length} segments`}
        defaultOpen={true}
      >
        <div style={{ padding: "10px 14px 14px" }}>
          {s.subSectors.map((ss, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: M.white, marginBottom: 4 }}>{ss.name}</div>
                <div style={{ height: 4, background: M.faint, borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ width: `${ss.pct}%`, height: "100%", background: M.accent, borderRadius: 2 }} />
                </div>
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: M.accent,
                  fontFamily: "Inter,sans-serif",
                  marginLeft: 12,
                  flexShrink: 0,
                }}
              >
                {ss.pct}%
              </span>
            </div>
          ))}
        </div>
      </MSection>
    </div>
  );
}

/* Performance sub-tab */
export function AnalyticsPerformance({ s }) {
  const perfData = genVolume(s);
  const volData = s.subSectors.map((ss, i) => ({
    initials: ss.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    name: ss.name,
    share: ss.pct,
    growth: Math.round(40 + ss.pct * 1.2),
    risk: Math.round(15 + (100 - ss.pct) * 0.8),
  }));
  return (
    <div>
      {/* Volatility vs Growth list */}
      <MSection
        icon={Activity}
        iconColor={M.accent}
        title="Volatility vs Growth Rate"
        badge="Sub-sectors"
        defaultOpen={true}
      >
        <div style={{ padding: "8px 14px 4px", borderBottom: `1px solid ${M.border}` }}>
          <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>
            Risk-return profile · market share
          </span>
        </div>
        {volData.map((d, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "11px 14px",
              borderBottom: `1px solid ${M.border}`,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: `rgba(27,77,62,${0.4 + d.share / 100})`,
                border: `1px solid ${M.borderG}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
                {d.initials}
              </span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: M.white, marginBottom: 3 }}>{d.name}</div>
              <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                Growth <span style={{ color: M.green, fontWeight: 700 }}>{d.growth}%</span>
                {"  "}
                Risk <span style={{ color: M.amber, fontWeight: 700 }}>{d.risk}%</span>
              </div>
            </div>
            <span
              style={{ fontSize: 14, fontWeight: 800, color: M.accent, fontFamily: "Inter,sans-serif", flexShrink: 0 }}
            >
              {d.share}%
            </span>
          </div>
        ))}
      </MSection>
      {/* Sector Performance Index */}
      <MSection icon={TrendingUp} iconColor={M.green} title="Sector Performance Index" badge="8-Month">
        <div style={{ padding: "4px 14px 14px" }}>
          <div style={{ display: "flex", gap: 12, marginBottom: 10, paddingTop: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: M.accent }} />
              <span style={{ fontSize: 9, color: M.mid, fontFamily: "Inter,sans-serif" }}>Actual</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div
                style={{ width: 7, height: 7, borderRadius: "50%", background: M.faint, border: `1px solid ${M.mid}` }}
              />
              <span style={{ fontSize: 9, color: M.mid, fontFamily: "Inter,sans-serif" }}>AI Projection</span>
            </div>
          </div>
          <div style={{ height: 140 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RBarChart data={perfData} barSize={12} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={M.faint} vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 9, fill: M.muted, fontFamily: "Inter" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis tick={{ fontSize: 9, fill: M.muted }} axisLine={false} tickLine={false} />
                <Bar dataKey="deployed" fill={M.accent} radius={[3, 3, 0, 0]} name="Actual" opacity={0.9} />
                <Bar dataKey="target" fill={`rgba(255,255,255,0.08)`} radius={[3, 3, 0, 0]} name="Projection" />
              </RBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </MSection>
    </div>
  );
}

/* Activity sub-tab */
export function AnalyticsActivity({ s }) {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const hours = ["00", "04", "08", "12", "16", "20"];
  const heatmap = days.map((d) => hours.map((h) => Math.floor(Math.random() * 5)));
  const sources = [
    { l: "Earnings & Policy", pct: 25 },
    { l: "News & Media", pct: 25 },
    { l: "Analyst Ratings", pct: 50 },
  ];
  const barData = Array.from({ length: 25 }, (_, i) => ({ x: i, v: Math.floor(Math.random() * 100) + 20 }));
  const stats = [
    { l: "Active Signals", v: "1,692", chg: "+56%" },
    { l: "Conversion", v: "1,423", chg: "+43%" },
    { l: "Avg Duration", v: "11,992", chg: "+28%" },
  ];
  const heatCols = [
    "rgba(27,77,62,0.15)",
    "rgba(27,77,62,0.3)",
    "rgba(27,77,62,0.5)",
    "rgba(74,222,128,0.4)",
    "rgba(74,222,128,0.7)",
  ];
  return (
    <div>
      {/* Activity Heatmap */}
      <MSection icon={LayoutGrid} iconColor={M.accent} title="Activity Heatmap" badge="7 Days" defaultOpen={true}>
        <div style={{ padding: "10px 14px 14px" }}>
          {/* Hour labels */}
          <div style={{ display: "flex", marginBottom: 4, paddingLeft: 26 }}>
            {hours.map((h) => (
              <div
                key={h}
                style={{ flex: 1, fontSize: 8, color: M.muted, fontFamily: "Inter,sans-serif", textAlign: "center" }}
              >
                {h}
              </div>
            ))}
          </div>
          {/* Grid */}
          {days.map((d, di) => (
            <div key={d} style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
              <span
                style={{
                  fontSize: 8,
                  fontWeight: 600,
                  color: M.muted,
                  fontFamily: "Inter,sans-serif",
                  width: 18,
                  flexShrink: 0,
                }}
              >
                {d}
              </span>
              {hours.map((h, hi) => (
                <div key={h} style={{ flex: 1, height: 22, borderRadius: 4, background: heatCols[heatmap[di][hi]] }} />
              ))}
            </div>
          ))}
          {/* Legend */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
            <span style={{ fontSize: 8, color: M.muted, fontFamily: "Inter,sans-serif" }}>Low</span>
            {heatCols.map((c, i) => (
              <div key={i} style={{ width: 14, height: 14, borderRadius: 3, background: c }} />
            ))}
            <span style={{ fontSize: 8, color: M.muted, fontFamily: "Inter,sans-serif" }}>Peak</span>
          </div>
        </div>
      </MSection>
      {/* Signal Source Breakdown */}
      <MSection
        icon={BarChart3}
        iconColor={M.accent}
        title="Signal Source Breakdown"
        badge="+180%"
        badgeStyle={{ background: M.accentDim }}
      >
        <div style={{ padding: "10px 14px 14px" }}>
          {/* Segmented bar */}
          <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", marginBottom: 12, height: 36 }}>
            {sources.map((s, i) => (
              <div
                key={i}
                style={{
                  flex: s.pct,
                  background: i === 0 ? M.accentDim : i === 1 ? `rgba(27,77,62,0.4)` : `rgba(27,77,62,0.6)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRight: i < 2 ? `1px solid ${M.bg}` : undefined,
                }}
              >
                <span style={{ fontSize: 10, fontWeight: 700, color: M.white, fontFamily: "Inter,sans-serif" }}>
                  {s.pct}%
                </span>
              </div>
            ))}
          </div>
          {sources.map((s, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: i === 0 ? M.accent : i === 1 ? `rgba(27,77,62,0.9)` : `rgba(27,77,62,0.6)`,
                      border: `1px solid ${M.accent}`,
                    }}
                  />
                  <span style={{ fontSize: 11, fontWeight: 600, color: M.white }}>{s.l}</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
                  {s.pct}%
                </span>
              </div>
              <div style={{ height: 3, background: M.faint, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${s.pct}%`, height: "100%", background: M.accent, borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
      </MSection>
      {/* 30-Day Engagement */}
      <MSection
        icon={Activity}
        iconColor={M.green}
        title="30-Day Engagement"
        badge="Live"
        badgeStyle={{ background: M.greenDim, border: `1px solid ${M.green}44` }}
      >
        <div style={{ padding: "10px 14px 14px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
            {stats.map((st, i) => (
              <div key={i} style={{ background: M.faint, borderRadius: 10, padding: "10px 10px 8px" }}>
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    color: M.white,
                    letterSpacing: "-.5px",
                    lineHeight: 1,
                    marginBottom: 2,
                  }}
                >
                  {st.v}
                </div>
                <div style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif", marginBottom: 4 }}>
                  {st.l}
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, color: M.green, fontFamily: "Inter,sans-serif" }}>
                  {st.chg}
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: 80 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RBarChart data={barData} margin={{ top: 0, right: 0, left: -40, bottom: 0 }}>
                <Bar dataKey="v" fill={M.accent} radius={[2, 2, 0, 0]} opacity={0.7} />
                <XAxis dataKey="x" tick={false} axisLine={false} tickLine={false} />
              </RBarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            {["Feb 5", "Feb 15", "Feb 25", "Mar 1"].map((l) => (
              <span key={l} style={{ fontSize: 8, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                {l}
              </span>
            ))}
          </div>
        </div>
      </MSection>
    </div>
  );
}

/* Companies sub-tab */
export function AnalyticsCompanies({ s }) {
  const companiesBySector = {
    financial: [
      { n: "Fidelity Bank Ghana", t: "#FBG", chg: "+6.1%", val: "$1.4B", score: 91 },
      { n: "MTN MoMo", t: "#MTN", chg: "+3.5%", val: "$3.2B", score: 88 },
      { n: "Zeepay", t: "#ZPY", chg: "+2.2%", val: "$280M", score: 83 },
      { n: "Stanbic IBTC", t: "#SIB", chg: "+0.9%", val: "$620M", score: 76 },
      { n: "CalBank Ghana", t: "#CAL", chg: "-0.4%", val: "$310M", score: 71 },
    ],
    technology: [
      { n: "mPharma", t: "#MPH", chg: "+8.2%", val: "$310M", score: 92 },
      { n: "Hubtel", t: "#HBT", chg: "+4.1%", val: "$180M", score: 87 },
      { n: "Rancard", t: "#RCD", chg: "+1.5%", val: "$95M", score: 80 },
      { n: "Softsolutions", t: "#SFT", chg: "-1.2%", val: "$60M", score: 74 },
    ],
    agriculture: [
      { n: "Cocoa Board Ghana", t: "#COC", chg: "+5.3%", val: "$2.1B", score: 89 },
      { n: "Wienco Ghana", t: "#WNK", chg: "+2.8%", val: "$450M", score: 84 },
      { n: "AgroFresh Ghana", t: "#AGF", chg: "+1.1%", val: "$120M", score: 78 },
    ],
  };
  const companies = companiesBySector[s.id] || [
    { n: "Top Sector Leaders", t: "#SEC", chg: "+3.5%", val: "$1.2B", score: s.score },
    { n: "Market Benchmark Co.", t: "#MKT", chg: "+1.8%", val: "$800M", score: Math.round(s.score * 0.95) },
    { n: "BRIDGE Index Fund", t: "#BRG", chg: "+0.9%", val: "$340M", score: Math.round(s.score * 0.88) },
  ];
  return (
    <div>
      {/* Top Companies */}
      <MSection
        icon={User}
        iconColor={M.accent}
        title="Top Companies"
        badge={`${companies.length} active`}
        defaultOpen={true}
      >
        {companies.map((co, i) => {
          const pos = co.chg.startsWith("+");
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 14px",
                borderBottom: `1px solid ${M.border}`,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: M.faint,
                  border: `1px solid ${M.borderG}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 700, color: M.mid, fontFamily: "Inter,sans-serif" }}>
                  {i + 1}
                </span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: M.white }}>{co.n}</div>
                <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
                  {co.t}
                  {"  "}
                  <span style={{ color: pos ? M.green : M.red, fontWeight: 700 }}>{co.chg}</span>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 800,
                    color: M.white,
                    fontFamily: "Inter,sans-serif",
                    letterSpacing: "-.5px",
                  }}
                >
                  {co.val}
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end", marginTop: 2 }}
                >
                  <div style={{ width: 32, height: 3, background: M.faint, borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: `${co.score}%`, height: "100%", background: M.accent, borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 700, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                    {co.score}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </MSection>
      {/* Market Signals */}
      <MSection
        icon={TrendingUp}
        iconColor={M.green}
        title="Market Signals"
        badge={`${s.activity.length}`}
        defaultOpen={true}
      >
        {s.activity.map((a, i) => {
          const c = msigCol(a.sig),
            dim = msigDim(a.sig);
          return (
            <div
              key={i}
              style={{ display: "flex", gap: 10, padding: "11px 14px", borderBottom: `1px solid ${M.border}` }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: c,
                  marginTop: 4,
                  flexShrink: 0,
                  boxShadow: `0 0 5px ${c}`,
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: M.white, marginBottom: 4 }}>{a.h}</div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      padding: "1px 6px",
                      borderRadius: 4,
                      background: dim,
                      color: c,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {a.sig}
                  </span>
                  <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                  <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                    {a.sig === "Bullish" ? "Policy" : "Risk"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </MSection>
    </div>
  );
}

/* Map sub-tab placeholder */
export function AnalyticsMap({ s }) {
  return (
    <MCard style={{ marginBottom: 10 }}>
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: M.accentDim,
            border: `1px solid ${M.accentBorder}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 14px",
          }}
        >
          <Bookmark size={22} color={M.accent} />
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: M.white, marginBottom: 6 }}>Ghana Region Map</div>
        <div style={{ fontSize: 11, color: M.muted, fontFamily: "Inter,sans-serif", lineHeight: 1.6 }}>
          Geographic distribution of {s.short}
          <br />
          ventures and capital deployment
        </div>
        <div
          style={{
            marginTop: 14,
            padding: "7px 16px",
            borderRadius: 20,
            background: M.accentDim,
            border: `1px solid ${M.accentBorder}`,
            display: "inline-block",
          }}
        >
          <span style={{ fontSize: 10, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
            Coming Soon
          </span>
        </div>
      </div>
    </MCard>
  );
}

/* Ventures within Analytics */
export function AnalyticsVentures({ s }) {
  const [tier, setTier] = useState("t1");
  const ventures = s[tier] || [];
  const SIcon = s.icon;
  const tc =
    tier === "t1"
      ? { bg: M.accentDim, col: M.accent, label: "Tier I" }
      : tier === "t2"
        ? { bg: "rgba(74,222,128,0.1)", col: M.green, label: "Tier II" }
        : { bg: M.faint, col: M.mid, label: "Tier III" };
  return (
    <MSection icon={Target} iconColor={M.amber} title="Priority Ventures" badge={`${ventures.length} active`}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, padding: "10px 14px 0" }}>
        {[
          ["t1", "Tier I", s.t1?.length || 0],
          ["t2", "Tier II", s.t2?.length || 0],
          ["t3", "Tier III", s.t3?.length || 0],
        ].map(([v, l, n]) => (
          <button
            key={v}
            onClick={() => setTier(v)}
            style={{
              padding: "8px 0",
              borderRadius: 9,
              border: `1px solid ${tier === v ? M.accentBorder : M.border}`,
              background: tier === v ? M.accentDim : M.faint,
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                color: tier === v ? M.accent : M.mid,
                fontFamily: "Inter,sans-serif",
              }}
            >
              {n}
            </div>
            <div style={{ fontSize: 9, color: tier === v ? M.accent : M.muted, fontFamily: "Inter,sans-serif" }}>
              {l}
            </div>
          </button>
        ))}
      </div>
      <div style={{ padding: "8px 0" }}>
        {ventures.map((v, i) => {
          const rc = v.risk === "LOW" ? M.green : v.risk === "MEDIUM" ? M.amber : M.red;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                borderBottom: `1px solid ${M.border}`,
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                  background: M.faint,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <SIcon size={12} color={M.mid} strokeWidth={1.5} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: M.white, lineHeight: 1.3, marginBottom: 3 }}>
                  {v.name}
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      padding: "1px 5px",
                      borderRadius: 4,
                      background: tc.bg,
                      color: tc.col,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {tc.label}
                  </span>
                  <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{v.cap}</span>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: M.green, fontFamily: "Inter,sans-serif" }}>
                  {v.irr}
                </div>
                <div style={{ fontSize: 9, fontWeight: 700, color: rc, fontFamily: "Inter,sans-serif" }}>{v.risk}</div>
              </div>
            </div>
          );
        })}
      </div>
    </MSection>
  );
}

export function AnalyticsTab({ s, sub, setSub }) {
  const subLabel = ANALYTICS_SUBS.find((t) => t.id === sub)?.label || "KPIs";
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Page label */}
      <div style={{ paddingTop: 8, paddingLeft: 16, paddingRight: 16, paddingBottom: 0, flexShrink: 0 }}>
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
          Analytics · {s.tag} · {subLabel}
        </div>
      </div>
      {/* Hero card */}
      <div style={{ padding: "0 14px", flexShrink: 0 }}>
        <MCard style={{ marginBottom: 10, padding: "13px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0 }}>
              <svg width="52" height="52" viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="20" fill="none" stroke={M.faint} strokeWidth="3" />
                <circle
                  cx="26"
                  cy="26"
                  r="20"
                  fill="none"
                  stroke={M.accent}
                  strokeWidth="3"
                  strokeDasharray={`${(s.score / 100) * 125.7} 125.7`}
                  strokeLinecap="round"
                  transform="rotate(-90 26 26)"
                />
              </svg>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 800, color: M.white, fontFamily: "Inter,sans-serif" }}>
                  {s.score}
                </span>
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: M.white, lineHeight: 1.2 }}>{s.full}</div>
              <div style={{ display: "flex", gap: 5, marginTop: 6, flexWrap: "wrap" }}>
                {[`Cap $${s.capLow}–${s.capHigh}M`, `IRR ${s.irrHigh}%`, `Score ${s.score}`].map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      padding: "2px 6px",
                      borderRadius: 4,
                      background: M.accentDim,
                      border: `1px solid ${M.accentBorder}`,
                      color: M.accent,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </MCard>
      </div>
      {/* Sub content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 14px 16px" }}>
        {sub === "kpis" && <AnalyticsKPIs s={s} />}
        {sub === "performance" && <AnalyticsPerformance s={s} />}
        {sub === "activity" && <AnalyticsActivity s={s} />}
        {sub === "companies" && <AnalyticsCompanies s={s} />}
        {sub === "map" && <AnalyticsMap s={s} />}
        <AnalyticsVentures s={s} />
      </div>
    </div>
  );
}
