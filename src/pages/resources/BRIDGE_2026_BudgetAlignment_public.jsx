import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════
   BRIDGE DESIGN SYSTEM — DO NOT MODIFY
═══════════════════════════════════════════════════════ */
const C = {
  ink:'#0D1A10', paper:'#FAF8F3', paperDark:'#F0EDE4',
  forest:'#1B4D3E', lime:'#B8D935', limeDark:'#8FA825',
  muted:'#5C6B5E', faint:'#9AAA9C', border:'#D8D4C8',
  red:'#A8200D', amber:'#B8730A', positive:'#1A6B2F', white:'#FFFFFF', teal:'#2E5A4D',
};
const F = {
  display:'"Playfair Display","Georgia",serif',
  body:'"Source Serif 4","Georgia",serif',
  sans:'"DM Sans","Helvetica Neue",sans-serif',
  mono:'"DM Mono","Courier New",monospace',
};

/* ═══════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════ */
const Gf = () => (<style>{`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:${C.paper};-webkit-font-smoothing:antialiased;overflow-x:hidden;}
  @media print{.np{display:none!important;}}

  /* ── Desktop defaults ── */
  .mob-show{display:none;}
  .sector-cards{display:none;}
  .read-bar{position:fixed;top:0;left:0;height:2px;background:${C.lime};z-index:200;pointer-events:none;transition:width 0.1s linear;}
  .float-cta{display:none;}
  .mob-nav-strip{display:none;}

  /* ── Swipe carousel (mobile only, inert on desktop) ── */
  .swipe-row{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;scrollbar-width:none;gap:12px;}
  .swipe-row::-webkit-scrollbar{display:none;}
  .swipe-card{scroll-snap-align:start;flex-shrink:0;}

  /* ── 900px tablet ── */
  @media(max-width:900px){
    .pad-section{padding:40px 32px!important;}
    .pad-cover{padding:28px 32px 0!important;}
    .pad-topbar{padding:10px 24px!important;}
    .two-col{grid-template-columns:1fr!important;}
  }

  /* ── 600px mobile ── */
  @media(max-width:600px){
    button{-webkit-tap-highlight-color:transparent;touch-action:manipulation;}
    a{-webkit-tap-highlight-color:transparent;}

    /* Visibility */
    .mob-hide{display:none!important;}
    .mob-show{display:block!important;}
    .mob-stack{flex-direction:column!important;align-items:flex-start!important;gap:10px!important;}

    /* Padding */
    .pad-section{padding:24px 18px!important;}
    .pad-cover{padding:20px 18px 0!important;}
    .pad-topbar{padding:9px 16px!important;}
    .pad-footer{padding:16px 18px calc(16px + env(safe-area-inset-bottom))!important;}
    .pad-byline{padding:8px 18px!important;}

    /* Grids */
    .tc{grid-template-columns:1fr!important;}
    .two-col{grid-template-columns:1fr!important;}
    .two-col-inner{grid-template-columns:1fr!important;}

    /* Stats 2x2 */
    .stats-row{flex-wrap:wrap!important;}
    .stats-row>div{flex:0 0 50%!important;border-left:none!important;border-top:1px solid rgba(255,255,255,0.08)!important;}
    .stats-row>div:nth-child(2){border-left:1px solid rgba(255,255,255,0.08)!important;}
    .stats-row>div:nth-child(4){border-left:1px solid rgba(255,255,255,0.08)!important;}

    /* Cover */
    .cover-hdr{gap:10px!important;}
    .cover-hdr-label{display:none!important;}

    /* Sector table/cards */
    .sector-matrix{display:none!important;}
    .sector-cards{display:grid!important;grid-template-columns:1fr!important;}

    /* Play expanded panel */
    .play-detail{padding:16px!important;}

    /* CTA rows */
    .cta-row{flex-direction:column!important;}
    .cta-row a,.cta-row button{min-width:0!important;width:100%!important;}

    /* Progressive disclosure */
    .mob-item-hidden{display:none!important;}
    .mob-toggle{display:flex!important;align-items:center;justify-content:space-between;gap:8px;width:100%;padding:11px 0;border:none;border-bottom:1px solid ${C.border};background:transparent;cursor:pointer;font-family:${F.sans};font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};margin-top:8px;}
    .mob-toggle-dark{border-color:rgba(255,255,255,0.12)!important;color:rgba(250,248,243,0.35)!important;}

    /* Footer */
    .footer-nav{display:none!important;}
    .footer-inner{flex-direction:column!important;align-items:flex-start!important;gap:10px!important;}

    /* Plays: desktop list hidden, mobile swipe shown */
    .plays-desktop{display:none!important;}
    .plays-mobile{display:block!important;}

    /* Engagement ladder: horizontal scroll */
    .ladder-row{overflow-x:auto!important;flex-wrap:nowrap!important;}
    .ladder-step{min-width:110px!important;flex-shrink:0!important;}

    /* Section nav strip */
    .mob-nav-strip{display:flex!important;overflow-x:auto;scrollbar-width:none;gap:6px;padding:8px 18px;position:sticky;top:44px;z-index:90;background:${C.paperDark};border-bottom:1px solid ${C.border};}
    .mob-nav-strip::-webkit-scrollbar{display:none;}
    .mob-nav-pill{flex-shrink:0;padding:5px 12px;font-family:${F.sans};font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border:1px solid ${C.border};background:transparent;color:${C.muted};cursor:pointer;white-space:nowrap;transition:all 0.15s;}
    .mob-nav-pill.active{background:${C.forest};color:${C.lime};border-color:${C.forest};}

    /* Floating CTA */
    .float-cta{display:flex!important;position:fixed;bottom:0;left:0;right:0;z-index:150;padding:10px 18px calc(10px + env(safe-area-inset-bottom));background:${C.ink};border-top:1px solid rgba(255,255,255,0.1);align-items:center;gap:10px;transition:transform 0.3s ease;}
    .float-cta.hidden{transform:translateY(100%);}

    /* Scroll dots */
    .scroll-dots{display:flex!important;gap:6px;justify-content:center;padding-top:10px;}
    .scroll-dot{height:8px;border-radius:4px;cursor:pointer;transition:all 0.3s ease;}
    .scroll-dot.active{width:24px;background:${C.lime}!important;}
    .scroll-dot.inactive{width:8px;}
  }
`}</style>);

