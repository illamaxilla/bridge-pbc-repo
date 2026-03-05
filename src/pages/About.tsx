import React, { useState, useEffect, useRef } from "react";

// ============================================================================
// BRIDGE ABOUT US PAGE v3
// BRIDGE = tool, resource, and solution for entrepreneurs, businesses,
// investors, and government agencies. Every stat is about the ecosystem.
// ============================================================================

const colors = {
  primary: "#1B4D3E",
  accent: "#B8D935",
  accentText: "#5C7A1F",
  background: "#F3F5F2",
  white: "#FFFFFF",
  dark: "#191919",
  line: "#DEDEDE",
  ctaGreen: "#2E5A4D",
};

const CONTENT_MAX_WIDTH = "1200px";
const MOBILE_BREAKPOINT = 768;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

const navHref = (item: string) =>
  item === "Home" ? "/" :
  item === "About" ? "/about" :
  (item === "Services" || item === "Sectors") ? "/services" : "#";

const sectorRoutes: Record<string, string> = {
  infra: "/sectors/infrastructure",
  fin: "/sectors/financial",
  health: "/sectors/health",
  tech: "/sectors/technology",
  edu: "/sectors/education",
  agri: "/sectors/agriculture",
  energy: "/sectors/energy",
  mfg: "/sectors/manufacturing",
  tourism: "/sectors/tourism",
  housing: "/sectors/housing",
  transport: "/sectors/transport",
  sports: "/sectors/sports",
};

// ============================================================================
// HEADER — Exact spec from BRIDGE_Header_Handoff.md
// ============================================================================
const Header = () => {
  const [hoveredNav, setHoveredNav] = useState(null);
  const [logoHovered, setLogoHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        backgroundColor: isScrolled ? "rgba(255,255,255,0.85)" : colors.white,
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
        padding: isMobile ? "0 20px" : "0 80px",
        height: "72px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: isScrolled ? "0 2px 20px rgba(0,0,0,0.04)" : "0 2px 20px rgba(0,0,0,0.06)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Logo with hover: dark → primary */}
      {(() => {
        const c = logoHovered ? colors.primary : colors.dark;
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "40px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            <svg viewBox="0 0 3434.33 932.3" height="36" style={{ display: "block" }}>
              <path fill={colors.accent} d="M2070.26,927.95c-.2.2-.5.4-.7.5h-.3l1-.5Z" />
              <path fill="#0fea68" d="M2070.26,927.95c-.2.2-.5.4-.7.5h-.3l1-.5Z" />
              <path
                fill={c}
                d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9h0ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z"
              />
              <path
                fill={c}
                stroke={c}
                strokeWidth="0.5"
                strokeMiterlimit="10"
                d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1h0Z"
              />
              <path
                fill={c}
                stroke={c}
                strokeWidth="0.5"
                strokeMiterlimit="10"
                d="M1488.08,578.65v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"
              />
              <rect fill={colors.accent} x="1427.38" y="17.35" width="205.2" height="145" />
              <rect fill={c} x="1427.48" y="221.75" width="205.2" height="693.2" rx="9.6" ry="9.6" />
              <path
                fill={c}
                d="M2757.31,19.09h491.3c5.42,0,9.82,4.4,9.82,9.82v218.7c0,5.42-4.4,9.82-9.82,9.82h-507.36c-56.98,0-108.53,23.02-145.87,60.35-37.34,37.23-60.45,88.79-60.45,145.66,0,113.75,92.37,206.01,206.32,206.01h12.89c2.86,0,5.11,2.25,5.11,5.11v236.7c0,1.13-.92,1.94-1.94,1.94h0c-242.22,0-438.52-195.99-438.52-437.8v-18.51c0-241.81,196.29-437.8,438.52-437.8h0Z"
              />
              <rect fill={c} x="2812.75" y="339.47" width="216.75" height="572.62" rx="9.6" ry="9.6" />
              <rect fill={colors.accent} x="3083.41" y="339.47" width="175.12" height="257.67" />
              <rect fill={colors.accent} x="3083.41" y="654.42" width="175.12" height="257.67" />
              <circle
                fill="none"
                stroke={colors.dark}
                strokeWidth="5"
                strokeMiterlimit="10"
                cx="3385.56"
                cy="866.94"
                r="46.27"
              />
              <path
                fill={colors.dark}
                d="M3404.8,889.32l-10.31-14.71c.25,0,.38-.13.63-.25,2.89-1.26,5.03-3.02,6.54-5.41s2.26-5.15,2.26-8.55c0-5.03-1.76-8.93-5.16-11.82s-8.05-4.27-14.08-4.27h-18.36v44.89h8.3v-13.08h11.94l9.18,13.08h8.93l.13.13h0ZM3392.85,853.74c1.89,1.51,2.77,3.77,2.77,6.66s-.88,5.03-2.77,6.66-4.65,2.39-8.3,2.39h-9.81v-17.85h9.81c3.65,0,6.41.75,8.3,2.26h0v-.13h0Z"
              />
              <rect
                fill="none"
                stroke={c}
                strokeWidth="80"
                strokeMiterlimit="10"
                x="40"
                y="40"
                width="843.91"
                height="852.3"
                rx="36.55"
                ry="36.55"
              />
              <polygon
                fill={colors.accent}
                stroke={c}
                strokeMiterlimit="10"
                points="722.6 322.13 462.28 452.8 201.97 322.75 461.21 192.52 722.6 322.13"
              />
              <path
                fill={c}
                d="M197.84,426.78c3.86-.53,7.04.85,10.74,1.41l252.53,125.67c84.54-40,167.66-83.83,251.89-124.84,33.14-11.49,50.09,34.15,18.55,49.11l-259.23,129.08c-10.18,3.72-14.14,2.57-23.85-1.31l-264.23-132.98c-17.04-14.4-7.96-43.2,13.61-46.14h0Z"
              />
              <path
                fill={colors.accent}
                d="M195.25,558c3.65-.63,7.4-.4,11.08-.22,86.11,40.47,170.4,85.05,255.95,126.78l252.92-126c29.53-7.22,45.44,28.67,22.29,46.49l-270.42,134.42-8.62.31c-91.6-42.21-181.07-89.86-271.7-134.42-18.72-12.06-13.3-43.58,8.5-47.37h0Z"
              />
            </svg>
          </div>
        );
      })()}

      {/* Navigation — only when desktop AND not scrolled */}
      {!isScrolled && !isMobile && (
        <nav
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "32px",
            alignItems: "center",
          }}
        >
          {["About", "Sectors", "Services", "Insights", "Contact"].map((item, i) => (
            <a
              key={item}
              href={navHref(item)}
              onMouseEnter={() => setHoveredNav(i)}
              onMouseLeave={() => setHoveredNav(null)}
              style={{
                color: hoveredNav === i ? colors.primary : colors.dark,
                textDecoration: "none",
                fontSize: "15px",
                fontWeight: "500",
                fontFamily: "Inter, sans-serif",
                letterSpacing: "0.3px",
                transition: "color 0.2s ease",
              }}
            >
              {item}
            </a>
          ))}
        </nav>
      )}

      {/* Right Icons — always visible */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Search */}
        <a
          href="#"
          className="header-icon"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.dark}
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
        </a>
        {/* User */}
        <a
          href="#"
          className="header-icon"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.dark}
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </a>
        {/* Menu (hamburger) */}
        <a
          href="#"
          className="header-icon"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.dark}
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </a>
      </div>
    </header>
  );
};

