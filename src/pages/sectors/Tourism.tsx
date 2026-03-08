import React, { useState, useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// ============================================================================
// BRIDGE SECTOR PAGE: Tourism & Hospitality
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

const MOBILE_BREAKPOINT = 768;
const CONTENT_MAX_WIDTH = "1200px";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

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

// ============================================================================
// ICON COMPONENTS
// ============================================================================

const IconPlane = () => (
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
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
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
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
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
    <path d="M12 5v14M5 12l7 7 7-7" />
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

const IconPalette = () => (
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
    <circle cx="13.5" cy="6.5" r=".5" />
    <circle cx="17.5" cy="10.5" r=".5" />
    <circle cx="8.5" cy="7.5" r=".5" />
    <circle cx="6.5" cy="12.5" r=".5" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

const IconGraduation = () => (
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
);

const IconSprout = () => (
  <svg
    width="20"
    height="20"
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

const IconLuggage = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" />
    <path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" />
    <path d="M10 20h4" />
    <circle cx="16" cy="20" r="2" />
    <circle cx="8" cy="20" r="2" />
  </svg>
);

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

// Premium Value Chain Icons
const valueChainIcons = {
  globe: (
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
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  plane: (
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
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  ),
  hotel: (
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
      <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
      <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
    </svg>
  ),
  compass: (
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
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  users: (
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
  ),
};

// ============================================================================
// BRIDGE LOGO COMPONENTS
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

export default function TourismHospitalitySectorPage() {
  const isMobile = useIsMobile();
  return (
    <div style={{ fontFamily: "Inter, sans-serif", margin: 0, padding: 0, backgroundColor: colors.white }}>
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Poppins:wght@700;800&display=swap" rel="stylesheet" />
      <SiteHeader />
      <section style={{ backgroundColor: colors.primary, padding: isMobile ? "100px 20px 80px" : "140px 80px 100px", minHeight: "60vh", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(184,217,53,0.12)", border: "1px solid rgba(184,217,53,0.3)", borderRadius: 50, padding: "8px 18px", marginBottom: 28 }}>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: colors.accent }}>{sectorData.category}</span>
          </div>
          <h1 style={{ fontFamily: "'Poppins',sans-serif", fontSize: isMobile ? 36 : 64, fontWeight: 700, color: colors.white, margin: "0 0 24px", lineHeight: 1.1, maxWidth: 800 }}>{sectorData.name}</h1>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: isMobile ? 16 : 20, color: "rgba(255,255,255,0.75)", maxWidth: 640, lineHeight: 1.7, margin: "0 0 40px" }}>{sectorData.problemSubheadline}</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {sectorData.keyStats?.map((stat, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "20px 24px", minWidth: 160 }}>
                <div style={{ fontFamily: "'Poppins',sans-serif", fontSize: 28, fontWeight: 700, color: colors.accent }}>{stat.value}</div>
                <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "80px 80px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: isMobile ? 28 : 40, fontWeight: 700, color: colors.primary, marginBottom: 40 }}>Key Challenges</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap: 24 }}>
            {sectorData.painPoints?.map((p, i) => (
              <div key={i} style={{ background: "#F3F5F2", borderRadius: 16, padding: 28, border: "1px solid #DEDEDE" }}>
                <h3 style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, fontWeight: 700, color: colors.primary, margin: "0 0 12px" }}>{p.title}</h3>
                <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 15, color: "#4B5563", lineHeight: 1.65, margin: 0 }}>{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section style={{ backgroundColor: colors.primary, padding: isMobile ? "60px 20px" : "80px 80px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: isMobile ? 28 : 40, fontWeight: 700, color: colors.white, marginBottom: 16 }}>Ready to Build in {sectorData.shortName}?</h2>
          <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 18, color: "rgba(255,255,255,0.7)", marginBottom: 36 }}>Capital range: {sectorData.capitalRange} · {sectorData.ventures} venture opportunities identified</p>
          <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: colors.accent, color: colors.primary, textDecoration: "none", padding: "16px 36px", borderRadius: 50, fontSize: 16, fontWeight: 700, fontFamily: "'DM Sans',sans-serif" }}>Start a Conversation</a>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
