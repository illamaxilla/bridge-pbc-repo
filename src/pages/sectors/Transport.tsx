import React, { useState, useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";

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
// BRIDGE LOGO WHITE (for Footer)
// ============================================================================

const BridgeLogoWhite = () => (
  <div style={{ display: "flex", alignItems: "center", height: "40px" }}>
    <svg viewBox="0 0 4113.8 932.3" height="36" style={{ display: "block" }}>
      {/* PBC letter P */}
      <path
        fill="#fff"
        d="M3355.1,655.5h31.2v5.7h-31.2v-5.7ZM3355.1,666.9h31.2v11.1h-31.2v-11.1ZM3355.1,683.8h31.2v11.1h-31.2v-11.1ZM3355.1,700.8h31.2v11.1h-31.2v-11.1ZM3355.1,717.7h31.2v11.1h-31.2v-11.1ZM3355.1,734.5h31.2v11.1h-31.2v-11.1ZM3355.1,751.4h31.2v10.8h-31.2v-10.8ZM3355.1,767.9h31.2v11.1h-31.2v-11.1ZM3355.1,784.8h31.2v11.1h-31.2v-11.1ZM3355.1,801.7h31.2v11.1h-31.2v-11.1ZM3355.1,818.5h31.2v11.1h-31.2v-11.1ZM3355.1,835.4h31.2v11.1h-31.2v-11.1ZM3355.1,852.4h31.2v11.1h-31.2v-11.1ZM3355.1,869.2h31.2v11.1h-31.2v-11.1ZM3355.1,886.1h31.2v11.1h-31.2v-11.1ZM3355.1,903h31.2v5.7h-31.2v-5.7ZM3397.5,655.5h61.7c12.5,0,24.3,1.7,35.1,5.7h-96.8v-5.7h0ZM3397.5,666.9h109.7c5.9,3,11.4,6.7,16.7,11.1h-126.3v-11.1h-.1ZM3397.5,801.7h126.3c-5.2,4.4-10.8,8.1-16.7,11.1h-109.7v-11.1h.1ZM3397.5,818.5h96.8c-10.8,4-22.5,6.1-35.1,6.1h-30.5v84h-31.2v-90.2h0v.1ZM3479.6,739.9c0-17.2-13.5-24.7-28.1-24.7h-23.6v49.3h23.6c14.5,0,28.1-7.5,28.1-24.7h0v.1ZM3485.5,683.8h44.4c3.4,3,6.6,6.7,9.3,11.1h-37.1c-4.9-4.4-10.8-8.4-16.7-11.1h.1ZM3502.2,784.8h37.1c-2.8,4-5.9,7.8-9.3,11.1h-44.4c5.9-2.7,11.8-6.7,16.7-11.1h-.1ZM3507.4,700.8h35.7c2.4,3.4,4.2,7.1,5.6,11.1h-33.6c-2.1-4-4.5-7.8-7.7-11.1ZM3515,767.9h33.6l-5.6,11.1h-35.7c3.1-3.4,5.6-7.1,7.7-11.1ZM3517.8,717.7h32.6c1.3,3.7,2.4,7.5,2.8,11.1h-32.3c-.7-3.7-1.8-7.5-3.1-11.1h0ZM3520.9,751.4h32.3c-.3,3.7-1.3,7.5-2.8,10.8h-32.6c1.3-3.4,2.4-7.1,3.1-10.8h0ZM3521.7,734.5h32.3c.3,3.7.3,7.5-.3,11.1h-32c.7-3.7.7-7.5,0-11.1h0ZM3397.5,689.1h61.7c28.4,0,51.7,23.3,51.7,50.9s-23.2,50.9-51.7,50.9h-61.7v-102h0v.2Z"
      />
      {/* PBC letter B */}
      <path
        fill="#fff"
        d="M3572.3,655.5h31.2v5.7h-31.2v-5.7ZM3572.3,666.9h31.2v11.1h-31.2v-11.1ZM3572.3,683.8h31.2v11.1h-31.2v-11.1ZM3572.3,700.8h31.2v11.1h-31.2v-11.1ZM3572.3,717.7h31.2v11.1h-31.2v-11.1ZM3572.3,734.5h31.2v11.1h-31.2v-11.1ZM3572.3,751.4h31.2v10.8h-31.2v-10.8ZM3572.3,767.9h31.2v11.1h-31.2v-11.1ZM3572.3,784.8h31.2v11.1h-31.2v-11.1ZM3572.3,801.7h31.2v11.1h-31.2v-11.1ZM3572.3,818.5h31.2v11.1h-31.2v-11.1ZM3572.3,835.4h31.2v11.1h-31.2v-11.1ZM3572.3,852.4h31.2v11.1h-31.2v-11.1ZM3572.3,869.2h31.2v11.1h-31.2v-11.1ZM3572.3,886.1h31.2v11.1h-31.2v-11.1ZM3572.3,903h31.2v5.7h-31.2v-5.7ZM3614.6,655.5h45.4c12.5,0,24.6,2.1,35.7,5.7h-81.2v-5.7h.1ZM3614.6,666.9h94.4c5.9,3,11.4,6.7,16,11.1h-110.3v-11.1h-.1ZM3614.6,688.9h45.4c23.6,0,42,12.5,42,34.1,0,36.4-42.3,62.5-87.5,72.2v-106.4h.1v.1ZM3685.4,775.1c17.3,9.8,36.4,32.4,36.4,57.1s-16,43.2-46.2,43.2h-61.1v-69.5c24.6-4.8,52.4-15.6,70.8-30.7h.1v-.1ZM3614.6,886.1h125.2c-4.5,4.4-10.1,8.1-16,11.1h-109.3v-11.1h.1ZM3614.6,903h96.1c-10.8,3.7-22.5,5.7-35.1,5.7h-61.1v-5.7h.1ZM3674.3,725.4c0-7.5-6.6-12.9-15.6-12.9h-16.3v49c19.8-9.1,32-21.9,32-36.1h-.1ZM3686.1,805.8c-13.2,7.5-28.4,13.5-43.7,18.3v27.7h32c19.1,0,27.1-17.5,11.8-45.9h-.1v-.1ZM3687.5,683.8h43.1c3.1,3.4,5.6,7.1,7.7,11.1h-35.4c-4.2-4.8-9.3-8.4-15.3-11.1h-.1ZM3694.7,767.9h38.9c3.8,3.7,7.3,7.5,10.4,11.1h-35.7c-4.2-4.4-9-8.1-13.5-11.1h-.1,0ZM3705.8,751.4h30.5c-2.1,4-4.5,7.8-7.3,10.8h-30.9c2.8-3.4,5.6-7.1,7.7-10.8h0ZM3718.4,869.2h35.7c-2.4,4-5.2,7.8-8.7,11.1h-42.3c5.9-3,11.1-6.7,15.3-11.1h.1-.1ZM3706.9,700.8h33.6c1.3,2.7,2.8,7.1,3.1,11.1h-32c-1-4-2.8-7.8-4.9-11.1h.2,0ZM3711.8,734.5h30.9c-.7,4-1.8,7.8-3.4,11.1h-30.5c1.3-3.7,2.4-7.5,3.1-11.1h-.1ZM3712.8,717.7h31.2c.3,3.7.3,7.5-.3,11.1h-30.9c.7-3,.7-8.1,0-11.1h0ZM3713.8,784.8h34.3c2.4,3.4,4.9,7.5,6.6,11.1h-33c-2.4-4-5.2-7.8-8-11.1h.1ZM3729.1,852.4h32.3c-.7,3.7-2.1,7.5-4.2,11.1h-34c2.4-3.4,4.5-7.1,5.9-11.1h0ZM3724.9,801.7h32.6c1.8,3.7,3.1,7.5,3.8,11.1h-31.5c-1.3-3.7-2.8-7.5-4.9-11.1ZM3732.6,835.4h31.5c0,3.7-.3,7.5-1.3,11.1h-32c1-3.7,1.8-7.5,1.8-11.1h0ZM3731.3,818.5h31.5c1,3.7,1.3,7.5,1.3,11.1h-31.2c-.3-3.7-.7-7.5-1.8-11.1h.2Z"
      />
      {/* PBC letter C */}
      <path
        fill="#fff"
        d="M3774.6,767.9h32l-.7,11.1h-32c0-3.4.3-7.8.7-11.1ZM3773.9,784.8h32c0,3.4.3,7.5.7,11.1h-32c-.3-3.4-.7-7.8-.7-11.1ZM3777.7,751.4h32.3c-1,3.7-1.8,6.7-2.4,10.8h-32.3c.7-3.7,1.3-7.1,2.4-10.8ZM3775.3,801.7h32.3c.7,4,1.3,7.5,2.4,11.1h-32.3c-1-3.7-1.8-7.5-2.4-11.1ZM3783.2,734.5h33c-1.8,3.7-3.1,7.5-4.5,11.1h-32.6c1-3.7,2.4-7.5,4.2-11.1h-.1ZM3779.1,818.5h32.6c1.3,3.7,2.8,7.5,4.5,11.1h-33c-1.8-3.7-3.1-7.5-4.2-11.1h.1ZM3791.5,717.7h34.3l-7,11.1h-33.3c1.8-3.7,3.4-7.1,5.9-11.1h.1ZM3785.7,835.4h33.3l7,11.1h-34.3c-2.4-4-4.2-7.5-5.9-11.1h-.1ZM3803.4,700.8h37.5c-3.8,3.4-7.7,7.5-10.4,11.1h-35.4c2.1-3.4,5.2-7.5,8.3-11.1ZM3795.1,852.4h35.4c2.8,3.7,6.6,7.8,10.4,11.1h-37.5c-3.1-3.7-6.2-7.8-8.3-11.1ZM3819.7,683.8h45.1c-5.9,3-11.8,6.7-17.3,11.1h-39.2c3.8-4,7.7-7.8,11.4-11.1ZM3808.2,869.2h39.2c5.6,4.4,11.4,8.1,17.3,11.1h-45.1c-3.8-3.4-7.7-7.1-11.4-11.1ZM3817,782.1c0-55.4,43.1-99.3,96.8-99.3s57.9,14.2,75.6,36.8l-18.1,21.9c-12.9-18.9-33.6-31-57.6-31-36.1,0-64.9,31-64.9,71.6s28.8,71.6,64.9,71.6,44.7-12.1,57.6-31l18.1,21.9c-17.7,22.6-44.7,36.8-75.6,36.8-53.7,0-96.8-43.9-96.8-99.3ZM3844.7,666.9h138.1c6.2,3.4,12.1,7.1,17.7,11.1h-51.1c-11.4-4-23.2-6.1-35.7-6.1s-24.3,2.1-35.7,6.1h-51.1c5.6-4,11.4-7.8,17.7-11.1h-.1.2ZM3826.9,886.1h51.1c11.4,4,23.2,6.1,35.7,6.1s24.3-2.1,35.7-6.1h51.1c-5.6,4-11.4,7.8-17.7,11.1h-138.1c-6.2-3.4-12.1-7.1-17.7-11.1h.1-.2ZM3913.8,650.1c20.4,0,39.5,4,56.9,11.1h-113.8c17.3-7.1,36.4-11.1,56.9-11.1h.1-.1ZM3856.8,903h113.8c-17.3,7.1-36.4,11.1-56.9,11.1s-39.5-4-56.9-11.1h-.1.1ZM3962.6,683.8h45.1l5.9,5.4-4.5,5.7h-29.2c-5.6-4.4-11.4-8.1-17.3-11.1h-.1.1ZM3980,869.2h29.2l4.5,5.4c-1.8,2.1-3.8,4-5.9,5.7h-45.1c5.9-3,11.8-6.7,17.3-11.1h.1-.1ZM3986.6,700.8h18.1l-8.3,10.2c-2.8-3.4-6.2-7.1-9.8-10.2h0ZM3996.3,853.3l8.3,10.2h-18.1c3.4-3,7-6.7,9.8-10.2h0Z"
      />
      {/* Registered mark */}
      <circle fill="none" stroke="#fff" strokeWidth="5" strokeMiterlimit="10" cx="4078.5" cy="661.2" r="32.8" />
      <path
        fill="#fff"
        d="M4092.2,677.1l-7.3-10.4c.2,0,.3,0,.4-.2,2-.9,3.6-2.1,4.6-3.8s1.6-3.6,1.6-6.1c0-3.6-1.2-6.3-3.6-8.4s-5.7-3-10-3h-13v31.8h5.9v-9.3h8.5l6.5,9.3h6.4v.1ZM4083.7,651.9c1.3,1.1,2,2.7,2,4.7s-.6,3.6-2,4.7-3.3,1.7-5.9,1.7h-6.9v-12.6h6.9c2.6,0,4.5.5,5.9,1.6h0v-.1Z"
      />
      {/* Diamond icon box */}
      <rect
        fill="none"
        stroke="#fff"
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
        stroke={colors.primary}
        strokeMiterlimit="10"
        points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"
      />
      <path
        fill="#74914a"
        d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z"
      />
      <path
        fill={colors.accent}
        d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"
      />
      {/* BRIDGE letters */}
      <path
        fill="#fff"
        d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"
      />
      <path
        fill="#fff"
        stroke="#000"
        strokeWidth="0.5"
        strokeMiterlimit="10"
        d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"
      />
      <path
        fill="#fff"
        stroke="#000"
        strokeWidth="0.5"
        strokeMiterlimit="10"
        d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"
      />
      <rect fill={colors.accent} x="1427.4" y="17.4" width="205.2" height="145" />
      <rect fill="#fff" x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6" />
      <path
        fill="#fff"
        d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"
      />
      <rect fill="#fff" x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6" />
      <rect fill={colors.accent} x="3083.4" y="339.5" width="175.1" height="257.7" />
      <rect fill={colors.accent} x="3083.4" y="654.4" width="175.1" height="257.7" />
    </svg>
  </div>
);

// ============================================================================
// GLOBAL CONSTANTS
// ============================================================================
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

// Stakeholder icons for Impact section
const IconStorefront = () => (
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
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
    <path d="M2 7h20" />
    <path d="M22 7v3a2 2 0 0 1-2 2 2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7" />
  </svg>
);
const IconBuilding2 = () => (
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
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" x2="21" y1="22" y2="22" />
    <line x1="6" x2="6" y1="18" y2="11" />
    <line x1="10" x2="10" y1="18" y2="11" />
    <line x1="14" x2="14" y1="18" y2="11" />
    <line x1="18" x2="18" y1="18" y2="11" />
    <polygon points="12 2 20 7 4 7" />
    <line x1="2" x2="22" y1="18" y2="18" />
  </svg>
);
const IconTrendingUp = () => (
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
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);
const IconBatteryCharging = () => (
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
    <path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1" />
    <path d="M6 7H2v10h4" />
    <line x1="22" y1="11" x2="22" y2="13" />
    <line x1="11" y1="7" x2="8" y2="12" />
    <line x1="8" y1="12" x2="13" y2="12" />
    <line x1="13" y1="12" x2="10" y2="17" />
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
    <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
    <path d="M4 6v12a2 2 0 0 0 2 2h14v-4" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
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

// ============================================================================
// 0. HEADER (Sticky, scroll-aware, frosted glass)
// ============================================================================

const sectorRoutes: Record<string, string> = {
  infra: "/sectors/infrastructure", fin: "/sectors/financial", health: "/sectors/health",
  tech: "/sectors/technology", edu: "/sectors/education", agri: "/sectors/agriculture",
  creative: "/sectors/sports", housing: "/sectors/housing", tourism: "/sectors/tourism",
  energy: "/sectors/energy", mfg: "/sectors/manufacturing", transport: "/sectors/transport",
};
const footerLinkHref = (link: string): string => {
  const map: Record<string, string> = {
    "About BRIDGE": "/about", "Our Approach": "/methodology", "Sectors": "/services",
    "Contact Us": "/contact", "Research & Guidance": "/services", "Venture Development": "/services",
    "Direct Investment": "/services", "Strategic Partnerships": "/services",
    "White Paper": "/resources", "Case Studies": "/resources", "Research Library": "/resources",
    "Data & Reports": "/resources", "Insights & Analysis": "/insights", "Sector Briefs": "/insights",
    "Policy Updates": "/insights", "Annual Review": "/insights",
  };
  return map[link] || "#";
};



// ============================================================================
// 1. HERO SECTION (bg: white)
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
              <span style={{ fontWeight: "700" }}>Transportation</span> &amp;{!isMobile && <br />} Logistics
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
                    fontSize: "44px",
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
                    fontSize: "44px",
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
// 2. THE OPPORTUNITY (bg: background)
// ============================================================================

const OpportunityCard = ({ problem, isExpanded, onToggle }) => {
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
            color: problem.priority === "High Priority" ? colors.primary : colors.accentText,
            backgroundColor: problem.priority === "High Priority" ? colors.accentLight : "rgba(184,217,53,0.12)",
            padding: "6px 14px",
            borderRadius: "20px",
            whiteSpace: "nowrap",
            flexShrink: 0,
            marginLeft: "12px",
          }}
        >
          {problem.priority}
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
                    color: problem.priority === "High Priority" ? colors.primary : colors.accentText,
                    backgroundColor:
                      problem.priority === "High Priority" ? colors.accentLight : "rgba(184,217,53,0.12)",
                    padding: "4px 10px",
                    borderRadius: "20px",
                  }}
                >
                  {problem.priority}
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
                    width: `${problem.priorityScore}%`,
                    backgroundColor: problem.priority === "High Priority" ? colors.primary : colors.accentText,
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
              {problem.drivers.map((cause, j) => (
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

const OpportunitySection = () => {
  const isMobile = useIsMobile();
  const [expandedCard, setExpandedCard] = useState(null);
  const opportunities = [
    {
      id: 1,
      title: "Cold Chain Expansion",
      priority: "High Priority",
      priorityScore: 95,
      description:
        "Cold storage expansion can recapture $1.9B in annual post-harvest value — reaching the 5.6M farming households who currently lack access to temperature-controlled logistics infrastructure.",
      quantification: "$1.9B annual value recapture; 40-50% perishable efficiency gains",
      affectedCount: "5.6M",
      affectedLabel: "farming households to serve",
      drivers: [
        { title: "Farm-Level Storage Opportunity", description: "Solar-powered cold facilities at production zones" },
        { title: "Solar Power Integration", description: "Off-grid energy enabling rural cold chain" },
        { title: "Geographic Expansion", description: "Beyond Accra-Tema to production regions" },
        { title: "Reefer Fleet Development", description: "Unbroken cold chain from farm to market" },
      ],
      bridgeSolution: "Cold Chain Ghana + Solar Storage Network",
    },
    {
      id: 2,
      title: "Fleet Modernization & Integration",
      priority: "High Priority",
      priorityScore: 92,
      description:
        "Load-matching and fleet management tools can serve the 80% of operators running small fleets — creating efficiency, reducing empty backhauls, and enabling sustainable growth through formalization.",
      quantification: "30-50% efficiency gains through load optimization and coordination",
      affectedCount: "80%+",
      affectedLabel: "of operators ready for formalization",
      drivers: [
        { title: "Load-Matching Platforms", description: "Digital marketplace connecting shippers and truckers" },
        { title: "Trust & Transparency", description: "Verified operator profiles and ratings" },
        { title: "Fleet Financing Access", description: "Asset-backed lending with telematics monitoring" },
        { title: "Digital Management Tools", description: "From informal records to professional operations" },
      ],
      bridgeSolution: "Load Matching Platform + Fleet Management",
    },
    {
      id: 3,
      title: "Last-Mile Delivery Network",
      priority: "Strategic",
      priorityScore: 82,
      description:
        "Delivery platforms ready to scale into peri-urban and rural areas can connect 60%+ of the population to reliable logistics access — bridging the urban-rural price differential and trade gap.",
      quantification: "30-50% price differential representing value recapture potential",
      affectedCount: "60%+",
      affectedLabel: "of population ready to connect",
      drivers: [
        { title: "All-Season Access Solutions", description: "Route optimization for variable road conditions" },
        { title: "Aggregation Point Development", description: "Collection hubs serving rural communities" },
        { title: "Scheduling & Predictability", description: "Regular service routes building trust" },
        { title: "Platform Scaling", description: "Extending proven urban tech to new markets" },
      ],
      bridgeSolution: "Last-Mile Delivery + Collection Network",
    },
    {
      id: 4,
      title: "Cross-Border Trade Facilitation",
      priority: "Strategic",
      priorityScore: 78,
      description:
        "Digital documentation and coordinated clearance services can transform days-long border processes into hours — unlocking Ghana's position as a West African regional trade and transit hub.",
      quantification: "Multi-day clearance times ready for transformation to hours",
      affectedCount: "3",
      affectedLabel: "landlocked neighbors connected through Ghana",
      drivers: [
        { title: "Digital Documentation", description: "Paperless processing and e-customs" },
        { title: "Agency Coordination", description: "Single-window service integration" },
        { title: "E-Clearance Systems", description: "Real-time tracking and automated workflows" },
        { title: "ECOWAS Harmonization", description: "Standards alignment accelerating regional trade" },
      ],
      bridgeSolution: "Cross-Border Facilitation Services",
    },
  ];

  return (
    <section style={{ backgroundColor: colors.background, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
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
              backgroundColor: colors.white,
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
              color: colors.primary,
              margin: "0 0 20px 0",
              letterSpacing: "-0.5px",
              maxWidth: "820px",
            }}
          >
            32M+ Lives Ready to Be <span style={{ color: colors.accent, fontWeight: "600" }}>Connected</span> Through
            Smarter Logistics
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              color: "#666",
              maxWidth: "680px",
              lineHeight: "1.65",
              margin: 0,
            }}
          >
            Ghana's logistics sector represents one of the most compelling investment landscapes in West Africa — from
            cold chain expansion serving 5.6M farming households to fleet modernization reaching 80% of operators.
          </p>
        </div>

        <div
          className="hide-scrollbar"
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
              : { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }
          }
        >
          {opportunities.map((opp, i) => (
            <div
              key={opp.id}
              style={isMobile ? { minWidth: "85%", maxWidth: "85%", flexShrink: 0, scrollSnapAlign: "start" } : {}}
            >
              <OpportunityCard
                problem={opp}
                isExpanded={expandedCard === i}
                onToggle={() => setExpandedCard(expandedCard === i ? null : i)}
              />
            </div>
          ))}
        </div>

        {isMobile && (
          <div
            style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "16px", alignItems: "center" }}
          >
            {opportunities.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === 0 ? "20px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: i === 0 ? colors.accent : colors.line,
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
// 3. THE PROCESS (bg: white, centered)
// ============================================================================

const ProcessSection = () => {
  const isMobile = useIsMobile();
  const [activeStage, setActiveStage] = useState(0);
  const [showMoreProcess, setShowMoreProcess] = useState(false);
  return (
    <section style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        <div style={{ marginBottom: isMobile ? "32px" : "60px", textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
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
              backgroundColor: colors.white,
            }}
          >
            The Process
          </div>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "44px",
              fontWeight: "300",
              lineHeight: "1.2",
              color: colors.primary,
              margin: "0 0 20px 0",
              letterSpacing: "-0.5px",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            From Producer to <span style={{ color: colors.accent, fontWeight: "600" }}>Prosperity</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              color: "#666",
              maxWidth: "750px",
              lineHeight: "1.65",
              margin: "0 auto",
            }}
          >
            Follow the journey from producer to end market — and see where strategic resources and innovation create
            compounding value at every stage.
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: "4px",
            marginBottom: isMobile ? "16px" : "24px",
            backgroundColor: colors.background,
            borderRadius: isMobile ? "12px" : "16px",
            padding: "6px",
            overflowX: isMobile ? "auto" : "visible",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {valueChainStages.map((stage, i) => (
            <button
              key={stage.id}
              onClick={() => {
                setActiveStage(i);
                setShowMoreProcess(false);
              }}
              style={{
                flex: isMobile ? "none" : 1,
                minWidth: isMobile ? "80px" : "auto",
                padding: isMobile ? "12px 10px" : "16px 12px",
                backgroundColor: activeStage === i ? colors.white : "transparent",
                border: "none",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: activeStage === i ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  color: activeStage === i ? colors.primary : "#999",
                  marginBottom: "8px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {valueChainIcons[stage.icon]}
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: isMobile ? "11px" : "13px",
                  fontWeight: activeStage === i ? "600" : "400",
                  color: activeStage === i ? colors.dark : "#888",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {stage.shortLabel}
              </div>
            </button>
          ))}
        </div>
        {valueChainStages[activeStage] && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? "24px" : "24px",
              alignItems: "stretch",
            }}
          >
            <div
              style={{
                backgroundColor: colors.background,
                borderRadius: "20px",
                padding: isMobile ? "24px" : "32px",
                border: `1px solid ${colors.line}`,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    backgroundColor: colors.white,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: colors.primary,
                    fontSize: "14px",
                  }}
                >
                  {valueChainIcons[valueChainStages[activeStage].icon]}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "22px",
                      fontWeight: "600",
                      color: colors.dark,
                      margin: 0,
                    }}
                  >
                    {valueChainStages[activeStage].stage}
                  </h3>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#999" }}>
                    {valueChainStages[activeStage].actor}
                  </span>
                </div>
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  color: "#555",
                  marginBottom: "28px",
                  lineHeight: "1.5",
                }}
              >
                {valueChainStages[activeStage].population}
              </div>
              <div style={{ marginBottom: "28px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#999" }}>
                    Value Retained
                  </span>
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "14px",
                      fontWeight: "700",
                      color: colors.primary,
                    }}
                  >
                    {valueChainStages[activeStage].valueRetained}%
                  </span>
                </div>
                <div style={{ height: "6px", backgroundColor: colors.line, borderRadius: "3px" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${valueChainStages[activeStage].valueRetained}%`,
                      backgroundColor: colors.primary,
                      borderRadius: "3px",
                      transition: "width 0.6s ease",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  marginTop: "auto",
                  padding: "18px 20px",
                  backgroundColor: colors.white,
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "22px",
                    fontWeight: "700",
                    color: colors.primary,
                    whiteSpace: "nowrap",
                  }}
                >
                  {valueChainStages[activeStage].stat}
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px",
                    fontWeight: "600",
                    color: "#aaa",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Key Metric
                </span>
              </div>
            </div>
            {(!isMobile || showMoreProcess) && (
              <div
                style={{
                  backgroundColor: colors.background,
                  borderRadius: "20px",
                  padding: isMobile ? "24px" : "28px",
                  border: `1px solid ${colors.line}`,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    color: colors.primary,
                    marginBottom: "16px",
                    display: "block",
                  }}
                >
                  Opportunities at This Stage
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                  {valueChainStages[activeStage].opportunities.map((point, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "14px 16px",
                        backgroundColor: colors.white,
                        borderRadius: "12px",
                        flex: 1,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "12px",
                          fontWeight: "700",
                          color: colors.primary,
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          backgroundColor: colors.accentLight,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: colors.dark }}>
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {isMobile && (
              <button
                onClick={() => setShowMoreProcess(!showMoreProcess)}
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
                {showMoreProcess ? "Show less" : "Show opportunities"}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={colors.primary}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ transform: showMoreProcess ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

// ============================================================================
// 4. THE PATHWAY TO IMPACT (bg: primary)
// ============================================================================

const PathwaySection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All" },
    { id: "flagship", label: "Flagship" },
    { id: "scaling", label: "Scaling" },
  ];

  const filtered =
    activeFilter === "all"
      ? sector.solutions
      : sector.solutions.filter((s) => (activeFilter === "flagship" ? s.tier === 1 : s.tier === 2));

  return (
    <section
      style={{ backgroundColor: colors.primary, padding: isMobile ? "60px 20px" : "100px 80px", position: "relative" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "radial-gradient(circle at 80% 80%, rgba(184,217,53,0.05) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: isMobile ? "24px" : "40px", textAlign: "left" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "2px",
              color: colors.accent,
              fontFamily: "Inter, sans-serif",
              textTransform: "uppercase",
              marginBottom: "24px",
              backgroundColor: "rgba(255,255,255,0.08)",
            }}
          >
            The Pathway to Impact
          </div>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "44px",
              fontWeight: "300",
              lineHeight: "1.2",
              color: colors.white,
              margin: "0 0 20px",
              letterSpacing: "-0.5px",
              maxWidth: "900px",
            }}
          >
            Ventures That Build <span style={{ color: colors.accent, fontWeight: "600" }}>Lasting Value</span>
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: isMobile ? "flex-start" : "flex-end",
              justifyContent: "space-between",
              flexDirection: isMobile ? "column" : "row",
              gap: "16px",
              maxWidth: isMobile ? "100%" : "none",
            }}
          >
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? "15px" : "16px",
                color: "rgba(255,255,255,0.6)",
                lineHeight: "1.65",
                margin: "0",
                maxWidth: "600px",
                textAlign: "left",
              }}
            >
              19 ventures — each one a bridge from insight to investment to measurable public benefit.
            </p>
            <div
              style={{
                display: "inline-flex",
                gap: "6px",
                padding: "6px",
                borderRadius: "50px",
                border: "1px solid rgba(255,255,255,0.15)",
                flexShrink: 0,
              }}
            >
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  style={{
                    padding: "8px 20px",
                    borderRadius: "50px",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    fontWeight: activeFilter === f.id ? "700" : "500",
                    backgroundColor: activeFilter === f.id ? colors.accent : "transparent",
                    color: activeFilter === f.id ? colors.primary : "rgba(255,255,255,0.5)",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div
          className="hide-scrollbar"
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
              : { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }
          }
        >
          {filtered.map((solution, i) => (
            <div
              key={solution.name}
              style={{
                backgroundColor: colors.white,
                borderRadius: isMobile ? "16px" : "20px",
                padding: isMobile ? "24px" : "28px",
                border: `1px solid ${colors.line}`,
                display: "flex",
                flexDirection: "column",
                ...(isMobile ? { minWidth: "80%", maxWidth: "80%", flexShrink: 0, scrollSnapAlign: "start" } : {}),
              }}
            >
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}
              >
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "20px",
                    fontWeight: "800",
                    color: colors.primary,
                    lineHeight: "1",
                  }}
                >
                  {solution.score}
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: solution.tier === 1 ? colors.primary : "#666",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    backgroundColor: solution.tier === 1 ? colors.accentLight : colors.background,
                    padding: "6px 14px",
                    borderRadius: "50px",
                    border: `1px solid ${solution.tier === 1 ? "rgba(27,77,62,0.1)" : colors.line}`,
                  }}
                >
                  {solution.tier === 1 ? "Flagship" : "Scaling"}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: isMobile ? "16px" : "18px",
                  fontWeight: "600",
                  color: colors.dark,
                  margin: "0 0 10px 0",
                }}
              >
                {solution.name}
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  color: "#666",
                  lineHeight: "1.5",
                  margin: "0 0 16px 0",
                  flex: 1,
                  minHeight: "60px",
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
                }}
              >
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "18px",
                    fontWeight: "700",
                    color: colors.primary,
                  }}
                >
                  {solution.capital}
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    color: "#888",
                    maxWidth: "150px",
                    textAlign: "right",
                  }}
                >
                  {solution.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
        {isMobile && (
          <div
            style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "16px", alignItems: "center" }}
          >
            {filtered.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === 0 ? "20px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: i === 0 ? colors.accent : "rgba(255,255,255,0.2)",
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
// 5. THE LANDSCAPE (bg: background)
// ============================================================================

const LandscapeSection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [activeAlly, setActiveAlly] = useState(0);
  const [showMoreLandscape, setShowMoreLandscape] = useState(false);
  return (
    <section style={{ backgroundColor: colors.background, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        <div style={{ marginBottom: isMobile ? "32px" : "60px", textAlign: isMobile ? "center" : "left" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
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
              backgroundColor: colors.white,
            }}
          >
            The Landscape
          </div>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "44px",
              fontWeight: "300",
              lineHeight: "1.2",
              color: colors.primary,
              margin: "0 0 20px",
              letterSpacing: "-0.5px",
              maxWidth: "800px",
            }}
          >
            Building With Ghana's <span style={{ color: colors.accent, fontWeight: "600" }}>Logistics Leaders</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              color: "#666",
              maxWidth: "750px",
              lineHeight: "1.65",
              margin: "0",
            }}
          >
            Ghana's logistics ecosystem includes global operators, innovative startups, and established local platforms
            — each bringing strengths that complement BRIDGE's focus on the underserved 80%.
          </p>
        </div>

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
            {sector.competitors.map((comp, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveAlly(i);
                  setShowMoreLandscape(false);
                }}
                style={{
                  backgroundColor: activeAlly === i ? colors.primary : colors.white,
                  color: activeAlly === i ? colors.white : colors.dark,
                  border: activeAlly === i ? "none" : `1px solid ${colors.line}`,
                  borderRadius: "50px",
                  padding: "10px 18px",
                  fontSize: "13px",
                  fontWeight: "600",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {comp.name}
              </button>
            ))}
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "280px 1fr",
            gap: isMobile ? "16px" : "24px",
            alignItems: "stretch",
          }}
        >
          {/* Desktop sidebar */}
          {!isMobile && (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", justifyContent: "space-between" }}>
              {sector.competitors.map((comp, i) => (
                <button
                  key={i}
                  onClick={() => setActiveAlly(i)}
                  style={{
                    padding: "14px 16px",
                    backgroundColor: activeAlly === i ? colors.primary : colors.white,
                    border: `1px solid ${activeAlly === i ? colors.primary : colors.line}`,
                    borderRadius: "14px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: activeAlly === i ? colors.white : colors.dark,
                    }}
                  >
                    {comp.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "11px",
                      color: activeAlly === i ? "rgba(255,255,255,0.6)" : "#999",
                      marginTop: "2px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {comp.focus}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Detail panel */}
          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: "20px",
              padding: isMobile ? "24px" : "32px",
              border: `1px solid ${colors.line}`,
            }}
          >
            {sector.competitors[activeAlly] &&
              (() => {
                const comp = sector.competitors[activeAlly];
                return (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "24px",
                        flexWrap: "wrap",
                        gap: "12px",
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: isMobile ? "20px" : "22px",
                            fontWeight: "600",
                            color: colors.dark,
                            margin: "0 0 4px 0",
                          }}
                        >
                          {comp.name}
                        </h3>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#999" }}>
                          {comp.focus}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <span
                          style={{
                            padding: "6px 14px",
                            borderRadius: "50px",
                            fontSize: "11px",
                            fontWeight: "700",
                            fontFamily: "Inter, sans-serif",
                            backgroundColor: colors.background,
                            color: colors.primary,
                            border: `1px solid ${colors.line}`,
                          }}
                        >
                          Est. {comp.year}
                        </span>
                        <span
                          style={{
                            padding: "6px 14px",
                            borderRadius: "50px",
                            fontSize: "11px",
                            fontWeight: "700",
                            fontFamily: "Inter, sans-serif",
                            backgroundColor: colors.background,
                            color: colors.primary,
                            border: `1px solid ${colors.line}`,
                          }}
                        >
                          {comp.funding}
                        </span>
                      </div>
                    </div>
                    <div style={{ marginBottom: "24px" }}>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "10px",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: "1.5px",
                          color: "#aaa",
                          marginBottom: "12px",
                          display: "block",
                        }}
                      >
                        Strengths
                      </span>
                      {comp.strengths.map((s, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "10px 0",
                          }}
                        >
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: colors.dark }}>
                            {s.name}
                          </span>
                          <div style={{ display: "flex", gap: "4px" }}>
                            {[1, 2, 3, 4, 5].map((n) => (
                              <div
                                key={n}
                                style={{
                                  width: "20px",
                                  height: "6px",
                                  borderRadius: "3px",
                                  backgroundColor: n <= s.rating ? colors.accent : colors.line,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    {(!isMobile || showMoreLandscape) && (
                      <>
                        <div style={{ marginBottom: "16px" }}>
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "10px",
                              fontWeight: "700",
                              textTransform: "uppercase",
                              letterSpacing: "1.5px",
                              color: "#aaa",
                              marginBottom: "10px",
                              display: "block",
                            }}
                          >
                            Collaboration Opportunities
                          </span>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                            {comp.gaps.map((g, i) => (
                              <span
                                key={i}
                                style={{
                                  fontFamily: "Inter, sans-serif",
                                  fontSize: "12px",
                                  color: colors.primary,
                                  padding: "6px 14px",
                                  borderRadius: "50px",
                                  border: `1px solid ${colors.line}`,
                                  backgroundColor: colors.background,
                                }}
                              >
                                {g}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div style={{ padding: "16px 20px", backgroundColor: colors.background, borderRadius: "14px" }}>
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "10px",
                              fontWeight: "700",
                              textTransform: "uppercase",
                              letterSpacing: "1.5px",
                              color: colors.primary,
                              marginBottom: "6px",
                              display: "block",
                            }}
                          >
                            BRIDGE Opportunity
                          </span>
                          <p
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "13px",
                              color: "#555",
                              lineHeight: "1.5",
                              margin: 0,
                            }}
                          >
                            {comp.bridgeOpportunity}
                          </p>
                        </div>
                      </>
                    )}
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
                        {showMoreLandscape ? "Show less" : "Show more details"}
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
                  </>
                );
              })()}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 6. GOVERNANCE & POLICY — Scrollable Card Widget (bg: white)
// ============================================================================

const GovernanceSection = () => {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);
  const [showAllPolicies, setShowAllPolicies] = useState(false);

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
      policy: "Connect24 Transport Corridor",
      body: "24-Hour Plus Authority / Office of the President",
      allocation: "$4B programme ($300-400M seed)",
      category: "funding",
      relevance: ["road", "rail"],
      alignment:
        "Central transport corridor connecting regions through economic clusters, targeting 18% logistics cost reduction.",
      bridgeRole:
        "BRIDGE cold chain, fleet management, and logistics platforms operate along Connect24 corridors as active economic nodes.",
      bridgeVentures: ["Cold Chain Ghana", "Fleet Management Services", "Load Matching Platform"],
      pillars: ["Cold chains", "Night cargo corridors", "Inland water transport"],
    },
    {
      policy: "Railway Master Plan",
      body: "Ghana Railway Development Authority",
      allocation: "$21.5B for 4,007 km network",
      category: "infrastructure",
      relevance: ["rail"],
      alignment:
        "Comprehensive railway expansion enabling multimodal freight and passenger services across all regions.",
      bridgeRole:
        "BRIDGE rail logistics integration services position ventures for multimodal connectivity as the national network expands.",
      bridgeVentures: ["Rail Logistics Integration", "Cross-Border Facilitation"],
      pillars: ["Standard gauge", "Freight corridors", "Passenger services"],
    },
    {
      policy: "Tema-Mpakadan Railway (India EXIM)",
      body: "India EXIM Bank / Ministry of Transport",
      allocation: "$440M financing",
      category: "partnerships",
      relevance: ["rail"],
      alignment:
        "Railway connecting Tema Port to Volta Region, opening key inland logistics corridors for agricultural trade.",
      bridgeRole:
        "BRIDGE agricultural collection and warehousing ventures connect to rail terminus points for farm-to-port logistics.",
      bridgeVentures: ["Agricultural Collection Network", "Warehousing Company"],
      pillars: ["Volta corridor", "Port connectivity"],
    },
    {
      policy: "Boankra Inland Port",
      body: "Ghana Shippers Authority",
      allocation: "80%+ complete Phase 1",
      category: "infrastructure",
      relevance: ["road", "rail"],
      alignment: "Inland dry port in Ashanti Region reducing coastal port congestion and serving the middle belt.",
      bridgeRole:
        "BRIDGE Boankra Port Services venture provides container handling, forwarding, and customs clearance at the facility.",
      bridgeVentures: ["Boankra Port Services", "Cross-Border Facilitation"],
      pillars: ["Container handling", "Freight forwarding", "Customs clearance"],
    },
    {
      policy: "AfDB Prime Meridian Docks",
      body: "African Development Bank",
      allocation: "$23M facility",
      category: "partnerships",
      relevance: ["maritime"],
      alignment:
        "Ship repair facility enhancing maritime services, regional port competitiveness, and fleet maintenance capacity.",
      bridgeRole:
        "BRIDGE maritime logistics and cross-border trade facilitation services complement expanded port capacity and regional connectivity.",
      bridgeVentures: ["Cross-Border Facilitation", "Regional Logistics Hub"],
    },
    {
      policy: "Road Infrastructure Budget",
      body: "Ministry of Roads and Highways",
      allocation: "Significant annual allocation",
      category: "funding",
      relevance: ["road"],
      alignment:
        "Road construction and maintenance programmes enabling the 97% road-dependent national freight network.",
      bridgeRole:
        "BRIDGE fleet management and load matching platforms maximize the economic value of improved road networks.",
      bridgeVentures: ["Fleet Management Services", "Last-Mile Delivery Platform", "Load Matching Platform"],
    },
    {
      policy: "ACES Cold Chain Programme (UK)",
      body: "Africa Centre of Excellence for Sustainable Cooling",
      allocation: "Training & technology transfer",
      category: "tax",
      relevance: ["road"],
      alignment: "Technical support for cold chain development including training, standards, and technology transfer.",
      bridgeRole:
        "BRIDGE Training Academy and Cold Chain Ghana leverage ACES expertise for skills development and cold chain best practices.",
      bridgeVentures: ["Cold Chain Ghana", "Logistics Training Academy", "Pharmaceutical Cold Chain"],
    },
    {
      policy: "Customs Trade Facilitation",
      body: "Ghana Revenue Authority (Customs Division)",
      allocation: "AfCFTA corridor investment",
      category: "tax",
      relevance: ["road", "rail"],
      alignment: "Border efficiency improvements and customs modernization supporting regional trade under AfCFTA.",
      bridgeRole:
        "BRIDGE cross-border facilitation provides customs brokerage and documentation reducing border friction alongside GRA reforms.",
      bridgeVentures: ["Cross-Border Facilitation", "Regional Logistics Hub"],
    },
    {
      policy: "Free Zone Logistics Incentives",
      body: "Ghana Free Zones Authority",
      allocation: "Tax holidays & duty exemptions",
      category: "tax",
      relevance: ["road", "maritime"],
      alignment:
        "Designated free zones offering 10-year tax holidays and duty-free imports for logistics and warehousing operators.",
      bridgeRole:
        "BRIDGE warehousing and cold chain ventures leverage free zone benefits to reduce capital costs and accelerate facility development.",
      bridgeVentures: ["Cold Chain Ghana", "Warehousing Company", "Regional Logistics Hub"],
      pillars: ["Tax holidays", "Duty exemptions", "Export processing"],
    },
    {
      policy: "National Road Safety Authority Programme",
      body: "National Road Safety Authority (NRSA)",
      allocation: "$45M annual programme",
      category: "funding",
      relevance: ["road"],
      alignment:
        "Fleet safety standards, driver certification, and vehicle inspection programmes reducing road fatalities by 50% target.",
      bridgeRole:
        "BRIDGE fleet management integrates NRSA safety standards while the Training Academy provides certified driver programmes.",
      bridgeVentures: ["Fleet Management Services", "Logistics Training Academy"],
      pillars: ["Driver certification", "Vehicle standards", "Safety tech"],
    },
    {
      policy: "Tema Motorway Expansion",
      body: "Ministry of Roads and Highways",
      allocation: "$300M+ multi-phase",
      category: "infrastructure",
      relevance: ["road"],
      alignment:
        "Six-lane motorway expansion between Accra and Tema Port, Ghana's busiest freight corridor handling 70% of imports.",
      bridgeRole:
        "BRIDGE last-mile delivery and fleet management services operate along the expanded corridor, reducing port-to-warehouse transit times.",
      bridgeVentures: ["Last-Mile Delivery Platform", "Fleet Management Services", "Load Matching Platform"],
      pillars: ["Port corridor", "Freight capacity", "Urban logistics"],
    },
    {
      policy: "Japan-Ghana Logistics Partnership",
      body: "JICA / Ministry of Transport",
      allocation: "$180M concessional lending",
      category: "partnerships",
      relevance: ["road", "maritime"],
      alignment:
        "Technical cooperation for port modernization, logistics training, and supply chain management capacity building.",
      bridgeRole:
        "BRIDGE Training Academy and port logistics ventures align with JICA capacity building for workforce development and operational excellence.",
      bridgeVentures: ["Logistics Training Academy", "Boankra Port Services", "Cross-Border Facilitation"],
      pillars: ["Capacity building", "Port efficiency", "Training"],
    },
  ];

  const filtered = activeCategory === "all" ? policies : policies.filter((p) => p.category === activeCategory);

  const handleCategoryChange = (id) => {
    setActiveCategory(id);
    setExpandedCard(null);
  };

  return (
    <section style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        <div style={{ marginBottom: isMobile ? "24px" : "40px", textAlign: isMobile ? "left" : "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
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
              backgroundColor: colors.white,
            }}
          >
            Policy &amp; Governance
          </div>
          <h2
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              lineHeight: "1.2",
              color: colors.primary,
              margin: isMobile ? "0 0 16px" : "0 auto 16px",
              letterSpacing: "-0.5px",
              maxWidth: "900px",
            }}
          >
            Moving in Step with Ghana's <span style={{ fontWeight: "600" }}>Transport</span>{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Vision</span>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              color: "#555",
              maxWidth: "750px",
              lineHeight: "1.65",
              margin: isMobile ? "0 0 32px" : "0 auto 32px",
            }}
          >
            Connect24 creates the corridors — BRIDGE builds the services, technology, and human capital that make them
            work for ordinary Ghanaians.
          </p>
          <div
            style={{
              display: "flex",
              gap: "8px",
              justifyContent: isMobile ? "flex-start" : "center",
              flexWrap: "nowrap",
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
              ...(isMobile ? { margin: "0 -20px", padding: "0 20px" } : {}),
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                style={{
                  padding: isMobile ? "6px 12px" : "6px 16px",
                  borderRadius: "50px",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: isMobile ? "11px" : "12px",
                  fontWeight: activeCategory === cat.id ? "700" : "500",
                  backgroundColor: activeCategory === cat.id ? colors.accentLight : "transparent",
                  border: activeCategory === cat.id ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                  color: activeCategory === cat.id ? colors.primary : "#999",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div
          className="policy-scroll hide-scrollbar"
          style={{
            display: "flex",
            gap: isMobile ? "12px" : "16px",
            overflowX: "auto",
            paddingBottom: "12px",
            marginBottom: isMobile ? "16px" : "32px",
            alignItems: "flex-start",
            ...(isMobile
              ? {
                  margin: "0 -20px",
                  padding: "0 20px 12px",
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                }
              : { justifyContent: "center" }),
          }}
        >
          {filtered.map((p, idx) => {
            const isExpanded = expandedCard === idx;
            const badge = catBadge[p.category];
            return (
              <div
                key={idx}
                onClick={() => setExpandedCard(isExpanded ? null : idx)}
                style={{
                  minWidth: isMobile ? "calc(100% - 40px)" : "280px",
                  maxWidth: isMobile ? "calc(100% - 40px)" : isExpanded ? "420px" : "280px",
                  backgroundColor: colors.background,
                  border: isExpanded ? `2px solid ${colors.accent}` : `2px solid ${colors.primary}`,
                  borderRadius: "16px",
                  padding: isMobile ? "20px" : "24px",
                  flexShrink: 0,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  ...(isMobile ? { scrollSnapAlign: "start" } : {}),
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                    minHeight: "24px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "9px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      color: colors.primary,
                      padding: "3px 10px",
                      borderRadius: "50px",
                      backgroundColor: badge.bg,
                      border: `1px solid ${badge.border}`,
                      flexShrink: 0,
                    }}
                  >
                    {p.category}
                  </span>
                  {p.relevance && (
                    <div style={{ display: "flex", gap: "4px" }}>
                      {p.relevance.map((r) => (
                        <span
                          key={r}
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "9px",
                            fontWeight: "600",
                            color: "#888",
                            textTransform: "uppercase",
                            padding: "3px 8px",
                            borderRadius: "50px",
                            backgroundColor: "rgba(0,0,0,0.04)",
                            flexShrink: 0,
                          }}
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "16px",
                    fontWeight: "700",
                    color: colors.primary,
                    minHeight: "42px",
                    marginBottom: "8px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {p.policy}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    fontWeight: "700",
                    color: colors.accent,
                    marginBottom: "10px",
                    minHeight: "18px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {p.allocation}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    color: "#666",
                    lineHeight: "1.5",
                    minHeight: "58px",
                    marginBottom: "12px",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {p.alignment}
                </div>
                <div
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    fontWeight: "600",
                    color: colors.primary,
                    opacity: 0.6,
                  }}
                >
                  BRIDGE alignment
                </div>
                <div
                  style={{
                    maxHeight: isExpanded ? "500px" : "0",
                    opacity: isExpanded ? 1 : 0,
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ borderTop: `1px solid ${colors.line}`, marginTop: "14px", paddingTop: "14px" }}>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "11px",
                        color: "#888",
                        marginBottom: "8px",
                      }}
                    >
                      {p.body}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px",
                        color: "#444",
                        lineHeight: "1.55",
                        marginBottom: "14px",
                      }}
                    >
                      {p.bridgeRole}
                    </div>
                    {p.pillars && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
                        {p.pillars.map((pill) => (
                          <span
                            key={pill}
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "10px",
                              fontWeight: "600",
                              color: colors.accent,
                              backgroundColor: "rgba(184,217,53,0.12)",
                              padding: "4px 12px",
                              borderRadius: "50px",
                            }}
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    )}
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {p.bridgeVentures.map((v) => (
                        <div
                          key={v}
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
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              backgroundColor: colors.accent,
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "12px",
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
                </div>
              </div>
            );
          })}
        </div>

        {isMobile && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "6px",
              marginBottom: "24px",
              alignItems: "center",
            }}
          >
            {filtered.map((_, i) => (
              <div
                key={i}
                style={{
                  width: expandedCard === i ? "20px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: expandedCard === i ? colors.accent : colors.line,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        )}

        <div
          style={{
            backgroundColor: colors.primary,
            borderRadius: "16px",
            padding: isMobile ? "20px 24px" : "28px 32px",
            display: "flex",
            justifyContent: isMobile ? "flex-start" : "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            flexDirection: isMobile ? "column" : "row",
            gap: "16px",
            textAlign: "left",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: isMobile ? "16px" : "18px",
                fontWeight: "600",
                color: colors.white,
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
              fontWeight: "700",
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
// 7. THE RIPPLE EFFECT — Interactive Cross-Sector (bg: primary)
// ============================================================================

const RippleEffectSection = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [showMoreRipple, setShowMoreRipple] = useState(false);
  const isMobile = useIsMobile();

  const crossSectorIcons = {
    6: (c) => (
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
    3: (c) => (
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
    11: (c) => (
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
    10: (c) => (
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
    2: (c) => (
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
  };

  const crossSectorShortNames = ["Agriculture", "Health", "Manufacturing", "Energy", "Finance"];

  const pathways = [
    {
      sectorId: 6,
      name: "Agriculture & Value Chains",
      connection: "Cold chain infrastructure, farm-to-market transport, and post-harvest logistics",
      multiplier: "4.2x",
      synergies: [
        "Solar cold storage at agricultural aggregation points",
        "Scheduled collection services linking farmers to markets",
        "Temperature-controlled export logistics to port facilities",
      ],
      bridgeVentures: ["Cold Chain Ghana", "Agricultural Collection Network"],
      impact: "Reduces $1.9B in annual post-harvest losses through reliable cold chain and market connections",
      pathLabel: "Transport → Cold Storage → Market Access → Value Recapture",
    },
    {
      sectorId: 3,
      name: "Health Systems",
      connection: "Pharmaceutical cold chain, vaccine distribution, and medical supply delivery",
      multiplier: "3.8x",
      synergies: [
        "GDP-compliant temperature logistics for vaccines and medicines",
        "Reliable medical supply delivery to rural health facilities",
        "Ambulance logistics and health worker transportation networks",
      ],
      bridgeVentures: ["Pharmaceutical Cold Chain", "Last-Mile Delivery Platform"],
      impact: "Addresses 25% vaccine spoilage through validated cold chain extending healthcare reach",
      pathLabel: "Transport → Pharma Cold Chain → Rural Distribution → Health Access",
    },
    {
      sectorId: 11,
      name: "Manufacturing & Light Industry",
      connection: "Raw material supply chains, finished goods distribution, industrial transport",
      multiplier: "3.5x",
      synergies: [
        "Just-in-time delivery systems enabling lean manufacturing operations",
        "Finished goods distribution to domestic and regional export markets",
        "Industrial equipment and specialized heavy haulage service routes",
      ],
      bridgeVentures: ["Fleet Management Services", "Load Matching Platform"],
      impact: "Reduces logistics costs from 9× global average enabling competitive manufacturing",
      pathLabel: "Transport → Supply Chain → Distribution → Export Markets",
    },
    {
      sectorId: 10,
      name: "Energy & Renewables",
      connection: "Solar equipment delivery, fuel distribution, and EV battery logistics",
      multiplier: "2.8x",
      synergies: [
        "Solar panel and battery delivery to off-grid rural installations",
        "Fuel distribution logistics across expanded regional supply networks",
        "EV charging infrastructure deployment and battery supply chain mgmt",
      ],
      bridgeVentures: ["Cold Chain Ghana", "Fleet Management Services"],
      impact: "Solar-powered cold chain reduces diesel dependency while enabling energy deployment",
      pathLabel: "Transport → Solar Delivery → Off-Grid Access → Clean Energy",
    },
    {
      sectorId: 2,
      name: "Financial Inclusion",
      connection: "Vehicle financing, mobile money in deliveries, and logistics business loans",
      multiplier: "2.5x",
      synergies: [
        "Mobile money integration for cashless delivery payment processing",
        "Vehicle and equipment asset-backed financing for fleet operators",
        "Transport worker savings, insurance, and credit scoring products",
      ],
      bridgeVentures: ["Vehicle Asset Financing", "Load Matching Platform"],
      impact: "Enables financial inclusion through transport touchpoints and data-driven credit",
      pathLabel: "Transport → Digital Payments → Asset Finance → Economic Security",
    },
  ];

  return (
    <section
      style={{ backgroundColor: colors.primary, padding: isMobile ? "60px 20px" : "100px 80px", position: "relative" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 80%, rgba(184,217,53,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(184,217,53,0.04) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto", position: "relative", textAlign: "center" }}>
        {/* Header */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "50px",
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "2px",
            color: colors.accent,
            fontFamily: "Inter, sans-serif",
            textTransform: "uppercase",
            marginBottom: "24px",
            backgroundColor: "rgba(255,255,255,0.08)",
          }}
        >
          The Ripple Effect
        </div>
        <h2
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "28px" : "42px",
            fontWeight: "300",
            lineHeight: "1.2",
            letterSpacing: "-0.5px",
            color: colors.white,
            margin: "0 auto 16px",
            maxWidth: "820px",
          }}
        >
          How Transportation <span style={{ color: colors.accent, fontWeight: "600" }}>Amplifies Impact</span>
        </h2>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "16px",
            lineHeight: "1.65",
            color: "rgba(255,255,255,0.6)",
            maxWidth: "680px",
            margin: "0 auto 48px",
          }}
        >
          When goods move efficiently, transit systems serve workers, and logistics costs fall — the ripple effects
          connect producers to markets, reduce consumer prices, and accelerate commerce across Ghana.
        </p>

        {/* Icon Row */}
        {isMobile ? (
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
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
                  <IconTruck />
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
                  TRANSPORT
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
                      gap: "6px",
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
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {crossSectorIcons[p.sectorId](isActive ? colors.primary : "rgba(255,255,255,0.6)")}
                    </div>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "10px",
                        fontWeight: "600",
                        color: isActive ? colors.white : "rgba(255,255,255,0.5)",
                        maxWidth: "60px",
                        lineHeight: "1.2",
                        textAlign: "center",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {crossSectorShortNames[i]}
                    </span>
                  </button>
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
                <IconTruck />
              </div>
            </div>
            {pathways.map((p, i) => {
              const isActive = activeNode === i;
              return (
                <button
                  key={i}
                  onClick={() => setActiveNode(isActive ? null : i)}
                  style={{
                    width: "120px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0",
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
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      marginBottom: "10px",
                    }}
                  >
                    {crossSectorIcons[p.sectorId](isActive ? colors.primary : "rgba(255,255,255,0.6)")}
                  </div>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: isActive ? colors.white : "rgba(255,255,255,0.5)",
                      textAlign: "center",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "120px",
                    }}
                  >
                    {crossSectorShortNames[i]}
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
                </button>
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
            textAlign: "left",
            transition: "all 0.3s ease",
          }}
        >
          {activeNode === null ? (
            isMobile ? (
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.5)",
                  textAlign: "center",
                  padding: "20px 0",
                }}
              >
                Tap a sector above to explore how transport amplifies its impact
              </p>
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
                {pathways[activeNode].pathLabel.split(" → ").map((seg, si, arr) => (
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
                    {pathways[activeNode].impact}
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
                      {pathways[activeNode].multiplier}
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
                      {pathways[activeNode].synergies.map((s, si) => (
                        <div
                          key={si}
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
                      {pathways[activeNode].bridgeVentures.map((v, vi) => (
                        <div
                          key={vi}
                          style={{
                            backgroundColor: "rgba(184, 217, 53, 0.1)",
                            border: "1px solid rgba(184, 217, 53, 0.15)",
                            padding: "14px 18px",
                            borderRadius: "12px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
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
                      Explore {pathways[activeNode].name} Sector <span>→</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile toggle */}
              {isMobile && !showMoreRipple && (
                <button
                  onClick={() => setShowMoreRipple(true)}
                  style={{
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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  Show more details
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              )}
              {isMobile && showMoreRipple && (
                <button
                  onClick={() => setShowMoreRipple(false)}
                  style={{
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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  Show less
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transform: "rotate(180deg)" }}
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
// 8. INVESTMENT THESIS — Audience-Based (bg: background)
// ============================================================================

const InvestmentThesisSection = () => {
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
        detail: "Cold chain, fleet management, and load matching with proven demand and rapid revenue paths",
      },
      {
        label: "Tier 2 Ventures",
        value: "10-18%",
        detail: "Pharmaceutical cold chain, vehicle financing, and warehousing with strong asset value fundamentals",
      },
      {
        label: "Portfolio IRR",
        value: "12-22%",
        detail: "Blended returns across 19 ventures with risk-adjusted modeling and tiered deployment strategy",
      },
      {
        label: "Dev. Leverage",
        value: "3-5x",
        detail: "Every dollar deployed generates $3-5 in local economic activity via transport multipliers",
      },
    ],
    timeline: [
      {
        label: "Phase 1 (Q1-Q2)",
        value: "Foundation",
        detail: "Cold Chain Ghana pilot, Logistics Training Academy launch, Fleet Management MVP deployment",
      },
      {
        label: "Phase 2 (Q3-Q4)",
        value: "Scale",
        detail: "Load matching platform scaling, pharmaceutical cold chain, cross-border services initiation",
      },
      {
        label: "Phase 3 (2027+)",
        value: "Expansion",
        detail: "Boankra Port integration, rail logistics connectivity, regional hub development and replication",
      },
      {
        label: "Exit Horizon",
        value: "5-7 yrs",
        detail: "Staged liquidity via asset sales, fleet recapitalization, or concession model transitions",
      },
    ],
    impact: [
      {
        label: "Farmers Served",
        value: "50K+",
        detail: "Smallholder farmers connected to markets through cold chain and collection networks",
      },
      {
        label: "Jobs Created",
        value: "800+",
        detail: "Direct employment across cold chain operations, fleet management, and training academy",
      },
      {
        label: "Operators Reached",
        value: "5K+",
        detail: "Truck operators formalized and connected through load matching and fleet management tools",
      },
      {
        label: "Spoilage Reduced",
        value: "40%",
        detail: "Post-harvest loss reduction through solar cold storage and refrigerated transport networks",
      },
    ],
  };

  const audiences = [
    {
      key: "entrepreneur",
      label: "Entrepreneur",
      shortLabel: "Founder",
      icon: <IconStorefront />,
      headline: "Build Logistics Ventures That Serve Communities",
      pitch:
        "BRIDGE provides validated venture models, union partnerships, and working capital strategies so you can launch logistics businesses with de-risked market entry and clear paths to profitability.",
      stats: [
        { value: "19", label: "Venture Paths", detail: "validated models" },
        { value: "5K+", label: "Operators", detail: "addressable market" },
        { value: "Full", label: "BRIDGE Support", detail: "incubation to scale" },
      ],
      pathways: [
        {
          bring: "Local knowledge & operator relationships",
          get: "BRIDGE provides venture blueprints, financial models, and go/no-go frameworks",
        },
        {
          bring: "Union trust & community credibility",
          get: "Access to anchor clients, government partnerships, and working capital facilities",
        },
        {
          bring: "Execution commitment & accountability",
          get: "Technical assistance, cold chain technology, and scale-up support through Phase 3",
        },
      ],
    },
    {
      key: "business",
      label: "Business Entity",
      shortLabel: "Business",
      icon: <IconOfficeBuilding />,
      headline: "Anchor Your Supply Chain in Ghana's Growth",
      pitch:
        "Partner with BRIDGE to secure reliable logistics infrastructure for your operations — from cold chain to last-mile delivery — while contributing to development outcomes that strengthen your market.",
      stats: [
        { value: "$14-26M", label: "Capital Range", detail: "across 19 ventures" },
        { value: "9\u00D7", label: "Cost Gap", detail: "vs global average" },
        { value: "32M+", label: "Addressable", detail: "citizens to serve" },
      ],
      pathways: [
        {
          bring: "Procurement commitments & volume guarantees",
          get: "Priority access to cold chain services and preferential logistics pricing",
        },
        {
          bring: "Technical expertise & fleet assets",
          get: "Co-development opportunities in logistics platforms and distribution networks",
        },
        {
          bring: "CSR alignment & ESG commitments",
          get: "Impact reporting, emissions tracking, and community engagement documentation",
        },
      ],
    },
    {
      key: "investor",
      label: "Investor",
      shortLabel: "Investor",
      icon: <IconTrendingUp />,
      headline: "Logistics Assets With Impact Returns",
      pitch:
        "Deploy capital into physical logistics assets with transparent governance, compounding revenue streams, and measurable development outcomes — backed by government partnerships and market demand.",
      stats: [
        { value: "12-22%", label: "Target IRR", detail: "blended portfolio" },
        { value: "2.5x", label: "Multiple", detail: "capital appreciation" },
        { value: "18-24mo", label: "First Cash", detail: "revenue timeline" },
      ],
      pathways: [
        {
          bring: "Growth capital & patient deployment",
          get: "Asset-backed returns with fleet and cold chain collateral plus clear exit pathways",
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
      headline: "Deliver Logistics Without Fiscal Strain",
      pitch:
        "BRIDGE ventures align directly with Connect24 logistics priorities — delivering cold chain, fleet modernization, and trade facilitation through private capital while creating jobs and reducing costs.",
      stats: [
        { value: "800+", label: "Jobs Created", detail: "direct employment" },
        { value: "95%", label: "Private Capital", detail: "no fiscal burden" },
        { value: "3-5x", label: "Tax Multiplier", detail: "economic activity" },
      ],
      pathways: [
        {
          bring: "Policy alignment & regulatory support",
          get: "Private logistics delivery that meets Connect24 and 24-Hour Economy targets",
        },
        {
          bring: "Land access & corridor facilitation",
          get: "Job creation, trade facilitation, and improved supply chain efficiency for citizens",
        },
        {
          bring: "Community endorsement & legitimacy",
          get: "Transparent reporting on development outcomes and constituency impact data",
        },
      ],
    },
  ];

  const activeAudienceData = audiences[activeAudience];

  return (
    <section style={{ backgroundColor: colors.background, padding: isMobile ? "60px 0" : "100px 80px" }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        <div
          style={{
            textAlign: isMobile ? "center" : "left",
            marginBottom: isMobile ? "32px" : "48px",
            padding: isMobile ? "0 20px" : 0,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
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
              backgroundColor: colors.white,
            }}
          >
            Investment Opportunity
          </div>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
              color: colors.primary,
              margin: isMobile ? "0 auto 16px" : "0 0 16px",
              maxWidth: "820px",
            }}
          >
            Every <span style={{ fontWeight: "600" }}>Stakeholder</span> Has a Role in{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Ghana's Logistics Transformation</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              color: "#666",
              lineHeight: "1.65",
              margin: isMobile ? "0 auto" : "0",
              maxWidth: "700px",
              ...(isMobile
                ? { display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }
                : {}),
            }}
          >
            Investment isn't only capital — it's expertise, partnerships, policy, and vision. See how your role
            contributes to 19 ventures across $14-26M in opportunity.
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
                      backgroundColor: isActive ? colors.accentLight : colors.background,
                      border: isActive ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                      color: isActive ? colors.primary : "#999",
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
                    style={{ display: "flex", color: isActive ? colors.primary : "#999", transition: "all 0.25s ease" }}
                  >
                    {aud.icon}
                  </span>
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
                }}
              >
                {activeAudienceData.pitch}
              </p>
            )}
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
                    padding: isMobile ? "10px 14px" : "12px 16px",
                    backgroundColor: colors.white,
                    borderRadius: "10px",
                    border: `1px solid ${colors.line}`,
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1, overflow: "hidden" }}>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: isMobile ? "11px" : "12px",
                        fontWeight: "600",
                        color: colors.primary,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {path.bring}
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: isMobile ? "11px" : "12px",
                        color: "#777",
                        lineHeight: "1.4",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {path.get}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                padding: isMobile ? "12px 14px" : "14px 18px",
                backgroundColor: "rgba(27, 77, 62, 0.06)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div style={{ color: colors.primary, flexShrink: 0, display: "flex" }}>
                <IconCheck />
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: isMobile ? "11px" : "13px",
                  color: "#444",
                  lineHeight: "1.4",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <strong style={{ color: colors.primary }}>Ministry of Transport</strong> partnership framework for
                Connect24 logistics alignment
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
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
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
                      flex: 1,
                      minHeight: isMobile ? "auto" : "0",
                    }}
                  >
                    <div style={{ width: isMobile ? "90px" : "110px", flexShrink: 0 }}>
                      <div
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: isMobile ? "18px" : "20px",
                          fontWeight: "700",
                          color: colors.accent,
                          lineHeight: "1.1",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
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

// ============================================================================
// METRIC ROW COMPONENT (extracted to avoid hook-in-loop violation)
// ============================================================================

const useCounter = (target, duration = 1200, active = true) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    const num = parseFloat(String(target).replace(/[^0-9.]/g, ""));
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
  }, [target, active]);
  return count;
};

const formatValue = (val, item) => {
  const num = typeof val === "number" ? val : parseFloat(val);
  if (isNaN(num)) return val;
  const formatted = num >= 1000 ? Math.round(num).toLocaleString() : num % 1 !== 0 ? num.toFixed(1) : Math.round(num);
  return `${item.prefix || ""}${formatted}${item.unit || ""}`;
};

const MetricRow = ({ item, idx, animate, isMobile }) => {
  const count = useCounter(item.value, 1200, animate);
  return (
    <div
      style={{
        display: isMobile ? "flex" : "grid",
        flexDirection: isMobile ? "column" : undefined,
        gridTemplateColumns: isMobile ? undefined : "200px 1fr 200px",
        gap: isMobile ? "8px" : "32px",
        padding: isMobile ? "16px 20px" : "24px 28px",
        backgroundColor: idx % 2 === 0 ? colors.white : "transparent",
        opacity: animate ? 1 : 0,
        transition: `opacity 0.4s ease ${idx * 0.08}s`,
      }}
    >
      {isMobile ? (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "4px", flexWrap: "nowrap" }}>
              <span
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "24px",
                  fontWeight: "700",
                  color: colors.primary,
                  letterSpacing: "-1px",
                  whiteSpace: "nowrap",
                }}
              >
                {formatValue(count, item)}
              </span>
              {item.context && (
                <span
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: "500", color: "#888" }}
                >
                  {item.context}
                </span>
              )}
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px", flexShrink: 0 }}
            >
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "9px",
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
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10px",
                  fontWeight: "600",
                  color: colors.primary,
                  whiteSpace: "nowrap",
                }}
              >
                {item.ventures}
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                fontWeight: "700",
                color: colors.primary,
                marginBottom: "2px",
              }}
            >
              {item.label}
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#666", lineHeight: "1.45" }}>
              {item.description}
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "4px", flexWrap: "nowrap" }}>
              <span
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "28px",
                  fontWeight: "700",
                  color: colors.primary,
                  letterSpacing: "-1px",
                  whiteSpace: "nowrap",
                }}
              >
                {formatValue(count, item)}
              </span>
              {item.context && (
                <span
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: "500", color: "#888" }}
                >
                  {item.context}
                </span>
              )}
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
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
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "15px",
                fontWeight: "700",
                color: colors.primary,
                marginBottom: "4px",
              }}
            >
              {item.label}
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#666", lineHeight: "1.5" }}>
              {item.description}
            </div>
          </div>
          <div
            style={{
              backgroundColor: idx % 2 === 0 ? colors.background : "rgba(27,77,62,0.04)",
              borderRadius: "10px",
              padding: "10px 16px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
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
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
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
  );
};

// ============================================================================
// 9. THE IMPACT — Dual-Lens Dashboard (bg: white)
// ============================================================================

const ImpactSection = () => {
  const isMobile = useIsMobile();
  const [view, setView] = useState("metrics");
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeStakeholder, setActiveStakeholder] = useState(0);
  const [animate, setAnimate] = useState(true);

  const switchView = (v) => {
    setAnimate(false);
    setView(v);
    setTimeout(() => setAnimate(true), 50);
  };
  const switchCategory = (idx) => {
    setAnimate(false);
    setActiveCategory(idx);
    setTimeout(() => setAnimate(true), 50);
  };

  const metrics = [
    {
      category: "Economic",
      items: [
        {
          label: "Sector GDP Contribution",
          value: 6,
          unit: "%",
          context: "of GDP",
          prefix: "",
          description: "Transport sector share of national GDP, serving as connective tissue for all commerce",
          trend: "Baseline",
          ventures: "All Ventures",
        },
        {
          label: "Post-Harvest Losses",
          value: 1.9,
          unit: "B",
          context: "annual",
          prefix: "$",
          description: "Perishable losses from absent cold chain — the single largest addressable gap",
          trend: "At risk",
          ventures: "Cold Chain · Ag Collection",
        },
        {
          label: "Cold Chain Revenue Gap",
          value: 900,
          unit: "M",
          context: "potential",
          prefix: "$",
          description: "Domestic cold chain services market currently served by fragmented informal operators",
          trend: "Capture gap",
          ventures: "Cold Chain · Pharma Chain",
        },
        {
          label: "Development Multiplier",
          value: 3,
          unit: "-5x",
          context: "",
          prefix: "",
          description: "Each dollar in logistics infrastructure generates $3-5 in local economic activity",
          trend: "Multiplier",
          ventures: "All Ventures",
        },
      ],
    },
    {
      category: "People",
      items: [
        {
          label: "Direct Beneficiaries",
          value: 100,
          unit: "K+",
          context: "citizens",
          prefix: "",
          description: "Farmers, operators, traders, and communities served across 19 ventures",
          trend: "Target",
          ventures: "All Ventures",
        },
        {
          label: "Jobs Created",
          value: 800,
          unit: "+",
          context: "",
          prefix: "",
          description: "Direct employment across cold chain, fleet operations, training, and platforms",
          trend: "Growing",
          ventures: "All Ventures",
        },
        {
          label: "Truck Operators",
          value: 5,
          unit: "K+",
          context: "reached",
          prefix: "",
          description: "Informal operators formalized through fleet management and load matching tools",
          trend: "High priority",
          ventures: "Fleet Mgmt · Load Match",
        },
        {
          label: "Trainees Certified",
          value: 2000,
          unit: "+",
          context: "",
          prefix: "",
          description: "Cold chain technicians, fleet managers, and coordinators trained annually",
          trend: "Near-term",
          ventures: "Training Academy",
        },
      ],
    },
    {
      category: "Returns",
      items: [
        {
          label: "Portfolio IRR Range",
          value: 12,
          unit: "-22%",
          context: "",
          prefix: "",
          description: "Blended returns across 19 ventures with tiered risk-return profiles",
          trend: "Target range",
          ventures: "All Ventures",
        },
        {
          label: "Tier 1 Returns",
          value: 15,
          unit: "-25%",
          context: "",
          prefix: "",
          description: "Flagship ventures with proven demand: cold chain, fleet management, load matching",
          trend: "High priority",
          ventures: "Cold Chain · Fleet · Load Match",
        },
        {
          label: "First Cash Timeline",
          value: 18,
          unit: "-24mo",
          context: "",
          prefix: "",
          description: "Revenue generation timeline from deployment to first distribution",
          trend: "Near-term",
          ventures: "Tier 1 Ventures",
        },
        {
          label: "Total Capital Range",
          value: 14,
          unit: "-26M",
          context: "",
          prefix: "$",
          description: "Across all 19 identified ventures from flagship to strategic horizon",
          trend: "Phased",
          ventures: "All Ventures",
        },
      ],
    },
  ];

  const stakeholders = [
    {
      title: "The Operator",
      subtitle: "Drivers, fleet owners & logistics operators",
      outcomes: [
        "Cold storage access at production and market points",
        "Fleet management tools reducing costs 20-30%",
        "Load matching eliminating 30-50% empty backhauls",
        "Formalization pathway with financing and technology access",
      ],
      stat: "5K+",
      statLabel: "operators empowered",
      highlight: "From informal to investable in 18 months",
    },
    {
      title: "The Institution",
      subtitle: "Businesses, exporters & agricultural processors",
      outcomes: [
        "Reliable cold chain from farm to port and processor",
        "Warehousing with digital inventory management",
        "Cross-border facilitation reducing border delays",
        "Last-mile delivery reaching underserved markets",
      ],
      stat: "9\u00D7",
      statLabel: "cost efficiency opportunity",
      highlight: "Supply chain costs from 9x to competitive",
    },
    {
      title: "The Government",
      subtitle: "Ministries, agencies & district assemblies",
      outcomes: [
        "Connect24 implementation through private capital",
        "Boankra Inland Port service readiness",
        "Job creation across cold chain and fleet operations",
        "Trade facilitation strengthening AfCFTA position",
      ],
      stat: "4",
      statLabel: "flagship policy alignments",
      highlight: "Connect24 delivered without fiscal strain",
    },
    {
      title: "The Investor",
      subtitle: "Impact, institutional & development capital",
      outcomes: [
        "$14-26M across 19 identified ventures",
        "Asset-backed returns with fleet and cold chain collateral",
        "Tiered deployment from flagship through strategic horizon",
        "Development multiplier amplifying portfolio impact",
      ],
      stat: "12-22%",
      statLabel: "target IRR range",
      highlight: "Physical assets with measurable impact",
    },
  ];

  const currentMetrics = metrics[activeCategory];
  const currentStakeholder = stakeholders[activeStakeholder];

  return (
    <section style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "left", marginBottom: isMobile ? "24px" : "40px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
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
              backgroundColor: colors.white,
            }}
          >
            The Impact
          </div>
          <h2
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
              color: colors.primary,
              margin: "0 0 12px",
              maxWidth: "820px",
            }}
          >
            What Changes When <span style={{ fontWeight: "600" }}>Transport</span>
            {isMobile ? " " : <br />}
            <span style={{ fontWeight: "600" }}>Networks</span>{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Work</span>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "16px",
              color: "#555",
              lineHeight: "1.7",
              margin: "0",
              maxWidth: "680px",
            }}
          >
            When goods move efficiently, transit systems serve workers, and logistics costs fall — the ripple effects
            connect producers to markets, reduce consumer prices, and accelerate commerce across Ghana.
          </p>
        </div>

        {/* Controls Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "6px" : "16px",
            marginBottom: "24px",
            flexWrap: "nowrap",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              border: `1px solid ${colors.line}`,
              borderRadius: "50px",
              backgroundColor: colors.background,
              padding: "4px",
              flexShrink: 0,
            }}
          >
            {["metrics", "stakeholder"].map((v) => (
              <button
                key={v}
                onClick={() => switchView(v)}
                style={{
                  padding: isMobile ? "5px 10px" : "6px 16px",
                  borderRadius: "50px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: isMobile ? "11px" : "12px",
                  fontWeight: view === v ? "700" : "500",
                  backgroundColor: view === v ? colors.white : "transparent",
                  color: view === v ? colors.primary : "#999",
                  boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {v === "metrics" ? (isMobile ? "Metric" : "By Metric") : isMobile ? "Stakeholder" : "By Stakeholder"}
              </button>
            ))}
          </div>
          {!isMobile && <div style={{ width: "1px", height: "24px", backgroundColor: colors.line }} />}
          <div style={{ display: "flex", gap: isMobile ? "6px" : "8px", flexShrink: 0 }}>
            {view === "metrics"
              ? metrics.map((m, i) => (
                  <button
                    key={m.category}
                    onClick={() => switchCategory(i)}
                    style={{
                      padding: isMobile ? "5px 10px" : "6px 16px",
                      borderRadius: "50px",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: isMobile ? "11px" : "12px",
                      fontWeight: activeCategory === i ? "700" : "500",
                      backgroundColor: activeCategory === i ? colors.accentLight : "transparent",
                      border: activeCategory === i ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                      color: activeCategory === i ? colors.primary : "#999",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {m.category}
                  </button>
                ))
              : stakeholders.map((s, i) => (
                  <button
                    key={s.title}
                    onClick={() => setActiveStakeholder(i)}
                    style={{
                      padding: isMobile ? "5px 10px" : "6px 16px",
                      borderRadius: "50px",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: isMobile ? "11px" : "12px",
                      fontWeight: activeStakeholder === i ? "700" : "500",
                      backgroundColor: activeStakeholder === i ? colors.accentLight : "transparent",
                      border: activeStakeholder === i ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                      color: activeStakeholder === i ? colors.primary : "#999",
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

        {/* Content */}
        {view === "metrics" ? (
          <div
            style={{
              backgroundColor: colors.background,
              borderRadius: "20px",
              border: `2px solid ${colors.primary}`,
              overflow: "hidden",
            }}
          >
            {currentMetrics.items.map((item, idx) => (
              <MetricRow key={`${activeCategory}-${idx}`} item={item} idx={idx} animate={animate} isMobile={isMobile} />
            ))}
          </div>
        ) : (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: isMobile ? "flex-start" : "flex-start",
                marginBottom: "24px",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "12px" : "0",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: isMobile ? "24px" : "28px",
                    fontWeight: "700",
                    color: colors.primary,
                  }}
                >
                  {currentStakeholder.title}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#888" }}>
                  {currentStakeholder.subtitle}
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
                  }}
                >
                  {currentStakeholder.stat}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#888" }}>
                  {currentStakeholder.statLabel}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "24px" }}>
              {currentStakeholder.outcomes.map((o, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "14px 20px",
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
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "12px",
                        fontWeight: "700",
                        color: colors.primary,
                      }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <span
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "#333", lineHeight: "1.5" }}
                  >
                    {o}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                padding: isMobile ? "14px 18px" : "16px 24px",
                backgroundColor: colors.primary,
                borderRadius: "12px",
                display: "flex",
                alignItems: isMobile ? "flex-start" : "center",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "8px" : "0",
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
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
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "rgba(255,255,255,0.85)",
                  marginLeft: isMobile ? "0" : "16px",
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
// 10. CTA — BE PART OF THE JOURNEY (bg: primary)
// ============================================================================

const FinalCTASection = () => {
  const isMobile = useIsMobile();
  return (
    <section
      style={{ backgroundColor: colors.primary, padding: isMobile ? "60px 20px" : "100px 80px", textAlign: "center" }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 20px",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "50px",
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "2px",
            color: colors.accent,
            fontFamily: "Inter, sans-serif",
            textTransform: "uppercase",
            marginBottom: "24px",
            backgroundColor: "rgba(255,255,255,0.08)",
          }}
        >
          Be Part of the Journey
        </div>
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
          Let's Build Ghana's <span style={{ color: colors.accent, fontWeight: "600" }}>Logistics Future</span>
        </h2>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "16px" : "18px",
            lineHeight: "1.7",
            color: "rgba(255,255,255,0.6)",
            margin: "0 auto 40px",
            maxWidth: "680px",
          }}
        >
          Whether you're an investor, operator, or government partner, there's a seat at the table in building Ghana's
          logistics future.
        </p>
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "stretch" : "center",
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
// CTA → FOOTER SEPARATOR (NOT part of Footer component)
// ============================================================================

const CTAFooterSeparator = () => (
  <div style={{ backgroundColor: colors.primary, padding: "0 80px" }}>
    <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)" }} />
  </div>
);

// ============================================================================
// FOOTER SECTOR GRID (12 items, production labels)
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
              href={sectorRoutes[sector.key] ?? "#"}
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

// ============================================================================
// SOCIAL ICONS (fill="currentColor", parent controls color)
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
// FOOTER (Production version — mobile + desktop + lime bar)
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
                         href={footerLinkHref(link)}
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

export default function TransportationLogisticsSectorPage() {
  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        margin: 0,
        padding: 0,
        backgroundColor: colors.white,
        overflowX: "hidden",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Poppins:wght@700;800&display=swap"
        rel="stylesheet"
      />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-8px); } 60% { transform: translateY(-4px); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; height: 0; }
        .cta-btn-arrow { transition: none; }
        .cta-btn-arrow svg { transition: none; }
        .cta-primary { transition: none; }
        .cta-lime-swap { transition: none; }
        .cta-secondary { transition: none; }
      `}</style>
      <SiteHeader />
      <HeroSection sector={sectorData} />
      <OpportunitySection />
      <ProcessSection />
      <PathwaySection sector={sectorData} />
      <LandscapeSection sector={sectorData} />
      <GovernanceSection />
      <RippleEffectSection />
      <InvestmentThesisSection />
      <ImpactSection />
      <FinalCTASection />
      <CTAFooterSeparator />
      <Footer />
    </div>
  );
}
