import React, { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { IconWheat, IconBuilding, IconWallet, IconFactory, IconTruck, IconZap, IconArrowRight, IconArrowDown, IconCheck, IconStorefront, IconOfficeBuilding, IconTrendingUp, IconLandmark, IconWarning, IconUsers, IconLightbulb, IconPlane, IconMusic, IconGraduationCap, IconCpu } from "@/components/icons/SectorIcons";
import { AlertTriangle, ArrowRight, Check, Globe, GraduationCap, Lock, Music, Palette, Search, Shield, Star, Trophy, Users } from "lucide-react";

// ============================================================================
// BRIDGE SECTOR PAGE: Sports, Entertainment & Creative Industries
// INTEGRATED VERSION with Premium ValueChain Section
// ============================================================================
// Design System: Dark Green #1B4D3E, Lime #B8D935, Off-white #F3F5F2
// ============================================================================

import { colors, layout } from "@/lib/theme";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useCounter } from "@/hooks/useCounter";
import { cn } from "@/lib/utils";

const CONTENT_MAX_WIDTH = layout.maxWidth;

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

// Premium Value Chain Icons
const valueChainIcons = {
  palette: <Palette size={24} strokeWidth={1.5} />,
  studio: <Music size={24} strokeWidth={1.5} />,
  shield: <Shield size={24} strokeWidth={1.5} />,
  globe: <Globe size={24} strokeWidth={1.5} />,
  users: <Users size={24} strokeWidth={1.5} />,
};


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
    "Sector Briefs": "/sectors",
    "Policy Updates": "/policy",
    "Annual Review": "/resources",
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
                className="px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[1.5px] font-[Inter,sans-serif]"
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
              className="font-[Inter,sans-serif] font-normal leading-[1.1] mb-5 -tracking-[1px]"
              style={{
                fontSize: isMobile ? "30px" : "52px",
                color: colors.primary,
                marginTop: 0,
              }}
            >
              <span className="font-bold">Sports</span> & Creative{!isMobile && <br />} Entertainment
            </h1>

            {/* Subheading */}
            <h2
              className="font-[Inter,sans-serif] font-semibold leading-[1.3] mb-4"
              style={{
                fontSize: isMobile ? "20px" : "24px",
                color: colors.dark,
                marginTop: 0,
              }}
            >
              Where talent meets opportunity on the global stage.
            </h2>

            {/* Description */}
            <p
              className="font-[Inter,sans-serif] font-normal leading-[1.7] text-[#555] max-w-[540px]"
              style={{
                fontSize: isMobile ? "15px" : "16px",
                margin: "0 0 36px 0",
              }}
            >
              {sector.problemSubheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex gap-3" style={{ flexWrap: isMobile ? "wrap" : "nowrap" }}>
              <button
                className="flex items-center gap-[10px] border-none rounded-full font-semibold font-[Inter,sans-serif] cursor-pointer"
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
              <span
                className="text-[11px] font-bold uppercase tracking-[1.5px] font-[Inter,sans-serif] text-white/50"
              >
                Sector Overview
              </span>
              <span
                className="bg-[rgba(184,217,53,0.15)] px-[14px] py-[6px] rounded-full text-[11px] font-bold uppercase tracking-[1px]"
                style={{
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
                  className="text-[42px] font-bold font-[Inter,sans-serif] leading-none mb-2"
                  style={{ color: colors.accent }}
                >
                  {sector.capitalRange}
                </div>
                <div className="text-[13px] font-medium text-white/50 font-[Inter,sans-serif]">
                  Investment Range
                </div>
              </div>
              <div className="text-right">
                <div
                  className="text-[42px] font-bold font-[Inter,sans-serif] leading-none mb-2"
                  style={{ color: colors.accent }}
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
          <div className="text-[#999] animate-bounce">
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
const processIcons = {
  search: <Search size={20} strokeWidth={1.75} />,
  academy: <GraduationCap size={20} strokeWidth={1.75} />,
  shield: <Shield size={20} strokeWidth={1.75} />,
  trophy: <Trophy size={20} strokeWidth={1.75} />,
  star: <Star size={20} strokeWidth={1.75} />,
  palette: <Palette size={20} strokeWidth={1.75} />,
  music: <Music size={20} strokeWidth={1.75} />,
  lock: <Lock size={20} strokeWidth={1.75} />,
  globe: <Globe size={20} strokeWidth={1.75} />,
  users: <Users size={20} strokeWidth={1.75} />,
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
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* \u2550\u2550\u2550 HEADER \u2550\u2550\u2550 */}
        <div className="text-center" style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="inline-block px-5 py-[10px] rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
            }}
          >
            The Process
          </span>

          <h2
            className="font-[Inter,sans-serif] font-light -tracking-[0.5px] leading-[1.2] mb-4"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
              marginTop: 0,
            }}
          >
            From Talent <span className="font-semibold">Recognition</span> to{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>Global Impact</span>
          </h2>

          <p
            className="text-[#555] max-w-[620px] mx-auto leading-[1.7]"
            style={{
              fontSize: isMobile ? "15px" : "16px",
              margin: "0 auto 36px",
            }}
          >
            Two distinct pathways where Ghanaian talent meets global opportunity — each with unique value chains,
            challenges, and BRIDGE interventions.
          </p>

          {/* \u2550\u2550\u2550 TOGGLE \u2550\u2550\u2550 */}
          <div
            className="inline-flex rounded-full overflow-hidden"
            style={{
              border: `1px solid ${colors.line}`,
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
            <div className="flex gap-2 overflow-x-auto justify-center mb-5" style={{ WebkitOverflowScrolling: "touch", margin: "0 -20px", padding: "0 20px 8px", marginBottom: "20px" }}>

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
                      className="text-[10px] font-semibold whitespace-nowrap transition-colors duration-300"
                      style={{
                        color: isAct ? colors.white : "#888",
                      }}
                    >
                      {stage.stage.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex gap-3 mb-7 pt-6">
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
                      className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: isAct ? colors.accent : colors.background,
                        border: `2px solid ${isAct ? colors.primary : "#ccc"}`,
                        color: isAct ? colors.primary : "#bbb",
                      }}
                    >
                      {processIcons[iconKeys[i]]}
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-[1.5px] block mb-1"
                      style={{
                        color: isAct ? "rgba(255,255,255,0.45)" : "#bbb",
                      }}
                    >
                      Stage {stage.id}
                    </span>
                    <div
                      className="text-[14px] font-semibold transition-colors duration-300"
                      style={{
                        color: isAct ? colors.white : "#888",
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
              <div className="overflow-hidden" style={{ padding: isMobile ? "24px" : "40px 44px" }}>
                <div className="mb-[6px]">
                  <span
                    className="font-bold uppercase tracking-[1.5px]"
                    style={{
                      fontSize: isMobile ? "14px" : "16px",
                      color: colors.primary,
                    }}
                  >
                    {active.actor}
                  </span>
                </div>
                <div className="text-[14px] text-[#777] mb-4">{active.population}</div>
                <p className="text-[14px] text-[#555] leading-[1.7]" style={{ margin: "0 0 24px 0" }}>
                  {active.description}
                </p>

                {(!isMobile || showMore) && (
                  <>
                    <div className="h-px mb-5" style={{ backgroundColor: colors.line }} />
                    <div
                      className="text-[10px] font-bold uppercase tracking-[1.5px] mb-3 opacity-50"
                      style={{ color: colors.primary }}
                    >
                      Challenges & Opportunities
                    </div>
                    <div className="flex flex-col gap-[6px]">
                      {active.painPoints.map((p, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-[10px] bg-[rgba(184,217,53,0.1)] rounded-[10px] border border-[rgba(184,217,53,0.25)]"
                          style={{
                            padding: isMobile ? "8px 12px" : "10px 14px",
                          }}
                        >
                          <AlertTriangle size={14} stroke="#D97706" strokeWidth={2} className="shrink-0" />
                          <span className="text-[13px] leading-[1.4]" style={{ color: colors.primary }}>{p}</span>
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
                    className="text-[10px] font-bold uppercase tracking-[1.5px] mb-[14px] opacity-50"
                    style={{ color: colors.primary }}
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
                      className="h-full rounded-[19px] flex items-center transition-all duration-[800ms]"
                      style={{
                        width: `${active.valueRetained}%`,
                        backgroundColor: retColor(active.valueRetained),
                        paddingLeft: active.valueRetained > 20 ? "16px" : "0",
                        justifyContent: active.valueRetained <= 20 ? "center" : "flex-start",
                      }}
                    >
                      <span
                        className="text-[14px] font-bold"
                        style={{
                          color: active.valueRetained > 60 ? colors.primary : colors.white,
                        }}
                      >
                        {active.valueRetained}%
                      </span>
                    </div>
                  </div>
                  {/* Mini markers */}
                  <div className="flex justify-between mt-[10px] px-1">
                    {stages.map((s, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1">
                        <div
                          className="w-[6px] h-[6px] rounded-full transition-colors duration-300"
                          style={{
                            backgroundColor: idx === activeStage ? colors.primary : "#ccc",
                          }}
                        />
                        <span
                          className="text-[10px] font-semibold transition-colors duration-300"
                          style={{
                            color: idx === activeStage ? colors.primary : "#bbb",
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
                        className="font-bold font-[Poppins,sans-serif] -tracking-[1px] leading-[1.1] mb-[6px]"
                        style={{
                          fontSize: isMobile ? "36px" : "42px",
                          color: colors.primary,
                        }}
                      >
                        {active.statNumber}
                      </div>
                      <div className="text-[13px] text-[#777] leading-[1.45]">{active.statLabel}</div>
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
                        className="w-[26px] h-[26px] rounded-full flex items-center justify-center shrink-0 mt-px"
                        style={{ backgroundColor: colors.accent }}
                      >
                        <span className="text-[12px] font-[800]" style={{ color: colors.primary }}>B</span>
                      </div>
                      <div>
                        <div
                          className="text-[10px] font-bold uppercase tracking-[1.5px] mb-[5px]"
                          style={{ color: colors.accent }}
                        >
                          BRIDGE Intervention
                        </div>
                        <div className="text-[13px] text-white/80 leading-[1.6]">
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
                    <ChevronDown size={14} strokeWidth={2.5} color={colors.primary} style={{ transform: showMore ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* \u2500\u2500\u2500 FLOW PATHWAY \u2014 desktop only \u2500\u2500\u2500 */}
          {!isMobile && (
            <div className="flex items-center justify-center mt-[18px] py-2">
              {stages.map((stage, i) => (
                <Fragment key={stage.id}>
                  <div
                    onClick={() => setActiveStage(i)}
                    className="flex flex-col items-center gap-2 cursor-pointer transition-opacity duration-300"
                    style={{
                      opacity: i === activeStage ? 1 : 0.35,
                    }}
                  >
                    <div
                      className="w-[42px] h-[42px] rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        backgroundColor: i === activeStage ? colors.primary : colors.background,
                        border: `2px solid ${i === activeStage ? colors.primary : colors.line}`,
                        color: i === activeStage ? colors.accent : "#999",
                      }}
                    >
                      {processIcons[iconKeys[i]]}
                    </div>
                    <span
                      className="text-[11px] font-semibold whitespace-nowrap transition-colors duration-300"
                      style={{
                        color: i === activeStage ? colors.primary : "#aaa",
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
      <div className="flex justify-between items-start mb-3">
        <h3
          className="font-[Inter,sans-serif] font-semibold m-0 leading-[1.3] flex-1"
          style={{
            fontSize: isMobile ? "16px" : "18px",
            color: colors.dark,
          }}
        >
          {problem.title}
        </h3>
        <span
          className="px-[14px] py-[6px] rounded-[20px] text-[11px] font-bold uppercase tracking-[0.5px] whitespace-nowrap shrink-0 ml-3"
          style={{
            backgroundColor: sev.bg,
            color: sev.text,
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
        className="rounded-xl"
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
        <div style={{ borderTop: `1px solid ${colors.line}`, paddingTop: "16px" }}>
          {/* Zone 3 — Priority + Scale */}
          <div
            className="grid gap-3 mb-5"
            style={{
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            }}
          >
            <div className="rounded-xl p-[14px]" style={{ backgroundColor: colors.background }}>
              <div className="flex items-center justify-between mb-[10px]">
                <span className="font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888]">
                  Priority
                </span>
                <span
                  className="font-[Inter,sans-serif] text-[12px] font-bold px-[10px] py-1 rounded-[20px]"
                  style={{
                    color: sev.text,
                    backgroundColor: sev.bg,
                  }}
                >
                  {problem.severity}
                </span>
              </div>
              <div className="h-2 rounded overflow-hidden" style={{ backgroundColor: colors.line }}>
                <div
                  className="h-full rounded"
                  style={{
                    width: `${problem.severityScore}%`,
                    backgroundColor: sev.bar,
                  }}
                />
              </div>
            </div>
            <div className="rounded-xl p-[14px]" style={{ backgroundColor: colors.background }}>
              <span className="font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888] block mb-2">
                Scale
              </span>
              <div className="flex items-baseline gap-2">
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

          {/* Zone 4 — Opportunity Drivers */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={16} strokeWidth={1.5} color="#888" />
              <span className="font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888]">
                Opportunity Drivers
              </span>
            </div>
            <div className="grid gap-[10px]" style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>
              {problem.rootCauses.map((cause, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl"
                  style={{
                    padding: isMobile ? "10px 12px" : "12px 14px",
                    backgroundColor: colors.background,
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[13px] font-semibold font-[Inter,sans-serif] shrink-0"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.white,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div>
                    <div
                      className="font-[Inter,sans-serif] font-semibold leading-[1.3]"
                      style={{
                        fontSize: isMobile ? "13px" : "14px",
                        color: colors.dark,
                      }}
                    >
                      {cause.title}
                    </div>
                    <div className="font-[Inter,sans-serif] text-[12px] text-[#888] mt-[2px]">
                      {cause.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Zone 5 — BRIDGE Solution Footer */}
          <div
            className="flex pt-4"
            style={{
              borderTop: `1px solid ${colors.line}`,
              alignItems: isMobile ? "flex-start" : "center",
              gap: isMobile ? "8px" : "16px",
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <div className="flex items-center gap-2 flex-1">
              <Check size={18} stroke={colors.accent} strokeWidth={2.5} className="shrink-0" />
              <span className="font-[Inter,sans-serif] text-[13px] text-[#888] shrink-0">
                BRIDGE Solution:
              </span>
              <span
                className="font-[Inter,sans-serif] text-[14px] font-semibold"
                style={{ color: colors.primary }}
              >
                {problem.bridgeSolution}
              </span>
            </div>
            <span
              className="font-[Inter,sans-serif] text-[13px] font-medium inline-flex items-center gap-1 shrink-0 cursor-pointer"
              style={{ color: colors.primary }}
            >
              View
              <ArrowRight size={14} strokeWidth={2} />
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
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Section Header */}
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="inline-block px-5 py-[10px] rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
            }}
          >
            The Opportunity
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light -tracking-[0.5px] leading-[1.2] max-w-[820px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
              margin: "0 0 20px 0",
            }}
          >
            Where Opportunity Meets <span className="font-semibold" style={{ color: colors.accent }}>Creative Energy</span>
          </h2>
          <p
            className="font-[Inter,sans-serif] text-[#666] max-w-[680px] leading-[1.65] m-0"
            style={{
              fontSize: isMobile ? "15px" : "16px",
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
          <div className="flex justify-center gap-2 mt-4">
            {problemSectionData.map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
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
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Section Header */}
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="inline-block bg-[rgba(184,217,53,0.15)] px-5 py-[10px] rounded-full text-[11px] font-bold uppercase tracking-[1.5px] font-[Inter,sans-serif] mb-6"
            style={{ color: colors.accent }}
          >
            The Pathway to Impact
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light -tracking-[0.5px] mb-5 leading-[1.2] max-w-[900px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.white,
            }}
          >
            Ventures That Build Lasting Creative <span className="font-semibold" style={{ color: colors.accent }}>Value</span>
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
                className="font-semibold mb-2 leading-[1.3]"
                style={{
                  fontSize: isMobile ? "17px" : "18px",
                  color: colors.primary,
                }}
              >
                {solution.name}
              </div>
              <div className="text-[14px] text-[#666] leading-[1.6] mb-5 flex-1">
                {solution.description}
              </div>

              {/* Bottom row */}
              <div className="flex justify-between items-center pt-4 border-t border-black/[0.08]">
                <div>
                  <div className="text-[11px] text-black/40 uppercase tracking-[1px] mb-[2px]">
                    Capital
                  </div>
                  <div
                    className="text-[16px] font-semibold font-[Poppins,sans-serif]"
                    style={{ color: colors.primary }}
                  >
                    {solution.capital}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-black/40 uppercase tracking-[1px] mb-[2px]">
                    Impact
                  </div>
                  <div className="text-[12px] text-[#555] max-w-[160px]">{solution.impact}</div>
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
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className="w-4 h-2 rounded transition-colors duration-300"
          style={{
            backgroundColor: i < score ? "#6B8E23" : "#ddd",
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
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="inline-block px-5 py-[10px] rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
            }}
          >
            The Landscape
          </span>
          <h2
            className="font-[Inter,sans-serif] font-light -tracking-[0.5px] leading-[1.2]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
              margin: "0 0 20px 0",
            }}
          >
            Building With Ghana's Creative <span className="font-semibold" style={{ color: colors.accent }}>Institutions</span>
          </h2>
          <p
            className="font-[Inter,sans-serif] text-[#666] max-w-[600px] leading-[1.65] mx-auto"
            style={{
              fontSize: isMobile ? "15px" : "16px",
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
            <div className="mb-8">
              <div className="font-[Inter,sans-serif] text-[11px] font-bold uppercase tracking-[1.5px] text-[#999] mb-5">
                Strengths
              </div>
              <div className="flex flex-col gap-4">
                {active.strengths.map((s, i) => (
                  <div key={i} className="flex justify-between items-center gap-4">
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
            <div className="mb-8">
              <div className="font-[Inter,sans-serif] text-[11px] font-bold uppercase tracking-[1.5px] text-[#999] mb-4">
                Collaboration Opportunities
              </div>
              <div className="flex gap-2 flex-wrap">
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
              className="rounded-xl"
              style={{
                padding: "20px 24px",
                backgroundColor: colors.primary,
              }}
            >
              <div className="font-[Inter,sans-serif] text-[11px] font-bold uppercase tracking-[1.5px] text-white/50 mb-2">
                BRIDGE Opportunity
              </div>
              <div
                className="font-[Inter,sans-serif] text-[15px] leading-[1.6]"
                style={{ color: colors.white }}
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

      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* HEADER */}
        <div style={{ marginBottom: isMobile ? "32px" : "60px", textAlign: isMobile ? "left" : "center" }}>
          <span
            className="inline-block px-5 py-[10px] rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
            }}
          >
            The Governance & Policy
          </span>

          <h2
            className="font-[Inter,sans-serif] font-light -tracking-[0.5px] leading-[1.2] max-w-[820px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
              margin: isMobile ? "0 0 16px 0" : "0 auto 16px",
            }}
          >
            Moving in Step with Ghana's <span className="font-semibold">Creative</span>{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>Vision</span>
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
                  <span className="text-[13px] font-bold" style={{ color: colors.accent }}>{item.allocation}</span>
                  <p
                    className="text-[13px] text-[#666] leading-[1.55]"
                    style={{
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
                  <ChevronDown size={12} strokeWidth={2.5} color={isExp ? colors.primary : "#bbb"} style={{ transform: isExp ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }} />
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
                    <div className="text-[11px] text-[#888] mt-4 mb-3">
                      {item.body}
                    </div>
                    <p className="text-[13px] text-[#444] leading-[1.6]" style={{ margin: "0 0 16px 0" }}>
                      {item.bridgeRole}
                    </p>
                    {item.pillars && item.pillars.length > 0 && (
                      <div className="mb-4">
                        <div
                          className="text-[9px] font-bold uppercase tracking-[1.5px] mb-2 opacity-50"
                          style={{ color: colors.primary }}
                        >
                          BSE Pillars
                        </div>
                        <div className="flex gap-1 flex-wrap">
                          {item.pillars.map((p) => (
                            <span
                              key={p}
                              className="px-2 py-[3px] rounded-full text-[9px] font-semibold bg-[rgba(184,217,53,0.12)] border border-[rgba(184,217,53,0.25)]"
                              style={{ color: colors.primary }}
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div
                      className="text-[9px] font-bold uppercase tracking-[1.5px] mb-2 opacity-50"
                      style={{ color: colors.primary }}
                    >
                      BRIDGE Ventures
                    </div>
                    <div className="flex flex-col gap-[6px]">
                      {item.bridgeVentures.map((v, vi) => (
                        <div
                          key={vi}
                          className="flex items-center gap-2 px-[14px] py-[10px] rounded-[10px]"
                          style={{ backgroundColor: colors.primary }}
                        >
                          <div
                            className="w-[6px] h-[6px] rounded-full shrink-0"
                            style={{ backgroundColor: colors.accent }}
                          />
                          <span className="text-[12px] text-white/90 font-medium">
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
          <a
            href="/methodology"
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
              textDecoration: "none",
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
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="inline-block bg-[rgba(184,217,53,0.15)] px-5 py-[10px] rounded-full text-[11px] font-bold uppercase tracking-[1.5px] font-[Inter,sans-serif] mb-6"
            style={{ color: colors.accent }}
          >
            The Ripple Effect
          </span>

          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] -tracking-[0.5px] mx-auto mb-4 max-w-[820px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.white,
              marginTop: 0,
            }}
          >
            How Creative Industries <span className="font-semibold" style={{ color: colors.accent }}>Amplify Impact</span>
          </h2>

          <p className="font-[Inter,sans-serif] text-[16px] text-white/60 leading-[1.65] mx-auto max-w-[680px]" style={{ marginTop: 0 }}>

            The creative economy touches every other BRIDGE sector \u2014 from technology to tourism, financial systems
            to manufacturing.
          </p>
        </div>

        {/* Pathway Visual */}
        {isMobile ? (
          /* MOBILE: Hub on top, 5 icons below */
          <div className="mb-6">
            {/* Hub Icon */}
            <div className="flex flex-col items-center mb-4">
              <div
                className="w-14 h-14 rounded-[14px] flex items-center justify-center mb-2 shadow-[0_0_24px_rgba(184,217,53,0.3)]"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.primary,
                }}
              >
                <IconMusic />
              </div>
              <span
                className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[0.5px]"
                style={{ color: colors.accent }}
              >
                Creative Industries
              </span>
            </div>

            {/* Sector Icons Row */}
            <div className="flex justify-center gap-3">
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
          <div className="flex items-start justify-center gap-8 mb-12">
            {/* Hub Icon */}
            <div className="w-[120px] flex flex-col items-center shrink-0">
              <div
                className="w-20 h-20 rounded-[20px] flex items-center justify-center mb-[10px] shadow-[0_0_30px_rgba(184,217,53,0.3)]"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.primary,
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
                      href="/services"
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
                  <ChevronDown size={14} strokeWidth={2.5} color="white" style={{
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
        <div className="flex justify-between items-start mb-[10px]">
          <div className="flex items-start gap-[10px]">
            <div
              className="text-[28px] font-bold font-[Poppins,sans-serif] -tracking-[1px] leading-none"
              style={{ color: colors.primary }}
            >
              {formatValue()}
            </div>
            <div
              className="text-[10px] font-bold uppercase tracking-[0.5px] mt-1"
              style={{ color: colors.accent }}
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
            <div className="text-[9px] font-bold text-[#aaa] uppercase tracking-[1px] mb-[2px]">
              Ventures
            </div>
            <div className="text-[10px] font-medium leading-[1.4]" style={{ color: colors.primary }}>
              {item.ventures}
            </div>
          </div>
        </div>
        <div
          className="text-[14px] font-bold font-[Inter,sans-serif] mb-[3px]"
          style={{ color: colors.primary }}
        >
          {item.label}
        </div>
        <div className="text-[13px] text-[#666] leading-[1.5] font-[Inter,sans-serif]">
          {item.description}
        </div>
      </div>
    );
  }

  return (
    <div
      className="grid items-center transition-opacity duration-[400ms]"
      style={{
        gridTemplateColumns: "200px 1fr 200px",
        gap: "32px",
        padding: "24px 28px",
        backgroundColor: index % 2 === 0 ? colors.white : "transparent",
        opacity: visible ? 1 : 0,
      }}
    >
      <div className="flex justify-between items-start">
        <div
          className="text-[36px] font-bold font-[Poppins,sans-serif] -tracking-[1px] leading-none"
          style={{ color: colors.primary }}
        >
          {formatValue()}
        </div>
        <div
          className="text-[10px] font-bold uppercase tracking-[0.5px] mt-1"
          style={{ color: colors.accent }}
        >
          {item.trend}
        </div>
      </div>
      <div>
        <div
          className="text-[15px] font-bold font-[Inter,sans-serif] mb-1"
          style={{ color: colors.primary }}
        >
          {item.label}
        </div>
        <div className="text-[13px] text-[#666] leading-[1.5] font-[Inter,sans-serif]">
          {item.description}
        </div>
      </div>
      <div
        className="rounded-[10px]"
        style={{
          backgroundColor: index % 2 === 0 ? colors.background : "rgba(27,77,62,0.04)",
          padding: "10px 16px",
        }}
      >
        <div className="text-[9px] font-bold text-[#aaa] uppercase tracking-[1px] mb-[2px]">
          Linked Ventures
        </div>
        <div className="text-[11px] font-medium leading-[1.4]" style={{ color: colors.primary }}>
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
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Section Header */}
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="inline-block px-5 py-[10px] rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
            }}
          >
            The Impact
          </span>

          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] -tracking-[0.5px] max-w-[900px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
              margin: "0 0 12px 0",
            }}
          >
            What Changes When <span className="font-semibold">Creative</span>
            <br />
            <span className="font-semibold">Industries</span>{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>Work</span>
          </h2>

          <p
            className="font-[Inter,sans-serif] text-[#555] leading-[1.7] max-w-[620px]"
            style={{
              fontSize: isMobile ? "15px" : "16px",
              margin: "0 0 40px 0",
            }}
          >
            When artists earn fairly, studios produce locally, and heritage connects to global markets \u2014 the ripple
            effects transform livelihoods, strengthen communities, and build lasting prosperity across Ghana.
          </p>

          {/* CONTROLS — left-justified, single outlined container */}
          <div className="flex justify-start">
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

              <div className="w-px h-5 shrink-0" style={{ backgroundColor: colors.line }} />

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
            <div className="flex flex-col gap-[6px]">
              {impactStakeholders[activeStakeholder].outcomes.map((o, i) => (
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
                    style={{
                      backgroundColor: i % 2 === 0 ? colors.white : colors.background,
                    }}
                  >
                    <span
                      className="font-[Inter,sans-serif] text-[12px] font-bold"
                      style={{ color: colors.primary }}
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
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Section Header */}
        <div
          style={{
            marginBottom: isMobile ? "32px" : "60px",
            padding: isMobile ? "0 20px" : 0,
            textAlign: isMobile ? "center" : "left",
          }}
        >
          <span
            className="inline-block px-5 py-[10px] rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
            }}
          >
            The Investment Thesis
          </span>

          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] -tracking-[0.5px] max-w-[820px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
              margin: isMobile ? "0 auto 16px" : "0 0 16px 0",
            }}
          >
            Every Stakeholder Has a Role in{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>Ghana's Creative Future</span>
          </h2>

          <p
            className="font-[Inter,sans-serif] text-[16px] text-[#666] leading-[1.65] max-w-[700px]"
            style={{
              margin: isMobile ? "0 auto" : "0",
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
            <div className="p-[14px_18px] bg-[rgba(27,77,62,0.06)] rounded-xl flex items-center gap-3">
              <div className="shrink-0 flex" style={{ color: colors.primary }}>
                <IconCheck />
              </div>
              <div className="font-[Inter,sans-serif] text-[13px] text-[#444] leading-[1.5]">
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
                  href="/resources"
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
              <ChevronDown size={14} strokeWidth={2.5} color={colors.primary} style={{
                  transform: showInvestmentDetails ? "rotate(180deg)" : "none",
                  transition: "transform 0.25s ease",
                }} />
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
  const navigate = useNavigate();

  return (
    <section
      className="text-center"
      style={{
        backgroundColor: colors.primary,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="mx-auto text-center" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <span
          className="inline-block bg-[rgba(184,217,53,0.15)] px-5 py-[10px] rounded-full text-[11px] font-bold uppercase tracking-[1.5px] font-[Inter,sans-serif] mb-6"
          style={{ color: colors.accent }}
        >
          Be Part of the Journey
        </span>

        <h2
          className="font-[Inter,sans-serif] font-light leading-[1.2] -tracking-[0.5px]"
          style={{
            fontSize: isMobile ? "32px" : "48px",
            color: colors.white,
            margin: "0 0 24px 0",
          }}
        >
          Let's Build Ghana's <span className="font-semibold" style={{ color: colors.accent }}>Creative Industries</span>
        </h2>

        <p
          className="font-[Inter,sans-serif] leading-[1.7] text-white/70 max-w-[620px] mx-auto"
          style={{
            fontSize: isMobile ? "16px" : "18px",
            margin: "0 0 40px 0",
          }}
        >
          Whether you're an investor, partner, or government stakeholder, there's a seat at the table in building
          Ghana's creative future.
        </p>

        <div
          className="flex gap-4 justify-center items-center"
          style={{ flexDirection: isMobile ? "column" : "row" }}
        >
          <button
            onClick={() => navigate("/contact")}
            className="flex items-center justify-center gap-[10px] border-none rounded-full text-[15px] font-semibold font-[Inter,sans-serif] cursor-pointer"
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
            className="bg-transparent border border-white/30 rounded-full text-[15px] font-semibold font-[Inter,sans-serif] cursor-pointer"
            style={{
              color: colors.white,
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
// MAIN PAGE COMPONENT
// ============================================================================

export default function SportsEntertainmentSectorPage() {
  const isMobile = useIsMobile();
  return (
    <Layout>
    <div
      className="font-[Inter,-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif] leading-[1.6] antialiased"
      style={{ color: colors.dark }}
    >
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
        <div className="h-px bg-white/[0.08]" />
      </div>
    </div>
    </Layout>
  );
}
