import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// ============================================================================
// BRIDGE SECTOR PAGE: Health Systems & Wellbeing
// PRODUCTION VERSION — Fully Mobile Responsive
// ============================================================================
// Design System: Dark Green #1B4D3E, Lime #B8D935, Off-white #F3F5F2
// Breakpoint: 768px
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
};

// ============================================================================
// RESPONSIVE HOOK
// ============================================================================

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
// SECTOR DATA
// ============================================================================

const sectorData = {
  id: 3,
  slug: "health-systems",
  name: "Health Systems & Wellbeing",
  shortName: "Health",
  category: "Essential Care",
  categoryColor: "#1B4D3E",
  capitalRange: "$12-40M",
  ventures: 19,
  jobsImpact: "32M+ citizens",
  gdpContribution: "6.9%",
  problemHeadline: "Where Every Investment Becomes a Life Transformed",
  problemSubheadline:
    "Ghana\u2019s health sector holds extraordinary potential \u2014 with 15,000+ diaspora healthcare professionals ready to reconnect, 5,000+ community health compounds positioned for strengthening, and an emerging health-tech ecosystem of 40+ startups creating new models of delivery. These are pathways where strategic investment and innovation can transform wellbeing outcomes across every region.",
  keyStats: [
    { value: "1:6,000", label: "Physician-to-Patient Ratio", detail: "1:1,000 WHO target within reach" },
    { value: "68%", label: "NHIS Enrollment", detail: "National coverage foundation" },
    { value: "9", label: "Gov't Policy Alignments", detail: "Partnership pathways mapped" },
    { value: "40+", label: "Health-Tech Startups", detail: "Growing innovation ecosystem" },
  ],
  painPoints: [
    {
      title: "Workforce Reconnection",
      description: "15,000+ diaspora healthcare professionals represent an extraordinary asset ready to reconnect.",
      rootCauses: ["Compensation alignment", "Working environment investment", "Career pathway creation"],
      quantification: "15,000+ diaspora professionals to mobilize; $270M+ training investment to recapture",
    },
    {
      title: "Health Financing",
      description: "With 68% NHIS enrollment, the foundation exists to build accessible coverage for every household.",
      rootCauses: ["Coverage expansion", "Reimbursement modernization", "Informal sector inclusion"],
      quantification: "11% of households ready for financial protection; 68% NHIS base to build on",
    },
    {
      title: "Nationwide Care Access",
      description: "60% of the population lives in areas where expanding primary care can have the greatest impact.",
      rootCauses: ["Regional expansion potential", "Facility modernization", "CHPS network strengthening"],
      quantification: "3-5x regional density gap = highest-impact investment zones",
    },
    {
      title: "Quality Elevation",
      description: "Strengthening clinical quality and supply chain integrity creates trust in the formal care system.",
      rootCauses: ["Infection prevention systems", "Equipment & supply investment", "Pharmaceutical integrity"],
      quantification: "95% of facilities addressable for quality upgrades",
    },
  ],
  solutions: [
    {
      tier: 1,
      name: "Diaspora Telemedicine Network",
      description:
        "Connecting 15,000+ diaspora health professionals with Ghana-based providers for remote specialist consultations and referrals.",
      capital: "$1-2.5M",
      score: 41,
      impact: "5,000+ consultations yearly",
      model: "Licensed telemedicine consultation platform",
    },
    {
      tier: 1,
      name: "Market Health Services Hub",
      description:
        "Integrated health services within market infrastructure \u2014 first aid stations, screening programs, and trader health education.",
      capital: "$200-500K",
      score: 41,
      impact: "Reaches 10,000+ traders",
      model: "Bundled with Kejetia Market infrastructure",
    },
    {
      tier: 1,
      name: "Diaspora Healthcare Registry",
      description:
        "Comprehensive database matching diaspora healthcare expertise with specific facility needs and regional gaps across Ghana.",
      capital: "$75-150K",
      score: 40,
      impact: "15,000+ professionals mapped",
      model: "Skills matching platform with CME incentives",
    },
    {
      tier: 1,
      name: "Community Clinic Network",
      description:
        "Primary care clinics in underserved areas with maternal and child health focus, staffed by retained Ghanaian care providers.",
      capital: "$3-8M",
      score: 39,
      impact: "25,000+ patients annually",
      model: "Community-based primary care delivery model",
    },
    {
      tier: 1,
      name: "Healthcare Worker Retention",
      description:
        "Competitive compensation and professional development pathways for 200 healthcare workers to reduce brain drain pressure.",
      capital: "$2-4M",
      score: 39,
      impact: "200 workers retained yearly",
      model: "Retention incentives and career pathways",
    },
    {
      tier: 1,
      name: "CME Education Platform",
      description:
        "Virtual continuing medical education with diaspora faculty delivering clinical updates, case conferences, and skills training.",
      capital: "$300-600K",
      score: 39,
      impact: "1,000+ clinicians upskilled",
      model: "CME credit recognition via professional councils",
    },
    {
      tier: 1,
      name: "Community Health Insurance",
      description:
        "Bundled health coverage through market associations, complementing NHIS with affordable products for informal sector workers.",
      capital: "$500K-1.5M",
      score: 38,
      impact: "Reduces catastrophic spend",
      model: "Market association distribution channels",
    },
    {
      tier: 2,
      name: "CHPS Strengthening Program",
      description:
        "Equipment upgrades, provider training, and telemedicine linkage for 50 Community-based Health Planning and Services zones.",
      capital: "$1-2M",
      score: 37,
      impact: "50 CHPS compounds upgraded",
      model: "Partnership with Ghana Health Service teams",
    },
    {
      tier: 2,
      name: "HealthTech Investment Fund",
      description:
        "Strategic investments in Ghana-based health technology startups spanning telemedicine, diagnostics, and supply chain tools.",
      capital: "$1-3M",
      score: 37,
      impact: "3-5 startups accelerated",
      model: "Leverages 40+ existing health tech startups",
    },
  ],
  competitors: [
    {
      name: "NHIA",
      focus: "National health insurance scheme and coverage framework",
      gap: "Informal sector coverage",
      year: "2003",
      funding: "Gov't",
      priority: "High",
      strengths: [
        { name: "Population Coverage", rating: 4 },
        { name: "Policy Framework", rating: 5 },
        { name: "Provider Network", rating: 4 },
      ],
      gaps: ["Informal sector product gap", "Revenue model innovation", "Market-level distribution"],
      bridgeOpportunity: "Complementary insurance products for informal sector via market associations",
    },
    {
      name: "Zipline",
      focus: "Medical drone delivery for blood and essential supplies",
      gap: "Care delivery endpoints",
      year: "2016",
      funding: "$500M+",
      priority: "High",
      strengths: [
        { name: "Drone Logistics", rating: 5 },
        { name: "Supply Delivery", rating: 5 },
        { name: "Rural Reach", rating: 4 },
      ],
      gaps: ["Care delivery endpoints", "Workforce programming", "Facility network gaps"],
      bridgeOpportunity: "Last-mile supply delivery integrated with community clinic network",
    },
    {
      name: "mPharma",
      focus: "Pharmacy network and drug access platform across Africa",
      gap: "Primary care delivery",
      year: "2013",
      funding: "$95M+",
      priority: "High",
      strengths: [
        { name: "Pharmacy Network", rating: 5 },
        { name: "Supply Chain", rating: 5 },
        { name: "Funding Scale", rating: 5 },
      ],
      gaps: ["Primary care layer", "Workforce retention", "Rural clinic reach"],
      bridgeOpportunity: "Pharmacy supply partnership for community clinic operations",
    },
    {
      name: "Bisa Health",
      focus: "Telemedicine consultations and digital health access",
      gap: "Diaspora specialist network",
      year: "2016",
      funding: "$2M+",
      priority: "Medium",
      strengths: [
        { name: "Telemedicine Platform", rating: 4 },
        { name: "User Base", rating: 3 },
        { name: "Mobile Access", rating: 4 },
      ],
      gaps: ["Diaspora specialist pool", "Scaling infrastructure", "Cross-border licensing"],
      bridgeOpportunity: "Platform integration for 15,000+ diaspora specialist consultations",
    },
    {
      name: "CHAG",
      focus: "Christian Health Association operating 35% of health facilities",
      gap: "Digital integration",
      year: "1967",
      funding: "Gov't",
      priority: "High",
      strengths: [
        { name: "Facility Network", rating: 5 },
        { name: "Rural Presence", rating: 5 },
        { name: "Community Trust", rating: 5 },
      ],
      gaps: ["Digital health tools", "Telemedicine capacity", "Supply chain tech"],
      bridgeOpportunity: "Digital health and telemedicine integration for existing facility network",
    },
    {
      name: "Ghana Health Service",
      focus: "National health service delivery and CHPS management",
      gap: "Private sector efficiency",
      year: "1996",
      funding: "Gov't",
      priority: "High",
      strengths: [
        { name: "National Authority", rating: 5 },
        { name: "CHPS Network", rating: 4 },
        { name: "Policy Alignment", rating: 5 },
      ],
      gaps: ["Private sector speed", "Innovation pipeline", "Diaspora engagement"],
      bridgeOpportunity: "Private delivery partner for CHPS strengthening and Care24 targets",
    },
  ],
  policyAlignment: [
    {
      policy: "NHIS Budget Allocation",
      allocation: "GH\u20B59.0B",
      alignment: "Provider accreditation and reimbursement framework for BRIDGE clinics",
    },
    {
      policy: "MahamaCares (Ghana Medical Trust Fund)",
      allocation: "GH\u20B52.3B",
      alignment: "PPP diagnostic center partnership pathway",
    },
    {
      policy: "Hospital Construction Programme",
      allocation: "GH\u20B5779M",
      alignment: "Infrastructure co-investment for underserved areas",
    },
    {
      policy: "Care24 Pillar - Extended Service Hours",
      allocation: "Multi-year commitment",
      alignment: "Community clinic model aligns with 24-hour service delivery",
    },
  ],
  crossSector: [
    {
      sectorId: 2,
      name: "Financial Inclusion",
      connection: "Health insurance, medical emergency fund, health savings",
    },
    { sectorId: 1, name: "Infrastructure", connection: "Market-integrated health, facility construction, WASH" },
    { sectorId: 5, name: "Education", connection: "Medical training, workforce development, health literacy" },
    { sectorId: 11, name: "Manufacturing", connection: "Pharmaceutical production, medical supplies" },
    { sectorId: 12, name: "Transportation", connection: "Medical supply distribution, patient transport" },
  ],
  relatedSectors: [
    { id: 2, name: "Financial Inclusion", icon: "wallet", reason: "Health insurance, emergency medical fund" },
    { id: 1, name: "Infrastructure", icon: "building", reason: "Market-integrated health services" },
    { id: 5, name: "Education & Skills", icon: "graduation", reason: "Medical training, workforce development" },
  ],
};

// ============================================================================
// PREMIUM VALUE CHAIN DATA
// ============================================================================

const valueChainStages = [
  {
    id: 1,
    stage: "Policy & Regulation",
    shortLabel: "Policy",
    actor: "MOH & Ghana Health Service",
    population: "12 regulatory bodies",
    icon: "policy",
    valueRetained: 100,
    valueLost: 0,
    painPoints: [
      "Budget trajectory from 6.9% toward 15% Abuja target",
      "Salary investment creates retention foundation",
      "Regional regulatory coordination opportunity",
      "12 bodies = 12 partnership entry points",
      "Data-driven policy tools to track health spending impact",
    ],
    stat: "6.9%",
    statLabel: "of health budget",
    bridgeResponse:
      "Policy advisory and government partnership strategy aligned with GH\u20B59B+ NHIS budget allocation",
    bridgeVentures: ["NHIS Accreditation Pathway", "Policy Research Advisory", "Health Budget Analytics"],
  },
  {
    id: 2,
    stage: "Workforce & Training",
    shortLabel: "Workforce",
    actor: "Healthcare Professionals",
    population: "4,850 physicians",
    icon: "workforce",
    valueRetained: 70,
    valueLost: 30,
    painPoints: [
      "56% of trained physicians abroad = 15,000+ reconnection opportunities",
      "500 nurses/month departing = retention fund case",
      "5-10x compensation gap = diaspora bridge opportunity",
      "Rural postings = highest-impact placement zones",
      "Continuing medical education as retention accelerator",
    ],
    stat: "56%",
    statLabel: "reconnection potential",
    bridgeResponse:
      "Diaspora telemedicine platform connecting 15,000+ professionals and retention fund for 200 workers",
    bridgeVentures: ["Diaspora Telemedicine", "Workforce Retention Fund", "CME Platform"],
  },
  {
    id: 3,
    stage: "Service Delivery",
    shortLabel: "Delivery",
    actor: "Facilities & Providers",
    population: "5,000+ CHPS compounds",
    icon: "hospital",
    valueRetained: 50,
    valueLost: 20,
    painPoints: [
      "95% of facilities addressable for equipment upgrades",
      "Supply chain strengthening for reliable drug access",
      "Infection prevention systems as quality foundation",
      "Facility expansion to match growing demand",
      "Telemedicine integration to extend specialist reach",
    ],
    stat: "5,000+",
    statLabel: "CHPS compounds",
    bridgeResponse: "Community clinic network in underserved areas with CHPS strengthening for 50 compounds",
    bridgeVentures: ["Community Clinic Network", "CHPS Strengthening", "Market Health Services"],
  },
  {
    id: 4,
    stage: "Health Financing",
    shortLabel: "Financing",
    actor: "NHIS & Insurance",
    population: "~68% enrolled",
    icon: "insurance",
    valueRetained: 35,
    valueLost: 15,
    painPoints: [
      "Reimbursement modernization accelerates provider participation",
      "Coverage expansion for excluded services",
      "Informal sector = largest untapped insurance market",
      "Sustainability models strengthen long-term viability",
      "Mobile payment rails enable frictionless premium collection",
    ],
    stat: "68%",
    statLabel: "coverage foundation",
    bridgeResponse: "Community health insurance via market associations, complementing NHIS for informal sector",
    bridgeVentures: ["Community Health Insurance", "Medical Emergency Fund", "Market Insurance Products"],
  },
  {
    id: 5,
    stage: "Patient Outcomes",
    shortLabel: "Outcomes",
    actor: "Citizens & Families",
    population: "32M+ population",
    icon: "patients",
    valueRetained: 25,
    valueLost: 10,
    painPoints: [
      "Wait time reduction through expanded delivery points",
      "Financial protection for the 11% most vulnerable households",
      "Regional equity as highest-return investment zones",
      "Maternal care as flagship wellbeing impact area",
      "Community health workers as last-mile connection layer",
    ],
    stat: "11%",
    statLabel: "households to protect",
    bridgeResponse: "Integrated community-based care reducing geographic barriers and financial burden on families",
    bridgeVentures: ["Healthcare Registry", "HealthTech Portfolio", "Quality Advisory"],
  },
];

