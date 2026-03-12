import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { C } from "../constants";
import { Card } from "../Card";
import { Sector } from "../sectorData";

interface EngagementMetricsProps {
  s: Sector;
}

export function EngagementMetrics({ s }) {
  const [hovBar, setHovBar] = useState(null);
  const bars = Array.from({ length: 30 }, (_, i) =>
    Math.max(8, Math.round(40 + Math.sin(i * 0.9 + s.score * 0.04) * 28 + Math.sin(i * 2.1) * 12)),
  );
  const maxB = Math.max(...bars);
  const anomalies = [6, 13, 22];
  const stats = [
    { v: Math.round(s.activity.length * 241 + s.score * 8), l: "Active Signals", d: "avg / week", badge: "+56%" },
    { v: Math.round(s.score * 13 + 240), l: "Conversion Rate", d: "signal → action", badge: "+43%" },
    { v: Math.round(s.score * 112 + 1800), l: "Signal Duration", d: "avg hours active", badge: "+28%" },
  ];
  return (
    <Card style={{ padding: "16px 18px", height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
          flexShrink: 0,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Sector Engagement Metrics</div>
        <button
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            border: "1px solid #E5E7EB",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <MoreHorizontal size={12} color={C.muted} />
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16, flexShrink: 0 }}>
        {stats.map((st, i) => (
          <div key={i}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
              <span style={{ fontSize: 19, fontWeight: 800, color: C.dark, letterSpacing: "-1px", lineHeight: 1 }}>
                {st.v.toLocaleString()}
              </span>
              <span style={{ fontSize: 10, fontWeight: 700, color: C.green, fontFamily: "Inter,sans-serif" }}>
                {st.badge}
              </span>
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, color: C.dark, fontFamily: "Inter,sans-serif" }}>{st.l}</div>
            <div style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>{st.d}</div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 2, padding: "0 2px" }}>
          {bars.map((b, i) => {
            const isAnom = anomalies.includes(i);
            const isHov = hovBar === i;
            const [rr, gg, bb] = [
              parseInt(s.color.slice(1, 3), 16),
              parseInt(s.color.slice(3, 5), 16),
              parseInt(s.color.slice(5, 7), 16),
            ];
            const anomColor = `rgba(${rr},${gg},${bb},0.9)`;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovBar(i)}
                onMouseLeave={() => setHovBar(null)}
                style={{
                  flex: 1,
                  borderRadius: "2px 2px 0 0",
                  background: isAnom ? anomColor : isHov ? s.color : `${s.color}55`,
                  height: `${(b / maxB) * 100}%`,
                  minHeight: 3,
                  transition: "all .15s",
                  cursor: "pointer",
                }}
              />
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 4,
            borderTop: "1px solid #F3F4F6",
            marginTop: 4,
          }}
        >
          {["Feb 5", "Feb 10", "Feb 15", "Feb 20", "Feb 25", "Mar 1"].map((d) => (
            <span key={d} style={{ fontSize: 8, color: C.muted, fontFamily: "Inter,sans-serif" }}>
              {d}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
