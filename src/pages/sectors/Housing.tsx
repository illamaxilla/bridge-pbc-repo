import React, { useState, useEffect } from "react";

// ============================================================================
// BRIDGE SECTOR PAGE: Housing & Real Estate
// Updated with Shared Components v2 (Header, Footer, Hero, Final CTA)
// ============================================================================
// Design System: Dark Green #1B4D3E, Lime #B8D935, Off-white #F3F5F2
// ============================================================================

import { colors, layout } from "@/lib/theme";

const CONTENT_MAX_WIDTH = layout.maxWidth;
const MOBILE_BREAKPOINT = layout.mobileBreakpoint;

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
// SECTOR DATA - Housing & Real Estate
// ============================================================================

const sectorData = {
  id: 8,
  slug: "housing",
  name: "Housing & Real Estate",
  shortName: "Housing",
  category: "Shelter & Security",
  categoryColor: "#6B21A8",

  capitalRange: "$26-48M",
  ventures: 19,
  jobsImpact: "19M renters",
  gdpContribution: "Foundation",

  problemHeadline: "The Foundation Beneath Every Family's Future",
  problemSubheadline:
    "Ghana's housing sector holds extraordinary potential — from formalizing land access for 98% of properties without title protection, to completing the 50%+ of construction projects stalled mid-build, to unlocking affordable rental pathways for 19 million citizens. These are pathways where trust infrastructure and innovation can create transformative value.",

  keyStats: [
    { label: "Addressable Housing Gap", value: "1.8M", detail: "Homes needed across Ghana" },
    { label: "Land Formalization Potential", value: "98%", detail: "Properties without title protection" },
    { label: "Completion Opportunity", value: "50%+", detail: "Construction projects stalled mid-build" },
    { label: "Mortgage Market Potential", value: "0.8%", detail: "Current penetration vs regional peers" },
  ],

  painPoints: [
    {
      title: "Land Title Formalization",
      description:
        "60,000+ land transactions awaiting modern verification solutions — creating an enormous market for title security, digital records, and trusted registration.",
      rootCauses: [
        "Title registration framework opportunity",
        "Centralized land database potential",
        "Digital records modernization",
      ],
      quantification: "60,000+ transactions to formalize; 10-20 year resolution cycle to streamline",
    },
    {
      title: "Construction Completion Pathways",
      description:
        "Over 50% of self-managed building projects represent completion opportunities — through milestone oversight, contractor accountability, and quality inspections.",
      rootCauses: ["Licensing framework opportunity", "Performance bond innovation", "Independent inspection services"],
      quantification: "50%+ projects awaiting completion solutions",
    },
    {
      title: "Rental Access Innovation",
      description:
        "19 million Ghanaians navigating 2-3 year advance requirements — creating massive demand for rental guarantees, tenant screening, and payment alternatives.",
      rootCauses: [
        "Enforcement modernization potential",
        "Rental guarantee product demand",
        "Tenant credit infrastructure opportunity",
      ],
      quantification: "19 million citizens to serve; advance requirement reduction potential",
    },
    {
      title: "Workforce Professionalization",
      description:
        "80%+ of construction artisans are ready for formal certification and training pathways — building quality assurance, safety standards, and recognition.",
      rootCauses: [
        "Certification system creation",
        "Formal training pathway development",
        "Safety standards implementation",
      ],
      quantification: "80%+ artisans to certify; professional standards to establish",
    },
  ],

  solutions: [
    {
      tier: 1,
      name: "Construction Oversight Platform",
      description:
        "Milestone verification, payment escrow, video documentation, and independent quality inspection for self-build housing projects across Ghana.",
      capital: "$1.5-2.5M",
      score: 41,
      impact: "Serves 50%+ of projects awaiting completion solutions",
      model: "Milestone-gated payments with digital verification",
    },
    {
      tier: 1,
      name: "Title Verification Platform",
      description:
        "Comprehensive land due diligence combining Lands Commission records, court checks, traditional authority validation, and blockchain verification.",
      capital: "$500K-1M",
      score: 40,
      impact: "Formalizes access for 98% of land without title protection",
      model: "Fee-per-verification; SESO/HouseAfrica integration",
    },
    {
      tier: 1,
      name: "Rental Guarantee Products",
      description:
        "Insurance-backed instruments guaranteeing landlord rent receipt on tenant default, reducing advance payment requirements from years to months.",
      capital: "$1-2M",
      score: 39,
      impact: "Unlocks housing access for 19 million renters",
      model: "Premium-funded guarantee with tenant screening",
    },
    {
      tier: 1,
      name: "Property Management Service",
      description:
        "Full-service management with tenant screening, mobile money collection, maintenance coordination, and digital reporting for property owners.",
      capital: "$800K-1.5M",
      score: 39,
      impact: "Professionalizes rental market for absentee owners",
      model: "Percentage-of-rent revenue model",
    },
    {
      tier: 1,
      name: "Contractor Verification System",
      description:
        "Systematic contractor vetting with license checks, project track record assessment, client ratings, and ongoing performance monitoring systems.",
      capital: "$300-500K",
      score: 39,
      impact: "Serves the 90% self-builder market ready for trusted tools",
      model: "Tiered certification with ongoing monitoring",
    },
    {
      tier: 1,
      name: "Construction Skills Certification",
      description:
        "Tiered credentialing for masons, electricians, plumbers, and artisans through nationally recognized certification and training programmes.",
      capital: "$500K-1M",
      score: 38,
      impact: "Differentiates skilled artisans, elevates standards",
      model: "Partnership with Artisan Association & TVET",
    },
    {
      tier: 2,
      name: "Housing Cooperative Structure",
      description:
        "Pooled investment vehicles enabling group housing with professional management, shared risk mitigation, and development economies of scale.",
      capital: "$3-5M",
      score: 37,
      impact: "Professional oversight for collective housing",
      model: "Member equity + development finance",
    },
    {
      tier: 2,
      name: "Rent Advance Financing",
      description:
        "Structured lending paying landlord advances upfront while tenants repay monthly, scaling the validated National Rental Assistance Scheme model.",
      capital: "$2-4M",
      score: 36,
      impact: "Bridges tenant advance requirements",
      model: "Monthly repayment with risk assessment",
    },
    {
      tier: 2,
      name: "Tenant Services Platform",
      description:
        "Verified landlord ratings, digital lease management, deposit protection, and dispute resolution serving Ghana's 40%+ urban renter population.",
      capital: "$400-700K",
      score: 35,
      impact: "Empowers tenants with transparency and protection",
      model: "Freemium with premium dispute services",
    },
  ],

  competitors: [
    {
      name: "SESO Global",
      focus: "Blockchain land verification",
      gap: "Self-builder services integration",
      year: "2019",
      funding: "$3M+",
      priority: "High",
      strengths: [
        { name: "Title Verification", rating: 5 },
        { name: "Blockchain Tech", rating: 4 },
        { name: "Market Coverage", rating: 3 },
      ],
      gaps: ["Construction oversight integration", "Rental services collaboration", "Self-builder market extension"],
      bridgeOpportunity: "Title verification data partnership for self-builder market",
    },
    {
      name: "meQasa",
      focus: "Property listings & search",
      gap: "Transaction integrity layer",
      year: "2013",
      funding: "$2M+",
      priority: "Medium",
      strengths: [
        { name: "Property Listings", rating: 5 },
        { name: "User Base", rating: 4 },
        { name: "Brand Recognition", rating: 4 },
      ],
      gaps: ["Title verification integration", "Construction services layer", "Informal market extension"],
      bridgeOpportunity: "Verified listing integration with BRIDGE management services",
    },
    {
      name: "National Housing Mortgage Fund",
      focus: "Subsidized mortgages at 11.9-12%",
      gap: "Eligibility expansion potential",
      year: "2018",
      funding: "Gov't",
      priority: "High",
      strengths: [
        { name: "Below-Market Rates", rating: 5 },
        { name: "Government Backing", rating: 5 },
        { name: "Proof of Concept", rating: 4 },
      ],
      gaps: ["Private sector eligibility extension", "Scale acceleration", "Disbursement streamlining"],
      bridgeOpportunity: "Alternative income verification to expand eligibility beyond public sector",
    },
    {
      name: "GREDA",
      focus: "Developer association (250+ members)",
      gap: "Informal sector integration",
      year: "1988",
      funding: "Industry",
      priority: "Medium",
      strengths: [
        { name: "Industry Standards", rating: 4 },
        { name: "Government Access", rating: 5 },
        { name: "Member Network", rating: 4 },
      ],
      gaps: ["Informal sector bridge (90% of supply)", "Innovation acceleration", "Regional expansion"],
      bridgeOpportunity: "Quality standards partnership for self-builder market",
    },
    {
      name: "National Rental Assistance Scheme",
      focus: "Rent advance support",
      gap: "Scale and awareness amplification",
      year: "2023",
      funding: "Gov't",
      priority: "High",
      strengths: [
        { name: "Addresses Core Need", rating: 5 },
        { name: "Government Mandate", rating: 4 },
        { name: "Model Validation", rating: 4 },
      ],
      gaps: ["Eligibility broadening", "Scale amplification", "Awareness building"],
      bridgeOpportunity: "Private sector scale-up of validated rent advance model",
    },
    {
      name: "HouseAfrica (Nigeria)",
      focus: "Blockchain land registry",
      gap: "Ghana market collaboration",
      year: "2017",
      funding: "$400K+",
      priority: "Low",
      strengths: [
        { name: "Blockchain Registry", rating: 4 },
        { name: "200K+ Properties", rating: 4 },
        { name: "Ghana Expansion Plans", rating: 2 },
      ],
      gaps: ["Ghana market partnership", "Government integration pathway", "Local validation"],
      bridgeOpportunity: "Technology partnership if Ghana expansion materializes",
    },
  ],

  policyAlignment: [
    {
      policy: "Big Push Infrastructure Programme",
      allocation: "$10B commitment",
      alignment: "Housing components within largest infrastructure initiative in Ghana's history",
    },
    {
      policy: "Low-Cost Housing for Public Workers",
      allocation: "Salary deduction model",
      alignment: "BRIDGE verification and oversight services for government housing",
    },
    {
      policy: "Rent Control Bill",
      allocation: "Regulatory framework",
      alignment: "Rental guarantee products directly enable 1-year advance limit compliance",
    },
    {
      policy: "Lands Commission Digitization",
      allocation: "$85M project",
      alignment: "BRIDGE title verification complements government digitization with private verification layer",
    },
    {
      policy: "National Rental Assistance Scheme",
      allocation: "Gov't funded",
      alignment: "BRIDGE rent advance financing scales the NRAS model through private sector",
    },
    {
      policy: "Real Estate Agency Act 2020",
      allocation: "Regulatory framework",
      alignment: "BRIDGE contractor verification supports licensing implementation objectives",
    },
  ],

  relatedSectors: [
    {
      id: 2,
      name: "Financial Inclusion",
      icon: "wallet",
      reason: "Mortgage facilitation, payment escrow, housing savings",
    },
    {
      id: 1,
      name: "Infrastructure",
      icon: "building",
      reason: "Construction infrastructure, WASH, utility connections",
    },
    {
      id: 5,
      name: "Education & Skills",
      icon: "graduation",
      reason: "TVET construction training, artisan certification",
    },
  ],
};

// ============================================================================
// PREMIUM VALUE CHAIN DATA
// ============================================================================

