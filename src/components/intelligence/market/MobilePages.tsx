import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Activity,
  LayoutGrid,
  Target,
  ArrowUpRight,
  Bookmark,
  Zap,
  User,
  AlertCircle,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart as RBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  C,
  SECTORS,
  SectorData,
  M,
  msigCol,
  msigDim,
  scoreToSig,
  compute,
  genTrend,
  genVolume,
  totalCapAll,
  SCORE_DIMS,
  THESIS,
  RISKS,
  riskCol,
  riskDim,
  ANALYTICS_SUBS,
  CAP_STRUCTURE,
  CO_INVESTORS,
  ENTRY_WINDOWS,
} from "./data";
import { ChartTip } from "./DesktopComponents";
import { MCard, MCardHeader, MSection, MobileHeader, SectorStrip, MSignalRow, MobileBottomNav } from "./MobileComponents";

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
const SCORE_DIMS = {
  infrastructure: { pp: 88, sf: 91, fe: 82, ss: 79 },
  financial: { pp: 94, sf: 90, fe: 86, ss: 88 },
  health: { pp: 96, sf: 87, fe: 78, ss: 81 },
  technology: { pp: 85, sf: 93, fe: 89, ss: 91 },
  education: { pp: 92, sf: 88, fe: 83, ss: 80 },
  agriculture: { pp: 90, sf: 91, fe: 85, ss: 84 },
  creative: { pp: 80, sf: 84, fe: 77, ss: 82 },
  housing: { pp: 88, sf: 85, fe: 80, ss: 83 },
  tourism: { pp: 83, sf: 82, fe: 79, ss: 80 },
  energy: { pp: 87, sf: 89, fe: 84, ss: 86 },
  manufacturing: { pp: 82, sf: 86, fe: 83, ss: 80 },
  transportation: { pp: 86, sf: 88, fe: 81, ss: 83 },
};
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

/* ── Investment Thesis ── */
const THESIS = {
  infrastructure: [
    {
      icon: "🏗️",
      point:
        "Ghana's infrastructure deficit represents a $12B+ addressable gap, with government committing 6% of GDP to close it by 2030.",
    },
    {
      icon: "🌍",
      point:
        "West Africa's fastest-growing logistics corridor runs through Ghana — port, road, and rail upgrades are multiplying returns across sectors.",
    },
    {
      icon: "⚡",
      point:
        "BRIDGE's blended finance model de-risks early capital, enabling private sector entry at project stages previously inaccessible.",
    },
  ],
  financial: [
    {
      icon: "📱",
      point:
        "Ghana leads sub-Saharan Africa in mobile money penetration — over 17M registered MoMo accounts creating instant distribution rails.",
    },
    {
      icon: "🏦",
      point:
        "Only 30% of adults hold formal bank accounts, positioning digital lending and insurance as the highest-growth entry points.",
    },
    {
      icon: "🔗",
      point:
        "Bank of Ghana's Digital Credit Directive (2026) creates regulatory clarity that significantly reduces execution risk for fintechs.",
    },
  ],
  health: [
    {
      icon: "🏥",
      point:
        "Ghana's NHIS covers 40% of population — private health infrastructure investment is actively incentivised through public-private frameworks.",
    },
    {
      icon: "💊",
      point:
        "Local pharmaceutical manufacturing represents a $2B import-substitution opportunity as policy shifts favour domestic production.",
    },
    {
      icon: "📊",
      point:
        "Digital health records adoption has reached 60% of urban facilities, creating infrastructure for telemedicine and diagnostics scale.",
    },
  ],
  technology: [
    {
      icon: "🤖",
      point:
        "Ghana's tech talent pool is the fastest-growing in West Africa — 3 unicorns in 5 years signal deep ecosystem maturity.",
    },
    {
      icon: "🏙️",
      point:
        "Accra is being positioned as the AI & fintech hub of the continent, with preferential tax regimes for qualifying tech ventures.",
    },
    {
      icon: "🔌",
      point:
        "High mobile internet penetration (68%) and falling data costs are accelerating B2C digital product adoption at scale.",
    },
  ],
  education: [
    {
      icon: "🎓",
      point:
        "Ghana's 18-35 demographic bulge of 9M+ is the largest skills-ready cohort in West Africa, representing an outsized human capital opportunity.",
    },
    {
      icon: "📚",
      point:
        "EdTech adoption accelerated 4x post-2020, with government e-learning infrastructure now reaching 60% of secondary schools.",
    },
    {
      icon: "🏭",
      point:
        "Ghana's industrial strategy actively prioritises TVET (Technical & Vocational) — creating pipeline alignment between training providers and manufacturers.",
    },
  ],
  agriculture: [
    {
      icon: "🌾",
      point:
        "Agriculture contributes 20% of GDP but operates at 40% of potential yield — productivity improvements alone can unlock $4B+ annually.",
    },
    {
      icon: "🥑",
      point:
        "Value-added processing is the critical gap: less than 15% of Ghana's agri output is processed locally before export, leaving major margin on the table.",
    },
    {
      icon: "🌧️",
      point:
        "Climate-smart farming and irrigation investment is prioritised in the 2026 budget, aligning policy support with BRIDGE's deployment thesis.",
    },
  ],
  creative: [
    {
      icon: "🎵",
      point:
        "Afrobeats, Afrofusion, and Ghanaian film generate $1.4B+ annually — IP monetisation infrastructure is the highest-return near-term opportunity.",
    },
    {
      icon: "🌐",
      point:
        "Digital streaming has created global distribution with zero marginal cost — Ghana's creative output is now globally addressable.",
    },
    {
      icon: "🏟️",
      point:
        "Sports infrastructure investment yields multiplier returns via tourism, broadcast rights, and athlete development pipeline.",
    },
  ],
  housing: [
    {
      icon: "🏠",
      point:
        "Ghana faces a 1.8M unit housing deficit growing at 100K units/year — demand fundamentals are structurally unshakeable.",
    },
    {
      icon: "🏙️",
      point:
        "Affordable housing incentives under Ghana REIT legislation make institutional capital deployment highly efficient for the first time.",
    },
    {
      icon: "🔨",
      point:
        "Local building materials sector is an adjacent play — cement, steel, and prefab can capture 30%+ of project cost within Ghana.",
    },
  ],
  tourism: [
    {
      icon: "✈️",
      point:
        "Year of Return legacy continues to drive diaspora arrivals — Ghana welcomed 1.1M visitors in 2025, up 34% from 2022.",
    },
    {
      icon: "🏖️",
      point:
        "Eco-tourism and heritage tourism are the fastest-growing segments, aligning with Ghana's globally recognised cultural assets.",
    },
    {
      icon: "🍽️",
      point:
        "Hospitality infrastructure remains undercapitalised relative to demand — mid-market hotels, lodges, and experience operators are acutely undersupplied.",
    },
  ],
  energy: [
    {
      icon: "☀️",
      point:
        "Ghana has among the highest solar irradiance in West Africa with only 1% of renewable potential currently deployed — a compelling first-mover window.",
    },
    {
      icon: "⚡",
      point:
        "Energy access gaps in northern regions (40% off-grid) represent addressable markets for mini-grid and clean cooking solutions.",
    },
    {
      icon: "🔋",
      point:
        "Government's 10% renewable energy target by 2030 creates policy-backed demand for utility-scale and distributed renewable projects.",
    },
  ],
  manufacturing: [
    {
      icon: "🏭",
      point:
        "Ghana's AfCFTA positioning makes it the logical manufacturing export base for a 1.4B person continental market — without tariff barriers.",
    },
    {
      icon: "🔩",
      point:
        "Light industry (packaging, food processing, textiles) can absorb capital at low risk with rapid payback cycles of 3–5 years.",
    },
    {
      icon: "🌱",
      point:
        "Government's One District One Factory initiative provides infrastructure co-investment, reducing greenfield capital requirements significantly.",
    },
  ],
  transportation: [
    {
      icon: "🚢",
      point:
        "Tema Port expansion and Accra-Kumasi highway upgrade are catalytic infrastructure plays unlocking regional logistics corridors.",
    },
    {
      icon: "🚌",
      point:
        "Urban mobility is chronically underserved — ride-hailing, e-mobility, and last-mile logistics are growing at 30%+ annually.",
    },
    {
      icon: "🛣️",
      point:
        "Ghana's 2026 transportation budget is the largest in a decade, signalling sustained government co-investment in the sector.",
    },
  ],
};

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

