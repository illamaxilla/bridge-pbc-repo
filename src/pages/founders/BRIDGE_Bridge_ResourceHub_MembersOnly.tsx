import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function useIsMobile() {
  const [mob, setMob] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);
  useEffect(() => {
    const fn = () => setMob(window.innerWidth <= 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return mob;
}

const C = {
  primary: '#1B4D3E',
  accent: '#B8D935',
  bg: '#F3F5F0',
  text: '#111111',
  subtle: '#555555',
  muted: '#888888',
  line: '#D8D8D4',
  white: '#FFFFFF',
  cover: '#0A1409',
  deep: '#0F1A12',
  card: '#F7F7F4',
};

const fonts = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; }

  .feat-card { transition: box-shadow 0.25s, transform 0.2s; }
  .feat-card:hover { box-shadow: 0 12px 48px rgba(0,0,0,0.13); transform: translateY(-3px); }
  .read-btn { transition: background 0.18s, letter-spacing 0.18s; }
  .read-btn:hover { background: #cce83a !important; letter-spacing: 0.07em !important; }
  .tab-btn { transition: all 0.18s; }
  .tab-btn:hover { color: #1B4D3E !important; }
  .road-row { transition: background 0.15s; }
  .road-row:hover { background: #F0F0EC !important; }
  .nav-link { transition: color 0.15s; }
  .nav-link:hover { color: #B8D935 !important; cursor: pointer; }
  .nav-apply { transition: background 0.15s, letter-spacing 0.15s; }
  .nav-apply:hover { background: #cce83a !important; letter-spacing: 0.06em !important; }
  .footer-links a { transition: color 0.15s; }
  .footer-links a:hover { color: rgba(184,217,53,0.85) !important; }
  .eng-card { transition: border-color 0.2s, background 0.2s; }
  .eng-card:hover { border-color: rgba(184,217,53,0.4) !important; background: rgba(184,217,53,0.06) !important; }
  .back-btn:hover { color: rgba(255,255,255,0.7) !important; }
  .acc-row { transition: background 0.15s; }
  .acc-row:hover { background: rgba(0,0,0,0.03) !important; }

  /* Feature card content clamping — uniform card height */
  .feat-title-clamp { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .feat-subtitle-clamp { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .feat-body-clamp { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }

  /* Tab filter */
  .tab-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .tab-scroll::-webkit-scrollbar { display: none; }

  /* Horizontal swipe strip */
  .h-scroll { display: flex; gap: 14px; overflow-x: auto; -webkit-overflow-scrolling: touch; padding-bottom: 4px; scroll-snap-type: x mandatory; }
  .h-scroll::-webkit-scrollbar { display: none; }
  .h-scroll-card { scroll-snap-align: start; flex-shrink: 0; }

  /* Section headers */
  .sec-header { display: flex; align-items: baseline; gap: 20; margin-bottom: 28px; }
  .sec-mark { display: flex; align-items: center; gap: 14px; }
  .sec-count { display: flex; align-items: center; gap: 6px; margin-left: 8px; }

  /* Mobile bottom action bar */
  .mob-bar { display: none; }

  /* Accordion */
  .acc-chevron { transition: transform 0.22s ease; display: inline-block; }
  .acc-chevron.open { transform: rotate(180deg); }

  @media (max-width: 768px) {
    .sec-header { flex-direction: column !important; gap: 10px !important; margin-bottom: 20px !important; }
    .sec-count { margin-left: 0 !important; }

    /* Nav */
    .nav-inner { padding: 0 16px !important; }
    .nav-cta { display: none !important; }

    /* Library hero */
    .hero-inner { padding: 32px 18px 36px !important; }
    .hero-eyebrow { font-size: 9px !important; letter-spacing: 0.13em !important; }
    .hero-h1 { font-size: 32px !important; line-height: 1.08 !important; }
    .hero-sub { font-size: 14px !important; margin-bottom: 32px !important; }
    .stat-row { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 22px 16px !important; }
    .stat-num { font-size: 28px !important; }

    /* Body */
    .body-inner { padding: 24px 18px 88px !important; }

    /* Feature cards */
    .feat-inner { flex-direction: column !important; min-height: unset !important; }
    .feat-meta {
      width: 100% !important; border-right: none !important;
      border-bottom: 1px solid rgba(255,255,255,0.08) !important;
      padding: 18px 18px 14px !important; flex-direction: row !important;
      align-items: center !important; justify-content: space-between !important;
      flex-wrap: wrap !important; gap: 12px !important;
    }
    .feat-meta-top { margin-bottom: 0 !important; }
    .feat-stats { flex-direction: row !important; gap: 20px !important; }
    .feat-stat-num { font-size: 18px !important; }
    .feat-content { padding: 18px 18px 22px !important; }
    .feat-title { font-size: 19px !important; }
    .feat-subtitle { font-size: 13px !important; }
    .feat-body { font-size: 13px !important; }

    /* Roadmap */
    .road-headers { display: none !important; }
    .road-row-grid { grid-template-columns: 1fr auto !important; padding: 0 14px !important; min-height: 50px !important; gap: 10px !important; }
    .road-type-col { display: none !important; }
    .road-audience-col { display: none !important; }
    .road-quarter-col { text-align: right !important; white-space: nowrap !important; }

    /* CTA box */
    .roadmap-cta { padding: 20px 18px !important; flex-direction: column !important; align-items: flex-start !important; }
    .roadmap-cta-btn { width: 100% !important; justify-content: center !important; }

    /* Footer */
    .footer-inner { padding: 18px 18px !important; flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
    .footer-links { display: none !important; }
    .nav-apply { display: none !important; }

    /* Mobile fixed bottom bar — detail view only */
    .mob-bar {
      display: flex !important; position: fixed; bottom: 0; left: 0; right: 0; z-index: 200;
      background: #0A1409; border-top: 2px solid #B8D935;
      padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
      gap: 10px; align-items: center;
    }
    /* Bottom bar padding offset so content isn't hidden */
    .detail-pad { padding-bottom: 84px !important; }
  }
`;

// ─── DATA ───────────────────────────────────────────────────────────────────

const pubCats = ['All', 'Methodology', 'Portfolio', 'Sector Briefs', 'Reports', 'Policy', 'Special Intelligence'];

const published = [
  {
    cat: "Methodology", tag: "Methodology",
    title: "BRIDGE Impact Score™ Methodology",
    subtitle: "How every venture is evaluated — and why the judgment can be trusted.",
    body: "A complete account of the four-dimensional framework behind BRIDGE's venture evaluation process. Covers scoring weights, sub-components, qualifying thresholds, the five-stage pipeline, and the structural features that make the Score independently auditable.",
    stat1: { num: "100", label: "Point Scale" },
    stat2: { num: "174+", label: "Ventures Scored" },
    route: "/resources/members/impact-score",
    audience: "Investors, Analysts & DFI Partners",
    engagementKey: "analyst",
    urgency: "The Impact Score™ is the gateway to every BRIDGE venture profile. Methodology review is the prerequisite to co-investment access.",
    covers: [
      "Four-dimensional scoring framework — weights and rationale",
      "Sub-component definitions and qualifying thresholds",
      "Five-stage venture evaluation pipeline",
      "Audit trail and independent verification structure",
      "Score distribution across the 174+ venture portfolio",
      "Tier classification: Core, Emerging, Exploratory",
    ],
  },
  {
    cat: "Methodology", tag: "Framework",
    title: "Peace & Prosperity Framework",
    subtitle: "The philosophical and analytical foundation of every investment BRIDGE makes.",
    body: "Defines what BRIDGE means by dignity, security, and thriving — and why GDP growth alone is insufficient. Covers all five dimensions of Peace, the three domains of Prosperity, and the direct connection between all 12 sectors and human flourishing outcomes.",
    stat1: { num: "5", label: "Dimensions of Peace" },
    stat2: { num: "12", label: "Sector Mappings" },
    route: "/resources/members/peace-prosperity",
    audience: "Government Officials, DFIs & Development Partners",
    engagementKey: "government",
    urgency: "The Peace & Prosperity Framework is the analytical lens behind every BRIDGE sector allocation. Alignment with this framework is the basis for all government and DFI partnerships.",
    covers: [
      "Five dimensions of Peace — defined and operationalised",
      "Three domains of Prosperity — economic, social, community",
      "Why GDP alone is an insufficient development metric",
      "Framework mapping across all 12 BRIDGE sectors",
      "Peace & Prosperity measurement methodology",
      "Connection to Sankofa Initiative and 24-Hour Economy goals",
    ],
  },
  {
    cat: "Portfolio", tag: "Portfolio Overview",
    title: "BRIDGE Venture Portfolio Overview",
    subtitle: "174+ identified ventures. 12 sectors. The most comprehensive Ghana opportunity assessment produced.",
    body: "A curated overview of every sector in the BRIDGE portfolio — capital ranges, venture counts, Impact Score benchmarks, and the 36+ cross-sector integration points that produce compounding returns. Full sector analyses and individual venture profiles available to qualified partners.",
    stat1: { num: "$135–259M", label: "Indicative Capital" },
    stat2: { num: "36+", label: "Integration Points" },
    route: "/resources/members/portfolio",
    audience: "Investors, Family Offices & Diaspora Capital",
    engagementKey: "investor",
    urgency: "$135–259M in identified, scored, and sequenced ventures. The question is not whether the opportunities exist — it is which ones you move on first.",
    covers: [
      "Full 12-sector portfolio map with capital ranges per sector",
      "Venture count and BRIDGE Impact Score™ benchmarks by sector",
      "36+ cross-sector integration points and compounding return logic",
      "Portfolio concentration risk and diversification architecture",
      "Indicative IRR targets and deployment timelines",
      "Partner access pathway to full venture profiles",
    ],
  },
  {
    cat: "Sector Briefs", tag: "Research Series · 12 Briefs",
    title: "BRIDGE Sector Intelligence Briefs — All 12 Sectors",
    subtitle: "One authoritative brief per sector. Opportunity landscape, policy environment, venture thesis, and investment parameters.",
    body: "Original research across Infrastructure, Financial Inclusion, Health Systems, Technology & Innovation, Education & Skills, Agriculture & Value Chains, Creative Industries, Housing, Tourism, Energy, Manufacturing, and Transportation. Each brief includes the BRIDGE Impact Score™ ranking, capital range, and cross-sector integration points.",
    stat1: { num: "12", label: "Sector Briefs" },
    stat2: { num: "60K+", label: "Words of Research" },
    route: "/resources/sector-briefs-full",
    audience: "Sector Specialists, Entrepreneurs & Institutional Partners",
    engagementKey: "specialist",
    urgency: "60,000+ words of original Ghana sector research. If your expertise or capital sits in one of these 12 sectors, your entry point is the brief for that sector.",
    covers: [
      "Opportunity landscape and market sizing per sector",
      "BRIDGE Impact Score™ ranking and tier classification",
      "Policy environment and regulatory considerations",
      "Capital range, IRR parameters, and deployment timelines",
      "Cross-sector integration points and compounding effects",
      "Venture pipeline — identified opportunities with scoring rationale",
    ],
  },
  {
    cat: "Reports", tag: "White Paper",
    title: "BRIDGE PBC Foundational White Paper",
    subtitle: "Complete intellectual foundation — methodology, sector framework, and investment thesis.",
    body: "The comprehensive white paper laying out BRIDGE's full theory of change, the Peace & Prosperity measurement framework, the Impact Score™ methodology, and the strategic rationale for a 12-sector Ghana-first investment architecture. Essential reading for government and institutional partners.",
    stat1: { num: "80+", label: "Pages" },
    stat2: { num: "12", label: "Sectors Covered" },
    route: "/resources/members/white-paper",
    audience: "Government Ministers, Institutional Partners & DFIs",
    engagementKey: "government",
    urgency: "This is the document that precedes every formal BRIDGE partnership discussion. Government ministries and institutional partners typically read this before requesting a policy alignment briefing.",
    covers: [
      "Full theory of change — from coordination failure to flourishing outcomes",
      "Peace & Prosperity measurement framework",
      "Impact Score™ methodology and scoring architecture",
      "Strategic rationale for the 12-sector portfolio approach",
      "Blended finance structure and capital deployment model",
      "Government partnership framework and Sankofa Initiative alignment",
    ],
  },
  {
    cat: "Reports", tag: "Annual Review",
    title: "BRIDGE 2025 Sector Intelligence Review",
    subtitle: "Full-year retrospective across all 12 sectors — what moved, what stalled, and what the data says about 2026.",
    body: "A sector-by-sector analysis of Ghana's 2025 investment landscape. Includes revised Impact Score™ rankings, emerging venture opportunities identified in the second half of the year, policy shifts and their downstream effects, and the BRIDGE team's forward outlook for each sector heading into 2026.",
    stat1: { num: "12", label: "Sectors Reviewed" },
    stat2: { num: "2025", label: "Annual Edition" },
    route: "/resources/members/annual-review",
    audience: "Active Members & Engaged Investors",
    engagementKey: "active_member",
    urgency: "The 2025 review sets the baseline for 2026 positioning. The sectors that underperformed in 2025 are often where the 2026 first-mover opportunities are sharpest.",
    covers: [
      "Revised Impact Score™ rankings — what changed and why",
      "Emerging venture opportunities surfaced in H2 2025",
      "Policy shifts and downstream effects per sector",
      "BRIDGE team forward outlook for each sector in 2026",
      "Capital deployment performance vs. prior-year projections",
      "Priority adjustment rationale heading into 2026",
    ],
  },
  {
    cat: "Reports", tag: "Investment Report",
    title: "2026 Budget Alignment — What It Means for Investors",
    subtitle: "Ghana's 2026 National Budget mapped precisely to the BRIDGE 12-sector investment framework.",
    body: "Identifies every allocation in Ghana's 2026 National Budget with direct implications for BRIDGE ventures — sector-by-sector capital flow analysis, policy tailwinds and headwinds, and priority opportunities created by the 24-Hour Economy, Sankofa Initiative, and infrastructure commitments. Includes a ranked table of budget-accelerated ventures.",
    stat1: { num: "GH₵", label: "2026 National Budget" },
    stat2: { num: "12", label: "Sectors Mapped" },
    route: "/resources/members/budget-alignment",
    audience: "Investors, Government Officials & DFI Partners",
    engagementKey: "government",
    urgency: "Ghana's 2026 supplementary budget is under active review. The window for policy-aligned venture positioning is Q1–Q2 2026.",
    covers: [
      "Every budget allocation with direct BRIDGE venture implications",
      "Sector-by-sector capital flow analysis — tailwinds and headwinds",
      "24-Hour Economy implementation priorities and investment entry points",
      "Sankofa Initiative allocation breakdown and deployment timeline",
      "Ranked table of budget-accelerated BRIDGE ventures",
      "Policy risk matrix — where allocations are at risk of reversal",
    ],
  },
  {
    cat: "Reports", tag: "Regulatory Guide",
    title: "GIPC Profile Documents",
    subtitle: "Ghana Investment Promotion Centre regulatory framework and investment facilitation guide.",
    body: "Essential reference for international investors and diaspora partners entering the Ghanaian market. Covers GIPC registration requirements, minimum capital thresholds by sector, investment guarantees, profit repatriation rights, and the specific provisions applicable to BRIDGE-facilitated ventures.",
    stat1: { num: "GIPC", label: "Certified" },
    stat2: { num: "12", label: "Sectors Covered" },
    route: "/resources?tab=gipc",
    audience: "International Investors & Diaspora Partners",
    engagementKey: "new_entrant",
    urgency: "GIPC registration is step one for any international investor entering Ghana. Understanding the minimum capital thresholds and profit repatriation rights before committing capital is non-negotiable.",
    covers: [
      "GIPC registration requirements and process timeline",
      "Minimum capital thresholds by sector and entity type",
      "Investment guarantees and legal protections available",
      "Profit repatriation rights and dividend remittance procedures",
      "Sector-specific provisions applicable to BRIDGE ventures",
      "Regulatory contacts and facilitation services available",
    ],
  },
  {
    cat: "Reports", tag: "Monthly Dashboard",
    title: "BRIDGE Monthly Dashboard — March 2026",
    subtitle: "Monthly intelligence snapshot with sector pulse, policy signals, and venture pipeline movement.",
    body: "The March 2026 edition covers Ghana's Q1 economic performance, sector-level developments across the BRIDGE portfolio, key policy signals from the 2026 Budget implementation, and new venture opportunities entering the evaluation pipeline. Published on the first Monday of each month.",
    stat1: { num: "March", label: "2026 Edition" },
    stat2: { num: "12", label: "Sectors Tracked" },
    route: "/resources/monthly-dashboard",
    audience: "Active Members & Portfolio Partners",
    engagementKey: "active_member",
    urgency: "The April 2026 edition publishes April 7. Members who act on March signals before the next edition are ahead of the pipeline.",
    covers: [
      "Ghana Q1 2026 macroeconomic performance and outlook",
      "Sector-level developments across the 12-sector portfolio",
      "Policy signals from 2026 Budget implementation progress",
      "New ventures entering the BRIDGE evaluation pipeline",
      "Impact Score™ movements — what shifted and why",
      "Deals to watch — opportunities approaching action stage",
    ],
  },
  {
    cat: "Policy", tag: "Living Document",
    title: "Ghana Policy Tracker — 2025–2026",
    subtitle: "Living document covering the 2026 Budget, Sankofa Initiative, and the 12-sector policy landscape.",
    body: "A continuously updated tracking document covering every policy development with implications for BRIDGE ventures — 2026 National Budget breakdown, Sankofa Initiative implementation status, 24-Hour Economy progress, and ministry-level policy signals. Updated when significant policy events occur.",
    stat1: { num: "Live", label: "Updated Monthly" },
    stat2: { num: "12", label: "Sectors Tracked" },
    route: "/resources/members/policy-tracker",
    audience: "Government Officials, Policy Analysts & Development Partners",
    engagementKey: "government",
    urgency: "The Sankofa Initiative implementation calendar has active milestones in Q2 2026. This tracker is updated when significant policy events occur — check the last-updated date at the top of the document.",
    covers: [
      "2026 National Budget breakdown by ministry and sector",
      "Sankofa Initiative implementation status — milestone by milestone",
      "24-Hour Economy progress across pilot districts",
      "Ministry-level policy signals with investment implications",
      "Regulatory changes affecting BRIDGE venture categories",
      "Forward calendar — scheduled policy events and budget sessions",
    ],
  },
  {
    cat: "Special Intelligence", tag: "Sector Deep-Dive · 11 Licences",
    title: "Ghana Cannabis & Industrial Hemp Intelligence Brief",
    subtitle: "The complete BRIDGE analysis of Ghana's newly opened cannabis and hemp licensing regime — all 11 licence categories, value chain mapping, and venture-by-venture scoring.",
    body: "Ghana's Narcotics Control Commission has opened 11 distinct licence categories spanning the full hemp and cannabis value chain — from cultivation and processing to testing, storage, export, and pharmaceutical dispensing. This brief maps every business opportunity across the value chain, scores each against the BRIDGE Impact Score™, identifies first-mover windows, and provides capital requirements, revenue models, and regulatory requirements for each venture type.",
    stat1: { num: "11", label: "Licence Categories" },
    stat2: { num: "$21B+", label: "Global Hemp by 2030" },
    route: "/resources/cannabis-intelligence",
    audience: "Entrepreneurs, Investors & Sector Specialists",
    engagementKey: "entrepreneur",
    urgency: "NCC licences are being issued now. Cultivation, processing, and export licence categories are filling. The first-mover window in most categories is 12–24 months — after which supply architecture is locked in.",
    covers: [
      "All 11 NCC licence categories — requirements and capital parameters",
      "Full value chain map — upstream, mid-chain, enabling, downstream",
      "BRIDGE Impact Score™ for each licence category venture",
      "First-mover window assessment per category",
      "Revenue models, capex ranges, and breakeven timelines",
      "Regulatory compliance requirements and application process",
    ],
  },
  {
    cat: "Reports", tag: "Public Benefit Whitepaper",
    title: "Closing the Intelligence Gap: A Scientific & Ecological Case for Democratic Access to Development Intelligence",
    subtitle: "The evidence-based case for why structured venture assessment is a public good — and how the BRIDGE Impact Score™ Assessor addresses Ghana’s compounding intelligence crisis.",
    body: "An empirically grounded examination of the four structural gaps that define Ghana’s development intelligence crisis: the $5B+ SME financing gap, the information asymmetry between entrepreneurs and capital, the ecological systems dimension of interconnected market failures, and the brain drain paradox. Draws on peer-reviewed research, IFC data, and field evidence to make the scientific and ecological case for the BRIDGE Impact Score™ Assessor as a democratising public benefit intervention.",
    stat1: { num: "$5B+", label: "Annual SME Financing Gap" },
    stat2: { num: "90%+", label: "SMEs of Ghana’s businesses" },
    route: "/resources/members/intelligence-whitepaper",
    audience: "Government Officials, DFIs & Academic Partners",
    engagementKey: "government",
    urgency: "This whitepaper is the formal public benefit justification for the BRIDGE Impact Score™ Assessor. Government and DFI partners conducting due diligence on BRIDGE’s methodology should read this alongside the Impact Score™ Methodology document.",
    covers: [
      "The capital gap — $5B+ annual SME financing deficit, documented and quantified",
      "The intelligence gap — information asymmetry as the load-bearing development constraint",
      "The ecological dimension — systems theory applied to Ghana’s interconnected market failures",
      "The brain drain paradox — talent loss quantified at $415M annually in training investment",
      "Theoretical framework — Akerlof, information economics, and development finance theory",
      "Public benefit commitments — BRIDGE PBC’s formal accountability statements",
    ],
  },
  {
    cat: "Reports", tag: "Platform Whitepaper",
    title: "Ghana’s Talent Is Not the Problem. The Missing Bridge Is.",
    subtitle: "The BRIDGE Connect whitepaper — the case for a verified, free platform connecting Ghana’s skilled workforce to remote work, ethical international employment, and structured advancement.",
    body: "Ghana produces engineers, nurses, developers, creatives, and tradespeople at a rate the world actively demands. In the absence of safe, verified pathways to global opportunity, a predator economy has filled the vacuum — extracting hundreds of millions from citizens through fraudulent recruitment while the legitimate demand for Ghanaian talent goes unmet. This whitepaper makes the case for BRIDGE Connect: a free-to-use, verification-first platform matching skilled Ghanaians to three categories of real, vetted opportunity. Documents the scale of the crisis (273 trafficking cases investigated in 2024, 8,700+ migrant deaths globally), the revenue architecture, the competitive landscape, and the projected impact.",
    stat1: { num: "21%", label: "Youth Unemployment" },
    stat2: { num: "$37.7B", label: "Africa Freelance Market by 2034" },
    route: "/resources/members/connect-whitepaper",
    audience: "Investors, Development Partners & Government Officials",
    engagementKey: "investor",
    urgency: "BRIDGE Connect is in active development. Investors and development partners reviewing this whitepaper may request a platform demo and discussion of partnership and co-investment structures.",
    covers: [
      "The talent-opportunity gap — 21% youth unemployment against documented global demand",
      "The predator economy — trafficking, fraudulent agencies, and the human cost of broken infrastructure",
      "BRIDGE Connect platform — architecture, verification model, and three opportunity pathways",
      "Competitive landscape — how BRIDGE Connect differentiates from existing platforms",
      "Revenue model — B2B employer fees, zero cost to Ghanaian users",
      "Projected impact — beneficiary numbers, income outcomes, and diaspora circulation effects",
    ],
  }
];

const roadmap = [
  // General
  { cat: 'General', tag: 'Annual Report', title: 'The State of Ghana Opportunity Report', audience: 'All Audiences', q: 'Q3 2026' },
  { cat: 'General', tag: 'About', title: 'Who We Are & How We Work', audience: 'All Audiences', q: 'Q2 2026' },
  { cat: 'General', tag: 'Impact', title: 'Annual Impact Report', audience: 'All Audiences', q: 'Q4 2026' },
  // Government
  { cat: 'Government', tag: 'Policy', title: 'Cross-Sector Integration Report', audience: 'Ministries & Agencies', q: 'Q2 2026', priority: true },
  { cat: 'Government', tag: 'Alignment', title: 'BRIDGE–Ghana Policy Alignment Brief', audience: 'Ministries & Agencies', q: 'Q2 2026', priority: true },
  { cat: 'Government', tag: 'Policy Brief', title: 'Diaspora Engagement as Development Policy', audience: 'Ministries & Multilaterals', q: 'Q3 2026' },
  { cat: 'Government', tag: 'Assessment', title: 'District-Level Investment Readiness Assessment', audience: 'District Assemblies', q: 'Q3 2026' },
  // Investments
  { cat: 'Investments', tag: 'Thesis', title: 'BRIDGE Investment Thesis', audience: 'Investors & DFIs', q: 'Q2 2026' },
  { cat: 'Investments', tag: 'Intelligence', title: 'Ghana Market Entry Intelligence Brief', audience: 'Investors & DFIs', q: 'Q2 2026' },
  { cat: 'Investments', tag: 'Fund', title: 'BRIDGE Fund Structure Overview', audience: 'Investors & DFIs', q: 'Q3 2026' },
  { cat: 'Investments', tag: 'Risk', title: 'Risk & Mitigation Framework', audience: 'Investors & DFIs', q: 'Q3 2026' },
  { cat: 'Investments', tag: 'ESG', title: 'ESG & Impact Measurement Standard', audience: 'LPs & Institutions', q: 'Q4 2026' },
  // Entrepreneurship
  { cat: 'Entrepreneurship', tag: 'Guide', title: "The Ghana Founder's Landscape Guide", audience: 'Founders & SMEs', q: 'Q2 2026' },
  { cat: 'Entrepreneurship', tag: 'Challenge', title: 'BRIDGE Big Ideas Challenge Brief', audience: 'Founders & SMEs', q: 'Q2 2026' },
  { cat: 'Entrepreneurship', tag: 'Primer', title: 'From Idea to Impact: Incubation Primer', audience: 'Founders & SMEs', q: 'Q3 2026' },
  { cat: 'Entrepreneurship', tag: 'Series · 12 Docs', title: 'Sector Opportunity Snapshot Series', audience: 'Founders & SMEs', q: 'Q3–Q4 2026' },
  // Business
  { cat: 'Business Entities', tag: 'Partnership', title: 'Corporate Partnership Prospectus', audience: 'Corporates & Multinationals', q: 'Q3 2026' },
  { cat: 'Business Entities', tag: 'Intelligence', title: 'Sector Intelligence Access Brief', audience: 'Corporates & Multinationals', q: 'Q3 2026' },
  { cat: 'Business Entities', tag: 'Supply Chain', title: 'Supply Chain & Market Linkage Report', audience: 'Operators & Distributors', q: 'Q4 2026' },
  { cat: 'Business Entities', tag: 'Operations', title: 'BRIDGE Operator Network Overview', audience: 'Operators & Distributors', q: 'Q4 2026' },
];

const catColors = {
  'General': '#5A7A5A',
  'Government': '#1B4D3E',
  'Investments': '#2C5F8A',
  'Entrepreneurship': '#7A5A2A',
  'Business Entities': '#5A3A6A',
};

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

const BridgeLogo = ({ height = 28 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3258.5 932.3" style={{ height, width: 'auto', display: 'block', flexShrink: 0 }}>
    <defs><style>{`.nl1{fill:none;stroke:#fff;stroke-width:80px;stroke-miterlimit:10;}.nl2{fill:#fff;stroke:#000;stroke-width:.5px;stroke-miterlimit:10;}.nl3{fill:#b8d935;stroke:#1b4d3e;stroke-miterlimit:10;}.nl4{fill:#b8d935;}.nl5{fill:#fff;}.nl6{fill:#74914a;}`}</style></defs>
    <path className="nl5" d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"/>
    <path className="nl2" d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"/>
    <path className="nl2" d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"/>
    <rect className="nl4" x="1427.4" y="17.4" width="205.2" height="145"/>
    <rect className="nl5" x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/>
    <path className="nl5" d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"/>
    <rect className="nl5" x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/>
    <rect className="nl4" x="3083.4" y="339.5" width="175.1" height="257.7"/>
    <rect className="nl4" x="3083.4" y="654.4" width="175.1" height="257.7"/>
    <rect className="nl1" x="40" y="40" width="843.9" height="852.3" rx="36.6" ry="36.6"/>
    <polygon className="nl3" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/>
    <path className="nl6" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z"/>
    <path className="nl4" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"/>
  </svg>
);

function NavBar({ heroRef }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => {
      if (!heroRef?.current) return;
      setScrolled(heroRef.current.getBoundingClientRect().bottom < 0);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, [heroRef]);

  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: C.cover,
      borderBottom: scrolled ? `1px solid rgba(184,217,53,0.25)` : '1px solid rgba(255,255,255,0.07)',
      boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.35)' : 'none',
      transition: 'border-color 0.3s, box-shadow 0.3s',
    }}>
      <div className="nav-inner" style={{ maxWidth: 1160, margin: '0 auto', padding: '0 48px', height: 54, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <BridgeLogo height={26} />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.18)' }}>·</span>
          <span className="nav-cta" style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.04em', fontFamily: "'Inter', sans-serif" }}>Member Document Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="mailto:intelligence@bridge-pbc.com" className="nav-link nav-cta" style={{ fontSize: 11, color: 'rgba(255,255,255,0.40)', textDecoration: 'none', letterSpacing: '0.03em', fontFamily: "'Inter', sans-serif" }}>
            Contact Intelligence Team →
          </a>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ doc, index, onSelect }) {
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(false);

  // ── MOBILE LAYOUT ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div style={{
        background: C.deep,
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.07)',
        marginBottom: 12,
      }}>
        {/* Tap header — always visible */}
        <div
          onClick={() => setExpanded(e => !e)}
          style={{
            padding: '20px 22px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 14,
            background: expanded ? 'rgba(184,217,53,0.05)' : 'transparent',
            borderBottom: expanded ? '1px solid rgba(255,255,255,0.07)' : 'none',
            transition: 'background 0.18s',
          }}
        >
          <div style={{ flex: 1 }}>
            {/* Category + tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)' }}>{doc.cat}</span>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.18)' }}>·</span>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)' }}>{doc.tag}</span>
            </div>
            {/* Title always visible */}
            <div className="feat-title-clamp" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 17, fontWeight: 400, color: C.white, lineHeight: 1.22, marginBottom: 14 }}>{doc.title}</div>
            {/* Stats row */}
            <div style={{ display: 'flex', gap: 24 }}>
              {[doc.stat1, doc.stat2].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: C.accent, lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginTop: 3, lineHeight: 1.3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Toggle indicator */}
          <div style={{
            width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
            border: `1px solid ${expanded ? 'rgba(184,217,53,0.5)' : 'rgba(255,255,255,0.15)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.18s', marginTop: 2,
          }}>
            <span style={{
              fontSize: 12, color: expanded ? C.accent : 'rgba(255,255,255,0.35)',
              display: 'inline-block',
              transform: expanded ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.22s',
              lineHeight: 1,
            }}>▾</span>
          </div>
        </div>

        {/* Expandable content */}
        {expanded && (
          <div style={{ padding: '22px 22px 26px' }}>
            <p style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 14, fontStyle: 'italic', lineHeight: 1.55,
              color: 'rgba(255,255,255,0.52)', margin: '0 0 16px',
            }}>{doc.subtitle}</p>
            <p style={{
              fontSize: 13, lineHeight: 1.82, color: 'rgba(255,255,255,0.42)',
              margin: '0 0 24px',
            }}>{doc.body}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.accent }} />
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.accent }}>Available Now</span>
            </div>
            <button className="read-btn" onClick={() => onSelect(doc)} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              width: '100%', padding: '14px 20px', borderRadius: 32,
              background: C.accent, color: C.deep,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
              textTransform: 'uppercase', border: 'none', cursor: 'pointer',
            }}>
              Read Document <span style={{ fontSize: 14, fontWeight: 400 }}>→</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── DESKTOP LAYOUT (unchanged) ────────────────────────────────────────────
  return (
    <div className="feat-card" style={{
      background: C.deep,
      borderRadius: 20,
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.07)',
      marginBottom: 16,
    }}>
      <div className="feat-inner" style={{ display: 'flex', minHeight: 280 }}>

        {/* Left meta panel */}
        <div className="feat-meta" style={{
          width: 200,
          flexShrink: 0,
          borderRight: '1px solid rgba(255,255,255,0.08)',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.03)',
        }}>
          <div className="feat-meta-top">
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginBottom: 6 }}>{doc.cat}</div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginBottom: 28 }}>{doc.tag}</div>
            <div className="feat-stats" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[doc.stat1, doc.stat2].map(s => (
                <div key={s.label}>
                  <div className="feat-stat-num" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: C.accent, lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginTop: 5, lineHeight: 1.3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 24 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.accent }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.accent }}>Available Now</span>
          </div>
        </div>

        {/* Right content */}
        <div className="feat-content" style={{ flex: 1, padding: '36px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h2 className="feat-title feat-title-clamp" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, fontWeight: 400, lineHeight: 1.18, color: C.white, margin: '0 0 10px' }}>{doc.title}</h2>
            <p className="feat-subtitle feat-subtitle-clamp" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 14, fontStyle: 'italic', lineHeight: 1.55, color: 'rgba(255,255,255,0.52)', margin: '0 0 14px' }}>{doc.subtitle}</p>
            <p className="feat-body feat-body-clamp" style={{ fontSize: 13, lineHeight: 1.75, color: 'rgba(255,255,255,0.40)', margin: 0, maxWidth: 560 }}>{doc.body}</p>
          </div>
          <div style={{ marginTop: 28 }}>
            <button className="read-btn" onClick={() => onSelect(doc)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '13px 28px', borderRadius: 32,
              background: C.accent, color: C.deep,
              fontSize: 12, fontWeight: 700, letterSpacing: '0.05em',
              textTransform: 'uppercase', border: 'none', cursor: 'pointer',
            }}>
              Read Document <span style={{ fontSize: 15, fontWeight: 400 }}>→</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function RoadmapSection({ rows, filterCat }) {
  const isMobile = useIsMobile();
  const filtered = filterCat === 'All' ? rows : rows.filter(r => r.cat === filterCat);

  // Group by category
  const grouped = {};
  filtered.forEach(r => {
    if (!grouped[r.cat]) grouped[r.cat] = [];
    grouped[r.cat].push(r);
  });

  const cats = Object.keys(grouped);

  // On mobile All-view: each category starts collapsed
  const [openCats, setOpenCats] = useState(() => {
    const init = {};
    if (filterCat !== 'All') {
      cats.forEach(c => { init[c] = true; });
    } else if (cats.length > 0) {
      init[cats[0]] = true;
    }
    return init;
  });

  // When filterCat changes, reset: single-cat views auto-open, All-view opens first cat only
  useEffect(() => {
    if (filterCat === 'All') {
      const init = {};
      if (cats.length > 0) init[cats[0]] = true;
      setOpenCats(init);
    } else {
      const init = {};
      cats.forEach(c => { init[c] = true; });
      setOpenCats(init);
    }
  }, [filterCat]);

  const toggleCat = cat => setOpenCats(p => ({ ...p, [cat]: !p[cat] }));
  const collapsible = isMobile && filterCat === 'All';

  return (
    <div>
      {cats.map(cat => {
        const items = grouped[cat];
        const isOpen = !collapsible || !!openCats[cat];

        return (
          <div key={cat} style={{ marginBottom: 28 }}>
            {/* Category label — tap target on mobile All-view */}
            <div
              onClick={collapsible ? () => toggleCat(cat) : undefined}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, marginBottom: isOpen ? 12 : 0,
                cursor: collapsible ? 'pointer' : 'default',
                padding: collapsible ? '10px 14px' : '0',
                background: collapsible ? (isOpen ? 'rgba(27,77,62,0.07)' : 'transparent') : 'transparent',
                borderRadius: collapsible ? 10 : 0,
                border: collapsible ? `1px solid ${isOpen ? C.line : 'transparent'}` : 'none',
                transition: 'background 0.15s',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: catColors[cat] || C.muted, flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: catColors[cat] || C.muted }}>{cat}</span>
              </div>
              {collapsible && (
                <span style={{
                  fontSize: 12,
                  color: isOpen ? C.primary : C.muted,
                  display: 'inline-block',
                  transform: isOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s',
                  lineHeight: 1,
                }}>▾</span>
              )}
            </div>

            {/* Rows */}
            {isOpen && (
              <div style={{ borderRadius: 12, overflow: 'hidden', border: `1px solid ${C.line}` }}>
                {items.map((item, i) => (
                  <div key={i} className="road-row" style={{
                    background: i % 2 === 0 ? C.white : C.card,
                    borderBottom: i < items.length - 1 ? `1px solid ${C.line}` : 'none',
                  }}>
                    <div className="road-row-grid" style={{
                      display: 'grid',
                      gridTemplateColumns: '120px 1fr 180px 100px',
                      alignItems: 'center',
                      padding: '0 24px',
                      minHeight: 54,
                      gap: 16,
                    }}>
                      <div className="road-type-col">
                        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: catColors[cat] || C.muted }}>{item.tag}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 14, color: C.text, fontWeight: 500, lineHeight: 1.4 }}>{item.title}</span>
                        {item.priority && (
                          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.primary, background: 'rgba(184,217,53,0.20)', padding: '2px 7px', borderRadius: 10, whiteSpace: 'nowrap', flexShrink: 0 }}>Priority</span>
                        )}
                      </div>
                      <div className="road-audience-col" style={{ fontSize: 12, color: C.muted, textAlign: 'right' }}>{item.audience}</div>
                      <div className="road-quarter-col" style={{ fontSize: 12, fontWeight: 600, color: C.primary, textAlign: 'right' }}>{item.q}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── DOCUMENT DETAIL VIEW ───────────────────────────────────────────────────

const docEngagement = {

  analyst: {
    headline: "The methodology is the foundation.",
    subhead: "Every venture score, every capital allocation, every risk rating traces back to this framework. These paths let you go from understanding it to applying it.",
    cards: [
      {
        tag: "Methodology Review",
        headline: "Request a Methodology Walkthrough",
        body: "Schedule a structured session with the BRIDGE team to review the scoring architecture, sub-component weights, and audit trail. Designed for analysts and institutional partners conducting due diligence.",
        cta: "Request Walkthrough →",
        href: "mailto:intelligence@bridge-pbc.com?subject=Methodology Walkthrough Request",
      },
      {
        tag: "Data Access",
        headline: "Access the Full Scoring Dataset",
        body: "Qualified partners may request the complete Impact Score™ dataset — all 174+ ventures scored, ranked by dimension, and cross-referenced against sector and capital parameters.",
        cta: "Request Data Access →",
        href: "mailto:intelligence@bridge-pbc.com?subject=Impact Score Dataset Request",
      },
      {
        tag: "Co-Investment",
        headline: "Translate Analysis Into Capital Deployment",
        body: "Once you understand how ventures are scored, the natural next step is identifying which ones match your capital profile. BRIDGE facilitates LP and SPV structures for qualified investors.",
        cta: "Discuss Investment →",
        href: "mailto:invest@bridgepbc.com?subject=Co-Investment Discussion",
      },
    ],
  },

  government: {
    headline: "Policy alignment is not incidental — it is the architecture.",
    subhead: "BRIDGE ventures are built around Ghana's development priorities. These paths connect the intelligence in this document to formal partnership and implementation.",
    cards: [
      {
        tag: "Ministry Briefing",
        headline: "Schedule a Ministry-Level Briefing",
        body: "A structured briefing for ministers, department heads, and senior officials — covering how BRIDGE ventures align with your ministry's mandate, budget priorities, and the Sankofa Initiative implementation calendar.",
        cta: "Request Briefing →",
        href: "mailto:intelligence@bridge-pbc.com?subject=Ministry Briefing Request",
      },
      {
        tag: "Policy Alignment",
        headline: "Map Your Priorities to BRIDGE Ventures",
        body: "BRIDGE produces sector-specific policy alignment briefs that map your ministry's current initiatives to specific ventures in the BRIDGE portfolio — identifying co-funding opportunities and shared implementation pathways.",
        cta: "Request Alignment Brief →",
        href: "mailto:partnerships@bridgepbc.com?subject=Policy Alignment Workshop",
      },
      {
        tag: "Partnership Framework",
        headline: "Initiate a Formal Partnership Discussion",
        body: "BRIDGE has established MOU frameworks with government ministries and district assemblies. The partnership model delivers private capital and expertise without creating fiscal burden.",
        cta: "Discuss Partnership →",
        href: "mailto:partnerships@bridgepbc.com?subject=Government Partnership Discussion",
      },
    ],
  },

  investor: {
    headline: "The opportunity is identified. The question is sequencing.",
    subhead: "$135–259M across 174+ ventures is a portfolio. These paths help you find your position in it — and move quickly on the ones that fit.",
    cards: [
      {
        tag: "Deal Flow Access",
        headline: "Access the Full Venture Pipeline",
        body: "The portfolio overview is the map. Qualified partners receive access to individual venture profiles — full financial models, Impact Score™ breakdowns, co-investor landscape, and entry parameters.",
        cta: "Request Pipeline Access →",
        href: "mailto:invest@bridgepbc.com?subject=Venture Pipeline Access",
      },
      {
        tag: "Co-Investment",
        headline: "Discuss LP and Co-Investment Structures",
        body: "BRIDGE offers LP rights in fund structures and direct co-investment via SPV for qualified investors. Quarterly reporting, governance participation, and co-investment rights at various thresholds.",
        cta: "Discuss Investment →",
        href: "mailto:invest@bridgepbc.com?subject=Co-Investment Discussion",
      },
      {
        tag: "Portfolio Briefing",
        headline: "Get a Sector-Matched Portfolio Briefing",
        body: "Tell us your sector focus and capital range. BRIDGE will prepare a tailored briefing covering the ventures in your target sectors — scored, sequenced, and matched to your investment parameters.",
        cta: "Request Briefing →",
        href: "mailto:invest@bridgepbc.com?subject=Portfolio Briefing Request",
      },
    ],
  },

  specialist: {
    headline: "Sixty thousand words of research. Now put your expertise to work in it.",
    subhead: "The sector briefs are built on BRIDGE's analysis. The ventures inside them are built by people who know these sectors. These paths let you contribute yours.",
    cards: [
      {
        tag: "Advisory Network",
        headline: "Join the Sector Advisory Network",
        body: "BRIDGE matches sector specialists with advisory roles in the venture pipeline — reviewing opportunity assessments, mentoring entrepreneurs, and contributing expertise to due diligence. 2–5 hours monthly, matched to your sector.",
        cta: "Express Interest →",
        href: "mailto:intelligence@bridge-pbc.com?subject=Advisory Network Interest",
      },
      {
        tag: "Expert Consulting",
        headline: "Take On a Consulting Engagement",
        body: "Portfolio companies and ventures in evaluation regularly need deep sector expertise. BRIDGE facilitates paid consulting engagements — project-based, with clear deliverables and compensation at professional rates.",
        cta: "Discuss Engagement →",
        href: "mailto:intelligence@bridge-pbc.com?subject=Expert Consulting Interest",
      },
      {
        tag: "Board Service",
        headline: "Consider a Board Role",
        body: "As ventures in the BRIDGE portfolio mature, governance roles open. Board service positions offer sector professionals direct participation in portfolio company strategy — with board compensation consistent with Ghana market practice.",
        cta: "Learn About Board Roles →",
        href: "mailto:intelligence@bridge-pbc.com?subject=Board Service Interest",
      },
    ],
  },

  entrepreneur: {
    headline: "The licence window is open. The architecture is yours to build.",
    subhead: "First-mover advantage in an emerging regulated market is rare. These paths convert the intelligence in this brief into an operating venture.",
    cards: [
      {
        tag: "Venture Development",
        headline: "Develop Your Concept Into a Venture",
        body: "BRIDGE's Advisory & Incubation model supports entrepreneurs from concept through funding-ready business plan — covering market analysis, regulatory navigation, financial modelling, and investor materials.",
        cta: "Start Development →",
        href: "mailto:intelligence@bridge-pbc.com?subject=Venture Development Interest",
      },
      {
        tag: "Regulatory Navigation",
        headline: "Navigate the Licensing Process",
        body: "NCC licence applications require specific documentation, site compliance, and agency engagement. BRIDGE provides guided regulatory navigation — from application preparation to licence issuance and ongoing compliance.",
        cta: "Get Guidance →",
        href: "mailto:intelligence@bridge-pbc.com?subject=Regulatory Navigation Request",
      },
      {
        tag: "Fundraising Support",
        headline: "Raise Capital for Your Venture",
        body: "BRIDGE facilitates introductions to investors with appetite in this sector, prepares investor-ready materials, and structures co-investment where BRIDGE participates directly. Success fee model — aligned incentives.",
        cta: "Discuss Fundraising →",
        href: "mailto:invest@bridgepbc.com?subject=Fundraising Support Request",
      },
    ],
  },

  active_member: {
    headline: "You're current. Now stay ahead.",
    subhead: "Active members who engage between publications — not just at publication — are the ones who move on opportunities before they're widely known.",
    cards: [
      {
        tag: "Quarterly Call",
        headline: "Join the Members Quarterly Update Call",
        body: "BRIDGE hosts a live quarterly call for active members — walking through sector movements, pipeline updates, and the BRIDGE team's forward read on priority opportunities. Q2 call: April 15.",
        cta: "Register for Q2 Call →",
        href: "mailto:intelligence@bridge-pbc.com?subject=Quarterly Call Registration",
      },
      {
        tag: "Deal Alerts",
        headline: "Set Up Deal Pipeline Alerts",
        body: "Receive direct notification when ventures in your sectors of interest advance to active evaluation, approach funding close, or open co-investment windows. Opt in by sector — no noise outside your focus areas.",
        cta: "Set Up Alerts →",
        href: "mailto:intelligence@bridge-pbc.com?subject=Deal Pipeline Alert Setup",
      },
      {
        tag: "Co-Investment",
        headline: "Access Active Co-Investment Windows",
        body: "Several ventures in the current pipeline are approaching co-investment close. Active members receive first-look access. Request a deal summary for ventures currently open to co-investment.",
        cta: "View Open Windows →",
        href: "mailto:invest@bridgepbc.com?subject=Active Co-Investment Windows",
      },
    ],
  },

  new_entrant: {
    headline: "Understanding the rules before you move is not caution — it's strategy.",
    subhead: "Ghana's investment framework rewards preparation. These paths connect your regulatory knowledge to active market entry.",
    cards: [
      {
        tag: "Regulatory Navigation",
        headline: "Get Guided Regulatory Support",
        body: "BRIDGE provides step-by-step guidance on GIPC registration, sector-specific licensing, and compliance requirements — from initial application through operating approval. Free initial consultation; fee-based deep support.",
        cta: "Request Consultation →",
        href: "mailto:intelligence@bridge-pbc.com?subject=Regulatory Navigation Request",
      },
      {
        tag: "Market Entry Briefing",
        headline: "Schedule a Market Entry Briefing",
        body: "A tailored briefing for first-time Ghana investors — covering the regulatory pathway for your sector, minimum capital requirements, local partner landscape, and the specific GIPC provisions that apply to your structure.",
        cta: "Request Briefing →",
        href: "mailto:intelligence@bridge-pbc.com?subject=Market Entry Briefing",
      },
      {
        tag: "Partnership Matchmaking",
        headline: "Find the Right Local Partners",
        body: "BRIDGE's partner network spans all 12 sectors. For international investors and diaspora partners who need local operators, co-founders, or distribution partners — BRIDGE facilitates introductions to vetted on-ground networks.",
        cta: "Request Matchmaking →",
        href: "mailto:partnerships@bridgepbc.com?subject=Partnership Matchmaking Request",
      },
    ],
  },

};


function DocumentDetail({ doc, onBack, allDocs, onSelect }) {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const related = allDocs.filter(d => d.cat === doc.cat && d.title !== doc.title).slice(0, 3);
  const F = "'Inter', sans-serif";
  const S = "'DM Serif Display', serif";
  const [coverOpen, setCoverOpen] = useState(false);
  const [engOpen, setEngOpen] = useState(false);

  const eng = docEngagement[doc.engagementKey] || docEngagement.analyst;
  const covers = doc.covers || [
    'Full methodology and scoring rationale',
    'Sector opportunity landscape and capital parameters',
    'Venture pipeline with BRIDGE Impact Score™ rankings',
    'Policy environment and regulatory considerations',
    'Cross-sector integration points and compounding returns',
    'Investment thesis and deployment parameters',
  ];

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [doc]);

  // ── MOBILE ─────────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div style={{ fontFamily: F, background: C.bg, minHeight: '100vh', color: C.text }} className="detail-pad">

        {/* Hero */}
        <div style={{ background: C.cover, padding: '28px 18px 36px' }}>
          <button onClick={onBack} className="back-btn" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none',
            cursor: 'pointer', padding: '0 0 24px', color: 'rgba(255,255,255,0.30)',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: F,
          }}>← Library</button>

          {/* Who reads this */}
          {doc.audience && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
              <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', fontFamily: F }}>For</span>
              <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(184,217,53,0.7)', fontFamily: F }}>{doc.audience}</span>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
            <div style={{ width: 20, height: 2, background: C.accent }} />
            <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.accent, fontFamily: F }}>{doc.cat} · {doc.tag}</span>
          </div>

          <h1 style={{ fontFamily: S, fontSize: 26, fontWeight: 400, lineHeight: 1.15, color: C.white, margin: '0 0 12px' }}>{doc.title}</h1>
          <p style={{ fontFamily: S, fontSize: 13, fontStyle: 'italic', color: 'rgba(255,255,255,0.42)', lineHeight: 1.6, margin: 0 }}>{doc.subtitle}</p>

          {/* Mobile CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 28 }}>
            <button onClick={() => doc.route && navigate(doc.route, { state: { founderAccess: true } })} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              padding: '15px 24px', background: C.accent, color: C.cover,
              fontSize: 12, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase',
              border: 'none', cursor: 'pointer', fontFamily: F, borderRadius: 32,
            }}>Open Document →</button>
            <a href={`mailto:intelligence@bridge-pbc.com?subject=Briefing Request — ${doc.title}`} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '13px 24px', background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.55)',
              fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
              textDecoration: 'none', fontFamily: F, borderRadius: 32,
            }}>Schedule a Briefing</a>
          </div>
        </div>

        {/* Urgency strip */}
        {doc.urgency && (
          <div style={{ background: C.bg, borderBottom: `1px solid ${C.line}`, padding: '14px 18px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ width: 3, height: '100%', background: C.accent, flexShrink: 0, minHeight: 16, marginTop: 2 }} />
            <p style={{ fontSize: 12, color: C.primary, lineHeight: 1.65, fontFamily: F, margin: 0, fontWeight: 500 }}>{doc.urgency}</p>
          </div>
        )}

        {/* Accordion: What's Inside */}
        <div style={{ background: C.bg, borderBottom: `1px solid ${C.line}` }}>
          <button className="acc-row" onClick={() => setCoverOpen(o => !o)} style={{
            width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '18px 18px', background: 'none', border: 'none', cursor: 'pointer',
            borderBottom: coverOpen ? `1px solid ${C.line}` : 'none',
          }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ width: 3, height: 16, background: coverOpen ? C.accent : C.line, transition: 'background 0.2s' }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.text, fontFamily: F }}>What's Inside</span>
            </div>
            <span className={`acc-chevron${coverOpen ? ' open' : ''}`} style={{ fontSize: 14, color: C.muted }}>▾</span>
          </button>
          {coverOpen && (
            <div style={{ padding: '4px 18px 20px' }}>
              <p style={{ fontSize: 14, lineHeight: 1.85, color: C.text, fontWeight: 300, fontFamily: F, margin: '12px 0 20px' }}>{doc.body}</p>
              {covers.map((item, i, arr) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderBottom: i < arr.length - 1 ? `1px solid ${C.line}` : 'none' }}>
                  <span style={{ color: C.accent, fontWeight: 700, fontSize: 11, flexShrink: 0, marginTop: 2, fontFamily: F }}>→</span>
                  <span style={{ fontSize: 13, color: C.subtle, lineHeight: 1.55, fontFamily: F }}>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Accordion: Next Steps */}
        <div style={{ background: C.bg, borderBottom: `1px solid ${C.line}` }}>
          <button className="acc-row" onClick={() => setEngOpen(o => !o)} style={{
            width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '18px 18px', background: 'none', border: 'none', cursor: 'pointer',
            borderBottom: engOpen ? `1px solid ${C.line}` : 'none',
          }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ width: 3, height: 16, background: engOpen ? C.accent : C.line, transition: 'background 0.2s' }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.text, fontFamily: F }}>Go Deeper — Next Steps</span>
            </div>
            <span className={`acc-chevron${engOpen ? ' open' : ''}`} style={{ fontSize: 14, color: C.muted }}>▾</span>
          </button>
          {engOpen && (
            <div style={{ padding: '16px 18px 24px', background: C.primary }}>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, fontFamily: F, margin: '0 0 18px' }}>{eng.subhead}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {eng.cards.map((opt, i) => (
                  <div key={i} style={{
                    background: i === 0 ? 'rgba(184,217,53,0.1)' : 'rgba(255,255,255,0.05)',
                    border: i === 0 ? '1px solid rgba(184,217,53,0.3)' : '1px solid rgba(255,255,255,0.1)',
                    padding: '18px 16px 20px', position: 'relative',
                  }}>
                    {i === 0 && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: C.accent }} />}
                    <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: i === 0 ? C.accent : 'rgba(255,255,255,0.3)', fontFamily: F, marginBottom: 8 }}>{String(i+1).padStart(2,'0')} · {opt.tag}</div>
                    <div style={{ fontFamily: S, fontSize: 16, color: C.white, lineHeight: 1.25, marginBottom: 8 }}>{opt.headline}</div>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, fontFamily: F, margin: '0 0 14px' }}>{opt.body}</p>
                    <a href={opt.href} style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: i === 0 ? '10px 18px' : '9px 16px',
                      background: i === 0 ? C.accent : 'transparent',
                      border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.2)',
                      color: i === 0 ? C.cover : 'rgba(255,255,255,0.6)',
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
                      textDecoration: 'none', fontFamily: F, borderRadius: 32,
                    }}>{opt.cta}</a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related — horizontal scroll */}
        {related.length > 0 && (
          <div style={{ padding: '28px 18px 24px' }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.muted, fontFamily: F, marginBottom: 16 }}>More in {doc.cat}</div>
            <div className="h-scroll">
              {related.map((r, i) => (
                <div key={i} className="h-scroll-card" style={{ background: C.deep, border: '1px solid rgba(255,255,255,0.07)', padding: '20px 18px 18px', width: 240, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', fontFamily: F }}>{r.tag}</div>
                  <div style={{ fontFamily: S, fontSize: 15, color: C.white, lineHeight: 1.25 }}>{r.title}</div>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', lineHeight: 1.6, fontFamily: F, margin: '4px 0 0', flex: 1 }}>{r.subtitle}</p>
                  <button onClick={() => onSelect(r)} style={{
                    marginTop: 10, padding: '8px 14px', background: 'transparent',
                    border: '1px solid rgba(184,217,53,0.35)', color: C.accent,
                    fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
                    textTransform: 'uppercase', cursor: 'pointer', fontFamily: F, borderRadius: 32, alignSelf: 'flex-start',
                  }}>Read →</button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ padding: '0 18px 16px', textAlign: 'center' }}>
          <a href="#" style={{ fontSize: 11, color: C.muted, textDecoration: 'none', fontFamily: F, fontWeight: 500 }}>↓ Download PDF instead</a>
        </div>

        {/* Fixed bottom bar */}
        <div className="mob-bar">
          <button onClick={() => doc.route && navigate(doc.route, { state: { founderAccess: true } })} style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '14px', background: C.accent, color: C.cover,
            fontSize: 12, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase',
            border: 'none', cursor: 'pointer', borderRadius: 32, fontFamily: F,
          }}>Open Document →</button>
          <a href={`mailto:intelligence@bridge-pbc.com?subject=Briefing Request — ${doc.title}`} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 48, height: 48, borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.55)',
            fontSize: 16, textDecoration: 'none', flexShrink: 0, fontFamily: F,
          }} title="Schedule Briefing">✉</a>
        </div>
      </div>
    );
  }

  // ── DESKTOP ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: F, background: C.bg, minHeight: '100vh', color: C.text }}>

      {/* Hero */}
      <div style={{ background: C.cover, padding: '60px 48px 64px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <button onClick={onBack} className="back-btn" style={{
            display: 'inline-flex', alignItems: 'center', gap: 7, background: 'none', border: 'none',
            cursor: 'pointer', padding: '0 0 36px', color: 'rgba(255,255,255,0.32)',
            fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: F,
          }}>← Document Library</button>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 64, alignItems: 'end' }}>
            <div>
              {/* Who reads this */}
              {doc.audience && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', fontFamily: F }}>For</span>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(184,217,53,0.65)', fontFamily: F }}>{doc.audience}</span>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
                <div style={{ width: 28, height: 2, background: C.accent, flexShrink: 0 }} />
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.accent, fontFamily: F }}>{doc.cat} · {doc.tag}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(184,217,53,0.1)', border: '1px solid rgba(184,217,53,0.25)', padding: '3px 9px', marginLeft: 4 }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: C.accent, display: 'inline-block' }} />
                  <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.accent, fontFamily: F }}>Available Now</span>
                </span>
              </div>
              <h1 style={{ fontFamily: S, fontSize: 48, fontWeight: 400, lineHeight: 1.1, color: C.white, margin: '0 0 16px', maxWidth: 680 }}>{doc.title}</h1>
              <p style={{ fontFamily: S, fontSize: 17, fontStyle: 'italic', color: 'rgba(255,255,255,0.46)', lineHeight: 1.65, maxWidth: 580, margin: 0 }}>{doc.subtitle}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 240, flexShrink: 0 }}>
              <button onClick={() => doc.route && navigate(doc.route, { state: { founderAccess: true } })} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                padding: '14px 28px', background: C.accent, color: C.cover,
                fontSize: 12, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase',
                border: 'none', cursor: 'pointer', fontFamily: F, borderRadius: 32, whiteSpace: 'nowrap',
              }}>Open Document →</button>
              <a href={`mailto:intelligence@bridge-pbc.com?subject=Briefing Request — ${doc.title}`} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '13px 28px', background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.60)',
                fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
                textDecoration: 'none', fontFamily: F, borderRadius: 32, whiteSpace: 'nowrap',
              }}>Schedule a Briefing</a>
            </div>
          </div>
        </div>
      </div>

      {/* Urgency strip */}
      {doc.urgency && (
        <div style={{ background: C.cover, borderBottom: `1px solid rgba(184,217,53,0.15)` }}>
          <div style={{ maxWidth: 1160, margin: '0 auto', padding: '14px 48px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ width: 3, flexShrink: 0, alignSelf: 'stretch', background: C.accent, minHeight: 16 }} />
            <p style={{ fontSize: 13, color: 'rgba(184,217,53,0.8)', lineHeight: 1.65, fontFamily: F, margin: 0, fontWeight: 500, fontStyle: 'italic' }}>{doc.urgency}</p>
          </div>
        </div>
      )}

      {/* What's Inside + Sticky card */}
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '64px 48px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 72, alignItems: 'start' }}>
          <div>
            <div style={{ borderTop: `5px solid ${C.cover}`, borderBottom: `2px solid ${C.accent}`, paddingBottom: 3, marginBottom: 22 }} />
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.muted, fontFamily: F, marginBottom: 16 }}>What's Inside</div>
            <p style={{ fontSize: 16, lineHeight: 1.9, color: C.text, fontWeight: 300, fontFamily: F, marginBottom: 36 }}>{doc.body}</p>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.muted, fontFamily: F, marginBottom: 16 }}>This Document Covers</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {covers.map((item, i, arr) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '12px 0', borderBottom: i < arr.length - 1 ? `1px solid ${C.line}` : 'none' }}>
                  <span style={{ color: C.accent, fontWeight: 700, fontSize: 12, flexShrink: 0, marginTop: 2, fontFamily: F }}>→</span>
                  <span style={{ fontSize: 14, color: C.subtle, lineHeight: 1.6, fontFamily: F }}>{item}</span>
                </div>
              ))}
            </div>
{doc.urgency && (
            <div style={{ borderLeft: `3px solid ${C.accent}`, paddingLeft: 20, margin: '40px 0 0', maxWidth: 520 }}>
              <p style={{ fontFamily: S, fontSize: 17, fontStyle: 'italic', color: C.primary, lineHeight: 1.65, margin: 0 }}>
                "{doc.urgency}"
              </p>
            </div>
            )}
          </div>

          {/* Sticky access card */}
          <div style={{ position: 'sticky', top: 76 }}>
            <div style={{ background: C.deep, overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ background: C.primary, borderBottom: `2px solid ${C.accent}`, padding: '18px 24px' }}>
                <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.accent, fontFamily: F, marginBottom: 6 }}>BRIDGE MEMBERS · FULL ACCESS</div>
                <div style={{ fontFamily: S, fontSize: 16, color: C.white, lineHeight: 1.3 }}>You have full access to this document.</div>
              </div>
              <div style={{ padding: '22px 24px 26px' }}>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.40)', lineHeight: 1.7, fontFamily: F, marginBottom: 22 }}>Open it now or save a copy for offline reference.</div>
                <button onClick={() => doc.route && navigate(doc.route, { state: { founderAccess: true } })} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '14px', background: C.accent, color: C.cover, width: '100%',
                  fontSize: 12, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase',
                  border: 'none', cursor: 'pointer', fontFamily: F, borderRadius: 32, marginBottom: 10,
                }}>Open Document →</button>
                <a href="#" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  padding: '12px', background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.42)',
                  fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase',
                  textDecoration: 'none', fontFamily: F, borderRadius: 32,
                }}>↓ Download PDF</a>
                <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.07)', fontSize: 11, color: 'rgba(255,255,255,0.22)', fontFamily: F, lineHeight: 1.65 }}>
                  Questions? Contact{' '}
                  <a href="mailto:intelligence@bridge-pbc.com" style={{ color: 'rgba(184,217,53,0.55)', textDecoration: 'none' }}>intelligence@bridge-pbc.com</a>
                </div>
              </div>
            </div>
            <div style={{ background: C.card, borderLeft: `3px solid ${C.primary}`, borderTop: `1px solid ${C.line}`, borderRight: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, padding: '18px 20px' }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.primary, fontFamily: F, marginBottom: 8 }}>Not sure where to start?</div>
              <p style={{ fontSize: 13, color: C.subtle, lineHeight: 1.65, fontFamily: F, margin: '0 0 14px' }}>
                Schedule a 30-minute private briefing with the BRIDGE team to discuss how this document applies to your specific goals.
              </p>
              <a href={`mailto:intelligence@bridge-pbc.com?subject=Briefing Request — ${doc.title}`} style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                color: C.primary, textDecoration: 'none', fontFamily: F,
                borderBottom: `1px solid ${C.primary}`, paddingBottom: 1,
              }}>Request a Briefing →</a>
            </div>
          </div>
        </div>
      </div>

      {/* Engagement paths — tailored per document */}
      <div style={{ background: C.primary, borderTop: `3px solid ${C.accent}`, padding: '60px 48px 68px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, alignItems: 'end', marginBottom: 40 }}>
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.accent, fontFamily: F, marginBottom: 12 }}>BRIDGE MEMBER · NEXT STEPS</div>
              <h2 style={{ fontFamily: S, fontSize: 34, fontWeight: 400, fontStyle: 'italic', color: C.white, lineHeight: 1.2, margin: 0 }}>
                {eng.headline}
              </h2>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.42)', lineHeight: 1.8, fontFamily: F, margin: 0, maxWidth: 420, justifySelf: 'end', textAlign: 'right' }}>
              {eng.subhead}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
            {eng.cards.map((opt, i) => (
              <div key={i} className="eng-card" style={{
                background: i === 0 ? 'rgba(184,217,53,0.08)' : 'rgba(255,255,255,0.04)',
                border: i === 0 ? '1px solid rgba(184,217,53,0.3)' : '1px solid rgba(255,255,255,0.09)',
                padding: '32px 28px 36px', display: 'flex', flexDirection: 'column', position: 'relative',
              }}>
                {i === 0 && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: C.accent }} />}
                <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: i === 0 ? C.accent : 'rgba(255,255,255,0.35)', fontFamily: F, marginBottom: 14 }}>{String(i+1).padStart(2,'0')} · {opt.tag}</div>
                <div style={{ fontFamily: S, fontSize: 21, color: C.white, lineHeight: 1.25, marginBottom: 14, flex: 1 }}>{opt.headline}</div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.75, fontFamily: F, margin: '0 0 24px' }}>{opt.body}</p>
                <a href={opt.href} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: i === 0 ? '12px 22px' : '11px 20px',
                  background: i === 0 ? C.accent : 'transparent',
                  border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.22)',
                  color: i === 0 ? C.cover : 'rgba(255,255,255,0.65)',
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                  textDecoration: 'none', fontFamily: F, borderRadius: 32, alignSelf: 'flex-start',
                }}>{opt.cta}</a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related documents */}
      {related.length > 0 && (
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '64px 48px 80px' }}>
          <div style={{ borderTop: `5px solid ${C.cover}`, borderBottom: `2px solid ${C.accent}`, paddingBottom: 3, marginBottom: 28 }} />
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.subtle, fontFamily: F, marginBottom: 28 }}>More in {doc.cat}</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {related.slice(0,2).map((r, i) => (
              <div key={i} style={{ background: C.deep, border: '1px solid rgba(255,255,255,0.07)', padding: '28px 28px 26px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.30)', fontFamily: F }}>{r.tag}</div>
                <div style={{ fontFamily: S, fontSize: 20, color: C.white, lineHeight: 1.22 }}>{r.title}</div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', lineHeight: 1.65, fontFamily: F, margin: 0, flex: 1 }}>{r.subtitle}</p>
                <button onClick={() => onSelect(r)} style={{
                  alignSelf: 'flex-start', marginTop: 10, padding: '10px 22px',
                  background: 'transparent', border: '1px solid rgba(184,217,53,0.35)',
                  color: C.accent, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                  textTransform: 'uppercase', cursor: 'pointer', fontFamily: F, borderRadius: 32,
                }}>Read Document →</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


const allCats = ['All', 'Government', 'Investments', 'Entrepreneurship', 'Business Entities', 'General'];

export default function DocumentLibrary() {
  const [roadmapCat, setRoadmapCat] = useState('All');
  const [pubCat, setPubCat] = useState('All');
  const [showAllDocs, setShowAllDocs] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const heroRef = useRef(null);

  const filteredPublished = pubCat === 'All' ? published : published.filter(d => d.cat === pubCat);
  const INITIAL_SHOW = 4;
  const visibleDocs = (pubCat === 'All' && !showAllDocs) ? filteredPublished.slice(0, INITIAL_SHOW) : filteredPublished;
  const hiddenCount = filteredPublished.length - INITIAL_SHOW;

  // ── Document detail view ──
  if (selectedDoc) {
    return (
      <>
        <style>{fonts}</style>
        <NavBar heroRef={heroRef} />
        <DocumentDetail
          doc={selectedDoc}
          allDocs={published}
          onBack={() => setSelectedDoc(null)}
          onSelect={setSelectedDoc}
        />
        <div style={{ background: C.primary, borderTop: `3px solid ${C.accent}` }}>
          <div className="footer-inner" style={{ maxWidth: 1160, margin: '0 auto', padding: '22px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <BridgeLogo height={20} />
              <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.30)', letterSpacing: '0.04em', fontFamily: "'Inter', sans-serif" }}>bridgepbc.com/intelligence</span>
            </div>
            <div className="footer-links" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              {['All Sectors', 'Members', 'Methodology', 'Contact'].map((l, i) => (
                <a key={i} href="#" style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.32)', textDecoration: 'none', letterSpacing: '0.04em', fontFamily: "'Inter', sans-serif" }}>{l}</a>
              ))}
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)', fontFamily: "'Inter', sans-serif" }}>© 2026 BRIDGE PBC</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: C.bg, minHeight: '100vh', color: C.text }}>
      <style>{fonts}</style>
      <NavBar heroRef={heroRef} />

      {/* ── HERO ── */}
      <div ref={heroRef} className="hero-inner" style={{ background: C.cover, padding: '80px 48px 72px' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 40 }}>
            <div style={{ width: 40, height: 2, background: C.accent }} />
            <span className="hero-eyebrow" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.accent }}>
              BRIDGE PBC — Member Document Dashboard
            </span>
          </div>

          {/* Headline */}
          <h1 className="hero-h1" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 64, fontWeight: 400, lineHeight: 1.06, margin: '0 0 8px', color: C.white }}>
            Intelligence, Research
          </h1>
          <h1 className="hero-h1" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 64, fontWeight: 400, lineHeight: 1.06, margin: '0 0 32px', color: C.accent }}>
            & Sector Data.
          </h1>

          <p className="hero-sub" style={{ fontSize: 18, lineHeight: 1.75, color: 'rgba(255,255,255,0.50)', maxWidth: 560, margin: '0 0 64px', fontWeight: 300 }}>
            33 documents. 12 sectors. Every piece of intelligence BRIDGE has produced — organized, searchable, and yours as a full member.
          </p>

          {/* Stat strip */}
          <div className="stat-row" style={{ display: 'flex', gap: 56, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.09)' }}>
            {[
              { num: "33", label: "Documents in Library" },
              { num: "13", label: "Available Now" },
              { num: "20", label: "In Development" },
              { num: "6", label: "Document Categories" },
              { num: "12", label: "Sectors Covered" },
            ].map(s => (
              <div key={s.label}>
                <div className="stat-num" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 44, color: C.accent, lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginTop: 9 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="body-inner" style={{ maxWidth: 1160, margin: '0 auto', padding: '72px 48px 88px' }}>

        {/* ── SECTION 1: AVAILABLE NOW ── */}
        <div style={{ marginBottom: 88 }}>
          {/* Section header */}
          <div className="sec-header" style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 28 }}>
            <div className="sec-mark" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 40, height: 1, background: C.accent }} />
              <span style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic', fontSize: 14, color: C.accent }}>I</span>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.subtle }}>Available Now</span>
            </div>
          </div>

          {/* Category tab filter */}
          <div className="tab-scroll" style={{ display: 'flex', gap: 0, marginBottom: 36, borderBottom: `1px solid ${C.line}` }}>
            {pubCats.map(cat => {
              const count = cat === 'All' ? published.length : published.filter(d => d.cat === cat).length;
              return (
                <button key={cat} className="tab-btn" onClick={() => { setPubCat(cat); setShowAllDocs(false); }} style={{
                  padding: '12px 18px', background: 'none', border: 'none',
                  borderBottom: pubCat === cat ? `2px solid ${C.primary}` : '2px solid transparent',
                  marginBottom: -1,
                  cursor: 'pointer', fontSize: 12,
                  fontWeight: pubCat === cat ? 700 : 400,
                  color: pubCat === cat ? C.primary : C.muted,
                  fontFamily: "'Inter', sans-serif",
                  whiteSpace: 'nowrap', letterSpacing: '0.02em',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  {cat === 'All' ? 'All Documents' : cat}
                  <span style={{ fontSize: 10, fontWeight: 700, color: pubCat === cat ? C.accent : '#CCC' }}>{count}</span>
                </button>
              );
            })}
          </div>

          {visibleDocs.map((doc, i) => (
            <FeatureCard key={doc.title} doc={doc} index={i} onSelect={setSelectedDoc} />
          ))}

          {pubCat === 'All' && !showAllDocs && hiddenCount > 0 && (
            <div style={{ marginTop: 12 }}>
              <button onClick={() => setShowAllDocs(true)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                width: '100%', padding: '14px 24px', borderRadius: 12,
                border: `1px solid ${C.line}`, background: C.white,
                fontSize: 12, fontWeight: 600, color: C.subtle,
                cursor: 'pointer', fontFamily: "'Inter', sans-serif",
                letterSpacing: '0.02em',
              }}>
                Show {hiddenCount} more document{hiddenCount !== 1 ? 's' : ''} <span style={{ fontSize: 14, color: C.muted }}>↓</span>
              </button>
            </div>
          )}
          {pubCat === 'All' && showAllDocs && (
            <div style={{ marginTop: 12 }}>
              <button onClick={() => setShowAllDocs(false)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                width: '100%', padding: '14px 24px', borderRadius: 12,
                border: `1px solid ${C.line}`, background: C.white,
                fontSize: 12, fontWeight: 600, color: C.subtle,
                cursor: 'pointer', fontFamily: "'Inter', sans-serif",
                letterSpacing: '0.02em',
              }}>
                Show less <span style={{ fontSize: 14, color: C.muted }}>↑</span>
              </button>
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ borderTop: `1px solid ${C.line}`, marginBottom: 72 }} />

        {/* ── SECTION 2: ROADMAP ── */}
        <div>
          <div className="sec-header" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div className="sec-mark" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 40, height: 1, background: C.line }} />
              <span style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic', fontSize: 14, color: C.accent }}>II</span>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.subtle }}>2026 Publication Roadmap</span>
            </div>
            <div className="sec-count" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 12, color: C.muted }}>— 20 documents in development</span>
            </div>
          </div>

          <p style={{ fontSize: 15, color: C.subtle, lineHeight: 1.7, marginBottom: 36, maxWidth: 640 }}>
            Every document in development, organized by audience category and scheduled publication quarter. Ministries, investors, and partners may request advance access to priority documents.
          </p>

          {/* Roadmap category filter */}
          <div className="tab-scroll" style={{ display: 'flex', gap: 0, marginBottom: 32, borderBottom: `1px solid ${C.line}` }}>
            {allCats.map(cat => {
              const count = cat === 'All' ? roadmap.length : roadmap.filter(r => r.cat === cat).length;
              return (
                <button key={cat} className="tab-btn" onClick={() => setRoadmapCat(cat)} style={{
                  padding: '12px 18px', background: 'none', border: 'none',
                  borderBottom: roadmapCat === cat ? `2px solid ${C.primary}` : '2px solid transparent',
                  marginBottom: -1,
                  cursor: 'pointer', fontSize: 12,
                  fontWeight: roadmapCat === cat ? 700 : 400,
                  color: roadmapCat === cat ? C.primary : C.muted,
                  fontFamily: "'Inter', sans-serif",
                  whiteSpace: 'nowrap', letterSpacing: '0.02em',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  {cat === 'All' ? 'All Categories' : cat}
                  <span style={{ fontSize: 10, fontWeight: 700, color: roadmapCat === cat ? C.accent : '#CCC' }}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Column headers */}
          <div className="road-headers" style={{
            display: 'grid', gridTemplateColumns: '120px 1fr 180px 100px',
            padding: '0 24px', marginBottom: 8, gap: 16,
          }}>
            {['Type', 'Document', 'Audience', 'Target'].map(h => (
              <div key={h} style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.muted, textAlign: h === 'Audience' || h === 'Target' ? 'right' : 'left' }}>{h}</div>
            ))}
          </div>

          <RoadmapSection rows={roadmap} filterCat={roadmapCat} />

          {/* Advance access CTA */}
          <div className="roadmap-cta" style={{ marginTop: 40, padding: '28px 36px', background: C.primary, borderTop: `3px solid ${C.accent}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.accent, fontFamily: "'Inter', sans-serif", marginBottom: 10 }}>BRIDGE INTELLIGENCE PIPELINE · 2026</div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, fontStyle: 'italic', color: C.white, marginBottom: 8, lineHeight: 1.3 }}>Ghana's 2026 intelligence pipeline —<br/>request early access.</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>Ministries, sector agencies, DFI partners, and qualified investors<br/>may request pre-publication access to any document in development.</div>
            </div>
            <a href="mailto:intelligence@bridge-pbc.com" className="roadmap-cta-btn" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '14px 28px', background: C.accent,
              color: C.cover, fontSize: 11, fontWeight: 700, textDecoration: 'none',
              letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap',
              fontFamily: "'Inter', sans-serif", borderRadius: 0,
            }}>
              Request Access →
            </a>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ background: C.primary, borderTop: `3px solid ${C.accent}` }}>
        <div className="footer-inner" style={{ maxWidth: 1160, margin: '0 auto', padding: '22px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <BridgeLogo height={20} />
            <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.30)', letterSpacing: '0.04em', fontFamily: "'Inter', sans-serif" }}>bridgepbc.com/intelligence</span>
          </div>
          <div className="footer-links" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            {['All Sectors', 'Members', 'Methodology', 'Contact'].map((l, i) => (
              <a key={i} href="#" style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.32)', textDecoration: 'none', letterSpacing: '0.04em', fontFamily: "'Inter', sans-serif" }}>{l}</a>
            ))}
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)', fontFamily: "'Inter', sans-serif" }}>© 2026 BRIDGE PBC</span>
          </div>
        </div>
      </div>
    </div>
  );
}
