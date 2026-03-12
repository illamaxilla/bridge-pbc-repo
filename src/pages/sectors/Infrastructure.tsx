import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { IconBuilding, IconBlocks, IconWallet, IconCross, IconCpu, IconGraduationCap, IconSprout, IconCamera, IconHome, IconLuggage, IconBatteryCharging, IconFactory, IconTruck, IconWheat, IconZap, IconDroplet, IconArrowRight, IconArrowDown, IconCheck, IconWarning, IconUsers, IconShield, IconSun, IconDollar, IconTarget, IconStorefront, IconOfficeBuilding, IconLandmark, IconTrendingUp } from "@/components/icons/SectorIcons";
import { ArrowRight, Building2, Check, ChevronDown, Clock, DollarSign, Settings, Users, Wrench } from "lucide-react";
import { FOOTER_SECTOR_ICONS, SECTOR_ROUTES } from "@/data/sectorIcons";
import { useCounter } from "@/hooks/useCounter";

// ============================================================================
// BRIDGE SECTOR PAGE: Infrastructure & Basic Services
// Following established design system from Agriculture sector page
// ============================================================================
// Design System: Dark Green #1B4D3E, Lime #B8D935, Off-white #F3F5F2
// ============================================================================

import { colors, layout } from "@/lib/theme";
import { useIsMobile } from "@/hooks/useIsMobile";

const CONTENT_MAX_WIDTH = layout.maxWidth;

// ============================================================================
// SECTOR DATA - Infrastructure & Basic Services
// ============================================================================

