import { useState } from "react";
import { M } from "../constants";

export function ScoreRing({ score, color, size = 80 }) {
  const r = 28,
    circ = 2 * Math.PI * r,
    dash = (score / 100) * circ;
  return (
    <svg width={size} height={size} viewBox="0 0 72 72" style={{ transform: "rotate(-90deg)" }}>
      <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="5" />
      <circle
        cx="36"
        cy="36"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
      />
      <text
        x="36"
        y="36"
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fill: M.text,
          fontSize: 14,
          fontWeight: 800,
          fontFamily: "Inter,sans-serif",
          transform: "rotate(90deg)",
          transformOrigin: "36px 36px",
        }}
      >
        {score}
      </text>
    </svg>
  );
}

export function MModule({ icon, label, badge, children, defaultOpen = false, accentColor }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      style={{
        borderRadius: 12,
        background: M.card,
        border: `1px solid ${open ? M.borderAct : M.border}`,
        overflow: "hidden",
        marginBottom: 10,
        transition: "border-color .2s",
      }}
    >
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "13px 14px",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: open ? `${accentColor || M.accent}18` : M.accentDim,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background .2s",
          }}
        >
          {icon}
        </div>
        <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: M.text, fontFamily: "DM Sans,sans-serif" }}>
          {label}
        </span>
        {badge && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: M.accent,
              fontFamily: "Inter,sans-serif",
              background: M.accentDim,
              padding: "2px 8px",
              borderRadius: 20,
            }}
          >
            {badge}
          </span>
        )}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform .22s", flexShrink: 0 }}
        >
          <path d="M4 6l4 4 4-4" stroke={M.muted} strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      {open && <div style={{ borderTop: `1px solid ${M.border}`, padding: "12px 14px" }}>{children}</div>}
    </div>
  );
}

export function MKpi({ label, value, sub, trend, icon }) {
  const up = trend && trend.startsWith("+");
  return (
    <div style={{ background: M.card, borderRadius: 12, border: `1px solid ${M.border}`, padding: "13px 14px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            background: M.accentDim,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
        {trend && (
          <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "Inter,sans-serif", color: up ? M.green : M.red }}>
            {trend}
          </span>
        )}
      </div>
      <div
        style={{
          fontSize: 20,
          fontWeight: 800,
          color: M.text,
          letterSpacing: "-0.5px",
          lineHeight: 1,
          marginBottom: 3,
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, color: M.sub, fontFamily: "Inter,sans-serif" }}>{label}</div>
      {sub && <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>{sub}</div>}
    </div>
  );
}

export function MobileComingSoon({ label, icon }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 60,
        paddingBottom: 60,
        gap: 16,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: M.accentDim,
          border: `1px solid ${M.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: M.text, marginBottom: 6 }}>{label}</div>
        <div style={{ fontSize: 12, color: M.muted, fontFamily: "Inter,sans-serif", lineHeight: 1.5 }}>
          This section will reflect
          <br />
          data for the selected sector.
        </div>
      </div>
      <div style={{ padding: "8px 18px", borderRadius: 20, border: `1px solid ${M.border}`, background: M.card }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: M.muted,
            fontFamily: "Inter,sans-serif",
            letterSpacing: "0.5px",
          }}
        >
          COMING SOON
        </span>
      </div>
    </div>
  );
}
