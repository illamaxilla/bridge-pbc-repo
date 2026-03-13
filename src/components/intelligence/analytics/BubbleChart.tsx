import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { C } from "../constants";
import { Card } from "../Card";
import { Sector } from "../sectorData";

interface BubbleChartProps {
  s: Sector;
}

export function BubbleChart({ s }) {
  const [hov, setHov] = useState(null);
  const hexToRgba = (hex, a) => {
    const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${a})`;
  };
  const alphas = [1, 0.78, 0.55, 0.38, 0.2];
  const xPositions = [0.12, 0.32, 0.52, 0.72, 0.9];
  const data = s.subSectors.map((ss, i) => ({
    x: xPositions[i],
    y: Math.round(ss.pct * 1.4 + 18),
    r: Math.max(22, Math.round(ss.pct * 3.0)),
    name: ss.name,
    abbr: ss.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 3),
    color: hexToRgba(s.color, alphas[i] || 0.2),
    pct: ss.pct,
    id: i,
  }));
  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    if (!cx || !cy) return null;
    const isHov = hov === payload.id;
    const r = isHov ? payload.r * 1.18 : payload.r;
    return (
      <g onMouseEnter={() => setHov(payload.id)} onMouseLeave={() => setHov(null)} style={{ cursor: "pointer" }}>
        <circle cx={cx} cy={cy} r={r} fill={payload.color} fillOpacity={0.78} stroke="#fff" strokeWidth={2.5} />
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          fontSize={10}
          fill="#fff"
          fontWeight={700}
          fontFamily="Inter,sans-serif"
        >
          {payload.abbr}
        </text>
      </g>
    );
  };
  const CustomTip = ({ active, payload }: { active?: any; payload?: any }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0]?.payload;
    return (
      <div
        style={{
          background: "#111827",
          color: "#fff",
          borderRadius: 9,
          padding: "10px 14px",
          fontSize: 11,
          fontFamily: "Inter,sans-serif",
        }}
      >
        <div style={{ fontWeight: 700, color: C.accent, marginBottom: 6 }}>{d?.name}</div>
        <div style={{ color: "rgba(255,255,255,0.6)", marginBottom: 3 }}>
          Growth: <span style={{ color: "#fff", fontWeight: 600 }}>{d?.y}%</span>
        </div>
        <div style={{ color: "rgba(255,255,255,0.6)" }}>
          Market Share: <span style={{ color: "#fff", fontWeight: 600 }}>{d?.pct}%</span>
        </div>
      </div>
    );
  };
  return (
    <Card style={{ padding: "14px 16px", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Volatility vs Growth Rate</div>
          <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
            Risk-return profile by sub-sector
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
          }}
        >
          <MoreHorizontal size={12} color={C.muted} />
        </button>
      </div>
      <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
        <div
          style={{
            position: "absolute",
            top: "6%",
            left: "5%",
            fontSize: 10,
            color: C.muted,
            opacity: 0.4,
            fontWeight: 600,
            pointerEvents: "none",
            fontFamily: "Inter,sans-serif",
          }}
        >
          High Growth · Low Risk
        </div>
        <div
          style={{
            position: "absolute",
            top: "6%",
            right: "4%",
            fontSize: 10,
            color: C.muted,
            opacity: 0.4,
            fontWeight: 600,
            pointerEvents: "none",
            fontFamily: "Inter,sans-serif",
            textAlign: "right",
          }}
        >
          High Growth · High Risk
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "12%",
            left: "5%",
            fontSize: 10,
            color: C.muted,
            opacity: 0.4,
            fontWeight: 600,
            pointerEvents: "none",
            fontFamily: "Inter,sans-serif",
          }}
        >
          Low Growth · Low Risk
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "12%",
            right: "4%",
            fontSize: 10,
            color: C.muted,
            opacity: 0.4,
            fontWeight: 600,
            pointerEvents: "none",
            fontFamily: "Inter,sans-serif",
            textAlign: "right",
          }}
        >
          Low Growth · High Risk
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 20, bottom: 30, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis
              dataKey="x"
              type="number"
              domain={[0, 1.05]}
              tick={{ fontSize: 9, fill: C.muted, fontFamily: "Inter,sans-serif" }}
              tickCount={6}
              axisLine={false}
              tickLine={false}
              label={{
                value: "← Lower Risk  ·  Higher Risk →",
                position: "insideBottom",
                offset: -18,
                fontSize: 9,
                fill: C.muted,
                fontFamily: "Inter,sans-serif",
              }}
            />
            <YAxis
              dataKey="y"
              type="number"
              domain={[0, 85]}
              tick={{ fontSize: 9, fill: C.muted, fontFamily: "Inter,sans-serif" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTip />} cursor={{ stroke: "transparent" }} />
            <Scatter data={data} shape={<CustomDot />} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          paddingTop: 8,
          borderTop: "1px solid #F3F4F6",
          flexShrink: 0,
        }}
      >
        {s.subSectors.map((ss, i) => {
          const a = [1, 0.78, 0.55, 0.38, 0.2][i] || 0.2;
          const r2 = parseInt(s.color.slice(1, 3), 16),
            g2 = parseInt(s.color.slice(3, 5), 16),
            b2 = parseInt(s.color.slice(5, 7), 16);
          const col = `rgba(${r2},${g2},${b2},${a})`;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: col }} />
              <span style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>{ss.name}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