/* ── Key Risks ── */
const RISKS = {
  infrastructure: [
    {
      level: "HIGH",
      title: "Procurement Delays",
      desc: "Public tendering cycles average 18–24 months, compressing effective deployment windows.",
    },
    {
      level: "MED",
      title: "FX Exposure",
      desc: "USD-denominated contracts vs. cedi revenue creates currency mismatch risk on long-duration projects.",
    },
    {
      level: "LOW",
      title: "Land Tenure",
      desc: "Customary land rights can complicate title clarity — BRIDGE mitigates through community engagement protocols.",
    },
  ],
  financial: [
    {
      level: "MED",
      title: "Regulatory Shifts",
      desc: "BoG policy changes can alter fintech operating conditions rapidly — ongoing engagement is essential.",
    },
    {
      level: "MED",
      title: "Credit Default Risk",
      desc: "SME borrower default rates spike during macro downturns — portfolio diversification is the primary hedge.",
    },
    {
      level: "LOW",
      title: "Competition Intensity",
      desc: "MTN, Fidelity, and Zeepay dominate distribution; new entrants must carve differentiated niches.",
    },
  ],
  health: [
    {
      level: "HIGH",
      title: "Regulatory Approval",
      desc: "FDA Ghana and Ministry of Health approval timelines for new facilities average 12–18 months.",
    },
    {
      level: "MED",
      title: "Healthcare Workforce",
      desc: "Specialist doctor-to-patient ratios remain critically low — staffing is a persistent operational constraint.",
    },
    {
      level: "LOW",
      title: "NHIS Reimbursement",
      desc: "Delays in NHIS claims processing can create cash flow pressure for private facility operators.",
    },
  ],
  technology: [
    {
      level: "MED",
      title: "Talent Retention",
      desc: "Top Ghanaian tech talent is increasingly recruited internationally — retention requires competitive equity packages.",
    },
    {
      level: "MED",
      title: "Data Infrastructure",
      desc: "Intermittent power and connectivity in non-urban areas limits market penetration for data-heavy products.",
    },
    {
      level: "LOW",
      title: "Cybersecurity",
      desc: "Rising cyber threats targeting fintech and data platforms require proactive security investment from day one.",
    },
  ],
  agriculture: [
    {
      level: "HIGH",
      title: "Climate Volatility",
      desc: "Erratic rainfall patterns in northern Ghana are intensifying, directly threatening yield predictability.",
    },
    {
      level: "MED",
      title: "Commodity Price Risk",
      desc: "Global cocoa and cashew price fluctuations can compress margins significantly in export-oriented ventures.",
    },
    {
      level: "LOW",
      title: "Supply Chain Gaps",
      desc: "Post-harvest losses of 20–30% persist due to cold chain deficits — a risk and an opportunity simultaneously.",
    },
  ],
  education: [
    {
      level: "MED",
      title: "Public Sector Dependency",
      desc: "Much of EdTech revenue depends on government procurement, which is subject to budget cycles and delays.",
    },
    {
      level: "LOW",
      title: "Device Penetration",
      desc: "Student device ownership outside Accra remains low — hardware subsidies may be needed for scale.",
    },
    {
      level: "LOW",
      title: "Curriculum Alignment",
      desc: "Misalignment between training outputs and employer needs can affect graduate employment rates and brand.",
    },
  ],
  creative: [
    {
      level: "HIGH",
      title: "IP Rights Enforcement",
      desc: "Copyright enforcement in Ghana remains inconsistent — revenue leakage from piracy affects unit economics.",
    },
    {
      level: "MED",
      title: "Streaming Revenue",
      desc: "African streaming rates are significantly below global averages — monetisation per stream remains low.",
    },
    {
      level: "LOW",
      title: "Venue Infrastructure",
      desc: "World-class performance and production infrastructure is scarce outside Accra, limiting event scale.",
    },
  ],
  housing: [
    {
      level: "HIGH",
      title: "Mortgage Market",
      desc: "Mortgage penetration below 1% of GDP means most buyers need rent-to-own or developer financing structures.",
    },
    {
      level: "MED",
      title: "Construction Cost Inflation",
      desc: "Imported materials (steel, cement) carry significant FX risk — local sourcing strategies are critical.",
    },
    {
      level: "LOW",
      title: "Planning Approvals",
      desc: "District Assembly planning permits can take 6–12 months in secondary cities, affecting project timelines.",
    },
  ],
  tourism: [
    {
      level: "MED",
      title: "Seasonal Concentration",
      desc: "70% of tourist arrivals cluster in Q4 and Q1 — revenue smoothing and off-season programming are essential.",
    },
    {
      level: "MED",
      title: "Infrastructure Gaps",
      desc: "Road access and utilities in eco-tourism zones remain underdeveloped, raising capex requirements.",
    },
    {
      level: "LOW",
      title: "Global Macro Sensitivity",
      desc: "Long-haul leisure travel is discretionary and sensitive to global economic downturns.",
    },
  ],
  energy: [
    {
      level: "HIGH",
      title: "Grid Interconnection",
      desc: "Connecting renewable projects to the national grid faces technical and bureaucratic delays of 12–24 months.",
    },
    {
      level: "MED",
      title: "Financing Structures",
      desc: "Long payback periods (10–15 years) for utility-scale projects require patient capital and DFI co-investment.",
    },
    {
      level: "LOW",
      title: "Technology Risk",
      desc: "Emerging storage technology costs remain elevated — project economics improve as battery prices fall.",
    },
  ],
  manufacturing: [
    {
      level: "MED",
      title: "Input Import Dependency",
      desc: "Key raw materials are still largely imported — supply chain disruptions directly impact production continuity.",
    },
    {
      level: "MED",
      title: "Energy Reliability",
      desc: "Power outages (dumsor) impose real operational costs — on-site generation adds to capex requirements.",
    },
    {
      level: "LOW",
      title: "Skills Gap",
      desc: "Precision manufacturing requires technical skills not widely available — workforce development is essential.",
    },
  ],
  transportation: [
    {
      level: "HIGH",
      title: "Traffic Congestion Externalities",
      desc: "Accra's road network is operating at 140% capacity — congestion imposes real costs on urban logistics operators.",
    },
    {
      level: "MED",
      title: "Regulatory Fragmentation",
      desc: "Transport licensing across regions is inconsistent — multi-region operators face compliance complexity.",
    },
    {
      level: "LOW",
      title: "EV Infrastructure",
      desc: "Electric vehicle adoption is nascent; charging infrastructure requires co-investment to unlock e-mobility at scale.",
    },
  ],
};
const riskCol = (l) => (l === "HIGH" ? M.red : l === "MED" ? M.amber : M.green);
const riskDim = (l) => (l === "HIGH" ? M.redDim : l === "MED" ? M.amberDim : M.greenDim);

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

