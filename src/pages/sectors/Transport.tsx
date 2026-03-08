import React, { useState, useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// ============================================================================
// BRIDGE SECTOR PAGE: Transportation & Logistics
// FINAL — Design System, Tone & Voice, Pill Badges, Hover Classes,
//         Governance Widget, Ripple Widget, Investment Thesis, Impact Dashboard
// ============================================================================
// Design System: Dark Green #1B4D3E, Lime #B8D935, Off-white #F3F5F2
// Reference: BRIDGE_Design_System_Handoff.md
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
// SECTOR DATA - Transportation & Logistics (Tone & Voice Aligned)
// ============================================================================

const sectorData = {
  id: 12,
  slug: "transportation",
  name: "Transportation & Logistics",
  shortName: "Transportation",
  category: "Enabling Infrastructure",
  categoryColor: "#1B4D3E",
  capitalRange: "$14-26M",

  ventures: 19,
  jobsImpact: "100K+ operators",
  gdpContribution: "~6%",
  problemHeadline: "Connecting Producers to Prosperity",
  problemSubheadline:
    "Road transport powers 97% of Ghana\u2019s movement \u2014 a sector with extraordinary potential. $1.9 billion in annual value is ready to be recaptured through cold chain expansion, the 80% of fleet operators represent a massive formalization opportunity, and 9\u00D7 logistics cost differentials signal room for transformative efficiency gains.",
  keyStats: [
    { value: "$1.9B", label: "Post-Harvest Value to Recapture", detail: "Annual value lost across the chain" },
    { value: "9\u00D7", label: "Logistics Efficiency Potential", detail: "Cost differential vs regional benchmarks" },
    { value: "97%", label: "Road Transport Share", detail: "Dominant mode for goods and people" },
    { value: "80%+", label: "Fleet Operators to Formalize", detail: "Running fewer than 5 trucks each" },
  ],
  solutions: [
    {
      tier: 1,
      group: "coldchain",
      name: "Cold Chain Ghana",
      description:
        "Solar-powered cold storage at production zone aggregation points with IoT monitoring and mobile money pay-per-use access for farmers.",
      capital: "$2-3M",
      score: 41,
      impact: "Recapturing $1.9B in annual post-harvest value",
      icon: "snowflake",
    },
    {
      tier: 1,
      group: "delivery",
      name: "Logistics Training Academy",
      description:
        "Technical training for cold chain technicians, fleet managers, and logistics coordinators through structured TVET partnership programmes.",
      capital: "$500K-1M",
      score: 41,
      impact: "Building the workforce powering sector growth",
      icon: "graduation",
    },
    {
      tier: 1,
      group: "fleet",
      name: "Fleet Management Services",
      description:
        "Comprehensive fleet management for small operators including telematics, preventive maintenance scheduling, and fuel cost monitoring.",
      capital: "$1-2M",
      score: 40,
      impact: "Modernizing operations for 80% of fleet owners",
      icon: "tools",
    },
    {
      tier: 1,
      group: "delivery",
      name: "Last-Mile Delivery Platform",
      description:
        "Technology-enabled delivery using motorcycles, tricycles, and vans optimized for peri-urban and rural destination networks across Ghana.",
      capital: "$1-2M",
      score: 39,
      impact: "Connecting 60%+ of the population to delivery",
      icon: "box",
    },
    {
      tier: 1,
      group: "fleet",
      name: "Load Matching Platform",
      description:
        "Digital marketplace connecting shippers with truckers through real-time availability, route optimization, and integrated payment tools.",
      capital: "$500K-1M",
      score: 39,
      impact: "Driving 30-50% efficiency through optimization",
      icon: "phone",
    },
    {
      tier: 1,
      group: "delivery",
      name: "Agricultural Collection Network",
      description:
        "Scheduled collection services linking smallholder farmers to aggregation points and regional markets with predictable timing and routes.",
      capital: "$1-2M",
      score: 39,
      impact: "Predictable logistics for 5.6M farming families",
      icon: "truck",
    },
    {
      tier: 2,
      group: "coldchain",
      name: "Pharmaceutical Cold Chain",
      description:
        "GDP-compliant temperature-controlled logistics for vaccines, medicines, and medical supplies with validated monitoring across Ghana.",
      capital: "$1-2M",
      score: 37,
      impact: "Improving vaccine integrity by up to 25%",
      icon: "shield",
    },
    {
      tier: 2,
      group: "fleet",
      name: "Vehicle Asset Financing",
      description:
        "Structured asset-backed lending with telematics-enabled performance monitoring, enabling fleet expansion for growth-ready small operators.",
      capital: "$1-2M",
      score: 36,
      impact: "Enabling fleet expansion for qualified operators",
      icon: "dollar",
    },
    {
      tier: 2,
      group: "coldchain",
      name: "Warehousing Company",
      description:
        "Modern warehousing with digital inventory management systems serving retail, manufacturing, and the growing e-commerce distribution sector.",
      capital: "$1-2M",
      score: 36,
      impact: "Modern storage for retail, manufacturing, trade",
      icon: "warehouse",
    },
  ],
  competitors: [
    {
      name: "DHL / Maersk",
      focus: "Global logistics & shipping",
      gap: "SME and rural logistics segment available for complementary coverage",
      year: "Global",
      funding: "MNC",
      priority: "Low",
      strengths: [
        { name: "Global Network", rating: 5 },
        { name: "Technology", rating: 5 },
        { name: "Cold Chain", rating: 4 },
      ],
      gaps: ["SME market segment", "Rural logistics expansion", "Smallholder integration"],
      bridgeOpportunity: "Complementary coverage for the informal sector and smallholders",
    },
    {
      name: "Truckers Ghana",
      focus: "Digital truck booking",
      gap: "Opportunity for broader informal operator onboarding",
      year: "2020",
      funding: "Seed",
      priority: "High",
      strengths: [
        { name: "First Mover", rating: 4 },
        { name: "Union Partnerships", rating: 4 },
        { name: "Digital Platform", rating: 3 },
      ],
      gaps: ["Adoption acceleration", "Accessibility features", "Feature expansion"],
      bridgeOpportunity: "Platform partnership or complementary fleet services",
    },
    {
      name: "FreezeLink",
      focus: "Third-party cold chain",
      gap: "Scale expansion and geographic coverage opportunity",
      year: "2021",
      funding: "Early",
      priority: "High",
      strengths: [
        { name: "Cold Chain Vision", rating: 4 },
        { name: "Integrated Model", rating: 4 },
        { name: "Engineering", rating: 3 },
      ],
      gaps: ["Scale expansion", "Geographic reach", "Capital partnership"],
      bridgeOpportunity: "Cold chain expansion co-investment partner",
    },
    {
      name: "Farmerline",
      focus: "Agricultural supply chain",
      gap: "Cold chain and fleet integration opportunity",
      year: "2013",
      funding: "$14.4M+",
      priority: "Medium",
      strengths: [
        { name: "Farmer Network", rating: 5 },
        { name: "Warehousing", rating: 4 },
        { name: "Quality Control", rating: 4 },
      ],
      gaps: ["Cold chain integration", "Fleet service expansion", "Distribution logistics"],
      bridgeOpportunity: "Agricultural logistics integration partner",
    },
    {
      name: "Gigmile",
      focus: "Fleet management technology",
      gap: "SME segment and informal operator onboarding",
      year: "2019",
      funding: "Seed",
      priority: "Medium",
      strengths: [
        { name: "Telematics", rating: 4 },
        { name: "Fuel Monitoring", rating: 4 },
        { name: "Driver Mgmt", rating: 3 },
      ],
      gaps: ["SME accessibility", "Informal operator tools", "Rural coverage"],
      bridgeOpportunity: "Technology partner for informal fleet formalization",
    },
    {
      name: "Hubtel",
      focus: "Delivery & payments platform",
      gap: "Rural and agricultural market expansion",
      year: "2005",
      funding: "Established",
      priority: "Low",
      strengths: [
        { name: "Payments Integration", rating: 5 },
        { name: "Last-Mile Urban", rating: 4 },
        { name: "Merchant Network", rating: 4 },
      ],
      gaps: ["Rural market access", "Agricultural integration", "Peri-urban expansion"],
      bridgeOpportunity: "Payment integration for rural delivery platform",
    },
  ],
  policyAlignment: [
    {
      policy: "Connect24 Pillar",
      allocation: "Flagship Initiative",
      alignment:
        "Direct alignment \u2014 the 24-hour economy vision requires 24-hour logistics; BRIDGE ventures support this through round-the-clock cold chain and fleet services",
    },
    {
      policy: "Railway Master Plan",
      allocation: "$21.5B (4,007 km)",
      alignment:
        "Multimodal integration services positioned alongside expanding rail network for complementary logistics coverage",
    },
    {
      policy: "Boankra Inland Port",
      allocation: "Phase 1: 80%+ complete",
      alignment: "Integrated logistics services ready to support port operations and inland distribution",
    },
    {
      policy: "Volta Economic Corridor",
      allocation: "Multi-year programme",
      alignment: "Logistics infrastructure serving corridor economic development and cross-border trade facilitation",
    },
  ],
  relatedSectors: [
    {
      id: 6,
      name: "Agriculture & Value Chains",
      icon: "wheat",
      reason: "Cold chain, farm-to-market logistics, post-harvest value recapture",
    },
    { id: 3, name: "Health Systems", icon: "heart", reason: "Pharmaceutical cold chain, vaccine distribution" },
    { id: 11, name: "Manufacturing", icon: "factory", reason: "Supply chains, distribution, precision delivery" },
  ],
};

// ============================================================================
// PREMIUM VALUE CHAIN DATA (Tone & Voice Aligned)
// ============================================================================

const valueChainStages = [
  {
    id: 1,
    stage: "Production & Shipping",
    shortLabel: "Production",
    actor: "Producers & Shippers",
    population: "5.6M+ farmers, exporters",
    icon: "package",
    valueRetained: 100,
    valueLost: 0,
    opportunities: [
      "Post-harvest value recapture",
      "Farm-level cold storage deployment",
      "Transport cost optimization",
      "Scheduling and predictability",
    ],
    stat: "$1.9B recapture potential",
    color: colors.accent,
  },
  {
    id: 2,
    stage: "Freight Transport",
    shortLabel: "Freight",
    actor: "Truckers & Fleet Owners",
    population: "80% own <5 trucks",
    icon: "truck",
    valueRetained: 70,
    valueLost: 30,
    opportunities: [
      "30-50% load optimization potential",
      "Fleet financing and expansion",
      "Digital management tools",
      "Road infrastructure coordination",
    ],
    stat: "97% road transport share",
    color: colors.ctaGreen,
  },
  {
    id: 3,
    stage: "Storage & Handling",
    shortLabel: "Storage",
    actor: "Warehouses & Cold Chain",
    population: "2% producer coverage",
    icon: "warehouse",
    valueRetained: 50,
    valueLost: 20,
    opportunities: [
      "Cold chain geographic expansion",
      "Solar power integration",
      "Technician workforce development",
      "Investment-ready facilities",
    ],
    stat: "$900M addressable market",
    color: colors.primary,
  },
  {
    id: 4,
    stage: "Distribution",
    shortLabel: "Distribution",
    actor: "Last-Mile & Delivery",
    population: "Urban platforms ready to scale",
    icon: "route",
    valueRetained: 35,
    valueLost: 15,
    opportunities: [
      "Rural delivery network buildout",
      "Supply chain coordination platforms",
      "Aggregation point development",
      "All-season access solutions",
    ],
    stat: "60%+ rural market to connect",
    color: colors.ctaGreen,
  },
  {
    id: 5,
    stage: "End Market",
    shortLabel: "Market",
    actor: "Traders, Consumers, Exporters",
    population: "32M+ consumers",
    icon: "market",
    valueRetained: 25,
    valueLost: 10,
    opportunities: [
      "Price stabilization through supply chain efficiency",
      "Inventory freshness and quality",
      "Supply predictability platforms",
      "Cross-border trade facilitation",
    ],
    stat: "9\u00D7 efficiency opportunity",
    color: colors.primary,
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
const IconLightbulb = () => (
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
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);

const IconWheat = () => (
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
    <path d="M2 22L16 8" />
    <path d="M3.47 12.53L5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z" />
    <path d="M7.47 8.53L9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z" />
    <path d="M11.47 4.53L13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z" />
    <path d="M20 2l2 2" />
    <path d="M17.5 9.5L22 5" />
  </svg>
);
const IconHeart = () => (
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
const IconAnchor = () => (
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
    <circle cx="12" cy="5" r="3" />
    <line x1="12" y1="22" x2="12" y2="8" />
    <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
  </svg>
);
const IconTrain = () => (
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
    <rect x="4" y="3" width="16" height="16" rx="2" />
    <path d="M4 11h16" />
    <path d="M12 3v8" />
    <path d="m8 19-2 3" />
    <path d="m18 22-2-3" />
    <path d="M8 15h0M16 15h0" />
  </svg>
);
const IconWarehouse = () => (
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
);

const IconSnowflake = () => (
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
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="12" y1="2" x2="12" y2="22" />
    <path d="m20 16-4-4 4-4" />
    <path d="m4 8 4 4-4 4" />
    <path d="m16 4-4 4-4-4" />
    <path d="m8 20 4-4 4 4" />
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
const IconTools = () => (
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
const IconBox = () => (
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
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
  </svg>
);
const IconPhone = () => (
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
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <path d="M12 18h.01" />
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
const IconDollar = () => (
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
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const solutionIcons = {
  snowflake: <IconSnowflake />,
  graduation: <IconGraduation />,
  tools: <IconTools />,
  box: <IconBox />,
  phone: <IconPhone />,
  truck: <IconTruck />,
  shield: <IconShield />,
  dollar: <IconDollar />,
  warehouse: <IconWarehouse />,
};

const valueChainIcons = {
  package: (
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
      <path d="M16.5 9.4 7.55 4.24" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" y1="22" x2="12" y2="12" />
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
  route: (
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
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  ),
  market: (
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
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7" />
    </svg>
  ),
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

export default function TransportationLogisticsSectorPage() {
  const isMobile = useIsMobile();
  return (
    <div style={{ fontFamily: "Inter, sans-serif", margin: 0, padding: 0, backgroundColor: colors.white, overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Poppins:wght@700;800&display=swap" rel="stylesheet" />
      <style>{`*, *::before, *::after { box-sizing: border-box; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
      <SiteHeader />
      <section style={{ backgroundColor: colors.primary, padding: isMobile ? "100px 20px 80px" : "140px 80px 100px", minHeight: "60vh", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(184,217,53,0.12)", border: "1px solid rgba(184,217,53,0.3)", borderRadius: 50, padding: "8px 18px", marginBottom: 28 }}>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: colors.accent }}>{sectorData.category}</span>
          </div>
          <h1 style={{ fontFamily: "'Poppins',sans-serif", fontSize: isMobile ? 36 : 64, fontWeight: 700, color: colors.white, margin: "0 0 24px", lineHeight: 1.1, maxWidth: 800 }}>{sectorData.name}</h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: isMobile ? 16 : 20, color: "rgba(255,255,255,0.75)", maxWidth: 640, lineHeight: 1.7, margin: "0 0 40px" }}>{sectorData.problemSubheadline}</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {sectorData.keyStats?.map((stat, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "20px 24px", minWidth: 160 }}>
                <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 28, fontWeight: 700, color: colors.accent }}>{stat.value}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "80px 80px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: isMobile ? 28 : 40, fontWeight: 700, color: colors.primary, marginBottom: 40 }}>Key Challenges</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: 24 }}>
            {sectorData.painPoints?.map((p, i) => (
              <div key={i} style={{ background: "#F3F5F2", borderRadius: 16, padding: 28, border: "1px solid #DEDEDE" }}>
                <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, fontWeight: 700, color: colors.primary, margin: "0 0 12px" }}>{p.title}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: "#4B5563", lineHeight: 1.65, margin: 0 }}>{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ backgroundColor: colors.primary, padding: isMobile ? "60px 20px" : "80px 80px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: isMobile ? 28 : 40, fontWeight: 700, color: colors.white, marginBottom: 16 }}>Ready to Build in {sectorData.shortName}?</h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, color: "rgba(255,255,255,0.7)", marginBottom: 36 }}>Capital range: {sectorData.capitalRange} · {sectorData.ventures} venture opportunities identified</p>
          <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: colors.accent, color: colors.primary, textDecoration: "none", padding: "16px 36px", borderRadius: 50, fontSize: 16, fontWeight: 700, fontFamily: "'DM Sans',sans-serif" }}>Start a Conversation</a>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
