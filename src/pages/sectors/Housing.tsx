import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { IconArrowRight, IconArrowDown, IconCheck, IconWarning, IconWallet, IconBuilding, IconGraduation, IconShield, IconKey, IconClipboard, IconTool, IconTarget, IconSearch, IconCreditCard, IconUsers, IconHome, IconStorefront, IconOfficeBuilding, IconTrendingUp, IconLandmark, IconChevronDown } from "@/components/icons/SectorIcons";
import { ArrowRight, ArrowUpRight, BatteryCharging, Building2, Check, ChevronRight, Clock, Cpu, Hammer, Home, Landmark, LayoutGrid } from "lucide-react";
import { colors, layout } from "@/lib/theme";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectorFinalCTA from "@/components/sectors/SectorFinalCTA";
import SectorHeroSection from "@/components/sectors/SectorHeroSection";
import { useCounter } from "@/hooks/useCounter";
import { cn } from "@/lib/utils";

const CONTENT_MAX_WIDTH = layout.maxWidth;

// ============================================================================
// SECTOR DATA - Housing & Real Estate
// ============================================================================

const sectorData = {
  id: 8,
  slug: "housing",
  name: "Housing & Real Estate",
  shortName: "Housing",
  category: "Shelter & Security",
  categoryColor: "#6B21A8",
  heroTitleBold: "Housing",
  heroTitleRest: "& Real Estate",

  capitalRange: "$26-48M",
  ventures: 19,
  jobsImpact: "19M renters",
  gdpContribution: "Foundation",

  problemHeadline: "The Foundation Beneath Every Family's Future",
  problemSubheadline:
    "Ghana's housing sector holds extraordinary potential — from formalizing land access for 98% of properties without title protection, to completing the 50%+ of construction projects stalled mid-build, to unlocking affordable rental pathways for 19 million citizens. These are pathways where trust infrastructure and innovation can create transformative value.",

  keyStats: [
    { label: "Addressable Housing Gap", value: "1.8M", detail: "Homes needed across Ghana" },
    { label: "Land Formalization Potential", value: "98%", detail: "Properties without title protection" },
    { label: "Completion Opportunity", value: "50%+", detail: "Construction projects stalled mid-build" },
    { label: "Mortgage Market Potential", value: "0.8%", detail: "Current penetration vs regional peers" },
  ],

  painPoints: [
    {
      title: "Land Title Formalization",
      description:
        "60,000+ land transactions awaiting modern verification solutions — creating an enormous market for title security, digital records, and trusted registration.",
      rootCauses: [
        "Title registration framework opportunity",
        "Centralized land database potential",
        "Digital records modernization",
      ],
      quantification: "60,000+ transactions to formalize; 10-20 year resolution cycle to streamline",
    },
    {
      title: "Construction Completion Pathways",
      description:
        "Over 50% of self-managed building projects represent completion opportunities — through milestone oversight, contractor accountability, and quality inspections.",
      rootCauses: ["Licensing framework opportunity", "Performance bond innovation", "Independent inspection services"],
      quantification: "50%+ projects awaiting completion solutions",
    },
    {
      title: "Rental Access Innovation",
      description:
        "19 million Ghanaians navigating 2-3 year advance requirements — creating massive demand for rental guarantees, tenant screening, and payment alternatives.",
      rootCauses: [
        "Enforcement modernization potential",
        "Rental guarantee product demand",
        "Tenant credit infrastructure opportunity",
      ],
      quantification: "19 million citizens to serve; advance requirement reduction potential",
    },
    {
      title: "Workforce Professionalization",
      description:
        "80%+ of construction artisans are ready for formal certification and training pathways — building quality assurance, safety standards, and recognition.",
      rootCauses: [
        "Certification system creation",
        "Formal training pathway development",
        "Safety standards implementation",
      ],
      quantification: "80%+ artisans to certify; professional standards to establish",
    },
  ],

  solutions: [
    {
      tier: 1,
      name: "Construction Oversight Platform",
      description:
        "Milestone verification, payment escrow, video documentation, and independent quality inspection for self-build housing projects across Ghana.",
      capital: "$1.5-2.5M",
      score: 41,
      impact: "Serves 50%+ of projects awaiting completion solutions",
      model: "Milestone-gated payments with digital verification",
    },
    {
      tier: 1,
      name: "Title Verification Platform",
      description:
        "Comprehensive land due diligence combining Lands Commission records, court checks, traditional authority validation, and blockchain verification.",
      capital: "$500K-1M",
      score: 40,
      impact: "Formalizes access for 98% of land without title protection",
      model: "Fee-per-verification; SESO/HouseAfrica integration",
    },
    {
      tier: 1,
      name: "Rental Guarantee Products",
      description:
        "Insurance-backed instruments guaranteeing landlord rent receipt on tenant default, reducing advance payment requirements from years to months.",
      capital: "$1-2M",
      score: 39,
      impact: "Unlocks housing access for 19 million renters",
      model: "Premium-funded guarantee with tenant screening",
    },
    {
      tier: 1,
      name: "Property Management Service",
      description:
        "Full-service management with tenant screening, mobile money collection, maintenance coordination, and digital reporting for property owners.",
      capital: "$800K-1.5M",
      score: 39,
      impact: "Professionalizes rental market for absentee owners",
      model: "Percentage-of-rent revenue model",
    },
    {
      tier: 1,
      name: "Contractor Verification System",
      description:
        "Systematic contractor vetting with license checks, project track record assessment, client ratings, and ongoing performance monitoring systems.",
      capital: "$300-500K",
      score: 39,
      impact: "Serves the 90% self-builder market ready for trusted tools",
      model: "Tiered certification with ongoing monitoring",
    },
    {
      tier: 1,
      name: "Construction Skills Certification",
      description:
        "Tiered credentialing for masons, electricians, plumbers, and artisans through nationally recognized certification and training programmes.",
      capital: "$500K-1M",
      score: 38,
      impact: "Differentiates skilled artisans, elevates standards",
      model: "Partnership with Artisan Association & TVET",
    },
    {
      tier: 2,
      name: "Housing Cooperative Structure",
      description:
        "Pooled investment vehicles enabling group housing with professional management, shared risk mitigation, and development economies of scale.",
      capital: "$3-5M",
      score: 37,
      impact: "Professional oversight for collective housing",
      model: "Member equity + development finance",
    },
    {
      tier: 2,
      name: "Rent Advance Financing",
      description:
        "Structured lending paying landlord advances upfront while tenants repay monthly, scaling the validated National Rental Assistance Scheme model.",
      capital: "$2-4M",
      score: 36,
      impact: "Bridges tenant advance requirements",
      model: "Monthly repayment with risk assessment",
    },
    {
      tier: 2,
      name: "Tenant Services Platform",
      description:
        "Verified landlord ratings, digital lease management, deposit protection, and dispute resolution serving Ghana's 40%+ urban renter population.",
      capital: "$400-700K",
      score: 35,
      impact: "Empowers tenants with transparency and protection",
      model: "Freemium with premium dispute services",
    },
  ],

  competitors: [
    {
      name: "SESO Global",
      focus: "Blockchain land verification",
      gap: "Self-builder services integration",
      year: "2019",
      funding: "$3M+",
      priority: "High",
      strengths: [
        { name: "Title Verification", rating: 5 },
        { name: "Blockchain Tech", rating: 4 },
        { name: "Market Coverage", rating: 3 },
      ],
      gaps: ["Construction oversight integration", "Rental services collaboration", "Self-builder market extension"],
      bridgeOpportunity: "Title verification data partnership for self-builder market",
    },
    {
      name: "meQasa",
      focus: "Property listings & search",
      gap: "Transaction integrity layer",
      year: "2013",
      funding: "$2M+",
      priority: "Medium",
      strengths: [
        { name: "Property Listings", rating: 5 },
        { name: "User Base", rating: 4 },
        { name: "Brand Recognition", rating: 4 },
      ],
      gaps: ["Title verification integration", "Construction services layer", "Informal market extension"],
      bridgeOpportunity: "Verified listing integration with BRIDGE management services",
    },
    {
      name: "National Housing Mortgage Fund",
      focus: "Subsidized mortgages at 11.9-12%",
      gap: "Eligibility expansion potential",
      year: "2018",
      funding: "Gov't",
      priority: "High",
      strengths: [
        { name: "Below-Market Rates", rating: 5 },
        { name: "Government Backing", rating: 5 },
        { name: "Proof of Concept", rating: 4 },
      ],
      gaps: ["Private sector eligibility extension", "Scale acceleration", "Disbursement streamlining"],
      bridgeOpportunity: "Alternative income verification to expand eligibility beyond public sector",
    },
    {
      name: "GREDA",
      focus: "Developer association (250+ members)",
      gap: "Informal sector integration",
      year: "1988",
      funding: "Industry",
      priority: "Medium",
      strengths: [
        { name: "Industry Standards", rating: 4 },
        { name: "Government Access", rating: 5 },
        { name: "Member Network", rating: 4 },
      ],
      gaps: ["Informal sector bridge (90% of supply)", "Innovation acceleration", "Regional expansion"],
      bridgeOpportunity: "Quality standards partnership for self-builder market",
    },
    {
      name: "National Rental Assistance Scheme",
      focus: "Rent advance support",
      gap: "Scale and awareness amplification",
      year: "2023",
      funding: "Gov't",
      priority: "High",
      strengths: [
        { name: "Addresses Core Need", rating: 5 },
        { name: "Government Mandate", rating: 4 },
        { name: "Model Validation", rating: 4 },
      ],
      gaps: ["Eligibility broadening", "Scale amplification", "Awareness building"],
      bridgeOpportunity: "Private sector scale-up of validated rent advance model",
    },
    {
      name: "HouseAfrica (Nigeria)",
      focus: "Blockchain land registry",
      gap: "Ghana market collaboration",
      year: "2017",
      funding: "$400K+",
      priority: "Low",
      strengths: [
        { name: "Blockchain Registry", rating: 4 },
        { name: "200K+ Properties", rating: 4 },
        { name: "Ghana Expansion Plans", rating: 2 },
      ],
      gaps: ["Ghana market partnership", "Government integration pathway", "Local validation"],
      bridgeOpportunity: "Technology partnership if Ghana expansion materializes",
    },
  ],

  policyAlignment: [
    {
      policy: "Big Push Infrastructure Programme",
      allocation: "$10B commitment",
      alignment: "Housing components within largest infrastructure initiative in Ghana's history",
    },
    {
      policy: "Low-Cost Housing for Public Workers",
      allocation: "Salary deduction model",
      alignment: "BRIDGE verification and oversight services for government housing",
    },
    {
      policy: "Rent Control Bill",
      allocation: "Regulatory framework",
      alignment: "Rental guarantee products directly enable 1-year advance limit compliance",
    },
    {
      policy: "Lands Commission Digitization",
      allocation: "$85M project",
      alignment: "BRIDGE title verification complements government digitization with private verification layer",
    },
    {
      policy: "National Rental Assistance Scheme",
      allocation: "Gov't funded",
      alignment: "BRIDGE rent advance financing scales the NRAS model through private sector",
    },
    {
      policy: "Real Estate Agency Act 2020",
      allocation: "Regulatory framework",
      alignment: "BRIDGE contractor verification supports licensing implementation objectives",
    },
  ],

  relatedSectors: [
    {
      id: 2,
      name: "Financial Inclusion",
      icon: "wallet",
      reason: "Mortgage facilitation, payment escrow, housing savings",
    },
    {
      id: 1,
      name: "Infrastructure",
      icon: "building",
      reason: "Construction infrastructure, WASH, utility connections",
    },
    {
      id: 5,
      name: "Education & Skills",
      icon: "graduation",
      reason: "TVET construction training, artisan certification",
    },
  ],
};

// ============================================================================
// PREMIUM VALUE CHAIN DATA
// ============================================================================

const valueChainStages = [
  {
    id: 1,
    stage: "Land Acquisition",
    actor: "Land Buyers",
    population: "Millions annually",
    icon: "land",
    valueRetained: 100,
    valueLost: 0,
    painPoints: [
      "Title verification demand",
      "Formalization potential for 98%",
      "Security services opportunity",
      "Registration streamlining",
    ],
    stat: "60,000+ transactions to formalize",
  },
  {
    id: 2,
    stage: "Design & Approval",
    actor: "Professionals & Regulators",
    population: "Fragmented agencies",
    icon: "blueprint",
    valueRetained: 85,
    valueLost: 15,
    painPoints: [
      "Approval coordination platform",
      "Timeline acceleration services",
      "Process transparency tools",
      "Zoning clarity solutions",
    ],
    stat: "2+ years to streamline",
  },
  {
    id: 3,
    stage: "Construction",
    actor: "Self-Builders & Artisans",
    population: "90% of housing",
    icon: "hammer",
    valueRetained: 60,
    valueLost: 25,
    painPoints: [
      "Completion oversight demand",
      "Materials verification opportunity",
      "Cost management tools",
      "Quality inspection services",
    ],
    stat: "50%+ projects to complete",
  },
  {
    id: 4,
    stage: "Financing",
    actor: "Banks & Informal Lenders",
    population: "<5,000 mortgages",
    icon: "bank",
    valueRetained: 40,
    valueLost: 20,
    painPoints: [
      "Rate innovation potential",
      "Income verification solutions",
      "Collateral framework opportunity",
      "Title-backed lending enablement",
    ],
    stat: "0.8% mortgage-to-GDP to grow",
  },
  {
    id: 5,
    stage: "Occupancy",
    actor: "Tenants & Landlords",
    population: "19M renters",
    icon: "home",
    valueRetained: 25,
    valueLost: 15,
    painPoints: [
      "Rental guarantee product demand",
      "Maintenance service opportunity",
      "Tenant empowerment platform",
      "Lease formalization services",
    ],
    stat: "19M renters to serve",
  },
];

