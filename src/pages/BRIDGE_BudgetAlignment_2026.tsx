import { useState, useEffect, useRef } from "react";

import { C, F } from '../theme';
/* ═══════════════════════════════════════════════════════
   BRIDGE DESIGN SYSTEM — DO NOT MODIFY
═══════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════ */
const Gf = () => (<style>{`
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:${C.paper};-webkit-font-smoothing:antialiased;overflow-x:hidden;}
  @media print{.np{display:none!important;}}
  .mob-show{display:none;}
  @media(max-width:900px){
    .pad-section{padding:40px 32px!important;}
    .pad-cover{padding:28px 32px 0!important;}
    .pad-topbar{padding:10px 24px!important;}
    .two-col{grid-template-columns:1fr!important;}
  }
  @media(max-width:600px){
    .mob-hide{display:none!important;}
    .mob-show{display:block!important;}
    .mob-stack{flex-direction:column!important;align-items:flex-start!important;gap:10px!important;}

    /* Section padding */
    .pad-section{padding:32px 18px!important;}
    .pad-cover{padding:20px 18px 0!important;}
    .pad-topbar{padding:9px 16px!important;}
    .pad-footer{padding:16px 18px!important;}
    .pad-byline{padding:8px 18px!important;}

    /* Grids */
    .tc{grid-template-columns:1fr!important;}
    .two-col{grid-template-columns:1fr!important;}
    .two-col-inner{grid-template-columns:1fr!important;}

    /* Cover stats strip — clean 2×2 grid, no orphaned borders */
    .stats-row{flex-wrap:wrap!important;}
    .stats-row>div{flex:0 0 50%!important;border-left:none!important;border-top:1px solid rgba(255,255,255,0.08)!important;}
    .stats-row>div:nth-child(2){border-left:1px solid rgba(255,255,255,0.08)!important;}
    .stats-row>div:nth-child(4){border-left:1px solid rgba(255,255,255,0.08)!important;}

    /* Cover inner header row */
    .cover-hdr{gap:10px!important;}
    .cover-hdr-label{display:none!important;}

    /* Sector matrix/cards */
    .pillar-grid{grid-template-columns:1fr 1fr!important;}
    .sector-matrix{display:none!important;}
    .sector-cards{display:grid!important;grid-template-columns:1fr!important;}

    /* TopPlays expanded panel — reduce 72px left indent */
    .play-detail{padding:16px 16px 16px 16px!important;}

    /* Timeline */
    .timeline-row{flex-direction:column!important;gap:0!important;}
    .tl-connector{display:none!important;}

    /* CTA */
    .cta-row{flex-direction:column!important;}
    .cta-row a{min-width:0!important;width:100%!important;}

    /* Progressive disclosure — items hidden on mobile until expanded */
    .mob-item-hidden{display:none!important;}

    /* Expand/collapse toggle button — only visible on mobile */
    .mob-toggle{display:flex!important;align-items:center;justify-content:center;gap:8px;width:100%;padding:11px 0;border:1px solid ${C.border};background:transparent;cursor:pointer;font-family:${F.sans};font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};margin-top:8px;}
    .mob-toggle-dark{border-color:rgba(255,255,255,0.12)!important;color:rgba(250,248,243,0.35)!important;}

    /* Footer nav */
    .footer-nav{display:none!important;}
    .footer-inner{flex-direction:column!important;align-items:flex-start!important;gap:10px!important;}
  }
  .sector-cards{display:none;}
`}</style>);

/* ═══════════════════════════════════════════════════════
   LOGO SVG
═══════════════════════════════════════════════════════ */
const Logo = ({ height = 24, variant = 'white' }) => {
  const fg = variant === 'white' ? '#FAF8F3' : '#0D1A10';
  const acc = '#B8D935';
  return (
    <svg height={height} viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:'block',flexShrink:0}}>
      <rect x="0" y="4" width="10" height="24" rx="1" fill={acc}/>
      <rect x="13" y="0" width="10" height="32" rx="1" fill={fg} opacity="0.9"/>
      <rect x="26" y="7" width="10" height="18" rx="1" fill={fg} opacity="0.6"/>
      <text x="42" y="22" fontFamily="'DM Sans',sans-serif" fontWeight="800" fontSize="14" fill={fg} letterSpacing="1">BRIDGE</text>
      <text x="42" y="30" fontFamily="'DM Sans',sans-serif" fontWeight="400" fontSize="7" fill={fg} opacity="0.45" letterSpacing="2">PBC</text>
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════
   TOPBAR
