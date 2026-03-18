import React, { useState, useEffect } from "react";
import {
  Blocks,
  Wallet,
  Cross,
  Cpu,
  GraduationCap,
  Sprout,
  Camera,
  Home,
  Luggage,
  BatteryCharging,
  Factory,
  Truck,
  Bell,
  Search,
  User,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  RefreshCw,
  Activity,
  LayoutGrid,
  Bookmark,
  Settings,
  ArrowUpRight,
  Target,
  Minus,
  Zap,
  Clock,
  Eye,
  BookOpen,
  FileBarChart,
  Book,
  LogOut,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart as RBarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { C, SECTORS, SectorData, sigCol, sigBg, scoreToSig, totalCapAll, compute, genTrend, genVolume } from "./data";

export function Card({ children, style: ex = {} }) {
  const [h, sH] = useState(false);
  return (
    <div
      onMouseEnter={() => sH(true)}
      onMouseLeave={() => sH(false)}
      style={{
        background: "#fff",
        borderRadius: 16,
        border: "1px solid #E5E7EB",
        boxShadow: h ? "0 4px 16px rgba(0,0,0,0.09)" : "0 1px 4px rgba(0,0,0,0.05)",
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
export function Pill({ children, active, onClick, col = undefined }: { children?: React.ReactNode; active?: boolean; onClick?: () => void; col?: string }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "3px 10px",
        borderRadius: 14,
        border: `1px solid ${active ? col || C.accent : "#E5E7EB"}`,
        background: active ? (col ? col + "22" : C.accentBg) : "transparent",
        fontSize: 10,
        fontWeight: active ? 700 : 500,
        color: active ? col || C.primary : C.muted,
        cursor: "pointer",
        fontFamily: "Inter,sans-serif",
        whiteSpace: "nowrap",
        transition: "all .15s",
      }}
    >
      {children}
    </button>
  );
}
export const ChartTip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
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
      {payload.map((p, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 7, height: 7, borderRadius: 2, background: p.stroke || p.fill }} />
          <span>
            {p.name || "Value"}: <strong>{p.value}</strong>
          </span>
        </div>
      ))}
    </div>
  );
};

export function BridgeLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3434.33 932.3"
      style={{ width: 104, height: 28, display: "block" }}
    >
      <defs>
        <style>{`.sl1{stroke:#fff;stroke-width:80px;fill:none;stroke-miterlimit:10;}.sl2{fill:#B8D935;stroke:#1b4d3e;stroke-miterlimit:10;}.sl3{fill:none;stroke:#231f20;stroke-width:5px;stroke-miterlimit:10;}.sl4{fill:#fff;}.sl5{fill:#fff;stroke:#000;stroke-width:.5px;stroke-miterlimit:10;}`}</style>
      </defs>
      <path
        className="sl4"
        d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z"
      />
      <path
        className="sl5"
        d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1Z"
      />
      <path
        className="sl5"
        d="M1488.08,578.65v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"
      />
      <rect className="sl2" x="1427.38" y="17.35" width="205.2" height="145" />
      <rect className="sl4" x="1427.48" y="221.75" width="205.2" height="693.2" rx="9.6" ry="9.6" />
      <path
        className="sl4"
        d="M2757.31,19.09h491.3c5.42,0,9.82,4.4,9.82,9.82v218.7c0,5.42-4.4,9.82-9.82,9.82h-507.36c-56.98,0-108.53,23.02-145.87,60.35-37.34,37.23-60.45,88.79-60.45,145.66,0,113.75,92.37,206.01,206.32,206.01h12.89c2.86,0,5.11,2.25,5.11,5.11v236.7c0,1.13-.92,1.94-1.94,1.94h0c-242.22,0-438.52-195.99-438.52-437.8v-18.51c0-241.81,196.29-437.8,438.52-437.8h0Z"
      />
      <rect className="sl4" x="2812.75" y="339.47" width="216.75" height="572.62" rx="9.6" ry="9.6" />
      <rect className="sl2" x="3083.41" y="339.47" width="175.12" height="257.67" />
      <rect className="sl2" x="3083.41" y="654.42" width="175.12" height="257.67" />
      <circle className="sl3" cx="3385.56" cy="866.94" r="46.27" />
      <path
        className="sl4"
        d="M3404.8,889.32l-10.31-14.71c.25,0,.38-.13.63-.25,2.89-1.26,5.03-3.02,6.54-5.41s2.26-5.15,2.26-8.55c0-5.03-1.76-8.93-5.16-11.82s-8.05-4.27-14.08-4.27h-18.36v44.89h8.3v-13.08h11.94l9.18,13.08h8.93l.13.13ZM3392.85,853.74c1.89,1.51,2.77,3.77,2.77,6.66s-.88,5.03-2.77,6.66-4.65,2.39-8.3,2.39h-9.81c3.65,0,6.41.75,8.3,2.26h0v-.13Z"
      />
      <rect className="sl1" x="40" y="40" width="843.91" height="852.3" rx="36.55" ry="36.55" />
      <polygon className="sl2" points="722.6 322.13 462.28 452.8 201.97 322.75 461.21 192.52 722.6 322.13" />
      <path
        style={{ fill: "#74914a" }}
        d="M197.84,426.78c3.86-.53,7.04.85,10.74,1.41l252.53,125.67c84.54-40,167.66-83.83,251.89-124.84,33.14-11.49,50.09,34.15,18.55,49.11l-259.23,129.08c-10.18,3.72-14.14,2.57-23.85-1.31l-264.23-132.98c-17.04-14.4-7.96-43.2,13.61-46.14Z"
      />
      <path
        className="sl2"
        d="M195.25,558c3.65-.63,7.4-.4,11.08-.22,86.11,40.47,170.4,85.05,255.95,126.78l252.92-126c29.53-7.22,45.44,28.67,22.29,46.49l-270.42,134.42-8.62.31c-91.6-42.21-181.07-89.86-271.7-134.42-18.72-12.06-13.3-43.58,8.5-47.37Z"
      />
    </svg>
  );
}

