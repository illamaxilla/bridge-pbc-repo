import { useState, useEffect, useRef } from "react";
import { DOC_COLORS as C, DOC_FONTS as F } from "@/lib/document-tokens";
import DocumentLogo from "@/components/documents/DocumentLogo";
import DocumentGlobalStyles from "@/components/documents/DocumentGlobalStyles";

const PAGE_CSS = `
  .sector-cards{display:none;}
  .read-bar{position:fixed;top:0;left:0;height:2px;background:${C.lime};z-index:200;pointer-events:none;transition:width 0.1s linear;}
  .float-cta{display:none;}
  .mob-nav-strip{display:none;}
  .swipe-row{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;gap:12px;}
  .swipe-row::-webkit-scrollbar{display:none;}
  .swipe-card{scroll-snap-align:start;flex-shrink:0;}
  .venture-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;}
  .consulting-grid{display:grid;grid-template-columns:1fr 1fr;gap:2px;}
  @media(max-width:900px){
    .two-col{grid-template-columns:1fr!important;}
    .three-col{grid-template-columns:1fr!important;}
  }
  @media(max-width:600px){
    button{-webkit-tap-highlight-color:transparent;touch-action:manipulation;}
    a{-webkit-tap-highlight-color:transparent;}
    .pad-topbar{padding:9px 16px!important;}
    .pad-footer{padding:16px 18px calc(16px + env(safe-area-inset-bottom))!important;}
    .pad-byline{padding:8px 18px!important;}
    .two-col{grid-template-columns:1fr!important;}
    .two-col-inner{grid-template-columns:1fr!important;}
    .three-col{grid-template-columns:1fr!important;}
    .stats-row{flex-wrap:wrap!important;}
    .stats-row>div{flex:0 0 50%!important;border-left:none!important;border-top:1px solid rgba(255,255,255,0.08)!important;}
    .stats-row>div:nth-child(2){border-left:1px solid rgba(255,255,255,0.08)!important;}
    .stats-row>div:nth-child(4){border-left:1px solid rgba(255,255,255,0.08)!important;}
    .cover-hdr{gap:10px!important;}
    .cover-hdr-label{display:none!important;}
    .sector-matrix{display:none!important;}
    .sector-cards{display:grid!important;grid-template-columns:1fr!important;}
    .play-detail{padding:16px!important;}
    .cta-row{flex-direction:column!important;}
    .cta-row a,.cta-row button{min-width:0!important;width:100%!important;}
    .footer-nav{display:none!important;}
    .footer-inner{flex-direction:column!important;align-items:flex-start!important;gap:10px!important;}
    .venture-grid{grid-template-columns:1fr!important;}
    .consulting-grid{grid-template-columns:1fr!important;}
    .plays-desktop{display:none!important;}
    .plays-mobile{display:block!important;}
    .venture-table{display:none!important;}
    .venture-swipe{display:block!important;}
    .sector-deep-tabs{flex-wrap:wrap!important;gap:4px!important;}
    .ladder-row{overflow-x:auto!important;flex-wrap:nowrap!important;}
    .ladder-step{min-width:120px!important;flex-shrink:0!important;}
    .mob-nav-strip{display:flex!important;overflow-x:auto;scrollbar-width:none;gap:6px;padding:8px 18px;position:sticky;top:44px;z-index:90;background:${C.ink};border-bottom:1px solid rgba(255,255,255,0.1);}
    .mob-nav-strip::-webkit-scrollbar{display:none;}
    .mob-nav-pill{flex-shrink:0;padding:5px 12px;font-family:${F.sans};font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border:1px solid rgba(255,255,255,0.15);background:transparent;color:rgba(255,255,255,0.45);cursor:pointer;white-space:nowrap;transition:all 0.15s;}
    .mob-nav-pill.active{background:${C.forest};color:${C.lime};border-color:${C.forest};}
    .float-cta{display:flex!important;position:fixed;bottom:0;left:0;right:0;z-index:150;padding:10px 18px calc(10px + env(safe-area-inset-bottom));background:${C.ink};border-top:1px solid rgba(184,217,53,0.2);align-items:center;gap:10px;transition:transform 0.3s ease;}
    .float-cta.hidden{transform:translateY(100%);}
    .scroll-dots{display:flex!important;gap:6px;justify-content:center;padding-top:10px;}
    .scroll-dot{height:8px;border-radius:4px;cursor:pointer;transition:all 0.3s ease;}
    .scroll-dot.active{width:24px;background:${C.lime}!important;}
    .scroll-dot.inactive{width:8px;}
  }
`;

/* ── TOPBAR ── */
const TopBar = ({ logoRef }) => {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const fn = () => { if (!logoRef?.current) return; setPast(logoRef.current.getBoundingClientRect().bottom < 0); };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, [logoRef]);
  return (
    <div className="np pad-topbar" style={{ position:'sticky', top:0, zIndex:100, background:C.ink, borderBottom:`1px solid rgba(184,217,53,0.2)`, padding:'10px 40px', display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'0 2px 16px rgba(0,0,0,0.3)' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
        <div style={{ overflow:'hidden', maxWidth:past?'200px':'0px', opacity:past?1:0, transition:'max-width 0.35s ease,opacity 0.3s ease', display:'flex', alignItems:'center' }}>
          <DocumentLogo height={18} variant="white"/>
          <div style={{ width:'1px', height:'16px', background:'rgba(255,255,255,0.15)', margin:'0 12px', flexShrink:0 }}/>
        </div>
        <span className="mob-hide" style={{ fontFamily:F.sans, fontSize:'11px', color:'rgba(255,255,255,0.45)' }}>2026 Budget Alignment</span>
        <div style={{ width:'1px', height:'12px', background:'rgba(255,255,255,0.12)' }} className="mob-hide"/>
        <span style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, color:C.lime, letterSpacing:'1.5px', textTransform:'uppercase' }}>Members Edition</span>
      </div>
      <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
        <a href="#consulting" className="mob-hide" style={{ fontFamily:F.sans, fontSize:'11px', fontWeight:700, color:'rgba(255,255,255,0.45)', textDecoration:'none' }}>Advisory &#8594;</a>
        <a href="#consulting" style={{ background:C.lime, color:C.ink, padding:'7px 16px', fontFamily:F.sans, fontSize:'10px', fontWeight:800, textDecoration:'none', letterSpacing:'0.5px' }}>Engage BRIDGE &#8594;</a>
      </div>
    </div>
  );
};

