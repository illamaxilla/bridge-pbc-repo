import React, { useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";
import { subscribe } from "@/services/supabase";
import { colors } from "@/lib/theme";
import { FOOTER_SECTOR_ICONS, SECTOR_ROUTES, SOCIAL_ICONS, SOCIAL_HREFS } from "@/data/sectorIcons";
import { BridgeLogoWhite } from "@/components/BridgeLogo";
import { cn } from "@/lib/utils";

// ============================================================================
// BRIDGE SHARED FOOTER COMPONENT
// Single source of truth for all footer links, routing, and layout.
// ============================================================================

const PRIMARY = colors.primary;
const ACCENT = colors.accent;
const WHITE = colors.white;

// ─── Correct link map ───────────────────────────────────────────────────────
const FOOTER_LINKS: Record<string, string> = {
  "About BRIDGE": "/about",
  "Our Approach": "/methodology",
  "Sectors": "/sectors",
  "Contact Us": "/contact",
  "FAQ": "/faq",
  "Research & Guidance": "/services",
  "Venture Development": "/services",
  "Direct Investment": "/services",
  "Strategic Partnerships": "/services",
  "White Paper": "/resources",
  "Case Studies": "/resources",
  "Research Library": "/resources",
  "Data & Reports": "/resources",
  "Insights & Analysis": "/insights",
  "Sector Briefs": "/sectors",
  "Policy Updates": "/policy",
  "Annual Review": "/resources",
  "Membership": "/membership",
};

const footerLinkHref = (link: string): string => FOOTER_LINKS[link] || "#";

// ─── Sector routes, icons, and social links imported from @/data/sectorIcons ─

// ─── BRIDGE Logo (white, clickable) ──────────────────────────────────────────
function FooterLogo() {
  const navigate = useNavigate();
  return (
    <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} className="flex items-center h-[40px] no-underline">
      <BridgeLogoWhite height={36} />
    </a>
  );
}

