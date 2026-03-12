import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  BarChart as RBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  SECTORS,
  M,
  compute,
  genVolume,
  CAP_STRUCTURE,
  CO_INVESTORS,
  ENTRY_WINDOWS,
} from "./data";
import { ChartTip } from "./DesktopComponents";
import { MCard } from "./MobileComponents";

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
