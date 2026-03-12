import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { C, type Sector } from "./constants";
import { Card } from "./Card";

export interface DonutGoalCardProps {
  s: Sector;
}

function DonutGoalCard({ s }) {
  const totalCap = Math.round(((s.capLow + s.capHigh) / 2) * 10) / 10;
  const donutData = [
    { name: "Market Cap", value: s.subSectors[0]?.pct || 35, color: C.primary },
    { name: "Growth", value: s.subSectors[1]?.pct || 25, color: C.accent },
    { name: "Volatility", value: 100 - (s.subSectors[0]?.pct || 35) - (s.subSectors[1]?.pct || 25), color: "#E5E7EB" },
  ];
  const bullish = s.activity.filter((a) => a.sig === "Bullish").length;
  const goals = [
    { count: s.totalV, label: "Ventures Tracked", pct: Math.round((s.totalV / 20) * 100), color: C.primary },
    {
      count: s.activity.length * 18,
      label: "Active Signals",
      pct: Math.round((bullish / s.activity.length) * 100),
      color: C.accent,
    },
    { count: 12, label: "Sectors Covered", pct: 100, color: "#F59E0B" },
  ];
  return (
    <Card style={{ padding: 0, height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          padding: "12px 14px",
          borderBottom: "1px solid #F3F4F6",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Sector Value</div>
        <div style={{ display: "flex", gap: 2, background: "#F3F4F6", borderRadius: 7, padding: 2 }}>
          {["7D", "30D"].map((v, i) => (
            <button
              key={v}
              style={{
                padding: "2px 7px",
                borderRadius: 5,
                border: "none",
                background: i === 0 ? "#fff" : "transparent",
                fontSize: 9,
                fontWeight: 600,
                color: i === 0 ? C.primary : C.muted,
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: "12px 14px", display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{ position: "relative", width: 110, height: 110, flexShrink: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={30}
                outerRadius={50}
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
            <div style={{ fontSize: 12, fontWeight: 800, color: C.dark, lineHeight: 1 }}>${totalCap}M</div>
            <div style={{ fontSize: 8, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>Cap</div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 19, fontWeight: 800, color: C.dark, letterSpacing: "-1px", marginBottom: 8 }}>
            ${totalCap}M
          </div>
          {donutData.map((d, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: i < 2 ? 5 : 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: d.color }} />
                <span style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>{d.name}</span>
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: C.dark, fontFamily: "Inter,sans-serif" }}>
                {d.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, padding: "0 14px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ height: 1, background: "#F3F4F6", marginBottom: 2 }} />
        {goals.map((g, i) => (
          <div key={i}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.dark, letterSpacing: "-.5px", lineHeight: 1 }}>
                  {g.count}
                </div>
                <div style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                  {g.label}
                </div>
              </div>
              <span style={{ fontSize: 9, fontWeight: 700, color: g.color, fontFamily: "Inter,sans-serif" }}>
                {g.pct}% goal
              </span>
            </div>
            <div style={{ height: 5, background: "#F3F4F6", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: `${g.pct}%`, height: "100%", background: g.color, borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export { DonutGoalCard };