// ============================================================================
// ICON COMPONENTS
// ============================================================================

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
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
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

const valueChainIcons = {
  policy: (
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
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  workforce: (
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
  ),
  hospital: (
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
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  ),
  insurance: (
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  patients: (
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
};

const crossSectorIcons = {
  3: (
    <svg
      width="28"
      height="28"
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
  2: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  ),
  1: (
    <svg
      width="22"
      height="22"
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
  5: (
    <svg
      width="22"
      height="22"
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
  11: (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M17 18h1" />
      <path d="M12 18h1" />
      <path d="M7 18h1" />
    </svg>
  ),
  12: (
    <svg
      width="22"
      height="22"
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
  ),
};

// ============================================================================
// BRIDGE LOGO (SVG)
// ============================================================================

const BridgeLogo = ({ height = 40 }) => (
  <svg height={height} viewBox="0 0 3434.33 932.3" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
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
    "About BRIDGE": "/about", "Our Approach": "/methodology", "Sectors": "/services",
    "Contact Us": "/contact", "Research & Guidance": "/services", "Venture Development": "/services",
    "Direct Investment": "/services", "Strategic Partnerships": "/services",
    "White Paper": "/resources", "Case Studies": "/resources", "Research Library": "/resources",
    "Data & Reports": "/resources", "Insights & Analysis": "/insights", "Sector Briefs": "/sectors",
    "Policy Updates": "/policy", "Annual Review": "/resources",
  };
  return map[link] || "#";
};

const sectorRoutes: Record<string, string> = {
  infra: "/sectors/infrastructure", fin: "/sectors/financial", health: "/sectors/health",
  tech: "/sectors/technology", edu: "/sectors/education", agri: "/sectors/agriculture",
  creative: "/sectors/sports", housing: "/sectors/housing", tourism: "/sectors/tourism",
  energy: "/sectors/energy", mfg: "/sectors/manufacturing", transport: "/sectors/transport",
};


// ============================================================================
// HERO SECTION — Responsive
// ============================================================================

const HeroSection = ({ sector }) => {
  const isMobile = useIsMobile();
  return (
    <section
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "80px 20px 20px" : "112px 80px 20px",
        position: "relative",
        minHeight: isMobile ? "auto" : "calc(100vh - 100px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          width: "100%",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 420px",
          gap: isMobile ? "32px" : "60px",
          alignItems: "start",
          flex: 1,
        }}
      >
        {/* Left Column */}
        <div>
          <span
            style={{
              display: "inline-block",
              backgroundColor: colors.accentLight,
              color: colors.primary,
              padding: "8px 16px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              fontFamily: "Inter, sans-serif",
              marginBottom: isMobile ? "16px" : "24px",
            }}
          >
            {sector.category}
          </span>
          <h1
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "36px" : "52px",
              fontWeight: "400",
              color: colors.primary,
              lineHeight: "1.1",
              margin: "0 0 20px 0",
              letterSpacing: "-1px",
            }}
          >
            <span style={{ fontWeight: "700" }}>Health</span> Systems &{isMobile ? " " : <br />}Wellbeing
          </h1>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "20px" : "24px",
              fontWeight: "600",
              color: colors.dark,
              margin: "0 0 16px 0",
              lineHeight: "1.3",
            }}
          >
            {sector.problemHeadline}
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              color: "#555",
              lineHeight: "1.7",
              margin: "0 0 32px 0",
              maxWidth: "540px",
            }}
          >
            {sector.problemSubheadline}
          </p>
          <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
            <button
              style={{
                backgroundColor: colors.accent,
                color: colors.primary,
                border: "none",
                padding: "16px 24px",
                borderRadius: "50px",
                fontSize: "15px",
                fontWeight: "600",
                fontFamily: "Inter, sans-serif",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                ...(isMobile ? { width: "100%", justifyContent: "center" } : {}),
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
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>
            <button
              style={{
                backgroundColor: "transparent",
                color: colors.dark,
                border: `2px solid ${colors.line}`,
                padding: "16px 24px",
                borderRadius: "50px",
                fontSize: "15px",
                fontWeight: "500",
                fontFamily: "Inter, sans-serif",
                cursor: "pointer",
                ...(isMobile ? { width: "100%", textAlign: "center" } : {}),
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
            borderRadius: isMobile ? "16px" : "20px",
            padding: isMobile ? "24px" : "32px",
          }}
        >
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
          <div
            style={{
              display: "flex",
              gap: isMobile ? "24px" : "40px",
              marginTop: "20px",
              paddingBottom: "24px",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: isMobile ? "32px" : "42px",
                  fontWeight: "700",
                  color: colors.accent,
                  fontFamily: "Inter, sans-serif",
                  lineHeight: "1",
                  margin: "0 0 8px 0",
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
                  fontSize: isMobile ? "32px" : "42px",
                  fontWeight: "700",
                  color: colors.accent,
                  fontFamily: "Inter, sans-serif",
                  lineHeight: "1",
                  margin: "0 0 8px 0",
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
          {sector.keyStats.map((stat, i) => (
            <div
              key={i}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0" }}
            >
              <div>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "rgba(255,255,255,0.8)",
                    fontFamily: "Inter, sans-serif",
                    display: "block",
                  }}
                >
                  {stat.label}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "Inter, sans-serif",
                    fontStyle: "italic",
                    marginTop: "2px",
                    display: "block",
                  }}
                >
                  {stat.detail}
                </span>
              </div>
              <span
                style={{ fontSize: "20px", fontWeight: "600", color: colors.accent, fontFamily: "Inter, sans-serif" }}
              >
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator — desktop only */}
      {!isMobile && (
        <div
          style={{
            marginTop: "auto",
            paddingTop: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            color: "#999",
          }}
        >
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#999", marginBottom: "0" }}>
            Explore Analysis
          </span>
          <div style={{ animation: "bounce 2s infinite", display: "flex" }}>
            <IconArrowDown />
          </div>
        </div>
      )}
    </section>
  );
};

// ============================================================================
// PROBLEM SECTION — Horizontal Scroll Carousel on Mobile (Pattern C)
// ============================================================================

const problemSectionData = [
  {
    id: 1,
    title: "Workforce Reconnection",
    description:
      "15,000+ Ghanaian healthcare professionals in the diaspora represent an extraordinary asset \u2014 a network of expertise ready to reconnect with the system that trained them.",
    rootCauses: [
      { title: "Compensation Alignment", description: "5-10x gap = retention fund opportunity" },
      { title: "Working Environment Investment", description: "Modern facilities attract talent" },
      { title: "Career Pathway Creation", description: "Specialization pathways retain ambition" },
      { title: "Virtuous Cycle Potential", description: "More staff \u2192 better care \u2192 more retention" },
    ],
    quantification: "15,000+ diaspora professionals to mobilize; $270M+ training investment to recapture",
    severity: "High Priority",
    severityScore: 95,
    affectedCount: "15,000+",
    affectedLabel: "professionals to reconnect",
    bridgeSolution: "Diaspora Telemedicine + Retention Fund",
  },
  {
    id: 2,
    title: "Health Financing",
    description:
      "With 68% NHIS enrollment already in place, the foundation exists to build affordable, accessible coverage that reaches every household \u2014 especially the informal sector.",
    rootCauses: [
      { title: "Coverage Expansion", description: "Addressable service gaps" },
      { title: "Reimbursement Modernization", description: "Payment system upgrades" },
      { title: "Supply Chain Strengthening", description: "Reliable drug distribution" },
      { title: "Informal Sector Inclusion", description: "Market-based insurance products" },
    ],
    quantification: "11% of households ready for financial protection; 68% NHIS base to build on",
    severity: "High Priority",
    severityScore: 100,
    affectedCount: "11%",
    affectedLabel: "of households to protect",
    bridgeSolution: "Community Health Insurance + Market Health Services",
  },
  {
    id: 3,
    title: "Nationwide Care Access",
    description:
      "60% of Ghana\u2019s population lives in areas where expanding primary care can have the greatest impact \u2014 a vast addressable network ready for community-based delivery.",
    rootCauses: [
      { title: "Regional Expansion Potential", description: "Underserved regions = highest impact" },
      { title: "Facility Modernization", description: "Equipment upgrades amplify care" },
      { title: "Transport & Telemedicine", description: "Remote delivery closes distance" },
      { title: "CHPS Network Strengthening", description: "5,000+ compounds ready for investment" },
    ],
    quantification: "3-5x regional density gap = highest-impact investment zones",
    severity: "Strategic",
    severityScore: 80,
    affectedCount: "60%",
    affectedLabel: "rural population to reach",
    bridgeSolution: "Community Clinic Network + CHPS Strengthening",
  },
  {
    id: 4,
    title: "Quality Elevation",
    description:
      "Strengthening clinical quality, infection control, and supply chain integrity creates the trust that brings communities into the formal care system.",
    rootCauses: [
      { title: "Infection Prevention Systems", description: "WASH integration opportunity" },
      { title: "Equipment & Supply Investment", description: "95% of facilities addressable" },
      { title: "Clinical Oversight Platforms", description: "Quality assurance frameworks" },
      { title: "Pharmaceutical Integrity", description: "Supply chain verification" },
    ],
    quantification: "95% of facilities addressable for quality upgrades; maternal care as flagship impact area",
    severity: "Strategic",
    severityScore: 75,
    affectedCount: "310",
    affectedLabel: "maternal lives to protect per 100K",
    bridgeSolution: "Quality Improvement Advisory + CME Platform",
  },
];

