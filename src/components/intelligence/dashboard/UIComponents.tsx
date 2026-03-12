import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { C, M } from "./constants";
import type { ReactNode, CSSProperties, ComponentType } from "react";

/* ─── Tag Badge ─── */
export interface TProps {
  bg: string;
  col: string;
  children: ReactNode;
}

export const T = ({ bg, col, children }: TProps) => (
  <span
    style={{
      fontSize: 9,
      fontWeight: 700,
      padding: "2px 7px",
      borderRadius: 4,
      background: bg,
      color: col,
      fontFamily: "Inter,sans-serif",
      letterSpacing: ".5px",
    }}
  >
    {children}
  </span>
);

/* ─── Tier Badge ─── */
export interface TierBProps {
  t: number;
}

export const TierB = ({ t }: TierBProps) => (
  <T
    bg={t === 1 ? "#EBF5B0" : t === 2 ? "rgba(46,90,77,0.12)" : "rgba(107,114,128,0.12)"}
    col={t === 1 ? "#1B4D3E" : t === 2 ? "#2E5A4D" : "#6B7280"}
  >
    TIER {t === 1 ? "I" : t === 2 ? "II" : "III"}
  </T>
);

/* ─── Card ─── */
export interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
}

export function Card({ children, style: ex = {} }: CardProps) {
  const [h, sH] = useState(false);
  return (
    <div
      onMouseEnter={() => sH(true)}
      onMouseLeave={() => sH(false)}
      style={{
        background: "#FFFFFF",
        borderRadius: 16,
        border: "1px solid #E5E7EB",
        boxShadow: h ? "0 4px 16px rgba(0,0,0,0.10)" : "0 1px 4px rgba(0,0,0,0.06)",
        transform: h ? "translateY(-1px)" : "none",
        transition: "all .2s ease",
        overflow: "hidden",
        ...ex,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Gauge (Desktop) ─── */
export interface GaugeProps {
  score: number;
}

export function Gauge({ score }: GaugeProps) {
  const W = 160,
    H = 90,
    cx = W / 2,
    cy = H,
    r = 70;
  const ci = 2 * Math.PI * r,
    half = ci / 2,
    fill = half * (score / 100);
  const col = score >= 88 ? "#16A34A" : score >= 80 ? "#CA8A04" : "#DC2626";
  return (
    <div style={{ textAlign: "center", margin: "4px auto 0", width: W }}>
      <svg width={W} height={H + 10} style={{ overflow: "visible" }}>
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="#F3F4F6"
          strokeWidth={11}
          strokeLinecap="round"
        />
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={col}
          strokeWidth={11}
          strokeLinecap="round"
          strokeDasharray={`${fill} ${half}`}
          style={{ transition: "stroke-dasharray .8s ease" }}
        />
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fontSize={28}
          fontWeight={700}
          fill="#111827"
          fontFamily="Inter,sans-serif"
        >
          {score}
        </text>
      </svg>
    </div>
  );
}

/* ─── MiniGauge (Mobile) ─── */
export interface MiniGaugeProps {
  score: number;
}

export function MiniGauge({ score }: MiniGaugeProps) {
  const W = 96,
    H = 52,
    cx = W / 2,
    cy = H,
    r = 42;
  const ci = 2 * Math.PI * r,
    half = ci / 2,
    fill = half * (score / 100);
  const col = score >= 88 ? "#4ADE80" : score >= 80 ? "#FCD34D" : "#F87171";
  return (
    <svg width={W} height={H + 6} style={{ overflow: "visible" }}>
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={8}
        strokeLinecap="round"
      />
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none"
        stroke={col}
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={`${fill} ${half}`}
        style={{ transition: "stroke-dasharray .8s ease" }}
      />
      <text x={cx} y={cy - 2} textAnchor="middle" fontSize={18} fontWeight={700} fill="#fff" fontFamily="Inter,sans-serif">
        {score}
      </text>
    </svg>
  );
}

/* ─── ScoreRing ─── */
export interface ScoreRingProps {
  score: number;
  size?: number;
  stroke?: number;
}

export function ScoreRing({ score, size = 64, stroke = 5 }: ScoreRingProps) {
  const r = size / 2 - stroke,
    c = 2 * Math.PI * r,
    fill = c * (score / 100);
  const col = score >= 88 ? M.green : score >= 80 ? M.orange : M.red;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={col}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${fill} ${c}`}
          style={{ transition: "stroke-dasharray .8s ease" }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: size * 0.26, fontWeight: 700, color: M.white, fontFamily: "Inter,sans-serif" }}>
          {score}
        </span>
      </div>
    </div>
  );
}

/* ─── Tooltip (Recharts) ─── */
export interface TipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export const Tip = ({ active, payload, label }: TipProps) => {
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
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
          <div style={{ width: 7, height: 7, borderRadius: 2, background: p.fill }} />
          <span>
            {p.name}: <strong>{p.value}</strong>
          </span>
        </div>
      ))}
    </div>
  );
};

/* ─── SectorHeader (dark bg) ─── */
export interface SectorHeaderProps {
  s: {
    icon: ComponentType<{ size?: number; color?: string }>;
    short: string;
    tag: string;
    score: number;
  };
}

export function SectorHeader({ s }: SectorHeaderProps) {
  const Icon = s.icon;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 9,
          background: "rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={17} color="#B8D935" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {s.short}
        </div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.42)", fontFamily: "Inter,sans-serif" }}>{s.tag}</div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: "#B8D935", lineHeight: 1 }}>{s.score}</div>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", fontFamily: "Inter,sans-serif" }}>Score</div>
      </div>
    </div>
  );
}

/* ─── MSection (collapsible section) ─── */
export interface MSectionProps {
  title: string;
  subtitle?: string;
  icon?: ComponentType<{ size?: number; color?: string }>;
  accent?: boolean;
  defaultOpen?: boolean;
  children?: ReactNode;
  badge?: string;
}

export function MSection({ title, subtitle, icon: Icon, accent = false, defaultOpen = false, children, badge }: MSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: 8 }}>
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 16px",
          background: accent ? "#1E3327" : "#fff",
          borderRadius: open ? "12px 12px 0 0" : "12px",
          border: `1px solid ${accent ? "rgba(184,217,53,0.12)" : "#E5E7EB"}`,
          borderBottom: open ? `1px solid ${accent ? "rgba(184,217,53,0.06)" : "#F3F4F6"}` : undefined,
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {Icon && (
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: accent ? "rgba(184,217,53,0.12)" : "rgba(27,77,62,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={13} color={accent ? "#B8D935" : "#2E5A4D"} />
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: accent ? "#fff" : "#111827", lineHeight: 1.1 }}>
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: 10,
                color: accent ? "rgba(255,255,255,0.45)" : "#6B7280",
                fontFamily: "Inter,sans-serif",
                marginTop: 1,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
        {badge && (
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              padding: "2px 7px",
              borderRadius: 4,
              background: "#EBF5B0",
              color: "#1B4D3E",
              fontFamily: "Inter,sans-serif",
              flexShrink: 0,
            }}
          >
            {badge}
          </div>
        )}
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: accent ? "rgba(255,255,255,0.07)" : "#F3F4F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "transform .2s",
            transform: open ? "rotate(180deg)" : "none",
          }}
        >
          <ChevronDown size={11} color={accent ? "rgba(255,255,255,0.5)" : "#6B7280"} />
        </div>
      </div>
      {open && (
        <div
          style={{
            background: accent ? "#172B1F" : "#fff",
            border: `1px solid ${accent ? "rgba(184,217,53,0.08)" : "#E5E7EB"}`,
            borderTop: "none",
            borderRadius: "0 0 12px 12px",
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

/* ─── MCard (mobile section card) ─── */
export interface MCardProps {
  icon?: ComponentType<{ size?: number; color?: string }>;
  title?: string;
  badge?: string;
  badgeLime?: boolean;
  defaultOpen?: boolean;
  children?: ReactNode;
}

export function MCard({ icon: Icon, title, badge, badgeLime = false, defaultOpen = true, children }: MCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      style={{
        marginBottom: 8,
        background: M.card,
        borderRadius: 16,
        border: `1px solid ${M.cardBorder}`,
        overflow: "hidden",
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
        {Icon && (
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: M.accentDim,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Icon size={13} color={M.accent} />
          </div>
        )}
        <span style={{ flex: 1, fontSize: 14, fontWeight: 700, color: M.white, letterSpacing: "-.2px" }}>{title}</span>
        {badge && (
          <div
            style={{
              padding: "3px 10px",
              borderRadius: 20,
              background: badgeLime ? M.accent : M.accentDim,
              border: `1px solid ${badgeLime ? "transparent" : M.accentBorder}`,
              fontSize: 11,
              fontWeight: 700,
              color: badgeLime ? M.bg : M.accent,
              fontFamily: "Inter,sans-serif",
              flexShrink: 0,
            }}
          >
            {badge}
          </div>
        )}
        <ChevronDown
          size={14}
          color={M.muted}
          style={{
            transition: "transform .2s",
            transform: open ? "rotate(180deg)" : "none",
            flexShrink: 0,
            marginLeft: badge ? 6 : 0,
          }}
        />
      </div>
      <div style={{ height: "1px", background: M.divider, margin: "0 14px" }} />
      {open && <div>{children}</div>}
    </div>
  );
}

/* ─── Heatmap ─── */
export function Heatmap() {
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const hours = ["00", "04", "08", "12", "16", "20"];
  const data = days.map(() => hours.map(() => Math.floor(Math.random() * 5)));
  const shades = [
    "rgba(255,255,255,0.04)",
    "rgba(46,90,77,0.3)",
    "rgba(46,90,77,0.5)",
    "rgba(46,90,77,0.75)",
    "rgba(184,217,53,0.5)",
  ];
  return (
    <div style={{ padding: "12px 14px 14px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "24px repeat(6,1fr)", gap: 3 }}>
        <div />
        {hours.map((h) => (
          <div key={h} style={{ fontSize: 9, color: M.muted, textAlign: "center", fontFamily: "Inter,sans-serif", marginBottom: 4 }}>
            {h}
          </div>
        ))}
        {days.map((d, di) => [
          <div key={d} style={{ fontSize: 9, color: M.muted, display: "flex", alignItems: "center", fontFamily: "Inter,sans-serif" }}>
            {d}
          </div>,
          ...data[di].map((v, ci) => <div key={ci} style={{ height: 18, borderRadius: 3, background: shades[v] }} />),
        ])}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 10 }}>
        <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>Low</span>
        {shades.map((sh, i) => (
          <div key={i} style={{ width: 16, height: 10, borderRadius: 2, background: sh }} />
        ))}
        <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>Peak</span>
      </div>
    </div>
  );
}

/* ─── SubTabs ─── */
export interface SubTabsProps {
  tabs: { id: string; label: string }[];
  active: string;
  onChange: (id: string) => void;
}

export function SubTabs({ tabs, active, onChange }: SubTabsProps) {
  return (
    <div style={{ display: "flex", gap: 6, overflowX: "auto", padding: "10px 14px 0", scrollbarWidth: "none" }}>
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            padding: "6px 14px",
            borderRadius: 20,
            border: `1px solid ${active === t.id ? M.accent : M.cardBorder}`,
            background: active === t.id ? M.accent : "transparent",
            color: active === t.id ? M.bg : M.muted,
            fontSize: 12,
            fontWeight: active === t.id ? 700 : 500,
            fontFamily: "Inter,sans-serif",
            whiteSpace: "nowrap",
            cursor: "pointer",
            flexShrink: 0,
            transition: "all .15s",
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
