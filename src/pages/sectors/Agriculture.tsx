import React, { useState, useEffect } from "react";

// ============================================================================
// BRIDGE SECTOR PAGE: Agriculture & Value Chains
// INTEGRATED VERSION with Premium ValueChain Section
// ============================================================================
// Design System: Dark Green #1B4D3E, Lime #B8D935, Off-white #F3F5F2
// ============================================================================

const colors = {
  primary: "#1B4D3E", // Dark green — headers, text, dark backgrounds
  accent: "#B8D935", // Lime green — accent keywords, stats, progress bars
  background: "#F3F5F2", // Off-white — alternating section backgrounds
  white: "#FFFFFF", // White — alternating section backgrounds
  dark: "#191919", // Near-black — body headings (hero sub-header)
  line: "#DEDEDE", // Light grey — borders, dividers, card outlines
  lightGreen: "#E8F5E0", // Pale green — hero pill background
  accentLight: "#E8F5E0", // Same as lightGreen (alias)
  accentText: "#5C7A1F", // Muted olive — accent-colored body text
  warning: "#F59E0B", // Orange — hazard icons, recapture opportunity bars
  warningBg: "#FEF3C7", // Light amber — warning badge backgrounds
  warningText: "#92400E", // Dark amber — warning badge text
  critical: "#EF4444", // Red — critical severity badges
  criticalBg: "#FEE2E2", // Light red — critical badge backgrounds
  ctaGreen: "#2E5A4D", // Medium green (CTA section)
};

// Global constant for content max-width
const CONTENT_MAX_WIDTH = "1200px";

// Mobile breakpoint and responsive hook
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
// SECTOR DATA - Agriculture & Value Chains
// ============================================================================

const sectorData = {
  id: 6,
  slug: "agriculture",
  name: "Agriculture & Value Chains",
  shortName: "Agriculture",
  category: "Economic Engines",
  categoryColor: "#2E7D32",

  capitalRange: "$12-22M",
  ventures: 18,
  jobsImpact: "7M+ farmers",
  gdpContribution: "21%",

  // Hero content - per production handoff spec
  problemSubheadline:
    "Ghana's agricultural sector holds immense potential — from connecting 5.6 million smallholder farmers to fair markets, to capturing the $1.9 billion currently lost post-harvest, to building processing capacity that keeps value in-country. These are pathways where targeted investment and innovation can unlock transformative public benefit.",

  keyStats: [
    { value: "$1.9B", label: "Value Recapture Potential", detail: "Post-harvest opportunity annually" },
    { value: "30-50%", label: "Efficiency Gains Available", detail: "Through storage & logistics" },
    { value: "5.6M", label: "Farmers to Empower", detail: "Smallholders ready to scale" },
    { value: "80%+", label: "Smallholder Coverage", detail: "Plots under 2 hectares" },
  ],

  // Opportunity cards (formerly painPoints)
  opportunities: [
    {
      title: "Fair Market Access",
      description: "Connecting farmers directly to buyers through digital platforms and market information systems.",
      drivers: ["Market connectivity platforms", "Price transparency tools", "Aggregation networks"],
      quantification: "Potential to increase farmer value capture from 20-40% to 50-60%",
      severity: "High Priority",
      severityScore: 95,
      affectedCount: "2.5M",
      affectedLabel: "farmers to connect",
      bridgeSolution: "Digital Aggregation Platform",
    },
    {
      title: "Post-Harvest Value Capture",
      description: "Building storage infrastructure that lets farmers time their sales and reduce losses.",
      drivers: ["Cold chain expansion", "Warehouse networks", "Transport logistics"],
      quantification: "$760M annual recapture potential through storage solutions",
      severity: "High Priority",
      severityScore: 100,
      affectedCount: "40%",
      affectedLabel: "of harvest to preserve",
      bridgeSolution: "Community Cold Storage Network",
    },
    {
      title: "Financial Inclusion",
      description: "Unlocking credit access through innovative models that recognize agricultural assets.",
      drivers: ["Digital credit scoring", "Warehouse receipts as collateral", "Cooperative lending"],
      quantification: "$285M credit gap addressable through new models",
      severity: "Strategic",
      severityScore: 75,
      affectedCount: "85%",
      affectedLabel: "unbanked farmers to serve",
      bridgeSolution: "Digital Agricultural Lending",
    },
    {
      title: "Local Processing Expansion",
      description: "Building processing capacity to capture value domestically instead of exporting raw.",
      drivers: ["Processing hub development", "Energy solutions", "Supply chain coordination"],
      quantification: "$380M value addition potential in cocoa alone",
      severity: "Strategic",
      severityScore: 80,
      affectedCount: "70%",
      affectedLabel: "raw exports to process locally",
      bridgeSolution: "Cassava Processing Hub",
    },
  ],

  solutions: [
    {
      tier: 1,
      name: "Warehouse Receipt System",
      description:
        "Certified warehouses enabling farmers to store commodities and access up to 70% financing against stored inventory.",
      capital: "$2-4M",
      score: 40,
      impact: "Enables price timing, reduces forced sales",
      model: "Rwanda warehouse receipt model replication",
    },
    {
      tier: 1,
      name: "Digital Aggregation Platform",
      description:
        "Farmer-to-buyer marketplace integrating logistics, real-time market pricing, and standardized quality grading.",
      capital: "$2-3M",
      score: 40,
      impact: "Fair pricing and full market transparency",
      model: "AgroCenta partnership potential",
    },
    {
      tier: 1,
      name: "Community Cold Storage Network",
      description:
        "Solar-powered cold storage facilities at strategic aggregation points with pay-per-use mobile money access.",
      capital: "$3-5M",
      score: 39,
      impact: "Cuts perishable post-harvest losses by 50%",
      model: "AkoFresh partnership model",
    },
    {
      tier: 1,
      name: "Diaspora Agricultural Fund",
      description:
        "Structured investment vehicle channeling diaspora capital into productive agricultural value chain ventures.",
      capital: "$5-10M",
      score: 39,
      impact: "Channels remittances into real investment",
      model: "12-15% target returns",
    },
    {
      tier: 1,
      name: "Cooperative Strengthening Program",
      description:
        "Governance training, financial management systems, and marketing capacity building for farmer cooperatives.",
      capital: "$1-2M",
      score: 40,
      impact: "Collective bargaining power for farmers",
      model: "Technical assistance + working capital",
    },
    {
      tier: 1,
      name: "Improved Storage Distribution",
      description:
        "Distributing PICS bags and hermetic metal silos that reduce grain storage losses from 36.7% down to 3.1%.",
      capital: "$1-2M",
      score: 40,
      impact: "Immediate smallholder storage protection",
      model: "Field-proven technology scaling",
    },
    {
      tier: 2,
      name: "Digital Agricultural Lending",
      description:
        "Credit scoring platform using satellite imagery, mobile money transaction data, and real-time crop monitoring.",
      capital: "$3-5M",
      score: 37,
      impact: "Seasonal input and harvest loan financing",
      model: "Apollo Agriculture (Kenya) adaptation",
    },
    {
      tier: 2,
      name: "Cassava Processing Hub",
      description:
        "Regional processing facility converting raw cassava into high-value starch, flour, and industrial products.",
      capital: "$3-5M",
      score: 36,
      impact: "Domestic value addition for staple crops",
      model: "Farmer supply agreements + offtake contracts",
    },
    {
      tier: 2,
      name: "Market Information System",
      description:
        "Real-time agricultural price data and demand forecasting platform connecting farmers to market opportunities.",
      capital: "$1-2M",
      score: 35,
      impact: "Eliminates farmer information asymmetry",
      model: "SMS + USSD for feature phone access",
    },
    {
      tier: 2,
      name: "Coconut Processing Facility",
      description:
        "Integrated processing center for coconut oil, desiccated coconut, and coconut water targeting export markets.",
      capital: "$2-4M",
      score: 34,
      impact: "Export revenue from untapped crop sector",
      model: "Western Region cluster development",
    },
    {
      tier: 2,
      name: "Agricultural Input Marketplace",
      description:
        "Digital platform connecting smallholders to certified seed, fertilizer, and equipment suppliers at fair prices.",
      capital: "$1-3M",
      score: 34,
      impact: "Affordable quality inputs for smallholders",
      model: "E-commerce + last-mile delivery network",
    },
    {
      tier: 2,
      name: "Soil Testing & Advisory Service",
      description:
        "Mobile soil analysis labs providing site-specific fertilizer recommendations and precision agriculture guidance.",
      capital: "$1-2M",
      score: 33,
      impact: "Optimized yields through soil management",
      model: "Pay-per-test with cooperative partnerships",
    },
  ],

  allies: [
    {
      name: "Farmerline",
      focus: "Farmer advisory & market info",
      synergy: "Platform integration opportunity",
      year: "2013",
      funding: "$6.5M+",
      priority: "High Priority",
      topStrength: "Farmer Network",
      strengths: [
        { name: "Digital Platform", rating: 4 },
        { name: "Farmer Network", rating: 5 },
        { name: "Advisory Services", rating: 4 },
      ],
      complementaryAreas: ["Storage solutions", "Financing", "Rural expansion"],
      bridgeOpportunity: "Data partnership for farmer credit scoring",
      bridgePosition: {
        headline: "Storage infrastructure complements Farmerline's advisory network",
        synergies: [
          { label: "Data Partnership", detail: "Credit scoring from farmer data" },
          { label: "Platform Integration", detail: "Advisory → warehouse link" },
          { label: "Rural Reach", detail: "Shared last-mile network" },
          { label: "Scale Multiplier", detail: "5.6M farmer pipeline" },
        ],
      },
    },
    {
      name: "AgroCenta",
      focus: "Digital marketplace for crops",
      synergy: "Infrastructure + platform combination",
      year: "2015",
      funding: "$1.5M+",
      priority: "High Priority",
      topStrength: "Market Linkages",
      strengths: [
        { name: "Digital Platform", rating: 4 },
        { name: "Market Linkages", rating: 4 },
        { name: "Farmer Network", rating: 3 },
      ],
      complementaryAreas: ["Cold chain access", "Warehouse financing", "Geographic expansion"],
      bridgeOpportunity: "Platform integration with BRIDGE infrastructure",
      bridgePosition: {
        headline: "Physical infrastructure anchors AgroCenta's digital marketplace",
        synergies: [
          { label: "Cold Chain Layer", detail: "Storage for digital trades" },
          { label: "Warehouse Receipts", detail: "Collateral for platform users" },
          { label: "Geographic Scale", detail: "Regional hub expansion" },
          { label: "Quality Standards", detail: "Grading at aggregation" },
        ],
      },
    },
    {
      name: "AkoFresh",
      focus: "Cold storage solutions",
      synergy: "Scale and financing partnership",
      year: "2019",
      funding: "$1.2M+",
      priority: "High Priority",
      topStrength: "Cold Chain Tech",
      strengths: [
        { name: "Cold Chain Tech", rating: 5 },
        { name: "Post-Harvest", rating: 4 },
        { name: "Pay-per-use Model", rating: 4 },
      ],
      complementaryAreas: ["Network expansion", "Aggregation services", "Financing access"],
      bridgeOpportunity: "Cold storage network expansion partner",
      bridgePosition: {
        headline: "BRIDGE financing scales AkoFresh's proven cold chain model",
        synergies: [
          { label: "Capital Access", detail: "Growth financing facility" },
          { label: "Network Design", detail: "Strategic hub placement" },
          { label: "Aggregation Layer", detail: "Supply coordination" },
          { label: "Revenue Model", detail: "Pay-per-use expansion" },
        ],
      },
    },
    {
      name: "Complete Farmer",
      focus: "Contract farming platform",
      synergy: "Diaspora investment channel",
      year: "2017",
      funding: "$2.8M+",
      priority: "Medium Priority",
      topStrength: "Investor Platform",
      strengths: [
        { name: "Contract Farming", rating: 4 },
        { name: "Investor Platform", rating: 5 },
        { name: "Quality Control", rating: 4 },
      ],
      complementaryAreas: ["Smallholder inclusion", "Geographic reach", "Entry point flexibility"],
      bridgeOpportunity: "Diaspora investment channel partnership",
      bridgePosition: {
        headline: "Diaspora fund channels capital through Complete Farmer's platform",
        synergies: [
          { label: "Investment Channel", detail: "Diaspora capital on-ramp" },
          { label: "Smallholder Reach", detail: "Cooperative integration" },
          { label: "Quality Systems", detail: "Shared grading standards" },
          { label: "Impact Reporting", detail: "Aligned measurement" },
        ],
      },
    },
    {
      name: "COCOBOD",
      focus: "Cocoa sector regulation",
      synergy: "Model for other commodities",
      year: "1947",
      funding: "Gov't",
      priority: "Medium Priority",
      topStrength: "Market Regulation",
      strengths: [
        { name: "Market Regulation", rating: 5 },
        { name: "Quality Standards", rating: 5 },
        { name: "Export Infrastructure", rating: 4 },
      ],
      complementaryAreas: ["Non-cocoa commodities", "Innovation adoption", "Private sector collaboration"],
      bridgeOpportunity: "Model for non-cocoa commodity systems",
      bridgePosition: {
        headline: "Cocoa board quality model extends to non-cocoa commodities",
        synergies: [
          { label: "Standards Framework", detail: "Quality system template" },
          { label: "Export Corridor", detail: "Shared logistics routes" },
          { label: "Regulatory Alignment", detail: "Policy coordination" },
          { label: "Commodity Expansion", detail: "Beyond cocoa crops" },
        ],
      },
    },
    {
      name: "Esoko",
      focus: "Market price information",
      synergy: "Data layer for transactions",
      year: "2005",
      funding: "$4M+",
      priority: "High Priority",
      topStrength: "Price Data",
      strengths: [
        { name: "Price Data", rating: 5 },
        { name: "SMS Reach", rating: 5 },
        { name: "Regional Coverage", rating: 4 },
      ],
      complementaryAreas: ["Physical assets", "Transaction layer", "Value-add services"],
      bridgeOpportunity: "Market intelligence data provider",
      bridgePosition: {
        headline: "Esoko price data powers BRIDGE warehouse receipt valuations",
        synergies: [
          { label: "Price Intelligence", detail: "Real-time crop valuation" },
          { label: "SMS Distribution", detail: "Feature phone reach" },
          { label: "Transaction Layer", detail: "Digital payment rails" },
          { label: "Regional Data", detail: "Multi-zone coverage" },
        ],
      },
    },
  ],

  policyAlignment: [
    {
      policy: "2026 Budget - Oil Palm Finance",
      allocation: "GH₵6.9B (US$500M)",
      alignment: "Co-financing partner for processing facilities",
    },
    {
      policy: "Agricultural Enclave Roads",
      allocation: "GH₵828M",
      alignment: "Infrastructure beneficiary for aggregation centers",
    },
    {
      policy: "Farmer Service Centers",
      allocation: "GH₵690M",
      alignment: "Service delivery partner for AgTech portfolio",
    },
    {
      policy: "Grow24 Pillar (2M ha irrigation)",
      allocation: "Multi-year commitment",
      alignment: "Raw material supply for processing ventures",
    },
  ],

  crossSector: [
    { sectorId: 1, name: "Infrastructure", connection: "Kejetia Market wholesale outlet, rural roads" },
    { sectorId: 2, name: "Financial Inclusion", connection: "Warehouse receipt financing, mobile payments" },
    { sectorId: 10, name: "Energy", connection: "Solar for cold storage, biogas from waste" },
    { sectorId: 11, name: "Manufacturing", connection: "Food processing, equipment production" },
    { sectorId: 12, name: "Transportation", connection: "Cold chain logistics, farm-to-market" },
  ],

  relatedSectors: [
    { id: 2, name: "Financial Inclusion", icon: "wallet", reason: "Agricultural credit, warehouse financing" },
    { id: 11, name: "Manufacturing", icon: "factory", reason: "Agro-processing, value addition" },
    { id: 12, name: "Transportation", icon: "truck", reason: "Cold chain, farm-to-market logistics" },
  ],
};

