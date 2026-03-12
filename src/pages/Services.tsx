import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";

import { FOOTER_SECTOR_ICONS, SOCIAL_ICONS, SOCIAL_HREFS } from "@/data/sectorIcons";
// BRIDGE Design System - Consistent with Homepage
import { colors } from "@/lib/theme";

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
    flow: ["Health", "Manufacturing", "Transportation", "Technology", "Financial"],
    description: "Facilities → Pharmaceuticals → Distribution → Telemedicine → Insurance",
  },
  {
    title: "Skills to Jobs",
    flow: ["Education", "Technology", "Infrastructure", "Manufacturing", "Financial"],
    description: "Training → Digital Skills → Connectivity → Employment → Enterprise Credit",
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
  return (
    <div
      className="group flex-1 max-w-[200px] bg-white/95 hover:bg-[#B8D935] rounded-2xl p-[18px] cursor-pointer transition-all duration-300 ease-in-out translate-y-0 hover:-translate-y-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.25)]"
    >
      {/* Icon */}
      <div
        className="w-[44px] h-[44px] bg-[#F3F5F2] group-hover:bg-[#1B4D3E] rounded-xl flex items-center justify-center mb-3 text-[#1B4D3E] group-hover:text-[#B8D935] transition-all duration-300 ease-in-out"
      >
        {icon}
      </div>

      {/* Sector Name */}
      <div
        className="text-[13px] font-semibold text-[#1B4D3E] font-['Inter',sans-serif] mb-1 leading-[1.3]"
      >
        {sector.shortName}
      </div>

      {/* Solutions Count */}
      <div
        className="text-xs text-[#666] group-hover:text-[#1B4D3E] font-['Inter',sans-serif] opacity-100 group-hover:opacity-70 transition-all duration-300 ease-in-out"
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
    className={`w-12 h-12 ${isFirst ? "bg-[#B8D935]" : "bg-[#F3F5F2]"} rounded-xl flex items-center justify-center text-[#1B4D3E] shrink-0`}
  >
    {icon}
  </div>
);

// ============================================
// DOTTED LINE - Connector between icons
// ============================================
const DottedLine = () => (
  <div
    className="flex-1 min-w-[24px] max-w-[48px] h-0.5 bg-repeat-x mx-1 bg-[length:8px_2px]"
    style={{ backgroundImage: "linear-gradient(to right, #1B4D3E40 50%, transparent 50%)" }}
  />
);

// Audience → Services Data
const audienceServicesData = [
  {
    id: "entrepreneurs",
    label: "Entrepreneurs",
    tagline: "From idea to operating venture",
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
        <path d="M2 7l1.5-4h17L22 7" />
        <path d="M2 7h20v4c0 0-1.5 2-5 2s-5-2-5-2-1.5 2-5 2-5-2-5-2V7z" />
        <path d="M4 13v8h16v-8" />
        <path d="M10 21v-6h4v6" />
      </svg>
    ),
    services: [
      {
        title: "Identify Real Gaps\nBefore You Build",
        desc: "Evidence-based opportunity validation across 12 sectors. We map value chains and quantify pain points so you build where demand is proven.",
        source: "Research",
        detail: {
          lines: [
            { stat: "12", text: "sectors analyzed with 7,000+ word deep-dive reports each" },
            { stat: "174+", text: "venture opportunities identified and scored through our proprietary methodology" },
            { stat: "4-tier", text: "prioritization matrix ranking feasibility, impact, capital needs, and timing" },
          ],
        },
      },
      {
        title: "Structure Ventures\nThat Fix Systems",
        desc: "From concept to pilot with disciplined stage gates. Business model design, BRIDGE Impact Score™ assessment, and go/no-go decisions backed by data.",
        source: "Ventures",
        detail: {
          lines: [
            { stat: "80+", text: "minimum BRIDGE Impact Score™ threshold to advance past initial screening" },
            { stat: "4", text: "decision gates from concept validation through pilot launch to scale readiness" },
            { stat: "90%", text: "of ventures are restructured after initial analysis reveals stronger models" },
          ],
        },
      },
      {
        title: "Access Capital\nMatched to Your Stage",
        desc: "Blended finance, angel networks, and DFI co-investment. We match your stage, sector, and risk profile to the right capital stack.",
        source: "Investment",
        detail: {
          lines: [
            { stat: "$100K–$2M", text: "seed and early-stage range with active support and board observation" },
            { stat: "3", text: "capital streams orchestrated: diaspora, commercial, and concessional" },
            { stat: "8-15%", text: "target IRR through risk-appropriate structures across diversified sectors" },
          ],
        },
      },
      {
        title: "Build Capacity\nThat Outlasts Us",
        desc: "Technical assistance, governance frameworks, and embedded knowledge transfer. We strengthen your operations so solutions endure independently.",
        source: "Advisory",
        detail: {
          lines: [
            { stat: "3yr", text: "sustainability horizon built into every advisory engagement from day one" },
            { stat: "12", text: "sector-specific governance frameworks covering compliance, reporting, and M&E" },
            { stat: "50+", text: "local partner organizations integrated into our capacity building network" },
          ],
        },
      },
    ],
    stat: { value: "174+", label: "Ventures Mapped" },
  },
  {
    id: "businesses",
    label: "Businesses",
    tagline: "Expand into high-growth markets",
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
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
        <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
        <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
        <path d="M10 6h4" />
        <path d="M10 10h4" />
        <path d="M10 14h4" />
        <path d="M10 18h4" />
      </svg>
    ),
    services: [
      {
        title: "Navigate Markets\nWith Deep Intelligence",
        desc: "Competitive landscape mapping, regulatory navigation, and sector-specific entry strategies. Understand the terrain before you commit resources.",
        source: "Research",
        detail: {
          lines: [
            { stat: "12", text: "sector analyses covering competitive dynamics, regulatory environment, and gaps" },
            { stat: "174+", text: "mapped ventures revealing where incumbents are weak and demand is unmet" },
            { stat: "7,000+", text: "words per sector report with value chain mapping and stakeholder analysis" },
          ],
        },
      },
      {
        title: "Plug Into Vetted\nPartnership Networks",
        desc: "Access established local partnerships, supply chain connections, and distribution channels built through years of BRIDGE sector engagement.",
        source: "Partnerships",
        detail: {
          lines: [
            { stat: "260+", text: "districts covered through our multi-stakeholder coordination network" },
            { stat: "7", text: "government policy pillars we actively align partnerships around" },
            { stat: "50+", text: "local partner organizations across supply chain, distribution, and services" },
          ],
        },
      },
      {
        title: "De-Risk Expansion\nWith Structured Capital",
        desc: "Co-investment structures and local partnership models that reduce your exposure while maximizing Ghana market opportunity and returns.",
        source: "Investment",
        detail: {
          lines: [
            { stat: "$135–259M", text: "total portfolio potential across 12 diversified sectors" },
            { stat: "3-tier", text: "impact measurement ensuring your investment creates verifiable outcomes" },
            { stat: "Blended", text: "finance structures stacking DFI, commercial, and concessional capital" },
          ],
        },
      },
      {
        title: "Operate Sustainably\nWith Local Expertise",
        desc: "On-ground liaison, cultural protocol navigation, and institutional relationship management for lasting market presence.",
        source: "Advisory",
        detail: {
          lines: [
            { stat: "24hr", text: "Economy policy alignment ensuring your operations fit national priorities" },
            { stat: "12", text: "sector frameworks guiding governance, compliance, and stakeholder engagement" },
            { stat: "3yr", text: "sustainability planning embedded into every advisory engagement" },
          ],
        },
      },
    ],
    stat: { value: "12", label: "Sectors Covered" },
  },
  {
    id: "investors",
    label: "Investors",
    tagline: "Deploy capital where it matters",
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
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    services: [
      {
        title: "Rigorous Diligence\nBefore Every Dollar",
        desc: "Sector research, value chain mapping, and multi-dimensional opportunity scoring. Every investment thesis is backed by exhaustive analysis.",
        source: "Research",
        detail: {
          lines: [
            { stat: "7,000+", text: "words per sector analysis covering problems, stakeholders, and opportunities" },
            {
              stat: "5-dimension",
              text: "scoring matrix: feasibility, impact potential, capital efficiency, timing, risk",
            },
            { stat: "12", text: "sectors cross-referenced for portfolio diversification and correlation analysis" },
          ],
        },
      },
      {
        title: "Pre-Screened Deal\nFlow Across Sectors",
        desc: "174+ vetted ventures across 12 sectors. Each pre-screened through BRIDGE Impact Score™ with transparent risk-return profiles.",
        source: "Ventures",
        detail: {
          lines: [
            { stat: "174+", text: "ventures identified, scored, and categorized by tier and sector readiness" },
            { stat: "80+", text: "minimum Impact Score threshold—only the strongest opportunities advance" },
            { stat: "3", text: "venture tiers: Priority (immediate), Medium-term, and Conditional/Long-term" },
          ],
        },
      },
      {
        title: "Blended Structures\nOptimized for Returns",
        desc: "Risk-appropriate capital stacking with DFI co-investment, concessional layers, and diaspora capital. Engineered for 8-15% target IRR.",
        source: "Investment",
        detail: {
          lines: [
            { stat: "8-15%", text: "target IRR through structures balancing risk across capital types" },
            { stat: "$135–259M", text: "total portfolio range across seed, growth, and expansion stages" },
            { stat: "4", text: "capital types orchestrated: DFI, diaspora, commercial, and concessional" },
          ],
        },
      },
      {
        title: "Transparent Impact\nYou Can Measure",
        desc: "Three-tier reporting across operational metrics, development outcomes, and Peace & Prosperity impact. Auditable, credible, real.",
        source: "Advisory",
        detail: {
          lines: [
            { stat: "3-tier", text: "measurement: operational KPIs, development outcomes, P&P flourishing" },
            { stat: "Quarterly", text: "impact reporting with transparent dashboards and verified data" },
            { stat: "12", text: "sector-specific M&E frameworks aligned to international standards" },
          ],
        },
      },
    ],
    stat: { value: "8-15%", label: "Target IRR" },
  },
  {
    id: "government",
    label: "Government",
    tagline: "Accelerate national development goals",
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
        <line x1="3" y1="22" x2="21" y2="22" />
        <line x1="6" y1="18" x2="6" y2="11" />
        <line x1="10" y1="18" x2="10" y2="11" />
        <line x1="14" y1="18" x2="14" y2="11" />
        <line x1="18" y1="18" x2="18" y2="11" />
        <polygon points="12 2 20 8 4 8" />
        <line x1="2" y1="18" x2="22" y2="18" />
      </svg>
    ),
    services: [
      {
        title: "Research Aligned to\nNational Priorities",
        desc: "Sector analysis mapped directly to development frameworks, 24-Hour Economy pillars, and budget priorities. Policy-ready intelligence.",
        source: "Research",
        detail: {
          lines: [
            { stat: "GH₵150B+", text: "government budget mapped to BRIDGE sector investment opportunities" },
            { stat: "7", text: "policy pillars of the 24-Hour Economy directly integrated into our analysis" },
            { stat: "12", text: "sectors analyzed for alignment with national development objectives" },
          ],
        },
      },
      {
        title: "Mobilize Private\nCapital at Scale",
        desc: "Connecting government priorities with impact investors, DFIs, and diaspora capital. Structured to supplement—not replace—public investment.",
        source: "Investment",
        detail: {
          lines: [
            { stat: "$135–259M", text: "private capital deployment potential aligned to public sector gaps" },
            { stat: "3", text: "capital sources mobilized: impact investors, DFIs, and diaspora networks" },
            { stat: "12", text: "sectors with structured co-investment models ready for government partnership" },
          ],
        },
      },
      {
        title: "Coordinate Across\nStakeholder Groups",
        desc: "Orchestrating development partners, local enterprise, and international expertise around Ghana-defined priorities and timelines.",
        source: "Partnerships",
        detail: {
          lines: [
            { stat: "260+", text: "districts reached through multi-stakeholder coordination networks" },
            { stat: "50+", text: "local partner organizations engaged across sectors and regions" },
            { stat: "Multi-tier", text: "engagement: community, institutional, and national policy levels" },
          ],
        },
      },
      {
        title: "Strengthen State\nCapacity to Deliver",
        desc: "From policy to action. M&E system design, institutional strengthening, and knowledge transfer that builds lasting government capacity.",
        source: "Advisory",
        detail: {
          lines: [
            { stat: "3yr", text: "capacity building horizon ensuring institutional knowledge is retained" },
            { stat: "12", text: "sector-specific M&E frameworks designed for government reporting standards" },
            { stat: "500+", text: "jobs target across priority sectors through public-private alignment" },
          ],
        },
      },
    ],
    stat: { value: "GH₵150B+", label: "Budget Aligned" },
  },
];

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