/* ── COVER ── */
const Cover = ({ logoRef }) => (
  <div>
    <div className="pad-cover" style={{ background:C.ink, padding:'36px 64px 0', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', right:'48px', top:'12px', fontFamily:F.display, fontSize:'220px', fontWeight:900, color:'rgba(184,217,53,0.03)', lineHeight:1, userSelect:'none', pointerEvents:'none' }}>&#8373;</div>
      <div ref={logoRef} className="cover-hdr" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'40px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
          <DocumentLogo height={28} variant="white"/>
          <div className="cover-hdr-label" style={{ width:'1px', height:'22px', background:'rgba(255,255,255,0.15)' }}/>
          <span className="cover-hdr-label" style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2px', color:'rgba(255,255,255,0.35)', textTransform:'uppercase' }}>Investor Intelligence</span>
        </div>
        <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
          <span style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, color:C.lime, letterSpacing:'2px', textTransform:'uppercase', border:`1px solid rgba(184,217,53,0.4)`, padding:'4px 12px', background:'rgba(184,217,53,0.08)' }}>MEMBERS EDITION</span>
          <span style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, color:'rgba(255,255,255,0.4)', letterSpacing:'2px', textTransform:'uppercase', border:`1px solid rgba(255,255,255,0.12)`, padding:'4px 12px' }}>2026</span>
        </div>
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
        <div style={{ height:'2px', width:'32px', background:C.lime }}/>
        <span style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(255,255,255,0.4)' }}>Full Analysis · 18 Ventures · Advisory Access</span>
      </div>
      <h1 style={{ fontFamily:F.display, fontSize:'clamp(34px,5.5vw,72px)', fontWeight:900, color:C.paper, lineHeight:1.0, letterSpacing:'-2px', marginBottom:'10px' }}>
        2026 Budget<br/>
        <span style={{ color:C.lime }}>Intelligence.</span>
      </h1>
      <h2 style={{ fontFamily:F.display, fontSize:'clamp(18px,3vw,38px)', fontWeight:400, fontStyle:'italic', color:'rgba(250,248,243,0.55)', lineHeight:1.2, marginBottom:'36px' }}>
        Full Analysis. Venture Pipeline. Direct Access.
      </h2>
      <div className="stats-row" style={{ display:'flex', gap:'0', borderTop:`1px solid rgba(255,255,255,0.08)`, paddingTop:'24px', marginBottom:'0' }}>
        {[
          { val:'GH&#8373;271.7B', label:'2026 National Budget' },
          { val:'174+', label:'Ventures Analysed' },
          { val:'12', label:'Sectors · Full Deep Dives' },
          { val:'$135–259M', label:'Portfolio Target' },
        ].map((s, i) => (
          <div key={i} style={{ flex:1, padding:'18px 20px', borderLeft: i > 0 ? `1px solid rgba(255,255,255,0.08)` : 'none' }}>
            <div style={{ fontFamily:F.display, fontSize:'clamp(18px,2.5vw,28px)', fontWeight:700, color:C.lime, lineHeight:1, marginBottom:'4px' }} dangerouslySetInnerHTML={{__html:s.val}}/>
            <div style={{ fontFamily:F.sans, fontSize:'10px', color:'rgba(255,255,255,0.35)', letterSpacing:'0.5px' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
    <div className="pad-byline" style={{ background:C.forest, padding:'10px 64px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
      <div style={{ display:'flex', gap:'16px', alignItems:'center' }}>
        <span style={{ fontFamily:F.sans, fontSize:'10px', color:'rgba(250,248,243,0.5)', letterSpacing:'0.5px' }}>BRIDGE PBC · January 2026 · Members Edition v2.0</span>
        <span style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, color:C.lime, letterSpacing:'1px', textTransform:'uppercase', border:`1px solid rgba(184,217,53,0.3)`, padding:'2px 8px' }}>CONFIDENTIAL</span>
      </div>
      <span className="mob-hide" style={{ fontFamily:F.mono, fontSize:'10px', color:'rgba(250,248,243,0.3)' }}>bridgepbc.com/members</span>
    </div>
  </div>
);

/* ── EXECUTIVE BRIEF ── */
const ExecBrief = () => (
  <div className="pad-section" style={{ background:C.paper, padding:'56px 64px', borderBottom:`1px solid ${C.border}` }}>
    <div style={{ maxWidth:'900px', margin:'0 auto' }}>
      <div style={{ borderTop:`6px solid ${C.ink}`, borderBottom:`2px solid ${C.lime}`, paddingBottom:'3px', marginBottom:'20px' }}/>
      <div style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:C.muted, marginBottom:'8px' }}>Executive Intelligence Brief</div>
      <h2 style={{ fontFamily:F.display, fontSize:'clamp(22px,3.5vw,36px)', fontWeight:700, color:C.ink, lineHeight:1.2, marginBottom:'28px' }}>The convergence is structural, not cyclical. Here is what that means for your capital.</h2>
      <div style={{ borderLeft:`3px solid ${C.lime}`, paddingLeft:'20px', marginBottom:'32px' }}>
        <p style={{ fontFamily:F.body, fontSize:'17px', fontStyle:'italic', color:C.forest, lineHeight:1.8, fontWeight:300 }}>
          "Three forces have converged in 2026 that have never converged simultaneously in Ghana's post-independence history: a government with an explicit private capital partnership mandate, a diaspora with unprecedented financial maturity, and a development finance architecture designed to de-risk exactly the ventures BRIDGE is building."
        </p>
      </div>
      <div className="two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', marginBottom:'32px' }}>
        <div>
          <p style={{ fontFamily:F.body, fontSize:'15px', lineHeight:1.85, color:C.ink, fontWeight:300, marginBottom:'16px' }}>
            The Mahama administration has done something unusual: it has mapped its seven policy pillars directly to the kinds of private investment vehicles BRIDGE operates. Grow24, Make24, Build24, Connect24, Fund24, Aspire24, and Care24 are not aspirational slogans. They are budget line items with GH&#8373;271.7 billion in committed national appropriations.
          </p>
          <p style={{ fontFamily:F.body, fontSize:'15px', lineHeight:1.85, color:C.ink, fontWeight:300, marginBottom:'16px' }}>
            Of that total, BRIDGE has identified over GH&#8373;150 billion directly aligned to its 12-sector portfolio — and within that, GH&#8373;110 billion in programs that explicitly require private co-investment to execute. The government has publicly stated its intent to keep large infrastructure investments off the sovereign balance sheet. GIIF, DBG, and the Women's Development Bank are the vehicles. BRIDGE is the partner.
          </p>
          <p style={{ fontFamily:F.body, fontSize:'15px', lineHeight:1.85, color:C.ink, fontWeight:300 }}>
            The leverage ratios are not projections. They are derived from existing DACF allocation formulas, Oil Palm Window terms, and confirmed DFI co-investment mandates. A GH&#8373;2.2 billion mandatory market construction allocation across 260 districts does not require government goodwill to unlock — it requires qualified technical partners. That is the BRIDGE position.
          </p>
        </div>
        <div>
          <div style={{ background:C.forest, padding:'24px', marginBottom:'16px' }}>
            <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:C.lime, marginBottom:'16px' }}>Why This Moment Is Different</div>
            {[
              { point:'Policy mandate is operational', detail:'Seven pillars with GH&#8373;271.7B in budget allocations — not aspirations' },
              { point:'Government needs private partners', detail:'Explicitly keeping investments off sovereign balance sheet via GIIF/DBG' },
              { point:'DFI capital is pre-positioned', detail:'WDB, DBG, GIIF actively seeking private co-investors for budget-aligned programmes' },
              { point:'Sankofa creates formal diaspora channel', detail:'First time diaspora investment has a structured government-backed gateway' },
              { point:'Technical partners are scarce', detail:'BRIDGE is one of very few organisations with the methodology + sector coverage' },
              { point:'First-mover shapes the template', detail:'DACF market construction needs a replicable model — Kejetia provides it' },
            ].map((p, i) => (
              <div key={i} style={{ paddingBottom:'12px', marginBottom:'12px', borderBottom: i < 5 ? `1px solid rgba(255,255,255,0.07)` : 'none' }}>
                <div style={{ fontFamily:F.sans, fontSize:'11px', fontWeight:700, color:C.paper, marginBottom:'2px' }}>{p.point}</div>
                <div style={{ fontFamily:F.body, fontSize:'11px', fontStyle:'italic', color:'rgba(255,255,255,0.4)' }} dangerouslySetInnerHTML={{__html:p.detail}}/>
              </div>
            ))}
          </div>
          <div style={{ background:C.paperDark, border:`1px solid ${C.border}`, padding:'16px 18px' }}>
            <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.muted, marginBottom:'10px' }}>BRIDGE Impact Score&#8482; — Portfolio Average</div>
            {[
              { label:'Policy Alignment', val:92, color:C.lime },
              { label:'Capital Leverage', val:87, color:C.forest },
              { label:'Execution Readiness', val:78, color:C.teal },
              { label:'Risk-Adjusted Return', val:83, color:C.positive },
            ].map((m, i) => (
              <div key={i} style={{ marginBottom: i < 3 ? '10px' : '0' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'3px' }}>
                  <span style={{ fontFamily:F.sans, fontSize:'10px', color:C.muted }}>{m.label}</span>
                  <span style={{ fontFamily:F.mono, fontSize:'11px', fontWeight:700, color:m.color }}>{m.val}</span>
                </div>
                <div style={{ height:'3px', background:C.border, position:'relative' }}>
                  <div style={{ position:'absolute', left:0, top:0, height:'3px', width:`${m.val}%`, background:m.color }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ background:C.ink, padding:'24px 28px', display:'flex', gap:'20px', alignItems:'flex-start' }}>
        <div style={{ width:'3px', background:C.lime, alignSelf:'stretch', flexShrink:0 }}/>
        <p style={{ fontFamily:F.body, fontSize:'14px', lineHeight:1.75, color:'rgba(250,248,243,0.7)' }}>
          <strong style={{ fontFamily:F.sans, fontWeight:700, color:C.paper }}>The thesis in one sentence:</strong> The 2026 budget has created mandatory demand for exactly what BRIDGE builds — and the government cannot execute it without private technical partners. We are not asking for alignment with government. We are the vehicle the government's own framework requires.
        </p>
      </div>
    </div>
  </div>
);

/* ── MOBILE PLAYS SWIPE (used inside TopPlays on mobile) ── */
const MobPlaysSwipe = ({ plays }) => {
  const [idx, setIdx] = useState(0);
  const [entryOpen, setEntryOpen] = useState(null);
  const rowRef = useRef(null);
  const handleScroll = () => {
    if (!rowRef.current) return;
    setIdx(Math.round(rowRef.current.scrollLeft / (rowRef.current.offsetWidth + 12)));
  };
  const goTo = i => {
    if (!rowRef.current) return;
    rowRef.current.scrollTo({ left: i * (rowRef.current.offsetWidth + 12), behavior:'smooth' });
    setIdx(i);
  };
  return (
    <div className="plays-mobile" style={{ display:'none' }}>
      <div ref={rowRef} className="swipe-row" style={{ padding:'0 0 4px' }} onScroll={handleScroll}>
        {plays.map((p, i) => (
          <div key={i} className="swipe-card" style={{ width:'calc(100vw - 36px)' }}>
            <div style={{ background:'rgba(255,255,255,0.04)', border:`1px solid rgba(255,255,255,0.09)`, overflow:'hidden' }}>
              <div style={{ padding:'14px 16px', borderBottom:`1px solid rgba(255,255,255,0.07)` }}>
                <div style={{ fontFamily:F.mono, fontSize:'20px', fontWeight:700, color:'rgba(184,217,53,0.3)', marginBottom:'4px' }}>{p.num}</div>
                <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.lime, marginBottom:'4px', opacity:0.7 }}>{p.sector} · {p.pillar}</div>
                <div style={{ fontFamily:F.display, fontSize:'16px', fontWeight:700, color:C.paper, lineHeight:1.2, marginBottom:'6px' }} dangerouslySetInnerHTML={{__html:p.headline}}/>
                <div style={{ display:'flex', gap:'12px', alignItems:'center' }}>
                  <span style={{ fontFamily:F.mono, fontSize:'12px', fontWeight:700, color:C.lime }} dangerouslySetInnerHTML={{__html:p.budget}}/>
                  <span style={{ fontFamily:F.sans, fontSize:'9px', color:'rgba(255,255,255,0.3)' }}>Lev. {p.lever}</span>
                  <span style={{ fontFamily:F.mono, fontSize:'10px', color:C.lime, marginLeft:'auto', border:`1px solid rgba(184,217,53,0.2)`, padding:'1px 6px' }}>{p.portfolio}</span>
                </div>
              </div>
              <div style={{ padding:'12px 16px', borderBottom:`1px solid rgba(255,255,255,0.07)` }}>
                <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'5px' }}>Conviction</div>
                <p style={{ fontFamily:F.body, fontSize:'12px', fontStyle:'italic', color:'rgba(250,248,243,0.5)', lineHeight:1.6 }}>{p.conviction}</p>
              </div>
              <div style={{ padding:'12px 16px', borderBottom:`1px solid rgba(255,255,255,0.07)` }}>
                <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'5px' }}>Thesis</div>
                <p style={{ fontFamily:F.body, fontSize:'12px', lineHeight:1.65, color:'rgba(250,248,243,0.55)', fontWeight:300 }}>{p.thesis}</p>
              </div>
              <button onClick={() => setEntryOpen(entryOpen===i ? null : i)} style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 16px', background:'transparent', border:'none', cursor:'pointer', WebkitTapHighlightColor:'transparent' }}>
                <span style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(255,255,255,0.35)' }}>Entry Points &amp; Risk</span>
                <span style={{ color:C.lime, fontSize:'12px', transition:'transform 0.2s', transform: entryOpen===i ? 'rotate(180deg)' : 'none' }}>&#8595;</span>
              </button>
              {entryOpen === i && (
                <div style={{ padding:'4px 16px 14px' }}>
                  {p.entry.map((e, j) => (
                    <div key={j} style={{ display:'flex', gap:'8px', marginBottom:'7px', alignItems:'flex-start' }}>
                      <span style={{ color:C.lime, fontSize:'10px', flexShrink:0, marginTop:'1px' }}>&#8594;</span>
                      <span style={{ fontFamily:F.sans, fontSize:'11px', color:'rgba(250,248,243,0.6)', lineHeight:1.45 }} dangerouslySetInnerHTML={{__html:e}}/>
                    </div>
                  ))}
                  <div style={{ background:'rgba(168,32,13,0.08)', border:`1px solid rgba(168,32,13,0.15)`, padding:'10px 12px', marginTop:'8px' }}>
                    <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, color:'#A8200D', opacity:0.8, letterSpacing:'1px', textTransform:'uppercase', marginBottom:'4px' }}>Risk &amp; Mitigation</div>
                    <p style={{ fontFamily:F.body, fontSize:'11px', fontStyle:'italic', color:'rgba(250,248,243,0.45)', lineHeight:1.55 }} dangerouslySetInnerHTML={{__html:p.risk}}/>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="scroll-dots" style={{ display:'none' }}>
        {plays.map((_, i) => (
          <div key={i} onClick={() => goTo(i)} className={`scroll-dot${i===idx?' active':' inactive'}`} style={{ background: i===idx ? C.lime : 'rgba(255,255,255,0.2)' }}/>
        ))}
      </div>
    </div>
  );
};

