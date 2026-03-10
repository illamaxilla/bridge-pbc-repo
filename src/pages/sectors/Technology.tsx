import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SiteHeader from "@/components/SiteHeaderMinimal";
import SiteFooter from "@/components/SiteFooter";

// ============================================================================
// BRIDGE SECTOR PAGE: Technology & Innovation
// INTEGRATED VERSION with Premium ValueChain Section
// ============================================================================
// Design System: Dark Green #1B4D3E, Lime #B8D935, Off-white #F3F5F2
// ============================================================================

const colors = {
  primary: "#1B4D3E",
  accent: "#B8D935",
  accentText: "#5C7A1F",
  accentLight: "#E8F5E0",
  background: "#F3F5F2",
  white: "#FFFFFF",
  dark: "#191919",
  line: "#DEDEDE",
  lightGreen: "#E8F5E0",
  ctaGreen: "#2E5A4D",
  warning: "#F59E0B",
  warningBg: "#FEF3C7",
  warningText: "#92400E",
  critical: "#EF4444",
  criticalBg: "#FEE2E2",
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

// ============================================================================
// ICON COMPONENTS
// ============================================================================

const IconCode = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const IconBuilding = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
  </svg>
);

const IconWallet = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
  </svg>
);

const IconFactory = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M17 18h1M12 18h1M7 18h1" />
  </svg>
);

const IconTruck = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
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
);

const IconZap = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconArrowRight = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const IconArrowDown = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5v14M19 12l-7 7-7-7" />
  </svg>
);

const IconCheck = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconWarning = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);

const IconUsers = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// Process Widget Icons
const processIcons = {
  wifi: (color) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <circle cx="12" cy="20" r="0.5" fill={color} />
    </svg>
  ),
  grad: (color) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 6 3 6 3s6-1 6-3v-5" />
    </svg>
  ),
  bulb: (color) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  ),
  chart: (color) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  ),
  users: (color) => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  checkSmall: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

const PNODE_SIZE = 48;
const PNODE_CENTER = PNODE_SIZE / 2;

