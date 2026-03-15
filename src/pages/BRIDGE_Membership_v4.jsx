import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight, Check, ChevronDown, Lock, Star,
  BarChart2, TrendingUp, Shield, FileText, Bell,
  Map, Database, Cpu, MessageSquare, Zap, Play,
  Award, Clock, AlertCircle, Eye, Layers
} from 'lucide-react';

const C = {
  primary:    '#1B4D3E',
  teal:       '#2E5A4D',
  accent:     '#B8D935',
  accentDark: '#8FA825',
  bg:         '#F3F5F2',
  white:      '#FFFFFF',
  dark:       '#191919',
  line:       '#DEDEDE',
  muted:      '#6B7280',
};
const MAX  = '1200px';
const F    = "'Inter', system-ui, sans-serif";
const EASE = 'cubic-bezier(0.22,1,0.36,1)';

// ─────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────
const useVis = (t = 0.07) => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [t]);
  return [ref, v];
};

const useMobile = () => {
  const [m, setM] = useState(false);
  useEffect(() => {
    const fn = () => setM(window.innerWidth < 768);
    fn();
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return m;
};

// ─────────────────────────────────────────────
// GLOBAL STYLES
// ─────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { -webkit-text-size-adjust: 100%; }
    body { -webkit-font-smoothing: antialiased; }

    @keyframes tickFade {
      0%   { opacity:0; transform:translateY(5px); }
      15%  { opacity:1; transform:translateY(0); }
      85%  { opacity:1; transform:translateY(0); }
      100% { opacity:0; transform:translateY(-5px); }
    }
    @keyframes pulseDot { 0%,100%{opacity:1} 50%{opacity:0.3} }

    .tick-text  { animation: tickFade 3.5s ease-in-out infinite; }
    .pulse-dot  { animation: pulseDot 2s ease-in-out infinite; }
    div::-webkit-scrollbar { display:none; }

    /* ── DESKTOP LAYOUT ─── */
    .m-hero-inner   { display:flex; gap:64px; align-items:center; padding:80px 80px 0; padding-bottom:80px; }
    .m-hero-right   { flex:0 1 420px; }
    .m-two-col      { display:flex; gap:72px; align-items:center; flex-wrap:wrap; }
    .m-grid-4       { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
    .m-grid-3       { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
    .m-path-layout  { display:flex; gap:80px; align-items:flex-start; flex-wrap:wrap; }
    .m-faq-layout   { display:flex; gap:80px; align-items:flex-start; flex-wrap:wrap; }
    .m-cta-row      { display:flex; align-items:center; gap:48px; justify-content:space-between; flex-wrap:wrap; }
    .m-cta-btns     { flex:0 1 320px; display:flex; flex-direction:column; gap:14px; align-items:stretch; }
    .m-pad          { padding:100px 80px; }
    .m-pad-sm       { padding:64px 80px; }
    .m-stat-bar     { padding:0 80px; }
    .m-ticker-pad   { padding:10px 80px; }
    .m-social-pad   { padding:0 80px; }
    .m-social-track { padding:4px 80px 12px; }
    .m-show         { display:none !important; }
    .m-hide         { display:block; }

    /* ── MOBILE LAYOUT (< 768px) ─── */
    @media (max-width:767px) {
      .m-pad          { padding:48px 20px; }
      .m-pad-sm       { padding:40px 20px; }
      .m-stat-bar     { padding:0; }
      .m-ticker-pad   { padding:9px 16px; }
      .m-social-pad   { padding:0 16px; }
      .m-social-track { padding:4px 16px 12px; }

      .m-hero-inner   { flex-direction:column; gap:0; padding:28px 20px 0; padding-bottom:0; }
      .m-hero-right   { display:none !important; }
      .m-two-col      { flex-direction:column; gap:28px; }
      .m-grid-4       { grid-template-columns:1fr; gap:10px; }
      .m-grid-3       { grid-template-columns:1fr; gap:10px; }
      .m-path-layout  { flex-direction:column; gap:24px; }
      .m-faq-layout   { flex-direction:column; gap:0; }
      .m-cta-row      { flex-direction:column; align-items:stretch; gap:20px; }
      .m-cta-btns     { flex:none; width:100%; }
      .m-show         { display:flex !important; }
      .m-hide         { display:none !important; }

      /* Tier carousel */
      .tier-track     { display:flex; gap:12px; overflow-x:auto; scrollbar-width:none; padding:4px 20px 8px; scroll-snap-type:x mandatory; }
      .tier-card      { min-width:280px; width:280px; scroll-snap-align:start; flex-shrink:0; }

      /* Product cards: 2-col on mobile */
      .m-grid-4       { grid-template-columns:repeat(2,1fr) !important; gap:10px !important; }

      /* Sticky CTA bar */
      .sticky-cta     { position:fixed; bottom:0; left:0; right:0; z-index:100; padding:12px 16px; 
                        background:${C.primary}; border-top:1px solid rgba(255,255,255,0.1);
                        display:flex; gap:10px; backdrop-filter:blur(12px); }

      /* FAQ sticky → static */
      .m-faq-sticky   { position:static !important; }

      /* Section headers on mobile */
      .m-section-hdr  { flex-direction:column !important; align-items:flex-start !important; gap:12px !important; margin-bottom:28px !important; }
      .m-section-hdr p { max-width:100% !important; }

      /* Compare: tier selector tabs */
      .compare-tabs   { display:flex !important; }
      .compare-table-wrap { overflow-x:auto; -webkit-overflow-scrolling:touch; }
    }
  `}</style>
);

// ─────────────────────────────────────────────
// PRIMITIVES
// ─────────────────────────────────────────────
const Pill = ({ label, dark = false }) => (
  <div style={{
    display:'inline-flex', alignItems:'center', gap:7,
    padding:'8px 16px', borderRadius:50,
    border:`1px solid ${dark ? 'rgba(184,217,53,0.3)' : C.line}`,
    fontSize:10, fontWeight:700, letterSpacing:'1.8px',
    textTransform:'uppercase', fontFamily:F,
    color: dark ? C.accent : C.primary,
    marginBottom:16, alignSelf:'flex-start',
  }}>
    <span style={{ width:5, height:5, borderRadius:'50%', background:C.accent, flexShrink:0 }} />
    {label}
  </div>
);

const Chk = ({ text, dark = false, sm = false }) => (
  <div style={{ display:'flex', gap:9, alignItems:'flex-start', padding:'3px 0' }}>
    <div style={{
      width: sm?14:16, height:sm?14:16, borderRadius:'50%', flexShrink:0, marginTop:2,
      background: dark ? 'rgba(184,217,53,0.15)' : 'rgba(27,77,62,0.09)',
      display:'flex', alignItems:'center', justifyContent:'center',
    }}>
      <Check size={sm?7:8} color={dark ? C.accent : C.primary} strokeWidth={3} />
    </div>
    <span style={{ fontSize:sm?12:13, fontFamily:F, lineHeight:1.5, color:dark ? 'rgba(255,255,255,0.7)' : '#444' }}>{text}</span>
  </div>
);

const Btn = ({ label, variant='primary', onClick, size='md', full=false }) => {
  const [hov, setH] = useState(false);
  const sz = { lg:{p:'15px 32px',fs:14}, md:{p:'12px 24px',fs:13}, sm:{p:'10px 18px',fs:12} }[size];
  const base = { borderRadius:50, border:'none', fontFamily:F, cursor:'pointer',
    display:'inline-flex', alignItems:'center', gap:7, fontWeight:800,
    transition:`all 0.2s ${EASE}`, padding:sz.p, fontSize:sz.fs,
    width:full?'100%':'auto', justifyContent:full?'center':'flex-start', whiteSpace:'nowrap' };
  const v = {
    primary:   { background:hov?C.accentDark:C.accent, color:C.primary, transform:hov?'translateY(-1px)':'none', boxShadow:hov?'0 8px 24px rgba(184,217,53,0.3)':'none' },
    ghost:     { background:'transparent', color:'rgba(255,255,255,0.85)', border:'1.5px solid rgba(255,255,255,0.25)', transform:hov?'translateY(-1px)':'none' },
    dark:      { background:hov?C.teal:C.primary, color:C.white, transform:hov?'translateY(-1px)':'none' },
    outline:   { background:'transparent', color:C.primary, border:`1.5px solid ${C.primary}`, fontWeight:600 },
  }[variant];
  return (
    <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)} style={{...base,...v}}>
      {label}<ArrowRight size={sz.fs-1}/>
    </button>
  );
};

// Dashboard mockup — desktop only
const DashMockup = () => (
  <div style={{ background:'#0F1A10', borderRadius:16, padding:'14px', border:'1px solid rgba(184,217,53,0.15)', overflow:'hidden' }}>
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12, paddingBottom:10, borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ display:'flex', gap:6 }}>
        {['#ff5f57','#ffbd2e','#28ca41'].map((c,i)=><div key={i} style={{width:8,height:8,borderRadius:'50%',background:c}}/>)}
      </div>
      <span style={{ fontFamily:F, fontSize:10, color:'rgba(255,255,255,0.2)', fontWeight:500 }}>BRIDGE Intelligence</span>
      <div style={{ width:50, height:8, borderRadius:4, background:'rgba(255,255,255,0.06)' }} />
    </div>
    <div style={{ display:'flex', gap:10 }}>
      <div style={{ width:72, display:'flex', flexDirection:'column', gap:4, flexShrink:0 }}>
        {['Dashboard','Sectors','Deals','Reports'].map((item,i)=>(
          <div key={item} style={{ padding:'5px 7px', borderRadius:5, background:i===0?'rgba(184,217,53,0.12)':'transparent', border:i===0?'1px solid rgba(184,217,53,0.2)':'none' }}>
            <span style={{ fontFamily:F, fontSize:9, fontWeight:i===0?700:400, color:i===0?C.accent:'rgba(255,255,255,0.25)' }}>{item}</span>
          </div>
        ))}
      </div>
      <div style={{ flex:1, display:'flex', flexDirection:'column', gap:7 }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:5 }}>
          {[['174+','Opps'],['12','Sectors'],['$250M+','Pipeline']].map(([v,l])=>(
            <div key={l} style={{ background:'rgba(255,255,255,0.04)', borderRadius:5, padding:'7px 8px', border:'1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontFamily:F, fontSize:13, fontWeight:700, color:C.accent }}>{v}</div>
              <div style={{ fontFamily:F, fontSize:8, color:'rgba(255,255,255,0.3)' }}>{l}</div>
            </div>
          ))}
        </div>
        {[['Agriculture · Ejura','Score 89','$4-8M'],['Cannabis · Cultivation','Score 90','$2-5M'],['Energy · Solar','Score 82','$3-6M']].map(([nm,sc,cap],i)=>(
          <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', background:'rgba(255,255,255,0.03)', borderRadius:5, padding:'6px 8px', border:'1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontFamily:F, fontSize:9, color:'rgba(255,255,255,0.55)' }}>{nm}</span>
            <div style={{ display:'flex', gap:6 }}>
              <span style={{ fontFamily:F, fontSize:8, fontWeight:700, color:C.accent }}>{sc}</span>
              <span style={{ fontFamily:F, fontSize:8, color:'rgba(255,255,255,0.25)' }}>{cap}</span>
            </div>
          </div>
        ))}
        <div style={{ background:'rgba(255,255,255,0.03)', borderRadius:5, padding:'7px 8px', border:'1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
            <span style={{ fontFamily:F, fontSize:8, color:'rgba(255,255,255,0.35)' }}>BRIDGE Impact Score™</span>
            <span style={{ fontFamily:F, fontSize:8, fontWeight:700, color:C.accent }}>78/100</span>
          </div>
          <div style={{ height:3, background:'rgba(255,255,255,0.06)', borderRadius:2, overflow:'hidden' }}>
            <div style={{ height:'100%', width:'78%', background:C.accent, borderRadius:2 }}/>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const SOCIAL_PROOF = [
  { quote:"I hadn't looked at Ghana seriously in years. The public sector overviews changed that in an afternoon. The quality of the framing alone made me apply for Registered membership the same day.", name:'D. Osei', role:'Entrepreneur, Toronto', tier:'Public', initials:'DO' },
  { quote:"Before I spent a dollar, I spent 30 days reading. The free briefs, the community conversations — I knew exactly what I was buying into when I upgraded. That's rare.", name:'F. Acheampong', role:'Software Engineer, Berlin', tier:'Registered', initials:'FA' },
  { quote:"The Ghana Pulse newsletter is the only Ghana business intelligence I actually read every week. Clear, grounded, no filler.", name:'P. Quartey', role:'Diaspora Professional, New York', tier:'Registered', initials:'PQ' },
  { quote:"The Ghana Cannabis intelligence brief was the most actionable sector analysis I've seen on any African market. NCC opened applications and BRIDGE had the full playbook ready.", name:'M. Asante', role:'Investment Manager, Accra', tier:'Intelligence', initials:'MA' },
  { quote:"I use the sector briefs to brief our board on Ghana market positioning. The BRIDGE Impact Score gives us a defensible framework our analysts trust.", name:'A. Mensah', role:'Director, Development Finance', tier:'Intelligence', initials:'AM' },
  { quote:"The opportunity database is the product I didn't know I needed. 174 ventures scored and mapped — three serious candidates in 20 minutes.", name:'E. Darko', role:'Researcher, Oxford', tier:'Intelligence', initials:'ED' },
  { quote:"I moved from passive diaspora interest to an active investment position in four months. The opportunity database showed me exactly where to focus capital.", name:'K. Boateng', role:'Diaspora Investor, London', tier:'Investor', initials:'KB' },
  { quote:"The deal room changes the dynamic completely. Opportunities already scored and stress-tested. The AI Founders Portal alone is worth the membership.", name:'N. Amponsah', role:'Family Office, Dubai', tier:'Investor', initials:'NA' },
];

const WHY_BRIDGE = [
  { icon:<Eye size={20}/>, head:'Inside the economy', body:"Our intelligence comes from operating in Ghana's market — not surveying it. We run ventures in 12 sectors." },
  { icon:<Shield size={20}/>, head:'Proprietary methodology', body:'The BRIDGE Impact Score™ is a 5-dimension scoring framework built from 174+ real venture evaluations.' },
  { icon:<Layers size={20}/>, head:'Full stack coverage', body:'From macro economy to specific licence categories to individual deal rooms. No other platform covers Ghana at this depth.' },
  { icon:<Zap size={20}/>, head:'Policy moments captured', body:'When the NCC opened cannabis licensing in February 2026, BRIDGE had all 11 licence categories analyzed within the same week.' },
];

const TIERS = [
  { id:'public', label:'Public', price:'Free', priceSub:'no account needed', color:'#9CA3AF',
    tagline:'Explore freely. No commitment.',
    features:['12 sector overview pages','BRIDGE mission & methodology','Ghana economy context','Partnership inquiries'] },
  { id:'registered', label:'Registered', price:'Free', priceSub:'application required', color:C.primary,
    badge:'Start Here', tagline:'Join the network. Intelligence starts here.',
    features:['Everything in Public','Weekly Ghana Pulse newsletter','3 free sector intelligence briefs','Community portal & member directory','Event & webinar invitations'],
    cta:'Apply Free' },
  { id:'intelligence', label:'Intelligence', price:'$250', priceSub:'/year · ~$21/month', color:'#B8730A',
    badge:'Most Popular', tagline:'Every data asset BRIDGE produces. Yours.',
    anchor:'IBISWorld charges $1,400+ per report. You get 12 for $250.',
    features:['Everything in Registered','All 12 sector intelligence briefs','174+ opportunity database','All 11 Cannabis NCC segments','Policy tracker — live','BRIDGE Impact Score™','Annual Ghana Economy Report','Ghana Insider newsletter','Full document library'],
    cta:'Join Intelligence' },
  { id:'investor', label:'Investor', price:'$1,000', priceSub:'/year · min. $10K investment', color:'#5B21B6',
    badge:'Full Access', tagline:'Intelligence plus the deal room.',
    features:['Everything in Intelligence','Investor deal room & financials','Deal flow & co-investment','AI Founders Portal (unlimited)','Quarterly Investment Climate Report','Analyst briefings · 2/yr','Annual Investor Summit + Ghana Tour','Direct BRIDGE team access'],
    cta:'Apply Investor', lock:'30 days as Registered first' },
];

const PRODUCTS = [
  { icon:<BarChart2 size={18}/>, name:'Intelligence Dashboard', tier:'Intelligence', stat:'12 sectors · 174+ scored', desc:'Live sector scorecards, opportunity tracking, and the BRIDGE Impact Score™ across every mapped venture.' },
  { icon:<FileText size={18}/>, name:'Sector Briefs', tier:'Intelligence', stat:'12 full briefs', desc:'Deep-dive analyses across all 12 BRIDGE sectors. Venture pipeline, risk analysis, capital requirements.' },
  { icon:<Bell size={18}/>, name:'Policy Tracker', tier:'Intelligence', stat:'Live · All sectors', desc:'Regulatory intelligence as it happens. Cannabis NCC brief — 11 licence categories in one week.' },
  { icon:<Map size={18}/>, name:'Opportunity Database', tier:'Intelligence', stat:'174+ mapped', desc:'Every BRIDGE-identified venture searchable by sector, capital range, BRIDGE score, stage, and region.' },
  { icon:<Database size={18}/>, name:'Document Library', tier:'Intelligence', stat:'50+ documents', desc:'White papers, government strategies, budget alignments, and the full BRIDGE Assessment Framework.' },
  { icon:<TrendingUp size={18}/>, name:'Investor Deal Room', tier:'Investor', stat:'Active pipeline', desc:'BRIDGE-evaluated opportunities with full financial profiles, scoring breakdowns, and investment terms.' },
  { icon:<Cpu size={18}/>, name:'AI Founders Portal', tier:'Investor', stat:'Powered by Anthropic', desc:"An AI advisory interface for entrepreneurs. Ask anything about Ghana's market or venture strategy." },
  { icon:<MessageSquare size={18}/>, name:'BRIDGE Community', tier:'Registered', stat:'Invite-only', desc:'Verified professionals, investors, founders, and policymakers. Events, webinars, idea submission.' },
];

const COMPARE = [
  { group:'Open to all', rows:[
    { label:'Public website & sector overviews', pub:true, reg:true, intel:true, inv:true },
    { label:'Ghana economy context & insights', pub:true, reg:true, intel:true, inv:true },
    { label:'Contact & partnership inquiries', pub:true, reg:true, intel:true, inv:true },
  ]},
  { group:'Registered — Free', rows:[
    { label:'Ghana Pulse weekly newsletter', pub:false, reg:true, intel:true, inv:true },
    { label:'3 free sector intelligence briefs', pub:false, reg:true, intel:true, inv:true },
    { label:'Community portal & member directory', pub:false, reg:true, intel:true, inv:true },
    { label:'Event & webinar access', pub:false, reg:true, intel:true, inv:true },
  ]},
  { group:'Intelligence — $250/yr', rows:[
    { label:'All 12 sector intelligence briefs', pub:false, reg:false, intel:true, inv:true },
    { label:'174+ opportunity database', pub:false, reg:false, intel:true, inv:true },
    { label:'All 11 Ghana Cannabis NCC segments', pub:false, reg:false, intel:true, inv:true },
    { label:'Policy tracker — live, all sectors', pub:false, reg:false, intel:true, inv:true },
    { label:'BRIDGE Impact Score™ methodology', pub:false, reg:false, intel:true, inv:true },
    { label:'Annual Ghana Economy Report', pub:false, reg:false, intel:true, inv:true },
    { label:'Ghana Insider newsletter', pub:false, reg:false, intel:true, inv:true },
    { label:'Full document library (50+ docs)', pub:false, reg:false, intel:true, inv:true },
  ]},
  { group:'Investor — $1,000/yr', rows:[
    { label:'Investor deal room & financials', pub:false, reg:false, intel:false, inv:true },
    { label:'Curated deal flow & co-investment', pub:false, reg:false, intel:false, inv:true },
    { label:'AI Founders Portal (unlimited)', pub:false, reg:false, intel:false, inv:true },
    { label:'Quarterly Investment Climate Report', pub:false, reg:false, intel:false, inv:true },
    { label:'Analyst briefings (2 per year)', pub:false, reg:false, intel:false, inv:true },
    { label:'Investor Summit + Ghana Tour', pub:false, reg:false, intel:false, inv:true },
    { label:'Direct BRIDGE team access', pub:false, reg:false, intel:false, inv:true },
  ]},
];

const PUBS = [
  { name:'Ghana Pulse', freq:'Weekly', tier:'Free', desc:'Top Ghana business stories + one BRIDGE sector insight. The entry point to the intelligence ecosystem.' },
  { name:'Ghana Insider', freq:'Weekly', tier:'Intelligence', desc:'Sector alerts, regulatory updates, opportunity previews. The premium intelligence layer.' },
  { name:'The BRIDGE Brief', freq:'Monthly', tier:'Intelligence', desc:'One sector deep-dive, one policy development, one venture in the pipeline.' },
  { name:'Investment Climate', freq:'Quarterly', tier:'Investor', desc:'Macro conditions, deal flow summary, sector performance, portfolio update.' },
  { name:'Ghana Economy Report', freq:'Annual', tier:'Intelligence', desc:'Flagship publication. All 12 sectors, macro picture, BRIDGE portfolio performance.' },
  { name:'Policy Alerts', freq:'As-needed', tier:'Free', desc:'Instant notifications on regulatory changes. Cannabis NCC launch was the proof of concept.' },
];

const FAQS = [
  { q:'Why the 30-day wait before paid tiers?', a:'BRIDGE is a community of committed stakeholders. The 30 days lets you genuinely understand the work, read the intelligence, engage with the community — and make sure paid membership is an informed decision.' },
  { q:'What is the BRIDGE Impact Score™?', a:'A proprietary 5-dimension scoring framework evaluating opportunities across Market Opportunity, Development Impact, Feasibility, Financial Sustainability, and Strategic Fit. Used to score all 174+ mapped opportunities.' },
  { q:'Is the Ghana Cannabis NCC series included in Intelligence?', a:'Yes — all 11 NCC licence categories (Cultivation through Pharmaceutical Dispensing). Applications opened February 2026. This is the most time-sensitive intelligence product on the platform.' },
  { q:'What does Investor membership require beyond the fee?', a:'$1,000/yr plus a minimum $10,000 investment commitment. This is an active investor relationship, not just a subscription. The 30-day Registered period is required first.' },
  { q:'Can organizations or institutions join?', a:'Memberships are currently individual. Organizations wanting institutional relationships should contact us directly — structured through our white-label data licensing and partnership framework.' },
  { q:'How is BRIDGE different from other Ghana research?', a:'BRIDGE intelligence comes from operating inside the economy across 12 sectors with 174+ active venture evaluations. The data is proprietary because the work is real.' },
  { q:"What if I'm not ready for paid membership yet?", a:'Apply for free Registered Membership today. Read 3 free briefs. Engage with the community. You have 30 days before you even need to decide.' },
];

// ─────────────────────────────────────────────
// MOBILE: STICKY CTA BAR
// ─────────────────────────────────────────────
const MobileStickyCTA = ({ onFree, onIntel }) => (
  <div className="sticky-cta m-show" style={{ display:'none' }}>
    <button onClick={onFree} style={{
      flex:1, padding:'13px', borderRadius:50, border:'none',
      background:C.accent, color:C.primary,
      fontFamily:F, fontSize:13, fontWeight:800, cursor:'pointer',
    }}>
      Start Free
    </button>
    <button onClick={onIntel} style={{
      flex:1, padding:'13px', borderRadius:50,
      background:'rgba(255,255,255,0.1)', color:C.white,
      fontFamily:F, fontSize:13, fontWeight:600, cursor:'pointer',
      border:'1.5px solid rgba(255,255,255,0.25)',
    }}>
      Intelligence $250
    </button>
  </div>
);

// ─────────────────────────────────────────────
// SECTION 1 — HERO
// ─────────────────────────────────────────────
const Hero = ({ onFree, onIntel, onScroll, mobile }) => {
  const [ref, v] = useVis(0.02);
  const [ticker, setTicker] = useState(0);
  const alerts = ['Cannabis NCC licensing open — 11 briefs ready','174+ opportunities mapped, 12 sectors scored','Annual Ghana Economy Report available now','Policy tracker live across all sectors'];
  useEffect(() => {
    const t = setInterval(() => setTicker(p => (p+1) % alerts.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} style={{ background:C.primary, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle, rgba(184,217,53,0.06) 1px, transparent 1px)', backgroundSize:'24px 24px', pointerEvents:'none' }}/>

      {/* Alert ticker */}
      <div className="m-ticker-pad" style={{ borderBottom:'1px solid rgba(255,255,255,0.07)', background:'rgba(0,0,0,0.15)' }}>
        <div style={{ maxWidth:MAX, margin:'0 auto', display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, flexShrink:0 }}>
            <div className="pulse-dot" style={{ width:6, height:6, borderRadius:'50%', background:C.accent }}/>
            <span style={{ fontFamily:F, fontSize:10, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.accent }}>Live</span>
          </div>
          <div style={{ overflow:'hidden', flex:1, height:18, position:'relative' }}>
            <span key={ticker} className="tick-text" style={{ fontFamily:F, fontSize:12, color:'rgba(255,255,255,0.5)', display:'block', position:'absolute' }}>{alerts[ticker]}</span>
          </div>
        </div>
      </div>

      {/* Hero content */}
      <div style={{ maxWidth:MAX, margin:'0 auto' }}>
        <div className="m-hero-inner">
          {/* Left text */}
          <div style={{ flex:'1 1 480px', opacity:v?1:0, transform:v?'none':'translateY(28px)', transition:`opacity 0.8s ${EASE} 0.1s, transform 0.8s ${EASE} 0.1s`, paddingBottom: mobile ? 36 : 0 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(184,217,53,0.1)', border:'1px solid rgba(184,217,53,0.2)', borderRadius:50, padding:'6px 14px', marginBottom:20 }}>
              <Star size={11} color={C.accent} fill={C.accent}/>
              <span style={{ fontFamily:F, fontSize:10, fontWeight:700, letterSpacing:'1.8px', textTransform:'uppercase', color:C.accent }}>Ghana's intelligence platform</span>
            </div>
            <h1 style={{ fontFamily:F, fontWeight:300, fontSize:mobile?'clamp(34px,9vw,44px)':'clamp(40px,5.5vw,68px)', color:C.white, lineHeight:1.05, letterSpacing:'-2px', margin:'0 0 20px 0' }}>
              Stop watching<br />Ghana's economy.<br /><span style={{ fontWeight:800, color:C.accent }}>Start acting in it.</span>
            </h1>

            {/* Desktop subtext */}
            <p className="m-hide" style={{ fontFamily:F, fontSize:16, fontWeight:300, color:'rgba(255,255,255,0.52)', lineHeight:1.85, maxWidth:440, margin:'0 0 16px 0' }}>
              12 sector briefs. 174+ scored opportunities. Live policy tracking. An AI-powered deal room. No other platform covers Ghana at this depth.
            </p>

            {/* Mobile: compact 3-stat strip instead */}
            <div className="m-show" style={{ display:'none', gap:0, marginBottom:24, border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, overflow:'hidden' }}>
              {[['12','Sector briefs'],['174+','Opportunities'],['Free','To start']].map(([val,lbl],i) => (
                <div key={i} style={{ flex:1, padding:'14px 12px', textAlign:'center', borderRight: i<2 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                  <div style={{ fontFamily:F, fontSize:22, fontWeight:700, color:C.accent, letterSpacing:'-0.5px', lineHeight:1 }}>{val}</div>
                  <div style={{ fontFamily:F, fontSize:10, color:'rgba(255,255,255,0.35)', marginTop:5 }}>{lbl}</div>
                </div>
              ))}
            </div>

            {/* Desktop trust signals */}
            <div className="m-hide" style={{ display:'flex', gap:16, marginBottom:32, flexWrap:'wrap' }}>
              {['No long-term contracts','30-day onboarding path','Cancel anytime'].map((t,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <Check size={12} color={C.accent} strokeWidth={3}/>
                  <span style={{ fontFamily:F, fontSize:12, color:'rgba(255,255,255,0.45)', fontWeight:500 }}>{t}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
              <Btn label={mobile ? "Apply Free" : "Start Free — Apply Now"} onClick={onFree} variant="primary" size={mobile?"md":"lg"} full={mobile}/>
              {!mobile && (
                <button onClick={onScroll} style={{ background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:6, fontFamily:F, fontSize:13, color:'rgba(255,255,255,0.45)', fontWeight:500, padding:0 }}>
                  <Play size={12} fill="rgba(255,255,255,0.45)" strokeWidth={0}/>
                  See what's inside
                </button>
              )}
            </div>
          </div>

          {/* Right — dashboard (desktop only via CSS) */}
          <div className="m-hero-right" style={{ opacity:v?1:0, transform:v?'none':'translateY(28px)', transition:`opacity 0.8s ${EASE} 0.25s, transform 0.8s ${EASE} 0.25s` }}>
            <DashMockup/>
            <div style={{ marginTop:14, display:'flex', gap:8 }}>
              <div style={{ flex:1, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:10, padding:'11px 13px', display:'flex', gap:9, alignItems:'center' }}>
                <div style={{ width:30, height:30, borderRadius:'50%', background:'rgba(184,217,53,0.15)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <AlertCircle size={15} color={C.accent}/>
                </div>
                <div>
                  <div style={{ fontFamily:F, fontSize:11, fontWeight:700, color:C.accent }}>Cannabis NCC · Open Now</div>
                  <div style={{ fontFamily:F, fontSize:10, color:'rgba(255,255,255,0.3)', marginTop:1 }}>11 licence briefs available</div>
                </div>
              </div>
              <div style={{ flex:1, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:10, padding:'11px 13px', display:'flex', gap:9, alignItems:'center' }}>
                <div style={{ width:30, height:30, borderRadius:'50%', background:'rgba(27,77,62,0.5)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Award size={15} color={C.accent}/>
                </div>
                <div>
                  <div style={{ fontFamily:F, fontSize:11, fontWeight:700, color:C.white }}>BRIDGE Impact Score™</div>
                  <div style={{ fontFamily:F, fontSize:10, color:'rgba(255,255,255,0.3)', marginTop:1 }}>Proprietary methodology</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stat bar — desktop only */}
      <div className="m-hide" style={{ borderTop:'1px solid rgba(255,255,255,0.07)', background:'rgba(0,0,0,0.15)' }}>
        <div className="m-stat-bar" style={{ maxWidth:MAX, margin:'0 auto', display:'flex' }}>
          {[['12','Sector briefs'],['174+','Opportunities'],['11','Cannabis segments'],['50+','Documents'],['Free','To start'],['$250','Intelligence']].map(([val,lbl],i) => (
            <div key={i} style={{ flex:1, padding:'18px 0', textAlign:'center', borderRight: i<5 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
              <div style={{ fontFamily:F, fontSize:20, fontWeight:700, color:C.accent, letterSpacing:'-0.5px', lineHeight:1 }}>{val}</div>
              <div style={{ fontFamily:F, fontSize:10, fontWeight:500, color:'rgba(255,255,255,0.25)', marginTop:5 }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// SECTION 2 — WHY BRIDGE
// ─────────────────────────────────────────────
const WhyBridge = ({ mobile }) => {
  const [ref, v] = useVis(0.07);
  const [open, setOpen] = useState(false);

  return (
    <section className="m-pad" style={{ background:C.white }}>
      <div ref={ref} style={{ maxWidth:MAX, margin:'0 auto' }}>
        <div className="m-two-col">
          {/* Left */}
          <div style={{ flex:'1 1 380px', opacity:v?1:0, transform:v?'none':'translateY(20px)', transition:`opacity 0.7s ${EASE}, transform 0.7s ${EASE}` }}>
            <Pill label="The BRIDGE Difference"/>
            <h2 style={{ fontFamily:F, fontSize:'clamp(26px,3.5vw,44px)', fontWeight:300, color:C.primary, lineHeight:1.1, letterSpacing:'-1px', margin:'0 0 16px 0' }}>
              Most research observes Ghana.<br /><span style={{ fontWeight:700 }}>We operate in it.</span>
            </h2>
            <p style={{ fontFamily:F, fontSize:15, fontWeight:300, color:'#555', lineHeight:1.85, margin:'0 0 28px 0' }}>
              BRIDGE has evaluated 174+ opportunities across 12 sectors. We run ventures. We engage government. We track every policy change.
            </p>
            {/* Image placeholder */}
            <div style={{ borderRadius:16, overflow:'hidden', position:'relative', height:mobile?200:240, background:'linear-gradient(135deg, #1B4D3E 0%, #2E5A4D 60%, #1B4D3E 100%)' }}>
              <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle, rgba(184,217,53,0.06) 1px, transparent 1px)', backgroundSize:'20px 20px' }}/>
              <div style={{ position:'absolute', inset:20, border:'1px dashed rgba(184,217,53,0.2)', borderRadius:10, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:10 }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(184,217,53,0.35)" strokeWidth="1.2"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
                <span style={{ fontFamily:F, fontSize:9, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'rgba(184,217,53,0.3)' }}>Ghana Operations</span>
              </div>
            </div>
          </div>

          {/* Right — differentiators with mobile progressive disclosure */}
          <div style={{ flex:'1 1 380px', opacity:v?1:0, transform:v?'none':'translateY(20px)', transition:`opacity 0.7s ${EASE} 0.1s, transform 0.7s ${EASE} 0.1s` }}>
            {WHY_BRIDGE.map((item, i) => {
              if (mobile && i >= 2 && !open) return null;
              return (
              <div key={i} style={{ padding:'20px 0', borderTop:`1px solid ${C.line}`, display:'flex', gap:16, alignItems:'flex-start' }}>
                <div style={{ width:38, height:38, borderRadius:10, background:'rgba(27,77,62,0.08)', display:'flex', alignItems:'center', justifyContent:'center', color:C.primary, flexShrink:0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontFamily:F, fontSize:14, fontWeight:700, color:C.dark, marginBottom:5 }}>{item.head}</div>
                  <div style={{ fontFamily:F, fontSize:13, fontWeight:300, color:'#666', lineHeight:1.7 }}>{item.body}</div>
                </div>
              </div>
              );
            })}
            <div style={{ borderTop:`1px solid ${C.line}` }}/>
            {/* Mobile expand toggle */}
            {mobile && (
              <button onClick={() => setOpen(o => !o)} style={{ width:'100%', padding:'14px 0', background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, fontFamily:F, fontSize:12, fontWeight:700, color:C.primary, letterSpacing:'0.5px' }}>
                {open ? 'Show less' : `See all 4 differentiators`}
                <ChevronDown size={14} style={{ transform: open ? 'rotate(180deg)' : 'none', transition:'transform 0.2s' }}/>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// SECTION 3 — TIER CARDS
// ─────────────────────────────────────────────
const TierCardContent = ({ tier, mobile, cta }) => {
  const isInv = tier.id === 'investor';
  return (
    <div style={{
      background: isInv ? C.primary : C.white,
      border: `1.5px solid ${C.line}`,
      borderRadius:18, padding: mobile ? '24px 20px' : '28px 22px',
      display:'flex', flexDirection:'column', position:'relative',
      height:'100%',
    }}>
      {tier.badge && (
        <div style={{ position:'absolute', top:-11, left:'50%', transform:'translateX(-50%)', background:C.primary, color:C.white, fontSize:9, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', padding:'4px 14px', borderRadius:50, whiteSpace:'nowrap' }}>{tier.badge}</div>
      )}
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
        <div style={{ width:8, height:8, borderRadius:'50%', background:tier.color }}/>
        <span style={{ fontFamily:F, fontSize:10, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:isInv?'rgba(255,255,255,0.4)':'#aaa' }}>{tier.label}</span>
      </div>
      <div style={{ fontFamily:F, fontSize:30, fontWeight:700, color:isInv?C.white:C.dark, letterSpacing:'-1px', lineHeight:1, marginBottom:4 }}>{tier.price}</div>
      <div style={{ fontFamily:F, fontSize:11, color:isInv?'rgba(255,255,255,0.3)':'#aaa', marginBottom:14 }}>{tier.priceSub}</div>
      {tier.anchor && (
        <div style={{ background:'rgba(27,77,62,0.06)', border:`1px solid ${C.line}`, borderRadius:8, padding:'8px 10px', marginBottom:12 }}>
          <span style={{ fontFamily:F, fontSize:11, color:C.muted, lineHeight:1.4 }}>{tier.anchor}</span>
        </div>
      )}
      <div style={{ height:1, background:isInv?'rgba(255,255,255,0.1)':C.line, marginBottom:12 }}/>
      <p style={{ fontFamily:F, fontSize:13, fontWeight:300, color:isInv?'rgba(255,255,255,0.5)':'#777', lineHeight:1.55, marginBottom:14 }}>{tier.tagline}</p>
      <div style={{ flex:1, display:'flex', flexDirection:'column', gap:2, marginBottom:16 }}>
        {tier.features.map((f,j) => <Chk key={j} text={f} dark={isInv} sm/>)}
      </div>
      {tier.lock && (
        <div style={{ background:'rgba(184,217,53,0.08)', border:'1px solid rgba(184,217,53,0.2)', borderRadius:8, padding:'8px 10px', marginBottom:12, display:'flex', alignItems:'center', gap:6 }}>
          <Lock size={10} color={C.accent}/>
          <span style={{ fontFamily:F, fontSize:11, color:'rgba(255,255,255,0.45)' }}><strong style={{ color:C.accent }}>30 days</strong> as Registered first</span>
        </div>
      )}
      {tier.cta && (
        <button onClick={cta[tier.id]} style={{
          width:'100%', padding:'12px', borderRadius:50,
          background:isInv?C.accent:'transparent',
          border:isInv?'none':`1.5px solid ${C.primary}`,
          color:isInv?C.primary:C.primary,
          fontFamily:F, fontSize:12, fontWeight:800, cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center', gap:6,
        }}>{tier.cta} <ArrowRight size={12}/></button>
      )}
    </div>
  );
};

const TierCards = ({ onFree, onIntel, onInvestor, mobile }) => {
  const [ref, v] = useVis(0.05);
  const [hov, setHov] = useState(null);
  const [activeSlide, setActiveSlide] = useState(1); // default to Registered
  const trackRef = useRef(null);
  const cta = { registered:onFree, intelligence:onIntel, investor:onInvestor };

  const CARD_W = 280;
  useEffect(() => {
    if (!mobile || !trackRef.current) return;
    trackRef.current.scrollTo({ left: activeSlide * (CARD_W + 12), behavior:'smooth' });
  }, [activeSlide, mobile]);

  useEffect(() => {
    const track = trackRef.current;
    if (!mobile || !track) return;
    const onScroll = () => {
      const i = Math.round(track.scrollLeft / (CARD_W + 12));
      setActiveSlide(Math.min(Math.max(i, 0), TIERS.length - 1));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [mobile, CARD_W]);

return (
    <section id="tiers" className="m-pad" style={{ background:C.bg }}>
      <div ref={ref} style={{ maxWidth:MAX, margin:'0 auto' }}>
        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom: mobile ? 24 : 48, flexWrap:'wrap', gap:16 }}>
          <div>
            <Pill label="Membership Tiers"/>
            <h2 style={{ fontFamily:F, fontSize:'clamp(26px,4vw,48px)', fontWeight:300, color:C.primary, lineHeight:1.1, letterSpacing:'-1.5px', margin:0 }}>
              Four tiers.<br /><span style={{ fontWeight:700 }}>One journey.</span>
            </h2>
          </div>
          {!mobile && (
            <div style={{ maxWidth:320 }}>
              <p style={{ fontFamily:F, fontSize:14, fontWeight:300, color:'#666', lineHeight:1.75, margin:'0 0 10px 0' }}>Start free. No credit card. The first step costs nothing.</p>
              <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 14px', background:'rgba(184,217,53,0.1)', border:'1px solid rgba(184,217,53,0.25)', borderRadius:10 }}>
                <Clock size={13} color={C.primary}/>
                <span style={{ fontFamily:F, fontSize:12, color:C.primary, fontWeight:600 }}>30-day path from Free to Intelligence</span>
              </div>
            </div>
          )}
        </div>

        {/* DESKTOP: 4-col grid */}
        {!mobile && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, opacity:v?1:0, transform:v?'none':'translateY(20px)', transition:`opacity 0.7s ${EASE} 0.1s, transform 0.7s ${EASE} 0.1s` }}>
            {TIERS.map(tier => (
              <div key={tier.id} onMouseEnter={()=>setHov(tier.id)} onMouseLeave={()=>setHov(null)}
                style={{ transform:hov===tier.id?'translateY(-4px)':'none', boxShadow:hov===tier.id?'0 16px 48px rgba(0,0,0,0.1)':'none', transition:`all 0.25s ${EASE}` }}>
                <TierCardContent tier={tier} mobile={mobile} cta={cta}/>
              </div>
            ))}
          </div>
        )}

        {/* MOBILE: horizontal carousel */}
        {mobile && (
          <div style={{ opacity:v?1:0, transition:`opacity 0.7s ${EASE}` }}>
            <div ref={trackRef} className="tier-track">
              {TIERS.map((tier, i) => (
                <div key={tier.id} className="tier-card" onClick={() => setActiveSlide(i)}>
                  <TierCardContent tier={tier} mobile={mobile} cta={cta}/>
                </div>
              ))}
            </div>
            {/* Scroll indicator dots */}
            <div style={{ display:'flex', justifyContent:'center', gap:6, marginTop:16 }}>
              {TIERS.map((_, i) => (
                <button key={i} onClick={() => setActiveSlide(i)} style={{
                  width:i===activeSlide?24:8, height:8, borderRadius:4, border:'none',
                  background:i===activeSlide?C.accent:C.line,
                  cursor:'pointer', padding:0, transition:`all 0.3s ${EASE}`,
                }}/>
              ))}
            </div>
            {/* Mobile path note */}
            <div style={{ marginTop:20, padding:'12px 16px', background:'rgba(184,217,53,0.08)', border:'1px solid rgba(184,217,53,0.2)', borderRadius:12, display:'flex', alignItems:'center', gap:10 }}>
              <Clock size={14} color={C.primary}/>
              <span style={{ fontFamily:F, fontSize:12, color:C.primary, fontWeight:600 }}>30-day free path to Intelligence membership</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// SECTION 4 — SOCIAL PROOF
// ─────────────────────────────────────────────
const SocialProof = ({ mobile }) => {
  const [ref, v] = useVis(0.07);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef(null);
  const [cardW, setCardW] = useState(320);
  useEffect(() => {
    if (mobile) setCardW(Math.min(window.innerWidth - 40, 360));
    else setCardW(340);
  }, [mobile]);
  const CARD_W = cardW;
  const GAP = 16;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx(p => (p+1) % SOCIAL_PROOF.length), 4000);
    return () => clearInterval(t);
  }, [paused]);

  useEffect(() => {
    if (!trackRef.current) return;
    const maxScroll = trackRef.current.scrollWidth - trackRef.current.clientWidth;
    const target = Math.min(idx * (CARD_W + GAP), maxScroll);
    trackRef.current.scrollTo({ left:target, behavior:'smooth' });
  }, [idx, CARD_W]);

  return (
    <section ref={ref} style={{ background:C.primary, paddingTop:mobile?48:80, paddingBottom:mobile?48:80, overflow:'hidden' }}>
      <div className="m-social-pad" style={{ maxWidth:MAX, margin:'0 auto' }}>
        <div style={{ marginBottom:28, opacity:v?1:0, transform:v?'none':'translateY(14px)', transition:`opacity 0.7s ${EASE}` }}>
          <Pill label="Member Voices" dark/>
          <h2 style={{ fontFamily:F, fontSize:'clamp(24px,3.5vw,40px)', fontWeight:300, color:C.white, lineHeight:1.1, letterSpacing:'-1px', margin:0 }}>
            From every level<br /><span style={{ fontWeight:700 }}>of the network.</span>
          </h2>
        </div>
      </div>

      <div ref={trackRef} className="m-social-track"
        onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
        style={{ display:'flex', gap:GAP, overflowX:'auto', scrollbarWidth:'none', WebkitOverflowScrolling:'touch', opacity:v?1:0, transition:`opacity 0.7s ${EASE} 0.1s` }}>
        {SOCIAL_PROOF.map((s,i) => (
          <div key={i} onClick={() => setIdx(i)} style={{
            width:CARD_W, minWidth:CARD_W, flexShrink:0,
            background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)',
            borderRadius:14, padding: mobile ? '20px 18px' : '24px 22px',
            display:'flex', flexDirection:'column', gap:14, cursor:'pointer',
            scrollSnapAlign: mobile ? 'start' : 'none',
          }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div style={{ display:'flex', gap:2 }}>
                {[0,1,2,3,4].map(j => <Star key={j} size={10} color={C.accent} fill={C.accent}/>)}
              </div>
              <span style={{ fontFamily:F, fontSize:9, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(255,255,255,0.3)' }}>{s.tier}</span>
            </div>
            <p style={{ fontFamily:F, fontSize: mobile ? 13 : 13, fontWeight:300, color:'rgba(255,255,255,0.78)', lineHeight:1.75, margin:0, flex:1 }}>"{s.quote}"</p>
            <div style={{ display:'flex', alignItems:'center', gap:10, paddingTop:12, borderTop:'1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ width:30, height:30, borderRadius:'50%', background:'rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <span style={{ fontFamily:F, fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.7)' }}>{s.initials}</span>
              </div>
              <div>
                <div style={{ fontFamily:F, fontSize:12, fontWeight:700, color:C.white }}>{s.name}</div>
                <div style={{ fontFamily:F, fontSize:10, color:'rgba(255,255,255,0.35)', marginTop:1 }}>{s.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot nav + arrows */}
      <div className="m-social-pad" style={{ maxWidth:MAX, margin:'16px auto 0', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div style={{ display:'flex', gap:6 }}>
          {SOCIAL_PROOF.map((_,i) => (
            <button key={i} onClick={() => setIdx(i)} style={{
              width:idx===i?24:8, height:8, borderRadius:4, border:'none', cursor:'pointer', padding:0,
              background:idx===i?C.accent:'rgba(255,255,255,0.2)',
              transition:`all 0.3s ${EASE}`,
            }}/>
          ))}
        </div>
        {!mobile && (
          <div style={{ display:'flex', gap:8 }}>
            {[{label:'←',fn:()=>setIdx(p=>(p-1+SOCIAL_PROOF.length)%SOCIAL_PROOF.length)},{label:'→',fn:()=>setIdx(p=>(p+1)%SOCIAL_PROOF.length)}].map(({label,fn}) => (
              <button key={label} onClick={fn} style={{ width:34, height:34, borderRadius:'50%', border:'1px solid rgba(255,255,255,0.2)', background:'rgba(255,255,255,0.06)', color:'rgba(255,255,255,0.7)', fontSize:16, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>{label}</button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// SECTION 5 — PLATFORM SHOWCASE
// ─────────────────────────────────────────────
const PlatformShowcase = ({ mobile }) => {
  const [ref, v] = useVis(0.06);
  const [hov, setHov] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const SHOW = 4; // show 4 on mobile by default

  return (
    <section id="platform" className="m-pad" style={{ background:C.white }}>
      <div ref={ref} style={{ maxWidth:MAX, margin:'0 auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom: mobile ? 24 : 36, flexWrap:'wrap', gap:16 }}>
          <div>
            <Pill label="What You Get"/>
            <h2 style={{ fontFamily:F, fontSize:'clamp(26px,4vw,44px)', fontWeight:300, color:C.primary, lineHeight:1.1, letterSpacing:'-1px', margin:0 }}>
              Eight products.<br /><span style={{ fontWeight:700 }}>One platform.</span>
            </h2>
          </div>
          {!mobile && <p style={{ maxWidth:300, fontSize:14, fontFamily:F, fontWeight:300, color:'#666', lineHeight:1.75 }}>Every product built on ground-truth data from operating inside Ghana's economy.</p>}
        </div>

        <div style={{ display:'grid', gridTemplateColumns: mobile ? 'repeat(2,1fr)' : 'repeat(4,1fr)', gap: mobile ? 10 : 14, opacity:v?1:0, transform:v?'none':'translateY(16px)', transition:`opacity 0.7s ${EASE} 0.1s, transform 0.7s ${EASE} 0.1s` }}>
          {PRODUCTS.map((p,i) => {
            const isHov = hov === i;
            const hidden = mobile && i >= SHOW && !expanded;
            if (hidden) return null;
            return (
              <div key={i} onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)} style={{
                background: isHov ? C.white : C.bg,
                border:`1.5px solid ${isHov ? C.primary : C.line}`,
                borderTop:`3px solid ${isHov ? C.primary : C.line}`,
                borderRadius:14, padding: mobile ? '16px 14px' : '22px 18px',
                transition:`all 0.22s ${EASE}`,
                transform: isHov ? 'translateY(-3px)' : 'none',
                boxShadow: isHov ? '0 12px 32px rgba(0,0,0,0.08)' : 'none',
                display:'flex', flexDirection:'column', gap: mobile ? 8 : 11,
              }}>
                <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between' }}>
                  <div style={{ width:36, height:36, borderRadius:9, background:isHov?'rgba(27,77,62,0.08)':'rgba(27,77,62,0.05)', display:'flex', alignItems:'center', justifyContent:'center', color:isHov?C.primary:'#bbb', transition:`color 0.2s`, flexShrink:0 }}>{p.icon}</div>
                  <span style={{ fontFamily:F, fontSize:9, fontWeight:700, letterSpacing:'0.8px', textTransform:'uppercase', color:isHov?C.primary:'#ccc', transition:'color 0.2s' }}>{p.tier}</span>
                </div>
                <div>
                  <div style={{ fontFamily:F, fontSize: mobile ? 12 : 13, fontWeight:700, color:isHov?C.dark:'#555', lineHeight:1.3, marginBottom:3 }}>{p.name}</div>
                  <div style={{ fontFamily:F, fontSize:10, fontWeight:600, color:isHov?C.primary:'#ccc' }}>{p.stat}</div>
                </div>
                {!mobile && <p style={{ fontFamily:F, fontSize:12, fontWeight:300, color:'#777', lineHeight:1.65, margin:0, flex:1 }}>{p.desc}</p>}
              </div>
            );
          })}
        </div>

        {/* Mobile expand toggle */}
        {mobile && (
          <button onClick={() => setExpanded(o => !o)} style={{ width:'100%', marginTop:14, padding:'13px', background:C.bg, border:`1.5px solid ${C.line}`, borderRadius:50, fontFamily:F, fontSize:13, fontWeight:700, color:C.primary, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            {expanded ? 'Show less' : `See all 8 products`}
            <ChevronDown size={14} style={{ transform:expanded?'rotate(180deg)':'none', transition:'transform 0.2s' }}/>
          </button>
        )}

        {!mobile && (
          <div style={{ marginTop:20, padding:'14px 20px', background:C.bg, borderRadius:12, border:`1px solid ${C.line}`, display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ width:7, height:7, borderRadius:'50%', background:C.accent, flexShrink:0 }}/>
            <span style={{ fontFamily:F, fontSize:13, color:'#666', lineHeight:1.5 }}>
              <strong style={{ color:C.primary, fontWeight:700 }}>Registered</strong> unlocks Community.{' '}
              <strong style={{ color:C.primary, fontWeight:700 }}>Intelligence</strong> unlocks 6 more at $250/yr.{' '}
              <strong style={{ color:C.primary, fontWeight:700 }}>Investor</strong> completes the stack at $1,000/yr.
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// SECTION 6 — URGENCY
// ─────────────────────────────────────────────
const Urgency = ({ onIntel, mobile }) => {
  const [ref, v] = useVis(0.07);
  const [expanded, setExpanded] = useState(false);
  const licences = [
    ['01','Cultivation','Score 90 · Entry capital $2–5M'],
    ['02','Processing','Score 78 · Mid-chain value add'],
    ['03','Breeding & Seed','Score 72 · Genetic IP opportunity'],
    ['04','R&D','Score 68 · Long-horizon, high barrier'],
    ['05','Testing Laboratory','Score 74 · High barrier, low competition'],
    ['06','Storage','Score 65 · Infrastructure play'],
    ['07','Transportation','Score 63 · Logistics backbone'],
    ['08','Import','Score 71 · Regulatory arbitrage'],
    ['09','Export','Score 76 · International premium'],
    ['10','Wholesale & Distribution','Score 69 · Volume play'],
    ['11','Pharmaceutical Retail','Score 85 · Patient-facing · Highest value'],
  ];
  const SHOW_LICENCES = 4;

  return (
    <section className="m-pad-sm" style={{ background:C.dark, position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:'radial-gradient(circle, rgba(184,217,53,0.04) 1px, transparent 1px)', backgroundSize:'24px 24px', pointerEvents:'none' }}/>
      <div ref={ref} style={{ maxWidth:MAX, margin:'0 auto', position:'relative', zIndex:1, opacity:v?1:0, transform:v?'none':'translateY(20px)', transition:`opacity 0.7s ${EASE}` }}>
        <div style={{ display:'flex', gap: mobile ? 28 : 64, alignItems: mobile ? 'flex-start' : 'center', flexDirection: mobile ? 'column' : 'row' }}>
          <div style={{ flex:'1 1 440px' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(168,32,13,0.15)', border:'1px solid rgba(168,32,13,0.3)', borderRadius:50, padding:'6px 14px', marginBottom:18 }}>
              <div style={{ width:7, height:7, borderRadius:'50%', background:'#ef4444' }}/>
              <span style={{ fontFamily:F, fontSize:10, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:'#ef4444' }}>Time-Sensitive</span>
            </div>
            <h2 style={{ fontFamily:F, fontSize: mobile ? 'clamp(22px,6vw,30px)' : 'clamp(24px,3.5vw,42px)', fontWeight:300, color:C.white, lineHeight:1.15, letterSpacing:'-0.5px', margin:'0 0 14px 0' }}>
              Ghana opened cannabis<br />licensing in February 2026.<br /><span style={{ fontWeight:700, color:C.accent }}>The window is open now.</span>
            </h2>
            <p style={{ fontFamily:F, fontSize: mobile ? 14 : 15, fontWeight:300, color:'rgba(255,255,255,0.5)', lineHeight:1.8, margin:'0 0 24px 0' }}>
              11 licence categories under Act 1019 and L.I. 2475. BRIDGE had all 11 analysed within 48 hours.
            </p>
            <Btn label={mobile ? "See All 11 Briefs" : "Access All 11 Licence Briefs"} onClick={onIntel} variant="primary" size={mobile?"md":"lg"} full={mobile}/>
          </div>

          <div style={{ flex:'0 1 380px', width: mobile ? '100%' : 'auto' }}>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {licences.map(([n,name,sub], i) => (
                i >= SHOW_LICENCES && !expanded ? null : (
                <div key={n} style={{ display:'flex', gap:14, alignItems:'center', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:10, padding:'11px 14px' }}>
                  <span style={{ fontFamily:F, fontSize:10, fontWeight:700, color:C.accent, letterSpacing:'1px', flexShrink:0 }}>Lic. {n}</span>
                  <div>
                    <div style={{ fontFamily:F, fontSize:13, fontWeight:600, color:C.white }}>{name}</div>
                    <div style={{ fontFamily:F, fontSize:11, color:'rgba(255,255,255,0.35)', marginTop:2 }}>{sub}</div>
                  </div>
                </div>
                )
              ))}
              <button onClick={() => setExpanded(o => !o)} style={{
                padding:'11px 14px', background:'rgba(255,255,255,0.04)',
                border:'1px solid rgba(255,255,255,0.1)', borderRadius:10,
                fontFamily:F, fontSize:12, fontWeight:600,
                color: expanded ? 'rgba(255,255,255,0.5)' : C.accent,
                cursor:'pointer', textAlign:'left', width:'100%',
                display:'flex', alignItems:'center', justifyContent:'space-between',
              }}>
                <span>{expanded ? 'Show fewer categories' : `+ ${licences.length - SHOW_LICENCES} more licence categories`}</span>
                <span style={{ fontSize:14, transition:'transform 0.2s', display:'inline-block', transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>↓</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// SECTION 7 — PUBLICATIONS
// ─────────────────────────────────────────────
const Publications = ({ mobile }) => {
  const [ref, v] = useVis(0.06);
  const [expanded, setExpanded] = useState(false);
  const SHOW = 3;

  return (
    <section className="m-pad" style={{ background:C.white }}>
      <div ref={ref} style={{ maxWidth:MAX, margin:'0 auto' }}>
        <div style={{ marginBottom: mobile ? 24 : 40 }}>
          <Pill label="Publications"/>
          <h2 style={{ fontFamily:F, fontSize:'clamp(26px,4vw,44px)', fontWeight:300, color:C.primary, lineHeight:1.1, letterSpacing:'-1px', margin:0 }}>
            A publishing calendar<br /><span style={{ fontWeight:700 }}>no one else runs.</span>
          </h2>
        </div>

        <div style={{ display:'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3,1fr)', gap: mobile ? 8 : 14, opacity:v?1:0, transform:v?'none':'translateY(16px)', transition:`opacity 0.7s ${EASE}` }}>
          {PUBS.map((pub, i) => {
            if (mobile && i >= SHOW && !expanded) return null;
            return (
              <div key={i} style={{ background:C.bg, border:`1px solid ${C.line}`, borderLeft:`3px solid ${C.primary}`, borderRadius:'0 12px 12px 0', padding: mobile ? '16px 16px 16px 14px' : '20px 20px 20px 18px' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:4 }}>
                  <div style={{ fontFamily:F, fontSize:14, fontWeight:700, color:C.dark }}>{pub.name}</div>
                  <span style={{ fontFamily:F, fontSize:9, fontWeight:600, letterSpacing:'1px', textTransform:'uppercase', color:'#ccc', whiteSpace:'nowrap', marginLeft:10 }}>{pub.freq}</span>
                </div>
                <div style={{ fontFamily:F, fontSize:10, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(27,77,62,0.4)', marginBottom:8 }}>{pub.tier}</div>
                <div style={{ fontFamily:F, fontSize: mobile ? 12 : 13, fontWeight:300, color:'#666', lineHeight:1.65 }}>{pub.desc}</div>
              </div>
            );
          })}
        </div>

        {mobile && (
          <button onClick={() => setExpanded(o => !o)} style={{ width:'100%', marginTop:12, padding:'13px', background:C.white, border:`1.5px solid ${C.line}`, borderRadius:50, fontFamily:F, fontSize:13, fontWeight:700, color:C.primary, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            {expanded ? 'Show less' : `See all ${PUBS.length} publications`}
            <ChevronDown size={14} style={{ transform:expanded?'rotate(180deg)':'none', transition:'transform 0.2s' }}/>
          </button>
        )}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// SECTION 8 — COMPARE TABLE
// ─────────────────────────────────────────────
const CompareTable = ({ onFree, onIntel, onInvestor, mobile }) => {
  const [ref, v] = useVis(0.04);
  const [activeTier, setActiveTier] = useState('intelligence');
  const tiers = ['public','registered','intelligence','investor'];
  const tierLabels = { public:'Public', registered:'Registered', intelligence:'Intelligence', investor:'Investor' };
  const tierPrices = { public:'Free', registered:'Free', intelligence:'$250/yr', investor:'$1,000/yr' };

  const colW = ['1fr','90px','110px','120px','110px'];
  const Dot = ({ on }) => (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
      {on ? <Check size={14} color={C.primary} strokeWidth={2.5}/> : <div style={{ width:5, height:5, borderRadius:'50%', background:C.line }}/>}
    </div>
  );

  // Mobile: show single tier feature list
  const tierKey = { public:'pub', registered:'reg', intelligence:'intel', investor:'inv' };
  const allRows = COMPARE.flatMap(grp => grp.rows);
  const filteredRows = allRows.filter(row => row[tierKey[activeTier]]);

  return (
    <section id="compare" className="m-pad" style={{ background:C.bg }}>
      <div ref={ref} style={{ maxWidth:MAX, margin:'0 auto' }}>
        <div style={{ marginBottom: mobile ? 24 : 44 }}>
          <Pill label="Full Comparison"/>
          <h2 style={{ fontFamily:F, fontSize:'clamp(26px,4vw,44px)', fontWeight:300, color:C.primary, lineHeight:1.1, letterSpacing:'-1px', margin:0 }}>
            Everything,<br /><span style={{ fontWeight:700 }}>side by side.</span>
          </h2>
        </div>

        {/* MOBILE: Tier tab selector + feature list */}
        {mobile && (
          <div style={{ opacity:v?1:0, transition:`opacity 0.7s ${EASE}` }}>
            {/* Tab selector */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:6, marginBottom:20 }}>
              {tiers.map(t => (
                <button key={t} onClick={() => setActiveTier(t)} style={{
                  padding:'10px 4px', borderRadius:10, border:'none', cursor:'pointer', background:'transparent',
                  background: activeTier===t ? C.primary : C.bg,
                  border: `1.5px solid ${activeTier===t ? C.primary : C.line}`,
                  transition:`all 0.2s ${EASE}`,
                }}>
                  <div style={{ fontFamily:F, fontSize:9, fontWeight:700, letterSpacing:'0.5px', textTransform:'uppercase', color:activeTier===t?C.white:'#888', textAlign:'center' }}>{tierLabels[t]}</div>
                  <div style={{ fontFamily:F, fontSize:11, fontWeight:700, color:activeTier===t?C.accent:'#aaa', textAlign:'center', marginTop:2 }}>{tierPrices[t]}</div>
                </button>
              ))}
            </div>

            {/* Feature list for selected tier */}
            <div style={{ background:C.bg, borderRadius:14, border:`1px solid ${C.line}`, overflow:'hidden' }}>
              <div style={{ padding:'14px 16px', background:C.primary, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                <div>
                  <div style={{ fontFamily:F, fontSize:11, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:C.accent }}>{tierLabels[activeTier]}</div>
                  <div style={{ fontFamily:F, fontSize:13, fontWeight:300, color:'rgba(255,255,255,0.6)', marginTop:2 }}>{filteredRows.length} features included</div>
                </div>
                <div style={{ fontFamily:F, fontSize:22, fontWeight:700, color:C.white, letterSpacing:'-0.5px' }}>{tierPrices[activeTier]}</div>
              </div>
              {filteredRows.map((row,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', background:i%2===0?C.white:C.bg, borderTop:`1px solid ${C.line}` }}>
                  <div style={{ width:20, height:20, borderRadius:'50%', background:'rgba(27,77,62,0.08)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Check size={10} color={C.primary} strokeWidth={3}/>
                  </div>
                  <span style={{ fontFamily:F, fontSize:13, color:'#444' }}>{row.label}</span>
                </div>
              ))}
              {/* CTA */}
              <div style={{ padding:'16px', background:C.bg, borderTop:`2px solid ${C.line}` }}>
                {activeTier === 'public' && <Btn label="Browse Freely" onClick={()=>{ const el=document.getElementById('tiers'); if(el) el.scrollIntoView({behavior:'smooth'}); }} variant="outline" size="md" full/>}
                {activeTier === 'registered' && <Btn label="Apply Free" onClick={onFree} variant="dark" size="md" full/>}
                {activeTier === 'intelligence' && <Btn label="Join Intelligence — $250/yr" onClick={onIntel} variant="primary" size="md" full/>}
                {activeTier === 'investor' && <Btn label="Apply Investor — $1,000/yr" onClick={onInvestor} variant="dark" size="md" full/>}
              </div>
            </div>
          </div>
        )}

        {/* DESKTOP: Full comparison table */}
        {!mobile && (
          <div style={{ background:C.bg, borderRadius:20, border:`1.5px solid ${C.line}`, overflow:'hidden', overflowX:'auto', opacity:v?1:0, transform:v?'none':'translateY(16px)', transition:`opacity 0.7s ${EASE}` }}>
            <div style={{ display:'grid', gridTemplateColumns:colW.join(' '), padding:'18px 26px 14px', borderBottom:`2px solid ${C.line}`, background:C.white, minWidth:560 }}>
              <div/>
              {['Public','Registered','Intelligence','Investor'].map((c,i) => (
                <div key={c} style={{ textAlign:'center' }}>
                  <div style={{ fontFamily:F, fontSize:11, fontWeight:i>=2?700:600, letterSpacing:'1px', textTransform:'uppercase', color:i>=2?C.primary:'#aaa', paddingBottom:i>=2?5:0, borderBottom:i===3?`2px solid ${C.accent}`:i===2?`2px solid ${C.primary}`:'none', display:'inline-block' }}>{c}</div>
                </div>
              ))}
            </div>
            {COMPARE.map((grp,gi) => (
              <div key={gi}>
                <div style={{ padding:'10px 26px 4px', fontFamily:F, fontSize:9, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'#999', background:C.bg, borderTop:gi>0?`1px solid ${C.line}`:'none' }}>{grp.group}</div>
                {grp.rows.map((row,i) => (
                  <div key={i} style={{ display:'grid', gridTemplateColumns:colW.join(' '), padding:'12px 26px', alignItems:'center', background:i%2===0?C.white:C.bg, borderTop:`1px solid ${C.line}`, minWidth:560 }}>
                    <span style={{ fontFamily:F, fontSize:13, color:'#444', paddingRight:14 }}>{row.label}</span>
                    <Dot on={row.pub}/><Dot on={row.reg}/><Dot on={row.intel}/><Dot on={row.inv}/>
                  </div>
                ))}
              </div>
            ))}
            <div style={{ padding:'20px 26px', background:C.bg, borderTop:`2px solid ${C.line}`, display:'flex', justifyContent:'flex-end', gap:10 }}>
              <button onClick={onFree} style={{ background:'transparent', color:C.primary, border:`1.5px solid ${C.primary}`, borderRadius:50, padding:'10px 22px', fontFamily:F, fontSize:12, fontWeight:700, cursor:'pointer', whiteSpace:'nowrap' }}>Start Free</button>
              <button onClick={onIntel} style={{ background:C.primary, color:C.white, border:'none', borderRadius:50, padding:'11px 24px', fontFamily:F, fontSize:12, fontWeight:800, cursor:'pointer', whiteSpace:'nowrap' }}>Join Intelligence</button>
              <button onClick={onInvestor} style={{ background:C.accent, color:C.primary, border:'none', borderRadius:50, padding:'11px 24px', fontFamily:F, fontSize:12, fontWeight:800, cursor:'pointer', whiteSpace:'nowrap' }}>Apply Investor</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// SECTION 9 — THE PATH
// ─────────────────────────────────────────────
const ThePath = ({ onFree, mobile }) => {
  const [ref, v] = useVis(0.06);
  const steps = [
    { n:'01', tag:'Explore', head:'Browse freely', body:'Read 12 sector overviews, the BRIDGE methodology, and Ghana economy context. No account needed.' },
    { n:'02', tag:'Join', head:'Apply as Registered', body:'Submit a brief application. Unlock 3 free briefs, community access, newsletter, and events. Free, permanently.' },
    { n:'03', tag:'Engage', head:'30 days of depth', body:'Read briefs. Attend webinars. Engage with the community. Make an informed decision before committing.' },
    { n:'04', tag:'Unlock', head:'Choose your tier', body:'Intelligence at $250/yr for the full data platform. Investor at $1,000/yr for deal flow and direct advisory.' },
  ];

  return (
    <section className="m-pad" style={{ background:C.white }}>
      <div ref={ref} style={{ maxWidth:MAX, margin:'0 auto' }}>
        <div className="m-path-layout">
          <div style={{ flex:'0 1 300px', minWidth:240, opacity:v?1:0, transform:v?'none':'translateY(16px)', transition:`opacity 0.7s ${EASE}` }}>
            <Pill label="The Path"/>
            <h2 style={{ fontFamily:F, fontSize:'clamp(24px,3.5vw,42px)', fontWeight:300, color:C.primary, lineHeight:1.1, letterSpacing:'-1px', margin:'0 0 14px 0' }}>Membership is<br /><span style={{ fontWeight:700 }}>a commitment.</span></h2>
            <p style={{ fontFamily:F, fontSize:14, fontWeight:300, color:'#666', lineHeight:1.8, margin:'0 0 28px 0' }}>Not a subscription you sign up for and forget. A structured path from aware to informed to invested.</p>
            <Btn label="Begin with Free Membership" onClick={onFree} variant="dark" size="sm" full={mobile}/>
          </div>
          <div style={{ flex:1, minWidth:260, opacity:v?1:0, transform:v?'none':'translateY(16px)', transition:`opacity 0.7s ${EASE} 0.1s` }}>
            {steps.map((s,i) => (
              <div key={i} style={{ display:'flex', gap:20, paddingBottom:i<3?28:0 }}>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}>
                  <div style={{ width:38, height:38, borderRadius:'50%', background:i===3?C.primary:'transparent', border:`2px solid ${i===3?C.primary:C.line}`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <span style={{ fontFamily:F, fontSize:11, fontWeight:700, color:i===3?C.white:C.primary }}>{s.n}</span>
                  </div>
                  {i<3 && <div style={{ width:1, flex:1, background:C.line, marginTop:6 }}/>}
                </div>
                <div style={{ paddingBottom:6 }}>
                  <div style={{ fontFamily:F, fontSize:10, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.accent, marginBottom:3 }}>{s.tag}</div>
                  <div style={{ fontFamily:F, fontSize: mobile ? 15 : 16, fontWeight:700, color:C.dark, marginBottom:6 }}>{s.head}</div>
                  <p style={{ fontFamily:F, fontSize:14, fontWeight:300, color:'#666', lineHeight:1.75, margin:0 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// SECTION 10 — FAQ
// ─────────────────────────────────────────────
const FAQ = ({ onFree, mobile }) => {
  const [open, setOpen] = useState(null);
  const [ref, v] = useVis(0.06);

  return (
    <section className="m-pad" style={{ background:C.bg }}>
      <div ref={ref} style={{ maxWidth:MAX, margin:'0 auto' }}>
        {/* Mobile: compact inline header */}
        {mobile && (
          <div style={{ marginBottom:24, opacity:v?1:0, transition:`opacity 0.7s ${EASE}` }}>
            <Pill label="Questions"/>
            <h2 style={{ fontFamily:F, fontSize:'clamp(26px,7vw,36px)', fontWeight:300, color:C.primary, lineHeight:1.1, letterSpacing:'-1px', margin:0 }}>
              <span style={{ fontWeight:700 }}>Frequently</span> asked.
            </h2>
          </div>
        )}

        <div className="m-faq-layout">
          {/* Left sidebar — desktop only */}
          {!mobile && (
            <div className="m-faq-sticky" style={{ flex:'0 1 280px', position:'sticky', top:40, opacity:v?1:0, transform:v?'none':'translateY(16px)', transition:`opacity 0.7s ${EASE}` }}>
              <Pill label="Questions"/>
              <h2 style={{ fontFamily:F, fontSize:'clamp(26px,3.5vw,42px)', fontWeight:300, color:C.primary, lineHeight:1.12, letterSpacing:'-1px', margin:'0 0 14px 0' }}>
                <span style={{ fontWeight:700 }}>Frequently</span><br />asked.
              </h2>
              <p style={{ fontFamily:F, fontSize:14, fontWeight:300, color:'#666', lineHeight:1.8, margin:'0 0 24px 0' }}>
                Every question comes from a real conversation with someone serious about Ghana's opportunity landscape.
              </p>
              <div style={{ background:C.primary, borderRadius:14, padding:20 }}>
                <div style={{ fontFamily:F, fontSize:10, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.accent, marginBottom:8 }}>Still have questions?</div>
                <p style={{ fontFamily:F, fontSize:13, fontWeight:300, color:'rgba(255,255,255,0.5)', lineHeight:1.7, marginBottom:16 }}>We respond to every inquiry — clearly and directly.</p>
                <div style={{ display:'flex', gap:8 }}>
                  <button style={{ background:C.accent, color:C.primary, border:'none', borderRadius:50, padding:'9px 18px', fontSize:12, fontWeight:800, fontFamily:F, cursor:'pointer' }}>Contact Us</button>
                  <button onClick={onFree} style={{ background:'transparent', color:'rgba(255,255,255,0.65)', border:'1.5px solid rgba(255,255,255,0.2)', borderRadius:50, padding:'9px 18px', fontSize:12, fontWeight:500, fontFamily:F, cursor:'pointer' }}>Join Free</button>
                </div>
              </div>
            </div>
          )}

          {/* Accordions */}
          <div style={{ flex:1, minWidth:260, opacity:v?1:0, transform:v?'none':'translateY(16px)', transition:`opacity 0.7s ${EASE} 0.08s` }}>
            {FAQS.map((faq,i) => (
              <div key={i} style={{ borderTop:`1px solid ${C.line}`, borderRadius:open===i?12:0, background:open===i?C.white:'transparent', boxShadow:open===i?`0 0 0 1px ${C.line}`:'none', marginBottom:open===i?8:0, overflow:'hidden', transition:`all 0.2s ${EASE}` }}>
                <button onClick={() => setOpen(open===i?null:i)} style={{ width:'100%', textAlign:'left', background:'none', border:'none', padding: mobile ? '16px 14px' : '18px 16px', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:14 }}>
                  <span style={{ fontFamily:F, fontSize: mobile ? 14 : 15, fontWeight:600, color:open===i?C.primary:C.dark, lineHeight:1.4 }}>{faq.q}</span>
                  <div style={{ width:24, height:24, borderRadius:'50%', flexShrink:0, background:open===i?C.primary:C.bg, border:`1.5px solid ${open===i?C.primary:C.line}`, display:'flex', alignItems:'center', justifyContent:'center', color:open===i?C.white:'#999', transform:open===i?'rotate(180deg)':'none', transition:`all 0.2s ${EASE}`, marginTop:2 }}>
                    <ChevronDown size={12}/>
                  </div>
                </button>
                {open===i && (
                  <div style={{ padding: mobile ? '0 14px 18px' : '0 16px 20px' }}>
                    <p style={{ margin:0, fontFamily:F, fontSize:14, fontWeight:300, color:'#555', lineHeight:1.85, borderLeft:`3px solid ${C.accent}`, paddingLeft:14 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
            <div style={{ borderTop:`1px solid ${C.line}` }}/>

            {/* Mobile: contact block at bottom of FAQ */}
            {mobile && (
              <div style={{ marginTop:24, background:C.primary, borderRadius:14, padding:20 }}>
                <div style={{ fontFamily:F, fontSize:10, fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.accent, marginBottom:8 }}>Still have questions?</div>
                <p style={{ fontFamily:F, fontSize:13, fontWeight:300, color:'rgba(255,255,255,0.5)', lineHeight:1.7, marginBottom:16 }}>We respond to every inquiry — clearly and directly.</p>
                <div style={{ display:'flex', gap:8 }}>
                  <button style={{ flex:1, background:C.accent, color:C.primary, border:'none', borderRadius:50, padding:'11px', fontSize:13, fontWeight:800, fontFamily:F, cursor:'pointer' }}>Contact Us</button>
                  <button onClick={onFree} style={{ flex:1, background:'transparent', color:'rgba(255,255,255,0.65)', border:'1.5px solid rgba(255,255,255,0.2)', borderRadius:50, padding:'11px', fontSize:13, fontWeight:500, fontFamily:F, cursor:'pointer' }}>Join Free</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// SECTION 11 — BOTTOM CTA
// ─────────────────────────────────────────────
const BottomCTA = ({ onFree, onIntel, mobile }) => {
  const [ref, v] = useVis(0.15);
  return (
    <section ref={ref} style={{ background:C.primary, padding: mobile ? '52px 20px 80px' : '56px 80px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', right:-60, top:'50%', transform:'translateY(-50%)', fontSize:240, fontFamily:F, fontWeight:300, color:'rgba(255,255,255,0.025)', lineHeight:1, pointerEvents:'none', userSelect:'none', letterSpacing:'-10px' }}>30</div>
      <div style={{ maxWidth:MAX, margin:'0 auto', position:'relative', zIndex:1, opacity:v?1:0, transform:v?'none':'translateY(16px)', transition:`opacity 0.8s ${EASE}` }}>
        <div className="m-cta-row">
          <div style={{ flex:'1 1 280px' }}>
            <Pill label="Get Started Today" dark/>
            <h2 style={{ fontFamily:F, fontSize: mobile ? 'clamp(26px,7vw,36px)' : 'clamp(28px,3.5vw,44px)', fontWeight:300, color:C.white, lineHeight:1.1, letterSpacing:'-1px', margin:'0 0 10px 0' }}>
              The first step is{' '}<span style={{ color:C.accent, fontWeight:800 }}>always free.</span>
            </h2>
            <p style={{ fontFamily:F, fontSize:14, fontWeight:300, color:'rgba(255,255,255,0.45)', lineHeight:1.7, margin:0 }}>
              Apply as a Registered Member. Engage for 30 days at no cost.<br/>Then decide. Nothing stops you from beginning right now.
            </p>
          </div>
          <div className="m-cta-btns">
            <div style={{ display:'flex', gap:10, flexDirection: mobile ? 'column' : 'row' }}>
              <Btn label="Apply Free" onClick={onFree} variant="primary" size="lg" full/>
              <Btn label="Intelligence — $250/yr" onClick={onIntel} variant="ghost" size="lg" full/>
            </div>
            <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
              {['No credit card','30-day path','Cancel anytime'].map((t,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <Check size={10} color={C.accent} strokeWidth={3}/>
                  <span style={{ fontFamily:F, fontSize:11, color:'rgba(255,255,255,0.3)' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────
export default function MembershipPage({ onApplyFree, onApplyPaid, onApplyInvestor }) {
  const mobile = useMobile();
  const hFree     = onApplyFree     || (() => {});
  const hIntel    = onApplyPaid     || (() => {});
  const hInvestor = onApplyInvestor || (() => {});
  const scrollTo = id => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior:'smooth', block:'start' }); };

  return (
    <div style={{ background:C.bg, minHeight:'100vh', fontFamily:F }}>
      <GlobalStyles/>
      <Hero        onFree={hFree} onIntel={hIntel} onScroll={() => scrollTo('platform')} mobile={mobile}/>
      <WhyBridge   mobile={mobile}/>
      <TierCards   onFree={hFree} onIntel={hIntel} onInvestor={hInvestor} mobile={mobile}/>
      <SocialProof mobile={mobile}/>
      <PlatformShowcase mobile={mobile}/>
      <Urgency     onIntel={hIntel} mobile={mobile}/>
      <Publications mobile={mobile}/>
      <CompareTable onFree={hFree} onIntel={hIntel} onInvestor={hInvestor} mobile={mobile}/>
      <ThePath     onFree={hFree} mobile={mobile}/>
      <FAQ         onFree={hFree} mobile={mobile}/>
      <BottomCTA   onFree={hFree} onIntel={hIntel} mobile={mobile}/>
      <MobileStickyCTA onFree={hFree} onIntel={hIntel}/>
    </div>
  );
}