export default function ServicesSectorsPageV2() {
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState("research");
  const [selectedSector, setSelectedSector] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [footerSectorHovered, setFooterSectorHovered] = useState(null);
  const [heroSectorHovered, setHeroSectorHovered] = useState(null);
  const [activeAudience, setActiveAudience] = useState("entrepreneurs");
  const [isMobile, setIsMobile] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [sectorScrollIndex, setSectorScrollIndex] = useState(0);
  const [showPathways, setShowPathways] = useState(false);
  const [activeAudSvc, setActiveAudSvc] = useState("entrepreneurs");
  const [audSvcHovered, setAudSvcHovered] = useState(null);
  const [audSvcExpanded, setAudSvcExpanded] = useState(null);
  const [audSvcFadeKey, setAudSvcFadeKey] = useState(0);
  const [showAllAudSvc, setShowAllAudSvc] = useState(false);
  const sectorScrollRef = useRef(null);

  // Scroll detection + responsive detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const currentService = servicesData.find((s) => s.id === activeService);

  // Audience data for dynamic hero
  const audienceData = [
    {
      id: "entrepreneurs",
      label: "Entrepreneur",
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
          <path d="M2 7l1.5-4h17L22 7" />
          <path d="M2 7h20v4c0 0-1.5 2-5 2s-5-2-5-2-1.5 2-5 2-5-2-5-2V7z" />
          <path d="M4 13v8h16v-8" />
          <path d="M10 21v-6h4v6" />
        </svg>
      ),
      headline: (
        <>
          Build <span className="font-bold">Ventures</span> That Address{" "}
          <span className="font-bold text-[#B8D935]">Real Gaps</span>
        </>
      ),
      description:
        "Access incubation support, sector expertise, and pathways to capital. We help you build solutions that solve actual problems—validated by rigorous analysis, not assumptions.",
      highlights: [
        { value: "174+", label: "Ventures Mapped" },
        { value: "12", label: "Sectors" },
        { value: "5", label: "Service Pathways" },
      ],
    },
    {
      id: "businesses",
      label: "Business Entity",
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
          Expand into <span className="font-bold">High-Growth Markets</span> with{" "}
          <span className="font-bold text-[#B8D935]">Local Expertise</span>
        </>
      ),
      description:
        "Navigate Ghana's market landscape with deep sector intelligence, established partnership networks, and de-risked market entry strategies. We connect you to opportunities others miss.",
      highlights: [
        { value: "12", label: "Sectors" },
        { value: "174+", label: "Ventures" },
        { value: "$259M", label: "Opportunity" },
      ],
    },
    {
      id: "investors",
      label: "Investor",
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
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      ),
      headline: (
        <>
          Deploy <span className="font-bold">Capital</span> Where It Creates{" "}
          <span className="font-bold text-[#B8D935]">Real Impact</span>
        </>
      ),
      description:
        "Access rigorous sector analysis, diversified opportunities across 12 integrated sectors, and transparent impact measurement. Target 8-15% returns while driving measurable development outcomes.",
      highlights: [
        { value: "8-15%", label: "Target IRR" },
        { value: "12", label: "Sectors" },
        { value: "$259M", label: "Deployed" },
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
          <line x1="3" y1="22" x2="21" y2="22" />
          <line x1="6" y1="18" x2="6" y2="11" />
          <line x1="10" y1="18" x2="10" y2="11" />
          <line x1="14" y1="18" x2="14" y2="11" />
          <line x1="18" y1="18" x2="18" y2="11" />
          <polygon points="12 2 20 8 4 8" />
          <line x1="2" y1="18" x2="22" y2="18" />
        </svg>
      ),
      headline: (
        <>
          Accelerate <span className="font-bold">Development Goals</span> Through{" "}
          <span className="font-bold text-[#B8D935]">Strategic Alignment</span>
        </>
      ),
      description:
        "Partner with BRIDGE to mobilize private capital toward national priorities. Our analysis aligns with Ghana's policy frameworks, connecting public sector goals with private sector capabilities.",
      highlights: [
        { value: "GH₵150B+", label: "Budget Aligned" },
        { value: "12", label: "Sectors" },
        { value: "500+", label: "Jobs Target" },
      ],
    },
  ];

  const currentAudience = audienceData.find((a) => a.id === activeAudience);

  // Dynamic sector × audience hover text
  const sectorAudienceText = {
    entrepreneurs: [
      "Build digital infrastructure platforms",
      "Launch mobile-first financial products",
      "Create healthtech solutions at scale",
      "Develop AI and data-driven tools",
      "Build edtech for skills gaps",
      "Modernize agricultural value chains",
      "Create content and media ventures",
      "Develop affordable housing models",
      "Launch experience-based tourism",
      "Build renewable energy solutions",
      "Start light manufacturing ventures",
      "Optimize last-mile logistics",
    ],
    businesses: [
      "Enter infrastructure procurement markets",
      "Expand financial services offerings",
      "Distribute health products nationally",
      "Deploy enterprise tech solutions",
      "Scale workforce training programs",
      "Access agricultural supply chains",
      "Tap creative economy distribution",
      "Enter property development market",
      "Expand hospitality operations",
      "Supply renewable energy components",
      "Establish local manufacturing",
      "Build distribution networks",
    ],
    investors: [
      "Fund critical infrastructure gaps",
      "Back financial inclusion platforms",
      "Invest in health system capacity",
      "Deploy capital into tech ventures",
      "Fund skills-to-jobs pipelines",
      "Finance agricultural modernization",
      "Back creative industry growth",
      "Finance housing at scale",
      "Invest in tourism infrastructure",
      "Fund energy transition projects",
      "Back manufacturing scale-ups",
      "Invest in transport networks",
    ],
    government: [
      "Mobilize private infrastructure capital",
      "Advance financial inclusion policy",
      "Strengthen health delivery systems",
      "Accelerate digital transformation",
      "Align education with employment",
      "Boost agricultural productivity",
      "Develop creative economy policy",
      "Address housing deficit targets",
      "Grow tourism GDP contribution",
      "Meet renewable energy targets",
      "Support industrialization goals",
      "Modernize transport corridors",
    ],
  };

  // Filter categories - 4 categories of 3 sectors each
  const categories = [
    { id: "all", label: "All Sectors", mobileLabel: "All", sectors: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
    {
      id: "foundation",
      label: "Foundation",
      mobileLabel: "Foundation",
      description: "The physical backbone enabling everything",
      sectors: [1, 10, 12],
    }, // Infrastructure, Energy, Transportation
    {
      id: "human",
      label: "Human Capital",
      mobileLabel: "Human",
      description: "Investing in people and potential",
      sectors: [3, 5, 7],
    }, // Health, Education, Creative
    {
      id: "economic",
      label: "Economic Engines",
      mobileLabel: "Economic",
      description: "Core productive and financial sectors",
      sectors: [2, 6, 11],
    }, // Financial, Agriculture, Manufacturing
    {
      id: "growth",
      label: "Growth Sectors",
      mobileLabel: "Growth",
      description: "High-potential emerging opportunities",
      sectors: [4, 8, 9],
    }, // Technology, Housing, Tourism
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
    <Layout hideFooter>
    <div
      className="font-['Helvetica',Arial,sans-serif] m-0 p-0 bg-[#F3F5F2]"
    >

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

      {/* ============================================ */}
      {/* SECTION 1: Audience-Focused Hero */}
      {/* ============================================ */}
      <section
        className="bg-[#F3F5F2]" style={{ padding: isMobile ? "40px 20px 40px 20px" : "60px 80px 56px 80px" }}
      >
        <div className="max-w-[1200px] mx-auto">
          {/* Pill Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full mb-6 bg-white px-5 py-2.5 border border-[#DEDEDE]"
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block bg-[#B8D935]"
            />
            <span
              className="text-xs font-semibold tracking-[1.5px] font-['Inter',sans-serif] uppercase text-[#1B4D3E]"
            >
              Your Bridge to Impact
            </span>
          </div>

          {/* Main Headline - Static */}
          <h1
            className="font-['Inter',sans-serif] font-light leading-[1.12] tracking-[-1px] max-w-[900px] text-[#1B4D3E]" style={{ fontSize: isMobile ? "32px" : "56px", margin: isMobile ? "0 0 32px 0" : "0 0 48px 0" }}
          >
            We <span className="font-bold">connect</span> the people, capital, and expertise that create{" "}
            <span className="font-bold text-[#B8D935]">measurable, lasting impact.</span>
          </h1>

          {/* Audience Selector + Dynamic Content Container */}
          <div
            className="rounded-3xl overflow-hidden bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          >
            {/* Audience Tabs */}
            <div
              className="flex border-b border-[#DEDEDE]"
            >
              {audienceData.map((audience) => {
                const isActive = activeAudience === audience.id;
                return (
                  <button
                    key={audience.id}
                    onClick={() => setActiveAudience(audience.id)}
                    className="border-none cursor-pointer flex flex-1 items-center justify-center transition-all duration-300 ease-in-out" style={{ padding: isMobile ? "16px 12px" : "24px 32px", backgroundColor: isActive ? "#1B4D3E" : "transparent", gap: isMobile ? "0" : "12px", borderBottom: isActive ? "3px solid #FFFFFF" : "3px solid transparent" }}
                  >
                    <span
                      className="flex items-center transition-colors duration-300 ease-in-out" style={{ color: isActive ? "#FFFFFF" : "#999" }}
                    >
                      {audience.icon}
                    </span>
                    {!isMobile && (
                      <span
                        className="text-[15px] font-semibold font-['Inter',sans-serif] transition-colors duration-300 ease-in-out" style={{ color: isActive ? "#FFFFFF" : "#666" }}
                      >
                        {audience.label}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Dynamic Content Area */}
            <div
              className="flex-col" style={{ display: isMobile ? "flex" : "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", height: isMobile ? "auto" : "420px" }}
            >
              {/* Left - Text Content */}
              <div
                className="flex flex-col justify-center gap-8" style={{ padding: isMobile ? "32px 24px" : "48px 56px 48px 56px" }}
              >
                {/* Top content */}
                <div>
                  <h2
                    className="font-['Inter',sans-serif] font-light leading-[1.2] tracking-[-0.5px] text-[#1B4D3E] mb-6 mt-0 mx-0" style={{ fontSize: isMobile ? "24px" : "36px" }}
                  >
                    {currentAudience.headline}
                  </h2>
                  <p
                    className="text-base leading-[1.7] text-[#666] font-['Inter',sans-serif] m-0 max-w-[480px]"
                  >
                    {currentAudience.description}
                  </p>
                </div>

                {/* CTA Button - pushed to bottom */}
                <a href="/contact" className="no-underline">
                <button
                  className="cta-lime border-none text-sm font-semibold font-['Inter',sans-serif] cursor-pointer rounded-full inline-flex items-center gap-2.5 self-start transition-all duration-300 ease-in-out bg-[#B8D935] text-[#1B4D3E] px-7 py-4"
                >
                  Explore Opportunities
                  <span
                    className="w-7 h-7 bg-[rgba(27,77,62,0.15)] rounded-full flex items-center justify-center"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={colors.primary}
                      strokeWidth="2.5"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </span>
                </button>
                </a>
              </div>

              {/* Right - Sector Icons Grid + Highlight Tags */}
              <div
                className="flex flex-col justify-start bg-[#1B4D3E]" style={{ padding: isMobile ? "20px 16px 16px 16px" : "76px 40px 40px 40px" }}
              >
                {/* Section Label - Shows sector name on hover */}
                <div
                  className="text-[10px] font-bold tracking-[2px] uppercase transition-colors duration-[250ms] ease-in-out min-h-[15px] font-['DM_Sans',sans-serif]" style={{ color: heroSectorHovered !== null ? "#B8D935" : "rgba(255,255,255,0.4)", marginBottom: isMobile ? "10px" : "16px" }}
                >
                  {heroSectorHovered !== null ? FOOTER_SECTOR_ICONS[heroSectorHovered].label : "12 Integrated Sectors"}
                </div>

                {/* Sector Icons Grid - responsive layout */}
                <div
                  className="grid" style={{ gridTemplateColumns: isMobile ? "repeat(4, 1fr)" : "repeat(6, 1fr)", gap: isMobile ? "6px" : "10px", marginBottom: isMobile ? "14px" : "20px" }}
                >
                  {FOOTER_SECTOR_ICONS.map((sector, i) => {
                    const isHovered = heroSectorHovered === i;
                    return (
                      <div
                        key={sector.key}
                        onMouseEnter={() => setHeroSectorHovered(i)}
                        onMouseLeave={() => setHeroSectorHovered(null)}
                        onDoubleClick={() => navigate(sector.to)}
                        className="flex items-center justify-center cursor-pointer" style={{ aspectRatio: isMobile ? "auto" : "1", height: isMobile ? "56px" : "auto", borderRadius: isMobile ? "10px" : "12px", backgroundColor: isHovered ? "rgba(184,217,53,0.12)" : "rgba(255,255,255,0.05)", border: `1px solid ${isHovered ? "rgba(184,217,53,0.35)" : "rgba(255,255,255,0.08)"}`, transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)", transform: isHovered ? "translateY(-2px)" : "none", boxShadow: isHovered ? "0 6px 16px rgba(0,0,0,0.2), 0 0 0 1px rgba(184,217,53,0.15)" : "none" }}
                      >
                        <div
                          className="transition-opacity duration-[250ms] ease-in-out flex items-center justify-center" style={{ opacity: isHovered ? 1 : 0.6, transform: isMobile ? "scale(1.2)" : "scale(1.25)" }}
                        >
                          {sector.icon(isHovered ? colors.accent : "rgba(255,255,255,0.9)")}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Dynamic audience × sector hover text */}
                <div
                  className="text-sm font-medium font-['Inter',sans-serif] transition-all duration-300 ease-in-out min-h-[20px] leading-[1.4] text-center" style={{ color: heroSectorHovered !== null ? "#B8D935" : "rgba(255,255,255,0.3)" }}
                >
                  {heroSectorHovered !== null
                    ? sectorAudienceText[activeAudience][heroSectorHovered]
                    : "Hover to see how it connects to your goals"}
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
        className="bg-white" style={{ padding: isMobile ? "60px 20px" : "100px 80px" }}
      >
        <div className="max-w-[1200px] mx-auto">
          {/* Pill Badge - Variant A (Light Background) */}
          <div
            className="inline-flex items-center gap-2 rounded-full mb-6 px-5 py-2.5 border border-[#DEDEDE]"
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block bg-[#B8D935]"
            />
            <span
              className="text-xs font-semibold tracking-[1.5px] font-['Inter',sans-serif] uppercase text-[#1B4D3E]"
            >
              What We Do
            </span>
          </div>

          {/* Two Column: Headline + Description */}
          <div
            className="grid items-start" style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "24px" : "80px" }}
          >
            {/* Left - Headline */}
            <h2
              className="font-['Inter',sans-serif] font-light leading-[1.2] m-0 tracking-[-0.5px] text-[#1B4D3E]" style={{ fontSize: isMobile ? "28px" : "44px" }}
            >
              We <span className="font-bold">Bridge</span> the Gaps Between{" "}
              <span className="font-bold text-[#B8D935]">Insight</span>,{" "}
              <span className="font-bold text-[#B8D935]">Opportunity</span>, and{" "}
              <span className="font-bold text-[#B8D935]">Impact</span>
            </h2>

            {/* Right - Description Paragraphs */}
            <div className="max-w-[480px]">
              <p
                className="text-base leading-[1.7] text-[#666] font-['Inter',sans-serif] font-normal mb-5 mt-0 mx-0"
              >
                Different stakeholders, same mission. We connect investors to vetted opportunities. We help businesses
                navigate new markets. We mobilize private capital toward government priorities. We give entrepreneurs
                the resources to build what's missing.
              </p>
              <p
                className="text-base leading-[1.7] text-[#666] font-['Inter',sans-serif] font-normal m-0"
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
        className="bg-[#1B4D3E]" style={{ padding: isMobile ? "0 20px" : "0 80px" }}
      >
        <div
          className="max-w-[1200px] flex-col mx-auto" style={{ display: isMobile ? "flex" : "grid", gridTemplateColumns: isMobile ? "1fr" : "280px 1fr", minHeight: isMobile ? "auto" : "680px", height: isMobile ? "auto" : "680px" }}
        >
          {/* Left Side - Service Navigation */}
          <div
            className="flex flex-col" style={{ backgroundColor: isMobile ? "transparent" : "rgba(0,0,0,0.15)", padding: isMobile ? "32px 0 0 0" : "48px 0" }}
          >
            {/* Section Label */}
            <div
              style={{
                padding: isMobile ? "0" : "0 40px",
                marginBottom: isMobile ? "16px" : "28px",
              }}
            >
              <span
                className="font-bold tracking-[2px] font-['Inter',sans-serif] uppercase" style={{ fontSize: isMobile ? "12px" : "11px", color: isMobile ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.4)" }}
              >
                Our Services
              </span>
            </div>

            {/* Service Tabs */}
            <div
              style={{
                flex: isMobile ? "none" : 1,
                display: isMobile ? "flex" : "block",
                overflowX: isMobile ? "auto" : "visible",
                gap: isMobile ? "8px" : "0",
                paddingBottom: isMobile ? "16px" : "0",
                WebkitOverflowScrolling: "touch",
                ...(isMobile
                  ? {
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "50px",
                      padding: "6px",
                      gap: "6px",
                    }
                  : {}),
              }}
            >
              {servicesData.map((service) => (
                <button
                  key={service.id}
                  onClick={() => {
                    setActiveService(service.id);
                    setShowFeatures(false);
                  }}
                  className="cursor-pointer text-left transition-all duration-300 ease-in-out flex items-center shrink-0 border-none" style={{ width: isMobile ? "auto" : "100%", padding: isMobile ? "10px 20px" : "24px 40px", backgroundColor: activeService === service.id ? "#1B4D3E" : "transparent", borderLeft: isMobile
                      ? undefined
                      : activeService === service.id
                        ? `4px solid ${"#B8D935"}`
                        : "4px solid transparent", gap: isMobile ? "8px" : "16px", borderRadius: isMobile ? "50px" : "0", whiteSpace: isMobile ? "nowrap" : "normal" }}
                >
                  {/* Number */}
                  {!isMobile && (
                    <span
                      className="text-xs font-semibold font-['Inter',sans-serif] min-w-[24px]" style={{ color: activeService === service.id ? "#B8D935" : "rgba(255,255,255,0.3)" }}
                    >
                      {service.number}
                    </span>
                  )}

                  {/* Title & Subtitle */}
                  <div>
                    {!isMobile && (
                      <div
                        className="text-[11px] font-medium font-['Inter',sans-serif] uppercase tracking-[1px] mb-1" style={{ color: activeService === service.id ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.4)" }}
                      >
                        {service.subtitle}
                      </div>
                    )}
                    <div
                      className="font-semibold font-['Inter',sans-serif]" style={{ fontSize: isMobile ? "14px" : "20px", color: activeService === service.id ? "#FFFFFF" : "rgba(255,255,255,0.6)" }}
                    >
                      {service.title}
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  {activeService === service.id && !isMobile && (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={colors.accent}
                      strokeWidth="2"
                      className="ml-auto"
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
            className="flex flex-col justify-center overflow-hidden" style={{ padding: isMobile ? "32px 20px 40px 20px" : "60px 80px 60px 100px" }}
          >
            {/* Headline - Dynamic with 300/700 weight pattern */}
            <h2
              className="font-['Inter',sans-serif] font-light tracking-[-0.5px] leading-[1.2] text-white mb-6 mt-0 mx-0" style={{ fontSize: isMobile ? "26px" : "44px" }}
            >
              {currentService.id === "research" && (
                <>
                  The <span className="font-bold">Foundation</span> for Every{" "}
                  <span className="font-bold text-[#B8D935]">Decision</span>
                </>
              )}
              {currentService.id === "ventures" && (
                <>
                  From <span className="font-bold">Ideas</span> to{" "}
                  <span className="font-bold text-[#B8D935]">Impactful Solutions</span>
                </>
              )}
              {currentService.id === "investment" && (
                <>
                  <span className="font-bold">Deploying Capital</span> Where It{" "}
                  <span className="font-bold text-[#B8D935]">Matters</span>
                </>
              )}
              {currentService.id === "partnerships" && (
                <>
                  <span className="font-bold">Building Relationships</span> That{" "}
                  <span className="font-bold text-[#B8D935]">Work</span>
                </>
              )}
              {currentService.id === "advisory" && (
                <>
                  <span className="font-bold">Building Systems</span> That{" "}
                  <span className="font-bold text-[#B8D935]">Outlast Us</span>
                </>
              )}
            </h2>

            {/* Description */}
            <p
              className="text-base leading-[1.7] font-['Inter',sans-serif] font-normal max-w-[580px] text-white/50 mb-9 mt-0 mx-0"
            >
              {currentService.description}
            </p>

            {/* Stats Row */}
            <div
              className="border-b border-b-white/10" style={{ display: isMobile ? "grid" : "flex", gridTemplateColumns: isMobile ? "repeat(3, 1fr)" : undefined, gap: isMobile ? "16px" : "48px", marginBottom: isMobile ? "28px" : "40px", paddingBottom: isMobile ? "28px" : "40px" }}
            >
              {currentService.stats.map((stat, index) => (
                <div key={index} style={{ textAlign: isMobile ? "center" : "left" }}>
                  <div
                    className="font-bold font-['Inter',sans-serif] leading-none mb-2 text-[#B8D935]" style={{ fontSize: isMobile ? "22px" : "32px" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="font-['Inter',sans-serif] uppercase tracking-[0.5px] text-white/50" style={{ fontSize: isMobile ? "10px" : "13px" }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Features - Collapsible on mobile */}
            {isMobile ? (
              <div>
                <button
                  onClick={() => setShowFeatures(!showFeatures)}
                  className="w-full bg-white/[0.06] rounded-[14px] cursor-pointer flex items-center justify-between px-5 py-3.5 border border-white/[0.12]"
                >
                  <span
                    className="text-sm font-semibold font-['Inter',sans-serif] text-white"
                  >
                    Our Approach & Methodology
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={colors.accent}
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{
                      transition: "transform 0.3s ease",
                      transform: showFeatures ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {showFeatures && (
                  <div
                    className="grid gap-4 mt-4 pt-4 grid-cols-1 border-t border-t-white/[0.08]"
                  >
                    {currentService.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4"
                      >
                        <div
                          className="w-6 h-6 bg-[rgba(184,217,53,0.15)] rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={colors.accent}
                            strokeWidth="3"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <div>
                          <div
                            className="text-[15px] font-semibold font-['Inter',sans-serif] mb-1 text-white"
                          >
                            {feature.label}
                          </div>
                          <div
                            className="text-[13px] font-['Inter',sans-serif] text-white/50"
                          >
                            {feature.detail}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div
                className="grid gap-6 grid-cols-2"
              >
                {currentService.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4"
                  >
                    <div
                      className="w-6 h-6 bg-[rgba(184,217,53,0.15)] rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={colors.accent}
                        strokeWidth="3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <div>
                      <div
                        className="text-[15px] font-semibold font-['Inter',sans-serif] mb-1 text-white"
                      >
                        {feature.label}
                      </div>
                      <div
                        className="text-[13px] font-['Inter',sans-serif] text-white/50"
                      >
                        {feature.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Button */}
            <div style={{ marginTop: isMobile ? "28px" : "40px" }}>
              <a href="/contact" className="no-underline" style={{ width: isMobile ? "100%" : "auto" }}>
              <button
                className="border-none text-sm font-semibold font-['Inter',sans-serif] cursor-pointer rounded-full flex items-center justify-center gap-2.5 bg-[#B8D935] text-[#1B4D3E]" style={{ padding: isMobile ? "16px 24px" : "16px 28px", width: isMobile ? "100%" : "auto" }}
              >
                Learn More About {currentService.title}
                <span
                  className="w-7 h-7 bg-[rgba(27,77,62,0.15)] rounded-full flex items-center justify-center shrink-0"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section
        className="bg-white" style={{ padding: isMobile ? "60px 20px" : "100px 80px" }}
      >
        <div className="max-w-[1200px] mx-auto">
          {/* Section Header */}
          <div
            className="text-center" style={{ marginBottom: isMobile ? "36px" : "60px" }}
          >
            {/* Pill Badge - Variant A */}
            <div
              className="inline-flex items-center gap-2 rounded-full mb-6 px-5 py-2.5 border border-[#DEDEDE]"
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block bg-[#B8D935]"
              />
              <span
                className="text-xs font-semibold tracking-[1.5px] font-['Inter',sans-serif] uppercase text-[#1B4D3E]"
              >
                Where We Work
              </span>
            </div>
            <h2
              className="font-['Inter',sans-serif] font-light tracking-[-0.5px] leading-[1.15] text-[#1B4D3E]" style={{ fontSize: isMobile ? "24px" : "48px", margin: isMobile ? "0 0 12px 0" : "0 0 24px 0" }}
            >
              <span className="font-bold">Opportunity</span> Across{" "}
              <span className="font-bold text-[#B8D935]">Every Sector</span>
            </h2>
            <p
              style={{
                fontSize: isMobile ? "14px" : "16px",
                lineHeight: "1.7",
                color: "#666",
                fontFamily: "Inter, sans-serif",
                fontWeight: "400",
                maxWidth: "620px",
                margin: isMobile ? "0 auto 24px auto" : "0 auto 36px auto",
                ...(isMobile
                  ? {
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }
                  : {}),
              }}
            >
              From infrastructure to agriculture, financial inclusion to creative industries—each sector mapped,
              analyzed, and ready for action.
            </p>
          </div>

          {/* Filter Tabs */}
          <div
            className="flex justify-center mb-6" style={{ overflowX: isMobile ? "auto" : "visible", WebkitOverflowScrolling: "touch" }}
          >
            <div
              className="inline-flex gap-2 rounded-full shrink-0 bg-white p-2 border border-[#DEDEDE]"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setFilterCategory(cat.id);
                    setSectorScrollIndex(0);
                    if (sectorScrollRef.current) sectorScrollRef.current.scrollTo({ left: 0 });
                  }}
                  className="border-none font-['Inter',sans-serif] cursor-pointer rounded-full transition-all duration-300 ease-in-out whitespace-nowrap" style={{ backgroundColor: filterCategory === cat.id ? "#1B4D3E" : "transparent", color: filterCategory === cat.id ? "#FFFFFF" : "#191919", padding: isMobile ? "10px 16px" : "12px 24px", fontSize: isMobile ? "13px" : "14px", fontWeight: filterCategory === cat.id ? "600" : "500" }}
                >
                  {isMobile ? cat.mobileLabel : cat.label}
                  {cat.id !== "all" && !isMobile && (
                    <span
                      className="text-xs opacity-60 ml-2"
                    >
                      ({cat.sectors.length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Category Description */}
          {filterCategory !== "all" && (
            <div
              className="text-center mb-12"
            >
              <p
                className="text-base text-[#666] font-['Inter',sans-serif] italic"
              >
                {categories.find((c) => c.id === filterCategory)?.description}
              </p>
            </div>
          )}

          {/* Sectors - Carousel on mobile, Grid on desktop */}
          {isMobile ? (
            <>
              <div
                ref={sectorScrollRef}
                className="sector-scroll flex overflow-x-auto gap-0"
                onScroll={() => {
                  const el = sectorScrollRef.current;
                  if (el) {
                    const idx = Math.round(el.scrollLeft / el.offsetWidth);
                    setSectorScrollIndex(idx);
                  }
                }}
                className="snap-x snap-mandatory" style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <style>{`
                  .sector-scroll::-webkit-scrollbar { display: none; }
                `}</style>
                {filteredSectors.map((sector) => (
                  <div
                    key={sector.id}
                    onClick={() => setSelectedSector(selectedSector === sector.id ? null : sector.id)}
                    className="rounded-[20px] cursor-pointer transition-all duration-300 ease-in-out relative overflow-hidden flex flex-col box-border bg-[#F3F5F2] p-6 flex-[0_0_100%] snap-start min-h-40" style={{ border: selectedSector === sector.id ? "2px solid #B8D935" : "2px solid transparent" }}
                  >
                    {/* Sector Icon Badge */}
                    <div
                      className="absolute w-10 h-10 rounded-full flex items-center justify-center text-[#1B4D3E] top-5 right-5" style={{ backgroundColor: selectedSector === sector.id ? "#B8D935" : "#FFFFFF" }}
                    >
                      {FOOTER_SECTOR_ICONS[sector.id - 1]?.icon(colors.primary)}
                    </div>

                    {/* Sector Name */}
                    <h3
                      className="text-lg font-semibold font-['Inter',sans-serif] m-0 leading-[1.3] text-[#1B4D3E] pr-14"
                    >
                      {sector.name}
                    </h3>

                    {/* Problem text - visible in carousel */}
                    <p
                      className="text-[13px] leading-normal text-[#666] font-['Inter',sans-serif] mt-3 mb-0 mx-0"
                    >
                      {sector.problem}
                    </p>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Stats row */}
                    <div
                      className="flex justify-between items-center pt-4 mt-4 border-t border-[#DEDEDE]"
                    >
                      <span
                        className="text-sm font-semibold font-['Inter',sans-serif] text-[#1B4D3E]"
                      >
                        ${sector.capitalLow}-{sector.capitalHigh}M
                      </span>
                      <span
                        className="text-[13px] font-['Inter',sans-serif] font-semibold text-[#B8D935]"
                      >
                        {sector.ventures}+ solutions
                      </span>
                    </div>

                    {/* Expanded Content */}
                    {selectedSector === sector.id && (
                      <div
                        className="mt-4 pt-4 border-t border-[#DEDEDE]"
                      >
                        <div
                          className="text-[11px] font-semibold text-[#999] font-['Inter',sans-serif] uppercase tracking-[1px] mb-3"
                        >
                          Key Statistics
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {sector.keyStats.map((stat, idx) => (
                            <span
                              key={idx}
                              className="rounded-full text-xs font-['Inter',sans-serif] font-medium bg-white text-[#1B4D3E] px-3 py-1.5"
                            >
                              {stat}
                            </span>
                          ))}
                        </div>
                        <a href="/login" className="no-underline w-full">
                        <button
                          className="border-none text-[13px] font-semibold font-['Inter',sans-serif] cursor-pointer rounded-full mt-4 flex items-center gap-2 w-full justify-center bg-[#B8D935] text-[#1B4D3E] px-5 py-3"
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
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Scroll Dots */}
              <div
                className="flex justify-center items-center gap-1.5 mt-5"
              >
                {filteredSectors.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      const el = sectorScrollRef.current;
                      if (el) {
                        el.scrollTo({ left: i * el.offsetWidth, behavior: "smooth" });
                        setSectorScrollIndex(i);
                      }
                    }}
                    className="rounded cursor-pointer transition-all duration-300 ease-in-out" style={{ width: sectorScrollIndex === i ? "24px" : "8px", height: "8px", backgroundColor: sectorScrollIndex === i ? "#B8D935" : "#DEDEDE" }}
                  />
                ))}
              </div>
            </>
          ) : (
            <div
              className="grid gap-6" style={{ gridTemplateColumns: filterCategory === "all" ? "repeat(4, 1fr)" : "repeat(3, 1fr)" }}
            >
              {filteredSectors.map((sector) => (
                <div
                  key={sector.id}
                  onClick={() => setSelectedSector(selectedSector === sector.id ? null : sector.id)}
                  className="cursor-pointer transition-all duration-300 ease-in-out relative overflow-hidden flex flex-col bg-[#F3F5F2]" style={{ borderRadius: isMobile ? "16px" : "24px", padding: isMobile ? "16px" : filterCategory === "all" ? "24px" : "32px", border: selectedSector === sector.id ? `2px solid ${"#B8D935"}` : "2px solid transparent", minHeight: isMobile ? "130px" : filterCategory === "all" ? "160px" : "auto" }}
                >
                  {/* Sector Icon Badge */}
                  <div
                    className="absolute rounded-full flex items-center justify-center text-[#1B4D3E]" style={{ top: isMobile ? "14px" : "24px", right: isMobile ? "14px" : "24px", width: isMobile ? "32px" : "40px", height: isMobile ? "32px" : "40px", backgroundColor: selectedSector === sector.id ? "#B8D935" : "#FFFFFF" }}
                  >
                    {FOOTER_SECTOR_ICONS[sector.id - 1]?.icon(colors.primary)}
                  </div>

                  {/* Sector Name */}
                  <h3
                    className="font-semibold font-['Inter',sans-serif] m-0 leading-[1.3] text-[#1B4D3E]" style={{ fontSize: isMobile ? "13px" : filterCategory === "all" ? "16px" : "22px", paddingRight: isMobile ? "40px" : "56px", minHeight: isMobile ? "34px" : filterCategory === "all" ? "42px" : "auto" }}
                  >
                    {sector.name}
                  </h3>

                  {/* Spacer pushes stats to bottom */}
                  <div className="flex-1" />

                  {/* Problem - Hidden in "all" view and mobile for cleaner look */}
                  {filterCategory !== "all" && !isMobile && (
                    <p
                      className="text-sm leading-[1.6] text-[#666] font-['Inter',sans-serif] mb-5 mt-0 mx-0"
                    >
                      {sector.problem}
                    </p>
                  )}

                  {/* Compact stats for "all" view */}
                  {filterCategory === "all" ? (
                    <div
                      className="flex justify-between" style={{ alignItems: isMobile ? "flex-start" : "center", paddingTop: isMobile ? "12px" : "16px", borderTop: `1px solid ${"#DEDEDE"}`, marginTop: isMobile ? "12px" : "16px", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "4px" : "0" }}
                    >
                      <span
                        className="font-semibold font-['Inter',sans-serif] text-[#1B4D3E]" style={{ fontSize: isMobile ? "12px" : "14px" }}
                      >
                        ${sector.capitalLow}-{sector.capitalHigh}M
                      </span>
                      <span
                        className="font-['Inter',sans-serif] font-semibold text-[#B8D935]" style={{ fontSize: isMobile ? "11px" : "13px" }}
                      >
                        {sector.ventures}+ solutions
                      </span>
                    </div>
                  ) : (
                    <>
                      {/* Focus Areas - Full view */}
                      <div
                        className="rounded-xl mb-5 bg-white p-4"
                      >
                        <div
                          className="text-[11px] font-semibold text-[#999] font-['Inter',sans-serif] uppercase tracking-[1px] mb-2"
                        >
                          BRIDGE Focus
                        </div>
                        <div
                          className="text-[13px] font-['Inter',sans-serif] leading-normal text-[#1B4D3E]"
                        >
                          {sector.focus}
                        </div>
                      </div>

                      {/* Stats Row */}
                      <div
                        className="flex justify-between pt-4 border-t border-[#DEDEDE]"
                      >
                        <div>
                          <div
                            className="text-xl font-bold font-['Inter',sans-serif] text-[#1B4D3E]"
                          >
                            ${sector.capitalLow}-{sector.capitalHigh}M
                          </div>
                          <div
                            className="text-[11px] text-[#999] font-['Inter',sans-serif] uppercase tracking-[0.5px]"
                          >
                            Capital Range
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className="text-xl font-bold font-['Inter',sans-serif] text-[#1B4D3E]"
                          >
                            {sector.ventures}+
                          </div>
                          <div
                            className="text-[11px] text-[#999] font-['Inter',sans-serif] uppercase tracking-[0.5px]"
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
                      className="pt-5 mt-5 border-t border-[#DEDEDE]"
                    >
                      {/* Show problem if in "all" view */}
                      {filterCategory === "all" && (
                        <p
                          className="text-[13px] leading-[1.6] text-[#666] font-['Inter',sans-serif] mb-4 mt-0 mx-0"
                        >
                          {sector.problem}
                        </p>
                      )}

                      <div
                        className="text-[11px] font-semibold text-[#999] font-['Inter',sans-serif] uppercase tracking-[1px] mb-3"
                      >
                        Key Statistics
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {sector.keyStats.map((stat, idx) => (
                          <span
                            key={idx}
                            className="rounded-full text-xs font-['Inter',sans-serif] font-medium bg-white text-[#1B4D3E] px-3 py-1.5"
                          >
                            {stat}
                          </span>
                        ))}
                      </div>

                      {/* View Full Analysis Button */}
                      <a href="/login" className="no-underline w-full">
                      <button
                        className="border-none text-[13px] font-semibold font-['Inter',sans-serif] cursor-pointer rounded-full mt-4 flex items-center gap-2 w-full justify-center bg-[#B8D935] text-[#1B4D3E] px-5 py-3"
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
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cross-Sector Integration Section */}
      <section
        className="bg-[#F3F5F2]" style={{ padding: isMobile ? "60px 20px" : "100px 80px" }}
      >
        <div className="max-w-[1200px] mx-auto">
          <div
            className="grid items-start" style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "40px" : "80px" }}
          >
            {/* Left - Content */}
            <div>
              {/* Pill Badge - Light Background Variant */}
              <div
                className="inline-flex items-center gap-2 rounded-full mb-6 bg-white px-5 py-2.5 border border-[#DEDEDE]"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block bg-[#B8D935]"
                />
                <span
                  className="text-xs font-semibold tracking-[1.5px] font-['Inter',sans-serif] uppercase text-[#1B4D3E]"
                >
                  Connected Solutions
                </span>
              </div>
              <h2
                className="font-['Inter',sans-serif] font-light tracking-[-0.5px] leading-[1.2] text-[#1B4D3E] mb-6 mt-0 mx-0" style={{ fontSize: isMobile ? "28px" : "44px" }}
              >
                <span className="font-bold">Progressive Systems</span>, Not{" "}
                <span className="font-bold text-[#B8D935]">Silos</span>
              </h2>
              <p
                className="text-base leading-[1.7] text-[#666] font-['Inter',sans-serif] font-normal max-w-[420px]" style={{ margin: isMobile ? "0 0 24px 0" : "0 0 48px 0" }}
              >
                Addressing one sector while ignoring connected sectors creates partial solutions that don't hold. BRIDGE
                thinks in systems—understanding how interventions in one area create ripple effects across others.
              </p>

              {/* Quote */}
              <div
                className="pl-6 border-l-4 border-l-[#B8D935]" style={{ marginBottom: isMobile ? "24px" : "52px" }}
              >
                <p
                  className="text-lg italic font-['Georgia',serif] m-0 leading-[1.6] text-[#1B4D3E]"
                >
                  "A hospital means nothing without power, roads, trained staff, and pharmaceutical supply chains. Every
                  sector depends on others."
                </p>
              </div>

              {/* CTA - hidden on mobile, shown after pathways */}
              {!isMobile && (
                <a href="/methodology" className="no-underline">
                <button
                  className="border-none text-sm font-semibold font-['Inter',sans-serif] cursor-pointer rounded-full flex items-center gap-2.5 bg-[#1B4D3E] text-white px-7 py-4"
                >
                  See How It Works
                  <span
                    className="w-7 h-7 bg-white/[0.15] rounded-full flex items-center justify-center"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.white} strokeWidth="2.5">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </span>
                </button>
                </a>
              )}
            </div>

            {/* Right - Integration Examples with Icon Pathways */}
            {isMobile ? (
              <div>
                <button
                  onClick={() => setShowPathways(!showPathways)}
                  className="w-full rounded-2xl cursor-pointer flex items-center justify-between bg-white px-5 py-4 border border-[#DEDEDE]"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 bg-[rgba(27,77,62,0.08)] rounded-lg flex items-center justify-center"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={colors.primary}
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                    <span
                      className="text-[15px] font-semibold font-['Inter',sans-serif] text-[#1B4D3E]"
                    >
                      {showPathways ? "Hide" : "View"} Integration Pathways
                    </span>
                  </div>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={colors.primary}
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{
                      transition: "transform 0.3s ease",
                      transform: showPathways ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {showPathways && (
                  <div
                    className="flex flex-col gap-4 mt-4"
                  >
                    {/* Farm to Fork */}
                    <div
                      className="rounded-2xl bg-white p-5 border border-[#DEDEDE]"
                    >
                      <div
                        className="text-[17px] font-semibold font-['Inter',sans-serif] mb-4 text-[#1B4D3E]"
                      >
                        Farm to Fork
                      </div>
                      <div className="flex items-center gap-0 mb-3.5">
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
                      <div className="text-[13px] text-[#666] font-['Inter',sans-serif]">
                        Production → Processing → Cold Chain → Markets → Credit
                      </div>
                    </div>

                    {/* Healthcare Delivery */}
                    <div
                      className="rounded-2xl bg-white p-5 border border-[#DEDEDE]"
                    >
                      <div
                        className="text-[17px] font-semibold font-['Inter',sans-serif] mb-4 text-[#1B4D3E]"
                      >
                        Healthcare Delivery
                      </div>
                      <div className="flex items-center gap-0 mb-3.5">
                        <IconCircle icon={<IconHeart />} isFirst />
                        <DottedLine />
                        <IconCircle icon={<IconFactory />} />
                        <DottedLine />
                        <IconCircle icon={<IconTruck />} />
                        <DottedLine />
                        <IconCircle icon={<IconCpu />} />
                        <DottedLine />
                        <IconCircle icon={<IconWallet />} />
                      </div>
                      <div className="text-[13px] text-[#666] font-['Inter',sans-serif]">
                        Facilities → Pharmaceuticals → Distribution → Telemedicine → Insurance
                      </div>
                    </div>

                    {/* Skills to Jobs */}
                    <div
                      className="rounded-2xl bg-white p-5 border border-[#DEDEDE]"
                    >
                      <div
                        className="text-[17px] font-semibold font-['Inter',sans-serif] mb-4 text-[#1B4D3E]"
                      >
                        Skills to Jobs
                      </div>
                      <div className="flex items-center gap-0 mb-3.5">
                        <IconCircle icon={<IconGraduation />} isFirst />
                        <DottedLine />
                        <IconCircle icon={<IconCpu />} />
                        <DottedLine />
                        <IconCircle icon={<IconBuilding />} />
                        <DottedLine />
                        <IconCircle icon={<IconFactory />} />
                        <DottedLine />
                        <IconCircle icon={<IconWallet />} />
                      </div>
                      <div className="text-[13px] text-[#666] font-['Inter',sans-serif]">
                        Training → Digital Skills → Connectivity → Employment → Enterprise Credit
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile CTA - below pathways */}
                <a href="/contact" className="no-underline w-full">
                <button
                  className="border-none text-sm font-semibold font-['Inter',sans-serif] cursor-pointer rounded-full flex items-center justify-center gap-2.5 mt-6 w-full bg-[#1B4D3E] text-white px-7 py-4"
                >
                  Let's Build Something Together
                  <span
                    className="w-7 h-7 bg-white/[0.15] rounded-full flex items-center justify-center"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.white} strokeWidth="2.5">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </span>
                </button>
                </a>
              </div>
            ) : (
              <div
                className="flex flex-col gap-5"
              >
                {/* Farm to Fork */}
                <div
                  className="rounded-[20px] bg-white p-7 border border-[#DEDEDE]"
                >
                  <div
                    className="text-xl font-semibold font-['Inter',sans-serif] mb-5 text-[#1B4D3E]"
                  >
                    Farm to Fork
                  </div>

                  {/* Icon Pathway */}
                  <div
                    className="flex items-center gap-0 mb-5"
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
                    className="text-sm text-[#666] font-['Inter',sans-serif]"
                  >
                    Production → Processing → Cold Chain → Markets → Credit
                  </div>
                </div>

                {/* Healthcare Delivery */}
                <div
                  className="rounded-[20px] bg-white p-7 border border-[#DEDEDE]"
                >
                  <div
                    className="text-xl font-semibold font-['Inter',sans-serif] mb-5 text-[#1B4D3E]"
                  >
                    Healthcare Delivery
                  </div>

                  {/* Icon Pathway */}
                  <div
                    className="flex items-center gap-0 mb-5"
                  >
                    <IconCircle icon={<IconHeart />} isFirst />
                    <DottedLine />
                    <IconCircle icon={<IconFactory />} />
                    <DottedLine />
                    <IconCircle icon={<IconTruck />} />
                    <DottedLine />
                    <IconCircle icon={<IconCpu />} />
                    <DottedLine />
                    <IconCircle icon={<IconWallet />} />
                  </div>

                  <div
                    className="text-sm text-[#666] font-['Inter',sans-serif]"
                  >
                    Facilities → Pharmaceuticals → Distribution → Telemedicine → Insurance
                  </div>
                </div>

                {/* Skills to Jobs */}
                <div
                  className="rounded-[20px] bg-white p-7 border border-[#DEDEDE]"
                >
                  <div
                    className="text-xl font-semibold font-['Inter',sans-serif] mb-5 text-[#1B4D3E]"
                  >
                    Skills to Jobs
                  </div>

                  {/* Icon Pathway */}
                  <div
                    className="flex items-center gap-0 mb-5"
                  >
                    <IconCircle icon={<IconGraduation />} isFirst />
                    <DottedLine />
                    <IconCircle icon={<IconCpu />} />
                    <DottedLine />
                    <IconCircle icon={<IconBuilding />} />
                    <DottedLine />
                    <IconCircle icon={<IconFactory />} />
                    <DottedLine />
                    <IconCircle icon={<IconWallet />} />
                  </div>

                  <div
                    className="text-sm text-[#666] font-['Inter',sans-serif]"
                  >
                    Training → Digital Skills → Connectivity → Employment → Enterprise Credit
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* AUDIENCE SERVICES SECTION                          */}
      {/* ═══════════════════════════════════════════════════ */}
      <section
        className="bg-white" style={{ padding: isMobile ? "60px 20px" : "100px 80px" }}
      >
        <div className="max-w-[1200px] mx-auto">
          {/* Section Header */}
          <div style={{ marginBottom: isMobile ? "32px" : "44px" }}>
            {/* Pill Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full mb-6 px-5 py-2.5 border border-[#DEDEDE]"
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block bg-[#B8D935]"
              />
              <span
                className="text-xs font-semibold tracking-[1.5px] font-['Inter',sans-serif] uppercase text-[#1B4D3E]"
              >
                BRIDGE
              </span>
            </div>

            {/* Two Column: Headline + Description */}
            <div
              className="grid items-start" style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "24px" : "80px" }}
            >
              <h2
                className="font-['Inter',sans-serif] font-light leading-[1.2] m-0 tracking-[-0.5px] text-[#1B4D3E]" style={{ fontSize: isMobile ? "28px" : "44px" }}
              >
                Your <span className="font-bold">Tool</span>. Your{" "}
                <span className="font-bold">Resource</span>.
                <br />
                Your <span className="font-bold text-[#B8D935]">Solution</span>.
              </h2>
              <div className="max-w-[480px]">
                <p
                  className="text-base leading-[1.7] text-[#6B7B76] font-['Inter',sans-serif] font-normal m-0"
                >
                  Whether you need market intelligence, structured capital, operational support, or policy-aligned
                  partnerships — BRIDGE meets you where you are.
                </p>
              </div>
            </div>
          </div>

          {/* Audience Tabs */}
          <div
            className="flex box-border"
            style={{
              gap: isMobile ? "8px" : "4px",
              marginBottom: isMobile ? "28px" : "36px",
              ...(isMobile
                ? {
                    justifyContent: "center",
                  }
                : {
                    backgroundColor: "#F3F5F2",
                    borderRadius: "12px",
                    padding: "5px",
                    width: "100%",
                  }),
            }}
          >
            {audienceServicesData.map((aud) => {
              const isActive = activeAudSvc === aud.id;
              return (
                <button
                  key={aud.id}
                  onClick={() => {
                    if (aud.id !== activeAudSvc) {
                      setActiveAudSvc(aud.id);
                      setAudSvcFadeKey((k) => k + 1);
                      setAudSvcHovered(null);
                      setAudSvcExpanded(null);
                      setShowAllAudSvc(false);
                    }
                  }}
                  className="flex items-center justify-center border-none cursor-pointer transition-all duration-[250ms] ease-in-out"
                  style={{
                    flex: isMobile ? "0 0 auto" : "1",
                    gap: isMobile ? "0" : "9px",
                    padding: isMobile ? "12px" : "13px 20px",
                    borderRadius: isMobile ? "12px" : "9px",
                    backgroundColor: isActive ? colors.white : "transparent",
                    boxShadow: isActive && !isMobile ? "0 1px 4px rgba(0,0,0,0.06)" : "none",
                    ...(isMobile
                      ? {
                          width: "48px",
                          height: "48px",
                          border: isActive ? `2px solid ${colors.primary}` : `1.5px solid ${colors.line}`,
                          backgroundColor: isActive ? colors.accent : colors.white,
                        }
                      : {}),
                  }}
                >
                  <span className="flex transition-all duration-[250ms] ease-in-out">
                    {aud.icon(
                      isMobile
                        ? isActive
                          ? colors.primary
                          : "rgba(27,77,62,0.35)"
                        : isActive
                          ? colors.primary
                          : "rgba(27,77,62,0.3)",
                    )}
                  </span>
                  {!isMobile && (
                    <span
                      className="text-[13px] font-['DM_Sans',sans-serif] tracking-[0.2px] whitespace-nowrap transition-all duration-[250ms] ease-in-out" style={{ fontWeight: isActive ? "700" : "500", color: isActive ? "#1B4D3E" : "rgba(27,77,62,0.4)" }}
                    >
                      {aud.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active audience label - mobile only */}
          {isMobile &&
            (() => {
              const aud = audienceServicesData.find((a) => a.id === activeAudSvc);
              return (
                <div className="text-center mb-6 -mt-4">
                  <span
                    className="text-[13px] font-bold font-['DM_Sans',sans-serif] text-[#1B4D3E]"
                  >
                    {aud.label}
                  </span>
                </div>
              );
            })()}

          {/* Content Area */}
          {(() => {
            const currentAudSvc = audienceServicesData.find((a) => a.id === activeAudSvc);
            return (
              <div key={audSvcFadeKey} style={{ animation: "audSvcFade 0.3s ease forwards" }}>
                <style>{`
                @keyframes audSvcFade {
                  from { opacity: 0; transform: translateY(6px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}</style>

                {/* Tagline + Stat row */}
                <div
                  className="flex justify-between mb-6" style={{ alignItems: isMobile ? "flex-start" : "center", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "16px" : "0" }}
                >
                  <div>
                    <div
                      className="text-[11px] font-semibold uppercase tracking-[2px] font-['Inter',sans-serif] mb-1.5 text-[rgba(27,77,62,0.35)]"
                    >
                      How We Serve
                    </div>
                    <div
                      className="font-light font-['Inter',sans-serif] leading-[1.2] tracking-[-0.3px] text-[#1B4D3E]" style={{ fontSize: isMobile ? "22px" : "26px" }}
                    >
                      {currentAudSvc.tagline}
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-2" style={{ textAlign: isMobile ? "left" : "right", flexDirection: isMobile ? "row" : "column" }}
                  >
                    <div
                      className="font-bold font-['Inter',sans-serif] leading-none text-center text-[#1B4D3E]" style={{ fontSize: isMobile ? "26px" : "34px" }}
                    >
                      {currentAudSvc.stat.value}
                    </div>
                    <div
                      className="text-[11px] uppercase tracking-[1px] font-['Inter',sans-serif] text-center text-[rgba(27,77,62,0.4)]" style={{ marginTop: isMobile ? "0" : "4px" }}
                    >
                      {currentAudSvc.stat.label}
                    </div>
                  </div>
                </div>

                {/* Service Cards */}
                <div
                  className="grid transition-all duration-300 ease-in-out" style={{ gridTemplateColumns: isMobile ? "1fr" : audSvcExpanded ? "1fr" : "repeat(4, minmax(0, 1fr))", gap: isMobile ? "12px" : "10px", alignItems: audSvcExpanded ? "start" : "stretch" }}
                >
                  {currentAudSvc.services.map((svc, idx) => {
                    const cardKey = `${activeAudSvc}-${idx}`;
                    const isHovered = audSvcHovered === cardKey;
                    const isExpanded = audSvcExpanded === cardKey;
                    const someExpanded = audSvcExpanded !== null;
                    if (someExpanded && !isExpanded) return null;
                    if (isMobile && !showAllAudSvc && !someExpanded && idx > 0) return null;
                    return (
                      <div
                        key={cardKey}
                        onMouseEnter={() => setAudSvcHovered(cardKey)}
                        onMouseLeave={() => setAudSvcHovered(null)}
                        onClick={() => setAudSvcExpanded(audSvcExpanded === cardKey ? null : cardKey)}
                        className="rounded-[14px] cursor-pointer transition-all duration-300 ease-in-out flex flex-col min-w-0 overflow-x-hidden box-border" style={{ backgroundColor: isExpanded
                            ? "rgba(27,77,62,0.025)"
                            : isHovered
                              ? "rgba(27,77,62,0.015)"
                              : "#FFFFFF", border: `2px solid ${isExpanded ? "#1B4D3E" : isHovered ? "#1B4D3E" : "rgba(27,77,62,0.2)"}`, padding: isExpanded ? (isMobile ? "24px" : "32px 36px") : isMobile ? "18px" : "18px 16px", transform: isHovered || isExpanded ? "translateY(-2px)" : "none", boxShadow: isExpanded
                            ? "0 12px 32px rgba(27,77,62,0.08)"
                            : isHovered
                              ? "0 8px 24px rgba(27,77,62,0.06)"
                              : "none" }}
                      >
                        {/* Title row with badge */}
                        <div
                          className="flex justify-between items-start gap-3" style={{ marginBottom: isExpanded ? "12px" : "8px" }}
                        >
                          <div
                            className="font-bold font-['DM_Sans',sans-serif] leading-[1.3] text-[#191919]" style={{ fontSize: isExpanded ? (isMobile ? "20px" : "22px") : isMobile ? "16px" : "14px", whiteSpace: isExpanded ? "normal" : "pre-line", flex: 1 }}
                          >
                            {isExpanded ? svc.title.replace("\n", " ") : svc.title}
                          </div>
                          <span
                            className="text-[9px] font-semibold font-['Inter',sans-serif] uppercase tracking-[0.8px] rounded bg-[rgba(184,217,53,0.15)] whitespace-nowrap shrink-0 text-[#1B4D3E] px-2 py-[3px]" style={{ marginTop: isExpanded ? "6px" : "2px" }}
                          >
                            {svc.source}
                          </span>
                        </div>

                        {/* Description */}
                        <div
                          className="text-[#6B7B76] font-['Inter',sans-serif] leading-[1.65] break-words" style={{ fontSize: isExpanded ? (isMobile ? "15px" : "16px") : isMobile ? "13px" : "12.5px", maxWidth: isExpanded ? "720px" : "none" }}
                        >
                          {svc.desc}
                        </div>

                        {/* Expand indicator */}
                        <div className="flex items-center gap-1.5 mt-2.5">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={isExpanded ? colors.primary : "rgba(27,77,62,0.3)"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                              transition: "transform 0.25s ease, stroke 0.25s ease",
                              transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
                            }}
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                          <span
                            className="text-[11px] font-semibold font-['Inter',sans-serif] tracking-[0.5px] transition-colors duration-[250ms] ease-in-out" style={{ color: isExpanded ? "#1B4D3E" : "rgba(27,77,62,0.3)" }}
                          >
                            {isExpanded ? "Collapse" : "How it works"}
                          </span>
                        </div>

                        {/* Expanded Detail */}
                        <div
                          className="overflow-hidden transition-[max-height,opacity,margin] duration-[350ms,250ms,300ms] ease-in-out" style={{ maxHeight: isExpanded ? "400px" : "0", opacity: isExpanded ? 1 : 0, marginTop: isExpanded ? "20px" : "0" }}
                        >
                          <div
                            className="pt-5 grid gap-3.5 border-t border-[#DEDEDE]" style={{ gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))" }}
                          >
                            {svc.detail.lines.map((line, li) => (
                              <div
                                key={li}
                                className="flex flex-col gap-2 rounded-[10px] bg-white border border-[#DEDEDE]" style={{ padding: isMobile ? "16px" : "20px" }}
                              >
                                <span
                                  className="font-extrabold font-['Inter',sans-serif] leading-[1.2] text-[#1B4D3E]" style={{ fontSize: isMobile ? "18px" : "22px" }}
                                >
                                  {line.stat}
                                </span>
                                <span
                                  className="text-[13px] text-[#6B7B76] font-['Inter',sans-serif] leading-[1.55]"
                                >
                                  {line.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Mobile: Show All / Collapse toggle */}
                {isMobile && audSvcExpanded === null && (
                  <button
                    onClick={() => setShowAllAudSvc(!showAllAudSvc)}
                    className="flex items-center justify-center gap-1.5 w-full rounded-[10px] bg-transparent cursor-pointer transition-all duration-[250ms] ease-in-out p-3.5 mt-3 border border-[#DEDEDE]"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={colors.primary}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        transition: "transform 0.25s ease",
                        transform: showAllAudSvc ? "rotate(180deg)" : "rotate(0)",
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                    <span
                      className="text-[13px] font-semibold font-['Inter',sans-serif] text-[#1B4D3E]"
                    >
                      {showAllAudSvc ? "Show less" : `View all ${currentAudSvc.services.length} services`}
                    </span>
                  </button>
                )}
              </div>
            );
          })()}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative overflow-hidden bg-[#1B4D3E]" style={{ padding: isMobile ? "60px 20px" : "100px 80px" }}
      >
        {/* Background Pattern */}
        <div
          className="absolute top-0 left-0 right-0 bottom-0 opacity-5 bg-[length:30px_30px] bg-[radial-gradient(#B8D935_1px,transparent_1px)]"
        />
        <div className="max-w-[1200px] mx-auto">

        <div className="max-w-[900px] text-center relative mx-auto">
          <h2
            className="font-['Inter',sans-serif] font-light tracking-[-0.5px] leading-[1.2] text-white mb-6 mt-0 mx-0" style={{ fontSize: isMobile ? "28px" : "48px" }}
          >
            Let's <span className="font-bold">Build</span> Something{" "}
            <span className="font-bold text-[#B8D935]">Together</span>
          </h2>
          <p
            className="text-base leading-[1.7] font-['Inter',sans-serif] font-normal max-w-[620px] text-white/60 mb-9 mt-0 mx-0 ml-auto mr-auto"
          >
            Whether you're deploying capital, entering markets, advancing policy, or building a venture—we're ready to
            connect.
          </p>

          <div
            className="flex justify-center items-center" style={{ gap: isMobile ? "12px" : "16px", flexDirection: isMobile ? "column" : "row" }}
          >
            <a href="/contact" className="no-underline" style={{ display: isMobile ? "block" : "inline-block", width: isMobile ? "100%" : "auto" }}>
              <button
                className="border-none text-sm font-semibold font-['Inter',sans-serif] cursor-pointer rounded-full flex items-center justify-center gap-2.5 bg-[#B8D935] text-[#1B4D3E] px-7 py-4" style={{ width: isMobile ? "100%" : "auto" }}
              >
                Start a Conversation
                <span
                  className="w-7 h-7 bg-[rgba(27,77,62,0.15)] rounded-full flex items-center justify-center"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              </button>
            </a>
            <a href="/services" className="no-underline" style={{ display: isMobile ? "block" : "inline-block", width: isMobile ? "100%" : "auto" }}>
              <button
                className="bg-transparent text-sm font-semibold font-['Inter',sans-serif] cursor-pointer rounded-full text-center text-white px-7 py-4 border-[1.5px] border-white/30" style={{ width: isMobile ? "100%" : "auto" }}
              >
                Explore Sectors
              </button>
            </a>
           </div>
         </div>
        </div>
      </section>

      {/* Divider */}
      <div className="bg-[#1B4D3E]" style={{ padding: isMobile ? "0 20px" : "0 80px" }}>
        <div className="h-px bg-white/[0.08]" />
      </div>

      {/* Footer — Exact match to BRIDGE_Footer_Exact_Build_Handoff.md */}
      <footer className="p-0 bg-[#1B4D3E]">
        {/* Section separator */}
        <div className="px-20">
          <div className="h-[0.5px] bg-white/[0.08]" />
        </div>

        {isMobile ? (
          /* ═══ MOBILE FOOTER ═══ */
          <div className="flex flex-col gap-6 pt-8 px-5 pb-4">
            {/* Row 1: Logo + Nav labels */}
            <div className="flex items-center gap-6">
              <div className="shrink-0">
                <div className="flex items-center h-10">
                  <svg viewBox="0 0 4113.9 932.3" height="36" className="block">
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
              </div>
              <div
                className="flex gap-4 flex-wrap justify-end ml-auto"
              >
                {["Company", "Services", "Resources", "Insights"].map((label) => (
                  <a
                    key={label}
                    href={label === "Company" ? "/about" : label === "Services" ? "/services" : label === "Resources" ? "/resources" : "/insights"}
                    className="font-['DM_Sans',sans-serif] text-xs font-semibold tracking-[0.5px] no-underline text-white/50"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
            {/* Row 2: Subscribe inline */}
            <div className="flex gap-2">
              <input
                placeholder="Subscribe to insights"
                className="rounded-lg bg-white/5 text-xs font-['DM_Sans',sans-serif] outline-none text-white px-3.5 py-[11px] border border-white/[0.12] flex-1"
              />
              <button
                className="border-none text-xs font-bold font-['DM_Sans',sans-serif] cursor-pointer rounded-lg bg-[#B8D935] text-[#1B4D3E] px-[18px] py-[11px]"
              >
                {"\u2192"}
              </button>
            </div>
            {/* Row 3: Contact + Social */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="text-xs font-['DM_Sans',sans-serif] text-white/40">
                  Accra, Ghana
                </span>
                <span className="text-xs text-white/[0.15]">{"\u00B7"}</span>
                <span
                  className="text-xs font-semibold font-['DM_Sans',sans-serif] text-[#B8D935]"
                >
                  info@bridgepbc.com
                </span>
              </div>
              <div className="flex gap-1.5">
                {SOCIAL_ICONS.map((icon, i) => (
                    <a
                      key={i}
                      href={SOCIAL_HREFS[i]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-md bg-white/[0.06] flex items-center justify-center cursor-pointer no-underline text-white/40"
                    >
                    <span className="scale-[0.8125] flex">{icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ═══ DESKTOP FOOTER ═══ */
          <>
            <div className="grid pt-16 px-20 pb-8 grid-cols-[325px_1fr] gap-[220px]">
              {/* LEFT — Brand */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="mb-6 flex items-center h-10">
                    <svg viewBox="0 0 4113.9 932.3" height="36" className="block">
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
                    className="text-sm font-['DM_Sans',sans-serif] leading-[1.8] max-w-[325px] text-white/50 mb-7 mt-0 mx-0"
                  >
                    Blending resources and innovation across the integrated sectors for development, growth, and
                    empowerment.
                  </p>

                  <p
                    className="text-sm font-['DM_Sans',sans-serif] leading-[1.7] text-white/[0.55] mb-1 mt-0 mx-0"
                  >
                    Accra, Ghana
                  </p>
                  <p
                    className="text-sm font-['DM_Sans',sans-serif] m-0 font-semibold text-[#B8D935]"
                  >
                    info@bridgepbc.com
                  </p>
                </div>

                {/* Bottom content — subscribe + social */}
                <div>
                  <div className="mb-4 max-w-[325px]">
                    <span
                      className="text-xs font-semibold font-['DM_Sans',sans-serif] uppercase tracking-[1.5px] block mb-3 text-white/40"
                    >
                      Subscribe to Insights
                    </span>
                    <div className="flex gap-2">
                      <input
                        placeholder="Your email address"
                        className="rounded-lg bg-white/5 text-[13px] font-['DM_Sans',sans-serif] outline-none h-11 box-border text-white px-4 py-3 border border-white/[0.12] flex-1"
                      />
                      <button
                        className="border-none text-[13px] font-bold font-['DM_Sans',sans-serif] cursor-pointer rounded-lg h-11 box-border bg-[#B8D935] text-[#1B4D3E] px-5 py-3"
                      >
                        {"\u2192"}
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2.5 mt-4">
                    {SOCIAL_ICONS.map((icon, i) => (
                      <a
                        key={i}
                        href={SOCIAL_HREFS[i]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-[34px] h-[34px] rounded-lg bg-white/[0.06] flex items-center justify-center cursor-pointer no-underline text-white/[0.45]"
                      >
                        {icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT — Links top, sector grid bottom */}
              <div
                className="flex flex-col justify-between max-w-[680px]"
              >
                {/* 4 Link columns */}
                <div className="grid grid-cols-4">
                  <div>
                    <h4
                      className="text-xs font-bold font-['DM_Sans',sans-serif] uppercase tracking-[1.5px] mb-6 text-[#B8D935]"
                    >
                      Company
                    </h4>
                    {["About BRIDGE", "Our Approach", "Sectors", "Contact Us"].map((link) => (
                      <a
                        key={link}
                        href={footerLinkHref(link)}
                        className="block text-sm font-['DM_Sans',sans-serif] no-underline mb-3.5 text-white/60"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                  <div>
                    <h4
                      className="text-xs font-bold font-['DM_Sans',sans-serif] uppercase tracking-[1.5px] mb-6 text-[#B8D935]"
                    >
                      Services
                    </h4>
                    {["Research & Guidance", "Venture Development", "Direct Investment", "Strategic Partnerships"].map(
                      (link) => (
                        <a
                          key={link}
                          href={footerLinkHref(link)}
                          className="block text-sm font-['DM_Sans',sans-serif] no-underline mb-3.5 text-white/60"
                        >
                          {link}
                        </a>
                      ),
                    )}
                  </div>
                  <div>
                    <h4
                      className="text-xs font-bold font-['DM_Sans',sans-serif] uppercase tracking-[1.5px] mb-6 text-[#B8D935]"
                    >
                      Resources
                    </h4>
                    {["White Paper", "Case Studies", "Research Library", "Data & Reports"].map((link) => (
                      <a
                        key={link}
                        href={footerLinkHref(link)}
                        className="block text-sm font-['DM_Sans',sans-serif] no-underline mb-3.5 text-white/60"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                  <div>
                    <h4
                      className="text-xs font-bold font-['DM_Sans',sans-serif] uppercase tracking-[1.5px] mb-6 text-[#B8D935]"
                    >
                      Insights
                    </h4>
                    {["Insights & Analysis", "Sector Briefs", "Policy Updates", "Annual Review"].map((link) => (
                      <a
                        key={link}
                        href={footerLinkHref(link)}
                        className="block text-sm font-['DM_Sans',sans-serif] no-underline mb-3.5 text-white/60"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Sector Grid Widget — desktop only */}
                <div className="mb-[50px]">
                  <div
                    className="text-xs font-semibold font-['DM_Sans',sans-serif] uppercase tracking-[1.5px] mb-3 transition-colors duration-[250ms] ease-in-out leading-none min-h-[12px]" style={{ color: footerSectorHovered !== null ? "#B8D935" : "rgba(255,255,255,0.4)" }}
                  >
                    {footerSectorHovered !== null ? FOOTER_SECTOR_ICONS[footerSectorHovered].label : "Explore 12 Sectors"}
                  </div>
                  <div className="flex justify-between items-center">
                    {FOOTER_SECTOR_ICONS.map((sector, i) => {
                      const isH = footerSectorHovered === i;
                      return (
                        <a
                          key={sector.key}
                          href={({
                            infra: "/sectors/infrastructure",
                            fin: "/sectors/financial",
                            health: "/sectors/health",
                            tech: "/sectors/technology",
                            edu: "/sectors/education",
                            agri: "/sectors/agriculture",
                            creative: "/sectors/sports",
                            housing: "/sectors/housing",
                            tourism: "/sectors/tourism",
                            energy: "/sectors/energy",
                            mfg: "/sectors/manufacturing",
                            transport: "/sectors/transport",
                          }[sector.key] ?? "/sectors")}
                          title={sector.label}
                          onMouseEnter={() => setFooterSectorHovered(i)}
                          onMouseLeave={() => setFooterSectorHovered(null)}
                          className="flex items-center justify-center w-11 h-11 rounded-[10px] cursor-pointer no-underline box-border transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]" style={{ backgroundColor: isH ? "rgba(184,217,53,0.12)" : "rgba(255,255,255,0.04)", border: `1px solid ${isH ? "rgba(184,217,53,0.35)" : "rgba(255,255,255,0.07)"}`, transform: isH ? "translateY(-2px)" : "none", boxShadow: isH ? "0 6px 16px rgba(0,0,0,0.2), 0 0 0 1px rgba(184,217,53,0.15)" : "none" }}
                        >
                          <div
                            className="transition-opacity duration-[250ms] ease-in-out flex items-center justify-center" style={{ opacity: isH ? 1 : 0.5 }}
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
          </>
        )}

        {/* Bottom bar */}
        <div
          className="flex justify-between items-center border-t border-t-white/[0.06]" style={{ padding: isMobile ? "16px 20px" : "20px 80px" }}
        >
          <span className="text-[11px] font-['DM_Sans',sans-serif] text-white/25">
            {"\u00A9"} 2026 BRIDGE PBC
          </span>
          <div className="flex" style={{ gap: isMobile ? "12px" : "20px" }}>
            {["Terms", "Privacy", "Accessibility"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[11px] font-['DM_Sans',sans-serif] no-underline text-white/25"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
    </Layout>
  );
}
