import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { IconBuilding, IconWallet, IconWheat, IconCpu, IconBank, IconPhone, IconHandshake, IconGlobe, IconStore, IconArrowRight, IconArrowDown, IconCheck, IconWarning, IconTrendingUp, IconShield, IconDollar, IconTarget, IconChevronDown, IconExternalLink, IconArrowUpRight, IconStorefront, IconOfficeBuilding, IconLandmark, IconCross } from "@/components/icons/SectorIcons";
import { ArrowRight, Blocks, Check, ChevronDown, ChevronUp, Clock, Cpu, GraduationCap, Sprout, Wallet } from "lucide-react";
import { FOOTER_SECTOR_ICONS, SECTOR_ROUTES } from "@/data/sectorIcons";
import { useCounter } from "@/hooks/useCounter";

// ============================================================================
// BRIDGE SECTOR PAGE: Financial Inclusion & Economic Security
// Following established design system from Infrastructure sector page
// ============================================================================
// Design System: Dark Green #1B4D3E, Lime #B8D935, Off-white #F3F5F2
// ============================================================================

import { cn } from "@/lib/utils";
import { colors, layout } from "@/lib/theme";
import { useIsMobile } from "@/hooks/useIsMobile";
import SectorFinalCTA from "@/components/sectors/SectorFinalCTA";
import SectorHeroSection from "@/components/sectors/SectorHeroSection";
import SectorSolutionsSection from "@/components/sectors/SectorSolutionsSection";

const CONTENT_MAX_WIDTH = layout.maxWidth;

// Scroll index tracker hook
function useScrollIndex(count) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !el.children.length) return;
    const child = el.children[0]?.children?.[0] || el.children[0];
    if (!child) return;
    const childWidth = child.offsetWidth + parseInt(getComputedStyle(el.children[0] || el).gap || "0", 10);
    const idx = Math.round(el.scrollLeft / (childWidth || 1));
    setActiveIndex(Math.min(Math.max(idx, 0), count - 1));
  }, [count]);

  const scrollTo = useCallback((idx) => {
    const el = scrollRef.current;
    if (!el) return;
    const child = el.children[0]?.children?.[0] || el.children[0];
    if (!child) return;
    const gap = parseInt(getComputedStyle(el.children[0] || el).gap || "0", 10);
    const childWidth = child.offsetWidth + gap;
    el.scrollTo({ left: idx * childWidth, behavior: "smooth" });
  }, []);

  return { scrollRef, activeIndex, onScroll, scrollTo };
}

// Standard BRIDGE scroll dots (lime pill active, gray circle inactive)
const ScrollDots = ({ count, activeIndex, onDotClick, dark = false }) => (
  <div className="flex justify-center items-center gap-2 mt-5">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        onClick={() => onDotClick && onDotClick(i)}
        className="h-2 rounded cursor-pointer transition-all duration-300 ease-in-out"
        style={{
          width: i === activeIndex ? "24px" : "8px",
          backgroundColor: i === activeIndex ? colors.accent : dark ? "rgba(255,255,255,0.2)" : colors.line,
        }}
      />
    ))}
  </div>
);

// ============================================================================
// SECTOR DATA - Financial Inclusion & Economic Security
// ============================================================================

