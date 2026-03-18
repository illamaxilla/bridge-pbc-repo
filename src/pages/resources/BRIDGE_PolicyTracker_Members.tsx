import React, { useState, useRef, useEffect } from 'react';

// ─── Design System ───────────────────────────────────────────────────────────
const C = {
  ink:       '#0D1A10',
  paper:     '#FAF8F3',
  paperDark: '#F0EDE4',
  forest:    '#1B4D3E',
  lime:      '#B8D935',
  limeDark:  '#8FA825',
  muted:     '#5C6B5E',
  faint:     '#9AAA9C',
  border:    '#D8D4C8',
  teal:      '#2E5A4D',
  red:       '#A8200D',
  amber:     '#B8730A',
  positive:  '#1A6B2F',
  white:     '#FFFFFF',
};
const F = {
  display: '"Playfair Display","Georgia",serif',
  body:    '"Source Serif 4","Georgia",serif',
  sans:    '"DM Sans","Helvetica Neue",sans-serif',
  mono:    '"DM Mono","Courier New",monospace',
};

// ─── Global Styles ────────────────────────────────────────────────────────────
const Gf = () => (<style>{`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:${C.paper};-webkit-font-smoothing:antialiased;overflow-x:hidden;}
  @media print{.np{display:none!important;}}
  .mob-show{display:none;}
  @media(max-width:900px){
    .tc{grid-template-columns:1fr!important;}
    .hm{display:none!important;}
    .pad-section{padding:40px 32px!important;}
    .pad-cover{padding:28px 32px 0!important;}
    .pad-gate{padding:40px 32px!important;}
    .pad-footer{padding:14px 32px!important;}
    .pad-topbar{padding:10px 20px!important;}
  }
  @media(max-width:600px){
    .tc{grid-template-columns:1fr!important;}
    .pad-section{padding:24px 16px!important;}
    .pad-cover{padding:20px 16px 0!important;}
    .pad-gate{padding:24px 16px!important;}
    .pad-footer{padding:16px 16px!important;}
    .pad-topbar{padding:9px 16px!important;}
    .mob-hide{display:none!important;}
    .mob-show{display:block!important;}
    .mob-stack{flex-direction:column!important;align-items:flex-start!important;gap:10px!important;}
    .mob-full{width:100%!important;}
    .mob-item-hidden{display:none!important;}
    .mob-toggle{display:flex!important;align-items:center;justify-content:space-between;width:100%;
      padding:10px 0;border:none;border-bottom:1px solid ${C.border};background:transparent;
      cursor:pointer;font-family:${F.sans};font-size:10px;font-weight:700;
      letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};}
    .mob-toggle-dark{border-color:rgba(255,255,255,0.12)!important;color:rgba(250,248,243,0.35)!important;}
    .mob-toggle-hdr{border-bottom:1px solid rgba(255,255,255,0.08)!important;color:rgba(250,248,243,0.4)!important;}
    .gate-value-line{display:none!important;}
    .gate-cta-row{flex-direction:column!important;}
    .gate-cta-row a{justify-content:center!important;}
    .footer-links{display:none!important;}
    .footer-inner{justify-content:center!important;}
    .stats-row > div{flex:0 0 50%!important;border-left:none!important;border-top:1px solid rgba(255,255,255,0.08)!important;}
    .stats-row > div:nth-child(2){border-left:1px solid rgba(255,255,255,0.08)!important;}
    .stats-row > div:nth-child(4){border-left:1px solid rgba(255,255,255,0.08)!important;}
    .policy-grid{grid-template-columns:1fr!important;}
    .pillar-grid{grid-template-columns:repeat(4,1fr)!important;}
    .metric-strip{flex-wrap:wrap!important;}
    .metric-strip > div{flex:0 0 50%!important;border-top:1px solid ${C.border}!important;}
    .metric-strip > div:nth-child(1){border-top:none!important;}
    .metric-strip > div:nth-child(2){border-top:none!important;}
    /* Upsell section mobile */
    .upsell-divider{display:none!important;}
    .upsell-col-r{padding-left:0!important;padding-top:20px!important;}
    /* Bottom nav clearance — critical for mobile */
    .nav-clearance{padding-bottom:70px!important;}
    /* Section collapse */
    .sec-body-hidden{display:none!important;}
  }
`}</style>);

// ─── Logo ─────────────────────────────────────────────────────────────────────
const Logo = ({height=28, variant='white'}) => {
  const tf = variant==='white' ? '#ffffff' : '#1B4D3E';
  return (
    <svg height={height} viewBox="0 0 3258.5 932.3" xmlns="http://www.w3.org/2000/svg" style={{display:'block',flexShrink:0}}>
      {/* D */}
      <path fill={tf} d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"/>
      {/* B upper */}
      <path fill={tf} stroke={variant==='white'?'rgba(0,0,0,0.1)':'rgba(27,77,62,0.15)'} strokeWidth=".5" strokeMiterlimit="10" d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"/>
      {/* B lower */}
      <path fill={tf} stroke={variant==='white'?'rgba(0,0,0,0.1)':'rgba(27,77,62,0.15)'} strokeWidth=".5" strokeMiterlimit="10" d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"/>
      {/* R lime bar */}
      <rect fill="#b8d935" x="1427.4" y="17.4" width="205.2" height="145"/>
      {/* I */}
      <rect fill={tf} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/>
      {/* G */}
      <path fill={tf} d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"/>
      {/* E vertical */}
      <rect fill={tf} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/>
      {/* E horizontal bars — always lime */}
      <rect fill="#b8d935" x="3083.4" y="339.5" width="175.1" height="257.7"/>
      <rect fill="#b8d935" x="3083.4" y="654.4" width="175.1" height="257.7"/>
      {/* Icon box */}
      <rect fill="none" stroke={tf} strokeWidth="80" strokeMiterlimit="10" x="40" y="40" width="843.9" height="852.3" rx="36.6" ry="36.6"/>
      {/* Icon diamond — always lime + forest stroke */}
      <polygon fill="#b8d935" stroke="#1b4d3e" strokeMiterlimit="10" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/>
      {/* Icon mid layer */}
      <path fill="#74914a" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z"/>
      {/* Icon bottom layer — always lime */}
      <path fill="#b8d935" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"/>
    </svg>
  );
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const PILLARS = [
  { id:'grow', label:'Grow24', color:C.positive, sectors:'06 · 11' },
  { id:'make', label:'Make24', color:C.teal,    sectors:'04 · 10 · 11' },
  { id:'build', label:'Build24', color:C.forest, sectors:'01 · 08' },
  { id:'connect', label:'Connect24', color:C.ink, sectors:'12' },
  { id:'fund', label:'Fund24', color:C.amber,   sectors:'02' },
  { id:'aspire', label:'Aspire24', color:C.muted, sectors:'05' },
  { id:'care', label:'Care24', color:C.red,     sectors:'03' },
];

const POLICIES = [
  {
    id: 'p01',
    pillar: 'grow',
    title: 'National Oil Palm Development Finance Window',
    body: 'MOFEP / DBG',
    allocation: 'GH₵6.9B (US$500M)',
    status: 'Active',
    statusColor: C.positive,
    timeline: 'H1 2026 deployment',
    sectors: ['Agriculture & Value Chains', 'Manufacturing'],
    bridge: 'Co-financing partner for integrated agriculture hub and processing facilities. 5-year moratorium and 70% project financing terms align with BRIDGE patient capital model.',
    initiatives: ['Oil Palm Processing Hub', 'Cold Storage Network', 'Cooperative Capital Fund'],
    alignment: 95,
    window: 'High urgency — DBG capital window open Q2 2026. First-movers gain preferred terms.',
    urgency: 'high',
  },
  {
    id: 'p02',
    pillar: 'build',
    title: 'Model Markets Programme (GH₵2.2B)',
    body: '24-Hour Economy Authority / MMDAs',
    allocation: 'GH₵2.2B',
    status: 'Active',
    statusColor: C.positive,
    timeline: '260+ district markets, 2026–2028',
    sectors: ['Infrastructure', 'Financial Inclusion'],
    bridge: 'BRIDGE Kejetia Market digitization is the flagship demonstration case. Validates our market infrastructure thesis across 10,000+ traders in West Africa\'s largest market.',
    initiatives: ['Kejetia Market Digitization', 'Digital Payment Rails', 'Market Trader Finance'],
    alignment: 98,
    window: 'Strategic window: 24-Hour Economy Authority operationalizing now. MOU engagement critical before formal structure locks in.',
    urgency: 'high',
  },
  {
    id: 'p03',
    pillar: 'fund',
    title: 'Women\'s Development Bank Capitalization',
    body: 'Ministry of Finance',
    allocation: 'GH₵401M',
    status: 'Active',
    statusColor: C.positive,
    timeline: '2026 operational',
    sectors: ['Financial Inclusion'],
    bridge: 'Complementary partnership: BRIDGE provides business development services and digital payment infrastructure; WDB provides lending capital to market traders and female entrepreneurs.',
    initiatives: ['Market Trader Finance', 'Digital Credit Platform', 'Business Development Services'],
    alignment: 88,
    window: 'Partnership window open — WDB seeking operational partners for trader lending programs.',
    urgency: 'medium',
  },
  {
    id: 'p04',
    pillar: 'build',
    title: 'Big Push Infrastructure Programme',
    body: 'Ministry of Roads & Highways / MoF',
    allocation: 'GH₵30B (multi-year)',
    status: 'Phased',
    statusColor: C.amber,
    timeline: '2026–2030',
    sectors: ['Infrastructure', 'Transportation & Logistics'],
    bridge: 'Supply chain and logistics ventures benefit directly. Agricultural enclave roads (GH₵828M) unlock cold storage and aggregation center deployment across processing corridors.',
    initiatives: ['Agricultural Enclave Roads', 'Logistics Corridor Development', 'Last-Mile Infrastructure'],
    alignment: 82,
    window: 'Medium urgency — infrastructure rollout creates sequenced entry points. Early positioning in enclave corridors most valuable.',
    urgency: 'medium',
  },
  {
    id: 'p05',
    pillar: 'make',
    title: 'Agro-Industrial Parks & Garment Factories',
    body: 'Ministry of Trade & Industry',
    allocation: 'PPP / State-funded',
    status: 'Announced',
    statusColor: C.amber,
    timeline: '7 processing plants + 3 garment factories',
    sectors: ['Manufacturing & Light Industry', 'Agriculture & Value Chains'],
    bridge: 'BRIDGE focuses on supply chain integration and workforce training rather than competing with state-owned factories. Textile ventures, rubber processing, and food processing benefit from raw material restrictions.',
    initiatives: ['Textile Supply Chain', 'Quality Certification Systems', 'Workforce Training Pipeline'],
    alignment: 76,
    window: 'Positioning window — focus on supply chain integration before factory construction finalizes vendor relationships.',
    urgency: 'medium',
  },
  {
    id: 'p06',
    pillar: 'aspire',
    title: 'Free TVET & Adwumawura Enterprise Support',
    body: 'MoE / COTVET',
    allocation: 'GH₵170M TVET + GH₵160M Adwumawura',
    status: 'Active',
    statusColor: C.positive,
    timeline: '500+ BRIDGE ecosystem placements target',
    sectors: ['Education & Skills', 'Technology & Innovation'],
    bridge: 'Aspire24 creates a pipeline of skilled workers directly into BRIDGE ventures. BRIDGE targets 500+ trainee placements, with completion and placement as co-measured outcomes.',
    initiatives: ['Skills-to-Employment Pipeline', 'Digital Coders Programme', 'Apprenticeship Integration'],
    alignment: 85,
    window: 'Active enrollment — COTVET partnerships available for employer placement commitments.',
    urgency: 'medium',
  },
  {
    id: 'p07',
    pillar: 'care',
    title: 'MahamaCares & NHIS Expansion',
    body: 'Ministry of Health / NHIA',
    allocation: 'GH₵2.3B MahamaCares + GH₵9B NHIS',
    status: 'Active',
    statusColor: C.positive,
    timeline: 'Ongoing — 5-year programme',
    sectors: ['Health Systems'],
    bridge: 'Diaspora health professional deployment, community clinic co-investment, and digital health infrastructure align with Care24 priorities. NHIS sustainability creates insurance product opportunities.',
    initiatives: ['Community Health Clinics', 'Diaspora Health Professionals', 'Digital Health Records'],
    alignment: 79,
    window: 'Moderate urgency — MoH receptive to diaspora health partnerships. Clinic licensing engagement recommended.',
    urgency: 'low',
  },
  {
    id: 'p08',
    pillar: 'connect',
    title: 'Connect24 Logistics Corridors',
    body: 'Ministry of Transport / Ghana Ports',
    allocation: 'GH₵4.3B roads + port expansion',
    status: 'Phased',
    statusColor: C.amber,
    timeline: '2026–2029',
    sectors: ['Transportation & Logistics'],
    bridge: 'Logistics corridor development directly enables cold chain, last-mile distribution, and freight management ventures. Intermodal hubs create anchor infrastructure for BRIDGE logistics portfolio.',
    initiatives: ['Freight Management Platform', 'Last-Mile Distribution', 'Cold Chain Logistics'],
    alignment: 80,
    window: 'Infrastructure first — logistics ventures can sequence entry after corridor construction milestones.',
    urgency: 'low',
  },
  {
    id: 'p09',
    pillar: 'build',
    title: 'Affordable Housing & Rent-to-Own Programme',
    body: 'Ministry of Works & Housing / SSNIT',
    allocation: 'GH₵500M+ (blended)',
    status: 'Active',
    statusColor: C.positive,
    timeline: '2026 pilots',
    sectors: ['Housing & Real Estate'],
    bridge: 'BRIDGE housing ventures align with rent-to-own framework and informal settlement upgrading priorities. SSNIT mortgage product expansion creates co-lending opportunities.',
    initiatives: ['Affordable Housing Development', 'Rent-to-Own Structures', 'Settlement Upgrading'],
    alignment: 74,
    window: 'Partnership window open — SSNIT and Social Housing Fund seeking private development partners.',
    urgency: 'medium',
  },
  {
    id: 'p10',
    pillar: 'grow',
    title: 'Sankofa Initiative — Diaspora as 17th Region',
    body: 'Office of the President / Office of Diaspora Affairs',
    allocation: 'Presidential Priority',
    status: 'Active',
    statusColor: C.positive,
    timeline: 'Operationalizing 2026',
    sectors: ['All Sectors'],
    bridge: 'Policy validation of BRIDGE\'s entire operating model. Formal recognition of diaspora citizenship, Sankofa Freedom Monument Hubs in Toronto, US, UK, Germany, and Brazil create global infrastructure for BRIDGE member recruitment.',
    initiatives: ['BRIDGE Member Recruitment', 'Sankofa Hub Integration', 'Investment Facilitation'],
    alignment: 92,
    window: 'Critical window — engagement with Diaspora Affairs before Sankofa institutional structure locks in positions BRIDGE as preferred operating partner.',
    urgency: 'high',
  },
  {
    id: 'p11',
    pillar: 'make',
    title: 'Energy Transition & SREP Programme',
    body: 'Ministry of Energy & Green Transition',
    allocation: 'US$100M+ (SREP + co-financing)',
    status: 'Active',
    statusColor: C.positive,
    timeline: 'Ongoing',
    sectors: ['Energy & Renewable Resources'],
    bridge: 'Mini-grid deployment, solar installations, and clean cooking ventures align with SREP priorities. Clean Cooking Outcome Bond creates results-based financing opportunity.',
    initiatives: ['Mini-Grid Deployment', 'Solar Cold Storage', 'Clean Cooking Programme'],
    alignment: 83,
    window: 'SREP co-financing available — BRIDGE energy ventures eligible for patient capital terms.',
    urgency: 'medium',
  },
  {
    id: 'p12',
    pillar: 'grow',
    title: 'Creative Arts Fund & Film Commission',
    body: 'Ministry of Tourism, Arts & Culture',
    allocation: 'Dedicated fund (amount TBC)',
    status: 'Announced',
    statusColor: C.amber,
    timeline: '2026 establishment',
    sectors: ['Sports, Entertainment & Creative Industries', 'Tourism & Hospitality'],
    bridge: 'Film, music, fashion, and sports ventures gain government distribution infrastructure and co-financing eligibility. Tourism digital platforms align with Visit Ghana 2027 priorities.',
    initiatives: ['Film Production Fund', 'Music Distribution Platform', 'Tourism Digital Infrastructure'],
    alignment: 71,
    window: 'Early positioning — Fund governance being established. Engagement with Ministry of Tourism creates founding partner status.',
    urgency: 'low',
  },
];

const BUDGET_CONTEXT = {
  theme: '"Resetting for Growth, Jobs, and Economic Transformation"',
  minister: 'Dr. Cassiel Ato Forson (MP)',
  totalAligned: 'GH₵150B+',
  pillarsCount: 7,
  directAlignment: 12,
  quote: 'This is not merely policy alignment — it is policy validation.',
};

const METRICS = [
  { label:'Budget Policies Tracked', value:'12', note:'Across all 24H+ pillars' },
  { label:'Average Alignment Score', value:'83%', note:'BRIDGE portfolio average' },
  { label:'High-Urgency Windows', value:'3', note:'Immediate action required' },
  { label:'Total Budget Aligned', value:'GH₵150B+', note:'2026 + multi-year commitments' },
  { label:'Sectors Covered', value:'12 / 12', note:'Full portfolio alignment' },
  { label:'Partnership Windows Open', value:'8', note:'Active engagement possible' },
];

// ─── isMobile hook ────────────────────────────────────────────────────────────
const useIsMobile = () => {
  const [mob, setMob] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth <= 600
  );
  useEffect(() => {
    const fn = () => setMob(window.innerWidth <= 600);
    window.addEventListener('resize', fn, {passive:true});
    return () => window.removeEventListener('resize', fn);
  }, []);
  return mob;
};

// ─── Section registry — drives bottom nav dots + labels ──────────────────────
const SECS = [
  { id:'sec-cover',    label:'Overview'            },
  { id:'sec-context',  label:'Budget Context'      },
  { id:'sec-metrics',  label:'Key Metrics'         },
  { id:'sec-policies', label:'Policy Tracker'      },
  { id:'sec-pillars',  label:'24H+ Pillars'        },
  { id:'sec-imperatives', label:'Strategic Actions'},
  { id:'sec-partners', label:'Partnership Modes'   },
  { id:'sec-legis',    label:'Legislation'         },
  { id:'sec-risks',    label:'Risk Register'       },
  { id:'sec-budget',   label:'Execution Monitor'   },
  { id:'sec-integration', label:'Integration Map'  },
  { id:'sec-members',  label:'Membership'          },
];