const Logo = ({ height = 24, variant = 'white' }) => {
  const fg = variant === 'white' ? '#FAF8F3' : '#1B4D3E';
  const stroke = variant === 'white' ? '#FAF8F3' : '#1B4D3E';
  const midGreen = variant === 'white' ? '#74914a' : '#74914a';
  return (
    <svg height={height} viewBox="0 0 3258.5 932.3" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:'block',flexShrink:0}}>
      {/* D */}
      <path fill={fg} d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"/>
      {/* B top */}
      <path fill={fg} d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"/>
      {/* B bottom */}
      <path fill={fg} d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"/>
      {/* B bar top (lime) */}
      <rect fill="#B8D935" x="1427.4" y="17.4" width="205.2" height="145"/>
      {/* B bar body */}
      <rect fill={fg} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/>
      {/* G */}
      <path fill={fg} d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"/>
      <rect fill={fg} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/>
      {/* G accents (lime) */}
      <rect fill="#B8D935" x="3083.4" y="339.5" width="175.1" height="257.7"/>
      <rect fill="#B8D935" x="3083.4" y="654.4" width="175.1" height="257.7"/>
      {/* R box */}
      <rect fill="none" stroke={stroke} strokeWidth="80" strokeMiterlimit="10" x="40" y="40" width="843.9" height="852.3" rx="36.6" ry="36.6"/>
      {/* R chevron dark */}
      <polygon fill="#B8D935" stroke="#1b4d3e" strokeMiterlimit="10" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/>
      {/* R mid */}
      <path fill={midGreen} d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z"/>
      {/* R bottom (lime) */}
      <path fill="#B8D935" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"/>
      {/* E I */}
      {/* (E and I are implied by spacing — the original SVG only shows R, B, I, D, G; "E" is part of BRIDGE rendered separately. The provided SVG appears to be an icon + wordmark. We use it as-is for the icon portion.) */}
    </svg>
  );
};

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
        <span className="mob-hide" style={{ fontFamily:F.sans, fontSize:'11px', color:C.muted }}>2026 Budget Alignment · <span style={{ color:C.forest, fontWeight:700 }}>Free Version</span> · BRIDGE PBC</span>
        <span className="mob-show" style={{ fontFamily:F.sans, fontSize:'11px', fontWeight:700, color:C.forest }}>Budget Brief</span>
      </div>
      <div style={{ display:'flex', gap:'10px', alignItems:'center' }}>
        <a href="https://bridgepbc.com/members" className="mob-hide" style={{ fontFamily:F.sans, fontSize:'11px', fontWeight:700, color:C.forest, textDecoration:'none' }}>Members &#8594;</a>
        <a href="https://bridgepbc.com/members" style={{ background:C.forest, color:C.lime, padding:'7px 14px', fontFamily:F.sans, fontSize:'10px', fontWeight:700, textDecoration:'none', letterSpacing:'0.3px' }}>Apply &#8594;</a>
      </div>
    </div>
  );
};