export const SIDE_NAV = [
  { id: "dashboard", label: "Dashboard", icon: (c) => <LayoutGrid size={16} color={c} /> },
  { id: "overview", label: "Market Overview", icon: (c) => <Activity size={16} color={c} /> },
  { id: "analytics", label: "Analytics", icon: (c) => <BarChart3 size={16} color={c} /> },
  { id: "watchlist", label: "Watchlist", icon: (c) => <Eye size={16} color={c} /> },
  { id: "reports", label: "Reports", icon: (c) => <FileBarChart size={16} color={c} /> },
  { id: "resources", label: "Resources", icon: (c) => <Book size={16} color={c} /> },
  { id: "settings", label: "Settings", icon: (c) => <Settings size={16} color={c} /> },
];

export function Sidebar({ collapsed, setCollapsed, activeSector, setActiveSector }) {
  const [activePage, setActivePage] = useState("overview");
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
      {/* ── Logo zone ── */}
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

      {/* ── Nav zone ── */}
      <div style={{ padding: "10px 8px", flexShrink: 0 }}>
        {SIDE_NAV.map((n) => {
          const act = n.id === activePage;
          return (
            <div
              key={n.id}
              onClick={() => setActivePage(n.id)}
              title={collapsed ? n.label : undefined}
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
                transition: "background 0.1s",
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

      {/* ── Sector zone ── */}
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
        {sorted.map((sec) => {
          const act = activeSector?.id === sec.id;
          return (
            <div
              key={sec.id}
              onClick={() => setActiveSector(sec)}
              title={collapsed ? sec.short : undefined}
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
                  {sec.svgIcon(act ? C.accent : "rgba(255,255,255,0.35)", 14)}
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    {sec.svgIcon(act ? C.accent : "rgba(255,255,255,0.3)", 12)}
                    <span
                      style={{
                        fontSize: 11.5,
                        fontWeight: act ? 600 : 400,
                        color: act ? C.white : "rgba(255,255,255,0.45)",
                        fontFamily: "DM Sans,sans-serif",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {sec.short}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      fontFamily: "Inter,sans-serif",
                      color: act ? C.accent : sec.score >= 88 ? "rgba(184,217,53,0.6)" : "rgba(255,255,255,0.25)",
                    }}
                  >
                    {sec.score}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Return to Website ── */}
      {!collapsed ? (
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
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                color: "rgba(255,255,255,0.4)",
                fontFamily: "DM Sans,sans-serif",
              }}
            >
              Return to Website
            </span>
          </button>
        </div>
      ) : (
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

      {/* ── Upgrade to Pro ── */}
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
          <div
            style={{ fontSize: 11, fontWeight: 700, color: C.white, fontFamily: "DM Sans,sans-serif", marginBottom: 3 }}
          >
            Upgrade to Pro
          </div>
          <div
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.4)",
              fontFamily: "Inter,sans-serif",
              marginBottom: 8,
              lineHeight: 1.4,
            }}
          >
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

export function PortfolioSnapshot({ s }) {
  const SIcon = s.icon;
  const totalV = (s.t1?.length || 0) + (s.t2?.length || 0) + (s.t3?.length || 0);
  const signals = s.activity.filter((a) => a.sig === "Bullish").length * 14 + s.activity.length * 6;
  const rows = [
    {
      label: "Ventures Tracked",
      value: `${totalV} / ${s.totalV}`,
      sub: "identified",
      Icon: Target,
      col: C.teal,
      bg: "rgba(46,90,77,0.08)",
    },
    {
      label: "Active Signals",
      value: `${signals}`,
      sub: "intelligence items",
      Icon: Activity,
      col: C.accent,
      bg: C.accentBg,
    },
    {
      label: "BRIDGE Score",
      value: `${s.score} / 100`,
      sub: scoreToSig(s.score),
      Icon: BarChart3,
      col: C.primary,
      bg: "rgba(27,77,62,0.07)",
    },
  ];
  return (
    <Card style={{ padding: 0, height: "100%" }}>
      <div style={{ padding: "13px 16px", borderBottom: "1px solid #F3F4F6" }}>
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: C.muted,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            fontFamily: "Inter,sans-serif",
          }}
        >
          Sector Portfolio Snapshot
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: C.mid, fontFamily: "DM Sans,sans-serif", marginTop: 2 }}>
          {s.full}
        </div>
      </div>
      <div style={{ display: "flex", height: "calc(100% - 58px)" }}>
        <div
          style={{
            flex: 1,
            padding: "8px 16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          {rows.map((row, i) => (
            <div key={i}>
              {i > 0 && <div style={{ height: 1, background: "#F3F4F6" }} />}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 3, height: 36, borderRadius: 2, background: row.col, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif", marginBottom: 2 }}>
                      {row.label}
                    </div>
                    <div
                      style={{ fontSize: 18, fontWeight: 800, color: C.dark, letterSpacing: "-.5px", lineHeight: 1 }}
                    >
                      {row.value}
                    </div>
                    <div style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
                      {row.sub}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: row.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <row.Icon size={13} color={row.col} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            width: 108,
            background: `linear-gradient(160deg,${C.primary} 0%,#0D3028 100%)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px 10px",
            gap: 10,
            flexShrink: 0,
            borderRadius: "0 12px 12px 0",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SIcon size={17} color={C.accent} />
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-1px", lineHeight: 1 }}>
              ${s.capLow}–{s.capHigh}M
            </div>
            <div
              style={{
                fontSize: 8,
                fontWeight: 700,
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontFamily: "Inter,sans-serif",
                marginTop: 4,
              }}
            >
              Capital Range
            </div>
          </div>
          <div
            style={{
              padding: "4px 10px",
              borderRadius: 20,
              background: "rgba(184,217,53,0.18)",
              border: "1px solid rgba(184,217,53,0.35)",
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 700, color: C.accent, fontFamily: "Inter,sans-serif" }}>
              {s.irrLow}–{s.irrHigh}% IRR
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function PerformanceTrend({ s }) {
  const [filter, setF] = useState("7D");
  const data = genTrend(s, filter);
  return (
    <Card style={{ padding: 0, height: "100%" }}>
      <div
        style={{
          padding: "12px 16px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #F3F4F6",
        }}
      >
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>{s.short} — Opportunity Index</div>
          <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
            Sector momentum · BRIDGE scoring
          </div>
        </div>
        <div style={{ display: "flex", gap: 2, background: "#F3F4F6", borderRadius: 7, padding: 2 }}>
          {["7D", "30D", "90D"].map((v) => (
            <button
              key={v}
              onClick={() => setF(v)}
              style={{
                padding: "3px 8px",
                borderRadius: 5,
                border: "none",
                background: filter === v ? "#fff" : "transparent",
                fontSize: 10,
                fontWeight: 600,
                color: filter === v ? C.primary : C.muted,
                cursor: "pointer",
                boxShadow: filter === v ? "0 1px 3px rgba(0,0,0,0.07)" : "none",
                fontFamily: "Inter,sans-serif",
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: "6px 6px 10px", height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={C.accent} stopOpacity={0.25} />
                <stop offset="95%" stopColor={C.accent} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 9, fill: C.muted, fontFamily: "Inter,sans-serif" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 9, fill: C.muted }} axisLine={false} tickLine={false} domain={["auto", "auto"]} />
            <Tooltip content={<ChartTip />} />
            <ReferenceLine y={s.score} stroke={C.teal} strokeDasharray="4 4" strokeWidth={1} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={C.accent}
              strokeWidth={2.5}
              fill="url(#ag)"
              dot={false}
              activeDot={{ r: 4, fill: C.accent, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function ScaleCard({ s }) {
  const c = compute(s);
  const total = Math.round(totalCapAll());
  const tiers = [
    { label: "Tier I", count: SECTORS.filter((x) => x.score >= 88).length, col: C.accent, bg: C.accentBg },
    {
      label: "Strong",
      count: SECTORS.filter((x) => x.score >= 80 && x.score < 88).length,
      col: C.teal,
      bg: "rgba(46,90,77,0.1)",
    },
    { label: "Develop", count: SECTORS.filter((x) => x.score < 80).length, col: C.muted, bg: "#F3F4F6" },
  ];
  return (
    <Card style={{ padding: "14px 16px", height: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Header */}
      <div>
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: C.muted,
            letterSpacing: "1.2px",
            textTransform: "uppercase",
            fontFamily: "Inter,sans-serif",
            marginBottom: 6,
          }}
        >
          Portfolio-Wide Capital
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, color: C.dark, letterSpacing: "-1.5px", lineHeight: 1 }}>
          ${total}M
        </div>
        <div style={{ fontSize: 11, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 3 }}>
          Across 12 sectors
        </div>
      </div>
      {/* Pipeline bar */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: C.mid, fontFamily: "Inter,sans-serif" }}>
            Pipeline Readiness
          </span>
          <span style={{ fontSize: 11, fontWeight: 800, color: C.primary, fontFamily: "Inter,sans-serif" }}>
            {c.inflow}%
          </span>
        </div>
        <div style={{ height: 10, borderRadius: 6, background: "#EEF0EC", overflow: "hidden", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: `${c.inflow}%`,
              background: `linear-gradient(90deg,${C.primary},${C.accent})`,
              borderRadius: 6,
              transition: "width 0.6s ease",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: C.green, fontFamily: "Inter,sans-serif" }}>
            {c.inflow}% Active
          </span>
          <span style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>{c.outflow}% Pending</span>
        </div>
      </div>
      {/* Score distribution */}
      <div style={{ background: "#F9FAFB", borderRadius: 10, padding: "11px 12px", border: "1px solid #F0F0F0" }}>
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            color: C.muted,
            fontFamily: "Inter,sans-serif",
            marginBottom: 10,
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          Score Distribution
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {tiers.map((t) => (
            <div key={t.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: t.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{ fontSize: 12, fontWeight: 800, color: t.col, fontFamily: "Inter,sans-serif", lineHeight: 1 }}
                >
                  {t.count}
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span style={{ fontSize: 10, fontWeight: 600, color: C.mid, fontFamily: "Inter,sans-serif" }}>
                    {t.label}
                  </span>
                  <span style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>
                    {t.count} sector{t.count !== 1 ? "s" : ""}
                  </span>
                </div>
                <div style={{ height: 3, background: "#E9EAEC", borderRadius: 2, overflow: "hidden" }}>
                  <div
                    style={{ width: `${(t.count / 12) * 100}%`, height: "100%", background: t.col, borderRadius: 2 }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Footer trend */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginTop: "auto",
          padding: "7px 10px",
          borderRadius: 7,
          background: "#F0FAF0",
          border: "1px solid #D1FAE5",
        }}
      >
        <TrendingUp size={13} color={C.green} />
        <span style={{ fontSize: 11, fontWeight: 700, color: C.green, fontFamily: "Inter,sans-serif" }}>
          +{Math.round((s.score - 75) * 0.4)}% vs baseline
        </span>
        <span style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>this sector</span>
      </div>
    </Card>
  );
}

export function IntelligenceTicker({ s }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const vis = 3;
  const conf = Math.round(SECTORS.reduce((a, sec) => a + sec.score, 0) / SECTORS.length);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % (SECTORS.length - vis + 1)), 2800);
    return () => clearInterval(t);
  }, [paused]);
  return (
    <Card style={{ padding: "11px 14px", background: "#FAFDF5", border: "1px solid #D1FAE5" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: C.accentBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={13} color={C.primary} />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.dark }}>BRIDGE Intelligence</div>
            <div style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>Live signals</div>
          </div>
        </div>
        <div
          style={{ flex: 1, overflow: "hidden" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div style={{ display: "flex", gap: 8 }}>
            {SECTORS.slice(idx, idx + vis).map((sec) => {
              const Icon = sec.icon,
                sig = scoreToSig(sec.score);
              return (
                <div
                  key={sec.id}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "6px 10px",
                    background: "#fff",
                    borderRadius: 10,
                    border: `1px solid ${sigBg(sig)}`,
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 6,
                      background: sigBg(sig),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={11} color={sigCol(sig)} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: C.dark,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {sec.short}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 3, marginTop: 1 }}>
                      {sig === "Bullish" ? (
                        <TrendingUp size={9} color={C.green} />
                      ) : (
                        <Minus size={9} color={C.yellow} />
                      )}
                      <span
                        style={{ fontSize: 9, fontWeight: 600, color: sigCol(sig), fontFamily: "Inter,sans-serif" }}
                      >
                        {sig}
                      </span>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 800,
                      color: C.primary,
                      fontFamily: "Inter,sans-serif",
                      flexShrink: 0,
                    }}
                  >
                    {sec.score}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <div
            style={{
              padding: "5px 10px",
              borderRadius: 8,
              background: C.accentBg,
              border: `1px solid ${C.accent}33`,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 9, fontWeight: 700, color: C.primary, fontFamily: "Inter,sans-serif" }}>
              Confidence
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: C.primary, lineHeight: 1 }}>{conf}</div>
            <div style={{ fontSize: 9, color: C.teal, fontFamily: "Inter,sans-serif" }}>Bullish</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <button
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              style={{
                width: 22,
                height: 22,
                borderRadius: 5,
                border: "1px solid #E5E7EB",
                background: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronLeft size={11} color={C.muted} />
            </button>
            <button
              onClick={() => setIdx((i) => Math.min(SECTORS.length - vis, i + 1))}
              style={{
                width: 22,
                height: 22,
                borderRadius: 5,
                border: "1px solid #E5E7EB",
                background: "#fff",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ChevronRight size={11} color={C.muted} />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function DeploymentChart({ s }) {
  const data = genVolume(s);
  const last = data[data.length - 1].deployed,
    prev = data[data.length - 2].deployed;
  const chg = Math.round(((last - prev) / prev) * 100);
  return (
    <Card style={{ padding: "14px 16px", height: "100%", display: "flex", flexDirection: "column", gap: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Capital Deployment</div>
          <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
            Pipeline vs target · 6 months
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 9px",
            borderRadius: 7,
            background: chg >= 0 ? "#DCFCE7" : "#FEE2E2",
            border: `1px solid ${chg >= 0 ? "#BBF7D0" : "#FECACA"}`,
          }}
        >
          {chg >= 0 ? <TrendingUp size={11} color={C.green} /> : <TrendingDown size={11} color={C.red} />}
          <span
            style={{ fontSize: 11, fontWeight: 700, color: chg >= 0 ? C.green : C.red, fontFamily: "Inter,sans-serif" }}
          >
            {chg >= 0 ? "+" : ""}
            {chg}%
          </span>
        </div>
      </div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: C.dark,
          letterSpacing: "-.8px",
          lineHeight: 1,
          marginBottom: 10,
        }}
      >
        {last} <span style={{ fontSize: 12, fontWeight: 400, color: C.muted, letterSpacing: 0 }}>units active</span>
      </div>
      {/* Legend */}
      <div style={{ display: "flex", gap: 14, marginBottom: 8 }}>
        {[
          ["Deployed", C.accent],
          [`Target`, `${C.teal}66`],
        ].map(([l, col]) => (
          <div key={l} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: col }} />
            <span style={{ fontSize: 9, fontWeight: 600, color: C.muted, fontFamily: "Inter,sans-serif" }}>{l}</span>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RBarChart data={data} barSize={13} barGap={3} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 9, fill: C.muted, fontFamily: "Inter,sans-serif" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 9, fill: C.muted }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTip />} />
            <Bar dataKey="deployed" fill={C.accent} radius={[4, 4, 0, 0]} name="Deployed" />
            <Bar dataKey="target" fill={`${C.teal}55`} radius={[4, 4, 0, 0]} name="Target" />
          </RBarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function SubSectors({ s }) {
  const data = s.subSectors.map((ss) => ({ name: ss.name.split(" ")[0], value: ss.pct, full: ss.name }));
  const max = Math.max(...data.map((d) => d.value));
  return (
    <Card style={{ padding: "14px 16px", height: "100%", display: "flex", flexDirection: "column", gap: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Sub-sector Activity</div>
          <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
            {s.subSectors.filter((ss) => ss.pct >= 18).length} active sub-sectors
          </div>
        </div>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: "3px 9px",
            borderRadius: 6,
            background: C.accentBg,
            color: C.primary,
            fontFamily: "Inter,sans-serif",
            border: `1px solid rgba(184,217,53,0.3)`,
          }}
        >
          +{Math.round(s.score * 0.4)}%
        </span>
      </div>
      <div style={{ flex: 1, minHeight: 0, marginBottom: 10 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RBarChart data={data} margin={{ top: 16, right: 4, left: -24, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 9, fill: C.muted, fontFamily: "Inter,sans-serif" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 9, fill: C.muted }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTip />} />
            <Bar dataKey="value" radius={[5, 5, 0, 0]} name="Share %">
              {data.map((d, i) => (
                <Cell key={i} fill={d.value === max ? C.accent : `${C.accent}77`} />
              ))}
            </Bar>
          </RBarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {s.subSectors.map((ss, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "3px 8px",
              borderRadius: 20,
              background: "#F3F5F2",
              border: "1px solid #E5E7EB",
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: i === 0 ? C.accent : C.teal,
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 9, fontWeight: 600, color: C.mid, fontFamily: "Inter,sans-serif" }}>
              {ss.name.split(" ")[0]}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function Sentiment({ s }) {
  const c = compute(s);
  const seg = 22,
    filled = Math.round((c.sentimentScore / 100) * seg);
  const label = c.sentimentScore >= 70 ? "Bullish" : c.sentimentScore >= 45 ? "Neutral" : "Cautious";
  const col = label === "Bullish" ? C.green : label === "Neutral" ? C.yellow : C.red;
  const [time, setT] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const bars = [
    { label: "Activity Signals", val: Math.min(c.sentimentScore + 5, 98), col: C.green },
    { label: "Policy Alignment", val: s.score, col: C.accent },
    { label: "Capital Readiness", val: c.inflow, col: C.teal },
  ];
  return (
    <Card style={{ padding: "14px 16px", height: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Market Sentiment</div>
        <div style={{ fontSize: 11, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>
          Currently <span style={{ fontWeight: 700, color: col }}>{label}</span>
        </div>
      </div>
      {/* Segment bar */}
      <div style={{ display: "flex", gap: 2.5, justifyContent: "center", padding: "4px 0" }}>
        {Array.from({ length: seg }, (_, i) => (
          <div
            key={i}
            style={{
              width: 7,
              height: 30,
              borderRadius: 3,
              background: i < filled ? col : "#EAECEA",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
      {/* Big score */}
      <div style={{ textAlign: "center", lineHeight: 1 }}>
        <div style={{ fontSize: 36, fontWeight: 800, color: C.dark, letterSpacing: "-2px" }}>{c.sentimentScore}%</div>
        <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 3 }}>
          Positive Sentiment Score
        </div>
      </div>
      {/* Progress bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {bars.map(({ label: l, val: v, col: bc }) => (
          <div key={l}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 10, fontWeight: 500, color: C.mid, fontFamily: "Inter,sans-serif" }}>{l}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: C.dark, fontFamily: "Inter,sans-serif" }}>{v}%</span>
            </div>
            <div style={{ height: 6, background: "#F0F0EE", borderRadius: 3, overflow: "hidden" }}>
              <div
                style={{
                  width: `${v}%`,
                  height: "100%",
                  background: bc,
                  borderRadius: 3,
                  transition: "width 0.5s ease",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: "auto" }}>
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: C.green,
            boxShadow: `0 0 0 3px rgba(22,163,74,0.15)`,
          }}
        />
        <span style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>
          Updated {time.toLocaleTimeString()}
        </span>
      </div>
    </Card>
  );
}

export function ComparisonTable({ s, setS }) {
  const [sort, setSort] = useState({ col: "score", dir: "desc" });
  const [filter, setFilter] = useState("all");
  const sorted = [...SECTORS]
    .filter((sec) => (filter === "all" ? true : filter === "bullish" ? sec.score >= 82 : sec.score < 80))
    .sort((a, b) => (sort.dir === "desc" ? b[sort.col] - a[sort.col] : a[sort.col] - b[sort.col]));
  const sortBy = (col) => setSort((s) => ({ col, dir: s.col === col && s.dir === "desc" ? "asc" : "desc" }));
  return (
    <Card style={{ padding: 0, height: "100%" }}>
      <div style={{ padding: "11px 14px", borderBottom: "1px solid #F3F4F6" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>All Sectors Comparison</div>
            <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
              {sorted.length} sectors · BRIDGE portfolio
            </div>
          </div>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 10px",
              borderRadius: 7,
              border: "1px solid #E5E7EB",
              background: "#fff",
              fontSize: 10,
              color: C.muted,
              cursor: "pointer",
              fontFamily: "Inter,sans-serif",
            }}
          >
            <Download size={11} />
            Export
          </button>
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {[
            ["all", "All"],
            ["bullish", "Bullish"],
            ["developing", "Developing"],
          ].map(([v, l]) => (
            <Pill key={v} active={filter === v} onClick={() => setFilter(v)}>
              {l}
            </Pill>
          ))}
        </div>
      </div>
      <div style={{ overflowY: "auto", maxHeight: 290 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#F9FAFB", position: "sticky", top: 0 }}>
              {[
                ["Sector", "short"],
                ["Capital", "capHigh"],
                ["IRR", "irrHigh"],
                ["Score", "score"],
                ["Signal", null],
              ].map(([l, col]) => (
                <th
                  key={l}
                  onClick={col ? () => sortBy(col) : undefined}
                  style={{
                    padding: "7px 10px",
                    fontSize: 10,
                    fontWeight: 700,
                    color: C.muted,
                    fontFamily: "Inter,sans-serif",
                    textAlign: "left",
                    cursor: col ? "pointer" : "default",
                    whiteSpace: "nowrap",
                  }}
                >
                  {l}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((sec) => {
              const Icon = sec.icon,
                act = sec.id === s.id,
                sig = scoreToSig(sec.score);
              return (
                <tr
                  key={sec.id}
                  onClick={() => setS(sec)}
                  style={{
                    borderBottom: `1px solid ${act ? "#D1FAE5" : "#F3F4F6"}`,
                    cursor: "pointer",
                    background: act ? `${C.accent}12` : "transparent",
                    transition: "background .1s",
                  }}
                  onMouseEnter={(e) => {
                    if (!act) e.currentTarget.style.background = "#F9FAFB";
                  }}
                  onMouseLeave={(e) => {
                    if (!act) e.currentTarget.style.background = "transparent";
                  }}
                >
                  <td style={{ padding: "7px 10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 5,
                          background: act ? C.accentBg : "#F3F5F2",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={11} color={act ? C.primary : C.teal} />
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: act ? 700 : 500,
                          color: C.dark,
                          fontFamily: "Inter,sans-serif",
                        }}
                      >
                        {sec.short}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "7px 10px" }}>
                    <span style={{ fontSize: 11, color: C.dark, fontFamily: "Inter,sans-serif" }}>
                      ${sec.capLow}–{sec.capHigh}M
                    </span>
                  </td>
                  <td style={{ padding: "7px 10px" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.green, fontFamily: "Inter,sans-serif" }}>
                      {sec.irrLow}–{sec.irrHigh}%
                    </span>
                  </td>
                  <td style={{ padding: "7px 10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 40, height: 4, background: "#F3F4F6", borderRadius: 2, overflow: "hidden" }}>
                        <div
                          style={{ width: `${sec.score}%`, height: "100%", background: C.accent, borderRadius: 2 }}
                        />
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: C.primary, fontFamily: "Inter,sans-serif" }}>
                        {sec.score}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "7px 10px" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: sigCol(sig) }} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export function VenturesFeed({ s }) {
  const [tier, setTier] = useState("t1");
  const ventures = s[tier] || [];
  const SIcon = s.icon;
  const tc =
    tier === "t1"
      ? { bg: C.accentBg, col: C.primary, label: "Tier I" }
      : tier === "t2"
        ? { bg: "rgba(46,90,77,0.1)", col: C.teal, label: "Tier II" }
        : { bg: "rgba(107,114,128,0.08)", col: C.muted, label: "Tier III" };
  return (
    <Card style={{ padding: "13px 14px", height: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Priority Ventures</div>
          <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
            {ventures.length} ventures · {s.short}
          </div>
        </div>
        <div style={{ display: "flex", gap: 2, background: "#F3F4F6", borderRadius: 7, padding: 2 }}>
          {[
            ["t1", "T-I"],
            ["t2", "T-II"],
            ["t3", "T-III"],
          ].map(([v, l]) => (
            <button
              key={v}
              onClick={() => setTier(v)}
              style={{
                padding: "3px 7px",
                borderRadius: 5,
                border: "none",
                background: tier === v ? "#fff" : "transparent",
                fontSize: 9,
                fontWeight: 700,
                color: tier === v ? C.primary : C.muted,
                cursor: "pointer",
                fontFamily: "Inter,sans-serif",
                boxShadow: tier === v ? "0 1px 3px rgba(0,0,0,0.07)" : "none",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
        {ventures.map((v, i) => {
          const rc = v.risk === "LOW" ? C.green : v.risk === "MEDIUM" ? C.yellow : C.red;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 8px",
                borderRadius: 8,
                border: "1px solid #F3F4F6",
                cursor: "pointer",
                transition: "all .1s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#F9FAFB";
                e.currentTarget.style.borderColor = "#E5E7EB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "#F3F4F6";
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 6,
                  background: "#F3F5F2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <SIcon size={11} color={C.teal} strokeWidth={1.5} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: C.dark,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {v.name}
                </div>
                <div style={{ display: "flex", gap: 4, marginTop: 2 }}>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      padding: "1px 4px",
                      borderRadius: 3,
                      background: tc.bg,
                      color: tc.col,
                      fontFamily: "Inter,sans-serif",
                    }}
                  >
                    {tc.label}
                  </span>
                  <span style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>{v.cap}</span>
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.green, fontFamily: "Inter,sans-serif" }}>
                  {v.irr}
                </div>
                <div style={{ fontSize: 9, fontWeight: 700, color: rc, fontFamily: "Inter,sans-serif" }}>{v.risk}</div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export function SignalFeed({ s }) {
  const [sigFilter, setSF] = useState("all");
  const [query, setQ] = useState("");
  const all = [...s.activity, ...SECTORS.filter((sec) => sec.id !== s.id).flatMap((sec) => sec.activity.slice(0, 1))];
  const filtered = all
    .filter((a) => sigFilter === "all" || a.sig === sigFilter)
    .filter((a) => !query || a.h.toLowerCase().includes(query.toLowerCase()));
  return (
    <Card style={{ padding: 0 }}>
      <div style={{ padding: "11px 14px", borderBottom: "1px solid #F3F4F6" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Sector Intelligence Feed</div>
            <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>
              {filtered.length} signals · synced with dashboard
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.green }} />
            <span style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>Live</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "#F9FAFB",
              border: "1px solid #E5E7EB",
              borderRadius: 7,
              padding: "5px 10px",
            }}
          >
            <Search size={11} color={C.muted} />
            <input
              value={query}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search signals…"
              style={{
                background: "none",
                border: "none",
                outline: "none",
                fontSize: 11,
                color: C.mid,
                fontFamily: "Inter,sans-serif",
                width: "100%",
              }}
            />
          </div>
          {[
            ["all", "All"],
            ["Bullish", "Bullish"],
            ["Watch", "Watch"],
          ].map(([v, l]) => (
            <Pill
              key={v}
              active={sigFilter === v}
              col={v === "Bullish" ? C.green : v === "Watch" ? C.yellow : undefined}
              onClick={() => setSF(v)}
            >
              {l}
            </Pill>
          ))}
        </div>
      </div>
      <div>
        {filtered.map((a, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 11,
              padding: "10px 14px",
              borderBottom: "1px solid #F9FAFB",
              cursor: "pointer",
              transition: "background .1s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#FAFAFA")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: "#F3F5F2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: 14,
                color: sigCol(a.sig),
              }}
            >
              {a.sig === "Bullish" ? "↑" : a.sig === "Bearish" ? "↓" : "→"}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.dark, lineHeight: 1.35, marginBottom: 3 }}>
                {a.h}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>{a.date}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: sigCol(a.sig), fontFamily: "Inter,sans-serif" }}>
                  {a.sig}
                </span>
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 11,
                    fontWeight: 700,
                    color: sigCol(a.sig),
                    fontFamily: "Inter,sans-serif",
                  }}
                >
                  {a.amt}
                </span>
              </div>
            </div>
            <div style={{ alignSelf: "center", flexShrink: 0 }}>
              <div style={{ padding: "2px 7px", borderRadius: 5, background: "#F3F5F2", border: "1px solid #E5E7EB" }}>
                <span style={{ fontSize: 9, color: C.muted, fontFamily: "Inter,sans-serif" }}>
                  {a.sig === "Bullish" ? "Opportunity" : a.sig === "Bearish" ? "Alert" : "Monitoring"}
                </span>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div
            style={{
              padding: "24px",
              textAlign: "center",
              color: C.muted,
              fontSize: 12,
              fontFamily: "Inter,sans-serif",
            }}
          >
            No signals match your filter.
          </div>
        )}
      </div>
    </Card>
  );
}

export function DesktopDashboard() {
  const [s, setS] = useState(SECTORS[0]);
  const [collapsed, setCollapsed] = useState(false);
  const [notif, setNotif] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => setSyncing(false), 1400);
  };
  const SIcon = s.icon;
  const dynamicMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" });
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        background: C.bg,
        fontFamily: "'DM Sans',sans-serif",
      }}
    >
      <style>{`*{box-sizing:border-box;}::-webkit-scrollbar{width:4px;height:4px;}::-webkit-scrollbar-thumb{background:#E5E7EB;border-radius:4px;}`}</style>
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        activeSector={s}
        setActiveSector={(sec) => setS(sec || SECTORS[0])}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
        {/* ── Top Navigation Header ── */}
        <div
          style={{
            background: "#fff",
            borderBottom: "1px solid #E5E7EB",
            padding: "0 20px",
            display: "flex",
            alignItems: "center",
            gap: 12,
            height: 56,
            flexShrink: 0,
            boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
          }}
        >
          {/* LEFT — Title + Divider + Sector Pill */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.dark }}>Market Overview</div>
              <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>{dynamicMonth}</div>
            </div>
            <div style={{ width: 1, height: 28, background: C.line, flexShrink: 0 }} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "3px 10px",
                borderRadius: 7,
                background: C.accentBg,
                border: `1px solid rgba(184,217,53,0.27)`,
              }}
            >
              <SIcon size={11} color={C.primary} />
              <span style={{ fontSize: 10, fontWeight: 700, color: C.primary, fontFamily: "Inter,sans-serif" }}>
                {s.short}
              </span>
            </div>
          </div>

          {/* CENTER-RIGHT — Search */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 7 }}>
            <div
              style={{
                width: 380,
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: 9,
                padding: "7px 11px",
              }}
            >
              <Search size={13} color={C.muted} />
              <input
                placeholder="Search sectors, ventures, signals…"
                style={{
                  background: "none",
                  border: "none",
                  outline: "none",
                  fontSize: 12,
                  color: C.mid,
                  fontFamily: "Inter,sans-serif",
                  width: "100%",
                }}
              />
            </div>

            {/* Notifications Bell */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setNotif((o) => !o)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9,
                  border: "1px solid #E5E7EB",
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <Bell size={15} color={C.mid} />
                <div
                  style={{
                    position: "absolute",
                    top: 7,
                    right: 7,
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: C.red,
                    border: "2px solid #fff",
                  }}
                />
              </button>
              {notif && (
                <div
                  style={{
                    position: "absolute",
                    top: 44,
                    right: 0,
                    width: 280,
                    background: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: 12,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    zIndex: 99,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "11px 14px",
                      borderBottom: "1px solid #E5E7EB",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 700, color: C.dark }}>Alerts</span>
                    <span
                      style={{ fontSize: 11, color: C.accent, cursor: "pointer", fontWeight: 600 }}
                      onClick={() => setNotif(false)}
                    >
                      Mark all read
                    </span>
                  </div>
                  {s.activity.slice(0, 3).map((a, i) => (
                    <div
                      key={i}
                      style={{ display: "flex", gap: 9, padding: "10px 14px", borderBottom: "1px solid #F3F4F6" }}
                    >
                      <div
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: sigCol(a.sig),
                          marginTop: 4,
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: C.dark, lineHeight: 1.3 }}>{a.h}</div>
                        <div style={{ fontSize: 10, color: C.muted, marginTop: 2, fontFamily: "Inter,sans-serif" }}>
                          {a.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleSync}
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                border: "1px solid #E5E7EB",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <RefreshCw size={14} color={C.mid} className={syncing ? "spin" : ""} />
            </button>

            {/* User Profile Chip */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 11px",
                border: "1px solid #E5E7EB",
                borderRadius: 9,
                cursor: "pointer",
                background: "#fff",
              }}
            >
              <div
                style={{
                  width: 27,
                  height: 27,
                  borderRadius: "50%",
                  background: "rgba(184,217,53,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <User size={13} color={C.primary} />
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.dark, lineHeight: 1 }}>Joseph A.</div>
                <div style={{ fontSize: 10, color: C.muted, fontFamily: "Inter,sans-serif" }}>Full Access</div>
              </div>
              <ChevronDown size={11} color={C.muted} />
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 0.8fr", gap: 12, marginBottom: 12, height: 285 }}
          >
            <PortfolioSnapshot s={s} />
            <PerformanceTrend s={s} />
            <ScaleCard s={s} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <IntelligenceTicker s={s} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12, height: 310 }}>
            <DeploymentChart s={s} />
            <SubSectors s={s} />
            <Sentiment s={s} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 12, marginBottom: 12, height: 375 }}>
            <ComparisonTable s={s} setS={setS} />
            <VenturesFeed s={s} />
          </div>
          <SignalFeed s={s} />
        </div>

        {/* ── Status Bar ── */}
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
          {["12 Sectors", "174 Ventures", `Active: ${s.full}`, "Data: Mar 2026"].map((label, i) => (
            <React.Fragment key={i}>
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.18)",
                  marginRight: 14,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                ·
              </span>
              <span
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.35)",
                  marginRight: 14,
                  fontFamily: "Inter,sans-serif",
                }}
              >
                {label}
              </span>
            </React.Fragment>
          ))}
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
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#B8D935",
                  boxShadow: "0 0 5px #B8D935",
                }}
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
      </div>
    </div>
  );
}
