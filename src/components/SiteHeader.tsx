import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, User, Menu, X } from "lucide-react";
import { colors as clr } from "@/lib/theme";
import { BridgeLogo } from "@/components/BridgeLogo";
import { useScrollLock } from "@/hooks/useScrollLock";

// ── Nav items with route mapping ──────────────────────────────────────────────
const ALL_NAV = [
  { label: "Home",               to: "/" },
  { label: "About",              to: "/about" },
  { label: "Methodology",        to: "/methodology" },
  { label: "Services",           to: "/services" },
  { label: "Sectors",            to: "/sectors" },
  { label: "Insight",            to: "/insights" },
  { label: "BRIDGE Intelligence", to: "/intelligence/dashboard" },
  { label: "Community",          to: "/community" },
  { label: "Resources",          to: "/resources" },
  { label: "Contact",            to: "/contact" },
  { label: "Policy Updates",     to: "/policy", badge: true },
];

// ── Search items (nav + all 12 sector pages) ──────────────────────────────────
const SEARCH_ITEMS = [
  ...ALL_NAV,
  { label: "Energy & Renewables",         to: "/sectors/energy" },
  { label: "Technology & Innovation",     to: "/sectors/technology" },
  { label: "Agriculture & Value Chains",  to: "/sectors/agriculture" },
  { label: "Education & Skills",          to: "/sectors/education" },
  { label: "Financial Inclusion",         to: "/sectors/financial" },
  { label: "Health Systems",             to: "/sectors/health" },
  { label: "Housing & Real Estate",       to: "/sectors/housing" },
  { label: "Infrastructure",             to: "/sectors/infrastructure" },
  { label: "Manufacturing",              to: "/sectors/manufacturing" },
  { label: "Sports & Creative",          to: "/sectors/sports" },
  { label: "Tourism & Hospitality",      to: "/sectors/tourism" },
  { label: "Transportation",             to: "/sectors/transport" },
];

