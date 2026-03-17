import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
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
import SectorPageTemplate from "@/components/sectors/SectorPageTemplate";
import { infrastructureSector } from "@/data/sectors/infrastructure";

const CONTENT_MAX_WIDTH = layout.maxWidth;


// ============================================================================
// SECTOR DATA — imported from src/data/sectors/infrastructure.ts
// ============================================================================

const sectorData = {
  ...infrastructureSector,
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
// PROBLEM CARD (Education-style pattern)
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
      {/* Title + Priority Row */}
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
          className="font-[Inter,sans-serif] text-[11px] font-bold rounded-[20px] py-1.5 px-3.5 whitespace-nowrap shrink-0 ml-3"
          style={{
            color: colors.primary,
            backgroundColor: colors.accentLight,
          }}
        >
          {problem.severity}
        </span>
      </div>

      {/* Impact Bar */}
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

      {/* EXPANDED CONTENT */}
      {isExpanded && (
        <div
          className="pt-4"
          style={{ borderTop: `1px solid ${colors.line}` }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Priority + Scale Row */}
          <div
            className="grid gap-3 mb-4"
            style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}
          >
            {/* Priority Card */}
            <div
              className="rounded-xl p-3.5"
              style={{ backgroundColor: colors.background }}
            >
              <div className="flex items-center justify-between mb-[10px]">
                <span className="font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888]">
                  Priority
                </span>
                <span
                  className="font-[Inter,sans-serif] text-[12px] font-bold rounded-[20px] py-1 px-[10px]"
                  style={{
                    color: colors.primary,
                    backgroundColor: colors.accentLight,
                  }}
                >
                  {problem.severity}
                </span>
              </div>
              <div
                className="h-2 rounded overflow-hidden"
                style={{ backgroundColor: colors.line }}
              >
                <div
                  className="h-full rounded transition-[width] duration-500 ease-in-out"
                  style={{
                    width: `${problem.severityScore}%`,
                    backgroundColor: colors.primary,
                  }}
                />
              </div>
            </div>

            {/* Scale Card */}
            <div
              className="rounded-xl p-3.5"
              style={{ backgroundColor: colors.background }}
            >
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

          {/* Opportunity Drivers */}
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

          {/* BRIDGE Solution Footer */}
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
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Header */}
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="inline-block py-[10px] px-5 rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
            }}
          >
            The Opportunity
          </span>

          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] m-0 mb-5 max-w-[820px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
            }}
          >
            <span className="font-semibold">4 critical gaps</span> across water, sanitation, markets &amp; skills —
            each a <span style={{ color: colors.accent }} className="font-semibold">proven pathway</span> to impact
          </h2>

          <p
            className="font-[Inter,sans-serif] leading-[1.65] text-[#666] max-w-[680px] m-0"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
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
          <div className="flex justify-center gap-2 mt-4 items-center">
            {enhancedPainPoints.map((_, i) => (
              <div
                key={i}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: i === 0 ? "24px" : "8px",
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
      className="relative overflow-hidden"
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          top: "-200px",
          right: "-200px",
          width: "600px",
          height: "600px",
          background: `radial-gradient(circle, ${colors.accent}10 0%, transparent 70%)`,
        }}
      />

      <div className="relative z-[1] mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div className="mb-[60px] text-center">
          <span
            className="inline-block py-[10px] px-5 rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
            style={{
              backgroundColor: colors.white,
              color: colors.primary,
              border: `1px solid ${colors.line}`,
            }}
          >
            The Process
          </span>

          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] mx-auto mb-5 max-w-[600px] mt-0"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
            }}
          >
            Mapping the <span style={{ color: colors.accent }} className="font-semibold">Opportunity</span> at{" "}
            <span className="font-semibold">Every Stage</span>
          </h2>

          <p className="font-[Inter,sans-serif] text-[16px] leading-[1.65] text-[#666] max-w-[750px] mx-auto my-0">
            From initial planning through community delivery — five stages where strategic resources and innovation
            create compounding value across Ghana's infrastructure systems.
          </p>
        </div>

        {/* Stage Navigation */}
        <div
          className="flex relative"
          style={{
            justifyContent: isMobile ? "center" : "space-between",
            marginBottom: isMobile ? "24px" : "48px",
            padding: isMobile ? "0" : "0 80px",
            gap: isMobile ? "12px" : "0",
            overflowX: isMobile ? "auto" : "visible",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Progress Line */}
          {!isMobile && activeStage > 0 && (
            <div className="absolute h-0.5 z-0" style={{ top: "26px", left: "106px", right: "106px" }}>
              <div
                className="h-full rounded-sm transition-[width] duration-500 ease-in-out"
                style={{
                  backgroundColor: colors.accent,
                  width: `${(activeStage / (valueChainStages.length - 1)) * 100}%`,
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
              className="flex flex-col items-center cursor-pointer z-[1] transition-transform duration-200"
            >
              <div
                className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center transition-all duration-300"
                style={{
                  backgroundColor: index <= activeStage ? colors.primary : "transparent",
                  border: `2px solid ${colors.primary}`,
                  color: index <= activeStage ? colors.white : "#bbb",
                  boxShadow: index === activeStage ? "0 4px 12px rgba(27,77,62,0.25)" : "none",
                }}
              >
                {valueChainIcons[stage.icon]}
              </div>
              <span
                className="mt-3 text-[12px] font-[Inter,sans-serif] text-center max-w-[100px] leading-[1.3] transition-all duration-300"
                style={{
                  fontWeight: index === activeStage ? "700" : index < activeStage ? "500" : "400",
                  color: index === activeStage ? colors.primary : index < activeStage ? colors.primary : "#999",
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
            className="grid items-stretch"
            style={{
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
              gap: isMobile ? "24px" : "48px",
              minHeight: isMobile ? "auto" : "320px",
            }}
          >
            {/* Left: Actor Info */}
            <div className="flex flex-col overflow-hidden">
              <div className="min-h-[120px]">
                <div
                  className="inline-block rounded-full text-[12px] font-semibold font-[Inter,sans-serif] mb-4 w-fit py-1.5 px-3.5"
                  style={{
                    backgroundColor: colors.accent,
                    color: colors.primary,
                  }}
                >
                  Stage {activeStage + 1} of 5
                </div>
                <h3
                  className="font-[Inter,sans-serif] text-[32px] font-medium leading-[1.2] m-0 mb-2"
                  style={{ color: colors.primary }}
                >
                  {activeData.actor}
                </h3>
                <p className="font-[Inter,sans-serif] text-[15px] font-semibold text-[#666] m-0">
                  {activeData.population}
                </p>
              </div>
              <div
                className="rounded-2xl p-6 mt-auto"
                style={{
                  backgroundColor: colors.white,
                  border: `1px solid ${colors.line}`,
                }}
              >
                <div
                  className="text-[26px] font-bold font-[Poppins,sans-serif] leading-[1.2]"
                  style={{ color: colors.accent }}
                >
                  {activeData.stat}
                </div>
                <div className="text-[11px] text-[#999] font-[Inter,sans-serif] mt-2 uppercase tracking-[1px] font-semibold">
                  Key Metric
                </div>
              </div>
            </div>

            {/* Middle: Pain Points — collapsible on mobile */}
            {(!isMobile || showMoreDetail) && (
              <div className="flex flex-col overflow-hidden">
                <h4
                  className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1.5px] m-0 mb-5"
                  style={{ color: colors.primary }}
                >
                  Opportunity Signals
                </h4>
                <div className="flex flex-col gap-[10px] flex-1">
                  {activeData.painPoints.map((point, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-xl py-3.5 px-4 flex-1 transition-all duration-200"
                      style={{
                        backgroundColor: colors.white,
                        border: `1px solid ${colors.line}`,
                      }}
                    >
                      <span className="flex shrink-0" style={{ color: colors.warning }}>
                        <IconWarning />
                      </span>
                      <span
                        className="font-[Inter,sans-serif] text-[14px] font-normal"
                        style={{ color: colors.dark }}
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
              <div className="flex flex-col overflow-hidden">
                <h4
                  className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1.5px] m-0 mb-5"
                  style={{ color: colors.primary }}
                >
                  System Efficiency
                </h4>
                <div
                  className="rounded-2xl p-6 flex-1 flex flex-col"
                  style={{
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.line}`,
                  }}
                >
                  <div className="mb-6">
                    <div className="flex justify-between mb-[10px]">
                      <span className="font-[Inter,sans-serif] text-[13px] text-[#666]">
                        Value Retained
                      </span>
                      <span
                        className="font-[Poppins,sans-serif] text-[15px] font-bold"
                        style={{ color: colors.accent }}
                      >
                        {activeData.valueRetained}%
                      </span>
                    </div>
                    <div
                      className="h-[10px] rounded-[5px] overflow-hidden"
                      style={{ backgroundColor: colors.line }}
                    >
                      <div
                        className="h-full rounded-[5px] transition-[width] duration-500 ease-in-out"
                        style={{
                          width: `${activeData.valueRetained}%`,
                          backgroundColor: colors.accent,
                        }}
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex justify-between mb-[10px]">
                      <span className="font-[Inter,sans-serif] text-[13px] text-[#666]">
                        Recapture Opportunity
                      </span>
                      <span
                        className="font-[Poppins,sans-serif] text-[15px] font-bold"
                        style={{ color: colors.warning }}
                      >
                        {activeData.valueLost}%
                      </span>
                    </div>
                    <div
                      className="h-[10px] rounded-[5px] overflow-hidden"
                      style={{ backgroundColor: colors.line }}
                    >
                      <div
                        className="h-full rounded-[5px] transition-[width] duration-500 ease-in-out"
                        style={{
                          width: `${activeData.valueLost}%`,
                          backgroundColor: colors.warning,
                        }}
                      />
                    </div>
                  </div>
                  <p className="font-[Inter,sans-serif] text-[13px] text-[#999] mt-auto leading-[1.5] m-0">
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
              className="flex items-center justify-center gap-2 w-full p-3.5 mt-4 bg-transparent rounded-xl font-[Inter,sans-serif] text-[14px] font-semibold cursor-pointer"
              style={{
                border: `1px solid ${colors.line}`,
                color: colors.primary,
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
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="inline-block py-[10px] px-5 rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
            style={{
              backgroundColor: colors.white,
              color: colors.primary,
              border: `1px solid ${colors.line}`,
            }}
          >
            The Landscape
          </span>

          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] m-0 mb-5 max-w-[900px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
            }}
          >
            <span className="font-semibold">Building</span> With Ghana's{" "}
            <span style={{ color: colors.accent }} className="font-semibold">Strongest Institutions</span>
          </h2>

          <p
            className="font-[Inter,sans-serif] leading-[1.65] text-[#666] max-w-[680px] m-0"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
          >
            BRIDGE works alongside Ghana's strongest institutions — combining strengths, aligning resources, and
            creating shared value across the infrastructure landscape.
          </p>
        </div>

        {/* Mobile: Pill bar selector */}
        {isMobile && (
          <div className="flex justify-start mb-4">
            <div
              className="inline-flex items-center gap-1.5 rounded-full p-1 max-w-full"
              style={{
                border: `1px solid ${colors.line}`,
                backgroundColor: colors.white,
                overflowX: "auto",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {sector.competitors.map((comp, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActivePartner(index);
                    setShowMoreLandscape(false);
                  }}
                  className="font-[Inter,sans-serif] text-[10px] rounded-full py-[5px] px-2 cursor-pointer whitespace-nowrap shrink-0 transition-all duration-200"
                  style={{
                    fontWeight: activePartner === index ? "700" : "500",
                    color: activePartner === index ? colors.primary : "#999",
                    backgroundColor: activePartner === index ? colors.accentLight : "transparent",
                    border: activePartner === index ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
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
          {/* Partner List -- desktop only */}
          {!isMobile && (
            <div className="flex flex-col gap-2">
              {sector.competitors.map((comp, index) => (
                <div
                  key={index}
                  onClick={() => setActivePartner(index)}
                  className="rounded-2xl p-5 cursor-pointer transition-all duration-200"
                  style={{
                    backgroundColor: activePartner === index ? colors.white : "transparent",
                    border: activePartner === index ? `2px solid ${colors.primary}` : "2px solid transparent",
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4
                        className="font-[Inter,sans-serif] text-[16px] font-semibold m-0 mb-1"
                        style={{ color: colors.dark }}
                      >
                        {comp.name}
                      </h4>
                      <p className="font-[Inter,sans-serif] text-[13px] text-[#666] m-0">
                        {comp.focus}
                      </p>
                    </div>
                    <span
                      className="py-1 px-[10px] rounded-full text-[11px] font-semibold font-[Inter,sans-serif]"
                      style={{
                        backgroundColor: comp.priority === "High" ? colors.accent : colors.lightGreen,
                        color: colors.primary,
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
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3
                  className="font-[Inter,sans-serif] font-medium m-0 mb-2"
                  style={{
                    fontSize: isMobile ? "22px" : "28px",
                    color: colors.dark,
                  }}
                >
                  {partner.name}
                </h3>
                <p
                  className="font-[Inter,sans-serif] text-[#666] m-0"
                  style={{ fontSize: isMobile ? "13px" : "15px" }}
                >
                  Est. {partner.year} • Funding: {partner.funding}
                </p>
              </div>
              <span
                className="py-1.5 px-3.5 rounded-full text-[12px] font-semibold font-[Inter,sans-serif]"
                style={{
                  backgroundColor:
                    partner.partnershipType === "Essential"
                      ? colors.accent
                      : partner.partnershipType === "Bypass"
                        ? colors.warningBg
                        : colors.lightGreen,
                  color: partner.partnershipType === "Bypass" ? colors.warningText : colors.primary,
                }}
              >
                {partner.partnershipType}
              </span>
            </div>

            {/* Key Metrics Row */}
            <div
              className="grid grid-cols-3"
              style={{
                gap: isMobile ? "8px" : "16px",
                marginBottom: isMobile ? "20px" : "28px",
              }}
            >
              {[
                { value: partner.marketShare, label: "Market Share" },
                { value: partner.coverage, label: "Coverage" },
                { value: partner.employees, label: "Employees" },
              ].map((metric, idx) => (
                <div
                  key={idx}
                  className="rounded-xl p-4 text-center"
                  style={{ backgroundColor: colors.background }}
                >
                  <div
                    className="font-[Poppins,sans-serif] text-[22px] font-bold"
                    style={{ color: colors.primary }}
                  >
                    {metric.value}
                  </div>
                  <div className="font-[Inter,sans-serif] text-[11px] text-[#888] uppercase tracking-[0.5px] mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Strengths & Gaps Row -- collapsible on mobile */}
            {(!isMobile || showMoreLandscape) && (
              <>
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: isMobile ? "20px" : "24px",
                    marginBottom: isMobile ? "20px" : "24px",
                  }}
                >
                  <div>
                    <h4
                      className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1px] m-0 mb-3.5"
                      style={{ color: colors.primary }}
                    >
                      Their Strengths
                    </h4>
                    <div className="flex flex-col gap-[10px]">
                      {partner.strengths.map((strength, index) => (
                        <div key={index}>
                          <div className="flex justify-between mb-[5px]">
                            <span className="font-[Inter,sans-serif] text-[13px]" style={{ color: colors.dark }}>
                              {strength.name}
                            </span>
                            <span className="font-[Inter,sans-serif] text-[12px] text-[#999]">
                              {strength.rating}/5
                            </span>
                          </div>
                          <div
                            className="h-[5px] rounded-[3px] overflow-hidden"
                            style={{ backgroundColor: colors.line }}
                          >
                            <div
                              className="h-full rounded-[3px]"
                              style={{
                                width: `${(strength.rating / 5) * 100}%`,
                                backgroundColor: colors.accent,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4
                      className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1px] m-0 mb-3.5"
                      style={{ color: colors.primary }}
                    >
                      Where BRIDGE Helps
                    </h4>
                    <div className="flex flex-col gap-2">
                      {partner.gaps.map((gap, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-[10px] py-[10px] px-3 rounded-lg"
                          style={{ backgroundColor: colors.accentLight }}
                        >
                          <span className="text-[10px]" style={{ color: colors.primary }}>●</span>
                          <span
                            className="font-[Inter,sans-serif] text-[13px]"
                            style={{ color: colors.primary }}
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
                  className="rounded-2xl p-6"
                  style={{ backgroundColor: colors.primary }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4
                      className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1px] m-0"
                      style={{ color: colors.accent }}
                    >
                      Collaboration Opportunity
                    </h4>
                  </div>

                  <p className="font-[Inter,sans-serif] text-[16px] text-white m-0 mb-5 leading-[1.5]">
                    {partner.bridgeOpportunity}
                  </p>

                  {/* Synergy Areas */}
                  <div className="flex gap-[10px] flex-wrap">
                    {partner.synergyAreas.map((area, index) => (
                      <span
                        key={index}
                        className="py-1.5 px-3 rounded-full text-[12px] font-medium font-[Inter,sans-serif] flex items-center gap-1.5"
                        style={{
                          backgroundColor: "rgba(184, 217, 53, 0.15)",
                          color: colors.accent,
                        }}
                      >
                        <span className="text-[10px]">✓</span>
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
                className="flex items-center justify-center gap-2 w-full p-3.5 mt-4 bg-transparent rounded-xl font-[Inter,sans-serif] text-[14px] font-semibold cursor-pointer"
                style={{
                  border: `1px solid ${colors.line}`,
                  color: colors.primary,
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
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div className="text-center" style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="inline-block py-[10px] px-5 rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
            style={{
              backgroundColor: "rgba(184, 217, 53, 0.15)",
              color: colors.accent,
            }}
          >
            The Ripple Effect
          </span>

          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] text-white mx-auto mb-5 max-w-[820px] mt-0"
            style={{ fontSize: isMobile ? "28px" : "42px" }}
          >
            How <span className="font-semibold">Infrastructure</span>{" "}
            <span style={{ color: colors.accent }} className="font-semibold">Amplifies Impact</span>
          </h2>

          <p className="font-[Inter,sans-serif] text-[16px] leading-[1.65] text-white/60 max-w-[680px] mx-auto my-0">
            BRIDGE sectors don't operate in isolation. Infrastructure investment creates compounding value across every
            sector we touch.
          </p>
        </div>

        {/* PATHWAY VISUAL */}
        {isMobile ? (
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <div className="flex flex-col items-center">
                <div
                  className="w-14 h-14 rounded-[14px] flex items-center justify-center"
                  style={{
                    backgroundColor: colors.accent,
                    color: colors.primary,
                    boxShadow: "0 0 24px rgba(184, 217, 53, 0.3)",
                  }}
                >
                  <IconBlocks />
                </div>
                <span
                  className="font-[Inter,sans-serif] text-[10px] font-bold mt-1.5 uppercase tracking-[0.5px]"
                  style={{ color: colors.accent }}
                >
                  Infrastructure
                </span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              {pathways.map((sector, index) => {
                const isActive = activeNode === index;
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setActiveNode(isActive ? null : index);
                      setShowMoreRipple(false);
                    }}
                    className="flex flex-col items-center cursor-pointer transition-all duration-300"
                    style={{ opacity: activeNode !== null && !isActive ? 0.4 : 1 }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: isActive ? colors.accent : "rgba(255,255,255,0.08)",
                        border: isActive ? "none" : "1px solid rgba(255,255,255,0.1)",
                        color: isActive ? colors.primary : "rgba(255,255,255,0.6)",
                      }}
                    >
                      {sector.icon}
                    </div>
                    <span
                      className="font-[Inter,sans-serif] text-[10px] font-semibold text-center mt-[5px] max-w-[58px] leading-[1.2] transition-all duration-300"
                      style={{ color: isActive ? colors.white : "rgba(255,255,255,0.5)" }}
                    >
                      {crossSectorShortNames[index]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex items-start justify-center gap-8 mb-12">
            <div className="flex flex-col items-center shrink-0 w-[120px]">
              <div
                className="w-20 h-20 rounded-[20px] flex items-center justify-center"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.primary,
                  boxShadow: "0 0 30px rgba(184, 217, 53, 0.3)",
                }}
              >
                <IconBlocks />
              </div>
            </div>

            {pathways.map((sector, index) => {
              const isActive = activeNode === index;
              return (
                <div
                  key={index}
                  onClick={() => setActiveNode(isActive ? null : index)}
                  className="flex flex-col items-center cursor-pointer transition-all duration-300 w-[120px]"
                  style={{ opacity: activeNode !== null && !isActive ? 0.4 : 1 }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 mb-[10px]"
                    style={{
                      backgroundColor: isActive ? colors.accent : "rgba(255,255,255,0.08)",
                      border: isActive ? "none" : "1px solid rgba(255,255,255,0.1)",
                      color: isActive ? colors.primary : "rgba(255,255,255,0.6)",
                    }}
                  >
                    {sector.icon}
                  </div>
                  <span
                    className="font-[Inter,sans-serif] text-[13px] font-semibold text-center transition-all duration-300"
                    style={{ color: isActive ? colors.white : "rgba(255,255,255,0.5)" }}
                  >
                    {sector.name}
                  </span>
                  <span
                    className="font-[Poppins,sans-serif] text-[20px] font-bold mt-1 transition-all duration-300"
                    style={{ color: isActive ? colors.accent : "rgba(255,255,255,0.3)" }}
                  >
                    {sector.multiplier}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* INTEGRATION DETAIL PANEL */}
        <div
          className="transition-all duration-300"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: isMobile ? "16px" : "24px",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: isMobile ? "24px" : "40px",
            minHeight: isMobile ? "auto" : "280px",
          }}
        >
          {activeNode === null ? (
            isMobile ? (
              <div className="text-center py-5">
                <p className="font-[Inter,sans-serif] text-[15px] text-white/50 m-0">
                  Tap a sector above to explore how infrastructure amplifies its impact
                </p>
              </div>
            ) : (
              <div>
                <div
                  className="flex mb-7"
                  style={{
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "flex-start" : "center",
                    justifyContent: "space-between",
                    gap: isMobile ? "8px" : "0",
                  }}
                >
                  <h3
                    className="font-[Inter,sans-serif] font-semibold text-white m-0"
                    style={{ fontSize: isMobile ? "16px" : "18px" }}
                  >
                    Cross-Sector Integration Opportunities
                  </h3>
                  <span className="font-[Inter,sans-serif] text-[13px] text-white/40">
                    {isMobile ? "Tap a sector above" : "Click a sector above to explore"}
                  </span>
                </div>
                <div
                  className="grid"
                  style={{
                    gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)",
                    gap: isMobile ? "12px" : "16px",
                  }}
                >
                  {pathways.map((sector, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveNode(i)}
                      className="rounded-2xl cursor-pointer transition-all duration-200"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.05)",
                        padding: "24px 20px",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div className="font-[Inter,sans-serif] text-[14px] font-semibold text-white mb-2">
                        {sector.name}
                      </div>
                      <div className="font-[Inter,sans-serif] text-[13px] text-white/45 leading-[1.5] mb-4 h-10 overflow-hidden">
                        {sector.connection}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="font-[Poppins,sans-serif] text-[18px] font-bold"
                          style={{ color: colors.accent }}
                        >
                          {sector.multiplier}
                        </span>
                        <span className="font-[Inter,sans-serif] text-[11px] text-white/35 uppercase tracking-[0.5px]">
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
              {/* Pathway breadcrumb */}
              <div className="flex items-center gap-2 mb-7 flex-wrap">
                {pathways[activeNode].pathLabel.split(" → ").map((step, i, arr) => (
                  <React.Fragment key={i}>
                    <span
                      className="font-[Inter,sans-serif] text-[13px] py-1.5 px-3.5 rounded-full"
                      style={{
                        fontWeight: i === 0 ? "700" : "500",
                        color: i === 0 ? colors.accent : "rgba(255,255,255,0.7)",
                        backgroundColor: i === 0 ? "rgba(184, 217, 53, 0.15)" : "rgba(255,255,255,0.05)",
                      }}
                    >
                      {step}
                    </span>
                    {i < arr.length - 1 && <span className="text-[14px]" style={{ color: colors.accent }}>→</span>}
                  </React.Fragment>
                ))}
              </div>

              <div
                className="grid"
                style={{
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                  gap: isMobile ? "24px" : "32px",
                }}
              >
                <div>
                  <h4
                    className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1px] m-0 mb-4"
                    style={{ color: colors.accent }}
                  >
                    Why It Matters
                  </h4>
                  <p className="font-[Inter,sans-serif] text-[15px] text-white/70 leading-[1.6] m-0 mb-5">
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

                {(!isMobile || showMoreRipple) && (
                  <div>
                    <h4
                      className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1px] m-0 mb-4"
                      style={{ color: colors.accent }}
                    >
                      Synergy Pathways
                    </h4>
                    <div className="flex flex-col gap-[10px]">
                      {pathways[activeNode].synergies.map((synergy, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 py-3 px-4 rounded-[10px]"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <span className="text-[8px]" style={{ color: colors.accent }}>●</span>
                          <span className="font-[Inter,sans-serif] text-[14px] text-white/75">
                            {synergy}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(!isMobile || showMoreRipple) && (
                  <div>
                    <h4
                      className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1px] m-0 mb-4"
                      style={{ color: colors.accent }}
                    >
                      Linked Ventures
                    </h4>
                    <div className="flex flex-col gap-[10px]">
                      {pathways[activeNode].bridgeVentures.map((venture, i) => (
                        <div
                          key={i}
                          className="py-3.5 px-[18px] rounded-xl flex items-center justify-between"
                          style={{
                            backgroundColor: "rgba(184, 217, 53, 0.1)",
                            border: "1px solid rgba(184, 217, 53, 0.15)",
                          }}
                        >
                          <span className="font-[Inter,sans-serif] text-[14px] font-semibold text-white">
                            {venture}
                          </span>
                          <span className="text-[16px]" style={{ color: colors.accent }}>→</span>
                        </div>
                      ))}
                    </div>

                    <a
                      href={SECTOR_ROUTES[pathways[activeNode].name] || "/sectors"}
                      onClick={(e) => { e.preventDefault(); navigate(SECTOR_ROUTES[pathways[activeNode].name] || "/sectors"); }}
                      className="inline-flex items-center gap-2 mt-5 font-[Inter,sans-serif] text-[14px] font-semibold no-underline"
                      style={{ color: colors.accent }}
                    >
                      Explore {pathways[activeNode].name} Sector
                      <span>→</span>
                    </a>
                  </div>
                )}
              </div>

              {isMobile && (
                <button
                  onClick={() => setShowMoreRipple(!showMoreRipple)}
                  className="flex items-center justify-center gap-2 w-full p-3.5 mt-4 bg-transparent rounded-xl font-[Inter,sans-serif] text-[14px] font-semibold text-white cursor-pointer"
                  style={{ border: "1px solid rgba(255,255,255,0.15)" }}
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
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Section Header */}
        <div
          style={{
            textAlign: isMobile ? "center" : "left",
            marginBottom: isMobile ? "32px" : "48px",
            padding: isMobile ? "0 20px" : 0,
          }}
        >
          <span
            className="inline-block py-[10px] px-5 rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
            }}
          >
            The Investment Thesis
          </span>

          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[820px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
              margin: isMobile ? "0 auto 16px" : "0 0 16px 0",
            }}
          >
            Every <span className="font-semibold">Stakeholder</span> Has a{" "}
            <span className="font-semibold">Role</span> in{" "}
            <span style={{ color: colors.accent }} className="font-semibold">Infrastructure Growth</span>
          </h2>

          <p
            className="font-[Inter,sans-serif] text-[16px] text-[#666] leading-[1.65] max-w-[700px]"
            style={{ margin: isMobile ? "0 auto" : "0" }}
          >
            Investment isn't only capital — it's expertise, partnerships, policy, and vision. See how your role
            contributes to {sector.ventures} ventures across {sector.capitalRange} in opportunity.
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
                  className="flex flex-col items-center gap-1.5 bg-none border-none p-2 cursor-pointer transition-all duration-200"
                  style={{ opacity: isActive ? 1 : 0.4 }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{
                      backgroundColor: isActive ? colors.primary : colors.background,
                      border: isActive ? "none" : `1px solid ${colors.line}`,
                      color: isActive ? colors.accent : colors.primary,
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
                  className="flex items-center gap-2 py-2 px-[18px] rounded-full font-[Inter,sans-serif] text-[12px] cursor-pointer transition-all duration-[250ms] shrink-0"
                  style={{
                    border: isActive ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                    backgroundColor: isActive ? colors.accentLight : "transparent",
                    color: isActive ? colors.primary : "#999",
                    fontWeight: isActive ? "700" : "500",
                  }}
                >
                  <span
                    className="flex transition-all duration-[250ms]"
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

        {/* Main Content Grid */}
        <div
          className="grid items-stretch"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "24px" : "48px",
            padding: isMobile ? "0 20px" : 0,
          }}
        >
          {/* LEFT COLUMN */}
          <div className="flex flex-col">
            {!isMobile && (
              <h3
                className="font-[Inter,sans-serif] text-[32px] font-light leading-[1.25] tracking-[-0.3px] m-0 mb-4 min-h-[80px] flex items-end"
                style={{ color: colors.primary }}
              >
                {activeAudienceData.headline}
              </h3>
            )}

            {!isMobile && (
              <p className="font-[Inter,sans-serif] text-[15px] text-[#555] leading-[1.7] m-0 mb-6 min-h-[100px]">
                {activeAudienceData.pitch}
              </p>
            )}

            {/* Stat cards */}
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
                  <div className="font-[Inter,sans-serif] text-[10px] text-[#888]">
                    {stat.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* Engagement Pathways */}
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
                  className="flex items-start gap-3 py-3 px-4 rounded-[10px]"
                  style={{
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.line}`,
                  }}
                >
                  <div className="flex flex-col gap-1 flex-1">
                    <div
                      className="font-[Inter,sans-serif] text-[12px] font-semibold"
                      style={{ color: colors.primary }}
                    >
                      {path.bring}
                    </div>
                    <div className="font-[Inter,sans-serif] text-[12px] text-[#777] leading-[1.5]">
                      {path.get}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Validation Bar */}
            <div className="py-3.5 px-[18px] bg-[rgba(27,77,62,0.06)] rounded-xl flex items-center gap-3">
              <div className="shrink-0 flex" style={{ color: colors.primary }}>
                <IconCheck />
              </div>
              <div className="font-[Inter,sans-serif] text-[13px] text-[#444] leading-[1.5]">
                <strong style={{ color: colors.primary }}>Ghana Highway Authority</strong> partnership framework for
                infrastructure
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          {(!isMobile || showInvestmentDetails) && (
            <div
              className="flex flex-col"
              style={{
                backgroundColor: colors.primary,
                borderRadius: isMobile ? "16px" : "20px",
                padding: isMobile ? "20px" : "28px",
              }}
            >
              {/* Tab Selector */}
              <div className="flex bg-white/[0.08] rounded-xl p-1 mb-5 shrink-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className="flex-1 border-none py-3 px-5 rounded-[10px] text-[14px] font-[Inter,sans-serif] cursor-pointer transition-all duration-200"
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

              {/* Tab Content Cards */}
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
                    <div className="shrink-0" style={{ minWidth: isMobile ? "80px" : "120px" }}>
                      <div
                        className="font-[Poppins,sans-serif] font-bold leading-[1.1] whitespace-nowrap"
                        style={{
                          fontSize: isMobile ? "20px" : "22px",
                          color: colors.accent,
                        }}
                      >
                        {item.value}
                      </div>
                      <div className="font-[Inter,sans-serif] text-[9px] text-white/35 uppercase tracking-[0.5px] mt-1 leading-[1.3] whitespace-nowrap">
                        {item.label}
                      </div>
                    </div>
                    <div className="font-[Inter,sans-serif] text-[13px] text-white/70 leading-[1.55] border-l border-white/10 pl-4 flex-1 min-w-0">
                      {item.detail}
                    </div>
                  </div>
                ))}
              </div>

              {/* Prospectus Bar */}
              <div className="mt-4 py-3.5 px-5 bg-white/5 rounded-xl flex justify-between items-center shrink-0">
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

          {/* Mobile Toggle Button */}
          {isMobile && !showInvestmentDetails && (
            <button
              onClick={() => setShowInvestmentDetails(true)}
              className="flex items-center justify-center gap-2 w-full p-3.5 bg-transparent rounded-xl font-[Inter,sans-serif] text-[14px] font-semibold cursor-pointer"
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
        className="font-[Poppins,sans-serif] font-bold tracking-[-1px] leading-none"
        style={{
          fontSize: isMobile ? "28px" : "36px",
          color: colors.primary,
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
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <span
            className="inline-block py-[10px] px-5 rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
            style={{
              backgroundColor: colors.white,
              color: colors.primary,
              border: `1px solid ${colors.line}`,
            }}
          >
            The Impact
          </span>

          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] m-0 mb-3 max-w-[900px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
            }}
          >
            What Changes When <span className="font-semibold">Infrastructure</span>
            {"\n"}
            <span style={{ color: colors.accent }} className="font-semibold">Investment</span>{" "}
            <span style={{ color: colors.accent }} className="font-semibold">Works</span>
          </h2>

          <p
            className="font-[Inter,sans-serif] leading-[1.7] text-[#555] max-w-[750px] m-0 mb-10"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
          >
            When roads connect markets, water flows reliably, and digital networks reach every district — the ripple
            effects unlock economic potential, reduce inequality, and lay the foundation for lasting prosperity across
            Ghana.
          </p>
        </div>

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
                  onClick={() => switchView(v)}
                  className="font-[Inter,sans-serif] border-none rounded-full cursor-pointer transition-all duration-200"
                  style={{
                    fontSize: isMobile ? "11px" : "12px",
                    fontWeight: view === v ? "700" : "500",
                    color: view === v ? colors.primary : "#999",
                    backgroundColor: view === v ? colors.white : "transparent",
                    padding: isMobile ? "5px 10px" : "6px 14px",
                    boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  }}
                >
                  {v === "metrics" ? (isMobile ? "Metric" : "By Metric") : isMobile ? "Stakeholder" : "By Stakeholder"}
                </button>
              ))}
            </div>

            {/* Vertical Divider */}
            <div className="w-px h-5 shrink-0" style={{ backgroundColor: colors.line }} />

            {/* Sub-Filters */}
            {view === "metrics"
              ? metrics.map((cat, i) => (
                  <button
                    key={cat.category}
                    onClick={() => switchCategory(i)}
                    className="font-[Inter,sans-serif] rounded-full cursor-pointer transition-all duration-200 whitespace-nowrap shrink-0"
                    style={{
                      fontSize: isMobile ? "10px" : "12px",
                      fontWeight: activeCategory === i ? "700" : "500",
                      color: activeCategory === i ? colors.primary : "#999",
                      backgroundColor: activeCategory === i ? colors.accentLight : "transparent",
                      border: activeCategory === i ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                      padding: isMobile ? "5px 8px" : "6px 14px",
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
                      className="font-[Inter,sans-serif] rounded-full cursor-pointer transition-all duration-200 whitespace-nowrap shrink-0"
                      style={{
                        fontSize: isMobile ? "10px" : "12px",
                        fontWeight: activeStakeholder === i ? "700" : "500",
                        color: activeStakeholder === i ? colors.primary : "#999",
                        backgroundColor: activeStakeholder === i ? colors.accentLight : "transparent",
                        border: activeStakeholder === i ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                        padding: isMobile ? "5px 8px" : "6px 14px",
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
            className="rounded-2xl overflow-hidden transition-opacity duration-300"
            style={{
              border: `2px solid ${colors.primary}`,
              opacity: animate ? 1 : 0,
            }}
          >
            {activeMetrics.items.map((item, i) => (
              <div
                key={i}
                className="relative"
                style={{
                  padding: isMobile ? "16px 20px" : "20px 28px",
                  backgroundColor: i % 2 === 0 ? colors.white : colors.background,
                  borderBottom: i < activeMetrics.items.length - 1 ? `1px solid ${colors.line}` : "none",
                }}
              >
                {isMobile ? (
                  /* ── Mobile Layout ── */
                  <>
                    {/* Top row: Number + Trend/Ventures */}
                    <div className="flex justify-between items-start mb-2">

                      <CounterCell item={item} />
                      <div className="flex flex-col items-end gap-1 shrink-0">

                        <span
                          className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[0.5px] py-[3px] px-2 rounded-full border border-[rgba(27,77,62,0.15)] bg-[rgba(27,77,62,0.08)]"
                          style={{ color: colors.primary }}
                        >
                          {item.trend}
                        </span>
                        <span className="font-[Inter,sans-serif] text-[10px] text-[#999]">
                          {item.ventures}
                        </span>
                      </div>
                    </div>
                    {/* Bottom: Label + Description */}
                    <div
                      className="font-[Inter,sans-serif] text-[14px] font-semibold mb-[2px]"
                      style={{ color: colors.dark }}
                    >
                      {item.label}
                    </div>
                    <div className="font-[Inter,sans-serif] text-[12px] text-[#666] leading-[1.5]">
                      {item.description}
                    </div>
                  </>
                ) : (
                  /* ── Desktop Layout ── */
                  <div className="flex items-center">
                    {/* Metric Number */}
                    <div className="min-w-[200px]">
                      <CounterCell item={item} />
                    </div>

                    {/* Label + Description */}
                    <div className="flex-1 min-w-0">
                      <div
                        className="font-[Inter,sans-serif] text-[15px] font-semibold mb-[2px]"
                        style={{ color: colors.dark }}
                      >
                        {item.label}
                      </div>
                      <div className="font-[Inter,sans-serif] text-[13px] text-[#666] leading-[1.5]">
                        {item.description}
                      </div>
                    </div>

                    {/* Trend + Ventures */}
                    <div className="flex flex-col items-end gap-1.5 min-w-[180px] shrink-0">
                      <span
                        className="font-[Inter,sans-serif] text-[11px] font-bold uppercase tracking-[0.5px] py-1 px-2.5 rounded-full border border-[rgba(27,77,62,0.15)] bg-[rgba(27,77,62,0.08)]"
                        style={{ color: colors.primary }}
                      >
                        {item.trend}
                      </span>
                      <span className="font-[Inter,sans-serif] text-[11px] text-[#999]">
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
              className="flex gap-4 mb-0 rounded-t-2xl"
              style={{
                alignItems: isMobile ? "flex-start" : "center",
                justifyContent: "space-between",
                flexDirection: isMobile ? "column" : "row",
                padding: "20px 28px",
                backgroundColor: colors.background,
                border: `2px solid ${colors.primary}`,
                borderBottom: `1px solid ${colors.line}`,
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: colors.accent,
                    color: colors.primary,
                  }}
                >
                  {activeStakeholderData.icon}
                </div>
                <div>
                  <h3
                    className="font-[Inter,sans-serif] text-[22px] font-semibold m-0"
                    style={{ color: colors.primary }}
                  >
                    {activeStakeholderData.title}
                  </h3>
                  <p className="font-[Inter,sans-serif] text-[14px] text-[#888] mt-0.5 mb-0">
                    {activeStakeholderData.subtitle}
                  </p>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span
                  className="font-[Poppins,sans-serif] font-bold tracking-[-1.5px]"
                  style={{
                    fontSize: isMobile ? "32px" : "40px",
                    color: colors.primary,
                  }}
                >
                  {activeStakeholderData.stat}
                </span>
                <span className="font-[Inter,sans-serif] text-[14px] text-[#888]">
                  {activeStakeholderData.statLabel}
                </span>
              </div>
            </div>

            {/* Outcome Rows */}
            <div
              className="rounded-b-2xl overflow-hidden"
              style={{
                border: `2px solid ${colors.primary}`,
                borderTop: "none",
              }}
            >
              {activeStakeholderData.outcomes.map((outcome, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3.5 py-[18px] px-7"
                  style={{
                    backgroundColor: i % 2 === 0 ? colors.white : colors.background,
                    borderBottom: i < activeStakeholderData.outcomes.length - 1 ? `1px solid ${colors.line}` : "none",
                  }}
                >
                  <span className="shrink-0" style={{ color: colors.accent }}>
                    <IconCheck />
                  </span>
                  <span className="font-[Inter,sans-serif] text-[14px] text-[#444] leading-[1.5]">
                    {outcome}
                  </span>
                </div>
              ))}
            </div>

            {/* Key Advantage Strip */}
            <div
              className="py-4 px-7 flex items-center gap-3 rounded-xl mt-3"
              style={{ backgroundColor: colors.primary }}
            >
              <span
                className="font-[Inter,sans-serif] text-[11px] font-bold uppercase tracking-[1px]"
                style={{ color: colors.accent }}
              >
                Key Advantage
              </span>
              <span className="font-[Inter,sans-serif] text-[14px] font-semibold text-white">
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
// FOOTER
// ============================================================================

// ═══════════════════════════════════════════════
const SectorGrid = () => {
  const [hovered, setHovered] = useState(null);
  return (
    <div>
      <div
        className="text-[12px] font-semibold font-['DM_Sans',sans-serif] uppercase tracking-[1.5px] mb-3 transition-colors duration-[250ms] leading-none min-h-3"
        style={{ color: hovered !== null ? colors.accent : "rgba(255,255,255,0.4)" }}
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
              className="flex items-center justify-center w-11 h-11 rounded-[10px] cursor-pointer no-underline box-border"
              style={{
                backgroundColor: isH ? "rgba(184,217,53,0.12)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${isH ? "rgba(184,217,53,0.35)" : "rgba(255,255,255,0.07)"}`,
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isH ? "translateY(-2px)" : "none",
                boxShadow: isH ? "0 6px 16px rgba(0,0,0,0.2), 0 0 0 1px rgba(184,217,53,0.15)" : "none",
              }}
            >
              <div
                className="flex items-center justify-center transition-opacity duration-[250ms]"
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

export default function InfrastructureSectorPage() {
  return (
    <SectorPageTemplate
      sector={sectorData}
      renderProblemSection={() => (
        <>
          <style>{`
            .cta-primary { transition: all 0.3s ease; }
            .cta-primary:hover { background-color: #B8D935 !important; color: #1B4D3E !important; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(184,217,53,0.3); }
            .cta-primary:hover .cta-btn-arrow { background-color: rgba(27, 77, 62, 0.15) !important; }
            .cta-primary:hover .cta-btn-arrow svg { stroke: #1B4D3E !important; }
            .cta-lime-swap { transition: all 0.3s ease; }
            .cta-lime-swap:hover { background-color: #1B4D3E !important; color: #FFFFFF !important; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(27,77,62,0.3); }
            .cta-lime-swap:hover .cta-btn-arrow { background-color: rgba(255, 255, 255, 0.2) !important; }
            .cta-lime-swap:hover .cta-btn-arrow svg { stroke: #FFFFFF !important; }
            .cta-secondary { transition: all 0.3s ease; }
            .cta-secondary:hover { border-color: #1B4D3E !important; color: #1B4D3E !important; transform: translateY(-1px); }
            .value-card { transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
            .value-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(27, 77, 62, 0.12); }
          `}</style>
          <ProblemSection sector={sectorData} />
        </>
      )}
      renderValueChainSection={() => <ValueChainSectionPremium />}
      renderEcosystemSection={() => <MarketEcosystemSection sector={sectorData} />}
      renderCrossSectorSection={() => <CrossSectorSection />}
      renderInvestmentSection={() => <InvestmentCTASection sector={sectorData} />}
      renderImpactSection={() => <ImpactSection />}
      policyTitle={
        <>
          <span className="font-semibold">Moving</span> in Step with Ghana's{" "}
          <span className="font-semibold">Infrastructure</span>{" "}
          <span style={{ color: colors.accent }} className="font-semibold">Transformation</span>
        </>
      }
      policySubtitle="BRIDGE ventures align directly with Build24 infrastructure priorities and the Model Market mandate — creating pathways for public-private collaboration across 260+ districts."
      ctaHeading={
        <>
          Let's <span className="font-semibold">Build</span> Ghana's{" "}
          <span style={{ color: colors.accent }} className="font-semibold">Infrastructure</span>
        </>
      }
      ctaDescription="Whether you're an investor, institutional partner, or government stakeholder — there's a seat at the table in building Ghana's infrastructure future."
    />
  );
}
