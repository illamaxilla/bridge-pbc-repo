import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { BRIDGEAuthModal } from "@/components/AuthModal";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/useIsMobile";
import { colors, layout } from "@/lib/theme";
import {
  ArrowLeft, Download, Lock, ArrowUpRight, CheckCircle2, ChevronRight,
  FileText, BarChart3, TrendingUp, Shield, Zap, Users,
} from "lucide-react";

// ────────────────────────────────────────────────────────────
// Sector report data
// ────────────────────────────────────────────────────────────
export interface SectorReportData {
  slug: string;
  name: string;
  tag: string;
  score: number;
  ventures: number;
  cap: string;
  free: boolean;
  headline: string;
  teaser: string;
  summary: string[];
  keyFindings: string[];
  gipcUrl: string | null;
  gipcTitle: string;
  gipcPages: number;
  bridgeAnalysisFeatures: string[];
}

export const sectorReports: SectorReportData[] = [
  {
    slug: "infrastructure",
    name: "Infrastructure & Basic Services",
    tag: "Foundation",
    score: 87,
    ventures: 15,
    cap: "$8–15M",
    free: true,
    headline: "Ghana's infrastructure gap is a $40B+ opportunity hiding in plain sight.",
    teaser: "Rural connectivity, water systems, and last-mile logistics represent the highest-leverage entry points for patient capital.",
    summary: [
      "Ghana's infrastructure deficit represents one of the largest untapped investment opportunities in West Africa. With over 55% of the population lacking safely managed water, 32% of energy lost in transmission, and market facilities serving thousands of traders operating below modern standards, the sector presents compelling entry points across multiple sub-verticals.",
      "The government's $40B+ infrastructure modernization agenda, combined with World Bank and AfDB co-financing commitments, creates a rare alignment of public policy, international capital, and private sector opportunity. Patient capital deployed in water systems, energy distribution, and market facility upgrades can generate both attractive risk-adjusted returns and measurable development impact.",
      "BRIDGE analysis identifies 15 high-conviction venture opportunities across the infrastructure landscape, with optimal capital deployment in the $8–15M range per venture — sufficient to achieve operational scale while maintaining portfolio diversification.",
    ],
    keyFindings: [
      "55.6% of population lacks safely managed water — addressable market exceeds $2B",
      "32% energy transmission losses create opportunity for distributed grid solutions",
      "95% of WASH sector funded by donors — government seeking private sector partners",
      "Market facility modernization can unlock GH₵1.7B in economic value annually",
      "15 identified ventures with impact scores averaging 87/100",
    ],
    gipcUrl: null,
    gipcTitle: "Infrastructure Sector Profile",
    gipcPages: 24,
    bridgeAnalysisFeatures: [
      "Detailed venture-by-venture financial models for all 15 opportunities",
      "Risk-adjusted return projections with scenario analysis",
      "Regulatory landscape mapping and compliance requirements",
      "Competitive positioning analysis for each sub-sector",
      "Capital deployment timeline and milestone-based allocation strategy",
      "Direct introductions to verified in-country partners",
    ],
  },
  {
    slug: "financial",
    name: "Financial Inclusion & Economic Security",
    tag: "Foundation",
    score: 91,
    ventures: 18,
    cap: "$10–20M",
    free: false,
    headline: "70% of Ghanaians remain outside formal financial systems — but mobile money is changing the equation.",
    teaser: "Embedded finance, agent banking, and SME credit platforms sit at the intersection of high need and proven demand.",
    summary: [
      "Ghana's financial inclusion landscape is at an inflection point. With mobile money penetration accelerating and Bank of Ghana's regulatory sandbox enabling fintech innovation, the conditions for a financial inclusion breakthrough are converging.",
      "The BRIDGE analysis identifies 18 venture opportunities across embedded finance, agent banking, micro-insurance, and SME lending — sectors where proven demand meets regulatory tailwinds. With an impact score of 91/100, financial inclusion ranks as the highest-opportunity sector in our framework.",
      "Capital requirements of $10–20M per venture position this sector for institutional investors seeking both financial returns and measurable social impact at scale.",
    ],
    keyFindings: [
      "70% of population outside formal financial systems — largest addressable market",
      "Mobile money accounts exceed bank accounts 3:1, creating digital rails for fintech",
      "Bank of Ghana regulatory sandbox enables rapid fintech deployment",
      "SME financing gap exceeds $5B — only 15% of SMEs have access to formal credit",
      "18 identified ventures with the highest impact score in the BRIDGE framework (91/100)",
    ],
    gipcUrl: "https://www.gipc.gov.gh/wp-content/uploads/2022/12/Ghanas-Financial-Sector-Report.pdf",
    gipcTitle: "Ghana's Financial Sector Report",
    gipcPages: 20,
    bridgeAnalysisFeatures: [
      "Complete venture mapping of 18 fintech and financial inclusion opportunities",
      "Mobile money ecosystem analysis and partnership pathways",
      "Regulatory compliance roadmap including Bank of Ghana sandbox process",
      "Unit economics benchmarking against comparable African fintech markets",
      "Risk matrix covering currency, regulatory, and technology risks",
      "Curated introductions to licensed financial services partners",
    ],
  },
  {
    slug: "health",
    name: "Health Systems & Wellbeing",
    tag: "Human Capital",
    score: 83,
    ventures: 15,
    cap: "$8–16M",
    free: false,
    headline: "A health workforce gap and supply chain failure are costing Ghana lives and economic output daily.",
    teaser: "Diagnostics, primary care, and community health worker platforms represent the most scalable entry points.",
    summary: [
      "Ghana's health system faces interconnected challenges: a critical workforce shortage, pharmaceutical supply chain inefficiencies, and limited diagnostic infrastructure outside Accra. These structural gaps create both urgency and opportunity for private sector solutions.",
      "The BRIDGE analysis maps 15 ventures across diagnostics, telemedicine, community health platforms, and pharmaceutical supply chain — sectors where technology-enabled solutions can achieve rapid scale. Ghana's National Health Insurance Scheme provides a payment rail that de-risks many health tech business models.",
      "With capital requirements of $8–16M, health ventures offer a compelling combination of impact and commercial sustainability, supported by strong government alignment and development partner co-investment.",
    ],
    keyFindings: [
      "Doctor-to-patient ratio of 1:6,355 — WHO recommends 1:1,000",
      "Pharmaceutical supply chain losses exceed 30% due to cold chain gaps",
      "NHIS coverage provides built-in revenue channel for health tech solutions",
      "Diagnostic access drops 80% outside Greater Accra region",
      "15 identified ventures across diagnostics, telemedicine, and supply chain",
    ],
    gipcUrl: null,
    gipcTitle: "Health Sector Profile",
    gipcPages: 26,
    bridgeAnalysisFeatures: [
      "Health workforce gap analysis with staffing projections to 2030",
      "NHIS integration pathways and reimbursement rate analysis",
      "Pharmaceutical supply chain mapping and cold chain opportunity sizing",
      "Regulatory pathway for medical devices and health tech platforms",
      "Impact measurement framework aligned with SDG 3 indicators",
      "Network of verified health sector operators and distribution partners",
    ],
  },
  {
    slug: "technology",
    name: "Technology & Innovation",
    tag: "Growth Engine",
    score: 89,
    ventures: 15,
    cap: "$8–15M",
    free: false,
    headline: "Ghana's tech ecosystem is scaling — but infrastructure gaps and talent drain threaten the momentum.",
    teaser: "Vertical SaaS, govtech platforms, and developer ecosystem infrastructure are the three highest-return bets.",
    summary: [
      "Accra is emerging as West Africa's primary tech hub, with a growing developer community, increasing venture capital attention, and government digitization initiatives creating demand for local solutions. The sector's 89/100 impact score reflects both momentum and structural opportunity.",
      "BRIDGE identifies 15 high-conviction opportunities concentrated in vertical SaaS (agriculture, logistics, healthcare), govtech platforms, and developer infrastructure. These sub-sectors benefit from strong local demand, limited competition, and alignment with the government's Digital Ghana Agenda.",
      "Capital requirements of $8–15M per venture are well-suited to early-growth stage companies ready to scale beyond Accra into secondary cities and regional markets.",
    ],
    keyFindings: [
      "Ghana's tech startup ecosystem grew 45% in funding volume year-over-year",
      "Government's Digital Ghana Agenda creating $200M+ in addressable govtech demand",
      "Developer community exceeds 25,000 but only 30% formally employed in tech",
      "Vertical SaaS penetration below 5% across agriculture, logistics, and healthcare",
      "15 ventures identified with optimal $8–15M capital deployment range",
    ],
    gipcUrl: null,
    gipcTitle: "ICT Sector Profile",
    gipcPages: 22,
    bridgeAnalysisFeatures: [
      "Complete tech ecosystem map with key players, accelerators, and funding landscape",
      "Vertical SaaS market sizing for agriculture, logistics, and health sub-sectors",
      "Govtech procurement analysis and government partnership pathways",
      "Talent acquisition strategy and compensation benchmarking",
      "Exit pathway analysis — M&A landscape and IPO readiness indicators",
      "Direct introductions to ecosystem builders and technical co-founders",
    ],
  },
  {
    slug: "education",
    name: "Education & Skills",
    tag: "Human Capital",
    score: 85,
    ventures: 15,
    cap: "$16.5–33.5M",
    free: false,
    headline: "Ghana produces graduates at scale — but a catastrophic mismatch with the labour market persists.",
    teaser: "TVET transformation, employability platforms, and corporate training are the defining opportunity set.",
    summary: [
      "Ghana's education sector presents a paradox: high enrollment rates and growing graduate output exist alongside severe skills mismatches and employer dissatisfaction. The gap between what education delivers and what the economy needs is widening.",
      "BRIDGE analysis reveals 15 ventures focused on TVET modernization, employability platforms, and corporate upskilling — areas where demand is quantifiable and willingness to pay is established. The sector's higher capital range ($16.5–33.5M) reflects the infrastructure-heavy nature of many education ventures.",
      "Government's alignment through the Free SHS policy and TVET reform agenda provides both funding tailwinds and regulatory support for private sector education innovators.",
    ],
    keyFindings: [
      "Youth unemployment at 19.7% despite 500,000+ annual graduates",
      "Only 3% of secondary students enrolled in technical/vocational education",
      "Corporate training market growing at 25%+ annually as companies build in-house capacity",
      "EdTech penetration below 8% — significant digital upside in blended models",
      "15 ventures requiring higher capital ($16.5–33.5M) due to infrastructure intensity",
    ],
    gipcUrl: "https://www.gipc.gov.gh/wp-content/uploads/2022/12/Ghanas-Education-Sector-Report.pdf",
    gipcTitle: "Ghana's Education Sector Report",
    gipcPages: 22,
    bridgeAnalysisFeatures: [
      "TVET sub-sector mapping with employer demand analysis",
      "EdTech market sizing and competitive landscape",
      "Government policy alignment matrix and funding opportunity analysis",
      "Revenue model benchmarking across blended, corporate, and B2G models",
      "Impact measurement framework tied to employment outcomes",
      "Introductions to education ministry stakeholders and corporate training buyers",
    ],
  },
  {
    slug: "agriculture",
    name: "Agriculture & Value Chains",
    tag: "Economic Engine",
    score: 90,
    ventures: 18,
    cap: "$12–22M",
    free: false,
    headline: "$1.9 billion lost annually to post-harvest failures — before a single crop reaches market.",
    teaser: "Cold chain, aggregation platforms, and processing infrastructure represent the fastest path from farm to value.",
    summary: [
      "Agriculture remains Ghana's largest employer (45% of workforce) but contributes only 20% of GDP — a productivity gap that represents one of Africa's most compelling value chain investment opportunities. Post-harvest losses of $1.9B annually underscore the scale of inefficiency.",
      "BRIDGE identifies 18 ventures across cold chain infrastructure, farmer aggregation platforms, and agro-processing — the three intervention points where capital can most effectively convert agricultural output into economic value. The sector's 90/100 impact score reflects both addressable market size and policy alignment.",
      "With Planting for Food and Jobs 2.0, the government's renewed commitment to agricultural transformation provides regulatory tailwinds and co-investment opportunities for patient capital in the $12–22M range.",
    ],
    keyFindings: [
      "$1.9B lost annually to post-harvest waste — cold chain is the critical bottleneck",
      "Only 5% of agricultural output is processed before export — value capture opportunity",
      "3.4M smallholder farmers lack access to aggregation and market platforms",
      "Planting for Food & Jobs 2.0 committing $500M+ in government agricultural investment",
      "18 ventures identified — highest number in any BRIDGE sector",
    ],
    gipcUrl: "https://www.gipc.gov.gh/wp-content/uploads/2023/03/Ghanas-Agriculture-Sector-Report-1.pdf",
    gipcTitle: "Ghana's Agriculture Sector Report",
    gipcPages: 24,
    bridgeAnalysisFeatures: [
      "Complete value chain mapping from farm gate to export terminal",
      "Cold chain infrastructure gap analysis with investment sizing",
      "Smallholder farmer aggregation models and unit economics",
      "Agro-processing opportunity pipeline with off-take agreements",
      "Climate risk assessment and mitigation strategies",
      "Introductions to anchor farmers, cooperatives, and processing partners",
    ],
  },
  {
    slug: "sports",
    name: "Sports, Entertainment & Creative",
    tag: "Growth Engine",
    score: 78,
    ventures: 14,
    cap: "$10–20.5M",
    free: false,
    headline: "Afrobeats is a global phenomenon. Ghana's creative economy infrastructure has not caught up.",
    teaser: "Content production, talent pipelines, and IP monetisation platforms are where early movers build durable advantages.",
    summary: [
      "Ghana's creative economy is experiencing a global moment — Afrobeats, Ghanaian film, and cultural exports are gaining international traction. However, the infrastructure to capture and monetize this cultural capital domestically remains woefully underdeveloped.",
      "BRIDGE analysis maps 14 ventures across content production, talent management, IP monetization, and sports infrastructure. These sub-sectors benefit from rapidly growing digital distribution, diaspora demand, and the government's Creative Arts Industry Bill.",
      "Capital requirements of $10–20.5M per venture reflect the mix of content creation (lower capex) and facilities development (higher capex) that characterizes this emerging sector.",
    ],
    keyFindings: [
      "Afrobeats streaming revenue from Ghana grew 120% in two years",
      "Creative industry contributes only 1.8% of GDP vs. 5%+ in comparable economies",
      "Sports infrastructure utilization under 30% — revenue optimization opportunity",
      "Diaspora engagement channels creating new monetization pathways",
      "14 ventures across content, talent, IP, and sports infrastructure",
    ],
    gipcUrl: "https://www.gipc.gov.gh/wp-content/uploads/2023/03/Ghanas-Recreation-and-Tourism-Sector-Report.pdf",
    gipcTitle: "Ghana's Recreation & Tourism Sector Report",
    gipcPages: 22,
    bridgeAnalysisFeatures: [
      "Creative economy value chain mapping and revenue model analysis",
      "IP monetization framework for content creators and rights holders",
      "Sports facility investment models with utilization benchmarking",
      "Digital distribution strategy and platform partnership opportunities",
      "Diaspora market sizing and engagement strategy",
      "Introductions to media companies, talent agencies, and facility operators",
    ],
  },
  {
    slug: "housing",
    name: "Housing & Real Estate",
    tag: "Foundation",
    score: 82,
    ventures: 11,
    cap: "$15–25M",
    free: false,
    headline: "A 2 million unit housing deficit with mortgage penetration under 2% — the numbers tell a compelling story.",
    teaser: "Affordable housing models, construction finance, and diaspora housing products represent multi-decade demand.",
    summary: [
      "Ghana faces a 2 million unit housing deficit that grows by approximately 100,000 units annually. With mortgage penetration below 2% and formal housing production covering less than 35% of annual demand, the structural opportunity is measured in decades, not cycles.",
      "BRIDGE identifies 11 ventures across affordable housing construction, mortgage innovation, construction technology, and diaspora-focused housing products. Each addresses a specific market failure in the housing value chain.",
      "Capital requirements of $15–25M per venture reflect the inherently capital-intensive nature of real estate, but innovative construction technologies and financing models are reducing the break-even timeline significantly.",
    ],
    keyFindings: [
      "2M+ unit housing deficit growing by 100,000 units annually",
      "Mortgage penetration under 2% — financial innovation is the unlock",
      "Affordable housing demand concentrated in $15,000–$40,000 price range",
      "Diaspora remittances exceeding $4B — housing is the #1 use case",
      "11 ventures focused on construction, financing, and technology innovation",
    ],
    gipcUrl: "https://www.gipc.gov.gh/wp-content/uploads/2023/04/Ghanas-Real-Estate-Sector-Report.pdf",
    gipcTitle: "Ghana's Real Estate Sector Report",
    gipcPages: 20,
    bridgeAnalysisFeatures: [
      "Affordable housing demand-supply gap analysis by region",
      "Construction cost modeling with alternative building technology comparisons",
      "Mortgage product design for underserved segments",
      "Diaspora housing product framework and distribution strategy",
      "Land acquisition risk assessment and title verification process",
      "Introductions to licensed developers, mortgage providers, and land agencies",
    ],
  },
  {
    slug: "tourism",
    name: "Tourism & Hospitality",
    tag: "Growth Engine",
    score: 76,
    ventures: 13,
    cap: "$10–18M",
    free: false,
    headline: "Year of Return created a cultural moment. The infrastructure to sustain it has not been built yet.",
    teaser: "Heritage tourism, hospitality training, and destination development are where the next chapter gets written.",
    summary: [
      "The 'Year of Return' in 2019 demonstrated Ghana's extraordinary cultural tourism potential, attracting over 500,000 visitors and generating global media attention. However, the hospitality infrastructure, service quality, and destination management systems needed to convert this moment into sustained growth remain underdeveloped.",
      "BRIDGE maps 13 ventures across heritage tourism, hospitality workforce development, boutique accommodation, and destination management. These opportunities are amplified by the government's 'Beyond the Return' initiative and growing diaspora engagement.",
      "Capital deployment of $10–18M per venture is positioned to capture first-mover advantage in a sector where demand has been validated but supply-side investment has lagged.",
    ],
    keyFindings: [
      "Year of Return attracted 500,000+ visitors — tourism revenue grew 45%",
      "Hotel room supply in Accra grew only 8% despite 25%+ demand growth",
      "Heritage tourism sites operating at <20% capacity due to infrastructure gaps",
      "Hospitality workforce has critical skills shortages across all service levels",
      "13 ventures spanning accommodation, experiences, and workforce development",
    ],
    gipcUrl: "https://www.gipc.gov.gh/wp-content/uploads/2023/03/Ghanas-Recreation-and-Tourism-Sector-Report.pdf",
    gipcTitle: "Ghana's Recreation & Tourism Sector Report",
    gipcPages: 22,
    bridgeAnalysisFeatures: [
      "Tourism demand forecasting model with seasonal analysis",
      "Heritage site investment feasibility and revenue projections",
      "Hospitality workforce training program design and economics",
      "Boutique accommodation market positioning and competitive analysis",
      "Partnership framework with Ghana Tourism Authority",
      "Introductions to hospitality operators, tour companies, and heritage site managers",
    ],
  },
  {
    slug: "energy",
    name: "Energy & Renewable Resources",
    tag: "Foundation",
    score: 88,
    ventures: 14,
    cap: "$12–22M",
    free: false,
    headline: "Power outages cost Ghana up to $924M annually. Solar irradiance potential is among Africa's highest.",
    teaser: "Distributed solar, clean cooking, and mini-grid development are the most investable near-term entry points.",
    summary: [
      "Ghana's energy sector presents a dual opportunity: addressing the $924M annual cost of power unreliability while capitalizing on one of Africa's highest solar irradiance levels. The country's grid infrastructure struggles with 32% transmission losses, while off-grid communities face energy poverty.",
      "BRIDGE analysis identifies 14 ventures across distributed solar, clean cooking technology, mini-grid development, and energy storage. These sub-sectors benefit from declining technology costs, strong regulatory support through the Renewable Energy Act, and growing climate finance availability.",
      "Capital requirements of $12–22M per venture reflect the infrastructure-intensive nature of energy projects, offset by long-duration revenue contracts and blended finance structures.",
    ],
    keyFindings: [
      "$924M annual cost of power unreliability — reliability premium creates willingness to pay",
      "Solar irradiance averaging 4.5–6.0 kWh/m²/day — among Africa's highest",
      "Clean cooking penetration under 25% — addressable market of 6M+ households",
      "Renewable Energy Act provides feed-in tariffs and net metering frameworks",
      "14 ventures across solar, cooking, mini-grid, and storage sub-sectors",
    ],
    gipcUrl: null,
    gipcTitle: "Energy Sector Profile",
    gipcPages: 28,
    bridgeAnalysisFeatures: [
      "Solar resource mapping and site-specific irradiance analysis",
      "Mini-grid financial modeling with tariff optimization",
      "Clean cooking technology comparison and distribution strategy",
      "Regulatory compliance roadmap including RE Act and Energy Commission licensing",
      "Blended finance structuring with climate fund compatibility",
      "Introductions to energy regulators, grid operators, and off-grid distributors",
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing & Light Industry",
    tag: "Economic Engine",
    score: 81,
    ventures: 14,
    cap: "$15–30M",
    free: false,
    headline: "Ghana imports goods it has every input to produce. Import substitution is a policy priority with capital behind it.",
    teaser: "Agro-processing, packaging, and light manufacturing for domestic consumption are the pragmatic first moves.",
    summary: [
      "Ghana imports over $12B in goods annually, a significant portion of which could be produced domestically with targeted manufacturing investment. The government's One District One Factory (1D1F) initiative and AfCFTA headquarters location create unique policy and trade advantages for manufacturing investors.",
      "BRIDGE identifies 14 ventures concentrated in agro-processing, packaging, and consumer goods — sub-sectors where domestic demand is proven, raw materials are locally available, and import substitution provides a natural competitive moat.",
      "Higher capital requirements ($15–30M) reflect the fixed asset intensity of manufacturing, but 1D1F incentives (including tax holidays and duty exemptions) significantly improve project economics.",
    ],
    keyFindings: [
      "$12B+ annual imports — substantial import substitution opportunity",
      "AfCFTA headquarters in Accra — gateway to 1.3B consumer market",
      "1D1F providing tax holidays, duty exemptions, and subsidized land",
      "Agro-processing operating at under 40% capacity utilization",
      "14 ventures across agro-processing, packaging, and consumer goods",
    ],
    gipcUrl: "https://www.gipc.gov.gh/wp-content/uploads/2023/03/Ghanas-Manufacturing-Sector-Report.pdf",
    gipcTitle: "Ghana's Manufacturing Sector Report",
    gipcPages: 24,
    bridgeAnalysisFeatures: [
      "Import substitution opportunity sizing by product category",
      "1D1F incentive structure and application process guide",
      "AfCFTA market access strategy and tariff analysis",
      "Factory site selection analysis with infrastructure scoring",
      "Supply chain mapping for key raw materials",
      "Introductions to industrial zone operators, raw material suppliers, and logistics providers",
    ],
  },
  {
    slug: "transport",
    name: "Transportation & Logistics",
    tag: "Foundation",
    score: 79,
    ventures: 14,
    cap: "$10–22M",
    free: false,
    headline: "Every sector's growth multiplier — logistics determines who can actually participate in the economy.",
    teaser: "Last-mile delivery, freight technology, and intermodal connectivity are the connective tissue of Ghana's next decade.",
    summary: [
      "Transportation and logistics is the enabling infrastructure for every other sector in Ghana's economy. Inefficient last-mile delivery adds 30–40% to product costs in secondary cities, while poor intermodal connectivity limits agricultural and manufacturing export competitiveness.",
      "BRIDGE maps 14 ventures across last-mile delivery platforms, freight technology, fleet management, and intermodal connectivity. These sub-sectors benefit from rapid e-commerce growth, agricultural export expansion, and the government's National Transport Policy.",
      "Capital requirements of $10–22M per venture are positioned to address the middle-market gap — too large for angel investors but below the threshold for major infrastructure funds — where risk-adjusted returns are most attractive.",
    ],
    keyFindings: [
      "Last-mile delivery costs add 30–40% to product prices outside Accra",
      "Freight technology adoption under 10% — digitization is the key unlock",
      "E-commerce growth creating sustained demand for delivery infrastructure",
      "Port of Tema expansion creating new intermodal connectivity opportunities",
      "14 ventures across last-mile, freight tech, fleet, and intermodal segments",
    ],
    gipcUrl: null,
    gipcTitle: "Transport Sector Profile",
    gipcPages: 26,
    bridgeAnalysisFeatures: [
      "Last-mile delivery cost analysis by region and product category",
      "Freight technology platform comparison and adoption roadmap",
      "Fleet management economics and financing structures",
      "Port-to-hinterland connectivity analysis and investment opportunities",
      "Regulatory landscape for transport operators and fleet licenses",
      "Introductions to logistics operators, port authorities, and fleet financiers",
    ],
  },
];

// Helper to look up report by slug
export function getReportBySlug(slug: string): SectorReportData | undefined {
  return sectorReports.find((r) => r.slug === slug);
}

// ────────────────────────────────────────────────────────────
// Page Component
// ────────────────────────────────────────────────────────────
export default function SectorReportPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const mobile = useIsMobile();
  const { user } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  const report = slug ? getReportBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!report) {
    return (
      <Layout>
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: colors.dark, fontFamily: "DM Sans, sans-serif" }}>Report Not Found</h1>
          <p style={{ color: "#666", fontFamily: "Inter, sans-serif" }}>The sector report you're looking for doesn't exist.</p>
          <button onClick={() => navigate("/resources")} style={{ padding: "12px 28px", borderRadius: "50px", border: "none", backgroundColor: colors.primary, color: colors.white, fontSize: "14px", fontWeight: "600", fontFamily: "Inter, sans-serif", cursor: "pointer" }}>
            Back to Resources
          </button>
        </div>
      </Layout>
    );
  }

  const isLocked = !report.free && !user;

  return (
    <Layout>
      <div style={{ backgroundColor: colors.background, minHeight: "100vh" }}>
        {/* ── Breadcrumb ── */}
        <div style={{ maxWidth: layout.maxWidth, margin: "0 auto", padding: mobile ? "20px 20px 0" : "28px 40px 0" }}>
          <button
            onClick={() => navigate("/resources")}
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: "none", border: "none", cursor: "pointer",
              color: colors.primary, fontSize: "13px", fontWeight: "600",
              fontFamily: "Inter, sans-serif", padding: 0,
            }}
          >
            <ArrowLeft size={14} />
            Back to Resources
          </button>
        </div>

        {/* ── Hero Section ── */}
        <div style={{ maxWidth: layout.maxWidth, margin: "0 auto", padding: mobile ? "24px 20px 0" : "32px 40px 0" }}>
          <div style={{
            background: colors.white,
            borderRadius: "16px",
            border: `1px solid ${colors.line}`,
            padding: mobile ? "28px 20px" : "40px 48px",
            marginBottom: "24px",
          }}>
            {/* Tag + Score */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
              <span style={{
                display: "inline-block", padding: "4px 12px", borderRadius: "50px",
                backgroundColor: `${colors.primary}10`, color: colors.primary,
                fontSize: "11px", fontWeight: "700", fontFamily: "Inter, sans-serif",
                textTransform: "uppercase", letterSpacing: "0.5px",
              }}>
                {report.tag}
              </span>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                padding: "4px 12px", borderRadius: "50px",
                backgroundColor: report.score >= 88 ? "#E8F5E0" : report.score >= 82 ? `${colors.primary}10` : colors.background,
                fontSize: "11px", fontWeight: "700", fontFamily: "Inter, sans-serif",
                color: report.score >= 88 ? "#2d6a1e" : colors.primary,
              }}>
                <BarChart3 size={11} />
                Impact Score: {report.score}/100
              </span>
              {report.free && (
                <span style={{
                  padding: "4px 12px", borderRadius: "50px",
                  backgroundColor: "#E8F5E0", color: "#2d6a1e",
                  fontSize: "11px", fontWeight: "700", fontFamily: "Inter, sans-serif",
                }}>
                  FREE ACCESS
                </span>
              )}
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: mobile ? "26px" : "34px", fontWeight: "800",
              color: colors.dark, fontFamily: "DM Sans, sans-serif",
              lineHeight: 1.2, margin: "0 0 12px",
            }}>
              {report.name}
            </h1>

            {/* Headline */}
            <p style={{
              fontSize: mobile ? "16px" : "18px", fontWeight: "600",
              color: colors.primary, fontFamily: "DM Sans, sans-serif",
              lineHeight: 1.5, margin: "0 0 8px", maxWidth: "720px",
            }}>
              {report.headline}
            </p>

            {/* Quick stats */}
            <div style={{
              display: "flex", gap: mobile ? "16px" : "32px", marginTop: "20px",
              flexWrap: "wrap",
            }}>
              {[
                { label: "Ventures Identified", value: report.ventures },
                { label: "Capital Range", value: report.cap },
                { label: "Impact Score", value: `${report.score}/100` },
              ].map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontSize: mobile ? "20px" : "24px", fontWeight: "800", color: colors.primary, fontFamily: "DM Sans, sans-serif" }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "12px", color: "#888", fontFamily: "Inter, sans-serif", fontWeight: "500" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Main Content Grid ── */}
        <div style={{
          maxWidth: layout.maxWidth, margin: "0 auto",
          padding: mobile ? "0 20px 40px" : "0 40px 60px",
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "1fr 380px",
          gap: "24px",
          alignItems: "start",
        }}>
          {/* Left Column: Summary + Key Findings */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            {/* Summary */}
            <div style={{
              background: colors.white, borderRadius: "16px",
              border: `1px solid ${colors.line}`, padding: mobile ? "24px 20px" : "36px 40px",
            }}>
              <h2 style={{
                fontSize: "20px", fontWeight: "700", color: colors.dark,
                fontFamily: "DM Sans, sans-serif", margin: "0 0 20px",
                display: "flex", alignItems: "center", gap: "10px",
              }}>
                <FileText size={18} color={colors.primary} />
                Sector Overview
              </h2>
              {report.summary.map((p, i) => (
                <p key={i} style={{
                  fontSize: "14.5px", lineHeight: 1.75, color: "#444",
                  fontFamily: "Inter, sans-serif", margin: i < report.summary.length - 1 ? "0 0 16px" : 0,
                }}>
                  {p}
                </p>
              ))}
            </div>

            {/* Key Findings */}
            <div style={{
              background: colors.white, borderRadius: "16px",
              border: `1px solid ${colors.line}`, padding: mobile ? "24px 20px" : "36px 40px",
            }}>
              <h2 style={{
                fontSize: "20px", fontWeight: "700", color: colors.dark,
                fontFamily: "DM Sans, sans-serif", margin: "0 0 20px",
                display: "flex", alignItems: "center", gap: "10px",
              }}>
                <TrendingUp size={18} color={colors.primary} />
                Key Findings
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {report.keyFindings.map((finding, i) => (
                  <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <CheckCircle2 size={16} color={colors.accent} style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontSize: "14px", lineHeight: 1.6, color: "#444", fontFamily: "Inter, sans-serif" }}>
                      {finding}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* GIPC Report Download */}
            <div style={{
              background: colors.white, borderRadius: "16px",
              border: `1px solid ${colors.line}`, padding: mobile ? "24px 20px" : "36px 40px",
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px",
              }}>
                <span style={{
                  padding: "3px 10px", borderRadius: "50px",
                  backgroundColor: "#E8F5E0", color: "#2d6a1e",
                  fontSize: "10px", fontWeight: "700", fontFamily: "Inter, sans-serif",
                  textTransform: "uppercase", letterSpacing: "0.5px",
                }}>
                  Free Resource
                </span>
                <span style={{
                  padding: "3px 10px", borderRadius: "50px",
                  backgroundColor: colors.background, color: "#888",
                  fontSize: "10px", fontWeight: "700", fontFamily: "Inter, sans-serif",
                }}>
                  Source: GIPC
                </span>
              </div>

              <h2 style={{
                fontSize: "18px", fontWeight: "700", color: colors.dark,
                fontFamily: "DM Sans, sans-serif", margin: "12px 0 8px",
              }}>
                {report.gipcTitle}
              </h2>

              <p style={{
                fontSize: "13.5px", lineHeight: 1.6, color: "#666",
                fontFamily: "Inter, sans-serif", margin: "0 0 8px",
              }}>
                Official GIPC investment climate profile covering the regulatory environment, FDI statistics, sector macro-indicators, investment incentives, and government priorities.
              </p>

              <div style={{
                display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px",
                fontSize: "12px", color: "#888", fontFamily: "Inter, sans-serif", fontWeight: "600",
              }}>
                <span>{report.gipcPages} pages</span>
                <span>·</span>
                <span>2025</span>
                <span>·</span>
                <span>Published by GIPC</span>
              </div>

              {report.gipcUrl ? (
                <a
                  href={report.gipcUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "13px 28px", borderRadius: "50px", border: "none",
                    backgroundColor: colors.accent, color: colors.primary,
                    fontSize: "14px", fontWeight: "700", fontFamily: "Inter, sans-serif",
                    cursor: "pointer", textDecoration: "none",
                    transition: "all 0.2s",
                  }}
                >
                  <Download size={15} />
                  Download Full Report
                  <ArrowUpRight size={13} />
                </a>
              ) : (
                <a
                  href="https://gipc.gov.gh"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "13px 28px", borderRadius: "50px", border: "none",
                    backgroundColor: colors.accent, color: colors.primary,
                    fontSize: "14px", fontWeight: "700", fontFamily: "Inter, sans-serif",
                    cursor: "pointer", textDecoration: "none",
                  }}
                >
                  <Download size={15} />
                  View on GIPC Website
                  <ArrowUpRight size={13} />
                </a>
              )}

              <p style={{
                fontSize: "11px", color: "#aaa", fontFamily: "Inter, sans-serif",
                margin: "14px 0 0", lineHeight: 1.5,
              }}>
                Published by the Ghana Investment Promotion Centre (GIPC). Shared here as a public resource — BRIDGE makes no claim to authorship.
              </p>
            </div>
          </div>

          {/* Right Column: Upsell Card (sticky) */}
          <div style={{ position: mobile ? "relative" : "sticky", top: mobile ? "auto" : "100px" }}>
            {/* BRIDGE Intelligence Upsell */}
            <div style={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, #163f32 100%)`,
              borderRadius: "16px",
              padding: mobile ? "28px 20px" : "36px 32px",
              color: colors.white,
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px",
              }}>
                <Shield size={16} color={colors.accent} />
                <span style={{
                  fontSize: "10px", fontWeight: "700", fontFamily: "Inter, sans-serif",
                  textTransform: "uppercase", letterSpacing: "1px", color: colors.accent,
                }}>
                  Premium Intelligence
                </span>
              </div>

              <h3 style={{
                fontSize: mobile ? "18px" : "20px", fontWeight: "800",
                fontFamily: "DM Sans, sans-serif", lineHeight: 1.3,
                margin: "0 0 8px", color: colors.white,
              }}>
                BRIDGE Intelligence Analysis
              </h3>

              <p style={{
                fontSize: "14px", lineHeight: 1.6,
                fontFamily: "Inter, sans-serif", margin: "0 0 24px",
                color: "rgba(255,255,255,0.75)",
              }}>
                Go beyond the overview. Get the detailed, venture-level analysis that serious investors and operators need to deploy capital with confidence.
              </p>

              {/* Feature list */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
                {report.bridgeAnalysisFeatures.map((feature, i) => (
                  <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                    <CheckCircle2 size={14} color={colors.accent} style={{ flexShrink: 0, marginTop: "2px" }} />
                    <span style={{
                      fontSize: "13px", lineHeight: 1.5,
                      fontFamily: "Inter, sans-serif",
                      color: "rgba(255,255,255,0.85)",
                    }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              {user ? (
                <button
                  onClick={() => navigate("/intelligence/reports")}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    width: "100%", padding: "15px 24px", borderRadius: "50px",
                    border: "none", backgroundColor: colors.accent, color: colors.primary,
                    fontSize: "14px", fontWeight: "700", fontFamily: "Inter, sans-serif",
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                >
                  <Zap size={15} />
                  Upgrade to Full Intelligence
                  <ChevronRight size={14} />
                </button>
              ) : (
                <button
                  onClick={() => setShowAuth(true)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    width: "100%", padding: "15px 24px", borderRadius: "50px",
                    border: "none", backgroundColor: colors.accent, color: colors.primary,
                    fontSize: "14px", fontWeight: "700", fontFamily: "Inter, sans-serif",
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                >
                  <Lock size={15} />
                  Sign In to Unlock
                  <ChevronRight size={14} />
                </button>
              )}

              <p style={{
                fontSize: "11px", color: "rgba(255,255,255,0.5)",
                fontFamily: "Inter, sans-serif", textAlign: "center" as const,
                margin: "14px 0 0", lineHeight: 1.5,
              }}>
                Paid members get full access to all 12 sector analyses, venture-level data, and direct introductions.
              </p>
            </div>

            {/* Quick nav to other sectors */}
            <div style={{
              background: colors.white, borderRadius: "16px",
              border: `1px solid ${colors.line}`,
              padding: "24px", marginTop: "16px",
            }}>
              <h4 style={{
                fontSize: "13px", fontWeight: "700", color: "#888",
                fontFamily: "Inter, sans-serif", textTransform: "uppercase",
                letterSpacing: "0.5px", margin: "0 0 14px",
              }}>
                Explore Other Sectors
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                {sectorReports
                  .filter((r) => r.slug !== report.slug)
                  .slice(0, 5)
                  .map((r) => (
                    <Link
                      key={r.slug}
                      to={`/reports/${r.slug}`}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "10px 12px", borderRadius: "8px",
                        textDecoration: "none", color: colors.dark,
                        fontSize: "13px", fontWeight: "500", fontFamily: "Inter, sans-serif",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.background; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    >
                      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {r.name}
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                        <span style={{
                          fontSize: "11px", fontWeight: "700",
                          color: r.score >= 88 ? "#2d6a1e" : colors.primary,
                        }}>
                          {r.score}
                        </span>
                        <ChevronRight size={12} color="#ccc" />
                      </div>
                    </Link>
                  ))}
              </div>
              <Link
                to="/resources"
                style={{
                  display: "block", textAlign: "center" as const, marginTop: "12px",
                  fontSize: "12px", fontWeight: "600", color: colors.primary,
                  fontFamily: "Inter, sans-serif", textDecoration: "underline",
                }}
              >
                View All 12 Sectors →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <BRIDGEAuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        defaultTab="request"
        onSignInSuccess={() => setShowAuth(false)}
      />
    </Layout>
  );
}
