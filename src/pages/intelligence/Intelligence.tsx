import { Outlet, NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, TrendingUp, FileText, Bookmark, BarChart2, FolderOpen,
  Menu, X, ChevronLeft, ChevronRight, ArrowUpRight, Check,
  Wallet, Cpu, GraduationCap, Sprout, Camera, Home, Luggage,
  BatteryCharging, Factory, Truck, Blocks, Cross, Zap, Shield, Globe,
} from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const C = {
  accent: "#B8D935",
  primary: "#1B4D3E",
  sidebar: "#0F1A12",
  sideAct: "#1E3327",
  white: "#FFFFFF",
};

const navItems = [
  { to: "/intelligence/dashboard",  label: "Dashboard",       icon: LayoutDashboard },
  { to: "/intelligence/market",     label: "Market Overview", icon: TrendingUp },
  { to: "/intelligence/reports",    label: "Reports",         icon: FileText },
  { to: "/intelligence/watchlist",  label: "Watchlist",       icon: Bookmark },
  { to: "/intelligence/analytics",  label: "Analytics",       icon: BarChart2 },
  { to: "/intelligence/resources",  label: "Resources",       icon: FolderOpen },
];

// Sorted by score descending
const SIDEBAR_SECTORS = [
  { id: "financial",      short: "Financial Inclusion", icon: Wallet },
  { id: "agriculture",    short: "Agriculture",         icon: Sprout },
  { id: "technology",     short: "Technology",          icon: Cpu },
  { id: "energy",         short: "Energy",              icon: BatteryCharging },
  { id: "infrastructure", short: "Infrastructure",      icon: Blocks },
  { id: "education",      short: "Education",           icon: GraduationCap },
  { id: "health",         short: "Health Systems",      icon: Cross },
  { id: "housing",        short: "Housing",             icon: Home },
  { id: "manufacturing",  short: "Manufacturing",       icon: Factory },
  { id: "creative",       short: "Creative Industries", icon: Camera },
  { id: "transportation", short: "Transportation",      icon: Truck },
  { id: "tourism",        short: "Tourism",             icon: Luggage },
];

const PRO_FEATURES = [
  { icon: Globe,  text: "All 12 sector deep-dives" },
  { icon: Zap,    text: "Real-time opportunity alerts" },
  { icon: Shield, text: "Risk & IRR benchmarking" },
  { icon: BarChart2, text: "Custom watchlist & exports" },
];

function BridgeLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3434.33 932.3"
      style={{ width: 96, height: 26, display: "block" }}>
      <path style={{ fill: "#fff" }}
        d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z" />
      <path style={{ fill: "#fff", stroke: "#000", strokeWidth: ".5px", strokeMiterlimit: 10 }}
        d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1Z" />
      <path style={{ fill: "#fff", stroke: "#000", strokeWidth: ".5px", strokeMiterlimit: 10 }}
        d="M1488.08,578.65v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z" />
      <rect style={{ fill: "#B8D935", stroke: "#1b4d3e", strokeMiterlimit: 10 }} x="1427.38" y="17.35" width="205.2" height="145" />
      <rect style={{ fill: "#fff" }} x="1427.48" y="221.75" width="205.2" height="693.2" rx="9.6" ry="9.6" />
      <path style={{ fill: "#fff" }}
        d="M2757.31,19.09h491.3c5.42,0,9.82,4.4,9.82,9.82v218.7c0,5.42-4.4,9.82-9.82,9.82h-507.36c-56.98,0-108.53,23.02-145.87,60.35-37.34,37.23-60.45,88.79-60.45,145.66,0,113.75,92.37,206.01,206.32,206.01h12.89c2.86,0,5.11,2.25,5.11,5.11v236.7c0,1.13-.92,1.94-1.94,1.94h0c-242.22,0-438.52-195.99-438.52-437.8v-18.51c0-241.81,196.29-437.8,438.52-437.8h0Z" />
      <rect style={{ fill: "#fff" }} x="2812.75" y="339.47" width="216.75" height="572.62" rx="9.6" ry="9.6" />
      <rect style={{ fill: "#B8D935", stroke: "#1b4d3e", strokeMiterlimit: 10 }} x="3083.41" y="339.47" width="175.12" height="257.67" />
      <rect style={{ fill: "#B8D935", stroke: "#1b4d3e", strokeMiterlimit: 10 }} x="3083.41" y="654.42" width="175.12" height="257.67" />
      <circle style={{ fill: "none", stroke: "#231f20", strokeWidth: "5px", strokeMiterlimit: 10 }} cx="3385.56" cy="866.94" r="46.27" />
      <path style={{ fill: "#fff" }}
        d="M3404.8,889.32l-10.31-14.71c.25,0,.38-.13.63-.25,2.89-1.26,5.03-3.02,6.54-5.41s2.26-5.15,2.26-8.55c0-5.03-1.76-8.93-5.16-11.82s-8.05-4.27-14.08-4.27h-18.36v44.89h8.3v-13.08h11.94l9.18,13.08h8.93l.13.13ZM3392.85,853.74c1.89,1.51,2.77,3.77,2.77,6.66s-.88,5.03-2.77,6.66-4.65,2.39-8.3,2.39h-9.81v-17.85h9.81c3.65,0,6.41.75,8.3,2.26h0v-.13Z" />
      <rect style={{ fill: "none", stroke: "#fff", strokeWidth: "80px", strokeMiterlimit: 10 }} x="40" y="40" width="843.91" height="852.3" rx="36.55" ry="36.55" />
      <polygon style={{ fill: "#B8D935", stroke: "#1b4d3e", strokeMiterlimit: 10 }} points="722.6 322.13 462.28 452.8 201.97 322.75 461.21 192.52 722.6 322.13" />
      <path style={{ fill: "#74914a" }}
        d="M197.84,426.78c3.86-.53,7.04.85,10.74,1.41l252.53,125.67c84.54-40,167.66-83.83,251.89-124.84,33.14-11.49,50.09,34.15,18.55,49.11l-259.23,129.08c-10.18,3.72-14.14,2.57-23.85-1.31l-264.23-132.98c-17.04-14.4-7.96-43.2,13.61-46.14Z" />
      <path style={{ fill: "#B8D935", stroke: "#1b4d3e", strokeMiterlimit: 10 }}
        d="M195.25,558c3.65-.63,7.4-.4,11.08-.22,86.11,40.47,170.4,85.05,255.95,126.78l252.92-126c29.53-7.22,45.44,28.67,22.29,46.49l-270.42,134.42-8.62.31c-91.6-42.21-181.07-89.86-271.7-134.42-18.72-12.06-13.3-43.58,8.5-47.37Z" />
    </svg>
  );
}

function UpgradeModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)",
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#0F1A12",
          border: "1px solid rgba(184,217,53,0.2)",
          borderRadius: 16,
          padding: 32,
          maxWidth: 420,
          width: "100%",
          position: "relative",
          boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 14, right: 14,
            background: "rgba(255,255,255,0.06)", border: "none",
            borderRadius: 6, cursor: "pointer", padding: 6,
            color: "rgba(255,255,255,0.4)", display: "flex",
          }}
        >
          <X size={16} />
        </button>

        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(184,217,53,0.12)", border: "1px solid rgba(184,217,53,0.25)",
          borderRadius: 20, padding: "4px 12px", marginBottom: 16,
        }}>
          <Zap size={12} color={C.accent} />
          <span style={{ fontSize: 10, fontWeight: 700, color: C.accent, fontFamily: "Inter,sans-serif", letterSpacing: ".06em" }}>
            BRIDGE INTELLIGENCE PRO
          </span>
        </div>

        {/* Headline */}
        <h2 style={{ fontSize: 22, fontWeight: 800, color: C.white, fontFamily: "DM Sans,sans-serif", margin: "0 0 6px" }}>
          Unlock the Full Picture
        </h2>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", fontFamily: "Inter,sans-serif", marginBottom: 24, lineHeight: 1.5 }}>
          Get deep-dive access to all 12 Ghana investment sectors, live opportunity alerts, and custom portfolio tools.
        </p>

        {/* Features */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
          {PRO_FEATURES.map(({ icon: Icon, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6,
                background: "rgba(184,217,53,0.1)", border: "1px solid rgba(184,217,53,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Icon size={14} color={C.accent} />
              </div>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", fontFamily: "DM Sans,sans-serif" }}>{text}</span>
              <Check size={13} color={C.accent} style={{ marginLeft: "auto", flexShrink: 0 }} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          style={{
            width: "100%", background: C.accent, border: "none", borderRadius: 8,
            padding: "13px 0", fontSize: 13, fontWeight: 700, color: C.primary,
            fontFamily: "Inter,sans-serif", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            marginBottom: 10,
          }}
        >
          Request Pro Access <ArrowUpRight size={14} />
        </button>
        <p style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.25)", fontFamily: "Inter,sans-serif", margin: 0 }}>
          Institutional & diaspora investor pricing available
        </p>
      </div>
    </div>
  );
}

export default function Intelligence() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  if (location.pathname === "/intelligence" || location.pathname === "/intelligence/") {
    return <Navigate to="/intelligence/dashboard" replace />;
  }

  const sidebarWidth = isMobile ? (sidebarOpen ? 220 : 0) : collapsed ? 56 : 220;

  const handleSectorClick = (sectorId: string) => {
    navigate(`/intelligence/dashboard?sector=${sectorId}`);
    setSidebarOpen(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#F3F5F2", fontFamily: "Inter, sans-serif" }}>

      {/* ── Upgrade Modal ── */}
      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}

      {/* ── Top Bar ── */}
      <header style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px", height: 56, flexShrink: 0,
        backgroundColor: C.sidebar, borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {isMobile && (
            <button onClick={() => setSidebarOpen(v => !v)}
              style={{ color: C.white, background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center" }}
              aria-label="Toggle menu">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
          {!isMobile && (
            <button onClick={() => setCollapsed(v => !v)}
              style={{ color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", alignItems: "center" }}
              aria-label="Toggle sidebar">
              {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
          )}
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <BridgeLogo />
          </NavLink>
          <div style={{
            fontSize: 7, fontWeight: 700, color: C.accent,
            textTransform: "uppercase", letterSpacing: "0.05em",
            lineHeight: 1.4, fontFamily: "Inter,sans-serif",
          }}>
            Intelligence
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
            backgroundColor: C.accent, color: C.primary, letterSpacing: "0.06em",
          }}>
            BETA
          </span>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* ── Sidebar ── */}
        <aside style={{
          width: sidebarWidth,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "width 0.22s ease",
          backgroundColor: C.sidebar,
          borderRight: "1px solid rgba(255,255,255,0.06)",
          position: isMobile ? "absolute" : "relative",
          zIndex: isMobile ? 40 : "auto",
          top: isMobile ? 56 : "auto",
          bottom: isMobile ? 0 : "auto",
          height: isMobile ? "calc(100vh - 56px)" : "auto",
        }}>

          {/* ── Nav Items ── */}
          <nav style={{ padding: "10px 8px", flexShrink: 0, minWidth: 220 }}>
            {!collapsed && (
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "1px", color: "rgba(255,255,255,0.2)", fontFamily: "Inter,sans-serif", padding: "6px 8px 6px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                Navigation
              </p>
            )}
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setSidebarOpen(false)}
                title={collapsed ? label : undefined}
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  padding: collapsed ? "8px 0" : "8px 8px",
                  justifyContent: collapsed ? "center" : "flex-start",
                  borderRadius: 6,
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? C.white : "rgba(255,255,255,0.5)",
                  backgroundColor: isActive ? C.sideAct : "transparent",
                  transition: "background 0.1s",
                  marginBottom: 2,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                })}
              >
                {({ isActive }) => (
                  <>
                    <Icon size={16} color={isActive ? C.accent : "rgba(255,255,255,0.4)"} />
                    {!collapsed && <span style={{ fontFamily: "DM Sans,sans-serif" }}>{label}</span>}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ── Sectors ── */}
          <div style={{ flex: 1, overflowY: "auto", padding: "0 8px 12px", scrollbarWidth: "none", minWidth: 220 }}>
            {!collapsed && (
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "1px", color: "rgba(255,255,255,0.2)", fontFamily: "Inter,sans-serif", padding: "6px 8px 6px", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                Sectors
              </p>
            )}
            {collapsed && <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "4px 6px 10px" }} />}
            {SIDEBAR_SECTORS.map(({ id, short, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleSectorClick(id)}
                title={collapsed ? short : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: collapsed ? "5px 0" : "6px 8px",
                  justifyContent: collapsed ? "center" : "flex-start",
                  borderRadius: 5,
                  marginBottom: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  width: "100%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.12s",
                  textAlign: "left",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                onMouseLeave={e => (e.currentTarget.style.background = "none")}
              >
                {collapsed ? (
                  <div style={{
                    width: 28, height: 28, borderRadius: 4,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(255,255,255,0.05)",
                  }}>
                    <Icon size={14} color="rgba(255,255,255,0.35)" />
                  </div>
                ) : (
                  <>
                    <Icon size={12} color="rgba(255,255,255,0.3)" />
                    <span style={{ fontSize: 11.5, fontWeight: 400, color: "rgba(255,255,255,0.45)", fontFamily: "DM Sans,sans-serif" }}>
                      {short}
                    </span>
                  </>
                )}
              </button>
            ))}
          </div>

          {/* ── Upgrade to Pro ── */}
          {!collapsed && (
            <div style={{
              margin: "0 10px 12px",
              background: "linear-gradient(135deg,#1E3327,#152A1F)",
              border: "1px solid rgba(184,217,53,0.15)",
              borderRadius: 8, padding: 12, flexShrink: 0, minWidth: 200,
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.white, fontFamily: "DM Sans,sans-serif", marginBottom: 3 }}>
                Upgrade to Pro
              </div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "Inter,sans-serif", marginBottom: 8, lineHeight: 1.4 }}>
                Full access to all 12 sector analyses
              </div>
              <button
                onClick={() => setShowUpgrade(true)}
                style={{
                  width: "100%", background: C.accent, border: "none", borderRadius: 5,
                  padding: "7px 0", fontSize: 10, fontWeight: 700, color: C.primary,
                  fontFamily: "Inter,sans-serif", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Get Access <ArrowUpRight size={10} />
              </button>
            </div>
          )}
        </aside>

        {/* Mobile overlay */}
        {isMobile && sidebarOpen && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 30, top: 56 }}
            onClick={() => setSidebarOpen(false)} />
        )}

        {/* ── Main Content ── */}
        <main style={{ flex: 1, overflow: "auto" }}>
          <Outlet />
        </main>

      </div>
    </div>
  );
}
