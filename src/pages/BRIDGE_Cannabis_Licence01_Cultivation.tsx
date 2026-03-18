import { useState, useEffect, useRef } from "react";

import { C, F } from '../theme';
// ─────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────────────────────
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
          : <a href="/contact" style={{background:C.lime,color:C.ink,padding:'7px 12px',fontFamily:F.sans,fontSize:'9px',fontWeight:800,textDecoration:'none',letterSpacing:'1px',flexShrink:0}}>ENGAGE →</a>
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
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>Ghana Cannabis Intelligence · Licence 01 · Cultivation · Members Brief</span>
        <span className="mob-show" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>01 · Cultivation</span>
      </div>
      <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
        <div className="mob-hide" style={{background:C.lime,color:C.ink,padding:'4px 10px',fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase'}}>MEMBERS BRIEF</div>
        <a href="/contact" style={{background:C.forest,color:C.lime,padding:'7px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none',letterSpacing:'0.3px'}}>Engage BRIDGE →</a>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// COVER
// ─────────────────────────────────────────────────────────────────────────────
const Cover = ({logoRef}) => (
  <div className="pad-cover" style={{background:C.ink,padding:'48px 64px 0',position:'relative',overflow:'hidden'}}>
    <div style={{position:'absolute',right:'-20px',top:'-30px',fontFamily:F.display,fontSize:'clamp(180px,35vw,480px)',fontWeight:900,color:'rgba(255,255,255,0.022)',pointerEvents:'none',userSelect:'none',letterSpacing:'-12px',lineHeight:1}}>01</div>
    <div style={{maxWidth:'900px',margin:'0 auto',position:'relative'}}>
      <div ref={logoRef} style={{marginBottom:'36px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Logo height={30} variant="white"/>
        <div className="mob-hide" style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(250,248,243,0.22)',letterSpacing:'0.8px'}}>MARCH 2026 · NCC L.I. 2475</div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px',flexWrap:'wrap'}}>
        <div style={{background:C.lime,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'3px',textTransform:'uppercase',color:C.ink}}>LICENCE 01 · UPSTREAM</div>
        <div style={{border:`1px solid ${C.lime}`,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime}}>CORE TIER</div>
        <div className="mob-hide" style={{border:`1px solid rgba(255,255,255,0.15)`,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.4)'}}>MEMBERS INTELLIGENCE</div>
      </div>
      <h1 style={{fontFamily:F.display,fontSize:'clamp(30px,5.5vw,68px)',fontWeight:900,color:C.paper,lineHeight:1.08,marginBottom:'20px',maxWidth:'800px'}}>
        Cultivation<br/>
        <span style={{fontWeight:400,fontStyle:'italic',color:'rgba(250,248,243,0.55)',fontSize:'0.72em'}}>The Agricultural Foundation of Ghana's Hemp Economy</span>
      </h1>
      <PullQuote onDark>
        Ghana's 6.8 million hectares under cultivation, bimodal rainfall and four distinct agro-ecological zones give it a structural advantage that landlocked African hemp competitors cannot replicate — but only operators who secure processing relationships before planting will capture that advantage.
      </PullQuote>
      <div style={{borderTop:`1px solid rgba(255,255,255,0.09)`,paddingTop:'28px',marginTop:'8px',display:'flex',flexWrap:'wrap'}} className="stats-row">
        {[
          {v:'72',  l:'BRIDGE Score™',   s:'Market · Impact · Feasibility'},
          {v:'$21B',l:'Global Market 2030',s:'From $6.5B · 2024 baseline · CAGR 17.5%'},
          {v:'6',   l:'Regions of Fit',  s:'Volta · Ashanti · Bono · North'},
          {v:'800K+',l:'Farmer Network', s:"Ghana's cocoa cooperative base — ready organisational framework"},
          {v:'2–3', l:'Season Breakeven',s:'Under contract farming structure'},
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
          {n:'01',t:'Why Now — The February 2026 Milestone',s:'Legal framework, NCC licensing, what changed',id:'s01'},
          {n:'02',t:'The Cultivation Thesis',s:"Narrative opportunity framing, Ghana's structural fit",id:'s02'},
          {n:'03',t:'Ghana Agro-Ecological Fit',s:'Regional analysis, soil, rainfall, irrigation',id:'s03'},
          {n:'04',t:'Business Models',s:'4 proven structures — deep configuration detail',id:'s04'},
          {n:'05',t:'Unit Economics',s:'Per-hectare revenue, cost structure, 4 scenarios',id:'s05'},
          {n:'06',t:'Value Chain Position',s:"Cultivation's role — what it feeds, what depends on it",id:'s06'},
          {n:'07',t:'Competitive Landscape',s:'Ghana vs. 7 African peers — head-to-head analysis',id:'s07'},
          {n:'08',t:'Regulatory Roadmap',s:'NCC compliance journey, timeline, obligations',id:'s08'},
          {n:'09',t:'Risk Register',s:'Full matrix — 8 risks, severity, mitigations',id:'s09'},
          {n:'10',t:'BRIDGE Impact Score™',s:'4-dimension analysis, composite 72/100',id:'s10'},
          {n:'11',t:'Deployment Parameters',s:'Capital, team, timeline, first-mover window',id:'s11'},
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
      <MobileCollapse num="§ 01" title="Why Now" stat="Feb 2026" label="Applications Open" defaultOpen={true}>
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 01</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Why Now</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'32px',maxWidth:'700px'}}>26 February 2026: The Day Ghana's Hemp Clock Started</h2>
      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr',gap:'48px'}} className="tc">
        <div>
          <p className="dc" style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            On 26 February 2026, Ghana's Minister for the Interior stood before assembled industry and diplomatic representatives to launch the country's national licensing regime for industrial and medicinal cannabis. It was a moment six years in the making — and, for the cultivation sector, the starting gun for a race to secure the agricultural supply base of an entirely new industry.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            The legal architecture had been constructed in layers. The Narcotics Control Commission Act 2020 (Act 1019) first opened the door. Act 1100 in 2023 reinstated the critical Section 43, which had been inadvertently repealed. Then Legislative Instrument L.I. 2475 translated legislative intent into operational reality: 11 licence categories, a single regulatory authority, a hard THC ceiling of 0.3%, and a three-year renewable licence framework with site-specific controls.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink}}>
            The cultivation licence — Licence 01 — sits at the foundation of everything that follows. No processor can operate without feedstock. No exporter can fill a container without biomass or grain. No testing laboratory can build throughput without samples. Ghana's hemp economy begins with a seed in the ground.
          </p>
        </div>
        <div>
          <div style={{background:C.ink,padding:'24px',marginBottom:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>Legal Framework at a Glance</div>
            {[
              {l:'Primary Legislation',v:'NCC Act 2020 (Act 1019)'},
              {l:'Reinstatement',v:'Act 1100 · 2023'},
              {l:'Operating Regulations',v:'L.I. 2475'},
              {l:'THC Ceiling',v:'≤ 0.3% dry weight'},
              {l:'Licence Term',v:'3 years · site-specific'},
              {l:'Regulator',v:'NCC Cannabis Regulations Dept.'},
              {l:'Licence Categories',v:'11 across full value chain'},
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
              Ghana joins 9–10 African nations with legal cannabis frameworks, but is the first to launch a comprehensive open licensing system covering the full value chain simultaneously — from genetics to dispensing.
            </p>
          </div>
        </div>
      </div>
      {/* Timeline visual */}
      <div style={{marginTop:'40px',borderTop:`1px solid ${C.border}`,paddingTop:'28px'}}>
        <Eyebrow>Legislative Journey · 2020–2026</Eyebrow>
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
      <MobileCollapse num="§ 02" title="The Thesis" stat="$21B" label="2030 Global Market">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 02</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>The Cultivation Thesis</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'32px',maxWidth:'680px'}}>Every Downstream Opportunity Runs Through This Licence</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px'}} className="tc">
        <div>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            Hemp cultivation is not the most financially spectacular entry point in Ghana's cannabis value chain — that distinction belongs to Processing (Licence 02) and Export (Licence 09). But it is the most structurally important. It is also uniquely positioned: every other licence category either depends on cultivation output or provides a service to it.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            The global industrial hemp market is on a strong growth trajectory: from approximately $6.5 billion in 2024 to a projected $21 billion by 2030, at a compound annual growth rate of 17.5%. The drivers are secular — sustainable textiles, construction materials, plant-based foods, cosmetics and bioplastics — and largely decoupled from the CBD boom-and-bust cycle that destabilised North American hemp markets in 2019–2022.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink}}>
            Ghana's agricultural endowment maps almost precisely onto hemp's requirements. Multiple harvests per year are possible under irrigation. Existing cooperative structures and smallholder networks provide a ready organisational framework. And the new legal framework, combined with proximity to Tema and Takoradi ports, gives Ghana an export reach that landlocked competitors — Lesotho, Zimbabwe, Malawi — cannot match.
          </p>
        </div>
        <div>
          <PullQuote>
            The first cultivators to secure processing relationships will not just grow hemp — they will define the supply architecture of Ghana's entire cannabis economy.
          </PullQuote>
          <div style={{background:C.paper,border:`1px solid ${C.border}`,padding:'20px',marginTop:'8px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Global Hemp Market Trajectory</div>
            {/* SVG Bar Chart */}
            <svg viewBox="0 0 340 140" style={{width:'100%',display:'block'}}>
              {[
                {yr:'2020',v:42,val:'$4.2B'},
                {yr:'2022',v:55,val:'$5.5B'},
                {yr:'2024',v:65,val:'$6.5B'},
                {yr:'2026',v:80,val:'$8.0B'},
                {yr:'2028',v:95,val:'$9.5B'},
                {yr:'2030',v:115,val:'$21B+'},
              ].map((d,i) => (
                <g key={i}>
                  <rect x={10+i*54} y={140-d.v-20} width={38} height={d.v} fill={i===5?C.lime:i>=4?C.limeDark:C.border}/>
                  <text x={29+i*54} y={135} textAnchor="middle" style={{fontFamily:'DM Sans,sans-serif',fontSize:'8px',fill:C.muted}}>{d.yr}</text>
                  <text x={29+i*54} y={140-d.v-25} textAnchor="middle" style={{fontFamily:'DM Mono,monospace',fontSize:'8px',fontWeight:700,fill:i>=4?C.forest:C.muted}}>{d.val}</text>
                </g>
              ))}
              <text x={10} y={12} style={{fontFamily:'DM Sans,sans-serif',fontSize:'9px',fill:C.faint}}>USD Billions (indicative)</text>
            </svg>
            <div style={{marginTop:'8px',display:'flex',gap:'12px',flexWrap:'wrap'}}>
              {[{c:C.border,l:'Historical'},{c:C.limeDark,l:'Projected'},{c:C.lime,l:'2030 Target'}].map((s,i) => (
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
        <Eyebrow>Four Secular Demand Drivers · Global</Eyebrow>
        {/* Desktop grid */}
        <div className="mob-hide" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'0',marginTop:'14px'}}>
          {[
            {n:'Sustainable Textiles',d:'Hemp fibre replacing synthetic and conventional cotton in luxury fashion, technical textiles and workwear. CAGR 15–18%.'},
            {n:'Construction Materials',d:'Hempcrete and hemp insulation gaining regulatory approval in EU and UK. Low-carbon construction mandates are a structural tailwind.'},
            {n:'Functional Foods',d:'Hempseed protein and oil entering mainstream food channels. Whole Foods, Waitrose, Carrefour all listed hemp seed SKUs by 2024.'},
            {n:'Bioplastics & Industrial',d:'Automotive, aerospace and packaging industries using hemp biocomposites. BMW, Mercedes and Audi are active users of hemp-fibre panels.'},
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
          {n:'Sustainable Textiles',icon:'🧵',d:'Hemp fibre replacing synthetic and conventional cotton in luxury fashion, technical textiles and workwear. CAGR 15–18%.'},
          {n:'Construction',icon:'🏗️',d:'Hempcrete and hemp insulation gaining regulatory approval in EU and UK. Low-carbon construction mandates are a structural tailwind.'},
          {n:'Functional Foods',icon:'🌱',d:'Hempseed protein and oil entering mainstream food channels. Whole Foods, Waitrose, Carrefour all listed hemp seed SKUs by 2024.'},
          {n:'Bioplastics',icon:'⚙️',d:'Automotive, aerospace and packaging using hemp biocomposites. BMW, Mercedes and Audi are active users of hemp-fibre panels.'},
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
      <MobileCollapse num="§ 03" title="Ghana Fit" stat="4 Zones" label="Agro-Ecological Fit">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 03</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Ghana Agro-Ecological Fit</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'12px',maxWidth:'700px'}}>The Land, the Rain, and the Infrastructure Are Already in Place</h2>
      <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'32px',maxWidth:'700px'}}>
        Hemp requires well-drained loam soils with pH 6.0–7.5, average temperatures of 15–27°C, and reliable moisture during the vegetative period. Ghana's agro-ecological profile meets or exceeds these requirements across multiple regions, with the added advantage of bimodal rainfall patterns that allow double-cropping in the south.
      </p>
      {/* Desktop region grid */}
      <div className="mob-hide" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',marginBottom:'32px'}}>
        {[
          {
            region:'Volta Region',tier:'HIGH FIT',color:C.lime,
            soil:'Ferric Acrisols and Ferrisols — well-drained, pH 5.5–6.8',
            rainfall:'1,200–1,800mm annual · bimodal',
            harvest:'2 crops/year possible (Mar–Jun, Sep–Dec)',
            advantage:'Academic studies specifically cite Volta as the highest-potential region for industrial hemp. Proximity to Tema port reduces logistics cost.',
            note:'Hohoe and Kpandu districts identified in CSIR agronomic mapping',
          },
          {
            region:'Ashanti & Bono Regions',tier:'HIGH FIT',color:C.lime,
            soil:'Lixisols and Cambisols — moderate fertility, good drainage',
            rainfall:'1,200–1,500mm · bimodal',
            harvest:'2 crops/year viable',
            advantage:'Strong existing cooperative infrastructure through cocoa sector. Established agro-input supply networks. KNUST agronomic research capacity in Kumasi.',
            note:'Bono East and Ahafo subdivisions particularly suitable for dual-purpose systems',
          },
          {
            region:'Northern Savannah (Irrigated)',tier:'MEDIUM-HIGH FIT',color:C.limeDark,
            soil:'Vertisols and Fluvisols along irrigation corridors',
            rainfall:'800–1,100mm · unimodal with defined dry season',
            harvest:'1 rain-fed + 1 irrigated dry-season crop',
            advantage:'Larger land parcels. Lower land cost. Existing public irrigation schemes: Tono, Bontanga, Vea, Kpong. Suitable for large-scale mechanised production.',
            note:'Requires secured water access; dry-season crop dependent on irrigation scheme reliability',
          },
          {
            region:'Western & Central Regions',tier:'EMERGING',color:C.amber,
            soil:'Variable — Gleysols in lowlands (drainage challenges)',
            rainfall:'1,500–2,000mm+ · very high in coastal zones',
            harvest:'Selective elevated-terrain cultivation viable',
            advantage:'Proximity to Takoradi port for export-linked processing operations. Existing agro-processing infrastructure.',
            note:'Humidity management critical; medicinal hemp drying protocols add cost in high-rainfall zones',
          },
        ].map((r,i) => (
          <div key={i} style={{border:`1px solid ${C.border}`,padding:'20px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
              <div style={{fontFamily:F.display,fontSize:'15px',fontWeight:700,color:C.ink}}>{r.region}</div>
              <div style={{background:r.color,color:r.color===C.amber?C.paper:C.ink,padding:'2px 8px',fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0}}>{r.tier}</div>
            </div>
            <div style={{marginBottom:'10px'}}>
              {[{l:'Soil',v:r.soil},{l:'Rainfall',v:r.rainfall},{l:'Harvest cycles',v:r.harvest}].map((f,j) => (
                <div key={j} style={{display:'flex',gap:'8px',marginBottom:'5px'}}>
                  <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,minWidth:'72px',flexShrink:0,marginTop:'2px'}}>{f.l.toUpperCase()}</span>
                  <span style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.5}}>{f.v}</span>
                </div>
              ))}
            </div>
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'10px',marginTop:'8px'}}>
              <p style={{fontFamily:F.body,fontSize:'11px',fontWeight:300,color:C.ink,lineHeight:1.6,marginBottom:'6px'}}>{r.advantage}</p>
              <p style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint,lineHeight:1.5}}>{r.note}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Mobile region carousel */}
      <MobCarousel items={[
        {region:'Volta Region',tier:'HIGH FIT',color:C.lime,soil:'Ferric Acrisols — well-drained, pH 5.5–6.8',rainfall:'1,200–1,800mm · bimodal',harvest:'2 crops/year possible',advantage:'Academic studies specifically cite Volta as highest-potential region. Proximity to Tema port reduces logistics cost.',note:'Hohoe and Kpandu districts identified in CSIR agronomic mapping'},
        {region:'Ashanti & Bono',tier:'HIGH FIT',color:C.lime,soil:'Lixisols and Cambisols — moderate fertility, good drainage',rainfall:'1,200–1,500mm · bimodal',harvest:'2 crops/year viable',advantage:'Strong cooperative infrastructure through cocoa sector. KNUST agronomic research in Kumasi.',note:'Bono East and Ahafo subdivisions particularly suitable for dual-purpose systems'},
        {region:'Northern Savannah',tier:'MEDIUM-HIGH FIT',color:C.limeDark,soil:'Vertisols and Fluvisols along irrigation corridors',rainfall:'800–1,100mm · unimodal',harvest:'1 rain-fed + 1 irrigated crop',advantage:'Larger land parcels at lower cost. Existing irrigation: Tono, Bontanga, Vea, Kpong.',note:'Requires secured water access; dry-season crop depends on irrigation reliability'},
        {region:'Western & Central',tier:'EMERGING',color:C.amber,soil:'Variable — Gleysols in lowlands (drainage challenges)',rainfall:'1,500–2,000mm+ · very high coastal',harvest:'Selective elevated-terrain cultivation',advantage:'Proximity to Takoradi port. Existing agro-processing infrastructure.',note:'Humidity management critical; medicinal hemp drying adds cost'},
      ]} renderCard={(r,i) => (
        <div style={{border:`1px solid ${C.border}`,background:C.paper,padding:'18px',height:'100%'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
            <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:C.ink,lineHeight:1.2}}>{r.region}</div>
            <div style={{background:r.color,color:r.color===C.amber?C.paper:C.ink,padding:'3px 8px',fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0,marginLeft:'8px'}}>{r.tier}</div>
          </div>
          {[{l:'Soil',v:r.soil},{l:'Rainfall',v:r.rainfall},{l:'Harvest',v:r.harvest}].map((f,j) => (
            <div key={j} style={{display:'flex',gap:'8px',marginBottom:'6px'}}>
              <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,minWidth:'56px',flexShrink:0,paddingTop:'2px'}}>{f.l.toUpperCase()}</span>
              <span style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.45}}>{f.v}</span>
            </div>
          ))}
          <div style={{borderTop:`2px solid ${r.color}`,paddingTop:'10px',marginTop:'12px'}}>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.6,color:C.ink,marginBottom:'6px'}}>{r.advantage}</p>
            <p style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint,lineHeight:1.5}}>{r.note}</p>
          </div>
        </div>
      )}/>
      {/* Agronomy parameters strip */}
      <div style={{background:C.paperDark,padding:'24px',borderTop:`3px solid ${C.ink}`}}>
        <Eyebrow>Hemp Agronomic Parameters vs. Ghana Conditions</Eyebrow>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'0',marginTop:'14px'}} className="tc">
          {[
            {param:'Temperature',req:'15–27°C',ghana:'21–32°C avg',fit:'★★★★☆'},
            {param:'Rainfall',req:'500–700mm/season',ghana:'800–1,800mm',fit:'★★★★★'},
            {param:'Soil pH',req:'6.0–7.5',ghana:'5.5–7.0 (most zones)',fit:'★★★★☆'},
            {param:'Frost-free days',req:'100–150 days',ghana:'365 days',fit:'★★★★★'},
            {param:'Drainage',req:'Well-drained loam',ghana:'Variable; good in target zones',fit:'★★★★☆'},
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
      n:'01',name:'Smallholder Cooperative',tag:'INCLUSIVE',color:C.teal,
      tagline:'Many small farmers. One supply chain. Shared regulatory burden.',
      scale:'0.5–5 ha per household · 50–200 ha aggregate',
      capital:'$20K–80K (aggregator infrastructure)',
      timeline:'9–18 months to first harvest',
      revenue:'$1,800–3,500/ha (fibre or grain, contract price)',
      fit:"★★★★★ Best fit for Ghana's smallholder structure",
      description:"The cooperative model aggregates individual smallholder plots under a single NCC licence held by the cooperative entity. Members contribute land, labour and compliance, while the cooperative manages seed procurement, compliance documentation, shared equipment, and offtake negotiation. This mirrors Ghana's proven cocoa cooperative model and aligns with One District One Factory agro-industrialisation priorities.",
      requirements:['Cooperative or farmer association legal entity registration','Single NCC cultivation licence covering all member plots (confirmed with NCC)','GPS mapping of each member plot','Centralised compliance management — shared agronomist and compliance officer','Binding offtake agreement with at least one licensed processor'],
      advantages:['Shared licence and compliance costs across members','Cocoa cooperative precedent provides institutional template','Built-in offtake volume attractive to processors','Community acceptance and rural development narrative supports financing'],
      risks:['Governance complexity — member discipline on THC compliance is critical','Stranded production risk if cooperative fails to secure offtake before planting','Revenue distribution disputes if grading is inconsistent'],
      ideal:'DFIs, development-oriented investors, agribusinesses seeking inclusive supply chain certification for EU/UK market access',
    },
    {
      n:'02',name:'Contract / Outgrower Scheme',tag:'COMMERCIAL',color:C.forest,
      tagline:'Lead firm provides seed, buys back biomass. Farmers provide land and labour.',
      scale:'5–50 ha initially · expandable to 200+ ha',
      capital:'$80K–350K (lead firm operational setup)',
      timeline:'12–18 months to first commercial harvest',
      revenue:'$2,000–4,500/ha gross (dual-purpose under contract)',
      fit:'★★★★☆ Strong commercial model; governance-dependent',
      description:"A lead firm — processor, exporter, or dedicated agribusiness — holds the cultivation licence and provides enrolled farmers with certified seed, agronomy support, compliance documentation and in-field testing. Farmers commit to sell all biomass at agreed formula prices. The lead firm manages regulatory interface, quality control and logistics. This model has been used successfully in South African hemp pilots and across Ghana's cocoa, pineapple and shea sectors.",
      requirements:['Lead firm licensed by NCC as cultivation licence holder','Binding outgrower agreements with enrolled farmers','Technical agronomy team (at least one licensed agronomist per 100 ha)','Pre-harvest THC testing protocol and hot-crop management plan','GPS tracking of all enrolled plots'],
      advantages:['Fastest path to scale — can start with 20 farmers, grow to 200','De-risks both farmer and processor — guaranteed supply and demand','Attractive structure for DFI and impact investment','Proven model in other Ghanaian agricultural value chains'],
      risks:['Lead firm bears licence liability for all enrolled farm THC compliance','Farmer discipline on unauthorised variety substitution is a key risk','Minimum-price clause negotiation can be contentious in price-down scenarios'],
      ideal:'Processors and exporters who need a reliable domestic supply base; agribusinesses with existing rural networks',
    },
    {
      n:'03',name:'Medium Commercial Farm',tag:'DIRECT INVESTMENT',color:C.ink,
      tagline:'Single operator. Full control. 10–100 ha under direct management.',
      scale:'10–100 ha (optimal 20–50 ha for first farm)',
      capital:'$120K–600K (land, irrigation, equipment, compliance setup)',
      timeline:'14–24 months to breakeven',
      revenue:'$3,000–6,000/ha gross (dual-purpose with processor relationship)',
      fit:'★★★★☆ Best risk/control balance for experienced operators',
      description:'A single operator — either an individual investor, family enterprise, or SME — holds the NCC cultivation licence for their directly managed farm. Full managerial control over varieties, agronomy, inputs, and harvest timing. Best suited to irrigated northern schemes where 50+ ha is economically viable, or in Volta/Ashanti where smaller dual-purpose systems can achieve strong margins. Requires an experienced farm manager and a secured processing contract before committing.',
      requirements:['NCC cultivation licence — site-specific, with GPS-mapped field boundaries','Security fencing per NCC specifications (perimeter, signage)','Irrigation infrastructure (northern zones) or rain-fed management plan','Certified seed sourcing from approved EU/Canadian varieties','Pre-harvest THC sampling protocol registered with NCC'],
      advantages:['Full operational control — variety choice, planting timing, harvest decisions','No governance complexity of cooperative or outgrower','Clear P&L for investor due diligence and bank financing','Manageable compliance burden vs. large plantation'],
      risks:['Higher per-ha capital cost than cooperative (no cost-sharing)','Stranded production risk if processing relationship breaks down','Capital tied up in equipment and irrigation with limited liquidity'],
      ideal:'Experienced commercial farmers, Ghana diaspora investors, agricultural SMEs seeking regulated sector diversification',
    },
    {
      n:'04',name:'Vertically Integrated Farm-to-Processor',tag:'HIGH VALUE',color:C.limeDark,
      tagline:'Cultivate, process and sell. Capture value at every stage of the chain.',
      scale:'20–150 ha cultivation + co-located processing unit',
      capital:'$500K–3M (dual licence, processing equipment, compliance)',
      timeline:'24–42 months to full operation',
      revenue:'$6,000–15,000+ per hectare equivalent (value-added output)',
      fit:'★★★☆☆ Highest value but high capital and complexity',
      description:'The vertically integrated model combines Licence 01 (Cultivation) with Licence 02 (Processing) on a shared or adjacent site. The operator grows hemp, decorticates fibre and presses seed oil, then sells processed outputs — fibre bales, seed oil, hemp hurd — at significantly higher margins than raw biomass. A dual-licence structure co-located at an agro-industrial zone (ideally with GIPC free-zone incentives) is the most capital-efficient configuration.',
      requirements:['Both Licence 01 (Cultivation) and Licence 02 (Processing) from NCC','GMP certification for pharmaceutical-grade outputs','Co-location planning: agro-industrial zone or GIPC free-zone advantageous','Larger capital base — processing equipment adds $300K–2M to cultivation capex','Dual compliance regime — agricultural and manufacturing standards simultaneously'],
      advantages:['Captures 3–10× farm-gate value multiplier from processing','Single site simplifies chain-of-custody and NCC compliance','Strongest position for EU, UK and pharmaceutical export markets','Most attractive to impact investors and development finance institutions'],
      risks:['Very high capital requirement — most operators should start with cultivation only','Dual compliance burden requires larger management team','Feedstock risk is self-managed — if crop fails, processing facility idle'],
      ideal:'Well-capitalised investors, multinational agribusinesses, joint ventures combining Ghanaian landholding with international processing expertise',
    },
  ];
  const m = models[active];
  return (
    <div id="s04" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <MobileCollapse num="§ 04" title="Business Models" stat="4 Models" label="$20K to $3M Entry">
        <SectionRule/>
        <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
          <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 04</span>
          <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Business Models</span>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>Four Proven Routes to Market in Ghana's Cultivation Sector</h2>
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
        <div className="mob-show" style={{display:'flex',marginBottom:'20px',overflowX:'auto',gap:'0'}}>
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
      <MobileCollapse num="§ 05" title="Unit Economics" stat="$4,800" label="Peak Revenue/ha">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 05</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Unit Economics</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'12px',maxWidth:'680px'}}>What One Hectare of Hemp Is Worth in Ghana</h2>
      <p style={{fontFamily:F.body,fontSize:'15px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'36px',maxWidth:'700px'}}>
        Per-hectare economics vary significantly by production system. US benchmarks — the most developed data set available — provide a reference framework, adjusted downward for Ghanaian input and labour costs, then upward for tropical yield potential and dual-currency offtake opportunity.
      </p>
      {/* Revenue scenarios chart */}
      <div style={{background:C.paperDark,padding:'28px',marginBottom:'32px'}}>
        <Eyebrow>Gross Revenue Per Hectare · 4 Production Scenarios (USD)</Eyebrow>
        <div style={{marginTop:'18px'}}>
          {[
            {label:'Fibre Only',v:2900,max:5000,note:'Low-density sowing · sells baled straw to decorator'},
            {label:'Grain Only',v:1800,max:5000,note:'Seed harvest for food / planting stock markets'},
            {label:'Dual-Purpose',v:4200,max:5000,note:'Both straw and grain — optimal gross return per ha'},
            {label:'Medicinal Biomass',v:4800,max:5000,note:'Compliant floral biomass for cannabinoid extraction'},
          ].map((s,i) => (
            <div key={i} style={{marginBottom:'14px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px',flexWrap:'wrap',gap:'6px'}}>
                <div>
                  <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{s.label}</span>
                  <span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,marginLeft:'10px'}}>{s.note}</span>
                </div>
                <span style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:C.forest}}>${s.v.toLocaleString()}</span>
              </div>
              <div style={{height:'16px',background:C.border,position:'relative'}}>
                <div style={{position:'absolute',left:0,top:0,height:'100%',width:`${(s.v/s.max)*100}%`,background:i===3?C.lime:i===2?C.limeDark:C.forest}}/>
              </div>
            </div>
          ))}
          <div style={{marginTop:'10px',display:'flex',gap:'6px',alignItems:'center'}}>
            <div style={{width:'10px',height:'10px',background:C.lime}}/>
            <span style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.muted}}>Chart represents mid-range gross revenue. Net margins: 35–55% of gross in well-managed systems.</span>
          </div>
        </div>
      </div>
      {/* Cost structure */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',marginBottom:'32px'}} className="tc">
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Per-Hectare Cost Structure (Ghana Context)</div>
          {[
            {item:'Certified seed',range:'$180–350',pct:'12–18%',note:'THC-compliant EU/Canadian varieties'},
            {item:'Land preparation & levelling',range:'$120–280',pct:'8–14%',note:'Tractor hire or owned equipment'},
            {item:'Fertiliser & soil amendments',range:'$160–320',pct:'10–16%',note:'N-P-K + organic matter management'},
            {item:'Irrigation (where applicable)',range:'$80–200',pct:'5–10%',note:'Drip / flood; varies by scheme'},
            {item:'Labour (planting, weeding, harvest)',range:'$300–600',pct:'20–30%',note:'Ghana labour cost advantage vs. N. America'},
            {item:'Security fencing (annualised)',range:'$60–180',pct:'4–8%',note:'NCC compliance requirement; amortised over 3 years'},
            {item:'Compliance, testing, inspection',range:'$120–250',pct:'8–12%',note:'THC pre-harvest sampling; NCC fees'},
            {item:'Transport to processor',range:'$80–160',pct:'5–8%',note:'Farm-gate to processing facility'},
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
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Capex & Breakeven Parameters</div>
          <div style={{background:C.ink,padding:'20px',marginBottom:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>Entry Capital Ranges (USD)</div>
            {[
              {scale:'Cooperative (aggregate)', capex:'$20K–80K', note:'Shared infrastructure; NCC licence + fencing'},
              {scale:'Outgrower scheme (lead firm)', capex:'$80K–350K', note:'Lead firm setup; farmer equipment excluded'},
              {scale:'Medium commercial (10–50 ha)', capex:'$120K–600K', note:'Irrigation, machinery, fencing, seed stock'},
              {scale:'Vertically integrated', capex:'$500K–3M', note:'Includes Licence 02 processing equipment'},
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
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Breakeven Analysis</div>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.7,color:C.ink,marginBottom:'10px'}}>Under a contract farming structure with guaranteed offtake, a medium-scale dual-purpose farm (20–50 ha) typically achieves breakeven in <strong>2–3 growing seasons</strong>, assuming mid-range yields and farm-gate prices.</p>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.7,color:C.ink,marginBottom:'10px'}}>Without confirmed offtake, breakeven extends to <strong>3–5 seasons</strong> as market-price exposure and idle processing risk accumulate.</p>
            <div style={{borderLeft:`2px solid ${C.amber}`,paddingLeft:'10px'}}>
              <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.amber,lineHeight:1.6}}>⚠ Do not plant before securing a binding offtake agreement. Early-season cultivation without confirmed buyers is the single most common failure mode in new hemp sectors globally.</p>
            </div>
          </div>
          <div style={{marginTop:'16px',border:`1px solid ${C.border}`,padding:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Ghana Cost Advantage vs. Global Benchmarks</div>
            {[
              {item:'Labour cost',gh:'$4–8/day agricultural',na:'$18–25/day equivalent',adv:'60–75% lower'},
              {item:'Land (lease, pa)',gh:'$200–800/ha',na:'$800–2,500/ha',adv:'65–75% lower'},
              {item:'Irrigation water',gh:'$30–80/ha/season',na:'$100–300/ha/season',adv:'55–70% lower'},
            ].map((r,i) => (
              <div key={i} style={{padding:'7px 0',borderBottom:i<2?`1px solid ${C.border}`:'none'}}>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,marginBottom:'2px'}}>{r.item}</div>
                <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
                  <span style={{fontFamily:F.body,fontSize:'10px',color:C.muted}}>Ghana: {r.gh}</span>
                  <span style={{fontFamily:F.body,fontSize:'10px',color:C.muted}}>N. America: {r.na}</span>
                  <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.positive}}>{r.adv}</span>
                </div>
              </div>
            ))}
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
    {num:'03',name:'Breeding & Seed',pos:'UPSTREAM',color:C.teal,rel:'FEEDS'},
    {num:'08',name:'Import',pos:'TRADE',color:C.teal,rel:'ENABLES'},
    {num:'01',name:'Cultivation',pos:'UPSTREAM',color:C.lime,rel:null,active:true},
    {num:'05',name:'Testing Lab',pos:'ENABLING',color:C.limeDark,rel:'SERVES'},
    {num:'06',name:'Storage',pos:'ENABLING',color:C.limeDark,rel:'SERVES'},
    {num:'07',name:'Transport',pos:'ENABLING',color:C.limeDark,rel:'SERVES'},
    {num:'02',name:'Processing',pos:'MID-CHAIN',color:C.forest,rel:'BUYS FROM'},
    {num:'10',name:'Wholesale',pos:'MID-CHAIN',color:C.forest,rel:'DISTRIBUTES'},
    {num:'09',name:'Export',pos:'TRADE',color:C.teal,rel:'EXPORTS'},
    {num:'11',name:'Dispensing',pos:'DOWNSTREAM',color:C.forest,rel:'REACHES'},
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
      <MobileCollapse num="§ 06" title="Value Chain" stat="9 of 11" label="Licences Depend on This">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 06</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Value Chain Position</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>The Upstream Node That Every Other Licence Depends On</h2>
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
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>What Cultivation Receives From Other Licences</div>
          {[
            {lic:'Licence 03 — Breeding & Seed',role:'Provides certified, THC-compliant genetics for planting. Critical dependency — no cultivation without compliant seed.'},
            {lic:'Licence 08 — Import',role:'Bridges the gap before domestic seed production scales. Imports certified EU/Canadian varieties in early years.'},
            {lic:'Licence 05 — Testing Lab',role:'Mandatory pre-harvest THC testing. Provides compliance certificates needed for NCC and processor offtake.'},
            {lic:'Licence 07 — Transport',role:'Moves biomass from farm to processor. Chain-of-custody documentation originates at farm gate.'},
          ].map((r,i) => (
            <div key={i} style={{padding:'10px 0',borderBottom:`1px solid ${C.border}`}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,marginBottom:'3px'}}>{r.lic}</div>
              <p style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.6}}>{r.role}</p>
            </div>
          ))}
        </div>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>What Cultivation Supplies to Other Licences</div>
          {[
            {lic:'Licence 02 — Processing',role:"Primary buyer of raw biomass: straw, grain, floral biomass. The cultivator's most critical commercial relationship."},
            {lic:'Licence 06 — Storage',role:'Post-harvest products require compliant storage. Cultivators who overproduce need bonded storage capacity.'},
            {lic:'Licence 09 — Export',role:'Raw and semi-processed hemp for export (with NCC approval). Direct farm-to-port possible for some product types.'},
            {lic:'Licence 04 — R&D',role:'Provides field sites, biomass samples and trial data. Cultivation and R&D are natural joint-venture partners.'},
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
      <MobileCollapse num="§ 07" title="Competition" stat="★★★★★" label="Ghana Port Access">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 07</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Competitive Landscape</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>Ghana vs. Seven African Hemp Producers — Cultivation Comparison</h2>
      {/* Desktop table */}
      <div className="mob-hide" style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',minWidth:'680px'}}>
          <thead>
            <tr style={{background:C.ink}}>
              {['Country','Status','Agro Fit','Port Access','Labour Cost','Framework Maturity','Smallholder Model','BRIDGE View'].map((h,i) => (
                <th key={i} style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.35)',textAlign:'left',borderRight:i<7?`1px solid rgba(255,255,255,0.05)`:'none'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {country:'🇬🇭 Ghana',status:'Active 2026',aFit:'★★★★★',port:'★★★★★',labour:'★★★★☆',fw:'★★★☆☆',sm:'★★★★★',view:'Best positioned for scale',hl:true},
              {country:'🇿🇦 South Africa',status:'Active 2023',aFit:'★★★★☆',port:'★★★☆☆',labour:'★★★☆☆',fw:'★★★★★',sm:'★★★☆☆',view:'R40B target; most mature framework'},
              {country:'🇿🇼 Zimbabwe',status:'Active 2022',aFit:'★★★☆☆',port:'★☆☆☆☆',labour:'★★★★☆',fw:'★★★☆☆',sm:'★★☆☆☆',view:'Landlocked; high-THC medicinal focus'},
              {country:'🇲🇼 Malawi',status:'Active 2020',aFit:'★★★☆☆',port:'★☆☆☆☆',labour:'★★★★★',fw:'★★☆☆☆',sm:'★★★☆☆',view:'Smallholder base; weak framework'},
              {country:'🇱🇸 Lesotho',status:'Active 2017',aFit:'★★☆☆☆',port:'★☆☆☆☆',labour:'★★★★☆',fw:'★★★★★',sm:'★★☆☆☆',view:'Enclave export; landlocked penalty'},
              {country:'🇿🇲 Zambia',status:'Emerging',aFit:'★★★★☆',port:'★★☆☆☆',labour:'★★★★☆',fw:'★★☆☆☆',sm:'★★★☆☆',view:'Large land; framework lagging'},
              {country:'🇰🇪 Kenya',status:'Emerging 2023',aFit:'★★★★☆',port:'★★★☆☆',labour:'★★★☆☆',fw:'★★☆☆☆',sm:'★★★★☆',view:'Growing; incomplete regulations'},
              {country:'🇲🇦 Morocco',status:'Recent 2021',aFit:'★★★☆☆',port:'★★★★☆',labour:'★★★☆☆',fw:'★★★☆☆',sm:'★★★☆☆',view:'EU proximity strong; late legaliser'},
            ].map((r,i) => (
              <tr key={i} style={{background:r.hl?`rgba(184,217,53,0.07)`:i%2===0?C.paper:C.paperDark}}>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'12px',fontWeight:r.hl?700:400,color:C.ink,borderBottom:`1px solid ${C.border}`}}>{r.country}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:C.muted,borderBottom:`1px solid ${C.border}`}}>{r.status}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:C.ink,borderBottom:`1px solid ${C.border}`}}>{r.aFit}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:r.hl?C.forest:C.ink,fontWeight:r.hl?700:400,borderBottom:`1px solid ${C.border}`}}>{r.port}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:C.ink,borderBottom:`1px solid ${C.border}`}}>{r.labour}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:C.ink,borderBottom:`1px solid ${C.border}`}}>{r.fw}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:C.ink,borderBottom:`1px solid ${C.border}`}}>{r.sm}</td>
                <td style={{padding:'10px 12px',fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:r.hl?C.forest:C.muted,borderBottom:`1px solid ${C.border}`}}>{r.view}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile country cards */}
      <MobCountryCards countries={[
        {country:'🇬🇭 Ghana',status:'Active 2026',aFit:'★★★★★',port:'★★★★★',labour:'★★★★☆',fw:'★★★☆☆',sm:'★★★★★',view:'Best positioned for scale in West Africa — port access, cooperative infrastructure, and bimodal rainfall combine into a non-replicable advantage.',hl:true},
        {country:'🇿🇦 South Africa',status:'Active 2023',aFit:'★★★★☆',port:'★★★☆☆',labour:'★★★☆☆',fw:'★★★★★',sm:'★★★☆☆',view:'R40B target; most mature regulatory framework in Africa'},
        {country:'🇿🇼 Zimbabwe',status:'Active 2022',aFit:'★★★☆☆',port:'★☆☆☆☆',labour:'★★★★☆',fw:'★★★☆☆',sm:'★★☆☆☆',view:'Landlocked; high-THC medicinal focus, limited industrial hemp'},
        {country:'🇲🇼 Malawi',status:'Active 2020',aFit:'★★★☆☆',port:'★☆☆☆☆',labour:'★★★★★',fw:'★★☆☆☆',sm:'★★★☆☆',view:'Smallholder base is strong; framework remains underdeveloped'},
        {country:'🇱🇸 Lesotho',status:'Active 2017',aFit:'★★☆☆☆',port:'★☆☆☆☆',labour:'★★★★☆',fw:'★★★★★',sm:'★★☆☆☆',view:'Enclave export market; landlocked penalty is severe'},
        {country:'🇿🇲 Zambia',status:'Emerging',aFit:'★★★★☆',port:'★★☆☆☆',labour:'★★★★☆',fw:'★★☆☆☆',sm:'★★★☆☆',view:'Large land availability; regulatory framework significantly lags'},
        {country:'🇰🇪 Kenya',status:'Emerging 2023',aFit:'★★★★☆',port:'★★★☆☆',labour:'★★★☆☆',fw:'★★☆☆☆',sm:'★★★★☆',view:'Growing market, good agro fit; regulations incomplete'},
        {country:'🇲🇦 Morocco',status:'Recent 2021',aFit:'★★★☆☆',port:'★★★★☆',labour:'★★★☆☆',fw:'★★★☆☆',sm:'★★★☆☆',view:'EU proximity is strong; late legaliser relative to southern Africa'},
      ]}/>
      <PullQuote>
        Ghana's coastal geography is a strategic asset that cannot be replicated by inland competitors. Tema and Takoradi are the only major deep-water ports in West Africa's top hemp-eligible agro-climatic zones.
      </PullQuote>
      <div style={{background:C.paperDark,padding:'20px',marginTop:'8px'}}>
        <Eyebrow>Ghana's Structural Advantages — The Non-Replicable Edge</Eyebrow>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0',marginTop:'14px'}} className="tc3">
          {[
            {title:'Port Geography',body:'Tema and Takoradi give direct ocean access to EU, UK and Middle East hemp markets. Container costs 30–40% lower than landlocked competitors routing through Durban or Dar es Salaam.'},
            {title:'ECOWAS & AfCFTA',body:'Preferential trade access to 15 ECOWAS nations (350M+ consumers) and the full African Continental Free Trade Area. No equivalent regional market access exists in southern Africa.'},
            {title:'Cooperative Infrastructure',body:"Ghana's cocoa cooperative sector is the most advanced in West Africa. This network — 800,000+ registered farmers — provides a ready organisational template for hemp outgrower programmes."},
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
      <MobileCollapse num="§ 08" title="Regulatory Roadmap" stat="5 Phases" label="to First Harvest">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 08</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Regulatory Roadmap</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>The Compliance Journey from Application to First Harvest</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px'}} className="tc mob-hide">
        <div>
          {[
            {phase:'Phase 1',label:'Pre-Application (Months 1–3)',steps:['Identify and survey cultivation site(s); obtain GPS coordinates for all plots','Commission soil test from MoFA-accredited laboratory','Secure land title or long-term lease agreement','Identify certified seed supplier — EU or Canadian certified varieties only','Draft farm management plan including security protocol and compliance procedures'],color:C.teal},
            {phase:'Phase 2',label:'Application (Months 2–4)',steps:['Submit NCC Cultivation Licence application via Cannabis Regulations Department','Pay application and licence fees (amounts to be confirmed with NCC)','Submit farm management plan, GPS maps, security design and seed source documentation','Undergo NCC site inspection','Await licence approval — estimated 8–16 weeks based on NCC guidance'],color:C.forest},
            {phase:'Phase 3',label:'Pre-Planting (Months 4–6)',steps:['Complete security fencing to NCC specifications: perimeter, signage, access control','Install GPS monitoring if required by licence conditions','Source and import/purchase certified seed with phytosanitary certificates','Hire licensed agronomist and compliance officer','Notify NCC of planting date per L.I. 2475 requirements'],color:C.limeDark},
            {phase:'Phase 4',label:'Growing & Compliance (Months 6–10)',steps:['Maintain detailed planting records: acreage, variety, seed lot, planting date','Conduct mid-season agronomic monitoring — pest, disease, growth stage checks','Submit in-season reports to NCC as required','Pre-harvest THC sampling: engage accredited testing laboratory (Licence 05 holder)','Receive compliance certificate or destruction order based on THC result'],color:C.amber},
            {phase:'Phase 5',label:'Harvest & Offtake (Months 9–14)',steps:['Harvest within the NCC-approved window following THC clearance','Complete chain-of-custody manifests for all biomass movements','Coordinate with licensed transporter (Licence 07) for farm-to-processor movements','Deliver to licensed processor with full documentation','File post-harvest yield and sales reports with NCC'],color:C.lime},
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
              {item:'Licence renewal',detail:'Every 3 years; site-specific; non-transferable'},
              {item:'Annual reports',detail:'Acreage planted, yield, offtake, testing results'},
              {item:'Pre-harvest THC testing',detail:'Every crop, every field; ISO 17025 lab required'},
              {item:'Chain-of-custody records',detail:'Seed-to-sale tracking per NCC requirements'},
              {item:'Security maintenance',detail:'Fencing, CCTV, access control — ongoing duty'},
              {item:'Staff vetting',detail:'Background checks for all staff with plant access'},
              {item:'Adverse event reporting',detail:'THC exceedance, theft, loss — immediate NCC notification'},
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
              {body:'Ministry of Food and Agriculture (MoFA)',role:'Agronomy guidance, seed certification, extension services'},
              {body:'Environmental Protection Agency (EPA)',role:'Environmental permits for farms over a certain threshold; water abstraction'},
              {body:'Ghana Revenue Authority (GRA)',role:'Tax obligations, import duties on equipment and seed'},
              {body:'Ghana Standards Authority (GSA)',role:'Food-grade seed and oil — quality standards compliance'},
              {body:'Local Assembly',role:'Land use, planning permission, community engagement'},
            ].map((r,i) => (
              <div key={i} style={{padding:'7px 0',borderBottom:i<4?`1px solid ${C.border}`:'none'}}>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>{r.body}</div>
                <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.muted}}>{r.role}</div>
              </div>
            ))}
          </div>
          <div style={{borderLeft:`3px solid ${C.amber}`,paddingLeft:'14px',background:C.paper,padding:'14px 14px 14px 16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.amber,marginBottom:'6px'}}>Hot Crop Protocol — Critical Risk</div>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.65,color:C.ink}}>If pre-harvest THC testing returns a result above 0.3%, the NCC will issue a destruction order. The crop must be destroyed under supervision. There is no insurance mechanism for this event under Ghana's current framework. <strong>Variety selection and seed sourcing are the primary mitigation — only use EU or Canadian certified varieties with confirmed tropical-environment THC compliance data.</strong></p>
          </div>
        </div>
      </div>
      <MobPhaseAccordion phases={[
        {phase:'Phase 1',label:'Pre-Application (Months 1–3)',color:C.teal,steps:['Identify and survey cultivation site(s); obtain GPS coordinates for all plots','Commission soil test from MoFA-accredited laboratory','Secure land title or long-term lease agreement','Identify certified seed supplier — EU or Canadian certified varieties only','Draft farm management plan including security protocol and compliance procedures']},
        {phase:'Phase 2',label:'Application (Months 2–4)',color:C.forest,steps:['Submit NCC Cultivation Licence application via Cannabis Regulations Department','Pay application and licence fees (amounts to be confirmed with NCC)','Submit farm management plan, GPS maps, security design and seed source documentation','Undergo NCC site inspection','Await licence approval — estimated 8–16 weeks based on NCC guidance']},
        {phase:'Phase 3',label:'Pre-Planting (Months 4–6)',color:C.limeDark,steps:['Complete security fencing to NCC specifications: perimeter, signage, access control','Install GPS monitoring if required by licence conditions','Source and import/purchase certified seed with phytosanitary certificates','Hire licensed agronomist and compliance officer','Notify NCC of planting date per L.I. 2475 requirements']},
        {phase:'Phase 4',label:'Growing & Compliance (Months 6–10)',color:C.amber,steps:['Maintain detailed planting records: acreage, variety, seed lot, planting date','Conduct mid-season agronomic monitoring — pest, disease, growth stage checks','Submit in-season reports to NCC as required','Pre-harvest THC sampling: engage accredited testing laboratory (Licence 05 holder)','Receive compliance certificate or destruction order based on THC result']},
        {phase:'Phase 5',label:'Harvest & Offtake (Months 9–14)',color:C.lime,steps:['Harvest within the NCC-approved window following THC clearance','Complete chain-of-custody manifests for all biomass movements','Coordinate with licensed transporter (Licence 07) for farm-to-processor movements','Deliver to licensed processor with full documentation','File post-harvest yield and sales reports with NCC']},
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
            r:'THC exceedance triggering crop destruction',
            sev:'HIGH',likelihood:'Medium',cat:'Agronomic / Regulatory',
            m:'Source only EU-certified cultivars with confirmed tropical-environment THC stability data. Commission multi-season agronomic trials before commercial planting. Implement pre-harvest monitoring protocol from flower onset. Budget for destruction in Year 1 financial model.',
          },
          {
            r:'No processor offtake — stranded production',
            sev:'HIGH',likelihood:'High (without mitigation)',cat:'Commercial',
            m:'Secure a binding offtake agreement before committing to planting. Explore equity participation with processor to align interests. Consider vertically integrated approach if no processor partner is available. The absence of a confirmed buyer is a go/no-go criterion.',
          },
          {
            r:'Licence application delays or refusal',
            sev:'MEDIUM',likelihood:'Medium',cat:'Regulatory',
            m:'Engage NCC Cannabis Regulations Department early — pre-application consultations are encouraged. Engage licensed regulatory consultants with direct NCC relationships. Ensure all documentation is complete before submission. Allow 12–16 weeks in project timeline before planting.',
          },
          {
            r:'Smallholder capital access constraints',
            sev:'MEDIUM',likelihood:'High (in cooperative models)',cat:'Financial',
            m:'Structure DFI-backed value-chain finance tied to offtake contracts. Engage Ghana Agricultural Development Bank (ADB) on hemp-specific agrifinance products. Build input credit into outgrower schemes. Consider blended grant-loan structures for first-cohort cooperatives.',
          },
          {
            r:'Variety performance in tropical conditions',
            sev:'MEDIUM',likelihood:'Medium',cat:'Agronomic',
            m:'Commission CSIR or KNUST adaptive trials before commercial planting. Partner with European or Canadian breeders for tropical-validated variety guidance. Maintain small trial plots of multiple certified varieties in first season to identify best performers.',
          },
          {
            r:'Law enforcement confusion and field interceptions',
            sev:'MEDIUM',likelihood:'Medium-High',cat:'Operational / Regulatory',
            m:'Maintain complete NCC licence documentation and compliance certificates on-farm and in all transport vehicles at all times. Pre-notify Ghana Police Service and relevant district authorities of cultivation activities. Engage NCC for law enforcement liaison letters before first planting.',
          },
          {
            r:'Community and social licence challenges',
            sev:'LOW-MEDIUM',likelihood:'Low-Medium',cat:'Social',
            m:'Conduct community engagement before site selection. Emphasise industrial and medicinal nature of low-THC hemp. Involve local leadership in cooperative governance structures. Position as rural employment and agricultural development initiative.',
          },
          {
            r:'FX risk on imported inputs (seed, equipment)',
            sev:'LOW-MEDIUM',likelihood:'Medium',cat:'Financial',
            m:'Source seed via GH-cedi-denominated local agents where possible. Hedge material FX exposures. Negotiate equipment pricing in USD with staged payment structures. Build FX contingency of 15–20% into capex budget.',
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
    {dim:'Market Opportunity',score:72,weight:'30%',rationale:"Ghana's agro-climatic fit is excellent and positions it competitively in a $21B global market by 2030. Score held back by early-stage domestic processing capacity — a cultivator without a processor is a cultivator without revenue."},
    {dim:'Development Impact',score:85,weight:'30%',rationale:'Cultivation scores highest on impact: it directly employs rural farmers, supports cooperative enterprise, builds agricultural capacity, and — through value-chain linkages — creates demand for processing, testing, transport and storage jobs. The inclusive model potential is uniquely strong.'},
    {dim:'Implementation Feasibility',score:60,weight:'25%',rationale:'The lowest-scoring dimension. THC compliance risk, limited local expertise in hemp agronomy, nascent processing sector, and absence of certified domestic seed are all feasibility constraints. Manageable but not trivial — hence cautious positioning.'},
    {dim:'Financial Sustainability',score:64,weight:'15%',rationale:'Per-hectare economics are viable but competitive. Margins are real in dual-purpose systems with confirmed offtake. Sensitivity to input costs (especially seed and fuel) and FX exposure on imported inputs keeps this score below the threshold of a "capital-light" opportunity.'},
  ];
  return (
  <div id="s10" className="pad-section" style={{background:C.ink,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 10" title="BRIDGE Score™" stat="72/100" label="Core Tier · Upstream" onDark={true}>
      <div style={{borderTop:`6px solid ${C.paper}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 10</span>
        <Eyebrow light>BRIDGE Impact Score™</Eyebrow>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.paper,lineHeight:1.2,marginBottom:'32px',maxWidth:'680px'}}>Cultivation Scores 72/100 — Strong Opportunity with Implementation Caution</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:'40px'}} className="tc">
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'16px'}}>Composite Score</div>
          <div style={{display:'flex',alignItems:'baseline',gap:'6px',marginBottom:'4px'}}>
            <div style={{fontFamily:F.mono,fontSize:'clamp(72px,12vw,120px)',fontWeight:500,color:C.lime,lineHeight:1}}>72</div>
            <div style={{fontFamily:F.mono,fontSize:'clamp(22px,4vw,36px)',fontWeight:300,color:'rgba(184,217,53,0.3)',lineHeight:1,marginBottom:'6px'}}>/100</div>
          </div>
          <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.28)',letterSpacing:'0.5px',marginBottom:'28px'}}>Core Tier · Upstream · NCC Licence 01</div>
          <ScoreBar label="Market Opportunity  ×30%" value={72} onDark/>
          <ScoreBar label="Development Impact  ×30%" value={85} onDark/>
          <ScoreBar label="Impl. Feasibility  ×25%" value={60} onDark/>
          <ScoreBar label="Financial Sustainability  ×15%" value={64} onDark/>
          <div style={{marginTop:'20px',borderTop:`1px solid rgba(255,255,255,0.08)`,paddingTop:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.3)',marginBottom:'10px'}}>Quick Parameters</div>
            {[{l:'Entry Barrier',v:'Medium'},{l:'Capital Intensity',v:'Medium–High'},{l:'Timeline to Revenue',v:'12–18 months'},{l:'Licence Tier',v:'Core · Upstream'}].map((p,i) => (
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
    {cat:'NCC Licence Fees',range:'$2K–8K',note:'Application + 3-year licence (estimate; confirm with NCC)'},
    {cat:'Land (lease, year 1)',range:'$4K–40K',note:'Varies by region and scale; northern zones cheapest'},
    {cat:'Security infrastructure',range:'$8K–40K',note:'Perimeter fencing, CCTV, access control (NCC requirement)'},
    {cat:'Seed (certified, year 1)',range:'$6K–35K',note:'EU/Canadian certified varieties; phytosanitary docs required'},
    {cat:'Soil prep & irrigation',range:'$15K–120K',note:'Highest cost item in northern irrigated systems'},
    {cat:'Equipment (tractor, baler)',range:'$20K–150K',note:'Hire vs. own decision depends on scale; hire first if uncertain'},
    {cat:'Agronomist & compliance officer',range:'$18K–48K/yr',note:'Local hire possible; specialist cannabis agronomy training needed'},
    {cat:'Working capital (1 season)',range:'$20K–80K',note:'Fertiliser, fuel, labour — before first harvest cash flow'},
    {cat:'Contingency (incl. hot-crop risk)',range:'15–20% of total',note:'Budget for one partial crop loss in financial model'},
  ];
  const SHOW_FIRST = 4;
  return (
  <div id="s11" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 11" title="Deployment" stat="$20K+" label="Minimum Capital to Enter">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 11</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Deployment Parameters</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>What It Takes to Enter Ghana's Cultivation Sector</h2>
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
              {role:'Farm Manager',spec:'Agronomy background; hemp or industrial crop experience preferred'},
              {role:'Compliance Officer',spec:'Regulatory documentation, NCC liaison, chain-of-custody management'},
              {role:'Licensed Agronomist',spec:'Mandatory for larger operations; MoFA-registered preferred'},
              {role:'Security Personnel',spec:'On-site 24/7 for NCC licence maintenance'},
              {role:'Bookkeeper / Finance',spec:'Regulatory-grade record keeping; NCC financial reporting'},
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
              The licensing regime opened in February 2026. Based on South African and Lesotho precedents, the competitive window before the first wave of processors is 12–24 months. Cultivators who secure processing relationships in this window will define the supply architecture for years.
            </p>
            <p style={{fontFamily:F.body,fontSize:'13px',fontWeight:300,color:'rgba(250,248,243,0.7)',lineHeight:1.75,marginBottom:'16px'}}>
              Unlike processing or export licences — which require significant capital and infrastructure build-out — cultivation can be initiated with a relatively modest investment and scaled rapidly once the first season's compliance and yield data de-risk the opportunity for larger investors.
            </p>
            {[
              {l:'Optimal entry window',v:'Now – Q2 2027'},
              {l:'First harvest (well-managed)',v:'Q4 2026 – Q2 2027'},
              {l:'Window before competition',v:'12–24 months'},
              {l:'Competitive advantage',v:'Processing relationship + regional supply base'},
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
                        <a href="/contact" style={{display:'inline-flex',alignItems:'center',gap:'8px',background:ctaBg,border:ctaBorder,color:ctaText,padding:'11px 18px',fontFamily:F.sans,fontSize:'10px',fontWeight:800,textDecoration:'none',letterSpacing:'0.3px',flexShrink:0}}>
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
              <a href="/contact" style={{display:'inline-flex',alignItems:'center',gap:'10px',background:C.lime,color:C.ink,padding:'12px 22px',fontFamily:F.sans,fontSize:'11px',fontWeight:800,textDecoration:'none',letterSpacing:'0.2px',flexShrink:0}}>
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
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(250,248,243,0.45)',letterSpacing:'0.3px'}}>Licence 01 of 11 · Ghana Cannabis Intelligence</div>
          <div style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(250,248,243,0.2)',marginTop:'2px'}}>Members Brief · March 2026 · BRIDGE PBC</div>
        </div>
      </div>
      <div className="footer-links" style={{display:'flex',gap:'20px',alignItems:'center'}}>
        {[{l:'All 11 Licences',h:'/resources'},{l:'Members',h:'/membership'},{l:'Engage BRIDGE',h:'/contact'},{l:'bridgepbc.com',h:'#'}].map((item,i) => (
          <a key={i} href={item.h} style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:i===2?C.lime:'rgba(250,248,243,0.3)',textDecoration:'none',letterSpacing:'0.2px'}}>{item.l}</a>
        ))}
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────────────────
export default function CultivationBrief() {
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
