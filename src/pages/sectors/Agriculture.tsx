import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/Layout";
import { IconWheat, IconBuilding, IconWallet, IconFactory, IconTruck, IconZap, IconArrowRight, IconArrowDown, IconCheck, IconWarning, IconUsers, IconSproutHub, IconStorefront, IconOfficeBuilding, IconTrendingUp, IconLandmark } from "@/components/icons/SectorIcons";
import { FOOTER_SECTOR_ICONS, SECTOR_ROUTES } from "@/data/sectorIcons";
import { ArrowUpRight, Clock, Check, ArrowRight, ArrowUp, ChevronLeft, ChevronRight, ChevronDown, Pause, Play, Sprout, Warehouse, Factory, Truck, Users, Blocks, Wallet, BatteryCharging, X } from "lucide-react";
import { useCounter } from "@/hooks/useCounter";

// ============================================================================
// BRIDGE SECTOR PAGE: Agriculture & Value Chains
// INTEGRATED VERSION with Premium ValueChain Section
// ============================================================================
// Design System: Dark Green #1B4D3E, Lime #B8D935, Off-white #F3F5F2
// ============================================================================

import { colors, layout } from "@/lib/theme";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectorFinalCTA from "@/components/sectors/SectorFinalCTA";
import SectorHeroSection from "@/components/sectors/SectorHeroSection";

const CONTENT_MAX_WIDTH = layout.maxWidth;

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
  heroTitleBold: "Agriculture",
  heroTitleRest: "& Value Chains",
  problemHeadline: "The Engine of Shared Prosperity",

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