// ============================================================================
// SECTION 1: Hero — KEPT
// ============================================================================
function HeroSection({ isMobile }) {
  const stats = [
    { label: "SMEs Powering Ghana", value: "2.5M", highlight: true },
    { label: "GDP From Small Business", value: "70%", highlight: false },
    { label: "Annual SME Credit Gap", value: "$4–6B", highlight: false },
    { label: "Citizens Building Futures", value: "34M", highlight: false },
  ];

  return (
    <section
      style={{
        backgroundColor: colors.primary,
        padding: isMobile ? "48px 20px 60px" : "80px 80px 120px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "40%",
          opacity: 0.04,
          background: `repeating-linear-gradient(45deg, transparent, transparent 40px, ${colors.accent} 40px, ${colors.accent} 42px)`,
        }}
      />

      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: isMobile ? "block" : "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "60px",
          }}
        >
          <div style={{ flex: "1 1 55%", maxWidth: isMobile ? "100%" : "580px" }}>
            <h1
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: isMobile ? "34px" : "56px",
                fontWeight: "300",
                lineHeight: "1.1",
                color: colors.white,
                margin: isMobile ? "0 0 20px 0" : "0 0 32px 0",
                letterSpacing: "-1px",
              }}
            >
              The potential <span style={{ fontWeight: "700" }}>exists</span>
              <br />
              We help you{" "}
              <span style={{ fontWeight: "700", color: colors.accent, position: "relative" }}>
                realize
                <svg
                  style={{ position: "absolute", bottom: "-6px", left: 0, width: "100%" }}
                  height="8"
                  viewBox="0 0 200 8"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 6 Q50 0 100 4 T200 3"
                    fill="none"
                    stroke={colors.accent}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              it
            </h1>

            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? "15px" : "17px",
                fontWeight: "400",
                lineHeight: "1.7",
                color: "rgba(255,255,255,0.65)",
                margin: 0,
                maxWidth: "480px",
              }}
            >
              BRIDGE is a tool, resource, and solution for entrepreneurs building ventures, businesses scaling
              operations, investors seeking impact, and government agencies delivering results — we are a bridge to that
              outcome.
            </p>
          </div>

          <div
            style={{
              flex: "0 0 auto",
              display: "grid",
              gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "1fr",
              gap: isMobile ? "8px" : "12px",
              marginTop: isMobile ? "28px" : "0",
              width: isMobile ? "100%" : "320px",
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  background: stat.highlight ? colors.accent : "rgba(255,255,255,0.08)",
                  borderRadius: isMobile ? "10px" : "14px",
                  padding: isMobile ? "10px 12px" : "18px 24px",
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  justifyContent: isMobile ? "center" : "space-between",
                  alignItems: isMobile ? "flex-start" : "center",
                  gap: isMobile ? "2px" : "0",
                  backdropFilter: stat.highlight ? "none" : "blur(10px)",
                  border: stat.highlight ? "none" : "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: isMobile ? "10px" : "14px",
                    fontWeight: "500",
                    color: stat.highlight ? colors.primary : "rgba(255,255,255,0.7)",
                    ...(isMobile && { order: 2 }),
                  }}
                >
                  {stat.label}
                </span>
                <span
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: isMobile ? "20px" : "22px",
                    fontWeight: "700",
                    color: stat.highlight ? colors.primary : colors.white,
                    ...(isMobile && { order: 1 }),
                  }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 2: Our Vision — Centered pull quote