/* ── TOP 5 PLAYS (EXPANDED) ── */
const TopPlays = () => {
  const [open, setOpen] = useState(0);
  const plays = [
    {
      num:'01', sector:'Infrastructure & Market Systems', pillar:'Build24', stars:5,
      headline:'24-Hour Model Markets — The Mandatory Mandate',
      budget:'GH&#8373;2.2B+', lever:'1:15+', portfolio:'$8–15M · 18 ventures',
      conviction:'The DACF mandate is the only purely demand-guaranteed opportunity in the portfolio. No projections required.',
      thesis:'The mandatory 25% DACF allocation across 260+ districts creates a government-funded demand pull for exactly what BRIDGE builds. The Kejetia Market digitisation platform becomes not a pilot but the replicable national template. District Assemblies need a qualified technical partner — and BRIDGE has already proven the model.',
      entry:['Technical partner for DACF-funded market construction across 4 district tiers', 'Kejetia digital platform &#8594; 16-region replication road map', 'WASH infrastructure investment across 400+ underserved communities', 'Digital payments infrastructure for 30,000+ market vendors'],
      risk:'Execution timeline risk: District Assembly procurement cycles run 18–24 months. BRIDGE mitigates by securing framework agreements ahead of annual budgets, not chasing individual tenders.',
      dfi:'GIIF Market Infrastructure Fund · District Assembly DACF · GH&#8373;2.2B+ confirmed',
      ventures:['Kejetia Digitisation Platform', 'District Market WASH Solutions', 'Market Digital Payments', 'Vendor Business Intelligence', 'Market Cold Storage Network'],
    },
    {
      num:'02', sector:'Agriculture & Value Chains', pillar:'Grow24', stars:5,
      headline:'Oil Palm Finance Window — US$500M Patient Capital',
      budget:'GH&#8373;8.4B+', lever:'1:5.2', portfolio:'$12–22M · 18 ventures',
      conviction:'A 5-year repayment moratorium and 70% project financing is structural patient capital — rare in any frontier market.',
      thesis:'The National Policy on Integrated Oil Palm Development (2026–2032) is the single most significant agricultural policy opportunity in the portfolio. Government has committed to a US$500M financing window with exceptional terms designed for exactly the capital profile BRIDGE deploys.',
      entry:['Qualified intermediary for Oil Palm Window disbursements', 'Cold chain + aggregation infrastructure alongside GH&#8373;828M enclave road programme', 'Warehouse receipt financing via Ghana Buffer Stock Company (GH&#8373;200M)', 'Smallholder aggregation platforms connecting 50,000+ farmers to processing'],
      risk:'Commodity price volatility. BRIDGE mitigates through contract farming arrangements, forward agreements with processors, and portfolio diversification across crops (oil palm + maize + cocoa adjacencies).',
      dfi:'Oil Palm Development Finance Window US$500M · DBG Agricultural Window · GH&#8373;828M Enclave Roads',
      ventures:['Oil Palm Aggregation Hubs', 'Cold Chain Corridor North', 'Smallholder Digital Platform', 'Agro-Processing Facilities', 'Warehouse Receipt Finance'],
    },
    {
      num:'03', sector:'Energy & Renewable Resources', pillar:'Grow24 + Build24', stars:5,
      headline:'Rural Electrification — The Infrastructure Multiplier',
      budget:'GH&#8373;21.0B+', lever:'1:8+', portfolio:'$12–22M · 14 ventures',
      conviction:'Every other BRIDGE venture performs better with reliable power. Energy is the compounding investment in the portfolio.',
      thesis:"Energy access enables the entire portfolio. The government's GH&#8373;21B commitment creates the grid backbone — BRIDGE's last-mile solar and mini-grid ventures capture the gaps government cannot reach efficiently, at the points where processing and agriculture ventures need power most.",
      entry:['Solar mini-grid deployment in underserved agricultural processing zones', 'Market solar micro-grids across 50 BRIDGE-aligned market sites', 'Renewable energy integration for cold chain + agro-processing facilities', 'Solar irrigation systems for smallholder farm clusters'],
      risk:'Grid extension competition. If government grid reaches target communities faster than projected, mini-grid economics change. BRIDGE mitigates by prioritising sites in confirmed 5+ year grid extension zones.',
      dfi:'Rural Electrification Authority · VRA · PURC · GH&#8373;21B energy envelope',
      ventures:['Solar Mini-Grid Network', 'Market Solar Programme', 'Agro-Processing Power', 'Solar Irrigation Systems', 'Energy Efficiency Retrofits'],
    },
    {
      num:'04', sector:'Manufacturing & Light Industry', pillar:'Make24', stars:5,
      headline:'Make24 — The Import Substitution Moment',
      budget:'Policy + GIIF', lever:'Policy-backed', portfolio:'$15–30M · 14 ventures',
      conviction:'Export restrictions on scrap metal and raw rubber mean import substitution is now protected — not competing on price alone.',
      thesis:"Ghana imports over $6 billion annually in goods it can produce domestically. Make24's agro-industrial parks, raw material export restrictions, and confirmed garment factory commitments create protected market conditions for domestic supply chain development.",
      entry:['Supply chain integration with 3 confirmed new garment factories (27,000 jobs)', 'Agro-processing facility development alongside government industrial parks', 'Ghana Free Zones — 100% duty exemption, 10-year tax holiday for qualifying ventures', 'Pharmaceutical precursor manufacturing (import substitution in healthcare)'],
      risk:'Execution capacity — manufacturing requires technical management depth. BRIDGE mitigates through joint ventures with existing operators rather than greenfield builds.',
      dfi:'GIIF Industrial Development · Ghana Free Zones Authority · ECOWAS Trade Finance',
      ventures:['Garment Supply Chain', 'Agro-Processing Parks', 'Pharmaceutical Inputs', 'Packaging Manufacturing', 'Construction Materials'],
    },
    {
      num:'05', sector:'Transportation & Logistics', pillar:'Connect24', stars:5,
      headline:'Connect24 — The Corridor Infrastructure Play',
      budget:'GH&#8373;30B+', lever:'1:20+', portfolio:'$10–22M · 14 ventures',
      conviction:'GH&#8373;30B in government backbone means BRIDGE logistics ventures are essentially riding a government-funded highway.',
      thesis:"GH&#8373;30B in Connect24 infrastructure — Yapei Inland Port, Tamale Air Cargo Hub, Volo-Battor Agro-Industrial Park — creates logistics corridors that make BRIDGE's cold chain, aggregation, and export ventures viable at scale. Every BRIDGE logistics dollar sits on a GH&#8373;20+ government backbone.",
      entry:['Cold chain network positioned at confirmed new logistics nodes', 'Export development programme via Tamale Air Cargo Hub (operational 2027)', 'Last-mile distribution at government corridor junctions', 'Inland port logistics services at Yapei (construction underway)'],
      risk:'Infrastructure completion delays. Government construction timelines in Ghana historically extend 20–40%. BRIDGE ventures are staged to activate at physical completion, not projected completion.',
      dfi:'Connect24 Infrastructure Envelope · GH&#8373;30B · ECOWAS Corridor Fund · AfDB Transport',
      ventures:['Cold Chain Corridor', 'Export Development Hub', 'Corridor Last-Mile', 'Port Logistics Services', 'Air Cargo Cold Chain'],
    },
  ];

  return (
    <div style={{ background:C.ink, borderBottom:`1px solid rgba(255,255,255,0.06)` }}>
      <div className="pad-section" style={{ padding:'56px 64px' }}>
        <div style={{ maxWidth:'900px', margin:'0 auto' }}>
          <div style={{ borderTop:`6px solid ${C.lime}`, borderBottom:`2px solid rgba(255,255,255,0.1)`, paddingBottom:'3px', marginBottom:'20px' }}/>
          <div style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'8px' }}>Highest-Conviction Positions · Full Analysis</div>
          <h2 style={{ fontFamily:F.display, fontSize:'clamp(22px,3.5vw,36px)', fontWeight:700, color:C.paper, lineHeight:1.2, marginBottom:'32px' }}>Five plays where government capital creates compounding investor advantage.</h2>
          {/* Desktop: accordion */}
          <div className="plays-desktop" style={{ display:'flex', flexDirection:'column', gap:'2px' }}>
            {plays.map((p, i) => (
              <div key={i}>
                <div onClick={() => setOpen(open === i ? null : i)} style={{ background: open===i ? 'rgba(184,217,53,0.07)' : 'rgba(255,255,255,0.03)', border:`1px solid ${open===i ? 'rgba(184,217,53,0.25)' : 'rgba(255,255,255,0.07)'}`, padding:'20px', cursor:'pointer', display:'flex', alignItems:'center', gap:'16px', transition:'all 0.2s ease' }}>
                  <div style={{ fontFamily:F.mono, fontSize:'22px', fontWeight:700, color: open===i ? C.lime : 'rgba(255,255,255,0.15)', flexShrink:0, width:'36px' }}>{p.num}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.lime, marginBottom:'4px', opacity:0.7 }}>{p.sector} · {p.pillar}</div>
                    <div style={{ fontFamily:F.display, fontSize:'clamp(14px,2vw,18px)', fontWeight:700, color:C.paper, lineHeight:1.2 }}>{p.headline}</div>
                    {open !== i && <div style={{ fontFamily:F.body, fontSize:'12px', fontStyle:'italic', color:'rgba(255,255,255,0.35)', marginTop:'4px' }}>{p.conviction}</div>}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'16px', flexShrink:0 }}>
                    <div className="mob-hide" style={{ textAlign:'right' }}>
                      <div style={{ fontFamily:F.mono, fontSize:'13px', fontWeight:700, color:C.lime }} dangerouslySetInnerHTML={{__html:p.budget}}/>
                      <div style={{ fontFamily:F.sans, fontSize:'9px', color:'rgba(255,255,255,0.3)' }}>Leverage {p.lever}</div>
                    </div>
                    <div style={{ color: open===i ? C.lime : 'rgba(255,255,255,0.3)', fontSize:'16px', transition:'transform 0.2s', transform: open===i ? 'rotate(180deg)' : 'none' }}>&#8595;</div>
                  </div>
                </div>
                {open === i && (
                  <div className="play-detail" style={{ background:'rgba(184,217,53,0.04)', border:`1px solid rgba(184,217,53,0.12)`, borderTop:'none', padding:'28px 24px' }}>
                    <div className="two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'32px', marginBottom:'24px' }}>
                      <div>
                        <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'10px' }}>Full Investment Thesis</div>
                        <p style={{ fontFamily:F.body, fontSize:'13px', lineHeight:1.8, color:'rgba(250,248,243,0.65)', fontWeight:300, marginBottom:'16px' }}>{p.thesis}</p>
                        <div style={{ background:'rgba(255,255,255,0.04)', border:`1px solid rgba(255,255,255,0.07)`, padding:'12px 14px' }}>
                          <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(255,255,255,0.25)', marginBottom:'6px' }}>Risk Mitigation</div>
                          <p style={{ fontFamily:F.body, fontSize:'11px', fontStyle:'italic', color:'rgba(250,248,243,0.4)', lineHeight:1.6 }} dangerouslySetInnerHTML={{__html:p.risk}}/>
                        </div>
                      </div>
                      <div>
                        <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'10px' }}>Entry Points</div>
                        {p.entry.map((e, j) => (
                          <div key={j} style={{ display:'flex', gap:'10px', marginBottom:'10px', alignItems:'flex-start' }}>
                            <span style={{ color:C.lime, fontSize:'11px', flexShrink:0, marginTop:'2px' }}>&#8594;</span>
                            <span style={{ fontFamily:F.sans, fontSize:'12px', color:'rgba(250,248,243,0.65)', lineHeight:1.5 }} dangerouslySetInnerHTML={{__html:e}}/>
                          </div>
                        ))}
                        <div style={{ marginTop:'16px', paddingTop:'16px', borderTop:`1px solid rgba(255,255,255,0.08)` }}>
                          <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(255,255,255,0.25)', marginBottom:'6px' }}>DFI Partners &amp; Capital Sources</div>
                          <p style={{ fontFamily:F.sans, fontSize:'11px', color:'rgba(184,217,53,0.6)', lineHeight:1.6 }} dangerouslySetInnerHTML={{__html:p.dfi}}/>
                        </div>
                        <div style={{ marginTop:'14px', paddingTop:'14px', borderTop:`1px solid rgba(255,255,255,0.08)` }}>
                          <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(255,255,255,0.25)', marginBottom:'8px' }}>Venture Pipeline · {p.portfolio}</div>
                          <div style={{ display:'flex', flexWrap:'wrap', gap:'6px' }}>
                            {p.ventures.map((v, j) => (
                              <span key={j} style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:600, color:C.lime, border:`1px solid rgba(184,217,53,0.2)`, padding:'3px 8px', letterSpacing:'0.3px' }}>{v}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: swipe carousel */}
          <MobPlaysSwipe plays={plays}/>
        </div>
      </div>
    </div>
  );
};

