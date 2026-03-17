import {
  TrendingUp,
  TrendingDown,
  BarChart2,
  Target,
  User,
} from "lucide-react";
import { M } from "./constants";
import type { Sector, Company } from "./constants";
import { MCard } from "./UIComponents";

export interface MobileDashCompaniesProps {
  s: Sector;
  companies: Company[];
}

export default function MobileDashCompanies({ s, companies }: MobileDashCompaniesProps) {
  return (
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
  );
}