/* ════════════════════════════════════════
   WATCH / RESOURCES / DASHBOARD (stubs)
   ════════════════════════════════════════ */
export function WatchTab({ s }) {
  const watched = [...SECTORS].sort((a, b) => b.score - a.score).slice(0, 6);
  return (
    <div style={{ padding: "12px 14px 16px" }}>
      <div style={{ marginBottom: 10, padding: "8px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: M.white, marginBottom: 2 }}>Watchlist</div>
        <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>
          Tracking {watched.length} sectors · Live signals
        </div>
      </div>
      {watched.map((sec, i) => {
        const SIcon = sec.icon,
          sig = scoreToSig(sec.score),
          sigC = msigCol(sig),
          sigD = msigDim(sig);
        return (
          <MCard key={sec.id} style={{ marginBottom: 8, padding: "12px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: M.accentDim,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <SIcon size={14} color={M.accent} strokeWidth={1.5} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: M.white }}>{sec.short}</div>
                <div style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                  ${sec.capLow}–{sec.capHigh}M · IRR {sec.irrHigh}%
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: M.white,
                    fontFamily: "Inter,sans-serif",
                    letterSpacing: "-1px",
                  }}
                >
                  {sec.score}
                </div>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    padding: "1px 6px",
                    borderRadius: 4,
                    background: sigD,
                    color: sigC,
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  {sig}
                </span>
              </div>
            </div>
          </MCard>
        );
      })}
    </div>
  );
}

export function ResourcesTab() {
  const docs = [
    { title: "BRIDGE Ghana Investment Thesis 2026", type: "White Paper", date: "Mar 2026", pages: 48 },
    { title: "12-Sector Portfolio Analysis", type: "Sector Report", date: "Feb 2026", pages: 120 },
    { title: "Ejura Agricultural Hub Business Plan", type: "Business Plan", date: "Jan 2026", pages: 64 },
    { title: "Financial Inclusion Deep Dive", type: "Sector Analysis", date: "Dec 2025", pages: 35 },
    { title: "Infrastructure & Basic Services", type: "Sector Analysis", date: "Nov 2025", pages: 41 },
    { title: "Ghana 2026 Budget Alignment", type: "Policy Brief", date: "Mar 2026", pages: 22 },
  ];
  const typeCol = {
    "White Paper": M.accent,
    "Sector Report": "#60A5FA",
    "Business Plan": M.green,
    "Sector Analysis": M.amber,
    "Policy Brief": "#C084FC",
  };
  return (
    <div style={{ padding: "12px 14px 16px" }}>
      <div style={{ marginBottom: 12, padding: "4px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: M.white, marginBottom: 2 }}>Resources & Reports</div>
        <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>
          {docs.length} documents · BRIDGE Intelligence Library
        </div>
      </div>
      {docs.map((doc, i) => {
        const col = typeCol[doc.type] || M.accent;
        return (
          <MCard key={i} style={{ marginBottom: 8, padding: "13px 14px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: `${col}18`,
                  border: `1px solid ${col}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Bookmark size={13} color={col} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: M.white, lineHeight: 1.3, marginBottom: 5 }}>
                  {doc.title}
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      padding: "1px 6px",
                      borderRadius: 4,
                      background: `${col}18`,
                      color: col,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {doc.type}
                  </span>
                  <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{doc.date}</span>
                  <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{doc.pages}pp</span>
                </div>
              </div>
              <div style={{ flexShrink: 0 }}>
                <ArrowUpRight size={14} color={M.muted} />
              </div>
            </div>
          </MCard>
        );
      })}
    </div>
  );
}

export function DashboardTab({ s, setPage }) {
  const sorted = [...SECTORS].sort((a, b) => b.score - a.score);
  const total = Math.round(totalCapAll());
  return (
    <div style={{ padding: "12px 14px 16px" }}>
      {/* Welcome row */}
      <MCard style={{ marginBottom: 10, padding: "16px 16px" }}>
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: M.muted,
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontFamily: "Inter,sans-serif",
            marginBottom: 4,
          }}
        >
          BRIDGE Intelligence · Mar 2026
        </div>
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: M.white,
            letterSpacing: "-.5px",
            lineHeight: 1.2,
            marginBottom: 6,
          }}
        >
          Ghana Investment
          <br />
          Control Panel
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[
            ["12 Sectors", M.accent],
            ["174 Ventures", "#60A5FA"],
            ["Live", M.green],
          ].map(([l, c]) => (
            <span
              key={l}
              style={{
                fontSize: 9,
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: 20,
                background: `${c}18`,
                border: `1px solid ${c}30`,
                color: c,
                fontFamily: "Inter,sans-serif",
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </MCard>
      {/* Quick stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
        {[
          { l: "Portfolio Capital", v: `$${total}M`, sub: "Across all sectors", c: M.accent },
          { l: "Active Sectors", v: "12", sub: "All deploying", c: M.green },
          { l: "Top Score", v: `${sorted[0].score}`, sub: sorted[0].short, c: M.accent },
          { l: "Signals Today", v: "48", sub: "Live intelligence", c: "#60A5FA" },
        ].map((item, i) => (
          <MCard key={i} style={{ padding: "12px 12px" }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: item.c,
                letterSpacing: "-1px",
                lineHeight: 1,
                marginBottom: 3,
              }}
            >
              {item.v}
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, color: M.white }}>{item.l}</div>
            <div style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>{item.sub}</div>
          </MCard>
        ))}
      </div>
      {/* Quick sector leaderboard */}
      <MCard style={{ marginBottom: 10 }}>
        <div
          style={{
            padding: "11px 14px",
            borderBottom: `1px solid ${M.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, color: M.white }}>Sector Leaderboard</span>
          <span style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>by BRIDGE Score</span>
        </div>
        {sorted.slice(0, 5).map((sec, i) => {
          const SIcon = sec.icon,
            sig = scoreToSig(sec.score),
            sigC = msigCol(sig);
          return (
            <div
              key={sec.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 14px",
                borderBottom: `1px solid ${M.border}`,
              }}
            >
              <span
                style={{ fontSize: 11, fontWeight: 700, color: M.muted, fontFamily: "Inter,sans-serif", width: 16 }}
              >
                {i + 1}
              </span>
              <SIcon size={13} color={M.accent} strokeWidth={1.5} />
              <span style={{ flex: 1, fontSize: 11, fontWeight: 600, color: M.white }}>{sec.short}</span>
              <div style={{ width: 50, height: 3, background: M.faint, borderRadius: 2, overflow: "hidden" }}>
                <div style={{ width: `${sec.score}%`, height: "100%", background: M.accent, borderRadius: 2 }} />
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: sigC,
                  fontFamily: "Inter,sans-serif",
                  width: 24,
                  textAlign: "right",
                }}
              >
                {sec.score}
              </span>
            </div>
          );
        })}
      </MCard>
    </div>
  );
}

export function SignalsTab({ s }) {
  const [filter, setFilter] = useState("all");
  const signals = s.activity || [];
  const filtered = filter === "all" ? signals : signals.filter((a) => a.sig === filter);
  const counts = {
    Bullish: signals.filter((a) => a.sig === "Bullish").length,
    Bearish: signals.filter((a) => a.sig === "Bearish").length,
    Neutral: signals.filter((a) => a.sig === "Neutral").length,
  };
  return (
    <div style={{ padding: "12px 14px 80px" }}>
      <div
        style={{
          fontSize: 9,
          fontWeight: 700,
          color: M.muted,
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          fontFamily: "Inter,sans-serif",
          marginBottom: 10,
        }}
      >
        Intelligence · {s.short}
      </div>
      {/* Stat row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
        {[
          ["Bullish", counts.Bullish, M.green, M.greenDim],
          ["Bearish", counts.Bearish, M.red, M.redDim],
          ["Neutral", counts.Neutral, M.amber, M.amberDim],
        ].map(([l, n, col, bg]) => (
          <MCard
            key={l}
            style={{
              padding: "10px 12px",
              textAlign: "center",
              cursor: "pointer",
              border: filter === l ? `1px solid ${col}` : `1px solid ${M.border}`,
              background: filter === l ? bg : M.card,
            }}
            onClick={() => setFilter(filter === l ? "all" : l)}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: col, fontFamily: "Inter,sans-serif", lineHeight: 1 }}>
              {n}
            </div>
            <div style={{ fontSize: 9, color: M.mid, fontFamily: "Inter,sans-serif", marginTop: 3 }}>{l}</div>
          </MCard>
        ))}
      </div>
      {/* Filter pills */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {["all", "Bullish", "Bearish", "Neutral"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "4px 10px",
              borderRadius: 20,
              border: `1px solid ${filter === f ? M.accentBorder : M.border}`,
              background: filter === f ? M.accentDim : "transparent",
              fontSize: 9,
              fontWeight: 700,
              color: filter === f ? M.accent : M.muted,
              fontFamily: "Inter,sans-serif",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
          >
            {f === "all" ? "All" : f}
          </button>
        ))}
      </div>
      {/* Signal list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map((a, i) => {
          const col = msigCol(a.sig),
            dim = msigDim(a.sig);
          return (
            <MCard key={i} style={{ padding: "12px 14px" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 9,
                    background: dim,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  {a.sig === "Bullish" ? (
                    <TrendingUp size={14} color={col} />
                  ) : a.sig === "Bearish" ? (
                    <TrendingDown size={14} color={col} />
                  ) : (
                    <Minus size={14} color={col} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: M.white, lineHeight: 1.35, marginBottom: 4 }}>
                    {a.h}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        padding: "2px 7px",
                        borderRadius: 4,
                        background: dim,
                        color: col,
                        fontFamily: "Inter,sans-serif",
                      }}
                    >
                      {a.sig}
                    </span>
                    <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                    {a.amt && (
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: M.accent,
                          fontFamily: "Inter,sans-serif",
                          marginLeft: "auto",
                        }}
                      >
                        {a.amt}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </MCard>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   VENTURES TAB — Key ventures in sector
   ════════════════════════════════════════ */
export function VenturesOverviewTab({ s }) {
  const [tier, setTier] = useState("t1");
  const [expanded, setExpanded] = useState(null);
  const ventures = s[tier] || [];
  const SIcon = s.icon;
  const allV = [...(s.t1 || []), ...(s.t2 || []), ...(s.t3 || [])];
  const riskCounts = {
    LOW: allV.filter((v) => v.risk === "LOW").length,
    MEDIUM: allV.filter((v) => v.risk === "MEDIUM").length,
    HIGH: allV.filter((v) => v.risk === "HIGH").length,
  };
  const avgIRR = allV.length
    ? Math.round(allV.reduce((a, v) => a + (parseInt(v.irr) || s.irrLow), 0) / allV.length)
    : 0;
  const tiers = [
    {
      id: "t1",
      label: "Tier I",
      sublabel: "Lead Opportunities",
      col: M.accent,
      dim: M.accentDim,
      count: (s.t1 || []).length,
    },
    {
      id: "t2",
      label: "Tier II",
      sublabel: "Secondary Pipeline",
      col: "#60A5FA",
      dim: "rgba(96,165,250,0.12)",
      count: (s.t2 || []).length,
    },
    {
      id: "t3",
      label: "Tier III",
      sublabel: "Long-Horizon",
      col: M.amber,
      dim: M.amberDim,
      count: (s.t3 || []).length,
    },
  ];
  const active = tiers.find((t) => t.id === tier);

  const ventureMeta = {
    t1: {
      badge: "BRIDGE Priority",
      col: M.accent,
      bg: M.accentDim,
      desc: "Highest-conviction opportunities. Immediate deployment readiness, clearest path to target IRR.",
    },
    t2: {
      badge: "Pipeline",
      col: "#60A5FA",
      bg: "rgba(96,165,250,0.12)",
      desc: "Near-term opportunities requiring moderate development before deployment.",
    },
    t3: {
      badge: "Long-Horizon",
      col: M.amber,
      bg: M.amberDim,
      desc: "Strategic bets with longer development cycles and higher transformation potential.",
    },
  };
  const meta = ventureMeta[tier];

  return (
    <div style={{ padding: "12px 14px 80px" }}>
      <div
        style={{
          fontSize: 9,
          fontWeight: 700,
          color: M.muted,
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          fontFamily: "Inter,sans-serif",
          marginBottom: 10,
        }}
      >
        Ventures · {s.short}
      </div>

      {/* Summary row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
        {[
          { l: "Total", v: `${allV.length}`, sub: "identified", col: M.accent },
          { l: "Avg IRR", v: `${avgIRR}%`, sub: "est. return", col: M.green },
          { l: "Low Risk", v: `${riskCounts.LOW}`, sub: "ventures", col: "#60A5FA" },
        ].map((item, i) => (
          <MCard key={i} style={{ padding: "10px 12px", textAlign: "center" }}>
            <div
              style={{ fontSize: 18, fontWeight: 800, color: item.col, fontFamily: "Inter,sans-serif", lineHeight: 1 }}
            >
              {item.v}
            </div>
            <div style={{ fontSize: 9, fontWeight: 600, color: M.white, marginTop: 2 }}>{item.l}</div>
            <div style={{ fontSize: 8, color: M.muted, fontFamily: "Inter,sans-serif" }}>{item.sub}</div>
          </MCard>
        ))}
      </div>

      {/* Risk distribution */}
      <MCard style={{ padding: "12px 14px", marginBottom: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: M.white, marginBottom: 8 }}>
          Portfolio Risk Distribution
        </div>
        <div style={{ height: 6, borderRadius: 3, overflow: "hidden", display: "flex", marginBottom: 8 }}>
          {allV.length > 0 &&
            [
              { risk: "LOW", col: M.green },
              { risk: "MEDIUM", col: M.amber },
              { risk: "HIGH", col: M.red },
            ].map(({ risk, col }) => (
              <div
                key={risk}
                style={{ width: `${(riskCounts[risk] / allV.length) * 100}%`, height: "100%", background: col }}
              />
            ))}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {[
            ["LOW", M.green, M.greenDim],
            ["MEDIUM", M.amber, M.amberDim],
            ["HIGH", M.red, M.redDim],
          ].map(([risk, col, dim]) => (
            <div key={risk} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: 2, background: col }} />
              <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                {risk} ({riskCounts[risk]})
              </span>
            </div>
          ))}
        </div>
      </MCard>

      {/* Tier selector */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 10 }}>
        {tiers.map((t) => (
          <div
            key={t.id}
            onClick={() => {
              setTier(t.id);
              setExpanded(null);
            }}
            style={{
              padding: "10px 12px",
              textAlign: "center",
              cursor: "pointer",
              borderRadius: 16,
              border: tier === t.id ? `1px solid ${t.col}` : `1px solid ${M.border}`,
              background: tier === t.id ? t.dim : M.card,
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: tier === t.id ? t.col : M.muted,
                fontFamily: "Inter,sans-serif",
                lineHeight: 1,
              }}
            >
              {t.count}
            </div>
            <div
              style={{
                fontSize: 9,
                color: tier === t.id ? t.col : M.muted,
                fontFamily: "Inter,sans-serif",
                marginTop: 3,
                fontWeight: tier === t.id ? 700 : 400,
              }}
            >
              {t.label}
            </div>
          </div>
        ))}
      </div>

      {/* Tier description */}
      <div
        style={{
          padding: "10px 12px",
          borderRadius: 10,
          background: meta.bg,
          border: `1px solid ${meta.col}30`,
          marginBottom: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
          <span
            style={{
              fontSize: 8,
              fontWeight: 800,
              padding: "2px 6px",
              borderRadius: 3,
              background: `${meta.col}30`,
              color: meta.col,
              fontFamily: "Inter,sans-serif",
            }}
          >
            {meta.badge}
          </span>
          <span style={{ fontSize: 10, fontWeight: 700, color: M.white }}>{active.sublabel}</span>
        </div>
        <div style={{ fontSize: 10, color: M.mid, lineHeight: 1.5, fontFamily: "Inter,sans-serif" }}>{meta.desc}</div>
      </div>

      {/* Venture list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {ventures.map((v, i) => {
          const rc = v.risk === "LOW" ? M.green : v.risk === "MEDIUM" ? M.amber : M.red;
          const rd = v.risk === "LOW" ? M.greenDim : v.risk === "MEDIUM" ? M.amberDim : M.redDim;
          const isOpen = expanded === i;
          const capMid = v.cap ? v.cap.replace(/\$|\s/g, "") : "-";
          const irrMid = v.irr || "-";
          return (
            <MCard
              key={i}
              style={{ padding: "12px 14px", cursor: "pointer" }}
              onClick={() => setExpanded(isOpen ? null : i)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: active.dim,
                    border: `1px solid ${active.col}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <SIcon size={15} color={active.col} strokeWidth={1.5} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: M.white, marginBottom: 3, paddingRight: 4 }}>
                    {v.name}
                  </div>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
                    <span
                      style={{
                        fontSize: 8,
                        fontWeight: 700,
                        padding: "2px 6px",
                        borderRadius: 3,
                        background: active.dim,
                        color: active.col,
                        fontFamily: "Inter,sans-serif",
                      }}
                    >
                      {active.label}
                    </span>
                    <span
                      style={{
                        fontSize: 8,
                        fontWeight: 700,
                        padding: "2px 5px",
                        borderRadius: 3,
                        background: rd,
                        color: rc,
                        fontFamily: "Inter,sans-serif",
                      }}
                    >
                      {v.risk}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: M.green,
                      fontFamily: "Inter,sans-serif",
                      letterSpacing: "-0.3px",
                    }}
                  >
                    {v.irr}
                  </div>
                  <div style={{ fontSize: 8, color: M.muted, fontFamily: "Inter,sans-serif" }}>IRR</div>
                </div>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={M.muted}
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={{ flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>

              {/* Expanded detail */}
              {isOpen && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${M.border}` }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
                    {[
                      { l: "Capital", v: v.cap || "TBD", col: M.accent },
                      { l: "IRR", v: v.irr || "TBD", col: M.green },
                      { l: "Risk", v: v.risk, col: rc },
                    ].map((m, j) => (
                      <div
                        key={j}
                        style={{
                          padding: "8px 10px",
                          borderRadius: 8,
                          background: "rgba(255,255,255,0.03)",
                          border: `1px solid ${M.border}`,
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            color: m.col,
                            fontFamily: "Inter,sans-serif",
                            lineHeight: 1,
                            marginBottom: 2,
                          }}
                        >
                          {m.v}
                        </div>
                        <div style={{ fontSize: 8, color: M.muted, fontFamily: "Inter,sans-serif" }}>{m.l}</div>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      padding: "8px 10px",
                      borderRadius: 8,
                      background: active.dim,
                      border: `1px solid ${active.col}20`,
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: active.col,
                        marginBottom: 4,
                        fontFamily: "Inter,sans-serif",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      BRIDGE Role
                    </div>
                    <div style={{ fontSize: 10, color: M.white, lineHeight: 1.45 }}>
                      {tier === "t1"
                        ? "Direct operator or lead co-investor. BRIDGE anchors capital and provides operational infrastructure."
                        : tier === "t2"
                          ? "Strategic co-investor. BRIDGE contributes sector expertise and network while a local partner leads operations."
                          : "Advisory & pipeline development. BRIDGE supports feasibility and structures the deal for future T1 entry."}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {(s.cross || []).slice(0, 3).map((sid, j) => {
                      const cross = SECTORS.find((sec) => sec.id === sid);
                      if (!cross) return null;
                      return (
                        <div
                          key={j}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            padding: "3px 8px",
                            borderRadius: 20,
                            background: M.faint,
                            border: `1px solid ${M.border}`,
                          }}
                        >
                          {cross.svgIcon(M.muted, 10)}
                          <span style={{ fontSize: 8, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                            {cross.short}
                          </span>
                        </div>
                      );
                    })}
                    {(s.cross || []).length > 0 && (
                      <span
                        style={{
                          fontSize: 8,
                          color: M.muted,
                          fontFamily: "Inter,sans-serif",
                          padding: "3px 0",
                          alignSelf: "center",
                        }}
                      >
                        cross-sector
                      </span>
                    )}
                  </div>
                </div>
              )}
            </MCard>
          );
        })}
      </div>
    </div>
  );
}

export function CapitalTab({ s }) {
  const c = compute(s);
  const data = genVolume(s);
  const last = data[data.length - 1].deployed,
    prev = data[data.length - 2].deployed;
  const chg = Math.round(((last - prev) / prev) * 100);
  const totalV = (s.t1?.length || 0) + (s.t2?.length || 0) + (s.t3?.length || 0);
  const capStruct = CAP_STRUCTURE[s.id] || CAP_STRUCTURE.agriculture;
  const coInvs = CO_INVESTORS[s.id] || [];
  const windows = ENTRY_WINDOWS[s.id] || [];
  const t1Avg = s.t1?.length ? Math.round(s.t1.reduce((a, v) => a + (parseInt(v.irr) || 0), 0) / s.t1.length) : 0;
  const t2Avg = s.t2?.length ? Math.round(s.t2.reduce((a, v) => a + (parseInt(v.irr) || 0) / s.t2.length, 0)) : 0;
  const tierIRR = [
    { l: "Tier I", irr: s.irrHigh, col: M.accent, bg: M.accentDim, risk: "Balanced" },
    { l: "Tier II", irr: Math.round(s.irrHigh * 0.82), col: "#60A5FA", bg: "rgba(96,165,250,0.12)", risk: "Moderate" },
    { l: "Tier III", irr: Math.round(s.irrHigh * 0.65), col: M.muted, bg: M.faint, risk: "Conservative" },
  ];

  return (
    <div style={{ padding: "12px 14px 80px" }}>
      <div
        style={{
          fontSize: 9,
          fontWeight: 700,
          color: M.muted,
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          fontFamily: "Inter,sans-serif",
          marginBottom: 10,
        }}
      >
        Capital · {s.short}
      </div>

      {/* Key metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        {[
          { l: "Capital Range", v: `$${s.capLow}–${s.capHigh}M`, sub: "deployment target", col: M.accent },
          { l: "IRR Target", v: `${s.irrLow}–${s.irrHigh}%`, sub: "projected return", col: M.green },
          { l: "Pipeline Ready", v: `${c.inflow}%`, sub: "of targets active", col: "#60A5FA" },
          { l: "Ventures Tracked", v: `${totalV}`, sub: "identified", col: M.amber },
        ].map((item, i) => (
          <MCard key={i} style={{ padding: "12px 14px" }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: item.col,
                letterSpacing: "-0.5px",
                lineHeight: 1,
                marginBottom: 3,
              }}
            >
              {item.v}
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: M.white }}>{item.l}</div>
            <div style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>{item.sub}</div>
          </MCard>
        ))}
      </div>

      {/* Deployment chart */}
      <MCard style={{ padding: "14px 14px 10px", marginBottom: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: M.white }}>Deployment vs Target</div>
            <div style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
              6-month pipeline
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "3px 8px",
              borderRadius: 6,
              background: chg >= 0 ? M.greenDim : M.redDim,
              border: `1px solid ${chg >= 0 ? "rgba(74,222,128,0.25)" : "rgba(239,68,68,0.25)"}`,
            }}
          >
            {chg >= 0 ? <TrendingUp size={10} color={M.green} /> : <TrendingDown size={10} color={M.red} />}
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: chg >= 0 ? M.green : M.red,
                fontFamily: "Inter,sans-serif",
              }}
            >
              {chg >= 0 ? "+" : ""}
              {chg}%
            </span>
          </div>
        </div>
        <div style={{ height: 130 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RBarChart data={data} barSize={10} barGap={2} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 9, fill: M.muted, fontFamily: "Inter,sans-serif" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis tick={{ fontSize: 9, fill: M.muted }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTip />} />
              <Bar dataKey="deployed" fill={M.accent} radius={[3, 3, 0, 0]} name="Deployed" />
              <Bar dataKey="target" fill="rgba(255,255,255,0.12)" radius={[3, 3, 0, 0]} name="Target" />
            </RBarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
          {[
            ["Deployed", M.accent],
            ["Target", "rgba(255,255,255,0.3)"],
          ].map(([l, col]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: col }} />
              <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{l}</span>
            </div>
          ))}
        </div>
      </MCard>

      {/* Capital Structure */}
      <MCard style={{ padding: "14px 14px", marginBottom: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: M.white, marginBottom: 4 }}>Capital Structure</div>
        <div style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif", marginBottom: 12 }}>
          Recommended instrument mix
        </div>
        {/* Stacked bar */}
        <div style={{ height: 10, borderRadius: 6, overflow: "hidden", display: "flex", marginBottom: 10 }}>
          {capStruct.map((c, i) => (
            <div key={i} style={{ width: `${c.pct}%`, height: "100%", background: c.col, transition: "width 0.3s" }} />
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {capStruct.map((cs, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  background: `${cs.col}18`,
                  border: `1px solid ${cs.col}40`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 10, fontWeight: 800, color: cs.col, fontFamily: "Inter,sans-serif" }}>
                  {cs.pct}%
                </span>
              </div>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, color: M.white }}>{cs.l}</div>
                <div style={{ fontSize: 8, color: M.muted, fontFamily: "Inter,sans-serif" }}>{cs.pct}% of mix</div>
              </div>
            </div>
          ))}
        </div>
      </MCard>

      {/* Return by Tier */}
      <MCard style={{ padding: "14px 14px", marginBottom: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: M.white, marginBottom: 4 }}>Return Profile by Tier</div>
        <div style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif", marginBottom: 12 }}>
          Target IRR ceiling per investment tier
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {tierIRR.map((t, i) => (
            <div key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: t.col }} />
                  <span style={{ fontSize: 10, fontWeight: 600, color: M.white }}>{t.l}</span>
                  <span
                    style={{
                      fontSize: 8,
                      padding: "1px 5px",
                      borderRadius: 3,
                      background: t.bg,
                      color: t.col,
                      fontFamily: "Inter,sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    {t.risk}
                  </span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 800, color: t.col, fontFamily: "Inter,sans-serif" }}>
                  {t.irr}%
                </span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <div
                  style={{ width: `${(t.irr / s.irrHigh) * 100}%`, height: "100%", background: t.col, borderRadius: 3 }}
                />
              </div>
            </div>
          ))}
        </div>
      </MCard>

      {/* Pipeline Readiness */}
      <MCard style={{ padding: "14px 14px", marginBottom: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: M.white, marginBottom: 12 }}>Pipeline Readiness</div>
        {[
          { l: "Deal Flow Active", v: c.inflow, col: M.green },
          { l: "Due Diligence", v: Math.round(c.inflow * 0.6), col: M.accent },
          { l: "Term Sheet Ready", v: Math.round(c.inflow * 0.35), col: "#60A5FA" },
        ].map((row, i) => (
          <div key={i} style={{ marginBottom: i < 2 ? 10 : 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: M.mid, fontFamily: "Inter,sans-serif" }}>{row.l}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: row.col, fontFamily: "Inter,sans-serif" }}>
                {row.v}%
              </span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
              <div style={{ width: `${row.v}%`, height: "100%", background: row.col, borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </MCard>

      {/* Entry Windows */}
      <MCard style={{ padding: "14px 14px", marginBottom: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: M.white, marginBottom: 4 }}>Recommended Entry Windows</div>
        <div style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif", marginBottom: 12 }}>
          Optimal deployment timing by opportunity
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {windows.map((w, i) => {
            const fc = w.fit === "HIGH" ? M.green : w.fit === "MED" ? M.amber : M.muted;
            const fd = w.fit === "HIGH" ? M.greenDim : w.fit === "MED" ? M.amberDim : M.faint;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${M.border}`,
                }}
              >
                <div style={{ flexShrink: 0 }}>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: M.accent,
                      fontFamily: "Inter,sans-serif",
                      lineHeight: 1,
                    }}
                  >
                    {w.q}
                  </div>
                  <div
                    style={{
                      marginTop: 4,
                      display: "inline-block",
                      fontSize: 8,
                      fontWeight: 700,
                      padding: "2px 5px",
                      borderRadius: 3,
                      background: fd,
                      color: fc,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {w.fit}
                  </div>
                </div>
                <div style={{ flex: 1, borderLeft: `1px solid ${M.border}`, paddingLeft: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: M.white, marginBottom: 2 }}>{w.label}</div>
                  <div style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif", lineHeight: 1.4 }}>
                    {w.note}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </MCard>

      {/* Co-Investors */}
      <MCard style={{ padding: "14px 14px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: M.white, marginBottom: 4 }}>Active Co-Investors</div>
        <div style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif", marginBottom: 12 }}>
          Known capital partners in this sector
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {coInvs.map((ci, i) => (
            <div
              key={i}
              style={{
                padding: "5px 10px",
                borderRadius: 20,
                background: "rgba(255,255,255,0.05)",
                border: `1px solid ${M.border}`,
                fontSize: 10,
                fontWeight: 600,
                color: M.mid,
                fontFamily: "Inter,sans-serif",
              }}
            >
              {ci}
            </div>
          ))}
        </div>
      </MCard>
    </div>
  );
}

/* ════════════════════════════════════════
   OUTLOOK TAB — Thesis, risks, watchpoints
   ════════════════════════════════════════ */
export function OutlookTab({ s }) {
  const thesis = THESIS[s.id] || [];
  const risks = RISKS[s.id] || [];
  const dims = SCORE_DIMS[s.id] || { pp: 80, sf: 80, fe: 80, ss: 80 };
  const dimList = [
    ["Peace & Prosperity", "pp", M.accent],
    ["Strategic Fit", "sf", "#60A5FA"],
    ["Feasibility", "fe", M.green],
    ["Scalability", "ss", M.amber],
  ];
  return (
    <div style={{ padding: "12px 14px 80px" }}>
      <div
        style={{
          fontSize: 9,
          fontWeight: 700,
          color: M.muted,
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          fontFamily: "Inter,sans-serif",
          marginBottom: 10,
        }}
      >
        Outlook · {s.short}
      </div>
      {/* BRIDGE Score */}
      <MCard style={{ padding: "14px 14px", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: M.white }}>BRIDGE Score Breakdown</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: M.accent, fontFamily: "Inter,sans-serif" }}>
            {s.score}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {dimList.map(([label, key, col]) => (
            <div key={key}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 500, color: M.mid, fontFamily: "Inter,sans-serif" }}>
                  {label}
                </span>
                <span style={{ fontSize: 10, fontWeight: 700, color: col, fontFamily: "Inter,sans-serif" }}>
                  {dims[key]}
                </span>
              </div>
              <div style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${dims[key]}%`, height: "100%", background: col, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>
      </MCard>
      {/* Investment Thesis */}
      <MCard style={{ padding: "14px 14px", marginBottom: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: M.white, marginBottom: 10 }}>Investment Thesis</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {thesis.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: M.accentDim,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 14,
                }}
              >
                {t.icon}
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.72)", lineHeight: 1.45, paddingTop: 4 }}>
                {t.point}
              </div>
            </div>
          ))}
        </div>
      </MCard>
      {/* Risks */}
      <MCard style={{ padding: "14px 14px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: M.white, marginBottom: 10 }}>Key Risks & Watchpoints</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {risks.map((r, i) => {
            const rc = r.level === "HIGH" ? M.red : r.level === "MED" ? M.amber : M.green;
            const rd = r.level === "HIGH" ? M.redDim : r.level === "MED" ? M.amberDim : M.greenDim;
            return (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: rd,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <AlertCircle size={13} color={rc} />
                </div>
                <div style={{ flex: 1, paddingTop: 2 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: M.white, marginBottom: 2 }}>{r.title}</div>
                  <div style={{ fontSize: 10, color: M.mid, lineHeight: 1.35, marginBottom: 4 }}>{r.desc}</div>
                  <span
                    style={{
                      fontSize: 8,
                      fontWeight: 700,
                      padding: "2px 6px",
                      borderRadius: 3,
                      background: rd,
                      color: rc,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {r.level}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </MCard>
    </div>
  );
}

export function MobileDashboard() {
  const [s, setS] = useState(SECTORS[0]);
  const [page, setPage] = useState("overview");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: M.bg,
        fontFamily: "'DM Sans',sans-serif",
        overflow: "hidden",
      }}
    >
      <style>{`*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}::-webkit-scrollbar{display:none;}input::placeholder{color:rgba(255,255,255,0.2);}@keyframes mSlideUp{from{transform:translateY(100%);opacity:0;}to{transform:translateY(0);opacity:1;}}.mDrawer{animation:mSlideUp 0.25s ease;}`}</style>
      <MobileHeader s={s} setS={setS} />
      <div style={{ flex: 1, overflowY: "auto" }}>
        {page === "overview" && <OverviewTab s={s} />}
        {page === "signals" && <SignalsTab s={s} />}
        {page === "ventures" && <VenturesOverviewTab s={s} />}
        {page === "capital" && <CapitalTab s={s} />}
        {page === "outlook" && <OutlookTab s={s} />}
      </div>
      <MobileBottomNav page={page} setPage={setPage} />
    </div>
  );
}

