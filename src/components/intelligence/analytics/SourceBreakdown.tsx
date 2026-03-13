import { MoreHorizontal } from "lucide-react";
import { C } from "../constants";
import { Card } from "../Card";
import { Sector } from "../sectorData";

interface SourceBreakdownProps {
  s: Sector;
}

export function SourceBreakdown({ s }) {
  const totalAct = s.activity.length || 1;
  const earnCnt = s.activity.filter((a) => a.cat === "Earnings" || a.cat === "Policy").length;
  const newsCnt = s.activity.filter((a) => a.cat === "Launch" || a.cat === "Market" || a.cat === "Finance").length;
  const analCnt = totalAct - earnCnt - newsCnt;
  const hexToRgba2 = (hex, a) => {
    const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${a})`;
  };
  const src1 = s.color;
  const src2 = hexToRgba2(s.color, 0.65);
  const src3 = hexToRgba2(s.color, 0.35);
  const sources = [
    {
      l: "Earnings Reports",
      v: Math.round((earnCnt / totalAct) * 100) || 48,
      count: Math.round(earnCnt * 2847 + 8000),
      color: src1,
    },
    {
      l: "News & Media",
      v: Math.round((newsCnt / totalAct) * 100) || 32,
      count: Math.round(newsCnt * 2100 + 5000),
      color: src2,
    },
    {
      l: "Analyst Ratings",
      v: Math.round((analCnt / totalAct) * 100) || 20,
      count: Math.round(analCnt * 1800 + 2000),
      color: src3,
    },
  ];
  const tot = sources.reduce((a, x) => a + x.v, 0);
  const normed = sources.map((x) => ({ ...x, v: Math.round((x.v / tot) * 100) }));
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
        <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Analytics by Signal Source</div>
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
      <div style={{ marginBottom: 14, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 28, fontWeight: 800, color: C.dark, letterSpacing: "-1.5px", lineHeight: 1 }}>
            {(normed.reduce((a, x) => a + x.count, 0) / 1000).toFixed(1)}K
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              padding: "2px 9px",
              borderRadius: 20,
              background: C.accentBg,
              color: C.primary,
              fontFamily: "Inter,sans-serif",
            }}
          >
            +180% ↑
          </span>
        </div>
        <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 3 }}>
          Total Signal Sources
        </div>
      </div>
      <div
        style={{
          height: 32,
          display: "flex",
          borderRadius: 8,
          overflow: "hidden",
          gap: 2,
          marginBottom: 14,
          flexShrink: 0,
        }}
      >
        {normed.map((src, i) => (
          <div
            key={i}
            style={{
              flex: src.v,
              background: src.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            title={src.l}
          >
            {src.v > 15 && (
              <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", fontFamily: "Inter,sans-serif" }}>
                {src.v}%
              </span>
            )}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
        {normed.map((src, i) => (
          <div key={i}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: src.color }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: C.dark, fontFamily: "Inter,sans-serif" }}>
                  {src.l}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: C.dark, fontFamily: "Inter,sans-serif" }}>
                  {src.count.toLocaleString()}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "1px 7px",
                    borderRadius: 20,
                    background: `${src.color}22`,
                    color: src.color,
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  {src.v}%
                </span>
              </div>
            </div>
            <div style={{ height: 5, background: "#F3F4F6", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${src.v}%`, background: src.color, borderRadius: 3 }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
