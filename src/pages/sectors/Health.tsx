import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { IconArrowRight, IconArrowDown, IconCheck, IconBuilding, IconStorefront, IconOfficeBuilding, IconTrendingUp, IconLandmark, IconCross } from "@/components/icons/SectorIcons";
import { ArrowRight, Blocks, Check, ChevronDown, Clock, Factory, FileText, GraduationCap, Heart, Hospital, Shield, Truck, Users, Wallet } from "lucide-react";
import { SECTOR_ROUTES } from "@/data/sectorIcons";
import { useCounter } from "@/hooks/useCounter";

// ============================================================================
// BRIDGE SECTOR PAGE: Health Systems & Wellbeing
// PRODUCTION VERSION — Fully Mobile Responsive
// ============================================================================
// Design System: Dark Green #1B4D3E, Lime #B8D935, Off-white #F3F5F2
// Breakpoint: 768px
// ============================================================================

import { colors, layout } from "@/lib/theme";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectorPageTemplate from "@/components/sectors/SectorPageTemplate";

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
  heroTitleBold: "Health",
  heroTitleRest: "Systems & Wellbeing",
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

const valueChainIcons = {
  policy: <FileText size={24} strokeWidth={1.5} />,
  workforce: <Users size={24} strokeWidth={1.5} />,
  hospital: <Hospital size={24} strokeWidth={1.5} />,
  insurance: <Shield size={24} strokeWidth={1.5} />,
  patients: <Heart size={24} strokeWidth={1.5} />,
};

