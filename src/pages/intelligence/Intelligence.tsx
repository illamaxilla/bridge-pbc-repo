import { Outlet, NavLink, Navigate, useLocation } from "react-router-dom";
import { LayoutDashboard, TrendingUp, FileText, Bookmark, BarChart2, FolderOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { to: "/intelligence/dashboard",  label: "Dashboard",       icon: LayoutDashboard },
  { to: "/intelligence/market",     label: "Market Overview", icon: TrendingUp },
  { to: "/intelligence/reports",    label: "Reports",         icon: FileText },
  { to: "/intelligence/watchlist",  label: "Watchlist",       icon: Bookmark },
  { to: "/intelligence/analytics",  label: "Analytics",       icon: BarChart2 },
  { to: "/intelligence/resources",  label: "Resources",       icon: FolderOpen },
];

export default function Intelligence() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect /intelligence → /intelligence/dashboard
  if (location.pathname === "/intelligence" || location.pathname === "/intelligence/") {
    return <Navigate to="/intelligence/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F3F5F2", fontFamily: "Inter, sans-serif" }}>

      {/* ── Top Bar ── */}
      <header className="flex items-center justify-between px-6 h-14 shrink-0" style={{ backgroundColor: "#1B4D3E", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-3">
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(v => !v)}
              className="text-white mr-1 p-1 rounded hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
          <NavLink to="/" className="font-bold text-xl tracking-widest" style={{ color: "#B8D935", textDecoration: "none", letterSpacing: "0.1em" }}>
            BRIDGE
          </NavLink>
          <span className="hidden sm:inline-block text-white/30 text-sm ml-1">/ Intelligence</span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={{ backgroundColor: "#B8D935", color: "#1B4D3E", letterSpacing: "0.06em" }}
          >
            BETA
          </span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ── */}
        <aside
          className="shrink-0 flex flex-col"
          style={{
            width: isMobile ? (sidebarOpen ? "220px" : "0px") : "220px",
            overflow: "hidden",
            transition: "width 0.25s ease",
            backgroundColor: "#1B4D3E",
            borderRight: "1px solid rgba(255,255,255,0.08)",
            position: isMobile ? "absolute" : "relative",
            zIndex: isMobile ? 40 : "auto",
            top: isMobile ? "56px" : "auto",
            bottom: isMobile ? 0 : "auto",
          }}
        >
          <nav className="flex flex-col gap-1 p-3 mt-2" style={{ minWidth: "220px" }}>
            <p className="text-xs font-semibold px-3 mb-2" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em" }}>
              INTELLIGENCE
            </p>
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setSidebarOpen(false)}
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "9px 12px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: isActive ? "600" : "400",
                  color: isActive ? "#1B4D3E" : "rgba(255,255,255,0.75)",
                  backgroundColor: isActive ? "#B8D935" : "transparent",
                  transition: "all 0.15s ease",
                })}
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Mobile overlay */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30"
            style={{ top: "56px" }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── Main Content ── */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}
