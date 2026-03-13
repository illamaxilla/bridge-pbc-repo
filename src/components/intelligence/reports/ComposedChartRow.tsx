import React from "react";
import {
  Calendar,
} from "lucide-react";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
  ReferenceLine,
} from "recharts";
import { C, type Sector } from "./constants";
import { genMonthlyData } from "./utils";
import { Card } from "./Card";
import { ChartTip } from "./ChartTip";

export interface ComposedChartRowProps {
  s: Sector;
  overtimeView: boolean;
  setOvertimeView: (fn: (o: boolean) => boolean) => void;
}

function ComposedChartRow({ s, overtimeView, setOvertimeView }) {
  const data = genMonthlyData(s);
  const total = data.reduce((a, d) => a + d.growth, 0);
  const last = data[data.length - 1];
  return (
    <Card style={{ padding: 0 }}>
      <div style={{ display: "flex", height: 320 }}>
        <div style={{ flex: 1, padding: "16px 8px 16px 16px", display: "flex", flexDirection: "column", minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Capital Flow Analysis</div>
              <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
                Growth revenue · Operating costs · Net income · 6 months
              </div>
            </div>
            <button
              onClick={() => setOvertimeView((o) => !o)}
              style={{
                padding: "4px 10px",
                borderRadius: 7,
                border: `1px solid ${overtimeView ? C.accent : "#E5E7EB"}`,
                background: overtimeView ? C.accentBg : "#fff",
                fontSize: 10,
                fontWeight: 600,
                color: overtimeView ? C.primary : C.muted,
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
              }}
            >
              Overtime
            </button>
          </div>
          <div style={{ flex: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 9, fill: C.muted, fontFamily: "Inter,sans-serif" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 9, fill: C.muted }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => (overtimeView ? `${Math.round(v / 10)}%` : `$${v}`)}
                />
                <Tooltip content={<ChartTip />} />
                <ReferenceLine y={0} stroke="#E5E7EB" strokeDasharray="3 3" />
                <Bar
                  dataKey="growth"
                  fill={C.accent}
                  fillOpacity={0.9}
                  radius={[4, 4, 0, 0]}
                  name="Growth"
                  barSize={22}
                />
                <Bar
                  dataKey="expenses"
                  fill={C.teal}
                  fillOpacity={0.55}
                  radius={[4, 4, 0, 0]}
                  name="Expenses"
                  barSize={22}
                />
                <Line
                  type="monotone"
                  dataKey="net"
                  stroke="#F59E0B"
                  strokeWidth={2.5}
                  strokeDasharray="5 5"
                  dot={{ r: 3.5, fill: "#F59E0B", strokeWidth: 0 }}
                  name="Net Income"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div
          style={{
            width: 190,
            flexShrink: 0,
            borderLeft: "1px solid #F3F4F6",
            padding: "16px 16px",
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: C.muted,
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontFamily: "Inter,sans-serif",
                marginBottom: 5,
              }}
            >
              Total Capital
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: C.dark, letterSpacing: "-1.5px", lineHeight: 1 }}>
              ${total.toLocaleString()}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                marginTop: 4,
                fontSize: 9,
                color: C.muted,
                fontFamily: "Inter,sans-serif",
              }}
            >
              <Calendar size={9} color={C.muted} /> Aug 01 – Jan 31
            </div>
          </div>
          <div style={{ height: 1, background: "#F3F4F6", marginBottom: 14 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
            {[
              { color: C.accent, label: "Growth Revenue", v: `$${last.growth}` },
              { color: C.teal, label: "Operating Costs", v: `$${last.expenses}` },
              { color: "#F59E0B", label: "Net Income", v: `$${last.net}` },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: row.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: C.mid, fontFamily: "Inter,sans-serif" }}>{row.label}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.dark, fontFamily: "Inter,sans-serif" }}>
                  {row.v}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 14,
              padding: "12px 14px",
              background: "#F9FAFB",
              borderRadius: 10,
              border: "1px solid #F3F4F6",
            }}
          >
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: C.muted,
                fontFamily: "Inter,sans-serif",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                marginBottom: 4,
              }}
            >
              Net Margin
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: C.green, letterSpacing: "-1px", lineHeight: 1 }}>
              {Math.round((last.net / last.growth) * 100)}%
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export { ComposedChartRow };