/* ── VENTURE PIPELINE ── */
const VenturePipeline = () => {
  const [filter, setFilter] = useState('All');
  const ventures = [
    { id:'V-01', name:'Kejetia Digital Platform', sector:'Infrastructure', stage:'Active', irr:'22–28%', ticket:'$1.2M', leverage:'1:18', status:'green' },
    { id:'V-02', name:'District Market WASH', sector:'Infrastructure', stage:'Pipeline', irr:'18–24%', ticket:'$800K', leverage:'1:14', status:'green' },
    { id:'V-03', name:'Market Vendor Payments', sector:'Infrastructure', stage:'Pipeline', irr:'25–35%', ticket:'$600K', leverage:'1:12', status:'green' },
    { id:'V-04', name:'Oil Palm Aggregation Hubs', sector:'Agriculture', stage:'Active', irr:'19–26%', ticket:'$2.1M', leverage:'1:6', status:'green' },
    { id:'V-05', name:'Cold Chain Corridor North', sector:'Agriculture', stage:'Pipeline', irr:'21–28%', ticket:'$1.8M', leverage:'1:5', status:'green' },
    { id:'V-06', name:'Smallholder Digital Hub', sector:'Agriculture', stage:'Pipeline', irr:'20–27%', ticket:'$900K', leverage:'1:4', status:'amber' },
    { id:'V-07', name:'Solar Mini-Grid Network', sector:'Energy', stage:'Active', irr:'17–23%', ticket:'$2.4M', leverage:'1:9', status:'green' },
    { id:'V-08', name:'Market Solar Programme', sector:'Energy', stage:'Pipeline', irr:'15–21%', ticket:'$1.1M', leverage:'1:7', status:'green' },
    { id:'V-09', name:'Garment Supply Chain', sector:'Manufacturing', stage:'Pipeline', irr:'24–32%', ticket:'$3.2M', leverage:'Policy', status:'amber' },
    { id:'V-10', name:'Agro-Processing Park', sector:'Manufacturing', stage:'Pipeline', irr:'20–28%', ticket:'$2.8M', leverage:'Policy', status:'amber' },
    { id:'V-11', name:'Cold Chain Logistics', sector:'Transport', stage:'Active', irr:'22–30%', ticket:'$1.6M', leverage:'1:22', status:'green' },
    { id:'V-12', name:'Tamale Export Hub', sector:'Transport', stage:'Pipeline', irr:'18–26%', ticket:'$1.4M', leverage:'1:18', status:'green' },
    { id:'V-13', name:'WDB Digital Credit', sector:'Finance', stage:'Pipeline', irr:'16–22%', ticket:'$700K', leverage:'1:4', status:'green' },
    { id:'V-14', name:'SME Trade Finance', sector:'Finance', stage:'Pipeline', irr:'18–24%', ticket:'$1.0M', leverage:'1:3', status:'amber' },
    { id:'V-15', name:'NHIS Digital Claims', sector:'Health', stage:'Pipeline', irr:'20–28%', ticket:'$900K', leverage:'1:14', status:'green' },
    { id:'V-16', name:'CHPS Tele-Health', sector:'Health', stage:'Pipeline', irr:'17–24%', ticket:'$600K', leverage:'1:12', status:'green' },
    { id:'V-17', name:'Film Fund Co-Investment', sector:'Creative', stage:'Pipeline', irr:'28–40%', ticket:'$500K', leverage:'1:2', status:'amber' },
    { id:'V-18', name:'Skills Training Centres', sector:'Education', stage:'Pipeline', irr:'15–22%', ticket:'$1.3M', leverage:'1:11', status:'green' },
  ];
  const sectors = ['All', ...Array.from(new Set(ventures.map(v => v.sector)))];
  const shown = filter === 'All' ? ventures : ventures.filter(v => v.sector === filter);
  const statusColor = s => s === 'green' ? C.positive : s === 'amber' ? C.amber : C.red;

  return (
    <div className="pad-section" style={{ background:C.paperDark, padding:'56px 64px', borderBottom:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:'900px', margin:'0 auto' }}>
        <div style={{ borderTop:`6px solid ${C.ink}`, borderBottom:`2px solid ${C.lime}`, paddingBottom:'3px', marginBottom:'20px' }}/>
        <div style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:C.muted, marginBottom:'8px' }}>Venture Pipeline · Members Access</div>
        <h2 style={{ fontFamily:F.display, fontSize:'clamp(20px,3vw,32px)', fontWeight:700, color:C.ink, lineHeight:1.2, marginBottom:'8px' }}>174 ventures assessed. 18 priority co-investment opportunities.</h2>
        <p style={{ fontFamily:F.body, fontSize:'14px', fontStyle:'italic', color:C.muted, marginBottom:'24px', lineHeight:1.7 }}>Ticket sizes, IRR targets, and stage indicators. Full venture memos available to Members on request.</p>
        <div style={{ display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'24px' }}>
          {sectors.map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', padding:'6px 14px', border:`1px solid ${filter===s ? C.forest : C.border}`, background: filter===s ? C.forest : 'transparent', color: filter===s ? C.lime : C.muted, cursor:'pointer', transition:'all 0.15s' }}>{s}</button>
          ))}
        </div>
        {/* Desktop table */}
        <div className="sector-matrix" style={{ borderTop:`1px solid ${C.border}` }}>
          <div style={{ display:'grid', gridTemplateColumns:'52px 1fr 90px 70px 80px 70px 50px', padding:'7px 0', borderBottom:`2px solid ${C.ink}` }}>
            {['ID','Venture','Sector','Stage','IRR Target','Ticket','Status'].map((h,i) => (
              <div key={i} style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.muted, paddingRight:'8px' }}>{h}</div>
            ))}
          </div>
          {shown.map((v, i) => (
            <div key={i} style={{ display:'grid', gridTemplateColumns:'52px 1fr 90px 70px 80px 70px 50px', padding:'10px 0', borderBottom:`1px solid ${C.border}`, alignItems:'center' }}>
              <div style={{ fontFamily:F.mono, fontSize:'10px', color:C.faint }}>{v.id}</div>
              <div style={{ fontFamily:F.sans, fontSize:'12px', fontWeight:700, color:C.ink, paddingRight:'8px' }}>{v.name}</div>
              <div style={{ fontFamily:F.sans, fontSize:'10px', color:C.muted, paddingRight:'8px' }}>{v.sector}</div>
              <div style={{ paddingRight:'8px' }}>
                <span style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, color: v.stage==='Active' ? C.positive : C.forest, background: v.stage==='Active' ? 'rgba(26,107,47,0.1)' : 'rgba(27,77,62,0.08)', padding:'2px 6px' }}>{v.stage}</span>
              </div>
              <div style={{ fontFamily:F.mono, fontSize:'11px', fontWeight:700, color:C.forest, paddingRight:'8px' }}>{v.irr}</div>
              <div style={{ fontFamily:F.mono, fontSize:'11px', color:C.ink, paddingRight:'8px' }}>{v.ticket}</div>
              <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:statusColor(v.status) }}/>
            </div>
          ))}
        </div>
        {/* Mobile: swipe carousel */}
        <div className="venture-swipe sector-cards" style={{ gap:'8px', marginTop:'4px', display:'none' }}>
          <div className="swipe-row" style={{ padding:'0 0 4px' }}
            onScroll={e => {
              const row = e.currentTarget;
              const w = 220 + 12;
              const i = Math.round(row.scrollLeft / w);
              row.parentElement.querySelectorAll('.scroll-dot').forEach((d,j)=>{
                d.className='scroll-dot '+(j===i?'active':'inactive');
                d.style.width=j===i?'24px':'8px';
                d.style.background=j===i?C.lime:C.border;
              });
            }}>
            {shown.map((v, i) => (
              <div key={i} className="swipe-card" style={{ width:'220px' }}>
                <div style={{ background:C.paperDark, border:`1px solid ${C.border}`, padding:'14px', height:'100%' }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'8px' }}>
                    <span style={{ fontFamily:F.mono, fontSize:'9px', color:C.faint }}>{v.id} · {v.sector}</span>
                    <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:statusColor(v.status) }}/>
                  </div>
                  <div style={{ fontFamily:F.sans, fontSize:'12px', fontWeight:700, color:C.ink, marginBottom:'10px', lineHeight:1.3 }}>{v.name}</div>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'6px' }}>
                    <div><div style={{ fontFamily:F.sans, fontSize:'9px', color:C.muted }}>IRR</div><div style={{ fontFamily:F.mono, fontSize:'12px', fontWeight:700, color:C.forest }}>{v.irr}</div></div>
                    <div style={{ textAlign:'right' }}><div style={{ fontFamily:F.sans, fontSize:'9px', color:C.muted }}>Ticket</div><div style={{ fontFamily:F.mono, fontSize:'12px', fontWeight:700, color:C.ink }}>{v.ticket}</div></div>
                  </div>
                  <span style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, color: v.stage==='Active' ? C.positive : C.forest, background: v.stage==='Active' ? 'rgba(26,107,47,0.1)' : 'rgba(27,77,62,0.08)', padding:'2px 6px' }}>{v.stage}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="scroll-dots" style={{ display:'none' }}>
            {shown.map((_, i) => (
              <div key={i} className={`scroll-dot ${i===0?'active':'inactive'}`} style={{ background: i===0 ? C.lime : C.border, width: i===0 ? '24px' : '8px' }}/>
            ))}
          </div>
        </div>
        <div style={{ display:'flex', gap:'20px', alignItems:'center', marginTop:'20px', paddingTop:'16px', borderTop:`1px solid ${C.border}` }}>
          <div style={{ display:'flex', gap:'12px' }}>
            {[['Active', C.positive], ['Pipeline', C.forest], ['Amber risk', C.amber]].map(([l,c]) => (
              <div key={l} style={{ display:'flex', alignItems:'center', gap:'6px' }}>
                <div style={{ width:'7px', height:'7px', borderRadius:'50%', background:c }}/>
                <span style={{ fontFamily:F.sans, fontSize:'10px', color:C.muted }}>{l}</span>
              </div>
            ))}
          </div>
          <a href="#consulting" style={{ marginLeft:'auto', fontFamily:F.sans, fontSize:'11px', fontWeight:700, color:C.forest, textDecoration:'none' }}>Request full venture memos &#8594;</a>
        </div>
      </div>
    </div>
  );
};

