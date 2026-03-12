import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { C, heatVal, heatColor } from "../constants";
import { Card } from "../Card";
import { Sector } from "../sectorData";

interface ActivityHeatmapProps {
  s: Sector;
}

export function ActivityHeatmap({ s }) {
  const [hovCell, setHovCell] = useState(null);
  const [tooltip, setTooltip] = useState({ x: 0, y: 0 });
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const HOURS = ["00", "02", "04", "06", "08", "10", "12", "14", "16", "18", "20", "22"];
  return (
    <Card style={{ padding: "14px 16px", height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
          flexShrink: 0,
        }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Sector Activity Heatmap</div>
          <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
            Signal distribution by day & time
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
      <div style={{ display: "flex", marginLeft: 36, marginBottom: 3, flexShrink: 0 }}>
        {HOURS.map((h) => (
          <div
            key={h}
            style={{ flex: 1, fontSize: 8, color: C.muted, fontFamily: "Inter,sans-serif", textAlign: "center" }}
          >
            {h}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
        {DAYS.map((day, di) => (
          <div key={di} style={{ display: "flex", alignItems: "center", gap: 3, flex: 1 }}>
            <div
              style={{
                width: 30,
                fontSize: 9,
                color: C.muted,
                fontFamily: "Inter,sans-serif",
                textAlign: "right",
                flexShrink: 0,
              }}
            >
              {day}
            </div>
            {HOURS.map((h, hi) => {
              const val = heatVal(di, hi, s.score);
              const isHov = hovCell?.di === di && hovCell?.hi === hi;
              return (
                <div
                  key={hi}
                  onMouseEnter={(e) => {
                    setHovCell({ di, hi, val, day, h });
                    setTooltip({ x: e.clientX, y: e.clientY });
                  }}
                  onMouseLeave={() => setHovCell(null)}
                  style={{
                    flex: 1,
                    minHeight: 20,
                    borderRadius: 4,
                    background: heatColor(val, s.color),
                    border: isHov ? `1.5px solid ${s.color}` : "1.5px solid transparent",
                    transition: "all .15s",
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 10, flexShrink: 0 }}>
        <span style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>Activity:</span>
        {[
          ["Low", "#F3F4F6"],
          ["Mid", `${s.color}55`],
          ["High", `${s.color}99`],
          ["Peak", s.color],
        ].map(([l, bg]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 14, height: 10, borderRadius: 2, background: bg, border: "1px solid #E5E7EB" }} />
            <span style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>{l}</span>
          </div>
        ))}
      </div>
      {hovCell && (
        <div
          style={{
            position: "fixed",
            top: tooltip.y - 80,
            left: tooltip.x + 12,
            background: "#111827",
            color: "#fff",
            borderRadius: 9,
            padding: "9px 13px",
            fontSize: 11,
            fontFamily: "Inter,sans-serif",
            zIndex: 200,
            pointerEvents: "none",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ fontWeight: 700, color: C.accent, marginBottom: 4 }}>
            {hovCell.day} · {hovCell.h}:00
          </div>
          <div>
            Activity: <strong>{hovCell.val}</strong>/100
          </div>
        </div>
      )}
    </Card>
  );
}
