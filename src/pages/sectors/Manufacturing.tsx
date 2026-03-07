import React, { useState, useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";

// ============================================================================
// BRIDGE SECTOR PAGE: Manufacturing & Light Industry
// INTEGRATED VERSION with Shared Components v2
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
  line: "#E5E5E5",
  lightGreen: "#E8F5E0",
  ctaGreen: "#2E5A4D",
  warning: "#D97706",
  warningBg: "#FEF3C7",
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
// SECTOR DATA - Manufacturing & Light Industry
// ============================================================================

const sectorData = {
  id: 11,
  slug: "manufacturing",
  name: "Manufacturing & Light Industry",
  shortName: "Manufacturing",
  category: "Economic Engines",
  categoryColor: "#2E7D32",

  capitalRange: "$15-30M",
  ventures: 18,
  jobsImpact: "2M+ workers",
  gdpContribution: "7.8%",

  problemHeadline: "The Foundation for Ghana's Industrial Renaissance",
  problemSubheadline:
    "With the AfCFTA headquarters in Accra and the 24-Hour Economy Policy creating a once-in-a-generation industrial window, Ghana's manufacturing sector represents $15-30M in addressable opportunity — from agro-processing and building materials to textiles, pharmaceuticals, and export-ready consumer goods.",

  keyStats: [
    { value: "7.8%", label: "Manufacturing GDP Share", detail: "Room for transformative growth" },
    { value: "60-70%", label: "Capacity Recapture Potential", detail: "Currently underutilized industrial capacity" },
    { value: "1.5M+", label: "Workforce to Formalize", detail: "Skills development addressable market" },
    { value: "$500M+", label: "Annual Addressable Finance Market", detail: "SME manufacturing credit opportunity" },
  ],

  painPoints: [
    {
      title: "Energy Cost Optimization",
      description:
        "Solar hybrid and shared industrial services can reduce power costs by 30-40%, achieving competitive parity across regional markets.",
      rootCauses: ["Solar hybrid potential", "Grid efficiency recapture 25%+", "Shared services models"],
      quantification: "30-40% operating cost reduction achievable",
    },
    {
      title: "Manufacturing Finance Innovation",
      description:
        "Purpose-built lending products — asset-backed, supply chain finance, equipment leasing — can serve the 90%+ of SMEs underserved by traditional banks.",
      rootCauses: ["Asset-based lending models", "Digital receivables platforms", "Development Bank Ghana alignment"],
      quantification: "$500M+ addressable manufacturing finance opportunity",
    },
    {
      title: "Quality Certification Acceleration",
      description:
        "Shared certification services can reduce costs 60-80% and open AfCFTA and global markets for Ghanaian manufacturers.",
      rootCauses: ["Shared cost models", "Diaspora QA expertise", "Regional standards harmonization"],
      quantification: "95%+ of SMEs ready for certification support",
    },
    {
      title: "Industrial Renaissance Opportunity",
      description:
        "AfCFTA headquarters in Accra and the 24-Hour Economy Policy create a once-in-a-generation window for Ghanaian manufacturing.",
      rootCauses: ["AfCFTA first-mover access", "Made in Ghana demand growth", "24-Hour Economy alignment"],
      quantification: "1.4B consumer market through AfCFTA",
    },
  ],

  solutions: [
    {
      tier: 1,
      name: "Agro-Processing Hub",
      description:
        "Integrated food processing facility for fruits, vegetables, and grains powered by solar+grid hybrid energy with contract farming supply linkages.",
      capital: "$2-3.5M",
      score: 41,
      impact: "Recaptures 60-70% processing capacity",
    },
    {
      tier: 1,
      name: "Shea Value Addition",
      description:
        "Processing plant transforming raw shea nuts into refined butter and derivative products for cosmetics and food industries via cooperative networks.",
      capital: "$1.5-2.5M",
      score: 41,
      impact: "Women-owned cooperative supply model",
    },
    {
      tier: 1,
      name: "Building Materials Plant",
      description:
        "Production of tiles, fixtures, and finishing materials for construction using local raw materials to reduce import costs and build housing supply.",
      capital: "$2-3M",
      score: 39,
      impact: "Builds local housing supply capacity",
    },
    {
      tier: 1,
      name: "Packaged Foods Company",
      description:
        "Manufacturing branded Ghanaian food products for domestic retail and diaspora export markets with modern packaging and certification standards.",
      capital: "$1.5-2M",
      score: 41,
      impact: "Builds Made-in-Ghana brand premium",
    },
    {
      tier: 1,
      name: "Cassava Processing Plant",
      description:
        "Industrial-scale cassava processing for starch, flour, and ethanol derivatives serving food, textile, and pharmaceutical value chains.",
      capital: "$2-3M",
      score: 40,
      impact: "Reduces $400M+ cassava imports",
    },
    {
      tier: 1,
      name: "Recycled Materials Hub",
      description:
        "Plastic and metal recycling facility converting post-consumer waste into manufacturing feedstock for building materials and packaging.",
      capital: "$1.5-2.5M",
      score: 39,
      impact: "Circular economy value capture",
    },
    {
      tier: 2,
      name: "Manufacturing Skills Academy",
      description:
        "Technical training center developing manufacturing workforce through TVET partnerships in machine operation, quality control, and safety standards.",
      capital: "$1-1.5M",
      score: 38,
      impact: "Industry-aligned curriculum via TVET",
    },
    {
      tier: 2,
      name: "Quality Certification Hub",
      description:
        "Shared-cost platform helping SME manufacturers achieve ISO, HACCP, and GMP certification with diaspora quality assurance expert network support.",
      capital: "$0.5-1M",
      score: 38,
      impact: "Unlocks export access for 95%+ SMEs",
    },
    {
      tier: 2,
      name: "Pharmaceutical Expansion",
      description:
        "Capacity expansion and GMP compliance upgrades for existing pharmaceutical manufacturers to strengthen local drug production and reduce imports.",
      capital: "$1.5-2.5M",
      score: 38,
      impact: "Serving 70% of domestic drug market",
    },
    {
      tier: 2,
      name: "Industrial Chemicals Plant",
      description:
        "Domestic manufacturing of cleaning agents, agricultural chemicals, and industrial inputs currently imported with quality and regulatory compliance.",
      capital: "$1.5-2.5M",
      score: 38,
      impact: "Import substitution for key chemicals",
    },
    {
      tier: 2,
      name: "Equipment Leasing Platform",
      description:
        "Shared manufacturing equipment leasing service enabling SMEs to access CNC, injection molding, and packaging machinery without capital outlay.",
      capital: "$1-2M",
      score: 37,
      impact: "Lowers SME entry barriers 70%",
    },
    {
      tier: 2,
      name: "Digital Factory Network",
      description:
        "IoT-enabled production monitoring and quality management system connecting manufacturing SMEs to shared data analytics and maintenance schedules.",
      capital: "$0.8-1.5M",
      score: 37,
      impact: "Real-time production optimization",
    },
    {
      tier: 3,
      name: "Textile & Garment Factory",
      description:
        "Modern garment factory for domestic and export markets aligned with the government textile revival strategy and its $2B capacity goal by 2033.",
      capital: "$2-3M",
      score: 36,
      impact: "Rebuilds textile employment pipeline",
    },
    {
      tier: 3,
      name: "Personal Care Products",
      description:
        "Natural personal care line featuring African black soap, shea lotions, and hair care formulations for growing domestic and diaspora consumer demand.",
      capital: "$1-2M",
      score: 36,
      impact: "Raw material value addition at source",
    },
    {
      tier: 3,
      name: "Electronics Assembly",
      description:
        "Assembly and packaging facility for consumer electronics, solar components, and telecom equipment using free zone incentive structures and tax holidays.",
      capital: "$2-3.5M",
      score: 35,
      impact: "Technology transfer and skills growth",
    },
    {
      tier: 3,
      name: "Regional Export Platform",
      description:
        "Consolidated export logistics hub offering customs facilitation, quality testing, and AfCFTA documentation for manufacturers targeting new markets.",
      capital: "$2-3M",
      score: 37,
      impact: "Access to 1.4B consumer AfCFTA market",
    },
    {
      tier: 3,
      name: "Furniture & Woodcraft Studio",
      description:
        "Modern woodworking facility producing export-quality furniture and architectural elements from sustainably sourced Ghanaian hardwoods.",
      capital: "$1-2M",
      score: 35,
      impact: "Artisan-to-industrial scale bridge",
    },
    {
      tier: 3,
      name: "Cold Chain Network",
      description:
        "Temperature-controlled storage and transport infrastructure serving pharmaceutical, food processing, and agricultural export value chains.",
      capital: "$2-3.5M",
      score: 36,
      impact: "Reduces post-harvest losses 40%",
    },
  ],
  competitors: [
    {
      name: "GIPC",
      focus: "Foreign direct investment facilitation and manufacturer registration",
      gap: "Post-registration support gap",
      year: "1994",
      funding: "Gov't",
      priority: "High",
      strengths: [
        { name: "Investment Pipeline", rating: 5 },
        { name: "Policy Influence", rating: 4 },
        { name: "Brand Recognition", rating: 4 },
      ],
      gaps: [
        "Post-investment operational support opportunity",
        "SME manufacturer inclusion potential",
        "Value chain integration extension",
      ],
      bridgeOpportunity: "BRIDGE provides operational delivery for GIPC-registered manufacturing investors.",
    },
    {
      name: "AGI",
      focus: "Industry advocacy, standards development, and manufacturer networking",
      gap: "Implementation gap",
      year: "1958",
      funding: "Gov't",
      priority: "High",
      strengths: [
        { name: "Industry Network", rating: 5 },
        { name: "Policy Advocacy", rating: 4 },
        { name: "Standards Setting", rating: 3 },
      ],
      gaps: [
        "Technical implementation support opportunity",
        "SME capability building potential",
        "Cross-sector value chain linkage",
      ],
      bridgeOpportunity: "BRIDGE adds technical execution and cross-sector linkages to AGI advocacy.",
    },
    {
      name: "1D1F Program",
      focus: "One District One Factory government factory establishment initiative",
      gap: "Scaling and optimization gap",
      year: "2017",
      funding: "$500M+",
      priority: "High",
      strengths: [
        { name: "Government Backing", rating: 5 },
        { name: "Geographic Reach", rating: 4 },
        { name: "Capital Access", rating: 4 },
      ],
      gaps: [
        "Factory optimization and efficiency potential",
        "Market linkage and export readiness",
        "Quality certification pathway creation",
      ],
      bridgeOpportunity: "BRIDGE provides quality certification and market access for 1D1F factories.",
    },
    {
      name: "Development Bank Ghana",
      focus: "Manufacturing priority lending and equipment financing for SMEs",
      gap: "Sector-specific design gap",
      year: "2020",
      funding: "$300M+",
      priority: "High",
      strengths: [
        { name: "Capital Scale", rating: 4 },
        { name: "SME Focus", rating: 4 },
        { name: "Gov Capitalization", rating: 5 },
      ],
      gaps: [
        "Manufacturing-specific product design opportunity",
        "Equipment leasing model innovation",
        "Borrower technical assistance integration",
      ],
      bridgeOpportunity: "BRIDGE co-designs manufacturing working capital products with DBG.",
    },
    {
      name: "GIZ Industrial Dev.",
      focus: "German development cooperation for industrial skills and standards",
      gap: "Scale and continuity gap",
      year: "2005",
      funding: "$50M+",
      priority: "Medium",
      strengths: [
        { name: "Technical Expertise", rating: 5 },
        { name: "Training Quality", rating: 4 },
        { name: "Standards Transfer", rating: 4 },
      ],
      gaps: [
        "Long-term sustainability beyond project cycles",
        "Private sector co-investment models",
        "Employment pipeline for trained graduates",
      ],
      bridgeOpportunity: "BRIDGE adds employment pipeline and private capital to GIZ training programs.",
    },
    {
      name: "Ghana Free Zones Auth.",
      focus: "Export-oriented manufacturing incentives and free zone administration",
      gap: "SME access gap",
      year: "1995",
      funding: "Gov't",
      priority: "Medium",
      strengths: [
        { name: "Regulatory Authority", rating: 5 },
        { name: "Tax Incentive Access", rating: 5 },
        { name: "Export Facilitation", rating: 3 },
      ],
      gaps: [
        "SME manufacturer inclusion pathway",
        "Quality assurance within free zones",
        "Cross-sector export coordination potential",
      ],
      bridgeOpportunity: "BRIDGE connects SME manufacturers to free zone benefits via certification pathways.",
    },
  ],

  allies: [
    {
      name: "Ghana Enterprises Agency",
      focus: "SME development & business services",
      collaboration: "Manufacturing-specific program co-design",
      year: "2020",
      funding: "Gov't",
      priority: "Medium",
      strengths: [
        { name: "Government Mandate", rating: 5 },
        { name: "National Reach", rating: 4 },
        { name: "MSME Database", rating: 4 },
      ],
      complementary: [
        "BRIDGE adds manufacturing expertise",
        "Technical capacity augmentation",
        "Sector-specific programming",
      ],
      bridgeOpportunity: "Manufacturing-specific program partnership",
    },
    {
      name: "1D1F Secretariat",
      focus: "District factory establishment",
      collaboration: "Technical support for operational factories",
      year: "2017",
      funding: "Gov't",
      priority: "High",
      strengths: [
        { name: "Government Backing", rating: 5 },
        { name: "District Reach", rating: 4 },
        { name: "126+ Factories", rating: 4 },
      ],
      complementary: [
        "Post-establishment technical support",
        "Quality improvement services",
        "Market linkage facilitation",
      ],
      bridgeOpportunity: "Technical support for existing factories",
    },
    {
      name: "Ghana Free Zones Authority",
      focus: "Export manufacturing incentives",
      collaboration: "SME access facilitation",
      year: "1995",
      funding: "Gov't",
      priority: "High",
      strengths: [
        { name: "Incentive Package", rating: 5 },
        { name: "500+ Enterprises", rating: 4 },
        { name: "New Leadership", rating: 4 },
      ],
      complementary: ["SME onboarding pathways", "Export readiness preparation", "Certification bridge services"],
      bridgeOpportunity: "SME access facilitation partner",
    },
    {
      name: "Association of Ghana Industries",
      focus: "Manufacturing advocacy & policy",
      collaboration: "SME voice and capacity building",
      year: "1958",
      funding: "Member",
      priority: "Medium",
      strengths: [
        { name: "Policy Access", rating: 5 },
        { name: "1,200+ Members", rating: 4 },
        { name: "Regional Chapters", rating: 3 },
      ],
      complementary: ["SME representation amplification", "Training program delivery", "Research partnership"],
      bridgeOpportunity: "SME capacity building partnership",
    },
    {
      name: "Invest for Jobs (GIZ)",
      focus: "Employment-focused manufacturing support",
      collaboration: "Co-investment and knowledge sharing",
      year: "2019",
      funding: "$20M+",
      priority: "Medium",
      strengths: [
        { name: "Technical Expertise", rating: 5 },
        { name: "Quality Jobs Focus", rating: 5 },
        { name: "German Dev Backing", rating: 4 },
      ],
      complementary: ["Scale amplification", "Sector-specific depth", "Sustainability framework"],
      bridgeOpportunity: "Co-investment and technical partnership",
    },
    {
      name: "Development Bank Ghana",
      focus: "Development finance & SME lending",
      collaboration: "Manufacturing finance product co-design",
      year: "2021",
      funding: "Gov't",
      priority: "High",
      strengths: [
        { name: "Gov Capitalization", rating: 4 },
        { name: "Development Mandate", rating: 5 },
        { name: "Favorable Terms", rating: 4 },
      ],
      complementary: ["Borrower readiness preparation", "Sector intelligence sharing", "Pipeline development"],
      bridgeOpportunity: "Manufacturing working capital facility co-design",
    },
  ],

  relatedSectors: [
    { id: 6, name: "Agriculture", icon: "seed", reason: "Agro-processing, raw material supply chains" },
    { id: 2, name: "Financial Inclusion", icon: "wallet", reason: "Manufacturing finance, equipment leasing" },
    { id: 5, name: "Education & Skills", icon: "graduation", reason: "TVET workforce development" },
  ],
};

// ============================================================================
// PREMIUM VALUE CHAIN DATA
// ============================================================================

const valueChainStages = [
  {
    id: 1,
    stage: "Raw Materials",
    actor: "Suppliers & Farmers",
    population: "Millions of smallholders",
    icon: "seed",
    valueRetained: 100,
    valueLost: 0,
    painPoints: [
      "Quality standardization potential",
      "Volume aggregation platforms",
      "30-40% processing recapture",
      "Digital payment integration",
    ],
    stat: "15-30% value-add",
    color: colors.accent,
  },
  {
    id: 2,
    stage: "Input Supply",
    actor: "Equipment & Material Dealers",
    population: "Accra-Tema concentrated",
    icon: "warehouse",
    valueRetained: 78,
    valueLost: 22,
    painPoints: [
      "Local manufacturing potential",
      "Regional distribution networks",
      "Bulk procurement cooperatives",
      "FX risk management tools",
    ],
    stat: "20-30% optimizable",
    color: colors.accent,
  },
  {
    id: 3,
    stage: "Manufacturing",
    actor: "SME Producers",
    population: "~600K formal, 1.5M+ informal",
    icon: "factory",
    valueRetained: 52,
    valueLost: 26,
    painPoints: [
      "Solar hybrid energy solutions",
      "Purpose-built finance products",
      "Shared certification services",
      "Skills academy pipeline",
    ],
    stat: "60-70% recapturable",
    color: colors.accent,
  },
  {
    id: 4,
    stage: "Quality & Standards",
    actor: "GSA, FDA, Certification Bodies",
    population: "Limited capacity",
    icon: "shield",
    valueRetained: 40,
    valueLost: 12,
    painPoints: [
      "Shared cost certification model",
      "Diaspora expertise deployment",
      "Regional standards alignment",
      "Digital compliance platforms",
    ],
    stat: "95%+ certifiable",
    color: colors.accent,
  },
  {
    id: 5,
    stage: "Market & Export",
    actor: "Retailers, Exporters, Consumers",
    population: "32M+ domestic, AfCFTA 1.4B",
    icon: "users",
    valueRetained: 30,
    valueLost: 10,
    painPoints: [
      'Brand-building for "Made in Ghana"',
      "AfCFTA first-mover positioning",
      "Diaspora distribution channels",
      "E-commerce market access",
    ],
    stat: "1.4B market access",
    color: colors.accent,
  },
];

// ============================================================================
// ICON COMPONENTS
// ============================================================================

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
    <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
  </svg>
);

