import React, { useState, useEffect } from "react";

// BRIDGE Design System - Consistent with Homepage
const colors = {
  primary: "#1B4D3E", // Dark Green
  accent: "#B8D935", // Lime
  background: "#F3F5F2", // Off-white
  white: "#FFFFFF",
  dark: "#191919", // Near black
  line: "#DEDEDE",
  lightGreen: "#3D4F4F", // Gray-green (image placeholder bg)
};

// Layout Constants
const CONTENT_MAX_WIDTH = "1200px";

// ═══════════════════════════════════════════════
// SECTOR ICONS DATA FOR FOOTER WIDGET
// ═══════════════════════════════════════════════
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
    label: "Financial Inclusion & Economic Security",
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
    label: "Health Systems & Wellbeing",
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
        <path d="M15 2v2" />
        <path d="M15 20v2" />
        <path d="M2 15h2" />
        <path d="M2 9h2" />
        <path d="M20 15h2" />
        <path d="M20 9h2" />
        <path d="M9 2v2" />
        <path d="M9 20v2" />
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
    label: "Sports, Entertainment & Creative",
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
    label: "Energy & Renewable Resources",
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
    label: "Manufacturing & Light Industry",
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
        <path d="M17 18h1" />
        <path d="M12 18h1" />
        <path d="M7 18h1" />
      </svg>
    ),
  },
  {
    key: "transport",
    label: "Transportation & Logistics",
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

// 4 Services Data - Enhanced for focused view
const servicesData = [
  {
    id: "research",
    number: "01",
    title: "Research",
    subtitle: "Sector Analysis",
    headline: "Understanding What's Actually Broken",
    description:
      "Before proposing solutions, we diagnose root causes. We map value chains, quantify pain points, and trace problems to their origins. Every intervention starts with evidence—not assumptions.",
    features: [
      { label: "PRECEDE-PROCEED Framework", detail: "Systematic diagnosis methodology" },
      { label: "Stakeholder Pain Point Analysis", detail: "Quantified impact on citizens" },
      { label: "Competitive Landscape Mapping", detail: "Who's already working, where are gaps" },
      { label: "Opportunity Prioritization Matrix", detail: "Evidence-based ranking system" },
    ],
    stats: [
      { value: "12", label: "Sectors Analyzed" },
      { value: "7,000+", label: "Words Per Analysis" },
      { value: "174+", label: "Solutions Identified" },
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="1" />
      </svg>
    ),
  },
  {
    id: "ventures",
    number: "02",
    title: "Ventures",
    subtitle: "Development",
    headline: "Structuring Solutions That Fix Systems",
    description:
      "We don't treat symptoms—we address root causes. Each initiative is built around measurable outcomes, clear accountability, and a sustainable path forward. From concept to pilot to scale.",
    features: [
      { label: "BRIDGE Impact Score™", detail: "Rigorous opportunity assessment" },
      { label: "Go/No-Go Decision Gates", detail: "Disciplined investment process" },
      { label: "Pilot-to-Scale Pathways", detail: "Structured growth methodology" },
      { label: "Local Partnership Integration", detail: "Building on existing strengths" },
    ],
    stats: [
      { value: "174+", label: "Solutions Identified" },
      { value: "4", label: "Stage Gates" },
      { value: "80+", label: "Scoring Threshold" },
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    id: "investment",
    number: "03",
    title: "Investment",
    subtitle: "Capital Deployment",
    headline: "Matching the Right Capital to the Right Problems",
    description:
      "Blended finance structures that work. We orchestrate multiple capital streams—DFI, diaspora, commercial, concessional—each deployed where it creates genuine value for Ghana-defined priorities.",
    features: [
      { label: "Blended Finance Structures", detail: "Risk-appropriate capital stacking" },
      { label: "DFI Co-Investment", detail: "Partnership with development institutions" },
      { label: "Three-Tier Impact Measurement", detail: "Outcomes over outputs" },
      { label: "Risk-Adjusted Returns", detail: "8-15% target IRR" },
    ],
    stats: [
      { value: "$135-259M", label: "Portfolio Potential" },
      { value: "8-15%", label: "Target IRR" },
      { value: "12", label: "Diversified Sectors" },
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v20" />
        <path d="M12 12h10" />
      </svg>
    ),
  },
  {
    id: "partnerships",
    number: "04",
    title: "Partnerships",
    subtitle: "Brokering",
    headline: "Connecting Resources to Ghana-Defined Priorities",
    description:
      "We bridge the gap between policy and implementation. Connecting government priorities with development partners, local enterprise with impact investors—creating alignment that enables execution.",
    features: [
      { label: "24-Hour Economy Alignment", detail: "Direct policy integration" },
      { label: "GH₵150B+ Budget Alignment", detail: "Government investment mapping" },
      { label: "Multi-Stakeholder Coordination", detail: "Orchestrating diverse resources" },
      { label: "Policy-to-Implementation Bridge", detail: "From commitment to action" },
    ],
    stats: [
      { value: "GH₵150B+", label: "Budget Aligned" },
      { value: "7", label: "Policy Pillars" },
      { value: "260+", label: "Districts Reached" },
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    id: "advisory",
    number: "05",
    title: "Advisory",
    subtitle: "Capacity Building",
    headline: "Building the Systems That Outlast Us",
    description:
      "Sustainable impact requires local capacity. We provide technical assistance, governance frameworks, and knowledge transfer that strengthens institutions—so solutions endure beyond any single initiative.",
    features: [
      { label: "Institutional Strengthening", detail: "Governance and operational frameworks" },
      { label: "Technical Assistance Programs", detail: "Embedded expertise transfer" },
      { label: "M&E System Design", detail: "Measurement that drives learning" },
      { label: "Knowledge Transfer Protocols", detail: "Building lasting local capability" },
    ],
    stats: [
      { value: "50+", label: "Local Partners" },
      { value: "12", label: "Sector Frameworks" },
      { value: "3yr", label: "Sustainability Horizon" },
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
];

// 12 Sectors Data
const sectorsData = [
  {
    id: 1,
    name: "Infrastructure & Basic Services",
    shortName: "Infrastructure",
    problem:
      "Markets without proper facilities. Communities without reliable water. Waste overwhelming systems. Service delivery failing.",
    focus: "Market modernization, water systems, waste management, digital infrastructure",
    capitalLow: 8,
    capitalHigh: 15,
    ventures: 15,
    keyStats: ["GH₵2.2B+ market allocation", "260+ districts", "Kejetia digitization pilot"],
  },
  {
    id: 2,
    name: "Financial Inclusion & Security",
    shortName: "Financial",
    problem:
      "$4-6 billion SME credit gap. 40% of adults financially excluded. Traders operating in cash. No insurance for informal workers.",
    focus: "Digital credit, SME finance, microinsurance, savings products, remittance optimization",
    capitalLow: 10,
    capitalHigh: 20,
    ventures: 18,
    keyStats: ["$4-6B credit gap", "40% excluded", "~1% insurance penetration"],
  },
  {
    id: 3,
    name: "Health Systems & Services",
    shortName: "Health",
    problem:
      "1 doctor per 6,000 citizens. 56% of doctors abroad. 500 nurses leaving monthly. Drug stockouts. Overwhelmed facilities.",
    focus: "Telemedicine, pharmaceutical distribution, diagnostic services, workforce retention",
    capitalLow: 8,
    capitalHigh: 16,
    ventures: 15,
    keyStats: ["1:6,000 physician ratio", "56% brain drain", "500 nurses/month emigrate"],
  },
  {
    id: 4,
    name: "Technology & Innovation",
    shortName: "Technology",
    problem:
      "Digital divide between urban and rural. Startup funding gaps forcing relocation. Brain drain of tech talent.",
    focus: "Enabling platforms, connectivity expansion, startup ecosystem support",
    capitalLow: 8,
    capitalHigh: 15,
    ventures: 15,
    keyStats: ["20M+ mobile money users", "GhIPSS infrastructure", "Ghana Card integration"],
  },
  {
    id: 5,
    name: "Education & Skills Development",
    shortName: "Education",
    problem:
      "65%+ SME owners lack management training. TVET chronically underfunded. Graduate skills don't match employer needs.",
    focus: "TVET infrastructure, skills certification, workforce development, digital academies",
    capitalLow: 16.5,
    capitalHigh: 33.5,
    ventures: 15,
    keyStats: ["65%+ skills gap", "Free TVET program", "Aspire24 policy alignment"],
  },
  {
    id: 6,
    name: "Agriculture & Value Chains",
    shortName: "Agriculture",
    problem:
      "$1.9 billion annual post-harvest losses. 30-40% of harvests wasted. No cold chain. Middlemen capture value.",
    focus: "Processing facilities, storage infrastructure, cold chain, market linkages, cooperative strengthening",
    capitalLow: 12,
    capitalHigh: 22,
    ventures: 18,
    keyStats: ["$1.9B annual losses", "30-40% waste", "<5% ag lending"],
  },
  {
    id: 7,
    name: "Entertainment & Creative Industries",
    shortName: "Creative",
    problem: "Informal sector dominance. Intellectual property unprotected. Talent undeveloped. Value captured abroad.",
    focus: "Formalization, IP protection, talent development, local content infrastructure",
    capitalLow: 10,
    capitalHigh: 20.5,
    ventures: 14,
    keyStats: ["80% informal", "IP gaps", "Export potential"],
  },
  {
    id: 8,
    name: "Housing & Real Estate",
    shortName: "Housing",
    problem:
      "1.8 million unit deficit. Only 2% of land titled. 60,000+ land disputes pending. Mortgages at 25-37% interest.",
    focus: "Affordable housing, land title systems, construction finance, diaspora housing products",
    capitalLow: 15,
    capitalHigh: 25,
    ventures: 11,
    keyStats: ["1.8M unit deficit", "2% titled", "60K+ disputes"],
  },
  {
    id: 9,
    name: "Tourism & Hospitality",
    shortName: "Tourism",
    problem:
      "Infrastructure gaps at destinations. Seasonal volatility. Skills shortages. Revenue leaking to international operators.",
    focus: "Destination development, hospitality training, eco-tourism, heritage tourism",
    capitalLow: 10,
    capitalHigh: 18,
    ventures: 13,
    keyStats: ["Heritage assets", "Skills gaps", "Leakage reduction"],
  },
  {
    id: 10,
    name: "Energy & Renewable Resources",
    shortName: "Energy",
    problem:
      "Reliability gaps disrupting business. Rural communities without access. Health impacts from cooking fuels.",
    focus: "Solar deployment, mini-grids, clean cooking solutions, energy efficiency",
    capitalLow: 12,
    capitalHigh: 22,
    ventures: 14,
    keyStats: ["Rural access gaps", "Clean cooking need", "Reliability issues"],
  },
  {
    id: 11,
    name: "Manufacturing & Light Industry",
    shortName: "Manufacturing",
    problem: "30-40% capacity utilization. Import dependence despite local potential. Weak supply chains.",
    focus: "Agro-processing, textile revival, pharmaceutical manufacturing, local supply chains",
    capitalLow: 15,
    capitalHigh: 30,
    ventures: 14,
    keyStats: ["30-40% utilization", "Import dependence", "3 garment factories planned"],
  },
  {
    id: 12,
    name: "Transportation & Logistics",
    shortName: "Transport",
    problem: "Distribution inefficiency. No cold chain infrastructure. Last-mile gaps. Fleet underutilization.",
    focus: "Cold chain network, logistics platforms, fleet management, last-mile delivery",
    capitalLow: 10,
    capitalHigh: 22,
    ventures: 14,
    keyStats: ["No cold chain", "Last-mile gaps", "GH₵4.3B roads budget"],
  },
];

// Cross-sector integration examples
const integrationExamples = [
  {
    title: "Farm to Fork",
    flow: ["Agriculture", "Manufacturing", "Transportation", "Infrastructure", "Financial"],
    description: "Production → Processing → Cold Chain → Markets → Credit",
  },
  {
    title: "Healthcare Delivery",
    flow: ["Health", "Manufacturing", "Transportation", "Financial"],
    description: "Facilities → Pharmaceuticals → Distribution → Insurance",
  },
  {
    title: "Skills to Jobs",
    flow: ["Education", "Technology", "Manufacturing", "Financial"],
    description: "Training → Digital Skills → Employment → Enterprise Credit",
  },
];

// ============================================
// SECTOR ICONS - Inline SVGs
// ============================================
// SECTOR ICON COMPONENTS (Matching Footer Icons)
// ============================================
const IconBuilding = () => (
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
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
  </svg>
);

const IconWallet = () => (
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
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
);

const IconHeart = () => (
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
);

const IconCpu = () => (
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

const IconGraduation = () => (
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
    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
    <path d="M22 10v6" />
    <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
  </svg>
);

const IconWheat = () => (
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

const IconMusic = () => (
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
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

const IconHome = () => (
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
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const IconPlane = () => (
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
    <path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" />
    <path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" />
    <path d="M10 20h4" />
    <circle cx="16" cy="20" r="2" />
    <circle cx="8" cy="20" r="2" />
  </svg>
);

const IconZap = () => (
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
    <path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
    <path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1" />
    <path d="m11 7-3 5h4l-3 5" />
    <line x1="22" x2="22" y1="11" y2="13" />
  </svg>
);

const IconFactory = () => (
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
    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M17 18h1" />
    <path d="M12 18h1" />
    <path d="M7 18h1" />
  </svg>
);

const IconTruck = () => (
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
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
  </svg>
);

// ============================================
// FLOATING SECTOR CARD COMPONENT
// ============================================
const FloatingSectorCard = ({ sector, icon }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        flex: "1",
        maxWidth: "200px",
        backgroundColor: isHovered ? colors.accent : "rgba(255,255,255,0.95)",
        borderRadius: "16px",
        padding: "18px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: isHovered ? "0 16px 48px rgba(0,0,0,0.25)" : "0 4px 24px rgba(0,0,0,0.12)",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "44px",
          height: "44px",
          backgroundColor: isHovered ? colors.primary : colors.background,
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "12px",
          color: isHovered ? colors.accent : colors.primary,
          transition: "all 0.3s ease",
        }}
      >
        {icon}
      </div>

      {/* Sector Name */}
      <div
        style={{
          fontSize: "13px",
          fontWeight: "600",
          color: colors.primary,
          fontFamily: "Inter, sans-serif",
          marginBottom: "4px",
          lineHeight: "1.3",
        }}
      >
        {sector.shortName}
      </div>

      {/* Solutions Count */}
      <div
        style={{
          fontSize: "12px",
          color: isHovered ? colors.primary : "#666",
          fontFamily: "Inter, sans-serif",
          opacity: isHovered ? 0.7 : 1,
          transition: "all 0.3s ease",
        }}
      >
        {sector.ventures}+ solutions
      </div>
    </div>
  );
};

// ============================================
// ICON CIRCLE - For pathway visualization
// ============================================
const IconCircle = ({ icon, isFirst = false }) => (
  <div
    style={{
      width: "48px",
      height: "48px",
      backgroundColor: isFirst ? colors.accent : colors.background,
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: colors.primary,
      flexShrink: 0,
    }}
  >
    {icon}
  </div>
);

// ============================================
// DOTTED LINE - Connector between icons
// ============================================
const DottedLine = () => (
  <div
    style={{
      flex: "1",
      minWidth: "24px",
      maxWidth: "48px",
      height: "2px",
      backgroundImage: `linear-gradient(to right, ${colors.primary}40 50%, transparent 50%)`,
      backgroundSize: "8px 2px",
      backgroundRepeat: "repeat-x",
      margin: "0 4px",
    }}
  />
);

export default function ServicesSectorsPageV2() {
  const [activeService, setActiveService] = useState("research");
  const [selectedSector, setSelectedSector] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [hoveredNav, setHoveredNav] = useState(null);
  const [logoHovered, setLogoHovered] = useState(false);
  const [footerSectorHovered, setFooterSectorHovered] = useState(null);
  const [heroSectorHovered, setHeroSectorHovered] = useState(null);
  const [activeAudience, setActiveAudience] = useState("investors");
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection for header state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentService = servicesData.find((s) => s.id === activeService);

  // Audience data for dynamic hero
  const audienceData = [
    {
      id: "investors",
      label: "Investors",
      icon: (
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
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          <path d="M6 12h4" />
          <path d="M14 12h4" />
        </svg>
      ),
      headline: (
        <>
          Deploy <span style={{ fontWeight: "700" }}>Capital</span> Where It Creates{" "}
          <span style={{ fontWeight: "700", color: colors.accent }}>Real Impact</span>
        </>
      ),
      description:
        "Access rigorous sector analysis, diversified opportunities across 12 integrated sectors, and transparent impact measurement. Target 8-15% returns while driving measurable development outcomes.",
      highlights: [
        "$135-259M Portfolio",
        "12 Sectors",
        "8-15% IRR",
        "Impact Verified",
        "Blended Finance",
        "DFI Partners",
      ],
    },
    {
      id: "businesses",
      label: "Businesses",
      icon: (
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
      ),
      headline: (
        <>
          Expand into <span style={{ fontWeight: "700" }}>High-Growth Markets</span> with{" "}
          <span style={{ fontWeight: "700", color: colors.accent }}>Local Expertise</span>
        </>
      ),
      description:
        "Navigate Ghana's market landscape with deep sector intelligence, established partnership networks, and de-risked market entry strategies. We connect you to opportunities others miss.",
      highlights: [
        "Market Intelligence",
        "Local Partners",
        "De-Risked Entry",
        "Sector Analysis",
        "Supply Chains",
        "Growth Strategy",
      ],
    },
    {
      id: "government",
      label: "Government",
      icon: (
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
          <path d="M5 21V7l8-4v18" />
          <path d="M19 21V11l-6-4" />
          <path d="M9 9v.01" />
          <path d="M9 12v.01" />
          <path d="M9 15v.01" />
          <path d="M9 18v.01" />
        </svg>
      ),
      headline: (
        <>
          Accelerate <span style={{ fontWeight: "700" }}>Development Goals</span> Through{" "}
          <span style={{ fontWeight: "700", color: colors.accent }}>Strategic Alignment</span>
        </>
      ),
      description:
        "Partner with BRIDGE to mobilize private capital toward national priorities. Our analysis aligns with Ghana's policy frameworks, connecting public sector goals with private sector capabilities.",
      highlights: [
        "Policy Alignment",
        "Private Capital",
        "PPP Expertise",
        "Job Creation",
        "Budget Synergy",
        "Sustainable Growth",
      ],
    },
    {
      id: "entrepreneurs",
      label: "Entrepreneurs",
      icon: (
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
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
          <path d="M9 18h6" />
          <path d="M10 22h4" />
        </svg>
      ),
      headline: (
        <>
          Build <span style={{ fontWeight: "700" }}>Ventures</span> That Address{" "}
          <span style={{ fontWeight: "700", color: colors.accent }}>Real Gaps</span>
        </>
      ),
      description:
        "Access incubation support, sector expertise, and pathways to capital. We help you build solutions that solve actual problems—validated by rigorous analysis, not assumptions.",
      highlights: ["Incubation", "Sector Expertise", "Capital Access", "Go-to-Market", "Mentorship", "Pilot Support"],
    },
  ];

  const currentAudience = audienceData.find((a) => a.id === activeAudience);

  // Filter categories - 4 categories of 3 sectors each
  const categories = [
    { id: "all", label: "All Sectors", sectors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    {
      id: "foundation",
      label: "Foundation",
      description: "The physical backbone enabling everything",
      sectors: [1, 10, 12],
    }, // Infrastructure, Energy, Transportation
    { id: "human", label: "Human Capital", description: "Investing in people and potential", sectors: [3, 5, 7] }, // Health, Education, Creative
    {
      id: "economic",
      label: "Economic Engines",
      description: "Core productive and financial sectors",
      sectors: [2, 6, 11],
    }, // Financial, Agriculture, Manufacturing
    { id: "growth", label: "Growth Sectors", description: "High-potential emerging opportunities", sectors: [4, 8, 9] }, // Technology, Housing, Tourism
  ];

  const filteredSectors =
    filterCategory === "all"
      ? sectorsData
      : sectorsData.filter((s) => categories.find((c) => c.id === filterCategory)?.sectors?.includes(s.id));

  // Calculate totals
  const totalCapitalLow = sectorsData.reduce((sum, s) => sum + s.capitalLow, 0);
  const totalCapitalHigh = sectorsData.reduce((sum, s) => sum + s.capitalHigh, 0);
  const totalVentures = sectorsData.reduce((sum, s) => sum + s.ventures, 0);

  return (
    <div
      style={{ fontFamily: "Helvetica, Arial, sans-serif", margin: 0, padding: 0, backgroundColor: colors.background }}
    >
      {/* Google Fonts - DM Sans + Inter */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Poppins:wght@700;800&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .header-icon { transition: all 0.25s ease; cursor: pointer; }
        .header-icon:hover { color: #1B4D3E !important; }
        .header-icon:hover svg { stroke: #1B4D3E !important; }
        .cta-primary:hover { background-color: #B8D935 !important; color: #1B4D3E !important; }
        .cta-primary:hover .cta-arrow { background-color: rgba(27,77,62,0.15) !important; }
        .cta-primary:hover .cta-arrow svg { stroke: #1B4D3E !important; }
        .cta-secondary:hover { border-color: #1B4D3E !important; color: #1B4D3E !important; }
        .cta-lime:hover { background-color: #1B4D3E !important; color: #FFFFFF !important; }
      `}</style>

      {/* Header — Exact match to BRIDGE_Header_Code_Reference.md */}
      <header
        style={{
          backgroundColor: isScrolled ? "rgba(255,255,255,0.85)" : colors.white,
          backdropFilter: isScrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
          padding: "0 80px",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: isScrolled ? "0 2px 20px rgba(0,0,0,0.04)" : "0 2px 20px rgba(0,0,0,0.06)",
          transition: "all 0.3s ease",
        }}
      >
        {/* Logo with hover: dark → primary */}
        {(() => {
          const c = logoHovered ? colors.primary : colors.dark;
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: "40px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
            >
              <svg viewBox="0 0 4113.9 932.3" height="36" style={{ display: "block" }}>
                <path
                  fill={c}
                  d="M3355.1,655.6h31.2v5.7h-31.2v-5.7ZM3355.1,667h31.2v11.1h-31.2v-11.1ZM3355.1,683.9h31.2v11.1h-31.2v-11.1ZM3355.1,700.8h31.2v11.1h-31.2v-11.1ZM3355.1,717.7h31.2v11.1h-31.2v-11.1ZM3355.1,734.5h31.2v11.1h-31.2v-11.1ZM3355.1,751.4h31.2v10.8h-31.2v-10.8ZM3355.1,767.9h31.2v11.1h-31.2v-11.1ZM3355.1,784.9h31.2v11.1h-31.2v-11.1ZM3355.1,801.8h31.2v11.1h-31.2v-11.1ZM3355.1,818.6h31.2v11.1h-31.2v-11.1ZM3355.1,835.5h31.2v11.1h-31.2v-11.1ZM3355.1,852.4h31.2v11.1h-31.2v-11.1ZM3355.1,869.2h31.2v11.1h-31.2v-11.1ZM3355.1,886.1h31.2v11.1h-31.2v-11.1ZM3355.1,903h31.2v5.7h-31.2v-5.7ZM3397.5,655.6h61.7c12.5,0,24.3,1.7,35.1,5.7h-96.8v-5.7h0ZM3397.5,667h109.7c5.9,3,11.4,6.7,16.7,11.1h-126.3v-11.1h-.1ZM3397.5,801.8h126.3c-5.2,4.4-10.8,8.1-16.7,11.1h-109.7v-11.1h.1ZM3397.5,818.6h96.8c-10.8,4-22.5,6.1-35.1,6.1h-30.5v84h-31.2v-90.2.1ZM3479.6,739.9c0-17.2-13.5-24.7-28.1-24.7h-23.6v49.3h23.6c14.5,0,28.1-7.5,28.1-24.7h0v.1ZM3485.6,683.9h44.4c3.4,3,6.6,6.7,9.3,11.1h-37.1c-4.9-4.4-10.8-8.4-16.7-11.1h.1ZM3502.2,784.9h37.1c-2.8,4-5.9,7.8-9.3,11.1h-44.4c5.9-2.7,11.8-6.7,16.7-11.1h-.1ZM3507.4,700.8h35.7c2.4,3.4,4.2,7.1,5.6,11.1h-33.6c-2.1-4-4.5-7.8-7.7-11.1ZM3515,767.9h33.6l-5.6,11.1h-35.7c3.1-3.4,5.6-7.1,7.7-11.1ZM3517.8,717.7h32.6c1.3,3.7,2.4,7.5,2.8,11.1h-32.3c-.7-3.7-1.8-7.5-3.1-11.1h0ZM3520.9,751.4h32.3c-.3,3.7-1.3,7.5-2.8,10.8h-32.6c1.3-3.4,2.4-7.1,3.1-10.8h0ZM3521.7,734.5h32.3c.3,3.7.3,7.5-.3,11.1h-32c.7-3.7.7-7.5,0-11.1h0ZM3397.5,689.2h61.7c28.4,0,51.7,23.3,51.7,50.9s-23.2,50.9-51.7,50.9h-61.7v-102h0v.2Z"
                />
                <path
                  fill={c}
                  d="M3572.3,655.6h31.2v5.7h-31.2v-5.7ZM3572.3,667h31.2v11.1h-31.2v-11.1ZM3572.3,683.9h31.2v11.1h-31.2v-11.1ZM3572.3,700.8h31.2v11.1h-31.2v-11.1ZM3572.3,717.7h31.2v11.1h-31.2v-11.1ZM3572.3,734.5h31.2v11.1h-31.2v-11.1ZM3572.3,751.4h31.2v10.8h-31.2v-10.8ZM3572.3,767.9h31.2v11.1h-31.2v-11.1ZM3572.3,784.9h31.2v11.1h-31.2v-11.1ZM3572.3,801.8h31.2v11.1h-31.2v-11.1ZM3572.3,818.6h31.2v11.1h-31.2v-11.1ZM3572.3,835.5h31.2v11.1h-31.2v-11.1ZM3572.3,852.4h31.2v11.1h-31.2v-11.1ZM3572.3,869.2h31.2v11.1h-31.2v-11.1ZM3572.3,886.1h31.2v11.1h-31.2v-11.1ZM3572.3,903h31.2v5.7h-31.2v-5.7ZM3614.6,655.6h45.4c12.5,0,24.6,2.1,35.7,5.7h-81.2v-5.7h.1ZM3614.6,667h94.4c5.9,3,11.4,6.7,16,11.1h-110.3v-11.1h-.1ZM3614.6,689h45.4c23.6,0,42,12.5,42,34.1,0,36.4-42.3,62.5-87.5,72.2v-106.4l.1.1ZM3685.4,775.1c17.3,9.8,36.4,32.4,36.4,57.1s-16,43.2-46.2,43.2h-61.1v-69.5c24.6-4.8,52.4-15.6,70.8-30.7h.1v-.1ZM3614.6,886.1h125.2c-4.5,4.4-10.1,8.1-16,11.1h-109.3v-11.1h.1ZM3614.6,903h96.1c-10.8,3.7-22.5,5.7-35.1,5.7h-61.1v-5.7h.1ZM3674.3,725.4c0-7.5-6.6-12.9-15.6-12.9h-16.3v49c19.8-9.1,32-21.9,32-36.1h-.1ZM3686.1,805.8c-13.2,7.5-28.4,13.5-43.7,18.3v27.7h32c19.1,0,27.1-17.5,11.8-45.9h-.1v-.1ZM3687.5,683.9h43.1c3.1,3.4,5.6,7.1,7.7,11.1h-35.4c-4.2-4.8-9.3-8.4-15.3-11.1h-.1ZM3694.7,767.9h38.9c3.8,3.7,7.3,7.5,10.4,11.1h-35.7c-4.2-4.4-9-8.1-13.5-11.1h-.1,0ZM3705.8,751.4h30.5c-2.1,4-4.5,7.8-7.3,10.8h-30.9c2.8-3.4,5.6-7.1,7.7-10.8h0ZM3718.4,869.2h35.7c-2.4,4-5.2,7.8-8.7,11.1h-42.3c5.9-3,11.1-6.7,15.3-11.1h.1-.1ZM3706.9,700.8h33.6c1.3,2.7,2.8,7.1,3.1,11.1h-32c-1-4-2.8-7.8-4.9-11.1h.2ZM3711.8,734.5h30.9c-.7,4-1.8,7.8-3.4,11.1h-30.5c1.3-3.7,2.4-7.5,3.1-11.1h-.1ZM3712.8,717.7h31.2c.3,3.7.3,7.5-.3,11.1h-30.9c.7-3,.7-8.1,0-11.1h0ZM3713.8,784.9h34.3c2.4,3.4,4.9,7.5,6.6,11.1h-33c-2.4-4-5.2-7.8-8-11.1h.1ZM3729.1,852.4h32.3c-.7,3.7-2.1,7.5-4.2,11.1h-34c2.4-3.4,4.5-7.1,5.9-11.1h0ZM3724.9,801.8h32.6c1.8,3.7,3.1,7.5,3.8,11.1h-31.5c-1.3-3.7-2.8-7.5-4.9-11.1ZM3732.6,835.5h31.5c0,3.7-.3,7.5-1.3,11.1h-32c1-3.7,1.8-7.5,1.8-11.1h0ZM3731.3,818.6h31.5c1,3.7,1.3,7.5,1.3,11.1h-31.2c-.3-3.7-.7-7.5-1.8-11.1h.2Z"
                />
                <path
                  fill={c}
                  d="M3774.6,767.9h32l-.7,11.1h-32c0-3.4.3-7.8.7-11.1ZM3773.9,784.9h32c0,3.4.3,7.5.7,11.1h-32c-.3-3.4-.7-7.8-.7-11.1ZM3777.7,751.4h32.3c-1,3.7-1.8,6.7-2.4,10.8h-32.3c.7-3.7,1.3-7.1,2.4-10.8ZM3775.3,801.8h32.3c.7,4,1.3,7.5,2.4,11.1h-32.3c-1-3.7-1.8-7.5-2.4-11.1ZM3783.2,734.5h33c-1.8,3.7-3.1,7.5-4.5,11.1h-32.6c1-3.7,2.4-7.5,4.2-11.1h-.1ZM3779.1,818.6h32.6c1.3,3.7,2.8,7.5,4.5,11.1h-33c-1.8-3.7-3.1-7.5-4.2-11.1h.1ZM3791.5,717.7h34.3l-7,11.1h-33.3c1.8-3.7,3.4-7.1,5.9-11.1h.1ZM3785.7,835.5h33.3l7,11.1h-34.3c-2.4-4-4.2-7.5-5.9-11.1h-.1ZM3803.4,700.8h37.5c-3.8,3.4-7.7,7.5-10.4,11.1h-35.4c2.1-3.4,5.2-7.5,8.3-11.1ZM3795.1,852.4h35.4c2.8,3.7,6.6,7.8,10.4,11.1h-37.5c-3.1-3.7-6.2-7.8-8.3-11.1ZM3819.7,683.9h45.1c-5.9,3-11.8,6.7-17.3,11.1h-39.2c3.8-4,7.7-7.8,11.4-11.1ZM3808.3,869.2h39.2c5.6,4.4,11.4,8.1,17.3,11.1h-45.1c-3.8-3.4-7.7-7.1-11.4-11.1ZM3817,782.2c0-55.4,43.1-99.3,96.8-99.3s57.9,14.2,75.6,36.8l-18.1,21.9c-12.9-18.9-33.6-31-57.6-31-36.1,0-64.9,31-64.9,71.6s28.8,71.6,64.9,71.6,44.7-12.1,57.6-31l18.1,21.9c-17.7,22.6-44.7,36.8-75.6,36.8-53.7,0-96.8-43.9-96.8-99.3ZM3844.7,667h138.1c6.2,3.4,12.1,7.1,17.7,11.1h-51.1c-11.4-4-23.2-6.1-35.7-6.1s-24.3,2.1-35.7,6.1h-51.1c5.6-4,11.4-7.8,17.7-11.1h-.1.2ZM3826.9,886.1h51.1c11.4,4,23.2,6.1,35.7,6.1s24.3-2.1,35.7-6.1h51.1c-5.6,4-11.4,7.8-17.7,11.1h-138.1c-6.2-3.4-12.1-7.1-17.7-11.1h.1-.2ZM3913.8,650.2c20.4,0,39.5,4,56.9,11.1h-113.8c17.3-7.1,36.4-11.1,56.9-11.1h.1-.1ZM3856.8,903h113.8c-17.3,7.1-36.4,11.1-56.9,11.1s-39.5-4-56.9-11.1h-.1.1ZM3962.7,683.9h45.1l5.9,5.4-4.5,5.7h-29.2c-5.6-4.4-11.4-8.1-17.3-11.1h-.1.1ZM3980,869.2h29.2l4.5,5.4c-1.8,2.1-3.8,4-5.9,5.7h-45.1c5.9-3,11.8-6.7,17.3-11.1h.1-.1ZM3986.6,700.8h18.1l-8.3,10.2c-2.8-3.4-6.2-7.1-9.8-10.2h0ZM3996.3,853.3l8.3,10.2h-18.1c3.4-3,7-6.7,9.8-10.2h0Z"
                />
                <path
                  fill={c}
                  d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"
                />
                <path
                  fill={c}
                  stroke={c}
                  strokeWidth="0.5"
                  strokeMiterlimit="10"
                  d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"
                />
                <path
                  fill={c}
                  stroke={c}
                  strokeWidth="0.5"
                  strokeMiterlimit="10"
                  d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"
                />
                <rect fill={colors.accent} x="1427.4" y="17.4" width="205.2" height="145" />
                <rect fill={c} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6" />
                <path
                  fill={c}
                  d="M2757.4,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"
                />
                <rect fill={c} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6" />
                <rect fill={colors.accent} x="3083.5" y="339.5" width="175.1" height="257.7" />
                <rect fill={colors.accent} x="3083.5" y="654.5" width="175.1" height="257.7" />
                <circle fill="none" stroke={c} strokeWidth="5" strokeMiterlimit="10" cx="4078.6" cy="661.3" r="32.8" />
                <path
                  fill={c}
                  d="M4092.2,677.1l-7.3-10.4c.2,0,.3,0,.4-.2,2-.9,3.6-2.1,4.6-3.8s1.6-3.6,1.6-6.1c0-3.6-1.2-6.3-3.6-8.4s-5.7-3-10-3h-13v31.8h5.9v-9.3h8.5l6.5,9.3h6.4v.1ZM4083.7,651.9c1.3,1.1,2,2.7,2,4.7s-.6,3.6-2,4.7-3.3,1.7-5.9,1.7h-6.9v-12.6h6.9c2.6,0,4.5.5,5.9,1.6h0v-.1Z"
                />
                <rect
                  fill="none"
                  stroke={c}
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
                  stroke={c}
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
        })()}

        {/* Navigation - Only in default state */}
        {!isScrolled && (
          <nav
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "32px",
              alignItems: "center",
            }}
          >
            {["About", "Sectors", "Services", "Insights", "Contact"].map((item, i) => (
              <a
                key={item}
                href="#"
                onMouseEnter={() => setHoveredNav(i)}
                onMouseLeave={() => setHoveredNav(null)}
                style={{
                  color: hoveredNav === i ? colors.primary : colors.dark,
                  textDecoration: "none",
                  fontSize: "15px",
                  fontWeight: "500",
                  fontFamily: "Inter, sans-serif",
                  letterSpacing: "0.3px",
                  transition: "color 0.2s ease",
                }}
              >
                {item}
              </a>
            ))}
          </nav>
        )}

        {/* Right Icons — always visible */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Search */}
          <a
            href="#"
            className="header-icon"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.dark}
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </a>
          {/* User */}
          <a
            href="#"
            className="header-icon"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.dark}
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </a>
          {/* Menu */}
          <a
            href="#"
            className="header-icon"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.dark}
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </a>
        </div>
      </header>

      {/* ============================================ */}
      {/* SECTION 1: Audience-Focused Hero */}
      {/* ============================================ */}
      <section
        style={{
          backgroundColor: colors.background,
          padding: "60px 80px 56px 80px",
        }}
      >
        <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
          {/* Pill Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: colors.white,
              padding: "10px 20px",
              borderRadius: "50px",
              marginBottom: "24px",
              border: `1px solid ${colors.line}`,
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: colors.accent,
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "1.5px",
                color: colors.primary,
                fontFamily: "Inter, sans-serif",
                textTransform: "uppercase",
              }}
            >
              Your Bridge to Impact
            </span>
          </div>

          {/* Main Headline - Static */}
          <h1
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "56px",
              fontWeight: "300",
              lineHeight: "1.12",
              color: colors.primary,
              margin: "0 0 48px 0",
              letterSpacing: "-1px",
              maxWidth: "900px",
            }}
          >
            We <span style={{ fontWeight: "700" }}>connect</span> the people, capital, and expertise that create{" "}
            <span style={{ fontWeight: "700", color: colors.accent }}>measurable, lasting impact.</span>
          </h1>

          {/* Audience Selector + Dynamic Content Container */}
          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}
          >
            {/* Audience Tabs */}
            <div
              style={{
                display: "flex",
                borderBottom: `1px solid ${colors.line}`,
              }}
            >
              {audienceData.map((audience) => {
                const isActive = activeAudience === audience.id;
                return (
                  <button
                    key={audience.id}
                    onClick={() => setActiveAudience(audience.id)}
                    style={{
                      flex: 1,
                      padding: "24px 32px",
                      backgroundColor: isActive ? colors.primary : "transparent",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "12px",
                      transition: "all 0.3s ease",
                      borderBottom: isActive ? `3px solid ${colors.accent}` : "3px solid transparent",
                    }}
                  >
                    <span
                      style={{
                        color: isActive ? colors.accent : "#999",
                        display: "flex",
                        alignItems: "center",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {audience.icon}
                    </span>
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        fontFamily: "Inter, sans-serif",
                        color: isActive ? colors.white : "#666",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {audience.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Content Area - Fixed Height */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                height: "500px",
              }}
            >
              {/* Left - Text Content */}
              <div
                style={{
                  padding: "56px 56px 99px 56px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Top content */}
                <div>
                  <h2
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "36px",
                      fontWeight: "300",
                      lineHeight: "1.2",
                      color: colors.primary,
                      margin: "0 0 24px 0",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {currentAudience.headline}
                  </h2>
                  <p
                    style={{
                      fontSize: "16px",
                      lineHeight: "1.7",
                      color: "#666",
                      fontFamily: "Inter, sans-serif",
                      margin: "0",
                      maxWidth: "480px",
                    }}
                  >
                    {currentAudience.description}
                  </p>
                </div>

                {/* CTA Button - pushed to bottom */}
                <button
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.white,
                    border: "none",
                    padding: "16px 28px",
                    fontSize: "14px",
                    fontWeight: "600",
                    fontFamily: "Inter, sans-serif",
                    cursor: "pointer",
                    borderRadius: "50px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    alignSelf: "flex-start",
                  }}
                >
                  Explore Opportunities
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      backgroundColor: "rgba(255,255,255,0.15)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.white} strokeWidth="2.5">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </span>
                </button>
              </div>

              {/* Right - Sector Icons Grid + Highlight Tags */}
              <div
                style={{
                  backgroundColor: colors.primary,
                  padding: "40px 40px 72px 40px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                {/* Section Label - Shows sector name on hover */}
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: "700",
                    fontFamily: "DM Sans, sans-serif",
                    color: heroSectorHovered !== null ? colors.accent : "rgba(255,255,255,0.4)",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                    transition: "color 0.25s ease",
                    minHeight: "15px",
                  }}
                >
                  {heroSectorHovered !== null ? footerSectorIcons[heroSectorHovered].label : "12 Integrated Sectors"}
                </div>

                {/* Sector Icons Grid - 6x2 layout with hover effects */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(6, 1fr)",
                    gap: "10px",
                    marginBottom: "28px",
                  }}
                >
                  {footerSectorIcons.map((sector, i) => {
                    const isHovered = heroSectorHovered === i;
                    return (
                      <div
                        key={sector.key}
                        onMouseEnter={() => setHeroSectorHovered(i)}
                        onMouseLeave={() => setHeroSectorHovered(null)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          aspectRatio: "1",
                          borderRadius: "12px",
                          backgroundColor: isHovered ? "rgba(184,217,53,0.12)" : "rgba(255,255,255,0.05)",
                          border: `1px solid ${isHovered ? "rgba(184,217,53,0.35)" : "rgba(255,255,255,0.08)"}`,
                          cursor: "pointer",
                          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                          transform: isHovered ? "translateY(-2px)" : "none",
                          boxShadow: isHovered ? "0 6px 16px rgba(0,0,0,0.2), 0 0 0 1px rgba(184,217,53,0.15)" : "none",
                        }}
                      >
                        <div
                          style={{
                            opacity: isHovered ? 1 : 0.6,
                            transition: "opacity 0.25s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {sector.icon(isHovered ? colors.accent : "rgba(255,255,255,0.9)")}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    marginBottom: "24px",
                  }}
                />

                {/* What You Get Label */}
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: "700",
                    fontFamily: "DM Sans, sans-serif",
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}
                >
                  What You Get
                </div>

                {/* Highlight Tags - 2x2 grid with bullets */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px 20px",
                  }}
                >
                  {currentAudience.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
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
                          color: "rgba(255,255,255,0.85)",
                          fontSize: "14px",
                          fontWeight: "500",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SECTION 2: What We Do */}
      {/* ============================================ */}
      <section
        style={{
          backgroundColor: colors.white,
          padding: "100px 80px",
        }}
      >
        <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
          {/* Pill Badge - Variant A (Light Background) */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "50px",
              marginBottom: "24px",
              border: `1px solid ${colors.line}`,
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: colors.accent,
                display: "inline-block",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "1.5px",
                color: colors.primary,
                fontFamily: "Inter, sans-serif",
                textTransform: "uppercase",
              }}
            >
              What We Do
            </span>
          </div>

          {/* Two Column: Headline + Description */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "flex-start",
            }}
          >
            {/* Left - Headline */}
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "44px",
                fontWeight: "300",
                lineHeight: "1.2",
                color: colors.primary,
                margin: 0,
                letterSpacing: "-0.5px",
              }}
            >
              We <span style={{ fontWeight: "700" }}>Bridge</span> the Gaps Between{" "}
              <span style={{ fontWeight: "700", color: colors.accent }}>Insight</span>,{" "}
              <span style={{ fontWeight: "700", color: colors.accent }}>Opportunity</span>, and{" "}
              <span style={{ fontWeight: "700", color: colors.accent }}>Impact</span>
            </h2>

            {/* Right - Description Paragraphs */}
            <div style={{ maxWidth: "480px" }}>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "1.7",
                  color: "#666",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "400",
                  margin: "0 0 20px 0",
                }}
              >
                Different stakeholders, same mission. We connect investors to vetted opportunities. We help businesses
                navigate new markets. We mobilize private capital toward government priorities. We give entrepreneurs
                the resources to build what's missing.
              </p>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "1.7",
                  color: "#666",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "400",
                  margin: 0,
                }}
              >
                It all starts with understanding—12 sectors mapped, gaps quantified, opportunities identified. Then we
                act: incubating ventures, deploying capital, and building partnerships that turn analysis into outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* REFINED SERVICES SECTION - Focused Single View */}
      {/* ============================================ */}
      <section
        style={{
          backgroundColor: colors.primary,
          padding: "0 80px",
        }}
      >
        <div
          style={{
            maxWidth: CONTENT_MAX_WIDTH,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            height: "680px",
          }}
        >
          {/* Left Side - Service Navigation */}
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.15)",
              padding: "48px 0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Section Label */}
            <div
              style={{
                padding: "0 40px",
                marginBottom: "28px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "2px",
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "Inter, sans-serif",
                  textTransform: "uppercase",
                }}
              >
                Our Services
              </span>
            </div>

            {/* Service Tabs */}
            <div style={{ flex: 1 }}>
              {servicesData.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  style={{
                    width: "100%",
                    padding: "24px 40px",
                    backgroundColor: activeService === service.id ? colors.primary : "transparent",
                    border: "none",
                    borderLeft: activeService === service.id ? `4px solid ${colors.accent}` : "4px solid transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  {/* Number */}
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: activeService === service.id ? colors.accent : "rgba(255,255,255,0.3)",
                      fontFamily: "Inter, sans-serif",
                      minWidth: "24px",
                    }}
                  >
                    {service.number}
                  </span>

                  {/* Title & Subtitle */}
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: activeService === service.id ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.4)",
                        fontFamily: "Inter, sans-serif",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        marginBottom: "4px",
                      }}
                    >
                      {service.subtitle}
                    </div>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: "600",
                        color: activeService === service.id ? colors.white : "rgba(255,255,255,0.6)",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {service.title}
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  {activeService === service.id && (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={colors.accent}
                      strokeWidth="2"
                      style={{ marginLeft: "auto" }}
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Service Content */}
          <div
            style={{
              padding: "60px 80px 60px 100px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* Headline - Dynamic with 300/700 weight pattern */}
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "44px",
                fontWeight: "300",
                color: colors.white,
                margin: "0 0 24px 0",
                letterSpacing: "-0.5px",
                lineHeight: "1.2",
              }}
            >
              {currentService.id === "research" && (
                <>
                  The <span style={{ fontWeight: "700" }}>Foundation</span> for Every{" "}
                  <span style={{ fontWeight: "700", color: colors.accent }}>Decision</span>
                </>
              )}
              {currentService.id === "ventures" && (
                <>
                  From <span style={{ fontWeight: "700" }}>Ideas</span> to{" "}
                  <span style={{ fontWeight: "700", color: colors.accent }}>Impactful Solutions</span>
                </>
              )}
              {currentService.id === "investment" && (
                <>
                  <span style={{ fontWeight: "700" }}>Deploying Capital</span> Where It{" "}
                  <span style={{ fontWeight: "700", color: colors.accent }}>Matters</span>
                </>
              )}
              {currentService.id === "partnerships" && (
                <>
                  <span style={{ fontWeight: "700" }}>Building Relationships</span> That{" "}
                  <span style={{ fontWeight: "700", color: colors.accent }}>Work</span>
                </>
              )}
              {currentService.id === "advisory" && (
                <>
                  <span style={{ fontWeight: "700" }}>Building Systems</span> That{" "}
                  <span style={{ fontWeight: "700", color: colors.accent }}>Outlast Us</span>
                </>
              )}
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: "16px",
                lineHeight: "1.7",
                color: "rgba(255,255,255,0.5)",
                fontFamily: "Inter, sans-serif",
                fontWeight: "400",
                margin: "0 0 36px 0",
                maxWidth: "580px",
              }}
            >
              {currentService.description}
            </p>

            {/* Stats Row */}
            <div
              style={{
                display: "flex",
                gap: "48px",
                marginBottom: "40px",
                paddingBottom: "40px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {currentService.stats.map((stat, index) => (
                <div key={index}>
                  <div
                    style={{
                      fontSize: "32px",
                      fontWeight: "700",
                      color: colors.accent,
                      fontFamily: "Inter, sans-serif",
                      lineHeight: "1",
                      marginBottom: "8px",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.5)",
                      fontFamily: "Inter, sans-serif",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
              }}
            >
              {currentService.features.map((feature, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                  }}
                >
                  {/* Check icon */}
                  <div
                    style={{
                      width: "24px",
                      height: "24px",
                      backgroundColor: "rgba(184, 217, 53, 0.15)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        color: colors.white,
                        fontFamily: "Inter, sans-serif",
                        marginBottom: "4px",
                      }}
                    >
                      {feature.label}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.5)",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {feature.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div style={{ marginTop: "40px" }}>
              <button
                style={{
                  backgroundColor: colors.accent,
                  color: colors.primary,
                  border: "none",
                  padding: "16px 28px",
                  fontSize: "14px",
                  fontWeight: "600",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                  borderRadius: "50px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                Learn More About {currentService.title}
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    backgroundColor: "rgba(27,77,62,0.15)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section
        style={{
          backgroundColor: colors.white,
          padding: "100px 80px",
        }}
      >
        <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
          {/* Section Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "60px",
            }}
          >
            {/* Pill Badge - Variant A */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 20px",
                borderRadius: "50px",
                marginBottom: "24px",
                border: `1px solid ${colors.line}`,
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: colors.accent,
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  letterSpacing: "1.5px",
                  color: colors.primary,
                  fontFamily: "Inter, sans-serif",
                  textTransform: "uppercase",
                }}
              >
                Where We Work
              </span>
            </div>
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "48px",
                fontWeight: "300",
                color: colors.primary,
                margin: "0 0 24px 0",
                letterSpacing: "-0.5px",
                lineHeight: "1.15",
              }}
            >
              <span style={{ fontWeight: "700" }}>Opportunity</span> Across{" "}
              <span style={{ fontWeight: "700", color: colors.accent }}>Every Sector</span>
            </h2>
            <p
              style={{
                fontSize: "16px",
                lineHeight: "1.7",
                color: "#666",
                fontFamily: "Inter, sans-serif",
                fontWeight: "400",
                maxWidth: "620px",
                margin: "0 auto 36px auto",
              }}
            >
              From infrastructure to agriculture, financial inclusion to creative industries—each sector mapped,
              analyzed, and ready for action.
            </p>
          </div>

          {/* Filter Tabs */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "24px",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                style={{
                  backgroundColor: filterCategory === cat.id ? colors.primary : "transparent",
                  color: filterCategory === cat.id ? colors.white : colors.dark,
                  border: filterCategory === cat.id ? "none" : `1px solid ${colors.line}`,
                  padding: "14px 28px",
                  fontSize: "14px",
                  fontWeight: "500",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                  borderRadius: "50px",
                  transition: "all 0.3s ease",
                }}
              >
                {cat.label}
                {cat.id !== "all" && (
                  <span
                    style={{
                      marginLeft: "8px",
                      opacity: 0.6,
                      fontSize: "12px",
                    }}
                  >
                    ({cat.sectors.length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Category Description */}
          {filterCategory !== "all" && (
            <div
              style={{
                textAlign: "center",
                marginBottom: "48px",
              }}
            >
              <p
                style={{
                  fontSize: "16px",
                  color: "#666",
                  fontFamily: "Inter, sans-serif",
                  fontStyle: "italic",
                }}
              >
                {categories.find((c) => c.id === filterCategory)?.description}
              </p>
            </div>
          )}

          {/* Sectors Grid - 3 columns for categories, 4 for all */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: filterCategory === "all" ? "repeat(4, 1fr)" : "repeat(3, 1fr)",
              gap: "24px",
            }}
          >
            {filteredSectors.map((sector) => (
              <div
                key={sector.id}
                onClick={() => setSelectedSector(selectedSector === sector.id ? null : sector.id)}
                style={{
                  backgroundColor: colors.background,
                  borderRadius: "24px",
                  padding: filterCategory === "all" ? "24px" : "32px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  border: selectedSector === sector.id ? `2px solid ${colors.accent}` : "2px solid transparent",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Sector Number Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: filterCategory === "all" ? "16px" : "24px",
                    right: filterCategory === "all" ? "16px" : "24px",
                    width: filterCategory === "all" ? "32px" : "40px",
                    height: filterCategory === "all" ? "32px" : "40px",
                    backgroundColor: selectedSector === sector.id ? colors.accent : colors.white,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: filterCategory === "all" ? "12px" : "14px",
                    fontWeight: "700",
                    color: colors.primary,
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {String(sector.id).padStart(2, "0")}
                </div>

                {/* Sector Name */}
                <h3
                  style={{
                    fontSize: filterCategory === "all" ? "16px" : "22px",
                    fontWeight: "600",
                    color: colors.primary,
                    fontFamily: "Inter, sans-serif",
                    margin: "0 0 12px 0",
                    paddingRight: "50px",
                    lineHeight: "1.3",
                  }}
                >
                  {sector.name}
                </h3>

                {/* Problem - Hidden in "all" view for cleaner look */}
                {filterCategory !== "all" && (
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: "1.6",
                      color: "#666",
                      fontFamily: "Inter, sans-serif",
                      margin: "0 0 20px 0",
                    }}
                  >
                    {sector.problem}
                  </p>
                )}

                {/* Compact stats for "all" view */}
                {filterCategory === "all" ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "16px",
                      paddingTop: "16px",
                      borderTop: `1px solid ${colors.line}`,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: colors.primary,
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      ${sector.capitalLow}-{sector.capitalHigh}M
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        color: colors.accent,
                        fontFamily: "Inter, sans-serif",
                        fontWeight: "600",
                      }}
                    >
                      {sector.ventures}+ solutions
                    </span>
                  </div>
                ) : (
                  <>
                    {/* Focus Areas - Full view */}
                    <div
                      style={{
                        backgroundColor: colors.white,
                        borderRadius: "12px",
                        padding: "16px",
                        marginBottom: "20px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#999",
                          fontFamily: "Inter, sans-serif",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          marginBottom: "8px",
                        }}
                      >
                        BRIDGE Focus
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          color: colors.primary,
                          fontFamily: "Inter, sans-serif",
                          lineHeight: "1.5",
                        }}
                      >
                        {sector.focus}
                      </div>
                    </div>

                    {/* Stats Row */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingTop: "16px",
                        borderTop: `1px solid ${colors.line}`,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            color: colors.primary,
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          ${sector.capitalLow}-{sector.capitalHigh}M
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#999",
                            fontFamily: "Inter, sans-serif",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Capital Range
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div
                          style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            color: colors.primary,
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          {sector.ventures}+
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#999",
                            fontFamily: "Inter, sans-serif",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Solutions
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Expanded Content */}
                {selectedSector === sector.id && (
                  <div
                    style={{
                      marginTop: "20px",
                      paddingTop: "20px",
                      borderTop: `1px solid ${colors.line}`,
                    }}
                  >
                    {/* Show problem if in "all" view */}
                    {filterCategory === "all" && (
                      <p
                        style={{
                          fontSize: "13px",
                          lineHeight: "1.6",
                          color: "#666",
                          fontFamily: "Inter, sans-serif",
                          margin: "0 0 16px 0",
                        }}
                      >
                        {sector.problem}
                      </p>
                    )}

                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "#999",
                        fontFamily: "Inter, sans-serif",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        marginBottom: "12px",
                      }}
                    >
                      Key Statistics
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {sector.keyStats.map((stat, idx) => (
                        <span
                          key={idx}
                          style={{
                            backgroundColor: colors.white,
                            padding: "6px 12px",
                            borderRadius: "50px",
                            fontSize: "12px",
                            color: colors.primary,
                            fontFamily: "Inter, sans-serif",
                            fontWeight: "500",
                          }}
                        >
                          {stat}
                        </span>
                      ))}
                    </div>

                    {/* View Full Analysis Button */}
                    <button
                      style={{
                        backgroundColor: colors.accent,
                        color: colors.primary,
                        border: "none",
                        padding: "12px 20px",
                        fontSize: "13px",
                        fontWeight: "600",
                        fontFamily: "Inter, sans-serif",
                        cursor: "pointer",
                        borderRadius: "50px",
                        marginTop: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        width: "100%",
                        justifyContent: "center",
                      }}
                    >
                      View Full Analysis
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Sector Integration Section */}
      <section
        style={{
          backgroundColor: colors.background,
          padding: "100px 80px",
        }}
      >
        <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "flex-start",
            }}
          >
            {/* Left - Content */}
            <div>
              {/* Pill Badge - Light Background Variant */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: colors.white,
                  padding: "10px 20px",
                  borderRadius: "50px",
                  marginBottom: "24px",
                  border: `1px solid ${colors.line}`,
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: colors.accent,
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: "1.5px",
                    color: colors.primary,
                    fontFamily: "Inter, sans-serif",
                    textTransform: "uppercase",
                  }}
                >
                  Connected Solutions
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "44px",
                  fontWeight: "300",
                  color: colors.primary,
                  margin: "0 0 24px 0",
                  letterSpacing: "-0.5px",
                  lineHeight: "1.2",
                }}
              >
                <span style={{ fontWeight: "700" }}>Progressive Systems</span>, Not{" "}
                <span style={{ fontWeight: "700", color: colors.accent }}>Silos</span>
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  lineHeight: "1.7",
                  color: "#666",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "400",
                  margin: "0 0 48px 0",
                  maxWidth: "420px",
                }}
              >
                Addressing one sector while ignoring connected sectors creates partial solutions that don't hold. BRIDGE
                thinks in systems—understanding how interventions in one area create ripple effects across others.
              </p>

              {/* Quote */}
              <div
                style={{
                  borderLeft: `4px solid ${colors.accent}`,
                  paddingLeft: "24px",
                  marginBottom: "52px",
                }}
              >
                <p
                  style={{
                    fontSize: "18px",
                    fontStyle: "italic",
                    color: colors.primary,
                    fontFamily: "Georgia, serif",
                    margin: 0,
                    lineHeight: "1.6",
                  }}
                >
                  "A hospital means nothing without power, roads, trained staff, and pharmaceutical supply chains. Every
                  sector depends on others."
                </p>
              </div>

              {/* CTA */}
              <button
                style={{
                  backgroundColor: colors.primary,
                  color: colors.white,
                  border: "none",
                  padding: "16px 28px",
                  fontSize: "14px",
                  fontWeight: "600",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                  borderRadius: "50px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                See How It Works
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    backgroundColor: "rgba(255,255,255,0.15)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.white} strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              </button>
            </div>

            {/* Right - Integration Examples with Icon Pathways */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {/* Farm to Fork */}
              <div
                style={{
                  backgroundColor: colors.white,
                  borderRadius: "20px",
                  padding: "28px",
                  border: `1px solid ${colors.line}`,
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: colors.primary,
                    fontFamily: "Inter, sans-serif",
                    marginBottom: "20px",
                  }}
                >
                  Farm to Fork
                </div>

                {/* Icon Pathway */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0",
                    marginBottom: "20px",
                  }}
                >
                  <IconCircle icon={<IconWheat />} isFirst />
                  <DottedLine />
                  <IconCircle icon={<IconFactory />} />
                  <DottedLine />
                  <IconCircle icon={<IconTruck />} />
                  <DottedLine />
                  <IconCircle icon={<IconBuilding />} />
                  <DottedLine />
                  <IconCircle icon={<IconWallet />} />
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Production → Processing → Cold Chain → Markets → Credit
                </div>
              </div>

              {/* Healthcare Delivery */}
              <div
                style={{
                  backgroundColor: colors.white,
                  borderRadius: "20px",
                  padding: "28px",
                  border: `1px solid ${colors.line}`,
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: colors.primary,
                    fontFamily: "Inter, sans-serif",
                    marginBottom: "20px",
                  }}
                >
                  Healthcare Delivery
                </div>

                {/* Icon Pathway */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0",
                    marginBottom: "20px",
                  }}
                >
                  <IconCircle icon={<IconHeart />} isFirst />
                  <DottedLine />
                  <IconCircle icon={<IconFactory />} />
                  <DottedLine />
                  <IconCircle icon={<IconTruck />} />
                  <DottedLine />
                  <IconCircle icon={<IconWallet />} />
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Facilities → Pharmaceuticals → Distribution → Insurance
                </div>
              </div>

              {/* Skills to Jobs */}
              <div
                style={{
                  backgroundColor: colors.white,
                  borderRadius: "20px",
                  padding: "28px",
                  border: `1px solid ${colors.line}`,
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: colors.primary,
                    fontFamily: "Inter, sans-serif",
                    marginBottom: "20px",
                  }}
                >
                  Skills to Jobs
                </div>

                {/* Icon Pathway */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0",
                    marginBottom: "20px",
                  }}
                >
                  <IconCircle icon={<IconGraduation />} isFirst />
                  <DottedLine />
                  <IconCircle icon={<IconCpu />} />
                  <DottedLine />
                  <IconCircle icon={<IconFactory />} />
                  <DottedLine />
                  <IconCircle icon={<IconWallet />} />
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    color: "#666",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  Training → Digital Skills → Employment → Enterprise Credit
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          backgroundColor: colors.primary,
          padding: "100px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
            backgroundImage: `radial-gradient(${colors.accent} 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />

        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "48px",
              fontWeight: "300",
              color: colors.white,
              margin: "0 0 24px 0",
              letterSpacing: "-0.5px",
              lineHeight: "1.2",
            }}
          >
            Ready to <span style={{ fontWeight: "700" }}>Build</span> Something{" "}
            <span style={{ fontWeight: "700", color: colors.accent }}>Together?</span>
          </h2>
          <p
            style={{
              fontSize: "16px",
              lineHeight: "1.7",
              color: "rgba(255,255,255,0.6)",
              fontFamily: "Inter, sans-serif",
              fontWeight: "400",
              margin: "0 0 36px 0",
              maxWidth: "620px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Whether you're deploying capital, entering markets, advancing policy, or building a venture—we're ready to
            connect.
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
            }}
          >
            <button
              style={{
                backgroundColor: colors.accent,
                color: colors.primary,
                border: "none",
                padding: "16px 28px",
                fontSize: "14px",
                fontWeight: "600",
                fontFamily: "Inter, sans-serif",
                cursor: "pointer",
                borderRadius: "50px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              Start a Conversation
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: "rgba(27,77,62,0.15)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </button>
            <button
              style={{
                backgroundColor: "transparent",
                color: colors.white,
                border: `1.5px solid rgba(255,255,255,0.3)`,
                padding: "16px 28px",
                fontSize: "14px",
                fontWeight: "600",
                fontFamily: "Inter, sans-serif",
                cursor: "pointer",
                borderRadius: "50px",
              }}
            >
              Explore Sectors
            </button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div
        style={{
          backgroundColor: colors.primary,
          padding: "0 80px",
        }}
      >
        <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)" }} />
      </div>

      {/* Footer — Exact match to BRIDGE_Footer_Code_Reference.md */}
      <footer style={{ backgroundColor: colors.primary, padding: "0" }}>
        {/* Main: brand left | links + sector grid right */}
        <div style={{ padding: "64px 80px", display: "grid", gridTemplateColumns: "325px 1fr", gap: "220px" }}>
          {/* LEFT — Brand */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {/* Top content */}
            <div>
              <div style={{ marginBottom: "24px", display: "flex", alignItems: "center", height: "40px" }}>
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
                  <circle
                    fill="none"
                    stroke={colors.white}
                    strokeWidth="5"
                    strokeMiterlimit="10"
                    cx="4078.6"
                    cy="661.3"
                    r="32.8"
                  />
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

              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "'DM Sans', sans-serif",
                  lineHeight: "1.8",
                  margin: "0 0 28px",
                  maxWidth: "325px",
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

            {/* Bottom content — subscribe + social */}
            <div>
              <div style={{ marginBottom: "16px", maxWidth: "325px" }}>
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
                    }}
                  >
                    →
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                {[
                  <svg key="li" width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.45)">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>,
                  <svg key="tw" width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.45)">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>,
                  <svg key="fb" width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.45)">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>,
                ].map((icon, i) => (
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
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Links top, sector grid bottom */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", maxWidth: "680px" }}>
            {/* 4 Link columns */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
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
                  Company
                </h4>
                {["About BRIDGE", "Our Approach", "Sectors", "Contact Us"].map((link) => (
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
              <div>
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
                  Services
                </h4>
                {["Research & Guidance", "Venture Development", "Direct Investment", "Strategic Partnerships"].map(
                  (link) => (
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
                  ),
                )}
              </div>
              <div>
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
                  Resources
                </h4>
                {["White Paper", "Case Studies", "Research Library", "Data & Reports"].map((link) => (
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
              <div>
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
                  Insights
                </h4>
                {["Insights & Analysis", "Sector Briefs", "Policy Updates", "Annual Review"].map((link) => (
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
            </div>

            {/* Sector Grid Widget — bottom-aligned with email field */}
            <div style={{ marginBottom: "50px" }}>
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "700",
                  color: footerSectorHovered !== null ? colors.accent : "rgba(255,255,255,0.25)",
                  fontFamily: "Inter, sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "14px",
                  transition: "color 0.25s ease",
                  minHeight: "15px",
                }}
              >
                {footerSectorHovered !== null ? footerSectorIcons[footerSectorHovered].label : "Explore 12 Sectors"}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {footerSectorIcons.map((sector, i) => {
                  const isH = footerSectorHovered === i;
                  return (
                    <a
                      key={sector.key}
                      href="#"
                      title={sector.label}
                      onMouseEnter={() => setFooterSectorHovered(i)}
                      onMouseLeave={() => setFooterSectorHovered(null)}
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
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            padding: "20px 80px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif" }}>
            © 2026 BRIDGE PBC · Public Benefit Corporation · All rights reserved
          </span>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Terms", "Privacy", "Accessibility"].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontSize: "12px",
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
    </div>
  );
}