═══════════════════════════════════════════════════════ */
const TopBar = ({ logoRef }) => {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const fn = () => { if (!logoRef?.current) return; setPast(logoRef.current.getBoundingClientRect().bottom < 0); };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, [logoRef]);
  return (
    <div className="np pad-topbar" style={{ position:'sticky', top:0, zIndex:100, background:C.paper, borderBottom:`1px solid ${C.border}`, padding:'10px 40px', display:'flex', justifyContent:'space-between', alignItems:'center', boxShadow:'0 1px 8px rgba(0,0,0,0.06)' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
        <div style={{ overflow:'hidden', maxWidth:past?'180px':'0px', opacity:past?1:0, transition:'max-width 0.35s ease,opacity 0.3s ease', display:'flex', alignItems:'center' }}>
          <Logo height={20} variant="dark"/>
          <div style={{ width:'1px', height:'16px', background:C.border, margin:'0 10px', flexShrink:0 }}/>
        </div>
        <span className="mob-hide" style={{ fontFamily:F.sans, fontSize:'11px', color:C.muted }}>2026 Budget Alignment · Investor Brief · BRIDGE PBC</span>
        <span className="mob-show" style={{ fontFamily:F.sans, fontSize:'11px', fontWeight:700, color:C.forest }}>Budget Brief</span>
      </div>
      <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
        <a href="/membership" className="mob-hide" style={{ fontFamily:F.sans, fontSize:'11px', fontWeight:700, color:C.forest, textDecoration:'none' }}>Members →</a>
        <a href="/login" style={{ background:C.forest, color:C.lime, padding:'7px 14px', fontFamily:F.sans, fontSize:'10px', fontWeight:700, textDecoration:'none', letterSpacing:'0.3px' }}>Apply →</a>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   COVER
═══════════════════════════════════════════════════════ */
const Cover = ({ logoRef }) => (
  <div>
    <div className="pad-cover" style={{ background:C.ink, padding:'28px 64px 0', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', right:'48px', top:'12px', fontFamily:F.display, fontSize:'160px', fontWeight:900, color:'rgba(184,217,53,0.04)', lineHeight:1, userSelect:'none', pointerEvents:'none' }}>₵</div>
      <div ref={logoRef} className="cover-hdr" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'36px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
          <Logo height={26} variant="white"/>
          <div className="cover-hdr-label" style={{ width:'1px', height:'20px', background:'rgba(255,255,255,0.15)' }}/>
          <span className="cover-hdr-label" style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2px', color:'rgba(255,255,255,0.35)', textTransform:'uppercase' }}>Investor Intelligence</span>
        </div>
        <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
          <span style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, color:C.lime, letterSpacing:'2px', textTransform:'uppercase', border:`1px solid rgba(184,217,53,0.35)`, padding:'3px 10px' }}>2026 EDITION</span>
        </div>
      </div>

      {/* Kicker */}
      <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'20px' }}>
        <div style={{ height:'2px', width:'32px', background:C.lime }}/>
        <span style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(255,255,255,0.4)' }}>Budget Alignment Analysis</span>
      </div>

      <h1 style={{ fontFamily:F.display, fontSize:'clamp(34px,5.5vw,72px)', fontWeight:900, color:C.paper, lineHeight:1.0, letterSpacing:'-2px', marginBottom:'10px' }}>
        2026 Budget<br/>
        <span style={{ color:C.lime }}>Alignment.</span>
      </h1>
      <h2 style={{ fontFamily:F.display, fontSize:'clamp(18px,3vw,38px)', fontWeight:400, fontStyle:'italic', color:'rgba(250,248,243,0.55)', lineHeight:1.2, marginBottom:'32px' }}>
        What It Means for Investors.
      </h2>

      {/* Hero stat strip */}
      <div className="stats-row" style={{ display:'flex', gap:'0', borderTop:`1px solid rgba(255,255,255,0.08)`, paddingTop:'24px', marginBottom:'0' }}>
        {[
          { val:'GH₵271.7B', label:'2026 National Budget' },
          { val:'GH₵150B+', label:'Aligned with BRIDGE Sectors' },
          { val:'1:8+', label:'Average Budget Leverage' },
          { val:'174+', label:'Ventures Assessed' },
        ].map((s, i) => (
          <div key={i} style={{ flex:1, padding:'16px 20px', borderLeft: i > 0 ? `1px solid rgba(255,255,255,0.08)` : 'none' }}>
            <div style={{ fontFamily:F.display, fontSize:'clamp(18px,2.5vw,28px)', fontWeight:700, color:C.lime, lineHeight:1, marginBottom:'4px' }}>{s.val}</div>
            <div style={{ fontFamily:F.sans, fontSize:'10px', color:'rgba(255,255,255,0.35)', letterSpacing:'0.5px' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Byline bar */}
    <div className="pad-byline" style={{ background:C.teal, padding:'10px 64px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
      <span style={{ fontFamily:F.sans, fontSize:'10px', color:'rgba(250,248,243,0.5)', letterSpacing:'0.5px' }}>BRIDGE PBC · January 2026 · Version 2.0</span>
      <span className="mob-hide" style={{ fontFamily:F.mono, fontSize:'10px', color:'rgba(250,248,243,0.3)' }}>bridgepbc.com/intelligence</span>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════
   SECTION 1 — THE CONVERGENCE MOMENT
═══════════════════════════════════════════════════════ */
const Convergence = () => (
  <div className="pad-section" style={{ background:C.paper, padding:'56px 64px', borderBottom:`1px solid ${C.border}` }}>
    <div style={{ maxWidth:'900px', margin:'0 auto' }}>
      <div style={{ borderTop:`6px solid ${C.ink}`, borderBottom:`2px solid ${C.lime}`, paddingBottom:'3px', marginBottom:'20px' }}/>
      <div style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:C.muted, marginBottom:'8px' }}>The Convergence Moment</div>
      <h2 style={{ fontFamily:F.display, fontSize:'clamp(22px,3.5vw,36px)', fontWeight:700, color:C.ink, lineHeight:1.2, marginBottom:'28px' }}>For the first time, national economic policy and diaspora-driven development align across every sector.</h2>

      {/* Pull quote */}
      <div style={{ borderLeft:`3px solid ${C.lime}`, paddingLeft:'20px', marginBottom:'28px' }}>
        <p style={{ fontFamily:F.body, fontSize:'17px', fontStyle:'italic', color:C.forest, lineHeight:1.8, fontWeight:300 }}>
          "The Mahama administration's 24-Hour Economy framework, combined with specific budget allocations totalling over GH₵150 billion across BRIDGE-aligned priorities, creates conditions that may not recur."
        </p>
      </div>

      <div className="two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px' }}>
        <div>
          <p style={{ fontFamily:F.body, fontSize:'15px', lineHeight:1.85, color:C.ink, fontWeight:300, marginBottom:'16px' }}>
            The Mahama administration has constructed seven policy pillars — Grow24, Make24, Build24, Connect24, Fund24, Aspire24, and Care24 — that map precisely to BRIDGE's twelve-sector portfolio. This is not coincidence. It is confirmation.
          </p>
          <p style={{ fontFamily:F.body, fontSize:'15px', lineHeight:1.85, color:C.ink, fontWeight:300 }}>
            Government has committed over GH₵110 billion to programs that advance Peace & Prosperity outcomes. The budget explicitly calls for private sector engagement and keeping major investments off the sovereign balance sheet — through GIIF, DBG, and private capital partnerships. BRIDGE is designed to be exactly that vehicle.
          </p>
        </div>
        <div>
          <div style={{ background:C.forest, padding:'24px', marginBottom:'16px' }}>
            <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:C.lime, marginBottom:'14px' }}>The 7 Pillars → 12 Sectors</div>
            {[
              { pillar:'Grow24', sectors:'Agriculture · Energy', note:'Food systems + rural electrification' },
              { pillar:'Make24', sectors:'Manufacturing', note:'Agro-processing + textiles + pharma' },
              { pillar:'Build24', sectors:'Infrastructure · Housing', note:'Markets + WASH + road connectivity' },
              { pillar:'Connect24', sectors:'Transport · Technology', note:'Logistics corridors + digital economy' },
              { pillar:'Fund24', sectors:'Financial Inclusion', note:'WDB · DBG · blended finance' },
              { pillar:'Aspire24', sectors:'Education · Creative', note:'Skills pipeline + creative economy' },
              { pillar:'Care24', sectors:'Health Systems', note:'NHIS reform + MahamaCares' },
            ].map((p, i) => (
              <div key={i} style={{ paddingBottom:'10px', marginBottom:'10px', borderBottom: i < 6 ? `1px solid rgba(255,255,255,0.07)` : 'none', display:'flex', alignItems:'flex-start', gap:'12px' }}>
                <div style={{ fontFamily:F.mono, fontSize:'11px', fontWeight:700, color:C.lime, flexShrink:0, width:'70px' }}>{p.pillar}</div>
                <div>
                  <div style={{ fontFamily:F.sans, fontSize:'11px', fontWeight:700, color:C.paper, marginBottom:'1px' }}>{p.sectors}</div>
                  <div style={{ fontFamily:F.sans, fontSize:'10px', color:'rgba(255,255,255,0.35)' }}>{p.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* This is policy validation box */}
      <div style={{ background:C.paperDark, border:`1px solid ${C.border}`, padding:'20px 24px', marginTop:'28px', display:'flex', gap:'16px', alignItems:'flex-start' }}>
        <div style={{ width:'3px', background:C.lime, alignSelf:'stretch', flexShrink:0 }}/>
        <p style={{ fontFamily:F.body, fontSize:'14px', lineHeight:1.7, color:C.ink }}>
          <strong style={{ fontFamily:F.sans, fontWeight:700 }}>This is policy validation, not policy alignment.</strong> When government commits GH₵2.2 billion to Model Markets, it validates BRIDGE's Kejetia flagship. When it establishes a US$500 million Oil Palm Finance Window, it validates our agricultural processing thesis. When it creates Film and Creative Arts Funds, it validates our creative industry ventures. The government is building the runway. BRIDGE is the aircraft.
        </p>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════
   SECTION 2 — TOP 5 HIGH-CONVICTION PLAYS
═══════════════════════════════════════════════════════ */
const TopPlays = () => {
  const [open, setOpen] = useState(null);
  const plays = [
    {
      num:'01', stars:5, sector:'Infrastructure & Market Systems',
      headline:'24-Hour Model Markets — The Mandatory Mandate',
      budget:'GH₵2.2B+', lever:'1:15+', pillar:'Build24',
      portfolio:'$8–15M across 18 ventures',
      thesis:'The mandatory 25% DACF allocation across 260+ districts creates a government-funded demand pull for exactly what BRIDGE builds. The Kejetia Market digitisation platform becomes not a pilot but the replicable national template. District Assemblies need a technical partner — BRIDGE is positioned to be it.',
      entry:['Technical partner for DACF-funded market construction', 'Kejetia digital platform → 16-region replication', 'WASH investment across 400+ underserved communities'],
    },
    {
      num:'02', stars:5, sector:'Agriculture & Value Chains',
      headline:'Oil Palm Finance Window — US$500M Patient Capital',
      budget:'GH₵8.4B+', lever:'1:5.2', pillar:'Grow24',
      portfolio:'$12–22M across 18 ventures',
      thesis:'The National Policy on Integrated Oil Palm Development (2026–2032) is the single most significant agricultural policy opportunity for BRIDGE. A 5-year moratorium on repayment, 70% project financing, and a US$500M government window create co-financing structures that dramatically de-risk BRIDGE agriculture ventures.',
      entry:['Co-financing partner for Oil Palm Window disbursements', 'Cold chain + aggregation infrastructure alongside enclave roads (GH₵828M)', 'Warehouse receipt financing via Ghana Buffer Stock Company (GH₵200M)'],
    },
    {
      num:'03', stars:5, sector:'Energy & Renewable Resources',
      headline:'Rural Electrification — The Infrastructure Multiplier',
      budget:'GH₵21.0B+', lever:'1:8+', pillar:'Grow24 + Build24',
      portfolio:'$12–22M across 14 ventures',
      thesis:"Energy access is the enabler of everything else in BRIDGE's portfolio. Agricultural processing requires reliable power. Manufacturing requires stable electricity. The government's GH₵21B energy commitment creates the grid backbone; BRIDGE's last-mile solar and mini-grid ventures fill the gaps government cannot reach efficiently.",
      entry:['Solar mini-grid deployment in underserved agricultural zones', 'Market solar micro-grids across 50 markets', 'Renewable energy integration for processing facilities'],
    },
    {
      num:'04', stars:5, sector:'Manufacturing & Light Industry',
      headline:'Make24 — The Import Substitution Moment',
      budget:'Policy + GIIF', lever:'Policy-backed', pillar:'Make24',
      portfolio:'$15–30M across 14 ventures',
      thesis:"Ghana imports over $6 billion annually in goods it has the raw materials and labour to produce domestically. Make24's agro-industrial parks, scrap metal and raw rubber export restrictions, and three-shift garment factory commitments create protected market conditions for import substitution. BRIDGE positions in supply chains, not competition.",
      entry:['Supply chain integration with 3 new garment factories (27,000 jobs)', 'Agro-processing facility development alongside government parks', 'Ghana Free Zones incentives — 100% duty exemption, 10-year tax holiday'],
    },
    {
      num:'05', stars:5, sector:'Transportation & Logistics',
      headline:'Connect24 — The Corridor Infrastructure Play',
      budget:'GH₵30B+', lever:'1:20+', pillar:'Connect24',
      portfolio:'$10–22M across 14 ventures',
      thesis:"GH₵30 billion in Connect24 infrastructure — Yapei Inland Port, Tamale Air Cargo Hub, Volo-Battor Agro-Industrial Park — creates logistics corridors that make BRIDGE's cold chain, aggregation centre, and export development ventures viable at scale. Every dollar BRIDGE invests in logistics infrastructure sits on a GH₵20+ government backbone.",
      entry:['Cold chain network positioned at new logistics nodes', 'Export development programme via Tamale Air Cargo Hub', 'Last-mile distribution serving government-built corridor infrastructure'],
    },
  ];

  return (
    <div style={{ background:C.ink, borderBottom:`1px solid rgba(255,255,255,0.06)` }}>
      <div className="pad-section" style={{ padding:'56px 64px' }}>
        <div style={{ maxWidth:'900px', margin:'0 auto' }}>
          <div style={{ borderTop:`6px solid ${C.lime}`, borderBottom:`2px solid rgba(255,255,255,0.1)`, paddingBottom:'3px', marginBottom:'20px' }}/>
          <div style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'8px' }}>Highest-Conviction Positions</div>
          <h2 style={{ fontFamily:F.display, fontSize:'clamp(22px,3.5vw,36px)', fontWeight:700, color:C.paper, lineHeight:1.2, marginBottom:'32px' }}>Five plays where government capital creates investor advantage.</h2>

          <div style={{ display:'flex', flexDirection:'column', gap:'2px' }}>
            {plays.map((p, i) => (
              <div key={i}>
                <div
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{ background: open === i ? 'rgba(184,217,53,0.06)' : 'rgba(255,255,255,0.03)', border:`1px solid ${open===i ? 'rgba(184,217,53,0.2)' : 'rgba(255,255,255,0.07)'}`, padding:'18px 20px', cursor:'pointer', display:'flex', alignItems:'center', gap:'16px', transition:'all 0.2s ease' }}
                >
                  <div style={{ fontFamily:F.mono, fontSize:'22px', fontWeight:700, color: open===i ? C.lime : 'rgba(255,255,255,0.15)', flexShrink:0, width:'36px' }}>{p.num}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.lime, marginBottom:'4px', opacity:0.7 }}>{p.sector} · {p.pillar}</div>
                    <div style={{ fontFamily:F.display, fontSize:'clamp(14px,2vw,18px)', fontWeight:700, color:C.paper, lineHeight:1.2 }}>{p.headline}</div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'16px', flexShrink:0 }}>
                    <div className="mob-hide" style={{ textAlign:'right' }}>
                      <div style={{ fontFamily:F.mono, fontSize:'13px', fontWeight:700, color:C.lime }}>{p.budget}</div>
                      <div style={{ fontFamily:F.sans, fontSize:'9px', color:'rgba(255,255,255,0.3)' }}>Leverage {p.lever}</div>
                    </div>
                    <div style={{ color: open===i ? C.lime : 'rgba(255,255,255,0.3)', fontFamily:F.sans, fontSize:'16px', transition:'transform 0.2s', transform: open===i ? 'rotate(180deg)' : 'none' }}>↓</div>
                  </div>
                </div>
                {open === i && (
                  <div className="play-detail" style={{ background:'rgba(184,217,53,0.04)', border:`1px solid rgba(184,217,53,0.12)`, borderTop:'none', padding:'24px 20px 24px 72px' }}>
                    <div className="two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'32px', marginBottom:'20px' }}>
                      <div>
                        <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'10px' }}>The Thesis</div>
                        <p style={{ fontFamily:F.body, fontSize:'13px', lineHeight:1.75, color:'rgba(250,248,243,0.65)', fontWeight:300 }}>{p.thesis}</p>
                      </div>
                      <div>
                        <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'10px' }}>Entry Points</div>
                        {p.entry.map((e, j) => (
                          <div key={j} style={{ display:'flex', gap:'10px', marginBottom:'8px', alignItems:'flex-start' }}>
                            <span style={{ color:C.lime, fontSize:'11px', flexShrink:0, marginTop:'2px' }}>→</span>
                            <span style={{ fontFamily:F.sans, fontSize:'12px', color:'rgba(250,248,243,0.65)', lineHeight:1.5 }}>{e}</span>
                          </div>
                        ))}
                        <div style={{ marginTop:'14px', paddingTop:'14px', borderTop:`1px solid rgba(255,255,255,0.08)` }}>
                          <div style={{ fontFamily:F.sans, fontSize:'10px', color:'rgba(255,255,255,0.25)', marginBottom:'2px' }}>BRIDGE Portfolio</div>
                          <div style={{ fontFamily:F.mono, fontSize:'11px', color:C.lime }}>{p.portfolio}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   SECTION 3 — BLENDED FINANCE WINDOW
═══════════════════════════════════════════════════════ */
const BlendedFinance = () => {
  const [tlOpen, setTlOpen] = useState(false);
  return (
  <div className="pad-section" style={{ background:C.paperDark, padding:'56px 64px', borderBottom:`1px solid ${C.border}` }}>
    <div style={{ maxWidth:'900px', margin:'0 auto' }}>
      <div style={{ borderTop:`6px solid ${C.ink}`, borderBottom:`2px solid ${C.lime}`, paddingBottom:'3px', marginBottom:'20px' }}/>
      <div style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:C.muted, marginBottom:'8px' }}>The Capital Structure</div>
      <h2 style={{ fontFamily:F.display, fontSize:'clamp(22px,3.5vw,36px)', fontWeight:700, color:C.ink, lineHeight:1.2, marginBottom:'8px' }}>A blended finance window that the budget built.</h2>
      <p style={{ fontFamily:F.body, fontSize:'15px', fontStyle:'italic', color:C.muted, marginBottom:'32px', lineHeight:1.7 }}>Government explicitly stated the goal of keeping investments "off the sovereign balance sheet." That is an invitation.</p>

      <div className="two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px', marginBottom:'32px' }}>
        <div>
          {[
            { layer:'Diaspora Equity (P&P Notes)', pct:'20–30%', role:'Patient capital; risk absorption', color:C.lime },
            { layer:'DFI Co-Investment (GIIF/DBG)', pct:'30–40%', role:'Concessional debt; guarantees', color:C.forest },
            { layer:'Government Seed Capital', pct:'20–30%', role:'Budget allocations; DACF flows', color:C.teal },
            { layer:'Commercial Finance', pct:'10–20%', role:'Senior debt at project maturity', color:C.muted },
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
          {/* Timeline label — tap to expand on mobile */}
          <div
            onClick={() => setTlOpen(o => !o)}
            style={{ display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer', marginBottom:'14px' }}
          >
            <div style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.muted }}>Capital Deployment Timeline</div>
            <span className="mob-show" style={{ fontFamily:F.mono, fontSize:'12px', color:C.muted, transition:'transform 0.2s', display:'none', transform: tlOpen ? 'rotate(180deg)' : 'none' }}>↓</span>
          </div>
          {/* Phase rows — mob-item-hidden when tlOpen is false (mobile only via CSS) */}
          {[
            { phase:'Foundation', years:'2026', capital:'$15–25M', sectors:'Infrastructure · Agriculture · Financial Inclusion', milestone:'Kejetia operational; 5 pilot districts' },
            { phase:'Scale', years:'2027–2028', capital:'$40–80M', sectors:'Energy · Manufacturing · Logistics', milestone:'Model Market replication; processing facilities' },
            { phase:'Maturity', years:'2029+', capital:'$80–154M', sectors:'Full 12-sector portfolio', milestone:'National scale; exits; replication model' },
          ].map((t, i) => (
            <div key={i} className={tlOpen ? '' : 'mob-item-hidden'} style={{ display:'flex', gap:'14px', padding:'14px 0', borderBottom: i < 2 ? `1px solid ${C.border}` : 'none' }}>
              <div style={{ flexShrink:0, width:'6px', position:'relative' }}>
                <div style={{ position:'absolute', top:'4px', left:'0', width:'6px', height:'6px', borderRadius:'50%', background: i===0 ? C.lime : i===1 ? C.forest : C.muted }}/>
                {i < 2 && <div style={{ position:'absolute', top:'14px', left:'2px', width:'2px', height:'calc(100% + 4px)', background:C.border }}/>}
              </div>
              <div>
                <div style={{ display:'flex', gap:'8px', alignItems:'baseline', marginBottom:'3px' }}>
                  <span style={{ fontFamily:F.sans, fontSize:'12px', fontWeight:700, color:C.ink }}>{t.phase}</span>
                  <span style={{ fontFamily:F.mono, fontSize:'10px', color:C.muted }}>{t.years}</span>
                  <span style={{ fontFamily:F.mono, fontSize:'12px', fontWeight:700, color:C.forest, marginLeft:'auto' }}>{t.capital}</span>
                </div>
                <div style={{ fontFamily:F.sans, fontSize:'10px', color:C.muted, marginBottom:'2px' }}>{t.sectors}</div>
                <div style={{ fontFamily:F.body, fontSize:'11px', fontStyle:'italic', color:C.faint }}>{t.milestone}</div>
              </div>
            </div>
          ))}
          {/* Total portfolio — always visible */}
          <div style={{ background:C.forest, padding:'14px 16px', marginTop:'16px' }}>
            <div style={{ fontFamily:F.mono, fontSize:'12px', fontWeight:700, color:C.lime, marginBottom:'2px' }}>$135–259M</div>
            <div style={{ fontFamily:F.sans, fontSize:'10px', color:'rgba(250,248,243,0.5)' }}>Total portfolio · 174–182 ventures · Avg leverage 1:8+</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

/* ═══════════════════════════════════════════════════════
   SECTION 4 — FULL SECTOR ALIGNMENT MATRIX
═══════════════════════════════════════════════════════ */
const SectorMatrix = () => {
  const [secExp, setSecExp] = useState(false);
  const sectors = [
    { num:'01', name:'Infrastructure & Basic Services', budget:'GH₵47.2B+', lever:'1:15+', pillar:'Build24', stars:5, note:'Model Markets mandatory DACF mandate' },
    { num:'02', name:'Financial Inclusion', budget:'GH₵561M+', lever:'1:3.5', pillar:'Fund24', stars:4, note:'WDB · DBG · digital credit directive' },
    { num:'03', name:'Health Systems', budget:'GH₵12.1B+', lever:'1:12+', pillar:'Care24', stars:4, note:'NHIS reform · MahamaCares · CHPS expansion' },
    { num:'04', name:'Technology & Innovation', budget:'GH₵100M', lever:'1:1.5', pillar:'Connect24', stars:3, note:'Coders Programme; digital economy policy' },
    { num:'05', name:'Education & Skills', budget:'GH₵47.5B+', lever:'1:10+', pillar:'Aspire24', stars:4, note:'GETFund · Apprenticeship Programme' },
    { num:'06', name:'Agriculture & Value Chains', budget:'GH₵8.4B+', lever:'1:5.2', pillar:'Grow24', stars:5, note:'Oil Palm Window US$500M; Grow24 irrigation' },
    { num:'07', name:'Sports, Entertainment & Creative', budget:'GH₵240M+', lever:'1:2', pillar:'Aspire24', stars:4, note:'Film Fund GH₵20M; Creative Arts Fund GH₵20M' },
    { num:'08', name:'Housing & Real Estate', budget:'GH₵500M+', lever:'1:4', pillar:'Build24', stars:3, note:'District housing programme; employer schemes' },
    { num:'09', name:'Tourism & Hospitality', budget:'Policy', lever:'N/A', pillar:'Aspire24', stars:3, note:'Black Star Experience; Sankofa alignment' },
    { num:'10', name:'Energy & Renewable Resources', budget:'GH₵21.0B+', lever:'1:8+', pillar:'Grow24', stars:5, note:'Rural electrification; VRA + ECG reform' },
    { num:'11', name:'Manufacturing & Light Industry', budget:'Make24 + GIIF', lever:'Policy', pillar:'Make24', stars:5, note:'Agro-industrial parks; textile factories' },
    { num:'12', name:'Transportation & Logistics', budget:'GH₵30B+', lever:'1:20+', pillar:'Connect24', stars:5, note:'Yapei Port; Tamale Hub; enclave roads' },
  ];
  return (
    <div className="pad-section" style={{ background:C.paper, padding:'56px 64px', borderBottom:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:'900px', margin:'0 auto' }}>
        <div style={{ borderTop:`6px solid ${C.ink}`, borderBottom:`2px solid ${C.lime}`, paddingBottom:'3px', marginBottom:'20px' }}/>
        <div style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:C.muted, marginBottom:'8px' }}>Full Portfolio Overview</div>
        <h2 style={{ fontFamily:F.display, fontSize:'clamp(20px,3vw,32px)', fontWeight:700, color:C.ink, lineHeight:1.2, marginBottom:'28px' }}>All 12 sectors. Alignment scores and budget leverage.</h2>

        {/* Desktop table */}
        <div className="sector-matrix" style={{ borderTop:`1px solid ${C.border}` }}>
          <div style={{ display:'grid', gridTemplateColumns:'32px 1fr 100px 80px 80px 1fr', gap:'0', padding:'7px 0', borderBottom:`2px solid ${C.ink}` }}>
            {['#','Sector','Budget','Leverage','Pillar','Note'].map((h, i) => (
              <div key={i} style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.muted, paddingRight:'12px' }}>{h}</div>
            ))}
          </div>
          {sectors.map((s, i) => (
            <div key={i} style={{ display:'grid', gridTemplateColumns:'32px 1fr 100px 80px 80px 1fr', gap:'0', padding:'11px 0', borderBottom:`1px solid ${C.border}`, alignItems:'center' }}>
              <div style={{ fontFamily:F.mono, fontSize:'10px', color:C.faint }}>{s.num}</div>
              <div style={{ fontFamily:F.sans, fontSize:'12px', fontWeight:700, color:C.ink, paddingRight:'12px' }}>{s.name}</div>
              <div style={{ fontFamily:F.mono, fontSize:'11px', color:C.forest, paddingRight:'8px' }}>{s.budget}</div>
              <div style={{ fontFamily:F.mono, fontSize:'11px', fontWeight:700, color: s.lever.includes('20') ? C.positive : s.lever.includes('N/A') || s.lever==='Policy' ? C.muted : C.forest, paddingRight:'8px' }}>{s.lever}</div>
              <div style={{ paddingRight:'8px' }}>
                <span style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, color:C.lime, background:C.ink, padding:'2px 6px', letterSpacing:'0.5px' }}>{s.pillar}</span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                <div style={{ display:'flex', gap:'2px' }}>
                  {[1,2,3,4,5].map(n => <span key={n} style={{ fontSize:'10px', color: n<=s.stars ? C.lime : C.border }}>★</span>)}
                </div>
                <span style={{ fontFamily:F.body, fontSize:'11px', fontStyle:'italic', color:C.muted }}>{s.note}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile cards — first 3 always visible, rest hidden until expanded */}
        <div className="sector-cards" style={{ gap:'8px', marginTop:'4px' }}>
          {sectors.map((s, i) => (
            <div key={i} className={i >= 3 ? (secExp ? '' : 'mob-item-hidden') : ''} style={{ border:`1px solid ${C.border}`, padding:'14px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'6px' }}>
                <div>
                  <div style={{ fontFamily:F.mono, fontSize:'9px', color:C.faint, marginBottom:'2px' }}>{s.num} · {s.pillar}</div>
                  <div style={{ fontFamily:F.sans, fontSize:'12px', fontWeight:700, color:C.ink }}>{s.name}</div>
                </div>
                <div style={{ display:'flex', gap:'2px', flexShrink:0 }}>
                  {[1,2,3,4,5].map(n => <span key={n} style={{ fontSize:'11px', color: n<=s.stars ? C.lime : C.border }}>★</span>)}
                </div>
              </div>
              <div style={{ display:'flex', gap:'16px' }}>
                <div>
                  <div style={{ fontFamily:F.sans, fontSize:'9px', color:C.muted }}>Budget</div>
                  <div style={{ fontFamily:F.mono, fontSize:'11px', fontWeight:700, color:C.forest }}>{s.budget}</div>
                </div>
                <div>
                  <div style={{ fontFamily:F.sans, fontSize:'9px', color:C.muted }}>Leverage</div>
                  <div style={{ fontFamily:F.mono, fontSize:'11px', fontWeight:700, color:C.positive }}>{s.lever}</div>
                </div>
              </div>
            </div>
          ))}
          {/* Toggle — mobile only */}
          <button
            className="mob-show mob-toggle"
            onClick={() => setSecExp(o => !o)}
          >
            <span>{secExp ? 'Show less ↑' : `View remaining ${sectors.length - 3} sectors ↓`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   SECTION 5 — 6 STRATEGIC IMPERATIVES
═══════════════════════════════════════════════════════ */
const Imperatives = () => {
  const [impExp, setImpExp] = useState(false);
  const items = [
    { n:'I', title:'24-Hour Model Markets', sub:'Move immediately', body:'The window for positioning as the technical partner for DACF-funded market construction is now. First movers shape the ecosystem; followers operate within it. 260 districts, GH₵2.2B+ in mandatory allocations, and Kejetia as the proven template.' },
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
              <div key={i} className={i >= 1 ? (impExp ? '' : 'mob-item-hidden') : ''} style={{ background:'rgba(255,255,255,0.04)', border:`1px solid rgba(255,255,255,0.06)`, padding:'20px' }}>
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
          {/* Toggle — mobile only */}
          <button
            className="mob-show mob-toggle mob-toggle-dark"
            onClick={() => setImpExp(o => !o)}
            style={{ marginTop:'4px' }}
          >
            <span>{impExp ? 'Show less ↑' : `View all ${items.length} imperatives ↓`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   SECTION 6 — INVESTOR CTA / GATE
═══════════════════════════════════════════════════════ */
const InvestorCTA = () => (
  <div className="pad-section" style={{ background:C.ink, padding:'56px 64px', borderBottom:`1px solid rgba(255,255,255,0.06)` }}>
    <div style={{ maxWidth:'900px', margin:'0 auto' }}>
      <div style={{ borderTop:`6px solid ${C.lime}`, paddingTop:'32px' }}>
        <div style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(184,217,53,0.5)', marginBottom:'20px' }}>BRIDGE Members · Full Access</div>
        <h2 style={{ fontFamily:F.display, fontSize:'clamp(22px,4vw,46px)', fontWeight:900, fontStyle:'italic', color:C.paper, lineHeight:1.15, marginBottom:'12px' }}>
          The convergence moment is now.
        </h2>
        <p style={{ fontFamily:F.body, fontSize:'16px', fontStyle:'italic', color:'rgba(250,248,243,0.45)', lineHeight:1.7, maxWidth:'620px', marginBottom:'32px' }}>
          Government is ready. Diaspora capital is ready. Infrastructure is ready. BRIDGE has done the analysis. The question is whether you are positioned before the window closes.
        </p>

        {/* What members get */}
        <div style={{ background:'rgba(255,255,255,0.04)', border:`1px solid rgba(255,255,255,0.08)`, padding:'20px 24px', marginBottom:'28px' }}>
          <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:C.lime, marginBottom:'14px' }}>Full Budget Intelligence Package Includes</div>
          <div className="two-col two-col-inner" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px 32px' }}>
            {[
              'Sector-by-sector budget allocation deep dives',
              'Venture-level co-financing opportunity models',
              'GIIF/DBG partnership application frameworks',
              'DACF engagement playbooks per district tier',
              'Oil Palm Window co-financing structuring guide',
              'Quarterly budget implementation tracking',
              'Policy risk monitoring across all 12 sectors',
              'Priority investment entry point rankings',
            ].map((item, i) => (
              <div key={i} style={{ display:'flex', gap:'10px', alignItems:'flex-start' }}>
                <span style={{ color:C.lime, fontSize:'11px', flexShrink:0, marginTop:'2px' }}>→</span>
                <span style={{ fontFamily:F.sans, fontSize:'11px', color:'rgba(250,248,243,0.55)', lineHeight:1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="cta-row" style={{ display:'flex', gap:'10px', flexWrap:'wrap' }}>
          <a href="/login" style={{ display:'flex', alignItems:'center', gap:'10px', background:C.lime, color:C.ink, padding:'14px 28px', fontFamily:F.sans, fontSize:'12px', fontWeight:800, textDecoration:'none', letterSpacing:'0.5px', flex:'1', minWidth:'200px', justifyContent:'center' }}>
            <span>Apply for Members Access</span>
            <span style={{ fontSize:'14px', fontWeight:900 }}>→</span>
          </a>
          <a href="#" style={{ display:'flex', alignItems:'center', gap:'10px', background:'rgba(255,255,255,0.07)', border:`1px solid rgba(255,255,255,0.18)`, color:C.paper, padding:'14px 22px', fontFamily:F.sans, fontSize:'12px', fontWeight:700, textDecoration:'none', flex:'1', minWidth:'180px', justifyContent:'center' }}>
            <span style={{ opacity:0.7 }}>↓</span>
            <span>Download Free Version</span>
          </a>
        </div>

        <div style={{ marginTop:'16px', display:'flex', alignItems:'center', gap:'16px' }}>
          <a href="/resources" style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:600, color:'rgba(250,248,243,0.25)', textDecoration:'none' }}>View all 12 sector briefs →</a>
          <span style={{ fontFamily:F.mono, fontSize:'9px', color:'rgba(250,248,243,0.15)', letterSpacing:'1px' }}>bridgepbc.com/intelligence</span>
        </div>
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════════ */
const Footer = () => (
  <div className="pad-footer" style={{ background:C.forest, padding:'16px 64px', borderTop:`3px solid ${C.lime}` }}>
    <div className="footer-inner" style={{ maxWidth:'900px', margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'10px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
        <Logo height={18} variant="white"/>
        <div style={{ width:'1px', height:'14px', background:'rgba(255,255,255,0.15)' }}/>
        <div style={{ fontFamily:F.sans, fontSize:'10px', color:'rgba(250,248,243,0.35)' }}>2026 Budget Alignment Brief · BRIDGE PBC · bridgepbc.com</div>
      </div>
      <div className="footer-nav" style={{ display:'flex', gap:'14px' }}>
        {[{l:'Intelligence',h:'/intelligence/dashboard'},{l:'Members',h:'/membership'},{l:'Contact',h:'/contact'}].map((item, i) => (
          <a key={i} href={item.h} style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:600, color:'rgba(250,248,243,0.35)', textDecoration:'none' }}>{item.l}</a>
        ))}
      </div>
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════ */
export default function BudgetAlignment() {
  const logoRef = useRef(null);
  return (
    <div style={{ minHeight:'100vh', background:C.paper }}>
      <Gf/>
      <TopBar logoRef={logoRef}/>
      <Cover logoRef={logoRef}/>
      <Convergence/>
      <TopPlays/>
      <BlendedFinance/>
      <SectorMatrix/>
      <Imperatives/>
      <InvestorCTA/>
      <Footer/>
    </div>
  );
}