/* ── SECTOR DEEP DIVES ── */
const SectorDeepDives = () => {
  const [active, setActive] = useState(0);
  const sectors = [
    {
      num:'01', name:'Infrastructure & Basic Services', budget:'GH&#8373;47.2B+', lever:'1:15+', pillar:'Build24', stars:5,
      allocations:[
        { item:'Model Markets DACF Mandate', amount:'GH&#8373;2.2B+', note:'Mandatory 25% across 260 districts — locked in formula' },
        { item:'Road Construction & Maintenance', amount:'GH&#8373;14.8B', note:'GHA, DUR, DFR combined envelope' },
        { item:'Water & Sanitation (WASH)', amount:'GH&#8373;8.4B', note:'GWCL + CWSA · 400+ underserved community targets' },
        { item:'Public Buildings & Facilities', amount:'GH&#8373;12.6B', note:'GPHA, GEA, NCA infrastructure programmes' },
        { item:'Urban Development Programmes', amount:'GH&#8373;9.2B', note:'Accra Metropolitan, secondary city upgrades' },
      ],
      bridgeAngle:'BRIDGE enters via Kejetia replication and DACF technical partnership — not competing for construction contracts but providing the digital layer, WASH solutions, and market management systems on top of government-funded physical infrastructure.',
      keyRisk:'DACF disbursement delays historically run 3–6 months behind calendar. BRIDGE structures ventures to activate on disbursement trigger, not on fiscal year schedule.',
    },
    {
      num:'06', name:'Agriculture & Value Chains', budget:'GH&#8373;8.4B+', lever:'1:5.2', pillar:'Grow24', stars:5,
      allocations:[
        { item:'Oil Palm Finance Window', amount:'US$500M', note:'5-yr moratorium · 70% project financing · National Policy 2026–2032' },
        { item:'Irrigation Development', amount:'GH&#8373;1.2B', note:'GIDA expansion · 10 new irrigation schemes confirmed' },
        { item:'Enclave Roads Programme', amount:'GH&#8373;828M', note:'Farm-to-market connectivity across 8 agricultural zones' },
        { item:'Buffer Stock Company', amount:'GH&#8373;200M', note:'Warehouse receipts · price stabilisation · aggregation support' },
        { item:'Planting for Food & Jobs Phase 2', amount:'GH&#8373;640M', note:'Input support + extension services for 1M+ smallholders' },
      ],
      bridgeAngle:'BRIDGE operates as the aggregation and processing layer — not competing with smallholders but connecting them. Oil Palm Window co-financing, cold chain infrastructure, and digital platforms that government-funded farms need to reach processors.',
      keyRisk:'Commodity price and FX exposure on USD-denominated Oil Palm Window. BRIDGE mitigates via GHS-denominated processing contracts with fixed offtake from government entities.',
    },
    {
      num:'10', name:'Energy & Renewable Resources', budget:'GH&#8373;21.0B+', lever:'1:8+', pillar:'Grow24', stars:5,
      allocations:[
        { item:'VRA & Generation Expansion', amount:'GH&#8373;7.8B', note:'Akosombo upgrade + new thermal standby capacity' },
        { item:'Rural Electrification Authority', amount:'GH&#8373;4.2B', note:'9,000+ communities · last-mile grid extensions confirmed' },
        { item:'ECG Distribution Upgrades', amount:'GH&#8373;3.6B', note:'Loss reduction · smart meter programme · 600K+ customers' },
        { item:'Renewable Energy Transition Fund', amount:'GH&#8373;2.4B', note:'Fit-for-purpose solar + wind policy environment' },
        { item:'Energy Sector Levy Allocations', amount:'GH&#8373;3.0B', note:'ESLA · systematic sector debt clearance underway' },
      ],
      bridgeAngle:'BRIDGE targets the 9,000+ communities confirmed for REA grid extension but in the 5+ year queue — mini-grid and solar home systems are economically superior in this window. Processing facilities and markets receive BRIDGE-funded solar during the grid gap.',
      keyRisk:'REA accelerates faster than projected, undermining mini-grid economics. BRIDGE monitors REA completion certificates per district to stage deployments optimally.',
    },
    {
      num:'12', name:'Transportation & Logistics', budget:'GH&#8373;30B+', lever:'1:20+', pillar:'Connect24', stars:5,
      allocations:[
        { item:'Road Infrastructure (MRH)', amount:'GH&#8373;14.2B', note:'4,800km road construction + maintenance commitments' },
        { item:'Yapei Inland Port', amount:'GH&#8373;4.8B', note:'Northern corridor logistics hub · 2027 operational target' },
        { item:'Tamale Air Cargo Hub', amount:'GH&#8373;2.1B', note:'Export-focused · cold chain + fresh produce priority' },
        { item:'Volo-Battor Agro-Industrial Park', amount:'GH&#8373;3.6B', note:'South-East agro-processing + export cluster' },
        { item:'Railway Rehabilitation', amount:'GH&#8373;5.3B', note:'Western Railway + Eastern Corridor rehabilitation' },
      ],
      bridgeAngle:'BRIDGE does not build ports or railways. BRIDGE positions logistics services, cold chain, and export facilitation ventures at the nodes these government investments create. The government builds the backbone; BRIDGE operates the last-mile and value-added layer.',
      keyRisk:'Major infrastructure completion delays are endemic. BRIDGE ventures are structured as modular — viable from day one in existing markets, scaling as corridor infrastructure completes.',
    },
    {
      num:'05', name:'Education & Skills', budget:'GH&#8373;47.5B+', lever:'1:10+', pillar:'Aspire24', stars:4,
      allocations:[
        { item:'GETFund Infrastructure', amount:'GH&#8373;28.4B', note:'Schools, TVET facilities, university expansion' },
        { item:'Free SHS Programme', amount:'GH&#8373;8.2B', note:'Continuation + quality improvement mandate' },
        { item:'National Apprenticeship Programme', amount:'GH&#8373;1.8B', note:'50,000 trade apprenticeships · NVTI-certified' },
        { item:'Coders Programme Expansion', amount:'GH&#8373;640M', note:'100,000 youth · digital skills pipeline' },
        { item:'Ghana Scholarship Secretariat', amount:'GH&#8373;420M', note:'Diaspora-eligible scholarship pathways' },
      ],
      bridgeAngle:'BRIDGE targets the TVET and skills pipeline — training centres co-located with manufacturing ventures, digital skills programmes feeding tech ventures, and apprenticeship placement into portfolio companies.',
      keyRisk:'GETFund disbursement is historically the most delayed education funding stream. BRIDGE structures ventures to operate on fee income from the start, with GETFund as expansion capital rather than operational dependency.',
    },
  ];
  const s = sectors[active];

  return (
    <div className="pad-section" style={{ background:C.paper, padding:'56px 64px', borderBottom:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:'900px', margin:'0 auto' }}>
        <div style={{ borderTop:`6px solid ${C.ink}`, borderBottom:`2px solid ${C.lime}`, paddingBottom:'3px', marginBottom:'20px' }}/>
        <div style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:C.muted, marginBottom:'8px' }}>Sector Intelligence · Deep Dives</div>
        <h2 style={{ fontFamily:F.display, fontSize:'clamp(20px,3vw,32px)', fontWeight:700, color:C.ink, lineHeight:1.2, marginBottom:'28px' }}>Budget allocation breakdowns. BRIDGE entry analysis. Risk mapping.</h2>
        <div className="sector-deep-tabs" style={{ display:'flex', gap:'6px', flexWrap:'wrap', marginBottom:'28px' }}>
          {sectors.map((sec, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'1px', padding:'6px 14px', border:`1px solid ${active===i ? C.forest : C.border}`, background: active===i ? C.forest : 'transparent', color: active===i ? C.lime : C.muted, cursor:'pointer', transition:'all 0.15s' }}>
              {sec.num} {sec.name.split(' ')[0]}
            </button>
          ))}
        </div>
        <div style={{ background:C.paperDark, border:`1px solid ${C.border}` }}>
          <div style={{ background:C.forest, padding:'20px 24px', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:C.lime, marginBottom:'6px' }}>{s.pillar} · Sector {s.num}</div>
              <div style={{ fontFamily:F.display, fontSize:'clamp(16px,2.5vw,22px)', fontWeight:700, color:C.paper }}>{s.name}</div>
            </div>
            <div style={{ textAlign:'right', flexShrink:0 }}>
              <div style={{ fontFamily:F.mono, fontSize:'18px', fontWeight:700, color:C.lime }} dangerouslySetInnerHTML={{__html:s.budget}}/>
              <div style={{ fontFamily:F.sans, fontSize:'10px', color:'rgba(255,255,255,0.4)' }}>Leverage {s.lever}</div>
            </div>
          </div>
          <div style={{ padding:'24px' }}>
            <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.muted, marginBottom:'12px' }}>2026 Budget Allocations — Line Item Breakdown</div>
            {s.allocations.map((a, i) => (
              <div key={i} style={{ display:'flex', gap:'16px', alignItems:'flex-start', padding:'10px 0', borderBottom: i < s.allocations.length-1 ? `1px solid ${C.border}` : 'none' }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:F.sans, fontSize:'12px', fontWeight:700, color:C.ink, marginBottom:'2px' }}>{a.item}</div>
                  <div style={{ fontFamily:F.body, fontSize:'11px', fontStyle:'italic', color:C.muted }}>{a.note}</div>
                </div>
                <div style={{ fontFamily:F.mono, fontSize:'12px', fontWeight:700, color:C.forest, flexShrink:0 }} dangerouslySetInnerHTML={{__html:a.amount}}/>
              </div>
            ))}
            <div className="two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginTop:'20px', paddingTop:'20px', borderTop:`1px solid ${C.border}` }}>
              <div>
                <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.muted, marginBottom:'8px' }}>BRIDGE Entry Angle</div>
                <p style={{ fontFamily:F.body, fontSize:'12px', lineHeight:1.7, color:C.ink }}>{s.bridgeAngle}</p>
              </div>
              <div style={{ background:'rgba(168,32,13,0.04)', border:`1px solid rgba(168,32,13,0.12)`, padding:'14px 16px' }}>
                <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.red, marginBottom:'8px' }}>Key Risk &amp; Mitigation</div>
                <p style={{ fontFamily:F.body, fontSize:'12px', lineHeight:1.7, color:C.ink, fontStyle:'italic' }}>{s.keyRisk}</p>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop:'16px', display:'flex', justifyContent:'flex-end' }}>
          <a href="#consulting" style={{ fontFamily:F.sans, fontSize:'11px', fontWeight:700, color:C.forest, textDecoration:'none' }}>Request full sector intelligence brief &#8594;</a>
        </div>
      </div>
    </div>
  );
};