const valueChainStages = [
  {
    id: 1,
    stage: "Land Acquisition",
    actor: "Land Buyers",
    population: "Millions annually",
    icon: "land",
    valueRetained: 100,
    valueLost: 0,
    painPoints: [
      "Title verification demand",
      "Formalization potential for 98%",
      "Security services opportunity",
      "Registration streamlining",
    ],
    stat: "60,000+ transactions to formalize",
  },
  {
    id: 2,
    stage: "Design & Approval",
    actor: "Professionals & Regulators",
    population: "Fragmented agencies",
    icon: "blueprint",
    valueRetained: 85,
    valueLost: 15,
    painPoints: [
      "Approval coordination platform",
      "Timeline acceleration services",
      "Process transparency tools",
      "Zoning clarity solutions",
    ],
    stat: "2+ years to streamline",
  },
  {
    id: 3,
    stage: "Construction",
    actor: "Self-Builders & Artisans",
    population: "90% of housing",
    icon: "hammer",
    valueRetained: 60,
    valueLost: 25,
    painPoints: [
      "Completion oversight demand",
      "Materials verification opportunity",
      "Cost management tools",
      "Quality inspection services",
    ],
    stat: "50%+ projects to complete",
  },
  {
    id: 4,
    stage: "Financing",
    actor: "Banks & Informal Lenders",
    population: "<5,000 mortgages",
    icon: "bank",
    valueRetained: 40,
    valueLost: 20,
    painPoints: [
      "Rate innovation potential",
      "Income verification solutions",
      "Collateral framework opportunity",
      "Title-backed lending enablement",
    ],
    stat: "0.8% mortgage-to-GDP to grow",
  },
  {
    id: 5,
    stage: "Occupancy",
    actor: "Tenants & Landlords",
    population: "19M renters",
    icon: "home",
    valueRetained: 25,
    valueLost: 15,
    painPoints: [
      "Rental guarantee product demand",
      "Maintenance service opportunity",
      "Tenant empowerment platform",
      "Lease formalization services",
    ],
    stat: "19M renters to serve",
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
    <path d="M12 5v14M5 12l7 7 7-7" />
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

const IconGraduation = () => (
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
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const IconShield = () => (
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
);
const IconKey = () => (
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
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);
const IconClipboard = () => (
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
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" />
  </svg>
);
const IconTool = () => (
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
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);
const IconTarget = () => (
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
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
const IconSearch = () => (
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
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IconCreditCard = () => (
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
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
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
const IconHome = () => (
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
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
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
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
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
const IconChevronDown = () => (
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
);

// Value Chain Icons
const valueChainIcons = {
  land: (
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
      <path d="M3 21h18" />
      <path d="M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1" />
      <rect x="5" y="3" width="14" height="18" rx="1" />
    </svg>
  ),
  blueprint: (
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
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <path d="M7 3v18" />
      <path d="M2 9h20" />
      <path d="M12 9v12" />
    </svg>
  ),
  hammer: (
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
      <path d="M15 12l-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9" />
      <path d="M17.64 15L22 10.64" />
      <path d="M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25V6.5L14.5 4 9.5 9l2.5 2.5 3.81-1.54c.85 0 1.65.33 2.25.93l1.25 1.25" />
    </svg>
  ),
  bank: (
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
      <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
    </svg>
  ),
  home: (
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
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
};

const solutionIcons = {
  "Construction Oversight Platform": <IconClipboard />,
  "Title Verification Platform": <IconSearch />,
  "Rental Guarantee Products": <IconShield />,
  "Property Management Service": <IconKey />,
  "Contractor Verification System": <IconCheck />,
  "Construction Skills Certification": <IconTool />,
  "Housing Cooperative Structure": <IconUsers />,
  "Rent Advance Financing": <IconCreditCard />,
  "Tenant Services Platform": <IconHome />,
};

// ============================================================================
// BRIDGE LOGO (Dark - for Header)
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

// ============================================================================
// BRIDGE LOGO WHITE (for Footer)
// ============================================================================

const BridgeLogoWhite = () => (
  <div style={{ display: "flex", alignItems: "center", height: "40px" }}>
    <svg viewBox="0 0 4113.9 932.3" height="36" style={{ display: "block" }}>
      <path
        fill={colors.white}
        d="M3355.1,655.6h31.2v5.7h-31.2v-5.7ZM3355.1,667h31.2v11.1h-31.2v-11.1ZM3355.1,683.9h31.2v11.1h-31.2v-11.1ZM3355.1,700.8h31.2v11.1h-31.2v-11.1ZM3355.1,717.7h31.2v11.1h-31.2v-11.1ZM3355.1,734.5h31.2v11.1h-31.2v-11.1ZM3355.1,751.4h31.2v10.8h-31.2v-10.8ZM3355.1,767.9h31.2v11.1h-31.2v-11.1ZM3355.1,784.9h31.2v11.1h-31.2v-11.1ZM3355.1,801.8h31.2v11.1h-31.2v-11.1ZM3355.1,818.6h31.2v11.1h-31.2v-11.1ZM3355.1,835.5h31.2v11.1h-31.2v-11.1ZM3355.1,852.4h31.2v11.1h-31.2v-11.1ZM3355.1,869.2h31.2v11.1h-31.2v-11.1ZM3355.1,886.1h31.2v11.1h-31.2v-11.1ZM3355.1,903h31.2v5.7h-31.2v-5.7ZM3397.5,655.6h61.7c12.5,0,24.3,1.7,35.1,5.7h-96.8v-5.7h0ZM3397.5,667h109.7c5.9,3,11.4,6.7,16.7,11.1h-126.3v-11.1h-.1ZM3397.5,801.8h126.3c-5.2,4.4-10.8,8.1-16.7,11.1h-109.7v-11.1h.1ZM3397.5,818.6h96.8c-10.8,4-22.5,6.1-35.1,6.1h-30.5v84h-31.2v-90.2.1ZM3479.6,739.9c0-17.2-13.5-24.7-28.1-24.7h-23.6v49.3h23.6c14.5,0,28.1-7.5,28.1-24.7h0v.1ZM3485.6,683.9h44.4c3.4,3,6.6,6.7,9.3,11.1h-37.1c-4.9-4.4-10.8-8.4-16.7-11.1h.1ZM3502.2,784.9h37.1c-2.8,4-5.9,7.8-9.3,11.1h-44.4c5.9-2.7,11.8-6.7,16.7-11.1h-.1ZM3507.4,700.8h35.7c2.4,3.4,4.2,7.1,5.6,11.1h-33.6c-2.1-4-4.5-7.8-7.7-11.1ZM3515,767.9h33.6l-5.6,11.1h-35.7c3.1-3.4,5.6-7.1,7.7-11.1ZM3517.8,717.7h32.6c1.3,3.7,2.4,7.5,2.8,11.1h-32.3c-.7-3.7-1.8-7.5-3.1-11.1h0ZM3520.9,751.4h32.3c-.3,3.7-1.3,7.5-2.8,10.8h-32.6c1.3-3.4,2.4-7.1,3.1-10.8h0ZM3521.7,734.5h32.3c.3,3.7.3,7.5-.3,11.1h-32c.7-3.7.7-7.5,0-11.1h0ZM3397.5,689.2h61.7c28.4,0,51.7,23.3,51.7,50.9s-23.2,50.9-51.7,50.9h-61.7v-102h0v.2Z"
      />
      <path
        fill={colors.white}
        d="M3572.3,655.6h31.2v5.7h-31.2v-5.7ZM3572.3,667h31.2v11.1h-31.2v-11.1ZM3572.3,683.9h31.2v11.1h-31.2v-11.1ZM3572.3,700.8h31.2v11.1h-31.2v-11.1ZM3572.3,717.7h31.2v11.1h-31.2v-11.1ZM3572.3,734.5h31.2v11.1h-31.2v-11.1ZM3572.3,751.4h31.2v10.8h-31.2v-10.8ZM3572.3,767.9h31.2v11.1h-31.2v-11.1ZM3572.3,784.9h31.2v11.1h-31.2v-11.1ZM3572.3,801.8h31.2v11.1h-31.2v-11.1ZM3572.3,818.6h31.2v11.1h-31.2v-11.1ZM3572.3,835.5h31.2v11.1h-31.2v-11.1ZM3572.3,852.4h31.2v11.1h-31.2v-11.1ZM3572.3,869.2h31.2v11.1h-31.2v-11.1ZM3572.3,886.1h31.2v11.1h-31.2v-11.1ZM3572.3,903h31.2v5.7h-31.2v-5.7ZM3614.6,655.6h45.4c12.5,0,24.6,2.1,35.7,5.7h-81.2v-5.7h.1ZM3614.6,667h94.4c5.9,3,11.4,6.7,16,11.1h-110.3v-11.1h-.1ZM3614.6,689h45.4c23.6,0,42,12.5,42,34.1,0,36.4-42.3,62.5-87.5,72.2v-106.4l.1.1ZM3685.4,775.1c17.3,9.8,36.4,32.4,36.4,57.1s-16,43.2-46.2,43.2h-61.1v-69.5c24.6-4.8,52.4-15.6,70.8-30.7h.1v-.1ZM3614.6,886.1h125.2c-4.5,4.4-10.1,8.1-16,11.1h-109.3v-11.1h.1ZM3614.6,903h96.1c-10.8,3.7-22.5,5.7-35.1,5.7h-61.1v-5.7h.1ZM3674.3,725.4c0-7.5-6.6-12.9-15.6-12.9h-16.3v49c19.8-9.1,32-21.9,32-36.1h-.1ZM3686.1,805.8c-13.2,7.5-28.4,13.5-43.7,18.3v27.7h32c19.1,0,27.1-17.5,11.8-45.9h-.1v-.1ZM3687.5,683.9h43.1c3.1,3.4,5.6,7.1,7.7,11.1h-35.4c-4.2-4.8-9.3-8.4-15.3-11.1h-.1ZM3694.7,767.9h38.9c3.8,3.7,7.3,7.5,10.4,11.1h-35.7c-4.2-4.4-9-8.1-13.5-11.1h-.1,0ZM3705.8,751.4h30.5c-2.1,4-4.5,7.8-7.3,10.8h-30.9c2.8-3.4,5.6-7.1,7.7-10.8h0ZM3718.4,869.2h35.7c-2.4,4-5.2,7.8-8.7,11.1h-42.3c5.9-3,11.1-6.7,15.3-11.1h.1-.1ZM3706.9,700.8h33.6c1.3,2.7,2.8,7.1,3.1,11.1h-32c-1-4-2.8-7.8-4.9-11.1h.2ZM3711.8,734.5h30.9c-.7,4-1.8,7.8-3.4,11.1h-30.5c1.3-3.7,2.4-7.5,3.1-11.1h-.1ZM3712.8,717.7h31.2c.3,3.7.3,7.5-.3,11.1h-30.9c.7-3,.7-8.1,0-11.1h0ZM3713.8,784.9h34.3c2.4,3.4,4.9,7.5,6.6,11.1h-33c-2.4-4-5.2-7.8-8-11.1h.1ZM3729.1,852.4h32.3c-.7,3.7-2.1,7.5-4.2,11.1h-34c2.4-3.4,4.5-7.1,5.9-11.1h0ZM3724.9,801.8h32.6c1.8,3.7,3.1,7.5,3.8,11.1h-31.5c-1.3-3.7-2.8-7.5-4.9-11.1ZM3732.6,835.5h31.5c0,3.7-.3,7.5-1.3,11.1h-32c1-3.7,1.8-7.5,1.8-11.1h0ZM3731.3,818.6h31.5c1,3.7,1.3,7.5,1.3,11.1h-31.2c-.3-3.7-.7-7.5-1.8-11.1h.2Z"
      />
      <path
        fill={colors.white}
        d="M3774.6,767.9h32l-.7,11.1h-32c0-3.4.3-7.8.7-11.1ZM3773.9,784.9h32c0,3.4.3,7.5.7,11.1h-32c-.3-3.4-.7-7.8-.7-11.1ZM3777.7,751.4h32.3c-1,3.7-1.8,6.7-2.4,10.8h-32.3c.7-3.7,1.3-7.1,2.4-10.8ZM3775.3,801.8h32.3c.7,4,1.3,7.5,2.4,11.1h-32.3c-1-3.7-1.8-7.5-2.4-11.1ZM3783.2,734.5h33c-1.8,3.7-3.1,7.5-4.5,11.1h-32.6c1-3.7,2.4-7.5,4.2-11.1h-.1ZM3779.1,818.6h32.6c1.3,3.7,2.8,7.5,4.5,11.1h-33c-1.8-3.7-3.1-7.5-4.2-11.1h.1ZM3791.5,717.7h34.3l-7,11.1h-33.3c1.8-3.7,3.4-7.1,5.9-11.1h.1ZM3785.7,835.5h33.3l7,11.1h-34.3c-2.4-4-4.2-7.5-5.9-11.1h-.1ZM3803.4,700.8h37.5c-3.8,3.4-7.7,7.5-10.4,11.1h-35.4c2.1-3.4,5.2-7.5,8.3-11.1ZM3795.1,852.4h35.4c2.8,3.7,6.6,7.8,10.4,11.1h-37.5c-3.1-3.7-6.2-7.8-8.3-11.1ZM3819.7,683.9h45.1c-5.9,3-11.8,6.7-17.3,11.1h-39.2c3.8-4,7.7-7.8,11.4-11.1ZM3808.3,869.2h39.2c5.6,4.4,11.4,8.1,17.3,11.1h-45.1c-3.8-3.4-7.7-7.1-11.4-11.1ZM3817,782.2c0-55.4,43.1-99.3,96.8-99.3s57.9,14.2,75.6,36.8l-18.1,21.9c-12.9-18.9-33.6-31-57.6-31-36.1,0-64.9,31-64.9,71.6s28.8,71.6,64.9,71.6,44.7-12.1,57.6-31l18.1,21.9c-17.7,22.6-44.7,36.8-75.6,36.8-53.7,0-96.8-43.9-96.8-99.3ZM3844.7,667h138.1c6.2,3.4,12.1,7.1,17.7,11.1h-51.1c-11.4-4-23.2-6.1-35.7-6.1s-24.3,2.1-35.7,6.1h-51.1c5.6-4,11.4-7.8,17.7-11.1h-.1.2ZM3826.9,886.1h51.1c11.4,4,23.2,6.1,35.7,6.1s24.3-2.1,35.7-6.1h51.1c-5.6,4-11.4,7.8-17.7,11.1h-138.1c-6.2-3.4-12.1-7.1-17.7-11.1h.1-.2ZM3913.8,650.2c20.4,0,39.5,4,56.9,11.1h-113.8c17.3-7.1,36.4-11.1,56.9-11.1h.1-.1ZM3856.8,903h113.8c-17.3,7.1-36.4,11.1-56.9,11.1s-39.5-4-56.9-11.1h-.1.1ZM3962.7,683.9h45.1l5.9,5.4-4.5,5.7h-29.2c-5.6-4.4-11.4-8.1-17.3-11.1h-.1.1ZM3980,869.2h29.2l4.5,5.4c-1.8,2.1-3.8,4-5.9,5.7h-45.1c5.9-3,11.8-6.7,17.3-11.1h.1-.1ZM3986.6,700.8h18.1l-8.3,10.2c-2.8-3.4-6.2-7.1-9.8-10.2h0ZM3996.3,853.3l8.3,10.2h-18.1c3.4-3,7-6.7,9.8-10.2h0Z"
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
// HEADER (v2 - sticky, centered nav, BridgeLogo, Request Access button)
// ============================================================================

const Header = () => {
  const [hoveredNav, setHoveredNav] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Home", "Services", "Sectors", "Insight", "Contact"];

  return (
    <>
      <header
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.85)" : colors.white,
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          padding: isMobile ? "0 20px" : "0 80px",
          height: "72px",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <BridgeLogo height={isMobile ? 32 : 40} />
        </div>

        {!isMobile && (
          <nav
            style={{
              display: "flex",
              gap: "36px",
              alignItems: "center",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              opacity: scrolled ? 0 : 1,
              pointerEvents: scrolled ? "none" : "auto",
              transition: "opacity 0.3s ease",
            }}
          >
            {navItems.map((item, i) => {
              const isActive = item === "Sectors";
              return (
                <a
                  key={item}
                  href="#"
                  onMouseEnter={() => setHoveredNav(i)}
                  onMouseLeave={() => setHoveredNav(null)}
                  style={{
                    color: isActive ? colors.primary : hoveredNav === i ? colors.primary : "#191919",
                    textDecoration: "none",
                    fontSize: "15px",
                    fontWeight: isActive ? "700" : "500",
                    fontFamily: "Inter, sans-serif",
                    letterSpacing: "0.3px",
                    transition: "color 0.2s ease",
                    position: "relative",
                  }}
                >
                  {item}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: "-6px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "20px",
                        height: "3px",
                        backgroundColor: colors.accent,
                        borderRadius: "2px",
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>
        )}

        {isMobile ? (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: mobileMenuOpen ? "#191919" : "transparent",
              border: `1.5px solid ${mobileMenuOpen ? "#191919" : colors.line}`,
              borderRadius: "10px",
              cursor: "pointer",
              padding: "8px",
              width: "40px",
              height: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              transition: "all 0.3s ease",
            }}
          >
            <span
              style={{
                width: "18px",
                height: "1.5px",
                backgroundColor: mobileMenuOpen ? colors.white : colors.primary,
                borderRadius: "1px",
                transition: "all 0.3s ease",
                transform: mobileMenuOpen ? "rotate(45deg) translateY(5.5px)" : "none",
              }}
            />
            <span
              style={{
                width: "18px",
                height: "1.5px",
                backgroundColor: mobileMenuOpen ? colors.white : colors.primary,
                borderRadius: "1px",
                transition: "all 0.3s ease",
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                width: "18px",
                height: "1.5px",
                backgroundColor: mobileMenuOpen ? colors.white : colors.primary,
                borderRadius: "1px",
                transition: "all 0.3s ease",
                transform: mobileMenuOpen ? "rotate(-45deg) translateY(-5.5px)" : "none",
              }}
            />
          </button>
        ) : (
          <button
            style={{
              backgroundColor: colors.primary,
              color: colors.white,
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
            }}
          >
            Request Access
            <span
              style={{
                width: "24px",
                height: "24px",
                backgroundColor: colors.accent,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconArrowRight />
            </span>
          </button>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {isMobile && mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "72px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#191919",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            padding: "40px 24px 32px",
            gap: "0",
            animation: "fadeIn 0.25s ease",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            {navItems.map((item, i) => {
              const isActive = item === "Sectors";
              return (
                <a
                  key={item}
                  href="#"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    color: isActive ? colors.accent : "rgba(255,255,255,0.85)",
                    textDecoration: "none",
                    fontSize: "24px",
                    fontWeight: isActive ? "700" : "400",
                    fontFamily: "Inter, sans-serif",
                    padding: "20px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    letterSpacing: "-0.3px",
                  }}
                >
                  {item}
                  {isActive && (
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: "700",
                        backgroundColor: colors.accent,
                        color: "#191919",
                        padding: "3px 8px",
                        borderRadius: "50px",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      Active
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "auto", paddingTop: "24px" }}>
            <button
              style={{
                backgroundColor: colors.accent,
                color: "#191919",
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
              }}
            >
              Request Access
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#191919"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <div
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "12px 0" }}
            >
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>
                info@bridgepbc.com
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// ============================================================================
// HERO SECTION — Production Spec (responsive)
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
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto", width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 420px",
            gap: isMobile ? "32px" : "60px",
            alignItems: "start",
            flex: 1,
          }}
        >
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
              <span style={{ fontWeight: "700" }}>Housing</span> &{!isMobile && <br />} Real Estate
            </h1>

            {/* Subheading */}
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
              The Foundation Beneath Every Family's Future
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
                  gap: "10px",
                  flex: isMobile ? "1 1 100%" : "none",
                  justifyContent: isMobile ? "center" : "flex-start",
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

          {/* Stats Card */}
          <div
            style={{
              backgroundColor: colors.primary,
              borderRadius: "20px",
              padding: isMobile ? "24px" : "32px",
              minWidth: isMobile ? "auto" : "340px",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
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

            {/* Main Stats Row */}
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
                    fontSize: "42px",
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

            {/* Stat Rows — 4 items */}
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
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "rgba(255,255,255,0.8)",
                      fontFamily: "Inter, sans-serif",
                      display: "block",
                    }}
                  >
                    {stat.label}
                  </span>
                  {stat.detail && (
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "rgba(255,255,255,0.35)",
                        fontFamily: "Inter, sans-serif",
                        fontStyle: "italic",
                        marginTop: "2px",
                        display: "block",
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
      {/* Scroll to Explore — desktop only */}
      {!isMobile && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "auto",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              color: "#999",
              marginBottom: "8px",
            }}
          >
            Explore Analysis
          </span>
          <div
            style={{
              color: "#999",
              animation: "bounce 2s infinite",
            }}
          >
            <IconArrowDown />
          </div>
        </div>
      )}
    </section>
  );
};

// ============================================================================
// SECTION 2: PROBLEM (updated pill to Variant A - Bordered)
// ============================================================================

const ProblemSection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [expandedCard, setExpandedCard] = useState(null);

  const problemSectionData = [
    {
      id: 1,
      title: "Land Title Formalization",
      description:
        "60,000+ land transactions awaiting modern verification solutions — creating an enormous market for title security, digital records, and trusted registration.",
      rootCauses: [
        { title: "Title Registration", description: "Framework opportunity" },
        { title: "Centralized Database", description: "Land records platform" },
        { title: "Digital Modernization", description: "Records digitization" },
        { title: "Dispute Resolution", description: "Streamlined processes" },
      ],
      quantification: "60,000+ transactions to formalize",
      severity: "High Priority",
      severityScore: 95,
      affectedCount: "60,000+",
      affectedLabel: "transactions to formalize",
      bridgeSolution: "Title Verification Platform",
    },
    {
      id: 2,
      title: "Construction Completion",
      description:
        "Over 50% of self-managed building projects represent completion opportunities — through milestone oversight, contractor accountability, and quality inspections.",
      rootCauses: [
        { title: "Licensing Framework", description: "Contractor standards" },
        { title: "Performance Bonds", description: "Financial accountability" },
        { title: "Quality Inspection", description: "Independent oversight" },
        { title: "Cost Management", description: "Budget transparency" },
      ],
      quantification: "50%+ projects awaiting completion solutions",
      severity: "High Priority",
      severityScore: 92,
      affectedCount: "50%+",
      affectedLabel: "projects to complete",
      bridgeSolution: "Construction Oversight Platform",
    },
    {
      id: 3,
      title: "Rental Access Innovation",
      description:
        "19 million Ghanaians navigating 2-3 year advance requirements — creating massive demand for rental guarantees, tenant screening, and payment alternatives.",
      rootCauses: [
        { title: "Enforcement Reform", description: "Rent advance limits" },
        { title: "Guarantee Products", description: "Insurance-backed tools" },
        { title: "Tenant Credit", description: "Screening infrastructure" },
        { title: "Payment Innovation", description: "Monthly alternatives" },
      ],
      quantification: "19M citizens to serve with rental reform",
      severity: "Strategic",
      severityScore: 88,
      affectedCount: "19M",
      affectedLabel: "renters to serve",
      bridgeSolution: "Rental Guarantee Products + Tenant Services",
    },
    {
      id: 4,
      title: "Workforce Professionalization",
      description:
        "80%+ of construction artisans are ready for formal certification and training pathways — building quality assurance, safety standards, and recognition.",
      rootCauses: [
        { title: "Certification System", description: "National standards" },
        { title: "Training Pathways", description: "Formal TVET links" },
        { title: "Safety Standards", description: "Worksite compliance" },
        { title: "Skills Recognition", description: "Premium pricing access" },
      ],
      quantification: "80%+ artisans to certify professionally",
      severity: "Strategic",
      severityScore: 80,
      affectedCount: "80%+",
      affectedLabel: "artisans to certify",
      bridgeSolution: "Construction Skills Certification + Artisan Co-op",
    },
  ];

  const severityColors = (sev) =>
    sev === "High Priority"
      ? { text: colors.primary, bg: colors.accentLight, fill: colors.primary }
      : { text: "#5C7A1F", bg: "rgba(184,217,53,0.12)", fill: colors.accent };

  return (
    <section style={{ backgroundColor: colors.background, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
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
              margin: "24px 0 20px 0",
              letterSpacing: "-0.5px",
              lineHeight: "1.2",
              maxWidth: "820px",
            }}
          >
            <span style={{ fontWeight: "600" }}>1.8M+ Homes</span> and 19M Renters Ready for{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Better Solutions</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              color: "#666",
              lineHeight: "1.65",
              maxWidth: "680px",
              margin: 0,
            }}
          >
            Ghana's housing sector represents one of the most compelling investment landscapes in West Africa. From land
            buyers to tenants, every participant is ready for trust infrastructure, better information, and professional
            services.
          </p>
        </div>

        {/* Card Grid */}
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
          {problemSectionData.map((problem, i) => {
            const isExpanded = expandedCard === i;
            const sCol = severityColors(problem.severity);
            return (
              <div
                key={problem.id}
                style={isMobile ? { minWidth: "85%", maxWidth: "85%", flexShrink: 0, scrollSnapAlign: "start" } : {}}
              >
                <div
                  onClick={() => setExpandedCard(isExpanded ? null : i)}
                  style={{
                    backgroundColor: colors.white,
                    borderRadius: isMobile ? "16px" : "20px",
                    padding: isMobile ? "20px" : "28px",
                    cursor: "pointer",
                    border: isExpanded ? `2px solid ${colors.accent}` : `1px solid ${colors.line}`,
                    transition: "all 0.3s ease",
                  }}
                >
                  {/* Zone 1 — Title Row */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "12px",
                      marginBottom: "12px",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: isMobile ? "16px" : "18px",
                        fontWeight: "600",
                        color: colors.dark,
                        margin: 0,
                        flex: 1,
                      }}
                    >
                      {problem.title}
                    </h3>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "11px",
                        fontWeight: "700",
                        color: sCol.text,
                        backgroundColor: sCol.bg,
                        padding: "6px 14px",
                        borderRadius: "20px",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {problem.severity}
                    </span>
                  </div>
                  {/* Description — line clamp */}
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: isMobile ? "13px" : "14px",
                      color: "#666",
                      lineHeight: "1.6",
                      margin: "0 0 16px 0",
                      display: "-webkit-box",
                      WebkitLineClamp: isMobile ? 2 : 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      ...(isMobile ? {} : { minHeight: "63px" }),
                    }}
                  >
                    {problem.description}
                  </p>

                  {/* Zone 2 — Impact Bar */}
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
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      Impact: {problem.quantification}
                    </span>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div style={{ borderTop: `1px solid ${colors.line}`, paddingTop: "16px" }}>
                      {/* Zone 3 — Priority + Scale */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                          gap: "12px",
                          marginBottom: "20px",
                        }}
                      >
                        {/* Priority */}
                        <div style={{ backgroundColor: colors.background, borderRadius: "12px", padding: "14px" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
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
                                color: sCol.text,
                                backgroundColor: sCol.bg,
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
                                width: `${problem.severityScore}%`,
                                height: "100%",
                                backgroundColor: sCol.fill,
                                borderRadius: "4px",
                                transition: "width 0.8s ease",
                              }}
                            />
                          </div>
                        </div>
                        {/* Scale */}
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
                              marginBottom: "4px",
                            }}
                          >
                            Scale
                          </span>
                          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
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
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#666" }}>
                              {problem.affectedLabel}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Zone 4 — Opportunity Drivers */}
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
                            Opportunity Drivers
                          </span>
                        </div>
                        <div
                          style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "10px" }}
                        >
                          {problem.rootCauses.map((cause, j) => (
                            <div
                              key={j}
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
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
                                  {j + 1}
                                </span>
                              </div>
                              <div>
                                <div
                                  style={{
                                    fontFamily: "Inter, sans-serif",
                                    fontSize: isMobile ? "13px" : "14px",
                                    fontWeight: "600",
                                    color: colors.dark,
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

                      {/* Zone 5 — BRIDGE Solution Footer */}
                      <div
                        style={{
                          borderTop: `1px solid ${colors.line}`,
                          paddingTop: "16px",
                          display: "flex",
                          flexDirection: isMobile ? "column" : "row",
                          alignItems: isMobile ? "flex-start" : "center",
                          gap: isMobile ? "8px" : "16px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={colors.accent}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#888" }}>
                            BRIDGE Solution:
                          </span>
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "14px",
                              fontWeight: "600",
                              color: colors.primary,
                            }}
                          >
                            {problem.bridgeSolution}
                          </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "13px",
                              fontWeight: "500",
                              color: colors.primary,
                            }}
                          >
                            View
                          </span>
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
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile scroll indicators */}
        {isMobile && (
          <div
            style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "16px" }}
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
// SECTION 3: PREMIUM VALUE CHAIN (pill Variant C - Lime Glow)
// ============================================================================

const ChevronArrow = ({ active }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={active ? colors.accent : "rgba(255,255,255,0.15)"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transition: "stroke 0.3s ease" }}
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const ValueChainSectionPremium = () => {
  const isMobile = useIsMobile();
  const [activeStage, setActiveStage] = useState(0);
  const [showMoreVC, setShowMoreVC] = useState(false);

  return (
    <section style={{ backgroundColor: colors.white, padding: isMobile ? "48px 20px" : "80px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
        {/* Pill: on white bg → background fill + border */}
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
            marginBottom: "20px",
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
            margin: "0 0 16px 0",
            letterSpacing: "-0.5px",
            lineHeight: "1.2",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          From Land to Living
        </h2>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "15px" : "16px",
            color: "#666",
            lineHeight: "1.65",
            maxWidth: "750px",
            margin: isMobile ? "0 auto 28px" : "0 auto 40px",
          }}
        >
          Follow the housing journey from land acquisition through occupancy — see where strategic resources and
          innovation create compounding value at every stage.
        </p>
      </div>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Stage Flow Nav */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            gap: "0",
            marginBottom: isMobile ? "24px" : "40px",
            ...(isMobile
              ? {
                  overflowX: "auto",
                  WebkitOverflowScrolling: "touch",
                  margin: "0 -20px",
                  padding: "0 20px 8px",
                  marginBottom: "24px",
                }
              : {}),
          }}
        >
          {valueChainStages.map((stage, i) => {
            const isActive = activeStage === i;
            const isPast = i < activeStage;
            return (
              <React.Fragment key={i}>
                <div
                  onClick={() => {
                    setActiveStage(i);
                    setShowMoreVC(false);
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    flex: isMobile ? "none" : 1,
                    maxWidth: isMobile ? "80px" : "180px",
                    minWidth: isMobile ? "64px" : "auto",
                  }}
                >
                  <div
                    style={{
                      width: isActive ? (isMobile ? "52px" : "64px") : isMobile ? "44px" : "56px",
                      height: isActive ? (isMobile ? "52px" : "64px") : isMobile ? "44px" : "56px",
                      borderRadius: isActive ? "18px" : "16px",
                      backgroundColor: isActive ? colors.primary : isPast ? colors.accentLight : colors.background,
                      border: isActive ? "none" : `2px solid ${isPast ? colors.primary : colors.line}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      color: isActive ? colors.white : isPast ? colors.primary : "#999",
                    }}
                  >
                    {valueChainIcons[stage.icon]}
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: isMobile ? "10px" : "13px",
                      marginTop: isMobile ? "8px" : "10px",
                      textAlign: "center",
                      fontWeight: isActive ? "700" : "500",
                      color: isActive ? colors.primary : isPast ? colors.primary : "#999",
                      transition: "all 0.3s ease",
                      lineHeight: "1.2",
                      maxWidth: isMobile ? "64px" : "none",
                    }}
                  >
                    {isMobile ? stage.stage.split(" ")[0] : stage.stage}
                  </div>
                </div>
                {i < valueChainStages.length - 1 && !isMobile && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingTop: "18px",
                      opacity: i < activeStage ? 1 : 0.3,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={i < activeStage ? colors.primary : colors.line}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Value Creation Flow bar */}
        <div style={{ marginBottom: isMobile ? "20px" : "28px", padding: isMobile ? "0" : "0 40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "11px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: "#999",
              }}
            >
              Value Creation Flow
            </span>
            <span
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: "700", color: colors.primary }}
            >
              {valueChainStages[activeStage].valueRetained}% value capture at this stage
            </span>
          </div>
          <div
            style={{
              height: "6px",
              backgroundColor: colors.line,
              borderRadius: "3px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                width: `${valueChainStages[activeStage].valueRetained}%`,
                height: "100%",
                borderRadius: "3px",
                background: `linear-gradient(90deg, ${colors.accent}, ${valueChainStages[activeStage].valueRetained > 60 ? colors.accent : colors.primary})`,
                transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
            {!isMobile &&
              valueChainStages.map((s, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: "-3px",
                    left: `${s.valueRetained}%`,
                    transform: "translateX(-50%)",
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: activeStage === i ? colors.primary : colors.line,
                    border: `2px solid ${activeStage === i ? colors.primary : colors.line}`,
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
          </div>
        </div>

        {/* Detail Panel — compact */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "20px" : "32px",
            backgroundColor: colors.background,
            borderRadius: "16px",
            padding: isMobile ? "20px" : "28px 32px",
            border: `1px solid ${colors.line}`,
          }}
        >
          {/* Left: Stage Info */}
          <div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: isMobile ? "16px" : "20px" }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  backgroundColor: colors.accentLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.primary,
                }}
              >
                {valueChainIcons[valueChainStages[activeStage].icon]}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: isMobile ? "18px" : "20px",
                    fontWeight: "700",
                    color: colors.primary,
                  }}
                >
                  {valueChainStages[activeStage].stage}
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#999" }}>
                  {valueChainStages[activeStage].actor}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: isMobile ? "10px" : "12px",
                marginBottom: isMobile ? "14px" : "16px",
              }}
            >
              <div
                style={{
                  padding: isMobile ? "10px" : "12px 14px",
                  backgroundColor: colors.white,
                  borderRadius: "10px",
                  border: `1px solid ${colors.line}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px",
                    color: "#999",
                    marginBottom: "2px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Scale
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: colors.primary,
                  }}
                >
                  {valueChainStages[activeStage].population}
                </div>
              </div>
              <div
                style={{
                  padding: isMobile ? "10px" : "12px 14px",
                  backgroundColor: colors.white,
                  borderRadius: "10px",
                  border: `1px solid ${colors.line}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px",
                    color: "#999",
                    marginBottom: "2px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Recapture Potential
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: colors.primary,
                  }}
                >
                  {valueChainStages[activeStage].valueLost > 0
                    ? `${valueChainStages[activeStage].valueLost}%`
                    : "Entry point"}
                </div>
              </div>
            </div>

            {/* Key stat callout — compact */}
            <div
              style={{
                padding: isMobile ? "12px 16px" : "14px 18px",
                backgroundColor: colors.accentLight,
                borderRadius: "10px",
                marginBottom: valueChainStages[activeStage].valueLost > 0 ? (isMobile ? "14px" : "16px") : 0,
              }}
            >
              <div
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: isMobile ? "20px" : "22px",
                  fontWeight: "700",
                  color: colors.primary,
                  marginBottom: "2px",
                  lineHeight: "1.1",
                }}
              >
                {valueChainStages[activeStage].stat}
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#999" }}>
                Key indicator for this stage
              </div>
            </div>

            {/* Recapture strip — moved to left column */}
            {valueChainStages[activeStage].valueLost > 0 && (
              <div
                style={{
                  padding: "10px 14px",
                  backgroundColor: colors.white,
                  borderRadius: "10px",
                  border: `1px solid ${colors.line}`,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
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
                    fontSize: "12px",
                    fontWeight: "600",
                    color: colors.primary,
                  }}
                >
                  {valueChainStages[activeStage].valueLost}% value recapture potential at this stage
                </span>
              </div>
            )}
          </div>

          {/* Right: Opportunity Areas (collapsible on mobile) */}
          {(!isMobile || showMoreVC) && (
            <div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: colors.primary,
                  marginBottom: "14px",
                }}
              >
                Opportunity Areas
              </div>
              {valueChainStages[activeStage].painPoints.map((point, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "8px",
                    padding: "10px 14px",
                    backgroundColor: colors.white,
                    borderRadius: "10px",
                    border: `1px solid ${colors.line}`,
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: colors.accent,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#555", lineHeight: "1.4" }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Mobile toggle */}
          {isMobile && (
            <button
              onClick={() => setShowMoreVC(!showMoreVC)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "12px",
                backgroundColor: "transparent",
                border: `1px solid ${colors.line}`,
                borderRadius: "10px",
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                fontWeight: "600",
                color: colors.primary,
                cursor: "pointer",
              }}
            >
              {showMoreVC ? "Show less" : "Show opportunity areas"}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.primary}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transform: showMoreVC ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }}
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
// SECTION 4: SOLUTIONS (pill Variant A - Bordered on white)
// ============================================================================

const SolutionsSection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [activeTier, setActiveTier] = useState("all");
  const tiers = [
    { id: "all", label: "All Ventures" },
    { id: 1, label: "Flagship" },
    { id: 2, label: "Scaling" },
  ];
  const filtered = activeTier === "all" ? sector.solutions : sector.solutions.filter((s) => s.tier === activeTier);
  const [ventureScrollIndex, setVentureScrollIndex] = React.useState(0);
  const ventureScrollRef = React.useRef(null);

  const handleVentureScroll = () => {
    if (!ventureScrollRef.current) return;
    const el = ventureScrollRef.current;
    const cardWidth = el.offsetWidth * 0.88 + 12;
    setVentureScrollIndex(Math.round(el.scrollLeft / cardWidth));
  };
  const scrollToVenture = (idx) => {
    if (!ventureScrollRef.current) return;
    const el = ventureScrollRef.current;
    const cardWidth = el.offsetWidth * 0.88 + 12;
    el.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
    setVentureScrollIndex(idx);
  };

  return (
    <section style={{ backgroundColor: colors.primary, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "16px" }}>
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
              marginBottom: "20px",
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
              margin: "0",
              letterSpacing: "-0.5px",
              lineHeight: "1.2",
              maxWidth: "900px",
            }}
          >
            <span style={{ fontWeight: "700" }}>Ventures</span> That Build{" "}
            <span style={{ fontWeight: "700", color: colors.accent }}>Lasting Value</span>
          </h2>
        </div>

        {/* Description row with filter aligned right */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "flex-end",
            gap: isMobile ? "16px" : "24px",
            marginBottom: isMobile ? "28px" : "36px",
          }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              color: "rgba(255,255,255,0.6)",
              lineHeight: "1.65",
              maxWidth: "680px",
              margin: "0",
            }}
          >
            Nine ventures — each one a bridge from insight to investment to measurable public benefit — spanning
            verification, oversight, professional management, and innovative financing.
          </p>
          {/* Tier Filter — aligned with description */}
          <div
            style={{
              display: "inline-flex",
              gap: "4px",
              flexShrink: 0,
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50px",
              padding: "4px",
            }}
          >
            {tiers.map((tier) => (
              <button
                key={String(tier.id)}
                onClick={() => setActiveTier(tier.id)}
                style={{
                  padding: isMobile ? "5px 12px" : "6px 16px",
                  borderRadius: "50px",
                  border: "none",
                  backgroundColor: activeTier === tier.id ? colors.accent : "transparent",
                  color: activeTier === tier.id ? colors.primary : "rgba(255,255,255,0.5)",
                  fontFamily: "Inter, sans-serif",
                  fontSize: isMobile ? "11px" : "12px",
                  fontWeight: activeTier === tier.id ? "700" : "500",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={ventureScrollRef}
          onScroll={handleVentureScroll}
          style={
            isMobile
              ? {
                  display: "flex",
                  gap: "12px",
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  margin: "0 -20px",
                  padding: "0 20px 4px",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }
              : {
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "24px",
                  minHeight: "580px",
                }
          }
        >
          {filtered.map((solution, i) => (
            <div
              key={solution.name}
              style={{
                backgroundColor: colors.white,
                borderRadius: "16px",
                padding: isMobile ? "24px" : "28px",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                ...(isMobile ? { minWidth: "88%", maxWidth: "88%", flexShrink: 0, scrollSnapAlign: "start" } : {}),
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "12px",
                  marginBottom: "10px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: isMobile ? "16px" : "17px",
                    fontWeight: "600",
                    color: colors.primary,
                    margin: "0",
                    lineHeight: "1.3",
                    flex: 1,
                    minHeight: isMobile ? "auto" : "44px",
                  }}
                >
                  {solution.name}
                </h3>
                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: "100px",
                    backgroundColor: solution.tier === 1 ? colors.accentLight : colors.background,
                    border: `1px solid ${solution.tier === 1 ? colors.accent : colors.line}`,
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: colors.primary,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {solution.tier === 1 ? "Flagship" : "Scaling"}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  color: "#666",
                  lineHeight: "1.6",
                  margin: "0 0 20px 0",
                  minHeight: isMobile ? "auto" : "64px",
                  flex: 1,
                }}
              >
                {solution.description}
              </p>
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
                <div>
                  <div
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "18px",
                      fontWeight: "700",
                      color: colors.primary,
                    }}
                  >
                    {solution.capital}
                  </div>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#999" }}>
                    Capital required
                  </div>
                </div>
                <div style={{ padding: "4px 10px", borderRadius: "6px", backgroundColor: colors.accentLight }}>
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      fontWeight: "700",
                      color: colors.primary,
                    }}
                  >
                    {solution.score}
                  </span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#999", marginLeft: "2px" }}>
                    /50
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile scroll indicators */}
        {isMobile && (
          <div
            style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "16px" }}
          >
            {filtered.map((_, i) => (
              <div
                key={i}
                onClick={() => scrollToVenture(i)}
                style={{
                  width: ventureScrollIndex === i ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: ventureScrollIndex === i ? colors.accent : "rgba(255,255,255,0.2)",
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
// SECTION 5: MARKET ECOSYSTEM (pill Variant A - Bordered)
// ============================================================================

const MarketEcosystemSection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [selectedCompetitor, setSelectedCompetitor] = useState(0);
  const [showMoreLandscape, setShowMoreLandscape] = useState(false);
  const comp = sector.competitors[selectedCompetitor];

  return (
    <section style={{ backgroundColor: colors.background, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
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
            color: colors.primary,
            margin: "0 0 20px 0",
            letterSpacing: "-0.5px",
            lineHeight: "1.2",
          }}
        >
          Building With Ghana's Strongest Institutions
        </h2>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "15px" : "16px",
            color: "#666",
            lineHeight: "1.65",
            maxWidth: "750px",
            margin: isMobile ? "0 0 32px 0" : "0 0 48px 0",
          }}
        >
          BRIDGE combines strengths with existing institutions — aligning resources, sharing data, and creating shared
          value across the housing ecosystem.
        </p>

        {/* Mobile: horizontal scroll pills */}
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
            {sector.competitors.map((c, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedCompetitor(i);
                  setShowMoreLandscape(false);
                }}
                style={{
                  backgroundColor: selectedCompetitor === i ? colors.accentLight : "transparent",
                  color: selectedCompetitor === i ? colors.primary : "#999",
                  border: selectedCompetitor === i ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                  borderRadius: "50px",
                  padding: "5px 10px",
                  fontSize: "11px",
                  fontWeight: selectedCompetitor === i ? "700" : "500",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}

        <div style={isMobile ? {} : { display: "grid", gridTemplateColumns: "280px 1fr", gap: "32px" }}>
          {/* Desktop sidebar */}
          {!isMobile && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {sector.competitors.map((c, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedCompetitor(i)}
                  style={{
                    padding: "16px 20px",
                    borderRadius: "10px",
                    backgroundColor: selectedCompetitor === i ? colors.primary : colors.white,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: selectedCompetitor === i ? colors.white : colors.primary,
                    }}
                  >
                    {c.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      color: selectedCompetitor === i ? "rgba(255,255,255,0.6)" : "#999",
                      marginTop: "2px",
                    }}
                  >
                    {c.focus.substring(0, 35)}
                    {c.focus.length > 35 ? "..." : ""}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Detail panel */}
          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: "16px",
              padding: isMobile ? "20px 16px" : "36px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                alignItems: isMobile ? "flex-start" : "flex-start",
                marginBottom: "24px",
                gap: isMobile ? "12px" : "0",
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: isMobile ? "20px" : "22px",
                    fontWeight: "600",
                    color: colors.primary,
                    margin: "0 0 4px 0",
                  }}
                >
                  {comp.name}
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#666", margin: 0 }}>
                  {comp.focus}
                </p>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ padding: "6px 14px", borderRadius: "8px", backgroundColor: colors.lightGreen }}>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: colors.primary,
                    }}
                  >
                    Est. {comp.year}
                  </span>
                </div>
                <div style={{ padding: "6px 14px", borderRadius: "8px", backgroundColor: colors.accentLight }}>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: colors.primary,
                    }}
                  >
                    {comp.funding}
                  </span>
                </div>
              </div>
            </div>

            {/* Strengths - always visible */}
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "#999",
                  marginBottom: "12px",
                }}
              >
                Strengths
              </div>
              {comp.strengths.map((s, j) => (
                <div key={j} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      color: "#555",
                      width: isMobile ? "120px" : "140px",
                      flexShrink: 0,
                    }}
                  >
                    {s.name}
                  </span>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        style={{
                          width: isMobile ? "16px" : "20px",
                          height: "6px",
                          borderRadius: "3px",
                          backgroundColor: star <= s.rating ? colors.accent : colors.line,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Collaboration + BRIDGE Opportunity - collapsible on mobile */}
            {(!isMobile || showMoreLandscape) && (
              <div>
                <div style={{ marginBottom: "24px" }}>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "11px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: "#999",
                      marginBottom: "12px",
                    }}
                  >
                    Collaboration Opportunities
                  </div>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {comp.gaps.map((gap, j) => (
                      <span
                        key={j}
                        style={{
                          padding: "6px 12px",
                          borderRadius: "6px",
                          backgroundColor: colors.warningBg,
                          fontFamily: "Inter, sans-serif",
                          fontSize: "12px",
                          color: colors.warningText,
                        }}
                      >
                        {gap}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ padding: "16px 20px", backgroundColor: colors.lightGreen, borderRadius: "10px" }}>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "11px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: colors.primary,
                      marginBottom: "6px",
                    }}
                  >
                    BRIDGE Opportunity
                  </div>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      color: "#444",
                      lineHeight: "1.6",
                      margin: 0,
                    }}
                  >
                    {comp.bridgeOpportunity}
                  </p>
                </div>
              </div>
            )}

            {/* Mobile toggle */}
            {isMobile && (
              <button
                onClick={() => setShowMoreLandscape(!showMoreLandscape)}
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
                {showMoreLandscape ? "Show less" : "Show collaboration details"}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={colors.primary}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: showMoreLandscape ? "rotate(180deg)" : "none",
                    transition: "transform 0.3s ease",
                  }}
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
// SECTION 6: GOVERNANCE & POLICY — Scrollable Card Widget (Handoff v1)
// ============================================================================

const PolicyAlignmentSection = () => {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);

  const categories = [
    { id: "all", label: "All", mobileLabel: "All" },
    { id: "funding", label: "Direct Funding", mobileLabel: "Funding" },
    { id: "regulatory", label: "Regulatory", mobileLabel: "Regulatory" },
    { id: "infrastructure", label: "Infrastructure", mobileLabel: "Infra" },
    { id: "partnerships", label: "Partnerships", mobileLabel: "Partners" },
  ];

  const catBadge = {
    funding: { bg: "rgba(184,217,53,0.15)", border: "rgba(184,217,53,0.3)" },
    regulatory: { bg: "rgba(27,77,62,0.07)", border: "rgba(27,77,62,0.15)" },
    infrastructure: { bg: "rgba(184,217,53,0.1)", border: "rgba(184,217,53,0.25)" },
    partnerships: { bg: "rgba(27,77,62,0.05)", border: "rgba(27,77,62,0.12)" },
  };

  const policies = [
    {
      policy: "Big Push Infrastructure Programme",
      body: "Ministry of Works, Housing & Water Resources",
      allocation: "$10B commitment",
      category: "funding",
      relevance: ["affordable"],
      alignment:
        "Housing components within the largest infrastructure initiative in Ghana's history, targeting delivery of 250,000 housing units nationwide.",
      bridgeRole:
        "BRIDGE provides construction oversight, contractor verification, and quality assurance services for housing delivery within the programme.",
      bridgeVentures: ["Construction Oversight Platform", "Contractor Verification System"],
      pillars: ["Housing delivery", "Urban planning"],
    },
    {
      policy: "National Housing & Mortgage Fund",
      body: "SSNIT & MoF",
      allocation: "GH₵1B target",
      category: "funding",
      relevance: ["affordable"],
      alignment:
        "Dedicated fund channeling pension and public capital into affordable housing development and expanding mortgage product accessibility.",
      bridgeRole:
        "BRIDGE housing savings products and cooperative structures create the demand pipeline and borrower readiness for NHMF mortgage disbursement.",
      bridgeVentures: ["Housing Savings Products", "Housing Cooperative Structure"],
      pillars: ["Mortgage access", "Savings mobilization"],
    },
    {
      policy: "Low-Cost Housing for Public Workers",
      body: "Office of the President",
      allocation: "Salary deduction model",
      category: "funding",
      relevance: ["affordable"],
      alignment:
        "Government-backed affordable housing for public sector employees through payroll-linked financing and standardized unit development.",
      bridgeRole:
        "BRIDGE construction oversight and contractor verification ensure quality delivery and cost control for public worker housing projects.",
      bridgeVentures: ["Construction Oversight Platform", "Property Management Service"],
      pillars: ["Public housing", "Payroll financing"],
    },
    {
      policy: "Real Estate Agency Act 2020",
      body: "Lands Commission",
      allocation: "Regulatory framework",
      category: "regulatory",
      relevance: ["commercial"],
      alignment:
        "Comprehensive regulatory framework establishing professional standards in real estate, including licensing for agents and developers.",
      bridgeRole:
        "BRIDGE contractor verification and property management services support licensing implementation and professional standards compliance.",
      bridgeVentures: ["Contractor Verification System", "Property Management Service"],
      pillars: ["Professional standards", "Licensing"],
    },
    {
      policy: "Rent Control Bill",
      body: "Parliament of Ghana",
      allocation: "Legislative reform",
      category: "regulatory",
      relevance: ["affordable"],
      alignment:
        "Landmark legislation limiting rent advances to one year and establishing tenant rights protections across the entire rental market.",
      bridgeRole:
        "BRIDGE rental guarantee products directly enable compliance with 1-year advance limits while protecting landlord revenue.",
      bridgeVentures: ["Rental Guarantee Products", "Tenant Services Platform"],
      pillars: ["Rent reform", "Consumer protection"],
    },
    {
      policy: "Building Code & Permit Reform",
      body: "Ministry of Works & Housing",
      allocation: "Regulatory overhaul",
      category: "regulatory",
      relevance: ["affordable", "commercial"],
      alignment:
        "Modernization of building codes and permit processes to reduce approval timelines and improve construction quality standards nationally.",
      bridgeRole:
        "BRIDGE contractor certification aligns skilled artisans with updated building standards, creating a verified workforce for compliant construction.",
      bridgeVentures: ["Construction Skills Certification", "Contractor Verification System"],
      pillars: ["Building standards", "Permit reform"],
    },
    {
      policy: "Lands Commission Digitization",
      body: "Lands Commission & World Bank",
      allocation: "$85M project",
      category: "infrastructure",
      relevance: ["affordable", "commercial"],
      alignment:
        "Multi-year project to digitize land records across Ghana, creating digital infrastructure for the 98% of properties without title.",
      bridgeRole:
        "BRIDGE title verification adds a private verification layer complementing government digitization, accelerating trust in property transactions.",
      bridgeVentures: ["Title Verification Platform", "Land Registry Integration"],
      pillars: ["Digital records", "Title security"],
    },
    {
      policy: "National Rental Assistance Scheme",
      body: "Ministry of Works, Housing & Water Resources",
      allocation: "Gov't funded",
      category: "infrastructure",
      relevance: ["affordable"],
      alignment:
        "Government programme building rental market infrastructure with structured advance limits, tenant protections, and subsidy channels.",
      bridgeRole:
        "BRIDGE rent advance financing and rental guarantee products scale the NRAS model through private sector channels, reaching 19M renters.",
      bridgeVentures: ["Rental Guarantee Products", "Rent Advance Financing"],
      pillars: ["Rental reform", "Tenant protection"],
    },
    {
      policy: "Affordable Housing REITs Framework",
      body: "Securities & Exchange Commission",
      allocation: "Capital market reform",
      category: "infrastructure",
      relevance: ["commercial"],
      alignment:
        "Regulatory framework enabling Real Estate Investment Trusts focused on affordable housing, unlocking institutional capital for residential development.",
      bridgeRole:
        "BRIDGE property management and title verification services create the transparent asset base required for REIT qualification and investor confidence.",
      bridgeVentures: ["Property Management Service", "Title Verification Platform"],
      pillars: ["Capital markets", "Institutional investment"],
    },
    {
      policy: "IFC Her Home Initiative",
      body: "International Finance Corporation",
      allocation: "$2B global target",
      category: "partnerships",
      relevance: ["affordable"],
      alignment:
        "IFC initiative specifically targeting women's access to housing through mortgage support, title assistance, and savings programmes.",
      bridgeRole:
        "BRIDGE title verification and housing savings products advance women's housing access with gender-responsive design integrated from inception.",
      bridgeVentures: ["Title Verification Platform", "Housing Savings Products"],
      pillars: ["Gender equity", "Housing access"],
    },
    {
      policy: "World Bank Land Administration Project",
      body: "World Bank & Lands Commission",
      allocation: "$100M+ cumulative",
      category: "partnerships",
      relevance: ["affordable", "commercial"],
      alignment:
        "Long-running partnership modernizing Ghana's land governance through systematic titling, boundary mapping, and institutional reform.",
      bridgeRole:
        "BRIDGE title verification platform integrates with LAP digitization outputs, extending verified land data to private sector users at scale.",
      bridgeVentures: ["Title Verification Platform", "Land Registry Integration"],
      pillars: ["Land governance", "Institutional reform"],
    },
    {
      policy: "UN-Habitat Ghana Programme",
      body: "UN-Habitat & MWRWH",
      allocation: "Technical assistance",
      category: "partnerships",
      relevance: ["affordable"],
      alignment:
        "United Nations programme providing technical support for slum upgrading, urban planning, and inclusive housing policy development across Ghana.",
      bridgeRole:
        "BRIDGE cooperative housing models and tenant services complement UN-Habitat community upgrading with market-based solutions for residents.",
      bridgeVentures: ["Housing Cooperative Structure", "Tenant Services Platform"],
      pillars: ["Urban upgrading", "Community development"],
    },
  ];

  const filtered = activeCategory === "all" ? policies : policies.filter((p) => p.category === activeCategory);
  const [policyScrollIndex, setPolicyScrollIndex] = React.useState(0);
  const policyScrollRef = React.useRef(null);

  const handlePolicyScroll = () => {
    if (!policyScrollRef.current) return;
    const el = policyScrollRef.current;
    const cardWidth = isMobile ? el.offsetWidth * 0.88 : 336;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setPolicyScrollIndex(idx);
  };

  const scrollToPolicy = (idx) => {
    if (!policyScrollRef.current) return;
    const el = policyScrollRef.current;
    const cardWidth = isMobile ? el.offsetWidth * 0.88 : 336;
    el.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
    setPolicyScrollIndex(idx);
  };

  return (
    <section style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto", textAlign: isMobile ? "left" : "center" }}>
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
          The Governance & Policy
        </span>
        <h2
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "28px" : "42px",
            fontWeight: "300",
            color: colors.primary,
            margin: isMobile ? "0 0 20px" : "0 auto 20px",
            letterSpacing: "-0.5px",
            lineHeight: "1.2",
            maxWidth: "900px",
          }}
        >
          Moving in Step with Ghana's <span style={{ fontWeight: "600", color: colors.accent }}>Housing Agenda</span>
        </h2>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "16px",
            color: "#666",
            lineHeight: "1.65",
            maxWidth: "750px",
            margin: isMobile ? "0 0 32px" : "0 auto 32px",
          }}
        >
          BRIDGE housing ventures align directly with current government priorities — from the Big Push Programme to the
          Rent Control Bill — creating pathways for public-private collaboration.
        </p>

        {/* Category Filter */}
        {isMobile ? (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "2px",
              border: `1px solid ${colors.line}`,
              borderRadius: "50px",
              padding: "4px",
              marginBottom: "24px",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setExpandedCard(null);
                  setPolicyScrollIndex(0);
                }}
                style={{
                  padding: "5px 12px",
                  borderRadius: "50px",
                  border: activeCategory === cat.id ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                  backgroundColor: "transparent",
                  color: activeCategory === cat.id ? colors.primary : "#999",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: activeCategory === cat.id ? "700" : "500",
                  cursor: "pointer",
                }}
              >
                {cat.mobileLabel}
              </button>
            ))}
          </div>
        ) : (
          <div
            style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap", justifyContent: "center" }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setExpandedCard(null);
                  setPolicyScrollIndex(0);
                }}
                style={{
                  padding: "6px 16px",
                  borderRadius: "50px",
                  border: activeCategory === cat.id ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                  backgroundColor: activeCategory === cat.id ? colors.accentLight : "transparent",
                  color: activeCategory === cat.id ? colors.primary : "#999",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "12px",
                  fontWeight: activeCategory === cat.id ? "700" : "500",
                  cursor: "pointer",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Card Row — horizontal scroll */}
        <div
          ref={policyScrollRef}
          onScroll={handlePolicyScroll}
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
            alignItems: "flex-start",
            margin: isMobile ? "0 -20px" : "0",
            padding: isMobile ? "0 20px 4px" : "0 0 4px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {filtered.map((p, i) => {
            const isExpanded = expandedCard === i;
            const badge = catBadge[p.category];
            return (
              <div
                key={i}
                onClick={() => setExpandedCard(isExpanded ? null : i)}
                style={{
                  minWidth: isMobile ? "calc(88%)" : isExpanded ? "420px" : "320px",
                  maxWidth: isMobile ? "calc(88%)" : isExpanded ? "420px" : "320px",
                  backgroundColor: colors.background,
                  border: isExpanded ? `2px solid ${colors.accent}` : `2px solid ${colors.primary}`,
                  borderRadius: "16px",
                  padding: "24px",
                  cursor: "pointer",
                  flexShrink: 0,
                  scrollSnapAlign: "start",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                  transition: "all 0.3s ease",
                }}
              >
                {/* Top: Badge + Relevance */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "9px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: colors.primary,
                      fontFamily: "Inter, sans-serif",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      backgroundColor: badge.bg,
                      border: `1px solid ${badge.border}`,
                    }}
                  >
                    {p.category}
                  </span>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {(p.relevance || []).map((r) => (
                      <span
                        key={r}
                        style={{
                          fontSize: "9px",
                          fontWeight: "600",
                          color: colors.primary,
                          fontFamily: "Inter, sans-serif",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          backgroundColor: "rgba(27,77,62,0.06)",
                        }}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Policy Name */}
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "16px",
                    fontWeight: "700",
                    color: colors.primary,
                    minHeight: "42px",
                    marginBottom: "8px",
                  }}
                >
                  {p.policy}
                </div>

                {/* Allocation */}
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    fontWeight: "700",
                    color: colors.accent,
                    marginBottom: "10px",
                  }}
                >
                  {p.allocation}
                </div>

                {/* Alignment */}
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    color: "#666",
                    lineHeight: "1.5",
                    minHeight: isExpanded ? "auto" : "80px",
                    marginBottom: "12px",
                  }}
                >
                  {isExpanded
                    ? p.alignment
                    : p.alignment.length > 140
                      ? p.alignment.substring(0, 137) + "..."
                      : p.alignment}
                </div>

                {/* Expand Hint */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "auto" }}>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "11px",
                      fontWeight: "600",
                      color: colors.primary,
                      opacity: 0.6,
                    }}
                  >
                    {isExpanded ? "Collapse" : "BRIDGE alignment"}
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={colors.primary}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: isExpanded ? "rotate(180deg)" : "none",
                      opacity: 0.6,
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: `1px solid ${colors.line}` }}>
                    <div
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#888", marginBottom: "8px" }}
                    >
                      {p.body}
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        color: "#444",
                        lineHeight: "1.6",
                        marginBottom: "12px",
                      }}
                    >
                      {p.bridgeRole}
                    </div>
                    {p.pillars && (
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
                        {p.pillars.map((pill) => (
                          <span
                            key={pill}
                            style={{
                              fontSize: "10px",
                              fontWeight: "600",
                              color: colors.accent,
                              padding: "4px 10px",
                              borderRadius: "6px",
                              backgroundColor: "rgba(184,217,53,0.1)",
                              fontFamily: "Inter, sans-serif",
                            }}
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    )}
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {p.bridgeVentures.map((v) => (
                        <span
                          key={v}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            backgroundColor: colors.primary,
                            fontFamily: "Inter, sans-serif",
                            fontSize: "11px",
                            fontWeight: "600",
                            color: colors.white,
                          }}
                        >
                          <span
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              backgroundColor: colors.accent,
                              flexShrink: 0,
                            }}
                          />
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Scroll Indicator Dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            marginTop: "20px",
            marginBottom: "48px",
          }}
        >
          {filtered.map((_, i) => (
            <div
              key={i}
              onClick={() => scrollToPolicy(i)}
              style={{
                width: policyScrollIndex === i ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor: policyScrollIndex === i ? colors.accent : colors.line,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

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
                fontFamily: "'DM Sans', sans-serif",
                fontSize: isMobile ? "16px" : "18px",
                fontWeight: 600,
                color: "#FFFFFF",
              }}
            >
              BRIDGE complements — never competes with — government vision.
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: isMobile ? "13px" : "14px",
                color: "rgba(255,255,255,0.6)",
                marginTop: "4px",
              }}
            >
              Every venture aligns with at least one active government policy or initiative.
            </div>
          </div>
          <a
            href="#"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              color: colors.primary,
              backgroundColor: colors.accent,
              padding: "12px 24px",
              borderRadius: "50px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              textAlign: "center",
              alignSelf: isMobile ? "center" : "auto",
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
// SECTION 7: RIPPLE EFFECT / CROSS-SECTOR — Interactive Icon Pathway (Handoff v1)
// ============================================================================

const CrossSectorSection = () => {
  const isMobile = useIsMobile();
  const [activeNode, setActiveNode] = useState(null);
  const [showMoreRipple, setShowMoreRipple] = useState(false);

  const crossSectorIcons = {
    8: <IconHome />,
    2: <IconWallet />,
    1: <IconBuilding />,
    5: <IconGraduation />,
    4: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" />
      </svg>
    ),
    10: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
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
  };

  const crossSectorShortNames = ["Financial", "Infra", "Education", "Tech", "Energy"];
  const crossSectorDesktopNames = ["Financial", "Infrastructure", "Education", "Technology", "Energy"];

  const pathways = [
    {
      sectorId: 2,
      name: "Financial Inclusion",
      connection: "Housing finance bridges shelter needs and financial systems — mortgages, savings, insurance.",
      multiplier: "3.8x",
      synergies: [
        "Alternative income verification expanding mortgage eligibility",
        "Construction milestone escrow protecting buyer capital",
        "Housing savings products building credit history and down payments",
      ],
      bridgeVentures: ["Rental Guarantee Products", "Housing Savings Products"],
      impact:
        "Enables housing finance access through trust infrastructure and alternative credit pathways, unlocking mortgage markets for millions.",
      pathLabel: "Housing → Mortgage Facilitation → Financial Access",
    },
    {
      sectorId: 1,
      name: "Infrastructure & Basic Services",
      connection: "Housing quality depends on water, sanitation, power, and road access infrastructure.",
      multiplier: "2.5x",
      synergies: [
        "WASH integration standards in new housing developments",
        "Streamlined utility connections reducing occupancy delays",
        "Smart grid integration for energy-efficient communities",
      ],
      bridgeVentures: ["Construction Oversight Platform", "Title Verification Platform"],
      impact:
        "Every housing development requires and stimulates infrastructure investment, creating compounding returns for both sectors.",
      pathLabel: "Housing → Utility Demand → Infrastructure Growth",
    },
    {
      sectorId: 5,
      name: "Education & Skills",
      connection: "Construction quality requires trained, certified professionals at every stage.",
      multiplier: "2.1x",
      synergies: [
        "TVET construction training pathways for artisans",
        "Artisan certification enabling premium pricing",
        "Financial literacy for mortgage readiness and savings",
      ],
      bridgeVentures: ["Construction Skills Certification", "Artisan Cooperative Platform"],
      impact:
        "Housing sector demand drives construction skills training, creating certified workforce pathways and higher-wage employment.",
      pathLabel: "Housing → Skills Demand → Workforce Development",
    },
    {
      sectorId: 4,
      name: "Technology & Innovation",
      connection: "PropTech platforms enable digital land records, construction monitoring, and tenant services.",
      multiplier: "4.2x",
      synergies: [
        "Blockchain-backed title verification and transfer",
        "Construction progress monitoring via satellite/drone imagery",
        "Digital rental platforms with escrow and dispute resolution",
      ],
      bridgeVentures: ["Title Verification Platform", "Tenant Services Platform"],
      impact:
        "Housing sector creates demand for PropTech innovation, driving digital transformation across the construction and property value chain.",
      pathLabel: "Housing → Digital Platforms → PropTech Growth",
    },
    {
      sectorId: 10,
      name: "Energy & Renewables",
      connection: "Housing developments drive demand for distributed energy, solar, and clean cooking solutions.",
      multiplier: "1.9x",
      synergies: [
        "Solar-integrated housing design standards",
        "Community energy systems in housing cooperatives",
        "Clean cooking infrastructure in new developments",
      ],
      bridgeVentures: ["Housing Cooperative Structure", "Affordable Housing Development"],
      impact:
        "New housing stock creates deployment opportunity for clean energy at scale, reducing emissions while lowering household energy costs.",
      pathLabel: "Housing → Energy Demand → Clean Power Adoption",
    },
  ];

  const active = activeNode !== null ? pathways[activeNode] : null;

  return (
    <section style={{ backgroundColor: colors.primary, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "48px" }}>
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
              color: colors.white,
              margin: "0 auto 20px",
              letterSpacing: "-0.5px",
              lineHeight: "1.2",
              maxWidth: "820px",
            }}
          >
            How Housing <span style={{ fontWeight: "600", color: colors.accent }}>Amplifies Impact</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              color: "rgba(255,255,255,0.6)",
              lineHeight: "1.65",
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            Every housing venture creates compounding value across BRIDGE's integrated sectors. Select a sector to
            explore how one investment becomes many.
          </p>
        </div>

        {/* Icon Pathway */}
        {isMobile ? (
          <div style={{ marginBottom: "24px" }}>
            {/* Hub Icon */}
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
                    marginBottom: "8px",
                  }}
                >
                  <IconHome />
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
                  HOUSING
                </span>
              </div>
            </div>
            {/* 5 Sector Icons */}
            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
              {pathways.map((p, idx) => {
                const isActive = activeNode === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setActiveNode(isActive ? null : idx);
                      setShowMoreRipple(false);
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
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
                        marginBottom: "6px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {crossSectorIcons[p.sectorId]}
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
                      {crossSectorShortNames[idx]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "32px",
              marginBottom: "48px",
            }}
          >
            {/* Hub */}
            <div
              style={{ width: "120px", display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}
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
                <IconHome />
              </div>
            </div>
            {/* 5 Nodes */}
            {pathways.map((p, idx) => {
              const isActive = activeNode === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveNode(isActive ? null : idx)}
                  style={{
                    width: "120px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    opacity: activeNode !== null && !isActive ? 0.4 : 1,
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
                      marginBottom: "10px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {crossSectorIcons[p.sectorId]}
                  </div>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: isActive ? colors.white : "rgba(255,255,255,0.5)",
                      textAlign: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {crossSectorDesktopNames[idx]}
                  </span>
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "20px",
                      fontWeight: "700",
                      color: isActive ? colors.accent : "rgba(255,255,255,0.3)",
                      marginTop: "4px",
                    }}
                  >
                    {p.multiplier}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Detail Panel */}
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
          {active === null ? (
            isMobile ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.5)" }}>
                  Tap a sector above to explore how housing amplifies its impact
                </p>
              </div>
            ) : (
              <div>
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
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
                  {pathways.map((p, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveNode(idx)}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.05)",
                        borderRadius: "16px",
                        padding: "24px 20px",
                        cursor: "pointer",
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
                          lineHeight: "1.45",
                          height: "38px",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {p.connection}
                      </div>
                      <div style={{ marginTop: "12px" }}>
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
                            marginLeft: "6px",
                          }}
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
              {/* Breadcrumb */}
              <div
                style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px", alignItems: "center" }}
              >
                {active.pathLabel.split(" → ").map((seg, idx, arr) => (
                  <React.Fragment key={idx}>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        fontWeight: idx === 0 ? "700" : "500",
                        color: idx === 0 ? colors.accent : "rgba(255,255,255,0.7)",
                        backgroundColor: idx === 0 ? "rgba(184, 217, 53, 0.15)" : "rgba(255,255,255,0.05)",
                        padding: "6px 14px",
                        borderRadius: "50px",
                      }}
                    >
                      {seg}
                    </span>
                    {idx < arr.length - 1 && <span style={{ color: colors.accent, fontSize: "14px" }}>→</span>}
                  </React.Fragment>
                ))}
              </div>

              {/* 3-Column Grid */}
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
                      marginBottom: "16px",
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
                      marginBottom: "20px",
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
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                      value multiplier
                    </span>
                  </div>
                </div>

                {/* Col 2: Synergy Pathways (collapsible mobile) */}
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
                        marginBottom: "16px",
                      }}
                    >
                      Synergy Pathways
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {active.synergies.map((s, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            gap: "12px",
                            padding: "12px 16px",
                            borderRadius: "10px",
                            backgroundColor: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <span style={{ color: colors.accent, fontSize: "8px", marginTop: "4px" }}>●</span>
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "14px",
                              color: "rgba(255,255,255,0.75)",
                            }}
                          >
                            {s}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Col 3: Linked Ventures (collapsible mobile) */}
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
                        marginBottom: "16px",
                      }}
                    >
                      Linked Ventures
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {active.bridgeVentures.map((v, idx) => (
                        <div
                          key={idx}
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
                      Explore {active.name} Sector <span>→</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile toggle */}
              {isMobile && (
                <button
                  onClick={() => setShowMoreRipple(!showMoreRipple)}
                  style={{
                    width: "100%",
                    padding: "14px",
                    backgroundColor: "transparent",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: colors.white,
                    cursor: "pointer",
                    marginTop: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  {showMoreRipple ? "Show less" : "Show more details"}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
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
// SECTION 8: INVESTMENT THESIS — Production Spec (Responsive)
// ============================================================================

const InvestmentCTASection = ({ sector }) => {
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
        label: "Portfolio IRR",
        value: "12-20%",
        tag: "Target Range",
        detail:
          "Blended target returns across 19 housing trust infrastructure ventures with phased capital deployment.",
      },
      {
        label: "Tier 1 Returns",
        value: "15-22%",
        tag: "High Priority",
        detail:
          "Priority ventures with immediate demand, rapid revenue generation, and proven market validation paths.",
      },
      {
        label: "Tier 2 Returns",
        value: "10-15%",
        tag: "Strategic",
        detail:
          "Construction oversight and property management platforms with longer build-out and strong recurring revenue.",
      },
      {
        label: "Dev. Leverage",
        value: "3-5x",
        tag: "Multiplier",
        detail:
          "Every dollar deployed generates $3-5 in local housing market activity through economic multiplier effects.",
      },
    ],
    timeline: [
      {
        label: "Foundation",
        value: "Q1-Q2",
        tag: "Phase 1",
        detail:
          "Title verification platform launch, contractor vetting system, and rental guarantee pilot in Greater Accra.",
      },
      {
        label: "Scale",
        value: "Q3-Q4",
        tag: "Phase 2",
        detail:
          "Construction oversight expansion, property management rollout, and workforce certification programme launch.",
      },
      {
        label: "Expansion",
        value: "2027+",
        tag: "Phase 3",
        detail:
          "Cooperative housing structures, affordable development financing, and replication into secondary markets.",
      },
      {
        label: "First Cash",
        value: "18-24mo",
        tag: "Near-Term",
        detail:
          "Timeline to first revenue milestone from title verification and rental guarantee product platform launch.",
      },
    ],
    impact: [
      {
        label: "Families Served",
        value: "50K+",
        tag: "Direct",
        detail:
          "Direct household beneficiaries of improved land security, rental protection, and affordable housing access.",
      },
      {
        label: "Jobs Created",
        value: "1,200+",
        tag: "Employment",
        detail:
          "Direct employment across construction oversight, verification, property management, and certification roles.",
      },
      {
        label: "Renters Protected",
        value: "19M",
        tag: "Addressable",
        detail:
          "Total addressable population for rental guarantee and tenant services platforms across all regions of Ghana.",
      },
      {
        label: "Capital Deployed",
        value: "$26-48M",
        tag: "Phased",
        detail:
          "Total investment opportunity across three deployment tiers with staged capital call schedules planned.",
      },
    ],
  };

  const audiences = [
    {
      key: "entrepreneur",
      label: "Entrepreneur",
      shortLabel: "Founder",
      icon: <IconStorefront />,
      headline: "Build the Trust Layer for Ghana's Housing Market",
      pitch:
        "BRIDGE provides validated venture models, title verification frameworks, and rental market strategies so you can launch housing businesses with de-risked entry and clear paths to revenue.",
      stats: [
        { value: "19", label: "Venture Paths", detail: "validated models" },
        { value: "19M", label: "Market Access", detail: "renters to serve" },
        { value: "Full", label: "BRIDGE Support", detail: "incubation to scale" },
      ],
      pathways: [
        {
          bring: "Local knowledge & community trust",
          get: "Venture blueprints, title verification tech, and go/no-go decision frameworks",
        },
        {
          bring: "Construction expertise & networks",
          get: "Institutional buyers, government partnerships, and working capital strategies",
        },
        {
          bring: "Execution commitment & accountability",
          get: "Technical assistance, quality monitoring, and scale-up support to Phase 3",
        },
      ],
    },
    {
      key: "business",
      label: "Business Entity",
      shortLabel: "Business",
      icon: <IconOfficeBuilding />,
      headline: "Anchor Your Real Estate Operations in Quality",
      pitch:
        "Partner with BRIDGE to access verified properties, certified contractors, and professional management services — strengthening your portfolio while improving housing outcomes across Ghana.",
      stats: [
        { value: "$26-48M", label: "Capital Range", detail: "across 19 ventures" },
        { value: "8-12%", label: "Cash Yield", detail: "annual distribution" },
        { value: "1.8M", label: "Addressable", detail: "housing gap" },
      ],
      pathways: [
        {
          bring: "Development capital & land access",
          get: "Priority access to verified titles and pre-certified contractor networks",
        },
        {
          bring: "Construction management expertise",
          get: "Co-development in affordable housing and rental infrastructure projects",
        },
        {
          bring: "Corporate housing procurement",
          get: "Impact reporting, ESG metrics, and community engagement documentation",
        },
      ],
    },
    {
      key: "investor",
      label: "Investor",
      shortLabel: "Investor",
      icon: <IconTrendingUp />,
      headline: "Trust Infrastructure With Impact Returns",
      pitch:
        "Deploy capital into housing trust systems with transparent governance, recurring revenue, and measurable outcomes — backed by government housing reform and massive unmet national demand.",
      stats: [
        { value: "12-20%", label: "Target IRR", detail: "blended portfolio" },
        { value: "2.5x", label: "Multiple", detail: "capital appreciation" },
        { value: "18-24mo", label: "First Cash", detail: "revenue timeline" },
      ],
      pathways: [
        {
          bring: "Growth capital & patient deployment",
          get: "Platform-backed returns with verification assets and clear exit paths",
        },
        {
          bring: "Real estate sector expertise",
          get: "Board participation, portfolio oversight, and co-investment opportunities",
        },
        {
          bring: "Network access & deal flow",
          get: "First-look rights on expansion ventures and regional replication deals",
        },
      ],
    },
    {
      key: "government",
      label: "Government",
      shortLabel: "Gov't",
      icon: <IconLandmark />,
      headline: "Deliver Housing Reform Without Fiscal Strain",
      pitch:
        "BRIDGE ventures align directly with the Big Push Programme and Rent Control Bill — delivering title security, rental reform, and construction quality improvement through private capital.",
      stats: [
        { value: "1,200+", label: "Jobs Created", detail: "direct employment" },
        { value: "98%", label: "Title Gap", detail: "to formalize" },
        { value: "3-5x", label: "Tax Multiplier", detail: "economic activity" },
      ],
      pathways: [
        {
          bring: "Policy alignment & regulatory support",
          get: "Private housing delivery meeting Big Push and Rent Control objectives",
        },
        {
          bring: "Land access & permitting facilitation",
          get: "Job creation, tax revenue expansion, and improved housing quality data",
        },
        {
          bring: "Community endorsement & legitimacy",
          get: "Transparent reporting on housing outcomes and constituency impact data",
        },
      ],
    },
  ];

  const activeAudienceData = audiences[activeAudience];

  return (
    <section style={{ backgroundColor: colors.background, padding: isMobile ? "60px 0" : "100px 80px" }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            marginBottom: isMobile ? "32px" : "48px",
            padding: isMobile ? "0 20px" : 0,
            textAlign: isMobile ? "center" : "left",
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
              margin: "0 0 16px",
              maxWidth: isMobile ? "none" : "820px",
            }}
          >
            Every Stakeholder Has a Role in{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Building Ghana's Housing Future</span>
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
            contributes to {sector.ventures} ventures across {sector.capitalRange} in opportunity.
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
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      backgroundColor: isActive ? colors.accentLight : colors.background,
                      border: isActive ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                      color: colors.primary,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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
                    flexShrink: 0,
                  }}
                >
                  <span style={{ display: "flex", color: isActive ? colors.primary : "#999" }}>{aud.icon}</span>
                  {aud.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Content Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "24px" : "48px",
            alignItems: "stretch",
            padding: isMobile ? "0 20px" : 0,
          }}
        >
          {/* Left Column */}
          <div style={{ display: "flex", flexDirection: "column" }}>
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
                  minHeight: "80px",
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                {activeAudienceData.headline}
              </h3>
            )}
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

            {/* Stat Cards */}
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
                <strong style={{ color: colors.primary }}>Ministry of Works, Housing & Water Resources</strong> aligned
                with national housing delivery targets
              </div>
            </div>
          </div>

          {/* Right Column: Green Panel */}
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

              {/* Tab Content — bordered row layout */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {tabContent[activeTab].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: isMobile ? "14px" : "20px",
                      padding: isMobile ? "16px 18px" : "20px 24px",
                      backgroundColor: "rgba(255,255,255,0.04)",
                      borderTop: idx > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    }}
                  >
                    <div style={{ width: isMobile ? "90px" : "120px", flexShrink: 0 }}>
                      <div
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: isMobile ? "20px" : "24px",
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
                          fontSize: "8px",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          color: "rgba(255,255,255,0.35)",
                          marginTop: "4px",
                        }}
                      >
                        {item.label}
                      </div>
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: isMobile ? "13px" : "14px",
                        color: "rgba(255,255,255,0.6)",
                        lineHeight: "1.55",
                        flex: 1,
                        borderLeft: "1px solid rgba(255,255,255,0.08)",
                        paddingLeft: isMobile ? "14px" : "20px",
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
                  Download Prospectus <span style={{ fontSize: "16px" }}>→</span>
                </a>
              </div>
            </div>
          )}

          {/* Mobile Toggle */}
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
              <IconChevronDown />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SECTION 9: IMPACT — Dual-Lens Dashboard (Handoff v1)
// ============================================================================

const useCounter = (target, duration = 1200, active = true) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    const num = parseFloat(target);
    if (isNaN(num)) {
      setCount(target);
      return;
    }
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * num);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, active]);
  const num = parseFloat(target);
  if (isNaN(num)) return target;
  if (num >= 1000) return Math.round(count).toLocaleString();
  if (num % 1 !== 0) return count.toFixed(1);
  return Math.round(count);
};

const ImpactSection = () => {
  const isMobile = useIsMobile();
  const [view, setView] = useState("metrics");
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeStakeholder, setActiveStakeholder] = useState(0);
  const [animate, setAnimate] = useState(true);

  const switchView = (v) => {
    setView(v);
    setAnimate(false);
    setTimeout(() => setAnimate(true), 50);
  };
  const switchCategory = (idx) => {
    setActiveCategory(idx);
    setAnimate(false);
    setTimeout(() => setAnimate(true), 50);
  };

  const metrics = [
    {
      category: "Economic",
      items: [
        {
          label: "Addressable Housing Gap",
          value: 1.8,
          suffix: "M",
          prefix: "",
          description:
            "Total homes needed to close Ghana's structural housing deficit across all regions and income levels.",
          trend: "Critical",
          ventures: "Affordable Housing · Build-to-Rent",
        },
        {
          label: "Land Title Opportunity",
          value: 98,
          suffix: "%",
          prefix: "",
          description:
            "Properties currently without formal title protection, representing an enormous market for verification.",
          trend: "Capture gap",
          ventures: "Title Verification · Land Registry",
        },
        {
          label: "Rental Market Size",
          value: 19,
          suffix: "M",
          prefix: "",
          description:
            "Citizens in rental housing requiring deposit reform, tenant protections, and advance payment relief.",
          trend: "Growing",
          ventures: "Rental Guarantee · Tenant Services",
        },
        {
          label: "Development Leverage",
          value: 3,
          suffix: "-5x",
          prefix: "",
          description:
            "Every dollar deployed generates $3-5 in local housing activity through economic multiplier effects.",
          trend: "Multiplier",
          ventures: "All Ventures",
        },
      ],
    },
    {
      category: "People",
      items: [
        {
          label: "Families Served",
          value: 50,
          suffix: "K+",
          prefix: "",
          description:
            "Households directly accessing improved land security, rental protections, and housing service platforms.",
          trend: "Target",
          ventures: "Title Verification · Rental Guarantee",
        },
        {
          label: "Jobs Created",
          value: 1200,
          suffix: "+",
          prefix: "",
          description:
            "Direct employment roles across construction oversight, management, verification, and certification.",
          trend: "+18% YoY",
          ventures: "Construction Oversight · Skills Cert",
        },
        {
          label: "Youth Trained",
          value: 5,
          suffix: "K+",
          prefix: "",
          description:
            "Young artisans certified through nationally recognized construction skills training and programmes.",
          trend: "High priority",
          ventures: "Skills Certification · Artisan Co-op",
        },
        {
          label: "Renters Protected",
          value: 19,
          suffix: "M",
          prefix: "",
          description:
            "Addressable population for rental guarantee products and tenant services platforms across all Ghana.",
          trend: "Near-term",
          ventures: "Rental Guarantee · Advance Financing",
        },
      ],
    },
    {
      category: "Returns",
      items: [
        {
          label: "Portfolio IRR",
          value: 12,
          suffix: "-20%",
          prefix: "",
          description:
            "Blended target returns across 19 housing trust infrastructure ventures with phased capital deployment.",
          trend: "Target range",
          ventures: "All Ventures",
        },
        {
          label: "Tier 1 Returns",
          value: 15,
          suffix: "-22%",
          prefix: "",
          description:
            "Priority ventures with immediate demand, rapid revenue generation, and proven market validation paths.",
          trend: "High priority",
          ventures: "Title Verification · Rental Guarantee",
        },
        {
          label: "First Cash",
          value: 18,
          suffix: "-24mo",
          prefix: "",
          description:
            "Timeline to first revenue milestone from title verification and rental guarantee product platform launch.",
          trend: "Near-term",
          ventures: "Title Platform · Guarantee Products",
        },
        {
          label: "Capital Deployed",
          value: 26,
          suffix: "-48M",
          prefix: "$",
          description:
            "Total investment opportunity across three deployment tiers with staged capital call schedules planned.",
          trend: "Phased",
          ventures: "All Ventures",
        },
      ],
    },
  ];

  const stakeholders = [
    {
      title: "The Entrepreneur",
      subtitle: "Homebuyers, developers & landlords",
      outcomes: [
        "Access to verified land records and title authentication services across Ghana",
        "Construction oversight protecting life savings from project abandonment risk",
        "Rental pathways that eliminate multi-year advance payment requirements",
        "Professional certification enabling premium pricing for quality services",
      ],
      stat: "19M",
      statLabel: "Renters to serve",
      highlight: "Trust-first market entry",
    },
    {
      title: "The Institution",
      subtitle: "Banks, cooperatives & associations",
      outcomes: [
        "Reliable property management platforms operating at full institutional scale",
        "Workforce certification ensuring consistent quality across construction projects",
        "Housing savings products creating a pipeline of mortgage-ready borrowers",
        "Corporate housing solutions streamlining employee accommodation processes",
      ],
      stat: "250+",
      statLabel: "Partners projected",
      highlight: "Platform-ready operations",
    },
    {
      title: "The Government",
      subtitle: "Agencies & local assemblies",
      outcomes: [
        "Digital land records complementing Lands Commission digitization programme",
        "Private sector rental assistance that scales the NRAS model nationally",
        "Construction quality data supporting building regulation and enforcement",
        "Housing outcome metrics for constituency reporting and policy planning",
      ],
      stat: "6",
      statLabel: "Policies reinforced",
      highlight: "Fiscal-neutral delivery",
    },
    {
      title: "The Investor",
      subtitle: "Impact & institutional capital",
      outcomes: [
        "Measurable housing outcomes with transparent ESG reporting frameworks",
        "Revenue-generating trust infrastructure with diversified recurring revenue",
        "Portfolio diversification in a high-demand frontier market housing segment",
        "Clear exit pathways through licensing, strategic sales, or recapitalizations",
      ],
      stat: "12-20%",
      statLabel: "Target IRR",
      highlight: "Trust assets + impact",
    },
  ];

  const activeMetrics = metrics[activeCategory];
  const activeS = stakeholders[activeStakeholder];

  return (
    <section style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "80px 32px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
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
          What Changes When <span style={{ fontWeight: "600" }}>Housing</span>
          <br />
          <span style={{ fontWeight: "600" }}>Markets</span>{" "}
          <span style={{ fontWeight: "600", color: colors.accent }}>Work</span>
        </h2>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "16px",
            color: "#666",
            lineHeight: "1.65",
            maxWidth: "680px",
            margin: "0 0 40px 0",
          }}
        >
          When families access affordable homes, construction creates local jobs, and mortgage systems serve the middle
          class — the ripple effects build wealth, stabilize communities, and drive economic growth across Ghana.
        </p>

        {/* Controls Bar */}
        {isMobile ? (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0",
              border: `1px solid ${colors.line}`,
              borderRadius: "50px",
              padding: "4px",
              marginBottom: "24px",
            }}
          >
            {/* Shaded toggle group */}
            <div
              style={{
                display: "inline-flex",
                backgroundColor: colors.background,
                borderRadius: "50px",
                padding: "2px",
              }}
            >
              {["metrics", "stakeholder"].map((v) => (
                <button
                  key={v}
                  onClick={() => switchView(v)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "50px",
                    border: "none",
                    backgroundColor: view === v ? colors.white : "transparent",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: view === v ? "700" : "500",
                    color: view === v ? colors.primary : "#999",
                    cursor: "pointer",
                    boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  }}
                >
                  {v === "metrics" ? "Metric" : "Stakeholder"}
                </button>
              ))}
            </div>
            {/* Divider */}
            <div
              style={{ width: "1px", height: "20px", backgroundColor: colors.line, margin: "0 6px", flexShrink: 0 }}
            />
            {/* Sub-filters */}
            {view === "metrics"
              ? metrics.map((m, idx) => (
                  <button
                    key={m.category}
                    onClick={() => switchCategory(idx)}
                    style={{
                      padding: "5px 10px",
                      borderRadius: "50px",
                      border: activeCategory === idx ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                      backgroundColor: "transparent",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "11px",
                      fontWeight: activeCategory === idx ? "700" : "500",
                      color: activeCategory === idx ? colors.primary : "#999",
                      cursor: "pointer",
                    }}
                  >
                    {m.category}
                  </button>
                ))
              : stakeholders.map((s, idx) => (
                  <button
                    key={s.title}
                    onClick={() => setActiveStakeholder(idx)}
                    style={{
                      padding: "5px 10px",
                      borderRadius: "50px",
                      border: activeStakeholder === idx ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                      backgroundColor: "transparent",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "11px",
                      fontWeight: activeStakeholder === idx ? "700" : "500",
                      color: activeStakeholder === idx ? colors.primary : "#999",
                      cursor: "pointer",
                    }}
                  >
                    {s.title.split(" ")[1]}
                  </button>
                ))}
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px", flexWrap: "wrap" }}>
            <div
              style={{
                display: "inline-flex",
                border: `1px solid ${colors.line}`,
                borderRadius: "50px",
                backgroundColor: colors.background,
                padding: "4px",
              }}
            >
              {["metrics", "stakeholder"].map((v) => (
                <button
                  key={v}
                  onClick={() => switchView(v)}
                  style={{
                    padding: "6px 16px",
                    borderRadius: "50px",
                    border: "none",
                    backgroundColor: view === v ? colors.white : "transparent",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    fontWeight: view === v ? "700" : "500",
                    color: view === v ? colors.primary : "#999",
                    cursor: "pointer",
                    boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  }}
                >
                  {v === "metrics" ? "By Metric" : "By Stakeholder"}
                </button>
              ))}
            </div>
            <div style={{ width: "1px", height: "24px", backgroundColor: colors.line }} />
            {view === "metrics"
              ? metrics.map((m, idx) => (
                  <button
                    key={m.category}
                    onClick={() => switchCategory(idx)}
                    style={{
                      padding: "6px 16px",
                      borderRadius: "50px",
                      border: activeCategory === idx ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                      backgroundColor: activeCategory === idx ? colors.accentLight : "transparent",
                      color: activeCategory === idx ? colors.primary : "#999",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: activeCategory === idx ? "700" : "500",
                      cursor: "pointer",
                    }}
                  >
                    {m.category}
                  </button>
                ))
              : stakeholders.map((s, idx) => (
                  <button
                    key={s.title}
                    onClick={() => setActiveStakeholder(idx)}
                    style={{
                      padding: "6px 16px",
                      borderRadius: "50px",
                      border: activeStakeholder === idx ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                      backgroundColor: activeStakeholder === idx ? colors.accentLight : "transparent",
                      color: activeStakeholder === idx ? colors.primary : "#999",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: activeStakeholder === idx ? "700" : "500",
                      cursor: "pointer",
                    }}
                  >
                    {s.title.split(" ")[1]}
                  </button>
                ))}
          </div>
        )}

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
            {activeMetrics.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: isMobile ? "20px" : "24px 28px",
                  backgroundColor: idx % 2 === 0 ? colors.white : "transparent",
                  minHeight: isMobile ? "auto" : "100px",
                  ...(isMobile ? {} : { display: "grid", gridTemplateColumns: "200px 1fr 200px", gap: "32px" }),
                }}
              >
                {isMobile ? (
                  /* Mobile: tag top-right, stacked layout */
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "8px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "28px",
                          fontWeight: "700",
                          color: colors.primary,
                          letterSpacing: "-1px",
                        }}
                      >
                        {item.prefix}
                        {useCounter(item.value, 1200, animate)}
                        {item.suffix}
                      </div>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "9px",
                          fontWeight: "700",
                          color: colors.accent,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          backgroundColor: "rgba(184,217,53,0.12)",
                          padding: "4px 10px",
                          borderRadius: "20px",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}
                      >
                        {item.trend}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "15px",
                        fontWeight: "700",
                        color: colors.primary,
                        marginBottom: "4px",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#666", lineHeight: "1.5" }}
                    >
                      {item.description}
                    </div>
                  </>
                ) : (
                  /* Desktop: original grid layout */
                  <>
                    <div>
                      <div
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "36px",
                          fontWeight: "700",
                          color: colors.primary,
                          letterSpacing: "-1px",
                        }}
                      >
                        {item.prefix}
                        {useCounter(item.value, 1200, animate)}
                        {item.suffix}
                      </div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "10px",
                          fontWeight: "700",
                          color: colors.accent,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          marginTop: "4px",
                        }}
                      >
                        {item.trend}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "15px",
                          fontWeight: "700",
                          color: colors.primary,
                          marginBottom: "4px",
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#666", lineHeight: "1.5" }}
                      >
                        {item.description}
                      </div>
                    </div>
                    <div
                      style={{
                        borderRadius: "10px",
                        padding: "10px 16px",
                        backgroundColor: idx % 2 === 0 ? colors.background : "rgba(27,77,62,0.04)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "9px",
                          fontWeight: "700",
                          color: "#aaa",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          marginBottom: "6px",
                        }}
                      >
                        LINKED VENTURES
                      </div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "11px",
                          fontWeight: "500",
                          color: colors.primary,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.ventures}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>
            {/* Stakeholder Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "24px",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: isMobile ? "22px" : "28px",
                    fontWeight: "700",
                    color: colors.primary,
                  }}
                >
                  {activeS.title}
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#888", marginTop: "4px" }}>
                  {activeS.subtitle}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: isMobile ? "32px" : "40px",
                    fontWeight: "700",
                    color: colors.primary,
                    letterSpacing: "-1.5px",
                  }}
                >
                  {activeS.stat}
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#888" }}>
                  {activeS.statLabel}
                </div>
              </div>
            </div>

            {/* Outcome Rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {activeS.outcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "14px 20px",
                    borderRadius: "12px",
                    backgroundColor: idx % 2 === 0 ? colors.background : "transparent",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: idx % 2 === 0 ? colors.white : colors.background,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        fontWeight: "700",
                        color: colors.primary,
                      }}
                    >
                      {idx + 1}
                    </span>
                  </div>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#333", lineHeight: "1.5" }}>
                    {outcome}
                  </span>
                </div>
              ))}
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
              }}
            >
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "10px",
                  fontWeight: "700",
                  color: colors.accent,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                }}
              >
                KEY ADVANTAGE
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "rgba(255,255,255,0.85)",
                  marginLeft: "16px",
                }}
              >
                {activeS.highlight}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
// ============================================================================
// FINAL CTA (v2 - ctaGreen bg, sector-specific for Housing)
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
          Let's Build Ghana's <span style={{ color: colors.accent, fontWeight: "600" }}>Housing Future</span>
        </h2>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "16px" : "18px",
            lineHeight: "1.7",
            color: "rgba(255,255,255,0.7)",
            margin: "0 0 40px 0",
            maxWidth: "620px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Whether you're an investor, partner, or government stakeholder, there's a seat at the table in building
          sustainable communities.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: "16px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            style={{
              backgroundColor: colors.accent,
              color: colors.primary,
              border: "none",
              padding: isMobile ? "16px 28px" : "14px 28px",
              borderRadius: "50px",
              fontSize: "15px",
              fontWeight: "700",
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              width: isMobile ? "100%" : "auto",
            }}
          >
            Start a Conversation
            <span
              style={{
                width: "28px",
                height: "28px",
                backgroundColor: colors.white,
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
                stroke={colors.primary}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </span>
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              color: "rgba(255,255,255,0.8)",
              border: "1.5px solid rgba(255,255,255,0.25)",
              padding: isMobile ? "16px 28px" : "14px 28px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: "600",
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
              width: isMobile ? "100%" : "auto",
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
// FOOTER (v2 - BridgeLogoWhite, SectorGrid, DM Sans, social icons)
// ============================================================================

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
              href="#"
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

const Footer = () => {
  const isMobile = useIsMobile();

  return (
    <footer style={{ backgroundColor: colors.primary, padding: "0" }}>
      {/* Section separator */}
      <div style={{ padding: "0 80px" }}>
        <div style={{ height: "0.5px", backgroundColor: "rgba(255,255,255,0.08)" }} />
      </div>

      {isMobile ? (
        /* ═══ MOBILE FOOTER ═══ */
        <div style={{ padding: "32px 20px 16px", display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Row 1: Logo + Nav labels */}
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
          {/* Row 2: Subscribe inline */}
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
          {/* Row 3: Contact + Social */}
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
        /* ═══ DESKTOP FOOTER ═══ */
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

          {/* ═══ ALIGNED BOTTOM ROW: Subscribe + Sector Grid ═══ */}
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

      {/* Bottom bar */}
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
// MAIN PAGE COMPONENT
// ============================================================================

export default function HousingRealEstateSectorPage() {
  const isMobile = useIsMobile();
  return (
    <div style={{ fontFamily: "Inter, sans-serif", margin: 0, padding: 0, backgroundColor: colors.white }}>
      <style>{`@keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-8px); } 60% { transform: translateY(-4px); } } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Poppins:wght@700;800&display=swap"
        rel="stylesheet"
      />
      <Header />
      <HeroSection sector={sectorData} />
      <ProblemSection sector={sectorData} />
      <ValueChainSectionPremium />
      <SolutionsSection sector={sectorData} />
      <MarketEcosystemSection sector={sectorData} />
      <PolicyAlignmentSection />
      <CrossSectorSection />
      <InvestmentCTASection sector={sectorData} />
      <ImpactSection />
      <FinalCTASection />
      {/* Pre-footer separator — NOT part of the Footer component itself */}
      <div style={{ backgroundColor: colors.primary, padding: isMobile ? "0 20px" : "0 80px" }}>
        <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)" }} />
      </div>
      <Footer />
    </div>
  );
}
