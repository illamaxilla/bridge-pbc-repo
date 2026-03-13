import { useState, useEffect } from "react";
import {
  ChevronDown,
  X,
  Rss,
  Building2,
  Award,
  Wifi,
  PieChart,
} from "lucide-react";
import { SECTORS, MB } from "./data";
import type { WatchlistSector } from "./types";

export interface MBadgeProps {
  children: React.ReactNode;
  col?: string;
  bg?: string;
}

export interface MCardHeaderProps {
  icon: React.ReactNode;
  title: string;
  badge?: string;
  open: boolean;
  toggle: () => void;
}

export interface MRingProps {
  score: number;
  size?: number;
  stroke?: number;
}

export interface MSectorDrawerProps {
  s: WatchlistSector;
  setS: (s: WatchlistSector) => void;
  open: boolean;
  onClose: () => void;
}

export interface MMenuDrawerProps {
  open: boolean;
  onClose: () => void;
  userName?: string;
  userRole?: string;
  userTier?: string;
}

export interface MNotifDropdownProps {
  open: boolean;
  onClose: () => void;
  s: WatchlistSector;
}

export interface MobileHeaderProps {
  sector: WatchlistSector;
  setSector: (s: WatchlistSector) => void;
}

export interface MobileBottomNavProps {
  page: string;
  setPage: (page: string) => void;
}

export function MBadge({ children, col = MB.accent, bg = "rgba(184,217,53,0.12)" }) {
  return (
    <span
      style={{
        fontSize: 10,
        fontWeight: 700,
        color: col,
        background: bg,
        padding: "3px 10px",
        borderRadius: 20,
        fontFamily: "Inter,sans-serif",
        flexShrink: 0,
      }}
    >
      {children}
    </span>
  );
}
export function MCardHeader({ icon, title, badge, open, toggle }) {
  return (
    <div
      onClick={toggle}
      style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px", cursor: "pointer" }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          background: "rgba(184,217,53,0.08)",
          border: `1px solid ${MB.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <span style={{ flex: 1, fontSize: 15, fontWeight: 700, color: MB.text, letterSpacing: "-.2px" }}>{title}</span>
      {badge && <MBadge>{badge}</MBadge>}
      <ChevronDown
        size={14}
        color={MB.muted}
        style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}
      />
    </div>
  );
}

// ─── Score Ring (dark variant) ────────────────────────────────────────
export function MRing({ score, size = 80, stroke = 7 }) {
  const r = (size - stroke * 2) / 2,
    circ = 2 * Math.PI * r,
    pct = Math.min(100, score);
  const col = score >= 80 ? MB.accent : score >= 60 ? MB.green : MB.yellow;
  return (
    <svg width={size} height={size} style={{ flexShrink: 0 }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={col}
        strokeWidth={stroke}
        strokeDasharray={`${(circ * pct) / 100} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x={size / 2}
        y={size / 2 + 4}
        textAnchor="middle"
        fontSize={size > 60 ? 18 : 12}
        fontWeight={800}
        fill={MB.text}
        fontFamily="Inter,sans-serif"
      >
        {score}
      </text>
    </svg>
  );
}

// ─── Responsive hook ──────────────────────────────────────────────────
export function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return w;
}

