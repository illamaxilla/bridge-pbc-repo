import { ReactNode } from "react";
import { TrendingUp, MoreHorizontal } from "lucide-react";
import { C } from "../constants";
import { Card } from "../Card";
import { Sector } from "../sectorData";

interface SparkCardProps {
  label: string;
  value: string;
  sublabel: string;
  iconBg: string;
  iconEl: ReactNode;
  s: Sector;
  trend?: string;
  trendUp?: boolean;
}

export function SparkCard({ label, value, sublabel, iconBg, iconEl, s, trend = "+5.1%", trendUp = true }) {
  const bars = Array.from({ length: 10 }, (_, i) => Math.round(30 + Math.sin(i * 1.1 + s.score * 0.04) * 30 + i * 3));
  const maxB = Math.max(...bars);
  return (
    <Card style={{ padding: "18px", display: "flex", flexDirection: "column", gap: 14, height: "100%" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 11,
              background: iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `2px solid ${s.color}22`,
              flexShrink: 0,
            }}
          >
            {iconEl}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.dark }}>{label}</div>
            <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>{sublabel}</div>
          </div>
        </div>
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
            flexShrink: 0,
          }}
        >
          <MoreHorizontal size={12} color={C.muted} />
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 8 }}>
        <div>
          <div style={{ fontSize: 26, fontWeight: 800, color: C.dark, letterSpacing: "-1.5px", lineHeight: 1 }}>
            {value}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 5 }}>
            <TrendingUp size={11} color={trendUp ? C.green : C.red} />
            <span
              style={{
                fontSize: 11,
                color: trendUp ? C.green : C.red,
                fontFamily: "Inter,sans-serif",
                fontWeight: 600,
              }}
            >
              {trend} vs last period
            </span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 52, flexShrink: 0 }}>
          {bars.map((b, i) => (
            <div
              key={i}
              style={{
                width: 7,
                borderRadius: "3px 3px 0 0",
                background: i === bars.indexOf(maxB) ? s.color : `${s.color}33`,
                height: `${(b / maxB) * 100}%`,
                transition: "height .4s ease",
              }}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
