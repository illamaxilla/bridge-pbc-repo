import React, { useState, useEffect, useRef, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, User, Menu, X } from "lucide-react";
import { colors as clr } from "@/lib/theme";
import { BridgeLogo } from "@/components/BridgeLogo";
import { useScrollLock } from "@/hooks/useScrollLock";
import { cn } from "@/lib/utils";

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
// React.memo: SiteHeader receives no props and is rendered by Layout on every route
// change. Memo prevents re-renders when Layout's children (page content) change.
function SiteHeader() {
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

  return (
    <>
      <header
        className={cn(
          "px-[clamp(20px,5vw,80px)] h-[72px] box-border flex items-center justify-between sticky top-0 z-[1000] transition-[background-color,box-shadow] duration-300 ease-in-out",
          scrolled
            ? "bg-white/90 backdrop-blur-[12px] shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
            : "bg-white shadow-none backdrop-blur-none"
        )}
      >
        {/* Logo → Home */}
        <a
          href="/"
          onClick={(e) => { e.preventDefault(); handleNavClick("/"); }}
          className="flex items-center h-10 no-underline shrink-0"
        >
          <BridgeLogo height={36} />
        </a>

        {/* Right side — 3 icons */}
        <div className="flex items-center gap-1">
          {/* Search */}
          <button
            aria-label="Search"
            onClick={() => { setMenuOpen(false); setSearchOpen(true); }}
            className="bg-transparent border-none cursor-pointer p-2 flex items-center justify-center rounded-lg text-[#191919] transition-colors duration-200 hover:text-[#1B4D3E]"
          >
            <Search size={20} strokeWidth={1.75} />
          </button>

          {/* Account → Login */}
          <button
            aria-label="Account"
            onClick={goLogin}
            className="bg-transparent border-none cursor-pointer p-2 flex items-center justify-center rounded-lg text-[#191919] transition-colors duration-200 hover:text-[#1B4D3E]"
          >
            <User size={20} strokeWidth={1.75} />
          </button>

          {/* Menu toggle */}
          <button
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className={cn(
              "bg-transparent border-none cursor-pointer p-2 flex items-center justify-center rounded-lg transition-colors duration-200",
              menuOpen
                ? "text-white bg-[#191919]"
                : "text-[#191919] hover:text-[#1B4D3E]"
            )}
          >
            {menuOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
          </button>
        </div>
      </header>

      {/* ── Full-screen SEARCH overlay ─────────────────────────────────────────── */}
      {searchOpen && (
        <div
          className="fixed inset-0 bg-[#191919] z-[1001] flex flex-col animate-[fadeInMenu_0.2s_ease]"
        >
          <style>{`@keyframes fadeInMenu{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>

          {/* Search header row */}
          <div
            className="px-[clamp(20px,5vw,80px)] h-[72px] flex items-center gap-4 border-b border-white/[0.08] shrink-0"
          >
            <Search size={22} color="rgba(255,255,255,0.4)" strokeWidth={1.75} className="shrink-0" />
            <input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pages and sectors..."
              className="flex-1 bg-transparent border-none outline-none text-white text-[clamp(18px,3vw,28px)] font-light font-[DM_Sans,sans-serif] tracking-[-0.3px]"
            />
            <button
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
              className="bg-white/[0.08] border-none rounded-lg cursor-pointer w-9 h-9 flex items-center justify-center text-white/60 shrink-0"
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto py-2">
            {filteredSearch.length === 0 ? (
              <div className="py-12 px-[clamp(20px,5vw,80px)] text-white/30 text-base font-[DM_Sans,sans-serif]">
                No results for &ldquo;{searchQuery}&rdquo;
              </div>
            ) : (
              filteredSearch.map((item) => (
                <button
                  key={item.to}
                  onClick={() => handleSearchSelect(item.to)}
                  className="flex items-center justify-between w-full py-4 px-[clamp(20px,5vw,80px)] bg-transparent border-none border-b border-white/[0.04] cursor-pointer text-left transition-colors duration-150 hover:bg-white/[0.04]"
                >
                  <span className="text-white text-[clamp(16px,2.5vw,22px)] font-normal font-[DM_Sans,sans-serif] tracking-[-0.2px]">
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
          <div className="py-4 px-[clamp(20px,5vw,80px)] border-t border-white/[0.06] shrink-0">
            <span className="text-xs text-white/20 font-[DM_Sans,sans-serif]">
              Press ESC to close
            </span>
          </div>
        </div>
      )}

      {/* ── Full-screen NAV overlay ─────────────────────────────────────────────── */}
      {menuOpen && (
        <div
          className="fixed top-[72px] left-0 right-0 bottom-0 bg-[#191919] z-[999] flex flex-col py-10 pb-8 px-[clamp(20px,5vw,80px)] animate-[fadeInMenu_0.25s_ease] overflow-y-auto"
        >
          <style>{`@keyframes fadeInMenu{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}@keyframes pulseBadge{0%,100%{transform:scale(1);opacity:0.6}50%{transform:scale(2.2);opacity:0}}`}</style>

          <nav className="flex flex-col flex-1">
            {ALL_NAV.map((item) => {
              const active = isActive(item);
              return (
                <a
                  key={item.label}
                  href={item.to}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.to); }}
                  className={cn(
                    "no-underline text-[clamp(22px,4vw,32px)] font-[DM_Sans,sans-serif] py-5 border-b border-white/[0.08] flex items-center justify-between tracking-[-0.5px] min-h-[48px] box-border",
                    active ? "text-white font-semibold" : "text-white/60 font-light"
                  )}
                >
                  <span className="flex items-center gap-3">
                    {active && (
                      <span className="text-[#B8D935] text-[0.6em] leading-none shrink-0">●</span>
                    )}
                    {item.label}
                    {item.badge && (
                      <span className="relative inline-flex items-center justify-center w-2 h-2 shrink-0">
                        <span className="absolute w-2 h-2 rounded-full bg-[#B8D935] animate-[pulseBadge_2s_ease-in-out_infinite] opacity-60" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B8D935] relative z-[1]" />
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
          <div className="flex flex-col gap-3 mt-auto pt-6">
            <button
              onClick={goLogin}
              className="bg-[#B8D935] text-[#191919] border-none py-4 px-6 rounded-xl text-base font-bold font-[DM_Sans,sans-serif] cursor-pointer w-full flex items-center justify-center gap-2 min-h-[56px]"
            >
              Request Access
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#191919" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <div className="flex items-center justify-center py-3">
              <span className="text-[13px] text-white/[0.35] font-[DM_Sans,sans-serif]">
                info@bridgepbc.com
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(SiteHeader);
