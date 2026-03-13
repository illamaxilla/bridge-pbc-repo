import type { SectorData } from "./types";

export const technologySector: SectorData = {
  id: 4,
  slug: "technology",
  name: "Technology & Innovation",
  shortName: "Technology",
  category: "Innovation",
  categoryColor: "#7C3AED",

  heroTitleBold: "Technology",
  heroTitleRest: "& Innovation",
  problemHeadline: "Bridging Ghana's Digital Divide",

  capitalRange: "$8-15M",
  ventures: 21,
  jobsImpact: "24.3M users",
  gdpContribution: "3.6%",

  problemSubheadline:
    "Ghana's digital foundation is extraordinary — 70% internet penetration, 23.4M mobile money users, 100+ tech hubs, and a generation of builders ready to scale. The opportunity: channeling $10B+ in addressable market potential into ventures that connect 10.4M more citizens, unlock capital for 200+ growth-stage startups, and close the gap between connectivity and prosperity.",

  keyStats: [
    { value: "69.9%", label: "Internet Penetration", detail: "22-54% rural vs 80%+ urban gap" },
    { value: "<1%", label: "Female Founder Funding", detail: "Of total venture capital deployed" },
    { value: "100+", label: "Active Tech Hubs", detail: "Accra, Kumasi & emerging cities" },
    { value: "10.4M", label: "Ghanaians Offline", detail: "Next wave of digital adoption" },
  ],

  painPoints: [
    {
      title: "Growth Capital Opportunity",
      description:
        "Ghana's best startups are ready for Series A capital — local fund structures can retain talent and capture returns currently flowing abroad.",
      quantification: "$68M deployed in 2024 — $500M+ addressable market",
    },
    {
      title: "Rural Connectivity Frontier",
      description:
        "10.4M Ghanaians represent the next wave of digital adoption — communities ready for mobile commerce, financial services, and digital platforms.",
      quantification: "10.4M citizens ready for first-time digital access",
    },
    {
      title: "Talent Retention & Mobilization",
      description:
        "Thousands of world-class Ghanaian developers work globally — a salary bridge that local opportunities and remote platforms can narrow.",
      quantification: "1,000s of developers available for mobilization",
    },
    {
      title: "Female Founder Potential",
      description:
        "Women represent Ghana's largest untapped founder pool — dedicated accelerators and inclusive fund structures unlock new venture creation.",
      quantification: "99% of female founder capital yet to deploy",
    },
  ],

  solutions: [
    {
      tier: 1,
      name: "Kejetia Digital Platform",
      description:
        "Flagship digitization platform serving 10,000+ vendors with inventory management, mobile payments, and analytics for informal markets.",
      capital: "$3-5M",
      score: 42,
      impact: "10,000+ vendors digitized across Kejetia Market",
      model: "Vendor onboarding → inventory digitization → mobile payments → analytics",
    },
    {
      tier: 1,
      name: "BRIDGE Growth Fund",
      description:
        "Seed-to-Series A investments of $200K–$2M in 8–12 Ghana-based tech startups, building the local venture funding ecosystem from the ground up.",
      capital: "$5-10M",
      score: 40,
      impact: "8–12 startups retained and scaled in-country",
      model: "Deal sourcing → due diligence → investment → portfolio support",
    },
    {
      tier: 1,
      name: "Tech Talent Bridge Program",
      description:
        "Structured engagement channels for 100+ diaspora technology professionals contributing mentorship, code review, and advisory to local teams.",
      capital: "$300-600K",
      score: 40,
      impact: "100+ diaspora professionals actively engaged",
      model: "Diaspora recruitment → matching → mentorship → advisory",
    },
    {
      tier: 1,
      name: "Fintech Growth Portfolio",
      description:
        "Growth capital deployed into licensed fintech companies building credit, lending, and insurance products on Ghana's 23.4M mobile money base.",
      capital: "$2-4M",
      score: 39,
      impact: "23.4M mobile money users gaining new products",
      model: "Fintech screening → licensing verification → growth investment",
    },
    {
      tier: 1,
      name: "Digital Apprentice Pipeline",
      description:
        "Training-to-employment partnerships placing graduates directly into portfolio companies with structured mentorship and career development.",
      capital: "$200-400K",
      score: 38,
      impact: "500+ graduates placed into tech employment",
      model: "Training cohorts → portfolio company matching → placement → mentorship",
    },
    {
      tier: 1,
      name: "Female Founder Accelerator",
      description:
        "Dedicated accelerator addressing the <1% funding gap with pre-seed capital, mentorship networks, and investor access for women-led startups.",
      capital: "$150-300K",
      score: 38,
      impact: "20+ women-led startups funded and scaling",
      model: "Application → cohort selection → pre-seed capital → investor access",
    },
    {
      tier: 2,
      name: "Hub Partnership Network",
      description:
        "Formal partnerships with Ghana's 100+ existing tech hubs enabling shared deal flow, co-programming of events, and ecosystem coordination.",
      capital: "$50-100K/yr",
      score: 38,
      impact: "100+ hubs connected into deal flow pipeline",
      model: "Hub mapping → partnership agreements → shared deal flow → co-programming",
    },
    {
      tier: 2,
      name: "Innovation Advisory Service",
      description:
        "Fee-generating advisory for early-stage startups covering product strategy, fundraising preparation, market expansion, and governance design.",
      capital: "$100-250K",
      score: 37,
      impact: "40+ startups advised with measurable growth",
      model: "Startup intake → advisory engagement → milestone tracking → fee collection",
    },
    {
      tier: 2,
      name: "Market Platform Expansion",
      description:
        "Replicating the proven Kejetia digitization model to Makola, Asafo, and five additional regional markets serving 50,000+ combined vendors.",
      capital: "$2-4M each",
      score: 37,
      impact: "50,000+ vendors across seven major markets",
      model: "Market assessment → vendor onboarding → platform deployment → scaling",
    },
  ],

  competitors: [
    {
      name: "MEST Africa",
      focus: "Training, investment & incubation",
      gap: "Limited growth-stage capital",
      year: "2008",
      funding: "$20M+",
      priority: "High",
      marketShare: "15%",
      coverage: "Pan-African",
      employees: "100+",
      strengths: [
        { name: "Training Program", rating: 5 },
        { name: "Pan-African Network", rating: 4 },
        { name: "Seed Investment", rating: 4 },
      ],
      gaps: ["No Series A follow-on capacity", "Limited sector specialization", "Accra-centric operations"],
      bridgeOpportunity: "Deal flow partnership and co-investment at growth stage",
      partnershipType: "Collaborate",
      synergyAreas: ["Deal flow sharing", "Co-investment at growth stage", "Portfolio company support"],
    },
    {
      name: "Ghana Tech Lab",
      focus: "Government-affiliated tech hub",
      gap: "No investment capability",
      year: "2018",
      funding: "Gov't",
      priority: "High",
      marketShare: "10%",
      coverage: "National",
      employees: "50+",
      strengths: [
        { name: "AI/Robotics Labs", rating: 4 },
        { name: "Government Access", rating: 5 },
        { name: "Youth Reach", rating: 4 },
      ],
      gaps: ["No capital deployment mechanism", "Limited commercialization pathway", "Sustainability model unclear"],
      bridgeOpportunity: "Hub partnership anchor and startup sourcing pipeline",
      partnershipType: "Collaborate",
      synergyAreas: ["Hub partnership anchor", "Startup sourcing pipeline", "AI/Robotics commercialization"],
    },
    {
      name: "Impact Hub Accra",
      focus: "Coworking & acceleration",
      gap: "No dedicated tech focus",
      year: "2015",
      funding: "$5M+",
      priority: "Medium",
      marketShare: "5%",
      coverage: "Accra",
      employees: "30+",
      strengths: [
        { name: "Global Network", rating: 5 },
        { name: "Social Enterprise", rating: 4 },
        { name: "Community Events", rating: 4 },
      ],
      gaps: ["Limited capital access", "Broad focus dilutes tech impact", "Space constraints in Accra"],
      bridgeOpportunity: "Event partnership and social enterprise deal pipeline",
      partnershipType: "Collaborate",
      synergyAreas: ["Event partnership", "Social enterprise deal pipeline", "Community engagement"],
    },
    {
      name: "Kosmos Innovation Center",
      focus: "Kumasi-based entrepreneur support",
      gap: "Narrow geographic & sector scope",
      year: "2016",
      funding: "$10M+",
      priority: "Medium",
      marketShare: "5%",
      coverage: "Ashanti Region",
      employees: "30+",
      strengths: [
        { name: "Ashanti Reach", rating: 5 },
        { name: "Agtech Focus", rating: 4 },
        { name: "Corporate Backing", rating: 4 },
      ],
      gaps: ["Oil company transition risk", "Limited tech depth beyond agtech", "Small cohort size annually"],
      bridgeOpportunity: "Regional expansion partner for Kumasi tech ecosystem",
      partnershipType: "Collaborate",
      synergyAreas: ["Regional expansion", "Agtech pipeline", "Kumasi ecosystem building"],
    },
    {
      name: "ALX Africa",
      focus: "Tech skills training at scale",
      gap: "No startup support or capital",
      year: "2022",
      funding: "$100M+",
      priority: "High",
      marketShare: "20%",
      coverage: "Pan-African",
      employees: "500+",
      strengths: [
        { name: "Scale (100K+)", rating: 5 },
        { name: "Data Science Focus", rating: 5 },
        { name: "Employment Rates", rating: 4 },
      ],
      gaps: ["Training only, no venture support", "Retention in Ghana remains low", "Foreign curriculum alignment"],
      bridgeOpportunity: "Talent pipeline for portfolio companies and apprenticeships",
      partnershipType: "Collaborate",
      synergyAreas: ["Talent pipeline", "Portfolio company staffing", "Apprenticeship graduates"],
    },
    {
      name: "Google Research Africa",
      focus: "AI research from Accra lab",
      gap: "Limited local commercialization",
      year: "2019",
      funding: "$1B+",
      priority: "Medium",
      marketShare: "N/A",
      coverage: "Accra",
      employees: "50+",
      strengths: [
        { name: "AI Research", rating: 5 },
        { name: "Brand & Resources", rating: 5 },
        { name: "Language Tech", rating: 5 },
      ],
      gaps: ["Research not commercialized locally", "Talent pipeline flows to Google", "Limited local startup impact"],
      bridgeOpportunity: "Research partnership for AI applications in portfolio",
      partnershipType: "Monitor",
      synergyAreas: ["AI research partnerships", "Language technology applications", "Talent sharing"],
    },
  ],

  crossSector: [
    {
      sectorId: 2,
      name: "Financial Inclusion",
      connection: "Fintech portfolio, mobile money integration, digital credit scoring",
      multiplier: "3.2×",
      synergies: [
        "Fintech venture co-investment pipeline",
        "Kejetia platform as financial product distribution",
        "Transaction data enabling alternative credit scoring",
      ],
      bridgeVentures: ["Fintech Growth Portfolio", "Market Financial Services"],
      impact:
        "Technology platforms create the rails for digital financial services — every vendor digitized becomes a potential borrower, saver, and insurance customer.",
    },
    {
      sectorId: 3,
      name: "Health Systems",
      connection: "Healthtech investments, telemedicine infrastructure, data systems",
      multiplier: "2.8×",
      synergies: [
        "Telemedicine platforms extending specialist reach",
        "AI diagnostics deployed through portfolio companies",
        "Health data systems built on digital infrastructure",
      ],
      bridgeVentures: ["HealthTech Portfolio", "Telemedicine Platform"],
      impact:
        "Digital infrastructure enables remote diagnostics and AI triage, extending healthcare access to communities where the doctor-to-patient ratio is 1:6,355.",
    },
    {
      sectorId: 6,
      name: "Agriculture",
      connection: "Kejetia platform, agtech investments, market digitization",
      multiplier: "3.5×",
      synergies: [
        "Kejetia market digitization serving 10,000+ vendors",
        "Agtech startups connecting farmers to markets",
        "Supply chain tracking reducing post-harvest losses",
      ],
      bridgeVentures: ["Kejetia Digital Platform", "AgTech Supply Chain"],
      impact:
        "The Kejetia platform is both a technology venture and an agriculture enabler — digitizing West Africa's largest market unlocks transparent pricing and reduces 30–40% post-harvest losses.",
    },
    {
      sectorId: 1,
      name: "Infrastructure",
      connection: "IoT integration, smart sensors, digital payments for services",
      multiplier: "2.4×",
      synergies: [
        "IoT sensors for water and sanitation monitoring",
        "Digital payment systems for infrastructure services",
        "Data analytics informing investment priorities",
      ],
      bridgeVentures: ["Smart Infrastructure IoT", "Digital Service Payments"],
      impact:
        "Connected sensors and digital payment layers transform static infrastructure into intelligent systems — water kiosks that report usage, markets that optimize energy, roads that predict maintenance.",
    },
    {
      sectorId: 5,
      name: "Education & Skills",
      connection: "Digital apprenticeships, talent pipeline, edtech platforms",
      multiplier: "4.1×",
      synergies: [
        "Apprenticeship pipeline feeding portfolio companies",
        "EdTech platforms scaling skills training nationally",
        "Hub partnerships coordinating 100+ training centers",
      ],
      bridgeVentures: ["Digital Apprentice Pipeline", "EdTech Platforms"],
      impact:
        "Every technology venture needs talent. The apprenticeship pipeline, hub partnerships, and EdTech platforms create a self-reinforcing cycle where companies grow the workforce that grows companies.",
    },
  ],

  valueChain: [
    {
      stage: "Infrastructure",
      stat: "69.9%",
      statDetail: "internet penetration — 10.4M still offline",
      description:
        "Telecoms and ISPs providing the connectivity foundation. 38.3M mobile connections with 4G at just 15% utilization, and a fixed broadband market at <0.7% representing a greenfield opportunity.",
      insight:
        "10.4M citizens still without internet access represent the next wave of digital adoption. Platform design for low-bandwidth, mobile-first access is the key to reaching them.",
      ventures: ["Kejetia Digital Platform", "Market Platform Expansion"],
      icon: "wifi",
    },
    {
      stage: "Talent",
      stat: "100K+",
      statDetail: "in tech training — 5-10× salary bridge",
      description:
        "Universities and bootcamps building Ghana's tech workforce. ALX has enrolled 100K+, Girls in ICT reaches 5,000/yr, and CS graduate pipelines are growing — but a 5-10× salary gap drives talent abroad.",
      insight:
        "The salary bridge is narrowing as remote work platforms and local opportunity creation make it viable for world-class Ghanaian developers to build from home.",
      ventures: ["Digital Apprentice Pipeline", "Tech Talent Bridge Program"],
      icon: "graduation",
    },
    {
      stage: "Innovation",
      stat: "$68M",
      statDetail: "deployed in 2024 — $500M+ addressable",
      description:
        "100+ tech hubs and a growing startup ecosystem ranked 81st globally. $68M deployed in 2024 with fintech capturing 60% of funding, but founders leave to raise Series A capital abroad.",
      insight:
        "Local fund structures for Series A are a greenfield opportunity. The first mover building founder-friendly, Ghana-based growth capital captures an outsized share of deal flow.",
      ventures: ["BRIDGE Growth Fund", "Innovation Advisory Service"],
      icon: "lightbulb",
    },
    {
      stage: "Capital",
      stat: "99%",
      statDetail: "of female founder capital undeployed",
      description:
        "Fewer than 5 local VC funds in a $535M market. Venture debt has surged 431%, but the female founder funding gap remains at 99% — representing the largest untapped pool of venture creation.",
      insight:
        "First-mover advantage in local Series A and female founder capital is enormous. Patient capital models designed for the Ghanaian context will define the next decade of ecosystem growth.",
      ventures: ["Female Founder Accelerator", "Fintech Growth Portfolio"],
      icon: "chart",
    },
    {
      stage: "Adoption",
      stat: "23.4M",
      statDetail: "mobile money users — Africa frontrunner",
      description:
        "23.4M mobile money users lead Africa, with 68% smartphone penetration and 7.95M social media users. ICT contributes 3.6% of GDP, but products aren't built for informal sector reality.",
      insight:
        "The Kejetia Digital Platform is designed for informal sector reality — culturally appropriate, mobile-first, and built on trust. 23.4M MoMo users are the distribution channel.",
      ventures: ["Kejetia Digital Platform", "Market Platform Expansion"],
      icon: "users",
    },
  ],

  policies: [
    {
      policy: "Proposed $50M Fintech Fund",
      body: "Bank of Ghana / Mahama Administration",
      allocation: "$50M Proposed",
      category: "funding",
      alignment:
        "Dedicated government-backed fund targeting fintech startups building credit scoring, mobile lending, insurance, and payment infrastructure",
      bridgeRole:
        "Co-investment partner for fintech portfolio ventures — BRIDGE provides deal sourcing, due diligence, and venture support alongside government capital",
      bridgeVentures: ["Fintech Growth Portfolio", "BRIDGE Growth Fund"],
      pillars: ["Fintech Innovation", "MSME Access", "Digital Payments"],
    },
    {
      policy: "Youth Enterprise Support Fund",
      body: "Ministry of Youth & Sports / NBSSI",
      allocation: "$25M Allocated",
      category: "funding",
      alignment:
        "Dedicated funding stream for youth-led enterprises with priority tracks for digital businesses and technology startups",
      bridgeRole:
        "BRIDGE accelerator graduates gain access to government-backed growth capital — creating a seamless pipeline from training through funding to market entry",
      bridgeVentures: ["Female Founder Accelerator", "Digital Apprentice Pipeline"],
      pillars: ["Youth Employment", "Startup Capital", "Digital Skills"],
    },
    {
      policy: "Ghana EXIM Bank Tech Export Fund",
      body: "Ghana Export-Import Bank",
      allocation: "$15M Credit Line",
      category: "funding",
      alignment:
        "Credit facility supporting Ghanaian tech companies expanding to regional markets across ECOWAS and broader Africa",
      bridgeRole:
        "BRIDGE portfolio companies access export credit for cross-border expansion — enabling Kejetia platform and fintech products to scale regionally",
      bridgeVentures: ["BRIDGE Growth Fund", "Kejetia Digital Platform"],
      pillars: ["Regional Expansion", "Tech Exports", "AfCFTA Alignment"],
    },
    {
      policy: "Ghana Innovation & Startup Act",
      body: "Ministry of Communications & Digitalisation",
      allocation: "Tax Holidays + Fund",
      category: "tax",
      alignment:
        "Landmark legislation creating regulatory sandbox, tax incentives for certified startups, and national innovation fund",
      bridgeRole:
        "BRIDGE ventures benefit directly from startup tax holidays and sandbox provisions — reducing barriers for portfolio companies while accelerating market entry",
      bridgeVentures: ["BRIDGE Growth Fund", "Female Founder Accelerator", "Innovation Advisory Service"],
      pillars: ["Tax Relief", "Simplified Registration", "Innovation Fund"],
    },
    {
      policy: "E-Levy Reform",
      body: "Ministry of Finance / GRA",
      allocation: "Rate Reduction",
      category: "tax",
      alignment:
        "Expected rollback or modification of the electronic levy on digital transactions to reduce friction for digital economy growth",
      bridgeRole:
        "Lower transaction costs directly improve unit economics for every BRIDGE fintech and digital platform venture — expanding addressable user base and transaction volume",
      bridgeVentures: ["Fintech Growth Portfolio", "Kejetia Digital Platform", "Market Platform Expansion"],
      pillars: ["Transaction Cost Reduction", "Digital Economy Enablement"],
    },
    {
      policy: "Free Zones Tech Incentives",
      body: "Ghana Free Zones Authority",
      allocation: "Tax Exemptions",
      category: "tax",
      alignment:
        "Extended Free Zones benefits for technology companies including 10-year corporate tax holidays and duty-free equipment imports for qualifying digital enterprises",
      bridgeRole:
        "BRIDGE portfolio companies in Accra Digital Centre and partner hubs leverage Free Zones status to reduce operational costs during critical growth phases",
      bridgeVentures: ["Hub Partnership Network", "BRIDGE Growth Fund", "Innovation Advisory Service"],
      pillars: ["Corporate Tax Holiday", "Duty-Free Imports", "Digital Free Zones"],
    },
    {
      policy: "Digital Infrastructure Expansion",
      body: "National IT Agency (NITA) / NGIC",
      allocation: "€310M / 4,400 Sites",
      category: "infrastructure",
      alignment:
        "4,400 new telecom sites for 4G/5G deployment targeting 80% 4G penetration by 2028 and closing the urban-rural digital divide",
      bridgeRole:
        "Connectivity is the foundation layer for every BRIDGE technology venture — as infrastructure expands, platform ventures gain access to 10.4M previously offline Ghanaians",
      bridgeVentures: ["Kejetia Digital Platform", "Market Platform Expansion"],
      pillars: ["4G/5G Rollout", "Rural Connectivity", "Broadband Targets"],
    },
    {
      policy: "Ghana Digital Centres Program",
      body: "Ministry of Communications & Digitalisation",
      allocation: "$2.6M Expansion",
      category: "infrastructure",
      alignment:
        "Government-supported innovation spaces including Accra Digital Centre flagship with $2.6M commitment for two additional regional centres",
      bridgeRole:
        "Hub Partnership Network connects BRIDGE portfolio companies to government-backed co-working infrastructure — providing physical space, talent access, and ecosystem integration",
      bridgeVentures: ["Hub Partnership Network", "Digital Apprentice Pipeline"],
      pillars: ["Accra Digital Centre", "Regional Hubs", "Training Integration"],
    },
    {
      policy: "National Data Centre Initiative",
      body: "National IT Agency (NITA)",
      allocation: "$8M Phase 1",
      category: "infrastructure",
      alignment:
        "Sovereign cloud and data hosting infrastructure reducing dependency on offshore servers, cutting latency, and enabling data residency compliance for local platforms",
      bridgeRole:
        "BRIDGE fintech and market platform ventures gain local hosting options with lower latency and regulatory compliance — critical for payment processing and vendor data",
      bridgeVentures: ["Kejetia Digital Platform", "Fintech Growth Portfolio"],
      pillars: ["Data Sovereignty", "Cloud Infrastructure", "Latency Reduction"],
    },
    {
      policy: "National AI Strategy",
      body: "Ghana Investment Promotion Centre",
      allocation: "Multi-Year Priority",
      category: "partnerships",
      alignment:
        "Comprehensive strategy positioning Ghana as regional AI hub with ethics frameworks, workforce development, and sector-specific pilot programs",
      bridgeRole:
        "BRIDGE portfolio companies in HealthTech, AgTech, and EdTech deploy AI/ML solutions aligning with national pilot programs — creating a pipeline from government strategy to products",
      bridgeVentures: ["BRIDGE Growth Fund", "Digital Apprentice Pipeline", "Hub Partnership Network"],
      pillars: ["One Million Coders", "AI Ethics Framework", "Sector Pilots"],
    },
    {
      policy: "GIZ FAIR Forward / Make-IT",
      body: "German Development Cooperation",
      allocation: "Technical Assistance",
      category: "partnerships",
      alignment:
        "AI accelerator through Ghana Tech Lab partnership promoting responsible AI development, digital literacy for 22,000+ trainees, and ethical AI governance",
      bridgeRole:
        "BRIDGE connects GIZ-trained talent and AI research outputs to commercial ventures — bridging the gap between development programs and market-ready products",
      bridgeVentures: ["Tech Talent Bridge Program", "Digital Apprentice Pipeline", "Innovation Advisory Service"],
      pillars: ["AI Governance", "Digital Literacy", "Responsible Innovation"],
    },
    {
      policy: "World Bank Digital Economy Project",
      body: "World Bank / Ministry of Finance",
      allocation: "$200M IDA Credit",
      category: "partnerships",
      alignment:
        "Multi-year program strengthening Ghana's digital foundations — broadband access, digital financial services, and government technology modernization",
      bridgeRole:
        "BRIDGE ventures operate in sectors directly targeted by World Bank investments — market digitization, fintech inclusion, and skills development create natural alignment for co-implementation",
      bridgeVentures: ["Kejetia Digital Platform", "Fintech Growth Portfolio", "Digital Apprentice Pipeline"],
      pillars: ["Broadband Access", "Digital Financial Services", "GovTech Modernization"],
    },
  ],
};
