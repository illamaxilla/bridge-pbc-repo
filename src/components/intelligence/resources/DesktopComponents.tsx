import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  FileText,
  Bookmark,
  BarChart3,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  Bell,
  Search,
  ArrowUpRight,
  Eye,
  Download,
  LayoutGrid,
  Activity,
  User,
  List,
  Filter,
  X,
  Info,
  Settings,
  Check,
  AlertCircle,
  LogOut,
  RefreshCw,
  BookOpen,
} from "lucide-react";
import { C, SECTORS, type Sector } from "../constants";
import {
  DM,
  RESOURCES,
  ACTIVITY_DATA,
  TYPE_META,
  STATUS_STYLE,
  CATEGORIES,
  type Resource,
} from "./data";

const BookmarkIcon = Bookmark;

/* ─── BRIDGE LOGO ──────────────────────────────────────────────────────── */
export function BridgeLogo() {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 3434.33 932.3"
        style={{ width: 104, height: 28, display: "block", marginBottom: 6 }}
      >
        <defs>
          <style>{`
          .cls-1{stroke:#fff;stroke-width:80px;}
          .cls-1,.cls-2,.cls-3,.cls-4{stroke-miterlimit:10;}
          .cls-1,.cls-3{fill:none;}
          .cls-2{stroke:#1b4d3e;}
          .cls-2,.cls-5{fill:#B8D935;}
          .cls-3{stroke:#231f20;stroke-width:5px;}
          .cls-6,.cls-4{fill:#fff;}
          .cls-4{stroke:#000;stroke-width:.5px;}
          .cls-8{fill:#fff;}
        `}</style>
        </defs>
        <path className="cls-6" d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z" />
        <path className="cls-4" d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1Z" />
        <path className="cls-4" d="M1488.08,578.65v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z" />
        <rect className="cls-5" x="1427.38" y="17.35" width="205.2" height="145" />
        <rect className="cls-6" x="1427.48" y="221.75" width="205.2" height="693.2" rx="9.6" ry="9.6" />
        <path className="cls-6" d="M2757.31,19.09h491.3c5.42,0,9.82,4.4,9.82,9.82v218.7c0,5.42-4.4,9.82-9.82,9.82h-507.36c-56.98,0-108.53,23.02-145.87,60.35-37.34,37.23-60.45,88.79-60.45,145.66,0,113.75,92.37,206.01,206.32,206.01h12.89c2.86,0,5.11,2.25,5.11,5.11v236.7c0,1.13-.92,1.94-1.94,1.94h0c-242.22,0-438.52-195.99-438.52-437.8v-18.51c0-241.81,196.29-437.8,438.52-437.8h0Z" />
        <rect className="cls-6" x="2812.75" y="339.47" width="216.75" height="572.62" rx="9.6" ry="9.6" />
        <rect className="cls-5" x="3083.41" y="339.47" width="175.12" height="257.67" />
        <rect className="cls-5" x="3083.41" y="654.42" width="175.12" height="257.67" />
        <circle className="cls-3" cx="3385.56" cy="866.94" r="46.27" />
        <path className="cls-8" d="M3404.8,889.32l-10.31-14.71c.25,0,.38-.13.63-.25,2.89-1.26,5.03-3.02,6.54-5.41s2.26-5.15,2.26-8.55c0-5.03-1.76-8.93-5.16-11.82s-8.05-4.27-14.08-4.27h-18.36v44.89h8.3v-13.08h11.94l9.18,13.08h8.93l.13.13ZM3392.85,853.74c1.89,1.51,2.77,3.77,2.77,6.66s-.88,5.03-2.77,6.66-4.65,2.39-8.3,2.39h-9.81v-17.85h9.81c3.65,0,6.41.75,8.3,2.26h0v-.13Z" />
        <rect className="cls-1" x="40" y="40" width="843.91" height="852.3" rx="36.55" ry="36.55" />
        <polygon className="cls-2" points="722.6 322.13 462.28 452.8 201.97 322.75 461.21 192.52 722.6 322.13" />
        <path style={{ fill: "#74914a" }} d="M197.84,426.78c3.86-.53,7.04.85,10.74,1.41l252.53,125.67c84.54-40,167.66-83.83,251.89-124.84,33.14-11.49,50.09,34.15,18.55,49.11l-259.23,129.08c-10.18,3.72-14.14,2.57-23.85-1.31l-264.23-132.98c-17.04-14.4-7.96-43.2,13.61-46.14Z" />
        <path className="cls-5" d="M195.25,558c3.65-.63,7.4-.4,11.08-.22,86.11,40.47,170.4,85.05,255.95,126.78l252.92-126c29.53-7.22,45.44,28.67,22.29,46.49l-270.42,134.42-8.62.31c-91.6-42.21-181.07-89.86-271.7-134.42-18.72-12.06-13.3-43.58,8.5-47.37Z" />
      </svg>
    </div>
  );
}

