import React, { useState, useEffect, Fragment } from "react";
import SiteHeader from "@/components/SiteHeader";

// ============================================================================
// BRIDGE SECTOR PAGE: Sports, Entertainment & Creative Industries
// INTEGRATED VERSION with Premium ValueChain Section
// ============================================================================
// Design System: Dark Green #1B4D3E, Lime #B8D935, Off-white #F3F5F2
// ============================================================================

const colors = {
  primary: "#1B4D3E",
  accent: "#B8D935",
  accentLight: "#E8F5E0",
  background: "#F3F5F2",
  white: "#FFFFFF",
  dark: "#191919",
  line: "#DEDEDE",
  accentText: "#5C7A1F",
  lightGreen: "#E8F5E0",
  ctaGreen: "#2E5A4D",
  warning: "#F59E0B",
  warningBg: "#FEF3C7",
  warningText: "#92400E",
  critical: "#EF4444",
  criticalBg: "#FEE2E2",
};

const CONTENT_MAX_WIDTH = "1200px";

const MOBILE_BREAKPOINT = 768;

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

const useCounter = (target, duration = 1200, active = true) => {
  const [count, setCount] = useState(0);
  const numTarget = parseFloat(String(target).replace(/[^0-9.]/g, "")) || 0;
  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    let start = 0;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * numTarget * 10) / 10);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [numTarget, duration, active]);
  return count;
};

// ============================================================================
// SECTOR DATA - Sports, Entertainment & Creative Industries
// ============================================================================

const sectorData = {
  id: 7,
  slug: "sports-entertainment",
  name: "Sports, Entertainment & Creative Industries",
  shortName: "Creative Industries",
  category: "The Creative Economy",
  categoryColor: "#1565C0",

  capitalRange: "$10-22M",
  ventures: 22,
  jobsImpact: "3M+ creatives",
  gdpContribution: "1.5%",

  problemHeadline: "Where Talent Meets Opportunity on the Global Stage",
  problemSubheadline:
    "Ghana's creative talent already commands global attention — Afrobeats topping charts worldwide, footballers showcasing excellence in elite leagues, and Kente inspiring international runways. A $4.8B creative economy with room to grow, where strategic investment in production infrastructure, rights systems, and market access can unlock exponential value for 3M+ creatives.",

  keyStats: [
    { value: "$4.8B", label: "Creative Economy Scale", detail: "And growing — 2024 est." },
    { value: "$10M", label: "Domestic Revenue Upside", detail: "Massive recapture potential" },
    { value: "First-mover", label: "Studio Infrastructure", detail: "Greenfield opportunity" },
    { value: "3M+", label: "Creatives to Empower", detail: "Artists, athletes & artisans" },
  ],

  painPoints: [
    {
      title: "Creative Value Recapture",
      description:
        "Artists achieving global recognition represent an extraordinary recapture opportunity — modern rights management and digital tracking can channel revenue to creators.",
      rootCauses: ["Rights system modernization", "Digital tracking opportunity", "Framework strengthening"],
      quantification: "<1% of global music revenue — massive upside",
    },
    {
      title: "Production Infrastructure",
      description:
        "A greenfield opportunity to build world-class production facilities — enabling creators to produce internationally competitive content from home, attracting diaspora talent back, and creating shared-use infrastructure.",
      rootCauses: ["Greenfield studio opportunity", "Local assembly potential", "Workforce training pathway"],
      quantification: "Greenfield — first-mover studio advantage",
    },
    {
      title: "Youth Sports Development",
      description:
        "Massive demand for quality youth sports development creates a pathway for integrated academies combining athletics, education, and ethical talent development — building the next generation of Ghanaian excellence.",
      rootCauses: ["Academy standards opportunity", "Agent certification pathway", "Education integration model"],
      quantification: "Grassroots development ready for scaled investment and partnership",
    },
    {
      title: "Heritage Textile Revitalization",
      description:
        "6,000+ artisans preserving irreplaceable cultural heritage represent a premium market opportunity — authenticity verification and e-commerce reconnect makers globally.",
      rootCauses: ["Authenticity verification", "IP protection opportunity", "Youth engagement pathway"],
      quantification: "6,000+ artisans ready for market reconnection",
    },
  ],

  solutions: [
    {
      tier: 1,
      cat: "production",
      name: "Black Star Recording Studios",
      description:
        "Professional recording and mastering facilities in Accra and Kumasi meeting international standards for world-class music production.",
      capital: "$1.5-3M",
      score: 43,
      impact: "Enables local world-class content production",
      model: "Commercial studio with training integration",
    },
    {
      tier: 1,
      cat: "talent",
      name: "Diaspora Mentorship Network",
      description:
        "Structured program connecting diaspora entertainment professionals with local talent across music, film, sports, and fashion.",
      capital: "$0.2-0.4M",
      score: 42,
      impact: "Transfers expertise, builds career pathways",
      model: "Mentorship platform with skills matching",
    },
    {
      tier: 1,
      cat: "finance",
      name: "Creative Arts Financing Facility",
      description:
        "Co-investment vehicle providing production financing, advance funding, and working capital for vetted creative projects.",
      capital: "$1-2M",
      score: 41,
      impact: "Unlocks growth capital for creative enterprises",
      model: "Revenue-share and advance mechanisms",
    },
    {
      tier: 1,
      cat: "finance",
      name: "Heritage Textiles Market Platform",
      description:
        "E-commerce connecting authentic artisan producers directly to diaspora and premium international consumers with verification.",
      capital: "$0.5-1M",
      score: 41,
      impact: "Premium market access for 6,000+ artisans",
      model: "Authenticity-certified marketplace",
    },
    {
      tier: 1,
      cat: "talent",
      name: "Ghana Youth Football Academy",
      description:
        "Integrated academy with quality facilities, certified coaches, medical support, and mandatory education for ethical development.",
      capital: "$1.5-2.5M",
      score: 40,
      impact: "Protects youth, builds ethical talent pipeline",
      model: "Education-integrated sports development",
    },
    {
      tier: 1,
      cat: "finance",
      name: "GHAMRO Capacity Building",
      description:
        "Administrative strengthening with digital tracking systems, transparent distribution, and streaming-era royalty management.",
      capital: "$0.5-1M",
      score: 39,
      impact: "Enables artists to capture value from their work",
      model: "Institutional reform + technology deployment",
    },
    {
      tier: 1,
      cat: "production",
      name: "Film Production Training Institute",
      description:
        "Comprehensive training in screenwriting, directing, cinematography, editing, and production management with diaspora faculty.",
      capital: "$0.5-1.5M",
      score: 39,
      impact: "Builds professional creative workforce pipeline",
      model: "NFA partnership with international accreditation",
    },
    {
      tier: 2,
      cat: "talent",
      name: "Ashanti Fashion Design Incubator",
      description:
        "Kumasi-based creative center integrating Kente craftsmanship with contemporary design, business incubation, and market access.",
      capital: "$0.75-1.5M",
      score: 37,
      impact: "Bridges heritage craft and modern fashion",
      model: "Design incubation + diaspora designer mentorship",
    },
    {
      tier: 2,
      cat: "production",
      name: "Film Production Hub",
      description:
        "Sound stages, production equipment, and technical services complementing government Ananse Studio plans for mid-budget films.",
      capital: "$2-4M",
      score: 36,
      impact: "Creates production infrastructure for film",
      model: "Shared-use facility with training integration",
    },
    {
      tier: 2,
      cat: "production",
      name: "Post-Production & VFX Center",
      description:
        "Color grading, sound mixing, visual effects, and editing suites reducing reliance on international post-production houses.",
      capital: "$1-2M",
      score: 35,
      impact: "Keeps post-production value onshore",
      model: "Shared facility with subscription tiers",
    },
    {
      tier: 2,
      cat: "finance",
      name: "Creative IP Insurance Fund",
      description:
        "Insurance products protecting creative works, production investments, and event risks — a first for Ghana's creative sector.",
      capital: "$0.5-1M",
      score: 34,
      impact: "De-risks creative investment for all stakeholders",
      model: "Pooled insurance with development partners",
    },
    {
      tier: 2,
      cat: "talent",
      name: "Sports Science & Analytics Hub",
      description:
        "Data-driven athlete assessment, injury prevention, and performance optimization integrating modern sports science with local practice.",
      capital: "$0.5-1M",
      score: 34,
      impact: "Professionalizes athlete development pathways",
      model: "Technology-enabled sports development",
    },
    {
      tier: 2,
      cat: "production",
      name: "Live Events & Festival Infrastructure",
      description:
        "Modular stage, sound, and lighting equipment pool enabling professional festival and concert production across Ghana.",
      capital: "$0.75-1.5M",
      score: 33,
      impact: "Builds event production capacity nationally",
      model: "Equipment rental + event management",
    },
    {
      tier: 2,
      cat: "finance",
      name: "Artist Advance & Royalty Platform",
      description:
        "Technology platform enabling transparent royalty advances, split payments, and revenue sharing across creative collaborations.",
      capital: "$0.3-0.6M",
      score: 33,
      impact: "Fair compensation for creative professionals",
      model: "Fintech platform with artist-first terms",
    },
    {
      tier: 2,
      cat: "talent",
      name: "Creative Entrepreneurship Academy",
      description:
        "Business skills training for artists covering contracts, financial literacy, marketing, and IP management to build sustainable careers.",
      capital: "$0.2-0.5M",
      score: 32,
      impact: "Transforms artists into sustainable businesses",
      model: "Cohort-based training with mentorship",
    },
    {
      tier: 2,
      cat: "production",
      name: "Animation & Gaming Studio",
      description:
        "Digital content studio focused on Ghanaian storytelling through animation, gaming, and interactive media for local and global audiences.",
      capital: "$1-2M",
      score: 32,
      impact: "Opens digital content creation pathways",
      model: "IP-driven studio with licensing revenue",
    },
    {
      tier: 2,
      cat: "finance",
      name: "Kente Authenticity & Certification",
      description:
        "Blockchain-verified authentication system connecting genuine Kente and Adinkra products to premium markets globally.",
      capital: "$0.3-0.5M",
      score: 31,
      impact: "Protects heritage crafts from counterfeits",
      model: "Certification with premium market access",
    },
    {
      tier: 2,
      cat: "talent",
      name: "Pan-African Distribution Network",
      description:
        "Cross-border content distribution connecting Ghanaian creatives to audiences across Africa through strategic media partnerships.",
      capital: "$0.5-1M",
      score: 31,
      impact: "Scales Ghanaian content to continental reach",
      model: "Aggregation + distribution partnerships",
    },
  ],

  competitors: [
    {
      name: "Fidelity Bank FCCF",
      focus: "Creative industry financing",
      gap: "Co-investment scaling opportunity",
      year: "2023",
      funding: "Bank-backed",
      priority: "High",
      strengths: [
        { name: "Sector Understanding", rating: 4 },
        { name: "Financial Products", rating: 3 },
        { name: "Artist Reach", rating: 3 },
      ],
      gaps: ["Scale-up potential", "Innovation partnership", "Advance mechanism co-design"],
      bridgeOpportunity: "Co-investment partner for Creative Arts Financing Facility",
    },
    {
      name: "National Film Authority",
      focus: "Film industry regulation & promotion",
      gap: "Infrastructure implementation partner",
      year: "2020",
      funding: "Gov't",
      priority: "High",
      strengths: [
        { name: "Shoot in Ghana Campaign", rating: 4 },
        { name: "International Partnerships", rating: 4 },
        { name: "Regulatory Authority", rating: 5 },
      ],
      gaps: ["Studio partnership ready", "Co-investment opportunity", "Training collaboration"],
      bridgeOpportunity: "Film Production Hub and Training Institute partnership",
    },
    {
      name: "Black Star Experience",
      focus: "Creative economy initiative",
      gap: "Implementation acceleration opportunity",
      year: "2025",
      funding: "GHS 20M seed",
      priority: "High",
      strengths: [
        { name: "Presidential Priority", rating: 5 },
        { name: "Comprehensive Vision", rating: 5 },
        { name: "$5B Target", rating: 4 },
      ],
      gaps: ["Execution partnership", "Co-investment alignment", "Implementation acceleration"],
      bridgeOpportunity: "Implementation partner across all seven pillars",
    },
    {
      name: "GHAMRO",
      focus: "Music rights management",
      gap: "Digital modernization pathway",
      year: "1990s",
      funding: "Statutory",
      priority: "Medium",
      strengths: [
        { name: "Statutory Monopoly", rating: 5 },
        { name: "Legal Framework", rating: 4 },
        { name: "Artist Registry", rating: 2 },
      ],
      gaps: [
        "Collection system upgrade potential",
        "Digital tracking opportunity",
        "Trust-building through transparency",
      ],
      bridgeOpportunity: "Capacity building and digital systems deployment",
    },
    {
      name: "Audiomack/Boomplay",
      focus: "African music streaming",
      gap: "Platform partnership and artist advocacy",
      year: "2012/2015",
      funding: "$100M+",
      priority: "Low",
      strengths: [
        { name: "African Artist Support", rating: 4 },
        { name: "Mobile-First", rating: 5 },
        { name: "Local Content", rating: 4 },
      ],
      gaps: ["Artist-centric model opportunity", "Value rebalancing potential", "Ghana-specific partnership"],
      bridgeOpportunity: "Direct-to-fan channels and better platform terms",
    },
    {
      name: "Kente Weaver Associations",
      focus: "Traditional craft governance",
      gap: "Market access and e-commerce enablement",
      year: "Traditional",
      funding: "Self-funded",
      priority: "Medium",
      strengths: [
        { name: "Cultural Legitimacy", rating: 5 },
        { name: "Quality Knowledge", rating: 5 },
        { name: "Community Authority", rating: 5 },
      ],
      gaps: ["E-commerce enablement", "Youth engagement pathway", "Market reconnection"],
      bridgeOpportunity: "Heritage Textiles Market Platform anchoring partner",
    },
  ],

  policyAlignment: [
    {
      policy: "Black Star Experience Initiative",
      allocation: "$5B target by 2027",
      alignment:
        "Direct alignment across all seven pillars—Cinema, Audio, Cuisine, Aesthetics, Style, Literature, Culture",
    },
    {
      policy: "2026 Budget Creative Industries Seed",
      allocation: "GHS 20M",
      alignment: "Co-investment partner for production infrastructure and creative financing",
    },
    {
      policy: "20% Film Tax Rebate",
      allocation: "Tax incentive",
      alignment: "Enhances viability of Film Production Hub and attracts international co-productions",
    },
    {
      policy: "VAT Elimination on Local Textiles",
      allocation: "Tax policy",
      alignment: "Strengthens heritage textiles market competitiveness vs imports",
    },
    {
      policy: "National Theatre Refurbishment",
      allocation: "$30M (Chinese gov't)",
      alignment: "Complements venue infrastructure with content production capabilities",
    },
    {
      policy: "Ananse Studio / Pixel Ray Partnership",
      allocation: "Multi-million $",
      alignment: "BRIDGE Film Hub complements with mid-budget production and training focus",
    },
  ],

  crossSector: [
    {
      sectorId: 4,
      name: "Technology & Innovation",
      connection: "Streaming tech, digital rights management, e-commerce platforms",
      multiplier: "3.5x",
      synergies: [
        "Digital rights tracking for streaming royalties",
        "E-commerce platforms for heritage crafts",
        "Production tech and post-production tools",
      ],
      bridgeVentures: ["GHAMRO Capacity Building", "Heritage Textiles Platform"],
      impact:
        "Technology infrastructure enables rights management, digital distribution, and market access for creative content",
    },
    {
      sectorId: 2,
      name: "Financial Inclusion",
      connection: "Creative financing, artist advances, mobile money ticketing",
      multiplier: "2.8x",
      synergies: [
        "Artist advance financing mechanisms",
        "Mobile money for ticket and merch sales",
        "Creative industry insurance products",
      ],
      bridgeVentures: ["Creative Arts Financing", "Production Advance Fund"],
      impact:
        "Financial infrastructure provides growth capital, payment rails, and risk mitigation for creative enterprises",
    },
    {
      sectorId: 9,
      name: "Tourism & Hospitality",
      connection: "Cultural tourism, festival programming, diaspora visit experiences",
      multiplier: "4.2x",
      synergies: [
        "Festival tourism and diaspora programming",
        "Heritage village and craft workshop tours",
        "Year of Return cultural infrastructure",
      ],
      bridgeVentures: ["Festival Programming Hub", "Heritage Experience Tours"],
      impact:
        "Cultural tourism transforms creative content into experiences that drive visitor spending and diaspora engagement",
    },
    {
      sectorId: 11,
      name: "Manufacturing",
      connection: "Textile production, merchandise manufacturing, equipment assembly",
      multiplier: "2.4x",
      synergies: [
        "Kente and Adinkra textile scaling",
        "Branded merchandise production lines",
        "Studio equipment local assembly",
      ],
      bridgeVentures: ["Ashanti Fashion Incubator", "Heritage Textiles Platform"],
      impact:
        "Manufacturing capacity turns creative designs into scalable products — from fashion lines to branded merchandise",
    },
    {
      sectorId: 5,
      name: "Education & Skills",
      connection: "Film/music education, arts curriculum, sports academy schooling",
      multiplier: "3.1x",
      synergies: [
        "Film and music professional training",
        "Arts integration in national curriculum",
        "Sports academy education pathways",
      ],
      bridgeVentures: ["Film Production Training", "Youth Football Academy"],
      impact:
        "Education systems produce the skilled workforce that creative industries need to grow and compete globally",
    },
  ],

  relatedSectors: [
    {
      id: 4,
      name: "Technology & Innovation",
      icon: "lightbulb",
      reason: "Streaming, digital rights, e-commerce platforms",
    },
    {
      id: 9,
      name: "Tourism & Hospitality",
      icon: "plane",
      reason: "Cultural tourism, festivals, diaspora experiences",
    },
    { id: 2, name: "Financial Inclusion", icon: "wallet", reason: "Creative financing, artist advances, mobile money" },
  ],
};

