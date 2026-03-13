import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { IconCode, IconBuilding, IconWallet, IconFactory, IconTruck, IconZap, IconArrowRight, IconArrowDown, IconCheck, IconWarning, IconUsers, IconCpu, IconStorefront, IconOfficeBuilding, IconLandmark, IconTrendingUp, IconCross } from "@/components/icons/SectorIcons";
import { ArrowRight, BarChart3, Blocks, Check, ChevronDown, GraduationCap, Lightbulb, Sprout, Users, Wifi } from "lucide-react";
import { useCounter } from "@/hooks/useCounter";

// ============================================================================
// BRIDGE SECTOR PAGE: Technology & Innovation
// INTEGRATED VERSION with Premium ValueChain Section
// ============================================================================
// Design System: Dark Green #1B4D3E, Lime #B8D935, Off-white #F3F5F2
// ============================================================================

import { colors, layout } from "@/lib/theme";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectorPageTemplate from "@/components/sectors/SectorPageTemplate";

const CONTENT_MAX_WIDTH = layout.maxWidth;

// ============================================================================
// SECTOR DATA - Technology & Innovation
// ============================================================================

const sectorData = {
  id: 4,
  slug: "technology",
  name: "Technology & Innovation",
  shortName: "Technology",
  category: "Innovation",
  categoryColor: "#7C3AED",
  heroTitleBold: "Technology",
  heroTitleRest: "& Innovation",

  capitalRange: "$8-15M",
  ventures: 21,
  jobsImpact: "24.3M users",
  gdpContribution: "3.6%",

  problemHeadline: "Bridging Ghana's Digital Divide",
  problemSubheadline:
    "Ghana's digital foundation is extraordinary — 70% internet penetration, 23.4M mobile money users, 100+ tech hubs, and a generation of builders ready to scale. The opportunity: channeling $10B+ in addressable market potential into ventures that connect 10.4M more citizens, unlock capital for 200+ growth-stage startups, and close the gap between connectivity and prosperity.",

  keyStats: [
    { label: "Internet Penetration", value: "69.9%", detail: "22-54% rural vs 80%+ urban gap" },
    { label: "Female Founder Funding", value: "<1%", detail: "Of total venture capital deployed" },
    { label: "Active Tech Hubs", value: "100+", detail: "Accra, Kumasi & emerging cities" },
    { label: "Ghanaians Offline", value: "10.4M", detail: "Next wave of digital adoption" },
  ],

  painPoints: [
    {
      title: "Growth Capital Opportunity",
      description:
        "Ghana's best startups are ready for Series A capital — local fund structures can retain talent and capture returns currently flowing abroad.",
      rootCauses: ["Local fund structures needed", "Founder-friendly terms", "Track record building"],
      quantification: "$68M deployed in 2024 — $500M+ addressable market",
    },
    {
      title: "Rural Connectivity Frontier",
      description:
        "10.4M Ghanaians represent the next wave of digital adoption — communities ready for mobile commerce, financial services, and digital platforms.",
      rootCauses: ["Coverage expansion", "Affordability models", "Device accessibility"],
      quantification: "10.4M citizens ready for first-time digital access",
    },
    {
      title: "Talent Retention & Mobilization",
      description:
        "Thousands of world-class Ghanaian developers work globally — a salary bridge that local opportunities and remote platforms can narrow.",
      rootCauses: ["Salary bridging potential", "Career pathway creation", "Remote work platforms"],
      quantification: "1,000s of developers available for mobilization",
    },
    {
      title: "Female Founder Potential",
      description:
        "Women represent Ghana's largest untapped founder pool — dedicated accelerators and inclusive fund structures unlock new venture creation.",
      rootCauses: ["Inclusive fund structures", "Network building", "STEM pathway expansion"],
      quantification: "99% of female founder capital yet to deploy",
    },
  ],

  solutions: [
    {
      tier: 1,
      name: "Kejetia Digital Platform",
      description:
        "Flagship digitization platform serving 10,000+ vendors with inventory management, mobile payments, and analytics for informal markets.",
      capital: "$3-5M",
      score: 42,
      impact: "10,000+ vendors digitized across Kejetia Market",
    },
    {
      tier: 1,
      name: "BRIDGE Growth Fund",
      description:
        "Seed-to-Series A investments of $200K–$2M in 8–12 Ghana-based tech startups, building the local venture funding ecosystem from the ground up.",
      capital: "$5-10M",
      score: 40,
      impact: "8–12 startups retained and scaled in-country",
    },
    {
      tier: 1,
      name: "Tech Talent Bridge Program",
      description:
        "Structured engagement channels for 100+ diaspora technology professionals contributing mentorship, code review, and advisory to local teams.",
      capital: "$300-600K",
      score: 40,
      impact: "100+ diaspora professionals actively engaged",
    },
    {
      tier: 1,
      name: "Fintech Growth Portfolio",
      description:
        "Growth capital deployed into licensed fintech companies building credit, lending, and insurance products on Ghana's 23.4M mobile money base.",
      capital: "$2-4M",
      score: 39,
      impact: "23.4M mobile money users gaining new products",
    },
    {
      tier: 1,
      name: "Digital Apprentice Pipeline",
      description:
        "Training-to-employment partnerships placing graduates directly into portfolio companies with structured mentorship and career development.",
      capital: "$200-400K",
      score: 38,
      impact: "500+ graduates placed into tech employment",
    },
    {
      tier: 1,
      name: "Female Founder Accelerator",
      description:
        "Dedicated accelerator addressing the <1% funding gap with pre-seed capital, mentorship networks, and investor access for women-led startups.",
      capital: "$150-300K",
      score: 38,
      impact: "20+ women-led startups funded and scaling",
    },
    {
      tier: 2,
      name: "Hub Partnership Network",
      description:
        "Formal partnerships with Ghana's 100+ existing tech hubs enabling shared deal flow, co-programming of events, and ecosystem coordination.",
      capital: "$50-100K/yr",
      score: 38,
      impact: "100+ hubs connected into deal flow pipeline",
    },
    {
      tier: 2,
      name: "Innovation Advisory Service",
      description:
        "Fee-generating advisory for early-stage startups covering product strategy, fundraising preparation, market expansion, and governance design.",
      capital: "$100-250K",
      score: 37,
      impact: "40+ startups advised with measurable growth",
    },
    {
      tier: 2,
      name: "Market Platform Expansion",
      description:
        "Replicating the proven Kejetia digitization model to Makola, Asafo, and five additional regional markets serving 50,000+ combined vendors.",
      capital: "$2-4M each",
      score: 37,
      impact: "50,000+ vendors across seven major markets",
    },
  ],

  competitors: [
    {
      name: "MEST Africa",
      focus: "Training, investment & incubation",
      gap: "Limited growth-stage capital",
      year: "2008",
      funding: "$20M+",
      priority: "High",
      strengths: [
        { name: "Training Program", rating: 5 },
        { name: "Pan-African Network", rating: 4 },
        { name: "Seed Investment", rating: 4 },
      ],
      gaps: ["No Series A follow-on capacity", "Limited sector specialization", "Accra-centric operations"],
      bridgeOpportunity: "Deal flow partnership and co-investment at growth stage",
    },
    {
      name: "Ghana Tech Lab",
      focus: "Government-affiliated tech hub",
      gap: "No investment capability",
      year: "2018",
      funding: "Gov't",
      priority: "High",
      strengths: [
        { name: "AI/Robotics Labs", rating: 4 },
        { name: "Government Access", rating: 5 },
        { name: "Youth Reach", rating: 4 },
      ],
      gaps: ["No capital deployment mechanism", "Limited commercialization pathway", "Sustainability model unclear"],
      bridgeOpportunity: "Hub partnership anchor and startup sourcing pipeline",
    },
    {
      name: "Impact Hub Accra",
      focus: "Coworking & acceleration",
      gap: "No dedicated tech focus",
      year: "2015",
      funding: "$5M+",
      priority: "Medium",
      strengths: [
        { name: "Global Network", rating: 5 },
        { name: "Social Enterprise", rating: 4 },
        { name: "Community Events", rating: 4 },
      ],
      gaps: ["Limited capital access", "Broad focus dilutes tech impact", "Space constraints in Accra"],
      bridgeOpportunity: "Event partnership and social enterprise deal pipeline",
    },
    {
      name: "Kosmos Innovation Center",
      focus: "Kumasi-based entrepreneur support",
      gap: "Narrow geographic & sector scope",
      year: "2016",
      funding: "$10M+",
      priority: "Medium",
      strengths: [
        { name: "Ashanti Reach", rating: 5 },
        { name: "Agtech Focus", rating: 4 },
        { name: "Corporate Backing", rating: 4 },
      ],
      gaps: ["Oil company transition risk", "Limited tech depth beyond agtech", "Small cohort size annually"],
      bridgeOpportunity: "Regional expansion partner for Kumasi tech ecosystem",
    },
    {
      name: "ALX Africa",
      focus: "Tech skills training at scale",
      gap: "No startup support or capital",
      year: "2022",
      funding: "$100M+",
      priority: "High",
      strengths: [
        { name: "Scale (100K+)", rating: 5 },
        { name: "Data Science Focus", rating: 5 },
        { name: "Employment Rates", rating: 4 },
      ],
      gaps: ["Training only, no venture support", "Retention in Ghana remains low", "Foreign curriculum alignment"],
      bridgeOpportunity: "Talent pipeline for portfolio companies and apprenticeships",
    },
    {
      name: "Google Research Africa",
      focus: "AI research from Accra lab",
      gap: "Limited local commercialization",
      year: "2019",
      funding: "$1B+",
      priority: "Medium",
      strengths: [
        { name: "AI Research", rating: 5 },
        { name: "Brand & Resources", rating: 5 },
        { name: "Language Tech", rating: 5 },
      ],
      gaps: ["Research not commercialized locally", "Talent pipeline flows to Google", "Limited local startup impact"],
      bridgeOpportunity: "Research partnership for AI applications in portfolio",
    },
  ],

  policyAlignment: [
    {
      policy: "Proposed $50M Fintech Fund",
      allocation: "$50M (proposed)",
      alignment: "Co-investment partner for fintech portfolio ventures",
    },
    {
      policy: "Ghana Innovation & Startup Act",
      allocation: "Tax holidays + Fund",
      alignment: "Policy framework enabling startup portfolio investments",
    },
    {
      policy: "Digital Infrastructure (4,400 sites)",
      allocation: "EUR 310M",
      alignment: "Connectivity foundation for platform ventures",
    },
    {
      policy: "National AI Strategy",
      allocation: "Multi-year commitment",
      alignment: "AI/ML applications across portfolio sectors",
    },
  ],

  crossSector: [
    {
      sectorId: 2,
      name: "Financial Inclusion",
      connection: "Fintech portfolio, mobile money integration, digital credit scoring",
    },
    { sectorId: 6, name: "Agriculture", connection: "Kejetia platform, agtech investments, market digitization" },
    {
      sectorId: 5,
      name: "Education & Skills",
      connection: "Digital apprenticeships, talent pipeline, skills training",
    },
    { sectorId: 1, name: "Infrastructure", connection: "IoT integration, smart sensors, digital payments" },
    { sectorId: 3, name: "Health Systems", connection: "Healthtech investments, telemedicine infrastructure" },
  ],

  relatedSectors: [
    { id: 2, name: "Financial Inclusion", icon: "wallet", reason: "Fintech portfolio, digital payments" },
    { id: 6, name: "Agriculture", icon: "seed", reason: "Kejetia platform, agtech ventures" },
    { id: 5, name: "Education & Skills", icon: "graduation", reason: "Digital skills, talent pipeline" },
  ],
};

// ============================================================================
// PROCESS WIDGET DATA & COLORS
// ============================================================================

const PC = {
  primaryMid: "#245A4A",
  accentSoft: "rgba(184,217,53,0.12)",
  accentBorder: "rgba(184,217,53,0.35)",
  card: "#F6F8F5",
  border: "#D9DDD6",
  borderLight: "#E8EBE6",
  text: "#1A2B25",
  textMid: "#3D5A50",
  textLight: "#6B7F78",
  muted: "#94A3B8",
  red: "#E85D5D",
  redSoft: "rgba(232,93,93,0.08)",
  redBorder: "rgba(232,93,93,0.18)",
};