/* ── BLENDED FINANCE ── */
const BlendedFinance = () => (
  <div className="pad-section" style={{ background:C.paperDark, padding:'56px 64px', borderBottom:`1px solid ${C.border}` }}>
    <div style={{ maxWidth:'900px', margin:'0 auto' }}>
      <div style={{ borderTop:`6px solid ${C.ink}`, borderBottom:`2px solid ${C.lime}`, paddingBottom:'3px', marginBottom:'20px' }}/>
      <div style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:C.muted, marginBottom:'8px' }}>Capital Architecture · Full Structure</div>
      <h2 style={{ fontFamily:F.display, fontSize:'clamp(22px,3.5vw,36px)', fontWeight:700, color:C.ink, lineHeight:1.2, marginBottom:'8px' }}>A blended finance window that the budget built.</h2>
      <p style={{ fontFamily:F.body, fontSize:'15px', fontStyle:'italic', color:C.muted, marginBottom:'32px', lineHeight:1.7 }}>Government explicitly stated the goal of keeping investments "off the sovereign balance sheet." That is an invitation — and a structural one.</p>
      <div className="two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', marginBottom:'32px' }}>
        <div>
          <div style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.muted, marginBottom:'16px' }}>Capital Stack</div>
          {[
            { layer:'Diaspora Equity (P&P Notes)', pct:'20–30%', role:'Patient capital; first-loss absorption; 8–12% target return', color:C.lime },
            { layer:'DFI Co-Investment (GIIF/DBG)', pct:'30–40%', role:'Concessional debt; guarantees; technical assistance grants', color:C.forest },
            { layer:'Government Seed Capital', pct:'20–30%', role:'Budget allocations; DACF flows; Oil Palm Window', color:C.teal },
            { layer:'Commercial Senior Debt', pct:'10–20%', role:'Bank debt at project maturity; refinancing premium', color:C.muted },
          ].map((l, i) => (
            <div key={i} style={{ display:'flex', gap:'14px', alignItems:'flex-start', padding:'14px 0', borderBottom: i < 3 ? `1px solid ${C.border}` : 'none' }}>
              <div style={{ width:'4px', alignSelf:'stretch', background:l.color, flexShrink:0 }}/>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'3px' }}>
                  <span style={{ fontFamily:F.sans, fontSize:'12px', fontWeight:700, color:C.ink }}>{l.layer}</span>
                  <span style={{ fontFamily:F.mono, fontSize:'13px', fontWeight:700, color:l.color }}>{l.pct}</span>
                </div>
                <div style={{ fontFamily:F.body, fontSize:'11px', fontStyle:'italic', color:C.muted }}>{l.role}</div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.muted, marginBottom:'16px' }}>DFI Partner Matrix</div>
          {[
            { dfi:'GIIF', type:'Infrastructure & Markets', window:'GH&#8373;2.2B+', terms:'Co-investment; guarantees; TA grants' },
            { dfi:'DBG', type:'Agriculture & SME Finance', window:'GH&#8373;1.8B+', terms:'Concessional debt; 5yr grace period' },
            { dfi:'WDB', type:"Women's & SME Finance", window:'GH&#8373;561M+', terms:'Blended grant+debt; gender mandate' },
            { dfi:'AfDB / IFC', type:'Regional Infrastructure', window:'Discretionary', terms:'Co-investment; technical assistance' },
            { dfi:'EXIM / US DFC', type:'US Diaspora Capital', window:'Discretionary', terms:'OPIC-style guarantees; Prosper Africa' },
          ].map((d, i) => (
            <div key={i} style={{ padding:'10px 0', borderBottom: i < 4 ? `1px solid ${C.border}` : 'none' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'2px' }}>
                <span style={{ fontFamily:F.sans, fontSize:'12px', fontWeight:700, color:C.ink }}>{d.dfi} · {d.type}</span>
                <span style={{ fontFamily:F.mono, fontSize:'10px', fontWeight:700, color:C.forest }} dangerouslySetInnerHTML={{__html:d.window}}/>
              </div>
              <div style={{ fontFamily:F.body, fontSize:'11px', fontStyle:'italic', color:C.muted }}>{d.terms}</div>
            </div>
          ))}
          <div style={{ background:C.forest, padding:'14px 16px', marginTop:'16px' }}>
            <div style={{ fontFamily:F.mono, fontSize:'12px', fontWeight:700, color:C.lime, marginBottom:'2px' }}>$135–259M</div>
            <div style={{ fontFamily:F.sans, fontSize:'10px', color:'rgba(250,248,243,0.5)' }}>Total portfolio · 174–182 ventures · Avg leverage 1:8+</div>
          </div>
        </div>
      </div>
      {/* Deployment timeline */}
      <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:'28px' }}>
        <div style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.muted, marginBottom:'16px' }}>Capital Deployment Timeline</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'2px' }} className="three-col">
          {[
            { phase:'Foundation', years:'2026', capital:'$15–25M', sectors:'Infrastructure · Agriculture · Financial Inclusion', milestone:'Kejetia operational; 5 pilot districts', dot:C.lime },
            { phase:'Scale', years:'2027–2028', capital:'$40–80M', sectors:'Energy · Manufacturing · Transport & Logistics', milestone:'Model Market replication; processing facilities online', dot:C.forest },
            { phase:'Maturity', years:'2029+', capital:'$80–154M', sectors:'Full 12-sector portfolio', milestone:'National scale; exits; replication model active', dot:C.muted },
          ].map((t, i) => (
            <div key={i} style={{ background:C.paper, border:`1px solid ${C.border}`, padding:'18px 16px' }}>
              <div style={{ display:'flex', gap:'10px', alignItems:'center', marginBottom:'10px' }}>
                <div style={{ width:'8px', height:'8px', borderRadius:'50%', background:t.dot, flexShrink:0 }}/>
                <span style={{ fontFamily:F.sans, fontSize:'12px', fontWeight:700, color:C.ink }}>{t.phase}</span>
                <span style={{ fontFamily:F.mono, fontSize:'10px', color:C.muted, marginLeft:'auto' }}>{t.years}</span>
              </div>
              <div style={{ fontFamily:F.mono, fontSize:'16px', fontWeight:700, color:C.forest, marginBottom:'6px' }}>{t.capital}</div>
              <div style={{ fontFamily:F.sans, fontSize:'10px', color:C.muted, marginBottom:'4px' }}>{t.sectors}</div>
              <div style={{ fontFamily:F.body, fontSize:'11px', fontStyle:'italic', color:C.faint }}>{t.milestone}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

/* ── RISK & POLICY TRACKER ── */
const RiskTracker = () => {
  const risks = [
    { cat:'Political', risk:'Policy reversal post-2028 election cycle', prob:'Medium', impact:'High', mitigation:'Structural DACF formula is legislative, not executive. Model Market mandate survives administration change.', status:'amber' },
    { cat:'Macro', risk:'GHS depreciation compressing USD-reporting returns', prob:'High', impact:'Medium', mitigation:'BRIDGE structures GHS-earning ventures. Oil Palm Window in USD provides natural hedge. Diversified currency exposure.', status:'amber' },
    { cat:'Execution', risk:'District Assembly procurement delays (18–24mo average)', prob:'High', impact:'Medium', mitigation:'Framework agreements pre-secured; ventures activate on disbursement trigger, not fiscal calendar.', status:'green' },
    { cat:'DFI', risk:'DBG/GIIF co-investment capital allocated before BRIDGE formalises', prob:'Medium', impact:'High', mitigation:'Partnership MoUs being executed Q1 2026. Capital reservation secured for BRIDGE-identified pipeline.', status:'green' },
    { cat:'Market', risk:'Commodity price volatility (Oil Palm, cocoa, maize)', prob:'Medium', impact:'Medium', mitigation:'Fixed-price offtake agreements with GFC and GNPC downstream entities. Government buffer stock backstop.', status:'green' },
    { cat:'Operational', risk:'Management depth in manufacturing ventures', prob:'Medium', impact:'High', mitigation:'JV structures with existing operators, not greenfield management. BRIDGE deploys capital + oversight, not operations.', status:'amber' },
  ];
  const probColor = p => p === 'High' ? C.red : p === 'Medium' ? C.amber : C.positive;
  return (
    <div style={{ background:C.ink }}>
      <div className="pad-section" style={{ padding:'56px 64px' }}>
        <div style={{ maxWidth:'900px', margin:'0 auto' }}>
          <div style={{ borderTop:`6px solid ${C.lime}`, borderBottom:`2px solid rgba(255,255,255,0.1)`, paddingBottom:'3px', marginBottom:'20px' }}/>
          <div style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'8px' }}>Risk Intelligence · Members Access</div>
          <h2 style={{ fontFamily:F.display, fontSize:'clamp(20px,3vw,32px)', fontWeight:700, color:C.paper, lineHeight:1.2, marginBottom:'8px' }}>Six portfolio risks. Current probability assessments. Active mitigations.</h2>
          <p style={{ fontFamily:F.body, fontSize:'14px', fontStyle:'italic', color:'rgba(255,255,255,0.35)', lineHeight:1.7, marginBottom:'28px' }}>Updated quarterly. Members receive risk alert notifications when probability or impact assessments change.</p>
          <div style={{ display:'flex', flexDirection:'column', gap:'2px' }}>
            {risks.map((r, i) => (
              <div key={i} style={{ background:'rgba(255,255,255,0.03)', border:`1px solid rgba(255,255,255,0.07)`, padding:'18px 20px' }}>
                <div style={{ display:'flex', gap:'16px', alignItems:'flex-start' }}>
                  <div style={{ width:'3px', background: r.status==='amber' ? C.amber : C.positive, alignSelf:'stretch', flexShrink:0 }}/>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', gap:'10px', alignItems:'center', marginBottom:'6px', flexWrap:'wrap' }}>
                      <span style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.lime, opacity:0.6 }}>{r.cat}</span>
                      <span style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, color: probColor(r.prob), border:`1px solid ${probColor(r.prob)}`, padding:'1px 6px', opacity:0.8 }}>Prob: {r.prob}</span>
                      <span style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, color: probColor(r.impact), border:`1px solid ${probColor(r.impact)}`, padding:'1px 6px', opacity:0.8 }}>Impact: {r.impact}</span>
                    </div>
                    <div style={{ fontFamily:F.sans, fontSize:'13px', fontWeight:700, color:C.paper, marginBottom:'6px' }}>{r.risk}</div>
                    <div style={{ fontFamily:F.body, fontSize:'12px', fontStyle:'italic', color:'rgba(250,248,243,0.4)', lineHeight:1.6 }}>{r.mitigation}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── STRATEGIC IMPERATIVES ── */