// ═══════════════════════════════════════════════════════════════════════
// MOBILE HEADER
// ═══════════════════════════════════════════════════════════════════════
// ─── Sector Selector Drawer ────────────────────────────────────────────
export function MSectorDrawer({ s, setS, open, onClose }) {
  if (!open) return null;
  const sorted = [...SECTORS].sort((a, b) => b.score - a.score);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.65)" }} onClick={onClose}>
      <div
        className="drawer"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#0F1A12",
          borderRadius: "20px 20px 0 0",
          maxHeight: "82vh",
          display: "flex",
          flexDirection: "column",
          paddingBottom: "env(safe-area-inset-bottom,16px)",
          border: "1px solid rgba(184,217,53,0.15)",
          borderBottom: "none",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            width: 36,
            height: 4,
            borderRadius: 2,
            background: "rgba(255,255,255,0.15)",
            margin: "12px auto 0",
            flexShrink: 0,
          }}
        />
        <div
          style={{
            padding: "12px 20px 8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#6B7280",
              fontFamily: "Inter,sans-serif",
              letterSpacing: "0.8px",
              textTransform: "uppercase",
            }}
          >
            Select Sector
          </span>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "none",
              borderRadius: 7,
              padding: "4px 10px",
              fontSize: 11,
              color: "rgba(255,255,255,0.4)",
              cursor: "pointer",
              fontFamily: "Inter,sans-serif",
            }}
          >
            Done
          </button>
        </div>
        <div style={{ overflowY: "auto", flex: 1, scrollbarWidth: "none" }}>
          {sorted.map((sec, i) => {
            const act = sec.id === s.id;
            return (
              <div
                key={sec.id}
                onClick={() => {
                  setS(sec);
                  onClose();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "13px 20px",
                  borderTop: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  background: act ? "rgba(184,217,53,0.07)" : "transparent",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 11,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: act ? "rgba(184,217,53,0.15)" : "rgba(255,255,255,0.06)",
                  }}
                >
                  {(sec as any).svgIcon(act ? "#B8D935" : "rgba(255,255,255,0.35)", 16)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: act ? 700 : 500,
                      color: act ? "#fff" : "rgba(255,255,255,0.7)",
                      fontFamily: "DM Sans,sans-serif",
                    }}
                  >
                    {sec.short}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.3)",
                      fontFamily: "Inter,sans-serif",
                      marginTop: 1,
                    }}
                  >
                    {sec.keyPlayers?.length || 5} ventures · ${sec.capLow}–{sec.capHigh}M
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      fontFamily: "Inter,sans-serif",
                      color: act ? "#B8D935" : "rgba(255,255,255,0.28)",
                    }}
                  >
                    {sec.score}
                  </div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", fontFamily: "Inter,sans-serif" }}>
                    score
                  </div>
                </div>
                {act && (
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#B8D935", flexShrink: 0 }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Menu Drawer ───────────────────────────────────────────────────────
export function MMenuDrawer({
  open,
  onClose,
  userName = "Joseph Asante",
  userRole = "BRIDGE Intelligence · Analyst",
  userTier = "Pro",
}) {
  if (!open) return null;
  const NAV = [
    {
      label: "About BRIDGE",
      desc: "Our mission, model & sectors",
      path: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    },
    { label: "Switch to Desktop", desc: "Full dashboard experience", path: "M2 3h20v14H2zM8 21h8M12 17v4" },
    {
      label: "Notifications",
      desc: "Manage alert preferences",
      path: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 01-3.46 0",
    },
    {
      label: "Help & Support",
      desc: "Docs, guides & contact",
      path: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3 M12 17h.01",
    },
  ];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(0,0,0,0.65)" }} onClick={onClose}>
      <div
        className="drawer"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#0F1A12",
          borderRadius: "20px 20px 0 0",
          border: "1px solid rgba(184,217,53,0.15)",
          borderBottom: "none",
          paddingBottom: "env(safe-area-inset-bottom,24px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)", margin: "12px auto 0" }}
        />
        <div
          style={{ padding: "12px 20px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#6B7280",
              fontFamily: "Inter,sans-serif",
              letterSpacing: "0.8px",
              textTransform: "uppercase",
            }}
          >
            Menu
          </span>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "none",
              borderRadius: 7,
              padding: "4px 10px",
              fontSize: 11,
              color: "rgba(255,255,255,0.4)",
              cursor: "pointer",
              fontFamily: "Inter,sans-serif",
            }}
          >
            Done
          </button>
        </div>
        {/* Profile */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "14px 20px 16px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "rgba(184,217,53,0.12)",
              border: "1.5px solid rgba(184,217,53,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#B8D935"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "DM Sans,sans-serif" }}>
              {userName}
            </div>
            <div
              style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "Inter,sans-serif", marginTop: 2 }}
            >
              {userRole}
            </div>
          </div>
          <div
            style={{
              background: "rgba(184,217,53,0.12)",
              border: "1px solid rgba(184,217,53,0.2)",
              borderRadius: 6,
              padding: "3px 8px",
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 700, color: "#B8D935", fontFamily: "Inter,sans-serif" }}>
              {userTier}
            </span>
          </div>
        </div>
        {/* Return to site */}
        <button
          onClick={onClose}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "15px 20px",
            background: "transparent",
            border: "none",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 11,
              background: "rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "DM Sans,sans-serif" }}>
              Return to Website
            </div>
            <div
              style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "Inter,sans-serif", marginTop: 2 }}
            >
              Back to bridge-pbc.com
            </div>
          </div>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
        {/* Nav items */}
        {NAV.map((item, i) => (
          <button
            key={i}
            onClick={onClose}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "13px 20px",
              background: "transparent",
              border: "none",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 11,
                background: "rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={item.path} />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "DM Sans,sans-serif",
                }}
              >
                {item.label}
              </div>
              <div
                style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "Inter,sans-serif", marginTop: 2 }}
              >
                {item.desc}
              </div>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        ))}
        {/* Sign out */}
        <button
          onClick={onClose}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "14px 20px",
            background: "transparent",
            border: "none",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            cursor: "pointer",
            textAlign: "left",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 11,
              background: "rgba(239,68,68,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(239,68,68,0.6)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{ fontSize: 14, fontWeight: 600, color: "rgba(239,68,68,0.75)", fontFamily: "DM Sans,sans-serif" }}
            >
              Sign Out
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

