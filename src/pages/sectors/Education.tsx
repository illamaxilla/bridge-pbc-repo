import React, { useState, useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// ============================================================================
// BRIDGE SECTOR PAGE: Education & Skills
// INTEGRATED VERSION with Premium ValueChain Section
// ============================================================================
// Design System: Dark Green #1B4D3E, Lime #B8D935, Off-white #F3F5F2
// ============================================================================

const colors = {
  primary: "#1B4D3E",
  accent: "#B8D935",
  accentText: "#5C7A1F",
  accentLight: "#E8F5E0",
  background: "#F3F5F2",
  white: "#FFFFFF",
  dark: "#191919",
  line: "#DEDEDE",
  lightGreen: "#E8F5E0",
  ctaGreen: "#2E5A4D",
  warning: "#F59E0B",
  warningBg: "#FEF3C7",
  warningText: "#92400E",
  critical: "#EF4444",
  criticalBg: "#FEE2E2",
};

const CONTENT_MAX_WIDTH = "1200px";

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
};

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

// ============================================================================
// HEADER COMPONENT
// ============================================================================

const BridgeLogo = ({ height = 40 }) => (
  <svg height={height} viewBox="0 0 3434.33 932.3" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path fill="#b8d935" d="M2070.26,927.95c-.2.2-.5.4-.7.5h-.3l1-.5Z" />
      <path fill="#0fea68" d="M2070.26,927.95c-.2.2-.5.4-.7.5h-.3l1-.5Z" />
      <path
        fill="#1b4d3e"
        d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9h0ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z"
      />
      <path
        fill="#1b4d3e"
        stroke="#000"
        strokeWidth=".5"
        strokeMiterlimit="10"
        d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1h0Z"
      />
      <path
        fill="#1b4d3e"
        stroke="#000"
        strokeWidth=".5"
        strokeMiterlimit="10"
        d="M1488.08,578.65v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"
      />
      <rect fill="#b8d935" x="1427.38" y="17.35" width="205.2" height="145" />
      <rect fill="#1b4d3e" x="1427.48" y="221.75" width="205.2" height="693.2" rx="9.6" ry="9.6" />
      <path
        fill="#1b4d3e"
        d="M2757.31,19.09h491.3c5.42,0,9.82,4.4,9.82,9.82v218.7c0,5.42-4.4,9.82-9.82,9.82h-507.36c-56.98,0-108.53,23.02-145.87,60.35-37.34,37.23-60.45,88.79-60.45,145.66,0,113.75,92.37,206.01,206.32,206.01h12.89c2.86,0,5.11,2.25,5.11,5.11v236.7c0,1.13-.92,1.94-1.94,1.94h0c-242.22,0-438.52-195.99-438.52-437.8v-18.51c0-241.81,196.29-437.8,438.52-437.8h0Z"
      />
      <rect fill="#1b4d3e" x="2812.75" y="339.47" width="216.75" height="572.62" rx="9.6" ry="9.6" />
      <rect fill="#b8d935" x="3083.41" y="339.47" width="175.12" height="257.67" />
      <rect fill="#b8d935" x="3083.41" y="654.42" width="175.12" height="257.67" />
      <circle fill="none" stroke="#191919" strokeWidth="5" strokeMiterlimit="10" cx="3385.56" cy="866.94" r="46.27" />
      <path
        fill="#191919"
        d="M3404.8,889.32l-10.31-14.71c.25,0,.38-.13.63-.25,2.89-1.26,5.03-3.02,6.54-5.41s2.26-5.15,2.26-8.55c0-5.03-1.76-8.93-5.16-11.82s-8.05-4.27-14.08-4.27h-18.36v44.89h8.3v-13.08h11.94l9.18,13.08h8.93l.13.13h0ZM3392.85,853.74c1.89,1.51,2.77,3.77,2.77,6.66s-.88,5.03-2.77,6.66-4.65,2.39-8.3,2.39h-9.81v-17.85h9.81c3.65,0,6.41.75,8.3,2.26h0v-.13h0Z"
      />
      <rect
        fill="none"
        stroke="#1b4d3e"
        strokeWidth="80"
        strokeMiterlimit="10"
        x="40"
        y="40"
        width="843.91"
        height="852.3"
        rx="36.55"
        ry="36.55"
      />
      <polygon
        fill="#b8d935"
        stroke="#1b4d3e"
        strokeMiterlimit="10"
        points="722.6 322.13 462.28 452.8 201.97 322.75 461.21 192.52 722.6 322.13"
      />
      <path
        fill="#1b4d3e"
        d="M197.84,426.78c3.86-.53,7.04.85,10.74,1.41l252.53,125.67c84.54-40,167.66-83.83,251.89-124.84,33.14-11.49,50.09,34.15,18.55,49.11l-259.23,129.08c-10.18,3.72-14.14,2.57-23.85-1.31l-264.23-132.98c-17.04-14.4-7.96-43.2,13.61-46.14h0Z"
      />
      <path
        fill="#b8d935"
        d="M195.25,558c3.65-.63,7.4-.4,11.08-.22,86.11,40.47,170.4,85.05,255.95,126.78l252.92-126c29.53-7.22,45.44,28.67,22.29,46.49l-270.42,134.42-8.62.31c-91.6-42.21-181.07-89.86-271.7-134.42-18.72-12.06-13.3-43.58,8.5-47.37h0Z"
      />
    </g>
  </svg>
);
// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function EducationSkillsSectorPage() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif", margin: 0, padding: 0, backgroundColor: colors.white }}>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Poppins:wght@700;800&display=swap"
        rel="stylesheet"
      />
      <style>{`
        * { -ms-overflow-style: none; scrollbar-width: none; }
        *::-webkit-scrollbar { display: none; }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
          60% { transform: translateY(-4px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

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