const Cover = ({ logoRef }) => (
  <div>
    <div className="pad-cover" style={{ background:C.ink, padding:'28px 64px 0', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', right:'48px', top:'12px', fontFamily:F.display, fontSize:'160px', fontWeight:900, color:'rgba(184,217,53,0.04)', lineHeight:1, userSelect:'none', pointerEvents:'none' }}>&#8373;</div>
      <div ref={logoRef} className="cover-hdr" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'36px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:'16px' }}>
          <Logo height={26} variant="white"/>
          <div className="cover-hdr-label" style={{ width:'1px', height:'20px', background:'rgba(255,255,255,0.15)' }}/>
          <span className="cover-hdr-label" style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2px', color:'rgba(255,255,255,0.35)', textTransform:'uppercase' }}>Investor Intelligence</span>
        </div>
        <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
          <span style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, color:C.lime, letterSpacing:'2px', textTransform:'uppercase', border:`1px solid rgba(184,217,53,0.35)`, padding:'3px 10px' }}>2026 EDITION</span>
          <span style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, color:'rgba(255,255,255,0.5)', letterSpacing:'2px', textTransform:'uppercase', border:`1px solid rgba(255,255,255,0.2)`, padding:'3px 10px' }}>FREE VERSION</span>
        </div>
      </div>
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
      <div className="stats-row" style={{ display:'flex', gap:'0', borderTop:`1px solid rgba(255,255,255,0.08)`, paddingTop:'24px', marginBottom:'0' }}>
        {[
          { val:'GH\u20B5271.7B', label:'2026 National Budget' },
          { val:'GH\u20B5150B+', label:'Aligned with BRIDGE Sectors' },
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
    <div className="pad-byline" style={{ background:C.teal, padding:'10px 64px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
      <span style={{ fontFamily:F.sans, fontSize:'10px', color:'rgba(250,248,243,0.5)', letterSpacing:'0.5px' }}>BRIDGE PBC · January 2026 · Version 2.0</span>
      <span className="mob-hide" style={{ fontFamily:F.mono, fontSize:'10px', color:'rgba(250,248,243,0.3)' }}>bridgepbc.com/intelligence</span>
    </div>
  </div>
);

const Convergence = () => (
  <div className="pad-section" style={{ background:C.paper, padding:'56px 64px', borderBottom:`1px solid ${C.border}` }}>
    <div style={{ maxWidth:'900px', margin:'0 auto' }}>
      <div style={{ borderTop:`6px solid ${C.ink}`, borderBottom:`2px solid ${C.lime}`, paddingBottom:'3px', marginBottom:'20px' }}/>
      <div style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:C.muted, marginBottom:'8px' }}>The Convergence Moment</div>
      <h2 style={{ fontFamily:F.display, fontSize:'clamp(22px,3.5vw,36px)', fontWeight:700, color:C.ink, lineHeight:1.2, marginBottom:'28px' }}>For the first time, national economic policy and diaspora-driven development align across every sector.</h2>
      <div style={{ borderLeft:`3px solid ${C.lime}`, paddingLeft:'20px', marginBottom:'28px' }}>
        <p style={{ fontFamily:F.body, fontSize:'17px', fontStyle:'italic', color:C.forest, lineHeight:1.8, fontWeight:300 }}>
          "The Mahama administration's 24-Hour Economy framework, combined with specific budget allocations totalling over GH&#8373;150 billion across BRIDGE-aligned priorities, creates conditions that may not recur."
        </p>
      </div>
      <div className="two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px' }}>
        <div>
          <p style={{ fontFamily:F.body, fontSize:'15px', lineHeight:1.85, color:C.ink, fontWeight:300, marginBottom:'16px' }}>
            The Mahama administration has constructed seven policy pillars — Grow24, Make24, Build24, Connect24, Fund24, Aspire24, and Care24 — that map precisely to BRIDGE's twelve-sector portfolio. This is not coincidence. It is confirmation.
          </p>
          <p style={{ fontFamily:F.body, fontSize:'15px', lineHeight:1.85, color:C.ink, fontWeight:300 }}>
            Government has committed over GH&#8373;110 billion to programs that advance Peace &amp; Prosperity outcomes. The budget explicitly calls for private sector engagement and keeping major investments off the sovereign balance sheet — through GIIF, DBG, and private capital partnerships. BRIDGE is designed to be exactly that vehicle.
          </p>
        </div>
        <div>
          <div style={{ background:C.forest, padding:'24px', marginBottom:'16px' }}>
            <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:C.lime, marginBottom:'14px' }}>The 7 Pillars &#8594; 12 Sectors</div>
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
      <div style={{ background:C.paperDark, border:`1px solid ${C.border}`, padding:'20px 24px', marginTop:'28px', display:'flex', gap:'16px', alignItems:'flex-start' }}>
        <div style={{ width:'3px', background:C.lime, alignSelf:'stretch', flexShrink:0 }}/>
        <p style={{ fontFamily:F.body, fontSize:'14px', lineHeight:1.7, color:C.ink }}>
          <strong style={{ fontFamily:F.sans, fontWeight:700 }}>This is policy validation, not policy alignment.</strong> When government commits GH&#8373;2.2 billion to Model Markets, it validates BRIDGE's Kejetia flagship. When it establishes a US$500 million Oil Palm Finance Window, it validates our agricultural processing thesis. When it creates Film and Creative Arts Funds, it validates our creative industry ventures. The government is building the runway. BRIDGE is the aircraft.
        </p>
      </div>
    </div>
  </div>
);