// Premium Value Chain Icons
const valueChainIcons = {
  seed: (
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
      <path d="M12 22c6-6 6-12 0-18C6 10 6 16 12 22z" />
      <path d="M12 22V10" />
      <path d="M8 14c1.5-1.5 3.5-2 4-2" />
      <path d="M16 14c-1.5-1.5-3.5-2-4-2" />
    </svg>
  ),
  warehouse: (
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
      <path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z" />
      <path d="M6 18h12" />
      <path d="M6 14h12" />
      <rect x="6" y="10" width="12" height="12" />
    </svg>
  ),
  factory: (
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
      <path d="M9 12l2 2 4-4" />
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
// BRIDGELOGO (Dark version for Header)
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
    "About BRIDGE": "/about", "Our Approach": "/methodology", "Sectors": "/services",
    "Contact Us": "/contact", "Research & Guidance": "/services", "Venture Development": "/services",
    "Direct Investment": "/services", "Strategic Partnerships": "/services",
    "White Paper": "/resources", "Case Studies": "/resources", "Research Library": "/resources",
    "Data & Reports": "/resources", "Insights & Analysis": "/insights", "Sector Briefs": "/insights",
    "Policy Updates": "/insights", "Annual Review": "/insights",
  };
  return map[link] || "#";
};



// ============================================================================
// HERO SECTION — Production Handoff
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
              <span style={{ fontWeight: "700" }}>Manufacturing</span> &{!isMobile && <br />} Light Industry
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
                    fontSize: isMobile ? "28px" : "42px",
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
                    fontSize: isMobile ? "12px" : "13px",
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
                    fontSize: isMobile ? "28px" : "42px",
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
// PROBLEM SECTION — Pill Variant A (Bordered on light bg)
// ============================================================================