const ProblemCard = ({ problem, isExpanded, onToggle }) => {
  const isMobile = useIsMobile();

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
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "16px" : "18px",
              fontWeight: "600",
              color: colors.dark,
              margin: 0,
            }}
          >
            {problem.title}
          </h3>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "13px" : "14px",
              color: "#666",
              margin: "8px 0 0 0",
              lineHeight: "1.55",
              ...(isMobile ? {} : { minHeight: "63px" }),
              display: "-webkit-box",
              WebkitLineClamp: isMobile ? 2 : 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {problem.description}
          </p>
        </div>

        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            fontWeight: "700",
            color: problem.severity === "High Priority" ? colors.primary : colors.accentText,
            backgroundColor: problem.severity === "High Priority" ? colors.accentLight : "rgba(184,217,53,0.12)",
            padding: "6px 14px",
            borderRadius: "20px",
            whiteSpace: "nowrap",
            flexShrink: 0,
            marginLeft: "12px",
          }}
        >
          {problem.severity}
        </span>
      </div>

      <div
        style={{
          backgroundColor: colors.accentLight,
          padding: isMobile ? "8px 12px" : "10px 16px",
          borderRadius: "12px",
          marginBottom: isExpanded ? "16px" : 0,
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "13px" : "14px",
            fontWeight: "600",
            color: colors.primary,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          Impact: {problem.quantification}
        </span>
      </div>

      {isExpanded && (
        <div
          style={{
            paddingTop: "16px",
            borderTop: `1px solid ${colors.line}`,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                backgroundColor: colors.background,
                borderRadius: "12px",
                padding: "14px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
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
                  Priority
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    fontWeight: "700",
                    color: problem.severity === "High Priority" ? colors.primary : colors.accentText,
                    backgroundColor:
                      problem.severity === "High Priority" ? colors.accentLight : "rgba(184,217,53,0.12)",
                    padding: "4px 10px",
                    borderRadius: "20px",
                  }}
                >
                  {problem.severity}
                </span>
              </div>
              <div
                style={{
                  height: "8px",
                  backgroundColor: colors.line,
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${problem.severityScore}%`,
                    backgroundColor: problem.severity === "High Priority" ? colors.primary : colors.accentText,
                    borderRadius: "4px",
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                backgroundColor: colors.background,
                borderRadius: "12px",
                padding: "14px",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  color: "#888",
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                Scale
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: isMobile ? "20px" : "24px",
                    fontWeight: "700",
                    color: colors.primary,
                  }}
                >
                  {problem.affectedCount}
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    color: "#666",
                  }}
                >
                  {problem.affectedLabel}
                </span>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
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
                Opportunity Drivers
              </span>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "10px",
              }}
            >
              {problem.rootCauses.map((cause, j) => (
                <div
                  key={j}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    backgroundColor: colors.background,
                    borderRadius: "12px",
                    padding: isMobile ? "10px 12px" : "12px 14px",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      backgroundColor: colors.primary,
                      borderRadius: "50%",
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
                      {j + 1}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1px",
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: isMobile ? "13px" : "14px",
                        fontWeight: "600",
                        color: colors.dark,
                      }}
                    >
                      {cause.title}
                    </span>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        color: "#888",
                      }}
                    >
                      {cause.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "center",
              gap: isMobile ? "8px" : "16px",
              paddingTop: "16px",
              borderTop: `1px solid ${colors.line}`,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  color: "#888",
                }}
              >
                BRIDGE Solution:
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0, flex: 1 }}>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: colors.primary,
                  flex: 1,
                  minWidth: 0,
                }}
              >
                {problem.bridgeSolution}
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: colors.primary,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  flexShrink: 0,
                }}
              >
                View
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProblemSection = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const isMobile = useIsMobile();

  return (
    <section style={{ backgroundColor: colors.background, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: colors.white,
              color: colors.primary,
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Inter, sans-serif",
              marginBottom: "24px",
              border: `1px solid ${colors.line}`,
            }}
          >
            The Opportunity
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
              maxWidth: "820px",
            }}
          >
            <span style={{ fontWeight: "700" }}>5,000+ CHPS</span> compounds ready to become Ghana's{" "}
            <span style={{ fontWeight: "600", color: colors.accent }}>care foundation</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              color: "#666",
              margin: 0,
              lineHeight: "1.65",
              maxWidth: "680px",
            }}
          >
            Ghana's health sector presents four interconnected opportunity areas — each one a pathway where targeted
            investment and innovation can create compounding impact.
          </p>
        </div>

        <div
          className={isMobile ? "hide-scrollbar" : ""}
          style={
            isMobile
              ? {
                  display: "flex",
                  gap: "12px",
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  margin: "0 -20px",
                  padding: "0 20px",
                }
              : {
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "24px",
                }
          }
        >
          {problemSectionData.map((problem, i) => (
            <div
              key={problem.id}
              style={isMobile ? { minWidth: "85%", maxWidth: "85%", flexShrink: 0, scrollSnapAlign: "start" } : {}}
            >
              <ProblemCard
                problem={problem}
                isExpanded={expandedCard === i}
                onToggle={() => setExpandedCard(expandedCard === i ? null : i)}
              />
            </div>
          ))}
        </div>

        {isMobile && (
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "16px" }}>
            {problemSectionData.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === 0 ? "24px" : "8px",
                  height: "8px",
                  borderRadius: i === 0 ? "4px" : "50%",
                  backgroundColor: i === 0 ? colors.accent : "#ddd",
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
// VALUE CHAIN SECTION — Compact stage nav on mobile, progressive disclosure
// ============================================================================

const ValueChainSectionPremium = () => {
  const isMobile = useIsMobile();
  const [activeStage, setActiveStage] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const stage = valueChainStages[activeStage];

  const getBarColor = (val) => {
    if (val >= 70) return colors.accent;
    if (val >= 40) return "#F59E0B";
    return "#FF7B7B";
  };

  return (
    <section
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "60px 20px" : "100px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {!isMobile && (
        <>
          <div
            style={{
              position: "absolute",
              top: "-200px",
              right: "-200px",
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              border: "1px solid rgba(27, 77, 62, 0.04)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-300px",
              left: "-100px",
              width: "800px",
              height: "800px",
              borderRadius: "50%",
              border: "1px solid rgba(27, 77, 62, 0.03)",
            }}
          />
        </>
      )}
      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "50px" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: colors.white,
              color: colors.primary,
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Inter, sans-serif",
              marginBottom: "24px",
              border: `1px solid ${colors.line}`,
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
              margin: "0 auto 20px auto",
              letterSpacing: "-0.5px",
              lineHeight: "1.2",
              maxWidth: "600px",
            }}
          >
            Mapping the Pathway to Better{" "}
            <span style={{ fontWeight: "700", color: colors.accent }}>Patient Outcomes</span>
          </h2>
          {!isMobile && (
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                color: "#666",
                margin: "0 auto",
                maxWidth: "750px",
                lineHeight: "1.65",
              }}
            >
              Tracing how care reaches communities — and where strategic resources and innovation create compounding
              value at every stage.
            </p>
          )}
        </div>

        {/* Stage Cards — compact on mobile */}
        {isMobile ? (
          <div
            style={{
              display: "flex",
              gap: "6px",
              justifyContent: "center",
              flexWrap: "nowrap",
              marginBottom: "24px",
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {valueChainStages.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveStage(i);
                  setShowMore(false);
                }}
                style={{
                  backgroundColor: activeStage === i ? colors.primary : colors.background,
                  color: activeStage === i ? colors.white : colors.primary,
                  border: activeStage === i ? "none" : `1px solid ${colors.line}`,
                  borderRadius: "50px",
                  padding: "8px 14px",
                  fontSize: "12px",
                  fontWeight: "600",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {s.shortLabel}
              </button>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", gap: "10px", marginBottom: "34px", alignItems: "stretch" }}>
            {valueChainStages.map((s, i) => (
              <div
                key={s.id}
                onClick={() => setActiveStage(i)}
                style={{
                  flex: 1,
                  minHeight: "200px",
                  backgroundColor: activeStage === i ? "rgba(184, 217, 53, 0.1)" : colors.background,
                  borderRadius: "16px",
                  padding: "20px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  border: activeStage === i ? `2px solid ${colors.accent}` : `2px solid ${colors.primary}`,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: colors.primary,
                      lineHeight: "1.3",
                      flex: 1,
                    }}
                  >
                    {s.stage}
                  </div>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      backgroundColor: activeStage === i ? colors.accent : "rgba(0,0,0,0.04)",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: activeStage === i ? colors.primary : "#999",
                      flexShrink: 0,
                      transition: "all 0.3s ease",
                    }}
                  >
                    <span style={{ transform: "scale(0.7)", display: "flex" }}>{valueChainIcons[s.icon]}</span>
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    color: "#999",
                    lineHeight: "1.3",
                    marginBottom: "auto",
                  }}
                >
                  {s.actor}
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    paddingTop: "14px",
                    borderTop: `1px solid ${activeStage === i ? "rgba(184,217,53,0.3)" : "rgba(0,0,0,0.06)"}`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "24px",
                      fontWeight: "700",
                      color: colors.primary,
                      lineHeight: "1",
                    }}
                  >
                    {s.stat}
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#999", marginTop: "2px" }}>
                    {s.statLabel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detail Panel */}
        <div
          style={{
            borderRadius: isMobile ? "16px" : "20px",
            overflow: "hidden",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            ...(isMobile ? {} : { height: "460px" }),
            border: `2px solid ${colors.primary}`,
          }}
        >
          {/* LEFT — Dark Green */}
          <div
            style={{
              backgroundColor: colors.primary,
              padding: isMobile ? "24px" : "36px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ marginBottom: isMobile ? "20px" : "28px" }}>
              <div
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: colors.accent,
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: colors.primary,
                    }}
                  >
                    {valueChainIcons[stage.icon]}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: isMobile ? "16px" : "18px",
                        fontWeight: "600",
                        color: colors.white,
                      }}
                    >
                      {stage.stage}
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.45)",
                        marginTop: "2px",
                      }}
                    >
                      {stage.actor} · {stage.population}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: isMobile ? "24px" : "32px",
                      fontWeight: "700",
                      color: colors.accent,
                      lineHeight: "1",
                    }}
                  >
                    {stage.valueRetained}%
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      fontWeight: "600",
                      color: "rgba(255,255,255,0.35)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginTop: "4px",
                    }}
                  >
                    Readiness
                  </div>
                </div>
              </div>
              <div
                style={{
                  height: "4px",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${stage.valueRetained}%`,
                    backgroundColor: colors.accent,
                    borderRadius: "2px",
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "20px",
              }}
            >
              Where We See Potential
            </div>
            {/* Pain points: show 3 on mobile initially, all on desktop */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
              {(isMobile && !showMore ? stage.painPoints.slice(0, 3) : stage.painPoints).map((point, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: isMobile ? "center" : "flex-start",
                    gap: isMobile ? "10px" : "12px",
                  }}
                >
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      backgroundColor: "rgba(255,255,255,0.06)",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "11px",
                      fontWeight: "700",
                      color: colors.accent,
                    }}
                  >
                    {i + 1}
                  </div>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: isMobile ? "13px" : "14px",
                      color: "rgba(255,255,255,0.75)",
                      lineHeight: isMobile ? "1.3" : "1.5",
                      ...(isMobile ? { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } : {}),
                    }}
                  >
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — White */}
          <div
            style={{
              backgroundColor: colors.white,
              padding: isMobile ? "24px" : "36px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                color: colors.primary,
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              BRIDGE Response
            </div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "15px",
                color: "#555",
                lineHeight: "1.7",
                margin: "0 0 24px 0",
                minHeight: isMobile ? "auto" : "52px",
              }}
            >
              {stage.bridgeResponse}
            </p>
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "#BBB",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "12px",
                }}
              >
                Linked Ventures
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {stage.bridgeVentures.map((v, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: colors.accent,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: colors.primary,
                      }}
                    >
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Readiness mini chart */}
            {(!isMobile || showMore) && (
              <div
                style={{
                  backgroundColor: colors.background,
                  borderRadius: "14px",
                  padding: "18px 20px",
                  marginTop: "auto",
                }}
              >
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    color: "#999",
                    marginBottom: "14px",
                  }}
                >
                  Readiness Across Stages
                </div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "48px" }}>
                  {valueChainStages.map((s, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "100%",
                        justifyContent: "flex-end",
                        gap: "4px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "10px",
                          fontWeight: "700",
                          color: i === activeStage ? getBarColor(s.valueRetained) : "#CCC",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {s.valueRetained}%
                      </span>
                      <div
                        style={{
                          width: "100%",
                          height: `${(s.valueRetained / 100) * 100}%`,
                          backgroundColor: i === activeStage ? getBarColor(s.valueRetained) : "#E5E7EB",
                          borderRadius: "4px 4px 2px 2px",
                          transition: "all 0.5s ease",
                          minHeight: "4px",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "6px", marginTop: "6px" }}>
                  {valueChainStages.map((s, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        textAlign: "center",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "9px",
                        color: i === activeStage ? colors.primary : "#BBB",
                        fontWeight: i === activeStage ? "600" : "400",
                        letterSpacing: "0.3px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {s.stage.split(" ")[0]}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Mobile show more */}
            {isMobile && (
              <button
                onClick={() => setShowMore(!showMore)}
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
                {showMore ? "Show less" : "Show more details"}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={colors.primary}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transform: showMore ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SOLUTIONS SECTION — Smart default filter + carousel on mobile
// ============================================================================

const SolutionsSection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [activeTier, setActiveTier] = useState(isMobile ? "1" : "all");

  const filteredSolutions =
    activeTier === "all" ? sector.solutions : sector.solutions.filter((s) => s.tier === parseInt(activeTier));

  return (
    <section
      style={{ backgroundColor: colors.primary, padding: isMobile ? "60px 20px" : "100px 80px", position: "relative" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "flex-end",
            marginBottom: isMobile ? "32px" : "48px",
            gap: isMobile ? "24px" : "0",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-block",
                backgroundColor: "rgba(255,255,255,0.08)",
                color: colors.accent,
                padding: "10px 20px",
                borderRadius: "50px",
                fontSize: "11px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontFamily: "Inter, sans-serif",
                marginBottom: "24px",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              The Pathway to Impact
            </span>
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? "28px" : "42px",
                fontWeight: "300",
                color: colors.white,
                margin: "0 0 20px 0",
                letterSpacing: "-0.5px",
                lineHeight: "1.2",
                maxWidth: "900px",
              }}
            >
              Creating Ventures That Strengthen{" "}
              <span style={{ fontWeight: "600", color: colors.accent }}>Lasting Care</span>
            </h2>
            {!isMobile && (
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.6)",
                  margin: 0,
                  maxWidth: "700px",
                  lineHeight: "1.65",
                }}
              >
                Each venture is scored using the BRIDGE Impact Score (BIS) across policy alignment, economic viability,
                and Peace & Prosperity outcomes.
              </p>
            )}
            {isMobile && (
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.5)",
                  margin: 0,
                  lineHeight: "1.55",
                }}
              >
                Ventures scored across policy alignment, viability, and Peace & Prosperity outcomes.
              </p>
            )}
          </div>
          <div
            style={{
              display: "inline-flex",
              gap: "4px",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50px",
              padding: "4px",
            }}
          >
            {[
              { key: "all", label: "All" },
              { key: "1", label: "Flagship" },
              { key: "2", label: "Scaling" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTier(key)}
                style={{
                  backgroundColor: activeTier === key ? colors.accent : "transparent",
                  color: activeTier === key ? colors.primary : "rgba(255,255,255,0.6)",
                  border: "none",
                  padding: isMobile ? "6px 14px" : "6px 16px",
                  borderRadius: "50px",
                  fontSize: "12px",
                  fontWeight: activeTier === key ? "700" : "500",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Solutions cards: Carousel on mobile, Grid on desktop */}
        <div
          className={isMobile ? "hide-scrollbar" : ""}
          style={
            isMobile
              ? {
                  display: "flex",
                  gap: "12px",
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  margin: "0 -20px",
                  padding: "0 20px",
                }
              : {
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "20px",
                }
          }
        >
          {filteredSolutions.map((solution, i) => (
            <div
              key={i}
              style={{
                backgroundColor: colors.white,
                borderRadius: "16px",
                padding: isMobile ? "24px" : "28px",
                border: "1px solid rgba(0,0,0,0.06)",
                display: "flex",
                flexDirection: "column",
                minHeight: isMobile ? "300px" : "340px",
                ...(isMobile ? { minWidth: "80%", maxWidth: "80%", flexShrink: 0, scrollSnapAlign: "start" } : {}),
              }}
            >
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}
              >
                <span
                  style={{
                    backgroundColor: solution.tier === 1 ? "rgba(184, 217, 53, 0.2)" : "rgba(0,0,0,0.05)",
                    color: solution.tier === 1 ? colors.primary : "#888",
                    padding: "6px 14px",
                    borderRadius: "50px",
                    fontSize: "11px",
                    fontWeight: "700",
                    fontFamily: "Inter, sans-serif",
                    letterSpacing: "0.3px",
                  }}
                >
                  {solution.tier === 1 ? "Flagship" : "Scaling"}
                </span>
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "15px",
                    fontWeight: "700",
                    color: colors.primary,
                  }}
                >
                  {solution.score}
                  <span style={{ color: "#ccc", fontWeight: "500" }}>/50</span>
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: isMobile ? "17px" : "19px",
                  fontWeight: "600",
                  color: colors.primary,
                  margin: "0 0 12px 0",
                  lineHeight: "1.3",
                }}
              >
                {solution.name}
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  color: "#666",
                  margin: "0",
                  lineHeight: "1.65",
                  flex: 1,
                }}
              >
                {solution.description}
              </p>
              <div
                style={{
                  backgroundColor: colors.background,
                  borderRadius: "10px",
                  padding: "10px 14px",
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  border: "1px solid rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    borderRight: "1px solid rgba(0,0,0,0.08)",
                    paddingRight: "14px",
                    width: "90px",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "9px",
                      color: "#999",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "2px",
                    }}
                  >
                    Capital
                  </div>
                  <div
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: isMobile ? "13px" : "15px",
                      fontWeight: "700",
                      color: colors.primary,
                      lineHeight: "1.1",
                    }}
                  >
                    {solution.capital}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "9px",
                      color: "#999",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "2px",
                    }}
                  >
                    Impact
                  </div>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      color: colors.primary,
                      fontWeight: "500",
                      lineHeight: "1.25",
                    }}
                  >
                    {solution.impact}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators — mobile */}
        {isMobile && (
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "16px" }}>
            {filteredSolutions.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === 0 ? "24px" : "8px",
                  height: "8px",
                  borderRadius: i === 0 ? "4px" : "50%",
                  backgroundColor: i === 0 ? colors.accent : "rgba(255,255,255,0.2)",
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
// COMPETITIVE LANDSCAPE — Split-panel analysis with summary grid
// ============================================================================

const StrengthBar = ({ rating }) => (
  <div style={{ display: "flex", gap: "3px", flexShrink: 0 }}>
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
  const comp = competitors[currentIndex];
  const total = competitors.length;

  const goTo = (dir) => {
    setIsExpanded(false);
    setCurrentIndex(dir === "prev" ? (currentIndex - 1 + total) % total : (currentIndex + 1) % total);
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
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <h3
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "18px",
            fontWeight: "600",
            color: colors.dark,
            margin: 0,
            lineHeight: "1.3",
          }}
        >
          {comp.name}
        </h3>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            fontWeight: "600",
            color: comp.priority === "High" ? colors.primary : "#999",
            backgroundColor: colors.accentLight,
            padding: "4px 14px",
            borderRadius: "20px",
            whiteSpace: "nowrap",
            flexShrink: 0,
            marginLeft: "12px",
          }}
        >
          {comp.priority === "High" ? "HIGH PRIORITY" : "MEDIUM"}
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
        {comp.focus}
      </p>
      {/* Strengths */}
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "10px",
          fontWeight: "700",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          color: colors.accent,
          marginBottom: "14px",
        }}
      >
        Strengths
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: isExpanded ? "24px" : "20px" }}
      >
        {comp.strengths.map((s, j) => (
          <div key={j} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#666" }}>{s.name}</span>
            <StrengthBar rating={s.rating} />
          </div>
        ))}
      </div>

      {/* Expanded: gaps + opportunity */}
      {isExpanded && (
        <>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "10px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              color: "#888",
              marginBottom: "12px",
            }}
          >
            Where BRIDGE Helps
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
            {comp.gaps.map((gap, j) => (
              <div key={j} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: colors.accent, fontSize: "12px", flexShrink: 0 }}>{"\u2022"}</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#666", lineHeight: "1.4" }}>
                  {gap}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              backgroundColor: colors.accentLight,
              borderRadius: "12px",
              padding: "16px",
              border: `1px solid ${colors.accent}`,
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "10px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: colors.primary,
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span
                style={{
                  width: "18px",
                  height: "18px",
                  borderRadius: "50%",
                  backgroundColor: colors.accent,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  color: colors.primary,
                }}
              >
                {"\u2726"}
              </span>
              BRIDGE Opportunity
            </div>
            <div
              style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: colors.primary, lineHeight: "1.5" }}
            >
              {comp.bridgeOpportunity}
            </div>
          </div>
        </>
      )}

      {/* Footer: nav + analysis toggle */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "16px",
          borderTop: `1px solid ${colors.line}`,
          marginTop: "auto",
        }}
      >
        {!hiddenNav ? (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={() => goTo("prev")}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: `1px solid ${colors.line}`,
                backgroundColor: colors.white,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#999",
                fontSize: "14px",
              }}
            >
              {"\u2039"}
            </button>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#999" }}>
              {currentIndex + 1} / {total}
            </span>
            <button
              onClick={() => goTo("next")}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: colors.primary,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.white,
                fontSize: "14px",
              }}
            >
              {"\u203A"}
            </button>
          </div>
        ) : (
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#999" }}>
            {currentIndex + 1} / {total}
          </span>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: "none",
            border: `1px solid ${colors.line}`,
            borderRadius: "8px",
            padding: "8px 14px",
            cursor: "pointer",
            fontFamily: "Inter, sans-serif",
            fontSize: "13px",
            color: "#666",
            fontWeight: "500",
          }}
        >
          {isExpanded ? "Less" : "Analysis"}
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
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

  const competitors = sector.competitors;
  const comp = competitors[activeCompetitorIndex];

  const shortNames = ["NHIA", "Zipline", "mPharma", "Bisa Health", "CHAG", "Ghana Health Svc"];
  const shortDescs = [
    "National health insurance scheme and coverage framework",
    "Medical drone delivery for blood and essential supplies",
    "Pharmacy network and drug access platform across Africa",
    "Telemedicine consultations and digital health access",
    "Christian Health Association operating 35% of facilities",
    "National health service delivery and CHPS management",
  ];
  const vsLabels = ["NHIA", "Zipline", "mPharma", "Bisa Health", "CHAG", "GHS"];

  const positionData = [
    {
      headline: "Complements national coverage with informal sector products",
      bullets: [
        { label: "Market Insurance", detail: "Trader association products" },
        { label: "Revenue Innovation", detail: "Self-sustaining models" },
        { label: "Distribution Channel", detail: "Kejetia market network" },
        { label: "Data Integration", detail: "NHIS-compatible records" },
      ],
    },
    {
      headline: "Adds care delivery endpoints to drone supply network",
      bullets: [
        { label: "Clinic Network", detail: "Community delivery points" },
        { label: "Workforce Pipeline", detail: "Trained health workers" },
        { label: "Demand Generation", detail: "Patient referral system" },
        { label: "Rural Facilities", detail: "CHPS compound upgrades" },
      ],
    },
    {
      headline: "Extends pharmacy supply into primary care delivery",
      bullets: [
        { label: "Clinic Integration", detail: "Community care layer" },
        { label: "Workforce Retention", detail: "Provider support fund" },
        { label: "Rural Distribution", detail: "Beyond pharmacy reach" },
        { label: "Insurance Products", detail: "Affordability bridge" },
      ],
    },
    {
      headline: "Connects diaspora specialist network to telemedicine platform",
      bullets: [
        { label: "Specialist Pool", detail: "15,000+ professionals" },
        { label: "CME Platform", detail: "Continuing education" },
        { label: "Scale Infrastructure", detail: "Multi-facility rollout" },
        { label: "Licensing Support", detail: "Cross-border practice" },
      ],
    },
    {
      headline: "Adds digital health tools to existing facility network",
      bullets: [
        { label: "Telemedicine Layer", detail: "Diaspora consultations" },
        { label: "Supply Chain Tech", detail: "Inventory management" },
        { label: "Health Records", detail: "Digital patient data" },
        { label: "Training Platform", detail: "CME for rural staff" },
      ],
    },
    {
      headline: "Private delivery partner for CHPS and Care24 targets",
      bullets: [
        { label: "Innovation Pipeline", detail: "Health-tech ventures" },
        { label: "Diaspora Engagement", detail: "Workforce return paths" },
        { label: "Speed to Market", detail: "Private sector agility" },
        { label: "Co-Investment", detail: "Capital alongside gov." },
      ],
    },
  ];

  const pos = positionData[activeCompetitorIndex];

  const handleCompetitorChange = (idx) => {
    setActiveCompetitorIndex(idx);
    setShowMoreComp(false);
  };

  return (
    <section style={{ backgroundColor: colors.background, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: colors.white,
              color: colors.primary,
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Inter, sans-serif",
              marginBottom: "24px",
              border: `1px solid ${colors.line}`,
            }}
          >
            The Landscape
          </span>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              color: colors.primary,
              margin: "0 0 16px 0",
              letterSpacing: "-0.5px",
              lineHeight: "1.2",
            }}
          >
            Building With Ghana{"\u2019"}s{" "}
            <span style={{ fontWeight: "600", color: colors.accent }}>Health Champions</span>
          </h2>
          {!isMobile && (
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                color: "#666",
                margin: 0,
                maxWidth: "750px",
                lineHeight: "1.65",
              }}
            >
              NHIA, Zipline, mPharma, and CHAG anchor Ghana{"\u2019"}s health delivery. BRIDGE integrates community
              health financing with supply chain innovation — combining access with affordability.
            </p>
          )}
        </div>

        {/* Mobile: Horizontal scroll pills */}
        {isMobile && (
          <div style={{ display: "flex", justifyContent: "flex-start", margin: "0 -20px 16px", padding: "0 20px" }}>
            <div
              className="hide-scrollbar"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                border: `1px solid ${colors.line}`,
                borderRadius: "50px",
                padding: "4px",
                backgroundColor: colors.white,
                overflowX: "auto",
                WebkitOverflowScrolling: "touch",
                maxWidth: "100%",
              }}
            >
              {competitors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => handleCompetitorChange(i)}
                  style={{
                    backgroundColor: activeCompetitorIndex === i ? colors.accentLight : "transparent",
                    color: activeCompetitorIndex === i ? colors.primary : "#999",
                    border: activeCompetitorIndex === i ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                    padding: "5px 8px",
                    borderRadius: "50px",
                    fontSize: "10px",
                    fontWeight: activeCompetitorIndex === i ? "700" : "500",
                    fontFamily: "Inter, sans-serif",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                  }}
                >
                  {shortNames[i]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Split Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
            gap: "20px",
            alignItems: "end",
          }}
        >
          {/* LEFT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <CompetitorAnalysisCard
              competitors={competitors}
              currentIndex={activeCompetitorIndex}
              setCurrentIndex={handleCompetitorChange}
              hiddenNav={isMobile}
            />

            {/* Mobile: "See BRIDGE's Position" toggle */}
            {isMobile && !showMoreComp && (
              <button
                onClick={() => setShowMoreComp(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "14px",
                  backgroundColor: colors.primary,
                  border: "none",
                  borderRadius: "12px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: colors.white,
                  cursor: "pointer",
                }}
              >
                See BRIDGE{"\u2019"}s Position
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
                }}
              >
                {/* Position header */}
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
                    BRIDGE{"\u2019"}S POSITION
                  </span>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "11px",
                      fontWeight: "600",
                      color: colors.accent,
                      backgroundColor: "rgba(184,217,53,0.12)",
                      padding: "4px 12px",
                      borderRadius: "20px",
                    }}
                  >
                    vs {vsLabels[activeCompetitorIndex]}
                  </span>
                </div>
                {/* Headline */}
                <h4
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "17px",
                    fontWeight: "600",
                    color: colors.white,
                    lineHeight: "1.4",
                    margin: "0 0 18px 0",
                    minHeight: "48px",
                  }}
                >
                  {pos.headline}
                </h4>
                {/* Bullet grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: isMobile ? "8px" : "12px" }}>
                  {pos.bullets.map((b, i) => (
                    <div
                      key={i}
                      style={{ backgroundColor: "rgba(255,255,255,0.06)", borderRadius: "12px", padding: "14px 16px" }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                        <span
                          style={{
                            width: "7px",
                            height: "7px",
                            borderRadius: "50%",
                            backgroundColor: colors.accent,
                            flexShrink: 0,
                            marginTop: "5px",
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "13px",
                              fontWeight: "600",
                              color: colors.white,
                              marginBottom: "2px",
                            }}
                          >
                            {b.label}
                          </div>
                          <div
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "13px",
                              color: "rgba(255,255,255,0.4)",
                            }}
                          >
                            {b.detail}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Summary Grid (desktop only) */}
          {!isMobile && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
              {competitors.map((c, i) => (
                <div
                  key={i}
                  onClick={() => handleCompetitorChange(i)}
                  style={{
                    backgroundColor: colors.white,
                    borderRadius: "16px",
                    padding: "24px",
                    border: activeCompetitorIndex === i ? `2px solid ${colors.primary}` : `1px solid ${colors.line}`,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "210px",
                  }}
                >
                  {/* Name + funding badge */}
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
                        fontFamily: "Inter, sans-serif",
                        fontSize: "11px",
                        fontWeight: "600",
                        color: colors.primary,
                        backgroundColor: colors.accentLight,
                        padding: "3px 10px",
                        borderRadius: "12px",
                        flexShrink: 0,
                        marginLeft: "12px",
                      }}
                    >
                      {c.funding}
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
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#555",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      {c.strengths[0].name}
                    </span>
                    <StrengthBar rating={c.strengths[0].rating} />
                  </div>
                  {/* Footer */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "auto",
                      paddingTop: "14px",
                      borderTop: `1px solid ${colors.line}`,
                    }}
                  >
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#ccc" }}>
                      Est. {c.year}
                    </span>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "11px",
                        fontWeight: "600",
                        color: c.priority === "High" ? colors.primary : "#999",
                        opacity: c.priority === "High" ? 1 : 0.6,
                      }}
                    >
                      {c.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// GOVERNANCE & POLICY — Horizontal scrollable expandable cards
// ============================================================================

const policyData = [
  {
    policy: "National Health Insurance Scheme",
    body: "National Health Insurance Authority",
    allocation: "GH\u20B59,000M",
    categories: ["funding"],
    relevance: ["primary", "pharma"],
    alignment:
      "Primary health financing mechanism covering 68% of the population with provider accreditation framework.",
    bridgeRole:
      "Provider accreditation pathway for BRIDGE community clinics and telemedicine platform licensing under NHIS reimbursement.",
    bridgeVentures: ["Community Clinic Network", "Community Health Insurance", "Telemedicine Platform"],
    pillars: ["Universal Health Coverage", "Provider Accreditation"],
  },
  {
    policy: "MahamaCares Medical Trust",
    body: "Ministry of Health",
    allocation: "GH\u20B52,300M",
    categories: ["infrastructure", "partnerships"],
    relevance: ["specialty"],
    alignment: "PPP diagnostic center network expanding access to laboratory and imaging services across all regions.",
    bridgeRole:
      "Direct PPP partnership for diagnostic service integration within BRIDGE clinic network and referral pathways.",
    bridgeVentures: ["Diagnostic Lab Network", "Community Clinic Network"],
    pillars: ["PPP Framework", "Diagnostic Access"],
  },
  {
    policy: "Care24 Extended Service Hours",
    body: "24-Hour Economy Authority",
    allocation: "Multi-year commitment",
    categories: ["partnerships"],
    relevance: ["primary"],
    alignment:
      "Extending healthcare delivery hours as part of the 24-Hour Economy programme for continuous care access.",
    bridgeRole:
      "Community clinic model designed for extended hours aligns directly with Care24 service delivery vision.",
    bridgeVentures: ["Community Clinic Network", "Market Health Services Hub"],
    pillars: ["24-Hour Economy", "Extended Care"],
  },
  {
    policy: "CHPS Expansion & Revitalization",
    body: "Ghana Health Service",
    allocation: "GH\u20B5450M",
    categories: ["infrastructure"],
    relevance: ["primary"],
    alignment: "Strengthening 5,000+ CHPS compounds with equipment, staffing, and service delivery improvements.",
    bridgeRole:
      "CHPS Strengthening Program provides equipment upgrades, telemedicine links, and training for 50 compounds.",
    bridgeVentures: ["CHPS Strengthening Program", "Telemedicine Platform"],
    pillars: ["Primary Health Care", "Rural Access"],
  },
  {
    policy: "Health Workforce Compensation",
    body: "Ghana Health Service",
    allocation: "GH\u20B56,400M",
    categories: ["funding", "partnerships"],
    relevance: ["primary", "specialty"],
    alignment: "71% of health budget allocated to salaries — constraining service improvement and retention funding.",
    bridgeRole:
      "Retention Fund complements government compensation with professional development, CME, and diaspora pathways.",
    bridgeVentures: ["Healthcare Worker Retention Fund", "CME Education Platform"],
    pillars: ["Workforce Retention", "Professional Development"],
  },
  {
    policy: "Health Training Institutions",
    body: "Ministry of Education / MOH",
    allocation: "GH\u20B5250M",
    categories: ["partnerships"],
    relevance: ["specialty"],
    alignment: "Medical and nursing school operations and expansion to address critical workforce gaps nationwide.",
    bridgeRole:
      "Diaspora faculty partnerships for clinical training, medical curriculum development, and nursing school support.",
    bridgeVentures: ["Nursing School Partnership", "CME Education Platform"],
    pillars: ["Medical Education", "Diaspora Faculty"],
  },
  {
    policy: "Tax Incentives for Health Investment",
    body: "Ghana Revenue Authority / GIPC",
    allocation: "Various exemptions",
    categories: ["funding"],
    relevance: ["pharma"],
    alignment: "Import duty exemptions on medical equipment and tax holidays for health sector investments under GIPC.",
    bridgeRole:
      "Equipment import optimization for clinic network and diagnostic labs leveraging GIPC health sector incentives.",
    bridgeVentures: ["Diagnostic Lab Network", "Medical Equipment Hub"],
    pillars: ["GIPC Incentives", "Import Exemptions"],
  },
  {
    policy: "Digital Health Advancement",
    body: "Ministry of Health",
    allocation: "GH\u20B5110M",
    categories: ["infrastructure", "partnerships"],
    relevance: ["primary", "specialty"],
    alignment:
      "Digital health infrastructure including telemedicine frameworks and health information systems nationwide.",
    bridgeRole:
      "Regulatory alignment for telemedicine licensing, EMR integration, and digital health innovation standards.",
    bridgeVentures: ["Telemedicine Platform", "Healthcare Registry"],
    pillars: ["eHealth Strategy", "Telemedicine Framework"],
  },
];

const policyCategories = [
  { id: "all", label: "All" },
  { id: "funding", label: "Funding & Incentives" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "partnerships", label: "Partnerships" },
];

const catBadgeStyles = {
  funding: { bg: "rgba(184,217,53,0.15)", border: "rgba(184,217,53,0.3)" },
  infrastructure: { bg: "rgba(184,217,53,0.1)", border: "rgba(184,217,53,0.25)" },
  partnerships: { bg: "rgba(27,77,62,0.05)", border: "rgba(27,77,62,0.12)" },
};

const catLabels = { funding: "Funding & Incentives", infrastructure: "Infrastructure", partnerships: "Partnership" };

const PolicyAlignmentSection = () => {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);

  const filteredPolicies =
    activeCategory === "all" ? policyData : policyData.filter((p) => p.categories.includes(activeCategory));

  const handleCategoryChange = (id) => {
    setActiveCategory(id);
    setExpandedCard(null);
  };
  const handleCardClick = (idx) => {
    setExpandedCard(expandedCard === idx ? null : idx);
  };

  return (
    <section style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: isMobile ? "24px" : "40px", textAlign: isMobile ? "left" : "center" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: colors.white,
              color: colors.primary,
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Inter, sans-serif",
              marginBottom: "24px",
              border: `1px solid ${colors.line}`,
            }}
          >
            The Governance & Policy
          </span>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              color: colors.primary,
              margin: isMobile ? "0 0 16px" : "0 auto 16px",
              letterSpacing: "-0.5px",
              lineHeight: "1.2",
              maxWidth: "900px",
            }}
          >
            Moving in Step with Ghana{"\u2019"}s{" "}
            <span style={{ fontWeight: "600", color: colors.accent }}>Healthcare Priorities</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "14px" : "16px",
              color: "#555",
              margin: isMobile ? "0 0 28px" : "0 auto 28px",
              maxWidth: "750px",
              lineHeight: "1.65",
            }}
          >
            BRIDGE ventures align directly with GH{"\u20B5"}19.5+ billion in government health commitments and the
            Care24 pillar of the 24-Hour Economy — creating pathways for public-private collaboration.
          </p>

          {/* Category filter pills */}
          <div
            style={{
              display: "flex",
              justifyContent: isMobile ? "flex-start" : "center",
              ...(isMobile ? { margin: "0 -20px", padding: "0 20px" } : {}),
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: isMobile ? "6px" : "12px",
                border: `1px solid ${colors.line}`,
                borderRadius: "50px",
                padding: isMobile ? "4px" : "5px",
                backgroundColor: colors.white,
              }}
            >
              {policyCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  style={{
                    backgroundColor: activeCategory === cat.id ? colors.accentLight : "transparent",
                    color: activeCategory === cat.id ? colors.primary : "#999",
                    border: activeCategory === cat.id ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                    padding: isMobile ? "5px 8px" : "6px 14px",
                    borderRadius: "50px",
                    fontSize: isMobile ? "10px" : "12px",
                    fontWeight: activeCategory === cat.id ? "700" : "500",
                    fontFamily: "Inter, sans-serif",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Card Row */}
        <div
          className="hide-scrollbar"
          style={{
            display: "flex",
            gap: isMobile ? "12px" : "16px",
            overflowX: "auto",
            marginBottom: isMobile ? "16px" : "32px",
            alignItems: "flex-start",
            scrollSnapType: isMobile ? "x mandatory" : "none",
            WebkitOverflowScrolling: "touch",
            ...(isMobile ? { margin: "0 -20px 16px", padding: "0 20px" } : {}),
          }}
        >
          {filteredPolicies.map((p, idx) => {
            const isExpanded = expandedCard === idx;
            const badge = catBadgeStyles[p.categories[0]];
            return (
              <div
                key={idx}
                onClick={() => handleCardClick(idx)}
                style={{
                  minWidth: isMobile ? "calc(100vw - 56px)" : isExpanded ? "420px" : "280px",
                  maxWidth: isMobile ? "calc(100vw - 56px)" : isExpanded ? "420px" : "280px",
                  backgroundColor: colors.background,
                  borderRadius: "16px",
                  border: isExpanded ? `2px solid ${colors.primary}` : `1px solid ${colors.line}`,
                  padding: isMobile ? "20px" : "24px",
                  cursor: "pointer",
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  scrollSnapAlign: isMobile ? "start" : "none",
                  ...(!isExpanded && !isMobile ? { minHeight: "280px" } : {}),
                }}
              >
                {/* Top row: category badge + relevance pills */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "12px",
                    gap: "8px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "9px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      color: colors.primary,
                      backgroundColor: badge.bg,
                      border: `1px solid ${badge.border}`,
                      padding: "4px 10px",
                      borderRadius: "8px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {catLabels[p.categories[0]]}
                  </span>
                  <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", justifyContent: "flex-end" }}>
                    {p.relevance.map((r, ri) => (
                      <span
                        key={ri}
                        style={{
                          fontFamily: "DM Sans, sans-serif",
                          fontSize: "9px",
                          fontWeight: "600",
                          color: "#999",
                          backgroundColor: colors.white,
                          border: `1px solid ${colors.line}`,
                          padding: "3px 8px",
                          borderRadius: "6px",
                          textTransform: "capitalize",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Policy name */}
                <h4
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "16px",
                    fontWeight: "700",
                    color: colors.primary,
                    margin: "0 0 10px 0",
                    lineHeight: "1.3",
                    minHeight: isMobile ? "auto" : "42px",
                  }}
                >
                  {p.policy}
                </h4>

                {/* Allocation */}
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
                    minHeight: isMobile ? "auto" : "40px",
                  }}
                >
                  {p.alignment}
                </p>

                {/* Expand hint / chevron */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "auto" }}>
                  <span
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "12px",
                      fontWeight: "500",
                      color: isExpanded ? colors.primary : "#bbb",
                    }}
                  >
                    BRIDGE alignment
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isExpanded ? colors.primary : "#ccc"}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <div
                    style={{
                      marginTop: "16px",
                      paddingTop: "16px",
                      borderTop: `1px solid ${colors.line}`,
                      overflow: "hidden",
                      transition: "all 0.3s ease",
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
                        {p.pillars.map((pl, pi) => (
                          <span
                            key={pi}
                            style={{
                              fontFamily: "DM Sans, sans-serif",
                              fontSize: "11px",
                              fontWeight: "600",
                              color: colors.primary,
                              backgroundColor: colors.accentLight,
                              border: `1px solid rgba(184,217,53,0.3)`,
                              padding: "4px 12px",
                              borderRadius: "8px",
                            }}
                          >
                            {pl}
                          </span>
                        ))}
                      </div>
                    )}
                    {/* BRIDGE Ventures */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {p.bridgeVentures.map((v, vi) => (
                        <div
                          key={vi}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            backgroundColor: colors.primary,
                            borderRadius: "10px",
                            padding: "12px 16px",
                          }}
                        >
                          <div
                            style={{
                              width: "7px",
                              height: "7px",
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
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Scroll indicator dots — mobile only */}
        {isMobile && (
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "32px" }}>
            {filteredPolicies.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === 0 ? "24px" : "8px",
                  height: "8px",
                  borderRadius: i === 0 ? "4px" : "50%",
                  backgroundColor: i === 0 ? colors.accent : "#ddd",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA Bar */}
        <div
          style={{
            backgroundColor: colors.primary,
            borderRadius: "16px",
            padding: isMobile ? "24px 20px" : "28px 32px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "center" : "center",
            gap: isMobile ? "16px" : "24px",
            textAlign: "left",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: isMobile ? "15px" : "18px",
                fontWeight: "600",
                color: colors.white,
                marginBottom: "4px",
              }}
            >
              BRIDGE complements — never competes with — government vision.
            </div>
            <div
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: isMobile ? "12px" : "14px",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Every venture aligns with at least one active government policy or initiative.
            </div>
          </div>
          <a
            href="#"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "13px",
              fontWeight: "700",
              color: colors.primary,
              backgroundColor: colors.accent,
              textDecoration: "none",
              padding: "12px 24px",
              borderRadius: "50px",
              whiteSpace: "nowrap",
              flexShrink: 0,
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

// ============================================================================
// CROSS-SECTOR CONNECTIONS — Hub-and-spoke icon layout per Ripple Effect handoff
// ============================================================================

const crossSectorData = [
  {
    sectorId: 2,
    name: "Financial Inclusion",
    shortLabel: "Financial",
    connection: "Health insurance, medical emergency fund, health savings products",
    multiplier: "3.2x",
    synergies: [
      "Health insurance distributed through market associations",
      "Emergency medical fund for traders facing health crises",
      "Health savings integrated with mobile financial services",
    ],
    bridgeVentures: ["Community Health Insurance", "Medical Emergency Fund"],
    impact:
      "Health financing products distributed through financial inclusion channels reach the informal sector \u2014 the 68% of Ghanaians whom traditional insurance models miss entirely.",
    pathLabel: "Health Systems \u2192 Insurance Products \u2192 Financial Access",
  },
  {
    sectorId: 1,
    name: "Infrastructure",
    shortLabel: "Infra",
    connection: "Market-integrated health services, clinic construction, WASH",
    multiplier: "2.8x",
    synergies: [
      "First aid and screening within Kejetia Market",
      "Clinic construction via infrastructure management",
      "WASH integration for 45% of underserved facilities",
    ],
    bridgeVentures: ["Market Health Services", "Community Clinic Network"],
    impact:
      "Physical infrastructure provides the delivery points that health services require \u2014 every market, every CHPS compound, every water kiosk becomes a wellbeing touchpoint.",
    pathLabel: "Health Systems \u2192 Facility Networks \u2192 Infrastructure Access",
  },
  {
    sectorId: 5,
    name: "Education & Skills",
    shortLabel: "Education",
    connection: "Medical training, workforce development, health literacy",
    multiplier: "2.5x",
    synergies: [
      "Nursing school partnerships with diaspora faculty",
      "Continuing medical education retaining providers",
      "Community health literacy for market populations",
    ],
    bridgeVentures: ["CME Platform", "Nursing School Partnerships"],
    impact:
      "Workforce development addresses the root cause of Ghana's health crisis \u2014 retaining the 56% of trained physicians abroad through education pathways that build lasting careers.",
    pathLabel: "Health Systems \u2192 Workforce Training \u2192 Education Pathways",
  },
  {
    sectorId: 11,
    name: "Manufacturing",
    shortLabel: "Mfg",
    connection: "Pharmaceutical production, medical device assembly, PPE",
    multiplier: "2.1x",
    synergies: [
      "Essential medicine production reducing import dependency",
      "Medical equipment assembly and maintenance locally",
      "PPE production capacity for healthcare workers",
    ],
    bridgeVentures: ["Pharmaceutical Supply Chain", "Medical Equipment Hub"],
    impact:
      "Local pharmaceutical manufacturing reduces Ghana's 70% import dependency for essential medicines \u2014 creating health security, industrial jobs, and supply chain resilience.",
    pathLabel: "Health Systems \u2192 Supply Needs \u2192 Local Manufacturing",
  },
  {
    sectorId: 12,
    name: "Transportation",
    shortLabel: "Transport",
    connection: "Medical supply distribution, patient referral transport",
    multiplier: "1.8x",
    synergies: [
      "Temperature-controlled pharmaceutical distribution",
      "Emergency and scheduled patient referral transport",
      "Vaccine cold chain logistics for immunisation",
    ],
    bridgeVentures: ["Med Logistics Network", "Patient Transport System"],
    impact:
      "Reliable transport ensures medicines reach rural CHPS compounds and patients reach referral hospitals \u2014 the last mile that determines whether care is accessible or theoretical.",
    pathLabel: "Health Systems \u2192 Distribution Needs \u2192 Transport Networks",
  },
];

const CrossSectorSection = () => {
  const isMobile = useIsMobile();
  const [activeNode, setActiveNode] = useState(null);
  const [showMoreRipple, setShowMoreRipple] = useState(false);
  const pathway = activeNode !== null ? crossSectorData[activeNode] : null;

  return (
    <section style={{ backgroundColor: colors.primary, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: isMobile ? "32px" : "60px", textAlign: "center" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "rgba(255,255,255,0.08)",
              color: colors.accent,
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Inter, sans-serif",
              marginBottom: "24px",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            The Ripple Effect
          </span>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              color: colors.white,
              margin: "0 auto 20px auto",
              letterSpacing: "-0.5px",
              lineHeight: "1.2",
              maxWidth: "820px",
            }}
          >
            How Health Systems <span style={{ fontWeight: "600", color: colors.accent }}>Amplify Impact</span>
          </h2>
          {!isMobile && (
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                color: "rgba(255,255,255,0.55)",
                margin: "0 auto",
                maxWidth: "700px",
                lineHeight: "1.65",
              }}
            >
              Health connects to every sector in the BRIDGE portfolio. Select a connected sector to explore how
              investment in wellbeing creates compounding value.
            </p>
          )}
        </div>

        {/* PATHWAY VISUAL */}
        {isMobile ? (
          /* MOBILE: Hub on top, 5 icons below */
          <div style={{ marginBottom: "24px" }}>
            {/* Hub Icon */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "16px" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "14px",
                  backgroundColor: colors.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.primary,
                  boxShadow: "0 0 24px rgba(184, 217, 53, 0.3)",
                }}
              >
                {crossSectorIcons[3]}
              </div>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "10px",
                  fontWeight: "700",
                  color: colors.accent,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginTop: "8px",
                }}
              >
                HEALTH SYSTEMS
              </span>
            </div>
            {/* 5 Connected Sector Icons */}
            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
              {crossSectorData.map((s, i) => {
                const isActive = activeNode === i;
                const isDimmed = activeNode !== null && activeNode !== i;
                return (
                  <button
                    key={s.sectorId}
                    onClick={() => {
                      setActiveNode(isActive ? null : i);
                      setShowMoreRipple(false);
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "6px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "4px",
                      opacity: isDimmed ? 0.4 : 1,
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
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isActive ? colors.primary : "rgba(255,255,255,0.6)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <span style={{ transform: "scale(0.85)", display: "flex" }}>{crossSectorIcons[s.sectorId]}</span>
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
                        transition: "all 0.3s ease",
                      }}
                    >
                      {s.shortLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* DESKTOP: Horizontal row with hub + nodes */
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "32px",
              marginBottom: "48px",
            }}
          >
            {/* Hub Icon */}
            <div
              style={{ width: "120px", flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "20px",
                  backgroundColor: colors.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.primary,
                  boxShadow: "0 0 30px rgba(184, 217, 53, 0.3)",
                }}
              >
                {crossSectorIcons[3]}
              </div>
            </div>
            {/* Sector Nodes */}
            {crossSectorData.map((s, i) => {
              const isActive = activeNode === i;
              const isDimmed = activeNode !== null && activeNode !== i;
              return (
                <div
                  key={s.sectorId}
                  onClick={() => setActiveNode(isActive ? null : i)}
                  style={{
                    width: "120px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
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
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isActive ? colors.primary : "rgba(255,255,255,0.6)",
                      marginBottom: "10px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {crossSectorIcons[s.sectorId]}
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
                    {s.name}
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
                    {s.multiplier}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* DETAIL PANEL */}
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
            isMobile ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.5)",
                    margin: 0,
                    lineHeight: "1.6",
                  }}
                >
                  Tap a sector above to explore how health amplifies its impact
                </p>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: colors.white,
                    }}
                  >
                    Cross-Sector Integration Opportunities
                  </span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                    Click a sector above to explore
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px" }}>
                  {crossSectorData.map((sector, i) => (
                    <div
                      key={sector.sectorId}
                      onClick={() => setActiveNode(i)}
                      style={{
                        cursor: "pointer",
                        padding: "24px 20px",
                        borderRadius: "16px",
                        backgroundColor: "rgba(255,255,255,0.05)",
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
                        {sector.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "rgba(255,255,255,0.45)",
                          lineHeight: "1.4",
                          height: "40px",
                          overflow: "hidden",
                          marginBottom: "12px",
                        }}
                      >
                        {sector.connection}
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
                          {sector.multiplier}
                        </span>
                        <span
                          style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.4)" }}
                        >
                          multiplier
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ) : (
            <div>
              {/* Breadcrumb — desktop only */}
              {!isMobile && (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}
                >
                  {pathway.pathLabel.split(" \u2192 ").map((step, i, arr) => (
                    <React.Fragment key={i}>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          fontWeight: i === 0 ? "700" : "500",
                          color: i === 0 ? colors.accent : "rgba(255,255,255,0.7)",
                          backgroundColor: i === 0 ? "rgba(184, 217, 53, 0.15)" : "rgba(255,255,255,0.05)",
                          padding: "6px 14px",
                          borderRadius: "50px",
                        }}
                      >
                        {step}
                      </span>
                      {i < arr.length - 1 && <span style={{ color: colors.accent, fontSize: "14px" }}>{"\u2192"}</span>}
                    </React.Fragment>
                  ))}
                </div>
              )}

              {/* 3-Column Detail */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                  gap: isMobile ? "20px" : "32px",
                }}
              >
                {/* Column 1: Why It Matters — always visible */}
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
                    {pathway.impact}
                  </p>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                    <span
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: isMobile ? "28px" : "32px",
                        fontWeight: "700",
                        color: colors.accent,
                      }}
                    >
                      {pathway.multiplier}
                    </span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                      value multiplier
                    </span>
                  </div>
                </div>

                {/* Column 2: Synergy Pathways — collapsible on mobile */}
                {(!isMobile || showMoreRipple) && (
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
                      {pathway.synergies.map((synergy, i) => (
                        <div
                          key={i}
                          style={{
                            padding: "10px 16px",
                            borderRadius: "10px",
                            backgroundColor: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "13px",
                              color: "rgba(255,255,255,0.75)",
                              lineHeight: "1.3",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "block",
                            }}
                          >
                            {synergy}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Column 3: Linked Ventures — collapsible on mobile */}
                {(!isMobile || showMoreRipple) && (
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
                      {pathway.bridgeVentures.map((venture, i) => (
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
                            {venture}
                          </span>
                          <span style={{ color: colors.accent, fontSize: "16px" }}>{"\u2192"}</span>
                        </div>
                      ))}
                    </div>
                    <a
                      href="#"
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
                      Explore {pathway.name} Sector <span>{"\u2192"}</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile toggle */}
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
                  {showMoreRipple ? "Show less" : "Show more details"}
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

// INVESTMENT THESIS SECTION — Audience-based with Returns/Timeline/Impact panel
// ============================================================================

const CONTENT_MAX_WIDTH = "1200px";

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
        label: "Flagship Tier",
        value: "$7.6-19M",
        detail: "Telemedicine, market health hubs, and community clinic networks ready to deploy",
      },
      {
        label: "Scaling Tier",
        value: "$2.2-6.7M",
        detail: "CHPS strengthening, health tech funds, and pharmaceutical supply chain ventures",
      },
      {
        label: "Portfolio IRR",
        value: "18-28%",
        detail: "Blended returns across 19 health ventures with government co-investment",
      },
      {
        label: "Dev. Leverage",
        value: "3.2x",
        detail: "Each dollar generates local economic activity through workforce and supply chains",
      },
    ],
    timeline: [
      {
        label: "Phase 1 (Q1-Q2)",
        value: "$2-5M",
        detail: "Diaspora telemedicine, market health hub pilot, and CHPS compound strengthening",
      },
      {
        label: "Phase 2 (Q3-Q4)",
        value: "$5-10M",
        detail: "Community clinic network, health insurance products, and workforce retention",
      },
      {
        label: "Phase 3 (2027+)",
        value: "$5-25M",
        detail: "Specialized care centres, diagnostic labs, and regional hospital upgrades",
      },
      {
        label: "Exit Horizon",
        value: "5-7 yrs",
        detail: "Staged liquidity via operating cash flows, acquisitions, and gov. buybacks",
      },
    ],
    impact: [
      {
        label: "Citizens Served",
        value: "32M+",
        detail: "Addressable population across health delivery, financing, and wellness programs",
      },
      {
        label: "Diaspora Linked",
        value: "15,000+",
        detail: "Health professionals connected through telemedicine, CME, and return pathways",
      },
      {
        label: "CHPS Upgraded",
        value: "50+",
        detail: "Community health compounds with equipment, training, and supply chain support",
      },
      {
        label: "Insurance Reach",
        value: "100K+",
        detail: "Informal sector workers gaining complementary coverage via market associations",
      },
    ],
  };

  const audiences = [
    {
      key: "entrepreneur",
      label: "Entrepreneur",
      shortLabel: "Founder",
      icon: <IconStorefront />,
      headline: "Build the future of care delivery",
      pitch:
        "Health entrepreneurs have unmatched opportunity to create ventures that serve millions while generating sustainable returns. BRIDGE provides the market intelligence, regulatory navigation, and anchor partnerships to move from concept to clinic.",
      stats: [
        { value: "19", label: "Venture Paths", detail: "validated models" },
        { value: "10K+", label: "Market Access", detail: "traders via Kejetia" },
        { value: "Full", label: "BRIDGE Support", detail: "incubation to scale" },
      ],
      pathways: [
        {
          bring: "Clinical or health tech expertise",
          get: "Market access via Kejetia and regulatory navigation with GHS",
        },
        {
          bring: "Operational capacity and presence",
          get: "Anchor buyers, co-investors, and telemedicine infrastructure access",
        },
        {
          bring: "Community trust and delivery skills",
          get: "CHPS integration pathways and diaspora specialist partnerships",
        },
      ],
    },
    {
      key: "business",
      label: "Business Entity",
      shortLabel: "Business",
      icon: <IconOfficeBuilding />,
      headline: "Scale health infrastructure with purpose",
      pitch:
        "Hospitals, health startups, and training centres can accelerate growth by partnering with BRIDGE. Access diaspora specialists, equipment supply chains, and co-investment capital across 19 validated ventures.",
      stats: [
        { value: "40+", label: "Health-Tech Allies", detail: "ecosystem partners" },
        { value: "$12-40M", label: "Capital Range", detail: "across all tiers" },
        { value: "3.2x", label: "Dev Leverage", detail: "economic multiplier" },
      ],
      pathways: [
        {
          bring: "Facility or distribution network",
          get: "Co-investment capital and diaspora telemedicine integration",
        },
        { bring: "Supply chain or pharma capacity", get: "Access to 5,000+ CHPS compounds and market health hubs" },
        { bring: "Health tech product or platform", get: "Pilot deployment, government alignment, and impact metrics" },
      ],
    },
    {
      key: "investor",
      label: "Investor",
      shortLabel: "Investor",
      icon: <IconTrendingUp />,
      headline: "Impact capital with compounding returns",
      pitch:
        "Health sector investment in Ghana offers 18-28% target IRR across 19 mapped ventures. BRIDGE de-risks deployment with government alignment, anchor partnerships, and phased capital allocation from $2M foundation to full portfolio.",
      stats: [
        { value: "18-28%", label: "Target IRR", detail: "risk-adjusted" },
        { value: "19", label: "Ventures Mapped", detail: "across three tiers" },
        { value: "5-7yr", label: "Exit Horizon", detail: "staged liquidity" },
      ],
      pathways: [
        {
          bring: "Patient capital and impact mandate",
          get: "Deal flow, due diligence, and phased deployment across 19 ventures",
        },
        {
          bring: "Sector expertise or diaspora ties",
          get: "Co-investment alongside MOH, GHS, and NHIA aligned partners",
        },
        {
          bring: "Blended finance or first-loss role",
          get: "Government co-investment, diversification, and impact reporting",
        },
      ],
    },
    {
      key: "government",
      label: "Government",
      shortLabel: "Gov't",
      icon: <IconLandmark />,
      headline: "Strengthen national health targets",
      pitch:
        "BRIDGE health ventures directly support Care24, NHIS expansion, and CHPS strengthening targets. Every venture is designed for policy alignment, creating public value while attracting private capital to complement government spending.",
      stats: [
        { value: "9", label: "Policy Aligned", detail: "national priorities" },
        { value: "50+", label: "CHPS Target", detail: "compounds served" },
        { value: "32M+", label: "Citizens Reach", detail: "addressable pop." },
      ],
      pathways: [
        {
          bring: "Policy alignment and regulation",
          get: "Private capital deployment aligned with national health targets",
        },
        {
          bring: "CHPS infrastructure and districts",
          get: "Workforce retention, equipment upgrades, and telemedicine links",
        },
        { bring: "NHIS framework and mandate", get: "Complementary products for informal sector coverage expansion" },
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
            <span style={{ color: colors.accent, fontWeight: "600" }}>Health Equity</span>
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
            Investment isn{"\u2019"}t only capital — it{"\u2019"}s expertise, partnerships, policy, and vision. See how
            your role contributes to {sectorData.ventures} ventures across {sectorData.capitalRange} in opportunity.
          </p>
        </div>

        {/* Audience Selector */}
        {isMobile ? (
          <div
            style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "24px", padding: "0 20px" }}
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
                      backgroundColor: isActive ? colors.primary : colors.background,
                      border: isActive ? "none" : `1px solid ${colors.line}`,
                      color: isActive ? colors.accent : colors.primary,
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
          <div style={{ display: "flex", justifyContent: "flex-start", gap: "12px", marginBottom: "40px" }}>
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
                    padding: "6px 16px",
                    borderRadius: "50px",
                    border: isActive ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                    backgroundColor: isActive ? colors.accentLight : "transparent",
                    color: isActive ? colors.primary : "#999",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    fontWeight: isActive ? "700" : "500",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{ display: "flex", color: isActive ? colors.primary : "#999", transition: "all 0.2s ease" }}
                  >
                    {aud.icon}
                  </span>
                  {aud.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Main Content Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "24px" : "40px",
            alignItems: "stretch",
            padding: isMobile ? "0 20px" : 0,
          }}
        >
          {/* LEFT COLUMN: Audience Content */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "24px" }}>
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
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#888" }}>{stat.detail}</div>
                </div>
              ))}
            </div>

            {/* Engagement Pathways */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
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
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
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
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#777", lineHeight: "1.5" }}
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
              <div style={{ color: colors.primary, flexShrink: 0, display: "flex" }}>
                <IconCheck />
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#444", lineHeight: "1.5" }}>
                <strong style={{ color: colors.primary }}>Ghana Health Service</strong> aligned with national healthcare
                targets
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
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1, justifyContent: "center" }}>
                {tabContent[activeTab].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderRadius: "12px",
                      padding: isMobile ? "16px" : "18px 20px",
                      display: "flex",
                      gap: "16px",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ width: isMobile ? "80px" : "110px", flexShrink: 0 }}>
                      <div
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: isMobile ? "20px" : "22px",
                          fontWeight: "700",
                          color: colors.accent,
                          lineHeight: "1.1",
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
                          marginTop: "4px",
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
                        borderLeft: "1px solid rgba(255,255,255,0.1)",
                        paddingLeft: "16px",
                        flex: 1,
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
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>
                  Full financial model available
                </span>
                <a
                  href="#"
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
                  Download Prospectus <span style={{ fontSize: "16px" }}>{"\u2192"}</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        {isMobile && !showInvestmentDetails && (
          <button
            onClick={() => setShowInvestmentDetails(true)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "calc(100% - 40px)",
              margin: "16px 20px 0",
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
      </div>
      {/* end maxWidth wrapper */}
    </section>
  );
};

// ============================================================================
// IMPACT SECTION — Dual-lens dashboard (By Metric / By Stakeholder)
// ============================================================================

const useCounter = (target, duration = 1200, active = true) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    const num = typeof target === "number" ? target : parseFloat(String(target).replace(/[^0-9.]/g, ""));
    if (isNaN(num)) {
      setCount(target);
      return;
    }
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(num * ease);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, active, duration]);
  return count;
};