const sectorData = {
  id: 2,
  slug: "financial-inclusion",
  name: "Financial Inclusion & Economic Security",
  shortName: "Financial Inclusion",
  category: "Economic Enablers",
  categoryColor: "#1B4D3E",
  heroTitleBold: "Financial Inclusion",
  heroTitleRest: "& Economic Security",

  capitalRange: "$13-39M",
  ventures: 18,
  jobsImpact: "Millions of traders",
  gdpContribution: "70% GDP (MSMEs)",

  problemHeadline: "From Access to Prosperity",
  problemSubheadline:
    "Ghana has built Africa's most advanced financial infrastructure — $192 billion in mobile money transactions, 97% account access, and $6.65 billion in annual diaspora remittances. Now the pathway opens to transform this infrastructure into genuine economic security: financial literacy for 32 million citizens, productive credit for the MSMEs generating 70% of GDP, and investment channels that turn remittances into lasting wealth.",

  keyStats: [
    { value: "$192B", label: "Mobile Money (2024)", detail: "Digital rails built" },
    { value: "97%", label: "Financial Access", detail: "32% financially literate" },
    { value: "$2.2B", label: "MSME Credit Gap", detail: "35% access credit" },
    { value: "$6.65B", label: "Diaspora Remittances", detail: "90% to consumption" },
  ],

  painPoints: [
    {
      title: "Credit Modernization",
      description:
        "Market traders with decades of success need working capital that recognizes their track record — through transaction data, group guarantees, and alternative collateral models.",
      rootCauses: [
        { title: "Alternative Collateral Models", description: "Asset-light lending" },
        { title: "Credit Guarantee Structures", description: "Risk-sharing frameworks" },
        { title: "Data-Driven Assessment", description: "Transaction-based scoring" },
        { title: "Streamlined Documentation", description: "Digital-first processes" },
      ],
      quantification: "$2.2B addressable credit market; 70% of GDP from MSMEs",
      severity: "Flagship",
      severityScore: 95,
      affectedCount: "$2.2B",
      affectedLabel: "addressable credit gap",
      bridgeSolution: "Market Financial Services Platform",
    },
    {
      title: "Susu Digitization",
      description:
        "850+ collectors manage millions of clients — a trusted network ready for digital tools that enhance security, build formal credit histories, and unlock new services.",
      rootCauses: [
        { title: "Digitization Readiness", description: "Mobile-first tools" },
        { title: "Security Upgrade Potential", description: "Digital safeguards" },
        { title: "Credit Linkage Pathway", description: "Formal history creation" },
        { title: "Mobile Infrastructure Leverage", description: "Built on MoMo rails" },
      ],
      quantification: "Millions of active savers; credit history creation at scale",
      severity: "Flagship",
      severityScore: 92,
      affectedCount: "5M+",
      affectedLabel: "active savers to formalize",
      bridgeSolution: "Digital Susu Integration",
    },
    {
      title: "Diaspora Investment",
      description:
        "$6.65B flows home annually — diaspora members seeking productive channels that build lasting wealth and measurable impact in their home communities across Ghana.",
      rootCauses: [
        { title: "Fee Reduction Potential", description: "Cost optimization" },
        { title: "Investment Product Creation", description: "Peace & Prosperity Notes" },
        { title: "Hedging Solutions", description: "Currency risk management" },
        { title: "Trust-Building Transparency", description: "Impact verification" },
      ],
      quantification: "$6.65B annual flow; billions in deployable diaspora capital",
      severity: "Strategic",
      severityScore: 85,
      affectedCount: "$6.65B",
      affectedLabel: "annual remittance flow",
      bridgeSolution: "Diaspora Investment Gateway",
    },
    {
      title: "Women's Empowerment",
      description:
        "Women comprise 70-90% of susu participants and dominate market trading — a vast market ready for financial products designed around their business cycles and networks.",
      rootCauses: [
        { title: "Group-Based Collateral", description: "Social guarantees" },
        { title: "Women-Centered Design", description: "Cycle-aware products" },
        { title: "Flexible Access Channels", description: "Mobile-first delivery" },
        { title: "Association Partnerships", description: "Market Queen networks" },
      ],
      quantification: "70-90% of susu users are women; enormous untapped market",
      severity: "Strategic",
      severityScore: 80,
      affectedCount: "70-90%",
      affectedLabel: "of susu users are women",
      bridgeSolution: "Women's Economic Empowerment Fund",
    },
  ],

  solutions: [
    {
      tier: 1,
      name: "Market Financial Services Platform",
      description:
        "Integrated savings, credit, insurance, and payments for market traders linked to Kejetia infrastructure, with transaction-based credit scoring built in.",
      capital: "$1-3M",
      score: 42,
      impact: "Flagship model for 10,000+ traders",
      model: "Kejetia Market integration",
    },
    {
      tier: 1,
      name: "Trader Working Capital Facility",
      description:
        "Group-based and individual working capital loans using transaction data and trade history for credit assessment rather than traditional collateral.",
      capital: "$500K-2M",
      score: 42,
      impact: "Alternative to 100%+ informal rates",
      model: "Graduated trust-building",
    },
    {
      tier: 1,
      name: "Digital Susu Integration",
      description:
        "Technology platform enabling susu collectors to digitize daily operations while preserving trusted community relationships and creating credit histories.",
      capital: "$200-500K",
      score: 41,
      impact: "Formal credit histories from savings",
      model: "Association partnership",
    },
    {
      tier: 1,
      name: "Financial Health Hub",
      description:
        "Financial literacy training, business formalization support, and credit readiness preparation delivered through curriculum designed for adult learners.",
      capital: "$100-250K",
      score: 41,
      impact: "Building capability before credit",
      model: "Market platform integration",
    },
    {
      tier: 1,
      name: "Market Microinsurance Bundle",
      description:
        "Bundled stock protection, fire, health, and business interruption coverage for market traders, distributed through existing market associations.",
      capital: "$150-400K",
      score: 40,
      impact: "First protection for uninsured traders",
      model: "Licensed insurer partnership",
    },
    {
      tier: 1,
      name: "MSME Credit Guarantee Facility",
      description:
        "Partial credit guarantees enabling formal bank lending to MSMEs without traditional collateral, with BRIDGE providing first-loss capital de-risking.",
      capital: "$2-5M",
      score: 38,
      impact: "Unlocking formal bank MSME lending",
      model: "Dev. Bank Ghana alignment",
    },
    {
      tier: 2,
      name: "Diaspora Investment Gateway",
      description:
        "Platform connecting diaspora capital to vetted local investments through Peace & Prosperity Notes tied to specific projects with impact metrics.",
      capital: "$300-800K",
      score: 37,
      impact: "Channels billions in idle capital",
      model: "Philippines model adaptation",
    },
    {
      tier: 2,
      name: "Women's Economic Empowerment Fund",
      description:
        "Dedicated lending facility for women traders with products designed around women's business cycles and bundled with business development services.",
      capital: "$500K-1.5M",
      score: 37,
      impact: "Expanding women's financial access",
      model: "India SHG model learning",
    },
    {
      tier: 2,
      name: "Alternative Credit Scoring Platform",
      description:
        "Credit assessment engine using mobile money transactions, market activity, susu history, and behavioral indicators for thin-file borrowers.",
      capital: "$300-700K",
      score: 36,
      impact: "Making the invisible creditworthy",
      model: "ML-enabled credit bureau link",
    },
  ],

  competitors: [
    {
      name: "MTN Mobile Money",
      focus: "Digital payment rails",
      year: "2009",
      marketShare: "60%+",
      coverage: "National",
      type: "Collaborate",
      typeLabel: "Collaborate",
      strengths: [
        { name: "Digital Infrastructure", rating: 5 },
        { name: "Agent Network (896K)", rating: 5 },
        { name: "Consumer Trust", rating: 5 },
      ],
      gaps: ["Productive credit integration", "MSME product development", "Responsible lending frameworks"],
      bridgeOpportunity:
        "Leverage existing payment rails for market-based financial services — build on infrastructure rather than replicate it.",
      synergies: ["Payment integration", "Agent leverage", "Data scoring"],
    },
    {
      name: "Dev. Bank Ghana",
      focus: "Wholesale MSME finance",
      year: "2021",
      marketShare: "Emerging",
      coverage: "National",
      type: "Partner",
      typeLabel: "Strategic Partner",
      strengths: [
        { name: "Government Backing", rating: 5 },
        { name: "Policy Alignment", rating: 5 },
        { name: "Development Focus", rating: 4 },
      ],
      gaps: ["Scale acceleration partnership", "Retail channel development", "Last-mile delivery networks"],
      bridgeOpportunity:
        "On-lending partnership for last-mile MSME delivery through market-based channels and trader networks.",
      synergies: ["Credit guarantees", "MSME pipeline", "Technical assistance"],
    },
    {
      name: "Sinapi Aba Trust",
      focus: "Group lending & women's finance",
      year: "1994",
      marketShare: "15% MFI",
      coverage: "Rural",
      type: "Partner",
      typeLabel: "Strategic Partner",
      strengths: [
        { name: "Rural Presence", rating: 5 },
        { name: "Women Focus", rating: 5 },
        { name: "MSME Expertise", rating: 5 },
      ],
      gaps: ["Urban expansion opportunity", "Sustainable revenue models", "Technology platform integration"],
      bridgeOpportunity:
        "Delivery partner for market financial services — 30+ years of community trust enables rapid adoption.",
      synergies: ["Group lending", "Women's products", "Rural expansion"],
    },
    {
      name: "Susu Collectors Assoc.",
      focus: "Informal savings networks",
      year: null,
      marketShare: "850+ members",
      coverage: "National",
      type: "Essential",
      typeLabel: "Essential Partner",
      strengths: [
        { name: "Community Trust", rating: 5 },
        { name: "Collector Network", rating: 5 },
        { name: "Association Legitimacy", rating: 4 },
      ],
      gaps: ["Digital tool deployment", "Credit history infrastructure", "Association-led training"],
      bridgeOpportunity:
        "Essential gateway for susu digitization — Association legitimacy is the prerequisite for collector adoption at scale.",
      synergies: ["Digital susu platform", "Collector training", "Bank linkage"],
    },
    {
      name: "Digital Lenders",
      focus: "Instant consumer credit",
      year: "2018",
      marketShare: "Growing",
      coverage: "Urban",
      type: "Differentiate",
      typeLabel: "Differentiation",
      strengths: [
        { name: "Speed & Convenience", rating: 5 },
        { name: "Digital Experience", rating: 5 },
        { name: "Alternative Data Use", rating: 4 },
      ],
      gaps: ["Productive credit differentiation", "MSME market expansion", "Sustainable lending models"],
      bridgeOpportunity:
        "Differentiate through productive credit — serve the market traders and MSMEs that digital lenders overlook.",
      synergies: ["Alt-data methods", "Tech approaches", "Market gaps"],
    },
    {
      name: "Commercial Banks",
      focus: "Formal sector lending",
      year: null,
      marketShare: "85% formal",
      coverage: "Urban bias",
      type: "Collaborate",
      typeLabel: "Collaborate",
      strengths: [
        { name: "Capital Base", rating: 5 },
        { name: "Regulatory License", rating: 5 },
        { name: "Branch Infrastructure", rating: 4 },
      ],
      gaps: ["Alternative collateral structures", "Risk-sharing facilities", "MSME product co-development"],
      bridgeOpportunity:
        "Credit guarantee facility to de-risk MSME lending — unlocks bank capital for borrowers they currently exclude.",
      synergies: ["Guarantee facility", "MSME referrals", "Product co-dev"],
    },
  ],

  policyAlignment: [
    // DIRECT FUNDING (4)
    {
      policy: "Development Bank Ghana Expansion",
      body: "Ministry of Finance / AfDB",
      allocation: "$80M+ AfDB Facility",
      category: "funding",
      alignment:
        "Wholesale MSME finance institution seeking retail delivery partners — BRIDGE provides last-mile channels for credit guarantees and on-lending.",
      bridgeRole:
        "BRIDGE serves as retail delivery partner, connecting Development Bank Ghana wholesale capital to market traders and MSMEs through susu networks and digital platforms.",
      bridgeVentures: ["MSME Credit Guarantee Fund", "Working Capital Facility", "Alternative Credit Scoring"],
      pillars: ["Credit Guarantees", "On-Lending", "Technical Assistance"],
    },
    {
      policy: "24-Hour Economy MSME Fund",
      body: "Office of the President / DACF",
      allocation: "GH\u20B52.2B+ (DACF)",
      category: "funding",
      alignment:
        "Market development pillar requiring financial services integration — vendor digitization and digital payment systems create scalable inclusion touchpoints.",
      bridgeRole:
        "BRIDGE operationalizes the financial services layer of the 24-Hour Economy by digitizing market vendor payments and building credit access tools for night-economy businesses.",
      bridgeVentures: ["Market Financial Platform", "Digital Payment Hub", "Vendor Credit Program"],
      pillars: ["Market Payments", "Vendor Credit", "Digital Tools"],
    },
    {
      policy: "USAID / MasterCard Foundation Programs",
      body: "Development Partners",
      allocation: "Multi-Year Grants",
      category: "funding",
      alignment:
        "Financial inclusion programs targeting women, youth, and rural populations with grants and technical assistance — BRIDGE ventures directly serve these priority segments.",
      bridgeRole:
        "BRIDGE aligns venture impact reporting with DFI priority metrics, enabling co-funding partnerships for women-focused savings products and rural digital financial literacy.",
      bridgeVentures: ["Women's Financial Empowerment Fund", "Financial Literacy Platform", "Susu Digitization"],
      pillars: ["Women & Youth", "Rural Inclusion", "Impact Measurement"],
    },
    {
      policy: "National Financial Inclusion Strategy",
      body: "Ministry of Finance / Bank of Ghana",
      allocation: "Policy Commitment",
      category: "funding",
      alignment:
        "85% meaningful inclusion target emphasizing the shift beyond basic account ownership to productive financial use — directly aligned with BRIDGE's core mission.",
      bridgeRole:
        "BRIDGE provides the operational layer to convert strategy targets into ground-level outcomes — moving 97% account access toward genuine financial security through literacy, credit, and insurance.",
      bridgeVentures: ["Financial Literacy Platform", "Microinsurance Bundle", "MSME Credit Guarantee Fund"],
      pillars: ["85% Target", "Meaningful Use", "Digital Literacy"],
    },
    // TAX INCENTIVES (3)
    {
      policy: "Digital Credit Services Directive",
      body: "Bank of Ghana",
      allocation: "Regulatory Framework",
      category: "tax",
      alignment:
        "Landmark directive bringing digital lenders under formal supervision with consumer protections — creating first-mover advantage for compliant platforms.",
      bridgeRole:
        "BRIDGE obtains early licensing (deadline June 2026) to operate as a compliant digital credit provider, with GH\u20B510K loan caps and daily reporting already built into platform design.",
      bridgeVentures: ["Alternative Credit Scoring", "Digital Credit Platform", "Market Financial Platform"],
      pillars: ["Licensing by June 2026", "GH\u20B510K Loan Cap", "Consumer Protection"],
    },
    {
      policy: "Microfinance Tiered Licensing",
      body: "Bank of Ghana",
      allocation: "GH\u20B52M\u2013GH\u20B550M Tiers",
      category: "tax",
      alignment:
        "Four-tier structure from regional MFIs (Tier 1, GH\u20B52M capital) to Microfinance Banks (Tier 4, GH\u20B550M) — providing scalable entry points for inclusion ventures.",
      bridgeRole:
        "BRIDGE enters at Tier 1 with susu-integrated microfinance in Kejetia, then scales up tiers as the platform matures — a regulatory-aligned growth pathway from pilot to national bank.",
      bridgeVentures: ["MFI License Application", "Susu Digitization", "Savings Products"],
      pillars: ["Tier 1 Entry", "Scalable Growth", "Regulatory Pathway"],
    },
    {
      policy: "E-Levy Reform & Mobile Money Incentives",
      body: "Ministry of Finance / Ghana Revenue Authority",
      allocation: "Tax Relief Measures",
      category: "tax",
      alignment:
        "Reformed e-levy reduces transaction costs on mobile money — lowering barriers to digital financial services adoption for market traders and informal sector workers.",
      bridgeRole:
        "BRIDGE leverages reduced transaction costs to drive mobile payment adoption at Kejetia and build digital transaction histories that feed alternative credit scoring.",
      bridgeVentures: ["Digital Payment Hub", "Alternative Credit Scoring", "Market Financial Platform"],
      pillars: ["Reduced Fees", "Transaction Histories", "Adoption Drive"],
    },
    // INFRASTRUCTURE (3)
    {
      policy: "Payment Systems Act Framework",
      body: "Bank of Ghana",
      allocation: "National Infrastructure",
      category: "infrastructure",
      alignment:
        "Framework for payment service providers and e-money issuers enabling mobile money innovation while ensuring stability — the digital rails BRIDGE ventures run on.",
      bridgeRole:
        "BRIDGE builds on Ghana's world-class payment rails ($192B mobile money ecosystem) to layer credit, savings, and insurance products atop existing infrastructure.",
      bridgeVentures: ["Digital Payment Hub", "Mobile Banking Integration", "Market Financial Platform"],
      pillars: ["E-Money Licensing", "Interoperability", "Consumer Protection"],
    },
    {
      policy: "GhQR National Payment Standard",
      body: "Ghana Interbank Payment & Settlement Systems",
      allocation: "Interoperability Platform",
      category: "infrastructure",
      alignment:
        "Universal QR standard enabling interoperable payments across all banks and mobile money providers — one scan, any provider, any merchant.",
      bridgeRole:
        "BRIDGE deploys GhQR at every Kejetia Market stall, creating the largest single-site QR payment deployment in Ghana and generating transaction data for credit scoring.",
      bridgeVentures: ["Market Financial Platform", "Digital Payment Hub", "Alternative Credit Scoring"],
      pillars: ["Universal QR", "Cross-Provider", "Merchant Adoption"],
    },
    {
      policy: "Credit Bureau Infrastructure Expansion",
      body: "Bank of Ghana / XDS Data Ghana",
      allocation: "Data Infrastructure",
      category: "infrastructure",
      alignment:
        "Credit bureau coverage expanding but limited for informal sector — foundation for alternative data credit scoring that can make the invisible creditworthy.",
      bridgeRole:
        "BRIDGE feeds susu savings data and market transaction records into credit bureau systems, creating formal credit histories for traders who have never had bank accounts.",
      bridgeVentures: ["Alternative Credit Scoring", "Susu Digitization", "MSME Credit Guarantee Fund"],
      pillars: ["Alternative Data", "Informal Sector", "Credit Histories"],
    },
    // PARTNERSHIPS (3)
    {
      policy: "Bank of Ghana FinTech & Innovation Office",
      body: "Bank of Ghana",
      allocation: "Regulatory Sandbox",
      category: "partnerships",
      alignment:
        "Dedicated unit supporting inclusive fintech innovation through sandbox approaches — receptive to solutions that expand inclusion while maintaining consumer protection.",
      bridgeRole:
        "BRIDGE engages the FinTech Office as a regulatory partner from day one, using sandbox access to pilot susu digitization and alternative credit scoring with full regulatory visibility.",
      bridgeVentures: ["Susu Digitization", "Alternative Credit Scoring", "Digital Credit Platform"],
      pillars: ["Sandbox Access", "Innovation Support", "Regulatory Dialog"],
    },
    {
      policy: "World Bank / IFC Financial Sector Programs",
      body: "World Bank Group",
      allocation: "Multi-Year Program",
      category: "partnerships",
      alignment:
        "Credit guarantee programs, digital finance initiatives, and MSME support — potential co-investment and technical assistance alignment for BRIDGE ventures.",
      bridgeRole:
        "BRIDGE positions as an IFC co-investment partner for blended finance structures, leveraging World Bank credit guarantee frameworks to de-risk MSME lending at market level.",
      bridgeVentures: ["MSME Credit Guarantee Fund", "Women's Financial Empowerment Fund", "Working Capital Facility"],
      pillars: ["Credit Guarantees", "Blended Finance", "MSME Support"],
    },
    {
      policy: "National Insurance Commission 10% Target",
      body: "National Insurance Commission",
      allocation: "Growth Mandate",
      category: "partnerships",
      alignment:
        "Targeting 10% insurance penetration from current 1% — supportive of microinsurance innovation for the 80%+ informal workforce currently uninsured.",
      bridgeRole:
        "BRIDGE develops microinsurance bundles (health, asset, crop) distributed through susu networks, aligning with NIC's penetration targets while serving market traders' real needs.",
      bridgeVentures: ["Microinsurance Bundle", "Susu Digitization", "Women's Financial Empowerment Fund"],
      pillars: ["Microinsurance", "10% Penetration", "Informal Sector"],
    },
  ],

  crossSector: [
    {
      sectorId: 1,
      name: "Infrastructure",
      connection: "Payment systems for utilities, infrastructure financing, construction working capital",
      multiplier: "3.2x",
      synergies: [
        "Digital payments at kiosks",
        "Infrastructure-backed lending",
        "Utility fee collection",
        "Construction working capital",
        "Municipal bond access",
        "Project escrow services",
      ],
      bridgeVentures: ["Market Financial Platform", "Asset Finance"],
      impact: "Financial services enable infrastructure development and payment",
    },
    {
      sectorId: 3,
      name: "Health Systems",
      connection: "Health insurance integration, health savings accounts, facility financing",
      multiplier: "2.8x",
      synergies: [
        "Health insurance bundling",
        "Health savings products",
        "Emergency medical coverage",
        "Facility equipment finance",
        "Pharmacy credit lines",
        "Community health funds",
      ],
      bridgeVentures: ["Microinsurance Bundle", "Savings Products"],
      impact: "Financial protection against health shocks for informal workers",
    },
    {
      sectorId: 6,
      name: "Agriculture",
      connection: "Input financing, crop insurance, value chain finance, harvest purchase credit",
      multiplier: "4.5x",
      synergies: [
        "Farmer input loans",
        "Crop insurance products",
        "Aggregator finance",
        "Harvest purchase credit",
        "Equipment leasing",
        "Warehouse receipt finance",
      ],
      bridgeVentures: ["Working Capital Facility", "Alternative Credit Scoring"],
      impact: "Enables agricultural value capture through appropriate finance",
    },
    {
      sectorId: 4,
      name: "Technology",
      connection: "Fintech partnerships, alternative scoring, digital infrastructure",
      multiplier: "3.5x",
      synergies: [
        "Credit scoring technology",
        "Digital payment rails",
        "Data infrastructure",
        "API integrations",
        "Identity verification",
        "Fraud detection systems",
      ],
      bridgeVentures: ["Digital Susu Platform", "Alternative Credit Scoring"],
      impact: "Technology enables financial inclusion at scale",
    },
    {
      sectorId: 5,
      name: "Education",
      connection: "Education savings products, school fee financing, financial literacy curriculum",
      multiplier: "2.4x",
      synergies: [
        "School fee financing",
        "Education savings accounts",
        "Youth financial literacy",
        "Teacher salary advances",
        "Scholarship fund mgmt",
        "Textbook micro-credit",
      ],
      bridgeVentures: ["Remittance-to-Investment", "Financial Health Hub"],
      impact: "Financial planning enables education investment",
    },
  ],

  relatedSectors: [
    { id: 1, name: "Infrastructure", icon: "building", reason: "Market payments, utility financing" },
    { id: 6, name: "Agriculture", icon: "wheat", reason: "Input finance, crop insurance" },
    { id: 4, name: "Technology", icon: "cpu", reason: "Fintech partnerships, digital scoring" },
  ],
};

