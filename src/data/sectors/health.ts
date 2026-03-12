import type { SectorData } from "./types";

export const healthSector: SectorData = {
  id: 3,
  slug: "health",
  name: "Health Systems & Wellbeing",
  shortName: "Health",
  category: "Essential Care",
  categoryColor: "#1B4D3E",

  heroTitleBold: "Health",
  heroTitleRest: "Systems & Wellbeing",
  problemHeadline: "Where Every Investment Becomes a Life Transformed",

  capitalRange: "$12-40M",
  ventures: 19,
  jobsImpact: "32M+ citizens",
  gdpContribution: "6.9%",

  problemSubheadline:
    "Ghana\u2019s health sector holds extraordinary potential \u2014 with 15,000+ diaspora healthcare professionals ready to reconnect, 5,000+ community health compounds positioned for strengthening, and an emerging health-tech ecosystem of 40+ startups creating new models of delivery. These are pathways where strategic investment and innovation can transform wellbeing outcomes across every region.",

  keyStats: [
    { value: "1:6,000", label: "Physician-to-Patient Ratio", detail: "1:1,000 WHO target within reach" },
    { value: "68%", label: "NHIS Enrollment", detail: "National coverage foundation" },
    { value: "9", label: "Gov't Policy Alignments", detail: "Partnership pathways mapped" },
    { value: "40+", label: "Health-Tech Startups", detail: "Growing innovation ecosystem" },
  ],

  painPoints: [
    {
      title: "Workforce Reconnection",
      description: "15,000+ diaspora healthcare professionals represent an extraordinary asset ready to reconnect.",
      quantification: "15,000+ diaspora professionals to mobilize; $270M+ training investment to recapture",
    },
    {
      title: "Health Financing",
      description: "With 68% NHIS enrollment, the foundation exists to build accessible coverage for every household.",
      quantification: "11% of households ready for financial protection; 68% NHIS base to build on",
    },
    {
      title: "Nationwide Care Access",
      description: "60% of the population lives in areas where expanding primary care can have the greatest impact.",
      quantification: "3-5x regional density gap = highest-impact investment zones",
    },
    {
      title: "Quality Elevation",
      description: "Strengthening clinical quality and supply chain integrity creates trust in the formal care system.",
      quantification: "95% of facilities addressable for quality upgrades",
    },
  ],

  solutions: [
    {
      tier: 1,
      name: "Diaspora Telemedicine Network",
      description:
        "Connecting 15,000+ diaspora health professionals with Ghana-based providers for remote specialist consultations and referrals.",
      capital: "$1-2.5M",
      score: 41,
      impact: "5,000+ consultations yearly",
      model: "Licensed telemedicine consultation platform",
    },
    {
      tier: 1,
      name: "Market Health Services Hub",
      description:
        "Integrated health services within market infrastructure \u2014 first aid stations, screening programs, and trader health education.",
      capital: "$200-500K",
      score: 41,
      impact: "Reaches 10,000+ traders",
      model: "Bundled with Kejetia Market infrastructure",
    },
    {
      tier: 1,
      name: "Diaspora Healthcare Registry",
      description:
        "Comprehensive database matching diaspora healthcare expertise with specific facility needs and regional gaps across Ghana.",
      capital: "$75-150K",
      score: 40,
      impact: "15,000+ professionals mapped",
      model: "Skills matching platform with CME incentives",
    },
    {
      tier: 1,
      name: "Community Clinic Network",
      description:
        "Primary care clinics in underserved areas with maternal and child health focus, staffed by retained Ghanaian care providers.",
      capital: "$3-8M",
      score: 39,
      impact: "25,000+ patients annually",
      model: "Community-based primary care delivery model",
    },
    {
      tier: 1,
      name: "Healthcare Worker Retention",
      description:
        "Competitive compensation and professional development pathways for 200 healthcare workers to reduce brain drain pressure.",
      capital: "$2-4M",
      score: 39,
      impact: "200 workers retained yearly",
      model: "Retention incentives and career pathways",
    },
    {
      tier: 1,
      name: "CME Education Platform",
      description:
        "Virtual continuing medical education with diaspora faculty delivering clinical updates, case conferences, and skills training.",
      capital: "$300-600K",
      score: 39,
      impact: "1,000+ clinicians upskilled",
      model: "CME credit recognition via professional councils",
    },
    {
      tier: 1,
      name: "Community Health Insurance",
      description:
        "Bundled health coverage through market associations, complementing NHIS with affordable products for informal sector workers.",
      capital: "$500K-1.5M",
      score: 38,
      impact: "Reduces catastrophic spend",
      model: "Market association distribution channels",
    },
    {
      tier: 2,
      name: "CHPS Strengthening Program",
      description:
        "Equipment upgrades, provider training, and telemedicine linkage for 50 Community-based Health Planning and Services zones.",
      capital: "$1-2M",
      score: 37,
      impact: "50 CHPS compounds upgraded",
      model: "Partnership with Ghana Health Service teams",
    },
    {
      tier: 2,
      name: "HealthTech Investment Fund",
      description:
        "Strategic investments in Ghana-based health technology startups spanning telemedicine, diagnostics, and supply chain tools.",
      capital: "$1-3M",
      score: 37,
      impact: "3-5 startups accelerated",
      model: "Leverages 40+ existing health tech startups",
    },
  ],

  competitors: [
    { name: "NHIA", focus: "National health insurance scheme and coverage framework", gap: "Informal sector coverage", year: "2003", funding: "Gov't", priority: "High", marketShare: "68%", coverage: "National", employees: "1,000+", strengths: [{ name: "Population Coverage", rating: 4 }, { name: "Policy Framework", rating: 5 }, { name: "Provider Network", rating: 4 }], gaps: ["Informal sector product gap", "Revenue model innovation", "Market-level distribution"], bridgeOpportunity: "Complementary insurance products for informal sector via market associations", partnershipType: "Collaborate", synergyAreas: ["Insurance product design", "Market distribution channels", "Reimbursement framework"] },
    { name: "Zipline", focus: "Medical drone delivery for blood and essential supplies", gap: "Care delivery endpoints", year: "2016", funding: "$500M+", priority: "High", marketShare: "N/A", coverage: "National", employees: "500+", strengths: [{ name: "Drone Logistics", rating: 5 }, { name: "Supply Delivery", rating: 5 }, { name: "Rural Reach", rating: 4 }], gaps: ["Care delivery endpoints", "Workforce programming", "Facility network gaps"], bridgeOpportunity: "Last-mile supply delivery integrated with community clinic network", partnershipType: "Collaborate", synergyAreas: ["Supply delivery to clinics", "Cold chain logistics", "Emergency supply access"] },
    { name: "mPharma", focus: "Pharmacy network and drug access platform across Africa", gap: "Primary care delivery", year: "2013", funding: "$95M+", priority: "High", marketShare: "N/A", coverage: "Urban", employees: "500+", strengths: [{ name: "Pharmacy Network", rating: 5 }, { name: "Supply Chain", rating: 5 }, { name: "Funding Scale", rating: 5 }], gaps: ["Primary care layer", "Workforce retention", "Rural clinic reach"], bridgeOpportunity: "Pharmacy supply partnership for community clinic operations", partnershipType: "Collaborate", synergyAreas: ["Drug supply for clinics", "Pharmacy network integration", "Rural distribution"] },
    { name: "Bisa Health", focus: "Telemedicine consultations and digital health access", gap: "Diaspora specialist network", year: "2016", funding: "$2M+", priority: "Medium", marketShare: "N/A", coverage: "Urban", employees: "50+", strengths: [{ name: "Telemedicine Platform", rating: 4 }, { name: "User Base", rating: 3 }, { name: "Mobile Access", rating: 4 }], gaps: ["Diaspora specialist pool", "Scaling infrastructure", "Cross-border licensing"], bridgeOpportunity: "Platform integration for 15,000+ diaspora specialist consultations", partnershipType: "Collaborate", synergyAreas: ["Telemedicine platform integration", "Diaspora specialist pool", "Cross-border licensing"] },
    { name: "CHAG", focus: "Christian Health Association operating 35% of health facilities", gap: "Digital integration", year: "1967", funding: "Gov't", priority: "High", marketShare: "35%", coverage: "National", employees: "5,000+", strengths: [{ name: "Facility Network", rating: 5 }, { name: "Rural Presence", rating: 5 }, { name: "Community Trust", rating: 5 }], gaps: ["Digital health tools", "Telemedicine capacity", "Supply chain tech"], bridgeOpportunity: "Digital health and telemedicine integration for existing facility network", partnershipType: "Collaborate", synergyAreas: ["Facility network access", "Rural telemedicine deployment", "Digital health tools"] },
    { name: "Ghana Health Service", focus: "National health service delivery and CHPS management", gap: "Private sector efficiency", year: "1996", funding: "Gov't", priority: "High", marketShare: "N/A", coverage: "National", employees: "10,000+", strengths: [{ name: "National Authority", rating: 5 }, { name: "CHPS Network", rating: 4 }, { name: "Policy Alignment", rating: 5 }], gaps: ["Private sector speed", "Innovation pipeline", "Diaspora engagement"], bridgeOpportunity: "Private delivery partner for CHPS strengthening and Care24 targets", partnershipType: "Collaborate", synergyAreas: ["CHPS strengthening", "Care24 delivery", "Workforce retention programs"] },
  ],

  crossSector: [
    { sectorId: 2, name: "Financial Inclusion", connection: "Health insurance, medical emergency fund, health savings products", multiplier: "3.2x", synergies: ["Health insurance distributed through market associations", "Emergency medical fund for traders facing health crises", "Health savings integrated with mobile financial services"], bridgeVentures: ["Community Health Insurance", "Medical Emergency Fund"], impact: "Health financing products distributed through financial inclusion channels reach the informal sector \u2014 the 68% of Ghanaians whom traditional insurance models miss entirely." },
    { sectorId: 1, name: "Infrastructure", connection: "Market-integrated health services, clinic construction, WASH", multiplier: "2.8x", synergies: ["First aid and screening within Kejetia Market", "Clinic construction via infrastructure management", "WASH integration for 45% of underserved facilities"], bridgeVentures: ["Market Health Services", "Community Clinic Network"], impact: "Physical infrastructure provides the delivery points that health services require \u2014 every market, every CHPS compound, every water kiosk becomes a wellbeing touchpoint." },
    { sectorId: 5, name: "Education & Skills", connection: "Medical training, workforce development, health literacy", multiplier: "2.5x", synergies: ["Nursing school partnerships with diaspora faculty", "Continuing medical education retaining providers", "Community health literacy for market populations"], bridgeVentures: ["CME Platform", "Nursing School Partnerships"], impact: "Workforce development addresses the root cause of Ghana's health crisis \u2014 retaining the 56% of trained physicians abroad through education pathways that build lasting careers." },
    { sectorId: 11, name: "Manufacturing", connection: "Pharmaceutical production, medical device assembly, PPE", multiplier: "2.1x", synergies: ["Essential medicine production reducing import dependency", "Medical equipment assembly and maintenance locally", "PPE production capacity for healthcare workers"], bridgeVentures: ["Pharmaceutical Supply Chain", "Medical Equipment Hub"], impact: "Local pharmaceutical manufacturing reduces Ghana's 70% import dependency for essential medicines \u2014 creating health security, industrial jobs, and supply chain resilience." },
    { sectorId: 12, name: "Transportation", connection: "Medical supply distribution, patient referral transport", multiplier: "1.8x", synergies: ["Temperature-controlled pharmaceutical distribution", "Emergency and scheduled patient referral transport", "Vaccine cold chain logistics for immunisation"], bridgeVentures: ["Med Logistics Network", "Patient Transport System"], impact: "Reliable transport ensures medicines reach rural CHPS compounds and patients reach referral hospitals \u2014 the last mile that determines whether care is accessible or theoretical." },
  ],

  valueChain: [
    { stage: "Policy & Regulation", stat: "6.9%", statDetail: "of health budget toward 15% Abuja target", description: "Health policy governance through MOH and 12 regulatory bodies — the entry point for government alignment and partnership strategy.", insight: "12 regulatory bodies = 12 partnership entry points. Policy advisory aligned with GH\u20B59B+ NHIS budget allocation creates systemic leverage.", ventures: ["NHIS Accreditation Pathway", "Policy Research Advisory", "Health Budget Analytics"], icon: "file-text" },
    { stage: "Workforce & Training", stat: "56%", statDetail: "of trained physicians abroad — reconnection potential", description: "Healthcare professional pipeline from training through retention — where diaspora engagement and competitive pathways address the workforce gap.", insight: "56% of trained physicians abroad = 15,000+ reconnection opportunities. CME and retention funding are the bridge between brain drain and brain gain.", ventures: ["Diaspora Telemedicine", "Workforce Retention Fund", "CME Platform"], icon: "users" },
    { stage: "Service Delivery", stat: "5,000+", statDetail: "CHPS compounds positioned for strengthening", description: "Facility-based and community-based care delivery — where equipment upgrades, telemedicine integration, and clinic expansion meet population health needs.", insight: "95% of facilities are addressable for quality upgrades. Community clinics in underserved areas with CHPS strengthening create the delivery backbone.", ventures: ["Community Clinic Network", "CHPS Strengthening", "Market Health Services"], icon: "hospital" },
    { stage: "Health Financing", stat: "68%", statDetail: "NHIS enrollment — coverage foundation to build on", description: "Insurance and payment mechanisms — where NHIS expansion, informal sector products, and mobile payment rails make healthcare affordable and accessible.", insight: "The informal sector is the largest untapped insurance market. Community health insurance via market associations complements NHIS for the underserved.", ventures: ["Community Health Insurance", "Medical Emergency Fund", "Market Insurance Products"], icon: "shield" },
    { stage: "Patient Outcomes", stat: "11%", statDetail: "of households facing catastrophic health spending", description: "The ultimate measure of health system performance — where integrated community-based care reduces geographic barriers and financial burden on families.", insight: "Every delivery point reduces barriers. Financial protection for the 11% most vulnerable households and maternal care as flagship impact area.", ventures: ["Healthcare Registry", "HealthTech Portfolio", "Quality Advisory"], icon: "heart" },
  ],

  policies: [
    { policy: "National Health Insurance Scheme", body: "National Health Insurance Authority", allocation: "GH\u20B59,000M", category: "funding", alignment: "Primary health financing mechanism covering 68% of the population with provider accreditation framework.", bridgeRole: "Provider accreditation pathway for BRIDGE community clinics and telemedicine platform licensing under NHIS reimbursement.", bridgeVentures: ["Community Clinic Network", "Community Health Insurance", "Telemedicine Platform"], pillars: ["Universal Health Coverage", "Provider Accreditation"] },
    { policy: "MahamaCares Medical Trust", body: "Ministry of Health", allocation: "GH\u20B52,300M", category: "infrastructure", alignment: "PPP diagnostic center network expanding access to laboratory and imaging services across all regions.", bridgeRole: "Direct PPP partnership for diagnostic service integration within BRIDGE clinic network and referral pathways.", bridgeVentures: ["Diagnostic Lab Network", "Community Clinic Network"], pillars: ["PPP Framework", "Diagnostic Access"] },
    { policy: "Care24 Extended Service Hours", body: "24-Hour Economy Authority", allocation: "Multi-year commitment", category: "partnerships", alignment: "Extending healthcare delivery hours as part of the 24-Hour Economy programme for continuous care access.", bridgeRole: "Community clinic model designed for extended hours aligns directly with Care24 service delivery vision.", bridgeVentures: ["Community Clinic Network", "Market Health Services Hub"], pillars: ["24-Hour Economy", "Extended Care"] },
    { policy: "CHPS Expansion & Revitalization", body: "Ghana Health Service", allocation: "GH\u20B5450M", category: "infrastructure", alignment: "Strengthening 5,000+ CHPS compounds with equipment, staffing, and service delivery improvements.", bridgeRole: "CHPS Strengthening Program provides equipment upgrades, telemedicine links, and training for 50 compounds.", bridgeVentures: ["CHPS Strengthening Program", "Telemedicine Platform"], pillars: ["Primary Health Care", "Rural Access"] },
    { policy: "Health Workforce Compensation", body: "Ghana Health Service", allocation: "GH\u20B56,400M", category: "funding", alignment: "71% of health budget allocated to salaries — constraining service improvement and retention funding.", bridgeRole: "Retention Fund complements government compensation with professional development, CME, and diaspora pathways.", bridgeVentures: ["Healthcare Worker Retention Fund", "CME Education Platform"], pillars: ["Workforce Retention", "Professional Development"] },
    { policy: "Health Training Institutions", body: "Ministry of Education / MOH", allocation: "GH\u20B5250M", category: "partnerships", alignment: "Medical and nursing school operations and expansion to address critical workforce gaps nationwide.", bridgeRole: "Diaspora faculty partnerships for clinical training, medical curriculum development, and nursing school support.", bridgeVentures: ["Nursing School Partnership", "CME Education Platform"], pillars: ["Medical Education", "Diaspora Faculty"] },
    { policy: "Tax Incentives for Health Investment", body: "Ghana Revenue Authority / GIPC", allocation: "Various exemptions", category: "tax", alignment: "Import duty exemptions on medical equipment and tax holidays for health sector investments under GIPC.", bridgeRole: "Equipment import optimization for clinic network and diagnostic labs leveraging GIPC health sector incentives.", bridgeVentures: ["Diagnostic Lab Network", "Medical Equipment Hub"], pillars: ["GIPC Incentives", "Import Exemptions"] },
    { policy: "Digital Health Advancement", body: "Ministry of Health", allocation: "GH\u20B5110M", category: "infrastructure", alignment: "Digital health infrastructure including telemedicine frameworks and health information systems nationwide.", bridgeRole: "Regulatory alignment for telemedicine licensing, EMR integration, and digital health innovation standards.", bridgeVentures: ["Telemedicine Platform", "Healthcare Registry"], pillars: ["eHealth Strategy", "Telemedicine Framework"] },
  ],
};