// ── Pipeline ──
const ProcessPipeline = ({ active, onSelect }) => (
  <div
    style={{
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      position: "relative",
      padding: "0 16px",
    }}
  >
    {processStages.map((s, i) => {
      const isActive = i === active;
      const isReached = i <= active;
      const iconFn = processIcons[s.icon];
      return (
        <div key={s.id} style={{ display: "flex", alignItems: "flex-start", flex: 1, position: "relative" }}>
          {i > 0 && (
            <div
              style={{
                position: "absolute",
                top: PNODE_CENTER - 1,
                left: 0,
                right: `calc(50% + ${PNODE_SIZE / 2 + 4}px)`,
                height: 2,
                backgroundColor: isReached ? colors.accent : "transparent",
                transition: "background-color 0.4s ease",
                zIndex: 0,
              }}
            />
          )}
          <div
            onClick={() => onSelect(i)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              width: "100%",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: PNODE_SIZE,
                height: PNODE_SIZE,
                borderRadius: isActive ? 14 : 12,
                backgroundColor: isActive ? colors.primary : isReached ? colors.primary : colors.white,
                border: isActive || isReached ? "none" : `2px solid ${colors.primary}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                boxShadow: "none",
              }}
            >
              {iconFn(isActive || isReached ? "#fff" : PC.textLight)}
            </div>
            <div style={{ textAlign: "center", marginTop: 12 }}>
              <div
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? colors.primary : isReached ? PC.text : PC.textLight,
                  transition: "all 0.3s ease",
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 11,
                  color: PC.textLight,
                  marginTop: 2,
                  opacity: isActive ? 1 : 0.5,
                  transition: "opacity 0.3s ease",
                }}
              >
                {s.sub}
              </div>
            </div>
            {isActive && (
              <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: colors.accent, marginTop: 8 }} />
            )}
          </div>
          {i < processStages.length - 1 && (
            <div
              style={{
                position: "absolute",
                top: PNODE_CENTER - 1,
                left: `calc(50% + ${PNODE_SIZE / 2 + 4}px)`,
                right: 0,
                height: 2,
                backgroundColor: i + 1 <= active ? colors.accent : "transparent",
                transition: "background-color 0.4s ease",
                zIndex: 0,
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
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 0",
      borderBottom: isLast ? "none" : `1px solid ${PC.borderLight}`,
    }}
  >
    <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: PC.textLight }}>{label}</span>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {delta && (
        <span
          style={{
            fontFamily: "'JetBrains Mono',monospace",
            fontSize: 10,
            fontWeight: 600,
            color: colors.primary,
            backgroundColor: PC.accentSoft,
            padding: "3px 8px",
            borderRadius: 4,
          }}
        >
          {delta}
        </span>
      )}
      <span
        style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: 14,
          fontWeight: 600,
          color: PC.text,
        }}
      >
        {value}
      </span>
    </div>
  </div>
);

// ── Card wrapper ──
const ProcessCard = ({ children, style = {} }) => (
  <div
    style={{
      backgroundColor: PC.card,
      borderRadius: 16,
      border: `2px solid ${colors.primary}`,
      ...style,
    }}
  >
    {children}
  </div>
);

// ============================================================================
// HEADER COMPONENT
// ============================================================================

const BridgeLogo = ({ height = 40 }) => (
  <svg height={height} viewBox="0 0 3434.33 932.3" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path fill="#b8d935" d="M2070.26,927.95c-.2.2-.5.4-.7.5h-.3l1-.5Z" />
      <path fill="#0fea68" d="M2070.26,927.95c-.2.2-.5.4-.7.5h-.3l1-.5Z" />
      <path
        fill="#1b4d3e"
        d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9h0ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z"
      />
      <path
        fill="#1b4d3e"
        stroke="#000"
        strokeWidth=".5"
        strokeMiterlimit="10"
        d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1h0Z"
      />
      <path
        fill="#1b4d3e"
        stroke="#000"
        strokeWidth=".5"
        strokeMiterlimit="10"
        d="M1488.08,578.65v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"
      />
      <rect fill="#b8d935" x="1427.38" y="17.35" width="205.2" height="145" />
      <rect fill="#1b4d3e" x="1427.48" y="221.75" width="205.2" height="693.2" rx="9.6" ry="9.6" />
      <path
        fill="#1b4d3e"
        d="M2757.31,19.09h491.3c5.42,0,9.82,4.4,9.82,9.82v218.7c0,5.42-4.4,9.82-9.82,9.82h-507.36c-56.98,0-108.53,23.02-145.87,60.35-37.34,37.23-60.45,88.79-60.45,145.66,0,113.75,92.37,206.01,206.32,206.01h12.89c2.86,0,5.11,2.25,5.11,5.11v236.7c0,1.13-.92,1.94-1.94,1.94h0c-242.22,0-438.52-195.99-438.52-437.8v-18.51c0-241.81,196.29-437.8,438.52-437.8h0Z"
      />
      <rect fill="#1b4d3e" x="2812.75" y="339.47" width="216.75" height="572.62" rx="9.6" ry="9.6" />
      <rect fill="#b8d935" x="3083.41" y="339.47" width="175.12" height="257.67" />
      <rect fill="#b8d935" x="3083.41" y="654.42" width="175.12" height="257.67" />
      <circle fill="none" stroke="#191919" strokeWidth="5" strokeMiterlimit="10" cx="3385.56" cy="866.94" r="46.27" />
      <path
        fill="#191919"
        d="M3404.8,889.32l-10.31-14.71c.25,0,.38-.13.63-.25,2.89-1.26,5.03-3.02,6.54-5.41s2.26-5.15,2.26-8.55c0-5.03-1.76-8.93-5.16-11.82s-8.05-4.27-14.08-4.27h-18.36v44.89h8.3v-13.08h11.94l9.18,13.08h8.93l.13.13h0ZM3392.85,853.74c1.89,1.51,2.77,3.77,2.77,6.66s-.88,5.03-2.77,6.66-4.65,2.39-8.3,2.39h-9.81v-17.85h9.81c3.65,0,6.41.75,8.3,2.26h0v-.13h0Z"
      />
      <rect
        fill="none"
        stroke="#1b4d3e"
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
        fill="#b8d935"
        stroke="#1b4d3e"
        strokeMiterlimit="10"
        points="722.6 322.13 462.28 452.8 201.97 322.75 461.21 192.52 722.6 322.13"
      />
      <path
        fill="#1b4d3e"
        d="M197.84,426.78c3.86-.53,7.04.85,10.74,1.41l252.53,125.67c84.54-40,167.66-83.83,251.89-124.84,33.14-11.49,50.09,34.15,18.55,49.11l-259.23,129.08c-10.18,3.72-14.14,2.57-23.85-1.31l-264.23-132.98c-17.04-14.4-7.96-43.2,13.61-46.14h0Z"
      />
      <path
        fill="#b8d935"
        d="M195.25,558c3.65-.63,7.4-.4,11.08-.22,86.11,40.47,170.4,85.05,255.95,126.78l252.92-126c29.53-7.22,45.44,28.67,22.29,46.49l-270.42,134.42-8.62.31c-91.6-42.21-181.07-89.86-271.7-134.42-18.72-12.06-13.3-43.58,8.5-47.37h0Z"
      />
    </g>
  </svg>
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
// HERO SECTION
// ============================================================================



const HeroSection = ({ sector }) => {
  const isMobile = useIsMobile();

  return (
    <section
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "80px 20px 20px" : "112px 80px 20px",
        minHeight: isMobile ? "auto" : "calc(100vh - 100px)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: CONTENT_MAX_WIDTH,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 420px",
            gap: isMobile ? "32px" : "60px",
            alignItems: "start",
            flex: 1,
          }}
        >
          {/* Left Column — Content */}
          <div>
            {/* Category Badge */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
              <span
                style={{
                  backgroundColor: colors.accentLight,
                  color: colors.primary,
                  padding: "8px 16px",
                  borderRadius: "50px",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {sector.category}
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? "30px" : "52px",
                fontWeight: "400",
                lineHeight: "1.1",
                color: colors.primary,
                margin: "0 0 20px 0",
                letterSpacing: "-1px",
              }}
            >
              <span style={{ fontWeight: "700" }}>Technology</span> &{isMobile ? " " : <br />}Innovation
            </h1>

            {/* Subtitle */}
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? "20px" : "24px",
                fontWeight: "600",
                lineHeight: "1.3",
                color: colors.dark,
                margin: "0 0 16px 0",
              }}
            >
              {sector.problemHeadline}
            </h2>

            {/* Description */}
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? "15px" : "16px",
                fontWeight: "400",
                lineHeight: "1.7",
                color: "#555",
                margin: "0 0 36px 0",
                maxWidth: "540px",
              }}
            >
              {sector.problemSubheadline}
            </p>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: "12px", flexWrap: isMobile ? "wrap" : "nowrap" }}>
              <button
                style={{
                  backgroundColor: colors.accent,
                  color: colors.primary,
                  border: "none",
                  padding: isMobile ? "14px 20px" : "16px 24px",
                  borderRadius: "50px",
                  fontSize: isMobile ? "14px" : "15px",
                  fontWeight: "600",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isMobile ? "center" : "flex-start",
                  gap: "10px",
                  flex: isMobile ? "1 1 100%" : "none",
                }}
              >
                Request Full Analysis
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    backgroundColor: colors.primary,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: colors.white,
                  }}
                >
                  <IconArrowRight />
                </span>
              </button>
              <button
                style={{
                  backgroundColor: "transparent",
                  color: colors.primary,
                  border: `2px solid ${colors.line}`,
                  padding: isMobile ? "14px 20px" : "16px 24px",
                  borderRadius: "50px",
                  fontSize: isMobile ? "14px" : "15px",
                  fontWeight: "600",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                  flex: isMobile ? "1 1 100%" : "none",
                }}
              >
                Download Summary
              </button>
            </div>
          </div>

          {/* Right Column — Stats Card */}
          <div
            style={{
              backgroundColor: colors.primary,
              borderRadius: "20px",
              padding: isMobile ? "24px" : "32px",
              minWidth: isMobile ? "auto" : "340px",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Sector Overview
              </span>
              <span
                style={{
                  backgroundColor: "rgba(184, 217, 53, 0.15)",
                  color: colors.accent,
                  padding: "6px 14px",
                  borderRadius: "50px",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Active
              </span>
            </div>

            {/* Main Stats */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
                paddingBottom: "24px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "42px",
                    fontWeight: "700",
                    color: colors.accent,
                    fontFamily: "Inter, sans-serif",
                    lineHeight: "1",
                    marginBottom: "8px",
                  }}
                >
                  {sector.capitalRange}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Investment Range
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "42px",
                    fontWeight: "700",
                    color: colors.accent,
                    fontFamily: "Inter, sans-serif",
                    lineHeight: "1",
                    marginBottom: "8px",
                  }}
                >
                  {sector.ventures}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Identified Ventures
                </div>
              </div>
            </div>

            {/* Stat Rows */}
            {sector.keyStats.map((stat, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 0",
                }}
              >
                <div>
                  <span
                    style={{
                      display: "block",
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "rgba(255,255,255,0.8)",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {stat.label}
                  </span>
                  {stat.detail && (
                    <span
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "rgba(255,255,255,0.35)",
                        fontFamily: "Inter, sans-serif",
                        fontStyle: "italic",
                        marginTop: "2px",
                      }}
                    >
                      {stat.detail}
                    </span>
                  )}
                </div>
                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: colors.accent,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Arrow — Desktop Only */}
      {!isMobile && (
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px 0",
          }}
        >
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#999", marginBottom: "8px" }}>
            Explore Analysis
          </span>
          <div style={{ color: "#999", animation: "bounce 2s infinite" }}>
            <IconArrowDown />
          </div>
        </div>
      )}
    </section>
  );
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
      style={{
        backgroundColor: colors.white,
        borderRadius: isMobile ? "16px" : "20px",
        padding: isMobile ? "20px" : "28px",
        cursor: "pointer",
        border: isExpanded ? `2px solid ${colors.accent}` : `1px solid ${colors.line}`,
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── ZONE 1: Title Row + Description (always visible) ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
        <h3
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "16px" : "18px",
            fontWeight: "600",
            color: colors.dark,
            margin: 0,
            flex: 1,
            minWidth: 0,
          }}
        >
          {problem.title}
        </h3>
        <span
          style={{
            display: "inline-block",
            backgroundColor: severityBg,
            color: severityColor,
            padding: "6px 14px",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "1px",
            fontFamily: "Inter, sans-serif",
            whiteSpace: "nowrap",
            flexShrink: 0,
            marginLeft: "12px",
          }}
        >
          {severityLabel}
        </span>
      </div>

      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: isMobile ? "13px" : "14px",
          color: "#666",
          margin: "0 0 16px 0",
          lineHeight: "1.5",
          display: "-webkit-box",
          WebkitLineClamp: isMobile ? 2 : 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          minHeight: isMobile ? "auto" : "63px",
        }}
      >
        {problem.description}
      </p>

      {/* ── ZONE 2: Impact Bar (always visible) ── */}
      <div
        style={{
          backgroundColor: colors.accentLight,
          borderRadius: "12px",
          padding: isMobile ? "8px 12px" : "10px 16px",
          marginBottom: isExpanded ? "16px" : 0,
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "13px" : "14px",
            fontWeight: "600",
            color: colors.primary,
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          Impact: {problem.quantification}
        </span>
      </div>

      {/* ── EXPANDED CONTENT (Zones 3-5) ── */}
      {isExpanded && (
        <div style={{ borderTop: `1px solid ${colors.line}`, paddingTop: "16px" }} onClick={(e) => e.stopPropagation()}>
          {/* ── ZONE 3: Priority + Scale (2-col grid) ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            {/* Priority cell */}
            <div style={{ backgroundColor: colors.background, borderRadius: "12px", padding: "14px" }}>
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}
              >
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "#888",
                  }}
                >
                  PRIORITY
                </span>
                <span
                  style={{
                    backgroundColor: severityBg,
                    color: severityColor,
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "700",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {severityLabel}
                </span>
              </div>
              <div style={{ height: "8px", backgroundColor: colors.line, borderRadius: "4px", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${problem.severityScore}%`,
                    backgroundColor: barColor,
                    borderRadius: "4px",
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            </div>

            {/* Scale cell */}
            <div style={{ backgroundColor: colors.background, borderRadius: "12px", padding: "14px" }}>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  color: "#888",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                SCALE
              </span>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: isMobile ? "20px" : "24px",
                    fontWeight: "700",
                    color: colors.primary,
                    lineHeight: "1",
                  }}
                >
                  {problem.affectedCount}
                </span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#666" }}>
                  {problem.affectedLabel}
                </span>
              </div>
            </div>
          </div>

          {/* ── ZONE 4: Opportunity Drivers (2-col grid with numbered circles) ── */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#888"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  color: "#888",
                }}
              >
                OPPORTUNITY DRIVERS
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "10px",
              }}
            >
              {problem.rootCauses.map((cause, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: colors.background,
                    borderRadius: "12px",
                    padding: isMobile ? "10px 12px" : "12px 14px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: colors.primary,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: colors.white,
                      }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: isMobile ? "13px" : "14px",
                        fontWeight: "600",
                        color: colors.dark,
                        marginBottom: "2px",
                      }}
                    >
                      {cause.title}
                    </div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#888" }}>
                      {cause.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── ZONE 5: BRIDGE Solution Footer ── */}
          <div
            style={{
              borderTop: `1px solid ${colors.line}`,
              paddingTop: "16px",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "center",
              justifyContent: "space-between",
              gap: isMobile ? "8px" : "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.accent}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#888", flexShrink: 0 }}>
                BRIDGE Solution:
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: colors.primary,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {problem.bridgeSolution}
              </span>
            </div>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                fontWeight: "500",
                color: colors.primary,
                display: "flex",
                alignItems: "center",
                gap: "4px",
                flexShrink: 0,
                cursor: "pointer",
              }}
            >
              View{" "}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.primary}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
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
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        <div style={{ textAlign: "left", marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Inter, sans-serif",
              marginBottom: "24px",
            }}
          >
            The Opportunity
          </span>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
              color: colors.primary,
              margin: "0 0 20px 0",
              maxWidth: "820px",
            }}
          >
            $10B+ in Addressable <span style={{ color: colors.accent, fontWeight: "700" }}>Digital Potential</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              color: "#666",
              maxWidth: "680px",
              margin: "0",
              lineHeight: "1.65",
            }}
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
              style={isMobile ? { minWidth: "85%", maxWidth: "85%", flexShrink: 0, scrollSnapAlign: "start" } : {}}
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
          <div
            style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", marginTop: "16px" }}
          >
            {problemSectionData.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === 0 ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: i === 0 ? colors.accent : colors.line,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
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
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "64px" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Inter, sans-serif",
              marginBottom: "24px",
            }}
          >
            The Process
          </span>

          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              color: colors.primary,
              margin: "0 0 20px 0",
              letterSpacing: "-0.5px",
              lineHeight: "1.2",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            From Infrastructure to <span style={{ color: colors.accent, fontWeight: "700" }}>Digital Impact</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              color: "#666",
              maxWidth: "750px",
              margin: "0 auto",
              lineHeight: "1.65",
            }}
          >
            {isMobile
              ? "Tap each stage to explore where strategic resources and innovation create compounding value across the technology value chain"
              : "Follow the value chain from infrastructure through market adoption — click each stage to explore where strategic resources and innovation create compounding value"}
          </p>
        </div>

        {/* Google Fonts for widget */}
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Pipeline */}
        <div style={{ marginBottom: 24 }}>
          <ProcessPipeline active={active} onSelect={go} />
        </div>

        {/* Content */}
        <div key={animKey} style={{ animation: "procFadeIn .35s ease forwards" }}>
          <style>{`@keyframes procFadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>

          {/* TOP ROW */}
          <div
            style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 360px", gap: 16, marginBottom: 16 }}
          >
            {/* Stage headline + key stat */}
            <ProcessCard style={{ padding: "24px 28px", display: "flex", gap: 24 }}>
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      backgroundColor: colors.primary,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {processIcons[s.icon]("#fff")}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono',monospace",
                        fontSize: 10,
                        fontWeight: 600,
                        color: PC.textLight,
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      Stage 0{active + 1}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: PC.text }}>{s.label}</div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: PC.textMid, lineHeight: "1.55", margin: 0 }}>{s.headline}</p>
              </div>

              <div
                style={{
                  backgroundColor: colors.white,
                  borderRadius: 14,
                  border: `1px solid ${PC.border}`,
                  padding: "20px 24px",
                  textAlign: "center",
                  flexShrink: 0,
                  minWidth: 140,
                  alignSelf: "flex-start",
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 9,
                    fontWeight: 600,
                    color: PC.textLight,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Key indicator
                </div>
                <div
                  style={{
                    fontFamily: "'Poppins',sans-serif",
                    fontSize: 28,
                    fontWeight: 700,
                    color: colors.primary,
                    lineHeight: 1,
                  }}
                >
                  {s.keyFigure}
                </div>
                <div style={{ fontSize: 11, color: PC.textLight, marginTop: 6, lineHeight: "1.3" }}>{s.keyLabel}</div>
              </div>
            </ProcessCard>

            {/* Progressive vertical bar chart — desktop only */}
            {!isMobile && (
              <div
                style={{
                  borderRadius: 16,
                  padding: "24px 28px",
                  backgroundColor: colors.primary,
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 16px rgba(27,77,62,0.2)",
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: 9,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.45)",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: 14,
                    textAlign: "center",
                  }}
                >
                  Value retained
                </div>

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    gap: 10,
                    padding: "0 4px",
                  }}
                >
                  {processStages.map((st, i) => {
                    const isStageActive = i === active;
                    const isReached = i <= active;
                    const barPx = Math.round((st.valueFlow / 100) * 82);
                    return (
                      <div
                        key={st.id}
                        onClick={() => go(i)}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 6,
                          cursor: "pointer",
                          flex: 1,
                          height: "100%",
                          justifyContent: "flex-end",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'JetBrains Mono',monospace",
                            fontSize: 10,
                            fontWeight: 700,
                            color: isStageActive ? colors.accent : "transparent",
                            transition: "color 0.3s ease",
                            minHeight: 16,
                          }}
                        >
                          {st.valueFlow}%
                        </span>
                        <div
                          style={{
                            width: "100%",
                            maxWidth: 32,
                            height: barPx,
                            borderRadius: 8,
                            backgroundColor: "rgba(255,255,255,0.07)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            position: "relative",
                            overflow: "hidden",
                            transition: "all 0.3s ease",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              right: 0,
                              height: isReached ? "100%" : "0%",
                              backgroundColor: isStageActive ? colors.accent : "rgba(184,217,53,0.4)",
                              borderRadius: 7,
                              transition: "height 0.5s cubic-bezier(0.4,0,0.2,1)",
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
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 360px", gap: 16 }}>
              {/* Frictions */}
              <ProcessCard style={{ padding: "28px 32px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: PC.red }} />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 10,
                      fontWeight: 600,
                      color: PC.textLight,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    Friction points
                  </span>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: 10,
                    marginBottom: 20,
                  }}
                >
                  {s.frictions.map((f, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "14px 16px",
                        backgroundColor: i === 0 ? PC.redSoft : colors.white,
                        borderRadius: 10,
                        border: `1px solid ${i === 0 ? PC.redBorder : PC.borderLight}`,
                      }}
                    >
                      <span style={{ fontSize: 13, color: PC.text, lineHeight: "1.5" }}>{f}</span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "16px 20px",
                    borderRadius: 12,
                    backgroundColor: PC.accentSoft,
                    border: `1px solid ${PC.accentBorder}`,
                    marginTop: "auto",
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      backgroundColor: colors.primary,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {processIcons.checkSmall}
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono',monospace",
                        fontSize: 9,
                        fontWeight: 700,
                        color: colors.primary,
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        marginBottom: 4,
                      }}
                    >
                      BRIDGE response
                    </div>
                    <span
                      style={{
                        fontSize: isMobile ? 12 : 14,
                        fontWeight: 600,
                        color: PC.text,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "block",
                      }}
                    >
                      {s.response}
                    </span>
                  </div>
                </div>
              </ProcessCard>

              {/* Metrics */}
              <ProcessCard style={{ padding: "24px 28px", display: "flex", flexDirection: "column" }}>
                <div
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono',monospace",
                      fontSize: 10,
                      fontWeight: 600,
                      color: PC.textLight,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    Metrics
                  </span>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: colors.accent }} />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
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
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "14px",
                marginTop: "16px",
                backgroundColor: "transparent",
                border: `1px solid ${colors.line}`,
                borderRadius: "12px",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "600",
                color: colors.primary,
                cursor: "pointer",
              }}
            >
              {showMoreChain ? "Show less" : "Show friction points & metrics"}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.primary}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transform: showMoreChain ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SOLUTIONS SECTION
// ============================================================================

const SolutionCard = ({ solution, index }) => {
  const tierColors = {
    1: { bg: colors.primary, text: colors.white, label: "Priority" },
    2: { bg: colors.background, text: colors.primary, label: "Growth" },
    3: { bg: colors.line, text: "#666", label: "Strategic" },
  };
  const tc = tierColors[solution.tier];

  return (
    <div
      style={{
        backgroundColor: colors.white,
        borderRadius: "20px",
        padding: "28px",
        border: `1px solid ${colors.line}`,
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        transition: "all 0.3s ease",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            backgroundColor: tc.bg,
            color: tc.text,
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: "700",
            fontFamily: "Inter, sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Tier {solution.tier} — {tc.label}
        </span>
        <span
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px",
            fontWeight: "700",
            color: colors.primary,
          }}
        >
          {solution.capital}
        </span>
      </div>

      <h3
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "18px",
          fontWeight: "600",
          color: colors.dark,
          margin: 0,
        }}
      >
        {solution.name}
      </h3>

      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          color: "#666",
          lineHeight: "1.6",
          margin: 0,
          flex: 1,
        }}
      >
        {solution.description}
      </p>

      <div
        style={{
          backgroundColor: colors.accentLight,
          padding: "10px 14px",
          borderRadius: "10px",
          marginTop: "auto",
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "13px",
            color: colors.primary,
            fontWeight: "600",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "block",
          }}
        >
          {solution.impact}
        </span>
      </div>

      {/* Score bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            flex: 1,
            backgroundColor: colors.line,
            borderRadius: "4px",
            height: "4px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${(solution.score / 50) * 100}%`,
              height: "100%",
              backgroundColor: colors.accent,
              borderRadius: "4px",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            color: "#999",
          }}
        >
          Score: {solution.score}/50
        </span>
      </div>
    </div>
  );
};

