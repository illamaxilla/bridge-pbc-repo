import { useState } from "react";
import { C } from "../constants";
import { Card } from "../Card";
import { Sector } from "../sectorData";

interface DotMatrixChartProps {
  s: Sector;
}

export function DotMatrixChart({ s }) {
  const [hovered, setHovered] = useState(null);
  const [grouping, setGrouping] = useState("Monthly");
  const MONTHS = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  const DOT = 12,
    GAP = 3,
    STEP = DOT + GAP,
    ROWS = 14,
    PAD_L = 36,
    PAD_B = 22,
    PAD_T = 10,
    COL = 52;
  const data = MONTHS.map((m, i) => {
    const actual = Math.min(
      ROWS - 1,
      Math.round(ROWS * 0.35 + Math.sin(i * 0.85 + s.score * 0.05) * ROWS * 0.18 + i * 0.5),
    );
    const insight = Math.min(ROWS, actual + Math.round(1 + Math.sin(i * 1.3 + s.score * 0.03) * 2));
    return {
      month: m,
      actual,
      insight,
      actualVal: Math.round(actual * 4800 + s.capLow * 1000),
      insightVal: Math.round(insight * 4800 + s.capLow * 1000),
    };
  });
  const svgH = ROWS * STEP + PAD_T + PAD_B;
  const chartH = ROWS * STEP;
  return (
    <Card style={{ padding: "14px", height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
          flexShrink: 0,
        }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Sector Performance Index</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
              <span style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>Actual</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: `${s.color}55`,
                  border: `1px solid ${s.color}88`,
                }}
              />
              <span style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>AI Projection</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 2, background: "#F3F4F6", borderRadius: 6, padding: 2 }}>
          {["Monthly", "Weekly"].map((g) => (
            <button
              key={g}
              onClick={() => setGrouping(g)}
              style={{
                padding: "3px 7px",
                borderRadius: 4,
                border: "none",
                background: grouping === g ? "#fff" : "transparent",
                fontSize: 9,
                fontWeight: 600,
                color: grouping === g ? C.primary : C.muted,
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
              }}
            >
              {g}
            </button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, position: "relative", minHeight: 0 }}>
        <svg
          width="100%"
          height={svgH}
          viewBox={`0 0 ${PAD_L + MONTHS.length * COL} ${svgH}`}
          style={{ overflow: "visible" }}
        >
          {[0, 4, 8, 12].map((row) => (
            <text
              key={row}
              x={PAD_L - 5}
              y={PAD_T + chartH - row * STEP + DOT / 2}
              textAnchor="end"
              fontSize={8}
              fill={C.muted}
              fontFamily="Inter,sans-serif"
              dominantBaseline="middle"
            >
              {Math.round(row * 4.8)}K
            </text>
          ))}
          {data.map((d, col) => {
            const cx = PAD_L + col * COL + COL / 2;
            const isHov = hovered === col;
            return (
              <g
                key={col}
                onMouseEnter={() => setHovered(col)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                {isHov && (
                  <line
                    x1={cx}
                    y1={PAD_T}
                    x2={cx}
                    y2={PAD_T + chartH}
                    stroke={s.color}
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    strokeOpacity={0.35}
                  />
                )}
                {Array.from({ length: d.insight }, (_, row) => {
                  const cy = PAD_T + chartH - row * STEP - DOT / 2;
                  const isActual = row < d.actual;
                  return (
                    <circle
                      key={row}
                      cx={cx}
                      cy={cy}
                      r={DOT / 2}
                      fill={isActual ? s.color : `${s.color}40`}
                      stroke={isActual ? "none" : `${s.color}55`}
                      strokeWidth={0.5}
                      opacity={isHov ? 1 : 0.9}
                    />
                  );
                })}
                <text
                  x={cx}
                  y={PAD_T + chartH + 14}
                  textAnchor="middle"
                  fontSize={9}
                  fill={isHov ? C.primary : C.muted}
                  fontFamily="Inter,sans-serif"
                  fontWeight={isHov ? 700 : 400}
                >
                  {d.month}
                </text>
              </g>
            );
          })}
        </svg>
        {hovered !== null && (
          <div
            style={{
              position: "absolute",
              top: 6,
              left: `${(hovered / (MONTHS.length - 1)) * 72 + 6}%`,
              transform: "translateX(-50%)",
              background: "#111827",
              color: "#fff",
              borderRadius: 9,
              padding: "8px 12px",
              fontSize: 11,
              fontFamily: "Inter,sans-serif",
              zIndex: 10,
              pointerEvents: "none",
              minWidth: 120,
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 5, color: C.accent }}>{data[hovered]?.month}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: s.color }} />
              <span>
                Actual: <strong>{(data[hovered]?.actualVal / 1000).toFixed(1)}K</strong>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: `${s.color}66` }} />
              <span>
                Insight: <strong>{(data[hovered]?.insightVal / 1000).toFixed(1)}K</strong>
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
