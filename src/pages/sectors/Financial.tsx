import React, { useState, useEffect, useRef, useCallback } from "react";

// ============================================================================
// BRIDGE SECTOR PAGE: Financial Inclusion & Economic Security
// Following established design system from Infrastructure sector page
// ============================================================================
// Design System: Dark Green #1B4D3E, Lime #B8D935, Off-white #F3F5F2
// ============================================================================

const colors = {
  primary: "#1B4D3E",
  accent: "#B8D935",
  accentText: "#5C7A1F",
  background: "#F3F5F2",
  white: "#FFFFFF",
  dark: "#191919",
  line: "#DEDEDE",
  lightGreen: "#E8F5E0",
  accentLight: "#E8F5E0",
  warning: "#F59E0B",
  warningBg: "#FEF3C7",
  warningText: "#92400E",
  critical: "#EF4444",
  criticalBg: "#FEE2E2",
  ctaGreen: "#2E5A4D",
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
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "20px" }}>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        onClick={() => onDotClick && onDotClick(i)}
        style={{
          width: i === activeIndex ? "24px" : "8px",
          height: "8px",
          borderRadius: "4px",
          backgroundColor: i === activeIndex ? colors.accent : dark ? "rgba(255,255,255,0.2)" : colors.line,
          cursor: "pointer",
          transition: "all 0.3s ease",
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

const IconBuilding = () => (
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

const IconWheat = () => (
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
    <path d="M2 22L16 8" />
    <path d="M3.47 12.53L5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z" />
    <path d="M7.47 8.53L9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z" />
    <path d="M11.47 4.53L13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94z" />
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
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
  </svg>
);

// Value Chain specific icons (28px for card use)
const IconBank = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 21h18" />
    <path d="M3 10h18" />
    <path d="M12 3l9 7H3l9-7z" />
    <path d="M5 10v11M9 10v11M15 10v11M19 10v11" />
  </svg>
);

const IconPhone = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);

const IconHandshake = () => (
  <svg
    width="28"
    height="28"
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

const IconGlobe = () => (
  <svg
    width="28"
    height="28"
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
);

const IconStore = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
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

const IconCheck = ({ style }: { style?: React.CSSProperties }) => (
  <svg
    width={style?.width ?? 16}
    height={style?.height ?? 16}
    viewBox="0 0 24 24"
    fill="none"
    stroke={style?.color ?? "currentColor"}
    style={style}
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
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const IconShield = () => (
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
);

const IconDollar = () => (
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
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const IconTarget = () => (
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
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const IconChevronDown = () => (
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
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const IconExternalLink = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// Stage icons array for value chain (indexed by position)
const stageIcons = [<IconBank />, <IconPhone />, <IconHandshake />, <IconGlobe />, <IconStore />];

// ============================================================================
// BRIDGE LOGO (Dark version for header)
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
        minHeight: isMobile ? "auto" : "calc(100vh - 100px)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: CONTENT_MAX_WIDTH,
          margin: "0 auto",
          width: "100%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
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

            <h1
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? "36px" : "52px",
                fontWeight: "400",
                lineHeight: "1.1",
                color: colors.primary,
                margin: "0 0 20px 0",
                letterSpacing: "-1px",
              }}
            >
              <span style={{ fontWeight: "700" }}>Financial Inclusion</span> &<br />
              Economic Security
            </h1>

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

            <div style={{ display: "flex", gap: "12px", ...(isMobile ? { flexWrap: "wrap" } : {}) }}>
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
                  justifyContent: "center",
                  gap: "10px",
                  ...(isMobile ? { flex: "1 1 100%" } : {}),
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
                  ...(isMobile ? { flex: "1 1 100%" } : {}),
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
              borderRadius: isMobile ? "16px" : "20px",
              padding: isMobile ? "24px" : "32px",
              minWidth: isMobile ? "auto" : "340px",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
            {/* Main Stats */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "40px",
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
            {/* Stat Rows */}
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
                      display: "block",
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "rgba(255,255,255,0.8)",
                      fontFamily: "Inter, sans-serif",
                    }}
                  >
                    {stat.label}
                  </span>
                  {stat.detail && (
                    <span
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: "400",
                        color: "rgba(255,255,255,0.35)",
                        fontFamily: "Inter, sans-serif",
                        fontStyle: "italic",
                        marginTop: "2px",
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
      {/* end maxWidth wrapper */}

      {!isMobile && (
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px 0",
            color: "#999",
          }}
        >
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", marginBottom: "8px" }}>
            Explore Analysis
          </span>
          <style>{`@keyframes bounce { 0%, 20%, 50%, 80%, 100% { transform: translateY(0); } 40% { transform: translateY(-6px); } 60% { transform: translateY(-3px); } } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } .hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
          <div style={{ animation: "bounce 2s infinite" }}>
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
            color: problem.severity === "Flagship" ? colors.primary : colors.accentText,
            backgroundColor: problem.severity === "Flagship" ? colors.accentLight : "rgba(184,217,53,0.12)",
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
                    color: problem.severity === "Flagship" ? colors.primary : colors.accentText,
                    backgroundColor: problem.severity === "Flagship" ? colors.accentLight : "rgba(184,217,53,0.12)",
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
                    backgroundColor: problem.severity === "Flagship" ? colors.primary : colors.accentText,
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
            <span style={{ color: colors.accent, fontWeight: "600" }}>$2.2B</span> in unmet{" "}
            <span style={{ fontWeight: "600" }}>credit demand</span> ready to fuel Ghana's entrepreneurs
          </h2>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: isMobile ? "15px" : "16px",
              color: "#666",
              lineHeight: "1.65",
              margin: 0,
              maxWidth: "680px",
            }}
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
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
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
            Where Value Flows, <span style={{ color: colors.accent, fontWeight: "600" }}>Opportunity Follows</span>
          </h2>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              color: "#666",
              lineHeight: "1.65",
              margin: "0 auto",
              maxWidth: "750px",
            }}
          >
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
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              padding: "14px",
              backgroundColor: colors.lightGreen,
              border: `1.5px solid ${colors.primary}`,
              borderRadius: "12px",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: "600",
              color: colors.primary,
              cursor: "pointer",
              marginBottom: "24px",
            }}
          >
            View {valueChainStages[selectedStage].stage} Details
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
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: colors.accent,
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    marginBottom: "8px",
                  }}
                >
                  Key Actors
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: isMobile ? "18px" : "20px",
                    fontWeight: "700",
                    color: colors.primary,
                    lineHeight: "1.2",
                    marginBottom: "6px",
                  }}
                >
                  {valueChainStages[selectedStage].stage}
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    color: "#666",
                    lineHeight: "1.4",
                  }}
                >
                  {valueChainStages[selectedStage].population}
                </div>

                {/* Mini value indicator */}
                <div
                  style={{
                    marginTop: "14px",
                    backgroundColor: colors.white,
                    borderRadius: "10px",
                    padding: "10px 12px",
                    border: `1px solid ${colors.line}`,
                    ...(isMobile ? { maxWidth: "200px", margin: "14px auto 0" } : {}),
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: "6px",
                      marginBottom: "5px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "20px",
                        fontWeight: "700",
                        color: colors.accent,
                      }}
                    >
                      {valueChainStages[selectedStage].valueRetained}%
                    </span>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: "12px",
                        color: "#999",
                      }}
                    >
                      value retained
                    </span>
                  </div>
                  <div
                    style={{
                      height: "4px",
                      backgroundColor: colors.line,
                      borderRadius: "3px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${valueChainStages[selectedStage].valueRetained}%`,
                        backgroundColor: colors.accent,
                        borderRadius: "3px",
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Divider */}
              {!isMobile && (
                <div
                  style={{
                    backgroundColor: colors.line,
                    alignSelf: "stretch",
                  }}
                />
              )}
              {isMobile && (
                <div
                  style={{
                    height: "1px",
                    backgroundColor: colors.line,
                    width: "100%",
                  }}
                />
              )}

              {/* Right: Opportunities */}
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: colors.accent,
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    marginBottom: "14px",
                  }}
                >
                  Opportunities at This Stage
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: "10px",
                  }}
                >
                  {valueChainStages[selectedStage].painPoints.map((point, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: colors.white,
                        border: `1px solid ${colors.line}`,
                        borderRadius: "10px",
                        padding: "12px 14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "6px",
                          backgroundColor: colors.lightGreen,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          color: colors.primary,
                        }}
                      >
                        <IconCheck />
                      </div>
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "13px",
                          color: "#555",
                          lineHeight: "1.4",
                        }}
                      >
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
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  width: "100%",
                  padding: "12px",
                  marginTop: "12px",
                  backgroundColor: "transparent",
                  border: "none",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#999",
                  cursor: "pointer",
                }}
              >
                Collapse
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#999"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 15l-6-6-6 6" />
                </svg>
              </button>
            )}
          </>
        )}

        {/* ========== FLOW SUMMARY BAR ========== */}
        <div
          style={{
            marginTop: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: isMobile ? "8px" : "16px",
            flexWrap: isMobile ? "wrap" : "nowrap",
          }}
        >
          {valueChainStages.map((stage, idx) => (
            <React.Fragment key={stage.id}>
              <button
                onClick={() => setSelectedStage(idx)}
                style={{
                  backgroundColor: selectedStage === idx ? colors.accent : colors.background,
                  border: selectedStage === idx ? "none" : `1px solid ${colors.line}`,
                  borderRadius: "50px",
                  padding: selectedStage === idx ? "8px 20px" : "8px 14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 0.3s ease",
                }}
              >
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "13px",
                    fontWeight: "700",
                    color: selectedStage === idx ? colors.primary : "#999",
                  }}
                >
                  {idx + 1}
                </span>
                {selectedStage === idx && (
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: colors.primary,
                    }}
                  >
                    {stage.stage}
                  </span>
                )}
              </button>
              {idx < valueChainStages.length - 1 && !isMobile && (
                <div
                  style={{
                    width: "24px",
                    height: "2px",
                    backgroundColor: idx < selectedStage ? colors.accent : colors.line,
                    borderRadius: "1px",
                    transition: "background-color 0.3s ease",
                  }}
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
// SOLUTIONS SECTION
// ============================================================================

const SolutionsSection = ({ sector }) => {
  const isMobile = useIsMobile();
  const [activeTier, setActiveTier] = useState(isMobile ? "1" : "all");

  const filteredSolutions =
    activeTier === "all" ? sector.solutions : sector.solutions.filter((s) => s.tier === parseInt(activeTier));

  const solScroll = useScrollIndex(filteredSolutions.length);

  return (
    <section
      style={{
        backgroundColor: colors.primary,
        padding: isMobile ? "60px 20px" : "100px 80px",
      }}
    >
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        <span
          style={{
            display: "inline-block",
            backgroundColor: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
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

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "flex-end",
            marginBottom: isMobile ? "24px" : "40px",
            gap: isMobile ? "20px" : "0",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? "28px" : "42px",
                fontWeight: "300",
                lineHeight: "1.2",
                letterSpacing: "-0.5px",
                color: colors.white,
                margin: "0 0 20px 0",
                maxWidth: "900px",
              }}
            >
              Translating <span style={{ color: colors.accent, fontWeight: "600" }}>Access</span> Into Security
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "16px",
                color: "rgba(255,255,255,0.6)",
                lineHeight: "1.65",
                margin: 0,
                maxWidth: "500px",
              }}
            >
              Each venture a bridge from insight to investment to measurable public benefit.
            </p>
          </div>

          {/* Tier Filter */}
          <div
            style={{
              display: "inline-flex",
              gap: "4px",
              padding: isMobile ? "3px" : "4px",
              borderRadius: "50px",
              border: "1px solid rgba(255,255,255,0.2)",
              flexShrink: 0,
            }}
          >
            {[
              { key: "all", label: "All" },
              { key: "1", label: "Flagship" },
              { key: "2", label: "Scaling" },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveTier(filter.key)}
                style={{
                  backgroundColor: activeTier === filter.key ? colors.accent : "transparent",
                  color: activeTier === filter.key ? colors.primary : "rgba(255,255,255,0.6)",
                  border: "none",
                  padding: isMobile ? "6px 14px" : "8px 18px",
                  borderRadius: "50px",
                  fontSize: isMobile ? "11px" : "12px",
                  fontWeight: activeTier === filter.key ? "700" : "500",
                  fontFamily: "Inter, sans-serif",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={isMobile ? solScroll.scrollRef : null}
          onScroll={isMobile ? solScroll.onScroll : undefined}
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
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "24px",
                }
          }
        >
          {filteredSolutions.map((solution, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: colors.white,
                borderRadius: isMobile ? "12px" : "16px",
                padding: isMobile ? "24px" : "28px",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
                ...(isMobile ? { minWidth: "80%", maxWidth: "80%", flexShrink: 0, scrollSnapAlign: "start" } : {}),
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
                <span
                  style={{
                    backgroundColor: solution.tier === 1 ? colors.lightGreen : colors.background,
                    color: colors.primary,
                    padding: "4px 10px",
                    borderRadius: "50px",
                    fontSize: "10px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  {solution.tier === 1 ? "Flagship" : "Scaling"}
                </span>
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "14px",
                    fontWeight: "700",
                    color: colors.accent,
                  }}
                >
                  Score: {solution.score}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: colors.primary,
                  margin: "0 0 12px 0",
                  lineHeight: "1.3",
                  minHeight: isMobile ? "auto" : "47px",
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
                  margin: "0 0 20px 0",
                  minHeight: isMobile ? "auto" : "68px",
                  flex: 1,
                }}
              >
                {solution.description}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                  padding: "16px",
                  backgroundColor: colors.background,
                  borderRadius: "12px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      fontWeight: "600",
                      color: "#999",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginBottom: "4px",
                    }}
                  >
                    Capital
                  </div>
                  <div
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontSize: "16px",
                      fontWeight: "700",
                      color: colors.primary,
                    }}
                  >
                    {solution.capital}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      fontWeight: "600",
                      color: "#999",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginBottom: "4px",
                    }}
                  >
                    Model
                  </div>
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: "500",
                      color: colors.dark,
                    }}
                  >
                    {solution.model}
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: "16px",
                  padding: "12px",
                  backgroundColor: colors.lightGreen,
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "10px",
                    fontWeight: "600",
                    color: colors.primary,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    marginBottom: "4px",
                  }}
                >
                  Impact
                </div>
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    fontWeight: "500",
                    color: colors.primary,
                  }}
                >
                  {solution.impact}
                </div>
              </div>
            </div>
          ))}
        </div>
        {isMobile && (
          <ScrollDots
            count={filteredSolutions.length}
            activeIndex={solScroll.activeIndex}
            onDotClick={solScroll.scrollTo}
            dark
          />
        )}
      </div>
      {/* end maxWidth wrapper */}
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