const processStages = [
  {
    id: 0,
    label: "Infrastructure",
    sub: "Telecoms & ISPs",
    icon: "wifi",
    headline: "38.3M mobile connections — 10.4M still offline, 4G at just 15% utilization.",
    valueFlow: 100,
    metrics: [
      { label: "Internet Penetration", value: "69.9%", delta: "+4.2%" },
      { label: "4G Coverage", value: "60%+", delta: null },
      { label: "Active 4G Usage", value: "~15%", delta: "Underutilized" },
      { label: "Urban vs Rural Gap", value: "80% / 28%", delta: null },
    ],
    frictions: [
      "10.4M citizens still without internet access",
      "Fixed broadband at <0.7% — greenfield market",
      "4G utilization at only 15% despite coverage",
      "Affordability gap for bottom-of-pyramid users",
    ],
    response: "Platform design for low-bandwidth, mobile-first access",
    keyFigure: "10.4M",
    keyLabel: "citizens ready to connect",
  },
  {
    id: 1,
    label: "Talent",
    sub: "Universities & Bootcamps",
    icon: "grad",
    headline: "100K+ in tech training, but curriculum gaps and a 5–10× salary bridge drive talent abroad.",
    valueFlow: 75,
    metrics: [
      { label: "ALX Enrolled", value: "100K+", delta: "Scaling" },
      { label: "Girls in ICT", value: "5,000/yr", delta: "+Growing" },
      { label: "CS Graduates", value: "Growing", delta: null },
      { label: "Retention Potential", value: "High", delta: null },
    ],
    frictions: [
      "Curriculum-industry alignment gap persists",
      "Diaspora talent channels underdeveloped",
      "Women in STEM pipeline needs acceleration",
      "Training costs limit access at scale",
    ],
    response: "Digital Apprenticeship Pipeline + Tech Talent Bridge",
    keyFigure: "5–10×",
    keyLabel: "salary bridge to narrow",
  },
  {
    id: 2,
    label: "Innovation",
    sub: "Startups & Developers",
    icon: "bulb",
    headline: "100+ tech hubs, $68M deployed in 2024 — but founders leave to raise Series A.",
    valueFlow: 55,
    metrics: [
      { label: "2024 Funding", value: "$68M", delta: "+YoY" },
      { label: "Addressable Market", value: "$500M+", delta: null },
      { label: "Ecosystem Rank", value: "81st", delta: "Rising" },
      { label: "Fintech Share", value: "60%", delta: "Dominant" },
    ],
    frictions: [
      "Local fund structures needed for Series A",
      "Founder retention requires competitive terms",
      "Market sizing gaps across key verticals",
      "Regulatory sandbox active but underutilized",
    ],
    response: "BRIDGE Growth Fund — Seed to Series A ($200K–$2M)",
    keyFigure: "$68M",
    keyLabel: "deployed in 2024 — growing",
  },
  {
    id: 3,
    label: "Capital",
    sub: "Investors & Accelerators",
    icon: "chart",
    headline: "Fewer than 5 local VC funds in a $535M market. 99% of female founder capital undeployed.",
    valueFlow: 40,
    metrics: [
      { label: "Series A Local", value: "Greenfield", delta: "First-mover" },
      { label: "Female Founder Gap", value: "99%", delta: "Untapped" },
      { label: "Venture Debt Growth", value: "+431%", delta: "Surging" },
      { label: "Decade Total", value: "$535M", delta: null },
    ],
    frictions: [
      "First-mover opportunity in local Series A",
      "Female founder pool almost entirely untapped",
      "Patient capital models needed for context",
      "Deal flow fragmented across 100+ hubs",
    ],
    response: "Female Founder Accelerator + Diaspora Angel Syndicate",
    keyFigure: "99%",
    keyLabel: "of female founder capital yet to deploy",
  },
  {
    id: 4,
    label: "Adoption",
    sub: "SMEs & Informal Sector",
    icon: "users",
    headline: "23.4M MoMo users lead Africa — but products aren't built for informal sector reality.",
    valueFlow: 30,
    metrics: [
      { label: "MoMo Users", value: "23.4M", delta: "Leading" },
      { label: "Social Media", value: "7.95M", delta: null },
      { label: "Smartphone Penetration", value: "68%", delta: null },
      { label: "ICT GDP Contribution", value: "3.6%", delta: "Growing" },
    ],
    frictions: [
      "Trust requires culturally appropriate design",
      "Digital skills gap in the informal sector",
      "Products must fit real user contexts",
      "Cash-to-digital transition needs patience",
    ],
    response: "Kejetia Digital Platform — designed for informal sector reality",
    keyFigure: "23.4M",
    keyLabel: "MoMo users — Africa frontrunner",
  },
];

// Process Widget Icons
const processIcons = {
  wifi: (color) => <Wifi size={20} strokeWidth={1.8} color={color} />,
  grad: (color) => <GraduationCap size={20} strokeWidth={1.8} color={color} />,
  bulb: (color) => <Lightbulb size={20} strokeWidth={1.8} color={color} />,
  chart: (color) => <BarChart3 size={20} strokeWidth={1.8} color={color} />,
  users: (color) => <Users size={20} strokeWidth={1.8} color={color} />,
  checkSmall: <Check size={14} strokeWidth={2.5} />,
};

const PNODE_SIZE = 48;
const PNODE_CENTER = PNODE_SIZE / 2;

// ── Pipeline ──
const ProcessPipeline = ({ active, onSelect }) => (
  <div className="flex items-start justify-between relative px-[16px]">
    {processStages.map((s, i) => {
      const isActive = i === active;
      const isReached = i <= active;
      const iconFn = processIcons[s.icon];
      return (
        <div key={s.id} className="flex items-start flex-1 relative">
          {i > 0 && (
            <div
              className="absolute left-0 h-[2px] z-0 transition-colors duration-[400ms] ease-in-out"
              style={{
                top: PNODE_CENTER - 1,
                right: `calc(50% + ${PNODE_SIZE / 2 + 4}px)`,
                backgroundColor: isReached ? colors.accent : "transparent",
              }}
            />
          )}
          <div
            onClick={() => onSelect(i)}
            className="flex flex-col items-center cursor-pointer w-full relative z-[1]"
          >
            <div
              className="flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-none"
              style={{
                width: PNODE_SIZE,
                height: PNODE_SIZE,
                borderRadius: isActive ? 14 : 12,
                backgroundColor: isActive ? colors.primary : isReached ? colors.primary : colors.white,
                border: isActive || isReached ? "none" : `2px solid ${colors.primary}`,
              }}
            >
              {iconFn(isActive || isReached ? "#fff" : PC.textLight)}
            </div>
            <div className="text-center mt-[12px]">
              <div
                className="font-['DM_Sans',sans-serif] text-[13px] transition-all duration-300 ease-in-out"
                style={{
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? colors.primary : isReached ? PC.text : PC.textLight,
                }}
              >
                {s.label}
              </div>
              <div
                className="font-['DM_Sans',sans-serif] text-[11px] mt-[2px] transition-opacity duration-300 ease-in-out"
                style={{
                  color: PC.textLight,
                  opacity: isActive ? 1 : 0.5,
                }}
              >
                {s.sub}
              </div>
            </div>
            {isActive && (
              <div className="w-[6px] h-[6px] rounded-full mt-[8px]" style={{ backgroundColor: colors.accent }} />
            )}
          </div>
          {i < processStages.length - 1 && (
            <div
              className="absolute right-0 h-[2px] z-0 transition-colors duration-[400ms] ease-in-out"
              style={{
                top: PNODE_CENTER - 1,
                left: `calc(50% + ${PNODE_SIZE / 2 + 4}px)`,
                backgroundColor: i + 1 <= active ? colors.accent : "transparent",
              }}
            />
          )}
        </div>
      );
    })}
  </div>
);

// ── Metric Row ──
const ProcessMetricRow = ({ label, value, delta, isLast }) => (
  <div
    className="flex items-center justify-between py-[14px]"
    style={{ borderBottom: isLast ? "none" : `1px solid ${PC.borderLight}` }}
  >
    <span className="font-['DM_Sans',sans-serif] text-[13px]" style={{ color: PC.textLight }}>{label}</span>
    <div className="flex items-center gap-[10px]">
      {delta && (
        <span
          className="font-['JetBrains_Mono',monospace] text-[10px] font-semibold px-[8px] py-[3px] rounded-[4px]"
          style={{ color: colors.primary, backgroundColor: PC.accentSoft }}
        >
          {delta}
        </span>
      )}
      <span
        className="font-['JetBrains_Mono',monospace] text-[14px] font-semibold"
        style={{ color: PC.text }}
      >
        {value}
      </span>
    </div>
  </div>
);

// ── Card wrapper ──
const ProcessCard = ({ children, style = {} }) => (
  <div
    className="rounded-[16px]"
    style={{
      backgroundColor: PC.card,
      border: `2px solid ${colors.primary}`,
      ...style,
    }}
  >
    {children}
  </div>
);