// ============================================================================
// PREMIUM VALUE CHAIN DATA
// ============================================================================

const valueChainStages = [
  {
    id: 1,
    stage: "Creation",
    actor: "Artists, Athletes & Artisans",
    population: "3M+ creatives active",
    icon: "palette",
    valueRetained: 100,
    valueLost: 0,
    painPoints: [
      "Royalty system modernization",
      "Social protection opportunity",
      "Fair contract frameworks",
      "Equipment access pathways",
    ],
    stat: "85%",
    statLabel: "ready for social protection",
    bridgeSolution: "Creative Arts Financing Facility + GHAMRO Capacity Building",
  },
  {
    id: 2,
    stage: "Production",
    actor: "Studios, Academies & Workshops",
    population: "Greenfield opportunity",
    icon: "studio",
    valueRetained: 70,
    valueLost: 30,
    painPoints: [
      "Greenfield studio opportunity",
      "Local assembly potential",
      "Workforce training pathway",
      "Academy standards opportunity",
    ],
    stat: "Zero",
    statLabel: "studios — first-mover edge",
    bridgeSolution: "Black Star Recording Studios + Film Production Hub",
  },
  {
    id: 3,
    stage: "Rights & IP",
    actor: "GHAMRO, Copyright Office & Agents",
    population: "System modernization ready",
    icon: "shield",
    valueRetained: 45,
    valueLost: 25,
    painPoints: [
      "Rights system modernization",
      "Digital tracking opportunity",
      "Authenticity verification",
      "IP framework strengthening",
    ],
    stat: "<1%",
    statLabel: "of global revenue to recapture",
    bridgeSolution: "GHAMRO Capacity Building + Kente Authenticity System",
  },
  {
    id: 4,
    stage: "Distribution",
    actor: "Platforms, Cinemas & Markets",
    population: "Global reach to leverage",
    icon: "globe",
    valueRetained: 25,
    valueLost: 20,
    painPoints: [
      "Platform partnership potential",
      "Screen expansion opportunity",
      "Direct-to-fan channels",
      "Value chain shortening",
    ],
    stat: "$10M",
    statLabel: "domestic revenue to scale",
    bridgeSolution: "Heritage Textiles Market Platform + Direct-to-Fan Channels",
  },
  {
    id: 5,
    stage: "Consumption",
    actor: "Audiences, Diaspora & Global Market",
    population: "3M diaspora + global",
    icon: "users",
    valueRetained: 15,
    valueLost: 10,
    painPoints: [
      "Domestic value capture",
      "Fan engagement platforms",
      "Authenticity premium",
      "Local production transition",
    ],
    stat: "$1.9B",
    statLabel: "Year of Return opportunity",
    bridgeSolution: "Diaspora Mentorship Network + Cultural Heritage Tourism",
  },
];

// ============================================================================
// ICON COMPONENTS
// ============================================================================

