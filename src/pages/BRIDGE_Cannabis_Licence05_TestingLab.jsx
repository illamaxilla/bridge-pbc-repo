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
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>Ghana Cannabis Intelligence · Licence 05 · Testing Lab · Members Brief</span>
        <span className="mob-show" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>05 · Testing Lab</span>
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
    <div style={{position:'absolute',right:'-20px',top:'-30px',fontFamily:F.display,fontSize:'clamp(180px,35vw,480px)',fontWeight:900,color:'rgba(255,255,255,0.022)',pointerEvents:'none',userSelect:'none',letterSpacing:'-12px',lineHeight:1}}>05</div>
    <div style={{maxWidth:'900px',margin:'0 auto',position:'relative'}}>
      <div ref={logoRef} style={{marginBottom:'36px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Logo height={30} variant="white"/>
        <div className="mob-hide" style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(250,248,243,0.22)',letterSpacing:'0.8px'}}>MARCH 2026 · NCC L.I. 2475</div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px',flexWrap:'wrap'}}>
        <div style={{background:C.lime,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'3px',textTransform:'uppercase',color:C.ink}}>LICENCE 05 · ENABLING</div>
        <div style={{border:`1px solid ${C.lime}`,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime}}>CORE TIER</div>
        <div className="mob-hide" style={{border:`1px solid rgba(255,255,255,0.15)`,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.4)'}}>MEMBERS INTELLIGENCE</div>
      </div>
      <h1 style={{fontFamily:F.display,fontSize:'clamp(30px,5.5vw,68px)',fontWeight:900,color:C.paper,lineHeight:1.08,marginBottom:'20px',maxWidth:'800px'}}>
        Testing Laboratory<br/>
        <span style={{fontWeight:400,fontStyle:'italic',color:'rgba(250,248,243,0.55)',fontSize:'0.72em'}}>The Quality Gatekeeper That Every Other Licence Depends On</span>
      </h1>
      <PullQuote onDark>
        No certificate, no commerce. Ghana's cannabis economy cannot operate without pre-harvest THC testing. No cultivation licence holder can sell biomass. No processor can dispatch product. No exporter can clear customs. The first ISO 17025-accredited hemp testing lab in Ghana does not compete for market share — it owns a mandatory revenue stream from every other licence in the value chain.
      </PullQuote>
      <div style={{borderTop:`1px solid rgba(255,255,255,0.09)`,paddingTop:'28px',marginTop:'8px',display:'flex',flexWrap:'wrap'}} className="stats-row">
        {[
          {v:'75',      l:'BRIDGE Score™',              s:'Core Tier · Enabling'},
          {v:'11',      l:'Licences Need Test Certs',    s:'Every licence in the value chain'},
          {v:'$0',      l:'Licensed Hemp Testing Labs',  s:'First lab owns the market — zero competition'},
          {v:'$800K–2.5M',l:'Revenue Potential (Yr 3)', s:'At projected sector throughput'},
          {v:'12–18mo', l:'Time to First Revenue',       s:'Accreditation + calibration + NCC approval'},
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
          {n:'01',t:'Why Now — The February 2026 Milestone',s:'Testing is mandatory from Day 1 — and Ghana has no lab',id:'s01'},
          {n:'02',t:'The Testing Lab Thesis',s:'No certificate, no commerce — the gatekeeper position',id:'s02'},
          {n:'03',t:'Ghana Lab Infrastructure Fit',s:'ISO 17025 ecosystem, instrument access, analyst talent',id:'s03'},
          {n:'04',t:'Business Models',s:'4 lab configurations — THC-only to full-service reference lab',id:'s04'},
          {n:'05',t:'Unit Economics',s:'Per-sample pricing, throughput economics, revenue scenarios',id:'s05'},
          {n:'06',t:'Value Chain Position',s:"Testing lab's role — gatekeeper and enabler for all 11 licences",id:'s06'},
          {n:'07',t:'Competitive Landscape',s:'Ghana vs. 7 African peers — testing infrastructure comparison',id:'s07'},
          {n:'08',t:'Regulatory Roadmap',s:'NCC approval, ISO 17025 accreditation, GSA recognition',id:'s08'},
          {n:'09',t:'Risk Register',s:'Full matrix — 8 risks, severity, mitigations',id:'s09'},
          {n:'10',t:'BRIDGE Impact Score™',s:'4-dimension analysis, composite 75/100',id:'s10'},
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
      <MobileCollapse num="§ 01" title="Why Now" stat="Feb 2026" label="Testing Demand Starts Now" defaultOpen={true}>
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 01</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Why Now</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'32px',maxWidth:'700px'}}>26 February 2026: Every Cultivation Licence Issued Creates Mandatory Testing Demand — With Zero Labs to Serve It</h2>
      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr',gap:'48px'}} className="tc">
        <div>
          <p className="dc" style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            On 26 February 2026, Ghana launched its national licensing regime for industrial and medicinal cannabis. For the testing laboratory sector, this date has an immediate and unambiguous commercial consequence: every Licence 01 cultivation holder must conduct pre-harvest THC testing before any biomass can be moved or sold. Ghana's NCC framework mandates ≤0.3% THC across all licensed hemp. There is currently no NCC-approved, ISO 17025-accredited hemp testing laboratory in Ghana. Zero.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            The legal architecture creates the demand. Act 1019 (2020), Act 1100 (2023), and L.I. 2475 define mandatory THC compliance testing at every critical point in the supply chain: pre-harvest sampling, post-harvest lot verification, processed product batch release, and export certification. Every single one of the 11 licence categories either produces samples that need testing or consumes products that require a certificate of analysis.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink}}>
            The global cannabis testing services market was $2.5 billion in 2024 and is projected to reach $7.6 billion by 2030 at a 15.2% CAGR. In every regulated cannabis market that has launched before Ghana, the testing laboratory has been the first infrastructure piece that operators actually pay for — before the first crop is harvested and before the first gram is sold.
          </p>
        </div>
        <div>
          <div style={{background:C.ink,padding:'24px',marginBottom:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>Testing Lab Framework at a Glance</div>
            {[
              {l:'NCC Licence',v:'Licence 05 · Testing Laboratory'},
              {l:'Testing Trigger',v:'Mandatory THC ≤ 0.3% compliance'},
              {l:'Standard Required',v:'ISO/IEC 17025 accreditation'},
              {l:'Accreditation Body',v:'Ghana Standards Authority (GNAS)'},
              {l:'Test Points',v:'Pre-harvest · post-harvest · export'},
              {l:'Licensed Labs in Ghana',v:'Zero — 2026 baseline'},
              {l:'Primary Instrument',v:'HPLC (cannabinoid) + GC-MS (terpenes)'},
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
              South Africa's Ecogreen Analytics is the only publicly recognised ISO 17025-accredited cannabis testing lab in sub-Saharan Africa. Ghana has none. The first Ghanaian lab to achieve NCC approval and ISO 17025 accreditation captures a mandatory, recurring revenue stream from every other licence holder with zero domestic competition.
            </p>
          </div>
        </div>
      </div>
      {/* Timeline visual */}
      <div style={{marginTop:'40px',borderTop:`1px solid ${C.border}`,paddingTop:'28px'}}>
        <Eyebrow>Testing Demand Timeline · 2026–2030</Eyebrow>
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
      <MobileCollapse num="§ 02" title="The Thesis" stat="$7.6B" label="2030 Testing Market">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 02</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>The Testing Lab Thesis</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'32px',maxWidth:'680px'}}>Every Downstream Opportunity Runs Through This Licence</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px'}} className="tc">
        <div>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            The testing laboratory (Licence 05) holds the most structurally secure position in Ghana's cannabis value chain. It does not grow, process, or sell hemp. It certifies that hemp meets the legal standard without which nothing else can move. Pre-harvest THC testing is not optional — it is the compliance trigger that determines whether a crop is worth harvesting or must be destroyed. Every single Licence 01 holder is a compulsory customer.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            The global cannabis testing services market was $2.42 billion in 2025 and is projected to reach $7.19 billion by 2030 at a CAGR of 16.6%. Growth is driven by expanding legal markets, proliferating product forms (edibles, extracts, topicals), and regulatory moves mandating comprehensive testing panels. In California alone, mandatory testing is estimated to add roughly 10% to the wholesale price of cannabis — underlining both the revenue potential for labs and the commercial stakes for licence holders who depend on clean certificates of analysis.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink}}>
            Ghana's competitive position is unique: zero licensed hemp testing labs exist as of March 2026. South Africa's Ecogreen Analytics is the only publicly recognised ISO 17025-accredited cannabis testing operation in sub-Saharan Africa. The first Ghanaian lab to achieve NCC approval and ISO 17025 accreditation inherits the entire domestic market by default — and can immediately position for regional West African demand as neighbouring countries follow Ghana's licensing model.
          </p>
        </div>
        <div>
          <PullQuote>
            Every cannabis crop in Ghana requires a test. Every batch of processed product requires a test. Every export shipment requires a test. The testing lab does not compete for customers — it is the mandatory checkpoint that every other licence holder must pass through.
          </PullQuote>
          <div style={{background:C.paper,border:`1px solid ${C.border}`,padding:'20px',marginTop:'8px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Global Cannabis Testing Market — Growth Trajectory (USD Billions)</div>
            {/* SVG Bar Chart */}
            <svg viewBox="0 0 340 140" style={{width:'100%',display:'block'}}>
              {[
                {yr:'2022',v:32,val:'$1.5B'},
                {yr:'2024',v:52,val:'$2.5B'},
                {yr:'2025',v:60,val:'$2.42B'},
                {yr:'2027',v:80,val:'$4.0B'},
                {yr:'2028',v:95,val:'$5.5B'},
                {yr:'2030',v:115,val:'$7.2B'},
              ].map((d,i) => (
                <g key={i}>
                  <rect x={10+i*54} y={140-d.v-20} width={38} height={d.v} fill={i===5?C.lime:i>=4?C.limeDark:C.border}/>
                  <text x={29+i*54} y={135} textAnchor="middle" style={{fontFamily:'DM Sans,sans-serif',fontSize:'8px',fill:C.muted}}>{d.yr}</text>
                  <text x={29+i*54} y={140-d.v-25} textAnchor="middle" style={{fontFamily:'DM Mono,monospace',fontSize:'8px',fontWeight:700,fill:i>=4?C.forest:C.muted}}>{d.val}</text>
                </g>
              ))}
              <text x={10} y={12} style={{fontFamily:'DM Sans,sans-serif',fontSize:'9px',fill:C.faint}}>USD Billions — Cannabis Testing Services Market (CAGR 16.6%)</text>
            </svg>
            <div style={{marginTop:'8px',display:'flex',gap:'12px',flexWrap:'wrap'}}>
              {[{c:C.border,l:'Historical'},{c:C.limeDark,l:'Projected'},{c:C.lime,l:'2030 target'}].map((s,i) => (
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
        <Eyebrow>Four Structural Demand Drivers for Cannabis Testing</Eyebrow>
        {/* Desktop grid */}
        <div className="mob-hide" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'0',marginTop:'14px'}}>
          {[
            {n:'Mandatory THC Compliance',d:'Every cultivation licence requires pre-harvest THC sampling. Ghana law mandates ≤0.3% THC. No exception, no waiver. Crop destruction is the alternative to a clean certificate.'},
            {n:'Supply Chain Gate Points',d:'Testing is required at pre-harvest, post-harvest, processing output, and export shipment. Each gate point is a separate fee-generating sample — one crop generates 3–5 test events.'},
            {n:'Export Market Access',d:'EU, UK, and pharmaceutical export markets require COA from ISO 17025-accredited labs. Ghana exporters cannot access premium markets without an accredited domestic testing partner.'},
            {n:'Multi-Sector Diversification',d:'The same HPLC, GC-MS, and ICP-MS instruments used for cannabis testing serve food safety, pharmaceutical QC, cocoa export compliance, and environmental monitoring — all major Ghanaian sectors.'},
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
          {n:'Mandatory THC Compliance',icon:'🔬',d:'Every cultivation licence requires pre-harvest THC testing. ≤0.3% THC mandatory. No exception — crop destruction is the alternative to a clean certificate.'},
          {n:'Supply Chain Gates',icon:'📋',d:'Pre-harvest, post-harvest, processing output, export shipment — each gate generates a separate test event. One crop = 3–5 fee-generating samples.'},
          {n:'Export Market Access',icon:'🌍',d:'EU, UK, pharmaceutical markets require ISO 17025 COA. Ghana exporters cannot access premium markets without accredited domestic testing partner.'},
          {n:'Multi-Sector Revenue',icon:'🏭',d:'HPLC and GC-MS instruments also serve food safety, pharma QC, cocoa exports, and environmental monitoring — diversified revenue reduces cannabis dependency.'},
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
      <MobileCollapse num="§ 03" title="Ghana Fit" stat="★★★★☆" label="Lab Infrastructure Ready">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 03</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Ghana Lab Infrastructure Fit</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'12px',maxWidth:'700px'}}>Ghana Has ISO 17025 Expertise, Trained Analysts, and Multi-Industry Lab Infrastructure</h2>
      <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'32px',maxWidth:'700px'}}>
        A cannabis testing lab in Ghana is not starting from zero. Ghana has operational ISO 17025-accredited labs in food safety, pharmaceuticals, mining, and environmental sectors. The instruments, QA systems, and trained laboratory scientists already exist — they need to be focused on cannabis.
      </p>
      <div className="mob-hide" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',marginBottom:'32px'}}>
        {[
          {
            zone:'Greater Accra — Primary Lab Location',tier:'PRIMARY',color:C.lime,
            infra:'ISO 17025 consultancy support: Factocert, SGS Ghana both active',
            inst:'Food & Drugs Authority lab, CSIR Food Research Institute, Noguchi analytical labs',
            fit:'Largest pool of analytical chemists and lab scientists in Ghana. Ghana Standards Authority (GNAS) accreditation body is based in Accra. Regulatory engagement with NCC and Ghana FDA is most accessible from Accra.',
            note:'Recommended primary location for first NCC-approved testing lab — regulatory access + analyst talent',
          },
          {
            zone:'Kumasi — Secondary Hub',tier:'HIGH FIT',color:C.lime,
            infra:'KNUST Department of Chemistry — GC, HPLC, ICP instruments',
            inst:'Komfo Anokye Teaching Hospital labs, KNUST analytical facilities',
            fit:'KNUST chemistry and pharmacy departments have active instrument parks. Central Ghana location reduces sample transport time from Ashanti and Bono cultivation zones. Strong analytical chemistry graduate pipeline.',
            note:'Natural satellite lab location once primary Accra lab is established',
          },
          {
            zone:'Takoradi / Western Region',tier:'MEDIUM FIT',color:C.limeDark,
            infra:'Oil & gas sector labs — HPLC, ICP-MS infrastructure present',
            inst:'Mining and petroleum sector analytical services',
            fit:'Existing industrial analytical infrastructure from oil and gas sector is directly transferable. Proximity to Takoradi port enables export certificate testing for cannabis shipments. Less cannabis cultivation activity in region but export relevance is high.',
            note:'Strategic location for export-oriented testing once cultivation sector matures in Western Region',
          },
          {
            zone:'Northern Zones — Sample Collection Points',tier:'EMERGING',color:C.amber,
            infra:'Mobile testing units; remote sample collection points',
            inst:'University for Development Studies (UDS), CSIR-SARI',
            fit:'Northern cultivation zones require pre-harvest THC testing in field. Mobile testing units or registered sample collection points (with sample transport to Accra lab) are viable models for Phase 1. Full satellite lab only viable once northern cultivation scales.',
            note:'Mobile testing unit model solves northern zone access before full satellite lab is justified',
          },
        ].map((r,i) => (
          <div key={i} style={{border:`1px solid ${C.border}`,padding:'20px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
              <div style={{fontFamily:F.display,fontSize:'14px',fontWeight:700,color:C.ink,lineHeight:1.2,paddingRight:'12px'}}>{r.zone}</div>
              <div style={{background:r.color,color:r.color===C.limeDark||r.color===C.amber?C.ink:C.ink,padding:'2px 8px',fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0,whiteSpace:'nowrap'}}>{r.tier}</div>
            </div>
            {[{l:'Infrastructure',v:r.infra},{l:'Institutions',v:r.inst},{l:'Fit rationale',v:r.fit}].map((f,j) => (
              <div key={j} style={{display:'flex',gap:'8px',marginBottom:'5px'}}>
                <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,minWidth:'72px',flexShrink:0,marginTop:'2px'}}>{f.l.toUpperCase()}</span>
                <span style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.5}}>{f.v}</span>
              </div>
            ))}
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'8px',marginTop:'10px'}}>
              <p style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint,lineHeight:1.5}}>{r.note}</p>
            </div>
          </div>
        ))}
      </div>
      <MobCarousel items={[
        {zone:'Greater Accra',tier:'PRIMARY',color:C.lime,infra:'SGS Ghana, Factocert ISO 17025 support',inst:'FDA lab, CSIR FRI, Noguchi',fit:'Largest analyst pool. GNAS accreditation body here. Regulatory access.',note:'Primary lab location'},
        {zone:'Kumasi',tier:'HIGH FIT',color:C.lime,infra:'KNUST GC, HPLC, ICP labs',inst:'KNUST Chemistry, KATH labs',fit:'Central location reduces sample transport. Strong analytical chemistry graduates.',note:'Natural satellite once Accra lab established'},
        {zone:'Takoradi',tier:'MEDIUM FIT',color:C.limeDark,infra:'Oil & gas sector HPLC/ICP-MS',inst:'Mining/petroleum analytical labs',fit:'Export-oriented: port proximity enables cannabis export certificate testing.',note:'Strategic for export-linked testing'},
        {zone:'Northern Zones',tier:'EMERGING',color:C.amber,infra:'Mobile units + sample collection points',inst:'UDS, CSIR-SARI',fit:'Mobile testing for pre-harvest northern cultivation. Sample transport to Accra feasible.',note:'Mobile unit solves northern access in Phase 1'},
      ]} renderCard={(r,i) => (
        <div style={{border:`1px solid ${C.border}`,background:C.paper,padding:'18px',height:'100%'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
            <div style={{fontFamily:F.display,fontSize:'16px',fontWeight:700,color:C.ink,lineHeight:1.2}}>{r.zone}</div>
            <div style={{background:r.color,color:C.ink,padding:'3px 8px',fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0,marginLeft:'8px'}}>{r.tier}</div>
          </div>
          {[{l:'Infrastructure',v:r.infra},{l:'Institutions',v:r.inst},{l:'Fit',v:r.fit}].map((f,j) => (
            <div key={j} style={{display:'flex',gap:'8px',marginBottom:'6px'}}>
              <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,minWidth:'64px',flexShrink:0,paddingTop:'2px'}}>{f.l.toUpperCase()}</span>
              <span style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.45}}>{f.v}</span>
            </div>
          ))}
          <div style={{borderTop:`2px solid ${r.color}`,paddingTop:'8px',marginTop:'10px'}}>
            <p style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint}}>{r.note}</p>
          </div>
        </div>
      )}/>
      <div style={{background:C.paperDark,padding:'24px',borderTop:`3px solid ${C.ink}`}}>
        <Eyebrow>Lab Infrastructure Requirements vs. Ghana's Current Provision</Eyebrow>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'0',marginTop:'14px'}} className="tc">
          {[
            {param:'HPLC Systems',req:'Cannabinoid quantification',ghana:'Available via instrument suppliers; KNUST has operational HPLCs',fit:'★★★★☆'},
            {param:'ISO 17025 Support',req:'Accreditation body + consultant',ghana:'SGS Ghana, Factocert, GNAS active',fit:'★★★★☆'},
            {param:'Analytical Chemists',req:'BSc/MSc level minimum',ghana:'KNUST, UG, UCC graduate pipeline — 200+/yr',fit:'★★★★★'},
            {param:'GC-MS / ICP-MS',req:'Terpenes + heavy metals',ghana:'Present in oil/gas and pharma labs; purchasable',fit:'★★★☆☆'},
            {param:'Cannabis Method Validation',req:'Cannabis-specific SOP + proficiency',ghana:'None yet — must develop or import protocols',fit:'★★☆☆☆'},
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
      n:'01',name:'Single-Analyte THC Lab',tag:'COMPLIANCE ENTRY',color:C.teal,
      tagline:'Gas chromatography. THC compliance only. Serves every cultivation licence holder.',
      scale:'1 GC or HPLC · 20–60 samples/day · 1–2 analysts',
      capital:'$150K–400K (gas chromatography; NCC approval; ISO 17025 entry)',
      timeline:'12–18 months to first revenue',
      revenue:'GH₵ 400–800 per THC compliance test; 5,000–15,000 tests/yr at sector scale',
      fit:'★★★★☆ Fastest path to market; every cultivation licence is a mandatory customer',
      description:'The single-analyte THC lab is the minimum viable testing operation under Licence 05 — a gas chromatograph or HPLC focused exclusively on pre-harvest and post-harvest THC compliance testing for Licence 01 cultivation holders. Every hemp cultivator in Ghana requires a certificate of analysis confirming ≤0.3% THC before any biomass can be sold or moved. This is not optional demand — it is created by law. The single-analyte lab captures this mandatory revenue stream with the lowest capital outlay in the testing lab category, and can expand instrument capability as the sector grows.',
      requirements:['NCC Testing Laboratory Licence (Licence 05)','ISO/IEC 17025 accreditation from Ghana Standards Authority (GNAS) — cannabis-specific scope','HPLC or GC system with validated method for cannabinoid quantification','NCC-approved sampling protocol and chain-of-custody procedures','LIMS for sample tracking, COA generation, and NCC reporting'],
      advantages:['Mandatory demand from every Licence 01 holder — no sales effort needed once NCC-approved','Lowest capital entry in the testing lab category','HPLC/GC instrument used for cannabis can also serve food safety and pharma clients — multi-sector revenue immediately','ISO 17025 accreditation creates competitive moat that is costly and time-consuming to replicate'],
      risks:['Revenue concentration — THC-only limits income per sample and client type','If few cultivation licences are initially issued, throughput may be too low for profitability in early years','THC-only scope excludes higher-value full-compliance testing that processing and export licences require'],
      ideal:'Analytical lab operators, pharma QC labs diversifying into cannabis, and investors seeking a compliance-infrastructure play with mandatory demand and defensible market position',
    },
    {
      n:'02',name:'Full-Spectrum Analytical Lab',tag:'COMPREHENSIVE',color:C.forest,
      tagline:'HPLC + GC-MS + ICP-MS. Full compliance panels. Serves all 11 licences.',
      scale:'3–5 instruments · 50–150 samples/day · 4–8 analysts',
      capital:'$400K–1.2M (GC + HPLC + heavy metals; full compliance capability)',
      timeline:'18–30 months to full operation',
      revenue:'$200–450 per full-compliance panel; $40–250 per individual test; $800K–2.5M/yr at maturity',
      fit:'★★★★★ Highest revenue per client; serves every licence category in the value chain',
      description:'The full-spectrum analytical lab offers the complete range of cannabis compliance testing: cannabinoid potency (HPLC), terpene profiling (GC-MS), pesticide residues (LC-MS/MS or GC-MS/MS), heavy metals (ICP-MS or ICP-OES), microbiological testing (culture + PCR), residual solvents (headspace GC), moisture, water activity, and stability testing. This is the configuration that serves processing licence holders, export shipment certification, and dispensary product release — all of which require full certificates of analysis covering safety and potency. In US state markets, full compliance packages cost $350–455 per sample. A Ghanaian equivalent would generate GH₵ 2,000–4,500 per sample from higher-value clients.',
      requirements:['NCC Testing Laboratory Licence (Licence 05) — full scope','ISO/IEC 17025 accreditation covering all test categories','HPLC (cannabinoids), GC-MS (terpenes/solvents), LC-MS/MS (pesticides), ICP-MS (heavy metals), microbiology suite','Reference standards library and proficiency testing participation','Full LIMS, validated methods, and QA/QC documentation'],
      advantages:['Highest revenue per sample of any lab configuration','Required by processing (Licence 02), export (Licence 09), and dispensing (Licence 11) clients — not just cultivation','Multi-sector platform: same instruments serve food safety, pharma QC, cocoa export testing','Most defensible competitive position — full ISO 17025 multi-scope accreditation is very difficult to replicate quickly'],
      risks:['Higher capital requirement — $400K–1.2M upfront vs $150K for THC-only','Longer timeline to full operation — ISO 17025 multi-scope accreditation takes 18–24 months','Requires senior analytical staff across multiple disciplines — harder to recruit than single-method team'],
      ideal:'Established analytical lab operators, DFI-backed quality infrastructure projects, strategic investors with multi-sector lab vision, and operators seeking the highest long-term revenue per square metre of lab space',
    },
    {
      n:'03',name:'Mobile Testing Unit',tag:'FIELD-DEPLOYABLE',color:C.ink,
      tagline:'Vehicle-mounted GC. Pre-harvest testing at the farm gate. Northern zone access.',
      scale:'1 mobile GC unit + 1–2 technicians · 10–25 samples/day field capacity',
      capital:'$80K–250K (field-deployable; serves remote cultivation zones)',
      timeline:'12–18 months to first revenue',
      revenue:'GH₵ 600–1,200 per field test (transport premium over lab rate)',
      fit:'★★★☆☆ Essential for northern cultivation access; complements rather than replaces fixed lab',
      description:"The mobile testing unit deploys a vehicle-mounted gas chromatograph to cultivation sites for pre-harvest field testing — eliminating the sample transport burden for remote northern Ghanaian cultivators. Pre-harvest THC sampling is time-sensitive: samples must be collected, tested, and certificates issued within narrow windows around flower maturity. For northern cultivation zones 400–600km from Accra, the mobile unit removes a critical logistical barrier. This model does not replace a fixed ISO 17025 lab — mobile units still require reference lab backup for QA and accreditation — but it captures a premium field-testing fee and builds cultivator relationships that convert to full-service lab contracts as the sector matures.",
      requirements:['NCC Testing Laboratory Licence (Licence 05) — mobile testing scope','ISO/IEC 17025 accreditation with mobile testing extension or reference lab partnership','Vehicle-mounted or ruggedised portable GC system with validated field method','Chain-of-custody protocols for mobile sample collection and result reporting','Security arrangements for cannabis sample handling in transport'],
      advantages:['Eliminates transport barrier for remote northern cultivation zones','Premium pricing justified by field convenience — 25–50% above standard lab rate','First-mover in mobile cannabis testing in West Africa — zero competitors','Builds cultivator relationships that anchor them as full-service lab clients once fixed lab expands'],
      risks:['Mobile instrument calibration and maintenance is more complex than fixed lab','Limited throughput — 10–25 samples/day vs 60+ in a fixed lab','Not suitable for pesticide, heavy metal, or microbial testing — complementary tool only'],
      ideal:'Testing lab operators seeking rapid northern market penetration, investors willing to trade throughput capacity for geographic first-mover advantage, and operators planning to build a fixed lab with mobile unit as the market entry strategy',
    },
    {
      n:'04',name:'Certified Reference Laboratory',tag:'HIGHEST STANDARD',color:C.limeDark,
      tagline:'WHO/ISO 17025. Export certification. Pharmaceutical-grade. NCC enforcement reference.',
      scale:'Full instrument suite + GMP-aligned QA + international accreditation',
      capital:'$600K–2M (WHO/ISO 17025; enables export certification)',
      timeline:'24–36 months to full international accreditation',
      revenue:'$800K–2.5M/yr at projected sector throughput; export cert premium pricing',
      fit:'★★★☆☆ Highest strategic value and revenue — requires most capital and time',
      description:'The certified reference laboratory is the apex testing configuration for Licence 05: an operation with multiple layers of accreditation (ISO/IEC 17025, potentially GLP alignment, WHO-recognised standards) that can issue certificates of analysis acceptable to EU, UK, and pharmaceutical export markets. Reference labs also serve as the technical authority for NCC enforcement — providing the definitive analytical opinion when licence compliance disputes arise. This configuration generates premium per-sample fees from export clients and can bid for government enforcement testing contracts. The reference lab is not a Phase 1 ambition — it is the 3–5 year strategic destination for a well-run full-spectrum lab that has built accreditation credibility.',
      requirements:['NCC Testing Laboratory Licence (Licence 05) — full scope + enforcement designation','ISO/IEC 17025 with international accreditation body recognition (ANAB-equivalent)','GLP compliance for any analytical work used in regulatory submissions','Proficiency testing participation in international cannabis testing schemes','Method validation documentation meeting EU, UK, and pharmaceutical export market standards'],
      advantages:['Export certificate testing commands 2–5× domestic compliance pricing','NCC enforcement designation creates recurring government contract revenue','International accreditation is nearly impossible to replicate quickly — 5+ year moat','Enables pharmaceutical extract export pathway — the highest-value product in the entire chain'],
      risks:['$600K–2M capital requirement is the highest in the testing lab category','International accreditation process takes 24–36 months from initial application','Requires laboratory director with internationally recognised credentials — global talent market'],
      ideal:'DFI-backed quality infrastructure projects, international lab networks seeking African expansion, strategic investors targeting Ghana as a regional cannabis-quality hub, and operators with 5-year horizon and patient capital structure',
    },
  ];
  const m = models[active];
  return (
    <div id="s04" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <MobileCollapse num="§ 04" title="Business Models" stat="4 Models" label="$80K to $2M Entry">
        <SectionRule/>
        <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
          <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 04</span>
          <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Business Models</span>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>Four Testing Lab Configurations — from Compliance Entry to Reference Lab</h2>
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
      <MobileCollapse num="§ 05" title="Unit Economics" stat="GH₵400+" label="Per THC Test">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 05</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Unit Economics</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'12px',maxWidth:'680px'}}>What Cannabis Testing Revenue Looks Like in Ghana</h2>
      <p style={{fontFamily:F.body,fontSize:'15px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'36px',maxWidth:'700px'}}>
        Testing lab economics are driven by sample throughput, test mix, and per-sample pricing. A single HPLC generates 40–80 THC tests per day. At GH₵ 600 per test, a well-utilised single-instrument lab targeting 30 tests/day generates ~GH₵ 18,000/day in gross revenue — before costs. The economics improve sharply as multi-test panels replace single-analyte testing.
      </p>
      <div style={{background:C.paperDark,padding:'28px',marginBottom:'32px'}}>
        <Eyebrow>Revenue Per Sample · 4 Test Configurations (USD Equivalent)</Eyebrow>
        <div style={{marginTop:'18px'}}>
          {[
            {label:'THC Compliance Only',v:35,max:450,note:'Pre-harvest THC test for Licence 01 — GH₵ 400–800 per sample'},
            {label:'Potency + Terpene Panel',v:120,max:450,note:'HPLC + GC-MS — adds terpene profiling for brand and dispensary clients'},
            {label:'Full Safety Compliance Panel',v:300,max:450,note:'Cannabinoids + pesticides + heavy metals + microbial — processing + export clients'},
            {label:'Export Certificate Package',v:420,max:450,note:'Full panel + export documentation — Licence 09 export clients; premium pricing'},
          ].map((s,i) => (
            <div key={i} style={{marginBottom:'14px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px',flexWrap:'wrap',gap:'6px'}}>
                <div>
                  <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{s.label}</span>
                  <span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,marginLeft:'10px'}}>{s.note}</span>
                </div>
                <span style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:C.forest}}>${s.v}</span>
              </div>
              <div style={{height:'16px',background:C.border,position:'relative'}}>
                <div style={{position:'absolute',left:0,top:0,height:'100%',width:`${(s.v/s.max)*100}%`,background:i===3?C.lime:i===2?C.limeDark:C.forest}}/>
              </div>
            </div>
          ))}
          <div style={{marginTop:'10px',display:'flex',gap:'6px',alignItems:'center'}}>
            <div style={{width:'10px',height:'10px',background:C.lime}}/>
            <span style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.muted}}>USD equivalent at 2026 exchange rates. GH₵ pricing will vary; these benchmarks calibrate against California ($350–455/full panel) and regional African markets.</span>
          </div>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',marginBottom:'32px'}} className="tc">
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Operating Cost Structure (Single-Instrument Lab)</div>
          {[
            {item:'Lab lease (Accra industrial/commercial)',range:'$12K–36K/yr',pct:'10–18%',note:'500–1,000 sqm lab; Accra commercial rates'},
            {item:'Analytical staff (3–5 persons)',range:'$30K–90K/yr',pct:'25–40%',note:'Lead analyst + 2–4 technicians; Ghana salary scale'},
            {item:'Instrument consumables',range:'$15K–50K/yr',pct:'12–20%',note:'HPLC columns, mobile phases, standards, reference materials'},
            {item:'Instrument service contract',range:'$8K–25K/yr',pct:'6–12%',note:'Annual service; Agilent/Waters/Shimadzu GH service'},
            {item:'ISO 17025 accreditation + surveillance',range:'$5K–15K/yr',pct:'4–8%',note:'GNAS annual fees; proficiency testing participation'},
            {item:'LIMS licence + IT',range:'$3K–12K/yr',pct:'2–5%',note:'Sample management, COA generation, NCC reporting'},
            {item:'NCC licence + compliance',range:'$2K–8K/yr',pct:'2–4%',note:'Annual NCC Testing Lab licence; inspection costs'},
            {item:'Reference standards library',range:'$5K–15K/yr',pct:'4–8%',note:'Cannabinoid reference standards from certified suppliers'},
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
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Revenue Model &amp; Breakeven</div>
          <div style={{background:C.ink,padding:'20px',marginBottom:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>Revenue at Different Throughput Levels</div>
            {[
              {scale:'20 tests/day (early phase)', capex:'~$175K–250K/yr', note:'Single HPLC; conservative throughput before sector scales'},
              {scale:'50 tests/day (growing sector)', capex:'~$450K–650K/yr', note:'2 instruments; mixed THC + full-panel clients'},
              {scale:'100 tests/day (mature sector)', capex:'~$800K–1.2M/yr', note:'Multi-instrument; full-service lab; cannabis + food + pharma'},
              {scale:'Export + reference lab (Year 3+)', capex:'$1.5M–2.5M/yr', note:'Premium pricing; international clients; enforcement role'},
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
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.7,color:C.ink,marginBottom:'10px'}}>A single-instrument THC compliance lab with 20–30 tests/day at GH₵ 600–800 per test typically achieves operating breakeven in <strong>18–24 months</strong>. A full-spectrum lab reaching 50 tests/day breaks even in <strong>24–36 months</strong> with diversified multi-sector revenue.</p>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.7,color:C.ink,marginBottom:'10px'}}>Multi-industry revenue — food safety, pharma QC, cocoa export testing — dramatically improves early-stage utilisation before the cannabis sector reaches full scale.</p>
            <div style={{borderLeft:`2px solid ${C.lime}`,paddingLeft:'10px'}}>
              <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.forest,lineHeight:1.6}}>✓ The testing lab is the only Licence 05 category with captive demand regardless of market conditions. Mandatory compliance testing cannot be deferred by clients — it is a legal prerequisite for commerce.</p>
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
    {num:'03',name:'Breeding & Seed',pos:'UPSTREAM',color:C.teal,rel:'TESTS'},
    {num:'08',name:'Import',pos:'TRADE',color:C.teal,rel:'CERTIFIES'},
    {num:'01',name:'Cultivation',pos:'UPSTREAM',color:C.forest,rel:'CERTIFIES'},
    {num:'05',name:'Testing Lab',pos:'ENABLING',color:C.lime,rel:null,active:true},
    {num:'06',name:'Storage',pos:'ENABLING',color:C.limeDark,rel:'CERTIFIES'},
    {num:'07',name:'Transport',pos:'ENABLING',color:C.limeDark,rel:'SERVES'},
    {num:'02',name:'Processing',pos:'MID-CHAIN',color:C.forest,rel:'CERTIFIES'},
    {num:'10',name:'Wholesale',pos:'MID-CHAIN',color:C.forest,rel:'CERTIFIES'},
    {num:'09',name:'Export',pos:'TRADE',color:C.teal,rel:'CERTIFIES'},
    {num:'11',name:'Dispensing',pos:'DOWNSTREAM',color:C.forest,rel:'CERTIFIES'},
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
      <MobileCollapse num="§ 06" title="Value Chain" stat="All 11" label="Licences Need a Certificate">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 06</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Value Chain Position</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>The Compliance Gateway — Every Licence Needs a Certificate Before Commerce</h2>
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
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>What the Testing Lab Receives</div>
          {[
            {lic:'Licence 01 — Cultivation',role:'Primary client. Pre-harvest THC samples are mandatory. Every cultivation plot generates multiple test events per crop cycle.'},
            {lic:'Licence 02 — Processing',role:'Processed product samples for full-compliance panels. Extract and oil batches require cannabinoid, pesticide, heavy metal, and microbial certificates.'},
            {lic:'Licence 04 — R&D',role:'Research sample analysis. Testing labs and R&D operations are natural co-tenants — same instruments, complementary sample flows.'},
            {lic:'Licence 03 — Breeding & Seed',role:'Seed variety THC screening and cannabinoid profiling. Breeding programme samples require chemotyping for PVP applications.'},
          ].map((r,i) => (
            <div key={i} style={{padding:'10px 0',borderBottom:`1px solid ${C.border}`}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,marginBottom:'3px'}}>{r.lic}</div>
              <p style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.6}}>{r.role}</p>
            </div>
          ))}
        </div>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>What the Testing Lab Certifies &amp; Enables</div>
          {[
            {lic:'Licence 09 — Export',role:'Export certificates of analysis are the commercial gateway to EU, UK, and pharmaceutical markets. Without a Ghana-based ISO 17025-accredited COA, no shipment leaves.'},
            {lic:'Licence 11 — Dispensing',role:'Every retail product must have a current COA. Dispensaries cannot stock product without test certificates from an NCC-approved lab.'},
            {lic:'Licence 05 — NCC Enforcement',role:'Reference lab role — testing labs provide the definitive analytical opinion for NCC compliance investigations and licence enforcement actions.'},
            {lic:'Licence 06 & 07 — Storage & Transport',role:'Chain-of-custody certification. Storage and transport licence holders depend on test certificates to document the quality of materials in their custody.'},
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
      <MobileCollapse num="§ 07" title="Competition" stat="1 Lab" label="In All Sub-Saharan Africa">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 07</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Competitive Landscape</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>Ghana vs. Seven African Peers — Cannabis Testing Infrastructure</h2>
      {/* Desktop table */}
      <div className="mob-hide" style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',minWidth:'680px'}}>
          <thead>
            <tr style={{background:C.ink}}>
              {['Country','Status','Accredited Labs','Testing Scope','Analytical Talent','Framework','BRIDGE View'].map((h,i) => (
                <th key={i} style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.35)',textAlign:'left',borderRight:i<6?`1px solid rgba(255,255,255,0.05)`:'none'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {country:'🇬🇭 Ghana',status:'Active 2026',aFit:'★☆☆☆☆ — Zero licensed',port:'Full: HPLC + GC-MS scope',labour:'★★★★★ — KNUST, UG, UCC',fw:'★★★☆☆ — NCC L.I. 2475',view:'Zero incumbent — first lab owns the entire mandatory market',hl:true},
              {country:'🇿🇦 South Africa',status:'Active 2023',aFit:'★★★★☆ — Ecogreen ISO 17025',port:'Full + export cert capability',labour:'★★★★☆',fw:'★★★★★',view:'Ecogreen is the only accredited cannabis lab in sub-Saharan Africa — benchmark for Ghana'},
              {country:'🇲🇦 Morocco',status:'Recent 2021',aFit:'★★★☆☆ — Building',port:'Limited to pharma scope',labour:'★★★☆☆',fw:'★★★☆☆',view:'Some analytical capacity; EU proximity for export cert development'},
              {country:'🇱🇸 Lesotho',status:'Active 2017',aFit:'★★☆☆☆ — Basic potency only',port:'Very limited',labour:'★★☆☆☆',fw:'★★★★☆',view:'Basic potency testing; relies on SA labs for full compliance panels'},
              {country:'🇰🇪 Kenya',status:'Emerging 2023',aFit:'★★☆☆☆ — Pre-accreditation',port:'Building',labour:'★★★☆☆',fw:'★★☆☆☆',view:'KEMRI and university labs being adapted; no accredited cannabis lab yet'},
              {country:'🇿🇼 Zimbabwe',status:'Active 2022',aFit:'★★☆☆☆ — Limited',port:'Basic potency',labour:'★★☆☆☆',fw:'★★☆☆☆',view:'Relies on SA for full compliance; domestic capacity very limited'},
              {country:'🇲🇼 Malawi',status:'Active 2020',aFit:'★☆☆☆☆ — Minimal',port:'None dedicated',labour:'★★☆☆☆',fw:'★★☆☆☆',view:'No dedicated cannabis testing; all compliance testing outsourced'},
              {country:'🇿🇲 Zambia',status:'Emerging',aFit:'★☆☆☆☆ — None',port:'None',labour:'★☆☆☆☆',fw:'★★☆☆☆',view:'No cannabis testing infrastructure; framework still developing'},
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
        {country:'🇬🇭 Ghana',status:'Active 2026',aFit:'★☆☆☆☆ — Zero licensed labs',port:'HPLC+GC-MS scope needed',labour:'★★★★★ KNUST/UG/UCC analysts',fw:'★★★☆☆ NCC L.I. 2475',sm:'Zero incumbents',view:'First ISO 17025 cannabis lab in Ghana owns the entire mandatory market with zero domestic competition.',hl:true},
        {country:'🇿🇦 South Africa',status:'Active 2023',aFit:'★★★★☆ Ecogreen accredited',port:'Full + export certs',labour:'★★★★☆',fw:'★★★★★',sm:'Most advanced in Africa',view:'Ecogreen is sub-Saharan benchmark. Ghana can replicate and serve West Africa.'},
        {country:'🇲🇦 Morocco',status:'Recent 2021',aFit:'★★★☆☆ Building',port:'Limited pharma scope',labour:'★★★☆☆',fw:'★★★☆☆',sm:'Some EU linkage',view:'Building toward EU-linked testing capacity; not yet a regional hub'},
        {country:'🇱🇸 Lesotho',status:'Active 2017',aFit:'★★☆☆☆ Basic potency',port:'Very limited',labour:'★★☆☆☆',fw:'★★★★☆',sm:'Relies on SA labs',view:'Basic potency only; SA labs used for full compliance panels'},
        {country:'🇰🇪 Kenya',status:'Emerging 2023',aFit:'★★☆☆☆ Pre-accreditation',port:'Building',labour:'★★★☆☆',fw:'★★☆☆☆',sm:'No accredited cannabis lab',view:'KEMRI infrastructure transferable; no accredited cannabis lab yet'},
        {country:'🇿🇼 Zimbabwe',status:'Active 2022',aFit:'★★☆☆☆ Limited',port:'Basic only',labour:'★★☆☆☆',fw:'★★☆☆☆',sm:'Relies on SA',view:'All full compliance testing outsourced to South Africa'},
        {country:'🇲🇼 Malawi',status:'Active 2020',aFit:'★☆☆☆☆ Minimal',port:'None',labour:'★★☆☆☆',fw:'★★☆☆☆',sm:'None dedicated',view:'No dedicated cannabis testing; all outsourced'},
        {country:'🇿🇲 Zambia',status:'Emerging',aFit:'★☆☆☆☆ None',port:'None',labour:'★☆☆☆☆',fw:'★★☆☆☆',sm:'Does not exist',view:'No testing infrastructure; framework still developing'},
      ]}/>
      <PullQuote>
        The testing lab is the only licence in Ghana's cannabis framework where the competitive advantage is purely technical rather than geographic or agronomic. ISO 17025 accreditation is not a marketing claim — it is a regulatory certification that takes 18–24 months to achieve. The first lab to hold it in Ghana owns an 18–24 month moat against every subsequent entrant.
      </PullQuote>
      <div style={{background:C.paperDark,padding:'20px',marginTop:'8px'}}>
        <Eyebrow>Ghana Testing Lab Structural Advantages</Eyebrow>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0',marginTop:'14px'}} className="tc3">
          {[
            {title:'Mandatory Captive Demand',body:'Pre-harvest THC testing is legally required for every cultivation licence holder. This is not discretionary demand — it is a legal prerequisite. The testing lab cannot be displaced by a cheaper competitor because only NCC-approved ISO 17025 labs can issue valid compliance certificates.'},
            {title:'Multi-Sector Revenue Moat',body:'Ghana cocoa, food processing, pharmaceutical, and environmental sectors all require the same analytical instruments (HPLC, GC-MS, ICP-MS) used for cannabis testing. A well-positioned testing lab generates diversified revenue from day 1, reducing dependence on cannabis sector growth pace.'},
            {title:'Regional Hub Potential',body:'As West African nations follow Ghana cannabis licensing model, a Ghana-based ISO 17025 lab can serve regional testing demand — sampling logistics already used in other sectors. Ecogreen Analytics in South Africa demonstrates the regional hub model is commercially viable.'},
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
      <MobileCollapse num="§ 08" title="Regulatory Roadmap" stat="5 Phases" label="to First COA Issued">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 08</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Regulatory Roadmap</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>From NCC Application to ISO 17025 Accreditation — the Lab Compliance Journey</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px'}} className="tc mob-hide">
        <div>
          {[
            {phase:'Phase 1',label:'Lab Setup & NCC Licence Application (Months 1–4)',steps:['Secure lab premises: 200–600 sqm in Accra; temperature/humidity control; fume hood ventilation; solvent storage','Submit NCC Testing Laboratory Licence (Licence 05) application with lab floorplan, instrument list, and QA manual outline','Engage ISO 17025 consultant (Factocert or SGS Ghana) to scope accreditation roadmap and document requirements','Order and commission core instruments: HPLC system minimum; GC-MS and ICP-MS for full-service scope','Recruit laboratory director (MSc/PhD analytical chemistry) and 2–3 analysts with chromatography experience'],color:C.teal},
            {phase:'Phase 2',label:'Quality Management System Build (Months 3–8)',steps:['Draft and implement ISO/IEC 17025 Quality Management System: test methods, SOPs, calibration procedures, uncertainty budgets','Validate analytical methods for cannabinoid quantification using HPLC — linearity, precision, accuracy, LOD/LOQ','Establish LIMS for sample intake, chain-of-custody, results management, and COA generation','Procure certified reference standards for cannabinoids (THC, CBD, THCA, CBDA, CBG, CBC) from ISO 17034-accredited suppliers','Submit Ghana Standards Authority (GNAS) accreditation application with QMS documentation package'],color:C.forest},
            {phase:'Phase 3',label:'ISO 17025 Assessment & NCC Approval (Months 6–14)',steps:['Undergo GNAS document review and on-site technical assessment — assessors verify method validation, staff competency, equipment calibration','Address any non-conformities identified in GNAS assessment — corrective action plans with evidence','Participate in proficiency testing scheme for cannabinoid analysis — demonstrate inter-laboratory comparison performance','Receive ISO/IEC 17025 accreditation certificate with scope covering cannabinoid testing (and additional scopes if applicable)','Submit ISO 17025 certificate to NCC for formal approval as cannabis testing laboratory; undergo NCC site inspection'],color:C.limeDark},
            {phase:'Phase 4',label:'Commercial Operations Launch (Months 12–18)',steps:['Issue first certificates of analysis to pioneer Licence 01 cultivation clients — pre-harvest THC compliance testing','Establish multi-industry service offering: cocoa/food pesticide screening, pharma QC, environmental testing to build throughput pre-sector scale','Set up field sample collection protocol: cultivators submit samples at designated NCC collection points or via accredited transport','Market to all 11 licence category holders: THC testing for cultivation, full compliance for processing, export certs for exporters','Engage NCC for designation as reference laboratory for enforcement testing — additional revenue and moat reinforcement'],color:C.amber},
            {phase:'Phase 5',label:'Scale & Regional Hub Development (Months 18+)',steps:['Add instrument capacity (second HPLC, LC-MS/MS, ICP-MS) as sample throughput justifies capital deployment','Expand ISO 17025 scope to cover pesticide residues, heavy metals, microbiological testing, residual solvents, stability','Develop mobile testing unit capability for pre-harvest northern cultivation zone field testing','Engage West African neighbouring country clients — cross-border sample testing as regional cannabis sectors emerge','Apply for recognition by EU/UK accreditation bodies for export certificate testing accepted by pharmaceutical importers'],color:C.lime},
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
              {item:'NCC licence renewal',detail:'Every 3 years; instrument list, scope, and personnel re-registered with NCC'},
              {item:'ISO 17025 surveillance audits',detail:'GNAS annual surveillance + full re-accreditation every 4 years; proficiency testing annually'},
              {item:'Method revalidation',detail:'Any instrument change, reagent change, or new analyte requires validation before reporting'},
              {item:'Reference standards renewal',detail:'Cannabis reference standards expire; certified replacements required for continued accreditation'},
              {item:'COA record retention',detail:'All test records, raw data, and COAs retained minimum 7 years per ISO 17025 and NCC requirements'},
              {item:'Staff competency records',detail:'Training records, proficiency demonstrations, and authorised signatory lists kept current'},
              {item:'Adverse result reporting',detail:'Any positive THC result above 0.3% reported to NCC within defined timeframe per L.I. 2475'},
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
              {body:'Ghana Standards Authority (GNAS)',role:'ISO/IEC 17025 accreditation body — application, assessment, certificate issuance, surveillance'},
              {body:'Ghana Food and Drugs Authority',role:'If testing pharmaceutical-grade cannabis products — GLP alignment and FDA-registered lab status'},
              {body:'Ghana Revenue Authority',role:'Import duty relief on lab instruments (Schedule 7 ECOWAS CET); tax treatment of testing service revenue'},
              {body:'Environmental Protection Agency',role:'Chemical waste disposal permits — solvent and reagent waste management for analytical labs'},
              {body:'NCC Cannabis Regulations Dept.',role:'Annual testing lab audit; COA reporting format requirements; enforcement reference lab designation'},
            ].map((r,i) => (
              <div key={i} style={{padding:'7px 0',borderBottom:i<4?`1px solid ${C.border}`:'none'}}>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>{r.body}</div>
                <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.muted}}>{r.role}</div>
              </div>
            ))}
          </div>
          <div style={{borderLeft:`3px solid ${C.amber}`,paddingLeft:'14px',background:C.paper,padding:'14px 14px 14px 16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.amber,marginBottom:'6px'}}>ISO 17025 Accreditation — Non-Negotiable</div>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.65,color:C.ink}}>NCC will only approve testing laboratories holding ISO/IEC 17025 accreditation from a recognised body. Operating a testing service without accreditation exposes the lab to NCC enforcement action and exposes clients to invalid COAs. <strong>Do not begin commercial testing operations before accreditation is confirmed. The 12–18 month accreditation timeline must be built into the project plan from Day 1.</strong></p>
          </div>
        </div>
      </div>
      <MobPhaseAccordion phases={[
        {phase:'Phase 1',label:'Lab Setup & NCC Application (Months 1–4)',color:C.teal,steps:['Secure lab premises in Accra; temperature control, ventilation, solvent storage','Submit NCC Licence 05 application with lab floorplan and QA manual outline','Engage ISO 17025 consultant (Factocert or SGS Ghana)','Commission HPLC and GC-MS instruments','Recruit laboratory director and 2–3 analysts']},
        {phase:'Phase 2',label:'Quality Management System (Months 3–8)',color:C.forest,steps:['Build ISO 17025 QMS: SOPs, method validation, calibration, uncertainty budgets','Validate HPLC cannabinoid quantification method','Deploy LIMS for sample management and COA generation','Procure certified reference standards from ISO 17034-accredited suppliers','Submit GNAS accreditation application with full QMS documentation']},
        {phase:'Phase 3',label:'ISO 17025 Assessment (Months 6–14)',color:C.limeDark,steps:['Undergo GNAS document review and on-site technical assessment','Address non-conformities identified by assessors','Participate in proficiency testing scheme for cannabinoid analysis','Receive ISO 17025 accreditation certificate','Submit certificate to NCC for formal testing lab approval']},
        {phase:'Phase 4',label:'Commercial Launch (Months 12–18)',color:C.amber,steps:['Issue first COAs to pioneer Licence 01 cultivation clients','Launch multi-industry services: food, pharma, cocoa testing for early throughput','Set up sample collection protocol for cultivators','Market to all 11 licence categories','Apply for NCC reference lab designation']},
        {phase:'Phase 5',label:'Scale & Regional Hub (Months 18+)',color:C.lime,steps:['Add LC-MS/MS and ICP-MS for full pesticide and heavy metal scope','Expand ISO 17025 scope to cover full compliance panel','Develop mobile testing unit for northern cultivation zones','Engage West African regional clients','Apply for EU/UK accreditation body recognition for export certificates']},
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
            r:'ISO 17025 accreditation timeline delays — lab cannot operate without it',
            sev:'HIGH',likelihood:'Medium',cat:'Regulatory / Operational',
            m:'Begin the ISO 17025 accreditation process at least 12–18 months before planned commercial launch. Engage an experienced consultant (SGS Ghana or Factocert) from Day 1. Build corrective action time into the project plan — first assessments almost always identify non-conformities. Submit GNAS application only when QMS documentation is complete and method validation is done. Do not begin commercial testing without the certificate — invalid COAs expose both the lab and its clients to NCC enforcement action.',
          },
          {
            r:'Slow cannabis sector growth — insufficient sample volume for profitability',
            sev:'HIGH',likelihood:'Medium (manageable with multi-sector strategy)',cat:'Commercial',
            m:'Do not plan the lab economics solely around cannabis throughput in Years 1–2. Build multi-sector services into the business model from launch: food safety pesticide screening, cocoa export compliance (Ghana is the world largest cocoa producer), pharmaceutical QC, and environmental testing all use the same HPLC/GC-MS instruments. Multi-sector diversification provides baseline throughput and revenue while the cannabis sector scales.',
          },
          {
            r:'Instrument failure — HPLC downtime means no COAs, no compliance, no client revenue',
            sev:'MEDIUM-HIGH',likelihood:'Medium (without mitigation)',cat:'Operational',
            m:'Purchase instrument service contracts from day of commissioning. Maintain a spare parts inventory for critical consumables: HPLC columns, pump seals, detector lamps. Consider a second HPLC (can be leased initially) to eliminate single-instrument dependency. Build instrument downtime into client SLA agreements — no promises of same-day turnaround without backup capacity. Strong relationship with instrument supplier local service team is essential.',
          },
          {
            r:'Data integrity failure — fraudulent or erroneous COAs destroy lab credibility',
            sev:'MEDIUM-HIGH',likelihood:'Low (with robust QMS)',cat:'Reputational / Legal',
            m:'ISO 17025 accreditation is the primary safeguard — it mandates internal audit, independent data review, and instrument calibration traceability. Beyond compliance: implement second-person review for all results before COA issue; deploy LIMS with electronic data capture and audit trail; participate in proficiency testing schemes to detect systematic errors; enforce strict separation between sample intake, analysis, and result authorisation roles.',
          },
          {
            r:'Skilled analyst recruitment and retention',
            sev:'MEDIUM',likelihood:'Medium',cat:'Operational',
            m:'Ghanaian universities graduate 200+ analytical chemists and pharmacists per year — the talent pool exists. Build competitive salary structures and clear career progression. Partner with KNUST and UG chemistry departments for graduate recruitment pipeline. Consider training sponsorships for promising candidates. For the laboratory director, be prepared to recruit internationally or from Ghana pharmaceutical sector at premium salary.',
          },
          {
            r:'Reference standard supply disruption — cannabinoid standards from certified suppliers',
            sev:'MEDIUM',likelihood:'Low-Medium',cat:'Operational',
            m:'Maintain 3–6 months of reference standard inventory at all times. Qualify multiple certified reference material suppliers (Cerilliant, Cayman Chemical, Restek for cannabis standards). Develop relationships with Licence 04 R&D labs in Ghana as a potential future domestic source for reference materials. Build reference standard expiry tracking into LIMS so reorder triggers are automated.',
          },
          {
            r:'NCC regulatory changes — test panel requirements may expand or shift',
            sev:'LOW-MEDIUM',likelihood:'Medium (framework is maturing)',cat:'Regulatory',
            m:'Build modular instrument capability — add LC-MS/MS and ICP-MS as scope expands rather than purchasing all instruments upfront. Monitor NCC guidance updates actively; engage NCC Cannabis Regulations Department regularly. ISO 17025 accreditation with a scope that anticipates future requirements (e.g., include pesticide and heavy metal capability even if not immediately mandatory) provides regulatory flexibility.',
          },
          {
            r:'Competition from existing multi-sector labs pivoting to cannabis',
            sev:'LOW-MEDIUM',likelihood:'Medium (2–3 year horizon)',cat:'Commercial',
            m:'The first-mover ISO 17025 cannabis accreditation cannot be rapidly replicated — it requires 12–18 months of QMS development, method validation, and assessment. NCC approval adds additional time. The first approved lab has a structural head start and client relationship advantage that compounds over time. Build client loyalty through reliability and service quality — long-term testing contracts with cultivation and processing licence holders reduce churn risk.',
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
    {dim:'Market Opportunity',score:80,weight:'30%',rationale:'Mandatory demand from every cultivation licence holder, plus full-compliance demand from processing and export licences, plus multi-sector diversification into food, pharma, and cocoa. The global cannabis testing market is $2.4B in 2025 growing to $7.2B by 2030 at 16.6% CAGR. Ghana has zero labs — first entrant captures 100% of domestic demand by default.'},
    {dim:'Development Impact',score:68,weight:'30%',rationale:'Testing labs create high-quality skilled employment (analytical chemists, quality managers) and are essential quality infrastructure for the entire cannabis value chain. Without testing, no exports reach premium markets. Impact is enabling rather than direct — but the multiplier effect on the rest of the sector is very high.'},
    {dim:'Implementation Feasibility',score:72,weight:'25%',rationale:'Ghana has ISO 17025 expertise, analytical instrument suppliers, and a deep pool of chemistry graduates. The challenge is the 12–18 month accreditation timeline and the need for rigorous QMS development — not fundamentally difficult, but time-sensitive. Multi-sector lab strategy reduces commercial risk significantly.'},
    {dim:'Financial Sustainability',score:82,weight:'15%',rationale:'Mandatory recurring revenue from every licence holder, diversifiable across industries, with a regulatory moat (ISO 17025) that compounds over time. Testing lab economics improve with throughput — variable costs are low, fixed costs are largely covered by cannabis compliance demand alone. Multi-sector revenue is incremental margin.'},
  ];
  return (
  <div id="s10" className="pad-section" style={{background:C.ink,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 10" title="BRIDGE Score™" stat="75/100" label="Core Tier · Enabling" onDark={true}>
      <div style={{borderTop:`6px solid ${C.paper}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 10</span>
        <Eyebrow light>BRIDGE Impact Score™</Eyebrow>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.paper,lineHeight:1.2,marginBottom:'32px',maxWidth:'680px'}}>Testing Laboratory Scores 75/100 — Mandatory Demand, Defensible Moat, Multi-Sector Upside</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:'40px'}} className="tc">
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'16px'}}>Composite Score</div>
          <div style={{display:'flex',alignItems:'baseline',gap:'6px',marginBottom:'4px'}}>
            <div style={{fontFamily:F.mono,fontSize:'clamp(72px,12vw,120px)',fontWeight:500,color:C.lime,lineHeight:1}}>75</div>
            <div style={{fontFamily:F.mono,fontSize:'clamp(22px,4vw,36px)',fontWeight:300,color:'rgba(184,217,53,0.3)',lineHeight:1,marginBottom:'6px'}}>/100</div>
          </div>
          <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.28)',letterSpacing:'0.5px',marginBottom:'28px'}}>Core Tier · Enabling · NCC Licence 05</div>
          <ScoreBar label="Market Opportunity  ×30%" value={80} onDark/>
          <ScoreBar label="Development Impact  ×30%" value={68} onDark/>
          <ScoreBar label="Impl. Feasibility  ×25%" value={72} onDark/>
          <ScoreBar label="Financial Sustainability  ×15%" value={82} onDark/>
          <div style={{marginTop:'20px',borderTop:`1px solid rgba(255,255,255,0.08)`,paddingTop:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.3)',marginBottom:'10px'}}>Quick Parameters</div>
            {[{l:'Entry Barrier',v:'High (ISO 17025 + NCC approval)'},{l:'Capital Intensity',v:'Medium–High ($150K–1.2M)'},{l:'Timeline to Revenue',v:'12–18 months'},{l:'Licence Tier',v:'Core · Enabling'}].map((p,i) => (
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
    {cat:'NCC Testing Lab Licence (Licence 05)',range:'$3K–10K',note:'Application + 3-year licence; confirm fee schedule with NCC'},
    {cat:'Lab premises (Accra; fit-out)',range:'$20K–80K',note:'300–600 sqm; climate control, ventilation, solvent storage, security'},
    {cat:'HPLC system (cannabinoid potency)',range:'$30K–80K',note:'Agilent/Waters/Shimadzu; entry-level sufficient for THC compliance scope'},
    {cat:'GC-MS system (terpenes/solvents)',range:'$25K–70K',note:'Add for full-service; can defer to Phase 2 for THC-only launch'},
    {cat:'ICP-MS / ICP-OES (heavy metals)',range:'$40K–120K',note:'Required for full compliance panel; lease option available'},
    {cat:'LC-MS/MS (pesticide multi-residue)',range:'$80K–200K',note:'High-value test; add in Phase 2 when cultivation sector scales'},
    {cat:'LIMS software',range:'$8K–25K',note:'Sample management, COA generation, NCC reporting compliance'},
    {cat:'Reference standards library (year 1)',range:'$8K–20K',note:'Certified cannabinoid standards from ISO 17034-accredited supplier'},
    {cat:'ISO 17025 accreditation (GNAS)',range:'$10K–30K',note:'Application, assessment, proficiency testing, consultant support'},
  ];
  const SHOW_FIRST = 4;
  return (
  <div id="s11" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 11" title="Deployment" stat="$150K+" label="Minimum Lab Entry Capital">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 11</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Deployment Parameters</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>What It Takes to Launch Ghana's First Hemp Testing Lab</h2>
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
              {role:'Laboratory Director (MSc/PhD)',spec:'Analytical chemistry; ISO 17025 QMS management; NCC regulatory liaison'},
              {role:'Senior Analyst (BSc/MSc)',spec:'HPLC and GC-MS operation; method validation; results review and COA authorisation'},
              {role:'Lab Technician ×2',spec:'Sample preparation, instrument operation, data recording; KNUST or UG chemistry graduates'},
              {role:'Quality Assurance Officer',spec:'ISO 17025 compliance; internal audit; accreditation management; proficiency testing'},
              {role:'Client Services / Finance',spec:'Sample intake, client communication, invoicing, NCC reporting, LIMS management'},
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
              As of March 2026, Ghana has no NCC-approved, ISO 17025-accredited hemp testing laboratory. Every cultivation licence applicant currently has no domestic testing option — they must either delay compliance testing or ship samples internationally at significant cost and delay. The operator who opens the first accredited lab in Ghana captures the entire domestic market by regulatory default.
            </p>
            <p style={{fontFamily:F.body,fontSize:'13px',fontWeight:300,color:'rgba(250,248,243,0.7)',lineHeight:1.75,marginBottom:'16px'}}>
              The 12–18 month accreditation timeline means the window to be first is now. Operators who start the ISO 17025 accreditation process in 2026 will be operational before 2028 — capturing the pioneer cultivation cohort at full revenue. Every month of delay gives the market to a competitor who started earlier.
            </p>
            {[
              {l:'ISO 17025 application start',v:'Now — Q2 2026'},
              {l:'First accreditation certificate',v:'Q4 2027 – Q1 2028'},
              {l:'First commercial COA issued',v:'Q4 2027 – Q2 2028'},
              {l:'Full-service multi-sector lab',v:'2029 onwards'},
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
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(250,248,243,0.45)',letterSpacing:'0.3px'}}>Licence 05 of 11 · Ghana Cannabis Intelligence</div>
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
export default function TestingLabBrief() {
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