// ============================================================================
// PREMIUM VALUE CHAIN DATA
// ============================================================================

const valueChainStages = [
  {
    id: 1,
    stage: "Production",
    actor: "Smallholder Farmers",
    population: "5.6M farmers",
    icon: "seed",
    valueRetained: 100,
    valueLost: 0,
    opportunities: [
      "Fair pricing platforms",
      "Credit access models",
      "Climate resilience tools",
      "Market information systems",
    ],
    insights: [
      { label: "Farm Scale", value: "80% on plots <2ha" },
      { label: "Income Gap", value: "Farmers capture only 20-40% of final value" },
      { label: "Climate Risk", value: "70% rainfed with no irrigation backup" },
    ],
    color: colors.accent,
  },
  {
    id: 2,
    stage: "Aggregation",
    actor: "Cooperatives & Traders",
    population: "70,000+ coops",
    icon: "warehouse",
    valueRetained: 75,
    valueLost: 25,
    opportunities: [
      "Quality standardization",
      "Storage infrastructure",
      "Working capital access",
      "Supply coordination",
    ],
    insights: [
      { label: "Recapture Ready", value: "25% of lost value recoverable through aggregation" },
      { label: "Storage Gap", value: "Less than 10% of produce reaches cold storage" },
      { label: "Cooperative Strength", value: "70,000+ coops with low digital adoption" },
    ],
    color: "#4ADE80",
  },
  {
    id: 3,
    stage: "Processing",
    actor: "Food Processors",
    population: "Growth potential",
    icon: "factory",
    valueRetained: 55,
    valueLost: 20,
    opportunities: ["Supply agreements", "Energy solutions", "Equipment modernization", "Quality certification"],
    insights: [
      { label: "Untapped Potential", value: "70% of processing capacity remains unbuilt" },
      { label: "Import Substitution", value: "$2.1B annual food import bill reducible locally" },
      { label: "Energy Barrier", value: "Unreliable power adds 15-20% to processing cost" },
    ],
    color: "#60A5FA",
  },
  {
    id: 4,
    stage: "Distribution",
    actor: "Traders & Markets",
    population: "Formalization ready",
    icon: "truck",
    valueRetained: 40,
    valueLost: 15,
    opportunities: ["Transport logistics", "Price transparency", "Market connectivity", "Cold chain expansion"],
    insights: [
      { label: "Efficiency Gains", value: "40% reduction possible through logistics optimization" },
      { label: "Post-Harvest Loss", value: "30-50% of perishables lost before reaching market" },
      { label: "Price Opacity", value: "Farmers receive <50% of retail price due to middlemen" },
    ],
    color: "#F472B6",
  },
  {
    id: 5,
    stage: "Consumption",
    actor: "End Consumers",
    population: "32M+ population",
    icon: "users",
    valueRetained: 30,
    valueLost: 10,
    opportunities: ["Affordable access", "Quality assurance", "Year-round availability", "Food safety standards"],
    insights: [
      { label: "Market Growth", value: "Growing middle class driving 8% annual food spend increase" },
      { label: "Quality Demand", value: "65% of urban consumers willing to pay premium for safety" },
      { label: "Seasonal Gaps", value: "4-month supply gap for key staples drives price spikes" },
    ],
    color: "#A78BFA",
  },
];

// ============================================================================
// ICON COMPONENTS
// ============================================================================