const SolutionsSection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = useState(isMobile ? "Priority" : "All");
  const filters = ["All", "Priority", "Growth"];
  const tierMap = { Priority: 1, Growth: 2 };

  const filtered =
    activeFilter === "All" ? sector.solutions : sector.solutions.filter((s) => s.tier === tierMap[activeFilter]);

  return (
    <section
      style={{
        backgroundColor: colors.primary,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: colors.accent,
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Inter, sans-serif",
              marginBottom: "24px",
            }}
          >
            The Pathway to Impact
          </span>

          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
              color: colors.white,
              margin: "0 0 20px 0",
              maxWidth: "900px",
            }}
          >
            Ventures That Build <span style={{ color: colors.accent, fontWeight: "700" }}>Lasting Value</span>
          </h2>

          {/* Description + Filter row */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "flex-end",
              gap: isMobile ? "16px" : "0",
            }}
          >
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? "15px" : "16px",
                color: "rgba(255,255,255,0.6)",
                maxWidth: "580px",
                margin: "0",
                lineHeight: "1.65",
              }}
            >
              Each venture a bridge from insight to investment to measurable public benefit — scored on impact,
              feasibility, and market readiness
            </p>

            <div
              style={{
                display: "flex",
                gap: "8px",
                flexShrink: 0,
                overflowX: isMobile ? "auto" : "visible",
                WebkitOverflowScrolling: "touch",
                marginLeft: isMobile ? 0 : "auto",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "50px",
                padding: isMobile ? "3px" : "4px",
                backgroundColor: "transparent",
              }}
            >
              {filters.map((f) => {
                const isActive = f === activeFilter;
                return (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    style={{
                      backgroundColor: isActive ? colors.accent : "transparent",
                      color: isActive ? colors.primary : "rgba(255,255,255,0.7)",
                      border: "none",
                      padding: isMobile ? "6px 14px" : "8px 20px",
                      borderRadius: "50px",
                      fontSize: isMobile ? "11px" : "13px",
                      fontWeight: isActive ? "700" : "500",
                      fontFamily: "Inter, sans-serif",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>
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
                  paddingBottom: "8px",
                }
              : {
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "24px",
                  maxWidth: CONTENT_MAX_WIDTH,
                  margin: "0 auto",
                }
          }
        >
          {isMobile && <div style={{ minWidth: "8px", flexShrink: 0 }} />}
          {filtered.map((solution, i) => (
            <div
              key={i}
              style={
                isMobile
                  ? { minWidth: "80%", maxWidth: "80%", flexShrink: 0, scrollSnapAlign: "start", height: "100%" }
                  : {}
              }
            >
              <SolutionCard solution={solution} index={i} />
            </div>
          ))}
        </div>
        {isMobile && (
          <div
            style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", marginTop: "16px" }}
          >
            {filtered.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === 0 ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: i === 0 ? colors.accent : "rgba(255,255,255,0.2)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
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
// COMPETITIVE LANDSCAPE SECTION — Split-Panel Comparative Analysis
// ============================================================================

const RatingBar = ({ rating }) => (
  <div style={{ display: "flex", gap: "3px" }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        style={{
          width: "16px",
          height: "6px",
          borderRadius: "3px",
          backgroundColor: i <= rating ? colors.accent : colors.line,
        }}
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
      style={{
        backgroundColor: colors.white,
        borderRadius: "20px",
        border: `1px solid ${colors.line}`,
        padding: "28px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header: Name + Priority */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <div>
          <h3
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "18px",
              fontWeight: "600",
              color: colors.dark,
              margin: 0,
            }}
          >
            {c.name}
          </h3>
        </div>
        <span
          style={{
            backgroundColor: colors.accentLight,
            color: c.priority === "High" ? colors.primary : "#666",
            padding: "4px 14px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "700",
            fontFamily: "Inter, sans-serif",
            textTransform: "uppercase",
            flexShrink: 0,
            marginLeft: "12px",
          }}
        >
          {c.priority} Priority
        </span>
      </div>

      {/* Focus */}
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          color: "#666",
          lineHeight: "1.5",
          margin: "0 0 20px 0",
        }}
      >
        {c.focus}
      </p>

      {/* Strengths label */}
      <div style={{ marginBottom: "12px" }}>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "10px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "#888",
          }}
        >
          Strengths
        </span>
      </div>

      {/* Strength Rows — 5-segment bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: isExpanded ? "20px" : "0" }}>
        {c.strengths.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#666", minWidth: "140px" }}>
              {s.name}
            </span>
            <RatingBar rating={s.rating} />
          </div>
        ))}
      </div>

      {/* Expanded: Where BRIDGE Helps + Opportunity */}
      {isExpanded && (
        <div style={{ paddingTop: "20px", borderTop: `1px solid ${colors.line}` }}>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "#888",
            }}
          >
            Where BRIDGE Helps
          </span>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "10px", marginBottom: "16px" }}
          >
            {c.gaps.map((gap, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: colors.accent, fontSize: "12px", flexShrink: 0 }}>●</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#555" }}>{gap}</span>
              </div>
            ))}
          </div>

          {/* BRIDGE Opportunity accent card */}
          <div
            style={{
              backgroundColor: colors.accentLight,
              border: `1px solid ${colors.accent}`,
              borderRadius: "12px",
              padding: "14px 18px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "10px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: colors.primary,
                }}
              >
                BRIDGE Opportunity
              </span>
            </div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                color: colors.primary,
                margin: 0,
                lineHeight: "1.5",
              }}
            >
              {c.bridgeOpportunity}
            </p>
          </div>
        </div>
      )}

      {/* Footer: Navigation + Analysis toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
          paddingTop: "16px",
          borderTop: `1px solid ${colors.line}`,
        }}
      >
        {!hiddenNav ? (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => go("prev")}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: `1px solid ${colors.line}`,
                backgroundColor: colors.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.primary}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#999" }}>
              {currentIndex + 1} / {total}
            </span>
            <button
              onClick={() => go("next")}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: colors.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.white}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        ) : (
          <div />
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            backgroundColor: "transparent",
            border: `1px solid ${colors.line}`,
            borderRadius: "8px",
            padding: "8px 16px",
            cursor: "pointer",
            fontFamily: "Inter, sans-serif",
            fontSize: "13px",
            fontWeight: "600",
            color: colors.primary,
          }}
        >
          {isExpanded ? "Less" : "Analysis"}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
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
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "left", marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Inter, sans-serif",
              marginBottom: "24px",
            }}
          >
            The Landscape
          </span>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
              color: colors.primary,
              margin: "0 0 16px 0",
            }}
          >
            Building With Ghana's <span style={{ color: colors.accent, fontWeight: "700" }}>Digital Pioneers</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              color: "#666",
              maxWidth: "750px",
              margin: "0",
              lineHeight: "1.65",
            }}
          >
            MEST, Ghana Tech Lab, ALX Africa, and Google Research lead digital innovation. BRIDGE connects technology
            ventures to cross-sector demand — combining technical talent with market-ready deployment
          </p>
        </div>

        {/* Mobile: Horizontal scroll pills */}
        {isMobile && (
          <div
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
              margin: "0 -20px 16px",
              padding: "0 20px 4px",
            }}
          >
            {sector.competitors.map((comp, i) => (
              <button
                key={i}
                onClick={() => handleCompetitorChange(i)}
                style={{
                  backgroundColor: i === activeCompetitorIndex ? colors.accentLight : colors.white,
                  color: i === activeCompetitorIndex ? colors.primary : "#999",
                  border: i === activeCompetitorIndex ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                  borderRadius: "50px",
                  padding: "5px 10px",
                  fontSize: "11px",
                  fontWeight: i === activeCompetitorIndex ? "700" : "500",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                }}
              >
                {comp.name}
              </button>
            ))}
          </div>
        )}

        {/* Main Grid: left / right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "16px" : "16px",
            alignItems: "stretch",
          }}
        >
          {/* LEFT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
                style={{
                  width: "100%",
                  padding: "14px",
                  backgroundColor: showMoreComp ? "transparent" : colors.primary,
                  color: showMoreComp ? colors.primary : colors.white,
                  border: showMoreComp ? `1px solid ${colors.line}` : "none",
                  borderRadius: "12px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                {showMoreComp ? "Show less" : "See BRIDGE's Position"}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transform: showMoreComp ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            )}

            {/* BRIDGE Position Card */}
            {(!isMobile || showMoreComp) && (
              <div
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: isMobile ? "16px" : "20px",
                  padding: isMobile ? "20px" : "28px",
                  flex: 1,
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "14px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    BRIDGE's Position
                  </span>
                  <span
                    style={{
                      backgroundColor: "rgba(184,217,53,0.12)",
                      color: colors.accent,
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "700",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    vs {vsLabels[activeCompetitorIndex]}
                  </span>
                </div>

                {/* Headline */}
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "17px",
                    fontWeight: "600",
                    color: colors.white,
                    lineHeight: "1.4",
                    margin: "0 0 20px 0",
                    minHeight: isMobile ? "auto" : "48px",
                  }}
                >
                  {pos.headline}
                </h3>

                {/* Bullet Items */}
                <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "8px" : "10px" }}>
                  {pos.bullets.map((b, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.06)",
                        borderRadius: "12px",
                        padding: isMobile ? "12px 14px" : "14px 16px",
                        display: "flex",
                        alignItems: isMobile ? "flex-start" : "center",
                        gap: isMobile ? "8px" : "12px",
                        flexWrap: isMobile ? "wrap" : "nowrap",
                      }}
                    >
                      <span
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          backgroundColor: colors.accent,
                          flexShrink: 0,
                          marginTop: isMobile ? "5px" : 0,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          fontWeight: "600",
                          color: colors.white,
                        }}
                      >
                        {b.label}
                      </span>
                      <span
                        style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}
                      >
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
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridTemplateRows: "repeat(3, 1fr)",
                gap: "16px",
              }}
            >
              {sector.competitors.map((comp, i) => {
                const isActive = i === activeCompetitorIndex;
                return (
                  <div
                    key={i}
                    onClick={() => handleCompetitorChange(i)}
                    style={{
                      backgroundColor: colors.white,
                      borderRadius: "16px",
                      border: isActive ? `2px solid ${colors.primary}` : `1px solid ${colors.line}`,
                      padding: "24px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {/* Name + Funding badge */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "16px",
                          fontWeight: "600",
                          color: colors.dark,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {shortNames[i]}
                      </span>
                      <span
                        style={{
                          backgroundColor: colors.accentLight,
                          color: colors.primary,
                          padding: "3px 10px",
                          borderRadius: "12px",
                          fontSize: "11px",
                          fontWeight: "600",
                          fontFamily: "Inter, sans-serif",
                          flexShrink: 0,
                          marginLeft: "12px",
                        }}
                      >
                        {comp.funding}
                      </span>
                    </div>

                    {/* Description */}
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        color: "#888",
                        lineHeight: "1.45",
                        margin: "0 0 12px 0",
                      }}
                    >
                      {shortDescs[i]}
                    </p>

                    {/* Top Strength box */}
                    <div
                      style={{
                        backgroundColor: colors.background,
                        borderRadius: "10px",
                        padding: "10px 14px",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "13px",
                            fontWeight: "500",
                            color: "#555",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {comp.strengths[0].name}
                        </span>
                        <RatingBar rating={comp.strengths[0].rating} />
                      </div>
                    </div>

                    {/* Footer */}
                    <div
                      style={{
                        marginTop: "auto",
                        paddingTop: "14px",
                        borderTop: `1px solid ${colors.line}`,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBlockStart: "14px",
                      }}
                    >
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#ccc" }}>
                        Est. {comp.year}
                      </span>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "11px",
                          fontWeight: "600",
                          color: comp.priority === "High" ? colors.primary : "#999",
                          opacity: 0.6,
                        }}
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

const PolicyCardSection = () => {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);
  const policyScrollRef = useRef(null);
  const [policyScrollIdx, setPolicyScrollIdx] = useState(0);

  const categories = [
    { id: "all", label: "All" },
    { id: "funding", label: "Direct Funding" },
    { id: "tax", label: "Tax Incentives" },
    { id: "infrastructure", label: "Infrastructure" },
    { id: "partnerships", label: "Partnerships" },
  ];

  const catBadge = {
    funding: { bg: "rgba(184,217,53,0.15)", border: "rgba(184,217,53,0.3)" },
    tax: { bg: "rgba(27,77,62,0.07)", border: "rgba(27,77,62,0.15)" },
    infrastructure: { bg: "rgba(184,217,53,0.1)", border: "rgba(184,217,53,0.25)" },
    partnerships: { bg: "rgba(27,77,62,0.05)", border: "rgba(27,77,62,0.12)" },
  };

  const policies = [
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

  const filtered = activeCategory === "all" ? policies : policies.filter((p) => p.category === activeCategory);

  return (
    <section
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: isMobile ? "32px" : "60px", textAlign: isMobile ? "left" : "center" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "DM Sans, sans-serif",
              marginBottom: "24px",
            }}
          >
            The Governance & Policy
          </span>
          <h2
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
              color: colors.primary,
              margin: isMobile ? "0 0 16px 0" : "0 auto 16px",
              maxWidth: "900px",
            }}
          >
            Moving in Step with Ghana's{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Digital Ambition</span>
          </h2>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              color: "#555",
              maxWidth: "750px",
              margin: isMobile ? "0 0 28px 0" : "0 auto 28px",
              lineHeight: "1.65",
            }}
          >
            From the proposed $50M Fintech Fund to the Ghana Innovation & Startup Act, the Mahama administration is
            building a digital economy framework that BRIDGE ventures are designed to complement
          </p>

          {/* Category filter pills */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: isMobile ? "nowrap" : "wrap",
              overflowX: isMobile ? "auto" : "visible",
              WebkitOverflowScrolling: "touch",
              justifyContent: isMobile ? "flex-start" : "center",
            }}
          >
            {categories.map((cat) => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setExpandedCard(null);
                    setPolicyScrollIdx(0);
                    if (policyScrollRef.current) policyScrollRef.current.scrollLeft = 0;
                  }}
                  style={{
                    backgroundColor: isActive ? colors.accentLight : "transparent",
                    color: isActive ? colors.primary : "#999",
                    border: isActive ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                    padding: isMobile ? "5px 10px" : "6px 16px",
                    borderRadius: "50px",
                    fontSize: isMobile ? "11px" : "12px",
                    fontWeight: isActive ? "700" : "500",
                    fontFamily: "Inter, sans-serif",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Card Row */}
        <div
          ref={policyScrollRef}
          onScroll={() => {
            if (!policyScrollRef.current) return;
            const el = policyScrollRef.current;
            const cardW = isMobile ? el.offsetWidth * 0.88 + 12 : 280 + 16;
            const idx = Math.round(el.scrollLeft / cardW);
            setPolicyScrollIdx(idx);
          }}
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
                  display: "flex",
                  gap: "16px",
                  overflowX: "auto",
                  paddingBottom: "12px",
                  marginBottom: "32px",
                }
          }
        >
          {filtered.map((p, i) => {
            const isExpanded = expandedCard === i;
            const badge = catBadge[p.category];
            return (
              <div
                key={i}
                onClick={() => setExpandedCard(isExpanded ? null : i)}
                style={
                  isMobile
                    ? {
                        minWidth: "88%",
                        maxWidth: "88%",
                        flexShrink: 0,
                        scrollSnapAlign: "start",
                        backgroundColor: colors.background,
                        border: `2px solid ${isExpanded ? colors.accent : colors.primary}`,
                        borderRadius: "16px",
                        padding: "24px",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        transition: "all 0.3s ease",
                      }
                    : {
                        minWidth: isExpanded ? "420px" : "280px",
                        maxWidth: isExpanded ? "420px" : "280px",
                        backgroundColor: colors.background,
                        border: `2px solid ${isExpanded ? colors.accent : colors.primary}`,
                        borderRadius: "16px",
                        padding: "24px",
                        flexShrink: 0,
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        transition: "all 0.3s ease",
                      }
                }
              >
                {/* Top row: Category badge + relevance pills */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "14px",
                    width: "100%",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "9px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: colors.primary,
                      backgroundColor: badge.bg,
                      border: `1px solid ${badge.border}`,
                      padding: "4px 10px",
                      borderRadius: "20px",
                    }}
                  >
                    {p.category}
                  </span>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {p.relevance.map((r, ri) => (
                      <span
                        key={ri}
                        style={{
                          fontFamily: "DM Sans, sans-serif",
                          fontSize: "9px",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          color: colors.primary,
                          backgroundColor: colors.accentLight,
                          padding: "3px 8px",
                          borderRadius: "10px",
                        }}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Policy name */}
                <h3
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "16px",
                    fontWeight: "700",
                    color: colors.primary,
                    margin: "0 0 10px 0",
                    lineHeight: "1.3",
                    minHeight: "42px",
                  }}
                >
                  {p.policy}
                </h3>

                {/* Allocation — plain lime text */}
                <div
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "13px",
                    fontWeight: "700",
                    color: colors.accent,
                    marginBottom: "10px",
                  }}
                >
                  {p.allocation}
                </div>

                {/* Alignment text */}
                <p
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "13px",
                    color: "#666",
                    lineHeight: "1.5",
                    margin: "0 0 16px 0",
                    minHeight: "40px",
                  }}
                >
                  {p.alignment}
                </p>

                {/* Expand hint / collapse */}
                {!isExpanded && (
                  <div
                    style={{
                      marginTop: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: "12px",
                      borderTop: `1px solid ${colors.line}`,
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "12px",
                        fontWeight: "600",
                        color: colors.primary,
                      }}
                    >
                      BRIDGE alignment
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={colors.primary}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                )}

                {/* Expanded content */}
                {isExpanded && (
                  <div
                    style={{
                      paddingTop: "16px",
                      borderTop: `1px solid ${colors.line}`,
                      width: "100%",
                      opacity: 1,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    {/* Governing body */}
                    <div
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "11px",
                        color: "#888",
                        marginBottom: "10px",
                      }}
                    >
                      {p.body}
                    </div>

                    {/* BRIDGE role */}
                    <p
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "13px",
                        color: "#444",
                        lineHeight: "1.55",
                        margin: "0 0 14px 0",
                      }}
                    >
                      {p.bridgeRole}
                    </p>

                    {/* Pillars */}
                    {p.pillars && p.pillars.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
                        {p.pillars.map((pil, pi) => (
                          <span
                            key={pi}
                            style={{
                              fontFamily: "DM Sans, sans-serif",
                              fontSize: "10px",
                              fontWeight: "600",
                              color: colors.accent,
                              backgroundColor: "rgba(184,217,53,0.12)",
                              padding: "4px 10px",
                              borderRadius: "20px",
                            }}
                          >
                            {pil}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* BRIDGE Ventures with lime dot */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {p.bridgeVentures.map((v, vi) => (
                        <div
                          key={vi}
                          style={{
                            backgroundColor: colors.primary,
                            borderRadius: "10px",
                            padding: "10px 14px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
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
                              fontFamily: "DM Sans, sans-serif",
                              fontSize: "13px",
                              fontWeight: "600",
                              color: colors.white,
                            }}
                          >
                            {v}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Collapse hint */}
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "14px" }}>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={colors.primary}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ transform: "rotate(180deg)" }}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Scroll indicators */}
        {isMobile && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "6px",
              marginTop: "16px",
              marginBottom: "32px",
            }}
          >
            {filtered.map((_, i) => (
              <div
                key={i}
                onClick={() => {
                  if (policyScrollRef.current) {
                    const cardW = policyScrollRef.current.offsetWidth * 0.88 + 12;
                    policyScrollRef.current.scrollTo({ left: cardW * i, behavior: "smooth" });
                  }
                }}
                style={{
                  width: i === policyScrollIdx ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: i === policyScrollIdx ? colors.accent : colors.line,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div
          style={{
            backgroundColor: colors.primary,
            borderRadius: "16px",
            padding: isMobile ? "20px 24px" : "28px 32px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: isMobile ? "flex-start" : "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: "16px",
            textAlign: "left",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: isMobile ? "16px" : "18px",
                fontWeight: "600",
                color: "#FFFFFF",
              }}
            >
              BRIDGE complements — never competes with — government vision.
            </div>
            <div
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: isMobile ? "13px" : "14px",
                color: "rgba(255,255,255,0.6)",
                marginTop: "4px",
              }}
            >
              Every venture aligns with at least one active government policy or initiative.
            </div>
          </div>
          <a
            href="/methodology"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "13px",
              fontWeight: "700",
              color: colors.primary,
              backgroundColor: colors.accent,
              padding: "12px 24px",
              borderRadius: "50px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              textAlign: "center",
              cursor: "pointer",
              alignSelf: isMobile ? "center" : "auto",
              display: "inline-flex",
            }}
          >
            View Partnership Strategy
          </a>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// CROSS-SECTOR / RIPPLE EFFECT SECTION
// ============================================================================

const crossSectorIcons = {
  2: <IconWallet />,
  6: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
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
  5: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  ),
  1: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
    </svg>
  ),
  3: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h5v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
    </svg>
  ),
};