// ─── ReadingProgressBar (replaces TopBar) ─────────────────────────────────────
// Sticky top bar with: 2px lime progress line, scroll-aware logo reveal,
// section label, LIVE badge, Members CTA
const ReadingProgressBar = ({coverLogoRef}) => {
  const [pct, setPct] = useState(0);
  const [past, setPast] = useState(false);

  useEffect(() => {
    const fn = () => {
      const doc = document.documentElement;
      const scrolled = doc.scrollTop || document.body.scrollTop;
      const total = doc.scrollHeight - doc.clientHeight;
      setPct(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
      if (coverLogoRef?.current) {
        setPast(coverLogoRef.current.getBoundingClientRect().bottom < 0);
      }
    };
    window.addEventListener('scroll', fn, {passive:true});
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, [coverLogoRef]);

  return (
    <div className="np pad-topbar" style={{
      position:'sticky', top:0, zIndex:100, background:C.paper,
      borderBottom:`1px solid ${C.border}`, padding:'10px 40px',
      display:'flex', justifyContent:'space-between', alignItems:'center',
      boxShadow:'0 1px 6px rgba(0,0,0,0.06)', overflow:'hidden',
    }}>
      {/* Progress line — absolute bottom edge */}
      <div style={{
        position:'absolute', bottom:0, left:0, height:'2px',
        width:`${pct}%`, background:C.lime,
        transition:'width 0.1s linear', pointerEvents:'none',
      }}/>
      {/* Left: animated logo + label */}
      <div style={{display:'flex', alignItems:'center', gap:'10px', minWidth:0, overflow:'hidden'}}>
        <div style={{
          overflow:'hidden', maxWidth:past?'180px':'0px', opacity:past?1:0,
          transition:'max-width 0.35s ease, opacity 0.3s ease',
          display:'flex', alignItems:'center', flexShrink:0,
        }}>
          <Logo height={18} variant="dark"/>
          <div style={{width:'1px', height:'14px', background:C.border, margin:'0 10px', flexShrink:0}}/>
        </div>
        <span className="mob-hide" style={{fontFamily:F.sans, fontSize:'11px', color:C.muted, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
          Policy Intelligence · Ghana 2026 Budget Tracker · Full Members Edition
        </span>
        <span className="mob-show" style={{fontFamily:F.sans, fontSize:'11px', fontWeight:700, color:C.forest}}>
          Policy Tracker · Members
        </span>
      </div>
      {/* Right: CTAs */}
      <div style={{display:'flex', gap:'10px', alignItems:'center', flexShrink:0}}>
        <span className="mob-hide" style={{fontFamily:F.sans, fontSize:'10px', fontWeight:700, color:C.lime, background:C.forest, padding:'5px 10px', letterSpacing:'1px'}}>
          ● LIVE
        </span>
        <a href="#sec-members" style={{background:C.forest, color:C.lime, padding:'7px 14px', fontFamily:F.sans, fontSize:'10px', fontWeight:700, textDecoration:'none', letterSpacing:'0.3px'}}>Members →</a>
      </div>
    </div>
  );
};

// ─── SectionFooterNav ─────────────────────────────────────────────────────────
// Fixed bottom bar: section dots + prev/next arrows + current section label
const SectionFooterNav = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = SECS.findIndex(s => s.id === e.target.id);
          if (idx >= 0) setActive(idx);
        }
      });
    }, {rootMargin:'-40% 0px -55% 0px'});
    SECS.forEach(s => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const goTo = (idx) => {
    const clamped = Math.max(0, Math.min(SECS.length - 1, idx));
    const el = document.getElementById(SECS[clamped].id);
    if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
    setActive(clamped);
  };

  return (
    <div className="np" style={{
      position:'fixed', bottom:0, left:0, right:0, zIndex:200,
      background:'rgba(13,26,16,0.97)', borderTop:`1px solid rgba(184,217,53,0.12)`,
      backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)',
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'10px 20px', gap:'12px',
    }}>
      {/* ← Prev */}
      <button onClick={() => goTo(active - 1)} disabled={active===0} style={{
        width:'34px', height:'34px', flexShrink:0,
        background:active===0?'rgba(255,255,255,0.03)':'rgba(255,255,255,0.07)',
        border:'1px solid rgba(255,255,255,0.1)',
        cursor:active===0?'default':'pointer',
        display:'flex', alignItems:'center', justifyContent:'center',
        opacity:active===0?0.3:1, transition:'all 0.2s',
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.lime} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      {/* Center: label + dots */}
      <div style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'7px', minWidth:0, overflow:'hidden'}}>
        <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'rgba(255,255,255,0.45)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:'100%'}}>
          <span style={{color:C.lime, marginRight:'6px'}}>§ {String(active+1).padStart(2,'0')}</span>
          {SECS[active]?.label}
        </div>
        <div style={{display:'flex', gap:'5px', alignItems:'center'}}>
          {SECS.map((_,i) => (
            <div key={i} onClick={() => goTo(i)} style={{
              width:i===active?'20px':'6px', height:'6px', borderRadius:'3px',
              background:i===active?C.lime:'rgba(255,255,255,0.18)',
              cursor:'pointer', transition:'all 0.3s ease', flexShrink:0,
            }}/>
          ))}
        </div>
      </div>

      {/* → Next */}
      <button onClick={() => goTo(active + 1)} disabled={active===SECS.length-1} style={{
        width:'34px', height:'34px', flexShrink:0,
        background:active===SECS.length-1?'rgba(255,255,255,0.03)':C.forest,
        border:`1px solid ${active===SECS.length-1?'rgba(255,255,255,0.1)':'rgba(184,217,53,0.2)'}`,
        cursor:active===SECS.length-1?'default':'pointer',
        display:'flex', alignItems:'center', justifyContent:'center',
        opacity:active===SECS.length-1?0.3:1, transition:'all 0.2s',
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.lime} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </div>
  );
};

// ─── Cover ────────────────────────────────────────────────────────────────────
const Cover = ({logoRef}) => (
  <div id="sec-cover" className="pad-cover" style={{background:C.ink, padding:'60px 64px 0', position:'relative', overflow:'hidden'}}>
    {/* Watermark */}
    <div style={{position:'absolute', right:'-10px', top:'20px', fontFamily:F.display, fontSize:'clamp(100px,20vw,280px)', fontWeight:900, color:'rgba(255,255,255,0.025)', pointerEvents:'none', userSelect:'none', letterSpacing:'-6px', lineHeight:1}}>
      2026
    </div>
    <div style={{maxWidth:'900px', margin:'0 auto', position:'relative'}}>
      {/* Logo row */}
      <div ref={logoRef} style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'40px', flexWrap:'wrap', gap:'16px'}}>
        <Logo height={28} variant="white"/>
        <div className="mob-hide" style={{textAlign:'right'}}>
          <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2.5px', color:'rgba(250,248,243,0.3)', textTransform:'uppercase', marginBottom:'4px'}}>Edition</div>
          <div style={{fontFamily:F.mono, fontSize:'11px', color:C.lime}}>Q1 · March 2026</div>
        </div>
      </div>

      {/* Eyebrow */}
      <div style={{display:'flex', alignItems:'center', gap:'12px', marginBottom:'18px', flexWrap:'wrap'}}>
        <span style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2.5px', color:C.lime, textTransform:'uppercase'}}>Policy Intelligence Brief</span>
        <span className="mob-hide" style={{width:'24px', height:'1px', background:C.lime, display:'inline-block'}}/>
        <span className="mob-hide" style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', color:'rgba(250,248,243,0.3)', textTransform:'uppercase'}}>Full Members Edition</span>
      </div>

      {/* Headline */}
      <h1 style={{fontFamily:F.display, fontSize:'clamp(32px,5.5vw,68px)', fontWeight:900, color:C.paper, lineHeight:1.05, marginBottom:'24px', maxWidth:'800px'}}>
        Ghana 2026 Budget<br/>
        <span style={{fontStyle:'italic', color:C.lime}}>Policy Alignment</span> Tracker
      </h1>

      {/* Sub */}
      <p style={{fontFamily:F.body, fontSize:'17px', lineHeight:1.75, color:'rgba(250,248,243,0.6)', maxWidth:'580px', marginBottom:'40px', fontWeight:300}}>
        A live intelligence resource tracking every policy initiative, budget allocation, and partnership window in Ghana's 2026 fiscal framework — mapped to BRIDGE's twelve-sector portfolio.
      </p>

      {/* Budget theme box */}
      <div style={{borderLeft:`3px solid ${C.lime}`, paddingLeft:'18px', marginBottom:'44px', maxWidth:'580px'}}>
        <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', color:'rgba(250,248,243,0.3)', textTransform:'uppercase', marginBottom:'6px'}}>2026 Budget Theme</div>
        <p style={{fontFamily:F.display, fontSize:'16px', fontStyle:'italic', color:C.paper, lineHeight:1.5}}>
          {BUDGET_CONTEXT.theme}
        </p>
        <div style={{fontFamily:F.sans, fontSize:'11px', color:'rgba(250,248,243,0.4)', marginTop:'6px'}}>
          Presented by {BUDGET_CONTEXT.minister}, Minister for Finance
        </div>
      </div>

      {/* Stats strip */}
      <div className="stats-row" style={{display:'flex', borderTop:`1px solid rgba(255,255,255,0.08)`, flexWrap:'wrap'}}>
        {[
          { v:'12', l:'Policies Tracked' },
          { v:'7', l:'Budget Pillars' },
          { v:'GH₵150B+', l:'Total Aligned' },
          { v:'83%', l:'Avg Alignment Score' },
        ].map((s,i) => (
          <div key={i} style={{flex:'1', minWidth:'120px', padding:'20px 24px', borderLeft:i>0?`1px solid rgba(255,255,255,0.08)`:'none'}}>
            <div style={{fontFamily:F.mono, fontSize:'clamp(20px,3vw,32px)', fontWeight:500, color:C.lime, marginBottom:'4px'}}>{s.v}</div>
            <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', color:'rgba(255,255,255,0.28)', textTransform:'uppercase'}}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Budget Context ────────────────────────────────────────────────────────────
const BudgetContext = () => {
  const [open, setOpen] = useState(() => typeof window==='undefined' || window.innerWidth > 600);
  return (
  <div id="sec-context" className="pad-section" style={{background:C.paper, padding:'48px 64px'}}>
    <div style={{maxWidth:'900px', margin:'0 auto'}}>
      <div style={{borderTop:`6px solid ${C.ink}`, borderBottom:`2px solid ${C.lime}`, paddingBottom:'3px', marginBottom:'20px'}} className="mob-hide"/>
      {/* Mobile accordion trigger */}
      <button className="mob-toggle" onClick={() => setOpen(o=>!o)}>
        <span>Budget Context</span>
        <span style={{transition:'transform 0.25s', display:'inline-block', transform:open?'rotate(0deg)':'rotate(-90deg)'}}>↓</span>
      </button>
      <div className={open ? '' : 'sec-body-hidden'}>
      <div style={{fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:C.muted, marginBottom:'18px'}}>
        The Convergence Context
      </div>
      <div className="tc" style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:'48px', alignItems:'start'}}>
        <div>
          <h2 style={{fontFamily:F.display, fontSize:'clamp(20px,3vw,34px)', fontWeight:700, color:C.ink, lineHeight:1.2, marginBottom:'20px'}}>
            For the first time, national policy and diaspora-driven development are in full alignment
          </h2>
          <p style={{fontFamily:F.body, fontSize:'15px', lineHeight:1.85, color:C.ink, fontWeight:300, marginBottom:'16px'}}>
            Ghana's 2026 Budget Statement, presented under the theme "Resetting for Growth, Jobs, and Economic Transformation," represents a watershed moment. The Mahama administration's 24-Hour Economy framework creates seven policy pillars — Grow24, Make24, Build24, Connect24, Fund24, Aspire24, and Care24 — that map precisely to BRIDGE's twelve-sector portfolio.
          </p>
          <p style={{fontFamily:F.body, fontSize:'15px', lineHeight:1.85, color:C.ink, fontWeight:300, marginBottom:'24px'}}>
            Government has committed over GH₵110 billion in 2026 alone to programs that advance Peace &amp; Prosperity outcomes. The budget's emphasis on leveraging seed capital with private and development finance explicitly validates BRIDGE's blended finance model.
          </p>
          {/* Pull quote */}
          <div style={{borderLeft:`3px solid ${C.lime}`, paddingLeft:'18px', margin:'24px 0'}}>
            <p style={{fontFamily:F.display, fontSize:'17px', fontStyle:'italic', fontWeight:600, color:C.forest, lineHeight:1.55}}>
              "This is not merely policy alignment — it is policy validation."
            </p>
          </div>
          <p style={{fontFamily:F.body, fontSize:'14px', lineHeight:1.8, color:C.muted, fontWeight:300}}>
            When government commits GH₵2.2 billion to Model Markets, it validates BRIDGE's Kejetia flagship. When government establishes a US$500M Oil Palm Finance Window, it validates BRIDGE's agricultural processing thesis. When government creates dedicated Film and Creative Arts Funds, it validates BRIDGE's creative industry ventures.
          </p>
        </div>

        {/* Right: 24H+ Pillars */}
        <div>
          <div style={{background:C.forest, padding:'20px'}}>
            <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:C.lime, marginBottom:'14px'}}>
              The 24H+ Framework
            </div>
            {PILLARS.map((p,i) => (
              <div key={i} style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:i<6?`1px solid rgba(255,255,255,0.06)`:'none'}}>
                <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                  <span style={{fontFamily:F.sans, fontSize:'12px', fontWeight:700, color:C.paper}}>{p.label}</span>
                </div>
                <span style={{fontFamily:F.mono, fontSize:'10px', color:'rgba(250,248,243,0.4)'}}>Sec {p.sectors}</span>
              </div>
            ))}
          </div>

          {/* Sankofa box */}
          <div style={{border:`1px solid ${C.border}`, padding:'16px', marginTop:'14px'}}>
            <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:C.muted, marginBottom:'8px'}}>
              The Sankofa Initiative
            </div>
            <p style={{fontFamily:F.body, fontSize:'12px', lineHeight:1.7, color:C.ink, fontWeight:300}}>
              Diaspora recognized as Ghana's "17th Region." Sankofa Freedom Monument Hubs operationalizing in Toronto, US, UK, Germany, and Brazil — creating global infrastructure for BRIDGE member engagement.
            </p>
          </div>
        </div>
      </div>
      </div>{/* end collapsible */}
    </div>
  </div>
  );
};

// ─── Metrics Strip ─────────────────────────────────────────────────────────────
const MetricsStrip = () => (
  <div id="sec-metrics" style={{background:C.paperDark, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px', margin:'0 auto'}}>
      <div className="metric-strip" style={{display:'flex'}}>
        {METRICS.map((m,i) => (
          <div key={i} style={{flex:'1', minWidth:'120px', padding:'20px 24px', borderLeft:i>0?`1px solid ${C.border}`:'none', textAlign:'center'}}>
            <div style={{fontFamily:F.mono, fontSize:'22px', fontWeight:500, color:C.forest, marginBottom:'3px'}}>{m.value}</div>
            <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', color:C.muted, textTransform:'uppercase', marginBottom:'2px'}}>{m.label}</div>
            <div style={{fontFamily:F.body, fontSize:'10px', fontStyle:'italic', color:C.faint}}>{m.note}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Policy Card ───────────────────────────────────────────────────────────────
const PolicyCard = ({policy, expanded, onToggle}) => {
  const pillar = PILLARS.find(p => p.id === policy.pillar) || PILLARS[0];
  const urgencyColor = policy.urgency === 'high' ? C.red : policy.urgency === 'medium' ? C.amber : C.positive;
  const urgencyLabel = policy.urgency === 'high' ? '● High Priority' : policy.urgency === 'medium' ? '◐ Medium' : '○ Monitoring';

  return (
    <div style={{
      border:`1px solid ${C.border}`,
      background:C.white || '#fff',
      marginBottom:'2px',
      transition:'box-shadow 0.2s ease',
    }}>
      {/* Card Header — always visible */}
      <button onClick={onToggle} style={{
        width:'100%', padding:'18px 20px', background:'transparent', border:'none',
        cursor:'pointer', textAlign:'left', display:'flex', alignItems:'flex-start', gap:'14px',
      }}>
        {/* Alignment score bar */}
        <div style={{flexShrink:0, width:'4px', height:'56px', background:C.border, position:'relative', marginTop:'2px'}}>
          <div style={{position:'absolute', bottom:0, left:0, width:'100%', height:`${policy.alignment}%`, background:C.lime, transition:'height 0.5s ease'}}/>
        </div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'12px', marginBottom:'6px', flexWrap:'wrap'}}>
            <div style={{display:'flex', gap:'8px', alignItems:'center', flexWrap:'wrap'}}>
              <span style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:pillar.color, flexShrink:0}}>
                {pillar.label}
              </span>
              <span style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, color:urgencyColor, letterSpacing:'1px', flexShrink:0}}>
                {urgencyLabel}
              </span>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:'6px', flexShrink:0}}>
              <span style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, color:policy.statusColor, letterSpacing:'1px', textTransform:'uppercase'}}>{policy.status}</span>
              <span style={{fontFamily:F.mono, fontSize:'11px', fontWeight:700, color:C.forest}}>{policy.alignment}%</span>
            </div>
          </div>
          <div style={{fontFamily:F.sans, fontSize:'13px', fontWeight:700, color:C.ink, lineHeight:1.3, marginBottom:'4px'}}>{policy.title}</div>
          <div style={{display:'flex', gap:'12px', flexWrap:'wrap'}}>
            <span style={{fontFamily:F.sans, fontSize:'10px', color:C.muted}}>{policy.body}</span>
            <span style={{fontFamily:F.mono, fontSize:'10px', fontWeight:700, color:C.teal}}>{policy.allocation}</span>
          </div>
        </div>
        <div style={{flexShrink:0, fontFamily:F.mono, fontSize:'14px', color:C.faint, transition:'transform 0.2s', transform:expanded?'rotate(180deg)':'none'}}>↓</div>
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div style={{padding:'0 20px 20px 38px', borderTop:`1px solid ${C.border}`}}>
          {/* Timeline */}
          <div style={{padding:'12px 0 14px', display:'flex', gap:'24px', flexWrap:'wrap'}}>
            <div>
              <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', color:C.muted, textTransform:'uppercase', marginBottom:'3px'}}>Timeline</div>
              <div style={{fontFamily:F.mono, fontSize:'11px', color:C.forest}}>{policy.timeline}</div>
            </div>
            <div>
              <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', color:C.muted, textTransform:'uppercase', marginBottom:'3px'}}>Sectors</div>
              <div style={{fontFamily:F.sans, fontSize:'11px', color:C.ink}}>{policy.sectors.join(' · ')}</div>
            </div>
          </div>

          {/* BRIDGE Role */}
          <div style={{background:C.paperDark, padding:'14px', marginBottom:'14px'}}>
            <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:C.muted, marginBottom:'8px'}}>BRIDGE Role & Alignment</div>
            <p style={{fontFamily:F.body, fontSize:'13px', lineHeight:1.75, color:C.ink, fontWeight:300}}>{policy.bridge}</p>
          </div>

          {/* Ventures */}
          <div style={{marginBottom:'14px'}}>
            <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', color:C.muted, textTransform:'uppercase', marginBottom:'8px'}}>Aligned Ventures</div>
            <div style={{display:'flex', gap:'8px', flexWrap:'wrap'}}>
              {policy.initiatives.map((v,i) => (
                <span key={i} style={{fontFamily:F.sans, fontSize:'10px', fontWeight:700, color:C.forest, border:`1px solid ${C.border}`, padding:'4px 10px', letterSpacing:'0.3px'}}>
                  → {v}
                </span>
              ))}
            </div>
          </div>

          {/* Strategic window */}
          <div style={{borderLeft:`3px solid ${urgencyColor}`, paddingLeft:'12px'}}>
            <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', color:C.muted, textTransform:'uppercase', marginBottom:'5px'}}>Strategic Window</div>
            <p style={{fontFamily:F.body, fontSize:'12px', lineHeight:1.7, color:C.ink, fontStyle:'italic', fontWeight:300}}>{policy.window}</p>
          </div>

          {/* Alignment score bar */}
          <div style={{marginTop:'16px'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'4px'}}>
              <span style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', color:C.muted, textTransform:'uppercase'}}>Portfolio Alignment Score</span>
              <span style={{fontFamily:F.mono, fontSize:'11px', fontWeight:700, color:C.forest}}>{policy.alignment}%</span>
            </div>
            <div style={{height:'4px', background:C.border}}>
              <div style={{height:'100%', width:`${policy.alignment}%`, background:C.lime}}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Policy Grid ───────────────────────────────────────────────────────────────
