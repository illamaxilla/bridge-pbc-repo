import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Layout } from "@/components/Layout";
import { IconGraduation, IconBuilding, IconWallet, IconHeart, IconLightbulb, IconFactory, IconTruck, IconZap, IconArrowRight, IconArrowDown, IconCheck, IconWarning, IconUsers, IconSprout, IconCpu, IconStorefront, IconOfficeBuilding, IconTrendingUp, IconLandmark, IconCross } from "@/components/icons/SectorIcons";
import { ArrowLeft, ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { SECTOR_ROUTES } from "@/data/sectorIcons";
import { useCounter } from "@/hooks/useCounter";

// ============================================================================
// BRIDGE SECTOR PAGE: Education & Skills
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
// SECTOR DATA - Education & Skills
// ============================================================================

const sectorData = {
  id: 5,
  slug: "education-skills",
  name: "Education & Skills",
  shortName: "Education",
  category: "The Talent Engine",
  heroTitleBold: "Education & Skills",
  heroTitleRest: "Development",

  capitalRange: "$16.5-33.5M",
  ventures: 19,
  jobsImpact: "10M+ learners",
  gdpContribution: "4% of GDP",

  problemHeadline: "The Foundation Beneath Every Career, Enterprise, and Innovation",
  problemSubheadline:
    "Ghana's education sector holds immense potential — from connecting 8.5M primary learners to quality pathways, to unlocking the 80-90% of workforce skills already developed through informal apprenticeships, to aligning 500K+ university students with real economic opportunity. These are pathways where targeted investment and innovation can transform credentials into capabilities at national scale.",

  keyStats: [
    { value: "50%+", label: "Youth Talent Pool (15-24)", detail: "Largest untapped workforce" },
    { value: "95%+", label: "TVET Growth Potential", detail: "Under 5% currently enrolled" },
    { value: "22.3%", label: "Graduates to Connect", detail: "Tertiary-educated, seeking work" },
    { value: "80-90%", label: "Informal Skills to Formalize", detail: "Ready for recognition" },
  ],

  painPoints: [
    {
      title: "Skills-Employment Alignment",
      description:
        "500K+ graduates annually represent a massive opportunity to align what universities teach with what Ghana's employers actually need.",
      rootCauses: ["Curriculum modernization", "Industry partnership potential", "Perception shift opportunity"],
      quantification: "500K+ graduates/year to connect with employment",
    },
    {
      title: "TVET Elevation & Investment",
      description:
        "TVET is the fastest pathway to employment — elevating its status and investment unlocks a growth engine from less than 5% enrollment.",
      rootCauses: ["Cultural reframing potential", "Equipment modernization", "Industry linkage building"],
      quantification: "95%+ secondary cohort addressable for TVET",
    },
    {
      title: "Quality & Outcomes Uplift",
      description:
        "86% primary enrollment creates extraordinary reach — targeted quality investments can transform learning outcomes for millions of students.",
      rootCauses: ["Teacher pipeline opportunity", "Infrastructure investment", "Outcomes measurement"],
      quantification: "70-80% of learners ready for quality uplift",
    },
    {
      title: "Digital Skills Acceleration",
      description:
        "Ghana's digital economy ambitions create a vast addressable market for skills training — from basic literacy to advanced coding at every level.",
      rootCauses: ["ICT infrastructure buildout", "Teacher upskilling pathway", "Rural connectivity expansion"],
      quantification: "78% of students addressable for digital skills",
    },
  ],

  solutions: [
    {
      tier: 1,
      name: "Skills Bootcamp Network",
      description:
        "Intensive short-term training (2-8 weeks) aligned with employment opportunities through BRIDGE portfolio companies.",
      capital: "$2-4M",
      score: 44,
      impact: "10,000+ trained, 80%+ employed",
      model: "Employer-linked training guarantee",
    },
    {
      tier: 1,
      name: "TVET Partnership Program",
      description:
        "Co-investment in 3-5 TVET institutions for equipment upgrades, curriculum design, and direct employment pipeline.",
      capital: "$3-5M",
      score: 41,
      impact: "2x capacity, 5,000+ new students",
      model: "Equipment + curriculum + placement",
    },
    {
      tier: 1,
      name: "Service-Linked Scholarships",
      description:
        "500 scholarships in critical fields like healthcare, engineering, and tech with 2-5 year Ghana service commitment.",
      capital: "$3-6M",
      score: 40,
      impact: "70%+ fulfillment, talent retained",
      model: "Philippines nursing model adaptation",
    },
    {
      tier: 1,
      name: "Diaspora Mentorship Network",
      description:
        "Structured virtual mentorship connecting 1,000 diaspora professionals to emerging Ghanaian talent across sectors.",
      capital: "$400-700K",
      score: 40,
      impact: "1,000+ mentees gain career access",
      model: "Monthly video + annual in-person",
    },
    {
      tier: 1,
      name: "Apprenticeship Recognition",
      description:
        "Assessment and certification for informal apprenticeship completers, recognizing 80-90% of workforce skill base.",
      capital: "$1-2M",
      score: 39,
      impact: "50,000+ workers formally certified",
      model: "Trade association partnerships",
    },
    {
      tier: 1,
      name: "Digital Skills Program",
      description:
        "Digital literacy and coding bootcamps targeting youth, Kejetia market vendors, and BRIDGE portfolio beneficiaries.",
      capital: "$1.5-2.5M",
      score: 39,
      impact: "5,000+ youth digitally job-ready",
      model: "One Million Coders alignment",
    },
    {
      tier: 2,
      name: "Equipment Modernization Fund",
      description:
        "Targeted equipment investment for partner TVET institutions directly aligned with BRIDGE portfolio industry needs.",
      capital: "$1.5-2.5M",
      score: 38,
      impact: "5 institutions fully modernized",
      model: "Industry-donated + purchased equipment",
    },
    {
      tier: 2,
      name: "EdTech Investment Fund",
      description:
        "Seed and growth investments in 4-6 EdTech ventures serving Ghanaian learners with offline-first, TVET solutions.",
      capital: "$2-4M",
      score: 37,
      impact: "100,000+ learners on platforms",
      model: "Meaningful Gigs, Chalkboard partnership",
    },
    {
      tier: 2,
      name: "Diaspora Teaching Fellowship",
      description:
        "Funded teaching residencies bringing diaspora educators to partner TVET institutions and universities in Ghana.",
      capital: "$500K-1M",
      score: 37,
      impact: "50+ fellows, industry skills shared",
      model: "Carnegie Fellowship adaptation",
    },
  ],

  competitors: [
    {
      name: "Mastercard Foundation",
      focus: "University scholarships for disadvantaged youth",
      gap: "TVET collaboration opportunity",
      year: "2006",
      funding: "$500M+",
      priority: "High",
      strengths: [
        { name: "Scale & Funding", rating: 5 },
        { name: "University Access", rating: 5 },
        { name: "Comprehensive Support", rating: 4 },
      ],
      gaps: [
        "University pipeline ready for TVET extension",
        "Employment linkage opportunity",
        "TVET co-investment potential",
      ],
      bridgeOpportunity: "TVET complementary partnership—scholarship recipients into BRIDGE employment pipeline",
    },
    {
      name: "GIZ TVET Programs",
      focus: "Technical assistance to TVET institutions",
      gap: "Scale expansion opportunity",
      year: "2010",
      funding: "Gov't",
      priority: "High",
      strengths: [
        { name: "German Expertise", rating: 5 },
        { name: "Industry Linkage", rating: 4 },
        { name: "Quality Standards", rating: 4 },
      ],
      gaps: ["Long-term sustainability model", "Geographic expansion potential", "Employment pipeline integration"],
      bridgeOpportunity: "Co-implement dual training model with BRIDGE employment pipeline",
    },
    {
      name: "CAMFED",
      focus: "Girls' education and empowerment",
      gap: "Skills training extension ready",
      year: "1993",
      funding: "$100M+",
      priority: "Medium",
      strengths: [
        { name: "Gender Focus", rating: 5 },
        { name: "Holistic Support", rating: 4 },
        { name: "Community Network", rating: 4 },
      ],
      gaps: ["Post-secondary pathway opportunity", "Skills training co-delivery", "Employment transition potential"],
      bridgeOpportunity: "Skills transition pathway for CAMFED graduates into BRIDGE programs",
    },
    {
      name: "Ghana Skills Dev. Fund",
      focus: "$200M World Bank skills initiative",
      gap: "Private sector delivery partnership",
      year: "2023",
      funding: "$200M",
      priority: "High",
      strengths: [
        { name: "Government Backing", rating: 5 },
        { name: "Substantial Capital", rating: 5 },
        { name: "National Mandate", rating: 4 },
      ],
      gaps: ["Delivery acceleration opportunity", "Private sector agility complement", "Co-implementation potential"],
      bridgeOpportunity: "Co-funding partner for TVET expansion with BRIDGE delivery efficiency",
    },
    {
      name: "Chalkboard Education",
      focus: "SMS-based learning platform",
      gap: "Employment linkage opportunity",
      year: "2015",
      funding: "$2M+",
      priority: "Medium",
      strengths: [
        { name: "Offline Reach", rating: 5 },
        { name: "Cost Efficiency", rating: 4 },
        { name: "Feature Phone Access", rating: 5 },
      ],
      gaps: ["Employment pipeline integration", "Skills training content expansion", "Practical component addition"],
      bridgeOpportunity: "Content delivery partner for BRIDGE training programs",
    },
    {
      name: "CTVET / TVET Service",
      focus: "Government TVET regulation and delivery",
      gap: "Resource and equipment partnership",
      year: "2020",
      funding: "Gov't",
      priority: "High",
      strengths: [
        { name: "Regulatory Authority", rating: 5 },
        { name: "NTVETQF Framework", rating: 4 },
        { name: "National Reach", rating: 3 },
      ],
      gaps: [
        "Resource augmentation opportunity",
        "Equipment modernization partnership",
        "Industry linkage co-development",
      ],
      bridgeOpportunity: "Equipment and curriculum partner—BRIDGE resources with CTVET accreditation",
    },
  ],

  policyAlignment: [
    {
      policy: "Ghana Jobs & Skills Project",
      allocation: "$200M (World Bank)",
      alignment: "Co-funding for TVET expansion and skills training delivery",
    },
    {
      policy: "Strategic Plan for TVET Transformation",
      allocation: "2023-2027 Framework",
      alignment: "Direct alignment with TVET quality and capacity goals",
    },
    {
      policy: "Free SHS Policy",
      allocation: "GH₵3.2B annual",
      alignment: "TVET pathway development for SHS graduates",
    },
    {
      policy: "National Digital Literacy Program",
      allocation: "10M target by 2030",
      alignment: "Digital skills bootcamp integration and scaling",
    },
  ],

  crossSector: [
    { sectorId: 4, name: "Technology & Innovation", connection: "Digital skills, coding bootcamps, EdTech" },
    { sectorId: 3, name: "Health Systems", connection: "Nursing scholarships, health tech training" },
    { sectorId: 1, name: "Infrastructure", connection: "Kejetia vendor training, construction trades" },
    { sectorId: 6, name: "Agriculture", connection: "Processing skills, equipment operation" },
    { sectorId: 2, name: "Financial Inclusion", connection: "Financial literacy bootcamps, fintech skills" },
  ],

  relatedSectors: [
    { id: 4, name: "Technology & Innovation", icon: "lightbulb", reason: "Digital skills pipeline, EdTech ecosystem" },
    { id: 3, name: "Health Systems", icon: "heart", reason: "Nursing and health technician training" },
    { id: 1, name: "Infrastructure", icon: "building", reason: "Construction skills, vendor training" },
  ],
};

// ============================================================================
// PREMIUM VALUE CHAIN DATA
// ============================================================================

const valueChainStages = [
  {
    id: 1,
    stage: "Early Education",
    actor: "Students & Parents",
    population: "8.5M enrolled",
    icon: "book",
    valueRetained: 100,
    painPoints: [
      "Quality uplift — 70-80% ready",
      "Classroom capacity expansion",
      "Career guidance systems to build",
      "Infrastructure investment ready",
    ],
    statNumber: "86%",
    statLabel: "Primary enrollment rate",
    description:
      "Foundation years where 8.5M children enter the system — the largest skills investment pipeline in Ghana.",
  },
  {
    id: 2,
    stage: "Secondary / SHS",
    actor: "SHS Students & Teachers",
    population: "1.2M students",
    icon: "school",
    valueRetained: 80,
    painPoints: [
      "Curriculum-industry alignment",
      "TVET elevation opportunity",
      "Skills-first culture building",
      "Lab and resource modernization",
    ],
    statNumber: "57%",
    statLabel: "Secondary enrollment rate",
    description: "The branching point where 1.2M students can be connected to career-aligned pathways.",
  },
  {
    id: 3,
    stage: "TVET & Skills",
    actor: "Trainees & Institutions",
    population: "50K students",
    icon: "tools",
    valueRetained: 55,
    painPoints: [
      "Equipment modernization ready",
      "Industry linkage opportunity",
      "Expansion potential at 95%+",
      "Perception shift opportunity",
    ],
    statNumber: "95%+",
    statLabel: "Expansion potential",
    description: "The highest-impact pathway — 50K current students with massive expansion potential.",
  },
  {
    id: 4,
    stage: "Higher Education",
    actor: "University Students",
    population: "500K+ students",
    icon: "graduation",
    valueRetained: 35,
    painPoints: [
      "Skills-market alignment ready",
      "Practical training integration",
      "Graduates to connect at 22.3%",
      "Diaspora expertise to mobilize",
    ],
    statNumber: "22.3%",
    statLabel: "Graduates to connect",
    description: "Where 500K+ students represent a direct pipeline for industry-aligned capability building.",
  },
  {
    id: 5,
    stage: "Employment",
    actor: "Seekers & Employers",
    population: "12M+ workforce",
    icon: "briefcase",
    valueRetained: 20,
    painPoints: [
      "Placement acceleration ready",
      "Employer co-investment ready",
      "Skills verification to build",
      "Credential-to-capability shift",
    ],
    statNumber: "50%+",
    statLabel: "Youth talent pool",
    description: "Where 12M+ workers meet the economy — the ultimate measure of education's value.",
  },
];

// ============================================================================
// ICON COMPONENTS
// ============================================================================

// Premium Value Chain Icons
const valueChainIcons = {
  book: <BookOpen size={24} strokeWidth={1.5} />,
  school: <GraduationCap size={24} strokeWidth={1.5} />,
  tools: <Wrench size={24} strokeWidth={1.5} />,
  graduation: <GraduationCap size={24} strokeWidth={1.5} />,
  briefcase: <Briefcase size={24} strokeWidth={1.5} />,
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
// PROBLEM SECTION
// ============================================================================

const problemSectionData = [
  {
    id: 1,
    title: "Skills-Employment Alignment",
    description:
      "500K+ graduates annually represent a massive opportunity to align what universities teach with what Ghana's employers actually need.",
    rootCauses: [
      { title: "Curriculum Modernization", description: "Industry-aligned content" },
      { title: "Industry Partnership Potential", description: "Employer co-design" },
      { title: "Perception Shift Opportunity", description: "Skills-first culture" },
      { title: "Career Guidance Systems", description: "Labor market intelligence" },
    ],
    quantification: "500K+ graduates/year to connect with employment",
    severity: "High Priority",
    severityScore: 95,
    affectedCount: "500K+",
    affectedLabel: "graduates to connect",
    bridgeSolution: "Skills Bootcamps + TVET Partnership",
  },
  {
    id: 2,
    title: "TVET Elevation & Investment",
    description:
      "TVET is the fastest pathway to employment — elevating its status and investment unlocks a growth engine from less than 5% enrollment.",
    rootCauses: [
      { title: "Cultural Reframing Potential", description: "Skills-first narrative" },
      { title: "Equipment Modernization", description: "Industry-grade tools" },
      { title: "Industry Linkage Building", description: "Employment pipelines" },
      { title: "Investment Readiness", description: "Scalable model" },
    ],
    quantification: "95%+ secondary cohort addressable for TVET",
    severity: "High Priority",
    severityScore: 92,
    affectedCount: "95%+",
    affectedLabel: "addressable cohort",
    bridgeSolution: "TVET Partnership + Equipment Fund",
  },
  {
    id: 3,
    title: "Quality & Outcomes Uplift",
    description:
      "86% primary enrollment creates extraordinary reach — targeted quality investments can transform learning outcomes for millions of students.",
    rootCauses: [
      { title: "Teacher Pipeline Opportunity", description: "Workforce expansion" },
      { title: "Infrastructure Investment", description: "Facility upgrades" },
      { title: "Resource Expansion", description: "Labs and libraries" },
      { title: "Outcomes Measurement", description: "Data-driven improvement" },
    ],
    quantification: "70-80% of learners ready for quality uplift",
    severity: "Strategic",
    severityScore: 85,
    affectedCount: "8.5M",
    affectedLabel: "learners to reach",
    bridgeSolution: "Teaching Fellowship + EdTech Fund",
  },
  {
    id: 4,
    title: "Digital Skills Acceleration",
    description:
      "Ghana's digital economy ambitions create a vast addressable market for skills training — from basic literacy to advanced coding at every level.",
    rootCauses: [
      { title: "Teacher Upskilling Pathway", description: "ICT certification" },
      { title: "Infrastructure Buildout", description: "Labs and connectivity" },
      { title: "Rural Connectivity Expansion", description: "Access broadening" },
      { title: "Platform Opportunity", description: "Scalable delivery" },
    ],
    quantification: "78% of students addressable for digital skills",
    severity: "Strategic",
    severityScore: 80,
    affectedCount: "78%",
    affectedLabel: "addressable for digital",
    bridgeSolution: "Digital Skills + Smart Schools",
  },
];

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
            className="font-[Inter,sans-serif] text-[#666] leading-[1.55] mt-2 mb-0 overflow-hidden"
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

const ProblemSection = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const isMobile = useIsMobile();

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
            <span className="font-semibold">10M+ learners</span> ready to be connected to{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>real economic opportunity</span>
          </h2>
          <p
            className="font-[Inter,sans-serif] leading-[1.65] text-[#666] max-w-[680px] m-0"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
          >
            8.5M primary learners, 1.2M secondary students, and a surging digital economy — Ghana offers extraordinary
            scale for skills-to-employment ventures.
          </p>
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
          <div className="flex justify-center gap-1.5 mt-4">
            {problemSectionData.map((_, i) => (
              <div
                key={i}
                className="h-2 rounded cursor-pointer transition-all duration-300"
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
// PREMIUM VALUE CHAIN SECTION
// ============================================================================

// Value Chain Section

const ValueChainSectionPremium = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const isMobile = useIsMobile();
  const stage = valueChainStages[activeStage];

  return (
    <section
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div className="text-center" style={{ marginBottom: isMobile ? "28px" : "40px" }}>
          <span
            className="rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] px-5 py-[10px]"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
            }}
          >
            The Process
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[600px] mx-auto"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
              margin: "24px 0 16px 0",
            }}
          >
            From First Lesson to <span className="font-semibold" style={{ color: colors.accent }}>First Paycheck</span>
          </h2>
          <p
            className="font-[Inter,sans-serif] leading-[1.65] text-[#666] max-w-[750px] mx-auto my-0"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
          >
            Education is more than schooling — it's apprenticeships, bootcamps, mentorship, and on-the-job learning.
            Click each stage to explore where BRIDGE sees opportunity across the full talent journey.
          </p>
        </div>

        {/* Stage Selector + Detail Card */}
        <div>
          {/* Stage Selector — Horizontal Stepper */}
          <div
            className="max-w-[900px]"
            style={{ margin: isMobile ? "0 auto 16px" : "0 auto 28px" }}
          >
            <div className="relative" style={{ padding: isMobile ? "0 8px" : "0 20px" }}>
              {/* Progress fill */}
              {!isMobile && activeStage > 0 && (
                <div
                  className="absolute rounded-sm h-[3px] transition-[width] duration-400"
                  style={{
                    top: "30px",
                    left: "90px",
                    width: `calc(${(activeStage / (valueChainStages.length - 1)) * 100}% * 0.74)`,
                    backgroundColor: colors.accent,
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              )}

              {/* Stage nodes */}
              <div
                className="flex relative"
                style={{
                  justifyContent: isMobile ? "center" : "space-between",
                  gap: isMobile ? "8px" : undefined,
                  ...(isMobile
                    ? { overflowX: "auto", WebkitOverflowScrolling: "touch", margin: "0 -16px", padding: "4px 20px" }
                    : {}),
                }}
              >
                {valueChainStages.map((s, i) => {
                  const isActive = activeStage === i;
                  const isPast = i < activeStage;
                  const isFuture = i > activeStage;
                  return (
                    <div
                      key={s.id}
                      onClick={() => {
                        setActiveStage(i);
                        setShowMore(false);
                      }}
                      className="cursor-pointer text-center shrink-0 transition-all duration-300"
                      style={{ width: isMobile ? "56px" : "110px" }}
                    >
                      <div
                        className="relative mx-auto mb-1.5"
                        style={{
                          width: isMobile ? "40px" : "60px",
                          height: isMobile ? "40px" : "60px",
                        }}
                      >
                        {isActive && (
                          <div
                            className="absolute rounded-[18px] transition-all duration-300"
                            style={{
                              inset: "-4px",
                              border: `2.5px solid ${colors.primary}`,
                            }}
                          />
                        )}
                        <div
                          className="w-full h-full rounded-[15px] flex items-center justify-center transition-all duration-300"
                          style={{
                            backgroundColor: isActive ? colors.accent : isPast ? colors.primary : colors.white,
                            border: isFuture ? `1.5px solid ${colors.line}` : "1.5px solid transparent",
                            color: isActive ? colors.primary : isPast ? colors.white : "#bbb",
                            boxShadow: isActive ? "0 4px 16px rgba(27,77,62,0.15)" : "none",
                          }}
                        >
                          {valueChainIcons[s.icon]}
                        </div>
                      </div>
                      <div
                        className="font-[Inter,sans-serif] leading-[1.3] mb-0.5 transition-all duration-300"
                        style={{
                          fontSize: isMobile ? "11px" : "13px",
                          fontWeight: isActive ? "600" : "500",
                          color: isActive ? colors.primary : isPast ? colors.primary : "#999",
                        }}
                      >
                        {isMobile ? s.stage.split(" ")[0] : s.stage}
                      </div>
                      {!isMobile && (
                        <div
                          className="font-[Inter,sans-serif] text-[11px] leading-[1.3] transition-all duration-300"
                          style={{
                            color: isActive ? colors.accent : isPast ? "rgba(27,77,62,0.5)" : "#ccc",
                          }}
                        >
                          {s.actor}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Stage Detail Card */}
          <div
            className="max-w-[900px] mx-auto overflow-hidden border-none"
            style={{
              backgroundColor: colors.white,
              borderRadius: isMobile ? "16px" : "24px",
              boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
            }}
          >
            {/* Card Header */}
            <div
              className="flex items-center justify-between border-b-0"
              style={{ padding: isMobile ? "16px" : "18px 32px 12px" }}
            >
              <div>
                <div
                  className="font-[Inter,sans-serif] font-bold leading-[1.2]"
                  style={{
                    fontSize: isMobile ? "20px" : "24px",
                    color: colors.primary,
                  }}
                >
                  {stage.stage}
                </div>
                <div className="font-[Inter,sans-serif] text-[14px] text-[#888] mt-[3px]">
                  {stage.population}
                </div>
              </div>
              <div className="font-[Inter,sans-serif] text-[10px] font-semibold uppercase tracking-[2px] text-[#bbb]">
                Stage {activeStage + 1} / {valueChainStages.length}
              </div>
            </div>

            {/* Card Body */}
            <div style={{ padding: isMobile ? "8px 16px" : "8px 32px 16px" }}>
              {/* Description */}
              <p
                className="font-[Inter,sans-serif] text-[14px] leading-[1.6] text-[#666] mt-0 mb-3"
                style={{ minHeight: isMobile ? "auto" : "45px" }}
              >
                {stage.description}
              </p>

              {/* Metrics + Opportunities */}
              {(!isMobile || showMore) && (
                <div>
                  <div
                    className="grid mb-3"
                    style={{
                      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                      gap: isMobile ? "10px" : "16px",
                    }}
                  >
                    {/* Key Stat */}
                    <div
                      className="rounded-[14px] flex items-center gap-4 bg-[rgba(27,77,62,0.04)] py-[14px] px-5 border border-[rgba(27,77,62,0.08)]"
                    >
                      <div
                        className="font-[Poppins,sans-serif] text-[32px] font-bold leading-none shrink-0"
                        style={{ color: colors.primary }}
                      >
                        {stage.statNumber}
                      </div>
                      <div className="font-[Inter,sans-serif] text-[13px] text-[#888] leading-[1.3]">
                        {stage.statLabel}
                      </div>
                    </div>

                    {/* Value Retention */}
                    <div
                      className="rounded-[14px] flex flex-col justify-center"
                      style={{
                        backgroundColor: colors.background,
                        padding: "14px 20px",
                        border: `1px solid ${colors.line}`,
                      }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-[Inter,sans-serif] text-[12px] text-[#888]">
                          Learner value retained
                        </span>
                        <span
                          className="font-[Poppins,sans-serif] text-[14px] font-semibold"
                          style={{
                            color:
                              stage.valueRetained > 60
                                ? colors.primary
                                : stage.valueRetained > 30
                                  ? "rgba(27,77,62,0.6)"
                                  : "#999",
                          }}
                        >
                          {stage.valueRetained}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-[3px] overflow-hidden" style={{ backgroundColor: colors.line }}>
                        <div
                          className="h-full rounded-[3px] transition-[width] duration-500"
                          style={{
                            width: `${stage.valueRetained}%`,
                            backgroundColor: colors.accent,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Opportunity Markers */}
                  <div>
                    <div className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[2px] text-[#999] mb-2">
                      Opportunity Markers
                    </div>
                    <div
                      className="grid gap-1.5"
                      style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}
                    >
                      {stage.painPoints.map((point, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-[10px] rounded-[10px]"
                          style={{
                            backgroundColor: colors.background,
                            padding: "10px 14px",
                            border: `1px solid ${colors.line}`,
                          }}
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: colors.accent }}
                          />
                          <span className="font-[Inter,sans-serif] text-[13px] text-[#555] leading-[1.3]">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {isMobile && (
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="flex items-center justify-center gap-2 w-full bg-transparent rounded-xl font-[Inter,sans-serif] text-[14px] font-semibold cursor-pointer p-[14px]"
                  style={{
                    marginTop: showMore ? "0" : "-8px",
                    border: `1px solid ${colors.line}`,
                    color: colors.primary,
                  }}
                >
                  {showMore ? "Show less" : "Show more details"}
                  <ChevronDown size={14} strokeWidth={2.5} color={colors.primary} style={{ transform: showMore ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }} />
                </button>
              )}
            </div>

            {/* Card Footer — Navigation */}
            <div
              className="flex items-center justify-between border-t-0"
              style={{ padding: isMobile ? "12px 16px" : "14px 32px" }}
            >
              <div
                onClick={() => activeStage > 0 && setActiveStage(activeStage - 1)}
                className="flex items-center gap-2 font-[Inter,sans-serif] text-[13px]"
                style={{
                  cursor: activeStage > 0 ? "pointer" : "default",
                  opacity: activeStage > 0 ? 0.6 : 0.15,
                  transition: "opacity 0.2s ease",
                  color: colors.primary,
                }}
              >
                <ArrowLeft size={14} strokeWidth={2} />
                Previous
              </div>

              <div className="flex gap-2">
                {valueChainStages.map((_, i) => (
                  <div
                    key={i}
                    className="h-2 rounded cursor-pointer transition-all duration-300"
                    style={{
                      width: activeStage === i ? "24px" : "8px",
                      backgroundColor:
                        activeStage === i ? colors.accent : i < activeStage ? colors.primary : colors.line,
                    }}
                  />
                ))}
              </div>

              <div
                onClick={() => activeStage < valueChainStages.length - 1 && setActiveStage(activeStage + 1)}
                className="flex items-center gap-2 font-[Inter,sans-serif] text-[13px]"
                style={{
                  cursor: activeStage < valueChainStages.length - 1 ? "pointer" : "default",
                  opacity: activeStage < valueChainStages.length - 1 ? 0.6 : 0.15,
                  transition: "opacity 0.2s ease",
                  color: colors.primary,
                }}
              >
                Next
                <ArrowRight size={14} strokeWidth={2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SOLUTIONS SECTION
// ============================================================================

const SolutionCard = ({ solution, index }) => {
  const tierColors = {
    1: { bg: colors.accent, text: colors.primary, label: "Flagship" },
    2: { bg: "rgba(184, 217, 53, 0.5)", text: colors.primary, label: "Scaling" },
    3: { bg: "rgba(184, 217, 53, 0.25)", text: colors.primary, label: "Strategic" },
  };
  const tier = tierColors[solution.tier];

  return (
    <div
      className="rounded-[20px] p-7 border-none flex flex-col transition-all duration-300"
      style={{ backgroundColor: colors.white }}
    >
      {/* Tier + Capital row */}
      <div className="flex justify-between items-center mb-4">
        <span
          className="rounded-[20px] text-[11px] font-bold font-[Inter,sans-serif] uppercase tracking-[0.5px] py-[5px] px-3"
          style={{ backgroundColor: tier.bg, color: tier.text }}
        >
          Tier {solution.tier} · {tier.label}
        </span>
        <span
          className="font-[Poppins,sans-serif] text-[16px] font-bold"
          style={{ color: colors.primary }}
        >
          {solution.capital}
        </span>
      </div>

      {/* Title */}
      <h3
        className="font-[Inter,sans-serif] text-[18px] font-semibold leading-[1.3] min-h-[24px] mt-0 mb-3"
        style={{ color: colors.primary }}
      >
        {solution.name}
      </h3>

      {/* Description */}
      <p className="font-[Inter,sans-serif] text-[14px] text-[#666] leading-[1.6] mt-0 mb-5 flex-1">
        {solution.description}
      </p>

      {/* Impact container */}
      <div
        className="rounded-xl bg-[rgba(27,77,62,0.06)] py-[14px] px-4 border border-[rgba(27,77,62,0.1)]"
      >
        <div className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1px] text-[#999] mb-[5px]">
          Expected Impact
        </div>
        <div
          className="font-[Inter,sans-serif] text-[13px] font-semibold whitespace-nowrap"
          style={{ color: colors.primary }}
        >
          {solution.impact}
        </div>
      </div>
    </div>
  );
};

const SolutionsSection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [activeTier, setActiveTier] = useState("all");

  const tierFilters = [
    { key: "all", label: "All Ventures" },
    { key: 1, label: "Flagship" },
    { key: 2, label: "Scaling" },
    { key: 3, label: "Strategic" },
  ];

  const filteredSolutions =
    activeTier === "all" ? sector.solutions : sector.solutions.filter((s) => s.tier === activeTier);

  return (
    <section
      style={{
        backgroundColor: colors.primary,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Header + Filter row */}
        <div
          style={{
            display: isMobile ? "block" : "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: isMobile ? "32px" : "60px",
          }}
        >
          <div className="flex-1" style={{ marginBottom: isMobile ? "24px" : 0 }}>
            <span
              className="rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] px-5 py-[10px]"
              style={{
                backgroundColor: "rgba(184, 217, 53, 0.15)",
                color: colors.accent,
              }}
            >
              The Pathway to Impact
            </span>
            <h2
              className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[900px]"
              style={{
                fontSize: isMobile ? "28px" : "42px",
                color: colors.white,
                margin: "24px 0 20px 0",
              }}
            >
              Ventures That Build Lasting <span className="font-semibold" style={{ color: colors.accent }}>Human Capital</span>
            </h2>
            <p
              className="font-[Inter,sans-serif] leading-[1.65] text-white/60 max-w-[700px] m-0"
              style={{ fontSize: isMobile ? "15px" : "16px" }}
            >
              Nine ventures — each one a bridge from insight to investment to measurable public benefit — leveraging
              diaspora expertise, TVET partnerships, and BRIDGE's integrated portfolio to connect learning with earning.
            </p>
          </div>

          {/* Right: Filter container */}
          <div
            className="flex shrink-0"
            style={{ justifyContent: isMobile ? "flex-start" : "flex-end" }}
          >
            <div className="inline-flex gap-1 p-1 rounded-full border border-white/15">
              {tierFilters.map((f) => {
                const isActive = activeTier === f.key;
                const count =
                  f.key === "all" ? sector.solutions.length : sector.solutions.filter((s) => s.tier === f.key).length;
                if (count === 0) return null;
                return (
                  <button
                    key={f.key}
                    onClick={() => setActiveTier(String(f.key))}
                    className="border-none rounded-full font-[Inter,sans-serif] cursor-pointer transition-all duration-200 whitespace-nowrap"
                    style={{
                      backgroundColor: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                      color: isActive ? colors.accent : "rgba(255,255,255,0.5)",
                      padding: isMobile ? "6px 12px" : "6px 16px",
                      fontSize: isMobile ? "11px" : "12px",
                      fontWeight: isActive ? "700" : "500",
                    }}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
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
          {filteredSolutions.map((solution, i) => (
            <div
              key={`${activeTier}-${i}`}
              style={isMobile ? { minWidth: "80%", maxWidth: "80%", flexShrink: 0, scrollSnapAlign: "start" } : {}}
            >
              <SolutionCard solution={solution} index={i} />
            </div>
          ))}
        </div>

        {isMobile && (
          <div className="flex justify-center gap-1.5 mt-4">
            {filteredSolutions.map((_, i) => (
              <div
                key={i}
                className="h-2 rounded cursor-pointer transition-all duration-300"
                style={{
                  width: i === 0 ? "24px" : "8px",
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
// COMPETITIVE LANDSCAPE / MARKET ECOSYSTEM
// ============================================================================

const CompetitorAnalysisCard = ({ competitors, currentIndex, setCurrentIndex, hiddenNav }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const competitor = competitors[currentIndex];

  // Collapse when switching competitors
  useEffect(() => {
    setIsExpanded(false);
  }, [currentIndex]);

  const nextCompetitor = (e) => {
    e.stopPropagation();
    setCurrentIndex((currentIndex + 1) % competitors.length);
  };
  const prevCompetitor = (e) => {
    e.stopPropagation();
    setCurrentIndex((currentIndex - 1 + competitors.length) % competitors.length);
  };

  return (
    <div
      className="rounded-[20px] overflow-hidden"
      style={{
        backgroundColor: colors.white,
        border: `1px solid ${colors.line}`,
      }}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3
            className="font-[Inter,sans-serif] text-[18px] font-semibold m-0"
            style={{ color: colors.dark }}
          >
            {competitor.name}
          </h3>
          <span
            className="font-[Inter,sans-serif] text-[12px] font-semibold rounded-[20px] px-3 py-1"
            style={{
              color: colors.primary,
              backgroundColor: colors.accentLight,
            }}
          >
            {competitor.priority} Priority
          </span>
        </div>

        <p className="font-[Inter,sans-serif] text-[14px] text-[#666] mt-0 mb-4 leading-[1.5]">
          {competitor.focus}
        </p>

        {/* Strengths */}
        <div className="mb-4">
          {competitor.strengths.map((strength, i) => (
            <div key={i} className="flex justify-between items-center mb-2">
              <span className="text-[13px] font-[Inter,sans-serif] text-[#666]">
                {strength.name}
              </span>
              <div className="flex gap-[3px]">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className="w-4 h-1.5 rounded-[3px]"
                    style={{ backgroundColor: n <= strength.rating ? colors.accent : colors.line }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {isExpanded && (
          <>
            {/* Where BRIDGE Helps */}
            <div className="mb-4">
              <div className="text-[10px] font-[Inter,sans-serif] text-[#888] uppercase tracking-[1px] mb-3 font-semibold">
                Where BRIDGE Helps
              </div>
              {competitor.gaps.map((gap, i) => (
                <div
                  key={i}
                  className="flex items-center gap-[10px]"
                  style={{ marginBottom: i < competitor.gaps.length - 1 ? "8px" : 0 }}
                >
                  <span className="text-[12px] font-semibold" style={{ color: colors.accent }}>→</span>
                  <span className="text-[13px] font-[Inter,sans-serif] text-[#666]">
                    {gap}
                  </span>
                </div>
              ))}
            </div>

            {/* BRIDGE Opportunity */}
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: colors.accentLight,
                border: `1px solid ${colors.accent}`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                  style={{ backgroundColor: colors.accent }}
                >
                  ✦
                </span>
                <span
                  className="text-[10px] font-[Inter,sans-serif] uppercase tracking-[1px] font-bold"
                  style={{ color: colors.primary }}
                >
                  BRIDGE Opportunity
                </span>
              </div>
              <p
                className="text-[13px] font-[Inter,sans-serif] leading-[1.5] m-0"
                style={{ color: colors.primary }}
              >
                {competitor.bridgeOpportunity}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div
        className="flex items-center px-6 py-4"
        style={{
          borderTop: `1px solid ${colors.line}`,
          justifyContent: hiddenNav ? "center" : "space-between",
        }}
      >
        {!hiddenNav && (
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
            <span className="text-[12px] font-[Inter,sans-serif] text-[#888]">
              {currentIndex + 1} / {competitors.length}
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
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-transparent rounded-full text-[12px] font-semibold font-[Inter,sans-serif] cursor-pointer flex items-center gap-1.5"
          style={{
            color: colors.primary,
            border: `1.5px solid ${colors.primary}`,
            padding: "10px 20px",
          }}
        >
          {isExpanded ? "Less" : "Analysis"}
          <ChevronDown size={12} strokeWidth={2} style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }} />
        </button>
      </div>
    </div>
  );
};

const CompetitiveLandscapeSection = ({ sector }) => {
  const [activeCompetitorIndex, setActiveCompetitorIndex] = useState(0);
  const [showMoreComp, setShowMoreComp] = useState(false);
  const isMobile = useIsMobile();
  const activeComp = sector.competitors[activeCompetitorIndex];

  const positionData = [
    {
      headline: "TVET pipeline complements Mastercard's university focus",
      bullets: [
        { label: "Complementary Pipeline", detail: "University → TVET bridge" },
        { label: "Employment Linkage", detail: "Scholars into BRIDGE jobs" },
        { label: "Shared Measurement", detail: "Aligned impact tracking" },
        { label: "Scale Multiplier", detail: "12-sector job network" },
      ],
    },
    {
      headline: "BRIDGE adds employment pipeline to GIZ's dual training model",
      bullets: [
        { label: "Co-Implementation", detail: "Dual training + job pipeline" },
        { label: "Sustainability Model", detail: "Private sector continuity" },
        { label: "Geographic Reach", detail: "Expand beyond pilot regions" },
        { label: "Industry Demand", detail: "Portfolio-validated skills" },
      ],
    },
    {
      headline: "Skills transition pathway for CAMFED graduates into careers",
      bullets: [
        { label: "Graduate Pathways", detail: "Education → employment" },
        { label: "Gender-Inclusive Design", detail: "Built on CAMFED model" },
        { label: "Vocational Extension", detail: "TVET for secondary grads" },
        { label: "Mentor Network", detail: "Diaspora professionals" },
      ],
    },
    {
      headline: "Private delivery partner for $200M public skills investment",
      bullets: [
        { label: "Co-Funding Partner", detail: "BRIDGE delivery efficiency" },
        { label: "Speed to Market", detail: "Private sector agility" },
        { label: "Employer Linkage", detail: "Portfolio hiring demand" },
        { label: "Accountability", detail: "Employment-linked results" },
      ],
    },
    {
      headline: "Content delivery partner scaling learning to employment",
      bullets: [
        { label: "Platform Integration", detail: "SMS + BRIDGE training" },
        { label: "Offline Reach", detail: "Feature phone learners" },
        { label: "Skills Content", detail: "Vocational curriculum" },
        { label: "Job Connection", detail: "Learning → placement" },
      ],
    },
    {
      headline: "Equipment and curriculum partner with CTVET accreditation",
      bullets: [
        { label: "Accreditation Ally", detail: "CTVET-certified programs" },
        { label: "Resource Partner", detail: "Equipment modernization" },
        { label: "Quality Standards", detail: "NTVETQF alignment" },
        { label: "Industry Bridge", detail: "Employer co-design" },
      ],
    },
  ];

  const currentPosition = positionData[activeCompetitorIndex];

  return (
    <section
      style={{
        backgroundColor: colors.background,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Section Header */}
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] px-5 py-[10px]"
            style={{
              backgroundColor: colors.white,
              color: colors.primary,
              border: `1px solid ${colors.line}`,
            }}
          >
            The Landscape
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
              margin: "24px 0 16px 0",
            }}
          >
            Building With Ghana's{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>Strongest Institutions</span>
          </h2>
          <p
            className="font-[Inter,sans-serif] leading-[1.65] text-[#666] max-w-[750px] m-0"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
          >
            Mastercard Foundation, GIZ, Ghana Skills Development Fund, and many more bring world-class resources to
            education. BRIDGE connects training to employment through its integrated portfolio — combining efforts,
            aligning resources, creating shared value.
          </p>
        </div>

        {/* Mobile: horizontal scroll pills for competitor selection */}
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
                    setActiveCompetitorIndex(index);
                    setShowMoreComp(false);
                  }}
                  className="rounded-full text-[10px] font-[Inter,sans-serif] cursor-pointer whitespace-nowrap shrink-0 transition-all duration-200 py-[5px] px-2"
                  style={{
                    backgroundColor: activeCompetitorIndex === index ? colors.accentLight : "transparent",
                    color: activeCompetitorIndex === index ? colors.primary : "#999",
                    fontWeight: activeCompetitorIndex === index ? "700" : "500",
                    border: activeCompetitorIndex === index ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                  }}
                >
                  {comp.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div
          style={
            isMobile
              ? { display: "flex", flexDirection: "column", gap: "20px" }
              : {
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr",
                  gap: "20px",
                  alignItems: "end",
                }
          }
        >
          <div className="flex flex-col gap-5">
            <CompetitorAnalysisCard
              competitors={sector.competitors}
              currentIndex={activeCompetitorIndex}
              setCurrentIndex={setActiveCompetitorIndex}
              hiddenNav={isMobile}
            />

            {isMobile && !showMoreComp && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMoreComp(true);
                }}
                className="flex items-center justify-center gap-2 w-full p-[14px] border-none rounded-xl font-[Inter,sans-serif] text-[14px] font-semibold cursor-pointer"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.white,
                }}
              >
                See BRIDGE's Position
                <ChevronDown size={14} strokeWidth={2.5} />
              </button>
            )}
            {(!isMobile || showMoreComp) && (
              <div
                className="flex-1 flex flex-col"
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: isMobile ? "16px" : "20px",
                  padding: isMobile ? "20px" : "28px",
                }}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="text-[10px] font-[Inter,sans-serif] font-bold uppercase tracking-[2px] text-white/40">
                    BRIDGE's Position
                  </div>
                  <span
                    className="text-[11px] font-[Inter,sans-serif] font-semibold rounded-[20px] px-3 py-1"
                    style={{
                      color: colors.accent,
                      backgroundColor: "rgba(184, 217, 53, 0.12)",
                    }}
                  >
                    vs {["Mastercard", "GIZ", "CAMFED", "Ghana Skills", "Chalkboard", "CTVET"][activeCompetitorIndex]}
                  </span>
                </div>
                <h4
                  className="font-[Inter,sans-serif] text-[17px] font-semibold leading-[1.4] min-h-[48px] mt-0 mb-6"
                  style={{ color: colors.white }}
                >
                  {currentPosition.headline}
                </h4>
                <div className="flex flex-col gap-[10px] flex-1">
                  {currentPosition.bullets.map((item, i) => (
                    <div
                      key={i}
                      className="flex rounded-xl"
                      style={{
                        alignItems: isMobile ? "flex-start" : "center",
                        flexWrap: isMobile ? "wrap" : "nowrap",
                        gap: isMobile ? "8px" : "12px",
                        backgroundColor: "rgba(255,255,255,0.06)",
                        padding: isMobile ? "12px 14px" : "14px 16px",
                      }}
                    >
                      <div
                        className="w-[7px] h-[7px] rounded-full shrink-0"
                        style={{
                          backgroundColor: colors.accent,
                          marginTop: isMobile ? "5px" : 0,
                        }}
                      />
                      <span className="font-[Inter,sans-serif] text-[13px] font-semibold" style={{ color: colors.white }}>
                        {item.label}
                      </span>
                      <span className="font-[Inter,sans-serif] text-[13px] text-white/40">
                        {item.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {!isMobile && (
            <div className="grid grid-cols-2 gap-4">
              {sector.competitors.map((comp, i) => {
                const shortNames = ["Mastercard Fdn", "GIZ TVET", "CAMFED", "Ghana Skills Fund", "Chalkboard", "CTVET"];
                const shortDescs = [
                  "University scholarships for disadvantaged youth",
                  "Technical assistance to TVET institutions",
                  "Girls' education and empowerment programs",
                  "$200M World Bank workforce skills initiative",
                  "SMS-based learning for feature phone users",
                  "Government TVET regulation and accreditation",
                ];
                return (
                  <div
                    key={i}
                    className="rounded-2xl p-6 flex flex-col"
                    style={{
                      backgroundColor: colors.white,
                      border: `1px solid ${colors.line}`,
                    }}
                  >
                    <div className="flex justify-between items-center mb-1.5">
                      <h4
                        className="font-[Inter,sans-serif] text-[16px] font-semibold whitespace-nowrap m-0"
                        style={{ color: colors.dark }}
                      >
                        {shortNames[i]}
                      </h4>
                      <span
                        className="font-[Inter,sans-serif] text-[11px] font-semibold rounded-xl whitespace-nowrap shrink-0 ml-3 px-[10px] py-[3px]"
                        style={{
                          color: colors.primary,
                          backgroundColor: colors.accentLight,
                        }}
                      >
                        {comp.funding}
                      </span>
                    </div>
                    <p className="font-[Inter,sans-serif] text-[13px] text-[#888] mt-0 mb-3 leading-[1.45]">
                      {shortDescs[i]}
                    </p>

                    <div
                      className="rounded-[10px] flex flex-col justify-center"
                      style={{
                        backgroundColor: colors.background,
                        padding: "10px 14px",
                      }}
                    >
                      <div className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[0.5px] text-[#bbb] mb-1">
                        Top Strength
                      </div>
                      <div className="font-[Inter,sans-serif] text-[13px] font-medium text-[#555] whitespace-nowrap">
                        {comp.strengths[0].name}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-auto pt-[14px]">
                      <span className="font-[Inter,sans-serif] text-[12px] text-[#ccc]">
                        Est. {comp.year}
                      </span>
                      <span
                        className="font-[Inter,sans-serif] text-[11px] font-semibold opacity-60"
                        style={{ color: comp.priority === "High" ? colors.primary : "#999" }}
                      >
                        {comp.priority} Priority
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// POLICY ALIGNMENT SECTION
// ============================================================================

// ============================================================================
// GOVERNANCE & POLICY SECTION
// ============================================================================

const govPolicyCategories = [
  { id: "all", label: "All" },
  { id: "funding", label: "Direct Funding" },
  { id: "tax", label: "Tax Incentives" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "partnerships", label: "Partnerships" },
];

const catBadgeStyles = {
  funding: { bg: "rgba(184,217,53,0.15)", border: "rgba(184,217,53,0.3)" },
  tax: { bg: "rgba(27,77,62,0.07)", border: "rgba(27,77,62,0.15)" },
  infrastructure: { bg: "rgba(184,217,53,0.1)", border: "rgba(184,217,53,0.25)" },
  partnerships: { bg: "rgba(27,77,62,0.05)", border: "rgba(27,77,62,0.12)" },
};

const govPolicies = [
  {
    policy: "Ghana Skills Development Fund",
    body: "Ministry of Education / World Bank",
    allocation: "$200M",
    category: "funding",
    relevance: ["tvet"],
    alignment: "Largest skills initiative — comprehensive TVET and workforce training reform.",
    bridgeRole:
      "Co-funding partner for TVET expansion, leveraging BRIDGE delivery infrastructure and portfolio employment pipeline.",
    bridgeVentures: ["TVET Partnership Program", "Employment Guarantee Bootcamps"],
    pillars: ["Employer-responsive training", "Quality assurance", "Graduate tracking"],
  },
  {
    policy: "Free SHS Policy",
    body: "Ministry of Education",
    allocation: "GH₵4.2B (2026)",
    category: "funding",
    relevance: ["basic"],
    alignment: "Flagship access policy expanding secondary enrollment — creating a massive TVET-ready pipeline.",
    bridgeRole:
      "TVET pathway developer for the surge of SHS graduates entering the workforce, connecting credentials to careers.",
    bridgeVentures: ["Career Guidance Platform", "TVET Transition Pathways"],
    pillars: ["Post-SHS pathways", "Skills assessment", "Career counseling"],
  },
  {
    policy: "National Apprenticeship Programme",
    body: "Ministry of Education",
    allocation: "GH₵170M (2026)",
    category: "funding",
    relevance: ["tvet"],
    alignment: "Direct skills-to-jobs pipeline formalizing traditional apprenticeship at national scale.",
    bridgeRole:
      "Industry-facing complement connecting program graduates to BRIDGE portfolio company employment opportunities.",
    bridgeVentures: ["Apprenticeship Certification", "Master Craftsperson Network"],
    pillars: ["Curriculum alignment", "Placement services", "Continuing education"],
  },
  {
    policy: "Free TVET Policy",
    body: "CTVET / TVET Service",
    allocation: "47 institutions fee-free",
    category: "tax",
    relevance: ["tvet"],
    alignment: "Removes cost barrier — 47 public TVET institutions now fee-free, 32 new schools underway.",
    bridgeRole:
      "Quality enhancement partner for newly free institutions, providing equipment, curriculum, and industry connections.",
    bridgeVentures: ["TVET Equipment Leasing", "Industry Curriculum Co-Design"],
    pillars: ["Equipment modernization", "Instructor upskilling", "Industry partnerships"],
  },
  {
    policy: "National Coders Programme",
    body: "Ministry of Communications / National AI Strategy",
    allocation: "GH₵100M (2026)",
    category: "tax",
    relevance: ["tvet", "tertiary"],
    alignment: "Government-subsidized coding training targeting 1M Ghanaians — pillar of National AI Strategy.",
    bridgeRole:
      "Bootcamp delivery partner integrating BRIDGE technology portfolio employment pipeline for program graduates.",
    bridgeVentures: ["Digital Skills Bootcamps", "Tech Employment Pipeline"],
    pillars: ["Coding bootcamps", "Tech employment", "Startup pipeline"],
  },
  {
    policy: "Teacher Trainee Allowances",
    body: "Ministry of Education",
    allocation: "GH₵207M (2026)",
    category: "tax",
    relevance: ["basic"],
    alignment: "Direct government subsidy sustaining the educator pipeline — critical for rural retention.",
    bridgeRole:
      "ICT training integration for teacher trainees, ensuring graduates can deliver digital-age instruction.",
    bridgeVentures: ["Teacher ICT Certification", "Rural Educator Support"],
    pillars: ["Digital pedagogy", "Rural deployment", "Retention incentives"],
  },
  {
    policy: "Smart Schools Project",
    body: "Ministry of Education",
    allocation: "1.3M tablets deployed",
    category: "infrastructure",
    relevance: ["basic", "tertiary"],
    alignment: "Digital infrastructure foundation — 1.3M tablets deployed for technology-enabled learning.",
    bridgeRole:
      "Digital skills content delivery and employment-linked learning platform integration across Smart Schools network.",
    bridgeVentures: ["Digital Skills Bootcamps", "EdTech Investment Fund"],
    pillars: ["Content delivery", "Digital assessment", "Teacher ICT training"],
  },
  {
    policy: "Basic Education Infrastructure",
    body: "Ministry of Education",
    allocation: "GH₵2.0B (2026)",
    category: "infrastructure",
    relevance: ["basic"],
    alignment: "Massive build-out — 200 JHS, 200 primary, 200 KG facilities driving construction skills demand.",
    bridgeRole:
      "Construction skills training pipeline supplying certified workers for government infrastructure projects.",
    bridgeVentures: ["Construction Certification", "Kejetia Vendor Training"],
    pillars: ["Trades training", "Artisan certification", "Project placement"],
  },
  {
    policy: "GSLIP — End Double-Track",
    body: "Ministry of Education",
    allocation: "GH₵1.1B (2026)",
    category: "infrastructure",
    relevance: ["basic"],
    alignment: "Eliminates double-track system through infrastructure expansion — improving learning time.",
    bridgeRole:
      "Quality improvement partner ensuring expanded facilities include ICT labs, libraries, and TVET workshops.",
    bridgeVentures: ["School ICT Lab Program", "TVET Workshop Builds"],
    pillars: ["Quality improvement", "ICT integration", "TVET access"],
  },
  {
    policy: "Mastercard Foundation Scholars",
    body: "Development Partner",
    allocation: "Multi-year, $500M+ Africa-wide",
    category: "partnerships",
    relevance: ["tertiary"],
    alignment: "Leading scholarship and youth employment funder with substantial Ghana presence — university focus.",
    bridgeRole:
      "Complementary pipeline — Mastercard funds university scholarships, BRIDGE delivers vocational training and employment.",
    bridgeVentures: ["Service-Linked Scholarships", "Graduate Employment Pipeline"],
    pillars: ["Scholar transition", "Impact measurement", "Co-funding"],
  },
  {
    policy: "GIZ TVET Programs",
    body: "German Development Cooperation",
    allocation: "Technical assistance",
    category: "partnerships",
    relevance: ["tvet"],
    alignment: "German dual training expertise and institutional strengthening for TVET quality improvement.",
    bridgeRole:
      "Co-implementation of dual training model adding BRIDGE employment pipeline and private sector delivery capacity.",
    bridgeVentures: ["TVET Partnership Program", "Dual Training Model"],
    pillars: ["Quality standards", "Industry linkage", "Sustainability"],
  },
  {
    policy: "CTVET — National TVET Authority",
    body: "Government of Ghana (Act 1023)",
    allocation: "National mandate",
    category: "partnerships",
    relevance: ["tvet"],
    alignment: "Regulatory body for all TVET — oversees NTVETQF, accredits institutions, coordinates development.",
    bridgeRole:
      "Accreditation partner for all BRIDGE TVET programs, apprenticeship recognition, and quality standard alignment.",
    bridgeVentures: ["Apprenticeship Certification", "TVET Partnership Program"],
    pillars: ["Accreditation", "Quality assurance", "Recognition pathway"],
  },
];

const GovPolicyCard = ({ policy, index, isExpanded, onToggle }) => {
  const isMobile = useIsMobile();
  const badge = catBadgeStyles[policy.category] || catBadgeStyles.funding;
  const catLabel = govPolicyCategories.find((c) => c.id === policy.category)?.label || policy.category;
  const relevanceLabels = { basic: "Basic", tertiary: "Tertiary", tvet: "TVET" };

  return (
    <div
      onClick={onToggle}
      className="rounded-2xl shrink-0 cursor-pointer transition-all duration-300 flex flex-col"
      style={{
        ...(isMobile
          ? { width: "100%" }
          : { minWidth: isExpanded ? "380px" : "280px", maxWidth: isExpanded ? "380px" : "280px" }),
        backgroundColor: colors.background,
        border: isExpanded ? `2px solid ${colors.accent}` : `1.5px solid ${colors.line}`,
      }}
    >
      {/* Main card content */}
      <div className="p-5 flex flex-col">
        <div className="flex justify-between items-center mb-[14px]">
          <span
            className="text-[9px] font-bold uppercase tracking-[1px] font-[Inter,sans-serif] rounded-full py-1 px-[10px]"
            style={{
              color: colors.primary,
              backgroundColor: badge.bg,
              border: `1px solid ${badge.border}`,
            }}
          >
            {catLabel}
          </span>
          <div className="flex gap-1">
            {(policy.relevance || []).map((r) => (
              <span
                key={r}
                className="text-[9px] font-semibold uppercase tracking-[0.5px] font-[Inter,sans-serif] text-[#888] rounded-full py-[3px] px-2"
                style={{
                  backgroundColor: colors.white,
                  border: `1px solid ${colors.line}`,
                }}
              >
                {relevanceLabels[r] || r}
              </span>
            ))}
          </div>
        </div>

        <div className="min-h-[42px] mb-2">
          <h4
            className="font-[Inter,sans-serif] text-[16px] font-bold leading-[1.35] m-0"
            style={{ color: colors.primary }}
          >
            {policy.policy}
          </h4>
        </div>

        <div
          className="font-[Inter,sans-serif] text-[13px] font-bold mb-[10px]"
          style={{ color: colors.accent }}
        >
          {policy.allocation}
        </div>

        <div className="min-h-[40px] mb-3">
          <p
            className="font-[Inter,sans-serif] text-[13px] text-[#666] leading-[1.5] m-0 overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {policy.alignment}
          </p>
        </div>

        <div
          className="mt-auto flex items-center gap-1.5 font-[Inter,sans-serif] text-[12px] font-semibold"
          style={{ color: colors.primary }}
        >
          {isExpanded ? "BRIDGE alignment \u25BE" : "BRIDGE alignment \u25B8"}
        </div>
      </div>

      {/* Expanded content */}
      <div
        className="overflow-hidden"
        style={{
          maxHeight: isExpanded ? "600px" : "0",
          opacity: isExpanded ? 1 : 0,
          transition: "max-height 0.35s ease, opacity 0.3s ease",
        }}
      >
        <div className="p-5" style={{ borderTop: `1px solid ${colors.line}` }}>
          <div className="font-[Inter,sans-serif] text-[11px] text-[#888] mb-[10px] uppercase tracking-[0.5px]">
            {policy.body}
          </div>

          <p className="font-[Inter,sans-serif] text-[13px] text-[#444] leading-[1.55] mt-0 mb-[14px]">
            {policy.bridgeRole}
          </p>

          {policy.pillars && policy.pillars.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-[14px]">
              {policy.pillars.map((p) => (
                <span
                  key={p}
                  className="font-[Inter,sans-serif] text-[10px] font-bold rounded-full uppercase tracking-[0.5px] py-[5px] px-3"
                  style={{
                    color: colors.primary,
                    backgroundColor: colors.accentLight,
                    border: `1px solid ${colors.accent}`,
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          )}

          {policy.bridgeVentures && policy.bridgeVentures.length > 0 && (
            <div className="flex flex-col gap-1.5">
              {policy.bridgeVentures.map((v) => (
                <div
                  key={v}
                  className="rounded-[10px] flex items-center gap-[10px]"
                  style={{
                    backgroundColor: colors.primary,
                    padding: "12px 14px",
                  }}
                >
                  <div
                    className="w-[7px] h-[7px] rounded-full shrink-0"
                    style={{ backgroundColor: colors.accent }}
                  />
                  <span
                    className="font-[Inter,sans-serif] text-[13px] font-semibold"
                    style={{ color: colors.white }}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PolicyAlignmentSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);
  const [showAllPolicies, setShowAllPolicies] = useState(false);
  const isMobile = useIsMobile();

  const filtered = activeCategory === "all" ? govPolicies : govPolicies.filter((p) => p.category === activeCategory);

  const visiblePolicies = filtered;

  return (
    <section
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "60px 20px" : "100px 80px",
        overflow: "hidden",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Header */}
        <div style={{ textAlign: isMobile ? "left" : "center", marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] px-5 py-[10px]"
            style={{
              backgroundColor: colors.white,
              color: colors.primary,
              border: `1px solid ${colors.line}`,
            }}
          >
            The Governance & Policy
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[900px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
              margin: isMobile ? "24px 0 20px 0" : "24px auto 20px auto",
            }}
          >
            Moving in Step with Ghana's <span className="font-semibold">Education</span>{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>Reform</span>
          </h2>
          <p
            className="font-[Inter,sans-serif] leading-[1.65] text-[#555] max-w-[750px]"
            style={{
              fontSize: isMobile ? "15px" : "16px",
              margin: isMobile ? "0 0 24px 0" : "0 auto 32px auto",
            }}
          >
            From the World Bank's $200M Skills Development Fund to the GH₵4.2B Free SHS commitment, every BRIDGE venture
            maps to an active government policy or institutional priority.
          </p>

          {/* Category filter pills — Impact filter style */}
          <div
            className="flex"
            style={{ justifyContent: isMobile ? "flex-start" : "center" }}
          >
            <div
              className="inline-flex items-center rounded-full"
              style={{
                gap: isMobile ? "6px" : "12px",
                border: `1px solid ${colors.line}`,
                padding: isMobile ? "4px" : "5px",
                backgroundColor: colors.white,
                ...(isMobile ? { overflowX: "auto", WebkitOverflowScrolling: "touch" } : {}),
              }}
            >
              {govPolicyCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                const mobileLabels = {
                  all: "All",
                  funding: "Funding",
                  tax: "Tax Incentives",
                  infrastructure: "Infrastructure",
                  partnerships: "Partners",
                };
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setExpandedCard(null);
                      setShowAllPolicies(false);
                    }}
                    className="rounded-full font-[Inter,sans-serif] cursor-pointer transition-all duration-200 whitespace-nowrap shrink-0"
                    style={{
                      backgroundColor: isActive ? colors.accentLight : "transparent",
                      color: isActive ? colors.primary : "#999",
                      fontWeight: isActive ? "700" : "500",
                      border: isActive ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                      padding: isMobile ? "5px 8px" : "6px 14px",
                      fontSize: isMobile ? "10px" : "12px",
                    }}
                  >
                    {isMobile ? mobileLabels[cat.id] || cat.label : cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scrollable Card Row */}
        <style>{`
        .policy-scroll::-webkit-scrollbar { display: none; }
        .policy-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
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
                  marginBottom: "24px",
                }
              : {
                  overflowX: "auto",
                  paddingBottom: "12px",
                  marginBottom: "32px",
                }
          }
        >
          <div
            style={
              isMobile
                ? { display: "contents" }
                : {
                    display: "inline-flex",
                    gap: "16px",
                    minWidth: "100%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }
            }
          >
            {visiblePolicies.map((policy, i) => (
              <div
                key={policy.policy}
                style={isMobile ? { minWidth: "100%", maxWidth: "100%", flexShrink: 0, scrollSnapAlign: "start" } : {}}
              >
                <GovPolicyCard
                  policy={policy}
                  index={i}
                  isExpanded={expandedCard === i}
                  onToggle={() => setExpandedCard(expandedCard === i ? null : i)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-1.5 mb-6">
          {visiblePolicies.map((_, i) => (
            <div
              key={i}
              className="h-2 rounded cursor-pointer transition-all duration-300"
              style={{
                width: i === 0 ? "24px" : "8px",
                backgroundColor: i === 0 ? colors.accent : colors.line,
              }}
            />
          ))}
        </div>

        {/* Bottom CTA Bar */}
        <div
          className="flex gap-4 text-left"
          style={{
            backgroundColor: colors.primary,
            borderRadius: isMobile ? "12px" : "16px",
            padding: isMobile ? "24px 20px" : "28px 32px",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: isMobile ? "center" : "space-between",
            alignItems: isMobile ? "flex-start" : "center",
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
            <div
              className="font-[Inter,sans-serif] text-white/60"
              style={{ fontSize: isMobile ? "13px" : "14px" }}
            >
              Every venture aligns with at least one active government policy or initiative.
            </div>
          </div>
          <button
            className="border-none rounded-full text-[13px] font-bold font-[Inter,sans-serif] cursor-pointer whitespace-nowrap px-6 py-3"
            style={{
              backgroundColor: colors.accent,
              color: colors.primary,
              ...(isMobile ? { alignSelf: "center" } : {}),
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
// CROSS-SECTOR INTEGRATION SECTION
// ============================================================================

const crossSectorData = [
  {
    sectorId: 4,
    name: "Technology & Innovation",
    connection: "Digital skills, coding bootcamps, EdTech",
    multiplier: "4.1x",
    synergies: [
      "Bootcamp graduates feed BRIDGE tech portfolio companies",
      "EdTech fund supports education delivery innovation",
      "One Million Coders alignment through BRIDGE employment",
    ],
    bridgeVentures: ["Digital Skills Bootcamps", "EdTech Investment Fund"],
    impact:
      "Skilled graduates create a direct talent pipeline for Ghana's growing tech ecosystem, accelerating digital transformation across every BRIDGE sector",
  },
  {
    sectorId: 3,
    name: "Health Systems",
    connection: "Nursing scholarships, health tech training",
    multiplier: "3.5x",
    synergies: [
      "Service-linked scholarships build healthcare workforce",
      "Medical equipment technician certification programs",
      "Community health worker training for rural delivery",
    ],
    bridgeVentures: ["Nursing Scholarships", "Health Tech Training"],
    impact:
      "Trained health professionals strengthen Ghana's care delivery infrastructure, creating a sustainable workforce pipeline for hospitals and community clinics",
  },
  {
    sectorId: 1,
    name: "Infrastructure",
    connection: "Kejetia vendor training, construction trades",
    multiplier: "2.8x",
    synergies: [
      "Business and digital literacy for 10,000+ traders",
      "Artisan skills development for infrastructure projects",
      "Financial planning and operations for market vendors",
    ],
    bridgeVentures: ["Kejetia Vendor Training", "Construction Certification"],
    impact:
      "Skilled artisans and trained vendors multiply the value of every infrastructure investment, ensuring facilities are operated and maintained effectively",
  },
  {
    sectorId: 6,
    name: "Agriculture & Value Chains",
    connection: "Processing skills, equipment operation",
    multiplier: "3.0x",
    synergies: [
      "Modern agricultural techniques for 5,000+ extension workers",
      "Business skills for smallholder farmers and cooperatives",
      "Post-harvest and food processing certification programs",
    ],
    bridgeVentures: ["Extension Officer Training", "Agribusiness Management"],
    impact:
      "Trained agricultural professionals reduce post-harvest losses and increase farm productivity, strengthening food security and rural livelihoods",
  },
  {
    sectorId: 2,
    name: "Financial Inclusion",
    connection: "Financial literacy bootcamps, fintech skills",
    multiplier: "2.6x",
    synergies: [
      "Integrated financial skills across BRIDGE training programs",
      "Digital financial services skills for market vendors",
      "Business planning and credit readiness for graduates",
    ],
    bridgeVentures: ["Financial Literacy Curriculum", "Mobile Money Training"],
    impact:
      "Financially literate graduates and trained mobile money agents extend financial services deeper into communities, enabling savings, credit, and enterprise growth",
  },
];

const crossSectorIcons = {
  5: <IconGraduation />,
  4: <Cpu size={24} strokeWidth={1.5} />,
  3: <IconCross />,
  1: <Blocks size={24} strokeWidth={1.5} />,
  6: <IconSprout />,
  2: <IconWallet />,
};

const crossSectorShortNames = ["Technology", "Health", "Infrastructure", "Agriculture", "Financial"];
const crossSectorMobileNames = ["Tech", "Health", "Infra", "Agric", "Finance"];

const crossSectorPathLabels = [
  "Education → Digital Skills Pipeline → Tech Employment",
  "Education → Health Training → Care Delivery",
  "Education → Trade Certification → Infrastructure Quality",
  "Education → Extension Training → Agricultural Productivity",
  "Education → Financial Literacy → Economic Inclusion",
];

const CrossSectorSection = () => {
  const [activeNode, setActiveNode] = useState(null);
  const [showMoreRipple, setShowMoreRipple] = useState(false);
  const isMobile = useIsMobile();
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

  const pathways = crossSectorData.map((sector, i) => ({
    ...sector,
    icon: crossSectorIcons[sector.sectorId],
    pathLabel: crossSectorPathLabels[i],
  }));

  return (
    <section
      style={{
        backgroundColor: colors.primary,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Section Header */}
        <div style={{ marginBottom: isMobile ? "32px" : "60px", textAlign: isMobile ? "center" : "left" }}>
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6 px-5 py-[10px]"
            style={{
              backgroundColor: "rgba(184, 217, 53, 0.15)",
              color: colors.accent,
            }}
          >
            The Ripple Effect
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[820px] mt-0 mb-5"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.white,
            }}
          >
            How Education <span className="font-semibold" style={{ color: colors.accent }}>Amplifies Impact</span> Across Every
            Sector
          </h2>
          <p
            className="font-[Inter,sans-serif] leading-[1.65] text-white/60 m-0 max-w-[680px]"
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
            Every BRIDGE venture depends on skilled people — education is the foundational enabler that multiplies
            impact across the entire portfolio. Explore how one investment in human capital becomes many.
          </p>
        </div>

        {/* ============ PATHWAY VISUAL ============ */}
        {isMobile ? (
          /* ---- MOBILE: Hub on top, 5 icons below ---- */
          <div className="mb-6">
            {/* Hub Icon */}
            <div className="flex flex-col items-center mb-4">
              <div
                className="w-14 h-14 rounded-[14px] flex items-center justify-center mb-1.5"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.primary,
                  boxShadow: "0 0 24px rgba(184, 217, 53, 0.3)",
                }}
              >
                <IconGraduation />
              </div>
              <span
                className="font-[Inter,sans-serif] text-[11px] font-bold uppercase tracking-[0.5px]"
                style={{ color: colors.accent }}
              >
                Education
              </span>
            </div>

            {/* 5 Sector Icons Row */}
            <div className="flex justify-center gap-3">
              {pathways.map((p, i) => {
                const isActive = activeNode === i;
                return (
                  <div
                    key={i}
                    onClick={() => {
                      setActiveNode(isActive ? null : i);
                      setShowMoreRipple(false);
                    }}
                    className="flex flex-col items-center cursor-pointer transition-all duration-300"
                    style={{ opacity: activeNode !== null && !isActive ? 0.4 : 1 }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 mb-1.5"
                      style={{
                        backgroundColor: isActive ? colors.accent : "rgba(255,255,255,0.08)",
                        border: isActive ? "none" : "1px solid rgba(255,255,255,0.1)",
                        color: isActive ? colors.primary : "rgba(255,255,255,0.6)",
                      }}
                    >
                      {p.icon}
                    </div>
                    <span
                      className="font-[Inter,sans-serif] text-[10px] font-semibold text-center max-w-[58px] leading-[1.2] transition-all duration-300"
                      style={{ color: isActive ? colors.white : "rgba(255,255,255,0.5)" }}
                    >
                      {crossSectorMobileNames[i]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ---- DESKTOP: Horizontal icon row ---- */
          <div className="flex items-start justify-center gap-8 mb-12">
            {/* Hub Icon */}
            <div className="flex flex-col items-center w-[120px] shrink-0">
              <div
                className="w-20 h-20 rounded-[20px] flex items-center justify-center mb-[10px]"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.primary,
                  boxShadow: "0 0 30px rgba(184, 217, 53, 0.3)",
                }}
              >
                <IconGraduation />
              </div>
            </div>

            {/* 5 Sector Nodes */}
            {pathways.map((p, i) => {
              const isActive = activeNode === i;
              return (
                <div
                  key={i}
                  onClick={() => setActiveNode(isActive ? null : i)}
                  className="flex flex-col items-center w-[120px] cursor-pointer transition-all duration-300"
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
                    {p.icon}
                  </div>
                  <span
                    className="font-[Inter,sans-serif] text-[13px] font-semibold text-center transition-all duration-300 whitespace-nowrap"
                    style={{ color: isActive ? colors.white : "rgba(255,255,255,0.5)" }}
                  >
                    {crossSectorShortNames[i]}
                  </span>
                  <span
                    className="font-[Poppins,sans-serif] text-[20px] font-bold mt-1 transition-all duration-300"
                    style={{ color: isActive ? colors.accent : "rgba(255,255,255,0.3)" }}
                  >
                    {p.multiplier}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* ============ DETAIL PANEL ============ */}
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
            /* ---- DEFAULT STATE ---- */
            isMobile ? (
              <div className="text-center py-5">
                <p className="font-[Inter,sans-serif] text-[15px] text-white/50 m-0 leading-[1.6]">
                  Tap a sector above to explore how education amplifies its impact
                </p>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-[Inter,sans-serif] text-[16px] font-semibold" style={{ color: colors.white }}>
                    Cross-Sector Integration Opportunities
                  </span>
                  <span className="font-[Inter,sans-serif] text-[13px] text-white/40">
                    Click a sector above to explore
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {pathways.map((p, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveNode(i)}
                      className="rounded-2xl cursor-pointer transition-all duration-300 bg-[rgba(255,255,255,0.05)] py-6 px-5"
                    >
                      <div className="font-[Inter,sans-serif] text-[14px] font-semibold mb-2" style={{ color: colors.white }}>
                        {p.name}
                      </div>
                      <div className="font-[Inter,sans-serif] text-[13px] text-white/45 h-10 overflow-hidden leading-[1.5] mb-3">
                        {p.connection}
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-[Poppins,sans-serif] text-[18px] font-bold" style={{ color: colors.accent }}>
                          {p.multiplier}
                        </span>
                        <span className="font-[Inter,sans-serif] text-[11px] text-white/40">
                          multiplier
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ) : (
            /* ---- ACTIVE STATE ---- */
            <div>
              {/* Breadcrumb Path */}
              <div className="flex items-center gap-2 flex-wrap mb-7">
                {pathways[activeNode].pathLabel.split(" → ").map((step, i, arr) => (
                  <React.Fragment key={i}>
                    <span
                      className="font-[Inter,sans-serif] text-[13px] rounded-[20px] px-[14px] py-1.5"
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

              {/* 3-Column Detail Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                  gap: isMobile ? "24px" : "32px",
                }}
              >
                {/* Column 1: Why It Matters (always visible) */}
                <div>
                  <h4 className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1px] mt-0 mb-4" style={{ color: colors.accent }}>
                    Why It Matters
                  </h4>
                  <p className="font-[Inter,sans-serif] text-[15px] text-white/70 leading-[1.6] mt-0 mb-5">
                    {pathways[activeNode].impact}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-[Poppins,sans-serif] text-[32px] font-bold" style={{ color: colors.accent }}>
                      {pathways[activeNode].multiplier}
                    </span>
                    <span className="font-[Inter,sans-serif] text-[13px] text-white/40">
                      value multiplier
                    </span>
                  </div>
                </div>

                {/* Column 2: Synergy Pathways (collapsible on mobile) */}
                {(!isMobile || showMoreRipple) && (
                  <div>
                    <h4 className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1px] mt-0 mb-4" style={{ color: colors.accent }}>
                      Synergy Pathways
                    </h4>
                    <div className="flex flex-col gap-[10px]">
                      {pathways[activeNode].synergies.map((syn, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 rounded-[10px] py-3 px-4 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.06)]"
                        >
                          <span className="text-[8px] shrink-0" style={{ color: colors.accent }}>●</span>
                          <span className="font-[Inter,sans-serif] text-[14px] text-white/75 leading-[1.3] whitespace-nowrap overflow-hidden text-ellipsis">
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
                    <h4 className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1px] mt-0 mb-4" style={{ color: colors.accent }}>
                      Linked Ventures
                    </h4>
                    <div className="flex flex-col gap-[10px]">
                      {pathways[activeNode].bridgeVentures.map((v, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center rounded-xl py-[14px] px-[18px] bg-[rgba(184,217,53,0.1)] border border-[rgba(184,217,53,0.15)]"
                        >
                          <span className="font-[Inter,sans-serif] text-[14px] font-semibold" style={{ color: colors.white }}>
                            {v}
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
                      Explore {pathways[activeNode].name} Sector →
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile Toggle Button */}
              {isMobile && (
                <button
                  onClick={() => setShowMoreRipple(!showMoreRipple)}
                  className="w-full p-[14px] bg-transparent border border-white/15 rounded-xl font-[Inter,sans-serif] text-[14px] font-semibold cursor-pointer flex items-center justify-center gap-2 mt-4"
                  style={{ color: colors.white }}
                >
                  {showMoreRipple ? "Show less" : "Show more details"}
                  <ChevronDown size={14} strokeWidth={2} color="white" style={{
                      transform: showMoreRipple ? "rotate(180deg)" : "rotate(0deg)",
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

// INVESTMENT CTA SECTION
// ============================================================================

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
      { label: "Flagship Ventures", value: "20-30%", detail: "Skills bootcamps and TVET with employer demand" },
      { label: "Scaling Ventures", value: "15-20%", detail: "EdTech platforms and scholarships, compounding" },
      { label: "Portfolio IRR", value: "15-25%", detail: "Blended across 19 employment-linked ventures" },
      { label: "Dev. Leverage", value: "5-8x", detail: "Lifetime earnings uplift per dollar deployed" },
    ],
    timeline: [
      { label: "Phase 1 (Q1-Q2)", value: "Foundation", detail: "TVET partnerships, bootcamp curriculum, scholarships" },
      { label: "Phase 2 (Q3-Q4)", value: "Scale", detail: "Cohort placements, EdTech beta, equipment rollout" },
      {
        label: "Phase 3 (2027+)",
        value: "Expansion",
        detail: "Regional TVET replication, fellowships, digital to 10K+",
      },
      { label: "Exit Horizon", value: "5-7 yrs", detail: "Training center assets, franchise models, acquisition" },
    ],
    impact: [
      { label: "Learners Reached", value: "50K+", detail: "Training, bootcamps, scholarships, digital programs" },
      { label: "Jobs Connected", value: "10K+", detail: "Placed through employer partnerships and systems" },
      { label: "TVET Upgraded", value: "20+", detail: "Industry equipment, updated curricula, linkages" },
      { label: "Teachers Trained", value: "500+", detail: "Fellowships, ICT certification, pedagogy training" },
    ],
  };

  const audiences = [
    {
      key: "entrepreneur",
      label: "Entrepreneur",
      shortLabel: "Founder",
      icon: <IconStorefront />,
      headline: "Build Training Ventures That Transform Careers",
      pitch:
        "BRIDGE provides validated training models, employer commitments, and curriculum frameworks so you can launch education ventures with de-risked market entry and clear paths to sustainable revenue.",
      stats: [
        { value: "19", label: "Venture Paths", detail: "validated models" },
        { value: "50K+", label: "Learner Pipeline", detail: "addressable market" },
        { value: "Full", label: "BRIDGE Support", detail: "incubation to scale" },
      ],
      pathways: [
        {
          bring: "Local knowledge & training capacity",
          get: "Venture blueprints, employer networks, decision frameworks",
        },
        { bring: "Community relationships & trust", get: "TVET access, government partnerships, working capital" },
        {
          bring: "Execution commitment & accountability",
          get: "Technical assistance, placement tracking, scale-up support",
        },
      ],
    },
    {
      key: "business",
      label: "Business Entity",
      shortLabel: "Business",
      icon: <IconOfficeBuilding />,
      headline: "Secure Your Talent Pipeline in Ghana's Growth",
      pitch:
        "Partner with BRIDGE to co-design training programs that deliver job-ready graduates directly into your workforce — reducing hiring costs while contributing to national human capital development.",
      stats: [
        { value: "$16-33M", label: "Capital Range", detail: "across 19 ventures" },
        { value: "80%+", label: "Placement Rate", detail: "target employment" },
        { value: "10M+", label: "Addressable", detail: "learners to reach" },
      ],
      pathways: [
        { bring: "Hiring commitments & apprentice slots", get: "Trained graduates, customized curriculum alignment" },
        { bring: "Technical expertise & equipment", get: "Co-developed training programs, certification standards" },
        {
          bring: "Corporate social responsibility alignment",
          get: "Impact reporting, ESG metrics, workforce documentation",
        },
      ],
    },
    {
      key: "investor",
      label: "Investor",
      shortLabel: "Investor",
      icon: <IconTrendingUp />,
      headline: "Human Capital Assets With Impact Returns",
      pitch:
        "Deploy capital into education ventures with transparent governance, employment-linked revenue, and measurable development outcomes — backed by government programs and employer demand.",
      stats: [
        { value: "15-25%", label: "Target IRR", detail: "blended portfolio" },
        { value: "3.0x", label: "Multiple", detail: "capital appreciation" },
        { value: "12-18mo", label: "First Cash", detail: "revenue timeline" },
      ],
      pathways: [
        {
          bring: "Growth capital & patient deployment",
          get: "Employment-linked returns, training assets, exit pathways",
        },
        { bring: "Sector expertise & strategic guidance", get: "Board participation, oversight, co-investment access" },
        { bring: "Network access & deal flow", get: "First-look rights on expansion, geographic replication" },
      ],
    },
    {
      key: "government",
      label: "Government",
      shortLabel: "Gov't",
      icon: <IconLandmark />,
      headline: "Deliver Skills Without Fiscal Strain",
      pitch:
        "BRIDGE ventures align with Ghana Jobs & Skills Project priorities — delivering TVET modernization, digital skills, and employment pathways through private capital while expanding the workforce.",
      stats: [
        { value: "10K+", label: "Jobs Created", detail: "direct placement" },
        { value: "95%", label: "Private Capital", detail: "no fiscal burden" },
        { value: "5-8x", label: "Earnings Uplift", detail: "per graduate" },
      ],
      pathways: [
        { bring: "Policy alignment & TVET accreditation", get: "Private delivery meeting Jobs & Skills targets" },
        {
          bring: "Institutional access & curriculum approval",
          get: "Job creation, youth employment, productivity outcomes",
        },
        { bring: "Community endorsement & legitimacy", get: "Transparent reporting, development outcomes data" },
      ],
    },
  ];

  const activeAudienceData = audiences[activeAudience];

  return (
    <section
      style={{
        backgroundColor: colors.background,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Section Header */}
        <div
          style={{
            textAlign: isMobile ? "center" : "left",
            marginBottom: isMobile ? "32px" : "60px",
          }}
        >
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6 px-5 py-[10px]"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
            }}
          >
            The Investment Thesis
          </span>

          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[900px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
              margin: isMobile ? "0 auto 16px" : "0 0 16px",
            }}
          >
            Every Stakeholder Has a Role in Building{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>Ghana's Talent</span>
          </h2>

          <p
            className="font-[Inter,sans-serif] text-[16px] text-[#666] leading-[1.65] max-w-[680px]"
            style={{ margin: isMobile ? "0 auto" : 0 }}
          >
            Investment isn't only capital — it's expertise, partnerships, policy, and vision. See how your role
            contributes to 19 ventures across $16.5-33.5M in opportunity.
          </p>
        </div>

        {/* Audience Selector */}
        {isMobile ? (
          <div className="flex justify-center gap-3 mb-6">
            {audiences.map((aud, idx) => {
              const isActive = activeAudience === idx;
              return (
                <button
                  key={aud.key}
                  onClick={() => setActiveAudience(idx)}
                  className="flex flex-col items-center gap-[6px] bg-none border-none p-2 cursor-pointer transition-all duration-200"
                  style={{
                    opacity: isActive ? 1 : 0.4,
                  }}
                >
                  <div
                    className="w-[44px] h-[44px] rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{
                      backgroundColor: isActive ? colors.accentLight : "transparent",
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
                  className="flex items-center gap-2 py-3 px-6 rounded-full font-[Inter,sans-serif] text-sm cursor-pointer transition-all duration-[250ms] shrink-0 border-none"
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

        {/* Two-Column Content Grid */}
        <div
          className="grid items-stretch"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "24px" : "48px",
          }}
        >
          {/* LEFT COLUMN: Audience Content */}
          <div className="flex flex-col h-full">
            {/* Headline (Desktop Only) */}
            {!isMobile && (
              <h3
                className="font-[Inter,sans-serif] text-[32px] font-light leading-[1.25] tracking-[-0.3px] m-0 mb-4"
                style={{ color: colors.primary }}
              >
                {activeAudienceData.headline}
              </h3>
            )}

            {/* Pitch (Desktop Only) */}
            {!isMobile && (
              <p className="font-[Inter,sans-serif] text-[15px] text-[#555] leading-[1.7] m-0 mb-6">
                {activeAudienceData.pitch}
              </p>
            )}

            {/* Stat Cards */}
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
                  className="flex items-start gap-3 py-3 px-4 rounded-[10px]"
                  style={{
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.line}`,
                  }}
                >
                  <div className="flex flex-col gap-1 flex-1 overflow-hidden">
                    <div
                      className="font-[Inter,sans-serif] text-xs font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
                      style={{ color: colors.primary }}
                    >
                      {path.bring}
                    </div>
                    <div className="font-[Inter,sans-serif] text-xs text-[#777] whitespace-nowrap overflow-hidden text-ellipsis">
                      {path.get}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Validation Bar */}
            <div className="py-[14px] px-[18px] bg-[rgba(27,77,62,0.06)] rounded-xl flex items-center gap-3">
              <div className="shrink-0 flex" style={{ color: colors.primary }}>
                <IconCheck />
              </div>
              <div className="font-[Inter,sans-serif] text-[13px] text-[#444] leading-[1.5]">
                <strong style={{ color: colors.primary }}>Ministry of Education & CTVET</strong> aligned with national
                TVET Transformation and Jobs & Skills Project objectives
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Returns / Timeline / Impact Panel */}
          {(!isMobile || showInvestmentDetails) && (
            <div
              className="flex flex-col h-full box-border"
              style={{
                backgroundColor: colors.primary,
                borderRadius: isMobile ? "16px" : "20px",
                padding: isMobile ? "20px" : "28px",
              }}
            >
              {/* Tab Selector */}
              <div className="flex bg-[rgba(255,255,255,0.08)] rounded-xl p-1 mb-5 shrink-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className="flex-1 border-none py-3 px-5 rounded-[10px] text-sm font-[Inter,sans-serif] cursor-pointer transition-all duration-200"
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
                    className="bg-[rgba(255,255,255,0.05)] rounded-xl flex-1"
                    style={{
                      padding: isMobile ? "16px" : "18px 20px",
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      gap: isMobile ? "10px" : "16px",
                      alignItems: isMobile ? "flex-start" : "center",
                      minHeight: isMobile ? "auto" : "0",
                    }}
                  >
                    <div
                      className="shrink-0 flex items-baseline"
                      style={{
                        width: isMobile ? "auto" : "140px",
                        gap: isMobile ? "10px" : "0",
                        flexDirection: isMobile ? "row" : "column",
                      }}
                    >
                      <div
                        className="font-[Poppins,sans-serif] font-bold leading-[1.1]"
                        style={{
                          fontSize: isMobile ? "20px" : "22px",
                          color: colors.accent,
                        }}
                      >
                        {item.value}
                      </div>
                      <div
                        className="font-[Inter,sans-serif] text-[9px] text-[rgba(255,255,255,0.35)] uppercase tracking-[0.5px] leading-[1.3]"
                        style={{ marginTop: isMobile ? "0" : "4px" }}
                      >
                        {item.label}
                      </div>
                    </div>
                    <div
                      className="font-[Inter,sans-serif] text-[13px] text-[rgba(255,255,255,0.7)] leading-[1.55] flex-1"
                      style={{
                        borderLeft: isMobile ? "none" : "1px solid rgba(255,255,255,0.1)",
                        borderTop: isMobile ? "1px solid rgba(255,255,255,0.08)" : "none",
                        paddingLeft: isMobile ? "0" : "16px",
                        paddingTop: isMobile ? "10px" : "0",
                      }}
                    >
                      {item.detail}
                    </div>
                  </div>
                ))}
              </div>

              {/* Prospectus Bar */}
              <div className="mt-4 py-[14px] px-5 bg-[rgba(255,255,255,0.05)] rounded-xl flex justify-between items-center shrink-0">
                <span className="font-[Inter,sans-serif] text-[13px] text-[rgba(255,255,255,0.45)]">
                  Full financial model available
                </span>
                <a
                  href="/resources"
                  onClick={(e) => { e.preventDefault(); navigate("/resources"); }}
                  className="font-[Inter,sans-serif] text-sm font-bold no-underline inline-flex items-center gap-[6px] shrink-0"
                  style={{ color: colors.accent }}
                >
                  Download Prospectus <span className="text-base">→</span>
                </a>
              </div>
            </div>
          )}

          {/* Mobile Toggle Button */}
          {isMobile && !showInvestmentDetails && (
            <button
              onClick={() => setShowInvestmentDetails(true)}
              className="flex items-center justify-center gap-2 w-full p-[14px] bg-transparent rounded-xl font-[Inter,sans-serif] text-sm font-semibold cursor-pointer"
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

// IMPACT SECTION
// ============================================================================

// ── Impact Data: Metrics (3 categories × 4 items) ──
const impactMetrics = [
  {
    category: "Economic",
    items: [
      {
        label: "Education Sector Investment",
        value: 4.2,
        suffix: "B",
        prefix: "GH₵",
        description: "Total government education spend including Free SHS and TVET expansion",
        trend: "Growing",
        ventures: "All Ventures",
      },
      {
        label: "Skills Development Fund",
        value: 200,
        suffix: "M",
        prefix: "$",
        description: "World Bank-backed workforce training reform and employer skills alignment",
        trend: "+12% YoY",
        ventures: "TVET · Bootcamps",
      },
      {
        label: "Youth Unemployment Gap",
        value: 12.6,
        suffix: "%",
        prefix: "",
        description: "National youth unemployment rate masking severe underemployment crisis",
        trend: "At risk",
        ventures: "Career · Bootcamps",
      },
      {
        label: "Development Leverage",
        value: 5,
        suffix: "-8x",
        prefix: "",
        description: "Lifetime earnings uplift per dollar deployed into skills training",
        trend: "Multiplier",
        ventures: "All Ventures",
      },
    ],
  },
  {
    category: "People",
    items: [
      {
        label: "Learners Reached",
        value: 50,
        suffix: "K+",
        prefix: "",
        description: "Training, bootcamps, scholarships, and digital programs combined reach",
        trend: "Target",
        ventures: "TVET · Bootcamps",
      },
      {
        label: "Jobs Connected",
        value: 10,
        suffix: "K+",
        prefix: "",
        description: "Placed through employer partnerships, portfolio hiring, and career systems",
        trend: "High priority",
        ventures: "Employment · Career",
      },
      {
        label: "TVET Institutions Upgraded",
        value: 20,
        suffix: "+",
        prefix: "",
        description: "Industry equipment, updated curricula, and employer linkage integration",
        trend: "Phased",
        ventures: "TVET · Equipment",
      },
      {
        label: "Teachers Trained",
        value: 500,
        suffix: "+",
        prefix: "",
        description: "Fellowships, ICT certification, and modern pedagogy training delivered",
        trend: "Near-term",
        ventures: "Fellowship · ICT",
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
        description: "Blended returns across 19 employment-linked education ventures",
        trend: "Target range",
        ventures: "All Ventures",
      },
      {
        label: "EdTech IRR Target",
        value: 15,
        suffix: "-25%",
        prefix: "",
        description: "Ghana-focused EdTech ventures in TVET content and job matching",
        trend: "High priority",
        ventures: "EdTech · Chalkboard",
      },
      {
        label: "First Revenue",
        value: 6,
        suffix: "-12mo",
        prefix: "",
        description: "Bootcamp and training ventures generate revenue within first year",
        trend: "Near-term",
        ventures: "Bootcamps · Career",
      },
      {
        label: "Capital Deployed",
        value: 16.5,
        suffix: "-33.5M",
        prefix: "$",
        description: "Total sector investment across all 19 education venture pathways",
        trend: "Phased",
        ventures: "All Ventures",
      },
    ],
  },
];

// ── Impact Data: Stakeholders (4 × 4 outcomes) ──
const impactStakeholders = [
  {
    title: "The Student",
    subtitle: "Students, trainees & career seekers",
    outcomes: [
      "Industry-aligned skills replace theory-only credentials",
      "Direct employer linkages shorten the path to employment",
      "Digital literacy opens doors to the growing tech economy",
      "Recognized certification validates informal apprenticeship",
    ],
    stat: "50K+",
    statLabel: "learners connected",
    highlight: "Skills-to-employment pipeline",
  },
  {
    title: "The Institution",
    subtitle: "TVET centers, universities & training providers",
    outcomes: [
      "Equipment modernization upgrades outdated workshop facilities",
      "Industry partnerships guarantee graduate placement rates",
      "Curriculum co-design aligns training with employer demand",
      "Revenue diversification through fee-based professional programs",
    ],
    stat: "20+",
    statLabel: "institutions upgraded",
    highlight: "Industry-grade TVET transformation",
  },
  {
    title: "The Government",
    subtitle: "Ministries, CTVET & local assemblies",
    outcomes: [
      "Private capital delivers TVET modernization at national scale",
      "Youth employment outcomes reduce social instability pressures",
      "Skills data informs national workforce planning and targets",
      "Aligned delivery of Jobs & Skills Development Fund objectives",
    ],
    stat: "95%",
    statLabel: "privately funded",
    highlight: "Policy-aligned private delivery",
  },
  {
    title: "The Investor",
    subtitle: "Impact & institutional capital",
    outcomes: [
      "Employment-linked returns with measurable social outcomes",
      "Training assets and franchise models provide collateral security",
      "ESG metrics track lives transformed per dollar deployed",
      "Scalable model replicable across West Africa education systems",
    ],
    stat: "15-25%",
    statLabel: "target IRR",
    highlight: "Employment-linked impact returns",
  },
];


const MetricRow = ({ item, index, animate }) => {
  const isMobile = useIsMobile();
  const counter = useCounter(item.value, 1200, animate);
  const hasDecimal = item.value % 1 !== 0;
  const formatted =
    item.value >= 1000
      ? Math.round(counter).toLocaleString()
      : hasDecimal
        ? counter.toFixed(1)
        : Math.round(counter).toString();

  return (
    <div
      className="relative"
      style={{
        display: isMobile ? "flex" : "grid",
        flexDirection: isMobile ? "column" : undefined,
        gridTemplateColumns: isMobile ? undefined : "200px 1fr 200px",
        gap: isMobile ? "8px" : "32px",
        padding: isMobile ? "16px" : "24px 28px",
        backgroundColor: index % 2 === 0 ? colors.white : "transparent",
        opacity: animate ? 1 : 0,
        transition: `opacity 0.4s ease ${index * 80}ms`,
      }}
    >
      {/* Trend tag — top-right on mobile, inline on desktop */}
      {isMobile && (
        <div
          className="absolute top-4 right-4 font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[0.5px]"
          style={{ color: colors.accent }}
        >
          {item.trend}
        </div>
      )}

      {/* Col 1: Number + Trend */}
      <div>
        <div
          className="font-[Poppins,sans-serif] font-bold tracking-[-1px] leading-[1.1]"
          style={{
            fontSize: isMobile ? "28px" : "36px",
            color: colors.primary,
          }}
        >
          {item.prefix}
          {formatted}
          {item.suffix}
        </div>
        {!isMobile && (
          <div
            className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[0.5px] mt-1"
            style={{ color: colors.accent }}
          >
            {item.trend}
          </div>
        )}
      </div>

      {/* Col 2: Label + Description */}
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

      {/* Col 3: Linked Ventures */}
      {!isMobile && (
        <div
          className="rounded-[10px] py-[10px] px-4 flex flex-col justify-center"
          style={{
            backgroundColor: index % 2 === 0 ? colors.background : "rgba(27,77,62,0.04)",
          }}
        >
          <div className="font-[Inter,sans-serif] text-[9px] font-bold text-[#aaa] uppercase tracking-[1px] mb-1">
            Linked Ventures
          </div>
          <div
            className="font-[Inter,sans-serif] text-[11px] font-medium leading-[1.4] whitespace-nowrap"
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
  const [view, setView] = useState("metrics");
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeStakeholder, setActiveStakeholder] = useState(0);
  const [animate, setAnimate] = useState(true);
  const isMobile = useIsMobile();

  const triggerAnimate = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 50);
  };

  const currentStakeholder = impactStakeholders[activeStakeholder];

  return (
    <section
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Section Header */}
        <div className="text-left mb-10">
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6 px-5 py-[10px]"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
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
            What Changes When <span className="font-semibold">Education</span>
            <br />
            <span className="font-semibold">Pathways</span>{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>Work</span>
          </h2>

          <p
            className="font-[Inter,sans-serif] text-[#555] leading-[1.7] m-0 mb-10 max-w-[700px]"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
          >
            When graduates find employment, vocational training matches market needs, and skills connect to careers —
            the ripple effects break poverty cycles, build family security, and power Ghana's human capital advantage.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex justify-start mb-6">
          {/* Container — outlined pill bar */}
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
                  className="border-none font-[Inter,sans-serif] cursor-pointer transition-all duration-200 rounded-full"
                  style={{
                    backgroundColor: view === v ? colors.white : "transparent",
                    color: view === v ? colors.primary : "#999",
                    fontWeight: view === v ? "700" : "500",
                    padding: isMobile ? "5px 10px" : "6px 14px",
                    fontSize: isMobile ? "11px" : "12px",
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
                    className="rounded-full font-[Inter,sans-serif] cursor-pointer transition-all duration-200 whitespace-nowrap shrink-0"
                    style={{
                      backgroundColor: activeCategory === i ? colors.accentLight : "transparent",
                      color: activeCategory === i ? colors.primary : "#999",
                      fontWeight: activeCategory === i ? "700" : "500",
                      border: activeCategory === i ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                      padding: isMobile ? "5px 8px" : "6px 14px",
                      fontSize: isMobile ? "10px" : "12px",
                    }}
                  >
                    {cat.category}
                  </button>
                ))
              : impactStakeholders.map((s, i) => (
                  <button
                    key={s.title}
                    onClick={() => {
                      setActiveStakeholder(i);
                    }}
                    className="rounded-full font-[Inter,sans-serif] cursor-pointer transition-all duration-200 whitespace-nowrap shrink-0"
                    style={{
                      backgroundColor: activeStakeholder === i ? colors.accentLight : "transparent",
                      color: activeStakeholder === i ? colors.primary : "#999",
                      fontWeight: activeStakeholder === i ? "700" : "500",
                      border: activeStakeholder === i ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                      padding: isMobile ? "5px 8px" : "6px 14px",
                      fontSize: isMobile ? "10px" : "12px",
                    }}
                  >
                    {s.title.split(" ")[1]}
                  </button>
                ))}
          </div>
        </div>

        {/* ── Metrics View ── */}
        {view === "metrics" && (
          <div
            className="rounded-[20px] overflow-hidden"
            style={{
              backgroundColor: colors.background,
              border: `2px solid ${colors.primary}`,
            }}
          >
            {impactMetrics[activeCategory].items.map((item, idx) => (
              <MetricRow key={`${activeCategory}-${idx}`} item={item} index={idx} animate={animate} />
            ))}
          </div>
        )}

        {/* ── Stakeholder View ── */}
        {view === "stakeholder" && (
          <div>
            {/* Title + Stat Header */}
            <div
              className="flex justify-between mb-6"
              style={{
                alignItems: isMobile ? "flex-start" : "center",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "12px" : "0",
              }}
            >
              <div>
                <div
                  className="font-[Inter,sans-serif] font-bold leading-[1.2]"
                  style={{
                    fontSize: isMobile ? "24px" : "28px",
                    color: colors.primary,
                  }}
                >
                  {currentStakeholder.title}
                </div>
                <div className="font-[Inter,sans-serif] text-sm text-[#888] mt-1">
                  {currentStakeholder.subtitle}
                </div>
              </div>
              <div style={{ textAlign: isMobile ? "left" : "right" }}>
                <div
                  className="font-[Poppins,sans-serif] font-bold tracking-[-1.5px] leading-none"
                  style={{
                    fontSize: isMobile ? "32px" : "40px",
                    color: colors.primary,
                  }}
                >
                  {currentStakeholder.stat}
                </div>
                <div className="font-[Inter,sans-serif] text-xs text-[#888] mt-1">
                  {currentStakeholder.statLabel}
                </div>
              </div>
            </div>

            {/* Outcome Rows */}
            <div className="flex flex-col gap-[6px]">
              {currentStakeholder.outcomes.map((outcome, i) => {
                const rowShades = [
                  { bg: "rgba(27, 77, 62, 0.07)", circle: colors.white },
                  { bg: "rgba(27, 77, 62, 0.04)", circle: "rgba(27, 77, 62, 0.06)" },
                  { bg: "rgba(184, 217, 53, 0.08)", circle: colors.white },
                  { bg: "rgba(184, 217, 53, 0.04)", circle: "rgba(184, 217, 53, 0.08)" },
                ];
                const shade = rowShades[i % rowShades.length];
                return (
                  <div
                    key={i}
                    className="flex items-center gap-[14px] rounded-xl"
                    style={{
                      padding: isMobile ? "12px 16px" : "14px 20px",
                      backgroundColor: shade.bg,
                    }}
                  >
                    <span
                      className="w-7 h-7 rounded-full flex items-center justify-center font-[Inter,sans-serif] text-xs font-bold shrink-0"
                      style={{
                        backgroundColor: shade.circle,
                        color: colors.primary,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="font-[Inter,sans-serif] text-[15px] text-[#333] leading-[1.5]">
                      {outcome}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Key Advantage Strip */}
            <div
              className="mt-6 rounded-xl flex items-center"
              style={{
                padding: isMobile ? "14px 16px" : "16px 24px",
                backgroundColor: colors.primary,
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "8px" : "16px",
              }}
            >
              <span
                className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1.5px] shrink-0"
                style={{ color: colors.accent }}
              >
                Key Advantage
              </span>
              <span
                className="font-[Inter,sans-serif] text-sm font-medium text-white/85"
                style={{ textAlign: isMobile ? "center" : "left" }}
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
// MAIN PAGE COMPONENT
// ============================================================================

export default function EducationSkillsSectorPage() {
  return (
    <Layout>
      <div className="font-[Inter,sans-serif] m-0 p-0" style={{ backgroundColor: colors.white }}>

        <SectorHeroSection sector={sectorData} />
        <ProblemSection />

        {/* ★ PREMIUM VALUE CHAIN SECTION ★ */}
        <ValueChainSectionPremium />

        <SolutionsSection sector={sectorData} />
        <CompetitiveLandscapeSection sector={sectorData} />
        <PolicyAlignmentSection />
        <CrossSectorSection />
        <InvestmentCTASection />
        <ImpactSection />
        <SectorFinalCTA
          heading={<>Let's Build Ghana's <span className="font-semibold" style={{ color: colors.accent }}>Talent</span></>}
          description="Whether you're an investor, partner, or government stakeholder, there's a seat at the table in building Ghana's next generation of talent and enterprise."
        />
        {/* Pre-footer separator — NOT part of the Footer component */}
        <div className="px-20" style={{ backgroundColor: colors.primary }}>
          <div className="h-px bg-white/[0.08]" />
        </div>
      </div>
    </Layout>
  );
}
