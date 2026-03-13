import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";

const C = {
  primary: '#1B4D3E',
  accent: '#B8D935',
  bg: '#EFEFEC',
  text: '#111111',
  subtle: '#555555',
  muted: '#888888',
  line: '#D8D8D4',
  white: '#FFFFFF',
  cover: '#0A1409',
  deep: '#0F1A12',
  card: '#F7F7F4',
};

const scopedStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap');

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

  /* Tab filter — hide scrollbar, keep scroll */
  .tab-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
  .tab-scroll::-webkit-scrollbar { display: none; }

  /* Section headers */
  .sec-header { display: flex; align-items: baseline; gap: 20; margin-bottom: 28px; }
  .sec-mark { display: flex; align-items: center; gap: 14px; }
  .sec-count { display: flex; align-items: center; gap: 6px; margin-left: 8px; }

  @media (max-width: 768px) {
    .sec-header { flex-direction: column !important; gap: 10px !important; margin-bottom: 20px !important; }
    .sec-count { margin-left: 0 !important; }
  }

  /* ── MOBILE ── */
  @media (max-width: 768px) {

    /* Hero */
    .hero-inner { padding: 44px 20px 40px !important; }
    .hero-eyebrow { font-size: 9px !important; letter-spacing: 0.14em !important; }
    .hero-h1 { font-size: 38px !important; line-height: 1.08 !important; }
    .hero-sub { font-size: 15px !important; margin-bottom: 40px !important; }
    .stat-row { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 28px 20px !important; }
    .stat-num { font-size: 34px !important; }

    /* Body */
    .body-inner { padding: 40px 20px 64px !important; }

    /* Feature cards */
    .feat-inner { flex-direction: column !important; min-height: unset !important; }
    .feat-meta {
      width: 100% !important;
      border-right: none !important;
      border-bottom: 1px solid rgba(255,255,255,0.08) !important;
      padding: 24px 24px 20px !important;
      flex-direction: row !important;
      align-items: center !important;
      justify-content: space-between !important;
      flex-wrap: wrap !important;
      gap: 16px !important;
    }
    .feat-meta-top { margin-bottom: 0 !important; }
    .feat-stats { flex-direction: row !important; gap: 28px !important; }
    .feat-stat-num { font-size: 22px !important; }
    .feat-content { padding: 24px 24px 28px !important; }
    .feat-title { font-size: 22px !important; }
    .feat-subtitle { font-size: 14px !important; }
    .feat-body { font-size: 13px !important; }

    /* Roadmap */
    .road-headers { display: none !important; }
    .road-row-grid {
      grid-template-columns: 1fr auto !important;
      padding: 0 16px !important;
      min-height: 56px !important;
      gap: 12px !important;
    }
    .road-type-col { display: none !important; }
    .road-audience-col { display: none !important; }
    .road-quarter-col { text-align: right !important; white-space: nowrap !important; }

    /* CTA box */
    .roadmap-cta { padding: 24px 20px !important; flex-direction: column !important; align-items: flex-start !important; }
    .roadmap-cta-btn { width: 100% !important; justify-content: center !important; }
  }