const PolicyGrid = () => {
  const [activePillar, setActivePillar] = useState('all');
  const [activeUrgency, setActiveUrgency] = useState('all');
  const [expandedId, setExpandedId] = useState(null);
  const [mobExpanded, setMobExpanded] = useState(false);
  const MOB_INIT = 4;

  const filtered = POLICIES.filter(p => {
    const pillarMatch = activePillar === 'all' || p.pillar === activePillar;
    const urgencyMatch = activeUrgency === 'all' || p.urgency === activeUrgency;
    return pillarMatch && urgencyMatch;
  });

  const displayed = mobExpanded ? filtered : filtered;

  return (
    <div id="sec-policies" className="pad-section" style={{background:C.paperDark, padding:'48px 64px'}}>
      <div style={{maxWidth:'900px', margin:'0 auto'}}>
        <div style={{borderTop:`6px solid ${C.ink}`, borderBottom:`2px solid ${C.lime}`, paddingBottom:'3px', marginBottom:'20px'}}/>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'28px', flexWrap:'wrap', gap:'16px'}}>
          <div>
            <div style={{fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:C.muted, marginBottom:'6px'}}>Live Policy Tracker</div>
            <h2 style={{fontFamily:F.display, fontSize:'clamp(20px,3vw,34px)', fontWeight:700, color:C.ink, lineHeight:1.2}}>
              2026 Budget Alignment Grid
            </h2>
          </div>
          <div style={{fontFamily:F.mono, fontSize:'11px', color:C.muted}}>
            {filtered.length} of {POLICIES.length} policies
          </div>
        </div>

        {/* Filter bar */}
        <div style={{display:'flex', gap:'8px', flexWrap:'wrap', marginBottom:'24px', alignItems:'center'}}>
          <span style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', color:C.muted, textTransform:'uppercase', marginRight:'4px'}}>Filter:</span>
          {[{id:'all',label:'All Pillars'}, ...PILLARS.map(p => ({id:p.id, label:p.label}))].map(f => (
            <button key={f.id} onClick={() => setActivePillar(f.id)} style={{
              fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1px',
              textTransform:'uppercase', padding:'5px 10px',
              background:activePillar===f.id ? C.lime : 'transparent',
              color:activePillar===f.id ? C.ink : C.muted,
              border:`1px solid ${activePillar===f.id ? C.lime : C.border}`,
              cursor:'pointer', transition:'all 0.15s ease',
            }}>
              {f.label}
            </button>
          ))}
          <div style={{width:'1px', height:'20px', background:C.border, margin:'0 4px'}}/>
          {[{id:'all',label:'All'},{id:'high',label:'High Priority'},{id:'medium',label:'Medium'},{id:'low',label:'Monitor'}].map(u => (
            <button key={u.id} onClick={() => setActiveUrgency(u.id)} style={{
              fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1px',
              textTransform:'uppercase', padding:'5px 10px',
              background:activeUrgency===u.id ? C.ink : 'transparent',
              color:activeUrgency===u.id ? C.paper : C.muted,
              border:`1px solid ${activeUrgency===u.id ? C.ink : C.border}`,
              cursor:'pointer', transition:'all 0.15s ease',
            }}>
              {u.label}
            </button>
          ))}
        </div>

        {/* Policy list */}
        <div>
          {displayed.slice(0, mobExpanded ? displayed.length : MOB_INIT).map((p, i) => (
            <div key={p.id} className={i >= MOB_INIT ? (mobExpanded ? '' : 'mob-item-hidden') : ''}>
              <PolicyCard
                policy={p}
                expanded={expandedId === p.id}
                onToggle={() => setExpandedId(expandedId === p.id ? null : p.id)}
              />
            </div>
          ))}
          {displayed.length > MOB_INIT && (
            <button className="mob-show mob-toggle" onClick={() => setMobExpanded(o => !o)}>
              <span>{mobExpanded ? `Show less ↑` : `View ${displayed.length - MOB_INIT} more policies ↓`}</span>
            </button>
          )}
          {filtered.length === 0 && (
            <div style={{padding:'48px', textAlign:'center', fontFamily:F.body, fontSize:'14px', fontStyle:'italic', color:C.faint}}>
              No policies match the selected filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Pillar Map ────────────────────────────────────────────────────────────────
const PillarMap = () => {
  const [hoveredPillar, setHoveredPillar] = useState(null);
  const [open, setOpen] = useState(() => typeof window==='undefined' || window.innerWidth > 600);
  const pillarPolicies = (id) => POLICIES.filter(p => p.pillar === id);
  const avgAlignment = (id) => {
    const ps = pillarPolicies(id);
    return ps.length ? Math.round(ps.reduce((s,p) => s+p.alignment, 0) / ps.length) : 0;
  };

  return (
    <div id="sec-pillars" className="pad-section" style={{background:C.paper, padding:'48px 64px'}}>
      <div style={{maxWidth:'900px', margin:'0 auto'}}>
        <div style={{borderTop:`6px solid ${C.ink}`, borderBottom:`2px solid ${C.lime}`, paddingBottom:'3px', marginBottom:'20px'}} className="mob-hide"/>
        <button className="mob-toggle" onClick={() => setOpen(o=>!o)}>
          <span>24H+ Pillar Map</span>
          <span style={{transition:'transform 0.25s', display:'inline-block', transform:open?'rotate(0deg)':'rotate(-90deg)'}}>↓</span>
        </button>
        <div className={open ? '' : 'sec-body-hidden'}>
        <div style={{fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:C.muted, marginBottom:'16px'}}>
          24H+ Pillar Map
        </div>
        <h2 style={{fontFamily:F.display, fontSize:'clamp(20px,3vw,34px)', fontWeight:700, color:C.ink, lineHeight:1.2, marginBottom:'8px'}}>
          Seven Pillars, Twelve Sectors, One Strategy
        </h2>
        <p style={{fontFamily:F.body, fontSize:'15px', lineHeight:1.8, color:C.muted, fontWeight:300, marginBottom:'32px', maxWidth:'600px'}}>
          The 24-Hour Economy framework maps directly to BRIDGE's portfolio. Each pillar aligns one or more sectors, creating integrated deployment pathways.
        </p>

        <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:'2px'}} className="pillar-grid">
          {PILLARS.map((p) => {
            const ps = pillarPolicies(p.id);
            const avg = avgAlignment(p.id);
            const hovered = hoveredPillar === p.id;
            return (
              <div key={p.id}
                onMouseEnter={() => setHoveredPillar(p.id)}
                onMouseLeave={() => setHoveredPillar(null)}
                style={{
                  background: hovered ? C.forest : C.paperDark,
                  border:`1px solid ${hovered ? C.forest : C.border}`,
                  padding:'16px 12px', cursor:'default', transition:'all 0.2s ease',
                  textAlign:'center',
                }}>
                <div style={{fontFamily:F.sans, fontSize:'10px', fontWeight:700, color:hovered?C.lime:C.forest, letterSpacing:'0.5px', marginBottom:'8px'}}>{p.label}</div>
                <div style={{fontFamily:F.mono, fontSize:'20px', fontWeight:500, color:hovered?C.paper:C.ink, marginBottom:'4px'}}>{avg}%</div>
                <div style={{fontFamily:F.sans, fontSize:'9px', color:hovered?'rgba(250,248,243,0.5)':C.faint, marginBottom:'8px'}}>{ps.length} polic{ps.length===1?'y':'ies'}</div>
                <div style={{height:'3px', background:hovered?'rgba(255,255,255,0.15)':C.border}}>
                  <div style={{height:'100%', width:`${avg}%`, background:C.lime}}/>
                </div>
              </div>
            );
          })}
        </div>
        </div>{/* end collapsible */}
      </div>
    </div>
  );
};

// ─── Strategic Imperatives ─────────────────────────────────────────────────────
const Imperatives = () => {
  const [open, setOpen] = useState(false);
  const items = [
    {
      rank:'01', urgency:'Immediate',
      title:'Engage the 24-Hour Economy Authority',
      body:'The 24-Hour Economy Authority is operationalizing now. Present the Model Market technical framework, propose Kejetia as flagship demonstration, and establish formal MOU before institutional structure is locked in. This is the single highest-priority government engagement.',
      timeline:'Q1–Q2 2026',
      color:C.red,
    },
    {
      rank:'02', urgency:'Immediate',
      title:'Activate DBG Oil Palm Finance Window',
      body:'The GH₵6.9B Oil Palm Finance Window offers 5-year moratorium and 70% project financing terms. First movers gain preferred co-financing arrangements. BRIDGE integrated agriculture hub and processing facilities qualify directly.',
      timeline:'Q2 2026',
      color:C.red,
    },
    {
      rank:'03', urgency:'Immediate',
      title:'Position BRIDGE as Sankofa Operating Partner',
      body:'Engagement with the Office of Diaspora Affairs before the Sankofa institutional structure is finalized creates founding partner status. Sankofa Freedom Monument Hubs in five global cities are direct BRIDGE member recruitment infrastructure.',
      timeline:'Q1 2026',
      color:C.red,
    },
    {
      rank:'04', urgency:'Q2 2026',
      title:'Establish WDB Complementary Partnership',
      body:'Women\'s Development Bank (GH₵401M capitalization) is seeking operational partners for trader lending. BRIDGE provides business development services and digital payment infrastructure; WDB provides lending capital. Shared outcomes for trader prosperity.',
      timeline:'Q2 2026',
      color:C.amber,
    },
    {
      rank:'05', urgency:'Q2 2026',
      title:'Commence COTVET Placement Commitments',
      body:'Free TVET enrollment is active. COTVET is receptive to employer placement commitments. BRIDGE targets 500+ trainee placements across the portfolio, creating a measurable skills-to-employment pipeline aligned with Aspire24.',
      timeline:'Q2–Q3 2026',
      color:C.amber,
    },
    {
      rank:'06', urgency:'Q3 2026',
      title:'Sequence Agricultural Enclave Road Entry',
      body:'GH₵828M agricultural enclave road program unlocks cold storage and market aggregation center deployment. BRIDGE logistics and agriculture ventures should sequence entry points around enclave corridor construction milestones.',
      timeline:'Q3–Q4 2026',
      color:C.positive,
    },
  ];

  return (
    <div id="sec-imperatives" className="pad-section" style={{background:C.paperDark, padding:'48px 64px'}}>
      <div style={{maxWidth:'900px', margin:'0 auto'}}>
        <div style={{borderTop:`6px solid ${C.ink}`, borderBottom:`2px solid ${C.lime}`, paddingBottom:'3px', marginBottom:'20px'}}/>
        <div style={{fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:C.muted, marginBottom:'16px'}}>
          Members Intelligence
        </div>
        <h2 style={{fontFamily:F.display, fontSize:'clamp(20px,3vw,34px)', fontWeight:700, color:C.ink, lineHeight:1.2, marginBottom:'28px'}}>
          Strategic Imperatives — 2026 Action Matrix
        </h2>

        <button className="mob-toggle" onClick={() => setOpen(o => !o)}>
          <span>Strategic Imperatives</span>
          <span className="mob-show" style={{display:'none', transform:open?'rotate(180deg)':'none', transition:'transform 0.2s'}}>↓</span>
        </button>

        {items.map((item, i) => (
          <div key={i} className={i >= 2 ? (open ? '' : 'mob-item-hidden') : ''} style={{
            display:'flex', gap:'16px', padding:'20px 0',
            borderBottom:i < items.length-1 ? `1px solid ${C.border}` : 'none',
            alignItems:'flex-start',
          }}>
            <div style={{flexShrink:0, width:'3px', background:item.color, alignSelf:'stretch', minHeight:'60px'}}/>
            <div style={{flexShrink:0}}>
              <div style={{fontFamily:F.mono, fontSize:'22px', fontWeight:500, color:item.color, lineHeight:1}}>{item.rank}</div>
              <div style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'1px', color:item.color, textTransform:'uppercase', marginTop:'2px'}}>{item.urgency}</div>
            </div>
            <div style={{flex:1}}>
              <div style={{fontFamily:F.sans, fontSize:'13px', fontWeight:700, color:C.ink, marginBottom:'8px'}}>{item.title}</div>
              <p style={{fontFamily:F.body, fontSize:'13px', lineHeight:1.75, color:C.muted, fontWeight:300, marginBottom:'8px'}}>{item.body}</p>
              <span style={{fontFamily:F.mono, fontSize:'10px', fontWeight:500, color:C.forest}}>Target: {item.timeline}</span>
            </div>
          </div>
        ))}

        {items.length > 2 && (
          <button className="mob-show mob-toggle" onClick={() => setOpen(o => !o)}>
            <span>{open ? 'Show fewer ↑' : `View ${items.length - 2} more imperatives ↓`}</span>
          </button>
        )}
      </div>
    </div>
  );
};

