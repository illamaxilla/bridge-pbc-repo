import {
  TrendingUp,
  Activity,
  BarChart2,
  SlidersHorizontal,
} from "lucide-react";
import { M, sigC } from "./constants";
import type { Sector } from "./constants";
import { MCard } from "./UIComponents";

export interface MobileDashSignalsProps {
  s: Sector;
}

export default function MobileDashSignals({ s }: MobileDashSignalsProps) {
  return (
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
  );
}
