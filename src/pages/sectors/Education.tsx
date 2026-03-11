import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { BridgeLogo } from "@/components/BridgeLogo";
import { FOOTER_SECTOR_ICONS, SECTOR_ROUTES } from "@/data/sectorIcons";
import { useCounter } from "@/hooks/useCounter";

// ============================================================================
// BRIDGE SECTOR PAGE: Education & Skills
// INTEGRATED VERSION with Premium ValueChain Section
// ============================================================================
// Design System: Dark Green #1B4D3E, Lime #B8D935, Off-white #F3F5F2
// ============================================================================

import { colors, layout } from "@/lib/theme";
import { useIsMobile } from "@/hooks/use-mobile";

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

const IconGraduation = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const IconBuilding = () => (
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
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
  </svg>
);

const IconWallet = () => (
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
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
  </svg>
);

const IconHeart = () => (
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
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const IconLightbulb = () => (
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
);

const IconFactory = () => (
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
    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M17 18h1M12 18h1M7 18h1" />
  </svg>
);

const IconTruck = () => (
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
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
    <circle cx="17" cy="18" r="2" />
    <circle cx="7" cy="18" r="2" />
  </svg>
);

const IconZap = () => (
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
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconArrowRight = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

const IconArrowDown = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5v14M19 12l-7 7-7-7" />
  </svg>
);

const IconCheck = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconWarning = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);

