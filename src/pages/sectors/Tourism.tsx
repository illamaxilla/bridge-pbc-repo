import React, { useState, useEffect } from "react";

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

const BridgeLogoWhite = () => (
  <div style={{ display: "flex", alignItems: "center", height: "40px" }}>
    <svg viewBox="0 0 4113.76 932.3" height="36" style={{ display: "block" }}>
      <rect
        fill="none"
        stroke={colors.white}
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
        fill={colors.accent}
        stroke={colors.primary}
        strokeMiterlimit="10"
        points="722.6 322.13 462.28 452.8 201.97 322.75 461.21 192.52 722.6 322.13"
      />
      <path
        fill="#74914a"
        d="M197.84,426.78c3.86-.53,7.04.85,10.74,1.41l252.53,125.67c84.54-40,167.66-83.83,251.89-124.84,33.14-11.49,50.09,34.15,18.55,49.11l-259.23,129.08c-10.18,3.72-14.14,2.57-23.85-1.31l-264.23-132.98c-17.04-14.4-7.96-43.2,13.61-46.14Z"
      />
      <path
        fill={colors.accent}
        d="M195.25,558c3.65-.63,7.4-.4,11.08-.22,86.11,40.47,170.4,85.05,255.95,126.78l252.92-126c29.53-7.22,45.44,28.67,22.29,46.49l-270.42,134.42-8.62.31c-91.6-42.21-181.07-89.86-271.7-134.42-18.72-12.06-13.3-43.58,8.5-47.37Z"
      />
      <path
        fill={colors.white}
        stroke={colors.white}
        strokeWidth="0.5"
        strokeMiterlimit="10"
        d="M1431.68,224.45h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.05c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5l.1.1Z"
      />
      <path
        fill={colors.white}
        stroke={colors.white}
        strokeWidth="0.5"
        strokeMiterlimit="10"
        d="M1488.08,578.65v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2,27.1,13.8,39.3,22.6h0Z"
      />
      <rect fill={colors.accent} x="1427.38" y="17.35" width="205.2" height="145" />
      <rect fill={colors.white} x="1427.48" y="221.75" width="205.2" height="693.2" rx="9.6" ry="9.6" />
      <path
        fill={colors.white}
        d="M1853.06,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.56,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1v.1Z"
      />
      <path
        fill={colors.white}
        d="M2757.31,19.09h491.3c5.42,0,9.82,4.4,9.82,9.82v218.7c0,5.42-4.4,9.82-9.82,9.82h-507.36c-56.98,0-108.53,23.02-145.87,60.35-37.34,37.23-60.45,88.79-60.45,145.66,0,113.75,92.37,206.01,206.32,206.01h12.89c2.86,0,5.11,2.25,5.11,5.11v236.7c0,1.13-.92,1.94-1.94,1.94h0c-242.22,0-438.52-195.99-438.52-437.8v-18.51c0-241.81,196.29-437.8,438.52-437.8h0Z"
      />
      <rect fill={colors.white} x="2812.75" y="339.47" width="216.75" height="572.62" rx="9.6" ry="9.6" />
      <rect fill={colors.accent} x="3083.41" y="339.47" width="175.12" height="257.67" />
      <rect fill={colors.accent} x="3083.41" y="654.42" width="175.12" height="257.67" />
    </svg>
  </div>
);

// ============================================================================
// FOOTER SECTOR ICONS & GRID
// ============================================================================

