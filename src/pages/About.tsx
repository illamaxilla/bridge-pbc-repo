import { FOOTER_SECTOR_ICONS, SECTOR_ROUTES } from "@/data/sectorIcons";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";

// ============================================================================
// BRIDGE ABOUT US PAGE v3
// BRIDGE = tool, resource, and solution for entrepreneurs, businesses,
// investors, and government agencies. Every stat is about the ecosystem.
// ============================================================================

import { colors } from "@/lib/theme";
import { useIsMobile } from "@/hooks/useIsMobile";

// ── Header is now shared (SiteHeader)

// ============================================================================
// SECTION 1: Hero — KEPT
// ============================================================================
function HeroSection({ isMobile }) {
  return (
    <section
      className={`bg-white ${isMobile ? "px-5 pt-12 pb-[60px]" : "px-20 pt-20 pb-[120px]"}`}
    >
      <div className="max-w-[1200px] mx-auto">
        <div
          className={`${isMobile ? "block" : "flex justify-between items-center"} gap-[60px]`}
        >
          {/* Left — text content */}
          <div className={`flex-[1_1_55%] ${isMobile ? "max-w-full" : "max-w-[580px]"}`}>
            {/* Pill */}
            <div
              className={`inline-flex items-center gap-2 border border-[#DEDEDE] rounded-[50px] px-5 py-2 ${isMobile ? "mb-6" : "mb-8"}`}
            >
              <div
                className="w-2 h-2 rounded-full bg-[#B8D935]"
              />
              <span
                className="font-['Inter',sans-serif] text-[11px] font-bold tracking-[2px] uppercase text-[#1B4D3E]"
              >
                BRIDGE
              </span>
            </div>

            <h1
              className={`font-['DM_Sans',sans-serif] ${isMobile ? "text-[34px]" : "text-[52px]"} font-light leading-[1.1] text-[#1B4D3E] ${isMobile ? "mb-5" : "mb-8"} tracking-[-1px]`}
            >
              The gap between <span className="font-bold">opportunity</span>
              <br />
              and{" "}
              <span className="font-bold text-[#B8D935] relative">
                impact
                <svg
                  className="absolute bottom-[-6px] left-0 w-full"
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
              className={`font-['Inter',sans-serif] ${isMobile ? "text-[15px]" : "text-[17px]"} font-normal leading-[1.7] text-[#666] m-0 max-w-[480px]`}
            >
              BRIDGE is a tool, resource, and solution for entrepreneurs building ventures, businesses scaling
              operations, investors seeking impact, and government agencies delivering results — we are a bridge to that
              outcome.
            </p>
          </div>

          {/* Right — image placeholder */}
          {!isMobile && (
            <div
              className="flex-[0_0_420px] h-[380px] rounded-[20px] bg-[#F3F5F2] border border-[#DEDEDE] flex items-center justify-center overflow-hidden"
            >
              <div
                className="flex flex-col items-center gap-3 text-[#ccc]"
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
                <span className="font-['Inter',sans-serif] text-xs font-medium text-[#bbb]">
                  Hero Image
                </span>
              </div>
            </div>
          )}

          {/* Mobile image placeholder */}
          {isMobile && (
            <div
              className="mt-8 h-[200px] rounded-2xl bg-[#F3F5F2] border border-[#DEDEDE] flex items-center justify-center"
            >
              <div
                className="flex flex-col items-center gap-2"
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
                <span className="font-['Inter',sans-serif] text-[11px] font-medium text-[#bbb]">
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
      className={`bg-[#F3F5F2] ${isMobile ? "px-5 py-[60px]" : "px-20 py-[120px]"}`}
    >
      <div
        className="max-w-[860px] mx-auto text-center"
      >
        {/* Section pill */}
        <div
          className={`inline-flex items-center gap-2 border border-[#DEDEDE] rounded-[50px] px-5 py-2 ${isMobile ? "mb-8" : "mb-12"}`}
        >
          <div
            className="w-2 h-2 rounded-full bg-[#B8D935]"
          />
          <span
            className="font-['Inter',sans-serif] text-[11px] font-bold tracking-[2px] uppercase text-[#1B4D3E]"
          >
            OUR VISION
          </span>
        </div>

        {/* Quote */}
        <h2
          className={`font-['DM_Sans',sans-serif] ${isMobile ? "text-[24px]" : "text-[38px]"} font-normal leading-[1.4] text-[#1B4D3E] ${isMobile ? "mb-8" : "mb-10"} tracking-[-0.3px]`}
        >
          A Ghana where every citizen has the <em className="font-bold italic">tools</em> to
          thrive, the <em className="font-bold italic">security</em> to plan, and the{" "}
          <em className="font-bold italic">agency</em> to{" "}
          <em className="font-bold italic text-[#B8D935]">bridge the gap</em>
        </h2>

        {/* Decorative separator */}
        <div
          className={`flex items-center justify-center gap-3 ${isMobile ? "mb-8" : "mb-10"}`}
        >
          <div
            className="w-12 h-[2px] bg-[#DEDEDE]"
          />
          <div
            className="w-2 h-2 rounded-full bg-[#B8D935]"
          />
          <div
            className="w-12 h-[2px] bg-[#DEDEDE]"
          />
        </div>

        {/* Supporting text */}
        <p
          className={`font-['Inter',sans-serif] ${isMobile ? "text-sm" : "text-[15px]"} font-normal leading-[1.7] text-[#999] max-w-[620px] mx-auto`}
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
      className={`bg-[#1B4D3E] ${isMobile ? "px-5 py-[60px]" : "px-20 py-[100px]"}`}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Mobile: tabs + capabilities FIRST, then description */}
        {isMobile ? (
          <>
            {/* Section pill */}
            <div
              className="inline-flex items-center gap-2 border border-white/20 rounded-[50px] px-5 py-2 mb-6"
            >
              <div
                className="w-2 h-2 rounded-full bg-[#B8D935]"
              />
              <span
                className="font-['Inter',sans-serif] text-[11px] font-bold tracking-[2px] uppercase text-white"
              >
                OUR MISSION
              </span>
            </div>

            <p
              className="font-['Inter',sans-serif] text-[15px] font-normal leading-[1.6] text-white/60 mb-5"
            >
              To deliver the intelligence, resources, and strategies that{" "}
              <span className="font-semibold text-[#B8D935]">bridge the gap</span> between opportunity and
              outcome.
            </p>

            <h2
              className="font-['DM_Sans',sans-serif] text-[32px] font-light leading-[1.15] text-white mb-6 tracking-[-0.5px]"
            >
              <span className="font-bold">BRIDGE</span> is a <span className="font-bold">tool</span>, a{" "}
              <span className="font-bold">resource</span>, and a{" "}
              <span className="font-bold text-[#B8D935]">solution</span>
            </h2>

            {/* Tab bar — mobile first */}
            <div
              className="flex gap-1 mb-4 bg-white rounded-[14px] p-1 border border-[#DEDEDE]"
            >
              {tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveTab(i);
                    setShowCapabilities(false);
                  }}
                  className={`flex-1 py-2.5 rounded-[10px] border-none cursor-pointer font-['DM_Sans',sans-serif] text-sm transition-all duration-300 ${
                    i === activeTab
                      ? "font-bold bg-[#1B4D3E] text-white"
                      : "font-medium bg-transparent text-[#666]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Capabilities toggle — mobile */}
            <button
              onClick={() => setShowCapabilities(!showCapabilities)}
              className={`w-full bg-white px-5 py-4 border border-[#DEDEDE] shadow-[0_4px_24px_rgba(0,0,0,0.04)] cursor-pointer flex items-center justify-between transition-all duration-200 ${
                showCapabilities
                  ? "rounded-t-2xl border-b-0 mb-0"
                  : "rounded-2xl mb-7"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-2 h-2 rounded-full bg-[#B8D935]"
                />
                <span
                  className="font-['Inter',sans-serif] text-[11px] font-bold tracking-[2px] uppercase text-[#5C7A1F]"
                >
                  CAPABILITIES
                </span>
                <span
                  className="font-['Inter',sans-serif] text-[11px] font-semibold text-[#999]"
                >
                  ({active.items.length})
                </span>
              </div>
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                  showCapabilities ? "bg-[#1B4D3E]" : "bg-[#F3F5F2]"
                }`}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className={`transition-transform duration-200 ${showCapabilities ? "rotate-180" : "rotate-0"}`}
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
                className="bg-white rounded-b-2xl px-5 pb-5 border border-[#DEDEDE] border-t-0 shadow-[0_4px_24px_rgba(0,0,0,0.04)] mb-7"
              >
                {active.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3.5 py-2.5"
                    style={{
                      borderBottom: i < active.items.length - 1 ? `1px solid ${colors.line}` : "none",
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full bg-[#B8D935] shrink-0"
                    />
                    <span
                      className="font-['Inter',sans-serif] text-sm font-normal leading-[1.4] text-[#555]"
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {!showCapabilities && <div className="h-0" />}

            {/* Description + Callout — below on mobile */}
            <p
              className="font-['Inter',sans-serif] text-[15px] font-normal leading-[1.7] text-white/60 mb-6"
            >
              {active.description}
            </p>

            <div
              className="border-l-[3px] border-[#B8D935] pl-5"
            >
              <p
                className="font-['Inter',sans-serif] text-sm font-medium italic text-white/75 m-0 leading-[1.6]"
              >
                {active.accent}
              </p>
            </div>
          </>
        ) : (
          /* Desktop: side-by-side layout */
          <div
            className="flex gap-[60px] items-start"
          >
            {/* Left column — pill + headline + description + callout */}
            <div className="flex-[1_1_55%]">
              <div
                className="inline-flex items-center gap-2 border border-white/20 rounded-[50px] px-5 py-2 mb-8"
              >
                <div
                  className="w-2 h-2 rounded-full bg-[#B8D935]"
                />
                <span
                  className="font-['Inter',sans-serif] text-[11px] font-bold tracking-[2px] uppercase text-white"
                >
                  OUR MISSION
                </span>
              </div>

              <p
                className="font-['Inter',sans-serif] text-[17px] font-normal leading-[1.6] text-white/60 mb-5 max-w-[500px]"
              >
                To deliver the intelligence, resources, and strategies that{" "}
                <span className="font-semibold text-[#B8D935]">bridge the gap</span> between opportunity and
                outcome.
              </p>

              <h2
                className="font-['DM_Sans',sans-serif] text-[42px] font-light leading-[1.15] text-white mb-6 tracking-[-0.5px] max-w-[500px]"
              >
                <span className="font-bold">BRIDGE</span> is a <span className="font-bold">tool</span>,
                a <span className="font-bold">resource</span>, and a{" "}
                <span className="font-bold text-[#B8D935]">solution</span>
              </h2>

              <p
                className="font-['Inter',sans-serif] text-base font-normal leading-[1.7] text-white/60 mb-8"
              >
                {active.description}
              </p>

              <div
                className="border-l-[3px] border-[#B8D935] pl-5"
              >
                <p
                  className="font-['Inter',sans-serif] text-sm font-medium italic text-white/75 m-0"
                >
                  {active.accent}
                </p>
              </div>
            </div>

            {/* Right column — tab bar + capabilities card */}
            <div
              className="flex-[0_0_auto] w-[420px] sticky top-10"
            >
              <div
                className="flex gap-1 mb-4 bg-white rounded-[14px] p-1 border border-[#DEDEDE] w-full"
              >
                {tabs.map((tab, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`flex-1 py-3 rounded-[10px] border-none cursor-pointer font-['DM_Sans',sans-serif] text-[15px] transition-all duration-300 ${
                      i === activeTab
                        ? "font-bold bg-[#1B4D3E] text-white"
                        : "font-medium bg-transparent text-[#666]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div
                className="bg-white rounded-[20px] p-9 border border-[#DEDEDE] shadow-[0_4px_24px_rgba(0,0,0,0.04)] min-h-[340px]"
              >
                <div
                  className="font-['Inter',sans-serif] text-[11px] font-bold tracking-[2px] uppercase text-[#5C7A1F] mb-6"
                >
                  CAPABILITIES
                </div>

                {active.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3.5 py-3"
                    style={{
                      borderBottom: i < active.items.length - 1 ? `1px solid ${colors.line}` : "none",
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full bg-[#B8D935] shrink-0"
                    />
                    <span
                      className="font-['Inter',sans-serif] text-sm font-normal leading-[1.4] text-[#555]"
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
      className={`bg-white ${isMobile ? "py-[60px]" : "py-[100px]"}`}
    >
      <div className={`max-w-[1200px] mx-auto ${isMobile ? "px-5" : "px-20"}`}>
        {/* Header */}
        <div className={`text-center ${isMobile ? "mb-6" : "mb-8"}`}>
          <div
            className="inline-flex items-center gap-2 border border-[#DEDEDE] rounded-[50px] px-5 py-2"
          >
            <div
              className="w-2 h-2 rounded-full bg-[#B8D935]"
            />
            <span
              className="font-['Inter',sans-serif] text-[11px] font-bold tracking-[2px] uppercase text-[#1B4D3E]"
            >
              THE OPPORTUNITY
            </span>
          </div>
        </div>

        <h2
          className={`font-['DM_Sans',sans-serif] ${isMobile ? "text-[30px]" : "text-[48px]"} font-light leading-[1.15] text-[#1B4D3E] mb-5 tracking-[-0.5px] text-center`}
        >
          <span className="font-bold">Intelligence</span> / <span className="font-bold">Resources</span>{" "}
          / <span className="font-bold text-[#B8D935]">Execution</span>
        </h2>

        <p
          className={`font-['Inter',sans-serif] ${isMobile ? "text-sm" : "text-base"} font-normal leading-[1.7] text-[#666] text-center max-w-[600px] ${isMobile ? "mx-auto mb-8" : "mx-auto mb-12"}`}
        >
          The intelligence to see the opportunity. The resources to fund it. The execution to deliver it. Sector by
          sector.
        </p>

        {/* Filter bar */}
        <div
          className={`flex justify-center ${isMobile ? "mb-7" : "mb-10"}`}
        >
          <div
            className="inline-flex gap-1 bg-[#F3F5F2] rounded-[50px] p-1 border border-[#DEDEDE]"
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`${isMobile ? "px-4 py-2" : "px-6 py-2.5"} rounded-[50px] border-none cursor-pointer font-['Inter',sans-serif] ${isMobile ? "text-xs" : "text-[13px]"} transition-all duration-300 whitespace-nowrap ${
                  f === activeFilter
                    ? "font-bold bg-[#1B4D3E] text-white"
                    : "font-medium bg-transparent text-[#666]"
                }`}
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
              className={`${isMobile ? "flex-[0_0_82%] rounded-2xl px-5 py-6 min-h-[380px]" : "flex-[0_0_380px] rounded-[20px] px-8 py-9 min-h-[420px]"} snap-start flex flex-col box-border ${
                isDark ? "bg-[#1B4D3E] border-none" : "bg-[#F3F5F2] border border-[#DEDEDE]"
              }`}
            >
              {/* Top row: sector pill + gap tag */}
              <div
                className={`flex items-center justify-between ${isMobile ? "mb-5" : "mb-6"}`}
              >
                <div
                  className={`inline-flex items-center gap-1.5 rounded-[50px] px-3 py-[5px] ${
                    isDark ? "bg-white/10" : "bg-white"
                  }`}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-[#B8D935]"
                  />
                  <span
                    className={`font-['Inter',sans-serif] text-[10px] font-bold tracking-[1.5px] uppercase ${
                      isDark ? "text-white/60" : "text-[#999]"
                    }`}
                  >
                    {s.sector}
                  </span>
                </div>
                <span
                  className={`font-['Inter',sans-serif] text-[9px] font-bold tracking-[1.5px] uppercase ${
                    isDark ? "text-white/35" : "text-[#ccc]"
                  }`}
                >
                  {s.gap}
                </span>
              </div>

              {/* Big stat */}
              <div
                className={`font-['DM_Sans',sans-serif] ${isMobile ? "text-[40px]" : "text-[44px]"} font-extrabold leading-none mb-1 tracking-[-1.5px] ${
                  isDark ? "text-[#B8D935]" : "text-[#1B4D3E]"
                }`}
              >
                {s.stat}
              </div>
              <div
                className={`font-['Inter',sans-serif] text-xs font-medium ${isMobile ? "mb-4" : "mb-5"} leading-[1.4] ${
                  isDark ? "text-white/50" : "text-[#999]"
                }`}
              >
                {s.statLabel}
              </div>

              {/* Insight */}
              <p
                className={`font-['Inter',sans-serif] text-[13px] font-normal leading-[1.65] m-0 mb-auto ${isMobile ? "pb-4" : "pb-5"} ${
                  isDark ? "text-white/65" : "text-[#555]"
                }`}
              >
                {s.insight}
              </p>

              {/* BRIDGE line — contained inner box */}
              <div
                className={`rounded-[10px] px-3 py-2.5 ${
                  isDark ? "bg-white" : "bg-[#1B4D3E]"
                }`}
              >
                <span
                  className={`font-['Inter',sans-serif] text-xs font-semibold leading-[1.5] ${
                    isDark ? "text-[#1B4D3E]" : "text-white"
                  }`}
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
        <div className="flex justify-center gap-1.5 mt-5 px-5">
          {filtered.map((_, i) => (
            <div
              key={i}
              onClick={() => {
                if (scrollRef.current) {
                  const cardWidth = scrollRef.current.offsetWidth * 0.82 + 12;
                  scrollRef.current.scrollTo({ left: i * cardWidth, behavior: "smooth" });
                }
              }}
              className={`h-2 rounded cursor-pointer transition-all duration-300 ${
                i === activeCard ? "w-6 bg-[#B8D935]" : "w-2 bg-[#DEDEDE]"
              }`}
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
      bg: "bg-white",
      borderClass: "border-2 border-[#1B4D3E]",
      labelColor: "text-[#C44536]",
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
      bg: "bg-white",
      borderClass: "border-2 border-[#1B4D3E]",
      labelColor: "text-[#5C7A1F]",
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
      bg: "bg-white",
      borderClass: "border-2 border-[#1B4D3E]",
      labelColor: "text-[#1B4D3E]",
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
      className={`bg-[#F3F5F2] ${isMobile ? "px-5 pt-[60px] pb-10" : "px-20 pt-[100px] pb-[50px]"}`}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Header row — text left, stakeholder icons right */}
        <div
          className={`${isMobile ? "block" : "flex justify-between items-end"} ${isMobile ? "mb-8" : "mb-12"}`}
        >
          {/* Left — pill, headline, description */}
          <div className={isMobile ? "max-w-full" : "max-w-[600px]"}>
            <div
              className={`inline-flex items-center gap-2 border border-[#DEDEDE] rounded-[50px] px-5 py-2 ${isMobile ? "mb-6" : "mb-8"}`}
            >
              <div
                className="w-2 h-2 rounded-full bg-[#B8D935]"
              />
              <span
                className="font-['Inter',sans-serif] text-[11px] font-bold tracking-[2px] uppercase text-[#1B4D3E]"
              >
                YOUR BRIDGE TO IMPACT
              </span>
            </div>

            <h2
              className={`font-['DM_Sans',sans-serif] ${isMobile ? "text-[28px]" : "text-[42px]"} font-light leading-[1.15] text-[#1B4D3E] mb-4 tracking-[-0.5px] whitespace-nowrap`}
            >
              <span className="font-bold">Targeted</span> &{" "}
              <span className="font-bold text-[#B8D935]">Customized</span> Solutions
            </h2>

            <p
              className={`font-['Inter',sans-serif] ${isMobile ? "text-sm" : "text-base"} font-normal leading-[1.7] text-[#666] m-0`}
            >
              A market trader measures impact as reliable income. An investor measures it as returns and reach. A
              ministry measures it as outcomes delivered.
            </p>
          </div>

          {/* Right — stakeholder icon buttons, bottom-aligned */}
          <div
            className={`flex gap-2 ${isMobile ? "mt-6 justify-center" : "mt-0 justify-end"}`}
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
                  className={`w-12 h-12 rounded-[14px] cursor-pointer flex items-center justify-center transition-all duration-300 shrink-0 ${
                    isActive
                      ? "border-none bg-[#1B4D3E] text-white"
                      : "border border-[#DEDEDE] bg-white text-[#999]"
                  }`}
                >
                  {icons[i]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Context line */}
        <div
          className={`bg-white rounded-[14px] border border-[#DEDEDE] flex gap-3 ${isMobile ? "p-3.5 px-4 items-start mb-3" : "p-4 px-6 items-center mb-4"}`}
        >
          <div
            className={`w-6 h-6 rounded-full bg-[#B8D935] flex items-center justify-center shrink-0 ${isMobile ? "mt-0.5" : "mt-0"}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={colors.primary}>
              <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
            </svg>
          </div>
          {!isMobile && <div className="w-px h-4 bg-[#DEDEDE]" />}
          <span
            className={`font-['Inter',sans-serif] ${isMobile ? "text-[13px]" : "text-sm"} font-normal text-[#555] leading-[1.5]`}
          >
            {active.context}
          </span>
        </div>

        {/* Three-phase progression */}
        {isMobile ? (
          <>
            {/* Cards cascade — reveal one at a time, all stay visible */}
            <div className="flex flex-col gap-0">
              {phases.map((phase, i) => {
                if (i > activePhase) return null;
                return (
                  <React.Fragment key={i}>
                    <div
                      className={`${phase.bg} rounded-2xl p-5 px-5 ${phase.borderClass} relative`}
                    >
                      <div
                        className="flex items-center gap-2.5 mb-3"
                      >
                        {phase.icon}
                        <span
                          className={`font-['Inter',sans-serif] text-[10px] font-bold tracking-[2px] ${phase.labelColor}`}
                        >
                          {phase.label}
                        </span>
                      </div>
                      <p
                        className="font-['Inter',sans-serif] text-[13px] font-normal leading-[1.65] text-[#555] m-0"
                      >
                        {phase.text}
                      </p>
                    </div>

                    {/* Down arrow connector — after this card if it's the last revealed and more remain */}
                    {i === activePhase && i < phases.length - 1 && (
                      <div
                        onClick={() => setActivePhase(activePhase + 1)}
                        className="flex justify-center py-2 cursor-pointer"
                      >
                        <div
                          className="w-7 h-7 rounded-full bg-white border border-[#DEDEDE] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-200"
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
                        className="flex justify-center py-2 cursor-pointer"
                      >
                        <div
                          className="w-7 h-7 rounded-full bg-white border border-[#DEDEDE] flex items-center justify-center transition-all duration-200"
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            className="rotate-180 transition-transform duration-200"
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
                className="bg-white rounded-[14px] p-3.5 px-4 mt-3 flex items-start gap-3 border border-[#DEDEDE]"
              >
                <div
                  className="w-6 h-6 rounded-full bg-[#B8D935] flex items-center justify-center shrink-0 mt-0.5"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={colors.primary}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" />
                  </svg>
                </div>
                <span
                  className="font-['Inter',sans-serif] text-[13px] font-normal text-[#555] leading-[1.5]"
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
              className="grid grid-cols-3 gap-4"
            >
              {phases.map((phase, i) => (
                <div
                  key={i}
                  className={`${phase.bg} rounded-[20px] p-7 px-7 ${phase.borderClass} relative min-h-[200px]`}
                >
                  {i < 2 && (
                    <div
                      className="absolute -right-5 top-1/2 -translate-y-1/2 z-[2] w-6 h-6 rounded-full bg-white border border-[#DEDEDE] flex items-center justify-center"
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
                    className="flex items-center gap-2.5 mb-3"
                  >
                    {phase.icon}
                    <span
                      className={`font-['Inter',sans-serif] text-[10px] font-bold tracking-[2px] ${phase.labelColor}`}
                    >
                      {phase.label}
                    </span>
                  </div>

                  <p
                    className="font-['Inter',sans-serif] text-sm font-normal leading-[1.65] text-[#555] m-0"
                  >
                    {phase.text}
                  </p>
                </div>
              ))}
            </div>

            {/* BRIDGE summary bar — desktop only here */}
            <div
              className="bg-white rounded-[14px] p-4 px-6 mt-4 flex items-center gap-3 border border-[#DEDEDE]"
            >
              <div
                className="w-6 h-6 rounded-full bg-[#B8D935] flex items-center justify-center shrink-0"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill={colors.primary}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" />
                </svg>
              </div>
              <div className="w-px h-4 bg-[#DEDEDE]" />
              <span
                className="font-['Inter',sans-serif] text-sm font-normal text-[#555]"
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
  const navigate = useNavigate();

  return (
    <section
      className={`bg-[#F3F5F2] ${isMobile ? "px-5 pt-5 pb-10" : "px-20 pt-[30px] pb-[60px]"}`}
    >
      <div
        className={`max-w-[1200px] mx-auto bg-[#1B4D3E] rounded-3xl ${isMobile ? "px-6 py-[60px]" : "px-[60px] py-20"} relative overflow-hidden text-center`}
      >
        {/* Decorative shapes */}
        <div
          className="absolute -top-10 -left-10 w-[200px] h-[200px] rounded-full bg-white/[0.04] pointer-events-none"
        />
        <div
          className="absolute -bottom-[60px] -right-[60px] w-[280px] h-[280px] rounded-full bg-white/[0.03] pointer-events-none"
        />
        <div
          className="absolute top-[40%] left-[8%] w-[120px] h-[120px] rounded-full bg-white/[0.02] pointer-events-none"
        />

        <div className="relative z-[1]">
          {/* Pill */}
          <div
            className="inline-flex items-center gap-2 border border-white/15 rounded-[50px] px-5 py-2 mb-8"
          >
            <div
              className="w-2 h-2 rounded-full bg-[#B8D935]"
            />
            <span
              className="font-['Inter',sans-serif] text-[11px] font-bold tracking-[2px] uppercase text-white/60"
            >
              GET INVOLVED
            </span>
          </div>

          {/* Headline */}
          <h2
            className={`font-['DM_Sans',sans-serif] ${isMobile ? "text-[28px]" : "text-[42px]"} font-bold leading-[1.15] text-white mb-5 tracking-[-0.5px]`}
          >
            Join the problem-solving ecosystem
          </h2>

          {/* Description */}
          <p
            className={`font-['Inter',sans-serif] ${isMobile ? "text-sm" : "text-base"} font-normal leading-[1.7] text-white/55 max-w-[520px] ${isMobile ? "mx-auto mb-8" : "mx-auto mb-10"}`}
          >
            Ghana's challenges are solvable. The resources exist. What's needed is coordination, commitment, and action.
          </p>

          {/* Buttons */}
          <div
            className={`flex ${isMobile ? "flex-col" : "flex-row"} ${isMobile ? "gap-3" : "gap-4"} justify-center items-center`}
          >
            <button
              onClick={() => navigate("/services")}
              className={`px-9 py-4 rounded-[50px] border-none cursor-pointer font-['DM_Sans',sans-serif] text-[15px] font-bold bg-[#B8D935] hover:bg-[#c8e040] text-[#1B4D3E] transition-all duration-300 ${isMobile ? "w-full" : "w-auto"}`}
            >
              Partner With Us →
            </button>
            <button
              onClick={() => navigate("/resources")}
              className={`px-9 py-4 rounded-[50px] border border-white/20 cursor-pointer font-['DM_Sans',sans-serif] text-[15px] font-bold bg-transparent hover:bg-white/[0.08] text-white transition-all duration-300 ${isMobile ? "w-full" : "w-auto"}`}
            >
              Request Materials
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const SectorGrid = () => {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  return (
    <div>
      <div
        className={`text-xs font-semibold font-['DM_Sans',sans-serif] uppercase tracking-[1.5px] mb-3 transition-colors duration-[250ms] leading-none min-h-[12px] ${
          hovered !== null ? "text-[#B8D935]" : "text-white/40"
        }`}
      >
        {hovered !== null ? FOOTER_SECTOR_ICONS[hovered].label : "Explore 12 Sectors"}
      </div>
      <div className="flex justify-between items-center">
        {FOOTER_SECTOR_ICONS.map((sector, i) => {
          const isH = hovered === i;
          return (
            <a
              key={sector.key}
              href={SECTOR_ROUTES[sector.key] || "/sectors"}
              title={sector.label}
              onClick={(e) => { e.preventDefault(); navigate(SECTOR_ROUTES[sector.key] || "/sectors"); }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`flex items-center justify-center w-[44px] h-[44px] rounded-[10px] cursor-pointer no-underline transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] box-border ${
                isH
                  ? "bg-[rgba(184,217,53,0.12)] border border-[rgba(184,217,53,0.35)] -translate-y-0.5 shadow-[0_6px_16px_rgba(0,0,0,0.2),0_0_0_1px_rgba(184,217,53,0.15)]"
                  : "bg-white/[0.04] border border-white/[0.07] translate-y-0 shadow-none"
              }`}
            >
              <div
                className={`flex items-center justify-center transition-opacity duration-[250ms] ${isH ? "opacity-100" : "opacity-50"}`}
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
    <Layout>
    <div className="font-['DM_Sans',sans-serif] m-0 p-0 bg-white">


      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .header-icon { transition: all 0.25s ease; cursor: pointer; }
        .header-icon:hover { color: #1B4D3E !important; }
        .header-icon:hover svg { stroke: #1B4D3E !important; }
      `}</style>

      <HeroSection isMobile={isMobile} />
      <VisionSection isMobile={isMobile} />
      <WhatWeDoSection isMobile={isMobile} />
      <ThreeGapsSection isMobile={isMobile} />
      <BridgeToImpactSection isMobile={isMobile} />
      <CTASection isMobile={isMobile} />
    </div>
    </Layout>
  );
}