// ── Site-wide header ─────────────────────────────────────────────────────────
export default function SiteHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu or search is open
  useScrollLock(menuOpen || searchOpen);

  // Auto-focus search input when opened
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchQuery("");
    }
  }, [searchOpen]);

  // ESC closes search or menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (searchOpen) setSearchOpen(false);
        else if (menuOpen) setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, menuOpen]);

  // Active-page detection (no exclusion — show all 10 items)
  const isActive = (item: typeof ALL_NAV[0]) =>
    item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);

  const handleNavClick = (to: string) => { setMenuOpen(false); navigate(to); };
  const goLogin = () => { setMenuOpen(false); navigate("/login"); };

  const handleSearchSelect = (to: string) => {
    setSearchOpen(false);
    navigate(to);
  };

  const filteredSearch = searchQuery.trim().length > 0
    ? SEARCH_ITEMS.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : SEARCH_ITEMS;

  const iconStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    color: clr.dark,
    transition: "color 0.2s ease, background-color 0.2s ease",
  };

  return (
    <>
      <header
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.9)" : clr.white,
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          padding: "0 clamp(20px, 5vw, 80px)",
          height: "72px",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
        }}
      >
        {/* Logo → Home */}
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); handleNavClick("/"); }}
          style={{ display: "flex", alignItems: "center", height: "40px", textDecoration: "none", flexShrink: 0 }}
        >
          <BridgeLogo height={36} />
        </a>

        {/* Right side — 3 icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {/* Search */}
          <button
            aria-label="Search"
            onClick={() => { setMenuOpen(false); setSearchOpen(true); }}
            style={iconStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = clr.primary; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = clr.dark; }}
          >
            <Search size={20} strokeWidth={1.75} />
          </button>

          {/* Account → Login */}
          <button
            aria-label="Account"
            onClick={goLogin}
            style={iconStyle}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = clr.primary; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = clr.dark; }}
          >
            <User size={20} strokeWidth={1.75} />
          </button>

          {/* Menu toggle */}
          <button
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              ...iconStyle,
              color: menuOpen ? clr.white : clr.dark,
              backgroundColor: menuOpen ? clr.dark : "transparent",
              borderRadius: "8px",
            }}
            onMouseEnter={(e) => {
              if (!menuOpen) (e.currentTarget as HTMLButtonElement).style.color = clr.primary;
            }}
            onMouseLeave={(e) => {
              if (!menuOpen) (e.currentTarget as HTMLButtonElement).style.color = clr.dark;
            }}
          >
            {menuOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
          </button>
        </div>
      </header>

      {/* ── Full-screen SEARCH overlay ─────────────────────────────────────────── */}
      {searchOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#191919",
            zIndex: 1001,
            display: "flex",
            flexDirection: "column",
            animation: "fadeInMenu 0.2s ease",
          }}
        >
          <style>{`@keyframes fadeInMenu{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>

          {/* Search header row */}
          <div
            style={{
              padding: "0 clamp(20px, 5vw, 80px)",
              height: "72px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              flexShrink: 0,
            }}
          >
            <Search size={22} color="rgba(255,255,255,0.4)" strokeWidth={1.75} style={{ flexShrink: 0 }} />
            <input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pages and sectors..."
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#FFFFFF",
                fontSize: "clamp(18px, 3vw, 28px)",
                fontWeight: "300",
                fontFamily: "DM Sans, sans-serif",
                letterSpacing: "-0.3px",
              }}
            />
            <button
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.6)",
                flexShrink: 0,
              }}
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Results */}
          <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
            {filteredSearch.length === 0 ? (
              <div style={{ padding: "48px clamp(20px, 5vw, 80px)", color: "rgba(255,255,255,0.3)", fontSize: "16px", fontFamily: "DM Sans, sans-serif" }}>
                No results for "{searchQuery}"
              </div>
            ) : (
              filteredSearch.map((item) => (
                <button
                  key={item.to}
                  onClick={() => handleSearchSelect(item.to)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "16px clamp(20px, 5vw, 80px)",
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "background-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(255,255,255,0.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; }}
                >
                  <span style={{ color: "#FFFFFF", fontSize: "clamp(16px, 2.5vw, 22px)", fontWeight: "400", fontFamily: "DM Sans, sans-serif", letterSpacing: "-0.2px" }}>
                    {item.label}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </button>
              ))
            )}
          </div>

          {/* Footer hint */}
          <div style={{ padding: "16px clamp(20px, 5vw, 80px)", borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)", fontFamily: "DM Sans, sans-serif" }}>
              Press ESC to close
            </span>
          </div>
        </div>
      )}

      {/* ── Full-screen NAV overlay ─────────────────────────────────────────────── */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: "72px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#191919",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            padding: "40px clamp(20px, 5vw, 80px) 32px",
            animation: "fadeInMenu 0.25s ease",
            overflowY: "auto",
          }}
        >
          <style>{`@keyframes fadeInMenu{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}@keyframes pulseBadge{0%,100%{transform:scale(1);opacity:0.6}50%{transform:scale(2.2);opacity:0}}`}</style>

          <nav style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            {ALL_NAV.map((item) => {
              const active = isActive(item);
              return (
                <a
                  key={item.label}
                  href={item.to}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.to); }}
                  style={{
                    color: active ? "#FFFFFF" : "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    fontSize: "clamp(22px, 4vw, 32px)",
                    fontWeight: active ? "600" : "300",
                    fontFamily: "DM Sans, sans-serif",
                    padding: "20px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    letterSpacing: "-0.5px",
                    minHeight: "48px",
                    boxSizing: "border-box",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {active && (
                      <span style={{ color: "#B8D935", fontSize: "0.6em", lineHeight: 1, flexShrink: 0 }}>●</span>
                    )}
                    {item.label}
                    {item.badge && (
                      <span style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "8px", height: "8px", flexShrink: 0 }}>
                        <span style={{ position: "absolute", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#B8D935", animation: "pulseBadge 2s ease-in-out infinite", opacity: 0.6 }} />
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#B8D935", position: "relative", zIndex: 1 }} />
                      </span>
                    )}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.3)"} strokeWidth="1.5" strokeLinecap="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              );
            })}
          </nav>

          {/* CTA at bottom */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "auto", paddingTop: "24px" }}>
            <button
              onClick={goLogin}
              style={{
                backgroundColor: clr.accent,
                color: clr.dark,
                border: "none",
                padding: "16px 24px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "700",
                fontFamily: "DM Sans, sans-serif",
                cursor: "pointer",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                minHeight: "56px",
              }}
            >
              Request Access
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#191919" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 0" }}>
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)", fontFamily: "DM Sans, sans-serif" }}>
                info@bridgepbc.com
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