const Imperatives = () => {
  const [impExp, setImpExp] = useState(false);
  const items = [
    { n:'I', title:'24-Hour Model Markets', sub:'Move immediately', body:'The window for positioning as the technical partner for DACF-funded market construction is now. First movers shape the ecosystem; followers operate within it. 260 districts, GH\u20B52.2B+ in mandatory allocations, and Kejetia as the proven template.' },
    { n:'II', title:'Oil Palm Co-Financing', sub:'Capitalise the window', body:'BRIDGE must position as a qualified intermediary for the US$500M Oil Palm Development Finance Window before capital is allocated. The 5-year moratorium and 70% project financing terms create ideal conditions for patient diaspora capital.' },
    { n:'III', title:'Diaspora Investment Gateway', sub:'Formalise the instrument', body:"The Sankofa Initiative creates formal channels. BRIDGE's Peace & Prosperity Notes must be structured as the investment instrument that converts diaspora attention into committed capital — before enthusiasm fades without a vehicle." },
    { n:'IV', title:'DFI Partnership Acceleration', sub:'Lock in co-investors', body:'WDB, DBG, GIIF, and development finance co-investors are actively seeking private sector partners for budget-aligned programs. BRIDGE must formalise partnership agreements before DFI capital allocations are committed elsewhere.' },
    { n:'V', title:'Demonstrate Relentlessly', sub:'Validation through outcomes', body:'Kejetia must succeed visibly. Processing facilities must create jobs. Model Markets must function. Policy durability beyond any single administration requires demonstrated success that makes BRIDGE indispensable.' },
    { n:'VI', title:'Integrate Cross-Sector', sub:'Compound the return', body:"The Budget's cross-sector architecture validates BRIDGE's integrated model. District Assembly partnerships leveraging multiple DACF allocations — spanning Grow24-Make24-Connect24 simultaneously — will outperform isolated sector investments." },
  ];
  return (
    <div style={{ background:C.forest }}>
      <div className="pad-section" style={{ padding:'56px 64px' }}>
        <div style={{ maxWidth:'900px', margin:'0 auto' }}>
          <div style={{ borderTop:`6px solid ${C.lime}`, borderBottom:`2px solid rgba(255,255,255,0.15)`, paddingBottom:'3px', marginBottom:'20px' }}/>
          <div style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(250,248,243,0.4)', marginBottom:'8px' }}>Strategic Response</div>
          <h2 style={{ fontFamily:F.display, fontSize:'clamp(22px,3.5vw,36px)', fontWeight:700, color:C.paper, lineHeight:1.2, marginBottom:'32px' }}>Six imperatives. One window. Act now.</h2>
          <div className="two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2px' }}>
            {items.map((item, i) => (
              <div key={i} className={i >= 2 ? (impExp ? '' : 'mob-item-hidden') : ''} style={{ background:'rgba(255,255,255,0.04)', border:`1px solid rgba(255,255,255,0.06)`, padding:'20px' }}>
                <div style={{ display:'flex', gap:'14px', alignItems:'flex-start' }}>
                  <div style={{ fontFamily:F.display, fontSize:'28px', fontWeight:700, color:'rgba(184,217,53,0.2)', flexShrink:0, lineHeight:1, width:'32px' }}>{item.n}</div>
                  <div>
                    <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.lime, marginBottom:'4px', opacity:0.7 }}>{item.sub}</div>
                    <div style={{ fontFamily:F.display, fontSize:'15px', fontWeight:700, color:C.paper, marginBottom:'10px' }}>{item.title}</div>
                    <p style={{ fontFamily:F.body, fontSize:'12px', lineHeight:1.7, color:'rgba(250,248,243,0.5)', fontWeight:300 }}>{item.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="mob-show mob-toggle mob-toggle-dark" onClick={() => setImpExp(o => !o)} style={{ marginTop:'4px' }}>
            <span>{impExp ? 'Show less \u2191' : 'View all 6 imperatives \u2193'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── CONSULTING UPSELL ── */
const ConsultingUpsell = () => {
  const [activeTab, setActiveTab] = useState(0);
  const services = [
    {
      tier:'Advisory', price:'Monthly retainer · min. 3 months', badge:'Best Fit for Investors',
      headline:'Strategic Advisory',
      sub:'For investors and operators who need BRIDGE thinking applied to their specific situation, portfolio, or entry strategy.',
      features:['Monthly 1:1 strategy sessions with BRIDGE principals', 'Portfolio allocation review against BRIDGE sector intelligence', 'DFI introduction and co-financing facilitation', 'Ghana regulatory navigation and compliance guidance', 'Quarterly portfolio performance review against budget milestones', 'Priority access to new sector intelligence releases'],
      cta:'Book Advisory Call',
      color:C.forest,
    },
    {
      tier:'Transaction', price:'2–3% success fee on capital deployed', badge:'For Deal-Ready Capital',
      headline:'Transaction Support',
      sub:'For investors structuring specific deal entries into the Ghana market, from origination through close.',
      features:['Deal origination within BRIDGE venture pipeline', 'Due diligence support — financial, operational, regulatory', 'Co-investment structuring and legal framework', 'DFI co-financing application and facilitation', 'GIIF/DBG partnership MoU execution support', 'Ongoing monitoring and board representation'],
      cta:'Discuss a Deal',
      color:C.teal,
    },
    {
      tier:'Institutional', price:'Project scoped · fixed fee', badge:'Bespoke Engagements',
      headline:'Institutional & Government Engagement',
      sub:'For DFIs, foundations, corporates, and government entities seeking a Ghana development partner.',
      features:['Bespoke sector intelligence production — custom briefs', 'Programme design for budget-aligned intervention areas', 'Government partnership development and MoU structuring', 'Diaspora capital mobilisation strategy and execution', 'Monitoring & evaluation framework development', 'Capacity building for Ghana-based partner organisations'],
      cta:'Start a Conversation',
      color:C.ink,
    },
  ];

  return (
    <div id="consulting" className="pad-section" style={{ background:C.paper, padding:'56px 64px', borderBottom:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:'900px', margin:'0 auto' }}>
        <div style={{ borderTop:`6px solid ${C.ink}`, borderBottom:`2px solid ${C.lime}`, paddingBottom:'3px', marginBottom:'20px' }}/>
        <div style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:C.muted, marginBottom:'8px' }}>BRIDGE Advisory Services</div>
        <h2 style={{ fontFamily:F.display, fontSize:'clamp(22px,3.5vw,36px)', fontWeight:700, color:C.ink, lineHeight:1.2, marginBottom:'8px' }}>Intelligence is the starting point. Execution is where we add the most value.</h2>
        <p style={{ fontFamily:F.body, fontSize:'15px', fontStyle:'italic', color:C.muted, marginBottom:'36px', lineHeight:1.7 }}>BRIDGE principals have spent years building the relationships, regulatory knowledge, and deal structures that this brief describes. Members who want to move from intelligence to action engage us directly.</p>

        <div style={{ display:'flex', gap:'6px', marginBottom:'28px', flexWrap:'wrap' }}>
          {services.map((s, i) => (
            <button key={i} onClick={() => setActiveTab(i)} style={{ fontFamily:F.sans, fontSize:'11px', fontWeight:700, letterSpacing:'0.5px', padding:'8px 20px', border:`1.5px solid ${activeTab===i ? C.forest : C.border}`, background: activeTab===i ? C.forest : 'transparent', color: activeTab===i ? C.lime : C.muted, cursor:'pointer', transition:'all 0.15s' }}>{s.tier}</button>
          ))}
        </div>

        {services.map((s, i) => i !== activeTab ? null : (
          <div key={i} style={{ border:`1px solid ${C.border}` }}>
            <div style={{ background:s.color, padding:'24px 28px', display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div>
                <div style={{ display:'flex', gap:'10px', alignItems:'center', marginBottom:'8px' }}>
                  <span style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, color:C.lime, letterSpacing:'2px', textTransform:'uppercase', border:`1px solid rgba(184,217,53,0.4)`, padding:'3px 10px' }}>{s.badge}</span>
                  <span style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, color:'rgba(255,255,255,0.4)', letterSpacing:'1.5px', textTransform:'uppercase' }}>{s.price}</span>
                </div>
                <div style={{ fontFamily:F.display, fontSize:'clamp(18px,2.5vw,26px)', fontWeight:700, color:C.paper, marginBottom:'6px' }}>{s.headline}</div>
                <div style={{ fontFamily:F.body, fontSize:'13px', fontStyle:'italic', color:'rgba(250,248,243,0.55)' }}>{s.sub}</div>
              </div>
            </div>
            <div className="two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0' }}>
              <div style={{ padding:'24px', borderRight:`1px solid ${C.border}` }}>
                <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.muted, marginBottom:'14px' }}>What's Included</div>
                {s.features.map((f, j) => (
                  <div key={j} style={{ display:'flex', gap:'10px', marginBottom:'10px', alignItems:'flex-start' }}>
                    <span style={{ color:C.lime, fontSize:'11px', flexShrink:0, marginTop:'2px' }}>&#8594;</span>
                    <span style={{ fontFamily:F.sans, fontSize:'12px', color:C.ink, lineHeight:1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding:'24px', background:C.paperDark, display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
                <div>
                  <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.muted, marginBottom:'14px' }}>How to Engage</div>
                  <p style={{ fontFamily:F.body, fontSize:'13px', lineHeight:1.7, color:C.ink, marginBottom:'16px' }}>BRIDGE works with a limited number of advisory clients at any time to maintain quality and depth of engagement. Initial conversations are confidential and non-binding.</p>
                  <p style={{ fontFamily:F.body, fontSize:'12px', fontStyle:'italic', color:C.muted, lineHeight:1.6 }}>All engagements begin with a scoping call to confirm fit. BRIDGE does not take engagements that conflict with portfolio company interests or that require compromising member data.</p>
                </div>
                <div style={{ marginTop:'24px' }}>
                  <a href="mailto:advisory@bridgepbc.com" style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'10px', background:C.forest, color:C.lime, padding:'14px 24px', fontFamily:F.sans, fontSize:'12px', fontWeight:800, textDecoration:'none', letterSpacing:'0.5px' }}>
                    <span>{s.cta}</span>
                    <span style={{ fontSize:'14px' }}>&#8594;</span>
                  </a>
                  <div style={{ textAlign:'center', marginTop:'10px' }}>
                    <span style={{ fontFamily:F.sans, fontSize:'10px', color:C.faint }}>advisory@bridgepbc.com · bridgepbc.com/advisory</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Engagement ladder */}
        <div style={{ marginTop:'32px', background:C.ink, padding:'24px 28px' }}>
          <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:C.lime, marginBottom:'16px' }}>The BRIDGE Engagement Ladder</div>
          <div className="ladder-row" style={{ display:'flex', gap:'0', overflowX:'auto' }}>
            {[
              { step:'Free Brief', desc:'Public version · Headlines only', action:'&#8592; Upgrade path', color:'rgba(255,255,255,0.07)' },
              { step:'Members Edition', desc:'Full intelligence · Venture pipeline · Risk tracking', action:'&#8593; You are here · GHS 500/yr', color:'rgba(184,217,53,0.14)' },
              { step:'Advisory', desc:'1:1 strategy · DFI facilitation · Portfolio review', action:'Monthly retainer', color:'rgba(184,217,53,0.2)' },
              { step:'Transaction', desc:'Deal origination · Due diligence · Co-investment', action:'2–3% success fee', color:'rgba(184,217,53,0.28)' },
              { step:'Co-Investor', desc:'Direct portfolio entry · Board representation', action:'By invitation · $10K+', color:'rgba(184,217,53,0.36)' },
            ].map((l, i) => (
              <div key={i} className="ladder-step" style={{ flex:1, minWidth:'120px', padding:'14px 12px', background:l.color, borderRight: i < 4 ? `1px solid rgba(255,255,255,0.06)` : 'none' }}>
                <div style={{ fontFamily:F.sans, fontSize:'11px', fontWeight:700, color:C.paper, marginBottom:'4px' }}>{l.step}</div>
                <div style={{ fontFamily:F.body, fontSize:'10px', fontStyle:'italic', color:'rgba(255,255,255,0.4)', marginBottom:'8px', lineHeight:1.4 }}>{l.desc}</div>
                <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, color:C.lime, letterSpacing:'0.5px' }} dangerouslySetInnerHTML={{__html:l.action}}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── FINAL CTA ── */
const FinalCTA = () => (
  <div className="pad-section" style={{ background:C.ink, padding:'56px 64px', borderBottom:`1px solid rgba(255,255,255,0.06)` }}>
    <div style={{ maxWidth:'900px', margin:'0 auto' }}>
      <div style={{ borderTop:`6px solid ${C.lime}`, paddingTop:'36px' }}>
        <div style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(184,217,53,0.5)', marginBottom:'20px' }}>BRIDGE PBC · Direct Engagement</div>
        <div className="two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'48px' }}>
          <div>
            <h2 style={{ fontFamily:F.display, fontSize:'clamp(22px,4vw,42px)', fontWeight:900, fontStyle:'italic', color:C.paper, lineHeight:1.15, marginBottom:'16px' }}>
              The next step is a conversation.
            </h2>
            <p style={{ fontFamily:F.body, fontSize:'15px', fontStyle:'italic', color:'rgba(250,248,243,0.45)', lineHeight:1.7, marginBottom:'28px' }}>
              The analysis is done. The pipeline is identified. The DFI relationships are in place. BRIDGE is not looking for people to fund ideas — we are looking for partners who are ready to deploy.
            </p>
            <div className="cta-row" style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
              <a href="mailto:advisory@bridgepbc.com" style={{ display:'flex', alignItems:'center', gap:'10px', background:C.lime, color:C.ink, padding:'14px 24px', fontFamily:F.sans, fontSize:'12px', fontWeight:800, textDecoration:'none', justifyContent:'center' }}>
                <span>Schedule Advisory Call</span>
                <span style={{ fontSize:'14px' }}>&#8594;</span>
              </a>
              <a href="#consulting" style={{ display:'flex', alignItems:'center', gap:'10px', background:'rgba(255,255,255,0.06)', border:`1px solid rgba(255,255,255,0.15)`, color:C.paper, padding:'14px 20px', fontFamily:F.sans, fontSize:'12px', fontWeight:700, textDecoration:'none', justifyContent:'center' }}>
                <span>View Advisory Services</span>
              </a>
            </div>
          </div>
          <div>
            <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'rgba(255,255,255,0.25)', marginBottom:'16px' }}>What Comes Next</div>
            {[
              { step:'01', action:'Scoping call', detail:'30 minutes — confirm fit, discuss specific sector focus, outline engagement scope' },
              { step:'02', action:'Intelligence briefing', detail:'BRIDGE principals walk through full sector analysis and venture pipeline relevant to your goals' },
              { step:'03', action:'Engagement proposal', detail:'Tailored proposal with scope, timeline, and fee structure based on your situation' },
              { step:'04', action:'Active engagement', detail:'Advisory, transaction support, or institutional partnership — structured for outcomes' },
            ].map((s, i) => (
              <div key={i} style={{ display:'flex', gap:'16px', padding:'14px 0', borderBottom: i < 3 ? `1px solid rgba(255,255,255,0.06)` : 'none' }}>
                <div style={{ fontFamily:F.mono, fontSize:'18px', fontWeight:700, color:'rgba(184,217,53,0.2)', flexShrink:0, width:'28px', lineHeight:1 }}>{s.step}</div>
                <div>
                  <div style={{ fontFamily:F.sans, fontSize:'12px', fontWeight:700, color:C.paper, marginBottom:'2px' }}>{s.action}</div>
                  <div style={{ fontFamily:F.body, fontSize:'11px', fontStyle:'italic', color:'rgba(250,248,243,0.35)' }}>{s.detail}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop:'16px', paddingTop:'16px', borderTop:`1px solid rgba(255,255,255,0.08)` }}>
              <div style={{ fontFamily:F.sans, fontSize:'10px', color:'rgba(255,255,255,0.2)', marginBottom:'4px' }}>Contact</div>
              <div style={{ fontFamily:F.mono, fontSize:'11px', color:'rgba(184,217,53,0.6)' }}>advisory@bridgepbc.com</div>
              <div style={{ fontFamily:F.mono, fontSize:'11px', color:'rgba(184,217,53,0.4)' }}>bridgepbc.com/advisory</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ── FOOTER ── */
const Footer = () => (
  <div className="pad-footer" style={{ background:C.forest, padding:'16px 64px', borderTop:`3px solid ${C.lime}` }}>
    <div className="footer-inner" style={{ maxWidth:'900px', margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'10px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
        <DocumentLogo height={18} variant="white"/>
        <div style={{ width:'1px', height:'14px', background:'rgba(255,255,255,0.15)' }}/>
        <div style={{ fontFamily:F.sans, fontSize:'10px', color:'rgba(250,248,243,0.35)' }}>2026 Budget Intelligence · Members Edition · BRIDGE PBC · bridgepbc.com</div>
      </div>
      <div className="footer-nav" style={{ display:'flex', gap:'14px' }}>
        {[['Intelligence','https://bridgepbc.com/intelligence'],['Members','https://bridgepbc.com/members'],['Advisory','https://bridgepbc.com/advisory'],['Contact','https://bridgepbc.com/contact']].map(([l,url], i) => (
          <a key={i} href={url} style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:600, color:'rgba(250,248,243,0.35)', textDecoration:'none' }}>{l}</a>
        ))}
      </div>
    </div>
  </div>
);

/* ── MOBILE UTILS ── */
const ReadBar = () => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => { const d = document.documentElement; setPct((d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100 || 0); };
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return <div className="read-bar" style={{ width:`${pct}%` }}/>;
};

const MobNav = ({ active }) => {
  const navRef = useRef(null);
  const sections = [
    ['s-cover','Overview'],['s-exec','Thesis'],['s-plays','Top 5'],
    ['s-ventures','Ventures'],['s-sectors','Deep Dives'],['s-capital','Capital'],
    ['s-risks','Risks'],['s-imperatives','Strategy'],['s-consulting','Advisory'],
  ];
  useEffect(() => {
    const pill = navRef.current?.querySelector('.mob-nav-pill.active');
    pill?.scrollIntoView({ behavior:'smooth', inline:'center', block:'nearest' });
  }, [active]);
  return (
    <div className="mob-nav-strip" ref={navRef}>
      {sections.map(([id, label]) => (
        <button key={id} className={`mob-nav-pill${active===id?' active':''}`}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' })}>
          {label}
        </button>
      ))}
    </div>
  );
};

const FloatCTA = ({ show }) => (
  <div className={`float-cta${show?'':' hidden'}`}>
    <div style={{ flex:1 }}>
      <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, color:'rgba(255,255,255,0.35)', letterSpacing:'1px', textTransform:'uppercase', marginBottom:'1px' }}>Members Edition</div>
      <div style={{ fontFamily:F.sans, fontSize:'11px', fontWeight:700, color:C.paper }}>Engage BRIDGE Advisory</div>
    </div>
    <a href="mailto:advisory@bridgepbc.com" style={{ background:C.lime, color:C.ink, padding:'9px 16px', fontFamily:F.sans, fontSize:'11px', fontWeight:800, textDecoration:'none', flexShrink:0 }}>Contact &#8594;</a>
  </div>
);

export default function BudgetAlignmentMembers() {
  const logoRef = useRef(null);
  const [activeSection, setActiveSection] = useState('s-cover');
  const [showFloat, setShowFloat] = useState(false);

  useEffect(() => {
    const ids = ['s-cover','s-exec','s-plays','s-ventures','s-sectors','s-capital','s-risks','s-imperatives','s-consulting'];
    const fn = () => {
      const y = window.scrollY + 120;
      let cur = ids[0];
      for (const id of ids) { const el = document.getElementById(id); if (el && el.offsetTop <= y) cur = id; }
      setActiveSection(cur);
      setShowFloat(window.scrollY > 300);
    };
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div style={{ minHeight:'100vh', background:C.paper }}>
      <DocumentGlobalStyles extraCss={PAGE_CSS}/>
      <ReadBar/>
      <TopBar logoRef={logoRef}/>
      <div id="s-cover"><Cover logoRef={logoRef}/></div>
      <MobNav active={activeSection}/>
      <div id="s-exec"><ExecBrief/></div>
      <div id="s-plays"><TopPlays/></div>
      <div id="s-ventures"><VenturePipeline/></div>
      <div id="s-sectors"><SectorDeepDives/></div>
      <div id="s-capital"><BlendedFinance/></div>
      <div id="s-risks"><RiskTracker/></div>
      <div id="s-imperatives"><Imperatives/></div>
      <div id="s-consulting"><ConsultingUpsell/></div>
      <FinalCTA/>
      <Footer/>
      <FloatCTA show={showFloat}/>
    </div>
  );
}
