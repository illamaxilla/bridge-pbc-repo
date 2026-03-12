import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { cn } from "@/lib/utils";
import { IconArrowRight, IconArrowDown, IconCheck, IconWallet, IconGraduation, IconStorefront, IconOfficeBuilding, IconTrendingUp, IconLandmark } from "@/components/icons/SectorIcons";
import { ArrowRight, BatteryCharging, Blocks, Check, ChevronDown, ChevronUp, Clock, Factory, GraduationCap, Sprout, Truck, Users, Wallet, Warehouse } from "lucide-react";
import { FOOTER_SECTOR_ICONS, SECTOR_ROUTES } from "@/data/sectorIcons";
import { useCounter } from "@/hooks/useCounter";

// ============================================================================
// BRIDGE SECTOR PAGE: Manufacturing & Light Industry
// INTEGRATED VERSION with Shared Components v2
// ============================================================================
// Design System: Dark Green #1B4D3E, Lime #B8D935, Off-white #F3F5F2
// ============================================================================

import { colors, layout } from "@/lib/theme";
import { useIsMobile } from "@/hooks/useIsMobile";

const CONTENT_MAX_WIDTH = layout.maxWidth;

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


// Premium Value Chain Icons
const valueChainIcons = {
  seed: <Sprout size={24} strokeWidth={1.5} />,
  warehouse: <Warehouse size={24} strokeWidth={1.5} />,
  factory: <Factory size={24} strokeWidth={1.5} />,
  truck: <Truck size={24} strokeWidth={1.5} />,
  users: <Users size={24} strokeWidth={1.5} />,
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
// HERO SECTION — Production Handoff
// ============================================================================

const HeroSection = ({ sector }) => {
  const isMobile = useIsMobile();
  return (
    <section
      className="relative flex flex-col"
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "80px 20px 20px" : "112px 80px 20px",
        minHeight: isMobile ? "auto" : "calc(100vh - 100px)",
      }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div
          className="grid items-start flex-1"
          style={{
            gridTemplateColumns: isMobile ? "1fr" : "1fr 420px",
            gap: isMobile ? "32px" : "60px",
          }}
        >
          <div>
            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="rounded-full text-[11px] font-bold uppercase tracking-[1.5px] font-[Inter,sans-serif] px-4 py-2"
                style={{
                  backgroundColor: colors.accentLight,
                  color: colors.primary,
                }}
              >
                {sector.category}
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-[Inter,sans-serif] font-normal leading-[1.1] tracking-[-1px] mb-5 mt-0"
              style={{
                fontSize: isMobile ? "30px" : "52px",
                color: colors.primary,
              }}
            >
              <span className="font-bold">Manufacturing</span> &{!isMobile && <br />} Light Industry
            </h1>

            {/* Subheading */}
            <h2
              className="font-[Inter,sans-serif] font-semibold leading-[1.3] mt-0 mb-4"
              style={{
                fontSize: isMobile ? "20px" : "24px",
                color: colors.dark,
              }}
            >
              {sector.problemHeadline}
            </h2>

            {/* Description */}
            <p
              className="font-[Inter,sans-serif] font-normal leading-[1.7] text-[#555] max-w-[540px] mt-0 mb-9"
              style={{
                fontSize: isMobile ? "15px" : "16px",
              }}
            >
              {sector.problemSubheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-3" style={{ flexWrap: isMobile ? "wrap" : "nowrap" }}>
              <button
                className="border-none rounded-full font-semibold font-[Inter,sans-serif] cursor-pointer flex items-center gap-[10px]"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.primary,
                  padding: isMobile ? "14px 20px" : "16px 24px",
                  fontSize: isMobile ? "14px" : "15px",
                  flex: isMobile ? "1 1 100%" : "none",
                  justifyContent: isMobile ? "center" : "flex-start",
                }}
              >
                Request Full Analysis
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: colors.primary,
                    color: colors.white,
                  }}
                >
                  <IconArrowRight />
                </span>
              </button>
              <button
                className="bg-transparent rounded-full font-semibold font-[Inter,sans-serif] cursor-pointer"
                style={{
                  color: colors.primary,
                  border: `2px solid ${colors.line}`,
                  padding: isMobile ? "14px 20px" : "16px 24px",
                  fontSize: isMobile ? "14px" : "15px",
                  flex: isMobile ? "1 1 100%" : "none",
                }}
              >
                Download Summary
              </button>
            </div>
          </div>

          {/* Stats Card */}
          <div
            className="rounded-[20px]"
            style={{
              backgroundColor: colors.primary,
              padding: isMobile ? "24px" : "32px",
              minWidth: isMobile ? "auto" : "340px",
            }}
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-bold text-white/50 uppercase tracking-[1.5px] font-[Inter,sans-serif]">
                Sector Overview
              </span>
              <span
                className="rounded-full text-[11px] font-bold uppercase tracking-[1px] px-[14px] py-[6px]"
                style={{
                  backgroundColor: "rgba(184, 217, 53, 0.15)",
                  color: colors.accent,
                }}
              >
                Active
              </span>
            </div>

            {/* Main Stats Row */}
            <div className="flex justify-between mt-5 pb-6 border-b border-white/10">
              <div>
                <div
                  className="font-bold font-[Inter,sans-serif] leading-none mb-2"
                  style={{
                    fontSize: isMobile ? "28px" : "42px",
                    color: colors.accent,
                  }}
                >
                  {sector.capitalRange}
                </div>
                <div
                  className="font-medium text-white/50 font-[Inter,sans-serif]"
                  style={{ fontSize: isMobile ? "12px" : "13px" }}
                >
                  Investment Range
                </div>
              </div>
              <div className="text-right">
                <div
                  className="font-bold font-[Inter,sans-serif] leading-none mb-2"
                  style={{
                    fontSize: isMobile ? "28px" : "42px",
                    color: colors.accent,
                  }}
                >
                  {sector.ventures}
                </div>
                <div className="text-[13px] font-medium text-white/50 font-[Inter,sans-serif]">
                  Identified Ventures
                </div>
              </div>
            </div>

            {/* Stat Rows — 4 items */}
            {sector.keyStats.map((stat, i) => (
              <div key={i} className="flex justify-between items-center py-4">
                <div>
                  <span className="block text-[15px] font-medium text-white/80 font-[Inter,sans-serif]">
                    {stat.label}
                  </span>
                  {stat.detail && (
                    <span className="block text-[12px] font-normal text-white/35 font-[Inter,sans-serif] italic mt-[2px]">
                      {stat.detail}
                    </span>
                  )}
                </div>
                <span
                  className="text-[20px] font-semibold font-[Inter,sans-serif]"
                  style={{ color: colors.accent }}
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
        <div className="flex flex-col items-center mt-auto pt-[10px] pb-[10px]">
          <span className="font-[Inter,sans-serif] text-[13px] text-[#999] mb-2">
            Explore Analysis
          </span>
          <div className="text-[#999]" style={{ animation: "bounce 2s infinite" }}>
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
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6 px-5 py-[10px]"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
            }}
          >
            The Opportunity
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[820px] mt-6 mb-5"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
            }}
          >
            <span className="font-semibold" style={{ color: colors.accent }}>2M+</span> workers ready to power Ghana's{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>industrial growth</span> through smarter{" "}
            <span className="font-semibold">manufacturing</span>
          </h2>
          <p
            className="font-[Inter,sans-serif] leading-[1.65] text-[#666] max-w-[680px] m-0"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
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
                  className="cursor-pointer transition-all duration-300"
                  style={{
                    backgroundColor: colors.white,
                    borderRadius: isMobile ? "16px" : "20px",
                    padding: isMobile ? "20px" : "28px",
                    border: isExpanded ? `2px solid ${colors.accent}` : `1px solid ${colors.line}`,
                  }}
                >
                  {/* Zone 1: Title + Badge + Description */}
                  <div className="flex justify-between items-start gap-3 mb-2">
                    <h3
                      className="font-[Inter,sans-serif] font-semibold m-0 flex-1 leading-[1.3]"
                      style={{
                        fontSize: isMobile ? "16px" : "18px",
                        color: colors.dark,
                      }}
                    >
                      {problem.title}
                    </h3>
                    <span
                      className="rounded-[20px] text-[11px] font-bold whitespace-nowrap shrink-0 font-[Inter,sans-serif] ml-3 px-[14px] py-[6px]"
                      style={{
                        backgroundColor: sevColors.bg,
                        color: sevColors.text,
                      }}
                    >
                      {problem.severity}
                    </span>
                  </div>
                  <p
                    className="font-[Inter,sans-serif] text-[#666] mt-0 mb-3 leading-[1.5] overflow-hidden"
                    style={{
                      fontSize: isMobile ? "13px" : "14px",
                      display: "-webkit-box",
                      WebkitLineClamp: isMobile ? 2 : 3,
                      WebkitBoxOrient: "vertical",
                      minHeight: isMobile ? "auto" : "63px",
                    }}
                  >
                    {problem.description}
                  </p>

                  {/* Zone 2: Impact Bar */}
                  <div
                    className="rounded-xl"
                    style={{
                      backgroundColor: colors.accentLight,
                      padding: isMobile ? "8px 12px" : "10px 16px",
                      marginBottom: isExpanded ? "16px" : 0,
                    }}
                  >
                    <span
                      className="font-[Inter,sans-serif] font-semibold block whitespace-nowrap overflow-hidden text-ellipsis"
                      style={{
                        fontSize: isMobile ? "13px" : "14px",
                        color: colors.primary,
                      }}
                    >
                      Impact: {problem.quantification}
                    </span>
                  </div>

                  {/* Expanded Zones 3-5 */}
                  {isExpanded && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="pt-4"
                      style={{ borderTop: `1px solid ${colors.line}` }}
                    >
                      {/* Zone 3: Priority + Scale */}
                      <div
                        className="grid gap-3 mb-4"
                        style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}
                      >
                        <div className="rounded-xl p-[14px]" style={{ backgroundColor: colors.background }}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888]">
                              Priority
                            </span>
                            <span
                              className="rounded-[20px] text-[12px] font-bold font-[Inter,sans-serif] px-[10px] py-1"
                              style={{
                                backgroundColor: sevColors.bg,
                                color: sevColors.text,
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
                              className="h-full rounded"
                              style={{
                                width: `${problem.severityScore}%`,
                                backgroundColor: sevColors.bar,
                              }}
                            />
                          </div>
                        </div>
                        <div className="rounded-xl p-[14px]" style={{ backgroundColor: colors.background }}>
                          <span className="font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888] block mb-1">
                            Scale
                          </span>
                          <div className="flex items-baseline gap-[6px]">
                            <span
                              className="font-[Poppins,sans-serif] font-bold leading-none"
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

                      {/* Zone 4: Opportunity Drivers */}
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
                          {problem.rootCauses.map((cause, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 rounded-xl"
                              style={{
                                backgroundColor: colors.background,
                                padding: isMobile ? "10px 12px" : "12px 14px",
                              }}
                            >
                              <span
                                className="w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-semibold font-[Inter,sans-serif] shrink-0"
                                style={{
                                  backgroundColor: colors.primary,
                                  color: colors.white,
                                }}
                              >
                                {i + 1}
                              </span>
                              <div className="min-w-0">
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

                      {/* Zone 5: BRIDGE Solution Footer */}
                      <div
                        className="pt-4 flex justify-between"
                        style={{
                          borderTop: `1px solid ${colors.line}`,
                          flexDirection: isMobile ? "column" : "row",
                          alignItems: isMobile ? "flex-start" : "center",
                          gap: isMobile ? "8px" : "16px",
                        }}
                      >
                        <div className="flex items-center gap-[10px]">
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
                        <a
                          href="#solutions"
                          className="flex items-center gap-1 font-[Inter,sans-serif] text-[13px] font-medium no-underline shrink-0"
                          style={{ color: colors.primary }}
                        >
                          View{" "}
                          <ArrowRight size={14} strokeWidth={2} />
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
          <div className="flex justify-center gap-2 mt-4">
            {enhancedPainPoints.map((_, i) => (
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
// PREMIUM VALUE CHAIN SECTION — Pill Variant C (Lime Glow on dark bg)
// ============================================================================

const ValueChainSectionPremium = () => {
  const isMobile = useIsMobile();
  const [activeStage, setActiveStage] = useState(null);

  return (
    <section
      className="relative"
      style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "100px 80px" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center" style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6 px-5 py-[10px]"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
            }}
          >
            The Process
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[600px] mx-auto mt-0 mb-5"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
            }}
          >
            From Raw Material to <span className="font-semibold" style={{ color: colors.accent }}>Market Impact</span>
          </h2>
          <p
            className="font-[Inter,sans-serif] text-[#666] max-w-[750px] mx-auto leading-[1.65]"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
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
                      <div className="pt-3 mt-1 border-t border-white/15">
                        <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-white/50 font-[Inter,sans-serif] mb-[10px]">
                          Opportunity Areas
                        </div>
                        <div className="flex flex-col gap-[6px]">
                          {stage.painPoints.map((point, pi) => (
                            <div
                              key={pi}
                              className="rounded-lg flex items-start gap-[10px] py-2 px-3"
                              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                            >
                              <span
                                className="w-2 h-2 rounded-full shrink-0 mt-[5px]"
                                style={{ backgroundColor: colors.accent }}
                              />
                              <span
                                className="text-[13px] font-[Inter,sans-serif] leading-[1.4]"
                                style={{ color: colors.white }}
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
            <div className="flex justify-center gap-2 mt-4">
              {valueChainStages.map((_, i) => (
                <div
                  key={i}
                  className="h-2 rounded cursor-pointer transition-all duration-300"
                  style={{
                    width: activeStage === i ? "24px" : "8px",
                    backgroundColor: activeStage === i ? colors.accent : colors.line,
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
            <div className="grid grid-cols-5 gap-3">
              {valueChainStages.map((stage, i) => {
                const isActive = activeStage === i;
                const isCollapsed = activeStage !== null && !isActive;
                return (
                  <div
                    key={stage.id}
                    onClick={() => setActiveStage(isActive ? null : i)}
                    className="rounded-2xl cursor-pointer flex flex-col"
                    style={{
                      backgroundColor: isActive ? colors.primary : colors.white,
                      border: `2px solid ${colors.primary}`,
                      padding: isCollapsed ? "16px 16px" : "24px 20px",
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
                          <ChevronDown size={18} strokeWidth={2} color={isActive ? "rgba(255,255,255,0.4)" : "#ccc"} style={{
                              transform: isActive ? "rotate(180deg)" : "none",
                              transition: "transform 0.2s ease",
                            }} />
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
                <div className="flex justify-between items-center mb-5">
                  <span
                    className="text-[11px] font-bold uppercase tracking-[1.5px] font-[Inter,sans-serif]"
                    style={{ color: colors.primary }}
                  >
                    Opportunity Areas — {valueChainStages[activeStage].stage}
                  </span>
                  <span className="text-[13px] text-[#999] font-[Inter,sans-serif]">
                    {valueChainStages[activeStage].population}
                  </span>
                </div>
                {/* Opportunity cards */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {valueChainStages[activeStage].painPoints.map((point, pi) => (
                    <div
                      key={pi}
                      className="flex items-center justify-center rounded-[10px] py-[10px] px-4"
                      style={{
                        backgroundColor: colors.white,
                        border: `1px solid ${colors.line}`,
                      }}
                    >
                      <span
                        className="text-[13px] font-[Inter,sans-serif] text-center leading-[1.4]"
                        style={{ color: colors.dark }}
                      >
                        {point}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Value Recapture Bar — inside same container */}
                <div className="flex justify-between items-center mb-[10px]">
                  <span className="text-[11px] font-bold uppercase tracking-[1px] text-[#999] font-[Inter,sans-serif]">
                    Value Recapture Potential
                  </span>
                  <span
                    className="text-[20px] font-bold font-[Poppins,sans-serif]"
                    style={{ color: colors.primary }}
                  >
                    70% <span className="text-[14px] font-medium text-[#999]">addressable</span>
                  </span>
                </div>
                <div
                  className="h-[10px] rounded-[5px] overflow-hidden"
                  style={{
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.line}`,
                  }}
                >
                  <div
                    className="h-full rounded-[5px] transition-[width] duration-500"
                    style={{
                      width: `${valueChainStages[activeStage].valueRetained}%`,
                      backgroundColor: colors.accent,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  {valueChainStages.map((s, si) => (
                    <span
                      key={si}
                      className="text-[11px] font-[Inter,sans-serif] text-center flex-1 transition-all duration-300"
                      style={{
                        color: si === activeStage ? colors.primary : "#bbb",
                        fontWeight: si === activeStage ? "700" : "400",
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
          <div className="px-10 mt-12">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[13px] font-semibold uppercase tracking-[1px] text-[#999] font-[Inter,sans-serif]">
                Value Recapture Potential
              </span>
              <span
                className="text-[24px] font-bold font-[Poppins,sans-serif]"
                style={{ color: colors.primary }}
              >
                70% addressable
              </span>
            </div>
            <div
              className="h-3 rounded-[6px] overflow-hidden"
              style={{
                backgroundColor: colors.background,
                border: `1px solid ${colors.line}`,
              }}
            >
              <div className="h-full w-[70%] rounded-[6px]" style={{ backgroundColor: colors.accent }} />
            </div>
            <div className="flex justify-between mt-2">
              {valueChainStages.map((s, i) => (
                <span
                  key={i}
                  className="text-[11px] text-[#999] font-[Inter,sans-serif] text-center flex-1"
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
      <div className="max-w-[1200px] mx-auto">
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6 px-5 py-[10px]"
            style={{
              backgroundColor: "rgba(184,217,53,0.15)",
              color: colors.accent,
            }}
          >
            The Pathway to Impact
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[900px] mt-0 mb-5"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.white,
            }}
          >
            Ventures That Build <span className="font-semibold" style={{ color: colors.accent }}>Lasting Value</span>
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
                  className="rounded-lg py-[10px] px-3"
                  style={{
                    backgroundColor: colors.background,
                    border: `1px solid ${colors.line}`,
                  }}
                >
                  <div className="text-[10px] font-bold uppercase tracking-[1px] text-[#999] font-[Inter,sans-serif] mb-[2px]">
                    Impact
                  </div>
                  <div
                    className="text-[12px] font-semibold font-[Inter,sans-serif] min-h-4"
                    style={{ color: colors.primary }}
                  >
                    {sol.impact}
                  </div>
                </div>
                <div className="mt-[10px] h-[3px] rounded-sm" style={{ backgroundColor: colors.line }}>
                  <div
                    className="h-full rounded-sm"
                    style={{
                      width: `${(sol.score / 41) * 100}%`,
                      backgroundColor: colors.accent,
                    }}
                  />
                </div>
                <div className="text-[10px] text-[#999] font-[Inter,sans-serif] mt-[2px] text-right">
                  Score: {sol.score}/41
                </div>
              </div>
            );
          })}
        </div>
        {isMobile && (
          <div className="flex justify-center gap-[6px] mt-4">
            {filtered.map((_, i) => (
              <div
                key={i}
                className="w-[6px] h-[6px] rounded-full"
                style={{
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
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <div
          key={n}
          className="w-2 h-2 rounded-full"
          style={{
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
        className="flex justify-between items-center"
        style={{ marginBottom: isMobile ? "20px" : "32px" }}
      >
        <div>
          <span
            className="text-[11px] font-bold uppercase tracking-[1.5px] font-[Inter,sans-serif]"
            style={{ color: colors.accent }}
          >
            Institutional Profile
          </span>
          <h3
            className="font-semibold font-[Inter,sans-serif] mt-2 mb-0"
            style={{
              fontSize: isMobile ? "22px" : "28px",
              color: colors.white,
            }}
          >
            {c.name}
          </h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIdx((idx - 1 + allies.length) % allies.length)}
            className="rounded-full bg-white/10 border-none text-[18px] cursor-pointer"
            style={{
              width: isMobile ? "36px" : "40px",
              height: isMobile ? "36px" : "40px",
              color: colors.white,
            }}
          >
            ←
          </button>
          <button
            onClick={() => setIdx((idx + 1) % allies.length)}
            className="rounded-full bg-white/10 border-none text-[18px] cursor-pointer"
            style={{
              width: isMobile ? "36px" : "40px",
              height: isMobile ? "36px" : "40px",
              color: colors.white,
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
          <div className="mb-6">
            <div className="text-[13px] text-white/50 font-[Inter,sans-serif] mb-1">
              Focus
            </div>
            <div className="text-[15px] font-[Inter,sans-serif]" style={{ color: colors.white }}>{c.focus}</div>
          </div>
          <div className="mb-6">
            <div className="text-[13px] text-white/50 font-[Inter,sans-serif] mb-1">
              Collaboration Area
            </div>
            <div className="text-[15px] font-[Inter,sans-serif]" style={{ color: colors.accent }}>
              {c.collaboration}
            </div>
          </div>
          <div className="flex gap-6">
            <div>
              <div className="text-[13px] text-white/50 font-[Inter,sans-serif] mb-1">
                Founded
              </div>
              <div className="text-[15px] font-[Inter,sans-serif]" style={{ color: colors.white }}>{c.year}</div>
            </div>
            <div>
              <div className="text-[13px] text-white/50 font-[Inter,sans-serif] mb-1">
                Funding
              </div>
              <div className="text-[15px] font-[Inter,sans-serif]" style={{ color: colors.white }}>{c.funding}</div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-[13px] font-semibold text-white/50 font-[Inter,sans-serif] mb-4 uppercase tracking-[1px]">
            Strengths
          </div>
          {c.strengths.map((s, i) => (
            <div
              key={i}
              className="flex justify-between items-center py-[10px]"
              style={{ borderBottom: i < c.strengths.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}
            >
              <span className="text-[14px] font-[Inter,sans-serif]" style={{ color: colors.white }}>{s.name}</span>
              <RatingDots rating={s.rating} />
            </div>
          ))}
        </div>
      </div>
      <div
        className="rounded-[14px]"
        style={{
          marginTop: isMobile ? "20px" : "28px",
          padding: isMobile ? "16px" : "20px",
          backgroundColor: "rgba(184, 217, 53, 0.1)",
          border: "1px solid rgba(184, 217, 53, 0.2)",
        }}
      >
        <div
          className="text-[11px] font-bold uppercase tracking-[1.5px] font-[Inter,sans-serif] mb-2"
          style={{ color: colors.accent }}
        >
          Where BRIDGE Complements
        </div>
        <div
          className="font-[Inter,sans-serif] leading-[1.5]"
          style={{
            fontSize: isMobile ? "14px" : "15px",
            color: colors.white,
          }}
        >
          {c.bridgeOpportunity}
        </div>
      </div>
      <div className="flex justify-center gap-[6px] mt-6">
        {allies.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="h-2 rounded border-none cursor-pointer transition-all duration-300"
            style={{
              width: idx === i ? "24px" : "8px",
              backgroundColor: idx === i ? colors.accent : "rgba(255,255,255,0.2)",
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
          className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-['DM_Sans',sans-serif] mb-6 px-5 py-[10px]"
          style={{
            backgroundColor: colors.white,
            border: `1px solid ${colors.line}`,
            color: colors.primary,
          }}
        >
          The Landscape
        </span>
        <h2
          className="font-['DM_Sans',sans-serif] font-light leading-[1.2] tracking-[-0.5px] mt-0 mb-5"
          style={{
            fontSize: isMobile ? "28px" : "42px",
            color: colors.primary,
          }}
        >
          Building With Ghana's <span className="font-semibold" style={{ color: colors.accent }}>Strongest Institutions</span>
        </h2>
        <p
          className="font-['DM_Sans',sans-serif] text-[#666] max-w-[750px] leading-[1.65]"
          style={{ fontSize: isMobile ? "15px" : "16px" }}
        >
          Combining strengths, aligning resources, and creating shared value with the institutions already shaping
          Ghana's industrial landscape.
        </p>
      </div>
      <div className="max-w-[1000px] mx-auto">
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
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div className="text-center" style={{ marginBottom: isMobile ? "32px" : "48px" }}>
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-['DM_Sans',sans-serif] mb-6 px-5 py-[10px]"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
            }}
          >
            The Governance & Policy
          </span>
          <h2
            className="font-['DM_Sans',sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[900px] mx-auto mt-0 mb-5"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
            }}
          >
            Moving in Step with Ghana's{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>Industrial Ambition</span>
          </h2>
          <p className="font-['DM_Sans',sans-serif] text-[16px] text-[#555] max-w-[750px] leading-[1.65] mx-auto">
            BRIDGE's manufacturing ventures align directly with Ghana's flagship industrial policies, the 24-Hour
            Economy, and AfCFTA positioning — creating pathways for public-private collaboration.
          </p>
          <div className="flex justify-center mt-6">
            <div
              className="inline-flex items-center rounded-full"
              style={{
                gap: isMobile ? "4px" : "8px",
                border: `1px solid ${colors.line}`,
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
                    <ChevronDown size={12} strokeWidth={2.5} color={colors.primary} />
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
                    <ChevronUp size={12} strokeWidth={2.5} color={colors.primary} />
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
                      <div className="flex gap-[6px] flex-wrap mb-[10px]">
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
                    <div className="flex flex-col gap-[6px]">
                      {p.bridgeVentures.map((v, vi) => (
                        <div
                          key={vi}
                          className="flex items-center gap-[10px] rounded-lg py-2 px-3"
                          style={{ backgroundColor: colors.primary }}
                        >
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ backgroundColor: colors.accent }}
                          />
                          <span
                            className="text-[12px] font-semibold font-['DM_Sans',sans-serif]"
                            style={{ color: colors.white }}
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
          <div className="flex justify-center gap-2 mb-4">
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
          className="rounded-2xl flex items-center gap-4"
          style={{
            backgroundColor: colors.primary,
            padding: isMobile ? "24px" : "28px 32px",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          <div>
            <div
              className="font-['DM_Sans',sans-serif] font-semibold mb-1"
              style={{
                fontSize: isMobile ? "16px" : "18px",
                color: colors.white,
              }}
            >
              BRIDGE complements — never competes with — government vision.
            </div>
            <div className="font-['DM_Sans',sans-serif] text-[14px] text-white/60">
              Every venture aligns with at least one active government policy or initiative.
            </div>
          </div>
          <button
            className="border-none rounded-full text-[14px] font-bold font-['DM_Sans',sans-serif] cursor-pointer shrink-0 py-[14px] px-8"
            style={{
              backgroundColor: colors.accent,
              color: colors.primary,
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
      <div className="flex justify-between items-start mb-[6px]">
        <div className="flex items-center gap-3">
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
      <div className="max-w-[1100px] mx-auto">
        {/* Pill */}
        <span
          className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-['DM_Sans',sans-serif] mb-6 px-5 py-[10px]"
          style={{
            backgroundColor: colors.white,
            border: `1px solid ${colors.line}`,
            color: colors.primary,
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
        <div className="flex justify-start mb-6">
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
            <div className="w-px h-5 shrink-0" style={{ backgroundColor: colors.line }} />
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
            <div className="flex flex-col gap-[6px]">
              {stk.outcomes.map((outcome, i) => (
                <div
                  key={i}
                  className="flex items-center rounded-xl"
                  style={{
                    gap: isMobile ? "12px" : "16px",
                    padding: isMobile ? "12px 16px" : "14px 20px",
                    backgroundColor: i % 2 === 0 ? colors.background : "transparent",
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: i % 2 === 0 ? colors.white : colors.background }}
                  >
                    <span
                      className="text-[12px] font-bold font-['DM_Sans',sans-serif]"
                      style={{ color: colors.primary }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <span
                    className="text-[#333] font-['DM_Sans',sans-serif] leading-[1.5]"
                    style={{ fontSize: isMobile ? "14px" : "15px" }}
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
      className="rounded-[20px] flex flex-col"
      style={{
        backgroundColor: colors.white,
        border: `1px solid ${colors.line}`,
        padding: isMobile ? "24px" : "28px",
      }}
    >
      <div className="flex justify-between items-start mb-[14px]">
        <h3
          className="font-[Inter,sans-serif] text-[18px] font-semibold m-0 leading-[1.3]"
          style={{ color: colors.dark }}
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
      <div className="flex flex-col gap-[10px] mb-5">
        {c.strengths.map((s, si) => (
          <div key={si} className="flex items-center justify-between gap-3">
            <span className="font-[Inter,sans-serif] text-[13px] text-[#666] whitespace-nowrap">
              {s.name}
            </span>
            <div className="flex gap-[3px]">
              {[1, 2, 3, 4, 5].map((v) => (
                <div
                  key={v}
                  className="w-4 h-[6px] rounded-[3px]"
                  style={{
                    backgroundColor: v <= s.rating ? colors.accent : colors.line,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {isExpanded && (
        <div className="mb-5">
          <div className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#888] font-[Inter,sans-serif] mb-[10px]">
            Where BRIDGE Helps
          </div>
          <div className="flex flex-col gap-[6px] mb-4">
            {c.gaps.map((g, gi) => (
              <div
                key={gi}
                className="flex items-center gap-2 text-[13px] font-[Inter,sans-serif] text-[#555]"
              >
                <span className="shrink-0" style={{ color: colors.accent }}>{"\u2192"}</span>
                {g}
              </div>
            ))}
          </div>
          <div
            className="rounded-xl p-[14px_16px]"
            style={{
              backgroundColor: colors.accentLight,
              border: `1px solid ${colors.accent}`,
            }}
          >
            <div className="flex items-center gap-2 mb-[6px]">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: colors.accent }}
              >
                <span className="text-[10px] font-bold" style={{ color: colors.primary }}>{"\u2726"}</span>
              </div>
              <span
                className="text-[10px] font-bold uppercase tracking-[1px] font-[Inter,sans-serif]"
                style={{ color: colors.primary }}
              >
                BRIDGE Opportunity
              </span>
            </div>
            <p
              className="text-[13px] font-[Inter,sans-serif] m-0 leading-[1.5]"
              style={{ color: colors.primary }}
            >
              {c.bridgeOpportunity}
            </p>
          </div>
        </div>
      )}

      <div
        className="flex items-center justify-between pt-4 mt-auto"
        style={{ borderTop: `1px solid ${colors.line}` }}
      >
        {!hiddenNav ? (
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : competitors.length - 1);
                setIsExpanded(false);
              }}
              className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center text-[14px]"
              style={{
                border: `1px solid ${colors.line}`,
                backgroundColor: colors.white,
                color: colors.primary,
              }}
            >
              {"\u25C0"}
            </button>
            <span className="font-[Inter,sans-serif] text-[13px] text-[#999]">
              {currentIndex + 1} / {competitors.length}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(currentIndex < competitors.length - 1 ? currentIndex + 1 : 0);
                setIsExpanded(false);
              }}
              className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center text-[14px]"
              style={{
                border: `1px solid ${colors.line}`,
                backgroundColor: colors.white,
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
          className="bg-transparent rounded-full py-[6px] px-4 text-[12px] font-semibold font-[Inter,sans-serif] cursor-pointer flex items-center gap-[6px]"
          style={{
            border: `1px solid ${colors.line}`,
            color: colors.primary,
          }}
        >
          Analysis{" "}
          <ChevronDown size={12} strokeWidth={2.5} color={colors.primary} style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }} />
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
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6 px-5 py-[10px]"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
            }}
          >
            The Landscape
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[820px] mt-0 mb-4"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
            }}
          >
            Building With Ghana's <span className="font-semibold" style={{ color: colors.accent }}>Industrial Pioneers</span>
          </h2>
          <p
            className="font-[Inter,sans-serif] leading-[1.65] text-[#666] max-w-[680px] m-0"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
          >
            GIPC, AGI, and 1D1F anchor Ghana's industrial base. BRIDGE adds quality certification and supply chain
            integration — combining industrial policy with private sector execution.
          </p>
        </div>

        {isMobile && (
          <div className="flex justify-start mb-4">
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
          <div className="flex flex-col gap-4">
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
                <ChevronDown size={14} strokeWidth={2.5} color="white" />
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
                <div className="flex flex-col gap-2">
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
      icon: <Sprout size={24} strokeWidth={1.5} />,
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
      icon: <Wallet size={24} strokeWidth={1.5} />,
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
      icon: <GraduationCap size={24} strokeWidth={1.5} />,
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
      icon: <BatteryCharging size={24} strokeWidth={1.5} />,
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
      icon: <Blocks size={24} strokeWidth={1.5} />,
    },
  ];

  const activePath = activeNode !== null ? pathways[activeNode] : null;

  return (
    <section style={{ backgroundColor: colors.primary, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div className="text-center" style={{ marginBottom: isMobile ? "32px" : "48px" }}>
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6 px-5 py-[10px]"
            style={{
              backgroundColor: "rgba(184,217,53,0.15)",
              color: colors.accent,
            }}
          >
            The Ripple Effect
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[820px] mx-auto mt-0 mb-5"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.white,
            }}
          >
            How Manufacturing Amplifies <span className="font-semibold" style={{ color: colors.accent }}>Impact</span>
          </h2>
          <p className="font-[Inter,sans-serif] text-[16px] text-white/60 max-w-[680px] mx-auto leading-[1.65]">
            Every manufacturing venture creates compounding value across BRIDGE sectors. Explore how one investment
            becomes many.
          </p>
        </div>

        {/* Pathway Visual */}
        {isMobile ? (
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <div className="flex flex-col items-center gap-[6px]">
                <div
                  className="w-14 h-14 rounded-[14px] flex items-center justify-center"
                  style={{
                    backgroundColor: colors.accent,
                    color: colors.primary,
                    boxShadow: "0 0 24px rgba(184, 217, 53, 0.3)",
                  }}
                >
                  <Factory size={24} strokeWidth={1.5} />
                </div>
                <span
                  className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[0.5px]"
                  style={{ color: colors.accent }}
                >
                  Manufacturing
                </span>
              </div>
            </div>
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
          <div className="flex items-start justify-center gap-8 mb-12">
            <div className="w-[120px] flex flex-col items-center shrink-0">
              <div
                className="w-20 h-20 rounded-[20px] flex items-center justify-center mb-[10px]"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.primary,
                  boxShadow: "0 0 30px rgba(184, 217, 53, 0.3)",
                }}
              >
                <Factory size={32} strokeWidth={1.5} />
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
                className="flex gap-2 flex-wrap mb-7 items-center"
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
                    className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1px] mb-4"
                    style={{ color: colors.accent }}
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
                  <div className="flex items-baseline gap-2">
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
                      className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1px] mb-4"
                      style={{ color: colors.accent }}
                    >
                      Synergy Pathways
                    </h4>
                    <div className="flex flex-col gap-[10px]">
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
                      className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1px] mb-4"
                      style={{ color: colors.accent }}
                    >
                      Linked Ventures
                    </h4>
                    <div className="flex flex-col gap-[10px]">
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
                      href={SECTOR_ROUTES[activePath.name] || "/sectors"}
                      onClick={(e) => { e.preventDefault(); navigate(SECTOR_ROUTES[activePath.name] || "/sectors"); }}
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
                  <ChevronDown size={14} strokeWidth={2.5} color="white" style={{ transform: showMoreRipple ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }} />
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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("returns");
  const [activeAudience, setActiveAudience] = useState(0);
  const [showInvestmentDetails, setShowInvestmentDetails] = useState(false);
  const aud = investmentAudiences[activeAudience];

  return (
    <section style={{ backgroundColor: colors.background, padding: isMobile ? "60px 0" : "100px 80px" }}>
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <div
          style={{
            marginBottom: isMobile ? "32px" : "48px",
            padding: isMobile ? "0 20px" : 0,
            textAlign: isMobile ? "center" : "left",
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
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[820px] mt-0 mb-4"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
            }}
          >
            Every <span className="font-semibold" style={{ color: colors.primary }}>Stakeholder</span> Has a Role in{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>Industrial Growth</span>
          </h2>
          <p className="font-[Inter,sans-serif] text-[16px] text-[#666] leading-[1.65] m-0 max-w-[700px]">
            Investment isn't only capital — it's expertise, partnerships, policy, and vision. See how your role
            contributes to {sectorData.ventures} ventures across {sectorData.capitalRange} in opportunity.
          </p>
        </div>

        {/* Audience Selector */}
        {isMobile ? (
          <div
            className="flex justify-center gap-3 mb-6 px-5"
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
          <div className="flex flex-col">
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
                  <div className="flex flex-col gap-1 flex-1">
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
              <div className="flex flex-col gap-[10px] flex-1">
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
              <ChevronDown size={14} strokeWidth={2.5} color={colors.primary} />
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
  const navigate = useNavigate();
  return (
    <section
      className="text-center"
      style={{ backgroundColor: colors.primary, padding: isMobile ? "60px 20px" : "100px 80px" }}
    >
      <div className="max-w-[900px] mx-auto text-center">
        <span
          className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6 px-5 py-[10px]"
          style={{
            backgroundColor: "rgba(184, 217, 53, 0.15)",
            color: colors.accent,
          }}
        >
          Let's Build Ghana's Industrial Future
        </span>
        <h2
          className="font-[Inter,sans-serif] font-light leading-[1.2] mt-0 mb-6"
          style={{
            fontSize: isMobile ? "32px" : "48px",
            color: colors.white,
          }}
        >
          Let's Build Ghana's <span className="font-semibold" style={{ color: colors.accent }}>Industrial Future</span>
        </h2>
        <p
          className="font-[Inter,sans-serif] leading-[1.7] text-white/70 max-w-[680px] mx-auto mt-0 mb-10"
          style={{ fontSize: isMobile ? "16px" : "18px" }}
        >
          Whether you're an investor, partner, or government stakeholder, there's a seat at the table in building
          Ghana's local production capacity.
        </p>
        <div
          className="flex gap-4 justify-center items-center"
          style={{ flexDirection: isMobile ? "column" : "row" }}
        >
          <button
            onClick={() => navigate("/contact")}
            className="border-none rounded-full text-[15px] font-semibold font-[Inter,sans-serif] cursor-pointer flex items-center justify-center gap-[10px]"
            style={{
              backgroundColor: colors.accent,
              color: colors.primary,
              padding: isMobile ? "16px 24px" : "16px 32px",
              width: isMobile ? "100%" : "auto",
            }}
          >
            Start a Conversation
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: colors.primary,
                color: colors.white,
              }}
            >
              <IconArrowRight />
            </span>
          </button>
          <button
            onClick={() => navigate("/resources")}
            className="bg-transparent rounded-full text-[15px] font-semibold font-[Inter,sans-serif] cursor-pointer"
            style={{
              color: colors.white,
              border: "1px solid rgba(255,255,255,0.3)",
              padding: isMobile ? "16px 24px" : "16px 32px",
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

export default function ManufacturingSectorPage() {
  const isMobile = useIsMobile();
  return (
    <Layout>
      <style>{`
        * { -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 2px; }
      `}</style>
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
        <div className="h-px bg-white/[0.08]" />
      </div>
    </Layout>
  );
}