const IconCpu = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M15 2v2" />
    <path d="M15 20v2" />
    <path d="M2 15h2" />
    <path d="M2 9h2" />
    <path d="M20 15h2" />
    <path d="M20 9h2" />
    <path d="M9 2v2" />
    <path d="M9 20v2" />
  </svg>
);

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
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: colors.accent,
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Inter, sans-serif",
              marginBottom: "24px",
            }}
          >
            The Ripple Effect
          </span>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
              color: colors.white,
              margin: "0 0 20px 0",
              maxWidth: "820px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            How Technology <span style={{ color: colors.accent, fontWeight: "700" }}>Amplifies Impact</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "680px",
              margin: "0 auto",
              lineHeight: "1.65",
            }}
          >
            Every technology venture creates compounding value across BRIDGE's portfolio — explore how one investment
            becomes many
          </p>
        </div>

        {/* ─── PATHWAY VISUAL ─── */}
        {isMobile ? (
          /* Mobile: Hub on top, 5 icons below */
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    backgroundColor: colors.accent,
                    color: colors.primary,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 24px rgba(184, 217, 53, 0.3)",
                    marginBottom: "6px",
                  }}
                >
                  <IconCpu />
                </div>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: colors.accent,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Technology
                </span>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
              {pathways.map((p, i) => {
                const isActive = activeNode === i;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveNode(isActive ? null : i);
                      setShowMoreRipple(false);
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px",
                      opacity: activeNode !== null && !isActive ? 0.4 : 1,
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        backgroundColor: isActive ? colors.accent : "rgba(255,255,255,0.08)",
                        border: isActive ? "none" : "1px solid rgba(255,255,255,0.1)",
                        color: isActive ? colors.primary : "rgba(255,255,255,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {p.icon}
                    </div>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "10px",
                        fontWeight: "600",
                        color: isActive ? colors.white : "rgba(255,255,255,0.5)",
                        maxWidth: "58px",
                        lineHeight: "1.2",
                        textAlign: "center",
                      }}
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
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "32px",
              marginBottom: "48px",
            }}
          >
            {/* Hub Icon — Technology */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "120px",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "20px",
                  backgroundColor: colors.accent,
                  color: colors.primary,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 30px rgba(184, 217, 53, 0.3)",
                  marginBottom: "10px",
                }}
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
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "120px",
                    cursor: "pointer",
                    opacity: isDimmed ? 0.4 : 1,
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "16px",
                      backgroundColor: isActive ? colors.accent : "rgba(255,255,255,0.08)",
                      border: isActive ? "none" : "1px solid rgba(255,255,255,0.1)",
                      color: isActive ? colors.primary : "rgba(255,255,255,0.6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      marginBottom: "10px",
                    }}
                  >
                    {p.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: isActive ? colors.white : "rgba(255,255,255,0.5)",
                      textAlign: "center",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {p.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "20px",
                      fontWeight: "700",
                      color: isActive ? colors.accent : "rgba(255,255,255,0.3)",
                      marginTop: "4px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {p.multiplier}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* ─── DETAIL PANEL ─── */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: isMobile ? "16px" : "24px",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: isMobile ? "24px" : "40px",
            minHeight: isMobile ? "auto" : "280px",
            transition: "all 0.3s ease",
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
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    width: "100%",
                    padding: "14px",
                    marginTop: "16px",
                    backgroundColor: "transparent",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: colors.white,
                    cursor: "pointer",
                  }}
                >
                  {showMoreRipple ? "Show less" : "Show synergies & ventures"}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={colors.white}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transform: showMoreRipple ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
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

