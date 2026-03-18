import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  LogOut,
  Zap,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";
import { C, SECTORS, SectorData, M, msigCol, msigDim, scoreToSig } from "./data";
import { ChartTip } from "./DesktopComponents";

import { MOV_TABS } from "./data";

/* ── Shared mobile primitives ── */
export function MCard({ children, style = {}, onClick }: { children?: React.ReactNode; style?: React.CSSProperties; onClick?: () => void }) {
  return (
    <div
      style={{ borderRadius: 16, background: M.card, border: `1px solid ${M.borderG}`, overflow: "hidden", ...style }}
    >
      {children}
    </div>
  );
}

export function MCardHeader({ icon: Icon, iconColor = M.accent, title, badge, badgeStyle = {}, onToggle, open }) {
  return (
    <div
      onClick={onToggle}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "13px 14px",
        cursor: onToggle ? "pointer" : "default",
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 8,
          background: M.faint,
          border: `1px solid ${M.border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={13} color={iconColor} />
      </div>
      <span style={{ flex: 1, fontSize: 13, fontWeight: 700, color: M.white }}>{title}</span>
      {badge != null && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "3px 9px",
            borderRadius: 20,
            background: M.accentDim,
            border: `1px solid ${M.accentBorder}`,
            flexShrink: 0,
            ...badgeStyle,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: M.accent,
              fontFamily: "Inter,sans-serif",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            {badge}
          </span>
        </div>
      )}
      {onToggle && (
        <ChevronDown
          size={14}
          color={M.muted}
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}
        />
      )}
    </div>
  );
}

export function MSection({ icon, iconColor = M.accent, title, badge = undefined, badgeStyle = {}, defaultOpen = false, children }: { icon?: React.ComponentType<{ size: number; color: string }>; iconColor?: string; title?: React.ReactNode; badge?: React.ReactNode; badgeStyle?: React.CSSProperties; defaultOpen?: boolean; children?: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <MCard style={{ marginBottom: 10 }}>
      <MCardHeader
        icon={icon}
        iconColor={iconColor}
        title={title}
        badge={badge}
        badgeStyle={badgeStyle}
        onToggle={() => setOpen((o) => !o)}
        open={open}
      />
      {open && <div style={{ borderTop: `1px solid ${M.border}` }}>{children}</div>}
    </MCard>
  );
}

/* ── Mobile Logo SVG (104×28, white wordmark) ── */
export function MobileLogo() {
  return (
    <div style={{ flexShrink: 0 }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3434.33 932.3"
        style={{ width: 104, height: 28, display: "block" }}
      >
        <defs>
          <style>{`.ml1{stroke:#fff;stroke-width:80px;fill:none;stroke-miterlimit:10;}.ml2{fill:#B8D935;stroke:#1b4d3e;stroke-miterlimit:10;}.ml3{fill:none;stroke:#231f20;stroke-width:5px;stroke-miterlimit:10;}.ml4{fill:#fff;stroke:#000;stroke-width:.5px;stroke-miterlimit:10;}.ml5{fill:#B8D935;}.ml6{fill:#fff;}.ml8{fill:#fff;}`}</style>
        </defs>
        <path
          className="ml6"
          d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z"
        />
        <path
          className="ml4"
          d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1Z"
        />
        <path
          className="ml4"
          d="M1488.08,578.65v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"
        />
        <rect className="ml5" x="1427.38" y="17.35" width="205.2" height="145" />
        <rect className="ml6" x="1427.48" y="221.75" width="205.2" height="693.2" rx="9.6" ry="9.6" />
        <path
          className="ml6"
          d="M2757.31,19.09h491.3c5.42,0,9.82,4.4,9.82,9.82v218.7c0,5.42-4.4,9.82-9.82,9.82h-507.36c-56.98,0-108.53,23.02-145.87,60.35-37.34,37.23-60.45,88.79-60.45,145.66,0,113.75,92.37,206.01,206.32,206.01h12.89c2.86,0,5.11,2.25,5.11,5.11v236.7c0,1.13-.92,1.94-1.94,1.94h0c-242.22,0-438.52-195.99-438.52-437.8v-18.51c0-241.81,196.29-437.8,438.52-437.8h0Z"
        />
        <rect className="ml6" x="2812.75" y="339.47" width="216.75" height="572.62" rx="9.6" ry="9.6" />
        <rect className="ml5" x="3083.41" y="339.47" width="175.12" height="257.67" />
        <rect className="ml5" x="3083.41" y="654.42" width="175.12" height="257.67" />
        <circle className="ml3" cx="3385.56" cy="866.94" r="46.27" />
        <path
          className="ml8"
          d="M3404.8,889.32l-10.31-14.71c.25,0,.38-.13.63-.25,2.89-1.26,5.03-3.02,6.54-5.41s2.26-5.15,2.26-8.55c0-5.03-1.76-8.93-5.16-11.82s-8.05-4.27-14.08-4.27h-18.36v44.89h8.3v-13.08h11.94l9.18,13.08h8.93l.13.13ZM3392.85,853.74c1.89,1.51,2.77,3.77,2.77,6.66s-.88,5.03-2.77,6.66-4.65,2.39-8.3,2.39h-9.81v-17.85h9.81c3.65,0,6.41.75,8.3,2.26h0v-.13Z"
        />
        <rect className="ml1" x="40" y="40" width="843.91" height="852.3" rx="36.55" ry="36.55" />
        <polygon className="ml2" points="722.6 322.13 462.28 452.8 201.97 322.75 461.21 192.52 722.6 322.13" />
        <path
          style={{ fill: "#74914a" }}
          d="M197.84,426.78c3.86-.53,7.04.85,10.74,1.41l252.53,125.67c84.54-40,167.66-83.83,251.89-124.84,33.14-11.49,50.09,34.15,18.55,49.11l-259.23,129.08c-10.18,3.72-14.14,2.57-23.85-1.31l-264.23-132.98c-17.04-14.4-7.96-43.2,13.61-46.14Z"
        />
        <path
          className="ml5"
          d="M195.25,558c3.65-.63,7.4-.4,11.08-.22,86.11,40.47,170.4,85.05,255.95,126.78l252.92-126c29.53-7.22,45.44,28.67,22.29,46.49l-270.42,134.42-8.62.31c-91.6-42.21-181.07-89.86-271.7-134.42-18.72-12.06-13.3-43.58,8.5-47.37Z"
        />
      </svg>
    </div>
  );
}

/* ── Sector Drawer (bottom sheet) ── */
export function MSectorDrawer({ s, setS, open, onClose }) {
  const sorted = [...SECTORS].sort((a, b) => b.score - a.score);
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.65)" }} onClick={onClose}>
      <div
        className="mDrawer"
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
            const totalV = (sec.t1?.length || 0) + (sec.t2?.length || 0) + (sec.t3?.length || 0);
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
                  {sec.svgIcon(act ? "#B8D935" : "rgba(255,255,255,0.35)", 16)}
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
                    {totalV} ventures · ${sec.capLow}–{sec.capHigh}M
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

/* ── Hamburger Menu Drawer ── */
export function MMenuDrawer({
  open,
  onClose,
  s,
  userName = "Joseph Asante",
  userRole = "BRIDGE Intelligence · Analyst",
  userTier = "Pro",
}) {
  if (!open) return null;
  const NAV = [
    {
      label: "About BRIDGE",
      desc: "Our mission, model & sectors",
      icon: (
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
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
    },
    {
      label: "Switch to Desktop",
      desc: "Full dashboard experience",
      icon: (
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
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
    {
      label: "Notifications",
      desc: "Manage alert preferences",
      icon: (
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
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
      ),
    },
    {
      label: "Help & Support",
      desc: "Docs, guides & contact",
      icon: (
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
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
  ];
  const chevronR = (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(255,255,255,0.18)"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(0,0,0,0.65)" }} onClick={onClose}>
      <div
        className="mDrawer"
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
        {/* Return to website */}
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
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
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
          {chevronR}
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
              {item.icon}
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
            {chevronR}
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
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
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

/* ── Notifications Dropdown ── */
export function MNotifDropdown({ open, onClose, s }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 340 }} onClick={onClose}>
      <div
        style={{
          position: "absolute",
          top: 64,
          right: 12,
          width: 280,
          background: "#0F1A12",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 14,
          boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
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
                background: msigCol(a.sig),
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
    </div>
  );
}

/* ── Top Header ── */
export function MobileHeader({ s, setS }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: 52,
          background: "rgba(15,26,18,0.97)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(16px)",
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          flexShrink: 0,
        }}
      >
        <div
          onClick={() => setDrawerOpen(true)}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
            background: "rgba(255,255,255,0.06)",
            borderRadius: 12,
            padding: "8px 12px",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: "rgba(184,217,53,0.15)",
              border: "1px solid rgba(184,217,53,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {s.svgIcon("#B8D935", 14)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                fontFamily: "Inter,sans-serif",
              }}
            >
              Active Sector
            </div>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: "#fff",
                fontFamily: "DM Sans,sans-serif",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: 1.2,
                marginTop: 1,
              }}
            >
              {s.short}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#B8D935",
                  fontFamily: "Inter,sans-serif",
                  lineHeight: 1,
                  letterSpacing: "-0.5px",
                }}
              >
                {s.score}
              </div>
              <div
                style={{
                  fontSize: 8,
                  color: "rgba(255,255,255,0.25)",
                  fontFamily: "Inter,sans-serif",
                  letterSpacing: "0.3px",
                }}
              >
                SCORE
              </div>
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(184,217,53,0.6)"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>
      <MSectorDrawer s={s} setS={setS} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}