const formatMetricValue = (raw, prefix, suffix) => {
  const v = typeof raw === "number" ? raw : parseFloat(raw);
  let display;
  if (v >= 1000) display = Math.round(v).toLocaleString();
  else if (v !== Math.floor(v)) display = v.toFixed(1);
  else display = String(Math.round(v));
  return `${prefix}${display}${suffix}`;
};

const impactMetrics = [
  {
    category: "Economic",
    items: [
      {
        label: "Health Sector Scale",
        value: 19.5,
        suffix: "B+",
        prefix: "GH\u20B5",
        description: "Government health budget commitment across all programmes",
        trend: "Baseline",
        ventures: "All Ventures",
      },
      {
        label: "Capital Deployed",
        value: 12,
        suffix: "-40M",
        prefix: "$",
        description: "Total investment across 19 mapped health ventures",
        trend: "Phased",
        ventures: "All Ventures",
      },
      {
        label: "Catastrophic Spend",
        value: 11,
        suffix: "%",
        prefix: "",
        description: "Households facing catastrophic health expenditure",
        trend: "At risk",
        ventures: "Community Insurance \u00B7 Clinic Network",
      },
      {
        label: "Dev. Leverage",
        value: 3.2,
        suffix: "x",
        prefix: "",
        description: "Development leverage multiplier from health infrastructure",
        trend: "Multiplier",
        ventures: "Clinic Network \u00B7 CHPS Program",
      },
    ],
  },
  {
    category: "People",
    items: [
      {
        label: "Citizens Served",
        value: 32,
        suffix: "M+",
        prefix: "",
        description: "Population reach through NHIS-aligned products and services",
        trend: "Target",
        ventures: "Insurance \u00B7 Clinic Network \u00B7 Telemedicine",
      },
      {
        label: "Diaspora Professionals",
        value: 15,
        suffix: "K+",
        prefix: "",
        description: "Healthcare professionals abroad available for engagement",
        trend: "Growing",
        ventures: "Telemedicine \u00B7 CME Platform \u00B7 Return Pathway",
      },
      {
        label: "CHPS Upgraded",
        value: 50,
        suffix: "+",
        prefix: "",
        description: "Community health compounds targeted for strengthening",
        trend: "Near-term",
        ventures: "CHPS Program \u00B7 Telemedicine Platform",
      },
      {
        label: "Market Traders",
        value: 10,
        suffix: "K+",
        prefix: "",
        description: "Kejetia traders accessing workplace health services",
        trend: "High priority",
        ventures: "Market Health Hub \u00B7 Community Insurance",
      },
    ],
  },
  {
    category: "Returns",
    items: [
      {
        label: "Portfolio IRR",
        value: 18,
        suffix: "-28%",
        prefix: "",
        description: "Target internal rate of return across health portfolio",
        trend: "Target range",
        ventures: "Tier 1 Ventures",
      },
      {
        label: "Tier 1 Returns",
        value: 7.65,
        suffix: "-19.2M",
        prefix: "$",
        description: "Flagship venture capital across 7 priority investments",
        trend: "High priority",
        ventures: "Telemedicine \u00B7 Clinic \u00B7 Retention Fund",
      },
      {
        label: "First Revenue",
        value: 12,
        suffix: "-18mo",
        prefix: "",
        description: "Timeline to initial cash generation from Tier 1 ventures",
        trend: "Near-term",
        ventures: "Telemedicine \u00B7 CME Platform",
      },
      {
        label: "Exit Horizon",
        value: 5,
        suffix: "-7yr",
        prefix: "",
        description: "Expected investment cycle for full portfolio realization",
        trend: "Phased",
        ventures: "All Ventures",
      },
    ],
  },
];