const sectorData = {
  id: 1,
  slug: "infrastructure",
  name: "Infrastructure & Basic Services",
  shortName: "Infrastructure",
  category: "Essential Systems",
  categoryColor: "#1B4D3E",

  capitalRange: "$8-15M",
  ventures: 18,
  jobsImpact: "10,000+ traders",
  gdpContribution: "Foundation",

  problemHeadline: "The Foundation Beneath Every Thriving Community",
  problemSubheadline:
    "Ghana's infrastructure sector holds immense potential — from modernizing water systems serving 32M+ citizens, to capturing the 32% of energy currently lost in transmission, to upgrading market facilities where thousands of traders build livelihoods daily. These are pathways where targeted investment and innovation can unlock transformative public benefit.",

  keyStats: [
    { value: "32M+", label: "Citizens to Serve", detail: "Water & sanitation addressable market" },
    { value: "44.4%", label: "Water Access Today", detail: "Room to more than double coverage" },
    { value: "32%", label: "Energy Recapture Potential", detail: "Lost in transmission today" },
    { value: "95%", label: "Donor-Funded WASH", detail: "Government contributes just 5%" },
  ],

  painPoints: [
    {
      title: "Water Systems Modernization",
      description:
        "Over half of Ghana's population lacks safely managed water — a transformative opportunity for smart distribution.",
      rootCauses: [
        "System renewal potential",
        "Revenue recapture (50% non-revenue water)",
        "Policy alignment opportunity",
      ],
      quantification: "55.6% addressable market for safely managed water",
    },
    {
      title: "Sanitation & Public Health",
      description:
        "23% of the population is unserved by modern sanitation — significant demand for dignified, scalable networks.",
      rootCauses: ["23% addressable market", "Standards modernization", "Treatment infrastructure gap"],
      quantification: "7,653 lives impactable annually; GH₵1.7B opportunity",
    },
    {
      title: "Market Facility Upgrades",
      description:
        "Thousands of traders are ready for modern facilities with reliable power, drainage, and digital services.",
      rootCauses: ["Energy independence opportunity", "Solar micro-grid potential", "Resilience infrastructure"],
      quantification: "10,000+ traders ready; 32% energy recapture potential",
    },
    {
      title: "Urban Resilience & Drainage",
      description:
        "Growing urban centers present opportunities for green infrastructure corridors and climate-resilient design.",
      rootCauses: ["Regulatory framework opportunity", "Green infrastructure corridor", "Maintenance economy creation"],
      quantification: "260+ districts with green infrastructure potential",
    },
  ],

  solutions: [
    {
      tier: 1,
      name: "Market Resilience Platform",
      description:
        "Comprehensive market services integrating power, water, sanitation, security, and digital tools under unified governance.",
      capital: "$2-5M",
      score: 41,
      impact: "Flagship model for 10,000+ traders",
      model: "Kejetia Market pilot",
    },
    {
      tier: 1,
      name: "Market Solar Micro-Grid",
      description: "Grid-independent solar+battery systems ensuring reliable power regardless of utility performance.",
      capital: "$500K-2M",
      score: 41,
      impact: "Eliminates grid dependency",
      model: "Industrial park model adaptation",
    },
    {
      tier: 1,
      name: "Public Toilet Networks",
      description: "Modern pay-per-use facilities with professional management and mobile payment integration.",
      capital: "$150-400K",
      score: 41,
      impact: "Dignified sanitation access",
      model: "Clean Team model scaling",
    },
    {
      tier: 1,
      name: "Market Fire Safety Systems",
      description: "Detection, suppression, emergency access, and trader education preventing catastrophic losses.",
      capital: "$200-600K",
      score: 39,
      impact: "Zero fire incident target",
      model: "Integrated safety protocols",
    },
    {
      tier: 1,
      name: "Market Cold Storage",
      description: "Solar-powered cold rooms reducing perishable losses for market traders.",
      capital: "$200-500K",
      score: 38,
      impact: "50% reduction in perishable loss",
      model: "Pay-per-use mobile money",
    },
    {
      tier: 2,
      name: "Community Water Kiosks",
      description: "IoT-enabled prepaid water dispensing addressing daily shortages and eliminating vendor markup.",
      capital: "$300K-1M",
      score: 37,
      impact: "Reliable water at utility rates",
      model: "CWSA partnership potential",
    },
    {
      tier: 2,
      name: "Neighborhood Resilience Hubs",
      description: "Clustered WASH + power + digital services around schools, clinics, and community centers.",
      capital: "$150-400K each",
      score: 36,
      impact: "Peri-urban service delivery",
      model: "Multi-service platform",
    },
    {
      tier: 2,
      name: "Waste-to-Compost Facility",
      description: "Organic waste processing with market integration, creating circular economy value.",
      capital: "$500K-1.5M",
      score: 35,
      impact: "Addresses waste accumulation",
      model: "Farmer offtake agreements",
    },
    {
      tier: 2,
      name: "Infrastructure Data Platform",
      description: "Open data tracking infrastructure conditions and service quality for accountability.",
      capital: "$100-200K",
      score: 33,
      impact: "Transparency and evidence",
      model: "Community monitoring",
    },
  ],

  competitors: [
    {
      name: "Zoomlion Ghana",
      focus: "Waste management services",
      gap: "Service expansion potential",
      year: "2006",
      funding: "Private",
      priority: "Medium",
      marketShare: "60%",
      coverage: "National",
      employees: "5,000+",
      strengths: [
        { name: "National Coverage", rating: 5 },
        { name: "Equipment Fleet", rating: 4 },
        { name: "Government Relations", rating: 5 },
      ],
      gaps: ["Partnership expansion", "Joint innovation potential", "Complementary coverage"],
      bridgeOpportunity: "Complementary services in market areas",
      partnershipType: "Collaborate",
      synergyAreas: ["Market sanitation services", "Waste collection at hubs", "Equipment sharing"],
    },
    {
      name: "Ghana Water Company",
      focus: "Urban water supply",
      gap: "Network modernization opportunity",
      year: "1965",
      funding: "Gov't",
      priority: "High",
      marketShare: "85%",
      coverage: "Urban",
      employees: "3,500+",
      strengths: [
        { name: "Infrastructure Base", rating: 4 },
        { name: "Utility License", rating: 5 },
        { name: "Urban Coverage", rating: 4 },
      ],
      gaps: ["Network modernization potential", "Revenue optimization opportunity", "Technology integration readiness"],
      bridgeOpportunity: "Partnership for market water services",
      partnershipType: "Collaborate",
      synergyAreas: ["Last-mile distribution", "IoT monitoring tech", "Payment systems"],
    },
    {
      name: "ECG / NEDCo",
      focus: "Electricity distribution",
      gap: "32% recapture potential; $2.2B investment pipeline",
      year: "1967",
      funding: "Gov't",
      priority: "Low",
      marketShare: "95%",
      coverage: "National",
      employees: "8,000+",
      strengths: [
        { name: "Grid Infrastructure", rating: 4 },
        { name: "Regulatory Position", rating: 5 },
        { name: "National Mandate", rating: 5 },
      ],
      gaps: ["Grid modernization pipeline", "Distributed energy opportunity", "Smart metering potential"],
      bridgeOpportunity: "Independent power solutions bypassing grid",
      partnershipType: "Parallel",
      synergyAreas: ["Off-grid solar", "Backup systems", "Smart metering"],
    },
    {
      name: "Clean Team Ghana",
      focus: "Container-based sanitation",
      gap: "Commercial expansion opportunity",
      year: "2012",
      funding: "$5M+",
      priority: "High",
      marketShare: "5%",
      coverage: "Kumasi, Accra",
      employees: "200+",
      strengths: [
        { name: "Sanitation Model", rating: 5 },
        { name: "Service Quality", rating: 5 },
        { name: "Customer Experience", rating: 4 },
      ],
      gaps: ["Scale-up potential", "Commercial market expansion", "Regional growth opportunity"],
      bridgeOpportunity: "Commercial/market toilet partnership",
      partnershipType: "Partner",
      synergyAreas: ["Market toilet operations", "Franchise model", "Training programs"],
    },
    {
      name: "MMDAs",
      focus: "Local infrastructure management",
      gap: "Sustainability partnership potential",
      year: "Various",
      funding: "Gov't",
      priority: "High",
      marketShare: "N/A",
      coverage: "260+ districts",
      employees: "Varies",
      strengths: [
        { name: "Local Authority", rating: 5 },
        { name: "Regulatory Power", rating: 5 },
        { name: "Community Access", rating: 4 },
      ],
      gaps: ["Revenue diversification potential", "Capacity building opportunity", "PPP framework readiness"],
      bridgeOpportunity: "Essential partnership for all market initiatives",
      partnershipType: "Essential",
      synergyAreas: ["Market land access", "Permits & licensing", "Community engagement"],
    },
    {
      name: "Development Partners",
      focus: "WASH infrastructure funding",
      gap: "Impact partnership alignment",
      year: "Various",
      funding: "$100M+",
      priority: "Medium",
      marketShare: "N/A",
      coverage: "National",
      employees: "N/A",
      strengths: [
        { name: "Capital Access", rating: 5 },
        { name: "Technical Expertise", rating: 5 },
        { name: "Governance Standards", rating: 5 },
      ],
      gaps: ["Sustainability model transition", "Local ownership pathways", "Impact measurement alignment"],
      bridgeOpportunity: "Co-financing and technical partnerships",
      partnershipType: "Co-Invest",
      synergyAreas: ["Blended finance", "Technical assistance", "Impact measurement"],
    },
  ],

  policyAlignment: [
    {
      policy: "24-Hour Model Markets (DACF)",
      body: "Ministry of Local Government & Decentralisation",
      allocation: "GH₵2.2B+ (25% of DACF)",
      category: "funding",
      relevance: ["urban"],
      alignment:
        "Technical partner for model market construction across 260+ districts with design standards and infrastructure expertise.",
      bridgeRole:
        "Implementation partner providing market design blueprints, vendor digitization systems, and sanitation infrastructure standards.",
      bridgeVentures: ["Market Digitization Platform", "WASH Infrastructure"],
      pillars: ["Market blueprints", "Vendor digitization", "Sanitation standards"],
    },
    {
      policy: "Free SHS & Infrastructure Fund",
      body: "Ministry of Education / GETFund",
      allocation: "GH₵3.8B+",
      category: "funding",
      relevance: ["rural"],
      alignment:
        "School infrastructure expansion requiring water, sanitation, and power systems for new and existing facilities.",
      bridgeRole:
        "Infrastructure delivery partner providing WASH and solar solutions for educational facilities across underserved districts.",
      bridgeVentures: ["WASH Infrastructure", "Solar Micro-Grids"],
      pillars: ["School WASH", "Solar electrification", "Facility upgrades"],
    },
    {
      policy: "Ghana Water Company Ltd Recapitalization",
      body: "Ministry of Sanitation & Water Resources",
      allocation: "GH₵1.4B+",
      category: "funding",
      relevance: ["urban", "rural"],
      alignment:
        "Capital injection for network rehabilitation, meter replacement, and non-revenue water reduction across all service areas.",
      bridgeRole:
        "Smart metering and IoT monitoring partner reducing the 50% non-revenue water losses through technology deployment.",
      bridgeVentures: ["Water Kiosk Networks", "IoT Monitoring Systems"],
      pillars: ["Smart metering", "Leak detection", "Revenue recovery"],
    },
    {
      policy: "Build24 Infrastructure Pillar",
      body: "Ministry of Finance / Office of the President",
      allocation: "GH₵47.2B+",
      category: "infrastructure",
      relevance: ["urban", "rural"],
      alignment:
        "Direct alignment with infrastructure modernization including water, sanitation, and market facility upgrades nationwide.",
      bridgeRole:
        "Advisor and co-investor structuring blended finance vehicles for infrastructure delivery across priority districts.",
      bridgeVentures: ["Water Kiosk Networks", "Solar Micro-Grids", "Drainage SPV"],
      pillars: ["WASH systems", "Electrification", "Drainage"],
    },
    {
      policy: "National Electrification Scheme (NES)",
      body: "Ministry of Energy / Energy Commission",
      allocation: "GH₵2.8B+",
      category: "infrastructure",
      relevance: ["rural"],
      alignment:
        "Extending grid and off-grid electrification to underserved communities and market facilities across all 16 regions.",
      bridgeRole:
        "Solar micro-grid developer bridging last-mile electrification gaps where grid extension is not economically viable.",
      bridgeVentures: ["Solar Micro-Grids", "Market Infrastructure"],
      pillars: ["Off-grid solar", "Mini-grids", "Last-mile access"],
    },
    {
      policy: "Greater Accra Resilient & Integrated Development",
      body: "Ministry of Works & Housing / World Bank",
      allocation: "$200M IDA",
      category: "infrastructure",
      relevance: ["urban"],
      alignment:
        "Flood risk management and drainage infrastructure across Greater Accra with community resilience components.",
      bridgeRole:
        "Drainage SPV operator applying GARID design standards and community engagement models to market district flood management.",
      bridgeVentures: ["Drainage SPV", "Resilience Hubs"],
      pillars: ["Flood management", "Drainage systems", "Community resilience"],
    },
    {
      policy: "1D1F Tax Incentives",
      body: "Ghana Investment Promotion Centre (GIPC)",
      allocation: "5-10yr Tax Holidays",
      category: "tax",
      relevance: ["urban"],
      alignment:
        "Tax holidays and import duty exemptions for companies establishing factories and processing facilities in districts.",
      bridgeRole:
        "Leveraging 1D1F incentives to reduce capital costs for market infrastructure and light manufacturing ventures.",
      bridgeVentures: ["Market Infrastructure", "Cold Chain Hubs"],
      pillars: ["Import exemptions", "Tax holidays", "Capital allowances"],
    },
    {
      policy: "GIPC Incentives for Priority Sectors",
      body: "Ghana Investment Promotion Centre (GIPC)",
      allocation: "Up to 50% Tax Rebate",
      category: "tax",
      relevance: ["urban", "rural"],
      alignment:
        "Location-based tax incentives with higher rebates for investments outside Accra and Tema encouraging regional development.",
      bridgeRole:
        "Structuring ventures in secondary cities and rural districts to maximize GIPC regional incentive eligibility.",
      bridgeVentures: ["Water Kiosk Networks", "Solar Micro-Grids"],
      pillars: ["Regional rebates", "Location incentives", "Priority sectors"],
    },
    {
      policy: "Free Zones Act (Act 504)",
      body: "Ghana Free Zones Authority",
      allocation: "10yr Tax Exemption",
      category: "tax",
      relevance: ["urban"],
      alignment:
        "Complete tax exemption and duty-free imports for enterprises operating within designated free zones for export-oriented activities.",
      bridgeRole:
        "Positioning cold chain and processing infrastructure within free zone frameworks to access duty-free equipment imports.",
      bridgeVentures: ["Cold Chain Hubs", "Market Infrastructure"],
      pillars: ["Duty-free imports", "Tax exemption", "Export processing"],
    },
    {
      policy: "National Water Policy 2024",
      body: "Ministry of Sanitation & Water Resources",
      allocation: "Policy Framework",
      category: "partnerships",
      relevance: ["rural"],
      alignment:
        "PPP mechanisms and sustainable financing models enabling private sector participation in water service delivery.",
      bridgeRole:
        "PPP structuring partner designing concession models and sustainable tariff mechanisms for community water systems.",
      bridgeVentures: ["Water Kiosk Networks", "IoT Monitoring Systems"],
      pillars: ["PPP mechanisms", "Tariff reform", "Revenue models"],
    },
    {
      policy: "PPP Act 2020 (Act 1039)",
      body: "Public Investment & Asset Management (PIAM)",
      allocation: "Regulatory Framework",
      category: "partnerships",
      relevance: ["urban", "rural"],
      alignment:
        "Legal framework enabling infrastructure partnerships with guidelines for private investment and risk sharing.",
      bridgeRole:
        "Compliance partner ensuring all ventures meet PPP Act requirements for transparent procurement and risk allocation.",
      bridgeVentures: ["All Ventures"],
      pillars: ["Contract structuring", "Risk allocation", "Procurement standards"],
    },
    {
      policy: "Ghana-World Bank Country Partnership Framework",
      body: "Ministry of Finance / World Bank Group",
      allocation: "$3.2B Pipeline",
      category: "partnerships",
      relevance: ["urban", "rural"],
      alignment:
        "Multi-sector partnership supporting infrastructure, urban resilience, and service delivery improvements across Ghana.",
      bridgeRole:
        "Co-implementation partner aligning venture delivery with World Bank project requirements and safeguard standards.",
      bridgeVentures: ["WASH Infrastructure", "Drainage SPV", "Resilience Hubs"],
      pillars: ["IDA financing", "Technical assistance", "Safeguard compliance"],
    },
  ],

  crossSector: [
    {
      sectorId: 2,
      name: "Financial Inclusion",
      connection: "Mobile payment infrastructure, service fees, asset-backed lending",
      multiplier: "3.2x",
      synergies: ["Digital payments at water kiosks", "Infrastructure-backed microloans", "Vendor fee collection"],
      bridgeVentures: ["Water Kiosk Networks", "Market Digitization"],
      impact: "Enables financial services through physical infrastructure touchpoints",
    },
    {
      sectorId: 3,
      name: "Health Systems",
      connection: "WASH for clinics, cold chain, reliable power for health facilities",
      multiplier: "4.1x",
      synergies: ["Clinic water systems", "Vaccine cold storage", "Solar-powered health posts"],
      bridgeVentures: ["WASH Infrastructure", "Solar Micro-Grids"],
      impact: "Reduces waterborne disease burden and enables modern healthcare delivery",
    },
    {
      sectorId: 6,
      name: "Agriculture",
      connection: "Cold storage, market linkages, irrigation infrastructure",
      multiplier: "2.8x",
      synergies: ["Post-harvest storage", "Market drainage systems", "Irrigation networks"],
      bridgeVentures: ["Market Infrastructure", "Cold Chain Hubs"],
      impact: "Reduces 40% post-harvest losses and connects farmers to markets",
    },
    {
      sectorId: 10,
      name: "Energy",
      connection: "Solar integration, grid reliability, off-grid solutions",
      multiplier: "2.5x",
      synergies: ["Market electrification", "Solar water pumping", "Backup power systems"],
      bridgeVentures: ["Solar Micro-Grids", "Energy Storage"],
      impact: "Provides reliable power bypassing unreliable grid infrastructure",
    },
    {
      sectorId: 11,
      name: "Manufacturing",
      connection: "Reliable power, water supply, industrial infrastructure",
      multiplier: "3.5x",
      synergies: ["Industrial water treatment", "Power reliability", "Waste management"],
      bridgeVentures: ["Industrial Parks", "Utility Services"],
      impact: "Enables light manufacturing and value-added processing",
    },
  ],

  relatedSectors: [
    { id: 2, name: "Financial Inclusion", icon: "wallet", reason: "Mobile payments, infrastructure finance" },
    { id: 6, name: "Agriculture", icon: "wheat", reason: "Cold storage, market infrastructure" },
    { id: 10, name: "Energy", icon: "zap", reason: "Solar power, grid independence" },
  ],
};

// ============================================================================
// VALUE CHAIN DATA - Infrastructure & Basic Services
// ============================================================================

const valueChainStages = [
  {
    id: 1,
    stage: "Planning",
    actor: "Gov't Agencies",
    population: "GWCL, CWSA, ECG, MMDAs",
    icon: "building",
    valueRetained: 100,
    valueLost: 0,
    painPoints: [
      "Domestic funding potential",
      "Policy partnership opportunities",
      "Capacity building pipeline",
      "Strategic alignment scope",
    ],
    stat: "95% aligned",
  },
  {
    id: 2,
    stage: "Construction",
    actor: "Contractors",
    population: "Formal & informal builders",
    icon: "tool",
    valueRetained: 80,
    valueLost: 20,
    painPoints: [
      "Efficiency gains 20-30%",
      "Quality systems integration",
      "Payment modernization",
      "Materials innovation",
    ],
    stat: "20-30% savings",
  },
  {
    id: 3,
    stage: "Operations",
    actor: "Operators",
    population: "Utilities & vendors",
    icon: "gear",
    valueRetained: 55,
    valueLost: 25,
    painPoints: [
      "32% recapture potential",
      "Smart maintenance systems",
      "IoT monitoring opportunity",
      "Revenue optimization",
    ],
    stat: "32% recapture ready",
  },
  {
    id: 4,
    stage: "Financing",
    actor: "Dev Partners",
    population: "$100M+ annually",
    icon: "dollar",
    valueRetained: 40,
    valueLost: 15,
    painPoints: [
      "Blended finance models",
      "Sustainability pathways",
      "Coordination platforms",
      "Local ownership transition",
    ],
    stat: "$100M+ annual flows",
  },
  {
    id: 5,
    stage: "Delivery",
    actor: "End Users",
    population: "32M+ population",
    icon: "users",
    valueRetained: 25,
    valueLost: 15,
    painPoints: ["Reliable supply systems", "Affordable access", "Community empowerment", "Dignified service delivery"],
    stat: "32M+ lives impacted",
  },
];