const footerSectorIcons = [
  {
    key: "infra",
    label: "Infrastructure & Basic Services",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
      </svg>
    ),
  },
  {
    key: "fin",
    label: "Financial Inclusion",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
      </svg>
    ),
  },
  {
    key: "health",
    label: "Health Systems",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h5v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-5h5a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-2z" />
      </svg>
    ),
  },
  {
    key: "tech",
    label: "Technology & Innovation",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2" />
      </svg>
    ),
  },
  {
    key: "edu",
    label: "Education & Skills",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M22 10v6" />
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
      </svg>
    ),
  },
  {
    key: "agri",
    label: "Agriculture & Value Chains",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 20h10" />
        <path d="M10 20c5.5-2.5.8-6.4 3-10" />
        <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" />
        <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" />
      </svg>
    ),
  },
  {
    key: "creative",
    label: "Sports & Creative",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
  },
  {
    key: "housing",
    label: "Housing & Real Estate",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    key: "tourism",
    label: "Tourism & Hospitality",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
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
    ),
  },
  {
    key: "energy",
    label: "Energy & Renewables",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
        <path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1" />
        <path d="m11 7-3 5h4l-3 5" />
        <line x1="22" x2="22" y1="11" y2="13" />
      </svg>
    ),
  },
  {
    key: "mfg",
    label: "Manufacturing",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        <path d="M17 18h1M12 18h1M7 18h1" />
      </svg>
    ),
  },
  {
    key: "transport",
    label: "Transportation",
    icon: (c) => (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
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
    ),
  },
];

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
        {hovered !== null ? footerSectorIcons[hovered].label : "Explore 12 Sectors"}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {footerSectorIcons.map((sector, i) => {
          const isH = hovered === i;
          return (
            <a
              key={sector.key}
              href={sectorRoutes[sector.key] ?? "#"}
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

const socialIcons = [
  <svg key="li" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>,
  <svg key="tw" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>,
  <svg key="fb" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>,
];

// ============================================================================
// HEADER COMPONENT
// ============================================================================

const sectorRoutes: Record<string, string> = {
  infra: "/sectors/infrastructure", fin: "/sectors/financial", health: "/sectors/health",
  tech: "/sectors/technology", edu: "/sectors/education", agri: "/sectors/agriculture",
  creative: "/sectors/sports", housing: "/sectors/housing", tourism: "/sectors/tourism",
  energy: "/sectors/energy", mfg: "/sectors/manufacturing", transport: "/sectors/transport",
};
const navHref = (item: string) => item === "Home" ? "/" : item === "About" ? "/about" : (item === "Services" || item === "Sectors") ? "/services" : "#";

const Header = () => {
  const [hoveredNav, setHoveredNav] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Home", "Services", "Sectors", "Insight", "Contact"];

  return (
    <>
      <header
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.85)" : colors.white,
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          padding: isMobile ? "0 20px" : "0 80px",
          height: "72px",
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <BridgeLogo height={isMobile ? 32 : 40} />
        </div>

        {!isMobile && (
          <nav
            style={{
              display: "flex",
              gap: "36px",
              alignItems: "center",
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              opacity: scrolled ? 0 : 1,
              pointerEvents: scrolled ? "none" : "auto",
              transition: "opacity 0.3s ease",
            }}
          >
            {navItems.map((item, i) => {
              const isActive = item === "Sectors";
              return (
                <a
                   key={item}
                   href={navHref(item)}
                   onMouseEnter={() => setHoveredNav(i)}
                   onMouseLeave={() => setHoveredNav(null)}
                  style={{
                    color: isActive ? colors.primary : hoveredNav === i ? colors.primary : "#191919",
                    textDecoration: "none",
                    fontSize: "15px",
                    fontWeight: isActive ? "700" : "500",
                    fontFamily: "Inter, sans-serif",
                    letterSpacing: "0.3px",
                    transition: "color 0.2s ease",
                    position: "relative",
                  }}
                >
                  {item}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: "-6px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "20px",
                        height: "3px",
                        backgroundColor: colors.accent,
                        borderRadius: "2px",
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>
        )}

        {isMobile ? (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: mobileMenuOpen ? "#191919" : "transparent",
              border: `1.5px solid ${mobileMenuOpen ? "#191919" : colors.line}`,
              borderRadius: "10px",
              cursor: "pointer",
              padding: "8px",
              width: "40px",
              height: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              transition: "all 0.3s ease",
            }}
          >
            <span
              style={{
                width: "18px",
                height: "1.5px",
                backgroundColor: mobileMenuOpen ? colors.white : colors.primary,
                borderRadius: "1px",
                transition: "all 0.3s ease",
                transform: mobileMenuOpen ? "rotate(45deg) translateY(5.5px)" : "none",
              }}
            />
            <span
              style={{
                width: "18px",
                height: "1.5px",
                backgroundColor: mobileMenuOpen ? colors.white : colors.primary,
                borderRadius: "1px",
                transition: "all 0.3s ease",
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                width: "18px",
                height: "1.5px",
                backgroundColor: mobileMenuOpen ? colors.white : colors.primary,
                borderRadius: "1px",
                transition: "all 0.3s ease",
                transform: mobileMenuOpen ? "rotate(-45deg) translateY(-5.5px)" : "none",
              }}
            />
          </button>
        ) : (
          <button
            style={{
              backgroundColor: colors.primary,
              color: colors.white,
              border: "none",
              padding: "12px 24px",
              borderRadius: "50px",
              fontSize: "14px",
              fontWeight: "600",
              fontFamily: "Inter, sans-serif",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              height: "46px",
            }}
          >
            Request Access
            <span
              style={{
                width: "24px",
                height: "24px",
                backgroundColor: colors.accent,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconArrowRight />
            </span>
          </button>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {isMobile && mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "72px",
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#191919",
            zIndex: 999,
            display: "flex",
            flexDirection: "column",
            padding: "40px 24px 32px",
            gap: "0",
            animation: "fadeIn 0.25s ease",
          }}
        >
          <nav style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            {navItems.map((item, i) => {
              const isActive = item === "Sectors";
              return (
                <a
                   key={item}
                   href={navHref(item)}
                   onClick={() => setMobileMenuOpen(false)}
                  style={{
                    color: isActive ? colors.accent : "rgba(255,255,255,0.85)",
                    textDecoration: "none",
                    fontSize: "24px",
                    fontWeight: isActive ? "700" : "400",
                    fontFamily: "Inter, sans-serif",
                    padding: "20px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    letterSpacing: "-0.3px",
                  }}
                >
                  {item}
                  {isActive && (
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: "700",
                        backgroundColor: colors.accent,
                        color: "#191919",
                        padding: "3px 8px",
                        borderRadius: "50px",
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      Active
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "auto", paddingTop: "24px" }}>
            <button
              style={{
                backgroundColor: colors.accent,
                color: "#191919",
                border: "none",
                padding: "16px 24px",
                borderRadius: "12px",
                fontSize: "16px",
                fontWeight: "700",
                fontFamily: "Inter, sans-serif",
                cursor: "pointer",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              Request Access
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#191919"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <div
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "12px 0" }}
            >
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", fontFamily: "Inter, sans-serif" }}>
                info@bridgepbc.com
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
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
              <span style={{ fontWeight: "700" }}>Tourism</span> & Hospitality
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
        <div style={{ paddingTop: "16px", borderTop: `1px solid ${colors.line}` }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <div style={{ backgroundColor: colors.background, borderRadius: "12px", padding: "14px" }}>
              <div
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}
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
              <div style={{ height: "8px", backgroundColor: colors.line, borderRadius: "4px", overflow: "hidden" }}>
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

            <div style={{ backgroundColor: colors.background, borderRadius: "12px", padding: "14px" }}>
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
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#666" }}>
                  {problem.affectedLabel}
                </span>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
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
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "10px" }}>
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
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#888" }}>
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
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#888" }}>BRIDGE Solution:</span>
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
              <a
                href="#solutions"
                onClick={(e) => e.stopPropagation()}
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
                  textDecoration: "none",
                }}
              >
                View{" "}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
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
            <span style={{ fontWeight: "600" }}>$4.8 billion</span> in tourism revenue — and the pathway to{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>transformation</span> is wide open
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
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
            {problemSectionData.map((_, i) => (
              <div
                key={i}
                onClick={() => scrollToOppCard(i)}
                style={{
                  width: i === activeScrollIdx ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  backgroundColor: i === activeScrollIdx ? colors.accent : colors.line,
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

const AnimatedFlowArrow = ({ isActive, delay = 0 }) => (
  <div
    style={{
      width: "60px",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    }}
  >
    <div
      style={{
        position: "absolute",
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: isActive ? "rgba(184, 217, 53, 0.2)" : "transparent",
        animation: isActive ? "pulse 2s ease-in-out infinite" : "none",
        animationDelay: `${delay}ms`,
      }}
    />
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: isActive ? "translateX(3px)" : "translateX(0)", transition: "transform 0.3s ease" }}
    >
      <path
        d="M5 12h14M12 5l7 7-7 7"
        stroke={isActive ? colors.accent : colors.line}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    {isActive && (
      <>
        <div
          style={{
            position: "absolute",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: colors.accent,
            animation: "flowParticle 1.5s ease-in-out infinite",
            animationDelay: `${delay}ms`,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            backgroundColor: colors.accent,
            opacity: 0.6,
            animation: "flowParticle 1.5s ease-in-out infinite",
            animationDelay: `${delay + 300}ms`,
          }}
        />
      </>
    )}
    <style>{`
      @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.3); opacity: 0.1; } }
      @keyframes flowParticle { 0% { left: 0; opacity: 0; } 20% { opacity: 1; } 80% { opacity: 1; } 100% { left: 50px; opacity: 0; } }
    `}</style>
  </div>
);

const SelectCard = ({ stage, index, isActive, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ width: "220px", cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(index)}
    >
      <div
        style={{
          width: "100%",
          height: "185px",
          backgroundColor: colors.white,
          borderRadius: "20px",
          border: isActive ? `2px solid ${colors.accent}` : `1px solid ${colors.line}`,
          boxShadow: isActive
            ? "0 12px 32px rgba(27, 77, 62, 0.12), 0 4px 12px rgba(27, 77, 62, 0.08)"
            : hovered
              ? "0 16px 32px rgba(27, 77, 62, 0.12), 0 6px 12px rgba(27, 77, 62, 0.08)"
              : "0 4px 12px rgba(0,0,0,0.05)",
          overflow: "hidden",
          transition: "box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
          transform: hovered ? "translateY(-4px)" : "none",
          padding: "20px 18px 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <h4
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "15px",
            fontWeight: "700",
            color: colors.primary,
            margin: "0 0 4px 0",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          {stage.stage}
        </h4>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            color: "#888",
            textAlign: "center",
            marginBottom: "10px",
            whiteSpace: "nowrap",
          }}
        >
          {stage.actor}
        </div>
        <div
          style={{
            backgroundColor: colors.accentLight,
            padding: "5px 12px",
            borderRadius: "50px",
            fontSize: "10px",
            fontWeight: "600",
            fontFamily: "Inter, sans-serif",
            color: colors.primary,
            marginBottom: "14px",
            border: `1px solid ${colors.accent}`,
            whiteSpace: "nowrap",
          }}
        >
          {stage.population}
        </div>
        <div style={{ width: "100%", marginTop: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
            <span style={{ fontSize: "10px", fontFamily: "Inter, sans-serif", color: "#999" }}>Value Retained</span>
            <span
              style={{ fontSize: "10px", fontFamily: "Inter, sans-serif", fontWeight: "600", color: colors.primary }}
            >
              {stage.valueRetained}%
            </span>
          </div>
          <div
            style={{
              width: "100%",
              height: "5px",
              backgroundColor: colors.background,
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${stage.valueRetained}%`,
                height: "100%",
                backgroundColor: colors.accent,
                borderRadius: "3px",
                transition: "width 1s ease-out",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ValueLeakageBar = ({ isAnimating }) => (
  <div style={{ marginTop: "48px", padding: "0 20px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="2">
        <path d="M12 20V10M18 20V4M6 20v-4" />
      </svg>
      <span
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "13px",
          fontWeight: "600",
          color: colors.primary,
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Value Flow Across the Chain
      </span>
    </div>
    <div style={{ display: "flex", gap: "4px", height: "32px", borderRadius: "8px", overflow: "hidden" }}>
      {valueChainStages.map((stage, i) => (
        <div
          key={i}
          style={{
            flex: stage.valueLost || 20,
            backgroundColor: stage.color,
            opacity: isAnimating ? 1 : 0.3,
            transition: `opacity 0.5s ease ${i * 200}ms`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: "10px",
              fontFamily: "Inter, sans-serif",
              fontWeight: "600",
              color: i < 2 ? colors.primary : colors.white,
            }}
          >
            {stage.valueLost > 0 ? `-${stage.valueLost}%` : "Start"}
          </span>
        </div>
      ))}
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
      <span style={{ fontSize: "11px", fontFamily: "Inter, sans-serif", color: "#888" }}>Tourist Dollar Enters</span>
      <span style={{ fontSize: "11px", fontFamily: "Inter, sans-serif", color: "#888" }}>Community Receives ~20%</span>
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
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "60px 20px" : "100px 80px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", zIndex: 1, maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            style={{
              display: "inline-block",
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
              marginBottom: "24px",
            }}
          >
            The Process
          </span>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              letterSpacing: "-0.5px",
              color: colors.primary,
              margin: "0 0 20px 0",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: "1.2",
            }}
          >
            From <span style={{ color: colors.accent, fontWeight: "600" }}>Planning</span> to Impact
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              color: "#666",
              maxWidth: "750px",
              margin: "0 auto",
              lineHeight: "1.65",
            }}
          >
            From trip planning to community prosperity — {isMobile ? "tap" : "click"} each stage to explore where
            strategic resources and innovation create compounding value.
          </p>
        </div>

        {isMobile ? (
          /* Mobile: Centered icon row + active card below */
          <div>
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "20px" }}>
              {valueChainStages.map((stage, i) => (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(i)}
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    cursor: "pointer",
                    backgroundColor: activeStage === i ? colors.accentLight : colors.background,
                    border: activeStage === i ? `2px solid ${colors.accent}` : `1px solid ${colors.line}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                    padding: "4px",
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
                  style={{
                    backgroundColor: colors.white,
                    borderRadius: "16px",
                    padding: "24px",
                    border: `2px solid ${colors.accent}`,
                    marginBottom: "16px",
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
                    <div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "11px",
                          fontWeight: "600",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          color: "#888",
                        }}
                      >
                        {stage.actor}
                      </div>
                      <div
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "20px",
                          fontWeight: "700",
                          color: colors.primary,
                          marginTop: "4px",
                        }}
                      >
                        {stage.stage}
                      </div>
                    </div>
                    <div
                      style={{
                        backgroundColor: colors.accentLight,
                        border: `1px solid ${colors.accent}`,
                        borderRadius: "12px",
                        padding: "10px 14px",
                        textAlign: "right",
                        flexShrink: 0,
                        maxWidth: "140px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "16px",
                          fontWeight: "700",
                          color: colors.primary,
                          lineHeight: "1.2",
                        }}
                      >
                        {stage.stat}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "11px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      color: "#888",
                      marginBottom: "12px",
                    }}
                  >
                    Opportunity Areas
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {stage.painPoints.map((pp, j) => (
                      <div
                        key={j}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          backgroundColor: colors.background,
                          borderRadius: "10px",
                          padding: "12px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "12px",
                            fontWeight: "600",
                            color: colors.primary,
                            backgroundColor: colors.white,
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {j + 1}
                        </span>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#555" }}>{pp}</span>
                      </div>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "16px",
                      paddingTop: "16px",
                      borderTop: `1px solid ${colors.line}`,
                    }}
                  >
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#888" }}>
                      Value retained at this stage
                    </span>
                    <span
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "18px",
                        fontWeight: "700",
                        color: stage.valueRetained > 50 ? colors.primary : "#C62828",
                      }}
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                flexWrap: "nowrap",
              }}
            >
              {valueChainStages.map((stage, i) => (
                <React.Fragment key={stage.id}>
                  <SelectCard stage={stage} index={i} isActive={activeStage === i} onSelect={setActiveStage} />
                  {i < valueChainStages.length - 1 && <AnimatedFlowArrow isActive={isAnimating} delay={i * 200} />}
                </React.Fragment>
              ))}
            </div>

            {/* Detail Panel — inspired by Agriculture sector reference */}
            <div
              style={{
                marginTop: "32px",
                backgroundColor: colors.primary,
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 8px 40px rgba(27, 77, 62, 0.2)",
              }}
            >
              {/* Header bar */}
              <div
                style={{
                  padding: "20px 32px",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "12px",
                      backgroundColor: "rgba(184,217,53,0.12)",
                      border: "1px solid rgba(184,217,53,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: colors.accent,
                    }}
                  >
                    {valueChainIcons[active.icon]}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "18px",
                        fontWeight: "700",
                        color: colors.white,
                      }}
                    >
                      {active.stage}
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.45)",
                        marginTop: "2px",
                      }}
                    >
                      {active.actor} · {active.population}
                    </div>
                  </div>
                </div>
                {/* Stage indicators */}
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  {valueChainStages.map((_, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveStage(i)}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        backgroundColor: i === activeStage ? colors.accent : "rgba(255,255,255,0.08)",
                        border: i === activeStage ? "none" : "1px solid rgba(255,255,255,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.25s ease",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "11px",
                          fontWeight: "700",
                          color: i === activeStage ? colors.primary : "rgba(255,255,255,0.5)",
                        }}
                      >
                        {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Two-column content */}
              <div
                style={{
                  padding: "24px 32px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "32px",
                }}
              >
                {/* Left: Opportunities 2×2 */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      fontWeight: "700",
                      color: colors.accent,
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      marginBottom: "14px",
                    }}
                  >
                    Bridge Opportunities
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    {active.painPoints.map((point, i) => (
                      <div
                        key={i}
                        style={{
                          backgroundColor: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          borderRadius: "10px",
                          padding: "14px 16px",
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: colors.accent,
                            flexShrink: 0,
                            marginTop: "4px",
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "13px",
                            color: "rgba(255,255,255,0.8)",
                            lineHeight: "1.45",
                          }}
                        >
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Value leakage + retained — in shaded container */}
                  <div
                    style={{
                      marginTop: "12px",
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "10px",
                      padding: "14px 18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "22px",
                          fontWeight: "800",
                          color: colors.accent,
                          lineHeight: "1",
                        }}
                      >
                        {active.valueLost > 0 ? `${active.valueLost}%` : "—"}
                      </span>
                      <div>
                        <div
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "10px",
                            fontWeight: "600",
                            color: "#F59E0B",
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                          }}
                        >
                          Value Leakage
                        </div>
                        <div
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "11px",
                            color: "rgba(255,255,255,0.4)",
                            marginTop: "1px",
                          }}
                        >
                          lost before next stage
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "1px", height: "28px", backgroundColor: "rgba(255,255,255,0.1)" }} />
                      <div style={{ textAlign: "right" }}>
                        <div
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "10px",
                            fontWeight: "600",
                            color: colors.accent,
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                          }}
                        >
                          Communities Retain
                        </div>
                        <div
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "14px",
                            fontWeight: "700",
                            color: colors.white,
                            marginTop: "1px",
                          }}
                        >
                          ~20% of total value
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Key Insight marquee */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      fontWeight: "700",
                      color: colors.accent,
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      marginBottom: "14px",
                    }}
                  >
                    Key Insight
                  </div>
                  <div
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "14px",
                      padding: "18px 20px",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "24px",
                        fontWeight: "800",
                        color: colors.white,
                        lineHeight: "1.15",
                        marginBottom: "10px",
                      }}
                    >
                      {active.stat}
                    </div>
                    <div
                      style={{
                        width: "32px",
                        height: "3px",
                        backgroundColor: colors.accent,
                        borderRadius: "2px",
                        marginBottom: "10px",
                      }}
                    />
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.65)",
                        lineHeight: "1.6",
                      }}
                    >
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
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        <div style={{ marginBottom: isMobile ? "24px" : "40px" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "rgba(184,217,53,0.15)",
              padding: "10px 20px",
              borderRadius: "50px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontFamily: "Inter, sans-serif",
              color: colors.accent,
              marginBottom: "20px",
            }}
          >
            The Pathway to Impact
          </span>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              letterSpacing: "-0.5px",
              lineHeight: "1.2",
              color: colors.white,
              margin: "0 0 16px 0",
              maxWidth: "900px",
            }}
          >
            Ventures That Build <span style={{ color: colors.accent, fontWeight: "600" }}>Lasting Value</span>
          </h2>
          <div
            style={{
              display: isMobile ? "block" : "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "40px",
            }}
          >
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? "15px" : "16px",
                color: "rgba(255,255,255,0.6)",
                maxWidth: "580px",
                lineHeight: "1.65",
                margin: isMobile ? "0 0 20px 0" : 0,
              }}
            >
              Each venture is a bridge from insight to investment to measurable public benefit — prioritized by impact,
              feasibility, and alignment with Ghana's unique diaspora tourism advantage.
            </p>
            <div
              style={{
                display: "inline-flex",
                gap: "4px",
                flexShrink: 0,
                justifyContent: "flex-end",
                marginLeft: "auto",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "50px",
                padding: "4px",
              }}
            >
              {tiers.map((t) => (
                <button
                  key={t.key}
                  onClick={() => {
                    setActiveTier(t.key);
                    setSolScrollIdx(0);
                  }}
                  style={{
                    backgroundColor: activeTier === t.key ? colors.accent : "transparent",
                    color: activeTier === t.key ? colors.primary : "rgba(255,255,255,0.6)",
                    border: "none",
                    padding: "8px 18px",
                    borderRadius: "50px",
                    fontSize: "13px",
                    fontWeight: activeTier === t.key ? "700" : "500",
                    fontFamily: "Inter, sans-serif",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
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
              style={isMobile ? { minWidth: "80%", maxWidth: "80%", flexShrink: 0, scrollSnapAlign: "start" } : {}}
            >
              <SolutionCard solution={solution} />
            </div>
          ))}
        </div>

        {isMobile && (
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
            {filtered.map((_, i) => (
              <div
                key={i}
                onClick={() => scrollToSolCard(i)}
                style={{
                  width: i === solScrollIdx ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  backgroundColor: i === solScrollIdx ? colors.accent : "rgba(255,255,255,0.2)",
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

const SolutionCard = ({ solution }) => {
  const tierLabels = { 1: "FLAGSHIP", 2: "GROWTH", 3: "STRATEGIC" };
  return (
    <div
      style={{
        backgroundColor: colors.white,
        borderRadius: "20px",
        padding: "28px",
        border: `1px solid ${colors.line}`,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <span
          style={{
            backgroundColor: colors.accentLight,
            color: colors.primary,
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: "700",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {tierLabels[solution.tier] || "VENTURE"}
        </span>
        <span style={{ fontFamily: "Poppins, sans-serif", fontSize: "22px", fontWeight: "700", color: colors.primary }}>
          {solution.capital}
        </span>
      </div>
      <h3
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "18px",
          fontWeight: "600",
          color: colors.dark,
          margin: "0 0 10px 0",
          minHeight: "44px",
        }}
      >
        {solution.name}
      </h3>
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          color: "#666",
          lineHeight: "1.6",
          margin: "0 0 16px 0",
          flex: 1,
          minHeight: "67px",
        }}
      >
        {solution.description}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          paddingTop: "16px",
          borderTop: `1px solid ${colors.line}`,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#888" }}>{solution.impact}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "12px" }}>
        <div
          style={{
            width: "60px",
            height: "4px",
            backgroundColor: colors.line,
            borderRadius: "2px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${(solution.score / 45) * 100}%`,
              height: "100%",
              backgroundColor: colors.accent,
              borderRadius: "2px",
            }}
          />
        </div>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#bbb" }}>
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
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: isMobile ? "24px" : "48px" }}>
          <span
            style={{
              display: "inline-block",
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
              marginBottom: "24px",
            }}
          >
            The Landscape
          </span>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              letterSpacing: "-0.5px",
              lineHeight: "1.2",
              color: colors.primary,
              margin: "0 0 20px 0",
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
              maxWidth: "750px",
              margin: 0,
            }}
          >
            BRIDGE works alongside Ghana's leading tourism organizations, government agencies, and private operators —
            each bringing strengths that multiply together.
          </p>
        </div>

        {/* Mobile: Horizontal scroll pills */}
        {isMobile && (
          <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "16px" }}>
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
              {sector.competitors.map((c, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveCompetitor(i);
                    setShowMoreLandscape(false);
                  }}
                  style={{
                    padding: "5px 8px",
                    fontSize: "10px",
                    borderRadius: "50px",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    backgroundColor: activeCompetitor === i ? colors.accentLight : "transparent",
                    color: activeCompetitor === i ? colors.primary : "#999",
                    fontWeight: activeCompetitor === i ? "700" : "500",
                    border: activeCompetitor === i ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                  }}
                >
                  {c.name}
                </button>
              ))}
            </div>
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                justifyContent: "stretch",
              }}
            >
              {sector.competitors.map((c, i) => {
                const isActive = activeCompetitor === i;
                const priorityColor =
                  c.priority === "High" ? colors.accent : c.priority === "Medium" ? colors.accent : "#ccc";
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
                    style={{
                      padding: "16px 20px",
                      borderRadius: "14px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      backgroundColor: isActive ? colors.white : colors.white,
                      border: isActive ? `2px solid ${colors.primary}` : `1px solid ${colors.line}`,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "15px",
                          fontWeight: "600",
                          color: colors.dark,
                        }}
                      >
                        {c.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "#999",
                          marginTop: "4px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {c.focus}
                      </div>
                    </div>
                    <span
                      style={{
                        backgroundColor: priorityBg,
                        color: colors.primary,
                        padding: "4px 12px",
                        borderRadius: "50px",
                        fontSize: "11px",
                        fontWeight: "700",
                        fontFamily: "Inter, sans-serif",
                        flexShrink: 0,
                        marginLeft: "12px",
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
            style={{
              backgroundColor: colors.white,
              borderRadius: "24px",
              border: `1px solid ${colors.line}`,
              overflow: "hidden",
            }}
          >
            {/* Header area */}
            <div style={{ padding: isMobile ? "24px 24px 0" : "40px 40px 0" }}>
              {/* Name + Collaborate */}
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: isMobile ? "22px" : "28px",
                    fontWeight: "700",
                    color: colors.primary,
                    margin: 0,
                    letterSpacing: "-0.3px",
                  }}
                >
                  {comp.name}
                </h3>
                <span
                  style={{
                    backgroundColor: colors.accentLight,
                    color: colors.primary,
                    padding: "8px 18px",
                    borderRadius: "50px",
                    fontSize: "13px",
                    fontWeight: "700",
                    fontFamily: "Inter, sans-serif",
                    flexShrink: 0,
                    marginLeft: "16px",
                  }}
                >
                  Collaborate
                </span>
              </div>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "15px",
                  color: "#888",
                  margin: "0 0 24px 0",
                }}
              >
                Est. {comp.year} • Funding: {comp.funding}
              </p>

              {/* Stat Cards */}
              <div
                style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "28px" }}
              >
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: colors.background,
                      borderRadius: "14px",
                      padding: isMobile ? "16px 12px" : "20px 16px",
                      textAlign: "center",
                      border: `1px solid ${colors.line}`,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: isMobile ? "18px" : "24px",
                        fontWeight: "700",
                        color: colors.primary,
                        lineHeight: "1.1",
                        marginBottom: "6px",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "10px",
                        fontWeight: "600",
                        color: "#999",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: Show more toggle */}
            {isMobile && !showMoreLandscape && (
              <div style={{ padding: "0 24px 24px" }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMoreLandscape(true);
                  }}
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
                  Show more details
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={colors.primary}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>
            )}

            {/* Expanded Details */}
            {(!isMobile || showMoreLandscape) && (
              <div style={{ padding: isMobile ? "0 24px" : "0 40px" }}>
                {/* Two-column: Strengths + Where BRIDGE Helps */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: isMobile ? "24px" : "32px",
                    marginBottom: "28px",
                  }}
                >
                  {/* Their Strengths */}
                  <div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        color: colors.primary,
                        marginBottom: "16px",
                        paddingBottom: "10px",
                        borderBottom: `1px solid ${colors.line}`,
                      }}
                    >
                      Their Strengths
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      {comp.strengths.map((s, i) => (
                        <div key={i}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "6px",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "14px",
                                color: colors.dark,
                                fontWeight: "500",
                              }}
                            >
                              {s.name}
                            </span>
                            <span
                              style={{
                                fontFamily: "Inter, sans-serif",
                                fontSize: "13px",
                                color: "#888",
                                fontWeight: "600",
                              }}
                            >
                              {s.rating}/5
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
                                width: `${(s.rating / 5) * 100}%`,
                                height: "100%",
                                backgroundColor: colors.accent,
                                borderRadius: "3px",
                                transition: "width 0.5s ease",
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
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        color: colors.primary,
                        marginBottom: "16px",
                        paddingBottom: "10px",
                        borderBottom: `1px solid ${colors.line}`,
                      }}
                    >
                      Where BRIDGE Helps
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {comp.gaps.map((g, i) => (
                        <div
                          key={i}
                          style={{
                            backgroundColor: colors.accentLight,
                            borderRadius: "10px",
                            padding: "14px 18px",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <span style={{ color: colors.primary, fontSize: "8px", flexShrink: 0 }}>●</span>
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "14px",
                              color: colors.primary,
                              fontWeight: "500",
                            }}
                          >
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
              style={{
                backgroundColor: colors.primary,
                borderRadius: "16px",
                margin: isMobile ? "0 16px 16px" : "0 24px 24px",
                padding: isMobile ? "20px" : "24px 32px",
              }}
            >
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "10px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: colors.accent,
                  marginBottom: "8px",
                }}
              >
                Collaboration Opportunity
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: isMobile ? "16px" : "18px",
                  fontWeight: "500",
                  color: colors.white,
                  lineHeight: "1.4",
                  marginBottom: "16px",
                }}
              >
                {comp.bridgeOpportunity}
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {comp.gaps.map((g, i) => (
                  <span
                    key={i}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      backgroundColor: "rgba(184,217,53,0.15)",
                      color: colors.accent,
                      padding: "6px 14px",
                      borderRadius: "50px",
                      fontSize: "12px",
                      fontWeight: "600",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={colors.accent}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Mobile: Show less */}
            {isMobile && showMoreLandscape && (
              <div style={{ padding: "0 24px 24px" }}>
                <button
                  onClick={() => setShowMoreLandscape(false)}
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
                  Show less
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={colors.primary}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{ transform: "rotate(180deg)" }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
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
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: isMobile ? "24px" : "40px", textAlign: "center" }}>
          <span
            style={{
              display: "inline-block",
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
              marginBottom: "24px",
            }}
          >
            The Governance & Policy
          </span>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              letterSpacing: "-0.5px",
              lineHeight: "1.2",
              color: colors.primary,
              margin: "0 auto 20px",
              maxWidth: "900px",
            }}
          >
            Moving in Step with Ghana's{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Tourism Strategy</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              color: "#666",
              maxWidth: "750px",
              lineHeight: "1.65",
              margin: "0 auto 32px",
            }}
          >
            BRIDGE ventures align directly with the Mahama administration's Black Star Experience, Beyond the Return,
            and tourism infrastructure commitments — creating pathways for public-private collaboration.
          </p>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: isMobile ? "6px" : "12px",
                border: `1px solid ${colors.line}`,
                borderRadius: "50px",
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
                  style={{
                    padding: isMobile ? "5px 8px" : "6px 14px",
                    fontSize: isMobile ? "10px" : "12px",
                    borderRadius: "50px",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
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
          <div style={{ marginBottom: "24px" }}>
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
                      style={{
                        width: "100%",
                        backgroundColor: colors.background,
                        border: isExpanded ? `2px solid ${colors.accent}` : `2px solid ${colors.primary}`,
                        borderRadius: "16px",
                        padding: "20px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {/* Top row */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "12px",
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: badge.bg,
                            border: `1px solid ${badge.border}`,
                            borderRadius: "50px",
                            padding: "4px 10px",
                            fontSize: "9px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            fontFamily: "'DM Sans', sans-serif",
                            color: colors.primary,
                          }}
                        >
                          {p.category}
                        </span>
                        {p.relevance && (
                          <div style={{ display: "flex", gap: "4px" }}>
                            {p.relevance.map((r) => (
                              <span
                                key={r}
                                style={{
                                  fontSize: "9px",
                                  fontWeight: "600",
                                  color: colors.primary,
                                  backgroundColor: colors.white,
                                  padding: "2px 8px",
                                  borderRadius: "50px",
                                  fontFamily: "'DM Sans', sans-serif",
                                  textTransform: "uppercase",
                                }}
                              >
                                {r}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "16px",
                          fontWeight: "700",
                          color: colors.primary,
                          marginBottom: "8px",
                        }}
                      >
                        {p.policy}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "13px",
                          fontWeight: "700",
                          color: colors.accent,
                          marginBottom: "10px",
                        }}
                      >
                        {p.allocation}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "13px",
                          color: "#666",
                          lineHeight: "1.5",
                          marginBottom: "12px",
                        }}
                      >
                        {p.alignment}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "auto" }}>
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "11px",
                            fontWeight: "600",
                            color: colors.primary,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {isExpanded ? "BRIDGE alignment ▾" : "BRIDGE alignment ▸"}
                        </span>
                      </div>
                      {isExpanded && (
                        <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: `1px solid ${colors.line}` }}>
                          <div
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "11px",
                              color: "#888",
                              marginBottom: "8px",
                            }}
                          >
                            {p.body}
                          </div>
                          <div
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "13px",
                              color: "#444",
                              lineHeight: "1.6",
                              marginBottom: "16px",
                            }}
                          >
                            {p.bridgeRole}
                          </div>
                          {p.pillars && (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                              {p.pillars.map((pill) => (
                                <span
                                  key={pill}
                                  style={{
                                    backgroundColor: colors.accentLight,
                                    color: colors.primary,
                                    padding: "5px 12px",
                                    borderRadius: "50px",
                                    fontSize: "11px",
                                    fontWeight: "700",
                                    fontFamily: "'DM Sans', sans-serif",
                                    border: `1px solid ${colors.accent}`,
                                  }}
                                >
                                  {pill}
                                </span>
                              ))}
                            </div>
                          )}
                          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            {p.bridgeVentures.map((v) => (
                              <div
                                key={v}
                                style={{
                                  backgroundColor: colors.primary,
                                  borderRadius: "10px",
                                  padding: "10px 14px",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                }}
                              >
                                <div
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
                                    fontFamily: "'DM Sans', sans-serif",
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
                        </div>
                      )}
                    </div>
                    {/* Scroll indicator dots */}
                    <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
                      {displayed.map((_, di) => (
                        <div
                          key={di}
                          onClick={() => {
                            setMobileCardIndex(di);
                            setExpandedCard(null);
                          }}
                          style={{
                            width: di === safeIdx ? "24px" : "8px",
                            height: "8px",
                            borderRadius: "4px",
                            cursor: "pointer",
                            backgroundColor: di === safeIdx ? colors.accent : colors.line,
                            transition: "all 0.3s ease",
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
              className="policy-scroll"
              style={{
                display: "flex",
                gap: "16px",
                overflowX: "auto",
                paddingBottom: "4px",
                marginBottom: "16px",
                alignItems: "flex-start",
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
                    style={{
                      minWidth: isExpanded ? "360px" : "280px",
                      maxWidth: isExpanded ? "360px" : "280px",
                      flexShrink: 0,
                      backgroundColor: colors.background,
                      border: isExpanded ? `2px solid ${colors.accent}` : `2px solid ${colors.primary}`,
                      borderRadius: "16px",
                      padding: "24px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "12px",
                      }}
                    >
                      <span
                        style={{
                          backgroundColor: badge.bg,
                          border: `1px solid ${badge.border}`,
                          borderRadius: "50px",
                          padding: "4px 10px",
                          fontSize: "9px",
                          fontWeight: "700",
                          textTransform: "uppercase",
                          fontFamily: "'DM Sans', sans-serif",
                          color: colors.primary,
                        }}
                      >
                        {p.category}
                      </span>
                      {p.relevance && (
                        <div style={{ display: "flex", gap: "4px" }}>
                          {p.relevance.map((r) => (
                            <span
                              key={r}
                              style={{
                                fontSize: "9px",
                                fontWeight: "600",
                                color: colors.primary,
                                backgroundColor: colors.white,
                                padding: "2px 8px",
                                borderRadius: "50px",
                                fontFamily: "'DM Sans', sans-serif",
                                textTransform: "uppercase",
                              }}
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "16px",
                        fontWeight: "700",
                        color: colors.primary,
                        minHeight: "42px",
                        marginBottom: "8px",
                      }}
                    >
                      {p.policy}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px",
                        fontWeight: "700",
                        color: colors.accent,
                        marginBottom: "10px",
                      }}
                    >
                      {p.allocation}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px",
                        color: "#666",
                        lineHeight: "1.5",
                        minHeight: "40px",
                        marginBottom: "12px",
                      }}
                    >
                      {p.alignment}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "auto" }}>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "11px",
                          fontWeight: "600",
                          color: colors.primary,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {isExpanded ? "BRIDGE alignment ▾" : "BRIDGE alignment ▸"}
                      </span>
                    </div>
                    {isExpanded && (
                      <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: `1px solid ${colors.line}` }}>
                        <div
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "11px",
                            color: "#888",
                            marginBottom: "8px",
                          }}
                        >
                          {p.body}
                        </div>
                        <div
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "13px",
                            color: "#444",
                            lineHeight: "1.6",
                            marginBottom: "16px",
                          }}
                        >
                          {p.bridgeRole}
                        </div>
                        {p.pillars && (
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                            {p.pillars.map((pill) => (
                              <span
                                key={pill}
                                style={{
                                  backgroundColor: colors.accentLight,
                                  color: colors.primary,
                                  padding: "5px 12px",
                                  borderRadius: "50px",
                                  fontSize: "11px",
                                  fontWeight: "700",
                                  fontFamily: "'DM Sans', sans-serif",
                                  border: `1px solid ${colors.accent}`,
                                }}
                              >
                                {pill}
                              </span>
                            ))}
                          </div>
                        )}
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {p.bridgeVentures.map((v) => (
                            <div
                              key={v}
                              style={{
                                backgroundColor: colors.primary,
                                borderRadius: "10px",
                                padding: "10px 14px",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
                              <div
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
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontSize: "13px",
                                  fontWeight: "600",
                                  color: colors.white,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                }}
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
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "32px" }}>
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
                  style={{
                    width: di === desktopScrollIdx ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    backgroundColor: di === desktopScrollIdx ? colors.accent : colors.line,
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Bar */}
        <div
          style={{
            backgroundColor: colors.primary,
            borderRadius: isMobile ? "12px" : "16px",
            padding: isMobile ? "20px" : "28px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            flexDirection: isMobile ? "column" : "row",
            gap: "16px",
            textAlign: isMobile ? "left" : "left",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: isMobile ? "16px" : "18px",
                fontWeight: "600",
                color: colors.white,
                marginBottom: "4px",
              }}
            >
              BRIDGE complements — never competes with — government vision.
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.6)" }}>
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
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
              flexShrink: 0,
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

const useCounter = (target, duration = 1200, active = true) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, active, duration]);
  return count;
};

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
      <div style={isMobile ? { display: "flex", justifyContent: "space-between", alignItems: "baseline" } : {}}>
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
          {formatted}
        </div>
        <div
          style={{
            fontSize: "10px",
            fontWeight: "700",
            color: colors.accent,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            fontFamily: "'DM Sans', sans-serif",
            marginTop: isMobile ? "0" : "4px",
          }}
        >
          {item.trend}
        </div>
      </div>
      <div>
        <div
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: isMobile ? "14px" : "15px",
            fontWeight: "700",
            color: colors.primary,
          }}
        >
          {item.label}
        </div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#666", lineHeight: "1.5" }}>
          {item.description}
        </div>
      </div>
      {!isMobile && (
        <div
          style={{
            backgroundColor: isEven ? colors.background : "rgba(27,77,62,0.04)",
            borderRadius: "10px",
            padding: "10px 16px",
          }}
        >
          <div
            style={{
              fontSize: "9px",
              fontWeight: "700",
              color: "#aaa",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: "4px",
            }}
          >
            LINKED VENTURES
          </div>
          <div
            style={{
              fontSize: "11px",
              fontWeight: "500",
              color: colors.primary,
              fontFamily: "'DM Sans', sans-serif",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
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
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <span
          style={{
            display: "inline-block",
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
            marginBottom: "24px",
          }}
        >
          The Impact
        </span>
        <h2
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "28px" : "42px",
            fontWeight: "300",
            letterSpacing: "-0.5px",
            lineHeight: "1.2",
            color: colors.primary,
            margin: "0 0 12px 0",
          }}
        >
          What Changes When <span style={{ fontWeight: "600" }}>Tourism</span>
          {!isMobile && <br />}
          {isMobile ? " " : ""}
          <span style={{ fontWeight: "600" }}>Infrastructure</span>{" "}
          <span style={{ color: colors.accent, fontWeight: "600" }}>Works</span>
        </h2>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "15px" : "16px",
            color: "#666",
            lineHeight: "1.65",
            maxWidth: "700px",
            margin: "0 0 40px 0",
          }}
        >
          When destinations meet global standards, local communities share in visitor spending, and cultural heritage
          generates revenue — the ripple effects create sustainable jobs, preserve identity, and diversify Ghana's
          economy.
        </p>

        {/* Controls Bar */}
        <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "24px" }}>
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
                    padding: isMobile ? "5px 10px" : "6px 14px",
                    fontSize: isMobile ? "11px" : "12px",
                    borderRadius: "50px",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    transition: "all 0.2s ease",
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
                      padding: isMobile ? "5px 8px" : "6px 14px",
                      fontSize: isMobile ? "10px" : "12px",
                      borderRadius: "50px",
                      cursor: "pointer",
                      fontFamily: "Inter, sans-serif",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
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
                    style={{
                      padding: isMobile ? "5px 8px" : "6px 14px",
                      fontSize: isMobile ? "10px" : "12px",
                      borderRadius: "50px",
                      cursor: "pointer",
                      fontFamily: "Inter, sans-serif",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
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
            style={{
              backgroundColor: colors.background,
              borderRadius: isMobile ? "16px" : "20px",
              border: `2px solid ${colors.primary}`,
              overflow: "hidden",
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
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: isMobile ? "center" : "flex-start",
                    marginBottom: "24px",
                    flexDirection: isMobile ? "column" : "row",
                    gap: isMobile ? "12px" : "0",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: isMobile ? "24px" : "28px",
                        fontWeight: "700",
                        color: colors.primary,
                      }}
                    >
                      {s.title}
                    </div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#888" }}>
                      {s.subtitle}
                    </div>
                  </div>
                  <div style={{ textAlign: isMobile ? "center" : "right" }}>
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
                      {s.stat}
                    </div>
                    <div
                      style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#888", marginTop: "4px" }}
                    >
                      {s.statLabel}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {s.outcomes.map((outcome, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        padding: "14px 20px",
                        borderRadius: "12px",
                        backgroundColor: i % 2 === 0 ? colors.background : "transparent",
                      }}
                    >
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          backgroundColor: i % 2 === 0 ? colors.white : colors.background,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "12px",
                            fontWeight: "700",
                            color: colors.primary,
                          }}
                        >
                          {i + 1}
                        </span>
                      </div>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "15px",
                          color: "#333",
                          lineHeight: "1.5",
                        }}
                      >
                        {outcome}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    marginTop: "24px",
                    padding: "16px 24px",
                    backgroundColor: colors.primary,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: "700",
                      color: colors.accent,
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    KEY ADVANTAGE
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.85)",
                      fontWeight: "500",
                      marginLeft: "16px",
                    }}
                  >
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
  const [activeNode, setActiveNode] = useState(null);
  const [showMoreRipple, setShowMoreRipple] = useState(false);

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
                      href="#"
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
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    style={{
                      transform: showMoreRipple ? "rotate(180deg)" : "rotate(0)",
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

const IconCheckSmall = () => (
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

const InvestmentCTASection = () => {
  const isMobile = useIsMobile();
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
                  href="#"
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
          Ready to Welcome the World to <span style={{ color: colors.accent, fontWeight: "600" }}>Ghana?</span>
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
// FOOTER
// ============================================================================

const Footer = () => {
  const isMobile = useIsMobile();

  return (
    <footer style={{ backgroundColor: colors.primary, padding: "0" }}>
      {/* Section separator */}
      <div style={{ padding: "0 80px" }}>
        <div style={{ height: "0.5px", backgroundColor: "rgba(255,255,255,0.08)" }} />
      </div>

      {isMobile ? (
        /* ═══ MOBILE FOOTER ═══ */
        <div style={{ padding: "32px 20px 16px", display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Row 1: Logo + Nav labels */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div style={{ flexShrink: 0 }}>
              <BridgeLogoWhite />
            </div>
            <div
              style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginLeft: "auto", justifyContent: "flex-end" }}
            >
              {["Company", "Services", "Resources", "Insights"].map((label) => (
                <a
                  key={label}
                  href="#"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.5px",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          {/* Row 2: Subscribe inline */}
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              placeholder="Subscribe to insights"
              style={{
                flex: 1,
                padding: "11px 14px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.12)",
                backgroundColor: "rgba(255,255,255,0.05)",
                color: colors.white,
                fontSize: "12px",
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
              }}
            />
            <button
              style={{
                backgroundColor: colors.accent,
                color: colors.primary,
                border: "none",
                padding: "11px 18px",
                fontSize: "12px",
                fontWeight: "700",
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                borderRadius: "8px",
              }}
            >
              {"\u2192"}
            </button>
          </div>
          {/* Row 3: Contact + Social */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>
                Accra, Ghana
              </span>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.15)" }}>{"\u00B7"}</span>
              <span
                style={{
                  fontSize: "12px",
                  color: colors.accent,
                  fontWeight: "600",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                info@bridgepbc.com
              </span>
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              {socialIcons.map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "6px",
                    backgroundColor: "rgba(255,255,255,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  <span style={{ transform: "scale(0.8125)", display: "flex" }}>{icon}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ═══ DESKTOP FOOTER ═══ */
        <>
          <div style={{ padding: "64px 80px 32px", display: "grid", gridTemplateColumns: "325px 1fr", gap: "220px" }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ marginBottom: "24px" }}>
                  <BridgeLogoWhite />
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: "1.8",
                    margin: "0 0 28px",
                    maxWidth: "320px",
                  }}
                >
                  Blending resources and innovation across the integrated sectors for development, growth, and
                  empowerment.
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: "rgba(255,255,255,0.55)",
                    fontFamily: "'DM Sans', sans-serif",
                    margin: "0 0 4px",
                    lineHeight: "1.7",
                  }}
                >
                  Accra, Ghana
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    color: colors.accent,
                    fontFamily: "'DM Sans', sans-serif",
                    margin: "0",
                    fontWeight: "600",
                  }}
                >
                  info@bridgepbc.com
                </p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {[
                  { title: "Company", links: ["About BRIDGE", "Our Approach", "Sectors", "Contact Us"] },
                  {
                    title: "Services",
                    links: [
                      "Research & Guidance",
                      "Venture Development",
                      "Direct Investment",
                      "Strategic Partnerships",
                    ],
                  },
                  { title: "Resources", links: ["White Paper", "Case Studies", "Research Library", "Data & Reports"] },
                  {
                    title: "Insights",
                    links: ["Insights & Analysis", "Sector Briefs", "Policy Updates", "Annual Review"],
                  },
                ].map((col) => (
                  <div key={col.title}>
                    <h4
                      style={{
                        fontSize: "12px",
                        fontWeight: "700",
                        color: colors.accent,
                        fontFamily: "'DM Sans', sans-serif",
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        marginBottom: "24px",
                      }}
                    >
                      {col.title}
                    </h4>
                    {col.links.map((link) => (
                      <a
                        key={link}
                        href="#"
                        style={{
                          display: "block",
                          fontSize: "14px",
                          color: "rgba(255,255,255,0.6)",
                          fontFamily: "'DM Sans', sans-serif",
                          textDecoration: "none",
                          marginBottom: "14px",
                        }}
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══ ALIGNED BOTTOM ROW: Subscribe + Sector Grid ═══ */}
          <div
            style={{
              padding: "0 80px 20px",
              display: "grid",
              gridTemplateColumns: "325px 1fr",
              gap: "220px",
              alignItems: "start",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "rgba(255,255,255,0.4)",
                  fontFamily: "'DM Sans', sans-serif",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  display: "block",
                  marginBottom: "12px",
                  lineHeight: "1",
                }}
              >
                Subscribe to Insights
              </span>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  placeholder="Your email address"
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: colors.white,
                    fontSize: "13px",
                    fontFamily: "'DM Sans', sans-serif",
                    outline: "none",
                    height: "44px",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  style={{
                    backgroundColor: colors.accent,
                    color: colors.primary,
                    border: "none",
                    padding: "12px 20px",
                    fontSize: "13px",
                    fontWeight: "700",
                    fontFamily: "'DM Sans', sans-serif",
                    cursor: "pointer",
                    borderRadius: "8px",
                    height: "44px",
                    boxSizing: "border-box",
                  }}
                >
                  {"\u2192"}
                </button>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                {socialIcons.map((icon, i) => (
                  <a
                    key={i}
                    href="#"
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "8px",
                      backgroundColor: "rgba(255,255,255,0.06)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "rgba(255,255,255,0.45)",
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <SectorGrid />
            </div>
          </div>
        </>
      )}

      {/* Bottom bar */}
      <div
        style={{
          padding: isMobile ? "16px 20px" : "20px 80px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.25)", fontFamily: "'DM Sans', sans-serif" }}>
          {"\u00A9"} 2026 BRIDGE PBC
        </span>
        <div style={{ display: "flex", gap: isMobile ? "12px" : "20px" }}>
          {["Terms", "Privacy", "Accessibility"].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.25)",
                fontFamily: "'DM Sans', sans-serif",
                textDecoration: "none",
              }}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function TourismHospitalitySectorPage() {
  return (
    <div style={{ fontFamily: "Inter, sans-serif", margin: 0, padding: 0, backgroundColor: colors.white }}>
      <style>{`@keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-8px); } 60% { transform: translateY(-4px); } } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } .hide-scrollbar::-webkit-scrollbar{display:none} .hide-scrollbar{scrollbar-width:none;-ms-overflow-style:none}`}</style>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Poppins:wght@700;800&display=swap"
        rel="stylesheet"
      />

      <Header />
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
      <Footer />
    </div>
  );
}
