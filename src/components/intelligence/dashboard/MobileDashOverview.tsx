import {
  TrendingUp,
  ArrowUpRight,
  Clock,
  Target,
  Activity,
  BarChart3,
  LayoutDashboard,
  LayoutGrid,
  Globe,
} from "lucide-react";
import { M } from "./constants";
import type { Sector } from "./constants";
import { SECTORS } from "./data";
import { MCard, Heatmap } from "./UIComponents";

export interface MobileDashOverviewProps {
  s: Sector;
  setS: (s: Sector) => void;
  barData: number[];
  maxBar: number;
}

export default function MobileDashOverview({ s, setS, barData, maxBar }: MobileDashOverviewProps) {
  return (
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
  );
}