const crossSectorIcons = {
  3: <IconCross />,
  2: <Wallet size={22} strokeWidth={1.5} />,
  1: <Blocks size={22} strokeWidth={1.5} />,
  5: <GraduationCap size={22} strokeWidth={1.5} />,
  11: <Factory size={22} strokeWidth={1.5} />,
  12: <Truck size={22} strokeWidth={1.5} />,
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
      className="cursor-pointer transition-all duration-300 ease-in-out" style={{
                  backgroundColor: colors.white,
                  borderRadius: isMobile ? "16px" : "20px",
                  padding: isMobile ? "20px" : "28px",
                  border: isExpanded ? `2px solid ${colors.accent}` : `1px solid ${colors.line}`                }}
    >
      <div
        className="flex items-start justify-between mb-3"
      >
        <div className="flex-1 min-w-0">
          <h3
            className="font-[Inter,sans-serif] font-semibold m-0" style={{
                  fontSize: isMobile ? "16px" : "18px",
                  color: colors.dark
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
              overflow: "hidden"
                }}
          >
            {problem.description}
          </p>
        </div>

        <span
          className="font-[Inter,sans-serif] text-[11px] font-bold py-[6px] px-[14px] rounded-[20px] whitespace-nowrap shrink-0 ml-3" style={{
                  color: problem.severity === "High Priority" ? colors.primary : colors.accentText,
                  backgroundColor: problem.severity === "High Priority" ? colors.accentLight : "rgba(184,217,53,0.12)"
                }}
        >
          {problem.severity}
        </span>
      </div>

      <div
        className="rounded-[12px] overflow-hidden" style={{
                  backgroundColor: colors.accentLight,
                  padding: isMobile ? "8px 12px" : "10px 16px",
                  marginBottom: isExpanded ? "16px" : 0
                }}
      >
        <span
          className="font-[Inter,sans-serif] font-semibold overflow-hidden" style={{
                  fontSize: isMobile ? "13px" : "14px",
                  color: colors.primary,
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical"
                }}
        >
          Impact: {problem.quantification}
        </span>
      </div>

      {isExpanded && (
        <div
          className="pt-4" style={{ borderTop: `1px solid ${colors.line}` }}
        >
          <div
            className="grid gap-3 mb-4" style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}
          >
            <div
              className="rounded-[12px] p-[14px]" style={{ backgroundColor: colors.background }}
            >
              <div
                className="flex items-center justify-between mb-[10px]"
              >
                <span
                  className="font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888]"
                >
                  Priority
                </span>
                <span
                  className="font-[Inter,sans-serif] text-[12px] font-bold py-[4px] px-[10px] rounded-[20px]" style={{
                  color: problem.severity === "High Priority" ? colors.primary : colors.accentText,
                  backgroundColor: problem.severity === "High Priority" ? colors.accentLight : "rgba(184,217,53,0.12)",
                }}
                >
                  {problem.severity}
                </span>
              </div>
              <div
                className="h-[8px] rounded-[4px] overflow-hidden transition-[width] duration-500 ease-in-out" style={{ backgroundColor: colors.line }}
              >
                <div
                  className="h-full rounded-[4px]" style={{
                  width: `${problem.severityScore}%`,
                  backgroundColor: problem.severity === "High Priority" ? colors.primary : colors.accentText                }}
                />
              </div>
            </div>

            <div
              className="rounded-[12px] p-[14px]" style={{ backgroundColor: colors.background }}
            >
              <span
                className="font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888] block mb-[10px]"
              >
                Scale
              </span>
              <div
                className="flex items-baseline gap-2"
              >
                <span
                  className="font-[Poppins,sans-serif] font-bold" style={{
                  fontSize: isMobile ? "20px" : "24px",
                  color: colors.primary
                }}
                >
                  {problem.affectedCount}
                </span>
                <span
                  className="font-[Inter,sans-serif] text-[13px] text-[#666]"
                >
                  {problem.affectedLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <div
              className="flex items-center gap-2 mb-3"
            >
              <Clock size={16} strokeWidth={2} color="#888" />
              <span
                className="font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888]"
              >
                Opportunity Drivers
              </span>
            </div>
            <div
              className="grid gap-[10px]" style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}
            >
              {problem.rootCauses.map((cause, j) => (
                <div
                  key={j}
                  className="flex items-center gap-3 rounded-[12px]" style={{
                  backgroundColor: colors.background,
                  padding: isMobile ? "10px 12px" : "12px 14px"
                }}
                >
                  <div
                    className="w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: colors.primary }}
                  >
                    <span
                      className="font-[Inter,sans-serif] text-[13px] font-semibold" style={{ color: colors.white }}
                    >
                      {j + 1}
                    </span>
                  </div>
                  <div
                    className="flex flex-col gap-px min-w-0"
                  >
                    <span
                      className="font-[Inter,sans-serif] font-semibold" style={{
                  fontSize: isMobile ? "13px" : "14px",
                  color: colors.dark
                }}
                    >
                      {cause.title}
                    </span>
                    <span
                      className="font-[Inter,sans-serif] text-[12px] text-[#888]"
                    >
                      {cause.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="flex pt-4" style={{
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "flex-start" : "center",
                  gap: isMobile ? "8px" : "16px",
                  borderTop: `1px solid ${colors.line}`
                }}
          >
            <div
              className="flex items-center gap-[10px] shrink-0"
            >
              <Check size={18} strokeWidth={2.5} color={colors.accent} />
              <span
                className="font-[Inter,sans-serif] text-[13px] text-[#888]"
              >
                BRIDGE Solution:
              </span>
            </div>
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span
                className="font-[Inter,sans-serif] text-sm font-semibold flex-1 min-w-0" style={{ color: colors.primary }}
              >
                {problem.bridgeSolution}
              </span>
              <span
                className="font-[Inter,sans-serif] text-[13px] font-medium cursor-pointer flex items-center gap-1 shrink-0" style={{ color: colors.primary }}
              >
                View
                <ArrowRight size={14} strokeWidth={2} />
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
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="inline-block py-[10px] px-[20px] rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6" style={{
                  backgroundColor: colors.white,
                  color: colors.primary,
                  border: `1px solid ${colors.line}`
                }}
          >
            The Opportunity
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light mt-0 ml-0 mr-0 mb-5 tracking-[-0.5px] leading-[1.2] max-w-[820px]" style={{
                  fontSize: isMobile ? "28px" : "42px",
                  color: colors.primary
                }}
          >
            <span className="font-bold">5,000+ CHPS</span> compounds ready to become Ghana's{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>care foundation</span>
          </h2>
          <p
            className="font-[Inter,sans-serif] text-[#666] m-0 leading-[1.65] max-w-[680px]" style={{ fontSize: isMobile ? "15px" : "16px" }}
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
          <div className="flex justify-center gap-[6px] mt-4 transition-all duration-300 ease-in-out">
            {problemSectionData.map((_, i) => (
              <div
                key={i}
                className="h-[8px]" style={{
                  width: i === 0 ? "24px" : "8px",
                  borderRadius: i === 0 ? "4px" : "50%",
                  backgroundColor: i === 0 ? colors.accent : "#ddd"                }}
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
      className="relative overflow-hidden" style={{
                  backgroundColor: colors.white,
                  padding: isMobile ? "60px 20px" : "100px 80px"
                }}
    >
      {!isMobile && (
        <>
          <div
            className="absolute w-[600px] h-[600px] rounded-full" style={{
                  top: "-200px",
                  right: "-200px",
                  border: "1px solid rgba(27, 77, 62, 0.04)"
                }}
          />
          <div
            className="absolute w-[800px] h-[800px] rounded-full" style={{
                  bottom: "-300px",
                  left: "-100px",
                  border: "1px solid rgba(27, 77, 62, 0.03)"
                }}
          />
        </>
      )}
      <div className="max-w-[1200px] mx-auto relative z-[1]">
        <div className="text-center" style={{ marginBottom: isMobile ? "32px" : "50px" }}>
          <span
            className="inline-block py-[10px] px-[20px] rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6" style={{
                  backgroundColor: colors.white,
                  color: colors.primary,
                  border: `1px solid ${colors.line}`
                }}
          >
            The Process
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light tracking-[-0.5px] leading-[1.2] max-w-[600px]" style={{
                  fontSize: isMobile ? "28px" : "42px",
                  color: colors.primary,
                  margin: "0 auto 20px auto"
                }}
          >
            Mapping the Pathway to Better{" "}
            <span className="font-bold" style={{ color: colors.accent }}>Patient Outcomes</span>
          </h2>
          {!isMobile && (
            <p
              className="font-[Inter,sans-serif] text-base text-[#666] max-w-[750px] leading-[1.65] mx-auto"
            >
              Tracing how care reaches communities — and where strategic resources and innovation create compounding
              value at every stage.
            </p>
          )}
        </div>

        {/* Stage Cards — compact on mobile */}
        {isMobile ? (
          <div
            className="flex gap-[6px] justify-center flex-nowrap mb-6" style={{
                  overflowX: "auto",
                  WebkitOverflowScrolling: "touch"
                }}
          >
            {valueChainStages.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveStage(i);
                  setShowMore(false);
                }}
                className="rounded-full py-[8px] px-[14px] text-[12px] font-semibold font-[Inter,sans-serif] cursor-pointer whitespace-nowrap shrink-0" style={{
                  backgroundColor: activeStage === i ? colors.primary : colors.background,
                  color: activeStage === i ? colors.white : colors.primary,
                  border: activeStage === i ? "none" : `1px solid ${colors.line}`
                }}
              >
                {s.shortLabel}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex gap-[10px] items-stretch transition-all duration-300 ease-in-out mb-[34px]">
            {valueChainStages.map((s, i) => (
              <div
                key={s.id}
                onClick={() => setActiveStage(i)}
                className="flex-1 min-h-[200px] rounded-[16px] p-[20px] cursor-pointer flex flex-col" style={{
                  backgroundColor: activeStage === i ? "rgba(184, 217, 53, 0.1)" : colors.background,
                  border: activeStage === i ? `2px solid ${colors.accent}` : `2px solid ${colors.primary}`,
                }}
              >
                <div
                  className="flex justify-between items-start gap-2 mb-1"
                >
                  <div
                    className="font-[Inter,sans-serif] text-sm font-semibold leading-[1.3] flex-1" style={{ color: colors.primary }}
                  >
                    {s.stage}
                  </div>
                  <div
                    className="w-[28px] h-[28px] rounded-[8px] flex items-center justify-center shrink-0 transition-all duration-300 ease-in-out" style={{
                  backgroundColor: activeStage === i ? colors.accent : "rgba(0,0,0,0.04)",
                  color: activeStage === i ? colors.primary : "#999"                }}
                  >
                    <span className="scale-[0.7] flex">{valueChainIcons[s.icon]}</span>
                  </div>
                </div>
                <div
                  className="font-[Inter,sans-serif] text-[12px] text-[#999] leading-[1.3] mb-auto"
                >
                  {s.actor}
                </div>
                <div
                  className="mt-5 pt-[14px]" style={{ borderTop: `1px solid ${activeStage === i ? "rgba(184,217,53,0.3)" : "rgba(0,0,0,0.06)"}` }}
                >
                  <div
                    className="font-[Poppins,sans-serif] text-2xl font-bold leading-[1]" style={{ color: colors.primary }}
                  >
                    {s.stat}
                  </div>
                  <div className="font-[Inter,sans-serif] text-[11px] text-[#999] mt-0.5">
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
            border: `2px solid ${colors.primary}`
                }}
        >
          {/* LEFT — Dark Green */}
          <div
            className="flex flex-col" style={{
                  backgroundColor: colors.primary,
                  padding: isMobile ? "24px" : "36px"
                }}
          >
            <div style={{ marginBottom: isMobile ? "20px" : "28px" }}>
              <div
                className="flex items-center justify-between mb-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center" style={{
                  backgroundColor: colors.accent,
                  color: colors.primary
                }}
                  >
                    {valueChainIcons[stage.icon]}
                  </div>
                  <div>
                    <div
                      className="font-[Inter,sans-serif] font-semibold" style={{
                  fontSize: isMobile ? "16px" : "18px",
                  color: colors.white
                }}
                    >
                      {stage.stage}
                    </div>
                    <div
                      className="font-[Inter,sans-serif] text-[12px] text-white/[0.45] mt-0.5"
                    >
                      {stage.actor} · {stage.population}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className="font-[Poppins,sans-serif] font-bold leading-[1]" style={{
                  fontSize: isMobile ? "24px" : "32px",
                  color: colors.accent
                }}
                  >
                    {stage.valueRetained}%
                  </div>
                  <div
                    className="font-[Inter,sans-serif] text-[10px] font-semibold text-white/[0.35] uppercase tracking-[1px] mt-1"
                  >
                    Readiness
                  </div>
                </div>
              </div>
              <div
                className="h-[4px] rounded-[2px] overflow-hidden transition-[width] duration-500 ease-in-out" style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <div
                  className="h-full rounded-[2px]" style={{
                  width: `${stage.valueRetained}%`,
                  backgroundColor: colors.accent                }}
                />
              </div>
            </div>
            <div
              className="font-[Inter,sans-serif] text-[11px] font-bold uppercase tracking-[1.5px] text-white/40 mb-5"
            >
              Where We See Potential
            </div>
            {/* Pain points: show 3 on mobile initially, all on desktop */}
            <div className="flex flex-col gap-[14px] flex-1">
              {(isMobile && !showMore ? stage.painPoints.slice(0, 3) : stage.painPoints).map((point, i) => (
                <div
                  key={i}
                  className="flex" style={{
                  alignItems: isMobile ? "center" : "flex-start",
                  gap: isMobile ? "10px" : "12px"
                }}
                >
                  <div
                    className="w-[24px] h-[24px] bg-white/[0.06] rounded-[6px] flex items-center justify-center shrink-0 font-[Poppins,sans-serif] text-[11px] font-bold" style={{ color: colors.accent }}
                  >
                    {i + 1}
                  </div>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: isMobile ? "13px" : "14px",
                      color: "rgba(255,255,255,0.75)",
                      lineHeight: isMobile ? "1.3" : "1.5",
                      ...(isMobile ? { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } : {})
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
            className="flex flex-col" style={{
                  backgroundColor: colors.white,
                  padding: isMobile ? "24px" : "36px"
                }}
          >
            <div
              className="font-[Inter,sans-serif] text-[11px] font-bold uppercase tracking-[1.5px] mb-4 flex items-center gap-2" style={{ color: colors.primary }}
            >
              <Check size={13} strokeWidth={2.5} color={colors.accent} />
              BRIDGE Response
            </div>
            <p
              className="font-[Inter,sans-serif] text-[15px] text-[#555] leading-[1.7] mt-0 ml-0 mr-0 mb-6" style={{ minHeight: isMobile ? "auto" : "52px" }}
            >
              {stage.bridgeResponse}
            </p>
            <div className="mb-6">
              <div
                className="font-[Inter,sans-serif] text-[11px] font-bold text-[#BBB] uppercase tracking-[1px] mb-3"
              >
                Linked Ventures
              </div>
              <div className="flex flex-col gap-[10px]">
                {stage.bridgeVentures.map((v, i) => (
                  <div key={i} className="flex items-center gap-[10px]">
                    <div
                      className="w-[6px] h-[6px] rounded-full shrink-0" style={{ backgroundColor: colors.accent }}
                    />
                    <span
                      className="font-[Inter,sans-serif] text-sm font-medium" style={{ color: colors.primary }}
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
                className="rounded-[14px] py-[18px] px-[20px] mt-auto" style={{ backgroundColor: colors.background }}
              >
                <div
                  className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1.5px] text-[#999] mb-[14px]"
                >
                  Readiness Across Stages
                </div>
                <div className="flex items-end gap-[6px] h-12">
                  {valueChainStages.map((s, i) => (
                    <div
                      key={i}
                      className="flex-1 flex flex-col items-center h-full justify-end gap-1 transition-all duration-300 ease-in-out"
                    >
                      <span
                        className="font-[Poppins,sans-serif] text-[10px] font-bold" style={{
                  color: i === activeStage ? getBarColor(s.valueRetained) : "#CCC"                }}
                      >
                        {s.valueRetained}%
                      </span>
                      <div
                        className="w-full min-h-[4px] transition-all duration-500 ease-in-out" style={{
                  height: `${(s.valueRetained / 100) * 100}%`,
                  backgroundColor: i === activeStage ? getBarColor(s.valueRetained) : "#E5E7EB",
                  borderRadius: "4px 4px 2px 2px"                }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-[6px] mt-[6px] transition-all duration-300 ease-in-out">
                  {valueChainStages.map((s, i) => (
                    <div
                      key={i}
                      className="flex-1 text-center font-[Inter,sans-serif] text-[9px] tracking-[0.3px]" style={{
                  color: i === activeStage ? colors.primary : "#BBB",
                  fontWeight: i === activeStage ? "600" : "400"                }}
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
                className="flex items-center justify-center gap-2 w-full p-[14px] mt-4 bg-transparent rounded-[12px] font-[Inter,sans-serif] text-sm font-semibold cursor-pointer" style={{
                  border: `1px solid ${colors.line}`,
                  color: colors.primary
                }}
              >
                {showMore ? "Show less" : "Show more details"}
                <ChevronDown size={14} strokeWidth={2.5} color={colors.primary} className="transition-transform duration-300 ease-in-out" style={{ transform: showMore ? "rotate(180deg)" : "none" }} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// COMPETITIVE LANDSCAPE — Split-panel analysis with summary grid
// ============================================================================

const StrengthBar = ({ rating }) => (
  <div className="flex gap-[3px] shrink-0">
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className="w-4 h-[6px] rounded-[3px]" style={{ backgroundColor: i <= rating ? colors.accent : colors.line }}
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
      className="rounded-[20px] p-7 flex flex-col" style={{
        backgroundColor: colors.white,
        border: `1px solid ${colors.line}`
                }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h3
          className="font-[Inter,sans-serif] text-lg font-semibold m-0 leading-[1.3]" style={{ color: colors.dark }}
        >
          {comp.name}
        </h3>
        <span
          className="font-[Inter,sans-serif] text-[12px] font-semibold py-[4px] px-[14px] rounded-[20px] whitespace-nowrap shrink-0 ml-3" style={{
                  color: comp.priority === "High" ? colors.primary : "#999",
                  backgroundColor: colors.accentLight
                }}
        >
          {comp.priority === "High" ? "HIGH PRIORITY" : "MEDIUM"}
        </span>
      </div>
      {/* Focus */}
      <p
        className="font-[Inter,sans-serif] text-sm text-[#666] leading-[1.5] mt-0 ml-0 mr-0 mb-5"
      >
        {comp.focus}
      </p>
      {/* Strengths */}
      <div
        className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1.5px] mb-[14px]" style={{ color: colors.accent }}
      >
        Strengths
      </div>
      <div
        className="flex flex-col gap-3" style={{ marginBottom: isExpanded ? "24px" : "20px" }}
      >
        {comp.strengths.map((s, j) => (
          <div key={j} className="flex justify-between items-center">
            <span className="font-[Inter,sans-serif] text-[13px] text-[#666]">{s.name}</span>
            <StrengthBar rating={s.rating} />
          </div>
        ))}
      </div>

      {/* Expanded: gaps + opportunity */}
      {isExpanded && (
        <>
          <div
            className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1.5px] text-[#888] mb-3"
          >
            Where BRIDGE Helps
          </div>
          <div className="flex flex-col gap-2 mb-5">
            {comp.gaps.map((gap, j) => (
              <div key={j} className="flex items-center gap-2">
                <span className="text-[12px] shrink-0" style={{ color: colors.accent }}>{"\u2022"}</span>
                <span className="font-[Inter,sans-serif] text-[13px] text-[#666] leading-[1.4]">
                  {gap}
                </span>
              </div>
            ))}
          </div>
          <div
            className="rounded-[12px] p-[16px] mb-5" style={{
                  backgroundColor: colors.accentLight,
                  border: `1px solid ${colors.accent}`
                }}
          >
            <div
              className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1px] mb-2 flex items-center gap-[6px]" style={{ color: colors.primary }}
            >
              <span
                className="w-[18px] h-[18px] rounded-full inline-flex items-center justify-center text-[10px]" style={{
                  backgroundColor: colors.accent,
                  color: colors.primary
                }}
              >
                {"\u2726"}
              </span>
              BRIDGE Opportunity
            </div>
            <div
              className="font-[Inter,sans-serif] text-[13px] leading-[1.5]" style={{ color: colors.primary }}
            >
              {comp.bridgeOpportunity}
            </div>
          </div>
        </>
      )}

      {/* Footer: nav + analysis toggle */}
      <div
        className="flex justify-between items-center pt-4 mt-auto" style={{ borderTop: `1px solid ${colors.line}` }}
      >
        {!hiddenNav ? (
          <div className="flex items-center gap-[10px]">
            <button
              onClick={() => goTo("prev")}
              className="w-[32px] h-[32px] rounded-full cursor-pointer flex items-center justify-center text-[#999] text-sm" style={{
                  border: `1px solid ${colors.line}`,
                  backgroundColor: colors.white
                }}
            >
              {"\u2039"}
            </button>
            <span className="font-[Inter,sans-serif] text-[13px] text-[#999]">
              {currentIndex + 1} / {total}
            </span>
            <button
              onClick={() => goTo("next")}
              className="w-[32px] h-[32px] rounded-full border-none cursor-pointer flex items-center justify-center text-sm" style={{
                  backgroundColor: colors.primary,
                  color: colors.white
                }}
            >
              {"\u203A"}
            </button>
          </div>
        ) : (
          <span className="font-[Inter,sans-serif] text-[13px] text-[#999]">
            {currentIndex + 1} / {total}
          </span>
        )}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-[6px] bg-none rounded-[8px] py-[8px] px-[14px] cursor-pointer font-[Inter,sans-serif] text-[13px] text-[#666] font-medium" style={{ border: `1px solid ${colors.line}` }}
        >
          {isExpanded ? "Less" : "Analysis"}
          <ChevronDown size={10} strokeWidth={2.5} style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }} />
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
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="inline-block py-[10px] px-[20px] rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6" style={{
                  backgroundColor: colors.white,
                  color: colors.primary,
                  border: `1px solid ${colors.line}`
                }}
          >
            The Landscape
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light mt-0 ml-0 mr-0 mb-4 tracking-[-0.5px] leading-[1.2]" style={{
                  fontSize: isMobile ? "28px" : "42px",
                  color: colors.primary
                }}
          >
            Building With Ghana{"\u2019"}s{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>Health Champions</span>
          </h2>
          {!isMobile && (
            <p
              className="font-[Inter,sans-serif] text-base text-[#666] m-0 max-w-[750px] leading-[1.65]"
            >
              NHIA, Zipline, mPharma, and CHAG anchor Ghana{"\u2019"}s health delivery. BRIDGE integrates community
              health financing with supply chain innovation — combining access with affordability.
            </p>
          )}
        </div>

        {/* Mobile: Horizontal scroll pills */}
        {isMobile && (
          <div className="flex justify-start" style={{
                  margin: "0 -20px 16px",
                  padding: "0 20px"
                }}>
            <div
              className="hide-scrollbar inline-flex items-center gap-[6px] rounded-full p-[4px]" style={{
                  border: `1px solid ${colors.line}`,
                  backgroundColor: colors.white,
                  overflowX: "auto",
                  WebkitOverflowScrolling: "touch",
                  maxWidth: "100%"
                }}
            >
              {competitors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => handleCompetitorChange(i)}
                  className="py-[5px] px-[8px] rounded-full text-[10px] font-[Inter,sans-serif] cursor-pointer whitespace-nowrap shrink-0 transition-all duration-200 ease-in-out" style={{
                  backgroundColor: activeCompetitorIndex === i ? colors.accentLight : "transparent",
                  color: activeCompetitorIndex === i ? colors.primary : "#999",
                  border: activeCompetitorIndex === i ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                  fontWeight: activeCompetitorIndex === i ? "700" : "500"                }}
                >
                  {shortNames[i]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Split Grid */}
        <div
          className="grid gap-5" style={{
                  gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
                  alignItems: "end"
                }}
        >
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-5">
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
                className="flex items-center justify-center gap-2 w-full p-[14px] border-none rounded-[12px] font-[Inter,sans-serif] text-sm font-semibold cursor-pointer" style={{
                  backgroundColor: colors.primary,
                  color: colors.white
                }}
              >
                See BRIDGE{"\u2019"}s Position
                <ChevronDown size={14} strokeWidth={2.5} />
              </button>
            )}

            {/* BRIDGE Position Card */}
            {(!isMobile || showMoreComp) && (
              <div
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: isMobile ? "16px" : "20px",
                  padding: isMobile ? "20px" : "28px"
                }}
              >
                {/* Position header */}
                <div
                  className="flex justify-between items-center mb-[14px]"
                >
                  <span
                    className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[2px] text-white/40"
                  >
                    BRIDGE{"\u2019"}S POSITION
                  </span>
                  <span
                    className="font-[Inter,sans-serif] text-[11px] font-semibold py-[4px] px-[12px] rounded-[20px]" style={{
                  color: colors.accent,
                  backgroundColor: "rgba(184,217,53,0.12)"
                }}
                  >
                    vs {vsLabels[activeCompetitorIndex]}
                  </span>
                </div>
                {/* Headline */}
                <h4
                  className="font-[Inter,sans-serif] text-[17px] font-semibold leading-[1.4] min-h-[48px]" style={{
                  color: colors.white,
                  margin: "0 0 18px 0"
                }}
                >
                  {pos.headline}
                </h4>
                {/* Bullet grid */}
                <div className="grid" style={{
                  gridTemplateColumns: "1fr 1fr",
                  gap: isMobile ? "8px" : "12px"
                }}>
                  {pos.bullets.map((b, i) => (
                    <div
                      key={i}
                      className="bg-white/[0.06] rounded-[12px] py-[14px] px-[16px]"
                    >
                      <div className="flex items-start gap-2">
                        <span
                          className="w-[7px] h-[7px] rounded-full shrink-0" style={{
                  backgroundColor: colors.accent,
                  marginTop: "5px"
                }}
                        />
                        <div>
                          <div
                            className="font-[Inter,sans-serif] text-[13px] font-semibold mb-0.5" style={{ color: colors.white }}
                          >
                            {b.label}
                          </div>
                          <div
                            className="font-[Inter,sans-serif] text-[13px] text-white/40"
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
            <div className="grid grid-cols-2 gap-4 transition-all duration-200 ease-in-out">
              {competitors.map((c, i) => (
                <div
                  key={i}
                  onClick={() => handleCompetitorChange(i)}
                  className="rounded-[16px] p-[24px] cursor-pointer flex flex-col min-h-[210px]" style={{
                  backgroundColor: colors.white,
                  border: activeCompetitorIndex === i ? `2px solid ${colors.primary}` : `1px solid ${colors.line}`                }}
                >
                  {/* Name + funding badge */}
                  <div
                    className="flex justify-between items-center mb-2"
                  >
                    <span
                      className="font-[Inter,sans-serif] text-base font-semibold whitespace-nowrap" style={{ color: colors.dark }}
                    >
                      {shortNames[i]}
                    </span>
                    <span
                      className="font-[Inter,sans-serif] text-[11px] font-semibold py-[3px] px-[10px] rounded-[12px] shrink-0 ml-3" style={{
                  color: colors.primary,
                  backgroundColor: colors.accentLight
                }}
                    >
                      {c.funding}
                    </span>
                  </div>
                  {/* Description */}
                  <p
                    className="font-[Inter,sans-serif] text-[13px] text-[#888] leading-[1.45] mt-0 ml-0 mr-0 mb-3"
                  >
                    {shortDescs[i]}
                  </p>
                  {/* Top Strength box */}
                  <div
                    className="rounded-[10px] py-[10px] px-[14px] flex justify-between items-center gap-2" style={{ backgroundColor: colors.background }}
                  >
                    <span
                      className="font-[Inter,sans-serif] text-[13px] font-medium text-[#555] whitespace-nowrap overflow-hidden text-ellipsis flex-1 min-w-0"
                    >
                      {c.strengths[0].name}
                    </span>
                    <StrengthBar rating={c.strengths[0].rating} />
                  </div>
                  {/* Footer */}
                  <div
                    className="flex justify-between items-center mt-auto pt-[14px]" style={{ borderTop: `1px solid ${colors.line}` }}
                  >
                    <span className="font-[Inter,sans-serif] text-[12px] text-[#ccc]">
                      Est. {c.year}
                    </span>
                    <span
                      className="font-[Inter,sans-serif] text-[11px] font-semibold" style={{
                  color: c.priority === "High" ? colors.primary : "#999",
                  opacity: c.priority === "High" ? 1 : 0.6
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
    category: "funding",
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
    category: "infrastructure",
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
    category: "partnerships",
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
    category: "infrastructure",
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
    category: "funding",
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
    category: "partnerships",
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
    category: "funding",
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
    category: "infrastructure",
    relevance: ["primary", "specialty"],
    alignment:
      "Digital health infrastructure including telemedicine frameworks and health information systems nationwide.",
    bridgeRole:
      "Regulatory alignment for telemedicine licensing, EMR integration, and digital health innovation standards.",
    bridgeVentures: ["Telemedicine Platform", "Healthcare Registry"],
    pillars: ["eHealth Strategy", "Telemedicine Framework"],
  },
];

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
  const pathway = activeNode !== null ? crossSectorData[activeNode] : null;

  return (
    <section style={{ backgroundColor: colors.primary, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center" style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="inline-block bg-white/[0.08] py-[10px] px-[20px] rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6" style={{
                  color: colors.accent,
                  border: "1px solid rgba(255,255,255,0.15)"
                }}
          >
            The Ripple Effect
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light tracking-[-0.5px] leading-[1.2] max-w-[820px]" style={{
                  fontSize: isMobile ? "28px" : "42px",
                  color: colors.white,
                  margin: "0 auto 20px auto"
                }}
          >
            How Health Systems <span className="font-semibold" style={{ color: colors.accent }}>Amplify Impact</span>
          </h2>
          {!isMobile && (
            <p
              className="font-[Inter,sans-serif] text-base text-white/[0.55] max-w-[700px] leading-[1.65] mx-auto"
            >
              Health connects to every sector in the BRIDGE portfolio. Select a connected sector to explore how
              investment in wellbeing creates compounding value.
            </p>
          )}
        </div>

        {/* PATHWAY VISUAL */}
        {isMobile ? (
          /* MOBILE: Hub on top, 5 icons below */
          <div className="mb-6">
            {/* Hub Icon */}
            <div className="flex flex-col items-center mb-4">
              <div
                className="w-[56px] h-[56px] rounded-[14px] flex items-center justify-center" style={{
                  backgroundColor: colors.accent,
                  color: colors.primary,
                  boxShadow: "0 0 24px rgba(184, 217, 53, 0.3)"
                }}
              >
                {crossSectorIcons[3]}
              </div>
              <span
                className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[0.5px] mt-2" style={{ color: colors.accent }}
              >
                HEALTH SYSTEMS
              </span>
            </div>
            {/* 5 Connected Sector Icons */}
            <div className="flex justify-center gap-3">
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
                    className="flex flex-col items-center gap-[6px] bg-none border-none cursor-pointer p-[4px] transition-all duration-300 ease-in-out" style={{
                  opacity: isDimmed ? 0.4 : 1                }}
                  >
                    <div
                      className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center transition-all duration-300 ease-in-out" style={{
                  backgroundColor: isActive ? colors.accent : "rgba(255,255,255,0.08)",
                  border: isActive ? "none" : "1px solid rgba(255,255,255,0.1)",
                  color: isActive ? colors.primary : "rgba(255,255,255,0.6)"                }}
                    >
                      <span className="scale-[0.85] flex transition-all duration-300 ease-in-out">{crossSectorIcons[s.sectorId]}</span>
                    </div>
                    <span
                      className="font-[Inter,sans-serif] text-[10px] font-semibold max-w-[58px] leading-[1.2] text-center" style={{
                  color: isActive ? colors.white : "rgba(255,255,255,0.5)"                }}
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
            className="flex items-start justify-center gap-8 mb-12"
          >
            {/* Hub Icon */}
            <div
              className="w-[120px] shrink-0 flex flex-col items-center"
            >
              <div
                className="w-[80px] h-[80px] rounded-[20px] flex items-center justify-center" style={{
                  backgroundColor: colors.accent,
                  color: colors.primary,
                  boxShadow: "0 0 30px rgba(184, 217, 53, 0.3)"
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
                  className="w-[120px] flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out" style={{
                  opacity: isDimmed ? 0.4 : 1                }}
                >
                  <div
                    className="w-[56px] h-[56px] rounded-[16px] flex items-center justify-center mb-[10px] transition-all duration-300 ease-in-out" style={{
                  backgroundColor: isActive ? colors.accent : "rgba(255,255,255,0.08)",
                  border: isActive ? "none" : "1px solid rgba(255,255,255,0.1)",
                  color: isActive ? colors.primary : "rgba(255,255,255,0.6)"                }}
                  >
                    {crossSectorIcons[s.sectorId]}
                  </div>
                  <span
                    className="font-[Inter,sans-serif] text-[13px] font-semibold text-center transition-all duration-300 ease-in-out" style={{
                  color: isActive ? colors.white : "rgba(255,255,255,0.5)"                }}
                  >
                    {s.name}
                  </span>
                  <span
                    className="font-[Poppins,sans-serif] text-xl font-bold mt-1 transition-all duration-300 ease-in-out" style={{
                  color: isActive ? colors.accent : "rgba(255,255,255,0.3)"                }}
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
          className="bg-white/5 transition-all duration-300 ease-in-out" style={{
                  borderRadius: isMobile ? "16px" : "24px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: isMobile ? "24px" : "40px",
                  minHeight: isMobile ? "auto" : "280px"                }}
        >
          {activeNode === null ? (
            isMobile ? (
              <div className="text-center py-5">
                <p
                  className="font-[Inter,sans-serif] text-[15px] text-white/50 m-0 leading-[1.6]"
                >
                  Tap a sector above to explore how health amplifies its impact
                </p>
              </div>
            ) : (
              <div>
                <div
                  className="flex justify-between items-center mb-5"
                >
                  <span
                    className="font-[Inter,sans-serif] text-base font-semibold" style={{ color: colors.white }}
                  >
                    Cross-Sector Integration Opportunities
                  </span>
                  <span className="font-[Inter,sans-serif] text-[13px] text-white/40">
                    Click a sector above to explore
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-4 transition-all duration-200 ease-in-out">
                  {crossSectorData.map((sector, i) => (
                    <div
                      key={sector.sectorId}
                      onClick={() => setActiveNode(i)}
                      className="cursor-pointer py-[24px] px-[20px] rounded-[16px] bg-white/5" 
                    >
                      <div
                        className="font-[Inter,sans-serif] text-sm font-semibold mb-2" style={{ color: colors.white }}
                      >
                        {sector.name}
                      </div>
                      <div
                        className="font-[Inter,sans-serif] text-[13px] text-white/[0.45] leading-[1.4] h-[40px] overflow-hidden mb-3"
                      >
                        {sector.connection}
                      </div>
                      <div className="flex items-baseline gap-[6px]">
                        <span
                          className="font-[Poppins,sans-serif] text-lg font-bold" style={{ color: colors.accent }}
                        >
                          {sector.multiplier}
                        </span>
                        <span
                          className="font-[Inter,sans-serif] text-[11px] text-white/40"
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
                  className="flex items-center gap-2 flex-wrap mb-7"
                >
                  {pathway.pathLabel.split(" \u2192 ").map((step, i, arr) => (
                    <React.Fragment key={i}>
                      <span
                        className="font-[Inter,sans-serif] text-[13px] py-[6px] px-[14px] rounded-full" style={{
                  fontWeight: i === 0 ? "700" : "500",
                  color: i === 0 ? colors.accent : "rgba(255,255,255,0.7)",
                  backgroundColor: i === 0 ? "rgba(184, 217, 53, 0.15)" : "rgba(255,255,255,0.05)"
                }}
                      >
                        {step}
                      </span>
                      {i < arr.length - 1 && <span className="text-sm" style={{ color: colors.accent }}>{"\u2192"}</span>}
                    </React.Fragment>
                  ))}
                </div>
              )}

              {/* 3-Column Detail */}
              <div
                className="grid" style={{
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                  gap: isMobile ? "20px" : "32px"
                }}
              >
                {/* Column 1: Why It Matters — always visible */}
                <div>
                  <h4
                    className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1px] mt-0 ml-0 mr-0 mb-4" style={{ color: colors.accent }}
                  >
                    Why It Matters
                  </h4>
                  <p
                    className="font-[Inter,sans-serif] text-[15px] text-white/70 leading-[1.6] mt-0 ml-0 mr-0 mb-5"
                  >
                    {pathway.impact}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-[Poppins,sans-serif] font-bold" style={{
                  fontSize: isMobile ? "28px" : "32px",
                  color: colors.accent
                }}
                    >
                      {pathway.multiplier}
                    </span>
                    <span className="font-[Inter,sans-serif] text-[13px] text-white/40">
                      value multiplier
                    </span>
                  </div>
                </div>

                {/* Column 2: Synergy Pathways — collapsible on mobile */}
                {(!isMobile || showMoreRipple) && (
                  <div>
                    <h4
                      className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1px] mt-0 ml-0 mr-0 mb-4" style={{ color: colors.accent }}
                    >
                      Synergy Pathways
                    </h4>
                    <div className="flex flex-col gap-[10px]">
                      {pathway.synergies.map((synergy, i) => (
                        <div
                          key={i}
                          className="py-[10px] px-[16px] rounded-[10px] bg-white/5" style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                        >
                          <span
                            className="font-[Inter,sans-serif] text-[13px] text-white/[0.75] leading-[1.3] whitespace-nowrap overflow-hidden text-ellipsis block"
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
                      className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1px] mt-0 ml-0 mr-0 mb-4" style={{ color: colors.accent }}
                    >
                      Linked Ventures
                    </h4>
                    <div className="flex flex-col gap-[10px]">
                      {pathway.bridgeVentures.map((venture, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center py-[14px] px-[18px] rounded-[12px]" style={{
                  backgroundColor: "rgba(184, 217, 53, 0.1)",
                  border: "1px solid rgba(184, 217, 53, 0.15)"
                }}
                        >
                          <span
                            className="font-[Inter,sans-serif] text-sm font-semibold" style={{ color: colors.white }}
                          >
                            {venture}
                          </span>
                          <span className="text-base" style={{ color: colors.accent }}>{"\u2192"}</span>
                        </div>
                      ))}
                    </div>
                    <a
                      href={SECTOR_ROUTES[pathway.name] || "/sectors"}
                      onClick={(e) => { e.preventDefault(); navigate(SECTOR_ROUTES[pathway.name] || "/sectors"); }}
                      className="inline-flex items-center gap-2 mt-5 font-[Inter,sans-serif] text-sm font-semibold no-underline" style={{ color: colors.accent }}
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
                  className="flex items-center justify-center gap-2 w-full p-[14px] mt-4 bg-transparent rounded-[12px] font-[Inter,sans-serif] text-sm font-semibold cursor-pointer" style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: colors.white
                }}
                >
                  {showMoreRipple ? "Show less" : "Show more details"}
                  <ChevronDown size={14} strokeWidth={2.5} color={colors.white} className="transition-transform duration-300 ease-in-out" style={{ transform: showMoreRipple ? "rotate(180deg)" : "none" }} />
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

const CONTENT_MAX_WIDTH = layout.maxWidth;

const InvestmentCTASection = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
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
        padding: isMobile ? "60px 0" : "100px 80px"
                }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Section Header */}
        <div
          style={{
            textAlign: isMobile ? "center" : "left",
            marginBottom: isMobile ? "32px" : "48px",
            padding: isMobile ? "0 20px" : 0
                }}
        >
          <span
            className="inline-block py-[10px] px-[20px] rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6" style={{
                  backgroundColor: colors.white,
                  border: `1px solid ${colors.line}`,
                  color: colors.primary
                }}
          >
            The Investment Thesis
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[820px]" style={{
                  fontSize: isMobile ? "28px" : "42px",
                  color: colors.primary,
                  margin: isMobile ? "0 auto 16px" : "0 0 16px 0"
                }}
          >
            Every Stakeholder Has a Role in{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>Health Equity</span>
          </h2>
          <p
            className="font-[Inter,sans-serif] text-base text-[#666] leading-[1.65] max-w-[700px]" style={{ margin: isMobile ? "0 auto" : "0" }}
          >
            Investment isn{"\u2019"}t only capital — it{"\u2019"}s expertise, partnerships, policy, and vision. See how
            your role contributes to {sectorData.ventures} ventures across {sectorData.capitalRange} in opportunity.
          </p>
        </div>

        {/* Audience Selector */}
        {isMobile ? (
          <div
            className="flex justify-center gap-3 mb-6" style={{ padding: "0 20px" }}
          >
            {audiences.map((aud, idx) => {
              const isActive = activeAudience === idx;
              return (
                <button
                  key={aud.key}
                  onClick={() => setActiveAudience(idx)}
                  className="flex flex-col items-center gap-[6px] bg-none border-none p-[8px] cursor-pointer transition-all duration-200 ease-in-out" style={{
                  opacity: isActive ? 1 : 0.4                }}
                >
                  <div
                    className="w-[44px] h-[44px] rounded-[12px] flex items-center justify-center transition-all duration-200 ease-in-out" style={{
                  backgroundColor: isActive ? colors.primary : colors.background,
                  border: isActive ? "none" : `1px solid ${colors.line}`,
                  color: isActive ? colors.accent : colors.primary                }}
                  >
                    {aud.icon}
                  </div>
                  <span
                    className="font-[Inter,sans-serif] text-[10px] font-semibold" style={{ color: colors.primary }}
                  >
                    {aud.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-start gap-3 mb-10">
            {audiences.map((aud, idx) => {
              const isActive = activeAudience === idx;
              return (
                <button
                  key={aud.key}
                  onClick={() => setActiveAudience(idx)}
                  className="flex items-center gap-2 py-[6px] px-[16px] rounded-full font-[Inter,sans-serif] text-[12px] cursor-pointer shrink-0 transition-all duration-200 ease-in-out" style={{
                  border: isActive ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                  backgroundColor: isActive ? colors.accentLight : "transparent",
                  color: isActive ? colors.primary : "#999",
                  fontWeight: isActive ? "700" : "500"                }}
                >
                  <span
                    className="flex transition-all duration-200 ease-in-out" style={{
                  color: isActive ? colors.primary : "#999"                }}
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
          className="grid items-stretch" style={{
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                  gap: isMobile ? "24px" : "40px",
                  padding: isMobile ? "0 20px" : 0
                }}
        >
          {/* LEFT COLUMN: Audience Content */}
          <div className="flex flex-col justify-between">
            {/* Headline — desktop only */}
            {!isMobile && (
              <h3
                className="font-[Inter,sans-serif] text-[32px] font-light leading-[1.25] tracking-[-0.3px] mt-0 ml-0 mr-0 mb-4" style={{ color: colors.primary }}
              >
                {activeAudienceData.headline}
              </h3>
            )}
            {/* Pitch — desktop only */}
            {!isMobile && (
              <p
                className="font-[Inter,sans-serif] text-[15px] text-[#555] leading-[1.7] mt-0 ml-0 mr-0 mb-6 min-h-[100px]"
              >
                {activeAudienceData.pitch}
              </p>
            )}

            {/* Stat cards — 3 columns */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {activeAudienceData.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="rounded-[12px] text-center flex flex-col justify-center" style={{
                  backgroundColor: colors.white,
                  padding: isMobile ? "16px 10px" : "18px 14px",
                  border: `1px solid ${colors.line}`,
                  minHeight: isMobile ? "auto" : "110px"
                }}
                >
                  <div
                    className="font-[Poppins,sans-serif] font-bold leading-[1.1] mb-1" style={{
                  fontSize: isMobile ? "20px" : "26px",
                  color: colors.accent
                }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="font-[Inter,sans-serif] font-semibold mb-0.5" style={{
                  fontSize: isMobile ? "11px" : "12px",
                  color: colors.primary
                }}
                  >
                    {stat.label}
                  </div>
                  <div className="font-[Inter,sans-serif] text-[10px] text-[#888]">{stat.detail}</div>
                </div>
              ))}
            </div>

            {/* Engagement Pathways */}
            <div className="flex-1 flex flex-col gap-[10px] mb-5">
              <div
                className="font-[Inter,sans-serif] text-[11px] font-bold uppercase tracking-[1px] mb-1 opacity-[0.5]" style={{ color: colors.primary }}
              >
                Your Engagement
              </div>
              {activeAudienceData.pathways.map((path, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 py-[12px] px-[16px] rounded-[10px]" style={{
                  backgroundColor: colors.white,
                  border: `1px solid ${colors.line}`
                }}
                >
                  <div className="flex flex-col gap-1 flex-1">
                    <div
                      className="font-[Inter,sans-serif] text-[12px] font-semibold" style={{ color: colors.primary }}
                    >
                      {path.bring}
                    </div>
                    <div
                      className="font-[Inter,sans-serif] text-[12px] text-[#777] leading-[1.5]"
                    >
                      {path.get}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Validation Bar */}
            <div
              className="py-[14px] px-[18px] rounded-[12px] flex items-center gap-3" style={{ backgroundColor: "rgba(27, 77, 62, 0.06)" }}
            >
              <div className="shrink-0 flex" style={{ color: colors.primary }}>
                <IconCheck />
              </div>
              <div className="font-[Inter,sans-serif] text-[13px] text-[#444] leading-[1.5]">
                <strong style={{ color: colors.primary }}>Ghana Health Service</strong> aligned with national healthcare
                targets
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Returns / Timeline / Impact Panel */}
          {(!isMobile || showInvestmentDetails) && (
            <div
              className="flex flex-col" style={{
                  backgroundColor: colors.primary,
                  borderRadius: isMobile ? "16px" : "20px",
                  padding: isMobile ? "20px" : "28px"
                }}
            >
              {/* Tab Selector */}
              <div
                className="flex bg-white/[0.08] rounded-[12px] p-[4px] mb-5 shrink-0"
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className="flex-1 border-none py-[12px] px-[20px] rounded-[10px] text-sm font-[Inter,sans-serif] cursor-pointer transition-all duration-200 ease-in-out" style={{
                  backgroundColor: activeTab === tab.key ? colors.accent : "transparent",
                  color: activeTab === tab.key ? colors.primary : "rgba(255,255,255,0.5)",
                  fontWeight: activeTab === tab.key ? "700" : "500"                }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content Cards */}
              <div className="flex flex-col gap-[10px] flex-1 justify-center">
                {tabContent[activeTab].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 rounded-[12px] flex gap-4 items-center" style={{ padding: isMobile ? "16px" : "18px 20px" }}
                  >
                    <div className="shrink-0" style={{ width: isMobile ? "80px" : "110px" }}>
                      <div
                        className="font-[Poppins,sans-serif] font-bold leading-[1.1]" style={{
                  fontSize: isMobile ? "20px" : "22px",
                  color: colors.accent
                }}
                      >
                        {item.value}
                      </div>
                      <div
                        className="font-[Inter,sans-serif] text-[9px] text-white/[0.35] uppercase tracking-[0.5px] mt-1 leading-[1.3]"
                      >
                        {item.label}
                      </div>
                    </div>
                    <div
                      className="font-[Inter,sans-serif] text-[13px] text-white/70 leading-[1.55] flex-1" style={{
                  borderLeft: "1px solid rgba(255,255,255,0.1)",
                  paddingLeft: "16px"
                }}
                    >
                      {item.detail}
                    </div>
                  </div>
                ))}
              </div>

              {/* Prospectus Bar */}
              <div
                className="mt-4 py-[14px] px-[20px] bg-white/5 rounded-[12px] flex justify-between items-center shrink-0"
              >
                <span className="font-[Inter,sans-serif] text-[13px] text-white/[0.45]">
                  Full financial model available
                </span>
                <a
                  href="/resources"
                  onClick={(e) => { e.preventDefault(); navigate("/resources"); }}
                  className="font-[Inter,sans-serif] text-sm font-bold no-underline inline-flex items-center gap-[6px] shrink-0" style={{ color: colors.accent }}
                >
                  Download Prospectus <span className="text-base">{"\u2192"}</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        {isMobile && !showInvestmentDetails && (
          <button
            onClick={() => setShowInvestmentDetails(true)}
            className="flex items-center justify-center gap-2 p-[14px] bg-transparent rounded-[12px] font-[Inter,sans-serif] text-sm font-semibold cursor-pointer" style={{
                  width: "calc(100% - 40px)",
                  margin: "16px 20px 0",
                  border: `1px solid ${colors.line}`,
                  color: colors.primary
                }}
          >
            View returns, timeline & impact
            <ChevronDown size={14} strokeWidth={2.5} color={colors.primary} />
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
        className="py-[20px] px-[18px]" style={{
                  backgroundColor: index % 2 === 0 ? colors.white : "transparent",
                  opacity: animate ? 1 : 0,
                  transition: `opacity 0.4s ease ${index * 80}ms`
                }}
      >
        {/* Top row: Number (left) + Trend tag & Ventures box (right) */}
        <div
          className="flex justify-between items-start mb-[14px]"
        >
          <div
            className="font-[Poppins,sans-serif] text-[32px] font-bold tracking-[-1px] leading-[1.1]" style={{ color: colors.primary }}
          >
            {display}
          </div>
          <div
            className="flex flex-col items-end gap-[6px] shrink-0" style={{ maxWidth: "55%" }}
          >
            <div
              className="font-[DM_Sans,sans-serif] text-[10px] font-bold uppercase tracking-[0.5px]" style={{ color: colors.accent }}
            >
              {item.trend}
            </div>
            <div
              className="rounded-[10px] py-[6px] px-[10px] text-right" style={{ backgroundColor: index % 2 === 0 ? colors.background : "rgba(27,77,62,0.04)" }}
            >
              <div
                className="font-[DM_Sans,sans-serif] text-[9px] font-bold text-[#aaa] uppercase tracking-[1px] mb-0.5"
              >
                VENTURES
              </div>
              <div
                className="font-[DM_Sans,sans-serif] text-[11px] font-medium leading-[1.3]" style={{ color: colors.primary }}
              >
                {item.ventures}
              </div>
            </div>
          </div>
        </div>
        {/* Label */}
        <div
          className="font-[DM_Sans,sans-serif] text-[15px] font-bold mb-1" style={{ color: colors.primary }}
        >
          {item.label}
        </div>
        {/* Description */}
        <div className="font-[DM_Sans,sans-serif] text-[13px] text-[#666] leading-[1.5]">
          {item.description}
        </div>
      </div>
    );
  }

  return (
    <div
      className="grid gap-8 py-[24px] px-[28px] items-center" style={{
                  gridTemplateColumns: "200px 1fr 200px",
                  backgroundColor: index % 2 === 0 ? colors.white : "transparent",
                  opacity: animate ? 1 : 0,
                  transition: `opacity 0.4s ease ${index * 80}ms`
                }}
    >
      {/* Number + trend */}
      <div>
        <span
          className="font-[DM_Sans,sans-serif] text-[10px] font-bold uppercase tracking-[0.5px] block mb-1" style={{ color: colors.accent }}
        >
          {item.trend}
        </span>
        <div
          className="font-[Poppins,sans-serif] text-[36px] font-bold tracking-[-1px] leading-[1.1]" style={{ color: colors.primary }}
        >
          {display}
        </div>
      </div>
      {/* Label + description */}
      <div>
        <div
          className="font-[DM_Sans,sans-serif] text-[15px] font-bold mb-0.5" style={{ color: colors.primary }}
        >
          {item.label}
        </div>
        <div className="font-[DM_Sans,sans-serif] text-[13px] text-[#666] leading-[1.5]">
          {item.description}
        </div>
      </div>
      {/* Linked ventures */}
      <div
        className="rounded-[10px] py-[10px] px-[16px]" style={{ backgroundColor: index % 2 === 0 ? colors.background : "rgba(27,77,62,0.04)" }}
      >
        <div
          className="font-[DM_Sans,sans-serif] text-[9px] font-bold text-[#aaa] uppercase tracking-[1px] mb-1"
        >
          LINKED VENTURES
        </div>
        <div className="font-[DM_Sans,sans-serif] text-[11px] font-medium" style={{ color: colors.primary }}>
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
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-0">
          <span
            className="inline-block py-[10px] px-[20px] rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6" style={{
                  backgroundColor: colors.white,
                  color: colors.primary,
                  border: `1px solid ${colors.line}`
                }}
          >
            The Impact
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light mt-0 ml-0 mr-0 mb-3 tracking-[-0.5px] leading-[1.2]" style={{
                  fontSize: isMobile ? "28px" : "42px",
                  color: colors.primary
                }}
          >
            What Changes When <span className="font-semibold">Health</span>
            <br />
            <span className="font-semibold">Systems</span>{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>Work</span>
          </h2>
          <p
            className="font-[Inter,sans-serif] text-[#555] mt-0 ml-0 mr-0 mb-10 max-w-[750px] leading-[1.7]" style={{ fontSize: isMobile ? "14px" : "16px" }}
          >
            When clinics serve communities, medicines reach patients, and health data drives decisions — the ripple
            effects extend productive lives, reduce catastrophic costs, and protect family prosperity across Ghana.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex justify-start mb-6">
          <div
            className="inline-flex items-center rounded-full" style={{
                  gap: isMobile ? "6px" : "12px",
                  border: `1px solid ${colors.line}`,
                  padding: isMobile ? "4px" : "5px",
                  backgroundColor: colors.white
                }}
          >
            {/* View Toggle */}
            <div
              className="inline-flex rounded-full overflow-hidden shrink-0" style={{
                  backgroundColor: colors.background,
                  padding: isMobile ? "2px" : "3px"
                }}
            >
              {["metrics", "stakeholder"].map((v) => (
                <button
                  key={v}
                  onClick={() => switchView(v)}
                  className="rounded-full border-none cursor-pointer font-[Inter,sans-serif] transition-all duration-200 ease-in-out" style={{
                  padding: isMobile ? "5px 10px" : "6px 14px",
                  fontSize: isMobile ? "11px" : "12px",
                  backgroundColor: view === v ? colors.white : "transparent",
                  color: view === v ? colors.primary : "#999",
                  fontWeight: view === v ? "700" : "500",
                  boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none"                }}
                >
                  {v === "metrics" ? (isMobile ? "Metric" : "By Metric") : isMobile ? "Stakeholder" : "By Stakeholder"}
                </button>
              ))}
            </div>
            {/* Vertical Divider */}
            <div className="w-px h-5 shrink-0" style={{ backgroundColor: colors.line }} />
            {/* Sub-filter pills */}
            {view === "metrics"
              ? impactMetrics.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => switchCategory(i)}
                    className="rounded-full cursor-pointer font-[Inter,sans-serif] whitespace-nowrap shrink-0 transition-all duration-200 ease-in-out" style={{
                  padding: isMobile ? "5px 8px" : "6px 14px",
                  fontSize: isMobile ? "10px" : "12px",
                  fontWeight: activeCategory === i ? "700" : "500",
                  color: activeCategory === i ? colors.primary : "#999",
                  backgroundColor: activeCategory === i ? colors.accentLight : "transparent",
                  border: activeCategory === i ? `1.5px solid ${colors.accent}` : "1.5px solid transparent"                }}
                  >
                    {cat.category}
                  </button>
                ))
              : impactStakeholders.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => switchStakeholder(i)}
                    className="rounded-full cursor-pointer font-[Inter,sans-serif] whitespace-nowrap shrink-0 transition-all duration-200 ease-in-out" style={{
                  padding: isMobile ? "5px 8px" : "6px 14px",
                  fontSize: isMobile ? "10px" : "12px",
                  fontWeight: activeStakeholder === i ? "700" : "500",
                  color: activeStakeholder === i ? colors.primary : "#999",
                  backgroundColor: activeStakeholder === i ? colors.accentLight : "transparent",
                  border: activeStakeholder === i ? `1.5px solid ${colors.accent}` : "1.5px solid transparent"                }}
                  >
                    {s.title.split(" ")[1]}
                  </button>
                ))}
          </div>
        </div>

        {/* Content Area */}
        {view === "metrics" ? (
          <div
            className="rounded-[20px] overflow-hidden" style={{
                  backgroundColor: colors.background,
                  border: `2px solid ${colors.primary}`
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
              className="flex justify-between mb-6" style={{
                  alignItems: isMobile ? "flex-start" : "center",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? "12px" : "0"
                }}
            >
              <div>
                <h3
                  className="font-[DM_Sans,sans-serif] font-bold mt-0 ml-0 mr-0 mb-1" style={{
                  fontSize: isMobile ? "24px" : "28px",
                  color: colors.primary
                }}
                >
                  {currentStakeholder.title}
                </h3>
                <p className="font-[DM_Sans,sans-serif] text-sm text-[#888] m-0">
                  {currentStakeholder.subtitle}
                </p>
              </div>
              <div style={{ textAlign: isMobile ? "left" : "right" }}>
                <div
                  className="font-[Poppins,sans-serif] font-bold tracking-[-1.5px] leading-[1]" style={{
                  fontSize: isMobile ? "32px" : "40px",
                  color: colors.primary
                }}
                >
                  {currentStakeholder.stat}
                </div>
                <div className="font-[DM_Sans,sans-serif] text-[12px] text-[#888] mt-1">
                  {currentStakeholder.statLabel}
                </div>
              </div>
            </div>
            {/* Outcome rows */}
            <div className="flex flex-col gap-[6px]">
              {currentStakeholder.outcomes.map((outcome, i) => (
                <div
                  key={i}
                  className="flex items-center gap-[14px] rounded-[12px]" style={{
                  padding: isMobile ? "12px 16px" : "14px 20px",
                  backgroundColor: i % 2 === 0 ? colors.background : "transparent"
                }}
                >
                  <div
                    className="w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: i % 2 === 0 ? colors.white : colors.background }}
                  >
                    <span
                      className="font-[DM_Sans,sans-serif] text-[12px] font-bold" style={{ color: colors.primary }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <span
                    className="font-[DM_Sans,sans-serif] text-[15px] text-[#333] leading-[1.5]"
                  >
                    {outcome}
                  </span>
                </div>
              ))}
            </div>
            {/* Key Advantage strip */}
            <div
              className="mt-6 rounded-[12px] flex items-center flex-wrap" style={{
                  padding: isMobile ? "14px 18px" : "16px 24px",
                  backgroundColor: colors.primary,
                  gap: isMobile ? "10px" : "16px"
                }}
            >
              <span
                className="font-[DM_Sans,sans-serif] text-[10px] font-bold uppercase tracking-[1.5px] shrink-0" style={{ color: colors.accent }}
              >
                KEY ADVANTAGE
              </span>
              <span
                className="font-[DM_Sans,sans-serif] text-sm font-medium text-white/[0.85]"
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
// FINAL CTA SECTION
// ============================================================================

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function HealthSystemsSectorPage() {
  return (
    <SectorPageTemplate
      sector={sectorData}
      renderProblemSection={() => <ProblemSection />}
      renderValueChainSection={() => <ValueChainSectionPremium />}
      renderEcosystemSection={() => <CompetitiveLandscapeSection sector={sectorData} />}
      renderCrossSectorSection={() => <CrossSectorSection />}
      renderInvestmentSection={() => <InvestmentCTASection />}
      renderImpactSection={() => <ImpactSection />}
      policies={policyData}
      policyTitle={
        <>
          Moving in Step with Ghana{"\u2019"}s{" "}
          <span className="font-semibold" style={{ color: colors.accent }}>Healthcare Priorities</span>
        </>
      }
      policySubtitle="BRIDGE ventures align directly with GH&#8373;19.5+ billion in government health commitments and the Care24 pillar of the 24-Hour Economy — creating pathways for public-private collaboration."
      policyCategories={[
        { id: "all", label: "All", short: "All" },
        { id: "funding", label: "Funding & Incentives", short: "Funding" },
        { id: "infrastructure", label: "Infrastructure", short: "Infra" },
        { id: "partnerships", label: "Partnerships", short: "Partners" },
      ]}
      ctaHeading={
        <>
          From Understanding to{" "}
          <span className="font-bold" style={{ color: colors.accent }}>Action</span>
        </>
      }
      ctaDescription="Our health systems analysis maps every opportunity, every alignment, every pathway to wellbeing. Request access to explore the complete research."
      ctaPrimaryButtonText="Request Full Access"
      ctaPrimaryButtonLink="/login"
    />
  );
}