const IconWheat = () => (
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
    <path d="M2 22L16 8" />
    <path d="M3.47 12.53L5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z" />
    <path d="M7.47 8.53L9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z" />
    <path d="M11.47 4.53L13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z" />
    <path d="M20 2l2 2" />
    <path d="M17.5 9.5L22 5" />
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

// Premium Value Chain Icons
const valueChainIcons = {
  seed: (
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
      <path d="M12 22c6-6 6-12 0-18C6 10 6 16 12 22z" />
      <path d="M12 22V10" />
      <path d="M8 14c1.5-1.5 3.5-2 4-2" />
      <path d="M16 14c-1.5-1.5-3.5-2-4-2" />
    </svg>
  ),
  warehouse: (
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
      <path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z" />
      <path d="M6 18h12" />
      <path d="M6 14h12" />
      <rect x="6" y="10" width="12" height="12" />
    </svg>
  ),
  factory: (
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
  ),
  truck: (
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
  ),
  users: (
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
};

// ============================================================================
// BRIDGELOGO COMPONENT (Dark version for Header)
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
// HEADER COMPONENT
// ============================================================================

const Header = () => {
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
                  style={{
                    color: isActive ? colors.primary : "#191919",
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
            {navItems.map((item) => {
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
// HERO SECTION
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
        overflow: "hidden",
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
                  letterSpacing: "2px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {sector.category}
              </span>
            </div>

            {/* Title — conditional line break */}
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
              <span style={{ fontWeight: "700" }}>Agriculture</span> &{!isMobile && <br />} Value Chains
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
              The Engine of Shared Prosperity
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
                className="cta-lime-swap"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.primary,
                  border: "none",
                  padding: isMobile ? "14px 20px" : "16px 28px",
                  borderRadius: "50px",
                  fontSize: isMobile ? "14px" : "15px",
                  fontWeight: "600",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flex: isMobile ? "1 1 100%" : "none",
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                Request Full Analysis
                <span
                  className="cta-btn-arrow"
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: colors.white,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              </button>
              <button
                className="cta-secondary"
                style={{
                  backgroundColor: "transparent",
                  color: colors.dark,
                  border: `1.5px solid ${colors.line}`,
                  padding: isMobile ? "14px 20px" : "14px 28px",
                  borderRadius: "50px",
                  fontSize: isMobile ? "14px" : "14px",
                  fontWeight: "500",
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
              color: colors.white,
              minWidth: isMobile ? "auto" : "340px",
            }}
          >
            {/* Header Row */}
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
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  fontFamily: "Inter, sans-serif",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Sector Overview
              </span>
              <span
                style={{
                  backgroundColor: "rgba(184,217,53,0.15)",
                  color: colors.accent,
                  padding: "6px 14px",
                  borderRadius: "50px",
                  fontSize: "11px",
                  fontWeight: "700",
                  fontFamily: "Inter, sans-serif",
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
                paddingBottom: "24px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                marginBottom: "0",
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

      <style>{`
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-8px); }
        60% { transform: translateY(-4px); }
      }
    `}</style>
    </section>
  );
};

// ============================================================================
// PROBLEM SECTION (Original)
// ============================================================================

// ============================================================================
// PROBLEM SECTION (Enhanced with Severity Indicators)
// ============================================================================

// Problem data with severity indicators
// Opportunity Section Data (formerly problemSectionData)
const opportunitySectionData = [
  {
    id: 1,
    title: "Fair Market Access",
    description: "Connecting farmers directly to buyers through digital platforms and market information systems.",
    drivers: [
      { title: "Market Connectivity", description: "Digital platform potential" },
      { title: "Price Transparency", description: "Real-time market data" },
      { title: "Aggregation Networks", description: "Collective bargaining power" },
      { title: "Quality Standards", description: "Premium market access" },
    ],
    quantification: "Farmer value capture from 20-40% to 50-60%",
    priority: "High Priority",
    priorityScore: 95,
    impactCount: "2.5M",
    impactLabel: "farmers to connect",
    bridgeSolution: "Digital Aggregation + Warehouse Receipts",
  },
  {
    id: 2,
    title: "Post-Harvest Value Capture",
    description: "Building storage infrastructure that lets farmers time their sales and reduce losses.",
    drivers: [
      { title: "Cold Chain Expansion", description: "Solar-powered storage" },
      { title: "Warehouse Networks", description: "Strategic locations" },
      { title: "Transport Logistics", description: "Farm-to-market links" },
      { title: "Processing Capacity", description: "Local value addition" },
    ],
    quantification: "$760M annual recapture potential through storage solutions",
    priority: "High Priority",
    priorityScore: 100,
    impactCount: "40%",
    impactLabel: "of harvest to preserve",
    bridgeSolution: "Cold Storage Network + Processing Hubs",
  },
  {
    id: 3,
    title: "Financial Inclusion",
    description: "Unlocking credit access through innovative models that recognize agricultural assets.",
    drivers: [
      { title: "Digital Credit Scoring", description: "Alternative data models" },
      { title: "Warehouse Receipts", description: "Collateral innovation" },
      { title: "Cooperative Lending", description: "Group-based finance" },
      { title: "Mobile Money Integration", description: "Payment rails" },
    ],
    quantification: "$285M credit gap addressable through new models",
    priority: "Strategic",
    priorityScore: 75,
    impactCount: "85%",
    impactLabel: "unbanked farmers to serve",
    bridgeSolution: "Digital Agricultural Lending Platform",
  },
  {
    id: 4,
    title: "Local Processing Expansion",
    description: "Building processing capacity to capture value domestically instead of exporting raw.",
    drivers: [
      { title: "Processing Hubs", description: "Regional facilities" },
      { title: "Energy Solutions", description: "Reliable power supply" },
      { title: "Supply Coordination", description: "Farmer agreements" },
      { title: "Skills Development", description: "Technical training" },
    ],
    quantification: "$380M value addition potential in cocoa alone",
    priority: "Strategic",
    priorityScore: 80,
    impactCount: "70%",
    impactLabel: "raw exports to process locally",
    bridgeSolution: "Processing Hub Network",
  },
];

// Opportunity Card Component (formerly ProblemCard)
const OpportunityCard = ({ opportunity, isExpanded, isCollapsed, onToggle }) => {
  const isMobile = useIsMobile();
  const severityColors =
    opportunity.priority === "High Priority"
      ? { text: colors.primary, bg: colors.accentLight }
      : { text: "#5C7A1F", bg: "rgba(184,217,53,0.12)" };

  return (
    <div
      onClick={onToggle}
      style={{
        backgroundColor: colors.white,
        borderRadius: isMobile ? "16px" : "20px",
        padding: isCollapsed ? (isMobile ? "16px 20px" : "20px 28px") : isMobile ? "20px" : "28px",
        cursor: "pointer",
        border: isExpanded ? `2px solid ${colors.accent}` : `1px solid ${colors.line}`,
        transition: "all 0.35s ease",
        overflow: "hidden",
      }}
    >
      {/* Zone 1 — Title + Severity Badge + Chevron */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: isCollapsed ? 0 : "12px",
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
          {opportunity.title}
        </h3>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            fontWeight: "700",
            color: severityColors.text,
            backgroundColor: severityColors.bg,
            padding: "4px 12px",
            borderRadius: "20px",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {opportunity.priority}
        </span>
      </div>

      {/* Zone 2 — Description + Impact bar (hidden when collapsed) */}
      {!isCollapsed && (
        <>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "14px" : "15px",
              color: "#666",
              margin: "0 0 16px 0",
              lineHeight: "1.6",
              display: "-webkit-box",
              WebkitLineClamp: isMobile ? 2 : 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: isMobile ? "auto" : "63px",
            }}
          >
            {opportunity.description}
          </p>

          {/* Impact bar */}
          <div
            style={{
              backgroundColor: colors.accentLight,
              padding: isMobile ? "8px 12px" : "10px 16px",
              borderRadius: "12px",
              marginBottom: isExpanded ? "16px" : 0,
            }}
          >
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "600",
                color: colors.primary,
              }}
            >
              Impact:
            </span>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
                color: colors.primary,
                marginLeft: "6px",
              }}
            >
              {opportunity.quantification}
            </span>
          </div>
        </>
      )}

      {/* Expanded content */}
      {isExpanded && (
        <div
          style={{
            paddingTop: "16px",
            borderTop: `1px solid ${colors.line}`,
          }}
        >
          {/* Zone 3 — Priority + Scale */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            {/* Priority cell */}
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
                    color: severityColors.text,
                    backgroundColor: severityColors.bg,
                    padding: "4px 10px",
                    borderRadius: "20px",
                  }}
                >
                  {opportunity.priority}
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
                    width: `${opportunity.priorityScore}%`,
                    backgroundColor: colors.accent,
                    borderRadius: "4px",
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            </div>

            {/* Scale cell */}
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
                  marginBottom: "6px",
                }}
              >
                Scale
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "6px",
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
                  {opportunity.impactCount}
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    color: "#666",
                  }}
                >
                  {opportunity.impactLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Zone 4 — Opportunity Drivers */}
          <div style={{ marginBottom: "20px" }}>
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
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "10px",
              }}
            >
              {opportunity.drivers.map((driver, j) => (
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
                  <div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: isMobile ? "13px" : "14px",
                        fontWeight: "600",
                        color: colors.dark,
                      }}
                    >
                      {driver.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        color: "#888",
                      }}
                    >
                      {driver.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Zone 5 — BRIDGE Solution Footer */}
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
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "600",
                color: colors.primary,
                flex: 1,
              }}
            >
              {opportunity.bridgeSolution}
            </span>
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
              }}
            >
              View
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Opportunity Section (formerly Problem Section)
const OpportunitySection = () => {
  const isMobile = useIsMobile();
  const [expandedCard, setExpandedCard] = useState(null);
  const [oppActiveIndex, setOppActiveIndex] = useState(0);

  return (
    <section
      style={{
        backgroundColor: colors.background,
        padding: isMobile ? "60px 20px" : "100px 80px",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          {/* Pill on background (#F3F5F2) — Variant A with dot */}
          <div
            style={{
              display: "inline-block",
              backgroundColor: colors.white,
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Inter, sans-serif",
              color: colors.primary,
              border: `1px solid ${colors.line}`,
              marginBottom: "24px",
            }}
          >
            The Opportunity
          </div>
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
            <span style={{ color: colors.accent, fontWeight: "600" }}>$1.9 billion</span> in agricultural value ready to
            be captured
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              lineHeight: "1.65",
              color: "#666",
              maxWidth: "680px",
              margin: 0,
            }}
          >
            Ghana's agriculture sector represents one of the most compelling investment landscapes in West Africa —
            connecting 5.6 million smallholder farmers to fair markets while building the infrastructure that keeps
            value in-country.
          </p>
        </div>

        {/* Opportunity Cards — Carousel on mobile, Grid on desktop */}
        <div
          className="opp-scroll"
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
          onScroll={
            isMobile
              ? (e) => {
                  const scrollLeft = (e.target as HTMLDivElement).scrollLeft;
                  const cardWidth = (e.target as HTMLDivElement).scrollWidth / opportunitySectionData.length;
                  setOppActiveIndex(Math.round(scrollLeft / cardWidth));
                }
              : undefined
          }
        >
          {isMobile && (
            <style>{`
            .opp-scroll::-webkit-scrollbar { display: none; }
            .opp-scroll { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>
          )}
          {opportunitySectionData.map((opportunity, i) => (
            <div
              key={opportunity.id}
              style={
                isMobile
                  ? {
                      minWidth: "85%",
                      maxWidth: "85%",
                      flexShrink: 0,
                      scrollSnapAlign: "start",
                    }
                  : {}
              }
            >
              <OpportunityCard
                opportunity={opportunity}
                isExpanded={expandedCard === i}
                isCollapsed={expandedCard !== null && expandedCard !== i}
                onToggle={() => setExpandedCard(expandedCard === i ? null : i)}
              />
            </div>
          ))}
        </div>
        {/* Dot indicators on mobile */}
        {isMobile && (
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
            {opportunitySectionData.map((_, i) => (
              <div
                key={i}
                style={{
                  width: oppActiveIndex === i ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: oppActiveIndex === i ? colors.accent : colors.line,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
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
// PREMIUM VALUE CHAIN SECTION
// ============================================================================

// Animated Flow Arrow Component
const AnimatedFlowArrow = ({ isActive, delay = 0 }) => {
  return (
    <div
      style={{
        width: "36px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: isActive ? "rgba(184, 217, 53, 0.2)" : "transparent",
          animation: isActive ? "pulse 2s ease-in-out infinite" : "none",
          animationDelay: `${delay}ms`,
        }}
      />

      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          transform: isActive ? "translateX(3px)" : "translateX(0)",
          transition: "transform 0.3s ease",
        }}
      >
        <path
          d="M5 12h14M12 5l7 7-7 7"
          stroke={isActive ? colors.accent : colors.line}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {isActive && (
        <>
          <div
            style={{
              position: "absolute",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: colors.accent,
              animation: "flowParticle 1.5s ease-in-out infinite",
              animationDelay: `${delay}ms`,
            }}
          />
          <div
            style={{
              position: "absolute",
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              backgroundColor: colors.accent,
              opacity: 0.6,
              animation: "flowParticle 1.5s ease-in-out infinite",
              animationDelay: `${delay + 300}ms`,
            }}
          />
        </>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.3); opacity: 0.1; }
        }
        @keyframes flowParticle {
          0% { left: 0; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 30px; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// Premium Flip Card Component
const StageCard = ({ stage, index, isActive, onSelect }) => {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "220px",
        cursor: "pointer",
      }}
      onClick={() => onSelect(index)}
    >
      <div
        style={{
          width: "100%",
          backgroundColor: colors.white,
          borderRadius: "20px",
          border: isActive ? `2px solid ${colors.accent}` : `1px solid ${colors.line}`,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease",
        }}
      >
        {/* Card Content */}
        <div
          style={{
            padding: "20px 18px 16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Stage Number Badge */}
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              backgroundColor: isActive ? colors.accent : colors.background,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "13px",
              fontWeight: "700",
              fontFamily: "Poppins, sans-serif",
              color: isActive ? colors.primary : "#999",
              marginBottom: "12px",
              transition: "all 0.3s ease",
              border: isActive ? "none" : `1px solid ${colors.line}`,
            }}
          >
            {index + 1}
          </div>

          {/* Stage Name */}
          <h4
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "15px",
              fontWeight: "700",
              color: colors.primary,
              margin: "0 0 4px 0",
              textAlign: "center",
            }}
          >
            {stage.stage}
          </h4>

          {/* Actor */}
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              color: "#666",
              textAlign: "center",
              marginBottom: "10px",
              lineHeight: "1.4",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {stage.actor}
          </div>

          {/* Population Badge */}
          <div
            style={{
              backgroundColor: isActive ? colors.accentLight : colors.background,
              padding: "6px 12px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "600",
              fontFamily: "Inter, sans-serif",
              color: colors.primary,
              marginBottom: "12px",
              border: `1px solid ${isActive ? colors.accent : colors.line}`,
              whiteSpace: "nowrap",
              transition: "all 0.3s ease",
            }}
          >
            {stage.population}
          </div>

          {/* Value Retained Indicator */}
          <div style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "6px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontFamily: "Inter, sans-serif",
                  color: "#999",
                }}
              >
                Value Retained
              </span>
              <span
                style={{
                  fontSize: "11px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "600",
                  color: colors.primary,
                }}
              >
                {stage.valueRetained}%
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: "6px",
                backgroundColor: colors.background,
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${stage.valueRetained}%`,
                  height: "100%",
                  backgroundColor: colors.accent,
                  borderRadius: "3px",
                  transition: "width 1s ease-out",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Value Leakage Bar Component
const ValueLeakageBar = ({ isAnimating }) => {
  const isMobile = useIsMobile();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setProgress(100), 100);
      return () => clearTimeout(timer);
    } else {
      setProgress(0);
    }
  }, [isAnimating]);

  return (
    <div
      style={{
        backgroundColor: colors.primary,
        borderRadius: "20px",
        padding: "16px 32px",
        marginTop: "20px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
          gap: "32px",
          alignItems: "center",
        }}
      >
        {/* Left: Stat */}
        <div>
          <div
            style={{
              fontSize: "12px",
              fontFamily: "Inter, sans-serif",
              color: colors.accent,
              fontWeight: "600",
              marginBottom: "4px",
            }}
          >
            Value Retained by Farmers
          </div>
          <div
            style={{
              fontSize: isMobile ? "22px" : "36px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "700",
              color: colors.white,
              lineHeight: "1",
            }}
          >
            20-40%
          </div>
        </div>

        {/* Center: Sankey-style flow */}
        <div
          style={{
            position: "relative",
            height: "60px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: "12px",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "6px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress * 0.3}%`,
                height: "100%",
                backgroundColor: colors.accent,
                borderRadius: "6px",
                transition: "width 2s ease-out",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                  animation: isAnimating ? "shimmer 1.5s infinite" : "none",
                }}
              />
            </div>
          </div>

          {/* Stage markers */}
          {valueChainStages.map((stage, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${(i / (valueChainStages.length - 1)) * 100}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: i === 0 ? colors.accent : "rgba(255,255,255,0.2)",
                  border: "3px solid rgba(255,255,255,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {i === 0 && (
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: colors.primary,
                    }}
                  />
                )}
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "28px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "10px",
                  fontFamily: "Inter, sans-serif",
                  color: "rgba(255,255,255,0.6)",
                  whiteSpace: "nowrap",
                }}
              >
                {stage.valueRetained}%
              </div>
            </div>
          ))}

          {/* Value recapture opportunities */}
          <div
            style={{
              position: "absolute",
              top: "2px",
              left: "25%",
              fontSize: "10px",
              fontFamily: "Inter, sans-serif",
              color: colors.accent,
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
            +25%
          </div>
          <div
            style={{
              position: "absolute",
              top: "2px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "10px",
              fontFamily: "Inter, sans-serif",
              color: colors.accent,
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
            +20%
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};

// Main Premium Value Chain Section
const ValueChainSectionPremium = () => {
  const isMobile = useIsMobile();
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStage, setActiveStage] = useState(0);
  const [showDetailStrip, setShowDetailStrip] = useState(false);

  // Auto-advance active stage when playing
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % valueChainStages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleStageSelect = (index) => {
    setActiveStage(index);
    setIsPlaying(false);
    setShowDetailStrip(true);
  };

  return (
    <section
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "60px 20px" : "100px 80px",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "60px" }}>
          {/* Pill — Variant A with dot */}
          <div
            style={{
              display: "inline-block",
              backgroundColor: colors.white,
              padding: "10px 20px",
              border: `1px solid ${colors.line}`,
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "2px",
              color: colors.primary,
              fontFamily: "Inter, sans-serif",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            The Process
          </div>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
              color: colors.primary,
              margin: "0 0 20px 0",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            From <span style={{ color: colors.accent, fontWeight: "600" }}>Farm to Fork</span>: Where Value is Created
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              lineHeight: "1.65",
              color: "#666",
              maxWidth: "700px",
              margin: "0 auto",
              ...(isMobile
                ? {
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }
                : {}),
            }}
          >
            Each stage in the agricultural value chain creates potential for strategic resources and innovation to
            create compounding value. Select any stage to explore the opportunities that BRIDGE ventures address.
          </p>
        </div>

        {/* Value Chain Flow */}
        <div
          style={
            isMobile
              ? {
                  display: "flex",
                  gap: "4px",
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  margin: "0 -20px",
                  padding: "0 20px 8px",
                }
              : {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  maxWidth: "100%",
                }
          }
        >
          {valueChainStages.map((stage, i) => (
            <React.Fragment key={i}>
              <div
                style={
                  isMobile
                    ? { minWidth: "48%", maxWidth: "48%", flexShrink: 0, scrollSnapAlign: "start" }
                    : { flex: "1 1 0", display: "flex", justifyContent: "center", minWidth: 0 }
                }
              >
                <StageCard stage={stage} index={i} isActive={activeStage === i} onSelect={handleStageSelect} />
              </div>
              {!isMobile && i < valueChainStages.length - 1 && (
                <AnimatedFlowArrow isActive={isPlaying && activeStage === i} delay={i * 200} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Value Leakage Visualization — always visible */}
        <ValueLeakageBar isAnimating={isPlaying} />

        {/* Legend / Key — always visible */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: isMobile ? "16px" : "32px",
            marginTop: isMobile ? "20px" : "32px",
            flexWrap: "wrap",
          }}
        >
          {[
            { color: colors.accent, label: "Value Retained" },
            { color: "#F59E0B", label: "Pain Point / Leakage" },
            { color: colors.primary, label: "BRIDGE Intervention Point" },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "3px",
                  backgroundColor: item.color,
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  fontFamily: "Inter, sans-serif",
                  color: "#666",
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Toggle detail strip */}
        {!showDetailStrip ? (
          <button
            onClick={() => {
              setShowDetailStrip(true);
              setIsPlaying(false);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              padding: "14px",
              marginTop: "24px",
              backgroundColor: colors.primary,
              border: "none",
              borderRadius: "14px",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: "600",
              color: colors.white,
              cursor: "pointer",
            }}
          >
            Explore Stage Details
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.accent}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        ) : (
          <>
            {/* ★ PERSISTENT DETAIL STRIP — shows active stage content ★ */}
            {(() => {
              const stage = valueChainStages[activeStage];
              return (
                <div
                  style={{
                    backgroundColor: colors.primary,
                    borderRadius: isMobile ? "16px" : "20px",
                    padding: isMobile ? "20px" : "24px 32px",
                    marginTop: "32px",
                    transition: "all 0.3s ease",
                  }}
                >
                  {/* Top Row: Icon + Stage info (left) + Controls (right) */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      marginBottom: isMobile ? "16px" : "20px",
                      paddingBottom: isMobile ? "14px" : "16px",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {/* Left: Icon + Name + Actor */}
                    <div style={{ display: "flex", alignItems: "center", gap: "14px", flex: 1 }}>
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          backgroundColor: "rgba(255,255,255,0.08)",
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: colors.accent,
                          flexShrink: 0,
                        }}
                      >
                        {valueChainIcons[stage.icon]}
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: isMobile ? "18px" : "20px",
                            fontWeight: "700",
                            color: colors.white,
                            lineHeight: "1.2",
                          }}
                        >
                          {stage.stage}
                        </div>
                        <div
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "13px",
                            fontWeight: "600",
                            color: "rgba(255,255,255,0.5)",
                            marginTop: "1px",
                          }}
                        >
                          {stage.actor} · {stage.population}
                        </div>
                      </div>
                    </div>

                    {/* Right: Controls */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        flexShrink: 0,
                      }}
                    >
                      {/* Play/Pause */}
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          backgroundColor: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          padding: "6px 14px",
                          borderRadius: "50px",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            width: "22px",
                            height: "22px",
                            borderRadius: "50%",
                            backgroundColor: isPlaying ? colors.accent : "rgba(255,255,255,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {isPlaying ? (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill={colors.primary}>
                              <rect x="6" y="4" width="4" height="16" />
                              <rect x="14" y="4" width="4" height="16" />
                            </svg>
                          ) : (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill={colors.white}>
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                          )}
                        </div>
                        <span
                          style={{
                            fontSize: "11px",
                            fontFamily: "Inter, sans-serif",
                            color: "rgba(255,255,255,0.6)",
                            fontWeight: "500",
                          }}
                        >
                          {isPlaying ? "Pause" : "Play"}
                        </span>
                      </button>

                      {/* Jump-to stage dots — desktop only */}
                      {!isMobile && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            backgroundColor: "rgba(255,255,255,0.06)",
                            padding: "6px 10px",
                            borderRadius: "50px",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          {valueChainStages.map((s, i) => (
                            <button
                              key={i}
                              onClick={() => handleStageSelect(i)}
                              style={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "50%",
                                backgroundColor: activeStage === i ? colors.accent : "rgba(255,255,255,0.1)",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "11px",
                                fontWeight: "600",
                                fontFamily: "Inter, sans-serif",
                                color: activeStage === i ? colors.primary : "rgba(255,255,255,0.4)",
                                transition: "all 0.2s ease",
                              }}
                            >
                              {i + 1}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Close button */}
                      <button
                        onClick={() => setShowDetailStrip(false)}
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          backgroundColor: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.12)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          flexShrink: 0,
                        }}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="rgba(255,255,255,0.5)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        >
                          <path d="M18 6L6 18" />
                          <path d="M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                      gap: isMobile ? "20px" : "32px",
                    }}
                  >
                    {/* Left: Opportunities + Value Leakage */}
                    <div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "11px",
                          fontWeight: "800",
                          textTransform: "uppercase",
                          letterSpacing: "2px",
                          color: colors.accent,
                          marginBottom: "12px",
                        }}
                      >
                        BRIDGE Opportunities
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "6px",
                          marginBottom: stage.valueLost > 0 ? "16px" : 0,
                        }}
                      >
                        {stage.opportunities.map((point, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <svg
                              width="14"
                              height="14"
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
                            <span
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "13px",
                                color: "rgba(255,255,255,0.8)",
                                lineHeight: "1.4",
                              }}
                            >
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Value Leakage — compact inline */}
                      {stage.valueLost > 0 && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginTop: "4px",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "Poppins, sans-serif",
                              fontSize: "20px",
                              fontWeight: "700",
                              color: "#F59E0B",
                              lineHeight: "1",
                            }}
                          >
                            {stage.valueLost}%
                          </span>
                          <div>
                            <div
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "10px",
                                fontWeight: "600",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                                color: "#F59E0B",
                                lineHeight: "1",
                                marginBottom: "2px",
                              }}
                            >
                              Value Leakage
                            </div>
                            <div
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "11px",
                                color: "rgba(255,255,255,0.35)",
                              }}
                            >
                              lost before next stage
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right: Compact Insight Cards */}
                    <div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "11px",
                          fontWeight: "800",
                          textTransform: "uppercase",
                          letterSpacing: "2px",
                          color: colors.accent,
                          marginBottom: "12px",
                        }}
                      >
                        Key Insights
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        {stage.insights.map((insight, i) => (
                          <div
                            key={i}
                            style={{
                              backgroundColor: "rgba(255,255,255,0.05)",
                              borderRadius: "10px",
                              padding: "10px 14px",
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                              overflow: "hidden",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "9px",
                                fontWeight: "700",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px",
                                color: "rgba(255,255,255,0.3)",
                                minWidth: isMobile ? "60px" : "80px",
                                flexShrink: 0,
                                whiteSpace: "nowrap",
                              }}
                            >
                              {insight.label}
                            </span>
                            <span
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "13px",
                                fontWeight: "600",
                                color: colors.white,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {insight.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </>
        )}
      </div>
    </section>
  );
};

// ============================================================================
// SOLUTIONS SECTION (Original)
// ============================================================================

const SolutionsSection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [selectedTier, setSelectedTier] = useState(isMobile ? "1" : "all");

  const filteredSolutions =
    selectedTier === "all" ? sector.solutions : sector.solutions.filter((s) => s.tier === parseInt(selectedTier));

  return (
    <section
      style={{
        backgroundColor: colors.primary,
        padding: isMobile ? "60px 20px" : "100px 80px",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto", overflow: "hidden" }}>
        <div style={{ marginBottom: isMobile ? "32px" : "48px" }}>
          {/* Pill — Outline variant (on dark) */}
          <div
            style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "2px",
              color: colors.accent,
              fontFamily: "Inter, sans-serif",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            The Pathway to Impact
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "flex-end",
              gap: isMobile ? "24px" : "32px",
            }}
          >
            <div style={{ flex: 1 }}>
              <h2
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: isMobile ? "28px" : "42px",
                  fontWeight: "300",
                  lineHeight: "1.2",
                  letterSpacing: "-0.5px",
                  color: colors.white,
                  margin: "0 0 12px 0",
                  maxWidth: "900px",
                }}
              >
                <span style={{ fontWeight: "600" }}>Ventures</span> That Build{" "}
                <span style={{ color: colors.accent, fontWeight: "600" }}>Lasting Value</span>
              </h2>

              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: isMobile ? "15px" : "16px",
                  lineHeight: "1.65",
                  color: "rgba(255,255,255,0.55)",
                  maxWidth: "700px",
                  margin: 0,
                }}
              >
                Each venture is selected through BRIDGE's multi-criteria prioritization — balancing economic viability,
                social impact, and alignment with Ghana's agricultural policy framework to deliver measurable returns
                across every dimension.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "4px",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "4px",
                borderRadius: "50px",
                flexShrink: 0,
              }}
            >
              {[
                { value: "all", label: "All" },
                { value: "1", label: "Flagship" },
                { value: "2", label: "Scaling" },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedTier(filter.value)}
                  style={{
                    backgroundColor: selectedTier === filter.value ? colors.accent : "transparent",
                    color: selectedTier === filter.value ? colors.primary : "rgba(255,255,255,0.6)",
                    border: "none",
                    padding: "6px 16px",
                    borderRadius: "50px",
                    fontSize: "12px",
                    fontWeight: selectedTier === filter.value ? "700" : "500",
                    fontFamily: "Inter, sans-serif",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards Grid — inside content container */}
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
                  gridTemplateColumns:
                    filteredSolutions.length >= 3 ? "repeat(3, 1fr)" : `repeat(${filteredSolutions.length}, 1fr)`,
                  gap: "20px",
                  overflow: "hidden",
                }
          }
        >
          {filteredSolutions.map((solution, i) => (
            <div
              key={solution.name}
              style={{
                backgroundColor: colors.white,
                borderRadius: isMobile ? "16px" : "20px",
                padding: isMobile ? "24px" : "28px",
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                overflow: "hidden",
                ...(isMobile ? { minWidth: "80%", maxWidth: "80%", flexShrink: 0, scrollSnapAlign: "start" } : {}),
              }}
            >
              {/* Top row: Priority Score left, TIER badge right — aligned */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: colors.primary,
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: colors.accent,
                      fontSize: "14px",
                      fontWeight: "700",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {solution.score}
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#999",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Priority Score
                  </span>
                </div>
                <span
                  style={{
                    backgroundColor: colors.background,
                    color: colors.primary,
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "11px",
                    fontWeight: "700",
                    fontFamily: "Inter, sans-serif",
                    border: `1px solid ${colors.line}`,
                  }}
                >
                  TIER {solution.tier}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: colors.dark,
                  margin: "0 0 12px 0",
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
                  margin: "0 0 20px 0",
                  flex: 1,
                  minHeight: isMobile ? "auto" : "66px",
                }}
              >
                {solution.description}
              </p>

              {/* Expected Impact — single line */}
              <div
                style={{
                  backgroundColor: colors.accentLight,
                  padding: "12px 16px",
                  borderRadius: "12px",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "#666",
                    fontFamily: "Inter, sans-serif",
                    flexShrink: 0,
                  }}
                >
                  Expected Impact
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    color: colors.primary,
                    fontFamily: "Inter, sans-serif",
                    fontWeight: "500",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {solution.impact}
                </span>
              </div>

              {/* Bottom: Capital only, no Details button */}
              <div
                style={{
                  paddingTop: "16px",
                  borderTop: `1px solid ${colors.line}`,
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: colors.primary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {solution.capital}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#999",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Capital Required
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Dot indicators on mobile */}
        {isMobile && (
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
            {filteredSolutions.map((_, i) => (
              <div
                key={i}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: i === 0 ? colors.accent : "rgba(255,255,255,0.2)",
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
// COMPETITIVE LANDSCAPE SECTION (Redesigned — Screenshot Match)
// ============================================================================

const CompetitiveLandscapeSection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllAllies, setShowAllAllies] = useState(false);
  const [showBridgePosition, setShowBridgePosition] = useState(false);

  const allies = sector.allies;
  const current = allies[currentIndex];

  const nextCompetitor = () => {
    setCurrentIndex((prev) => (prev + 1) % allies.length);
    setIsExpanded(false);
  };
  const prevCompetitor = () => {
    setCurrentIndex((prev) => (prev - 1 + allies.length) % allies.length);
    setIsExpanded(false);
  };

  // Rating dots
  const RatingDots = ({ rating }) => (
    <div style={{ display: "flex", gap: "3px" }}>
      {[1, 2, 3, 4, 5].map((dot) => (
        <div
          key={dot}
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: dot <= rating ? colors.accent : colors.line,
          }}
        />
      ))}
    </div>
  );

  // === SMALL ALLY CARD (right grid) ===
  const AllyCard = ({ ally }) => (
    <div
      style={{
        backgroundColor: colors.white,
        borderRadius: "16px",
        padding: "20px",
        border: `1px solid ${colors.line}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Name + Funding badge */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
          marginBottom: "8px",
        }}
      >
        <h4
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "16px",
            fontWeight: "700",
            color: colors.dark,
            margin: 0,
          }}
        >
          {ally.name}
        </h4>
        <span
          style={{
            backgroundColor: colors.accentLight,
            color: colors.primary,
            padding: "3px 10px",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: "700",
            fontFamily: "Inter, sans-serif",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {ally.funding}
        </span>
      </div>

      {/* Focus description */}
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "13px",
          color: "#666",
          lineHeight: "1.5",
          margin: "0 0 14px 0",
          flex: 1,
        }}
      >
        {ally.focus}
      </p>

      {/* Top Strength box */}
      <div
        style={{
          backgroundColor: colors.background,
          borderRadius: "10px",
          padding: "10px 14px",
          marginBottom: "14px",
        }}
      >
        <div
          style={{
            fontSize: "9px",
            fontFamily: "Inter, sans-serif",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "#999",
            marginBottom: "4px",
          }}
        >
          Top Strength
        </div>
        <div
          style={{
            fontSize: "14px",
            fontFamily: "Inter, sans-serif",
            fontWeight: "600",
            color: colors.dark,
          }}
        >
          {ally.topStrength}
        </div>
      </div>

      {/* Bottom row: Est. year + Priority */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "12px",
          borderTop: `1px solid ${colors.line}`,
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            color: "#999",
          }}
        >
          Est. {ally.year}
        </span>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            fontWeight: "600",
            color: ally.priority === "High Priority" ? colors.primary : "#888",
          }}
        >
          {ally.priority}
        </span>
      </div>
    </div>
  );

  const visibleAllies = isMobile && !showAllAllies ? allies.slice(0, 2) : allies;

  return (
    <section
      style={{
        backgroundColor: colors.background,
        padding: isMobile ? "60px 20px" : "100px 80px",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ marginBottom: isMobile ? "32px" : "48px" }}>
          {/* Pill */}
          <div
            style={{
              display: "inline-block",
              backgroundColor: colors.white,
              padding: "10px 20px",
              border: `1px solid ${colors.line}`,
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "2px",
              color: colors.primary,
              fontFamily: "Inter, sans-serif",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            The Landscape
          </div>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
              color: colors.primary,
              margin: "0 0 20px 0",
              maxWidth: "900px",
            }}
          >
            Building With Ghana's{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Strongest Institutions</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              lineHeight: "1.65",
              color: "#666",
              margin: "0",
              maxWidth: "700px",
            }}
          >
            AgTech innovators are addressing specific opportunities—Farmerline for information, AgroCenta for market
            linkage, AkoFresh for cold storage. BRIDGE combines strengths, aligning resources to create shared value for
            the 80% smallholder majority.
          </p>
        </div>

        {/* Main Grid: Left Analysis + Right Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr",
            gap: isMobile ? "24px" : "16px",
            alignItems: "stretch",
          }}
        >
          {/* === LEFT COLUMN: Analysis Card + BRIDGE Position === */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Scrollable Analysis Card */}
            <div
              style={{
                backgroundColor: colors.white,
                borderRadius: "20px",
                border: `1px solid ${colors.line}`,
                overflow: "hidden",
              }}
            >
              {/* Card Header: Name + Priority */}
              <div style={{ padding: "24px 24px 0" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "10px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "20px",
                      fontWeight: "700",
                      color: colors.dark,
                      margin: 0,
                    }}
                  >
                    {current.name}
                  </h3>
                  <span
                    style={{
                      backgroundColor: colors.accentLight,
                      color: colors.primary,
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "700",
                      fontFamily: "Inter, sans-serif",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {current.priority}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    color: "#666",
                    lineHeight: "1.5",
                    margin: "0 0 20px 0",
                  }}
                >
                  {current.focus}
                </p>

                {/* Strength Bars */}
                <div style={{ marginBottom: "20px" }}>
                  {current.strengths.map((strength, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: i < current.strengths.length - 1 ? "12px" : 0,
                      }}
                    >
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: colors.dark }}>
                        {strength.name}
                      </span>
                      <RatingDots rating={strength.rating} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Expanded: Complementary Areas + BRIDGE Opportunity */}
              {isExpanded && (
                <div style={{ padding: "0 24px 20px", borderTop: `1px solid ${colors.line}`, paddingTop: "20px" }}>
                  <div style={{ marginBottom: "16px" }}>
                    <div
                      style={{
                        fontSize: "10px",
                        fontFamily: "Inter, sans-serif",
                        color: "#888",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        marginBottom: "10px",
                        fontWeight: "600",
                      }}
                    >
                      Complementary Areas
                    </div>
                    {current.complementaryAreas.map((area, i) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: i < current.complementaryAreas.length - 1 ? "6px" : 0,
                        }}
                      >
                        <span style={{ color: colors.accent, fontSize: "8px" }}>{"\u25CF"}</span>
                        <span style={{ fontSize: "13px", fontFamily: "Inter, sans-serif", color: "#555" }}>{area}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      backgroundColor: colors.accentLight,
                      borderRadius: "10px",
                      padding: "14px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "10px",
                        fontFamily: "Inter, sans-serif",
                        color: colors.primary,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        fontWeight: "700",
                        marginBottom: "6px",
                      }}
                    >
                      BRIDGE Opportunity
                    </div>
                    <p
                      style={{
                        fontSize: "13px",
                        fontFamily: "Inter, sans-serif",
                        color: colors.primary,
                        lineHeight: "1.5",
                        margin: 0,
                      }}
                    >
                      {current.bridgeOpportunity}
                    </p>
                  </div>
                </div>
              )}

              {/* Footer: Nav + Expand */}
              <div
                style={{
                  padding: "16px 24px",
                  borderTop: `1px solid ${colors.line}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button
                    onClick={prevCompetitor}
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
                      color: colors.primary,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <span style={{ fontSize: "12px", fontFamily: "Inter, sans-serif", color: "#888" }}>
                    {currentIndex + 1} / {allies.length}
                  </span>
                  <button
                    onClick={nextCompetitor}
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
                      color: colors.primary,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  style={{
                    backgroundColor: "transparent",
                    color: colors.primary,
                    border: `1.5px solid ${colors.line}`,
                    padding: "10px 20px",
                    borderRadius: "50px",
                    fontSize: "12px",
                    fontWeight: "600",
                    fontFamily: "Inter, sans-serif",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {isExpanded ? "Less" : "Analysis"}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{ transform: isExpanded ? "rotate(180deg)" : "none" }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* BRIDGE Position Card (dark green) — hidden by default on mobile */}
            {isMobile && !showBridgePosition ? (
              <button
                onClick={() => setShowBridgePosition(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "14px",
                  backgroundColor: colors.primary,
                  border: "none",
                  borderRadius: "14px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: colors.white,
                  cursor: "pointer",
                }}
              >
                BRIDGE's Position
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={colors.accent}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            ) : (
              <div
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: "20px",
                  padding: "28px",
                  flex: 1,
                  position: "relative",
                }}
              >
                {/* Mobile close button */}
                {isMobile && (
                  <button
                    onClick={() => setShowBridgePosition(false)}
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "16px",
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      zIndex: 1,
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(255,255,255,0.5)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <path d="M18 6L6 18" />
                      <path d="M6 6l12 12" />
                    </svg>
                  </button>
                )}
                {/* Header: label + vs pill */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    BRIDGE'S POSITION
                  </span>
                  <span
                    style={{
                      backgroundColor: "rgba(184, 217, 53, 0.2)",
                      color: colors.accent,
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "600",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    vs {current.name}
                  </span>
                </div>

                {/* Headline */}
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "18px",
                    fontWeight: "600",
                    color: colors.white,
                    lineHeight: "1.4",
                    margin: "0 0 20px 0",
                  }}
                >
                  {current.bridgePosition.headline}
                </h3>

                {/* Synergy rows */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {current.bridgePosition.synergies.map((syn, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.06)",
                        borderRadius: "10px",
                        padding: "12px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
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
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          fontWeight: "600",
                          color: colors.white,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {syn.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "rgba(255,255,255,0.5)",
                        }}
                      >
                        {syn.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* === RIGHT COLUMN: 2×3 Ally Card Grid — desktop only === */}
          {!isMobile && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "16px",
              }}
            >
              {visibleAllies.map((ally, i) => (
                <AllyCard key={i} ally={ally} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================================================

// ============================================================================
// GOVERNANCE & POLICY SECTION (Horizontal Scrollable Cards — Handoff Spec)
// ============================================================================

const governancePolicies = [
  {
    policy: "Oil Palm Development Finance Window",
    body: "Ministry of Finance / Fund24",
    allocation: "GH₵6.9B (~$500M)",
    category: "funding",
    relevance: ["downstream"],
    alignment:
      "Largest agricultural finance window with 5-year moratorium and 70% project financing for palm oil value chain development.",
    bridgeRole:
      "Co-financing partner for Integrated Agriculture Hub and palm oil processing facilities, leveraging concessionary terms.",
    bridgeVentures: ["Integrated Agriculture Hub", "Coconut Processing Hub"],
    pillars: ["Grow24", "Fund24"],
  },
  {
    policy: "Agricultural Enclave Roads",
    body: "Ministry of Roads & Highways",
    allocation: "GH₵828M (~$60M)",
    category: "infrastructure",
    relevance: ["upstream", "downstream"],
    alignment:
      "Farm-to-market road construction connecting agricultural production zones to processing centers and regional markets.",
    bridgeRole:
      "Infrastructure beneficiary enabling cold storage network siting and market aggregation hub connectivity access.",
    bridgeVentures: ["Cold Storage Network", "Market Aggregation Centers"],
    pillars: ["Build24"],
  },
  {
    policy: "Farmer Service Centers",
    body: "Ministry of Food & Agriculture",
    allocation: "GH₵690M (~$50M)",
    category: "partnerships",
    relevance: ["upstream"],
    alignment:
      "One-stop service centers for extension, inputs, and financial services supporting 5.6M smallholder farmer households.",
    bridgeRole:
      "Service delivery partner for cooperative strengthening programs and AgTech platform distribution channel access.",
    bridgeVentures: ["Cooperative Capital Fund", "AgTech Portfolio"],
    pillars: ["Grow24"],
  },
  {
    policy: "MoFA Core Budget Allocation",
    body: "Ministry of Food & Agriculture",
    allocation: "GH₵245M (~$18M)",
    category: "funding",
    relevance: ["upstream", "downstream"],
    alignment:
      "Core ministry allocation for agricultural development programs, extension services, and national policy coordination.",
    bridgeRole:
      "Technical partnership for all agriculture sector ventures with policy alignment and M&E framework integration.",
    bridgeVentures: ["All Agriculture Ventures"],
    pillars: ["Grow24"],
  },
  {
    policy: "Ghana Buffer Stock Company",
    body: "Ministry of Trade & Industry",
    allocation: "GH₵200M (~$15M)",
    category: "partnerships",
    relevance: ["downstream"],
    alignment:
      "Strategic grain reserve management and price stabilization through government commodity purchasing and storage programs.",
    bridgeRole:
      "Warehouse receipt financing offtake partner providing guaranteed demand floor for stored agricultural commodities.",
    bridgeVentures: ["Warehouse Receipt System", "Cold Storage Network"],
    pillars: ["Grow24"],
  },
  {
    policy: "Irrigation Infrastructure (GIDA)",
    body: "Ghana Irrigation Development Authority",
    allocation: "GH₵180M (~$13M)",
    category: "infrastructure",
    relevance: ["upstream"],
    alignment:
      "Small-scale irrigation systems enabling year-round agricultural production, crop diversification, and climate resilience.",
    bridgeRole:
      "Water access enabler for aggregation zones, increasing reliable supply volumes to processing and storage ventures.",
    bridgeVentures: ["Integrated Agriculture Hub", "Market Aggregation Centers"],
    pillars: ["Grow24", "Build24"],
  },
  {
    policy: "Agricultural Credit Facility",
    body: "Bank of Ghana",
    allocation: "GH₵150M (~$11M)",
    category: "tax",
    relevance: ["upstream", "downstream"],
    alignment:
      "Subsidized lending rates and extended tenors for agricultural value chain financing and smallholder credit access.",
    bridgeRole:
      "Blended finance partner for smallholder and cooperative lending platforms with flexible collateral frameworks.",
    bridgeVentures: ["Cooperative Capital Fund", "Digital Agricultural Lending"],
    pillars: ["Fund24"],
  },
  {
    policy: "Aquaculture Development Fund",
    body: "Fisheries Commission",
    allocation: "GH₵100M (~$7M)",
    category: "tax",
    relevance: ["downstream"],
    alignment:
      "Subsidized financing and tax incentives for fish farming development and aquaculture processing across all regions.",
    bridgeRole:
      "Processing facility co-investment partner and cold chain integration coordinator for aquaculture value chains.",
    bridgeVentures: ["Cold Storage Network", "Export Processing"],
    pillars: ["Grow24"],
  },
  {
    policy: "Tree Crops Development Authority",
    body: "Ministry of Food & Agriculture",
    allocation: "GH₵350M (~$25M)",
    category: "funding",
    relevance: ["upstream", "downstream"],
    alignment:
      "Development and regulation of tree crop value chains including cashew, shea, mango, and coconut across all regions.",
    bridgeRole:
      "Processing and export partner for tree crop commodities, integrating with coconut and shea value chain ventures.",
    bridgeVentures: ["Coconut Processing Facility", "Agricultural Input Marketplace"],
    pillars: ["Grow24"],
  },
  {
    policy: "Rural Electrification Programme",
    body: "Ministry of Energy",
    allocation: "GH₵275M (~$20M)",
    category: "infrastructure",
    relevance: ["upstream", "downstream"],
    alignment:
      "Expanding grid and off-grid power solutions to rural agricultural zones for processing and cold chain operations.",
    bridgeRole:
      "Energy access beneficiary enabling solar cold storage deployment and agricultural processing equipment operations.",
    bridgeVentures: ["Community Cold Storage Network", "Cassava Processing Hub"],
    pillars: ["Build24"],
  },
  {
    policy: "National Seed Council",
    body: "Ministry of Food & Agriculture",
    allocation: "GH₵80M (~$6M)",
    category: "partnerships",
    relevance: ["upstream"],
    alignment:
      "Certified seed production, quality assurance, and distribution systems strengthening smallholder crop productivity.",
    bridgeRole:
      "Input marketplace distribution partner connecting certified seed suppliers to cooperative purchasing networks.",
    bridgeVentures: ["Agricultural Input Marketplace", "Cooperative Capital Fund"],
    pillars: ["Grow24"],
  },
  {
    policy: "Export Development & Investment Fund",
    body: "Ministry of Trade & Industry",
    allocation: "GH₵120M (~$9M)",
    category: "tax",
    relevance: ["downstream"],
    alignment:
      "Tax rebates and export financing for agricultural processors meeting international quality and packaging standards.",
    bridgeRole:
      "Export facilitation partner leveraging tax incentives for processed agricultural products targeting regional markets.",
    bridgeVentures: ["Coconut Processing Facility", "Cassava Processing Hub"],
    pillars: ["Fund24"],
  },
];

const govCategories = [
  { id: "all", label: "All", mobileLabel: "All" },
  { id: "funding", label: "Direct Funding", mobileLabel: "Funding" },
  { id: "tax", label: "Tax Incentives", mobileLabel: "Tax" },
  { id: "infrastructure", label: "Infrastructure", mobileLabel: "Infrastructure" },
  { id: "partnerships", label: "Partnerships", mobileLabel: "Partners" },
];

const catBadgeStyles = {
  funding: { bg: "rgba(184,217,53,0.15)", border: "rgba(184,217,53,0.3)" },
  tax: { bg: "rgba(27,77,62,0.07)", border: "rgba(27,77,62,0.15)" },
  infrastructure: { bg: "rgba(184,217,53,0.1)", border: "rgba(184,217,53,0.25)" },
  partnerships: { bg: "rgba(27,77,62,0.05)", border: "rgba(27,77,62,0.12)" },
};

const GovernancePolicySection = () => {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);
  const [govActiveIndex, setGovActiveIndex] = useState(0);

  const filtered =
    activeCategory === "all" ? governancePolicies : governancePolicies.filter((p) => p.category === activeCategory);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setExpandedCard(null);
  };

  return (
    <section
      style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "100px 80px", overflow: "hidden" }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "48px", textAlign: isMobile ? "left" : "center" }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: colors.white,
              padding: "10px 20px",
              border: `1px solid ${colors.line}`,
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "2px",
              color: colors.primary,
              fontFamily: "Inter, sans-serif",
              textTransform: "uppercase",
              marginBottom: "24px",
            }}
          >
            The Governance & Policy
          </div>

          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
              color: colors.primary,
              margin: isMobile ? "0 0 16px" : "0 auto 16px",
              maxWidth: "900px",
            }}
          >
            Moving in Step with Ghana's <span style={{ fontWeight: "600" }}>Agricultural</span>{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Renaissance</span>
          </h2>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              lineHeight: "1.65",
              color: "#555",
              maxWidth: "700px",
              margin: isMobile ? "0 0 32px" : "0 auto 32px",
            }}
          >
            Every BRIDGE agriculture venture aligns with active government programs under the Grow24 and Fund24 pillars,
            ensuring complementary investment.
          </p>

          {/* Category filter pills */}
          <div
            style={{
              display: "flex",
              gap: isMobile ? "6px" : "10px",
              justifyContent: isMobile ? "flex-start" : "center",
            }}
          >
            {govCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  style={{
                    padding: isMobile ? "6px 12px" : "6px 16px",
                    borderRadius: "50px",
                    border: isActive ? "1.5px solid " + colors.accent : "1px solid " + colors.line,
                    backgroundColor: isActive ? colors.accentLight : "transparent",
                    color: isActive ? colors.primary : "#999",
                    fontSize: isMobile ? "11px" : "12px",
                    fontWeight: isActive ? "700" : "500",
                    fontFamily: "Inter, sans-serif",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {isMobile ? cat.mobileLabel : cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Card Row */}
        <div
          className="policy-scroll"
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
                  paddingBottom: "8px",
                  marginBottom: "24px",
                }
          }
          onScroll={
            isMobile
              ? (e) => {
                  const scrollLeft = (e.target as HTMLDivElement).scrollLeft;
                  const cardWidth = (e.target as HTMLDivElement).scrollWidth / filtered.length;
                  setGovActiveIndex(Math.round(scrollLeft / cardWidth));
                }
              : undefined
          }
        >
          <style>{`
            .policy-scroll::-webkit-scrollbar { display: none; }
            .policy-scroll { -ms-overflow-style: none; scrollbar-width: none; }
          `}</style>

          {filtered.map((policy, idx) => {
            const isExpanded = expandedCard === idx;
            const badge = catBadgeStyles[policy.category];

            return (
              <div
                key={idx}
                style={
                  isMobile
                    ? {
                        minWidth: "90%",
                        maxWidth: "90%",
                        flexShrink: 0,
                        scrollSnapAlign: "start",
                      }
                    : {
                        minWidth: isExpanded ? "420px" : "280px",
                        maxWidth: isExpanded ? "420px" : "280px",
                        flexShrink: 0,
                      }
                }
              >
                <div
                  style={{
                    backgroundColor: colors.background,
                    border: isExpanded ? `2px solid ${colors.accent}` : `2px solid ${colors.line}`,
                    borderRadius: "16px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    height: "100%",
                  }}
                  onClick={() => setExpandedCard(isExpanded ? null : idx)}
                >
                  {/* Top row: Category badge + Relevance pills */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "12px",
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        fontFamily: "Inter, sans-serif",
                        color: colors.primary,
                        padding: "4px 10px",
                        borderRadius: "50px",
                        backgroundColor: badge.bg,
                        border: `1px solid ${badge.border}`,
                      }}
                    >
                      {policy.category}
                    </span>
                    <div style={{ display: "flex", gap: "6px" }}>
                      {policy.relevance.map((r, ri) => (
                        <span
                          key={ri}
                          style={{
                            fontSize: "9px",
                            fontWeight: "600",
                            textTransform: "uppercase",
                            fontFamily: "Inter, sans-serif",
                            color: "#888",
                            padding: "3px 8px",
                            borderRadius: "50px",
                            border: `1px solid ${colors.line}`,
                          }}
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Policy name */}
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      fontFamily: "Inter, sans-serif",
                      color: colors.primary,
                      minHeight: "42px",
                      marginBottom: "8px",
                      lineHeight: "1.3",
                    }}
                  >
                    {policy.policy}
                  </div>

                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      fontFamily: "Inter, sans-serif",
                      color: colors.accent,
                      marginBottom: "10px",
                    }}
                  >
                    {policy.allocation}
                  </div>

                  <div
                    style={{
                      fontSize: "13px",
                      fontFamily: "Inter, sans-serif",
                      color: "#666",
                      lineHeight: "1.5",
                      minHeight: "40px",
                      marginBottom: "12px",
                    }}
                  >
                    {policy.alignment}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginTop: "auto",
                      fontSize: "12px",
                      fontWeight: "600",
                      fontFamily: "Inter, sans-serif",
                      color: colors.primary,
                      opacity: 0.6,
                    }}
                  >
                    BRIDGE alignment
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      style={{
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div
                      style={{
                        borderTop: `1px solid ${colors.line}`,
                        marginTop: "14px",
                        paddingTop: "14px",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "11px",
                          fontFamily: "Inter, sans-serif",
                          color: "#888",
                          marginBottom: "10px",
                        }}
                      >
                        {policy.body}
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          fontFamily: "Inter, sans-serif",
                          color: "#444",
                          lineHeight: "1.5",
                          marginBottom: "14px",
                        }}
                      >
                        {policy.bridgeRole}
                      </div>
                      {policy.pillars && policy.pillars.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
                          {policy.pillars.map((p, pi) => (
                            <span
                              key={pi}
                              style={{
                                fontSize: "10px",
                                fontWeight: "700",
                                fontFamily: "Inter, sans-serif",
                                color: colors.primary,
                                backgroundColor: "rgba(184,217,53,0.15)",
                                border: "1px solid rgba(184,217,53,0.3)",
                                padding: "4px 10px",
                                borderRadius: "50px",
                                textTransform: "uppercase",
                              }}
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      )}
                      {/* BRIDGE Ventures with lime dot bullets */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {policy.bridgeVentures.map((v, vi) => (
                          <div
                            key={vi}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              padding: "10px 14px",
                              backgroundColor: colors.primary,
                              borderRadius: "10px",
                            }}
                          >
                            <span
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
                                fontSize: "13px",
                                fontWeight: "600",
                                fontFamily: "Inter, sans-serif",
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
              </div>
            );
          })}
        </div>

        {/* Scroll indicator dots — mobile */}
        {isMobile && (
          <div
            style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "12px", marginBottom: "24px" }}
          >
            {filtered.map((_, i) => (
              <div
                key={i}
                style={{
                  width: govActiveIndex === i ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: govActiveIndex === i ? colors.accent : colors.line,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
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
            gap: "16px",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: isMobile ? "flex-start" : "space-between",
            textAlign: "left",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? "16px" : "18px",
                fontWeight: "600",
                color: colors.white,
                marginBottom: "4px",
              }}
            >
              BRIDGE complements — never competes with — government vision.
            </div>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Every venture aligns with at least one active government policy or initiative.
            </div>
          </div>
          <button
            style={{
              backgroundColor: colors.accent,
              color: colors.primary,
              border: "none",
              padding: "12px 24px",
              borderRadius: "50px",
              fontSize: "13px",
              fontWeight: "700",
              fontFamily: "Inter, sans-serif",
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
              alignSelf: isMobile ? "center" : "auto",
            }}
          >
            View Partnership Strategy
          </button>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// IMPACT DASHBOARD SECTION (Dual-Lens: By Metric / By Stakeholder)
// ============================================================================

const impactMetrics = [
  {
    category: "Economic",
    items: [
      {
        label: "Agricultural GDP",
        value: 21,
        suffix: "%",
        prefix: "",
        description: "Agriculture contribution to Ghana GDP with $12B annual output",
        trend: "+3.2% YoY",
        ventures: "All Ventures",
      },
      {
        label: "Post-Harvest Loss Value",
        value: 1.9,
        suffix: "B",
        prefix: "$",
        description: "Annual value destroyed by inadequate storage and processing",
        trend: "At risk",
        ventures: "Cold Storage · Warehouse Receipt",
      },
      {
        label: "Value Chain Capture",
        value: 25,
        suffix: "-40%",
        prefix: "",
        description: "Share of final consumer price retained by Ghanaian producers",
        trend: "Capture gap",
        ventures: "Processing Hub · Aggregation Platform",
      },
      {
        label: "Development Leverage",
        value: 3,
        suffix: "-5x",
        prefix: "",
        description: "Every dollar deployed generates local economic multiplier effect",
        trend: "Multiplier",
        ventures: "All Ventures",
      },
    ],
  },
  {
    category: "People",
    items: [
      {
        label: "Smallholder Farmers",
        value: 25,
        suffix: "K+",
        prefix: "",
        description: "Direct beneficiaries accessing improved value chains and services",
        trend: "Target",
        ventures: "Cooperative Fund · AgTech Portfolio",
      },
      {
        label: "Jobs Created",
        value: 500,
        suffix: "+",
        prefix: "",
        description: "Direct employment across processing, logistics, and operations",
        trend: "Target",
        ventures: "Processing Hub · Cold Storage",
      },
      {
        label: "Youth in Agriculture",
        value: 2,
        suffix: "K+",
        prefix: "",
        description: "Young entrepreneurs engaged through AgTech and training programs",
        trend: "High priority",
        ventures: "AgTech Portfolio · Training Centers",
      },
      {
        label: "Women Farmers Served",
        value: 8,
        suffix: "K+",
        prefix: "",
        description: "Female producers accessing credit, inputs, and market platforms",
        trend: "Critical",
        ventures: "Cooperative Fund · Digital Lending",
      },
    ],
  },
  {
    category: "Returns",
    items: [
      {
        label: "Portfolio IRR",
        value: 12,
        suffix: "-22%",
        prefix: "",
        description: "Blended risk-adjusted returns across all 18 agriculture sector ventures",
        trend: "Target range",
        ventures: "All Ventures",
      },
      {
        label: "Tier 1 Returns",
        value: 15,
        suffix: "-22%",
        prefix: "",
        description: "Priority ventures with proven demand signals and rapid revenue models",
        trend: "High priority",
        ventures: "Tomato Processing · Cold Storage",
      },
      {
        label: "First Revenue",
        value: 12,
        suffix: "-18mo",
        prefix: "",
        description: "Timeline to initial cash generation from anchor venture launch phase",
        trend: "Near-term",
        ventures: "Coconut Hub · Warehouse System",
      },
      {
        label: "Capital Deployed",
        value: 12,
        suffix: "-22M",
        prefix: "$",
        description: "Total sector allocation across all three venture tiers phased over time",
        trend: "Phased",
        ventures: "All Ventures",
      },
    ],
  },
];

const impactStakeholders = [
  {
    title: "The Farmer",
    subtitle: "Farmers, processors & aggregators",
    outcomes: [
      "Reduced post-harvest losses from 30-50% to under 15% through cold storage access",
      "Income increases of 40-60% via improved value capture and fair pricing",
      "Year-round market access through warehouse receipt financing and aggregation",
      "Climate-resilient practices through irrigation, insurance, and diversified crops",
    ],
    stat: "25K+",
    statLabel: "farmers served directly",
    highlight: "First cooperative-owned cold storage",
  },
  {
    title: "The Cooperative",
    subtitle: "Farmer organizations & associations",
    outcomes: [
      "Working capital access through Cooperative Capital Fund for bulk input purchasing",
      "Digital platforms enabling transparent pricing and member communication",
      "Processing capabilities that add value before market sale",
      "Collective bargaining power strengthened through formalization and training",
    ],
    stat: "50+",
    statLabel: "cooperatives strengthened",
    highlight: "Warehouse receipt-backed lending",
  },
  {
    title: "The Government",
    subtitle: "MoFA, GIDA & district assemblies",
    outcomes: [
      "Private capital delivery of Grow24 agricultural objectives without fiscal burden",
      "Job creation and tax base expansion across rural agricultural zones",
      "Import substitution progress through domestic processing capacity",
      "Food security resilience through strategic storage and supply chain infrastructure",
    ],
    stat: "GH₵8.7B+",
    statLabel: "aligned budget allocations",
    highlight: "Zero fiscal burden model",
  },
  {
    title: "The Investor",
    subtitle: "Impact & institutional capital",
    outcomes: [
      "Asset-backed returns through physical processing and storage infrastructure",
      "Government co-financing leverage reducing risk through policy alignment",
      "Measurable ESG outcomes across employment, gender, and climate indicators",
      "Staged liquidity pathways via asset sales, concession renewals, or recap",
    ],
    stat: "12-22%",
    statLabel: "target portfolio IRR",
    highlight: "First-loss protected structure",
  },
];

// Animated counter hook
const useCounter = (target, duration = 1200, active = true) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    let start = null;
    const numVal = typeof target === "number" ? target : parseFloat(target);
    if (isNaN(numVal)) {
      setCount(0);
      return;
    }
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(ease * numVal);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return count;
};

const formatCounter = (count, item) => {
  const val = item.value;
  let display;
  if (val >= 1000) display = Math.round(count).toLocaleString();
  else if (val % 1 !== 0) display = count.toFixed(1);
  else display = Math.round(count).toString();
  return `${item.prefix}${display}${item.suffix}`;
};

const ImpactDashboardSection = () => {
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
  const switchCategory = (i) => {
    setActiveCategory(i);
    setAnimate(false);
    setTimeout(() => setAnimate(true), 50);
  };

  const currentMetrics = impactMetrics[activeCategory];
  const currentStakeholder = impactStakeholders[activeStakeholder];

  return (
    <section
      style={{ backgroundColor: colors.background, padding: isMobile ? "60px 20px" : "100px 80px", overflow: "hidden" }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Pill */}
        <div style={{ marginBottom: "24px" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: colors.white,
              padding: "10px 20px",
              border: `1px solid ${colors.line}`,
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "2px",
              color: colors.primary,
              fontFamily: "Inter, sans-serif",
              textTransform: "uppercase",
            }}
          >
            The Impact
          </span>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "28px" : "42px",
            fontWeight: "300",
            lineHeight: "1.2",
            letterSpacing: "-0.5px",
            color: colors.primary,
            margin: "0 0 12px",
            maxWidth: "820px",
          }}
        >
          What Changes When <span style={{ fontWeight: "600" }}>Value</span>
          <br />
          <span style={{ fontWeight: "600" }}>Chains</span>{" "}
          <span style={{ color: colors.accent, fontWeight: "600" }}>Work</span>
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "16px",
            color: "#555",
            lineHeight: "1.7",
            margin: "0 0 40px",
            maxWidth: "700px",
          }}
        >
          When farmers access fair markets, processors add value locally, and supply chains connect field to shelf — the
          ripple effects lift rural incomes, reduce food insecurity, and anchor prosperity where it begins.
        </p>

        {/* Controls Bar */}
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            alignItems: "center",
            gap: isMobile ? "8px" : "16px",
            marginBottom: "24px",
            justifyContent: isMobile ? "flex-start" : "flex-start",
            overflowX: isMobile ? "auto" : "visible",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* View Toggle */}
          <div
            style={{
              display: "inline-flex",
              border: `1px solid ${colors.line}`,
              borderRadius: "50px",
              backgroundColor: colors.background,
              overflow: "hidden",
              padding: "4px",
              flexShrink: 0,
            }}
          >
            {["metrics", "stakeholder"].map((v) => (
              <button
                key={v}
                onClick={() => switchView(v)}
                style={{
                  padding: isMobile ? "6px 14px" : "6px 20px",
                  border: "none",
                  fontSize: isMobile ? "11px" : "12px",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                  backgroundColor: view === v ? colors.white : "transparent",
                  fontWeight: view === v ? "700" : "500",
                  color: view === v ? colors.primary : "#999",
                  boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  borderRadius: "50px",
                  transition: "all 0.2s ease",
                }}
              >
                {v === "metrics" ? "By Metric" : "By Stakeholder"}
              </button>
            ))}
          </div>

          {/* Vertical Divider — desktop only */}
          {!isMobile && <div style={{ width: "1px", height: "24px", backgroundColor: colors.line }} />}

          {/* Sub-filter pills — FilterPill pattern */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "nowrap", flexShrink: 0 }}>
            {view === "metrics"
              ? impactMetrics.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => switchCategory(i)}
                    style={{
                      padding: isMobile ? "6px 12px" : "6px 16px",
                      borderRadius: "50px",
                      border: activeCategory === i ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                      fontSize: isMobile ? "11px" : "12px",
                      fontFamily: "Inter, sans-serif",
                      cursor: "pointer",
                      backgroundColor: activeCategory === i ? colors.accentLight : "transparent",
                      color: activeCategory === i ? colors.primary : "#999",
                      fontWeight: activeCategory === i ? "700" : "500",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {cat.category}
                  </button>
                ))
              : impactStakeholders.map((sh, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStakeholder(i)}
                    style={{
                      padding: isMobile ? "6px 12px" : "6px 16px",
                      borderRadius: "50px",
                      border: activeStakeholder === i ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                      fontSize: isMobile ? "11px" : "12px",
                      fontFamily: "Inter, sans-serif",
                      cursor: "pointer",
                      backgroundColor: activeStakeholder === i ? colors.accentLight : "transparent",
                      color: activeStakeholder === i ? colors.primary : "#999",
                      fontWeight: activeStakeholder === i ? "700" : "500",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {sh.title.split(" ")[1]}
                  </button>
                ))}
          </div>
        </div>

        {/* METRICS VIEW */}
        {view === "metrics" && (
          <div
            style={{
              backgroundColor: colors.background,
              borderRadius: "20px",
              border: `2px solid ${colors.primary}`,
              overflow: "hidden",
            }}
          >
            {currentMetrics.items.map((item, idx) => (
              <MetricRow key={idx} item={item} idx={idx} animate={animate} isMobile={isMobile} />
            ))}
          </div>
        )}

        {/* STAKEHOLDER VIEW */}
        {view === "stakeholder" && (
          <div>
            {/* Title + Stat header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "24px",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    fontFamily: "Inter, sans-serif",
                    color: colors.primary,
                  }}
                >
                  {currentStakeholder.title}
                </div>
                <div style={{ fontSize: "14px", fontFamily: "Inter, sans-serif", color: "#888" }}>
                  {currentStakeholder.subtitle}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "40px",
                    fontWeight: "700",
                    fontFamily: "Poppins, sans-serif",
                    color: colors.primary,
                    letterSpacing: "-1.5px",
                    lineHeight: "1",
                  }}
                >
                  {currentStakeholder.stat}
                </div>
                <div style={{ fontSize: "12px", fontFamily: "Inter, sans-serif", color: "#888" }}>
                  {currentStakeholder.statLabel}
                </div>
              </div>
            </div>

            {/* Outcome rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "24px" }}>
              {currentStakeholder.outcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
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
                      fontSize: "12px",
                      fontWeight: "700",
                      color: colors.primary,
                      flexShrink: 0,
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div style={{ fontSize: "15px", fontFamily: "Inter, sans-serif", color: "#333", lineHeight: "1.5" }}>
                    {outcome}
                  </div>
                </div>
              ))}
            </div>

            {/* Key Advantage strip */}
            <div
              style={{
                padding: "16px 24px",
                backgroundColor: colors.primary,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "700",
                  color: colors.accent,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                KEY ADVANTAGE
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "Inter, sans-serif",
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

// MetricRow sub-component
const MetricRow = ({ item, idx, animate, isMobile }) => {
  const count = useCounter(item.value, 1200, animate);
  const display = formatCounter(count, item);

  if (isMobile) {
    return (
      <div
        style={{
          padding: "16px 20px",
          backgroundColor: idx % 2 === 0 ? colors.white : "transparent",
          opacity: animate ? 1 : 0,
          transition: `opacity 0.4s ease ${idx * 80}ms`,
        }}
      >
        {/* Top row: Number left, ventures+trend right */}
        <div
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}
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
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
            <span
              style={{
                fontSize: "9px",
                fontWeight: "700",
                fontFamily: "Inter, sans-serif",
                color: "#aaa",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                backgroundColor: colors.background,
                padding: "3px 8px",
                borderRadius: "50px",
                whiteSpace: "nowrap",
              }}
            >
              {item.ventures}
            </span>
            <span
              style={{
                fontSize: "10px",
                fontWeight: "700",
                fontFamily: "Inter, sans-serif",
                color: colors.accent,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              {item.trend}
            </span>
          </div>
        </div>
        {/* Label + Description */}
        <div
          style={{
            fontSize: "14px",
            fontWeight: "700",
            fontFamily: "Inter, sans-serif",
            color: colors.primary,
            marginBottom: "2px",
          }}
        >
          {item.label}
        </div>
        <div style={{ fontSize: "12px", fontFamily: "Inter, sans-serif", color: "#666", lineHeight: "1.4" }}>
          {item.description}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr 260px",
        gap: "32px",
        padding: "24px 28px",
        backgroundColor: idx % 2 === 0 ? colors.white : "transparent",
        opacity: animate ? 1 : 0,
        transition: `opacity 0.4s ease ${idx * 80}ms`,
      }}
    >
      {/* Column 1: Number + Trend */}
      <div>
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
        <div
          style={{
            fontSize: "10px",
            fontWeight: "700",
            fontFamily: "Inter, sans-serif",
            color: colors.accent,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginTop: "4px",
          }}
        >
          {item.trend}
        </div>
      </div>

      {/* Column 2: Label + Description */}
      <div>
        <div
          style={{
            fontSize: "15px",
            fontWeight: "700",
            fontFamily: "Inter, sans-serif",
            color: colors.primary,
            marginBottom: "2px",
          }}
        >
          {item.label}
        </div>
        <div style={{ fontSize: "13px", fontFamily: "Inter, sans-serif", color: "#666", lineHeight: "1.5" }}>
          {item.description}
        </div>
      </div>

      {/* Column 3: Linked Ventures */}
      <div
        style={{
          backgroundColor: idx % 2 === 0 ? colors.background : "rgba(27,77,62,0.04)",
          borderRadius: "10px",
          padding: "10px 16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: "9px",
            fontWeight: "700",
            fontFamily: "Inter, sans-serif",
            color: "#aaa",
            textTransform: "uppercase",
            letterSpacing: "1px",
            marginBottom: "4px",
          }}
        >
          LINKED VENTURES
        </div>
        <div
          style={{
            fontSize: "11px",
            fontWeight: "500",
            fontFamily: "Inter, sans-serif",
            color: colors.primary,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.ventures}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// RIPPLE EFFECT SECTION (Cross-Sector Hub-and-Spoke Design)
// ============================================================================

// Hub icon for Agriculture sector
const IconSproutHub = () => (
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
    <path d="M7 20h10" />
    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
    <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
  </svg>
);

// Connected sector icons
const RippleIconBlocks = () => (
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
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
  </svg>
);
const RippleIconWallet = () => (
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
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
);
const RippleIconBattery = () => (
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
);
const RippleIconFactory = () => (
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
    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M17 18h1M12 18h1M7 18h1" />
  </svg>
);
const RippleIconTruck = () => (
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
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
  </svg>
);

const rippleSectorIcons = [RippleIconBlocks, RippleIconWallet, RippleIconBattery, RippleIconFactory, RippleIconTruck];
const rippleShortNames = ["Infra", "Financial", "Energy", "Mfg", "Transport"];

const ripplePathways = [
  {
    sectorId: 1,
    name: "Infrastructure",
    connection: "Kejetia Market wholesale outlet, rural roads, and cold storage facilities",
    multiplier: "3.8x",
    synergies: [
      "Farm-to-market road access enables aggregation hub siting",
      "Kejetia Market integration for wholesale distribution",
      "WASH infrastructure at processing facilities",
    ],
    bridgeVentures: ["Market Aggregation Centers", "Cold Storage Network"],
    impact:
      "Physical infrastructure creates the backbone for agricultural value chains — without roads, markets, and utilities, processing and storage investments cannot reach their potential.",
    pathLabel: "Agriculture → Cold Storage → Market Infrastructure",
  },
  {
    sectorId: 2,
    name: "Financial Inclusion",
    connection: "Warehouse receipt financing, mobile payments, agricultural insurance",
    multiplier: "4.2x",
    synergies: [
      "Warehouse receipts collateralize stored commodities for lending",
      "Mobile money enables transparent farmer payments",
      "Weather-indexed crop insurance reduces risk",
    ],
    bridgeVentures: ["Cooperative Capital Fund", "Digital Agricultural Lending"],
    impact:
      "Agricultural production generates the transaction volume and collateral base that makes rural financial services viable — stored grain becomes bankable assets.",
    pathLabel: "Agriculture → Stored Commodities → Financial Products",
  },
  {
    sectorId: 10,
    name: "Energy",
    connection: "Solar cold storage, biogas from agricultural waste, irrigation pumps",
    multiplier: "2.8x",
    synergies: [
      "Solar-powered cold storage operates off-grid at production zones",
      "Agricultural waste converted to biogas for processing energy",
      "Solar irrigation enables year-round production",
    ],
    bridgeVentures: ["Cold Storage Network", "Integrated Agriculture Hub"],
    impact:
      "Reliable energy transforms post-harvest outcomes — solar cold storage alone can reduce spoilage from 40% to under 5% at production zone aggregation points.",
    pathLabel: "Agriculture → Agri-Waste → Renewable Energy",
  },
  {
    sectorId: 11,
    name: "Manufacturing",
    connection: "Food processing, packaging, equipment production",
    multiplier: "3.5x",
    synergies: [
      "Raw agricultural output becomes manufactured food products",
      "Quality packaging enables domestic retail and export channels",
      "Local equipment assembly reduces import dependence",
    ],
    bridgeVentures: ["Coconut Processing Hub", "Tomato Processing"],
    impact:
      "Processing transforms agriculture from commodity export to manufactured goods — capturing 3-5x more value per unit of raw production.",
    pathLabel: "Agriculture → Processing → Manufactured Goods",
  },
  {
    sectorId: 12,
    name: "Transportation",
    connection: "Cold chain logistics, last-mile delivery, export corridors",
    multiplier: "2.5x",
    synergies: [
      "Temperature-controlled transport preserves product quality",
      "Last-mile pickup from farm gates to aggregation points",
      "Export corridor access to ports and regional borders",
    ],
    bridgeVentures: ["Cold Storage Network", "Market Aggregation Centers"],
    impact:
      "Transport logistics determine whether agricultural value is captured or lost — every hour of delay without cold chain costs measurable quality degradation.",
    pathLabel: "Agriculture → Cold Chain → Market Delivery",
  },
];

const RippleEffectSection = () => {
  const isMobile = useIsMobile();
  const [activeNode, setActiveNode] = useState(null);
  const [showMoreRipple, setShowMoreRipple] = useState(false);

  const handleNodeClick = (idx) => {
    setActiveNode(activeNode === idx ? null : idx);
    setShowMoreRipple(false);
  };

  return (
    <section
      style={{
        backgroundColor: colors.primary,
        padding: isMobile ? "60px 20px" : "100px 80px",
        overflow: "visible",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Pill */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
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
            }}
          >
            The Ripple Effect
          </span>
        </div>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "28px" : "42px",
            fontWeight: "300",
            lineHeight: "1.2",
            letterSpacing: "-0.5px",
            color: colors.white,
            textAlign: "center",
            margin: "0 auto 16px",
            maxWidth: "820px",
          }}
        >
          How Agriculture <span style={{ color: colors.accent, fontWeight: "600" }}>Amplifies Impact</span>
        </h2>

        {/* Subheading */}
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "16px",
            lineHeight: "1.65",
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            maxWidth: "680px",
            margin: "0 auto 48px",
          }}
        >
          Agriculture connects to five other BRIDGE sectors, creating multiplier effects that no single-sector approach
          can achieve.
        </p>

        {/* Icon Pathway */}
        {isMobile ? (
          /* Mobile: Hub on top, 5 icons below */
          <div
            style={{
              marginBottom: "24px",
              position: "sticky",
              top: "72px",
              zIndex: 10,
              backgroundColor: colors.primary,
              paddingTop: "12px",
              paddingBottom: "12px",
              marginLeft: "-20px",
              marginRight: "-20px",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            {/* Hub icon */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "16px" }}>
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
                }}
              >
                <IconSproutHub />
              </div>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "10px",
                  fontWeight: "700",
                  color: colors.accent,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginTop: "6px",
                }}
              >
                AGRICULTURE
              </span>
            </div>
            {/* 5 sector icons */}
            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
              {ripplePathways.map((pathway, idx) => {
                const isActive = activeNode === idx;
                const Icon = rippleSectorIcons[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => handleNodeClick(idx)}
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
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Icon />
                    </div>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "10px",
                        fontWeight: "600",
                        color: isActive ? colors.white : "rgba(255,255,255,0.5)",
                        marginTop: "6px",
                        maxWidth: "58px",
                        lineHeight: "1.2",
                        textAlign: "center",
                      }}
                    >
                      {rippleShortNames[idx]}
                    </span>
                  </div>
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
            {/* Hub icon */}
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
                <IconSproutHub />
              </div>
              {isMobile && (
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: colors.white,
                    textAlign: "center",
                  }}
                >
                  Agriculture
                </span>
              )}
            </div>

            {/* 5 sector nodes */}
            {ripplePathways.map((pathway, idx) => {
              const isActive = activeNode === idx;
              const Icon = rippleSectorIcons[idx];
              return (
                <div
                  key={idx}
                  onClick={() => handleNodeClick(idx)}
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
                    <Icon />
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
                    {pathway.name}
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
                    {pathway.multiplier}
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
          {activeNode === null ? (
            /* Default state */
            isMobile ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.5)" }}>
                  Tap a sector above to explore how agriculture amplifies its impact
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
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
                  {ripplePathways.map((p, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveNode(i)}
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
                          height: "40px",
                          overflow: "hidden",
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
            /* Active state */
            <div>
              {/* Breadcrumb */}
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px", alignItems: "center" }}
              >
                {ripplePathways[activeNode].pathLabel.split(" → ").map((seg, si, arr) => (
                  <React.Fragment key={si}>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        fontWeight: si === 0 ? "700" : "500",
                        color: si === 0 ? colors.accent : "rgba(255,255,255,0.7)",
                        backgroundColor: si === 0 ? "rgba(184, 217, 53, 0.15)" : "rgba(255,255,255,0.05)",
                        padding: "6px 14px",
                        borderRadius: "50px",
                      }}
                    >
                      {seg}
                    </span>
                    {si < arr.length - 1 && <span style={{ color: colors.accent, fontSize: "14px" }}>→</span>}
                  </React.Fragment>
                ))}
              </div>

              {/* 3-column detail grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                  gap: isMobile ? "24px" : "32px",
                }}
              >
                {/* Column 1: Why It Matters */}
                <div>
                  <div
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
                  </div>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "15px",
                      color: "rgba(255,255,255,0.7)",
                      lineHeight: "1.6",
                      marginBottom: "20px",
                    }}
                  >
                    {ripplePathways[activeNode].impact}
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
                      {ripplePathways[activeNode].multiplier}
                    </span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                      value multiplier
                    </span>
                  </div>
                </div>

                {/* Column 2: Synergy Pathways (collapsible on mobile) */}
                {(!isMobile || showMoreRipple) && (
                  <div>
                    <div
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
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {ripplePathways[activeNode].synergies.map((syn, si) => (
                        <div
                          key={si}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "12px 16px",
                            borderRadius: "10px",
                            backgroundColor: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            overflow: "hidden",
                          }}
                        >
                          <span style={{ color: colors.accent, fontSize: "8px", flexShrink: 0 }}>●</span>
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "14px",
                              color: "rgba(255,255,255,0.75)",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {syn}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Column 3: Linked Ventures (collapsible on mobile) */}
                {(!isMobile || showMoreRipple) && (
                  <div>
                    <div
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
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {ripplePathways[activeNode].bridgeVentures.map((v, vi) => (
                        <div
                          key={vi}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "rgba(184, 217, 53, 0.1)",
                            border: "1px solid rgba(184, 217, 53, 0.15)",
                            padding: "14px 18px",
                            borderRadius: "12px",
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
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: colors.accent,
                        textDecoration: "none",
                        marginTop: "20px",
                      }}
                    >
                      Explore {ripplePathways[activeNode].name} Sector <span>→</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile toggle */}
              {isMobile && activeNode !== null && (
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
                    style={{
                      transform: showMoreRipple ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
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
// INVESTMENT THESIS SECTION (Audience-Segmented Design)
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
const investmentTabs = [
  { key: "returns", label: "Returns" },
  { key: "timeline", label: "Timeline" },
  { key: "impact", label: "Impact" },
];

const investmentTabContent = {
  returns: [
    {
      label: "Tier 1 Ventures",
      value: "15-22%",
      detail: "Tomato processing and cold storage with proven demand and rapid revenue generation",
    },
    {
      label: "Tier 2 Ventures",
      value: "12-18%",
      detail: "Warehouse receipt systems and digital lending with longer build-out but strong fundamentals",
    },
    {
      label: "Portfolio IRR",
      value: "12-22%",
      detail: "Blended returns across 18 agriculture ventures with risk-adjusted first-loss protection",
    },
    {
      label: "Dev. Leverage",
      value: "3-5x",
      detail: "Every dollar deployed generates $3-5 in local agricultural economic multiplier activity",
    },
  ],
  timeline: [
    {
      label: "Phase 1 (Q1-Q2)",
      value: "Foundation",
      detail: "Coconut processing hub site, cooperative engagement, and cold storage pilot deployment",
    },
    {
      label: "Phase 2 (Q3-Q4)",
      value: "Scale",
      detail: "Warehouse receipt system launch, tomato processing commissioning, and AgTech portfolio",
    },
    {
      label: "Phase 3 (2027+)",
      value: "Expansion",
      detail: "Replication across production zones, cassava processing, and export channel development",
    },
    {
      label: "Exit Horizon",
      value: "5-7 yrs",
      detail: "Staged liquidity via asset sales, offtake renewals, or processing facility recapitalization",
    },
  ],
  impact: [
    {
      label: "Farmers Served",
      value: "25K+",
      detail: "Direct beneficiaries accessing improved storage, processing, and fair market pricing",
    },
    {
      label: "Jobs Created",
      value: "500+",
      detail: "Direct employment in processing facilities, cold storage operations, and logistics",
    },
    {
      label: "Loss Reduction",
      value: "15%→5%",
      detail: "Post-harvest spoilage reduced through cold chain and proper storage infrastructure",
    },
    {
      label: "Income Increase",
      value: "40-60%",
      detail: "Farmer income growth through value capture, fair pricing, and market access",
    },
  ],
};

const investmentAudiences = [
  {
    key: "entrepreneur",
    label: "Entrepreneur",
    shortLabel: "Founder",
    icon: <IconStorefront />,
    headline: "Build Agricultural Ventures That Feed Communities",
    pitch:
      "BRIDGE provides validated venture models, cooperative partnerships, and working capital strategies so you can launch agricultural processing and logistics businesses with clear market entry.",
    stats: [
      { value: "18", label: "Venture Paths", detail: "validated models" },
      { value: "5.6M", label: "Farmer Base", detail: "addressable market" },
      { value: "Full", label: "BRIDGE Support", detail: "incubation to scale" },
    ],
    pathways: [
      {
        bring: "Agricultural knowledge & local relationships",
        get: "BRIDGE provides venture blueprints, cooperative partnerships, and go/no-go frameworks",
      },
      {
        bring: "Operational capacity & execution commitment",
        get: "Access to cold storage assets, processing equipment, and working capital facilities",
      },
      {
        bring: "Community trust & farmer engagement",
        get: "Technical assistance, quality systems, and market access through BRIDGE aggregation",
      },
    ],
  },
  {
    key: "business",
    label: "Business Entity",
    shortLabel: "Business",
    icon: <IconOfficeBuilding />,
    headline: "Anchor Your Supply Chain in Ghana's Agriculture",
    pitch:
      "Partner with BRIDGE to secure reliable agricultural supply chains — from raw material sourcing through to processed product delivery — while contributing to measurable food security outcomes.",
    stats: [
      { value: "$12-22M", label: "Capital Range", detail: "across 18 ventures" },
      { value: "8-12%", label: "Cash Yield", detail: "annual distribution" },
      { value: "25K+", label: "Farmer Network", detail: "sourcing base" },
    ],
    pathways: [
      {
        bring: "Offtake commitments & volume guarantees",
        get: "Priority access to processed agricultural products and preferential pricing",
      },
      {
        bring: "Technical expertise & processing equipment",
        get: "Co-development opportunities in processing and value-added manufacturing",
      },
      {
        bring: "Corporate social responsibility alignment",
        get: "Impact reporting, ESG metrics, and community engagement documentation",
      },
    ],
  },
  {
    key: "investor",
    label: "Investor",
    shortLabel: "Investor",
    icon: <IconTrendingUp />,
    headline: "Agricultural Assets With Strong Impact Returns",
    pitch:
      "Deploy capital into physical agricultural processing and storage assets with transparent governance structures, compounding revenue streams, and measurable development outcomes.",
    stats: [
      { value: "12-22%", label: "Target IRR", detail: "blended portfolio" },
      { value: "3-5x", label: "Multiple", detail: "capital appreciation" },
      { value: "12-18mo", label: "First Cash", detail: "revenue timeline" },
    ],
    pathways: [
      {
        bring: "Growth capital & patient deployment",
        get: "Asset-backed returns with processing facilities as collateral and clear exit paths",
      },
      {
        bring: "Sector expertise & strategic guidance",
        get: "Board participation, portfolio oversight, and co-investment opportunities",
      },
      {
        bring: "Network access & deal flow",
        get: "First-look rights on expansion ventures and geographic replication opportunities",
      },
    ],
  },
  {
    key: "government",
    label: "Government",
    shortLabel: "Gov't",
    icon: <IconLandmark />,
    headline: "Deliver Agricultural Goals Without Fiscal Strain",
    pitch:
      "BRIDGE ventures align directly with Grow24 agricultural priorities — delivering processing, storage, and market infrastructure through private capital while creating rural employment.",
    stats: [
      { value: "500+", label: "Jobs Created", detail: "direct employment" },
      { value: "95%", label: "Private Capital", detail: "no fiscal burden" },
      { value: "3-5x", label: "Tax Multiplier", detail: "economic activity" },
    ],
    pathways: [
      {
        bring: "Policy alignment & Grow24 framework",
        get: "Private agricultural infrastructure that meets food security and processing targets",
      },
      {
        bring: "Land access & cooperative facilitation",
        get: "Job creation, tax revenue expansion, and import substitution progress",
      },
      {
        bring: "Community endorsement & legitimacy",
        get: "Transparent reporting on development outcomes and constituency impact data",
      },
    ],
  },
];

const InvestmentThesisSection = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("returns");
  const [activeAudience, setActiveAudience] = useState(0);
  const [showInvestmentDetails, setShowInvestmentDetails] = useState(false);

  const aud = investmentAudiences[activeAudience];

  return (
    <section
      style={{
        backgroundColor: colors.background,
        padding: isMobile ? "60px 20px" : "100px 80px",
        overflow: "visible",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Section Header + Audience — sticky on mobile */}
        <div
          style={
            isMobile
              ? {
                  position: "sticky",
                  top: "72px",
                  zIndex: 10,
                  backgroundColor: colors.background,
                  paddingTop: "12px",
                  paddingBottom: "8px",
                  marginLeft: "-20px",
                  marginRight: "-20px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }
              : {}
          }
        >
          <div style={{ textAlign: isMobile ? "center" : "left", marginBottom: isMobile ? "16px" : "48px" }}>
            <span
              style={{
                display: "inline-block",
                backgroundColor: colors.white,
                border: `1px solid ${colors.line}`,
                color: colors.primary,
                padding: isMobile ? "8px 16px" : "10px 20px",
                borderRadius: "50px",
                fontSize: "11px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontFamily: "Inter, sans-serif",
                marginBottom: isMobile ? "12px" : "24px",
              }}
            >
              The Investment Thesis
            </span>

            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? "22px" : "42px",
                fontWeight: "300",
                lineHeight: "1.2",
                letterSpacing: "-0.5px",
                color: colors.primary,
                margin: isMobile ? "0 auto 8px" : "0 0 16px",
                maxWidth: "820px",
              }}
            >
              Every Stakeholder Has a Role in{" "}
              <span style={{ color: colors.accent, fontWeight: "600" }}>Ghana's Agricultural Renaissance</span>
            </h2>

            {!isMobile && (
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "16px",
                  color: "#666",
                  lineHeight: "1.65",
                  margin: "0",
                  maxWidth: "700px",
                }}
              >
                Investment isn't only capital — it's expertise, partnerships, policy, and vision. See how your role
                contributes to 18 ventures across $12-22M in opportunity.
              </p>
            )}
          </div>

          {/* Audience Selector */}
          {isMobile ? (
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "12px" }}>
              {investmentAudiences.map((a, idx) => {
                const isActive = activeAudience === idx;
                return (
                  <button
                    key={a.key}
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
                      {a.icon}
                    </div>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "10px",
                        fontWeight: "600",
                        color: colors.primary,
                      }}
                    >
                      {a.shortLabel}
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
                flexWrap: "wrap",
              }}
            >
              {investmentAudiences.map((a, idx) => {
                const isActive = activeAudience === idx;
                return (
                  <button
                    key={a.key}
                    onClick={() => setActiveAudience(idx)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 24px",
                      borderRadius: "50px",
                      border: isActive ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                      backgroundColor: isActive ? colors.accentLight : "transparent",
                      color: isActive ? colors.primary : "#999",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: isActive ? "700" : "500",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        color: isActive ? colors.primary : "#999",
                        transition: "all 0.25s ease",
                      }}
                    >
                      {a.icon}
                    </span>
                    {a.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Two-column content */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "24px" : "48px",
            alignItems: "stretch",
            overflow: "hidden",
          }}
        >
          {/* LEFT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
            {/* Headline + Pitch (desktop only) */}
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
                {aud.headline}
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
                {aud.pitch}
              </p>
            )}

            {/* Stat cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: isMobile ? "8px" : "12px",
                marginBottom: "24px",
                width: "100%",
              }}
            >
              {aud.stats.map((stat, idx) => (
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
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "20px",
                width: "100%",
                overflow: "hidden",
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
              {aud.pathways.map((path, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    backgroundColor: colors.white,
                    borderRadius: "10px",
                    border: `1px solid ${colors.line}`,
                    overflow: "hidden",
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
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: colors.primary,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      flexShrink: 0,
                      maxWidth: "45%",
                    }}
                  >
                    {path.bring}
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      color: "#777",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      flex: 1,
                    }}
                  >
                    {path.get}
                  </div>
                </div>
              ))}
            </div>

            {/* Validation bar */}
            <div
              style={{
                padding: "14px 18px",
                backgroundColor: "rgba(27, 77, 62, 0.06)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                width: "100%",
                boxSizing: "border-box",
                overflow: "hidden",
              }}
            >
              <div style={{ color: colors.primary, flexShrink: 0, display: "flex" }}>
                <IconCheck />
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  color: "#444",
                  lineHeight: "1.5",
                  whiteSpace: isMobile ? "nowrap" : "normal",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <strong style={{ color: colors.primary }}>MoFA</strong>
                {isMobile ? " · Planting for Food & Jobs" : " supporting Planting for Food & Jobs objectives"}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Green panel */}
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
              {/* Tab selector */}
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
                {investmentTabs.map((tab) => (
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

              {/* Tab content cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                {investmentTabContent[activeTab].map((item, idx) => {
                  const isTextValue =
                    isNaN(item.value.charAt(0)) && !item.value.includes("%") && !item.value.includes("x");
                  return (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.05)",
                        borderRadius: "12px",
                        padding: isMobile ? "16px" : "18px 20px",
                        display: "flex",
                        gap: "16px",
                        alignItems: "center",
                        flex: 1,
                        minHeight: isMobile ? "auto" : "0",
                      }}
                    >
                      <div style={{ minWidth: isMobile ? "80px" : "100px", flexShrink: 0 }}>
                        <div
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: isTextValue ? (isMobile ? "17px" : "19px") : isMobile ? "20px" : "22px",
                            fontWeight: "700",
                            color: colors.accent,
                            lineHeight: "1.1",
                            whiteSpace: "nowrap",
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
                          minWidth: 0,
                        }}
                      >
                        {item.detail}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Prospectus bar */}
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

          {/* Mobile toggle */}
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
        </div>
      </div>
    </section>
  );
};

// FINAL CTA SECTION
// ============================================================================

const FinalCTASection = () => {
  const isMobile = useIsMobile();
  return (
    <section
      style={{
        backgroundColor: colors.primary,
        padding: isMobile ? "60px 20px" : "100px 80px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
        {/* Pill — dark variant (on green) */}
        <div
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "50px",
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "2px",
            color: colors.accent,
            fontFamily: "Inter, sans-serif",
            textTransform: "uppercase",
            marginBottom: "24px",
          }}
        >
          Be Part of the Journey
        </div>

        <h2
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "32px" : "42px",
            fontWeight: "300",
            lineHeight: "1.2",
            letterSpacing: "-0.5px",
            color: colors.white,
            margin: "0 0 20px 0",
            maxWidth: "900px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Ready to Grow Ghana's <span style={{ color: colors.accent, fontWeight: "600" }}>Agricultural Future?</span>
        </h2>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "15px" : "16px",
            lineHeight: "1.65",
            color: "rgba(255,255,255,0.6)",
            margin: "0 0 40px 0",
            maxWidth: "680px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Whether you're an investor, partner, or government stakeholder, there's a role for you in transforming food
          systems.
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
          }}
        >
          <button
            className="cta-lime-swap"
            style={{
              backgroundColor: colors.accent,
              color: colors.primary,
              border: "none",
              padding: isMobile ? "16px 24px" : "16px 28px",
              borderRadius: "50px",
              fontSize: "15px",
              fontWeight: "600",
              fontFamily: "Inter, sans-serif",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              width: isMobile ? "100%" : "auto",
            }}
          >
            Start a Conversation
            <span
              className="cta-btn-arrow"
              style={{
                width: "36px",
                height: "36px",
                backgroundColor: colors.white,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </span>
          </button>

          <button
            className="cta-secondary"
            style={{
              backgroundColor: "transparent",
              color: "rgba(255,255,255,0.7)",
              border: "1.5px solid rgba(255,255,255,0.2)",
              padding: "14px 28px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: "600",
              fontFamily: "Inter, sans-serif",
              cursor: "pointer",
              transition: "all 0.3s ease",
              width: isMobile ? "100%" : "auto",
            }}
          >
            Download Sector Brief
          </button>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// FOOTER COMPONENTS
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
// SOCIAL ICONS
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

// ============================================================================
// FOOTER
// ============================================================================

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

export default function AgricultureSectorPageIntegrated() {
  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        margin: 0,
        padding: 0,
        backgroundColor: colors.white,
        overflowX: "clip",
      }}
    >
      {/* Google Fonts — includes Inter 300 weight for light headlines */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Poppins:wght@700;800&display=swap"
        rel="stylesheet"
      />

      {/* Design System CSS Classes */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        .cta-btn-arrow { transition: background-color 0.3s ease; }
        .cta-btn-arrow svg { transition: stroke 0.3s ease; }
        .cta-primary { transition: all 0.3s ease; }
        .cta-lime-swap { transition: all 0.3s ease; }
        .cta-secondary { transition: all 0.3s ease; }
        .value-card {
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Header />
      <HeroSection sector={sectorData} />
      <OpportunitySection />

      {/* ★ THE PROCESS - Value Chain Section ★ */}
      <ValueChainSectionPremium />

      <SolutionsSection sector={sectorData} />
      <CompetitiveLandscapeSection sector={sectorData} />
      <GovernancePolicySection />
      <ImpactDashboardSection />
      <RippleEffectSection />
      <InvestmentThesisSection />
      <FinalCTASection />

      <Footer />
    </div>
  );
}
