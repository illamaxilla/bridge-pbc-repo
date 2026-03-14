import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────
const C = {
  ink:'#0D1A10', paper:'#FAF8F3', paperDark:'#F0EDE4',
  forest:'#1B4D3E', lime:'#B8D935', limeDark:'#8FA825',
  muted:'#5C6B5E', faint:'#9AAA9C', border:'#D8D4C8',
  teal:'#2E5A4D', red:'#A8200D', amber:'#B8730A',
  positive:'#1A6B2F', white:'#FFFFFF',
};
const F = {
  display:'"Playfair Display","Georgia",serif',
  body:'"Source Serif 4","Georgia",serif',
  sans:'"DM Sans","Helvetica Neue",sans-serif',
  mono:'"DM Mono","Courier New",monospace',
};

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL STYLES
// ─────────────────────────────────────────────────────────────────────────────
const Gf = () => (<style>{`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:${C.paper};-webkit-font-smoothing:antialiased;overflow-x:hidden;}
  .dc::first-letter{font-family:${F.display};font-size:4em;font-weight:900;float:left;line-height:0.82;margin:0.08em 0.14em 0 0;color:${C.forest};}
  .mob-show{display:none;}
  .mob-risk-body{display:block;}
  .chain-scroll{display:flex;gap:8px;overflow-x:auto;padding-bottom:10px;-webkit-overflow-scrolling:touch;scroll-snap-type:x mandatory;}
  .chain-scroll > *{scroll-snap-align:start;}
  .chain-scroll::-webkit-scrollbar{height:3px;}
  .chain-scroll::-webkit-scrollbar-track{background:${C.border};}
  .chain-scroll::-webkit-scrollbar-thumb{background:${C.limeDark};}
  .progress-bar{position:absolute;bottom:0;left:0;height:2px;background:${C.lime};transition:width 0.1s linear;pointer-events:none;}
  @media print{
    .np{display:none!important;}
    body{background:#fff;}
    .pad-section{padding:32px 48px!important;}
    .pad-gate{background:${C.ink}!important;-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    .pad-cover{-webkit-print-color-adjust:exact;print-color-adjust:exact;}
    a{text-decoration:none!important;}
  }
  @media(max-width:900px){
    .tc{grid-template-columns:1fr!important;}
    .tc2{grid-template-columns:1fr 1fr!important;}
    .tc3{grid-template-columns:1fr 1fr!important;}
    .hm{display:none!important;}
    .pad-section{padding:40px 32px!important;}
    .pad-cover{padding:28px 32px 0!important;}
    .pad-gate{padding:40px 32px!important;}
    .pad-footer{padding:14px 32px!important;}
    .pad-topbar{padding:10px 24px!important;}
  }
  @media(max-width:600px){
    .tc{grid-template-columns:1fr!important;}
    .tc2{grid-template-columns:1fr!important;}
    .tc3{grid-template-columns:1fr!important;}
    .pad-section{padding:24px 18px!important;}
    .pad-cover{padding:20px 18px 0!important;}
    .pad-gate{padding:24px 18px!important;}
    .pad-footer{padding:16px 18px!important;}
    .pad-topbar{padding:10px 18px!important;}
    .mob-hide{display:none!important;}
    .mob-show{display:block!important;}
    .mob-stack{flex-direction:column!important;align-items:flex-start!important;gap:8px!important;}
    .mob-full{width:100%!important;}
    .mob-item-hidden{display:none!important;}
    .mob-toggle{display:flex!important;align-items:center;justify-content:space-between;width:100%;
      padding:10px 0;border:none;border-bottom:1px solid ${C.border};background:transparent;
      cursor:pointer;font-family:${F.sans};font-size:10px;font-weight:700;
      letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};}
    .mob-toggle-dark{border-color:rgba(255,255,255,0.12)!important;color:rgba(250,248,243,0.35)!important;}
    .mob-toggle-hdr{border-color:rgba(255,255,255,0.1)!important;color:rgba(250,248,243,0.5)!important;background:rgba(255,255,255,0.04)!important;padding:10px 14px!important;}
    .gate-value-line{display:none!important;}
    .gate-cta-row{flex-direction:column!important;}
    .footer-links{display:none!important;}
    .footer-inner{justify-content:center!important;}
    .toc-grid{grid-template-columns:1fr!important;}
    .mob-sec-toggle{display:flex!important;width:100%;align-items:center;justify-content:space-between;
      padding:16px 0;border:none;border-bottom:1px solid rgba(255,255,255,0.08);background:transparent;
      cursor:pointer;text-align:left;}
    .mob-sec-toggle-light{border-bottom-color:${C.border}!important;}
    .mob-sec-collapsed{display:none!important;}
    .stats-row>div{flex:0 0 50%!important;border-right:none!important;border-bottom:1px solid rgba(255,255,255,0.07)!important;}
    .stats-row>div:nth-child(odd){border-right:1px solid rgba(255,255,255,0.07)!important;}
    .mob-nav-clearance{padding-bottom:72px!important;}
    .mob-risk-body{display:none!important;}
    .mob-risk-open .mob-risk-body{display:block!important;}
    /* Carousel */
    .mob-carousel{display:flex!important;gap:12px;overflow-x:auto;padding-bottom:4px;
      -webkit-overflow-scrolling:touch;scroll-snap-type:x mandatory;scrollbar-width:none;}
    .mob-carousel::-webkit-scrollbar{display:none;}
    .mob-carousel>.mob-card{scroll-snap-align:start;flex:0 0 85%;min-width:0;}
    .mob-carousel>.mob-card-wide{scroll-snap-align:start;flex:0 0 92%;min-width:0;}
    /* Phase accordions */
    .mob-phase-body{display:none!important;}
    .mob-phase-open .mob-phase-body{display:block!important;}
    .mob-phase-hdr{display:flex!important;width:100%;align-items:center;justify-content:space-between;
      padding:12px 0;border:none;border-bottom:1px solid ${C.border};background:transparent;
      cursor:pointer;text-align:left;}
    /* Country cards */
    .mob-country-list{display:flex!important;flex-direction:column;gap:0;}
    /* 5-stat strip: 2×2 + full-width 5th */
    .stats-row>div:last-child{flex:0 0 100%!important;border-right:none!important;}
    /* TOC: hide subtitles on mobile to compress height */
    .toc-sub{display:none!important;}
    .toc-item{cursor:pointer;}
    .toc-item:active{background:rgba(184,217,53,0.06);}
    /* Score dimension accordion */
    .mob-dim-body{display:none!important;}
    .mob-dim-open .mob-dim-body{display:block!important;}
    .mob-dim-hdr{display:flex!important;width:100%;align-items:center;justify-content:space-between;
      padding:12px 0;border:none;border-bottom:1px solid rgba(255,255,255,0.08);background:transparent;
      cursor:pointer;text-align:left;}
    /* Deploy capital reveal */
    .mob-cap-hidden{display:none!important;}
    /* Cost row stacking */
    .mob-cost-row{display:grid!important;grid-template-columns:1fr!important;gap:0px!important;padding:10px 0!important;}
    .mob-cost-meta{display:flex!important;gap:12px;margin-top:3px;}
  }
`}</style>);