// Premium Value Chain Icons
const valueChainIcons = {
  seed: <Sprout size={24} strokeWidth={1.5} />,
  warehouse: <Warehouse size={24} strokeWidth={1.5} />,
  factory: <Factory size={24} strokeWidth={1.5} />,
  truck: <Truck size={24} strokeWidth={1.5} />,
  users: <Users size={24} strokeWidth={1.5} />,
};


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
      className="cursor-pointer transition-all duration-[350ms] ease-in-out overflow-hidden"
      style={{
        backgroundColor: colors.white,
        borderRadius: isMobile ? "16px" : "20px",
        padding: isCollapsed ? (isMobile ? "16px 20px" : "20px 28px") : isMobile ? "20px" : "28px",
        border: isExpanded ? `2px solid ${colors.accent}` : `1px solid ${colors.line}`,
      }}
    >
      {/* Zone 1 — Title + Severity Badge + Chevron */}
      <div
        className="flex items-center justify-between gap-3"
        style={{ marginBottom: isCollapsed ? 0 : "12px" }}
      >
        <h3
          className="font-[Inter,sans-serif] font-semibold m-0 flex-1"
          style={{
            fontSize: isMobile ? "16px" : "18px",
            color: colors.dark,
          }}
        >
          {opportunity.title}
        </h3>
        <span
          className="font-[Inter,sans-serif] text-[11px] font-bold py-1 px-3 rounded-[20px] whitespace-nowrap shrink-0"
          style={{
            color: severityColors.text,
            backgroundColor: severityColors.bg,
          }}
        >
          {opportunity.priority}
        </span>
      </div>

      {/* Zone 2 — Description + Impact bar (hidden when collapsed) */}
      {!isCollapsed && (
        <>
          <p
            className="font-[Inter,sans-serif] text-[#666] m-0 mb-4 leading-[1.6]"
            style={{
              fontSize: isMobile ? "14px" : "15px",
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
            className="rounded-xl"
            style={{
              backgroundColor: colors.accentLight,
              padding: isMobile ? "8px 12px" : "10px 16px",
              marginBottom: isExpanded ? "16px" : 0,
            }}
          >
            <span
              className="font-[Inter,sans-serif] text-sm font-semibold"
              style={{ color: colors.primary }}
            >
              Impact:
            </span>
            <span
              className="font-[Inter,sans-serif] text-sm font-medium ml-1.5"
              style={{ color: colors.primary }}
            >
              {opportunity.quantification}
            </span>
          </div>
        </>
      )}

      {/* Expanded content */}
      {isExpanded && (
        <div
          className="pt-4"
          style={{ borderTop: `1px solid ${colors.line}` }}
        >
          {/* Zone 3 — Priority + Scale */}
          <div
            className="grid gap-3 mb-5"
            style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}
          >
            {/* Priority cell */}
            <div
              className="rounded-xl p-3.5"
              style={{ backgroundColor: colors.background }}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888]">
                  Priority
                </span>
                <span
                  className="font-[Inter,sans-serif] text-xs font-bold py-1 px-2.5 rounded-[20px]"
                  style={{
                    color: severityColors.text,
                    backgroundColor: severityColors.bg,
                  }}
                >
                  {opportunity.priority}
                </span>
              </div>
              <div
                className="h-2 rounded overflow-hidden"
                style={{ backgroundColor: colors.line }}
              >
                <div
                  className="h-full rounded transition-[width] duration-500 ease-in-out"
                  style={{
                    width: `${opportunity.priorityScore}%`,
                    backgroundColor: colors.accent,
                  }}
                />
              </div>
            </div>

            {/* Scale cell */}
            <div
              className="rounded-xl p-3.5"
              style={{ backgroundColor: colors.background }}
            >
              <span className="block font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888] mb-1.5">
                Scale
              </span>
              <div className="flex items-baseline gap-1.5">
                <span
                  className="font-[Poppins,sans-serif] font-bold"
                  style={{
                    fontSize: isMobile ? "20px" : "24px",
                    color: colors.primary,
                  }}
                >
                  {opportunity.impactCount}
                </span>
                <span className="font-[Inter,sans-serif] text-[13px] text-[#666]">
                  {opportunity.impactLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Zone 4 — Opportunity Drivers */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={16} strokeWidth={2} color="#888" />
              <span className="font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888]">
                Opportunity Drivers
              </span>
            </div>
            <div
              className="grid gap-2.5"
              style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}
            >
              {opportunity.drivers.map((driver, j) => (
                <div
                  key={j}
                  className="flex items-center gap-3 rounded-xl"
                  style={{
                    backgroundColor: colors.background,
                    padding: isMobile ? "10px 12px" : "12px 14px",
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <span
                      className="font-[Inter,sans-serif] text-[13px] font-semibold"
                      style={{ color: colors.white }}
                    >
                      {j + 1}
                    </span>
                  </div>
                  <div>
                    <div
                      className="font-[Inter,sans-serif] font-semibold"
                      style={{
                        fontSize: isMobile ? "13px" : "14px",
                        color: colors.dark,
                      }}
                    >
                      {driver.title}
                    </div>
                    <div className="font-[Inter,sans-serif] text-xs text-[#888]">
                      {driver.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Zone 5 — BRIDGE Solution Footer */}
          <div
            className="flex pt-4"
            style={{
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "center",
              gap: isMobile ? "8px" : "16px",
              borderTop: `1px solid ${colors.line}`,
            }}
          >
            <div className="flex items-center gap-2.5 shrink-0">
              <Check size={18} strokeWidth={2.5} color={colors.accent} />
              <span className="font-[Inter,sans-serif] text-[13px] text-[#888]">
                BRIDGE Solution:
              </span>
            </div>
            <span
              className="font-[Inter,sans-serif] text-sm font-semibold flex-1"
              style={{ color: colors.primary }}
            >
              {opportunity.bridgeSolution}
            </span>
            <span
              className="font-[Inter,sans-serif] text-[13px] font-medium flex items-center gap-1 shrink-0"
              style={{ color: colors.primary }}
            >
              View
              <ArrowRight size={14} strokeWidth={2} />
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
      className="overflow-hidden"
      style={{
        backgroundColor: colors.background,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Header */}
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          {/* Pill on background (#F3F5F2) — Variant A with dot */}
          <div
            className="inline-block py-2.5 px-5 rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
            style={{
              backgroundColor: colors.white,
              color: colors.primary,
              border: `1px solid ${colors.line}`,
            }}
          >
            The Opportunity
          </div>
          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] m-0 mb-5 max-w-[820px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
            }}
          >
            <span style={{ color: colors.accent }} className="font-semibold">$1.9 billion</span> in agricultural value ready to
            be captured
          </h2>
          <p
            className="font-[Inter,sans-serif] leading-[1.65] text-[#666] max-w-[680px] m-0"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
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
          <div className="flex justify-center gap-2 mt-4">
            {opportunitySectionData.map((_, i) => (
              <div
                key={i}
                className="h-2 rounded cursor-pointer transition-all duration-300 ease-in-out"
                style={{
                  width: oppActiveIndex === i ? "24px" : "8px",
                  backgroundColor: oppActiveIndex === i ? colors.accent : colors.line,
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
    <div className="w-9 h-[60px] flex items-center justify-center relative shrink-0">
      <div
        className="absolute w-10 h-10 rounded-full"
        style={{
          backgroundColor: isActive ? "rgba(184, 217, 53, 0.2)" : "transparent",
          animation: isActive ? "pulse 2s ease-in-out infinite" : "none",
          animationDelay: `${delay}ms`,
        }}
      />

      <ArrowRight
        size={24}
        strokeWidth={2}
        color={isActive ? colors.accent : colors.line}
        className="transition-transform duration-300 ease-in-out"
        style={{
          transform: isActive ? "translateX(3px)" : "translateX(0)",
        }}
      />

      {isActive && (
        <>
          <div
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: colors.accent,
              animation: "flowParticle 1.5s ease-in-out infinite",
              animationDelay: `${delay}ms`,
            }}
          />
          <div
            className="absolute w-1 h-1 rounded-full opacity-60"
            style={{
              backgroundColor: colors.accent,
              animation: "flowParticle 1.5s ease-in-out infinite",
              animationDelay: `${delay + 300}ms`,
            }}
          />
        </>
      )}

      <style>{`
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
      className="w-full max-w-[220px] cursor-pointer"
      onClick={() => onSelect(index)}
    >
      <div
        className="w-full rounded-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col transition-all duration-300 ease-in-out"
        style={{
          backgroundColor: colors.white,
          border: isActive ? `2px solid ${colors.accent}` : `1px solid ${colors.line}`,
        }}
      >
        {/* Card Content */}
        <div className="flex flex-col items-center" style={{ padding: "20px 18px 16px" }}>
          {/* Stage Number Badge */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold font-[Poppins,sans-serif] mb-3 transition-all duration-300 ease-in-out"
            style={{
              backgroundColor: isActive ? colors.accent : colors.background,
              color: isActive ? colors.primary : "#999",
              border: isActive ? "none" : `1px solid ${colors.line}`,
            }}
          >
            {index + 1}
          </div>

          {/* Stage Name */}
          <h4
            className="font-[Inter,sans-serif] text-[15px] font-bold text-center m-0 mb-1"
            style={{ color: colors.primary }}
          >
            {stage.stage}
          </h4>

          {/* Actor */}
          <div className="font-[Inter,sans-serif] text-[13px] text-[#666] text-center mb-2.5 leading-[1.4] h-9 flex items-center justify-center">
            {stage.actor}
          </div>

          {/* Population Badge */}
          <div
            className="py-1.5 px-3 rounded-full text-[11px] font-semibold font-[Inter,sans-serif] mb-3 whitespace-nowrap transition-all duration-300 ease-in-out"
            style={{
              backgroundColor: isActive ? colors.accentLight : colors.background,
              color: colors.primary,
              border: `1px solid ${isActive ? colors.accent : colors.line}`,
            }}
          >
            {stage.population}
          </div>

          {/* Value Retained Indicator */}
          <div className="w-full">
            <div className="flex justify-between mb-1.5">
              <span className="text-[11px] font-[Inter,sans-serif] text-[#999]">
                Value Retained
              </span>
              <span
                className="text-[11px] font-[Inter,sans-serif] font-semibold"
                style={{ color: colors.primary }}
              >
                {stage.valueRetained}%
              </span>
            </div>
            <div
              className="w-full h-1.5 rounded-[3px] overflow-hidden"
              style={{ backgroundColor: colors.background }}
            >
              <div
                className="h-full rounded-[3px] transition-[width] duration-1000 ease-out"
                style={{
                  width: `${stage.valueRetained}%`,
                  backgroundColor: colors.accent,
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
      className="rounded-[20px] mt-5"
      style={{
        backgroundColor: colors.primary,
        padding: "16px 32px",
      }}
    >
      <div className="grid grid-cols-[1fr_3fr] gap-8 items-center">
        {/* Left: Stat */}
        <div>
          <div
            className="text-xs font-[Inter,sans-serif] font-semibold mb-1"
            style={{ color: colors.accent }}
          >
            Value Retained by Farmers
          </div>
          <div
            className="font-[Poppins,sans-serif] font-bold leading-none"
            style={{
              fontSize: isMobile ? "22px" : "36px",
              color: colors.white,
            }}
          >
            20-40%
          </div>
        </div>

        {/* Center: Sankey-style flow */}
        <div className="relative h-[60px]">
          <div className="absolute top-1/2 left-0 right-0 h-3 -translate-y-1/2 bg-white/10 rounded-[6px] overflow-hidden">
            <div
              className="h-full rounded-[6px] relative transition-[width] duration-[2s] ease-out"
              style={{
                width: `${progress * 0.3}%`,
                backgroundColor: colors.accent,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
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
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${(i / (valueChainStages.length - 1)) * 100}%` }}
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: i === 0 ? colors.accent : "rgba(255,255,255,0.2)",
                  border: "3px solid rgba(255,255,255,0.3)",
                }}
              >
                {i === 0 && (
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: colors.primary }}
                  />
                )}
              </div>
              <div className="absolute top-7 left-1/2 -translate-x-1/2 text-[10px] font-[Inter,sans-serif] text-white/60 whitespace-nowrap">
                {stage.valueRetained}%
              </div>
            </div>
          ))}

          {/* Value recapture opportunities */}
          <div
            className="absolute top-0.5 left-1/4 text-[10px] font-[Inter,sans-serif] flex items-center gap-1"
            style={{ color: colors.accent }}
          >
            <ArrowUp size={12} strokeWidth={2} />
            +25%
          </div>
          <div
            className="absolute top-0.5 left-1/2 -translate-x-1/2 text-[10px] font-[Inter,sans-serif] flex items-center gap-1"
            style={{ color: colors.accent }}
          >
            <ArrowUp size={12} strokeWidth={2} />
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
      className="font-[Inter,sans-serif] overflow-hidden"
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          {/* Pill — Variant A with dot */}
          <div
            className="inline-block py-2.5 px-5 rounded-full text-[11px] font-bold tracking-[2px] font-[Inter,sans-serif] uppercase mb-6"
            style={{
              backgroundColor: colors.white,
              color: colors.primary,
              border: `1px solid ${colors.line}`,
            }}
          >
            The Process
          </div>
          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] m-0 mb-5 max-w-[600px] mx-auto"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
            }}
          >
            From <span style={{ color: colors.accent }} className="font-semibold">Farm to Fork</span>: Where Value is Created
          </h2>
          <p
            className="font-[Inter,sans-serif] leading-[1.65] text-[#666] max-w-[700px] mx-auto"
            style={{
              fontSize: isMobile ? "15px" : "16px",
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
          className="flex justify-center flex-wrap"
          style={{
            gap: isMobile ? "16px" : "32px",
            marginTop: isMobile ? "20px" : "32px",
          }}
        >
          {[
            { color: colors.accent, label: "Value Retained" },
            { color: "#F59E0B", label: "Pain Point / Leakage" },
            { color: colors.primary, label: "BRIDGE Intervention Point" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-[3px]"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs font-[Inter,sans-serif] text-[#666]">
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
            className="flex items-center justify-center gap-2 w-full p-3.5 mt-6 border-none rounded-[14px] font-[Inter,sans-serif] text-sm font-semibold cursor-pointer"
            style={{
              backgroundColor: colors.primary,
              color: colors.white,
            }}
          >
            Explore Stage Details
            <ChevronDown size={14} strokeWidth={2.5} color={colors.accent} />
          </button>
        ) : (
          <>
            {/* ★ PERSISTENT DETAIL STRIP — shows active stage content ★ */}
            {(() => {
              const stage = valueChainStages[activeStage];
              return (
                <div
                  className="mt-8 transition-all duration-300 ease-in-out"
                  style={{
                    backgroundColor: colors.primary,
                    borderRadius: isMobile ? "16px" : "20px",
                    padding: isMobile ? "20px" : "24px 32px",
                  }}
                >
                  {/* Top Row: Icon + Stage info (left) + Controls (right) */}
                  <div
                    className="flex items-center gap-4"
                    style={{
                      marginBottom: isMobile ? "16px" : "20px",
                      paddingBottom: isMobile ? "14px" : "16px",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {/* Left: Icon + Name + Actor */}
                    <div className="flex items-center gap-3.5 flex-1">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.08)",
                          color: colors.accent,
                        }}
                      >
                        {valueChainIcons[stage.icon]}
                      </div>
                      <div>
                        <div
                          className="font-[Inter,sans-serif] font-bold leading-[1.2]"
                          style={{
                            fontSize: isMobile ? "18px" : "20px",
                            color: colors.white,
                          }}
                        >
                          {stage.stage}
                        </div>
                        <div className="font-[Inter,sans-serif] text-[13px] font-semibold text-white/50 mt-px">
                          {stage.actor} · {stage.population}
                        </div>
                      </div>
                    </div>

                    {/* Right: Controls */}
                    <div className="flex items-center gap-3 shrink-0">
                      {/* Play/Pause */}
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="flex items-center gap-2 rounded-full cursor-pointer bg-white/[0.08] border border-white/[0.12] py-1.5 px-3.5"
                      >
                        <div
                          className="w-[22px] h-[22px] rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: isPlaying ? colors.accent : "rgba(255,255,255,0.15)",
                          }}
                        >
                          {isPlaying ? (
                            <Pause size={10} fill={colors.primary} color={colors.primary} />
                          ) : (
                            <Play size={10} fill={colors.white} color={colors.white} />
                          )}
                        </div>
                        <span className="text-[11px] font-[Inter,sans-serif] text-white/60 font-medium">
                          {isPlaying ? "Pause" : "Play"}
                        </span>
                      </button>

                      {/* Jump-to stage dots — desktop only */}
                      {!isMobile && (
                        <div
                          className="flex items-center gap-1.5 rounded-full bg-white/[0.06] py-1.5 px-2.5 border border-white/[0.08]"
                        >
                          {valueChainStages.map((s, i) => (
                            <button
                              key={i}
                              onClick={() => handleStageSelect(i)}
                              className="w-6 h-6 rounded-full border-none cursor-pointer text-[11px] font-semibold font-[Inter,sans-serif] transition-all duration-200 ease-in-out"
                              style={{
                                backgroundColor: activeStage === i ? colors.accent : "rgba(255,255,255,0.1)",
                                color: activeStage === i ? colors.primary : "rgba(255,255,255,0.4)",
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
                        className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer shrink-0"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        <X size={12} strokeWidth={2.5} color="rgba(255,255,255,0.5)" />
                      </button>
                    </div>
                  </div>
                  <div
                    className="grid"
                    style={{
                      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                      gap: isMobile ? "20px" : "32px",
                    }}
                  >
                    {/* Left: Opportunities + Value Leakage */}
                    <div>
                      <div
                        className="font-[Inter,sans-serif] text-[11px] font-extrabold uppercase tracking-[2px] mb-3"
                        style={{ color: colors.accent }}
                      >
                        BRIDGE Opportunities
                      </div>
                      <div
                        className="flex flex-col gap-1.5"
                        style={{ marginBottom: stage.valueLost > 0 ? "16px" : 0 }}
                      >
                        {stage.opportunities.map((point, i) => (
                          <div key={i} className="flex items-center gap-2.5">
                            <Check size={14} strokeWidth={2.5} color={colors.accent} className="shrink-0" />
                            <span className="font-[Inter,sans-serif] text-[13px] text-white/80 leading-[1.4]">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Value Leakage — compact inline */}
                      {stage.valueLost > 0 && (
                        <div className="flex items-center gap-3 mt-1">
                          <span className="font-[Poppins,sans-serif] text-[20px] font-bold text-[#F59E0B] leading-none">
                            {stage.valueLost}%
                          </span>
                          <div>
                            <div className="font-[Inter,sans-serif] text-[10px] font-semibold uppercase tracking-[0.5px] text-[#F59E0B] leading-none mb-0.5">
                              Value Leakage
                            </div>
                            <div className="font-[Inter,sans-serif] text-[11px] text-white/35">
                              lost before next stage
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right: Compact Insight Cards */}
                    <div>
                      <div
                        className="font-[Inter,sans-serif] text-[11px] font-extrabold uppercase tracking-[2px] mb-3"
                        style={{ color: colors.accent }}
                      >
                        Key Insights
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {stage.insights.map((insight, i) => (
                          <div
                            key={i}
                            className="rounded-[10px] flex items-center gap-3 overflow-hidden bg-white/5 py-2.5 px-3.5"
                          >
                            <span
                              className="font-[Inter,sans-serif] text-[9px] font-bold uppercase tracking-[0.5px] text-white/30 shrink-0 whitespace-nowrap"
                              style={{ minWidth: isMobile ? "60px" : "80px" }}
                            >
                              {insight.label}
                            </span>
                            <span
                              className="font-[Inter,sans-serif] text-[13px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
                              style={{ color: colors.white }}
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
      className="overflow-hidden"
      style={{
        backgroundColor: colors.primary,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="mx-auto overflow-hidden" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div style={{ marginBottom: isMobile ? "32px" : "48px" }}>
          {/* Pill — Outline variant (on dark) */}
          <div
            className="inline-block py-2.5 px-5 rounded-full text-[11px] font-bold tracking-[2px] font-[Inter,sans-serif] uppercase mb-6"
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: colors.accent,
            }}
          >
            The Pathway to Impact
          </div>

          <div
            className="flex"
            style={{
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "flex-end",
              gap: isMobile ? "24px" : "32px",
            }}
          >
            <div className="flex-1">
              <h2
                className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] m-0 mb-3 max-w-[900px]"
                style={{
                  fontSize: isMobile ? "28px" : "42px",
                  color: colors.white,
                }}
              >
                <span className="font-semibold">Ventures</span> That Build{" "}
                <span style={{ color: colors.accent }} className="font-semibold">Lasting Value</span>
              </h2>

              <p
                className="font-[Inter,sans-serif] leading-[1.65] text-white/55 max-w-[700px] m-0"
                style={{ fontSize: isMobile ? "15px" : "16px" }}
              >
                Each venture is selected through BRIDGE's multi-criteria prioritization — balancing economic viability,
                social impact, and alignment with Ghana's agricultural policy framework to deliver measurable returns
                across every dimension.
              </p>
            </div>

            <div className="flex gap-1 p-1 rounded-full shrink-0" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
              {[
                { value: "all", label: "All" },
                { value: "1", label: "Flagship" },
                { value: "2", label: "Scaling" },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setSelectedTier(filter.value)}
                  className="border-none py-1.5 px-4 rounded-full text-xs font-[Inter,sans-serif] cursor-pointer transition-all duration-200 ease-in-out whitespace-nowrap"
                  style={{
                    backgroundColor: selectedTier === filter.value ? colors.accent : "transparent",
                    color: selectedTier === filter.value ? colors.primary : "rgba(255,255,255,0.6)",
                    fontWeight: selectedTier === filter.value ? "700" : "500",
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
              className="flex flex-col min-w-0 overflow-hidden"
              style={{
                backgroundColor: colors.white,
                borderRadius: isMobile ? "16px" : "20px",
                padding: isMobile ? "24px" : "28px",
                ...(isMobile ? { minWidth: "80%", maxWidth: "80%", flexShrink: 0, scrollSnapAlign: "start" } : {}),
              }}
            >
              {/* Top row: Priority Score left, TIER badge right — aligned */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-9 h-9 rounded-[10px] flex items-center justify-center text-sm font-bold font-[Poppins,sans-serif]"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.accent,
                    }}
                  >
                    {solution.score}
                  </div>
                  <span className="text-[11px] text-[#999] font-[Inter,sans-serif]">
                    Priority Score
                  </span>
                </div>
                <span
                  className="py-1 px-2.5 rounded-[20px] text-[11px] font-bold font-[Inter,sans-serif]"
                  style={{
                    backgroundColor: colors.background,
                    color: colors.primary,
                    border: `1px solid ${colors.line}`,
                  }}
                >
                  TIER {solution.tier}
                </span>
              </div>

              <h3
                className="font-[Inter,sans-serif] text-lg font-semibold m-0 mb-3"
                style={{ color: colors.dark }}
              >
                {solution.name}
              </h3>

              <p
                className="font-[Inter,sans-serif] text-sm text-[#666] leading-[1.6] m-0 mb-5 flex-1"
                style={{ minHeight: isMobile ? "auto" : "66px" }}
              >
                {solution.description}
              </p>

              {/* Expected Impact — single line */}
              <div
                className="py-3 px-4 rounded-xl mb-4 flex items-center gap-1.5 whitespace-nowrap overflow-hidden"
                style={{ backgroundColor: colors.accentLight }}
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.5px] text-[#666] font-[Inter,sans-serif] shrink-0">
                  Expected Impact
                </span>
                <span
                  className="text-[13px] font-[Inter,sans-serif] font-medium overflow-hidden text-ellipsis"
                  style={{ color: colors.primary }}
                >
                  {solution.impact}
                </span>
              </div>

              {/* Bottom: Capital only, no Details button */}
              <div
                className="pt-4"
                style={{ borderTop: `1px solid ${colors.line}` }}
              >
                <div
                  className="text-[20px] font-bold font-[Inter,sans-serif]"
                  style={{ color: colors.primary }}
                >
                  {solution.capital}
                </div>
                <div className="text-[11px] text-[#999] font-[Inter,sans-serif]">
                  Capital Required
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Dot indicators on mobile */}
        {isMobile && (
          <div className="flex justify-center gap-2 mt-4">
            {filteredSolutions.map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
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
    <div className="flex gap-[3px]">
      {[1, 2, 3, 4, 5].map((dot) => (
        <div
          key={dot}
          className="w-2 h-2 rounded-full"
          style={{
            backgroundColor: dot <= rating ? colors.accent : colors.line,
          }}
        />
      ))}
    </div>
  );

  // === SMALL ALLY CARD (right grid) ===
  const AllyCard = ({ ally }) => (
    <div
      className="rounded-2xl p-5 flex flex-col"
      style={{
        backgroundColor: colors.white,
        border: `1px solid ${colors.line}`,
      }}
    >
      {/* Name + Funding badge */}
      <div className="flex justify-between items-start gap-3 mb-2">
        <h4
          className="font-[Inter,sans-serif] text-base font-bold m-0"
          style={{ color: colors.dark }}
        >
          {ally.name}
        </h4>
        <span
          className="py-[3px] px-2.5 rounded-[20px] text-[11px] font-bold font-[Inter,sans-serif] whitespace-nowrap shrink-0"
          style={{
            backgroundColor: colors.accentLight,
            color: colors.primary,
          }}
        >
          {ally.funding}
        </span>
      </div>

      {/* Focus description */}
      <p className="font-[Inter,sans-serif] text-[13px] text-[#666] leading-[1.5] m-0 mb-3.5 flex-1">
        {ally.focus}
      </p>

      {/* Top Strength box */}
      <div
        className="rounded-[10px] mb-3.5"
        style={{
          backgroundColor: colors.background,
          padding: "10px 14px",
        }}
      >
        <div className="text-[9px] font-[Inter,sans-serif] font-bold uppercase tracking-[1px] text-[#999] mb-1">
          Top Strength
        </div>
        <div
          className="text-sm font-[Inter,sans-serif] font-semibold"
          style={{ color: colors.dark }}
        >
          {ally.topStrength}
        </div>
      </div>

      {/* Bottom row: Est. year + Priority */}
      <div
        className="flex justify-between items-center pt-3"
        style={{ borderTop: `1px solid ${colors.line}` }}
      >
        <span className="font-[Inter,sans-serif] text-xs text-[#999]">
          Est. {ally.year}
        </span>
        <span
          className="font-[Inter,sans-serif] text-xs font-semibold"
          style={{
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
      className="overflow-hidden"
      style={{
        backgroundColor: colors.background,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Section Header */}
        <div style={{ marginBottom: isMobile ? "32px" : "48px" }}>
          {/* Pill */}
          <div
            className="inline-block py-2.5 px-5 rounded-full text-[11px] font-bold tracking-[2px] font-[Inter,sans-serif] uppercase mb-6"
            style={{
              backgroundColor: colors.white,
              color: colors.primary,
              border: `1px solid ${colors.line}`,
            }}
          >
            The Landscape
          </div>
          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] m-0 mb-5 max-w-[900px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
            }}
          >
            Building With Ghana's{" "}
            <span style={{ color: colors.accent }} className="font-semibold">Strongest Institutions</span>
          </h2>
          <p
            className="font-[Inter,sans-serif] leading-[1.65] text-[#666] m-0 max-w-[700px]"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
          >
            AgTech innovators are addressing specific opportunities—Farmerline for information, AgroCenta for market
            linkage, AkoFresh for cold storage. BRIDGE combines strengths, aligning resources to create shared value for
            the 80% smallholder majority.
          </p>
        </div>

        {/* Main Grid: Left Analysis + Right Cards */}
        <div
          className="grid items-stretch"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr",
            gap: isMobile ? "24px" : "16px",
          }}
        >
          {/* === LEFT COLUMN: Analysis Card + BRIDGE Position === */}
          <div className="flex flex-col gap-4">
            {/* Scrollable Analysis Card */}
            <div
              className="rounded-[20px] overflow-hidden"
              style={{
                backgroundColor: colors.white,
                border: `1px solid ${colors.line}`,
              }}
            >
              {/* Card Header: Name + Priority */}
              <div style={{ padding: "24px 24px 0" }}>
                <div className="flex justify-between items-start mb-2.5">
                  <h3
                    className="font-[Inter,sans-serif] text-[20px] font-bold m-0"
                    style={{ color: colors.dark }}
                  >
                    {current.name}
                  </h3>
                  <span
                    className="py-1 px-3 rounded-[20px] text-[11px] font-bold font-[Inter,sans-serif] whitespace-nowrap"
                    style={{
                      backgroundColor: colors.accentLight,
                      color: colors.primary,
                    }}
                  >
                    {current.priority}
                  </span>
                </div>
                <p className="font-[Inter,sans-serif] text-sm text-[#666] leading-[1.5] m-0 mb-5">
                  {current.focus}
                </p>

                {/* Strength Bars */}
                <div className="mb-5">
                  {current.strengths.map((strength, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center"
                      style={{ marginBottom: i < current.strengths.length - 1 ? "12px" : 0 }}
                    >
                      <span className="font-[Inter,sans-serif] text-[13px]" style={{ color: colors.dark }}>
                        {strength.name}
                      </span>
                      <RatingDots rating={strength.rating} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Expanded: Complementary Areas + BRIDGE Opportunity */}
              {isExpanded && (
                <div className="px-6 pb-5 pt-5" style={{ borderTop: `1px solid ${colors.line}` }}>
                  <div className="mb-4">
                    <div className="text-[10px] font-[Inter,sans-serif] text-[#888] uppercase tracking-[1px] mb-2.5 font-semibold">
                      Complementary Areas
                    </div>
                    {current.complementaryAreas.map((area, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5"
                        style={{ marginBottom: i < current.complementaryAreas.length - 1 ? "6px" : 0 }}
                      >
                        <span className="text-[8px]" style={{ color: colors.accent }}>{"\u25CF"}</span>
                        <span className="text-[13px] font-[Inter,sans-serif] text-[#555]">{area}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    className="rounded-[10px] p-3.5"
                    style={{ backgroundColor: colors.accentLight }}
                  >
                    <div
                      className="text-[10px] font-[Inter,sans-serif] uppercase tracking-[1px] font-bold mb-1.5"
                      style={{ color: colors.primary }}
                    >
                      BRIDGE Opportunity
                    </div>
                    <p
                      className="text-[13px] font-[Inter,sans-serif] leading-[1.5] m-0"
                      style={{ color: colors.primary }}
                    >
                      {current.bridgeOpportunity}
                    </p>
                  </div>
                </div>
              )}

              {/* Footer: Nav + Expand */}
              <div
                className="flex justify-between items-center"
                style={{
                  padding: "16px 24px",
                  borderTop: `1px solid ${colors.line}`,
                }}
              >
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevCompetitor}
                    className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center"
                    style={{
                      border: `1px solid ${colors.line}`,
                      backgroundColor: colors.white,
                      color: colors.primary,
                    }}
                  >
                    <ChevronLeft size={14} strokeWidth={2} />
                  </button>
                  <span className="text-xs font-[Inter,sans-serif] text-[#888]">
                    {currentIndex + 1} / {allies.length}
                  </span>
                  <button
                    onClick={nextCompetitor}
                    className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center"
                    style={{
                      border: `1px solid ${colors.line}`,
                      backgroundColor: colors.white,
                      color: colors.primary,
                    }}
                  >
                    <ChevronRight size={14} strokeWidth={2} />
                  </button>
                </div>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="bg-transparent rounded-full text-xs font-semibold font-[Inter,sans-serif] cursor-pointer flex items-center gap-1.5"
                  style={{
                    color: colors.primary,
                    border: `1.5px solid ${colors.line}`,
                    padding: "10px 20px",
                  }}
                >
                  {isExpanded ? "Less" : "Analysis"}
                  <ChevronDown size={12} strokeWidth={2} style={{ transform: isExpanded ? "rotate(180deg)" : "none" }} />
                </button>
              </div>
            </div>

            {/* BRIDGE Position Card (dark green) — hidden by default on mobile */}
            {isMobile && !showBridgePosition ? (
              <button
                onClick={() => setShowBridgePosition(true)}
                className="flex items-center justify-center gap-2 w-full p-3.5 border-none rounded-[14px] font-[Inter,sans-serif] text-sm font-semibold cursor-pointer"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.white,
                }}
              >
                BRIDGE's Position
                <ChevronDown size={14} strokeWidth={2.5} color={colors.accent} />
              </button>
            ) : (
              <div
                className="rounded-[20px] p-7 flex-1 relative"
                style={{ backgroundColor: colors.primary }}
              >
                {/* Mobile close button */}
                {isMobile && (
                  <button
                    onClick={() => setShowBridgePosition(false)}
                    className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer z-[1]"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.12)",
                    }}
                  >
                    <X size={12} strokeWidth={2.5} color="rgba(255,255,255,0.5)" />
                  </button>
                )}
                {/* Header: label + vs pill */}
                <div className="flex justify-between items-center mb-4">
                  <span className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[2px] text-white/50">
                    BRIDGE'S POSITION
                  </span>
                  <span
                    className="py-1 px-3 rounded-[20px] text-[11px] font-semibold font-[Inter,sans-serif]"
                    style={{
                      backgroundColor: "rgba(184, 217, 53, 0.2)",
                      color: colors.accent,
                    }}
                  >
                    vs {current.name}
                  </span>
                </div>

                {/* Headline */}
                <h3
                  className="font-[Inter,sans-serif] text-lg font-semibold leading-[1.4] m-0 mb-5"
                  style={{ color: colors.white }}
                >
                  {current.bridgePosition.headline}
                </h3>

                {/* Synergy rows */}
                <div className="flex flex-col gap-2.5">
                  {current.bridgePosition.synergies.map((syn, i) => (
                    <div
                      key={i}
                      className="rounded-[10px] flex items-center gap-3 bg-white/[0.06] py-3 px-4"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: colors.accent }}
                      />
                      <span
                        className="font-[Inter,sans-serif] text-[13px] font-semibold whitespace-nowrap"
                        style={{ color: colors.white }}
                      >
                        {syn.label}
                      </span>
                      <span className="font-[Inter,sans-serif] text-[13px] text-white/50">
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
            <div className="grid grid-cols-2 gap-4">
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
      className="overflow-hidden"
      style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "100px 80px" }}
    >
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Header */}
        <div className="mb-12" style={{ textAlign: isMobile ? "left" : "center" }}>
          <div
            className="inline-block py-2.5 px-5 rounded-full text-[11px] font-bold tracking-[2px] font-[Inter,sans-serif] uppercase mb-6"
            style={{
              backgroundColor: colors.white,
              color: colors.primary,
              border: `1px solid ${colors.line}`,
            }}
          >
            The Governance & Policy
          </div>

          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[900px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
              margin: isMobile ? "0 0 16px" : "0 auto 16px",
            }}
          >
            Moving in Step with Ghana's <span className="font-semibold">Agricultural</span>{" "}
            <span style={{ color: colors.accent }} className="font-semibold">Renaissance</span>
          </h2>

          <p
            className="font-[Inter,sans-serif] text-base leading-[1.65] text-[#555] max-w-[700px]"
            style={{ margin: isMobile ? "0 0 32px" : "0 auto 32px" }}
          >
            Every BRIDGE agriculture venture aligns with active government programs under the Grow24 and Fund24 pillars,
            ensuring complementary investment.
          </p>

          {/* Category filter pills */}
          <div
            className="flex"
            style={{
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
                  className="rounded-full font-[Inter,sans-serif] cursor-pointer transition-all duration-200 ease-in-out whitespace-nowrap"
                  style={{
                    padding: isMobile ? "6px 12px" : "6px 16px",
                    border: isActive ? "1.5px solid " + colors.accent : "1px solid " + colors.line,
                    backgroundColor: isActive ? colors.accentLight : "transparent",
                    color: isActive ? colors.primary : "#999",
                    fontSize: isMobile ? "11px" : "12px",
                    fontWeight: isActive ? "700" : "500",
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
                  className="rounded-2xl p-5 flex flex-col items-start cursor-pointer transition-all duration-300 ease-in-out h-full"
                  style={{
                    backgroundColor: colors.background,
                    border: isExpanded ? `2px solid ${colors.accent}` : `2px solid ${colors.line}`,
                  }}
                  onClick={() => setExpandedCard(isExpanded ? null : idx)}
                >
                  {/* Top row: Category badge + Relevance pills */}
                  <div className="flex justify-between items-center mb-3 w-full">
                    <span
                      className="text-[9px] font-bold uppercase font-[Inter,sans-serif] py-1 px-2.5 rounded-full"
                      style={{
                        color: colors.primary,
                        backgroundColor: badge.bg,
                        border: `1px solid ${badge.border}`,
                      }}
                    >
                      {policy.category}
                    </span>
                    <div className="flex gap-1.5">
                      {policy.relevance.map((r, ri) => (
                        <span
                          key={ri}
                          className="text-[9px] font-semibold uppercase font-[Inter,sans-serif] text-[#888] py-[3px] px-2 rounded-full"
                          style={{ border: `1px solid ${colors.line}` }}
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Policy name */}
                  <div
                    className="text-base font-bold font-[Inter,sans-serif] min-h-[42px] mb-2 leading-[1.3]"
                    style={{ color: colors.primary }}
                  >
                    {policy.policy}
                  </div>

                  <div
                    className="text-[13px] font-bold font-[Inter,sans-serif] mb-2.5"
                    style={{ color: colors.accent }}
                  >
                    {policy.allocation}
                  </div>

                  <div className="text-[13px] font-[Inter,sans-serif] text-[#666] leading-[1.5] min-h-[40px] mb-3">
                    {policy.alignment}
                  </div>

                  <div
                    className="flex items-center gap-1.5 mt-auto text-xs font-semibold font-[Inter,sans-serif] opacity-60"
                    style={{ color: colors.primary }}
                  >
                    BRIDGE alignment
                    <ChevronDown size={14} strokeWidth={2} style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }} />
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div
                      className="mt-3.5 pt-3.5 w-full"
                      style={{ borderTop: `1px solid ${colors.line}` }}
                    >
                      <div className="text-[11px] font-[Inter,sans-serif] text-[#888] mb-2.5">
                        {policy.body}
                      </div>
                      <div className="text-[13px] font-[Inter,sans-serif] text-[#444] leading-[1.5] mb-3.5">
                        {policy.bridgeRole}
                      </div>
                      {policy.pillars && policy.pillars.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3.5">
                          {policy.pillars.map((p, pi) => (
                            <span
                              key={pi}
                              className="text-[10px] font-bold font-[Inter,sans-serif] py-1 px-2.5 rounded-full uppercase"
                              style={{
                                color: colors.primary,
                                backgroundColor: "rgba(184,217,53,0.15)",
                                border: "1px solid rgba(184,217,53,0.3)",
                              }}
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      )}
                      {/* BRIDGE Ventures with lime dot bullets */}
                      <div className="flex flex-col gap-2">
                        {policy.bridgeVentures.map((v, vi) => (
                          <div
                            key={vi}
                            className="flex items-center gap-2.5 rounded-[10px]"
                            style={{
                              padding: "10px 14px",
                              backgroundColor: colors.primary,
                            }}
                          >
                            <span
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ backgroundColor: colors.accent }}
                            />
                            <span
                              className="text-[13px] font-semibold font-[Inter,sans-serif]"
                              style={{ color: colors.white }}
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
          <div className="flex justify-center gap-2 mt-3 mb-6">
            {filtered.map((_, i) => (
              <div
                key={i}
                className="h-2 rounded cursor-pointer transition-all duration-300 ease-in-out"
                style={{
                  width: govActiveIndex === i ? "24px" : "8px",
                  backgroundColor: govActiveIndex === i ? colors.accent : colors.line,
                }}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA Bar */}
        <div
          className="rounded-2xl flex gap-4 text-left"
          style={{
            backgroundColor: colors.primary,
            padding: isMobile ? "24px 20px" : "28px 32px",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: isMobile ? "flex-start" : "space-between",
          }}
        >
          <div>
            <div
              className="font-[Inter,sans-serif] font-semibold mb-1"
              style={{
                fontSize: isMobile ? "16px" : "18px",
                color: colors.white,
              }}
            >
              BRIDGE complements — never competes with — government vision.
            </div>
            <div className="font-[Inter,sans-serif] text-sm text-white/60">
              Every venture aligns with at least one active government policy or initiative.
            </div>
          </div>
          <button
            className="border-none py-3 px-6 rounded-full text-[13px] font-bold font-[Inter,sans-serif] cursor-pointer whitespace-nowrap shrink-0"
            style={{
              backgroundColor: colors.accent,
              color: colors.primary,
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
      className="overflow-hidden"
      style={{ backgroundColor: colors.background, padding: isMobile ? "60px 20px" : "100px 80px" }}
    >
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Pill */}
        <div className="mb-6">
          <span
            className="inline-block py-2.5 px-5 rounded-full text-[11px] font-bold tracking-[2px] font-[Inter,sans-serif] uppercase"
            style={{
              backgroundColor: colors.white,
              color: colors.primary,
              border: `1px solid ${colors.line}`,
            }}
          >
            The Impact
          </span>
        </div>

        {/* Heading */}
        <h2
          className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] m-0 mb-3 max-w-[820px]"
          style={{
            fontSize: isMobile ? "28px" : "42px",
            color: colors.primary,
          }}
        >
          What Changes When <span className="font-semibold">Value</span>
          <br />
          <span className="font-semibold">Chains</span>{" "}
          <span style={{ color: colors.accent }} className="font-semibold">Work</span>
        </h2>

        {/* Subtitle */}
        <p className="font-[Inter,sans-serif] text-base text-[#555] leading-[1.7] m-0 mb-10 max-w-[700px]">
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
          <div className="flex gap-2 flex-nowrap shrink-0">
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
            className="rounded-[20px] overflow-hidden"
            style={{
              backgroundColor: colors.background,
              border: `2px solid ${colors.primary}`,
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
            <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
              <div>
                <div
                  className="text-[28px] font-bold font-[Inter,sans-serif]"
                  style={{ color: colors.primary }}
                >
                  {currentStakeholder.title}
                </div>
                <div className="text-sm font-[Inter,sans-serif] text-[#888]">
                  {currentStakeholder.subtitle}
                </div>
              </div>
              <div className="text-right">
                <div
                  className="text-[40px] font-bold font-[Poppins,sans-serif] tracking-[-1.5px] leading-none"
                  style={{ color: colors.primary }}
                >
                  {currentStakeholder.stat}
                </div>
                <div className="text-xs font-[Inter,sans-serif] text-[#888]">
                  {currentStakeholder.statLabel}
                </div>
              </div>
            </div>

            {/* Outcome rows */}
            <div className="flex flex-col gap-1.5 mb-6">
              {currentStakeholder.outcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 rounded-xl"
                  style={{
                    padding: "14px 20px",
                    backgroundColor: idx % 2 === 0 ? colors.background : "transparent",
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{
                      backgroundColor: idx % 2 === 0 ? colors.white : colors.background,
                      color: colors.primary,
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div className="text-[15px] font-[Inter,sans-serif] text-[#333] leading-[1.5]">
                    {outcome}
                  </div>
                </div>
              ))}
            </div>

            {/* Key Advantage strip */}
            <div
              className="py-4 px-6 rounded-xl flex items-center gap-4 flex-wrap"
              style={{ backgroundColor: colors.primary }}
            >
              <span
                className="text-[10px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif]"
                style={{ color: colors.accent }}
              >
                KEY ADVANTAGE
              </span>
              <span className="text-sm font-medium text-white/85 font-[Inter,sans-serif]">
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
        <div className="flex justify-between items-start mb-1.5">
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
          <div className="flex flex-col items-end gap-1">
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
        <div className="text-[12px] font-[Inter,sans-serif] text-[#666] leading-[1.4]">
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
        <div className="text-[13px] font-[Inter,sans-serif] text-[#666] leading-[1.5]">
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
        <div className="text-[9px] font-bold font-[Inter,sans-serif] text-[#aaa] uppercase tracking-[1px] mb-1">
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

// Connected sector icons
const RippleIconBlocks = () => <Blocks size={20} strokeWidth={1.5} />;
const RippleIconWallet = () => <Wallet size={20} strokeWidth={1.5} />;
const RippleIconBattery = () => <BatteryCharging size={20} strokeWidth={1.5} />;
const RippleIconFactory = () => <Factory size={20} strokeWidth={1.5} />;
const RippleIconTruck = () => <Truck size={20} strokeWidth={1.5} />;

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
  const navigate = useNavigate();
  const SECTOR_ROUTES: Record<string, string> = {
    "Financial Inclusion": "/sectors/financial",
    "Health Systems": "/sectors/health",
    "Agriculture & Value Chains": "/sectors/agriculture",
    "Agriculture": "/sectors/agriculture",
    "Energy": "/sectors/energy",
    "Manufacturing": "/sectors/manufacturing",
    "Transportation": "/sectors/transport",
    "Infrastructure": "/sectors/infrastructure",
    "Technology & Innovation": "/sectors/technology",
    "Education & Skills": "/sectors/education",
  };

  const handleNodeClick = (idx) => {
    setActiveNode(activeNode === idx ? null : idx);
    setShowMoreRipple(false);
  };

  return (
    <section
      className="overflow-visible"
      style={{
        backgroundColor: colors.primary,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Pill */}
        <div className="text-center mb-6">
          <span
            className="inline-block py-2.5 px-5 rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif]"
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: colors.accent,
            }}
          >
            The Ripple Effect
          </span>
        </div>

        {/* Heading */}
        <h2
          className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] text-center mx-auto mb-4 max-w-[820px]"
          style={{
            fontSize: isMobile ? "28px" : "42px",
            color: colors.white,
          }}
        >
          How Agriculture <span style={{ color: colors.accent }} className="font-semibold">Amplifies Impact</span>
        </h2>

        {/* Subheading */}
        <p className="font-[Inter,sans-serif] text-base leading-[1.65] text-white/60 text-center max-w-[680px] mx-auto mb-12">
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
            <div className="flex flex-col items-center mb-4">
              <div
                className="w-14 h-14 rounded-[14px] flex items-center justify-center shadow-[0_0_24px_rgba(184,217,53,0.3)]"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.primary,
                }}
              >
                <IconSproutHub />
              </div>
              <span
                className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[0.5px] mt-1.5"
                style={{ color: colors.accent }}
              >
                AGRICULTURE
              </span>
            </div>
            {/* 5 sector icons */}
            <div className="flex justify-center gap-3">
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
          <div className="flex items-start justify-center gap-8 mb-12">
            {/* Hub icon */}
            <div
              className="w-[120px] flex flex-col items-center shrink-0"
            >
              <div
                className="w-20 h-20 rounded-[20px] flex items-center justify-center shadow-[0_0_30px_rgba(184,217,53,0.3)] mb-2.5"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.primary,
                }}
              >
                <IconSproutHub />
              </div>
              {isMobile && (
                <span
                  className="font-[Inter,sans-serif] text-[13px] font-semibold text-center"
                  style={{ color: colors.white }}
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
              <div className="text-center py-5">
                <p className="font-[Inter,sans-serif] text-[15px] text-white/50">
                  Tap a sector above to explore how agriculture amplifies its impact
                </p>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-5">
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
                  <span className="font-[Inter,sans-serif] text-[13px] text-white/40">
                    Click a sector above to explore
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {ripplePathways.map((p, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveNode(i)}
                      className="bg-white/5 rounded-2xl py-6 px-5 cursor-pointer"
                    >
                      <div className="font-[Inter,sans-serif] text-sm font-semibold text-white mb-2">
                        {p.name}
                      </div>
                      <div className="font-[Inter,sans-serif] text-[13px] text-white/[0.45] h-10 overflow-hidden">
                        {p.connection}
                      </div>
                      <div className="mt-3">
                        <span
                          className="font-[Poppins,sans-serif] text-[18px] font-bold"
                          style={{ color: colors.accent }}
                        >
                          {p.multiplier}
                        </span>
                        <span className="font-[Inter,sans-serif] text-[11px] text-white/40 ml-1.5">
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
                className="flex flex-wrap gap-2 mb-7 items-center"
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
                    className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1px] mb-4"
                    style={{ color: colors.accent }}
                  >
                    Why It Matters
                  </div>
                  <p className="font-[Inter,sans-serif] text-[15px] text-white/70 leading-[1.6] mb-5">
                    {ripplePathways[activeNode].impact}
                  </p>
                  <div className="flex items-baseline gap-2">
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
                    <span className="font-[Inter,sans-serif] text-[13px] text-white/40">
                      value multiplier
                    </span>
                  </div>
                </div>

                {/* Column 2: Synergy Pathways (collapsible on mobile) */}
                {(!isMobile || showMoreRipple) && (
                  <div>
                    <div
                      className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1px] mb-4"
                      style={{ color: colors.accent }}
                    >
                      Synergy Pathways
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {ripplePathways[activeNode].synergies.map((syn, si) => (
                        <div
                          key={si}
                          className="flex items-center gap-3 py-3 px-4 rounded-[10px] bg-white/5 border border-white/[0.06] overflow-hidden"
                        >
                          <span className="text-[8px] shrink-0" style={{ color: colors.accent }}>●</span>
                          <span className="font-[Inter,sans-serif] text-sm text-white/75 whitespace-nowrap overflow-hidden text-ellipsis">
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
                      className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1px] mb-4"
                      style={{ color: colors.accent }}
                    >
                      Linked Ventures
                    </div>
                    <div className="flex flex-col gap-2.5">
                      {ripplePathways[activeNode].bridgeVentures.map((v, vi) => (
                        <div
                          key={vi}
                          className="flex justify-between items-center bg-[rgba(184,217,53,0.1)] border border-[rgba(184,217,53,0.15)] py-3.5 px-[18px] rounded-xl"
                        >
                          <span className="font-[Inter,sans-serif] text-sm font-semibold text-white">
                            {v}
                          </span>
                          <span className="text-base" style={{ color: colors.accent }}>→</span>
                        </div>
                      ))}
                    </div>
                    <a
                      href={SECTOR_ROUTES[ripplePathways[activeNode].name] || "/sectors"}
                      onClick={(e) => { e.preventDefault(); navigate(SECTOR_ROUTES[ripplePathways[activeNode].name] || "/sectors"); }}
                      className="inline-flex items-center gap-2 font-[Inter,sans-serif] text-sm font-semibold no-underline mt-5"
                      style={{ color: colors.accent }}
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
                  className="w-full p-3.5 bg-transparent border border-white/15 rounded-xl font-[Inter,sans-serif] text-sm font-semibold text-white cursor-pointer mt-4 flex items-center justify-center gap-2"
                >
                  {showMoreRipple ? "Show less" : "Show more details"}
                  <ChevronDown size={14} strokeWidth={2} color="white" style={{ transform: showMoreRipple ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }} />
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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("returns");
  const [activeAudience, setActiveAudience] = useState(0);
  const [showInvestmentDetails, setShowInvestmentDetails] = useState(false);

  const aud = investmentAudiences[activeAudience];

  return (
    <section
      className="overflow-visible"
      style={{
        backgroundColor: colors.background,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
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
              <p className="font-[Inter,sans-serif] text-base text-[#666] leading-[1.65] m-0 max-w-[700px]">
                Investment isn't only capital — it's expertise, partnerships, policy, and vision. See how your role
                contributes to 18 ventures across $12-22M in opportunity.
              </p>
            )}
          </div>

          {/* Audience Selector */}
          {isMobile ? (
            <div className="flex justify-center gap-3 mb-3">
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
            <div className="flex justify-start gap-3 mb-10 flex-wrap">
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
          className="grid items-stretch overflow-hidden"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "24px" : "48px",
          }}
        >
          {/* LEFT COLUMN */}
          <div className="flex flex-col min-w-0 overflow-hidden">
            {/* Headline + Pitch (desktop only) */}
            {!isMobile && (
              <h3
                className="font-[Inter,sans-serif] text-[32px] font-light leading-[1.25] tracking-[-0.3px] m-0 mb-4 min-h-[80px] flex items-end"
                style={{ color: colors.primary }}
              >
                {aud.headline}
              </h3>
            )}
            {!isMobile && (
              <p className="font-[Inter,sans-serif] text-[15px] text-[#555] leading-[1.7] m-0 mb-6 min-h-[100px]">
                {aud.pitch}
              </p>
            )}

            {/* Stat cards */}
            <div
              className="grid grid-cols-3 mb-6 w-full"
              style={{ gap: isMobile ? "8px" : "12px" }}
            >
              {aud.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="rounded-xl text-center flex flex-col justify-center"
                  style={{
                    backgroundColor: colors.white,
                    padding: isMobile ? "16px 10px" : "18px 14px",
                    border: `1px solid ${colors.line}`,
                    minHeight: isMobile ? "auto" : "110px",
                  }}
                >
                  <div
                    className="font-[Poppins,sans-serif] font-bold leading-[1.1] mb-1"
                    style={{
                      fontSize: isMobile ? "20px" : "26px",
                      color: colors.accent,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="font-[Inter,sans-serif] font-semibold mb-0.5"
                    style={{
                      fontSize: isMobile ? "11px" : "12px",
                      color: colors.primary,
                    }}
                  >
                    {stat.label}
                  </div>
                  <div className="font-[Inter,sans-serif] text-[10px] text-[#888]">{stat.detail}</div>
                </div>
              ))}
            </div>

            {/* Engagement Pathways */}
            <div className="flex-1 flex flex-col gap-2.5 mb-5 w-full overflow-hidden">
              <div
                className="font-[Inter,sans-serif] text-[11px] font-bold uppercase tracking-[1px] mb-1 opacity-50"
                style={{ color: colors.primary }}
              >
                Your Engagement
              </div>
              {aud.pathways.map((path, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 py-3 px-4 rounded-[10px] overflow-hidden"
                  style={{
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.line}`,
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: colors.accent }}
                  />
                  <div
                    className="font-[Inter,sans-serif] text-[13px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis shrink-0 max-w-[45%]"
                    style={{ color: colors.primary }}
                  >
                    {path.bring}
                  </div>
                  <div className="font-[Inter,sans-serif] text-[12px] text-[#777] whitespace-nowrap overflow-hidden text-ellipsis flex-1">
                    {path.get}
                  </div>
                </div>
              ))}
            </div>

            {/* Validation bar */}
            <div className="py-3.5 px-[18px] bg-[rgba(27,77,62,0.06)] rounded-xl flex items-center gap-3 w-full box-border overflow-hidden">
              <div className="shrink-0 flex" style={{ color: colors.primary }}>
                <IconCheck />
              </div>
              <div
                className="font-[Inter,sans-serif] text-[13px] text-[#444] leading-[1.5] overflow-hidden text-ellipsis"
                style={{ whiteSpace: isMobile ? "nowrap" : "normal" }}
              >
                <strong style={{ color: colors.primary }}>MoFA</strong>
                {isMobile ? " · Planting for Food & Jobs" : " supporting Planting for Food & Jobs objectives"}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Green panel */}
          {(!isMobile || showInvestmentDetails) && (
            <div
              className="flex flex-col"
              style={{
                backgroundColor: colors.primary,
                borderRadius: isMobile ? "16px" : "20px",
                padding: isMobile ? "20px" : "28px",
              }}
            >
              {/* Tab selector */}
              <div className="flex bg-white/[0.08] rounded-xl p-1 mb-5 shrink-0">
                {investmentTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className="flex-1 border-none py-3 px-5 rounded-[10px] text-sm font-[Inter,sans-serif] cursor-pointer transition-all duration-200 ease-in-out"
                    style={{
                      backgroundColor: activeTab === tab.key ? colors.accent : "transparent",
                      color: activeTab === tab.key ? colors.primary : "rgba(255,255,255,0.5)",
                      fontWeight: activeTab === tab.key ? "700" : "500",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab content cards */}
              <div className="flex flex-col gap-2.5 flex-1">
                {investmentTabContent[activeTab].map((item, idx) => {
                  const isTextValue =
                    isNaN(item.value.charAt(0)) && !item.value.includes("%") && !item.value.includes("x");
                  return (
                    <div
                      key={idx}
                      className="bg-white/5 rounded-xl flex gap-4 items-center flex-1"
                      style={{
                        padding: isMobile ? "16px" : "18px 20px",
                        minHeight: isMobile ? "auto" : "0",
                      }}
                    >
                      <div className="shrink-0" style={{ minWidth: isMobile ? "80px" : "100px" }}>
                        <div
                          className="font-[Poppins,sans-serif] font-bold leading-[1.1] whitespace-nowrap"
                          style={{
                            fontSize: isTextValue ? (isMobile ? "17px" : "19px") : isMobile ? "20px" : "22px",
                            color: colors.accent,
                          }}
                        >
                          {item.value}
                        </div>
                        <div className="font-[Inter,sans-serif] text-[9px] text-white/[0.35] uppercase tracking-[0.5px] mt-1 leading-[1.3]">
                          {item.label}
                        </div>
                      </div>
                      <div className="font-[Inter,sans-serif] text-[13px] text-white/70 leading-[1.55] border-l border-white/10 pl-4 flex-1 min-w-0">
                        {item.detail}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Prospectus bar */}
              <div className="mt-4 py-3.5 px-5 bg-white/5 rounded-xl flex justify-between items-center shrink-0">
                <span className="font-[Inter,sans-serif] text-[13px] text-white/[0.45]">
                  Full financial model available
                </span>
                <a
                  href="/resources"
                  onClick={(e) => { e.preventDefault(); navigate("/resources"); }}
                  className="font-[Inter,sans-serif] text-sm font-bold no-underline inline-flex items-center gap-1.5 shrink-0"
                  style={{ color: colors.accent }}
                >
                  Download Prospectus <span className="text-base">→</span>
                </a>
              </div>
            </div>
          )}

          {/* Mobile toggle */}
          {isMobile && !showInvestmentDetails && (
            <button
              onClick={() => setShowInvestmentDetails(true)}
              className="flex items-center justify-center gap-2 w-full p-3.5 bg-transparent rounded-xl font-[Inter,sans-serif] text-sm font-semibold cursor-pointer"
              style={{
                border: `1px solid ${colors.line}`,
                color: colors.primary,
              }}
            >
              View returns, timeline & impact
              <ChevronDown size={14} strokeWidth={2.5} color={colors.primary} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// FOOTER COMPONENTS
const SectorGrid = () => {
  const [hovered, setHovered] = useState(null);
  return (
    <div>
      <div
        className="text-[12px] font-semibold font-['DM_Sans',sans-serif] uppercase tracking-[1.5px] mb-3 transition-colors duration-[250ms] ease-in-out leading-none min-h-[12px]"
        style={{
          color: hovered !== null ? colors.accent : "rgba(255,255,255,0.4)",
        }}
      >
        {hovered !== null ? FOOTER_SECTOR_ICONS[hovered].label : "Explore 12 Sectors"}
      </div>
      <div className="flex justify-between items-center">
        {FOOTER_SECTOR_ICONS.map((sector, i) => {
          const isH = hovered === i;
          return (
            <a
              key={sector.key}
              href={SECTOR_ROUTES[sector.key] ?? "#"}
              title={sector.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="flex items-center justify-center w-11 h-11 rounded-[10px] cursor-pointer no-underline transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] box-border"
              style={{
                backgroundColor: isH ? "rgba(184,217,53,0.12)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${isH ? "rgba(184,217,53,0.35)" : "rgba(255,255,255,0.07)"}`,
                transform: isH ? "translateY(-2px)" : "none",
                boxShadow: isH ? "0 6px 16px rgba(0,0,0,0.2), 0 0 0 1px rgba(184,217,53,0.15)" : "none",
              }}
            >
              <div
                className="flex items-center justify-center transition-opacity duration-[250ms] ease-in-out"
                style={{ opacity: isH ? 1 : 0.5 }}
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
// MAIN PAGE COMPONENT
// ============================================================================

export default function AgricultureSectorPageIntegrated() {
  return (
    <Layout>
      <div
        className="font-[Inter,sans-serif] m-0 p-0"
        style={{
          backgroundColor: colors.white,
          overflowX: "clip",
        }}
      >


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
        `}</style>

        <SectorHeroSection sector={sectorData} />
        <OpportunitySection />

        {/* ★ THE PROCESS - Value Chain Section ★ */}
        <ValueChainSectionPremium />

        <SolutionsSection sector={sectorData} />
        <CompetitiveLandscapeSection sector={sectorData} />
        <GovernancePolicySection />
        <ImpactDashboardSection />
        <RippleEffectSection />
        <InvestmentThesisSection />
        <SectorFinalCTA
          heading={<>Ready to Grow Ghana's <span className="font-semibold" style={{ color: colors.accent }}>Agricultural Future?</span></>}
          description="Whether you're an investor, partner, or government stakeholder, there's a role for you in transforming food systems."
          secondaryButtonText="Download Sector Brief"
        />

      </div>
    </Layout>
  );
}