// ─── Notif Dropdown ────────────────────────────────────────────────────
export function MNotifDropdown({ open, onClose, s }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 64,
        right: 12,
        width: 280,
        background: "#0F1A12",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14,
        boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
        zIndex: 350,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 14px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Alerts</span>
        <span style={{ fontSize: 11, color: "#B8D935", fontWeight: 700, cursor: "pointer" }} onClick={onClose}>
          Mark all read
        </span>
      </div>
      {s.activity.slice(0, 3).map((a, i) => (
        <div
          key={i}
          style={{ display: "flex", gap: 10, padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: a.sig === "Bullish" ? "#22C55E" : "#F59E0B",
              marginTop: 4,
              flexShrink: 0,
            }}
          />
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", lineHeight: 1.3 }}>{a.h}</div>
            <div
              style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "Inter,sans-serif", marginTop: 2 }}
            >
              {a.date}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Mobile Header (new spec) ──────────────────────────────────────────
export function MobileHeader({ sector, setSector }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: 48,
          background: `${MB.card}EE`,
          borderBottom: `1px solid rgba(255,255,255,0.08)`,
          backdropFilter: "blur(16px)",
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          flexShrink: 0,
        }}
      >
        {/* Sector selector pill */}
        <div
          onClick={() => setDrawerOpen(true)}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            minWidth: 0,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 10,
            padding: "6px 10px 6px 8px",
          }}
        >
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 6,
              background: "rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {sector.svgIcon("#B8D935", 13)}
          </div>
          <span
            style={{
              flex: 1,
              fontSize: 13,
              fontWeight: 600,
              color: "#fff",
              fontFamily: "DM Sans,sans-serif",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {sector.short}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#B8D935", fontFamily: "Inter,sans-serif" }}>
              {sector.score}
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#B8D935"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
      <MSectorDrawer s={sector} setS={setSector} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// BOTTOM NAV  (Dashboard / Overview / Analytics / Watch / Resources)
// ═══════════════════════════════════════════════════════════════════════
export function MobileBottomNav({ page, setPage }) {
  const items = [
    { id: "feed", label: "Feed", Icon: Rss },
    { id: "companies", label: "Companies", Icon: Building2 },
    { id: "scores", label: "Scores", Icon: Award },
    { id: "signals", label: "Signals", Icon: Wifi },
    { id: "portfolio", label: "Portfolio", Icon: PieChart },
  ];
  return (
    <div
      style={{
        height: 60,
        flexShrink: 0,
        background: MB.card,
        borderTop: `1px solid ${MB.borderSub}`,
        display: "flex",
        alignItems: "stretch",
        paddingBottom: "env(safe-area-inset-bottom,0px)",
      }}
    >
      {items.map(({ id, label, Icon }) => {
        const act = page === id;
        return (
          <div
            key={id}
            onClick={() => setPage(id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              cursor: "pointer",
              position: "relative",
            }}
          >
            {act && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 28,
                  height: 2,
                  borderRadius: "0 0 2px 2px",
                  background: MB.accent,
                }}
              />
            )}
            <Icon size={20} color={act ? MB.accent : MB.faint} strokeWidth={2} />
            <span
              style={{
                fontSize: 9,
                fontWeight: act ? 700 : 400,
                color: act ? MB.accent : MB.faint,
                fontFamily: "Inter,sans-serif",
              }}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