// ─── Partnership Modes ─────────────────────────────────────────────────────────
const PartnershipModes = () => {
  const [open, setOpen] = useState(() => typeof window==='undefined' || window.innerWidth > 600);
  const modes = [
    {
      code:'CO', label:'Co-Financing Partner',
      desc:'BRIDGE ventures qualify as private sector co-financing partners for DBG, GIIF, and WDB capital programmes. Blended finance structures multiply diaspora capital impact.',
      examples:['Oil Palm Finance Window', 'DBG Agricultural Finance', 'GIIF Infrastructure'],
    },
    {
      code:'SD', label:'Service Delivery Partner',
      desc:'BRIDGE provides operational delivery capability that government seed capital programs lack. Business development services, digital infrastructure, and training delivery.',
      examples:['WDB Trader Support', 'COTVET Placement', 'Farmer Service Centers'],
    },
    {
      code:'TP', label:'Technical Partnership',
      desc:'BRIDGE provides specialized expertise to MDA technical directorates. Market digitization, supply chain design, health systems, and education technology partnerships.',
      examples:['Kejetia Digital Platform', 'AgTech Extension', 'Digital Health Records'],
    },
    {
      code:'PP', label:'PPP Structures',
      desc:'Ghana PPP Act (2020) creates mechanisms for private sector infrastructure investment with government partnership. BRIDGE infrastructure ventures structured as PPP concessions.',
      examples:['Market Infrastructure', 'Water Kiosk Networks', 'Energy Mini-Grids'],
    },
    {
      code:'ZT', label:'Zone Tenancy',
      desc:'Ghana Free Zones Authority incentives — 100% duty exemption, 10-year tax holiday — create significant cost advantages for BRIDGE manufacturing and processing ventures.',
      examples:['Dawa Industrial Zone', 'Agro-Processing Parks', 'Export Processing Zones'],
    },
    {
      code:'IP', label:'Implementation Partnership',
      desc:'District-level deployment through MMDAs and District Assemblies. BRIDGE selects 5–10 pilot districts for comprehensive multi-sector intervention.',
      examples:['District Market Pilots', 'Community Health Clinics', 'Agricultural Hubs'],
    },
  ];

  return (
    <div id="sec-partners" className="pad-section" style={{background:C.paper, padding:'48px 64px'}}>
      <div style={{maxWidth:'900px', margin:'0 auto'}}>
        <div style={{borderTop:`6px solid ${C.ink}`, borderBottom:`2px solid ${C.lime}`, paddingBottom:'3px', marginBottom:'20px'}} className="mob-hide"/>
        <button className="mob-toggle" onClick={() => setOpen(o=>!o)}>
          <span>Partnership Modes</span>
          <span style={{transition:'transform 0.25s', display:'inline-block', transform:open?'rotate(0deg)':'rotate(-90deg)'}}>↓</span>
        </button>
        <div className={open ? '' : 'sec-body-hidden'}>
        <div style={{fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:C.muted, marginBottom:'16px'}}>
          Engagement Framework
        </div>
        <h2 style={{fontFamily:F.display, fontSize:'clamp(20px,3vw,34px)', fontWeight:700, color:C.ink, lineHeight:1.2, marginBottom:'28px'}}>
          Six Partnership Modes with Government
        </h2>
        <div className="tc" style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'2px'}}>
          {modes.map((m,i) => (
            <div key={i} style={{border:`1px solid ${C.border}`, padding:'20px'}}>
              <div style={{fontFamily:F.mono, color:C.lime, background:C.forest, width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'12px', fontSize:'11px', fontWeight:700, letterSpacing:'1px'}}>{m.code}</div>
              <div style={{fontFamily:F.sans, fontSize:'12px', fontWeight:700, color:C.forest, marginBottom:'8px'}}>{m.label}</div>
              <p style={{fontFamily:F.body, fontSize:'12px', lineHeight:1.7, color:C.muted, fontWeight:300, marginBottom:'12px'}}>{m.desc}</p>
              <div style={{borderTop:`1px solid ${C.border}`, paddingTop:'10px'}}>
                {m.examples.map((e,j) => (
                  <div key={j} style={{fontFamily:F.sans, fontSize:'10px', color:C.faint, padding:'2px 0'}}>→ {e}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
        </div>{/* end collapsible */}
      </div>
    </div>
  );
};

// ─── Legislative Tracker ──────────────────────────────────────────────────────
const LegislativeTracker = () => {
  const [open, setOpen] = useState(false);
  const bills = [
    {
      id:'B01', status:'Passed', statusColor:C.positive,
      title:'Ghana PPP Act 2020 (Act 1039)',
      body:'Public Investment & Asset Management (PIAM)',
      desc:'Legal framework enabling infrastructure partnerships. Creates mechanisms for private sector infrastructure investment with government. Governs BRIDGE infrastructure venture structures.',
      sectors:['Infrastructure','Housing','Energy'],
      impact:'High',
      note:'Effective and operational. All BRIDGE infrastructure ventures must be structured in compliance.',
    },
    {
      id:'B02', status:'Active', statusColor:C.positive,
      title:'Insurance Act 2021 (Act 1061)',
      body:'National Insurance Commission',
      desc:'Replaced Act 724 (2006). Enhances regulatory support, new growth opportunities in insurance products. Relevant to BRIDGE health, agriculture, and financial inclusion ventures requiring coverage instruments.',
      sectors:['Financial Inclusion','Health','Agriculture'],
      impact:'Medium',
      note:'Creates new product eligibility for micro-insurance and agri-insurance ventures.',
    },
    {
      id:'B03', status:'Pending', statusColor:C.amber,
      title:'Digital Credit Directive (2025)',
      body:'Bank of Ghana',
      desc:'Regulates digital lending platforms and mobile credit products. Establishes consumer protection standards, interest rate caps, and data privacy requirements for fintech credit operators.',
      sectors:['Financial Inclusion','Technology'],
      impact:'High',
      note:'Final regulations expected H1 2026. BRIDGE digital lending ventures must comply on launch.',
    },
    {
      id:'B04', status:'Announced', statusColor:C.amber,
      title:'National Oil Palm Development Policy (2026–2032)',
      body:'Ministry of Food & Agriculture',
      desc:'7-year policy establishing 5-year moratorium on loan repayment, 70% project financing, and integrated value chain support for oil palm sector. Directly enables BRIDGE agricultural processing portfolio.',
      sectors:['Agriculture','Manufacturing'],
      impact:'High',
      note:'Policy operationalizing through DBG Finance Window. First-mover advantage available now.',
    },
    {
      id:'B05', status:'Active', statusColor:C.positive,
      title:'Ghana Free Zones Act (Amendment 2023)',
      body:'Ghana Free Zones Authority',
      desc:'100% duty exemption on imports, 10-year tax holiday for zone tenants. BRIDGE manufacturing and export-oriented processing ventures qualify for zone benefits in Dawa and Tema industrial zones.',
      sectors:['Manufacturing','Technology','Agriculture'],
      impact:'Medium',
      note:'Apply for zone status during venture formation — retroactive application is not permitted.',
    },
    {
      id:'B06', status:'Active', statusColor:C.positive,
      title:'Scrap Metal & Raw Rubber Export Restrictions',
      body:'Ministry of Trade & Industry',
      desc:'Export restrictions on raw scrap metal and rubber create domestic processing premium. Local manufacturers gain input cost advantage and government incentivizes value-added processing over raw material export.',
      sectors:['Manufacturing','Agriculture'],
      impact:'Medium',
      note:'Creates direct competitive advantage for BRIDGE rubber and metal fabrication ventures.',
    },
    {
      id:'B07', status:'Pending', statusColor:C.amber,
      title:'Diaspora Investment Vehicle Framework',
      body:'Office of Diaspora Affairs / SEC Ghana',
      desc:'Pending regulatory framework for formalized diaspora investment instruments including bonds, collective investment schemes, and structured SPVs targeting diaspora capital. Sankofa Initiative dependency.',
      sectors:['All Sectors'],
      impact:'Critical',
      note:'Framework timeline tied to 24-Hour Economy Authority establishment. Monitor Q2 2026.',
    },
    {
      id:'B08', status:'Announced', statusColor:C.amber,
      title:'Creative Arts Industry Support Fund',
      body:'Ministry of Tourism, Arts & Culture',
      desc:'Dedicated fund for film, music, and creative arts production financing. Co-financing mechanism for qualifying projects. Governance structure and eligibility criteria under development.',
      sectors:['Sports & Creative','Tourism'],
      impact:'Medium',
      note:'Fund governance being established. Early engagement with Ministry creates founding partner positioning.',
    },
  ];

  const statusOrder = {'Critical':0,'High':1,'Medium':2};

  return (
    <div id="sec-legis" className="pad-section" style={{background:C.paper, padding:'48px 64px'}}>
      <div style={{maxWidth:'900px', margin:'0 auto'}}>
        <div style={{borderTop:`6px solid ${C.ink}`, borderBottom:`2px solid ${C.lime}`, paddingBottom:'3px', marginBottom:'20px'}}/>
        <div style={{fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:C.muted, marginBottom:'16px'}}>
          Members Intelligence
        </div>
        <h2 style={{fontFamily:F.display, fontSize:'clamp(20px,3vw,34px)', fontWeight:700, color:C.ink, lineHeight:1.2, marginBottom:'8px'}}>
          Legislative &amp; Regulatory Tracker
        </h2>
        <p style={{fontFamily:F.body, fontSize:'15px', lineHeight:1.8, color:C.muted, fontWeight:300, marginBottom:'32px', maxWidth:'620px'}}>
          Active, pending, and announced legislation directly affecting BRIDGE venture operations. Status monitored quarterly.
        </p>

        <button className="mob-toggle" onClick={() => setOpen(o => !o)}>
          <span>All {bills.length} Legislative Items</span>
          <span className="mob-show" style={{display:'none', transform:open?'rotate(180deg)':'none', transition:'transform 0.2s'}}>↓</span>
        </button>

        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2px'}} className="tc">
          {bills.map((b, i) => (
            <div key={b.id} className={i >= 4 ? (open ? '' : 'mob-item-hidden') : ''} style={{
              border:`1px solid ${C.border}`,
              padding:'16px',
              background:i%2===0 ? C.white||'#fff' : C.paperDark,
            }}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'8px', gap:'8px'}}>
                <span style={{fontFamily:F.mono, fontSize:'9px', fontWeight:700, color:C.faint}}>{b.id}</span>
                <div style={{display:'flex', gap:'6px', alignItems:'center', flexShrink:0}}>
                  <span style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'1px', color:b.statusColor, textTransform:'uppercase'}}>{b.status}</span>
                  <span style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, color:b.impact==='Critical'?C.red:b.impact==='High'?C.amber:C.muted, letterSpacing:'1px', textTransform:'uppercase', border:`1px solid ${b.impact==='Critical'?C.red:b.impact==='High'?C.amber:C.border}`, padding:'2px 5px'}}>
                    {b.impact}
                  </span>
                </div>
              </div>
              <div style={{fontFamily:F.sans, fontSize:'12px', fontWeight:700, color:C.ink, marginBottom:'4px', lineHeight:1.3}}>{b.title}</div>
              <div style={{fontFamily:F.sans, fontSize:'10px', color:C.muted, marginBottom:'8px'}}>{b.body}</div>
              <p style={{fontFamily:F.body, fontSize:'11px', lineHeight:1.7, color:C.muted, fontWeight:300, marginBottom:'8px'}}>{b.desc}</p>
              <div style={{display:'flex', gap:'4px', flexWrap:'wrap', marginBottom:'8px'}}>
                {b.sectors.map((s,j) => (
                  <span key={j} style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, color:C.forest, border:`1px solid ${C.border}`, padding:'2px 7px'}}>{s}</span>
                ))}
              </div>
              <div style={{borderLeft:`2px solid ${C.lime}`, paddingLeft:'8px'}}>
                <p style={{fontFamily:F.body, fontSize:'11px', fontStyle:'italic', color:C.forest, lineHeight:1.5}}>{b.note}</p>
              </div>
            </div>
          ))}
        </div>
        {bills.length > 4 && (
          <button className="mob-show mob-toggle" onClick={() => setOpen(o => !o)}>
            <span>{open ? 'Show fewer ↑' : `View ${bills.length - 4} more items ↓`}</span>
          </button>
        )}
      </div>
    </div>
  );
};

// ─── Risk Register ─────────────────────────────────────────────────────────────
const RiskRegister = () => {
  const [open, setOpen] = useState(false);
  const risks = [
    {
      id:'R01', sev:'High', color:C.red,
      category:'Political',
      title:'Policy Reversal After Administration Change',
      desc:'24-Hour Economy framework and Sankofa Initiative tied to Mahama administration priorities. Subsequent government may deprioritize diaspora engagement or restructure partnership frameworks.',
      prob:'Low–Medium',
      impact:'Critical',
      mitigation:'Structure all partnerships via formal MOUs and contracts — not informal commitments. Engage across party lines. Ensure economic outcomes are visible and attributable regardless of political framing.',
      bridgeAction:'Prioritize legal contract structures over political goodwill. Document all government commitments.',
    },
    {
      id:'R02', sev:'High', color:C.red,
      category:'Institutional',
      title:'24-Hour Economy Authority Implementation Delay',
      desc:'The Authority may operationalize slower than announced. Budget execution capacity constraints, inter-ministerial coordination failures, and procurement bottlenecks are common in Ghanaian institutional launches.',
      prob:'Medium–High',
      impact:'High',
      mitigation:'Engage at working level (technical directorates) in parallel with Authority establishment. Build relationships that survive personnel changes. Do not hold venture timelines hostage to Authority operationalization.',
      bridgeAction:'Pursue dual-track: formal Authority engagement + operational MMDAs now.',
    },
    {
      id:'R03', sev:'High', color:C.red,
      category:'Financial',
      title:'DBG / GIIF Capital Disbursement Delays',
      desc:'Ghana Development Bank and GIIF have historically experienced disbursement delays due to appraisal backlogs, conditionality compliance, and foreign currency constraints. Co-financing timelines may slip.',
      prob:'Medium',
      impact:'High',
      mitigation:'Structure BRIDGE ventures to be operational before co-financing secures — not dependent on it. Treat government capital as an enhancer, not an enabler. Maintain private capital sufficiency for initial operations.',
      bridgeAction:'Build 6–12 month buffer capital into venture launch plans.',
    },
    {
      id:'R04', sev:'Medium', color:C.amber,
      category:'Regulatory',
      title:'Digital Credit Directive Compliance Burden',
      desc:'Pending Bank of Ghana Digital Credit Directive may impose stringent compliance requirements on BRIDGE fintech ventures. Interest rate caps, data privacy mandates, and reporting obligations could affect unit economics.',
      prob:'Medium',
      impact:'Medium',
      mitigation:'Engage Bank of Ghana consultation process with technical submissions. Pre-build compliance architecture into digital lending platforms. Monitor directive drafts for provisions affecting BRIDGE models.',
      bridgeAction:'Participate in BoG fintech industry consultations. Designate compliance lead.',
    },
    {
      id:'R05', sev:'Medium', color:C.amber,
      category:'Market',
      title:'Cedi Depreciation and FX Exposure',
      desc:'Ghana cedi remains vulnerable to depreciation episodes despite IMF programme stability. BRIDGE ventures with USD-denominated capital and GHS revenue streams face structural FX mismatch risk.',
      prob:'Medium',
      impact:'Medium',
      mitigation:'Structure revenue in forex where possible (exports, diaspora-facing services). Use natural hedges (local input procurement). Maintain USD-denominated reserves. Consider cedi-floor provisions in investor agreements.',
      bridgeAction:'All venture models must include FX stress test at -20% and -40% cedi scenarios.',
    },
    {
      id:'R06', sev:'Medium', color:C.amber,
      category:'Execution',
      title:'BRIDGE Internal Capacity Constraints',
      desc:'Rapid multi-sector deployment across 12 sectors and 174+ ventures requires organizational capacity that must be built in parallel with deployment. Under-staffing creates execution risk across the portfolio.',
      prob:'Medium',
      impact:'High',
      mitigation:'Sequence deployment — Tier 1 ventures first, 3–5 sectors maximum simultaneously. Build organizational infrastructure before portfolio scale. Prioritize Kejetia as proof-of-concept that attracts talent and capital.',
      bridgeAction:'Define staffing plan for Year 1–2 before committing to Year 2–3 deployment timelines.',
    },
    {
      id:'R07', sev:'Low', color:C.positive,
      category:'Competitive',
      title:'Competitor Entry into Budget Partnership Windows',
      desc:'Other diaspora organizations, development finance institutions, or private sector actors may identify the same policy windows and engage government ahead of BRIDGE.',
      prob:'Low–Medium',
      impact:'Medium',
      mitigation:'Speed to engagement is the primary mitigation. First-mover advantage on MOU and formal partnership structure is significant. BRIDGE\'s multi-sector integrated model is difficult to replicate quickly.',
      bridgeAction:'Prioritize 24H+ Authority and Sankofa engagement in Q1 2026 — before window closes.',
    },
    {
      id:'R08', sev:'Low', color:C.positive,
      category:'Reputational',
      title:'Government Partner Non-Performance',
      desc:'Government partners may commit to co-financing, service delivery partnership, or data sharing — and then fail to perform. BRIDGE\'s reputation with diaspora investors may be affected by association.',
      prob:'Low',
      impact:'Medium',
      mitigation:'Set public expectations appropriately — BRIDGE operates alongside government, not through it. Maintain operational independence. Government partnership adds validation; BRIDGE delivery is standalone.',
      bridgeAction:'Maintain operational independence from government partners in all venture structures.',
    },
  ];

  return (
    <div id="sec-risks" className="pad-section" style={{background:C.paperDark, padding:'48px 64px'}}>
      <div style={{maxWidth:'900px', margin:'0 auto'}}>
        <div style={{borderTop:`6px solid ${C.ink}`, borderBottom:`2px solid ${C.lime}`, paddingBottom:'3px', marginBottom:'20px'}}/>
        <div style={{fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:C.muted, marginBottom:'16px'}}>
          Members Intelligence · Risk Analysis
        </div>
        <h2 style={{fontFamily:F.display, fontSize:'clamp(20px,3vw,34px)', fontWeight:700, color:C.ink, lineHeight:1.2, marginBottom:'8px'}}>
          Policy Risk Register
        </h2>
        <p style={{fontFamily:F.body, fontSize:'15px', lineHeight:1.8, color:C.muted, fontWeight:300, marginBottom:'32px', maxWidth:'620px'}}>
          Eight material risks to BRIDGE's policy alignment strategy — with probability assessment, impact rating, and BRIDGE mitigation action.
        </p>

        <button className="mob-toggle" onClick={() => setOpen(o => !o)}>
          <span>Risk Register — {risks.length} items</span>
          <span className="mob-show" style={{display:'none', transform:open?'rotate(180deg)':'none', transition:'transform 0.2s'}}>↓</span>
        </button>

        {risks.map((r, i) => (
          <div key={r.id} className={i >= 3 ? (open ? '' : 'mob-item-hidden') : ''} style={{
            padding:'18px 0',
            borderBottom:i < risks.length-1 ? `1px solid ${C.border}` : 'none',
          }}>
            {/* Mobile: tag row centered above — desktop: hidden (uses side layout below) */}
            <div className="mob-show" style={{display:'none', alignItems:'center', gap:'8px', marginBottom:'10px', justifyContent:'center'}}>
              <div style={{width:'28px', height:'2px', background:r.color, opacity:0.7}}/>
              <span style={{fontFamily:F.mono, fontSize:'10px', fontWeight:700, color:r.color, letterSpacing:'1px'}}>{r.id}</span>
              <span style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.faint}}>·</span>
              <span style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.faint}}>{r.category}</span>
              <div style={{width:'28px', height:'2px', background:r.color, opacity:0.7}}/>
            </div>
            {/* Desktop: side layout with severity bar + ID column */}
            <div style={{display:'flex', gap:'16px', alignItems:'flex-start'}}>
              {/* Severity bar + ID — hidden on mobile */}
              <div className="mob-hide" style={{display:'flex', gap:'10px', alignItems:'flex-start', flexShrink:0}}>
                <div style={{width:'3px', background:r.color, alignSelf:'stretch', minHeight:'80px'}}/>
                <div style={{width:'60px'}}>
                  <div style={{fontFamily:F.mono, fontSize:'11px', fontWeight:700, color:r.color}}>{r.id}</div>
                  <div style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'1px', color:C.faint, textTransform:'uppercase', marginTop:'2px'}}>{r.category}</div>
                </div>
              </div>
              {/* Content — full width on mobile */}
              <div style={{flex:1, minWidth:0}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'6px', gap:'8px', flexWrap:'wrap'}}>
                  <div style={{fontFamily:F.sans, fontSize:'13px', fontWeight:700, color:C.ink}}>{r.title}</div>
                  <div style={{display:'flex', gap:'6px', flexShrink:0}}>
                    <span style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'1px', color:C.muted, textTransform:'uppercase', border:`1px solid ${C.border}`, padding:'2px 6px'}}>P: {r.prob}</span>
                    <span style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'1px', color:r.color, textTransform:'uppercase', border:`1px solid ${r.color}`, padding:'2px 6px'}}>I: {r.impact}</span>
                  </div>
                </div>
                <p style={{fontFamily:F.body, fontSize:'12px', lineHeight:1.7, color:C.muted, fontWeight:300, marginBottom:'8px'}}>{r.desc}</p>
                <div style={{background:C.forest, padding:'10px 12px', marginBottom:'6px'}}>
                  <div style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.lime, marginBottom:'4px'}}>Mitigation</div>
                  <p style={{fontFamily:F.body, fontSize:'11px', lineHeight:1.65, color:'rgba(250,248,243,0.7)', fontWeight:300}}>{r.mitigation}</p>
                </div>
                <div style={{borderLeft:`2px solid ${C.lime}`, paddingLeft:'10px'}}>
                  <p style={{fontFamily:F.body, fontSize:'11px', fontStyle:'italic', color:C.forest, lineHeight:1.5}}>{r.bridgeAction}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {risks.length > 3 && (
          <button className="mob-show mob-toggle" onClick={() => setOpen(o => !o)}>
            <span>{open ? 'Show fewer ↑' : `View ${risks.length - 3} more risks ↓`}</span>
          </button>
        )}
      </div>
    </div>
  );
};