/* ─── SIDEBAR ──────────────────────────────────────────────────────────── */
interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  activeSector: Sector | null;
  setActiveSector: (s: Sector | null) => void;
}

export function Sidebar({ collapsed, setCollapsed, activeSector, setActiveSector }: SidebarProps) {
  const [activePage, setActivePage] = useState("resources");
  const NAV = [
    { id: "dashboard", label: "Dashboard", icon: (c: string) => <LayoutGrid size={16} color={c} /> },
    { id: "overview", label: "Market Overview", icon: (c: string) => <Activity size={16} color={c} /> },
    { id: "analytics", label: "Analytics", icon: (c: string) => <BarChart3 size={16} color={c} /> },
    { id: "watchlist", label: "Watchlist", icon: (c: string) => <Eye size={16} color={c} /> },
    { id: "reports", label: "Reports", icon: (c: string) => <FileText size={16} color={c} /> },
    {
      id: "resources",
      label: "Resources",
      icon: (c: string) => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        </svg>
      ),
    },
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
      <div style={{ height: 64, display: "flex", alignItems: "center", padding: "0 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
        {collapsed ? (
          <div style={{ width: 28, height: 28, background: C.accent, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: C.primary, fontFamily: "Inter,sans-serif" }}>B</span>
          </div>
        ) : (
          <div style={{ display: "inline-flex", flexDirection: "column", width: 104, flexShrink: 0 }}>
            <BridgeLogo />
            <div style={{ width: 104, fontSize: 7, fontWeight: 700, color: C.accent, textTransform: "uppercase", fontFamily: "Inter,sans-serif", textAlign: "justify", textAlignLast: "justify", letterSpacing: "0.05em", lineHeight: 1.4 }}>
              Intelligence
            </div>
          </div>
        )}
        <button onClick={() => setCollapsed(!collapsed)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", padding: 4, display: "flex", flexShrink: 0 }}>
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
      <div style={{ padding: "10px 8px", flexShrink: 0 }}>
        {NAV.map((n) => {
          const act = n.id === activePage;
          return (
            <div key={n.id} onClick={() => setActivePage(n.id)} title={collapsed ? n.label : undefined} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 8px", borderRadius: 6, cursor: "pointer", background: act ? C.sideAct : "transparent", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", transition: "background 0.1s" }}>
              {n.icon(act ? C.accent : "rgba(255,255,255,0.4)")}
              {!collapsed && (
                <span style={{ fontSize: 13, fontWeight: act ? 600 : 400, color: act ? C.white : "rgba(255,255,255,0.5)", fontFamily: "DM Sans,sans-serif" }}>{n.label}</span>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 8px 12px", scrollbarWidth: "none" }}>
        {collapsed ? (
          <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "4px 6px 10px" }} />
        ) : (
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "1px", color: "rgba(255,255,255,0.2)", fontFamily: "Inter,sans-serif", padding: "10px 8px 6px", textTransform: "uppercase" }}>Sectors</div>
        )}
        {sorted.map((s) => {
          const act = activeSector?.id === s.id;
          return (
            <div key={s.id} onClick={() => setActiveSector(act ? null : s)} title={collapsed ? s.short : undefined} style={{ display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "space-between", padding: collapsed ? "5px 0" : "6px 8px", borderRadius: 5, cursor: "pointer", background: act ? C.sideAct : "transparent", marginBottom: 1, transition: "background 0.1s" }}>
              {collapsed ? (
                <div style={{ width: 28, height: 28, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", background: act ? "rgba(184,217,53,0.2)" : "rgba(255,255,255,0.05)" }}>
                  {s.svgIcon(act ? C.accent : "rgba(255,255,255,0.35)", 14)}
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    {s.svgIcon(act ? C.accent : "rgba(255,255,255,0.3)", 12)}
                    <span style={{ fontSize: 11.5, fontWeight: act ? 600 : 400, color: act ? C.white : "rgba(255,255,255,0.45)", fontFamily: "DM Sans,sans-serif", whiteSpace: "nowrap" }}>{s.short}</span>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "Inter,sans-serif", color: act ? C.accent : s.score >= 88 ? "rgba(184,217,53,0.6)" : "rgba(255,255,255,0.25)" }}>{s.score}</span>
                </>
              )}
            </div>
          );
        })}
      </div>
      {!collapsed ? (
        <div style={{ margin: "0 10px 6px", flexShrink: 0 }}>
          <button style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "9px 10px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 7, cursor: "pointer", textAlign: "left" }}>
            <LogOut size={13} color="rgba(255,255,255,0.35)" />
            <span style={{ fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.4)", fontFamily: "DM Sans,sans-serif" }}>Return to Website</span>
          </button>
        </div>
      ) : (
        <div style={{ margin: "0 8px 6px", flexShrink: 0, display: "flex", justifyContent: "center" }}>
          <button title="Return to Website" style={{ width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 7, cursor: "pointer" }}>
            <LogOut size={13} color="rgba(255,255,255,0.3)" />
          </button>
        </div>
      )}
      {!collapsed && (
        <div style={{ margin: "0 10px 12px", background: "linear-gradient(135deg,#1E3327,#152A1F)", border: "1px solid rgba(184,217,53,0.15)", borderRadius: 8, padding: 12, flexShrink: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.white, fontFamily: "DM Sans,sans-serif", marginBottom: 3 }}>Upgrade to Pro</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "Inter,sans-serif", marginBottom: 8, lineHeight: 1.4 }}>Full access to all 12 sector analyses</div>
          <button style={{ width: "100%", background: C.accent, border: "none", borderRadius: 5, padding: "7px 0", fontSize: 10, fontWeight: 700, color: C.primary, fontFamily: "Inter,sans-serif", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
            Get Access <ArrowUpRight size={10} />
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── HEADER ───────────────────────────────────────────────────────────── */
interface HeaderProps {
  activeSector: Sector | null;
}

export function Header({ activeSector }: HeaderProps) {
  const [notif, setNotif] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const handleSync = () => { setSyncing(true); setTimeout(() => setSyncing(false), 1400); };
  const month = new Date().toLocaleString("default", { month: "long", year: "numeric" });
  const NOTIFS = [
    { h: "Agriculture sector signal updated", date: "Mar 2026", sig: "Bullish" },
    { h: "New GIPC policy brief published", date: "Mar 2026", sig: "Neutral" },
    { h: "Financial Inclusion score revised to 91", date: "Feb 2026", sig: "Bullish" },
  ];
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 20px", display: "flex", alignItems: "center", gap: 12, height: 56, flexShrink: 0, boxShadow: "0 1px 0 rgba(0,0,0,0.04)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", fontFamily: "DM Sans,sans-serif" }}>Resources</div>
          <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>{month}</div>
        </div>
        {activeSector && (
          <>
            <div style={{ width: 1, height: 28, background: "#E5E7EB" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 10px", borderRadius: 7, background: "#EBF5B0", border: "1px solid rgba(184,217,53,0.27)" }}>
              {activeSector.svgIcon("#1B4D3E", 11)}
              <span style={{ fontSize: 10, fontWeight: 700, color: "#1B4D3E", fontFamily: "Inter,sans-serif" }}>{activeSector.short}</span>
            </div>
          </>
        )}
      </div>
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 7 }}>
        <div style={{ width: 380, display: "flex", alignItems: "center", gap: 7, background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 9, padding: "7px 11px" }}>
          <Search size={13} color="#6B7280" />
          <input placeholder="Search reports, signals\u2026" style={{ background: "none", border: "none", outline: "none", fontSize: 12, color: "#374151", fontFamily: "Inter,sans-serif", width: "100%" }} />
        </div>
        <div style={{ position: "relative" }}>
          <button onClick={() => setNotif((o) => !o)} style={{ width: 36, height: 36, borderRadius: 9, border: "1px solid #E5E7EB", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
            <Bell size={15} color="#374151" />
            <div style={{ position: "absolute", top: 7, right: 7, width: 7, height: 7, borderRadius: "50%", background: "#DC2626", border: "2px solid #fff" }} />
          </button>
          {notif && (
            <div style={{ position: "absolute", top: 44, right: 0, width: 280, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 99, overflow: "hidden" }}>
              <div style={{ padding: "11px 14px", borderBottom: "1px solid #E5E7EB", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#111827", fontFamily: "DM Sans,sans-serif" }}>Alerts</span>
                <span style={{ fontSize: 11, color: "#B8D935", cursor: "pointer", fontWeight: 600, fontFamily: "Inter,sans-serif" }} onClick={() => setNotif(false)}>Mark all read</span>
              </div>
              {NOTIFS.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 9, padding: "10px 14px", borderBottom: "1px solid #F3F4F6" }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: a.sig === "Bullish" ? "#16A34A" : "#CA8A04", marginTop: 4, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#111827", lineHeight: 1.3, fontFamily: "DM Sans,sans-serif" }}>{a.h}</div>
                    <div style={{ fontSize: 10, color: "#6B7280", marginTop: 2, fontFamily: "Inter,sans-serif" }}>{a.date}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <button onClick={handleSync} style={{ width: 36, height: 36, borderRadius: 9, border: "1px solid #E5E7EB", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <RefreshCw size={14} color="#374151" className={syncing ? "spin" : ""} />
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 11px", border: "1px solid #E5E7EB", borderRadius: 9, cursor: "pointer", background: "#fff" }}>
          <div style={{ width: 27, height: 27, borderRadius: "50%", background: "rgba(184,217,53,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <User size={13} color="#1B4D3E" />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#111827", lineHeight: 1, fontFamily: "DM Sans,sans-serif" }}>Joseph A.</div>
            <div style={{ fontSize: 10, color: "#6B7280", fontFamily: "Inter,sans-serif" }}>Full Access</div>
          </div>
          <ChevronDown size={11} color="#6B7280" />
        </div>
      </div>
    </div>
  );
}

/* ─── REVENUE CARD ─────────────────────────────────────────────────────── */
interface RevenueCardProps {
  label: string;
  amount: string;
  badge: string;
  up: boolean;
  context: string;
  highlight: string;
  suffix: string;
  filter: string;
  setFilter: (f: string) => void;
  filters: string[];
}

export function RevenueCard({ label, amount, badge, up, context, highlight, suffix, filter, setFilter, filters }: RevenueCardProps) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: C.bg, borderRadius: 10, padding: "14px", border: `1px solid ${C.line}`, position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.5px", color: C.muted, fontFamily: "Inter,sans-serif", textTransform: "uppercase" }}>{label}</span>
        <div style={{ position: "relative" }}>
          <button onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "9px", fontWeight: "600", color: C.muted, fontFamily: "Inter,sans-serif", background: C.white, border: `1px solid ${C.line}`, borderRadius: 5, padding: "3px 8px", cursor: "pointer" }}>
            {filter} <ChevronDown size={9} />
          </button>
          {open && (
            <div style={{ position: "absolute", top: "calc(100% + 4px)", right: 0, background: C.white, border: `1px solid ${C.line}`, borderRadius: 7, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", zIndex: 50, overflow: "hidden", minWidth: 90 }}>
              {filters.map((f) => (
                <div key={f} onClick={() => { setFilter(f); setOpen(false); }} style={{ padding: "7px 12px", fontSize: "11px", color: f === filter ? C.primary : C.mid, fontWeight: f === filter ? "600" : "400", fontFamily: "Inter,sans-serif", cursor: "pointer", background: f === filter ? `${C.primary}08` : "transparent", display: "flex", alignItems: "center", gap: 6 }}>
                  {f === filter && <Check size={9} color={C.primary} />}{f}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginBottom: 8 }}>
        <div style={{ fontSize: "24px", fontWeight: "800", color: C.dark, fontFamily: "DM Sans,sans-serif", letterSpacing: "-0.8px", lineHeight: 1 }}>{amount}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 3, marginBottom: 2 }}>
          {up ? <TrendingUp size={9} color={C.green} /> : <TrendingDown size={9} color={C.red} />}
          <span style={{ fontSize: "9px", fontWeight: "700", color: up ? C.green : C.red, fontFamily: "Inter,sans-serif" }}>{badge}</span>
        </div>
      </div>
      <p style={{ fontSize: "10px", color: C.muted, fontFamily: "Inter,sans-serif", lineHeight: 1.5, margin: 0 }}>
        {context} <strong style={{ color: C.dark }}>{highlight}</strong> {suffix}
      </p>
    </div>
  );
}

/* ─── ANALYTICS PANEL ──────────────────────────────────────────────────── */
interface AnalyticsPanelProps {
  activeSector: Sector | null;
}

export function AnalyticsPanel({ activeSector }: AnalyticsPanelProps) {
  const [weekFilter, setWeekFilter] = useState("Week");
  const [monthFilter, setMonthFilter] = useState("Month");
  const [hovBar, setHovBar] = useState<number | null>(null);
  const maxActivity = Math.max(...ACTIVITY_DATA.map((d) => d.count));
  const weeklyRevenue = activeSector ? (activeSector.score * 18200).toLocaleString() : "2,184,000";
  const monthlyRevenue = activeSector ? (activeSector.score * 74800).toLocaleString() : "8,976,000";
  const weeklyUp = true;
  const monthlyUp = false;
  const sortedSectors = [...SECTORS].sort((a, b) => b.score - a.score);
  const sectorBarColors = ["#B8D935","#1B4D3E","#2E5A4D","#7AAF1E","#3D7A5E","#B8D935","#164030","#4E9470","#2E5A4D","#8FBF28","#1B4D3E","#6BAF50"];
  const FILTERS = ["Today", "Week", "Month", "Quarter", "Year"];
  return (
    <div style={{ width: 300, flexShrink: 0, background: C.white, borderRight: `1px solid ${C.line}`, display: "flex", flexDirection: "column", height: "100%", overflowY: "auto", scrollbarWidth: "none" }}>
      <div style={{ padding: "16px 18px 12px", borderBottom: `1px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <span style={{ fontSize: "10px", fontWeight: "800", letterSpacing: "1.2px", color: C.dark, fontFamily: "Inter,sans-serif", textTransform: "uppercase" }}>Analytics</span>
        <Info size={13} color={C.muted} style={{ cursor: "pointer" }} />
      </div>
      <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
        <RevenueCard label="Weekly Revenue" amount={`$${weeklyRevenue}`} badge="+8.4%" up={weeklyUp} context="Market activity generated an estimated" highlight={`$${weeklyRevenue}`} suffix="this week across tracked sectors." filter={weekFilter} setFilter={setWeekFilter} filters={FILTERS} />
        <RevenueCard label="Monthly Revenue" amount={`$${monthlyRevenue}`} badge="-2.1%" up={monthlyUp} context="Revenue declined slightly to" highlight={`$${monthlyRevenue}`} suffix="\u2014 seasonal contraction expected through Q1." filter={monthFilter} setFilter={setMonthFilter} filters={FILTERS} />
        <div style={{ background: C.bg, borderRadius: 10, padding: "14px 14px 12px", border: `1px solid ${C.line}` }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.5px", color: C.muted, fontFamily: "Inter,sans-serif", textTransform: "uppercase", marginBottom: 2 }}>Today's Activity</div>
              <div style={{ fontSize: "28px", fontWeight: "800", color: C.dark, fontFamily: "DM Sans,sans-serif", lineHeight: 1, letterSpacing: "-1px" }}>93</div>
              <div style={{ fontSize: "10px", color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 2 }}>resource interactions</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <TrendingUp size={10} color={C.green} />
              <span style={{ fontSize: "10px", fontWeight: "700", color: C.green, fontFamily: "Inter,sans-serif" }}>+14%</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 48, position: "relative" }}>
            {[0.33, 0.66, 1].map((pct, i) => (
              <div key={i} style={{ position: "absolute", left: 0, right: 0, bottom: `${pct * 100}%`, borderTop: "1px dashed rgba(0,0,0,0.07)", pointerEvents: "none" }} />
            ))}
            {ACTIVITY_DATA.map((d, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, position: "relative" }} onMouseEnter={() => setHovBar(i)} onMouseLeave={() => setHovBar(null)}>
                <div style={{ width: "100%", background: hovBar === i ? d.color : `${d.color}70`, borderRadius: "3px 3px 0 0", height: `${(d.count / maxActivity) * 100}%`, transition: "background 0.15s", cursor: "pointer", minHeight: 3 }} />
                {hovBar === i && (
                  <div style={{ position: "absolute", bottom: "calc(100% + 4px)", background: C.dark, color: C.white, fontSize: "9px", fontWeight: "700", padding: "2px 6px", borderRadius: 3, fontFamily: "Inter,sans-serif", whiteSpace: "nowrap", zIndex: 10 }}>{d.count} · {d.day}</div>
                )}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
            {ACTIVITY_DATA.map((d, i) => (
              <span key={i} style={{ fontSize: "8px", color: C.muted, fontFamily: "Inter,sans-serif", flex: 1, textAlign: "center" }}>{d.day[0]}</span>
            ))}
          </div>
        </div>
        <div style={{ background: C.bg, borderRadius: 10, padding: "14px", border: `1px solid ${C.line}` }}>
          <div style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.5px", color: C.muted, fontFamily: "Inter,sans-serif", textTransform: "uppercase", marginBottom: 12 }}>Sector Health Scores</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {sortedSectors.map((s, i) => {
              const isActive = activeSector?.id === s.id;
              const barColor = sectorBarColors[i] || "#6B7280";
              return (
                <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 72, flexShrink: 0, fontSize: "9px", fontWeight: isActive ? "700" : "500", color: isActive ? C.dark : C.muted, fontFamily: "Inter,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.short}</div>
                  <div style={{ flex: 1, height: 8, background: C.line, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${s.score}%`, background: isActive ? C.accent : barColor, borderRadius: 4, transition: "width 0.6s ease" }} />
                  </div>
                  <div style={{ width: 26, textAlign: "right", fontSize: "9px", fontWeight: "700", color: isActive ? C.primary : C.mid, fontFamily: "Inter,sans-serif" }}>{s.score}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── RESOURCE DRAWER ──────────────────────────────────────────────────── */
interface ResourceDrawerProps {
  resource: Resource | null;
  onClose: () => void;
  onWatchlist: (id: string) => void;
}

export function ResourceDrawer({ resource, onClose, onWatchlist }: ResourceDrawerProps) {
  if (!resource) return null;
  const tm = TYPE_META[resource.type] || TYPE_META.report;
  const ss = STATUS_STYLE[resource.status] || STATUS_STYLE.available;
  const related = RESOURCES.filter((r) => r.id !== resource.id && (r.sector === resource.sector || r.type === resource.type)).slice(0, 4);
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.25)", zIndex: 200, backdropFilter: "blur(2px)" }} />
      <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: 440, background: C.white, boxShadow: "-8px 0 40px rgba(0,0,0,0.12)", zIndex: 201, display: "flex", flexDirection: "column", animation: "slideIn 0.22s ease" }}>
        <style>{`@keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>
        <div style={{ padding: "18px 20px 14px", borderBottom: `1px solid ${C.line}`, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${tm.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <tm.Icon size={15} color={tm.color} />
              </div>
              <div>
                <div style={{ fontSize: "9px", fontWeight: "700", letterSpacing: "0.8px", color: C.muted, fontFamily: "Inter,sans-serif", textTransform: "uppercase" }}>{tm.label}</div>
                <div style={{ fontSize: "10px", color: C.muted, fontFamily: "Inter,sans-serif" }}>{resource.id} · {resource.slug}</div>
              </div>
            </div>
            <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 6, border: `1px solid ${C.line}`, background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <X size={13} color={C.muted} />
            </button>
          </div>
          <h2 style={{ fontSize: "15px", fontWeight: "700", color: C.dark, fontFamily: "DM Sans,sans-serif", margin: 0, lineHeight: 1.3 }}>{resource.name}</h2>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "18px 20px", scrollbarWidth: "none" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{ fontSize: "10px", fontWeight: "700", color: ss.color, padding: "3px 8px", borderRadius: 5, fontFamily: "Inter,sans-serif" }}>{ss.label}</span>
            <span style={{ fontSize: "10px", fontWeight: "600", color: resource.access === "free" ? C.green : C.primary, padding: "3px 8px", borderRadius: 5, fontFamily: "Inter,sans-serif", textTransform: "capitalize" }}>{resource.access === "free" ? "Free Access" : "Pro Access"}</span>
            {resource.isNew && (<span style={{ fontSize: "10px", fontWeight: "700", color: "#2563EB", padding: "3px 8px", borderRadius: 5, fontFamily: "Inter,sans-serif" }}>New</span>)}
          </div>
          <p style={{ fontSize: "12px", color: C.mid, fontFamily: "Inter,sans-serif", lineHeight: 1.6, margin: "0 0 16px" }}>{resource.description}</p>
          <div style={{ background: C.bg, borderRadius: 8, border: `1px solid ${C.line}`, overflow: "hidden", marginBottom: 16 }}>
            {[["Sector", resource.sector], ["Format", resource.fileFormat || "\u2014"], ["File Size", resource.fileSize || "\u2014"], ["Pages", resource.pages ? `${resource.pages} pages` : "\u2014"], ["Added By", resource.addedBy], ["Published", resource.createdAt], ["Downloads", resource.downloads.toLocaleString()], ["This Month", `${resource.monthlyDownloads.toLocaleString()} downloads`]].map(([k, v], i) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", borderBottom: i < 7 ? `1px solid ${C.line}` : "none" }}>
                <span style={{ fontSize: "11px", color: C.muted, fontFamily: "Inter,sans-serif" }}>{k}</span>
                <span style={{ fontSize: "11px", fontWeight: "600", color: C.dark, fontFamily: "Inter,sans-serif" }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.5px", color: C.muted, fontFamily: "Inter,sans-serif", textTransform: "uppercase", marginBottom: 8 }}>Tags</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {resource.tags.map((t) => (
                <span key={t} style={{ fontSize: "10px", fontWeight: "600", color: C.teal, background: `${C.teal}10`, border: `1px solid ${C.teal}25`, padding: "3px 8px", borderRadius: 20, fontFamily: "Inter,sans-serif", cursor: "pointer" }}>{t}</span>
              ))}
            </div>
          </div>
          {related.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.5px", color: C.muted, fontFamily: "Inter,sans-serif", textTransform: "uppercase", marginBottom: 8 }}>Related Resources</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {related.map((r) => {
                  const rtm = TYPE_META[r.type] || TYPE_META.report;
                  return (
                    <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: C.bg, borderRadius: 7, border: `1px solid ${C.line}`, cursor: "pointer" }}>
                      <div style={{ width: 26, height: 26, borderRadius: 6, background: `${rtm.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <rtm.Icon size={12} color={rtm.color} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "11px", fontWeight: "600", color: C.dark, fontFamily: "Inter,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.name}</div>
                        <div style={{ fontSize: "9px", color: C.muted, fontFamily: "Inter,sans-serif" }}>{rtm.label}</div>
                      </div>
                      <ChevronRight size={12} color={C.muted} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div style={{ padding: "14px 20px", borderTop: `1px solid ${C.line}`, display: "flex", gap: 10, flexShrink: 0 }}>
          <button style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: C.primary, border: "none", borderRadius: 8, padding: "11px", fontSize: "12px", fontWeight: "700", color: C.white, fontFamily: "Inter,sans-serif", cursor: "pointer" }}>
            <Download size={13} /> {resource.access === "free" ? "Download Now" : "Unlock & Download"}
          </button>
          <button onClick={() => onWatchlist(resource.id)} style={{ width: 42, height: 42, borderRadius: 8, border: `1px solid ${resource.isWatchlisted ? C.accent : C.line}`, background: resource.isWatchlisted ? `${C.accent}20` : C.bg, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <BookmarkIcon size={14} color={resource.isWatchlisted ? C.primary : C.muted} fill={resource.isWatchlisted ? C.accent : "none"} />
          </button>
        </div>
      </div>
    </>
  );
}

/* ─── TABLE VIEW ───────────────────────────────────────────────────────── */
interface TableViewProps {
  resources: Resource[];
  onOpen: (r: Resource) => void;
  onWatch: (id: string) => void;
  sortCol: string;
  sortDir: string;
  onSort: (col: string) => void;
}

export function TableView({ resources, onOpen, onWatch, sortCol, sortDir, onSort }: TableViewProps) {
  const COLS = [
    { key: "name", label: "Resource", w: "auto" as string | number },
    { key: "type", label: "Type", w: 100 },
    { key: "status", label: "Status", w: 110 },
    { key: "downloads", label: "Downloads", w: 110 },
    { key: "access", label: "Access", w: 80 },
  ];
  const SortIcon = ({ col }: { col: string }) => {
    if (sortCol !== col) return <span style={{ color: C.muted, fontSize: 9, marginLeft: 3 }}>{"\u21C5"}</span>;
    return sortDir === "asc" ? (
      <ChevronUp size={10} color={C.primary} style={{ marginLeft: 2 }} />
    ) : (
      <ChevronDown size={10} color={C.primary} style={{ marginLeft: 2 }} />
    );
  };
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead style={{ position: "sticky", top: 0, background: C.bg, zIndex: 5 }}>
        <tr style={{ borderBottom: `1px solid ${C.line}` }}>
          <th style={{ width: 36, padding: "8px 0 8px 16px" }} />
          {COLS.map((c) => (
            <th key={c.key} onClick={() => onSort(c.key)} style={{ padding: "8px 12px", textAlign: "left", fontSize: "10px", fontWeight: "700", letterSpacing: "0.5px", color: C.muted, fontFamily: "Inter,sans-serif", textTransform: "uppercase", cursor: "pointer", width: c.w === "auto" ? undefined : c.w, userSelect: "none", whiteSpace: "nowrap" }}>
              {c.label}<SortIcon col={c.key} />
            </th>
          ))}
          <th style={{ width: 40 }} />
        </tr>
      </thead>
      <tbody>
        {resources.map((r, i) => {
          const tm = TYPE_META[r.type] || TYPE_META.report;
          const ss = STATUS_STYLE[r.status] || STATUS_STYLE.available;
          const even = i % 2 === 0;
          return (
            <tr key={r.id} onClick={() => onOpen(r)} style={{ background: even ? C.white : C.bg, borderBottom: `1px solid ${C.line}`, cursor: "pointer", transition: "background 0.1s" }} onMouseEnter={(e) => (e.currentTarget.style.background = `${C.primary}06`)} onMouseLeave={(e) => (e.currentTarget.style.background = even ? C.white : C.bg)}>
              <td style={{ padding: "10px 0 10px 16px" }}>
                <div style={{ width: 14, height: 14, borderRadius: 3, border: `1.5px solid ${C.line}`, background: C.white }} />
              </td>
              <td style={{ padding: "10px 12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 7, background: `${tm.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <tm.Icon size={13} color={tm.color} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: "12px", fontWeight: "600", color: C.dark, fontFamily: "DM Sans,sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 280 }}>
                      {r.name}
                      {r.isNew && (<span style={{ marginLeft: 6, fontSize: "8px", fontWeight: "800", color: "#2563EB", background: "#DBEAFE", padding: "1px 5px", borderRadius: 3, fontFamily: "Inter,sans-serif", verticalAlign: "middle" }}>NEW</span>)}
                    </div>
                    <div style={{ fontSize: "10px", color: C.muted, fontFamily: "Inter,sans-serif", marginTop: 1 }}>{r.slug} · {r.sector}</div>
                  </div>
                </div>
              </td>
              <td style={{ padding: "10px 12px" }}>
                <span style={{ fontSize: "10px", fontWeight: "700", color: tm.color, background: `${tm.color}12`, padding: "3px 8px", borderRadius: 5, fontFamily: "Inter,sans-serif" }}>{tm.label}</span>
              </td>
              <td style={{ padding: "10px 12px" }}>
                <span style={{ fontSize: "10px", fontWeight: "700", color: ss.color, padding: "3px 8px", borderRadius: 5, fontFamily: "Inter,sans-serif" }}>{ss.label}</span>
              </td>
              <td style={{ padding: "10px 12px" }}>
                <div style={{ fontSize: "12px", fontWeight: "600", color: C.dark, fontFamily: "Inter,sans-serif" }}>{r.downloads.toLocaleString()}</div>
                <div style={{ fontSize: "10px", color: C.muted, fontFamily: "Inter,sans-serif" }}>+{r.monthlyDownloads}/mo</div>
              </td>
              <td style={{ padding: "10px 12px" }}>
                <span style={{ fontSize: "10px", fontWeight: "700", color: r.access === "free" ? C.green : C.primary, fontFamily: "Inter,sans-serif", textTransform: "capitalize" }}>{r.access === "free" ? "Free" : "Pro"}</span>
              </td>
              <td style={{ padding: "10px 12px" }}>
                <div style={{ display: "flex", gap: 6 }} onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => onWatch(r.id)} style={{ width: 26, height: 26, borderRadius: 5, border: `1px solid ${r.isWatchlisted ? C.accent : C.line}`, background: r.isWatchlisted ? `${C.accent}20` : C.bg, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <BookmarkIcon size={11} color={r.isWatchlisted ? C.primary : C.muted} fill={r.isWatchlisted ? C.accent : "none"} />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/* ─── GRID VIEW ────────────────────────────────────────────────────────── */
interface GridViewProps {
  resources: Resource[];
  onOpen: (r: Resource) => void;
  onWatch: (id: string) => void;
}

export function GridView({ resources, onOpen, onWatch }: GridViewProps) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, padding: 20 }}>
      {resources.map((r) => {
        const tm = TYPE_META[r.type] || TYPE_META.report;
        const ss = STATUS_STYLE[r.status] || STATUS_STYLE.available;
        return (
          <div key={r.id} onClick={() => onOpen(r)} style={{ background: C.white, borderRadius: 10, border: `1px solid ${C.line}`, overflow: "hidden", cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.09)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ height: 72, background: `linear-gradient(135deg,${tm.color}18,${tm.color}08)`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px" }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: C.white, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <tm.Icon size={16} color={tm.color} />
              </div>
              <button onClick={(e) => { e.stopPropagation(); onWatch(r.id); }} style={{ width: 28, height: 28, borderRadius: 7, border: `1px solid ${r.isWatchlisted ? C.accent : C.line}`, background: r.isWatchlisted ? `${C.accent}25` : C.white, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <BookmarkIcon size={12} color={r.isWatchlisted ? C.primary : C.muted} fill={r.isWatchlisted ? C.accent : "none"} />
              </button>
            </div>
            <div style={{ padding: "12px 14px 14px" }}>
              <div style={{ display: "flex", gap: 5, marginBottom: 7 }}>
                <span style={{ fontSize: "9px", fontWeight: "700", color: tm.color, background: `${tm.color}12`, padding: "2px 6px", borderRadius: 4, fontFamily: "Inter,sans-serif" }}>{tm.label}</span>
                <span style={{ fontSize: "9px", fontWeight: "700", color: ss.color, padding: "2px 6px", borderRadius: 4, fontFamily: "Inter,sans-serif" }}>{ss.label}</span>
              </div>
              <div style={{ fontSize: "12px", fontWeight: "700", color: C.dark, fontFamily: "DM Sans,sans-serif", lineHeight: 1.3, marginBottom: 5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{r.name}</div>
              <div style={{ fontSize: "10px", color: C.muted, fontFamily: "Inter,sans-serif", marginBottom: 10, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.4 }}>{r.description}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 8, borderTop: `1px solid ${C.line}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Download size={10} color={C.muted} />
                  <span style={{ fontSize: "10px", color: C.muted, fontFamily: "Inter,sans-serif" }}>{r.downloads.toLocaleString()}</span>
                </div>
                <span style={{ fontSize: "10px", fontWeight: "700", color: r.access === "free" ? C.green : C.primary, fontFamily: "Inter,sans-serif" }}>{r.access === "free" ? "Free" : "Pro"}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
