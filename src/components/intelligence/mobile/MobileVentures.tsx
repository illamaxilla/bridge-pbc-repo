import { useState } from "react";
import { M } from "../constants";

export function MobileVentures({ s }) {
  const [sortBy, setSortBy] = useState("score");
  const sorted = [...s.keyPlayers].sort((a, b) => (sortBy === "score" ? b.score - a.score : b.capNum - a.capNum));
  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {[
          ["score", "By Score"],
          ["capNum", "By Cap"],
        ].map(([k, l]) => (
          <button
            key={k}
            onClick={() => setSortBy(k)}
            style={{
              flex: 1,
              padding: "8px 0",
              borderRadius: 8,
              border: `1px solid ${sortBy === k ? M.accent : M.border}`,
              background: sortBy === k ? M.accentDim : M.card,
              fontSize: 11,
              fontWeight: 700,
              color: sortBy === k ? M.accent : M.sub,
              fontFamily: "Inter,sans-serif",
              cursor: "pointer",
            }}
          >
            {l}
          </button>
        ))}
      </div>
      {sorted.map((p, i) => {
        const up = p.change.startsWith("+");
        const [rr, gg, bb] = [
          parseInt(s.color.slice(1, 3), 16),
          parseInt(s.color.slice(3, 5), 16),
          parseInt(s.color.slice(5, 7), 16),
        ];
        return (
          <div
            key={p.ticker}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              borderRadius: 12,
              marginBottom: 7,
              background: M.card,
              border: `1px solid ${M.border}`,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                background: `rgba(${rr},${gg},${bb},0.15)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: 11,
                fontWeight: 800,
                color: s.color,
                fontFamily: "Inter,sans-serif",
              }}
            >
              {i + 1}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: M.text,
                  marginBottom: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {p.name}
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>#{p.ticker}</span>
                <span
                  style={{ fontSize: 10, fontWeight: 600, color: up ? M.green : M.red, fontFamily: "Inter,sans-serif" }}
                >
                  {p.change}
                </span>
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: M.text, fontFamily: "Inter,sans-serif" }}>
                {p.cap}
              </div>
              <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif" }}>Score: {p.score}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
