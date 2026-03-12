import React from "react";

export interface ChartTipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export const ChartTip = ({ active, payload, label }: ChartTipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#111827",
        color: "#fff",
        borderRadius: 8,
        padding: "8px 12px",
        fontSize: 11,
        fontFamily: "Inter,sans-serif",
      }}
    >
      <div style={{ color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 7, height: 7, borderRadius: 2, background: p.stroke || p.fill }} />
          <span>
            {p.name}: <strong>{p.value}</strong>
          </span>
        </div>
      ))}
    </div>
  );
};