const impactStakeholders = [
  {
    title: "The Entrepreneur",
    subtitle: "Practitioners, pharmacists & health workers",
    outcomes: [
      "Affordable health services accessible at the workplace",
      "Community insurance through market trade associations",
      "Fewer lost workdays from preventable illness",
      "Emergency medical fund access during health crises",
    ],
    stat: "10,000+",
    statLabel: "traders served",
    highlight: "Workplace health integration",
  },
  {
    title: "The Institution",
    subtitle: "Hospitals, health startups & training centres",
    outcomes: [
      "Diaspora specialist consultations via telemedicine",
      "Workforce upskilling through continuing education",
      "Health tech ecosystem partnerships and funding",
      "Equipment upgrades and supply chain reliability",
    ],
    stat: "40+",
    statLabel: "health-tech allies",
    highlight: "Diaspora knowledge pipeline",
  },
  {
    title: "The Government",
    subtitle: "MOH, GHS, NHIA & district assemblies",
    outcomes: [
      "CHPS strengthening aligned with national targets",
      "NHIS complementary products for informal sector",
      "Care24 extended service delivery model support",
      "Data-driven policy tools for health spending impact",
    ],
    stat: "9",
    statLabel: "policy alignments",
    highlight: "Direct policy alignment",
  },
  {
    title: "The Investor",
    subtitle: "Impact & institutional capital",
    outcomes: [
      "$12-40M portfolio across 19 mapped ventures",
      "Compounding revenue from care infrastructure",
      "Measurable wellbeing impact alongside returns",
      "Government co-investment and policy alignment",
    ],
    stat: "18-28%",
    statLabel: "target IRR",
    highlight: "Blended finance structure",
  },
];