`;

// ─── DATA ───────────────────────────────────────────────────────────────────

const pubCats = ['All', 'Methodology', 'Portfolio', 'Sector Briefs', 'Reports', 'Policy'];

const published = [
  // ── Methodology
  {
    cat: 'Methodology', tag: 'Methodology',
    title: 'BRIDGE Impact Score™ Methodology',
    subtitle: 'How every venture is evaluated — and why the judgment can be trusted.',
    body: 'A complete account of the four-dimensional framework behind BRIDGE\'s venture evaluation process. Covers scoring weights, sub-components, qualifying thresholds, the five-stage pipeline, and the structural features that make the Score independently auditable.',
    stat1: { num: '100', label: 'Point Scale' },
    stat2: { num: '174+', label: 'Ventures Scored' },
    route: '/resources/impact-score',
  },
  {
    cat: 'Methodology', tag: 'Framework',
    title: 'Peace & Prosperity Framework',
    subtitle: 'The philosophical and analytical foundation of every investment BRIDGE makes.',
    body: 'Defines what BRIDGE means by dignity, security, and thriving — and why GDP growth alone is insufficient. Covers all five dimensions of Peace, the three domains of Prosperity, and the direct connection between all 12 sectors and human flourishing outcomes.',
    stat1: { num: '5', label: 'Dimensions of Peace' },
    stat2: { num: '12', label: 'Sector Mappings' },
    route: '/resources/peace-prosperity',
  },
  // ── Portfolio
  {
    cat: 'Portfolio', tag: 'Portfolio Overview',
    title: 'BRIDGE Venture Portfolio Overview',
    subtitle: '174+ identified ventures. 12 sectors. The most comprehensive Ghana opportunity assessment produced.',
    body: 'A curated overview of every sector in the BRIDGE portfolio — capital ranges, venture counts, Impact Score benchmarks, and the 36+ cross-sector integration points that produce compounding returns. Full sector analyses and individual venture profiles available to qualified partners.',
    stat1: { num: '$135–259M', label: 'Indicative Capital' },
    stat2: { num: '36+', label: 'Integration Points' },
    route: '/resources/portfolio',
  },
  // ── Sector Briefs
  {
    cat: 'Sector Briefs', tag: 'Research Series · 12 Briefs',
    title: 'BRIDGE Sector Intelligence Briefs — All 12 Sectors',
    subtitle: 'One authoritative brief per sector. Opportunity landscape, policy environment, venture thesis, and investment parameters.',
    body: 'Original research across Infrastructure, Financial Inclusion, Health Systems, Technology & Innovation, Education & Skills, Agriculture & Value Chains, Creative Industries, Housing, Tourism, Energy, Manufacturing, and Transportation. Each brief includes the BRIDGE Impact Score™ ranking, capital range, and cross-sector integration points.',
    stat1: { num: '12', label: 'Sector Briefs' },
    stat2: { num: '60K+', label: 'Words of Research' },
    route: '/resources/sector-briefs-full',
  },
  // ── Reports
  {
    cat: 'Reports', tag: 'White Paper',
    title: 'BRIDGE PBC Foundational White Paper',
    subtitle: 'Complete intellectual foundation — methodology, sector framework, and investment thesis.',
    body: 'The comprehensive white paper laying out BRIDGE\'s full theory of change, the Peace & Prosperity measurement framework, the Impact Score™ methodology, and the strategic rationale for a 12-sector Ghana-first investment architecture. Essential reading for government and institutional partners.',
    stat1: { num: '80+', label: 'Pages' },
    stat2: { num: '12', label: 'Sectors Covered' },
    route: '/resources/white-paper',
  },
  {
    cat: 'Reports', tag: 'Annual Review',
    title: 'BRIDGE 2025 Sector Intelligence Review',
    subtitle: 'Full-year retrospective across all 12 sectors — what moved, what stalled, and what the data says about 2026.',
    body: 'A sector-by-sector analysis of Ghana\'s 2025 investment landscape. Includes revised Impact Score™ rankings, emerging venture opportunities identified in the second half of the year, policy shifts and their downstream effects, and the BRIDGE team\'s forward outlook for each sector heading into 2026.',
    stat1: { num: '12', label: 'Sectors Reviewed' },
    stat2: { num: '2025', label: 'Annual Edition' },
    route: '/resources/annual-review-2025',
  },
  {
    cat: 'Reports', tag: 'Investment Report',
    title: '2026 Budget Alignment — What It Means for Investors',
    subtitle: 'Ghana\'s 2026 National Budget mapped precisely to the BRIDGE 12-sector investment framework.',
    body: 'Identifies every allocation in Ghana\'s 2026 National Budget with direct implications for BRIDGE ventures — sector-by-sector capital flow analysis, policy tailwinds and headwinds, and priority opportunities created by the 24-Hour Economy, Sankofa Initiative, and infrastructure commitments. Includes a ranked table of budget-accelerated ventures.',
    stat1: { num: 'GH₵', label: '2026 National Budget' },
    stat2: { num: '12', label: 'Sectors Mapped' },
    route: '/resources/budget-alignment',
  },
  {
    cat: 'Reports', tag: 'Regulatory Guide',
    title: 'GIPC Profile Documents',
    subtitle: 'Ghana Investment Promotion Centre regulatory framework and investment facilitation guide.',
    body: 'Essential reference for international investors and diaspora partners entering the Ghanaian market. Covers GIPC registration requirements, minimum capital thresholds by sector, investment guarantees, profit repatriation rights, and the specific provisions applicable to BRIDGE-facilitated ventures.',
    stat1: { num: 'GIPC', label: 'Certified' },
    stat2: { num: '12', label: 'Sectors Covered' },
    route: '/resources?tab=gipc',
  },
  {
    cat: 'Reports', tag: 'Monthly Dashboard',
    title: 'BRIDGE Monthly Dashboard — March 2026',
    subtitle: 'Monthly intelligence snapshot with sector pulse, policy signals, and venture pipeline movement.',
    body: 'The March 2026 edition covers Ghana\'s Q1 economic performance, sector-level developments across the BRIDGE portfolio, key policy signals from the 2026 Budget implementation, and new venture opportunities entering the evaluation pipeline. Published on the first Monday of each month.',
    stat1: { num: 'March', label: '2026 Edition' },
    stat2: { num: '12', label: 'Sectors Tracked' },
    route: '/resources/monthly-dashboard',
  },
  // ── Policy
  {
    cat: 'Policy', tag: 'Living Document',
    title: 'Ghana Policy Tracker — 2025–2026',
    subtitle: 'Living document covering the 2026 Budget, Sankofa Initiative, and the 12-sector policy landscape.',
    body: 'A continuously updated tracking document covering every policy development with implications for BRIDGE ventures — 2026 National Budget breakdown, Sankofa Initiative implementation status, 24-Hour Economy progress, and ministry-level policy signals. Updated when significant policy events occur.',
    stat1: { num: 'Live', label: 'Updated Monthly' },
    stat2: { num: '12', label: 'Sectors Tracked' },
    route: '/resources/policy-tracker',
  },
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

function FeatureCard({ doc, index, onReadDocument }) {
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
            <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, fontWeight: 400, color: C.white, lineHeight: 1.22, marginBottom: 14 }}>{doc.title}</div>
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
            <button className="read-btn" onClick={() => onReadDocument(doc.route)} style={{
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

  // ── DESKTOP LAYOUT ────────────────────────────────────────────────────────
  return (
    <div className="feat-card" style={{
      background: C.deep,
      borderRadius: 20,
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.07)',
      marginBottom: 16,
    }}>
      <div className="feat-inner" style={{ display: 'flex', minHeight: 260 }}>

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
        <div className="feat-content" style={{ flex: 1, padding: '44px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h2 className="feat-title" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, fontWeight: 400, lineHeight: 1.15, color: C.white, margin: '0 0 12px' }}>{doc.title}</h2>
            <p className="feat-subtitle" style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, fontStyle: 'italic', lineHeight: 1.55, color: 'rgba(255,255,255,0.52)', margin: '0 0 22px' }}>{doc.subtitle}</p>
            <p className="feat-body" style={{ fontSize: 14, lineHeight: 1.82, color: 'rgba(255,255,255,0.45)', margin: 0, maxWidth: 560 }}>{doc.body}</p>
          </div>
          <div style={{ marginTop: 36 }}>
            <button className="read-btn" onClick={() => onReadDocument(doc.route)} style={{
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

// ─── MAIN ────────────────────────────────────────────────────────────────────

const allCats = ['All', 'Government', 'Investments', 'Entrepreneurship', 'Business Entities', 'General'];

export default function DocumentLibrary() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [roadmapCat, setRoadmapCat] = useState('All');
  const [pubCat, setPubCat] = useState('All');
  const [showAllDocs, setShowAllDocs] = useState(false);

  const filteredPublished = pubCat === 'All' ? published : published.filter(d => d.cat === pubCat);
  const INITIAL_SHOW = 2;
  const visibleDocs = (pubCat === 'All' && !showAllDocs) ? filteredPublished.slice(0, INITIAL_SHOW) : filteredPublished;
  const hiddenCount = filteredPublished.length - INITIAL_SHOW;

  const handleReadDocument = (route) => {
    navigate(route);
  };

  const handleContactUs = () => {
    navigate('/contact');
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: C.bg, minHeight: '100vh', color: C.text }}>
      <style>{scopedStyles}</style>

      {/* ── HERO ── */}
      <div className="hero-inner" style={{ background: C.cover, padding: '80px 48px 72px' }}>
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
            The complete BRIDGE intelligence library — methodology, sector briefs, reports, policy tracking, and portfolio data. Organized by document type and access level.
          </p>

          {/* Stat strip */}
          <div className="stat-row" style={{ display: 'flex', gap: 56, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.09)' }}>
            {[
              { num: '30', label: 'Documents in Library' },
              { num: '10', label: 'Available Now' },
              { num: '20', label: 'In Development' },
              { num: '5', label: 'Document Categories' },
              { num: '12', label: 'Sectors Covered' },
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
            <FeatureCard key={doc.title} doc={doc} index={i} onReadDocument={handleReadDocument} />
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
              <span style={{ fontFamily: "'DM Serif Display', serif", fontStyle: 'italic', fontSize: 14, color: C.muted }}>II</span>
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
          <div className="roadmap-cta" style={{ marginTop: 40, padding: '28px 36px', background: C.deep, borderRadius: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: C.white, marginBottom: 6 }}>Request advance access to any document in development.</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>Ministries, sector agencies, DFI partners, and qualified investors may request pre-publication access.</div>
            </div>
            <button onClick={handleContactUs} className="roadmap-cta-btn" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 28px', borderRadius: 28, background: C.accent,
              color: C.deep, fontSize: 12, fontWeight: 700,
              letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap',
              border: 'none', cursor: 'pointer',
            }}>
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