const ProblemSection = ({ sector }) => {
  const [expandedProblem, setExpandedProblem] = useState(null);
  const isMobile = useIsMobile();

  const enhancedPainPoints = [
    {
      ...sector.painPoints[0],
      severity: "High Priority",
      severityScore: 95,
      affectedCount: "600K+",
      affectedLabel: "manufacturing workers",
      rootCauses: [
        { title: "Solar Hybrid Potential", description: "Abundant solar resource" },
        { title: "Grid Modernization", description: "25%+ efficiency recapture" },
        { title: "Shared Services Model", description: "Cost pooling for SMEs" },
        { title: "Off-Peak Optimization", description: "24-Hour Economy alignment" },
      ],
      bridgeSolution: "Solar Hybrid Power + Shared Industrial Services",
    },
    {
      ...sector.painPoints[1],
      severity: "High Priority",
      severityScore: 92,
      affectedCount: "90%+",
      affectedLabel: "of SMEs underserved",
      rootCauses: [
        { title: "Asset-Based Lending", description: "Equipment as collateral" },
        { title: "Supply Chain Finance", description: "Digital receivables" },
        { title: "Development Bank Ghana", description: "Aligned institutional partner" },
        { title: "Diaspora Capital", description: "Alternative funding pools" },
      ],
      bridgeSolution: "Manufacturing Working Capital Facility",
    },
    {
      ...sector.painPoints[2],
      severity: "Strategic",
      severityScore: 85,
      affectedCount: "95%+",
      affectedLabel: "SMEs export-ready",
      rootCauses: [
        { title: "Shared Cost Model", description: "Affordable group certification" },
        { title: "Diaspora QA Experts", description: "Technical knowledge bridge" },
        { title: "AfCFTA Advantage", description: "Accra HQ, first-mover access" },
        { title: "Standards Harmonization", description: "Regional alignment momentum" },
      ],
      bridgeSolution: "Quality Certification Accelerator",
    },
    {
      ...sector.painPoints[3],
      severity: "Strategic",
      severityScore: 80,
      affectedCount: "1.4B",
      affectedLabel: "consumer market via AfCFTA",
      rootCauses: [
        { title: "AfCFTA First-Mover", description: "HQ advantage in Accra" },
        { title: "Made in Ghana Demand", description: "Growing consumer preference" },
        { title: "24-Hour Economy", description: "Industrial policy window" },
        { title: "Workforce Pipeline", description: "Skills formalization path" },
      ],
      bridgeSolution: "Manufacturing Skills Academy + Industrial Park",
    },
  ];

  return (
    <section style={{ backgroundColor: colors.background, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
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
              margin: "24px 0 20px 0",
              maxWidth: "820px",
            }}
          >
            <span style={{ color: colors.accent, fontWeight: "600" }}>2M+</span> workers ready to power Ghana's{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>industrial growth</span> through smarter{" "}
            <span style={{ fontWeight: "600" }}>manufacturing</span>
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
            Ghana's manufacturing sector represents one of the most compelling investment landscapes on the continent —
            where targeted capital, technical expertise, and market access can unlock transformative value.
          </p>
        </div>

        {/* Card Grid: Desktop 2x2 | Mobile horizontal scroll */}
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
              : { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }
          }
        >
          {enhancedPainPoints.map((problem, index) => {
            const isExpanded = expandedProblem === index;
            const sevColors =
              problem.severity === "High Priority"
                ? { bg: colors.accentLight, text: colors.primary, bar: colors.accent }
                : { bg: "rgba(184,217,53,0.12)", text: "#5C7A1F", bar: colors.accent };
            return (
              <div
                key={index}
                style={isMobile ? { minWidth: "85%", maxWidth: "85%", flexShrink: 0, scrollSnapAlign: "start" } : {}}
              >
                <div
                  onClick={() => setExpandedProblem(isExpanded ? null : index)}
                  style={{
                    backgroundColor: colors.white,
                    borderRadius: isMobile ? "16px" : "20px",
                    padding: isMobile ? "20px" : "28px",
                    cursor: "pointer",
                    border: isExpanded ? `2px solid ${colors.accent}` : `1px solid ${colors.line}`,
                    transition: "all 0.3s ease",
                  }}
                >
                  {/* Zone 1: Title + Badge + Description */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "12px",
                      marginBottom: "8px",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: isMobile ? "16px" : "18px",
                        fontWeight: "600",
                        color: colors.dark,
                        margin: 0,
                        flex: 1,
                        lineHeight: "1.3",
                      }}
                    >
                      {problem.title}
                    </h3>
                    <span
                      style={{
                        backgroundColor: sevColors.bg,
                        color: sevColors.text,
                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        fontWeight: "700",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        fontFamily: "Inter, sans-serif",
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
                      margin: "0 0 12px 0",
                      lineHeight: "1.5",
                      display: "-webkit-box",
                      WebkitLineClamp: isMobile ? 2 : 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      minHeight: isMobile ? "auto" : "63px",
                    }}
                  >
                    {problem.description}
                  </p>

                  {/* Zone 2: Impact Bar */}
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
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Impact: {problem.quantification}
                    </span>
                  </div>

                  {/* Expanded Zones 3-5 */}
                  {isExpanded && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{ borderTop: `1px solid ${colors.line}`, paddingTop: "16px" }}
                    >
                      {/* Zone 3: Priority + Scale */}
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
                                backgroundColor: sevColors.bg,
                                color: sevColors.text,
                                padding: "4px 10px",
                                borderRadius: "20px",
                                fontSize: "12px",
                                fontWeight: "700",
                                fontFamily: "Inter, sans-serif",
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
                                backgroundColor: sevColors.bar,
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
                              marginBottom: "4px",
                            }}
                          >
                            Scale
                          </span>
                          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
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

                      {/* Zone 4: Opportunity Drivers */}
                      <div style={{ marginBottom: "16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#888"
                            strokeWidth="2"
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
                        <div
                          style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "10px" }}
                        >
                          {problem.rootCauses.map((cause, i) => (
                            <div
                              key={i}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                backgroundColor: colors.background,
                                borderRadius: "12px",
                                padding: isMobile ? "10px 12px" : "12px 14px",
                              }}
                            >
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
                                  fontSize: "13px",
                                  fontWeight: "600",
                                  fontFamily: "Inter, sans-serif",
                                  flexShrink: 0,
                                }}
                              >
                                {i + 1}
                              </span>
                              <div style={{ minWidth: 0 }}>
                                <div
                                  style={{
                                    fontFamily: "Inter, sans-serif",
                                    fontSize: isMobile ? "13px" : "14px",
                                    fontWeight: "600",
                                    color: colors.dark,
                                  }}
                                >
                                  {cause.title}
                                </div>
                                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#888" }}>
                                  {cause.description}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Zone 5: BRIDGE Solution Footer */}
                      <div
                        style={{
                          borderTop: `1px solid ${colors.line}`,
                          paddingTop: "16px",
                          display: "flex",
                          flexDirection: isMobile ? "column" : "row",
                          alignItems: isMobile ? "flex-start" : "center",
                          justifyContent: "space-between",
                          gap: isMobile ? "8px" : "16px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={colors.accent}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#888" }}>
                            BRIDGE Solution:
                          </span>
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "14px",
                              fontWeight: "600",
                              color: colors.primary,
                            }}
                          >
                            {problem.bridgeSolution}
                          </span>
                        </div>
                        <a
                          href="#solutions"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            fontFamily: "Inter, sans-serif",
                            fontSize: "13px",
                            fontWeight: "500",
                            color: colors.primary,
                            textDecoration: "none",
                            flexShrink: 0,
                          }}
                        >
                          View{" "}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </a>
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
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
            {enhancedPainPoints.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === 0 ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: i === 0 ? colors.accent : colors.line,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
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
// PREMIUM VALUE CHAIN SECTION — Pill Variant C (Lime Glow on dark bg)
// ============================================================================

const ValueChainSectionPremium = () => {
  const isMobile = useIsMobile();
  const [activeStage, setActiveStage] = useState(null);

  return (
    <section
      style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "100px 80px", position: "relative" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "60px" }}>
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
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
              color: colors.primary,
              margin: "0 0 20px 0",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            From Raw Material to <span style={{ color: colors.accent, fontWeight: "600" }}>Market Impact</span>
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
            Follow the manufacturing journey — and discover where strategic resources and innovation create compounding
            value at every stage
          </p>
        </div>

        {isMobile ? (
          /* ═══ MOBILE: Horizontal scroll cards ═══ */
          <>
            <div
              style={{
                display: "flex",
                gap: "12px",
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                margin: "0 -20px",
                padding: "0 20px 8px",
                alignItems: "flex-start",
              }}
            >
              {valueChainStages.map((stage, i) => {
                const isActive = activeStage === i;
                return (
                  <div
                    key={stage.id}
                    onClick={() => setActiveStage(isActive ? null : i)}
                    style={{
                      minWidth: "75%",
                      maxWidth: "75%",
                      flexShrink: 0,
                      scrollSnapAlign: "start",
                      backgroundColor: isActive ? colors.primary : colors.white,
                      border: `2px solid ${colors.primary}`,
                      borderRadius: "16px",
                      padding: "20px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "16px",
                        fontWeight: "600",
                        color: isActive ? colors.white : colors.dark,
                        margin: "0 0 4px 0",
                      }}
                    >
                      {stage.stage}
                    </h3>
                    <div
                      style={{
                        fontSize: "12px",
                        color: isActive ? "rgba(255,255,255,0.6)" : "#777",
                        fontFamily: "Inter, sans-serif",
                        marginBottom: "10px",
                      }}
                    >
                      {stage.actor}
                    </div>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: "700",
                        color: isActive ? colors.accent : colors.primary,
                        fontFamily: "Poppins, sans-serif",
                        marginBottom: isActive ? "14px" : "0",
                      }}
                    >
                      {stage.stat}
                    </div>
                    {isActive && (
                      <div
                        style={{ borderTop: `1px solid rgba(255,255,255,0.15)`, paddingTop: "12px", marginTop: "4px" }}
                      >
                        <div
                          style={{
                            fontSize: "10px",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            letterSpacing: "1.5px",
                            color: "rgba(255,255,255,0.5)",
                            fontFamily: "Inter, sans-serif",
                            marginBottom: "10px",
                          }}
                        >
                          Opportunity Areas
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          {stage.painPoints.map((point, pi) => (
                            <div
                              key={pi}
                              style={{
                                padding: "8px 12px",
                                backgroundColor: "rgba(255,255,255,0.1)",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "flex-start",
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
                                  marginTop: "5px",
                                }}
                              />
                              <span
                                style={{
                                  fontSize: "13px",
                                  color: colors.white,
                                  fontFamily: "Inter, sans-serif",
                                  lineHeight: "1.4",
                                }}
                              >
                                {point}
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
            {/* Mobile scroll dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "16px" }}>
              {valueChainStages.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: activeStage === i ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    backgroundColor: activeStage === i ? colors.accent : colors.line,
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveStage(activeStage === i ? null : i);
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          /* ═══ DESKTOP: Horizontal step cards ═══ */
          <div>
            {/* Step cards row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "12px" }}>
              {valueChainStages.map((stage, i) => {
                const isActive = activeStage === i;
                const isCollapsed = activeStage !== null && !isActive;
                return (
                  <div
                    key={stage.id}
                    onClick={() => setActiveStage(isActive ? null : i)}
                    style={{
                      backgroundColor: isActive ? colors.primary : colors.white,
                      border: `2px solid ${isActive ? colors.primary : colors.primary}`,
                      borderRadius: "16px",
                      padding: isCollapsed ? "16px 16px" : "24px 20px",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      minHeight: isCollapsed ? "auto" : "260px",
                      opacity: isCollapsed ? 0.5 : 1,
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: isCollapsed ? "15px" : "18px",
                        fontWeight: "600",
                        color: isActive ? colors.white : colors.dark,
                        margin: "0 0 6px 0",
                        lineHeight: "1.25",
                        minHeight: isCollapsed ? "auto" : "46px",
                      }}
                    >
                      {stage.stage}
                    </h3>
                    {!isCollapsed && (
                      <>
                        <div
                          style={{
                            fontSize: "13px",
                            color: isActive ? "rgba(255,255,255,0.6)" : "#777",
                            fontFamily: "Inter, sans-serif",
                            marginBottom: "16px",
                            minHeight: "40px",
                          }}
                        >
                          {stage.actor}
                        </div>
                        <div style={{ marginTop: "auto" }}>
                          <div
                            style={{
                              fontSize: "11px",
                              color: isActive ? "rgba(255,255,255,0.4)" : "#999",
                              fontFamily: "Inter, sans-serif",
                              marginBottom: "4px",
                            }}
                          >
                            Key Stat
                          </div>
                          <div
                            style={{
                              fontSize: "16px",
                              fontWeight: "700",
                              color: isActive ? colors.accent : colors.primary,
                              fontFamily: "Poppins, sans-serif",
                              lineHeight: "1.3",
                              minHeight: "21px",
                            }}
                          >
                            {stage.stat}
                          </div>
                        </div>
                        <div style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}>
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={isActive ? "rgba(255,255,255,0.4)" : "#ccc"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                              transform: isActive ? "rotate(180deg)" : "none",
                              transition: "transform 0.2s ease",
                            }}
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Expanded panel below cards — includes opportunity areas + value bar */}
            {activeStage !== null && (
              <div
                style={{
                  marginTop: "20px",
                  backgroundColor: colors.background,
                  border: `2px solid ${colors.primary}`,
                  borderRadius: "16px",
                  padding: "28px 32px",
                }}
              >
                {/* Header row */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                      color: colors.primary,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Opportunity Areas — {valueChainStages[activeStage].stage}
                  </span>
                  <span style={{ fontSize: "13px", color: "#999", fontFamily: "Inter, sans-serif" }}>
                    {valueChainStages[activeStage].population}
                  </span>
                </div>
                {/* Opportunity cards */}
                <div
                  style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "24px" }}
                >
                  {valueChainStages[activeStage].painPoints.map((point, pi) => (
                    <div
                      key={pi}
                      style={{
                        padding: "10px 16px",
                        backgroundColor: colors.white,
                        borderRadius: "10px",
                        border: `1px solid ${colors.line}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          color: colors.dark,
                          fontFamily: "Inter, sans-serif",
                          textAlign: "center",
                          lineHeight: "1.4",
                        }}
                      >
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Value Recapture Bar — inside same container */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: "#999",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    Value Recapture Potential
                  </span>
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      fontFamily: "Poppins, sans-serif",
                      color: colors.primary,
                    }}
                  >
                    70% <span style={{ fontSize: "14px", fontWeight: "500", color: "#999" }}>addressable</span>
                  </span>
                </div>
                <div
                  style={{
                    height: "10px",
                    backgroundColor: colors.white,
                    borderRadius: "5px",
                    overflow: "hidden",
                    border: `1px solid ${colors.line}`,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${valueChainStages[activeStage].valueRetained}%`,
                      backgroundColor: colors.accent,
                      borderRadius: "5px",
                      transition: "width 0.5s ease",
                    }}
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                  {valueChainStages.map((s, si) => (
                    <span
                      key={si}
                      style={{
                        fontSize: "11px",
                        color: si === activeStage ? colors.primary : "#bbb",
                        fontWeight: si === activeStage ? "700" : "400",
                        fontFamily: "Inter, sans-serif",
                        textAlign: "center",
                        flex: 1,
                        transition: "all 0.3s ease",
                      }}
                    >
                      {s.stage}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Value Recapture Bar — DEFAULT STATE (no card selected) */}
        {activeStage === null && !isMobile && (
          <div style={{ padding: "0 40px", marginTop: "48px" }}>
            <div
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: "#999",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Value Recapture Potential
              </span>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "700",
                  fontFamily: "Poppins, sans-serif",
                  color: colors.primary,
                }}
              >
                70% addressable
              </span>
            </div>
            <div
              style={{
                height: "12px",
                backgroundColor: colors.background,
                borderRadius: "6px",
                overflow: "hidden",
                border: `1px solid ${colors.line}`,
              }}
            >
              <div style={{ height: "100%", width: "70%", backgroundColor: colors.accent, borderRadius: "6px" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
              {valueChainStages.map((s, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "11px",
                    color: "#999",
                    fontFamily: "Inter, sans-serif",
                    textAlign: "center",
                    flex: 1,
                  }}
                >
                  {s.stage}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// ============================================================================
// SOLUTIONS SECTION — Pill Variant C (Lime Glow — on primary bg conceptually, but white bg here, use Variant A)
// ============================================================================

const SolutionsSection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [activeTier, setActiveTier] = useState(isMobile ? 1 : 0);
  const allFiltered = sector.solutions.filter((s) => activeTier === 0 || s.tier === activeTier);
  const filtered = activeTier === 0 ? allFiltered.slice(0, 9) : allFiltered;
  return (
    <section style={{ backgroundColor: colors.primary, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
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
            The Pathway to Impact
          </span>
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              lineHeight: "1.2",
              color: colors.white,
              margin: "0 0 20px 0",
              letterSpacing: "-0.5px",
              maxWidth: "900px",
            }}
          >
            Ventures That Build <span style={{ color: colors.accent, fontWeight: "600" }}>Lasting Value</span>
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "flex-end",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "16px" : "24px",
            }}
          >
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? "15px" : "16px",
                color: "rgba(255,255,255,0.6)",
                maxWidth: "580px",
                lineHeight: "1.65",
                margin: 0,
              }}
            >
              {sectorData.ventures} ventures across three implementation tiers — each one a bridge from insight to
              investment to measurable public benefit for Ghana's manufacturing sector.
            </p>
            <div
              style={{
                display: "inline-flex",
                gap: "4px",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "50px",
                padding: "3px",
                flexShrink: 0,
              }}
            >
              {[
                { id: 0, label: "All" },
                { id: 1, label: "Flagship" },
                { id: 2, label: "Growth" },
                { id: 3, label: "Emerging" },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTier(t.id)}
                  style={{
                    padding: isMobile ? "6px 14px" : "8px 18px",
                    borderRadius: "50px",
                    border: "none",
                    backgroundColor: activeTier === t.id ? colors.accent : "transparent",
                    color: activeTier === t.id ? colors.primary : "rgba(255,255,255,0.6)",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {t.label}
                </button>
              ))}
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
                  gap: "16px",
                  maxWidth: "1200px",
                  margin: "0 auto",
                  minHeight: "360px",
                }
          }
        >
          {filtered.map((sol, i) => {
            const tierLabel = sol.tier === 1 ? "Flagship" : sol.tier === 2 ? "Growth" : "Emerging";
            const tierBg =
              sol.tier === 1 ? colors.accentLight : sol.tier === 2 ? "rgba(27,77,62,0.08)" : "rgba(27,77,62,0.04)";
            return (
              <div
                key={`${sol.name}-${i}`}
                style={{
                  backgroundColor: colors.white,
                  borderRadius: isMobile ? "16px" : "16px",
                  padding: isMobile ? "24px" : "24px",
                  border: `1px solid ${colors.line}`,
                  display: "flex",
                  flexDirection: "column",
                  ...(isMobile ? { minWidth: "80%", maxWidth: "80%", flexShrink: 0, scrollSnapAlign: "start" } : {}),
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "14px",
                  }}
                >
                  <span
                    style={{
                      backgroundColor: tierBg,
                      color: colors.primary,
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "10px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {tierLabel}
                  </span>
                  <span
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: isMobile ? "15px" : "15px",
                      fontWeight: "700",
                      color: colors.primary,
                    }}
                  >
                    {sol.capital}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: isMobile ? "15px" : "15px",
                    fontWeight: "600",
                    color: colors.dark,
                    margin: "0 0 8px 0",
                    minHeight: isMobile ? "auto" : "38px",
                    lineHeight: "1.3",
                  }}
                >
                  {sol.name}
                </h3>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    lineHeight: "1.55",
                    color: "#666",
                    margin: "0 0 14px 0",
                    minHeight: isMobile ? "auto" : "82px",
                    flex: 1,
                  }}
                >
                  {sol.description}
                </p>
                <div
                  style={{
                    padding: "10px 12px",
                    backgroundColor: colors.background,
                    borderRadius: "8px",
                    border: `1px solid ${colors.line}`,
                  }}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: "#999",
                      fontFamily: "Inter, sans-serif",
                      marginBottom: "2px",
                    }}
                  >
                    Impact
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "600",
                      color: colors.primary,
                      fontFamily: "Inter, sans-serif",
                      minHeight: "16px",
                    }}
                  >
                    {sol.impact}
                  </div>
                </div>
                <div style={{ marginTop: "10px", height: "3px", backgroundColor: colors.line, borderRadius: "2px" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${(sol.score / 41) * 100}%`,
                      backgroundColor: colors.accent,
                      borderRadius: "2px",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#999",
                    fontFamily: "Inter, sans-serif",
                    marginTop: "2px",
                    textAlign: "right",
                  }}
                >
                  Score: {sol.score}/41
                </div>
              </div>
            );
          })}
        </div>
        {isMobile && (
          <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "16px" }}>
            {filtered.map((_, i) => (
              <div
                key={i}
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: i === 0 ? colors.white : "rgba(255,255,255,0.3)",
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
// COMPETITIVE LANDSCAPE SECTION — Pill Variant A (Bordered on light bg)
// ============================================================================

const AllyCard = ({ allies, isMobile }) => {
  const [idx, setIdx] = useState(0);
  const c = allies[idx];
  const RatingDots = ({ rating }) => (
    <div style={{ display: "flex", gap: "4px" }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <div
          key={n}
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: n <= rating ? colors.accent : "rgba(255,255,255,0.15)",
          }}
        />
      ))}
    </div>
  );
  return (
    <div
      style={{
        backgroundColor: colors.primary,
        borderRadius: isMobile ? "16px" : "24px",
        padding: isMobile ? "24px" : "40px",
        color: colors.white,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: isMobile ? "20px" : "32px",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              color: colors.accent,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Institutional Profile
          </span>
          <h3
            style={{
              fontSize: isMobile ? "22px" : "28px",
              fontWeight: "600",
              color: colors.white,
              fontFamily: "Inter, sans-serif",
              margin: "8px 0 0 0",
            }}
          >
            {c.name}
          </h3>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setIdx((idx - 1 + allies.length) % allies.length)}
            style={{
              width: isMobile ? "36px" : "40px",
              height: isMobile ? "36px" : "40px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "none",
              color: colors.white,
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            ←
          </button>
          <button
            onClick={() => setIdx((idx + 1) % allies.length)}
            style={{
              width: isMobile ? "36px" : "40px",
              height: isMobile ? "36px" : "40px",
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "none",
              color: colors.white,
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            →
          </button>
        </div>
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "20px" : "32px" }}
      >
        <div>
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.5)",
                fontFamily: "Inter, sans-serif",
                marginBottom: "4px",
              }}
            >
              Focus
            </div>
            <div style={{ fontSize: "15px", color: colors.white, fontFamily: "Inter, sans-serif" }}>{c.focus}</div>
          </div>
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                fontSize: "13px",
                color: "rgba(255,255,255,0.5)",
                fontFamily: "Inter, sans-serif",
                marginBottom: "4px",
              }}
            >
              Collaboration Area
            </div>
            <div style={{ fontSize: "15px", color: colors.accent, fontFamily: "Inter, sans-serif" }}>
              {c.collaboration}
            </div>
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            <div>
              <div
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "Inter, sans-serif",
                  marginBottom: "4px",
                }}
              >
                Founded
              </div>
              <div style={{ fontSize: "15px", color: colors.white, fontFamily: "Inter, sans-serif" }}>{c.year}</div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "Inter, sans-serif",
                  marginBottom: "4px",
                }}
              >
                Funding
              </div>
              <div style={{ fontSize: "15px", color: colors.white, fontFamily: "Inter, sans-serif" }}>{c.funding}</div>
            </div>
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: "13px",
              fontWeight: "600",
              color: "rgba(255,255,255,0.5)",
              fontFamily: "Inter, sans-serif",
              marginBottom: "16px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Strengths
          </div>
          {c.strengths.map((s, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: i < c.strengths.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
              }}
            >
              <span style={{ fontSize: "14px", color: colors.white, fontFamily: "Inter, sans-serif" }}>{s.name}</span>
              <RatingDots rating={s.rating} />
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          marginTop: isMobile ? "20px" : "28px",
          padding: isMobile ? "16px" : "20px",
          backgroundColor: "rgba(184, 217, 53, 0.1)",
          borderRadius: "14px",
          border: "1px solid rgba(184, 217, 53, 0.2)",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            color: colors.accent,
            fontFamily: "Inter, sans-serif",
            marginBottom: "8px",
          }}
        >
          Where BRIDGE Complements
        </div>
        <div
          style={{
            fontSize: isMobile ? "14px" : "15px",
            color: colors.white,
            fontFamily: "Inter, sans-serif",
            lineHeight: "1.5",
          }}
        >
          {c.bridgeOpportunity}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "24px" }}>
        {allies.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            style={{
              width: idx === i ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              backgroundColor: idx === i ? colors.accent : "rgba(255,255,255,0.2)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
};

const EcosystemSection = ({ sector }) => {
  const isMobile = useIsMobile();
  return (
    <section style={{ backgroundColor: colors.background, padding: isMobile ? "60px 20px" : "100px 80px" }}>
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
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: "24px",
          }}
        >
          The Landscape
        </span>
        <h2
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: isMobile ? "28px" : "42px",
            fontWeight: "300",
            lineHeight: "1.2",
            color: colors.primary,
            margin: "0 0 20px 0",
            letterSpacing: "-0.5px",
          }}
        >
          Building With Ghana's <span style={{ color: colors.accent, fontWeight: "600" }}>Strongest Institutions</span>
        </h2>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: isMobile ? "15px" : "16px",
            color: "#666",
            maxWidth: "750px",
            lineHeight: "1.65",
          }}
        >
          Combining strengths, aligning resources, and creating shared value with the institutions already shaping
          Ghana's industrial landscape.
        </p>
      </div>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <AllyCard allies={sector.allies} isMobile={isMobile} />
      </div>
    </section>
  );
};

// ============================================================================
// GOVERNANCE & POLICY SECTION — Horizontal Scroll Cards (Production Handoff)
// ============================================================================

const governancePolicies = [
  {
    policy: "24-Hour Economy Policy",
    body: "Office of the President",
    allocation: "Flagship Initiative",
    category: "infrastructure",
    alignment:
      "The Make24 pillar specifically targets manufacturing revitalization through three-shift working models and industrial incentive packages.",
    bridgeRole:
      "BRIDGE aligns manufacturing ventures with shift incentives, nighttime tariff reductions, and enhanced security for 24-hour operations.",
    bridgeVentures: ["Agro-Processing Hub", "Packaged Foods Company"],
    pillars: ["Make24", "Tax Incentives"],
  },
  {
    policy: "Textile Industry Revival",
    body: "Ministry of Trade & Industry",
    allocation: "$2B by 2033",
    category: "funding",
    alignment:
      "Government strategy to rebuild the textile sector to $2 billion by 2033, with focus on traditional fabrics and export market channels.",
    bridgeRole:
      "Textile ventures directly support the scaling strategy with diaspora market connections and quality certification pathway access.",
    bridgeVentures: ["Textile & Garment Factory", "Quality Certification Hub"],
    pillars: ["Scale Capacity", "Export Channels"],
  },
  {
    policy: "AfCFTA Implementation",
    body: "AfCFTA Secretariat, Accra",
    allocation: "1.4B Market Access",
    category: "partnerships",
    alignment:
      "With AfCFTA headquarters in Accra, Ghana has both symbolic and practical advantages for continental manufacturing trade access.",
    bridgeRole:
      "Manufacturing portfolio positioned for first-mover advantage in continental market access and regional value chain integration.",
    bridgeVentures: ["Regional Export Platform", "Building Materials Plant"],
    pillars: ["Preferential Access", "Standards Harmonization"],
  },
  {
    policy: "Ghana Free Zones Regime",
    body: "Ghana Free Zones Authority (GFZA)",
    allocation: "500+ Enterprises",
    category: "tax",
    alignment:
      "GFZA provides 100% duty exemption on production imports and corporate tax holidays for qualifying export-oriented manufacturers.",
    bridgeRole:
      "Free zone incentive access for export-oriented ventures, enabling duty-free raw material import and competitive production costs.",
    bridgeVentures: ["Agro-Processing Hub", "Electronics Assembly"],
    pillars: ["Duty Exemptions", "Tax Holidays"],
  },
  {
    policy: "1D1F Program",
    body: "Ministry of Trade & Industry",
    allocation: "126+ Operational",
    category: "infrastructure",
    alignment:
      "One District One Factory has established 126+ operational factories that still need technical support, market linkages, and scaling.",
    bridgeRole:
      "Technical support, quality certification, and market linkage services for existing 1D1F factories seeking to reach full scale.",
    bridgeVentures: ["Quality Certification Hub", "Manufacturing Skills Academy"],
    pillars: ["Operationalization", "Technical Assistance"],
  },
  {
    policy: "Development Bank Ghana",
    body: "Development Bank Ghana (DBG)",
    allocation: "Gov Capitalized",
    category: "funding",
    alignment:
      "National development bank designating manufacturing as a priority sector, providing favorable terms for SME lending and equipment.",
    bridgeRole:
      "Co-design of manufacturing working capital facility with DBG, enabling equipment leasing and inventory financing for SMEs.",
    bridgeVentures: ["Building Materials Plant", "Industrial Chemicals Plant"],
    pillars: ["SME Lending", "Equipment Financing"],
  },
  {
    policy: "Skills Development Fund",
    body: "Council for TVET",
    allocation: "Annual Allocation",
    category: "partnerships",
    alignment:
      "National TVET reform creating demand-driven technical training aligned with manufacturing workforce needs and industry standards.",
    bridgeRole:
      "Manufacturing Skills Academy feeds TVET reform pipeline with industry-defined curriculum and portable credential frameworks.",
    bridgeVentures: ["Manufacturing Skills Academy", "Pharmaceutical Expansion"],
    pillars: ["Demand-Driven Training", "Portable Credentials"],
  },
  {
    policy: "Ghana Standards Authority",
    body: "Ghana Standards Authority (GSA)",
    allocation: "Tax Credits",
    category: "tax",
    alignment:
      "GSA provides tax credits and expedited certification for manufacturers meeting national quality standards and export readiness.",
    bridgeRole:
      "Quality Certification Hub leverages GSA framework to provide accelerated and subsidized certification for SME manufacturers.",
    bridgeVentures: ["Quality Certification Hub", "Regional Export Platform"],
    pillars: ["Quality Tax Credits", "Export Certification"],
  },
  {
    policy: "National Industrial Revitalization",
    body: "Ministry of Trade & Industry",
    allocation: "Multi-Year Plan",
    category: "infrastructure",
    alignment:
      "National strategy to revive dormant factories and establish new industrial parks with modern infrastructure and utilities access.",
    bridgeRole:
      "BRIDGE provides technical feasibility studies, factory revival blueprints, and operational management for industrial park ventures.",
    bridgeVentures: ["Agro-Processing Hub", "Building Materials Plant"],
    pillars: ["Factory Revival", "Industrial Parks"],
  },
  {
    policy: "EXIM Bank Ghana",
    body: "Ghana Export-Import Bank",
    allocation: "Export Financing",
    category: "funding",
    alignment:
      "Dedicated export financing facility supporting manufacturers with trade credit, guarantees, and pre-shipment working capital lines.",
    bridgeRole:
      "BRIDGE connects export-ready ventures with EXIM trade finance products, reducing working capital barriers for market entry.",
    bridgeVentures: ["Regional Export Platform", "Shea Value Addition"],
    pillars: ["Trade Credit", "Pre-Shipment Finance"],
  },
  {
    policy: "Ghana Investment Promotion",
    body: "GIPC",
    allocation: "FDI Facilitation",
    category: "partnerships",
    alignment:
      "GIPC facilitates foreign direct investment into manufacturing with streamlined registration, incentive packages, and investor matching.",
    bridgeRole:
      "BRIDGE positions as a co-investment platform connecting GIPC-registered investors with vetted manufacturing venture opportunities.",
    bridgeVentures: ["Electronics Assembly", "Textile & Garment Factory"],
    pillars: ["Investor Matching", "Joint Ventures"],
  },
  {
    policy: "Special Import Duty Regime",
    body: "Ministry of Finance",
    allocation: "Tariff Protection",
    category: "tax",
    alignment:
      "Protective tariffs on select manufactured goods incentivizing domestic production over imports in priority industrial subsectors.",
    bridgeRole:
      "BRIDGE ventures in protected subsectors benefit from import duty advantages that improve domestic price competitiveness.",
    bridgeVentures: ["Packaged Foods Company", "Personal Care Products"],
    pillars: ["Import Protection", "Local Preference"],
  },
];

const govCategories = [
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

const PolicyAlignmentSection = () => {
  const isMobile = useIsMobile();
  const [activeGovCat, setActiveGovCat] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);
  const filtered =
    activeGovCat === "all" ? governancePolicies : governancePolicies.filter((p) => p.category === activeGovCat);

  return (
    <section style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        <div style={{ marginBottom: isMobile ? "32px" : "48px", textAlign: "center" }}>
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
              fontFamily: "'DM Sans', sans-serif",
              marginBottom: "24px",
            }}
          >
            The Governance & Policy
          </span>
          <h2
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              lineHeight: "1.2",
              color: colors.primary,
              margin: "0 0 20px 0",
              letterSpacing: "-0.5px",
              maxWidth: "900px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Moving in Step with Ghana's{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Industrial Ambition</span>
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "16px",
              color: "#555",
              maxWidth: "750px",
              lineHeight: "1.65",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            BRIDGE's manufacturing ventures align directly with Ghana's flagship industrial policies, the 24-Hour
            Economy, and AfCFTA positioning — creating pathways for public-private collaboration.
          </p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: isMobile ? "4px" : "8px",
                border: `1px solid ${colors.line}`,
                borderRadius: "50px",
                padding: isMobile ? "4px" : "5px",
                backgroundColor: colors.white,
              }}
            >
              {govCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveGovCat(cat.id);
                    setExpandedCard(null);
                  }}
                  style={{
                    padding: isMobile ? "5px 8px" : "6px 14px",
                    borderRadius: "50px",
                    cursor: "pointer",
                    backgroundColor: activeGovCat === cat.id ? colors.accentLight : "transparent",
                    color: activeGovCat === cat.id ? colors.primary : "#999",
                    border: activeGovCat === cat.id ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: isMobile ? "10px" : "12px",
                    fontWeight: activeGovCat === cat.id ? "700" : "500",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <style>{`.policy-scroll::-webkit-scrollbar{height:6px}.policy-scroll::-webkit-scrollbar-track{background:#F3F5F2;border-radius:3px}.policy-scroll::-webkit-scrollbar-thumb{background:#E5E5E5;border-radius:3px}.policy-scroll::-webkit-scrollbar-thumb:hover{background:#ccc}`}</style>
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
                  padding: "0 20px 12px",
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
                }
          }
        >
          {filtered.map((p, i) => {
            const isExp = expandedCard === i;
            const isCollapsed = expandedCard !== null && !isExp;
            const badge = catBadgeStyles[p.category];
            return (
              <div
                key={i}
                onClick={() => setExpandedCard(isExp ? null : i)}
                style={
                  isMobile
                    ? {
                        minWidth: "85%",
                        maxWidth: "85%",
                        flexShrink: 0,
                        scrollSnapAlign: "start",
                        backgroundColor: colors.background,
                        border: `2px solid ${isExp ? colors.accent : colors.line}`,
                        borderRadius: "16px",
                        padding: isExp ? "24px" : "20px",
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                      }
                    : {
                        minWidth: "260px",
                        maxWidth: "260px",
                        backgroundColor: colors.background,
                        border: `2px solid ${isExp ? colors.accent : colors.line}`,
                        borderRadius: "16px",
                        padding: "24px",
                        flexShrink: 0,
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        transition: "all 0.3s ease",
                      }
                }
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
                      color: colors.primary,
                      padding: "3px 10px",
                      borderRadius: "20px",
                      fontSize: "9px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {p.category}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "15px",
                    fontWeight: "700",
                    color: colors.primary,
                    margin: "0 0 8px 0",
                    minHeight: "38px",
                    lineHeight: "1.3",
                  }}
                >
                  {p.policy}
                </h3>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    fontWeight: "700",
                    color: colors.accent,
                    marginBottom: "8px",
                  }}
                >
                  {p.allocation}
                </div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    color: "#666",
                    lineHeight: "1.5",
                    margin: "0 0 12px 0",
                    minHeight: "60px",
                  }}
                >
                  {p.alignment}
                </p>
                {!isExp && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginTop: "auto",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: colors.primary,
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    BRIDGE alignment{" "}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={colors.primary}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                )}
                {isExp && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: colors.primary,
                      fontFamily: "'DM Sans', sans-serif",
                      marginBottom: "12px",
                    }}
                  >
                    BRIDGE alignment{" "}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={colors.primary}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  </div>
                )}
                {isExp && (
                  <div style={{ borderTop: `1px solid ${colors.line}`, paddingTop: "12px", marginTop: "4px" }}>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#888",
                        fontFamily: "'DM Sans', sans-serif",
                        marginBottom: "6px",
                      }}
                    >
                      {p.body}
                    </div>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#444",
                        fontFamily: "'DM Sans', sans-serif",
                        lineHeight: "1.5",
                        margin: "0 0 10px 0",
                      }}
                    >
                      {p.bridgeRole}
                    </p>
                    {p.pillars && (
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "10px" }}>
                        {p.pillars.map((pill, pi) => (
                          <span
                            key={pi}
                            style={{
                              backgroundColor: colors.accentLight,
                              color: colors.primary,
                              padding: "4px 10px",
                              borderRadius: "20px",
                              fontSize: "10px",
                              fontWeight: "600",
                              fontFamily: "'DM Sans', sans-serif",
                            }}
                          >
                            {pill}
                          </span>
                        ))}
                      </div>
                    )}
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {p.bridgeVentures.map((v, vi) => (
                        <div
                          key={vi}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "8px 12px",
                            backgroundColor: colors.primary,
                            borderRadius: "8px",
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
                              fontSize: "12px",
                              fontWeight: "600",
                              color: colors.white,
                              fontFamily: "'DM Sans', sans-serif",
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

        {isMobile && (
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
            {filtered.map((_, i) => (
              <div
                key={i}
                style={{
                  width: expandedCard === i ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: expandedCard === i ? colors.accent : colors.line,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onClick={() => setExpandedCard(expandedCard === i ? null : i)}
              />
            ))}
          </div>
        )}
        <div
          style={{
            backgroundColor: colors.primary,
            borderRadius: "16px",
            padding: isMobile ? "24px" : "28px 32px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "center" : "center",
            gap: "16px",
            textAlign: isMobile ? "center" : "left",
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
              padding: "14px 32px",
              borderRadius: "50px",
              fontSize: "14px",
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
// IMPACT SECTION — Dual-Lens Dashboard (By Metric / By Stakeholder)
// ============================================================================

const useCounter = (target, duration = 1200, active = true) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    const num = typeof target === "number" ? target : parseFloat(target);
    if (isNaN(num)) {
      setCount(0);
      return;
    }
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(ease * num);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return count;
};

const formatMetric = (count, item) => {
  const p = item.prefix || "";
  const s = item.suffix || "";
  if (item.value >= 1000) return `${p}${Math.round(count).toLocaleString()}${s}`;
  if (item.value % 1 !== 0) return `${p}${count.toFixed(1)}${s}`;
  return `${p}${Math.round(count)}${s}`;
};

const impactMetrics = [
  {
    category: "Economic",
    items: [
      {
        label: "Manufacturing GDP Share",
        value: 7.8,
        suffix: "%",
        prefix: "",
        description: "Current manufacturing GDP contribution with major room for growth",
        trend: "Baseline",
        ventures: "Full Portfolio (All Ventures)",
      },
      {
        label: "Annual SME Finance Gap",
        value: 500,
        suffix: "M+",
        prefix: "$",
        description: "Addressable manufacturing credit opportunity for SME producers",
        trend: "Critical",
        ventures: "Working Capital · Equipment Lease",
      },
      {
        label: "AfCFTA Consumer Market",
        value: 1.4,
        suffix: "B",
        prefix: "",
        description: "Continental market accessible via Accra-based trade secretariat",
        trend: "Growing",
        ventures: "Regional Export · Certification",
      },
      {
        label: "Development Leverage",
        value: 3,
        suffix: "-5x",
        prefix: "",
        description: "Each dollar generates $3-5x in local manufacturing GDP impact",
        trend: "Multiplier",
        ventures: "Full Portfolio (All Ventures)",
      },
    ],
  },
  {
    category: "People",
    items: [
      {
        label: "Manufacturing Workforce",
        value: 2,
        suffix: "M+",
        prefix: "",
        description: "Workers across formal and informal manufacturing supply chains",
        trend: "Baseline",
        ventures: "Skills Academy · Full Portfolio",
      },
      {
        label: "Direct Jobs Created",
        value: 2000,
        suffix: "+",
        prefix: "",
        description: "New manufacturing employment in production and management roles",
        trend: "Target",
        ventures: "Agro-Processing · Building Mats",
      },
      {
        label: "Workers to Formalize",
        value: 1.5,
        suffix: "M+",
        prefix: "",
        description: "Informal workforce ready for skills certification and careers",
        trend: "High priority",
        ventures: "Skills Academy · Certification",
      },
      {
        label: "SMEs Formalized",
        value: 500,
        suffix: "+",
        prefix: "",
        description: "Informal manufacturers transitioning to quality certifications",
        trend: "Target",
        ventures: "Certification · Working Capital",
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
        description: "Blended returns across all ventures with risk-adjusted models",
        trend: "Target range",
        ventures: "Full Portfolio (All Ventures)",
      },
      {
        label: "Tier 1 Returns",
        value: 15,
        suffix: "-22%",
        prefix: "",
        description: "Agro-processing, building materials, and packaged food returns",
        trend: "High priority",
        ventures: "Agro-Processing · Shea · Foods",
      },
      {
        label: "First Revenue",
        value: 18,
        suffix: "-24mo",
        prefix: "",
        description: "Timeline to initial cash generation from flagship tier ventures",
        trend: "Near-term",
        ventures: "Agro-Processing · Building Mats",
      },
      {
        label: "Capital Deployed",
        value: 15,
        suffix: "-30M",
        prefix: "$",
        description: "Total investment range across the full manufacturing portfolio",
        trend: "Phased",
        ventures: "Full Portfolio (All Ventures)",
      },
    ],
  },
];

const impactStakeholders = [
  {
    title: "The Manufacturer",
    subtitle: "Factory owners, artisans & producers",
    outcomes: [
      "Access to purpose-built manufacturing finance and equipment leasing",
      "Shared certification services reducing ISO/HACCP costs by 60-80%",
      "Solar hybrid solutions cutting energy costs by 30-40%",
      "AfCFTA market access through export readiness programs",
    ],
    stat: "600K+",
    statLabel: "SME manufacturers",
    highlight: "Shared services reduce barriers to formalization",
  },
  {
    title: "The Institution",
    subtitle: "Industry associations & training centers",
    outcomes: [
      "Industry-defined TVET curriculum with portable credentials",
      "Quality certification pipeline for member manufacturers",
      "Technical assistance programs for 1D1F factory operations",
      "Research partnerships on manufacturing competitiveness data",
    ],
    stat: "1,200+",
    statLabel: "AGI member firms",
    highlight: "Training aligned to actual employer demand",
  },
  {
    title: "The Government",
    subtitle: "Ministries & development agencies",
    outcomes: [
      "Private-sector delivery of 24-Hour Economy manufacturing targets",
      "Import substitution progress reducing trade deficit pressure",
      "Job creation and tax base expansion without fiscal burden",
      "Free zone utilization and 1D1F operationalization support",
    ],
    stat: "95%",
    statLabel: "private capital",
    highlight: "Industrial growth at no fiscal cost",
  },
  {
    title: "The Investor",
    subtitle: "Impact & institutional capital",
    outcomes: [
      "Asset-backed manufacturing investments with equipment collateral",
      "Transparent governance with quarterly impact reporting",
      "First-mover AfCFTA geographic replication opportunities",
      "Blended returns combining financial and development outcomes",
    ],
    stat: "10-18%",
    statLabel: "target portfolio IRR",
    highlight: "Physical assets de-risk capital deployment",
  },
];

const MetricRow = ({ item, index, animate, isMobile, darkMode }) => {
  const count = useCounter(item.value, 1200, animate);
  const isEven = index % 2 === 0;
  return (
    <div
      style={{
        padding: isMobile ? "16px 20px" : "20px 28px",
        backgroundColor: darkMode
          ? isEven
            ? "rgba(255,255,255,0.05)"
            : "transparent"
          : isEven
            ? colors.white
            : "transparent",
        opacity: animate ? 1 : 0,
        transition: `opacity 0.4s ease ${index * 80}ms`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: isMobile ? "24px" : "32px",
              fontWeight: "700",
              color: darkMode ? colors.white : colors.primary,
              letterSpacing: "-1px",
              lineHeight: "1.1",
            }}
          >
            {formatMetric(count, item)}
          </div>
          <div
            style={{
              fontSize: "10px",
              fontWeight: "700",
              color: colors.accent,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {item.trend}
          </div>
        </div>
        <div
          style={{
            fontSize: "11px",
            fontWeight: "500",
            color: darkMode ? colors.accent : colors.primary,
            fontFamily: "'DM Sans', sans-serif",
            whiteSpace: "nowrap",
            textAlign: "right",
          }}
        >
          {item.ventures}
        </div>
      </div>
      <div
        style={{
          fontSize: isMobile ? "14px" : "15px",
          fontWeight: "700",
          color: darkMode ? colors.white : colors.primary,
          fontFamily: "'DM Sans', sans-serif",
          marginBottom: "2px",
        }}
      >
        {item.label}
      </div>
      <div
        style={{
          fontSize: "13px",
          color: darkMode ? "rgba(255,255,255,0.55)" : "#666",
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: "1.5",
        }}
      >
        {item.description}
      </div>
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
  const switchView = (v) => {
    setView(v);
    triggerAnimate();
  };
  const switchCategory = (i) => {
    setActiveCategory(i);
    triggerAnimate();
  };

  const stk = impactStakeholders[activeStakeholder];

  return (
    <section style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "80px 32px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Pill */}
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
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: "24px",
          }}
        >
          The Impact
        </span>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: isMobile ? "28px" : "42px",
            fontWeight: "300",
            lineHeight: "1.2",
            color: colors.primary,
            margin: "0 0 12px 0",
            letterSpacing: "-0.5px",
            maxWidth: "820px",
          }}
        >
          What Changes When <span style={{ fontWeight: "600" }}>Local</span>
          <br />
          <span style={{ fontWeight: "600" }}>Manufacturing</span>{" "}
          <span style={{ fontWeight: "600", color: colors.accent }}>Works</span>
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: isMobile ? "15px" : "16px",
            color: "#555",
            lineHeight: "1.7",
            maxWidth: "750px",
            margin: "0 0 40px 0",
          }}
        >
          When factories process raw materials domestically, import substitution creates local value, and industrial
          skills develop — the ripple effects build self-sufficiency, create quality jobs, and strengthen Ghana's
          economic sovereignty.
        </p>

        {/* Controls Bar — Outlined pill container, left-aligned */}
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
            {/* View Toggle Switch */}
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
                    padding: isMobile ? "5px 10px" : "6px 14px",
                    fontSize: isMobile ? "11px" : "12px",
                    backgroundColor: view === v ? colors.white : "transparent",
                    color: view === v ? colors.primary : "#999",
                    fontWeight: view === v ? "700" : "500",
                    borderRadius: "50px",
                    boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "Inter, sans-serif",
                    transition: "all 0.2s ease",
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
                    onClick={() => switchCategory(i)}
                    style={{
                      padding: isMobile ? "5px 8px" : "6px 14px",
                      fontSize: isMobile ? "10px" : "12px",
                      backgroundColor: activeCategory === i ? colors.accentLight : "transparent",
                      color: activeCategory === i ? colors.primary : "#999",
                      fontWeight: activeCategory === i ? "700" : "500",
                      border: activeCategory === i ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                      borderRadius: "50px",
                      cursor: "pointer",
                      fontFamily: "Inter, sans-serif",
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
                    onClick={() => setActiveStakeholder(i)}
                    style={{
                      padding: isMobile ? "5px 8px" : "6px 14px",
                      fontSize: isMobile ? "10px" : "12px",
                      backgroundColor: activeStakeholder === i ? colors.accentLight : "transparent",
                      color: activeStakeholder === i ? colors.primary : "#999",
                      fontWeight: activeStakeholder === i ? "700" : "500",
                      border: activeStakeholder === i ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                      borderRadius: "50px",
                      cursor: "pointer",
                      fontFamily: "Inter, sans-serif",
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

        {/* Content Area */}
        {view === "metrics" ? (
          <div
            style={{
              backgroundColor: colors.background,
              borderRadius: isMobile ? "16px" : "20px",
              border: `2px solid ${colors.primary}`,
              overflow: "hidden",
            }}
          >
            {impactMetrics[activeCategory].items.map((item, i) => (
              <MetricRow key={`${activeCategory}-${i}`} item={item} index={i} animate={animate} isMobile={isMobile} darkMode={false} />
            ))}
          </div>
        ) : (
          <div>
            {/* Title + Stat header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "24px",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "12px" : "0",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: isMobile ? "24px" : "28px",
                    fontWeight: "700",
                    color: colors.primary,
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {stk.title}
                </div>
                <div style={{ fontSize: "14px", color: "#888", fontFamily: "'DM Sans', sans-serif" }}>
                  {stk.subtitle}
                </div>
              </div>
              <div
                style={{
                  textAlign: isMobile ? "left" : "right",
                  display: "flex",
                  alignItems: isMobile ? "center" : "flex-start",
                  gap: isMobile ? "8px" : "0",
                  flexDirection: isMobile ? "row" : "column",
                }}
              >
                <div
                  style={{
                    fontSize: isMobile ? "32px" : "40px",
                    fontWeight: "700",
                    color: colors.primary,
                    fontFamily: "'Poppins', sans-serif",
                    letterSpacing: "-1.5px",
                    lineHeight: "1",
                  }}
                >
                  {stk.stat}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#888",
                    fontFamily: "'DM Sans', sans-serif",
                    marginTop: isMobile ? "0" : "4px",
                  }}
                >
                  {stk.statLabel}
                </div>
              </div>
            </div>

            {/* Outcome Rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {stk.outcomes.map((outcome, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "12px" : "16px",
                    padding: isMobile ? "12px 16px" : "14px 20px",
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
                      backgroundColor: i % 2 === 0 ? colors.white : colors.background,
                      flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "700",
                        color: colors.primary,
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: isMobile ? "14px" : "15px",
                      color: "#333",
                      fontFamily: "'DM Sans', sans-serif",
                      lineHeight: "1.5",
                    }}
                  >
                    {outcome}
                  </span>
                </div>
              ))}
            </div>

            {/* Key Advantage Strip */}
            <div
              style={{
                marginTop: "24px",
                padding: isMobile ? "14px 18px" : "16px 24px",
                backgroundColor: colors.primary,
                borderRadius: "12px",
                display: "flex",
                alignItems: isMobile ? "flex-start" : "center",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "8px" : "0",
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
                Key Advantage
              </span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "'DM Sans', sans-serif",
                  marginLeft: isMobile ? "0" : "16px",
                }}
              >
                {stk.highlight}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// ============================================================================
// COMPETITIVE LANDSCAPE SECTION — Split-Panel Analysis
// ============================================================================

function CompetitorAnalysisCard({ competitors, currentIndex, setCurrentIndex, hiddenNav, isMobile }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const c = competitors[currentIndex];
  return (
    <div
      style={{
        backgroundColor: colors.white,
        borderRadius: "20px",
        border: `1px solid ${colors.line}`,
        padding: isMobile ? "24px" : "28px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
        <h3
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "18px",
            fontWeight: "600",
            color: colors.dark,
            margin: 0,
            lineHeight: "1.3",
          }}
        >
          {c.name}
        </h3>
        <span
          style={{
            backgroundColor: c.priority === "High" ? colors.accentLight : "#F5F5F5",
            color: c.priority === "High" ? colors.primary : "#888",
            padding: "4px 12px",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: "700",
            textTransform: "uppercase",
            fontFamily: "Inter, sans-serif",
            flexShrink: 0,
            marginLeft: "12px",
          }}
        >
          {c.priority}
        </span>
      </div>
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "14px",
          color: "#666",
          lineHeight: "1.5",
          margin: "0 0 20px 0",
        }}
      >
        {c.focus}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
        {c.strengths.map((s, si) => (
          <div key={si} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#666", whiteSpace: "nowrap" }}>
              {s.name}
            </span>
            <div style={{ display: "flex", gap: "3px" }}>
              {[1, 2, 3, 4, 5].map((v) => (
                <div
                  key={v}
                  style={{
                    width: "16px",
                    height: "6px",
                    borderRadius: "3px",
                    backgroundColor: v <= s.rating ? colors.accent : colors.line,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {isExpanded && (
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              fontSize: "10px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              color: "#888",
              fontFamily: "Inter, sans-serif",
              marginBottom: "10px",
            }}
          >
            Where BRIDGE Helps
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" }}>
            {c.gaps.map((g, gi) => (
              <div
                key={gi}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                  fontFamily: "Inter, sans-serif",
                  color: "#555",
                }}
              >
                <span style={{ color: colors.accent, flexShrink: 0 }}>{"\u2192"}</span>
                {g}
              </div>
            ))}
          </div>
          <div
            style={{
              backgroundColor: colors.accentLight,
              border: `1px solid ${colors.accent}`,
              borderRadius: "12px",
              padding: "14px 16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: colors.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: "10px", fontWeight: "700", color: colors.primary }}>{"\u2726"}</span>
              </div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  color: colors.primary,
                  fontFamily: "Inter, sans-serif",
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
                margin: 0,
                lineHeight: "1.5",
              }}
            >
              {c.bridgeOpportunity}
            </p>
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: `1px solid ${colors.line}`,
          paddingTop: "16px",
          marginTop: "auto",
        }}
      >
        {!hiddenNav ? (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : competitors.length - 1);
                setIsExpanded(false);
              }}
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
                fontSize: "14px",
                color: colors.primary,
              }}
            >
              {"\u25C0"}
            </button>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#999" }}>
              {currentIndex + 1} / {competitors.length}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(currentIndex < competitors.length - 1 ? currentIndex + 1 : 0);
                setIsExpanded(false);
              }}
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
                fontSize: "14px",
                color: colors.primary,
              }}
            >
              {"\u25B6"}
            </button>
          </div>
        ) : (
          <div />
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          style={{
            backgroundColor: "transparent",
            border: `1px solid ${colors.line}`,
            borderRadius: "50px",
            padding: "6px 16px",
            fontSize: "12px",
            fontWeight: "600",
            fontFamily: "Inter, sans-serif",
            color: colors.primary,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          Analysis{" "}
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function CompetitiveLandscapeSection({ sector }) {
  const isMobile = useIsMobile();
  const [activeCompetitorIndex, setActiveCompetitorIndex] = useState(0);
  const [showMoreComp, setShowMoreComp] = useState(false);

  const competitors = sector.competitors || [];
  if (competitors.length === 0) return null;

  const positionData = [
    {
      headline: "BRIDGE delivers operational support for GIPC-registered investments",
      bullets: [
        { label: "Post-Investment Ops", detail: "Registration to revenue" },
        { label: "SME Integration", detail: "Local supply chain links" },
        { label: "Value Chain Depth", detail: "Beyond FDI facilitation" },
        { label: "Impact Reporting", detail: "Investor outcome data" },
      ],
    },
    {
      headline: "BRIDGE adds execution capacity to AGI advocacy outcomes",
      bullets: [
        { label: "Technical Delivery", detail: "Advocacy to action" },
        { label: "SME Capability", detail: "Standards compliance" },
        { label: "Cross-Sector Links", detail: "Beyond manufacturing" },
        { label: "Market Access", detail: "AfCFTA export readiness" },
      ],
    },
    {
      headline: "BRIDGE provides quality and market access for 1D1F factories",
      bullets: [
        { label: "Factory Optimization", detail: "Efficiency improvements" },
        { label: "Quality Certification", detail: "ISO and HACCP support" },
        { label: "Market Linkages", detail: "Domestic and export" },
        { label: "Workforce Training", detail: "Skills academy pipeline" },
      ],
    },
    {
      headline: "BRIDGE co-designs manufacturing-specific lending with DBG",
      bullets: [
        { label: "Product Co-Design", detail: "Manufacturing terms" },
        { label: "Equipment Leasing", detail: "Asset-backed models" },
        { label: "Borrower Support", detail: "Technical assistance" },
        { label: "Portfolio De-Risk", detail: "Sector expertise layer" },
      ],
    },
    {
      headline: "BRIDGE extends GIZ training into employment pipelines",
      bullets: [
        { label: "Employment Pipeline", detail: "Training to jobs" },
        { label: "Private Capital", detail: "Sustainability model" },
        { label: "Credential Portability", detail: "Cross-employer value" },
        { label: "Industry Alignment", detail: "Demand-driven skills" },
      ],
    },
    {
      headline: "BRIDGE connects SME manufacturers to free zone benefits",
      bullets: [
        { label: "SME Onboarding", detail: "Simplified access path" },
        { label: "Quality Assurance", detail: "Zone-wide standards" },
        { label: "Export Coordination", detail: "Shared logistics hub" },
        { label: "Certification Bridge", detail: "Requirements support" },
      ],
    },
  ];

  const shortNames = ["GIPC", "AGI", "1D1F Program", "Dev. Bank Ghana", "GIZ Industrial", "Free Zones Auth."];
  const shortDescs = [
    "FDI facilitation and manufacturer registration",
    "Industry advocacy and standards development",
    "Government factory establishment initiative",
    "Manufacturing SME lending and equipment finance",
    "Industrial skills training and standards transfer",
    "Export incentives and free zone administration",
  ];
  const vsLabels = ["GIPC", "AGI", "1D1F", "DBG", "GIZ", "GFZA"];
  const pos = positionData[activeCompetitorIndex];

  return (
    <section style={{ backgroundColor: colors.background, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
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
              margin: "0 0 16px 0",
              maxWidth: "820px",
            }}
          >
            Building With Ghana's <span style={{ color: colors.accent, fontWeight: "600" }}>Industrial Pioneers</span>
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
            GIPC, AGI, and 1D1F anchor Ghana's industrial base. BRIDGE adds quality certification and supply chain
            integration — combining industrial policy with private sector execution.
          </p>
        </div>

        {isMobile && (
          <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "16px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                border: `1px solid ${colors.line}`,
                borderRadius: "50px",
                padding: "4px",
                backgroundColor: colors.white,
                overflowX: "auto",
                WebkitOverflowScrolling: "touch",
                maxWidth: "100%",
              }}
            >
              {shortNames.map((name, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveCompetitorIndex(i);
                    setShowMoreComp(false);
                  }}
                  style={{
                    padding: "5px 10px",
                    borderRadius: "50px",
                    cursor: "pointer",
                    backgroundColor: activeCompetitorIndex === i ? colors.accentLight : "transparent",
                    color: activeCompetitorIndex === i ? colors.primary : "#999",
                    border: activeCompetitorIndex === i ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "11px",
                    fontWeight: activeCompetitorIndex === i ? "700" : "500",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div
          style={
            isMobile ? {} : { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "24px", alignItems: "stretch" }
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <CompetitorAnalysisCard
              competitors={competitors}
              currentIndex={activeCompetitorIndex}
              setCurrentIndex={(i) => {
                setActiveCompetitorIndex(i);
                setShowMoreComp(false);
              }}
              hiddenNav={isMobile}
              isMobile={isMobile}
            />

            {isMobile && !showMoreComp && (
              <button
                onClick={() => setShowMoreComp(true)}
                style={{
                  width: "100%",
                  padding: "14px",
                  backgroundColor: colors.primary,
                  borderRadius: "12px",
                  border: "none",
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
                See BRIDGE's Position{" "}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
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
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "14px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "2px",
                      color: "rgba(255,255,255,0.4)",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    BRIDGE's Position
                  </span>
                  <span
                    style={{
                      backgroundColor: "rgba(184,217,53,0.12)",
                      color: colors.accent,
                      padding: "4px 12px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "600",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    vs {vsLabels[activeCompetitorIndex]}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "17px",
                    fontWeight: "600",
                    color: colors.white,
                    lineHeight: "1.4",
                    margin: "0 0 18px 0",
                    minHeight: isMobile ? "auto" : "48px",
                  }}
                >
                  {pos.headline}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {pos.bullets.map((b, bi) => (
                    <div
                      key={bi}
                      style={{
                        backgroundColor: "rgba(255,255,255,0.06)",
                        borderRadius: "12px",
                        padding: "14px 16px",
                        display: "flex",
                        alignItems: isMobile ? "flex-start" : "center",
                        gap: "12px",
                        flexWrap: isMobile ? "wrap" : "nowrap",
                      }}
                    >
                      <div
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          backgroundColor: colors.accent,
                          flexShrink: 0,
                          marginTop: isMobile ? "5px" : "0",
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
                        {b.label}
                      </span>
                      <span
                        style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}
                      >
                        {b.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {!isMobile && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", alignContent: "start" }}>
              {competitors.map((comp, i) => (
                <div
                  key={i}
                  onClick={() => setActiveCompetitorIndex(i)}
                  style={{
                    backgroundColor: colors.white,
                    borderRadius: "16px",
                    border: activeCompetitorIndex === i ? `2px solid ${colors.accent}` : `1px solid ${colors.line}`,
                    padding: "24px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    opacity: activeCompetitorIndex === i ? 1 : 0.7,
                    transition: "all 0.2s ease",
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
                        fontSize: "16px",
                        fontWeight: "600",
                        color: colors.dark,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {shortNames[i]}
                    </span>
                    <span
                      style={{
                        backgroundColor: colors.accentLight,
                        color: colors.primary,
                        padding: "3px 10px",
                        borderRadius: "12px",
                        fontSize: "11px",
                        fontWeight: "600",
                        fontFamily: "Inter, sans-serif",
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
                      lineHeight: "1.45",
                      margin: "0 0 12px 0",
                    }}
                  >
                    {shortDescs[i]}
                  </p>
                  <div style={{ backgroundColor: colors.background, borderRadius: "10px", padding: "10px 14px" }}>
                    <div
                      style={{
                        fontSize: "10px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        color: "#bbb",
                        fontFamily: "Inter, sans-serif",
                        marginBottom: "4px",
                      }}
                    >
                      Top Strength
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: "500",
                        color: "#555",
                        fontFamily: "Inter, sans-serif",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {comp.strengths[0].name} ({comp.strengths[0].rating}/5)
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "auto",
                      paddingTop: "14px",
                      borderTop: `1px solid ${colors.line}`,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "#ccc", fontFamily: "Inter, sans-serif" }}>
                      Est. {comp.year}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        color: comp.priority === "High" ? colors.primary : "#999",
                        fontFamily: "Inter, sans-serif",
                        opacity: comp.priority === "High" ? 1 : 0.6,
                      }}
                    >
                      {comp.priority} Priority
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// RIPPLE EFFECT (CROSS-SECTOR) — Production Handoff (Hub & Spoke Interactive)
// ============================================================================

const CrossSectorSection = () => {
  const isMobile = useIsMobile();
  const [activeNode, setActiveNode] = useState(null);
  const [showMoreRipple, setShowMoreRipple] = useState(false);

  const crossSectorShortNames = ["Agriculture", "Financial", "Education", "Energy", "Infrastructure"];

  const pathways = [
    {
      name: "Agriculture & Value Chains",
      connection:
        "Agro-processing is the primary manufacturing subsector — creating direct linkages between farm production and industrial value addition.",
      multiplier: "3.8x",
      synergies: [
        "Contract farming for raw material supply",
        "Post-harvest processing recovering 30-40% value",
        "Agricultural input manufacturing locally",
      ],
      bridgeVentures: ["Agro-Processing Hub", "Shea Value Addition"],
      impact:
        "Enables domestic value addition to agricultural commodities, keeping processing revenue in Ghana and creating industrial jobs.",
      pathLabel: "Manufacturing → Agro-Processing → Agricultural Markets",
      icon: (
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
      ),
    },
    {
      name: "Financial Inclusion",
      connection:
        "Manufacturing finance products serve the $500M+ annual market, while supply chain finance connects the entire production value chain.",
      multiplier: "2.5x",
      synergies: [
        "Working capital facilities for cash flow",
        "Equipment leasing for technology adoption",
        "Supply chain finance for payments & inventory",
      ],
      bridgeVentures: ["Manufacturing Working Capital", "Equipment Leasing"],
      impact:
        "Creates specialized lending products that understand manufacturing cash flows, enabling SME manufacturers to access growth capital.",
      pathLabel: "Manufacturing → Supply Chain Finance → Financial Access",
      icon: (
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
          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
        </svg>
      ),
    },
    {
      name: "Education & Skills",
      connection:
        "TVET programs develop the manufacturing workforce while industry partnerships ensure curriculum relevance and graduate employability.",
      multiplier: "4.1x",
      synergies: [
        "Skills Academy with industry-defined training",
        "Worker certification for portable credentials",
        "TVET curriculum ensuring employability",
      ],
      bridgeVentures: ["Manufacturing Skills Academy", "Quality Certification"],
      impact:
        "Builds a workforce pipeline where training directly matches industry demand, reducing skills mismatch and youth unemployment.",
      pathLabel: "Manufacturing → Skills Training → Workforce Pipeline",
      icon: (
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
          <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
          <path d="M22 10v6" />
          <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
        </svg>
      ),
    },
    {
      name: "Energy & Renewables",
      connection:
        "Reliable, affordable energy is the single largest operational requirement for manufacturing competitiveness and 24-hour operations.",
      multiplier: "2.8x",
      synergies: [
        "Solar micro-grids for industrial power",
        "Off-grid energy for rural manufacturing",
        "Energy efficiency reducing production costs",
      ],
      bridgeVentures: ["Industrial Solar Systems", "Energy Efficiency"],
      impact:
        "Ensures stable, affordable power supply that makes manufacturing operations viable and cost-competitive at industrial scale.",
      pathLabel: "Manufacturing → Industrial Energy → Reliable Power",
      icon: (
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
          <path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
          <path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1" />
          <path d="m11 7-3 5h4l-3 5" />
          <line x1="22" x2="22" y1="11" y2="13" />
        </svg>
      ),
    },
    {
      name: "Infrastructure",
      connection:
        "Industrial estates, transport corridors, and market infrastructure are foundational to manufacturing competitiveness and scale.",
      multiplier: "3.2x",
      synergies: [
        "Industrial park with shared utilities",
        "Transport corridor for materials & goods",
        "Market infrastructure connecting to consumers",
      ],
      bridgeVentures: ["Industrial Park Development", "Logistics Hub"],
      impact:
        "Provides the physical foundation — roads, utilities, industrial zones — that manufacturing requires to operate at competitive scale.",
      pathLabel: "Manufacturing → Industrial Estates → Market Access",
      icon: (
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
    },
  ];

  const activePath = activeNode !== null ? pathways[activeNode] : null;

  return (
    <section style={{ backgroundColor: colors.primary, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
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
              lineHeight: "1.2",
              color: colors.white,
              margin: "0 0 20px 0",
              letterSpacing: "-0.5px",
              maxWidth: "820px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            How Manufacturing Amplifies <span style={{ color: colors.accent, fontWeight: "600" }}>Impact</span>
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
            Every manufacturing venture creates compounding value across BRIDGE sectors. Explore how one investment
            becomes many.
          </p>
        </div>

        {/* Pathway Visual */}
        {isMobile ? (
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
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
                  Manufacturing
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
                      gap: "6px",
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
                      }}
                    >
                      {crossSectorShortNames[i]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "32px",
              marginBottom: "48px",
            }}
          >
            <div
              style={{ width: "120px", display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}
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
                  <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                  <path d="M17 18h1M12 18h1M7 18h1" />
                </svg>
              </div>
            </div>
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
                      fontSize: "11px",
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
            isMobile ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "rgba(255,255,255,0.5)" }}>
                  Tap a sector above to explore how manufacturing amplifies its impact
                </p>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
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
                      onClick={() => setActiveNode(activeNode === i ? null : i)}
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
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.45)",
                          minHeight: "48px",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          lineHeight: "1.4",
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
                        </span>{" "}
                        <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>multiplier</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ) : (
            <div>
              {/* Breadcrumb */}
              <div
                style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px", alignItems: "center" }}
              >
                {activePath.pathLabel.split(" → ").map((seg, si, arr) => (
                  <React.Fragment key={si}>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        fontWeight: si === 0 ? "700" : "500",
                        color: si === 0 ? colors.accent : "rgba(255,255,255,0.7)",
                        backgroundColor: si === 0 ? "rgba(184, 217, 53, 0.15)" : "rgba(255,255,255,0.05)",
                        padding: "6px 14px",
                        borderRadius: "50px",
                      }}
                    >
                      {seg}
                    </span>
                    {si < arr.length - 1 && <span style={{ color: colors.accent, fontSize: "14px" }}>→</span>}
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
                      marginBottom: "16px",
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
                      marginBottom: "20px",
                    }}
                  >
                    {activePath.impact}
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
                      {activePath.multiplier}
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
                        marginBottom: "16px",
                      }}
                    >
                      Synergy Pathways
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {activePath.synergies.map((s, si) => (
                        <div
                          key={si}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "10px 16px",
                            borderRadius: "10px",
                            backgroundColor: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <span style={{ color: colors.accent, fontSize: "8px", flexShrink: 0 }}>●</span>
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "13px",
                              color: "rgba(255,255,255,0.75)",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {s}
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
                        marginBottom: "16px",
                      }}
                    >
                      Linked Ventures
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {activePath.bridgeVentures.map((v, vi) => (
                        <div
                          key={vi}
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
                      Explore {activePath.name} Sector <span>→</span>
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
                    backgroundColor: "transparent",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "12px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: colors.white,
                    cursor: "pointer",
                    marginTop: "16px",
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
                    strokeLinejoin="round"
                    style={{ transform: showMoreRipple ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }}
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
// INVESTMENT THESIS — Production Handoff (Audience Tabs + Returns Panel)
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

const investmentTabs = [
  { key: "returns", label: "Returns" },
  { key: "timeline", label: "Timeline" },
  { key: "impact", label: "Impact" },
];

const investmentTabContent = {
  returns: [
    {
      label: "Flagship Ventures",
      value: "15-22%",
      detail: "Agro-processing, building materials, and packaged foods with proven demand and rapid revenue",
    },
    {
      label: "Growth Ventures",
      value: "10-15%",
      detail: "Skills academy, certification, and pharma with moderate build-out and strong asset value",
    },
    {
      label: "Portfolio IRR",
      value: "10-18%",
      detail: "Blended returns across 12 ventures with risk-adjusted modeling and first-loss protection",
    },
    {
      label: "Dev. Leverage",
      value: "3-5x",
      detail: "Every dollar deployed generates $3-5 in local manufacturing economic activity",
    },
  ],
  timeline: [
    {
      label: "Phase 1 (Yr 1-2)",
      value: "Foundation",
      detail: "Agro-processing hub launch, skills academy setup, and 1D1F partnerships",
    },
    {
      label: "Phase 2 (Yr 3-4)",
      value: "Scale",
      detail: "Textile expansion, pharmaceutical ops, free zone facility development",
    },
    {
      label: "Phase 3 (Yr 5-7)",
      value: "Expansion",
      detail: "Industrial park development, electronics assembly, regional export platform",
    },
    {
      label: "Exit Horizon",
      value: "5-7 yrs",
      detail: "Staged liquidity via asset sales, concession renewals, or recapitalization",
    },
  ],
  impact: [
    {
      label: "Jobs Created",
      value: "2,000+",
      detail: "Direct manufacturing employment across ventures including production and management",
    },
    {
      label: "Import Substitution",
      value: "$200M+",
      detail: "Annual import replacement value through domestic production capacity",
    },
    {
      label: "SME Formalization",
      value: "500+",
      detail: "Informal manufacturers transitioning to formal operations with quality standards",
    },
    {
      label: "Skills Certified",
      value: "3,000+",
      detail: "Workers with portable manufacturing credentials through Skills Academy",
    },
  ],
};

const investmentAudiences = [
  {
    key: "entrepreneur",
    label: "Entrepreneur",
    shortLabel: "Founder",
    icon: <IconStorefront />,
    headline: "Build Manufacturing That Creates Local Value",
    pitch:
      "BRIDGE provides validated venture models, 1D1F partnership access, and working capital strategies so you can launch manufacturing businesses with de-risked market entry and clear profitability paths.",
    stats: [
      { value: "14", label: "Venture Paths", detail: "validated models" },
      { value: "1D1F", label: "Gov Partnership", detail: "factory support" },
      { value: "Full", label: "BRIDGE Support", detail: "incubation to scale" },
    ],
    pathways: [
      {
        bring: "Local knowledge & production capacity",
        get: "BRIDGE provides venture blueprints, financial models, and go/no-go frameworks",
      },
      {
        bring: "Community relationships & supply chains",
        get: "Access to free zone benefits, government partnerships, and working capital facilities",
      },
      {
        bring: "Execution commitment & quality standards",
        get: "Technical assistance, certification support, and scale-up through AfCFTA market access",
      },
    ],
  },
  {
    key: "business",
    label: "Business Entity",
    shortLabel: "Business",
    icon: <IconOfficeBuilding />,
    headline: "Anchor Supply Chains in Industrial Growth",
    pitch:
      "Partner with BRIDGE to secure reliable domestic supply for your operations — from agro-processing to building materials — while contributing to import substitution and local manufacturing outcomes.",
    stats: [
      { value: "$15-30M", label: "Capital Range", detail: "across 12 ventures" },
      { value: "10-15%", label: "Cash Yield", detail: "annual distribution" },
      { value: "$200M+", label: "Import Replace", detail: "addressable market" },
    ],
    pathways: [
      {
        bring: "Procurement commitments & volume guarantees",
        get: "Priority access to domestic manufactured goods and preferential pricing structures",
      },
      {
        bring: "Technical expertise & equipment",
        get: "Co-development opportunities in processing facilities and quality systems",
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
    headline: "Manufacturing Assets With Impact Returns",
    pitch:
      "Deploy capital into physical manufacturing assets with transparent governance, compounding revenue streams, and measurable development outcomes — backed by government incentives and AfCFTA access.",
    stats: [
      { value: "10-18%", label: "Target IRR", detail: "blended portfolio" },
      { value: "2.5x", label: "Multiple", detail: "capital appreciation" },
      { value: "18-24mo", label: "First Cash", detail: "revenue timeline" },
    ],
    pathways: [
      {
        bring: "Growth capital & patient deployment",
        get: "Asset-backed returns with manufacturing equipment as collateral and clear exit pathways",
      },
      {
        bring: "Sector expertise & strategic guidance",
        get: "Board participation, portfolio oversight, and co-investment opportunities",
      },
      {
        bring: "Network access & deal flow",
        get: "First-look rights on expansion ventures and AfCFTA geographic replication",
      },
    ],
  },
  {
    key: "government",
    label: "Government",
    shortLabel: "Gov't",
    icon: <IconLandmark />,
    headline: "Deliver Industrial Growth, No Fiscal Strain",
    pitch:
      "BRIDGE ventures align directly with 24-Hour Economy manufacturing priorities — delivering industrial capacity through private capital while creating jobs, expanding the tax base, and reducing imports.",
    stats: [
      { value: "2,000+", label: "Jobs Created", detail: "direct employment" },
      { value: "95%", label: "Private Capital", detail: "no fiscal burden" },
      { value: "3-5x", label: "Tax Multiplier", detail: "economic activity" },
    ],
    pathways: [
      {
        bring: "Policy alignment & free zone support",
        get: "Private manufacturing delivery that meets 24-Hour Economy and 1D1F targets",
      },
      {
        bring: "Land access & permitting facilitation",
        get: "Job creation, tax revenue expansion, and import substitution progress",
      },
      {
        bring: "Community endorsement & legitimacy",
        get: "Transparent reporting on development outcomes and constituency impact data",
      },
    ],
  },
];

const InvestmentCTASection = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("returns");
  const [activeAudience, setActiveAudience] = useState(0);
  const [showInvestmentDetails, setShowInvestmentDetails] = useState(false);
  const aud = investmentAudiences[activeAudience];

  return (
    <section style={{ backgroundColor: colors.background, padding: isMobile ? "60px 0" : "100px 80px" }}>
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        <div
          style={{
            marginBottom: isMobile ? "32px" : "48px",
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
              margin: "0 0 16px 0",
              maxWidth: "820px",
            }}
          >
            Every <span style={{ fontWeight: "600", color: colors.primary }}>Stakeholder</span> Has a Role in{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Industrial Growth</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              color: "#666",
              lineHeight: "1.65",
              margin: 0,
              maxWidth: "700px",
            }}
          >
            Investment isn't only capital — it's expertise, partnerships, policy, and vision. See how your role
            contributes to {sectorData.ventures} ventures across {sectorData.capitalRange} in opportunity.
          </p>
        </div>

        {/* Audience Selector */}
        {isMobile ? (
          <div
            style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "24px", padding: "0 20px" }}
          >
            {investmentAudiences.map((a, idx) => {
              const isActive = activeAudience === idx;
              return (
                <button
                  key={a.key}
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
                      backgroundColor: isActive ? colors.accentLight : colors.background,
                      border: isActive ? `2px solid ${colors.primary}` : `1px solid ${colors.line}`,
                      color: colors.primary,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {a.icon}
                  </div>
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
              flexWrap: "wrap",
            }}
          >
            {investmentAudiences.map((a, idx) => {
              const isActive = activeAudience === idx;
              return (
                <button
                  key={a.key}
                  onClick={() => setActiveAudience(idx)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    borderRadius: "50px",
                    border: isActive ? `2px solid ${colors.primary}` : `1px solid ${colors.line}`,
                    backgroundColor: isActive ? colors.accentLight : colors.white,
                    color: colors.primary,
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: isActive ? "700" : "500",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ display: "flex", color: colors.primary, transition: "all 0.25s ease" }}>{a.icon}</span>
                  {a.label}
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
          {/* LEFT: Audience */}
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
                  minHeight: "80px",
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                {aud.headline}
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
                  minHeight: "100px",
                }}
              >
                {aud.pitch}
              </p>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "24px" }}>
              {aud.stats.map((stat, idx) => (
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
              {aud.pathways.map((path, idx) => (
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
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        color: "#777",
                        lineHeight: "1.5",
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
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <strong style={{ color: colors.primary }}>Ministry of Trade & Industry</strong> — manufacturing
                partnership framework
              </div>
            </div>
          </div>

          {/* RIGHT: Returns Panel */}
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
                    <div style={{ width: isMobile ? "90px" : "120px", flexShrink: 0 }}>
                      <div
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: isMobile ? "18px" : "20px",
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
                  Download Prospectus <span style={{ fontSize: "16px" }}>{"\u2192"}</span>
                </a>
              </div>
            </div>
          )}

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
// FINAL CTA SECTION (v2 — #2E5A4D bg, sector-specific content)
// ============================================================================

const FinalCTASection = () => {
  const isMobile = useIsMobile();
  return (
    <section
      style={{ backgroundColor: colors.primary, padding: isMobile ? "60px 20px" : "100px 80px", textAlign: "center" }}
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
          Let's Build Ghana's Industrial Future
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
          Let's Build Ghana's <span style={{ color: colors.accent, fontWeight: "600" }}>Industrial Future</span>
        </h2>
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: isMobile ? "16px" : "18px",
            lineHeight: "1.7",
            color: "rgba(255,255,255,0.7)",
            margin: "0 0 40px 0",
            maxWidth: "680px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Whether you're an investor, partner, or government stakeholder, there's a seat at the table in building
          Ghana's local production capacity.
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
// FOOTER COMPONENTS — Exact Production Code
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

export default function ManufacturingSectorPage() {
  const isMobile = useIsMobile();
  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        margin: 0,
        padding: 0,
        backgroundColor: colors.white,
        overflowX: "hidden",
      }}
    >
      <style>{`
        @keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-8px); } 60% { transform: translateY(-4px); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        * { -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 2px; }
      `}</style>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Poppins:wght@700;800&display=swap"
        rel="stylesheet"
      />
      <SiteHeader />
      <HeroSection sector={sectorData} />
      <ProblemSection sector={sectorData} />
      <ValueChainSectionPremium />
      <SolutionsSection sector={sectorData} />
      <PolicyAlignmentSection />
      <CompetitiveLandscapeSection sector={sectorData} />
      <CrossSectorSection />
      <InvestmentCTASection />
      <ImpactSection />
      <FinalCTASection />
      {/* Pre-footer separator — NOT part of the Footer component */}
      <div style={{ backgroundColor: colors.primary, padding: isMobile ? "0 20px" : "0 80px" }}>
        <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)" }} />
      </div>
      <Footer />
    </div>
  );
}
