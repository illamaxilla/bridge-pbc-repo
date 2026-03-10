import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";

// ── Design tokens (match every page in the site) ──────────────────────────────
const clr = {
  primary: "#1B4D3E",
  accent: "#B8D935",
  dark: "#191919",
  white: "#FFFFFF",
  line: "#DEDEDE",
};

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

// Policy pages that show a badge dot
const BADGE_ITEMS = new Set(["/policy"]);

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

// ── BRIDGE logo (dark, header variant) ────────────────────────────────────────
const BridgeLogo = ({ height = 40 }: { height?: number }) => (
  <svg height={height} viewBox="0 0 3434.33 932.3" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
    <g>
      <path fill="#b8d935" d="M2070.26,927.95c-.2.2-.5.4-.7.5h-.3l1-.5Z" />
      <path fill="#0fea68" d="M2070.26,927.95c-.2.2-.5.4-.7.5h-.3l1-.5Z" />
      <path fill="#1b4d3e" d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9h0ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z" />
      <path fill="#1b4d3e" stroke="#000" strokeWidth=".5" strokeMiterlimit="10" d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1h0Z" />
      <path fill="#1b4d3e" stroke="#000" strokeWidth=".5" strokeMiterlimit="10" d="M1488.08,578.65v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z" />
      <rect fill="#b8d935" x="1427.38" y="17.35" width="205.2" height="145" />
      <rect fill="#1b4d3e" x="1427.48" y="221.75" width="205.2" height="693.2" rx="9.6" ry="9.6" />
      <path fill="#1b4d3e" d="M2757.31,19.09h491.3c5.42,0,9.82,4.4,9.82,9.82v218.7c0,5.42-4.4,9.82-9.82,9.82h-507.36c-56.98,0-108.53,23.02-145.87,60.35-37.34,37.23-60.45,88.79-60.45,145.66,0,113.75,92.37,206.01,206.32,206.01h12.89c2.86,0,5.11,2.25,5.11,5.11v236.7c0,1.13-.92,1.94-1.94,1.94h0c-242.22,0-438.52-195.99-438.52-437.8v-18.51c0-241.81,196.29-437.8,438.52-437.8h0Z" />
      <rect fill="#1b4d3e" x="2812.75" y="339.47" width="216.75" height="572.62" rx="9.6" ry="9.6" />
      <rect fill="#b8d935" x="3083.41" y="339.47" width="175.12" height="257.67" />
      <rect fill="#b8d935" x="3083.41" y="654.42" width="175.12" height="257.67" />
      <circle fill="none" stroke="#191919" strokeWidth="5" strokeMiterlimit="10" cx="3385.56" cy="866.94" r="46.27" />
      <path fill="#191919" d="M3404.8,889.32l-10.31-14.71c.25,0,.38-.13.63-.25,2.89-1.26,5.03-3.02,6.54-5.41s2.26-5.15,2.26-8.55c0-5.03-1.76-8.93-5.16-11.82s-8.05-4.27-14.08-4.27h-18.36v44.89h8.3v-13.08h11.94l9.18,13.08h8.93l.13.13h0ZM3392.85,853.74c1.89,1.51,2.77,3.77,2.77,6.66s-.88,5.03-2.77,6.66-4.65,2.39-8.3,2.39h-9.81v-17.85h9.81c3.65,0,6.41.75,8.3,2.26h0v-.13h0Z" />
      <rect fill="none" stroke="#1b4d3e" strokeWidth="80" strokeMiterlimit="10" x="40" y="40" width="843.91" height="852.3" rx="36.55" ry="36.55" />
      <polygon fill="#b8d935" stroke="#1b4d3e" strokeMiterlimit="10" points="722.6 322.13 462.28 452.8 201.97 322.75 461.21 192.52 722.6 322.13" />
      <path fill="#1b4d3e" d="M197.84,426.78c3.86-.53,7.04.85,10.74,1.41l252.53,125.67c84.54-40,167.66-83.83,251.89-124.84,33.14-11.49,50.09,34.15,18.55,49.11l-259.23,129.08c-10.18,3.72-14.14,2.57-23.85-1.31l-264.23-132.98c-17.04-14.4-7.96-43.2,13.61-46.14h0Z" />
      <path fill="#b8d935" d="M195.25,558c3.65-.63,7.4-.4,11.08-.22,86.11,40.47,170.4,85.05,255.95,126.78l252.92-126c29.53-7.22,45.44,28.67,22.29,46.49l-270.42,134.42-8.62.31c-91.6-42.21-181.07-89.86-271.7-134.42-18.72-12.06-13.3-43.58,8.5-47.37h0Z" />
    </g>
  </svg>
);