// ─── Sector grid sub-component ───────────────────────────────────────────────
function SectorGrid() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div>
      <div
        className={cn(
          "text-[12px] font-semibold font-['DM_Sans',sans-serif] uppercase tracking-[1.5px] mb-3 transition-colors duration-[250ms] leading-[1] min-h-[12px]",
          hovered !== null ? "text-[#B8D935]" : "text-[rgba(255,255,255,0.4)]"
        )}
      >
        {hovered !== null ? FOOTER_SECTOR_ICONS[hovered].label : "Explore 12 Sectors"}
      </div>
      <div className="flex justify-between items-center">
        {FOOTER_SECTOR_ICONS.map((sector, i) => {
          const isH = hovered === i;
          return (
            <a
              key={sector.key}
              href={SECTOR_ROUTES[sector.key] ?? "#"}
              title={sector.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "flex items-center justify-center w-[44px] h-[44px] rounded-[10px] cursor-pointer no-underline transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] box-border",
                isH
                  ? "bg-[rgba(184,217,53,0.12)] border border-[rgba(184,217,53,0.35)] -translate-y-0.5 shadow-[0_6px_16px_rgba(0,0,0,0.2),0_0_0_1px_rgba(184,217,53,0.15)]"
                  : "bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] translate-y-0 shadow-none"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-center transition-opacity duration-[250ms]",
                  isH ? "opacity-100" : "opacity-50"
                )}
              >
                {sector.icon(isH ? ACCENT : "rgba(255,255,255,0.85)")}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main SiteFooter export ───────────────────────────────────────────────────
// React.memo: SiteFooter receives no props and is rendered by Layout on every route
// change. Memo prevents re-renders when Layout's children (page content) change.
function SiteFooter() {
  const isMobile = useIsMobile();
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async () => {
    const trimmed = trimEmail(email);
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setSubStatus("error");
      return;
    }
    setSubStatus("loading");
    try {
      await subscribe(trimmed);
      setSubStatus("success");
      setEmail("");
    } catch {
      setSubStatus("error");
    }
  };

  const trimEmail = (v: string) => v.trim().toLowerCase();

  return (
    <footer className="bg-[#1B4D3E] p-0">
      {/* Section separator */}
      <div className="px-[80px]">
        <div className="h-[0.5px] bg-[rgba(255,255,255,0.08)]" />
      </div>

      {isMobile ? (
        /* ═══ MOBILE FOOTER ═══ */
        <div className="pt-8 px-5 pb-4 flex flex-col gap-6">
          {/* Row 1: Logo + Nav labels */}
          <div className="flex items-end gap-0">
            <div className="shrink-0">
              <FooterLogo />
            </div>
            <div className="flex gap-2 flex-nowrap ml-auto items-end overflow-hidden">
              {(["Company", "Services", "Insight"] as const).map((label) => {
                const href: Record<string, string> = {
                  Company: "/about",
                  Services: "/services",
                  Insight: "/insights",
                };
                return (
                  <a
                    key={label}
                    href={href[label]}
                    className="font-['DM_Sans',sans-serif] text-[11px] font-semibold text-[rgba(255,255,255,0.5)] tracking-[0px] no-underline whitespace-nowrap shrink-0 leading-[1]"
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          </div>
          {/* Row 2: Subscribe inline */}
          <div className="flex flex-col gap-1.5">
            <div className="flex gap-2">
              <input
                placeholder="Subscribe to insights"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setSubStatus("idle"); }}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                className={cn(
                  "flex-1 py-[11px] px-[14px] rounded-lg bg-[rgba(255,255,255,0.05)] text-white text-[12px] font-['DM_Sans',sans-serif] outline-none border",
                  subStatus === "error" ? "border-[rgba(255,80,80,0.5)]" : "border-[rgba(255,255,255,0.12)]"
                )}
              />
              <button
                onClick={handleSubscribe}
                disabled={subStatus === "loading" || subStatus === "success"}
                className={cn(
                  "border-none py-[11px] px-[18px] text-[12px] font-bold font-['DM_Sans',sans-serif] rounded-lg text-[#1B4D3E] transition-colors duration-200",
                  subStatus === "success" ? "bg-[#4caf50]" : "bg-[#B8D935]",
                  subStatus === "loading" || subStatus === "success" ? "cursor-default" : "cursor-pointer",
                  subStatus === "loading" ? "opacity-70" : "opacity-100"
                )}
              >
                {subStatus === "loading" ? "..." : subStatus === "success" ? "✓" : "→"}
              </button>
            </div>
            {subStatus === "success" && (
              <span className="text-[11px] text-[#8dc63f] font-['DM_Sans',sans-serif]">
                You're subscribed! Thanks.
              </span>
            )}
            {subStatus === "error" && (
              <span className="text-[11px] text-[rgba(255,100,100,0.9)] font-['DM_Sans',sans-serif]">
                Please enter a valid email address.
              </span>
            )}
          </div>
          {/* Row 3: Contact + Social */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-[12px] text-[rgba(255,255,255,0.4)] font-['DM_Sans',sans-serif]">
                Accra, Ghana
              </span>
              <span className="text-[12px] text-[rgba(255,255,255,0.15)]">·</span>
              <span className="text-[12px] text-[#B8D935] font-semibold font-['DM_Sans',sans-serif]">
                info@bridgepbc.com
              </span>
            </div>
            <div className="flex gap-1.5">
              {SOCIAL_ICONS.map((icon, i) => (
                <a
                  key={i}
                  href={SOCIAL_HREFS[i]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-7 h-7 rounded-md bg-[rgba(255,255,255,0.06)] flex items-center justify-center cursor-pointer text-[rgba(255,255,255,0.4)] no-underline"
                >
                  <span className="scale-[0.8125] flex">{icon}</span>
                </a>
              ))}
            </div>
          </div>
          {/* Bottom bar */}
          <div className="pt-4 border-t border-[rgba(255,255,255,0.06)] flex justify-between items-center">
            <span className="text-[11px] text-[rgba(255,255,255,0.25)] font-['DM_Sans',sans-serif]">
              © 2026 BRIDGE PBC
            </span>
            <div className="flex gap-3">
              {[
                { label: "Terms", path: "/terms" },
                { label: "Privacy", path: "/privacy" },
                { label: "Accessibility", path: "/accessibility" },
              ].map(({ label, path }) => (
                <a
                  key={label}
                  href={path}
                  onClick={(e) => { e.preventDefault(); navigate(path); }}
                  className="text-[11px] text-[rgba(255,255,255,0.25)] font-['DM_Sans',sans-serif] no-underline"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ═══ DESKTOP FOOTER ═══ */
        <>
          <div className="pt-16 px-[80px] pb-8 grid grid-cols-[325px_1fr] gap-x-[220px]">
            {/* Left: Logo + description + contact */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <FooterLogo />
                </div>
                <p className="text-sm text-[rgba(255,255,255,0.5)] font-['DM_Sans',sans-serif] leading-[1.8] mt-0 mb-7 mr-0 ml-0 max-w-[320px]">
                  Blending resources and innovation across the integrated sectors for development, growth, and empowerment.
                </p>
                <p className="text-sm text-[rgba(255,255,255,0.55)] font-['DM_Sans',sans-serif] mt-0 mb-1 leading-[1.7]">
                  Accra, Ghana
                </p>
                <p className="text-sm text-[#B8D935] font-['DM_Sans',sans-serif] m-0 font-semibold">
                  info@bridgepbc.com
                </p>
              </div>
            </div>
            {/* Right: Nav columns */}
            <div className="flex flex-col justify-between">
              <div className="flex justify-between">
                {[
                  { title: "Company", links: ["About BRIDGE", "Our Approach", "Sectors", "Contact Us", "FAQ"] },
                  { title: "Services", links: ["Research & Guidance", "Venture Development", "Direct Investment", "Strategic Partnerships"] },
                  { title: "Resources", links: ["White Paper", "Case Studies", "Research Library", "Membership"] },
                  { title: "Insights", links: ["Insights & Analysis", "Sector Briefs", "Policy Updates", "Annual Review"] },
                ].map((col) => (
                  <div key={col.title}>
                    <h4 className="text-[12px] font-bold text-[#B8D935] font-['DM_Sans',sans-serif] uppercase tracking-[1.5px] mt-0 mb-6">
                      {col.title}
                    </h4>
                    {col.links.map((link) => (
                      <a
                        key={link}
                        href={footerLinkHref(link)}
                        className="block text-sm text-[rgba(255,255,255,0.6)] font-['DM_Sans',sans-serif] no-underline mb-3.5"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══ Subscribe row + Sector Grid ═══ */}
          <div className="px-[80px] pb-5 grid grid-cols-[325px_1fr] gap-x-[220px] items-start">
            {/* Subscribe */}
            <div>
              <span className="text-[12px] font-semibold text-[rgba(255,255,255,0.4)] font-['DM_Sans',sans-serif] uppercase tracking-[1.5px] block mb-3 leading-[1]">
                Subscribe to Insights
              </span>
              <div className="flex flex-col gap-1.5">
                <div className="flex gap-2">
                  <input
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setSubStatus("idle"); }}
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                    className={cn(
                      "flex-1 py-3 px-4 rounded-lg bg-[rgba(255,255,255,0.05)] text-white text-[13px] font-['DM_Sans',sans-serif] outline-none h-[44px] box-border border",
                      subStatus === "error" ? "border-[rgba(255,80,80,0.5)]" : "border-[rgba(255,255,255,0.12)]"
                    )}
                  />
                  <button
                    onClick={handleSubscribe}
                    disabled={subStatus === "loading" || subStatus === "success"}
                    className={cn(
                      "border-none py-3 px-5 text-[13px] font-bold font-['DM_Sans',sans-serif] rounded-lg h-[44px] box-border text-[#1B4D3E] transition-colors duration-200",
                      subStatus === "success" ? "bg-[#4caf50]" : "bg-[#B8D935]",
                      subStatus === "loading" || subStatus === "success" ? "cursor-default" : "cursor-pointer",
                      subStatus === "loading" ? "opacity-70" : "opacity-100"
                    )}
                  >
                    {subStatus === "loading" ? "..." : subStatus === "success" ? "✓" : "→"}
                  </button>
                </div>
                {subStatus === "success" && (
                  <span className="text-[11px] text-[#8dc63f] font-['DM_Sans',sans-serif]">
                    You're subscribed! Thanks.
                  </span>
                )}
                {subStatus === "error" && (
                  <span className="text-[11px] text-[rgba(255,100,100,0.9)] font-['DM_Sans',sans-serif]">
                    Please enter a valid email address.
                  </span>
                )}
              </div>
              {/* Social icons */}
              <div className="flex gap-2.5 mt-4">
                {SOCIAL_ICONS.map((icon, i) => (
                  <a
                    key={i}
                    href={SOCIAL_HREFS[i]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[34px] h-[34px] rounded-lg bg-[rgba(255,255,255,0.06)] flex items-center justify-center cursor-pointer text-[rgba(255,255,255,0.45)] no-underline"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
            {/* Sector Grid */}
            <div>
              <SectorGrid />
            </div>
          </div>

          {/* Bottom bar */}
          <div className="py-5 px-[80px] border-t border-[rgba(255,255,255,0.06)] flex justify-between items-center">
            <span className="text-[11px] text-[rgba(255,255,255,0.25)] font-['DM_Sans',sans-serif]">
              © 2026 BRIDGE PBC
            </span>
            <div className="flex gap-5">
              {[
                { label: "Terms", path: "/terms" },
                { label: "Privacy", path: "/privacy" },
                { label: "Accessibility", path: "/accessibility" },
              ].map(({ label, path }) => (
                <a
                  key={label}
                  href={path}
                  onClick={(e) => { e.preventDefault(); navigate(path); }}
                  className="text-[11px] text-[rgba(255,255,255,0.25)] font-['DM_Sans',sans-serif] no-underline"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </footer>
  );
}

export default memo(SiteFooter);