// ============================================================================
function VisionSection({ isMobile }) {
  return (
    <section
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "60px 20px" : "120px 80px",
      }}
    >
      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        {/* Section pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            border: `1px solid ${colors.line}`,
            borderRadius: "50px",
            padding: "8px 20px",
            marginBottom: isMobile ? "32px" : "48px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: colors.accent,
            }}
          />
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: colors.primary,
            }}
          >
            OUR VISION
          </span>
        </div>

        {/* Quote */}
        <h2
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: isMobile ? "24px" : "38px",
            fontWeight: "400",
            lineHeight: "1.4",
            color: colors.primary,
            margin: isMobile ? "0 0 32px 0" : "0 0 40px 0",
            letterSpacing: "-0.3px",
          }}
        >
          A Ghana where every citizen has the <em style={{ fontWeight: "700", fontStyle: "italic" }}>tools</em> to
          thrive, the <em style={{ fontWeight: "700", fontStyle: "italic" }}>security</em> to plan, and the{" "}
          <em style={{ fontWeight: "700", fontStyle: "italic" }}>agency</em> to{" "}
          <em style={{ fontWeight: "700", fontStyle: "italic", color: colors.accent }}>bridge the gap</em>
        </h2>

        {/* Decorative separator */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            marginBottom: isMobile ? "32px" : "40px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "2px",
              backgroundColor: colors.line,
            }}
          />
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: colors.accent,
            }}
          />
          <div
            style={{
              width: "48px",
              height: "2px",
              backgroundColor: colors.line,
            }}
          />
        </div>

        {/* Supporting text */}
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "14px" : "15px",
            fontWeight: "400",
            lineHeight: "1.7",
            color: "#999",
            maxWidth: "620px",
            margin: "0 auto",
          }}
        >
          We see a future where no venture fails for lack of intelligence, no business stalls for lack of the right
          connections, and no policy falls short for lack of execution — where the distance between ambition and outcome
          is something every Ghanaian can close.
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 3: Our Mission — (Tool / Resource / Solution)
// ============================================================================
function WhatWeDoSection({ isMobile }) {
  const [activeTab, setActiveTab] = useState(0);
  const [showCapabilities, setShowCapabilities] = useState(false);

  const tabs = [
    {
      label: "Tool",
      headline: "The intelligence to act",
      description:
        "Entrepreneurs and businesses need more than capital — they need clarity. BRIDGE delivers sector-by-sector market intelligence, competitive mapping, and venture scoring built from hundreds of data points across Ghana's economy.",
      items: [
        "Sector-by-sector market intelligence",
        "Competitive landscape mapping",
        "Root cause diagnostics",
        "BRIDGE Impact Score methodology",
        "Venture readiness assessment",
      ],
      accent:
        "For entrepreneurs and founders who need to see the full picture before they build — and investors who want to back ventures built on evidence, not assumptions.",
    },
    {
      label: "Resource",
      headline: "The connections to scale",
      description:
        "Scaling in Ghana means navigating capital gaps, regulatory complexity, and supply chain fragility — often simultaneously. BRIDGE connects you to the right investors, partners, and policy frameworks at the right stage.",
      items: [
        "Blended finance structuring",
        "Government policy alignment",
        "Diaspora network access",
        "Cross-sector partnerships",
        "Value chain optimization",
      ],
      accent:
        "For businesses that have outgrown what one resource stream can offer — and need orchestrated access to government, development finance, diaspora, and commercial capital.",
    },
    {
      label: "Solution",
      headline: "The execution to deliver",
      description:
        "Policy doesn't implement itself. Capital doesn't deploy itself. BRIDGE provides end-to-end execution support — from structuring PPPs to coordinating multi-stakeholder initiatives and measuring real outcomes.",
      items: [
        "PPP structuring and support",
        "Multi-stakeholder coordination",
        "Three-tier impact measurement",
        "Evidence-based program design",
        "Outcome reporting frameworks",
      ],
      accent:
        "For government agencies and institutional investors who need a trusted execution partner — one that closes the gap between strategy on paper and results on the ground.",
    },
  ];

  const active = tabs[activeTab];

  return (
    <section
      style={{
        backgroundColor: colors.background,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Mobile: tabs + capabilities FIRST, then description */}
        {isMobile ? (
          <>
            {/* Section pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                border: `1px solid ${colors.line}`,
                borderRadius: "50px",
                padding: "8px 20px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: colors.accent,
                }}
              />
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: "700",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: colors.primary,
                }}
              >
                OUR MISSION
              </span>
            </div>

            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "15px",
                fontWeight: "400",
                lineHeight: "1.6",
                color: "#555",
                margin: "0 0 20px 0",
              }}
            >
              To deliver the intelligence, resources, and strategies that{" "}
              <span style={{ fontWeight: "600", color: colors.primary }}>bridge the gap</span> between opportunity and
              outcome.
            </p>

            <h2
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "32px",
                fontWeight: "300",
                lineHeight: "1.15",
                color: colors.primary,
                margin: "0 0 24px 0",
                letterSpacing: "-0.5px",
              }}
            >
              A <span style={{ fontWeight: "700" }}>tool</span>, a <span style={{ fontWeight: "700" }}>resource</span>,{" "}
              and a <span style={{ fontWeight: "700", color: colors.accent }}>solution</span>
            </h2>

            {/* Tab bar — mobile first */}
            <div
              style={{
                display: "flex",
                gap: "4px",
                marginBottom: "16px",
                background: colors.white,
                borderRadius: "14px",
                padding: "4px",
                border: `1px solid ${colors.line}`,
              }}
            >
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveTab(i);
                    setShowCapabilities(false);
                  }}
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "14px",
                    fontWeight: i === activeTab ? "700" : "500",
                    backgroundColor: i === activeTab ? colors.primary : "transparent",
                    color: i === activeTab ? colors.white : "#666",
                    transition: "all 0.3s ease",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Capabilities toggle — mobile */}
            <button
              onClick={() => setShowCapabilities(!showCapabilities)}
              style={{
                width: "100%",
                background: colors.white,
                borderRadius: showCapabilities ? "16px 16px 0 0" : "16px",
                padding: "16px 20px",
                border: `1px solid ${colors.line}`,
                borderBottom: showCapabilities ? "none" : `1px solid ${colors.line}`,
                boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                marginBottom: showCapabilities ? "0" : "28px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: colors.accent,
                  }}
                />
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: colors.accentText,
                  }}
                >
                  CAPABILITIES
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "#999",
                  }}
                >
                  ({active.items.length})
                </span>
              </div>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: showCapabilities ? colors.primary : colors.background,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  style={{
                    transform: showCapabilities ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <path
                    d="M2 4l4 4 4-4"
                    stroke={showCapabilities ? colors.white : colors.primary}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </button>

            {showCapabilities && (
              <div
                style={{
                  background: colors.white,
                  borderRadius: "0 0 16px 16px",
                  padding: "0 20px 20px",
                  border: `1px solid ${colors.line}`,
                  borderTop: "none",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                  marginBottom: "28px",
                }}
              >
                {active.items.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "10px 0",
                      borderBottom: i < active.items.length - 1 ? `1px solid ${colors.line}` : "none",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: colors.accent,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: "400",
                        lineHeight: "1.4",
                        color: "#555",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {!showCapabilities && <div style={{ height: "0" }} />}

            {/* Description + Callout — below on mobile */}
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "15px",
                fontWeight: "400",
                lineHeight: "1.7",
                color: "#666",
                margin: "0 0 24px 0",
              }}
            >
              {active.description}
            </p>

            <div
              style={{
                borderLeft: `3px solid ${colors.accent}`,
                paddingLeft: "20px",
              }}
            >
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  fontStyle: "italic",
                  color: colors.primary,
                  margin: 0,
                  lineHeight: "1.6",
                }}
              >
                {active.accent}
              </p>
            </div>
          </>
        ) : (
          /* Desktop: side-by-side layout */
          <div
            style={{
              display: "flex",
              gap: "60px",
              alignItems: "flex-start",
            }}
          >
            {/* Left column — pill + headline + description + callout */}
            <div style={{ flex: "1 1 55%" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  border: `1px solid ${colors.line}`,
                  borderRadius: "50px",
                  padding: "8px 20px",
                  marginBottom: "32px",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: colors.accent,
                  }}
                />
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: colors.primary,
                  }}
                >
                  OUR MISSION
                </span>
              </div>

              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "17px",
                  fontWeight: "400",
                  lineHeight: "1.6",
                  color: "#555",
                  margin: "0 0 20px 0",
                  maxWidth: "500px",
                }}
              >
                To deliver the intelligence, resources, and strategies that{" "}
                <span style={{ fontWeight: "600", color: colors.primary }}>bridge the gap</span> between opportunity and
                outcome.
              </p>

              <h2
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "42px",
                  fontWeight: "300",
                  lineHeight: "1.15",
                  color: colors.primary,
                  margin: "0 0 24px 0",
                  letterSpacing: "-0.5px",
                  maxWidth: "500px",
                }}
              >
                A <span style={{ fontWeight: "700" }}>tool</span>, a <span style={{ fontWeight: "700" }}>resource</span>
                , and a <span style={{ fontWeight: "700", color: colors.accent }}>solution</span>
              </h2>

              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "1.7",
                  color: "#666",
                  margin: "0 0 32px 0",
                }}
              >
                {active.description}
              </p>

              <div
                style={{
                  borderLeft: `3px solid ${colors.accent}`,
                  paddingLeft: "20px",
                }}
              >
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                    fontStyle: "italic",
                    color: colors.primary,
                    margin: 0,
                  }}
                >
                  {active.accent}
                </p>
              </div>
            </div>

            {/* Right column — tab bar + capabilities card */}
            <div
              style={{
                flex: "0 0 auto",
                width: "420px",
                position: "sticky",
                top: "40px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "4px",
                  marginBottom: "16px",
                  background: colors.white,
                  borderRadius: "14px",
                  padding: "4px",
                  border: `1px solid ${colors.line}`,
                  width: "100%",
                }}
              >
                {tabs.map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    style={{
                      flex: 1,
                      padding: "12px 0",
                      borderRadius: "10px",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "15px",
                      fontWeight: i === activeTab ? "700" : "500",
                      backgroundColor: i === activeTab ? colors.primary : "transparent",
                      color: i === activeTab ? colors.white : "#666",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div
                style={{
                  background: colors.white,
                  borderRadius: "20px",
                  padding: "36px",
                  border: `1px solid ${colors.line}`,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                  minHeight: "340px",
                }}
              >
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: colors.accentText,
                    marginBottom: "24px",
                  }}
                >
                  CAPABILITIES
                </div>

                {active.items.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "12px 0",
                      borderBottom: i < active.items.length - 1 ? `1px solid ${colors.line}` : "none",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: colors.accent,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: "400",
                        lineHeight: "1.4",
                        color: "#555",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 4: Three Gaps, One Mission — 12 Sectors
// ============================================================================
function ThreeGapsSection({ isMobile }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeCard, setActiveCard] = useState(0);
  const scrollRef = useRef(null);

  const filters = ["All", "Intelligence", "Resource", "Execution"];

  const sectors = [
    // ── INTELLIGENCE (12) ──────────────────────────────────────────
    {
      sector: "Agriculture",
      gap: "Intelligence",
      primary: true,
      stat: "$1.9B",
      statLabel: "lost annually to post-harvest waste",
      insight:
        "5.6 million smallholder farmers. 30–50% crop loss rates — not because solutions don't exist, but because the intelligence connecting farmers to markets, storage, and buyers doesn't reach them.",
      bridge: "Sector-by-sector data that turns invisible losses into investable opportunities",
    },
    {
      sector: "Health Systems",
      gap: "Intelligence",
      primary: true,
      stat: "7,653",
      statLabel: "preventable deaths annually from WASH",
      insight:
        "1 doctor per 6,355 citizens. 65% of health spending is out-of-pocket. The data to target interventions — where clinics fail, which supply chains break — exists but isn't reaching decision-makers.",
      bridge: "Root cause diagnostics that direct capital to where health outcomes actually improve",
    },
    {
      sector: "Education & Skills",
      gap: "Intelligence",
      primary: true,
      stat: "53%",
      statLabel: "youth unemployment or underemployment",
      insight:
        "Ghana produces graduates, but not the skills employers need. TVET enrollment sits below 5%. The gap between curriculum and market demand is widening — and no one is mapping it systematically.",
      bridge: "Workforce intelligence matching training investment to actual employer demand",
    },
    {
      sector: "Manufacturing",
      gap: "Intelligence",
      primary: true,
      stat: "$2.4B",
      statLabel: "annual processed food imports alone",
      insight:
        "Ghana imports what it could manufacture — from tomato paste to pharmaceuticals. The market intelligence to identify viable import substitution sits scattered across ministries and reports.",
      bridge: "Competitive mapping that identifies which manufacturing gaps are commercially viable",
    },
    {
      sector: "Financial Inclusion",
      gap: "Intelligence",
      stat: "32%",
      statLabel: "financially literate despite 97% access",
      insight:
        "74 million mobile money accounts but only 32% financial literacy. Products exist — understanding doesn't. Without intelligence on what users actually need, inclusion remains a statistic, not a reality.",
      bridge: "User behavior analytics that inform product design for real financial needs",
    },
    {
      sector: "Technology & Innovation",
      gap: "Intelligence",
      stat: "<1%",
      statLabel: "of funding reaching women founders",
      insight:
        "Ghana's startup ecosystem ranks 3rd in West Africa, but investment patterns are blind to entire demographics. Deal flow intelligence doesn't reach beyond the Accra-Kumasi corridor.",
      bridge: "Ecosystem mapping that surfaces overlooked founders, sectors, and geographies",
    },
    {
      sector: "Energy & Renewables",
      gap: "Intelligence",
      stat: "15%",
      statLabel: "4G utilization despite 60%+ coverage",
      insight:
        "Energy data is fragmented across utilities, regulators, and ministries. Outage patterns, demand forecasts, and off-grid potential aren't integrated — making investment decisions guesswork.",
      bridge: "Integrated energy intelligence that matches supply gaps to deployment-ready solutions",
    },
    {
      sector: "Infrastructure",
      gap: "Intelligence",
      stat: "40%",
      statLabel: "of urban water supply lost to leakage",
      insight:
        "Infrastructure failures are well-documented but poorly diagnosed. Which interventions yield the highest impact per cedi spent? The prioritization data doesn't exist in usable form.",
      bridge: "Impact scoring that ranks infrastructure investments by actual community outcomes",
    },
    {
      sector: "Housing & Real Estate",
      gap: "Intelligence",
      stat: "1.8M",
      statLabel: "unit housing deficit",
      insight:
        "Everyone cites the deficit — but where are the viable sites, what do buyers actually afford, and which developers can deliver? Market intelligence barely exists below the luxury tier.",
      bridge: "Demand mapping that connects housing development to real affordability data",
    },
    {
      sector: "Tourism & Hospitality",
      gap: "Intelligence",
      stat: "40%",
      statLabel: "of tourism revenue leaks abroad",
      insight:
        "Ghana tracks arrivals but not spending patterns, visitor friction points, or domestic capacity gaps. Without granular tourism intelligence, revenue capture stays low.",
      bridge: "Visitor journey analytics that identify where Ghanaian businesses can capture more value",
    },
    {
      sector: "Transportation & Logistics",
      gap: "Intelligence",
      stat: "30-40%",
      statLabel: "of produce value lost in transit",
      insight:
        "Route data, cold chain gaps, and intermodal bottlenecks exist in silos. No integrated view of where logistics failures cost the most — or where fixes would yield the highest returns.",
      bridge: "Supply chain intelligence that pinpoints the costliest logistics gaps per corridor",
    },
    {
      sector: "Sports & Creative",
      gap: "Intelligence",
      stat: "60%",
      statLabel: "YoY growth in Afrobeats streaming",
      insight:
        "Cultural output is surging — but revenue data, IP ownership patterns, and export market intelligence don't exist. Creators can't negotiate what they can't measure.",
      bridge: "Creative economy analytics that quantify what Ghana's cultural output is actually worth",
    },

    // ── RESOURCE (12) ──────────────────────────────────────────────
    {
      sector: "Financial Inclusion",
      gap: "Resource",
      primary: true,
      stat: "$2.2B",
      statLabel: "annual MSME financing gap",
      insight:
        "$192B flows through mobile money. $11.5B arrives in diaspora remittances. Yet 90% goes to consumption — because the pathways from capital to productive investment barely exist.",
      bridge: "Connecting capital to the enterprises that need it, through the channels that work",
    },
    {
      sector: "Energy & Renewables",
      gap: "Resource",
      primary: true,
      stat: "$2B+",
      statLabel: "annual cost of power disruptions",
      insight:
        "Ghana has 6x the solar irradiance of Germany but a fraction of its solar capacity. Off-grid solutions exist globally — the gap is connecting them to local financing and distribution.",
      bridge: "Blended finance structures that make renewable energy bankable at scale",
    },
    {
      sector: "Housing & Real Estate",
      gap: "Resource",
      primary: true,
      stat: "50%+",
      statLabel: "of diaspora housing projects stalled",
      insight:
        "40% of diaspora remittances target real estate — but half of housing projects stall. Capital exists, demand exists. What's missing is the structured development pipeline connecting the two.",
      bridge: "Investment vehicles that channel diaspora capital into completed, quality housing",
    },
    {
      sector: "Tourism & Hospitality",
      gap: "Resource",
      primary: true,
      stat: "$4.8B",
      statLabel: "tourism revenue, growing fast",
      insight:
        "Year of Return generated $1.9B. Black Star Experience targets $5B by 2027. But Ghana-owned hospitality infrastructure can't capture the demand — foreign chains take the margin.",
      bridge: "Partnership frameworks that keep tourism revenue in Ghanaian hands",
    },
    {
      sector: "Agriculture",
      gap: "Resource",
      stat: "<2%",
      statLabel: "of cropland irrigated",
      insight:
        "13.6 million hectares of agricultural land, but financing for irrigation, cold storage, and processing reaches almost none of it. Farmer cooperatives exist — capital pathways to them don't.",
      bridge: "Aggregated financing models that channel investment to farmer cooperatives at scale",
    },
    {
      sector: "Health Systems",
      gap: "Resource",
      stat: "~1%",
      statLabel: "insurance penetration of GDP",
      insight:
        "9 million Ghanaians have microinsurance, but the health financing ecosystem is thin. DFIs, diaspora health funds, and government budgets operate in parallel — never in concert.",
      bridge: "Blended health financing that coordinates public, private, and diaspora capital",
    },
    {
      sector: "Education & Skills",
      gap: "Resource",
      stat: "<5%",
      statLabel: "TVET enrollment rate",
      insight:
        "Technical training exists but is chronically underfunded. Industry partnerships are ad hoc. The diaspora expertise that could transform vocational education has no structured channel in.",
      bridge: "Diaspora mentorship and industry funding networks connected to TVET institutions",
    },
    {
      sector: "Technology & Innovation",
      gap: "Resource",
      stat: "$68M",
      statLabel: "2024 startup funding, up from $27M",
      insight:
        "Funding is growing but concentrated in fintech and Accra. Agtech, healthtech, and regional startups can't access capital. Angel networks and venture debt remain embryonic.",
      bridge: "Deal flow pipelines that connect diverse startups to matched capital sources",
    },
    {
      sector: "Manufacturing",
      gap: "Resource",
      stat: ">27%",
      statLabel: "commercial lending rate",
      insight:
        "Manufacturers can't finance equipment at 27%+ interest. Development finance exists but disbursement is slow and bureaucratic. Import substitution needs patient capital that the market doesn't provide.",
      bridge: "Structured finance vehicles that make manufacturing investment viable at scale",
    },
    {
      sector: "Infrastructure",
      gap: "Resource",
      stat: "144",
      statLabel: "rural banks serving underbanked areas",
      insight:
        "Infrastructure projects need multi-source funding — government, DFIs, commercial, diaspora. Each source has different terms, timelines, and requirements. No one is blending them.",
      bridge: "PPP structuring that weaves multiple capital sources into bankable infrastructure deals",
    },
    {
      sector: "Transportation & Logistics",
      gap: "Resource",
      stat: "80%+",
      statLabel: "of freight moves by road",
      insight:
        "Rail and inland waterway potential is massive but unfunded. Road transport dominates because it's the only option with available financing — not because it's the best option.",
      bridge: "Multimodal transport financing that unlocks rail and waterway investment",
    },
    {
      sector: "Sports & Creative",
      gap: "Resource",
      stat: "$5B",
      statLabel: "Black Star Experience target by 2027",
      insight:
        "Government earmarked GHS 20M seed capital and a 20% film tax rebate — but the creative sector needs matching private investment, studio infrastructure funding, and export financing.",
      bridge: "Creative industry investment vehicles that pair public incentives with private capital",
    },

    // ── EXECUTION (12) ─────────────────────────────────────────────
    {
      sector: "Technology & Innovation",
      gap: "Execution",
      primary: true,
      stat: "38M",
      statLabel: "mobile connections, near-zero Series A",
      insight:
        "100+ tech hubs. 69.9% internet penetration. Ranked 3rd in West Africa — but virtually no in-country Series A funding, and less than 1% of capital reaching women founders.",
      bridge: "From ecosystem potential to funded, scaling ventures",
    },
    {
      sector: "Infrastructure",
      gap: "Execution",
      primary: true,
      stat: "10,000+",
      statLabel: "traders in Kejetia without digital tools",
      insight:
        "West Africa's largest market operates without digital payments, inventory systems, or credit infrastructure. The policy exists. The technology exists. The execution bridge doesn't.",
      bridge: "End-to-end project delivery from policy alignment to market-level implementation",
    },
    {
      sector: "Transportation & Logistics",
      gap: "Execution",
      primary: true,
      stat: "30-40%",
      statLabel: "of produce value lost in transit",
      insight:
        "Ghana's road network reaches most districts — but cold chain, last-mile logistics, and intermodal coordination remain fragmented. Multiple ministries, no single executor connecting the pieces.",
      bridge: "Multi-stakeholder coordination that turns transport plans into functioning supply chains",
    },
    {
      sector: "Sports & Creative",
      gap: "Execution",
      primary: true,
      stat: "$4.8B",
      statLabel: "creative economy contribution",
      insight:
        "Afrobeats streams grew 60% YoY. Fashion contributes $2.4B. But no professional film studios, fragmented IP protections, and zero structured export pipelines.",
      bridge: "Industry infrastructure that converts cultural momentum into sustainable revenue",
    },
    {
      sector: "Agriculture",
      gap: "Execution",
      stat: "20-40%",
      statLabel: "farmer value capture of final price",
      insight:
        "Aggregation models, cooperative structures, and market linkages have been designed many times. Execution stalls at coordination — between farmers, buyers, transporters, and financiers.",
      bridge: "Value chain coordination that connects every link from farm gate to final buyer",
    },
    {
      sector: "Financial Inclusion",
      gap: "Execution",
      stat: "850+",
      statLabel: "susu collectors, mostly undigitized",
      insight:
        "Susu is Ghana's most trusted savings system — 70-90% women users. Digitization pilots exist. But scaling from pilot to national platform requires execution capacity no single fintech has.",
      bridge: "Platform deployment that bridges informal finance to formal digital infrastructure",
    },
    {
      sector: "Health Systems",
      gap: "Execution",
      stat: "65%",
      statLabel: "of health spending is out-of-pocket",
      insight:
        "Community health insurance frameworks are designed. Telemedicine platforms are built. But deploying them to the communities that need them most requires ground-level coordination at scale.",
      bridge: "Health service delivery that reaches the last mile, not just the policy document",
    },
    {
      sector: "Education & Skills",
      gap: "Execution",
      stat: "800K+",
      statLabel: "annual BECE candidates, limited pathways",
      insight:
        "Curriculum reform is perpetually planned. Industry partnerships are announced. But connecting reformed programs to functioning classrooms to actual employer pipelines takes operational execution.",
      bridge: "End-to-end skills pipeline from redesigned curriculum to employer placement",
    },
    {
      sector: "Energy & Renewables",
      gap: "Execution",
      stat: "6x",
      statLabel: "solar irradiance vs. Germany, fraction of capacity",
      insight:
        "Renewable energy targets are set. Tender frameworks exist. But projects stall between approval and construction — permitting, land, grid connection, and community engagement all need orchestration.",
      bridge: "Project execution that moves renewable installations from tender to generation",
    },
    {
      sector: "Housing & Real Estate",
      gap: "Execution",
      stat: "12",
      statLabel: "banks offering mortgages out of 23",
      insight:
        "Affordable housing designs exist. Land is available. But the execution chain — from developer financing to construction oversight to buyer mortgage access — breaks at every handoff.",
      bridge: "Development pipeline management from groundbreaking to keys in hand",
    },
    {
      sector: "Manufacturing",
      gap: "Execution",
      stat: "20-30%",
      statLabel: "domestic cocoa processing rate",
      insight:
        "Ghana targets 50% cocoa processing by 2030 but sits at 20-30%. Factories are planned, incentives are offered, but execution — from procurement to quality control to export logistics — falters.",
      bridge: "Operational execution that turns processing policy into functioning factory output",
    },
    {
      sector: "Tourism & Hospitality",
      gap: "Execution",
      stat: "871K",
      statLabel: "hectares hit by 2024 drought",
      insight:
        "Destination development plans exist for Cape Coast, Volta Region, and Ashanti heritage sites. But tourism infrastructure — from training staff to coordinating transport to maintaining standards — needs a delivery partner.",
      bridge: "Destination execution that builds tourism capacity from plan to guest experience",
    },
  ];

  const filtered =
    activeFilter === "All" ? sectors.filter((s) => s.primary) : sectors.filter((s) => s.gap === activeFilter);

  // Reset scroll position when filter changes
  const handleFilterChange = (f) => {
    setActiveFilter(f);
    setActiveCard(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  return (
    <section
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "60px 0" : "100px 0",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto", padding: isMobile ? "0 20px" : "0 80px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? "24px" : "32px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              border: `1px solid ${colors.line}`,
              borderRadius: "50px",
              padding: "8px 20px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: colors.accent,
              }}
            />
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: colors.primary,
              }}
            >
              THE OPPORTUNITY
            </span>
          </div>
        </div>

        <h2
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: isMobile ? "30px" : "48px",
            fontWeight: "300",
            lineHeight: "1.15",
            color: colors.primary,
            margin: "0 0 20px 0",
            letterSpacing: "-0.5px",
            textAlign: "center",
          }}
        >
          <span style={{ fontWeight: "700" }}>Intelligence</span> / <span style={{ fontWeight: "700" }}>Resources</span>{" "}
          / <span style={{ fontWeight: "700", color: colors.accent }}>Execution</span>
        </h2>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "14px" : "16px",
            fontWeight: "400",
            lineHeight: "1.7",
            color: "#666",
            textAlign: "center",
            maxWidth: "600px",
            margin: isMobile ? "0 auto 32px" : "0 auto 48px",
          }}
        >
          The intelligence to see the opportunity. The resources to fund it. The execution to deliver it. Sector by
          sector.
        </p>

        {/* Filter bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: isMobile ? "28px" : "40px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              gap: "4px",
              background: colors.background,
              borderRadius: "50px",
              padding: "4px",
              border: `1px solid ${colors.line}`,
            }}
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                style={{
                  padding: isMobile ? "8px 16px" : "10px 24px",
                  borderRadius: "50px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  fontSize: isMobile ? "12px" : "13px",
                  fontWeight: f === activeFilter ? "700" : "500",
                  backgroundColor: f === activeFilter ? colors.primary : "transparent",
                  color: f === activeFilter ? colors.white : "#666",
                  transition: "all 0.3s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {f}
                {f !== "All" ? ` (${sectors.filter((s) => s.gap === f).length})` : ""}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal scroll — full width, no padding clipping */}
      <div
        ref={scrollRef}
        className="hide-scrollbar"
        onScroll={() => {
          if (scrollRef.current) {
            const cardWidth = isMobile ? scrollRef.current.offsetWidth * 0.82 + 12 : 380 + 20;
            const idx = Math.round(scrollRef.current.scrollLeft / cardWidth);
            setActiveCard(idx);
          }
        }}
        style={{
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          gap: isMobile ? "12px" : "20px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingLeft: isMobile ? "20px" : "80px",
          paddingRight: isMobile ? "20px" : "80px",
        }}
      >
        {filtered.map((s, i) => {
          const isDark = i === 0 && activeFilter !== "All";
          return (
            <div
              key={`${s.gap}-${s.sector}`}
              style={{
                flex: isMobile ? "0 0 82%" : "0 0 380px",
                scrollSnapAlign: "start",
                backgroundColor: isDark ? colors.primary : colors.background,
                borderRadius: isMobile ? "16px" : "20px",
                padding: isMobile ? "24px 20px" : "36px 32px",
                border: isDark ? "none" : `1px solid ${colors.line}`,
                display: "flex",
                flexDirection: "column",
                minHeight: isMobile ? "380px" : "420px",
                boxSizing: "border-box",
              }}
            >
              {/* Top row: sector pill + gap tag */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: isMobile ? "20px" : "24px",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: isDark ? "rgba(255,255,255,0.1)" : colors.white,
                    borderRadius: "50px",
                    padding: "5px 12px",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: colors.accent,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      fontWeight: "700",
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: isDark ? "rgba(255,255,255,0.6)" : "#999",
                    }}
                  >
                    {s.sector}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "9px",
                    fontWeight: "700",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    color: isDark ? "rgba(255,255,255,0.35)" : "#ccc",
                  }}
                >
                  {s.gap}
                </span>
              </div>

              {/* Big stat */}
              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: isMobile ? "40px" : "44px",
                  fontWeight: "800",
                  color: isDark ? colors.accent : colors.primary,
                  lineHeight: "1",
                  marginBottom: "4px",
                  letterSpacing: "-1.5px",
                }}
              >
                {s.stat}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: isDark ? "rgba(255,255,255,0.5)" : "#999",
                  marginBottom: isMobile ? "16px" : "20px",
                  lineHeight: "1.4",
                }}
              >
                {s.statLabel}
              </div>

              {/* Insight */}
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  fontWeight: "400",
                  lineHeight: "1.65",
                  color: isDark ? "rgba(255,255,255,0.65)" : "#555",
                  margin: "0 0 auto 0",
                  paddingBottom: isMobile ? "16px" : "20px",
                }}
              >
                {s.insight}
              </p>

              {/* BRIDGE line — contained inner box */}
              <div
                style={{
                  backgroundColor: isDark ? colors.white : colors.primary,
                  borderRadius: "10px",
                  padding: "10px 12px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: isDark ? colors.primary : colors.white,
                    lineHeight: "1.5",
                  }}
                >
                  {s.bridge}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scroll indicators */}
      {isMobile && (
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "20px", padding: "0 20px" }}>
          {filtered.map((_, i) => (
            <div
              key={i}
              onClick={() => {
                if (scrollRef.current) {
                  const cardWidth = scrollRef.current.offsetWidth * 0.82 + 12;
                  scrollRef.current.scrollTo({ left: i * cardWidth, behavior: "smooth" });
                }
              }}
              style={{
                width: i === activeCard ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor: i === activeCard ? colors.accent : colors.line,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// ============================================================================
// SECTION 5: Your Bridge to Impact — NEW (Stakeholder journeys)
// ============================================================================
function BridgeToImpactSection({ isMobile }) {
  const [activeJourney, setActiveJourney] = useState(0);
  const [activePhase, setActivePhase] = useState(0);

  const journeys = [
    {
      stakeholder: "Entrepreneur",
      context: "A venture idea in agriculture, fintech, energy — any sector. Where does it go from here?",
      friction:
        "Market intelligence is scarce, fragmented, and rarely sector-specific. Competitive positioning relies on instinct rather than data. Investment readiness remains undefined — and funders move on.",
      bridge:
        "Scored sector intelligence and competitive mapping built from hundreds of data points. Venture-readiness frameworks calibrated to what serious investors evaluate. A structured pathway from concept to capital.",
      outcome:
        "Ventures enter the market informed, differentiated, and investment-ready. Evidence replaces guesswork. The conversation with capital starts on stronger terms.",
      bar: "From idea to investable opportunity — backed by evidence, and industry intelligence.",
    },
    {
      stakeholder: "Business / SME",
      context: "Operating — maybe profitably — but the ceiling is real. What breaks through it?",
      friction:
        "Interest rates exceed 27%, locking out growth capital. Supply chains are brittle and under-diversified. The mid-market gap persists — too established for microfinance, too small for institutional attention.",
      bridge:
        "Blended finance vehicles structured for the mid-market. Cross-sector partnerships that diversify supply chain risk. Value chain strategies designed for the actual operating environment.",
      outcome:
        "Local operators become regional competitors. Capital, partnerships, and strategy align around a real growth plan — not a pitch deck aspiration.",
      bar: "Structured capital, diversified partnerships, and strategy matched to the operating reality.",
    },
    {
      stakeholder: "Investor",
      context: "Capital ready for Ghana — commercial returns and real impact. Where does it land?",
      friction:
        "Deal flow lacks transparency and independent verification. Due diligence costs are disproportionate to ticket size. Distinguishing credible opportunity from well-packaged ambition requires local depth.",
      bridge:
        "Rigorous sector analysis paired with pre-scored venture pipelines. Blended finance structures aligning risk appetite with opportunity profile. Ground-level intelligence that institutional investors rarely access.",
      outcome:
        "Capital deploys into stress-tested opportunities with measurable impact frameworks. Every allocation backed by sector-level evidence and local market validation.",
      bar: "Pre-scored pipelines, blended structures, and ground-level intelligence — institutional-grade conviction.",
    },
    {
      stakeholder: "Government",
      context: "Ambitious national targets set — 24-Hour Economy, Sankofa Initiative, Connect24. What delivers them?",
      friction:
        "Implementation capacity lags behind policy ambition. Private sector coordination lacks structure. The evidence base for course correction is thin and often retroactive.",
      bridge:
        "Evidence-based policy alignment with vetted private sector execution partners. Implementation capacity bridging gazette to ground. Outcome measurement frameworks validating progress in real time.",
      outcome:
        "Policy translates into measurable community-level outcomes. Programs demonstrate results, not activity. National priorities become local realities citizens experience directly.",
      bar: "Policy-to-practice alignment, vetted execution partners, and real-time outcome validation.",
    },
  ];

  const active = journeys[activeJourney];

  const phases = [
    {
      label: "THE OPPORTUNITY",
      text: active.friction,
      bg: colors.white,
      border: colors.primary,
      labelColor: "#C44536",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C44536"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      ),
    },
    {
      label: "THE BRIDGE",
      text: active.bridge,
      bg: colors.white,
      border: colors.primary,
      labelColor: colors.accentText,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.accentText}
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      ),
    },
    {
      label: "THE OUTCOME",
      text: active.outcome,
      bg: colors.white,
      border: colors.primary,
      labelColor: colors.primary,
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={colors.primary}
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      ),
    },
  ];

  return (
    <section
      style={{
        backgroundColor: colors.background,
        padding: isMobile ? "60px 20px 40px" : "100px 80px 50px",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ maxWidth: "600px", marginBottom: isMobile ? "32px" : "48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              border: `1px solid ${colors.line}`,
              borderRadius: "50px",
              padding: "8px 20px",
              marginBottom: isMobile ? "24px" : "32px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: colors.accent,
              }}
            />
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: colors.primary,
              }}
            >
              YOUR BRIDGE TO IMPACT
            </span>
          </div>

          <h2
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: isMobile ? "30px" : "42px",
              fontWeight: "300",
              lineHeight: "1.15",
              color: colors.primary,
              margin: "0 0 16px 0",
              letterSpacing: "-0.5px",
            }}
          >
            <span style={{ fontWeight: "700" }}>Impact</span> — defined on{" "}
            <span style={{ fontWeight: "700", color: colors.accent }}>your</span> terms
          </h2>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "14px" : "16px",
              fontWeight: "400",
              lineHeight: "1.7",
              color: "#666",
              margin: 0,
            }}
          >
            A market trader measures impact as reliable income. An investor measures it as returns and reach. A ministry
            measures it as outcomes delivered.
          </p>
        </div>

        {/* Stakeholder tabs — 2x2 grid on mobile, inline on desktop */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : `repeat(${journeys.length}, auto)`,
            gap: "4px",
            marginBottom: isMobile ? "20px" : "32px",
            background: colors.white,
            borderRadius: "14px",
            padding: "4px",
            border: `1px solid ${colors.line}`,
            width: isMobile ? "100%" : "fit-content",
          }}
        >
          {journeys.map((j, i) => (
            <button
              key={i}
              onClick={() => {
                setActiveJourney(i);
                setActivePhase(0);
              }}
              style={{
                padding: isMobile ? "10px 12px" : "12px 28px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? "12px" : "13px",
                fontWeight: i === activeJourney ? "700" : "500",
                backgroundColor: i === activeJourney ? colors.primary : "transparent",
                color: i === activeJourney ? colors.white : "#666",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
              }}
            >
              {j.stakeholder}
            </button>
          ))}
        </div>

        {/* Context line */}
        <div
          style={{
            background: colors.white,
            borderRadius: "14px",
            padding: isMobile ? "14px 16px" : "16px 24px",
            border: `1px solid ${colors.line}`,
            marginBottom: isMobile ? "12px" : "16px",
            display: "flex",
            alignItems: isMobile ? "flex-start" : "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              backgroundColor: colors.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              marginTop: isMobile ? "2px" : "0",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={colors.primary}>
              <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
            </svg>
          </div>
          {!isMobile && <div style={{ width: "1px", height: "16px", backgroundColor: colors.line }} />}
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "13px" : "14px",
              fontWeight: "400",
              color: "#555",
              lineHeight: "1.5",
            }}
          >
            {active.context}
          </span>
        </div>

        {/* Three-phase progression */}
        {isMobile ? (
          <>
            {/* Cards cascade — reveal one at a time, all stay visible */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {phases.map((phase, i) => {
                if (i > activePhase) return null;
                return (
                  <React.Fragment key={i}>
                    <div
                      style={{
                        background: phase.bg,
                        borderRadius: "16px",
                        padding: "24px 20px",
                        border: `2px solid ${phase.border}`,
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "12px",
                        }}
                      >
                        {phase.icon}
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "10px",
                            fontWeight: "700",
                            letterSpacing: "2px",
                            color: phase.labelColor,
                          }}
                        >
                          {phase.label}
                        </span>
                      </div>
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          fontWeight: "400",
                          lineHeight: "1.65",
                          color: "#555",
                          margin: 0,
                        }}
                      >
                        {phase.text}
                      </p>
                    </div>

                    {/* Down arrow connector — after this card if it's the last revealed and more remain */}
                    {i === activePhase && i < phases.length - 1 && (
                      <div
                        onClick={() => setActivePhase(activePhase + 1)}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          padding: "8px 0",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            backgroundColor: colors.white,
                            border: `1px solid ${colors.line}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path
                              d="M2 4l4 4 4-4"
                              stroke={colors.accent}
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Connector arrow between already-revealed cards — click to collapse below */}
                    {i < activePhase && i < phases.length - 1 && (
                      <div
                        onClick={() => setActivePhase(i)}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          padding: "8px 0",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            backgroundColor: colors.white,
                            border: `1px solid ${colors.line}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s ease",
                          }}
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            style={{
                              transform: "rotate(180deg)",
                              transition: "transform 0.2s ease",
                            }}
                          >
                            <path
                              d="M2 4l4 4 4-4"
                              stroke={colors.accent}
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Summary bar — only after all 3 revealed */}
            {activePhase === phases.length - 1 && (
              <div
                style={{
                  background: colors.white,
                  borderRadius: "14px",
                  padding: "14px 16px",
                  marginTop: "12px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  border: `1px solid ${colors.line}`,
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: colors.accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={colors.primary}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    fontWeight: "400",
                    color: "#555",
                    lineHeight: "1.5",
                  }}
                >
                  {active.bar}
                </span>
              </div>
            )}
          </>
        ) : (
          /* Desktop: 3-column grid */
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "16px",
              }}
            >
              {phases.map((phase, i) => (
                <div
                  key={i}
                  style={{
                    background: phase.bg,
                    borderRadius: "20px",
                    padding: "32px 28px",
                    border: `2px solid ${phase.border}`,
                    position: "relative",
                    minHeight: "200px",
                  }}
                >
                  {i < 2 && (
                    <div
                      style={{
                        position: "absolute",
                        right: "-20px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        zIndex: 2,
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        backgroundColor: colors.white,
                        border: `1px solid ${colors.line}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M4 2l4 4-4 4"
                          stroke={colors.accent}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "12px",
                    }}
                  >
                    {phase.icon}
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "10px",
                        fontWeight: "700",
                        letterSpacing: "2px",
                        color: phase.labelColor,
                      }}
                    >
                      {phase.label}
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "400",
                      lineHeight: "1.65",
                      color: "#555",
                      margin: 0,
                    }}
                  >
                    {phase.text}
                  </p>
                </div>
              ))}
            </div>

            {/* BRIDGE summary bar — desktop only here */}
            <div
              style={{
                background: colors.white,
                borderRadius: "14px",
                padding: "16px 24px",
                marginTop: "16px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                border: `1px solid ${colors.line}`,
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: colors.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill={colors.primary}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" />
                </svg>
              </div>
              <div style={{ width: "1px", height: "16px", backgroundColor: colors.line }} />
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "400",
                  color: "#555",
                }}
              >
                {active.bar}
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

// ============================================================================
// SECTION 7: CTA — REBUILT
// ============================================================================
function CTASection({ isMobile }) {
  const [hoveredBtn, setHoveredBtn] = useState(null);

  return (
    <section
      style={{
        backgroundColor: colors.background,
        padding: isMobile ? "20px 20px 40px" : "30px 80px 60px",
      }}
    >
      <div
        style={{
          maxWidth: CONTENT_MAX_WIDTH,
          margin: "0 auto",
          backgroundColor: colors.primary,
          borderRadius: "24px",
          padding: isMobile ? "60px 24px" : "80px 60px",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        {/* Decorative shapes */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            left: "-40px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            right: "-60px",
            width: "280px",
            height: "280px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "8%",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.02)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50px",
              padding: "8px 20px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: colors.accent,
              }}
            />
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: "700",
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              GET INVOLVED
            </span>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "700",
              lineHeight: "1.15",
              color: colors.white,
              margin: "0 0 20px 0",
              letterSpacing: "-0.5px",
            }}
          >
            Join the problem-solving ecosystem
          </h2>

          {/* Description */}
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "14px" : "16px",
              fontWeight: "400",
              lineHeight: "1.7",
              color: "rgba(255,255,255,0.55)",
              maxWidth: "520px",
              margin: isMobile ? "0 auto 32px auto" : "0 auto 40px auto",
            }}
          >
            Ghana's challenges are solvable. The resources exist. What's needed is coordination, commitment, and action.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "12px" : "16px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              onMouseEnter={() => setHoveredBtn("partner")}
              onMouseLeave={() => setHoveredBtn(null)}
              style={{
                padding: "16px 36px",
                borderRadius: "14px",
                border: "none",
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "15px",
                fontWeight: "700",
                backgroundColor: hoveredBtn === "partner" ? "#c8e040" : colors.accent,
                color: colors.primary,
                transition: "all 0.3s ease",
                width: isMobile ? "100%" : "auto",
              }}
            >
              Partner With Us →
            </button>
            <button
              onMouseEnter={() => setHoveredBtn("materials")}
              onMouseLeave={() => setHoveredBtn(null)}
              style={{
                padding: "16px 36px",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.2)",
                cursor: "pointer",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "15px",
                fontWeight: "700",
                backgroundColor: hoveredBtn === "materials" ? "rgba(255,255,255,0.08)" : "transparent",
                color: colors.white,
                transition: "all 0.3s ease",
                width: isMobile ? "100%" : "auto",
              }}
            >
              Request Materials
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// FOOTER SUB-COMPONENTS
// ============================================================================
const socialIcons = [
  <svg key="li" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>,
  <svg key="tw" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>,
  <svg key="fb" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>,
];

const footerSectorIcons = [
  {
    key: "infra",
    label: "Infrastructure & Basic Services",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
      </svg>
    ),
  },
  {
    key: "fin",
    label: "Financial Inclusion",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
      </svg>
    ),
  },
  {
    key: "health",
    label: "Health Systems",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h5v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
      </svg>
    ),
  },
  {
    key: "tech",
    label: "Technology & Innovation",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" />
      </svg>
    ),
  },
  {
    key: "edu",
    label: "Education & Skills",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M22 10v6" />
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
      </svg>
    ),
  },
  {
    key: "agri",
    label: "Agriculture & Value Chains",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 20h10" />
        <path d="M10 20c5.5-2.5.8-6.4 3-10" />
        <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
        <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
      </svg>
    ),
  },
  {
    key: "creative",
    label: "Sports & Creative",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
  },
  {
    key: "housing",
    label: "Housing & Real Estate",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    key: "tourism",
    label: "Tourism & Hospitality",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" />
        <path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" />
        <path d="M10 20h4" />
        <circle cx="16" cy="20" r="2" />
        <circle cx="8" cy="20" r="2" />
      </svg>
    ),
  },
  {
    key: "energy",
    label: "Energy & Renewables",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
        <path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1" />
        <path d="m11 7-3 5h4l-3 5" />
        <line x1="22" x2="22" y1="11" y2="13" />
      </svg>
    ),
  },
  {
    key: "mfg",
    label: "Manufacturing",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        <path d="M17 18h1M12 18h1M7 18h1" />
      </svg>
    ),
  },
  {
    key: "transport",
    label: "Transportation",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
        <circle cx="17" cy="18" r="2" />
        <circle cx="7" cy="18" r="2" />
      </svg>
    ),
  },
];

const SectorGrid = () => {
  const [hovered, setHovered] = useState(null);
  return (
    <div>
      <div
        style={{
          fontSize: "12px",
          fontWeight: "600",
          color: hovered !== null ? colors.accent : "rgba(255,255,255,0.4)",
          fontFamily: "'DM Sans', sans-serif",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          marginBottom: "12px",
          transition: "color 0.25s ease",
          lineHeight: "1",
          minHeight: "12px",
        }}
      >
        {hovered !== null ? footerSectorIcons[hovered].label : "Explore 12 Sectors"}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {footerSectorIcons.map((sector, i) => {
          const isH = hovered === i;
          return (
            <a
              key={sector.key}
              href={sectorRoutes[sector.key] || "#"}
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
                {sector.icon(isH ? colors.accent : "rgba(255,255,255,0.85)")}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

const BridgeLogoWhite = () => (
  <div style={{ display: "flex", alignItems: "center", height: "40px" }}>
    <svg viewBox="0 0 4113.9 932.3" height="36" style={{ display: "block" }}>
      <path
        fill={colors.white}
        d="M3355.1,655.6h31.2v5.7h-31.2v-5.7ZM3355.1,667h31.2v11.1h-31.2v-11.1ZM3355.1,683.9h31.2v11.1h-31.2v-11.1ZM3355.1,700.8h31.2v11.1h-31.2v-11.1ZM3355.1,717.7h31.2v11.1h-31.2v-11.1ZM3355.1,734.5h31.2v11.1h-31.2v-11.1ZM3355.1,751.4h31.2v10.8h-31.2v-10.8ZM3355.1,767.9h31.2v11.1h-31.2v-11.1ZM3355.1,784.9h31.2v11.1h-31.2v-11.1ZM3355.1,801.8h31.2v11.1h-31.2v-11.1ZM3355.1,818.6h31.2v11.1h-31.2v-11.1ZM3355.1,835.5h31.2v11.1h-31.2v-11.1ZM3355.1,852.4h31.2v11.1h-31.2v-11.1ZM3355.1,869.2h31.2v11.1h-31.2v-11.1ZM3355.1,886.1h31.2v11.1h-31.2v-11.1ZM3355.1,903h31.2v5.7h-31.2v-5.7Z"
      />
      <path
        fill={colors.white}
        d="M3397.5,655.6h61.7c12.5,0,24.3,1.7,35.1,5.7h-96.8v-5.7h0ZM3397.5,667h109.7c5.9,3,11.4,6.7,16.7,11.1h-126.3v-11.1h-.1ZM3397.5,801.8h126.3c-5.2,4.4-10.8,8.1-16.7,11.1h-109.7v-11.1h.1ZM3397.5,818.6h96.8c-10.8,4-22.5,6.1-35.1,6.1h-30.5v84h-31.2v-90.2.1ZM3479.6,739.9c0-17.2-13.5-24.7-28.1-24.7h-23.6v49.3h23.6c14.5,0,28.1-7.5,28.1-24.7h0v.1ZM3485.6,683.9h44.4c3.4,3,6.6,6.7,9.3,11.1h-37.1c-4.9-4.4-10.8-8.4-16.7-11.1h.1ZM3502.2,784.9h37.1c-2.8,4-5.9,7.8-9.3,11.1h-44.4c5.9-2.7,11.8-6.7,16.7-11.1h-.1ZM3507.4,700.8h35.7c2.4,3.4,4.2,7.1,5.6,11.1h-33.6c-2.1-4-4.5-7.8-7.7-11.1ZM3515,767.9h33.6l-5.6,11.1h-35.7c3.1-3.4,5.6-7.1,7.7-11.1ZM3517.8,717.7h32.6c1.3,3.7,2.4,7.5,2.8,11.1h-32.3c-.7-3.7-1.8-7.5-3.1-11.1h0ZM3520.9,751.4h32.3c-.3,3.7-1.3,7.5-2.8,10.8h-32.6c1.3-3.4,2.4-7.1,3.1-10.8h0ZM3521.7,734.5h32.3c.3,3.7.3,7.5-.3,11.1h-32c.7-3.7.7-7.5,0-11.1h0ZM3397.5,689.2h61.7c28.4,0,51.7,23.3,51.7,50.9s-23.2,50.9-51.7,50.9h-61.7v-102h0v.2Z"
      />
      <path
        fill={colors.white}
        d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"
      />
      <path
        fill={colors.white}
        stroke={colors.white}
        strokeWidth="0.5"
        strokeMiterlimit="10"
        d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"
      />
      <path
        fill={colors.white}
        stroke={colors.white}
        strokeWidth="0.5"
        strokeMiterlimit="10"
        d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"
      />
      <rect fill={colors.accent} x="1427.4" y="17.4" width="205.2" height="145" />
      <rect fill={colors.white} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6" />
      <path
        fill={colors.white}
        d="M2757.4,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"
      />
      <rect fill={colors.white} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6" />
      <rect fill={colors.accent} x="3083.5" y="339.5" width="175.1" height="257.7" />
      <rect fill={colors.accent} x="3083.5" y="654.5" width="175.1" height="257.7" />
      <circle fill="none" stroke={colors.white} strokeWidth="5" strokeMiterlimit="10" cx="4078.6" cy="661.3" r="32.8" />
      <path
        fill={colors.white}
        d="M4092.2,677.1l-7.3-10.4c.2,0,.3,0,.4-.2,2-.9,3.6-2.1,4.6-3.8s1.6-3.6,1.6-6.1c0-3.6-1.2-6.3-3.6-8.4s-5.7-3-10-3h-13v31.8h5.9v-9.3h8.5l6.5,9.3h6.4v.1ZM4083.7,651.9c1.3,1.1,2,2.7,2,4.7s-.6,3.6-2,4.7-3.3,1.7-5.9,1.7h-6.9v-12.6h6.9c2.6,0,4.5.5,5.9,1.6h0v-.1Z"
      />
      <rect
        fill="none"
        stroke={colors.white}
        strokeWidth="80"
        strokeMiterlimit="10"
        x="40"
        y="40"
        width="843.9"
        height="852.3"
        rx="36.6"
        ry="36.6"
      />
      <polygon
        fill={colors.accent}
        stroke={colors.white}
        strokeMiterlimit="10"
        points="722.6 322.2 462.3 452.9 202 322.8 461.3 192.6 722.6 322.2"
      />
      <path
        fill="#74914a"
        d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1l.1-.1Z"
      />
      <path
        fill={colors.accent}
        d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"
      />
    </svg>
  </div>
);

// ============================================================================
// FOOTER
// ============================================================================
const Footer = () => {
  const isMobile = useIsMobile();

  return (
    <footer style={{ backgroundColor: colors.primary, padding: "0" }}>
      <div style={{ padding: isMobile ? "0 20px" : "0 80px" }}>
        <div style={{ height: "0.5px", backgroundColor: "rgba(255,255,255,0.08)" }} />
      </div>

      {isMobile ? (
        <div style={{ padding: "32px 20px 16px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div style={{ flexShrink: 0 }}>
              <BridgeLogoWhite />
            </div>
            <div
              style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginLeft: "auto", justifyContent: "flex-end" }}
            >
              {["Company", "Services", "Resources", "Insights"].map((label) => (
                <a
                  key={label}
                  href="#"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.5px",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              placeholder="Subscribe to insights"
              style={{
                flex: 1,
                padding: "11px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.12)",
                backgroundColor: "rgba(255,255,255,0.05)",
                color: colors.white,
                fontSize: "12px",
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
              }}
            />
            <button
              style={{
                backgroundColor: colors.accent,
                color: colors.primary,
                border: "none",
                padding: "11px 18px",
                fontSize: "12px",
                fontWeight: "700",
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                borderRadius: "8px",
              }}
            >
              {"\u2192"}
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>
                Accra, Ghana
              </span>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.15)" }}>{"\u00B7"}</span>
              <span
                style={{
                  fontSize: "12px",
                  color: colors.accent,
                  fontWeight: "600",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                info@bridgepbc.com
              </span>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              {socialIcons.map((icon, i) => (
                <a
                  key={i}
                  href="#"
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
                  }}
                >
                  <span style={{ transform: "scale(0.8125)", display: "flex" }}>{icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div style={{ padding: "64px 80px 32px", display: "grid", gridTemplateColumns: "325px 1fr", gap: "220px" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ marginBottom: "24px" }}>
                  <BridgeLogoWhite />
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
                  Blending resources and innovation across the integrated sectors for development, growth, and
                  empowerment.
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.55)",
                    fontFamily: "'DM Sans', sans-serif",
                    margin: "0 0 4px",
                    lineHeight: "1.7",
                  }}
                >
                  Accra, Ghana
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: colors.accent,
                    fontFamily: "'DM Sans', sans-serif",
                    margin: "0",
                    fontWeight: "600",
                  }}
                >
                  info@bridgepbc.com
                </p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {[
                  { title: "Company", links: ["About BRIDGE", "Our Approach", "Sectors", "Contact Us"] },
                  {
                    title: "Services",
                    links: [
                      "Research & Guidance",
                      "Venture Development",
                      "Direct Investment",
                      "Strategic Partnerships",
                    ],
                  },
                  { title: "Resources", links: ["White Paper", "Case Studies", "Research Library", "Data & Reports"] },
                  {
                    title: "Insights",
                    links: ["Insights & Analysis", "Sector Briefs", "Policy Updates", "Annual Review"],
                  },
                ].map((col) => (
                  <div key={col.title}>
                    <h4
                      style={{
                        fontSize: "12px",
                        fontWeight: "700",
                        color: colors.accent,
                        fontFamily: "'DM Sans', sans-serif",
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        marginBottom: "24px",
                      }}
                    >
                      {col.title}
                    </h4>
                    {col.links.map((link) => (
                      <a
                        key={link}
                        href="#"
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
          <div
            style={{
              padding: "0 80px 20px",
              display: "grid",
              gridTemplateColumns: "325px 1fr",
              gap: "220px",
              alignItems: "start",
            }}
          >
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
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  placeholder="Your email address"
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: colors.white,
                    fontSize: "13px",
                    fontFamily: "'DM Sans', sans-serif",
                    outline: "none",
                    height: "44px",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  style={{
                    backgroundColor: colors.accent,
                    color: colors.primary,
                    border: "none",
                    padding: "12px 20px",
                    fontSize: "13px",
                    fontWeight: "700",
                    fontFamily: "'DM Sans', sans-serif",
                    cursor: "pointer",
                    borderRadius: "8px",
                    height: "44px",
                    boxSizing: "border-box",
                  }}
                >
                  {"\u2192"}
                </button>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                {socialIcons.map((icon, i) => (
                  <a
                    key={i}
                    href="#"
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
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <SectorGrid />
            </div>
          </div>
        </>
      )}

      <div
        style={{
          padding: isMobile ? "16px 20px" : "20px 80px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif" }}>
          {"\u00A9"} 2026 BRIDGE PBC
        </span>
        <div style={{ display: "flex", gap: isMobile ? "12px" : "20px" }}>
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
    </footer>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function BRIDGEAboutPage() {
  const isMobile = useIsMobile();

  return (
    <div style={{ fontFamily: "DM Sans, sans-serif", margin: 0, padding: 0, backgroundColor: colors.white }}>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Poppins:wght@700;800&display=swap"
        rel="stylesheet"
      />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .header-icon { transition: all 0.25s ease; cursor: pointer; }
        .header-icon:hover { color: #1B4D3E !important; }
        .header-icon:hover svg { stroke: #1B4D3E !important; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      <Header />
      <HeroSection isMobile={isMobile} />
      <VisionSection isMobile={isMobile} />
      <WhatWeDoSection isMobile={isMobile} />
      <ThreeGapsSection isMobile={isMobile} />
      <BridgeToImpactSection isMobile={isMobile} />
      <CTASection isMobile={isMobile} />
      <Footer />
    </div>
  );
}