const TopPlays = () => {
  const [open, setOpen] = useState(null);
  const [swipeIdx, setSwipeIdx] = useState(0);
  const swipeRef = useRef(null);
  const plays = [
    {
      num:'01', stars:5, sector:'Infrastructure & Market Systems',
      headline:'24-Hour Model Markets — The Mandatory Mandate',
      budget:'GH\u20B52.2B+', lever:'1:15+', pillar:'Build24',
      portfolio:'$8–15M across 18 ventures',
      thesis:'The mandatory 25% DACF allocation across 260+ districts creates a government-funded demand pull for exactly what BRIDGE builds. The Kejetia Market digitisation platform becomes not a pilot but the replicable national template. District Assemblies need a technical partner — BRIDGE is positioned to be it.',
      entry:['Technical partner for DACF-funded market construction', 'Kejetia digital platform \u2192 16-region replication', 'WASH investment across 400+ underserved communities'],
    },
    {
      num:'02', stars:5, sector:'Agriculture & Value Chains',
      headline:'Oil Palm Finance Window — US$500M Patient Capital',
      budget:'GH\u20B58.4B+', lever:'1:5.2', pillar:'Grow24',
      portfolio:'$12–22M across 18 ventures',
      thesis:'The National Policy on Integrated Oil Palm Development (2026\u20132032) is the single most significant agricultural policy opportunity for BRIDGE. A 5-year moratorium on repayment, 70% project financing, and a US$500M government window create co-financing structures that dramatically de-risk BRIDGE agriculture ventures.',
      entry:['Co-financing partner for Oil Palm Window disbursements', 'Cold chain + aggregation infrastructure alongside enclave roads (GH\u20B5828M)', 'Warehouse receipt financing via Ghana Buffer Stock Company (GH\u20B5200M)'],
    },
    {
      num:'03', stars:5, sector:'Energy & Renewable Resources',
      headline:'Rural Electrification — The Infrastructure Multiplier',
      budget:'GH\u20B521.0B+', lever:'1:8+', pillar:'Grow24 + Build24',
      portfolio:'$12–22M across 14 ventures',
      thesis:"Energy access is the enabler of everything else in BRIDGE\u2019s portfolio. Agricultural processing requires reliable power. Manufacturing requires stable electricity. The government\u2019s GH\u20B521B energy commitment creates the grid backbone; BRIDGE\u2019s last-mile solar and mini-grid ventures fill the gaps government cannot reach efficiently.",
      entry:['Solar mini-grid deployment in underserved agricultural zones', 'Market solar micro-grids across 50 markets', 'Renewable energy integration for processing facilities'],
    },
    {
      num:'04', stars:5, sector:'Manufacturing & Light Industry',
      headline:'Make24 — The Import Substitution Moment',
      budget:'Policy + GIIF', lever:'Policy-backed', pillar:'Make24',
      portfolio:'$15–30M across 14 ventures',
      thesis:"Ghana imports over $6 billion annually in goods it has the raw materials and labour to produce domestically. Make24\u2019s agro-industrial parks, scrap metal and raw rubber export restrictions, and three-shift garment factory commitments create protected market conditions for import substitution. BRIDGE positions in supply chains, not competition.",
      entry:['Supply chain integration with 3 new garment factories (27,000 jobs)', 'Agro-processing facility development alongside government parks', 'Ghana Free Zones incentives \u2014 100% duty exemption, 10-year tax holiday'],
    },
    {
      num:'05', stars:5, sector:'Transportation & Logistics',
      headline:'Connect24 — The Corridor Infrastructure Play',
      budget:'GH\u20B530B+', lever:'1:20+', pillar:'Connect24',
      portfolio:'$10–22M across 14 ventures',
      thesis:"GH\u20B530 billion in Connect24 infrastructure \u2014 Yapei Inland Port, Tamale Air Cargo Hub, Volo-Battor Agro-Industrial Park \u2014 creates logistics corridors that make BRIDGE\u2019s cold chain, aggregation centre, and export development ventures viable at scale. Every dollar BRIDGE invests in logistics infrastructure sits on a GH\u20B520+ government backbone.",
      entry:['Cold chain network positioned at new logistics nodes', 'Export development programme via Tamale Air Cargo Hub', 'Last-mile distribution serving government-built corridor infrastructure'],
    },
  ];

  const handleSwipeScroll = () => {
    if (!swipeRef.current) return;
    const w = swipeRef.current.offsetWidth;
    setSwipeIdx(Math.round(swipeRef.current.scrollLeft / (w + 12)));
  };
  const goToSwipe = i => {
    if (!swipeRef.current) return;
    swipeRef.current.scrollTo({ left: i * (swipeRef.current.offsetWidth + 12), behavior:'smooth' });
    setSwipeIdx(i);
  };

  return (
    <div style={{ background:C.ink, borderBottom:`1px solid rgba(255,255,255,0.06)` }}>
      <div className="pad-section" style={{ padding:'56px 64px' }}>
        <div style={{ maxWidth:'900px', margin:'0 auto' }}>
          <div style={{ borderTop:`6px solid ${C.lime}`, borderBottom:`2px solid rgba(255,255,255,0.1)`, paddingBottom:'3px', marginBottom:'20px' }}/>
          <div style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'8px' }}>Highest-Conviction Positions</div>
          <h2 style={{ fontFamily:F.display, fontSize:'clamp(22px,3.5vw,36px)', fontWeight:700, color:C.paper, lineHeight:1.2, marginBottom:'32px' }}>Five plays where government capital creates investor advantage.</h2>

          {/* Desktop: accordion list */}
          <div className="plays-desktop" style={{ display:'flex', flexDirection:'column', gap:'2px' }}>
            {plays.map((p, i) => (
              <div key={i}>
                <div
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{ background: open===i ? 'rgba(184,217,53,0.06)' : 'rgba(255,255,255,0.03)', border:`1px solid ${open===i ? 'rgba(184,217,53,0.2)' : 'rgba(255,255,255,0.07)'}`, padding:'18px 20px', cursor:'pointer', display:'flex', alignItems:'center', gap:'16px', transition:'all 0.2s ease' }}
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
                    <div style={{ color: open===i ? C.lime : 'rgba(255,255,255,0.3)', fontFamily:F.sans, fontSize:'16px', transition:'transform 0.2s', transform: open===i ? 'rotate(180deg)' : 'none' }}>&#8595;</div>
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
                            <span style={{ color:C.lime, fontSize:'11px', flexShrink:0, marginTop:'2px' }}>&#8594;</span>
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

          {/* Mobile: swipe carousel */}
          <div className="plays-mobile" style={{ display:'none' }}>
            <div ref={swipeRef} className="swipe-row" style={{ padding:'0 0 4px' }} onScroll={handleSwipeScroll}>
              {plays.map((p, i) => (
                <div key={i} className="swipe-card" style={{ width:'calc(100vw - 36px)' }}>
                  <div style={{ background:'rgba(255,255,255,0.04)', border:`1px solid rgba(255,255,255,0.09)`, overflow:'hidden' }}>
                    <div style={{ padding:'14px 16px', borderBottom:`1px solid rgba(255,255,255,0.07)` }}>
                      <div style={{ fontFamily:F.mono, fontSize:'20px', fontWeight:700, color:'rgba(184,217,53,0.3)', marginBottom:'4px' }}>{p.num}</div>
                      <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.lime, marginBottom:'4px', opacity:0.7 }}>{p.sector} · {p.pillar}</div>
                      <div style={{ fontFamily:F.display, fontSize:'16px', fontWeight:700, color:C.paper, lineHeight:1.2, marginBottom:'8px' }}>{p.headline}</div>
                      <div style={{ display:'flex', gap:'12px' }}>
                        <span style={{ fontFamily:F.mono, fontSize:'12px', fontWeight:700, color:C.lime }}>{p.budget}</span>
                        <span style={{ fontFamily:F.sans, fontSize:'9px', color:'rgba(255,255,255,0.3)', alignSelf:'center' }}>Lev. {p.lever}</span>
                      </div>
                    </div>
                    <div style={{ padding:'12px 16px', borderBottom:`1px solid rgba(255,255,255,0.07)` }}>
                      <p style={{ fontFamily:F.body, fontSize:'12px', lineHeight:1.7, color:'rgba(250,248,243,0.6)', fontWeight:300 }}>{p.thesis}</p>
                    </div>
                    <div style={{ padding:'12px 16px' }}>
                      <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(255,255,255,0.3)', marginBottom:'8px' }}>Entry Points</div>
                      {p.entry.map((e, j) => (
                        <div key={j} style={{ display:'flex', gap:'8px', marginBottom:'7px', alignItems:'flex-start' }}>
                          <span style={{ color:C.lime, fontSize:'10px', flexShrink:0, marginTop:'1px' }}>&#8594;</span>
                          <span style={{ fontFamily:F.sans, fontSize:'11px', color:'rgba(250,248,243,0.6)', lineHeight:1.45 }}>{e}</span>
                        </div>
                      ))}
                      <div style={{ marginTop:'10px', paddingTop:'10px', borderTop:`1px solid rgba(255,255,255,0.07)` }}>
                        <span style={{ fontFamily:F.mono, fontSize:'10px', color:C.lime }}>{p.portfolio}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Scroll dots */}
            <div className="scroll-dots" style={{ display:'none' }}>
              {plays.map((_, i) => (
                <div key={i} onClick={() => goToSwipe(i)} className={`scroll-dot${i===swipeIdx?' active':' inactive'}`} style={{ background: i===swipeIdx ? C.lime : 'rgba(255,255,255,0.2)' }}/>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

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
            <div
              onClick={() => setTlOpen(o => !o)}
              style={{ display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer', marginBottom:'14px' }}
            >
              <div style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'1.5px', textTransform:'uppercase', color:C.muted }}>Capital Deployment Timeline</div>
              <span className="mob-show" style={{ fontFamily:F.mono, fontSize:'12px', color:C.muted, transition:'transform 0.2s', transform: tlOpen ? 'rotate(180deg)' : 'none' }}>&#8595;</span>
            </div>
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

const SectorMatrix = () => {
  const [secExp, setSecExp] = useState(false);
  const sectors = [
    { num:'01', name:'Infrastructure & Basic Services', budget:'GH\u20B547.2B+', lever:'1:15+', pillar:'Build24', stars:5, note:'Model Markets mandatory DACF mandate' },
    { num:'02', name:'Financial Inclusion', budget:'GH\u20B5561M+', lever:'1:3.5', pillar:'Fund24', stars:4, note:'WDB · DBG · digital credit directive' },
    { num:'03', name:'Health Systems', budget:'GH\u20B512.1B+', lever:'1:12+', pillar:'Care24', stars:4, note:'NHIS reform · MahamaCares · CHPS expansion' },
    { num:'04', name:'Technology & Innovation', budget:'GH\u20B5100M', lever:'1:1.5', pillar:'Connect24', stars:3, note:'Coders Programme; digital economy policy' },
    { num:'05', name:'Education & Skills', budget:'GH\u20B547.5B+', lever:'1:10+', pillar:'Aspire24', stars:4, note:'GETFund · Apprenticeship Programme' },
    { num:'06', name:'Agriculture & Value Chains', budget:'GH\u20B58.4B+', lever:'1:5.2', pillar:'Grow24', stars:5, note:'Oil Palm Window US$500M; Grow24 irrigation' },
    { num:'07', name:'Sports, Entertainment & Creative', budget:'GH\u20B5240M+', lever:'1:2', pillar:'Aspire24', stars:4, note:'Film Fund GH\u20B520M; Creative Arts Fund GH\u20B520M' },
    { num:'08', name:'Housing & Real Estate', budget:'GH\u20B5500M+', lever:'1:4', pillar:'Build24', stars:3, note:'District housing programme; employer schemes' },
    { num:'09', name:'Tourism & Hospitality', budget:'Policy', lever:'N/A', pillar:'Aspire24', stars:3, note:'Black Star Experience; Sankofa alignment' },
    { num:'10', name:'Energy & Renewable Resources', budget:'GH\u20B521.0B+', lever:'1:8+', pillar:'Grow24', stars:5, note:'Rural electrification; VRA + ECG reform' },
    { num:'11', name:'Manufacturing & Light Industry', budget:'Make24 + GIIF', lever:'Policy', pillar:'Make24', stars:5, note:'Agro-industrial parks; textile factories' },
    { num:'12', name:'Transportation & Logistics', budget:'GH\u20B530B+', lever:'1:20+', pillar:'Connect24', stars:5, note:'Yapei Port; Tamale Hub; enclave roads' },
  ];
  return (
    <div className="pad-section" style={{ background:C.paper, padding:'56px 64px', borderBottom:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:'900px', margin:'0 auto' }}>
        <div style={{ borderTop:`6px solid ${C.ink}`, borderBottom:`2px solid ${C.lime}`, paddingBottom:'3px', marginBottom:'20px' }}/>
        <div style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:C.muted, marginBottom:'8px' }}>Full Portfolio Overview</div>
        <h2 style={{ fontFamily:F.display, fontSize:'clamp(20px,3vw,32px)', fontWeight:700, color:C.ink, lineHeight:1.2, marginBottom:'28px' }}>All 12 sectors. Alignment scores and budget leverage.</h2>
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
                  {[1,2,3,4,5].map(n => <span key={n} style={{ fontSize:'10px', color: n<=s.stars ? C.lime : C.border }}>&#9733;</span>)}
                </div>
                <span style={{ fontFamily:F.body, fontSize:'11px', fontStyle:'italic', color:C.muted }}>{s.note}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="sector-cards" style={{ gap:'8px', marginTop:'4px' }}>
          {sectors.map((s, i) => (
            <div key={i} className={i >= 3 ? (secExp ? '' : 'mob-item-hidden') : ''} style={{ border:`1px solid ${C.border}`, padding:'14px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'6px' }}>
                <div>
                  <div style={{ fontFamily:F.mono, fontSize:'9px', color:C.faint, marginBottom:'2px' }}>{s.num} · {s.pillar}</div>
                  <div style={{ fontFamily:F.sans, fontSize:'12px', fontWeight:700, color:C.ink }}>{s.name}</div>
                </div>
                <div style={{ display:'flex', gap:'2px', flexShrink:0 }}>
                  {[1,2,3,4,5].map(n => <span key={n} style={{ fontSize:'11px', color: n<=s.stars ? C.lime : C.border }}>&#9733;</span>)}
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
          <button className="mob-show mob-toggle" onClick={() => setSecExp(o => !o)}>
            <span>{secExp ? 'Show less \u2191' : `View remaining ${sectors.length - 3} sectors \u2193`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

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
          <button className="mob-show mob-toggle mob-toggle-dark" onClick={() => setImpExp(o => !o)} style={{ marginTop:'4px' }}>
            <span>{impExp ? 'Show less \u2191' : `View all ${items.length} imperatives \u2193`}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const InvestorCTA = () => (
  <div className="pad-section" style={{ background:C.ink, padding:'56px 64px', borderBottom:`1px solid rgba(255,255,255,0.06)` }}>
    <div style={{ maxWidth:'900px', margin:'0 auto' }}>
      <div style={{ borderTop:`6px solid ${C.lime}`, paddingTop:'32px' }}>
        <div style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:700, letterSpacing:'2.5px', textTransform:'uppercase', color:'rgba(184,217,53,0.5)', marginBottom:'20px' }}>You're reading the Free Version</div>
        <div className="two-col" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'48px', marginBottom:'32px' }}>
          <div>
            <h2 style={{ fontFamily:F.display, fontSize:'clamp(22px,4vw,42px)', fontWeight:900, fontStyle:'italic', color:C.paper, lineHeight:1.15, marginBottom:'12px' }}>
              The full picture is one step away.
            </h2>
            <p style={{ fontFamily:F.body, fontSize:'15px', fontStyle:'italic', color:'rgba(250,248,243,0.45)', lineHeight:1.7, marginBottom:'24px' }}>
              This brief covers the headlines. Members get the full analysis — 18 named ventures, line-item budget breakdowns, DFI partner matrix, live risk tracker, and quarterly updates across all 12 sectors.
            </p>
            <div style={{ background:'rgba(184,217,53,0.08)', border:`1px solid rgba(184,217,53,0.2)`, padding:'16px 20px', marginBottom:'24px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:'4px' }}>
                <span style={{ fontFamily:F.display, fontSize:'28px', fontWeight:700, color:C.lime }}>GHS 500</span>
                <span style={{ fontFamily:F.sans, fontSize:'10px', color:'rgba(255,255,255,0.35)' }}>per year</span>
              </div>
              <div style={{ fontFamily:F.sans, fontSize:'11px', color:'rgba(255,255,255,0.35)', marginBottom:'12px' }}>approximately $33 USD · cancel anytime</div>
              <div style={{ height:'1px', background:'rgba(255,255,255,0.08)', marginBottom:'12px' }}/>
              <div style={{ fontFamily:F.body, fontSize:'11px', fontStyle:'italic', color:'rgba(255,255,255,0.35)', lineHeight:1.6 }}>
                Requires 30 days as a Free Member before applying. Membership is individual and non-transferable.
              </div>
            </div>
            <div className="cta-row" style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
              <a href="https://bridgepbc.com/members" style={{ display:'flex', alignItems:'center', gap:'10px', background:C.lime, color:C.ink, padding:'14px 24px', fontFamily:F.sans, fontSize:'12px', fontWeight:800, textDecoration:'none', letterSpacing:'0.5px', justifyContent:'center' }}>
                <span>Apply for Members Access</span>
                <span style={{ fontSize:'14px', fontWeight:900 }}>&#8594;</span>
              </a>
              <a href="https://bridgepbc.com/members" style={{ display:'flex', alignItems:'center', gap:'10px', background:'rgba(255,255,255,0.05)', border:`1px solid rgba(255,255,255,0.12)`, color:'rgba(255,255,255,0.6)', padding:'12px 20px', fontFamily:F.sans, fontSize:'11px', fontWeight:600, textDecoration:'none', justifyContent:'center' }}>
                <span>Learn about membership tiers &#8594;</span>
              </a>
            </div>
          </div>
          <div>
            <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'rgba(255,255,255,0.25)', marginBottom:'14px' }}>Members Edition Includes</div>
            {[
              { item:'18 priority ventures — IRR targets, ticket sizes, stage', lock:false },
              { item:'Sector deep dives — line-item budget breakdowns', lock:false },
              { item:'DFI partner matrix — GIIF, DBG, WDB, AfDB, DFC', lock:false },
              { item:'Live risk & policy tracker — 6 risks, quarterly updates', lock:false },
              { item:'BRIDGE Impact Score™ — portfolio-level analysis', lock:false },
              { item:'Oil Palm Window co-financing structuring guide', lock:false },
              { item:'DACF engagement playbooks per district tier', lock:false },
              { item:'Priority access to new intelligence releases', lock:false },
            ].map((r, i) => (
              <div key={i} style={{ display:'flex', gap:'10px', alignItems:'flex-start', padding:'8px 0', borderBottom:`1px solid rgba(255,255,255,0.05)` }}>
                <span style={{ color:C.lime, fontSize:'11px', flexShrink:0, marginTop:'2px' }}>&#8594;</span>
                <span style={{ fontFamily:F.sans, fontSize:'11px', color:'rgba(250,248,243,0.5)', lineHeight:1.5 }}>{r.item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement ladder */}
        <div style={{ background:'rgba(255,255,255,0.03)', border:`1px solid rgba(255,255,255,0.07)`, padding:'20px 24px' }}>
          <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'rgba(255,255,255,0.25)', marginBottom:'14px' }}>Where Members Access Fits · The BRIDGE Engagement Ladder</div>
          <div style={{ display:'flex', gap:'0', overflowX:'auto' }}>
            {[
              { step:'Free Brief', desc:'Headlines · Policy overview', note:'You are here', highlight:true },
              { step:'Members', desc:'Full analysis · Ventures · Risk tracker', note:'GHS 500/year', highlight:false },
              { step:'Advisory', desc:'1:1 strategy · DFI facilitation', note:'Retainer', highlight:false },
              { step:'Transaction', desc:'Deal origination · Co-investment', note:'Success fee', highlight:false },
              { step:'Co-Investor', desc:'Portfolio entry · Board seat', note:'By invitation', highlight:false },
            ].map((l, i) => (
              <div key={i} style={{ flex:1, minWidth:'100px', padding:'12px 10px', background: l.highlight ? 'rgba(184,217,53,0.12)' : 'transparent', borderRight: i < 4 ? `1px solid rgba(255,255,255,0.06)` : 'none', borderLeft: l.highlight ? `2px solid ${C.lime}` : 'none' }}>
                <div style={{ fontFamily:F.sans, fontSize:'11px', fontWeight:700, color: l.highlight ? C.lime : C.paper, marginBottom:'3px' }}>{l.step}</div>
                <div style={{ fontFamily:F.body, fontSize:'10px', fontStyle:'italic', color:'rgba(255,255,255,0.35)', marginBottom:'6px', lineHeight:1.4 }}>{l.desc}</div>
                <div style={{ fontFamily:F.mono, fontSize:'9px', fontWeight:700, color: l.highlight ? C.lime : 'rgba(255,255,255,0.25)' }}>{l.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop:'16px', display:'flex', alignItems:'center', gap:'16px' }}>
          <a href="https://bridgepbc.com/intelligence" style={{ fontFamily:F.sans, fontSize:'10px', fontWeight:600, color:'rgba(250,248,243,0.2)', textDecoration:'none' }}>View all 12 sector briefs &#8594;</a>
          <span style={{ fontFamily:F.mono, fontSize:'9px', color:'rgba(250,248,243,0.12)', letterSpacing:'1px' }}>bridgepbc.com/intelligence</span>
        </div>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <div className="pad-footer" style={{ background:C.forest, padding:'16px 64px', borderTop:`3px solid ${C.lime}` }}>
    <div className="footer-inner" style={{ maxWidth:'900px', margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'10px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
        <Logo height={18} variant="white"/>
        <div style={{ width:'1px', height:'14px', background:'rgba(255,255,255,0.15)' }}/>
        <div style={{ fontFamily:F.sans, fontSize:'10px', color:'rgba(250,248,243,0.35)' }}>2026 Budget Alignment Brief · BRIDGE PBC · bridgepbc.com</div>
      </div>
      <div className="footer-nav" style={{ display:'flex', gap:'14px' }}>
        {[['Intelligence','https://bridgepbc.com/intelligence'],['Members','https://bridgepbc.com/members'],['Contact','https://bridgepbc.com/contact']].map(([l,url], i) => (
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
    ['s-cover','Overview'],['s-convergence','Convergence'],['s-plays','Top 5'],
    ['s-finance','Capital'],['s-sectors','Sectors'],['s-imperatives','Imperatives'],['s-upgrade','Upgrade'],
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
      <div style={{ fontFamily:F.sans, fontSize:'9px', fontWeight:700, color:'rgba(255,255,255,0.35)', letterSpacing:'1px', textTransform:'uppercase', marginBottom:'1px' }}>Free Version</div>
      <div style={{ fontFamily:F.sans, fontSize:'11px', fontWeight:700, color:C.paper }}>Upgrade · GHS 500/year</div>
    </div>
    <a href="https://bridgepbc.com/members" style={{ background:C.lime, color:C.ink, padding:'9px 16px', fontFamily:F.sans, fontSize:'11px', fontWeight:800, textDecoration:'none', flexShrink:0 }}>Apply &#8594;</a>
  </div>
);

export default function BudgetAlignment() {
  const logoRef = useRef(null);
  const [activeSection, setActiveSection] = useState('s-cover');
  const [showFloat, setShowFloat] = useState(false);

  useEffect(() => {
    const ids = ['s-cover','s-convergence','s-plays','s-finance','s-sectors','s-imperatives','s-upgrade'];
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
      <Gf/>
      <ReadBar/>
      <TopBar logoRef={logoRef}/>
      <div id="s-cover"><Cover logoRef={logoRef}/></div>
      <MobNav active={activeSection}/>
      <div id="s-convergence"><Convergence/></div>
      <div id="s-plays"><TopPlays/></div>
      <div id="s-finance"><BlendedFinance/></div>
      <div id="s-sectors"><SectorMatrix/></div>
      <div id="s-imperatives"><Imperatives/></div>
      <div id="s-upgrade"><InvestorCTA/></div>
      <Footer/>
      <FloatCTA show={showFloat}/>
    </div>
  );
}
