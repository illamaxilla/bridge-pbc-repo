import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Clock,
  Star,
  Target,
  Activity,
  SlidersHorizontal,
  BarChart2,
  BarChart3,
  FolderOpen,
  LayoutDashboard,
  LayoutGrid,
  Globe,
  ChevronRight,
  User,
} from "lucide-react";
import { M, sigC } from "./constants";
import type { Sector, Company } from "./constants";
import { ventureIcon } from "./constants";
import { SECTORS, COMPANIES } from "./data";
import { MCard, Heatmap } from "./UIComponents";
import DashMobileSectorHeader from "./DashMobileSectorHeader";

export interface MobileDashboardProps {
  s: Sector;
  setS: (s: Sector) => void;
}

export default function MobileDashboard({ s, setS }: MobileDashboardProps) {
  const [dashSub, setDashSub] = useState("overview");
  const [notif, setNotif] = useState(false);
  const [pressedTab, setPressedTab] = useState<string | null>(null);
  const Icon = s.icon;
  const companies = COMPANIES[s.id] || COMPANIES.financial;
  const DASH_SUBS = [
    { id: "overview", label: "Overview" },
    { id: "ventures", label: "Ventures" },
    { id: "signals", label: "Signals" },
    { id: "companies", label: "Companies" },
    { id: "analytics", label: "Analytics" },
  ];
  const ANALYTICS_SUBS = [
    { id: "kpis", label: "KPIs" },
    { id: "performance", label: "Performance" },
    { id: "activity", label: "Activity" },
    { id: "companies", label: "Companies" },
    { id: "map", label: "Map" },
  ];
  /* ── Bar chart data for engagement ── */
  const barData = Array.from({ length: 24 }, (_, i) => Math.floor(20 + Math.random() * 80));
  const maxBar = Math.max(...barData);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: M.bg,
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <style>{`
      .mscroll::-webkit-scrollbar{display:none}
      .mscroll{-ms-overflow-style:none;scrollbar-width:none}
    `}</style>

      {/* ═══ ACTIVE SECTOR STICKY HEADER ═══ */}
      <DashMobileSectorHeader s={s} setS={setS} />

      {/* ═══ SCROLLABLE CONTENT ═══ */}
      <div className="mscroll" style={{ flex: 1, overflowY: "auto", padding: "10px 12px 80px" }}>
        {/* ─ DASHBOARD / OVERVIEW ─ */}
        {dashSub === "overview" && (
          <>
            {/* KPI 2x2 grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
              {[
                {
                  icon: TrendingUp,
                  label: "Market Cap",
                  val: `$${(s.capHigh * 0.75).toFixed(1)}B`,
                  sub: "Sector aggregate",
                  chg: "+5.1%",
                },
                { icon: ArrowUpRight, label: "IRR Ceiling", val: `${s.irrHigh}%`, sub: "Target return", chg: "+2.4%" },
                {
                  icon: LayoutDashboard,
                  label: "Sub-sector Rev",
                  val: `$${(s.capLow * 0.7).toFixed(1)}B`,
                  sub: "Lead segment",
                  chg: "+3.8%",
                },
                { icon: Clock, label: "BRIDGE Score", val: `${s.score}`, sub: "/ 100 composite", chg: "+1.2%" },
              ].map((k, i) => {
                const KIcon = k.icon;
                return (
                  <div
                    key={i}
                    style={{
                      background: M.card,
                      borderRadius: 14,
                      border: `1px solid ${M.cardBorder}`,
                      padding: "12px 13px",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 11,
                        fontSize: 10,
                        fontWeight: 700,
                        color: M.green,
                        fontFamily: "Inter,sans-serif",
                      }}
                    >
                      {k.chg}
                    </div>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 7,
                        background: M.accentDim,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 10,
                      }}
                    >
                      <KIcon size={13} color={M.accent} />
                    </div>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 700,
                        color: M.white,
                        letterSpacing: "-.5px",
                        lineHeight: 1,
                        marginBottom: 4,
                      }}
                    >
                      {k.val}
                    </div>
                    <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif", lineHeight: 1.2 }}>
                      {k.label}
                    </div>
                    <div style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
                      {k.sub}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sub-sector breakdown */}
            <MCard
              icon={LayoutGrid}
              title="Sub-sector Breakdown"
              badge={`${s.subSectors.length} segments`}
              defaultOpen={true}
            >
              <div style={{ padding: "12px 14px" }}>
                <div style={{ height: 6, borderRadius: 4, overflow: "hidden", display: "flex", marginBottom: 13 }}>
                  {s.subSectors.map((ss, i) => (
                    <div key={i} style={{ flex: ss.pct, background: ss.color }} />
                  ))}
                </div>
                {s.subSectors.map((ss, i) => (
                  <div key={i} style={{ marginBottom: 11 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <div style={{ width: 7, height: 7, borderRadius: 2, background: ss.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: M.white }}>{ss.name}</span>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
                        {ss.pct}%
                      </span>
                    </div>
                    <div
                      style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}
                    >
                      <div style={{ width: `${ss.pct}%`, height: "100%", background: M.tealBright, borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
            </MCard>

            {/* Impact Score */}
            <MCard icon={Target} title="BRIDGE Impact Score" badge={`${s.score}`} badgeLime={true} defaultOpen={true}>
              <div style={{ padding: "12px 14px" }}>
                {[
                  ["Peace & Prosperity", Math.min(s.score + 4, 96)],
                  ["Strategic Fit", Math.max(s.score - 2, 0)],
                  ["Feasibility", Math.min(s.score + 2, 98)],
                  ["Scalability", Math.max(s.score - 1, 0)],
                ].map(([l, v]) => (
                  <div key={l} style={{ marginBottom: 11 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", fontFamily: "Inter,sans-serif" }}>
                        {l}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
                        {v}
                      </span>
                    </div>
                    <div
                      style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}
                    >
                      <div
                        style={{
                          width: `${v}%`,
                          height: "100%",
                          background: `linear-gradient(90deg,${M.tealBright},${M.accent})`,
                          borderRadius: 2,
                          transition: "width .8s ease",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </MCard>

            {/* Capital Pipeline */}
            <MCard icon={BarChart3} title="Capital Pipeline" badge={`${s.pipeline.length} active`} defaultOpen={false}>
              <div style={{ padding: "12px 14px" }}>
                {s.pipeline.map((p, i) => (
                  <div key={i} style={{ marginBottom: 13 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: M.white }}>{p.label}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
                        {p.pct}%
                      </span>
                    </div>
                    <div
                      style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}
                    >
                      <div
                        style={{
                          width: `${p.pct}%`,
                          height: "100%",
                          background: `linear-gradient(90deg,${M.teal},${M.accent})`,
                          borderRadius: 2,
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                      <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                        {p.current} of {p.target}
                      </span>
                      <span style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif" }}>~{p.months}mo</span>
                    </div>
                  </div>
                ))}
              </div>
            </MCard>

            {/* Activity Heatmap */}
            <MCard icon={LayoutGrid} title="Activity Heatmap" badge="7 Days" defaultOpen={false}>
              <Heatmap />
            </MCard>

            {/* 30-Day Engagement */}
            <MCard icon={Activity} title="30-Day Engagement" badge="Live" badgeLime={true} defaultOpen={false}>
              <div style={{ padding: "12px 14px 0" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 7, marginBottom: 14 }}>
                  {[
                    { v: "1,692", l: "Active Signals", chg: "+56%" },
                    { v: "1,423", l: "Conversion", chg: "+43%" },
                    { v: "11,992", l: "Avg Duration", chg: "+28%" },
                  ].map((m, i) => (
                    <div
                      key={i}
                      style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 10px" }}
                    >
                      <div style={{ fontSize: 16, fontWeight: 700, color: M.white, lineHeight: 1, marginBottom: 4 }}>
                        {m.v}
                      </div>
                      <div style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif", marginBottom: 5 }}>
                        {m.l}
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: M.green, fontFamily: "Inter,sans-serif" }}>
                        {m.chg}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Bar chart */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 60, marginBottom: 8 }}>
                  {barData.map((v, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        background: i % 6 === 0 ? M.tealBright : `rgba(46,90,77,${0.25 + (v / maxBar) * 0.55})`,
                        borderRadius: "2px 2px 0 0",
                        height: `${(v / maxBar) * 100}%`,
                        minHeight: 3,
                      }}
                    />
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 12 }}>
                  {["Feb 5", "Feb 15", "Feb 25", "Mar 1"].map((d) => (
                    <span key={d} style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif" }}>
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </MCard>

            {/* Cross-Sector Links */}
            <MCard icon={Globe} title="Cross-Sector Links" defaultOpen={false}>
              <div style={{ padding: "12px 14px", display: "flex", flexWrap: "wrap", gap: 8 }}>
                {s.cross.map((cid, i) => {
                  const found = SECTORS.find((sec) => sec.id === cid);
                  if (!found) return null;
                  const FIcon = found.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => setS(found)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 7,
                        padding: "7px 13px",
                        borderRadius: 20,
                        border: `1px solid ${M.cardBorder}`,
                        background: "rgba(255,255,255,0.04)",
                        cursor: "pointer",
                      }}
                    >
                      <FIcon size={12} color={M.accent} />
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "rgba(255,255,255,0.7)",
                          fontFamily: "Inter,sans-serif",
                        }}
                      >
                        {found.short}
                      </span>
                    </button>
                  );
                })}
              </div>
            </MCard>
            <div style={{ height: 16 }} />
          </>
        )}

        {/* ─ DASHBOARD / VENTURES ─ */}
        {dashSub === "ventures" && (
          <>
            {/* Tier distribution */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 8 }}>
              {[
                [s.t1?.length, "I", M.accent, M.accentDim, "Priority"],
                [s.t2?.length, "II", "rgba(61,122,102,1)", "rgba(61,122,102,0.15)", "Mid-term"],
                [s.t3?.length, "III", M.muted, "rgba(255,255,255,0.06)", "Long-term"],
              ].map(([n, lbl, col, bg, sub]) => (
                <div
                  key={lbl}
                  style={{
                    background: bg,
                    borderRadius: 12,
                    border: `1px solid ${M.cardBorder}`,
                    padding: "12px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{ fontSize: 24, fontWeight: 700, color: col, fontFamily: "Inter,sans-serif", lineHeight: 1 }}
                  >
                    {n}
                  </div>
                  <div
                    style={{ fontSize: 10, fontWeight: 700, color: col, fontFamily: "Inter,sans-serif", marginTop: 3 }}
                  >
                    Tier {lbl}
                  </div>
                  <div style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif", marginTop: 2 }}>{sub}</div>
                </div>
              ))}
            </div>
            <MCard
              icon={Star}
              title="Tier I Ventures"
              badge={`${s.t1?.length} priority`}
              badgeLime={true}
              defaultOpen={true}
            >
              <div style={{ padding: "4px 0 4px" }}>
                {(s.t1 || []).map((v, i) => {
                  const VIcon = ventureIcon(v.name);
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 11,
                        padding: "10px 14px",
                        borderBottom: i < (s.t1 || []).length - 1 ? `1px solid ${M.divider}` : "none",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: "rgba(255,255,255,0.05)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <VIcon size={14} color={M.accent} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: M.white,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {v.name}
                        </div>
                        <div style={{ display: "flex", gap: 5, marginTop: 3, alignItems: "center" }}>
                          <span
                            style={{ fontSize: 10, color: M.accent, fontFamily: "Inter,sans-serif", fontWeight: 700 }}
                          >
                            {v.irr}
                          </span>
                          <span style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif" }}>·</span>
                          <span
                            style={{
                              fontSize: 9,
                              fontWeight: 700,
                              color: v.risk === "LOW" ? M.green : v.risk === "HIGH" ? M.red : M.orange,
                              fontFamily: "Inter,sans-serif",
                            }}
                          >
                            {v.risk}
                          </span>
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: M.white, fontFamily: "Inter,sans-serif" }}>
                          {v.cap}
                        </div>
                        <div style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                          Capital
                        </div>
                      </div>
                      <ChevronRight size={12} color={M.dim} />
                    </div>
                  );
                })}
              </div>
            </MCard>
            <MCard icon={Activity} title="Tier II Ventures" badge={`${s.t2?.length} mid-term`} defaultOpen={false}>
              <div style={{ padding: "4px 0 4px" }}>
                {(s.t2 || []).map((v, i) => {
                  const VIcon = ventureIcon(v.name);
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 11,
                        padding: "10px 14px",
                        borderBottom: i < (s.t2 || []).length - 1 ? `1px solid ${M.divider}` : "none",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: "rgba(61,122,102,0.12)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <VIcon size={14} color={M.tealBright} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: M.white,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {v.name}
                        </div>
                        <div style={{ display: "flex", gap: 5, marginTop: 3 }}>
                          <span
                            style={{
                              fontSize: 10,
                              color: M.tealBright,
                              fontFamily: "Inter,sans-serif",
                              fontWeight: 600,
                            }}
                          >
                            {v.irr}
                          </span>
                          <span style={{ fontSize: 9, color: M.dim }}>·</span>
                          <span
                            style={{
                              fontSize: 9,
                              fontWeight: 700,
                              color: v.risk === "LOW" ? M.green : v.risk === "HIGH" ? M.red : M.orange,
                            }}
                          >
                            {v.risk}
                          </span>
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: "rgba(255,255,255,0.7)",
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {v.cap}
                        </div>
                      </div>
                      <ChevronRight size={12} color={M.dim} />
                    </div>
                  );
                })}
              </div>
            </MCard>
            <MCard icon={FolderOpen} title="Tier III Ventures" badge={`${s.t3?.length} long-term`} defaultOpen={false}>
              <div style={{ padding: "4px 0 4px" }}>
                {(s.t3 || []).map((v, i) => {
                  const VIcon = ventureIcon(v.name);
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 11,
                        padding: "10px 14px",
                        borderBottom: i < (s.t3 || []).length - 1 ? `1px solid ${M.divider}` : "none",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: "rgba(255,255,255,0.04)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <VIcon size={14} color={M.muted} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: "rgba(255,255,255,0.65)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {v.name}
                        </div>
                        <div style={{ display: "flex", gap: 5, marginTop: 3 }}>
                          <span style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>{v.irr}</span>
                          <span style={{ fontSize: 9, color: M.dim }}>·</span>
                          <span style={{ fontSize: 9, fontWeight: 700, color: v.risk === "HIGH" ? M.red : M.orange }}>
                            {v.risk}
                          </span>
                        </div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: 11, color: M.muted, fontFamily: "Inter,sans-serif" }}>{v.cap}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </MCard>
            <div style={{ height: 16 }} />
          </>
        )}

        {/* ─ DASHBOARD / SIGNALS ─ */}
        {dashSub === "signals" && (
          <>
            {/* Signal source breakdown */}
            <MCard icon={BarChart2} title="Signal Source Breakdown" badge="+180%" defaultOpen={true}>
              <div style={{ padding: "12px 14px" }}>
                {/* Stacked bar */}
                <div style={{ height: 32, borderRadius: 8, overflow: "hidden", display: "flex", marginBottom: 14 }}>
                  <div
                    style={{
                      flex: 25,
                      background: M.tealBright,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontSize: 10, fontWeight: 700, color: M.white }}>25%</span>
                  </div>
                  <div
                    style={{
                      flex: 25,
                      background: "rgba(61,122,102,0.55)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontSize: 10, fontWeight: 700, color: M.white }}>25%</span>
                  </div>
                  <div
                    style={{
                      flex: 50,
                      background: "rgba(46,90,77,0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ fontSize: 10, fontWeight: 700, color: M.white }}>50%</span>
                  </div>
                </div>
                {[
                  { l: "Earnings & Policy", pct: 25, col: M.tealBright },
                  { l: "News & Media", pct: 25, col: "rgba(61,122,102,0.85)" },
                  { l: "Analyst Ratings", pct: 50, col: "rgba(46,90,77,0.7)" },
                ].map((src, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: src.col, flexShrink: 0 }} />
                        <span style={{ fontSize: 12, fontWeight: 600, color: M.white }}>{src.l}</span>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
                        {src.pct}%
                      </span>
                    </div>
                    <div
                      style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}
                    >
                      <div style={{ width: `${src.pct}%`, height: "100%", background: src.col, borderRadius: 2 }} />
                    </div>
                  </div>
                ))}
              </div>
            </MCard>

            {/* Market signals (activity) */}
            <MCard icon={TrendingUp} title="Market Signals" badge={`${s.activity.length}`} defaultOpen={true}>
              <div style={{ padding: "4px 0 4px" }}>
                {s.activity.map((a, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 11,
                      padding: "11px 14px",
                      borderBottom: i < s.activity.length - 1 ? `1px solid ${M.divider}` : "none",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: sigC(a.sig),
                        marginTop: 5,
                        flexShrink: 0,
                        boxShadow: `0 0 7px ${sigC(a.sig)}`,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: M.white, lineHeight: 1.3, marginBottom: 5 }}>
                        {a.h}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <span
                          style={{
                            fontSize: 9,
                            fontWeight: 700,
                            padding: "2px 7px",
                            borderRadius: 5,
                            background:
                              a.sig === "Bullish"
                                ? "rgba(74,222,128,0.12)"
                                : a.sig === "Bearish"
                                  ? "rgba(248,113,113,0.12)"
                                  : "rgba(251,191,36,0.12)",
                            color: sigC(a.sig),
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {a.sig}
                        </span>
                        <span style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                        <span
                          style={{
                            marginLeft: "auto",
                            fontSize: 11,
                            fontWeight: 700,
                            color: sigC(a.sig),
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {a.amt}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MCard>

            {/* Sector Performance Index */}
            <MCard icon={Activity} title="Sector Performance Index" badge="8-Month" defaultOpen={false}>
              <div style={{ padding: "12px 14px 6px" }}>
                <div style={{ display: "flex", gap: 14, marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: M.tealBright }} />
                    <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>Actual</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(184,217,53,0.35)" }} />
                    <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>AI Projection</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 70 }}>
                  {["A", "S", "O", "N", "D", "J", "F", "M"].map((mo, i) => {
                    const h = 25 + i * 8 + Math.random() * 15;
                    const isProj = i >= 5;
                    return (
                      <div
                        key={mo}
                        style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}
                      >
                        <div
                          style={{
                            width: "100%",
                            background: isProj ? "rgba(184,217,53,0.25)" : M.tealBright,
                            borderRadius: "3px 3px 0 0",
                            height: `${h}px`,
                            border: isProj ? `1px dashed rgba(184,217,53,0.4)` : "none",
                          }}
                        />
                        <span style={{ fontSize: 8, color: M.dim, fontFamily: "Inter,sans-serif" }}>{mo}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </MCard>

            {/* Volatility breakdown */}
            <MCard icon={SlidersHorizontal} title="Volatility vs Growth Rate" badge="Sub-sectors" defaultOpen={false}>
              <div style={{ padding: "6px 0 6px" }}>
                <div style={{ padding: "0 14px 8px", fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                  Risk-return profile · bubble size = market share
                </div>
                {s.subSectors.map((ss, i) => {
                  const growth = Math.floor(25 + Math.random() * 55);
                  const risk = Math.floor(10 + Math.random() * 70);
                  const abbr = ss.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();
                  const rCol = risk > 60 ? M.red : risk > 35 ? M.orange : M.green;
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 11,
                        padding: "10px 14px",
                        borderBottom: i < s.subSectors.length - 1 ? `1px solid ${M.divider}` : "none",
                      }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          background: "rgba(46,90,77,0.4)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ fontSize: 10, fontWeight: 700, color: M.white, fontFamily: "Inter,sans-serif" }}>
                          {abbr}
                        </span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: M.white }}>{ss.name}</div>
                        <div style={{ fontSize: 10, color: M.dim, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
                          Growth <span style={{ color: M.green, fontWeight: 700 }}>{growth}%</span>
                          {"  "}Risk <span style={{ color: rCol, fontWeight: 700 }}>{risk}%</span>
                        </div>
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
                        {ss.pct}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </MCard>
            <div style={{ height: 16 }} />
          </>
        )}

        {/* ─ DASHBOARD / COMPANIES ─ */}
        {dashSub === "companies" && (
          <>
            {/* Sector market overview — 3 stat chips */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 8 }}>
              {[
                { label: "Total Market Cap", val: `$${(s.capHigh * 0.9).toFixed(1)}B`, chg: "+4.2%", up: true },
                {
                  label: "Avg BRIDGE Score",
                  val: `${Math.round(companies.reduce((a, c) => a + c.sc, 0) / companies.length)}`,
                  chg: "+1.8pt",
                  up: true,
                },
                { label: "Active Players", val: `${companies.length}`, chg: "Tracked", up: null },
              ].map((m, i) => (
                <div
                  key={i}
                  style={{
                    background: M.card,
                    borderRadius: 12,
                    border: `1px solid ${M.cardBorder}`,
                    padding: "11px 10px",
                  }}
                >
                  <div style={{ fontSize: 16, fontWeight: 700, color: M.white, lineHeight: 1, marginBottom: 3 }}>
                    {m.val}
                  </div>
                  <div
                    style={{
                      fontSize: 8,
                      color: M.muted,
                      fontFamily: "Inter,sans-serif",
                      marginBottom: 5,
                      lineHeight: 1.3,
                    }}
                  >
                    {m.label}
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: m.up === null ? M.muted : m.up ? M.green : M.red,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {m.chg}
                  </div>
                </div>
              ))}
            </div>

            {/* Top Companies — expanded rows */}
            <MCard icon={User} title="Top Companies" badge={`${companies.length} active`} defaultOpen={true}>
              <div style={{ padding: "4px 0 4px" }}>
                {companies.map((co, i) => {
                  const sparkData = [40, 55, 48, 62, 58, 70, 65, co.sc];
                  const sparkMax = Math.max(...sparkData),
                    sparkMin = Math.min(...sparkData);
                  const pts = sparkData
                    .map((v, idx) => `${idx * (40 / 7)},${20 - ((v - sparkMin) / (sparkMax - sparkMin || 1)) * 18}`)
                    .join(" ");
                  return (
                    <div
                      key={i}
                      style={{
                        padding: "12px 14px",
                        borderBottom: i < companies.length - 1 ? `1px solid ${M.divider}` : "none",
                      }}
                    >
                      {/* Row 1: rank + name + value */}
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 11, marginBottom: 8 }}>
                        <div
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            background: "rgba(255,255,255,0.05)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                            fontSize: 11,
                            fontWeight: 800,
                            color: M.muted,
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {co.r}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: M.white,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {co.name}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                            <span style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif" }}>{co.tk}</span>
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                color: co.chg.startsWith("-") ? M.red : M.green,
                                fontFamily: "Inter,sans-serif",
                              }}
                            >
                              {co.chg}
                            </span>
                            <span style={{ fontSize: 9, color: M.dim }}>·</span>
                            <span style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif" }}>30d</span>
                          </div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div
                            style={{ fontSize: 14, fontWeight: 700, color: M.white, fontFamily: "Inter,sans-serif" }}
                          >
                            {co.val}
                          </div>
                          <div style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                            Valuation
                          </div>
                        </div>
                      </div>
                      {/* Row 2: score bar + sparkline */}
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                            <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                              BRIDGE Score
                            </span>
                            <span
                              style={{
                                fontSize: 9,
                                fontWeight: 700,
                                color: co.sc >= 80 ? M.green : co.sc >= 65 ? M.orange : M.red,
                                fontFamily: "Inter,sans-serif",
                              }}
                            >
                              {co.sc}
                            </span>
                          </div>
                          <div
                            style={{
                              height: 4,
                              background: "rgba(255,255,255,0.06)",
                              borderRadius: 2,
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                width: `${co.sc}%`,
                                height: "100%",
                                background: `linear-gradient(90deg,${M.teal},${co.sc >= 80 ? M.green : co.sc >= 65 ? M.orange : M.red})`,
                                borderRadius: 2,
                              }}
                            />
                          </div>
                        </div>
                        {/* Mini sparkline */}
                        <svg width="40" height="20" style={{ flexShrink: 0, opacity: 0.7 }}>
                          <polyline
                            points={pts}
                            fill="none"
                            stroke={co.chg.startsWith("-") ? M.red : M.tealBright}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>
            </MCard>

            {/* Market Share Breakdown */}
            <MCard
              icon={BarChart2}
              title="Market Share Breakdown"
              badge={`${s.subSectors.length} segments`}
              defaultOpen={true}
            >
              <div style={{ padding: "12px 14px" }}>
                {/* Stacked bar */}
                <div
                  style={{ height: 10, borderRadius: 6, overflow: "hidden", display: "flex", marginBottom: 14, gap: 1 }}
                >
                  {s.subSectors.map((ss, i) => (
                    <div
                      key={i}
                      style={{
                        flex: ss.pct,
                        background: ss.color,
                        borderRadius: i === 0 ? "6px 0 0 6px" : i === s.subSectors.length - 1 ? "0 6px 6px 0" : "0",
                      }}
                    />
                  ))}
                </div>
                {s.subSectors.map((ss, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: ss.color, flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>
                      {ss.name}
                    </span>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: M.accent, fontFamily: "Inter,sans-serif" }}>
                        {ss.pct}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </MCard>

            {/* Momentum Watch — movers */}
            <MCard icon={TrendingUp} title="Momentum Watch" badge="30 days" defaultOpen={true}>
              <div style={{ padding: "10px 14px" }}>
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: M.muted,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    fontFamily: "Inter,sans-serif",
                    marginBottom: 10,
                  }}
                >
                  Top Movers
                </div>
                {[...companies]
                  .sort((a, b) => parseFloat(b.chg) - parseFloat(a.chg))
                  .slice(0, 3)
                  .map((co, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "8px 0",
                        borderBottom: i < 2 ? `1px solid ${M.divider}` : "none",
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 7,
                          background: co.chg.startsWith("-") ? "rgba(248,113,113,0.1)" : "rgba(74,222,128,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {co.chg.startsWith("-") ? (
                          <TrendingDown size={13} color={M.red} />
                        ) : (
                          <TrendingUp size={13} color={M.green} />
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: M.white,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {co.name}
                        </div>
                        <div style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                          {co.tk} · Score {co.sc}
                        </div>
                      </div>
                      <div
                        style={{
                          padding: "4px 10px",
                          borderRadius: 20,
                          background: co.chg.startsWith("-") ? "rgba(248,113,113,0.12)" : "rgba(74,222,128,0.12)",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: co.chg.startsWith("-") ? M.red : M.green,
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {co.chg}
                        </span>
                      </div>
                    </div>
                  ))}
                <div style={{ height: "1px", background: M.divider, margin: "10px 0" }} />
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: M.muted,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    fontFamily: "Inter,sans-serif",
                    marginBottom: 10,
                  }}
                >
                  Laggards
                </div>
                {[...companies]
                  .sort((a, b) => parseFloat(a.chg) - parseFloat(b.chg))
                  .slice(0, 2)
                  .map((co, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "8px 0",
                        borderBottom: i < 1 ? `1px solid ${M.divider}` : "none",
                      }}
                    >
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 7,
                          background: "rgba(248,113,113,0.1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <TrendingDown size={13} color={M.red} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: M.white,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {co.name}
                        </div>
                        <div style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                          {co.tk} · Score {co.sc}
                        </div>
                      </div>
                      <div style={{ padding: "4px 10px", borderRadius: 20, background: "rgba(248,113,113,0.12)" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: M.red, fontFamily: "Inter,sans-serif" }}>
                          {co.chg}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </MCard>

            {/* BRIDGE Score Distribution */}
            <MCard icon={Target} title="Score Distribution" badge="All tracked" defaultOpen={false}>
              <div style={{ padding: "12px 14px" }}>
                {[
                  { range: "80–100", label: "Strong", col: M.green, count: companies.filter((c) => c.sc >= 80).length },
                  {
                    range: "65–79",
                    label: "Moderate",
                    col: M.orange,
                    count: companies.filter((c) => c.sc >= 65 && c.sc < 80).length,
                  },
                  { range: "<65", label: "Watch", col: M.red, count: companies.filter((c) => c.sc < 65).length },
                ].map((band, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        background: `rgba(${band.col === "#4ADE80" ? "74,222,128" : band.col === "#F59E0B" ? "245,158,11" : "248,113,113"},0.1)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ fontSize: 11, fontWeight: 700, color: band.col, fontFamily: "Inter,sans-serif" }}>
                        {band.count}
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 12, fontWeight: 600, color: M.white }}>{band.label}</span>
                        <span style={{ fontSize: 10, color: M.dim, fontFamily: "Inter,sans-serif" }}>{band.range}</span>
                      </div>
                      <div
                        style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}
                      >
                        <div
                          style={{
                            width: `${(band.count / companies.length) * 100}%`,
                            height: "100%",
                            background: band.col,
                            borderRadius: 2,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </MCard>

            <div style={{ height: 16 }} />
          </>
        )}

        {/* ─ DASHBOARD / ANALYTICS ─ */}
        {dashSub === "analytics" && (
          <>
            {/* ── KPI STRIP ── */}
            <div style={{ padding: "12px 14px 0" }}>
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
                Key Metrics
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                {[
                  { l: "Avg IRR (Tier I)", v: `${s.irrHigh}%`, sub: "projected", chg: "+2.1pp", up: true },
                  {
                    l: "Capital Deployed",
                    v: `$${Math.round(s.capLow * 0.6)}M`,
                    sub: "of target",
                    chg: "+18%",
                    up: true,
                  },
                  {
                    l: "Active Ventures",
                    v: `${s.totalV}`,
                    sub: "identified",
                    chg: `${s.t1?.length} Tier I`,
                    up: true,
                  },
                  {
                    l: "BRIDGE Score",
                    v: `${s.score}`,
                    sub: "/ 100",
                    chg: s.score >= 88 ? "Tier I Ready" : "Strong",
                    up: s.score >= 80,
                  },
                ].map((k, i) => (
                  <div
                    key={i}
                    style={{
                      background: M.card,
                      borderRadius: 12,
                      border: `1px solid ${M.cardBorder}`,
                      padding: "12px 12px 10px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 9,
                        color: M.muted,
                        fontFamily: "Inter,sans-serif",
                        marginBottom: 5,
                        letterSpacing: ".3px",
                      }}
                    >
                      {k.l}
                    </div>
                    <div
                      style={{ fontSize: 22, fontWeight: 800, color: M.white, lineHeight: 1, letterSpacing: "-0.5px" }}
                    >
                      {k.v}
                    </div>
                    <div
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 5 }}
                    >
                      <span style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif" }}>{k.sub}</span>
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          color: k.up ? M.green : M.orange,
                          fontFamily: "Inter,sans-serif",
                        }}
                      >
                        {k.chg}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── IRR PERFORMANCE TREND ── */}
            <MCard icon={TrendingUp} title="IRR Performance" badge="12-Month" badgeLime={true} defaultOpen={true}>
              <div style={{ padding: "10px 14px 6px" }}>
                {/* Sparkline area */}
                <div style={{ position: "relative", height: 72, marginBottom: 6 }}>
                  <svg width="100%" height="72" viewBox="0 0 280 72" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="irrGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#B8D935" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#B8D935" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {(() => {
                      const pts = [42, 45, 43, 48, 47, 52, 50, 55, 58, 54, 60, s.irrHigh];
                      const max = Math.max(...pts) + 4,
                        min = Math.min(...pts) - 4;
                      const x = (i) => i * (280 / 11);
                      const y = (v) => 72 - ((v - min) / (max - min)) * 68;
                      const line = pts.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`).join(" ");
                      const area = `${line} L${x(11)},72 L${x(0)},72 Z`;
                      return (
                        <>
                          <path d={area} fill="url(#irrGrad)" />
                          <path
                            d={line}
                            stroke="#B8D935"
                            strokeWidth="1.8"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx={x(11)} cy={y(s.irrHigh)} r="3.5" fill="#B8D935" />
                        </>
                      );
                    })()}
                  </svg>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                  {["Apr", "Jun", "Aug", "Oct", "Dec", "Mar"].map((m) => (
                    <span key={m} style={{ fontSize: 9, color: M.dim, fontFamily: "Inter,sans-serif" }}>
                      {m}
                    </span>
                  ))}
                </div>
                {/* Tier breakdown bars */}
                {[
                  { l: "Tier I Average", v: s.irrHigh, max: 30, col: M.accent },
                  { l: "Tier II Average", v: Math.round(s.irrHigh * 0.78), max: 30, col: M.tealBright },
                  { l: "Tier III Average", v: Math.round(s.irrHigh * 0.62), max: 30, col: "rgba(46,90,77,0.6)" },
                ].map((row, i) => (
                  <div key={i} style={{ marginBottom: 9 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>{row.l}</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: M.white, fontFamily: "Inter,sans-serif" }}>
                        {row.v}%
                      </span>
                    </div>
                    <div
                      style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}
                    >
                      <div
                        style={{
                          width: `${(row.v / row.max) * 100}%`,
                          height: "100%",
                          background: row.col,
                          borderRadius: 2,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </MCard>

            {/* ── CAPITAL DEPLOYMENT ── */}
            <MCard icon={BarChart2} title="Capital Deployment" badge="Pipeline" defaultOpen={true}>
              <div style={{ padding: "10px 14px" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 14 }}>
                  <span style={{ fontSize: 24, fontWeight: 800, color: M.white, letterSpacing: "-0.5px" }}>
                    ${Math.round(((s.capLow + s.capHigh) / 2) * 0.52)}M
                  </span>
                  <span style={{ fontSize: 11, color: M.muted, fontFamily: "Inter,sans-serif" }}>
                    of ${Math.round((s.capLow + s.capHigh) / 2)}M target
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: M.green,
                      fontFamily: "Inter,sans-serif",
                      marginLeft: "auto",
                    }}
                  >
                    52% filled
                  </span>
                </div>
                {/* Stacked progress */}
                <div
                  style={{ height: 10, borderRadius: 5, overflow: "hidden", display: "flex", marginBottom: 14, gap: 1 }}
                >
                  <div style={{ flex: 32, background: M.accent }} />
                  <div style={{ flex: 20, background: M.tealBright }} />
                  <div style={{ flex: 0, background: "rgba(46,90,77,0.4)" }} />
                  <div style={{ flex: 48, background: "rgba(255,255,255,0.06)" }} />
                </div>
                {s.pipeline.map((p, i) => (
                  <div key={i} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: M.white,
                          flex: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {p.label}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 700,
                          color: i < 2 ? M.accent : M.tealBright,
                          fontFamily: "Inter,sans-serif",
                          flexShrink: 0,
                          marginLeft: 8,
                        }}
                      >
                        {p.current} / {p.target}
                      </span>
                    </div>
                    <div
                      style={{ height: 5, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}
                    >
                      <div
                        style={{
                          width: `${p.pct}%`,
                          height: "100%",
                          background: i < 2 ? M.accent : M.tealBright,
                          borderRadius: 3,
                        }}
                      />
                    </div>
                    <div style={{ fontSize: 9, color: M.dim, marginTop: 2, fontFamily: "Inter,sans-serif" }}>
                      {p.months}mo remaining · {p.pct}% funded
                    </div>
                  </div>
                ))}
              </div>
            </MCard>

            {/* ── SECTOR SCORE VS AVERAGE ── */}
            <MCard icon={BarChart3} title="Sector Benchmarking" badge="All 12" defaultOpen={false}>
              <div style={{ padding: "10px 14px" }}>
                <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif", marginBottom: 12 }}>
                  BRIDGE Score vs. portfolio average (81)
                </div>
                {SECTORS.slice(0, 6).map((sec, i) => {
                  const act = sec.id === s.id;
                  return (
                    <div key={i} style={{ marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: act ? 700 : 400,
                            color: act ? M.accent : M.muted,
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {sec.short}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: act ? M.accent : M.white,
                            fontFamily: "Inter,sans-serif",
                          }}
                        >
                          {sec.score}
                        </span>
                      </div>
                      <div
                        style={{
                          height: 4,
                          background: "rgba(255,255,255,0.06)",
                          borderRadius: 2,
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            width: `${sec.score}%`,
                            height: "100%",
                            background: act ? M.accent : "rgba(46,90,77,0.55)",
                            borderRadius: 2,
                          }}
                        />
                        {/* avg line */}
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            left: "81%",
                            width: 1,
                            height: "100%",
                            background: "rgba(255,255,255,0.25)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </MCard>

            {/* ── ACTIVITY HEATMAP ── */}
            <MCard icon={LayoutGrid} title="Activity Heatmap" badge="7 Days" defaultOpen={false}>
              <Heatmap />
            </MCard>

            <div style={{ height: 16 }} />
          </>
        )}
      </div>

      {/* ═══ BOTTOM NAV — 5 sections ═══ */}
      {/* ═══ BOTTOM NAV — 5 sections ═══ */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#080E09",
          borderTop: `1px solid ${M.divider}`,
          display: "flex",
          alignItems: "stretch",
          zIndex: 100,
          paddingBottom: "env(safe-area-inset-bottom)",
          height: "calc(56px + env(safe-area-inset-bottom))",
        }}
      >
        {[
          {
            id: "overview",
            label: "Overview",
            svg: (c) => (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={c}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
              </svg>
            ),
          },
          {
            id: "ventures",
            label: "Ventures",
            svg: (c) => (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={c}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            ),
          },
          {
            id: "signals",
            label: "Signals",
            svg: (c) => (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={c}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                <circle cx="12" cy="20" r="1" fill={c} />
              </svg>
            ),
          },
          {
            id: "companies",
            label: "Companies",
            svg: (c) => (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={c}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                <line x1="12" y1="12" x2="12" y2="16" />
                <line x1="10" y1="14" x2="14" y2="14" />
              </svg>
            ),
          },
          {
            id: "analytics",
            label: "Analytics",
            svg: (c) => (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke={c}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            ),
          },
        ].map((n) => {
          const act = dashSub === n.id;
          const col = act ? M.accent : "rgba(255,255,255,0.28)";
          return (
            <button
              key={n.id}
              onClick={() => setDashSub(n.id)}
              onPointerDown={() => setPressedTab(n.id)}
              onPointerUp={() => setTimeout(() => setPressedTab(null), 120)}
              onPointerLeave={() => setTimeout(() => setPressedTab(null), 120)}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 3,
                background: "none",
                border: "none",
                cursor: "pointer",
                position: "relative",
                padding: 0,
                transform: pressedTab === n.id ? "scale(0.82)" : "scale(1)",
                transition: "transform 0.12s cubic-bezier(0.36,0.07,0.19,0.97)",
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
                    borderRadius: "0 0 2px 2px",
                    background: M.accent,
                  }}
                />
              )}
              {n.svg(col)}
              <span
                style={{
                  fontSize: 9,
                  fontWeight: act ? 700 : 400,
                  color: col,
                  fontFamily: "Inter,sans-serif",
                  letterSpacing: ".3px",
                  transition: "all .15s",
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