const MetricRow = ({ item, index, animate }) => {
  const isMobile = useIsMobile();
  const count = useCounter(item.value, 1200, animate);
  const display = formatMetricValue(count, item.prefix, item.suffix);

  if (isMobile) {
    return (
      <div
        style={{
          padding: "20px 18px",
          backgroundColor: index % 2 === 0 ? colors.white : "transparent",
          opacity: animate ? 1 : 0,
          transition: `opacity 0.4s ease ${index * 80}ms`,
        }}
      >
        {/* Top row: Number (left) + Trend tag & Ventures box (right) */}
        <div
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}
        >
          <div
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "32px",
              fontWeight: "700",
              color: colors.primary,
              letterSpacing: "-1px",
              lineHeight: "1.1",
            }}
          >
            {display}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "6px",
              flexShrink: 0,
              maxWidth: "55%",
            }}
          >
            <div
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
            </div>
            <div
              style={{
                backgroundColor: index % 2 === 0 ? colors.background : "rgba(27,77,62,0.04)",
                borderRadius: "10px",
                padding: "6px 10px",
                textAlign: "right",
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
                  marginBottom: "2px",
                }}
              >
                VENTURES
              </div>
              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "11px",
                  fontWeight: "500",
                  color: colors.primary,
                  lineHeight: "1.3",
                }}
              >
                {item.ventures}
              </div>
            </div>
          </div>
        </div>
        {/* Label */}
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
        {/* Description */}
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
        backgroundColor: index % 2 === 0 ? colors.white : "transparent",
        alignItems: "center",
        opacity: animate ? 1 : 0,
        transition: `opacity 0.4s ease ${index * 80}ms`,
      }}
    >
      {/* Number + trend */}
      <div>
        <span
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "10px",
            fontWeight: "700",
            color: colors.accent,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            display: "block",
            marginBottom: "4px",
          }}
        >
          {item.trend}
        </span>
        <div
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "36px",
            fontWeight: "700",
            color: colors.primary,
            letterSpacing: "-1px",
            lineHeight: "1.1",
          }}
        >
          {display}
        </div>
      </div>
      {/* Label + description */}
      <div>
        <div
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "15px",
            fontWeight: "700",
            color: colors.primary,
            marginBottom: "2px",
          }}
        >
          {item.label}
        </div>
        <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: "#666", lineHeight: "1.5" }}>
          {item.description}
        </div>
      </div>
      {/* Linked ventures */}
      <div
        style={{
          backgroundColor: index % 2 === 0 ? colors.background : "rgba(27,77,62,0.04)",
          borderRadius: "10px",
          padding: "10px 16px",
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
          LINKED VENTURES
        </div>
        <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "11px", fontWeight: "500", color: colors.primary }}>
          {item.ventures}
        </div>
      </div>
    </div>
  );
};

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
  const switchStakeholder = (i) => {
    setActiveStakeholder(i);
  };

  const currentMetrics = impactMetrics[activeCategory]?.items || [];
  const currentStakeholder = impactStakeholders[activeStakeholder];

  return (
    <section style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 0 }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: colors.white,
              color: colors.primary,
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Inter, sans-serif",
              marginBottom: "24px",
              border: `1px solid ${colors.line}`,
            }}
          >
            The Impact
          </span>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              color: colors.primary,
              margin: "0 0 12px 0",
              letterSpacing: "-0.5px",
              lineHeight: "1.2",
            }}
          >
            What Changes When <span style={{ fontWeight: "600" }}>Health</span>
            <br />
            <span style={{ fontWeight: "600" }}>Systems</span>{" "}
            <span style={{ fontWeight: "600", color: colors.accent }}>Work</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "14px" : "16px",
              color: "#555",
              margin: "0 0 40px 0",
              maxWidth: "750px",
              lineHeight: "1.7",
            }}
          >
            When clinics serve communities, medicines reach patients, and health data drives decisions — the ripple
            effects extend productive lives, reduce catastrophic costs, and protect family prosperity across Ghana.
          </p>
        </div>

        {/* Controls Bar */}
        <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "24px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: isMobile ? "6px" : "12px",
              border: `1px solid ${colors.line}`,
              borderRadius: "50px",
              padding: isMobile ? "4px" : "5px",
              backgroundColor: colors.white,
            }}
          >
            {/* View Toggle */}
            <div
              style={{
                display: "inline-flex",
                backgroundColor: colors.background,
                borderRadius: "50px",
                overflow: "hidden",
                flexShrink: 0,
                padding: isMobile ? "2px" : "3px",
              }}
            >
              {["metrics", "stakeholder"].map((v) => (
                <button
                  key={v}
                  onClick={() => switchView(v)}
                  style={{
                    padding: isMobile ? "5px 10px" : "6px 14px",
                    fontSize: isMobile ? "11px" : "12px",
                    backgroundColor: view === v ? colors.white : "transparent",
                    color: view === v ? colors.primary : "#999",
                    fontWeight: view === v ? "700" : "500",
                    borderRadius: "50px",
                    boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    transition: "all 0.2s ease",
                  }}
                >
                  {v === "metrics" ? (isMobile ? "Metric" : "By Metric") : isMobile ? "Stakeholder" : "By Stakeholder"}
                </button>
              ))}
            </div>
            {/* Vertical Divider */}
            <div style={{ width: "1px", height: "20px", backgroundColor: colors.line, flexShrink: 0 }} />
            {/* Sub-filter pills */}
            {view === "metrics"
              ? impactMetrics.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => switchCategory(i)}
                    style={{
                      padding: isMobile ? "5px 8px" : "6px 14px",
                      borderRadius: "50px",
                      cursor: "pointer",
                      fontFamily: "Inter, sans-serif",
                      fontSize: isMobile ? "10px" : "12px",
                      fontWeight: activeCategory === i ? "700" : "500",
                      color: activeCategory === i ? colors.primary : "#999",
                      backgroundColor: activeCategory === i ? colors.accentLight : "transparent",
                      border: activeCategory === i ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {cat.category}
                  </button>
                ))
              : impactStakeholders.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => switchStakeholder(i)}
                    style={{
                      padding: isMobile ? "5px 8px" : "6px 14px",
                      borderRadius: "50px",
                      cursor: "pointer",
                      fontFamily: "Inter, sans-serif",
                      fontSize: isMobile ? "10px" : "12px",
                      fontWeight: activeStakeholder === i ? "700" : "500",
                      color: activeStakeholder === i ? colors.primary : "#999",
                      backgroundColor: activeStakeholder === i ? colors.accentLight : "transparent",
                      border: activeStakeholder === i ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {s.title.split(" ")[1]}
                  </button>
                ))}
          </div>
        </div>

        {/* Content Area */}
        {view === "metrics" ? (
          <div
            style={{
              backgroundColor: colors.background,
              borderRadius: "20px",
              border: `2px solid ${colors.primary}`,
              overflow: "hidden",
            }}
          >
            {currentMetrics.map((item, i) => (
              <MetricRow key={`${activeCategory}-${i}`} item={item} index={i} animate={animate} />
            ))}
          </div>
        ) : (
          <div>
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
                <h3
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: isMobile ? "24px" : "28px",
                    fontWeight: "700",
                    color: colors.primary,
                    margin: "0 0 4px 0",
                  }}
                >
                  {currentStakeholder.title}
                </h3>
                <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: "#888", margin: 0 }}>
                  {currentStakeholder.subtitle}
                </p>
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
                  {currentStakeholder.stat}
                </div>
                <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "12px", color: "#888", marginTop: "4px" }}>
                  {currentStakeholder.statLabel}
                </div>
              </div>
            </div>
            {/* Outcome rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {currentStakeholder.outcomes.map((outcome, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: isMobile ? "12px 16px" : "14px 20px",
                    borderRadius: "12px",
                    backgroundColor: i % 2 === 0 ? colors.background : "transparent",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: i % 2 === 0 ? colors.white : colors.background,
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
              ))}
            </div>
            {/* Key Advantage strip */}
            <div
              style={{
                marginTop: "24px",
                padding: isMobile ? "14px 18px" : "16px 24px",
                backgroundColor: colors.primary,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: isMobile ? "10px" : "16px",
                flexWrap: "wrap",
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
                KEY ADVANTAGE
              </span>
              <span
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
                {currentStakeholder.highlight}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// ============================================================================
// FINAL CTA SECTION — Stacked buttons on mobile
// ============================================================================

const FinalCTASection = () => {
  const isMobile = useIsMobile();
  return (
    <section
      style={{ backgroundColor: colors.primary, padding: isMobile ? "60px 20px" : "100px 80px", textAlign: "center" }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        <span
          style={{
            display: "inline-block",
            backgroundColor: "rgba(255,255,255,0.08)",
            color: colors.accent,
            padding: "10px 20px",
            borderRadius: "50px",
            fontSize: "11px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontFamily: "Inter, sans-serif",
            marginBottom: "24px",
            border: "1px solid rgba(255,255,255,0.15)",
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
            letterSpacing: "-0.5px",
            color: colors.white,
            margin: "0 0 24px 0",
          }}
        >
          From Understanding to <span style={{ fontWeight: "700", color: colors.accent }}>Action</span>
        </h2>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "15px" : "18px",
            color: "rgba(255,255,255,0.6)",
            margin: "0 auto 40px auto",
            maxWidth: "680px",
            lineHeight: "1.6",
          }}
        >
          Our health systems analysis maps every opportunity, every alignment, every pathway to wellbeing. Request
          access to explore the complete research.
        </p>
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
          }}
        >
          <button
            style={{
              backgroundColor: colors.accent,
              color: colors.primary,
              border: "none",
              padding: "16px 32px",
              borderRadius: "50px",
              fontSize: "15px",
              fontWeight: "600",
              fontFamily: "Inter, sans-serif",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "center",
              ...(isMobile ? { width: "100%" } : {}),
            }}
          >
            Request Full Access
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
              color: colors.white,
              border: "1px solid rgba(255,255,255,0.3)",
              padding: "16px 32px",
              borderRadius: "50px",
              fontSize: "15px",
              fontWeight: "600",
              fontFamily: "Inter, sans-serif",
              cursor: "pointer",
              ...(isMobile ? { width: "100%" } : {}),
            }}
          >
            Explore the Full Analysis
          </button>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function HealthSystemsSectorPage() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif", margin: 0, padding: 0, backgroundColor: colors.white }}>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Poppins:wght@700;800&display=swap"
        rel="stylesheet"
      />
      <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } .hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      <SiteHeader />
      <HeroSection sector={sectorData} />
      <ProblemSection />
      <ValueChainSectionPremium />
      <SolutionsSection sector={sectorData} />
      <CompetitiveLandscapeSection sector={sectorData} />
      <PolicyAlignmentSection />
      <CrossSectorSection />
      <InvestmentCTASection />
      <ImpactSection />
      <FinalCTASection />
      <div style={{ backgroundColor: colors.primary, padding: "0 80px" }}>
        <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)" }} />
      </div>
      <SiteFooter />
    </div>
  );
}