/* ── Sector Strip ── */
export function SectorStrip({ s, setS }) {
  const sorted = [...SECTORS].sort((a, b) => b.score - a.score);
  return (
    <div style={{ background: M.bg, borderBottom: `1px solid ${M.border}`, padding: "8px 0", flexShrink: 0 }}>
      <div
        style={{
          display: "flex",
          gap: 6,
          overflowX: "auto",
          paddingLeft: 16,
          paddingRight: 16,
          scrollbarWidth: "none",
        }}
      >
        {sorted.map((sec) => {
          const act = sec.id === s.id,
            SIcon = sec.icon;
          return (
            <button
              key={sec.id}
              onClick={() => setS(sec)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "5px 10px",
                borderRadius: 20,
                border: `1px solid ${act ? M.accentBorder : M.border}`,
                background: act ? M.accentDim : M.faint,
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
                transition: "all .15s",
              }}
            >
              <SIcon size={10} color={act ? M.accent : M.muted} strokeWidth={1.5} />
              <span
                style={{
                  fontSize: 10,
                  fontWeight: act ? 700 : 500,
                  color: act ? M.accent : M.mid,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                {sec.short}
              </span>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: act ? M.accent : M.muted,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                {sec.score}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Signal item row ── */
export function MSignalRow({ a }) {
  const c = msigCol(a.sig);
  const dim = msigDim(a.sig);
  const arrow = a.sig === "Bullish" ? "↑" : a.sig === "Bearish" ? "↓" : "→";
  return (
    <div style={{ display: "flex", gap: 10, padding: "10px 14px", borderBottom: `1px solid ${M.border}` }}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 7,
          background: dim,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontSize: 13,
          color: c,
          fontWeight: 700,
        }}
      >
        {arrow}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: M.white, lineHeight: 1.35, marginBottom: 3 }}>{a.h}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              padding: "1px 6px",
              borderRadius: 4,
              background: dim,
              color: c,
              fontFamily: "Inter,sans-serif",
            }}
          >
            {a.sig}
          </span>
          <span style={{ fontSize: 9, color: M.muted, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
          <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, color: c, fontFamily: "Inter,sans-serif" }}>
            {a.amt}
          </span>
        </div>
      </div>
    </div>
  );
}

export function MobileBottomNav({ page, setPage }) {
  return (
    <div
      style={{
        height: 64,
        background: "#050B05",
        borderTop: `1px solid ${M.border}`,
        display: "flex",
        flexShrink: 0,
        position: "relative",
        zIndex: 97,
      }}
    >
      {MOV_TABS.map((t) => {
        const act = page === t.id;
        return (
          <button
            key={t.id}
            onClick={() => setPage(t.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              background: "none",
              border: "none",
              cursor: "pointer",
              position: "relative",
              padding: 0,
            }}
          >
            {act && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 20,
                  height: 2,
                  borderRadius: "0 0 3px 3px",
                  background: M.accent,
                }}
              />
            )}
            {t.icon(act ? M.accent : M.muted, act ? 2 : 1.5)}
            <span
              style={{
                fontSize: 9,
                fontWeight: act ? 700 : 500,
                color: act ? M.accent : M.muted,
                fontFamily: "Inter,sans-serif",
                letterSpacing: ".2px",
                marginTop: 1,
              }}
            >
              {t.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
