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
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>Ghana Cannabis Intelligence · Licence 02 · Processing · Members Brief</span>
        <span className="mob-show" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>02 · Processing</span>
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
    <div style={{position:'absolute',right:'-20px',top:'-30px',fontFamily:F.display,fontSize:'clamp(180px,35vw,480px)',fontWeight:900,color:'rgba(255,255,255,0.022)',pointerEvents:'none',userSelect:'none',letterSpacing:'-12px',lineHeight:1}}>02</div>
    <div style={{maxWidth:'900px',margin:'0 auto',position:'relative'}}>
      <div ref={logoRef} style={{marginBottom:'36px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Logo height={30} variant="white"/>
        <div className="mob-hide" style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(250,248,243,0.22)',letterSpacing:'0.8px'}}>MARCH 2026 · NCC L.I. 2475</div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px',flexWrap:'wrap'}}>
        <div style={{background:C.lime,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'3px',textTransform:'uppercase',color:C.ink}}>LICENCE 02 · MID-CHAIN</div>
        <div style={{border:`1px solid ${C.lime}`,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime}}>CORE TIER</div>
        <div className="mob-hide" style={{border:`1px solid rgba(255,255,255,0.15)`,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.4)'}}>MEMBERS INTELLIGENCE</div>
      </div>
      <h1 style={{fontFamily:F.display,fontSize:'clamp(30px,5.5vw,68px)',fontWeight:900,color:C.paper,lineHeight:1.08,marginBottom:'20px',maxWidth:'800px'}}>
        Processing<br/>
        <span style={{fontWeight:400,fontStyle:'italic',color:'rgba(250,248,243,0.55)',fontSize:'0.72em'}}>The Value Multiplier at the Centre of Ghana's Hemp Economy</span>
      </h1>
      <PullQuote onDark>
        Ghana has no shortage of raw biomass potential. It has a near-total absence of processing infrastructure. The operator who builds the first compliant decorticator — or the first GMP extraction unit — does not just start a business. They become the buyer for every cultivator in the country.
      </PullQuote>
      <div style={{borderTop:`1px solid rgba(255,255,255,0.09)`,paddingTop:'28px',marginTop:'8px',display:'flex',flexWrap:'wrap'}} className="stats-row">
        {[
          {v:'78',  l:'BRIDGE Score™',      s:'Highest-scoring mid-chain position'},
          {v:'$21B',l:'Global Market 2030', s:'Hemp inputs to processing CAGR 18%+'},
          {v:'3–10×',l:'Value Multiplier',  s:'Farm-gate to processed output'},
          {v:'$300K–2M',l:'Entry Capital',  s:'Equipment · Facility · Compliance'},
          {v:'18–30mo',l:'Time to First Revenue',s:'Facility + licence + feedstock'},
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
          {n:'01',t:'Why Now — The February 2026 Milestone',s:'Legal framework, NCC licensing, what changed for processors',id:'s01'},
          {n:'02',t:'The Processing Thesis',s:'Every cultivator needs exactly one thing: a processor',id:'s02'},
          {n:'03',t:'Ghana Industrial & Infrastructure Fit',s:'Industrial zones, utilities, port access, sector integration',id:'s03'},
          {n:'04',t:'Business Models',s:'4 proven structures — decortication to GMP extraction',id:'s04'},
          {n:'05',t:'Unit Economics',s:'Per-tonne revenue, cost structure, 4 processing scenarios',id:'s05'},
          {n:'06',t:'Value Chain Position',s:"Processing's role — what it receives, what it unlocks",id:'s06'},
          {n:'07',t:'Competitive Landscape',s:'Ghana vs. 7 African peers — processing comparison',id:'s07'},
          {n:'08',t:'Regulatory Roadmap',s:'NCC + FDA compliance journey, GMP pathway, timeline',id:'s08'},
          {n:'09',t:'Risk Register',s:'Full matrix — 8 risks, severity, mitigations',id:'s09'},
          {n:'10',t:'BRIDGE Impact Score™',s:'4-dimension analysis, composite 78/100',id:'s10'},
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
      <MobileCollapse num="§ 01" title="Why Now" stat="Feb 2026" label="Processing Window Open" defaultOpen={true}>
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 01</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Why Now</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'32px',maxWidth:'700px'}}>26 February 2026: The Day Ghana's Hemp Clock Started — and Processors Became the Most Urgent Need</h2>
      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr',gap:'48px'}} className="tc">
        <div>
          <p className="dc" style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            On 26 February 2026, Ghana launched its national licensing regime for industrial and medicinal cannabis. The immediate implication for processing entrepreneurs is stark: cultivation licences are now being issued, seeds will be in the ground within months, and Ghana has zero licensed hemp processors. Every hectare planted creates a processor-shaped gap in the value chain.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            The legal architecture is in place. Act 1019 (2020), the reinstatement via Act 1100 (2023), and L.I. 2475 define the operating framework: 11 licence categories, NCC as the single regulator, a THC ceiling of 0.3%, and a three-year renewable licence with site-specific conditions. Licence 02 — Processing — is the mid-chain licence that unlocks commercial value from everything Licence 01 cultivators grow.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink}}>
            Without a licensed processor, cultivators cannot convert biomass into commodity. Without commodity, there is no export, no wholesale, no dispensing. Processing is not one licence among eleven — it is the licence that determines whether the entire value chain functions.
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
              {l:'Ghana FDA Role',v:'GMP / food / pharma product oversight'},
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
              Ghana's processing licence is unique in Africa: it covers decortication, seed processing, cannabinoid extraction, and value-added manufacturing under a single NCC framework — with Ghana FDA oversight for pharmaceutical and food-grade outputs.
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
            {yr:'Now',ev:'Processing Window Opens',sub:'Zero licensed processors in Ghana — first compliant facility becomes buyer for entire cultivation sector',col:C.lime},
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
// SECTION 02 — THE PROCESSING THESIS
// ─────────────────────────────────────────────────────────────────────────────
const Thesis = () => (
  <div id="s02" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 02" title="The Thesis" stat="3–10×" label="Value Multiplier">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 02</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>The Processing Thesis</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'32px',maxWidth:'680px'}}>Every Cultivator in Ghana Needs Exactly One Thing: A Processor</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px'}} className="tc">
        <div>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            Processing (Licence 02) is where agricultural output becomes industrial commodity. It is the highest-scoring licence in the BRIDGE analysis — not because it is easiest, but because it captures the largest value differential in the chain. Raw hemp stalks worth $180–280 per tonne at farm gate become decorticated fibre worth $280–450. Cold-pressed seed oil commands $800–1,800 per tonne. Cannabinoid extract reaches $2,000–8,000 per kilogram. The multiplier is 3–10×, and Ghana has no licensed processor to capture it.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            The global industrial hemp market is projected to grow from approximately $5.5–7.5 billion in 2023 to $16–23 billion by 2030 at a CAGR of 17.5–17.7%. Processing is the segment that captures the most margin in this trajectory: hemp fibre markets alone are forecast to reach $2 billion by 2033, and the hemp-derived CBD market is expected to grow from $5.5 billion in 2025 to nearly $13 billion by 2030.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink}}>
            Ghana's structural position is unusually strong. Existing manufacturing strengths in textiles, construction materials, food and beverages, and cosmetics all represent natural consuming industries for processed hemp outputs. Port access via Tema and Takoradi creates direct export reach to EU, UK and Middle East markets. And the absence of any existing processor creates a first-mover advantage with no precedent in African hemp sectors.
          </p>
        </div>
        <div>
          <PullQuote>
            The first licensed processor in Ghana does not just start a business — they become the mandatory buyer for every cultivator in the country. That is not a market position. That is a monopoly by default.
          </PullQuote>
          <div style={{background:C.paper,border:`1px solid ${C.border}`,padding:'20px',marginTop:'8px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Processing Value Multiplier — Per Tonne Output</div>
            {/* SVG Bar Chart — value per tonne by output type */}
            <svg viewBox="0 0 340 140" style={{width:'100%',display:'block'}}>
              {[
                {yr:'Raw stalk',v:22,val:'$220'},
                {yr:'Decorticated',v:36,val:'$365'},
                {yr:'Seed oil',v:80,val:'$1,300'},
                {yr:'Hempcrete',v:47,val:'$475'},
                {yr:'CBD extract',v:115,val:'$5,000+'},
              ].map((d,i) => (
                <g key={i}>
                  <rect x={10+i*64} y={140-d.v-20} width={46} height={d.v} fill={i===4?C.lime:i>=3?C.limeDark:C.border}/>
                  <text x={33+i*64} y={135} textAnchor="middle" style={{fontFamily:'DM Sans,sans-serif',fontSize:'7.5px',fill:C.muted}}>{d.yr}</text>
                  <text x={33+i*64} y={140-d.v-25} textAnchor="middle" style={{fontFamily:'DM Mono,monospace',fontSize:'8px',fontWeight:700,fill:i>=3?C.forest:C.muted}}>{d.val}</text>
                </g>
              ))}
              <text x={10} y={12} style={{fontFamily:'DM Sans,sans-serif',fontSize:'9px',fill:C.faint}}>USD / tonne (indicative mid-range)</text>
            </svg>
            <div style={{marginTop:'8px',display:'flex',gap:'12px',flexWrap:'wrap'}}>
              {[{c:C.border,l:'Primary output'},{c:C.limeDark,l:'Secondary output'},{c:C.lime,l:'Highest-value stream'}].map((s,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:'5px'}}>
                  <div style={{width:'10px',height:'10px',background:s.c,flexShrink:0}}/>
                  <span style={{fontFamily:F.sans,fontSize:'9px',color:C.muted}}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* 4 processing output drivers */}
      <div style={{marginTop:'40px',borderTop:`1px solid ${C.border}`,paddingTop:'28px'}}>
        <Eyebrow>Four Processing Output Streams · Ghana Context</Eyebrow>
        {/* Desktop grid */}
        <div className="mob-hide" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'0',marginTop:'14px'}}>
          {[
            {n:'Fibre Decortication',d:'Separates bast fibre and hurd from stalks. Fibre feeds textiles and automotive composites; hurd feeds hempcrete and animal bedding. CAGR 20.4% for hemp fibre.'},
            {n:'Seed Oil & Protein',d:'Cold-pressed hempseed oil for food and cosmetics; protein meal for nutrition. Plug directly into Ghana\'s existing edible-oil and cosmetics value chains.'},
            {n:'Cannabinoid Extraction',d:'CO₂ or ethanol extraction yields CBD and minor cannabinoids. Highest margin per unit. Requires GMP compliance — and commands pharmaceutical pricing.'},
            {n:'Construction Materials',d:'Hempcrete blocks and insulation from hurd and binder. South Africa\'s AFRIMAT Hemp demonstrates the model. Ghana\'s housing deficit creates ready domestic demand.'},
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
          {n:'Fibre Decortication',icon:'🧵',d:'Separates bast fibre and hurd. Fibre feeds textiles; hurd feeds hempcrete. CAGR 20.4% for hemp fibre through 2033.'},
          {n:'Seed Oil & Protein',icon:'🌿',d:'Cold-pressed hempseed oil for food and cosmetics; protein meal for nutrition. Plug into Ghana\'s existing edible-oil chains.'},
          {n:'Cannabinoid Extraction',icon:'⚗️',d:'CO₂ or ethanol extraction yields CBD. Highest margin per unit. Requires GMP — commands pharmaceutical pricing.'},
          {n:'Hempcrete & Construction',icon:'🏗️',d:'Hurd plus binder becomes hempcrete blocks. South Africa\'s AFRIMAT Hemp demonstrates the model at industrial scale.'},
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
      <MobileCollapse num="§ 03" title="Ghana Fit" stat="★★★★★" label="Industrial Infrastructure">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 03</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Ghana Industrial & Infrastructure Fit</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'12px',maxWidth:'700px'}}>The Manufacturing Base, Port Access, and Consuming Industries Are Already There</h2>
      <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'32px',maxWidth:'700px'}}>
        Processing is an industrial licence. Its success depends not just on regulation but on access to utilities, logistics, technical labour, and consuming industries. Ghana's existing manufacturing base — textiles, construction, food and beverages, cosmetics — provides natural offtake for every major processing output stream.
      </p>
      {/* Desktop zone grid */}
      <div className="mob-hide" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',marginBottom:'32px'}}>
        {[
          {
            zone:'Greater Accra Industrial Corridor',tier:'PRIMARY',color:C.lime,
            infra:'3-phase power, municipal water, paved access roads',
            logistics:'Tema Port: 30–60 min from industrial estates',
            sectors:'Textiles, food processing, cosmetics, pharmaceuticals',
            advantage:'Largest industrial labour pool in Ghana. Export documentation services concentrated here. Best utility reliability. Proximity to Ghana FDA offices for GMP compliance.',
            note:'Industrial estates: Tema, Spintex, Accra plains — all have licensed hemp processing potential',
          },
          {
            zone:'Kumasi & Ashanti Industrial Zone',tier:'HIGH FIT',color:C.lime,
            infra:'3-phase power, improving utilities, road access',
            logistics:'~250km from Tema; air freight via KIA possible for high-value extracts',
            sectors:'Cocoa processing, wood manufacturing, light industry',
            advantage:'Central Ghana location reduces feedstock transport cost from Ashanti and Bono cultivation zones. KNUST technical university provides process engineering and QC talent.',
            note:'Government agro-processing incentives active in Kumasi industrial corridor',
          },
          {
            zone:'Western Region (Takoradi Hub)',tier:'MEDIUM-HIGH FIT',color:C.limeDark,
            infra:'Industrial-grade utilities, port-adjacent zones',
            logistics:'Takoradi Port: direct container access for fibre and bulk exports',
            sectors:'Petroleum services, construction materials, port logistics',
            advantage:'Takoradi Port offers alternative export routing — strategic for bulk fibre and hurd. Construction sector presents immediate hempcrete block market.',
            note:'Hemp Block RSA South Africa model directly replicable here given construction sector density',
          },
          {
            zone:'Northern Industrial Zones (Tamale+)',tier:'EMERGING',color:C.amber,
            infra:'Utility coverage improving; generator backup often needed',
            logistics:'Land transport south to Tema; longer lead times',
            sectors:'Agricultural processing, shea, livestock',
            advantage:'Proximity to northern cultivation zones minimises stalk transport cost for fibre decorticators. Lower land and labour costs.',
            note:'Best suited for primary fibre/seed processing close to cultivation base; not for pharmaceutical extraction',
          },
        ].map((r,i) => (
          <div key={i} style={{border:`1px solid ${C.border}`,padding:'20px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
              <div style={{fontFamily:F.display,fontSize:'15px',fontWeight:700,color:C.ink,lineHeight:1.2,paddingRight:'12px'}}>{r.zone}</div>
              <div style={{background:r.color,color:r.color===C.amber?C.paper:C.ink,padding:'2px 8px',fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0}}>{r.tier}</div>
            </div>
            <div style={{marginBottom:'10px'}}>
              {[{l:'Infrastructure',v:r.infra},{l:'Logistics',v:r.logistics},{l:'Consuming sectors',v:r.sectors}].map((f,j) => (
                <div key={j} style={{display:'flex',gap:'8px',marginBottom:'5px'}}>
                  <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,minWidth:'80px',flexShrink:0,marginTop:'2px'}}>{f.l.toUpperCase()}</span>
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
      {/* Mobile carousel */}
      <MobCarousel items={[
        {zone:'Greater Accra Corridor',tier:'PRIMARY',color:C.lime,infra:'3-phase power, municipal water',logistics:'Tema Port 30–60 min',sectors:'Textiles · cosmetics · pharma',advantage:'Largest industrial labour pool. Ghana FDA proximity for GMP compliance. Best utility reliability.',note:'Tema, Spintex, Accra plains estates'},
        {zone:'Kumasi & Ashanti Zone',tier:'HIGH FIT',color:C.lime,infra:'3-phase power, improving utilities',logistics:'250km from Tema; KIA air freight',sectors:'Cocoa processing · light industry',advantage:'Central location reduces feedstock transport. KNUST engineering talent pool.',note:'Agro-processing incentives active'},
        {zone:'Takoradi Hub',tier:'MEDIUM-HIGH FIT',color:C.limeDark,infra:'Industrial utilities, port zones',logistics:'Takoradi Port direct container access',sectors:'Construction · port logistics',advantage:'Alternative export routing for bulk fibre and hurd. Hempcrete block market ready.',note:'Hemp Block RSA model replicable'},
        {zone:'Northern Zones',tier:'EMERGING',color:C.amber,infra:'Improving; generator often needed',logistics:'Land transport south to Tema',sectors:'Agro-processing · shea',advantage:'Proximity to cultivation base minimises stalk transport cost. Low land and labour.',note:'Best for primary fibre/seed; not pharma extraction'},
      ]} renderCard={(r,i) => (
        <div style={{border:`1px solid ${C.border}`,background:C.paper,padding:'18px',height:'100%'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
            <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:C.ink,lineHeight:1.2}}>{r.zone}</div>
            <div style={{background:r.color,color:r.color===C.amber?C.paper:C.ink,padding:'3px 8px',fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0,marginLeft:'8px'}}>{r.tier}</div>
          </div>
          {[{l:'Infrastructure',v:r.infra},{l:'Logistics',v:r.logistics},{l:'Sectors',v:r.sectors}].map((f,j) => (
            <div key={j} style={{display:'flex',gap:'8px',marginBottom:'6px'}}>
              <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,minWidth:'70px',flexShrink:0,paddingTop:'2px'}}>{f.l.toUpperCase()}</span>
              <span style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.45}}>{f.v}</span>
            </div>
          ))}
          <div style={{borderTop:`2px solid ${r.color}`,paddingTop:'10px',marginTop:'12px'}}>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.6,color:C.ink,marginBottom:'6px'}}>{r.advantage}</p>
            <p style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint,lineHeight:1.5}}>{r.note}</p>
          </div>
        </div>
      )}/>
      {/* Processing infrastructure requirements strip */}
      <div style={{background:C.paperDark,padding:'24px',borderTop:`3px solid ${C.ink}`}}>
        <Eyebrow>Processing Facility Requirements vs. Ghana's Industrial Provision</Eyebrow>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'0',marginTop:'14px'}} className="tc">
          {[
            {param:'3-Phase Power',req:'Industrial 415V',ghana:'Available in GAC, KMC, WR corridors',fit:'★★★★☆'},
            {param:'Water Supply',req:'Process + cooling water',ghana:'Municipal + borehole; industrial zones',fit:'★★★★☆'},
            {param:'Road Access',req:'Heavy-vehicle capable',ghana:'Yes in primary zones; north variable',fit:'★★★★☆'},
            {param:'Port Proximity',req:'<4 hr for export',ghana:'Tema & Takoradi: best in West Africa',fit:'★★★★★'},
            {param:'Technical Labour',req:'Engineers, QC officers',ghana:'KNUST, UG, UMAT graduate pipeline',fit:'★★★☆☆'},
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
      n:'01',name:'Fibre Decorticator',tag:'PRIMARY PROCESSING',color:C.teal,
      tagline:'Stalk in. Bast fibre and hurd out. The mechanical gateway to the value chain.',
      scale:'500–5,000 tonnes stalk/year · scales with cultivation sector',
      capital:'$150K–600K (decorticator line, facility, retting, storage)',
      timeline:'18–24 months to first commercial output',
      revenue:'$200–450/tonne processed fibre · $120–220/tonne hurd',
      fit:'★★★★★ First-mover opportunity — Ghana has zero decorticators',
      description:"A fibre decortication plant mechanically separates hemp stalks into bast fibre (for textiles, composites) and hurd (for hempcrete, animal bedding, construction materials). Primary processing is the most accessible entry point into Licence 02 — it does not require GMP certification, pharmaceutical-grade clean rooms, or complex chemical processes. A modular decorticator with a retting pre-treatment tank and a baling line is the minimum viable configuration. In Ghana's current market, the first compliant decorticator becomes the de-facto buyer for all fibre-crop cultivators.",
      requirements:['NCC Processing Licence (Licence 02)','Industrial facility: 500–2,000 sqm, 3-phase power, water supply, waste management','Decorticator equipment from EU or North American supplier (12–16 week lead time)','Retting infrastructure (dew or tank retting) or enzymatic retting capability','Feedstock supply contracts with Licence 01 cultivation licence holders'],
      advantages:['Lowest regulatory burden in the processing spectrum — no GMP required for fibre','First Ghana decorticator has captive demand from all cultivation licence holders','Hurd is a co-product: hempcrete construction market is large and domestic','Equipment payback models well at $280–450/tonne decorticated fibre with stable throughput'],
      risks:['Plant is idle without cultivator supply — feedstock risk is existential before sector scales','Global fibre price volatility can compress margins in commodity-grade fibre','Equipment import lead times (12–16 weeks) plus installation delay require long planning cycle'],
      ideal:'Agro-industrial operators, construction materials businesses, investors seeking first-mover industrial positioning in Ghana cannabis economy',
    },
    {
      n:'02',name:'Seed Oil Press',tag:'FOOD & COSMETICS',color:C.forest,
      tagline:'Cold-press hempseed into food-grade oil and protein. Plug into existing supply chains.',
      scale:'50–500 tonnes seed/year · scalable with sector growth',
      capital:'$80K–350K (cold-press line, food-grade facility, GMP-lite setup)',
      timeline:'12–18 months to first commercial output',
      revenue:'$800–1,800/tonne oil · $400–900/tonne protein meal',
      fit:'★★★★☆ Fastest path to revenue — food-grade inputs into existing Ghanaian chains',
      description:"A cold-press seed oil facility processes hemp seeds into food-grade hempseed oil and protein meal for nutrition, cosmetics and personal care markets. US FDA has declared hulled hemp seed, hemp seed protein powder and hemp seed oil Generally Recognised as Safe (GRAS), supporting export credibility. The seed oil model is the most accessible entry point for SMEs: cold-press screw presses and seed shellers are available from suppliers in Europe and China at modest capital outlay, and the equipment can often process other oilseeds (sunflower, millet) in the hemp off-season, improving asset utilisation.",
      requirements:['NCC Processing Licence (Licence 02)','Food-grade facility: HACCP-compliant layout, clean surfaces, pest control','Cold-press oil extraction equipment + seed sheller/dehulling line','Ghana FDA food product registration for hempseed oil and protein','Feedstock supply agreement with Licence 01 seed-crop cultivators'],
      advantages:["Lowest capital entry in Licence 02 spectrum — basic cold-press unit under $80K",'Seed oil and protein plug directly into Ghana\'s existing edible-oil, cosmetics and health-food supply chains','US FDA GRAS status for food-grade hemp seed products supports export documentation','Can diversify across oilseed crops to improve year-round facility utilisation'],
      risks:['Depends on seed-variety cultivation — requires grain/dual-purpose crop cultivators, not fibre-only','Ghana FDA product registration process for novel food ingredients has uncertain timeline','Global seed oil markets are competitive — differentiation on quality and organic certification is needed'],
      ideal:'Food processors, cosmetics manufacturers, health supplement SMEs, and impact investors targeting the domestic and West African food market',
    },
    {
      n:'03',name:'Cannabinoid Extraction',tag:'PHARMACEUTICAL GRADE',color:C.ink,
      tagline:'CO₂ or ethanol extraction. Highest margin per unit. Requires GMP discipline.',
      scale:'5–50 tonnes biomass/year (high value, low volume)',
      capital:'$300K–1.5M (CO₂ or ethanol extraction unit, GMP facility)',
      timeline:'24–36 months to first commercial output',
      revenue:'$2,000–8,000/kg extract (CBD/CBG, low-THC compliant)',
      fit:'★★★☆☆ Highest value but highest complexity — partner or phase entry recommended',
      description:"Cannabinoid extraction uses CO₂ or ethanol processes to yield CBD, CBG, and minor cannabinoids from compliant low-THC hemp biomass. The output — crude extracts, distillates, or crystalline isolates — serves pharmaceutical APIs, nutraceuticals, and high-end cosmetics. This is the highest-margin processing stream. African case studies (Lesotho EU-GMP certified producers) demonstrate the export revenue potential when GMP standards are achieved. For Ghana, the realistic pathway is a mid-scale nutraceutical-grade facility initially, evolving toward full API-grade operations as market and regulatory capacity develops. NCC and Ghana FDA dual-compliance is mandatory.",
      requirements:['NCC Processing Licence (Licence 02) — cannabinoid extraction specifically reviewed by NCC','Ghana FDA GMP certification for pharmaceutical or nutraceutical-grade outputs','CO₂ or ethanol extraction equipment in explosion-protected process area','Validated QMS: SOPs, batch records, deviation management, analytical testing','Qualified Person (QP) equivalent oversight and analytical laboratory access'],
      advantages:['3–10× value multiplier over raw biomass — highest revenue per tonne in entire value chain','GMP-certified Ghanaian extractor would be the first in West Africa — structural first-mover advantage','Access to EU, UK and pharmaceutical export markets with highest margins','Lesotho precedent proves African GMP certification is achievable and financially transformative'],
      risks:['GMP certification is capital and time-intensive — $40K–150K for facility audit, QMS documentation alone','Regulatory ambiguity: NCC is still developing cannabinoid processing guidelines — policy risk is real','Bulk CBD market has experienced global oversupply — positioning toward pharmaceutical grade essential'],
      ideal:'Well-capitalised investors, pharmaceutical companies, joint ventures with international GMP-certified extraction partners, and DFI-backed projects with patient capital',
    },
    {
      n:'04',name:'Integrated Processing Hub',tag:'FULL VALUE CHAIN',color:C.limeDark,
      tagline:'Decortication + seed pressing + extraction in one facility. Capture every stream.',
      scale:'1,000–10,000+ tonnes biomass/year · multiple input streams',
      capital:'$800K–3M (multi-stream facility, all licences, GMP zones)',
      timeline:'30–48 months to full multi-stream operation',
      revenue:'Multiple streams: fibre, hurd, oil, protein, extracts',
      fit:'★★★☆☆ Maximum value capture — requires patient capital and sophisticated management',
      description:"The integrated processing hub combines decortication, seed oil pressing, and cannabinoid extraction in a single facility with shared infrastructure, compliance management, and logistics. It becomes the central offtake point for multiple cultivation licence holders, creating a supplier-processor ecosystem that anchors the entire sector. This mirrors the vertically integrated processors in European hemp (HempFlax Netherlands) and the aspirational model for South Africa's R40B sector target. For Ghana, this structure is most appropriate for an agro-industrial zone or GIPC free-zone operation combining Ghanaian landholding, processing expertise, and international market access.",
      requirements:['NCC Processing Licence (Licence 02) covering all sub-activities','Ghana FDA GMP for pharmaceutical/nutraceutical stream; HACCP for food/cosmetic streams','Multi-zone facility design: general manufacturing, food-grade zone, GMP cleanroom','Multiple feedstock supply contracts across Licence 01 cultivator network','ISO 9001, ISO 22000, and/or pharmaceutical GMP certifications for respective outputs'],
      advantages:['Captures value across fibre, food, cosmetic and pharmaceutical markets simultaneously','Shared facility costs (utilities, security, compliance team) improve unit economics across all streams','Becomes the sector anchor — cultivators, exporters and wholesale distributors all depend on this facility','Most attractive structure for international strategic investment and DFI blended finance'],
      risks:['Very high capital requirement — most appropriate for second-phase investment after Licence 02 sector matures','Simultaneous compliance across multiple regulatory regimes (NCC, FDA, EPA) requires large management team','Feedstock dependency on multiple Licence 01 holders whose supply is itself in early development'],
      ideal:'Multinational agribusinesses, impact investment funds, Ghana GIPC strategic project applicants, and joint ventures combining Ghanaian licence holding with international processing operations',
    },
  ];
  const m = models[active];
  return (
    <div id="s04" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <MobileCollapse num="§ 04" title="Business Models" stat="4 Models" label="$80K to $3M Entry">
        <SectionRule/>
        <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
          <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 04</span>
          <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Business Models</span>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>Four Routes into Ghana's Processing Sector — from Decorticator to GMP Hub</h2>
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
      <MobileCollapse num="§ 05" title="Unit Economics" stat="3–10×" label="Value Multiplier">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 05</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Unit Economics</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'12px',maxWidth:'680px'}}>What One Tonne of Hemp Is Worth — After Processing</h2>
      <p style={{fontFamily:F.body,fontSize:'15px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'36px',maxWidth:'700px'}}>
        Processing economics are defined by the value multiplier: what raw biomass is worth vs. what the processed output commands. The multiplier ranges from 1.5–2× for basic decortication to 30–40× for GMP-grade cannabinoid extraction. The chart below shows revenue per tonne of input biomass across four processing streams.
      </p>
      {/* Revenue scenarios chart */}
      <div style={{background:C.paperDark,padding:'28px',marginBottom:'32px'}}>
        <Eyebrow>Revenue Per Tonne of Input Biomass · 4 Processing Scenarios (USD)</Eyebrow>
        <div style={{marginTop:'18px'}}>
          {[
            {label:'Raw Baled Fibre (unprocessed)',v:230,max:5500,note:'Farm-gate price — sold without decortication'},
            {label:'Decorticated Fibre Output',v:365,max:5500,note:'Bast fibre after decortication — 1.5–2× raw stalk value'},
            {label:'Hempseed Oil (cold-press)',v:1300,max:5500,note:'Mid-range cold-pressed food/cosmetic grade'},
            {label:'CBD/CBG Extract (low-THC)',v:5000,max:5500,note:'Nutraceutical-grade extract — GMP compliance required'},
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
            <span style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.muted}}>Revenue per tonne of input. Net processing margins: 35–55% for fibre/seed; 55–75% for extracts at scale.</span>
          </div>
        </div>
      </div>
      {/* Cost structure */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',marginBottom:'32px'}} className="tc">
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Operating Cost Structure — Per Tonne Processed</div>
          {[
            {item:'Feedstock purchase (raw biomass)',range:'$150–280/t',pct:'35–50%',note:'Paid to Licence 01 cultivators at farm-gate price'},
            {item:'Energy (3-phase power, water)',range:'$20–80/t',pct:'5–15%',note:'Higher for extraction; lower for mechanical decortication'},
            {item:'Labour (processing, QC, logistics)',range:'$30–90/t',pct:'8–18%',note:'Ghana skilled labour cost advantage vs. EU'},
            {item:'Consumables (filters, solvents, packaging)',range:'$15–120/t',pct:'4–20%',note:'Highest for extraction; minimal for fibre/seed'},
            {item:'Compliance & testing',range:'$20–60/t',pct:'5–10%',note:'Batch testing, NCC reporting, Ghana FDA audit costs'},
            {item:'Maintenance & depreciation',range:'$25–80/t',pct:'6–12%',note:'Equipment-intensive; extraction > decortication'},
            {item:'Environmental management',range:'$10–40/t',pct:'2–6%',note:'Effluent treatment, dust control, waste disposal'},
            {item:'Working capital carrying cost',range:'$10–30/t',pct:'2–5%',note:'Feedstock purchase to payment receipt gap'},
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
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>Entry Capital Ranges by Model (USD)</div>
            {[
              {scale:'Seed oil press (basic)', capex:'$80K–350K', note:'Cold-press + sheller + food-grade facility'},
              {scale:'Fibre decorticator (modular)', capex:'$150K–600K', note:'Decorticator + retting + baling + facility'},
              {scale:'Cannabinoid extraction unit', capex:'$300K–1.5M', note:'CO₂ or ethanol + GMP facility + QMS'},
              {scale:'Integrated processing hub', capex:'$800K–3M', note:'Multi-stream; all above combined'},
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
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.7,color:C.ink,marginBottom:'10px'}}>A seed oil press with confirmed offtake can achieve breakeven in <strong>2–3 years</strong> at mid-range throughput. A fibre decorticator with stable supply contracts targets <strong>3–4 years</strong>. Cannabinoid extraction requires <strong>4–6 years</strong> given GMP certification lead times.</p>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.7,color:C.ink,marginBottom:'10px'}}>Without confirmed feedstock supply agreements, breakeven extends significantly as idle plant capacity accumulates fixed costs with zero revenue.</p>
            <div style={{borderLeft:`2px solid ${C.amber}`,paddingLeft:'10px'}}>
              <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.amber,lineHeight:1.6}}>⚠ Do not commission a processing facility without signed feedstock supply agreements. The single most common failure mode in new hemp processing is underutilised plant capacity due to insufficient cultivator supply.</p>
            </div>
          </div>
          <div style={{marginTop:'16px',border:`1px solid ${C.border}`,padding:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Ghana Processing Cost Advantage vs. EU</div>
            {[
              {item:'Industrial labour',gh:'$6–12/hr skilled operator',eu:'$28–45/hr equivalent',adv:'60–70% lower'},
              {item:'Industrial land (lease)',gh:'$4–15/sqm/yr (industrial zone)',eu:'$40–120/sqm/yr',adv:'70–80% lower'},
              {item:'Utilities (power, water)',gh:'Comparable; reliability variable',eu:'Higher cost, better reliability',adv:'Mixed'},
            ].map((r,i) => (
              <div key={i} style={{padding:'7px 0',borderBottom:i<2?`1px solid ${C.border}`:'none'}}>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,marginBottom:'2px'}}>{r.item}</div>
                <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
                  <span style={{fontFamily:F.body,fontSize:'10px',color:C.muted}}>Ghana: {r.gh}</span>
                  <span style={{fontFamily:F.body,fontSize:'10px',color:C.muted}}>EU: {r.eu}</span>
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
    {num:'03',name:'Breeding & Seed',pos:'UPSTREAM',color:C.teal,rel:'SUPPLIES'},
    {num:'08',name:'Import',pos:'TRADE',color:C.teal,rel:'ENABLES'},
    {num:'01',name:'Cultivation',pos:'UPSTREAM',color:C.forest,rel:'FEEDS RAW'},
    {num:'05',name:'Testing Lab',pos:'ENABLING',color:C.limeDark,rel:'CERTIFIES'},
    {num:'06',name:'Storage',pos:'ENABLING',color:C.limeDark,rel:'STORES FOR'},
    {num:'07',name:'Transport',pos:'ENABLING',color:C.limeDark,rel:'MOVES TO'},
    {num:'02',name:'Processing',pos:'MID-CHAIN',color:C.lime,rel:null,active:true},
    {num:'10',name:'Wholesale',pos:'MID-CHAIN',color:C.forest,rel:'BUYS FROM'},
    {num:'09',name:'Export',pos:'TRADE',color:C.teal,rel:'EXPORTS'},
    {num:'11',name:'Dispensing',pos:'DOWNSTREAM',color:C.forest,rel:'SUPPLIES'},
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
      <MobileCollapse num="§ 06" title="Value Chain" stat="6 of 11" label="Licences Feed Into This">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 06</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Value Chain Position</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>The Mid-Chain Node That Converts Raw Biomass into Tradeable Commodity</h2>
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
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>What Processing Receives From Other Licences</div>
          {[
            {lic:'Licence 01 — Cultivation',role:'Primary feedstock supplier. Raw stalks, grain, and floral biomass. Processing is commercially dependent on cultivation scale and quality.'},
            {lic:'Licence 07 — Transport',role:'Delivers biomass from farm gate to processing facility with NCC chain-of-custody documentation. Essential logistics partner.'},
            {lic:'Licence 05 — Testing Lab',role:'Provides THC compliance certificates for inputs and outputs. Testing is mandatory before and after processing for export and pharma streams.'},
            {lic:'Licence 08 — Import',role:'Supplies processing equipment, GMP reagents, and certified seed in early years before domestic supply chains mature.'},
          ].map((r,i) => (
            <div key={i} style={{padding:'10px 0',borderBottom:`1px solid ${C.border}`}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,marginBottom:'3px'}}>{r.lic}</div>
              <p style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.6}}>{r.role}</p>
            </div>
          ))}
        </div>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>What Processing Unlocks for Other Licences</div>
          {[
            {lic:'Licence 09 — Export',role:'Processed commodities — fibre bales, seed oil, extracts — are the primary export products. Without processing, export licences have nothing to ship.'},
            {lic:'Licence 10 — Wholesale & Distribution',role:'Distributes processed outputs to domestic buyers: cosmetics manufacturers, food processors, construction companies, pharmacies.'},
            {lic:'Licence 11 — Dispensing & Retail',role:'GMP-grade processed extracts and formulations are the product dispensaries sell. Processing is the upstream supplier to the entire dispensing sector.'},
            {lic:'Licence 04 — R&D',role:'Processors provide the extraction and processing infrastructure that R&D facilities use for variety trials and product development.'},
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
      <MobileCollapse num="§ 07" title="Competition" stat="0" label="Licensed Processors in Ghana">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 07</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Competitive Landscape</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>Ghana vs. Seven African Hemp Processors — Where Does Processing Infrastructure Stand?</h2>
      {/* Desktop table */}
      <div className="mob-hide" style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',minWidth:'680px'}}>
          <thead>
            <tr style={{background:C.ink}}>
              {['Country','Status','Processing Infrastructure','Port Export Access','GMP Capacity','Framework Maturity','BRIDGE View'].map((h,i) => (
                <th key={i} style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.35)',textAlign:'left',borderRight:i<6?`1px solid rgba(255,255,255,0.05)`:'none'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {country:'🇬🇭 Ghana',status:'Active 2026',proc:'★☆☆☆☆ — Zero licensed',port:'★★★★★',gmp:'★★☆☆☆',fw:'★★★☆☆',view:'First processor captures entire sector',hl:true},
              {country:'🇿🇦 South Africa',status:'Active 2023',proc:'★★★☆☆ — Multiple facilities',port:'★★★☆☆',gmp:'★★★☆☆',fw:'★★★★★',view:'R40B target; most mature ecosystem'},
              {country:'🇱🇸 Lesotho',status:'Active 2017',proc:'★★★★☆ — EU-GMP certified',port:'★☆☆☆☆',gmp:'★★★★★',fw:'★★★★★',view:'First Africa EU-GMP export; landlocked'},
              {country:'🇿🇼 Zimbabwe',status:'Active 2022',proc:'★★☆☆☆ — Limited',port:'★☆☆☆☆',gmp:'★★☆☆☆',fw:'★★★☆☆',view:'Medicinal focus; no port advantage'},
              {country:'🇲🇼 Malawi',status:'Active 2020',proc:'★★☆☆☆ — Early stage',port:'★☆☆☆☆',gmp:'★☆☆☆☆',fw:'★★☆☆☆',view:'Strong smallholder base; weak processing'},
              {country:'🇿🇲 Zambia',status:'Emerging',proc:'★☆☆☆☆ — Pre-commercial',port:'★★☆☆☆',gmp:'★☆☆☆☆',fw:'★★☆☆☆',view:'Large land; infrastructure lagging'},
              {country:'🇰🇪 Kenya',status:'Emerging 2023',proc:'★★☆☆☆ — Building',port:'★★★☆☆',gmp:'★★☆☆☆',fw:'★★☆☆☆',view:'East Africa competitor; incomplete regs'},
              {country:'🇲🇦 Morocco',status:'Recent 2021',proc:'★★☆☆☆ — Traditional',port:'★★★★☆',gmp:'★★☆☆☆',fw:'★★★☆☆',view:'EU proximity strong; late sector entrant'},
            ].map((r,i) => (
              <tr key={i} style={{background:r.hl?`rgba(184,217,53,0.07)`:i%2===0?C.paper:C.paperDark}}>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'12px',fontWeight:r.hl?700:400,color:C.ink,borderBottom:`1px solid ${C.border}`}}>{r.country}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:C.muted,borderBottom:`1px solid ${C.border}`}}>{r.status}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:r.hl?C.forest:C.ink,fontWeight:r.hl?700:400,borderBottom:`1px solid ${C.border}`}}>{r.proc}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:r.hl?C.forest:C.ink,fontWeight:r.hl?700:400,borderBottom:`1px solid ${C.border}`}}>{r.port}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:C.ink,borderBottom:`1px solid ${C.border}`}}>{r.gmp}</td>
                <td style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'10px',color:C.ink,borderBottom:`1px solid ${C.border}`}}>{r.fw}</td>
                <td style={{padding:'10px 12px',fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:r.hl?C.forest:C.muted,borderBottom:`1px solid ${C.border}`}}>{r.view}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile country cards */}
      <MobCountryCards countries={[
        {country:'🇬🇭 Ghana',status:'Active 2026',aFit:'★☆☆☆☆ — Zero licensed processors',port:'★★★★★',labour:'★★★★☆',fw:'★★★☆☆',sm:'First processor captures entire sector — zero domestic competition',view:'Ghana is the most attractive processing destination in Africa — port access plus zero incumbent competition.',hl:true},
        {country:'🇿🇦 South Africa',status:'Active 2023',aFit:'★★★☆☆ — Multiple facilities',port:'★★★☆☆',labour:'★★★☆☆',fw:'★★★★★',sm:'Most mature processing ecosystem in Africa; R40B sector target',view:'Most developed framework; but processing market is already competitive and landlocked vs. Tema'},
        {country:'🇱🇸 Lesotho',status:'Active 2017',aFit:'★★★★☆ — EU-GMP certified',port:'★☆☆☆☆',labour:'★★★★☆',fw:'★★★★★',sm:'First Africa EU-GMP export; landlocked severely limits scale',view:'Lesotho proved African GMP export is achievable — but landlocked penalty makes Ghana more attractive'},
        {country:'🇿🇼 Zimbabwe',status:'Active 2022',aFit:'★★☆☆☆ — Limited facilities',port:'★☆☆☆☆',labour:'★★★★☆',fw:'★★★☆☆',sm:'Medicinal focus; processing infrastructure nascent',view:'Landlocked; processing is underdeveloped relative to cultivation ambitions'},
        {country:'🇲🇼 Malawi',status:'Active 2020',aFit:'★★☆☆☆ — Early stage',port:'★☆☆☆☆',labour:'★★★★★',fw:'★★☆☆☆',sm:'Strong smallholder base; processing barely started',view:'Cheap labour advantage; framework and infrastructure both weak'},
        {country:'🇰🇪 Kenya',status:'Emerging 2023',aFit:'★★☆☆☆ — Building',port:'★★★☆☆',labour:'★★★☆☆',fw:'★★☆☆☆',sm:'East Africa competitor; port access at Mombasa',view:'Potential East Africa rival; incomplete regulations slow processing investment'},
        {country:'🇿🇲 Zambia',status:'Emerging',aFit:'★☆☆☆☆ — Pre-commercial',port:'★★☆☆☆',labour:'★★★★☆',fw:'★★☆☆☆',sm:'Framework significantly lags — processing very early',view:'Large land; processing infrastructure does not yet exist'},
        {country:'🇲🇦 Morocco',status:'Recent 2021',aFit:'★★☆☆☆ — Traditional',port:'★★★★☆',labour:'★★★☆☆',fw:'★★★☆☆',sm:'EU proximity strong for fibre; regulatory late entrant',view:'EU proximity is a genuine advantage for fibre; late mover vs. established processors'},
      ]}/>
      <PullQuote>
        Ghana's processing advantage is not just geography — it is timing. Every other African hemp market that has active processing infrastructure already has incumbents. Ghana has none. The first licensed processor in Ghana has no domestic competition, guaranteed feedstock demand, and direct port access to the highest-value export markets on earth.
      </PullQuote>
      <div style={{background:C.paperDark,padding:'20px',marginTop:'8px'}}>
        <Eyebrow>Ghana's Processing Structural Advantages — The Non-Replicable Edge</Eyebrow>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0',marginTop:'14px'}} className="tc3">
          {[
            {title:'Zero Incumbent Competition',body:'Ghana has zero licensed hemp processors as of March 2026. Every other African market with an active processing sector has multiple operators. The first-mover in Ghana inherits the entire cultivation sector as captive feedstock supply.'},
            {title:'Port Geography',body:'Tema and Takoradi give direct ocean access to EU, UK, and Middle East markets. Container costs 30–40% lower than landlocked competitors routing through Durban or Dar es Salaam. Critical for bulk fibre and extract export.'},
            {title:'Industrial Base Integration',body:'Ghana\'s existing textile, construction, food and cosmetics industries are natural consumers of every major processing output. Unlike landlocked markets that must export everything, Ghana processors can sell domestically at premium margins.'},
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
      <MobileCollapse num="§ 08" title="Regulatory Roadmap" stat="5 Phases" label="to First Output">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 08</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Regulatory Roadmap</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>The Compliance Journey from Facility Planning to First Commercial Output</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px'}} className="tc mob-hide">
        <div>
          {[
            {phase:'Phase 1',label:'Pre-Application & Facility Planning (Months 1–4)',steps:['Select industrial zone location — GAC, Kumasi or Takoradi preferred for utility access and port logistics','Conduct utility assessment: 3-phase power load, water supply, wastewater management capacity','Identify equipment suppliers — decorticators, cold-press, or extraction systems — and confirm lead times (12–16 weeks typical)','Engage Ghana FDA for pre-consultation on product classification (food, pharma, cosmetic) and applicable standards','Draft facility layout plan and process flow documentation for NCC and FDA review'],color:C.teal},
            {phase:'Phase 2',label:'NCC Licence Application (Months 3–6)',steps:['Submit NCC Processing Licence (Licence 02) application to Cannabis Regulations Department','Submit facility plan, equipment list, security design, and process description','Pay NCC processing licence application and approval fees (confirm current amounts with NCC)','Undergo NCC facility inspection — site must be secure, access-controlled, and cannabis-tracking-capable','Await NCC processing licence approval — allow 8–16 weeks in project timeline'],color:C.forest},
            {phase:'Phase 3',label:'Ghana FDA Registration & GMP Setup (Months 4–10)',steps:['Register products with Ghana FDA under applicable category (food, supplement, herbal medicine, drug)','Implement GMP or HACCP system appropriate to product type — pharmaceutical GMP if extraction; food GMP for seed oil','Commission laboratory QC capability or agree testing service level agreement with accredited lab (Licence 05 holder)','Complete environmental impact assessment and EPA permit application if required by facility size','Install NCC-required cannabis tracking and chain-of-custody management systems'],color:C.limeDark},
            {phase:'Phase 4',label:'Equipment Installation & Commissioning (Months 8–14)',steps:['Take delivery of decorticator, cold-press, or extraction equipment — customs clearance requires HS code verification','Install and commission equipment; run dry trials before biomass introduction','Validate process: yield tests, output quality benchmarking, contaminant testing','Complete operator training and safety procedures — explosion protection if solvent extraction','Pre-commission NCC inspection before first biomass intake'],color:C.amber},
            {phase:'Phase 5',label:'First Production Run & Commercial Operation (Months 14–20)',steps:['Receive first licensed biomass from Licence 01 cultivators with NCC chain-of-custody manifests','Process and batch-test all outputs — THC, heavy metals, microbiological (if food/pharma grade)','Register first batches with Ghana FDA and NCC as required','Execute offtake agreements with domestic buyers or export licence holders','File production and sales reports with NCC per licence conditions'],color:C.lime},
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
              {item:'NCC licence renewal',detail:'Every 3 years; site-specific; non-transferable without NCC approval'},
              {item:'Batch testing',detail:'Every processing batch — THC, contaminants; records retained for NCC audit'},
              {item:'Chain-of-custody records',detail:'Biomass intake to output dispatch — seed-to-product tracking mandatory'},
              {item:'Ghana FDA annual GMP audit',detail:'For pharmaceutical and food-grade outputs; audit fee applies'},
              {item:'NCC production reports',detail:'Quarterly: volumes processed, outputs sold, inventory balance'},
              {item:'Environmental monitoring',detail:'Effluent and emissions per EPA permit conditions'},
              {item:'Adverse event reporting',detail:'Contamination, out-of-spec batch, theft — immediate NCC and FDA notification'},
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
              {body:'Ghana Food and Drugs Authority (FDA)',role:'GMP inspection and product registration for food, pharma and cosmetic outputs'},
              {body:'Environmental Protection Agency (EPA)',role:'EIA and effluent permit for larger facilities; solvent extraction requires special conditions'},
              {body:'Ghana Standards Authority (GSA)',role:'Product standards compliance for food-grade and construction materials outputs'},
              {body:'Ghana Revenue Authority (GRA)',role:'Tax obligations; import duties on processing equipment and GMP consumables'},
              {body:'Local Assembly / GIPC',role:'Planning permission; free-zone status application if export-oriented'},
            ].map((r,i) => (
              <div key={i} style={{padding:'7px 0',borderBottom:i<4?`1px solid ${C.border}`:'none'}}>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>{r.body}</div>
                <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.muted}}>{r.role}</div>
              </div>
            ))}
          </div>
          <div style={{borderLeft:`3px solid ${C.amber}`,paddingLeft:'14px',background:C.paper,padding:'14px 14px 14px 16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.amber,marginBottom:'6px'}}>GMP Certification — The Critical Path for Extraction</div>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.65,color:C.ink}}>Pharmaceutical-grade cannabinoid extraction requires full GMP certification. This process — facility audit, QMS documentation, Ghana FDA validation — typically takes 6–18 months and costs $40K–150K before first product can be registered and sold. <strong>Plan GMP certification as a parallel workstream, not a sequential one. It is the longest lead-time item in the extraction pathway.</strong></p>
          </div>
        </div>
      </div>
      <MobPhaseAccordion phases={[
        {phase:'Phase 1',label:'Pre-Application & Facility Planning (Months 1–4)',color:C.teal,steps:['Select industrial zone location — GAC, Kumasi or Takoradi preferred','Conduct utility assessment: power, water, wastewater','Identify equipment suppliers and confirm lead times','Engage Ghana FDA for product classification pre-consultation','Draft facility layout and process flow documentation']},
        {phase:'Phase 2',label:'NCC Licence Application (Months 3–6)',color:C.forest,steps:['Submit NCC Processing Licence (Licence 02) application','Submit facility plan, equipment list, security design','Pay NCC processing licence fees (confirm with NCC)','Undergo NCC facility inspection','Await licence approval — allow 8–16 weeks']},
        {phase:'Phase 3',label:'Ghana FDA Registration & GMP Setup (Months 4–10)',color:C.limeDark,steps:['Register products with Ghana FDA under applicable category','Implement GMP or HACCP system appropriate to product type','Commission QC lab capability or testing SLA with Licence 05 holder','Complete EPA permit application if required','Install NCC cannabis tracking and chain-of-custody systems']},
        {phase:'Phase 4',label:'Equipment Installation & Commissioning (Months 8–14)',color:C.amber,steps:['Take delivery of equipment — customs clearance, HS code verification','Install and commission; run dry trials before biomass','Validate process: yield, quality, contaminant testing','Complete operator training and safety procedures','Pre-commission NCC inspection before first biomass intake']},
        {phase:'Phase 5',label:'First Production Run (Months 14–20)',color:C.lime,steps:['Receive first licensed biomass from Licence 01 cultivators with manifests','Process and batch-test all outputs — THC, heavy metals, microbio','Register batches with Ghana FDA and NCC','Execute offtake agreements with buyers or export licence holders','File production and sales reports with NCC per licence conditions']},
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
            r:'Feedstock supply failure — idle processing plant',
            sev:'HIGH',likelihood:'High (without mitigation)',cat:'Commercial / Supply Chain',
            m:'Sign binding feedstock supply agreements with at least two Licence 01 holders before commissioning equipment. Consider equity participation in a cultivation operation to align supply incentives. Build 3–6 months working capital to weather seasonal supply gaps. Do not commission until cultivation sector has a minimum viable supply base.',
          },
          {
            r:'GMP certification delays blocking pharmaceutical revenue',
            sev:'HIGH',likelihood:'Medium-High',cat:'Regulatory',
            m:'Begin GMP certification process in parallel with NCC licensing — not sequentially. Engage experienced GMP consultants familiar with Ghana FDA processes. Budget 6–18 months for certification and $40K–150K in audit and QMS costs. For seed oil or fibre operations, HACCP/food-grade standards are faster and less costly than pharmaceutical GMP.',
          },
          {
            r:'Capital intensity — equipment cost overruns and FX exposure',
            sev:'MEDIUM-HIGH',likelihood:'Medium',cat:'Financial',
            m:'All major processing equipment (decorticators, extraction systems) is sourced from EU, Canada or China and priced in USD or EUR. Build 20–25% FX contingency into capex budget. Negotiate payment terms with staggered milestones rather than upfront lump sum. Explore leasing structures for large extraction units to preserve working capital.',
          },
          {
            r:'Regulatory ambiguity on cannabinoid extraction under NCC review',
            sev:'MEDIUM',likelihood:'Medium',cat:'Regulatory',
            m:'Engage NCC Cannabis Regulations Department directly on cannabinoid extraction processing guidelines before equipment procurement. Join Ghana Cannabis Association if operational to receive regulatory update notifications. Structure initial operations around lower-risk fibre and seed processing while cannabinoid rules are clarified. Build regulatory risk into investor documentation.',
          },
          {
            r:'Skilled technician gap — hemp processing expertise absent in Ghana',
            sev:'MEDIUM',likelihood:'High',cat:'Operational',
            m:'Factor international technical training into capex and opex budget — equipment vendors typically offer commissioning and operator training packages. Partner with KNUST chemical engineering and food science departments for QC officer pipeline. Explore short-term secondments from South African or European processors during commissioning phase. Document all processes in Standard Operating Procedures from Day 1.',
          },
          {
            r:'Market price volatility — global fibre and CBD price cycles',
            sev:'MEDIUM',likelihood:'Medium',cat:'Commercial',
            m:'Diversify processing streams to reduce dependence on any single commodity price. Lock in offtake prices in contracts where possible — domestic buyers (textile mills, cosmetic manufacturers, construction companies) are more price-stable than commodity export markets. For CBD, position toward pharmaceutical-grade GMP output, which commands price premium over commodity wellness-grade extract.',
          },
          {
            r:'Wastewater and environmental compliance — wet processing effluent',
            sev:'LOW-MEDIUM',likelihood:'Medium (for retting and extraction operations)',cat:'Environmental / Operational',
            m:'Design effluent management system into facility from inception — retrofitting is significantly more costly. Engage EPA early for pre-consultation on effluent standards. Valorise byproducts where possible: seed hulls as animal feed, hurd fines as bioenergy feedstock, reducing waste volume. Budget for wastewater treatment capex as a non-optional facility line item.',
          },
          {
            r:'NCC licence conditions more restrictive than anticipated',
            sev:'LOW-MEDIUM',likelihood:'Low-Medium',cat:'Regulatory',
            m:'Engage licensed regulatory consultants with direct NCC Processing Licence experience before submitting application. Attend NCC information sessions and industry working groups. Build compliance buffer into facility design — over-invest slightly in security, chain-of-custody systems, and documentation infrastructure to avoid licence conditions creating operational constraints post-approval.',
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
    {dim:'Market Opportunity',score:82,weight:'30%',rationale:"Processing commands 3–10× the per-unit value of raw cultivation. The global hemp market trajectory — $21B by 2030, CAGR 17.5%+ — is driven primarily by demand for processed outputs: fibre, seed oil, and cannabinoid extracts. Ghana has zero licensed processors and direct port access to the highest-value export markets. The first compliant facility captures the entire domestic supply base."},
    {dim:'Development Impact',score:80,weight:'30%',rationale:'Every processing job requires 5–8 cultivation jobs upstream. The multiplier effect is the strongest in the value chain. Processing also anchors investment in testing, transport, storage, and export — triggering a cascade of downstream economic activity. GMP-grade pharmaceutical processing creates the highest-skill employment in the entire cannabis sector.'},
    {dim:'Implementation Feasibility',score:70,weight:'25%',rationale:'Higher than cultivation because the risk profile is more controllable — feedstock quality and equipment selection are manageable variables. However, capital intensity is significant, GMP certification is complex and time-intensive, and skilled processing technicians are absent from the current Ghanaian labour market. Equipment lead times and import logistics add execution complexity.'},
    {dim:'Financial Sustainability',score:76,weight:'15%',rationale:'Margins are strong in dual-stream and extract operations. Single-stream fibre decorticators are viable but sensitive to global fibre pricing. Seed oil and pharmaceutical extraction operations offer the strongest margin profiles. Revenue diversification across multiple processing streams is the most robust financial structure.'},
  ];
  return (
  <div id="s10" className="pad-section" style={{background:C.ink,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 10" title="BRIDGE Score™" stat="78/100" label="Core Tier · Mid-Chain" onDark={true}>
      <div style={{borderTop:`6px solid ${C.paper}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 10</span>
        <Eyebrow light>BRIDGE Impact Score™</Eyebrow>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.paper,lineHeight:1.2,marginBottom:'32px',maxWidth:'680px'}}>Processing Scores 78/100 — The Highest-Scoring Mid-Chain Position in Ghana's Cannabis Economy</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:'40px'}} className="tc">
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'16px'}}>Composite Score</div>
          <div style={{display:'flex',alignItems:'baseline',gap:'6px',marginBottom:'4px'}}>
            <div style={{fontFamily:F.mono,fontSize:'clamp(72px,12vw,120px)',fontWeight:500,color:C.lime,lineHeight:1}}>78</div>
            <div style={{fontFamily:F.mono,fontSize:'clamp(22px,4vw,36px)',fontWeight:300,color:'rgba(184,217,53,0.3)',lineHeight:1,marginBottom:'6px'}}>/100</div>
          </div>
          <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.28)',letterSpacing:'0.5px',marginBottom:'28px'}}>Core Tier · Mid-Chain · NCC Licence 02</div>
          <ScoreBar label="Market Opportunity  ×30%" value={82} onDark/>
          <ScoreBar label="Development Impact  ×30%" value={80} onDark/>
          <ScoreBar label="Impl. Feasibility  ×25%" value={70} onDark/>
          <ScoreBar label="Financial Sustainability  ×15%" value={76} onDark/>
          <div style={{marginTop:'20px',borderTop:`1px solid rgba(255,255,255,0.08)`,paddingTop:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.3)',marginBottom:'10px'}}>Quick Parameters</div>
            {[{l:'Entry Barrier',v:'Medium–High'},{l:'Capital Intensity',v:'High'},{l:'Timeline to Revenue',v:'18–30 months'},{l:'Licence Tier',v:'Core · Mid-Chain'}].map((p,i) => (
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
    {cat:'NCC Processing Licence',range:'$5K–15K',note:'Higher fee than cultivation; confirm current amounts with NCC Cannabis Dept.'},
    {cat:'GMP Certification (if pharmaceutical)',range:'$40K–150K',note:'Facility audit, QMS documentation, Ghana FDA validation — parallel workstream'},
    {cat:'Building / Facility Lease or Build',range:'$60K–300K',note:'Industrial zone preferred; 500–2,000 sqm depending on processing stream'},
    {cat:'Decorticator + Retting Equipment',range:'$80K–400K',note:'EU-sourced; 12–16 week lead time; installation and commissioning extra'},
    {cat:'Seed Oil Press (cold-press)',range:'$30K–120K',note:'Local assembly possible for basic units; food-grade facility requirements apply'},
    {cat:'Extraction Equipment (if cannabinoid)',range:'$150K–800K',note:'CO₂ or ethanol; GMP-grade; includes solvent-recovery and safety systems'},
    {cat:'Utilities (3-phase power, water)',range:'$20K–80K',note:'Industrial connection; northern zones may require generator backup'},
    {cat:'QC Laboratory or Testing SLA',range:'$15K–80K',note:'In-house basic QC or annual testing contract with Licence 05 lab'},
    {cat:'Working capital (6 months pre-revenue)',range:'$40K–120K',note:'Feedstock purchase + operating costs before first batch revenue received'},
  ];
  const SHOW_FIRST = 4;
  return (
  <div id="s11" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 11" title="Deployment" stat="$80K+" label="Minimum Capital to Enter">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 11</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Deployment Parameters</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>What It Takes to Enter Ghana's Processing Sector</h2>
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
              {role:'Processing Plant Manager',spec:'Industrial or food processing background; hemp or cannabis experience a strong advantage'},
              {role:'QC / Compliance Officer',spec:'GMP documentation, NCC chain-of-custody management, batch record oversight'},
              {role:'Equipment Technician (×2)',spec:'Mechanical or electrical engineering background; vendor training mandatory at commissioning'},
              {role:'Logistics Coordinator',spec:'Feedstock intake management, dispatch, chain-of-custody documentation'},
              {role:'Finance / Regulatory Admin',spec:'NCC reporting, Ghana FDA liaison, invoicing, working capital management'},
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
              Ghana currently has zero licensed hemp processors. The cultivation licensing window opened in February 2026. Seeds will be in the ground within months. The first licensed processor — whether a decorticator, seed oil press, or extraction unit — becomes the de-facto buyer for every cultivator in the country with no domestic competition.
            </p>
            <p style={{fontFamily:F.body,fontSize:'13px',fontWeight:300,color:'rgba(250,248,243,0.7)',lineHeight:1.75,marginBottom:'16px'}}>
              Lesotho's experience is instructive: the first GMP-certified processor in Africa became its first medical cannabis exporter to the EU. The same first-mover dynamic applies to Ghana's processing sector — the window before competitors emerge is 18–30 months from the February 2026 launch.
            </p>
            {[
              {l:'Optimal entry window',v:'Now – Q3 2027'},
              {l:'First output (seed oil / fibre)',v:'18–24 months from commitment'},
              {l:'First output (GMP extraction)',v:'24–36 months from commitment'},
              {l:'Competitive advantage',v:'Zero domestic incumbents — captive cultivator feedstock'},
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
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(250,248,243,0.45)',letterSpacing:'0.3px'}}>Licence 02 of 11 · Ghana Cannabis Intelligence</div>
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
export default function ProcessingBrief() {
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
