import React, { useState, useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// ============================================================================
// BRIDGE SECTOR PAGE: Housing & Real Estate
// Updated with Shared Components v2 (Header, Footer, Hero, Final CTA)
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

// Responsive hook
const MOBILE_BREAKPOINT = 768;
const CONTENT_MAX_WIDTH = "1200px";

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
      <SiteHeader />
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
      <SiteFooter />
    </div>
  );
}