const IconArrowUpRight = () => (
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
    <path d="M7 17L17 7M17 7H7M17 7V17" />
  </svg>
);

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
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Header */}
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
            margin: "0 0 20px 0",
          }}
        >
          Building With Ghana's <span style={{ color: colors.accent, fontWeight: "600" }}>Strongest Institutions</span>
        </h2>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "16px",
            color: "#666",
            lineHeight: "1.65",
            margin: "0 0 32px 0",
            maxWidth: "750px",
          }}
        >
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
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                width: "100%",
                padding: "14px",
                backgroundColor: colors.white,
                border: `1.5px solid ${colors.primary}`,
                borderRadius: "12px",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "600",
                color: colors.primary,
                cursor: "pointer",
              }}
            >
              View {partner.name} Details
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

          {/* RIGHT: Detail panel */}
          {(!isMobile || showDetail) && (
            <>
              <div
                style={{
                  backgroundColor: colors.white,
                  borderRadius: isMobile ? "16px" : "20px",
                  border: `1px solid ${colors.line}`,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "12px",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: ts.darkBg,
                        color: ts.color,
                        padding: "4px 12px",
                        borderRadius: "50px",
                        fontSize: "10px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "0.8px",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {partner.typeLabel}
                    </span>
                    {partner.year && (
                      <span
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "12px",
                          color: "rgba(255,255,255,0.4)",
                        }}
                      >
                        Since {partner.year}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h3
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: isMobile ? "20px" : "26px",
                      fontWeight: "600",
                      color: colors.white,
                      margin: "0 0 12px 0",
                      lineHeight: "1.2",
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
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "10px",
                          fontWeight: "700",
                          color: colors.primary,
                          textTransform: "uppercase",
                          letterSpacing: "1.5px",
                          marginBottom: "16px",
                        }}
                      >
                        Core Strengths
                      </div>
                      {partner.strengths.map((s, i) => (
                        <div key={i} style={{ marginBottom: "14px" }}>
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
                                fontSize: "13px",
                                color: colors.dark,
                                fontWeight: "500",
                              }}
                            >
                              {s.name}
                            </span>
                            <span
                              style={{
                                fontFamily: "Poppins, sans-serif",
                                fontSize: "12px",
                                fontWeight: "700",
                                color: colors.primary,
                              }}
                            >
                              {s.rating}/5
                            </span>
                          </div>
                          <div
                            style={{
                              height: "5px",
                              backgroundColor: colors.background,
                              borderRadius: "3px",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                width: `${(s.rating / 5) * 100}%`,
                                backgroundColor: colors.accent,
                                borderRadius: "3px",
                                transition: "width 0.4s ease",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Gaps */}
                    <div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "10px",
                          fontWeight: "700",
                          color: colors.primary,
                          textTransform: "uppercase",
                          letterSpacing: "1.5px",
                          marginBottom: "16px",
                        }}
                      >
                        Where BRIDGE Adds Value
                      </div>
                      {partner.gaps.map((gap, i) => (
                        <div
                          key={i}
                          style={{
                            backgroundColor: colors.lightGreen,
                            borderRadius: "8px",
                            padding: "11px 14px",
                            marginBottom: "6px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              width: "5px",
                              height: "5px",
                              borderRadius: "50%",
                              backgroundColor: colors.primary,
                              flexShrink: 0,
                              opacity: 0.4,
                            }}
                          />
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "12.5px",
                              color: colors.primary,
                              fontWeight: "500",
                              lineHeight: "1.4",
                            }}
                          >
                            {gap}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ height: "1px", backgroundColor: colors.line, margin: "0 0 24px 0" }} />

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
                      style={{
                        backgroundColor: colors.lightGreen,
                        borderRadius: "14px",
                        padding: isMobile ? "16px" : "20px 24px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          marginBottom: "10px",
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
                            color: colors.primary,
                          }}
                        >
                          <IconArrowUpRight />
                        </div>
                        <span
                          style={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "10px",
                            fontWeight: "700",
                            color: colors.primary,
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                          }}
                        >
                          BRIDGE Opportunity
                        </span>
                      </div>
                      <p
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "14px",
                          color: colors.primary,
                          lineHeight: "1.6",
                          margin: 0,
                          fontWeight: "500",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {partner.bridgeOpportunity}
                      </p>
                    </div>

                    <div>
                      <div
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "10px",
                          fontWeight: "700",
                          color: colors.primary,
                          textTransform: "uppercase",
                          letterSpacing: "1.5px",
                          marginBottom: "12px",
                        }}
                      >
                        Synergies
                      </div>
                      {partner.synergies.map((s, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "10px",
                          }}
                        >
                          <div
                            style={{
                              width: "4px",
                              height: "4px",
                              borderRadius: "50%",
                              backgroundColor: colors.accent,
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "12.5px",
                              color: "#555",
                              fontWeight: "500",
                              lineHeight: "1.3",
                            }}
                          >
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
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    width: "100%",
                    padding: "12px",
                    marginTop: "8px",
                    backgroundColor: "transparent",
                    border: "none",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#999",
                    cursor: "pointer",
                  }}
                >
                  Collapse
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#999"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
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
            backgroundColor: cs.bg,
            border: `1px solid ${cs.border}`,
            color: colors.primary,
            padding: "3px 10px",
            borderRadius: "50px",
            fontSize: "9px",
            fontWeight: "700",
            fontFamily: "Inter, sans-serif",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {catLabels[policy.category]}
        </span>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "10px",
            color: "#999",
          }}
        >
          {policy.body}
        </span>
      </div>

      {/* Policy name */}
      <h3
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "16px",
          fontWeight: "700",
          color: colors.primary,
          margin: "0 0 8px 0",
          minHeight: "42px",
          lineHeight: "1.3",
        }}
      >
        {policy.policy}
      </h3>

      {/* Allocation */}
      <div
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "13px",
          fontWeight: "700",
          color: colors.accent,
          marginBottom: "12px",
        }}
      >
        {policy.allocation}
      </div>

      {/* Alignment text */}
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "13px",
          color: "#666",
          lineHeight: "1.55",
          margin: "0 0 4px 0",
          minHeight: "40px",
        }}
      >
        {policy.alignment}
      </p>

      {/* Expand hint */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "6px",
          marginTop: "auto",
          paddingTop: "8px",
        }}
      >
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            fontWeight: "600",
            color: isExpanded ? colors.accent : "#bbb",
            transition: "color 0.2s ease",
          }}
        >
          BRIDGE alignment
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isExpanded ? colors.accent : "#bbb"}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "all 0.25s ease",
          }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
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
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              color: "#444",
              lineHeight: "1.6",
              margin: "0 0 14px 0",
            }}
          >
            {policy.bridgeRole}
          </p>

          {/* Pillars */}
          {policy.pillars && policy.pillars.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "6px",
                flexWrap: "wrap",
                marginBottom: "14px",
              }}
            >
              {policy.pillars.map((pill, i) => (
                <span
                  key={i}
                  style={{
                    backgroundColor: colors.white,
                    color: colors.primary,
                    padding: "4px 10px",
                    borderRadius: "50px",
                    fontSize: "10px",
                    fontWeight: "600",
                    fontFamily: "Inter, sans-serif",
                    border: `1px solid ${colors.line}`,
                    whiteSpace: "nowrap",
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
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "9px",
                  fontWeight: "700",
                  color: "#999",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "8px",
                }}
              >
                Connected Ventures
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {policy.bridgeVentures.map((v, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      backgroundColor: colors.primary,
                      borderRadius: "8px",
                      padding: "8px 12px",
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
                        fontSize: "12px",
                        fontWeight: "500",
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
          <div
            style={{
              display: "flex",
              gap: "16px",
            }}
          >
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
          style={{
            backgroundColor: colors.primary,
            borderRadius: "16px",
            padding: isMobile ? "24px 20px" : "28px 32px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: isMobile ? "16px" : "24px",
            margin: isMobile ? "32px 20px 0" : "40px 0 0",
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: isMobile ? "16px" : "18px",
                fontWeight: "600",
                color: colors.white,
                marginBottom: "6px",
              }}
            >
              BRIDGE complements {"\u2014"} never competes with {"\u2014"} government vision.
            </div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                color: "rgba(255,255,255,0.6)",
                lineHeight: "1.5",
                margin: 0,
              }}
            >
              Every venture aligns with at least one active government policy or initiative.
            </p>
          </div>
          <a
            href="#"
            style={{
              backgroundColor: colors.accent,
              color: colors.primary,
              padding: "12px 24px",
              borderRadius: "50px",
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
              fontWeight: "700",
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            View Partnership Strategy
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
    6: (
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
        <path d="M15 2v2" />
        <path d="M15 20v2" />
        <path d="M2 15h2" />
        <path d="M2 9h2" />
        <path d="M20 15h2" />
        <path d="M20 9h2" />
        <path d="M9 2v2" />
        <path d="M9 20v2" />
      </svg>
    ),
    5: (
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
  };

  const hubIcon = (
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
  );

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
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: isMobile ? "32px" : "48px" }}>
          <span
            style={{
              display: "inline-block",
              backgroundColor: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
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
              letterSpacing: "-0.5px",
              color: colors.white,
              margin: "0 auto 20px",
              maxWidth: "820px",
            }}
          >
            How Financial Inclusion <span style={{ color: colors.accent, fontWeight: "600" }}>Amplifies Impact</span>
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
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: "1.6",
                    margin: 0,
                  }}
                >
                  Tap a sector above to explore how financial inclusion amplifies its impact
                </p>
              </div>
            ) : (
              /* Desktop: 5-card integration grid */
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
                      <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
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
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {selected.synergies.slice(0, 3).map((synergy, idx) => (
                        <div
                          key={idx}
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
                          <span style={{ color: colors.accent, fontSize: "8px" }}>●</span>
                          <span
                            style={{
                              fontFamily: "Inter, sans-serif",
                              fontSize: "14px",
                              color: "rgba(255,255,255,0.75)",
                            }}
                          >
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
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {selected.bridgeVentures.map((venture, idx) => (
                        <div
                          key={idx}
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
                            {venture}
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
                      Explore {selected.name} Sector →
                    </a>
                  </div>
                )}
              </div>

              {/* Mobile: Show more / Show less toggle */}
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
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto" }}>
        {/* Section Header */}
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
              ...(isMobile ? { margin: "0 auto 16px" } : {}),
            }}
          >
            Every Stakeholder Has a Role in{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Financial Security</span>
          </h2>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              color: "#666",
              lineHeight: "1.65",
              margin: 0,
              maxWidth: "700px",
              ...(isMobile ? { margin: "0 auto" } : {}),
            }}
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

            {/* Pitch — desktop only */}
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

            {/* Stat cards — 3 columns */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
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
                  <div
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "10px",
                      color: "#888",
                    }}
                  >
                    {stat.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* ===== ENGAGEMENT PATHWAYS — fills the dead space ===== */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      flex: 1,
                    }}
                  >
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
                      }}
                    >
                      {path.get}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bank of Ghana validation */}
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
              <IconCheck style={{ color: colors.primary, flexShrink: 0, width: 18, height: 18 }} />
              <div
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "13px",
                  color: "#444",
                  lineHeight: "1.5",
                }}
              >
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
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.45)",
                  }}
                >
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

          {/* Mobile: toggle for tab panel */}
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
          {isMobile && showInvestmentDetails && (
            <button
              onClick={() => setShowInvestmentDetails(false)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                width: "100%",
                padding: "12px",
                marginTop: "8px",
                backgroundColor: "transparent",
                border: "none",
                fontFamily: "Inter, sans-serif",
                fontSize: "13px",
                fontWeight: "600",
                color: "#999",
                cursor: "pointer",
              }}
            >
              Collapse
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#999"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 15l-6-6-6 6" />
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
// IMPACT SECTION — Dual-Lens Dashboard
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

const useCounter = (target, duration = 1200, active = true) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }
    const num = typeof target === "number" ? target : parseFloat(target);
    if (isNaN(num)) {
      setCount(target);
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
        style={{
          padding: "18px 16px",
          backgroundColor: index % 2 === 0 ? colors.white : "transparent",
          opacity: animate ? 1 : 0,
          transition: `opacity 0.4s ease ${index * 0.08}s`,
          position: "relative",
        }}
      >
        {/* Trend tag - top right */}
        <div
          style={{
            position: "absolute",
            top: "18px",
            right: "16px",
            fontFamily: "Inter, sans-serif",
            fontSize: "10px",
            fontWeight: "700",
            color: colors.primary,
            backgroundColor: "rgba(27,77,62,0.08)",
            border: "1px solid rgba(27,77,62,0.15)",
            padding: "3px 8px",
            borderRadius: "50px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {item.trend}
        </div>

        {/* Number */}
        <div
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "28px",
            fontWeight: "700",
            color: colors.primary,
            letterSpacing: "-1px",
            lineHeight: "1.1",
            marginBottom: "8px",
          }}
        >
          {item.prefix}
          {formatted}
          {item.suffix}
        </div>

        {/* Label + description */}
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "15px",
            fontWeight: "700",
            color: colors.primary,
            marginBottom: "3px",
          }}
        >
          {item.label}
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "13px",
            color: "#666",
            lineHeight: "1.5",
            paddingRight: "20px",
          }}
        >
          {item.description}
        </div>

        {/* Ventures pill */}
        <div
          style={{
            display: "inline-block",
            backgroundColor: index % 2 === 0 ? colors.background : "rgba(27,77,62,0.04)",
            borderRadius: "8px",
            padding: "6px 12px",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "8px",
              fontWeight: "700",
              color: "#aaa",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
              marginBottom: "2px",
            }}
          >
            Ventures
          </div>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "11px",
              fontWeight: "500",
              color: colors.primary,
              lineHeight: "1.3",
            }}
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
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr 200px",
        gap: "32px",
        padding: "24px 28px",
        backgroundColor: index % 2 === 0 ? colors.white : "transparent",
        alignItems: "center",
        opacity: animate ? 1 : 0,
        transition: `opacity 0.4s ease ${index * 0.08}s`,
      }}
    >
      {/* Number + trend */}
      <div>
        <div
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "36px",
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
        <div
          style={{
            display: "inline-block",
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            fontWeight: "700",
            color: colors.primary,
            backgroundColor: "rgba(27,77,62,0.08)",
            border: "1px solid rgba(27,77,62,0.15)",
            padding: "4px 10px",
            borderRadius: "50px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginTop: "6px",
          }}
        >
          {item.trend}
        </div>
      </div>

      {/* Label + description */}
      <div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "15px",
            fontWeight: "700",
            color: colors.primary,
            marginBottom: "2px",
          }}
        >
          {item.label}
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "13px",
            color: "#666",
            lineHeight: "1.5",
          }}
        >
          {item.description}
        </div>
      </div>

      {/* Linked ventures */}
      <div
        style={{
          backgroundColor: index % 2 === 0 ? colors.background : "rgba(27,77,62,0.04)",
          borderRadius: "10px",
          padding: "10px 16px",
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
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
            fontFamily: "Inter, sans-serif",
            fontSize: "11px",
            fontWeight: "500",
            color: colors.primary,
            lineHeight: "1.4",
          }}
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
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "12px", padding: isMobile ? "0 20px" : 0 }}>
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
            }}
          >
            What Changes When <span style={{ fontWeight: "600" }}>Financial</span>
            <br />
            <span style={{ fontWeight: "600" }}>Systems</span>{" "}
            <span style={{ color: colors.accent, fontWeight: "600" }}>Work</span>
          </h2>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              color: "#555",
              lineHeight: "1.7",
              margin: "0 0 40px 0",
              maxWidth: "720px",
            }}
          >
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
          {!isMobile && <div style={{ width: "1px", height: "24px", backgroundColor: colors.line }} />}

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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              {activeStake.outcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    padding: "14px 20px",
                    borderRadius: "12px",
                    backgroundColor: idx % 2 === 0 ? colors.background : "transparent",
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: idx % 2 === 0 ? colors.white : colors.background,
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
                      {idx + 1}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "Inter, sans-serif",
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

            {/* Key Advantage strip */}
            <div
              style={{
                marginTop: "24px",
                padding: "16px 24px",
                backgroundColor: colors.primary,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
                flexWrap: isMobile ? "wrap" : "nowrap",
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
                  flexShrink: 0,
                }}
              >
                Key Advantage
              </span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "rgba(255,255,255,0.85)",
                }}
              >
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
      <div style={{ maxWidth: CONTENT_MAX_WIDTH, margin: "0 auto", textAlign: "center" }}>
        <span
          style={{
            display: "inline-block",
            backgroundColor: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
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
            letterSpacing: "-0.5px",
            color: colors.white,
            margin: "0 0 20px 0",
          }}
        >
          Let's Build Ghana's <span style={{ color: colors.accent, fontWeight: "600" }}>Financial Future</span>
        </h2>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "18px",
            lineHeight: "1.7",
            color: "rgba(255,255,255,0.6)",
            margin: "0 0 40px 0",
            maxWidth: "680px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Whether you're an investor, partner, or government stakeholder, there's a seat at the table in building
          Ghana's financial future.
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            ...(isMobile ? { flexDirection: "column", alignItems: "center" } : {}),
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
              ...(isMobile ? { width: "100%", textAlign: "center" } : {}),
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
    </section>
  );
};

// ============================================================================

// ============================================================================
// SECTOR GRID WIDGET FOR FOOTER
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

// ============================================================================
// SOCIAL ICONS
// ============================================================================
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
// BRIDGE LOGO WHITE
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

export default function FinancialInclusionSectorPage() {
  const isMobile = useIsMobile();
  return (
    <div style={{ fontFamily: "Inter, sans-serif", margin: 0, padding: 0, backgroundColor: colors.white }}>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Poppins:wght@700;800&display=swap"
        rel="stylesheet"
      />
      {/* Fade-in animation for mobile menu */}
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } .hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>

      <Header />
      <HeroSection sector={sectorData} />
      <ProblemSection sector={sectorData} />
      <ValueChainSectionPremium />
      <SolutionsSection sector={sectorData} />
      <MarketEcosystemSection sector={sectorData} />
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
