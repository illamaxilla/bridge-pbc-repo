import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  BarChart3,
  TrendingUp,
  TrendingDown,
  FileText,
} from "lucide-react";
import {
  BarChart as RBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Line,
  ReferenceLine,
} from "recharts";
import { C, SECTORS, type Sector } from "./constants";
import { genBarData, genMonthlyData, genTableRows, getTabMetrics, getTabStats } from "./utils";

export interface MobileResourcesPageProps {
  s: Sector;
  setS?: (s: Sector) => void;
  view?: string;
}

function MobileResourcesPage({ s, setS, view = "sector-performance" }: MobileResourcesPageProps) {
  const D = {
    bg: "#090F0B",
    card: "#0F1A12",
    card2: "#132118",
    border: "rgba(255,255,255,0.07)",
    borderLime: "rgba(184,217,53,0.18)",
    lime: "#B8D935",
    primary: "#1B4D3E",
    teal: "#2E8B6E",
    green: "#22C55E",
    red: "#EF4444",
    amber: "#F59E0B",
    txt: "#FFFFFF",
    txt2: "rgba(255,255,255,0.55)",
    txt3: "rgba(255,255,255,0.28)",
    iconBg: "rgba(184,217,53,0.12)",
    iconBg2: "rgba(255,255,255,0.07)",
  };

  const TABS = ["Sector Perf.", "Market", "Sub-sector", "Financials", "Growth", "Comparative", "Monthly", "Signals"];
  const TAB_KEYS = [
    "sector-performance",
    "market-analysis",
    "sub-sector-breakdown",
    "financials",
    "growth-tracking",
    "comparative-analysis",
    "monthly-summary",
    "signal-tracker",
  ];
  const [activeTab, setActiveTab] = useState("sector-performance");
  const [chartFilter, setChartFilter] = useState("30D");
  const [overtimeView, setOvertimeView] = useState(false);
  const [tableSearch, setTableSearch] = useState("");
  const [tablePage, setTablePage] = useState(1);
  const [open, setOpen] = useState({ metrics: true, value: true, capital: true, tabpanel: true, activity: true });
  const tog = (k) => setOpen((o) => ({ ...o, [k]: !o[k] }));
  const PAGE_SIZE = 6;

  const sigC = (sig) => (sig === "Bullish" ? D.green : sig === "Bearish" ? D.red : D.amber);

  /* ── Data helpers (reuse desktop logic) ── */
  const tabMetrics = getTabMetrics(s, activeTab);
  const tabStats = getTabStats(s, activeTab);
  const barData = genBarData(s, activeTab, chartFilter);
  const monthlyData = genMonthlyData(s);
  const allRows = genTableRows(s);
  const filtered = allRows.filter(
    (r) =>
      !tableSearch ||
      [r.source, r.category, r.signal, r.sector].some((f) => f.toLowerCase().includes(tableSearch.toLowerCase())),
  );
  const pageRows = filtered.slice((tablePage - 1) * PAGE_SIZE, tablePage * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  const totalCap = Math.round(((s.capLow + s.capHigh) / 2) * 10) / 10;
  const bullish = s.activity.filter((a) => a.sig === "Bullish").length;
  const donutData = [
    { name: "Market Cap", value: s.subSectors[0]?.pct || 35, color: D.lime },
    { name: "Growth", value: s.subSectors[1]?.pct || 25, color: D.teal },
    {
      name: "Other",
      value: 100 - (s.subSectors[0]?.pct || 35) - (s.subSectors[1]?.pct || 25),
      color: "rgba(255,255,255,0.1)",
    },
  ];
  const goals = [
    { count: s.totalV, label: "Ventures Tracked", pct: Math.round((s.totalV / 20) * 100), color: D.lime },
    {
      count: s.activity.length * 18,
      label: "Active Signals",
      pct: Math.round((bullish / s.activity.length) * 100),
      color: D.teal,
    },
    { count: 12, label: "Sectors Covered", pct: 100, color: D.amber },
  ];
  const capitalLast = monthlyData[monthlyData.length - 1];
  const capitalTotal = monthlyData.reduce((a, d) => a + d.growth, 0);

  /* ── Dark section header ── */
  const DHead = ({ id, label, badge = undefined, children }: { id: string; label: string; badge?: React.ReactNode; children?: React.ReactNode }) => {
    const isOpen = open[id] ?? true;
    return (
      <button
        onClick={() => tog(id)}
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
          {children}
        </div>
        <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: D.txt, fontFamily: "DM Sans,sans-serif" }}>
          {label}
        </span>
        {badge != null && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: D.lime,
              background: D.iconBg,
              borderRadius: 20,
              padding: "2px 8px",
              fontFamily: "Inter,sans-serif",
            }}
          >
            {badge}
          </span>
        )}
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            background: D.iconBg2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform .2s",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
        >
          <ChevronDown size={12} color={D.txt3} />
        </div>
      </button>
    );
  };

  return (
    <div style={{ background: D.bg, minHeight: "100%", paddingBottom: 90 }}>
      {/* ── Section label ── */}
      <div style={{ padding: "8px 16px 0", display: "flex", alignItems: "center", gap: 8 }}>
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
          {view === "activity-log" ? "ACTIVITY LOG" : "SECTOR PERFORMANCE"}
        </span>
        <div style={{ flex: 1, height: 1, background: D.border }} />
        <span style={{ fontSize: 9, fontWeight: 700, color: D.lime, fontFamily: "Inter,sans-serif" }}>{s.short}</span>
      </div>

      {/* ══════════════════════════════════════
          1. METRICS CHART CARD — Sector Performance only
      ══════════════════════════════════════ */}
      {view === "sector-performance" && (
        <div
          style={{
            margin: "10px 12px 10px",
            background: D.card,
            borderRadius: 16,
            border: `1px solid ${D.border}`,
            overflow: "hidden",
          }}
        >
          <DHead id="metrics" label={TABS[TAB_KEYS.indexOf(activeTab)] || "Sector Performance"} badge={chartFilter}>
            <BarChart3 size={13} color={D.lime} />
          </DHead>
          {open.metrics && (
            <>
              {/* Tab strip */}
              <div
                style={{ display: "flex", overflowX: "auto", padding: "0 12px 10px", gap: 5, scrollbarWidth: "none" }}
              >
                {TABS.map((t, i) => {
                  const act = activeTab === TAB_KEYS[i];
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setActiveTab(TAB_KEYS[i]);
                        setTablePage(1);
                      }}
                      style={{
                        flexShrink: 0,
                        padding: "5px 11px",
                        borderRadius: 20,
                        background: act ? D.lime : D.iconBg2,
                        border: `1px solid ${act ? D.lime : D.border}`,
                        fontSize: 10,
                        fontWeight: 700,
                        color: act ? D.primary : D.txt2,
                        fontFamily: "Inter,sans-serif",
                        cursor: "pointer",
                      }}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>

              {/* 7D/30D/90D toggle */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 16px 10px",
                }}
              >
                <div style={{ display: "flex", gap: 6 }}>
                  {[tabMetrics.p, tabMetrics.s].map((m, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "8px 12px",
                        background: D.iconBg2,
                        borderRadius: 10,
                        border: `1px solid ${D.border}`,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 3 }}>
                        <div
                          style={{ width: 6, height: 6, borderRadius: "50%", background: i === 0 ? D.lime : D.teal }}
                        />
                        <span style={{ fontSize: 9, color: D.txt3, fontFamily: "Inter,sans-serif" }}>{m.l}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                        <span
                          style={{
                            fontSize: 20,
                            fontWeight: 800,
                            color: D.txt,
                            letterSpacing: "-1px",
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {m.v}
                        </span>
                        <span
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            color: m.up ? D.green : D.red,
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {m.t}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 2, background: D.iconBg2, borderRadius: 7, padding: 2 }}>
                  {["7D", "30D", "90D"].map((v) => (
                    <button
                      key={v}
                      onClick={() => setChartFilter(v)}
                      style={{
                        padding: "3px 8px",
                        borderRadius: 5,
                        border: "none",
                        background: chartFilter === v ? D.lime : "transparent",
                        fontSize: 10,
                        fontWeight: 700,
                        color: chartFilter === v ? D.primary : D.txt3,
                        cursor: "pointer",
                        fontFamily: "Inter,sans-serif",
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bar chart */}
              <div style={{ height: 140, padding: "0 8px 4px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RBarChart data={barData} barSize={14} barGap={2} margin={{ top: 0, right: 4, left: -28, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis
                      dataKey="day"
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
                    <Bar dataKey="primary" fill={D.lime} radius={[3, 3, 0, 0]} name="Primary" />
                    <Bar dataKey="secondary" fill={`${D.teal}66`} radius={[3, 3, 0, 0]} name="Secondary" />
                  </RBarChart>
                </ResponsiveContainer>
              </div>

              {/* 4 bottom stats */}
              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: `1px solid ${D.border}` }}
              >
                {tabStats.map((stat, i) => (
                  <div key={i} style={{ padding: "10px 12px", borderRight: i < 3 ? `1px solid ${D.border}` : "none" }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: D.txt,
                        letterSpacing: "-.5px",
                        fontFamily: "Inter,sans-serif",
                      }}
                    >
                      {stat.v}
                    </div>
                    <div
                      style={{
                        fontSize: 8,
                        color: D.txt3,
                        fontFamily: "Inter,sans-serif",
                        marginTop: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {stat.l}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════
          2. SECTOR VALUE CARD (DonutGoalCard)
      ══════════════════════════════════════ */}
      {view === "sector-performance" && (
        <div
          style={{
            margin: "0 12px 10px",
            background: D.card,
            borderRadius: 16,
            border: `1px solid ${D.border}`,
            overflow: "hidden",
          }}
        >
          <DHead id="value" label="Sector Value">
            <svg
              width={13}
              height={13}
              viewBox="0 0 24 24"
              fill="none"
              stroke={D.lime}
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
          </DHead>
          {open.value && (
            <div style={{ padding: "0 16px 16px" }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
                {/* Donut */}
                <div style={{ position: "relative", width: 100, height: 100, flexShrink: 0 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donutData}
                        cx="50%"
                        cy="50%"
                        innerRadius={28}
                        outerRadius={46}
                        dataKey="value"
                        stroke="none"
                        startAngle={90}
                        endAngle={-270}
                      >
                        {donutData.map((e, i) => (
                          <Cell key={i} fill={e.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                      textAlign: "center",
                      pointerEvents: "none",
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 800, color: D.txt, lineHeight: 1 }}>${totalCap}M</div>
                    <div style={{ fontSize: 8, color: D.txt3, fontFamily: "Inter,sans-serif", marginTop: 1 }}>Cap</div>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      color: D.txt,
                      letterSpacing: "-1px",
                      marginBottom: 8,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    ${totalCap}M
                  </div>
                  {donutData.map((d, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: i < 2 ? 4 : 0,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: d.color }} />
                        <span style={{ fontSize: 10, color: D.txt3, fontFamily: "Inter,sans-serif" }}>{d.name}</span>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: D.txt, fontFamily: "Inter,sans-serif" }}>
                        {d.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Goal bars */}
              <div style={{ height: 1, background: D.border, marginBottom: 12 }} />
              {goals.map((g, i) => (
                <div key={i} style={{ marginBottom: i < 2 ? 12 : 0 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      marginBottom: 4,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: D.txt,
                          letterSpacing: "-.5px",
                          lineHeight: 1,
                          fontFamily: "Inter,sans-serif",
                        }}
                      >
                        {g.count}
                      </div>
                      <div style={{ fontSize: 9, color: D.txt3, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                        {g.label}
                      </div>
                    </div>
                    <span style={{ fontSize: 9, fontWeight: 700, color: g.color, fontFamily: "Inter,sans-serif" }}>
                      {g.pct}% goal
                    </span>
                  </div>
                  <div style={{ height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ width: `${g.pct}%`, height: "100%", background: g.color, borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════
          3. CAPITAL FLOW CARD (ComposedChartRow)
      ══════════════════════════════════════ */}
      {view === "sector-performance" && (
        <div
          style={{
            margin: "0 12px 10px",
            background: D.card,
            borderRadius: 16,
            border: `1px solid ${D.border}`,
            overflow: "hidden",
          }}
        >
          <DHead id="capital" label="Capital Flow Analysis" badge={overtimeView ? "Overtime" : "6-Month"}>
            <TrendingUp size={13} color={D.lime} />
          </DHead>
          {open.capital && (
            <div style={{ padding: "0 12px 16px" }}>
              <div style={{ fontSize: 10, color: D.txt3, fontFamily: "Inter,sans-serif", marginBottom: 10 }}>
                Growth revenue · Operating costs · Net income
              </div>
              {/* Legend + overtime toggle */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ display: "flex", gap: 12 }}>
                  {[
                    { c: D.lime, l: "Growth" },
                    { c: D.teal, l: "Expenses" },
                    { c: D.amber, l: "Net" },
                  ].map((lg, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", background: lg.c }} />
                      <span style={{ fontSize: 9, color: D.txt3, fontFamily: "Inter,sans-serif" }}>{lg.l}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setOvertimeView((o) => !o)}
                  style={{
                    padding: "3px 10px",
                    borderRadius: 7,
                    border: `1px solid ${overtimeView ? D.lime : D.border}`,
                    background: overtimeView ? D.iconBg : "transparent",
                    fontSize: 10,
                    fontWeight: 600,
                    color: overtimeView ? D.lime : D.txt3,
                    cursor: "pointer",
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  Overtime
                </button>
              </div>
              {/* Composed chart */}
              <div style={{ height: 160 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={monthlyData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 9, fill: D.txt3, fontFamily: "Inter,sans-serif" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 9, fill: D.txt3 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => (overtimeView ? `${Math.round(v / 10)}%` : `$${v}`)}
                    />
                    <Tooltip
                      contentStyle={{
                        background: D.card2,
                        border: `1px solid ${D.border}`,
                        borderRadius: 8,
                        color: D.txt,
                        fontSize: 11,
                      }}
                    />
                    <ReferenceLine y={0} stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
                    <Bar
                      dataKey="growth"
                      fill={D.lime}
                      fillOpacity={0.85}
                      radius={[3, 3, 0, 0]}
                      name="Growth"
                      barSize={12}
                    />
                    <Bar
                      dataKey="expenses"
                      fill={D.teal}
                      fillOpacity={0.55}
                      radius={[3, 3, 0, 0]}
                      name="Expenses"
                      barSize={12}
                    />
                    <Line
                      type="monotone"
                      dataKey="net"
                      stroke={D.amber}
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 3, fill: D.amber, strokeWidth: 0 }}
                      name="Net Income"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              {/* Summary row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginTop: 12 }}>
                {[
                  { l: "Total Capital", v: `$${capitalTotal.toLocaleString()}`, c: D.lime },
                  { l: "Net Margin", v: `${Math.round((capitalLast.net / capitalLast.growth) * 100)}%`, c: D.green },
                  { l: "Net Income", v: `$${capitalLast.net}`, c: D.amber },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: D.iconBg2,
                      borderRadius: 10,
                      padding: "10px 10px",
                      border: `1px solid ${D.border}`,
                    }}
                  >
                    <div style={{ fontSize: 9, color: D.txt3, fontFamily: "Inter,sans-serif", marginBottom: 4 }}>
                      {item.l}
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: item.c, fontFamily: "Inter,sans-serif" }}>
                      {item.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════
          4. TAB PANEL (TabPanel extra content)
      ══════════════════════════════════════ */}
      {view === "sector-performance" &&
        ["sub-sector-breakdown", "financials", "comparative-analysis", "monthly-summary"].includes(activeTab) && (
          <div
            style={{
              margin: "0 12px 10px",
              background: D.card,
              borderRadius: 16,
              border: `1px solid ${D.border}`,
              overflow: "hidden",
            }}
          >
            <DHead id="tabpanel" label={TABS[TAB_KEYS.indexOf(activeTab)] + " Detail"}>
              <BarChart3 size={13} color={D.lime} />
            </DHead>
            {open.tabpanel && (
              <div style={{ padding: "0 16px 16px" }}>
                {/* Sub-sector breakdown */}
                {activeTab === "sub-sector-breakdown" && (
                  <>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: D.txt2,
                        marginBottom: 10,
                        fontFamily: "DM Sans,sans-serif",
                      }}
                    >
                      Sub-sector Distribution
                    </div>
                    {s.subSectors.map((ss, i) => (
                      <div key={i} style={{ marginBottom: 10 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{ width: 4, height: 4, borderRadius: "50%", background: ss.color || D.lime }} />
                            <span style={{ fontSize: 11, color: D.txt2, fontFamily: "Inter,sans-serif" }}>
                              {ss.name}
                            </span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 10, color: D.green, fontFamily: "Inter,sans-serif" }}>
                              +{Math.round(ss.pct * 0.12)}%
                            </span>
                            <span
                              style={{ fontSize: 12, fontWeight: 800, color: D.lime, fontFamily: "Inter,sans-serif" }}
                            >
                              {ss.pct}%
                            </span>
                          </div>
                        </div>
                        <div
                          style={{
                            height: 5,
                            background: "rgba(255,255,255,0.07)",
                            borderRadius: 3,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${ss.pct}%`,
                              background: ss.color || D.lime,
                              borderRadius: 3,
                              transition: "width .6s ease",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Financials */}
                {activeTab === "financials" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { l: "Total Revenue", v: `$${s.capHigh}M`, chg: "+15.2%", col: D.green },
                      { l: "Total Expenses", v: `$${Math.round(s.capLow * 0.4)}M`, chg: "+2.1%", col: D.amber },
                      {
                        l: "Net Income",
                        v: `$${s.capHigh - Math.round(s.capLow * 0.4)}M`,
                        chg: "+18.4%",
                        col: D.green,
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        style={{
                          background: D.iconBg2,
                          borderRadius: 12,
                          padding: "14px 14px",
                          border: `1px solid ${D.border}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <div style={{ fontSize: 10, color: D.txt3, fontFamily: "Inter,sans-serif", marginBottom: 4 }}>
                            {item.l}
                          </div>
                          <div
                            style={{
                              fontSize: 22,
                              fontWeight: 800,
                              color: D.txt,
                              letterSpacing: "-1px",
                              fontFamily: "Inter,sans-serif",
                            }}
                          >
                            {item.v}
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                          <TrendingUp size={12} color={item.col} />
                          <span
                            style={{ fontSize: 12, fontWeight: 700, color: item.col, fontFamily: "Inter,sans-serif" }}
                          >
                            {item.chg}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comparative */}
                {activeTab === "comparative-analysis" && (
                  <>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: D.txt2,
                        marginBottom: 10,
                        fontFamily: "DM Sans,sans-serif",
                      }}
                    >
                      All Sectors — BRIDGE Score Ranking
                    </div>
                    {[...SECTORS]
                      .sort((a, b) => b.score - a.score)
                      .map((sec, i) => {
                        const act = sec.id === s.id;
                        return (
                          <div
                            key={sec.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              padding: "7px 0",
                              borderBottom: i < 11 ? `1px solid ${D.border}` : "none",
                            }}
                          >
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: act ? D.lime : D.txt3,
                                width: 14,
                                textAlign: "right",
                                fontFamily: "Inter,sans-serif",
                              }}
                            >
                              {i + 1}
                            </span>
                            <div
                              style={{
                                width: 24,
                                height: 24,
                                borderRadius: 6,
                                background: act ? "rgba(184,217,53,0.15)" : D.iconBg2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                              }}
                            >
                              {sec.svgIcon(act ? D.lime : D.txt3, 11)}
                            </div>
                            <span
                              style={{
                                flex: 1,
                                fontSize: 11,
                                fontWeight: act ? 700 : 400,
                                color: act ? D.txt : D.txt2,
                                fontFamily: "Inter,sans-serif",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {sec.short}
                            </span>
                            <div
                              style={{
                                width: 60,
                                height: 4,
                                background: "rgba(255,255,255,0.07)",
                                borderRadius: 2,
                                overflow: "hidden",
                                flexShrink: 0,
                              }}
                            >
                              <div
                                style={{
                                  width: `${sec.score}%`,
                                  height: "100%",
                                  background: act ? D.lime : D.teal,
                                  borderRadius: 2,
                                }}
                              />
                            </div>
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: act ? D.lime : D.txt3,
                                width: 24,
                                textAlign: "right",
                                fontFamily: "Inter,sans-serif",
                              }}
                            >
                              {sec.score}
                            </span>
                          </div>
                        );
                      })}
                  </>
                )}

                {/* Monthly summary */}
                {activeTab === "monthly-summary" && (
                  <>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: D.txt2,
                        marginBottom: 10,
                        fontFamily: "DM Sans,sans-serif",
                      }}
                    >
                      Monthly Performance 2025/2026
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                        (m, i) => {
                          const val = Math.round(
                            s.score * (0.85 + Math.sin(i * 0.9 + s.score * 0.03) * 0.12 + i * 0.01),
                          );
                          const up = val >= s.score;
                          const cur = m === "Jan";
                          return (
                            <div
                              key={m}
                              style={{
                                padding: "8px 10px",
                                background: cur ? "rgba(184,217,53,0.1)" : D.iconBg2,
                                borderRadius: 8,
                                border: `1px solid ${cur ? D.lime : D.border}`,
                              }}
                            >
                              <div
                                style={{
                                  fontSize: 9,
                                  fontWeight: 700,
                                  color: cur ? D.lime : D.txt3,
                                  fontFamily: "Inter,sans-serif",
                                  marginBottom: 2,
                                }}
                              >
                                {m}
                              </div>
                              <div
                                style={{
                                  fontSize: 14,
                                  fontWeight: 700,
                                  color: D.txt,
                                  lineHeight: 1,
                                  fontFamily: "Inter,sans-serif",
                                }}
                              >
                                {val}
                              </div>
                              <div style={{ display: "flex", alignItems: "center", gap: 2, marginTop: 2 }}>
                                {up ? <TrendingUp size={8} color={D.green} /> : <TrendingDown size={8} color={D.red} />}
                                <span
                                  style={{ fontSize: 8, color: up ? D.green : D.red, fontFamily: "Inter,sans-serif" }}
                                >
                                  {up ? `+${val - s.score}` : `${val - s.score}`}
                                </span>
                              </div>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

      {/* ══════════════════════════════════════
          5. ACTIVITY LOG (ActivityTable adapted)
      ══════════════════════════════════════ */}
      <div
        style={{
          margin: "0 12px 10px",
          background: D.card,
          borderRadius: 16,
          border: `1px solid ${D.border}`,
          overflow: "hidden",
        }}
      >
        <DHead id="activity" label="Sector Activity Log" badge={`${filtered.length} entries`}>
          <FileText size={13} color={D.lime} />
        </DHead>
        {open.activity && (
          <>
            {/* Search + filter */}
            <div style={{ padding: "0 16px 10px", display: "flex", gap: 8 }}>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: D.iconBg2,
                  border: `1px solid ${D.border}`,
                  borderRadius: 8,
                  padding: "7px 10px",
                }}
              >
                <Search size={11} color={D.txt3} />
                <input
                  value={tableSearch}
                  onChange={(e) => {
                    setTableSearch(e.target.value);
                    setTablePage(1);
                  }}
                  placeholder="Search activities..."
                  style={{
                    background: "none",
                    border: "none",
                    outline: "none",
                    fontSize: 11,
                    color: D.txt,
                    fontFamily: "Inter,sans-serif",
                    width: "100%",
                  }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {["Bullish", "Watch"].map((v) => (
                  <div
                    key={v}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      padding: "4px 8px",
                      borderRadius: 6,
                      background: D.iconBg2,
                      border: `1px solid ${D.border}`,
                    }}
                  >
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: sigC(v) }} />
                    <span style={{ fontSize: 9, fontWeight: 600, color: sigC(v), fontFamily: "Inter,sans-serif" }}>
                      {filtered.filter((r) => r.signal === v).length}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Row cards */}
            <div style={{ padding: "0 0 4px" }}>
              {pageRows.map((row, i) => {
                const sec = SECTORS.find((x) => x.id === row.sectorId);
                const isPrimary = row.sectorId === s.id;
                return (
                  <div
                    key={row.id}
                    style={{
                      padding: "10px 16px",
                      borderTop: `1px solid ${D.border}`,
                      background: isPrimary ? "rgba(184,217,53,0.03)" : "transparent",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 6 }}>
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 8,
                          background: isPrimary ? "rgba(184,217,53,0.12)" : D.iconBg2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {sec && sec.svgIcon(isPrimary ? D.lime : D.txt3, 12)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: isPrimary ? 700 : 600,
                            color: D.txt,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.source}
                        </div>
                        <div style={{ fontSize: 10, color: D.txt3, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                          {row.sector} · {row.date}
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 800,
                            color: row.value.startsWith("+") ? D.green : row.value.startsWith("-") ? D.red : D.txt,
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {row.value}
                        </div>
                        <div
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: sigC(row.signal),
                            fontFamily: "Inter,sans-serif",
                            marginTop: 2,
                          }}
                        >
                          {row.signal}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                      <span
                        style={{
                          fontSize: 9,
                          padding: "2px 6px",
                          borderRadius: 4,
                          background: "rgba(184,217,53,0.08)",
                          color: D.lime,
                          fontFamily: "Inter,sans-serif",
                          fontWeight: 600,
                          border: `1px solid ${D.iconBg}`,
                        }}
                      >
                        {row.category}
                      </span>
                      {row.tags.map((t, j) => (
                        <span
                          key={j}
                          style={{
                            fontSize: 9,
                            padding: "2px 6px",
                            borderRadius: 4,
                            background: D.iconBg2,
                            color: D.txt3,
                            fontFamily: "Inter,sans-serif",
                            border: `1px solid ${D.border}`,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                      <span
                        style={{
                          fontSize: 9,
                          padding: "2px 6px",
                          borderRadius: 4,
                          background: D.iconBg2,
                          color: row.status === "Active" ? D.green : row.status === "Monitoring" ? D.amber : D.txt3,
                          fontFamily: "Inter,sans-serif",
                          fontWeight: 600,
                          border: `1px solid ${D.border}`,
                          marginLeft: "auto",
                        }}
                      >
                        {row.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div
              style={{
                padding: "10px 16px",
                borderTop: `1px solid ${D.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 11, color: D.txt3, fontFamily: "Inter,sans-serif" }}>
                Page {tablePage} of {totalPages}
              </span>
              <div style={{ display: "flex", gap: 4 }}>
                <button
                  onClick={() => setTablePage((p) => Math.max(1, p - 1))}
                  disabled={tablePage === 1}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    border: `1px solid ${D.border}`,
                    background: D.iconBg2,
                    cursor: tablePage === 1 ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: tablePage === 1 ? 0.3 : 1,
                  }}
                >
                  <ChevronLeft size={12} color={D.txt2} />
                </button>
                {Array.from({ length: Math.min(4, totalPages) }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setTablePage(p)}
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      border: `1px solid ${p === tablePage ? D.lime : D.border}`,
                      background: p === tablePage ? "rgba(184,217,53,0.15)" : D.iconBg2,
                      fontSize: 10,
                      fontWeight: p === tablePage ? 700 : 400,
                      color: p === tablePage ? D.lime : D.txt3,
                      cursor: "pointer",
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setTablePage((p) => Math.min(totalPages, p + 1))}
                  disabled={tablePage === totalPages}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    border: `1px solid ${D.border}`,
                    background: D.iconBg2,
                    cursor: tablePage === totalPages ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: tablePage === totalPages ? 0.3 : 1,
                  }}
                >
                  <ChevronRight size={12} color={D.txt2} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export { MobileResourcesPage };