// ─── Budget Execution Monitor ──────────────────────────────────────────────────
const BudgetExecutionMonitor = () => {
  const quarters = ['Q1 2026','Q2 2026','Q3 2026','Q4 2026'];
  const [activeQ, setActiveQ] = useState(0);
  const [open, setOpen] = useState(() => typeof window==='undefined' || window.innerWidth > 600);

  const execution = [
    {
      q:'Q1 2026',
      status:'Current',
      headline:'24H+ Authority framework in establishment. Oil Palm Finance Window terms finalized. Sankofa Hub groundbreaking scheduled.',
      items:[
        { label:'24-Hour Economy Authority', status:'In Progress', note:'Parliamentary gazette pending. Technical secretariat hiring underway.', action:'Submit Model Market framework now', urgent:true },
        { label:'DBG Oil Palm Finance Window', status:'Terms Set', note:'GH₵6.9B window announced. Appraisal criteria published Q1.', action:'Initiate co-financing application Q1', urgent:true },
        { label:'Sankofa Initiative Hubs', status:'Announced', note:'Five global hubs in planning — Toronto, US, UK, Germany, Brazil.', action:'Engage Office of Diaspora Affairs for founding partner status', urgent:true },
        { label:'WDB Capitalization', status:'Operational', note:'GH₵401M disbursed. Trader lending program active in Accra markets.', action:'Submit partnership proposal for business development services', urgent:false },
        { label:'COTVET Free TVET', status:'Enrollment Open', note:'500+ institutions participating. Employer placement commitments sought.', action:'Register BRIDGE as employer partner for skills pipeline', urgent:false },
      ],
    },
    {
      q:'Q2 2026',
      status:'Upcoming',
      headline:'Co-financing applications due. MDA technical partnership windows open. District pilot selection timeline.',
      items:[
        { label:'Oil Palm Co-Financing Close', status:'Target Q2', note:'First cohort of co-financing applicants assessed. BRIDGE ventures must be shovel-ready.', action:'Complete integrated agriculture hub business plan', urgent:true },
        { label:'Model Market Pilot Selection', status:'Expected Q2', note:'24H+ Authority expected to announce pilot district markets.', action:'Kejetia proposal ready for submission', urgent:true },
        { label:'Ghana Free Zones Applications', status:'Rolling', note:'GFZA accepts applications quarterly. Zone benefits begin at grant.', action:'Assess manufacturing ventures for zone eligibility', urgent:false },
        { label:'Agricultural Enclave Roads Start', status:'Tender Phase', note:'GH₵828M enclave road tenders expected Q2. Construction starts Q3.', action:'Map cold storage sites along enclave corridors', urgent:false },
        { label:'Digital Credit Directive Final', status:'Expected Q2', note:'Bank of Ghana final regulations expected. Compliance deadline set at gazette.', action:'Pre-build compliance architecture in digital lending platforms', urgent:false },
      ],
    },
    {
      q:'Q3 2026',
      status:'Planned',
      headline:'Infrastructure construction milestones. Skills pipeline placements begin. First BRIDGE co-financing draw.',
      items:[
        { label:'Enclave Road Construction', status:'Planned', note:'Phase 1 roads in 3 agricultural enclaves breaking ground.', action:'Sequence cold storage deployment along Phase 1 corridor', urgent:false },
        { label:'TVET Placement Cohort 1', status:'Planned', note:'First COTVET-BRIDGE placement cohort completes training, enters ventures.', action:'Prepare venture roles for 50+ trainees Q3', urgent:false },
        { label:'MahamaCares Phase 2', status:'Planned', note:'Community health facility expansion continues. MOH partnership window open.', action:'Submit clinic co-investment proposal to MOH', urgent:false },
        { label:'Creative Arts Fund Governance', status:'Expected Q3', note:'Fund governance board expected to be seated Q3.', action:'Submit founding partner application on governance establishment', urgent:false },
        { label:'GIIF Co-Investment Pipeline', status:'Planned', note:'GIIF infrastructure co-investment pipeline assessed Q3 for 2027 deployment.', action:'Submit BRIDGE infrastructure ventures for GIIF pipeline', urgent:false },
      ],
    },
    {
      q:'Q4 2026',
      status:'Forecast',
      headline:'Annual budget review. Q4 disbursements. Government performance review shapes 2027 budget priorities.',
      items:[
        { label:'2027 Budget Consultation', status:'Forecast', note:'Ministry of Finance begins 2027 budget consultation with MDAs and private sector.', action:'Submit BRIDGE sector performance data as input to consultation', urgent:false },
        { label:'Oil Palm Season Assessment', status:'Forecast', note:'Post-harvest assessment of Oil Palm Finance Window effectiveness shapes Year 2 terms.', action:'Document BRIDGE ventures performance for DBG reporting', urgent:false },
        { label:'24H+ Mid-Term Review', status:'Forecast', note:'Administration expected to publish 24-Hour Economy implementation progress report.', action:'Ensure Kejetia and Model Market outcomes feature in report', urgent:false },
        { label:'Sankofa Investment Forum', status:'Forecast', note:'Office of Diaspora Affairs expected to convene first formal diaspora investment forum.', action:'Present BRIDGE at forum as preferred operating partner', urgent:false },
        { label:'District Partnership Expansion', status:'Forecast', note:'Successful pilot districts likely to be joined by 10 additional districts in 2027 pipeline.', action:'Document pilot outcomes for expansion case', urgent:false },
      ],
    },
  ];

  const current = execution[activeQ];

  return (
    <div id="sec-budget" className="pad-section" style={{background:C.paper, padding:'48px 64px'}}>
      <div style={{maxWidth:'900px', margin:'0 auto'}}>
        <div style={{borderTop:`6px solid ${C.ink}`, borderBottom:`2px solid ${C.lime}`, paddingBottom:'3px', marginBottom:'20px'}} className="mob-hide"/>
        <button className="mob-toggle" onClick={() => setOpen(o=>!o)}>
          <span>Budget Execution Monitor</span>
          <span style={{transition:'transform 0.25s', display:'inline-block', transform:open?'rotate(0deg)':'rotate(-90deg)'}}>↓</span>
        </button>
        <div className={open ? '' : 'sec-body-hidden'}>
        <div style={{fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:C.muted, marginBottom:'16px'}}>
          Members Intelligence · Budget Execution
        </div>
        <h2 style={{fontFamily:F.display, fontSize:'clamp(20px,3vw,34px)', fontWeight:700, color:C.ink, lineHeight:1.2, marginBottom:'28px'}}>
          Budget Execution Monitor
        </h2>

        {/* Quarter selector */}
        <div style={{display:'flex', gap:'2px', marginBottom:'24px', flexWrap:'wrap'}}>
          {quarters.map((q,i) => (
            <button key={i} onClick={() => setActiveQ(i)} style={{
              fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'1px',
              padding:'8px 18px', cursor:'pointer', transition:'all 0.15s ease',
              background:activeQ===i ? C.ink : 'transparent',
              color:activeQ===i ? C.paper : C.muted,
              border:`1px solid ${activeQ===i ? C.ink : C.border}`,
            }}>
              {q}
              {i===0 && <span style={{marginLeft:'6px', fontFamily:F.mono, fontSize:'8px', color:C.lime}}>●</span>}
            </button>
          ))}
        </div>

        {/* Quarter headline */}
        <div style={{background:C.paperDark, padding:'16px 20px', marginBottom:'20px', borderLeft:`3px solid ${C.lime}`}}>
          <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:C.muted, marginBottom:'6px'}}>
            {current.q} · {current.status}
          </div>
          <p style={{fontFamily:F.body, fontSize:'14px', lineHeight:1.7, color:C.ink, fontStyle:'italic', fontWeight:300}}>{current.headline}</p>
        </div>

        {/* Items */}
        {current.items.map((item, i) => (
          <div key={i} style={{
            display:'flex', gap:'14px', padding:'14px 0',
            borderBottom:i < current.items.length-1 ? `1px solid ${C.border}` : 'none',
            alignItems:'flex-start',
          }}>
            <div style={{flexShrink:0, width:'3px', background:item.urgent?C.red:C.border, alignSelf:'stretch', minHeight:'40px'}}/>
            <div style={{flex:1}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'8px', marginBottom:'4px', flexWrap:'wrap'}}>
                <span style={{fontFamily:F.sans, fontSize:'12px', fontWeight:700, color:C.ink}}>{item.label}</span>
                <span style={{fontFamily:F.mono, fontSize:'10px', fontWeight:500, color:item.status==='Operational'||item.status==='Terms Set'?C.positive:item.status==='In Progress'||item.status==='Enrollment Open'?C.amber:C.muted, flexShrink:0}}>{item.status}</span>
              </div>
              <p style={{fontFamily:F.body, fontSize:'12px', lineHeight:1.65, color:C.muted, fontWeight:300, marginBottom:'6px'}}>{item.note}</p>
              <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
                {item.urgent && <span style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, color:C.red, letterSpacing:'1px', textTransform:'uppercase'}}>● Urgent</span>}
                <span style={{fontFamily:F.sans, fontSize:'10px', fontWeight:700, color:C.forest}}>→ {item.action}</span>
              </div>
            </div>
          </div>
        ))}
        </div>{/* end collapsible */}
      </div>
    </div>
  );
};