// ─────────────────────────────────────────────────────────────────────────────
// LOGO
// ─────────────────────────────────────────────────────────────────────────────
const Logo = ({height=28, variant='white'}) => {
  // variant='white' → on dark bg (Cover, Footer, TopBar-scrolled)
  // variant='dark'  → on light bg (TopBar default)
  const W = variant==='white' ? '#ffffff' : C.ink;
  const L = C.lime; // #b8d935 always
  const MG = '#74914a'; // mid-green accent (cls-6) — works on both
  const FS = C.forest; // #1b4d3e
  const bStroke = variant==='white' ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.2)';
  return (
    <svg height={height} viewBox="0 0 3258.5 932.3" xmlns="http://www.w3.org/2000/svg" style={{display:'block',flexShrink:0}}>
      {/* ── ICON MARK ── */}
      {/* Box outline */}
      <rect x="40" y="40" width="843.9" height="852.3" rx="36.6" ry="36.6"
        style={{fill:'none',stroke:W,strokeWidth:80,strokeMiterlimit:10}}/>
      {/* Diamond — lime fill, forest stroke */}
      <polygon points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"
        style={{fill:L,stroke:FS,strokeMiterlimit:10}}/>
      {/* Mid-green chevron */}
      <path d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z"
        style={{fill:MG}}/>
      {/* Lime chevron */}
      <path d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"
        style={{fill:L}}/>
      {/* ── D ── */}
      <path d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"
        style={{fill:W}}/>
      {/* ── B upper ── */}
      <path d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"
        style={{fill:W,stroke:bStroke,strokeWidth:0.5,strokeMiterlimit:10}}/>
      {/* ── B lower ── */}
      <path d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"
        style={{fill:W,stroke:bStroke,strokeWidth:0.5,strokeMiterlimit:10}}/>
      {/* B lime top bar */}
      <rect x="1427.4" y="17.4" width="205.2" height="145" style={{fill:L}}/>
      {/* B white body rect */}
      <rect x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6" style={{fill:W}}/>
      {/* ── G ── */}
      <path d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"
        style={{fill:W}}/>
      <rect x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6" style={{fill:W}}/>
      {/* ── E ── */}
      <rect x="3083.4" y="339.5" width="175.1" height="257.7" style={{fill:L}}/>
      <rect x="3083.4" y="654.4" width="175.1" height="257.7" style={{fill:L}}/>
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SHARED COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
const SectionRule = () => (
  <div style={{borderTop:`6px solid ${C.ink}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
);

const Eyebrow = ({children, light=false}) => (
  <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:light?'rgba(250,248,243,0.4)':C.muted,marginBottom:'8px'}}>{children}</div>
);

const ScoreBar = ({label, value, onDark}) => (
  <div style={{marginBottom:'11px'}}>
    <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}>
      <span style={{fontFamily:F.sans,fontSize:'10px',color:onDark?'rgba(250,248,243,0.4)':C.muted}}>{label}</span>
      <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:onDark?C.lime:C.forest}}>{value}</span>
    </div>
    <div style={{height:'3px',background:onDark?'rgba(255,255,255,0.08)':C.border,borderRadius:'2px',overflow:'hidden'}}>
      <div style={{height:'100%',width:`${value}%`,background:C.lime,borderRadius:'2px'}}/>
    </div>
  </div>
);

const PullQuote = ({children, author, onDark=false}) => (
  <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:'18px',margin:'24px 0'}}>
    <p style={{fontFamily:F.display,fontSize:'17px',fontStyle:'italic',fontWeight:600,color:onDark?'rgba(250,248,243,0.7)':C.forest,lineHeight:1.65,marginBottom:author?'10px':'0'}}>{children}</p>
    {author && <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:onDark?'rgba(250,248,243,0.3)':C.faint}}>{author}</div>}
  </div>
);

const Tag = ({children, color, bg}) => (
  <div style={{display:'inline-block',background:bg||'transparent',border:`1px solid ${color}`,color:color,padding:'2px 8px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase'}}>{children}</div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE CAROUSEL (reusable, CSS-driven, with dot indicators)
// ─────────────────────────────────────────────────────────────────────────────
const MobCarousel = ({items, renderCard, onDark=false}) => {
  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const cardW = scrollRef.current.offsetWidth * 0.85 + 12;
    const idx = Math.round(scrollRef.current.scrollLeft / cardW);
    setActive(Math.max(0, Math.min(idx, items.length - 1)));
  };
  const goTo = (i) => {
    if (!scrollRef.current) return;
    const cardW = scrollRef.current.offsetWidth * 0.85 + 12;
    scrollRef.current.scrollTo({left: i * cardW, behavior:'smooth'});
    setActive(i);
  };
  return (
    <div className="mob-show" style={{display:'none',marginTop:'16px'}}>
      <div className="mob-carousel" ref={scrollRef} onScroll={handleScroll}>
        {items.map((item, i) => (
          <div key={i} className="mob-card">
            {renderCard(item, i)}
          </div>
        ))}
      </div>
      <div style={{display:'flex',gap:'6px',justifyContent:'center',marginTop:'14px'}}>
        {items.map((_,i) => (
          <div key={i} onClick={()=>goTo(i)} style={{
            width:i===active?'24px':'8px', height:'8px', borderRadius:'4px',
            background:i===active?C.lime:(onDark?'rgba(255,255,255,0.2)':C.border),
            cursor:'pointer', transition:'all 0.3s ease',
          }}/>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE PHASE ACCORDION (for Regulatory section)
// ─────────────────────────────────────────────────────────────────────────────
const MobPhaseAccordion = ({phases}) => {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className="mob-show" style={{display:'none',marginTop:'8px'}}>
      {phases.map((p, i) => {
        const isOpen = openIdx === i;
        return (
          <div key={i} className={isOpen ? 'mob-phase-open' : ''} style={{borderBottom:`1px solid ${C.border}`}}>
            <button className="mob-phase-hdr" onClick={()=>setOpenIdx(isOpen?null:i)}>
              <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
                <div style={{width:'8px',height:'8px',background:p.color,flexShrink:0}}/>
                <div>
                  <div style={{fontFamily:F.mono,fontSize:'8px',fontWeight:700,color:p.color,letterSpacing:'1px',textAlign:'left'}}>{p.phase}</div>
                  <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,lineHeight:1.2,textAlign:'left'}}>{p.label}</div>
                </div>
              </div>
              <span style={{fontFamily:F.mono,fontSize:'13px',color:C.faint,transition:'transform 0.2s',transform:isOpen?'rotate(180deg)':'none',flexShrink:0,marginLeft:'8px'}}>↓</span>
            </button>
            <div className="mob-phase-body" style={{paddingBottom:'14px',paddingTop:'8px'}}>
              {p.steps.map((s,j) => (
                <div key={j} style={{display:'flex',gap:'8px',padding:'5px 0',borderBottom:j<p.steps.length-1?`1px solid rgba(0,0,0,0.04)`:'none'}}>
                  <span style={{color:p.color,fontFamily:F.mono,fontSize:'10px',flexShrink:0,marginTop:'2px'}}>→</span>
                  <span style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.55}}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE COUNTRY CARDS (for Competitive Landscape)
// ─────────────────────────────────────────────────────────────────────────────
const MobCountryCards = ({countries}) => {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <div className="mob-show" style={{display:'none',marginTop:'8px'}}>
      {countries.map((r, i) => {
        const isOpen = openIdx === i;
        const isGhana = !!r.hl;
        return (
          <div key={i} style={{borderBottom:`1px solid ${C.border}`,background:isGhana?`rgba(184,217,53,0.06)`:'transparent'}}>
            <button onClick={()=>setOpenIdx(isOpen?null:i)}
              style={{width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',
                padding:'12px 0',border:'none',background:'transparent',cursor:'pointer',textAlign:'left'}}>
              <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
                <span style={{fontFamily:F.sans,fontSize:'14px',fontWeight:700,color:C.ink}}>{r.country}</span>
                {isGhana && <span style={{background:C.lime,color:C.ink,padding:'2px 7px',fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase'}}>TOP PICK</span>}
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <span style={{fontFamily:F.mono,fontSize:'11px',color:C.faint}}>{r.status}</span>
                <span style={{fontFamily:F.mono,fontSize:'13px',color:C.faint,transition:'transform 0.2s',transform:isOpen?'rotate(180deg)':'none'}}>↓</span>
              </div>
            </button>
            {isOpen && (
              <div style={{paddingBottom:'14px'}}>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginBottom:'8px'}}>
                  {[
                    {l:'Agro Fit', v:r.aFit},
                    {l:'Port Access', v:r.port},
                    {l:'Labour Cost', v:r.labour},
                    {l:'Framework', v:r.fw},
                    {l:'Smallholder', v:r.sm},
                  ].map((f,j) => (
                    <div key={j} style={{padding:'8px',background:C.paperDark}}>
                      <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.faint,marginBottom:'3px'}}>{f.l}</div>
                      <div style={{fontFamily:F.sans,fontSize:'13px',color:C.ink}}>{f.v}</div>
                    </div>
                  ))}
                </div>
                <div style={{background:isGhana?C.forest:'transparent',border:isGhana?'none':`1px solid ${C.border}`,padding:'10px 12px'}}>
                  <span style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:isGhana?C.paper:C.muted}}>{r.view}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE COLLAPSE WRAPPER
// ─────────────────────────────────────────────────────────────────────────────
const MobileCollapse = ({num, title, stat, label, defaultOpen=false, onDark=false, children}) => {
  const [open, setOpen] = useState(defaultOpen);
  const bdr = onDark ? 'rgba(255,255,255,0.08)' : C.border;
  const numCol = C.lime;
  const titleCol = onDark ? C.paper : C.ink;
  const statCol = onDark ? C.lime : C.forest;
  const labelCol = onDark ? 'rgba(250,248,243,0.35)' : C.faint;
  const chevCol = onDark ? 'rgba(250,248,243,0.3)' : C.muted;
  return (
    <>
      <button
        className={`mob-show mob-sec-toggle${onDark ? '' : ' mob-sec-toggle-light'}`}
        style={{display:'none'}}
        onClick={() => setOpen(o => !o)}
      >
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:numCol,letterSpacing:'1px',flexShrink:0}}>{num}</span>
          <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:titleCol,lineHeight:1.2}}>{title}</span>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'10px',flexShrink:0}}>
          <div style={{textAlign:'right'}}>
            <div style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:statCol,lineHeight:1}}>{stat}</div>
            <div style={{fontFamily:F.sans,fontSize:'8px',color:labelCol,letterSpacing:'0.8px',marginTop:'2px'}}>{label}</div>
          </div>
          <span style={{fontFamily:F.mono,fontSize:'14px',color:chevCol,transition:'transform 0.25s ease',transform:open?'rotate(180deg)':'rotate(0deg)',display:'inline-block'}}>↓</span>
        </div>
      </button>
      <div className={open ? '' : 'mob-sec-collapsed'}>
        {children}
      </div>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE BOTTOM NAV
// ─────────────────────────────────────────────────────────────────────────────
const NAV_SECTIONS = [
  {id:'s01',num:'§ 01',title:'Why Now'},
  {id:'s02',num:'§ 02',title:'Thesis'},
  {id:'s03',num:'§ 03',title:'Ghana Fit'},
  {id:'s04',num:'§ 04',title:'Business Models'},
  {id:'s05',num:'§ 05',title:'Economics'},
  {id:'s06',num:'§ 06',title:'Value Chain'},
  {id:'s07',num:'§ 07',title:'Competition'},
  {id:'s08',num:'§ 08',title:'Regulatory'},
  {id:'s09',num:'§ 09',title:'Risks'},
  {id:'s10',num:'§ 10',title:'BRIDGE Score'},
  {id:'s11',num:'§ 11',title:'Deployment'},
];

const MobileNav = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const observers = NAV_SECTIONS.map((s, i) => {
      const el = document.getElementById(s.id);
      if (!el) return null;
      const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) setActive(i);
      }, {rootMargin:'-30% 0px -60% 0px', threshold:0});
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({behavior:'smooth', block:'start'});
  const cur = NAV_SECTIONS[active];
  return (
    <div className="mob-show np" style={{display:'none',position:'fixed',bottom:0,left:0,right:0,zIndex:200,background:C.ink,borderTop:`2px solid ${C.lime}`,padding:'8px 14px 10px',boxShadow:'0 -4px 24px rgba(0,0,0,0.4)'}}>
      {/* Section name */}
      <div style={{textAlign:'center',marginBottom:'7px'}}>
        <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime}}>{cur.num}</span>
        <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,color:'rgba(250,248,243,0.4)',letterSpacing:'1.5px',textTransform:'uppercase',marginLeft:'8px'}}>{cur.title}</span>
      </div>
      {/* Controls row */}
      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
        {/* Prev */}
        <button onClick={()=>active>0&&scrollTo(NAV_SECTIONS[active-1].id)}
          style={{background:'transparent',border:`1px solid rgba(255,255,255,${active>0?'0.18':'0.06'})`,color:`rgba(250,248,243,${active>0?'0.7':'0.2'})`,padding:'7px 12px',fontFamily:F.sans,fontSize:'11px',fontWeight:700,cursor:active>0?'pointer':'default',flexShrink:0}}>
          ←
        </button>
        {/* Dots */}
        <div style={{flex:1,display:'flex',gap:'4px',justifyContent:'center',alignItems:'center'}}>
          {NAV_SECTIONS.map((_,i) => (
            <div key={i} onClick={()=>scrollTo(NAV_SECTIONS[i].id)} style={{
              width:i===active?'20px':'5px',height:'5px',borderRadius:'3px',
              background:i===active?C.lime:'rgba(255,255,255,0.18)',
              cursor:'pointer',transition:'all 0.3s ease',flexShrink:0
            }}/>
          ))}
        </div>
        {/* Next or CTA */}
        {active < NAV_SECTIONS.length-1
          ? <button onClick={()=>scrollTo(NAV_SECTIONS[active+1].id)}
              style={{background:C.forest,border:'none',color:C.lime,padding:'7px 12px',fontFamily:F.sans,fontSize:'11px',fontWeight:700,cursor:'pointer',flexShrink:0}}>
              →
            </button>
          : <a href="#" style={{background:C.lime,color:C.ink,padding:'7px 12px',fontFamily:F.sans,fontSize:'9px',fontWeight:800,textDecoration:'none',letterSpacing:'1px',flexShrink:0}}>ENGAGE →</a>
        }
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// TOPBAR
// ─────────────────────────────────────────────────────────────────────────────
const TopBar = ({coverLogoRef}) => {
  const [past, setPast] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const fn = () => {
      if (!coverLogoRef?.current) return;
      setPast(coverLogoRef.current.getBoundingClientRect().bottom < 0);
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    };
    window.addEventListener('scroll', fn, {passive:true});
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <div className="np pad-topbar" style={{position:'sticky',top:0,zIndex:100,background:C.paper,borderBottom:`1px solid ${C.border}`,padding:'10px 40px',display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 1px 8px rgba(0,0,0,0.06)',overflow:'hidden'}}>
      <div className="progress-bar" style={{width:`${progress}%`}}/>
      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
        <div style={{overflow:'hidden',maxWidth:past?'200px':'0px',opacity:past?1:0,transition:'max-width 0.35s ease,opacity 0.3s ease',display:'flex',alignItems:'center'}}>
          <Logo height={20} variant="dark"/>
          <div style={{width:'1px',height:'16px',background:C.border,margin:'0 10px',flexShrink:0}}/>
        </div>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>Ghana Cannabis Intelligence · Licence 09 · Export · Members Brief</span>
        <span className="mob-show" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>09 · Export</span>
      </div>
      <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
        <div className="mob-hide" style={{background:C.lime,color:C.ink,padding:'4px 10px',fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase'}}>MEMBERS BRIEF</div>
        <a href="#" style={{background:C.forest,color:C.lime,padding:'7px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none',letterSpacing:'0.3px'}}>Engage BRIDGE →</a>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// COVER
// ─────────────────────────────────────────────────────────────────────────────
const Cover = ({logoRef}) => (
  <div className="pad-cover" style={{background:C.ink,padding:'48px 64px 0',position:'relative',overflow:'hidden'}}>
    <div style={{position:'absolute',right:'-20px',top:'-30px',fontFamily:F.display,fontSize:'clamp(180px,35vw,480px)',fontWeight:900,color:'rgba(255,255,255,0.022)',pointerEvents:'none',userSelect:'none',letterSpacing:'-12px',lineHeight:1}}>09</div>
    <div style={{maxWidth:'900px',margin:'0 auto',position:'relative'}}>
      <div ref={logoRef} style={{marginBottom:'36px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Logo height={30} variant="white"/>
        <div className="mob-hide" style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(250,248,243,0.22)',letterSpacing:'0.8px'}}>MARCH 2026 · NCC L.I. 2475</div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px',flexWrap:'wrap'}}>
        <div style={{background:C.lime,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'3px',textTransform:'uppercase',color:C.ink}}>LICENCE 09 · TRADE</div>
        <div style={{border:`1px solid ${C.lime}`,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime}}>CORE TIER</div>
        <div className="mob-hide" style={{border:`1px solid rgba(255,255,255,0.15)`,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.4)'}}>MEMBERS INTELLIGENCE</div>
      </div>
      <h1 style={{fontFamily:F.display,fontSize:'clamp(30px,5.5vw,68px)',fontWeight:900,color:C.paper,lineHeight:1.08,marginBottom:'20px',maxWidth:'800px'}}>
        Export<br/>
        <span style={{fontWeight:400,fontStyle:'italic',color:'rgba(250,248,243,0.55)',fontSize:'0.72em'}}>The Revenue Multiplier — Where Ghana's Hemp Economy Meets Global Prices</span>
      </h1>
      <PullQuote onDark>
        Ghana has Tema port. Lesotho, Zimbabwe, and Malawi do not. Ghana has the EU-Ghana EPA delivering duty-free access. Ghana has AGOA, ECOWAS, and AfCFTA. Ghana has English language, political stability, and a functioning banking system. For hemp export, geography is destiny — and Ghana has the geography.
      </PullQuote>
      <div style={{borderTop:`1px solid rgba(255,255,255,0.09)`,paddingTop:'28px',marginTop:'8px',display:'flex',flexWrap:'wrap'}} className="stats-row">
        {[
          {v:'80',        l:'BRIDGE Score™',                s:'Core Tier · Trade — Highest in Series'},
          {v:'$122M+',    l:'Global Hemp Export Trade',      s:'UNCTAD 2022 — seed + fibre alone; CBD adds billions'},
          {v:'0%',        l:'EU Duty on Ghana Hemp',         s:'EU-Ghana EPA — duty-free quota-free access'},
          {v:'EU + UK + US',l:'Primary Target Markets',     s:'EPA · DCTS · AGOA — triple preferential access'},
          {v:'$30B',      l:'Global Hemp Market 2030',       s:'From ~$6.5B in 2024 — CAGR 17.5%'},
        ].map((s,i) => (
          <div key={i} style={{flex:'1 1 20%',minWidth:'140px',padding:'18px 20px 22px',borderRight:i<4?`1px solid rgba(255,255,255,0.07)`:'none'}}>
            <div style={{fontFamily:F.mono,fontSize:'clamp(18px,2.2vw,26px)',fontWeight:500,color:C.lime,lineHeight:1,marginBottom:'6px'}}>{s.v}</div>
            <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.38)',marginBottom:'4px'}}>{s.l}</div>
            <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:'rgba(250,248,243,0.24)',lineHeight:1.4}}>{s.s}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// TABLE OF CONTENTS
// ─────────────────────────────────────────────────────────────────────────────
const TOC = () => (
  <div className="pad-section" style={{background:C.paperDark,padding:'40px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'20px',flexWrap:'wrap',gap:'10px'}}>
        <div>
          <Eyebrow>Full Document Contents</Eyebrow>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(16px,2vw,22px)',fontWeight:700,color:C.ink}}>What This Brief Covers</h2>
        </div>
        <div style={{fontFamily:F.mono,fontSize:'10px',color:C.faint,letterSpacing:'0.5px'}}>11 Sections · Members Access</div>
      </div>
      <div className="toc-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0'}}>
        {[
          {n:'01',t:'Why Now — The February 2026 Milestone',s:'Export licence opens access to $30B global market from Ghana',id:'s01'},
          {n:'02',t:'The Export Thesis',s:'Ghana geography + trade agreements = structural export advantage',id:'s02'},
          {n:'03',t:'Export Market Analysis',s:'EU · UK · US · Asia — destination markets, regulations, pricing',id:'s03'},
          {n:'04',t:'Business Models',s:'4 export models — commodity to branded pharmaceutical',id:'s04'},
          {n:'05',t:'Unit Economics',s:'FOB pricing, margin structure, 4 product categories',id:'s05'},
          {n:'06',t:'Value Chain Position',s:"Export's role — the highest-value exit for Ghana hemp products",id:'s06'},
          {n:'07',t:'Competitive Landscape',s:'Ghana vs. 7 African peers — export infrastructure comparison',id:'s07'},
          {n:'08',t:'Regulatory Roadmap',s:'NCC export permit, PPRSD, FDA, destination-market compliance',id:'s08'},
          {n:'09',t:'Risk Register',s:'Full matrix — 8 risks, severity, mitigations',id:'s09'},
          {n:'10',t:'BRIDGE Impact Score™',s:'4-dimension analysis, composite 80/100',id:'s10'},
          {n:'11',t:'Deployment Parameters',s:'Capital, team, certifications, first-buyer acquisition',id:'s11'},
        ].map((r,i) => (
          <div key={i} className="toc-item" style={{display:'flex',gap:'14px',padding:'10px 0',borderBottom:`1px solid ${C.border}`,alignItems:'flex-start'}}
            onClick={()=>document.getElementById(r.id)?.scrollIntoView({behavior:'smooth',block:'start'})}>
            <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.lime,flexShrink:0,marginTop:'2px',minWidth:'22px'}}>{r.n}</span>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'2px'}}>{r.t}</div>
              <div className="toc-sub" style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted}}>{r.s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 01 — WHY NOW
// ─────────────────────────────────────────────────────────────────────────────
const WhyNow = () => (
  <div id="s01" className="pad-section" style={{background:C.paper,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 01" title="Why Now" stat="Feb 2026" label="Export Window Opens" defaultOpen={true}>
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 01</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Why Now</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'32px',maxWidth:'700px'}}>26 February 2026: Ghana Opens the Only West African Hemp Export Licence — Into a $30 Billion Global Market</h2>
      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr',gap:'48px'}} className="tc">
        <div>
          <p className="dc" style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            On 26 February 2026, Ghana launched the only comprehensive cannabis licensing regime in West Africa — and with it, the only legal hemp export pathway from a region of 400 million people. The global industrial hemp market was approximately $6.5 billion in 2024 and is projected to reach $16–30 billion by 2030 at a CAGR of 17.5%. High-value segments — pharmaceutical-grade CBD APIs, premium organic hemp foods, sustainable hemp textiles — sit well above commodity pricing. Ghana can reach them all.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            Ghana's structural export advantages are significant and largely non-replicable by African competitors. The EU-Ghana EPA delivers duty-free, quota-free access to the EU for qualifying hemp products. AGOA provides preferential US access. The UK Developing Countries Trading Scheme extends similar preferences. Tema port handles 85% of national trade and serves as the primary ECOWAS logistics hub. Ghana has English language, political stability, and an established agro-export sector (cocoa, cashew, shea) with compliance infrastructure that cannabis exporters can leverage.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink}}>
            The export licence is the highest BRIDGE score in the series at 80/100 — reflecting the genuine strategic opportunity of connecting Ghana hemp production to global premium markets with exceptional trade agreement coverage. It is also the most complex and most resource-intensive position. Success in export requires GMP or equivalent certifications, ISO 17025 COAs from accredited labs, phytosanitary documentation, and deep knowledge of destination-market regulations. The prize is large. The pathway requires serious capability.
          </p>
        </div>
        <div>
          <div style={{background:C.ink,padding:'24px',marginBottom:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>Export Framework at a Glance</div>
            {[
              {l:'NCC Licence',v:'Licence 09 · Export'},
              {l:'EU access',v:'EU-Ghana EPA — duty-free, quota-free'},
              {l:'US access',v:'AGOA — preferential for qualifying products'},
              {l:'UK access',v:'DCTS — Developing Countries Trading Scheme'},
              {l:'THC limit',v:'≤ 0.3% Ghana; some markets require lower'},
              {l:'Export docs',v:'NCC permit · PPRSD · COA · cert of origin'},
              {l:'GMP required',v:'For pharmaceutical API and extract export'},
              {l:'Applications',v:'Open · March 2026'},
            ].map((r,i) => (
              <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:i<7?`1px solid rgba(255,255,255,0.07)`:'none',gap:'10px'}}>
                <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.38)',flexShrink:0}}>{r.l}</span>
                <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.paper,textAlign:'right'}}>{r.v}</span>
              </div>
            ))}
          </div>
          <div style={{borderLeft:`3px solid ${C.lime}`,paddingLeft:'14px'}}>
            <p style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.muted,lineHeight:1.6}}>
Ghana is the only West African country with a functioning cannabis export licence framework in 2026. Lesotho and Zimbabwe have head starts in regulatory experience but are landlocked. Ghana's Tema port, trade agreement portfolio (EPA + AGOA + DCTS), and ECOWAS logistics infrastructure create a structural export advantage that no other African cannabis nation can replicate.
            </p>
          </div>
        </div>
      </div>
      {/* Timeline visual */}
      <div style={{marginTop:'40px',borderTop:`1px solid ${C.border}`,paddingTop:'28px'}}>
        <Eyebrow>Export Opportunity Timeline · 2026–2032</Eyebrow>
        <div style={{display:'flex',gap:'0',marginTop:'14px',overflowX:'auto'}} className="chain-scroll">
          {[
            {yr:'2020',ev:'Act 1019 enacted',sub:'Section 43 introduces cannabis licensing framework',col:C.muted},
            {yr:'2021',ev:'Section 43 repealed',sub:'Inadvertent repeal in subsequent legislation creates legal gap',col:C.amber},
            {yr:'2023',ev:'Act 1100 passed',sub:'Section 43 reinstated; licensing framework restored',col:C.forest},
            {yr:'2024',ev:'L.I. 2475 gazetted',sub:'Operational regulations — 11 categories, NCC authority confirmed',col:C.forest},
            {yr:'Feb 2026',ev:'Launch event',sub:'Minister officially opens applications for all 11 licence categories',col:C.lime},
            {yr:'Now',ev:'Applications open',sub:'12–24 month first-mover window before competition intensifies',col:C.lime},
          ].map((e,i) => (
            <div key={i} style={{flexShrink:0,width:'160px',borderLeft:`3px solid ${e.col}`,paddingLeft:'12px',paddingRight:'8px'}}>
              <div style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:e.col,marginBottom:'4px'}}>{e.yr}</div>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,lineHeight:1.3,marginBottom:'4px'}}>{e.ev}</div>
              <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.muted,lineHeight:1.5}}>{e.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </MobileCollapse>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 02 — THE CULTIVATION THESIS
// ─────────────────────────────────────────────────────────────────────────────
const Thesis = () => (
  <div id="s02" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 02" title="The Thesis" stat="$30B" label="2030 Global Hemp Market">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 02</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>The Export Thesis</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'32px',maxWidth:'680px'}}>Every Downstream Opportunity Runs Through This Licence</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px'}} className="tc">
        <div>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            Export (Licence 09) is the highest-value position in Ghana's cannabis value chain — the exit point where domestic production meets global prices. The industrial hemp market will reach $16–30 billion by 2030. Premium segments command extraordinary per-kg prices: pharmaceutical-grade CBD APIs at $1,000–8,000/kg, organic hemp seed oil at $8–25/litre, GMP-certified broad-spectrum extract at $500–3,000/kg. Ghana needs to be in these markets — and it has the trade agreement infrastructure to get there.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            The EU-Ghana Economic Partnership Agreement provides duty-free, quota-free access to the EU's 450M-consumer market for qualifying hemp products. AGOA covers preferential US access for processed agricultural goods and textiles. The UK Developing Countries Trading Scheme extends enhanced preferences for Ghanaian exports. No other sub-Saharan African country with a cannabis framework has all three simultaneously — and no other West African country has any cannabis export framework at all.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink}}>
            Lesotho has 6 years of cannabis export experience but is landlocked, has no port, and routes all exports through South Africa's Durban port at significant cost and complexity. Zimbabwe and Malawi face the same landlocked constraint. Ghana's Tema port sits 30km from Accra, handles 3.7 million TEUs annually, has a direct container service to Rotterdam, Hamburg, Antwerp, and Felixstowe, and is expanding. This is the non-replicable advantage.
          </p>
        </div>
        <div>
          <PullQuote>
            Lesotho was first. Zimbabwe was second. Ghana's cannabis sector launches with every structural advantage those countries lack — a deep-water port, duty-free EU access, AGOA to the US, and the ECOWAS logistics network. The question is not whether Ghana can export hemp. It is who gets there first.
          </PullQuote>
          <div style={{background:C.paper,border:`1px solid ${C.border}`,padding:'20px',marginTop:'8px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Global Hemp Market — Key Export Segments Growth (USD Billions)</div>
            {/* SVG Bar Chart */}
            <svg viewBox="0 0 340 140" style={{width:'100%',display:'block'}}>
              {[
                {yr:'2022',v:35,val:'~$5B'},
                {yr:'2024',v:55,val:'$6.5B'},
                {yr:'2026',v:70,val:'$9B est.'},
                {yr:'2027',v:82,val:'$12B est.'},
                {yr:'2029',v:98,val:'$18B est.'},
                {yr:'2030',v:115,val:'$30B+'},
              ].map((d,i) => (
                <g key={i}>
                  <rect x={10+i*54} y={140-d.v-20} width={38} height={d.v} fill={i===5?C.lime:i>=4?C.limeDark:C.border}/>
                  <text x={29+i*54} y={135} textAnchor="middle" style={{fontFamily:'DM Sans,sans-serif',fontSize:'8px',fill:C.muted}}>{d.yr}</text>
                  <text x={29+i*54} y={140-d.v-25} textAnchor="middle" style={{fontFamily:'DM Mono,monospace',fontSize:'8px',fontWeight:700,fill:i>=4?C.forest:C.muted}}>{d.val}</text>
                </g>
              ))}
              <text x={10} y={12} style={{fontFamily:'DM Sans,sans-serif',fontSize:'9px',fill:C.faint}}>USD Billions — Global hemp industrial market projection (CAGR 17.5%)</text>
            </svg>
            <div style={{marginTop:'8px',display:'flex',gap:'12px',flexWrap:'wrap'}}>
              {[{c:C.border,l:'Historical'},{c:C.limeDark,l:'Projected'},{c:C.lime,l:'2030 target $30B+'}].map((s,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:'5px'}}>
                  <div style={{width:'10px',height:'10px',background:s.c,flexShrink:0}}/>
                  <span style={{fontFamily:F.sans,fontSize:'9px',color:C.muted}}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* 4 demand drivers */}
      <div style={{marginTop:'40px',borderTop:`1px solid ${C.border}`,paddingTop:'28px'}}>
        <Eyebrow>Four High-Value Export Segments for Ghana</Eyebrow>
        {/* Desktop grid */}
        <div className="mob-hide" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'0',marginTop:'14px'}}>
          {[
            {n:'Pharmaceutical APIs',d:'GMP-certified CBD isolate and broad-spectrum extract for EU/UK pharmaceutical manufacturers. $1,000–8,000/kg — the highest margin export in the entire value chain. Requires EU-GMP certification.'},
            {n:'Organic Hemp Foods',d:'Hemp seed oil, protein powder, hemp hearts for EU/UK/US health food market. CAGR 13–16%. Ghana can achieve organic certification and fair-trade premium positioning analogous to Ghana cocoa.'},
            {n:'Hemp Fibre & Textiles',d:'Sustainable textile demand from EU fast fashion brands. Hempcrete for UK and European low-carbon construction. Hemp composite materials for automotive and packaging.'},
            {n:'CBD Ingredients',d:'Bulk CBD isolate and broad-spectrum extracts for EU/UK cosmetics and nutraceutical manufacturers. EU Novel Food authorisation required but achievable. $200–500/kg at pharmaceutical-nutraceutical grade.'},
          ].map((d,i) => (
            <div key={i} style={{padding:'16px',borderRight:i<3?`1px solid ${C.border}`:'none',borderTop:'none'}}>
              <div style={{width:'28px',height:'3px',background:C.lime,marginBottom:'10px'}}/>
              <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'8px',lineHeight:1.3}}>{d.n}</div>
              <p style={{fontFamily:F.body,fontSize:'11px',fontWeight:300,color:C.muted,lineHeight:1.6}}>{d.d}</p>
            </div>
          ))}
        </div>
        {/* Mobile swipe carousel */}
        <MobCarousel items={[
          {n:'Pharmaceutical APIs',icon:'💊',d:'GMP-certified CBD isolate and extracts for EU/UK pharmaceutical manufacturers. $1,000–8,000/kg — highest-margin export in the value chain.'},
          {n:'Organic Hemp Foods',icon:'🌿',d:'Hemp seed oil, protein, hearts for EU/UK/US health food market. Ghana can achieve organic + fair-trade premium analogous to Ghana cocoa positioning.'},
          {n:'Hemp Fibre & Textiles',icon:'🧵',d:'Sustainable textile demand from EU fashion brands. Hempcrete for UK/EU low-carbon construction. Hemp composites for automotive and packaging.'},
          {n:'CBD Ingredients',icon:'🔬',d:'Bulk CBD isolate and broad-spectrum for EU/UK cosmetics and nutraceuticals. EU Novel Food authorisation achievable. $200–500/kg at quality grade.'},
        ]} renderCard={(d,i) => (
          <div style={{background:C.paperDark,padding:'20px',height:'100%',minHeight:'160px'}}>
            <div style={{fontSize:'28px',marginBottom:'12px'}}>{d.icon}</div>
            <div style={{width:'24px',height:'3px',background:C.lime,marginBottom:'10px'}}/>
            <div style={{fontFamily:F.sans,fontSize:'14px',fontWeight:700,color:C.ink,marginBottom:'10px',lineHeight:1.3}}>{d.n}</div>
            <p style={{fontFamily:F.body,fontSize:'13px',fontWeight:300,color:C.muted,lineHeight:1.65}}>{d.d}</p>
          </div>
        )}/>
      </div>
    </MobileCollapse>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 03 — GHANA AGRO-ECOLOGICAL FIT
// ─────────────────────────────────────────────────────────────────────────────
const GhanaFit = () => (
  <div id="s03" className="pad-section" style={{background:C.paper,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 03" title="Ghana Fit" stat="4 Markets" label="EU · UK · US · Asia">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 03</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Export Market Analysis</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'12px',maxWidth:'700px'}}>Four Markets, Three Trade Agreements, One Port — Ghana's Export Architecture</h2>
      <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'32px',maxWidth:'700px'}}>
        Ghana has preferential access to the EU, UK, and US simultaneously — a combination no other African hemp producer matches. Each market has distinct regulatory requirements, product preferences, and pricing structures. The export strategy must match product category to market regulatory reality.
      </p>
      <div className="mob-hide" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',marginBottom:'32px'}}>
        {[
          {
            market:'European Union — Primary Target Market',tier:'HIGHEST VALUE',color:C.lime,
            access:'EU-Ghana EPA: duty-free, quota-free access for qualifying hemp products',
            demand:'Hemp foods (Novel Food approval needed for CBD), organic hemp seed oil, hemp fibre, textiles, pharmaceutical APIs (EU-GMP)',
            barrier:'EU Novel Food Regulation: CBD food/nutraceutical products require novel-food safety dossier and Commission authorisation before commercial sale',
            prize:'$200–500 per kg for quality hemp seed oil; $1,000–8,000/kg for pharmaceutical CBD APIs; EU is largest hemp ingredient import market',
            note:'Start with hemp seed (food/feed) and fibre — no novel food barrier. Layer CBD ingredients as Novel Food dossier progresses.',
          },
          {
            market:'United Kingdom — Priority Secondary Market',tier:'HIGH VALUE',color:C.lime,
            access:'UK DCTS: Developing Countries Trading Scheme — enhanced preferences, zero/reduced tariffs for Ghana',
            demand:'Hemp foods, CBD topicals and cosmetics (FSA approved list), hemp textiles, pharmaceutical APIs',
            barrier:'FSA Novel Food rules for CBD foods: pre-market authorisation required. CBD cosmetics: CPSR safety assessment required.',
            prize:'UK is one of Europe largest CBD consumer markets. Hemp foods growing at CAGR 15%+. DCTS removes tariff barrier.',
            note:'UK FSA has approved some pre-Novel Food CBD products temporarily. Enter with approved categories first; novel food dossier for new products.',
          },
          {
            market:'United States — Long-Term Strategic Market',tier:'MEDIUM-HIGH',color:C.limeDark,
            access:'AGOA: preferential access for qualifying processed agricultural products and textiles',
            demand:'Hemp foods (seed, oil, protein — FDA GRAS approved), hemp textiles, organic inputs, CBD ingredients (regulatory uncertainty)',
            barrier:'FDA does not recognise CBD as a dietary supplement ingredient without specific approval. Hemp seed oil and foods are permitted. AGOA covers processed goods.',
            prize:'Largest consumer wellness market globally. Hemp foods $1.5B+ category. AGOA duty elimination for qualifying textiles.',
            note:'Focus on FDA-permitted hemp foods (seed, oil, protein) and hemp textiles under AGOA. CBD regulatory clarity may come post-2026.',
          },
          {
            market:'Japan, South Korea, Australia — Niche Premium',tier:'EMERGING',color:C.amber,
            access:'Standard WTO most-favoured-nation terms; no comprehensive FTA — transport cost disadvantage',
            demand:'Japan: hemp foods and CBD pharmaceuticals under strict conditions. South Korea: CBD medicines only. Australia: hemp foods + medicinal cannabis.',
            barrier:'Japan and South Korea require very low THC limits (0% to trace); strict import documentation. Australia permits hemp foods but has complex pharmaceutical import process.',
            prize:'Japan hemp food market is growing; premium pricing for certified, traceable products. Australia medicinal cannabis import demand is real.',
            note:'Asian markets are long-term plays — enter EU/UK/US first. Asian market entry requires dedicated regulatory engagement per country.',
          },
        ].map((r,i) => (
          <div key={i} style={{border:`1px solid ${C.border}`,padding:'20px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
              <div style={{fontFamily:F.display,fontSize:'14px',fontWeight:700,color:C.ink,lineHeight:1.2,paddingRight:'12px'}}>{r.market}</div>
              <div style={{background:r.color,color:r.color===C.amber?C.ink:C.ink,padding:'2px 8px',fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0,whiteSpace:'nowrap'}}>{r.tier}</div>
            </div>
            {[{l:'Access',v:r.access},{l:'Demand',v:r.demand},{l:'Barrier',v:r.barrier},{l:'Prize',v:r.prize}].map((f,j) => (
              <div key={j} style={{display:'flex',gap:'8px',marginBottom:'5px'}}>
                <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,minWidth:'54px',flexShrink:0,marginTop:'2px'}}>{f.l.toUpperCase()}</span>
                <span style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.5}}>{f.v}</span>
              </div>
            ))}
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'8px',marginTop:'10px'}}>
              <p style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint}}>{r.note}</p>
            </div>
          </div>
        ))}
      </div>
      <MobCarousel items={[
        {market:'European Union',tier:'HIGHEST VALUE',color:C.lime,access:'EU-Ghana EPA: duty-free, quota-free',demand:'Hemp foods, organic seed oil, fibre, textiles, pharmaceutical APIs',barrier:'Novel Food Regulation for CBD foods — dossier required',prize:'$200–500/kg seed oil; $1,000–8,000/kg pharmaceutical API',note:'Start with hemp seed and fibre; layer CBD as Novel Food progresses'},
        {market:'United Kingdom',tier:'HIGH VALUE',color:C.lime,access:'UK DCTS: enhanced preferences, zero/low tariffs',demand:'Hemp foods, CBD topicals, textiles, pharmaceutical APIs',barrier:'FSA Novel Food rules; CPSR for cosmetics',prize:'Large CBD consumer market; hemp foods CAGR 15%+',note:'Enter with FSA-approved categories first'},
        {market:'United States',tier:'MEDIUM-HIGH',color:C.limeDark,access:'AGOA: processed agricultural + textiles',demand:'Hemp foods (GRAS), hemp textiles, organic inputs',barrier:'FDA uncertainty on CBD supplement status',prize:'Largest wellness market; hemp foods $1.5B+',note:'Focus on FDA-permitted foods and textiles under AGOA'},
        {market:'Japan/Korea/Australia',tier:'EMERGING',color:C.amber,access:'Standard WTO MFN — no FTA',demand:'Hemp foods, CBD pharmaceuticals (strict)',barrier:'Very low THC limits; country-specific pharmaceutical import rules',prize:'Premium pricing for certified products',note:'Long-term play — enter EU/UK/US first'},
      ]} renderCard={(r,i) => (
        <div style={{border:`1px solid ${C.border}`,background:C.paper,padding:'18px',height:'100%'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
            <div style={{fontFamily:F.display,fontSize:'15px',fontWeight:700,color:C.ink,lineHeight:1.2}}>{r.market}</div>
            <div style={{background:r.color,color:C.ink,padding:'3px 8px',fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0,marginLeft:'8px'}}>{r.tier}</div>
          </div>
          {[{l:'Access',v:r.access},{l:'Demand',v:r.demand},{l:'Barrier',v:r.barrier},{l:'Prize',v:r.prize}].map((f,j) => (
            <div key={j} style={{display:'flex',gap:'8px',marginBottom:'6px'}}>
              <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,minWidth:'52px',flexShrink:0,paddingTop:'2px'}}>{f.l.toUpperCase()}</span>
              <span style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.45}}>{f.v}</span>
            </div>
          ))}
          <div style={{borderTop:`2px solid ${r.color}`,paddingTop:'8px',marginTop:'10px'}}>
            <p style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint}}>{r.note}</p>
          </div>
        </div>
      )}/>
      <div style={{background:C.paperDark,padding:'24px',borderTop:`3px solid ${C.ink}`}}>
        <Eyebrow>Export Certification Requirements by Product Category</Eyebrow>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'0',marginTop:'14px'}} className="tc">
          {[
            {param:'Hemp Seed (food/feed)',req:'PPRSD phytosanitary · COA · cert of origin',ghana:'Ghana cocoa export experience transferable',fit:'★★★★☆'},
            {param:'Hemp Fibre / Textiles',req:'COA · cert of origin · GOTS/organic cert for premium',ghana:'Textile export infrastructure exists; GIZ programme precedent',fit:'★★★☆☆'},
            {param:'Hemp Seed Oil / Protein',req:'HACCP · ISO 22000 · organic cert · food safety',ghana:'FDA Ghana food manufacturing standards; upgrade needed for EU',fit:'★★★☆☆'},
            {param:'CBD Ingredients',req:'EU-GMP or ISO/GMP · COA · Novel Food auth.',ghana:'No GMP manufacturer yet; major investment required',fit:'★★☆☆☆'},
            {param:'Pharmaceutical APIs',req:'EU-GMP · pharmacopoeia standard · EMA-aligned',ghana:'GMP certification 18–24 months from investment decision',fit:'★★☆☆☆'},
          ].map((p,i) => (
            <div key={i} style={{padding:'12px 14px',borderRight:i<4?`1px solid ${C.border}`:'none'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>{p.param}</div>
              <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.ink,marginBottom:'2px'}}>Required: {p.req}</div>
              <div style={{fontFamily:F.body,fontSize:'10px',color:C.muted,marginBottom:'4px'}}>Ghana: {p.ghana}</div>
              <div style={{color:C.lime,fontSize:'11px',letterSpacing:'1px'}}>{p.fit}</div>
            </div>
          ))}
        </div>
      </div>
    </MobileCollapse>
    </div>
  </div>
);
// ─────────────────────────────────────────────────────────────────────────────
// SECTION 04 — BUSINESS MODELS
// ─────────────────────────────────────────────────────────────────────────────
const BusinessModels = () => {
  const [secOpen, setSecOpen] = useState(false);
  const [active, setActive] = useState(0);
  const models = [
    {
      n:'01',name:'Hemp Commodity Exporter',tag:'ENTRY LEVEL',color:C.teal,
      tagline:'Hemp seed, fibre, and biomass. Lower certification barrier. Scale via aggregation.',
      scale:'5–50 tonne initial shipments · EU/UK buyers · commodity trading platform',
      capital:'$50K–200K (aggregation, drying, cleaning, PPRSD/NCC export permit)',
      timeline:'12–18 months to first export',
      revenue:'$800–2,500/tonne for hemp seed; $400–1,200/tonne for cleaned fibre; margin on FOB price',
      fit:'★★★★☆ Lowest certification requirement; proves export capability; cash flow generator',
      description:'The hemp commodity exporter aggregates biomass from Licence 01 cultivation holders, provides basic post-harvest processing (drying, cleaning, grading), and sells to EU/UK commodity buyers under standard hemp food or industrial raw material classification. No novel food authorisation required for hemp seed — it is an established food ingredient in the EU. Fibre exports for textile and industrial use face no novel food barrier. This model proves the export logistics chain, builds buyer relationships, and generates cash flow while higher-value certifications (organic, GMP) are being pursued in parallel.',
      requirements:['NCC Export Licence (Licence 09)','PPRSD phytosanitary certificate for plant material exports','Certificate of origin (Ghana Standards Authority or GEPA)','COA from NCC-approved testing lab confirming ≤0.3% THC','EU buyer import permit or notification where required by destination country'],
      advantages:['Lowest regulatory barrier — hemp seed and fibre are not novel foods in EU','Proves export capability and builds buyer relationships before investing in GMP certification','GEPA (Ghana Export Promotion Authority) provides market linkage support for agro-exports','EU-Ghana EPA delivers duty-free access — competitive pricing against non-EPA competitors'],
      risks:['Lowest per-kg value — commodity pricing means margins depend on volume and logistics efficiency','Quality consistency is critical — EU buyers return for second order only if COA quality is maintained','Competition from established hemp exporters in EU, Canada, China at commodity price level'],
      ideal:'Processing licence holders with excess output; agri-commodity export companies adding hemp to portfolio; first-time hemp exporters building market knowledge',
    },
    {
      n:'02',name:'Organic Hemp Foods Exporter',tag:'PREMIUM SEGMENT',color:C.forest,
      tagline:'Organic certified. Hemp seed oil, protein, hearts. EU/UK health food market.',
      scale:'Tonnes of processed hemp food products · EU/UK health food buyers · B2B ingredient supply',
      capital:'$150K–500K (organic certification, food-grade processing, HACCP, ISO 22000)',
      timeline:'18–30 months to first certified export',
      revenue:'$8–25/litre hemp seed oil; $5–12/kg protein powder; 3–5× commodity mark-up for organic',
      fit:'★★★★☆ Strong margin — organic and fair-trade premium captures Ghana origin story value',
      description:'The organic hemp foods exporter builds a certified production system — organic cultivation (EU Organic or USDA Organic certification), food-grade pressing (cold-press seed oil), protein extraction, and hulling (hemp hearts) — targeting the premium EU and UK health food, vegan, and sports-nutrition markets. Organic and fair-trade certifications are the key differentiators: EU buyers pay 3–5× commodity price for certified organic hemp seed oil and protein from a documented, traceable African origin. Ghana can build a country-of-origin brand analogous to Ghana cocoa — a provenance story that commands premium in the EU organic food market.',
      requirements:['NCC Export Licence (Licence 09)','EU Organic certification (or USDA Organic for US market) — 3-year transition period from first non-organic cultivation','Food-grade processing: cold-press oil extraction, hull separator, protein isolator — ISO 22000 or HACCP','Ghana FDA food manufacturing licence for the processing facility','Full traceability documentation: field-to-bottle COA chain'],
      advantages:['3–5× commodity price for certified organic products in EU/UK market','Ghana origin story is compelling — ethical sourcing narrative drives premium in European health food retail','GEPA supports participation in EU food ingredient trade fairs (BIOFACH, FiE)','EU-Ghana EPA duty-free access eliminates tariff barrier vs. non-EPA hemp food exporters'],
      risks:['3-year organic transition period before first certified organic product export','HACCP/ISO 22000 food processing certification requires process and infrastructure investment','EU buyer market requires consistent quality across seasons — single-season supply disruption can cost buyer relationship'],
      ideal:'Processing licence holders with food-grade capacity; agro-processing investors; impact investors targeting inclusive value chains with smallholder organic supply',
    },
    {
      n:'03',name:'CBD Ingredient Exporter',tag:'HIGH MARGIN B2B',color:C.ink,
      tagline:'Bulk CBD isolate and broad-spectrum extract. EU cosmetic and nutraceutical buyers.',
      scale:'kg to tonne scale CBD isolate · CO2 or ethanol extraction · EU/UK ingredient buyers',
      capital:'$300K–1.5M (GMP-aligned extraction plant, analytical capability, Novel Food dossier)',
      timeline:'24–48 months (Novel Food + GMP add significant time)',
      revenue:'$200–800/kg broad-spectrum extract; $500–2,000/kg CBD isolate; pharmaceutical premium 3–5×',
      fit:'★★★☆☆ Highest volume-adjusted margin — but GMP and Novel Food are major investments',
      description:'The CBD ingredient exporter produces bulk CBD isolate and broad-spectrum hemp extracts for EU and UK cosmetic manufacturers, nutraceutical companies, and ingredient distributors. The key market distinction: CBD in cosmetics is regulated separately from CBD in foods. EU CBD cosmetics require CPSR (Cosmetic Product Safety Report) per product but not Novel Food authorisation — this is an accessible near-term B2B market. CBD food ingredients (Novel Food) require a separate dossier and Commission authorisation — a longer pathway. A Ghana exporter can enter the cosmetic ingredient market first while pursuing Novel Food authorisation for food ingredient sales.',
      requirements:['NCC Export Licence (Licence 09)','GMP-aligned extraction facility (EU-GMP preferred; at minimum ISO 9001 + validated processes)','ISO 17025-accredited COA for every batch: cannabinoids, terpenes, heavy metals, pesticides, microbials, residual solvents','EU Novel Food dossier submission (if targeting food category) — or CPSR evidence for cosmetic category','Quality agreement with EU buyer specifying COA standards, batch release, and recall procedures'],
      advantages:['$200–2,000/kg vs $800–2,500/tonne commodity — extraordinary per-unit margin improvement','Cosmetic CBD category bypasses Novel Food barrier — accessible near-term EU export target','GMP investment creates pharma API pathway (next model) — stepping stone not sunk cost','B2B ingredient sales to established EU manufacturers provide volume and payment security'],
      risks:['GMP investment is $300K–1.5M — significant capital commitment','EU Novel Food authorisation timeline is 18–36 months if pursuing food category','CBD extract export from developing country requires robust COA and chain-of-custody — EU buyers conduct independent testing on arrival'],
      ideal:'Processing licence holders with extraction capability; DFI-backed export-oriented investment; vertically integrated cultivator-processor-exporter seeking maximum value capture',
    },
    {
      n:'04',name:'Pharmaceutical API Exporter',tag:'HIGHEST VALUE',color:C.limeDark,
      tagline:'EU-GMP certified. Pharmaceutical-grade CBD API. $1,000–8,000/kg. Maximum margin position.',
      scale:'GMP-certified extraction plant · validated analytical methods · EU pharma buyer contracts',
      capital:'$800K–3M (EU-GMP certification, pharma-grade facility, EMA-aligned validation)',
      timeline:'36–60 months to first pharmaceutical export',
      revenue:'$1,000–8,000/kg pharmaceutical-grade CBD API; long-term offtake contracts',
      fit:'★★★☆☆ Maximum per-kg value — requires the deepest compliance investment in the series',
      description:'The pharmaceutical API exporter achieves EU-GMP certification for a CBD extraction and purification facility, enabling sale of pharmaceutical-grade cannabinoid APIs to European pharmaceutical manufacturers, clinical trial suppliers, and licensed medicine producers. This is the apex of the Ghana cannabis export value chain — the segment where Lesotho earned global recognition for breakthrough pricing after achieving EU-GMP in greenhouse cultivation and extraction. Ghana has structural logistics and trade agreement advantages over Lesotho. The pharmaceutical API pathway requires the deepest compliance investment — EU-GMP certification, pharmacopoeia-standard analytical methods, EMA-aligned documentation — but rewards it with extraordinary margins and long-term supply contracts from EU pharmaceutical clients.',
      requirements:['NCC Export Licence (Licence 09)','EU-GMP certification for both cultivation (where applicable) and extraction/purification facility','Pharmacopoeia-standard analytical methods — ICH guidelines for pharmaceutical development','EMA scientific advice engagement for high-value indications (epilepsy, spasticity APIs)','FDA Drug Master File (DMF) or ASMF submission for US pharmaceutical customer access'],
      advantages:['$1,000–8,000/kg vs $400/tonne commodity — the export premium is 2,500–20,000× per unit mass','Long-term pharmaceutical supply contracts provide revenue predictability and attract DFI financing','Lesotho proved the model works from Africa — Ghana has better logistics and trade agreements','EU-GMP investment creates the ceiling of Ghana cannabis industry — maximum value, maximum barrier to replication'],
      risks:['EU-GMP certification timeline is 36–48 months from investment decision to first certified batch','$800K–3M capital investment — largest in the export model series','Pharmaceutical buyer qualification process is extensive — 12–24 months before first offtake contract'],
      ideal:'DFI-backed export-oriented investment platforms; pharmaceutical companies seeking African API supply diversification; long-horizon investors willing to build the highest-value position in Ghana cannabis',
    },
  ];
  const m = models[active];
  return (
    <div id="s04" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <MobileCollapse num="§ 04" title="Business Models" stat="4 Models" label="$50K to $3M Entry">
        <SectionRule/>
        <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
          <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 04</span>
          <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Business Models</span>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>Four Export Business Models — from Commodity to Pharmaceutical API</h2>
        {/* Model tabs */}
        {/* Desktop tab row */}
        <div className="mob-hide" style={{display:'flex',gap:'4px',marginBottom:'24px',overflowX:'auto'}}>
          {models.map((mod,i) => (
            <button key={i} onClick={() => setActive(i)} style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'0.8px',textTransform:'uppercase',padding:'8px 14px',border:`1px solid ${active===i?mod.color:C.border}`,background:active===i?mod.color:'transparent',color:active===i?(mod.color===C.limeDark?C.ink:C.paper):C.muted,cursor:'pointer',transition:'all 0.15s ease',whiteSpace:'nowrap',flexShrink:0}}>
              {mod.n} · {mod.name}
            </button>
          ))}
        </div>
        {/* Mobile tab row – larger touch targets */}
        <div className="mob-show" style={{display:'none',marginBottom:'20px',overflowX:'auto',gap:'0',display:'flex'}}>
          {models.map((mod,i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              fontFamily:F.sans,fontSize:'9px',fontWeight:800,letterSpacing:'1px',textTransform:'uppercase',
              padding:'12px 14px',border:'none',borderBottom:`3px solid ${active===i?mod.color:'transparent'}`,
              background:'transparent',color:active===i?mod.color:C.faint,
              cursor:'pointer',transition:'all 0.15s ease',whiteSpace:'nowrap',flexShrink:0,
            }}>
              {mod.n}
            </button>
          ))}
        </div>
        {/* Active model */}
        <div style={{background:C.paper,border:`1px solid ${C.border}`,padding:'28px'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'14px',marginBottom:'16px'}}>
            <div>
              <div style={{display:'flex',gap:'8px',marginBottom:'8px',flexWrap:'wrap'}}>
                <div style={{background:m.color,color:m.color===C.limeDark||m.color===C.lime?C.ink:C.paper,padding:'3px 10px',fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase'}}>{m.tag}</div>
              </div>
              <h3 style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,26px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'4px'}}>{m.name}</h3>
              <p style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:C.muted,lineHeight:1.5}}>{m.tagline}</p>
            </div>
            <div style={{display:'flex',gap:'20px',flexShrink:0,flexWrap:'wrap'}}>
              {[{l:'Scale',v:m.scale},{l:'Capital',v:m.capital},{l:'Timeline',v:m.timeline}].map((s,i) => (
                <div key={i}>
                  <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:C.faint,marginBottom:'3px'}}>{s.l}</div>
                  <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'18px',marginBottom:'18px'}}>
            <p style={{fontFamily:F.body,fontSize:'15px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'12px'}}>{m.description}</p>
            <div style={{background:C.paperDark,borderLeft:`3px solid ${C.lime}`,padding:'10px 14px'}}>
              <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'8px'}}>
                <span style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.forest}}><strong>Revenue potential:</strong> {m.revenue}</span>
                <span style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.muted}}>{m.fit}</span>
              </div>
            </div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'20px'}} className="tc3">
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Requirements</div>
              {m.requirements.map((r,i) => (
                <div key={i} style={{display:'flex',gap:'8px',alignItems:'flex-start',padding:'6px 0',borderBottom:`1px solid ${C.border}`}}>
                  <span style={{color:C.forest,fontFamily:F.sans,fontSize:'11px',fontWeight:700,flexShrink:0,lineHeight:1.5}}>✓</span>
                  <span style={{fontFamily:F.body,fontSize:'11px',color:C.ink,lineHeight:1.5}}>{r}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Advantages</div>
              {m.advantages.map((a,i) => (
                <div key={i} style={{display:'flex',gap:'8px',alignItems:'flex-start',padding:'6px 0',borderBottom:`1px solid ${C.border}`}}>
                  <span style={{color:C.lime,fontFamily:F.sans,fontSize:'11px',fontWeight:700,flexShrink:0,lineHeight:1.5}}>→</span>
                  <span style={{fontFamily:F.body,fontSize:'11px',color:C.ink,lineHeight:1.5}}>{a}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Key Risks</div>
              {m.risks.map((r,i) => (
                <div key={i} style={{display:'flex',gap:'8px',alignItems:'flex-start',padding:'6px 0',borderBottom:`1px solid ${C.border}`}}>
                  <span style={{color:C.amber,fontFamily:F.sans,fontSize:'11px',fontWeight:700,flexShrink:0,lineHeight:1.5}}>⚠</span>
                  <span style={{fontFamily:F.body,fontSize:'11px',color:C.ink,lineHeight:1.5}}>{r}</span>
                </div>
              ))}
              <div style={{marginTop:'14px',paddingTop:'12px',borderTop:`1px solid ${C.border}`}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>Best suited for</div>
                <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.forest,lineHeight:1.6}}>{m.ideal}</p>
              </div>
            </div>
          </div>
        </div>
        </MobileCollapse>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 05 — UNIT ECONOMICS
// ─────────────────────────────────────────────────────────────────────────────
const UnitEconomics = () => (
  <div id="s05" className="pad-section" style={{background:C.paper,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 05" title="Unit Economics" stat="$500–8K/kg" label="Pharmaceutical API Range">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 05</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Unit Economics</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'12px',maxWidth:'680px'}}>What Hemp Export Revenue Looks Like — from Commodity to Pharmaceutical</h2>
      <p style={{fontFamily:F.body,fontSize:'15px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'36px',maxWidth:'700px'}}>
        Export economics span an extraordinary range. Hemp fibre at $400/tonne vs. pharmaceutical CBD API at $8,000/kg — a 20,000× difference in per-unit value. The export thesis is about progressively moving up this curve. Entry at commodity level. Certifications unlock the next tier. GMP unlocks the top tier.
      </p>
      <div style={{background:C.paperDark,padding:'28px',marginBottom:'32px'}}>
        <Eyebrow>FOB Price Range by Product Category (USD)</Eyebrow>
        <div style={{marginTop:'18px'}}>
          {[
            {label:'Hemp fibre bales (industrial)',v:8,max:100,note:'$400–1,200/tonne — commodity pricing; volume-dependent'},
            {label:'Hemp seed food grade (organic)',v:30,max:100,note:'$800–2,500/tonne standard; $2,000–5,000/tonne organic'},
            {label:'Cold-pressed hemp seed oil (organic)',v:55,max:100,note:'$8–25/litre — 3–5× premium for organic certification'},
            {label:'CBD broad-spectrum extract (cosmetic grade)',v:75,max:100,note:'$200–800/kg — accessible without Novel Food dossier'},
            {label:'Pharmaceutical-grade CBD API (EU-GMP)',v:100,max:100,note:'$1,000–8,000/kg — requires EU-GMP; highest value in chain'},
          ].map((s,i) => (
            <div key={i} style={{marginBottom:'14px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px',flexWrap:'wrap',gap:'6px'}}>
                <div>
                  <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{s.label}</span>
                  <span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,marginLeft:'10px'}}>{s.note}</span>
                </div>
              </div>
              <div style={{height:'16px',background:C.border,position:'relative'}}>
                <div style={{position:'absolute',left:0,top:0,height:'100%',width:`${s.v}%`,background:i===4?C.lime:i>=2?C.limeDark:C.forest}}/>
              </div>
            </div>
          ))}
          <div style={{marginTop:'10px',display:'flex',gap:'6px',alignItems:'center'}}>
            <div style={{width:'10px',height:'10px',background:C.lime}}/>
            <span style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.muted}}>All prices indicative FOB Tema. Pharmaceutical prices highly variable by buyer, certification, and specification. Bar lengths are relative not absolute.</span>
          </div>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',marginBottom:'32px'}} className="tc">
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Revenue Scenarios by Model</div>
          {[
            {item:'50 tonne hemp seed export (organic)',range:'$100K–250K',pct:'Per shipment',note:'One container of organic hemp seed at $2,000–5,000/tonne FOB Tema'},
            {item:'10 tonne hemp fibre bale export',range:'$4K–12K',pct:'Per container',note:'Commodity fibre — volume play; lower per-tonne value'},
            {item:'1 tonne hemp seed oil (organic cold-press)',range:'$8K–25K',pct:'Per tonne',note:'High-value food ingredient; smaller volumes, better margin'},
            {item:'100 kg CBD cosmetic extract (broad-spectrum)',range:'$20K–80K',pct:'Per lot',note:'Cosmetic-grade extract for EU cosmetics manufacturers'},
            {item:'10 kg pharmaceutical CBD API (EU-GMP)',range:'$10K–80K',pct:'Per lot',note:'Pharmaceutical pricing; small volume extremely high value'},
            {item:'Annual pharma supply contract (50 kg/yr)',range:'$50K–400K/yr',pct:'Long-term',note:'Pharmaceutical offtake contract at contracted API price'},
          ].map((r,i) => (
            <div key={i} className="mob-cost-row" style={{display:'grid',gridTemplateColumns:'1.4fr 0.7fr 0.5fr',gap:'8px',padding:'8px 0',borderBottom:`1px solid ${C.border}`,alignItems:'baseline'}}>
              <div>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink}}>{r.item}</div>
                <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint,marginTop:'1px'}}>{r.note}</div>
              </div>
              <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.forest}}>{r.range}</span>
              <span style={{fontFamily:F.sans,fontSize:'10px',color:C.muted,textAlign:'right'}}>{r.pct}</span>
            </div>
          ))}
        </div>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Export Cost Structure (FOB Tema)</div>
          <div style={{background:C.ink,padding:'20px',marginBottom:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>Cost Components — Hemp Food Export (Per Tonne)</div>
            {[
              {scale:'Production + processing cost', capex:'$400–800/tonne', note:'Farm + post-harvest + cleaning/grading + packaging'},
              {scale:'Export certification + documentation', capex:'$50–200/tonne', note:'COA, PPRSD, cert of origin, NCC export permit pro-rated'},
              {scale:'Tema port + freight forwarding', capex:'$100–300/tonne', note:'Port handling, freight forwarder fees, container charges'},
              {scale:'Organic certification (amortised)', capex:'$20–80/tonne', note:'Annual cert cost spread over volume; EU Organic ~$3–8K/yr'},
            ].map((r,i) => (
              <div key={i} style={{padding:'10px 0',borderBottom:i<3?`1px solid rgba(255,255,255,0.07)`:'none'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:'2px'}}>
                  <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.paper}}>{r.scale}</span>
                  <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.lime}}>{r.capex}</span>
                </div>
                <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:'rgba(250,248,243,0.38)'}}>{r.note}</div>
              </div>
            ))}
          </div>
          <div style={{border:`1px solid ${C.border}`,padding:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Trade Agreement Premium Analysis</div>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.7,color:C.ink,marginBottom:'10px'}}>EU-Ghana EPA: Hemp fibre (HS 5302): 0% tariff for Ghana under EPA vs. 0% MFN (already 0%). Hemp seed (HS 1207): 0% EPA. Hemp seed oil (HS 1515): 0% EPA vs. 3.2% standard — direct cost saving per tonne.</p>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.7,color:C.ink,marginBottom:'10px'}}>AGOA (US): Processed agricultural products and textiles — duty-free access. Competes with Chinese hemp textile exporters paying MFN duties.</p>
            <div style={{borderLeft:`2px solid ${C.lime}`,paddingLeft:'10px'}}>
              <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.forest,lineHeight:1.6}}>✓ Trade agreement advantage is structural — EU importers face 3.2% duty on hemp seed oil from non-EPA countries; Ghana exports at 0%. This is a direct pricing advantage that compounds as volume grows.</p>
            </div>
          </div>
        </div>
      </div>
    </MobileCollapse>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 06 — VALUE CHAIN POSITION
// ─────────────────────────────────────────────────────────────────────────────
const ValueChainPosition = () => {
  const [chainActive, setChainActive] = useState(0);
  const chainRef = useRef(null);
  const chainItems = [
    {num:'01',name:'Cultivation',pos:'UPSTREAM',color:C.forest,rel:'BIOMASS'},
    {num:'02',name:'Processing',pos:'MID-CHAIN',color:C.forest,rel:'PROCESSED GOODS'},
    {num:'05',name:'Testing Lab',pos:'ENABLING',color:C.limeDark,rel:'COA CERTIFICATION'},
    {num:'06',name:'Storage',pos:'ENABLING',color:C.limeDark,rel:'STAGED INVENTORY'},
    {num:'07',name:'Transport',pos:'ENABLING',color:C.limeDark,rel:'DELIVERS TO PORT'},
    {num:'09',name:'Export',pos:'TRADE',color:C.lime,rel:null,active:true},
    {num:'08',name:'Import',pos:'TRADE',color:C.teal,rel:'ENABLES EQUIP'},
    {num:'10',name:'Wholesale',pos:'MID-CHAIN',color:C.forest,rel:'REGIONAL DIST.'},
    {num:'04',name:'R&D',pos:'SPECIALIST',color:C.teal,rel:'IP LICENSING'},
    {num:'03',name:'Breeding & Seed',pos:'UPSTREAM',color:C.teal,rel:'SEED EXPORT'},
  ];
  const handleChainScroll = () => {
    if (!chainRef.current) return;
    const cardW = 96 + 8; // card width + gap
    const idx = Math.round(chainRef.current.scrollLeft / cardW);
    setChainActive(Math.max(0, Math.min(idx, chainItems.length - 1)));
  };
  const goToChain = (i) => {
    if (!chainRef.current) return;
    chainRef.current.scrollTo({left: i * (96 + 8), behavior:'smooth'});
    setChainActive(i);
  };
  return (
  <div id="s06" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 06" title="Value Chain" stat="EU + UK + US" label="Trade Agreement Markets">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 06</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Value Chain Position</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>The Highest-Value Exit — Where Ghana Hemp Meets Global Prices</h2>
      {/* Chain visual */}
      <div className="chain-scroll" ref={chainRef} onScroll={handleChainScroll} style={{display:'flex',gap:'8px',marginBottom:'0',paddingTop:'24px'}}>
        {chainItems.map((c,i) => (
          <div key={i} style={{flexShrink:0,width:'96px',background:c.active?C.ink:C.paper,border:`${c.active?'2px':'1px'} solid ${c.active?C.lime:C.border}`,padding:'12px 10px',position:'relative'}}>
            {c.rel && !c.active && (
              <div style={{position:'absolute',top:'-16px',left:0,right:0,textAlign:'center',fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'1px',color:C.faint,textTransform:'uppercase'}}>{c.rel} →</div>
            )}
            <div style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:c.active?C.lime:c.color,marginBottom:'5px'}}>{c.num}</div>
            <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:c.active?C.paper:C.ink,lineHeight:1.3,marginBottom:'6px'}}>{c.name}</div>
            <div style={{background:c.active?C.lime:c.color,color:c.active||c.color===C.limeDark?C.ink:C.paper,padding:'2px 5px',fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'1px',display:'inline-block',textTransform:'uppercase'}}>{c.pos}</div>
          </div>
        ))}
      </div>
      {/* Chain scroll dots — mobile only */}
      <div className="mob-show" style={{display:'none',justifyContent:'center',gap:'5px',marginTop:'14px',marginBottom:'20px'}}>
        {chainItems.map((_,i) => (
          <div key={i} onClick={()=>goToChain(i)} style={{
            width:i===chainActive?'20px':'5px', height:'5px', borderRadius:'3px',
            background:i===chainActive?C.lime:`rgba(${i===chainActive?'184,217,53':'92,107,94'},0.25)`,
            cursor:'pointer', transition:'all 0.3s ease', flexShrink:0,
          }}/>
        ))}
      </div>
      <div style={{height:'8px',marginBottom:'20px'}} className="mob-hide"/>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px'}} className="tc">
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>What Export Receives (Enabling Chain)</div>
          {[
            {lic:'Licence 02 — Processing',role:'The primary supply source for export. Processed hemp products — oil, extract, cleaned fibre, protein — are the export-ready goods. No export without processing.'},
            {lic:'Licence 05 — Testing Lab',role:'ISO 17025 COA is required for every export shipment. EU and UK buyers verify COA on arrival. Without accredited test certificates, shipments are refused or seized.'},
            {lic:'Licence 06 — Storage',role:'Bonded export staging warehouse holds inventory between production and container loading. Essential for managing export timing and documentation workflows.'},
            {lic:'Licence 07 — Transport',role:'Licensed transporter delivers product from processor/storage to Tema port with NCC manifest. Chain-of-custody must be unbroken from farm to shipping container.'},
          ].map((r,i) => (
            <div key={i} style={{padding:'10px 0',borderBottom:`1px solid ${C.border}`}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,marginBottom:'3px'}}>{r.lic}</div>
              <p style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.6}}>{r.role}</p>
            </div>
          ))}
        </div>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>What Export Enables (Global Chain)</div>
          {[
            {lic:'EU Market (EPA)',role:'Duty-free, quota-free access for qualifying hemp products. Hemp seed oil: 0% vs. 3.2% MFN. Hemp fibre: 0% vs. 0% MFN (already free). CBD ingredients: Novel Food dossier pathway.'},
            {lic:'UK Market (DCTS)',role:'Enhanced preferences under UK Developing Countries Trading Scheme. Hemp foods, CBD cosmetics, hemp textiles — all benefit from reduced/zero tariffs under DCTS.'},
            {lic:'US Market (AGOA)',role:'Processed agricultural goods and textiles duty-free under African Growth and Opportunity Act. Hemp textile products directly benefit — competes against Chinese exports with MFN duties.'},
            {lic:'ECOWAS Regional',role:'As West African neighbouring countries develop hemp frameworks, Ghanaian export infrastructure enables re-export and regional distribution under AfCFTA preferential terms.'},
          ].map((r,i) => (
            <div key={i} style={{padding:'10px 0',borderBottom:`1px solid ${C.border}`}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.teal,marginBottom:'3px'}}>{r.lic}</div>
              <p style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.6}}>{r.role}</p>
            </div>
          ))}
        </div>
      </div>
      </MobileCollapse>
    </div>
  </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 07 — COMPETITIVE LANDSCAPE
// ─────────────────────────────────────────────────────────────────────────────
const CompetitiveLandscape = () => (
  <div id="s07" className="pad-section" style={{background:C.paper,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 07" title="Competition" stat="★★★★★" label="Ghana Export Position">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 07</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Competitive Landscape</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>Ghana vs. Seven African Hemp Exporters — Export Infrastructure Comparison</h2>
      {/* Desktop table */}
      <div className="mob-hide" style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',minWidth:'680px'}}>
          <thead>
            <tr style={{background:C.ink}}>
              {['Country','Status','Port Access','Trade Agreements','Export Experience','GMP Status','BRIDGE View'].map((h,i) => (
                <th key={i} style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.35)',textAlign:'left',borderRight:i<6?`1px solid rgba(255,255,255,0.05)`:'none'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {country:'🇬🇭 Ghana',status:'Active 2026',aFit:'★★★★★ — Tema port, 3.7M TEU',port:'EPA + AGOA + DCTS',labour:'None yet — first mover',fw:'★★★☆☆ — NCC L.I. 2475',view:'Best structural export position — deep-water port + three trade agreements + zero West African competition',hl:true},
              {country:'🇿🇦 South Africa',status:'Active 2023',aFit:'★★★★☆ — Durban, Cape Town',port:'EPA + AGOA',labour:'★★★★☆ — Active exporters',fw:'★★★★★',view:'Most experienced African hemp exporter; R40B ambition; GMP facilities active'},
              {country:'🇱🇸 Lesotho',status:'Active 2017',aFit:'★☆☆☆☆ — Landlocked, via SA',port:'EPA + AGOA (via SA port)',labour:'★★★★☆ — Pioneer exporter',fw:'★★★★★',view:'Proved EU pharmaceutical export from Africa is possible; landlocked disadvantage severe'},
              {country:'🇲🇦 Morocco',status:'Recent 2021',aFit:'★★★★☆ — EU proximity, ports',port:'EU AA + Agadir Agreement',labour:'★★★☆☆ — Building',fw:'★★★☆☆',view:'Best EU port proximity; traditional cannabis knowledge; pharmaceutical export developing'},
              {country:'🇿🇼 Zimbabwe',status:'Active 2022',aFit:'★☆☆☆☆ — Landlocked',port:'Limited via Mozambique',labour:'★★★☆☆ — Active',fw:'★★★☆☆',view:'Medicinal focus; landlocked logistics significant constraint; active GMP investment'},
              {country:'🇰🇪 Kenya',status:'Emerging 2023',aFit:'★★★☆☆ — Mombasa port',port:'EPA + AGOA',labour:'★★☆☆☆ — Building',fw:'★★☆☆☆',view:'Mombasa port + EPA + AGOA gives East Africa export potential; regulations incomplete'},
              {country:'🇲🇼 Malawi',status:'Active 2020',aFit:'★☆☆☆☆ — Landlocked',port:'Limited via Mozambique',labour:'★★☆☆☆ — Basic',fw:'★★☆☆☆',view:'Landlocked; primarily commodity hemp; limited high-value export capability'},
              {country:'🇿🇲 Zambia',status:'Emerging',aFit:'★☆☆☆☆ — Landlocked',port:'None direct',labour:'★☆☆☆☆ — Pre-commercial',fw:'★★☆☆☆',view:'Very early; landlocked severely constrains export ambitions'},
            ].map((r,i) => (
              <tr key={i} style={{background:r.hl?`rgba(184,217,53,0.07)`:i%2===0?C.paper:C.paperDark}}>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'12px',fontWeight:r.hl?700:400,color:C.ink,borderBottom:`1px solid ${C.border}`}}>{r.country}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:C.muted,borderBottom:`1px solid ${C.border}`}}>{r.status}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:C.ink,borderBottom:`1px solid ${C.border}`}}>{r.aFit}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:r.hl?C.forest:C.ink,fontWeight:r.hl?700:400,borderBottom:`1px solid ${C.border}`}}>{r.port}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:C.ink,borderBottom:`1px solid ${C.border}`}}>{r.labour}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:C.ink,borderBottom:`1px solid ${C.border}`}}>{r.fw}</td>
                <td style={{padding:'10px 12px',fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:r.hl?C.forest:C.muted,borderBottom:`1px solid ${C.border}`}}>{r.view}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile country cards */}
      <MobCountryCards countries={[
        {country:'🇬🇭 Ghana',status:'Active 2026',aFit:'★★★★★ — Tema port',port:'EPA + AGOA + DCTS',labour:'None yet — first mover',fw:'★★★☆☆',view:'Best structural export position — deep-water port + 3 trade agreements + zero West African competition.',hl:true},
        {country:'🇿🇦 South Africa',status:'Active 2023',aFit:'★★★★☆ — Durban',port:'EPA + AGOA',labour:'★★★★☆ — Active',fw:'★★★★★',view:'Most experienced; R40B ambition; active GMP facilities'},
        {country:'🇱🇸 Lesotho',status:'Active 2017',aFit:'★☆☆☆☆ — Landlocked',port:'EPA + AGOA via SA',labour:'★★★★☆ — Pioneer',fw:'★★★★★',view:'Proved African pharma export possible; landlocked constraint severe'},
        {country:'🇲🇦 Morocco',status:'Recent 2021',aFit:'★★★★☆ — EU ports',port:'EU AA + Agadir',labour:'★★★☆☆ — Building',fw:'★★★☆☆',view:'Best EU proximity; pharmaceutical export developing'},
        {country:'🇿🇼 Zimbabwe',status:'Active 2022',aFit:'★☆☆☆☆ — Landlocked',port:'Via Mozambique',labour:'★★★☆☆ — Active',fw:'★★★☆☆',view:'Medicinal focus; landlocked logistics severe constraint'},
        {country:'🇰🇪 Kenya',status:'Emerging 2023',aFit:'★★★☆☆ — Mombasa',port:'EPA + AGOA',labour:'★★☆☆☆ — Building',fw:'★★☆☆☆',view:'East Africa competitor with EPA and AGOA; regulations incomplete'},
        {country:'🇲🇼 Malawi',status:'Active 2020',aFit:'★☆☆☆☆ — Landlocked',port:'Via Mozambique',labour:'★★☆☆☆ — Basic',fw:'★★☆☆☆',view:'Landlocked; commodity only; limited high-value export'},
        {country:'🇿🇲 Zambia',status:'Emerging',aFit:'★☆☆☆☆ — Landlocked',port:'None direct',labour:'★☆☆☆☆ — Pre-commercial',fw:'★★☆☆☆',view:'Very early; landlocked severely constrains export potential'},
      ]}/>
      <PullQuote>
        Lesotho was the first African country to export pharmaceutical-grade cannabis to Europe. It did this from a landlocked mountain enclave with no direct port access, routing all shipments through South Africa's Durban port. Ghana has Tema — one of West Africa's largest container ports — a direct shipping service to Rotterdam, Hamburg, and Antwerp, and three trade agreement frameworks that Lesotho does not have.
      </PullQuote>
      <div style={{background:C.paperDark,padding:'20px',marginTop:'8px'}}>
        <Eyebrow>Ghana Export Structural Advantages</Eyebrow>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0',marginTop:'14px'}} className="tc3">
          {[
            {title:'Triple Trade Agreement Coverage',body:'EU-Ghana EPA (duty-free, quota-free), AGOA (US preferential), UK DCTS (enhanced preferences) — no other African hemp producer simultaneously has all three. Hemp seed oil enters EU at 0% vs 3.2% for non-EPA competitors. This is a direct pricing advantage.'},
            {title:'Tema Port Infrastructure',body:'3.7 million TEU annual capacity. Direct shipping services to Rotterdam, Hamburg, Antwerp, Felixstowe. Container transit time EU: 18–22 days. Landlocked African exporters route through Durban (+ 7–12 days) or Dar es Salaam (+ 10–15 days) at significant cost premium.'},
            {title:'Agro-Export Institutional Capability',body:'Ghana Export Promotion Authority (GEPA), cocoa export compliance systems, PPRSD phytosanitary infrastructure, and established food safety certification pathways from the cocoa, cashew, and horticultural sectors are directly transferable to hemp export compliance.'},
          ].map((a,i) => (
            <div key={i} style={{padding:'16px',borderRight:i<2?`1px solid ${C.border}`:'none'}}>
              <div style={{width:'24px',height:'3px',background:C.lime,marginBottom:'10px'}}/>
              <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'8px'}}>{a.title}</div>
              <p style={{fontFamily:F.body,fontSize:'11px',fontWeight:300,color:C.muted,lineHeight:1.65}}>{a.body}</p>
            </div>
          ))}
        </div>
      </div>
    </MobileCollapse>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 08 — REGULATORY ROADMAP
// ─────────────────────────────────────────────────────────────────────────────
const RegulatoryRoadmap = () => (
  <div id="s08" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 08" title="Regulatory Roadmap" stat="5 Phases" label="to First Export Shipment">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 08</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Regulatory Roadmap</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>From NCC Export Licence to First Container at Tema Port</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px'}} className="tc mob-hide">
        <div>
          {[
            {phase:'Phase 1',label:'NCC Export Licence + Market Entry Planning (Months 1–4)',steps:['Submit NCC Export Licence (Licence 09) application — identify product categories, destination markets, and intended buyers','Engage Ghana Export Promotion Authority (GEPA) for market linkage support, trade fair participation, and export readiness assessment','Identify first target market category: EU hemp seed (lowest regulatory barrier) or EU fibre — no Novel Food barrier for entry-level products','Register with Registrar General and Ghana Revenue Authority for exporter status; obtain GRA Tax Clearance Certificate','Engage freight forwarder with Tema port experience and regulated agri-goods expertise'],color:C.teal},
            {phase:'Phase 2',label:'Export Documentation Stack (Months 2–6)',steps:['PPRSD phytosanitary certificate: apply per product category — seeds, plant material, processed products have different inspection requirements','Ghana Standards Authority Certificate of Origin: register company as exporter; confirm preferential origin documentation for EPA/AGOA/DCTS claims','ISO 17025 COA from accredited testing lab: confirm every export batch COA covers cannabinoid profile, pesticides, heavy metals, microbials, moisture','For organic category: identify EU Organic certification body accredited by IFOAM; initiate 3-year transition with cultivation licence holders','NCC export permit: apply per shipment or annual permit — confirm NCC process for export product and destination country'],color:C.forest},
            {phase:'Phase 3',label:'Buyer Qualification & Offtake Agreement (Months 3–9)',steps:['Identify and qualify EU/UK buyers through international hemp trade shows (Spannabis, Expo CBD, Biofach), GEPA buyer-seller events, and B2B hemp ingredient platforms','Request and review buyer import licences, FDA/EFSA regulatory compliance records, and product registration status in destination market','Negotiate first offtake agreement: product specification (COA standards, packaging, labelling), Incoterms (CIF Rotterdam recommended initially), price formula, and payment terms (LC or 30% prepayment)','Legal review of offtake agreement covering Ghanaian export regulations and destination-country import requirements','Test shipment if required by buyer — small certified lot with full documentation before commercial volume commitment'],color:C.limeDark},
            {phase:'Phase 4',label:'First Commercial Shipment (Months 9–18)',steps:['Product preparation: final grading, packaging to buyer specification, labelling (HS code, origin, COA reference, lot number)','Apply for NCC export permit for specific shipment batch — attach COA, phytosanitary cert, packing list','Book container: Tema port to destination port; coordinate reefer if pharmaceutical or cold-chain product','Customs declaration: submit export declaration through ICUMS; attach all required documentation','Bill of lading issued; notify buyer with tracking details; file NCC export completion report'],color:C.amber},
            {phase:'Phase 5',label:'Scale, Certification, and Market Upgrade (Months 18+)',steps:['EU Organic certification: complete 3-year transition; issue first certified organic batches at premium pricing','Novel Food dossier preparation (if targeting CBD food/nutraceutical category): engage EU Novel Food specialist; compile safety dossier','GMP certification investment (if targeting CBD ingredient or pharmaceutical API): engage accredited GMP consultant; 18–24 month process','Country-of-origin brand development: coordinate with GEPA on Ghana Hemp Origin branding — analogous to Ghana Cocoa Board origin mark','Annual NCC export licence renewal; update to include new product categories as certifications are achieved'],color:C.lime},
          ].map((p,i) => (
            <div key={i} style={{borderLeft:`3px solid ${p.color}`,paddingLeft:'16px',marginBottom:'24px'}}>
              <div style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:p.color,letterSpacing:'1px',marginBottom:'2px'}}>{p.phase}</div>
              <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'8px'}}>{p.label}</div>
              {p.steps.map((s,j) => (
                <div key={j} style={{display:'flex',gap:'8px',marginBottom:'4px'}}>
                  <span style={{color:p.color,fontFamily:F.mono,fontSize:'10px',flexShrink:0,marginTop:'2px'}}>→</span>
                  <span style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.55}}>{s}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div>
          <div style={{background:C.ink,padding:'22px',marginBottom:'20px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>Ongoing Compliance Obligations</div>
            {[
              {item:'NCC export licence renewal',detail:'Every 3 years; update scope as new product categories and destinations are added'},
              {item:'Annual export reports to NCC',detail:'Quantities by product category; destination countries; COA references; buyer details'},
              {item:'PPRSD phytosanitary compliance',detail:'Separate application per shipment or product category; inspection required on export'},
              {item:'COA retention',detail:'All export batch COAs retained minimum 5 years; available for NCC and buyer audit'},
              {item:'Certification maintenance',detail:'Organic, GMP, ISO 22000 annual surveillance audits; proficiency testing where required'},
              {item:'Adverse event reporting',detail:'Shipment rejected by destination customs (THC above limit, contaminants) — immediate NCC notification; document recall or re-export'},
              {item:'Trade agreement documentation',detail:'Certificate of origin per EPA/AGOA/DCTS requirements — must be issued before export, not retrospectively'},
            ].map((r,i) => (
              <div key={i} style={{padding:'8px 0',borderBottom:i<6?`1px solid rgba(255,255,255,0.07)`:'none'}}>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.paper,marginBottom:'2px'}}>{r.item}</div>
                <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:'rgba(250,248,243,0.4)'}}>{r.detail}</div>
              </div>
            ))}
          </div>
          <div style={{border:`1px solid ${C.border}`,padding:'18px',marginBottom:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Other Regulatory Touchpoints</div>
            {[
              {body:'Ghana Export Promotion Authority (GEPA)',role:'Export market linkage; trade fair participation; buyer-seller facilitation; export readiness assessment'},
              {body:'Plant Protection and Regulatory Services (PPRSD)',role:'Phytosanitary export certificate — required for all plant material and seed exports'},
              {body:'Ghana Revenue Authority — Customs',role:'ICUMS export declaration; Certificate of Origin for EPA/AGOA/DCTS preferential access'},
              {body:'Ghana Standards Authority (GSA)',role:'Certificate of Origin issuance; food quality standards; HACCP registration for food processors'},
              {body:'Ghana Free Zones Authority',role:'EPZ bonded storage incentives for export staging; duty relief on processing inputs in export-oriented facilities'},
            ].map((r,i) => (
              <div key={i} style={{padding:'7px 0',borderBottom:i<4?`1px solid ${C.border}`:'none'}}>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>{r.body}</div>
                <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.muted}}>{r.role}</div>
              </div>
            ))}
          </div>
          <div style={{borderLeft:`3px solid ${C.amber}`,paddingLeft:'14px',background:C.paper,padding:'14px 14px 14px 16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.amber,marginBottom:'6px'}}>Export Shipment Rejection — THC or Contaminant Failure at Destination</div>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.65,color:C.ink}}>EU and UK buyers test all imported hemp shipments on arrival. If THC exceeds 0.3% (or destination-country threshold) or if contaminants (pesticides, heavy metals) fail destination-country standards, the shipment is rejected — at the exporter's cost. <strong>Independent pre-shipment testing by ISO 17025-accredited lab (not just supplier test) is non-negotiable. Match test panel to destination-country requirements — EU, UK, and US have different contaminant panels. Cargo insurance covering shipment rejection is essential.</strong></p>
          </div>
        </div>
      </div>
      <MobPhaseAccordion phases={[
        {phase:'Phase 1',label:'NCC Export Licence + Market Planning (Months 1–4)',color:C.teal,steps:['Submit NCC Licence 09 application — product categories and destination markets','Engage GEPA for market linkage and export readiness','Identify first target: EU hemp seed or fibre (no Novel Food barrier)','Register with GRA as exporter; obtain Tax Clearance Certificate','Engage freight forwarder with Tema port + regulated goods experience']},
        {phase:'Phase 2',label:'Export Documentation Stack (Months 2–6)',color:C.forest,steps:['PPRSD phytosanitary certificate per product category','Ghana Standards Authority Certificate of Origin for EPA/AGOA/DCTS','ISO 17025 COA from accredited lab for every batch','EU Organic certification body identified; 3-year transition initiated','NCC export permit: application process confirmed']},
        {phase:'Phase 3',label:'Buyer Qualification & Offtake (Months 3–9)',color:C.limeDark,steps:['Identify and qualify EU/UK buyers via GEPA events and trade shows','Review buyer import licences and destination compliance','Negotiate first offtake agreement: COA standards, Incoterms, payment terms','Legal review covering Ghanaian and destination-country requirements','Test shipment if required by buyer — certified lot before commercial volume']},
        {phase:'Phase 4',label:'First Commercial Shipment (Months 9–18)',color:C.amber,steps:['Final grading, packaging, labelling to buyer specification','NCC export permit for specific batch — attach COA and phytosanitary cert','Book container; Tema port to destination','ICUMS export declaration with full documentation','File NCC export completion report']},
        {phase:'Phase 5',label:'Scale & Certification Upgrade (Months 18+)',color:C.lime,steps:['EU Organic certification: first certified organic batches','Novel Food dossier preparation for CBD food/nutraceutical','GMP certification investment for CBD ingredient/API export','Ghana Hemp Origin branding with GEPA','Annual NCC export licence renewal and scope expansion']},
      ]}/>
    </MobileCollapse>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 09 — RISK REGISTER
// ─────────────────────────────────────────────────────────────────────────────
const RiskRegister = () => {
  const [openRisks, setOpenRisks] = useState({});
  const toggleRisk = (i) => setOpenRisks(prev => ({...prev, [i]: !prev[i]}));
  const risks = [
          {
            r:'Export shipment rejected at destination — THC or contaminant failure',
            sev:'HIGH',likelihood:'Medium (without rigorous pre-shipment testing)',cat:'Quality / Financial',
            m:'EU and UK buyers test all imported hemp independently. COA from supplier or domestic lab is not sufficient — require independent pre-shipment testing from an ISO 17025-accredited third-party lab, testing the specific export lot against destination-country standards. Match test panel to destination: EU pesticide panels differ from US; Japanese THC limit is stricter than EU. Cargo insurance covering shipment rejection and re-export/destruction costs is non-negotiable from first shipment.',
          },
          {
            r:'EU Novel Food barrier — CBD food/nutraceutical export pathway takes longer than expected',
            sev:'HIGH',likelihood:'High (if targeting CBD food category)',cat:'Regulatory',
            m:'EU Novel Food authorisation for CBD food products is a multi-year process — do not assume it is achievable within 12–18 months. Mitigation: start with hemp seed, fibre, and hempseed oil (not Novel Food); enter cosmetic CBD (not Novel Food) before food CBD. Simultaneously pursue Novel Food dossier with specialist EU regulatory counsel. Do not over-invest in CBD food processing capacity before Novel Food authorisation pathway is confirmed.',
          },
          {
            r:'GMP certification delays — pharmaceutical API export timeline slips',
            sev:'MEDIUM-HIGH',likelihood:'Medium',cat:'Regulatory',
            m:'EU-GMP certification for cannabis extraction and purification typically takes 18–36 months from initial application to first certified batch. Factor this into the business plan timeline. Engage a GMP consultant with cannabis-specific EU-GMP experience from Year 1. Build a Phase 1 revenue stream (commodity or organic food export) that funds operations during the GMP certification period.',
          },
          {
            r:'Destination-country regulatory change — CBD rules tightened',
            sev:'MEDIUM-HIGH',likelihood:'Medium (EU/UK framework still evolving)',cat:'Regulatory',
            m:'EU CBD regulatory framework for food and cosmetics is still maturing. UK FSA Novel Food list may change. Monitor EMA and FSA guidance monthly. Diversify across at least 2 export markets and 2 product categories to reduce single-market regulatory concentration risk. A Ghana hemp exporter exposed only to EU CBD food will be severely impacted by EU Novel Food rule changes.',
          },
          {
            r:'Buyer concentration — single buyer failure or default',
            sev:'MEDIUM',likelihood:'Low-Medium',cat:'Commercial',
            m:'First export operations naturally concentrate on 1–2 buyers. Diversify to 3+ buyers within 24 months. Use trade credit insurance for new buyer relationships. Irrevocable LC or prepayment for first 2–3 shipments from each new buyer. GEPA buyer-seller events expose exporters to multiple qualified EU buyers simultaneously.',
          },
          {
            r:'Production consistency — seasonal quality variation in export lots',
            sev:'MEDIUM',likelihood:'Medium (tropical hemp agronomy)',cat:'Quality',
            m:'EU buyers require COA consistency across supply contracts. Ghanaian cultivation under tropical conditions may show batch-to-batch variation in cannabinoid profiles, lipid composition (for seed products), and contaminant levels. Mitigation: implement rigorous agronomic protocols, consistent testing across cultivation cohorts, and blending/segregation to meet specification. Communicate proactively with buyers about seasonal variation; maintain specification tolerance windows in contracts.',
          },
          {
            r:'Logistics disruption — port congestion or container shortage at Tema',
            sev:'LOW-MEDIUM',likelihood:'Low-Medium',cat:'Operational',
            m:'Tema port occasionally experiences congestion. Container availability fluctuates. Build shipping schedule flexibility into export contracts — SLA allows 2–4 week window for container loading. Maintain relationships with 2–3 freight forwarders at Tema. For time-sensitive pharmaceutical shipments, book containers 4–6 weeks in advance.',
          },
          {
            r:'Trade agreement rules of origin — Ghana hemp products fail qualification',
            sev:'LOW-MEDIUM',likelihood:'Low (with proper documentation)',cat:'Regulatory / Legal',
            m:'EU-Ghana EPA, AGOA, and DCTS all require proof of qualifying origin. Hemp grown in Ghana, processed in Ghana, and exported from Ghana should qualify under all three frameworks — but rules of origin documentation must be correct and complete. Engage Ghana Standards Authority for Certificate of Origin. For AGOA: verify that hemp products fall within qualifying tariff codes. For pharmaceutical products: active pharmaceutical ingredient rules of origin may be more stringent.',
          },
  ];
  return (
  <div id="s09" className="pad-section" style={{background:C.paper,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 09" title="Risk Register" stat="8 Risks" label="2 High · 4 Medium">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 09</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Risk Register</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>Eight Material Risks — Severity, Likelihood, and Mitigation</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0'}} className="tc">
        {risks.map((r,i) => {
          const sevColor = r.sev==='HIGH'?C.red:r.sev==='MEDIUM'?C.amber:C.positive;
          const isOpen = openRisks[i];
          return (
            <div key={i} style={{borderBottom:`1px solid ${C.border}`,borderRight:i%2===0?`1px solid ${C.border}`:'none'}}>
              {/* Header — always visible, tap to expand on mobile */}
              <div onClick={()=>toggleRisk(i)} style={{padding:'14px 18px 12px',cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'8px'}}>
                <div style={{flex:1}}>
                  <div style={{fontFamily:F.sans,fontSize:'7px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.faint,marginBottom:'3px'}}>{r.cat}</div>
                  <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,lineHeight:1.3}}>{r.r}</div>
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:'6px',flexShrink:0}}>
                  <div style={{background:sevColor,color:C.paper,padding:'3px 8px',fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase'}}>{r.sev}</div>
                  <span className="mob-show" style={{display:'none',fontFamily:F.mono,fontSize:'11px',color:C.faint,transition:'transform 0.2s',transform:isOpen?'rotate(180deg)':'none'}}>↓</span>
                </div>
              </div>
              {/* Body — always visible desktop; tap-reveal on mobile */}
              <div className={`mob-risk-body${isOpen?' mob-risk-open':''}`} style={{padding:'0 18px 16px'}}>
                <div style={{display:'flex',gap:'6px',marginBottom:'8px'}}>
                  <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>Likelihood:</span>
                  <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.muted}}>{r.likelihood}</span>
                </div>
                <div style={{borderLeft:`2px solid ${sevColor}`,paddingLeft:'10px'}}>
                  <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,lineHeight:1.6}}>{r.m}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </MobileCollapse>
    </div>
  </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 10 — BRIDGE IMPACT SCORE
// ─────────────────────────────────────────────────────────────────────────────
const BridgeScore = () => {
  const [openDim, setOpenDim] = useState(null);
  const dims = [
    {dim:'Market Opportunity',score:88,weight:'30%',rationale:'The global hemp market will reach $16–30 billion by 2030 at 17.5% CAGR. Ghana has EU duty-free access (EPA), AGOA (US), and UK DCTS simultaneously. Pharmaceutical CBD API market offers $1,000–8,000/kg pricing. High score reflects genuine premium market access from an uncontested West African position.'},
    {dim:'Development Impact',score:76,weight:'30%',rationale:'Export generates hard-currency revenue for Ghana — directly improving the national balance of payments. It creates demand for every upstream licence (cultivation, processing, testing, transport, storage) and drives them toward quality improvement. But direct employment in export operations is more limited than in cultivation; hence slightly below the headline opportunity score.'},
    {dim:'Implementation Feasibility',score:68,weight:'25%',rationale:'Entry-level commodity export (hemp seed, fibre) is genuinely feasible in the near term with existing Ghanaian export infrastructure (PPRSD, GEPA, Tema port). The challenge is ascending the value curve — organic certification takes 3 years, GMP takes 2–4 years, Novel Food takes 2–4 years. Score reflects that the highest-margin segments are medium-term, not immediate.'},
    {dim:'Financial Sustainability',score:82,weight:'15%',rationale:'Premium export revenue — especially pharmaceutical API — is structurally sustainable: long-term offtake contracts, recurring buyer relationships, EU-GMP certification as a durable barrier to entry. Commodity export is more vulnerable to price fluctuation. Organic and pharmaceutical tiers offer the best financial sustainability profile.'},
  ];
  return (
  <div id="s10" className="pad-section" style={{background:C.ink,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 10" title="BRIDGE Score™" stat="80/100" label="Core Tier · Trade — Highest in Series" onDark={true}>
      <div style={{borderTop:`6px solid ${C.paper}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 10</span>
        <Eyebrow light>BRIDGE Impact Score™</Eyebrow>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.paper,lineHeight:1.2,marginBottom:'32px',maxWidth:'680px'}}>Export Scores 80/100 — Highest BRIDGE Score in the Series — The Premium End of Ghana Cannabis</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:'40px'}} className="tc">
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'16px'}}>Composite Score</div>
          <div style={{display:'flex',alignItems:'baseline',gap:'6px',marginBottom:'4px'}}>
            <div style={{fontFamily:F.mono,fontSize:'clamp(72px,12vw,120px)',fontWeight:500,color:C.lime,lineHeight:1}}>80</div>
            <div style={{fontFamily:F.mono,fontSize:'clamp(22px,4vw,36px)',fontWeight:300,color:'rgba(184,217,53,0.3)',lineHeight:1,marginBottom:'6px'}}>/100</div>
          </div>
          <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.28)',letterSpacing:'0.5px',marginBottom:'28px'}}>Core Tier · Trade · NCC Licence 09</div>
          <ScoreBar label="Market Opportunity  ×30%" value={88} onDark/>
          <ScoreBar label="Development Impact  ×30%" value={76} onDark/>
          <ScoreBar label="Impl. Feasibility  ×25%" value={68} onDark/>
          <ScoreBar label="Financial Sustainability  ×15%" value={82} onDark/>
          <div style={{marginTop:'20px',borderTop:`1px solid rgba(255,255,255,0.08)`,paddingTop:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.3)',marginBottom:'10px'}}>Quick Parameters</div>
            {[{l:'Entry Barrier',v:'Medium (commodity) to Very High (GMP)'},{l:'Capital Intensity',v:'Low (commodity) to High (pharma)'},{l:'Timeline to Revenue',v:'12–18 months (commodity)'},{l:'Licence Tier',v:'Core · Trade'}].map((p,i) => (
              <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:i<3?`1px solid rgba(255,255,255,0.06)`:'none'}}>
                <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.35)'}}>{p.l}</span>
                <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.paper}}>{p.v}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          {/* Desktop: full detail rows */}
          <div className="mob-hide">
            {dims.map((d,i) => (
              <div key={i} style={{padding:'16px',borderBottom:i<3?`1px solid rgba(255,255,255,0.08)`:'none'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'6px'}}>
                  <div>
                    <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper}}>{d.dim}</span>
                    <span style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.28)',marginLeft:'8px'}}>Weight {d.weight}</span>
                  </div>
                  <span style={{fontFamily:F.mono,fontSize:'18px',fontWeight:700,color:C.lime}}>{d.score}</span>
                </div>
                <div style={{height:'3px',background:'rgba(255,255,255,0.08)',marginBottom:'10px'}}>
                  <div style={{height:'100%',width:`${d.score}%`,background:C.lime}}/>
                </div>
                <p style={{fontFamily:F.body,fontSize:'12px',fontWeight:300,color:'rgba(250,248,243,0.5)',lineHeight:1.65}}>{d.rationale}</p>
              </div>
            ))}
          </div>
          {/* Mobile: accordion — tap to reveal rationale */}
          <div className="mob-show" style={{display:'none'}}>
            {dims.map((d,i) => {
              const isOpen = openDim === i;
              return (
                <div key={i} className={isOpen ? 'mob-dim-open' : ''} style={{borderBottom:`1px solid rgba(255,255,255,0.08)`}}>
                  <button className="mob-dim-hdr" onClick={()=>setOpenDim(isOpen?null:i)}>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'6px'}}>
                        <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper,textAlign:'left'}}>{d.dim}</span>
                        <div style={{display:'flex',alignItems:'center',gap:'10px',flexShrink:0,marginLeft:'12px'}}>
                          <span style={{fontFamily:F.mono,fontSize:'16px',fontWeight:700,color:C.lime}}>{d.score}</span>
                          <span style={{fontFamily:F.mono,fontSize:'12px',color:'rgba(250,248,243,0.3)',transition:'transform 0.2s',transform:isOpen?'rotate(180deg)':'none',display:'inline-block'}}>↓</span>
                        </div>
                      </div>
                      <div style={{height:'3px',background:'rgba(255,255,255,0.08)'}}>
                        <div style={{height:'100%',width:`${d.score}%`,background:C.lime}}/>
                      </div>
                    </div>
                  </button>
                  <div className="mob-dim-body" style={{paddingBottom:'14px',paddingTop:'6px'}}>
                    <p style={{fontFamily:F.body,fontSize:'12px',fontWeight:300,color:'rgba(250,248,243,0.5)',lineHeight:1.65}}>{d.rationale}</p>
                    <div style={{marginTop:'8px',fontFamily:F.sans,fontSize:'8px',color:'rgba(250,248,243,0.25)',letterSpacing:'1px'}}>WEIGHT {d.weight}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MobileCollapse>
    </div>
  </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 11 — DEPLOYMENT PARAMETERS