const IconStorefront = () => (
  <svg
    width="24"
    height="24"
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
  </svg>
);

const IconOfficeBuilding = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
    <path d="M10 6h4" />
    <path d="M10 10h4" />
    <path d="M10 14h4" />
    <path d="M10 18h4" />
  </svg>
);

const IconLandmark = () => (
  <svg
    width="24"
    height="24"
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
  </svg>
);

const IconTrendingUp = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

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
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Section Header */}
        <div
          style={{
            textAlign: isMobile ? "center" : "left",
            marginBottom: isMobile ? "32px" : "48px",
            padding: isMobile ? "0 20px" : 0,
          }}
        >
          <span
            style={{
              display: "inline-block",
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Inter, sans-serif",
              marginBottom: "24px",
            }}
          >
            The Investment Thesis
          </span>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
              color: colors.primary,
              margin: isMobile ? "0 auto 16px" : "0 0 16px 0",
              maxWidth: "820px",
            }}
          >
            Every Stakeholder Has a Role in{" "}
            <span style={{ color: colors.accent, fontWeight: "700" }}>Digital Growth</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              color: "#666",
              lineHeight: "1.65",
              margin: isMobile ? "0 auto" : "0",
              maxWidth: "700px",
            }}
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
              <div
                style={{
                  marginTop: "16px",
                  padding: "14px 20px",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderRadius: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
                  Full financial model available
                </span>
                <a
                  href="/resources"
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "700",
                    color: colors.accent,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    flexShrink: 0,
                  }}
                >
                  Download Prospectus <span style={{ fontSize: "16px" }}>→</span>
                </a>
              </div>
            </div>
          )}

          {/* Mobile Toggle Button */}
          {isMobile && !showInvestmentDetails && (
            <button
              onClick={() => setShowInvestmentDetails(true)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "14px",
                backgroundColor: "transparent",
                border: `1px solid ${colors.line}`,
                borderRadius: "12px",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "600",
                color: colors.primary,
                cursor: "pointer",
              }}
            >
              View returns, timeline & impact
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.primary}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          )}
          {isMobile && showInvestmentDetails && (
            <button
              onClick={() => setShowInvestmentDetails(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "14px",
                backgroundColor: "transparent",
                border: `1px solid ${colors.line}`,
                borderRadius: "12px",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "600",
                color: colors.primary,
                cursor: "pointer",
              }}
            >
              Show less
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.primary}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transform: "rotate(180deg)" }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
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