// ─── Cross-Sector Integration Map ─────────────────────────────────────────────
const CrossSectorMap = () => {
  const [activeTheme, setActiveTheme] = useState(0);
  const [open, setOpen] = useState(() => typeof window==='undefined' || window.innerWidth > 600);
  const themes = [
    {
      id:0, label:'Cold Chain Nexus',
      desc:'Agricultural enclave roads, solar cold storage, and logistics corridors combine to create end-to-end cold chain infrastructure from farm to market. Three budget pillars — Grow24, Build24, Connect24 — intersect here.',
      budgetItems:['GH₵828M Enclave Roads (Grow24)','Solar SREP co-financing (Make24)','GH₵4.3B Roads (Connect24)'],
      sectors:['Agriculture · Sector 06','Infrastructure · Sector 01','Energy · Sector 10','Transport · Sector 12'],
      ventures:['Solar Cold Storage Network','Agricultural Aggregation Centers','Intermodal Freight Hub','Enclave Distribution Routes'],
      capital:'$14–22M combined deployment',
    },
    {
      id:1, label:'Digital Commerce Stack',
      desc:'Kejetia market digitization, WDB trader finance, and Digital Credit Directive create a complete digital commerce infrastructure for informal market operators. Fund24 and Build24 both contribute.',
      budgetItems:['GH₵2.2B Model Markets (Build24)','GH₵401M WDB (Fund24)','Digital Credit Directive (Regulatory)'],
      sectors:['Infrastructure · Sector 01','Financial Inclusion · Sector 02','Technology · Sector 04'],
      ventures:['Kejetia Digital Platform','Market Trader Finance','Digital Payment Rails','SME Credit Scoring'],
      capital:'$18–28M combined deployment',
    },
    {
      id:2, label:'Skills-to-Employment Pipeline',
      desc:'Free TVET, Adwumawura enterprise support, and BRIDGE venture employment create a closed-loop skills pipeline. Aspire24 directly feeds human capital into Make24 and Build24 ventures.',
      budgetItems:['GH₵170M TVET (Aspire24)','GH₵160M Adwumawura (Aspire24)','GH₵100M Digital Coders (Aspire24)'],
      sectors:['Education · Sector 05','Technology · Sector 04','Manufacturing · Sector 11'],
      ventures:['Skills Pipeline Programme','Digital Coders Track','Manufacturing Apprenticeships','AgTech Extension Training'],
      capital:'$8–14M combined deployment',
    },
    {
      id:3, label:'Energy Enablement Layer',
      desc:'SREP mini-grids, Clean Cooking Outcome Bond, and stable electricity guarantees for industrial zones combine to unlock energy access that enables all other sectors. Energy is the foundation layer.',
      budgetItems:['US$100M+ SREP (Make24)','Clean Cooking Outcome Bond (Care24)','Industrial Zone Power Guarantee (Make24)'],
      sectors:['Energy · Sector 10','Manufacturing · Sector 11','Agriculture · Sector 06','Health · Sector 03'],
      ventures:['Mini-Grid Network','Solar Cold Storage','Clean Cooking Programme','Industrial Zone Power Supply'],
      capital:'$12–20M combined deployment',
    },
    {
      id:4, label:'Health Infrastructure Loop',
      desc:'MahamaCares community facility investment, NHIS expansion, and diaspora health professional deployment create a reinforcing healthcare infrastructure loop. Care24 directly targets underserved communities.',
      budgetItems:['GH₵2.3B MahamaCares (Care24)','GH₵9B NHIS (Care24)','Diaspora health professional policy'],
      sectors:['Health · Sector 03','Education · Sector 05','Technology · Sector 04'],
      ventures:['Community Health Clinics','Diaspora Health Professionals','Digital Health Records','Telemedicine Platform'],
      capital:'$10–16M combined deployment',
    },
  ];

  const active = themes[activeTheme];

  return (
    <div id="sec-integration" className="pad-section" style={{background:C.paperDark, padding:'48px 64px'}}>
      <div style={{maxWidth:'900px', margin:'0 auto'}}>
        <div style={{borderTop:`6px solid ${C.ink}`, borderBottom:`2px solid ${C.lime}`, paddingBottom:'3px', marginBottom:'20px'}} className="mob-hide"/>
        <button className="mob-toggle" onClick={() => setOpen(o=>!o)}>
          <span>Cross-Sector Integration Map</span>
          <span style={{transition:'transform 0.25s', display:'inline-block', transform:open?'rotate(0deg)':'rotate(-90deg)'}}>↓</span>
        </button>
        <div className={open ? '' : 'sec-body-hidden'}>
        <div style={{fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:C.muted, marginBottom:'16px'}}>
          Members Intelligence · Portfolio Integration
        </div>
        <h2 style={{fontFamily:F.display, fontSize:'clamp(20px,3vw,34px)', fontWeight:700, color:C.ink, lineHeight:1.2, marginBottom:'8px'}}>
          Cross-Sector Integration Map
        </h2>
        <p style={{fontFamily:F.body, fontSize:'15px', lineHeight:1.8, color:C.muted, fontWeight:300, marginBottom:'28px', maxWidth:'620px'}}>
          Five budget integration themes where multiple pillars and sectors converge — creating compounding opportunity for the BRIDGE integrated portfolio model.
        </p>

        {/* Theme tabs */}
        <div style={{display:'flex', gap:'2px', marginBottom:'24px', flexWrap:'wrap'}}>
          {themes.map(t => (
            <button key={t.id} onClick={() => setActiveTheme(t.id)} style={{
              display:'flex', alignItems:'center', gap:'6px',
              fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'0.5px',
              padding:'8px 14px', cursor:'pointer', transition:'all 0.15s ease',
              background:activeTheme===t.id ? C.forest : 'transparent',
              color:activeTheme===t.id ? C.paper : C.muted,
              border:`1px solid ${activeTheme===t.id ? C.forest : C.border}`,
            }}>
              <span className="mob-hide">{t.label}</span>
              <span className="mob-show" style={{display:'none'}}>{String(t.id+1).padStart(2,'0')}</span>
            </button>
          ))}
        </div>

        {/* Active theme detail */}
        <div style={{border:`1px solid ${C.border}`, background:C.white||'#fff'}}>
          {/* Header */}
          <div style={{background:C.ink, padding:'20px 24px'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'12px'}}>
              <div>
                <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:C.lime, marginBottom:'6px'}}>
                  Integration Theme {active.id+1} of {themes.length}
                </div>
                <div style={{fontFamily:F.display, fontSize:'clamp(18px,3vw,28px)', fontWeight:700, color:C.paper}}>{active.label}</div>
              </div>
              <div style={{fontFamily:F.mono, fontSize:'12px', fontWeight:700, color:C.lime, textAlign:'right'}}>
                {active.capital}
              </div>
            </div>
          </div>
          {/* Body */}
          <div className="tc" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0'}}>
            <div style={{padding:'20px 24px', borderRight:`1px solid ${C.border}`}}>
              <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:C.muted, marginBottom:'10px'}}>Overview</div>
              <p style={{fontFamily:F.body, fontSize:'13px', lineHeight:1.8, color:C.ink, fontWeight:300, marginBottom:'18px'}}>{active.desc}</p>
              <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:C.muted, marginBottom:'8px'}}>Budget Inputs</div>
              {active.budgetItems.map((b,i) => (
                <div key={i} style={{display:'flex', gap:'8px', alignItems:'flex-start', padding:'5px 0', borderBottom:i<active.budgetItems.length-1?`1px solid ${C.border}`:'none'}}>
                  <span style={{color:C.lime, fontWeight:700, flexShrink:0}}>→</span>
                  <span style={{fontFamily:F.body, fontSize:'12px', color:C.muted, fontWeight:300}}>{b}</span>
                </div>
              ))}
            </div>
            <div style={{padding:'20px 24px'}}>
              <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:C.muted, marginBottom:'8px'}}>Sectors</div>
              <div style={{marginBottom:'18px'}}>
                {active.sectors.map((s,i) => (
                  <div key={i} style={{fontFamily:F.sans, fontSize:'11px', fontWeight:700, color:C.forest, padding:'5px 0', borderBottom:i<active.sectors.length-1?`1px solid ${C.border}`:'none'}}>{s}</div>
                ))}
              </div>
              <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:C.muted, marginBottom:'8px'}}>Aligned Ventures</div>
              {active.ventures.map((v,i) => (
                <div key={i} style={{display:'flex', gap:'6px', alignItems:'center', padding:'5px 0', borderBottom:i<active.ventures.length-1?`1px solid ${C.border}`:'none'}}>
                  <span style={{width:'6px', height:'6px', background:C.lime, flexShrink:0, borderRadius:'50%'}}/>
                  <span style={{fontFamily:F.body, fontSize:'12px', color:C.ink, fontWeight:300}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>{/* end collapsible */}
      </div>
    </div>
  );
};

// ─── Membership Upsell ────────────────────────────────────────────────────────
const Gate = () => {
  const [objOpen, setObjOpen] = useState(null);
  const [mobCollapsed, setMobCollapsed] = useState(false);

  const engagements = [
    'Book a one-on-one analyst session',
    'Submit a co-financing inquiry — DBG, GIIF, WDB',
    'Flag a venture for BRIDGE portfolio assessment',
    'Request a government introduction — ministry or MDA',
    'Join a sector working group',
    'Nominate a partner or co-investor',
    'Access the full government contact directory',
    'Request a custom sector deep-dive brief',
    'Join the quarterly live analyst briefing',
    'Submit a deal for peer review',
    'Access the 174+ venture model library',
    'Contribute to the Big Ideas Challenge',
  ];

  const pathways = [
    {
      q: 'How do I book an analyst session?',
      a: 'Analyst sessions are available to all Network Members. Submit a request through the member portal with your sector focus and question. Sessions are 45 minutes and conducted via video call. Response within 48 hours.',
    },
    {
      q: 'What does a co-financing inquiry involve?',
      a: 'Submit your venture concept, capital requirement, and target government program. BRIDGE analysts assess eligibility against DBG, GIIF, WDB, and other active windows and return a structured assessment within 5 business days.',
    },
    {
      q: 'How do I deepen my engagement beyond Network Member?',
      a: 'Contributor tier ($500–$2,000/year or 10+ hours quarterly) adds deal flow observer status, advisory matching, and direct leadership access. Investor tier begins at $10K deployment into BRIDGE ventures with LP rights and quarterly reporting.',
    },
  ];

  return (
    <div id="sec-members" style={{background:C.ink, position:'relative', overflow:'hidden'}}>

      {/* Watermark */}
      <div style={{
        position:'absolute', right:'-20px', bottom:'-20px',
        fontFamily:F.display, fontSize:'clamp(120px,22vw,320px)', fontWeight:900,
        color:'rgba(255,255,255,0.022)', pointerEvents:'none', userSelect:'none',
        letterSpacing:'-8px', lineHeight:1,
      }}>ENGAGE</div>

      <div className="pad-section" style={{padding:'56px 64px 64px', position:'relative'}}>
        <div style={{maxWidth:'900px', margin:'0 auto'}}>

          {/* ── Mobile collapse ─────────────────────────────────────────── */}
          <button className="mob-show mob-toggle" onClick={() => setMobCollapsed(o => !o)} style={{
            display:'none', width:'100%', background:'transparent', border:'none',
            borderBottom:`1px solid rgba(255,255,255,0.1)`, marginBottom:'20px',
            padding:'4px 0 16px', cursor:'pointer',
            alignItems:'center', justifyContent:'space-between', gap:'12px',
          }}>
            <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
              <div style={{width:'20px', height:'1px', background:C.lime, opacity:0.6}}/>
              <span style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:C.lime, opacity:0.8}}>Deepen Engagement</span>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
              <span style={{fontFamily:F.body, fontSize:'11px', fontStyle:'italic', color:'rgba(250,248,243,0.3)'}}>
                {mobCollapsed ? 'Tap to expand' : 'Tap to minimise'}
              </span>
              <span style={{
                fontFamily:F.sans, fontSize:'14px', color:'rgba(250,248,243,0.3)',
                transition:'transform 0.25s', display:'inline-block',
                transform:mobCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
              }}>↓</span>
            </div>
          </button>

          <div className={mobCollapsed ? 'sec-body-hidden' : ''}>

          {/* ── Header ──────────────────────────────────────────────────── */}
          <div style={{
            display:'grid', gridTemplateColumns:'1fr auto',
            gap:'40px', alignItems:'end',
            marginBottom:'40px', paddingBottom:'32px',
            borderBottom:`1px solid rgba(255,255,255,0.06)`,
          }}>
            <div>
              <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px'}}>
                <div style={{width:'28px', height:'1px', background:C.lime, opacity:0.7}}/>
                <span style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:C.lime, opacity:0.8}}>
                  Your Membership
                </span>
              </div>
              <h2 style={{fontFamily:F.display, fontSize:'clamp(26px,3.5vw,46px)', fontWeight:700, color:C.paper, lineHeight:1.08, margin:0}}>
                Intelligence is only useful<br/>
                <span style={{fontStyle:'italic', color:'rgba(250,248,243,0.32)', fontWeight:400}}>when it drives action.</span>
              </h2>
            </div>
            <div className="mob-hide" style={{maxWidth:'220px', textAlign:'right', paddingBottom:'4px'}}>
              <p style={{fontFamily:F.body, fontSize:'13px', lineHeight:1.8, color:'rgba(250,248,243,0.35)', fontWeight:300, margin:0, fontStyle:'italic'}}>
                "The window is open now. The question is whether you walk through it."
              </p>
            </div>
          </div>

          {/* ── Middle: what you can do now + engagement ladder ──────────── */}
          <div className="tc" style={{display:'grid', gridTemplateColumns:'1.05fr 1px 0.95fr', gap:'0', marginBottom:'1px'}}>

            {/* Col 1: Actions available now */}
            <div style={{paddingRight:'40px'}}>
              <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(250,248,243,0.22)', marginBottom:'18px'}}>
                As a Member — what you can do now
              </div>
              <div className="tc" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0 16px'}}>
                {engagements.map((item,i) => (
                  <div key={i} style={{
                    display:'flex', gap:'8px', alignItems:'flex-start',
                    padding:'6px 0',
                    borderBottom:`1px solid rgba(255,255,255,0.04)`,
                  }}>
                    <span style={{color:C.lime, flexShrink:0, fontSize:'7px', marginTop:'4px', opacity:0.6}}>→</span>
                    <span style={{fontFamily:F.sans, fontSize:'10px', color:'rgba(250,248,243,0.45)', lineHeight:1.5, fontWeight:400}}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="upsell-divider" style={{background:'rgba(255,255,255,0.06)'}}/>

            {/* Col 2: Engagement ladder */}
            <div className="upsell-col-r" style={{paddingLeft:'40px', display:'flex', flexDirection:'column', gap:'0'}}>

              {/* Current — Network Member */}
              <div style={{
                padding:'16px 0 16px',
                borderBottom:`1px solid rgba(255,255,255,0.06)`,
                display:'flex', justifyContent:'space-between', alignItems:'center', gap:'16px',
              }}>
                <div>
                  <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'3px'}}>
                    <div style={{width:'6px', height:'6px', borderRadius:'50%', background:C.lime}}/>
                    <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:C.lime}}>Network Member</div>
                  </div>
                  <div style={{fontFamily:F.sans, fontSize:'11px', color:'rgba(250,248,243,0.3)', fontWeight:300}}>Full intelligence access · Analyst Q&A · Quarterly briefings</div>
                </div>
                <span style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, color:'rgba(250,248,243,0.2)', flexShrink:0, letterSpacing:'1px', textTransform:'uppercase'}}>Current</span>
              </div>

              {/* Contributor — featured */}
              <div style={{
                padding:'22px 20px',
                margin:'20px 0',
                borderLeft:`2px solid ${C.lime}`,
                background:'rgba(184,217,53,0.05)',
              }}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'8px'}}>
                  <div>
                    <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:C.lime, marginBottom:'4px'}}>Contributor</div>
                    <div style={{fontFamily:F.sans, fontSize:'10px', color:'rgba(250,248,243,0.3)', fontWeight:300}}>$500–$2,000/yr · or 10+ hrs/quarter</div>
                  </div>
                  <span style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, color:C.lime, letterSpacing:'1.5px', textTransform:'uppercase', flexShrink:0}}>Next Level</span>
                </div>
                <p style={{fontFamily:F.body, fontSize:'12px', color:'rgba(250,248,243,0.45)', lineHeight:1.7, fontWeight:300, margin:'0 0 16px'}}>
                  Deal flow observer status. Advisory and mentorship matching. Contributor retreats. Direct engagement with BRIDGE leadership. Recognition in BRIDGE communications.
                </p>
                <a href="#" style={{
                  display:'inline-flex', alignItems:'center', gap:'8px',
                  background:C.lime, color:C.ink,
                  padding:'10px 22px',
                  fontFamily:F.sans, fontSize:'11px', fontWeight:800, letterSpacing:'0.3px',
                  textDecoration:'none',
                }}>
                  Upgrade to Contributor →
                </a>
              </div>

              {/* Investor */}
              <div style={{
                padding:'16px 0',
                borderTop:`1px solid rgba(255,255,255,0.06)`,
              }}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:'12px', marginBottom:'6px'}}>
                  <div>
                    <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'rgba(250,248,243,0.22)', marginBottom:'3px'}}>Investor · Strategic Partner</div>
                    <div style={{fontFamily:F.sans, fontSize:'11px', color:'rgba(250,248,243,0.3)', fontWeight:300}}>LP rights · Co-investment · Board access · $10K–$1M+</div>
                  </div>
                  <a href="#" style={{fontFamily:F.sans, fontSize:'10px', fontWeight:600, color:'rgba(250,248,243,0.22)', textDecoration:'none', flexShrink:0, whiteSpace:'nowrap'}}>Inquire →</a>
                </div>
              </div>

            </div>
          </div>

          {/* ── Bottom: engagement pathways + direct CTA ─────────────────── */}
          <div className="tc" style={{
            display:'grid', gridTemplateColumns:'1.05fr 1px 0.95fr', gap:'0',
            marginTop:'32px', paddingTop:'28px',
            borderTop:`1px solid rgba(255,255,255,0.06)`,
          }}>

            {/* Pathways */}
            <div style={{paddingRight:'40px'}}>
              <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(250,248,243,0.22)', marginBottom:'16px'}}>
                How to engage
              </div>
              {pathways.map((f,i) => (
                <div key={i} style={{borderBottom:`1px solid rgba(255,255,255,0.05)`}}>
                  <button onClick={() => setObjOpen(objOpen===i?null:i)} style={{
                    width:'100%', padding:'11px 0', background:'transparent', border:'none',
                    cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'16px',
                  }}>
                    <span style={{fontFamily:F.sans, fontSize:'11px', fontWeight:600, color:objOpen===i?C.paper:'rgba(250,248,243,0.4)', textAlign:'left', transition:'color 0.15s'}}>{f.q}</span>
                    <span style={{fontFamily:F.sans, fontSize:'15px', fontWeight:300, color:objOpen===i?C.lime:'rgba(255,255,255,0.15)', flexShrink:0, display:'block', transition:'transform 0.2s', transform:objOpen===i?'rotate(45deg)':'none'}}>+</span>
                  </button>
                  {objOpen===i && (
                    <p style={{fontFamily:F.body, fontSize:'12px', lineHeight:1.8, color:'rgba(250,248,243,0.35)', fontWeight:300, paddingBottom:'12px', margin:0}}>{f.a}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="upsell-divider" style={{background:'rgba(255,255,255,0.06)', margin:'0'}}/>

            {/* Direct action CTA */}
            <div className="upsell-col-r" style={{paddingLeft:'40px', display:'flex', flexDirection:'column', justifyContent:'center', gap:'14px'}}>
              <p style={{fontFamily:F.body, fontSize:'13px', fontStyle:'italic', color:'rgba(250,248,243,0.3)', lineHeight:1.7, margin:0, fontWeight:300}}>
                The partnership windows documented in this tracker are open now. BRIDGE exists to help you walk through them.
              </p>
              <a href="#" style={{
                display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
                background:C.lime, color:C.ink,
                padding:'12px 0',
                fontFamily:F.sans, fontSize:'11px', fontWeight:800, letterSpacing:'0.3px',
                textDecoration:'none',
              }}>
                Book an analyst session →
              </a>
              <a href="#" style={{
                display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
                border:`1px solid rgba(255,255,255,0.1)`,
                color:'rgba(250,248,243,0.35)',
                padding:'11px 0',
                fontFamily:F.sans, fontSize:'10px', fontWeight:600, letterSpacing:'0.5px',
                textDecoration:'none',
              }}>
                Submit a co-financing inquiry →
              </a>
              <div style={{display:'flex', justifyContent:'center', gap:'16px'}}>
                {['48-hr response','Analyst-led','All 12 sectors'].map((t,i) => (
                  <span key={i} style={{fontFamily:F.sans, fontSize:'9px', color:'rgba(250,248,243,0.15)', letterSpacing:'0.3px'}}>{t}</span>
                ))}
              </div>
            </div>

          </div>

          </div>{/* end collapsible */}

        </div>
      </div>
    </div>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <div className="pad-footer" style={{background:C.forest, padding:'16px 64px', borderTop:`3px solid ${C.lime}`}}>
    <div className="footer-inner" style={{maxWidth:'900px', margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'10px'}}>
      <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
        <Logo height={18} variant="white"/>
        <div style={{width:'1px', height:'14px', background:'rgba(255,255,255,0.15)'}}/>
        <div style={{fontFamily:F.sans, fontSize:'10px', color:'rgba(250,248,243,0.35)'}}>
          Policy Intelligence · Q1 2026 · bridgepbc.com/intelligence
        </div>
      </div>
      <div className="footer-links" style={{display:'flex', gap:'14px'}}>
        {['All Sectors','Policy Briefs','Members','Contact'].map((l,i) => (
          <a key={i} href="#" style={{fontFamily:F.sans, fontSize:'10px', fontWeight:600, color:'rgba(250,248,243,0.35)', textDecoration:'none'}}>{l}</a>
        ))}
      </div>
    </div>
  </div>
);

// ─── Mobile Shell ─────────────────────────────────────────────────────────────
// Full-replacement mobile UX. Renders only at ≤600px via useIsMobile hook.
// Architecture: fixed header → section tab strip → scrollable pane → bottom sheet
const MobileShell = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [sheet, setSheet] = useState(null); // { type, data }
  const [pillarFilter, setPillarFilter] = useState('all');
  const paneRef = useRef(null);

  const TABS = [
    { id:'overview',    label:'Overview',    icon:'◈' },
    { id:'policies',    label:'Policies',    icon:'⊞' },
    { id:'intelligence',label:'Intelligence',icon:'◎' },
    { id:'risks',       label:'Risks',       icon:'⚡' },
    { id:'members',     label:'Members',     icon:'→' },
  ];

  // Reset scroll on tab change
  useEffect(() => {
    if (paneRef.current) paneRef.current.scrollTop = 0;
    setSheet(null);
  }, [activeTab]);

  const closeSheet = () => setSheet(null);

  // ── Tab: Overview ──────────────────────────────────────────────────────────
  const TabOverview = () => (
    <div style={{padding:'0 0 80px'}}>
      {/* Hero */}
      <div style={{background:C.ink, padding:'24px 16px 20px', marginBottom:'1px'}}>
        <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'12px'}}>
          <div style={{width:'20px', height:'1px', background:C.lime}}/>
          <span style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:C.lime}}>Policy Intelligence Brief · Q1 2026</span>
        </div>
        <h1 style={{fontFamily:F.display, fontSize:'28px', fontWeight:900, color:C.paper, lineHeight:1.05, marginBottom:'10px'}}>
          Ghana 2026 Budget<br/><span style={{fontStyle:'italic', color:C.lime}}>Policy Alignment</span> Tracker
        </h1>
        <p style={{fontFamily:F.body, fontSize:'13px', lineHeight:1.7, color:'rgba(250,248,243,0.55)', fontWeight:300, marginBottom:'20px'}}>
          {BUDGET_CONTEXT.theme}
        </p>
        {/* 4 stats — 2×2 */}
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1px', background:'rgba(255,255,255,0.06)'}}>
          {[
            {v:'12', l:'Policies Tracked'},
            {v:'GH₵150B+', l:'Total Aligned'},
            {v:'7', l:'Budget Pillars'},
            {v:'83%', l:'Avg Alignment'},
          ].map((s,i) => (
            <div key={i} style={{background:C.ink, padding:'14px 16px'}}>
              <div style={{fontFamily:F.mono, fontSize:'22px', fontWeight:500, color:C.lime, marginBottom:'2px'}}>{s.v}</div>
              <div style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(255,255,255,0.28)'}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget context — tap to expand */}
      <MobAccordion
        label="Budget Context"
        hint="24H+ Framework · GH₵271.7B"
        dark={false}
      >
        <div style={{padding:'4px 0 8px'}}>
          <p style={{fontFamily:F.body, fontSize:'13px', lineHeight:1.8, color:C.ink, fontWeight:300, marginBottom:'14px'}}>
            Ghana's 2026 Budget, presented under "Resetting for Growth, Jobs, and Economic Transformation," creates seven policy pillars mapping precisely to BRIDGE's twelve-sector portfolio.
          </p>
          <div style={{borderLeft:`3px solid ${C.lime}`, paddingLeft:'14px', marginBottom:'14px'}}>
            <p style={{fontFamily:F.display, fontSize:'14px', fontStyle:'italic', fontWeight:600, color:C.forest, lineHeight:1.55}}>
              "This is not merely policy alignment — it is policy validation."
            </p>
          </div>
          <div style={{background:C.forest, padding:'14px'}}>
            <div style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:C.lime, marginBottom:'10px'}}>24H+ Pillars</div>
            {PILLARS.map((p,i) => (
              <div key={i} style={{display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom:i<PILLARS.length-1?'1px solid rgba(255,255,255,0.06)':'none'}}>
                <span style={{fontFamily:F.sans, fontSize:'12px', fontWeight:700, color:C.paper}}>{p.label}</span>
                <span style={{fontFamily:F.mono, fontSize:'9px', color:'rgba(250,248,243,0.4)'}}>Sec {p.sectors}</span>
              </div>
            ))}
          </div>
        </div>
      </MobAccordion>

      {/* Key metrics */}
      <MobAccordion label="Key Metrics" hint="6 indicators across all pillars">
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1px', background:C.border, marginTop:'4px'}}>
          {METRICS.map((m,i) => (
            <div key={i} style={{background:C.paper, padding:'12px 14px'}}>
              <div style={{fontFamily:F.mono, fontSize:'20px', fontWeight:500, color:C.forest, marginBottom:'2px'}}>{m.value}</div>
              <div style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:C.muted, marginBottom:'2px'}}>{m.label}</div>
              <div style={{fontFamily:F.body, fontSize:'10px', fontStyle:'italic', color:C.faint}}>{m.note}</div>
            </div>
          ))}
        </div>
      </MobAccordion>

      {/* Imperatives preview — tap items for detail */}
      <MobAccordion label="Strategic Actions" hint="6 priority actions · Q1–Q4 2026">
        <div style={{paddingTop:'4px'}}>
          {[
            {rank:'01',urgency:'Immediate',title:'Engage 24-Hour Economy Authority',timeline:'Q1–Q2 2026',color:C.red},
            {rank:'02',urgency:'Immediate',title:'Activate DBG Oil Palm Finance Window',timeline:'Q2 2026',color:C.red},
            {rank:'03',urgency:'Immediate',title:'Position as Sankofa Operating Partner',timeline:'Q1 2026',color:C.red},
            {rank:'04',urgency:'Q2 2026',title:'Establish WDB Complementary Partnership',timeline:'Q2 2026',color:C.amber},
            {rank:'05',urgency:'Q2 2026',title:'Commence COTVET Placement Commitments',timeline:'Q2–Q3 2026',color:C.amber},
            {rank:'06',urgency:'Q3 2026',title:'Sequence Agricultural Enclave Road Entry',timeline:'Q3–Q4 2026',color:C.positive},
          ].map((item,i) => (
            <div key={i} style={{display:'flex', gap:'12px', alignItems:'flex-start', padding:'11px 0', borderBottom:i<5?`1px solid ${C.border}`:'none'}}>
              <div style={{width:'3px', background:item.color, alignSelf:'stretch', flexShrink:0, minHeight:'32px'}}/>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontFamily:F.mono, fontSize:'9px', fontWeight:700, color:item.color, marginBottom:'3px'}}>{item.rank} · {item.urgency}</div>
                <div style={{fontFamily:F.sans, fontSize:'12px', fontWeight:700, color:C.ink, lineHeight:1.3, marginBottom:'3px'}}>{item.title}</div>
                <div style={{fontFamily:F.mono, fontSize:'9px', color:C.faint}}>{item.timeline}</div>
              </div>
            </div>
          ))}
        </div>
      </MobAccordion>
    </div>
  );

  // ── Tab: Policies ──────────────────────────────────────────────────────────
  const TabPolicies = () => {
    const filtered = pillarFilter === 'all' ? POLICIES : POLICIES.filter(p => p.pillar === pillarFilter);
    return (
      <div style={{padding:'0 0 80px'}}>
        {/* Filter — horizontal scroll pills */}
        <div style={{background:C.paperDark, borderBottom:`1px solid ${C.border}`, padding:'10px 16px'}}>
          <div style={{display:'flex', gap:'6px', overflowX:'auto', scrollbarWidth:'none', paddingBottom:'2px'}}>
            {[{id:'all',label:'All'},...PILLARS.map(p=>({id:p.id,label:p.label}))].map(f => (
              <button key={f.id} onClick={() => setPillarFilter(f.id)} style={{
                fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase',
                padding:'5px 12px', whiteSpace:'nowrap', flexShrink:0,
                background:pillarFilter===f.id ? C.forest : 'transparent',
                color:pillarFilter===f.id ? C.lime : C.muted,
                border:`1px solid ${pillarFilter===f.id ? C.forest : C.border}`,
                cursor:'pointer',
              }}>{f.label}</button>
            ))}
          </div>
        </div>
        {/* Count */}
        <div style={{padding:'10px 16px 6px', fontFamily:F.sans, fontSize:'9px', color:C.faint, letterSpacing:'1px', textTransform:'uppercase'}}>
          {filtered.length} polic{filtered.length===1?'y':'ies'} · tap to expand
        </div>
        {/* Policy cards — tap opens bottom sheet */}
        {filtered.map((p,i) => {
          const pillar = PILLARS.find(pl => pl.id === p.pillar) || PILLARS[0];
          const urgColor = p.urgency==='high' ? C.red : p.urgency==='medium' ? C.amber : C.positive;
          return (
            <button key={p.id} onClick={() => setSheet({type:'policy', data:p})} style={{
              display:'block', width:'100%', textAlign:'left', background:C.paper,
              border:'none', borderBottom:`1px solid ${C.border}`, padding:'14px 16px',
              cursor:'pointer',
            }}>
              <div style={{display:'flex', gap:'10px', alignItems:'flex-start'}}>
                {/* Alignment bar */}
                <div style={{width:'3px', flexShrink:0, alignSelf:'stretch', minHeight:'48px', background:C.border, position:'relative'}}>
                  <div style={{position:'absolute', bottom:0, left:0, width:'100%', height:`${p.alignment}%`, background:C.lime}}/>
                </div>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'5px'}}>
                    <div style={{display:'flex', gap:'6px', alignItems:'center', flexWrap:'wrap'}}>
                      <span style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:pillar.color}}>{pillar.label}</span>
                      <span style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, color:urgColor}}>
                        {p.urgency==='high' ? '● High' : p.urgency==='medium' ? '◐ Med' : '○ Mon'}
                      </span>
                    </div>
                    <span style={{fontFamily:F.mono, fontSize:'11px', fontWeight:700, color:C.forest, flexShrink:0}}>{p.alignment}%</span>
                  </div>
                  <div style={{fontFamily:F.sans, fontSize:'13px', fontWeight:700, color:C.ink, lineHeight:1.3, marginBottom:'3px'}}>{p.title}</div>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <span style={{fontFamily:F.sans, fontSize:'10px', color:C.muted}}>{p.body}</span>
                    <span style={{fontFamily:F.mono, fontSize:'10px', color:C.teal, fontWeight:700, flexShrink:0, marginLeft:'8px'}}>{p.allocation}</span>
                  </div>
                </div>
                <span style={{fontFamily:F.mono, fontSize:'12px', color:C.faint, flexShrink:0, marginTop:'2px'}}>›</span>
              </div>
            </button>
          );
        })}
      </div>
    );
  };

  // ── Tab: Intelligence ──────────────────────────────────────────────────────
  const TabIntelligence = () => (
    <div style={{padding:'0 0 80px'}}>
      {/* Pillar Map — compact */}
      <MobAccordion label="24H+ Pillar Map" hint="7 pillars · alignment scores">
        <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'2px', marginTop:'8px'}}>
          {PILLARS.map(p => {
            const ps = POLICIES.filter(pol => pol.pillar === p.id);
            const avg = ps.length ? Math.round(ps.reduce((s,pol) => s+pol.alignment,0)/ps.length) : 0;
            return (
              <div key={p.id} style={{background:C.paperDark, border:`1px solid ${C.border}`, padding:'10px 8px', textAlign:'center'}}>
                <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, color:C.forest, letterSpacing:'0.5px', marginBottom:'6px'}}>{p.label}</div>
                <div style={{fontFamily:F.mono, fontSize:'18px', fontWeight:500, color:C.ink, marginBottom:'4px'}}>{avg}%</div>
                <div style={{height:'3px', background:C.border}}><div style={{height:'100%', width:`${avg}%`, background:C.lime}}/></div>
              </div>
            );
          })}
        </div>
      </MobAccordion>

      {/* Partnership Modes */}
      <MobAccordion label="Partnership Modes" hint="6 government engagement pathways">
        {[
          {code:'CO',label:'Co-Financing Partner',desc:'DBG, GIIF, WDB capital co-financing. Blended finance multiplies diaspora capital impact.'},
          {code:'SD',label:'Service Delivery Partner',desc:'WDB trader support, COTVET placement, Farmer Service Centers.'},
          {code:'TP',label:'Technical Partnership',desc:'Market digitization, supply chain design, health systems, EdTech.'},
          {code:'PP',label:'PPP Structures',desc:'Ghana PPP Act (2020) enables BRIDGE infrastructure as concessions.'},
          {code:'ZT',label:'Zone Tenancy',desc:'GFZA — 100% duty exemption, 10-year tax holiday for manufacturing.'},
          {code:'GP',label:'Government Procurement',desc:'MDA procurement and GovTech pipeline entry via AfCFTA protocols.'},
        ].map((m,i) => (
          <div key={i} style={{display:'flex', gap:'12px', alignItems:'flex-start', padding:'11px 0', borderBottom:i<5?`1px solid ${C.border}`:'none'}}>
            <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1px', color:C.lime, background:C.forest, width:'32px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>{m.code}</div>
            <div>
              <div style={{fontFamily:F.sans, fontSize:'12px', fontWeight:700, color:C.forest, marginBottom:'3px'}}>{m.label}</div>
              <p style={{fontFamily:F.body, fontSize:'11px', lineHeight:1.6, color:C.muted, fontWeight:300, margin:0}}>{m.desc}</p>
            </div>
          </div>
        ))}
      </MobAccordion>

      {/* Legislative tracker */}
      <MobAccordion label="Legislative Tracker" hint="8 bills · tap for detail">
        {['B01','B02','B03','B04','B05','B06','B07','B08'].map((id,i) => {
          const bills = [
            {id:'B01',status:'Passed',sc:C.positive,title:'Ghana PPP Act 2020',impact:'High'},
            {id:'B02',status:'Active',sc:C.positive,title:'Insurance Act 2021',impact:'Medium'},
            {id:'B03',status:'Pending',sc:C.amber,title:'Digital Credit Directive 2025',impact:'High'},
            {id:'B04',status:'Announced',sc:C.amber,title:'24-Hour Economy Authority Act',impact:'Critical'},
            {id:'B05',status:'Announced',sc:C.amber,title:'Ghana Diaspora Investment Act',impact:'High'},
            {id:'B06',status:'Pending',sc:C.amber,title:'Warehouse Receipt System Act',impact:'High'},
            {id:'B07',status:'Announced',sc:C.amber,title:'24H+ Economy Framework Gazette',impact:'High'},
            {id:'B08',status:'Announced',sc:C.amber,title:'Creative Arts Industry Support Fund',impact:'Medium'},
          ];
          const b = bills[i];
          return (
            <button key={id} onClick={() => setSheet({type:'bill', data:b})} style={{
              display:'flex', gap:'10px', alignItems:'center', width:'100%', textAlign:'left',
              background:'transparent', border:'none', borderBottom:i<7?`1px solid ${C.border}`:'none',
              padding:'10px 0', cursor:'pointer',
            }}>
              <span style={{fontFamily:F.mono, fontSize:'9px', fontWeight:700, color:C.faint, flexShrink:0, width:'28px'}}>{b.id}</span>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontFamily:F.sans, fontSize:'12px', fontWeight:700, color:C.ink, lineHeight:1.3}}>{b.title}</div>
              </div>
              <span style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'1px', color:b.sc, textTransform:'uppercase', flexShrink:0}}>{b.status}</span>
              <span style={{fontFamily:F.mono, fontSize:'12px', color:C.faint, flexShrink:0}}>›</span>
            </button>
          );
        })}
      </MobAccordion>

      {/* Budget Execution Monitor — Q tabs */}
      <MobAccordion label="Budget Execution Monitor" hint="Q1–Q4 2026 milestones">
        <div style={{paddingTop:'8px'}}>
          {[
            {q:'Q1 2026',status:'Current',items:['24-Hour Economy Authority — In Progress','DBG Oil Palm Finance Window — Terms Set','Sankofa Initiative Hubs — Announced','WDB Capitalization — Operational','COTVET Free TVET — Enrollment Open']},
            {q:'Q2 2026',status:'Upcoming',items:['Oil Palm Co-Financing Close','Model Market Pilot Selection','Ghana Free Zones Applications','Agricultural Enclave Roads Start','Digital Credit Directive Final']},
            {q:'Q3 2026',status:'Planned',items:['Enclave Road Construction','TVET Placement Cohort 1','MahamaCares Phase 2','Creative Arts Fund Governance','GIIF Co-Investment Pipeline']},
            {q:'Q4 2026',status:'Forecast',items:['2027 Budget Consultation','Oil Palm Season Assessment','24H+ Mid-Term Review','Sankofa Investment Forum','District Partnership Expansion']},
          ].map((quarter,qi) => (
            <div key={qi} style={{marginBottom:'12px'}}>
              <div style={{display:'flex', gap:'8px', alignItems:'center', marginBottom:'6px'}}>
                <span style={{fontFamily:F.mono, fontSize:'11px', fontWeight:700, color:qi===0?C.forest:C.muted}}>{quarter.q}</span>
                <span style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:qi===0?C.lime:C.faint, background:qi===0?C.forest:'transparent', padding:qi===0?'2px 6px':'0'}}>{quarter.status}</span>
              </div>
              {quarter.items.map((item,ii) => (
                <div key={ii} style={{display:'flex', gap:'8px', alignItems:'flex-start', padding:'4px 0'}}>
                  <span style={{color:C.lime, fontSize:'8px', flexShrink:0, marginTop:'3px'}}>→</span>
                  <span style={{fontFamily:F.sans, fontSize:'11px', color:C.muted, lineHeight:1.5}}>{item}</span>
                </div>
              ))}
              {qi<3 && <div style={{height:'1px', background:C.border, marginTop:'10px'}}/>}
            </div>
          ))}
        </div>
      </MobAccordion>
    </div>
  );

  // ── Tab: Risks ─────────────────────────────────────────────────────────────
  const TabRisks = () => {
    const risks = [
      {id:'R01',sev:'High',color:C.red,category:'Political',title:'Policy Reversal After Administration Change',prob:'Low–Medium',impact:'Critical',mitigation:'Structure all partnerships via formal MOUs and contracts. Engage across party lines. Ensure outcomes are visible and attributable.',bridgeAction:'Prioritize legal contract structures over political goodwill.'},
      {id:'R02',sev:'High',color:C.red,category:'Institutional',title:'24-Hour Economy Authority Implementation Delay',prob:'Medium–High',impact:'High',mitigation:'Engage at working level in parallel with Authority establishment. Build relationships surviving personnel changes.',bridgeAction:'Pursue dual-track: formal Authority + operational MMDAs now.'},
      {id:'R03',sev:'High',color:C.red,category:'Financial',title:'Cedi Depreciation & FX Risk',prob:'Medium',impact:'High',mitigation:'USD-denominated returns, FX hedging where available, local cost base with international revenue streams.',bridgeAction:'Structure ventures with natural FX hedges where possible.'},
      {id:'R04',sev:'Medium',color:C.amber,category:'Regulatory',title:'Digital Credit Directive Compliance Risk',prob:'Medium',impact:'Medium',mitigation:'Pre-build compliance architecture before June 2026 deadline. Engage BOG consultation process directly.',bridgeAction:'Assign compliance lead to Digital Credit Directive tracker.'},
      {id:'R05',sev:'Medium',color:C.amber,category:'Execution',title:'Government Co-Financing Disbursement Delays',prob:'High',impact:'Medium',mitigation:'Do not build timelines assuming government disbursement. Sequence private capital first, government as additive.',bridgeAction:'All venture financial models assume government is non-critical path.'},
      {id:'R06',sev:'Medium',color:C.amber,category:'Market',title:'Sankofa Initiative Operationalization Gap',prob:'Medium',impact:'Medium',mitigation:'Position BRIDGE as preferred operating partner before institutional structure locks. Create leverage via early engagement.',bridgeAction:'Engage Office of Diaspora Affairs before Authority structure is finalized.'},
      {id:'R07',sev:'Low',color:C.positive,category:'Competitive',title:'International Development Finance Competition',prob:'Low',impact:'Low',mitigation:'BRIDGE integrated portfolio model creates differentiation unavailable to single-sector players.',bridgeAction:'Emphasize cross-sector synergies in all investor and partner communications.'},
      {id:'R08',sev:'Low',color:C.positive,category:'Operational',title:'Key Person Risk in BRIDGE Operations',prob:'Low',impact:'Medium',mitigation:'Institutional processes over personal relationships. Document all government contacts and relationship history.',bridgeAction:'Build institutional intelligence systems not dependent on individuals.'},
    ];

    return (
      <div style={{padding:'0 0 80px'}}>
        <div style={{padding:'12px 16px 8px', fontFamily:F.sans, fontSize:'9px', color:C.faint, letterSpacing:'1px', textTransform:'uppercase'}}>
          8 material risks · tap for mitigation detail
        </div>
        {risks.map((r,i) => (
          <button key={r.id} onClick={() => setSheet({type:'risk', data:r})} style={{
            display:'block', width:'100%', textAlign:'left', background:C.paper,
            border:'none', borderBottom:`1px solid ${C.border}`, padding:'0', cursor:'pointer',
          }}>
            {/* Centered tag */}
            <div style={{display:'flex', alignItems:'center', gap:'8px', justifyContent:'center', padding:'10px 16px 4px', borderTop:i>0?'none':'none'}}>
              <div style={{height:'1px', flex:1, background:r.color, opacity:0.3}}/>
              <span style={{fontFamily:F.mono, fontSize:'9px', fontWeight:700, color:r.color, letterSpacing:'1px'}}>{r.id}</span>
              <span style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.faint}}>·</span>
              <span style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.faint}}>{r.category}</span>
              <div style={{height:'1px', flex:1, background:r.color, opacity:0.3}}/>
            </div>
            <div style={{padding:'4px 16px 12px'}}>
              <div style={{fontFamily:F.sans, fontSize:'13px', fontWeight:700, color:C.ink, lineHeight:1.3, marginBottom:'6px'}}>{r.title}</div>
              <div style={{display:'flex', gap:'6px', alignItems:'center', justifyContent:'space-between'}}>
                <div style={{display:'flex', gap:'6px'}}>
                  <span style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'1px', color:C.muted, border:`1px solid ${C.border}`, padding:'2px 6px', textTransform:'uppercase'}}>P: {r.prob}</span>
                  <span style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'1px', color:r.color, border:`1px solid ${r.color}`, padding:'2px 6px', textTransform:'uppercase'}}>I: {r.impact}</span>
                </div>
                <span style={{fontFamily:F.mono, fontSize:'12px', color:C.faint}}>›</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  };

  // ── Tab: Members ───────────────────────────────────────────────────────────
  const TabMembers = () => {
    const [engOpen, setEngOpen] = useState(null);
    const engagements = [
      {icon:'◎', label:'Book analyst session', desc:'45-minute one-on-one. Submit sector focus and question. Response within 48 hours.', cta:'Request session'},
      {icon:'⊞', label:'Co-financing inquiry', desc:'Submit your venture concept against DBG, GIIF, WDB windows. Assessment in 5 days.', cta:'Submit inquiry'},
      {icon:'◈', label:'Venture assessment', desc:'Flag a venture for BRIDGE portfolio review. Structured feedback from the analyst team.', cta:'Submit venture'},
      {icon:'→', label:'Government introduction', desc:'Request an introduction to a ministry or MDA contact relevant to your sector.', cta:'Request intro'},
    ];
    return (
      <div style={{padding:'0 0 80px'}}>
        {/* Hero — engagement framing */}
        <div style={{background:C.ink, padding:'24px 16px'}}>
          <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'14px'}}>
            <div style={{width:'20px', height:'1px', background:C.lime, opacity:0.7}}/>
            <span style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:C.lime}}>Your Membership</span>
          </div>
          <h2 style={{fontFamily:F.display, fontSize:'26px', fontWeight:700, color:C.paper, lineHeight:1.1, marginBottom:'10px'}}>
            Intelligence is only useful<br/>
            <span style={{fontStyle:'italic', color:'rgba(250,248,243,0.35)', fontWeight:400}}>when it drives action.</span>
          </h2>
          <p style={{fontFamily:F.body, fontSize:'13px', lineHeight:1.7, color:'rgba(250,248,243,0.5)', fontWeight:300, marginBottom:'20px'}}>
            The partnership windows in this tracker are open now. Your membership gives you the direct lines to walk through them.
          </p>
          {/* Current tier */}
          <div style={{display:'flex', alignItems:'center', gap:'8px', padding:'10px 14px', border:'1px solid rgba(184,217,53,0.2)', background:'rgba(184,217,53,0.06)', marginBottom:'16px'}}>
            <div style={{width:'6px', height:'6px', borderRadius:'50%', background:C.lime, flexShrink:0}}/>
            <div>
              <span style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:C.lime}}>Network Member</span>
              <span style={{fontFamily:F.sans, fontSize:'10px', color:'rgba(250,248,243,0.3)', fontWeight:300, marginLeft:'10px'}}>Active</span>
            </div>
          </div>
          {/* Primary CTAs */}
          <div style={{display:'flex', flexDirection:'column', gap:'8px'}}>
            <a href="#" style={{display:'block', textAlign:'center', background:C.lime, color:C.ink, padding:'12px', fontFamily:F.sans, fontSize:'11px', fontWeight:800, letterSpacing:'0.3px', textDecoration:'none'}}>
              Book an analyst session →
            </a>
            <a href="#" style={{display:'block', textAlign:'center', border:'1px solid rgba(255,255,255,0.12)', color:'rgba(250,248,243,0.4)', padding:'11px', fontFamily:F.sans, fontSize:'10px', fontWeight:600, letterSpacing:'0.5px', textDecoration:'none'}}>
              Submit a co-financing inquiry →
            </a>
          </div>
        </div>

        {/* What you can do — tap each for detail */}
        <div style={{padding:'0 16px'}}>
          <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:C.muted, padding:'16px 0 10px'}}>Actions available to you now</div>
          {engagements.map((e,i) => (
            <div key={i} style={{borderBottom:`1px solid ${C.border}`}}>
              <button onClick={() => setEngOpen(engOpen===i?null:i)} style={{width:'100%', padding:'12px 0', background:'transparent', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:'12px', textAlign:'left'}}>
                <span style={{fontFamily:F.mono, fontSize:'16px', color:C.lime, flexShrink:0, width:'24px'}}>{e.icon}</span>
                <div style={{flex:1}}>
                  <div style={{fontFamily:F.sans, fontSize:'12px', fontWeight:700, color:C.ink, marginBottom:'2px'}}>{e.label}</div>
                  {engOpen===i && <p style={{fontFamily:F.body, fontSize:'11px', lineHeight:1.65, color:C.muted, fontWeight:300, margin:'6px 0 10px'}}>{e.desc}</p>}
                </div>
                <span style={{fontFamily:F.mono, fontSize:'12px', color:C.faint, flexShrink:0, transform:engOpen===i?'rotate(90deg)':'none', transition:'transform 0.2s', display:'block'}}>›</span>
              </button>
              {engOpen===i && (
                <div style={{padding:'0 0 12px 36px'}}>
                  <a href="#" style={{display:'inline-flex', alignItems:'center', gap:'6px', background:C.forest, color:C.lime, padding:'8px 16px', fontFamily:F.sans, fontSize:'10px', fontWeight:700, textDecoration:'none', letterSpacing:'0.3px'}}>
                    {e.cta} →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Deeper engagement ladder */}
        <MobAccordion label="Deepen your engagement" hint="Contributor · Investor · Strategic Partner">
          <div style={{paddingTop:'4px'}}>
            {/* Contributor */}
            <div style={{borderLeft:`2px solid ${C.lime}`, padding:'12px 14px', marginBottom:'12px', background:'rgba(27,77,62,0.04)'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'6px'}}>
                <div>
                  <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:C.forest, marginBottom:'2px'}}>Contributor</div>
                  <div style={{fontFamily:F.sans, fontSize:'10px', color:C.muted, fontWeight:300}}>$500–$2,000/yr · or 10+ hrs/quarter</div>
                </div>
                <span style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, color:C.lime, letterSpacing:'1.5px', textTransform:'uppercase', background:'rgba(27,77,62,0.08)', padding:'3px 8px', flexShrink:0}}>Recommended</span>
              </div>
              <p style={{fontFamily:F.body, fontSize:'12px', lineHeight:1.65, color:C.muted, fontWeight:300, marginBottom:'10px'}}>
                Deal flow observer status. Advisory matching. Contributor retreats. Direct engagement with BRIDGE leadership.
              </p>
              <a href="#" style={{display:'inline-flex', alignItems:'center', gap:'6px', background:C.forest, color:C.lime, padding:'8px 16px', fontFamily:F.sans, fontSize:'10px', fontWeight:700, textDecoration:'none', letterSpacing:'0.3px'}}>
                Upgrade to Contributor →
              </a>
            </div>
            {/* Investor */}
            <div style={{padding:'12px 0', borderTop:`1px solid ${C.border}`, marginTop:'4px'}}>
              <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:C.muted, marginBottom:'3px'}}>Investor</div>
              <div style={{fontFamily:F.sans, fontSize:'11px', color:C.muted, fontWeight:300, marginBottom:'6px'}}>$10K / $50K / $250K / $1M+ · LP rights · quarterly reporting · co-investment</div>
              <a href="#" style={{fontFamily:F.sans, fontSize:'10px', fontWeight:700, color:C.forest, textDecoration:'none'}}>Inquire about investor access →</a>
            </div>
            {/* Strategic Partner */}
            <div style={{padding:'12px 0', borderTop:`1px solid ${C.border}`}}>
              <div style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:C.muted, marginBottom:'3px'}}>Strategic Partner</div>
              <div style={{fontFamily:F.sans, fontSize:'11px', color:C.muted, fontWeight:300, marginBottom:'6px'}}>$1M+ or exceptional value · Board access · Named programs · By invitation</div>
              <a href="#" style={{fontFamily:F.sans, fontSize:'10px', fontWeight:700, color:C.forest, textDecoration:'none'}}>Express interest →</a>
            </div>
          </div>
        </MobAccordion>

        {/* How to engage FAQ */}
        <MobAccordion label="How engagement works" hint="Sessions · inquiries · assessments">
          {[
            {q:'How do I book an analyst session?', a:'Submit through the member portal with your sector focus and question. Sessions are 45 minutes via video call. Response within 48 hours.'},
            {q:'What does a co-financing inquiry involve?', a:'Submit your venture concept and capital requirement. Analysts assess eligibility against DBG, GIIF, WDB, and other active windows. Assessment returned within 5 business days.'},
            {q:'How do I submit a venture for assessment?', a:'Use the venture submission form in the member portal. Include sector, capital range, stage, and specific question. BRIDGE team provides structured feedback within 7 days.'},
          ].map((f,i,arr) => <MobFaqItem key={i} q={f.q} a={f.a} last={i===arr.length-1}/>)}
        </MobAccordion>
      </div>
    );
  };

  // ── Shared sub-components ──────────────────────────────────────────────────
  const MobFaqItem = ({q,a,last}) => {
    const [open,setOpen] = useState(false);
    return (
      <div style={{borderBottom:last?'none':`1px solid ${C.border}`}}>
        <button onClick={() => setOpen(o=>!o)} style={{width:'100%', padding:'11px 0', background:'transparent', border:'none', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', gap:'12px'}}>
          <span style={{fontFamily:F.sans, fontSize:'12px', fontWeight:600, color:C.ink, textAlign:'left', lineHeight:1.4}}>{q}</span>
          <span style={{fontFamily:F.sans, fontSize:'16px', fontWeight:300, color:C.faint, flexShrink:0, transform:open?'rotate(45deg)':'none', transition:'transform 0.2s', display:'block'}}>+</span>
        </button>
        {open && <p style={{fontFamily:F.body, fontSize:'12px', lineHeight:1.75, color:C.muted, fontWeight:300, paddingBottom:'12px', margin:0}}>{a}</p>}
      </div>
    );
  };

  // ── Bottom sheet ───────────────────────────────────────────────────────────
  const BottomSheet = () => {
    if (!sheet) return null;
    const {type, data} = sheet;
    return (
      <>
        {/* Backdrop */}
        <div onClick={closeSheet} style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', zIndex:400}}/>
        {/* Sheet */}
        <div style={{
          position:'fixed', bottom:0, left:0, right:0, zIndex:500,
          background:C.paper, borderRadius:'12px 12px 0 0',
          maxHeight:'85vh', overflow:'hidden', display:'flex', flexDirection:'column',
          boxShadow:'0 -4px 32px rgba(0,0,0,0.2)',
        }}>
          {/* Handle + close */}
          <div style={{padding:'12px 16px 0', display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0}}>
            <div style={{width:'36px', height:'4px', background:C.border, borderRadius:'2px', margin:'0 auto'}}/>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 16px 12px', borderBottom:`1px solid ${C.border}`, flexShrink:0}}>
            <span style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:C.muted}}>
              {type==='policy' ? 'Policy Detail' : type==='risk' ? 'Risk Analysis' : 'Legislative Detail'}
            </span>
            <button onClick={closeSheet} style={{background:'transparent', border:`1px solid ${C.border}`, width:'28px', height:'28px', cursor:'pointer', fontFamily:F.mono, fontSize:'14px', color:C.muted, display:'flex', alignItems:'center', justifyContent:'center'}}>×</button>
          </div>
          {/* Scrollable content */}
          <div style={{overflowY:'auto', flex:1, padding:'16px', WebkitOverflowScrolling:'touch'}}>
            {type==='policy' && <SheetPolicy p={data}/>}
            {type==='risk' && <SheetRisk r={data}/>}
            {type==='bill' && <SheetBill b={data}/>}
          </div>
        </div>
      </>
    );
  };

  const SheetPolicy = ({p}) => {
    const pillar = PILLARS.find(pl => pl.id === p.pillar) || PILLARS[0];
    const urgColor = p.urgency==='high' ? C.red : p.urgency==='medium' ? C.amber : C.positive;
    return (
      <div style={{paddingBottom:'20px'}}>
        <div style={{display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'8px'}}>
          <span style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:pillar.color}}>{pillar.label}</span>
          <span style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, color:urgColor}}>{p.urgency==='high'?'● High Priority':p.urgency==='medium'?'◐ Medium':'○ Monitoring'}</span>
          <span style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, color:p.statusColor, textTransform:'uppercase', letterSpacing:'1px'}}>{p.status}</span>
        </div>
        <h3 style={{fontFamily:F.display, fontSize:'20px', fontWeight:700, color:C.ink, lineHeight:1.2, marginBottom:'6px'}}>{p.title}</h3>
        <div style={{fontFamily:F.sans, fontSize:'10px', color:C.muted, marginBottom:'14px'}}>{p.body}</div>
        {/* Alignment score */}
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'4px'}}>
          <span style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.muted}}>Portfolio Alignment</span>
          <span style={{fontFamily:F.mono, fontSize:'12px', fontWeight:700, color:C.forest}}>{p.alignment}%</span>
        </div>
        <div style={{height:'4px', background:C.border, marginBottom:'16px'}}>
          <div style={{height:'100%', width:`${p.alignment}%`, background:C.lime}}/>
        </div>
        {/* Meta */}
        <div style={{display:'flex', gap:'16px', marginBottom:'14px', flexWrap:'wrap'}}>
          <div><div style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.muted, marginBottom:'3px'}}>Allocation</div><div style={{fontFamily:F.mono, fontSize:'12px', fontWeight:700, color:C.teal}}>{p.allocation}</div></div>
          <div><div style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.muted, marginBottom:'3px'}}>Timeline</div><div style={{fontFamily:F.mono, fontSize:'12px', color:C.forest}}>{p.timeline}</div></div>
        </div>
        {/* Bridge role */}
        <div style={{background:C.paperDark, padding:'12px', marginBottom:'12px'}}>
          <div style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:C.muted, marginBottom:'6px'}}>BRIDGE Role & Alignment</div>
          <p style={{fontFamily:F.body, fontSize:'12px', lineHeight:1.75, color:C.ink, fontWeight:300, margin:0}}>{p.bridge}</p>
        </div>
        {/* Ventures */}
        <div style={{marginBottom:'12px'}}>
          <div style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.muted, marginBottom:'8px'}}>Aligned Ventures</div>
          <div style={{display:'flex', gap:'6px', flexWrap:'wrap'}}>
            {p.initiatives.map((v,i) => (<span key={i} style={{fontFamily:F.sans, fontSize:'10px', fontWeight:700, color:C.forest, border:`1px solid ${C.border}`, padding:'4px 10px'}}>→ {v}</span>))}
          </div>
        </div>
        {/* Window */}
        <div style={{borderLeft:`3px solid ${urgColor}`, paddingLeft:'12px'}}>
          <div style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.muted, marginBottom:'4px'}}>Strategic Window</div>
          <p style={{fontFamily:F.body, fontSize:'12px', lineHeight:1.7, color:C.ink, fontStyle:'italic', fontWeight:300, margin:0}}>{p.window}</p>
        </div>
      </div>
    );
  };

  const SheetRisk = ({r}) => (
    <div style={{paddingBottom:'20px'}}>
      <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px'}}>
        <div style={{height:'1px', flex:1, background:r.color, opacity:0.4}}/>
        <span style={{fontFamily:F.mono, fontSize:'10px', fontWeight:700, color:r.color, letterSpacing:'1px'}}>{r.id} · {r.category}</span>
        <div style={{height:'1px', flex:1, background:r.color, opacity:0.4}}/>
      </div>
      <h3 style={{fontFamily:F.display, fontSize:'20px', fontWeight:700, color:C.ink, lineHeight:1.2, marginBottom:'10px'}}>{r.title}</h3>
      <div style={{display:'flex', gap:'6px', marginBottom:'14px'}}>
        <span style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'1px', color:C.muted, border:`1px solid ${C.border}`, padding:'3px 8px', textTransform:'uppercase'}}>P: {r.prob}</span>
        <span style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'1px', color:r.color, border:`1px solid ${r.color}`, padding:'3px 8px', textTransform:'uppercase'}}>I: {r.impact}</span>
      </div>
      <div style={{background:C.forest, padding:'12px', marginBottom:'12px'}}>
        <div style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.lime, marginBottom:'6px'}}>Mitigation</div>
        <p style={{fontFamily:F.body, fontSize:'12px', lineHeight:1.7, color:'rgba(250,248,243,0.7)', fontWeight:300, margin:0}}>{r.mitigation}</p>
      </div>
      <div style={{borderLeft:`2px solid ${C.lime}`, paddingLeft:'10px'}}>
        <p style={{fontFamily:F.body, fontSize:'12px', fontStyle:'italic', color:C.forest, lineHeight:1.5, margin:0}}>{r.bridgeAction}</p>
      </div>
    </div>
  );

  const SheetBill = ({b}) => (
    <div style={{paddingBottom:'20px'}}>
      <div style={{display:'flex', gap:'8px', alignItems:'center', marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono, fontSize:'10px', fontWeight:700, color:C.faint}}>{b.id}</span>
        <span style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:b.sc}}>{b.status}</span>
        <span style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1px', color:b.impact==='Critical'?C.red:b.impact==='High'?C.amber:C.muted, border:`1px solid ${b.impact==='Critical'?C.red:b.impact==='High'?C.amber:C.border}`, padding:'2px 6px', textTransform:'uppercase'}}>{b.impact}</span>
      </div>
      <h3 style={{fontFamily:F.display, fontSize:'20px', fontWeight:700, color:C.ink, lineHeight:1.2, marginBottom:'6px'}}>{b.title}</h3>
      <p style={{fontFamily:F.body, fontSize:'13px', lineHeight:1.75, color:C.muted, fontWeight:300}}>Full legislative detail available in the Members intelligence platform. This bill is actively tracked for BRIDGE portfolio compliance and opportunity alignment.</p>
    </div>
  );

  // ── Main render ────────────────────────────────────────────────────────────
  const tabs = [TabOverview, TabPolicies, TabIntelligence, TabRisks, TabMembers];
  const ActiveTab = tabs[activeTab];

  return (
    <div style={{position:'fixed', inset:0, background:C.paper, display:'flex', flexDirection:'column', fontFamily:F.body, overflow:'hidden'}}>
      <Gf/>
      {/* Header */}
      <div style={{background:C.ink, padding:'10px 16px', display:'flex', justifyContent:'space-between', alignItems:'center', flexShrink:0, borderBottom:'2px solid rgba(184,217,53,0.2)'}}>
        <Logo height={20} variant="white"/>
        <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
          <span style={{fontFamily:F.sans, fontSize:'8px', fontWeight:700, color:C.lime, background:'rgba(184,217,53,0.12)', border:'1px solid rgba(184,217,53,0.2)', padding:'3px 7px', letterSpacing:'1px'}}>MEMBERS</span>
        </div>
      </div>

      {/* Tab strip */}
      <div style={{background:C.paperDark, borderBottom:`1px solid ${C.border}`, display:'flex', flexShrink:0, overflowX:'auto', scrollbarWidth:'none'}}>
        {TABS.map((tab,i) => (
          <button key={tab.id} onClick={() => setActiveTab(i)} style={{
            flex:'0 0 auto', padding:'10px 16px', background:'transparent', border:'none',
            borderBottom:activeTab===i?`2px solid ${C.lime}`:'2px solid transparent',
            cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:'3px',
            transition:'all 0.15s',
          }}>
            <span style={{fontFamily:F.mono, fontSize:'12px', color:activeTab===i?C.lime:C.faint}}>{tab.icon}</span>
            <span style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:activeTab===i?C.forest:C.faint, whiteSpace:'nowrap'}}>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Scrollable pane */}
      <div ref={paneRef} style={{flex:1, overflowY:'auto', WebkitOverflowScrolling:'touch'}}>
        <ActiveTab/>
      </div>

      {/* Bottom sheet */}
      <BottomSheet/>
    </div>
  );
};

