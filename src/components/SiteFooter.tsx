import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";
import { supabase } from "@/integrations/supabase/client";
import { colors } from "@/lib/theme";
import { FOOTER_SECTOR_ICONS, SECTOR_ROUTES, SOCIAL_ICONS, SOCIAL_HREFS } from "@/data/sectorIcons";
import { BridgeLogoWhite } from "@/components/BridgeLogo";

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
};

const footerLinkHref = (link: string): string => FOOTER_LINKS[link] || "#";

// ─── Sector routes, icons, and social links imported from @/data/sectorIcons ─

// ─── BRIDGE Logo (white, clickable) ──────────────────────────────────────────
function FooterLogo() {
  const navigate = useNavigate();
  return (
    <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }} style={{ display: "flex", alignItems: "center", height: "40px", textDecoration: "none" }}>
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
        style={{
          fontSize: "12px",
          fontWeight: "600",
          color: hovered !== null ? ACCENT : "rgba(255,255,255,0.4)",
          fontFamily: "'DM Sans', sans-serif",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          marginBottom: "12px",
          transition: "color 0.25s ease",
          lineHeight: "1",
          minHeight: "12px",
        }}
      >
        {hovered !== null ? FOOTER_SECTOR_ICONS[hovered].label : "Explore 12 Sectors"}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {FOOTER_SECTOR_ICONS.map((sector, i) => {
          const isH = hovered === i;
          return (
            <a
              key={sector.key}
              href={SECTOR_ROUTES[sector.key] ?? "#"}
              title={sector.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                backgroundColor: isH ? "rgba(184,217,53,0.12)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${isH ? "rgba(184,217,53,0.35)" : "rgba(255,255,255,0.07)"}`,
                cursor: "pointer",
                textDecoration: "none",
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isH ? "translateY(-2px)" : "none",
                boxShadow: isH ? "0 6px 16px rgba(0,0,0,0.2), 0 0 0 1px rgba(184,217,53,0.15)" : "none",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  opacity: isH ? 1 : 0.5,
                  transition: "opacity 0.25s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {sector.icon(isH ? ACCENT : "rgba(255,255,255,0.85)")}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

// ─── Main SiteFooter export ───────────────────────────────────────────────────
export default function SiteFooter() {
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
    const { error } = await supabase.from("subscribers").insert({ email: trimmed });
    if (error && error.code !== "23505") {
      setSubStatus("error");
    } else {
      setSubStatus("success");
      setEmail("");
    }
  };

  const trimEmail = (v: string) => v.trim().toLowerCase();

  return (
    <footer style={{ backgroundColor: PRIMARY, padding: "0" }}>
      {/* Section separator */}
      <div style={{ padding: "0 80px" }}>
        <div style={{ height: "0.5px", backgroundColor: "rgba(255,255,255,0.08)" }} />
      </div>

      {isMobile ? (
        /* ═══ MOBILE FOOTER ═══ */
        <div style={{ padding: "32px 20px 16px", display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Row 1: Logo + Nav labels */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: "0" }}>
            <div style={{ flexShrink: 0 }}>
              <FooterLogo />
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "nowrap", marginLeft: "auto", alignItems: "flex-end", overflow: "hidden" }}>
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
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11px",
                      fontWeight: "600",
                      color: "rgba(255,255,255,0.5)",
                      letterSpacing: "0px",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      lineHeight: "1",
                    }}
                  >
                    {label}
                  </a>
                );
              })}
            </div>
          </div>
          {/* Row 2: Subscribe inline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                placeholder="Subscribe to insights"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setSubStatus("idle"); }}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                style={{
                  flex: 1,
                  padding: "11px 14px",
                  borderRadius: "8px",
                  border: `1px solid ${subStatus === "error" ? "rgba(255,80,80,0.5)" : "rgba(255,255,255,0.12)"}`,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  color: WHITE,
                  fontSize: "12px",
                  fontFamily: "'DM Sans', sans-serif",
                  outline: "none",
                }}
              />
              <button
                onClick={handleSubscribe}
                disabled={subStatus === "loading" || subStatus === "success"}
                style={{
                  backgroundColor: subStatus === "success" ? "#4caf50" : ACCENT,
                  color: PRIMARY,
                  border: "none",
                  padding: "11px 18px",
                  fontSize: "12px",
                  fontWeight: "700",
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: subStatus === "loading" || subStatus === "success" ? "default" : "pointer",
                  borderRadius: "8px",
                  opacity: subStatus === "loading" ? 0.7 : 1,
                  transition: "background-color 0.2s ease",
                }}
              >
                {subStatus === "loading" ? "..." : subStatus === "success" ? "✓" : "→"}
              </button>
            </div>
            {subStatus === "success" && (
              <span style={{ fontSize: "11px", color: "#8dc63f", fontFamily: "'DM Sans', sans-serif" }}>
                You're subscribed! Thanks.
              </span>
            )}
            {subStatus === "error" && (
              <span style={{ fontSize: "11px", color: "rgba(255,100,100,0.9)", fontFamily: "'DM Sans', sans-serif" }}>
                Please enter a valid email address.
              </span>
            )}
          </div>
          {/* Row 3: Contact + Social */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>
                Accra, Ghana
              </span>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.15)" }}>·</span>
              <span style={{ fontSize: "12px", color: ACCENT, fontWeight: "600", fontFamily: "'DM Sans', sans-serif" }}>
                info@bridgepbc.com
              </span>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              {SOCIAL_ICONS.map((icon, i) => (
                <a
                  key={i}
                  href={SOCIAL_HREFS[i]}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "6px",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.4)",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ transform: "scale(0.8125)", display: "flex" }}>{icon}</span>
                </a>
              ))}
            </div>
          </div>
          {/* Bottom bar */}
          <div
            style={{
              paddingTop: "16px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif" }}>
              © 2026 BRIDGE PBC
            </span>
            <div style={{ display: "flex", gap: "12px" }}>
              {["Terms", "Privacy", "Accessibility"].map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.25)",
                    fontFamily: "'DM Sans', sans-serif",
                    textDecoration: "none",
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ═══ DESKTOP FOOTER ═══ */
        <>
          <div style={{ padding: "64px 80px 32px", display: "grid", gridTemplateColumns: "325px 1fr", gap: "220px" }}>
            {/* Left: Logo + description + contact */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ marginBottom: "24px" }}>
                  <FooterLogo />
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: "1.8",
                    margin: "0 0 28px",
                    maxWidth: "320px",
                  }}
                >
                  Blending resources and innovation across the integrated sectors for development, growth, and empowerment.
                </p>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", fontFamily: "'DM Sans', sans-serif", margin: "0 0 4px", lineHeight: "1.7" }}>
                  Accra, Ghana
                </p>
                <p style={{ fontSize: "14px", color: ACCENT, fontFamily: "'DM Sans', sans-serif", margin: "0", fontWeight: "600" }}>
                  info@bridgepbc.com
                </p>
              </div>
            </div>
            {/* Right: Nav columns */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {[
                  { title: "Company", links: ["About BRIDGE", "Our Approach", "Sectors", "Contact Us"] },
                  { title: "Services", links: ["Research & Guidance", "Venture Development", "Direct Investment", "Strategic Partnerships"] },
                  { title: "Resources", links: ["White Paper", "Case Studies", "Research Library", "Data & Reports"] },
                  { title: "Insights", links: ["Insights & Analysis", "Sector Briefs", "Policy Updates", "Annual Review"] },
                ].map((col) => (
                  <div key={col.title}>
                    <h4
                      style={{
                        fontSize: "12px",
                        fontWeight: "700",
                        color: ACCENT,
                        fontFamily: "'DM Sans', sans-serif",
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        marginBottom: "24px",
                        margin: "0 0 24px",
                      }}
                    >
                      {col.title}
                    </h4>
                    {col.links.map((link) => (
                      <a
                        key={link}
                        href={footerLinkHref(link)}
                        style={{
                          display: "block",
                          fontSize: "14px",
                          color: "rgba(255,255,255,0.6)",
                          fontFamily: "'DM Sans', sans-serif",
                          textDecoration: "none",
                          marginBottom: "14px",
                        }}
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
          <div
            style={{
              padding: "0 80px 20px",
              display: "grid",
              gridTemplateColumns: "325px 1fr",
              gap: "220px",
              alignItems: "start",
            }}
          >
            {/* Subscribe */}
            <div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "'DM Sans', sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  display: "block",
                  marginBottom: "12px",
                  lineHeight: "1",
                }}
              >
                Subscribe to Insights
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setSubStatus("idle"); }}
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                    style={{
                      flex: 1,
                      padding: "12px 16px",
                      borderRadius: "8px",
                      border: `1px solid ${subStatus === "error" ? "rgba(255,80,80,0.5)" : "rgba(255,255,255,0.12)"}`,
                      backgroundColor: "rgba(255,255,255,0.05)",
                      color: WHITE,
                      fontSize: "13px",
                      fontFamily: "'DM Sans', sans-serif",
                      outline: "none",
                      height: "44px",
                      boxSizing: "border-box",
                    }}
                  />
                  <button
                    onClick={handleSubscribe}
                    disabled={subStatus === "loading" || subStatus === "success"}
                    style={{
                      backgroundColor: subStatus === "success" ? "#4caf50" : ACCENT,
                      color: PRIMARY,
                      border: "none",
                      padding: "12px 20px",
                      fontSize: "13px",
                      fontWeight: "700",
                      fontFamily: "'DM Sans', sans-serif",
                      cursor: subStatus === "loading" || subStatus === "success" ? "default" : "pointer",
                      borderRadius: "8px",
                      height: "44px",
                      boxSizing: "border-box",
                      opacity: subStatus === "loading" ? 0.7 : 1,
                      transition: "background-color 0.2s ease",
                    }}
                  >
                    {subStatus === "loading" ? "..." : subStatus === "success" ? "✓" : "→"}
                  </button>
                </div>
                {subStatus === "success" && (
                  <span style={{ fontSize: "11px", color: "#8dc63f", fontFamily: "'DM Sans', sans-serif" }}>
                    You're subscribed! Thanks.
                  </span>
                )}
                {subStatus === "error" && (
                  <span style={{ fontSize: "11px", color: "rgba(255,100,100,0.9)", fontFamily: "'DM Sans', sans-serif" }}>
                    Please enter a valid email address.
                  </span>
                )}
              </div>
              {/* Social icons */}
              <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                {SOCIAL_ICONS.map((icon, i) => (
                  <a
                    key={i}
                    href={SOCIAL_HREFS[i]}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(255,255,255,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "rgba(255,255,255,0.45)",
                      textDecoration: "none",
                    }}
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
          <div
            style={{
              padding: "20px 80px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif" }}>
              © 2026 BRIDGE PBC
            </span>
            <div style={{ display: "flex", gap: "20px" }}>
              {["Terms", "Privacy", "Accessibility"].map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.25)",
                    fontFamily: "'DM Sans', sans-serif",
                    textDecoration: "none",
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </footer>
  );
}