// ─────────────────────────────────────────────────────────────────────────────
const Deployment = () => {
  const [capExpanded, setCapExpanded] = useState(false);
  const capRows = [
    {cat:'NCC Export Licence (Licence 09)',range:'$2K–8K',note:'Application + 3-year licence; confirm fee with NCC'},
    {cat:'PPRSD phytosanitary registration',range:'$1K–5K',note:'Annual permit; per product category; inspection on export'},
    {cat:'Pre-shipment independent COA testing',range:'$500–2K/lot',note:'ISO 17025-accredited third-party test per export batch — mandatory'},
    {cat:'Freight forwarder retainer (Tema)',range:'$3K–10K/yr',note:'Tema port specialist with regulated agri-goods and cannabis experience'},
    {cat:'Cargo insurance (per shipment)',range:'$500–3K/shipment',note:'Covers THC rejection risk; destination market rejection; transit loss'},
    {cat:'GEPA membership + trade fair',range:'$2K–10K/yr',note:'Ghana Export Promotion Authority; buyer-seller events; BIOFACH/FiE'},
    {cat:'Organic certification (EU Organic)',range:'$3K–8K/yr',note:'Annual cert fee; only after 3-year organic transition — future phase'},
    {cat:'GMP certification (CBD/API pathway)',range:'$100K–500K',note:'Long-horizon capital; 18–36 month process; future phase investment'},
    {cat:'Working capital (first shipments)',range:'$30K–150K',note:'Pre-finance for product procurement, processing, and freight before buyer payment'},
  ];
  const SHOW_FIRST = 4;
  return (
  <div id="s11" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 11" title="Deployment" stat="$30K+" label="Commodity Export Entry">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 11</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Deployment Parameters</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>What It Takes to Launch Ghana's First Hemp Export Operation</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'28px',marginBottom:'32px'}} className="tc">
        {/* Capital deployment */}
        <div style={{background:C.forest,padding:'24px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'16px'}}>Capital Deployment Guide</div>
          {capRows.map((r,i) => (
            <div key={i} className={i >= SHOW_FIRST ? (capExpanded ? '' : 'mob-cap-hidden') : ''}
              style={{padding:'8px 0',borderBottom:i<8?`1px solid rgba(255,255,255,0.07)`:'none'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'2px',gap:'8px'}}>
                <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.paper}}>{r.cat}</span>
                <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.lime,flexShrink:0}}>{r.range}</span>
              </div>
              <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:'rgba(250,248,243,0.35)'}}>{r.note}</div>
            </div>
          ))}
          <button className="mob-show mob-toggle mob-toggle-hdr" onClick={()=>setCapExpanded(e=>!e)}
            style={{marginTop:'10px',paddingTop:'10px',borderTop:'1px solid rgba(255,255,255,0.1)',background:'transparent',border:'none',width:'100%',textAlign:'left',cursor:'pointer',fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.35)',display:'none',justifyContent:'space-between',alignItems:'center'}}>
            <span>{capExpanded ? 'Show less ↑' : `Show all ${capRows.length} cost items ↓`}</span>
          </button>
        </div>
        <div>
          {/* Team */}
          <div style={{border:`1px solid ${C.border}`,padding:'20px',marginBottom:'20px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Minimum Viable Team</div>
            {[
              {role:'Export Manager',spec:'International hemp/agri-commodity trade experience; NCC licence management; buyer relationship management'},
              {role:'Regulatory & Certification Officer',spec:'PPRSD, COA management, certification compliance (organic, GMP); destination-market regulatory monitoring'},
              {role:'Logistics Coordinator',spec:'Tema port operations; freight forwarder liaison; container booking; export documentation'},
              {role:'Quality Assurance Manager',spec:'Pre-shipment testing coordination; COA verification; product specification management; buyer audit support'},
              {role:'Finance / Trade Operations',spec:'Trade finance LC management; export incentive claims; FX management; NCC reporting'},
            ].map((r,i) => (
              <div key={i} style={{padding:'8px 0',borderBottom:i<4?`1px solid ${C.border}`:'none'}}>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,marginBottom:'2px'}}>{r.role}</div>
                <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted}}>{r.spec}</div>
              </div>
            ))}
          </div>
          {/* First mover */}
          <div style={{background:C.ink,padding:'20px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>First-Mover Window Analysis</div>
            <p style={{fontFamily:F.body,fontSize:'13px',fontWeight:300,color:'rgba(250,248,243,0.7)',lineHeight:1.75,marginBottom:'12px'}}>
              Ghana is the first and only West African country with a cannabis export licence framework. Lesotho started 9 years earlier but cannot match Ghana's port access. South Africa is more experienced but faces a domestic cannabis sector scale challenge. No other West African country has entered the market. The window to establish Ghana's first hemp export relationships, secure first EU buyer contracts, and build a track record is now.
            </p>
            <p style={{fontFamily:F.body,fontSize:'13px',fontWeight:300,color:'rgba(250,248,243,0.7)',lineHeight:1.75,marginBottom:'16px'}}>
              The export trajectory has three stages: (1) Commodity — hemp seed and fibre, 2026–2027; (2) Premium — organic foods and CBD cosmetics, 2027–2029; (3) Pharmaceutical — GMP CBD API, 2028–2030+. Each stage requires different certifications and capabilities. The operator who starts Stage 1 now arrives at Stage 3 before any competitor has completed Stage 1.
            </p>
            {[
              {l:'Stage 1: Commodity export start',v:'Now — Q2 2026'},
              {l:'First container at Tema',v:'Q4 2026 – Q2 2027'},
              {l:'Stage 2: Organic certification',v:'2028–2029 (3yr transition)'},
              {l:'Stage 3: GMP/pharmaceutical API',v:'2029–2031'},
            ].map((p,i) => (
              <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'7px 0',borderBottom:i<3?`1px solid rgba(255,255,255,0.07)`:'none'}}>
                <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.35)'}}>{p.l}</span>
                <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.paper}}>{p.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileCollapse>
    </div>
  </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// GATE — PARTNERSHIP & CONSULTATION UPSELL
// ─────────────────────────────────────────────────────────────────────────────
const Gate = () => {
  const [activeTrack, setActiveTrack] = useState(null);

  const tracks = [
    {
      id:'discovery',
      label:'01 · ENTRY POINT',
      name:'Discovery Session',
      tagline:'90 minutes. One analyst. A clear path forward.',
      price:'By inquiry',
      priceNote:'Single engagement · No retainer required',
      color:C.teal,
      forWhom:'Investors and operators who have identified cultivation as an opportunity and want a structured, expert-guided evaluation of their specific situation before committing capital.',
      delivers:[
        'Structured 90-min strategy call with your BRIDGE sector analyst',
        'Pre-call briefing review — we study your background in advance',
        'Site and region assessment across the four cultivation zones',
        'Business model recommendation — cooperative, outgrower, commercial, or integrated',
        'Your 30-day action checklist to begin the NCC application process',
        'Post-call written summary with prioritised next steps',
      ],
      cta:'Request a Discovery Session',
    },
    {
      id:'deployment',
      label:'02 · CORE ENGAGEMENT',
      name:'Deployment Advisory',
      tagline:'We scope your venture, build your plan, connect you to the people.',
      price:'Custom pricing',
      priceNote:'Scoped per engagement · 60–90 day programme',
      color:C.lime,
      forWhom:'Serious operators ready to move from intelligence to execution. You have capital, intent and a general vision — BRIDGE provides the Ghana-specific architecture to deploy it with precision.',
      delivers:[
        'Full venture scoping: scale, region, model, capital structure, team',
        'NCC application support — documentation, compliance checklist, submission',
        'Processor partner matching — introductions to Licence 02 holders',
        'Seed supplier connections — verified EU/Canadian certified-variety vendors',
        'Financing navigation — DFI, agrifinance and blended-capital pathways',
        'Custom 5-year financial model built for your specific parameters',
        'Legal coordination — Ghana-based counsel with NCC licence experience',
        'On-call analyst access throughout the engagement',
      ],
      cta:'Enquire About Deployment Advisory',
    },
    {
      id:'partnership',
      label:'03 · STRATEGIC PARTNERSHIP',
      name:'Strategic Partnership',
      tagline:'Retained. Responsive. Invested in your outcome.',
      price:'Retained engagement',
      priceNote:'Custom structure · Quarterly or annual · Co-investment available',
      color:C.limeDark,
      forWhom:'Institutions, funds, family offices and multinational agribusinesses deploying material capital into Ghana\'s cannabis economy — and any operator for whom speed-to-market and relationship capital is the primary competitive advantage.',
      delivers:[
        'Retained monthly analyst access — BRIDGE on your team',
        'Cross-licence strategy: cultivation + processing + export integrated',
        'Government and regulatory interface — NCC, MoFA, EPA liaison',
        'Ecosystem positioning: cooperatives, community engagement, land access',
        'Quarterly intelligence briefings tailored to your portfolio',
        'Investor reporting support — impact metrics, BRIDGE Score™ updates',
        'Co-investment consideration for qualifying ventures',
        'Priority access to BRIDGE deal flow and partner network',
      ],
      cta:'Schedule a Partnership Conversation',
    },
  ];

  const active = tracks.find(t => t.id === activeTrack);

  return (
    <div style={{background:C.ink,position:'relative',overflow:'hidden'}}>

      {/* Watermark */}
      <div style={{position:'absolute',right:'-30px',top:'-20px',fontFamily:F.display,fontSize:'clamp(160px,30vw,400px)',fontWeight:900,color:'rgba(255,255,255,0.018)',pointerEvents:'none',userSelect:'none',letterSpacing:'-12px',lineHeight:1}}>BRIDGE</div>

      {/* Top proof strip */}
      <div style={{borderBottom:`1px solid rgba(255,255,255,0.07)`,padding:'18px 64px'}} className="pad-gate">
        <div style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.lime}}>BRIDGE PBC · STRATEGIC ENGAGEMENT</div>
          <div style={{display:'flex',gap:'28px',flexWrap:'wrap'}}>
            {[
              {v:'174+',l:'Ventures Assessed'},
              {v:'12',l:'Sectors Covered'},
              {v:'11',l:'Cannabis Licences'},
              {v:'Ghana-First',l:'Operating Principle'},
            ].map((s,i) => (
              <div key={i} style={{textAlign:'center'}}>
                <div style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:C.lime,lineHeight:1}}>{s.v}</div>
                <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1px',textTransform:'uppercase',color:'rgba(250,248,243,0.25)',marginTop:'3px'}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Headline + Tracks — single unified zone */}
      <div className="pad-gate" style={{padding:'44px 64px 48px',position:'relative'}}>
        <div style={{maxWidth:'900px',margin:'0 auto'}}>

          {/* Compact headline row */}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',flexWrap:'wrap',gap:'20px',marginBottom:'32px'}}>
            <div style={{maxWidth:'580px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>MOVE FROM INTELLIGENCE TO EXECUTION</div>
              <h2 style={{fontFamily:F.display,fontSize:'clamp(20px,3vw,36px)',fontWeight:900,color:C.paper,lineHeight:1.12,marginBottom:'12px'}}>
                You now know more about Ghana's cultivation sector than{' '}
                <span style={{color:C.lime,fontStyle:'italic'}}>99% of your potential competitors.</span>
              </h2>
              <p style={{fontFamily:F.body,fontSize:'13px',fontWeight:300,color:'rgba(250,248,243,0.5)',lineHeight:1.75,maxWidth:'520px'}}>
                The brief is your foundation. The operators who win in Ghana's hemp economy will be the ones who moved first — with the right structure and the right people.
              </p>
            </div>
            <div style={{flexShrink:0,display:'flex',flexDirection:'column',gap:'6px',alignItems:'flex-end'}} className="mob-hide">
              <div style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(250,248,243,0.25)',letterSpacing:'0.5px'}}>First-mover window</div>
              <div style={{fontFamily:F.display,fontSize:'28px',fontWeight:900,color:C.lime,lineHeight:1}}>12–24</div>
              <div style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(250,248,243,0.25)',letterSpacing:'0.5px'}}>months remaining</div>
            </div>
          </div>

          {/* Engagement tracks */}
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.25)',marginBottom:'14px'}}>Three Ways to Engage</div>

          {/* Track selector tabs */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'8px',marginBottom:'0'}} className="tc">
            {tracks.map((t,i) => {
              const isActive = activeTrack === t.id;
              const ctaBg = t.color===C.lime||t.color===C.limeDark ? t.color : 'transparent';
              const ctaText = t.color===C.lime||t.color===C.limeDark ? C.ink : t.color;
              const ctaBorder = t.color===C.lime||t.color===C.limeDark ? 'none' : `1px solid ${t.color}`;
              return (
                <div key={i} style={{display:'flex',flexDirection:'column'}}>
                  {/* Tab header — always visible, tap to open */}
                  <div
                    onClick={() => setActiveTrack(isActive ? null : t.id)}
                    style={{
                      padding:'16px 18px',
                      border:`1px solid ${isActive ? t.color : 'rgba(255,255,255,0.09)'}`,
                      borderBottom: isActive ? 'none' : `1px solid ${isActive ? t.color : 'rgba(255,255,255,0.09)'}`,
                      background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                      cursor:'pointer',
                      transition:'all 0.2s ease',
                    }}
                  >
                    <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:t.color,marginBottom:'6px'}}>{t.label}</div>
                    <div style={{fontFamily:F.display,fontSize:'clamp(13px,1.4vw,17px)',fontWeight:700,color:C.paper,lineHeight:1.25,marginBottom:'5px'}}>{t.name}</div>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'8px'}}>
                      <div style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:t.color}}>{t.price}</div>
                      <div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(250,248,243,0.22)',transition:'transform 0.2s',transform:isActive?'rotate(180deg)':'none',display:'inline-block'}}>↓</div>
                    </div>
                  </div>

                  {/* Expanded panel — open state */}
                  {isActive && (
                    <div style={{border:`1px solid ${t.color}`,borderTop:'none',background:'rgba(255,255,255,0.03)',padding:'18px'}}>
                      <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.45)',lineHeight:1.6,marginBottom:'14px'}}>{t.tagline}</p>
                      <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.28)',marginBottom:'8px'}}>What You Receive</div>
                      {t.delivers.map((d,j) => (
                        <div key={j} style={{display:'flex',gap:'8px',padding:'5px 0',borderBottom:j<t.delivers.length-1?`1px solid rgba(255,255,255,0.05)`:'none'}}>
                          <span style={{color:t.color,fontFamily:F.sans,fontSize:'10px',flexShrink:0,lineHeight:1.5,marginTop:'1px'}}>→</span>
                          <span style={{fontFamily:F.body,fontSize:'10px',color:'rgba(250,248,243,0.55)',lineHeight:1.55}}>{d}</span>
                        </div>
                      ))}
                      <div style={{marginTop:'16px',display:'flex',gap:'10px',alignItems:'center',flexWrap:'wrap'}}>
                        <a href="#" style={{display:'inline-flex',alignItems:'center',gap:'8px',background:ctaBg,border:ctaBorder,color:ctaText,padding:'11px 18px',fontFamily:F.sans,fontSize:'10px',fontWeight:800,textDecoration:'none',letterSpacing:'0.3px',flexShrink:0}}>
                          {t.cta} <span style={{fontSize:'13px',fontWeight:900}}>→</span>
                        </a>
                        <div style={{fontFamily:F.sans,fontSize:'8px',fontStyle:'italic',color:'rgba(250,248,243,0.2)',lineHeight:1.5}}>{t.priceNote}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Closing reassurance — always visible, minimal */}
          <div style={{marginTop:'24px',paddingTop:'20px',borderTop:`1px solid rgba(255,255,255,0.06)`,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'16px'}}>
            <p style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:'rgba(250,248,243,0.22)',lineHeight:1.6,maxWidth:'480px'}}>
              BRIDGE accepts a limited number of new engagements per quarter. Inquiries reviewed within 48 hours. No unsolicited follow-up — one response, no pressure.
            </p>
            {!activeTrack && (
              <a href="#" style={{display:'inline-flex',alignItems:'center',gap:'10px',background:C.lime,color:C.ink,padding:'12px 22px',fontFamily:F.sans,fontSize:'11px',fontWeight:800,textDecoration:'none',letterSpacing:'0.2px',flexShrink:0}}>
                Request a Discovery Session <span style={{fontSize:'14px',fontWeight:900}}>→</span>
              </a>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────
const Footer = () => (
  <div className="pad-footer" style={{background:C.forest,padding:'16px 64px',borderTop:`3px solid ${C.lime}`}}>
    <div className="footer-inner" style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
        <Logo height={22} variant="white"/>
        <div style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.15)'}}/>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(250,248,243,0.45)',letterSpacing:'0.3px'}}>Licence 09 of 11 · Ghana Cannabis Intelligence</div>
          <div style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(250,248,243,0.2)',marginTop:'2px'}}>Members Brief · March 2026 · BRIDGE PBC</div>
        </div>
      </div>
      <div className="footer-links" style={{display:'flex',gap:'20px',alignItems:'center'}}>
        {['All 11 Licences','Members','Engage BRIDGE','bridgepbc.com'].map((l,i) => (
          <a key={i} href="#" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:i===2?C.lime:'rgba(250,248,243,0.3)',textDecoration:'none',letterSpacing:'0.2px'}}>{l}</a>
        ))}
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────────────────
export default function ExportBrief() {
  const coverLogoRef = useRef(null);
  return (
    <div style={{fontFamily:F.body,background:C.paper}}>
      <Gf/>
      <MobileNav/>
      <TopBar coverLogoRef={coverLogoRef}/>
      <Cover logoRef={coverLogoRef}/>
      <TOC/>
      <WhyNow/>
      <Thesis/>
      <GhanaFit/>
      <BusinessModels/>
      <UnitEconomics/>
      <ValueChainPosition/>
      <CompetitiveLandscape/>
      <RegulatoryRoadmap/>
      <RiskRegister/>
      <BridgeScore/>
      <Deployment/>
      <Gate/>
      <div className="mob-show mob-nav-clearance" style={{display:'none',height:'72px'}}/>
      <Footer/>
    </div>
  );
}