// ── MobAccordion — shared collapsible section wrapper ─────────────────────────
const MobAccordion = ({label, hint, children, dark=false}) => {
  const [open,setOpen] = useState(false);
  return (
    <div style={{background:dark?C.ink:C.paper, borderBottom:`1px solid ${dark?'rgba(255,255,255,0.07)':C.border}`}}>
      <button onClick={() => setOpen(o=>!o)} style={{
        width:'100%', padding:'14px 16px', background:'transparent', border:'none', cursor:'pointer',
        display:'flex', justifyContent:'space-between', alignItems:'center', gap:'12px',
      }}>
        <div style={{textAlign:'left'}}>
          <div style={{fontFamily:F.sans, fontSize:'11px', fontWeight:700, letterSpacing:'0.5px', color:dark?C.paper:C.ink, marginBottom:'2px'}}>{label}</div>
          <div style={{fontFamily:F.body, fontSize:'10px', fontStyle:'italic', color:dark?'rgba(250,248,243,0.35)':C.faint}}>{hint}</div>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:'8px', flexShrink:0}}>
          <span style={{fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:open?(dark?C.lime:C.forest):(dark?'rgba(250,248,243,0.3)':C.muted)}}>
            {open ? 'Close' : 'Open'}
          </span>
          <span style={{fontFamily:F.mono, fontSize:'14px', color:dark?'rgba(250,248,243,0.3)':C.faint, transition:'transform 0.2s', display:'block', transform:open?'rotate(180deg)':'none'}}>↓</span>
        </div>
      </button>
      {open && <div style={{padding:'0 16px 16px'}}>{children}</div>}
    </div>
  );
};

// ─── Root Export ───────────────────────────────────────────────────────────────
export default function BRIDGEPolicyTracker() {
  const coverLogoRef = useRef(null);
  const isMobile = useIsMobile();

  if (isMobile) return <MobileShell/>;

  return (
    <div className="nav-clearance" style={{fontFamily:F.body, background:C.paper, paddingBottom:'68px'}}>
      <Gf/>
      <ReadingProgressBar coverLogoRef={coverLogoRef}/>
      <SectionFooterNav/>
      <Cover logoRef={coverLogoRef}/>
      <BudgetContext/>
      <MetricsStrip/>
      <PolicyGrid/>
      <PillarMap/>
      <Imperatives/>
      <PartnershipModes/>
      <LegislativeTracker/>
      <RiskRegister/>
      <BudgetExecutionMonitor/>
      <CrossSectorMap/>
      <Gate/>
      <Footer/>
    </div>
  );
}
