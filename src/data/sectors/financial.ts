import type { SectorData } from "./types";

export const financialSector: SectorData = {
  id: 2,
  slug: "financial",
  name: "Financial Inclusion & Economic Security",
  shortName: "Financial Inclusion",
  category: "Economic Enablers",
  categoryColor: "#1B4D3E",

  capitalRange: "$13-39M",
  ventures: 18,
  jobsImpact: "Millions of traders",
  gdpContribution: "70% GDP (MSMEs)",

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
      quantification: "$2.2B addressable credit market; 70% of GDP from MSMEs",
    },
    {
      title: "Susu Digitization",
      description:
        "850+ collectors manage millions of clients — a trusted network ready for digital tools that enhance security, build formal credit histories, and unlock new services.",
      quantification: "Millions of active savers; credit history creation at scale",
    },
    {
      title: "Diaspora Investment",
      description:
        "$6.65B flows home annually — diaspora members seeking productive channels that build lasting wealth and measurable impact in their home communities across Ghana.",
      quantification: "$6.65B annual flow; billions in deployable diaspora capital",
    },
    {
      title: "Women's Empowerment",
      description:
        "Women comprise 70-90% of susu participants and dominate market trading — a vast market ready for financial products designed around their business cycles and networks.",
      quantification: "70-90% of susu users are women; enormous untapped market",
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
      gap: "Productive credit integration, MSME product development",
      year: "2009",
      funding: "Private",
      priority: "High",
      marketShare: "60%+",
      coverage: "National",
      employees: "N/A",
      strengths: [
        { name: "Digital Infrastructure", rating: 5 },
        { name: "Agent Network (896K)", rating: 5 },
        { name: "Consumer Trust", rating: 5 },
      ],
      gaps: ["Productive credit integration", "MSME product development", "Responsible lending frameworks"],
      bridgeOpportunity:
        "Leverage existing payment rails for market-based financial services — build on infrastructure rather than replicate it.",
      partnershipType: "Collaborate",
      synergyAreas: ["Payment integration", "Agent leverage", "Data scoring"],
    },
    {
      name: "Dev. Bank Ghana",
      focus: "Wholesale MSME finance",
      gap: "Scale acceleration partnership, retail channel development",
      year: "2021",
      funding: "Gov't",
      priority: "High",
      marketShare: "Emerging",
      coverage: "National",
      employees: "N/A",
      strengths: [
        { name: "Government Backing", rating: 5 },
        { name: "Policy Alignment", rating: 5 },
        { name: "Development Focus", rating: 4 },
      ],
      gaps: ["Scale acceleration partnership", "Retail channel development", "Last-mile delivery networks"],
      bridgeOpportunity:
        "On-lending partnership for last-mile MSME delivery through market-based channels and trader networks.",
      partnershipType: "Collaborate",
      synergyAreas: ["Credit guarantees", "MSME pipeline", "Technical assistance"],
    },
    {
      name: "Sinapi Aba Trust",
      focus: "Group lending & women's finance",
      gap: "Urban expansion opportunity, technology platform integration",
      year: "1994",
      funding: "Private",
      priority: "High",
      marketShare: "15% MFI",
      coverage: "Rural",
      employees: "N/A",
      strengths: [
        { name: "Rural Presence", rating: 5 },
        { name: "Women Focus", rating: 5 },
        { name: "MSME Expertise", rating: 5 },
      ],
      gaps: ["Urban expansion opportunity", "Sustainable revenue models", "Technology platform integration"],
      bridgeOpportunity:
        "Delivery partner for market financial services — 30+ years of community trust enables rapid adoption.",
      partnershipType: "Collaborate",
      synergyAreas: ["Group lending", "Women's products", "Rural expansion"],
    },
    {
      name: "Susu Collectors Assoc.",
      focus: "Informal savings networks",
      gap: "Digital tool deployment, credit history infrastructure",
      year: "N/A",
      funding: "Self-funded",
      priority: "High",
      marketShare: "850+ members",
      coverage: "National",
      employees: "850+",
      strengths: [
        { name: "Community Trust", rating: 5 },
        { name: "Collector Network", rating: 5 },
        { name: "Association Legitimacy", rating: 4 },
      ],
      gaps: ["Digital tool deployment", "Credit history infrastructure", "Association-led training"],
      bridgeOpportunity:
        "Essential gateway for susu digitization — Association legitimacy is the prerequisite for collector adoption at scale.",
      partnershipType: "Collaborate",
      synergyAreas: ["Digital susu platform", "Collector training", "Bank linkage"],
    },
    {
      name: "Digital Lenders",
      focus: "Instant consumer credit",
      gap: "Productive credit differentiation, MSME market expansion",
      year: "2018",
      funding: "Private",
      priority: "Medium",
      marketShare: "Growing",
      coverage: "Urban",
      employees: "N/A",
      strengths: [
        { name: "Speed & Convenience", rating: 5 },
        { name: "Digital Experience", rating: 5 },
        { name: "Alternative Data Use", rating: 4 },
      ],
      gaps: ["Productive credit differentiation", "MSME market expansion", "Sustainable lending models"],
      bridgeOpportunity:
        "Differentiate through productive credit — serve the market traders and MSMEs that digital lenders overlook.",
      partnershipType: "Parallel",
      synergyAreas: ["Alt-data methods", "Tech approaches", "Market gaps"],
    },
    {
      name: "Commercial Banks",
      focus: "Formal sector lending",
      gap: "Alternative collateral structures, risk-sharing facilities",
      year: "N/A",
      funding: "Private",
      priority: "High",
      marketShare: "85% formal",
      coverage: "Urban bias",
      employees: "N/A",
      strengths: [
        { name: "Capital Base", rating: 5 },
        { name: "Regulatory License", rating: 5 },
        { name: "Branch Infrastructure", rating: 4 },
      ],
      gaps: ["Alternative collateral structures", "Risk-sharing facilities", "MSME product co-development"],
      bridgeOpportunity:
        "Credit guarantee facility to de-risk MSME lending — unlocks bank capital for borrowers they currently exclude.",
      partnershipType: "Collaborate",
      synergyAreas: ["Guarantee facility", "MSME referrals", "Product co-dev"],
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

  valueChain: [
    {
      stage: "Formal Institutions",
      stat: "35%",
      statDetail: "MSME Access — 23 banks, 144 community banks",
      description:
        "Banks and MFIs providing formal financial services with alternative collateral models, guarantee facility structures, MSME product innovation, and blended capital opportunity.",
      insight:
        "Only 35% of MSMEs access formal credit. Alternative collateral and guarantee structures can unlock bank capital for the 65% currently excluded.",
      ventures: ["MSME Credit Guarantee Facility", "Market Financial Services Platform"],
      icon: "bank",
    },
    {
      stage: "Digital Rails",
      stat: "$192B",
      statDetail: "Transactions — 74.1M accounts, 896K agents",
      description:
        "Mobile money infrastructure enabling productive credit integration, responsible lending frameworks, working capital products, and transaction-based pricing.",
      insight:
        "$192B in mobile money transactions have built the digital rails. The next step is layering productive credit and savings products on top of them.",
      ventures: ["Alternative Credit Scoring Platform", "Digital Susu Integration"],
      icon: "phone",
    },
    {
      stage: "Informal Systems",
      stat: "70-90%",
      statDetail: "Women Users — 850+ registered collectors, millions served",
      description:
        "Susu collectors providing trusted savings networks with digitization readiness, credit history creation, security upgrade potential, and bank linkage pathways.",
      insight:
        "Susu collectors serve millions with deep community trust. Digitizing their operations creates credit histories and unlocks formal financial access.",
      ventures: ["Digital Susu Integration", "Financial Health Hub"],
      icon: "handshake",
    },
    {
      stage: "Diaspora Flows",
      stat: "90%",
      statDetail: "Consumed — $6.65B annual, 3M diaspora",
      description:
        "Remittance flows with fee reduction potential, investment channel creation, Peace & Prosperity Notes, and hedging solutions.",
      insight:
        "90% of $6.65B in remittances goes to consumption. Creating investment channels can redirect billions toward productive, wealth-building uses.",
      ventures: ["Diaspora Investment Gateway", "Women's Economic Empowerment Fund"],
      icon: "globe",
    },
    {
      stage: "End Users",
      stat: "$2.2B",
      statDetail: "Credit Gap — 92% of businesses, 70% GDP",
      description:
        "Traders and MSMEs needing fair-rate credit access, business support services, credit history pathways, and alternative collateral models.",
      insight:
        "MSMEs generate 70% of GDP but face a $2.2B credit gap. Bridging this gap with appropriate financial products unlocks massive economic potential.",
      ventures: ["Trader Working Capital Facility", "Market Microinsurance Bundle"],
      icon: "store",
    },
  ],

  policies: [
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
};