const useCounter = (target, duration = 1200, active = true) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    const num = typeof target === "number" ? target : parseFloat(target);
    if (isNaN(num)) {
      setCount(0);
      return;
    }
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(ease * num);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    return () => {
      start = null;
    };
  }, [target, duration, active]);
  return count;
};

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
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "DM Sans, sans-serif",
              marginBottom: "24px",
            }}
          >
            The Impact
          </span>
          <h2
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
              color: colors.primary,
              margin: "0 0 12px 0",
              maxWidth: "900px",
            }}
          >
            What Changes When <span style={{ fontWeight: "600" }}>Digital</span>
            <br />
            <span style={{ fontWeight: "600" }}>Infrastructure</span>{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Works</span>
          </h2>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              color: "#555",
              maxWidth: "750px",
              margin: "0",
              lineHeight: "1.7",
            }}
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
            style={{
              backgroundColor: colors.background,
              borderRadius: "20px",
              border: `2px solid ${colors.primary}`,
              overflow: "hidden",
            }}
          >
            {activeMetrics.items.map((item, i) => (
              <MetricRow key={`${activeCategory}-${i}`} item={item} index={i} />
            ))}
          </div>
        )}

        {/* ===== STAKEHOLDER VIEW ===== */}
        {view === "stakeholder" && (
          <div style={{ opacity: animate ? 1 : 0, transition: "opacity 0.3s ease" }}>
            {/* Title + Stat header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: isMobile ? "flex-start" : "center",
                marginBottom: "24px",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "12px" : "0",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: isMobile ? "24px" : "28px",
                    fontWeight: "700",
                    color: colors.primary,
                    marginBottom: "4px",
                  }}
                >
                  {activeStk.title}
                </div>
                <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: "#888" }}>
                  {activeStk.subtitle}
                </div>
              </div>
              <div style={{ textAlign: isMobile ? "left" : "right" }}>
                <div
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: isMobile ? "32px" : "40px",
                    fontWeight: "700",
                    color: colors.primary,
                    letterSpacing: "-1.5px",
                    lineHeight: "1",
                  }}
                >
                  {activeStk.stat}
                </div>
                <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "12px", color: "#888", marginTop: "4px" }}>
                  {activeStk.statLabel}
                </div>
              </div>
            </div>

            {/* Outcome rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {activeStk.outcomes.map((outcome, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div
                    key={i}
                    style={{
                      padding: "14px 20px",
                      borderRadius: "12px",
                      backgroundColor: isEven ? colors.background : "transparent",
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      opacity: animate ? 1 : 0,
                      transition: `opacity 0.4s ease ${i * 0.08}s`,
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        backgroundColor: isEven ? colors.white : colors.background,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "DM Sans, sans-serif",
                          fontSize: "12px",
                          fontWeight: "700",
                          color: colors.primary,
                        }}
                      >
                        {i + 1}
                      </span>
                    </div>
                    <span
                      style={{ fontFamily: "DM Sans, sans-serif", fontSize: "15px", color: "#333", lineHeight: "1.5" }}
                    >
                      {outcome}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Key Advantage Strip */}
            <div
              style={{
                marginTop: "24px",
                padding: "16px 24px",
                backgroundColor: colors.primary,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                flexWrap: isMobile ? "wrap" : "nowrap",
                gap: isMobile ? "8px" : "16px",
              }}
            >
              <span
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "10px",
                  fontWeight: "700",
                  color: colors.accent,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  flexShrink: 0,
                }}
              >
                Key Advantage
              </span>
              <span
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                {activeStk.highlight}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// ============================================================================
// FINAL CTA SECTION
// ============================================================================

