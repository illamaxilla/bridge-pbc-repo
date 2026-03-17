import {
  TrendingUp,
  BarChart2,
  BarChart3,
  LayoutGrid,
} from "lucide-react";
import { M } from "./constants";
import type { Sector } from "./constants";
import { SECTORS } from "./data";
import { MCard, Heatmap } from "./UIComponents";

export interface MobileDashAnalyticsProps {
  s: Sector;
}

export default function MobileDashAnalytics({ s }: MobileDashAnalyticsProps) {
  return (
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
                const x = (i: number) => i * (280 / 11);
                const y = (v: number) => 72 - ((v - min) / (max - min)) * 68;
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
  );
}