// ============================================================================
// VALUE CHAIN DATA - Financial Inclusion
// ============================================================================

const valueChainStages = [
  {
    id: 1,
    stage: "Formal Institutions",
    actor: "Banks & MFIs",
    population: "23 banks, 144 community banks",
    valueRetained: 100,
    stat: "35%",
    statLabel: "MSME Access",
    painPoints: [
      "Alternative collateral models",
      "Guarantee facility structures",
      "MSME product innovation",
      "Blended capital opportunity",
    ],
  },
  {
    id: 2,
    stage: "Digital Rails",
    actor: "Mobile Money",
    population: "74.1M accounts, 896K agents",
    valueRetained: 85,
    stat: "$192B",
    statLabel: "Transactions",
    painPoints: [
      "Productive credit integration",
      "Responsible lending frameworks",
      "Working capital products",
      "Transaction-based pricing",
    ],
  },
  {
    id: 3,
    stage: "Informal Systems",
    actor: "Susu Collectors",
    population: "850+ registered, millions served",
    valueRetained: 65,
    stat: "70-90%",
    statLabel: "Women Users",
    painPoints: [
      "Digitization readiness",
      "Credit history creation",
      "Security upgrade potential",
      "Bank linkage pathway",
    ],
  },
  {
    id: 4,
    stage: "Diaspora Flows",
    actor: "Remittances",
    population: "$6.65B annual, 3M diaspora",
    valueRetained: 45,
    stat: "90%",
    statLabel: "Consumed",
    painPoints: [
      "Fee reduction potential",
      "Investment channel creation",
      "Peace & Prosperity Notes",
      "Hedging solutions",
    ],
  },
  {
    id: 5,
    stage: "End Users",
    actor: "Traders & MSMEs",
    population: "92% of businesses, 70% GDP",
    valueRetained: 25,
    stat: "$2.2B",
    statLabel: "Credit Gap",
    painPoints: [
      "Fair-rate credit access",
      "Business support services",
      "Credit history pathways",
      "Alternative collateral models",
    ],
  },
];

// ============================================================================
// ICON COMPONENTS
// ============================================================================

// Stage icons array for value chain (indexed by position)
const stageIcons = [<IconBank />, <IconPhone />, <IconHandshake />, <IconGlobe />, <IconStore />];


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
// PROBLEM SECTION
// ============================================================================

