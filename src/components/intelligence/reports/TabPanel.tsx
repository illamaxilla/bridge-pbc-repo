import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { C, SECTORS, type Sector } from "./constants";
import { Card } from "./Card";

export interface TabPanelProps {
  s: Sector;
  tab: string;
}

function TabPanel({ s, tab }) {
  if (["sector-performance", "market-analysis", "growth-tracking", "signal-tracker"].includes(tab)) return null;
  if (tab === "sub-sector-breakdown")
    return (
      <Card style={{ padding: "14px 16px", marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 12 }}>Sub-sector Distribution</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 10 }}>
          {s.subSectors.map((ss, i) => (
            <div
              key={i}
              style={{
                padding: "16px 14px 14px",
                background: "#FAFAFA",
                borderRadius: 12,
                border: "1px solid #EFEFEF",
                textAlign: "center",
                cursor: "pointer",
                transition: "box-shadow 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              <div style={{ width: "100%", height: 4, borderRadius: 2, background: ss.color, marginBottom: 12 }} />
              <div style={{ fontSize: 22, fontWeight: 800, color: C.dark, letterSpacing: "-0.5px", lineHeight: 1 }}>
                {ss.pct}%
              </div>
              <div
                style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 5, marginBottom: 8 }}
              >
                {ss.name}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3 }}>
                <TrendingUp size={9} color={C.green} />
                <span style={{ fontSize: 9, fontWeight: 700, color: C.green, fontFamily: "Inter,sans-serif" }}>
                  +{Math.round(ss.pct * 0.12)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  if (tab === "financials")
    return (
      <Card style={{ padding: 0, marginBottom: 12 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
          {[
            { l: "Total Revenue", v: `$${s.capHigh}M`, chg: "+15.2%", col: C.green },
            { l: "Total Expenses", v: `$${Math.round(s.capLow * 0.4)}M`, chg: "+2.1%", col: "#F59E0B" },
            { l: "Net Income", v: `$${s.capHigh - Math.round(s.capLow * 0.4)}M`, chg: "+18.4%", col: C.green },
          ].map((item, i) => (
            <div key={i} style={{ padding: "22px 24px", borderRight: i < 2 ? "1px solid #F3F4F6" : "none" }}>
              <div
                style={{
                  fontSize: 10,
                  color: C.muted,
                  fontFamily: "Inter,sans-serif",
                  marginBottom: 8,
                  letterSpacing: "0.3px",
                }}
              >
                {item.l}
              </div>
              <div
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: C.dark,
                  letterSpacing: "-1.5px",
                  lineHeight: 1,
                  marginBottom: 10,
                }}
              >
                {item.v}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <TrendingUp size={12} color={item.col} />
                <span style={{ fontSize: 11, fontWeight: 700, color: item.col, fontFamily: "Inter,sans-serif" }}>
                  {item.chg} MoM
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  if (tab === "comparative-analysis") {
    const ranked = [...SECTORS].sort((a, b) => b.score - a.score);
    return (
      <Card style={{ padding: "14px 16px", marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 12 }}>
          All Sectors - BRIDGE Score Ranking
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {ranked.map((sec, i) => {
            const act = sec.id === s.id;
            return (
              <div key={sec.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: act ? C.accent : C.muted,
                    fontFamily: "Inter,sans-serif",
                    width: 16,
                    textAlign: "right",
                  }}
                >
                  {i + 1}
                </span>
                {sec.svgIcon(act ? C.primary : C.muted, 11)}
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: act ? 700 : 400,
                    color: act ? C.dark : C.mid,
                    fontFamily: "Inter,sans-serif",
                    width: 130,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {sec.short}
                </span>
                <div style={{ flex: 1, height: 6, background: "#F3F4F6", borderRadius: 3, overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${sec.score}%`,
                      height: "100%",
                      background: act ? C.accent : C.line,
                      borderRadius: 3,
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: act ? C.accent : C.muted,
                    fontFamily: "Inter,sans-serif",
                    width: 28,
                    textAlign: "right",
                  }}
                >
                  {sec.score}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    );
  }
  if (tab === "monthly-summary") {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return (
      <Card style={{ padding: "14px 16px", marginBottom: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 12 }}>
          Monthly Performance Grid 2025/2026
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8 }}>
          {months.map((m, i) => {
            const val = Math.round(s.score * (0.85 + Math.sin(i * 0.9 + s.score * 0.03) * 0.12 + i * 0.01));
            const up = val >= s.score,
              cur = m === "Jan";
            return (
              <div
                key={m}
                style={{
                  padding: "12px 14px",
                  background: cur ? "#EBF5B0" : "#F9FAFB",
                  borderRadius: 10,
                  border: `1px solid ${cur ? C.accent + "55" : "#EDEDED"}`,
                  cursor: "pointer",
                  transition: "box-shadow 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 3px 12px rgba(0,0,0,0.06)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: cur ? C.primary : "#9CA3AF",
                    fontFamily: "Inter,sans-serif",
                    marginBottom: 5,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {m}
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: C.dark, lineHeight: 1, letterSpacing: "-0.5px" }}>
                  {val}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 2, marginTop: 5 }}>
                  {up ? <TrendingUp size={9} color={C.green} /> : <TrendingDown size={9} color={C.red} />}
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 600,
                      color: up ? C.green : C.red,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {up ? `+${val - s.score}` : `${val - s.score}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    );
  }
  return null;
}

export { TabPanel };
