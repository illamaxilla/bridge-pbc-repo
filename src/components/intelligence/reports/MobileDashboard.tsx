import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Activity,
  FileText,
  ArrowUpRight,
  PieChart as PieLucide,
  DollarSign,
  Lightbulb,
  ShieldAlert,
  CheckCircle,
  AlertTriangle,
  Zap,
  ClipboardList,
} from "lucide-react";
import {
  BarChart as RBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
  ReferenceLine,
} from "recharts";
import { C, SECTORS, type Sector } from "./constants";
import { sigCol } from "./constants";
import { genBarData, genMonthlyData, genTableRows } from "./utils";
import { MobileResourcesPage } from "./MobileResourcesPage";

export interface MobileDashboardProps {
  s: Sector;
  setS: (s: Sector) => void;
}

function MobileDashboard({ s, setS }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ signals: true, score: true });
  const [sectorDrawer, setSectorDrawer] = useState(false);
  const rank = [...SECTORS].sort((a, b) => b.score - a.score).findIndex((x) => x.id === s.id) + 1;
  const bullish = s.activity.filter((a) => a.sig === "Bullish").length;

  const toggleSection = (k) => setOpenSections((o) => ({ ...o, [k]: !o[k] }));

  const riskColor = (r) => (r === "LOW" ? "#16A34A" : r === "HIGH" ? "#DC2626" : "#CA8A04");
  const riskBg = (r) => (r === "LOW" ? "#DCFCE7" : r === "HIGH" ? "#FEE2E2" : "#FEF9C3");

  /* Score arc SVG */
  const ScoreArc = ({ score }) => {
    const r = 52,
      cx = 64,
      cy = 64,
      startDeg = -220,
      sweepDeg = 260;
    const toRad = (d) => (d * Math.PI) / 180;
    const arcPt = (deg) => [cx + r * Math.cos(toRad(deg)), cy + r * Math.sin(toRad(deg))];
    const arcPath = (from, to, rad) => {
      const [sx, sy] = arcPt(from);
      const [ex, ey] = arcPt(to);
      const large = Math.abs(to - from) > 180 ? 1 : 0;
      return `M${sx},${sy} A${rad},${rad} 0 ${large},1 ${ex},${ey}`;
    };
    const fillDeg = startDeg + sweepDeg * (score / 100);
    return (
      <svg width={128} height={128} style={{ display: "block" }}>
        <path
          d={arcPath(startDeg, startDeg + sweepDeg, r)}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={10}
          strokeLinecap="round"
        />
        <path d={arcPath(startDeg, fillDeg, r)} fill="none" stroke={C.accent} strokeWidth={10} strokeLinecap="round" />
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fill="#fff"
          fontSize={28}
          fontWeight={800}
          fontFamily="Inter,sans-serif"
        >
          {score}
        </text>
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          fill="rgba(255,255,255,0.5)"
          fontSize={9}
          fontFamily="Inter,sans-serif"
          letterSpacing="1"
        >
          BRIDGE SCORE
        </text>
      </svg>
    );
  };

  /* Collapsible section header */
  const SectionHead = ({ id, label, icon, count, defaultOpen }) => {
    const open = openSections[id] ?? defaultOpen ?? false;
    return (
      <button
        onClick={() => toggleSection(id)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "13px 16px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: "#F3F4F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: C.dark, fontFamily: "DM Sans,sans-serif" }}>
          {label}
        </span>
        {count != null && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: C.primary,
              background: C.accentBg,
              borderRadius: 10,
              padding: "2px 7px",
              fontFamily: "Inter,sans-serif",
            }}
          >
            {count}
          </span>
        )}
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: 5,
            background: "#F3F4F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "transform .2s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ChevronDown size={12} color={C.muted} />
        </div>
      </button>
    );
  };

  /* Report tab pages */
  const renderPage = () => {
    const D = {
      bg: "#090F0B",
      card: "#0F1A12",
      card2: "#132118",
      border: "rgba(255,255,255,0.07)",
      borderLime: "rgba(184,217,53,0.18)",
      lime: "#B8D935",
      green: "#22C55E",
      red: "#EF4444",
      amber: "#F59E0B",
      teal: "#2E8B6E",
      txt: "#FFFFFF",
      txt2: "rgba(255,255,255,0.55)",
      txt3: "rgba(255,255,255,0.28)",
      iconBg: "rgba(184,217,53,0.12)",
      iconBg2: "rgba(255,255,255,0.07)",
    };
    const sigDC = (sig) => (sig === "Bullish" ? D.green : sig === "Bearish" ? D.red : D.amber);
    const openD = openSections;
    const PageLabel = ({ text }) => (
      <div style={{ padding: "8px 16px 0" }}>
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
          {text}
        </span>
      </div>
    );
    const DSectionHead = ({ id, label, icon, count }) => {
      const isOpen = openD[id] ?? false;
      return (
        <button
          onClick={() => toggleSection(id)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "13px 16px",
            background: "none",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: D.iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {icon}
          </div>
          <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: D.txt, fontFamily: "DM Sans,sans-serif" }}>
            {label}
          </span>
          {count != null && (
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: D.lime,
                background: D.iconBg,
                borderRadius: 10,
                padding: "2px 7px",
                fontFamily: "Inter,sans-serif",
              }}
            >
              {count}
            </span>
          )}
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 5,
              background: D.iconBg2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "transform .2s",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <ChevronDown size={12} color={D.txt3} />
          </div>
        </button>
      );
    };

    /* ── TAB: OVERVIEW ── */
    if (activeTab === "overview")
      return (
        <div style={{ background: D.bg, minHeight: "100%", paddingBottom: 90 }}>
          <PageLabel text="OVERVIEW" />
          {/* Hero Card */}
          <div
            style={{
              margin: "10px 12px 0",
              background: D.card,
              borderRadius: 18,
              border: `1px solid ${D.borderLime}`,
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "16px 16px 14px" }}>
              <div style={{ flexShrink: 0, position: "relative", width: 68, height: 68 }}>
                <svg width={68} height={68} viewBox="0 0 68 68">
                  <circle cx={34} cy={34} r={28} fill="none" stroke="rgba(184,217,53,0.15)" strokeWidth={4} />
                  <circle
                    cx={34}
                    cy={34}
                    r={28}
                    fill="none"
                    stroke={D.lime}
                    strokeWidth={4}
                    strokeLinecap="round"
                    strokeDasharray={`${(2 * Math.PI * 28 * s.score) / 100} ${2 * Math.PI * 28}`}
                    strokeDashoffset={2 * Math.PI * 28 * 0.25}
                    style={{ transform: "rotate(-90deg)", transformOrigin: "34px 34px" }}
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
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: 900,
                      color: D.txt,
                      fontFamily: "Inter,sans-serif",
                      lineHeight: 1,
                    }}
                  >
                    {s.score}
                  </span>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: D.lime,
                    fontFamily: "Inter,sans-serif",
                    letterSpacing: "1.2px",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  OVERVIEW · {s.short.toUpperCase()}
                </div>
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    color: D.txt,
                    lineHeight: 1.2,
                    marginBottom: 10,
                    fontFamily: "DM Sans,sans-serif",
                  }}
                >
                  {s.full}
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {[
                    { l: "Cap", v: `$${s.capLow}–${s.capHigh}M` },
                    { l: "IRR", v: `${s.irrHigh}%` },
                    { l: "Score", v: `${s.score}` },
                  ].map((p, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        padding: "4px 9px",
                        borderRadius: 6,
                        background: "rgba(255,255,255,0.06)",
                        border: `1px solid ${D.border}`,
                      }}
                    >
                      <span style={{ fontSize: 9, color: D.txt3, fontFamily: "Inter,sans-serif" }}>{p.l}</span>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: i === 2 ? D.lime : D.teal,
                          fontFamily: "Inter,sans-serif",
                        }}
                      >
                        {p.v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: `1px solid ${D.border}` }}>
              {[
                { l: "CAPITAL RANGE", v: `$${s.capLow}–${s.capHigh}M` },
                { l: "IRR TARGET", v: `${s.irrLow}–${s.irrHigh}%` },
                { l: "VENTURES", v: `${s.totalV} active` },
              ].map((st, i) => (
                <div key={i} style={{ padding: "12px 14px", borderRight: i < 2 ? `1px solid ${D.border}` : "none" }}>
                  <div
                    style={{
                      fontSize: 8,
                      fontWeight: 700,
                      color: D.txt3,
                      fontFamily: "Inter,sans-serif",
                      letterSpacing: "0.8px",
                      textTransform: "uppercase",
                      marginBottom: 5,
                    }}
                  >
                    {st.l}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: D.txt, fontFamily: "Inter,sans-serif" }}>
                    {st.v}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                margin: "0 12px 12px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 12px",
                background: "rgba(255,255,255,0.03)",
                borderRadius: 10,
                border: `1px solid ${D.border}`,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: sigDC(s.activity[0]?.sig),
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  flex: 1,
                  fontSize: 11,
                  color: D.txt2,
                  fontFamily: "Inter,sans-serif",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {s.activity[0]?.sig} · {s.activity[0]?.h}
              </span>
              <div style={{ display: "flex", gap: 2, alignItems: "flex-end", flexShrink: 0 }}>
                {[0.3, 0.5, 0.7, 0.9, 0.6, 0.8, 0.4, 0.7].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: 3,
                      height: Math.round(h * 18),
                      background: D.lime,
                      opacity: 0.6 + i * 0.04,
                      borderRadius: 1,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Score context strip */}
          <div style={{ margin: "10px 12px 0", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
            {[
              { label: "Rank", v: `#${rank}`, sub: "of 12" },
              { label: "Bullish", v: bullish, sub: "signals" },
              { label: "Risk", v: s.risk || "MED", sub: "profile" },
              { label: "Timeline", v: s.timeline || "3–5yr", sub: "horizon" },
            ].map((kp, i) => (
              <div
                key={i}
                style={{
                  background: D.card,
                  borderRadius: 12,
                  border: `1px solid ${D.border}`,
                  padding: "12px 10px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: i === 0 ? D.lime : D.txt,
                    fontFamily: "Inter,sans-serif",
                    lineHeight: 1,
                  }}
                >
                  {kp.v}
                </div>
                <div
                  style={{
                    fontSize: 8,
                    color: D.txt3,
                    fontFamily: "Inter,sans-serif",
                    marginTop: 4,
                    letterSpacing: "0.3px",
                  }}
                >
                  {kp.label}
                </div>
                <div style={{ fontSize: 8, color: D.txt3, fontFamily: "Inter,sans-serif", opacity: 0.6 }}>{kp.sub}</div>
              </div>
            ))}
          </div>

          {/* Score trend mini chart */}
          <div
            style={{
              margin: "10px 12px 0",
              background: D.card,
              borderRadius: 16,
              border: `1px solid ${D.border}`,
              padding: "14px 8px 10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: 8,
                paddingRight: 8,
                marginBottom: 10,
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: D.txt, fontFamily: "DM Sans,sans-serif" }}>
                Score Trend
              </span>
              <span style={{ fontSize: 9, color: D.txt3, fontFamily: "Inter,sans-serif" }}>12 months</span>
            </div>
            <div style={{ height: 100 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RBarChart
                  data={genBarData(s, "sector-performance", "30D")}
                  barSize={18}
                  barCategoryGap="35%"
                  margin={{ top: 2, right: 6, left: -28, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 8, fill: D.txt3, fontFamily: "Inter,sans-serif" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis tick={{ fontSize: 8, fill: D.txt3 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: D.card2,
                      border: `1px solid ${D.border}`,
                      borderRadius: 8,
                      color: D.txt,
                      fontSize: 11,
                    }}
                  />
                  <Bar dataKey="primary" fill={D.lime} fillOpacity={0.85} radius={[3, 3, 0, 0]} />
                  <Bar dataKey="secondary" fill={`${D.teal}55`} radius={[3, 3, 0, 0]} />
                </RBarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sub-sector breakdown */}
          <div
            style={{
              margin: "10px 12px 0",
              background: D.card,
              borderRadius: 16,
              border: `1px solid ${D.border}`,
              overflow: "hidden",
            }}
          >
            <DSectionHead
              id="subsectors"
              label="Sub-sector Breakdown"
              icon={<PieLucide size={13} color={D.lime} />}
              count={s.subSectors?.length}
            />
            {openD.subsectors && (
              <div style={{ padding: "0 12px 12px" }}>
                {s.subSectors?.map((ss, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "9px 0",
                      borderBottom: i < s.subSectors.length - 1 ? `1px solid ${D.border}` : "none",
                    }}
                  >
                    <div
                      style={{ width: 3, height: 30, borderRadius: 2, background: ss.color || D.lime, flexShrink: 0 }}
                    />
                    <span
                      style={{
                        flex: 1,
                        fontSize: 12,
                        fontWeight: 500,
                        color: D.txt2,
                        fontFamily: "DM Sans,sans-serif",
                      }}
                    >
                      {ss.name}
                    </span>
                    <div
                      style={{
                        width: 80,
                        height: 4,
                        background: "rgba(255,255,255,0.07)",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{ height: "100%", width: `${ss.pct}%`, background: ss.color || D.lime, borderRadius: 2 }}
                      />
                    </div>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: D.txt,
                        fontFamily: "Inter,sans-serif",
                        width: 32,
                        textAlign: "right",
                      }}
                    >
                      {ss.pct}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Live Signals */}
          <div
            style={{
              margin: "10px 12px 0",
              background: D.card,
              borderRadius: 16,
              border: `1px solid ${D.border}`,
              overflow: "hidden",
            }}
          >
            <DSectionHead
              id="signals"
              label="Live Signals"
              icon={<Activity size={13} color={D.lime} />}
              count={s.activity.length}
            />
            {openD.signals && (
              <div style={{ padding: "0 0 8px" }}>
                {/* Signal type summary */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    margin: "0 12px 10px",
                    background: D.card2,
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  {[
                    { label: "Bullish", color: D.green, count: s.activity.filter((a) => a.sig === "Bullish").length },
                    { label: "Watch", color: D.amber, count: s.activity.filter((a) => a.sig === "Watch").length },
                    { label: "Bearish", color: D.red, count: s.activity.filter((a) => a.sig === "Bearish").length },
                  ].map((sg, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "10px 8px",
                        textAlign: "center",
                        borderRight: i < 2 ? `1px solid ${D.border}` : "none",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 18,
                          fontWeight: 800,
                          color: sg.color,
                          fontFamily: "Inter,sans-serif",
                          lineHeight: 1,
                        }}
                      >
                        {sg.count}
                      </div>
                      <div style={{ fontSize: 9, color: D.txt3, fontFamily: "Inter,sans-serif", marginTop: 3 }}>
                        {sg.label}
                      </div>
                    </div>
                  ))}
                </div>
                {s.activity.slice(0, 5).map((a, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "10px 16px",
                      borderTop: `1px solid ${D.border}`,
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: D.iconBg2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: sigDC(a.sig) }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: D.txt, lineHeight: 1.35, marginBottom: 3 }}>
                        {a.h}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 10, color: D.txt3, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                        <span
                          style={{ fontSize: 10, fontWeight: 700, color: sigDC(a.sig), fontFamily: "Inter,sans-serif" }}
                        >
                          {a.sig}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: D.lime,
                        fontFamily: "Inter,sans-serif",
                        whiteSpace: "nowrap",
                        marginTop: 2,
                      }}
                    >
                      {a.amt}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top Opportunities */}
          <div
            style={{
              margin: "10px 12px 0",
              background: D.card,
              borderRadius: 16,
              border: `1px solid ${D.border}`,
              overflow: "hidden",
            }}
          >
            <DSectionHead
              id="opportunities"
              label="Top Opportunities"
              icon={<ArrowUpRight size={13} color={D.lime} />}
              count={s.t1.length}
            />
            {openD.opportunities && (
              <div style={{ padding: "0 0 8px" }}>
                {s.t1.map((op, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "10px 16px",
                      borderTop: `1px solid ${D.border}`,
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{ width: 3, alignSelf: "stretch", borderRadius: 2, background: D.lime, flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: D.txt,
                          marginBottom: 4,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {op.name}
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <span style={{ fontSize: 10, color: D.teal, fontWeight: 700, fontFamily: "Inter,sans-serif" }}>
                          {op.cap}
                        </span>
                        <span style={{ fontSize: 10, color: D.txt3, fontFamily: "Inter,sans-serif" }}>·</span>
                        <span style={{ fontSize: 10, color: D.txt2, fontWeight: 600, fontFamily: "Inter,sans-serif" }}>
                          {op.irr} IRR
                        </span>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: riskColor(op.risk),
                        fontFamily: "Inter,sans-serif",
                        flexShrink: 0,
                      }}
                    >
                      {op.risk}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upsell */}
          <div
            style={{
              margin: "10px 12px 0",
              borderRadius: 16,
              background: "linear-gradient(135deg,#1E3327,#0F1A12)",
              border: `1px solid ${D.borderLime}`,
              padding: 18,
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 700, color: D.txt, marginBottom: 4 }}>Unlock Full Intelligence</div>
            <div
              style={{ fontSize: 11, color: D.txt3, fontFamily: "Inter,sans-serif", lineHeight: 1.5, marginBottom: 14 }}
            >
              IRR models, risk matrices, and deep venture profiles across all 12 sectors.
            </div>
            <button
              style={{
                width: "100%",
                background: D.lime,
                border: "none",
                borderRadius: 10,
                padding: "11px 0",
                fontSize: 12,
                fontWeight: 700,
                color: "#1B4D3E",
                fontFamily: "Inter,sans-serif",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
              }}
            >
              Upgrade to Pro <ArrowUpRight size={13} />
            </button>
          </div>
          <div style={{ height: 16 }} />
        </div>
      );

    /* ── TAB: PERFORMANCE ── */
    if (activeTab === "performance") return <MobileResourcesPage s={s} setS={setS} view="sector-performance" />;

    /* ── TAB: ACTIVITY ── */
    if (activeTab === "activity") {
      const allRows = genTableRows(s);
      const sigTypes = ["Bullish", "Watch", "Bearish"];
      return (
        <div style={{ background: D.bg, minHeight: "100%", paddingBottom: 90 }}>
          <PageLabel text="ACTIVITY LOG" />

          {/* Signal type filter summary */}
          <div style={{ margin: "10px 12px 0", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {[
              { label: "Bullish", color: D.green },
              { label: "Watch", color: D.amber },
              { label: "Bearish", color: D.red },
            ].map((sg, i) => {
              const cnt = allRows.filter((r) => r.signal === sg.label).length;
              return (
                <div
                  key={i}
                  style={{
                    background: D.card,
                    borderRadius: 12,
                    border: `1px solid ${D.border}`,
                    padding: "14px 12px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 900,
                      color: sg.color,
                      fontFamily: "Inter,sans-serif",
                      lineHeight: 1,
                    }}
                  >
                    {cnt}
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 5 }}
                  >
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: sg.color }} />
                    <span style={{ fontSize: 9, color: D.txt3, fontFamily: "Inter,sans-serif" }}>{sg.label}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Category breakdown */}
          <div
            style={{
              margin: "10px 12px 0",
              background: D.card,
              borderRadius: 16,
              border: `1px solid ${D.border}`,
              padding: "14px 14px",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: D.txt,
                fontFamily: "DM Sans,sans-serif",
                marginBottom: 12,
              }}
            >
              Activity by Category
            </div>
            {["Investment", "Policy", "Market", "Infrastructure", "Partnership"].map((cat, i) => {
              const cnt = allRows.filter((r) => r.category === cat).length || Math.floor(Math.random() * 8) + 2;
              const pct = Math.min(100, Math.round((cnt / allRows.length) * 100));
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: i < 4 ? 10 : 0 }}>
                  <span
                    style={{ fontSize: 11, color: D.txt2, fontFamily: "Inter,sans-serif", width: 90, flexShrink: 0 }}
                  >
                    {cat}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: 6,
                      background: "rgba(255,255,255,0.07)",
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${pct}%`,
                        background: D.lime,
                        opacity: 0.7 + i * 0.06,
                        borderRadius: 3,
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: D.txt3,
                      fontFamily: "Inter,sans-serif",
                      width: 20,
                      textAlign: "right",
                    }}
                  >
                    {cnt}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Activity feed */}
          <div
            style={{
              margin: "10px 12px 0",
              background: D.card,
              borderRadius: 16,
              border: `1px solid ${D.border}`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "12px 16px 10px",
                borderBottom: `1px solid ${D.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: D.txt, fontFamily: "DM Sans,sans-serif" }}>
                Recent Activity
              </span>
              <span style={{ fontSize: 10, fontWeight: 700, color: D.lime, fontFamily: "Inter,sans-serif" }}>
                {allRows.length} entries
              </span>
            </div>
            {allRows.slice(0, 10).map((row, i) => (
              <div
                key={i}
                style={{
                  padding: "11px 16px",
                  borderBottom: i < 9 ? `1px solid ${D.border}` : "none",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 7,
                    background:
                      row.signal === "Bullish"
                        ? "rgba(34,197,94,0.12)"
                        : row.signal === "Bearish"
                          ? "rgba(239,68,68,0.12)"
                          : "rgba(245,158,11,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: sigDC(row.signal) }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: D.txt,
                      lineHeight: 1.3,
                      marginBottom: 3,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {row.signal}
                  </div>
                  <div style={{ fontSize: 10, color: D.txt3, fontFamily: "Inter,sans-serif" }}>
                    {row.source} · {row.date}
                  </div>
                </div>
                <div style={{ flexShrink: 0, textAlign: "right" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: D.txt2, fontFamily: "Inter,sans-serif" }}>
                    {row.value}
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      padding: "2px 6px",
                      borderRadius: 4,
                      background: row.status === "Active" ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.06)",
                      color: row.status === "Active" ? D.green : D.txt3,
                      fontFamily: "Inter,sans-serif",
                      marginTop: 3,
                    }}
                  >
                    {row.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: 16 }} />
        </div>
      );
    }

    /* ── TAB: CAPITAL FLOW ── */
    if (activeTab === "capital") {
      const mData = genMonthlyData(s);
      const total = mData.reduce((a, d) => a + d.growth, 0);
      const totalExp = mData.reduce((a, d) => a + d.expenses, 0);
      const totalNet = mData.reduce((a, d) => a + d.net, 0);
      const last = mData[mData.length - 1];
      return (
        <div style={{ background: D.bg, minHeight: "100%", paddingBottom: 90 }}>
          <PageLabel text="CAPITAL FLOW" />

          {/* Hero totals */}
          <div
            style={{
              margin: "10px 12px 0",
              background: D.card,
              borderRadius: 16,
              border: `1px solid ${D.borderLime}`,
              padding: "16px",
            }}
          >
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: D.txt3,
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontFamily: "Inter,sans-serif",
                marginBottom: 6,
              }}
            >
              Total Capital · Aug – Jan
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: D.txt,
                letterSpacing: "-1.5px",
                lineHeight: 1,
                marginBottom: 16,
              }}
            >
              ${total.toLocaleString()}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
              {[
                { color: D.lime, label: "Growth Rev.", v: `$${last.growth}` },
                { color: D.teal, label: "Op. Costs", v: `$${last.expenses}` },
                { color: D.amber, label: "Net Income", v: `$${last.net}` },
              ].map((row, i) => (
                <div key={i} style={{ padding: "10px 12px", borderRight: i < 2 ? `1px solid ${D.border}` : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: row.color }} />
                    <span style={{ fontSize: 9, color: D.txt3, fontFamily: "Inter,sans-serif" }}>{row.label}</span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: D.txt, fontFamily: "Inter,sans-serif" }}>
                    {row.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key metrics row */}
          <div style={{ margin: "10px 12px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div
              style={{ background: D.card, borderRadius: 14, border: `1px solid ${D.border}`, padding: "16px 14px" }}
            >
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: D.txt3,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  fontFamily: "Inter,sans-serif",
                  marginBottom: 6,
                }}
              >
                Net Margin
              </div>
              <div style={{ fontSize: 30, fontWeight: 900, color: D.green, letterSpacing: "-1px", lineHeight: 1 }}>
                {Math.round((last.net / last.growth) * 100)}%
              </div>
              <div style={{ fontSize: 9, color: D.txt3, fontFamily: "Inter,sans-serif", marginTop: 5 }}>
                Latest month
              </div>
            </div>
            <div
              style={{ background: D.card, borderRadius: 14, border: `1px solid ${D.border}`, padding: "16px 14px" }}
            >
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: D.txt3,
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  fontFamily: "Inter,sans-serif",
                  marginBottom: 6,
                }}
              >
                IRR Target
              </div>
              <div style={{ fontSize: 30, fontWeight: 900, color: D.lime, letterSpacing: "-1px", lineHeight: 1 }}>
                {s.irrHigh}%
              </div>
              <div style={{ fontSize: 9, color: D.txt3, fontFamily: "Inter,sans-serif", marginTop: 5 }}>
                Upper bound
              </div>
            </div>
          </div>

          {/* Monthly flow chart */}
          <div
            style={{
              margin: "10px 12px 0",
              background: D.card,
              borderRadius: 16,
              border: `1px solid ${D.border}`,
              padding: "14px 8px 12px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingLeft: 8,
                paddingRight: 8,
                marginBottom: 10,
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: D.txt, fontFamily: "DM Sans,sans-serif" }}>
                Monthly Flow
              </span>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                {[
                  { color: D.lime, label: "Growth" },
                  { color: D.teal, label: "Costs" },
                  { color: D.amber, label: "Net" },
                ].map((leg, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: leg.color }} />
                    <span style={{ fontSize: 8, color: D.txt3, fontFamily: "Inter,sans-serif" }}>{leg.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={mData} margin={{ top: 4, right: 8, left: -28, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 9, fill: D.txt3, fontFamily: "Inter,sans-serif" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis tick={{ fontSize: 9, fill: D.txt3 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: D.card2,
                      border: `1px solid ${D.border}`,
                      borderRadius: 8,
                      color: D.txt,
                      fontSize: 11,
                    }}
                  />
                  <Bar dataKey="growth" fill={D.lime} fillOpacity={0.9} radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="expenses" fill={D.teal} fillOpacity={0.55} radius={[4, 4, 0, 0]} barSize={20} />
                  <Line
                    type="monotone"
                    dataKey="net"
                    stroke={D.amber}
                    strokeWidth={2.5}
                    strokeDasharray="5 5"
                    dot={{ r: 3, fill: D.amber, strokeWidth: 0 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly breakdown table */}
          <div
            style={{
              margin: "10px 12px 0",
              background: D.card,
              borderRadius: 16,
              border: `1px solid ${D.border}`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "12px 16px 10px",
                borderBottom: `1px solid ${D.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: D.txt, fontFamily: "DM Sans,sans-serif" }}>
                Monthly Breakdown
              </span>
              <span style={{ fontSize: 9, color: D.txt3, fontFamily: "Inter,sans-serif" }}>Growth · Costs · Net</span>
            </div>
            {mData.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 16px",
                  borderBottom: i < mData.length - 1 ? `1px solid ${D.border}` : "none",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: D.txt3,
                    fontFamily: "Inter,sans-serif",
                    width: 32,
                    flexShrink: 0,
                  }}
                >
                  {m.month}
                </span>
                <div style={{ flex: 1, display: "flex", gap: 8 }}>
                  <span
                    style={{ fontSize: 11, color: D.lime, fontFamily: "Inter,sans-serif", fontWeight: 600, flex: 1 }}
                  >
                    ${m.growth}
                  </span>
                  <span style={{ fontSize: 11, color: D.teal, fontFamily: "Inter,sans-serif", flex: 1 }}>
                    ${m.expenses}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: m.net > 0 ? D.green : D.red,
                      fontFamily: "Inter,sans-serif",
                      fontWeight: 700,
                      flex: 1,
                    }}
                  >
                    ${m.net}
                  </span>
                </div>
                <div
                  style={{
                    width: 50,
                    height: 4,
                    background: "rgba(255,255,255,0.07)",
                    borderRadius: 2,
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.min(100, Math.round((m.net / m.growth) * 100))}%`,
                      background: D.lime,
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>
            ))}
            {/* Totals row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "11px 16px",
                background: "rgba(184,217,53,0.05)",
                borderTop: `1px solid ${D.borderLime}`,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: D.lime,
                  fontFamily: "Inter,sans-serif",
                  width: 32,
                  flexShrink: 0,
                }}
              >
                TOT
              </span>
              <div style={{ flex: 1, display: "flex", gap: 8 }}>
                <span style={{ fontSize: 11, color: D.lime, fontFamily: "Inter,sans-serif", fontWeight: 700, flex: 1 }}>
                  ${total}
                </span>
                <span style={{ fontSize: 11, color: D.teal, fontFamily: "Inter,sans-serif", fontWeight: 700, flex: 1 }}>
                  ${totalExp}
                </span>
                <span
                  style={{ fontSize: 11, color: D.green, fontFamily: "Inter,sans-serif", fontWeight: 800, flex: 1 }}
                >
                  ${totalNet}
                </span>
              </div>
              <div style={{ width: 50, flexShrink: 0 }} />
            </div>
          </div>
          <div style={{ height: 16 }} />
        </div>
      );
    }

    /* ── TAB: INSIGHTS ── */
    if (activeTab === "rankings") {
      const drivers = [
        {
          label: "Policy Tailwinds",
          detail:
            "2026 Budget allocates $" +
            Math.round(s.capLow * 0.6) +
            "M toward sector reform and infrastructure expansion.",
          sentiment: "positive",
        },
        {
          label: "Private Capital Interest",
          detail:
            "Foreign direct investment inquiries up " +
            Math.round(15 + s.score * 0.1) +
            "% YoY. Diaspora-linked capital represents ~30% of pipeline.",
          sentiment: "positive",
        },
        {
          label: "Regulatory Landscape",
          detail:
            "Pending frameworks expected Q2 2026. Early alignment with BRIDGE partners creates first-mover position.",
          sentiment: "neutral",
        },
        {
          label: "Workforce Readiness",
          detail:
            "Skills gap in mid-level technical roles remains a constraint. Vocational pipeline programs partially offset risk.",
          sentiment: "neutral",
        },
        {
          label: "Infrastructure Dependencies",
          detail:
            "Sector performance correlated with power reliability and road access — both improving at ~7% annually.",
          sentiment: "positive",
        },
      ];
      const risks = [
        {
          label: "Currency Volatility",
          level: "MED",
          detail: "GHS exposure creates FX risk on USD-denominated returns. Hedge structures available.",
        },
        {
          label: "Regulatory Delay",
          level: "MED",
          detail: "Key licensing frameworks pending legislative action. 6–12 month slippage scenario priced in.",
        },
        {
          label: "Execution Capacity",
          level: "LOW",
          detail: "Local implementation partners vetted. BRIDGE oversight model mitigates management risk.",
        },
        {
          label: "Market Concentration",
          level: "HIGH",
          detail:
            "Top 3 operators control " +
            Math.round(45 + s.score * 0.2) +
            "% of segment. Entry requires differentiation strategy.",
        },
      ];
      const riskColor2 = (l) => (l === "LOW" ? D.green : l === "HIGH" ? D.red : D.amber);
      const findings = [
        "Sector scores " + s.score + "/100 — placing it in the top tier of BRIDGE's 12-sector coverage universe.",
        "Capital range of $" + s.capLow + "–" + s.capHigh + "M reflects validated deal flow, not projections.",
        "IRR target of " +
          s.irrLow +
          "–" +
          s.irrHigh +
          "% is achievable under base-case assumptions with current deal pipeline.",
        "" +
          s.totalV +
          " ventures tracked across sub-segments; " +
          Math.round(s.totalV * 0.4) +
          " qualify for near-term deployment.",
        "Bullish signal density (" +
          bullish +
          " of " +
          s.activity.length +
          ") indicates favorable entry window in current cycle.",
      ];
      return (
        <div style={{ background: D.bg, minHeight: "100%", paddingBottom: 90 }}>
          <PageLabel text="INSIGHTS" />

          {/* Analyst verdict card */}
          <div
            style={{
              margin: "10px 12px 0",
              background: "linear-gradient(135deg,#132118,#0A1A0E)",
              borderRadius: 18,
              border: `1px solid ${D.borderLime}`,
              padding: "18px 16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: D.iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Lightbulb size={17} color={D.lime} />
              </div>
              <div>
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: D.lime,
                    fontFamily: "Inter,sans-serif",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    marginBottom: 2,
                  }}
                >
                  Analyst Verdict
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: D.txt, fontFamily: "DM Sans,sans-serif" }}>
                  {s.short} — Strong Opportunity
                </div>
              </div>
            </div>
            <div
              style={{ fontSize: 12, color: D.txt2, fontFamily: "Inter,sans-serif", lineHeight: 1.7, marginBottom: 14 }}
            >
              {s.full} presents a compelling entry point in the current cycle. Macro conditions, policy alignment, and
              private capital interest converge to create a favourable deployment window through 2026. BRIDGE recommends
              active positioning.
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { label: "DEPLOY", color: D.lime, bg: "rgba(184,217,53,0.12)" },
                { label: "MONITOR", color: D.amber, bg: "rgba(245,158,11,0.1)" },
                { label: "AVOID", color: "rgba(255,255,255,0.2)", bg: "rgba(255,255,255,0.04)" },
              ].map((r, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    padding: "7px 0",
                    borderRadius: 8,
                    background: i === 0 ? r.bg : "transparent",
                    border: `1px solid ${i === 0 ? D.lime + "44" : D.border}`,
                    textAlign: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: i === 0 ? D.lime : r.color,
                      fontFamily: "Inter,sans-serif",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {r.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key findings */}
          <div
            style={{
              margin: "10px 12px 0",
              background: D.card,
              borderRadius: 16,
              border: `1px solid ${D.border}`,
              overflow: "hidden",
            }}
          >
            <DSectionHead
              id="findings"
              label="Key Findings"
              icon={<CheckCircle size={13} color={D.lime} />}
              count={findings.length}
            />
            {openD.findings && (
              <div style={{ padding: "0 16px 12px" }}>
                {findings.map((f, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      paddingTop: 10,
                      borderTop: i > 0 ? `1px solid ${D.border}` : "none",
                    }}
                  >
                    <div
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        background: D.iconBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      <span style={{ fontSize: 9, fontWeight: 800, color: D.lime, fontFamily: "Inter,sans-serif" }}>
                        {i + 1}
                      </span>
                    </div>
                    <span style={{ fontSize: 12, color: D.txt2, fontFamily: "Inter,sans-serif", lineHeight: 1.6 }}>
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Market drivers */}
          <div
            style={{
              margin: "10px 12px 0",
              background: D.card,
              borderRadius: 16,
              border: `1px solid ${D.border}`,
              overflow: "hidden",
            }}
          >
            <DSectionHead
              id="drivers"
              label="Market Drivers"
              icon={<Zap size={13} color={D.lime} />}
              count={drivers.length}
            />
            {openD.drivers && (
              <div style={{ padding: "0 0 8px" }}>
                {drivers.map((dr, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "11px 16px",
                      borderTop: `1px solid ${D.border}`,
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: dr.sentiment === "positive" ? D.green : D.amber,
                        flexShrink: 0,
                        marginTop: 5,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: D.txt,
                          fontFamily: "DM Sans,sans-serif",
                          marginBottom: 3,
                        }}
                      >
                        {dr.label}
                      </div>
                      <div style={{ fontSize: 11, color: D.txt3, fontFamily: "Inter,sans-serif", lineHeight: 1.55 }}>
                        {dr.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Risk matrix */}
          <div
            style={{
              margin: "10px 12px 0",
              background: D.card,
              borderRadius: 16,
              border: `1px solid ${D.border}`,
              overflow: "hidden",
            }}
          >
            <DSectionHead
              id="risks"
              label="Risk Factors"
              icon={<ShieldAlert size={13} color={D.amber} />}
              count={risks.length}
            />
            {openD.risks && (
              <div style={{ padding: "0 0 8px" }}>
                {risks.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "11px 16px",
                      borderTop: `1px solid ${D.border}`,
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        padding: "3px 7px",
                        borderRadius: 5,
                        background: riskColor2(r.level) + "18",
                        border: `1px solid ${riskColor2(r.level)}33`,
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 800,
                          color: riskColor2(r.level),
                          fontFamily: "Inter,sans-serif",
                          letterSpacing: "0.4px",
                        }}
                      >
                        {r.level}
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: D.txt,
                          fontFamily: "DM Sans,sans-serif",
                          marginBottom: 3,
                        }}
                      >
                        {r.label}
                      </div>
                      <div style={{ fontSize: 11, color: D.txt3, fontFamily: "Inter,sans-serif", lineHeight: 1.55 }}>
                        {r.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Strategic recommendation */}
          <div
            style={{
              margin: "10px 12px 0",
              background: D.card,
              borderRadius: 16,
              border: `1px solid ${D.border}`,
              padding: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <AlertTriangle size={14} color={D.amber} />
              <span style={{ fontSize: 11, fontWeight: 700, color: D.txt, fontFamily: "DM Sans,sans-serif" }}>
                Strategic Notes
              </span>
            </div>
            {[
              "Entry timing: favourable. Macro cycle supports deployment in H1 2026.",
              "Recommended structure: blended capital (grant + equity). Concessional layer de-risks anchor investment.",
              "Key dependency: government partner engagement must precede private close.",
              "BRIDGE role: advisory + co-investment. Operational oversight through local network.",
            ].map((note, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: i < 3 ? 8 : 0 }}>
                <span style={{ fontSize: 11, color: D.lime, fontFamily: "Inter,sans-serif", flexShrink: 0 }}>→</span>
                <span style={{ fontSize: 11, color: D.txt2, fontFamily: "Inter,sans-serif", lineHeight: 1.6 }}>
                  {note}
                </span>
              </div>
            ))}
          </div>

          <div style={{ height: 16 }} />
        </div>
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
        background: C.bg,
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <style>{`*{box-sizing:border-box;}::-webkit-scrollbar{display:none;}.drawer{animation:slideUp .25s ease}`}</style>

      {/* ── Mobile Header — sector selector only ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: 52,
          background: "rgba(9,15,11,0.97)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(16px)",
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          flexShrink: 0,
        }}
      >
        <div
          onClick={() => setSectorDrawer(true)}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            background: "rgba(255,255,255,0.06)",
            borderRadius: 10,
            padding: "7px 12px 7px 10px",
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 7,
              background: "rgba(184,217,53,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {s.svgIcon("#B8D935", 14)}
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
          <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: "#B8D935", fontFamily: "Inter,sans-serif" }}>
              {s.score}
            </span>
            <svg
              width={12}
              height={12}
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

      {/* ── Scrollable Content ── */}
      <div style={{ flex: 1, overflowY: "auto", background: "#090F0B" }}>{renderPage()}</div>

      {/* ── Bottom Nav — 5 report tabs ── */}
      <div
        style={{
          background: "#0F1A12",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "stretch",
          flexShrink: 0,
          paddingBottom: "env(safe-area-inset-bottom,0px)",
        }}
      >
        {[
          { id: "overview", label: "Overview", icon: (c) => <FileText size={19} color={c} /> },
          { id: "performance", label: "Performance", icon: (c) => <PieLucide size={19} color={c} /> },
          { id: "activity", label: "Activity", icon: (c) => <ClipboardList size={19} color={c} /> },
          { id: "capital", label: "Capital", icon: (c) => <DollarSign size={19} color={c} /> },
          { id: "rankings", label: "Insights", icon: (c) => <Lightbulb size={19} color={c} /> },
        ].map((n) => {
          const act = activeTab === n.id;
          return (
            <button
              key={n.id}
              onClick={() => setActiveTab(n.id)}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                padding: "9px 0",
                background: "none",
                border: "none",
                cursor: "pointer",
                position: "relative",
              }}
            >
              {act && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "20%",
                    right: "20%",
                    height: 2,
                    borderRadius: "0 0 3px 3px",
                    background: "#B8D935",
                  }}
                />
              )}
              {n.icon(act ? "#B8D935" : "rgba(255,255,255,0.28)")}
              <span
                style={{
                  fontSize: 8,
                  fontWeight: act ? 700 : 500,
                  color: act ? "#B8D935" : "rgba(255,255,255,0.28)",
                  fontFamily: "Inter,sans-serif",
                  letterSpacing: "0.2px",
                  whiteSpace: "nowrap",
                }}
              >
                {n.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { MobileDashboard };