const IconUsers = () => (
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
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconSprout = () => (
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
    <path d="M7 20h10" />
    <path d="M10 20c5.5-2.5.8-6.4 3-10" />
    <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
    <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
  </svg>
);

const IconCpu = () => (
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
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
  </svg>
);

// Premium Value Chain Icons
const valueChainIcons = {
  book: (
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
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  school: (
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
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  tools: (
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
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  graduation: (
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
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  briefcase: (
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
    </svg>
  ),
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
            {/* Category Badge */}
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

            {/* Title */}
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
              <span style={{ fontWeight: "700" }}>Education & Skills</span> Development
            </h1>

            {/* Subheading */}
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
              {sector.problemHeadline}
            </h2>

            {/* Description */}
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

            {/* CTA Buttons */}
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

            {/* Main Stats Row */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginTop: "20px",
                paddingBottom: "24px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "36px",
                    fontWeight: "700",
                    color: colors.accent,
                    fontFamily: "Inter, sans-serif",
                    lineHeight: "1",
                    margin: "0 0 8px 0",
                    whiteSpace: "nowrap",
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
                    whiteSpace: "nowrap",
                  }}
                >
                  Investment Range
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontSize: "36px",
                    fontWeight: "700",
                    color: colors.accent,
                    fontFamily: "Inter, sans-serif",
                    lineHeight: "1",
                    margin: "0 0 8px 0",
                    whiteSpace: "nowrap",
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
                    whiteSpace: "nowrap",
                  }}
                >
                  Identified Ventures
                </div>
              </div>
            </div>

            {/* Stat Rows — 4 items */}
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
                      whiteSpace: "nowrap",
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
                        whiteSpace: "nowrap",
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
      {/* Scroll to Explore — desktop only */}
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
      style={{
        backgroundColor: colors.white,
        borderRadius: isMobile ? "16px" : "20px",
        padding: isMobile ? "20px" : "28px",
        cursor: "pointer",
        border: isExpanded ? `2px solid ${colors.accent}` : `1px solid ${colors.line}`,
        transition: "all 0.3s ease",
      }}
    >
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
            color: problem.severity === "High Priority" ? colors.primary : colors.accentText,
            backgroundColor: problem.severity === "High Priority" ? colors.accentLight : "rgba(184,217,53,0.12)",
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

      {isExpanded && (
        <div
          style={{
            paddingTop: "16px",
            borderTop: `1px solid ${colors.line}`,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
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
                    color: problem.severity === "High Priority" ? colors.primary : colors.accentText,
                    backgroundColor:
                      problem.severity === "High Priority" ? colors.accentLight : "rgba(184,217,53,0.12)",
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
                    backgroundColor: problem.severity === "High Priority" ? colors.primary : colors.accentText,
                    borderRadius: "4px",
                    transition: "width 0.5s ease",
                  }}
                />
              </div>
            </div>

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

          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1px",
                      minWidth: 0,
                    }}
                  >
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
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
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            style={{
              backgroundColor: colors.white,
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Inter, sans-serif",
              color: colors.primary,
              border: `1px solid ${colors.line}`,
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
              margin: "24px 0 20px 0",
              maxWidth: "820px",
            }}
          >
            <span style={{ fontWeight: "600" }}>10M+ learners</span> ready to be connected to{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>real economic opportunity</span>
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
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "16px" }}>
            {problemSectionData.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === 0 ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: i === 0 ? colors.accent : colors.line,
                  cursor: "pointer",
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
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        <div style={{ marginBottom: isMobile ? "28px" : "40px", textAlign: "center" }}>
          <span
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Inter, sans-serif",
              color: colors.primary,
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
              margin: "24px 0 16px 0",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            From First Lesson to <span style={{ color: colors.accent, fontWeight: "600" }}>First Paycheck</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              lineHeight: "1.65",
              color: "#666",
              maxWidth: "750px",
              margin: "0 auto",
            }}
          >
            Education is more than schooling — it's apprenticeships, bootcamps, mentorship, and on-the-job learning.
            Click each stage to explore where BRIDGE sees opportunity across the full talent journey.
          </p>
        </div>

        {/* Stage Selector + Detail Card */}
        <div>
          {/* Stage Selector — Horizontal Stepper */}
          <div
            style={{
              maxWidth: "900px",
              margin: isMobile ? "0 auto 16px" : "0 auto 28px",
            }}
          >
            <div style={{ position: "relative", padding: isMobile ? "0 8px" : "0 20px" }}>
              {/* Progress fill — only shows up to active stage, no background track */}
              {!isMobile && activeStage > 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "30px",
                    left: "90px",
                    width: `calc(${(activeStage / (valueChainStages.length - 1)) * 100}% * 0.74)`,
                    height: "3px",
                    backgroundColor: colors.accent,
                    borderRadius: "2px",
                    transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />
              )}

              {/* Stage nodes */}
              <div
                style={{
                  display: "flex",
                  justifyContent: isMobile ? "center" : "space-between",
                  gap: isMobile ? "8px" : undefined,
                  position: "relative",
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
                      style={{
                        cursor: "pointer",
                        textAlign: "center",
                        width: isMobile ? "56px" : "110px",
                        flexShrink: 0,
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: isMobile ? "40px" : "60px",
                          height: isMobile ? "40px" : "60px",
                          margin: "0 auto 6px",
                        }}
                      >
                        {isActive && (
                          <div
                            style={{
                              position: "absolute",
                              inset: "-4px",
                              borderRadius: "18px",
                              border: `2.5px solid ${colors.primary}`,
                              transition: "all 0.3s ease",
                            }}
                          />
                        )}
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "15px",
                            backgroundColor: isActive ? colors.accent : isPast ? colors.primary : colors.white,
                            border: isFuture ? `1.5px solid ${colors.line}` : "1.5px solid transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: isActive ? colors.primary : isPast ? colors.white : "#bbb",
                            transition: "all 0.3s ease",
                            boxShadow: isActive ? "0 4px 16px rgba(27,77,62,0.15)" : "none",
                          }}
                        >
                          {valueChainIcons[s.icon]}
                        </div>
                      </div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: isMobile ? "11px" : "13px",
                          fontWeight: isActive ? "600" : "500",
                          color: isActive ? colors.primary : isPast ? colors.primary : "#999",
                          marginBottom: "2px",
                          transition: "all 0.3s ease",
                          lineHeight: "1.3",
                        }}
                      >
                        {isMobile ? s.stage.split(" ")[0] : s.stage}
                      </div>
                      {!isMobile && (
                        <div
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "11px",
                            color: isActive ? colors.accent : isPast ? "rgba(27,77,62,0.5)" : "#ccc",
                            transition: "all 0.3s ease",
                            lineHeight: "1.3",
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
            style={{
              backgroundColor: colors.white,
              borderRadius: isMobile ? "16px" : "24px",
              border: "none",
              boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
              maxWidth: "900px",
              margin: "0 auto",
              overflow: "hidden",
            }}
          >
            {/* Card Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: isMobile ? "16px" : "18px 32px 12px",
                borderBottom: "none",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: isMobile ? "20px" : "24px",
                    fontWeight: "700",
                    color: colors.primary,
                    lineHeight: "1.2",
                  }}
                >
                  {stage.stage}
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    color: "#888",
                    marginTop: "3px",
                  }}
                >
                  {stage.population}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "10px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  color: "#bbb",
                }}
              >
                Stage {activeStage + 1} / {valueChainStages.length}
              </div>
            </div>

            {/* Card Body */}
            <div style={{ padding: isMobile ? "8px 16px" : "8px 32px 16px" }}>
              {/* Description */}
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  lineHeight: "1.6",
                  color: "#666",
                  margin: "0 0 12px 0",
                  minHeight: isMobile ? "auto" : "45px",
                }}
              >
                {stage.description}
              </p>

              {/* Metrics + Opportunities — hidden on mobile behind Show more */}
              {(!isMobile || showMore) && (
                <div>
                  {/* Metrics Row — stat + value retention side by side */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                      gap: isMobile ? "10px" : "16px",
                      marginBottom: "12px",
                    }}
                  >
                    {/* Key Stat */}
                    <div
                      style={{
                        backgroundColor: "rgba(27, 77, 62, 0.04)",
                        borderRadius: "14px",
                        padding: "14px 20px",
                        border: `1px solid rgba(27, 77, 62, 0.08)`,
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "32px",
                          fontWeight: "700",
                          color: colors.primary,
                          lineHeight: "1",
                          flexShrink: 0,
                        }}
                      >
                        {stage.statNumber}
                      </div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "#888",
                          lineHeight: "1.3",
                        }}
                      >
                        {stage.statLabel}
                      </div>
                    </div>

                    {/* Value Retention */}
                    <div
                      style={{
                        backgroundColor: colors.background,
                        borderRadius: "14px",
                        padding: "14px 20px",
                        border: `1px solid ${colors.line}`,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "12px",
                            color: "#888",
                          }}
                        >
                          Learner value retained
                        </span>
                        <span
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "14px",
                            fontWeight: "600",
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
                      <div
                        style={{
                          height: "6px",
                          backgroundColor: colors.line,
                          borderRadius: "3px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            width: `${stage.valueRetained}%`,
                            backgroundColor: colors.accent,
                            borderRadius: "3px",
                            transition: "width 0.5s ease",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Opportunity Markers — 2×2 grid */}
                  <div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "10px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                        color: "#999",
                        marginBottom: "8px",
                      }}
                    >
                      Opportunity Markers
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                        gap: "6px",
                      }}
                    >
                      {stage.painPoints.map((point, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            backgroundColor: colors.background,
                            borderRadius: "10px",
                            padding: "10px 14px",
                            border: `1px solid ${colors.line}`,
                          }}
                        >
                          <div
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
                              fontFamily: "Inter, sans-serif",
                              fontSize: "13px",
                              color: "#555",
                              lineHeight: "1.3",
                            }}
                          >
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
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    width: "100%",
                    padding: "14px",
                    marginTop: showMore ? "0" : "-8px",
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
                  {showMore ? "Show less" : "Show more details"}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={colors.primary}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transform: showMore ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              )}
            </div>

            {/* Card Footer — Navigation */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: isMobile ? "12px 16px" : "14px 32px",
                borderTop: "none",
              }}
            >
              <div
                onClick={() => activeStage > 0 && setActiveStage(activeStage - 1)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: activeStage > 0 ? "pointer" : "default",
                  opacity: activeStage > 0 ? 0.6 : 0.15,
                  transition: "opacity 0.2s ease",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  color: colors.primary,
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Previous
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                {valueChainStages.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveStage(i)}
                    style={{
                      width: activeStage === i ? "24px" : "8px",
                      height: "8px",
                      borderRadius: "4px",
                      backgroundColor:
                        activeStage === i ? colors.accent : i < activeStage ? colors.primary : colors.line,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>

              <div
                onClick={() => activeStage < valueChainStages.length - 1 && setActiveStage(activeStage + 1)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  cursor: activeStage < valueChainStages.length - 1 ? "pointer" : "default",
                  opacity: activeStage < valueChainStages.length - 1 ? 0.6 : 0.15,
                  transition: "opacity 0.2s ease",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  color: colors.primary,
                }}
              >
                Next
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
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
      style={{
        backgroundColor: colors.white,
        borderRadius: "20px",
        padding: "28px",
        border: "none",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease",
      }}
    >
      {/* Tier + Capital row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <span
          style={{
            backgroundColor: tier.bg,
            color: tier.text,
            padding: "5px 12px",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: "700",
            fontFamily: "Inter, sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Tier {solution.tier} · {tier.label}
        </span>
        <span
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "16px",
            fontWeight: "700",
            color: colors.primary,
          }}
        >
          {solution.capital}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "18px",
          fontWeight: "600",
          color: colors.primary,
          margin: "0 0 12px 0",
          lineHeight: "1.3",
          minHeight: "24px",
        }}
      >
        {solution.name}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          color: "#666",
          lineHeight: "1.6",
          margin: "0 0 20px 0",
          flex: 1,
        }}
      >
        {solution.description}
      </p>

      {/* Impact container */}
      <div
        style={{
          backgroundColor: "rgba(27, 77, 62, 0.06)",
          borderRadius: "12px",
          padding: "14px 16px",
          border: `1px solid rgba(27, 77, 62, 0.1)`,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "10px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "#999",
            marginBottom: "5px",
          }}
        >
          Expected Impact
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "13px",
            color: colors.primary,
            fontWeight: "600",
            whiteSpace: "nowrap",
          }}
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
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Header + Filter row */}
        <div
          style={{
            display: isMobile ? "block" : "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: isMobile ? "32px" : "60px",
          }}
        >
          {/* Left: pill + heading + subtitle */}
          <div style={{ flex: 1, marginBottom: isMobile ? "24px" : 0 }}>
            <span
              style={{
                backgroundColor: "rgba(184, 217, 53, 0.15)",
                padding: "10px 20px",
                borderRadius: "50px",
                fontSize: "11px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontFamily: "Inter, sans-serif",
                color: colors.accent,
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
                margin: "24px 0 20px 0",
                maxWidth: "900px",
              }}
            >
              Ventures That Build Lasting <span style={{ color: colors.accent, fontWeight: "600" }}>Human Capital</span>
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? "15px" : "16px",
                lineHeight: "1.65",
                color: "rgba(255,255,255,0.6)",
                maxWidth: "700px",
                margin: 0,
              }}
            >
              Nine ventures — each one a bridge from insight to investment to measurable public benefit — leveraging
              diaspora expertise, TVET partnerships, and BRIDGE's integrated portfolio to connect learning with earning.
            </p>
          </div>

          {/* Right: Filter container */}
          <div
            style={{
              display: "flex",
              justifyContent: isMobile ? "flex-start" : "flex-end",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                gap: "4px",
                padding: "4px",
                borderRadius: "50px",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {tierFilters.map((f) => {
                const isActive = activeTier === f.key;
                const count =
                  f.key === "all" ? sector.solutions.length : sector.solutions.filter((s) => s.tier === f.key).length;
                if (count === 0) return null;
                return (
                  <button
                    key={f.key}
                    onClick={() => setActiveTier(String(f.key))}
                    style={{
                      backgroundColor: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                      color: isActive ? colors.accent : "rgba(255,255,255,0.5)",
                      border: "none",
                      borderRadius: "50px",
                      padding: isMobile ? "6px 12px" : "6px 16px",
                      fontSize: isMobile ? "11px" : "12px",
                      fontWeight: isActive ? "700" : "500",
                      fontFamily: "Inter, sans-serif",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap",
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
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "16px" }}>
            {filteredSolutions.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === 0 ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: i === 0 ? colors.accent : "rgba(255,255,255,0.2)",
                  cursor: "pointer",
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
      style={{
        backgroundColor: colors.white,
        borderRadius: "20px",
        border: `1px solid ${colors.line}`,
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <h3
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "18px",
              fontWeight: "600",
              color: colors.dark,
              margin: 0,
            }}
          >
            {competitor.name}
          </h3>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              fontWeight: "600",
              color: colors.primary,
              backgroundColor: colors.accentLight,
              padding: "4px 12px",
              borderRadius: "20px",
            }}
          >
            {competitor.priority} Priority
          </span>
        </div>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            color: "#666",
            margin: "0 0 16px 0",
            lineHeight: "1.5",
          }}
        >
          {competitor.focus}
        </p>

        {/* Strengths */}
        <div style={{ marginBottom: "16px" }}>
          {competitor.strengths.map((strength, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontFamily: "Inter, sans-serif",
                  color: "#666",
                }}
              >
                {strength.name}
              </span>
              <div style={{ display: "flex", gap: "3px" }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    style={{
                      width: "16px",
                      height: "6px",
                      borderRadius: "3px",
                      backgroundColor: n <= strength.rating ? colors.accent : colors.line,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {isExpanded && (
          <>
            {/* Where BRIDGE Helps */}
            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  fontSize: "10px",
                  fontFamily: "Inter, sans-serif",
                  color: "#888",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "12px",
                  fontWeight: "600",
                }}
              >
                Where BRIDGE Helps
              </div>
              {competitor.gaps.map((gap, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: i < competitor.gaps.length - 1 ? "8px" : 0,
                  }}
                >
                  <span style={{ color: colors.accent, fontSize: "12px", fontWeight: "600" }}>→</span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontFamily: "Inter, sans-serif",
                      color: "#666",
                    }}
                  >
                    {gap}
                  </span>
                </div>
              ))}
            </div>

            {/* BRIDGE Opportunity */}
            <div
              style={{
                backgroundColor: colors.accentLight,
                borderRadius: "12px",
                padding: "16px",
                border: `1px solid ${colors.accent}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <span
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: colors.accent,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                  }}
                >
                  ✦
                </span>
                <span
                  style={{
                    fontSize: "10px",
                    fontFamily: "Inter, sans-serif",
                    color: colors.primary,
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    fontWeight: "700",
                  }}
                >
                  BRIDGE Opportunity
                </span>
              </div>
              <p
                style={{
                  fontSize: "13px",
                  fontFamily: "Inter, sans-serif",
                  color: colors.primary,
                  lineHeight: "1.5",
                  margin: 0,
                }}
              >
                {competitor.bridgeOpportunity}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          padding: "16px 24px",
          borderTop: `1px solid ${colors.line}`,
          display: "flex",
          justifyContent: hiddenNav ? "center" : "space-between",
          alignItems: "center",
        }}
      >
        {!hiddenNav && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={prevCompetitor}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: `1px solid ${colors.line}`,
                backgroundColor: colors.white,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.primary,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span style={{ fontSize: "12px", fontFamily: "Inter, sans-serif", color: "#888" }}>
              {currentIndex + 1} / {competitors.length}
            </span>
            <button
              onClick={nextCompetitor}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: `1px solid ${colors.line}`,
                backgroundColor: colors.white,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.primary,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            backgroundColor: "transparent",
            color: colors.primary,
            border: `1.5px solid ${colors.primary}`,
            padding: "10px 20px",
            borderRadius: "50px",
            fontSize: "12px",
            fontWeight: "600",
            fontFamily: "Inter, sans-serif",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          {isExpanded ? "Less" : "Analysis"}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
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
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Section Header — full width */}
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            style={{
              backgroundColor: colors.white,
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Inter, sans-serif",
              color: colors.primary,
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
              margin: "24px 0 16px 0",
            }}
          >
            Building With Ghana's{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Strongest Institutions</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              lineHeight: "1.65",
              color: "#666",
              margin: "0",
              maxWidth: "750px",
            }}
          >
            Mastercard Foundation, GIZ, Ghana Skills Development Fund, and many more bring world-class resources to
            education. BRIDGE connects training to employment through its integrated portfolio — combining efforts,
            aligning resources, creating shared value.
          </p>
        </div>

        {/* Mobile: horizontal scroll pills for competitor selection */}
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
                    setActiveCompetitorIndex(index);
                    setShowMoreComp(false);
                  }}
                  style={{
                    backgroundColor: activeCompetitorIndex === index ? colors.accentLight : "transparent",
                    color: activeCompetitorIndex === index ? colors.primary : "#999",
                    fontWeight: activeCompetitorIndex === index ? "700" : "500",
                    border:
                      activeCompetitorIndex === index ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                    borderRadius: "50px",
                    padding: "5px 8px",
                    fontSize: "10px",
                    fontFamily: "Inter, sans-serif",
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
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <CompetitorAnalysisCard
              competitors={sector.competitors}
              currentIndex={activeCompetitorIndex}
              setCurrentIndex={setActiveCompetitorIndex}
              hiddenNav={isMobile}
            />

            {/* BRIDGE Position Card — dynamic per competitor */}
            {isMobile && !showMoreComp && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMoreComp(true);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "14px",
                  backgroundColor: colors.primary,
                  border: "none",
                  borderRadius: "12px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: colors.white,
                  cursor: "pointer",
                }}
              >
                See BRIDGE's Position
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            )}
            {(!isMobile || showMoreComp) && (
              <div
                style={{
                  backgroundColor: colors.primary,
                  borderRadius: isMobile ? "16px" : "20px",
                  padding: isMobile ? "20px" : "28px",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    BRIDGE's Position
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: "600",
                      color: colors.accent,
                      backgroundColor: "rgba(184, 217, 53, 0.12)",
                      padding: "4px 12px",
                      borderRadius: "20px",
                    }}
                  >
                    vs {["Mastercard", "GIZ", "CAMFED", "Ghana Skills", "Chalkboard", "CTVET"][activeCompetitorIndex]}
                  </span>
                </div>
                <h4
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "17px",
                    fontWeight: "600",
                    color: colors.white,
                    margin: "0 0 24px 0",
                    lineHeight: "1.4",
                    minHeight: "48px",
                  }}
                >
                  {currentPosition.headline}
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                  {currentPosition.bullets.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: isMobile ? "flex-start" : "center",
                        flexWrap: isMobile ? "wrap" : "nowrap",
                        gap: isMobile ? "8px" : "12px",
                        backgroundColor: "rgba(255,255,255,0.06)",
                        borderRadius: "12px",
                        padding: isMobile ? "12px 14px" : "14px 16px",
                      }}
                    >
                      <div
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          backgroundColor: colors.accent,
                          flexShrink: 0,
                          marginTop: isMobile ? "5px" : 0,
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
                        {item.label}
                      </span>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        {item.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {!isMobile && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "16px",
              }}
            >
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
                    style={{
                      backgroundColor: colors.white,
                      borderRadius: "16px",
                      padding: "24px",
                      border: `1px solid ${colors.line}`,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "6px",
                      }}
                    >
                      <h4
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "16px",
                          fontWeight: "600",
                          color: colors.dark,
                          margin: 0,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {shortNames[i]}
                      </h4>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "11px",
                          fontWeight: "600",
                          color: colors.primary,
                          backgroundColor: colors.accentLight,
                          padding: "3px 10px",
                          borderRadius: "12px",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                          marginLeft: "12px",
                        }}
                      >
                        {comp.funding}
                      </span>
                    </div>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        color: "#888",
                        margin: "0 0 12px 0",
                        lineHeight: "1.45",
                      }}
                    >
                      {shortDescs[i]}
                    </p>

                    {/* Top Strength — compact */}
                    <div
                      style={{
                        backgroundColor: colors.background,
                        borderRadius: "10px",
                        padding: "10px 14px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "10px",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          color: "#bbb",
                          marginBottom: "4px",
                        }}
                      >
                        Top Strength
                      </div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          fontWeight: "500",
                          color: "#555",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {comp.strengths[0].name}
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "auto",
                        paddingTop: "14px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "12px",
                          color: "#ccc",
                        }}
                      >
                        Est. {comp.year}
                      </span>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "11px",
                          fontWeight: "600",
                          color: comp.priority === "High" ? colors.primary : "#999",
                          opacity: 0.6,
                        }}
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
      style={{
        ...(isMobile
          ? { width: "100%" }
          : { minWidth: isExpanded ? "380px" : "280px", maxWidth: isExpanded ? "380px" : "280px" }),
        backgroundColor: colors.background,
        border: isExpanded ? `2px solid ${colors.accent}` : `1.5px solid ${colors.line}`,
        borderRadius: "16px",
        flexShrink: 0,
        cursor: "pointer",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Main card content */}
      <div style={{ padding: "20px", display: "flex", flexDirection: "column" }}>
        {/* Top row: category badge + relevance pills */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
          <span
            style={{
              fontSize: "9px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontFamily: "'Inter', sans-serif",
              color: colors.primary,
              backgroundColor: badge.bg,
              border: `1px solid ${badge.border}`,
              padding: "4px 10px",
              borderRadius: "50px",
            }}
          >
            {catLabel}
          </span>
          <div style={{ display: "flex", gap: "4px" }}>
            {(policy.relevance || []).map((r) => (
              <span
                key={r}
                style={{
                  fontSize: "9px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  fontFamily: "'Inter', sans-serif",
                  color: "#888",
                  backgroundColor: colors.white,
                  border: `1px solid ${colors.line}`,
                  padding: "3px 8px",
                  borderRadius: "50px",
                }}
              >
                {relevanceLabels[r] || r}
              </span>
            ))}
          </div>
        </div>

        {/* Policy name */}
        <div style={{ minHeight: "42px", marginBottom: "8px" }}>
          <h4
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "16px",
              fontWeight: "700",
              color: colors.primary,
              margin: 0,
              lineHeight: "1.35",
            }}
          >
            {policy.policy}
          </h4>
        </div>

        {/* Allocation — plain lime text */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            fontWeight: "700",
            color: colors.accent,
            marginBottom: "10px",
          }}
        >
          {policy.allocation}
        </div>

        {/* Alignment text */}
        <div style={{ minHeight: "40px", marginBottom: "12px" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              color: "#666",
              lineHeight: "1.5",
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {policy.alignment}
          </p>
        </div>

        {/* Expand hint */}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            fontWeight: "600",
            color: colors.primary,
          }}
        >
          {isExpanded ? "BRIDGE alignment ▾" : "BRIDGE alignment ▸"}
        </div>
      </div>

      {/* Expanded content */}
      <div
        style={{
          maxHeight: isExpanded ? "600px" : "0",
          opacity: isExpanded ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s ease, opacity 0.3s ease",
        }}
      >
        <div style={{ borderTop: `1px solid ${colors.line}`, padding: "20px" }}>
          {/* Governing body */}
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              color: "#888",
              marginBottom: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {policy.body}
          </div>

          {/* BRIDGE role */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              color: "#444",
              lineHeight: "1.55",
              margin: "0 0 14px 0",
            }}
          >
            {policy.bridgeRole}
          </p>

          {/* Pillars */}
          {policy.pillars && policy.pillars.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
              {policy.pillars.map((p) => (
                <span
                  key={p}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: colors.primary,
                    backgroundColor: colors.accentLight,
                    border: `1px solid ${colors.accent}`,
                    padding: "5px 12px",
                    borderRadius: "50px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          )}

          {/* BRIDGE Ventures */}
          {policy.bridgeVentures && policy.bridgeVentures.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {policy.bridgeVentures.map((v) => (
                <div
                  key={v}
                  style={{
                    backgroundColor: colors.primary,
                    borderRadius: "10px",
                    padding: "12px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      backgroundColor: colors.accent,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: colors.white,
                    }}
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
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: isMobile ? "left" : "center", marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            style={{
              backgroundColor: colors.white,
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "'Inter', sans-serif",
              color: colors.primary,
              border: `1px solid ${colors.line}`,
            }}
          >
            The Governance & Policy
          </span>
          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
              color: colors.primary,
              margin: isMobile ? "24px 0 20px 0" : "24px auto 20px auto",
              maxWidth: "900px",
            }}
          >
            Moving in Step with Ghana's <span style={{ fontWeight: "600" }}>Education</span>{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Reform</span>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              lineHeight: "1.65",
              color: "#555",
              maxWidth: "750px",
              margin: isMobile ? "0 0 24px 0" : "0 auto 32px auto",
            }}
          >
            From the World Bank's $200M Skills Development Fund to the GH₵4.2B Free SHS commitment, every BRIDGE venture
            maps to an active government policy or institutional priority.
          </p>

          {/* Category filter pills — Impact filter style */}
          <div
            style={{
              display: "flex",
              justifyContent: isMobile ? "flex-start" : "center",
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
                    style={{
                      backgroundColor: isActive ? colors.accentLight : "transparent",
                      color: isActive ? colors.primary : "#999",
                      fontWeight: isActive ? "700" : "500",
                      border: isActive ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                      padding: isMobile ? "5px 8px" : "6px 14px",
                      borderRadius: "50px",
                      fontSize: isMobile ? "10px" : "12px",
                      fontFamily: "Inter, sans-serif",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
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

        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginBottom: "24px" }}>
          {visiblePolicies.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === 0 ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor: i === 0 ? colors.accent : colors.line,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Bottom CTA Bar */}
        <div
          style={{
            backgroundColor: colors.primary,
            borderRadius: isMobile ? "12px" : "16px",
            padding: isMobile ? "24px 20px" : "28px 32px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: isMobile ? "center" : "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: "16px",
            textAlign: "left",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
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
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? "13px" : "14px",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Every venture aligns with at least one active government policy or initiative.
            </div>
          </div>
          <button
            style={{
              backgroundColor: colors.accent,
              color: colors.primary,
              border: "none",
              padding: "12px 24px",
              borderRadius: "50px",
              fontSize: "13px",
              fontWeight: "700",
              fontFamily: "'Inter', sans-serif",
              cursor: "pointer",
              whiteSpace: "nowrap",
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
  4: (
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
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" />
    </svg>
  ),
  3: (
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
      <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h5v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
    </svg>
  ),
  1: (
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
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
    </svg>
  ),
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
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ marginBottom: isMobile ? "32px" : "60px", textAlign: isMobile ? "center" : "left" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "rgba(184, 217, 53, 0.15)",
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Inter, sans-serif",
              color: colors.accent,
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
              margin: "0 0 20px 0",
              maxWidth: "820px",
            }}
          >
            How Education <span style={{ color: colors.accent, fontWeight: "600" }}>Amplifies Impact</span> Across Every
            Sector
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              lineHeight: "1.65",
              color: "rgba(255,255,255,0.6)",
              margin: 0,
              maxWidth: "680px",
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
          <div style={{ marginBottom: "24px" }}>
            {/* Hub Icon */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "16px" }}>
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
                  marginBottom: "6px",
                }}
              >
                <IconGraduation />
              </div>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: "700",
                  color: colors.accent,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Education
              </span>
            </div>

            {/* 5 Sector Icons Row */}
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
                        backgroundColor: isActive ? colors.accent : "rgba(255,255,255,0.08)",
                        border: isActive ? "none" : "1px solid rgba(255,255,255,0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isActive ? colors.primary : "rgba(255,255,255,0.6)",
                        transition: "all 0.3s ease",
                        marginBottom: "6px",
                      }}
                    >
                      {p.icon}
                    </div>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "10px",
                        fontWeight: "600",
                        color: isActive ? colors.white : "rgba(255,255,255,0.5)",
                        textAlign: "center",
                        maxWidth: "58px",
                        lineHeight: "1.2",
                        transition: "all 0.3s ease",
                      }}
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
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "32px",
              marginBottom: "48px",
            }}
          >
            {/* Hub Icon */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "120px",
                flexShrink: 0,
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
                  marginBottom: "10px",
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
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "120px",
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
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isActive ? colors.primary : "rgba(255,255,255,0.6)",
                      transition: "all 0.3s ease",
                      marginBottom: "10px",
                    }}
                  >
                    {p.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      fontWeight: "600",
                      color: isActive ? colors.white : "rgba(255,255,255,0.5)",
                      textAlign: "center",
                      transition: "all 0.3s ease",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {crossSectorShortNames[i]}
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
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.5)",
                    margin: 0,
                    lineHeight: "1.6",
                  }}
                >
                  Tap a sector above to explore how education amplifies its impact
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
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      color: "rgba(255,255,255,0.4)",
                    }}
                  >
                    Click a sector above to explore
                  </span>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: "16px",
                  }}
                >
                  {pathways.map((p, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveNode(i)}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.05)",
                        borderRadius: "16px",
                        padding: "24px 20px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
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
                          lineHeight: "1.5",
                          marginBottom: "12px",
                        }}
                      >
                        {p.connection}
                      </div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
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
            /* ---- ACTIVE STATE ---- */
            <div>
              {/* Breadcrumb Path */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flexWrap: "wrap",
                  marginBottom: "28px",
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
                        borderRadius: "20px",
                      }}
                    >
                      {step}
                    </span>
                    {i < arr.length - 1 && <span style={{ color: colors.accent, fontSize: "14px" }}>→</span>}
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

                {/* Column 2: Synergy Pathways (collapsible on mobile) */}
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
                      {pathways[activeNode].synergies.map((syn, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "12px 16px",
                            borderRadius: "10px",
                            backgroundColor: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <span style={{ color: colors.accent, fontSize: "8px", flexShrink: 0 }}>●</span>
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "14px",
                              color: "rgba(255,255,255,0.75)",
                              lineHeight: "1.3",
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
                      {pathways[activeNode].bridgeVentures.map((v, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "14px 18px",
                            borderRadius: "12px",
                            backgroundColor: "rgba(184, 217, 53, 0.1)",
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
                      Explore {pathways[activeNode].name} Sector →
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile Toggle Button */}
              {isMobile && (
                <button
                  onClick={() => setShowMoreRipple(!showMoreRipple)}
                  style={{
                    width: "100%",
                    padding: "14px",
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
                    marginTop: "16px",
                  }}
                >
                  {showMoreRipple ? "Show less" : "Show more details"}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: showMoreRipple ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
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

const IconStorefront = () => (
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
);

const IconOfficeBuilding = () => (
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
);

const IconTrendingUp = () => (
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
);

const IconLandmark = () => (
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
);

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
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Section Header */}
        <div
          style={{
            textAlign: isMobile ? "center" : "left",
            marginBottom: isMobile ? "32px" : "60px",
            padding: isMobile ? "0" : 0,
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
              margin: isMobile ? "0 auto 16px" : "0 0 16px",
              maxWidth: "900px",
            }}
          >
            Every Stakeholder Has a Role in Building{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Ghana's Talent</span>
          </h2>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              color: "#666",
              lineHeight: "1.65",
              margin: isMobile ? "0 auto" : 0,
              maxWidth: "680px",
            }}
          >
            Investment isn't only capital — it's expertise, partnerships, policy, and vision. See how your role
            contributes to 19 ventures across $16.5-33.5M in opportunity.
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
                      backgroundColor: isActive ? colors.accentLight : "transparent",
                      border: isActive ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                      color: isActive ? colors.primary : "#999",
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

        {/* Two-Column Content Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "24px" : "48px",
            alignItems: "stretch",
          }}
        >
          {/* LEFT COLUMN: Audience Content */}
          <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Headline (Desktop Only) */}
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

            {/* Pitch (Desktop Only) */}
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
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1, overflow: "hidden" }}>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        fontWeight: "600",
                        color: colors.primary,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {path.bring}
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        color: "#777",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
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
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#444", lineHeight: "1.5" }}>
                <strong style={{ color: colors.primary }}>Ministry of Education & CTVET</strong> aligned with national
                TVET Transformation and Jobs & Skills Project objectives
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
                height: "100%",
                boxSizing: "border-box",
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
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
                {tabContent[activeTab].map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      borderRadius: "12px",
                      padding: isMobile ? "16px" : "18px 20px",
                      display: "flex",
                      flexDirection: isMobile ? "column" : "row",
                      gap: isMobile ? "10px" : "16px",
                      alignItems: isMobile ? "flex-start" : "center",
                      flex: 1,
                      minHeight: isMobile ? "auto" : "0",
                    }}
                  >
                    <div
                      style={{
                        width: isMobile ? "auto" : "140px",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "baseline",
                        gap: isMobile ? "10px" : "0",
                        flexDirection: isMobile ? "row" : "column",
                      }}
                    >
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
                          marginTop: isMobile ? "0" : "4px",
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
                        borderLeft: isMobile ? "none" : "1px solid rgba(255,255,255,0.1)",
                        borderTop: isMobile ? "1px solid rgba(255,255,255,0.08)" : "none",
                        paddingLeft: isMobile ? "0" : "16px",
                        paddingTop: isMobile ? "10px" : "0",
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
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.primary}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
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
      style={{
        display: isMobile ? "flex" : "grid",
        flexDirection: isMobile ? "column" : undefined,
        gridTemplateColumns: isMobile ? undefined : "200px 1fr 200px",
        gap: isMobile ? "8px" : "32px",
        padding: isMobile ? "16px" : "24px 28px",
        backgroundColor: index % 2 === 0 ? colors.white : "transparent",
        opacity: animate ? 1 : 0,
        transition: `opacity 0.4s ease ${index * 80}ms`,
        position: "relative",
      }}
    >
      {/* Trend tag — top-right on mobile, inline on desktop */}
      {isMobile && (
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "10px",
            fontWeight: "700",
            color: colors.accent,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {item.trend}
        </div>
      )}

      {/* Col 1: Number + Trend */}
      <div>
        <div
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: isMobile ? "28px" : "36px",
            fontWeight: "700",
            color: colors.primary,
            letterSpacing: "-1px",
            lineHeight: "1.1",
          }}
        >
          {item.prefix}
          {formatted}
          {item.suffix}
        </div>
        {!isMobile && (
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px",
              fontWeight: "700",
              color: colors.accent,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginTop: "4px",
            }}
          >
            {item.trend}
          </div>
        )}
      </div>

      {/* Col 2: Label + Description */}
      <div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px",
            fontWeight: "700",
            color: colors.primary,
            marginBottom: "4px",
          }}
        >
          {item.label}
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            color: "#666",
            lineHeight: "1.5",
          }}
        >
          {item.description}
        </div>
      </div>

      {/* Col 3: Linked Ventures */}
      {!isMobile && (
        <div
          style={{
            backgroundColor: index % 2 === 0 ? colors.background : "rgba(27,77,62,0.04)",
            borderRadius: "10px",
            padding: "10px 16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "9px",
              fontWeight: "700",
              color: "#aaa",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "4px",
            }}
          >
            Linked Ventures
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              fontWeight: "500",
              color: colors.primary,
              lineHeight: "1.4",
              whiteSpace: "nowrap",
            }}
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
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "left", marginBottom: "40px" }}>
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
              fontFamily: "'Inter', sans-serif",
              marginBottom: "24px",
            }}
          >
            The Impact
          </span>

          <h2
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
              color: colors.primary,
              margin: "0 0 12px",
              maxWidth: "900px",
            }}
          >
            What Changes When <span style={{ fontWeight: "600" }}>Education</span>
            <br />
            <span style={{ fontWeight: "600" }}>Pathways</span>{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Work</span>
          </h2>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              color: "#555",
              lineHeight: "1.7",
              margin: "0 0 40px 0",
              maxWidth: "700px",
            }}
          >
            When graduates find employment, vocational training matches market needs, and skills connect to careers —
            the ripple effects break poverty cycles, build family security, and power Ghana's human capital advantage.
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
          {/* Container — outlined pill bar */}
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
                  onClick={() => {
                    setView(v);
                    triggerAnimate();
                  }}
                  style={{
                    backgroundColor: view === v ? colors.white : "transparent",
                    color: view === v ? colors.primary : "#999",
                    fontWeight: view === v ? "700" : "500",
                    border: "none",
                    padding: isMobile ? "5px 10px" : "6px 14px",
                    fontSize: isMobile ? "11px" : "12px",
                    fontFamily: "Inter, sans-serif",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                    borderRadius: "50px",
                  }}
                >
                  {v === "metrics" ? (isMobile ? "Metric" : "By Metric") : isMobile ? "Stakeholder" : "By Stakeholder"}
                </button>
              ))}
            </div>

            {/* Vertical Divider */}
            <div style={{ width: "1px", height: "20px", backgroundColor: colors.line, flexShrink: 0 }} />

            {/* Sub-filter Pills */}
            {view === "metrics"
              ? impactMetrics.map((cat, i) => (
                  <button
                    key={cat.category}
                    onClick={() => {
                      setActiveCategory(i);
                      triggerAnimate();
                    }}
                    style={{
                      backgroundColor: activeCategory === i ? colors.accentLight : "transparent",
                      color: activeCategory === i ? colors.primary : "#999",
                      fontWeight: activeCategory === i ? "700" : "500",
                      border: activeCategory === i ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                      borderRadius: "50px",
                      padding: isMobile ? "5px 8px" : "6px 14px",
                      fontSize: isMobile ? "10px" : "12px",
                      fontFamily: "Inter, sans-serif",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
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
                    style={{
                      backgroundColor: activeStakeholder === i ? colors.accentLight : "transparent",
                      color: activeStakeholder === i ? colors.primary : "#999",
                      fontWeight: activeStakeholder === i ? "700" : "500",
                      border: activeStakeholder === i ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                      borderRadius: "50px",
                      padding: isMobile ? "5px 8px" : "6px 14px",
                      fontSize: isMobile ? "10px" : "12px",
                      fontFamily: "Inter, sans-serif",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
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
            style={{
              backgroundColor: colors.background,
              borderRadius: "20px",
              border: `2px solid ${colors.primary}`,
              overflow: "hidden",
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
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: isMobile ? "flex-start" : "center",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "12px" : "0",
                marginBottom: "24px",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: isMobile ? "24px" : "28px",
                    fontWeight: "700",
                    color: colors.primary,
                    lineHeight: "1.2",
                  }}
                >
                  {currentStakeholder.title}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    color: "#888",
                    marginTop: "4px",
                  }}
                >
                  {currentStakeholder.subtitle}
                </div>
              </div>
              <div style={{ textAlign: isMobile ? "left" : "right" }}>
                <div
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: isMobile ? "32px" : "40px",
                    fontWeight: "700",
                    color: colors.primary,
                    letterSpacing: "-1.5px",
                    lineHeight: "1",
                  }}
                >
                  {currentStakeholder.stat}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    color: "#888",
                    marginTop: "4px",
                  }}
                >
                  {currentStakeholder.statLabel}
                </div>
              </div>
            </div>

            {/* Outcome Rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: isMobile ? "12px 16px" : "14px 20px",
                      borderRadius: "12px",
                      backgroundColor: shade.bg,
                    }}
                  >
                    <span
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        backgroundColor: shade.circle,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "12px",
                        fontWeight: "700",
                        color: colors.primary,
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "15px",
                        color: "#333",
                        lineHeight: "1.5",
                      }}
                    >
                      {outcome}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Key Advantage Strip */}
            <div
              style={{
                marginTop: "24px",
                padding: isMobile ? "14px 16px" : "16px 24px",
                backgroundColor: colors.primary,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "8px" : "16px",
              }}
            >
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "10px",
                  fontWeight: "700",
                  color: colors.accent,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  flexShrink: 0,
                }}
              >
                Key Advantage
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "rgba(255,255,255,0.85)",
                  textAlign: isMobile ? "center" : "left",
                }}
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
              margin: "0 0 24px 0",
            }}
          >
            Let's Build Ghana's <span style={{ color: colors.accent, fontWeight: "600" }}>Talent</span>
          </h2>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "18px",
              lineHeight: "1.7",
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 40px 0",
              maxWidth: "680px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Whether you're an investor, partner, or government stakeholder, there's a seat at the table in building
            Ghana's next generation of talent and enterprise.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: "16px",
              justifyContent: "center",
              alignItems: isMobile ? "stretch" : "center",
            }}
          >
            <button
              onClick={() => navigate("/contact")}
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
                border: "1px solid rgba(255,255,255,0.3)",
                padding: isMobile ? "16px 24px" : "16px 32px",
                borderRadius: "50px",
                fontSize: "15px",
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
// MAIN PAGE COMPONENT
// ============================================================================

export default function EducationSkillsSectorPage() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif", margin: 0, padding: 0, backgroundColor: colors.white }}>

      <SiteHeader />
      <HeroSection sector={sectorData} />
      <ProblemSection />

      {/* ★ PREMIUM VALUE CHAIN SECTION ★ */}
      <ValueChainSectionPremium />

      <SolutionsSection sector={sectorData} />
      <CompetitiveLandscapeSection sector={sectorData} />
      <PolicyAlignmentSection />
      <CrossSectorSection />
      <InvestmentCTASection />
      <ImpactSection />
      <FinalCTASection />
      {/* Pre-footer separator — NOT part of the Footer component */}
      <div style={{ backgroundColor: colors.primary, padding: "0 80px" }}>
        <div style={{ height: "0.5px", backgroundColor: "rgba(255,255,255,0.08)" }} />
      </div>
      <SiteFooter />
    </div>
  );
}
