import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { IconArrowRight, IconArrowDown, IconCheck, IconTarget, IconStorefront, IconOfficeBuilding, IconTrendingUp, IconLandmark, IconBatteryCharging, IconBlocks, IconSprout, IconCross, IconFactory, IconTruck, IconChevronDown } from "@/components/icons/SectorIcons";
import { ChevronDown, ChevronRight, Coins, Home, Sun, Wrench, Zap } from "lucide-react";
import { FOOTER_SECTOR_ICONS } from "@/data/sectorIcons";
import { useCounter } from "@/hooks/useCounter";
import { energySector } from "@/data/sectors/energy";

// ============================================================================
// BRIDGE SECTOR PAGE: Energy & Renewable Resources
// Data imported from src/data/sectors/energy.ts
// ============================================================================

import { cn } from "@/lib/utils";
import { colors, layout } from "@/lib/theme";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectorFinalCTA from "@/components/sectors/SectorFinalCTA";
import SectorHeroSection from "@/components/sectors/SectorHeroSection";

const CONTENT_MAX_WIDTH = layout.maxWidth;

const StageIcon = ({ type, size = 20, color = "currentColor" }) => {
  switch (type) {
    case "sun":
      return <Sun size={size} strokeWidth={2} color={color} />;
    case "zap":
      return <Zap size={size} strokeWidth={2} color={color} />;
    case "coins":
      return <Coins size={size} strokeWidth={2} color={color} />;
    case "tool":
      return <Wrench size={size} strokeWidth={2} color={color} />;
    case "home":
      return <Home size={size} strokeWidth={2} color={color} />;
    default:
      return null;
  }
};


// ============================================================================
// SECTOR DATA — imported from src/data/sectors/energy.ts
// ============================================================================

