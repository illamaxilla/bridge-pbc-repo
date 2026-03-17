import { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  LayoutGrid,
  Activity,
  BarChart3,
  Eye,
  FileBarChart,
  Book,
  Settings,
  LogOut,
  ArrowUpRight,
} from "lucide-react";
import { C } from "../constants";
import { SECTORS } from "./data";
import type { WatchlistSector } from "./types";
import { BridgeLogoSmallWhite as BridgeLogo } from "@/components/BridgeLogo";

export interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  active: WatchlistSector;
  setActive: (s: WatchlistSector) => void;
}

export function Sidebar({ collapsed, setCollapsed, active, setActive }: SidebarProps) {
  const NAV = [
    { id: "dashboard", label: "Dashboard", icon: (c: string) => <LayoutGrid size={16} color={c} /> },
    { id: "overview", label: "Market Overview", icon: (c: string) => <Activity size={16} color={c} /> },
    { id: "analytics", label: "Analytics", icon: (c: string) => <BarChart3 size={16} color={c} /> },
    { id: "watchlist", label: "Watchlist", icon: (c: string) => <Eye size={16} color={c} />, active: true },
    { id: "reports", label: "Reports", icon: (c: string) => <FileBarChart size={16} color={c} /> },
    { id: "resources", label: "Resources", icon: (c: string) => <Book size={16} color={c} /> },
    { id: "settings", label: "Settings", icon: (c: string) => <Settings size={16} color={c} /> },
  ];
  const sorted = [...SECTORS].sort((a, b) => b.score - a.score);
  return (
    <div
      style={{
        width: collapsed ? 56 : 220,
        flexShrink: 0,
        background: C.sidebar,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        transition: "width 0.22s ease",
        overflow: "hidden",
      }}
    >
      {/* Logo zone */}
      <div
        style={{
          height: 64,
          display: "flex",
          alignItems: "center",
          padding: "0 14px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          flexShrink: 0,
        }}
      >
        {collapsed ? (
          <div
            style={{
              width: 28,
              height: 28,
              background: C.accent,
              borderRadius: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 800, color: C.primary, fontFamily: "Inter,sans-serif" }}>B</span>
          </div>
        ) : (
          <div style={{ display: "inline-flex", flexDirection: "column", width: 104, flexShrink: 0 }}>
            <BridgeLogo />
            <div
              style={{
                width: 104,
                fontSize: 7,
                fontWeight: 700,
                color: C.accent,
                textTransform: "uppercase",
                fontFamily: "Inter,sans-serif",
                textAlign: "justify",
                textAlignLast: "justify",
                letterSpacing: "0.05em",
                lineHeight: 1.4,
              }}
            >
              Intelligence
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(255,255,255,0.3)",
            padding: 4,
            display: "flex",
            flexShrink: 0,
          }}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Nav zone */}
      <div style={{ padding: "10px 8px", flexShrink: 0 }}>
        {NAV.map((n) => {
          const act = n.active;
          return (
            <div
              key={n.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "8px 8px",
                borderRadius: 6,
                cursor: "pointer",
                background: act ? C.sideAct : "transparent",
                marginBottom: 2,
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              {n.icon(act ? C.accent : "rgba(255,255,255,0.4)")}
              {!collapsed && (
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: act ? 600 : 400,
                    color: act ? C.white : "rgba(255,255,255,0.5)",
                    fontFamily: "DM Sans,sans-serif",
                  }}
                >
                  {n.label}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Sector zone */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 8px 12px", scrollbarWidth: "none" }}>
        {collapsed ? (
          <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "4px 6px 10px" }} />
        ) : (
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "1px",
              color: "rgba(255,255,255,0.2)",
              fontFamily: "Inter,sans-serif",
              padding: "10px 8px 6px",
              textTransform: "uppercase",
            }}
          >
            Sectors
          </div>
        )}
        {sorted.map((s) => {
          const act = active.id === s.id;
          return (
            <div
              key={s.id}
              onClick={() => setActive(s)}
              title={collapsed ? s.short : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: collapsed ? "center" : "space-between",
                padding: collapsed ? "5px 0" : "6px 8px",
                borderRadius: 5,
                cursor: "pointer",
                background: act ? C.sideAct : "transparent",
                marginBottom: 1,
                transition: "background 0.1s",
              }}
            >
              {collapsed ? (
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: act ? "rgba(184,217,53,0.2)" : "rgba(255,255,255,0.05)",
                  }}
                >
                  {(s as any).svgIcon(act ? C.accent : "rgba(255,255,255,0.35)", 14)}
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    {(s as any).svgIcon(act ? C.accent : "rgba(255,255,255,0.3)", 12)}
                    <span
                      style={{
                        fontSize: 11.5,
                        fontWeight: act ? 600 : 400,
                        color: act ? C.white : "rgba(255,255,255,0.45)",
                        fontFamily: "DM Sans,sans-serif",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {s.short}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: act ? C.accent : s.score >= 88 ? "rgba(184,217,53,0.6)" : "rgba(255,255,255,0.25)",
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {s.score}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Exit Dashboard */}
      {!collapsed && (
        <div style={{ margin: "0 10px 6px", flexShrink: 0 }}>
          <button
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 10px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 7,
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <LogOut size={13} color="rgba(255,255,255,0.35)" />
            <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.4)", fontFamily: "DM Sans,sans-serif" }}>
              Return to Website
            </span>
          </button>
        </div>
      )}
      {collapsed && (
        <div style={{ margin: "0 8px 6px", flexShrink: 0, display: "flex", justifyContent: "center" }}>
          <button
            title="Return to Website"
            style={{
              width: 34,
              height: 34,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 7,
              cursor: "pointer",
            }}
          >
            <LogOut size={13} color="rgba(255,255,255,0.3)" />
          </button>
        </div>
      )}

      {/* Upgrade card */}
      {!collapsed && (
        <div
          style={{
            margin: "0 10px 12px",
            background: "linear-gradient(135deg,#1E3327,#152A1F)",
            border: "1px solid rgba(184,217,53,0.15)",
            borderRadius: 8,
            padding: 12,
            flexShrink: 0,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: C.white, fontFamily: "DM Sans,sans-serif", marginBottom: 3 }}>
            Upgrade to Pro
          </div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "Inter,sans-serif", marginBottom: 8, lineHeight: 1.4 }}>
            Full access to all 12 sector analyses
          </div>
          <button
            style={{
              width: "100%",
              background: C.accent,
              border: "none",
              borderRadius: 5,
              padding: "7px 0",
              fontSize: 10,
              fontWeight: 700,
              color: C.primary,
              fontFamily: "Inter,sans-serif",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            Get Access <ArrowUpRight size={10} />
          </button>
        </div>
      )}
    </div>
  );
}
