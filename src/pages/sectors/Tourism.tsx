import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { IconPlane, IconBuilding, IconWallet, IconFactory, IconTruck, IconZap, IconArrowRight, IconArrowDown, IconCheck, IconWarning, IconUsers, IconPalette, IconGraduation, IconSprout, IconLuggage, IconStorefront, IconOfficeBuilding, IconTrendingUp, IconLandmark, IconCheckSmall } from "@/components/icons/SectorIcons";
import { ArrowRight, BarChart3, Building2, Check, ChevronDown, Clock, Compass, Globe, Plane, Users } from "lucide-react";
import { colors, layout } from "@/lib/theme";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useCounter } from "@/hooks/useCounter";
import { cn } from "@/lib/utils";

const CONTENT_MAX_WIDTH = layout.maxWidth;

// ============================================================================
// SECTOR DATA - Tourism & Hospitality
// ============================================================================

const sectorData = {
  id: 9,
  slug: "tourism-hospitality",
  name: "Tourism & Hospitality",
  shortName: "Tourism",
  category: "Cultural Capital",
  categoryColor: "#2E7D32",

  capitalRange: "$10-18M",
  ventures: 15,
  jobsImpact: "813K jobs",
  gdpContribution: "5.7%",

  problemHeadline: "Where Heritage Meets Homecoming",
  problemSubheadline:
    "Ghana's tourism sector generated $4.8 billion in 2024 and welcomed 1.29 million international visitors — and the opportunity is just beginning. From heritage corridors ready for world-class interpretation, to northern regions with untapped natural assets, to 370,000 hospitality workers whose talent can be elevated through training and certification, this is a sector where strategic investment and cultural pride create compounding returns for communities nationwide.",

  keyStats: [
    { value: "$4.8B", label: "Tourism Revenue (2024)", detail: "Historic high, 27% YoY increase" },
    { value: "1.29M", label: "International Arrivals", detail: "12% increase from 2023" },
    { value: "78%", label: "Regional Expansion Potential", detail: "Northern regions ready for development" },
    { value: "40-50%", label: "Workforce Elevation Opportunity", detail: "370K+ workers ready for certification" },
  ],

  painPoints: [
    {
      title: "Service Excellence Opportunity",
      description:
        "6,700+ hospitality enterprises represent a massive addressable market for quality certification, training, and brand-building that drives repeat visits and positive word-of-mouth.",
      rootCauses: [
        "Standards framework opportunity",
        "Training scale-up potential",
        "Formalization opportunity",
        "Trust signal creation",
      ],
      quantification: "6,700+ enterprises ready for quality elevation",
    },
    {
      title: "Infrastructure & Access Expansion",
      description:
        "Extending reliable infrastructure to heritage and nature destinations beyond Greater Accra opens entirely new tourism corridors and visitor experiences.",
      rootCauses: [
        "Road modernization potential",
        "Energy reliability gains",
        "Digital connectivity expansion",
        "Visitor facility development",
      ],
      quantification: "78% regional expansion potential beyond coastal zones",
    },
    {
      title: "Regional Tourism Development",
      description:
        "Northern regions hold extraordinary heritage and natural assets ready for world-class development — and community benefit-sharing models can ensure host communities prosper alongside visitors.",
      rootCauses: [
        "Regional investment opportunity",
        "Benefit-sharing models",
        "Regional transport development",
        "Local talent elevation",
      ],
      quantification: "80%+ recapture potential for community benefit-sharing",
    },
    {
      title: "Workforce Elevation & Certification",
      description:
        "370,000 tourism workers represent an enormous talent pool ready for certification, skills elevation, and career pathway development across every region.",
      rootCauses: [
        "Regional training expansion",
        "Career pathway creation",
        "Year-round programming",
        "Formalization pathways",
      ],
      quantification: "370,000 workers ready for skills elevation",
    },
  ],

  solutions: [
    {
      tier: 1,
      name: "GTM Platform Enhancement",
      description:
        "Partnership with GTDC to onboard suppliers, expand marketing reach, and add direct booking tools that reduce reliance on international OTA commissions significantly.",
      capital: "$0.5-1M",
      score: 41,
      impact: "Builds direct booking channels for operators",
      model: "GTDC partnership model",
    },
    {
      tier: 1,
      name: "Heritage Interpretation Excellence",
      description:
        "Enhanced storytelling at heritage sites through professionally trained guides, multilingual audio tours, and immersive digital experiences that honor and preserve Ghana's deep ancestral connections.",
      capital: "$0.5-1M",
      score: 41,
      impact: "Transforms the heritage site visitor experience",
      model: "UNESCO partnership potential",
    },
    {
      tier: 1,
      name: "Diaspora Heritage Tour Operator",
      description:
        "Specialized tour operation for diaspora visitors offering ancestry tracing, immersive cultural itineraries, and curated investment exposure across Ghana's most significant heritage corridors.",
      capital: "$0.3-0.6M",
      score: 41,
      impact: "Serves an underserved high-value market niche",
      model: "22-night avg stay, $700/day spending",
    },
    {
      tier: 2,
      name: "Heritage Boutique Hotel Network",
      description:
        "Mid-market diaspora-focused properties in Cape Coast, Elmina, and Accra heritage areas that meet growing demand for authentic and quality accommodation experiences.",
      capital: "$2-4M",
      score: 40,
      impact: "Builds the mid-market accommodation segment",
      model: "Boutique hotel franchise model",
    },
    {
      tier: 2,
      name: "Hospitality Excellence Certification",
      description:
        "Independent quality certification program with mystery shopping audits, performance benchmarks, and marketing support that creates trusted quality signals for visitors.",
      capital: "$0.5-1M",
      score: 39,
      impact: "Establishes a trusted quality signal for visitors",
      model: "Revenue from certification fees + marketing",
    },
    {
      tier: 2,
      name: "Community Tourism Development Fund",
      description:
        "Grants and technical assistance for community-based tourism initiatives ensuring economic benefits flow equitably to heritage site host communities across all regions.",
      capital: "$0.5-1M",
      score: 38,
      impact: "Builds equitable community benefit-sharing",
      model: "Blended grant + revolving fund",
    },
    {
      tier: 3,
      name: "Regional Training Centers",
      description:
        "Distributed hospitality training facilities in regional capitals with flexible short-course formats accessible to working staff and aspiring hospitality professionals.",
      capital: "$1-2M",
      score: 37,
      impact: "Extends quality training beyond Accra region",
      model: "HOTCATT partnership + regional delivery",
    },
    {
      tier: 3,
      name: "Eco-Lodge Development",
      description:
        "Sustainable lodge properties near national parks and natural attractions designed for growing eco-tourism demand while meeting international environmental certifications.",
      capital: "$1.5-3M",
      score: 36,
      impact: "Fills critical regional accommodation gaps",
      model: "Community partnership + eco-certification",
    },
    {
      tier: 3,
      name: "Tourism Business Intelligence",
      description:
        "Data collection and analytics platform providing hospitality operators with demand forecasting, competitive benchmarking, and actionable market intelligence for growth.",
      capital: "$0.3-0.6M",
      score: 35,
      impact: "Empowers operators with actionable insights",
      model: "Subscription + consulting revenue",
    },
  ],

  competitors: [
    {
      name: "GTDC Programs",
      focus: "Product development & digital platforms",
      gap: "Partnership for scaled implementation",
      year: "2019",
      funding: "Gov't",
      priority: "High",
      strengths: [
        { name: "Policy Alignment", rating: 5 },
        { name: "Innovation (Accra By Night)", rating: 4 },
        { name: "Digital Platforms", rating: 3 },
      ],
      gaps: ["Regional expansion support", "Scaling partnership", "Co-investment potential"],
      bridgeOpportunity: "GTM platform enhancement partnership",
    },
    {
      name: "Beyond the Return",
      focus: "Diaspora engagement & cultural tourism",
      gap: "Ready for private sector collaboration",
      year: "2020",
      funding: "Gov't",
      priority: "High",
      strengths: [
        { name: "Diaspora Networks", rating: 5 },
        { name: "December in GH", rating: 5 },
        { name: "Brand Recognition", rating: 4 },
      ],
      gaps: ["Coordination platform", "Commercial bridge-building", "Year-round programming"],
      bridgeOpportunity: "Year-round diaspora tourism programming",
    },
    {
      name: "AfroTrips",
      focus: "Ghana-focused heritage tourism",
      gap: "Network partnership opportunity",
      year: "2018",
      funding: "$500K+",
      priority: "Medium",
      strengths: [
        { name: "Heritage Focus", rating: 4 },
        { name: "Diaspora Market", rating: 4 },
        { name: "Digital Marketing", rating: 4 },
      ],
      gaps: ["Network scale opportunity", "Multi-market expansion", "Asset partnership model"],
      bridgeOpportunity: "Tour operator network partnership",
    },
    {
      name: "TurnStay",
      focus: "Travel payment fintech",
      gap: "Ghana market entry collaboration",
      year: "2022",
      funding: "$2M+",
      priority: "Medium",
      strengths: [
        { name: "Payment Technology", rating: 5 },
        { name: "Cost Reduction", rating: 4 },
        { name: "Stablecoin Settlement", rating: 4 },
      ],
      gaps: ["Market entry facilitation", "Operator network access", "Regulatory navigation"],
      bridgeOpportunity: "Payment infrastructure partnership",
    },
    {
      name: "International Hotel Chains",
      focus: "Luxury & business accommodation",
      gap: "Standards model for mid-market expansion",
      year: "Various",
      funding: "Corporate",
      priority: "Low",
      strengths: [
        { name: "Service Standards", rating: 5 },
        { name: "Brand Recognition", rating: 5 },
        { name: "Training Systems", rating: 5 },
      ],
      gaps: ["Regional expansion model", "Mid-market positioning", "Cultural authenticity integration"],
      bridgeOpportunity: "Model for service standards; brand partnership potential",
    },
    {
      name: "Conservation Intl.",
      focus: "Eco-tourism at Kakum National Park",
      gap: "Eco-tourism model for replication",
      year: "1992",
      funding: "$10M+",
      priority: "Medium",
      strengths: [
        { name: "Conservation", rating: 5 },
        { name: "Eco-Tourism Model", rating: 5 },
        { name: "Community Engagement", rating: 4 },
      ],
      gaps: ["Multi-site replication", "Commercial model development", "Sustainability partnership"],
      bridgeOpportunity: "Eco-lodge development partnership",
    },
  ],

  policyAlignment: [
    {
      policy: "Black Star Experience",
      allocation: "7 Pillars",
      alignment: "Direct alignment with heritage tourism, cultural programming, and destination development",
    },
    {
      policy: "Beyond the Return Initiative",
      allocation: "10-Year Program",
      alignment: "Diaspora engagement, December in GH programming, citizenship pathways",
    },
    {
      policy: "National Theatre Rehabilitation",
      allocation: "GH₵ allocation",
      alignment: "Cultural infrastructure supporting tourism programming and events",
    },
    {
      policy: "MICE Tourism Priority",
      allocation: "Presidential Priority",
      alignment: "Conference facility development and international summit hosting",
    },
    {
      policy: "Osu Castle Redevelopment",
      allocation: "22-acre precinct",
      alignment: "Heritage tourism infrastructure anchor in Accra",
    },
    {
      policy: "Accra Marine Drive Project",
      allocation: "241-acre coastal",
      alignment: "Tourism and leisure destination development",
    },
  ],

  crossSector: [
    {
      sectorId: 7,
      name: "Creative Industries",
      connection: "Cultural programming, festival tourism, heritage interpretation, arts/crafts market linkages",
    },
    {
      sectorId: 1,
      name: "Infrastructure",
      connection: "Road access to tourism sites, water/sanitation, energy reliability, digital connectivity",
    },
    {
      sectorId: 5,
      name: "Education & Skills",
      connection: "Hospitality training, guide certification, service excellence standards",
    },
    {
      sectorId: 6,
      name: "Agriculture",
      connection: "Farm-to-table tourism, culinary tourism, local food supply chains",
    },
    {
      sectorId: 12,
      name: "Transportation",
      connection: "Tourist ground transportation, airport connectivity, regional transport",
    },
  ],

  relatedSectors: [
    { id: 7, name: "Creative Industries", icon: "palette", reason: "Cultural programming, heritage interpretation" },
    { id: 1, name: "Infrastructure", icon: "building", reason: "Road access, energy, connectivity" },
    { id: 5, name: "Education & Skills", icon: "graduation", reason: "Hospitality training, guide certification" },
  ],
};

// ============================================================================
// PREMIUM VALUE CHAIN DATA
// ============================================================================

const valueChainStages = [
  {
    id: 1,
    stage: "Planning",
    actor: "Tourists & Diaspora",
    population: "1.29M international",
    icon: "globe",
    valueRetained: 100,
    valueLost: 0,
    painPoints: [
      "Discovery platform potential",
      "Review & rating opportunity",
      "Direct booking channels",
      "Quality signal creation",
    ],
    stat: "$3,742 avg trip spend",
    color: colors.accent,
  },
  {
    id: 2,
    stage: "Arrival",
    actor: "Transport Services",
    population: "14 cruise ships",
    icon: "plane",
    valueRetained: 85,
    valueLost: 15,
    painPoints: [
      "Ground transport modernization",
      "Rental fleet expansion",
      "Road corridor investment",
      "Vehicle standards opportunity",
    ],
    stat: "12,600+ cruise passengers",
    color: "#8CB83D",
  },
  {
    id: 3,
    stage: "Accommodation",
    actor: "Hotels & Lodges",
    population: "6,702 enterprises",
    icon: "hotel",
    valueRetained: 65,
    valueLost: 20,
    painPoints: [
      "Quality certification opportunity",
      "Mid-market development",
      "Operating efficiency gains",
      "Direct booking margin recovery",
    ],
    stat: "6,700+ enterprises to elevate",
    color: "#5A9A5B",
  },
  {
    id: 4,
    stage: "Experiences",
    actor: "Tour Operators & Sites",
    population: "Heritage & nature",
    icon: "compass",
    valueRetained: 45,
    valueLost: 20,
    painPoints: [
      "Interpretation excellence",
      "Site infrastructure investment",
      "Supplier network building",
      "Experience standards creation",
    ],
    stat: "78% regional expansion ready",
    color: "#3A7D4E",
  },
  {
    id: 5,
    stage: "Community Impact",
    actor: "Local Communities",
    population: "Host communities",
    icon: "users",
    valueRetained: 25,
    valueLost: 20,
    painPoints: [
      "80%+ benefit recapture potential",
      "Employment pathway creation",
      "Community ownership models",
      "Cultural stewardship",
    ],
    stat: "80%+ recapture potential",
    color: "#245E3D",
  },
];