const sectorData = {
  ...energySector,
  // NOTE: The remaining ~640 lines of inline data below are now redundant.
  // They are kept temporarily while all sector pages migrate to the same pattern.
  // Once validated, remove the duplicated fields below and use energySector directly.
  id: 10,
  slug: "energy",
  name: "Energy & Renewable Resources",
  shortName: "Energy",
  category: "Powering Progress",
  categoryColor: "#1B4D3E",
  heroTitleBold: "Energy",
  heroTitleRest: "& Renewable Resources",
  problemHeadline: "Powering Every Home, Business, and Community",

  capitalRange: "$12-22M",
  ventures: 18,
  jobsImpact: "14M+ households",
  gdpContribution: "2-6% GDP",

  // Tone-aligned: opportunity framing
  problemSubheadline:
    "Ghana's energy landscape is rich with potential — from 4.5-6 kWh/m² of daily solar irradiance across every region, to a clean cooking market ready to serve millions of families, to commercial solar demand driven by businesses seeking reliability. These are pathways where targeted investment and innovation can power lasting prosperity.",

  keyStats: [
    { value: "5,507MW", label: "Installed Capacity", detail: "Foundation for renewable expansion" },
    { value: "4.5-6", label: "kWh/m²/day Solar", detail: "Exceptional resource across all regions" },
    { value: "60%", label: "Clean Cooking Market", detail: "Households ready for transition" },
    { value: "$924M", label: "Annual Recapture Potential", detail: "Value lost to power interruptions" },
  ],

  // Opportunity section — base painPoints (enhanced inside component per handoff spec)
  painPoints: [
    {
      title: "Grid Modernization",
      description:
        "Businesses and households benefit from solar alternatives that reduce grid dependence — unlocking consistent, affordable power.",
      quantification: "$320-924M annual economic value to recapture from outages",
    },
    {
      title: "Clean Cooking Transition",
      description:
        "Millions of families ready for healthier cooking solutions — a market primed by the $200M Clean Cooking Outcome Bond.",
      quantification: "60% of households using polluting fuels; 6,500 lives annually",
    },
    {
      title: "Off-Grid Community Access",
      description:
        "Over 2 million Ghanaians in 170+ communities represent a ready market for mini-grid and solar home systems.",
      quantification: "2M+ people in 170+ communities awaiting energy access",
    },
    {
      title: "Solar Market Quality",
      description:
        "A certification and quality ecosystem will unlock consumer confidence and accelerate solar adoption nationwide.",
      quantification: "80%+ of market lacks certification; trust drives adoption",
    },
  ],

  // 18 Solutions — balanced 6 per tier for consistent filtered display
  solutions: [
    {
      tier: 1,
      name: "C&I Solar Installation Company",
      description:
        "Turnkey commercial and industrial solar systems with performance guarantees — reducing energy costs and eliminating grid dependency for businesses across Ghana.",
      capital: "$2-3.5M",
      score: 43,
      impact: "Reliable power for thousands of businesses",
      model: "Site assessment → design → install → maintain",
    },
    {
      tier: 1,
      name: "Clean Cooking Distribution Network",
      description:
        "Improved cookstoves and LPG distribution with PAYG financing, partnering with the $200M World Bank Clean Cooking Outcome Bond for unprecedented scale.",
      capital: "$1.5-2.5M",
      score: 41,
      impact: "Millions of families served nationwide",
      model: "PAYG mobile money integration",
    },
    {
      tier: 1,
      name: "Solar Technician Training Academy",
      description:
        "Certification programs for solar installers, mini-grid operators, and energy specialists — building a skilled workforce in partnership with universities.",
      capital: "$0.5-1M",
      score: 41,
      impact: "500+ certified technicians trained",
      model: "University partnership + Energy Commission standards",
    },
    {
      tier: 1,
      name: "Community Mini-Grid Development",
      description:
        "Solar+battery hybrid mini-grids for off-grid communities with productive use focus — powering irrigation, processing, and cold storage for growth.",
      capital: "$2-3M",
      score: 39,
      impact: "170+ communities newly electrified",
      model: "Community engagement + tariff collection systems",
    },
    {
      tier: 1,
      name: "Solar Cold Storage Network",
      description:
        "Agricultural cold storage powered by solar+battery systems, reducing post-harvest losses while demonstrating productive use of renewable energy assets.",
      capital: "$1-2M",
      score: 39,
      impact: "10+ facilities across agri-regions",
      model: "Pay-per-use with farmer cooperatives",
    },
    {
      tier: 1,
      name: "Quality Equipment Import & Distribution",
      description:
        "Verified import of solar panels, batteries, and inverters with manufacturer warranties and quality testing — building consumer trust and market integrity.",
      capital: "$1.5-2.5M",
      score: 38,
      impact: "Supply chain quality market-wide",
      model: "Tier-1 manufacturer partnerships",
    },
    {
      tier: 2,
      name: "Energy Efficiency Services",
      description:
        "Energy auditing and efficiency improvements for commercial buildings, hotels, and industrial facilities — maximizing value before solar generation investment.",
      capital: "$0.5-1M",
      score: 38,
      impact: "Pre-solar optimization for businesses",
      model: "Audit → implement → verify savings",
    },
    {
      tier: 2,
      name: "Residential Solar Financing Platform",
      description:
        "Consumer financing enabling household rooftop solar through installments or leasing — integrated with mobile money platforms and Ghanaian banking systems.",
      capital: "$1-2M",
      score: 37,
      impact: "Household energy independence path",
      model: "Mobile money installment payments",
    },
    {
      tier: 2,
      name: "Women in Clean Energy Accelerator",
      description:
        "Business acceleration for women entrepreneurs in solar, clean cooking, and efficiency — combining training, mentorship, and seed capital for enterprises.",
      capital: "$0.5-1M",
      score: 35,
      impact: "50+ women-led energy businesses",
      model: "Cohort-based training + seed funding",
    },
    {
      tier: 2,
      name: "Biogas Systems Company",
      description:
        "Institutional and community biogas converting agricultural waste to cooking fuel and electricity — deploying at schools, hospitals, and farming facilities.",
      capital: "$1-2M",
      score: 34,
      impact: "50 installations at key institutions",
      model: "Waste-to-fuel circular systems",
    },
    {
      tier: 2,
      name: "Mini-Grid Operating Company",
      description:
        "Professional management of mini-grids including tariff collection, maintenance, and productive use development — ensuring long-term system sustainability.",
      capital: "$0.5-1M",
      score: 34,
      impact: "Sustainability for built mini-grids",
      model: "Operations & maintenance contracts",
    },
    {
      tier: 2,
      name: "Solar Home Systems Distributor",
      description:
        "PAYG solar home systems for basic lighting and phone charging in areas awaiting mini-grid deployment — delivering immediate access for underserved families.",
      capital: "$0.5-1M",
      score: 33,
      impact: "Immediate access for remote homes",
      model: "PAYG via mobile money",
    },
    {
      tier: 3,
      name: "Utility-Scale Solar Investment",
      description:
        "Co-investment vehicle for participation in major solar generation projects — providing exposure to Ghana's growing utility-scale renewable energy transition.",
      capital: "$1-2M",
      score: 33,
      impact: "Utility-scale clean power generation",
      model: "Investment vehicle structure",
    },
    {
      tier: 3,
      name: "Battery Storage Solutions",
      description:
        "Behind-the-meter storage for commercial customers and mini-grids, providing outage protection and enabling deeper integration of renewable energy sources.",
      capital: "$0.5-1M",
      score: 32,
      impact: "Reliability assurance for solar users",
      model: "C&I behind-the-meter",
    },
    {
      tier: 3,
      name: "Clean Cooking PAYG Platform",
      description:
        "Digital financing platform for cookstoves and LPG access, spreading costs through mobile money to make clean cooking affordable for all households.",
      capital: "$0.3-0.5M",
      score: 31,
      impact: "Affordability for clean cooking access",
      model: "Mobile money micro-payments",
    },
    {
      tier: 3,
      name: "EV Charging Infrastructure",
      description:
        "Solar-powered EV charging network supporting government electric mobility transition — deploying at strategic locations in Greater Accra and Kumasi.",
      capital: "$1-2M",
      score: 28,
      impact: "50 charging points at key locations",
      model: "Solar-powered stations",
    },
    {
      tier: 3,
      name: "Utility-Scale Solar Co-Investment",
      description:
        "Diaspora co-investment vehicle enabling participation in major solar projects like the Norbert Anku expansion — connecting global capital to local scale.",
      capital: "$1-2M",
      score: 27,
      impact: "Diaspora access to utility projects",
      model: "Co-investment SPV",
    },
    {
      tier: 3,
      name: "Regional Expansion Platform",
      description:
        "Technical assistance and investment vehicle for replicating proven BRIDGE energy models across West Africa — scaling what works beyond Ghana's borders.",
      capital: "$0.5-1M",
      score: 26,
      impact: "West African market replication",
      model: "Franchise / licensing model",
    },
  ],

  // Ecosystem & Allies — normalized text for consistent card display
  competitors: [
    {
      name: "VRA / Bui Power Authority",
      focus: "Utility-scale power generation and floating solar",
      gap: "Slow procurement, limited C&I focus",
      year: "1961",
      funding: "Gov't",
      priority: "High",
      marketShare: "65%",
      coverage: "National",
      employees: "3,000+",
      strengths: [
        { name: "Generation Capacity", rating: 5 },
        { name: "Technical Expertise", rating: 4 },
        { name: "Government Backing", rating: 5 },
      ],
      gaps: ["C&I market gap", "Procurement speed", "Limited retail"],
      bridgeOpportunity: "Complementary C&I and community-scale solar deployment",
      partnershipType: "Collaborate",
      synergyAreas: ["Mini-grid partnerships", "Floating solar co-development", "Technical training"],
    },
    {
      name: "BXC Ghana / Meinergy",
      focus: "Commercial and industrial solar installations",
      gap: "Limited SME reach, urban concentration",
      year: "2015",
      funding: "Private",
      priority: "Medium",
      marketShare: "15%",
      coverage: "Urban",
      employees: "100+",
      strengths: [
        { name: "Market Presence", rating: 4 },
        { name: "Corporate Clients", rating: 4 },
        { name: "Product Range", rating: 3 },
      ],
      gaps: ["SME market access", "Rural presence", "Financing products"],
      bridgeOpportunity: "Expanding solar access to the underserved SME segment",
      partnershipType: "Parallel",
      synergyAreas: ["Equipment sourcing", "Installer training graduates", "Market development"],
    },
    {
      name: "UpEnergy Ghana",
      focus: "Clean cookstove distribution via Outcome Bond",
      gap: "Subsidy dependent, scale challenges",
      year: "2020",
      funding: "World Bank",
      priority: "High",
      marketShare: "10%",
      coverage: "Select regions",
      employees: "50+",
      strengths: [
        { name: "Results-Based Financing", rating: 5 },
        { name: "World Bank Partnership", rating: 5 },
        { name: "Distribution Networks", rating: 3 },
      ],
      gaps: ["Scale constraints", "Subsidy dependency", "Rural reach"],
      bridgeOpportunity: "Distribution partnership for Outcome Bond scale-up",
      partnershipType: "Collaborate",
      synergyAreas: ["Distribution channels", "PAYG platform", "Community engagement"],
    },
    {
      name: "SREP Mini-Grid Program",
      focus: "Government-funded mini-grids for 70K+ people",
      gap: "Implementation delays, sustainability questions",
      year: "2025",
      funding: "CIF/AfDB",
      priority: "High",
      marketShare: "N/A",
      coverage: "Targeted",
      employees: "N/A",
      strengths: [
        { name: "Funded Infrastructure", rating: 5 },
        { name: "Community Identification", rating: 4 },
        { name: "Government Commitment", rating: 4 },
      ],
      gaps: ["Operational management", "Post-construction sustainability", "Productive use"],
      bridgeOpportunity: "Operations management and productive use development",
      partnershipType: "Collaborate",
      synergyAreas: ["Mini-grid operations", "Tariff collection systems", "Productive use programs"],
    },
    {
      name: "Local Solar Installers",
      focus: "Residential and small commercial solar systems",
      gap: "Variable quality, no certification, limited financing",
      year: "Various",
      funding: "Self-funded",
      priority: "Medium",
      marketShare: "20%",
      coverage: "Fragmented",
      employees: "500+",
      strengths: [
        { name: "Local Presence", rating: 4 },
        { name: "Cost Advantage", rating: 4 },
        { name: "Community Trust", rating: 3 },
      ],
      gaps: ["Quality assurance", "Professional certification", "Warranty frameworks"],
      bridgeOpportunity: "Certification pathways and quality equipment access",
      partnershipType: "Collaborate",
      synergyAreas: ["Training academy graduates", "Equipment distribution", "Quality standards"],
    },
    {
      name: "Energy Commission",
      focus: "Energy sector regulation and licensing authority",
      gap: "Limited enforcement capacity, slow licensing",
      year: "1997",
      funding: "Gov't",
      priority: "High",
      marketShare: "N/A",
      coverage: "National",
      employees: "200+",
      strengths: [
        { name: "Regulatory Authority", rating: 5 },
        { name: "Standards Setting", rating: 4 },
        { name: "Policy Influence", rating: 5 },
      ],
      gaps: ["Licensing process speed", "Enforcement capacity at scale", "SME accessibility"],
      bridgeOpportunity: "Aligned certification programs and regulatory navigation support",
      partnershipType: "Collaborate",
      synergyAreas: ["Installer certification alignment", "Equipment standards compliance", "Licensing facilitation"],
    },
  ],

  // Cross-sector connections
  crossSector: [
    {
      sectorId: 1,
      name: "Infrastructure",
      connection:
        "Solar-powered water pumping, streetlighting, public facility electrification, mini-grid deployment through infrastructure projects",
      multiplier: "2.8x",
      synergies: [
        "Solar-powered water kiosks at markets",
        "Streetlighting via solar micro-grids",
        "Public facility electrification packages",
      ],
      bridgeVentures: ["Market Solar Micro-Grid", "Community Water Kiosks"],
      impact: "Reliable energy transforms infrastructure from static assets into productive service platforms",
    },
    {
      sectorId: 6,
      name: "Agriculture",
      connection:
        "Solar-powered irrigation, cold storage, processing equipment, biogas from agricultural waste, productive use programs",
      multiplier: "3.5x",
      synergies: [
        "Solar irrigation for dry-season farming",
        "Cold storage eliminating post-harvest losses",
        "Biogas from farm waste to cooking fuel",
      ],
      bridgeVentures: ["Solar Cold Storage Network", "Biogas Systems Company"],
      impact: "Energy access enables year-round agriculture and preserves harvest value from farm to market",
    },
    {
      sectorId: 3,
      name: "Health Systems",
      connection:
        "Healthcare facility solar installations, vaccine cold chain reliability, clean cooking reducing respiratory illness",
      multiplier: "4.2x",
      synergies: [
        "Clinic solar ensuring 24/7 vaccine storage",
        "Clean cooking preventing 6,500 annual deaths",
        "Medical equipment powered reliably",
      ],
      bridgeVentures: ["C&I Solar Installation Company", "Clean Cooking Distribution Network"],
      impact: "Clean energy directly reduces disease burden and enables reliable healthcare delivery",
    },
    {
      sectorId: 11,
      name: "Manufacturing",
      connection:
        "Industrial solar reducing production costs, energy efficiency improving competitiveness, reliable power enabling operations",
      multiplier: "2.4x",
      synergies: [
        "Factory rooftop solar cutting energy costs",
        "Efficiency audits reducing consumption",
        "Battery storage preventing production interruptions",
      ],
      bridgeVentures: ["C&I Solar Installation Company", "Energy Efficiency Services"],
      impact: "Affordable, reliable energy is the foundation of manufacturing competitiveness",
    },
    {
      sectorId: 12,
      name: "Transportation",
      connection: "EV charging infrastructure, solar-powered cold chain logistics, electric last-mile delivery",
      multiplier: "1.8x",
      synergies: [
        "Solar EV charging at transit hubs",
        "Cold chain logistics powered by solar",
        "Electric last-mile delivery fleets",
      ],
      bridgeVentures: ["EV Charging Infrastructure", "Solar Cold Storage Network"],
      impact: "Clean energy enables Ghana's emerging electric mobility transition",
    },
  ],

  // Value chain stages — accordion system layers
  valueChain: [
    {
      stage: "Generation",
      stat: "5,507 MW",
      statDetail: "installed capacity — 0.8% solar",
      description:
        "Power production from thermal, hydro, and emerging solar. The foundation of Ghana's energy system and the entry point for clean energy transformation.",
      insight:
        "Solar is just 0.8% of installed capacity. The headroom for growth is enormous — and BRIDGE is positioned at the inflection point.",
      ventures: ["C&I Solar Installation Company", "Community Mini-Grid Development"],
      icon: "sun",
    },
    {
      stage: "Transmission",
      stat: "20-25%",
      statDetail: "efficiency gains achievable",
      description:
        "Moving power from source to consumer — where grid losses and reliability gaps create the strongest case for decentralized solutions.",
      insight:
        "Behind-the-meter solutions bypass the grid entirely. Every business with unreliable power is a customer waiting for solar + storage.",
      ventures: ["Battery Storage Solutions", "Solar Home Systems Distributor"],
      icon: "zap",
    },
    {
      stage: "Finance",
      stat: "31%",
      statDetail: "clean cooking adoption rate",
      description:
        "Making energy affordable through smart financing — mobile money and PAYG models that transform energy from a capital expense into a service.",
      insight:
        "The financing rails already exist. Mobile money reaches millions. Clean energy products just need to be loaded onto them.",
      ventures: ["Residential Solar Financing Platform", "Clean Cooking PAYG Platform"],
      icon: "coins",
    },
    {
      stage: "Installation",
      stat: "500+",
      statDetail: "technicians to certify",
      description:
        "Building workforce quality and infrastructure — the human capital layer that determines whether technology translates to trusted, lasting service.",
      insight:
        "Certification doesn't just create jobs — it creates trust. Trust is the bottleneck holding back mass solar adoption in Ghana.",
      ventures: ["Solar Technician Training Academy", "Quality Equipment Import & Distribution"],
      icon: "tool",
    },
    {
      stage: "End Use",
      stat: "14M+",
      statDetail: "households ready to serve",
      description:
        "Families cooking cleanly, businesses running reliably, communities thriving — the measure of whether energy investment translates into human dignity.",
      insight:
        "Every connection is a compounding return — better health, productive hours, children studying after dark, businesses staying open.",
      ventures: ["Clean Cooking Distribution Network", "Energy Efficiency Services"],
      icon: "home",
    },
  ],

  // Government policy alignment — 12 policies, 3 per category for balanced filtering
  policies: [
    {
      policy: "Renewable Energy & Green Transition Fund",
      body: "Ministry of Energy and Green Transition",
      allocation: "Multi-billion cedi commitment",
      category: "funding",
      alignment:
        "BRIDGE solar ventures directly align with government priorities for solar streetlight, rooftop, and off-grid systems deployment.",
      bridgeRole:
        "Implementation partner deploying commercial and residential solar at scale through proven venture models.",
      bridgeVentures: [
        "C&I Solar Installation Company",
        "Residential Solar Financing Platform",
        "Solar Home Systems Distributor",
      ],
      pillars: ["Rooftop Solar", "Off-Grid Systems", "EV Charging"],
    },
    {
      policy: "National Clean Cooking Policy (NCCP)",
      body: "Ministry of Energy and Green Transition",
      allocation: "$120M Investment Prospectus",
      category: "funding",
      alignment:
        "BRIDGE clean cooking ventures operationalize the NCCP vision for LPG adoption, biogas deployment, and improved cookstove distribution.",
      bridgeRole:
        "Distribution network builder and PAYG financing provider, extending clean cooking access to underserved households.",
      bridgeVentures: ["Clean Cooking Distribution Network", "Biogas Systems Company", "Clean Cooking PAYG Platform"],
      pillars: ["LPG Access", "Improved Cookstoves", "Biogas Systems"],
    },
    {
      policy: "Climate Investment Fund (CIF) Grants",
      body: "Ministry of Finance / CIF",
      allocation: "$50M+ allocated for Ghana",
      category: "funding",
      alignment:
        "BRIDGE mini-grid and clean energy ventures qualify for CIF concessional funding windows targeting off-grid access and resilience.",
      bridgeRole:
        "Project developer packaging bankable proposals that channel CIF capital into community-scale clean energy infrastructure.",
      bridgeVentures: ["Community Mini-Grid Development", "Women in Clean Energy Accelerator"],
      pillars: ["Concessional Finance", "Climate Resilience", "Gender Equity"],
    },
    {
      policy: "National Electric Vehicle Policy",
      body: "Ministry of Energy and Green Transition",
      allocation: "8-year import duty exemption",
      category: "tax",
      alignment:
        "BRIDGE EV charging infrastructure supports the government target of 32% EV penetration by 2032 and fleet electrification goals.",
      bridgeRole:
        "Charging infrastructure developer deploying solar-powered stations at strategic transportation locations.",
      bridgeVentures: ["EV Charging Infrastructure"],
      pillars: ["32% EV by 2032", "60% Gov Fleet by 2035"],
    },
    {
      policy: "Renewable Energy Equipment Duty Exemptions",
      body: "Ministry of Trade and Industry / Ghana Revenue Authority",
      allocation: "0% import duty on solar equipment",
      category: "tax",
      alignment:
        "Duty-free import of solar panels, inverters, and batteries reduces capital costs and accelerates market growth for all BRIDGE ventures.",
      bridgeRole:
        "Quality equipment distributor leveraging duty exemptions to import verified Tier-1 manufacturer products at scale.",
      bridgeVentures: ["Quality Equipment Import & Distribution", "C&I Solar Installation Company"],
      pillars: ["Solar Panels", "Inverters", "Batteries"],
    },
    {
      policy: "Net Metering & Feed-In Tariff Code",
      body: "Energy Commission / PURC",
      allocation: "Regulated tariff framework",
      category: "tax",
      alignment:
        "Net metering allows rooftop solar owners to offset electricity costs and sell surplus — creating the economic case for residential solar.",
      bridgeRole:
        "Residential solar financing platform built on net metering economics, making rooftop solar financially viable for households.",
      bridgeVentures: ["Residential Solar Financing Platform", "C&I Solar Installation Company"],
      pillars: ["Net Metering", "Feed-In Tariffs", "Grid Export"],
    },
    {
      policy: "SREP Mini-Grid Programme",
      body: "Energy Commission / Climate Investment Fund",
      allocation: "$47M programme value",
      category: "infrastructure",
      alignment:
        "BRIDGE mini-grid operations complement government-funded mini-grid construction with professional sustainable management.",
      bridgeRole:
        "Operations partner ensuring long-term sustainability through professional management, tariff collection, and productive use.",
      bridgeVentures: ["Community Mini-Grid Development", "Mini-Grid Operating Company"],
      pillars: ["35 Mini-Grids", "12,000 Rooftop Systems", "70,000+ Beneficiaries"],
    },
    {
      policy: "Ghana Energy Access & Resilience Project",
      body: "World Bank / Energy Commission",
      allocation: "$200M programme commitment",
      category: "infrastructure",
      alignment:
        "BRIDGE solar training and installation capacity directly support the workforce and infrastructure build-out this programme requires.",
      bridgeRole:
        "Workforce development and installation capacity partner, ensuring qualified technicians support programme rollout.",
      bridgeVentures: ["Solar Technician Training Academy", "Community Mini-Grid Development"],
      pillars: ["Rural Electrification", "Grid Resilience", "Workforce Dev"],
    },
    {
      policy: "National Electrification Scheme (NES)",
      body: "Ministry of Energy / ECG / NEDCo",
      allocation: "Ongoing national programme",
      category: "infrastructure",
      alignment:
        "BRIDGE solar home systems and mini-grids serve communities beyond grid extension reach, complementing the national electrification mandate.",
      bridgeRole:
        "Off-grid solution provider reaching communities where grid extension is economically unviable within the NES timeline.",
      bridgeVentures: ["Solar Home Systems Distributor", "Community Mini-Grid Development"],
      pillars: ["Universal Access", "Last-Mile Reach", "Off-Grid Solutions"],
    },
    {
      policy: "World Bank Energy Sector Support",
      body: "World Bank / Ministry of Finance",
      allocation: "$450M combined programmes",
      category: "partnerships",
      alignment:
        "BRIDGE ventures complement World Bank sector efficiency and clean cooking investments with private sector implementation.",
      bridgeRole:
        "Private sector implementation partner for clean cooking distribution and energy efficiency optimization services.",
      bridgeVentures: ["Clean Cooking Distribution Network", "Energy Efficiency Services"],
      pillars: ["$250M Sector Efficiency", "$200M Clean Cooking Bond"],
    },
    {
      policy: "KfW Public Facilities Solar Programme",
      body: "German Government / KfW",
      allocation: "€30M committed",
      category: "partnerships",
      alignment:
        "BRIDGE training academy graduates provide the skilled workforce needed for public facility solar installations across Ghana.",
      bridgeRole:
        "Workforce development partner through Solar Technician Training Academy, building national installation capacity.",
      bridgeVentures: ["Solar Technician Training Academy", "Quality Equipment Import & Distribution"],
      pillars: ["22 MW Solar", "Universities", "Ministries"],
    },
    {
      policy: "USAID Power Africa Initiative",
      body: "USAID / US Government",
      allocation: "Technical assistance + guarantees",
      category: "partnerships",
      alignment:
        "Power Africa provides transaction advisory, risk guarantees, and capacity building that de-risk BRIDGE energy ventures for investors.",
      bridgeRole:
        "Venture pipeline partner presenting bankable projects for Power Africa technical assistance and first-loss guarantees.",
      bridgeVentures: ["C&I Solar Installation Company", "Battery Storage Solutions"],
      pillars: ["Transaction Advisory", "Risk Guarantees", "Capacity Building"],
    },
  ],
};