// Value Chain Icons
const valueChainIcons = {
  land: <Building2 size={24} strokeWidth={1.5} />,
  blueprint: <LayoutGrid size={24} strokeWidth={1.5} />,
  hammer: <Hammer size={24} strokeWidth={1.5} />,
  bank: <Landmark size={24} strokeWidth={1.5} />,
  home: <Home size={24} strokeWidth={1.5} />,
};

const solutionIcons = {
  "Construction Oversight Platform": <IconClipboard />,
  "Title Verification Platform": <IconSearch />,
  "Rental Guarantee Products": <IconShield />,
  "Property Management Service": <IconKey />,
  "Contractor Verification System": <IconCheck />,
  "Construction Skills Certification": <IconTool />,
  "Housing Cooperative Structure": <IconUsers />,
  "Rent Advance Financing": <IconCreditCard />,
  "Tenant Services Platform": <IconHome />,
};


// ============================================================================
// SECTION 2: PROBLEM (updated pill to Variant A - Bordered)
// ============================================================================

const ProblemSection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [expandedCard, setExpandedCard] = useState(null);

  const problemSectionData = [
    {
      id: 1,
      title: "Land Title Formalization",
      description:
        "60,000+ land transactions awaiting modern verification solutions — creating an enormous market for title security, digital records, and trusted registration.",
      rootCauses: [
        { title: "Title Registration", description: "Framework opportunity" },
        { title: "Centralized Database", description: "Land records platform" },
        { title: "Digital Modernization", description: "Records digitization" },
        { title: "Dispute Resolution", description: "Streamlined processes" },
      ],
      quantification: "60,000+ transactions to formalize",
      severity: "High Priority",
      severityScore: 95,
      affectedCount: "60,000+",
      affectedLabel: "transactions to formalize",
      bridgeSolution: "Title Verification Platform",
    },
    {
      id: 2,
      title: "Construction Completion",
      description:
        "Over 50% of self-managed building projects represent completion opportunities — through milestone oversight, contractor accountability, and quality inspections.",
      rootCauses: [
        { title: "Licensing Framework", description: "Contractor standards" },
        { title: "Performance Bonds", description: "Financial accountability" },
        { title: "Quality Inspection", description: "Independent oversight" },
        { title: "Cost Management", description: "Budget transparency" },
      ],
      quantification: "50%+ projects awaiting completion solutions",
      severity: "High Priority",
      severityScore: 92,
      affectedCount: "50%+",
      affectedLabel: "projects to complete",
      bridgeSolution: "Construction Oversight Platform",
    },
    {
      id: 3,
      title: "Rental Access Innovation",
      description:
        "19 million Ghanaians navigating 2-3 year advance requirements — creating massive demand for rental guarantees, tenant screening, and payment alternatives.",
      rootCauses: [
        { title: "Enforcement Reform", description: "Rent advance limits" },
        { title: "Guarantee Products", description: "Insurance-backed tools" },
        { title: "Tenant Credit", description: "Screening infrastructure" },
        { title: "Payment Innovation", description: "Monthly alternatives" },
      ],
      quantification: "19M citizens to serve with rental reform",
      severity: "Strategic",
      severityScore: 88,
      affectedCount: "19M",
      affectedLabel: "renters to serve",
      bridgeSolution: "Rental Guarantee Products + Tenant Services",
    },
    {
      id: 4,
      title: "Workforce Professionalization",
      description:
        "80%+ of construction artisans are ready for formal certification and training pathways — building quality assurance, safety standards, and recognition.",
      rootCauses: [
        { title: "Certification System", description: "National standards" },
        { title: "Training Pathways", description: "Formal TVET links" },
        { title: "Safety Standards", description: "Worksite compliance" },
        { title: "Skills Recognition", description: "Premium pricing access" },
      ],
      quantification: "80%+ artisans to certify professionally",
      severity: "Strategic",
      severityScore: 80,
      affectedCount: "80%+",
      affectedLabel: "artisans to certify",
      bridgeSolution: "Construction Skills Certification + Artisan Co-op",
    },
  ];

  const severityColors = (sev) =>
    sev === "High Priority"
      ? { text: colors.primary, bg: colors.accentLight, fill: colors.primary }
      : { text: "#5C7A1F", bg: "rgba(184,217,53,0.12)", fill: colors.accent };

  return (
    <section style={{ backgroundColor: colors.background, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Header */}
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif]"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
              padding: "10px 20px",
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
            <span className="font-semibold">1.8M+ Homes</span> and 19M Renters Ready for{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>Better Solutions</span>
          </h2>
          <p
            className="font-[Inter,sans-serif] text-[#666] leading-[1.65] max-w-[680px] m-0"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
          >
            Ghana's housing sector represents one of the most compelling investment landscapes in West Africa. From land
            buyers to tenants, every participant is ready for trust infrastructure, better information, and professional
            services.
          </p>
        </div>

        {/* Card Grid */}
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
          {problemSectionData.map((problem, i) => {
            const isExpanded = expandedCard === i;
            const sCol = severityColors(problem.severity);
            return (
              <div
                key={problem.id}
                style={isMobile ? { minWidth: "85%", maxWidth: "85%", flexShrink: 0, scrollSnapAlign: "start" } : {}}
              >
                <div
                  onClick={() => setExpandedCard(isExpanded ? null : i)}
                  className="cursor-pointer transition-all duration-300 ease-in-out"
                  style={{
                    backgroundColor: colors.white,
                    borderRadius: isMobile ? "16px" : "20px",
                    padding: isMobile ? "20px" : "28px",
                    border: isExpanded ? `2px solid ${colors.accent}` : `1px solid ${colors.line}`,
                  }}
                >
                  {/* Zone 1 — Title Row */}
                  <div className="flex justify-between items-start gap-3 mb-3">
                    <h3
                      className="font-[Inter,sans-serif] font-semibold m-0 flex-1"
                      style={{
                        fontSize: isMobile ? "16px" : "18px",
                        color: colors.dark,
                      }}
                    >
                      {problem.title}
                    </h3>
                    <span
                      className="font-[Inter,sans-serif] text-[11px] font-bold rounded-[20px] whitespace-nowrap shrink-0"
                      style={{
                        color: sCol.text,
                        backgroundColor: sCol.bg,
                        padding: "6px 14px",
                      }}
                    >
                      {problem.severity}
                    </span>
                  </div>
                  {/* Description — line clamp */}
                  <p
                    className="font-[Inter,sans-serif] text-[#666] leading-[1.6]"
                    style={{
                      fontSize: isMobile ? "13px" : "14px",
                      margin: "0 0 16px 0",
                      display: "-webkit-box",
                      WebkitLineClamp: isMobile ? 2 : 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      ...(isMobile ? {} : { minHeight: "63px" }),
                    }}
                  >
                    {problem.description}
                  </p>

                  {/* Zone 2 — Impact Bar */}
                  <div
                    className="rounded-[12px]"
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

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="pt-4" style={{ borderTop: `1px solid ${colors.line}` }}>
                      {/* Zone 3 — Priority + Scale */}
                      <div
                        className="grid gap-3 mb-5"
                        style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}
                      >
                        {/* Priority */}
                        <div className="rounded-[12px] p-[14px]" style={{ backgroundColor: colors.background }}>
                          <div className="flex justify-between items-center mb-[10px]">
                            <span className="font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888]">
                              Priority
                            </span>
                            <span
                              className="font-[Inter,sans-serif] text-[12px] font-bold rounded-[20px]"
                              style={{
                                color: sCol.text,
                                backgroundColor: sCol.bg,
                                padding: "4px 10px",
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
                              className="h-full rounded transition-[width] duration-[800ms] ease-in-out"
                              style={{
                                width: `${problem.severityScore}%`,
                                backgroundColor: sCol.fill,
                              }}
                            />
                          </div>
                        </div>
                        {/* Scale */}
                        <div className="rounded-[12px] p-[14px]" style={{ backgroundColor: colors.background }}>
                          <span className="block font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888] mb-1">
                            Scale
                          </span>
                          <div className="flex items-baseline gap-[6px]">
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

                      {/* Zone 4 — Opportunity Drivers */}
                      <div className="mb-5">
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
                              className="flex items-start gap-3 rounded-[12px]"
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
                                  {cause.title}
                                </div>
                                <div className="font-[Inter,sans-serif] text-[12px] text-[#888]">
                                  {cause.description}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Zone 5 — BRIDGE Solution Footer */}
                      <div
                        className="pt-4 flex"
                        style={{
                          borderTop: `1px solid ${colors.line}`,
                          flexDirection: isMobile ? "column" : "row",
                          alignItems: isMobile ? "flex-start" : "center",
                          gap: isMobile ? "8px" : "16px",
                        }}
                      >
                        <div className="flex items-center gap-2 flex-1">
                          <Check size={18} strokeWidth={2.5} color={colors.accent} />
                          <span className="font-[Inter,sans-serif] text-[13px] text-[#888]">
                            BRIDGE Solution:
                          </span>
                          <span
                            className="font-[Inter,sans-serif] text-[14px] font-semibold"
                            style={{ color: colors.primary }}
                          >
                            {problem.bridgeSolution}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 cursor-pointer">
                          <span
                            className="font-[Inter,sans-serif] text-[13px] font-medium"
                            style={{ color: colors.primary }}
                          >
                            View
                          </span>
                          <ArrowRight size={14} strokeWidth={2} color={colors.primary} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile scroll indicators */}
        {isMobile && (
          <div className="flex justify-center items-center gap-2 mt-4">
            {problemSectionData.map((_, i) => (
              <div
                key={i}
                className="h-2 rounded cursor-pointer transition-all duration-300 ease-in-out"
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
// SECTION 3: PREMIUM VALUE CHAIN (pill Variant C - Lime Glow)
// ============================================================================

const ChevronArrow = ({ active }) => (
  <ChevronRight size={24} strokeWidth={2} color={active ? colors.accent : "rgba(255,255,255,0.15)"} style={{ transition: "stroke 0.3s ease" }} />
);

const ValueChainSectionPremium = () => {
  const isMobile = useIsMobile();
  const [activeStage, setActiveStage] = useState(0);
  const [showMoreVC, setShowMoreVC] = useState(false);

  return (
    <section style={{ backgroundColor: colors.white, padding: isMobile ? "48px 20px" : "80px 80px" }}>
      <div className="mx-auto text-center" style={{ maxWidth: "1200px" }}>
        {/* Pill: on white bg → background fill + border */}
        <span
          className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-5"
          style={{
            backgroundColor: colors.white,
            border: `1px solid ${colors.line}`,
            color: colors.primary,
            padding: "10px 20px",
          }}
        >
          The Process
        </span>
        <h2
          className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[600px] mx-auto"
          style={{
            fontSize: isMobile ? "28px" : "42px",
            color: colors.primary,
            margin: "0 0 16px 0",
          }}
        >
          From Land to Living
        </h2>
        <p
          className="font-[Inter,sans-serif] text-[#666] leading-[1.65] max-w-[750px]"
          style={{
            fontSize: isMobile ? "15px" : "16px",
            margin: isMobile ? "0 auto 28px" : "0 auto 40px",
          }}
        >
          Follow the housing journey from land acquisition through occupancy — see where strategic resources and
          innovation create compounding value at every stage.
        </p>
      </div>
      <div className="mx-auto" style={{ maxWidth: "1200px" }}>
        {/* Stage Flow Nav */}
        <div
          className="flex items-start justify-center"
          style={{
            gap: "0",
            marginBottom: isMobile ? "24px" : "40px",
            ...(isMobile
              ? {
                  overflowX: "auto",
                  WebkitOverflowScrolling: "touch",
                  margin: "0 -20px",
                  padding: "0 20px 8px",
                  marginBottom: "24px",
                }
              : {}),
          }}
        >
          {valueChainStages.map((stage, i) => {
            const isActive = activeStage === i;
            const isPast = i < activeStage;
            return (
              <React.Fragment key={i}>
                <div
                  onClick={() => {
                    setActiveStage(i);
                    setShowMoreVC(false);
                  }}
                  className="flex flex-col items-center cursor-pointer"
                  style={{
                    flex: isMobile ? "none" : 1,
                    maxWidth: isMobile ? "80px" : "180px",
                    minWidth: isMobile ? "64px" : "auto",
                  }}
                >
                  <div
                    className="flex items-center justify-center transition-all duration-300"
                    style={{
                      width: isActive ? (isMobile ? "52px" : "64px") : isMobile ? "44px" : "56px",
                      height: isActive ? (isMobile ? "52px" : "64px") : isMobile ? "44px" : "56px",
                      borderRadius: isActive ? "18px" : "16px",
                      backgroundColor: isActive ? colors.primary : isPast ? colors.accentLight : colors.background,
                      border: isActive ? "none" : `2px solid ${isPast ? colors.primary : colors.line}`,
                      color: isActive ? colors.white : isPast ? colors.primary : "#999",
                    }}
                  >
                    {valueChainIcons[stage.icon]}
                  </div>
                  <div
                    className="font-[Inter,sans-serif] text-center leading-[1.2] transition-all duration-300 ease-in-out"
                    style={{
                      fontSize: isMobile ? "10px" : "13px",
                      marginTop: isMobile ? "8px" : "10px",
                      fontWeight: isActive ? "700" : "500",
                      color: isActive ? colors.primary : isPast ? colors.primary : "#999",
                      maxWidth: isMobile ? "64px" : "none",
                    }}
                  >
                    {isMobile ? stage.stage.split(" ")[0] : stage.stage}
                  </div>
                </div>
                {i < valueChainStages.length - 1 && !isMobile && (
                  <div
                    className="flex items-center pt-[18px] transition-opacity duration-300 ease-in-out"
                    style={{ opacity: i < activeStage ? 1 : 0.3 }}
                  >
                    <ChevronRight size={20} strokeWidth={2} color={i < activeStage ? colors.primary : colors.line} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Value Creation Flow bar */}
        <div style={{ marginBottom: isMobile ? "20px" : "28px", padding: isMobile ? "0" : "0 40px" }}>
          <div className="flex justify-between items-center mb-2">
            <span className="font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[1px] text-[#999]">
              Value Creation Flow
            </span>
            <span
              className="font-[Poppins,sans-serif] text-[13px] font-bold"
              style={{ color: colors.primary }}
            >
              {valueChainStages[activeStage].valueRetained}% value capture at this stage
            </span>
          </div>
          <div
            className="h-[6px] rounded-[3px] overflow-hidden relative"
            style={{ backgroundColor: colors.line }}
          >
            <div
              className="h-full rounded-[3px] transition-[width] duration-[600ms]"
              style={{
                width: `${valueChainStages[activeStage].valueRetained}%`,
                background: `linear-gradient(90deg, ${colors.accent}, ${valueChainStages[activeStage].valueRetained > 60 ? colors.accent : colors.primary})`,
              }}
            />
            {!isMobile &&
              valueChainStages.map((s, i) => (
                <div
                  key={i}
                  className="absolute rounded-full transition-all duration-300 ease-in-out"
                  style={{
                    top: "-3px",
                    left: `${s.valueRetained}%`,
                    transform: "translateX(-50%)",
                    width: "12px",
                    height: "12px",
                    backgroundColor: activeStage === i ? colors.primary : colors.line,
                    border: `2px solid ${activeStage === i ? colors.primary : colors.line}`,
                  }}
                />
              ))}
          </div>
        </div>

        {/* Detail Panel — compact */}
        <div
          className="grid rounded-[16px]"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "20px" : "32px",
            backgroundColor: colors.background,
            padding: isMobile ? "20px" : "28px 32px",
            border: `1px solid ${colors.line}`,
          }}
        >
          {/* Left: Stage Info */}
          <div>
            <div
              className="flex items-center gap-[14px]"
              style={{ marginBottom: isMobile ? "16px" : "20px" }}
            >
              <div
                className="w-10 h-10 rounded-[10px] flex items-center justify-center"
                style={{ backgroundColor: colors.accentLight, color: colors.primary }}
              >
                {valueChainIcons[valueChainStages[activeStage].icon]}
              </div>
              <div>
                <div
                  className="font-[Inter,sans-serif] font-bold"
                  style={{
                    fontSize: isMobile ? "18px" : "20px",
                    color: colors.primary,
                  }}
                >
                  {valueChainStages[activeStage].stage}
                </div>
                <div className="font-[Inter,sans-serif] text-[13px] text-[#999]">
                  {valueChainStages[activeStage].actor}
                </div>
              </div>
            </div>

            <div
              className="grid grid-cols-2"
              style={{
                gap: isMobile ? "10px" : "12px",
                marginBottom: isMobile ? "14px" : "16px",
              }}
            >
              <div
                className="rounded-[10px]"
                style={{
                  padding: isMobile ? "10px" : "12px 14px",
                  backgroundColor: colors.white,
                  border: `1px solid ${colors.line}`,
                }}
              >
                <div className="font-[Inter,sans-serif] text-[10px] text-[#999] mb-[2px] uppercase tracking-[0.5px]">
                  Scale
                </div>
                <div
                  className="font-[Inter,sans-serif] text-[14px] font-semibold"
                  style={{ color: colors.primary }}
                >
                  {valueChainStages[activeStage].population}
                </div>
              </div>
              <div
                className="rounded-[10px]"
                style={{
                  padding: isMobile ? "10px" : "12px 14px",
                  backgroundColor: colors.white,
                  border: `1px solid ${colors.line}`,
                }}
              >
                <div className="font-[Inter,sans-serif] text-[10px] text-[#999] mb-[2px] uppercase tracking-[0.5px]">
                  Recapture Potential
                </div>
                <div
                  className="font-[Inter,sans-serif] text-[14px] font-semibold"
                  style={{ color: colors.primary }}
                >
                  {valueChainStages[activeStage].valueLost > 0
                    ? `${valueChainStages[activeStage].valueLost}%`
                    : "Entry point"}
                </div>
              </div>
            </div>

            {/* Key stat callout — compact */}
            <div
              className="rounded-[10px]"
              style={{
                padding: isMobile ? "12px 16px" : "14px 18px",
                backgroundColor: colors.accentLight,
                marginBottom: valueChainStages[activeStage].valueLost > 0 ? (isMobile ? "14px" : "16px") : 0,
              }}
            >
              <div
                className="font-[Poppins,sans-serif] font-bold leading-[1.1] mb-[2px]"
                style={{
                  fontSize: isMobile ? "20px" : "22px",
                  color: colors.primary,
                }}
              >
                {valueChainStages[activeStage].stat}
              </div>
              <div className="font-[Inter,sans-serif] text-[11px] text-[#999]">
                Key indicator for this stage
              </div>
            </div>

            {/* Recapture strip — moved to left column */}
            {valueChainStages[activeStage].valueLost > 0 && (
              <div
                className="flex items-center gap-2 rounded-[10px]"
                style={{
                  padding: "10px 14px",
                  backgroundColor: colors.white,
                  border: `1px solid ${colors.line}`,
                }}
              >
                <div
                  className="w-[6px] h-[6px] rounded-full shrink-0"
                  style={{ backgroundColor: colors.accent }}
                />
                <span
                  className="font-[Inter,sans-serif] text-[12px] font-semibold"
                  style={{ color: colors.primary }}
                >
                  {valueChainStages[activeStage].valueLost}% value recapture potential at this stage
                </span>
              </div>
            )}
          </div>

          {/* Right: Opportunity Areas (collapsible on mobile) */}
          {(!isMobile || showMoreVC) && (
            <div>
              <div
                className="font-[Inter,sans-serif] text-[11px] font-bold uppercase tracking-[1.5px] mb-[14px]"
                style={{ color: colors.primary }}
              >
                Opportunity Areas
              </div>
              {valueChainStages[activeStage].painPoints.map((point, i) => (
                <div
                  key={i}
                  className="flex items-center gap-[10px] mb-2 rounded-[10px]"
                  style={{
                    padding: "10px 14px",
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.line}`,
                  }}
                >
                  <div
                    className="w-[6px] h-[6px] rounded-full shrink-0"
                    style={{ backgroundColor: colors.accent }}
                  />
                  <span className="font-[Inter,sans-serif] text-[13px] text-[#555] leading-[1.4]">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Mobile toggle */}
          {isMobile && (
            <button
              onClick={() => setShowMoreVC(!showMoreVC)}
              className="flex items-center justify-center gap-2 w-full bg-transparent rounded-[10px] font-[Inter,sans-serif] text-[13px] font-semibold cursor-pointer"
              style={{
                padding: "12px",
                border: `1px solid ${colors.line}`,
                color: colors.primary,
              }}
            >
              {showMoreVC ? "Show less" : "Show opportunity areas"}
              <ChevronDown size={14} strokeWidth={2.5} color={colors.primary} style={{ transform: showMoreVC ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SECTION 4: SOLUTIONS (pill Variant A - Bordered on white)
// ============================================================================

const SolutionsSection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [activeTier, setActiveTier] = useState("all");
  const tiers = [
    { id: "all", label: "All Ventures" },
    { id: 1, label: "Flagship" },
    { id: 2, label: "Scaling" },
  ];
  const filtered = activeTier === "all" ? sector.solutions : sector.solutions.filter((s) => s.tier === activeTier);
  const [ventureScrollIndex, setVentureScrollIndex] = React.useState(0);
  const ventureScrollRef = React.useRef(null);

  const handleVentureScroll = () => {
    if (!ventureScrollRef.current) return;
    const el = ventureScrollRef.current;
    const cardWidth = el.offsetWidth * 0.88 + 12;
    setVentureScrollIndex(Math.round(el.scrollLeft / cardWidth));
  };
  const scrollToVenture = (idx) => {
    if (!ventureScrollRef.current) return;
    const el = ventureScrollRef.current;
    const cardWidth = el.offsetWidth * 0.88 + 12;
    el.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
    setVentureScrollIndex(idx);
  };

  return (
    <section style={{ backgroundColor: colors.primary, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div className="mx-auto" style={{ maxWidth: "1200px" }}>
        {/* Header */}
        <div className="mb-4">
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-5"
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: colors.accent,
              padding: "10px 20px",
            }}
          >
            The Pathway to Impact
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light m-0 tracking-[-0.5px] leading-[1.2] max-w-[900px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.white,
            }}
          >
            <span className="font-bold">Ventures</span> That Build{" "}
            <span className="font-bold" style={{ color: colors.accent }}>Lasting Value</span>
          </h2>
        </div>

        {/* Description row with filter aligned right */}
        <div
          className="flex justify-between"
          style={{
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "flex-end",
            gap: isMobile ? "16px" : "24px",
            marginBottom: isMobile ? "28px" : "36px",
          }}
        >
          <p
            className="font-[Inter,sans-serif] text-[rgba(255,255,255,0.6)] leading-[1.65] max-w-[680px] m-0"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
          >
            Nine ventures — each one a bridge from insight to investment to measurable public benefit — spanning
            verification, oversight, professional management, and innovative financing.
          </p>
          {/* Tier Filter — aligned with description */}
          <div className="inline-flex gap-1 shrink-0 rounded-full p-1" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
            {tiers.map((tier) => (
              <button
                key={String(tier.id)}
                onClick={() => setActiveTier(tier.id)}
                className="rounded-full border-none font-[Inter,sans-serif] cursor-pointer transition-all duration-200 ease-in-out"
                style={{
                  padding: isMobile ? "5px 12px" : "6px 16px",
                  backgroundColor: activeTier === tier.id ? colors.accent : "transparent",
                  color: activeTier === tier.id ? colors.primary : "rgba(255,255,255,0.5)",
                  fontSize: isMobile ? "11px" : "12px",
                  fontWeight: activeTier === tier.id ? "700" : "500",
                }}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={ventureScrollRef}
          onScroll={handleVentureScroll}
          style={
            isMobile
              ? {
                  display: "flex",
                  gap: "12px",
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  margin: "0 -20px",
                  padding: "0 20px 4px",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }
              : {
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "24px",
                  minHeight: "580px",
                }
          }
        >
          {filtered.map((solution, i) => (
            <div
              key={solution.name}
              className="rounded-[16px] relative overflow-hidden flex flex-col"
              style={{
                backgroundColor: colors.white,
                padding: isMobile ? "24px" : "28px",
                ...(isMobile ? { minWidth: "88%", maxWidth: "88%", flexShrink: 0, scrollSnapAlign: "start" } : {}),
              }}
            >
              <div className="flex justify-between items-start gap-3 mb-[10px]">
                <h3
                  className="font-[Inter,sans-serif] font-semibold m-0 leading-[1.3] flex-1"
                  style={{
                    fontSize: isMobile ? "16px" : "17px",
                    color: colors.primary,
                    minHeight: isMobile ? "auto" : "44px",
                  }}
                >
                  {solution.name}
                </h3>
                <span
                  className="rounded-[100px] font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1px] whitespace-nowrap shrink-0"
                  style={{
                    padding: "4px 12px",
                    backgroundColor: solution.tier === 1 ? colors.accentLight : colors.background,
                    border: `1px solid ${solution.tier === 1 ? colors.accent : colors.line}`,
                    color: colors.primary,
                  }}
                >
                  {solution.tier === 1 ? "Flagship" : "Scaling"}
                </span>
              </div>
              <p
                className="font-[Inter,sans-serif] text-[13px] text-[#666] leading-[1.6] flex-1"
                style={{
                  margin: "0 0 20px 0",
                  minHeight: isMobile ? "auto" : "64px",
                }}
              >
                {solution.description}
              </p>
              <div
                className="flex justify-between items-center pt-4 mt-auto"
                style={{ borderTop: `1px solid ${colors.line}` }}
              >
                <div>
                  <div
                    className="font-[Poppins,sans-serif] text-[18px] font-bold"
                    style={{ color: colors.primary }}
                  >
                    {solution.capital}
                  </div>
                  <div className="font-[Inter,sans-serif] text-[11px] text-[#999]">
                    Capital required
                  </div>
                </div>
                <div className="rounded-[6px]" style={{ padding: "4px 10px", backgroundColor: colors.accentLight }}>
                  <span
                    className="font-[Poppins,sans-serif] text-[14px] font-bold"
                    style={{ color: colors.primary }}
                  >
                    {solution.score}
                  </span>
                  <span className="font-[Inter,sans-serif] text-[10px] text-[#999] ml-[2px]">
                    /50
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile scroll indicators */}
        {isMobile && (
          <div className="flex justify-center items-center gap-2 mt-4">
            {filtered.map((_, i) => (
              <div
                key={i}
                onClick={() => scrollToVenture(i)}
                className="h-2 rounded cursor-pointer transition-all duration-300 ease-in-out"
                style={{
                  width: ventureScrollIndex === i ? "24px" : "8px",
                  backgroundColor: ventureScrollIndex === i ? colors.accent : "rgba(255,255,255,0.2)",
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
// SECTION 5: MARKET ECOSYSTEM (pill Variant A - Bordered)
// ============================================================================

const MarketEcosystemSection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [selectedCompetitor, setSelectedCompetitor] = useState(0);
  const [showMoreLandscape, setShowMoreLandscape] = useState(false);
  const comp = sector.competitors[selectedCompetitor];

  return (
    <section style={{ backgroundColor: colors.background, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div className="mx-auto" style={{ maxWidth: "1200px" }}>
        <span
          className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
          style={{
            backgroundColor: colors.white,
            border: `1px solid ${colors.line}`,
            color: colors.primary,
            padding: "10px 20px",
          }}
        >
          The Landscape
        </span>
        <h2
          className="font-[Inter,sans-serif] font-light tracking-[-0.5px] leading-[1.2]"
          style={{
            fontSize: isMobile ? "28px" : "42px",
            color: colors.primary,
            margin: "0 0 20px 0",
          }}
        >
          Building With Ghana's Strongest Institutions
        </h2>
        <p
          className="font-[Inter,sans-serif] text-[#666] leading-[1.65] max-w-[750px]"
          style={{
            fontSize: isMobile ? "15px" : "16px",
            margin: isMobile ? "0 0 32px 0" : "0 0 48px 0",
          }}
        >
          BRIDGE combines strengths with existing institutions — aligning resources, sharing data, and creating shared
          value across the housing ecosystem.
        </p>

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
            {sector.competitors.map((c, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelectedCompetitor(i);
                  setShowMoreLandscape(false);
                }}
                className="rounded-full font-[Inter,sans-serif] cursor-pointer whitespace-nowrap shrink-0"
                style={{
                  backgroundColor: selectedCompetitor === i ? colors.accentLight : "transparent",
                  color: selectedCompetitor === i ? colors.primary : "#999",
                  border: selectedCompetitor === i ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                  padding: "5px 10px",
                  fontSize: "11px",
                  fontWeight: selectedCompetitor === i ? "700" : "500",
                }}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}

        <div style={isMobile ? {} : { display: "grid", gridTemplateColumns: "280px 1fr", gap: "32px" }}>
          {/* Desktop sidebar */}
          {!isMobile && (
            <div className="flex flex-col gap-2">
              {sector.competitors.map((c, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedCompetitor(i)}
                  className="rounded-[10px] cursor-pointer transition-all duration-200 ease-in-out"
                  style={{
                    padding: "16px 20px",
                    backgroundColor: selectedCompetitor === i ? colors.primary : colors.white,
                  }}
                >
                  <div
                    className="font-[Inter,sans-serif] text-[14px] font-semibold"
                    style={{ color: selectedCompetitor === i ? colors.white : colors.primary }}
                  >
                    {c.name}
                  </div>
                  <div
                    className="font-[Inter,sans-serif] text-[12px] mt-[2px]"
                    style={{ color: selectedCompetitor === i ? "rgba(255,255,255,0.6)" : "#999" }}
                  >
                    {c.focus.substring(0, 35)}
                    {c.focus.length > 35 ? "..." : ""}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Detail panel */}
          <div
            className="rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            style={{
              backgroundColor: colors.white,
              padding: isMobile ? "20px 16px" : "36px",
            }}
          >
            <div
              className="flex justify-between mb-6"
              style={{
                flexDirection: isMobile ? "column" : "row",
                alignItems: "flex-start",
                gap: isMobile ? "12px" : "0",
              }}
            >
              <div>
                <h3
                  className="font-[Inter,sans-serif] font-semibold"
                  style={{
                    fontSize: isMobile ? "20px" : "22px",
                    color: colors.primary,
                    margin: "0 0 4px 0",
                  }}
                >
                  {comp.name}
                </h3>
                <p className="font-[Inter,sans-serif] text-[14px] text-[#666] m-0">
                  {comp.focus}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="rounded-lg" style={{ padding: "6px 14px", backgroundColor: colors.lightGreen }}>
                  <span
                    className="font-[Inter,sans-serif] text-[12px] font-semibold"
                    style={{ color: colors.primary }}
                  >
                    Est. {comp.year}
                  </span>
                </div>
                <div className="rounded-lg" style={{ padding: "6px 14px", backgroundColor: colors.accentLight }}>
                  <span
                    className="font-[Inter,sans-serif] text-[12px] font-semibold"
                    style={{ color: colors.primary }}
                  >
                    {comp.funding}
                  </span>
                </div>
              </div>
            </div>

            {/* Strengths - always visible */}
            <div className="mb-6">
              <div className="font-[Inter,sans-serif] text-[11px] font-bold uppercase tracking-[1px] text-[#999] mb-3">
                Strengths
              </div>
              {comp.strengths.map((s, j) => (
                <div key={j} className="flex items-center gap-3 mb-2">
                  <span
                    className="font-[Inter,sans-serif] text-[13px] text-[#555] shrink-0"
                    style={{ width: isMobile ? "120px" : "140px" }}
                  >
                    {s.name}
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className="h-[6px] rounded-[3px]"
                        style={{
                          width: isMobile ? "16px" : "20px",
                          backgroundColor: star <= s.rating ? colors.accent : colors.line,
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Collaboration + BRIDGE Opportunity - collapsible on mobile */}
            {(!isMobile || showMoreLandscape) && (
              <div>
                <div className="mb-6">
                  <div className="font-[Inter,sans-serif] text-[11px] font-bold uppercase tracking-[1px] text-[#999] mb-3">
                    Collaboration Opportunities
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {comp.gaps.map((gap, j) => (
                      <span
                        key={j}
                        className="rounded-[6px] font-[Inter,sans-serif] text-[12px]"
                        style={{
                          padding: "6px 12px",
                          backgroundColor: colors.warningBg,
                          color: colors.warningText,
                        }}
                      >
                        {gap}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-[10px]" style={{ padding: "16px 20px", backgroundColor: colors.lightGreen }}>
                  <div
                    className="font-[Inter,sans-serif] text-[11px] font-bold uppercase tracking-[1px] mb-[6px]"
                    style={{ color: colors.accent }}
                  >
                    BRIDGE Opportunity
                  </div>
                  <p
                    className="font-[Inter,sans-serif] text-[14px] leading-[1.6] m-0"
                    style={{ color: colors.white }}
                  >
                    {comp.bridgeOpportunity}
                  </p>
                </div>
              </div>
            )}

            {/* Mobile toggle */}
            {isMobile && (
              <button
                onClick={() => setShowMoreLandscape(!showMoreLandscape)}
                className="flex items-center justify-center gap-2 w-full bg-transparent rounded-[12px] font-[Inter,sans-serif] text-[14px] font-semibold cursor-pointer mt-4"
                style={{
                  padding: "14px",
                  border: `1px solid ${colors.line}`,
                  color: colors.primary,
                }}
              >
                {showMoreLandscape ? "Show less" : "Show collaboration details"}
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
// SECTION 6: GOVERNANCE & POLICY — Scrollable Card Widget (Handoff v1)
// ============================================================================

const PolicyAlignmentSection = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);

  const categories = [
    { id: "all", label: "All", mobileLabel: "All" },
    { id: "funding", label: "Direct Funding", mobileLabel: "Funding" },
    { id: "regulatory", label: "Regulatory", mobileLabel: "Regulatory" },
    { id: "infrastructure", label: "Infrastructure", mobileLabel: "Infra" },
    { id: "partnerships", label: "Partnerships", mobileLabel: "Partners" },
  ];

  const catBadge = {
    funding: { bg: "rgba(184,217,53,0.15)", border: "rgba(184,217,53,0.3)" },
    regulatory: { bg: "rgba(27,77,62,0.07)", border: "rgba(27,77,62,0.15)" },
    infrastructure: { bg: "rgba(184,217,53,0.1)", border: "rgba(184,217,53,0.25)" },
    partnerships: { bg: "rgba(27,77,62,0.05)", border: "rgba(27,77,62,0.12)" },
  };

  const policies = [
    {
      policy: "Big Push Infrastructure Programme",
      body: "Ministry of Works, Housing & Water Resources",
      allocation: "$10B commitment",
      category: "funding",
      relevance: ["affordable"],
      alignment:
        "Housing components within the largest infrastructure initiative in Ghana's history, targeting delivery of 250,000 housing units nationwide.",
      bridgeRole:
        "BRIDGE provides construction oversight, contractor verification, and quality assurance services for housing delivery within the programme.",
      bridgeVentures: ["Construction Oversight Platform", "Contractor Verification System"],
      pillars: ["Housing delivery", "Urban planning"],
    },
    {
      policy: "National Housing & Mortgage Fund",
      body: "SSNIT & MoF",
      allocation: "GH₵1B target",
      category: "funding",
      relevance: ["affordable"],
      alignment:
        "Dedicated fund channeling pension and public capital into affordable housing development and expanding mortgage product accessibility.",
      bridgeRole:
        "BRIDGE housing savings products and cooperative structures create the demand pipeline and borrower readiness for NHMF mortgage disbursement.",
      bridgeVentures: ["Housing Savings Products", "Housing Cooperative Structure"],
      pillars: ["Mortgage access", "Savings mobilization"],
    },
    {
      policy: "Low-Cost Housing for Public Workers",
      body: "Office of the President",
      allocation: "Salary deduction model",
      category: "funding",
      relevance: ["affordable"],
      alignment:
        "Government-backed affordable housing for public sector employees through payroll-linked financing and standardized unit development.",
      bridgeRole:
        "BRIDGE construction oversight and contractor verification ensure quality delivery and cost control for public worker housing projects.",
      bridgeVentures: ["Construction Oversight Platform", "Property Management Service"],
      pillars: ["Public housing", "Payroll financing"],
    },
    {
      policy: "Real Estate Agency Act 2020",
      body: "Lands Commission",
      allocation: "Regulatory framework",
      category: "regulatory",
      relevance: ["commercial"],
      alignment:
        "Comprehensive regulatory framework establishing professional standards in real estate, including licensing for agents and developers.",
      bridgeRole:
        "BRIDGE contractor verification and property management services support licensing implementation and professional standards compliance.",
      bridgeVentures: ["Contractor Verification System", "Property Management Service"],
      pillars: ["Professional standards", "Licensing"],
    },
    {
      policy: "Rent Control Bill",
      body: "Parliament of Ghana",
      allocation: "Legislative reform",
      category: "regulatory",
      relevance: ["affordable"],
      alignment:
        "Landmark legislation limiting rent advances to one year and establishing tenant rights protections across the entire rental market.",
      bridgeRole:
        "BRIDGE rental guarantee products directly enable compliance with 1-year advance limits while protecting landlord revenue.",
      bridgeVentures: ["Rental Guarantee Products", "Tenant Services Platform"],
      pillars: ["Rent reform", "Consumer protection"],
    },
    {
      policy: "Building Code & Permit Reform",
      body: "Ministry of Works & Housing",
      allocation: "Regulatory overhaul",
      category: "regulatory",
      relevance: ["affordable", "commercial"],
      alignment:
        "Modernization of building codes and permit processes to reduce approval timelines and improve construction quality standards nationally.",
      bridgeRole:
        "BRIDGE contractor certification aligns skilled artisans with updated building standards, creating a verified workforce for compliant construction.",
      bridgeVentures: ["Construction Skills Certification", "Contractor Verification System"],
      pillars: ["Building standards", "Permit reform"],
    },
    {
      policy: "Lands Commission Digitization",
      body: "Lands Commission & World Bank",
      allocation: "$85M project",
      category: "infrastructure",
      relevance: ["affordable", "commercial"],
      alignment:
        "Multi-year project to digitize land records across Ghana, creating digital infrastructure for the 98% of properties without title.",
      bridgeRole:
        "BRIDGE title verification adds a private verification layer complementing government digitization, accelerating trust in property transactions.",
      bridgeVentures: ["Title Verification Platform", "Land Registry Integration"],
      pillars: ["Digital records", "Title security"],
    },
    {
      policy: "National Rental Assistance Scheme",
      body: "Ministry of Works, Housing & Water Resources",
      allocation: "Gov't funded",
      category: "infrastructure",
      relevance: ["affordable"],
      alignment:
        "Government programme building rental market infrastructure with structured advance limits, tenant protections, and subsidy channels.",
      bridgeRole:
        "BRIDGE rent advance financing and rental guarantee products scale the NRAS model through private sector channels, reaching 19M renters.",
      bridgeVentures: ["Rental Guarantee Products", "Rent Advance Financing"],
      pillars: ["Rental reform", "Tenant protection"],
    },
    {
      policy: "Affordable Housing REITs Framework",
      body: "Securities & Exchange Commission",
      allocation: "Capital market reform",
      category: "infrastructure",
      relevance: ["commercial"],
      alignment:
        "Regulatory framework enabling Real Estate Investment Trusts focused on affordable housing, unlocking institutional capital for residential development.",
      bridgeRole:
        "BRIDGE property management and title verification services create the transparent asset base required for REIT qualification and investor confidence.",
      bridgeVentures: ["Property Management Service", "Title Verification Platform"],
      pillars: ["Capital markets", "Institutional investment"],
    },
    {
      policy: "IFC Her Home Initiative",
      body: "International Finance Corporation",
      allocation: "$2B global target",
      category: "partnerships",
      relevance: ["affordable"],
      alignment:
        "IFC initiative specifically targeting women's access to housing through mortgage support, title assistance, and savings programmes.",
      bridgeRole:
        "BRIDGE title verification and housing savings products advance women's housing access with gender-responsive design integrated from inception.",
      bridgeVentures: ["Title Verification Platform", "Housing Savings Products"],
      pillars: ["Gender equity", "Housing access"],
    },
    {
      policy: "World Bank Land Administration Project",
      body: "World Bank & Lands Commission",
      allocation: "$100M+ cumulative",
      category: "partnerships",
      relevance: ["affordable", "commercial"],
      alignment:
        "Long-running partnership modernizing Ghana's land governance through systematic titling, boundary mapping, and institutional reform.",
      bridgeRole:
        "BRIDGE title verification platform integrates with LAP digitization outputs, extending verified land data to private sector users at scale.",
      bridgeVentures: ["Title Verification Platform", "Land Registry Integration"],
      pillars: ["Land governance", "Institutional reform"],
    },
    {
      policy: "UN-Habitat Ghana Programme",
      body: "UN-Habitat & MWRWH",
      allocation: "Technical assistance",
      category: "partnerships",
      relevance: ["affordable"],
      alignment:
        "United Nations programme providing technical support for slum upgrading, urban planning, and inclusive housing policy development across Ghana.",
      bridgeRole:
        "BRIDGE cooperative housing models and tenant services complement UN-Habitat community upgrading with market-based solutions for residents.",
      bridgeVentures: ["Housing Cooperative Structure", "Tenant Services Platform"],
      pillars: ["Urban upgrading", "Community development"],
    },
  ];

  const filtered = activeCategory === "all" ? policies : policies.filter((p) => p.category === activeCategory);
  const [policyScrollIndex, setPolicyScrollIndex] = React.useState(0);
  const policyScrollRef = React.useRef(null);

  const handlePolicyScroll = () => {
    if (!policyScrollRef.current) return;
    const el = policyScrollRef.current;
    const cardWidth = isMobile ? el.offsetWidth * 0.88 : 336;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setPolicyScrollIndex(idx);
  };

  const scrollToPolicy = (idx) => {
    if (!policyScrollRef.current) return;
    const el = policyScrollRef.current;
    const cardWidth = isMobile ? el.offsetWidth * 0.88 : 336;
    el.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
    setPolicyScrollIndex(idx);
  };

  return (
    <section style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH, textAlign: isMobile ? "left" : "center" }}>
        <span
          className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
          style={{
            backgroundColor: colors.white,
            border: `1px solid ${colors.line}`,
            color: colors.primary,
            padding: "10px 20px",
          }}
        >
          The Governance & Policy
        </span>
        <h2
          className="font-[Inter,sans-serif] font-light tracking-[-0.5px] leading-[1.2] max-w-[900px]"
          style={{
            fontSize: isMobile ? "28px" : "42px",
            color: colors.primary,
            margin: isMobile ? "0 0 20px" : "0 auto 20px",
          }}
        >
          Moving in Step with Ghana's <span className="font-semibold" style={{ color: colors.accent }}>Housing Agenda</span>
        </h2>
        <p
          className="font-[Inter,sans-serif] text-[16px] text-[#666] leading-[1.65] max-w-[750px]"
          style={{ margin: isMobile ? "0 0 32px" : "0 auto 32px" }}
        >
          BRIDGE housing ventures align directly with current government priorities — from the Big Push Programme to the
          Rent Control Bill — creating pathways for public-private collaboration.
        </p>

        {/* Category Filter */}
        {isMobile ? (
          <div
            className="inline-flex items-center gap-[2px] rounded-full p-1 mb-6"
            style={{ border: `1px solid ${colors.line}` }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setExpandedCard(null);
                  setPolicyScrollIndex(0);
                }}
                className="rounded-full bg-transparent font-[Inter,sans-serif] text-[11px] cursor-pointer"
                style={{
                  padding: "5px 12px",
                  border: activeCategory === cat.id ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                  color: activeCategory === cat.id ? colors.primary : "#999",
                  fontWeight: activeCategory === cat.id ? "700" : "500",
                }}
              >
                {cat.mobileLabel}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex gap-2 mb-6 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setExpandedCard(null);
                  setPolicyScrollIndex(0);
                }}
                className="rounded-full font-[Inter,sans-serif] text-[12px] cursor-pointer"
                style={{
                  padding: "6px 16px",
                  border: activeCategory === cat.id ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                  backgroundColor: activeCategory === cat.id ? colors.accentLight : "transparent",
                  color: activeCategory === cat.id ? colors.primary : "#999",
                  fontWeight: activeCategory === cat.id ? "700" : "500",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Card Row — horizontal scroll */}
        <div
          ref={policyScrollRef}
          onScroll={handlePolicyScroll}
          className="flex items-start"
          style={{
            gap: "16px",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
            margin: isMobile ? "0 -20px" : "0",
            padding: isMobile ? "0 20px 4px" : "0 0 4px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {filtered.map((p, i) => {
            const isExpanded = expandedCard === i;
            const badge = catBadge[p.category];
            return (
              <div
                key={i}
                onClick={() => setExpandedCard(isExpanded ? null : i)}
                className="rounded-[16px] cursor-pointer shrink-0 flex flex-col text-left transition-all duration-300 ease-in-out"
                style={{
                  minWidth: isMobile ? "calc(88%)" : isExpanded ? "420px" : "320px",
                  maxWidth: isMobile ? "calc(88%)" : isExpanded ? "420px" : "320px",
                  backgroundColor: colors.background,
                  border: isExpanded ? `2px solid ${colors.accent}` : `2px solid ${colors.primary}`,
                  padding: "24px",
                  scrollSnapAlign: "start",
                }}
              >
                {/* Top: Badge + Relevance */}
                <div className="flex justify-between items-center mb-3">
                  <span
                    className="text-[9px] font-bold uppercase tracking-[1px] font-[Inter,sans-serif] rounded-[6px]"
                    style={{
                      color: colors.primary,
                      padding: "4px 10px",
                      backgroundColor: badge.bg,
                      border: `1px solid ${badge.border}`,
                    }}
                  >
                    {p.category}
                  </span>
                  <div className="flex gap-1">
                    {(p.relevance || []).map((r) => (
                      <span
                        key={r}
                        className="text-[9px] font-semibold font-[Inter,sans-serif] rounded"
                        style={{
                          color: colors.primary,
                          padding: "3px 8px",
                          backgroundColor: "rgba(27,77,62,0.06)",
                        }}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Policy Name */}
                <div
                  className="font-[Inter,sans-serif] text-[16px] font-bold min-h-[42px] mb-2"
                  style={{ color: colors.primary }}
                >
                  {p.policy}
                </div>

                {/* Allocation */}
                <div
                  className="font-[Inter,sans-serif] text-[13px] font-bold mb-[10px]"
                  style={{ color: colors.accent }}
                >
                  {p.allocation}
                </div>

                {/* Alignment */}
                <div
                  className="font-[Inter,sans-serif] text-[13px] text-[#666] leading-[1.5] mb-3"
                  style={{ minHeight: isExpanded ? "auto" : "80px" }}
                >
                  {isExpanded
                    ? p.alignment
                    : p.alignment.length > 140
                      ? p.alignment.substring(0, 137) + "..."
                      : p.alignment}
                </div>

                {/* Expand Hint */}
                <div className="flex items-center gap-[6px] mt-auto">
                  <span
                    className="font-[Inter,sans-serif] text-[11px] font-semibold opacity-60"
                    style={{ color: colors.primary }}
                  >
                    {isExpanded ? "Collapse" : "BRIDGE alignment"}
                  </span>
                  <ChevronDown size={12} strokeWidth={2} color={colors.primary} style={{
                      transform: isExpanded ? "rotate(180deg)" : "none",
                      opacity: 0.6,
                      transition: "transform 0.3s ease",
                    }} />
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${colors.line}` }}>
                    <div className="font-[Inter,sans-serif] text-[11px] text-[#888] mb-2">
                      {p.body}
                    </div>
                    <div className="font-[Inter,sans-serif] text-[13px] text-[#444] leading-[1.6] mb-3">
                      {p.bridgeRole}
                    </div>
                    {p.pillars && (
                      <div className="flex gap-[6px] flex-wrap mb-[14px]">
                        {p.pillars.map((pill) => (
                          <span
                            key={pill}
                            className="text-[10px] font-semibold rounded-[6px] font-[Inter,sans-serif]"
                            style={{
                              color: colors.accent,
                              padding: "4px 10px",
                              backgroundColor: "rgba(184,217,53,0.1)",
                            }}
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2 flex-wrap">
                      {p.bridgeVentures.map((v) => (
                        <span
                          key={v}
                          className="inline-flex items-center gap-[6px] rounded-lg font-[Inter,sans-serif] text-[11px] font-semibold"
                          style={{
                            padding: "8px 12px",
                            backgroundColor: colors.primary,
                            color: colors.white,
                          }}
                        >
                          <span
                            className="w-[6px] h-[6px] rounded-full shrink-0"
                            style={{ backgroundColor: colors.accent }}
                          />
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Scroll Indicator Dots */}
        <div className="flex justify-center items-center gap-2 mt-5 mb-12">
          {filtered.map((_, i) => (
            <div
              key={i}
              onClick={() => scrollToPolicy(i)}
              className="h-2 rounded cursor-pointer transition-all duration-300 ease-in-out"
              style={{
                width: policyScrollIndex === i ? "24px" : "8px",
                backgroundColor: policyScrollIndex === i ? colors.accent : colors.line,
              }}
            />
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div
          className="rounded-[16px] flex gap-4 text-left"
          style={{
            backgroundColor: colors.primary,
            padding: isMobile ? "20px 24px" : "28px 32px",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: isMobile ? "flex-start" : "space-between",
            alignItems: isMobile ? "flex-start" : "center",
          }}
        >
          <div>
            <div
              className="font-['DM_Sans',sans-serif] font-semibold text-white"
              style={{ fontSize: isMobile ? "16px" : "18px" }}
            >
              BRIDGE complements — never competes with — government vision.
            </div>
            <div
              className="font-['DM_Sans',sans-serif] text-[rgba(255,255,255,0.6)] mt-1"
              style={{ fontSize: isMobile ? "13px" : "14px" }}
            >
              Every venture aligns with at least one active government policy or initiative.
            </div>
          </div>
          <a
            href="/contact"
            onClick={(e) => { e.preventDefault(); navigate("/contact"); }}
            className="font-['DM_Sans',sans-serif] text-[13px] font-bold rounded-full no-underline whitespace-nowrap text-center"
            style={{
              color: colors.primary,
              backgroundColor: colors.accent,
              padding: "12px 24px",
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
// SECTION 7: RIPPLE EFFECT / CROSS-SECTOR — Interactive Icon Pathway (Handoff v1)
// ============================================================================

const CrossSectorSection = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [activeNode, setActiveNode] = useState(null);
  const [showMoreRipple, setShowMoreRipple] = useState(false);

  const SECTOR_ROUTES: Record<string, string> = {
    "Financial Inclusion": "/sectors/financial",
    "Infrastructure & Basic Services": "/sectors/infrastructure",
    "Infrastructure": "/sectors/infrastructure",
    "Education & Skills": "/sectors/education",
    "Technology & Innovation": "/sectors/technology",
    "Technology": "/sectors/technology",
    "Energy": "/sectors/energy",
    "Agriculture": "/sectors/agriculture",
    "Manufacturing": "/sectors/manufacturing",
    "Transportation": "/sectors/transport",
    "Housing & Real Estate": "/sectors/housing",
    "Tourism & Hospitality": "/sectors/tourism",
    "Creative Industries": "/sectors/sports",
    "Health Systems": "/sectors/health",
  };

  const crossSectorIcons = {
  8: <IconHome />,
  2: <IconWallet />,
  1: <IconBuilding />,
  5: <IconGraduation />,
  4: <Cpu size={20} strokeWidth={1.5} />,
  10: <BatteryCharging size={20} strokeWidth={1.5} />,
};

  const crossSectorShortNames = ["Financial", "Infra", "Education", "Tech", "Energy"];
  const crossSectorDesktopNames = ["Financial", "Infrastructure", "Education", "Technology", "Energy"];

  const pathways = [
    {
      sectorId: 2,
      name: "Financial Inclusion",
      connection: "Housing finance bridges shelter needs and financial systems — mortgages, savings, insurance.",
      multiplier: "3.8x",
      synergies: [
        "Alternative income verification expanding mortgage eligibility",
        "Construction milestone escrow protecting buyer capital",
        "Housing savings products building credit history and down payments",
      ],
      bridgeVentures: ["Rental Guarantee Products", "Housing Savings Products"],
      impact:
        "Enables housing finance access through trust infrastructure and alternative credit pathways, unlocking mortgage markets for millions.",
      pathLabel: "Housing → Mortgage Facilitation → Financial Access",
    },
    {
      sectorId: 1,
      name: "Infrastructure & Basic Services",
      connection: "Housing quality depends on water, sanitation, power, and road access infrastructure.",
      multiplier: "2.5x",
      synergies: [
        "WASH integration standards in new housing developments",
        "Streamlined utility connections reducing occupancy delays",
        "Smart grid integration for energy-efficient communities",
      ],
      bridgeVentures: ["Construction Oversight Platform", "Title Verification Platform"],
      impact:
        "Every housing development requires and stimulates infrastructure investment, creating compounding returns for both sectors.",
      pathLabel: "Housing → Utility Demand → Infrastructure Growth",
    },
    {
      sectorId: 5,
      name: "Education & Skills",
      connection: "Construction quality requires trained, certified professionals at every stage.",
      multiplier: "2.1x",
      synergies: [
        "TVET construction training pathways for artisans",
        "Artisan certification enabling premium pricing",
        "Financial literacy for mortgage readiness and savings",
      ],
      bridgeVentures: ["Construction Skills Certification", "Artisan Cooperative Platform"],
      impact:
        "Housing sector demand drives construction skills training, creating certified workforce pathways and higher-wage employment.",
      pathLabel: "Housing → Skills Demand → Workforce Development",
    },
    {
      sectorId: 4,
      name: "Technology & Innovation",
      connection: "PropTech platforms enable digital land records, construction monitoring, and tenant services.",
      multiplier: "4.2x",
      synergies: [
        "Blockchain-backed title verification and transfer",
        "Construction progress monitoring via satellite/drone imagery",
        "Digital rental platforms with escrow and dispute resolution",
      ],
      bridgeVentures: ["Title Verification Platform", "Tenant Services Platform"],
      impact:
        "Housing sector creates demand for PropTech innovation, driving digital transformation across the construction and property value chain.",
      pathLabel: "Housing → Digital Platforms → PropTech Growth",
    },
    {
      sectorId: 10,
      name: "Energy & Renewables",
      connection: "Housing developments drive demand for distributed energy, solar, and clean cooking solutions.",
      multiplier: "1.9x",
      synergies: [
        "Solar-integrated housing design standards",
        "Community energy systems in housing cooperatives",
        "Clean cooking infrastructure in new developments",
      ],
      bridgeVentures: ["Housing Cooperative Structure", "Affordable Housing Development"],
      impact:
        "New housing stock creates deployment opportunity for clean energy at scale, reducing emissions while lowering household energy costs.",
      pathLabel: "Housing → Energy Demand → Clean Power Adoption",
    },
  ];

  const active = activeNode !== null ? pathways[activeNode] : null;

  return (
    <section style={{ backgroundColor: colors.primary, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Header */}
        <div className="text-center" style={{ marginBottom: isMobile ? "32px" : "48px" }}>
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: colors.accent,
              padding: "10px 20px",
            }}
          >
            The Ripple Effect
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light tracking-[-0.5px] leading-[1.2] max-w-[820px] mx-auto"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.white,
              margin: "0 auto 20px",
            }}
          >
            How Housing <span className="font-semibold" style={{ color: colors.accent }}>Amplifies Impact</span>
          </h2>
          <p className="font-[Inter,sans-serif] text-[16px] text-[rgba(255,255,255,0.6)] leading-[1.65] max-w-[680px] mx-auto m-0">
            Every housing venture creates compounding value across BRIDGE's integrated sectors. Select a sector to
            explore how one investment becomes many.
          </p>
        </div>

        {/* Icon Pathway */}
        {isMobile ? (
          <div className="mb-6">
            {/* Hub Icon */}
            <div className="flex justify-center mb-4">
              <div className="flex flex-col items-center">
                <div
                  className="w-14 h-14 rounded-[14px] flex items-center justify-center mb-2 shadow-[0_0_24px_rgba(184,217,53,0.3)]"
                  style={{ backgroundColor: colors.accent, color: colors.primary }}
                >
                  <IconHome />
                </div>
                <span
                  className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[0.5px]"
                  style={{ color: colors.accent }}
                >
                  HOUSING
                </span>
              </div>
            </div>
            {/* 5 Sector Icons */}
            <div className="flex justify-center gap-3">
              {pathways.map((p, idx) => {
                const isActive = activeNode === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setActiveNode(isActive ? null : idx);
                      setShowMoreRipple(false);
                    }}
                    className="flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out"
                    style={{ opacity: activeNode !== null && !isActive ? 0.4 : 1 }}
                  >
                    <div
                      className="w-11 h-11 rounded-[12px] flex items-center justify-center mb-[6px] transition-all duration-300 ease-in-out"
                      style={{
                        backgroundColor: isActive ? colors.accent : "rgba(255,255,255,0.08)",
                        border: isActive ? "none" : "1px solid rgba(255,255,255,0.1)",
                        color: isActive ? colors.primary : "rgba(255,255,255,0.6)",
                      }}
                    >
                      {crossSectorIcons[p.sectorId]}
                    </div>
                    <span
                      className="font-[Inter,sans-serif] text-[10px] font-semibold max-w-[58px] leading-[1.2] text-center"
                      style={{ color: isActive ? colors.white : "rgba(255,255,255,0.5)" }}
                    >
                      {crossSectorShortNames[idx]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex items-start justify-center gap-8 mb-12">
            {/* Hub */}
            <div className="w-[120px] flex flex-col items-center shrink-0">
              <div
                className="w-20 h-20 rounded-[20px] flex items-center justify-center shadow-[0_0_30px_rgba(184,217,53,0.3)] mb-[10px]"
                style={{ backgroundColor: colors.accent, color: colors.primary }}
              >
                <IconHome />
              </div>
            </div>
            {/* 5 Nodes */}
            {pathways.map((p, idx) => {
              const isActive = activeNode === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveNode(isActive ? null : idx)}
                  className="w-[120px] flex flex-col items-center cursor-pointer transition-all duration-300 ease-in-out"
                  style={{ opacity: activeNode !== null && !isActive ? 0.4 : 1 }}
                >
                  <div
                    className="w-14 h-14 rounded-[16px] flex items-center justify-center mb-[10px] transition-all duration-300 ease-in-out"
                    style={{
                      backgroundColor: isActive ? colors.accent : "rgba(255,255,255,0.08)",
                      border: isActive ? "none" : "1px solid rgba(255,255,255,0.1)",
                      color: isActive ? colors.primary : "rgba(255,255,255,0.6)",
                    }}
                  >
                    {crossSectorIcons[p.sectorId]}
                  </div>
                  <span
                    className="font-[Inter,sans-serif] text-[13px] font-semibold text-center whitespace-nowrap"
                    style={{ color: isActive ? colors.white : "rgba(255,255,255,0.5)" }}
                  >
                    {crossSectorDesktopNames[idx]}
                  </span>
                  <span
                    className="font-[Poppins,sans-serif] text-[20px] font-bold mt-1"
                    style={{ color: isActive ? colors.accent : "rgba(255,255,255,0.3)" }}
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
          className="transition-all duration-300 ease-in-out"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: isMobile ? "16px" : "24px",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: isMobile ? "24px" : "40px",
            minHeight: isMobile ? "auto" : "280px",
          }}
        >
          {active === null ? (
            isMobile ? (
              <div className="text-center py-5">
                <p className="font-[Inter,sans-serif] text-[15px] text-[rgba(255,255,255,0.5)]">
                  Tap a sector above to explore how housing amplifies its impact
                </p>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span
                    className="font-[Inter,sans-serif] text-[16px] font-semibold"
                    style={{ color: colors.white }}
                  >
                    Cross-Sector Integration Opportunities
                  </span>
                  <span className="font-[Inter,sans-serif] text-[13px] text-[rgba(255,255,255,0.4)]">
                    Click a sector above to explore
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {pathways.map((p, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveNode(idx)}
                      className="rounded-[16px] cursor-pointer"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.05)",
                        padding: "24px 20px",
                      }}
                    >
                      <div
                        className="font-[Inter,sans-serif] text-[14px] font-semibold mb-2"
                        style={{ color: colors.white }}
                      >
                        {p.name}
                      </div>
                      <div
                        className="font-[Inter,sans-serif] text-[13px] text-[rgba(255,255,255,0.45)] leading-[1.45] h-[38px] overflow-hidden"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {p.connection}
                      </div>
                      <div className="mt-3">
                        <span
                          className="font-[Poppins,sans-serif] text-[18px] font-bold"
                          style={{ color: colors.accent }}
                        >
                          {p.multiplier}
                        </span>
                        <span className="font-[Inter,sans-serif] text-[11px] text-[rgba(255,255,255,0.4)] ml-[6px]">
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
                {active.pathLabel.split(" → ").map((seg, idx, arr) => (
                  <React.Fragment key={idx}>
                    <span
                      className="font-[Inter,sans-serif] text-[13px] rounded-full"
                      style={{
                        fontWeight: idx === 0 ? "700" : "500",
                        color: idx === 0 ? colors.accent : "rgba(255,255,255,0.7)",
                        backgroundColor: idx === 0 ? "rgba(184, 217, 53, 0.15)" : "rgba(255,255,255,0.05)",
                        padding: "6px 14px",
                      }}
                    >
                      {seg}
                    </span>
                    {idx < arr.length - 1 && <span className="text-[14px]" style={{ color: colors.accent }}>→</span>}
                  </React.Fragment>
                ))}
              </div>

              {/* 3-Column Grid */}
              <div
                className="grid"
                style={{
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                  gap: isMobile ? "24px" : "32px",
                }}
              >
                {/* Col 1: Why It Matters */}
                <div>
                  <h4
                    className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1px] mb-4"
                    style={{ color: colors.accent }}
                  >
                    Why It Matters
                  </h4>
                  <p className="font-[Inter,sans-serif] text-[15px] text-[rgba(255,255,255,0.7)] leading-[1.6] mb-5">
                    {active.impact}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-[Poppins,sans-serif] text-[32px] font-bold"
                      style={{ color: colors.accent }}
                    >
                      {active.multiplier}
                    </span>
                    <span className="font-[Inter,sans-serif] text-[13px] text-[rgba(255,255,255,0.4)]">
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
                      {active.synergies.map((s, idx) => (
                        <div
                          key={idx}
                          className="flex gap-3 rounded-[10px]"
                          style={{
                            padding: "12px 16px",
                            backgroundColor: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <span className="text-[8px] mt-1" style={{ color: colors.accent }}>●</span>
                          <span className="font-[Inter,sans-serif] text-[14px] text-[rgba(255,255,255,0.75)]">
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
                      {active.bridgeVentures.map((v, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center rounded-[12px]"
                          style={{
                            padding: "14px 18px",
                            backgroundColor: "rgba(184, 217, 53, 0.1)",
                            border: "1px solid rgba(184, 217, 53, 0.15)",
                          }}
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
                      href={SECTOR_ROUTES[active.name] || "/sectors"}
                      onClick={(e) => { e.preventDefault(); navigate(SECTOR_ROUTES[active.name] || "/sectors"); }}
                      className="inline-flex items-center gap-2 mt-5 font-[Inter,sans-serif] text-[14px] font-semibold no-underline"
                      style={{ color: colors.accent }}
                    >
                      Explore {active.name} Sector <span>→</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile toggle */}
              {isMobile && (
                <button
                  onClick={() => setShowMoreRipple(!showMoreRipple)}
                  className="w-full bg-transparent rounded-[12px] font-[Inter,sans-serif] text-[14px] font-semibold cursor-pointer mt-4 flex items-center justify-center gap-2"
                  style={{
                    padding: "14px",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: colors.white,
                  }}
                >
                  {showMoreRipple ? "Show less" : "Show more details"}
                  <ChevronDown size={14} strokeWidth={2} color="white" style={{ transform: showMoreRipple ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }} />
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
// SECTION 8: INVESTMENT THESIS — Production Spec (Responsive)
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
        label: "Portfolio IRR",
        value: "12-20%",
        tag: "Target Range",
        detail:
          "Blended target returns across 19 housing trust infrastructure ventures with phased capital deployment.",
      },
      {
        label: "Tier 1 Returns",
        value: "15-22%",
        tag: "High Priority",
        detail:
          "Priority ventures with immediate demand, rapid revenue generation, and proven market validation paths.",
      },
      {
        label: "Tier 2 Returns",
        value: "10-15%",
        tag: "Strategic",
        detail:
          "Construction oversight and property management platforms with longer build-out and strong recurring revenue.",
      },
      {
        label: "Dev. Leverage",
        value: "3-5x",
        tag: "Multiplier",
        detail:
          "Every dollar deployed generates $3-5 in local housing market activity through economic multiplier effects.",
      },
    ],
    timeline: [
      {
        label: "Foundation",
        value: "Q1-Q2",
        tag: "Phase 1",
        detail:
          "Title verification platform launch, contractor vetting system, and rental guarantee pilot in Greater Accra.",
      },
      {
        label: "Scale",
        value: "Q3-Q4",
        tag: "Phase 2",
        detail:
          "Construction oversight expansion, property management rollout, and workforce certification programme launch.",
      },
      {
        label: "Expansion",
        value: "2027+",
        tag: "Phase 3",
        detail:
          "Cooperative housing structures, affordable development financing, and replication into secondary markets.",
      },
      {
        label: "First Cash",
        value: "18-24mo",
        tag: "Near-Term",
        detail:
          "Timeline to first revenue milestone from title verification and rental guarantee product platform launch.",
      },
    ],
    impact: [
      {
        label: "Families Served",
        value: "50K+",
        tag: "Direct",
        detail:
          "Direct household beneficiaries of improved land security, rental protection, and affordable housing access.",
      },
      {
        label: "Jobs Created",
        value: "1,200+",
        tag: "Employment",
        detail:
          "Direct employment across construction oversight, verification, property management, and certification roles.",
      },
      {
        label: "Renters Protected",
        value: "19M",
        tag: "Addressable",
        detail:
          "Total addressable population for rental guarantee and tenant services platforms across all regions of Ghana.",
      },
      {
        label: "Capital Deployed",
        value: "$26-48M",
        tag: "Phased",
        detail:
          "Total investment opportunity across three deployment tiers with staged capital call schedules planned.",
      },
    ],
  };

  const audiences = [
    {
      key: "entrepreneur",
      label: "Entrepreneur",
      shortLabel: "Founder",
      icon: <IconStorefront />,
      headline: "Build the Trust Layer for Ghana's Housing Market",
      pitch:
        "BRIDGE provides validated venture models, title verification frameworks, and rental market strategies so you can launch housing businesses with de-risked entry and clear paths to revenue.",
      stats: [
        { value: "19", label: "Venture Paths", detail: "validated models" },
        { value: "19M", label: "Market Access", detail: "renters to serve" },
        { value: "Full", label: "BRIDGE Support", detail: "incubation to scale" },
      ],
      pathways: [
        {
          bring: "Local knowledge & community trust",
          get: "Venture blueprints, title verification tech, and go/no-go decision frameworks",
        },
        {
          bring: "Construction expertise & networks",
          get: "Institutional buyers, government partnerships, and working capital strategies",
        },
        {
          bring: "Execution commitment & accountability",
          get: "Technical assistance, quality monitoring, and scale-up support to Phase 3",
        },
      ],
    },
    {
      key: "business",
      label: "Business Entity",
      shortLabel: "Business",
      icon: <IconOfficeBuilding />,
      headline: "Anchor Your Real Estate Operations in Quality",
      pitch:
        "Partner with BRIDGE to access verified properties, certified contractors, and professional management services — strengthening your portfolio while improving housing outcomes across Ghana.",
      stats: [
        { value: "$26-48M", label: "Capital Range", detail: "across 19 ventures" },
        { value: "8-12%", label: "Cash Yield", detail: "annual distribution" },
        { value: "1.8M", label: "Addressable", detail: "housing gap" },
      ],
      pathways: [
        {
          bring: "Development capital & land access",
          get: "Priority access to verified titles and pre-certified contractor networks",
        },
        {
          bring: "Construction management expertise",
          get: "Co-development in affordable housing and rental infrastructure projects",
        },
        {
          bring: "Corporate housing procurement",
          get: "Impact reporting, ESG metrics, and community engagement documentation",
        },
      ],
    },
    {
      key: "investor",
      label: "Investor",
      shortLabel: "Investor",
      icon: <IconTrendingUp />,
      headline: "Trust Infrastructure With Impact Returns",
      pitch:
        "Deploy capital into housing trust systems with transparent governance, recurring revenue, and measurable outcomes — backed by government housing reform and massive unmet national demand.",
      stats: [
        { value: "12-20%", label: "Target IRR", detail: "blended portfolio" },
        { value: "2.5x", label: "Multiple", detail: "capital appreciation" },
        { value: "18-24mo", label: "First Cash", detail: "revenue timeline" },
      ],
      pathways: [
        {
          bring: "Growth capital & patient deployment",
          get: "Platform-backed returns with verification assets and clear exit paths",
        },
        {
          bring: "Real estate sector expertise",
          get: "Board participation, portfolio oversight, and co-investment opportunities",
        },
        {
          bring: "Network access & deal flow",
          get: "First-look rights on expansion ventures and regional replication deals",
        },
      ],
    },
    {
      key: "government",
      label: "Government",
      shortLabel: "Gov't",
      icon: <IconLandmark />,
      headline: "Deliver Housing Reform Without Fiscal Strain",
      pitch:
        "BRIDGE ventures align directly with the Big Push Programme and Rent Control Bill — delivering title security, rental reform, and construction quality improvement through private capital.",
      stats: [
        { value: "1,200+", label: "Jobs Created", detail: "direct employment" },
        { value: "98%", label: "Title Gap", detail: "to formalize" },
        { value: "3-5x", label: "Tax Multiplier", detail: "economic activity" },
      ],
      pathways: [
        {
          bring: "Policy alignment & regulatory support",
          get: "Private housing delivery meeting Big Push and Rent Control objectives",
        },
        {
          bring: "Land access & permitting facilitation",
          get: "Job creation, tax revenue expansion, and improved housing quality data",
        },
        {
          bring: "Community endorsement & legitimacy",
          get: "Transparent reporting on housing outcomes and constituency impact data",
        },
      ],
    },
  ];

  const activeAudienceData = audiences[activeAudience];

  return (
    <section style={{ backgroundColor: colors.background, padding: isMobile ? "60px 0" : "100px 80px" }}>
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Header */}
        <div
          style={{
            marginBottom: isMobile ? "32px" : "48px",
            padding: isMobile ? "0 20px" : 0,
            textAlign: isMobile ? "center" : "left",
          }}
        >
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
              padding: "10px 20px",
            }}
          >
            The Investment Thesis
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
              margin: "0 0 16px",
              maxWidth: isMobile ? "none" : "820px",
            }}
          >
            Every Stakeholder Has a Role in{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>Building Ghana's Housing Future</span>
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
                  className="flex flex-col items-center gap-[6px] bg-none border-none p-2 cursor-pointer"
                  style={{ opacity: isActive ? 1 : 0.4 }}
                >
                  <div
                    className="w-11 h-11 rounded-[12px] flex items-center justify-center"
                    style={{
                      backgroundColor: isActive ? colors.accentLight : colors.background,
                      border: isActive ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                      color: colors.primary,
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
                  className="flex items-center gap-2 rounded-full font-[Inter,sans-serif] text-[12px] cursor-pointer shrink-0"
                  style={{
                    padding: "6px 16px",
                    border: isActive ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                    backgroundColor: isActive ? colors.accentLight : "transparent",
                    color: isActive ? colors.primary : "#999",
                    fontWeight: isActive ? "700" : "500",
                  }}
                >
                  <span className="flex" style={{ color: isActive ? colors.primary : "#999" }}>{aud.icon}</span>
                  {aud.label}
                </button>
              );
            })}
          </div>
        )}

        {/* Content Grid */}
        <div
          className="grid items-stretch"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "24px" : "48px",
            padding: isMobile ? "0 20px" : 0,
          }}
        >
          {/* Left Column */}
          <div className="flex flex-col">
            {!isMobile && (
              <h3
                className="font-[Inter,sans-serif] text-[32px] font-light leading-[1.25] tracking-[-0.3px] min-h-[80px] flex items-end"
                style={{ color: colors.primary, margin: "0 0 16px 0" }}
              >
                {activeAudienceData.headline}
              </h3>
            )}
            {!isMobile && (
              <p className="font-[Inter,sans-serif] text-[15px] text-[#555] leading-[1.7] min-h-[100px]" style={{ margin: "0 0 24px 0" }}>
                {activeAudienceData.pitch}
              </p>
            )}

            {/* Stat Cards */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {activeAudienceData.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="rounded-[12px] text-center flex flex-col justify-center"
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
                    className="font-[Inter,sans-serif] font-semibold mb-[2px]"
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
                    padding: "12px 16px",
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
            <div className="rounded-[12px] flex items-center gap-3" style={{ padding: "14px 18px", backgroundColor: "rgba(27, 77, 62, 0.06)" }}>
              <div className="shrink-0 flex" style={{ color: colors.primary }}>
                <IconCheck />
              </div>
              <div className="font-[Inter,sans-serif] text-[13px] text-[#444] leading-[1.5]">
                <strong style={{ color: colors.primary }}>Ministry of Works, Housing & Water Resources</strong> aligned
                with national housing delivery targets
              </div>
            </div>
          </div>

          {/* Right Column: Green Panel */}
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
              <div className="flex rounded-[12px] p-1 mb-5 shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className="flex-1 border-none rounded-[10px] text-[14px] font-[Inter,sans-serif] cursor-pointer transition-all duration-200 ease-in-out"
                    style={{
                      backgroundColor: activeTab === tab.key ? colors.accent : "transparent",
                      color: activeTab === tab.key ? colors.primary : "rgba(255,255,255,0.5)",
                      padding: "12px 20px",
                      fontWeight: activeTab === tab.key ? "700" : "500",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content — bordered row layout */}
              <div className="flex flex-col flex-1 rounded-[16px] overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                {tabContent[activeTab].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center"
                    style={{
                      gap: isMobile ? "14px" : "20px",
                      padding: isMobile ? "16px 18px" : "20px 24px",
                      backgroundColor: "rgba(255,255,255,0.04)",
                      borderTop: idx > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    }}
                  >
                    <div className="shrink-0" style={{ width: isMobile ? "90px" : "120px" }}>
                      <div
                        className="font-[Poppins,sans-serif] font-bold leading-[1.1]"
                        style={{
                          fontSize: isMobile ? "20px" : "24px",
                          color: colors.accent,
                        }}
                      >
                        {item.value}
                      </div>
                      <div className="font-[Inter,sans-serif] text-[8px] font-bold uppercase tracking-[0.5px] text-[rgba(255,255,255,0.35)] mt-1">
                        {item.label}
                      </div>
                    </div>
                    <div
                      className="font-[Inter,sans-serif] text-[rgba(255,255,255,0.6)] leading-[1.55] flex-1"
                      style={{
                        fontSize: isMobile ? "13px" : "14px",
                        borderLeft: "1px solid rgba(255,255,255,0.08)",
                        paddingLeft: isMobile ? "14px" : "20px",
                      }}
                    >
                      {item.detail}
                    </div>
                  </div>
                ))}
              </div>

              {/* Prospectus Bar */}
              <div className="mt-4 rounded-[12px] flex justify-between items-center shrink-0" style={{ padding: "14px 20px", backgroundColor: "rgba(255,255,255,0.05)" }}>
                <span className="font-[Inter,sans-serif] text-[13px] text-[rgba(255,255,255,0.45)]">
                  Full financial model available
                </span>
                <a
                  href="/resources"
                  onClick={(e) => { e.preventDefault(); navigate("/resources"); }}
                  className="font-[Inter,sans-serif] text-[14px] font-bold no-underline inline-flex items-center gap-[6px] shrink-0"
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
              className="flex items-center justify-center gap-2 w-full bg-transparent rounded-[12px] font-[Inter,sans-serif] text-[14px] font-semibold cursor-pointer"
              style={{
                padding: "14px",
                border: `1px solid ${colors.line}`,
                color: colors.primary,
              }}
            >
              View returns, timeline & impact
              <IconChevronDown />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SECTION 9: IMPACT — Dual-Lens Dashboard (Handoff v1)
// ============================================================================

const ImpactSection = () => {
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
  const switchCategory = (idx) => {
    setActiveCategory(idx);
    setAnimate(false);
    setTimeout(() => setAnimate(true), 50);
  };

  const metrics = [
    {
      category: "Economic",
      items: [
        {
          label: "Addressable Housing Gap",
          value: 1.8,
          suffix: "M",
          prefix: "",
          description:
            "Total homes needed to close Ghana's structural housing deficit across all regions and income levels.",
          trend: "Critical",
          ventures: "Affordable Housing · Build-to-Rent",
        },
        {
          label: "Land Title Opportunity",
          value: 98,
          suffix: "%",
          prefix: "",
          description:
            "Properties currently without formal title protection, representing an enormous market for verification.",
          trend: "Capture gap",
          ventures: "Title Verification · Land Registry",
        },
        {
          label: "Rental Market Size",
          value: 19,
          suffix: "M",
          prefix: "",
          description:
            "Citizens in rental housing requiring deposit reform, tenant protections, and advance payment relief.",
          trend: "Growing",
          ventures: "Rental Guarantee · Tenant Services",
        },
        {
          label: "Development Leverage",
          value: 3,
          suffix: "-5x",
          prefix: "",
          description:
            "Every dollar deployed generates $3-5 in local housing activity through economic multiplier effects.",
          trend: "Multiplier",
          ventures: "All Ventures",
        },
      ],
    },
    {
      category: "People",
      items: [
        {
          label: "Families Served",
          value: 50,
          suffix: "K+",
          prefix: "",
          description:
            "Households directly accessing improved land security, rental protections, and housing service platforms.",
          trend: "Target",
          ventures: "Title Verification · Rental Guarantee",
        },
        {
          label: "Jobs Created",
          value: 1200,
          suffix: "+",
          prefix: "",
          description:
            "Direct employment roles across construction oversight, management, verification, and certification.",
          trend: "+18% YoY",
          ventures: "Construction Oversight · Skills Cert",
        },
        {
          label: "Youth Trained",
          value: 5,
          suffix: "K+",
          prefix: "",
          description:
            "Young artisans certified through nationally recognized construction skills training and programmes.",
          trend: "High priority",
          ventures: "Skills Certification · Artisan Co-op",
        },
        {
          label: "Renters Protected",
          value: 19,
          suffix: "M",
          prefix: "",
          description:
            "Addressable population for rental guarantee products and tenant services platforms across all Ghana.",
          trend: "Near-term",
          ventures: "Rental Guarantee · Advance Financing",
        },
      ],
    },
    {
      category: "Returns",
      items: [
        {
          label: "Portfolio IRR",
          value: 12,
          suffix: "-20%",
          prefix: "",
          description:
            "Blended target returns across 19 housing trust infrastructure ventures with phased capital deployment.",
          trend: "Target range",
          ventures: "All Ventures",
        },
        {
          label: "Tier 1 Returns",
          value: 15,
          suffix: "-22%",
          prefix: "",
          description:
            "Priority ventures with immediate demand, rapid revenue generation, and proven market validation paths.",
          trend: "High priority",
          ventures: "Title Verification · Rental Guarantee",
        },
        {
          label: "First Cash",
          value: 18,
          suffix: "-24mo",
          prefix: "",
          description:
            "Timeline to first revenue milestone from title verification and rental guarantee product platform launch.",
          trend: "Near-term",
          ventures: "Title Platform · Guarantee Products",
        },
        {
          label: "Capital Deployed",
          value: 26,
          suffix: "-48M",
          prefix: "$",
          description:
            "Total investment opportunity across three deployment tiers with staged capital call schedules planned.",
          trend: "Phased",
          ventures: "All Ventures",
        },
      ],
    },
  ];

  const stakeholders = [
    {
      title: "The Entrepreneur",
      subtitle: "Homebuyers, developers & landlords",
      outcomes: [
        "Access to verified land records and title authentication services across Ghana",
        "Construction oversight protecting life savings from project abandonment risk",
        "Rental pathways that eliminate multi-year advance payment requirements",
        "Professional certification enabling premium pricing for quality services",
      ],
      stat: "19M",
      statLabel: "Renters to serve",
      highlight: "Trust-first market entry",
    },
    {
      title: "The Institution",
      subtitle: "Banks, cooperatives & associations",
      outcomes: [
        "Reliable property management platforms operating at full institutional scale",
        "Workforce certification ensuring consistent quality across construction projects",
        "Housing savings products creating a pipeline of mortgage-ready borrowers",
        "Corporate housing solutions streamlining employee accommodation processes",
      ],
      stat: "250+",
      statLabel: "Partners projected",
      highlight: "Platform-ready operations",
    },
    {
      title: "The Government",
      subtitle: "Agencies & local assemblies",
      outcomes: [
        "Digital land records complementing Lands Commission digitization programme",
        "Private sector rental assistance that scales the NRAS model nationally",
        "Construction quality data supporting building regulation and enforcement",
        "Housing outcome metrics for constituency reporting and policy planning",
      ],
      stat: "6",
      statLabel: "Policies reinforced",
      highlight: "Fiscal-neutral delivery",
    },
    {
      title: "The Investor",
      subtitle: "Impact & institutional capital",
      outcomes: [
        "Measurable housing outcomes with transparent ESG reporting frameworks",
        "Revenue-generating trust infrastructure with diversified recurring revenue",
        "Portfolio diversification in a high-demand frontier market housing segment",
        "Clear exit pathways through licensing, strategic sales, or recapitalizations",
      ],
      stat: "12-20%",
      statLabel: "Target IRR",
      highlight: "Trust assets + impact",
    },
  ];

  const activeMetrics = metrics[activeCategory];
  const activeS = stakeholders[activeStakeholder];

  return (
    <section style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "80px 32px" }}>
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>
        {/* Header */}
        <span
          className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
          style={{
            backgroundColor: colors.white,
            border: `1px solid ${colors.line}`,
            color: colors.primary,
            padding: "10px 20px",
          }}
        >
          The Impact
        </span>
        <h2
          className="font-[Inter,sans-serif] font-light tracking-[-0.5px] leading-[1.2]"
          style={{
            fontSize: isMobile ? "28px" : "42px",
            color: colors.primary,
            margin: "0 0 12px 0",
          }}
        >
          What Changes When <span className="font-semibold">Housing</span>
          <br />
          <span className="font-semibold">Markets</span>{" "}
          <span className="font-semibold" style={{ color: colors.accent }}>Work</span>
        </h2>
        <p className="font-[Inter,sans-serif] text-[16px] text-[#666] leading-[1.65] max-w-[680px]" style={{ margin: "0 0 40px 0" }}>
          When families access affordable homes, construction creates local jobs, and mortgage systems serve the middle
          class — the ripple effects build wealth, stabilize communities, and drive economic growth across Ghana.
        </p>

        {/* Controls Bar */}
        {isMobile ? (
          <div
            className="inline-flex items-center rounded-full p-1 mb-6"
            style={{ border: `1px solid ${colors.line}` }}
          >
            {/* Shaded toggle group */}
            <div className="inline-flex rounded-full p-[2px]" style={{ backgroundColor: colors.background }}>
              {["metrics", "stakeholder"].map((v) => (
                <button
                  key={v}
                  onClick={() => switchView(v)}
                  className="rounded-full border-none font-[Inter,sans-serif] text-[11px] cursor-pointer"
                  style={{
                    padding: "5px 12px",
                    backgroundColor: view === v ? colors.white : "transparent",
                    fontWeight: view === v ? "700" : "500",
                    color: view === v ? colors.primary : "#999",
                    boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  }}
                >
                  {v === "metrics" ? "Metric" : "Stakeholder"}
                </button>
              ))}
            </div>
            {/* Divider */}
            <div className="w-px h-5 shrink-0 mx-[6px]" style={{ backgroundColor: colors.line }} />
            {/* Sub-filters */}
            {view === "metrics"
              ? metrics.map((m, idx) => (
                  <button
                    key={m.category}
                    onClick={() => switchCategory(idx)}
                    className="rounded-full bg-transparent font-[Inter,sans-serif] text-[11px] cursor-pointer"
                    style={{
                      padding: "5px 10px",
                      border: activeCategory === idx ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                      fontWeight: activeCategory === idx ? "700" : "500",
                      color: activeCategory === idx ? colors.primary : "#999",
                    }}
                  >
                    {m.category}
                  </button>
                ))
              : stakeholders.map((s, idx) => (
                  <button
                    key={s.title}
                    onClick={() => setActiveStakeholder(idx)}
                    className="rounded-full bg-transparent font-[Inter,sans-serif] text-[11px] cursor-pointer"
                    style={{
                      padding: "5px 10px",
                      border: activeStakeholder === idx ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                      fontWeight: activeStakeholder === idx ? "700" : "500",
                      color: activeStakeholder === idx ? colors.primary : "#999",
                    }}
                  >
                    {s.title.split(" ")[1]}
                  </button>
                ))}
          </div>
        ) : (
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <div
              className="inline-flex rounded-full p-1"
              style={{
                border: `1px solid ${colors.line}`,
                backgroundColor: colors.background,
              }}
            >
              {["metrics", "stakeholder"].map((v) => (
                <button
                  key={v}
                  onClick={() => switchView(v)}
                  className="rounded-full border-none font-[Inter,sans-serif] text-[12px] cursor-pointer"
                  style={{
                    padding: "6px 16px",
                    backgroundColor: view === v ? colors.white : "transparent",
                    fontWeight: view === v ? "700" : "500",
                    color: view === v ? colors.primary : "#999",
                    boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  }}
                >
                  {v === "metrics" ? "By Metric" : "By Stakeholder"}
                </button>
              ))}
            </div>
            <div className="w-px h-6" style={{ backgroundColor: colors.line }} />
            {view === "metrics"
              ? metrics.map((m, idx) => (
                  <button
                    key={m.category}
                    onClick={() => switchCategory(idx)}
                    className="rounded-full font-[Inter,sans-serif] text-[12px] cursor-pointer"
                    style={{
                      padding: "6px 16px",
                      border: activeCategory === idx ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                      backgroundColor: activeCategory === idx ? colors.accentLight : "transparent",
                      color: activeCategory === idx ? colors.primary : "#999",
                      fontWeight: activeCategory === idx ? "700" : "500",
                    }}
                  >
                    {m.category}
                  </button>
                ))
              : stakeholders.map((s, idx) => (
                  <button
                    key={s.title}
                    onClick={() => setActiveStakeholder(idx)}
                    className="rounded-full font-[Inter,sans-serif] text-[12px] cursor-pointer"
                    style={{
                      padding: "6px 16px",
                      border: activeStakeholder === idx ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                      backgroundColor: activeStakeholder === idx ? colors.accentLight : "transparent",
                      color: activeStakeholder === idx ? colors.primary : "#999",
                      fontWeight: activeStakeholder === idx ? "700" : "500",
                    }}
                  >
                    {s.title.split(" ")[1]}
                  </button>
                ))}
          </div>
        )}

        {/* Content Area */}
        {view === "metrics" ? (
          <div
            className="rounded-[20px] overflow-hidden"
            style={{
              backgroundColor: colors.background,
              border: `2px solid ${colors.primary}`,
            }}
          >
            {activeMetrics.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: isMobile ? "20px" : "24px 28px",
                  backgroundColor: idx % 2 === 0 ? colors.white : "transparent",
                  minHeight: isMobile ? "auto" : "100px",
                  ...(isMobile ? {} : { display: "grid", gridTemplateColumns: "200px 1fr 200px", gap: "32px" }),
                }}
              >
                {isMobile ? (
                  <>
                    <div className="flex justify-between items-start mb-2">
                      <div
                        className="font-[Poppins,sans-serif] text-[28px] font-bold tracking-[-1px]"
                        style={{ color: colors.primary }}
                      >
                        {item.prefix}
                        {useCounter(item.value, 1200, animate)}
                        {item.suffix}
                      </div>
                      <span
                        className="font-[Inter,sans-serif] text-[9px] font-bold uppercase tracking-[0.5px] rounded-[20px] whitespace-nowrap shrink-0"
                        style={{
                          color: colors.accent,
                          backgroundColor: "rgba(184,217,53,0.12)",
                          padding: "4px 10px",
                        }}
                      >
                        {item.trend}
                      </span>
                    </div>
                    <div
                      className="font-[Inter,sans-serif] text-[15px] font-bold mb-1"
                      style={{ color: colors.primary }}
                    >
                      {item.label}
                    </div>
                    <div className="font-[Inter,sans-serif] text-[13px] text-[#666] leading-[1.5]">
                      {item.description}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <div
                        className="font-[Poppins,sans-serif] text-[36px] font-bold tracking-[-1px]"
                        style={{ color: colors.primary }}
                      >
                        {item.prefix}
                        {useCounter(item.value, 1200, animate)}
                        {item.suffix}
                      </div>
                      <div
                        className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[0.5px] mt-1"
                        style={{ color: colors.accent }}
                      >
                        {item.trend}
                      </div>
                    </div>
                    <div>
                      <div
                        className="font-[Inter,sans-serif] text-[15px] font-bold mb-1"
                        style={{ color: colors.primary }}
                      >
                        {item.label}
                      </div>
                      <div className="font-[Inter,sans-serif] text-[13px] text-[#666] leading-[1.5]">
                        {item.description}
                      </div>
                    </div>
                    <div
                      className="rounded-[10px]"
                      style={{
                        padding: "10px 16px",
                        backgroundColor: idx % 2 === 0 ? colors.background : "rgba(27,77,62,0.04)",
                      }}
                    >
                      <div className="font-[Inter,sans-serif] text-[9px] font-bold text-[#aaa] uppercase tracking-[1px] mb-[6px]">
                        LINKED VENTURES
                      </div>
                      <div
                        className="font-[Inter,sans-serif] text-[11px] font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                        style={{ color: colors.primary }}
                      >
                        {item.ventures}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>
            {/* Stakeholder Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <div
                  className="font-[Inter,sans-serif] font-bold"
                  style={{
                    fontSize: isMobile ? "22px" : "28px",
                    color: colors.primary,
                  }}
                >
                  {activeS.title}
                </div>
                <div className="font-[Inter,sans-serif] text-[14px] text-[#888] mt-1">
                  {activeS.subtitle}
                </div>
              </div>
              <div className="text-right">
                <div
                  className="font-[Poppins,sans-serif] font-bold tracking-[-1.5px]"
                  style={{
                    fontSize: isMobile ? "32px" : "40px",
                    color: colors.primary,
                  }}
                >
                  {activeS.stat}
                </div>
                <div className="font-[Inter,sans-serif] text-[12px] text-[#888]">
                  {activeS.statLabel}
                </div>
              </div>
            </div>

            {/* Outcome Rows */}
            <div className="flex flex-col gap-[6px]">
              {activeS.outcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 rounded-[12px]"
                  style={{
                    padding: "14px 20px",
                    backgroundColor: idx % 2 === 0 ? colors.background : "transparent",
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: idx % 2 === 0 ? colors.white : colors.background }}
                  >
                    <span
                      className="font-[Inter,sans-serif] text-[12px] font-bold"
                      style={{ color: colors.primary }}
                    >
                      {idx + 1}
                    </span>
                  </div>
                  <span className="font-[Inter,sans-serif] text-[15px] text-[#333] leading-[1.5]">
                    {outcome}
                  </span>
                </div>
              ))}
            </div>

            {/* Key Advantage Strip */}
            <div
              className="mt-6 rounded-[12px] flex items-center"
              style={{ padding: "16px 24px", backgroundColor: colors.primary }}
            >
              <span
                className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1.5px]"
                style={{ color: colors.accent }}
              >
                KEY ADVANTAGE
              </span>
              <span className="font-[Inter,sans-serif] text-[14px] font-medium text-[rgba(255,255,255,0.85)] ml-4">
                {activeS.highlight}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};


// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function HousingRealEstateSectorPage() {
  const isMobile = useIsMobile();
  return (
    <Layout>
      <div className="font-[Inter,sans-serif] m-0 p-0" style={{ backgroundColor: colors.white }}>
        <SectorHeroSection sector={sectorData} />
        <ProblemSection sector={sectorData} />
        <ValueChainSectionPremium />
        <SolutionsSection sector={sectorData} />
        <MarketEcosystemSection sector={sectorData} />
        <PolicyAlignmentSection />
        <CrossSectorSection />
        <InvestmentCTASection sector={sectorData} />
        <ImpactSection />
        <SectorFinalCTA
          heading={<>Let's Build Ghana's <span className="font-semibold" style={{ color: colors.accent }}>Housing Future</span></>}
          description="Whether you're an investor, partner, or government stakeholder, there's a seat at the table in building sustainable communities."
        />
      </div>
    </Layout>
  );
}