const FinalCTASection = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  return (
    <section
      style={{
        backgroundColor: colors.primary,
        padding: isMobile ? "60px 20px" : "100px 80px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <span
          style={{
            display: "inline-block",
            backgroundColor: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: colors.accent,
            padding: "10px 20px",
            borderRadius: "50px",
            fontSize: "11px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontFamily: "Inter, sans-serif",
            marginBottom: "24px",
          }}
        >
          Be Part of the Journey
        </span>

        <h2
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "32px" : "48px",
            fontWeight: "300",
            lineHeight: "1.2",
            color: colors.white,
            margin: "0 0 24px 0",
          }}
        >
          Let's Build Ghana's <span style={{ color: colors.accent, fontWeight: "700" }}>Technology</span>
        </h2>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "15px" : "18px",
            lineHeight: "1.7",
            color: "rgba(255,255,255,0.6)",
            margin: "0 0 40px 0",
            maxWidth: "680px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Whether you're an investor, partner, or government stakeholder, there's a seat at the table in building
          Ghana's digital future
        </p>

        <div
          style={{ display: "flex", gap: "16px", justifyContent: "center", flexDirection: isMobile ? "column" : "row" }}
        >
          <button
            onClick={() => navigate("/contact")}
            style={{
              backgroundColor: colors.accent,
              color: colors.primary,
              border: "none",
              padding: isMobile ? "16px 24px" : "16px 32px",
              borderRadius: "50px",
              fontSize: "15px",
              fontWeight: "600",
              fontFamily: "Inter, sans-serif",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            Start a Conversation
            <span
              style={{
                width: "28px",
                height: "28px",
                backgroundColor: colors.primary,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.white,
              }}
            >
              <IconArrowRight />
            </span>
          </button>

          <button
            onClick={() => navigate("/resources")}
            style={{
              backgroundColor: "transparent",
              color: colors.white,
              border: "1px solid rgba(255,255,255,0.3)",
              padding: isMobile ? "16px 24px" : "16px 32px",
              borderRadius: "50px",
              fontSize: "15px",
              fontWeight: "600",
              fontFamily: "Inter, sans-serif",
              cursor: "pointer",
            }}
          >
            Download Sector Brief
          </button>
        </div>
      </div>
    </section>
  );
};

// CTA-to-Footer separator
const CTAFooterSeparator = () => {
  const isMobile = useIsMobile();
  return (
    <div style={{ backgroundColor: colors.primary, padding: isMobile ? "0 20px" : "0 80px" }}>
      <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)" }} />
    </div>
  );
};

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function TechnologyInnovationSectorPage() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif", margin: 0, padding: 0, backgroundColor: colors.white }}>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Poppins:wght@700;800&display=swap"
        rel="stylesheet"
      />
      <style>{`@keyframes bounce{0%,20%,50%,80%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}60%{transform:translateY(-4px)}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>

      <SiteHeader />
      <HeroSection sector={sectorData} />
      <ProblemSection />

      {/* ★ PREMIUM VALUE CHAIN SECTION ★ */}
      <ValueChainSectionPremium />

      <SolutionsSection sector={sectorData} />
      <CompetitiveLandscapeSection sector={sectorData} />
      <PolicyCardSection />
      <CrossSectorSection />
      <InvestmentCTASection />
      <ImpactSection />
      <FinalCTASection />
      <CTAFooterSeparator />
      <SiteFooter />
    </div>
  );
}
