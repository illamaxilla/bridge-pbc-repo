import { C } from "../constants";

export interface StatusBarProps {
  activeLabel: string;
}

export function StatusBar({ activeLabel }) {
  return (
    <div
      style={{
        height: 36,
        flexShrink: 0,
        background: "#111E17",
        borderTop: "1px solid #1A2E22",
        display: "flex",
        alignItems: "center",
        padding: "0 22px",
        gap: 0,
      }}
    >
      {/* Left: Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginRight: 20 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#B8D935" }} />
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            color: "rgba(255,255,255,0.7)",
            letterSpacing: ".5px",
            fontFamily: "Inter,sans-serif",
          }}
        >
          BRIDGE Intelligence
        </span>
      </div>

      {/* Metadata chain */}
      {["12 Sectors", "174 Ventures", `Active: ${activeLabel}`, "Data: Mar 2026"].map((label, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 0 }}>
          <span
            style={{ fontSize: 10, color: "rgba(255,255,255,0.18)", marginRight: 10, fontFamily: "Inter,sans-serif" }}
          >
            ·
          </span>
          <span
            style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginRight: 10, fontFamily: "Inter,sans-serif" }}
          >
            {label}
          </span>
        </span>
      ))}

      {/* Right: Legal + Live pill */}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "Inter,sans-serif" }}>
          © 2026 BRIDGE PBC
        </span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            padding: "3px 8px",
            borderRadius: 4,
            background: "rgba(184,217,53,0.08)",
            border: "1px solid rgba(184,217,53,0.15)",
          }}
        >
          <div
            style={{ width: 5, height: 5, borderRadius: "50%", background: "#B8D935", boxShadow: "0 0 5px #B8D935" }}
          />
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: "#B8D935",
              letterSpacing: ".8px",
              textTransform: "uppercase",
              fontFamily: "Inter,sans-serif",
            }}
          >
            Live
          </span>
        </div>
      </div>
    </div>
  );
}