const IconWheat = () => (
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
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    <path d="M16 12a4 4 0 0 0-8 0" />
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

const IconPlane = () => (
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
);

const IconMusic = () => (
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
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const IconGraduationCap = () => (
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
    <path d="M6 12v5c0 0 3 3 6 3s6-3 6-3v-5" />
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
  palette: (
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
  ),
  studio: (
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
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  shield: (
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
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
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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
// BRIDGELOGO COMPONENT
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

const footerLinkHref = (link: string): string => {
  const map: Record<string, string> = {
    "About BRIDGE": "/about",
    "Our Approach": "/methodology",
    "Sectors": "/services",
    "Contact Us": "/contact",
    "Research & Guidance": "/services",
    "Venture Development": "/services",
    "Direct Investment": "/services",
    "Strategic Partnerships": "/services",
    "White Paper": "/resources",
    "Case Studies": "/resources",
    "Research Library": "/resources",
    "Data & Reports": "/resources",
    "Insights & Analysis": "/insights",
    "Sector Briefs": "/insights",
    "Policy Updates": "/insights",
    "Annual Review": "/insights",
  };
  return map[link] || "#";
};

// ============================================================================
// SECTION 1: HERO
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
              <span style={{ fontWeight: "700" }}>Sports</span> & Creative{!isMobile && <br />} Entertainment
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
              Where talent meets opportunity on the global stage.
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
// SECTION 2: THE PROCESS (Value Chain) (Premium Interactive)
// ============================================================================

/* ── Process Section SVG Icons ── */
const ProcessIcon = ({ d, size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {typeof d === "string" ? <path d={d} /> : d}
  </svg>
);

const processIcons = {
  search: (
    <ProcessIcon
      d={
        <React.Fragment>
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </React.Fragment>
      }
    />
  ),
  academy: (
    <ProcessIcon
      d={
        <React.Fragment>
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </React.Fragment>
      }
    />
  ),
  shield: <ProcessIcon d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  trophy: (
    <ProcessIcon
      d={
        <React.Fragment>
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
          <path d="M4 22h16" />
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
        </React.Fragment>
      }
    />
  ),
  star: (
    <ProcessIcon
      d={
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      }
    />
  ),
  palette: (
    <ProcessIcon
      d={
        <React.Fragment>
          <circle cx="13.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="17.5" cy="10.5" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="8.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="6.5" cy="12.5" r="1.5" fill="currentColor" stroke="none" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </React.Fragment>
      }
    />
  ),
  music: (
    <ProcessIcon
      d={
        <React.Fragment>
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </React.Fragment>
      }
    />
  ),
  lock: (
    <ProcessIcon
      d={
        <React.Fragment>
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </React.Fragment>
      }
    />
  ),
  globe: (
    <ProcessIcon
      d={
        <React.Fragment>
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </React.Fragment>
      }
    />
  ),
  users: (
    <ProcessIcon
      d={
        <React.Fragment>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </React.Fragment>
      }
    />
  ),
};

const processStageIcons = {
  sports: ["search", "academy", "shield", "trophy", "star"],
  entertainment: ["palette", "music", "lock", "globe", "users"],
};

const sportsStages = [
  {
    id: 1,
    stage: "Discovery",
    actor: "Youth & Communities",
    population: "10M+ youth population",
    valueRetained: 100,
    painPoints: [
      "Fragmented grassroots scouting",
      "No standardized ID systems",
      "School sports underfunded",
      "Rural talent overlooked",
    ],
    statNumber: "10M+",
    statLabel: "youth with untapped athletic potential",
    bridgeSolution: "Community sports mapping platform + school athletics program partnerships",
    description:
      "Millions of young Ghanaians with natural athletic talent but no structured pathway to development or discovery.",
  },
  {
    id: 2,
    stage: "Development",
    actor: "Academies & Coaches",
    population: "500+ informal academies",
    valueRetained: 72,
    painPoints: [
      "Unregulated academy standards",
      "Education often sacrificed",
      "Medical support absent",
      "Coach certification gaps",
    ],
    statNumber: "85%",
    statLabel: "of academies lack basic medical support",
    bridgeSolution: "Ghana Youth Football Academy — integrated athletics, education, and ethical talent development",
    description:
      "Where raw talent should become professional-ready, but unregulated environments risk exploitation and educational neglect.",
  },
  {
    id: 3,
    stage: "Representation",
    actor: "Agents & Managers",
    population: "Largely unregulated",
    valueRetained: 48,
    painPoints: [
      "Unregistered agent activity",
      "Exploitative contract terms",
      "Player rights unprotected",
      "Family financial pressure",
    ],
    statNumber: "<20%",
    statLabel: "of agents are FIFA-licensed in West Africa",
    bridgeSolution: "Agent certification program + player rights legal clinic + contract transparency framework",
    description:
      "The critical juncture where young athletes are most vulnerable to exploitation through unfair contracts and unlicensed intermediaries.",
  },
  {
    id: 4,
    stage: "Competition",
    actor: "Leagues & Federations",
    population: "18 Premier League clubs",
    valueRetained: 30,
    painPoints: [
      "Substandard facility quality",
      "Broadcast revenue minimal",
      "Sponsorship undervalued",
      "Fan experience limited",
    ],
    statNumber: "$10M",
    statLabel: "domestic league revenue potential",
    bridgeSolution: "Sports facility modernization + broadcast infrastructure + fan engagement platforms",
    description:
      "Domestic leagues with passionate fanbases but lacking infrastructure and commercial frameworks to retain talent and revenue.",
  },
  {
    id: 5,
    stage: "Legacy",
    actor: "Athletes & Communities",
    population: "1,000+ retired pros",
    valueRetained: 15,
    painPoints: [
      "No post-career transition plan",
      "Financial literacy gaps",
      "Community reinvestment rare",
      "Mentorship pathways absent",
    ],
    statNumber: "60%",
    statLabel: "of retired athletes face financial difficulty",
    bridgeSolution: "Diaspora Mentorship Network + athlete transition program + community sports investment fund",
    description:
      "Where career earnings should become generational wealth and community impact, but most athletes lack the systems for it.",
  },
];

const entertainmentStages = [
  {
    id: 1,
    stage: "Creation",
    actor: "Artists & Artisans",
    population: "3M+ active creatives",
    valueRetained: 100,
    painPoints: [
      "Royalty system outdated",
      "Social protection absent",
      "Fair contracts lacking",
      "Equipment access limited",
    ],
    statNumber: "3M+",
    statLabel: "creatives powering a $4.8B economy",
    bridgeSolution: "Creative Arts Financing Facility + GHAMRO Capacity Building for rights management",
    description:
      "Ghana's extraordinary creative talent producing globally recognized work with minimal institutional support.",
  },
  {
    id: 2,
    stage: "Production",
    actor: "Studios & Workshops",
    population: "Greenfield opportunity",
    valueRetained: 70,
    painPoints: [
      "Zero world-class studios",
      "Equipment import barriers",
      "Workforce training gaps",
      "Local assembly potential",
    ],
    statNumber: "Zero",
    statLabel: "international-standard studios — first-mover edge",
    bridgeSolution: "Black Star Recording Studios + Film Production Hub + training integration",
    description:
      "A greenfield opportunity to build the production infrastructure that keeps creative talent and their revenue in Ghana.",
  },
  {
    id: 3,
    stage: "Rights & IP",
    actor: "GHAMRO & Copyright Office",
    population: "System modernization ready",
    valueRetained: 45,
    painPoints: ["Rights tracking manual", "Digital systems absent", "Authenticity unverified", "IP enforcement weak"],
    statNumber: "<1%",
    statLabel: "of global music revenue captured — massive upside",
    bridgeSolution: "GHAMRO digital tracking deployment + Kente authenticity verification system",
    description:
      "The stage where creator value is most lost — outdated rights systems mean artists receive a fraction of what they deserve.",
  },
  {
    id: 4,
    stage: "Distribution",
    actor: "Platforms & Markets",
    population: "Global reach to leverage",
    valueRetained: 25,
    painPoints: [
      "Platform terms unfavorable",
      "Cinema screens scarce",
      "Direct-to-fan undeveloped",
      "Artisan e-commerce absent",
    ],
    statNumber: "$10M",
    statLabel: "domestic revenue to recapture and scale",
    bridgeSolution: "Heritage Textiles Market Platform + direct-to-fan digital channels",
    description:
      "Where content reaches audiences but value leaks to international platforms — requiring local distribution infrastructure.",
  },
  {
    id: 5,
    stage: "Consumption",
    actor: "Audiences & Diaspora",
    population: "3M diaspora + global",
    valueRetained: 15,
    painPoints: [
      "Domestic spending limited",
      "Fan platforms nonexistent",
      "Authenticity premium lost",
      "Cultural tourism untapped",
    ],
    statNumber: "$1.9B",
    statLabel: "Year of Return — diaspora spending opportunity",
    bridgeSolution: "Diaspora Mentorship Network + Cultural Heritage Tourism programming",
    description:
      "Global audiences and the Ghanaian diaspora eager to engage — but lacking channels that benefit creators directly.",
  },
];

const retColor = (v) => (v >= 70 ? colors.accent : v >= 40 ? "rgba(184,217,53,0.65)" : "rgba(184,217,53,0.4)");

const ValueChainSection = () => {
  const isMobile = useIsMobile();
  const [activeTrack, setActiveTrack] = useState("sports");
  const [activeStage, setActiveStage] = useState(0);
  const [fading, setFading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const stages = activeTrack === "sports" ? sportsStages : entertainmentStages;
  const iconKeys = processStageIcons[activeTrack];
  const active = stages[activeStage];

  const switchTrack = (track) => {
    if (track === activeTrack) return;
    setFading(true);
    setTimeout(() => {
      setActiveTrack(track);
      setActiveStage(0);
      setShowMore(false);
      setFading(false);
    }, 220);
  };

  return (
    <section style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* \u2550\u2550\u2550 HEADER \u2550\u2550\u2550 */}
        <div style={{ marginBottom: isMobile ? "32px" : "60px", textAlign: "center" }}>
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
            The Process
          </span>

          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              color: colors.primary,
              letterSpacing: "-0.5px",
              margin: "0 0 16px 0",
              lineHeight: "1.2",
            }}
          >
            From Talent <span style={{ fontWeight: "600" }}>Recognition</span> to{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Global Impact</span>
          </h2>

          <p
            style={{
              fontSize: isMobile ? "15px" : "16px",
              color: "#555",
              maxWidth: "620px",
              margin: "0 auto 36px",
              lineHeight: "1.7",
            }}
          >
            Two distinct pathways where Ghanaian talent meets global opportunity \u2014 each with unique value chains,
            challenges, and BRIDGE interventions.
          </p>

          {/* \u2550\u2550\u2550 TOGGLE \u2550\u2550\u2550 */}
          <div
            style={{
              display: "inline-flex",
              border: `1px solid ${colors.line}`,
              borderRadius: "50px",
              overflow: "hidden",
              backgroundColor: colors.background,
              padding: isMobile ? "3px" : "4px",
            }}
          >
            {[
              { id: "sports", label: "Sport" },
              { id: "entertainment", label: "Arts" },
            ].map((track) => {
              const isOn = activeTrack === track.id;
              return (
                <button
                  key={track.id}
                  onClick={() => switchTrack(track.id)}
                  style={{
                    padding: isMobile ? "5px 12px" : "6px 24px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: isMobile ? "11px" : "12px",
                    fontWeight: isOn ? "700" : "500",
                    fontFamily: "Inter, sans-serif",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    backgroundColor: isOn ? colors.white : "transparent",
                    color: isOn ? colors.primary : "#999",
                    borderRadius: "50px",
                    boxShadow: isOn ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                    transition: "all 0.2s ease",
                    minWidth: isMobile ? "70px" : "90px",
                  }}
                >
                  {track.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* \u2550\u2550\u2550 ANIMATED BODY \u2550\u2550\u2550 */}
        <div
          style={{
            opacity: fading ? 0 : 1,
            transform: fading ? "translateY(6px)" : "translateY(0)",
            transition: "opacity 0.22s ease, transform 0.22s ease",
          }}
        >
          {/* \u2500\u2500\u2500 STAGE TABS \u2500\u2500\u2500 */}
          {isMobile ? (
            <div
              style={{
                display: "flex",
                gap: "8px",
                overflowX: "auto",
                WebkitOverflowScrolling: "touch",
                margin: "0 -20px",
                padding: "0 20px 8px",
                marginBottom: "20px",
                justifyContent: "center",
              }}
            >
              {stages.map((stage, i) => {
                const isAct = i === activeStage;
                return (
                  <button
                    key={`${activeTrack}-${stage.id}`}
                    onClick={() => {
                      setActiveStage(i);
                      setShowMore(false);
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "6px",
                      padding: "12px 16px",
                      minWidth: "72px",
                      flexShrink: 0,
                      backgroundColor: isAct ? colors.primary : colors.background,
                      border: `1.5px solid ${isAct ? colors.primary : colors.line}`,
                      borderRadius: "12px",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                    }}
                  >
                    <div style={{ color: isAct ? colors.accent : "#bbb", transition: "color 0.3s ease" }}>
                      {processIcons[iconKeys[i]]}
                    </div>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                        color: isAct ? colors.white : "#888",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {stage.stage.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div style={{ display: "flex", gap: "12px", marginBottom: "28px", paddingTop: "24px" }}>
              {stages.map((stage, i) => {
                const isAct = i === activeStage;
                return (
                  <button
                    key={`${activeTrack}-${stage.id}`}
                    onClick={() => setActiveStage(i)}
                    style={{
                      flex: 1,
                      padding: "32px 14px 18px",
                      backgroundColor: isAct ? colors.primary : colors.background,
                      border: `2px solid ${colors.primary}`,
                      borderRadius: "14px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      textAlign: "center",
                      position: "relative",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: isAct ? colors.accent : colors.background,
                        border: `2px solid ${isAct ? colors.primary : "#ccc"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: isAct ? colors.primary : "#bbb",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {processIcons[iconKeys[i]]}
                    </div>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: "700",
                        color: isAct ? "rgba(255,255,255,0.45)" : "#bbb",
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      Stage {stage.id}
                    </span>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: isAct ? colors.white : "#888",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {stage.stage}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* \u2500\u2500\u2500 DETAIL CARD \u2500\u2500\u2500 */}
          <div
            style={{
              backgroundColor: colors.background,
              borderRadius: isMobile ? "16px" : "20px",
              border: `2px solid ${colors.primary}`,
              overflow: "hidden",
              minHeight: isMobile ? "auto" : "460px",
            }}
          >
            <div style={isMobile ? {} : { display: "grid", gridTemplateColumns: "1fr 1fr", height: "100%" }}>
              {/* LEFT \u2014 Context */}
              <div style={{ padding: isMobile ? "24px" : "40px 44px", overflow: "hidden" }}>
                <div style={{ marginBottom: "6px" }}>
                  <span
                    style={{
                      fontSize: isMobile ? "14px" : "16px",
                      fontWeight: "700",
                      color: colors.primary,
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                    }}
                  >
                    {active.actor}
                  </span>
                </div>
                <div style={{ fontSize: "14px", color: "#777", marginBottom: "16px" }}>{active.population}</div>
                <p style={{ fontSize: "14px", color: "#555", lineHeight: "1.7", margin: "0 0 24px 0" }}>
                  {active.description}
                </p>

                {(!isMobile || showMore) && (
                  <>
                    <div style={{ height: "1px", backgroundColor: colors.line, marginBottom: "20px" }} />
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: "700",
                        color: colors.primary,
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        marginBottom: "12px",
                        opacity: 0.5,
                      }}
                    >
                      Challenges & Opportunities
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {active.painPoints.map((p, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: isMobile ? "8px 12px" : "10px 14px",
                            backgroundColor: "rgba(184,217,53,0.1)",
                            borderRadius: "10px",
                            border: "1px solid rgba(184,217,53,0.25)",
                          }}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#D97706"
                            strokeWidth="2"
                            style={{ flexShrink: 0 }}
                          >
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                            <path d="M12 9v4" />
                            <path d="M12 17h.01" />
                          </svg>
                          <span style={{ fontSize: "13px", color: colors.primary, lineHeight: "1.4" }}>{p}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* RIGHT \u2014 Metrics */}
              <div
                style={{
                  padding: isMobile ? "0 24px 24px" : "40px 44px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Value retention */}
                <div>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: "700",
                      color: colors.primary,
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                      marginBottom: "14px",
                      opacity: 0.5,
                    }}
                  >
                    Value Retained at This Stage
                  </div>
                  <div
                    style={{
                      height: isMobile ? "32px" : "38px",
                      backgroundColor: "#ddd",
                      borderRadius: "19px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${active.valueRetained}%`,
                        height: "100%",
                        backgroundColor: retColor(active.valueRetained),
                        borderRadius: "19px",
                        transition: "width 0.8s ease, background-color 0.8s ease",
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: active.valueRetained > 20 ? "16px" : "0",
                        justifyContent: active.valueRetained <= 20 ? "center" : "flex-start",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: "700",
                          color: active.valueRetained > 60 ? colors.primary : colors.white,
                        }}
                      >
                        {active.valueRetained}%
                      </span>
                    </div>
                  </div>
                  {/* Mini markers */}
                  <div
                    style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", padding: "0 4px" }}
                  >
                    {stages.map((s, idx) => (
                      <div
                        key={idx}
                        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}
                      >
                        <div
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: idx === activeStage ? colors.primary : "#ccc",
                            transition: "background-color 0.3s ease",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "10px",
                            fontWeight: "600",
                            color: idx === activeStage ? colors.primary : "#bbb",
                            transition: "color 0.3s ease",
                          }}
                        >
                          {s.valueRetained}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {(!isMobile || showMore) && (
                  <>
                    {/* Stat card */}
                    <div
                      style={{
                        padding: isMobile ? "20px" : "28px",
                        backgroundColor: colors.white,
                        borderRadius: "16px",
                        border: `1px solid ${colors.line}`,
                        textAlign: "center",
                        marginTop: "24px",
                      }}
                    >
                      <div
                        style={{
                          fontSize: isMobile ? "36px" : "42px",
                          fontWeight: "700",
                          color: colors.primary,
                          fontFamily: "Poppins, sans-serif",
                          letterSpacing: "-1px",
                          lineHeight: "1.1",
                          marginBottom: "6px",
                        }}
                      >
                        {active.statNumber}
                      </div>
                      <div style={{ fontSize: "13px", color: "#777", lineHeight: "1.45" }}>{active.statLabel}</div>
                    </div>

                    {/* BRIDGE intervention */}
                    <div
                      style={{
                        marginTop: "16px",
                        padding: isMobile ? "14px 16px" : "16px 18px",
                        backgroundColor: colors.primary,
                        borderRadius: "14px",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "26px",
                          height: "26px",
                          borderRadius: "50%",
                          backgroundColor: colors.accent,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "1px",
                        }}
                      >
                        <span style={{ color: colors.primary, fontSize: "12px", fontWeight: "800" }}>B</span>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "10px",
                            fontWeight: "700",
                            color: colors.accent,
                            textTransform: "uppercase",
                            letterSpacing: "1.5px",
                            marginBottom: "5px",
                          }}
                        >
                          BRIDGE Intervention
                        </div>
                        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: "1.6" }}>
                          {active.bridgeSolution}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Show more — mobile only */}
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
            </div>
          </div>

          {/* \u2500\u2500\u2500 FLOW PATHWAY \u2014 desktop only \u2500\u2500\u2500 */}
          {!isMobile && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "18px",
                padding: "8px 0",
              }}
            >
              {stages.map((stage, i) => (
                <Fragment key={stage.id}>
                  <div
                    onClick={() => setActiveStage(i)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer",
                      opacity: i === activeStage ? 1 : 0.35,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <div
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        backgroundColor: i === activeStage ? colors.primary : colors.background,
                        border: `2px solid ${i === activeStage ? colors.primary : colors.line}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: i === activeStage ? colors.accent : "#999",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {processIcons[iconKeys[i]]}
                    </div>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                        color: i === activeStage ? colors.primary : "#aaa",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {stage.stage}
                    </span>
                  </div>
                  {i < stages.length - 1 && (
                    <svg
                      width="40"
                      height="12"
                      viewBox="0 0 40 12"
                      style={{
                        margin: "0 2px",
                        marginBottom: "22px",
                        opacity: i < activeStage ? 0.7 : 0.25,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      <line
                        x1="0"
                        y1="6"
                        x2="30"
                        y2="6"
                        stroke={i < activeStage ? colors.accent : colors.line}
                        strokeWidth="2"
                      />
                      <polygon points="30,1 39,6 30,11" fill={i < activeStage ? colors.accent : colors.line} />
                    </svg>
                  )}
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SECTION 3: THE OPPORTUNITY
// ============================================================================

const problemSectionData = [
  {
    id: 1,
    title: "Creative Value Recapture",
    description:
      "Artists achieving global recognition represent an extraordinary recapture opportunity — modern rights management and digital tracking can channel revenue to creators.",
    rootCauses: [
      { title: "Rights Modernization", description: "Digital systems opportunity" },
      { title: "IP Framework Strengthening", description: "Protection infrastructure" },
      { title: "Platform Rebalancing", description: "Value recapture pathways" },
      { title: "Fair Contract Frameworks", description: "Artist-centric structures" },
    ],
    quantification: "<1% of global music revenue captured domestically",
    severity: "High Priority",
    severityScore: 95,
    affectedCount: "$4.8B",
    affectedLabel: "creative GDP to recapture",
    bridgeSolution: "GHAMRO Capacity Building + Creative Arts Financing",
  },
  {
    id: 2,
    title: "Production Infrastructure",
    description:
      "A greenfield opportunity to build world-class production facilities — enabling creators to produce competitive content from home and attract diaspora talent.",
    rootCauses: [
      { title: "Greenfield Opportunity", description: "First-mover advantage" },
      { title: "Local Assembly Potential", description: "Cost reduction pathway" },
      { title: "Training Pathway", description: "Workforce development" },
      { title: "Financing Innovation", description: "Creative industry lending" },
    ],
    quantification: "Zero professional studios — first-mover advantage",
    severity: "High Priority",
    severityScore: 92,
    affectedCount: "3M+",
    affectedLabel: "creatives ready for facilities",
    bridgeSolution: "Black Star Recording Studios + Film Production Hub",
  },
  {
    id: 3,
    title: "Youth Sports Development",
    description:
      "Massive demand for quality youth sports development creates a pathway for integrated academies combining elite athletics, education, and ethical talent development.",
    rootCauses: [
      { title: "Standards Opportunity", description: "Academy certification" },
      { title: "Family Engagement", description: "Transparent models" },
      { title: "Agent Certification", description: "Professional standards" },
      { title: "Education Integration", description: "Dual-pathway model" },
    ],
    quantification: "1,000s of youth athletes ready for quality programs",
    severity: "Strategic",
    severityScore: 85,
    affectedCount: "1000s",
    affectedLabel: "youth athletes to develop",
    bridgeSolution: "Ghana Youth Football Academy + Certification Program",
  },
  {
    id: 4,
    title: "Heritage Textile Revival",
    description:
      "6,000+ artisans preserving irreplaceable cultural heritage represent a premium market — authenticity verification and e-commerce can reconnect makers to global demand.",
    rootCauses: [
      { title: "Authenticity Premium", description: "Verification advantage" },
      { title: "IP Opportunity", description: "Geographical indication" },
      { title: "Market Re-Link", description: "Direct-to-consumer pathways" },
      { title: "Youth Apprenticeship", description: "Knowledge preservation" },
    ],
    quantification: "6,000+ artisans ready for global market access",
    severity: "Strategic",
    severityScore: 78,
    affectedCount: "6,000",
    affectedLabel: "artisans ready for access",
    bridgeSolution: "Heritage Textiles Market Platform + Kente Authenticity",
  },
];

const severityConfig = {
  "High Priority": { bg: colors.accentLight, text: colors.primary, bar: colors.accent },
  Strategic: { bg: "rgba(184,217,53,0.12)", text: "#5C7A1F", bar: colors.accent },
};

const ProblemCard = ({ problem, isExpanded, onToggle }) => {
  const isMobile = useIsMobile();
  const sev = severityConfig[problem.severity];

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
      {/* Zone 1 — Title + Badge + Description */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <h3
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "16px" : "18px",
            fontWeight: "600",
            color: colors.dark,
            margin: 0,
            lineHeight: "1.3",
            flex: 1,
          }}
        >
          {problem.title}
        </h3>
        <span
          style={{
            backgroundColor: sev.bg,
            padding: "6px 14px",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: "700",
            color: sev.text,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            whiteSpace: "nowrap",
            flexShrink: 0,
            marginLeft: "12px",
          }}
        >
          {problem.severity}
        </span>
      </div>

      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: isMobile ? "13px" : "14px",
          color: "#666",
          lineHeight: "1.6",
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
        style={{
          backgroundColor: colors.accentLight,
          borderRadius: "12px",
          padding: isMobile ? "8px 12px" : "10px 16px",
          marginBottom: isExpanded ? "16px" : 0,
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

      {/* Expanded Content */}
      {isExpanded && (
        <div style={{ borderTop: `1px solid ${colors.line}`, paddingTop: "16px" }}>
          {/* Zone 3 — Priority + Scale */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: "12px",
              marginBottom: "20px",
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
                    color: sev.text,
                    backgroundColor: sev.bg,
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
                    width: `${problem.severityScore}%`,
                    height: "100%",
                    backgroundColor: sev.bar,
                    borderRadius: "4px",
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
                  marginBottom: "8px",
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
                    lineHeight: "1",
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

          {/* Zone 4 — Opportunity Drivers */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#888"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
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
              {problem.rootCauses.map((cause, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: isMobile ? "10px 12px" : "12px 14px",
                    backgroundColor: colors.background,
                    borderRadius: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: colors.primary,
                      color: colors.white,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: "600",
                      fontFamily: "Inter, sans-serif",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: isMobile ? "13px" : "14px",
                        fontWeight: "600",
                        color: colors.dark,
                        lineHeight: "1.3",
                      }}
                    >
                      {cause.title}
                    </div>
                    <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#888", marginTop: "2px" }}>
                      {cause.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Zone 5 — BRIDGE Solution Footer */}
          <div
            style={{
              borderTop: `1px solid ${colors.line}`,
              paddingTop: "16px",
              display: "flex",
              alignItems: isMobile ? "flex-start" : "center",
              gap: isMobile ? "8px" : "16px",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.accent}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#888", flexShrink: 0 }}>
                BRIDGE Solution:
              </span>
              <span
                style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: "600", color: colors.primary }}
              >
                {problem.bridgeSolution}
              </span>
            </div>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                fontWeight: "500",
                color: colors.primary,
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                flexShrink: 0,
                cursor: "pointer",
              }}
            >
              View
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const ProblemSection = () => {
  const isMobile = useIsMobile();
  const [expandedCard, setExpandedCard] = useState(null);

  return (
    <section
      style={{
        backgroundColor: colors.background,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Section Header */}
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
              color: colors.primary,
              letterSpacing: "-0.5px",
              margin: "0 0 20px 0",
              lineHeight: "1.2",
              maxWidth: "820px",
            }}
          >
            Where Opportunity Meets <span style={{ color: colors.accent, fontWeight: "600" }}>Creative Energy</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              color: "#666",
              maxWidth: "680px",
              lineHeight: "1.65",
              margin: 0,
            }}
          >
            Ghana's creative landscape holds extraordinary potential. Each area below represents a pathway where
            targeted investment and strategic innovation can unlock compounding value for artists, communities, and
            investors alike.
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
          {problemSectionData.map((problem, i) => (
            <div
              key={problem.id}
              style={
                isMobile
                  ? {
                      minWidth: "85%",
                      maxWidth: "85%",
                      flexShrink: 0,
                      scrollSnapAlign: "start",
                    }
                  : {}
              }
            >
              <ProblemCard
                problem={problem}
                isExpanded={expandedCard === i}
                onToggle={() => setExpandedCard(expandedCard === i ? null : i)}
              />
            </div>
          ))}
        </div>

        {/* Mobile scroll indicators */}
        {isMobile && (
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
            {problemSectionData.map((_, i) => (
              <div
                key={i}
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: i === 0 ? colors.primary : colors.line,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// SECTION 4: THE PATHWAY TO IMPACT GRID
// ============================================================================

const SolutionsSection = () => {
  const isMobile = useIsMobile();
  const [activeCat, setActiveCat] = useState("all");

  const categories = [
    { id: "all", label: "All" },
    { id: "flagship", label: "Flagship" },
    { id: "scaling", label: "Scaling" },
  ];

  const allSolutions = sectorData.solutions;
  const filtered =
    activeCat === "all"
      ? allSolutions.slice(0, 9)
      : activeCat === "flagship"
        ? allSolutions.filter((s) => s.tier === 1).slice(0, 9)
        : allSolutions.filter((s) => s.tier === 2).slice(0, 9);

  return (
    <section
      style={{
        backgroundColor: colors.primary,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
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
              letterSpacing: "1.5px",
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
              color: colors.white,
              letterSpacing: "-0.5px",
              marginBottom: "20px",
              lineHeight: "1.2",
              maxWidth: "900px",
            }}
          >
            Ventures That Build Lasting Creative <span style={{ color: colors.accent, fontWeight: "600" }}>Value</span>
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: isMobile ? "flex-start" : "center",
              justifyContent: "space-between",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "20px" : "0",
            }}
          >
            <p
              style={{
                fontSize: isMobile ? "15px" : "16px",
                color: "rgba(255,255,255,0.6)",
                maxWidth: "500px",
                lineHeight: "1.65",
                margin: "0",
              }}
            >
              BRIDGE's creative economy portfolio — flagship ventures for maximum impact, scaling ventures that extend
              reach across Ghana's creative ecosystem.
            </p>

            {/* Right-justified filters in outlined container */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: isMobile ? "4px" : "6px",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "50px",
                padding: isMobile ? "3px" : "4px",
              }}
            >
              {categories.map((cat) => {
                const isOn = activeCat === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCat(cat.id)}
                    style={{
                      padding: isMobile ? "5px 10px" : "6px 16px",
                      borderRadius: "50px",
                      cursor: "pointer",
                      fontSize: isMobile ? "10px" : "12px",
                      fontWeight: isOn ? "700" : "500",
                      fontFamily: "Inter, sans-serif",
                      backgroundColor: isOn ? colors.accent : "transparent",
                      color: isOn ? colors.primary : "rgba(255,255,255,0.45)",
                      border: isOn ? "1.5px solid transparent" : "1.5px solid transparent",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Solutions Grid / Carousel — 3x3 max */}
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
                  gap: "20px",
                }
          }
        >
          {filtered.map((solution, i) => (
            <div
              key={i}
              style={{
                backgroundColor: colors.white,
                borderRadius: isMobile ? "16px" : "12px",
                padding: isMobile ? "24px" : "28px",
                border: "1px solid rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                ...(isMobile ? { minWidth: "80%", maxWidth: "80%", flexShrink: 0, scrollSnapAlign: "start" } : {}),
              }}
            >
              {/* Tier + Score */}
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    color: colors.primary,
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    backgroundColor: solution.tier === 1 ? colors.accent : `${colors.accent}30`,
                    padding: "5px 14px",
                    borderRadius: "50px",
                  }}
                >
                  {"Tier " + solution.tier + " \u00B7 " + (solution.tier === 1 ? "Flagship" : "Scaling")}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    color: "rgba(0,0,0,0.5)",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Score: {solution.score}
                </span>
              </div>

              <div
                style={{
                  fontSize: isMobile ? "17px" : "18px",
                  fontWeight: "600",
                  color: colors.primary,
                  marginBottom: "8px",
                  lineHeight: "1.3",
                }}
              >
                {solution.name}
              </div>
              <div style={{ fontSize: "14px", color: "#666", lineHeight: "1.6", marginBottom: "20px", flex: 1 }}>
                {solution.description}
              </div>

              {/* Bottom row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "16px",
                  borderTop: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "rgba(0,0,0,0.4)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "2px",
                    }}
                  >
                    Capital
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: colors.primary,
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    {solution.capital}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "rgba(0,0,0,0.4)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      marginBottom: "2px",
                    }}
                  >
                    Impact
                  </div>
                  <div style={{ fontSize: "12px", color: "#555", maxWidth: "160px" }}>{solution.impact}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SECTION 5: THE LANDSCAPE
// ============================================================================

const landscapeEntities = [
  {
    name: "GHAMRO",
    description: "Collective music rights management",
    established: "Est. 2012",
    metric: "Statutory",
    strengths: [
      { label: "Legal Framework", score: 5 },
      { label: "Collection Network", score: 2 },
      { label: "Digital Systems", score: 1 },
    ],
    collaboration: ["Digital royalty tracking", "Streaming-era reform", "Artist registration systems"],
    bridgeOpportunity: "Digital rights management partnership to modernize royalty collection for 3M+ creatives",
  },
  {
    name: "National Film Authority",
    description: "Film industry regulation & promotion",
    established: "Est. 2020",
    metric: "Gov\u2019t",
    strengths: [
      { label: "Regulatory Authority", score: 5 },
      { label: "Shoot in Ghana Program", score: 4 },
      { label: "Studio Infrastructure", score: 2 },
    ],
    collaboration: ["Studio co-development", "Film certification", "Distribution agreements"],
    bridgeOpportunity: "Black Star Studios infrastructure partnership aligned with Shoot in Ghana initiative",
  },
  {
    name: "Ghana Football Assn.",
    description: "Football governance & development",
    established: "Est. 1957",
    metric: "FIFA",
    strengths: [
      { label: "FIFA Affiliation", score: 6 },
      { label: "National Team Mgmt", score: 5 },
      { label: "Grassroots Investment", score: 1 },
    ],
    collaboration: ["Academy certification standards", "Youth development pathways", "Facility access sharing"],
    bridgeOpportunity: "Youth Football Academy certification framework to professionalize grassroots development",
  },
  {
    name: "MUSIGHA",
    description: "Musicians union & artist advocacy",
    established: "Est. 1974",
    metric: "10K+",
    strengths: [
      { label: "Artist Representation", score: 4 },
      { label: "Collective Advocacy", score: 4 },
      { label: "Member Services", score: 2 },
    ],
    collaboration: ["Artist outreach networks", "Rights education delivery", "Studio access programs"],
    bridgeOpportunity: "Artist development and financing channel connecting creatives to BRIDGE ventures",
  },
  {
    name: "Fidelity Creative Fund",
    description: "First dedicated creative sector financing",
    established: "Est. 2023",
    metric: "GH\u20B520M",
    strengths: [
      { label: "Financial Products", score: 4 },
      { label: "Creative Focus", score: 3 },
      { label: "Market Reach", score: 3 },
    ],
    collaboration: ["Co-lending models", "Creative credit scoring", "Portfolio diversification"],
    bridgeOpportunity: "Creative Arts Financing Facility co-development with blended capital structures",
  },
  {
    name: "Charter House (VGMA)",
    description: "Music awards & event production",
    established: "Est. 2000",
    metric: "National",
    strengths: [
      { label: "Brand Recognition", score: 6 },
      { label: "Event Production", score: 5 },
      { label: "Artist Database", score: 3 },
    ],
    collaboration: ["Talent pipeline access", "Event infrastructure", "Promotional partnerships"],
    bridgeOpportunity: "Black Star venue and festival partnerships amplifying creative economy visibility",
  },
];

const MarketEcosystemSection = () => {
  const isMobile = useIsMobile();
  const [activeEntity, setActiveEntity] = useState(0);
  const active = landscapeEntities[activeEntity];

  const DotRating = ({ score, max = 6 }) => (
    <div style={{ display: "flex", gap: "4px" }}>
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          style={{
            width: "16px",
            height: "8px",
            borderRadius: "4px",
            backgroundColor: i < score ? "#6B8E23" : "#ddd",
            transition: "background-color 0.3s ease",
          }}
        />
      ))}
    </div>
  );

  return (
    <section
      style={{
        backgroundColor: colors.background,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ marginBottom: isMobile ? "32px" : "60px", textAlign: "center" }}>
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
            The Landscape
          </span>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              color: colors.primary,
              letterSpacing: "-0.5px",
              margin: "0 0 20px 0",
              lineHeight: "1.2",
            }}
          >
            Building With Ghana's Creative <span style={{ fontWeight: "600", color: colors.accent }}>Institutions</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              color: "#666",
              maxWidth: "600px",
              lineHeight: "1.65",
              margin: "0 auto",
            }}
          >
            Ghana's creative ecosystem is rich with talent, institutions, and aligned resources. BRIDGE combines
            strengths, aligns efforts, and creates shared value across every stakeholder.
          </p>
        </div>

        {/* Mobile: Horizontal scroll pills */}
        {isMobile && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "0 -20px 24px",
              padding: "0 20px 4px",
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
              {landscapeEntities.map((e, i) => {
                const isActive = activeEntity === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveEntity(i)}
                    style={{
                      padding: "5px 10px",
                      borderRadius: "50px",
                      cursor: "pointer",
                      fontSize: "11px",
                      fontWeight: isActive ? "700" : "500",
                      fontFamily: "Inter, sans-serif",
                      backgroundColor: isActive ? colors.accentLight : "transparent",
                      color: isActive ? colors.primary : "#999",
                      border: isActive ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {e.name.split(" ")[0]}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Desktop: Sidebar + Detail Panel */}
        <div
          style={{
            display: isMobile ? "block" : "grid",
            gridTemplateColumns: isMobile ? "1fr" : "340px 1fr",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {/* Left Sidebar — desktop only */}
          {!isMobile && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {landscapeEntities.map((entity, i) => {
                const isActive = activeEntity === i;
                return (
                  <div
                    key={i}
                    onClick={() => setActiveEntity(i)}
                    style={{
                      padding: "18px 24px",
                      backgroundColor: isActive ? colors.primary : colors.white,
                      border: `1px solid ${isActive ? colors.primary : colors.line}`,
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      borderRadius: "12px",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "16px",
                        fontWeight: "700",
                        color: isActive ? colors.white : colors.primary,
                        marginBottom: "4px",
                      }}
                    >
                      {entity.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        color: isActive ? "rgba(255,255,255,0.65)" : "#999",
                      }}
                    >
                      {entity.description}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Right Detail Panel */}
          <div
            style={{
              backgroundColor: colors.white,
              borderRadius: "20px",
              border: `1px solid ${colors.line}`,
              padding: isMobile ? "24px" : "40px",
              transition: "all 0.3s ease",
            }}
          >
            {/* Entity Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "32px",
                flexWrap: isMobile ? "wrap" : "nowrap",
                gap: "16px",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: isMobile ? "24px" : "32px",
                    fontWeight: "700",
                    color: colors.primary,
                    lineHeight: "1.2",
                    marginBottom: "6px",
                  }}
                >
                  {active.name}
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    color: "#888",
                  }}
                >
                  {active.description}
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                <span
                  style={{
                    padding: "8px 16px",
                    borderRadius: "50px",
                    border: `1.5px solid ${colors.line}`,
                    backgroundColor: colors.background,
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: colors.primary,
                  }}
                >
                  {active.established}
                </span>
                <span
                  style={{
                    padding: "8px 16px",
                    borderRadius: "50px",
                    border: `1.5px solid ${colors.line}`,
                    backgroundColor: colors.background,
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: colors.primary,
                  }}
                >
                  {active.metric}
                </span>
              </div>
            </div>

            {/* Strengths */}
            <div style={{ marginBottom: "32px" }}>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: "#999",
                  marginBottom: "20px",
                }}
              >
                Strengths
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {active.strengths.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "15px",
                        color: colors.dark,
                        minWidth: isMobile ? "120px" : "180px",
                        flexShrink: 0,
                      }}
                    >
                      {s.label}
                    </span>
                    <DotRating score={s.score} />
                  </div>
                ))}
              </div>
            </div>

            {/* Collaboration Opportunities */}
            <div style={{ marginBottom: "32px" }}>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: "#999",
                  marginBottom: "16px",
                }}
              >
                Collaboration Opportunities
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {active.collaboration.map((c, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "50px",
                      border: `1.5px solid ${colors.accent}`,
                      backgroundColor: "rgba(184,217,53,0.08)",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "13px",
                      fontWeight: "500",
                      color: colors.primary,
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* BRIDGE Opportunity */}
            <div
              style={{
                padding: "20px 24px",
                backgroundColor: colors.primary,
                borderRadius: "12px",
              }}
            >
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: "8px",
                }}
              >
                BRIDGE Opportunity
              </div>
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "15px",
                  color: colors.white,
                  lineHeight: "1.6",
                }}
              >
                {active.bridgeOpportunity}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SECTION 6: THE GOVERNANCE & POLICY
// ============================================================================

const governanceCategories = [
  { id: "all", label: "All", mobileLabel: "All" },
  { id: "funding", label: "Direct Funding", mobileLabel: "Funding" },
  { id: "tax", label: "Tax Incentives", mobileLabel: "Tax Incentive" },
  { id: "infrastructure", label: "Infrastructure", mobileLabel: "Infrastructure" },
  { id: "partnerships", label: "Partnerships", mobileLabel: "Partnership" },
];

const governancePolicies = [
  {
    policy: "Black Star Experience Initiative",
    body: "Ministry of Tourism, Culture & Creative Arts",
    allocation: "$5B target by 2027",
    category: "funding",
    relevance: ["arts"],
    alignment:
      "Direct alignment across all seven pillars \u2014 Cinema, Audio, Cuisine, Aesthetics, Style, Literature, Culture.",
    bridgeRole: "BRIDGE complements with diaspora investment mobilization and implementation capacity.",
    bridgeVentures: ["Black Star Recording Studios", "Film Production Hub", "Heritage Textiles Platform"],
    pillars: ["Cinema", "Audio", "Cuisine", "Aesthetics", "Style", "Literature", "Culture"],
  },
  {
    policy: "2026 Budget Creative Industries Seed",
    body: "Ministry of Finance",
    allocation: "GHS 20M",
    category: "funding",
    relevance: ["arts"],
    alignment: "Unprecedented direct budget support for creative industries value chain.",
    bridgeRole:
      "BRIDGE co-invests to multiply government seed capital into production infrastructure and creative financing.",
    bridgeVentures: ["Creative Arts Financing Facility", "Film Production Training Institute"],
    pillars: [],
  },
  {
    policy: "20% Film Tax Rebate",
    body: "National Film Authority",
    allocation: "Tax incentive",
    category: "tax",
    relevance: ["arts"],
    alignment: "Enhances viability of Film Production Hub and attracts international co-productions.",
    bridgeRole: 'Combined with "Shoot in Ghana" momentum including NFL Super Bowl filming.',
    bridgeVentures: ["Film Production Hub", "Film Production Training Institute"],
    pillars: [],
  },
  {
    policy: "VAT Elimination on Local Textiles",
    body: "Ministry of Finance",
    allocation: "Tax policy",
    category: "tax",
    relevance: ["arts"],
    alignment: "Strengthens heritage textiles competitiveness against counterfeit imports.",
    bridgeRole: "Creates price advantage for authentic Kente and traditional cloth products.",
    bridgeVentures: ["Heritage Textiles Market Platform", "Ashanti Fashion Design Incubator"],
    pillars: [],
  },
  {
    policy: "National Theatre Refurbishment",
    body: "Chinese Government Partnership",
    allocation: "$30M commitment",
    category: "infrastructure",
    relevance: ["arts", "sport"],
    alignment: "Major venue infrastructure upgrade for performances, events, and cultural programming.",
    bridgeRole: "BRIDGE complements with content production capabilities and programming to fill renovated spaces.",
    bridgeVentures: ["Black Star Recording Studios", "Diaspora Mentorship Network"],
    pillars: [],
  },
  {
    policy: "Ananse Studio / Pixel Ray Partnership",
    body: "National Film Authority",
    allocation: "Multi-million $",
    category: "partnerships",
    relevance: ["arts"],
    alignment: "Government flagship production facility on 200-acre site with NFA partnership.",
    bridgeRole:
      "BRIDGE Film Hub complements with mid-budget production focus and training integration \u2014 filling gaps, not competing.",
    bridgeVentures: ["Film Production Hub", "Film Production Training Institute"],
    pillars: [],
  },
  {
    policy: "GFA Grassroots Development",
    body: "Ghana Football Association",
    allocation: "$200K announced",
    category: "funding",
    relevance: ["sport"],
    alignment: "Signals development intent but critically underfunded relative to talent pipeline scale.",
    bridgeRole:
      "BRIDGE fills the massive gap with integrated academy combining athletics, education, and medical support.",
    bridgeVentures: ["Ghana Youth Football Academy", "Diaspora Mentorship Network"],
    pillars: [],
  },
  {
    policy: "Creative Arts Agency (Act 1048)",
    body: "CAA / Mahama Administration",
    allocation: "Institutional",
    category: "partnerships",
    relevance: ["arts", "sport"],
    alignment: "Newly appointed board and Executive Secretary provide institutional framework for creative sector.",
    bridgeRole: "BRIDGE engages as implementation and investment partner for capacity building and reform.",
    bridgeVentures: ["GHAMRO Capacity Building", "Creative Arts Financing Facility"],
    pillars: [],
  },
  {
    policy: "Import Duty Exemptions on Film Equipment",
    body: "Ministry of Trade & Industry",
    allocation: "Tax policy",
    category: "tax",
    relevance: ["arts"],
    alignment:
      "Reduces production cost barriers by eliminating duties on cameras, lighting, sound, and post-production hardware.",
    bridgeRole:
      "Directly lowers capital expenditure for Film Production Hub and Black Star Studios equipment procurement.",
    bridgeVentures: ["Film Production Hub", "Black Star Recording Studios"],
    pillars: [],
  },
  {
    policy: "GPL Stadium Modernization Program",
    body: "National Sports Authority",
    allocation: "$15M phased",
    category: "infrastructure",
    relevance: ["sport"],
    alignment: "Upgrading Premier League venues to meet CAF standards for broadcast-quality domestic football.",
    bridgeRole:
      "BRIDGE complements venue upgrades with fan engagement platforms and broadcast infrastructure investment.",
    bridgeVentures: ["Ghana Youth Football Academy", "Sports Media & Broadcast Fund"],
    pillars: [],
  },
  {
    policy: "Detty December Cultural Infrastructure",
    body: "Ghana Tourism Authority",
    allocation: "Multi-agency",
    category: "infrastructure",
    relevance: ["arts"],
    alignment:
      "Festival infrastructure and programming support turning seasonal diaspora visits into year-round cultural economy.",
    bridgeRole:
      "BRIDGE builds permanent venue and production capacity that serves festival season and sustains year-round creative output.",
    bridgeVentures: ["Black Star Recording Studios", "Heritage Experience Tours"],
    pillars: [],
  },
  {
    policy: "Afreximbank CANEX Program",
    body: "Afreximbank / Continental",
    allocation: "$500M continental",
    category: "partnerships",
    relevance: ["arts"],
    alignment:
      "Creative Africa Nexus provides continental financing framework for creative industries trade and investment.",
    bridgeRole:
      "BRIDGE positions Ghana ventures as CANEX implementation partners, accessing continental capital for local creative enterprises.",
    bridgeVentures: ["Creative Arts Financing Facility", "Heritage Textiles Market Platform"],
    pillars: [],
  },
];

const govCatBadge = {
  funding: { bg: "rgba(184,217,53,0.15)", border: "rgba(184,217,53,0.3)" },
  tax: { bg: "rgba(27,77,62,0.07)", border: "rgba(27,77,62,0.15)" },
  infrastructure: { bg: "rgba(184,217,53,0.1)", border: "rgba(184,217,53,0.25)" },
  partnerships: { bg: "rgba(27,77,62,0.05)", border: "rgba(27,77,62,0.12)" },
};

const PolicyAlignmentSection = () => {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);
  const [activeGovCard, setActiveGovCard] = useState(0);

  const filtered =
    activeCategory === "all" ? governancePolicies : governancePolicies.filter((p) => p.category === activeCategory);

  return (
    <section style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      {!isMobile && (
        <style>{`
        .policy-scroll::-webkit-scrollbar { height: 6px; }
        .policy-scroll::-webkit-scrollbar-track { background: ${colors.background}; border-radius: 3px; }
        .policy-scroll::-webkit-scrollbar-thumb { background: ${colors.line}; border-radius: 3px; }
        .policy-scroll::-webkit-scrollbar-thumb:hover { background: #ccc; }
      `}</style>
      )}

      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* HEADER */}
        <div style={{ marginBottom: isMobile ? "32px" : "60px", textAlign: isMobile ? "left" : "center" }}>
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
            The Governance & Policy
          </span>

          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              color: colors.primary,
              letterSpacing: "-0.5px",
              margin: isMobile ? "0 0 16px 0" : "0 auto 16px",
              lineHeight: "1.2",
              maxWidth: "820px",
            }}
          >
            Moving in Step with Ghana's <span style={{ fontWeight: "600" }}>Creative</span>{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Vision</span>
          </h2>

          <p
            style={{
              fontSize: isMobile ? "15px" : "16px",
              color: "#555",
              maxWidth: "680px",
              margin: isMobile ? "0 0 36px 0" : "0 auto 36px",
              lineHeight: "1.7",
              textAlign: isMobile ? "left" : "center",
            }}
          >
            The Black Star Experience and 2026 Budget create an unprecedented policy environment. BRIDGE doesn't replace
            government initiatives — it complements them with diaspora capital, expertise, and implementation capacity.
          </p>

          {/* CATEGORY FILTER */}
          <div
            style={{
              display: "flex",
              justifyContent: isMobile ? "flex-start" : "center",
              ...(isMobile ? { margin: "0 -20px", padding: "0 20px 4px" } : {}),
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: isMobile ? "6px" : "8px",
                border: `1px solid ${colors.line}`,
                borderRadius: "50px",
                padding: isMobile ? "4px" : "5px",
                backgroundColor: colors.white,
                ...(isMobile
                  ? { overflowX: "auto", WebkitOverflowScrolling: "touch", maxWidth: "100%" }
                  : { flexWrap: "wrap" }),
              }}
            >
              {governanceCategories.map((cat) => {
                const isOn = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setExpandedCard(null);
                      setActiveGovCard(0);
                    }}
                    style={{
                      padding: isMobile ? "5px 10px" : "6px 14px",
                      borderRadius: "50px",
                      cursor: "pointer",
                      fontSize: isMobile ? "11px" : "12px",
                      fontWeight: isOn ? "700" : "500",
                      fontFamily: "Inter, sans-serif",
                      backgroundColor: isOn ? colors.accentLight : "transparent",
                      color: isOn ? colors.primary : "#999",
                      border: isOn ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {isMobile ? cat.mobileLabel : cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* CARDS — scroll row on desktop, vertical stack on mobile */}
        <div
          className={isMobile ? "" : "policy-scroll"}
          style={
            isMobile
              ? {
                  display: "flex",
                  gap: "12px",
                  overflowX: "auto",
                  alignItems: "flex-start",
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  margin: "0 -20px",
                  padding: "0 20px 8px",
                }
              : {
                  display: "flex",
                  gap: "16px",
                  overflowX: "auto",
                  alignItems: "flex-start",
                  paddingBottom: "12px",
                  marginBottom: "32px",
                }
          }
        >
          {filtered.map((item, i) => {
            const isExp = expandedCard === i;
            const badge = govCatBadge[item.category];
            return (
              <div
                key={`${activeCategory}-${i}`}
                style={{
                  ...(isMobile
                    ? {
                        minWidth: "92%",
                        maxWidth: "92%",
                        flexShrink: 0,
                        scrollSnapAlign: "start",
                      }
                    : {
                        minWidth: isExp ? "380px" : "280px",
                        maxWidth: isExp ? "380px" : "280px",
                        flexShrink: 0,
                      }),
                  backgroundColor: colors.background,
                  borderRadius: "16px",
                  border: `2px solid ${colors.primary}`,
                  cursor: "pointer",
                  transition: "all 0.35s ease",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => setExpandedCard(isExp ? null : i)}
              >
                {/* Card Top */}
                <div style={{ padding: isMobile ? "20px 20px 16px" : "24px 24px 20px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "14px",
                    }}
                  >
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "50px",
                        fontSize: "9px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "0.8px",
                        backgroundColor: badge.bg,
                        color: colors.primary,
                        border: `1px solid ${badge.border}`,
                      }}
                    >
                      {governanceCategories.find((c) => c.id === item.category)?.label}
                    </span>
                    <div style={{ display: "flex", gap: "4px" }}>
                      {item.relevance.map((r) => (
                        <span
                          key={r}
                          style={{
                            padding: "3px 8px",
                            borderRadius: "50px",
                            fontSize: "9px",
                            fontWeight: "600",
                            textTransform: "uppercase",
                            backgroundColor: r === "sport" ? colors.primary : "rgba(184,217,53,0.15)",
                            color: r === "sport" ? colors.accent : colors.primary,
                          }}
                        >
                          {r === "sport" ? "Sport" : "Arts"}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: isMobile ? "15px" : "16px",
                      fontWeight: "700",
                      color: colors.primary,
                      lineHeight: "1.3",
                      marginBottom: "10px",
                      minHeight: isMobile ? "auto" : "42px",
                    }}
                  >
                    {item.policy}
                  </div>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: colors.accent }}>{item.allocation}</span>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      lineHeight: "1.55",
                      margin: "14px 0 0 0",
                      minHeight: isMobile ? "auto" : "40px",
                    }}
                  >
                    {item.alignment}
                  </p>
                </div>

                {/* Expand indicator */}
                <div
                  style={{
                    padding: isMobile ? "0 20px 14px" : "0 24px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "auto",
                  }}
                >
                  <span style={{ fontSize: "11px", fontWeight: "600", color: isExp ? colors.primary : "#bbb" }}>
                    {isExp ? "Less" : "BRIDGE alignment"}
                  </span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isExp ? colors.primary : "#bbb"}
                    strokeWidth="2.5"
                    style={{ transform: isExp ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>

                {/* Expanded Content */}
                <div
                  style={{
                    maxHeight: isExp ? "500px" : "0",
                    opacity: isExp ? 1 : 0,
                    transition: isExp
                      ? "max-height 0.4s ease, opacity 0.3s ease 0.1s"
                      : "max-height 0.15s ease, opacity 0.1s ease",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{ padding: isMobile ? "0 20px 20px" : "0 24px 24px", borderTop: `1px solid ${colors.line}` }}
                  >
                    <div style={{ fontSize: "11px", color: "#888", marginTop: "16px", marginBottom: "12px" }}>
                      {item.body}
                    </div>
                    <p style={{ fontSize: "13px", color: "#444", lineHeight: "1.6", margin: "0 0 16px 0" }}>
                      {item.bridgeRole}
                    </p>
                    {item.pillars && item.pillars.length > 0 && (
                      <div style={{ marginBottom: "16px" }}>
                        <div
                          style={{
                            fontSize: "9px",
                            fontWeight: "700",
                            color: colors.primary,
                            textTransform: "uppercase",
                            letterSpacing: "1.5px",
                            marginBottom: "8px",
                            opacity: 0.5,
                          }}
                        >
                          BSE Pillars
                        </div>
                        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                          {item.pillars.map((p) => (
                            <span
                              key={p}
                              style={{
                                padding: "3px 8px",
                                borderRadius: "50px",
                                fontSize: "9px",
                                fontWeight: "600",
                                backgroundColor: "rgba(184,217,53,0.12)",
                                color: colors.primary,
                                border: "1px solid rgba(184,217,53,0.25)",
                              }}
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div
                      style={{
                        fontSize: "9px",
                        fontWeight: "700",
                        color: colors.primary,
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        marginBottom: "8px",
                        opacity: 0.5,
                      }}
                    >
                      BRIDGE Ventures
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {item.bridgeVentures.map((v, vi) => (
                        <div
                          key={vi}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "10px 14px",
                            backgroundColor: colors.primary,
                            borderRadius: "10px",
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
                          <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.9)", fontWeight: "500" }}>
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

        {/* Show more button — mobile only */}
        {/* Mobile scroll indicators */}
        {isMobile && filtered.length > 1 && (
          <div
            style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px", marginBottom: "16px" }}
          >
            {filtered.map((_, i) => (
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

        {/* BOTTOM CTA */}
        <div
          style={{
            padding: isMobile ? "24px 20px" : "28px 32px",
            backgroundColor: colors.primary,
            borderRadius: "16px",
            ...(isMobile
              ? { textAlign: "center" }
              : { display: "flex", alignItems: "center", justifyContent: "space-between" }),
          }}
        >
          <div style={{ marginBottom: isMobile ? "16px" : 0, textAlign: "left" }}>
            <div
              style={{
                fontSize: isMobile ? "16px" : "18px",
                fontWeight: "600",
                color: colors.white,
                marginBottom: "4px",
                fontFamily: "Inter, sans-serif",
              }}
            >
              BRIDGE complements — never competes with — government vision.
            </div>
            <div
              style={{
                fontSize: isMobile ? "13px" : "14px",
                color: "rgba(255,255,255,0.6)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Every venture aligns with at least one active government policy or initiative.
            </div>
          </div>
          <div
            style={{
              padding: "12px 28px",
              borderRadius: "50px",
              backgroundColor: colors.accent,
              color: colors.primary,
              fontSize: "13px",
              fontWeight: "700",
              whiteSpace: "nowrap",
              cursor: "pointer",
              display: isMobile ? "inline-block" : "block",
              flexShrink: 0,
            }}
          >
            View Partnership Strategy
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SECTION 7: THE RIPPLE EFFECT INTEGRATION
// ============================================================================

const CrossSectorSection = () => {
  const isMobile = useIsMobile();
  const [activeNode, setActiveNode] = useState(null);
  const [showMoreRipple, setShowMoreRipple] = useState(false);

  const crossSectorIcons = {
    4: <IconCpu />,
    2: <IconWallet />,
    9: <IconPlane />,
    11: <IconFactory />,
    5: <IconGraduationCap />,
  };

  const crossSectorShortNames = ["Tech", "Financial", "Tourism", "Mfg", "Education"];

  const crossSectorDesktopNames = ["Technology", "Financial", "Tourism", "Manufacturing", "Education"];

  const pathways = sectorData.crossSector.map((sector, i) => ({
    ...sector,
    icon: crossSectorIcons[sector.sectorId],
    shortLabel: crossSectorDesktopNames[i],
    pathLabel: [
      "Creative Industries \u2192 Streaming & Digital Rights \u2192 Technology",
      "Creative Industries \u2192 Artist Financing \u2192 Financial Access",
      "Creative Industries \u2192 Cultural Experiences \u2192 Tourism Revenue",
      "Creative Industries \u2192 Design & Production \u2192 Manufacturing",
      "Creative Industries \u2192 Skills Training \u2192 Education Pipeline",
    ][i],
  }));

  const activePathway = activeNode !== null ? pathways[activeNode] : null;

  return (
    <section
      style={{
        backgroundColor: colors.primary,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "60px" }}>
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
              letterSpacing: "1.5px",
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
              margin: "0 auto 16px",
              maxWidth: "820px",
            }}
          >
            How Creative Industries <span style={{ color: colors.accent, fontWeight: "600" }}>Amplify Impact</span>
          </h2>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              color: "rgba(255,255,255,0.6)",
              lineHeight: "1.65",
              margin: "0 auto",
              maxWidth: "680px",
            }}
          >
            The creative economy touches every other BRIDGE sector \u2014 from technology to tourism, financial systems
            to manufacturing.
          </p>
        </div>

        {/* Pathway Visual */}
        {isMobile ? (
          /* MOBILE: Hub on top, 5 icons below */
          <div style={{ marginBottom: "24px" }}>
            {/* Hub Icon */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "16px" }}>
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
                  marginBottom: "8px",
                }}
              >
                <IconMusic />
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
                Creative Industries
              </span>
            </div>

            {/* Sector Icons Row */}
            <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
              {pathways.map((p, idx) => {
                const isActive = activeNode === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveNode(isActive ? null : idx);
                      setShowMoreRipple(false);
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "6px",
                      background: "none",
                      border: "none",
                      padding: "4px",
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
                        color: isActive ? colors.primary : "rgba(255,255,255,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
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
                        color: isActive ? colors.white : "rgba(255,255,255,0.5)",
                        maxWidth: "58px",
                        lineHeight: "1.2",
                        textAlign: "center",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {crossSectorShortNames[idx]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* DESKTOP: Horizontal Row */
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
                <IconMusic />
              </div>
            </div>

            {/* Sector Nodes */}
            {pathways.map((p, idx) => {
              const isActive = activeNode === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveNode(isActive ? null : idx)}
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
                      backgroundColor: isActive ? colors.accent : "rgba(255,255,255,0.08)",
                      border: isActive ? "none" : "1px solid rgba(255,255,255,0.1)",
                      color: isActive ? colors.primary : "rgba(255,255,255,0.6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
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
                      color: isActive ? colors.white : "rgba(255,255,255,0.5)",
                      textAlign: "center",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {p.shortLabel}
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
            !isMobile ? (
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
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px" }}>
                  {pathways.map((p, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveNode(idx)}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.05)",
                        borderRadius: "16px",
                        padding: "24px 20px",
                        cursor: "pointer",
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
                        {p.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "rgba(255,255,255,0.45)",
                          height: "40px",
                          overflow: "hidden",
                          marginBottom: "16px",
                        }}
                      >
                        {p.connection}
                      </div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
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
                          style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.4)" }}
                        >
                          multiplier
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.5)" }}>
                  Tap a sector above to explore how creative industries amplify its impact
                </p>
              </div>
            )
          ) : (
            /* Active State */
            <div>
              {/* Breadcrumb */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}
              >
                {activePathway.pathLabel.split(" \u2192 ").map((step, i, arr) => (
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
                    {i < arr.length - 1 && <span style={{ color: colors.accent, fontSize: "14px" }}>\u2192</span>}
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
                    {activePathway.impact}
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
                      {activePathway.multiplier}
                    </span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
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
                      {activePathway.synergies.map((syn, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "12px",
                            padding: "12px 16px",
                            borderRadius: "10px",
                            backgroundColor: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <span style={{ color: colors.accent, fontSize: "8px", marginTop: "5px" }}>{"\u25CF"}</span>
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "14px",
                              color: "rgba(255,255,255,0.75)",
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
                      {activePathway.bridgeVentures.map((v, i) => (
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
                          <span style={{ color: colors.accent, fontSize: "16px" }}>{"\u2192"}</span>
                        </div>
                      ))}
                    </div>
                    <a
                      href="#"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: colors.accent,
                        textDecoration: "none",
                        marginTop: "20px",
                      }}
                    >
                      Explore {activePathway.name} Sector <span>{"\u2192"}</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile Toggle */}
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
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
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

// SECTION 8: THE IMPACT
// ============================================================================

const MetricRow = ({ item, animate, delay, index, isMobile }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(animate), delay);
    return () => clearTimeout(t);
  }, [animate, delay]);

  const count = useCounter(item.value, 1000, visible);

  const formatValue = () => {
    if (item.value >= 1000) return `${item.prefix}${Math.round(count).toLocaleString()}${item.suffix}`;
    if (item.value % 1 !== 0) return `${item.prefix}${count.toFixed(1)}${item.suffix}`;
    return `${item.prefix}${Math.round(count)}${item.suffix}`;
  };

  if (isMobile) {
    return (
      <div
        style={{
          padding: "20px",
          backgroundColor: index % 2 === 0 ? colors.white : "transparent",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        <div
          style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <div
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: colors.primary,
                fontFamily: "Poppins, sans-serif",
                letterSpacing: "-1px",
                lineHeight: "1",
              }}
            >
              {formatValue()}
            </div>
            <div
              style={{
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
          </div>
          <div
            style={{
              backgroundColor: index % 2 === 0 ? colors.background : "rgba(27,77,62,0.04)",
              borderRadius: "8px",
              padding: "6px 10px",
              maxWidth: "40%",
            }}
          >
            <div
              style={{
                fontSize: "9px",
                fontWeight: "700",
                color: "#aaa",
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "2px",
              }}
            >
              Ventures
            </div>
            <div style={{ fontSize: "10px", fontWeight: "500", color: colors.primary, lineHeight: "1.4" }}>
              {item.ventures}
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: "14px",
            fontWeight: "700",
            color: colors.primary,
            marginBottom: "3px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {item.label}
        </div>
        <div style={{ fontSize: "13px", color: "#666", lineHeight: "1.5", fontFamily: "Inter, sans-serif" }}>
          {item.description}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "200px 1fr 200px",
        gap: "32px",
        alignItems: "center",
        padding: "24px 28px",
        backgroundColor: index % 2 === 0 ? colors.white : "transparent",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div
          style={{
            fontSize: "36px",
            fontWeight: "700",
            color: colors.primary,
            fontFamily: "Poppins, sans-serif",
            letterSpacing: "-1px",
            lineHeight: "1",
          }}
        >
          {formatValue()}
        </div>
        <div
          style={{
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
      </div>
      <div>
        <div
          style={{
            fontSize: "15px",
            fontWeight: "700",
            color: colors.primary,
            marginBottom: "4px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {item.label}
        </div>
        <div style={{ fontSize: "13px", color: "#666", lineHeight: "1.5", fontFamily: "Inter, sans-serif" }}>
          {item.description}
        </div>
      </div>
      <div
        style={{
          backgroundColor: index % 2 === 0 ? colors.background : "rgba(27,77,62,0.04)",
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
            marginBottom: "2px",
          }}
        >
          Linked Ventures
        </div>
        <div style={{ fontSize: "11px", fontWeight: "500", color: colors.primary, lineHeight: "1.4" }}>
          {item.ventures}
        </div>
      </div>
    </div>
  );
};

const impactMetrics = [
  {
    category: "Economic",
    items: [
      {
        label: "Creative Economy Scale",
        value: 4.8,
        suffix: "B",
        prefix: "$",
        description: "GDP contribution from cultural and creative industries",
        trend: "+12% YoY",
        ventures: "All Ventures",
      },
      {
        label: "Domestic Music Revenue",
        value: 10,
        suffix: "M",
        prefix: "$",
        description: "Annual music sector revenue \u2014 fraction of global value generated",
        trend: "Capture gap",
        ventures: "Black Star Studios \u00B7 GHAMRO",
      },
      {
        label: "Fashion & Textile Value",
        value: 2.42,
        suffix: "B",
        prefix: "$",
        description: "Industry contribution including heritage textiles under pressure",
        trend: "At risk",
        ventures: "Heritage Textiles Platform",
      },
      {
        label: "Development Leverage",
        value: 3,
        suffix: "-5x",
        prefix: "",
        description: "Every dollar generates $3-5 in local creative economy activity",
        trend: "Multiplier",
        ventures: "All Ventures",
      },
    ],
  },
  {
    category: "People",
    items: [
      {
        label: "Creatives Empowered",
        value: 50,
        suffix: "K+",
        prefix: "",
        description: "Direct beneficiaries across music, film, sports, fashion, and craft",
        trend: "Target",
        ventures: "Financing Facility \u00B7 GHAMRO",
      },
      {
        label: "Jobs Created",
        value: 2000,
        suffix: "+",
        prefix: "",
        description: "Direct employment in studios, academies, and platforms",
        trend: "Target",
        ventures: "Studios \u00B7 Film Hub \u00B7 Academy",
      },
      {
        label: "Youth Athletes",
        value: 5000,
        suffix: "+",
        prefix: "",
        description: "Young people in certified academies with integrated education",
        trend: "Target",
        ventures: "Youth Football Academy",
      },
      {
        label: "Artisans Connected",
        value: 6000,
        suffix: "+",
        prefix: "",
        description: "Heritage textile artisans linked to premium global markets",
        trend: "Target",
        ventures: "Heritage Textiles Platform",
      },
    ],
  },
  {
    category: "Returns",
    items: [
      {
        label: "Portfolio IRR",
        value: 10,
        suffix: "-18%",
        prefix: "",
        description: "Blended returns across 22 ventures with risk-adjusted modeling",
        trend: "Target range",
        ventures: "All Ventures",
      },
      {
        label: "Tier 1 Returns",
        value: 12,
        suffix: "-18%",
        prefix: "",
        description: "Studios, financing facilities, and academies with proven demand",
        trend: "High priority",
        ventures: "Studios \u00B7 Financing Facility",
      },
      {
        label: "First Cash",
        value: 12,
        suffix: "-18mo",
        prefix: "",
        description: "Revenue generation timeline for Tier 1 ventures from launch",
        trend: "Near-term",
        ventures: "Studios \u00B7 Film Hub",
      },
      {
        label: "Capital Deployed",
        value: 10,
        suffix: "-22M",
        prefix: "$",
        description: "Total investment across priority tiers over 5-7 year horizon",
        trend: "Phased",
        ventures: "All Ventures",
      },
    ],
  },
];

const impactStakeholders = [
  {
    title: "The Entrepreneur",
    subtitle: "Artists, producers & founders",
    outcomes: [
      "Studio access eliminates production barriers",
      "Fair financing unlocks creative growth capital",
      "Rights systems ensure royalty collection",
      "Market platforms connect talent to buyers",
    ],
    stat: "3M+",
    statLabel: "creatives to serve",
    highlight: "22 venture paths validated",
  },
  {
    title: "The Institution",
    subtitle: "Labels, academies & organizations",
    outcomes: [
      "Production infrastructure cuts costs 30-40%",
      "Certified academies attract enrollment",
      "Digital rights tracking creates new revenue",
      "Heritage authentication opens luxury markets",
    ],
    stat: "500+",
    statLabel: "enterprises supported",
    highlight: "30-40% cost reduction",
  },
  {
    title: "The Government",
    subtitle: "Agencies & local assemblies",
    outcomes: [
      "Creative GDP grows beyond 1.5% contribution",
      "Job creation across the entire value chain",
      "Cultural exports strengthen national brand",
      "Aligned with Black Star Experience vision",
    ],
    stat: "$4.8B",
    statLabel: "creative economy scale",
    highlight: "Black Star Experience aligned",
  },
  {
    title: "The Investor",
    subtitle: "Impact & institutional capital",
    outcomes: [
      "IP-backed portfolio with appreciating assets",
      "Measurable ESG & cultural impact outcomes",
      "10-18% target returns with creative yield",
      "Pan-African replication creates scale exits",
    ],
    stat: "10-18%",
    statLabel: "target portfolio IRR",
    highlight: "5-7yr exit horizon",
  },
];

const ImpactSection = () => {
  const isMobile = useIsMobile();
  const [view, setView] = useState("metrics");
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeStakeholder, setActiveStakeholder] = useState(0);
  const [animate, setAnimate] = useState(true);

  const switchView = (v) => {
    if (v === view) return;
    setView(v);
    setAnimate(false);
    setTimeout(() => setAnimate(true), 50);
  };

  return (
    <section
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Section Header */}
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
            What Changes When <span style={{ fontWeight: "600" }}>Creative</span>
            <br />
            <span style={{ fontWeight: "600" }}>Industries</span>{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Work</span>
          </h2>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              color: "#555",
              lineHeight: "1.7",
              margin: "0 0 40px 0",
              maxWidth: "620px",
            }}
          >
            When artists earn fairly, studios produce locally, and heritage connects to global markets \u2014 the ripple
            effects transform livelihoods, strengthen communities, and build lasting prosperity across Ghana.
          </p>

          {/* CONTROLS — left-justified, single outlined container */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
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
                {[
                  { id: "metrics", label: "By Metric", mobileLabel: "Metric" },
                  { id: "stakeholder", label: "By Stakeholder", mobileLabel: "Stakeholder" },
                ].map((v) => {
                  const isOn = view === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => switchView(v.id)}
                      style={{
                        padding: isMobile ? "5px 10px" : "6px 14px",
                        border: "none",
                        cursor: "pointer",
                        fontSize: isMobile ? "11px" : "12px",
                        fontWeight: isOn ? "700" : "500",
                        fontFamily: "Inter, sans-serif",
                        backgroundColor: isOn ? colors.white : "transparent",
                        color: isOn ? colors.primary : "#999",
                        borderRadius: "50px",
                        boxShadow: isOn ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {isMobile ? v.mobileLabel : v.label}
                    </button>
                  );
                })}
              </div>

              <div style={{ width: "1px", height: "20px", backgroundColor: colors.line, flexShrink: 0 }} />

              {/* Sub-filters */}
              {view === "metrics" &&
                impactMetrics.map((cat, i) => {
                  const isOn = activeCategory === i;
                  return (
                    <button
                      key={cat.category}
                      onClick={() => {
                        setActiveCategory(i);
                        setAnimate(false);
                        setTimeout(() => setAnimate(true), 50);
                      }}
                      style={{
                        padding: isMobile ? "5px 8px" : "6px 14px",
                        borderRadius: "50px",
                        cursor: "pointer",
                        fontSize: isMobile ? "10px" : "12px",
                        fontWeight: isOn ? "700" : "500",
                        fontFamily: "Inter, sans-serif",
                        backgroundColor: isOn ? colors.accentLight : "transparent",
                        color: isOn ? colors.primary : "#999",
                        border: isOn ? `1.5px solid ${colors.accent}` : `1.5px solid transparent`,
                        transition: "all 0.2s ease",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {cat.category}
                    </button>
                  );
                })}
              {view === "stakeholder" &&
                impactStakeholders.map((s, i) => {
                  const isOn = activeStakeholder === i;
                  return (
                    <button
                      key={s.title}
                      onClick={() => setActiveStakeholder(i)}
                      style={{
                        padding: isMobile ? "5px 8px" : "6px 14px",
                        borderRadius: "50px",
                        cursor: "pointer",
                        fontSize: isMobile ? "10px" : "12px",
                        fontWeight: isOn ? "700" : "500",
                        fontFamily: "Inter, sans-serif",
                        backgroundColor: isOn ? colors.accentLight : "transparent",
                        color: isOn ? colors.primary : "#999",
                        border: isOn ? `1.5px solid ${colors.accent}` : `1.5px solid transparent`,
                        transition: "all 0.2s ease",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                      }}
                    >
                      {s.title.split(" ")[1]}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>

        {/* ═══ METRICS VIEW ═══ */}
        {view === "metrics" && (
          <div style={{ opacity: animate ? 1 : 0, transition: "opacity 0.3s ease" }}>
            <div
              style={{
                backgroundColor: colors.background,
                borderRadius: isMobile ? "16px" : "20px",
                border: `2px solid ${colors.primary}`,
                overflow: "hidden",
              }}
            >
              {impactMetrics[activeCategory].items.map((item, i) => (
                <MetricRow
                  key={`${activeCategory}-${i}`}
                  item={item}
                  animate={animate}
                  delay={i * 80}
                  index={i}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </div>
        )}

        {/* ═══ STAKEHOLDER VIEW ═══ */}
        {view === "stakeholder" && (
          <div style={{ opacity: animate ? 1 : 0, transition: "opacity 0.3s ease" }}>
            {/* Title + Stat */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "24px",
                flexWrap: isMobile ? "wrap" : "nowrap",
                gap: isMobile ? "12px" : "0",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: isMobile ? "24px" : "28px",
                    fontWeight: "700",
                    color: colors.primary,
                    marginBottom: "4px",
                  }}
                >
                  {impactStakeholders[activeStakeholder].title}
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#888" }}>
                  {impactStakeholders[activeStakeholder].subtitle}
                </div>
              </div>
              <div style={{ textAlign: isMobile ? "left" : "right" }}>
                <div
                  style={{
                    fontSize: isMobile ? "32px" : "40px",
                    fontWeight: "700",
                    color: colors.primary,
                    fontFamily: "Poppins, sans-serif",
                    letterSpacing: "-1.5px",
                    lineHeight: "1",
                  }}
                >
                  {impactStakeholders[activeStakeholder].stat}
                </div>
                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#888", marginTop: "4px" }}>
                  {impactStakeholders[activeStakeholder].statLabel}
                </div>
              </div>
            </div>

            {/* Outcomes */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {impactStakeholders[activeStakeholder].outcomes.map((o, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "12px" : "16px",
                    padding: isMobile ? "12px 16px" : "14px 20px",
                    backgroundColor: i % 2 === 0 ? colors.background : "transparent",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: i % 2 === 0 ? colors.white : colors.background,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        fontWeight: "700",
                        color: colors.primary,
                      }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: isMobile ? "14px" : "15px",
                      color: "#333",
                      lineHeight: "1.5",
                    }}
                  >
                    {o}
                  </div>
                </div>
              ))}
            </div>

            {/* Key Advantage Bar */}
            <div
              style={{
                marginTop: "24px",
                padding: isMobile ? "14px 20px" : "16px 24px",
                backgroundColor: colors.primary,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                flexWrap: isMobile ? "wrap" : "nowrap",
                gap: isMobile ? "8px" : "0",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "10px",
                  fontWeight: "700",
                  color: colors.accent,
                  textTransform: "uppercase",
                  letterSpacing: "1.5px",
                }}
              >
                Key Advantage
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.85)",
                  fontWeight: "500",
                  marginLeft: isMobile ? "0" : "16px",
                }}
              >
                {impactStakeholders[activeStakeholder].highlight}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// ============================================================================
// SECTION 9: THE INVESTMENT THESIS
// ============================================================================

const InvestmentCTASection = ({ sector }) => {
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
        value: "12-18%",
        detail: "Studios and academies with proven demand and rapid revenue",
      },
      {
        label: "Tier 2 Ventures",
        value: "8-14%",
        detail: "Fashion incubators and post-production with strong asset base",
      },
      { label: "Portfolio IRR", value: "10-18%", detail: "Blended across 22 ventures with risk-adjusted modeling" },
      {
        label: "Dev. Leverage",
        value: "3-5x",
        detail: "Every dollar generates $3-5 in local creative economy activity",
      },
    ],
    timeline: [
      {
        label: "Phase 1 (Q1-Q2)",
        value: "Foundation",
        detail: "Studios launch, GHAMRO digitization, creative financing",
      },
      { label: "Phase 2 (Q3-Q4)", value: "Scale", detail: "Academy ops, heritage textile platform, film hub buildout" },
      {
        label: "Phase 3 (2027+)",
        value: "Expansion",
        detail: "Fashion incubator, post-production, Pan-African distribution",
      },
      { label: "Exit Horizon", value: "5-7 yrs", detail: "Staged liquidity via asset sales, IP licensing, or recap" },
    ],
    impact: [
      { label: "Creatives Served", value: "50K+", detail: "Beneficiaries across music, film, sports, and fashion" },
      { label: "Jobs Created", value: "2,000+", detail: "Employment in studios, academies, and production facilities" },
      {
        label: "Youth Athletes",
        value: "5,000+",
        detail: "In certified academies with education and development paths",
      },
      { label: "Artisans Connected", value: "6,000+", detail: "Artisans linked to premium markets via authentication" },
    ],
  };

  const audiences = [
    {
      key: "entrepreneur",
      label: "Entrepreneur",
      shortLabel: "Founder",
      icon: <IconStorefront />,
      headline: "Build Creative Ventures That Empower Artists",
      pitch:
        "BRIDGE provides validated venture models, anchor partnerships, and creative financing strategies so you can launch studios, academies, and platforms with de-risked market entry and clear paths to profitability.",
      stats: [
        { value: "22", label: "Venture Paths", detail: "validated models" },
        { value: "3M+", label: "Market Access", detail: "creatives to serve" },
        { value: "Full", label: "BRIDGE Support", detail: "incubation to scale" },
        { value: "5-7yr", label: "Growth Horizon", detail: "venture timeline" },
      ],
      pathways: [
        {
          bring: "Creative industry knowledge & networks",
          get: "BRIDGE provides venture blueprints, financial models, and go/no-go frameworks",
        },
        {
          bring: "Community relationships & artist trust",
          get: "Access to financing facilities, government partnerships, and infrastructure",
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
      headline: "Position Your Brand in Ghana's Creative Economy",
      pitch:
        "Partner with BRIDGE to access production infrastructure, creative talent pipelines, and cultural IP — while contributing to development outcomes that strengthen your market position across West Africa.",
      stats: [
        { value: "$10-22M", label: "Capital Range", detail: "across 22 ventures" },
        { value: "8-12%", label: "Cash Yield", detail: "annual distribution" },
        { value: "$4.8B", label: "Addressable", detail: "creative economy" },
        { value: "30-40%", label: "Cost Savings", detail: "production costs" },
      ],
      pathways: [
        {
          bring: "Content licensing & distribution reach",
          get: "Priority access to studio facilities and preferential production pricing",
        },
        {
          bring: "Technical expertise & equipment",
          get: "Co-development opportunities in production infrastructure and creative tech",
        },
        {
          bring: "CSR alignment & brand partnerships",
          get: "Impact reporting, ESG metrics, and community engagement documentation",
        },
      ],
    },
    {
      key: "investor",
      label: "Investor",
      shortLabel: "Investor",
      icon: <IconTrendingUp />,
      headline: "Creative Assets With Compounding Impact Returns",
      pitch:
        "Deploy capital into creative infrastructure assets with transparent governance, IP-backed revenue streams, and measurable cultural outcomes — backed by government policy alignment and massive unmet demand.",
      stats: [
        { value: "10-18%", label: "Target IRR", detail: "blended portfolio" },
        { value: "2.5x", label: "Multiple", detail: "capital appreciation" },
        { value: "12-18mo", label: "First Cash", detail: "revenue timeline" },
        { value: "5-7yr", label: "Exit Horizon", detail: "fund lifecycle" },
      ],
      pathways: [
        {
          bring: "Growth capital & patient deployment",
          get: "IP-backed returns with creative infrastructure as collateral and clear exit pathways",
        },
        {
          bring: "Sector expertise & strategic guidance",
          get: "Board participation, portfolio oversight, and co-investment opportunities",
        },
        {
          bring: "Network access & deal flow",
          get: "First-look rights on expansion ventures and Pan-African replication opportunities",
        },
      ],
    },
    {
      key: "government",
      label: "Government",
      shortLabel: "Government",
      icon: <IconLandmark />,
      headline: "Develop Creative Industries With Private Capital",
      pitch:
        "BRIDGE ventures align directly with the Black Star Experience and 2026 Budget creative industries priorities — delivering studios, academies, and market platforms through private capital while creating jobs and growing the creative GDP.",
      stats: [
        { value: "2,000+", label: "Jobs Created", detail: "direct employment" },
        { value: "95%", label: "Private Capital", detail: "no fiscal burden" },
        { value: "3-5x", label: "Tax Multiplier", detail: "economic activity" },
        { value: "$4.8B", label: "Creative GDP", detail: "economy scale" },
      ],
      pathways: [
        {
          bring: "Policy alignment & regulatory support",
          get: "Creative infrastructure delivery aligned with Black Star and 24-Hour Economy",
        },
        {
          bring: "Land access & permitting facilitation",
          get: "Job creation, tax revenue expansion, and improved cultural export performance",
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
            marginBottom: isMobile ? "32px" : "60px",
            padding: isMobile ? "0 20px" : 0,
            textAlign: isMobile ? "center" : "left",
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
            <span style={{ color: colors.accent, fontWeight: "600" }}>Ghana's Creative Future</span>
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
              marginBottom: "24px",
              padding: "0 20px",
              gap: "16px",
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
                    padding: "0",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "14px",
                      backgroundColor: isActive ? colors.accentLight : colors.background,
                      border: isActive ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease",
                      color: isActive ? colors.primary : "#999",
                    }}
                  >
                    {aud.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      fontWeight: isActive ? "700" : "500",
                      color: isActive ? colors.primary : "#999",
                      transition: "all 0.2s ease",
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
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
                border: `1px solid ${colors.line}`,
                borderRadius: "50px",
                padding: "5px",
                backgroundColor: colors.white,
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
                      padding: "6px 14px",
                      borderRadius: "50px",
                      border: isActive ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                      backgroundColor: isActive ? colors.accentLight : "transparent",
                      color: isActive ? colors.primary : "#999",
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: isActive ? "700" : "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      flexShrink: 0,
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        color: isActive ? colors.primary : "#999",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {aud.icon}
                    </span>
                    {aud.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Two-Column Content Grid */}
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
                  minHeight: "80px",
                  display: "flex",
                  alignItems: "flex-end",
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
                  minHeight: "100px",
                }}
              >
                {activeAudienceData.pitch}
              </p>
            )}

            {/* Stat Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
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
                <IconCheck />
              </div>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#444", lineHeight: "1.5" }}>
                <strong style={{ color: colors.primary }}>National Creative Arts Council</strong> aligned with BRIDGE's
                creative industries development framework
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
                      gap: isMobile ? "8px" : "16px",
                      alignItems: isMobile ? "flex-start" : "center",
                      flex: 1,
                      minHeight: isMobile ? "auto" : "0",
                    }}
                  >
                    <div style={{ width: isMobile ? "auto" : "140px", flexShrink: 0 }}>
                      <div
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: isMobile ? "20px" : "20px",
                          fontWeight: "700",
                          color: colors.accent,
                          lineHeight: "1.1",
                          wordBreak: "break-word",
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
                        ...(isMobile
                          ? { borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "8px", width: "100%" }
                          : { borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: "16px" }),
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

          {/* Mobile Toggle Button */}
          {isMobile && (
            <button
              onClick={() => setShowInvestmentDetails(!showInvestmentDetails)}
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
              {showInvestmentDetails ? "Hide details" : "View returns, timeline & impact"}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={colors.primary}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: showInvestmentDetails ? "rotate(180deg)" : "none",
                  transition: "transform 0.25s ease",
                }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          )}
        </div>
      </div>
      {/* end maxWidth wrapper */}
    </section>
  );
};

// ============================================================================
// SECTION 10: FINAL CTA
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
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto", textAlign: "center" }}>
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
            letterSpacing: "1.5px",
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
            letterSpacing: "-0.5px",
            color: colors.white,
            margin: "0 0 24px 0",
          }}
        >
          Let's Build Ghana's <span style={{ color: colors.accent, fontWeight: "600" }}>Creative Industries</span>
        </h2>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "16px" : "18px",
            lineHeight: "1.7",
            color: "rgba(255,255,255,0.7)",
            margin: "0 0 40px 0",
            maxWidth: "620px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Whether you're an investor, partner, or government stakeholder, there's a seat at the table in building
          Ghana's creative future.
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
              justifyContent: "center",
              gap: "10px",
              width: isMobile ? "100%" : "auto",
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
              width: isMobile ? "100%" : "auto",
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
// FOOTER COMPONENTS
// ============================================================================

const BridgeLogoWhite = () => (
  <div style={{ display: "flex", alignItems: "center", height: "40px" }}>
    <svg viewBox="0 0 4113.9 932.3" height="36" style={{ display: "block" }}>
      <path
        fill={colors.white}
        d="M3355.1,655.6h31.2v5.7h-31.2v-5.7ZM3355.1,667h31.2v11.1h-31.2v-11.1ZM3355.1,683.9h31.2v11.1h-31.2v-11.1ZM3355.1,700.8h31.2v11.1h-31.2v-11.1ZM3355.1,717.7h31.2v11.1h-31.2v-11.1ZM3355.1,734.5h31.2v11.1h-31.2v-11.1ZM3355.1,751.4h31.2v10.8h-31.2v-10.8ZM3355.1,767.9h31.2v11.1h-31.2v-11.1ZM3355.1,784.9h31.2v11.1h-31.2v-11.1ZM3355.1,801.8h31.2v11.1h-31.2v-11.1ZM3355.1,818.6h31.2v11.1h-31.2v-11.1ZM3355.1,835.5h31.2v11.1h-31.2v-11.1ZM3355.1,852.4h31.2v11.1h-31.2v-11.1ZM3355.1,869.2h31.2v11.1h-31.2v-11.1ZM3355.1,886.1h31.2v11.1h-31.2v-11.1ZM3355.1,903h31.2v5.7h-31.2v-5.7ZM3397.5,655.6h61.7c12.5,0,24.3,1.7,35.1,5.7h-96.8v-5.7h0ZM3397.5,667h109.7c5.9,3,11.4,6.7,16.7,11.1h-126.3v-11.1h-.1ZM3397.5,801.8h126.3c-5.2,4.4-10.8,8.1-16.7,11.1h-109.7v-11.1h.1ZM3397.5,818.6h96.8c-10.8,4-22.5,6.1-35.1,6.1h-30.5v84h-31.2v-90.2.1ZM3479.6,739.9c0-17.2-13.5-24.7-28.1-24.7h-23.6v49.3h23.6c14.5,0,28.1-7.5,28.1-24.7h0v.1ZM3485.6,683.9h44.4c3.4,3,6.6,6.7,9.3,11.1h-37.1c-4.9-4.4-10.8-8.4-16.7-11.1h.1ZM3502.2,784.9h37.1c-2.8,4-5.9,7.8-9.3,11.1h-44.4c5.9-2.7,11.8-6.7,16.7-11.1h-.1ZM3507.4,700.8h35.7c2.4,3.4,4.2,7.1,5.6,11.1h-33.6c-2.1-4-4.5-7.8-7.7-11.1ZM3515,767.9h33.6l-5.6,11.1h-35.7c3.1-3.4,5.6-7.1,7.7-11.1ZM3517.8,717.7h32.6c1.3,3.7,2.4,7.5,2.8,11.1h-32.3c-.7-3.7-1.8-7.5-3.1-11.1h0ZM3520.9,751.4h32.3c-.3,3.7-1.3,7.5-2.8,10.8h-32.6c1.3-3.4,2.4-7.1,3.1-10.8h0ZM3521.7,734.5h32.3c.3,3.7.3,7.5-.3,11.1h-32c.7-3.7.7-7.5,0-11.1h0ZM3397.5,689.2h61.7c28.4,0,51.7,23.3,51.7,50.9s-23.2,50.9-51.7,50.9h-61.7v-102h0v.2Z"
      />
      <path
        fill={colors.white}
        d="M3572.3,655.6h31.2v5.7h-31.2v-5.7ZM3572.3,667h31.2v11.1h-31.2v-11.1ZM3572.3,683.9h31.2v11.1h-31.2v-11.1ZM3572.3,700.8h31.2v11.1h-31.2v-11.1ZM3572.3,717.7h31.2v11.1h-31.2v-11.1ZM3572.3,734.5h31.2v11.1h-31.2v-11.1ZM3572.3,751.4h31.2v10.8h-31.2v-10.8ZM3572.3,767.9h31.2v11.1h-31.2v-11.1ZM3572.3,784.9h31.2v11.1h-31.2v-11.1ZM3572.3,801.8h31.2v11.1h-31.2v-11.1ZM3572.3,818.6h31.2v11.1h-31.2v-11.1ZM3572.3,835.5h31.2v11.1h-31.2v-11.1ZM3572.3,852.4h31.2v11.1h-31.2v-11.1ZM3572.3,869.2h31.2v11.1h-31.2v-11.1ZM3572.3,886.1h31.2v11.1h-31.2v-11.1ZM3572.3,903h31.2v5.7h-31.2v-5.7ZM3614.6,655.6h45.4c12.5,0,24.6,2.1,35.7,5.7h-81.2v-5.7h.1ZM3614.6,667h94.4c5.9,3,11.4,6.7,16,11.1h-110.3v-11.1h-.1ZM3614.6,689h45.4c23.6,0,42,12.5,42,34.1,0,36.4-42.3,62.5-87.5,72.2v-106.4l.1.1ZM3685.4,775.1c17.3,9.8,36.4,32.4,36.4,57.1s-16,43.2-46.2,43.2h-61.1v-69.5c24.6-4.8,52.4-15.6,70.8-30.7h.1v-.1ZM3614.6,886.1h125.2c-4.5,4.4-10.1,8.1-16,11.1h-109.3v-11.1h.1ZM3614.6,903h96.1c-10.8,3.7-22.5,5.7-35.1,5.7h-61.1v-5.7h.1ZM3674.3,725.4c0-7.5-6.6-12.9-15.6-12.9h-16.3v49c19.8-9.1,32-21.9,32-36.1h-.1ZM3686.1,805.8c-13.2,7.5-28.4,13.5-43.7,18.3v27.7h32c19.1,0,27.1-17.5,11.8-45.9h-.1v-.1ZM3687.5,683.9h43.1c3.1,3.4,5.6,7.1,7.7,11.1h-35.4c-4.2-4.8-9.3-8.4-15.3-11.1h-.1ZM3694.7,767.9h38.9c3.8,3.7,7.3,7.5,10.4,11.1h-35.7c-4.2-4.4-9-8.1-13.5-11.1h-.1,0ZM3705.8,751.4h30.5c-2.1,4-4.5,7.8-7.3,10.8h-30.9c2.8-3.4,5.6-7.1,7.7-10.8h0ZM3718.4,869.2h35.7c-2.4,4-5.2,7.8-8.7,11.1h-42.3c5.9-3,11.1-6.7,15.3-11.1h.1-.1ZM3706.9,700.8h33.6c1.3,2.7,2.8,7.1,3.1,11.1h-32c-1-4-2.8-7.8-4.9-11.1h.2ZM3711.8,734.5h30.9c-.7,4-1.8,7.8-3.4,11.1h-30.5c1.3-3.7,2.4-7.5,3.1-11.1h-.1ZM3712.8,717.7h31.2c.3,3.7.3,7.5-.3,11.1h-30.9c.7-3,.7-8.1,0-11.1h0ZM3713.8,784.9h34.3c2.4,3.4,4.9,7.5,6.6,11.1h-33c-2.4-4-5.2-7.8-8-11.1h.1ZM3729.1,852.4h32.3c-.7,3.7-2.1,7.5-4.2,11.1h-34c2.4-3.4,4.5-7.1,5.9-11.1h0ZM3724.9,801.8h32.6c1.8,3.7,3.1,7.5,3.8,11.1h-31.5c-1.3-3.7-2.8-7.5-4.9-11.1ZM3732.6,835.5h31.5c0,3.7-.3,7.5-1.3,11.1h-32c1-3.7,1.8-7.5,1.8-11.1h0ZM3731.3,818.6h31.5c1,3.7,1.3,7.5,1.3,11.1h-31.2c-.3-3.7-.7-7.5-1.8-11.1h.2Z"
      />
      <path
        fill={colors.white}
        d="M3774.6,767.9h32l-.7,11.1h-32c0-3.4.3-7.8.7-11.1ZM3773.9,784.9h32c0,3.4.3,7.5.7,11.1h-32c-.3-3.4-.7-7.8-.7-11.1ZM3777.7,751.4h32.3c-1,3.7-1.8,6.7-2.4,10.8h-32.3c.7-3.7,1.3-7.1,2.4-10.8ZM3775.3,801.8h32.3c.7,4,1.3,7.5,2.4,11.1h-32.3c-1-3.7-1.8-7.5-2.4-11.1ZM3783.2,734.5h33c-1.8,3.7-3.1,7.5-4.5,11.1h-32.6c1-3.7,2.4-7.5,4.2-11.1h-.1ZM3779.1,818.6h32.6c1.3,3.7,2.8,7.5,4.5,11.1h-33c-1.8-3.7-3.1-7.5-4.2-11.1h.1ZM3791.5,717.7h34.3l-7,11.1h-33.3c1.8-3.7,3.4-7.1,5.9-11.1h.1ZM3785.7,835.5h33.3l7,11.1h-34.3c-2.4-4-4.2-7.5-5.9-11.1h-.1ZM3803.4,700.8h37.5c-3.8,3.4-7.7,7.5-10.4,11.1h-35.4c2.1-3.4,5.2-7.5,8.3-11.1ZM3795.1,852.4h35.4c2.8,3.7,6.6,7.8,10.4,11.1h-37.5c-3.1-3.7-6.2-7.8-8.3-11.1ZM3819.7,683.9h45.1c-5.9,3-11.8,6.7-17.3,11.1h-39.2c3.8-4,7.7-7.8,11.4-11.1ZM3808.3,869.2h39.2c5.6,4.4,11.4,8.1,17.3,11.1h-45.1c-3.8-3.4-7.7-7.1-11.4-11.1ZM3817,782.2c0-55.4,43.1-99.3,96.8-99.3s57.9,14.2,75.6,36.8l-18.1,21.9c-12.9-18.9-33.6-31-57.6-31-36.1,0-64.9,31-64.9,71.6s28.8,71.6,64.9,71.6,44.7-12.1,57.6-31l18.1,21.9c-17.7,22.6-44.7,36.8-75.6,36.8-53.7,0-96.8-43.9-96.8-99.3ZM3844.7,667h138.1c6.2,3.4,12.1,7.1,17.7,11.1h-51.1c-11.4-4-23.2-6.1-35.7-6.1s-24.3,2.1-35.7,6.1h-51.1c5.6-4,11.4-7.8,17.7-11.1h-.1.2ZM3826.9,886.1h51.1c11.4,4,23.2,6.1,35.7,6.1s24.3-2.1,35.7-6.1h51.1c-5.6,4-11.4,7.8-17.7,11.1h-138.1c-6.2-3.4-12.1-7.1-17.7-11.1h.1-.2ZM3913.8,650.2c20.4,0,39.5,4,56.9,11.1h-113.8c17.3-7.1,36.4-11.1,56.9-11.1h.1-.1ZM3856.8,903h113.8c-17.3,7.1-36.4,11.1-56.9,11.1s-39.5-4-56.9-11.1h-.1.1ZM3962.7,683.9h45.1l5.9,5.4-4.5,5.7h-29.2c-5.6-4.4-11.4-8.1-17.3-11.1h-.1.1ZM3980,869.2h29.2l4.5,5.4c-1.8,2.1-3.8,4-5.9,5.7h-45.1c5.9-3,11.8-6.7,17.3-11.1h.1-.1ZM3986.6,700.8h18.1l-8.3,10.2c-2.8-3.4-6.2-7.1-9.8-10.2h0ZM3996.3,853.3l8.3,10.2h-18.1c3.4-3,7-6.7,9.8-10.2h0Z"
      />
      <path
        fill={colors.white}
        d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"
      />
      <path
        fill={colors.white}
        stroke={colors.white}
        strokeWidth="0.5"
        strokeMiterlimit="10"
        d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"
      />
      <path
        fill={colors.white}
        stroke={colors.white}
        strokeWidth="0.5"
        strokeMiterlimit="10"
        d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"
      />
      <rect fill={colors.accent} x="1427.4" y="17.4" width="205.2" height="145" />
      <rect fill={colors.white} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6" />
      <path
        fill={colors.white}
        d="M2757.4,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"
      />
      <rect fill={colors.white} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6" />
      <rect fill={colors.accent} x="3083.5" y="339.5" width="175.1" height="257.7" />
      <rect fill={colors.accent} x="3083.5" y="654.5" width="175.1" height="257.7" />
      <circle fill="none" stroke={colors.white} strokeWidth="5" strokeMiterlimit="10" cx="4078.6" cy="661.3" r="32.8" />
      <path
        fill={colors.white}
        d="M4092.2,677.1l-7.3-10.4c.2,0,.3,0,.4-.2,2-.9,3.6-2.1,4.6-3.8s1.6-3.6,1.6-6.1c0-3.6-1.2-6.3-3.6-8.4s-5.7-3-10-3h-13v31.8h5.9v-9.3h8.5l6.5,9.3h6.4v.1ZM4083.7,651.9c1.3,1.1,2,2.7,2,4.7s-.6,3.6-2,4.7-3.3,1.7-5.9,1.7h-6.9v-12.6h6.9c2.6,0,4.5.5,5.9,1.6h0v-.1Z"
      />
      <rect
        fill="none"
        stroke={colors.white}
        strokeWidth="80"
        strokeMiterlimit="10"
        x="40"
        y="40"
        width="843.9"
        height="852.3"
        rx="36.6"
        ry="36.6"
      />
      <polygon
        fill={colors.accent}
        stroke={colors.white}
        strokeMiterlimit="10"
        points="722.6 322.2 462.3 452.9 202 322.8 461.3 192.6 722.6 322.2"
      />
      <path
        fill="#74914a"
        d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1l.1-.1Z"
      />
      <path
        fill={colors.accent}
        d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"
      />
    </svg>
  </div>
);

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

const sectorRoutes: Record<string, string> = {
  infra: "/sectors/infrastructure", fin: "/sectors/financial", health: "/sectors/health",
  tech: "/sectors/technology", edu: "/sectors/education", agri: "/sectors/agriculture",
  creative: "/sectors/sports", housing: "/sectors/housing", tourism: "/sectors/tourism",
  energy: "/sectors/energy", mfg: "/sectors/manufacturing", transport: "/sectors/transport",
};

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
                  href={label === "Company" ? "/about" : label === "Services" ? "/services" : label === "Resources" ? "/resources" : "/insights"}
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

export default function SportsEntertainmentSectorPage() {
  const isMobile = useIsMobile();
  return (
    <div
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: colors.dark,
        lineHeight: "1.6",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Poppins:wght@700;800&display=swap"
        rel="stylesheet"
      />
      <style>{`
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
      <ValueChainSection />
      <SolutionsSection />
      <MarketEcosystemSection />
      <PolicyAlignmentSection />
      <CrossSectorSection />
      <InvestmentCTASection sector={sectorData} />
      <ImpactSection />
      <FinalCTASection />
      <div style={{ backgroundColor: colors.primary, padding: isMobile ? "0 20px" : "0 80px" }}>
        <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)" }} />
      </div>
      <Footer />
    </div>
  );
}