const footerLinkHref = (link: string): string => {
  const map: Record<string, string> = {
    "About BRIDGE": "/about",
    "Our Approach": "/methodology",
    "Sectors": "/services",
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
  return map[link] || "#";
};

// ============================================================================
// PROBLEM SECTION
// ============================================================================

const problemSectionData = [
  {
    id: 1,
    title: "Growth Capital Opportunity",
    description:
      "200+ growth-stage startups are ready for Series A capital. Local fund structures can retain Ghana's most promising companies and capture the returns that currently flow abroad.",
    rootCauses: [
      { title: "Local Funds", description: "Structure for in-country capital" },
      { title: "Founder Terms", description: "Alignment with founder interests" },
      { title: "Track Records", description: "Building investable deal history" },
      { title: "Market Sizing", description: "Proving addressable market scale" },
    ],
    quantification: "$68M deployed in 2024 — $500M+ addressable",
    severity: "Critical",
    severityScore: 95,
    affectedCount: "200+",
    affectedLabel: "startups ready to scale",
    bridgeSolution: "BRIDGE Growth Fund — Technology Vertical",
  },
  {
    id: 2,
    title: "Rural Connectivity Frontier",
    description:
      "10.4 million Ghanaians represent the next wave of digital adoption — communities where connectivity unlocks mobile commerce, financial services, and platforms for the first time.",
    rootCauses: [
      { title: "Coverage Expansion", description: "Extending towers to rural areas" },
      { title: "Affordability Models", description: "Reducing cost per GB accessed" },
      { title: "Device Access", description: "Making smartphones widely available" },
      { title: "Digital Skills", description: "Training first-time internet users" },
    ],
    quantification: "10.4M citizens ready for first-time access",
    severity: "Critical",
    severityScore: 90,
    affectedCount: "10.4M",
    affectedLabel: "citizens to connect",
    bridgeSolution: "Digital Access + Platform Design for Inclusion",
  },
  {
    id: 3,
    title: "Talent Retention & Mobilization",
    description:
      "Thousands of world-class Ghanaian developers work globally — a salary gap that can be bridged through local opportunities, remote platforms, and diaspora reconnection pathways.",
    rootCauses: [
      { title: "Salary Bridging", description: "Narrowing the compensation gap" },
      { title: "Career Pathways", description: "Creating local growth trajectories" },
      { title: "Remote Platforms", description: "Enabling global work from Ghana" },
      { title: "Ecosystem Growth", description: "Building challenging local projects" },
    ],
    quantification: "1,000s of developers ready to mobilize",
    severity: "High",
    severityScore: 82,
    affectedCount: "1,000s",
    affectedLabel: "developers to mobilize",
    bridgeSolution: "Tech Talent Bridge + Digital Apprenticeship",
  },
  {
    id: 4,
    title: "Female Founder Potential",
    description:
      "Women represent Ghana's largest untapped founder pool. Dedicated accelerators, inclusive fund structures, and network-building unlock the capital pipeline that scales businesses.",
    rootCauses: [
      { title: "Inclusive Funds", description: "Dedicated capital for women founders" },
      { title: "Network Building", description: "Opening doors to deal flow" },
      { title: "STEM Pathways", description: "Growing the female tech pipeline" },
      { title: "Culture Shifting", description: "Expanding entrepreneurial access" },
    ],
    quantification: "99% of female founder capital yet to deploy",
    severity: "High",
    severityScore: 78,
    affectedCount: "<1%",
    affectedLabel: "founder potential untapped",
    bridgeSolution: "Female Founder Accelerator Program",
  },
];

const ProblemCard = ({ problem, isExpanded, onToggle }) => {
  const isMobile = useIsMobile();
  const isHighPriority = problem.severity === "Critical";
  const severityLabel = isHighPriority ? "High Priority" : "Strategic";
  const severityBg = isHighPriority ? colors.accentLight : "rgba(184,217,53,0.12)";
  const severityColor = isHighPriority ? colors.primary : "#5C7A1F";
  const barColor = isHighPriority ? colors.primary : "#5C7A1F";

  return (
    <div
      onClick={onToggle}
      className="cursor-pointer transition-all duration-300 ease-in-out flex flex-col"
      style={{
        backgroundColor: colors.white,
        borderRadius: isMobile ? "16px" : "20px",
        padding: isMobile ? "20px" : "28px",
        border: isExpanded ? `2px solid ${colors.accent}` : `1px solid ${colors.line}`,
      }}
    >
      {/* ZONE 1: Title Row + Description */}
      <div className="flex justify-between items-start mb-[10px]">
        <h3
          className="font-[Inter,sans-serif] font-semibold m-0 flex-1 min-w-0"
          style={{
            fontSize: isMobile ? "16px" : "18px",
            color: colors.dark,
          }}
        >
          {problem.title}
        </h3>
        <span
          className="inline-block rounded-[20px] text-[11px] font-bold uppercase tracking-[1px] font-[Inter,sans-serif] whitespace-nowrap shrink-0 ml-[12px] px-[14px] py-[6px]"
          style={{ backgroundColor: severityBg, color: severityColor }}
        >
          {severityLabel}
        </span>
      </div>

      <p
        className="font-[Inter,sans-serif] text-[#666] leading-[1.5] mt-0 mx-0 mb-[16px] overflow-hidden"
        style={{
          fontSize: isMobile ? "13px" : "14px",
          display: "-webkit-box",
          WebkitLineClamp: isMobile ? 2 : 3,
          WebkitBoxOrient: "vertical",
          minHeight: isMobile ? "auto" : "63px",
        }}
      >
        {problem.description}
      </p>

      {/* ZONE 2: Impact Bar */}
      <div
        className="rounded-[12px]"
        style={{
          backgroundColor: colors.accentLight,
          padding: isMobile ? "8px 12px" : "10px 16px",
          marginBottom: isExpanded ? "16px" : 0,
        }}
      >
        <span
          className="font-[Inter,sans-serif] font-semibold block overflow-hidden text-ellipsis whitespace-nowrap"
          style={{
            fontSize: isMobile ? "13px" : "14px",
            color: colors.primary,
          }}
        >
          Impact: {problem.quantification}
        </span>
      </div>

      {/* EXPANDED CONTENT */}
      {isExpanded && (
        <div className="pt-[16px]" style={{ borderTop: `1px solid ${colors.line}` }} onClick={(e) => e.stopPropagation()}>
          {/* ZONE 3: Priority + Scale */}
          <div
            className="grid gap-[12px] mb-[20px]"
            style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}
          >
            <div className="rounded-[12px] p-[14px]" style={{ backgroundColor: colors.background }}>
              <div className="flex justify-between items-center mb-[12px]">
                <span className="font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888]">
                  PRIORITY
                </span>
                <span
                  className="rounded-[20px] text-[12px] font-bold font-[Inter,sans-serif] px-[10px] py-[4px]"
                  style={{ backgroundColor: severityBg, color: severityColor }}
                >
                  {severityLabel}
                </span>
              </div>
              <div className="h-[8px] rounded-[4px] overflow-hidden" style={{ backgroundColor: colors.line }}>
                <div
                  className="h-full rounded-[4px] transition-[width] duration-500 ease-in-out"
                  style={{ width: `${problem.severityScore}%`, backgroundColor: barColor }}
                />
              </div>
            </div>

            <div className="rounded-[12px] p-[14px]" style={{ backgroundColor: colors.background }}>
              <span className="font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888] block mb-[8px]">
                SCALE
              </span>
              <div className="flex items-baseline gap-[6px]">
                <span
                  className="font-[Poppins,sans-serif] font-bold leading-none"
                  style={{
                    fontSize: isMobile ? "20px" : "24px",
                    color: colors.primary,
                  }}
                >
                  {problem.affectedCount}
                </span>
                <span className="font-[Inter,sans-serif] text-[13px] text-[#666]">
                  {problem.affectedLabel}
                </span>
              </div>
            </div>
          </div>

          {/* ZONE 4: Opportunity Drivers */}
          <div className="mb-[20px]">
            <div className="flex items-center gap-[8px] mb-[12px]">
              <Clock size={16} strokeWidth={2} color="#888" />
              <span className="font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888]">
                OPPORTUNITY DRIVERS
              </span>
            </div>
            <div
              className="grid gap-[10px]"
              style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}
            >
              {problem.rootCauses.map((cause, i) => (
                <div
                  key={i}
                  className="rounded-[12px] flex items-start gap-[10px]"
                  style={{
                    backgroundColor: colors.background,
                    padding: isMobile ? "10px 12px" : "12px 14px",
                  }}
                >
                  <div
                    className="w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <span
                      className="font-[Inter,sans-serif] text-[13px] font-semibold"
                      style={{ color: colors.white }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <div
                      className="font-[Inter,sans-serif] font-semibold mb-[2px]"
                      style={{
                        fontSize: isMobile ? "13px" : "14px",
                        color: colors.dark,
                      }}
                    >
                      {cause.title}
                    </div>
                    <div className="font-[Inter,sans-serif] text-[12px] text-[#888]">
                      {cause.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ZONE 5: BRIDGE Solution Footer */}
          <div
            className="pt-[16px] flex justify-between"
            style={{
              borderTop: `1px solid ${colors.line}`,
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "center",
              gap: isMobile ? "8px" : "16px",
            }}
          >
            <div className="flex items-center gap-[8px] min-w-0">
              <Check size={18} stroke={colors.accent} strokeWidth={2.5} style={{ flexShrink: 0 }} />
              <span className="font-[Inter,sans-serif] text-[13px] text-[#888] shrink-0">
                BRIDGE Solution:
              </span>
              <span
                className="font-[Inter,sans-serif] text-[14px] font-semibold overflow-hidden text-ellipsis whitespace-nowrap"
                style={{ color: colors.primary }}
              >
                {problem.bridgeSolution}
              </span>
            </div>
            <span
              className="font-[Inter,sans-serif] text-[13px] font-medium flex items-center gap-[4px] shrink-0 cursor-pointer"
              style={{ color: colors.primary }}
            >
              View{" "}
              <ArrowRight size={14} stroke={colors.primary} strokeWidth={2} />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const ProblemSection = () => {
  const isMobile = useIsMobile();
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section
      style={{
        backgroundColor: colors.background,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div className="text-left" style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-[24px] px-[20px] py-[10px]"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
            }}
          >
            The Opportunity
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[820px] mt-0 mx-0 mb-[20px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
            }}
          >
            $10B+ in Addressable <span style={{ color: colors.accent }} className="font-bold">Digital Potential</span>
          </h2>
          <p
            className="font-[Inter,sans-serif] text-[#666] max-w-[680px] m-0 leading-[1.65]"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
          >
            {isMobile
              ? "Tap each opportunity to explore what capital and innovation can unlock"
              : "Ghana's digital infrastructure has reached a tipping point — the foundation is built, the users are connected, and the market is ready. Click each opportunity to explore what capital and innovation can unlock"}
          </p>
        </div>

        <div
          style={
            isMobile
              ? {
                  display: "flex",
                  gap: "12px",
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  margin: "0 -20px",
                  padding: "0 20px 8px",
                }
              : {
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "24px",
                }
          }
        >
          {problemSectionData.map((problem) => (
            <div
              key={problem.id}
              className={cn(isMobile && "min-w-[85%] max-w-[85%] shrink-0 snap-start")}
            >
              <ProblemCard
                problem={problem}
                isExpanded={expandedId === problem.id}
                onToggle={() => setExpandedId(expandedId === problem.id ? null : problem.id)}
              />
            </div>
          ))}
        </div>
        {isMobile && (
          <div className="flex justify-center items-center gap-[6px] mt-[16px]">
            {problemSectionData.map((_, i) => (
              <div
                key={i}
                className="h-[8px] rounded-[4px] cursor-pointer transition-all duration-300 ease-in-out"
                style={{
                  width: i === 0 ? "24px" : "8px",
                  backgroundColor: i === 0 ? colors.accent : colors.line,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// ============================================================================
// PREMIUM VALUE CHAIN SECTION — TECH PLATFORM EDITION
// ============================================================================

const ValueChainSectionPremium = () => {
  const isMobile = useIsMobile();
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [showMoreChain, setShowMoreChain] = useState(false);
  const s = processStages[active];

  const go = (i) => {
    if (i !== active) {
      setActive(i);
      setAnimKey((k) => k + 1);
      setShowMoreChain(false);
    }
  };

  return (
    <section
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: isMobile ? "32px" : "64px" }}>
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-[24px] px-[20px] py-[10px]"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
            }}
          >
            The Process
          </span>

          <h2
            className="font-[Inter,sans-serif] font-light tracking-[-0.5px] leading-[1.2] max-w-[600px] mx-auto mt-0 mb-[20px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
            }}
          >
            From Infrastructure to <span style={{ color: colors.accent }} className="font-bold">Digital Impact</span>
          </h2>
          <p
            className="font-[Inter,sans-serif] text-[#666] max-w-[750px] mx-auto my-0 leading-[1.65]"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
          >
            {isMobile
              ? "Tap each stage to explore where strategic resources and innovation create compounding value across the technology value chain"
              : "Follow the value chain from infrastructure through market adoption — click each stage to explore where strategic resources and innovation create compounding value"}
          </p>
        </div>



        {/* Pipeline */}
        <div className="mb-[24px]">
          <ProcessPipeline active={active} onSelect={go} />
        </div>

        {/* Content */}
        <div key={animKey} style={{ animation: "procFadeIn .35s ease forwards" }}>
          <style>{`@keyframes procFadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>

          {/* TOP ROW */}
          <div
            className="grid gap-[16px] mb-[16px]"
            style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 360px" }}
          >
            {/* Stage headline + key stat */}
            <ProcessCard style={{ padding: "24px 28px", display: "flex", gap: 24 }}>
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex items-center gap-[10px] mb-[14px]">
                  <div
                    className="w-[36px] h-[36px] rounded-[10px] flex items-center justify-center shrink-0"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {processIcons[s.icon]("#fff")}
                  </div>
                  <div>
                    <div
                      className="font-['JetBrains_Mono',monospace] text-[10px] font-semibold tracking-[1.5px] uppercase"
                      style={{ color: PC.textLight }}
                    >
                      Stage 0{active + 1}
                    </div>
                    <div className="text-[16px] font-bold" style={{ color: PC.text }}>{s.label}</div>
                  </div>
                </div>
                <p className="text-[13px] leading-[1.55] m-0" style={{ color: PC.textMid }}>{s.headline}</p>
              </div>

              <div
                className="rounded-[14px] text-center shrink-0 min-w-[140px] self-start px-[24px] py-[20px]"
                style={{
                  backgroundColor: colors.white,
                  border: `1px solid ${PC.border}`,
                }}
              >
                <div
                  className="font-['JetBrains_Mono',monospace] text-[9px] font-semibold tracking-[1.5px] uppercase mb-[8px]"
                  style={{ color: PC.textLight }}
                >
                  Key indicator
                </div>
                <div
                  className="font-['Poppins',sans-serif] text-[28px] font-bold leading-none"
                  style={{ color: colors.primary }}
                >
                  {s.keyFigure}
                </div>
                <div className="text-[11px] mt-[6px] leading-[1.3]" style={{ color: PC.textLight }}>{s.keyLabel}</div>
              </div>
            </ProcessCard>

            {/* Progressive vertical bar chart — desktop only */}
            {!isMobile && (
              <div
                className="rounded-[16px] px-[28px] py-[24px] flex flex-col shadow-[0_4px_16px_rgba(27,77,62,0.2)]"
                style={{ backgroundColor: colors.primary }}
              >
                <div className="font-['JetBrains_Mono',monospace] text-[9px] font-semibold text-white/45 tracking-[1.5px] uppercase mb-[14px] text-center">
                  Value retained
                </div>

                <div className="flex-1 flex items-end justify-center gap-[10px] px-[4px]">
                  {processStages.map((st, i) => {
                    const isStageActive = i === active;
                    const isReached = i <= active;
                    const barPx = Math.round((st.valueFlow / 100) * 82);
                    return (
                      <div
                        key={st.id}
                        onClick={() => go(i)}
                        className="flex flex-col items-center gap-[6px] cursor-pointer flex-1 h-full justify-end"
                      >
                        <span
                          className="font-['JetBrains_Mono',monospace] text-[10px] font-bold transition-colors duration-300 ease-in-out min-h-[16px]"
                          style={{ color: isStageActive ? colors.accent : "transparent" }}
                        >
                          {st.valueFlow}%
                        </span>
                        <div
                          className="w-full max-w-[32px] rounded-[8px] bg-white/[0.07] border border-white/10 relative overflow-hidden transition-all duration-300 ease-in-out"
                          style={{ height: barPx }}
                        >
                          <div
                            className="absolute bottom-0 left-0 right-0 rounded-[7px] transition-[height] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                            style={{
                              height: isReached ? "100%" : "0%",
                              backgroundColor: isStageActive ? colors.accent : "rgba(184,217,53,0.4)",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* BOTTOM ROW — hidden behind show more on mobile */}
          {(!isMobile || showMoreChain) && (
            <div className="grid gap-[16px]" style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 360px" }}>
              {/* Frictions */}
              <ProcessCard style={{ padding: "28px 32px", display: "flex", flexDirection: "column" }}>
                <div className="flex items-center gap-[8px] mb-[20px]">
                  <div className="w-[8px] h-[8px] rounded-full" style={{ backgroundColor: PC.red }} />
                  <span
                    className="font-['JetBrains_Mono',monospace] text-[10px] font-semibold tracking-[1.5px] uppercase"
                    style={{ color: PC.textLight }}
                  >
                    Friction points
                  </span>
                </div>

                <div
                  className="grid gap-[10px] mb-[20px]"
                  style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}
                >
                  {s.frictions.map((f, i) => (
                    <div
                      key={i}
                      className="px-[16px] py-[14px] rounded-[10px]"
                      style={{
                        backgroundColor: i === 0 ? PC.redSoft : colors.white,
                        border: `1px solid ${i === 0 ? PC.redBorder : PC.borderLight}`,
                      }}
                    >
                      <span className="text-[13px] leading-[1.5]" style={{ color: PC.text }}>{f}</span>
                    </div>
                  ))}
                </div>

                <div
                  className="flex items-center gap-[12px] px-[20px] py-[16px] rounded-[12px] mt-auto"
                  style={{
                    backgroundColor: PC.accentSoft,
                    border: `1px solid ${PC.accentBorder}`,
                  }}
                >
                  <div
                    className="w-[28px] h-[28px] rounded-[8px] text-white flex items-center justify-center shrink-0"
                    style={{ backgroundColor: colors.primary }}
                  >
                    {processIcons.checkSmall}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div
                      className="font-['JetBrains_Mono',monospace] text-[9px] font-bold tracking-[1.5px] uppercase mb-[4px]"
                      style={{ color: colors.primary }}
                    >
                      BRIDGE response
                    </div>
                    <span
                      className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis block"
                      style={{
                        fontSize: isMobile ? 12 : 14,
                        color: PC.text,
                      }}
                    >
                      {s.response}
                    </span>
                  </div>
                </div>
              </ProcessCard>

              {/* Metrics */}
              <ProcessCard style={{ padding: "24px 28px", display: "flex", flexDirection: "column" }}>
                <div className="flex items-center justify-between mb-[8px]">
                  <span
                    className="font-['JetBrains_Mono',monospace] text-[10px] font-semibold tracking-[1.5px] uppercase"
                    style={{ color: PC.textLight }}
                  >
                    Metrics
                  </span>
                  <div className="w-[8px] h-[8px] rounded-full" style={{ backgroundColor: colors.accent }} />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  {s.metrics.map((m, i) => (
                    <ProcessMetricRow key={i} {...m} isLast={i === s.metrics.length - 1} />
                  ))}
                </div>
              </ProcessCard>
            </div>
          )}
          {isMobile && (
            <button
              onClick={() => setShowMoreChain(!showMoreChain)}
              className="flex items-center justify-center gap-[8px] w-full p-[14px] mt-[16px] bg-transparent rounded-[12px] font-[Inter,sans-serif] text-[14px] font-semibold cursor-pointer"
              style={{
                border: `1px solid ${colors.line}`,
                color: colors.primary,
              }}
            >
              {showMoreChain ? "Show less" : "Show friction points & metrics"}
              <ChevronDown size={14} strokeWidth={2.5} color={colors.primary} style={{ transform: showMoreChain ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// COMPETITIVE LANDSCAPE SECTION — Split-Panel Comparative Analysis
// ============================================================================

const RatingBar = ({ rating }) => (
  <div className="flex gap-[3px]">
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className="w-[16px] h-[6px] rounded-[3px]"
        style={{ backgroundColor: i <= rating ? colors.accent : colors.line }}
      />
    ))}
  </div>
);

const CompetitorAnalysisCard = ({ competitors, currentIndex, setCurrentIndex, hiddenNav }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const c = competitors[currentIndex];
  const total = competitors.length;

  const go = (dir) => {
    const next = dir === "prev" ? (currentIndex - 1 + total) % total : (currentIndex + 1) % total;
    setCurrentIndex(next);
    setIsExpanded(false);
  };

  return (
    <div
      className="rounded-[20px] p-[28px] flex flex-col"
      style={{
        backgroundColor: colors.white,
        border: `1px solid ${colors.line}`,
      }}
    >
      {/* Header: Name + Priority */}
      <div className="flex justify-between items-start mb-[12px]">
        <div>
          <h3
            className="font-[Inter,sans-serif] text-[18px] font-semibold m-0"
            style={{ color: colors.dark }}
          >
            {c.name}
          </h3>
        </div>
        <span
          className="rounded-[20px] text-[12px] font-bold font-[Inter,sans-serif] uppercase shrink-0 ml-[12px] px-[14px] py-[4px]"
          style={{
            backgroundColor: colors.accentLight,
            color: c.priority === "High" ? colors.primary : "#666",
          }}
        >
          {c.priority} Priority
        </span>
      </div>

      {/* Focus */}
      <p className="font-[Inter,sans-serif] text-[14px] text-[#666] leading-[1.5] mt-0 mx-0 mb-[20px]">
        {c.focus}
      </p>

      {/* Strengths label */}
      <div className="mb-[12px]">
        <span className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1px] text-[#888]">
          Strengths
        </span>
      </div>

      {/* Strength Rows */}
      <div className="flex flex-col gap-[10px]" style={{ marginBottom: isExpanded ? "20px" : "0" }}>
        {c.strengths.map((s, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="font-[Inter,sans-serif] text-[13px] text-[#666] min-w-[140px]">
              {s.name}
            </span>
            <RatingBar rating={s.rating} />
          </div>
        ))}
      </div>

      {/* Expanded */}
      {isExpanded && (
        <div className="pt-[20px]" style={{ borderTop: `1px solid ${colors.line}` }}>
          <span className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1px] text-[#888]">
            Where BRIDGE Helps
          </span>
          <div className="flex flex-col gap-[6px] mt-[10px] mb-[16px]">
            {c.gaps.map((gap, i) => (
              <div key={i} className="flex items-center gap-[8px]">
                <span className="text-[12px] shrink-0" style={{ color: colors.accent }}>●</span>
                <span className="font-[Inter,sans-serif] text-[13px] text-[#555]">{gap}</span>
              </div>
            ))}
          </div>

          <div
            className="rounded-[12px] px-[18px] py-[14px]"
            style={{
              backgroundColor: colors.accentLight,
              border: `1px solid ${colors.accent}`,
            }}
          >
            <div className="flex items-center gap-[8px] mb-[6px]">
              <span
                className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1px]"
                style={{ color: colors.primary }}
              >
                BRIDGE Opportunity
              </span>
            </div>
            <p
              className="font-[Inter,sans-serif] text-[13px] m-0 leading-[1.5]"
              style={{ color: colors.primary }}
            >
              {c.bridgeOpportunity}
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div
        className="flex justify-between items-center mt-[20px] pt-[16px]"
        style={{ borderTop: `1px solid ${colors.line}` }}
      >
        {!hiddenNav ? (
          <div className="flex items-center gap-[12px]">
            <button
              onClick={() => go("prev")}
              className="w-[32px] h-[32px] rounded-full flex items-center justify-center cursor-pointer"
              style={{
                border: `1px solid ${colors.line}`,
                backgroundColor: colors.white,
              }}
            >
              <ChevronLeft size={12} strokeWidth={2.5} color={colors.primary} />
            </button>
            <span className="font-[Inter,sans-serif] text-[13px] text-[#999]">
              {currentIndex + 1} / {total}
            </span>
            <button
              onClick={() => go("next")}
              className="w-[32px] h-[32px] rounded-full border-none flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: colors.primary }}
            >
              <ChevronRight size={12} strokeWidth={2.5} color={colors.white} />
            </button>
          </div>
        ) : (
          <div />
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-[6px] bg-transparent rounded-[8px] px-[16px] py-[8px] cursor-pointer font-[Inter,sans-serif] text-[13px] font-semibold"
          style={{
            border: `1px solid ${colors.line}`,
            color: colors.primary,
          }}
        >
          {isExpanded ? "Less" : "Analysis"}
          <ChevronDown size={12} strokeWidth={2.5} color={colors.primary} style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }} />
        </button>
      </div>
    </div>
  );
};

const CompetitiveLandscapeSection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [activeCompetitorIndex, setActiveCompetitorIndex] = useState(0);
  const [showMoreComp, setShowMoreComp] = useState(false);

  const positionData = [
    {
      headline: "Extends MEST's seed pipeline with growth-stage capital and sector depth",
      bullets: [
        { label: "Growth Capital", detail: "Seed → Series A bridge" },
        { label: "Sector Deployment", detail: "Vertical-specific ventures" },
        { label: "Deal Flow", detail: "Shared pipeline access" },
        { label: "Portfolio Support", detail: "Mentorship + market access" },
      ],
    },
    {
      headline: "Adds private capital deployment to government innovation infrastructure",
      bullets: [
        { label: "Capital Layer", detail: "Investment into lab graduates" },
        { label: "Commercialization", detail: "Research → market products" },
        { label: "Startup Sourcing", detail: "Hub → portfolio pipeline" },
        { label: "Sustainability", detail: "Revenue-backed operations" },
      ],
    },
    {
      headline: "Connects Impact Hub's global network to Ghana-specific tech ventures",
      bullets: [
        { label: "Tech Specialization", detail: "Focused venture support" },
        { label: "Event Partnership", detail: "Co-programmed showcases" },
        { label: "Enterprise Pipeline", detail: "Social → tech ventures" },
        { label: "Investor Access", detail: "Cross-network introductions" },
      ],
    },
    {
      headline: "Expands Kumasi innovation reach beyond agtech into digital services",
      bullets: [
        { label: "Sector Expansion", detail: "Agtech → fintech + health" },
        { label: "Regional Depth", detail: "Ashanti ecosystem growth" },
        { label: "Kejetia Link", detail: "Market → tech integration" },
        { label: "Talent Pipeline", detail: "Local training → placement" },
      ],
    },
    {
      headline: "Connects ALX graduates to Ghana-based ventures and employment",
      bullets: [
        { label: "Talent Pipeline", detail: "Training → portfolio jobs" },
        { label: "Retention Model", detail: "Local career pathways" },
        { label: "Apprenticeship", detail: "Structured work placement" },
        { label: "Curriculum Input", detail: "Market-aligned skills" },
      ],
    },
    {
      headline: "Commercializes Google's AI research through local startup applications",
      bullets: [
        { label: "Applied AI", detail: "Research → market products" },
        { label: "Local Deployment", detail: "Ghana-context solutions" },
        { label: "Talent Retention", detail: "Startup alternative path" },
        { label: "Language Tech", detail: "NLP for local languages" },
      ],
    },
  ];

  const shortNames = ["MEST Africa", "Ghana Tech Lab", "Impact Hub", "Kosmos Innov.", "ALX Africa", "Google Research"];
  const shortDescs = [
    "Training, investment and incubation for Pan-African startups",
    "Government-affiliated tech hub with AI and robotics focus",
    "Global coworking network with social enterprise acceleration",
    "Kumasi-based agtech and entrepreneur support center",
    "Tech skills training at continental scale via Sand Tech",
    "AI research lab in Accra with language technology focus",
  ];
  const vsLabels = ["MEST", "Ghana Tech Lab", "Impact Hub", "Kosmos", "ALX", "Google"];

  const handleCompetitorChange = (i) => {
    setActiveCompetitorIndex(i);
    setShowMoreComp(false);
  };

  const pos = positionData[activeCompetitorIndex];
  const activeComp = sector.competitors[activeCompetitorIndex];

  return (
    <section
      style={{
        backgroundColor: colors.background,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Header */}
        <div className="text-left" style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-[24px] px-[20px] py-[10px]"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
            }}
          >
            The Landscape
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] mt-0 mx-0 mb-[16px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
            }}
          >
            Building With Ghana's <span style={{ color: colors.accent }} className="font-bold">Digital Pioneers</span>
          </h2>
          <p
            className="font-[Inter,sans-serif] text-[#666] max-w-[750px] m-0 leading-[1.65]"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
          >
            MEST, Ghana Tech Lab, ALX Africa, and Google Research lead digital innovation. BRIDGE connects technology
            ventures to cross-sector demand — combining technical talent with market-ready deployment
          </p>
        </div>

        {/* Mobile: Horizontal scroll pills */}
        {isMobile && (
          <div
            className="flex gap-[8px] overflow-x-auto mx-[-20px] mb-[16px] px-[20px] pb-[4px]"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {sector.competitors.map((comp, i) => (
              <button
                key={i}
                onClick={() => handleCompetitorChange(i)}
                className="rounded-full text-[11px] font-[Inter,sans-serif] cursor-pointer whitespace-nowrap shrink-0 transition-all duration-200 ease-in-out px-[10px] py-[5px]"
                style={{
                  backgroundColor: i === activeCompetitorIndex ? colors.accentLight : colors.white,
                  color: i === activeCompetitorIndex ? colors.primary : "#999",
                  border: i === activeCompetitorIndex ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                  fontWeight: i === activeCompetitorIndex ? "700" : "500",
                }}
              >
                {comp.name}
              </button>
            ))}
          </div>
        )}

        {/* Main Grid: left / right */}
        <div
          className="grid items-stretch gap-[16px]"
          style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}
        >
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-[16px]">
            <CompetitorAnalysisCard
              competitors={sector.competitors}
              currentIndex={activeCompetitorIndex}
              setCurrentIndex={handleCompetitorChange}
              hiddenNav={isMobile}
            />

            {/* Mobile: "See BRIDGE's Position" toggle */}
            {isMobile && (
              <button
                onClick={() => setShowMoreComp(!showMoreComp)}
                className="w-full p-[14px] rounded-[12px] font-[Inter,sans-serif] text-[14px] font-semibold cursor-pointer flex items-center justify-center gap-[8px]"
                style={{
                  backgroundColor: showMoreComp ? "transparent" : colors.primary,
                  color: showMoreComp ? colors.primary : colors.white,
                  border: showMoreComp ? `1px solid ${colors.line}` : "none",
                }}
              >
                {showMoreComp ? "Show less" : "See BRIDGE's Position"}
                <ChevronDown size={14} strokeWidth={2.5} style={{ transform: showMoreComp ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }} />
              </button>
            )}

            {/* BRIDGE Position Card */}
            {(!isMobile || showMoreComp) && (
              <div
                className="flex-1"
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: isMobile ? "16px" : "20px",
                  padding: isMobile ? "20px" : "28px",
                }}
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-[14px]">
                  <span className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[2px] text-white/40">
                    BRIDGE's Position
                  </span>
                  <span
                    className="bg-[rgba(184,217,53,0.12)] rounded-[20px] text-[11px] font-bold font-[Inter,sans-serif] px-[12px] py-[4px]"
                    style={{ color: colors.accent }}
                  >
                    vs {vsLabels[activeCompetitorIndex]}
                  </span>
                </div>

                {/* Headline */}
                <h3
                  className="font-[Inter,sans-serif] text-[17px] font-semibold text-white leading-[1.4] mt-0 mx-0 mb-[20px]"
                  style={{ minHeight: isMobile ? "auto" : "48px" }}
                >
                  {pos.headline}
                </h3>

                {/* Bullet Items */}
                <div className="flex flex-col" style={{ gap: isMobile ? "8px" : "10px" }}>
                  {pos.bullets.map((b, i) => (
                    <div
                      key={i}
                      className="bg-white/[0.06] rounded-[12px] flex"
                      style={{
                        padding: isMobile ? "12px 14px" : "14px 16px",
                        alignItems: isMobile ? "flex-start" : "center",
                        gap: isMobile ? "8px" : "12px",
                        flexWrap: isMobile ? "wrap" : "nowrap",
                      }}
                    >
                      <span
                        className="w-[7px] h-[7px] rounded-full shrink-0"
                        style={{
                          backgroundColor: colors.accent,
                          marginTop: isMobile ? "5px" : 0,
                        }}
                      />
                      <span className="font-[Inter,sans-serif] text-[13px] font-semibold text-white">
                        {b.label}
                      </span>
                      <span className="font-[Inter,sans-serif] text-[13px] text-white/40">
                        {b.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Summary Card Grid (desktop only) */}
          {!isMobile && (
            <div className="grid grid-cols-2 grid-rows-3 gap-[16px]">
              {sector.competitors.map((comp, i) => {
                const isActive = i === activeCompetitorIndex;
                return (
                  <div
                    key={i}
                    onClick={() => handleCompetitorChange(i)}
                    className="rounded-[16px] p-[24px] cursor-pointer transition-all duration-200 ease-in-out flex flex-col"
                    style={{
                      backgroundColor: colors.white,
                      border: isActive ? `2px solid ${colors.primary}` : `1px solid ${colors.line}`,
                    }}
                  >
                    <div className="flex justify-between items-center mb-[8px]">
                      <span
                        className="font-[Inter,sans-serif] text-[16px] font-semibold whitespace-nowrap"
                        style={{ color: colors.dark }}
                      >
                        {shortNames[i]}
                      </span>
                      <span
                        className="rounded-[12px] text-[11px] font-semibold font-[Inter,sans-serif] shrink-0 ml-[12px] px-[10px] py-[3px]"
                        style={{
                          backgroundColor: colors.accentLight,
                          color: colors.primary,
                        }}
                      >
                        {comp.funding}
                      </span>
                    </div>

                    <p className="font-[Inter,sans-serif] text-[13px] text-[#888] leading-[1.45] mt-0 mx-0 mb-[12px]">
                      {shortDescs[i]}
                    </p>

                    <div
                      className="rounded-[10px] px-[14px] py-[10px]"
                      style={{ backgroundColor: colors.background }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-[Inter,sans-serif] text-[13px] font-medium text-[#555] whitespace-nowrap">
                          {comp.strengths[0].name}
                        </span>
                        <RatingBar rating={comp.strengths[0].rating} />
                      </div>
                    </div>

                    <div
                      className="mt-auto pt-[14px] flex justify-between items-center"
                      style={{ borderTop: `1px solid ${colors.line}`, marginBlockStart: "14px" }}
                    >
                      <span className="font-[Inter,sans-serif] text-[12px] text-[#ccc]">
                        Est. {comp.year}
                      </span>
                      <span
                        className="font-[Inter,sans-serif] text-[11px] font-semibold opacity-60"
                        style={{ color: comp.priority === "High" ? colors.primary : "#999" }}
                      >
                        {comp.priority}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// GOVERNANCE & POLICY SECTION — Horizontal Scrollable Card Widget
// ============================================================================

const techPolicies = [
  {
    policy: "Proposed $50M Fintech Fund",
    body: "Bank of Ghana / Mahama Administration",
    allocation: "$50M Proposed",
    category: "funding",
    relevance: ["digital"],
    alignment:
      "Dedicated government-backed fund targeting fintech startups building credit scoring, mobile lending, insurance, and payment infrastructure",
    bridgeRole:
      "Co-investment partner for fintech portfolio ventures — BRIDGE provides deal sourcing, due diligence, and venture support alongside government capital",
    bridgeVentures: ["Fintech Growth Portfolio", "BRIDGE Growth Fund"],
    pillars: ["Fintech Innovation", "MSME Access", "Digital Payments"],
  },
  {
    policy: "Youth Enterprise Support Fund",
    body: "Ministry of Youth & Sports / NBSSI",
    allocation: "$25M Allocated",
    category: "funding",
    relevance: ["digital"],
    alignment:
      "Dedicated funding stream for youth-led enterprises with priority tracks for digital businesses and technology startups",
    bridgeRole:
      "BRIDGE accelerator graduates gain access to government-backed growth capital — creating a seamless pipeline from training through funding to market entry",
    bridgeVentures: ["Female Founder Accelerator", "Digital Apprentice Pipeline"],
    pillars: ["Youth Employment", "Startup Capital", "Digital Skills"],
  },
  {
    policy: "Ghana EXIM Bank Tech Export Fund",
    body: "Ghana Export-Import Bank",
    allocation: "$15M Credit Line",
    category: "funding",
    relevance: ["digital"],
    alignment:
      "Credit facility supporting Ghanaian tech companies expanding to regional markets across ECOWAS and broader Africa",
    bridgeRole:
      "BRIDGE portfolio companies access export credit for cross-border expansion — enabling Kejetia platform and fintech products to scale regionally",
    bridgeVentures: ["BRIDGE Growth Fund", "Kejetia Digital Platform"],
    pillars: ["Regional Expansion", "Tech Exports", "AfCFTA Alignment"],
  },
  {
    policy: "Ghana Innovation & Startup Act",
    body: "Ministry of Communications & Digitalisation",
    allocation: "Tax Holidays + Fund",
    category: "tax",
    relevance: ["digital"],
    alignment:
      "Landmark legislation creating regulatory sandbox, tax incentives for certified startups, and national innovation fund",
    bridgeRole:
      "BRIDGE ventures benefit directly from startup tax holidays and sandbox provisions — reducing barriers for portfolio companies while accelerating market entry",
    bridgeVentures: ["BRIDGE Growth Fund", "Female Founder Accelerator", "Innovation Advisory Service"],
    pillars: ["Tax Relief", "Simplified Registration", "Innovation Fund"],
  },
  {
    policy: "E-Levy Reform",
    body: "Ministry of Finance / GRA",
    allocation: "Rate Reduction",
    category: "tax",
    relevance: ["digital"],
    alignment:
      "Expected rollback or modification of the electronic levy on digital transactions to reduce friction for digital economy growth",
    bridgeRole:
      "Lower transaction costs directly improve unit economics for every BRIDGE fintech and digital platform venture — expanding addressable user base and transaction volume",
    bridgeVentures: ["Fintech Growth Portfolio", "Kejetia Digital Platform", "Market Platform Expansion"],
    pillars: ["Transaction Cost Reduction", "Digital Economy Enablement"],
  },
  {
    policy: "Free Zones Tech Incentives",
    body: "Ghana Free Zones Authority",
    allocation: "Tax Exemptions",
    category: "tax",
    relevance: ["digital"],
    alignment:
      "Extended Free Zones benefits for technology companies including 10-year corporate tax holidays and duty-free equipment imports for qualifying digital enterprises",
    bridgeRole:
      "BRIDGE portfolio companies in Accra Digital Centre and partner hubs leverage Free Zones status to reduce operational costs during critical growth phases",
    bridgeVentures: ["Hub Partnership Network", "BRIDGE Growth Fund", "Innovation Advisory Service"],
    pillars: ["Corporate Tax Holiday", "Duty-Free Imports", "Digital Free Zones"],
  },
  {
    policy: "Digital Infrastructure Expansion",
    body: "National IT Agency (NITA) / NGIC",
    allocation: "€310M / 4,400 Sites",
    category: "infrastructure",
    relevance: ["infrastructure"],
    alignment:
      "4,400 new telecom sites for 4G/5G deployment targeting 80% 4G penetration by 2028 and closing the urban-rural digital divide",
    bridgeRole:
      "Connectivity is the foundation layer for every BRIDGE technology venture — as infrastructure expands, platform ventures gain access to 10.4M previously offline Ghanaians",
    bridgeVentures: ["Kejetia Digital Platform", "Market Platform Expansion"],
    pillars: ["4G/5G Rollout", "Rural Connectivity", "Broadband Targets"],
  },
  {
    policy: "Ghana Digital Centres Program",
    body: "Ministry of Communications & Digitalisation",
    allocation: "$2.6M Expansion",
    category: "infrastructure",
    relevance: ["infrastructure"],
    alignment:
      "Government-supported innovation spaces including Accra Digital Centre flagship with $2.6M commitment for two additional regional centres",
    bridgeRole:
      "Hub Partnership Network connects BRIDGE portfolio companies to government-backed co-working infrastructure — providing physical space, talent access, and ecosystem integration",
    bridgeVentures: ["Hub Partnership Network", "Digital Apprentice Pipeline"],
    pillars: ["Accra Digital Centre", "Regional Hubs", "Training Integration"],
  },
  {
    policy: "National Data Centre Initiative",
    body: "National IT Agency (NITA)",
    allocation: "$8M Phase 1",
    category: "infrastructure",
    relevance: ["infrastructure"],
    alignment:
      "Sovereign cloud and data hosting infrastructure reducing dependency on offshore servers, cutting latency, and enabling data residency compliance for local platforms",
    bridgeRole:
      "BRIDGE fintech and market platform ventures gain local hosting options with lower latency and regulatory compliance — critical for payment processing and vendor data",
    bridgeVentures: ["Kejetia Digital Platform", "Fintech Growth Portfolio"],
    pillars: ["Data Sovereignty", "Cloud Infrastructure", "Latency Reduction"],
  },
  {
    policy: "National AI Strategy",
    body: "Ghana Investment Promotion Centre",
    allocation: "Multi-Year Priority",
    category: "partnerships",
    relevance: ["digital"],
    alignment:
      "Comprehensive strategy positioning Ghana as regional AI hub with ethics frameworks, workforce development, and sector-specific pilot programs",
    bridgeRole:
      "BRIDGE portfolio companies in HealthTech, AgTech, and EdTech deploy AI/ML solutions aligning with national pilot programs — creating a pipeline from government strategy to products",
    bridgeVentures: ["BRIDGE Growth Fund", "Digital Apprentice Pipeline", "Hub Partnership Network"],
    pillars: ["One Million Coders", "AI Ethics Framework", "Sector Pilots"],
  },
  {
    policy: "GIZ FAIR Forward / Make-IT",
    body: "German Development Cooperation",
    allocation: "Technical Assistance",
    category: "partnerships",
    relevance: ["digital"],
    alignment:
      "AI accelerator through Ghana Tech Lab partnership promoting responsible AI development, digital literacy for 22,000+ trainees, and ethical AI governance",
    bridgeRole:
      "BRIDGE connects GIZ-trained talent and AI research outputs to commercial ventures — bridging the gap between development programs and market-ready products",
    bridgeVentures: ["Tech Talent Bridge Program", "Digital Apprentice Pipeline", "Innovation Advisory Service"],
    pillars: ["AI Governance", "Digital Literacy", "Responsible Innovation"],
  },
  {
    policy: "World Bank Digital Economy Project",
    body: "World Bank / Ministry of Finance",
    allocation: "$200M IDA Credit",
    category: "partnerships",
    relevance: ["digital"],
    alignment:
      "Multi-year program strengthening Ghana's digital foundations — broadband access, digital financial services, and government technology modernization",
    bridgeRole:
      "BRIDGE ventures operate in sectors directly targeted by World Bank investments — market digitization, fintech inclusion, and skills development create natural alignment for co-implementation",
    bridgeVentures: ["Kejetia Digital Platform", "Fintech Growth Portfolio", "Digital Apprentice Pipeline"],
    pillars: ["Broadband Access", "Digital Financial Services", "GovTech Modernization"],
  },
];
// ============================================================================
// CROSS-SECTOR / RIPPLE EFFECT SECTION
// ============================================================================

const crossSectorIcons = {
  2: <IconWallet />,
  6: <Sprout size={24} strokeWidth={1.5} />,
  5: <GraduationCap size={24} strokeWidth={1.5} />,
  1: <Blocks size={24} strokeWidth={1.5} />,
  3: <IconCross />,
};

const ripplePathways = [
  {
    sectorId: 2,
    name: "Financial Inclusion",
    connection: "Fintech portfolio, mobile money integration, digital credit scoring",
    multiplier: "3.2×",
    synergies: [
      "Fintech venture co-investment pipeline",
      "Kejetia platform as financial product distribution",
      "Transaction data enabling alternative credit scoring",
    ],
    bridgeVentures: ["Fintech Growth Portfolio", "Market Financial Services"],
    impact:
      "Technology platforms create the rails for digital financial services — every vendor digitized becomes a potential borrower, saver, and insurance customer.",
    pathLabel: "Technology → Digital Payment Rails → Financial Access",
  },
  {
    sectorId: 3,
    name: "Health Systems",
    connection: "Healthtech investments, telemedicine infrastructure, data systems",
    multiplier: "2.8×",
    synergies: [
      "Telemedicine platforms extending specialist reach",
      "AI diagnostics deployed through portfolio companies",
      "Health data systems built on digital infrastructure",
    ],
    bridgeVentures: ["HealthTech Portfolio", "Telemedicine Platform"],
    impact:
      "Digital infrastructure enables remote diagnostics and AI triage, extending healthcare access to communities where the doctor-to-patient ratio is 1:6,355.",
    pathLabel: "Technology → Digital Health Platforms → Care Access",
  },
  {
    sectorId: 6,
    name: "Agriculture",
    connection: "Kejetia platform, agtech investments, market digitization",
    multiplier: "3.5×",
    synergies: [
      "Kejetia market digitization serving 10,000+ vendors",
      "Agtech startups connecting farmers to markets",
      "Supply chain tracking reducing post-harvest losses",
    ],
    bridgeVentures: ["Kejetia Digital Platform", "AgTech Supply Chain"],
    impact:
      "The Kejetia platform is both a technology venture and an agriculture enabler — digitizing West Africa's largest market unlocks transparent pricing and reduces 30–40% post-harvest losses.",
    pathLabel: "Technology → Market Platforms → Agricultural Value",
  },
  {
    sectorId: 1,
    name: "Infrastructure",
    connection: "IoT integration, smart sensors, digital payments for services",
    multiplier: "2.4×",
    synergies: [
      "IoT sensors for water and sanitation monitoring",
      "Digital payment systems for infrastructure services",
      "Data analytics informing investment priorities",
    ],
    bridgeVentures: ["Smart Infrastructure IoT", "Digital Service Payments"],
    impact:
      "Connected sensors and digital payment layers transform static infrastructure into intelligent systems — water kiosks that report usage, markets that optimize energy, roads that predict maintenance.",
    pathLabel: "Technology → IoT & Sensors → Smart Infrastructure",
  },
  {
    sectorId: 5,
    name: "Education & Skills",
    connection: "Digital apprenticeships, talent pipeline, edtech platforms",
    multiplier: "4.1×",
    synergies: [
      "Apprenticeship pipeline feeding portfolio companies",
      "EdTech platforms scaling skills training nationally",
      "Hub partnerships coordinating 100+ training centers",
    ],
    bridgeVentures: ["Digital Apprentice Pipeline", "EdTech Platforms"],
    impact:
      "Every technology venture needs talent. The apprenticeship pipeline, hub partnerships, and EdTech platforms create a self-reinforcing cycle where companies grow the workforce that grows companies.",
    pathLabel: "Technology → Skills Platforms → Workforce Pipeline",
  },
];

const CrossSectorSection = () => {
  const isMobile = useIsMobile();
  const [activeNode, setActiveNode] = useState(null);
  const [showMoreRipple, setShowMoreRipple] = useState(false);
  const shortNames = ["Financial", "Health", "Agri", "Infra", "Education"];

  const pathways = ripplePathways.map((p, i) => ({
    ...p,
    icon: crossSectorIcons[p.sectorId],
  }));

  const active = activeNode !== null ? pathways[activeNode] : null;

  return (
    <section
      style={{
        backgroundColor: colors.primary,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Header */}
        <div className="text-center" style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="inline-block bg-white/[0.08] border border-white/15 rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-[24px] px-[20px] py-[10px]"
            style={{ color: colors.accent }}
          >
            The Ripple Effect
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] text-white max-w-[820px] mx-auto mt-0 mb-[20px]"
            style={{ fontSize: isMobile ? "28px" : "42px" }}
          >
            How Technology <span style={{ color: colors.accent }} className="font-bold">Amplifies Impact</span>
          </h2>
          <p className="font-[Inter,sans-serif] text-[16px] text-white/60 max-w-[680px] mx-auto my-0 leading-[1.65]">
            Every technology venture creates compounding value across BRIDGE's portfolio — explore how one investment
            becomes many
          </p>
        </div>

        {/* ─── PATHWAY VISUAL ─── */}
        {isMobile ? (
          /* Mobile: Hub on top, 5 icons below */
          <div className="mb-[24px]">
            <div className="flex justify-center mb-[16px]">
              <div className="flex flex-col items-center">
                <div
                  className="w-[56px] h-[56px] rounded-[14px] flex items-center justify-center shadow-[0_0_24px_rgba(184,217,53,0.3)] mb-[6px]"
                  style={{ backgroundColor: colors.accent, color: colors.primary }}
                >
                  <IconCpu />
                </div>
                <span
                  className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[0.5px]"
                  style={{ color: colors.accent }}
                >
                  Technology
                </span>
              </div>
            </div>
            <div className="flex justify-center gap-[12px]">
              {pathways.map((p, i) => {
                const isActive = activeNode === i;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveNode(isActive ? null : i);
                      setShowMoreRipple(false);
                    }}
                    className="flex flex-col items-center gap-[4px] bg-none border-none cursor-pointer p-[4px] transition-all duration-300 ease-in-out"
                    style={{ opacity: activeNode !== null && !isActive ? 0.4 : 1 }}
                  >
                    <div
                      className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center transition-all duration-300 ease-in-out"
                      style={{
                        backgroundColor: isActive ? colors.accent : "rgba(255,255,255,0.08)",
                        border: isActive ? "none" : "1px solid rgba(255,255,255,0.1)",
                        color: isActive ? colors.primary : "rgba(255,255,255,0.6)",
                      }}
                    >
                      {p.icon}
                    </div>
                    <span
                      className="font-[Inter,sans-serif] text-[10px] font-semibold max-w-[58px] leading-[1.2] text-center"
                      style={{ color: isActive ? colors.white : "rgba(255,255,255,0.5)" }}
                    >
                      {shortNames[i]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Desktop: Horizontal row */
          <div className="flex items-start justify-center gap-[32px] mb-[48px]">
            {/* Hub Icon — Technology */}
            <div className="flex flex-col items-center w-[120px] shrink-0">
              <div
                className="w-[80px] h-[80px] rounded-[20px] flex items-center justify-center shadow-[0_0_30px_rgba(184,217,53,0.3)] mb-[10px]"
                style={{ backgroundColor: colors.accent, color: colors.primary }}
              >
                <IconCpu />
              </div>
            </div>

            {/* 5 Connected Sector Nodes */}
            {pathways.map((p, i) => {
              const isActive = activeNode === i;
              const isDimmed = activeNode !== null && activeNode !== i;
              return (
                <div
                  key={i}
                  onClick={() => setActiveNode(isActive ? null : i)}
                  className="flex flex-col items-center w-[120px] cursor-pointer transition-all duration-300 ease-in-out"
                  style={{ opacity: isDimmed ? 0.4 : 1 }}
                >
                  <div
                    className="w-[56px] h-[56px] rounded-[16px] flex items-center justify-center transition-all duration-300 ease-in-out mb-[10px]"
                    style={{
                      backgroundColor: isActive ? colors.accent : "rgba(255,255,255,0.08)",
                      border: isActive ? "none" : "1px solid rgba(255,255,255,0.1)",
                      color: isActive ? colors.primary : "rgba(255,255,255,0.6)",
                    }}
                  >
                    {p.icon}
                  </div>
                  <span
                    className="font-[Inter,sans-serif] text-[13px] font-semibold text-center transition-all duration-300 ease-in-out"
                    style={{ color: isActive ? colors.white : "rgba(255,255,255,0.5)" }}
                  >
                    {p.name}
                  </span>
                  <span
                    className="font-[Poppins,sans-serif] text-[20px] font-bold mt-[4px] transition-all duration-300 ease-in-out"
                    style={{ color: isActive ? colors.accent : "rgba(255,255,255,0.3)" }}
                  >
                    {p.multiplier}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* DETAIL PANEL */}
        <div
          className="bg-white/[0.05] border border-white/[0.08] transition-all duration-300 ease-in-out"
          style={{
            borderRadius: isMobile ? "16px" : "24px",
            padding: isMobile ? "24px" : "40px",
            minHeight: isMobile ? "auto" : "280px",
          }}
        >
          {activeNode === null ? (
            /* ── Default ── */
            isMobile ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.5)",
                    margin: 0,
                  }}
                >
                  Tap a sector above to explore how technology amplifies its impact
                </p>
              </div>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: colors.white,
                    }}
                  >
                    Cross-Sector Integration Opportunities
                  </span>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    Click a sector above to explore
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: "16px",
                  }}
                >
                  {pathways.map((p, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveNode(i)}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.05)",
                        borderRadius: "16px",
                        padding: "24px 20px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "14px",
                          fontWeight: "600",
                          color: colors.white,
                          marginBottom: "8px",
                        }}
                      >
                        {p.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "rgba(255,255,255,0.45)",
                          height: "40px",
                          overflow: "hidden",
                          lineHeight: "1.4",
                          marginBottom: "12px",
                        }}
                      >
                        {p.connection}
                      </div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                        <span
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "18px",
                            fontWeight: "700",
                            color: colors.accent,
                          }}
                        >
                          {p.multiplier}
                        </span>
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "11px",
                            color: "rgba(255,255,255,0.4)",
                          }}
                        >
                          multiplier
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )
          ) : (
            /* ── Active: detailed view ── */
            <div>
              {/* Breadcrumb */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flexWrap: "wrap",
                  marginBottom: "28px",
                }}
              >
                {active.pathLabel.split(" → ").map((seg, i, arr) => (
                  <React.Fragment key={i}>
                    <span
                      style={{
                        padding: "6px 14px",
                        borderRadius: "8px",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        fontWeight: i === 0 ? "700" : "500",
                        color: i === 0 ? colors.accent : "rgba(255,255,255,0.7)",
                        backgroundColor: i === 0 ? "rgba(184, 217, 53, 0.15)" : "rgba(255,255,255,0.05)",
                      }}
                    >
                      {seg}
                    </span>
                    {i < arr.length - 1 && <span style={{ color: colors.accent, fontSize: "14px" }}>→</span>}
                  </React.Fragment>
                ))}
              </div>

              {/* 3-column grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                  gap: isMobile ? "24px" : "32px",
                }}
              >
                {/* Col 1: Why It Matters */}
                <div>
                  <h4
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: colors.accent,
                      margin: "0 0 16px 0",
                    }}
                  >
                    Why It Matters
                  </h4>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "15px",
                      color: "rgba(255,255,255,0.7)",
                      lineHeight: "1.6",
                      margin: "0 0 20px 0",
                    }}
                  >
                    {active.impact}
                  </p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "32px",
                        fontWeight: "700",
                        color: colors.accent,
                      }}
                    >
                      {active.multiplier}
                    </span>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.4)",
                      }}
                    >
                      value multiplier
                    </span>
                  </div>
                </div>

                {/* Col 2 & 3: Hidden behind show more on mobile */}
                {(!isMobile || showMoreRipple) && (
                  <>
                    {/* Col 2: Synergy Pathways */}
                    <div>
                      <h4
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "12px",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          color: colors.accent,
                          margin: "0 0 16px 0",
                        }}
                      >
                        Synergy Pathways
                      </h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {active.synergies.map((syn, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "12px",
                              padding: "12px 16px",
                              borderRadius: "10px",
                              backgroundColor: "rgba(255,255,255,0.05)",
                              border: "1px solid rgba(255,255,255,0.06)",
                            }}
                          >
                            <span style={{ color: colors.accent, fontSize: "8px", marginTop: "5px" }}>●</span>
                            <span
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "14px",
                                color: "rgba(255,255,255,0.75)",
                                lineHeight: "1.4",
                              }}
                            >
                              {syn}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Col 3: Linked Ventures */}
                    <div>
                      <h4
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "12px",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          color: colors.accent,
                          margin: "0 0 16px 0",
                        }}
                      >
                        Linked Ventures
                      </h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {active.bridgeVentures.map((v, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "14px 18px",
                              borderRadius: "12px",
                              backgroundColor: "rgba(184, 217, 53, 0.1)",
                              border: "1px solid rgba(184, 217, 53, 0.15)",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "14px",
                                fontWeight: "600",
                                color: colors.white,
                              }}
                            >
                              {v}
                            </span>
                            <span style={{ color: colors.accent, fontSize: "16px" }}>→</span>
                          </div>
                        ))}
                      </div>
                      <a
                        href="/services"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          marginTop: "20px",
                          fontFamily: "Inter, sans-serif",
                          fontSize: "14px",
                          fontWeight: "600",
                          color: colors.accent,
                          textDecoration: "none",
                        }}
                      >
                        Explore {active.name} Sector <span>→</span>
                      </a>
                    </div>
                  </>
                )}
              </div>
              {/* Mobile show more toggle for synergies/ventures */}
              {isMobile && (
                <button
                  onClick={() => setShowMoreRipple(!showMoreRipple)}
                  className="flex items-center justify-center gap-[8px] w-full p-[14px] mt-[16px] bg-transparent border border-white/15 rounded-[12px] font-[Inter,sans-serif] text-[14px] font-semibold text-white cursor-pointer"
                >
                  {showMoreRipple ? "Show less" : "Show synergies & ventures"}
                  <ChevronDown size={14} strokeWidth={2.5} color={colors.white} style={{ transform: showMoreRipple ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// INVESTMENT THESIS SECTION — Audience-Based Template
// ============================================================================

const InvestmentCTASection = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("returns");
  const [activeAudience, setActiveAudience] = useState(0);
  const [showInvestmentDetails, setShowInvestmentDetails] = useState(false);

  const tabs = [
    { key: "returns", label: "Returns" },
    { key: "timeline", label: "Timeline" },
    { key: "impact", label: "Impact" },
  ];

  const tabContent = {
    returns: [
      {
        label: "Tier 1 Ventures",
        value: "15-25%",
        detail: "Kejetia market digitization and fintech portfolio — platform economics with proven demand and revenue",
      },
      {
        label: "Tier 2 Ventures",
        value: "20-30%",
        detail: "AgTech supply chain and healthtech platforms — higher risk offset by sector-wide multiplier effects",
      },
      {
        label: "Portfolio IRR",
        value: "15-30%",
        detail: "Blended finance across 6 verticals with DFI co-investment reducing risk and extending runway",
      },
      {
        label: "Dev. Leverage",
        value: "4-7×",
        detail: "Every $1 deployed catalyzes $4-7 in local economic activity through platform network effects",
      },
    ],
    timeline: [
      {
        label: "Phase 1 (Q1-Q2)",
        value: "Foundation",
        detail: "Kejetia pilot with 500 vendors, fintech deal pipeline, accelerator cohort 1 launch across 3 hubs",
      },
      {
        label: "Phase 2 (Q3-Q4)",
        value: "Scale",
        detail: "Market platform to 5,000 vendors, first agtech and healthtech investments, talent pipeline active",
      },
      {
        label: "Phase 3 (2027+)",
        value: "Expansion",
        detail: "Replicate platform across 7 major markets, portfolio companies reaching Series A readiness",
      },
      {
        label: "Exit Horizon",
        value: "5-7 yrs",
        detail: "Staged liquidity through secondary sales, strategic acquisitions, and platform revenue maturity",
      },
    ],
    impact: [
      {
        label: "Vendors Digitized",
        value: "50,000+",
        detail: "Informal sector traders gaining inventory management, mobile payments, and business analytics",
      },
      {
        label: "Startups Scaled",
        value: "200+",
        detail: "Technology ventures receiving capital, mentorship, and market access through BRIDGE portfolio",
      },
      {
        label: "Jobs Created",
        value: "15,000+",
        detail: "Direct employment across portfolio companies plus indirect jobs through digital value chain growth",
      },
      {
        label: "MSME Credit",
        value: "$50M+",
        detail: "Previously unbanked businesses accessing formal credit through transaction-data scoring models",
      },
    ],
  };

  const audiences = [
    {
      key: "entrepreneur",
      label: "Entrepreneur",
      shortLabel: "Founder",
      icon: <IconStorefront />,
      headline: "Build Your Startup in Ghana, Not Despite It",
      pitch:
        "BRIDGE invests in founders solving real problems for real markets. From Kejetia digitization to fintech and healthtech, our portfolio companies get capital, mentorship, market access, and a platform ecosystem that turns local traction into continental scale.",
      stats: [
        { value: "17", label: "Venture Paths", detail: "across 6 verticals" },
        { value: "$10B+", label: "Market Access", detail: "addressable sectors" },
        { value: "Full", label: "BRIDGE Support", detail: "incubation to scale" },
      ],
      pathways: [
        {
          bring: "Technology solution & market insight",
          get: "Growth capital from $50K seed to $2M+ Series with milestone-based deployment",
        },
        {
          bring: "Local traction & customer validation",
          get: "Platform integration connecting your product to 10,000+ Kejetia vendors",
        },
        {
          bring: "Commitment to building in-country",
          get: "Structured mentorship from diaspora professionals and portfolio operators",
        },
      ],
    },
    {
      key: "business",
      label: "Business Entity",
      shortLabel: "Business",
      icon: <IconOfficeBuilding />,
      headline: "Partner with Ghana's Digital Transformation",
      pitch:
        "Corporate partners gain access to vetted deal flow, digital transformation pilots, and a talent pipeline trained for the Ghanaian market. BRIDGE creates structured entry points for banks, telcos, and tech companies seeking authentic West African market presence.",
      stats: [
        { value: "50+", label: "Partnerships", detail: "activated to date" },
        { value: "100+", label: "Tech Hub Links", detail: "coordinated network" },
        { value: "6", label: "Verticals Open", detail: "for co-development" },
      ],
      pathways: [
        {
          bring: "Distribution channels & market reach",
          get: "Vetted startup deal flow and digital transformation pilots across portfolio",
        },
        {
          bring: "Technical infrastructure & platforms",
          get: "Talent pipeline of apprenticeship graduates trained for enterprise deployment",
        },
        {
          bring: "Industry expertise & partnerships",
          get: "Data-driven market intelligence from Kejetia platform and portfolio analytics",
        },
      ],
    },
    {
      key: "investor",
      label: "Investor",
      shortLabel: "Investor",
      icon: <IconTrendingUp />,
      headline: "Diversified Returns, Measurable Impact",
      pitch:
        "A $21.5-54M portfolio spanning digital commerce, fintech, agtech, healthtech, edtech, and digital infrastructure. Each vertical is de-risked by platform economics, government alignment, and cross-sector multiplier effects that compound across BRIDGE's integrated model.",
      stats: [
        { value: "15-30%", label: "Target IRR", detail: "blended portfolio" },
        { value: "$10B+", label: "TAM Exposure", detail: "across 6 verticals" },
        { value: "4-7×", label: "Dev. Leverage", detail: "catalytic multiplier" },
      ],
      pathways: [
        {
          bring: "Growth-stage capital & patience",
          get: "Diversified portfolio across 6 technology verticals with DFI co-investment",
        },
        {
          bring: "Sector expertise & networks",
          get: "Measurable ESG outcomes with 15,000+ jobs and 50,000+ vendors digitized",
        },
        {
          bring: "Strategic co-investment capacity",
          get: "Platform economics ensuring recurring revenue with defensible market position",
        },
      ],
    },
    {
      key: "government",
      label: "Government",
      shortLabel: "Gov't",
      icon: <IconLandmark />,
      headline: "Private Sector Delivery, Public Benefit",
      pitch:
        "BRIDGE aligns with Ghana's Startup Act, digital transformation agenda, and 24-Hour Economy policy to create technology ventures that formalize the informal sector, generate tax revenue, and build the digital infrastructure the government has prioritized but struggles to deliver alone.",
      stats: [
        { value: "15K+", label: "Jobs Created", detail: "digital value chain" },
        { value: "50K+", label: "Vendors Formal", detail: "tax base expansion" },
        { value: "$50M+", label: "MSME Credit", detail: "financial inclusion" },
      ],
      pathways: [
        {
          bring: "Policy frameworks & market access",
          get: "Startup Act implementation through funded, operational tech ventures",
        },
        {
          bring: "Digital infrastructure investment",
          get: "Private sector delivery accelerating platform adoption across 7 markets",
        },
        {
          bring: "Public procurement channels",
          get: "Tax revenue from formalized informal sector plus measurable job creation data",
        },
      ],
    },
  ];

  const activeAudienceData = audiences[activeAudience];

  return (
    <section
      style={{
        backgroundColor: colors.background,
        padding: isMobile ? "60px 0" : "100px 80px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Section Header */}
        <div
          style={{
            textAlign: isMobile ? "center" : "left",
            marginBottom: isMobile ? "32px" : "48px",
            padding: isMobile ? "0 20px" : 0,
          }}
        >
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-[24px] px-[20px] py-[10px]"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
            }}
          >
            The Investment Thesis
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[820px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
              margin: isMobile ? "0 auto 16px" : "0 0 16px 0",
            }}
          >
            Every Stakeholder Has a Role in{" "}
            <span style={{ color: colors.accent }} className="font-bold">Digital Growth</span>
          </h2>
          <p
            className="font-[Inter,sans-serif] text-[16px] text-[#666] leading-[1.65] max-w-[700px]"
            style={{ margin: isMobile ? "0 auto" : "0" }}
          >
            Investment isn't only capital — it's expertise, partnerships, policy, and vision. See how your role
            contributes to 17 ventures across $21.5–54M in opportunity
          </p>
        </div>

        {/* ─── AUDIENCE SELECTOR ─── */}
        {isMobile ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "24px",
              padding: "0 20px",
            }}
          >
            {audiences.map((aud, idx) => {
              const isActive = activeAudience === idx;
              return (
                <button
                  key={aud.key}
                  onClick={() => setActiveAudience(idx)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    background: "none",
                    border: "none",
                    padding: "8px",
                    cursor: "pointer",
                    opacity: isActive ? 1 : 0.4,
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      backgroundColor: isActive ? colors.accentLight : colors.background,
                      border: isActive ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                      color: isActive ? colors.primary : colors.primary,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {aud.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      fontWeight: "600",
                      color: colors.primary,
                    }}
                  >
                    {aud.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "12px",
              marginBottom: "40px",
            }}
          >
            {audiences.map((aud, idx) => {
              const isActive = activeAudience === idx;
              return (
                <button
                  key={aud.key}
                  onClick={() => setActiveAudience(idx)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    borderRadius: "50px",
                    border: isActive ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                    backgroundColor: isActive ? colors.accentLight : colors.white,
                    color: isActive ? colors.primary : colors.primary,
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: isActive ? "700" : "500",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ display: "flex", color: colors.primary, transition: "all 0.25s ease" }}>
                    {aud.icon}
                  </span>
                  {aud.label}
                </button>
              );
            })}
          </div>
        )}

        {/* ─── MAIN CONTENT: 2-Column Grid ─── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "24px" : "48px",
            alignItems: "stretch",
            padding: isMobile ? "0 20px" : 0,
          }}
        >
          {/* LEFT COLUMN: Audience-Specific Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Headline — desktop only */}
            {!isMobile && (
              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "32px",
                  fontWeight: "300",
                  lineHeight: "1.25",
                  letterSpacing: "-0.3px",
                  color: colors.primary,
                  margin: "0 0 16px 0",
                }}
              >
                {activeAudienceData.headline}
              </h3>
            )}

            {/* Pitch — desktop only */}
            {!isMobile && (
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "15px",
                  color: "#555",
                  lineHeight: "1.7",
                  margin: "0 0 24px 0",
                  minHeight: "100px",
                }}
              >
                {activeAudienceData.pitch}
              </p>
            )}

            {/* Stat cards — 3 columns */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              {activeAudienceData.stats.map((stat, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: colors.white,
                    borderRadius: "12px",
                    padding: isMobile ? "16px 10px" : "18px 14px",
                    textAlign: "center",
                    border: `1px solid ${colors.line}`,
                    minHeight: isMobile ? "auto" : "110px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: isMobile ? "20px" : "26px",
                      fontWeight: "700",
                      color: colors.accent,
                      lineHeight: "1.1",
                      marginBottom: "4px",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: isMobile ? "11px" : "12px",
                      fontWeight: "600",
                      color: colors.primary,
                      marginBottom: "2px",
                    }}
                  >
                    {stat.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      color: "#888",
                    }}
                  >
                    {stat.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* Engagement Pathways */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: colors.primary,
                  marginBottom: "4px",
                  opacity: 0.5,
                }}
              >
                Your Engagement
              </div>
              {activeAudienceData.pathways.map((path, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "12px 16px",
                    backgroundColor: colors.white,
                    borderRadius: "10px",
                    border: `1px solid ${colors.line}`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        fontWeight: "600",
                        color: colors.primary,
                      }}
                    >
                      {path.bring}
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        color: "#777",
                        lineHeight: "1.5",
                      }}
                    >
                      {path.get}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Validation Bar */}
            <div
              style={{
                padding: "14px 18px",
                backgroundColor: "rgba(27, 77, 62, 0.06)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div style={{ flexShrink: 0, color: colors.primary }}>
                <IconCheck />
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  color: "#444",
                  lineHeight: "1.5",
                }}
              >
                <strong style={{ color: colors.primary }}>Ministry of Communications</strong> supporting Ghana's digital
                transformation
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Returns / Timeline / Impact Panel */}
          {(!isMobile || showInvestmentDetails) && (
            <div
              style={{
                backgroundColor: colors.primary,
                borderRadius: isMobile ? "16px" : "20px",
                padding: isMobile ? "20px" : "28px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Tab Selector */}
              <div
                style={{
                  display: "flex",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "4px",
                  marginBottom: "20px",
                  flexShrink: 0,
                }}
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    style={{
                      flex: 1,
                      backgroundColor: activeTab === tab.key ? colors.accent : "transparent",
                      color: activeTab === tab.key ? colors.primary : "rgba(255,255,255,0.5)",
                      border: "none",
                      padding: "12px 20px",
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontWeight: activeTab === tab.key ? "700" : "500",
                      fontFamily: "Inter, sans-serif",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content Cards */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  flex: 1,
                }}
              >
                {tabContent[activeTab].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderRadius: "12px",
                      padding: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      flex: 1,
                      minHeight: isMobile ? "auto" : "0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "18px",
                          fontWeight: "700",
                          color: colors.accent,
                          lineHeight: "1.1",
                          wordBreak: "break-word",
                          minWidth: 0,
                        }}
                      >
                        {item.value}
                      </div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "9px",
                          color: "rgba(255,255,255,0.35)",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          lineHeight: "1.3",
                        }}
                      >
                        {item.label}
                      </div>
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.7)",
                        lineHeight: "1.55",
                        borderTop: "1px solid rgba(255,255,255,0.1)",
                        paddingTop: "8px",
                      }}
                    >
                      {item.detail}
                    </div>
                  </div>
                ))}
              </div>

              {/* Prospectus Bar */}
              <div className="mt-[16px] px-[20px] py-[14px] bg-white/[0.05] rounded-[12px] flex justify-between items-center shrink-0">
                <span className="font-[Inter,sans-serif] text-[13px] text-white/45">
                  Full financial model available
                </span>
                <a
                  href="/resources"
                  className="font-[Inter,sans-serif] text-[14px] font-bold no-underline inline-flex items-center gap-[6px] shrink-0"
                  style={{ color: colors.accent }}
                >
                  Download Prospectus <span className="text-[16px]">→</span>
                </a>
              </div>
            </div>
          )}

          {/* Mobile Toggle Button */}
          {isMobile && !showInvestmentDetails && (
            <button
              onClick={() => setShowInvestmentDetails(true)}
              className="flex items-center justify-center gap-[8px] w-full p-[14px] bg-transparent rounded-[12px] font-[Inter,sans-serif] text-[14px] font-semibold cursor-pointer"
              style={{
                border: `1px solid ${colors.line}`,
                color: colors.primary,
              }}
            >
              View returns, timeline & impact
              <ChevronDown size={14} strokeWidth={2.5} color={colors.primary} />
            </button>
          )}
          {isMobile && showInvestmentDetails && (
            <button
              onClick={() => setShowInvestmentDetails(false)}
              className="flex items-center justify-center gap-[8px] w-full p-[14px] bg-transparent rounded-[12px] font-[Inter,sans-serif] text-[14px] font-semibold cursor-pointer"
              style={{
                border: `1px solid ${colors.line}`,
                color: colors.primary,
              }}
            >
              Show less
              <ChevronDown size={14} strokeWidth={2.5} color={colors.primary} style={{ transform: "rotate(180deg)" }} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// IMPACT SECTION — Dual-Lens Dashboard
// ============================================================================

const formatMetric = (count, item) => {
  const val = item.value;
  const hasDecimal = val !== Math.floor(val);
  let formatted;
  if (hasDecimal) {
    formatted = count.toFixed(1);
  } else if (val >= 1000) {
    formatted = Math.round(count).toLocaleString();
  } else {
    formatted = Math.round(count).toString();
  }
  return `${item.prefix}${formatted}${item.suffix}`;
};

const impactMetrics = [
  {
    category: "Economic",
    items: [
      {
        label: "Digital Economy Size",
        value: 4.8,
        suffix: "B",
        prefix: "$",
        description:
          "Ghana's growing digital economy poised for acceleration with infrastructure and capital deployment",
        trend: "+12% YoY",
        ventures: "All Ventures",
      },
      {
        label: "Startup Funding Gap",
        value: 50,
        suffix: "M+",
        prefix: "$",
        description:
          "Series A capital gap forcing relocations — BRIDGE fills the critical growth-stage investment desert",
        trend: "Critical",
        ventures: "BRIDGE Growth Fund · Fintech Portfolio",
      },
      {
        label: "Mobile Money Market",
        value: 192,
        suffix: "B",
        prefix: "$",
        description:
          "Annual transaction volume across 23.4M users creating infrastructure for digital financial products",
        trend: "Growing",
        ventures: "Fintech Growth Portfolio · Kejetia Platform",
      },
      {
        label: "Development Leverage",
        value: 3,
        suffix: "-5x",
        prefix: "",
        description: "Every dollar of BRIDGE capital unlocks additional development partner and government investment",
        trend: "Multiplier",
        ventures: "All Ventures",
      },
    ],
  },
  {
    category: "People",
    items: [
      {
        label: "Vendors Digitized",
        value: 10,
        suffix: "K+",
        prefix: "",
        description:
          "Market traders gaining digital tools for inventory, payments, and analytics across Kejetia and beyond",
        trend: "Target",
        ventures: "Kejetia Platform · Market Expansion",
      },
      {
        label: "Tech Jobs Created",
        value: 15,
        suffix: "K+",
        prefix: "",
        description:
          "Direct and indirect employment across the digital value chain from portfolio ventures and partnerships",
        trend: "Target",
        ventures: "All Ventures",
      },
      {
        label: "Youth Trained",
        value: 500,
        suffix: "+",
        prefix: "",
        description:
          "Graduates placed into portfolio companies through structured apprenticeship and mentorship programs",
        trend: "Near-term",
        ventures: "Digital Apprentice Pipeline · ALX",
      },
      {
        label: "Female Founders",
        value: 20,
        suffix: "+",
        prefix: "",
        description:
          "Women-led startups funded and scaling through dedicated accelerator addressing the <1% funding gap",
        trend: "High priority",
        ventures: "Female Founder Accelerator",
      },
    ],
  },
  {
    category: "Returns",
    items: [
      {
        label: "Portfolio IRR",
        value: 15,
        suffix: "-30%",
        prefix: "",
        description:
          "Target internal rate of return across blended portfolio of technology ventures and fund investments",
        trend: "Target range",
        ventures: "All Ventures",
      },
      {
        label: "Tier 1 Returns",
        value: 18,
        suffix: "-25%",
        prefix: "",
        description:
          "Priority venture returns from high-conviction investments with strongest market validation signals",
        trend: "High priority",
        ventures: "Kejetia Platform · Growth Fund",
      },
      {
        label: "First Revenue",
        value: 6,
        suffix: "-18mo",
        prefix: "",
        description: "Timeline to initial cash generation from operational ventures with established market demand",
        trend: "Near-term",
        ventures: "Kejetia Platform · Fintech Portfolio",
      },
      {
        label: "Capital Deployed",
        value: 15,
        suffix: "-22M",
        prefix: "$",
        description: "Total investment across technology sector portfolio spanning 9 ventures at various stages",
        trend: "Phased",
        ventures: "All Ventures",
      },
    ],
  },
];

const impactStakeholders = [
  {
    title: "The Entrepreneur",
    subtitle: "Developers, startups & digital creators",
    outcomes: [
      "Access to growth-stage capital without relocating abroad for funding",
      "Digital tools for inventory management, payments, and market analytics",
      "Structured mentorship via accelerator and diaspora bridge programs",
      "Market access through platform ecosystem and hub network integration",
    ],
    stat: "200+",
    statLabel: "ventures enabled",
    highlight: "Capital + market access without leaving Ghana",
  },
  {
    title: "The Institution",
    subtitle: "Corporates, banks & tech hubs",
    outcomes: [
      "Deal flow pipeline of vetted and growth-ready technology startups",
      "Digital transformation partnerships and co-development pilot programs",
      "Talent pipeline from structured apprenticeship and training programs",
      "Data-driven market intelligence from platform analytics and insights",
    ],
    stat: "50+",
    statLabel: "partnerships activated",
    highlight: "Vetted pipeline reduces partnership risk",
  },
  {
    title: "The Government",
    subtitle: "Ministries, agencies & district assemblies",
    outcomes: [
      "Startup Act implementation accelerated with private sector execution",
      "Digital infrastructure utilization driven by platform adoption at scale",
      "Tax revenue growth from formalized and scaling tech businesses",
      "Job creation measurably connected to the digital economy value chain",
    ],
    stat: "15,000+",
    statLabel: "jobs created",
    highlight: "Policy implementation without execution burden",
  },
  {
    title: "The Investor",
    subtitle: "Impact & institutional capital partners",
    outcomes: [
      "Diversified portfolio exposure across 6 technology vertical segments",
      "Measurable ESG and digital inclusion outcomes with clear frameworks",
      "Co-investment opportunity alongside active government capital programs",
      "Proven exit pathway indicators in a growing West African tech market",
    ],
    stat: "15-30%",
    statLabel: "target IRR",
    highlight: "Impact-aligned returns with government co-investment",
  },
];

const ImpactSection = () => {
  const isMobile = useIsMobile();
  const [view, setView] = useState("metrics");
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeStakeholder, setActiveStakeholder] = useState(0);
  const [animate, setAnimate] = useState(true);

  const triggerAnimate = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 50);
  };

  const switchView = (v) => {
    setView(v);
    triggerAnimate();
  };

  const switchCategory = (i) => {
    setActiveCategory(i);
    triggerAnimate();
  };

  const activeMetrics = impactMetrics[activeCategory];
  const activeStk = impactStakeholders[activeStakeholder];

  // Metric Row sub-component
  const MetricRow = ({ item, index }) => {
    const count = useCounter(item.value, 1200, animate);
    const isEven = index % 2 === 0;

    if (isMobile) {
      return (
        <div
          style={{
            padding: "20px",
            backgroundColor: isEven ? colors.white : "transparent",
            opacity: animate ? 1 : 0,
            transition: `opacity 0.4s ease ${index * 0.08}s`,
          }}
        >
          {/* Number + Trend row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <div
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "32px",
                fontWeight: "700",
                color: colors.primary,
                letterSpacing: "-1px",
                lineHeight: "1",
              }}
            >
              {formatMetric(count, item)}
            </div>
            <span
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "10px",
                fontWeight: "700",
                color: item.trend === "Critical" ? "#DC2626" : colors.accent,
                backgroundColor: item.trend === "Critical" ? "#FEE2E2" : "rgba(184,217,53,0.12)",
                padding: "3px 10px",
                borderRadius: "20px",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                flexShrink: 0,
              }}
            >
              {item.trend}
            </span>
          </div>
          {/* Ventures — full width */}
          <div
            style={{
              backgroundColor: isEven ? colors.background : "rgba(27,77,62,0.04)",
              borderRadius: "10px",
              padding: "8px 14px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "9px",
                fontWeight: "700",
                color: "#aaa",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "3px",
              }}
            >
              Ventures
            </div>
            <div
              style={{ fontFamily: "DM Sans, sans-serif", fontSize: "11px", fontWeight: "500", color: colors.primary }}
            >
              {item.ventures}
            </div>
          </div>
          {/* Label + Description */}
          <div
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "15px",
              fontWeight: "700",
              color: colors.primary,
              marginBottom: "4px",
            }}
          >
            {item.label}
          </div>
          <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: "#666", lineHeight: "1.5" }}>
            {item.description}
          </div>
        </div>
      );
    }

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "200px 1fr 200px",
          gap: "32px",
          padding: "24px 28px",
          backgroundColor: isEven ? colors.white : "transparent",
          opacity: animate ? 1 : 0,
          transition: `opacity 0.4s ease ${index * 0.08}s`,
        }}
      >
        {/* Column 1: Number */}
        <div>
          <div
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "36px",
              fontWeight: "700",
              color: colors.primary,
              letterSpacing: "-1px",
              lineHeight: "1",
            }}
          >
            {formatMetric(count, item)}
          </div>
          <span
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "10px",
              fontWeight: "700",
              color: colors.accent,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {item.trend}
          </span>
        </div>

        {/* Column 2: Label + Description */}
        <div>
          <div
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "15px",
              fontWeight: "700",
              color: colors.primary,
              marginBottom: "4px",
            }}
          >
            {item.label}
          </div>
          <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: "#666", lineHeight: "1.5" }}>
            {item.description}
          </div>
        </div>

        {/* Column 3: Linked Ventures */}
        <div
          style={{
            backgroundColor: isEven ? colors.background : "rgba(27,77,62,0.04)",
            borderRadius: "10px",
            padding: "10px 16px",
            alignSelf: "center",
          }}
        >
          <div
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "9px",
              fontWeight: "700",
              color: "#aaa",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "4px",
            }}
          >
            Linked Ventures
          </div>
          <div
            style={{ fontFamily: "DM Sans, sans-serif", fontSize: "11px", fontWeight: "500", color: colors.primary }}
          >
            {item.ventures}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="mb-[40px]">
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-['DM_Sans',sans-serif] mb-[24px] px-[20px] py-[10px]"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
            }}
          >
            The Impact
          </span>
          <h2
            className="font-['DM_Sans',sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[900px] mt-0 mx-0 mb-[12px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
            }}
          >
            What Changes When <span style={{ fontWeight: "600" }}>Digital</span>
            <br />
            <span style={{ fontWeight: "600" }}>Infrastructure</span>{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Works</span>
          </h2>
          <p
            className="font-['DM_Sans',sans-serif] text-[#555] max-w-[750px] m-0 leading-[1.7]"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
          >
            When startups scale locally, platforms serve Ghanaian needs, and digital skills reach every region — the
            ripple effects accelerate innovation, create high-value jobs, and position Ghana as a technology leader
            across West Africa
          </p>
        </div>

        {/* Controls Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
            flexWrap: isMobile ? "wrap" : "nowrap",
          }}
        >
          {/* View Toggle */}
          <div
            style={{
              display: "inline-flex",
              border: `1px solid ${colors.line}`,
              borderRadius: "50px",
              backgroundColor: colors.background,
              flexShrink: 0,
            }}
          >
            {["metrics", "stakeholder"].map((v) => (
              <button
                key={v}
                onClick={() => switchView(v)}
                style={{
                  padding: isMobile ? "5px 12px" : "6px 16px",
                  border: "none",
                  borderRadius: "50px",
                  backgroundColor: view === v ? colors.white : "transparent",
                  fontFamily: "Inter, sans-serif",
                  fontSize: isMobile ? "11px" : "12px",
                  fontWeight: view === v ? "700" : "500",
                  color: view === v ? colors.primary : "#999",
                  cursor: "pointer",
                  boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  transition: "all 0.2s ease",
                }}
              >
                {v === "metrics" ? (isMobile ? "Metric" : "By Metric") : isMobile ? "Stakeholder" : "By Stakeholder"}
              </button>
            ))}
          </div>

          {/* Vertical Divider */}
          {!isMobile && <div style={{ width: "1px", height: "24px", backgroundColor: colors.line }} />}

          {/* Sub-filters */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              overflowX: isMobile ? "auto" : "visible",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {view === "metrics"
              ? impactMetrics.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => switchCategory(i)}
                    style={{
                      padding: isMobile ? "5px 10px" : "6px 16px",
                      borderRadius: "50px",
                      backgroundColor: activeCategory === i ? colors.accentLight : "transparent",
                      border: activeCategory === i ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                      color: activeCategory === i ? colors.primary : "#999",
                      fontFamily: "Inter, sans-serif",
                      fontSize: isMobile ? "11px" : "12px",
                      fontWeight: activeCategory === i ? "700" : "500",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {cat.category}
                  </button>
                ))
              : impactStakeholders.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveStakeholder(i);
                      triggerAnimate();
                    }}
                    style={{
                      padding: isMobile ? "5px 10px" : "6px 16px",
                      borderRadius: "50px",
                      backgroundColor: activeStakeholder === i ? colors.accentLight : "transparent",
                      border: activeStakeholder === i ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                      color: activeStakeholder === i ? colors.primary : "#999",
                      fontFamily: "Inter, sans-serif",
                      fontSize: isMobile ? "11px" : "12px",
                      fontWeight: activeStakeholder === i ? "700" : "500",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {s.title.split(" ")[1]}
                  </button>
                ))}
          </div>
        </div>

        {/* ===== METRICS VIEW ===== */}
        {view === "metrics" && (
          <div
            className="rounded-[20px] overflow-hidden"
            style={{
              backgroundColor: colors.background,
              border: `2px solid ${colors.primary}`,
            }}
          >
            {activeMetrics.items.map((item, i) => (
              <MetricRow key={`${activeCategory}-${i}`} item={item} index={i} />
            ))}
          </div>
        )}

        {/* ===== STAKEHOLDER VIEW ===== */}
        {view === "stakeholder" && (
          <div className="transition-opacity duration-300 ease-in-out" style={{ opacity: animate ? 1 : 0 }}>
            {/* Title + Stat header */}
            <div
              className="flex justify-between mb-[24px]"
              style={{
                alignItems: isMobile ? "flex-start" : "center",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "12px" : "0",
              }}
            >
              <div>
                <div
                  className="font-['DM_Sans',sans-serif] font-bold mb-[4px]"
                  style={{
                    fontSize: isMobile ? "24px" : "28px",
                    color: colors.primary,
                  }}
                >
                  {activeStk.title}
                </div>
                <div className="font-['DM_Sans',sans-serif] text-[14px] text-[#888]">
                  {activeStk.subtitle}
                </div>
              </div>
              <div style={{ textAlign: isMobile ? "left" : "right" }}>
                <div
                  className="font-[Poppins,sans-serif] font-bold tracking-[-1.5px] leading-none"
                  style={{
                    fontSize: isMobile ? "32px" : "40px",
                    color: colors.primary,
                  }}
                >
                  {activeStk.stat}
                </div>
                <div className="font-['DM_Sans',sans-serif] text-[12px] text-[#888] mt-[4px]">
                  {activeStk.statLabel}
                </div>
              </div>
            </div>

            {/* Outcome rows */}
            <div className="flex flex-col gap-[6px]">
              {activeStk.outcomes.map((outcome, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div
                    key={i}
                    className="px-[20px] py-[14px] rounded-[12px] flex items-center gap-[14px]"
                    style={{
                      backgroundColor: isEven ? colors.background : "transparent",
                      opacity: animate ? 1 : 0,
                      transition: `opacity 0.4s ease ${i * 0.08}s`,
                    }}
                  >
                    <div
                      className="w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: isEven ? colors.white : colors.background }}
                    >
                      <span
                        className="font-['DM_Sans',sans-serif] text-[12px] font-bold"
                        style={{ color: colors.primary }}
                      >
                        {i + 1}
                      </span>
                    </div>
                    <span className="font-['DM_Sans',sans-serif] text-[15px] text-[#333] leading-[1.5]">
                      {outcome}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Key Advantage Strip */}
            <div
              className="mt-[24px] px-[24px] py-[16px] rounded-[12px] flex items-center"
              style={{
                backgroundColor: colors.primary,
                flexWrap: isMobile ? "wrap" : "nowrap",
                gap: isMobile ? "8px" : "16px",
              }}
            >
              <span
                className="font-['DM_Sans',sans-serif] text-[10px] font-bold uppercase tracking-[1.5px] shrink-0"
                style={{ color: colors.accent }}
              >
                Key Advantage
              </span>
              <span className="font-['DM_Sans',sans-serif] text-[14px] font-medium text-white/85">
                {activeStk.highlight}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// CTA-to-Footer separator
// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function TechnologyInnovationSectorPage() {
  return (
    <SectorPageTemplate
      sector={sectorData}
      renderProblemSection={() => <ProblemSection />}
      renderValueChainSection={() => <ValueChainSectionPremium />}
      renderEcosystemSection={() => <CompetitiveLandscapeSection sector={sectorData} />}
      renderCrossSectorSection={() => <CrossSectorSection />}
      renderInvestmentSection={() => <InvestmentCTASection />}
      renderImpactSection={() => <ImpactSection />}
      solutionFilters={[
        { key: "all", label: "All", tier: "all" },
        { key: 1, label: "Priority", tier: 1 },
        { key: 2, label: "Growth", tier: 2 },
      ]}
      policies={techPolicies}
      policyTitle={
        <>
          Moving in Step with Ghana's{" "}
          <span style={{ color: colors.accent }} className="font-semibold">
            Digital Ambition
          </span>
        </>
      }
      policySubtitle="BRIDGE ventures align directly with Ghana's digital transformation agenda — from the $50M Fintech Fund to the Innovation & Startup Act — creating pathways for public-private collaboration."
      ctaHeading={
        <>
          Let's Build Ghana's{" "}
          <span className="font-bold" style={{ color: colors.accent }}>
            Technology
          </span>
        </>
      }
      ctaDescription="Whether you're an investor, partner, or government stakeholder, there's a seat at the table in building Ghana's digital future"
      ctaSecondaryButtonText="Download Sector Brief"
    />
  );
}
