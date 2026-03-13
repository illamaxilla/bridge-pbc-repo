import type { SectorData } from "./types";

export const educationSector: SectorData = {
  id: 5,
  slug: "education",
  name: "Education & Skills",
  shortName: "Education",
  category: "The Talent Engine",
  categoryColor: "#1B4D3E",

  heroTitleBold: "Education & Skills",
  heroTitleRest: "Development",
  problemHeadline: "The Foundation Beneath Every Career, Enterprise, and Innovation",

  capitalRange: "$16.5-33.5M",
  ventures: 19,
  jobsImpact: "10M+ learners",
  gdpContribution: "4% of GDP",

  problemSubheadline:
    "Ghana's education sector holds immense potential — from connecting 8.5M primary learners to quality pathways, to unlocking the 80-90% of workforce skills already developed through informal apprenticeships, to aligning 500K+ university students with real economic opportunity. These are pathways where targeted investment and innovation can transform credentials into capabilities at national scale.",

  keyStats: [
    { value: "50%+", label: "Youth Talent Pool (15-24)", detail: "Largest untapped workforce" },
    { value: "95%+", label: "TVET Growth Potential", detail: "Under 5% currently enrolled" },
    { value: "22.3%", label: "Graduates to Connect", detail: "Tertiary-educated, seeking work" },
    { value: "80-90%", label: "Informal Skills to Formalize", detail: "Ready for recognition" },
  ],

  painPoints: [
    {
      title: "Skills-Employment Alignment",
      description:
        "500K+ graduates annually represent a massive opportunity to align what universities teach with what Ghana's employers actually need.",
      quantification: "500K+ graduates/year to connect with employment",
    },
    {
      title: "TVET Elevation & Investment",
      description:
        "TVET is the fastest pathway to employment — elevating its status and investment unlocks a growth engine from less than 5% enrollment.",
      quantification: "95%+ secondary cohort addressable for TVET",
    },
    {
      title: "Quality & Outcomes Uplift",
      description:
        "86% primary enrollment creates extraordinary reach — targeted quality investments can transform learning outcomes for millions of students.",
      quantification: "70-80% of learners ready for quality uplift",
    },
    {
      title: "Digital Skills Acceleration",
      description:
        "Ghana's digital economy ambitions create a vast addressable market for skills training — from basic literacy to advanced coding at every level.",
      quantification: "78% of students addressable for digital skills",
    },
  ],

  solutions: [
    { tier: 1, name: "Skills Bootcamp Network", description: "Intensive short-term training (2-8 weeks) aligned with employment opportunities through BRIDGE portfolio companies.", capital: "$2-4M", score: 44, impact: "10,000+ trained, 80%+ employed", model: "Employer-linked training guarantee" },
    { tier: 1, name: "TVET Partnership Program", description: "Co-investment in 3-5 TVET institutions for equipment upgrades, curriculum design, and direct employment pipeline.", capital: "$3-5M", score: 41, impact: "2x capacity, 5,000+ new students", model: "Equipment + curriculum + placement" },
    { tier: 1, name: "Service-Linked Scholarships", description: "500 scholarships in critical fields like healthcare, engineering, and tech with 2-5 year Ghana service commitment.", capital: "$3-6M", score: 40, impact: "70%+ fulfillment, talent retained", model: "Philippines nursing model adaptation" },
    { tier: 1, name: "Diaspora Mentorship Network", description: "Structured virtual mentorship connecting 1,000 diaspora professionals to emerging Ghanaian talent across sectors.", capital: "$400-700K", score: 40, impact: "1,000+ mentees gain career access", model: "Monthly video + annual in-person" },
    { tier: 1, name: "Apprenticeship Recognition", description: "Assessment and certification for informal apprenticeship completers, recognizing 80-90% of workforce skill base.", capital: "$1-2M", score: 39, impact: "50,000+ workers formally certified", model: "Trade association partnerships" },
    { tier: 1, name: "Digital Skills Program", description: "Digital literacy and coding bootcamps targeting youth, Kejetia market vendors, and BRIDGE portfolio beneficiaries.", capital: "$1.5-2.5M", score: 39, impact: "5,000+ youth digitally job-ready", model: "One Million Coders alignment" },
    { tier: 2, name: "Equipment Modernization Fund", description: "Targeted equipment investment for partner TVET institutions directly aligned with BRIDGE portfolio industry needs.", capital: "$1.5-2.5M", score: 38, impact: "5 institutions fully modernized", model: "Industry-donated + purchased equipment" },
    { tier: 2, name: "EdTech Investment Fund", description: "Seed and growth investments in 4-6 EdTech ventures serving Ghanaian learners with offline-first, TVET solutions.", capital: "$2-4M", score: 37, impact: "100,000+ learners on platforms", model: "Meaningful Gigs, Chalkboard partnership" },
    { tier: 2, name: "Diaspora Teaching Fellowship", description: "Funded teaching residencies bringing diaspora educators to partner TVET institutions and universities in Ghana.", capital: "$500K-1M", score: 37, impact: "50+ fellows, industry skills shared", model: "Carnegie Fellowship adaptation" },
  ],

  competitors: [
    { name: "Mastercard Foundation", focus: "University scholarships for disadvantaged youth", gap: "TVET collaboration opportunity", year: "2006", funding: "$500M+", priority: "High", marketShare: "N/A", coverage: "National", employees: "N/A", strengths: [{ name: "Scale & Funding", rating: 5 }, { name: "University Access", rating: 5 }, { name: "Comprehensive Support", rating: 4 }], gaps: ["University pipeline ready for TVET extension", "Employment linkage opportunity", "TVET co-investment potential"], bridgeOpportunity: "TVET complementary partnership—scholarship recipients into BRIDGE employment pipeline", partnershipType: "Collaborate", synergyAreas: ["Scholarship-to-employment pipeline", "TVET co-investment", "Skills training integration"] },
    { name: "GIZ TVET Programs", focus: "Technical assistance to TVET institutions", gap: "Scale expansion opportunity", year: "2010", funding: "Gov't", priority: "High", marketShare: "N/A", coverage: "Select regions", employees: "N/A", strengths: [{ name: "German Expertise", rating: 5 }, { name: "Industry Linkage", rating: 4 }, { name: "Quality Standards", rating: 4 }], gaps: ["Long-term sustainability model", "Geographic expansion potential", "Employment pipeline integration"], bridgeOpportunity: "Co-implement dual training model with BRIDGE employment pipeline", partnershipType: "Collaborate", synergyAreas: ["Dual training model", "Equipment standards", "Curriculum development"] },
    { name: "CAMFED", focus: "Girls' education and empowerment", gap: "Skills training extension ready", year: "1993", funding: "$100M+", priority: "Medium", marketShare: "N/A", coverage: "Select regions", employees: "N/A", strengths: [{ name: "Gender Focus", rating: 5 }, { name: "Holistic Support", rating: 4 }, { name: "Community Network", rating: 4 }], gaps: ["Post-secondary pathway opportunity", "Skills training co-delivery", "Employment transition potential"], bridgeOpportunity: "Skills transition pathway for CAMFED graduates into BRIDGE programs", partnershipType: "Collaborate", synergyAreas: ["Graduate transition pathways", "Skills training co-delivery", "Women in enterprise"] },
    { name: "Ghana Skills Dev. Fund", focus: "$200M World Bank skills initiative", gap: "Private sector delivery partnership", year: "2023", funding: "$200M", priority: "High", marketShare: "N/A", coverage: "National", employees: "N/A", strengths: [{ name: "Government Backing", rating: 5 }, { name: "Substantial Capital", rating: 5 }, { name: "National Mandate", rating: 4 }], gaps: ["Delivery acceleration opportunity", "Private sector agility complement", "Co-implementation potential"], bridgeOpportunity: "Co-funding partner for TVET expansion with BRIDGE delivery efficiency", partnershipType: "Collaborate", synergyAreas: ["TVET co-funding", "Private sector delivery", "Skills assessment"] },
    { name: "Chalkboard Education", focus: "SMS-based learning platform", gap: "Employment linkage opportunity", year: "2015", funding: "$2M+", priority: "Medium", marketShare: "N/A", coverage: "National", employees: "N/A", strengths: [{ name: "Offline Reach", rating: 5 }, { name: "Cost Efficiency", rating: 4 }, { name: "Feature Phone Access", rating: 5 }], gaps: ["Employment pipeline integration", "Skills training content expansion", "Practical component addition"], bridgeOpportunity: "Content delivery partner for BRIDGE training programs", partnershipType: "Collaborate", synergyAreas: ["Content delivery", "Training program distribution", "Learner engagement"] },
    { name: "CTVET / TVET Service", focus: "Government TVET regulation and delivery", gap: "Resource and equipment partnership", year: "2020", funding: "Gov't", priority: "High", marketShare: "N/A", coverage: "National", employees: "N/A", strengths: [{ name: "Regulatory Authority", rating: 5 }, { name: "NTVETQF Framework", rating: 4 }, { name: "National Reach", rating: 3 }], gaps: ["Resource augmentation opportunity", "Equipment modernization partnership", "Industry linkage co-development"], bridgeOpportunity: "Equipment and curriculum partner—BRIDGE resources with CTVET accreditation", partnershipType: "Collaborate", synergyAreas: ["Equipment provision", "Curriculum co-design", "Accreditation alignment"] },
  ],

  crossSector: [
    { sectorId: 4, name: "Technology & Innovation", connection: "Digital skills, coding bootcamps, EdTech", multiplier: "3.2x", synergies: ["Digital skills bootcamp graduates into tech sector", "EdTech platform development", "Coding talent pipeline for startups"], bridgeVentures: ["Digital Skills Program", "EdTech Investment Fund"], impact: "Digital skills training creates the workforce that powers Ghana's tech ecosystem" },
    { sectorId: 3, name: "Health Systems", connection: "Nursing scholarships, health tech training", multiplier: "3.8x", synergies: ["Service-linked nursing scholarships", "Health technician certification", "Community health worker training"], bridgeVentures: ["Service-Linked Scholarships", "Skills Bootcamp Network"], impact: "Targeted health education fills critical workforce gaps and retains talent in Ghana" },
    { sectorId: 1, name: "Infrastructure", connection: "Kejetia vendor training, construction trades", multiplier: "2.5x", synergies: ["Construction trades TVET programs", "Kejetia market vendor upskilling", "Infrastructure project workforce supply"], bridgeVentures: ["TVET Partnership Program", "Apprenticeship Recognition"], impact: "Skilled trades training directly supplies the workforce for Ghana's infrastructure buildout" },
    { sectorId: 6, name: "Agriculture", connection: "Processing skills, equipment operation", multiplier: "2.8x", synergies: ["Agri-processing technical training", "Equipment operation certification", "Farm management skills programs"], bridgeVentures: ["Skills Bootcamp Network", "TVET Partnership Program"], impact: "Agricultural skills training transforms subsistence farming into productive enterprise" },
    { sectorId: 2, name: "Financial Inclusion", connection: "Financial literacy bootcamps, fintech skills", multiplier: "2.2x", synergies: ["Financial literacy for market vendors", "Fintech development skills", "Mobile money training programs"], bridgeVentures: ["Digital Skills Program", "Skills Bootcamp Network"], impact: "Financial literacy and fintech skills enable economic participation across all sectors" },
  ],

  valueChain: [
    { stage: "Early Education", stat: "86%", statDetail: "primary enrollment rate", description: "Foundation years where 8.5M children enter the system — the largest skills investment pipeline in Ghana.", insight: "Quality uplift for 70-80% of learners ready — classroom capacity expansion and career guidance systems to build.", ventures: ["Service-Linked Scholarships", "EdTech Investment Fund"], icon: "book" },
    { stage: "Secondary / SHS", stat: "57%", statDetail: "secondary enrollment rate", description: "The branching point where 1.2M students can be connected to career-aligned pathways.", insight: "Curriculum-industry alignment and TVET elevation opportunity — skills-first culture building at the secondary level.", ventures: ["TVET Partnership Program", "Equipment Modernization Fund"], icon: "school" },
    { stage: "TVET & Skills", stat: "95%+", statDetail: "expansion potential", description: "The highest-impact pathway — 50K current students with massive expansion potential.", insight: "Equipment modernization and industry linkage ready — perception shift opportunity to elevate TVET status nationally.", ventures: ["TVET Partnership Program", "Skills Bootcamp Network", "Apprenticeship Recognition"], icon: "tools" },
    { stage: "Higher Education", stat: "22.3%", statDetail: "graduates to connect", description: "Where 500K+ students represent a direct pipeline for industry-aligned capability building.", insight: "Skills-market alignment and practical training integration ready — diaspora expertise to mobilize for knowledge transfer.", ventures: ["Service-Linked Scholarships", "Diaspora Mentorship Network", "Diaspora Teaching Fellowship"], icon: "graduation" },
    { stage: "Employment", stat: "50%+", statDetail: "youth talent pool", description: "Where 12M+ workers meet the economy — the ultimate measure of education's value.", insight: "Placement acceleration and employer co-investment ready — skills verification and credential-to-capability shift needed.", ventures: ["Skills Bootcamp Network", "Digital Skills Program"], icon: "briefcase" },
  ],

  policies: [
    { policy: "Ghana Jobs & Skills Project", body: "Ministry of Education / World Bank", allocation: "$200M (World Bank)", category: "funding", alignment: "Co-funding for TVET expansion and skills training delivery", bridgeRole: "Implementation partner delivering private sector skills training and TVET capacity building at scale.", bridgeVentures: ["TVET Partnership Program", "Skills Bootcamp Network", "Equipment Modernization Fund"], pillars: ["TVET Expansion", "Skills Training", "Employment Linkage"] },
    { policy: "Strategic Plan for TVET Transformation", body: "Ministry of Education / CTVET", allocation: "2023-2027 Framework", category: "infrastructure", alignment: "Direct alignment with TVET quality and capacity goals", bridgeRole: "Equipment and curriculum partner modernizing TVET institutions with industry-aligned training programs.", bridgeVentures: ["TVET Partnership Program", "Equipment Modernization Fund", "Apprenticeship Recognition"], pillars: ["Quality Standards", "Industry Linkage", "Capacity Building"] },
    { policy: "Free SHS Policy", body: "Ministry of Education", allocation: "GH₵3.2B annual", category: "funding", alignment: "TVET pathway development for SHS graduates", bridgeRole: "Post-SHS pathway builder connecting graduates to skills training and employment opportunities.", bridgeVentures: ["Skills Bootcamp Network", "TVET Partnership Program", "Digital Skills Program"], pillars: ["Universal Access", "TVET Pathways", "Graduate Employment"] },
    { policy: "National Digital Literacy Program", body: "Ministry of Communications and Digitalisation", allocation: "10M target by 2030", category: "partnerships", alignment: "Digital skills bootcamp integration and scaling", bridgeRole: "Digital skills delivery partner providing coding bootcamps and digital literacy training at national scale.", bridgeVentures: ["Digital Skills Program", "EdTech Investment Fund"], pillars: ["Digital Literacy", "Coding Skills", "One Million Coders"] },
  ],
};
