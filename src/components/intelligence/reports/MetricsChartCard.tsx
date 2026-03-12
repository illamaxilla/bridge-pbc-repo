import React from "react";
import {
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  BarChart as RBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { C, type Sector } from "./constants";
import { genBarData, getTabMetrics, getTabStats } from "./utils";
import { Card } from "./Card";
import { ChartTip } from "./ChartTip";

export interface MetricsChartCardProps {
  s: Sector;
  tab: string;
  chartFilter: string;
  setChartFilter: (v: string) => void;
}

function MetricsChartCard({ s, tab, chartFilter, setChartFilter }) {
  const data = genBarData(s, tab, chartFilter);
  const metrics = getTabMetrics(s, tab);
  const stats = getTabStats(s, tab);
  return (
    <Card style={{ padding: 0, height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid #F3F4F6" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>
            {tab
              .split("-")
              .map((w) => w[0].toUpperCase() + w.slice(1))
              .join(" ")}
          </div>
          <div style={{ display: "flex", gap: 2, background: "#F3F4F6", borderRadius: 7, padding: 2 }}>
            {["7D", "30D", "90D"].map((v) => (
              <button
                key={v}
                onClick={() => setChartFilter(v)}
                style={{
                  padding: "3px 8px",
                  borderRadius: 5,
                  border: "none",
                  background: chartFilter === v ? "#fff" : "transparent",
                  fontSize: 10,
                  fontWeight: 600,
                  color: chartFilter === v ? C.primary : C.muted,
                  cursor: "pointer",
                  boxShadow: chartFilter === v ? "0 1px 3px rgba(0,0,0,0.07)" : "none",
                  fontFamily: "Inter,sans-serif",
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {[metrics.p, metrics.s].map((m, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {i > 0 && <div style={{ width: 1, height: 36, background: "#E5E7EB" }} />}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
                  <div
                    style={{ width: 8, height: 8, borderRadius: "50%", background: i === 0 ? C.accent : `${C.teal}88` }}
                  />
                  <span style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>{m.l}</span>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontSize: 24, fontWeight: 800, color: C.dark, letterSpacing: "-1px" }}>{m.v}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 2, padding: "2px 4px", borderRadius: 5 }}>
                    {m.up ? <TrendingUp size={9} color={C.green} /> : <TrendingDown size={9} color={C.red} />}
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: m.up ? C.green : C.red,
                        fontFamily: "Inter,sans-serif",
                      }}
                    >
                      {m.t}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 190, padding: "10px 8px 0", flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RBarChart
            data={data}
            barSize={26}
            barCategoryGap="30%"
            barGap={3}
            margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 9, fill: C.muted, fontFamily: "Inter,sans-serif" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 9, fill: C.muted }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTip />} />
            <Bar dataKey="primary" fill={C.accent} radius={[4, 4, 0, 0]} name="Primary" />
            <Bar dataKey="secondary" fill={`${C.teal}66`} radius={[4, 4, 0, 0]} name="Secondary" />
          </RBarChart>
        </ResponsiveContainer>
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderTop: "1px solid #F3F4F6", flexShrink: 0 }}
      >
        {stats.map((stat, i) => (
          <div key={i} style={{ padding: "12px 16px", borderRight: i < 3 ? "1px solid #F3F4F6" : "none" }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: C.dark, letterSpacing: "-.5px", lineHeight: 1 }}>
              {stat.v}
            </div>
            <div
              style={{
                fontSize: 9,
                color: C.muted,
                fontFamily: "Inter,sans-serif",
                marginTop: 3,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                letterSpacing: "0.3px",
              }}
            >
              {stat.l}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export { MetricsChartCard };