// ============================================================================
// OPPORTUNITY SECTION (The Opportunity)
// ============================================================================

const OpportunitySection = ({ sector }) => {
  const [expandedProblem, setExpandedProblem] = useState(null);
  const isMobile = useIsMobile();

  // Enhanced pain points — per handoff spec section 4B
  const enhancedPainPoints = [
    {
      ...sector.painPoints[0],
      severity: "High Priority",
      severityScore: 92,
      affectedCount: "14M+",
      affectedLabel: "households affected",
      rootCauses: [
        { title: "Behind-the-Meter Solar", description: "On-site generation systems" },
        { title: "Revenue Recapture ($924M)", description: "Non-revenue loss recovery" },
        { title: "Battery Storage Integration", description: "Outage protection systems" },
        { title: "Grid-Tied Net Metering", description: "Cost offset opportunity" },
      ],
      bridgeSolution: "C&I Solar + Battery Storage",
    },
    {
      ...sector.painPoints[1],
      severity: "High Priority",
      severityScore: 88,
      affectedCount: "6,500",
      affectedLabel: "lives to impact annually",
      rootCauses: [
        { title: "LPG Distribution Networks", description: "Last-mile delivery systems" },
        { title: "PAYG Affordability Models", description: "Mobile money financing" },
        { title: "Improved Cookstove Design", description: "Cultural adaptation focus" },
        { title: "Biogas Waste-to-Fuel", description: "Circular economy systems" },
      ],
      bridgeSolution: "Clean Cooking Distribution + PAYG",
    },
    {
      ...sector.painPoints[2],
      severity: "Strategic",
      severityScore: 82,
      affectedCount: "2M+",
      affectedLabel: "citizens to serve",
      rootCauses: [
        { title: "Mini-Grid Deployment Scale", description: "Community-level power" },
        { title: "Productive Use Integration", description: "Economic empowerment" },
        { title: "Solar Home Systems Access", description: "Immediate electrification" },
        { title: "Community Ownership Models", description: "Sustainable governance" },
      ],
      bridgeSolution: "Mini-Grid Dev + Solar Home Systems",
    },
    {
      ...sector.painPoints[3],
      severity: "Strategic",
      severityScore: 78,
      affectedCount: "80%+",
      affectedLabel: "uncertified market",
      rootCauses: [
        { title: "Installer Certification Gap", description: "Professional standards" },
        { title: "Equipment Quality Testing", description: "Tier-1 verification" },
        { title: "Warranty Framework Need", description: "Consumer protection" },
        { title: "Consumer Finance Access", description: "Trust-backed lending" },
      ],
      bridgeSolution: "Training Academy + Equipment QA",
    },
  ];

  return (
    <section
      style={{
        backgroundColor: colors.background,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Header */}
        <div style={{ marginBottom: isMobile ? "36px" : "60px" }}>
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
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
              margin: "0 0 20px 0",
            }}
          >
            <span className="font-semibold" style={{ color: colors.accent }}>14M+</span> households ready for{" "}
            <span className="font-semibold" style={{ color: colors.accent }}>reliable</span>, clean{" "}
            <span className="font-semibold">energy</span>
          </h2>

          <p
            className="font-[Inter,sans-serif] leading-[1.65] text-[#666] max-w-[680px] m-0"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
          >
            Ghana's energy sector represents one of the most compelling investment landscapes in West Africa — a market
            where solar irradiance, mobile money infrastructure, and government policy alignment create ideal conditions
            for clean energy ventures.
          </p>
        </div>

        {/* Card Grid — Desktop 2×2, Mobile horizontal scroll */}
        <div
          style={
            isMobile
              ? {
                  display: "flex",
                  gap: "12px",
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  paddingBottom: "8px",
                  margin: "0 -20px",
                  padding: "0 20px 8px",
                  alignItems: "flex-start",
                }
              : {
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "24px",
                  alignItems: "start",
                }
          }
        >
          {enhancedPainPoints.map((problem, index) => {
            const isExpanded = expandedProblem === index;
            return (
              <div
                key={index}
                onClick={() => setExpandedProblem(isExpanded ? null : index)}
                className="cursor-pointer transition-all duration-300"
                style={{
                  backgroundColor: colors.white,
                  borderRadius: isMobile ? "16px" : "20px",
                  padding: isMobile ? "20px" : "28px",
                  border: isExpanded ? `2px solid ${colors.accent}` : `1px solid ${colors.line}`,
                  ...(isMobile
                    ? {
                        minWidth: "85%",
                        maxWidth: "85%",
                        flexShrink: 0,
                        scrollSnapAlign: "start",
                      }
                    : {}),
                }}
              >
                {/* Title + Severity Badge Row */}
                <div className="flex justify-between items-start gap-3 mb-[10px]">
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
                    className="rounded-[20px] text-[11px] font-bold uppercase tracking-[0.5px] font-[Inter,sans-serif] shrink-0 whitespace-nowrap"
                    style={{
                      backgroundColor:
                        problem.severity === "High Priority" ? colors.accentLight : "rgba(184,217,53,0.12)",
                      color: problem.severity === "High Priority" ? colors.primary : "#5C7A1F",
                      padding: "6px 14px",
                    }}
                  >
                    {problem.severity}
                  </span>
                </div>

                {/* Description — always visible, clamped */}
                <div className="mb-4">
                  <p
                    className="font-[Inter,sans-serif] text-[#666] m-0 leading-[1.5] overflow-hidden"
                    style={{
                      fontSize: isMobile ? "13px" : "14px",
                      display: "-webkit-box",
                      WebkitLineClamp: isMobile ? 2 : 3,
                      WebkitBoxOrient: "vertical",
                      ...(isMobile ? {} : { minHeight: "63px" }),
                    }}
                  >
                    {problem.description}
                  </p>
                </div>

                {/* Impact Bar — always visible */}
                <div
                  className="rounded-xl"
                  style={{
                    backgroundColor: colors.accentLight,
                    padding: isMobile ? "8px 12px" : "10px 16px",
                    marginBottom: isExpanded ? "16px" : 0,
                  }}
                >
                  <span
                    className="font-[Inter,sans-serif] font-semibold whitespace-nowrap overflow-hidden text-ellipsis block"
                    style={{
                      fontSize: isMobile ? "13px" : "14px",
                      color: colors.primary,
                    }}
                  >
                    Impact: {problem.quantification}
                  </span>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div
                    className="mt-4 pt-4"
                    style={{ borderTop: `1px solid ${colors.line}` }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Priority + Scale Row */}
                    <div
                      className="grid gap-3 mb-6"
                      style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}
                    >
                      {/* Priority Cell */}
                      <div
                        className="rounded-xl p-[14px]"
                        style={{ backgroundColor: colors.background }}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888]">
                            Priority
                          </span>
                          <span
                            className="rounded-[20px] text-[12px] font-bold font-[Inter,sans-serif]"
                            style={{
                              backgroundColor:
                                problem.severity === "High Priority" ? colors.accentLight : "rgba(184,217,53,0.12)",
                              color: problem.severity === "High Priority" ? colors.primary : "#5C7A1F",
                              padding: "4px 10px",
                            }}
                          >
                            {problem.severity}
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div
                          className="h-2 rounded overflow-hidden"
                          style={{ backgroundColor: colors.line }}
                        >
                          <div
                            className="h-full rounded"
                            style={{
                              width: `${problem.severityScore}%`,
                              backgroundColor: colors.accent,
                            }}
                          />
                        </div>
                      </div>

                      {/* Scale Cell */}
                      <div
                        className="rounded-xl p-[14px]"
                        style={{ backgroundColor: colors.background }}
                      >
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

                    {/* Opportunity Drivers */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock size={16} strokeWidth={2} color="#888" />
                        <span className="font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888]">
                          Opportunity Drivers
                        </span>
                      </div>

                      {/* 2x2 Driver Cards */}
                      <div
                        className="grid gap-[10px]"
                        style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}
                      >
                        {problem.rootCauses.map((cause, i) => (
                          <div
                            key={i}
                            className="rounded-xl flex items-center gap-3"
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
                            <div>
                              <div
                                className="font-[Inter,sans-serif] font-semibold mb-[2px]"
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

                    {/* BRIDGE Solution Footer */}
                    <div
                      className="pt-4"
                      style={{
                        borderTop: `1px solid ${colors.line}`,
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        alignItems: isMobile ? "flex-start" : "center",
                        justifyContent: "space-between",
                        gap: isMobile ? "8px" : "16px",
                      }}
                    >
                      <div className="flex items-center gap-3">
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
            );
          })}
        </div>

        {/* Mobile Scroll Indicator Dots */}
        {isMobile && (
          <div className="flex justify-center gap-[6px] mt-4">
            {enhancedPainPoints.map((_, i) => (
              <div
                key={i}
                onClick={() => setExpandedProblem(expandedProblem === i ? null : i)}
                className="h-2 rounded cursor-pointer transition-all duration-300"
                style={{
                  width: expandedProblem === i ? "24px" : "8px",
                  backgroundColor: expandedProblem === i ? colors.accent : colors.line,
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
// VALUE CHAIN SECTION — Collapsing System Layers
// ============================================================================

const CollapsedBar = ({ sys, index, onClick, position, hiddenCount, isMobile }) => {
  const isTop = position === "top";
  const isBottom = position === "bottom";
  const borderRadius =
    isTop && isBottom ? "20px" : isTop ? "20px 20px 4px 4px" : isBottom ? "4px 4px 20px 20px" : "4px";

  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex items-center"
      style={{
        backgroundColor: colors.background,
        borderRadius,
        padding: isMobile ? "18px 20px" : "22px 36px",
        gap: isMobile ? "14px" : "24px",
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: colors.white }}
      >
        <StageIcon type={sys.icon} size={20} color={colors.primary} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-bold tracking-[1.5px] text-[#999] mb-[2px] uppercase font-[Inter,sans-serif]">
          System {index + 1}
        </div>
        <div
          className="font-semibold font-[Inter,sans-serif]"
          style={{
            fontSize: isMobile ? "15px" : "17px",
            color: colors.primary,
          }}
        >
          {sys.stage}
        </div>
      </div>

      <div className="text-right shrink-0">
        <div
          className="font-[Poppins,sans-serif] font-bold leading-none tracking-[-0.5px]"
          style={{
            fontSize: isMobile ? "20px" : "26px",
            color: colors.primary,
          }}
        >
          {sys.stat}
        </div>
        <div className="text-[11px] text-[#999] mt-[2px] font-[Inter,sans-serif]">
          {sys.statDetail}
        </div>
      </div>

      {hiddenCount > 0 ? (
        <div
          className="rounded-full text-[11px] font-bold font-[Inter,sans-serif] shrink-0 flex items-center gap-[6px]"
          style={{
            backgroundColor: colors.primary,
            color: colors.white,
            padding: "6px 14px",
          }}
        >
          +{hiddenCount}
          <ChevronDown size={12} strokeWidth={2.5} />
        </div>
      ) : (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={{ backgroundColor: colors.white }}
        >
          <ChevronDown size={14} strokeWidth={2.5} color="#999" />
        </div>
      )}
    </div>
  );
};

const ValueChainSection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [active, setActive] = useState(0);
  const s = sector.valueChain[active];
  const systems = sector.valueChain;

  const prevIndex = active > 0 ? active - 1 : null;
  const nextIndex = active < systems.length - 1 ? active + 1 : null;
  const hiddenBelow = nextIndex !== null ? systems.length - 1 - (active + 1) : 0;

  return (
    <section style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Header */}
        <div style={{ marginBottom: isMobile ? "36px" : "56px" }}>
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
            style={{
              backgroundColor: colors.white,
              color: colors.primary,
              padding: "10px 20px",
              border: `1px solid ${colors.line}`,
            }}
          >
            The Process
          </span>

          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[820px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
              margin: "0 0 16px 0",
            }}
          >
            Five <span className="font-semibold" style={{ color: colors.accent }}>interconnected</span> systems powering{" "}
            <span className="font-semibold">Ghana's energy</span> future
          </h2>

          <p
            className="font-[Inter,sans-serif] leading-[1.65] text-[#666] max-w-[680px] m-0"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
          >
            Not a pipeline — a living system. Each layer operates simultaneously, and BRIDGE creates value at every
            level.
          </p>
        </div>

        {/* === SYSTEM LAYERS === */}
        <div className="flex flex-col gap-[3px]">
          {/* PREVIOUS bar */}
          {prevIndex !== null && (
            <CollapsedBar
              sys={systems[prevIndex]}
              index={prevIndex}
              onClick={() => setActive(prevIndex)}
              position="top"
              hiddenCount={prevIndex > 0 ? prevIndex : 0}
              isMobile={isMobile}
            />
          )}

          {/* === ACTIVE EXPANDED SYSTEM === */}
          <div>
            {/* Header bar */}
            <div
              className="flex items-center"
              style={{
                backgroundColor: colors.primary,
                borderRadius: prevIndex === null ? "20px 20px 0 0" : "4px 4px 0 0",
                padding: isMobile ? "22px 20px" : "28px 36px",
                gap: isMobile ? "14px" : "24px",
              }}
            >
              <div className="w-[44px] h-[44px] rounded-xl bg-[rgba(184,217,53,0.15)] flex items-center justify-center shrink-0">
                <StageIcon type={s.icon} size={22} color={colors.accent} />
              </div>

              <div className="flex-1 min-w-0">
                <div
                  className="text-[10px] font-bold tracking-[1.5px] mb-[2px] uppercase font-[Inter,sans-serif]"
                  style={{ color: colors.accent }}
                >
                  System {active + 1} of {systems.length}
                </div>
                <div
                  className="font-semibold font-[Inter,sans-serif]"
                  style={{
                    fontSize: isMobile ? "18px" : "22px",
                    color: colors.white,
                  }}
                >
                  {s.stage}
                </div>
              </div>

              <div className="text-right shrink-0">
                <div
                  className="font-[Poppins,sans-serif] font-bold leading-none tracking-[-0.5px]"
                  style={{
                    fontSize: isMobile ? "24px" : "32px",
                    color: colors.accent,
                  }}
                >
                  {s.stat}
                </div>
                <div className="text-[11px] text-white/45 mt-[3px] font-[Inter,sans-serif]">
                  {s.statDetail}
                </div>
              </div>
            </div>

            {/* Detail body */}
            <div
              style={{
                backgroundColor: colors.primary,
                borderRadius: nextIndex === null ? "0 0 20px 20px" : "0 0 4px 4px",
                padding: isMobile ? "0 20px 28px" : "0 36px 44px",
              }}
            >
              <div
                className="h-px bg-white/[0.08]"
                style={{ marginBottom: isMobile ? "24px" : "36px" }}
              />

              <div
                style={{
                  display: isMobile ? "block" : "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "44px",
                }}
              >
                {/* Left: narrative */}
                <div>
                  <p className="font-[Inter,sans-serif] text-[15px] leading-[1.75] text-white/75 mb-7 mt-0">
                    {s.description}
                  </p>

                  <div
                    className="bg-[rgba(184,217,53,0.06)] rounded-r-xl"
                    style={{
                      borderLeft: `3px solid ${colors.accent}`,
                      padding: "20px 24px",
                    }}
                  >
                    <span
                      className="font-[Inter,sans-serif] text-[11px] font-bold uppercase tracking-[1px] block mb-2"
                      style={{ color: colors.accent }}
                    >
                      Why this matters
                    </span>
                    <p className="font-[Inter,sans-serif] text-[14px] leading-[1.7] text-white/85 m-0">
                      {s.insight}
                    </p>
                  </div>
                </div>

                {/* Right: ventures */}
                <div style={{ marginTop: isMobile ? "28px" : "0" }}>
                  <span className="font-[Inter,sans-serif] text-[11px] font-bold uppercase tracking-[1.5px] text-white/45 block mb-4">
                    BRIDGE ventures at this layer
                  </span>

                  <div className="flex flex-col gap-[10px]">
                    {s.ventures.map((v, j) => (
                      <div
                        key={j}
                        className="bg-white/[0.07] border border-white/[0.12] rounded-[14px] flex items-center gap-4"
                        style={{ padding: "20px 24px" }}
                      >
                        <div className="w-10 h-10 rounded-[10px] bg-[rgba(184,217,53,0.1)] flex items-center justify-center shrink-0">
                          <Zap size={18} strokeWidth={2} color={colors.accent} />
                        </div>
                        <span
                          className="font-[Inter,sans-serif] text-[15px] font-semibold flex-1"
                          style={{ color: colors.white }}
                        >
                          {v}
                        </span>
                        <ChevronRight size={16} strokeWidth={2} color="rgba(255,255,255,0.2)" className="shrink-0" />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-[10px] mt-6 pt-5 border-t border-white/[0.06]">
                    <span className="flex" style={{ color: colors.accent }}>
                      <IconCheck />
                    </span>
                    <span className="font-[Inter,sans-serif] text-[13px] text-white/50">
                      BRIDGE creates value here through
                    </span>
                    <span
                      className="font-[Inter,sans-serif] text-[13px] font-semibold"
                      style={{ color: colors.accent }}
                    >
                      {s.ventures.length} ventures
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NEXT bar */}
          {nextIndex !== null && (
            <CollapsedBar
              sys={systems[nextIndex]}
              index={nextIndex}
              onClick={() => setActive(nextIndex)}
              position="bottom"
              hiddenCount={hiddenBelow}
              isMobile={isMobile}
            />
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// SOLUTIONS SECTION (Pathways to Impact)
// ============================================================================

const SolutionsSection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [activeTier, setActiveTier] = useState("all");
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 9;

  const tiers = [
    { key: "all", label: "All" },
    { key: 1, label: "Flagship" },
    { key: 2, label: "Scaling" },
    { key: 3, label: "Emerging" },
  ];

  const filtered = activeTier === "all" ? sector.solutions : sector.solutions.filter((s) => s.tier === activeTier);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageItems = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const handleTierChange = (key) => {
    setActiveTier(key);
    setPage(0);
  };

  return (
    <section id="solutions" style={{ backgroundColor: colors.primary, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <span
          className="inline-block bg-white/[0.08] rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6 border border-white/15"
          style={{ color: colors.accent, padding: "10px 20px" }}
        >
          Pathways to Impact
        </span>

        <h2
          className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px]"
          style={{
            fontSize: isMobile ? "28px" : "42px",
            color: colors.white,
            margin: "0 0 16px 0",
          }}
        >
          Ventures That Build <span className="font-semibold" style={{ color: colors.accent }}>Lasting Value</span>
        </h2>

        <div className="flex justify-between items-end flex-wrap gap-4 mb-8">
          <p className="font-[Inter,sans-serif] text-[16px] leading-[1.65] text-white/60 max-w-[680px] m-0">
            18 identified ventures — each one a bridge from insight to investment to measurable public benefit across
            Ghana's energy landscape.
          </p>

          {/* Tier Filters */}
          <div className="flex gap-[6px] shrink-0 border border-white/15 rounded-full p-1">
            {tiers.map((tier) => (
              <button
                key={tier.key}
                onClick={() => handleTierChange(tier.key)}
                className="border-none rounded-full text-[12px] font-[Inter,sans-serif] cursor-pointer transition-all duration-200"
                style={{
                  backgroundColor: activeTier === tier.key ? colors.accent : "transparent",
                  color: activeTier === tier.key ? colors.primary : "rgba(255,255,255,0.7)",
                  padding: "6px 16px",
                  fontWeight: activeTier === tier.key ? "700" : "500",
                }}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3×3 Card Grid / Mobile scroll */}
        <div
          style={
            isMobile
              ? {
                  display: "flex",
                  gap: "12px",
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  paddingBottom: "8px",
                  margin: "0 -20px",
                  padding: "0 20px 8px",
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                }
              : {
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "16px",
                  minHeight: "540px",
                  alignItems: "start",
                }
          }
        >
          {pageItems.map((solution, i) => (
            <div
              key={`${solution.tier}-${solution.score}-${i}`}
              className="bg-white rounded-2xl p-6 flex flex-col"
              style={isMobile ? { minWidth: "280px", maxWidth: "280px", flexShrink: 0, scrollSnapAlign: "start" } : {}}
            >
              <div className="flex justify-between items-center mb-3">
                <span
                  className="rounded-full text-[10px] font-bold uppercase tracking-[0.5px]"
                  style={{
                    backgroundColor:
                      solution.tier === 1
                        ? "rgba(184,217,53,0.15)"
                        : solution.tier === 2
                          ? "rgba(27,77,62,0.07)"
                          : "rgba(0,0,0,0.04)",
                    color: solution.tier === 1 ? colors.primary : solution.tier === 2 ? colors.primary : "#666",
                    padding: "5px 14px",
                  }}
                >
                  {solution.tier === 1 ? "Flagship" : solution.tier === 2 ? "Scaling" : "Emerging"}
                </span>
                <span
                  className="font-[Poppins,sans-serif] text-[14px] font-bold"
                  style={{ color: colors.accent }}
                >
                  {solution.score}
                </span>
              </div>
              <h4
                className="font-[Inter,sans-serif] text-[16px] font-bold min-h-[40px]"
                style={{ color: colors.primary, margin: "0 0 8px 0" }}
              >
                {solution.name}
              </h4>
              <p className="font-[Inter,sans-serif] text-[13px] leading-[1.6] text-[#666] flex-1 min-h-[84px]" style={{ margin: "0 0 16px 0" }}>
                {solution.description}
              </p>
              <div
                className="pt-3 flex justify-between items-center"
                style={{ borderTop: `1px solid ${colors.line}` }}
              >
                <span
                  className="font-[Poppins,sans-serif] text-[15px] font-bold"
                  style={{ color: colors.primary }}
                >
                  {solution.capital}
                </span>
                <span className="font-[Inter,sans-serif] text-[11px] text-[#999] max-w-[180px] text-right">
                  {solution.impact}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-[6px] mt-8">
            {Array.from({ length: totalPages }, (_, idx) => (
              <div
                key={idx}
                onClick={() => setPage(idx)}
                className="h-2 rounded cursor-pointer transition-all duration-300"
                style={{
                  width: page === idx ? "24px" : "8px",
                  backgroundColor: page === idx ? colors.accent : "rgba(255,255,255,0.2)",
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
// THE LANDSCAPE — Split-Panel Competitive Analysis
// ============================================================================

const CompetitorAnalysisCard = ({ competitor, index, total, onPrev, onNext, hiddenNav, isMobile }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="rounded-[20px]"
      style={{
        backgroundColor: colors.white,
        border: `1px solid ${colors.line}`,
        padding: isMobile ? "24px" : "28px 32px",
      }}
    >
      {/* Name + Priority row */}
      <div className="flex justify-between items-start mb-3">
        <h3
          className="font-[Inter,sans-serif] text-[18px] font-semibold m-0 leading-[1.3] flex-1 pr-3"
          style={{ color: colors.dark }}
        >
          {competitor.name}
        </h3>
        <span
          className="rounded-full text-[10px] font-bold uppercase tracking-[0.5px] whitespace-nowrap shrink-0"
          style={{
            backgroundColor: competitor.priority === "High" ? "#FEF3C7" : colors.accentLight,
            color: competitor.priority === "High" ? "#92400E" : colors.primary,
            padding: "4px 12px",
          }}
        >
          {competitor.priority} Priority
        </span>
      </div>

      {/* Focus */}
      <p className="font-[Inter,sans-serif] text-[14px] leading-[1.5] text-[#666]" style={{ margin: "0 0 20px 0" }}>
        {competitor.focus}
      </p>

      {/* Rated Strengths */}
      <div style={{ marginBottom: isExpanded ? "24px" : "0" }}>
        <span className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1.5px] text-[#999] block mb-3">
          Strengths
        </span>
        <div className="flex flex-col gap-[10px]">
          {competitor.strengths.map((s, j) => (
            <div key={j} className="flex items-center gap-3">
              <span className="font-[Inter,sans-serif] text-[12px] font-medium text-[#555] w-[120px] shrink-0">
                {s.name}
              </span>
              <div className="flex gap-[3px] flex-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className="h-[6px] flex-1 rounded-[3px]"
                    style={{ backgroundColor: n <= s.rating ? colors.accent : colors.line }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded: Gaps + Opportunity */}
      {isExpanded && (
        <div>
          {/* Gaps */}
          <div className="mb-5">
            <span className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1.5px] text-[#999] block mb-[10px]">
              Where BRIDGE helps
            </span>
            <div className="flex flex-col gap-[6px]">
              {competitor.gaps.map((g, j) => (
                <div key={j} className="flex items-center gap-[10px]">
                  <div
                    className="w-[6px] h-[6px] rounded-full shrink-0"
                    style={{ backgroundColor: colors.accent }}
                  />
                  <span className="font-[Inter,sans-serif] text-[13px] text-[#555]">
                    {g}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* BRIDGE Opportunity */}
          <div
            className="rounded-xl"
            style={{
              backgroundColor: colors.accentLight,
              padding: "16px 20px",
            }}
          >
            <span
              className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1px] block mb-[6px]"
              style={{ color: colors.primary }}
            >
              BRIDGE Opportunity
            </span>
            <p
              className="font-[Inter,sans-serif] text-[13px] leading-[1.5] font-medium m-0"
              style={{ color: colors.primary }}
            >
              {competitor.bridgeOpportunity}
            </p>
          </div>
        </div>
      )}

      {/* Footer: nav + analysis toggle */}
      <div
        className="flex justify-between items-center mt-5 pt-4"
        style={{ borderTop: `1px solid ${colors.line}` }}
      >
        {!hiddenNav ? (
          <div className="flex items-center gap-[10px]">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              disabled={index === 0}
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: index === 0 ? colors.background : colors.white,
                border: `1.5px solid ${index === 0 ? colors.line : colors.primary}`,
                cursor: index === 0 ? "default" : "pointer",
                opacity: index === 0 ? 0.35 : 1,
              }}
            >
              <ChevronLeft size={12} strokeWidth={2.5} color={colors.primary} />
            </button>
            <span className="font-[Inter,sans-serif] text-[12px] text-[#999]">
              {index + 1} / {total}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              disabled={index === total - 1}
              className="w-7 h-7 rounded-full border-none flex items-center justify-center"
              style={{
                backgroundColor: index === total - 1 ? colors.background : colors.primary,
                cursor: index === total - 1 ? "default" : "pointer",
                opacity: index === total - 1 ? 0.35 : 1,
              }}
            >
              <ChevronRight size={12} strokeWidth={2.5} color={index === total - 1 ? colors.primary : colors.white} />
            </button>
          </div>
        ) : (
          <div />
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-transparent rounded-full font-[Inter,sans-serif] text-[11px] font-semibold text-[#777] cursor-pointer flex items-center gap-[6px]"
          style={{
            border: `1.5px solid ${colors.line}`,
            padding: "6px 16px",
          }}
        >
          {isExpanded ? "Less" : "Analysis"}
          <ChevronDown size={10} strokeWidth={2.5} style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }} />
        </button>
      </div>
    </div>
  );
};

const LandscapeSection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [activeCompetitorIndex, setActiveCompetitorIndex] = useState(0);
  const [showMoreComp, setShowMoreComp] = useState(false);

  const comp = sector.competitors;
  const active = comp[activeCompetitorIndex];

  const positionData = [
    {
      headline: "Complements utility-scale with distributed community energy",
      bullets: [
        { label: "Mini-Grid Operations", detail: "VRA builds, BRIDGE operates" },
        { label: "C&I Market Extension", detail: "SME segment VRA cannot serve" },
        { label: "Workforce Pipeline", detail: "Training academy graduates" },
        { label: "Floating Solar Access", detail: "Volta Lake co-development" },
      ],
    },
    {
      headline: "Extends corporate solar reach into the underserved SME market",
      bullets: [
        { label: "SME Segment Focus", detail: "Markets BXC does not serve" },
        { label: "Rural Expansion", detail: "Beyond urban concentration" },
        { label: "PAYG Financing", detail: "Affordability BXC lacks" },
        { label: "Equipment Standards", detail: "Shared quality certification" },
      ],
    },
    {
      headline: "Adds last-mile distribution to Outcome Bond financing channel",
      bullets: [
        { label: "Distribution Network", detail: "Community-level reach" },
        { label: "PAYG Platform", detail: "Mobile money integration" },
        { label: "Trust Building", detail: "Local engagement model" },
        { label: "Scale Multiplier", detail: "Bond capital deployed further" },
      ],
    },
    {
      headline: "Delivers operational management for funded mini-grid infrastructure",
      bullets: [
        { label: "Operations Partner", detail: "Post-construction management" },
        { label: "Tariff Systems", detail: "Collection and billing tech" },
        { label: "Productive Use", detail: "Income-generating programs" },
        { label: "Sustainability Model", detail: "Long-term viability focus" },
      ],
    },
    {
      headline: "Professionalizes the fragmented local installer ecosystem",
      bullets: [
        { label: "Certification Path", detail: "Academy-trained technicians" },
        { label: "Quality Equipment", detail: "Vetted supply channel" },
        { label: "Warranty Framework", detail: "Consumer protection layer" },
        { label: "Market Aggregation", detail: "Collective purchasing power" },
      ],
    },
    {
      headline: "Aligns certification programs with national regulatory standards",
      bullets: [
        { label: "Standards Compliance", detail: "Pre-aligned training" },
        { label: "Licensing Support", detail: "Navigator for SME ventures" },
        { label: "Enforcement Partner", detail: "Quality data sharing" },
        { label: "Policy Input", detail: "Practitioner-level feedback" },
      ],
    },
  ];

  const shortNames = [
    "VRA / Bui Power",
    "BXC / Meinergy",
    "UpEnergy",
    "SREP Mini-Grid",
    "Local Installers",
    "Energy Commission",
  ];
  const shortDescs = [
    "Utility-scale power generation and floating solar development",
    "Commercial and industrial solar installations for corporates",
    "Clean cookstove distribution via World Bank Outcome Bond",
    "Government-funded mini-grid infrastructure for 70K+ people",
    "Residential and small commercial solar system providers",
    "National energy sector regulation and licensing authority",
  ];

  const vsLabels = ["VRA", "BXC", "UpEnergy", "SREP", "Installers", "Commission"];

  const pos = positionData[activeCompetitorIndex];

  const switchCompetitor = (i) => {
    setActiveCompetitorIndex(i);
    setShowMoreComp(false);
  };

  return (
    <section style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Header */}
        <div style={{ marginBottom: isMobile ? "32px" : "60px" }}>
          <span
            className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
            style={{
              backgroundColor: colors.white,
              color: colors.primary,
              padding: "10px 20px",
              border: `1px solid ${colors.line}`,
            }}
          >
            The Landscape
          </span>

          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[820px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
              margin: "0 0 16px 0",
            }}
          >
            Who's <span className="font-semibold" style={{ color: colors.accent }}>already building</span> and where{" "}
            <span className="font-semibold">BRIDGE connects</span>
          </h2>

          <p
            className="font-[Inter,sans-serif] leading-[1.65] text-[#666] max-w-[680px] m-0"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
          >
            From VRA's generation fleet to UpEnergy's clean cooking bonds to local installer networks — BRIDGE
            complements what exists, filling the gaps between utility scale and community impact.
          </p>
        </div>

        {/* Mobile: competitor pills */}
        {isMobile && (
          <div
            style={{
              display: "flex",
              gap: "6px",
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
              margin: "0 -20px 16px",
              padding: "0 20px 4px",
            }}
          >
            {comp.map((c, i) => (
              <button
                key={i}
                onClick={() => switchCompetitor(i)}
                style={{
                  backgroundColor: activeCompetitorIndex === i ? colors.accentLight : "transparent",
                  color: activeCompetitorIndex === i ? colors.primary : "#999",
                  border: activeCompetitorIndex === i ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                  padding: "5px 10px",
                  borderRadius: "50px",
                  fontSize: "11px",
                  fontWeight: activeCompetitorIndex === i ? "700" : "500",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                  transition: "all 0.2s ease",
                }}
              >
                {shortNames[i]}
              </button>
            ))}
          </div>
        )}

        {/* Split panel layout */}
        <div
          style={{
            display: isMobile ? "block" : "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1.1fr",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {/* LEFT: Analysis Card + Position Card */}
          <div>
            <CompetitorAnalysisCard
              competitor={active}
              index={activeCompetitorIndex}
              total={comp.length}
              onPrev={() => switchCompetitor(Math.max(0, activeCompetitorIndex - 1))}
              onNext={() => switchCompetitor(Math.min(comp.length - 1, activeCompetitorIndex + 1))}
              hiddenNav={isMobile}
              isMobile={isMobile}
            />

            {/* Mobile: reveal button */}
            {isMobile && !showMoreComp && (
              <button
                onClick={() => setShowMoreComp(true)}
                className="w-full border-none rounded-xl font-[Inter,sans-serif] text-[13px] font-semibold cursor-pointer mt-3 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.white,
                  padding: "14px",
                }}
              >
                See BRIDGE's Position
                <ChevronDown size={12} strokeWidth={2.5} />
              </button>
            )}

            {/* BRIDGE Position Card */}
            {(!isMobile || showMoreComp) && (
              <div
                className="rounded-[20px] mt-3"
                style={{
                  backgroundColor: colors.primary,
                  padding: isMobile ? "18px" : "22px 28px",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1.5px] text-white/45">
                    BRIDGE's Position
                  </span>
                  <span
                    className="bg-[rgba(184,217,53,0.15)] rounded-full text-[10px] font-bold"
                    style={{ color: colors.accent, padding: "3px 10px" }}
                  >
                    vs {vsLabels[activeCompetitorIndex]}
                  </span>
                </div>

                <p
                  className="font-[Inter,sans-serif] text-[15px] font-semibold leading-[1.4]"
                  style={{ color: colors.white, margin: "0 0 14px 0" }}
                >
                  {pos.headline}
                </p>

                <div
                  className="grid gap-[6px]"
                  style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}
                >
                  {pos.bullets.map((b, j) => (
                    <div
                      key={j}
                      className="bg-white/[0.07] rounded-[10px]"
                      style={{ padding: "10px 14px" }}
                    >
                      <span
                        className="font-[Inter,sans-serif] text-[12px] font-semibold block mb-[1px]"
                        style={{ color: colors.white }}
                      >
                        {b.label}
                      </span>
                      <span className="font-[Inter,sans-serif] text-[11px] text-white/45">
                        {b.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Summary Grid (desktop only) */}
          {!isMobile && (
            <div className="grid grid-cols-2 gap-3">
              {comp.map((c, i) => {
                const isActive = activeCompetitorIndex === i;
                const topStrength = c.strengths.reduce((a, b) => (a.rating >= b.rating ? a : b));
                return (
                  <div
                    key={i}
                    onClick={() => switchCompetitor(i)}
                    className="rounded-2xl cursor-pointer flex flex-col"
                    style={{
                      backgroundColor: isActive ? colors.background : colors.white,
                      border: isActive ? `2px solid ${colors.accent}` : `1px solid ${colors.line}`,
                      padding: "18px 20px",
                    }}
                  >
                    {/* Name + funding */}
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className="font-[Inter,sans-serif] text-[14px] font-semibold leading-[1.3]"
                        style={{ color: colors.dark }}
                      >
                        {shortNames[i]}
                      </span>
                      <span
                        className="rounded-full text-[9px] font-bold whitespace-nowrap shrink-0"
                        style={{
                          backgroundColor: colors.accentLight,
                          color: colors.primary,
                          padding: "2px 8px",
                        }}
                      >
                        {c.funding}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="font-[Inter,sans-serif] text-[12px] leading-[1.5] text-[#777]" style={{ margin: "0 0 12px 0" }}>
                      {shortDescs[i]}
                    </p>

                    {/* Top strength */}
                    <div
                      className="rounded-lg mb-3"
                      style={{ backgroundColor: colors.background, padding: "8px 12px" }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-[Inter,sans-serif] text-[11px] font-medium text-[#555]">
                          {topStrength.name}
                        </span>
                        <div className="flex gap-[2px]">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <div
                              key={n}
                              className="w-3 h-1 rounded-sm"
                              style={{ backgroundColor: n <= topStrength.rating ? colors.accent : colors.line }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center mt-auto">
                      <span className="font-[Inter,sans-serif] text-[10px] text-[#AAA]">
                        Est. {c.year}
                      </span>
                      <span
                        className="font-[Inter,sans-serif] text-[10px] font-semibold"
                        style={{ color: c.priority === "High" ? "#92400E" : colors.primary }}
                      >
                        {c.priority}
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
// GOVERNANCE & POLICY SECTION
// ============================================================================

const GovernancePolicySection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);

  const categories = [
    { id: "all", label: "All", short: "All" },
    { id: "funding", label: "Direct Funding", short: "Funding" },
    { id: "tax", label: "Tax Incentives", short: "Tax" },
    { id: "infrastructure", label: "Infrastructure", short: "Infrastructure" },
    { id: "partnerships", label: "Partnerships", short: "Partners" },
  ];

  const catBadge = {
    funding: { bg: "rgba(184,217,53,0.15)", border: "rgba(184,217,53,0.3)" },
    tax: { bg: "rgba(27,77,62,0.07)", border: "rgba(27,77,62,0.15)" },
    infrastructure: { bg: "rgba(184,217,53,0.1)", border: "rgba(184,217,53,0.25)" },
    partnerships: { bg: "rgba(27,77,62,0.05)", border: "rgba(27,77,62,0.12)" },
  };

  const filtered =
    activeCategory === "all" ? sector.policies : sector.policies.filter((p) => p.category === activeCategory);

  return (
    <section style={{ backgroundColor: colors.background, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH, textAlign: isMobile ? "left" : "center" }}>
        <span
          className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
          style={{
            backgroundColor: colors.white,
            color: colors.primary,
            padding: "10px 20px",
            border: `1px solid ${colors.line}`,
          }}
        >
          Governance & Policy
        </span>

        <h2
          className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px]"
          style={{
            fontSize: isMobile ? "28px" : "42px",
            color: colors.primary,
            margin: "0 0 16px 0",
          }}
        >
          Moving in Step with Ghana's <span className="font-semibold" style={{ color: colors.accent }}>Energy Transition</span>
        </h2>

        <p
          className="font-[Inter,sans-serif] text-[16px] leading-[1.65] text-[#666]"
          style={{
            maxWidth: isMobile ? "none" : "680px",
            margin: isMobile ? "0 0 32px 0" : "0 auto 32px",
          }}
        >
          Every BRIDGE energy venture aligns with at least one active government policy, from the Green Transition Fund
          to the $200M Clean Cooking Outcome Bond.
        </p>

        {/* Category Filters */}
        <div
          style={{
            display: "flex",
            gap: isMobile ? "6px" : "10px",
            flexWrap: "nowrap",
            marginBottom: "32px",
            justifyContent: isMobile ? "flex-start" : "center",
            overflowX: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setExpandedCard(null);
              }}
              style={{
                backgroundColor: activeCategory === cat.id ? colors.accentLight : "transparent",
                color: activeCategory === cat.id ? colors.primary : "#999",
                border: activeCategory === cat.id ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                padding: "6px 16px",
                borderRadius: "50px",
                fontSize: "12px",
                fontWeight: activeCategory === cat.id ? "700" : "500",
                fontFamily: "Inter, sans-serif",
                cursor: "pointer",
                transition: "all 0.2s ease",
                flexShrink: 0,
              }}
            >
              {isMobile ? cat.short : cat.label}
            </button>
          ))}
        </div>

        {/* Policy Cards — horizontal scroll, centered */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "auto",
            textAlign: "left",
            paddingBottom: "8px",
            margin: "0 -20px",
            padding: "0 20px 8px",
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {filtered.map((policy, i) => {
            const isExpanded = expandedCard === i;
            return (
              <div
                key={i}
                onClick={() => setExpandedCard(isExpanded ? null : i)}
                style={{
                  backgroundColor: colors.white,
                  border: `2px solid ${isExpanded ? colors.accent : colors.primary}`,
                  borderRadius: "16px",
                  padding: "22px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  minWidth: isMobile ? "calc(100vw - 60px)" : "340px",
                  maxWidth: isMobile ? "calc(100vw - 60px)" : "340px",
                  flexShrink: 0,
                  scrollSnapAlign: "start",
                  alignSelf: "flex-start",
                  transition: "all 0.3s ease",
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
                      backgroundColor: catBadge[policy.category]?.bg,
                      border: `1px solid ${catBadge[policy.category]?.border}`,
                      padding: "4px 12px",
                      borderRadius: "50px",
                      fontSize: "9px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      color: colors.primary,
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {policy.category}
                  </span>
                </div>
                <h4
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "15px",
                    fontWeight: "700",
                    color: colors.primary,
                    margin: "0 0 8px 0",
                    minHeight: "40px",
                  }}
                >
                  {policy.policy}
                </h4>

                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    fontWeight: "700",
                    color: colors.accent,
                    marginBottom: "8px",
                  }}
                >
                  {policy.allocation}
                </div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    color: "#666",
                    margin: "0 0 12px 0",
                    minHeight: "60px",
                  }}
                >
                  {policy.alignment}
                </p>

                {isExpanded && (
                  <div className="pt-3 mt-1" style={{ borderTop: `1px solid ${colors.line}` }}>
                    <div className="text-[11px] text-[#888] font-[Inter,sans-serif] mb-2">
                      {policy.body}
                    </div>
                    <p className="text-[13px] leading-[1.5] text-[#444] font-[Inter,sans-serif] mb-3">
                      {policy.bridgeRole}
                    </p>
                    {policy.pillars && (
                      <div className="flex flex-wrap gap-[6px] mb-3">
                        {policy.pillars.map((p, j) => (
                          <span
                            key={j}
                            className="bg-[rgba(184,217,53,0.1)] rounded-full text-[11px] font-semibold font-[Inter,sans-serif]"
                            style={{ color: colors.accent, padding: "4px 12px" }}
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-col gap-[6px]">
                      {policy.bridgeVentures.map((v, j) => (
                        <div
                          key={j}
                          className="rounded-lg text-[12px] font-semibold font-[Inter,sans-serif] flex items-center gap-2"
                          style={{
                            backgroundColor: colors.primary,
                            color: colors.white,
                            padding: "8px 14px",
                          }}
                        >
                          <span
                            className="w-[6px] h-[6px] rounded-full shrink-0"
                            style={{ backgroundColor: colors.accent }}
                          />
                          {v}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-[6px] mt-auto pt-2">
                  <span
                    className="text-[12px] font-semibold font-[Inter,sans-serif]"
                    style={{ color: colors.primary }}
                  >
                    {isExpanded ? "Show less" : "BRIDGE alignment"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll indicator dots — mobile */}
        {isMobile && (
          <div className="flex justify-center gap-[6px] mt-3">
            {filtered.map((_, idx) => (
              <div
                key={idx}
                className="h-2 rounded cursor-pointer transition-all duration-300"
                style={{
                  width: expandedCard === idx ? "24px" : "8px",
                  backgroundColor: expandedCard === idx ? colors.accent : colors.line,
                }}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA Bar */}
        <div
          className="rounded-2xl gap-4 mt-8 text-left"
          style={{
            backgroundColor: colors.primary,
            padding: isMobile ? "24px" : "28px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <div>
            <div
              className="font-semibold font-[Inter,sans-serif] mb-1"
              style={{
                fontSize: isMobile ? "16px" : "18px",
                color: colors.white,
              }}
            >
              BRIDGE complements — never competes with — government vision.
            </div>
            <div className="text-[14px] text-white/60 font-[Inter,sans-serif]">
              Every venture aligns with at least one active government policy or initiative.
            </div>
          </div>
          <button
            className="border-none rounded-full text-[13px] font-bold font-[Inter,sans-serif] cursor-pointer whitespace-nowrap"
            style={{
              backgroundColor: colors.accent,
              color: colors.primary,
              padding: "12px 24px",
              alignSelf: isMobile ? "center" : "auto",
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
// RIPPLE EFFECT SECTION (Cross-Sector)
// ============================================================================

const RippleEffectSection = ({ sector }) => {
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

  const crossSectorIcons = {
    1: FOOTER_SECTOR_ICONS[0].icon("currentColor"),
    3: FOOTER_SECTOR_ICONS[2].icon("currentColor"),
    6: FOOTER_SECTOR_ICONS[5].icon("currentColor"),
    11: FOOTER_SECTOR_ICONS[10].icon("currentColor"),
    12: FOOTER_SECTOR_ICONS[11].icon("currentColor"),
  };

  const crossSectorShortNames = ["Infra", "Agri", "Health", "Mfg", "Transport"];

  const pathways = sector.crossSector.map((s, i) => ({
    ...s,
    icon: crossSectorIcons[s.sectorId],
    pathLabel: [
      "Energy → Solar Power → Infrastructure Services",
      "Energy → Solar Irrigation → Agricultural Value",
      "Energy → Reliable Power → Healthcare Delivery",
      "Energy → Industrial Solar → Manufacturing Cost",
      "Energy → EV Charging → Clean Mobility",
    ][i],
  }));

  return (
    <section style={{ backgroundColor: colors.primary, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div className="mx-auto text-center" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <span
          className="inline-block bg-white/[0.08] rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6 border border-white/15"
          style={{ color: colors.accent, padding: "10px 20px" }}
        >
          The Ripple Effect
        </span>

        <h2
          className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[820px] mx-auto"
          style={{
            fontSize: isMobile ? "28px" : "42px",
            color: colors.white,
            margin: "0 0 16px 0",
          }}
        >
          How Energy <span className="font-semibold" style={{ color: colors.accent }}>Amplifies Impact</span>
        </h2>

        <p
          className="font-[Inter,sans-serif] leading-[1.65] text-white/60 max-w-[680px]"
          style={{
            fontSize: isMobile ? "14px" : "16px",
            margin: "0 auto 48px",
          }}
        >
          {isMobile
            ? "Explore how one investment in clean energy creates compounding value across the BRIDGE portfolio."
            : "Energy underpins virtually every BRIDGE sector. Explore how one investment in clean energy creates compounding value across the entire portfolio."}
        </p>

        {/* Hub + Sector Icons */}
        <div
          style={{
            display: "flex",
            alignItems: isMobile ? "center" : "flex-start",
            justifyContent: "center",
            gap: isMobile ? "0" : "32px",
            flexDirection: isMobile ? "column" : "row",
            marginBottom: isMobile ? "24px" : "48px",
          }}
        >
          {/* Hub */}
          <div
            className="flex flex-col items-center"
            style={{
              width: isMobile ? "auto" : "120px",
              marginBottom: isMobile ? "16px" : 0,
            }}
          >
            <div
              className="flex items-center justify-center shadow-[0_0_30px_rgba(184,217,53,0.3)]"
              style={{
                width: isMobile ? "56px" : "80px",
                height: isMobile ? "56px" : "80px",
                borderRadius: isMobile ? "14px" : "20px",
                backgroundColor: colors.accent,
                color: colors.primary,
              }}
            >
              <IconBatteryCharging />
            </div>
            <span
              className="font-[Inter,sans-serif] text-[10px] font-bold mt-[10px] uppercase tracking-[0.5px]"
              style={{
                color: colors.accent,
                display: isMobile ? "block" : "none",
              }}
            >
              ENERGY
            </span>
          </div>

          {/* Sector Nodes */}
          <div
            style={{
              display: "flex",
              gap: isMobile ? "12px" : "32px",
              justifyContent: "center",
              flexWrap: isMobile ? "nowrap" : "nowrap",
            }}
          >
            {pathways.map((pathway, i) => {
              const isActive = activeNode === i;
              const isDimmed = activeNode !== null && activeNode !== i;
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
                    width: isMobile ? "auto" : "120px",
                    cursor: "pointer",
                    opacity: isDimmed ? 0.4 : 1,
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      width: isMobile ? "44px" : "56px",
                      height: isMobile ? "44px" : "56px",
                      borderRadius: isMobile ? "12px" : "16px",
                      backgroundColor: isActive ? colors.accent : "rgba(255,255,255,0.08)",
                      border: isActive ? "none" : "1px solid rgba(255,255,255,0.1)",
                      color: isActive ? colors.primary : "rgba(255,255,255,0.6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                      marginBottom: "10px",
                    }}
                  >
                    {pathway.icon}
                  </div>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: isMobile ? "10px" : "13px",
                      fontWeight: "600",
                      color: isActive ? colors.white : "rgba(255,255,255,0.5)",
                      textAlign: "center",
                      maxWidth: isMobile ? "58px" : "none",
                      lineHeight: "1.2",
                    }}
                  >
                    {isMobile ? crossSectorShortNames[i] : pathway.name}
                  </span>
                  {!isMobile && (
                    <span
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "20px",
                        fontWeight: "700",
                        color: isActive ? colors.accent : "rgba(255,255,255,0.3)",
                        marginTop: "4px",
                      }}
                    >
                      {pathway.multiplier}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail Panel */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: isMobile ? "16px" : "24px",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: isMobile ? "24px" : "40px",
            minHeight: isMobile ? "auto" : "280px",
            textAlign: "left",
            transition: "all 0.3s ease",
          }}
        >
          {activeNode === null ? (
            isMobile ? (
              <p className="text-center py-5 font-[Inter,sans-serif] text-[15px] text-white/50">
                Tap a sector above to explore how energy amplifies its impact
              </p>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-5">
                  <span
                    className="font-[Inter,sans-serif] text-[16px] font-semibold"
                    style={{ color: colors.white }}
                  >
                    Cross-Sector Integration Opportunities
                  </span>
                  <span className="font-[Inter,sans-serif] text-[13px] text-white/40">
                    Click a sector above to explore
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {pathways.map((p, i) => (
                    <div
                      key={i}
                      onClick={() => setActiveNode(i)}
                      className="bg-white/[0.05] rounded-2xl cursor-pointer"
                      style={{ padding: "24px 20px" }}
                    >
                      <div
                        className="font-[Inter,sans-serif] text-[14px] font-semibold mb-2"
                        style={{ color: colors.white }}
                      >
                        {p.name}
                      </div>
                      <div className="font-[Inter,sans-serif] text-[13px] text-white/45 h-10 overflow-hidden">
                        {p.connection}
                      </div>
                      <div className="mt-3">
                        <span
                          className="font-[Poppins,sans-serif] text-[18px] font-bold"
                          style={{ color: colors.accent }}
                        >
                          {p.multiplier}
                        </span>
                        <span className="text-[11px] text-white/40 ml-[6px]">
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
                {pathways[activeNode].pathLabel.split(" → ").map((part, i, arr) => (
                  <React.Fragment key={i}>
                    <span
                      className="rounded-full text-[13px] font-[Inter,sans-serif]"
                      style={{
                        backgroundColor: i === 0 ? "rgba(184, 217, 53, 0.15)" : "rgba(255,255,255,0.05)",
                        color: i === 0 ? colors.accent : "rgba(255,255,255,0.7)",
                        padding: "6px 14px",
                        fontWeight: i === 0 ? "700" : "500",
                      }}
                    >
                      {part}
                    </span>
                    {i < arr.length - 1 && <span className="text-[14px]" style={{ color: colors.accent }}>→</span>}
                  </React.Fragment>
                ))}
              </div>

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
                  <p className="font-[Inter,sans-serif] text-[15px] text-white/70 leading-[1.6] mb-5">
                    {pathways[activeNode].impact}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-[Poppins,sans-serif] text-[32px] font-bold"
                      style={{ color: colors.accent }}
                    >
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
                    <h4
                      className="font-[Inter,sans-serif] text-[12px] font-bold uppercase tracking-[1px] mb-4"
                      style={{ color: colors.accent }}
                    >
                      Synergy Pathways
                    </h4>
                    {pathways[activeNode].synergies.map((syn, j) => (
                      <div
                        key={j}
                        className="flex gap-3 rounded-[10px] bg-white/[0.05] border border-white/[0.06] mb-[10px]"
                        style={{ padding: "12px 16px" }}
                      >
                        <span className="text-[8px] mt-[5px]" style={{ color: colors.accent }}>●</span>
                        <span className="font-[Inter,sans-serif] text-[14px] text-white/75">
                          {syn}
                        </span>
                      </div>
                    ))}
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
                    {pathways[activeNode].bridgeVentures.map((v, j) => (
                      <div
                        key={j}
                        className="bg-[rgba(184,217,53,0.1)] border border-[rgba(184,217,53,0.15)] rounded-xl mb-[10px] flex justify-between items-center"
                        style={{ padding: "14px 18px" }}
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
                    <a
                      href={SECTOR_ROUTES[pathways[activeNode].name] || "/sectors"}
                      onClick={(e) => { e.preventDefault(); navigate(SECTOR_ROUTES[pathways[activeNode].name] || "/sectors"); }}
                      className="inline-flex items-center gap-2 mt-5 no-underline"
                    >
                      <span
                        className="font-[Inter,sans-serif] text-[14px] font-semibold"
                        style={{ color: colors.accent }}
                      >
                        Explore {pathways[activeNode].name} Sector
                      </span>
                      <span style={{ color: colors.accent }}>→</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile toggle */}
              {isMobile && (
                <button
                  onClick={() => setShowMoreRipple(!showMoreRipple)}
                  className="w-full bg-transparent border border-white/15 rounded-xl font-[Inter,sans-serif] text-[14px] font-semibold cursor-pointer mt-4 flex items-center justify-center gap-2"
                  style={{
                    padding: "14px",
                    color: colors.white,
                  }}
                >
                  {showMoreRipple ? "Show less" : "Show more details"}
                  <span
                    style={{ transform: showMoreRipple ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }}
                  >
                    <IconChevronDown size={14} />
                  </span>
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
// INVESTMENT THESIS SECTION
// ============================================================================

const InvestmentCTASection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("returns");
  const [activeAudience, setActiveAudience] = useState(0);
  const [showInvestmentDetails, setShowInvestmentDetails] = useState(false);
  const [showReturnsPanel, setShowReturnsPanel] = useState(false);

  const tabs = [
    { key: "returns", label: "Returns" },
    { key: "timeline", label: "Timeline" },
    { key: "impact", label: "Impact" },
  ];

  const tabContent = {
    returns: [
      {
        label: "Tier 1 Ventures",
        value: "18-25%",
        detail: "C&I solar and clean cooking distribution with proven demand and rapid revenue generation",
      },
      {
        label: "Tier 2 Ventures",
        value: "12-18%",
        detail: "Mini-grids, biogas systems, and financing platforms with longer build-out but strong asset value",
      },
      {
        label: "Portfolio IRR",
        value: "15-22%",
        detail: "Blended returns across 18 ventures with risk-adjusted modeling and government alignment",
      },
      {
        label: "Dev. Leverage",
        value: "3-5x",
        detail: "Every dollar deployed generates $3-5 in local economic activity via energy multipliers",
      },
    ],
    timeline: [
      {
        label: "Phase 1 (Q1-Q2)",
        value: "Foundation",
        detail: "C&I solar first installations, training academy launch, equipment distribution setup",
      },
      {
        label: "Phase 2 (Q3-Q4)",
        value: "Scale",
        detail: "Clean cooking PAYG deployment, first mini-grid communities, residential financing launch",
      },
      {
        label: "Phase 3 (2027+)",
        value: "Expansion",
        detail: "Regional mini-grid scale-up, EV charging pilot, West Africa replication planning",
      },
      {
        label: "Exit Horizon",
        value: "5-7 yrs",
        detail: "Staged liquidity via asset sales, concession renewals, or portfolio recapitalization",
      },
    ],
    impact: [
      {
        label: "Households Served",
        value: "200K+",
        detail: "Families with improved energy access through solar, mini-grids, and clean cooking solutions",
      },
      {
        label: "Jobs Created",
        value: "1,000+",
        detail: "Direct employment including certified technicians, distribution agents, and operations staff",
      },
      {
        label: "Clean Cooking",
        value: "50K+",
        detail: "Devices deployed reducing household air pollution and protecting women and children",
      },
      {
        label: "CO₂ Avoided",
        value: "100K+ tons",
        detail: "Annual carbon reduction from solar generation and clean cooking transition",
      },
    ],
  };

  const audiences = [
    {
      key: "entrepreneur",
      label: "Entrepreneur",
      shortLabel: "Founder",
      icon: <IconStorefront />,
      headline: "Build Clean Energy Ventures That Power Communities",
      pitch:
        "BRIDGE provides validated venture models, government partnership pathways, and working capital strategies so you can launch energy businesses with de-risked market entry and clear demand signals.",
      stats: [
        { value: "18", label: "Venture Paths", detail: "validated models" },
        { value: "$200M", label: "Bond Access", detail: "clean cooking pipeline" },
        { value: "Full", label: "BRIDGE Support", detail: "incubation to scale" },
      ],
      pathways: [
        {
          bring: "Local knowledge & operational capacity",
          get: "BRIDGE provides venture blueprints, financial models, and go/no-go frameworks",
        },
        {
          bring: "Community relationships & trust",
          get: "Access to government programmes, equipment suppliers, and working capital facilities",
        },
        {
          bring: "Execution commitment & accountability",
          get: "Technical assistance, certification pathways, and scale-up support through Phase 3",
        },
      ],
    },
    {
      key: "business",
      label: "Business Entity",
      shortLabel: "Business",
      icon: <IconOfficeBuilding />,
      headline: "Cut Energy Costs and Secure Reliable Power",
      pitch:
        "Partner with BRIDGE to install solar systems, optimize energy efficiency, and secure battery backup — reducing operational costs while contributing to Ghana's clean energy transition.",
      stats: [
        { value: "$12-22M", label: "Capital Range", detail: "across 18 ventures" },
        { value: "30-40%", label: "Cost Savings", detail: "typical solar ROI" },
        { value: "24/7", label: "Reliability", detail: "with battery backup" },
      ],
      pathways: [
        {
          bring: "Energy procurement commitments",
          get: "Turnkey solar installation with performance guarantees and maintenance contracts",
        },
        {
          bring: "Facility access & operational data",
          get: "Energy efficiency audits reducing consumption before generation investment",
        },
        {
          bring: "Corporate sustainability goals",
          get: "Impact reporting, carbon metrics, and ESG documentation for stakeholders",
        },
      ],
    },
    {
      key: "investor",
      label: "Investor",
      shortLabel: "Investor",
      icon: <IconTrendingUp />,
      headline: "Energy Assets With Impact Returns",
      pitch:
        "Deploy capital into physical energy assets with transparent governance, compounding revenue streams, and measurable climate outcomes — backed by government policy alignment and community demand.",
      stats: [
        { value: "15-22%", label: "Target IRR", detail: "blended portfolio" },
        { value: "2.5x", label: "Multiple", detail: "capital appreciation" },
        { value: "12-18mo", label: "First Cash", detail: "revenue timeline" },
      ],
      pathways: [
        {
          bring: "Growth capital & patient deployment",
          get: "Asset-backed returns with energy infrastructure as collateral and clear exit pathways",
        },
        {
          bring: "Sector expertise & strategic guidance",
          get: "Board participation, portfolio oversight, and co-investment in expansion ventures",
        },
        {
          bring: "Network access & deal flow",
          get: "First-look rights on regional expansion and West African replication opportunities",
        },
      ],
    },
    {
      key: "government",
      label: "Government",
      shortLabel: "Gov't",
      icon: <IconLandmark />,
      headline: "Deliver Clean Energy Without Fiscal Strain",
      pitch:
        "BRIDGE deploys private capital to deliver government energy priorities — from SREP mini-grids to EV charging infrastructure — creating jobs and energy access without additional public spending.",
      stats: [
        { value: "8", label: "Policy Alignments", detail: "active programmes" },
        { value: "1,000+", label: "Jobs Created", detail: "direct employment" },
        { value: "200K+", label: "Citizens Served", detail: "energy access" },
      ],
      pathways: [
        {
          bring: "Policy frameworks & licensing support",
          get: "Private capital executing government energy priorities with measurable outcomes",
        },
        {
          bring: "Community identification & endorsement",
          get: "Professional operations management for government-built mini-grids and systems",
        },
        {
          bring: "Regulatory clarity & institutional access",
          get: "Workforce development through certified technician training and women's accelerator",
        },
      ],
    },
  ];

  const currentAudience = audiences[activeAudience];
  const currentTabData = tabContent[activeTab];

  return (
    <section style={{ backgroundColor: colors.background, padding: isMobile ? "60px 20px" : "100px 80px" }}>
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        <span
          className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
          style={{
            backgroundColor: colors.white,
            color: colors.primary,
            padding: "10px 20px",
            border: `1px solid ${colors.line}`,
          }}
        >
          The Investment Thesis
        </span>

        <h2
          className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px]"
          style={{
            fontSize: isMobile ? "28px" : "42px",
            color: colors.primary,
            margin: "0 0 16px 0",
          }}
        >
          Build the Asset, <span className="font-semibold" style={{ color: colors.accent }}>Deliver the Value</span>
        </h2>

        <p className="font-[Inter,sans-serif] text-[16px] leading-[1.65] text-[#666] max-w-[680px]" style={{ margin: "0 0 40px 0" }}>
          Asset ownership and clean energy service delivery create compounding returns for investors and citizens alike
          — powered by $450M+ in aligned government and development partner programmes.
        </p>

        {/* Audience Selector */}
        <div className="flex gap-2 flex-wrap mb-8">
          {audiences.map((aud, i) => (
            <button
              key={aud.key}
              onClick={() => setActiveAudience(i)}
              className="flex items-center gap-2 rounded-full text-[12px] font-[Inter,sans-serif] cursor-pointer transition-all duration-200"
              style={{
                backgroundColor: activeAudience === i ? colors.accentLight : "transparent",
                color: activeAudience === i ? colors.primary : "#999",
                border: activeAudience === i ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                padding: "6px 16px",
                fontWeight: activeAudience === i ? "700" : "500",
              }}
            >
              <span style={{ color: activeAudience === i ? colors.primary : "#999" }}>{aud.icon}</span>
              {isMobile ? aud.shortLabel : aud.label}
            </button>
          ))}
        </div>

        {/* Two-Column Layout */}
        <div className="grid gap-6" style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}>
          {/* Left: Audience Card */}
          <div
            className="rounded-[20px] order-1"
            style={{
              backgroundColor: colors.white,
              border: `2px solid ${colors.primary}`,
              padding: isMobile ? "24px" : "32px",
            }}
          >
            <h3
              className="font-[Inter,sans-serif] text-[22px] font-bold"
              style={{ color: colors.primary, margin: "0 0 12px 0" }}
            >
              {currentAudience.headline}
            </h3>
            <p className="font-[Inter,sans-serif] text-[14px] leading-[1.7] text-[#555]" style={{ margin: "0 0 24px 0" }}>
              {currentAudience.pitch}
            </p>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {currentAudience.stats.map((stat, i) => (
                <div
                  key={i}
                  className="text-center rounded-xl"
                  style={{ padding: "16px 8px", backgroundColor: colors.background }}
                >
                  <div
                    className="font-[Poppins,sans-serif] text-[20px] font-bold"
                    style={{ color: colors.primary }}
                  >
                    {stat.value}
                  </div>
                  <div className="font-[Inter,sans-serif] text-[12px] font-semibold text-[#555] mt-1">
                    {stat.label}
                  </div>
                  <div className="font-[Inter,sans-serif] text-[11px] text-[#999] mt-[2px]">
                    {stat.detail}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[11px] font-bold uppercase tracking-[1px] text-[#999] mb-3 font-[Inter,sans-serif]">
              Exchange of Value
            </div>
            {currentAudience.pathways.map((p, i) => (
              <div
                key={i}
                className="grid grid-cols-2 gap-3 mb-[10px] p-3 rounded-[10px]"
                style={{ backgroundColor: colors.background }}
              >
                <div>
                  <div
                    className="text-[10px] font-bold uppercase mb-1 font-[Inter,sans-serif]"
                    style={{ color: colors.accent }}
                  >
                    You bring
                  </div>
                  <div
                    className="text-[13px] text-[#555] font-[Inter,sans-serif] leading-[1.4] overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {p.bring}
                  </div>
                </div>
                <div>
                  <div
                    className="text-[10px] font-bold uppercase mb-1 font-[Inter,sans-serif]"
                    style={{ color: colors.primary }}
                  >
                    You get
                  </div>
                  <div
                    className="text-[13px] text-[#555] font-[Inter,sans-serif] leading-[1.4] overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {p.get}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Returns Panel */}
          {isMobile && !showReturnsPanel && (
            <button
              onClick={() => setShowReturnsPanel(true)}
              className="border-none rounded-[14px] cursor-pointer font-[Inter,sans-serif] text-[14px] font-semibold flex items-center justify-center gap-2 order-2"
              style={{
                backgroundColor: colors.primary,
                color: colors.white,
                padding: "16px",
              }}
            >
              View Returns & Timeline
              <ChevronDown size={14} strokeWidth={2.5} color={colors.accent} />
            </button>
          )}
          <div
            className="rounded-[20px] order-2"
            style={{
              backgroundColor: colors.primary,
              padding: isMobile ? "24px" : "32px",
              display: isMobile && !showReturnsPanel ? "none" : "block",
            }}
          >
            <div className="flex gap-1 mb-6 bg-white/[0.08] rounded-xl p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="flex-1 rounded-[10px] border-none text-[13px] font-semibold font-[Inter,sans-serif] cursor-pointer"
                  style={{
                    padding: "10px 16px",
                    backgroundColor: activeTab === tab.key ? colors.accent : "transparent",
                    color: activeTab === tab.key ? colors.primary : "rgba(255,255,255,0.5)",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {currentTabData.map((item, i) => (
              <div
                key={i}
                className="py-4"
                style={{
                  borderBottom: i < currentTabData.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}
              >
                <div className="flex justify-between items-center mb-[6px]">
                  <span
                    className="font-[Inter,sans-serif] text-[14px] font-semibold"
                    style={{ color: colors.white }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="font-[Poppins,sans-serif] text-[18px] font-bold"
                    style={{ color: colors.accent }}
                  >
                    {item.value}
                  </span>
                </div>
                <p className="font-[Inter,sans-serif] text-[13px] text-white/50 m-0 leading-[1.5]">
                  {item.detail}
                </p>
              </div>
            ))}

            {/* Validation Bar */}
            <div className="mt-6 p-4 bg-white/[0.05] rounded-xl">
              {[
                "Government policy alignment across 8 active programmes",
                "$450M+ in development partner co-investment pipeline",
                "4.5-6 kWh/m²/day solar resource across all regions",
              ].map((check, i) => (
                <div
                  key={i}
                  className="flex items-center gap-[10px]"
                  style={{ marginBottom: i < 2 ? "10px" : 0 }}
                >
                  <span style={{ color: colors.accent }}>
                    <IconCheck />
                  </span>
                  <span className="font-[Inter,sans-serif] text-[13px] text-white/70">
                    {check}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// IMPACT SECTION
// ============================================================================

const ImpactSection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [view, setView] = useState("metrics");
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeStakeholder, setActiveStakeholder] = useState(0);
  const [animate, setAnimate] = useState(true);

  const switchView = (v) => {
    setAnimate(false);
    setView(v);
    setTimeout(() => setAnimate(true), 50);
  };

  const switchCategory = (i) => {
    setAnimate(false);
    setActiveCategory(i);
    setTimeout(() => setAnimate(true), 50);
  };

  const metrics = [
    {
      category: "Economic",
      items: [
        {
          label: "Sector Value at Risk",
          value: 924,
          suffix: "M",
          prefix: "$",
          description: "Annual economic cost of power outages to businesses and productivity",
          trend: "At risk",
          ventures: "Solar Solutions · Mini-Grid Dev",
        },
        {
          label: "Clean Cooking Market",
          value: 200,
          suffix: "M",
          prefix: "$",
          description: "World Bank Outcome Bond unlocking clean cooking distribution at scale",
          trend: "+12% YoY",
          ventures: "Clean Cooking Network · Women Accelerator",
        },
        {
          label: "Tariff Savings Potential",
          value: 30,
          suffix: "-40%",
          prefix: "",
          description: "Cost reduction for C&I customers switching from grid to solar generation",
          trend: "Capture gap",
          ventures: "Solar Solutions · Energy Efficiency Co",
        },
        {
          label: "Dev. Leverage",
          value: 3,
          suffix: "-5x",
          prefix: "",
          description: "Every dollar deployed generates local economic activity via energy multipliers",
          trend: "Multiplier",
          ventures: "All Ventures",
        },
      ],
    },
    {
      category: "People",
      items: [
        {
          label: "Households Served",
          value: 200,
          suffix: "K+",
          prefix: "",
          description: "Families with improved energy access through solar, mini-grids, and clean cooking",
          trend: "High priority",
          ventures: "Mini-Grid Dev · Clean Cooking Network",
        },
        {
          label: "Jobs Created",
          value: 1000,
          suffix: "+",
          prefix: "",
          description: "Direct employment including technicians, distribution agents, and operations staff",
          trend: "Growing",
          ventures: "All Ventures",
        },
        {
          label: "Clean Cooking Devices",
          value: 50,
          suffix: "K+",
          prefix: "",
          description: "Cookstoves deployed reducing household air pollution protecting women and children",
          trend: "Critical",
          ventures: "Clean Cooking Network · Biogas Systems",
        },
        {
          label: "Lives Protected",
          value: 6500,
          suffix: "",
          prefix: "",
          description: "Annual deaths from household air pollution addressable through clean fuel transition",
          trend: "At risk",
          ventures: "Clean Cooking Network · Women Accelerator",
        },
      ],
    },
    {
      category: "Returns",
      items: [
        {
          label: "Portfolio IRR",
          value: 15,
          suffix: "-22%",
          prefix: "",
          description: "Blended returns across 18 ventures with risk-adjusted modeling and policy alignment",
          trend: "Target range",
          ventures: "All Ventures",
        },
        {
          label: "Tier 1 Returns",
          value: 18,
          suffix: "-25%",
          prefix: "",
          description: "C&I solar and clean cooking distribution with proven demand and rapid revenue",
          trend: "Near-term",
          ventures: "Solar Solutions · Clean Cooking Network",
        },
        {
          label: "First Cash",
          value: 12,
          suffix: "-18mo",
          prefix: "",
          description: "Revenue timeline from first installations through recurring service contracts",
          trend: "Near-term",
          ventures: "Solar Solutions · Training Academy",
        },
        {
          label: "Capital Deployed",
          value: 12,
          suffix: "-22M",
          prefix: "$",
          description: "Total investment across energy ventures over the phased deployment horizon",
          trend: "Phased",
          ventures: "All Ventures",
        },
      ],
    },
  ];

  const stakeholders = [
    {
      title: "The Installer",
      subtitle: "Installers, distributors & communities",
      outcomes: [
        "Certified training pathways create professional solar technician careers",
        "Distribution franchises provide sustainable income through PAYG cookstove sales",
        "Community mini-grids extend productive hours for rural enterprises",
        "Women-led clean energy businesses unlock new economic participation",
      ],
      stat: "200K+",
      statLabel: "households served",
      highlight: "Professional career pathways",
    },
    {
      title: "The Institution",
      subtitle: "Cooperatives, agencies & utilities",
      outcomes: [
        "VRA and ECG complement utility-scale with distributed community energy",
        "Equipment suppliers access quality-assured procurement channels",
        "Training academies build certified workforce meeting industry standards",
        "Financial institutions unlock energy asset lending through BRIDGE guarantees",
      ],
      stat: "18",
      statLabel: "venture partnerships",
      highlight: "Utility-scale complementarity",
    },
    {
      title: "The Government",
      subtitle: "Energy Commission & local assemblies",
      outcomes: [
        "Private capital executes SREP mini-grid programme without fiscal strain",
        "Clean Cooking Outcome Bond targets achieved through distribution networks",
        "National electrification rate accelerated beyond 90% government target",
        "EV charging infrastructure deployed supporting 32% penetration goal by 2032",
      ],
      stat: "8",
      statLabel: "policy alignments",
      highlight: "Zero fiscal burden delivery",
    },
    {
      title: "The Investor",
      subtitle: "Impact & institutional capital",
      outcomes: [
        "Asset-backed returns with energy infrastructure as collateral",
        "Compounding revenue from recurring solar service and PAYG contracts",
        "Measurable climate outcomes with 100K+ tons CO₂ avoided annually",
        "Regional expansion rights into West African energy markets",
      ],
      stat: "15-22%",
      statLabel: "target portfolio IRR",
      highlight: "Asset-backed clean energy",
    },
  ];

  const currentMetrics = metrics[activeCategory];
  const currentStakeholder = stakeholders[activeStakeholder];

  const MetricNumber = ({ item }) => {
    const val = useCounter(item.value, 1200, animate);
    const display =
      item.value >= 1000 ? Math.round(val).toLocaleString() : item.value % 1 !== 0 ? val.toFixed(1) : Math.round(val);
    return (
      <span
        className="font-[Poppins,sans-serif] font-bold tracking-[-1px] leading-none"
        style={{
          fontSize: isMobile ? "28px" : "36px",
          color: colors.primary,
        }}
      >
        {item.prefix}
        {display}
        {item.suffix}
      </span>
    );
  };

  return (
    <section style={{ backgroundColor: colors.white, padding: isMobile ? "60px 20px" : "80px 32px" }}>
      <div className="max-w-[1100px] mx-auto">
        <span
          className="inline-block rounded-full text-[11px] font-bold uppercase tracking-[2px] font-['DM_Sans',sans-serif] mb-6"
          style={{
            backgroundColor: colors.white,
            color: colors.primary,
            padding: "10px 20px",
            border: `1px solid ${colors.line}`,
          }}
        >
          The Impact
        </span>

        <h2
          className="font-['DM_Sans',sans-serif] font-light leading-[1.15] tracking-[-0.5px]"
          style={{
            fontSize: isMobile ? "28px" : "42px",
            color: colors.primary,
            margin: "0 0 12px 0",
          }}
        >
          What Changes When <span className="font-semibold">Energy</span>
          <br />
          <span className="font-semibold">Access</span>{" "}
          <span className="font-semibold" style={{ color: colors.accent }}>Works</span>
        </h2>

        <p className="font-['DM_Sans',sans-serif] text-[16px] leading-[1.7] text-[#555] max-w-[700px]" style={{ margin: "0 0 40px 0" }}>
          When power reaches rural enterprises, solar systems serve off-grid communities, and clean cooking replaces
          biomass — the ripple effects improve health, enable productivity, and unlock economic potential across Ghana.
        </p>

        {/* Controls Bar */}
        <div className="flex justify-start mb-6">
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
                  onClick={() => switchView(v)}
                  style={{
                    padding: isMobile ? "5px 10px" : "6px 14px",
                    borderRadius: "50px",
                    border: "none",
                    fontSize: isMobile ? "11px" : "12px",
                    fontFamily: "Inter, sans-serif",
                    cursor: "pointer",
                    backgroundColor: view === v ? colors.white : "transparent",
                    fontWeight: view === v ? "700" : "500",
                    color: view === v ? colors.primary : "#999",
                    boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  {v === "metrics" ? (isMobile ? "Metric" : "By Metric") : isMobile ? "Stakeholder" : "By Stakeholder"}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-5 shrink-0" style={{ backgroundColor: colors.line }} />

            {/* Sub Filters */}
            {view === "metrics"
              ? metrics.map((cat, i) => (
                  <button
                    key={cat.category}
                    onClick={() => switchCategory(i)}
                    style={{
                      padding: isMobile ? "5px 8px" : "6px 14px",
                      borderRadius: "50px",
                      fontSize: isMobile ? "10px" : "12px",
                      fontFamily: "Inter, sans-serif",
                      cursor: "pointer",
                      backgroundColor: activeCategory === i ? colors.accentLight : "transparent",
                      color: activeCategory === i ? colors.primary : "#999",
                      border: activeCategory === i ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                      fontWeight: activeCategory === i ? "700" : "500",
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {cat.category}
                  </button>
                ))
              : stakeholders.map((s, i) => (
                  <button
                    key={s.title}
                    onClick={() => setActiveStakeholder(i)}
                    style={{
                      padding: isMobile ? "5px 8px" : "6px 14px",
                      borderRadius: "50px",
                      fontSize: isMobile ? "10px" : "12px",
                      fontFamily: "Inter, sans-serif",
                      cursor: "pointer",
                      backgroundColor: activeStakeholder === i ? colors.accentLight : "transparent",
                      color: activeStakeholder === i ? colors.primary : "#999",
                      border: activeStakeholder === i ? `1.5px solid ${colors.accent}` : "1.5px solid transparent",
                      fontWeight: activeStakeholder === i ? "700" : "500",
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
        <div className="transition-opacity duration-300" style={{ opacity: animate ? 1 : 0 }}>
          {view === "metrics" ? (
            /* ═══ METRICS VIEW ═══ */
            <div
              className="rounded-[20px] overflow-hidden"
              style={{
                backgroundColor: colors.background,
                border: `2px solid ${colors.primary}`,
              }}
            >
              {currentMetrics.items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: isMobile ? "block" : "grid",
                    gridTemplateColumns: "200px 1fr 200px",
                    gap: isMobile ? "0" : "32px",
                    padding: isMobile ? "16px" : "24px 28px",
                    backgroundColor: i % 2 === 0 ? colors.white : "transparent",
                    opacity: animate ? 1 : 0,
                    transition: `opacity 0.4s ease ${i * 80}ms`,
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  {/* Mobile: Trend tag + Ventures in top-right */}
                  {isMobile && (
                    <div style={{ position: "absolute", top: "16px", right: "16px", textAlign: "right" }}>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "9px",
                          fontWeight: "700",
                          color: colors.accent,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          backgroundColor: "rgba(184,217,53,0.12)",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          display: "inline-block",
                          marginBottom: "4px",
                        }}
                      >
                        {item.trend}
                      </div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "10px",
                          fontWeight: "500",
                          color: colors.primary,
                        }}
                      >
                        {item.ventures}
                      </div>
                    </div>
                  )}
                  {/* Number + Trend (desktop) */}
                  <div>
                    <MetricNumber item={item} />
                    {!isMobile && (
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "10px",
                          fontWeight: "700",
                          color: colors.accent,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          marginTop: "6px",
                        }}
                      >
                        {item.trend}
                      </div>
                    )}
                  </div>
                  {/* Label + Description */}
                  <div style={{ marginTop: isMobile ? "4px" : 0, maxWidth: isMobile ? "65%" : "none" }}>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: isMobile ? "14px" : "15px",
                        fontWeight: "700",
                        color: colors.primary,
                        marginBottom: "4px",
                      }}
                    >
                      {item.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px",
                        color: "#666",
                        lineHeight: "1.5",
                      }}
                    >
                      {item.description}
                    </div>
                  </div>
                  {/* Linked Ventures — desktop only */}
                  {!isMobile && (
                    <div
                      style={{
                        backgroundColor: i % 2 === 0 ? colors.background : "rgba(27,77,62,0.04)",
                        borderRadius: "10px",
                        padding: "10px 16px",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
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
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "11px",
                          fontWeight: "500",
                          color: colors.primary,
                        }}
                      >
                        {item.ventures}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* ═══ STAKEHOLDER VIEW ═══ */
            <div>
              {/* Title + Stat Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div
                    className="font-['DM_Sans',sans-serif] font-bold"
                    style={{
                      fontSize: isMobile ? "22px" : "28px",
                      color: colors.primary,
                    }}
                  >
                    {currentStakeholder.title}
                  </div>
                  <div className="font-['DM_Sans',sans-serif] text-[14px] text-[#888] mt-1">
                    {currentStakeholder.subtitle}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className="font-[Poppins,sans-serif] font-bold tracking-[-1.5px] leading-none"
                    style={{
                      fontSize: isMobile ? "32px" : "40px",
                      color: colors.primary,
                    }}
                  >
                    {currentStakeholder.stat}
                  </div>
                  <div className="font-['DM_Sans',sans-serif] text-[12px] text-[#888] mt-1">
                    {currentStakeholder.statLabel}
                  </div>
                </div>
              </div>

              {/* Outcome Rows */}
              <div className="flex flex-col gap-[6px]">
                {currentStakeholder.outcomes.map((outcome, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-xl"
                    style={{
                      padding: "14px 20px",
                      backgroundColor: i % 2 === 0 ? colors.background : "transparent",
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: i % 2 === 0 ? colors.white : colors.background }}
                    >
                      <span
                        className="font-['DM_Sans',sans-serif] text-[12px] font-bold"
                        style={{ color: colors.primary }}
                      >
                        {i + 1}
                      </span>
                    </div>
                    <span className="font-['DM_Sans',sans-serif] text-[15px] text-[#333] leading-[1.5]">
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>

              {/* Key Advantage Strip */}
              <div
                className="mt-6 rounded-xl flex items-center"
                style={{
                  padding: "16px 24px",
                  backgroundColor: colors.primary,
                }}
              >
                <span
                  className="font-['DM_Sans',sans-serif] text-[10px] font-bold uppercase tracking-[1.5px]"
                  style={{ color: colors.accent }}
                >
                  Key Advantage
                </span>
                <span className="font-['DM_Sans',sans-serif] text-[14px] font-medium text-white/85 ml-4">
                  {currentStakeholder.highlight}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// MAIN PAGE EXPORT
// ============================================================================

export default function EnergySectorPage() {
  return (
    <Layout>
    <div className="font-[Inter,sans-serif]">
      <SectorHeroSection sector={sectorData} />
      <OpportunitySection sector={sectorData} />
      <ValueChainSection sector={sectorData} />
      <SolutionsSection sector={sectorData} />
      <LandscapeSection sector={sectorData} />
      <GovernancePolicySection sector={sectorData} />
      <RippleEffectSection sector={sectorData} />
      <InvestmentCTASection sector={sectorData} />
      <ImpactSection sector={sectorData} />
      <SectorFinalCTA
          heading={<>Let's Power Ghana's <span className="font-semibold" style={{ color: colors.accent }}>Clean Energy Future</span></>}
          description="Whether you're an investor, entrepreneur, or government partner — there's a seat at the table in building Ghana's clean energy transformation."
        />
    </div>
    </Layout>
  );
}
