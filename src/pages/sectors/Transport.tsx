import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { IconArrowDown, IconCheck, IconLightbulb, IconWheat, IconHeart, IconFactory, IconAnchor, IconTrain, IconWarehouse, IconSnowflake, IconGraduation, IconTools, IconBox, IconPhone, IconTruck, IconShield, IconDollar, IconStorefront, IconOfficeBuilding, IconTrendingUp, IconLandmark } from "@/components/icons/SectorIcons";
import { ArrowRight, ArrowUpRight, BatteryCharging, Check, ChevronDown, Clock, Cross, Factory, Package, Route, Sprout, Truck, Users, Wallet, Warehouse } from "lucide-react";
import { colors, layout } from "@/lib/theme";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectorFinalCTA from "@/components/sectors/SectorFinalCTA";
import SectorHeroSection from "@/components/sectors/SectorHeroSection";
import { useCounter } from "@/hooks/useCounter";
import { cn } from "@/lib/utils";
import SectorSolutionsSection from "@/components/sectors/SectorSolutionsSection";

const CONTENT_MAX_WIDTH = layout.maxWidth;

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
  heroTitleBold: "Transportation",
  heroTitleRest: "& Logistics",
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
  package: <Package size={24} strokeWidth={1.5} />,
  truck: <Truck size={24} strokeWidth={1.5} />,
  warehouse: <Warehouse size={24} strokeWidth={1.5} />,
  route: <Route size={24} strokeWidth={1.5} />,
  users: <Users size={24} strokeWidth={1.5} />,
};

// ============================================================================
// 2. THE OPPORTUNITY (bg: background)
// ============================================================================