const ProblemCard = ({ problem, isExpanded, onToggle }) => {
  const isMobile = useIsMobile();

  return (
    <div
      onClick={onToggle}
      className="cursor-pointer transition-all duration-300 ease-in-out"
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
            className="font-[Inter,sans-serif] text-[#666] mt-2 mb-0 ml-0 mr-0 leading-[1.55] overflow-hidden"
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
          className="font-[Inter,sans-serif] text-[11px] font-bold py-1.5 px-[14px] rounded-[20px] whitespace-nowrap shrink-0 ml-3"
          style={{
            color: problem.severity === "Flagship" ? colors.primary : colors.accentText,
            backgroundColor: problem.severity === "Flagship" ? colors.accentLight : "rgba(184,217,53,0.12)",
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
        <div
          className="pt-4"
          style={{ borderTop: `1px solid ${colors.line}` }}
        >
          <div
            className="grid gap-3 mb-4"
            style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}
          >
            <div
              className="rounded-xl p-[14px]"
              style={{ backgroundColor: colors.background }}
            >
              <div className="flex items-center justify-between mb-[10px]">
                <span className="font-[Inter,sans-serif] text-[11px] font-semibold uppercase tracking-[0.5px] text-[#888]">
                  Priority
                </span>
                <span
                  className="font-[Inter,sans-serif] text-xs font-bold px-[10px] py-1 rounded-[20px]"
                  style={{
                    color: problem.severity === "Flagship" ? colors.primary : colors.accentText,
                    backgroundColor: problem.severity === "Flagship" ? colors.accentLight : "rgba(184,217,53,0.12)",
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
                  className="h-full rounded transition-[width] duration-500 ease-in-out"
                  style={{
                    width: `${problem.severityScore}%`,
                    backgroundColor: problem.severity === "Flagship" ? colors.primary : colors.accentText,
                  }}
                />
              </div>
            </div>

            <div
              className="rounded-xl p-[14px]"
              style={{ backgroundColor: colors.background }}
            >
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
                    <span className="font-[Inter,sans-serif] text-xs text-[#888]">
                      {cause.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="pt-4"
            style={{
              display: "flex",
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
                className="font-[Inter,sans-serif] text-sm font-semibold flex-1 min-w-0"
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

const ProblemSection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [expandedCard, setExpandedCard] = useState(null);
  const problemScroll = useScrollIndex(sector.painPoints.length);

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
            className="inline-block py-[10px] px-5 rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif]"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
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
            <span style={{ color: colors.accent }} className="font-semibold">$2.2B</span> in unmet{" "}
            <span className="font-semibold">credit demand</span> ready to fuel Ghana's entrepreneurs
          </h2>

          <p
            className="font-[Inter,sans-serif] text-[#666] leading-[1.65] m-0 max-w-[680px]"
            style={{ fontSize: isMobile ? "15px" : "16px" }}
          >
            Ghana's world-leading mobile money infrastructure creates the foundation for the next leap: productive
            credit for traders, digital pathways for savings communities, investment channels for diaspora capital, and
            tailored products for women entrepreneurs.
          </p>
        </div>

        <div
          ref={isMobile ? problemScroll.scrollRef : null}
          onScroll={isMobile ? problemScroll.onScroll : undefined}
          className={isMobile ? "hide-scrollbar" : undefined}
          style={
            isMobile
              ? {
                  display: "flex",
                  gap: "12px",
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  margin: "0 -20px",
                  padding: "0 20px",
                }
              : {
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "24px",
                }
          }
        >
          {sector.painPoints.map((problem, i) => (
            <div
              key={i}
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
          <ScrollDots
            count={sector.painPoints.length}
            activeIndex={problemScroll.activeIndex}
            onDotClick={problemScroll.scrollTo}
          />
        )}
      </div>
      {/* end maxWidth wrapper */}
    </section>
  );
};

// ============================================================================
// VALUE CHAIN SECTION
// ============================================================================

const ValueChainSectionPremium = () => {
  const isMobile = useIsMobile();
  const [selectedStage, setSelectedStage] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const vcScroll = useScrollIndex(valueChainStages.length);

  return (
    <section
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Header */}
        <div className="text-center mb-12">
          <span
            className="inline-block py-[10px] px-5 rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
            }}
          >
            The Process
          </span>

          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] mb-5 mt-0 max-w-[600px] mx-auto"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
            }}
          >
            Where Value Flows, <span style={{ color: colors.accent }} className="font-semibold">Opportunity Follows</span>
          </h2>

          <p className="font-[Inter,sans-serif] text-base text-[#666] leading-[1.65] mx-auto mt-0 max-w-[750px]">
            Tracking how financial value flows through Ghana's economy — and where strategic innovation unlocks
            compounding opportunity at each stage.
          </p>
        </div>

        {/* ========== CARD ROW ========== */}
        <div
          ref={isMobile ? vcScroll.scrollRef : null}
          onScroll={isMobile ? vcScroll.onScroll : undefined}
          className={isMobile ? "hide-scrollbar" : undefined}
          style={
            isMobile
              ? {
                  display: "flex",
                  gap: "10px",
                  overflowX: "auto",
                  scrollSnapType: "x mandatory",
                  WebkitOverflowScrolling: "touch",
                  padding: "0",
                  marginBottom: "0",
                }
              : {
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: "16px",
                  marginBottom: "48px",
                }
          }
        >
          {valueChainStages.map((stage, idx) => {
            const isSelected = selectedStage === idx;
            return (
              <div
                key={stage.id}
                onClick={() => {
                  setSelectedStage(idx);
                  if (isMobile) setShowDetail(true);
                }}
                style={{
                  cursor: "pointer",
                  ...(isMobile ? { minWidth: "44%", maxWidth: "44%", flexShrink: 0, scrollSnapAlign: "start" } : {}),
                }}
              >
                {/* Card */}
                <div
                  style={{
                    width: "100%",
                    backgroundColor: isSelected ? colors.primary : colors.background,
                    border: isSelected ? `2px solid ${colors.primary}` : `2px solid ${colors.primary}`,
                    borderRadius: isMobile ? "14px" : "20px",
                    padding: isMobile ? "16px 12px" : "28px 24px",
                    transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    minHeight: isMobile ? "180px" : "280px",
                    justifyContent: "space-between",
                    boxSizing: "border-box",
                    position: "relative",
                  }}
                >
                  {/* Center: Big stat */}
                  <div style={{ marginTop: isMobile ? "16px" : "24px", marginBottom: isMobile ? "8px" : "16px" }}>
                    <div
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: isMobile ? "20px" : "28px",
                        fontWeight: "700",
                        color: isSelected ? colors.accent : colors.primary,
                        lineHeight: "1",
                        marginBottom: "4px",
                        transition: "color 0.35s ease",
                      }}
                    >
                      {stage.stat}
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: isMobile ? "10px" : "13px",
                        fontWeight: "500",
                        color: isSelected ? "rgba(255,255,255,0.6)" : "#999",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                        transition: "color 0.35s ease",
                      }}
                    >
                      {stage.statLabel}
                    </div>
                  </div>

                  {/* Bottom: Label group */}
                  <div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: isMobile ? "9px" : "10px",
                        fontWeight: "700",
                        color: isSelected ? colors.accent : colors.accent,
                        textTransform: "uppercase",
                        letterSpacing: "1.5px",
                        marginBottom: "6px",
                      }}
                    >
                      Stage {stage.id}
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: isMobile ? "14px" : "17px",
                        fontWeight: "600",
                        color: isSelected ? colors.white : colors.primary,
                        marginBottom: "4px",
                        lineHeight: "1.25",
                        transition: "color 0.35s ease",
                      }}
                    >
                      {stage.stage}
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        color: isSelected ? "rgba(255,255,255,0.5)" : "#999",
                        fontWeight: "400",
                        transition: "color 0.35s ease",
                      }}
                    >
                      {stage.actor}
                    </div>
                  </div>

                  {/* Value bar at bottom */}
                  <div style={{ width: "100%", marginTop: isMobile ? "8px" : "16px" }}>
                    <div
                      style={{
                        height: "3px",
                        backgroundColor: isSelected ? "rgba(255,255,255,0.15)" : colors.line,
                        borderRadius: "2px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${stage.valueRetained}%`,
                          backgroundColor: colors.accent,
                          borderRadius: "2px",
                          transition: "all 0.5s ease",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "10px",
                        color: isSelected ? "rgba(255,255,255,0.4)" : "#bbb",
                        marginTop: "6px",
                        transition: "color 0.35s ease",
                      }}
                    >
                      {stage.valueRetained}% value retained
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {isMobile && (
          <ScrollDots
            count={valueChainStages.length}
            activeIndex={vcScroll.activeIndex}
            onDotClick={(i) => {
              vcScroll.scrollTo(i);
              setSelectedStage(i);
            }}
          />
        )}

        {/* ========== MOBILE DETAIL TOGGLE ========== */}
        {isMobile && !showDetail && (
          <button
            onClick={() => setShowDetail(true)}
            className="flex items-center justify-center gap-2 w-full p-[14px] rounded-xl font-[Inter,sans-serif] text-sm font-semibold cursor-pointer mb-6"
            style={{
              backgroundColor: colors.lightGreen,
              border: `1.5px solid ${colors.primary}`,
              color: colors.primary,
            }}
          >
            View {valueChainStages[selectedStage].stage} Details
            <ChevronDown size={14} strokeWidth={2.5} color={colors.primary} />
          </button>
        )}

        {/* ========== DETAIL PANEL ========== */}
        {(!isMobile || showDetail) && (
          <>
            <div
              style={{
                backgroundColor: colors.background,
                border: `2px solid ${colors.primary}`,
                borderRadius: isMobile ? "16px" : "20px",
                padding: isMobile ? "20px 20px" : "24px 32px",
                display: isMobile ? "flex" : "grid",
                flexDirection: "column",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1px 1.6fr",
                gap: isMobile ? "24px" : "32px",
                alignItems: isMobile ? "center" : "start",
                textAlign: isMobile ? "center" : "left",
              }}
            >
              {/* Left: Key Actors */}
              <div className="w-full">
                <div
                  className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1.5px] mb-2"
                  style={{ color: colors.accent }}
                >
                  Key Actors
                </div>
                <div
                  className="font-[Inter,sans-serif] font-bold leading-[1.2] mb-1.5"
                  style={{
                    fontSize: isMobile ? "18px" : "20px",
                    color: colors.primary,
                  }}
                >
                  {valueChainStages[selectedStage].stage}
                </div>
                <div className="font-[Inter,sans-serif] text-sm text-[#666] leading-[1.4]">
                  {valueChainStages[selectedStage].population}
                </div>

                {/* Mini value indicator */}
                <div
                  className="mt-[14px] rounded-[10px] py-[10px] px-3"
                  style={{
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.line}`,
                    ...(isMobile ? { maxWidth: "200px", margin: "14px auto 0" } : {}),
                  }}
                >
                  <div className="flex items-baseline gap-1.5 mb-[5px]">
                    <span
                      className="font-[Poppins,sans-serif] text-xl font-bold"
                      style={{ color: colors.accent }}
                    >
                      {valueChainStages[selectedStage].valueRetained}%
                    </span>
                    <span className="font-[Inter,sans-serif] text-xs text-[#999]">
                      value retained
                    </span>
                  </div>
                  <div
                    className="h-1 rounded-[3px] overflow-hidden"
                    style={{ backgroundColor: colors.line }}
                  >
                    <div
                      className="h-full rounded-[3px] transition-[width] duration-500 ease-in-out"
                      style={{
                        width: `${valueChainStages[selectedStage].valueRetained}%`,
                        backgroundColor: colors.accent,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Divider */}
              {!isMobile && (
                <div className="self-stretch" style={{ backgroundColor: colors.line }} />
              )}
              {isMobile && (
                <div className="h-px w-full" style={{ backgroundColor: colors.line }} />
              )}

              {/* Right: Opportunities */}
              <div className="w-full">
                <div
                  className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1.5px] mb-[14px]"
                  style={{ color: colors.accent }}
                >
                  Opportunities at This Stage
                </div>
                <div
                  className="grid gap-[10px]"
                  style={{ gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr" }}
                >
                  {valueChainStages[selectedStage].painPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="rounded-[10px] py-3 px-[14px] flex items-center gap-[10px]"
                      style={{
                        backgroundColor: colors.white,
                        border: `1px solid ${colors.line}`,
                      }}
                    >
                      <div
                        className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: colors.lightGreen,
                          color: colors.primary,
                        }}
                      >
                        <IconCheck />
                      </div>
                      <span className="font-[Inter,sans-serif] text-[13px] text-[#555] leading-[1.4]">
                        {point}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile collapse button */}
            {isMobile && (
              <button
                onClick={() => setShowDetail(false)}
                className="flex items-center justify-center gap-1.5 w-full p-3 mt-3 bg-transparent border-none font-[Inter,sans-serif] text-[13px] font-semibold text-[#999] cursor-pointer"
              >
                Collapse
                <ChevronUp size={14} strokeWidth={2.5} color="#999" />
              </button>
            )}
          </>
        )}

        {/* ========== FLOW SUMMARY BAR ========== */}
        <div
          className={cn("mt-8 flex items-center justify-center", isMobile ? "gap-2 flex-wrap" : "gap-4 flex-nowrap")}
        >
          {valueChainStages.map((stage, idx) => (
            <React.Fragment key={stage.id}>
              <button
                onClick={() => setSelectedStage(idx)}
                className="rounded-full cursor-pointer flex items-center gap-2 transition-all duration-300 ease-in-out"
                style={{
                  backgroundColor: selectedStage === idx ? colors.accent : colors.background,
                  border: selectedStage === idx ? "none" : `1px solid ${colors.line}`,
                  padding: selectedStage === idx ? "8px 20px" : "8px 14px",
                }}
              >
                <span
                  className="font-[Poppins,sans-serif] text-[13px] font-bold"
                  style={{ color: selectedStage === idx ? colors.primary : "#999" }}
                >
                  {idx + 1}
                </span>
                {selectedStage === idx && (
                  <span
                    className="font-[Inter,sans-serif] text-xs font-semibold"
                    style={{ color: colors.primary }}
                  >
                    {stage.stage}
                  </span>
                )}
              </button>
              {idx < valueChainStages.length - 1 && !isMobile && (
                <div
                  className="w-6 h-0.5 rounded-sm transition-colors duration-300 ease-in-out"
                  style={{ backgroundColor: idx < selectedStage ? colors.accent : colors.line }}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// MARKET ECOSYSTEM SECTION
// ============================================================================

const ecosystemTypeStyle = {
  Partner: { color: "#B8D935", bg: "rgba(184,217,53,0.15)", darkBg: "rgba(184,217,53,0.12)" },
  Essential: { color: "#6ECBA0", bg: "rgba(110,203,160,0.12)", darkBg: "rgba(110,203,160,0.12)" },
  Collaborate: { color: "#A3C585", bg: "rgba(163,197,133,0.12)", darkBg: "rgba(163,197,133,0.15)" },
  Differentiate: { color: "#D4E157", bg: "rgba(212,225,87,0.12)", darkBg: "rgba(212,225,87,0.12)" },
};

const MarketEcosystemSection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [selected, setSelected] = useState(0);
  const [showDetail, setShowDetail] = useState(false);
  const partner = sector.competitors[selected];
  const ts = ecosystemTypeStyle[partner.type];
  const ecoScroll = useScrollIndex(sector.competitors.length);

  return (
    <section
      style={{
        backgroundColor: colors.background,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Header */}
        <span
          className="inline-block py-[10px] px-5 rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
          style={{
            backgroundColor: colors.white,
            border: `1px solid ${colors.line}`,
            color: colors.primary,
          }}
        >
          The Landscape
        </span>

        <h2
          className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] mb-5 mt-0"
          style={{
            fontSize: isMobile ? "28px" : "42px",
            color: colors.primary,
          }}
        >
          Building With Ghana's <span style={{ color: colors.accent }} className="font-semibold">Strongest Institutions</span>
        </h2>

        <p className="font-[Inter,sans-serif] text-base text-[#666] leading-[1.65] mt-0 mb-8 max-w-[750px]">
          Ghana's financial ecosystem features powerful players at every level. BRIDGE brings complementary capabilities
          — combining strengths, aligning resources, creating shared value.
        </p>

        {/* Main Grid */}
        <div
          style={{
            display: isMobile ? "flex" : "grid",
            flexDirection: "column",
            gridTemplateColumns: isMobile ? "1fr" : "360px 1fr",
            gap: "24px",
            alignItems: "stretch",
          }}
        >
          {/* LEFT: Partner list */}
          <div
            ref={isMobile ? ecoScroll.scrollRef : null}
            onScroll={isMobile ? ecoScroll.onScroll : undefined}
            className={isMobile ? "hide-scrollbar" : undefined}
            style={{
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              justifyContent: isMobile ? "flex-start" : "space-between",
              gap: isMobile ? "8px" : "0px",
              ...(isMobile ? { overflowX: "auto", WebkitOverflowScrolling: "touch", padding: "0" } : {}),
            }}
          >
            {sector.competitors.map((p, idx) => {
              const isActive = selected === idx;
              const pts = ecosystemTypeStyle[p.type];
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setSelected(idx);
                    if (isMobile) setShowDetail(true);
                  }}
                  style={{
                    backgroundColor: isActive ? colors.white : "transparent",
                    borderRadius: "12px",
                    padding: isMobile ? "12px 16px" : "18px 20px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    border: isActive ? `2px solid ${colors.accent}` : "2px solid transparent",
                    boxShadow: isActive ? "0 4px 16px rgba(27,77,62,0.07)" : "none",
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "10px" : "14px",
                    flex: isMobile ? "0 0 auto" : 1,
                    ...(isMobile ? { minWidth: "fit-content", whiteSpace: "nowrap" } : {}),
                  }}
                >
                  <div
                    style={{
                      width: "3px",
                      height: "40px",
                      borderRadius: "2px",
                      backgroundColor: isActive ? pts.color : "transparent",
                      transition: "all 0.2s ease",
                      flexShrink: 0,
                    }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "17px",
                        fontWeight: "700",
                        color: isActive ? colors.primary : "#444",
                        lineHeight: "1.25",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {p.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "13px",
                        color: "#999",
                        lineHeight: "1.3",
                        marginTop: "3px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {p.focus}
                    </div>
                  </div>

                  <span
                    style={{
                      backgroundColor: isActive ? pts.bg : colors.background,
                      color: isActive ? pts.color : "#aaa",
                      padding: "4px 10px",
                      borderRadius: "50px",
                      fontSize: "9px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontFamily: "Inter, sans-serif",
                      flexShrink: 0,
                      transition: "all 0.2s ease",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.type}
                  </span>
                </div>
              );
            })}
          </div>

          {isMobile && (
            <ScrollDots
              count={sector.competitors.length}
              activeIndex={ecoScroll.activeIndex}
              onDotClick={(i) => {
                ecoScroll.scrollTo(i);
                setSelected(i);
              }}
            />
          )}

          {/* Mobile: View Details button when collapsed */}
          {isMobile && !showDetail && (
            <button
              onClick={() => setShowDetail(true)}
              className="flex items-center justify-center gap-2 w-full p-[14px] rounded-xl font-[Inter,sans-serif] text-sm font-semibold cursor-pointer"
              style={{
                backgroundColor: colors.white,
                border: `1.5px solid ${colors.primary}`,
                color: colors.primary,
              }}
            >
              View {partner.name} Details
              <ChevronDown size={14} strokeWidth={2.5} color={colors.primary} />
            </button>
          )}

          {/* RIGHT: Detail panel */}
          {(!isMobile || showDetail) && (
            <>
              <div
                className="overflow-hidden flex flex-col"
                style={{
                  backgroundColor: colors.white,
                  borderRadius: isMobile ? "16px" : "20px",
                  border: `1px solid ${colors.line}`,
                }}
              >
                {/* Dark header — compact on mobile */}
                <div
                  style={{
                    backgroundColor: colors.primary,
                    padding: isMobile ? "20px" : "24px 36px 28px",
                  }}
                >
                  {/* Badge row */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="py-1 px-3 rounded-full text-[10px] font-bold uppercase tracking-[0.8px] font-[Inter,sans-serif]"
                      style={{ backgroundColor: ts.darkBg, color: ts.color }}
                    >
                      {partner.typeLabel}
                    </span>
                    {partner.year && (
                      <span className="font-[Inter,sans-serif] text-xs text-white/40">
                        Since {partner.year}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h3
                    className="font-[Inter,sans-serif] font-semibold mt-0 mb-3 leading-[1.2]"
                    style={{
                      fontSize: isMobile ? "20px" : "26px",
                      color: colors.white,
                    }}
                  >
                    {partner.name}
                  </h3>

                  {/* Stats row */}
                  <div
                    style={{
                      display: "flex",
                      gap: isMobile ? "24px" : "28px",
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: isMobile ? "16px" : "18px",
                          fontWeight: "700",
                          color: colors.accent,
                          lineHeight: "1",
                          marginBottom: "3px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {partner.marketShare}
                      </div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "9px",
                          color: "rgba(255,255,255,0.4)",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Market Share
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: isMobile ? "16px" : "18px",
                          fontWeight: "700",
                          color: colors.accent,
                          lineHeight: "1",
                          marginBottom: "3px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {partner.coverage}
                      </div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "9px",
                          color: "rgba(255,255,255,0.4)",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        Coverage
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div
                  style={{
                    padding: isMobile ? "20px" : "28px 36px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                      gap: isMobile ? "24px" : "32px",
                      marginBottom: "24px",
                    }}
                  >
                    {/* Strengths */}
                    <div>
                      <div
                        className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1.5px] mb-4"
                        style={{ color: colors.primary }}
                      >
                        Core Strengths
                      </div>
                      {partner.strengths.map((s, i) => (
                        <div key={i} className="mb-[14px]">
                          <div className="flex justify-between items-center mb-1.5">
                            <span
                              className="font-[Inter,sans-serif] text-[13px] font-medium"
                              style={{ color: colors.dark }}
                            >
                              {s.name}
                            </span>
                            <span
                              className="font-[Poppins,sans-serif] text-xs font-bold"
                              style={{ color: colors.primary }}
                            >
                              {s.rating}/5
                            </span>
                          </div>
                          <div
                            className="h-[5px] rounded-[3px] overflow-hidden"
                            style={{ backgroundColor: colors.background }}
                          >
                            <div
                              className="h-full rounded-[3px] transition-[width] duration-[400ms] ease-in-out"
                              style={{
                                width: `${(s.rating / 5) * 100}%`,
                                backgroundColor: colors.accent,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Gaps */}
                    <div>
                      <div
                        className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1.5px] mb-4"
                        style={{ color: colors.primary }}
                      >
                        Where BRIDGE Adds Value
                      </div>
                      {partner.gaps.map((gap, i) => (
                        <div
                          key={i}
                          className="rounded-lg py-[11px] px-[14px] mb-1.5 flex items-center gap-[10px]"
                          style={{ backgroundColor: colors.lightGreen }}
                        >
                          <div
                            className="w-[5px] h-[5px] rounded-full shrink-0 opacity-40"
                            style={{ backgroundColor: colors.primary }}
                          />
                          <span
                            className="font-[Inter,sans-serif] text-[12.5px] font-medium leading-[1.4]"
                            style={{ color: colors.primary }}
                          >
                            {gap}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-px mb-6" style={{ backgroundColor: colors.line }} />

                  {/* Opportunity + Synergies */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "1fr 160px",
                      gap: "24px",
                      alignItems: "start",
                      flex: 1,
                    }}
                  >
                    <div
                      className="rounded-[14px]"
                      style={{
                        backgroundColor: colors.lightGreen,
                        padding: isMobile ? "16px" : "20px 24px",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-[10px]">
                        <div
                          className="w-[26px] h-[26px] rounded-full flex items-center justify-center"
                          style={{ backgroundColor: colors.accent, color: colors.primary }}
                        >
                          <IconArrowUpRight />
                        </div>
                        <span
                          className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1px]"
                          style={{ color: colors.primary }}
                        >
                          BRIDGE Opportunity
                        </span>
                      </div>
                      <p
                        className="font-[Inter,sans-serif] text-sm leading-[1.6] m-0 font-medium overflow-hidden"
                        style={{
                          color: colors.primary,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {partner.bridgeOpportunity}
                      </p>
                    </div>

                    <div>
                      <div
                        className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1.5px] mb-3"
                        style={{ color: colors.primary }}
                      >
                        Synergies
                      </div>
                      {partner.synergies.map((s, i) => (
                        <div key={i} className="flex items-center gap-2 mb-[10px]">
                          <div
                            className="w-1 h-1 rounded-full shrink-0"
                            style={{ backgroundColor: colors.accent }}
                          />
                          <span className="font-[Inter,sans-serif] text-[12.5px] text-[#555] font-medium leading-[1.3]">
                            {s}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile collapse button */}
              {isMobile && (
                <button
                  onClick={() => setShowDetail(false)}
                  className="flex items-center justify-center gap-1.5 w-full p-3 mt-2 bg-transparent border-none font-[Inter,sans-serif] text-[13px] font-semibold text-[#999] cursor-pointer"
                >
                  Collapse
                  <ChevronUp size={14} strokeWidth={2.5} color="#999" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
      {/* end maxWidth wrapper */}
    </section>
  );
};

// ============================================================================
// POLICY ALIGNMENT SECTION
// ============================================================================

const catStyles = {
  funding: { bg: "rgba(184,217,53,0.15)", border: "rgba(184,217,53,0.3)" },
  tax: { bg: "rgba(27,77,62,0.07)", border: "rgba(27,77,62,0.15)" },
  infrastructure: { bg: "rgba(184,217,53,0.1)", border: "rgba(184,217,53,0.25)" },
  partnerships: { bg: "rgba(27,77,62,0.05)", border: "rgba(27,77,62,0.12)" },
};

const catLabels = {
  funding: "Direct Funding",
  tax: "Tax & Regulatory",
  infrastructure: "Infrastructure",
  partnerships: "Partnerships",
};

const PolicyCard = ({ policy, isExpanded, onToggle, isMobile }) => {
  const cs = catStyles[policy.category] || catStyles.funding;

  return (
    <div
      onClick={onToggle}
      style={{
        minWidth: isExpanded ? (isMobile ? "calc(100vw - 56px)" : "420px") : isMobile ? "calc(100vw - 56px)" : "280px",
        maxWidth: isExpanded ? (isMobile ? "calc(100vw - 56px)" : "420px") : isMobile ? "calc(100vw - 56px)" : "280px",
        backgroundColor: colors.background,
        border: isExpanded ? `2px solid ${colors.accent}` : `2px solid ${colors.primary}`,
        borderRadius: "16px",
        padding: isMobile ? "18px" : "22px 24px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        scrollSnapAlign: "start",
      }}
    >
      {/* Top row: Category badge */}
      <div className="flex justify-between items-center mb-[14px]">
        <span
          className="py-[3px] px-[10px] rounded-full text-[9px] font-bold font-[Inter,sans-serif] uppercase tracking-[0.5px]"
          style={{
            backgroundColor: cs.bg,
            border: `1px solid ${cs.border}`,
            color: colors.primary,
          }}
        >
          {catLabels[policy.category]}
        </span>
        <span className="font-[Inter,sans-serif] text-[10px] text-[#999]">
          {policy.body}
        </span>
      </div>

      {/* Policy name */}
      <h3
        className="font-[Inter,sans-serif] text-base font-bold mt-0 mb-2 min-h-[42px] leading-[1.3]"
        style={{ color: colors.primary }}
      >
        {policy.policy}
      </h3>

      {/* Allocation */}
      <div
        className="font-[Inter,sans-serif] text-[13px] font-bold mb-3"
        style={{ color: colors.accent }}
      >
        {policy.allocation}
      </div>

      {/* Alignment text */}
      <p className="font-[Inter,sans-serif] text-[13px] text-[#666] leading-[1.55] mt-0 mb-1 min-h-[40px]">
        {policy.alignment}
      </p>

      {/* Expand hint */}
      <div className="flex items-center justify-end gap-1.5 mt-auto pt-2">
        <span
          className="font-[Inter,sans-serif] text-[11px] font-semibold transition-colors duration-200 ease-in-out"
          style={{ color: isExpanded ? colors.accent : "#bbb" }}
        >
          BRIDGE alignment
        </span>
        <ChevronDown size={14} strokeWidth={2.5} color={isExpanded ? colors.accent : "#bbb"} style={{
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "all 0.25s ease",
          }} />
      </div>

      {/* Expanded area */}
      <div
        style={{
          maxHeight: isExpanded ? "500px" : "0",
          opacity: isExpanded ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.35s ease, opacity 0.25s ease",
        }}
      >
        <div
          style={{
            borderTop: `1px solid ${colors.line}`,
            paddingTop: "16px",
            marginTop: "12px",
          }}
        >
          {/* BRIDGE Role */}
          <p className="font-[Inter,sans-serif] text-[13px] text-[#444] leading-[1.6] mt-0 mb-[14px]">
            {policy.bridgeRole}
          </p>

          {/* Pillars */}
          {policy.pillars && policy.pillars.length > 0 && (
            <div className="flex gap-1.5 flex-wrap mb-[14px]">
              {policy.pillars.map((pill, i) => (
                <span
                  key={i}
                  className="py-1 px-[10px] rounded-full text-[10px] font-semibold font-[Inter,sans-serif] whitespace-nowrap"
                  style={{
                    backgroundColor: colors.white,
                    color: colors.primary,
                    border: `1px solid ${colors.line}`,
                  }}
                >
                  {pill}
                </span>
              ))}
            </div>
          )}

          {/* BRIDGE Ventures */}
          {policy.bridgeVentures && policy.bridgeVentures.length > 0 && (
            <div>
              <div className="font-[Inter,sans-serif] text-[9px] font-bold text-[#999] uppercase tracking-[1px] mb-2">
                Connected Ventures
              </div>
              <div className="flex flex-col gap-1.5">
                {policy.bridgeVentures.map((v, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-lg py-2 px-3"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: colors.accent }}
                    />
                    <span
                      className="font-[Inter,sans-serif] text-xs font-medium"
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
      </div>
    </div>
  );
};

const PolicyAlignmentSection = () => {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedCard, setExpandedCard] = useState(null);

  const policies = sectorData.policyAlignment;

  const categories = [
    { id: "all", label: "All" },
    { id: "funding", label: "Direct Funding" },
    { id: "tax", label: "Tax & Regulatory" },
    { id: "infrastructure", label: "Infrastructure" },
    { id: "partnerships", label: "Partnerships" },
  ];

  const filteredPolicies = activeCategory === "all" ? policies : policies.filter((p) => p.category === activeCategory);

  const policyScroll = useScrollIndex(filteredPolicies.length);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setExpandedCard(null);
  };

  return (
    <section
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "60px 0" : "100px 80px",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Pill */}
        <div style={{ padding: isMobile ? "0 20px" : 0, textAlign: isMobile ? "left" : "center" }}>
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
            Governance & Policy
          </span>
        </div>

        {/* Header */}
        <div
          style={{
            textAlign: isMobile ? "left" : "center",
            marginBottom: isMobile ? "24px" : "40px",
            padding: isMobile ? "0 20px" : 0,
          }}
        >
          <h2
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "28px" : "42px",
              fontWeight: "300",
              lineHeight: "1.2",
              letterSpacing: "-0.5px",
              color: colors.primary,
              margin: "0 0 16px 0",
            }}
          >
            Moving in Step With the <span style={{ color: colors.accent, fontWeight: "600" }}>National Vision</span>
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              color: "#666",
              lineHeight: "1.65",
              margin: isMobile ? 0 : "0 auto",
              maxWidth: "750px",
            }}
          >
            BRIDGE ventures align directly with Ghana's financial inclusion priorities — creating pathways for
            public-private collaboration that accelerates shared goals.
          </p>
        </div>

        {/* Category Filter Pills — individual pill style */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            justifyContent: isMobile ? "flex-start" : "center",
            marginBottom: "24px",
            padding: isMobile ? "0 20px" : 0,
            overflowX: isMobile ? "auto" : "visible",
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                style={{
                  padding: isMobile ? "6px 14px" : "8px 18px",
                  borderRadius: "50px",
                  border: isActive ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                  backgroundColor: isActive ? "rgba(184,217,53,0.08)" : "transparent",
                  color: isActive ? colors.primary : "#888",
                  fontFamily: "Inter, sans-serif",
                  fontSize: isMobile ? "11px" : "13px",
                  fontWeight: isActive ? "700" : "500",
                  cursor: "pointer",
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

        {/* Horizontal Scrollable Card Row */}
        <div
          ref={isMobile ? policyScroll.scrollRef : null}
          onScroll={isMobile ? policyScroll.onScroll : undefined}
          className="hide-scrollbar"
          style={{
            overflowX: "auto",
            paddingLeft: isMobile ? "20px" : 0,
            paddingRight: isMobile ? "20px" : 0,
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="flex gap-4">
            {filteredPolicies.map((policy, idx) => (
              <PolicyCard
                key={`${activeCategory}-${idx}`}
                policy={policy}
                isExpanded={expandedCard === idx}
                onToggle={() => setExpandedCard(expandedCard === idx ? null : idx)}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>

        {isMobile && (
          <ScrollDots
            count={filteredPolicies.length}
            activeIndex={policyScroll.activeIndex}
            onDotClick={policyScroll.scrollTo}
          />
        )}

        {/* CTA Bar */}
        <div
          className="rounded-2xl flex justify-between"
          style={{
            backgroundColor: colors.primary,
            padding: isMobile ? "24px 20px" : "28px 32px",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? "16px" : "24px",
            margin: isMobile ? "32px 20px 0" : "40px 0 0",
            display: "flex",
          }}
        >
          <div className="flex-1">
            <div
              className="font-[Inter,sans-serif] font-semibold mb-1.5"
              style={{
                fontSize: isMobile ? "16px" : "18px",
                color: colors.white,
              }}
            >
              BRIDGE complements {"\u2014"} never competes with {"\u2014"} government vision.
            </div>
            <p className="font-[Inter,sans-serif] text-sm text-white/60 leading-[1.5] m-0">
              Every venture aligns with at least one active government policy or initiative.
            </p>
          </div>
          <a
            href="/methodology"
            className="py-3 px-6 rounded-full font-[Inter,sans-serif] text-[13px] font-bold no-underline whitespace-nowrap shrink-0 inline-flex items-center gap-1.5"
            style={{
              backgroundColor: colors.accent,
              color: colors.primary,
            }}
          >
            View Partnership Strategy
            <ArrowRight size={14} strokeWidth={2.5} color="currentColor" />
          </a>
        </div>
      </div>
      {/* end maxWidth wrapper */}
    </section>
  );
};

// ============================================================================
// CROSS-SECTOR SECTION — Ripple Effect
// ============================================================================

const CrossSectorSection = () => {
  const isMobile = useIsMobile();
  const [activeNode, setActiveNode] = useState(null);
  const [showMoreRipple, setShowMoreRipple] = useState(false);

  const crossSectorIcons = {
    1: <Blocks size={24} strokeWidth={1.5} />,
    3: <IconCross />,
    6: <Sprout size={24} strokeWidth={1.5} />,
    4: <Cpu size={24} strokeWidth={1.5} />,
    5: <GraduationCap size={24} strokeWidth={1.5} />,
  };

  const hubIcon = <Wallet size={24} strokeWidth={1.5} />;

  const crossSectorShortNames = ["Infra", "Health", "Agriculture", "Technology", "Education"];

  const pathLabels = [
    "Financial Inclusion → Digital Payment Points → Infrastructure Access",
    "Financial Inclusion → Insurance Products → Health Outcomes",
    "Financial Inclusion → Input Finance → Agricultural Value",
    "Financial Inclusion → Fintech Partnerships → Tech Scale",
    "Financial Inclusion → Savings Products → Education Investment",
  ];

  const pathways = sectorData.crossSector.map((sector, i) => ({
    ...sector,
    icon: crossSectorIcons[sector.sectorId],
    pathLabel: pathLabels[i],
  }));

  const selected = activeNode !== null ? pathways[activeNode] : null;

  return (
    <section
      style={{
        backgroundColor: colors.primary,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div className="mx-auto" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Header */}
        <div className="text-center" style={{ marginBottom: isMobile ? "32px" : "48px" }}>
          <span
            className="inline-block bg-white/[0.08] border border-white/15 py-[10px] px-5 rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
            style={{ color: colors.accent }}
          >
            The Ripple Effect
          </span>

          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] mx-auto mb-5 mt-0 max-w-[820px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.white,
            }}
          >
            How Financial Inclusion <span style={{ color: colors.accent }} className="font-semibold">Amplifies Impact</span>
          </h2>

          <p className="font-[Inter,sans-serif] text-base text-white/60 leading-[1.65] mx-auto mt-0 max-w-[680px]">
            Financial services are foundational infrastructure enabling every other sector to thrive — explore how one
            venture creates compounding value across Ghana's economy.
          </p>
        </div>

        {/* ========== PATHWAY VISUAL ========== */}
        {isMobile ? (
          /* Mobile: Hub on top, 5 icons row below */
          <div style={{ marginBottom: "24px" }}>
            {/* Hub icon centered */}
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
                  marginBottom: "8px",
                }}
              >
                <div style={{ transform: "scale(1.2)" }}>{hubIcon}</div>
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
                Financial Inclusion
              </span>
            </div>

            {/* 5 sector icons row */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              {pathways.map((pathway, idx) => {
                const isActive = activeNode === idx;
                const isDimmed = activeNode !== null && !isActive;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setActiveNode(isActive ? null : idx);
                      setShowMoreRipple(false);
                    }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                      opacity: isDimmed ? 0.4 : 1,
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
                        marginBottom: "6px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {pathway.icon}
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
                      {crossSectorShortNames[idx]}
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
            {/* Hub Icon */}
            <div
              style={{
                width: "120px",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
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
                <div style={{ transform: "scale(1.4)" }}>{hubIcon}</div>
              </div>
            </div>

            {/* Sector Nodes */}
            {pathways.map((pathway, idx) => {
              const isActive = activeNode === idx;
              const isDimmed = activeNode !== null && !isActive;
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
                    opacity: isDimmed ? 0.4 : 1,
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
                      marginBottom: "10px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {pathway.icon}
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
                    {pathway.name}
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
                    {pathway.multiplier}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* ========== DETAIL PANEL ========== */}
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
            /* ===== DEFAULT STATE ===== */
            isMobile ? (
              /* Mobile: simple prompt */
              <div className="text-center py-5">
                <p className="font-[Inter,sans-serif] text-[15px] text-white/50 leading-[1.6] m-0">
                  Tap a sector above to explore how financial inclusion amplifies its impact
                </p>
              </div>
            ) : (
              /* Desktop: 5-card integration grid */
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span
                    className="font-[Inter,sans-serif] text-base font-semibold"
                    style={{ color: colors.white }}
                  >
                    Cross-Sector Integration Opportunities
                  </span>
                  <span className="font-[Inter,sans-serif] text-[13px] text-white/40">
                    Click a sector above to explore
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-4">
                  {pathways.map((pathway, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveNode(idx)}
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
                        {pathway.name}
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
                        {pathway.connection}
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontSize: "18px",
                            fontWeight: "700",
                            color: colors.accent,
                          }}
                        >
                          {pathway.multiplier}
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
            /* ===== ACTIVE STATE ===== */
            <div>
              {/* Breadcrumb */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flexWrap: "wrap",
                  marginBottom: isMobile ? "20px" : "28px",
                }}
              >
                {selected.pathLabel.split(" → ").map((step, idx, arr) => (
                  <React.Fragment key={idx}>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: isMobile ? "11px" : "13px",
                        fontWeight: idx === 0 ? "700" : "500",
                        color: idx === 0 ? colors.accent : "rgba(255,255,255,0.7)",
                        backgroundColor: idx === 0 ? "rgba(184, 217, 53, 0.15)" : "rgba(255,255,255,0.05)",
                        padding: isMobile ? "5px 10px" : "6px 14px",
                        borderRadius: "50px",
                      }}
                    >
                      {step}
                    </span>
                    {idx < arr.length - 1 && (
                      <span style={{ color: colors.accent, fontSize: isMobile ? "12px" : "14px" }}>→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Detail content */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
                  gap: isMobile ? "20px" : "32px",
                }}
              >
                {/* Column 1: Why It Matters — always visible */}
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
                      marginTop: 0,
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
                    {selected.impact}
                  </p>
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
                        fontSize: "32px",
                        fontWeight: "700",
                        color: colors.accent,
                      }}
                    >
                      {selected.multiplier}
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

                {/* Column 2: Synergy Pathways — collapsible on mobile */}
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
                        marginTop: 0,
                      }}
                    >
                      Synergy Pathways
                    </h4>
                    <div className="flex flex-col gap-[10px]">
                      {selected.synergies.slice(0, 3).map((synergy, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 py-3 px-4 rounded-[10px] bg-white/5 border border-white/[0.06]"
                        >
                          <span style={{ color: colors.accent }} className="text-[8px]">●</span>
                          <span className="font-[Inter,sans-serif] text-sm text-white/75">
                            {synergy}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Column 3: Linked Ventures — collapsible on mobile */}
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
                        marginTop: 0,
                      }}
                    >
                      Linked Ventures
                    </h4>
                    <div className="flex flex-col gap-[10px]">
                      {selected.bridgeVentures.map((venture, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center py-[14px] px-[18px] rounded-xl bg-[rgba(184,217,53,0.1)] border border-[rgba(184,217,53,0.15)]"
                        >
                          <span
                            className="font-[Inter,sans-serif] text-sm font-semibold"
                            style={{ color: colors.white }}
                          >
                            {venture}
                          </span>
                          <span style={{ color: colors.accent }} className="text-base">→</span>
                        </div>
                      ))}
                    </div>
                    <a
                      href="/services"
                      className="inline-flex items-center gap-2 mt-5 font-[Inter,sans-serif] text-sm font-semibold no-underline"
                      style={{ color: colors.accent }}
                    >
                      Explore {selected.name} Sector →
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile: Show more / Show less toggle */}
              {isMobile && (
                <button
                  onClick={() => setShowMoreRipple(!showMoreRipple)}
                  className="flex items-center justify-center gap-2 w-full p-[14px] mt-4 bg-transparent border border-white/15 rounded-xl font-[Inter,sans-serif] text-sm font-semibold cursor-pointer"
                  style={{ color: colors.white }}
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
      {/* end maxWidth wrapper */}
    </section>
  );
};

// ============================================================================
// INVESTMENT CTA SECTION
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

  // ~90-100 chars per detail for uniform card height
  const tabContent = {
    returns: [
      {
        label: "Tier 1 Priority",
        value: "$4-14M",
        detail: "6 ventures scoring 38+ on BRIDGE assessment — validated demand, ready for deployment",
      },
      {
        label: "Tier 2 Growth",
        value: "$6-15M",
        detail: "7 ventures building on Tier 1 infrastructure — years 2-4 as local ecosystems mature",
      },
      {
        label: "Portfolio IRR",
        value: "12-18%",
        detail: "Blended finance with first-loss protection enhances risk-adjusted returns above peers",
      },
      {
        label: "Dev. Leverage",
        value: "3-5x",
        detail: "Each dollar deployed catalyzes 3-5x in local economic activity via multiplier effects",
      },
    ],
    timeline: [
      {
        label: "Phase 1 (Q1-Q2)",
        value: "Foundation",
        detail: "Kejetia market platform, susu digitization pilot with 850+ collectors, literacy launch",
      },
      {
        label: "Phase 2 (Q3-Q4)",
        value: "Scale",
        detail: "MSME credit guarantee activation, diaspora gateway, alternative credit scoring engine",
      },
      {
        label: "Phase 3 (2027+)",
        value: "Expansion",
        detail: "MFI license application, women's empowerment fund, regional replication across Ghana",
      },
      {
        label: "Exit Horizon",
        value: "5-7 years",
        detail: "Staged liquidity via secondary sales, portfolio acquisitions, and fund maturity events",
      },
    ],
    impact: [
      {
        label: "Traders Served",
        value: "10,000+",
        detail: "Kejetia Market flagship — Ghana's largest market becomes a digital financial services model",
      },
      {
        label: "Credit Addressed",
        value: "$500M+",
        detail: "Of the $2.2B annual MSME gap — making the invisible creditworthy via alternative scoring",
      },
      {
        label: "Susu Digitized",
        value: "100K+",
        detail: "Informal savers gaining formal credit histories for the first time, unlocking bank access",
      },
      {
        label: "Women Reached",
        value: "70%+",
        detail: "Of beneficiaries female — reflecting women's dominance in market trading and susu saving",
      },
    ],
  };

  const audiences = [
    {
      key: "entrepreneur",
      label: "Entrepreneur",
      shortLabel: "Founder",
      icon: <IconStorefront />,
      headline: "Build on Proven Infrastructure",
      pitch:
        "Ghana's $192B mobile money ecosystem and 97% account access create a launchpad no other African market matches. BRIDGE provides venture support, market access, and regulatory navigation to turn your fintech concept into a scaled business.",
      stats: [
        { value: "18", label: "Venture Paths", detail: "validated models" },
        { value: "10K+", label: "Market Access", detail: "traders via Kejetia" },
        { value: "Full", label: "BRIDGE Support", detail: "incubation to scale" },
      ],
      pathways: [
        { bring: "Domain expertise & vision", get: "Incubation, capital access, and BRIDGE brand backing" },
        { bring: "Execution commitment", get: "Pre-validated market with 10,000+ ready customers" },
        { bring: "Local or diaspora network", get: "Regulatory navigation and government partnership channel" },
      ],
    },
    {
      key: "business",
      label: "Business Entity",
      shortLabel: "Business",
      icon: <IconOfficeBuilding />,
      headline: "Enter Africa's Top Fintech Market",
      pitch:
        "Financial institutions, fintechs, and insurers can access a $2.2B underserved credit market through BRIDGE partnerships with market associations, susu networks, and the Bank of Ghana FinTech Office — skip years of groundwork.",
      stats: [
        { value: "$2.2B", label: "Credit Gap", detail: "addressable market" },
        { value: "850+", label: "Distribution", detail: "susu collectors" },
        { value: "Joint", label: "Partnership", detail: "co-invest or license" },
      ],
      pathways: [
        { bring: "Financial products & capital", get: "Instant distribution through 850+ trusted susu collectors" },
        { bring: "Technology infrastructure", get: "Pre-built market relationships and regulatory approvals" },
        { bring: "Insurance or lending license", get: "First-mover access to millions of unserved Ghanaians" },
      ],
    },
    {
      key: "investor",
      label: "Investor",
      shortLabel: "Investor",
      icon: <IconTrendingUp />,
      headline: "Frontier Returns, De-Risked",
      pitch:
        "Target 12-18% IRR across 18 vetted opportunities in the world's #1 mobile money market. Blended finance with first-loss capital, Bank of Ghana alignment, and 60,000+ words of research — institutional-grade diligence meets frontier returns.",
      stats: [
        { value: "12-18%", label: "Target IRR", detail: "risk-adjusted" },
        { value: "$13-39M", label: "Portfolio Size", detail: "across 18 ventures" },
        { value: "1st-loss", label: "Protection", detail: "blended structure" },
      ],
      pathways: [
        { bring: "Growth or impact capital", get: "Diversified portfolio with first-loss downside protection" },
        { bring: "Sector or regional expertise", get: "Advisory roles with equity participation in ventures" },
        { bring: "Institutional mandate", get: "Co-investment alongside DFIs and development partners" },
      ],
    },
    {
      key: "government",
      label: "Government",
      shortLabel: "Gov't",
      icon: <IconLandmark />,
      headline: "Activate the 24-Hour Economy",
      pitch:
        "BRIDGE operationalizes Ghana's financial inclusion goals — formalizing MSMEs generating 70% of GDP, digitizing the susu ecosystem, and channeling $6.65B in annual remittances into productive investment. We execute, you enable.",
      stats: [
        { value: "70%", label: "GDP Enabled", detail: "MSME formalization" },
        { value: "$6.65B", label: "Remittances", detail: "channeled productively" },
        { value: "100%", label: "Policy Aligned", detail: "24-Hour Economy" },
      ],
      pathways: [
        { bring: "Regulatory frameworks", get: "Operational vehicle that delivers without new bureaucracy" },
        { bring: "Policy alignment signals", get: "Private capital mobilized at no cost to sovereign balance" },
        { bring: "Sankofa Initiative mandate", get: "Replicable model across 260+ districts nationwide" },
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
            marginBottom: isMobile ? "32px" : "48px",
            padding: isMobile ? "0 20px" : 0,
            textAlign: isMobile ? "center" : "left",
          }}
        >
          <span
            className="inline-block py-[10px] px-5 rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
            }}
          >
            The Investment Thesis
          </span>

          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] max-w-[820px]"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
              margin: isMobile ? "0 auto 16px" : "0 0 16px 0",
            }}
          >
            Every Stakeholder Has a Role in{" "}
            <span style={{ color: colors.accent }} className="font-semibold">Financial Security</span>
          </h2>

          <p
            className="font-[Inter,sans-serif] text-base text-[#666] leading-[1.65] max-w-[700px]"
            style={{ margin: isMobile ? "0 auto" : 0 }}
          >
            Investment isn't only capital — it's expertise, partnerships, policy, and vision. See how your role
            contributes to {sector.ventures} ventures across {sector.capitalRange} in opportunity.
          </p>
        </div>

        {/* ===== AUDIENCE SELECTOR ===== */}
        {isMobile ? (
          /* Mobile: Icon-only tabs like Impact section */
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "24px",
              padding: "0 20px",
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
                      backgroundColor: isActive ? colors.accentLight : colors.background,
                      border: isActive ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                      color: colors.primary,
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
                      color: isActive ? colors.primary : "#999",
                    }}
                  >
                    {aud.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          /* Desktop: Pill buttons */
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

        {/* ===== MAIN CONTENT: 2-column layout ===== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "24px" : "48px",
            alignItems: "stretch",
            padding: isMobile ? "0 20px" : 0,
          }}
        >
          {/* LEFT: Audience-specific content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Headline — desktop only */}
            {!isMobile && (
              <h3
                className="font-[Inter,sans-serif] text-[32px] font-light leading-[1.25] tracking-[-0.3px] mt-0 mb-4"
                style={{ color: colors.primary }}
              >
                {activeAudienceData.headline}
              </h3>
            )}

            {/* Pitch — desktop only */}
            {!isMobile && (
              <p className="font-[Inter,sans-serif] text-[15px] text-[#555] leading-[1.7] mt-0 mb-6">
                {activeAudienceData.pitch}
              </p>
            )}

            {/* Stat cards — 3 columns */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {activeAudienceData.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="rounded-xl text-center flex flex-col justify-center"
                  style={{
                    backgroundColor: colors.white,
                    border: `1px solid ${colors.line}`,
                    padding: isMobile ? "16px 10px" : "18px 14px",
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
                    className="font-[Inter,sans-serif] font-semibold mb-0.5"
                    style={{
                      fontSize: isMobile ? "11px" : "12px",
                      color: colors.primary,
                    }}
                  >
                    {stat.label}
                  </div>
                  <div className="font-[Inter,sans-serif] text-[10px] text-[#888]">
                    {stat.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* ===== ENGAGEMENT PATHWAYS — fills the dead space ===== */}
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
                  <div className="flex flex-col gap-1 flex-1">
                    <div
                      className="font-[Inter,sans-serif] text-xs font-semibold"
                      style={{ color: colors.primary }}
                    >
                      {path.bring}
                    </div>
                    <div className="font-[Inter,sans-serif] text-xs text-[#777] leading-[1.5]">
                      {path.get}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bank of Ghana validation */}
            <div className="py-[14px] px-[18px] bg-[rgba(27,77,62,0.06)] rounded-xl flex items-center gap-3">
              <IconCheck style={{ color: colors.primary, flexShrink: 0, width: 18, height: 18 }} />
              <div className="font-[Inter,sans-serif] text-[13px] text-[#444] leading-[1.5]">
                <strong style={{ color: colors.primary }}>Bank of Ghana</strong> backing for innovative inclusion
                platforms
              </div>
            </div>
          </div>

          {/* RIGHT: Returns / Timeline / Impact panel */}
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
              {/* Tab selector */}
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

              {/* Tab content — stacked cards, uniform height */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  flex: 1,
                }}
              >
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
                    {/* Value + label */}
                    <div
                      style={{
                        width: isMobile ? "100%" : "130px",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: isMobile ? "center" : "flex-start",
                        gap: isMobile ? "10px" : "0",
                        flexDirection: isMobile ? "row" : "column",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: isMobile ? "16px" : item.value.length > 6 ? "17px" : "22px",
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
                          marginTop: isMobile ? "0" : "4px",
                          lineHeight: "1.3",
                        }}
                      >
                        {item.label}
                      </div>
                    </div>
                    {/* Detail */}
                    <div
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: isMobile ? "12px" : "13px",
                        color: "rgba(255,255,255,0.7)",
                        lineHeight: "1.55",
                        borderLeft: isMobile ? "none" : "1px solid rgba(255,255,255,0.1)",
                        borderTop: isMobile ? "1px solid rgba(255,255,255,0.1)" : "none",
                        paddingLeft: isMobile ? "0" : "16px",
                        paddingTop: isMobile ? "10px" : "0",
                        flex: 1,
                        width: isMobile ? "100%" : "auto",
                      }}
                    >
                      {item.detail}
                    </div>
                  </div>
                ))}
              </div>

              {/* Prospectus bar */}
              <div className="mt-4 py-[14px] px-5 bg-white/5 rounded-xl flex justify-between items-center shrink-0">
                <span className="font-[Inter,sans-serif] text-[13px] text-white/45">
                  Full financial model available
                </span>
                <a
                  href="/resources"
                  className="font-[Inter,sans-serif] text-sm font-bold no-underline inline-flex items-center gap-1.5 shrink-0"
                  style={{ color: colors.accent }}
                >
                  Download Prospectus <span className="text-base">→</span>
                </a>
              </div>
            </div>
          )}

          {/* Mobile: toggle for tab panel */}
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
          {isMobile && showInvestmentDetails && (
            <button
              onClick={() => setShowInvestmentDetails(false)}
              className="flex items-center justify-center gap-1.5 w-full p-3 mt-2 bg-transparent border-none font-[Inter,sans-serif] text-[13px] font-semibold text-[#999] cursor-pointer"
            >
              Collapse
              <ChevronUp size={14} strokeWidth={2.5} color="#999" />
            </button>
          )}
        </div>
      </div>
      {/* end maxWidth wrapper */}
    </section>
  );
};

// ============================================================================
// IMPACT SECTION — Dual-Lens Dashboard
// ============================================================================


const MetricRow = ({ item, index, animate, isMobile }) => {
  const raw = useCounter(item.value, 1200, animate);
  const hasDecimal = String(item.value).includes(".") || item.value % 1 !== 0;
  const formatted = hasDecimal
    ? raw.toFixed(1)
    : item.value >= 1000
      ? Math.round(raw).toLocaleString()
      : String(Math.round(raw));

  if (isMobile) {
    return (
      <div
        className="py-[18px] px-4 relative"
        style={{
          backgroundColor: index % 2 === 0 ? colors.white : "transparent",
          opacity: animate ? 1 : 0,
          transition: `opacity 0.4s ease ${index * 0.08}s`,
        }}
      >
        {/* Trend tag - top right */}
        <div
          className="absolute top-[18px] right-4 font-[Inter,sans-serif] text-[10px] font-bold bg-[rgba(27,77,62,0.08)] border border-[rgba(27,77,62,0.15)] py-[3px] px-2 rounded-full uppercase tracking-[0.5px]"
          style={{ color: colors.primary }}
        >
          {item.trend}
        </div>

        {/* Number */}
        <div
          className="font-[Poppins,sans-serif] text-[28px] font-bold tracking-[-1px] leading-[1.1] mb-2"
          style={{ color: colors.primary }}
        >
          {item.prefix}
          {formatted}
          {item.suffix}
        </div>

        {/* Label + description */}
        <div
          className="font-[Inter,sans-serif] text-[15px] font-bold mb-[3px]"
          style={{ color: colors.primary }}
        >
          {item.label}
        </div>
        <div className="font-[Inter,sans-serif] text-[13px] text-[#666] leading-[1.5] pr-5">
          {item.description}
        </div>

        {/* Ventures pill */}
        <div
          className="inline-block rounded-lg py-1.5 px-3 mt-[10px]"
          style={{ backgroundColor: index % 2 === 0 ? colors.background : "rgba(27,77,62,0.04)" }}
        >
          <div className="font-[Inter,sans-serif] text-[8px] font-bold text-[#aaa] uppercase tracking-[0.8px] mb-0.5">
            Ventures
          </div>
          <div
            className="font-[Inter,sans-serif] text-[11px] font-medium leading-[1.3]"
            style={{ color: colors.primary }}
          >
            {item.ventures}
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div
      className="grid items-center"
      style={{
        gridTemplateColumns: "180px 1fr 200px",
        gap: "32px",
        padding: "24px 28px",
        backgroundColor: index % 2 === 0 ? colors.white : "transparent",
        opacity: animate ? 1 : 0,
        transition: `opacity 0.4s ease ${index * 0.08}s`,
      }}
    >
      {/* Number + trend */}
      <div>
        <div
          className="font-[Poppins,sans-serif] text-4xl font-bold tracking-[-1px] leading-[1.1]"
          style={{ color: colors.primary }}
        >
          {item.prefix}
          {formatted}
          {item.suffix}
        </div>
        <div
          className="inline-block font-[Inter,sans-serif] text-[11px] font-bold bg-[rgba(27,77,62,0.08)] border border-[rgba(27,77,62,0.15)] py-1 px-[10px] rounded-full uppercase tracking-[0.5px] mt-1.5"
          style={{ color: colors.primary }}
        >
          {item.trend}
        </div>
      </div>

      {/* Label + description */}
      <div>
        <div
          className="font-[Inter,sans-serif] text-[15px] font-bold mb-0.5"
          style={{ color: colors.primary }}
        >
          {item.label}
        </div>
        <div className="font-[Inter,sans-serif] text-[13px] text-[#666] leading-[1.5]">
          {item.description}
        </div>
      </div>

      {/* Linked ventures */}
      <div
        className="rounded-[10px] py-[10px] px-4"
        style={{ backgroundColor: index % 2 === 0 ? colors.background : "rgba(27,77,62,0.04)" }}
      >
        <div className="font-[Inter,sans-serif] text-[9px] font-bold text-[#aaa] uppercase tracking-[1px] mb-1">
          Linked Ventures
        </div>
        <div
          className="font-[Inter,sans-serif] text-[11px] font-medium leading-[1.4]"
          style={{ color: colors.primary }}
        >
          {item.ventures}
        </div>
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

  const metrics = [
    {
      category: "Economic",
      items: [
        {
          label: "Mobile Money Volume",
          value: 192,
          suffix: "B",
          prefix: "$",
          description: "Annual transaction value on Ghana's world-class digital rails",
          trend: "+91% YoY",
          ventures: "Market Platform \u00B7 Digital Payment Hub",
        },
        {
          label: "MSME Credit Gap",
          value: 2.2,
          suffix: "B",
          prefix: "$",
          description: "Annual financing gap between MSME demand and supply",
          trend: "Critical",
          ventures: "Credit Guarantee \u00B7 Working Capital \u00B7 Alt. Credit Scoring",
        },
        {
          label: "Diaspora Remittances",
          value: 6.65,
          suffix: "B",
          prefix: "$",
          description: "Official annual flows with 90% going to consumption",
          trend: "+91% YoY",
          ventures: "Diaspora Gateway \u00B7 Savings Products",
        },
        {
          label: "Development Leverage",
          value: 3,
          suffix: "-5x",
          prefix: "",
          description: "Each dollar deployed catalyzes local economic activity",
          trend: "Multiplier",
          ventures: "All Ventures",
        },
      ],
    },
    {
      category: "People",
      items: [
        {
          label: "Traders Served",
          value: 10,
          suffix: ",000+",
          prefix: "",
          description: "Kejetia Market flagship \u2014 Ghana's largest single market",
          trend: "Near-term",
          ventures: "Market Platform \u00B7 Digital Payment Hub",
        },
        {
          label: "Credit Histories Created",
          value: 100,
          suffix: "K+",
          prefix: "",
          description: "Informal savers gaining formal credit records for the first time",
          trend: "Target",
          ventures: "Susu Digitization \u00B7 Alt. Credit Scoring",
        },
        {
          label: "Women Reached",
          value: 70,
          suffix: "%+",
          prefix: "",
          description: "Of beneficiaries female \u2014 reflecting women's market dominance",
          trend: "High priority",
          ventures: "Women's Fund \u00B7 Susu Digitization",
        },
        {
          label: "Susu Collectors Digitized",
          value: 850,
          suffix: "+",
          prefix: "",
          description: "Registered collectors transitioning to tracked digital records",
          trend: "Baseline",
          ventures: "Susu Digitization \u00B7 MFI License",
        },
      ],
    },
    {
      category: "Returns",
      items: [
        {
          label: "Portfolio IRR",
          value: 12,
          suffix: "-18%",
          prefix: "",
          description: "Risk-adjusted target across blended finance structure",
          trend: "Target range",
          ventures: "All Ventures",
        },
        {
          label: "Tier 1 Priority",
          value: 4,
          suffix: "-14M",
          prefix: "$",
          description: "Six ventures scoring 38+ \u2014 validated demand, ready for deployment",
          trend: "High priority",
          ventures: "Market Platform \u00B7 Susu Digitization \u00B7 Credit Guarantee",
        },
        {
          label: "First Revenue",
          value: 6,
          suffix: "-12mo",
          prefix: "",
          description: "Kejetia platform and susu pilot generating income within first year",
          trend: "Near-term",
          ventures: "Market Platform \u00B7 Susu Digitization",
        },
        {
          label: "Total Capital",
          value: 13,
          suffix: "-39M",
          prefix: "$",
          description: "Across 18 ventures in two deployment tiers over 5-7 years",
          trend: "Phased",
          ventures: "All Ventures",
        },
      ],
    },
  ];

  const stakeholders = [
    {
      title: "The Entrepreneur",
      subtitle: "Traders, vendors & small businesses",
      outcomes: [
        "Transaction-based credit replaces collateral barriers for market traders",
        "Digital susu builds formal credit histories from informal savings patterns",
        "Financial literacy programs unlock business growth and planning capacity",
        "Microinsurance bundles protect against market shocks and health emergencies",
      ],
      stat: "10,000+",
      statLabel: "traders empowered",
      highlight: "First formal credit access for informal workers",
    },
    {
      title: "The Institution",
      subtitle: "Banks, fintechs & insurance partners",
      outcomes: [
        "Credit guarantee fund de-risks MSME lending across 850+ susu networks",
        "Alternative scoring expands addressable market by $2.2B annually",
        "Susu collector network provides trusted last-mile distribution channel",
        "Transaction data platform enables smarter underwriting and pricing",
      ],
      stat: "$2.2B",
      statLabel: "credit gap addressed",
      highlight: "Pre-built distribution via trusted networks",
    },
    {
      title: "The Government",
      subtitle: "Bank of Ghana & national agencies",
      outcomes: [
        "MSME formalization expands the tax base from 70% informal-sector GDP",
        "National Financial Inclusion Strategy targets met through operational scale",
        "Diaspora remittances channeled from consumption toward productive investment",
        "24-Hour Economy goals operationalized via market financial services layer",
      ],
      stat: "70%",
      statLabel: "of GDP formalized",
      highlight: "Policy delivery without new bureaucracy",
    },
    {
      title: "The Investor",
      subtitle: "Impact & institutional capital",
      outcomes: [
        "First-loss blended structure de-risks frontier market deployment",
        "Measurable ESG and Peace & Prosperity outcomes at portfolio level",
        "Diversified exposure across 18 ventures in world's #1 mobile money market",
        "Staged exit pathways via secondary sales over 5-7 year horizon",
      ],
      stat: "12-18%",
      statLabel: "target IRR",
      highlight: "Institutional-grade diligence, frontier returns",
    },
  ];

  const activeMetrics = metrics[activeCategory];
  const activeStake = stakeholders[activeStakeholder];

  return (
    <section
      style={{
        backgroundColor: colors.white,
        padding: isMobile ? "60px 0" : "80px 32px",
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="mb-3" style={{ padding: isMobile ? "0 20px" : 0 }}>
          <span
            className="inline-block py-[10px] px-5 rounded-full text-[11px] font-bold uppercase tracking-[2px] font-[Inter,sans-serif] mb-6"
            style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.line}`,
              color: colors.primary,
            }}
          >
            The Impact
          </span>

          <h2
            className="font-[Inter,sans-serif] font-light leading-[1.2] tracking-[-0.5px] mt-0 mb-3"
            style={{
              fontSize: isMobile ? "28px" : "42px",
              color: colors.primary,
            }}
          >
            What Changes When <span className="font-semibold">Financial</span>
            <br />
            <span className="font-semibold">Systems</span>{" "}
            <span style={{ color: colors.accent }} className="font-semibold">Work</span>
          </h2>

          <p className="font-[Inter,sans-serif] text-base text-[#555] leading-[1.7] mt-0 mb-10 max-w-[720px]">
            When traders access working capital, families build savings, and mobile money reaches the unbanked{" "}
            {"\u2014"} the ripple effects generate economic security, reduce vulnerability, and create pathways to
            prosperity across Ghana.
          </p>
        </div>

        {/* Controls Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "8px" : "16px",
            marginBottom: "24px",
            flexWrap: isMobile ? "wrap" : "nowrap",
            padding: isMobile ? "0 20px" : 0,
          }}
        >
          {/* View Toggle */}
          <div
            style={{
              display: "inline-flex",
              border: `1px solid ${colors.line}`,
              borderRadius: "50px",
              backgroundColor: colors.background,
              padding: isMobile ? "3px" : "4px",
              flexShrink: 0,
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
                  padding: isMobile ? "5px 12px" : "6px 16px",
                  borderRadius: "50px",
                  border: "none",
                  backgroundColor: view === v ? colors.white : "transparent",
                  color: view === v ? colors.primary : "#999",
                  fontFamily: "Inter, sans-serif",
                  fontSize: isMobile ? "11px" : "12px",
                  fontWeight: view === v ? "700" : "500",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                }}
              >
                {v === "metrics" ? (isMobile ? "Metric" : "By Metric") : isMobile ? "Stakeholder" : "By Stakeholder"}
              </button>
            ))}
          </div>

          {/* Divider */}
          {!isMobile && <div className="w-px h-6" style={{ backgroundColor: colors.line }} />}

          {/* Sub-filters */}
          <div
            style={{
              display: "flex",
              gap: "6px",
              flexWrap: "wrap",
            }}
          >
            {view === "metrics"
              ? metrics.map((m, idx) => (
                  <button
                    key={m.category}
                    onClick={() => {
                      setActiveCategory(idx);
                      triggerAnimate();
                    }}
                    style={{
                      padding: isMobile ? "5px 10px" : "6px 16px",
                      borderRadius: "50px",
                      border: activeCategory === idx ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                      backgroundColor: activeCategory === idx ? colors.accentLight : "transparent",
                      color: activeCategory === idx ? colors.primary : "#999",
                      fontFamily: "Inter, sans-serif",
                      fontSize: isMobile ? "11px" : "12px",
                      fontWeight: activeCategory === idx ? "700" : "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {m.category}
                  </button>
                ))
              : stakeholders.map((s, idx) => (
                  <button
                    key={s.title}
                    onClick={() => setActiveStakeholder(idx)}
                    style={{
                      padding: isMobile ? "5px 10px" : "6px 16px",
                      borderRadius: "50px",
                      border: activeStakeholder === idx ? `1.5px solid ${colors.accent}` : `1px solid ${colors.line}`,
                      backgroundColor: activeStakeholder === idx ? colors.accentLight : "transparent",
                      color: activeStakeholder === idx ? colors.primary : "#999",
                      fontFamily: "Inter, sans-serif",
                      fontSize: isMobile ? "11px" : "12px",
                      fontWeight: activeStakeholder === idx ? "700" : "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {s.title.split(" ")[1]}
                  </button>
                ))}
          </div>
        </div>

        {/* ===== METRICS VIEW ===== */}
        {view === "metrics" && (
          <div
            style={{
              backgroundColor: colors.background,
              borderRadius: "20px",
              border: `2px solid ${colors.primary}`,
              overflow: "hidden",
              margin: isMobile ? "0 20px" : 0,
            }}
          >
            {activeMetrics.items.map((item, idx) => (
              <MetricRow
                key={`${activeCategory}-${idx}`}
                item={item}
                index={idx}
                animate={animate}
                isMobile={isMobile}
              />
            ))}
          </div>
        )}

        {/* ===== STAKEHOLDER VIEW ===== */}
        {view === "stakeholder" && (
          <div style={{ margin: isMobile ? "0 20px" : 0 }}>
            {/* Title + Stat header */}
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
                    fontFamily: "Inter, sans-serif",
                    fontSize: isMobile ? "24px" : "28px",
                    fontWeight: "700",
                    color: colors.primary,
                    lineHeight: "1.2",
                  }}
                >
                  {activeStake.title}
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    color: "#888",
                    marginTop: "4px",
                  }}
                >
                  {activeStake.subtitle}
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
                  {activeStake.stat}
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "12px",
                    color: "#888",
                    marginTop: "4px",
                  }}
                >
                  {activeStake.statLabel}
                </div>
              </div>
            </div>

            {/* Outcome rows */}
            <div className="flex flex-col gap-1.5">
              {activeStake.outcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 py-[14px] px-5 rounded-xl"
                  style={{ backgroundColor: idx % 2 === 0 ? colors.background : "transparent" }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: idx % 2 === 0 ? colors.white : colors.background }}
                  >
                    <span
                      className="font-[Inter,sans-serif] text-xs font-bold"
                      style={{ color: colors.primary }}
                    >
                      {idx + 1}
                    </span>
                  </div>
                  <span className="font-[Inter,sans-serif] text-[15px] text-[#333] leading-[1.5]">
                    {outcome}
                  </span>
                </div>
              ))}
            </div>

            {/* Key Advantage strip */}
            <div
              className={cn("mt-6 py-4 px-6 rounded-xl flex items-center gap-4", isMobile ? "flex-wrap" : "flex-nowrap")}
              style={{ backgroundColor: colors.primary }}
            >
              <span
                className="font-[Inter,sans-serif] text-[10px] font-bold uppercase tracking-[1.5px] shrink-0"
                style={{ color: colors.accent }}
              >
                Key Advantage
              </span>
              <span className="font-[Inter,sans-serif] text-sm font-medium text-white/85">
                {activeStake.highlight}
              </span>
            </div>
          </div>
        )}
      </div>
      {/* end maxWidth wrapper */}
    </section>
  );
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


export default function FinancialInclusionSectorPage() {
  const isMobile = useIsMobile();
  return (
    <Layout>
      <div className="font-[Inter,sans-serif] m-0 p-0" style={{ backgroundColor: colors.white }}>

        <SectorHeroSection sector={sectorData} />
        <ProblemSection sector={sectorData} />
        <ValueChainSectionPremium />
        <SectorSolutionsSection sector={sectorData} />
        <MarketEcosystemSection sector={sectorData} />
        <PolicyAlignmentSection />
        <CrossSectorSection />
        <InvestmentCTASection sector={sectorData} />
        <ImpactSection />
        <SectorFinalCTA
          heading={<>Let's Build Ghana's <span style={{ color: colors.accent }} className="font-semibold">Financial Future</span></>}
          description="Whether you're an investor, partner, or government stakeholder, there's a seat at the table in building Ghana's financial future."
        />
        <div style={{ backgroundColor: colors.primary, padding: isMobile ? "0 20px" : "0 80px" }}>
          <div className="h-px bg-white/[0.08]" />
        </div>
      </div>
    </Layout>
  );
}