// Value Chain Icons - Enhanced with filled style
const valueChainIcons = {
  building: <Building2 size={28} fill="currentColor" strokeWidth={0} />,
  tool: <Wrench size={28} fill="currentColor" strokeWidth={0} />,
  gear: <Settings size={28} fill="currentColor" strokeWidth={0} />,
  dollar: <DollarSign size={28} fill="currentColor" strokeWidth={0} />,
  users: <Users size={28} fill="currentColor" strokeWidth={0} />,
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
              <span style={{ fontWeight: "700" }}>Infrastructure</span> &{!isMobile && <br />} Basic Services
            </h1>

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
              The foundation for a thriving community.
            </h2>

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

            {/* Main Stats */}
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

            {/* Stat Rows */}
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
      {/* Scroll to Explore */}
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
// PROBLEM CARD (Education-style pattern)
// ============================================================================

const ProblemCard = ({ problem, isExpanded, onToggle }) => {
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
      {/* Title + Priority Row */}
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
            color: colors.primary,
            backgroundColor: colors.accentLight,
            padding: "6px 14px",
            borderRadius: "20px",
            whiteSpace: "nowrap",
            flexShrink: 0,
            marginLeft: "12px",
          }}
        >
          {problem.severity}
        </span>
      </div>

      {/* Impact Bar */}
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

      {/* EXPANDED CONTENT */}
      {isExpanded && (
        <div
          style={{
            paddingTop: "16px",
            borderTop: `1px solid ${colors.line}`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Priority + Scale Row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            {/* Priority Card */}
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
                    color: colors.primary,
                    backgroundColor: colors.accentLight,
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
                    height: "100%",
                    width: `${problem.severityScore}%`,
                    backgroundColor: colors.primary,
                    borderRadius: "4px",
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            </div>

            {/* Scale Card */}
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
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
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

          {/* Opportunity Drivers */}
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              <Clock size={16} strokeWidth={2} color="#888" />
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
              {problem.rootCauses.map((cause, j) => (
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
                  <div style={{ display: "flex", flexDirection: "column", gap: "1px", minWidth: 0 }}>
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

          {/* BRIDGE Solution Footer */}
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
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
              <Check size={18} strokeWidth={2.5} color={colors.accent} />
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
                <ArrowRight size={14} strokeWidth={2} />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// PROBLEM SECTION
// ============================================================================

const ProblemSection = ({ sector }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const isMobile = useIsMobile();

  const enhancedPainPoints = [
    {
      ...sector.painPoints[0],
      severity: "High Priority",
      severityScore: 95,
      affectedCount: "32M+",
      affectedLabel: "affected",
      rootCauses: [
        { title: "System Renewal Potential", description: "Modernizing GWCL networks" },
        { title: "Revenue Recapture (50%)", description: "Non-revenue water recovery" },
        { title: "Policy Alignment Potential", description: "Tariff reform opportunity" },
        { title: "Untapped Capital Pipeline", description: "Investment-ready systems" },
      ],
      bridgeSolution: "Water Kiosks + IoT Monitoring",
    },
    {
      ...sector.painPoints[1],
      severity: "High Priority",
      severityScore: 92,
      affectedCount: "7,653",
      affectedLabel: "lives to impact",
      rootCauses: [
        { title: "23% Addressable Market", description: "Unserved population" },
        { title: "Standards Modernization", description: "Building code opportunity" },
        { title: "Treatment Infrastructure Gap", description: "Fecal sludge solutions" },
        { title: "Sustainability Transition", description: "Moving beyond donor models" },
      ],
      bridgeSolution: "Toilet Networks + Waste-to-Compost",
    },
    {
      ...sector.painPoints[2],
      severity: "High Priority",
      severityScore: 88,
      affectedCount: "10K+",
      affectedLabel: "market facilities",
      rootCauses: [
        { title: "Facility Modernization Scale", description: "Thousands of aging structures" },
        { title: "Revenue Model Opportunity", description: "Digital payment systems" },
        { title: "Cold Chain Gap", description: "40% post-harvest loss" },
        { title: "Government Mandate Alignment", description: "Model Market initiative" },
      ],
      bridgeSolution: "Kejetia Digitization Model",
    },
    {
      ...sector.painPoints[3],
      severity: "High Priority",
      severityScore: 85,
      affectedCount: "500K+",
      affectedLabel: "graduates to connect",
      rootCauses: [
        { title: "Curriculum Modernization", description: "Industry-aligned content" },
        { title: "Industry Partnership Potential", description: "Employer co-design" },
        { title: "Perception Shift Opportunity", description: "Skills-first culture" },
        { title: "Career Guidance Systems", description: "Labor market intelligence" },
      ],
      bridgeSolution: "Skills Bootcamps + TVET Partnership",
    },
  ];

  return (
    <section
      style={{
        backgroundColor: colors.background,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
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
              marginBottom: "24px",
            }}
          >
            The Opportunity
          </span>

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
            <span style={{ fontWeight: "600" }}>4 critical gaps</span> across water, sanitation, markets &amp; skills —
            each a <span style={{ color: colors.accent, fontWeight: "600" }}>proven pathway</span> to impact
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
            These aren't problems to solve — they're markets to build. Over half of Ghana's population lacks safely
            managed water, thousands of market facilities are poised for transformation.
          </p>
        </div>

        {/* Problem Cards Grid */}
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
          {enhancedPainPoints.map((problem, i) => (
            <div
              key={i}
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

        {/* Mobile scroll indicator dots */}
        {isMobile && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginTop: "16px",
              alignItems: "center",
            }}
          >
            {enhancedPainPoints.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === 0 ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "50px",
                  backgroundColor: i === 0 ? colors.accent : colors.line,
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
// VALUE CHAIN SECTION (Premium)
// ============================================================================

const ValueChainSectionPremium = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [showMoreDetail, setShowMoreDetail] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % valueChainStages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const activeData = valueChainStages[activeStage];

  return (
    <section
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "60px 20px" : "100px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: "absolute",
          top: "-200px",
          right: "-200px",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.accent}10 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1, maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        <div style={{ marginBottom: "60px", textAlign: "center" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: colors.white,
              color: colors.primary,
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Inter, sans-serif",
              marginBottom: "24px",
              border: `1px solid ${colors.line}`,
            }}
          >
            The Process
          </span>

          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
              color: colors.primary,
              margin: "0 auto 20px",
              maxWidth: "600px",
            }}
          >
            Mapping the <span style={{ color: colors.accent, fontWeight: "600" }}>Opportunity</span> at{" "}
            <span style={{ fontWeight: "600" }}>Every Stage</span>
          </h2>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              lineHeight: "1.65",
              color: "#666",
              maxWidth: "750px",
              margin: "0 auto",
            }}
          >
            From initial planning through community delivery — five stages where strategic resources and innovation
            create compounding value across Ghana's infrastructure systems.
          </p>
        </div>

        {/* Stage Navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: isMobile ? "center" : "space-between",
            marginBottom: isMobile ? "24px" : "48px",
            position: "relative",
            padding: isMobile ? "0" : "0 80px",
            gap: isMobile ? "12px" : "0",
            overflowX: isMobile ? "auto" : "visible",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Progress Line — grows behind icons as stages are reached */}
          {!isMobile && activeStage > 0 && (
            <div
              style={{
                position: "absolute",
                top: "26px",
                left: "106px",
                right: "106px",
                height: "2px",
                zIndex: 0,
              }}
            >
              <div
                style={{
                  height: "100%",
                  backgroundColor: colors.accent,
                  borderRadius: "2px",
                  width: `${(activeStage / (valueChainStages.length - 1)) * 100}%`,
                  transition: "width 0.5s ease",
                }}
              />
            </div>
          )}

          {valueChainStages.map((stage, index) => (
            <div
              key={stage.id}
              onClick={() => {
                setActiveStage(index);
                setIsAnimating(false);
                setShowMoreDetail(false);
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                zIndex: 1,
                transition: "transform 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "14px",
                  backgroundColor: index <= activeStage ? colors.primary : "transparent",
                  border: index <= activeStage ? `2px solid ${colors.primary}` : `2px solid ${colors.primary}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  color: index <= activeStage ? colors.white : "#bbb",
                  boxShadow: index === activeStage ? "0 4px 12px rgba(27,77,62,0.25)" : "none",
                }}
              >
                {valueChainIcons[stage.icon]}
              </div>
              <span
                style={{
                  marginTop: "12px",
                  fontSize: "12px",
                  fontWeight: index === activeStage ? "700" : index < activeStage ? "500" : "400",
                  color: index === activeStage ? colors.primary : index < activeStage ? colors.primary : "#999",
                  fontFamily: "Inter, sans-serif",
                  textAlign: "center",
                  maxWidth: "100px",
                  lineHeight: "1.3",
                  transition: "all 0.3s ease",
                }}
              >
                {stage.stage}
              </span>
            </div>
          ))}
        </div>

        {/* Active Stage Detail */}
        <div
          style={{
            backgroundColor: colors.background,
            borderRadius: isMobile ? "16px" : "24px",
            padding: isMobile ? "24px" : "48px",
            border: `2px solid ${colors.primary}`,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
              gap: isMobile ? "24px" : "48px",
              alignItems: "stretch",
              minHeight: isMobile ? "auto" : "320px",
            }}
          >
            {/* Left: Actor Info */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  minHeight: "120px",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    backgroundColor: colors.accent,
                    color: colors.primary,
                    padding: "6px 14px",
                    borderRadius: "50px",
                    fontSize: "12px",
                    fontWeight: "600",
                    fontFamily: "Inter, sans-serif",
                    marginBottom: "16px",
                    width: "fit-content",
                  }}
                >
                  Stage {activeStage + 1} of 5
                </div>
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "32px",
                    fontWeight: "500",
                    color: colors.primary,
                    margin: "0 0 8px 0",
                    lineHeight: "1.2",
                  }}
                >
                  {activeData.actor}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "15px",
                    fontWeight: "600",
                    color: "#666",
                    margin: "0",
                  }}
                >
                  {activeData.population}
                </p>
              </div>
              <div
                style={{
                  backgroundColor: colors.white,
                  borderRadius: "16px",
                  padding: "24px",
                  marginTop: "auto",
                  border: `1px solid ${colors.line}`,
                }}
              >
                <div
                  style={{
                    fontSize: "26px",
                    fontWeight: "700",
                    fontFamily: "Poppins, sans-serif",
                    color: colors.accent,
                    lineHeight: "1.2",
                  }}
                >
                  {activeData.stat}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#999",
                    fontFamily: "Inter, sans-serif",
                    marginTop: "8px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    fontWeight: "600",
                  }}
                >
                  Key Metric
                </div>
              </div>
            </div>

            {/* Middle: Pain Points — collapsible on mobile */}
            {(!isMobile || showMoreDetail) && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <h4
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    color: colors.primary,
                    margin: "0 0 20px 0",
                  }}
                >
                  Opportunity Signals
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    flex: 1,
                  }}
                >
                  {activeData.painPoints.map((point, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        backgroundColor: colors.white,
                        borderRadius: "12px",
                        padding: "14px 16px",
                        flex: 1,
                        border: `1px solid ${colors.line}`,
                        transition: "all 0.2s ease",
                      }}
                    >
                      <span
                        style={{
                          color: colors.warning,
                          display: "flex",
                          flexShrink: 0,
                        }}
                      >
                        <IconWarning />
                      </span>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "14px",
                          color: colors.dark,
                          fontWeight: "400",
                        }}
                      >
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Right: Value Flow — collapsible on mobile */}
            {(!isMobile || showMoreDetail) && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <h4
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    color: colors.primary,
                    margin: "0 0 20px 0",
                  }}
                >
                  System Efficiency
                </h4>
                <div
                  style={{
                    backgroundColor: colors.white,
                    borderRadius: "16px",
                    padding: "24px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    border: `1px solid ${colors.line}`,
                  }}
                >
                  <div style={{ marginBottom: "24px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "#666",
                        }}
                      >
                        Value Retained
                      </span>
                      <span
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "15px",
                          fontWeight: "700",
                          color: colors.accent,
                        }}
                      >
                        {activeData.valueRetained}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: "10px",
                        backgroundColor: colors.line,
                        borderRadius: "5px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${activeData.valueRetained}%`,
                          backgroundColor: colors.accent,
                          borderRadius: "5px",
                          transition: "width 0.5s ease",
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ marginBottom: "24px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "10px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "#666",
                        }}
                      >
                        Recapture Opportunity
                      </span>
                      <span
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "15px",
                          fontWeight: "700",
                          color: colors.warning,
                        }}
                      >
                        {activeData.valueLost}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: "10px",
                        backgroundColor: colors.line,
                        borderRadius: "5px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${activeData.valueLost}%`,
                          backgroundColor: colors.warning,
                          borderRadius: "5px",
                          transition: "width 0.5s ease",
                        }}
                      />
                    </div>
                  </div>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      color: "#999",
                      marginTop: "auto",
                      lineHeight: "1.5",
                      margin: 0,
                    }}
                  >
                    Each stage presents opportunities to recapture value — strategic interventions compound efficiency
                    gains from planning through delivery.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Mobile: Show more / Show less toggle */}
          {isMobile && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMoreDetail(!showMoreDetail);
              }}
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
              {showMoreDetail ? "Show less" : "Show more details"}
              <ChevronDown size={14} strokeWidth={2.5} color={colors.primary} style={{ transform: showMoreDetail ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SOLUTIONS SECTION
// ============================================================================

const SolutionsSection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [selectedTier, setSelectedTier] = useState(isMobile ? "1" : "all");

  const filteredSolutions =
    selectedTier === "all" ? sector.solutions : sector.solutions.filter((s) => s.tier === parseInt(selectedTier));

  return (
    <section
      id="solutions"
      style={{
        backgroundColor: colors.primary,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "flex-end",
            marginBottom: isMobile ? "32px" : "48px",
            gap: isMobile ? "24px" : "0",
          }}
        >
          <div>
            <span
              style={{
                display: "inline-block",
                backgroundColor: colors.white,
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
              The Pathway to Impact
            </span>

            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? "28px" : "42px",
                fontWeight: "300",
                lineHeight: "1.2",
                letterSpacing: "-0.5px",
                color: colors.white,
                margin: "0 0 20px 0",
                maxWidth: "900px",
              }}
            >
              <span style={{ fontWeight: "600" }}>Creating</span> Ventures That Build{" "}
              <span style={{ color: colors.accent, fontWeight: "600" }}>Lasting Value</span>
            </h2>

            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? "15px" : "16px",
                lineHeight: "1.65",
                color: "rgba(255,255,255,0.7)",
                maxWidth: "600px",
                margin: 0,
              }}
            >
              Asset-backed ventures with transparent governance — each one a bridge from insight to investment to
              measurable public benefit.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "8px",
              backgroundColor: "transparent",
              border: "1.5px solid rgba(255,255,255,0.25)",
              padding: "6px",
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
                  color: selectedTier === filter.value ? colors.primary : colors.white,
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "50px",
                  fontSize: "14px",
                  fontWeight: "500",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

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
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "24px",
                }
          }
        >
          {filteredSolutions.map((solution, index) => (
            <div
              key={index}
              style={{
                backgroundColor: colors.white,
                borderRadius: "20px",
                padding: isMobile ? "24px" : "28px",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                ...(isMobile
                  ? {
                      minWidth: "80%",
                      maxWidth: "80%",
                      flexShrink: 0,
                      scrollSnapAlign: "start",
                    }
                  : {}),
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    backgroundColor: solution.tier === 1 ? colors.accent : colors.lightGreen,
                    color: colors.primary,
                    padding: "6px 12px",
                    borderRadius: "50px",
                    fontSize: "11px",
                    fontWeight: "700",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {solution.tier === 1 ? "Flagship" : "Scaling"}
                </span>
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
                  margin: "0 0 20px 0",
                  lineHeight: "1.6",
                  height: "66px",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {solution.description}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: colors.primary,
                }}
              >
                <IconCheck />
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  {solution.impact}
                </span>
              </div>

              <div
                style={{
                  marginTop: "16px",
                  paddingTop: "16px",
                  borderTop: `1px solid ${colors.line}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      color: "#999",
                    }}
                  >
                    Priority Score
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "60px",
                        height: "6px",
                        backgroundColor: colors.line,
                        borderRadius: "3px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${(solution.score / 50) * 100}%`,
                          backgroundColor: colors.accent,
                          borderRadius: "3px",
                        }}
                      />
                    </div>
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile scroll indicator */}
        {isMobile && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "6px",
              marginTop: "16px",
              alignItems: "center",
            }}
          >
            {filteredSolutions.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === 0 ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "50px",
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
// MARKET ECOSYSTEM SECTION
// ============================================================================

const MarketEcosystemSection = ({ sector }) => {
  const [activePartner, setActivePartner] = useState(0);
  const [showMoreLandscape, setShowMoreLandscape] = useState(false);
  const isMobile = useIsMobile();
  const partner = sector.competitors[activePartner];

  return (
    <section
      style={{
        backgroundColor: colors.background,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: colors.white,
              color: colors.primary,
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Inter, sans-serif",
              marginBottom: "24px",
              border: `1px solid ${colors.line}`,
            }}
          >
            The Landscape
          </span>

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
            <span style={{ fontWeight: "600" }}>Building</span> With Ghana's{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Strongest Institutions</span>
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
            BRIDGE works alongside Ghana's strongest institutions — combining strengths, aligning resources, and
            creating shared value across the infrastructure landscape.
          </p>
        </div>

        {/* Mobile: Pill bar selector */}
        {isMobile && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                border: `1px solid ${colors.line}`,
                borderRadius: "50px",
                padding: "4px",
                backgroundColor: colors.white,
                overflowX: "auto",
                WebkitOverflowScrolling: "touch",
                maxWidth: "100%",
              }}
            >
              {sector.competitors.map((comp, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActivePartner(index);
                    setShowMoreLandscape(false);
                  }}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px",
                    fontWeight: activePartner === index ? "700" : "500",
                    color: activePartner === index ? colors.primary : "#999",
                    backgroundColor: activePartner === index ? colors.accentLight : "transparent",
                    border: activePartner === index ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                    borderRadius: "50px",
                    padding: "5px 8px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    transition: "all 0.2s ease",
                  }}
                >
                  {comp.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div
          style={{
            display: isMobile ? "block" : "grid",
            gridTemplateColumns: "300px 1fr",
            gap: "32px",
          }}
        >
          {/* Partner List — desktop only */}
          {!isMobile && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {sector.competitors.map((comp, index) => (
                <div
                  key={index}
                  onClick={() => setActivePartner(index)}
                  style={{
                    backgroundColor: activePartner === index ? colors.white : "transparent",
                    border: activePartner === index ? `2px solid ${colors.primary}` : "2px solid transparent",
                    borderRadius: "16px",
                    padding: "20px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <h4
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "16px",
                          fontWeight: "600",
                          color: colors.dark,
                          margin: "0 0 4px 0",
                        }}
                      >
                        {comp.name}
                      </h4>
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "#666",
                          margin: 0,
                        }}
                      >
                        {comp.focus}
                      </p>
                    </div>
                    <span
                      style={{
                        backgroundColor: comp.priority === "High" ? colors.accent : colors.lightGreen,
                        color: colors.primary,
                        padding: "4px 10px",
                        borderRadius: "50px",
                        fontSize: "11px",
                        fontWeight: "600",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {comp.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Partner Detail */}
          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: isMobile ? "16px" : "24px",
              padding: isMobile ? "24px" : "40px",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "24px",
              }}
            >
              <div>
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: isMobile ? "22px" : "28px",
                    fontWeight: "500",
                    color: colors.dark,
                    margin: "0 0 8px 0",
                  }}
                >
                  {partner.name}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: isMobile ? "13px" : "15px",
                    color: "#666",
                    margin: 0,
                  }}
                >
                  Est. {partner.year} • Funding: {partner.funding}
                </p>
              </div>
              <span
                style={{
                  backgroundColor:
                    partner.partnershipType === "Essential"
                      ? colors.accent
                      : partner.partnershipType === "Bypass"
                        ? colors.warningBg
                        : colors.lightGreen,
                  color: partner.partnershipType === "Bypass" ? colors.warningText : colors.primary,
                  padding: "6px 14px",
                  borderRadius: "50px",
                  fontSize: "12px",
                  fontWeight: "600",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {partner.partnershipType}
              </span>
            </div>

            {/* Key Metrics Row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: isMobile ? "8px" : "16px",
                marginBottom: isMobile ? "20px" : "28px",
              }}
            >
              <div
                style={{
                  backgroundColor: colors.background,
                  borderRadius: "12px",
                  padding: "16px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "22px",
                    fontWeight: "700",
                    color: colors.primary,
                  }}
                >
                  {partner.marketShare}
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    color: "#888",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginTop: "4px",
                  }}
                >
                  Market Share
                </div>
              </div>
              <div
                style={{
                  backgroundColor: colors.background,
                  borderRadius: "12px",
                  padding: "16px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "22px",
                    fontWeight: "700",
                    color: colors.primary,
                  }}
                >
                  {partner.coverage}
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    color: "#888",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginTop: "4px",
                  }}
                >
                  Coverage
                </div>
              </div>
              <div
                style={{
                  backgroundColor: colors.background,
                  borderRadius: "12px",
                  padding: "16px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "22px",
                    fontWeight: "700",
                    color: colors.primary,
                  }}
                >
                  {partner.employees}
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    color: "#888",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginTop: "4px",
                  }}
                >
                  Employees
                </div>
              </div>
            </div>

            {/* Strengths & Gaps Row — collapsible on mobile */}
            {(!isMobile || showMoreLandscape) && (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: isMobile ? "20px" : "24px",
                    marginBottom: isMobile ? "20px" : "24px",
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        color: colors.primary,
                        margin: "0 0 14px 0",
                      }}
                    >
                      Their Strengths
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {partner.strengths.map((strength, index) => (
                        <div key={index}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "5px",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "13px",
                                color: colors.dark,
                              }}
                            >
                              {strength.name}
                            </span>
                            <span
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "12px",
                                color: "#999",
                              }}
                            >
                              {strength.rating}/5
                            </span>
                          </div>
                          <div
                            style={{
                              height: "5px",
                              backgroundColor: colors.line,
                              borderRadius: "3px",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                width: `${(strength.rating / 5) * 100}%`,
                                backgroundColor: colors.accent,
                                borderRadius: "3px",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        color: colors.primary,
                        margin: "0 0 14px 0",
                      }}
                    >
                      Where BRIDGE Helps
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {partner.gaps.map((gap, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            backgroundColor: colors.accentLight,
                            padding: "10px 12px",
                            borderRadius: "8px",
                          }}
                        >
                          <span style={{ color: colors.primary, fontSize: "10px" }}>●</span>
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "13px",
                              color: colors.primary,
                            }}
                          >
                            {gap}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Collaboration Opportunity Section */}
                <div
                  style={{
                    backgroundColor: colors.primary,
                    borderRadius: "16px",
                    padding: "24px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: "16px",
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        color: colors.accent,
                        margin: 0,
                      }}
                    >
                      Collaboration Opportunity
                    </h4>
                  </div>

                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "16px",
                      color: colors.white,
                      margin: "0 0 20px 0",
                      lineHeight: "1.5",
                    }}
                  >
                    {partner.bridgeOpportunity}
                  </p>

                  {/* Synergy Areas */}
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    {partner.synergyAreas.map((area, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: "rgba(184, 217, 53, 0.15)",
                          color: colors.accent,
                          padding: "6px 12px",
                          borderRadius: "50px",
                          fontSize: "12px",
                          fontWeight: "500",
                          fontFamily: "Inter, sans-serif",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span style={{ fontSize: "10px" }}>✓</span>
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Mobile: Show more / less toggle */}
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
                <ChevronDown size={14} strokeWidth={2.5} color={colors.primary} style={{
                    transform: showMoreLandscape ? "rotate(180deg)" : "none",
                    transition: "transform 0.3s ease",
                  }} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// POLICY ALIGNMENT SECTION
// ============================================================================

const PolicyAlignmentSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);
  const isMobile = useIsMobile();

  const categories = [
    { id: "all", label: "All", short: "All" },
    { id: "funding", label: "Direct Funding", short: "Funding" },
    { id: "tax", label: "Tax Incentives", short: "Tax" },
    { id: "infrastructure", label: "Infrastructure", short: "Infra" },
    { id: "partnerships", label: "Partnerships", short: "Partners" },
  ];

  const catBadge = {
    funding: { bg: "rgba(184,217,53,0.15)", border: "rgba(184,217,53,0.3)" },
    tax: { bg: "rgba(27,77,62,0.07)", border: "rgba(27,77,62,0.15)" },
    infrastructure: { bg: "rgba(184,217,53,0.1)", border: "rgba(184,217,53,0.25)" },
    partnerships: { bg: "rgba(27,77,62,0.05)", border: "rgba(27,77,62,0.12)" },
  };

  const filteredPolicies =
    activeCategory === "all"
      ? sectorData.policyAlignment
      : sectorData.policyAlignment.filter((p) => p.category === activeCategory);

  return (
    <section
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: isMobile ? "32px" : "48px", textAlign: "center" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: colors.white,
              color: colors.primary,
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Inter, sans-serif",
              marginBottom: "24px",
              border: `1px solid ${colors.line}`,
            }}
          >
            The Governance & Policy
          </span>

          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
              color: colors.primary,
              margin: "0 auto 20px",
              maxWidth: "900px",
            }}
          >
            <span style={{ fontWeight: "600" }}>Moving</span> in Step with Ghana's{" "}
            <span style={{ fontWeight: "600" }}>Infrastructure</span>{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Transformation</span>
          </h2>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              lineHeight: "1.65",
              color: "#555",
              maxWidth: "750px",
              margin: "0 auto 32px",
            }}
          >
            BRIDGE ventures align directly with Build24 infrastructure priorities and the Model Market mandate —
            creating pathways for public-private collaboration across 260+ districts.
          </p>

          {/* Category Filters */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: isMobile ? "6px" : "12px",
                border: `1px solid ${colors.line}`,
                borderRadius: "50px",
                padding: isMobile ? "4px" : "5px",
                backgroundColor: colors.white,
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setExpandedCard(null);
                  }}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: isMobile ? "10px" : "12px",
                    fontWeight: activeCategory === cat.id ? "700" : "500",
                    color: activeCategory === cat.id ? colors.primary : "#999",
                    backgroundColor: activeCategory === cat.id ? colors.accentLight : "transparent",
                    border: activeCategory === cat.id ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                    borderRadius: "50px",
                    padding: isMobile ? "5px 8px" : "6px 14px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {isMobile ? cat.short : cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Card Row */}
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
                  marginBottom: "16px",
                  alignItems: "flex-start",
                }
              : {
                  display: "flex",
                  gap: "16px",
                  overflowX: "auto",
                  paddingBottom: "12px",
                  marginBottom: "32px",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  scrollbarWidth: "none",
                }
          }
        >
          {filteredPolicies.map((policy, index) => {
            const isExpanded = expandedCard === index;
            const badge = catBadge[policy.category] || catBadge.partnerships;

            return (
              <div
                key={index}
                onClick={() => setExpandedCard(isExpanded ? null : index)}
                style={{
                  minWidth: isMobile ? "90%" : isExpanded ? "420px" : "280px",
                  maxWidth: isMobile ? "90%" : isExpanded ? "420px" : "280px",
                  backgroundColor: colors.background,
                  borderRadius: "16px",
                  padding: isMobile ? "20px" : "24px",
                  border: `2px solid ${colors.primary}`,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  ...(isMobile ? { scrollSnapAlign: "start" } : {}),
                }}
              >
                {/* Top Row: Category Badge + Relevance Pills */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "14px",
                    minHeight: "24px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "9px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: colors.primary,
                      backgroundColor: badge.bg,
                      border: `1px solid ${badge.border}`,
                      padding: "4px 10px",
                      borderRadius: "50px",
                    }}
                  >
                    {categories.find((c) => c.id === policy.category)?.label}
                  </span>
                  {policy.relevance && policy.relevance.length > 0 && (
                    <div style={{ display: "flex", gap: "6px" }}>
                      {policy.relevance.map((r, i) => (
                        <span
                          key={i}
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "9px",
                            fontWeight: "600",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            color: "#888",
                            backgroundColor: colors.white,
                            border: `1px solid ${colors.line}`,
                            padding: "3px 8px",
                            borderRadius: "50px",
                          }}
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Policy Name */}
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "16px",
                    fontWeight: "700",
                    color: colors.primary,
                    margin: "0 0 10px 0",
                    lineHeight: "1.3",
                    height: "42px",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {policy.policy}
                </h3>

                {/* Allocation — plain lime text */}
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    fontWeight: "700",
                    color: colors.accent,
                    marginBottom: "10px",
                    display: "block",
                    height: "20px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {policy.allocation}
                </span>

                {/* Alignment Text */}
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    color: "#666",
                    margin: "0 0 16px 0",
                    lineHeight: "1.55",
                    height: "60px",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {policy.alignment}
                </p>

                {/* Expand Hint */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "auto",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: colors.primary,
                    }}
                  >
                    BRIDGE alignment
                  </span>
                  <ChevronDown size={14} strokeWidth={2.5} color={colors.primary} style={{
                      transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.3s ease",
                    }} />
                </div>

                {/* EXPANDED CONTENT */}
                {isExpanded && (
                  <div
                    style={{
                      marginTop: "18px",
                      paddingTop: "18px",
                      borderTop: `1px solid ${colors.line}`,
                      overflow: "hidden",
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Governing Body */}
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "#888",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        display: "block",
                        marginBottom: "10px",
                      }}
                    >
                      {policy.body}
                    </span>

                    {/* BRIDGE Role */}
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        color: "#444",
                        margin: "0 0 16px 0",
                        lineHeight: "1.6",
                      }}
                    >
                      {policy.bridgeRole}
                    </p>

                    {/* Pillars */}
                    {policy.pillars && policy.pillars.length > 0 && (
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
                        {policy.pillars.map((pillar, i) => (
                          <span
                            key={i}
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "11px",
                              fontWeight: "600",
                              color: colors.primary,
                              backgroundColor: "rgba(27,77,62,0.08)",
                              border: "1px solid rgba(27,77,62,0.15)",
                              padding: "5px 12px",
                              borderRadius: "50px",
                            }}
                          >
                            {pillar}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* BRIDGE Ventures */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {policy.bridgeVentures.map((venture, i) => (
                        <div
                          key={i}
                          style={{
                            backgroundColor: colors.primary,
                            borderRadius: "10px",
                            padding: "12px 16px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
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
                              fontFamily: "Inter, sans-serif",
                              fontSize: "13px",
                              fontWeight: "600",
                              color: colors.white,
                            }}
                          >
                            {venture}
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

        {/* Mobile scroll indicator dots */}
        {isMobile && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              marginBottom: "24px",
              alignItems: "center",
            }}
          >
            {filteredPolicies.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === 0 ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "50px",
                  backgroundColor: i === 0 ? colors.accent : colors.line,
                  transition: "all 0.3s ease",
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
            padding: isMobile ? "24px" : "28px 32px",
            display: "flex",
            flexDirection: "column",
            alignItems: isMobile ? "center" : "flex-start",
            gap: isMobile ? "16px" : "24px",
            textAlign: "left",
            ...(isMobile ? {} : { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }),
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
          <a
            href="#partnership"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: colors.accent,
              color: colors.primary,
              padding: "12px 24px",
              borderRadius: "50px",
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              fontWeight: "700",
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            View Partnership Strategy
            <ArrowRight size={14} strokeWidth={2.5} color="currentColor" />
          </a>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// CROSS-SECTOR SECTION
// ============================================================================

const CrossSectorSection = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [showMoreRipple, setShowMoreRipple] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const SECTOR_ROUTES: Record<string, string> = {
    "Financial Inclusion": "/sectors/financial",
    "Health Systems": "/sectors/health",
    "Agriculture": "/sectors/agriculture",
    "Energy": "/sectors/energy",
    "Manufacturing": "/sectors/manufacturing",
    "Transportation": "/sectors/transport",
    "Infrastructure": "/sectors/infrastructure",
    "Technology & Innovation": "/sectors/technology",
    "Education & Skills": "/sectors/education",
  };

  const crossSectorShortNames = ["Financial", "Health", "Agriculture", "Energy", "Mfg"];

  const crossSectorIcons = {
    1: <IconBlocks />,
    2: <IconWallet />,
    3: <IconCross />,
    6: <IconSprout />,
    10: <IconBatteryCharging />,
    11: <IconFactory />,
  };

  // Integration pathway: Infrastructure is the hub, connections radiate out
  const pathways = sectorData.crossSector.map((sector, i) => ({
    ...sector,
    icon: crossSectorIcons[sector.sectorId],
    pathLabel: [
      "Infrastructure → Digital Payment Points → Financial Access",
      "Infrastructure → WASH Systems → Health Outcomes",
      "Infrastructure → Cold Storage → Market Access",
      "Infrastructure → Solar Grids → Reliable Power",
      "Infrastructure → Industrial Utilities → Local Production",
    ][i],
  }));

  return (
    <section
      style={{
        backgroundColor: colors.primary,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        <div style={{ marginBottom: isMobile ? "32px" : "60px", textAlign: "center" }}>
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
            The Ripple Effect
          </span>

          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
              color: colors.white,
              margin: "0 auto 20px",
              maxWidth: "820px",
            }}
          >
            How <span style={{ fontWeight: "600" }}>Infrastructure</span>{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Amplifies Impact</span>
          </h2>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              lineHeight: "1.65",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "680px",
              margin: "0 auto",
            }}
          >
            BRIDGE sectors don't operate in isolation. Infrastructure investment creates compounding value across every
            sector we touch.
          </p>
        </div>

        {/* ── PATHWAY VISUAL ── */}
        {isMobile ? (
          /* Mobile: 1 hub on top, 5 sectors in one row */
          <div style={{ marginBottom: "24px" }}>
            {/* Row 1: Infrastructure hub */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    backgroundColor: colors.accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: colors.primary,
                    boxShadow: "0 0 24px rgba(184, 217, 53, 0.3)",
                  }}
                >
                  <IconBlocks />
                </div>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: colors.accent,
                    marginTop: "6px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Infrastructure
                </span>
              </div>
            </div>

            {/* Row 2: All 5 sectors */}
            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
              {pathways.map((sector, index) => {
                const isActive = activeNode === index;
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setActiveNode(isActive ? null : index);
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
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isActive ? colors.primary : "rgba(255,255,255,0.6)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {sector.icon}
                    </div>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "10px",
                        fontWeight: "600",
                        color: isActive ? colors.white : "rgba(255,255,255,0.5)",
                        textAlign: "center",
                        marginTop: "5px",
                        maxWidth: "58px",
                        lineHeight: "1.2",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {crossSectorShortNames[index]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Desktop: horizontal row */
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "32px",
              marginBottom: "48px",
            }}
          >
            {/* Center Hub: Infrastructure */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexShrink: 0,
                width: "120px",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "20px",
                  backgroundColor: colors.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.primary,
                  boxShadow: "0 0 30px rgba(184, 217, 53, 0.3)",
                }}
              >
                <IconBlocks />
              </div>
            </div>

            {/* Sector Nodes */}
            {pathways.map((sector, index) => {
              const isActive = activeNode === index;
              return (
                <div
                  key={index}
                  onClick={() => setActiveNode(isActive ? null : index)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    opacity: activeNode !== null && !isActive ? 0.4 : 1,
                    width: "120px",
                  }}
                >
                  {/* Node icon */}
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
                      color: isActive ? colors.primary : "rgba(255,255,255,0.6)",
                      transition: "all 0.3s ease",
                      marginBottom: "10px",
                    }}
                  >
                    {sector.icon}
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
                    {sector.name}
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
                    {sector.multiplier}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* ── INTEGRATION DETAIL PANEL ── */}
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
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.5)",
                    margin: 0,
                  }}
                >
                  Tap a sector above to explore how infrastructure amplifies its impact
                </p>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "flex-start" : "center",
                    justifyContent: "space-between",
                    marginBottom: "28px",
                    gap: isMobile ? "8px" : "0",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: isMobile ? "16px" : "18px",
                      fontWeight: "600",
                      color: colors.white,
                      margin: 0,
                    }}
                  >
                    Cross-Sector Integration Opportunities
                  </h3>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    {isMobile ? "Tap a sector above" : "Click a sector above to explore"}
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)",
                    gap: isMobile ? "12px" : "16px",
                  }}
                >
                  {pathways.map((sector, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveNode(i)}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.05)",
                        borderRadius: "16px",
                        padding: "24px 20px",
                        cursor: "pointer",
                        border: "1px solid rgba(255,255,255,0.06)",
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
                        {sector.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "rgba(255,255,255,0.45)",
                          lineHeight: "1.5",
                          marginBottom: "16px",
                          height: "40px",
                          overflow: "hidden",
                        }}
                      >
                        {sector.connection}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "18px",
                            fontWeight: "700",
                            color: colors.accent,
                          }}
                        >
                          {sector.multiplier}
                        </span>
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "11px",
                            color: "rgba(255,255,255,0.35)",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
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
            /* Active state: show pathway detail */
            <div>
              {/* Pathway breadcrumb */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "28px",
                  flexWrap: "wrap",
                }}
              >
                {pathways[activeNode].pathLabel.split(" → ").map((step, i, arr) => (
                  <React.Fragment key={i}>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        fontWeight: i === 0 ? "700" : "500",
                        color: i === 0 ? colors.accent : "rgba(255,255,255,0.7)",
                        backgroundColor: i === 0 ? "rgba(184, 217, 53, 0.15)" : "rgba(255,255,255,0.05)",
                        padding: "6px 14px",
                        borderRadius: "50px",
                      }}
                    >
                      {step}
                    </span>
                    {i < arr.length - 1 && <span style={{ color: colors.accent, fontSize: "14px" }}>→</span>}
                  </React.Fragment>
                ))}
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                  gap: isMobile ? "24px" : "32px",
                }}
              >
                {/* Connection Overview */}
                <div>
                  <h4
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: colors.accent,
                      margin: "0 0 16px 0",
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
                      margin: "0 0 20px 0",
                    }}
                  >
                    {pathways[activeNode].impact}
                  </p>
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
                        fontSize: "32px",
                        fontWeight: "700",
                        color: colors.accent,
                      }}
                    >
                      {pathways[activeNode].multiplier}
                    </span>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.4)",
                      }}
                    >
                      value multiplier
                    </span>
                  </div>
                </div>

                {/* Synergy Areas — collapsible on mobile */}
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
                        margin: "0 0 16px 0",
                      }}
                    >
                      Synergy Pathways
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {pathways[activeNode].synergies.map((synergy, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            backgroundColor: "rgba(255,255,255,0.05)",
                            padding: "12px 16px",
                            borderRadius: "10px",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <span style={{ color: colors.accent, fontSize: "8px" }}>●</span>
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "14px",
                              color: "rgba(255,255,255,0.75)",
                            }}
                          >
                            {synergy}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* BRIDGE Ventures — collapsible on mobile */}
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
                        margin: "0 0 16px 0",
                      }}
                    >
                      Linked Ventures
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {pathways[activeNode].bridgeVentures.map((venture, i) => (
                        <div
                          key={i}
                          style={{
                            backgroundColor: "rgba(184, 217, 53, 0.1)",
                            padding: "14px 18px",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
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
                            {venture}
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
                      Explore {pathways[activeNode].name} Sector
                      <span>→</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile: Show more / less toggle */}
              {isMobile && (
                <button
                  onClick={() => setShowMoreRipple(!showMoreRipple)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
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
                  }}
                >
                  {showMoreRipple ? "Show less" : "Show more details"}
                  <ChevronDown size={14} strokeWidth={2.5} color={colors.white} style={{ transform: showMoreRipple ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }} />
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
// INVESTMENT CTA SECTION
// ============================================================================

const InvestmentCTASection = ({ sector }) => {
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
        label: "Tier 1 Ventures",
        value: "18-25%",
        detail: "Market infrastructure and water kiosk networks with proven demand and rapid revenue",
      },
      {
        label: "Tier 2 Ventures",
        value: "12-18%",
        detail: "Solar micro-grids and cold chain hubs with longer build-out but strong asset value",
      },
      {
        label: "Portfolio IRR",
        value: "15-25%",
        detail: "Blended returns across 18 ventures with risk-adjusted modeling and first-loss protection",
      },
      {
        label: "Dev. Leverage",
        value: "4-6x",
        detail: "Every dollar deployed generates $4-6 in local economic activity via multipliers",
      },
    ],
    timeline: [
      {
        label: "Phase 1 (Q1-Q2)",
        value: "Foundation",
        detail: "Kejetia Market digitization, water kiosk site selection, and government partnerships",
      },
      {
        label: "Phase 2 (Q3-Q4)",
        value: "Scale",
        detail: "Market service revenue, solar micro-grid deployment, and expansion to Tamale",
      },
      {
        label: "Phase 3 (2027+)",
        value: "Expansion",
        detail: "Replication across 5 regional markets, cold chain build-out, and WASH scaling",
      },
      {
        label: "Exit Horizon",
        value: "5-7 yrs",
        detail: "Staged liquidity via asset sales, concession renewals, or recapitalization",
      },
    ],
    impact: [
      {
        label: "Citizens Served",
        value: "100K+",
        detail: "Direct beneficiaries of improved water, sanitation, energy, and market infrastructure",
      },
      {
        label: "Jobs Created",
        value: "500+",
        detail: "Direct employment across ventures including construction, operations, and maintenance",
      },
      {
        label: "Market Traders",
        value: "10K+",
        detail: "Traders with improved facilities, digital payments, and formalized operations at Kejetia",
      },
      {
        label: "WASH Access",
        value: "7,500+",
        detail: "Lives transformed annually through improved water, sanitation, and hygiene access",
      },
    ],
  };

  const audiences = [
    {
      key: "entrepreneur",
      label: "Entrepreneur",
      shortLabel: "Founder",
      icon: <IconStorefront />,
      headline: "Build Infrastructure That Serves Communities",
      pitch:
        "BRIDGE provides validated venture models, anchor buyer commitments, and working capital strategies so you can launch infrastructure businesses with de-risked market entry and clear paths to profitability.",
      stats: [
        { value: "18", label: "Venture Paths", detail: "validated models" },
        { value: "10K+", label: "Market Access", detail: "traders via Kejetia" },
        { value: "Full", label: "BRIDGE Support", detail: "incubation to scale" },
      ],
      pathways: [
        {
          bring: "Local knowledge & operational capacity",
          get: "BRIDGE provides venture blueprints, financial models, and go/no-go frameworks",
        },
        {
          bring: "Community relationships & trust",
          get: "Access to anchor buyers, government partnerships, and working capital facilities",
        },
        {
          bring: "Execution commitment & accountability",
          get: "Technical assistance, monitoring systems, and scale-up support through Phase 3",
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
        "Partner with BRIDGE to secure reliable infrastructure for your operations — from cold chain logistics to energy supply — while contributing to community development outcomes that strengthen your market position.",
      stats: [
        { value: "$8-15M", label: "Capital Range", detail: "across 18 ventures" },
        { value: "8-12%", label: "Cash Yield", detail: "annual distribution" },
        { value: "32M+", label: "Addressable", detail: "citizens to serve" },
      ],
      pathways: [
        {
          bring: "Procurement commitments & volume guarantees",
          get: "Priority access to infrastructure services and preferential pricing structures",
        },
        {
          bring: "Technical expertise & equipment",
          get: "Co-development opportunities in market infrastructure and utility systems",
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
      headline: "Infrastructure Assets With Impact Returns",
      pitch:
        "Deploy capital into physical infrastructure assets with transparent governance, compounding revenue streams, and measurable development outcomes — backed by government partnerships and community demand.",
      stats: [
        { value: "15-25%", label: "Target IRR", detail: "blended portfolio" },
        { value: "2.5x", label: "Multiple", detail: "capital appreciation" },
        { value: "18-24mo", label: "First Cash", detail: "revenue timeline" },
      ],
      pathways: [
        {
          bring: "Growth capital & patient deployment",
          get: "Asset-backed returns with infrastructure as collateral and clear exit pathways",
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
      headline: "Deliver Infrastructure Without Fiscal Strain",
      pitch:
        "BRIDGE ventures align directly with Build24 infrastructure priorities — delivering water, energy, and market infrastructure through private capital while creating jobs and expanding the tax base.",
      stats: [
        { value: "500+", label: "Jobs Created", detail: "direct employment" },
        { value: "95%", label: "Private Capital", detail: "no fiscal burden" },
        { value: "4-6x", label: "Tax Multiplier", detail: "economic activity" },
      ],
      pathways: [
        {
          bring: "Policy alignment & regulatory support",
          get: "Private infrastructure delivery that meets Build24 and 24-Hour Economy targets",
        },
        {
          bring: "Land access & permitting facilitation",
          get: "Job creation, tax revenue expansion, and improved public service delivery",
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
    <section
      style={{
        backgroundColor: colors.background,
        padding: isMobile ? "60px 0" : "100px 80px",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Section Header */}
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
            Every <span style={{ fontWeight: "600" }}>Stakeholder</span> Has a{" "}
            <span style={{ fontWeight: "600" }}>Role</span> in{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Infrastructure Growth</span>
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
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "24px",
              padding: "0 20px",
            }}
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
              justifyContent: "flex-start",
              gap: "12px",
              marginBottom: "40px",
            }}
          >
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
                    padding: "8px 18px",
                    borderRadius: "50px",
                    border: isActive ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                    backgroundColor: isActive ? colors.accentLight : "transparent",
                    color: isActive ? colors.primary : "#999",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
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

        {/* Main Content Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "24px" : "48px",
            alignItems: "stretch",
            padding: isMobile ? "0 20px" : 0,
          }}
        >
          {/* LEFT COLUMN: Audience-Specific Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Headline — desktop only */}
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

            {/* Pitch — desktop only */}
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

            {/* Stat cards — 3 columns */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
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
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      color: "#888",
                    }}
                  >
                    {stat.detail}
                  </div>
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      flex: 1,
                    }}
                  >
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
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        color: "#777",
                        lineHeight: "1.5",
                      }}
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
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  color: "#444",
                  lineHeight: "1.5",
                }}
              >
                <strong style={{ color: colors.primary }}>Ghana Highway Authority</strong> partnership framework for
                infrastructure
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Returns / Timeline / Impact Panel */}
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

              {/* Tab Content Cards */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  flex: 1,
                }}
              >
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
                    <div
                      style={{
                        minWidth: isMobile ? "80px" : "120px",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: isMobile ? "20px" : "22px",
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
                          whiteSpace: "nowrap",
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
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
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

          {/* Mobile Toggle Button */}
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
      {/* end maxWidth wrapper */}
    </section>
  );
};

// ============================================================================
// IMPACT SECTION
// ============================================================================

const ImpactSection = () => {
  const isMobile = useIsMobile();
  const [view, setView] = useState("metrics");
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeStakeholder, setActiveStakeholder] = useState(0);
  const [animate, setAnimate] = useState(true);

  const CounterCell = ({ item }) => {
    const val = useCounter(item.value, 1200, animate);
    const display = Number.isInteger(item.value) ? Math.round(val) : val.toFixed(1);
    return (
      <span
        style={{
          fontFamily: "Poppins, sans-serif",
          fontSize: isMobile ? "28px" : "36px",
          fontWeight: "700",
          color: colors.primary,
          letterSpacing: "-1px",
          lineHeight: "1",
        }}
      >
        {item.prefix}
        {display}
        {item.suffix}
      </span>
    );
  };

  const metrics = [
    {
      category: "Economic",
      items: [
        {
          label: "Addressable Market",
          value: 4.8,
          suffix: "B",
          prefix: "$",
          description: "Combined infrastructure services market across water, energy, and market facilities",
          trend: "+12% YoY",
          ventures: "All Ventures",
        },
        {
          label: "Revenue Recapture",
          value: 32,
          suffix: "%",
          prefix: "",
          description: "Non-revenue water and energy losses recoverable through smart monitoring systems",
          trend: "Capture gap",
          ventures: "Water Kiosk Networks · IoT Monitoring",
        },
        {
          label: "Value Chain Multiplier",
          value: 3,
          suffix: "-5x",
          prefix: "",
          description: "Economic multiplier from infrastructure investment into downstream sectors",
          trend: "Multiplier",
          ventures: "Market Infrastructure · Cold Chain Hubs",
        },
        {
          label: "District Coverage",
          value: 260,
          suffix: "+",
          prefix: "",
          description: "Metropolitan, municipal, and district assemblies targeted for model market delivery",
          trend: "Target",
          ventures: "Market Digitization Platform",
        },
      ],
    },
    {
      category: "People",
      items: [
        {
          label: "Lives Transformed",
          value: 32,
          suffix: "M+",
          prefix: "",
          description: "Ghanaians gaining access to safely managed water through kiosk and piped networks",
          trend: "High priority",
          ventures: "Water Kiosk Networks · WASH Infrastructure",
        },
        {
          label: "Traders Empowered",
          value: 10,
          suffix: "K+",
          prefix: "",
          description: "Market traders accessing modern facilities with reliable power and digital services",
          trend: "Near-term",
          ventures: "Market Digitization Platform",
        },
        {
          label: "Health Impact",
          value: 7653,
          suffix: "",
          prefix: "",
          description: "Lives impactable annually through improved sanitation and waterborne disease reduction",
          trend: "Critical",
          ventures: "WASH Infrastructure · Toilet Networks",
        },
        {
          label: "Jobs Created",
          value: 2000,
          suffix: "+",
          prefix: "",
          description: "Direct and indirect employment across construction, operations, and maintenance",
          trend: "Growing",
          ventures: "All Ventures",
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
          description: "Target internal rate of return across blended infrastructure investment portfolio",
          trend: "Target range",
          ventures: "All Ventures",
        },
        {
          label: "Capital Deployed",
          value: 28,
          suffix: "M",
          prefix: "$",
          description: "Total investment across infrastructure ventures over the initial deployment phase",
          trend: "Phased",
          ventures: "All Ventures",
        },
        {
          label: "Cash Timeline",
          value: 18,
          suffix: "-36mo",
          prefix: "",
          description: "Expected timeline to first cash distributions from operating infrastructure assets",
          trend: "Near-term",
          ventures: "Water Kiosk Networks · Solar Micro-Grids",
        },
        {
          label: "Leverage Ratio",
          value: 3,
          suffix: "-4x",
          prefix: "",
          description: "Blended finance leverage attracting DFI and institutional co-investment capital",
          trend: "Multiplier",
          ventures: "Drainage SPV · Market Infrastructure",
        },
      ],
    },
  ];

  const stakeholders = [
    {
      icon: <IconStorefront />,
      title: "The Entrepreneur",
      subtitle: "Market traders & small business owners",
      outcomes: [
        "Reliable power extends trading hours by 4-6 hours daily",
        "Modern facilities attract 30%+ more customer foot traffic",
        "Digital tools unlock credit access for first-time borrowers",
        "Clean water boosts daily productivity and reduces sick days",
      ],
      stat: "10,000+",
      statLabel: "traders empowered",
      highlight: "Extended economic hours",
    },
    {
      icon: <IconOfficeBuilding />,
      title: "The Institution",
      subtitle: "Businesses & organizations",
      outcomes: [
        "20-30% operational cost reduction through efficient infrastructure",
        "Cold chain opens perishable markets worth GH₵2.1B annually",
        "Data platforms drive evidence-based investment decisions",
        "PPP frameworks create structured private participation paths",
      ],
      stat: "500+",
      statLabel: "enterprises strengthened",
      highlight: "Operational efficiency gains",
    },
    {
      icon: <IconLandmark />,
      title: "The Government",
      subtitle: "Local assemblies & national agencies",
      outcomes: [
        "Revenue-generating infrastructure reduces dependency on DACF",
        "Job creation across the full infrastructure value chain",
        "Model districts become replicable national blueprints",
        "Aligned delivery of Build24 and Model Market vision",
      ],
      stat: "260+",
      statLabel: "districts activated",
      highlight: "Sustainable revenue models",
    },
    {
      icon: <IconTrendingUp />,
      title: "The Investor",
      subtitle: "Impact & institutional capital",
      outcomes: [
        "Asset-backed portfolio with physical infrastructure security",
        "Measurable ESG and SDG impact outcomes across every venture",
        "15-25% target returns with infrastructure yield generation",
        "Sustainable community-owned exits preserving local value",
      ],
      stat: "15-25%",
      statLabel: "target IRR",
      highlight: "Asset-backed security",
    },
  ];

  const switchView = (newView) => {
    setAnimate(false);
    setView(newView);
    setTimeout(() => setAnimate(true), 50);
  };

  const switchCategory = (i) => {
    setAnimate(false);
    setActiveCategory(i);
    setTimeout(() => setAnimate(true), 50);
  };

  const activeMetrics = metrics[activeCategory];
  const activeStakeholderData = stakeholders[activeStakeholder];

  return (
    <section
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "60px 20px" : "80px 32px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: colors.white,
              color: colors.primary,
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Inter, sans-serif",
              marginBottom: "24px",
              border: `1px solid ${colors.line}`,
            }}
          >
            The Impact
          </span>

          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
              color: colors.primary,
              margin: "0 0 12px 0",
              maxWidth: "900px",
            }}
          >
            What Changes When <span style={{ fontWeight: "600" }}>Infrastructure</span>
            {"\n"}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Investment</span>{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Works</span>
          </h2>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              lineHeight: "1.7",
              color: "#555",
              maxWidth: "750px",
              margin: "0 0 40px 0",
            }}
          >
            When roads connect markets, water flows reliably, and digital networks reach every district — the ripple
            effects unlock economic potential, reduce inequality, and lay the foundation for lasting prosperity across
            Ghana.
          </p>
        </div>

        {/* Controls Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: isMobile ? "6px" : "12px",
              border: `1px solid ${colors.line}`,
              borderRadius: "50px",
              padding: isMobile ? "4px" : "5px",
              backgroundColor: colors.white,
            }}
          >
            {/* View Toggle */}
            <div
              style={{
                display: "inline-flex",
                backgroundColor: colors.background,
                borderRadius: "50px",
                overflow: "hidden",
                flexShrink: 0,
                padding: isMobile ? "2px" : "3px",
              }}
            >
              {["metrics", "stakeholder"].map((v) => (
                <button
                  key={v}
                  onClick={() => switchView(v)}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: isMobile ? "11px" : "12px",
                    fontWeight: view === v ? "700" : "500",
                    color: view === v ? colors.primary : "#999",
                    backgroundColor: view === v ? colors.white : "transparent",
                    border: "none",
                    borderRadius: "50px",
                    padding: isMobile ? "5px 10px" : "6px 14px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  }}
                >
                  {v === "metrics" ? (isMobile ? "Metric" : "By Metric") : isMobile ? "Stakeholder" : "By Stakeholder"}
                </button>
              ))}
            </div>

            {/* Vertical Divider */}
            <div style={{ width: "1px", height: "20px", backgroundColor: colors.line, flexShrink: 0 }} />

            {/* Sub-Filters */}
            {view === "metrics"
              ? metrics.map((cat, i) => (
                  <button
                    key={cat.category}
                    onClick={() => switchCategory(i)}
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: isMobile ? "10px" : "12px",
                      fontWeight: activeCategory === i ? "700" : "500",
                      color: activeCategory === i ? colors.primary : "#999",
                      backgroundColor: activeCategory === i ? colors.accentLight : "transparent",
                      border: activeCategory === i ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                      borderRadius: "50px",
                      padding: isMobile ? "5px 8px" : "6px 14px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {cat.category}
                  </button>
                ))
              : stakeholders.map((s, i) => {
                  const desktopLabels = ["Entrepreneur", "Institution", "Government", "Investor"];
                  const mobileLabels = ["Entrepreneur", "Inst.", "Gov't", "Investor"];
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveStakeholder(i)}
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: isMobile ? "10px" : "12px",
                        fontWeight: activeStakeholder === i ? "700" : "500",
                        color: activeStakeholder === i ? colors.primary : "#999",
                        backgroundColor: activeStakeholder === i ? colors.accentLight : "transparent",
                        border: activeStakeholder === i ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                        borderRadius: "50px",
                        padding: isMobile ? "5px 8px" : "6px 14px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {isMobile ? mobileLabels[i] : desktopLabels[i]}
                    </button>
                  );
                })}
          </div>
        </div>

        {/* ========== METRICS VIEW ========== */}
        {view === "metrics" && (
          <div
            style={{
              border: `2px solid ${colors.primary}`,
              borderRadius: "16px",
              overflow: "hidden",
              opacity: animate ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            {activeMetrics.items.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: isMobile ? "16px 20px" : "20px 28px",
                  backgroundColor: i % 2 === 0 ? colors.white : colors.background,
                  borderBottom: i < activeMetrics.items.length - 1 ? `1px solid ${colors.line}` : "none",
                  position: "relative",
                }}
              >
                {isMobile ? (
                  /* ── Mobile Layout ── */
                  <>
                    {/* Top row: Number + Trend/Ventures */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "8px",
                      }}
                    >
                      <CounterCell item={item} />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          gap: "4px",
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "10px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            color: colors.primary,
                            backgroundColor: "rgba(27,77,62,0.08)",
                            border: "1px solid rgba(27,77,62,0.15)",
                            padding: "3px 8px",
                            borderRadius: "50px",
                          }}
                        >
                          {item.trend}
                        </span>
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "10px",
                            color: "#999",
                          }}
                        >
                          {item.ventures}
                        </span>
                      </div>
                    </div>
                    {/* Bottom: Label + Description */}
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: colors.dark,
                        marginBottom: "2px",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        color: "#666",
                        lineHeight: "1.5",
                      }}
                    >
                      {item.description}
                    </div>
                  </>
                ) : (
                  /* ── Desktop Layout ── */
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {/* Metric Number */}
                    <div style={{ minWidth: "200px" }}>
                      <CounterCell item={item} />
                    </div>

                    {/* Label + Description */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "15px",
                          fontWeight: "600",
                          color: colors.dark,
                          marginBottom: "2px",
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "#666",
                          lineHeight: "1.5",
                        }}
                      >
                        {item.description}
                      </div>
                    </div>

                    {/* Trend + Ventures */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: "6px",
                        minWidth: "180px",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "11px",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          color: colors.primary,
                          backgroundColor: "rgba(27,77,62,0.08)",
                          border: "1px solid rgba(27,77,62,0.15)",
                          padding: "4px 10px",
                          borderRadius: "50px",
                        }}
                      >
                        {item.trend}
                      </span>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "11px",
                          color: "#999",
                        }}
                      >
                        {item.ventures}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ========== STAKEHOLDER VIEW ========== */}
        {view === "stakeholder" && (
          <div
            style={{
              opacity: animate ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            {/* Stakeholder Header */}
            <div
              style={{
                display: "flex",
                alignItems: isMobile ? "flex-start" : "center",
                justifyContent: "space-between",
                flexDirection: isMobile ? "column" : "row",
                gap: "16px",
                marginBottom: "0",
                padding: "20px 28px",
                backgroundColor: colors.background,
                borderRadius: "16px 16px 0 0",
                border: `2px solid ${colors.primary}`,
                borderBottom: `1px solid ${colors.line}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    backgroundColor: colors.accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: colors.primary,
                    flexShrink: 0,
                  }}
                >
                  {activeStakeholderData.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "22px",
                      fontWeight: "600",
                      color: colors.primary,
                      margin: 0,
                    }}
                  >
                    {activeStakeholderData.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      color: "#888",
                      margin: "2px 0 0 0",
                    }}
                  >
                    {activeStakeholderData.subtitle}
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: isMobile ? "32px" : "40px",
                    fontWeight: "700",
                    color: colors.primary,
                    letterSpacing: "-1.5px",
                  }}
                >
                  {activeStakeholderData.stat}
                </span>
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    color: "#888",
                  }}
                >
                  {activeStakeholderData.statLabel}
                </span>
              </div>
            </div>

            {/* Outcome Rows */}
            <div
              style={{
                border: `2px solid ${colors.primary}`,
                borderTop: "none",
                borderRadius: "0 0 16px 16px",
                overflow: "hidden",
              }}
            >
              {activeStakeholderData.outcomes.map((outcome, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "18px 28px",
                    backgroundColor: i % 2 === 0 ? colors.white : colors.background,
                    borderBottom: i < activeStakeholderData.outcomes.length - 1 ? `1px solid ${colors.line}` : "none",
                  }}
                >
                  <span
                    style={{
                      color: colors.accent,
                      flexShrink: 0,
                    }}
                  >
                    <IconCheck />
                  </span>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                      color: "#444",
                      lineHeight: "1.5",
                    }}
                  >
                    {outcome}
                  </span>
                </div>
              ))}
            </div>

            {/* Key Advantage Strip - Free Floating */}
            <div
              style={{
                backgroundColor: colors.primary,
                padding: "16px 28px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                borderRadius: "12px",
                marginTop: "12px",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: colors.accent,
                }}
              >
                Key Advantage
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: colors.white,
                }}
              >
                {activeStakeholderData.highlight}
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

const FinalCTASection = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  return (
    <section
      style={{
        backgroundColor: colors.primary,
        padding: isMobile ? "60px 20px" : "100px 80px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
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
              margin: "0 auto 24px",
              maxWidth: "900px",
            }}
          >
            Let's <span style={{ fontWeight: "600" }}>Build</span> Ghana's{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Infrastructure</span>
          </h2>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "16px" : "18px",
              lineHeight: "1.65",
              color: "rgba(255,255,255,0.7)",
              margin: "0 auto 40px",
              maxWidth: "680px",
            }}
          >
            Whether you're an investor, institutional partner, or government stakeholder — there's a seat at the table
            in building Ghana's infrastructure future.
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <button
              onClick={() => navigate("/contact")}
              style={{
                backgroundColor: colors.accent,
                color: colors.primary,
                border: "none",
                padding: isMobile ? "16px 24px" : "18px 32px",
                borderRadius: "50px",
                fontSize: "16px",
                fontWeight: "600",
                fontFamily: "Inter, sans-serif",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
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
              onClick={() => navigate("/resources")}
              style={{
                backgroundColor: "transparent",
                color: colors.white,
                border: `2px solid rgba(255,255,255,0.3)`,
                padding: isMobile ? "16px 24px" : "18px 32px",
                borderRadius: "50px",
                fontSize: "16px",
                fontWeight: "600",
                fontFamily: "Inter, sans-serif",
                cursor: "pointer",
              }}
            >
              Explore the Full Analysis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// FOOTER
// ============================================================================

// ═══════════════════════════════════════════════
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
        {hovered !== null ? FOOTER_SECTOR_ICONS[hovered].label : "Explore 12 Sectors"}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {FOOTER_SECTOR_ICONS.map((sector, i) => {
          const isH = hovered === i;
          return (
            <a
              key={sector.key}
              href={SECTOR_ROUTES[sector.key] ?? "#"}
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

export default function InfrastructureSectorPage() {
  const isMobile = useIsMobile();
  return (
    <Layout>
    <div style={{ fontFamily: "Helvetica, Arial, sans-serif", margin: 0, padding: 0, backgroundColor: colors.white }}>


      {/* Production CSS: Animations & Hover States */}
      <style>{`
        .cta-primary {
          transition: all 0.3s ease;
        }
        .cta-primary:hover {
          background-color: #B8D935 !important;
          color: #1B4D3E !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(184,217,53,0.3);
        }
        .cta-primary:hover .cta-btn-arrow {
          background-color: rgba(27, 77, 62, 0.15) !important;
        }
        .cta-primary:hover .cta-btn-arrow svg {
          stroke: #1B4D3E !important;
        }
        .cta-lime-swap {
          transition: all 0.3s ease;
        }
        .cta-lime-swap:hover {
          background-color: #1B4D3E !important;
          color: #FFFFFF !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(27,77,62,0.3);
        }
        .cta-lime-swap:hover .cta-btn-arrow {
          background-color: rgba(255, 255, 255, 0.2) !important;
        }
        .cta-lime-swap:hover .cta-btn-arrow svg {
          stroke: #FFFFFF !important;
        }
        .cta-secondary {
          transition: all 0.3s ease;
        }
        .cta-secondary:hover {
          border-color: #1B4D3E !important;
          color: #1B4D3E !important;
          transform: translateY(-1px);
        }
        .value-card {
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .value-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(27, 77, 62, 0.12);
        }
      `}</style>

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
      <div style={{ backgroundColor: colors.primary, padding: isMobile ? "0 20px" : "0 80px" }}>
        <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)" }} />
      </div>
    </div>
    </Layout>
  );
}