// ── Arrow icon ─────────────────────────────────────────────────────────────────
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ── Shared site-wide header ────────────────────────────────────────────────────
export default function SiteHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu or search is open
  useEffect(() => {
    document.body.style.overflow = (mobileOpen || searchOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen, searchOpen]);

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
        else if (mobileOpen) setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, mobileOpen]);

  // Active-page detection (no exclusion — show all 10 items)
  const isActive = (item: typeof ALL_NAV[0]) =>
    item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);

  const goLogin = () => { setMobileOpen(false); navigate("/login"); };
  const handleNavClick = (to: string) => { setMobileOpen(false); navigate(to); };

  const handleSearchSelect = (to: string) => {
    setSearchOpen(false);
    navigate(to);
  };

  const filteredSearch = searchQuery.trim().length > 0
    ? SEARCH_ITEMS.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : SEARCH_ITEMS;

  return (
    <>
      <header
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.9)" : clr.white,
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          padding: mobile ? "0 20px" : "0 80px",
          height: "72px",
          boxSizing: "border-box" as const,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky" as const,
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
          <BridgeLogo height={mobile ? 32 : 40} />
        </a>

        {/* Desktop nav — centered, hidden when scrolled */}
        {!mobile && (
          <nav
            style={{
              position: "absolute" as const,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "32px",
              alignItems: "center",
              opacity: scrolled ? 0 : 1,
              pointerEvents: scrolled ? "none" : "auto",
              transition: "opacity 0.3s ease",
            }}
          >
            {ALL_NAV.map((item, i) => {
              const active = isActive(item);
              return (
                <a
                  key={item.label}
                  href={item.to}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.to); }}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    color: active ? clr.primary : hoveredIdx === i ? clr.primary : clr.dark,
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: active ? "700" : "500",
                    fontFamily: "Inter, sans-serif",
                    letterSpacing: "0.3px",
                    transition: "color 0.2s ease",
                    position: "relative" as const,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    paddingBottom: "4px",
                  }}
                >
                  {item.label}
                  {BADGE_ITEMS.has(item.to) && (
                    <span style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "8px", height: "8px", flexShrink: 0 }}>
                      <span style={{ position: "absolute", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#B8D935", animation: "pulseBadge 2s ease-in-out infinite", opacity: 0.6 }} />
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#B8D935", position: "relative", zIndex: 1 }} />
                    </span>
                  )}
                  {/* Active underline bar */}
                  {active && (
                    <span style={{
                      position: "absolute",
                      bottom: "-4px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "20px",
                      height: "3px",
                      backgroundColor: clr.accent,
                      borderRadius: "2px",
                    }} />
                  )}
                </a>
              );
            })}
          </nav>
        )}

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {mobile ? (
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              {/* Search icon on mobile */}
              <button
                onClick={() => { setMobileOpen(false); setSearchOpen(true); }}
                aria-label="Search"
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  color: clr.dark,
                }}
              >
                <Search size={20} strokeWidth={1.75} />
              </button>

              {/* Hamburger/X button on mobile */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                style={{
                  background: mobileOpen ? clr.dark : "transparent",
                  border: `1.5px solid ${mobileOpen ? clr.dark : clr.line}`,
                  borderRadius: "10px",
                  cursor: "pointer",
                  padding: "8px",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  flexDirection: "column" as const,
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "4px",
                  transition: "all 0.3s ease",
                }}
              >
                <span style={{ width: "18px", height: "1.5px", backgroundColor: mobileOpen ? clr.white : clr.primary, borderRadius: "1px", transition: "all 0.3s ease", transform: mobileOpen ? "rotate(45deg) translateY(5.5px)" : "none" }} />
                <span style={{ width: "18px", height: "1.5px", backgroundColor: mobileOpen ? clr.white : clr.primary, borderRadius: "1px", transition: "all 0.3s ease", opacity: mobileOpen ? 0 : 1 }} />
                <span style={{ width: "18px", height: "1.5px", backgroundColor: mobileOpen ? clr.white : clr.primary, borderRadius: "1px", transition: "all 0.3s ease", transform: mobileOpen ? "rotate(-45deg) translateY(-5.5px)" : "none" }} />
              </button>
            </div>
          ) : (
            /* Desktop right side: Search icon + "Request Access" button */
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  color: clr.dark,
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = clr.primary; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = clr.dark; }}
              >
                <Search size={20} strokeWidth={1.75} />
              </button>

              <button
                onClick={goLogin}
                style={{
                  backgroundColor: clr.primary,
                  color: clr.white,
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "50px",
                  fontSize: "14px",
                  fontWeight: "600",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  height: "46px",
                  transition: "background-color 0.2s ease",
                }}
              >
                Request Access
                <span
                  style={{
                    width: "24px",
                    height: "24px",
                    backgroundColor: clr.accent,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: clr.dark,
                  }}
                >
                  <ArrowRight />
                </span>
              </button>
            </div>
          )}
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
            animation: "fadeIn 0.2s ease",
          }}
        >
          <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}@keyframes pulseBadge{0%,100%{transform:scale(1);opacity:0.6}50%{transform:scale(2.2);opacity:0}}`}</style>

          {/* Search header row */}
          <div
            style={{
              padding: mobile ? "0 20px" : "0 80px",
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
                fontSize: mobile ? "18px" : "28px",
                fontWeight: "300",
                fontFamily: "Inter, sans-serif",
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
              <div style={{ padding: `48px ${mobile ? "20px" : "80px"}`, color: "rgba(255,255,255,0.3)", fontSize: "16px", fontFamily: "Inter, sans-serif" }}>
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
                    padding: `16px ${mobile ? "20px" : "80px"}`,
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
                  <span style={{ color: "#FFFFFF", fontSize: mobile ? "16px" : "22px", fontWeight: "400", fontFamily: "Inter, sans-serif", letterSpacing: "-0.2px" }}>
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
          <div style={{ padding: `16px ${mobile ? "20px" : "80px"}`, borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.2)", fontFamily: "Inter, sans-serif" }}>
              Press ESC to close
            </span>
          </div>
        </div>
      )}

      {/* ── Mobile overlay menu ─────────────────────────────────────────────────── */}
      {mobile && mobileOpen && (
        <div
          style={{
            position: "fixed" as const,
            top: "72px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#191919",
            zIndex: 999,
            display: "flex",
            flexDirection: "column" as const,
            padding: "40px 24px 32px",
            animation: "fadeIn 0.25s ease",
            overflowY: "auto" as const,
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column" as const, flex: 1 }}>
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
                    fontSize: "24px",
                    fontWeight: active ? "600" : "300",
                    fontFamily: "Inter, sans-serif",
                    padding: "20px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    letterSpacing: "-0.3px",
                    minHeight: "48px",
                    boxSizing: "border-box" as const,
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {active && (
                      <span style={{ color: "#B8D935", fontSize: "0.5em", lineHeight: 1, flexShrink: 0 }}>●</span>
                    )}
                    {item.label}
                    {BADGE_ITEMS.has(item.to) && (
                      <span style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: "8px", height: "8px", flexShrink: 0 }}>
                        <span style={{ position: "absolute", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#B8D935", animation: "pulseBadge 2s ease-in-out infinite", opacity: 0.6 }} />
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#B8D935", position: "relative", zIndex: 1 }} />
                      </span>
                    )}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={active ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.3)"} strokeWidth="2" strokeLinecap="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              );
            })}
          </nav>

          {/* CTA at bottom */}
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "12px", marginTop: "auto", paddingTop: "24px" }}>
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
                fontFamily: "Inter, sans-serif",
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "12px 0" }}>
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>
                info@bridgepbc.com
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