const OpportunityCard = ({ problem, isExpanded, onToggle }) => {
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
            className="font-[Inter,sans-serif] text-[#666] leading-[1.55] overflow-hidden"
            style={{
              fontSize: isMobile ? "13px" : "14px",
              margin: "8px 0 0 0",
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
          className="font-[Inter,sans-serif] text-[11px] font-bold rounded-[20px] whitespace-nowrap shrink-0 ml-3 px-[14px] py-[6px]"
          style={{
            color: problem.priority === "High Priority" ? colors.primary : colors.accentText,
            backgroundColor: problem.priority === "High Priority" ? colors.accentLight : "rgba(184,217,53,0.12)",
          }}
        >
          {problem.priority}
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
                    color: problem.priority === "High Priority" ? colors.primary : colors.accentText,
                    backgroundColor: problem.priority === "High Priority" ? colors.accentLight : "rgba(184,217,53,0.12)",
                  }}
                >
                  {problem.priority}
                </span>
              </div>
              <div className="h-2 rounded overflow-hidden" style={{ backgroundColor: colors.line }}>
                <div
                  className="h-full rounded transition-[width] duration-500 ease-in-out"
                  style={{
                    width: `${problem.priorityScore}%`,
                    backgroundColor: problem.priority === "High Priority" ? colors.primary : colors.accentText,
                  }}
                />
              </div>
            </div>

            <div className="rounded-xl p-[14px]" style={{ backgroundColor: colors.background }}>
              <span className="block font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888] mb-[10px]">
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
            <div
              className="grid gap-[10px]"
              style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}
            >
              {problem.drivers.map((cause, j) => (
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
              <span className="font-[Inter,sans-serif] text-[13px] text-[#888]">
                BRIDGE Solution:
              </span>
            </div>
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span
                className="font-[Inter,sans-serif] text-[14px] font-semibold flex-1 min-w-0"
                style={{ color: colors.primary }}
              >
                {problem.bridgeSolution}
              </span>
              <span
                className="font-[Inter,sans-serif] text-[13px] font-medium cursor-pointer flex items-center gap-1 shrink-0"
                style={{ color: colors.primary }}
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
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <div
            className="inline-flex items-center gap-2 px-5 py-[10px] rounded-full text-[11px] font-bold tracking-[2px] font-[Inter,sans-serif] uppercase mb-6"
            style={{
              border: `1px solid ${colors.line}`,
              color: colors.primary,
              backgroundColor: colors.white,
            }}
          >
            The Opportunity
          </div>
          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[820px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
              margin: "0 0 20px 0",
            }}
          >
            32M+ Lives Ready to Be <span className="font-semibold" style={{ color: colors.accent }}>Connected</span> Through
            Smarter Logistics
          </h2>
          <p
            className="font-[Inter,sans-serif] text-[#666] max-w-[680px] leading-[1.65] m-0"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
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
          <div className="flex justify-center gap-[6px] mt-4 items-center">
            {opportunities.map((_, i) => (
              <div
                key={i}
                className="h-2 rounded cursor-pointer transition-all duration-300"
                style={{
                  width: i === 0 ? "20px" : "8px",
                  backgroundColor: i === 0 ? colors.accent : colors.line,
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
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div className="text-center" style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <div
            className="inline-flex items-center gap-2 px-5 py-[10px] rounded-full text-[11px] font-bold tracking-[2px] font-[Inter,sans-serif] uppercase mb-6"
            style={{ border: `1px solid ${colors.line}`, color: colors.primary, backgroundColor: colors.white }}
          >
            The Process
          </div>
          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[600px] mx-auto"
            style={{ fontSize: isMobile ? "28px" : "44px", color: colors.primary, margin: "0 0 20px 0", marginLeft: "auto", marginRight: "auto" }}
          >
            From Producer to <span className="font-semibold" style={{ color: colors.accent }}>Prosperity</span>
          </h2>
          <p
            className="font-[Inter,sans-serif] text-[#666] max-w-[750px] leading-[1.65] mx-auto"
            style={{ fontSize: isMobile ? "15px" : "16px", margin: "0 auto" }}
          >
            Follow the journey from producer to end market — and see where strategic resources and innovation create
            compounding value at every stage.
          </p>
        </div>
        <div
          className="flex gap-1 p-[6px] justify-center"
          style={{
            marginBottom: isMobile ? "16px" : "24px",
            backgroundColor: colors.background,
            borderRadius: isMobile ? "12px" : "16px",
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
              className="border-none rounded-xl cursor-pointer transition-all duration-300 shrink-0"
              style={{
                flex: isMobile ? "none" : 1,
                minWidth: isMobile ? "80px" : "auto",
                padding: isMobile ? "12px 10px" : "16px 12px",
                backgroundColor: activeStage === i ? colors.white : "transparent",
                boxShadow: activeStage === i ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
              }}
            >
              <div
                className="mb-2 flex justify-center"
                style={{ color: activeStage === i ? colors.primary : "#999" }}
              >
                {valueChainIcons[stage.icon]}
              </div>
              <div
                className="font-[Inter,sans-serif] text-center whitespace-nowrap"
                style={{
                  fontSize: isMobile ? "11px" : "13px",
                  fontWeight: activeStage === i ? "600" : "400",
                  color: activeStage === i ? colors.dark : "#888",
                }}
              >
                {stage.shortLabel}
              </div>
            </button>
          ))}
        </div>
        {valueChainStages[activeStage] && (
          <div
            className="grid items-stretch gap-6"
            style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}
          >
            <div
              className="rounded-[20px] flex flex-col"
              style={{
                backgroundColor: colors.background,
                padding: isMobile ? "24px" : "32px",
                border: `1px solid ${colors.line}`,
              }}
            >
              <div className="flex items-center gap-[14px] mb-6">
                <div
                  className="w-[44px] h-[44px] rounded-xl flex items-center justify-center text-[14px]"
                  style={{ backgroundColor: colors.white, color: colors.primary }}
                >
                  {valueChainIcons[valueChainStages[activeStage].icon]}
                </div>
                <div>
                  <h3
                    className="font-[Inter,sans-serif] text-[22px] font-semibold m-0"
                    style={{ color: colors.dark }}
                  >
                    {valueChainStages[activeStage].stage}
                  </h3>
                  <span className="font-[Inter,sans-serif] text-[13px] text-[#999]">
                    {valueChainStages[activeStage].actor}
                  </span>
                </div>
              </div>
              <div className="font-[Inter,sans-serif] text-[14px] text-[#555] mb-7 leading-[1.5]">
                {valueChainStages[activeStage].population}
              </div>
              <div className="mb-7">
                <div className="flex justify-between mb-2">
                  <span className="font-[Inter,sans-serif] text-[12px] text-[#999]">
                    Value Retained
                  </span>
                  <span
                    className="font-[Poppins,sans-serif] text-[14px] font-bold"
                    style={{ color: colors.primary }}
                  >
                    {valueChainStages[activeStage].valueRetained}%
                  </span>
                </div>
                <div className="h-[6px] rounded-[3px]" style={{ backgroundColor: colors.line }}>
                  <div
                    className="h-full rounded-[3px] transition-[width] duration-[600ms] ease-in-out"
                    style={{
                      width: `${valueChainStages[activeStage].valueRetained}%`,
                      backgroundColor: colors.primary,
                    }}
                  />
                </div>
              </div>
              <div
                className="mt-auto rounded-[14px] flex items-center justify-between gap-3"
                style={{ padding: "18px 20px", backgroundColor: colors.white }}
              >
                <span
                  className="font-[Poppins,sans-serif] text-[22px] font-bold whitespace-nowrap"
                  style={{ color: colors.primary }}
                >
                  {valueChainStages[activeStage].stat}
                </span>
                <span className="font-[Inter,sans-serif] text-[10px] font-semibold text-[#aaa] uppercase tracking-[1px] whitespace-nowrap">
                  Key Metric
                </span>
              </div>
            </div>
            {(!isMobile || showMoreProcess) && (
              <div
                className="rounded-[20px] flex flex-col"
                style={{
                  backgroundColor: colors.background,
                  padding: isMobile ? "24px" : "28px",
                  border: `1px solid ${colors.line}`,
                }}
              >
                <span
                  className="block font-[Inter,sans-serif] text-[11px] font-bold uppercase tracking-[1.5px] mb-4"
                  style={{ color: colors.primary }}
                >
                  Opportunities at This Stage
                </span>
                <div className="flex flex-col gap-[10px] flex-1">
                  {valueChainStages[activeStage].opportunities.map((point, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl flex-1"
                      style={{ padding: "14px 16px", backgroundColor: colors.white }}
                    >
                      <span
                        className="font-[Poppins,sans-serif] text-[12px] font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                        style={{ color: colors.primary, backgroundColor: colors.accentLight }}
                      >
                        {i + 1}
                      </span>
                      <span className="font-[Inter,sans-serif] text-[14px]" style={{ color: colors.dark }}>
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
                className="flex items-center justify-center gap-2 w-full p-[14px] mt-4 bg-transparent rounded-xl font-[Inter,sans-serif] text-[14px] font-semibold cursor-pointer"
                style={{ border: `1px solid ${colors.line}`, color: colors.primary }}
              >
                {showMoreProcess ? "Show less" : "Show opportunities"}
                <ChevronDown size={14} strokeWidth={2.5} color={colors.primary} style={{ transform: showMoreProcess ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }} />
              </button>
            )}
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
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div style={{ marginBottom: isMobile ? "32px" : "60px", textAlign: isMobile ? "center" : "left" }}>
          <div
            className="inline-flex items-center gap-2 px-5 py-[10px] rounded-full text-[11px] font-bold tracking-[2px] font-[Inter,sans-serif] uppercase mb-6"
            style={{ border: `1px solid ${colors.line}`, color: colors.primary, backgroundColor: colors.white }}
          >
            The Landscape
          </div>
          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[800px]"
            style={{ fontSize: isMobile ? "28px" : "44px", color: colors.primary, margin: "0 0 20px" }}
          >
            Building With Ghana's <span className="font-semibold" style={{ color: colors.accent }}>Logistics Leaders</span>
          </h2>
          <p
            className="font-[Inter,sans-serif] text-[#666] max-w-[750px] leading-[1.65] m-0"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
          >
            Ghana's logistics ecosystem includes global operators, innovative startups, and established local platforms
            — each bringing strengths that complement BRIDGE's focus on the underserved 80%.
          </p>
        </div>

        {/* Mobile: horizontal scroll pills */}
        {isMobile && (
          <div
            className="flex gap-2 overflow-x-auto"
            style={{ WebkitOverflowScrolling: "touch", margin: "0 -20px 16px", padding: "0 20px 4px" }}
          >
            {sector.competitors.map((comp, i) => (
              <button
                key={i}
                onClick={() => { setActiveAlly(i); setShowMoreLandscape(false); }}
                className="rounded-full px-[18px] py-[10px] text-[13px] font-semibold font-[Inter,sans-serif] cursor-pointer whitespace-nowrap shrink-0"
                style={{
                  backgroundColor: activeAlly === i ? colors.primary : colors.white,
                  color: activeAlly === i ? colors.white : colors.dark,
                  border: activeAlly === i ? "none" : `1px solid ${colors.line}`,
                }}
              >
                {comp.name}
              </button>
            ))}
          </div>
        )}

        <div
          className="grid items-stretch"
          style={{ gridTemplateColumns: isMobile ? "1fr" : "280px 1fr", gap: isMobile ? "16px" : "24px" }}
        >
          {/* Desktop sidebar */}
          {!isMobile && (
            <div className="flex flex-col gap-[6px] justify-between">
              {sector.competitors.map((comp, i) => (
                <button
                  key={i}
                  onClick={() => setActiveAlly(i)}
                  className="rounded-[14px] cursor-pointer text-left transition-all duration-200 px-4 py-[14px]"
                  style={{
                    backgroundColor: activeAlly === i ? colors.primary : colors.white,
                    border: `1px solid ${activeAlly === i ? colors.primary : colors.line}`,
                  }}
                >
                  <div
                    className="font-[Inter,sans-serif] text-[14px] font-semibold"
                    style={{ color: activeAlly === i ? colors.white : colors.dark }}
                  >
                    {comp.name}
                  </div>
                  <div
                    className="font-[Inter,sans-serif] text-[11px] mt-[2px] whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{ color: activeAlly === i ? "rgba(255,255,255,0.6)" : "#999" }}
                  >
                    {comp.focus}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Detail panel */}
          <div
            className="rounded-[20px]"
            style={{ backgroundColor: colors.white, padding: isMobile ? "24px" : "32px", border: `1px solid ${colors.line}` }}
          >
            {sector.competitors[activeAlly] &&
              (() => {
                const comp = sector.competitors[activeAlly];
                return (
                  <>
                    <div className="flex justify-between items-start mb-6 flex-wrap gap-3">
                      <div>
                        <h3
                          className="font-[Inter,sans-serif] font-semibold"
                          style={{ fontSize: isMobile ? "20px" : "22px", color: colors.dark, margin: "0 0 4px 0" }}
                        >
                          {comp.name}
                        </h3>
                        <span className="font-[Inter,sans-serif] text-[13px] text-[#999]">{comp.focus}</span>
                      </div>
                      <div className="flex gap-2">
                        <span
                          className="rounded-full text-[11px] font-bold font-[Inter,sans-serif] px-[14px] py-[6px]"
                          style={{ backgroundColor: colors.background, color: colors.primary, border: `1px solid ${colors.line}` }}
                        >
                          Est. {comp.year}
                        </span>
                        <span
                          className="rounded-full text-[11px] font-bold font-[Inter,sans-serif] px-[14px] py-[6px]"
                          style={{ backgroundColor: colors.background, color: colors.primary, border: `1px solid ${colors.line}` }}
                        >
                          {comp.funding}
                        </span>
                      </div>
                    </div>
                    <div className="mb-6">
                      <span className="block font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1.5px] text-[#aaa] mb-3">
                        Strengths
                      </span>
                      {comp.strengths.map((s, i) => (
                        <div key={i} className="flex justify-between items-center py-[10px]">
                          <span className="font-[Inter,sans-serif] text-[13px]" style={{ color: colors.dark }}>{s.name}</span>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <div
                                key={n}
                                className="w-5 h-[6px] rounded-[3px]"
                                style={{ backgroundColor: n <= s.rating ? colors.accent : colors.line }}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    {(!isMobile || showMoreLandscape) && (
                      <>
                        <div className="mb-4">
                          <span className="block font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1.5px] text-[#aaa] mb-[10px]">
                            Collaboration Opportunities
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {comp.gaps.map((g, i) => (
                              <span
                                key={i}
                                className="font-[Inter,sans-serif] text-[12px] rounded-full px-[14px] py-[6px]"
                                style={{ color: colors.primary, border: `1px solid ${colors.line}`, backgroundColor: colors.background }}
                              >
                                {g}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="rounded-[14px] px-5 py-4" style={{ backgroundColor: colors.background }}>
                          <span
                            className="block font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1.5px] mb-[6px]"
                            style={{ color: colors.primary }}
                          >
                            BRIDGE Opportunity
                          </span>
                          <p className="font-[Inter,sans-serif] text-[13px] text-[#555] leading-[1.5] m-0">
                            {comp.bridgeOpportunity}
                          </p>
                        </div>
                      </>
                    )}
                    {isMobile && (
                      <button
                        onClick={() => setShowMoreLandscape(!showMoreLandscape)}
                        className="flex items-center justify-center gap-2 w-full p-[14px] mt-4 bg-transparent rounded-xl font-[Inter,sans-serif] text-[14px] font-semibold cursor-pointer"
                        style={{ border: `1px solid ${colors.line}`, color: colors.primary }}
                      >
                        {showMoreLandscape ? "Show less" : "Show more details"}
                        <ChevronDown size={14} strokeWidth={2.5} color={colors.primary} style={{ transform: showMoreLandscape ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }} />
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
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);
  const [showAllPolicies, setShowAllPolicies] = useState(false);

  const categories = [
    { id: "all", label: "All", shortLabel: "All" },
    { id: "funding", label: "Direct Funding", shortLabel: "Funding" },
    { id: "tax", label: "Tax Incentives", shortLabel: "Tax" },
    { id: "infrastructure", label: "Infrastructure", shortLabel: "Infra" },
    { id: "partnerships", label: "Partnerships", shortLabel: "Partners" },
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
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div style={{ marginBottom: isMobile ? "24px" : "40px", textAlign: isMobile ? "left" : "center" }}>
          <div
            className="inline-flex items-center gap-2 px-5 py-[10px] rounded-full text-[11px] font-bold tracking-[2px] font-[Inter,sans-serif] uppercase mb-6"
            style={{ border: `1px solid ${colors.line}`, color: colors.primary, backgroundColor: colors.white }}
          >
            Policy &amp; Governance
          </div>
          <h2
            className="font-['DM_Sans',sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[900px]"
            style={{ fontSize: isMobile ? "28px" : "42px", color: colors.primary, margin: isMobile ? "0 0 16px" : "0 auto 16px" }}
          >
            Moving in Step with Ghana's <span className="font-semibold">Transport</span>{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>Vision</span>
          </h2>
          <p
            className="font-['DM_Sans',sans-serif] text-[#555] max-w-[750px] leading-[1.65]"
            style={{ fontSize: isMobile ? "15px" : "16px", margin: isMobile ? "0 0 32px" : "0 auto 32px" }}
          >
            Connect24 creates the corridors — BRIDGE builds the services, technology, and human capital that make them
            work for ordinary Ghanaians.
          </p>
          <div
            style={
              isMobile
                ? {
                    display: "inline-flex",
                    gap: "4px",
                    border: `1px solid ${colors.line}`,
                    borderRadius: "50px",
                    backgroundColor: colors.background,
                    padding: "4px",
                  }
                : { display: "flex", gap: "8px", justifyContent: "center", flexWrap: "nowrap" }
            }
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className="rounded-full cursor-pointer font-['DM_Sans',sans-serif] transition-all duration-200 ease-in-out whitespace-nowrap shrink-0"
                style={{
                  padding: isMobile ? "5px 10px" : "6px 16px",
                  fontSize: isMobile ? "11px" : "12px",
                  fontWeight: activeCategory === cat.id ? "700" : "500",
                  backgroundColor: activeCategory === cat.id ? colors.accentLight : "transparent",
                  border: isMobile
                    ? activeCategory === cat.id
                      ? `1.5px solid ${colors.accent}`
                      : "none"
                    : activeCategory === cat.id
                      ? `1.5px solid ${colors.accent}`
                      : `1px solid ${colors.line}`,
                  color: activeCategory === cat.id ? colors.primary : "#999",
                }}
              >
                {isMobile ? cat.shortLabel : cat.label}
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
                className="shrink-0 cursor-pointer flex flex-col rounded-2xl transition-all duration-300"
                style={{
                  minWidth: isMobile ? "calc(100% - 40px)" : "280px",
                  maxWidth: isMobile ? "calc(100% - 40px)" : isExpanded ? "420px" : "280px",
                  backgroundColor: colors.background,
                  border: isExpanded ? `2px solid ${colors.accent}` : `2px solid ${colors.primary}`,
                  padding: isMobile ? "20px" : "24px",
                  ...(isMobile ? { scrollSnapAlign: "start" } : {}),
                }}
              >
                <div className="flex justify-between items-center mb-3 min-h-6">
                  <span
                    className="font-['DM_Sans',sans-serif] text-[9px] font-bold uppercase rounded-full shrink-0 px-[10px] py-[3px]"
                    style={{ color: colors.primary, backgroundColor: badge.bg, border: `1px solid ${badge.border}` }}
                  >
                    {p.category}
                  </span>
                  {p.relevance && (
                    <div className="flex gap-1">
                      {p.relevance.map((r) => (
                        <span
                          key={r}
                          className="font-['DM_Sans',sans-serif] text-[9px] font-semibold text-[#888] uppercase rounded-full bg-black/[0.04] shrink-0 px-2 py-[3px]"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div
                  className="font-['DM_Sans',sans-serif] text-[16px] font-bold min-h-[42px] mb-2 overflow-hidden"
                  style={{ color: colors.primary, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}
                >
                  {p.policy}
                </div>
                <div
                  className="font-['DM_Sans',sans-serif] text-[13px] font-bold mb-[10px] min-h-[18px] whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ color: colors.accent }}
                >
                  {p.allocation}
                </div>
                <div
                  className="font-['DM_Sans',sans-serif] text-[13px] text-[#666] leading-[1.5] min-h-[58px] mb-3 overflow-hidden"
                  style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}
                >
                  {p.alignment}
                </div>
                <div
                  className="mt-auto flex items-center gap-[6px] font-['DM_Sans',sans-serif] text-[11px] font-semibold opacity-60"
                  style={{ color: colors.primary }}
                >
                  BRIDGE alignment
                </div>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isExpanded ? "500px" : "0", opacity: isExpanded ? 1 : 0 }}
                >
                  <div className="mt-[14px] pt-[14px]" style={{ borderTop: `1px solid ${colors.line}` }}>
                    <div className="font-['DM_Sans',sans-serif] text-[11px] text-[#888] mb-2">
                      {p.body}
                    </div>
                    <div className="font-['DM_Sans',sans-serif] text-[13px] text-[#444] leading-[1.55] mb-[14px]">
                      {p.bridgeRole}
                    </div>
                    {p.pillars && (
                      <div className="flex flex-wrap gap-[6px] mb-[14px]">
                        {p.pillars.map((pill) => (
                          <span
                            key={pill}
                            className="font-['DM_Sans',sans-serif] text-[10px] font-semibold bg-[rgba(184,217,53,0.12)] rounded-full px-3 py-1"
                            style={{ color: colors.accent }}
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-col gap-[6px]">
                      {p.bridgeVentures.map((v) => (
                        <div
                          key={v}
                          className="rounded-[10px] flex items-center gap-[10px] px-[14px] py-[10px]"
                          style={{ backgroundColor: colors.primary }}
                        >
                          <div
                            className="w-[6px] h-[6px] rounded-full shrink-0"
                            style={{ backgroundColor: colors.accent }}
                          />
                          <span
                            className="font-['DM_Sans',sans-serif] text-[12px] font-semibold"
                            style={{ color: colors.white }}
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
          <div className="flex justify-center gap-1.5 mb-6 items-center">
            {filtered.map((_, i) => (
              <div
                key={i}
                className="h-2 rounded transition-all duration-300 ease-in-out"
                style={{
                  width: expandedCard === i ? "20px" : "8px",
                  backgroundColor: expandedCard === i ? colors.accent : colors.line,
                }}
              />
            ))}
          </div>
        )}

        <div
          className="rounded-2xl flex gap-4 text-left"
          style={{
            backgroundColor: colors.primary,
            padding: isMobile ? "20px 24px" : "28px 32px",
            justifyContent: isMobile ? "flex-start" : "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <div>
            <div
              className="font-['DM_Sans',sans-serif] font-semibold"
              style={{ fontSize: isMobile ? "16px" : "18px", color: colors.white }}
            >
              BRIDGE complements — never competes with — government vision.
            </div>
            <div
              className="font-['DM_Sans',sans-serif] text-white/60 mt-1"
              style={{ fontSize: isMobile ? "13px" : "14px" }}
            >
              Every venture aligns with at least one active government policy or initiative.
            </div>
          </div>
          <a
            href="/contact"
            onClick={(e) => { e.preventDefault(); navigate("/contact"); }}
            className="font-['DM_Sans',sans-serif] text-[13px] font-bold rounded-full no-underline whitespace-nowrap text-center px-6 py-3"
            style={{
              color: colors.primary,
              backgroundColor: colors.accent,
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
  const navigate = useNavigate();
  const [activeNode, setActiveNode] = useState(null);
  const [showMoreRipple, setShowMoreRipple] = useState(false);
  const isMobile = useIsMobile();

  const SECTOR_ROUTES: Record<string, string> = {
    "Agriculture": "/sectors/agriculture",
    "Agriculture & Value Chains": "/sectors/agriculture",
    "Health Systems": "/sectors/health",
    "Health": "/sectors/health",
    "Manufacturing": "/sectors/manufacturing",
    "Energy": "/sectors/energy",
    "Energy & Renewables": "/sectors/energy",
    "Financial Inclusion": "/sectors/financial",
    "Finance": "/sectors/financial",
    "Infrastructure": "/sectors/infrastructure",
    "Technology": "/sectors/technology",
    "Education & Skills": "/sectors/education",
    "Transportation": "/sectors/transport",
    "Housing & Real Estate": "/sectors/housing",
    "Tourism & Hospitality": "/sectors/tourism",
    "Creative Industries": "/sectors/sports",
  };

  const crossSectorIcons = {
  6: (c) => <Sprout size={20} strokeWidth={1.5} color={c} />,
  3: (c) => <Cross size={20} strokeWidth={1.5} color={c} />,
  11: (c) => <Factory size={20} strokeWidth={1.5} color={c} />,
  10: (c) => <BatteryCharging size={20} strokeWidth={1.5} color={c} />,
  2: (c) => <Wallet size={20} strokeWidth={1.5} color={c} />,
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
      className="relative"
      style={{ backgroundColor: colors.primary, padding: isMobile ? "60px 20px" : "100px 80px" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 80%, rgba(184,217,53,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(184,217,53,0.04) 0%, transparent 50%)",
        }}
      />
      <div className="mx-auto relative text-center" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Header */}
        <div
          className="inline-flex items-center gap-2 px-5 py-[10px] rounded-full text-[11px] font-bold tracking-[2px] font-[Inter,sans-serif] uppercase mb-6 border border-white/15 bg-white/[0.08]"
          style={{ color: colors.accent }}
        >
          The Ripple Effect
        </div>
        <h2
          className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] mx-auto mb-4 max-w-[820px]"
          style={{ fontSize: isMobile ? "28px" : "42px", color: colors.white }}
        >
          How Transportation <span className="font-semibold" style={{ color: colors.accent }}>Amplifies Impact</span>
        </h2>
        <p className="font-[Inter,sans-serif] text-[16px] leading-[1.65] text-white/60 max-w-[680px]" style={{ margin: "0 auto 48px" }}>
          When goods move efficiently, transit systems serve workers, and logistics costs fall — the ripple effects
          connect producers to markets, reduce consumer prices, and accelerate commerce across Ghana.
        </p>

        {/* Icon Row */}
        {isMobile ? (
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <div className="flex flex-col items-center gap-[6px]">
                <div
                  className="w-14 h-14 rounded-[14px] flex items-center justify-center"
                  style={{ backgroundColor: colors.accent, color: colors.primary, boxShadow: "0 0 24px rgba(184, 217, 53, 0.3)" }}
                >
                  <IconTruck />
                </div>
                <span
                  className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[0.5px]"
                  style={{ color: colors.accent }}
                >
                  TRANSPORT
                </span>
              </div>
            </div>
            <div className="flex justify-center gap-3">
              {pathways.map((p, i) => {
                const isActive = activeNode === i;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveNode(isActive ? null : i);
                      setShowMoreRipple(false);
                    }}
                    className="flex flex-col items-center gap-1.5 bg-none border-none cursor-pointer p-1 transition-all duration-300 ease-in-out"
                    style={{ opacity: activeNode !== null && !isActive ? 0.4 : 1 }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ease-in-out"
                      style={{
                        backgroundColor: isActive ? colors.accent : "rgba(255,255,255,0.08)",
                        border: isActive ? "none" : "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {crossSectorIcons[p.sectorId](isActive ? colors.primary : "rgba(255,255,255,0.6)")}
                    </div>
                    <span
                      className="font-[Inter,sans-serif] text-[10px] font-semibold max-w-[60px] leading-[1.2] text-center whitespace-nowrap overflow-hidden text-ellipsis"
                      style={{ color: isActive ? colors.white : "rgba(255,255,255,0.5)" }}
                    >
                      {crossSectorShortNames[i]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex items-start justify-center gap-8 mb-12">

            <div className="w-[120px] flex flex-col items-center shrink-0">
              <div
                className="w-20 h-20 rounded-[20px] flex items-center justify-center mb-[10px] shadow-[0_0_30px_rgba(184,217,53,0.3)]"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.primary,
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
                  className="w-[120px] flex flex-col items-center bg-none border-none cursor-pointer p-0 transition-all duration-300 ease-in-out"
                  style={{
                    opacity: activeNode !== null && !isActive ? 0.4 : 1,
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ease-in-out mb-[10px]"
                    style={{
                      backgroundColor: isActive ? colors.accent : "rgba(255,255,255,0.08)",
                      border: isActive ? "none" : "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {crossSectorIcons[p.sectorId](isActive ? colors.primary : "rgba(255,255,255,0.6)")}
                  </div>
                  <span
                    className="font-[Inter,sans-serif] text-[13px] font-semibold text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]"
                    style={{ color: isActive ? colors.white : "rgba(255,255,255,0.5)" }}
                  >
                    {crossSectorShortNames[i]}
                  </span>
                  <span
                    className="font-[Poppins,sans-serif] text-[20px] font-bold mt-1"
                    style={{ color: isActive ? colors.accent : "rgba(255,255,255,0.3)" }}
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
                className="font-[Inter,sans-serif] text-[15px] text-white/50 text-center py-5"
              >
                Tap a sector above to explore how transport amplifies its impact
              </p>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-5">
                  <span
                    className="font-[Inter,sans-serif] text-[16px] font-semibold"
                    style={{ color: colors.white }}
                  >
                    Cross-Sector Integration Opportunities
                  </span>
                  <span className="font-[Inter,sans-serif] text-[13px] text-white/40">
                    Click a sector above to explore
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {pathways.map((p, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveNode(i)}
                      className="bg-white/5 rounded-2xl py-6 px-5 cursor-pointer transition-all duration-200 ease-in-out"
                    >
                      <div
                        className="font-[Inter,sans-serif] text-[14px] font-semibold mb-2"
                        style={{ color: colors.white }}
                      >
                        {p.name}
                      </div>
                      <div className="font-[Inter,sans-serif] text-[13px] text-white/45 h-10 overflow-hidden">
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
            <div>
              {/* Breadcrumb */}
              <div className="flex gap-2 flex-wrap mb-7 items-center">
                {pathways[activeNode].pathLabel.split(" → ").map((seg, si, arr) => (
                  <React.Fragment key={si}>
                    <span
                      className="font-[Inter,sans-serif] text-[13px] px-[14px] py-1.5 rounded-full"
                      style={{
                        fontWeight: si === 0 ? "700" : "500",
                        color: si === 0 ? colors.accent : "rgba(255,255,255,0.7)",
                        backgroundColor: si === 0 ? "rgba(184, 217, 53, 0.15)" : "rgba(255,255,255,0.05)",
                      }}
                    >
                      {seg}
                    </span>
                    {si < arr.length - 1 && <span className="text-[14px]" style={{ color: colors.accent }}>→</span>}
                  </React.Fragment>
                ))}
              </div>

              {/* 3-column grid */}
              <div
                className="grid"
                style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: isMobile ? "24px" : "32px" }}
              >
                {/* Col 1: Why It Matters */}
                <div>
                  <h4
                    className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1px] mb-4"
                    style={{ color: colors.accent }}
                  >
                    Why It Matters
                  </h4>
                  <p
                    className="font-[Inter,sans-serif] text-[15px] text-white/70 leading-[1.6] mb-5"
                  >
                    {pathways[activeNode].impact}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-[Poppins,sans-serif] text-[32px] font-bold"
                      style={{ color: colors.accent }}
                    >
                      {pathways[activeNode].multiplier}
                    </span>
                    <span className="font-[Inter,sans-serif] text-[13px] text-white/40">
                      value multiplier
                    </span>
                  </div>
                </div>

                {/* Col 2: Synergy Pathways (collapsible mobile) */}
                {(!isMobile || showMoreRipple) && (
                  <div>
                    <h4
                      className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1px] mb-4"
                      style={{ color: colors.accent }}
                    >
                      Synergy Pathways
                    </h4>
                    <div className="flex flex-col gap-[10px]">
                      {pathways[activeNode].synergies.map((s, si) => (
                        <div
                          key={si}
                          className="flex gap-3 px-4 py-3 rounded-[10px] bg-white/5 border border-white/[0.06]"
                        >
                          <span className="text-[8px] mt-1" style={{ color: colors.accent }}>●</span>
                          <span className="font-[Inter,sans-serif] text-[14px] text-white/75">
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
                      className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1px] mb-4"
                      style={{ color: colors.accent }}
                    >
                      Linked Ventures
                    </h4>
                    <div className="flex flex-col gap-[10px]">
                      {pathways[activeNode].bridgeVentures.map((v, vi) => (
                        <div
                          key={vi}
                          className="bg-[rgba(184,217,53,0.1)] border border-[rgba(184,217,53,0.15)] py-[14px] px-[18px] rounded-xl flex justify-between items-center"
                        >
                          <span
                            className="font-[Inter,sans-serif] text-[14px] font-semibold"
                            style={{ color: colors.white }}
                          >
                            {v}
                          </span>
                          <span className="text-[16px]" style={{ color: colors.accent }}>→</span>
                        </div>
                      ))}
                    </div>
                    <a
                      href={SECTOR_ROUTES[pathways[activeNode].name] || "#"}
                      onClick={(e) => {
                        e.preventDefault();
                        const route = SECTOR_ROUTES[pathways[activeNode].name];
                        if (route) navigate(route);
                      }}
                      className="inline-flex items-center gap-2 mt-5 font-[Inter,sans-serif] text-[14px] font-semibold no-underline"
                      style={{ color: colors.accent }}
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
                  className="w-full p-[14px] mt-4 bg-transparent border border-white/15 rounded-xl font-[Inter,sans-serif] text-[14px] font-semibold cursor-pointer flex items-center justify-center gap-2"
                  style={{ color: colors.white }}
                >
                  Show more details
                  <ChevronDown size={14} strokeWidth={2} color="white" />
                </button>
              )}
              {isMobile && showMoreRipple && (
                <button
                  onClick={() => setShowMoreRipple(false)}
                  className="w-full p-[14px] mt-4 bg-transparent border border-white/15 rounded-xl font-[Inter,sans-serif] text-[14px] font-semibold cursor-pointer flex items-center justify-center gap-2"
                  style={{ color: colors.white }}
                >
                  Show less
                  <ChevronDown size={14} strokeWidth={2} color="white" style={{ transform: "rotate(180deg)" }} />
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
  const navigate = useNavigate();
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
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div
          style={{
            textAlign: isMobile ? "center" : "left",
            marginBottom: isMobile ? "32px" : "48px",
            padding: isMobile ? "0 20px" : 0,
          }}
        >
          <div
            className="inline-flex items-center gap-2 px-5 py-[10px] rounded-full text-[11px] font-bold tracking-[2px] font-[Inter,sans-serif] uppercase mb-6"
            style={{ border: `1px solid ${colors.line}`, color: colors.primary, backgroundColor: colors.white }}
          >
            Investment Opportunity
          </div>
          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[820px]"
            style={{ fontSize: isMobile ? "28px" : "42px", color: colors.primary, margin: isMobile ? "0 auto 16px" : "0 0 16px" }}
          >
            Every <span className="font-semibold">Stakeholder</span> Has a Role in{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>Ghana's Logistics Transformation</span>
          </h2>
          <p
            className="font-[Inter,sans-serif] text-[#666] leading-[1.65] max-w-[700px]"
            style={{
              fontSize: isMobile ? "15px" : "16px",
              margin: isMobile ? "0 auto" : "0",
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
          <div className="flex justify-center gap-3 mb-6 px-5">
            {audiences.map((aud, idx) => {
              const isActive = activeAudience === idx;
              return (
                <button
                  key={aud.key}
                  onClick={() => setActiveAudience(idx)}
                  className="flex flex-col items-center gap-1.5 bg-none border-none p-2 cursor-pointer transition-all duration-200 ease-in-out"
                  style={{ opacity: isActive ? 1 : 0.4 }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ease-in-out"
                    style={{
                      backgroundColor: isActive ? colors.accentLight : colors.background,
                      border: isActive ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                      color: isActive ? colors.primary : "#999",
                    }}
                  >
                    {aud.icon}
                  </div>
                  <span
                    className="font-[Inter,sans-serif] text-[10px] font-semibold"
                    style={{ color: colors.primary }}
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
                  className="flex items-center gap-2 py-3 px-6 rounded-full font-[Inter,sans-serif] text-[14px] cursor-pointer transition-all duration-[250ms] ease-in-out shrink-0"
                  style={{
                    border: isActive ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                    backgroundColor: isActive ? colors.accentLight : "transparent",
                    color: isActive ? colors.primary : "#999",
                    fontWeight: isActive ? "700" : "500",
                  }}
                >
                  <span
                    className="flex transition-all duration-[250ms] ease-in-out"
                    style={{ color: isActive ? colors.primary : "#999" }}
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
          <div className="flex flex-col">
            {!isMobile && (
              <h3
                className="font-[Inter,sans-serif] text-[32px] font-light leading-[1.25] tracking-[-0.3px] m-0 mb-4"
                style={{ color: colors.primary }}
              >
                {activeAudienceData.headline}
              </h3>
            )}
            {!isMobile && (
              <p className="font-[Inter,sans-serif] text-[15px] text-[#555] leading-[1.7] m-0 mb-6">
                {activeAudienceData.pitch}
              </p>
            )}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {activeAudienceData.stats.map((stat, idx) => (
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
                    style={{ fontSize: isMobile ? "20px" : "26px", color: colors.accent }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="font-[Inter,sans-serif] font-semibold mb-[2px]"
                    style={{ fontSize: isMobile ? "11px" : "12px", color: colors.primary }}
                  >
                    {stat.label}
                  </div>
                  <div className="font-[Inter,sans-serif] text-[10px] text-[#888]">{stat.detail}</div>
                </div>
              ))}
            </div>
            <div className="flex-1 flex flex-col gap-[10px] mb-5">
              <div
                className="font-[Inter,sans-serif] text-[11px] font-bold uppercase tracking-[1px] mb-1 opacity-50"
                style={{ color: colors.primary }}
              >
                Your Engagement
              </div>
              {activeAudienceData.pathways.map((path, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-[10px]"
                  style={{
                    padding: isMobile ? "10px 14px" : "12px 16px",
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.line}`,
                  }}
                >
                  <div className="flex flex-col gap-[2px] flex-1 overflow-hidden">
                    <div
                      className="font-[Inter,sans-serif] font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
                      style={{ fontSize: isMobile ? "11px" : "12px", color: colors.primary }}
                    >
                      {path.bring}
                    </div>
                    <div
                      className="font-[Inter,sans-serif] text-[#777] leading-[1.4] whitespace-nowrap overflow-hidden text-ellipsis"
                      style={{ fontSize: isMobile ? "11px" : "12px" }}
                    >
                      {path.get}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="bg-[rgba(27,77,62,0.06)] rounded-xl flex items-center gap-[10px]"
              style={{ padding: isMobile ? "12px 14px" : "14px 18px" }}
            >
              <div className="shrink-0 flex" style={{ color: colors.primary }}>
                <IconCheck />
              </div>
              <div
                className="font-[Inter,sans-serif] text-[#444] leading-[1.4] whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ fontSize: isMobile ? "11px" : "13px" }}
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
              <div className="flex bg-white/[0.08] rounded-xl p-1 mb-5 shrink-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className="flex-1 border-none py-3 px-5 rounded-[10px] text-[14px] font-[Inter,sans-serif] cursor-pointer transition-all duration-200 ease-in-out"
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
              <div className="flex flex-col gap-[10px] flex-1">
                {tabContent[activeTab].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 rounded-xl flex gap-4 items-center flex-1"
                    style={{
                      padding: isMobile ? "16px" : "18px 20px",
                      minHeight: isMobile ? "auto" : "0",
                    }}
                  >
                    <div className="shrink-0" style={{ width: isMobile ? "90px" : "110px" }}>
                      <div
                        className="font-[Poppins,sans-serif] font-bold leading-[1.1] whitespace-nowrap overflow-hidden text-ellipsis"
                        style={{ fontSize: isMobile ? "18px" : "20px", color: colors.accent }}
                      >
                        {item.value}
                      </div>
                      <div className="font-[Inter,sans-serif] text-[9px] text-white/35 uppercase tracking-[0.5px] mt-1 leading-[1.3]">
                        {item.label}
                      </div>
                    </div>
                    <div className="font-[Inter,sans-serif] text-[13px] text-white/70 leading-[1.55] border-l border-white/10 pl-4 flex-1">
                      {item.detail}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 py-[14px] px-5 bg-white/5 rounded-xl flex justify-between items-center shrink-0">
                <span className="font-[Inter,sans-serif] text-[13px] text-white/45">
                  Full financial model available
                </span>
                <a
                  href="/resources"
                  onClick={(e) => { e.preventDefault(); navigate("/resources"); }}
                  className="font-[Inter,sans-serif] text-[14px] font-bold no-underline inline-flex items-center gap-1.5 shrink-0"
                  style={{ color: colors.accent }}
                >
                  Download Prospectus <span className="text-[16px]">→</span>
                </a>
              </div>
            </div>
          )}

          {/* Mobile Toggle */}
          {isMobile && !showInvestmentDetails && (
            <button
              onClick={() => setShowInvestmentDetails(true)}
              className="flex items-center justify-center gap-2 w-full p-[14px] bg-transparent rounded-xl font-[Inter,sans-serif] text-[14px] font-semibold cursor-pointer"
              style={{ border: `1px solid ${colors.line}`, color: colors.primary }}
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
// METRIC ROW COMPONENT (extracted to avoid hook-in-loop violation)
// ============================================================================


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
          <div className="flex justify-between items-start">
            <div className="flex items-baseline gap-1 flex-nowrap">
              <span
                className="font-[Poppins,sans-serif] text-[24px] font-bold tracking-[-1px] whitespace-nowrap"
                style={{ color: colors.primary }}
              >
                {formatValue(count, item)}
              </span>
              {item.context && (
                <span className="font-['DM_Sans',sans-serif] text-[12px] font-medium text-[#888]">
                  {item.context}
                </span>
              )}
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <div
                className="font-['DM_Sans',sans-serif] text-[9px] font-bold uppercase tracking-[0.5px]"
                style={{ color: colors.accent }}
              >
                {item.trend}
              </div>
              <div
                className="font-['DM_Sans',sans-serif] text-[10px] font-semibold whitespace-nowrap"
                style={{ color: colors.primary }}
              >
                {item.ventures}
              </div>
            </div>
          </div>
          <div>
            <div
              className="font-['DM_Sans',sans-serif] text-[14px] font-bold mb-[2px]"
              style={{ color: colors.primary }}
            >
              {item.label}
            </div>
            <div className="font-['DM_Sans',sans-serif] text-[12px] text-[#666] leading-[1.45]">
              {item.description}
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="flex items-baseline gap-1 flex-nowrap">
              <span
                className="font-[Poppins,sans-serif] text-[28px] font-bold tracking-[-1px] whitespace-nowrap"
                style={{ color: colors.primary }}
              >
                {formatValue(count, item)}
              </span>
              {item.context && (
                <span className="font-['DM_Sans',sans-serif] text-[13px] font-medium text-[#888]">
                  {item.context}
                </span>
              )}
            </div>
            <div
              className="font-['DM_Sans',sans-serif] text-[10px] font-bold uppercase tracking-[0.5px] mt-1"
              style={{ color: colors.accent }}
            >
              {item.trend}
            </div>
          </div>
          <div>
            <div
              className="font-['DM_Sans',sans-serif] text-[15px] font-bold mb-1"
              style={{ color: colors.primary }}
            >
              {item.label}
            </div>
            <div className="font-['DM_Sans',sans-serif] text-[13px] text-[#666] leading-[1.5]">
              {item.description}
            </div>
          </div>
          <div
            className="rounded-[10px] overflow-hidden px-4 py-[10px]"
            style={{ backgroundColor: idx % 2 === 0 ? colors.background : "rgba(27,77,62,0.04)" }}
          >
            <div className="font-['DM_Sans',sans-serif] text-[9px] font-bold text-[#aaa] uppercase tracking-[1px] mb-1">
              LINKED VENTURES
            </div>
            <div
              className="font-['DM_Sans',sans-serif] text-[11px] font-medium whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ color: colors.primary }}
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
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Header */}
        <div className="text-left" style={{ marginBottom: isMobile ? "24px" : "40px" }}>
          <div
            className="inline-flex items-center gap-2 px-5 py-[10px] rounded-full text-[11px] font-bold tracking-[2px] font-[Inter,sans-serif] uppercase mb-6"
            style={{ border: `1px solid ${colors.line}`, color: colors.primary, backgroundColor: colors.white }}
          >
            The Impact
          </div>
          <h2
            className="font-['DM_Sans',sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[820px]"
            style={{ fontSize: isMobile ? "28px" : "42px", color: colors.primary, margin: "0 0 12px" }}
          >
            What Changes When <span className="font-semibold">Transport</span>
            {isMobile ? " " : <br />}
            <span className="font-semibold">Networks</span>{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>Work</span>
          </h2>
          <p className="font-['DM_Sans',sans-serif] text-[16px] text-[#555] leading-[1.7] m-0 max-w-[680px]">
            When goods move efficiently, transit systems serve workers, and logistics costs fall — the ripple effects
            connect producers to markets, reduce consumer prices, and accelerate commerce across Ghana.
          </p>
        </div>

        {/* Controls Bar */}
        <div
          className="inline-flex items-center gap-1 mb-6 rounded-full bg-transparent p-1 overflow-x-auto"
          style={{ border: `1px solid ${colors.line}`, WebkitOverflowScrolling: "touch" }}
        >
          <div
            className="inline-flex rounded-full p-[3px] gap-[2px]"
            style={{ backgroundColor: colors.background }}
          >
            {["metrics", "stakeholder"].map((v) => (
              <button
                key={v}
                onClick={() => switchView(v)}
                className="rounded-full border-none cursor-pointer font-['DM_Sans',sans-serif] transition-all duration-200 ease-in-out whitespace-nowrap"
                style={{
                  padding: isMobile ? "5px 10px" : "6px 16px",
                  fontSize: isMobile ? "11px" : "12px",
                  fontWeight: view === v ? "700" : "500",
                  backgroundColor: view === v ? colors.white : "transparent",
                  color: view === v ? colors.primary : "#999",
                  boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {v === "metrics" ? (isMobile ? "Metric" : "By Metric") : isMobile ? "Stakeholder" : "By Stakeholder"}
              </button>
            ))}
          </div>
          <div className="w-px h-5 shrink-0" style={{ backgroundColor: colors.line }} />
          {view === "metrics"
            ? metrics.map((m, i) => (
                <button
                  key={m.category}
                  onClick={() => switchCategory(i)}
                  className="rounded-full cursor-pointer font-['DM_Sans',sans-serif] transition-all duration-200 ease-in-out whitespace-nowrap shrink-0"
                  style={{
                    padding: isMobile ? "5px 10px" : "6px 16px",
                    fontSize: isMobile ? "11px" : "12px",
                    fontWeight: activeCategory === i ? "700" : "500",
                    backgroundColor: activeCategory === i ? colors.accentLight : "transparent",
                    border: activeCategory === i ? `1.5px solid ${colors.accent}` : "none",
                    color: activeCategory === i ? colors.primary : "#999",
                  }}
                >
                  {m.category}
                </button>
              ))
            : stakeholders.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => setActiveStakeholder(i)}
                  className="rounded-full cursor-pointer font-['DM_Sans',sans-serif] transition-all duration-200 ease-in-out whitespace-nowrap shrink-0"
                  style={{
                    padding: isMobile ? "5px 10px" : "6px 16px",
                    fontSize: isMobile ? "11px" : "12px",
                    fontWeight: activeStakeholder === i ? "700" : "500",
                    backgroundColor: activeStakeholder === i ? colors.accentLight : "transparent",
                    border: activeStakeholder === i ? `1.5px solid ${colors.accent}` : "none",
                    color: activeStakeholder === i ? colors.primary : "#999",
                  }}
                >
                  {s.title.split(" ")[1]}
                </button>
              ))}
        </div>

        {/* Content */}
        {view === "metrics" ? (
          <div
            className="rounded-[20px] overflow-hidden"
            style={{ backgroundColor: colors.background, border: `2px solid ${colors.primary}` }}
          >
            {currentMetrics.items.map((item, idx) => (
              <MetricRow key={`${activeCategory}-${idx}`} item={item} idx={idx} animate={animate} isMobile={isMobile} />
            ))}
          </div>
        ) : (
          <div>
            <div
              className="flex justify-between items-start mb-6"
              style={{
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "12px" : "0",
              }}
            >
              <div>
                <div
                  className="font-['DM_Sans',sans-serif] font-bold"
                  style={{ fontSize: isMobile ? "24px" : "28px", color: colors.primary }}
                >
                  {currentStakeholder.title}
                </div>
                <div className="font-['DM_Sans',sans-serif] text-[14px] text-[#888]">
                  {currentStakeholder.subtitle}
                </div>
              </div>
              <div style={{ textAlign: isMobile ? "left" : "right" }}>
                <div
                  className="font-[Poppins,sans-serif] font-bold tracking-[-1.5px]"
                  style={{ fontSize: isMobile ? "32px" : "40px", color: colors.primary }}
                >
                  {currentStakeholder.stat}
                </div>
                <div className="font-['DM_Sans',sans-serif] text-[12px] text-[#888]">
                  {currentStakeholder.statLabel}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 mb-6">
              {currentStakeholder.outcomes.map((o, i) => (
                <div
                  key={i}
                  className="flex items-center gap-[14px] py-[14px] px-5 rounded-xl"
                  style={{ backgroundColor: i % 2 === 0 ? colors.background : "transparent" }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: i % 2 === 0 ? colors.white : colors.background }}
                  >
                    <span
                      className="font-['DM_Sans',sans-serif] text-[12px] font-bold"
                      style={{ color: colors.primary }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <span className="font-['DM_Sans',sans-serif] text-[15px] text-[#333] leading-[1.5]">
                    {o}
                  </span>
                </div>
              ))}
            </div>
            <div
              className="rounded-xl flex"
              style={{
                padding: isMobile ? "14px 18px" : "16px 24px",
                backgroundColor: colors.primary,
                alignItems: isMobile ? "flex-start" : "center",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "8px" : "0",
              }}
            >
              <span
                className="font-['DM_Sans',sans-serif] text-[10px] font-bold uppercase tracking-[1.5px]"
                style={{ color: colors.accent }}
              >
                KEY ADVANTAGE
              </span>
              <span
                className="font-['DM_Sans',sans-serif] text-[14px] font-medium text-white/[0.85]"
                style={{ marginLeft: isMobile ? "0" : "16px" }}
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

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function TransportationLogisticsSectorPage() {
  return (
    <Layout>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        .cta-btn-arrow { transition: none; }
        .cta-btn-arrow svg { transition: none; }
        .cta-primary { transition: none; }
        .cta-lime-swap { transition: none; }
        .cta-secondary { transition: none; }
      `}</style>
      <SectorHeroSection sector={sectorData} />
      <OpportunitySection />
      <ProcessSection />
      <SectorSolutionsSection sector={sectorData} />
      <LandscapeSection sector={sectorData} />
      <GovernanceSection />
      <RippleEffectSection />
      <InvestmentThesisSection />
      <ImpactSection />
      <SectorFinalCTA
          heading={<>Let's Build Ghana's <span className="font-semibold" style={{ color: colors.accent }}>Logistics Future</span></>}
          description="Whether you're an investor, operator, or government partner, there's a seat at the table in building Ghana's logistics future."
        />
    </Layout>
  );
}