// Premium Value Chain Icons
const valueChainIcons = {
  globe: <Globe size={24} strokeWidth={1.5} />,
  plane: <Plane size={24} strokeWidth={1.5} />,
  hotel: <Building2 size={24} strokeWidth={1.5} />,
  compass: <Compass size={24} strokeWidth={1.5} />,
  users: <Users size={24} strokeWidth={1.5} />,
};



// ============================================================================
// HERO SECTION
// ============================================================================

const HeroSection = ({ sector }) => {
  const isMobile = useIsMobile();
  return (
    <section
      className="relative flex flex-col"
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "80px 20px 20px" : "112px 80px 20px",
        minHeight: isMobile ? "auto" : "calc(100vh - 100px)",
      }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div
          className="grid items-start flex-1"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "1fr 420px",
            gap: isMobile ? "32px" : "60px",
          }}
        >
          <div>
            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="rounded-full text-[11px] font-bold uppercase tracking-[1.5px] font-[Inter,sans-serif] px-4 py-2"
                style={{
                  backgroundColor: colors.accentLight,
                  color: colors.primary,
                }}
              >
                {sector.category}
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-[Inter,sans-serif] font-normal leading-[1.1] tracking-[-1px] mb-5 mt-0"
              style={{
                fontSize: isMobile ? "30px" : "52px",
                color: colors.primary,
              }}
            >
              <span className="font-bold">Tourism</span> & Hospitality
            </h1>

            {/* Subheading */}
            <h2
              className="font-[Inter,sans-serif] font-semibold leading-[1.3] mt-0 mb-4"
              style={{
                fontSize: isMobile ? "20px" : "24px",
                color: colors.dark,
              }}
            >
              {sector.problemHeadline}
            </h2>

            {/* Description */}
            <p
              className="font-[Inter,sans-serif] font-normal leading-[1.7] text-[#555] mt-0 mb-9 max-w-[540px]"
              style={{ fontSize: isMobile ? "15px" : "16px" }}
            >
              {sector.problemSubheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-3" style={{ flexWrap: isMobile ? "wrap" : "nowrap" }}>
              <button
                className="border-none rounded-full font-semibold font-[Inter,sans-serif] cursor-pointer flex items-center gap-[10px]"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.primary,
                  padding: isMobile ? "14px 20px" : "16px 24px",
                  fontSize: isMobile ? "14px" : "15px",
                  flex: isMobile ? "1 1 100%" : "none",
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                Request Full Analysis
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.white,
                  }}
                >
                  <IconArrowRight />
                </span>
              </button>
              <button
                className="bg-transparent rounded-full font-semibold font-[Inter,sans-serif] cursor-pointer"
                style={{
                  color: colors.primary,
                  border: `2px solid ${colors.line}`,
                  padding: isMobile ? "14px 20px" : "16px 24px",
                  fontSize: isMobile ? "14px" : "15px",
                  flex: isMobile ? "1 1 100%" : "none",
                }}
              >
                Download Summary
              </button>
            </div>
          </div>

          {/* Stats Card */}
          <div
            className="rounded-[20px]"
            style={{
              backgroundColor: colors.primary,
              padding: isMobile ? "24px" : "32px",
              minWidth: isMobile ? "auto" : "340px",
            }}
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-white/50 uppercase tracking-[1.5px] font-[Inter,sans-serif]">
                Sector Overview
              </span>
              <span
                className="rounded-full text-[11px] font-bold uppercase tracking-[1px] px-[14px] py-1.5"
                style={{
                  backgroundColor: "rgba(184, 217, 53, 0.15)",
                  color: colors.accent,
                }}
              >
                Active
              </span>
            </div>

            {/* Main Stats Row */}
            <div className="flex justify-between mt-5 pb-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <div>
                <div
                  className="text-[42px] font-bold font-[Inter,sans-serif] leading-none mb-2"
                  style={{ color: colors.accent }}
                >
                  {sector.capitalRange}
                </div>
                <div className="text-[13px] font-medium text-white/50 font-[Inter,sans-serif]">
                  Investment Range
                </div>
              </div>
              <div className="text-right">
                <div
                  className="text-[42px] font-bold font-[Inter,sans-serif] leading-none mb-2"
                  style={{ color: colors.accent }}
                >
                  {sector.ventures}
                </div>
                <div className="text-[13px] font-medium text-white/50 font-[Inter,sans-serif]">
                  Identified Ventures
                </div>
              </div>
            </div>

            {/* Stat Rows — 4 items */}
            {sector.keyStats.map((stat, i) => (
              <div key={i} className="flex justify-between items-center py-4">
                <div>
                  <span className="text-[15px] font-medium text-white/80 font-[Inter,sans-serif] block">
                    {stat.label}
                  </span>
                  {stat.detail && (
                    <span className="text-[12px] font-normal text-white/35 font-[Inter,sans-serif] italic mt-0.5 block">
                      {stat.detail}
                    </span>
                  )}
                </div>
                <span
                  className="text-[20px] font-semibold font-[Inter,sans-serif]"
                  style={{ color: colors.accent }}
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
        <div className="flex flex-col items-center mt-auto pt-[10px] pb-[10px]">
          <span className="font-[Inter,sans-serif] text-[13px] text-[#999] mb-2">
            Explore Analysis
          </span>
          <div className="text-[#999]" style={{ animation: "bounce 2s infinite" }}>
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
    title: "Service Excellence",
    description:
      "6,700+ hospitality enterprises represent a massive addressable market for quality certification and brand-building.",
    rootCauses: [
      { title: "Standards Framework", description: "Ready for certification" },
      { title: "Training Scale-Up", description: "Demand exceeds capacity" },
      { title: "Formalization Pathway", description: "Operators ready for quality" },
      { title: "Trust Signal Creation", description: "Market demand for markers" },
    ],
    quantification: "6,700+ enterprises ready for quality elevation",
    severity: "High Priority",
    severityScore: 95,
    affectedCount: "1.29M",
    affectedLabel: "international visitors",
    bridgeSolution: "Hospitality Excellence Certification",
  },
  {
    id: 2,
    title: "Infrastructure & Access",
    description:
      "Extending reliable infrastructure to heritage destinations beyond Greater Accra opens entirely new tourism corridors.",
    rootCauses: [
      { title: "Road Modernization", description: "Corridors ready for investment" },
      { title: "Energy Reliability", description: "30%+ cost savings achievable" },
      { title: "Digital Connectivity", description: "Regional networks emerging" },
      { title: "Visitor Facilities", description: "Wayfinding & rest stops" },
    ],
    quantification: "78% regional expansion potential beyond coastal zones",
    severity: "High Priority",
    severityScore: 90,
    affectedCount: "78%",
    affectedLabel: "regional expansion potential",
    bridgeSolution: "Heritage Boutique Hotels + Eco-Lodges",
  },
  {
    id: 3,
    title: "Regional Development",
    description:
      "Northern regions hold extraordinary heritage and natural assets ready for world-class development and benefit-sharing.",
    rootCauses: [
      { title: "Regional Investment", description: "Capital for new corridors" },
      { title: "Benefit-Sharing Models", description: "Community ownership paths" },
      { title: "Transport Development", description: "Connectivity emerging" },
      { title: "Local Talent Elevation", description: "Regional workforce ready" },
    ],
    quantification: "80%+ recapture potential for community benefit-sharing",
    severity: "Strategic",
    severityScore: 80,
    affectedCount: "60%+",
    affectedLabel: "regions to develop",
    bridgeSolution: "Community Tourism Fund + Clusters",
  },
  {
    id: 4,
    title: "Workforce Certification",
    description:
      "370,000 tourism workers represent an enormous talent pool ready for certification and career pathway development.",
    rootCauses: [
      { title: "Training Expansion", description: "HOTCATT ready to scale" },
      { title: "Career Pathways", description: "Progression frameworks" },
      { title: "Year-Round Programming", description: "Beyond the Return momentum" },
      { title: "Formalization Paths", description: "Certification = security" },
    ],
    quantification: "370,000 workers ready for skills elevation",
    severity: "Strategic",
    severityScore: 75,
    affectedCount: "370K",
    affectedLabel: "direct tourism workers",
    bridgeSolution: "Regional Training Centers + Toolkit",
  },
];

// ============================================================================
// THE LANDSCAPE — REBUILT FROM PRODUCTION HANDOFF
// ============================================================================

const ProblemCard = ({ problem, isExpanded, onToggle }) => {
  const isMobile = useIsMobile();

  return (
    <div
      onClick={onToggle}
      className="cursor-pointer transition-all duration-300"
      style={{
        backgroundColor: colors.white,
        borderRadius: isMobile ? "16px" : "20px",
        padding: isMobile ? "20px" : "28px",
        border: isExpanded ? `2px solid ${colors.accent}` : `1px solid ${colors.line}`,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3
            className="font-[Inter,sans-serif] font-semibold m-0"
            style={{
              fontSize: isMobile ? "16px" : "18px",
              color: colors.dark,
            }}
          >
            {problem.title}
          </h3>
          <p
            className="font-[Inter,sans-serif] text-[#666] mt-2 mb-0 leading-[1.55] overflow-hidden"
            style={{
              fontSize: isMobile ? "13px" : "14px",
              ...(isMobile ? {} : { minHeight: "63px" }),
              display: "-webkit-box",
              WebkitLineClamp: isMobile ? 2 : 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {problem.description}
          </p>
        </div>

        <span
          className="font-[Inter,sans-serif] text-[11px] font-bold rounded-[20px] whitespace-nowrap shrink-0 ml-3 px-[14px] py-1.5"
          style={{
            color: problem.severity === "High Priority" ? colors.primary : colors.accentText,
            backgroundColor: problem.severity === "High Priority" ? colors.accentLight : "rgba(184,217,53,0.12)",
          }}
        >
          {problem.severity}
        </span>
      </div>

      <div
        className="rounded-xl overflow-hidden"
        style={{
          backgroundColor: colors.accentLight,
          padding: isMobile ? "8px 12px" : "10px 16px",
          marginBottom: isExpanded ? "16px" : 0,
        }}
      >
        <span
          className="font-[Inter,sans-serif] font-semibold overflow-hidden"
          style={{
            fontSize: isMobile ? "13px" : "14px",
            color: colors.primary,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
          }}
        >
          Impact: {problem.quantification}
        </span>
      </div>

      {isExpanded && (
        <div className="pt-4" style={{ borderTop: `1px solid ${colors.line}` }}>
          <div
            className="grid gap-3 mb-4"
            style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}
          >
            <div className="rounded-xl p-[14px]" style={{ backgroundColor: colors.background }}>
              <div className="flex items-center justify-between mb-[10px]">
                <span className="font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888]">
                  Priority
                </span>
                <span
                  className="font-[Inter,sans-serif] text-[12px] font-bold rounded-[20px] px-[10px] py-1"
                  style={{
                    color: problem.severity === "High Priority" ? colors.primary : colors.accentText,
                    backgroundColor: problem.severity === "High Priority" ? colors.accentLight : "rgba(184,217,53,0.12)",
                  }}
                >
                  {problem.severity}
                </span>
              </div>
              <div className="h-2 rounded overflow-hidden" style={{ backgroundColor: colors.line }}>
                <div
                  className="h-full rounded transition-[width] duration-500"
                  style={{
                    width: `${problem.severityScore}%`,
                    backgroundColor: problem.severity === "High Priority" ? colors.primary : colors.accentText,
                  }}
                />
              </div>
            </div>

            <div className="rounded-xl p-[14px]" style={{ backgroundColor: colors.background }}>
              <span className="font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888] block mb-[10px]">
                Scale
              </span>
              <div className="flex items-baseline gap-2">
                <span
                  className="font-[Poppins,sans-serif] font-bold"
                  style={{
                    fontSize: isMobile ? "20px" : "24px",
                    color: colors.primary,
                  }}
                >
                  {problem.affectedCount}
                </span>
                <span className="font-[Inter,sans-serif] text-[13px] text-[#666]">
                  {problem.affectedLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={16} strokeWidth={2} color="#888" />
              <span className="font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888]">
                Opportunity Drivers
              </span>
            </div>
            <div className="grid gap-[10px]" style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>
              {problem.rootCauses.map((cause, j) => (
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
                  <div className="flex flex-col gap-px min-w-0">
                    <span
                      className="font-[Inter,sans-serif] font-semibold"
                      style={{
                        fontSize: isMobile ? "13px" : "14px",
                        color: colors.dark,
                      }}
                    >
                      {cause.title}
                    </span>
                    <span className="font-[Inter,sans-serif] text-[12px] text-[#888]">
                      {cause.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="flex pt-4"
            style={{
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "flex-start" : "center",
              gap: isMobile ? "8px" : "16px",
              borderTop: `1px solid ${colors.line}`,
            }}
          >
            <div className="flex items-center gap-[10px] shrink-0">
              <Check size={18} strokeWidth={2.5} color={colors.accent} />
              <span className="font-[Inter,sans-serif] text-[13px] text-[#888]">BRIDGE Solution:</span>
            </div>
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span
                className="font-[Inter,sans-serif] text-[14px] font-semibold flex-1 min-w-0"
                style={{ color: colors.primary }}
              >
                {problem.bridgeSolution}
              </span>
              <a
                href="#solutions"
                onClick={(e) => e.stopPropagation()}
                className="font-[Inter,sans-serif] text-[13px] font-medium cursor-pointer flex items-center gap-1 shrink-0 no-underline"
                style={{ color: colors.primary }}
              >
                View{" "}
                <ArrowRight size={14} strokeWidth={2} />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ProblemSection = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [activeScrollIdx, setActiveScrollIdx] = useState(0);
  const oppScrollRef = React.useRef(null);
  const isMobile = useIsMobile();

  const handleOppScroll = () => {
    const el = oppScrollRef.current;
    if (!el) return;
    const cardW = el.scrollWidth / problemSectionData.length;
    const idx = Math.round(el.scrollLeft / cardW);
    setActiveScrollIdx(Math.min(idx, problemSectionData.length - 1));
  };

  const scrollToOppCard = (idx) => {
    const el = oppScrollRef.current;
    if (!el) return;
    const cardW = el.scrollWidth / problemSectionData.length;
    el.scrollTo({ left: cardW * idx, behavior: "smooth" });
    setActiveScrollIdx(idx);
  };

  return (
    <section style={{ backgroundColor: colors.background, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] px-5 py-[10px]"
            style={{
              backgroundColor: colors.white,
              color: colors.primary,
              border: `1px solid ${colors.line}`,
            }}
          >
            The Opportunity
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[820px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
              margin: "24px 0 20px 0",
            }}
          >
            <span className="font-semibold">$4.8 billion</span> in tourism revenue — and the pathway to{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>transformation</span> is wide open
          </h2>
          <p
            className="font-[Inter,sans-serif] leading-[1.65] text-[#666] max-w-[680px] m-0"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
          >
            From establishing trusted quality signals across 6,700+ hospitality enterprises, to extending world-class
            experiences into every region — the scale of the opportunity matches the ambition.
          </p>
        </div>

        <div
          ref={oppScrollRef}
          onScroll={handleOppScroll}
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
                  padding: "0 20px 8px",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }
              : { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }
          }
        >
          {problemSectionData.map((problem, i) => (
            <div
              key={problem.id}
              className={cn(isMobile && "min-w-[85%] max-w-[85%] shrink-0 snap-start")}
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
          <div className="flex justify-center gap-2 mt-4">
            {problemSectionData.map((_, i) => (
              <div
                key={i}
                onClick={() => scrollToOppCard(i)}
                className="h-2 rounded cursor-pointer transition-all duration-300"
                style={{
                  width: i === activeScrollIdx ? "24px" : "8px",
                  backgroundColor: i === activeScrollIdx ? colors.accent : colors.line,
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

const AnimatedFlowArrow = ({ isActive, delay = 0 }) => (
  <div className="w-[60px] h-[60px] flex items-center justify-center relative">
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
      className="transition-transform duration-300"
      style={{ transform: isActive ? "translateX(3px)" : "translateX(0)" }}
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
      @keyframes flowParticle { 0% { left: 0; opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { left: 50px; opacity: 0; } }
    `}</style>
  </div>
);

const SelectCard = ({ stage, index, isActive, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="w-[220px] cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(index)}
    >
      <div
        className="w-full h-[185px] rounded-[20px] overflow-hidden flex flex-col items-center box-border transition-all duration-300"
        style={{
          backgroundColor: colors.white,
          border: isActive ? `2px solid ${colors.accent}` : `1px solid ${colors.line}`,
          boxShadow: isActive
            ? "0 12px 32px rgba(27, 77, 62, 0.12), 0 4px 12px rgba(27, 77, 62, 0.08)"
            : hovered
              ? "0 16px 32px rgba(27, 77, 62, 0.12), 0 6px 12px rgba(27, 77, 62, 0.08)"
              : "0 4px 12px rgba(0,0,0,0.05)",
          transform: hovered ? "translateY(-4px)" : "none",
          padding: "20px 18px 16px",
        }}
      >
        <h4
          className="font-[Inter,sans-serif] text-[15px] font-bold text-center whitespace-nowrap mt-0 mb-1"
          style={{ color: colors.primary }}
        >
          {stage.stage}
        </h4>
        <div className="font-[Inter,sans-serif] text-[12px] text-[#888] text-center mb-[10px] whitespace-nowrap">
          {stage.actor}
        </div>
        <div
          className="rounded-full text-[10px] font-semibold font-[Inter,sans-serif] mb-[14px] whitespace-nowrap px-3 py-[5px]"
          style={{
            backgroundColor: colors.accentLight,
            color: colors.primary,
            border: `1px solid ${colors.accent}`,
          }}
        >
          {stage.population}
        </div>
        <div className="w-full mt-auto">
          <div className="flex justify-between mb-[5px]">
            <span className="text-[10px] font-[Inter,sans-serif] text-[#999]">Value Retained</span>
            <span className="text-[10px] font-[Inter,sans-serif] font-semibold" style={{ color: colors.primary }}>
              {stage.valueRetained}%
            </span>
          </div>
          <div
            className="w-full h-[5px] rounded-[3px] overflow-hidden"
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
  );
};

const ValueLeakageBar = ({ isAnimating }) => (
  <div className="mt-12 px-5">
    <div className="flex items-center gap-3 mb-4">
      <BarChart3 size={18} strokeWidth={2} color={colors.primary} />
      <span
        className="font-[Inter,sans-serif] text-[13px] font-semibold uppercase tracking-[1px]"
        style={{ color: colors.primary }}
      >
        Value Flow Across the Chain
      </span>
    </div>
    <div className="flex gap-1 h-8 rounded-lg overflow-hidden">
      {valueChainStages.map((stage, i) => (
        <div
          key={i}
          className="flex items-center justify-center"
          style={{
            flex: stage.valueLost || 20,
            backgroundColor: stage.color,
            opacity: isAnimating ? 1 : 0.3,
            transition: `opacity 0.5s ease ${i * 200}ms`,
          }}
        >
          <span
            className="text-[10px] font-[Inter,sans-serif] font-semibold"
            style={{ color: i < 2 ? colors.primary : colors.white }}
          >
            {stage.valueLost > 0 ? `-${stage.valueLost}%` : "Start"}
          </span>
        </div>
      ))}
    </div>
    <div className="flex justify-between mt-2">
      <span className="text-[11px] font-[Inter,sans-serif] text-[#888]">Tourist Dollar Enters</span>
      <span className="text-[11px] font-[Inter,sans-serif] text-[#888]">Community Receives ~20%</span>
    </div>
  </div>
);

const ValueChainSectionPremium = () => {
  const isMobile = useIsMobile();
  const [activeStage, setActiveStage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsAnimating(true), 500);
    return () => clearTimeout(t);
  }, []);

  const active = valueChainStages[activeStage];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="relative z-[1] mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div className="text-center" style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6 px-5 py-[10px]"
            style={{
              backgroundColor: colors.white,
              color: colors.primary,
              border: `1px solid ${colors.line}`,
            }}
          >
            The Process
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light tracking-[-0.5px] mx-auto max-w-[600px] leading-[1.2] mb-5 mt-0"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
            }}
          >
            From <span className="font-semibold" style={{ color: colors.accent }}>Planning</span> to Impact
          </h2>
          <p
            className="font-[Inter,sans-serif] text-[#666] max-w-[750px] mx-auto leading-[1.65]"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
          >
            From trip planning to community prosperity — {isMobile ? "tap" : "click"} each stage to explore where
            strategic resources and innovation create compounding value.
          </p>
        </div>

        {isMobile ? (
          /* Mobile: Centered icon row + active card below */
          <div>
            <div className="flex justify-center gap-2 mb-5">
              {valueChainStages.map((stage, i) => (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(i)}
                  className="w-[52px] h-[52px] rounded-[14px] cursor-pointer flex items-center justify-center transition-all duration-200 p-1"
                  style={{
                    backgroundColor: activeStage === i ? colors.accentLight : colors.background,
                    border: activeStage === i ? `2px solid ${colors.accent}` : `1px solid ${colors.line}`,
                    color: activeStage === i ? colors.primary : "#888",
                  }}
                >
                  {React.cloneElement(valueChainIcons[stage.icon], { width: 20, height: 20 })}
                </button>
              ))}
            </div>
            {/* Active stage card */}
            {(() => {
              const stage = valueChainStages[activeStage];
              return (
                <div
                  className="rounded-2xl p-6 mb-4"
                  style={{
                    backgroundColor: colors.white,
                    border: `2px solid ${colors.accent}`,
                  }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888]">
                        {stage.actor}
                      </div>
                      <div
                        className="font-[Poppins,sans-serif] text-[20px] font-bold mt-1"
                        style={{ color: colors.primary }}
                      >
                        {stage.stage}
                      </div>
                    </div>
                    <div
                      className="rounded-xl text-right shrink-0 max-w-[140px] px-[14px] py-[10px]"
                      style={{
                        backgroundColor: colors.accentLight,
                        border: `1px solid ${colors.accent}`,
                      }}
                    >
                      <div
                        className="font-[Poppins,sans-serif] text-[16px] font-bold leading-[1.2]"
                        style={{ color: colors.primary }}
                      >
                        {stage.stat}
                      </div>
                    </div>
                  </div>
                  <div className="font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888] mb-3">
                    Opportunity Areas
                  </div>
                  <div className="flex flex-col gap-2">
                    {stage.painPoints.map((pp, j) => (
                      <div
                        key={j}
                        className="flex items-center gap-[10px] rounded-[10px] p-3"
                        style={{ backgroundColor: colors.background }}
                      >
                        <span
                          className="font-[Inter,sans-serif] text-[12px] font-semibold w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                          style={{ color: colors.primary, backgroundColor: colors.white }}
                        >
                          {j + 1}
                        </span>
                        <span className="font-[Inter,sans-serif] text-[13px] text-[#555]">{pp}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    className="flex items-center justify-between mt-4 pt-4"
                    style={{ borderTop: `1px solid ${colors.line}` }}
                  >
                    <span className="font-[Inter,sans-serif] text-[12px] text-[#888]">
                      Value retained at this stage
                    </span>
                    <span
                      className="font-[Poppins,sans-serif] text-[18px] font-bold"
                      style={{ color: stage.valueRetained > 50 ? colors.primary : "#C62828" }}
                    >
                      {stage.valueRetained}%
                    </span>
                  </div>
                </div>
              );
            })()}
          </div>
        ) : (
          /* Desktop: Select cards with detail panel below */
          <>
            <div className="flex items-center justify-center gap-2 flex-nowrap">
              {valueChainStages.map((stage, i) => (
                <React.Fragment key={stage.id}>
                  <SelectCard stage={stage} index={i} isActive={activeStage === i} onSelect={setActiveStage} />
                  {i < valueChainStages.length - 1 && <AnimatedFlowArrow isActive={isAnimating} delay={i * 200} />}
                </React.Fragment>
              ))}
            </div>

            {/* Detail Panel — inspired by Agriculture sector reference */}
            <div
              className="mt-8 rounded-[20px] overflow-hidden"
              style={{
                backgroundColor: colors.primary,
                boxShadow: "0 8px 40px rgba(27, 77, 62, 0.2)",
              }}
            >
              {/* Header bar */}
              <div
                className="flex items-center justify-between"
                style={{
                  padding: "20px 32px",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-center gap-[14px]">
                  <div
                    className="w-[42px] h-[42px] rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: "rgba(184,217,53,0.12)",
                      border: "1px solid rgba(184,217,53,0.2)",
                      color: colors.accent,
                    }}
                  >
                    {valueChainIcons[active.icon]}
                  </div>
                  <div>
                    <div className="font-[Inter,sans-serif] text-[18px] font-bold" style={{ color: colors.white }}>
                      {active.stage}
                    </div>
                    <div className="font-[Inter,sans-serif] text-[13px] text-white/45 mt-0.5">
                      {active.actor} · {active.population}
                    </div>
                  </div>
                </div>
                {/* Stage indicators */}
                <div className="flex items-center gap-1.5">
                  {valueChainStages.map((_, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveStage(i)}
                      className="w-7 h-7 rounded-full cursor-pointer flex items-center justify-center transition-all duration-[250ms]"
                      style={{
                        backgroundColor: i === activeStage ? colors.accent : "rgba(255,255,255,0.08)",
                        border: i === activeStage ? "none" : "1px solid rgba(255,255,255,0.12)",
                      }}
                    >
                      <span
                        className="font-[Inter,sans-serif] text-[11px] font-bold"
                        style={{ color: i === activeStage ? colors.primary : "rgba(255,255,255,0.5)" }}
                      >
                        {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Two-column content */}
              <div className="grid grid-cols-2 gap-8" style={{ padding: "24px 32px" }}>
                {/* Left: Opportunities 2x2 */}
                <div className="flex flex-col">
                  <div
                    className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[2px] mb-[14px]"
                    style={{ color: colors.accent }}
                  >
                    Bridge Opportunities
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {active.painPoints.map((point, i) => (
                      <div
                        key={i}
                        className="rounded-[10px] flex items-start gap-[10px]"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          padding: "14px 16px",
                        }}
                      >
                        <div
                          className="w-2 h-2 rounded-full shrink-0 mt-1"
                          style={{ backgroundColor: colors.accent }}
                        />
                        <span className="font-[Inter,sans-serif] text-[13px] text-white/80 leading-[1.45]">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Value leakage + retained */}
                  <div
                    className="mt-3 rounded-[10px] flex items-center justify-between"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      padding: "14px 18px",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="font-[Poppins,sans-serif] text-[22px] font-extrabold leading-none"
                        style={{ color: colors.accent }}
                      >
                        {active.valueLost > 0 ? `${active.valueLost}%` : "—"}
                      </span>
                      <div>
                        <div className="font-[Inter,sans-serif] text-[10px] font-semibold text-[#F59E0B] uppercase tracking-[1px]">
                          Value Leakage
                        </div>
                        <div className="font-[Inter,sans-serif] text-[11px] text-white/40 mt-px">
                          lost before next stage
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-px h-7 bg-white/10" />
                      <div className="text-right">
                        <div
                          className="font-[Inter,sans-serif] text-[10px] font-semibold uppercase tracking-[1px]"
                          style={{ color: colors.accent }}
                        >
                          Communities Retain
                        </div>
                        <div className="font-[Poppins,sans-serif] text-[14px] font-bold mt-px" style={{ color: colors.white }}>
                          ~20% of total value
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Key Insight marquee */}
                <div className="flex flex-col">
                  <div
                    className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[2px] mb-[14px]"
                    style={{ color: colors.accent }}
                  >
                    Key Insight
                  </div>
                  <div
                    className="rounded-[14px] flex-1 flex flex-col justify-center"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      padding: "18px 20px",
                    }}
                  >
                    <div
                      className="font-[Poppins,sans-serif] text-[24px] font-extrabold leading-[1.15] mb-[10px]"
                      style={{ color: colors.white }}
                    >
                      {active.stat}
                    </div>
                    <div
                      className="w-8 h-[3px] rounded-sm mb-[10px]"
                      style={{ backgroundColor: colors.accent }}
                    />
                    <div className="font-[Inter,sans-serif] text-[14px] text-white/65 leading-[1.6]">
                      {activeStage === 0 &&
                        "Average international tourist spend of $3,742 creates massive multiplier potential across the entire value chain — from accommodation and transport to cultural experiences and local commerce."}
                      {activeStage === 1 &&
                        "Cruise tourism alone brings substantial visitor volume with untapped ground transport revenue. Each ship represents a concentrated opportunity for coordinated shore excursion programming."}
                      {activeStage === 2 &&
                        "Over 6,700 accommodation enterprises represent a deeply fragmented market ready for quality elevation, standardization, and direct booking channel development."}
                      {activeStage === 3 &&
                        "Regional expansion readiness signals strong demand for experience diversification beyond the Accra–Cape Coast corridor into emerging heritage and eco-tourism destinations."}
                      {activeStage === 4 &&
                        "The vast majority of tourist spending leaks out of local communities — recapturing even a fraction represents the single highest-impact intervention across the entire sector."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

// ============================================================================
// SOLUTIONS SECTION
// ============================================================================

const SolutionsSection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [activeTier, setActiveTier] = useState(isMobile ? 1 : "all");
  const [solScrollIdx, setSolScrollIdx] = useState(0);
  const solScrollRef = React.useRef(null);
  const tiers = [
    { key: "all", label: "All" },
    { key: 1, label: "Flagship" },
    { key: 2, label: "Growth" },
    { key: 3, label: "Strategic" },
  ];
  const filtered = activeTier === "all" ? sector.solutions : sector.solutions.filter((s) => s.tier === activeTier);

  const handleSolScroll = () => {
    const el = solScrollRef.current;
    if (!el || filtered.length === 0) return;
    const cardW = el.scrollWidth / filtered.length;
    const idx = Math.round(el.scrollLeft / cardW);
    setSolScrollIdx(Math.min(idx, filtered.length - 1));
  };

  const scrollToSolCard = (idx) => {
    const el = solScrollRef.current;
    if (!el || filtered.length === 0) return;
    const cardW = el.scrollWidth / filtered.length;
    el.scrollTo({ left: cardW * idx, behavior: "smooth" });
    setSolScrollIdx(idx);
  };

  return (
    <section style={{ backgroundColor: colors.primary, padding: isMobile ? "60px 20px" : "80px 80px" }}>
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div style={{ marginBottom: isMobile ? "24px" : "40px" }}>
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-5 px-5 py-[10px]"
            style={{
              backgroundColor: "rgba(184,217,53,0.15)",
              color: colors.accent,
            }}
          >
            The Pathway to Impact
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light tracking-[-0.5px] leading-[1.2] mt-0 mb-4 max-w-[900px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.white,
            }}
          >
            Ventures That Build <span className="font-semibold" style={{ color: colors.accent }}>Lasting Value</span>
          </h2>
          <div
            className="gap-10"
            style={{
              display: isMobile ? "block" : "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <p
              className="font-[Inter,sans-serif] text-white/60 max-w-[580px] leading-[1.65]"
              style={{
                fontSize: isMobile ? "15px" : "16px",
                margin: isMobile ? "0 0 20px 0" : 0,
              }}
            >
              Each venture is a bridge from insight to investment to measurable public benefit — prioritized by impact,
              feasibility, and alignment with Ghana's unique diaspora tourism advantage.
            </p>
            <div className="inline-flex gap-1 shrink-0 justify-end ml-auto rounded-full p-1" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
              {tiers.map((t) => (
                <button
                  key={t.key}
                  onClick={() => {
                    setActiveTier(t.key);
                    setSolScrollIdx(0);
                  }}
                  className="border-none rounded-full text-[13px] font-[Inter,sans-serif] cursor-pointer transition-all duration-200 px-[18px] py-2"
                  style={{
                    backgroundColor: activeTier === t.key ? colors.accent : "transparent",
                    color: activeTier === t.key ? colors.primary : "rgba(255,255,255,0.6)",
                    fontWeight: activeTier === t.key ? "700" : "500",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          ref={solScrollRef}
          onScroll={handleSolScroll}
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
                  padding: "0 20px 8px",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }
              : {
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "24px",
                }
          }
        >
          {filtered.map((solution, i) => (
            <div
              key={i}
              className={cn(isMobile && "min-w-[80%] max-w-[80%] shrink-0 snap-start")}
            >
              <SolutionCard solution={solution} />
            </div>
          ))}
        </div>

        {isMobile && (
          <div className="flex justify-center gap-2 mt-4">
            {filtered.map((_, i) => (
              <div
                key={i}
                onClick={() => scrollToSolCard(i)}
                className="h-2 rounded cursor-pointer transition-all duration-300"
                style={{
                  width: i === solScrollIdx ? "24px" : "8px",
                  backgroundColor: i === solScrollIdx ? colors.accent : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const SolutionCard = ({ solution }) => {
  const tierLabels = { 1: "FLAGSHIP", 2: "GROWTH", 3: "STRATEGIC" };
  return (
    <div
      className="rounded-[20px] p-7 flex flex-col h-full"
      style={{
        backgroundColor: colors.white,
        border: `1px solid ${colors.line}`,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <span
          className="rounded-[20px] text-[11px] font-bold font-[Inter,sans-serif] px-3 py-1"
          style={{
            backgroundColor: colors.accentLight,
            color: colors.primary,
          }}
        >
          {tierLabels[solution.tier] || "VENTURE"}
        </span>
        <span className="font-[Poppins,sans-serif] text-[22px] font-bold" style={{ color: colors.primary }}>
          {solution.capital}
        </span>
      </div>
      <h3
        className="font-[Inter,sans-serif] text-[18px] font-semibold mt-0 mb-[10px] min-h-[44px]"
        style={{ color: colors.dark }}
      >
        {solution.name}
      </h3>
      <p className="font-[Inter,sans-serif] text-[14px] text-[#666] leading-[1.6] mt-0 mb-4 flex-1 min-h-[67px]">
        {solution.description}
      </p>
      <div className="flex items-center gap-2 pt-4" style={{ borderTop: `1px solid ${colors.line}` }}>
        <Check size={14} strokeWidth={2.5} color={colors.accent} />
        <span className="font-[Inter,sans-serif] text-[13px] text-[#888]">{solution.impact}</span>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="w-[60px] h-1 rounded-sm overflow-hidden" style={{ backgroundColor: colors.line }}>
          <div
            className="h-full rounded-sm"
            style={{
              width: `${(solution.score / 45) * 100}%`,
              backgroundColor: colors.accent,
            }}
          />
        </div>
        <span className="font-[Inter,sans-serif] text-[11px] text-[#bbb]">
          Score: {solution.score}/45
        </span>
      </div>
    </div>
  );
};

// ============================================================================
// COMPETITIVE LANDSCAPE SECTION
// ============================================================================

const CompetitiveLandscapeSection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [activeCompetitor, setActiveCompetitor] = useState(0);
  const [showMoreLandscape, setShowMoreLandscape] = useState(false);
  const comp = sector.competitors[activeCompetitor];

  // Stats per competitor for the 3-card display
  const competitorStats = [
    [
      { value: "7 Pillars", label: "PROGRAM" },
      { value: "National", label: "COVERAGE" },
      { value: "Gov't", label: "FUNDING" },
    ],
    [
      { value: "10-Year", label: "PROGRAM" },
      { value: "Global", label: "REACH" },
      { value: "Gov't", label: "FUNDING" },
    ],
    [
      { value: "$500K+", label: "RAISED" },
      { value: "Heritage", label: "FOCUS" },
      { value: "Private", label: "FUNDING" },
    ],
    [
      { value: "$2M+", label: "RAISED" },
      { value: "Fintech", label: "SECTOR" },
      { value: "Private", label: "FUNDING" },
    ],
    [
      { value: "Global", label: "PRESENCE" },
      { value: "Luxury", label: "SEGMENT" },
      { value: "Corporate", label: "FUNDING" },
    ],
    [
      { value: "$10M+", label: "DEPLOYED" },
      { value: "Kakum", label: "ANCHOR" },
      { value: "NGO", label: "FUNDING" },
    ],
  ];

  const stats = competitorStats[activeCompetitor] || competitorStats[0];

  return (
    <section style={{ backgroundColor: colors.background, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Header */}
        <div style={{ marginBottom: isMobile ? "24px" : "48px" }}>
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6 px-5 py-[10px]"
            style={{
              backgroundColor: colors.white,
              color: colors.primary,
              border: `1px solid ${colors.line}`,
            }}
          >
            The Landscape
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light tracking-[-0.5px] leading-[1.2] mt-0 mb-5"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
            }}
          >
            Building With Ghana's{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>Strongest Institutions</span>
          </h2>
          <p
            className="font-[Inter,sans-serif] leading-[1.65] text-[#666] max-w-[750px] m-0"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
          >
            BRIDGE works alongside Ghana's leading tourism organizations, government agencies, and private operators —
            each bringing strengths that multiply together.
          </p>
        </div>

        {/* Mobile: Horizontal scroll pills */}
        {isMobile && (
          <div
            className="hide-scrollbar flex gap-2 overflow-x-auto mb-4"
            style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {sector.competitors.map((c, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveCompetitor(i);
                  setShowMoreLandscape(false);
                }}
                className="rounded-full cursor-pointer font-[Inter,sans-serif] transition-all duration-200 whitespace-nowrap shrink-0 text-[11px] px-[14px] py-1.5"
                style={{
                  backgroundColor: activeCompetitor === i ? colors.accentLight : "transparent",
                  color: activeCompetitor === i ? colors.primary : "#999",
                  fontWeight: activeCompetitor === i ? "700" : "500",
                  border: activeCompetitor === i ? `1.5px solid ${colors.accent}` : `1.5px solid ${colors.line}`,
                }}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}

        {/* Two-Column Layout */}
        <div
          style={
            isMobile
              ? {}
              : {
                  display: "grid",
                  gridTemplateColumns: "300px 1fr",
                  gap: "32px",
                }
          }
        >
          {/* Desktop Sidebar */}
          {!isMobile && (
            <div className="flex flex-col gap-2 justify-stretch">
              {sector.competitors.map((c, i) => {
                const isActive = activeCompetitor === i;
                const priorityBg =
                  c.priority === "High"
                    ? "rgba(184,217,53,0.2)"
                    : c.priority === "Medium"
                      ? "rgba(184,217,53,0.12)"
                      : "rgba(0,0,0,0.04)";
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setActiveCompetitor(i);
                      setShowMoreLandscape(false);
                    }}
                    className="rounded-[14px] cursor-pointer transition-all duration-200 flex justify-between items-center flex-1 px-5 py-4"
                    style={{
                      backgroundColor: colors.white,
                      border: isActive ? `2px solid ${colors.primary}` : `1px solid ${colors.line}`,
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-[Inter,sans-serif] text-[15px] font-semibold" style={{ color: colors.dark }}>
                        {c.name}
                      </div>
                      <div className="font-[Inter,sans-serif] text-[13px] text-[#999] mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
                        {c.focus}
                      </div>
                    </div>
                    <span
                      className="rounded-full text-[11px] font-bold font-[Inter,sans-serif] shrink-0 ml-3 px-3 py-1"
                      style={{
                        backgroundColor: priorityBg,
                        color: colors.primary,
                      }}
                    >
                      {c.priority}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Detail Panel */}
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
            }}
          >
            {/* Header area */}
            <div style={{ padding: isMobile ? "24px 24px 0" : "40px 40px 0" }}>
              {/* Name + Collaborate */}
              <div className="flex items-start justify-between mb-2">
                <h3
                  className="font-[Inter,sans-serif] font-bold m-0 tracking-[-0.3px]"
                  style={{
                    fontSize: isMobile ? "22px" : "28px",
                    color: colors.primary,
                  }}
                >
                  {comp.name}
                </h3>
                <span
                  className="rounded-full text-[13px] font-bold font-[Inter,sans-serif] shrink-0 ml-4 px-[18px] py-2"
                  style={{
                    backgroundColor: colors.accentLight,
                    color: colors.primary,
                  }}
                >
                  Collaborate
                </span>
              </div>
              <p className="font-[Inter,sans-serif] text-[15px] text-[#888] mt-0 mb-6">
                Est. {comp.year} • Funding: {comp.funding}
              </p>

              {/* Stat Cards */}
              <div className="grid grid-cols-3 gap-3 mb-7">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="rounded-[14px] text-center"
                    style={{
                      backgroundColor: colors.background,
                      padding: isMobile ? "16px 12px" : "20px 16px",
                      border: `1px solid ${colors.line}`,
                    }}
                  >
                    <div
                      className="font-[Poppins,sans-serif] font-bold leading-[1.1] mb-1.5"
                      style={{
                        fontSize: isMobile ? "18px" : "24px",
                        color: colors.primary,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div className="font-[Inter,sans-serif] text-[10px] font-semibold text-[#999] uppercase tracking-[1px]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: Show more toggle */}
            {isMobile && !showMoreLandscape && (
              <div className="px-6 pb-6">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMoreLandscape(true);
                  }}
                  className="flex items-center justify-center gap-2 w-full p-[14px] bg-transparent rounded-xl font-[Inter,sans-serif] text-[14px] font-semibold cursor-pointer"
                  style={{
                    border: `1px solid ${colors.line}`,
                    color: colors.primary,
                  }}
                >
                  Show more details
                  <ChevronDown size={14} strokeWidth={2.5} color={colors.primary} />
                </button>
              </div>
            )}

            {/* Expanded Details */}
            {(!isMobile || showMoreLandscape) && (
              <div style={{ padding: isMobile ? "0 24px" : "0 40px" }}>
                {/* Two-column: Strengths + Where BRIDGE Helps */}
                <div
                  className="grid mb-7"
                  style={{
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: isMobile ? "24px" : "32px",
                  }}
                >
                  {/* Their Strengths */}
                  <div>
                    <div
                      className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1.5px] mb-4 pb-[10px]"
                      style={{ color: colors.primary, borderBottom: `1px solid ${colors.line}` }}
                    >
                      Their Strengths
                    </div>
                    <div className="flex flex-col gap-4">
                      {comp.strengths.map((s, i) => (
                        <div key={i}>
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="font-[Inter,sans-serif] text-[14px] font-medium" style={{ color: colors.dark }}>
                              {s.name}
                            </span>
                            <span className="font-[Inter,sans-serif] text-[13px] text-[#888] font-semibold">
                              {s.rating}/5
                            </span>
                          </div>
                          <div className="h-1.5 rounded-[3px] overflow-hidden" style={{ backgroundColor: colors.line }}>
                            <div
                              className="h-full rounded-[3px] transition-[width] duration-500"
                              style={{
                                width: `${(s.rating / 5) * 100}%`,
                                backgroundColor: colors.accent,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Where BRIDGE Helps */}
                  <div>
                    <div
                      className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1.5px] mb-4 pb-[10px]"
                      style={{ color: colors.primary, borderBottom: `1px solid ${colors.line}` }}
                    >
                      Where BRIDGE Helps
                    </div>
                    <div className="flex flex-col gap-[10px]">
                      {comp.gaps.map((g, i) => (
                        <div
                          key={i}
                          className="rounded-[10px] flex items-center gap-3 px-[18px] py-[14px]"
                          style={{ backgroundColor: colors.accentLight }}
                        >
                          <span className="text-[8px] shrink-0" style={{ color: colors.primary }}>●</span>
                          <span className="font-[Inter,sans-serif] text-[14px] font-medium" style={{ color: colors.primary }}>
                            {g}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Collaboration Opportunity Footer — always visible */}
            <div
              className="rounded-2xl"
              style={{
                backgroundColor: colors.primary,
                margin: isMobile ? "0 16px 16px" : "0 24px 24px",
                padding: isMobile ? "20px" : "24px 32px",
              }}
            >
              <div
                className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1.5px] mb-2"
                style={{ color: colors.accent }}
              >
                Collaboration Opportunity
              </div>
              <div
                className="font-[Inter,sans-serif] font-medium leading-[1.4] mb-4"
                style={{
                  fontSize: isMobile ? "16px" : "18px",
                  color: colors.white,
                }}
              >
                {comp.bridgeOpportunity}
              </div>
              <div className="flex gap-2 flex-wrap">
                {comp.gaps.map((g, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 rounded-full text-[12px] font-semibold font-[Inter,sans-serif] px-[14px] py-1.5"
                    style={{
                      backgroundColor: "rgba(184,217,53,0.15)",
                      color: colors.accent,
                    }}
                  >
                    <Check size={12} strokeWidth={2.5} color={colors.accent} />
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Mobile: Show less */}
            {isMobile && showMoreLandscape && (
              <div className="px-6 pb-6">
                <button
                  onClick={() => setShowMoreLandscape(false)}
                  className="flex items-center justify-center gap-2 w-full p-[14px] bg-transparent rounded-xl font-[Inter,sans-serif] text-[14px] font-semibold cursor-pointer"
                  style={{
                    border: `1px solid ${colors.line}`,
                    color: colors.primary,
                  }}
                >
                  Show less
                  <ChevronDown size={14} strokeWidth={2.5} color={colors.primary} style={{ transform: "rotate(180deg)" }} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// GOVERNANCE & POLICY SECTION (Horizontal Scrollable Cards)
// ============================================================================

const governanceCategories = [
  { id: "all", label: "All" },
  { id: "funding", label: "Direct Funding" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "partnerships", label: "Partnerships" },
];

const governancePolicies = [
  {
    policy: "Black Star Experience Program",
    body: "Office of the President / Ministry of Tourism",
    allocation: "7-Pillar National Initiative",
    category: "partnerships",
    relevance: ["heritage", "eco"],
    alignment:
      "Flagship cultural tourism platform positioning Ghana as the cultural heartbeat of Africa through seven integrated programming pillars spanning heritage and creative expression.",
    bridgeRole:
      "BRIDGE provides digital infrastructure, guide certification, and destination optimization that operationalizes each programming pillar at national scale.",
    bridgeVentures: ["GTM Platform Enhancement", "Heritage Interpretation Excellence", "Regional Training Centers"],
    pillars: ["Cinema", "Audio", "Cuisine", "Aesthetics", "Style", "Literature", "Culture"],
  },
  {
    policy: "Beyond the Return 2020-2030",
    body: "Diaspora Affairs Office",
    allocation: "10-Year Strategic Program",
    category: "partnerships",
    relevance: ["heritage", "business"],
    alignment:
      "Diaspora engagement initiative sustaining Year of Return momentum through curated cultural experiences, investment pathways, and citizenship programs.",
    bridgeRole:
      "BRIDGE operates the diaspora tourism programming arm — December in GH experiences, heritage tour packaging, and diaspora investment pathway connections.",
    bridgeVentures: ["Diaspora Heritage Tour Operator", "GTM Platform Enhancement", "Heritage Boutique Hotel Network"],
  },
  {
    policy: "GTA Licensing & Standards",
    body: "Ghana Tourism Authority",
    allocation: "Regulatory Framework",
    category: "partnerships",
    relevance: ["heritage", "eco", "business"],
    alignment:
      "National licensing, standards enforcement, destination marketing, and industry development oversight spanning 6,700+ registered hospitality enterprises.",
    bridgeRole:
      "BRIDGE certification program creates the independent quality layer that GTA licensing framework requires but cannot operationally deliver at scale.",
    bridgeVentures: [
      "Hospitality Excellence Certification",
      "Regional Training Centers",
      "Tourism Business Intelligence",
    ],
  },
  {
    policy: "Osu Castle Redevelopment",
    body: "Ministry of Tourism, Arts & Culture",
    allocation: "22-Acre Heritage Precinct",
    category: "infrastructure",
    relevance: ["heritage"],
    alignment:
      "Transformation of historic Osu Castle into a premier tourism and heritage precinct anchoring Accra's cultural corridor, visitor economy, and diaspora engagement infrastructure.",
    bridgeRole:
      "BRIDGE heritage hotel network and interpretation excellence programs create demand-side activation and programming for the redeveloped precinct.",
    bridgeVentures: ["Heritage Interpretation Excellence", "Heritage Boutique Hotel Network", "Eco-Lodge Development"],
  },
  {
    policy: "Accra Marine Drive Project",
    body: "Ministry of Works & Housing",
    allocation: "241-Acre Coastal Development",
    category: "infrastructure",
    relevance: ["business"],
    alignment:
      "Revival of major coastal redevelopment for tourism, leisure, MICE conference facilities, waterfront dining, and integrated destination experience venues.",
    bridgeRole:
      "BRIDGE MICE conference facility venture directly complements the Marine Drive vision with business tourism infrastructure and event programming capacity.",
    bridgeVentures: ["MICE Conference Facility", "Tourism Business Intelligence", "GTM Platform Enhancement"],
  },
  {
    policy: "National Theatre & Cultural Venues",
    body: "Ministry of Tourism, Arts & Culture",
    allocation: "Cultural Infrastructure Program",
    category: "infrastructure",
    relevance: ["heritage", "eco"],
    alignment:
      "Rehabilitation and programming of the National Theatre and regional cultural venues as anchor destinations for performing arts tourism and festival circuits.",
    bridgeRole:
      "BRIDGE festival tourism circuits and creative industry partnerships activate rehabilitated venues with revenue-generating cultural programming year-round.",
    bridgeVentures: ["Festival Tourism Circuits", "Heritage Interpretation Excellence", "Regional Training Centers"],
  },
  {
    policy: "GTDC Digital Innovation Hub",
    body: "GTDC under Prof. Mensah",
    allocation: "Government Digital Platform",
    category: "funding",
    relevance: ["heritage", "eco", "business"],
    alignment:
      "Government-funded digital platforms including GTM marketplace, GTiP portal, and Accra By Night activation driving tourism technology and innovation forward.",
    bridgeRole:
      "BRIDGE enhances the GTM platform with direct booking engines, quality data layers, and business intelligence tools that multiply GTDC's overall digital reach and impact.",
    bridgeVentures: [
      "GTM Platform Enhancement",
      "Tourism Business Intelligence",
      "Hospitality Excellence Certification",
    ],
  },
  {
    policy: "Tourism Sector Budget 2026",
    body: "Ministry of Finance",
    allocation: "GH₵ 850M Allocation",
    category: "funding",
    relevance: ["heritage", "eco"],
    alignment:
      "Direct government funding allocation for tourism marketing campaigns, heritage site development, and institutional capacity building across all regions.",
    bridgeRole:
      "BRIDGE ventures leverage public investment by deploying private capital to multiply impact of government-funded site improvements and marketing initiatives.",
    bridgeVentures: ["Regional Training Centers", "Heritage Interpretation Excellence", "Eco-Lodge Development"],
  },
  {
    policy: "Tourism Investment Incentives",
    body: "Ghana Investment Promotion Centre",
    allocation: "Tax & Regulatory Framework",
    category: "funding",
    relevance: ["business", "eco"],
    alignment:
      "GIPC incentive packages including tax holidays, import duty waivers, and expedited permitting designed to attract private capital into tourism infrastructure.",
    bridgeRole:
      "BRIDGE structures each venture to maximize GIPC incentive eligibility, reducing investor risk and accelerating capital deployment across the tourism portfolio.",
    bridgeVentures: ["Heritage Boutique Hotel Network", "Eco-Lodge Development", "MICE Conference Facility"],
  },
];

const catBadge = {
  funding: { bg: "rgba(184,217,53,0.15)", border: "rgba(184,217,53,0.3)" },
  tax: { bg: "rgba(27,77,62,0.07)", border: "rgba(27,77,62,0.15)" },
  infrastructure: { bg: "rgba(184,217,53,0.1)", border: "rgba(184,217,53,0.25)" },
  partnerships: { bg: "rgba(27,77,62,0.05)", border: "rgba(27,77,62,0.12)" },
};

const PolicyAlignmentSection = () => {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);
  const [showAllPolicies, setShowAllPolicies] = useState(false);
  const [mobileCardIndex, setMobileCardIndex] = useState(0);
  const [desktopScrollIdx, setDesktopScrollIdx] = useState(0);
  const policyScrollRef = React.useRef(null);

  const filtered =
    activeCategory === "all" ? governancePolicies : governancePolicies.filter((p) => p.category === activeCategory);
  const displayed = filtered;

  return (
    <section style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center" style={{ marginBottom: isMobile ? "24px" : "40px" }}>
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6 px-5 py-[10px]"
            style={{
              backgroundColor: colors.white,
              color: colors.primary,
              border: `1px solid ${colors.line}`,
            }}
          >
            The Governance & Policy
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light tracking-[-0.5px] leading-[1.2] mx-auto max-w-[900px] mb-5 mt-0"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
            }}
          >
            Moving in Step with Ghana's{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>Tourism Strategy</span>
          </h2>
          <p
            className="font-[Inter,sans-serif] text-[#666] max-w-[750px] leading-[1.65] mx-auto mb-8 mt-0"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
          >
            BRIDGE ventures align directly with the Mahama administration's Black Star Experience, Beyond the Return,
            and tourism infrastructure commitments — creating pathways for public-private collaboration.
          </p>

          <div className="flex justify-center">
            <div
              className="inline-flex items-center rounded-full"
              style={{
                gap: isMobile ? "6px" : "12px",
                border: `1px solid ${colors.line}`,
                padding: isMobile ? "4px" : "5px",
                backgroundColor: colors.white,
                ...(isMobile ? { overflowX: "auto", WebkitOverflowScrolling: "touch", maxWidth: "100%" } : {}),
              }}
            >
              {governanceCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setExpandedCard(null);
                    setShowAllPolicies(false);
                    setMobileCardIndex(0);
                  }}
                  className="rounded-full cursor-pointer font-[Inter,sans-serif] transition-all duration-200 whitespace-nowrap shrink-0"
                  style={{
                    padding: isMobile ? "5px 8px" : "6px 14px",
                    fontSize: isMobile ? "10px" : "12px",
                    backgroundColor: activeCategory === cat.id ? colors.accentLight : "transparent",
                    color: activeCategory === cat.id ? colors.primary : "#999",
                    fontWeight: activeCategory === cat.id ? "700" : "500",
                    border: activeCategory === cat.id ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cards */}
        {isMobile ? (
          /* Mobile: One card at a time */
          <div className="mb-6">
            {displayed.length > 0 &&
              (() => {
                const safeIdx = Math.min(mobileCardIndex, displayed.length - 1);
                const p = displayed[safeIdx];
                const isExpanded = expandedCard === safeIdx;
                const badge = catBadge[p.category] || catBadge.partnerships;
                return (
                  <div>
                    <div
                      onClick={() => setExpandedCard(isExpanded ? null : safeIdx)}
                      className="w-full rounded-2xl p-5 cursor-pointer transition-all duration-300 flex flex-col"
                      style={{
                        backgroundColor: colors.background,
                        border: isExpanded ? `2px solid ${colors.accent}` : `2px solid ${colors.primary}`,
                      }}
                    >
                      {/* Top row */}
                      <div className="flex justify-between items-center mb-3">
                        <span
                          className="rounded-full text-[9px] font-bold uppercase font-['DM_Sans',sans-serif] px-[10px] py-1"
                          style={{
                            backgroundColor: badge.bg,
                            border: `1px solid ${badge.border}`,
                            color: colors.primary,
                          }}
                        >
                          {p.category}
                        </span>
                        {p.relevance && (
                          <div className="flex gap-1">
                            {p.relevance.map((r) => (
                              <span
                                key={r}
                                className="text-[9px] font-semibold rounded-full uppercase font-['DM_Sans',sans-serif] px-2 py-0.5"
                                style={{ color: colors.primary, backgroundColor: colors.white }}
                              >
                                {r}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="font-['DM_Sans',sans-serif] text-[16px] font-bold mb-2" style={{ color: colors.primary }}>
                        {p.policy}
                      </div>
                      <div className="font-['DM_Sans',sans-serif] text-[13px] font-bold mb-[10px]" style={{ color: colors.accent }}>
                        {p.allocation}
                      </div>
                      <div className="font-['DM_Sans',sans-serif] text-[13px] text-[#666] leading-[1.5] mb-3">
                        {p.alignment}
                      </div>
                      <div className="flex items-center gap-1.5 mt-auto">
                        <span
                          className="font-['DM_Sans',sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px]"
                          style={{ color: colors.primary }}
                        >
                          {isExpanded ? "BRIDGE alignment ▾" : "BRIDGE alignment ▸"}
                        </span>
                      </div>
                      {isExpanded && (
                        <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${colors.line}` }}>
                          <div className="font-['DM_Sans',sans-serif] text-[11px] text-[#888] mb-2">
                            {p.body}
                          </div>
                          <div className="font-['DM_Sans',sans-serif] text-[13px] text-[#444] leading-[1.6] mb-4">
                            {p.bridgeRole}
                          </div>
                          {p.pillars && (
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {p.pillars.map((pill) => (
                                <span
                                  key={pill}
                                  className="rounded-full text-[11px] font-bold font-['DM_Sans',sans-serif] px-3 py-[5px]"
                                  style={{
                                    backgroundColor: colors.accentLight,
                                    color: colors.primary,
                                    border: `1px solid ${colors.accent}`,
                                  }}
                                >
                                  {pill}
                                </span>
                              ))}
                            </div>
                          )}
                          <div className="flex flex-col gap-2">
                            {p.bridgeVentures.map((v) => (
                              <div
                                key={v}
                                className="rounded-[10px] flex items-center gap-[10px] px-[14px] py-[10px]"
                                style={{ backgroundColor: colors.primary }}
                              >
                                <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: colors.accent }} />
                                <span className="font-['DM_Sans',sans-serif] text-[13px] font-semibold" style={{ color: colors.white }}>
                                  {v}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Scroll indicator dots */}
                    <div className="flex justify-center gap-2 mt-4">
                      {displayed.map((_, di) => (
                        <div
                          key={di}
                          onClick={() => {
                            setMobileCardIndex(di);
                            setExpandedCard(null);
                          }}
                          className="h-2 rounded cursor-pointer transition-all duration-300"
                          style={{
                            width: di === safeIdx ? "24px" : "8px",
                            backgroundColor: di === safeIdx ? colors.accent : colors.line,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })()}
          </div>
        ) : (
          /* Desktop: Horizontal scroll */
          <div>
            <div
              ref={policyScrollRef}
              onScroll={() => {
                const el = policyScrollRef.current;
                if (!el || displayed.length === 0) return;
                const cardW = el.scrollWidth / displayed.length;
                setDesktopScrollIdx(Math.min(Math.round(el.scrollLeft / cardW), displayed.length - 1));
              }}
              className="policy-scroll flex gap-4 overflow-x-auto pb-1 mb-4 items-start"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <style>{`.policy-scroll::-webkit-scrollbar{display:none}`}</style>
              {displayed.map((p, i) => {
                const isExpanded = expandedCard === i;
                const badge = catBadge[p.category] || catBadge.partnerships;
                return (
                  <div
                    key={i}
                    onClick={() => setExpandedCard(isExpanded ? null : i)}
                    className="shrink-0 rounded-2xl p-6 cursor-pointer transition-all duration-300 flex flex-col"
                    style={{
                      minWidth: isExpanded ? "360px" : "280px",
                      maxWidth: isExpanded ? "360px" : "280px",
                      backgroundColor: colors.background,
                      border: isExpanded ? `2px solid ${colors.accent}` : `2px solid ${colors.primary}`,
                    }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span
                        className="rounded-full text-[9px] font-bold uppercase font-['DM_Sans',sans-serif] px-[10px] py-1"
                        style={{
                          backgroundColor: badge.bg,
                          border: `1px solid ${badge.border}`,
                          color: colors.primary,
                        }}
                      >
                        {p.category}
                      </span>
                      {p.relevance && (
                        <div className="flex gap-1">
                          {p.relevance.map((r) => (
                            <span
                              key={r}
                              className="text-[9px] font-semibold rounded-full uppercase font-['DM_Sans',sans-serif] px-2 py-0.5"
                              style={{ color: colors.primary, backgroundColor: colors.white }}
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="font-['DM_Sans',sans-serif] text-[16px] font-bold min-h-[42px] mb-2" style={{ color: colors.primary }}>
                      {p.policy}
                    </div>
                    <div className="font-['DM_Sans',sans-serif] text-[13px] font-bold mb-[10px]" style={{ color: colors.accent }}>
                      {p.allocation}
                    </div>
                    <div className="font-['DM_Sans',sans-serif] text-[13px] text-[#666] leading-[1.5] min-h-[40px] mb-3">
                      {p.alignment}
                    </div>
                    <div className="flex items-center gap-1.5 mt-auto">
                      <span
                        className="font-['DM_Sans',sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px]"
                        style={{ color: colors.primary }}
                      >
                        {isExpanded ? "BRIDGE alignment ▾" : "BRIDGE alignment ▸"}
                      </span>
                    </div>
                    {isExpanded && (
                      <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${colors.line}` }}>
                        <div className="font-['DM_Sans',sans-serif] text-[11px] text-[#888] mb-2">
                          {p.body}
                        </div>
                        <div className="font-['DM_Sans',sans-serif] text-[13px] text-[#444] leading-[1.6] mb-4">
                          {p.bridgeRole}
                        </div>
                        {p.pillars && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {p.pillars.map((pill) => (
                              <span
                                key={pill}
                                className="rounded-full text-[11px] font-bold font-['DM_Sans',sans-serif] px-3 py-[5px]"
                                style={{
                                  backgroundColor: colors.accentLight,
                                  color: colors.primary,
                                  border: `1px solid ${colors.accent}`,
                                }}
                              >
                                {pill}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="flex flex-col gap-2">
                          {p.bridgeVentures.map((v) => (
                            <div
                              key={v}
                              className="rounded-[10px] flex items-center gap-[10px] px-[14px] py-[10px]"
                              style={{ backgroundColor: colors.primary }}
                            >
                              <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: colors.accent }} />
                              <span
                                className="font-['DM_Sans',sans-serif] text-[13px] font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
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
                );
              })}
            </div>
            {/* Scroll indicator dots */}
            <div className="flex justify-center gap-2 mb-8">
              {displayed.map((_, di) => (
                <div
                  key={di}
                  onClick={() => {
                    const el = policyScrollRef.current;
                    if (!el || displayed.length === 0) return;
                    const cardW = el.scrollWidth / displayed.length;
                    el.scrollTo({ left: cardW * di, behavior: "smooth" });
                    setDesktopScrollIdx(di);
                  }}
                  className="h-2 rounded cursor-pointer transition-all duration-300"
                  style={{
                    width: di === desktopScrollIdx ? "24px" : "8px",
                    backgroundColor: di === desktopScrollIdx ? colors.accent : colors.line,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Bar */}
        <div
          className="flex justify-between gap-4 text-left"
          style={{
            backgroundColor: colors.primary,
            borderRadius: isMobile ? "12px" : "16px",
            padding: isMobile ? "20px" : "28px 32px",
            alignItems: isMobile ? "flex-start" : "center",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <div>
            <div
              className="font-['DM_Sans',sans-serif] font-semibold mb-1"
              style={{
                fontSize: isMobile ? "16px" : "18px",
                color: colors.white,
              }}
            >
              BRIDGE complements — never competes with — government vision.
            </div>
            <div className="font-['DM_Sans',sans-serif] text-[14px] text-white/60">
              Every venture aligns with at least one active government policy or initiative.
            </div>
          </div>
          <button
            className="border-none rounded-full text-[13px] font-bold font-['DM_Sans',sans-serif] cursor-pointer shrink-0 px-6 py-3"
            style={{
              backgroundColor: colors.accent,
              color: colors.primary,
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
// IMPACT SECTION (Dual-Lens Dashboard)
// ============================================================================

const impactMetrics = [
  {
    category: "Economic",
    items: [
      {
        label: "Tourism Revenue",
        value: 4.8,
        suffix: "B",
        prefix: "$",
        description: "Historic 2024 sector revenue with 27% year-over-year growth trajectory",
        trend: "+27% YoY",
        ventures: "All Ventures",
      },
      {
        label: "Visitor Spending",
        value: 3742,
        suffix: "",
        prefix: "$",
        description: "Average international trip spend capturable through improved services",
        trend: "Capture gap",
        ventures: "GTM Platform · Heritage Tours",
      },
      {
        label: "Heritage Economy",
        value: 1.2,
        suffix: "B",
        prefix: "$",
        description: "Cultural and heritage tourism subsector addressable by BRIDGE ventures",
        trend: "Growing",
        ventures: "Heritage Interp. · Festivals",
      },
      {
        label: "Dev. Leverage",
        value: 3,
        suffix: "-5x",
        prefix: "",
        description: "Every dollar deployed generates local economic multiplier effects",
        trend: "Multiplier",
        ventures: "All Ventures",
      },
    ],
  },
  {
    category: "People",
    items: [
      {
        label: "Hospitality Workers",
        value: 370,
        suffix: "K+",
        prefix: "",
        description: "Workers across 6,700+ enterprises eligible for skills elevation",
        trend: "High priority",
        ventures: "Training · Certification",
      },
      {
        label: "Jobs Created",
        value: 2500,
        suffix: "+",
        prefix: "",
        description: "Direct and indirect employment across 15 portfolio ventures",
        trend: "Target",
        ventures: "All Ventures",
      },
      {
        label: "Youth Beneficiaries",
        value: 5000,
        suffix: "+",
        prefix: "",
        description: "Young Ghanaians accessing hospitality careers through training programs",
        trend: "Near-term",
        ventures: "Regional Training · Accelerator",
      },
      {
        label: "Community Members",
        value: 50,
        suffix: "K+",
        prefix: "",
        description: "Host community residents benefiting from tourism revenue sharing",
        trend: "Growing",
        ventures: "Eco-Lodge · Heritage Tours",
      },
    ],
  },
  {
    category: "Returns",
    items: [
      {
        label: "Portfolio IRR",
        value: 15,
        suffix: "-25%",
        prefix: "",
        description: "Blended returns across 15 ventures with risk-adjusted modeling",
        trend: "Target range",
        ventures: "All Ventures",
      },
      {
        label: "Tier 1 Returns",
        value: 18,
        suffix: "-25%",
        prefix: "",
        description: "Priority ventures with proven demand and rapid revenue generation",
        trend: "High priority",
        ventures: "GTM Platform · Heritage Exc.",
      },
      {
        label: "First Revenue",
        value: 12,
        suffix: "-18mo",
        prefix: "",
        description: "Timeline to cash generation for flagship digital and tour ventures",
        trend: "Near-term",
        ventures: "GTM Platform · Diaspora Tours",
      },
      {
        label: "Capital Deployed",
        value: 10,
        suffix: "-18M",
        prefix: "$",
        description: "Total investment range across three tiers of tourism ventures",
        trend: "Phased",
        ventures: "All Ventures",
      },
    ],
  },
];

const impactStakeholders = [
  {
    title: "The Operator",
    subtitle: "Operators, guides & hospitality SMEs",
    outcomes: [
      "Quality certification that builds trust and drives repeat bookings",
      "Digital visibility on GTM platform reaching 1.29M international visitors",
      "Skills training and management development for career advancement",
      "Access to supply chains and tour packaging partnerships",
    ],
    stat: "6,700+",
    statLabel: "enterprises to elevate",
    highlight: "First independent quality standard for Ghana hospitality",
  },
  {
    title: "The Institution",
    subtitle: "Tourism boards, associations & cooperatives",
    outcomes: [
      "Data-driven tourism intelligence for policy and investment decisions",
      "Standardized training curricula deployed through regional centers",
      "Heritage site interpretation frameworks that attract global visitors",
      "Festival and event tourism packaging generating new revenue streams",
    ],
    stat: "7",
    statLabel: "pillar alignment",
    highlight: "Operational arm for Black Star Experience delivery",
  },
  {
    title: "The Government",
    subtitle: "Ministries, GTA & district assemblies",
    outcomes: [
      "Private capital delivery of tourism infrastructure without fiscal strain",
      "Job creation and tax base expansion across tourism corridors",
      "Quality data enabling evidence-based tourism policy development",
      "Regional equity through distributed tourism development approach",
    ],
    stat: "5.7%",
    statLabel: "GDP contribution target",
    highlight: "Zero fiscal burden, maximum policy alignment",
  },
  {
    title: "The Investor",
    subtitle: "Impact & institutional capital partners",
    outcomes: [
      "Asset-backed returns through hotel, lodge, and platform investments",
      "Measurable impact reporting aligned with global ESG frameworks",
      "First-mover advantage in Ghana's highest-growth economic sector",
      "Diaspora tourism as uniquely de-risked demand signal",
    ],
    stat: "15-25%",
    statLabel: "target IRR range",
    highlight: "1.29M arrivals as built-in demand validation",
  },
];

const MetricRow = ({ item, index, animate, isMobile }) => {
  const raw = useCounter(item.value, 1200, animate);
  const formatted = (() => {
    const v = item.value;
    if (v >= 1000) return item.prefix + Math.round(raw).toLocaleString() + item.suffix;
    if (v % 1 !== 0) return item.prefix + raw.toFixed(1) + item.suffix;
    return item.prefix + Math.round(raw) + item.suffix;
  })();
  const isEven = index % 2 === 0;
  return (
    <div
      style={{
        display: isMobile ? "flex" : "grid",
        ...(isMobile
          ? { flexDirection: "column", gap: "12px" }
          : { gridTemplateColumns: "200px 1fr 200px", gap: "32px" }),
        padding: isMobile ? "20px 16px" : "24px 28px",
        backgroundColor: isEven ? colors.white : "transparent",
        alignItems: isMobile ? "stretch" : "center",
        opacity: animate ? 1 : 0,
        transition: `opacity 0.4s ease ${index * 80}ms`,
      }}
    >
      <div className={cn(isMobile && "flex justify-between items-baseline")}>
        <div
          className="font-[Poppins,sans-serif] font-bold tracking-[-1px] leading-[1.1]"
          style={{
            fontSize: isMobile ? "28px" : "36px",
            color: colors.primary,
          }}
        >
          {formatted}
        </div>
        <div
          className="text-[10px] font-bold uppercase tracking-[0.5px] font-['DM_Sans',sans-serif]"
          style={{
            color: colors.accent,
            marginTop: isMobile ? "0" : "4px",
          }}
        >
          {item.trend}
        </div>
      </div>
      <div>
        <div
          className="font-['DM_Sans',sans-serif] font-bold"
          style={{
            fontSize: isMobile ? "14px" : "15px",
            color: colors.primary,
          }}
        >
          {item.label}
        </div>
        <div className="font-['DM_Sans',sans-serif] text-[13px] text-[#666] leading-[1.5]">
          {item.description}
        </div>
      </div>
      {!isMobile && (
        <div
          className="rounded-[10px] px-4 py-[10px]"
          style={{ backgroundColor: isEven ? colors.background : "rgba(27,77,62,0.04)" }}
        >
          <div className="text-[9px] font-bold text-[#aaa] uppercase tracking-[1px] font-['DM_Sans',sans-serif] mb-1">
            LINKED VENTURES
          </div>
          <div
            className="text-[11px] font-medium font-['DM_Sans',sans-serif] whitespace-nowrap overflow-hidden text-ellipsis"
            style={{ color: colors.primary }}
          >
            {item.ventures}
          </div>
        </div>
      )}
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

  return (
    <section style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "80px 32px" }}>
      <div className="max-w-[1100px] mx-auto">
        <span
          className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6 px-5 py-[10px]"
          style={{
            backgroundColor: colors.white,
            color: colors.primary,
            border: `1px solid ${colors.line}`,
          }}
        >
          The Impact
        </span>
        <h2
          className="font-[Inter,sans-serif] font-light tracking-[-0.5px] leading-[1.2] mt-0 mb-3"
          style={{
            fontSize: isMobile ? "28px" : "42px",
            color: colors.primary,
          }}
        >
          What Changes When <span className="font-semibold">Tourism</span>
          {!isMobile && <br />}
          {isMobile ? " " : ""}
          <span className="font-semibold">Infrastructure</span>{" "}
          <span className="font-semibold" style={{ color: colors.accent }}>Works</span>
        </h2>
        <p
          className="font-[Inter,sans-serif] text-[#666] leading-[1.65] max-w-[700px] mt-0 mb-10"
          style={{ fontSize: isMobile ? "15px" : "16px" }}
        >
          When destinations meet global standards, local communities share in visitor spending, and cultural heritage
          generates revenue — the ripple effects create sustainable jobs, preserve identity, and diversify Ghana's
          economy.
        </p>

        {/* Controls Bar */}
        <div className="flex justify-start mb-6">
          <div
            className="inline-flex items-center rounded-full"
            style={{
              gap: isMobile ? "6px" : "12px",
              border: `1px solid ${colors.line}`,
              padding: isMobile ? "4px" : "5px",
              backgroundColor: colors.white,
            }}
          >
            {/* View Toggle */}
            <div
              className="inline-flex rounded-full overflow-hidden shrink-0"
              style={{
                backgroundColor: colors.background,
                padding: isMobile ? "2px" : "3px",
              }}
            >
              {["metrics", "stakeholder"].map((v) => (
                <button
                  key={v}
                  onClick={() => {
                    setView(v);
                    triggerAnimate();
                  }}
                  className="rounded-full border-none cursor-pointer font-[Inter,sans-serif] transition-all duration-200"
                  style={{
                    padding: isMobile ? "5px 10px" : "6px 14px",
                    fontSize: isMobile ? "11px" : "12px",
                    backgroundColor: view === v ? colors.white : "transparent",
                    color: view === v ? colors.primary : "#999",
                    fontWeight: view === v ? "700" : "500",
                    boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  }}
                >
                  {v === "metrics" ? (isMobile ? "Metric" : "By Metric") : isMobile ? "Stakeholder" : "By Stakeholder"}
                </button>
              ))}
            </div>

            {/* Vertical Divider */}
            <div className="w-px h-5 shrink-0" style={{ backgroundColor: colors.line }} />

            {/* Sub-filter Pills */}
            {view === "metrics"
              ? impactMetrics.map((cat, i) => (
                  <button
                    key={cat.category}
                    onClick={() => {
                      setActiveCategory(i);
                      triggerAnimate();
                    }}
                    className="rounded-full cursor-pointer font-[Inter,sans-serif] transition-all duration-200 whitespace-nowrap shrink-0"
                    style={{
                      padding: isMobile ? "5px 8px" : "6px 14px",
                      fontSize: isMobile ? "10px" : "12px",
                      backgroundColor: activeCategory === i ? colors.accentLight : "transparent",
                      color: activeCategory === i ? colors.primary : "#999",
                      fontWeight: activeCategory === i ? "700" : "500",
                      border: activeCategory === i ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                    }}
                  >
                    {cat.category}
                  </button>
                ))
              : impactStakeholders.map((s, i) => (
                  <button
                    key={s.title}
                    onClick={() => setActiveStakeholder(i)}
                    className="rounded-full cursor-pointer font-[Inter,sans-serif] transition-all duration-200 whitespace-nowrap shrink-0"
                    style={{
                      padding: isMobile ? "5px 8px" : "6px 14px",
                      fontSize: isMobile ? "10px" : "12px",
                      backgroundColor: activeStakeholder === i ? colors.accentLight : "transparent",
                      color: activeStakeholder === i ? colors.primary : "#999",
                      fontWeight: activeStakeholder === i ? "700" : "500",
                      border: activeStakeholder === i ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                    }}
                  >
                    {s.title.split(" ")[1]}
                  </button>
                ))}
          </div>
        </div>

        {/* Metrics View */}
        {view === "metrics" && (
          <div
            className="overflow-hidden"
            style={{
              backgroundColor: colors.background,
              borderRadius: isMobile ? "16px" : "20px",
              border: `2px solid ${colors.primary}`,
            }}
          >
            {impactMetrics[activeCategory].items.map((item, i) => (
              <MetricRow key={i} item={item} index={i} animate={animate} isMobile={isMobile} />
            ))}
          </div>
        )}

        {/* Stakeholder View */}
        {view === "stakeholder" &&
          (() => {
            const s = impactStakeholders[activeStakeholder];
            return (
              <div>
                <div
                  className="flex justify-between mb-6"
                  style={{
                    alignItems: isMobile ? "center" : "flex-start",
                    flexDirection: isMobile ? "column" : "row",
                    gap: isMobile ? "12px" : "0",
                  }}
                >
                  <div>
                    <div
                      className="font-['DM_Sans',sans-serif] font-bold"
                      style={{
                        fontSize: isMobile ? "24px" : "28px",
                        color: colors.primary,
                      }}
                    >
                      {s.title}
                    </div>
                    <div className="font-['DM_Sans',sans-serif] text-[14px] text-[#888]">
                      {s.subtitle}
                    </div>
                  </div>
                  <div style={{ textAlign: isMobile ? "center" : "right" }}>
                    <div
                      className="font-[Poppins,sans-serif] font-bold tracking-[-1.5px] leading-none"
                      style={{
                        fontSize: isMobile ? "32px" : "40px",
                        color: colors.primary,
                      }}
                    >
                      {s.stat}
                    </div>
                    <div className="font-['DM_Sans',sans-serif] text-[12px] text-[#888] mt-1">
                      {s.statLabel}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  {s.outcomes.map((outcome, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 rounded-xl px-5 py-[14px]"
                      style={{ backgroundColor: i % 2 === 0 ? colors.background : "transparent" }}
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: i % 2 === 0 ? colors.white : colors.background }}
                      >
                        <span className="font-['DM_Sans',sans-serif] text-[12px] font-bold" style={{ color: colors.primary }}>
                          {i + 1}
                        </span>
                      </div>
                      <span className="font-['DM_Sans',sans-serif] text-[15px] text-[#333] leading-[1.5]">
                        {outcome}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  className="mt-6 rounded-xl flex items-center px-6 py-4"
                  style={{ backgroundColor: colors.primary }}
                >
                  <span
                    className="text-[10px] font-bold uppercase tracking-[1.5px] font-['DM_Sans',sans-serif]"
                    style={{ color: colors.accent }}
                  >
                    KEY ADVANTAGE
                  </span>
                  <span className="font-['DM_Sans',sans-serif] text-[14px] text-white/85 font-medium ml-4">
                    {s.highlight}
                  </span>
                </div>
              </div>
            );
          })()}
      </div>
    </section>
  );
};

// ============================================================================
// RIPPLE EFFECT (CROSS-SECTOR) SECTION
// ============================================================================

const rippleSectorData = [
  {
    sectorId: 7,
    name: "Creative Industries",
    connection: "Cultural programming, festival tourism, heritage interpretation, arts/crafts market linkages",
    multiplier: "3.8x",
    synergies: [
      "Festival tourism circuits packaged as bookable experiences",
      "Artisan market linkages connecting craftspeople to visitor retail",
      "Heritage interpretation programs at cultural sites",
    ],
    bridgeVentures: ["Festival Tourism Circuits", "Heritage Interpretation Excellence"],
    impact:
      "Cultural programming transforms heritage sites into revenue-generating destinations that sustain both tourism and creative livelihoods",
  },
  {
    sectorId: 1,
    name: "Infrastructure",
    connection: "Road access to tourism sites, water/sanitation, energy reliability, digital connectivity",
    multiplier: "4.2x",
    synergies: [
      "Tourism corridor road improvements to priority sites",
      "Solar energy installations reducing hotel operating costs",
      "Digital connectivity enabling booking systems at remote sites",
    ],
    bridgeVentures: ["Eco-Lodge Development", "GTM Platform Enhancement"],
    impact:
      "Physical infrastructure unlocks access to destinations that currently receive minimal international visitors despite high potential",
  },
  {
    sectorId: 5,
    name: "Education & Skills",
    connection: "Hospitality training, guide certification, service excellence standards",
    multiplier: "2.9x",
    synergies: [
      "Regional hospitality training centers beyond Accra",
      "Standardized guide certification raising service quality",
      "Management development for hospitality career pathways",
    ],
    bridgeVentures: ["Regional Training Centers", "Hospitality Excellence Certification"],
    impact:
      "Skilled workforce development closes the service quality gap that currently limits competitiveness against regional tourism peers",
  },
  {
    sectorId: 6,
    name: "Agriculture",
    connection: "Farm-to-table tourism, culinary tourism, local food supply chains",
    multiplier: "3.1x",
    synergies: [
      "Culinary tourism experiences connecting visitors to local food",
      "Farm-to-table supply chains for hotels and lodges",
      "Agri-tourism ventures in cocoa, palm oil, and cassava regions",
    ],
    bridgeVentures: ["Eco-Lodge Development", "Festival Tourism Circuits"],
    impact:
      "Culinary tourism creates direct market linkages connecting smallholder farmers to international visitor spending and demand",
  },
  {
    sectorId: 12,
    name: "Transportation",
    connection: "Tourist ground transport, airport connectivity, regional mobility networks",
    multiplier: "2.7x",
    synergies: [
      "Tourist ground transportation fleet modernization",
      "Airport-to-destination connectivity improvements",
      "Regional transport connecting tourism corridors",
    ],
    bridgeVentures: ["GTM Platform Enhancement", "Tourism Business Intelligence"],
    impact:
      "Transport connectivity determines whether tourism revenue concentrates in Accra or distributes equitably across all regions",
  },
];

const rippleCrossSectorIcons = {
  9: <IconLuggage />,
  7: <IconPalette />,
  1: <IconBuilding />,
  5: <IconGraduation />,
  6: <IconSprout />,
  12: <IconTruck />,
};

const rippleShortNames = ["Creative", "Infra", "Education", "Agriculture", "Transport"];

const ripplePathLabels = [
  "Tourism → Cultural Programming → Creative Revenue",
  "Tourism → Site Access → Infrastructure Value",
  "Tourism → Service Quality → Skills Development",
  "Tourism → Culinary Experiences → Farm Revenue",
  "Tourism → Regional Mobility → Transport Networks",
];

const CrossSectorSection = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [activeNode, setActiveNode] = useState(null);
  const [showMoreRipple, setShowMoreRipple] = useState(false);

  const SECTOR_ROUTES: Record<string, string> = {
    "Creative Industries": "/sectors/sports",
    "Infrastructure": "/sectors/infrastructure",
    "Education & Skills": "/sectors/education",
    "Agriculture": "/sectors/agriculture",
    "Transportation": "/sectors/transport",
    "Financial Inclusion": "/sectors/financial",
    "Health Systems": "/sectors/health",
    "Technology & Innovation": "/sectors/technology",
    "Energy": "/sectors/energy",
    "Manufacturing": "/sectors/manufacturing",
    "Housing & Real Estate": "/sectors/housing",
    "Tourism & Hospitality": "/sectors/tourism",
  };

  const pathways = rippleSectorData.map((sector, i) => ({
    ...sector,
    icon: rippleCrossSectorIcons[sector.sectorId],
    pathLabel: ripplePathLabels[i],
  }));

  return (
    <section style={{ backgroundColor: colors.primary, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "48px" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "rgba(184,217,53,0.15)",
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
              letterSpacing: "-0.5px",
              lineHeight: "1.2",
              color: colors.white,
              margin: "0 auto 16px",
              maxWidth: "820px",
            }}
          >
            How Tourism <span style={{ color: colors.accent, fontWeight: "600" }}>Amplifies Impact</span>
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
            Tourism doesn't operate in isolation — every visitor journey activates infrastructure, education,
            agriculture, and creative industries simultaneously.
          </p>
        </div>

        {/* Pathway Visual */}
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
                  <IconLuggage />
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
                  TOURISM
                </span>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
              {pathways.map((p, i) => {
                const isActive = activeNode === i;
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setActiveNode(isActive ? null : i);
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
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: isActive ? colors.accent : "rgba(255,255,255,0.08)",
                        border: isActive ? "none" : "1px solid rgba(255,255,255,0.1)",
                        color: isActive ? colors.primary : "rgba(255,255,255,0.6)",
                        marginBottom: "6px",
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
                        textAlign: "center",
                        color: isActive ? colors.white : "rgba(255,255,255,0.5)",
                        maxWidth: "58px",
                        lineHeight: "1.2",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {rippleShortNames[i]}
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
                <IconLuggage />
              </div>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: colors.white,
                  textAlign: "center",
                }}
              >
                Hub
              </span>
            </div>
            {/* Sector nodes */}
            {pathways.map((p, i) => {
              const isActive = activeNode === i;
              return (
                <div
                  key={i}
                  onClick={() => setActiveNode(isActive ? null : i)}
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
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: isActive ? colors.accent : "rgba(255,255,255,0.08)",
                      border: isActive ? "none" : "1px solid rgba(255,255,255,0.1)",
                      color: isActive ? colors.primary : "rgba(255,255,255,0.6)",
                      marginBottom: "10px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {p.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      fontWeight: "600",
                      textAlign: "center",
                      color: isActive ? colors.white : "rgba(255,255,255,0.5)",
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
            /* Default State */
            isMobile ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.5)" }}>
                  Tap a sector above to explore how tourism amplifies its impact
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
                  {pathways.map((p, i) => (
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
            /* Active State */
            <div>
              {/* Breadcrumb */}
              <div
                style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px", alignItems: "center" }}
              >
                {pathways[activeNode].pathLabel.split(" → ").map((seg, i, arr) => (
                  <React.Fragment key={i}>
                    <span
                      style={{
                        padding: "6px 14px",
                        borderRadius: "50px",
                        fontSize: "13px",
                        fontFamily: "Inter, sans-serif",
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

              {/* 3-Column Grid */}
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
                      {pathways[activeNode].synergies.map((syn, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            gap: "12px",
                            padding: "12px 16px",
                            borderRadius: "10px",
                            backgroundColor: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            alignItems: "center",
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
                      {pathways[activeNode].bridgeVentures.map((v, i) => (
                        <div
                          key={i}
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
                      href={SECTOR_ROUTES[pathways[activeNode].name] || "/sectors"}
                      onClick={(e) => { e.preventDefault(); navigate(SECTOR_ROUTES[pathways[activeNode].name] || "/sectors"); }}
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
              {isMobile && (
                <button
                  onClick={() => setShowMoreRipple(!showMoreRipple)}
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
                  {showMoreRipple ? "Show less" : "Show more details"}
                  <ChevronDown size={14} strokeWidth={2.5} color="white" style={{
                      transform: showMoreRipple ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.3s ease",
                    }} />
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
// INVESTMENT THESIS SECTION (Production Handoff)
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
      value: "18-25%",
      detail: "GTM platform and heritage tours with proven diaspora demand and rapid revenue generation",
    },
    {
      label: "Tier 2 Ventures",
      value: "12-18%",
      detail: "Training centers and eco-lodge development with longer build-out but strong asset appreciation",
    },
    {
      label: "Portfolio IRR",
      value: "15-25%",
      detail: "Blended returns across 15 ventures with risk-adjusted modeling and first-loss protection",
    },
    {
      label: "Dev. Leverage",
      value: "3-5x",
      detail: "Every dollar deployed generates $3-5 in local economic activity via tourism multipliers",
    },
  ],
  timeline: [
    {
      label: "Phase 1 (Q1-Q2)",
      value: "Foundation",
      detail: "GTM platform enhancement, heritage interpretation pilots, and GTA partnership framework",
    },
    {
      label: "Phase 2 (Q3-Q4)",
      value: "Scale",
      detail: "Diaspora tour operator launch, regional training center deployment, and eco-lodge development",
    },
    {
      label: "Phase 3 (2027+)",
      value: "Expansion",
      detail: "MICE facility, festival circuits, women in tourism accelerator, and regional replication",
    },
    {
      label: "Exit Horizon",
      value: "5-7 yrs",
      detail: "Staged liquidity via asset sales, concession renewals, or recapitalization events over time",
    },
  ],
  impact: [
    {
      label: "Visitors Served",
      value: "1.29M+",
      detail: "International arrivals with improved digital discovery, booking, and experience quality",
    },
    {
      label: "Jobs Created",
      value: "2,500+",
      detail: "Direct and indirect employment generated across hospitality, guiding, and tourism operations",
    },
    {
      label: "Enterprises Elevated",
      value: "6,700+",
      detail: "Hotels, lodges, and operators benefiting from certification, training, and digital access",
    },
    {
      label: "Heritage Sites",
      value: "50+",
      detail: "Cultural and natural attractions with improved interpretation, access, and visitor services",
    },
  ],
};

const investmentAudiences = [
  {
    key: "entrepreneur",
    label: "Entrepreneur",
    shortLabel: "Founder",
    icon: <IconStorefront />,
    headline: "Build Tourism Ventures That Transform Communities",
    pitch:
      "BRIDGE provides validated venture models, anchor partnerships with GTA and GTDC, and working capital strategies so you can launch tourism businesses with de-risked market entry and clear paths to profitability.",
    stats: [
      { value: "15", label: "Venture Paths", detail: "validated models" },
      { value: "1.29M", label: "Visitor Market", detail: "international arrivals" },
      { value: "Full", label: "BRIDGE Support", detail: "incubation to scale" },
    ],
    pathways: [
      {
        bring: "Local knowledge & hospitality expertise",
        get: "BRIDGE provides venture blueprints, financial models, and certification frameworks",
      },
      {
        bring: "Community relationships & cultural access",
        get: "Access to GTA licensing, GTDC digital platforms, and diaspora tourism demand",
      },
      {
        bring: "Execution commitment & service passion",
        get: "Technical assistance, quality monitoring, and scale-up support through Phase 3",
      },
    ],
  },
  {
    key: "business",
    label: "Business Entity",
    shortLabel: "Business",
    icon: <IconOfficeBuilding />,
    headline: "Anchor Your Brand in Ghana's Tourism Growth",
    pitch:
      "Partner with BRIDGE to secure premium hospitality infrastructure, supply chain integration, and cultural programming that positions your brand at the center of Africa's fastest-growing tourism destination market.",
    stats: [
      { value: "$10-18M", label: "Capital Range", detail: "across 15 ventures" },
      { value: "27%", label: "Sector Growth", detail: "year-over-year" },
      { value: "$4.8B", label: "Addressable", detail: "sector revenue" },
    ],
    pathways: [
      {
        bring: "Procurement commitments & partnerships",
        get: "Priority access to premium hospitality assets and destination experience rights",
      },
      {
        bring: "Technical expertise & global standards",
        get: "Co-development opportunities in heritage tourism and eco-lodge venture models",
      },
      {
        bring: "Corporate responsibility & ESG goals",
        get: "Impact reporting, ESG-aligned metrics, and community engagement documentation",
      },
    ],
  },
  {
    key: "investor",
    label: "Investor",
    shortLabel: "Investor",
    icon: <IconTrendingUp />,
    headline: "Deploy Capital Into Tourism With Impact Returns",
    pitch:
      "Deploy capital into tourism infrastructure assets with transparent governance, compounding revenue streams, and measurable development outcomes — backed by government partnerships and 1.29M annual visitors.",
    stats: [
      { value: "15-25%", label: "Target IRR", detail: "blended portfolio" },
      { value: "2.5x", label: "Multiple", detail: "capital appreciation" },
      { value: "12-18mo", label: "First Cash", detail: "revenue timeline" },
    ],
    pathways: [
      {
        bring: "Growth capital & patient deployment",
        get: "Asset-backed returns with tourism infrastructure as collateral and clear exit paths",
      },
      {
        bring: "Sector expertise & strategic guidance",
        get: "Board participation, portfolio oversight, and co-investment tier opportunities",
      },
      {
        bring: "Network access & industry deal flow",
        get: "First-look rights on expansion ventures and geographic replication opportunities",
      },
    ],
  },
  {
    key: "government",
    label: "Government",
    shortLabel: "Gov't",
    icon: <IconLandmark />,
    headline: "Deliver Tourism Infrastructure Without Fiscal Strain",
    pitch:
      "BRIDGE ventures align directly with Black Star Experience priorities — delivering heritage tourism, hospitality training, and digital platforms through private capital while creating jobs and expanding the tax base.",
    stats: [
      { value: "2,500+", label: "Jobs Created", detail: "direct employment" },
      { value: "95%", label: "Private Capital", detail: "no fiscal burden" },
      { value: "3-5x", label: "Tax Multiplier", detail: "economic activity" },
    ],
    pathways: [
      {
        bring: "Policy alignment & regulatory support",
        get: "Private tourism delivery meeting Black Star and Beyond the Return targets",
      },
      {
        bring: "Site access & permitting facilitation",
        get: "Job creation, tax revenue expansion, and improved visitor services regionally",
      },
      {
        bring: "Community endorsement & legitimacy",
        get: "Transparent reporting on development outcomes and constituency impact data",
      },
    ],
  },
];


const InvestmentCTASection = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("returns");
  const [activeAudience, setActiveAudience] = useState(0);
  const [showInvestmentDetails, setShowInvestmentDetails] = useState(false);

  const activeAudienceData = investmentAudiences[activeAudience];

  return (
    <section style={{ backgroundColor: colors.background, padding: isMobile ? "60px 0" : "100px 80px" }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Header */}
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
            <span style={{ color: colors.accent, fontWeight: "600" }}>Ghana's Tourism Future</span>
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
            contributes to 15 ventures across $10-18M in opportunity.
          </p>
        </div>

        {/* Audience Selector */}
        {isMobile ? (
          <div
            style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "24px", padding: "0 20px" }}
          >
            {investmentAudiences.map((aud, idx) => {
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
          <div
            style={{
              display: "flex",
              justifyContent: isMobile ? "center" : "flex-start",
              gap: "12px",
              marginBottom: "40px",
            }}
          >
            {investmentAudiences.map((aud, idx) => {
              const isActive = activeAudience === idx;
              return (
                <button
                  key={aud.key}
                  onClick={() => setActiveAudience(idx)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    borderRadius: "50px",
                    border: isActive ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                    backgroundColor: isActive ? colors.accentLight : "transparent",
                    color: isActive ? colors.primary : "#999",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
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
          {/* LEFT COLUMN */}
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
                <IconCheckSmall />
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#444", lineHeight: "1.5" }}>
                <strong style={{ color: colors.primary }}>Ghana Tourism Authority</strong> partnership framework for
                tourism development and quality standards
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Green Panel */}
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

              {/* Tab Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                {investmentTabContent[activeTab].map((item, idx) => (
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
                    <div style={{ width: isMobile ? "80px" : "100px", flexShrink: 0 }}>
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
                  href="/resources"
                  onClick={(e) => { e.preventDefault(); navigate("/resources"); }}
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
              <ChevronDown size={14} strokeWidth={2.5} color={colors.primary} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
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
        <span
          style={{
            display: "inline-block",
            backgroundColor: "rgba(184, 217, 53, 0.15)",
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
          Let's <span style={{ fontWeight: "700" }}>Welcome</span> the World{" "}
          <span style={{ fontWeight: "700" }}>to</span>{" "}
          <span style={{ color: colors.accent, fontWeight: "700" }}>Ghana</span>
        </h2>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "16px" : "18px",
            lineHeight: "1.7",
            color: "rgba(255,255,255,0.6)",
            margin: "0 0 40px 0",
            maxWidth: "680px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Whether you're an investor, partner, or government stakeholder, there's a seat at the table in building
          Ghana's tourism future.
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
              padding: isMobile ? "16px 24px" : "16px 32px",
              borderRadius: "50px",
              fontSize: "15px",
              fontWeight: "600",
              fontFamily: "Inter, sans-serif",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "center",
              ...(isMobile ? { width: "100%" } : {}),
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
              ...(isMobile ? { width: "100%", textAlign: "center" } : {}),
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

export default function TourismHospitalitySectorPage() {
  return (
    <Layout>
      <HeroSection sector={sectorData} />
      <ProblemSection />
      <ValueChainSectionPremium />
      <SolutionsSection sector={sectorData} />
      <CompetitiveLandscapeSection sector={sectorData} />
      <PolicyAlignmentSection />
      <ImpactSection />
      <CrossSectorSection />
      <InvestmentCTASection />
      <FinalCTASection />
    </Layout>
  );
}
