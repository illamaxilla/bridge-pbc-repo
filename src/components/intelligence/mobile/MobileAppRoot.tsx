import { useState } from "react";
import { M } from "../constants";
import { SECTORS } from "../sectorData";
import { MobileAnalytics } from "./MobileAnalytics";
import { MobileBottomNav } from "./MobileBottomNav";
import { MSectorDrawer } from "./MSectorDrawer";

export function MobileApp() {
  const [s, setS] = useState(SECTORS[1]);
  const [sub, setSub] = useState("kpis");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const SUB_LABELS = {
    kpis: "KPIs",
    performance: "Performance",
    activity: "Activity",
    companies: "Companies",
    map: "Global Map",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: M.bg,
        fontFamily: "'DM Sans',sans-serif",
        color: M.text,
        overflowX: "hidden",
      }}
    >
      <style>{`*{box-sizing:border-box;-webkit-tap-highlight-color:transparent;}::-webkit-scrollbar{display:none;}`}</style>

      {/* Top header — sector selector only */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          height: 56,
          background: `${M.surface}EE`,
          borderBottom: `1px solid ${M.border}`,
          backdropFilter: "blur(16px)",
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          flexShrink: 0,
        }}
      >
        {/* Sector selector */}
        <div
          onClick={() => setDrawerOpen(true)}
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
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
            {s.svgIcon("#B8D935", 13)}
          </div>
          <span
            style={{
              flex: 1,
              fontSize: 13,
              fontWeight: 600,
              color: "#FFFFFF",
              fontFamily: "DM Sans,sans-serif",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {s.short}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#B8D935", fontFamily: "Inter,sans-serif" }}>
              {s.score}
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

      {/* Hamburger menu drawer */}
      {menuOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(0,0,0,0.65)" }}
          onClick={() => setMenuOpen(false)}
        >
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
            {/* Drag handle */}
            <div
              style={{
                width: 36,
                height: 4,
                borderRadius: 2,
                background: "rgba(255,255,255,0.15)",
                margin: "12px auto 0",
              }}
            />
            {/* Header */}
            <div
              style={{
                padding: "12px 20px 8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
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
                Menu
              </span>
              <button
                onClick={() => setMenuOpen(false)}
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

            {/* Profile block */}
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
                  Joseph Asante
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "Inter,sans-serif",
                    marginTop: 2,
                  }}
                >
                  BRIDGE Intelligence · Analyst
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
                  Pro
                </span>
              </div>
            </div>

            {/* Return to website */}
            <button
              onClick={() => setMenuOpen(false)}
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
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "Inter,sans-serif",
                    marginTop: 2,
                  }}
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

            {/* Nav links */}
            {[
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
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => setMenuOpen(false)}
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
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,0.3)",
                      fontFamily: "Inter,sans-serif",
                      marginTop: 2,
                    }}
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
              onClick={() => setMenuOpen(false)}
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
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "rgba(239,68,68,0.75)",
                    fontFamily: "DM Sans,sans-serif",
                  }}
                >
                  Sign Out
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Notifications dropdown */}
      {notifOpen && (
        <div
          style={{
            position: "fixed",
            top: 60,
            right: 12,
            width: 280,
            background: M.surface,
            border: `1px solid ${M.border}`,
            borderRadius: 14,
            boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
            zIndex: 200,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 14px",
              borderBottom: `1px solid ${M.border}`,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: M.text }}>Alerts</span>
            <span
              style={{ fontSize: 11, color: M.accent, fontWeight: 700, cursor: "pointer" }}
              onClick={() => setNotifOpen(false)}
            >
              Mark all read
            </span>
          </div>
          {s.activity.slice(0, 3).map((a, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: 10, padding: "10px 14px", borderBottom: `1px solid ${M.border}` }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: a.sig === "Bullish" ? M.green : M.yellow,
                  marginTop: 4,
                  flexShrink: 0,
                }}
              />
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: M.text, lineHeight: 1.3 }}>{a.h}</div>
                <div style={{ fontSize: 10, color: M.muted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
                  {a.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Page label */}
      <div style={{ padding: "8px 16px 0", flexShrink: 0 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: M.muted,
            letterSpacing: "0.8px",
            textTransform: "uppercase",
            fontFamily: "Inter,sans-serif",
          }}
        >
          {SUB_LABELS[sub]}
        </div>
      </div>

      {/* Page content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "10px 16px 80px", minHeight: 0 }}>
        <MobileAnalytics s={s} sub={sub} />
      </div>

      <MobileBottomNav sub={sub} setSub={setSub} />
      <MSectorDrawer s={s} setS={setS} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
