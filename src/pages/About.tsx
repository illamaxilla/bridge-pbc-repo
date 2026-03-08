import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SiteHeader from "@/components/SiteHeaderMinimal";
import SiteFooter from "@/components/SiteFooter";

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

// ── Header is now shared (SiteHeader)

// ============================================================================
// SECTION 1: Hero — KEPT
// ============================================================================
function HeroSection({ isMobile }) {
  return (
    <section
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "48px 20px 60px" : "80px 80px 120px",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        <div
          style={{
            display: isMobile ? "block" : "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "60px",
          }}
        >
          {/* Left — text content */}
          <div style={{ flex: "1 1 55%", maxWidth: isMobile ? "100%" : "580px" }}>
            {/* Pill */}
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
                BRIDGE
              </span>
            </div>

            <h1
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: isMobile ? "34px" : "52px",
                fontWeight: "300",
                lineHeight: "1.1",
                color: colors.primary,
                margin: isMobile ? "0 0 20px 0" : "0 0 32px 0",
                letterSpacing: "-1px",
              }}
            >
              The gap between <span style={{ fontWeight: "700" }}>opportunity</span>
              <br />
              and{" "}
              <span style={{ fontWeight: "700", color: colors.accent, position: "relative" }}>
                impact
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
              </span>
            </h1>

            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? "15px" : "17px",
                fontWeight: "400",
                lineHeight: "1.7",
                color: "#666",
                margin: 0,
                maxWidth: "480px",
              }}
            >
              BRIDGE is a tool, resource, and solution for entrepreneurs building ventures, businesses scaling
              operations, investors seeking impact, and government agencies delivering results — we are a bridge to that
              outcome.
            </p>
          </div>

          {/* Right — image placeholder */}
          {!isMobile && (
            <div
              style={{
                flex: "0 0 420px",
                height: "380px",
                borderRadius: "20px",
                backgroundColor: colors.background,
                border: `1px solid ${colors.line}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                  color: "#ccc",
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ccc"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: "500", color: "#bbb" }}>
                  Hero Image
                </span>
              </div>
            </div>
          )}

          {/* Mobile image placeholder */}
          {isMobile && (
            <div
              style={{
                marginTop: "32px",
                height: "200px",
                borderRadius: "16px",
                backgroundColor: colors.background,
                border: `1px solid ${colors.line}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ccc"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: "500", color: "#bbb" }}>
                  Hero Image
                </span>
              </div>
            </div>
          )}
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
        backgroundColor: colors.background,
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
        backgroundColor: colors.primary,
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
                border: "1px solid rgba(255,255,255,0.2)",
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
                  color: colors.white,
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
                color: "rgba(255,255,255,0.6)",
                margin: "0 0 20px 0",
              }}
            >
              To deliver the intelligence, resources, and strategies that{" "}
              <span style={{ fontWeight: "600", color: colors.accent }}>bridge the gap</span> between opportunity and
              outcome.
            </p>

            <h2
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "32px",
                fontWeight: "300",
                lineHeight: "1.15",
                color: colors.white,
                margin: "0 0 24px 0",
                letterSpacing: "-0.5px",
              }}
            >
              <span style={{ fontWeight: "700" }}>BRIDGE</span> is a <span style={{ fontWeight: "700" }}>tool</span>, a{" "}
              <span style={{ fontWeight: "700" }}>resource</span>, and a{" "}
              <span style={{ fontWeight: "700", color: colors.accent }}>solution</span>
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
                color: "rgba(255,255,255,0.6)",
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
                  color: "rgba(255,255,255,0.75)",
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
                  border: "1px solid rgba(255,255,255,0.2)",
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
                    color: colors.white,
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
                  color: "rgba(255,255,255,0.6)",
                  margin: "0 0 20px 0",
                  maxWidth: "500px",
                }}
              >
                To deliver the intelligence, resources, and strategies that{" "}
                <span style={{ fontWeight: "600", color: colors.accent }}>bridge the gap</span> between opportunity and
                outcome.
              </p>

              <h2
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "42px",
                  fontWeight: "300",
                  lineHeight: "1.15",
                  color: colors.white,
                  margin: "0 0 24px 0",
                  letterSpacing: "-0.5px",
                  maxWidth: "500px",
                }}
              >
                <span style={{ fontWeight: "700" }}>BRIDGE</span> is a <span style={{ fontWeight: "700" }}>tool</span>,
                a <span style={{ fontWeight: "700" }}>resource</span>, and a{" "}
                <span style={{ fontWeight: "700", color: colors.accent }}>solution</span>
              </h2>

              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  fontWeight: "400",
                  lineHeight: "1.7",
                  color: "rgba(255,255,255,0.6)",
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
                    color: "rgba(255,255,255,0.75)",
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
        {/* Header row — text left, stakeholder icons right */}
        <div
          style={{
            display: isMobile ? "block" : "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: isMobile ? "32px" : "48px",
          }}
        >
          {/* Left — pill, headline, description */}
          <div style={{ maxWidth: isMobile ? "100%" : "600px" }}>
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
                fontSize: isMobile ? "28px" : "42px",
                fontWeight: "300",
                lineHeight: "1.15",
                color: colors.primary,
                margin: "0 0 16px 0",
                letterSpacing: "-0.5px",
                whiteSpace: "nowrap",
              }}
            >
              <span style={{ fontWeight: "700" }}>Targeted</span> &{" "}
              <span style={{ fontWeight: "700", color: colors.accent }}>Customized</span> Solutions
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
              A market trader measures impact as reliable income. An investor measures it as returns and reach. A
              ministry measures it as outcomes delivered.
            </p>
          </div>

          {/* Right — stakeholder icon buttons, bottom-aligned */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginTop: isMobile ? "24px" : "0",
              justifyContent: isMobile ? "center" : "flex-end",
            }}
          >
            {journeys.map((j, i) => {
              const isActive = i === activeJourney;
              const icons = [
                /* Entrepreneur — storefront */
                <svg
                  key="e"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 7l1.5-4h17L22 7" />
                  <path d="M2 7h20v4c0 0-1.5 2-5 2s-5-2-5-2-1.5 2-5 2-5-2-5-2V7z" />
                  <path d="M4 13v8h16v-8" />
                  <path d="M10 21v-6h4v6" />
                </svg>,
                /* Business / SME — office building */
                <svg
                  key="b"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                  <path d="M9 22v-4h6v4" />
                  <line x1="8" y1="6" x2="8" y2="6.01" />
                  <line x1="12" y1="6" x2="12" y2="6.01" />
                  <line x1="16" y1="6" x2="16" y2="6.01" />
                  <line x1="8" y1="10" x2="8" y2="10.01" />
                  <line x1="12" y1="10" x2="12" y2="10.01" />
                  <line x1="16" y1="10" x2="16" y2="10.01" />
                  <line x1="8" y1="14" x2="8" y2="14.01" />
                  <line x1="12" y1="14" x2="12" y2="14.01" />
                  <line x1="16" y1="14" x2="16" y2="14.01" />
                </svg>,
                /* Investor — trending up */
                <svg
                  key="i"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>,
                /* Government — landmark */
                <svg
                  key="g"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="22" x2="21" y2="22" />
                  <line x1="6" y1="18" x2="6" y2="11" />
                  <line x1="10" y1="18" x2="10" y2="11" />
                  <line x1="14" y1="18" x2="14" y2="11" />
                  <line x1="18" y1="18" x2="18" y2="11" />
                  <polygon points="12 2 20 8 4 8" />
                  <line x1="2" y1="18" x2="22" y2="18" />
                </svg>,
              ];
              return (
                <button
                  key={i}
                  onClick={() => {
                    setActiveJourney(i);
                    setActivePhase(0);
                  }}
                  title={j.stakeholder}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    border: isActive ? "none" : `1px solid ${colors.line}`,
                    backgroundColor: isActive ? colors.primary : colors.white,
                    color: isActive ? colors.white : "#999",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    flexShrink: 0,
                  }}
                >
                  {icons[i]}
                </button>
              );
            })}
          </div>
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
  const navigate = useNavigate();

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
                borderRadius: "50px",
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
                borderRadius: "50px",
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

const SECTOR_ROUTES: Record<string, string> = {
  infra: "/sectors/infrastructure",
  fin: "/sectors/financial",
  health: "/sectors/health",
  tech: "/sectors/technology",
  edu: "/sectors/education",
  agri: "/sectors/agriculture",
  creative: "/sectors/sports",
  housing: "/sectors/housing",
  tourism: "/sectors/tourism",
  energy: "/sectors/energy",
  mfg: "/sectors/manufacturing",
  transport: "/sectors/transport",
};

const SectorGrid = () => {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
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
              href={SECTOR_ROUTES[sector.key] || "/sectors"}
              title={sector.label}
              onClick={(e) => { e.preventDefault(); navigate(SECTOR_ROUTES[sector.key] || "/sectors"); }}
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

      <SiteHeader />
      <HeroSection isMobile={isMobile} />
      <VisionSection isMobile={isMobile} />
      <WhatWeDoSection isMobile={isMobile} />
      <ThreeGapsSection isMobile={isMobile} />
      <BridgeToImpactSection isMobile={isMobile} />
      <CTASection isMobile={isMobile} />
      <SiteFooter />
    </div>
  );
}
