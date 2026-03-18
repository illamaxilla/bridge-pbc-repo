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
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>Ghana Cannabis Intelligence · Licence 08 · Import · Members Brief</span>
        <span className="mob-show" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>08 · Import</span>
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
    <div style={{position:'absolute',right:'-20px',top:'-30px',fontFamily:F.display,fontSize:'clamp(180px,35vw,480px)',fontWeight:900,color:'rgba(255,255,255,0.022)',pointerEvents:'none',userSelect:'none',letterSpacing:'-12px',lineHeight:1}}>08</div>
    <div style={{maxWidth:'900px',margin:'0 auto',position:'relative'}}>
      <div ref={logoRef} style={{marginBottom:'36px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Logo height={30} variant="white"/>
        <div className="mob-hide" style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(250,248,243,0.22)',letterSpacing:'0.8px'}}>MARCH 2026 · NCC L.I. 2475</div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px',flexWrap:'wrap'}}>
        <div style={{background:C.lime,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'3px',textTransform:'uppercase',color:C.ink}}>LICENCE 08 · TRADE</div>
        <div style={{border:`1px solid ${C.lime}`,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime}}>CORE TIER</div>
        <div className="mob-hide" style={{border:`1px solid rgba(255,255,255,0.15)`,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.4)'}}>MEMBERS INTELLIGENCE</div>
      </div>
      <h1 style={{fontFamily:F.display,fontSize:'clamp(30px,5.5vw,68px)',fontWeight:900,color:C.paper,lineHeight:1.08,marginBottom:'20px',maxWidth:'800px'}}>
        Import<br/>
        <span style={{fontWeight:400,fontStyle:'italic',color:'rgba(250,248,243,0.55)',fontSize:'0.72em'}}>The Global Supply Bridge That Keeps Ghana's Cannabis Sector Running</span>
      </h1>
      <PullQuote onDark>
        Ghana's cannabis sector launches in 2026 with zero domestic certified hemp seed, zero hemp processing equipment, and zero pharmaceutical-grade cannabinoid APIs. Every cultivation licence needs seed. Every processor needs equipment. Every testing lab needs reference standards. Import (Licence 08) is the bridge between global supply and Ghana's emerging sector — and the first importer to secure exclusive supply agreements owns the supply chain.
      </PullQuote>
      <div style={{borderTop:`1px solid rgba(255,255,255,0.09)`,paddingTop:'28px',marginTop:'8px',display:'flex',flexWrap:'wrap'}} className="stats-row">
        {[
          {v:'70',       l:'BRIDGE Score™',              s:'Core Tier · Trade'},
          {v:'$122M',    l:'Global Hemp Seed Trade',      s:'UNCTAD 2022 — growing rapidly'},
          {v:'0',        l:'Domestic Certified Seed',     s:'Ghana has none — imports are mandatory at launch'},
          {v:'5+',       l:'Import Categories',           s:'Seed · Equipment · APIs · Extracts · Inputs'},
          {v:'6–12mo',   l:'Breakeven Timeline',          s:'Faster than heavy-asset licences — working capital model'},
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
          {n:'01',t:'Why Now — The February 2026 Milestone',s:'Ghana launches with zero domestic supply — imports bridge the gap',id:'s01'},
          {n:'02',t:'The Import Thesis',s:'Exclusive supply agreements = supply chain ownership in a dependency-heavy sector',id:'s02'},
          {n:'03',t:'Global Supplier Landscape',s:'EU seed companies, Asian processors, North American CBD suppliers',id:'s03'},
          {n:'04',t:'Business Models',s:'4 import models — seed agent to multi-category hub',id:'s04'},
          {n:'05',t:'Unit Economics',s:'Margins, working capital, FX risk, pricing structure',id:'s05'},
          {n:'06',t:'Value Chain Position',s:"Import's role — upstream supply partner to every licence",id:'s06'},
          {n:'07',t:'Competitive Landscape',s:'Ghana vs. 7 African peers — import trade and distribution',id:'s07'},
          {n:'08',t:'Regulatory Roadmap',s:'NCC import licence, Ghana FDA, PPRSD, customs clearance',id:'s08'},
          {n:'09',t:'Risk Register',s:'Full matrix — 8 risks, severity, mitigations',id:'s09'},
          {n:'10',t:'BRIDGE Impact Score™',s:'4-dimension analysis, composite 70/100',id:'s10'},
          {n:'11',t:'Deployment Parameters',s:'Capital, team, timeline, first-mover exclusive agreements',id:'s11'},
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
      <MobileCollapse num="§ 01" title="Why Now" stat="Feb 2026" label="Import Demand Starts Now" defaultOpen={true}>
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 01</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Why Now</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'32px',maxWidth:'700px'}}>26 February 2026: Ghana Launches a Cannabis Sector With No Domestic Supply — Every Licence Needs an Importer</h2>
      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr',gap:'48px'}} className="tc">
        <div>
          <p className="dc" style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            On 26 February 2026, Ghana launched its national cannabis licensing regime — and created immediate import demand across every part of the value chain. Cultivation licence holders need certified, THC-stable hemp seed — Ghana has none domestically. Processors need decorticators, extraction equipment, and pressing lines — none are manufactured in Ghana. Testing labs need HPLC reference standards, cannabinoid analytical kits, and instrument consumables — all import-dependent. The entire sector launches into a supply vacuum.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            Import (Licence 08) is the bridge between global hemp supply chains and Ghana's emerging sector. UNCTAD data shows global hemp seed trade at approximately $122 million annually and growing. Major EU seed companies in France, the Netherlands, and Spain export certified THC-compliant varieties globally. China, the US, Canada, and Switzerland export CBD isolates, broad-spectrum extracts, and pharmaceutical-grade APIs. Processing equipment suppliers in Europe and China ship decorticators and extraction skids worldwide.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink}}>
            The import licence is not a commodity business. The importer who secures exclusive agency agreements with the right European seed companies, the right equipment manufacturers, and the right API suppliers before Ghana's cultivation and processing sectors scale up will own the supply architecture of the entire sector for years. First-mover exclusive agreements are the competitive moat — and the window to secure them is now, before other Ghanaian importers arrive.
          </p>
        </div>
        <div>
          <div style={{background:C.ink,padding:'24px',marginBottom:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>Import Framework at a Glance</div>
            {[
              {l:'NCC Licence',v:'Licence 08 · Import'},
              {l:'THC Ceiling on imports',v:'≤ 0.3% dry weight — mandatory COA'},
              {l:'Seed imports',v:'PPRSD phytosanitary + NCC permit'},
              {l:'Equipment',v:'DVLA-exempt; duty varies by HS code'},
              {l:'Pharmaceutical APIs',v:'Ghana FDA import permit + superintendent pharmacist'},
              {l:'Customs clearance',v:'ICUMS electronic submission system'},
              {l:'Trade finance',v:'LC/documentary collection; GRA tax clearance required'},
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
Ghana is the only West African country with a comprehensive cannabis licensing framework in 2026. The first importer to secure exclusive supply agreements with key global seed, equipment, and API companies becomes the mandatory upstream partner for every other Ghana licence holder — and the natural re-export hub as ECOWAS neighbours follow Ghana's regulatory lead.
            </p>
          </div>
        </div>
      </div>
      {/* Timeline visual */}
      <div style={{marginTop:'40px',borderTop:`1px solid ${C.border}`,paddingTop:'28px'}}>
        <Eyebrow>Import Dependency Timeline · 2026–2030</Eyebrow>
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
      <MobileCollapse num="§ 02" title="The Thesis" stat="$122M" label="Global Hemp Seed Trade 2022">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 02</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>The Import Thesis</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'32px',maxWidth:'680px'}}>Every Downstream Opportunity Runs Through This Licence</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px'}} className="tc">
        <div>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            Import (Licence 08) is the most capital-light, fastest-to-revenue position in Ghana's cannabis value chain. No fixed assets. No crop failure risk. No equipment depreciation. The importer identifies what the sector needs, sources it globally, clears it through customs, and sells it to licence holders at a margin. The business model is pure trade and distribution — and in a sector launching with zero domestic supply, every single licence holder is a potential customer.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            The strategic thesis is about exclusivity. The global hemp supply chain is well-developed: French and Dutch seed companies export certified EU-catalogue varieties. Chinese and European equipment manufacturers supply decorticators and extraction skids globally. Swiss, US, and Czech Republic companies supply pharmaceutical-grade CBD isolates. An importer who secures exclusive distribution rights for key suppliers before Ghana's sector matures owns the supply chain — all competitors must either work through them or wait years to build alternative supplier relationships.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink}}>
            The import window is time-limited. As Ghana's domestic breeding programme (Licence 03) matures — likely 2028–2031 — domestic seed supply will partially substitute imports. As the processing sector scales, equipment import volumes normalise. The importer who moves now captures the period of maximum import dependency and builds the distribution network, regulatory approvals, and supplier relationships that become durable competitive advantages even as domestic production grows.
          </p>
        </div>
        <div>
          <PullQuote>
            The importer who arrives first with the right exclusive supply agreements does not compete for market share — they define it. Every cultivation licence that plants EU-certified seed, every processor that buys a European decorticator, and every lab that orders cannabinoid reference standards becomes a recurring revenue stream.
          </PullQuote>
          <div style={{background:C.paper,border:`1px solid ${C.border}`,padding:'20px',marginTop:'8px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Global Hemp Import Trade — Key Categories (USD Millions)</div>
            {/* SVG Bar Chart */}
            <svg viewBox="0 0 340 140" style={{width:'100%',display:'block'}}>
              {[
                {yr:'Hemp Seed',v:85,val:'$122M'},
                {yr:'Hemp Textiles',v:35,val:'$50M'},
                {yr:'CBD Market',v:115,val:'$9.8B+'},
                {yr:'Equip',v:40,val:'N/A'},
                {yr:'APIs',v:60,val:'Growing'},
                {yr:'Total Est.',v:100,val:'$B+'},
              ].map((d,i) => (
                <g key={i}>
                  <rect x={10+i*54} y={140-d.v-20} width={38} height={d.v} fill={i===5?C.lime:i>=4?C.limeDark:C.border}/>
                  <text x={29+i*54} y={135} textAnchor="middle" style={{fontFamily:'DM Sans,sans-serif',fontSize:'8px',fill:C.muted}}>{d.yr}</text>
                  <text x={29+i*54} y={140-d.v-25} textAnchor="middle" style={{fontFamily:'DM Mono,monospace',fontSize:'8px',fontWeight:700,fill:i>=4?C.forest:C.muted}}>{d.val}</text>
                </g>
              ))}
              <text x={10} y={12} style={{fontFamily:'DM Sans,sans-serif',fontSize:'9px',fill:C.faint}}>Global hemp trade segments — UNCTAD 2022 data + market estimates</text>
            </svg>
            <div style={{marginTop:'8px',display:'flex',gap:'12px',flexWrap:'wrap'}}>
              {[{c:C.border,l:'UNCTAD recorded'},{c:C.limeDark,l:'Estimated'},{c:C.lime,l:'High-value segment'}].map((s,i) => (
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
        <Eyebrow>Four Import Categories with Immediate Ghana Demand</Eyebrow>
        {/* Desktop grid */}
        <div className="mob-hide" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'0',marginTop:'14px'}}>
          {[
            {n:'Certified Hemp Seed',d:'100% of Ghana cultivation must use certified, THC-stable seed — zero domestic supply. EU catalogue varieties from France, Netherlands, Spain. Phytosanitary certificate + NCC import permit required. Recurring seasonal demand.'},
            {n:'Processing Equipment',d:'Decorticators, seed pressing lines, extraction skids, cold-presses — none manufactured in Ghana. European and Chinese suppliers. Capital goods import; GIPC investment incentives may apply.'},
            {n:'Reference Standards & Lab Consumables',d:'ISO 17025 testing labs need certified cannabinoid reference standards. Cerilliant, Cayman Chemical, Restek (US/EU suppliers). HPLC columns, HPLC reagents, assay kits. Recurring consumable demand from Licence 05 labs.'},
            {n:'CBD APIs & Pharmaceutical Inputs',d:'Pharmaceutical-grade CBD isolate and broad-spectrum extract for Licence 02 processors and Licence 11 dispensaries. Switzerland, US, Czech Republic major suppliers. Ghana FDA import permit required. Highest per-kg margin in import portfolio.'},
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
          {n:'Certified Seed',icon:'🌱',d:'100% of Ghana cultivation needs imported certified seed. EU catalogue varieties from France, Netherlands, Spain. Seasonal recurring demand.'},
          {n:'Processing Equipment',icon:'⚙️',d:'Decorticators, extraction skids, pressing lines — none made in Ghana. European/Chinese suppliers. One-time capital goods import with recurring parts.'},
          {n:'Lab Consumables',icon:'🔬',d:'ISO 17025 labs need certified cannabinoid reference standards, HPLC columns, reagents. Recurring consumable demand from Licence 05 holders.'},
          {n:'CBD APIs & Extracts',icon:'💊',d:'Pharmaceutical-grade CBD isolate and extracts for processors and dispensaries. Switzerland/US/Czech suppliers. Highest per-kg margin in import portfolio.'},
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
      <MobileCollapse num="§ 03" title="Ghana Fit" stat="5 Categories" label="Priority Import Segments">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 03</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Global Supplier Landscape</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'12px',maxWidth:'700px'}}>The Global Hemp Supply Chain Is Mature — Ghana Just Needs a Licensed Gateway</h2>
      <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'32px',maxWidth:'700px'}}>
        Hemp seed, processing equipment, CBD isolates, and lab consumables are all internationally traded commodities with established global supply chains. The challenge for Ghana is not that these products are unavailable — it is that no licensed importer exists yet to bring them in under NCC approval. The first to do so controls the gateway.
      </p>
      <div className="mob-hide" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',marginBottom:'32px'}}>
        {[
          {
            cat:'Certified Hemp Seed — EU Catalogue Varieties',tier:'IMMEDIATE',color:C.lime,
            suppliers:'France (Fedora 17, Futura 75, Santhica), Netherlands, Spain, Austria',
            docs:'Phytosanitary certificate · NCC import permit · EU Common Catalogue certification · THC compliance COA',
            margin:'€450–900/kg retail; import at €200–400/kg — substantial margin at Ghana market pricing',
            note:'Seasonal demand — cultivation licence holders order 2–4 months before planting. Lock in exclusive distribution with 2–3 European seed companies.',
          },
          {
            cat:'Processing Equipment — Decorticators, Presses, Extraction',tier:'HIGH VALUE',color:C.lime,
            suppliers:'Germany, Italy, Czech Republic (fibre equipment); China, Canada (extraction skids, seed presses)',
            docs:'Commercial invoice · packing list · certificate of origin · GIPC investment incentive application if qualifying',
            margin:'15–35% mark-up on equipment landed cost; installation and after-sales support extends revenue',
            note:'One-time capital sales per client but high absolute value ($50K–1M per order). After-sales parts and consumables create recurring stream.',
          },
          {
            cat:'Laboratory Reference Standards & Consumables',tier:'RECURRING',color:C.limeDark,
            suppliers:'Cerilliant, Cayman Chemical, Restek (US); LGC Standards (UK); Sigma-Aldrich (global)',
            docs:'Certificate of analysis · ISTA testing report for seed · supplier GMP certificate · FDA acceptance letter',
            margin:'30–60% mark-up on lab consumables; relationship-based recurring orders from Licence 05 labs',
            note:'Highest margin-to-volume category. Small shipments, high frequency. Licence 05 labs are captive customers — only 1–2 approved labs at launch.',
          },
          {
            cat:'CBD Isolate & Broad-Spectrum Extract (Pharmaceutical Grade)',tier:'HIGH MARGIN',color:C.limeDark,
            suppliers:'Switzerland (Biocbd+, Cibdol), US (Charlotte Web, Medterra bulk), Czech Republic, Canada',
            docs:'EU-GMP or GMP certificate · COA covering cannabinoids, terpenes, heavy metals, pesticides, microbials · Ghana FDA import permit · superintendent pharmacist sign-off',
            margin:'20–40% on pharmaceutical-grade isolate; higher for formulated products',
            note:'Ghana FDA registration required for pharmaceutical classification. Coordinate registration before first import permit application.',
          },
        ].map((r,i) => (
          <div key={i} style={{border:`1px solid ${C.border}`,padding:'20px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
              <div style={{fontFamily:F.display,fontSize:'14px',fontWeight:700,color:C.ink,lineHeight:1.2,paddingRight:'12px'}}>{r.cat}</div>
              <div style={{background:r.color,color:C.ink,padding:'2px 8px',fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0,whiteSpace:'nowrap'}}>{r.tier}</div>
            </div>
            {[{l:'Suppliers',v:r.suppliers},{l:'Docs required',v:r.docs},{l:'Margin',v:r.margin}].map((f,j) => (
              <div key={j} style={{display:'flex',gap:'8px',marginBottom:'5px'}}>
                <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,minWidth:'72px',flexShrink:0,marginTop:'2px'}}>{f.l.toUpperCase()}</span>
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
        {cat:'Certified Hemp Seed',tier:'IMMEDIATE',color:C.lime,suppliers:'France, Netherlands, Spain — EU Catalogue varieties',docs:'Phytosanitary cert · NCC import permit · THC COA',margin:'€450–900/kg retail vs €200–400/kg import',note:'Exclusive distribution with 2–3 EU seed companies is the key strategy'},
        {cat:'Processing Equipment',tier:'HIGH VALUE',color:C.lime,suppliers:'Germany, Italy, Czech Republic, China',docs:'Commercial invoice · origin cert · GIPC incentive application',margin:'15–35% mark-up; after-sales parts create recurring revenue',note:'$50K–1M per order; high absolute value per client'},
        {cat:'Lab Reference Standards',tier:'RECURRING',color:C.limeDark,suppliers:'Cerilliant, Cayman, Restek, LGC (US/UK)',docs:'COA · supplier GMP cert · FDA acceptance',margin:'30–60% mark-up; high frequency small orders',note:'Licence 05 labs are captive customers — highest margin-to-volume'},
        {cat:'CBD APIs & Extracts',tier:'HIGH MARGIN',color:C.limeDark,suppliers:'Switzerland, US, Czech Republic, Canada',docs:'EU-GMP cert · full COA · Ghana FDA permit · pharmacist sign-off',margin:'20–40% on pharmaceutical grade',note:'Ghana FDA registration required before first import permit'},
      ]} renderCard={(r,i) => (
        <div style={{border:`1px solid ${C.border}`,background:C.paper,padding:'18px',height:'100%'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
            <div style={{fontFamily:F.display,fontSize:'15px',fontWeight:700,color:C.ink,lineHeight:1.2}}>{r.cat}</div>
            <div style={{background:r.color,color:C.ink,padding:'3px 8px',fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0,marginLeft:'8px'}}>{r.tier}</div>
          </div>
          {[{l:'Suppliers',v:r.suppliers},{l:'Docs',v:r.docs},{l:'Margin',v:r.margin}].map((f,j) => (
            <div key={j} style={{display:'flex',gap:'8px',marginBottom:'6px'}}>
              <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,minWidth:'58px',flexShrink:0,paddingTop:'2px'}}>{f.l.toUpperCase()}</span>
              <span style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.45}}>{f.v}</span>
            </div>
          ))}
          <div style={{borderTop:`2px solid ${r.color}`,paddingTop:'8px',marginTop:'10px'}}>
            <p style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint}}>{r.note}</p>
          </div>
        </div>
      )}/>
      <div style={{background:C.paperDark,padding:'24px',borderTop:`3px solid ${C.ink}`}}>
        <Eyebrow>Import Regulatory Requirements by Category</Eyebrow>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'0',marginTop:'14px'}} className="tc">
          {[
            {param:'Certified Seed',req:'NCC import permit + PPRSD phytosanitary',ghana:'PPRSD permits available; NCC process to be confirmed',fit:'★★★☆☆'},
            {param:'Processing Equipment',req:'Commercial invoice + HS classification',ghana:'Standard customs; GIPC incentives may apply',fit:'★★★★☆'},
            {param:'Lab Consumables',req:'Supplier COA + FDA acceptance for regulated items',ghana:'FDA import permits for reagents; standard for most',fit:'★★★★☆'},
            {param:'CBD APIs (pharmaceutical)',req:'Ghana FDA import permit + pharmacist',ghana:'FDA medicines import framework applies',fit:'★★★☆☆'},
            {param:'CBD (food/nutraceutical)',req:'Ghana FDA food category + safety dossier',ghana:'Novel food status uncertain; advance FDA consultation needed',fit:'★★☆☆☆'},
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
      n:'01',name:'Certified Seed Agent',tag:'FIRST PRIORITY',color:C.teal,
      tagline:'Exclusive EU seed distribution. Every cultivation licence is a customer. Seasonal recurring revenue.',
      scale:'1–3 exclusive EU supplier agreements · seasonal shipments · national distribution',
      capital:'$30K–100K (working capital for first seed order; NCC import permit)',
      timeline:'6–12 months to first revenue',
      revenue:'€450–900/kg retail price; 2–3× import cost margin; seasonal orders per licence cohort',
      fit:'★★★★★ Highest urgency — zero domestic seed supply at sector launch',
      description:'The certified seed agent secures exclusive distribution rights for 2–3 EU-certified hemp seed companies in Ghana — suppliers whose varieties appear on the EU Common Catalogue of Varieties of Agricultural Plant Species with documented THC compliance. The agent imports under NCC Licence 08, handles phytosanitary certification, NCC clearance, and distribution to Licence 01 cultivation holders. This is the most immediately critical import category: without certified seed, no cultivation licence can plant legally. The seed agent becomes the mandatory first contact for every cultivation applicant. Exclusive distribution agreements with leading French, Dutch, or Spanish seed companies before Ghana sector scales are the competitive moat.',
      requirements:['NCC Import Licence (Licence 08)','Exclusive distribution agreement with minimum 2 EU seed companies in the EU Common Catalogue','PPRSD phytosanitary import permit for each seed variety imported','NCC import authorisation for THC-bearing planting material','Bonded warehouse or NCC-approved seed storage facility for seasonal inventory'],
      advantages:['Zero domestic competition — Ghana has no certified hemp seed producers until at least 2028','Every cultivation licence issued creates a seed order — recurring seasonal revenue','Exclusive agreements protect market position as cultivation sector scales','Lower working capital than equipment or API import — seed orders are pre-sold to cultivation applicants'],
      risks:['Seasonal demand — one or two orders per year per cultivation cohort; cash flow management critical','If cultivation sector grows slowly, seed volumes are low in Years 1–2','Import documentation errors can cause seed shipment delays that miss planting windows'],
      ideal:'Trade-savvy entrepreneurs with agricultural sector relationships; diaspora investors with European supplier networks; agribusinesses adding cannabis to existing import portfolios',
    },
    {
      n:'02',name:'Equipment Distributor',tag:'CAPITAL GOODS',color:C.forest,
      tagline:'Decorticators, extraction skids, seed presses. High-value B2B. Installation and after-sales.',
      scale:'3–8 major equipment sales/yr · service contract revenue · parts and consumables',
      capital:'$50K–200K (demo unit or deposit-based ordering; no inventory risk on bespoke orders)',
      timeline:'12–18 months to first revenue (procurement cycle is long)',
      revenue:'$50K–1M per equipment package; 15–35% mark-up; after-sales service contracts',
      fit:'★★★★☆ High-value per transaction — serves processing and testing licence holders',
      description:'The equipment distributor partners with European and Chinese manufacturers of hemp processing equipment — decorticators (fibre separation), seed presses, seed shelling lines, CBD extraction skids, and analytical laboratory instruments — to supply Ghana cannabis licence holders. Each sale is a major commercial event: a processing facility may spend $200K–800K on capital equipment, and the distributor earns 15–35% of landed cost. The real revenue model is after the sale: spare parts, consumables, service contracts, and training extend the relationship for years. An exclusive representation agreement with 1–2 leading European equipment manufacturers creates a near-monopoly position for Ghana and ECOWAS processing equipment supply.',
      requirements:['NCC Import Licence (Licence 08)','Manufacturer representation agreement — exclusive distribution rights for Ghana (and ideally West Africa)','GIPC investment company registration if claiming equipment import duty incentives','Technical staff or partnership for installation, commissioning, and after-sales service','GIPC free-zone or EPZ status if bundling equipment import with local assembly or service activities'],
      advantages:['High absolute margin per transaction — $50K–1M equipment sales at 15–35% mark-up','After-sales service contracts create recurring revenue beyond the initial sale','Technical expertise creates differentiation — competitors cannot simply price-compete on a decorticator','Manufacturer exclusivity protects against parallel imports and price undercutting'],
      risks:['Long sales cycles — processing licence applicants may take 12–18 months to finalise equipment decisions','High working capital for demo equipment or advance deposits on bespoke orders','Technical liability if equipment underperforms under Ghanaian conditions — warranty and service obligations'],
      ideal:'Engineering and capital goods importers; industrial equipment distributors; investors with relationships in European agricultural machinery sector',
    },
    {
      n:'03',name:'Pharmaceutical API Importer',tag:'HIGHEST MARGIN',color:C.ink,
      tagline:'GMP-grade CBD isolate and extracts. Ghana FDA registration. Pharmaceutical supply chain.',
      scale:'Pharmaceutical-grade bulk CBD; quarterly shipments; pharmaceutical distributor partnerships',
      capital:'$80K–300K (Ghana FDA registration; working capital for pharmaceutical-grade inventory)',
      timeline:'18–30 months (Ghana FDA registration timeline is significant)',
      revenue:'20–40% on pharmaceutical-grade CBD isolate; high per-kg margin',
      fit:'★★★☆☆ Highest margin per kg — requires Ghana FDA registration investment',
      description:'The pharmaceutical API importer brings GMP-certified CBD isolate and broad-spectrum hemp extracts into Ghana for use by Licence 02 processors producing pharmaceutical-grade cannabis medicines and Licence 04 R&D operations conducting clinical research. This is the highest per-kg margin import category, but it requires Ghana FDA import permit registration, superintendent pharmacist oversight, and GMP-certified supplier qualification. The pharmaceutical import model is more capital-intensive and time-consuming to establish than seed or equipment import, but it serves the highest-value downstream users and positions the importer in the pharmaceutical distribution chain that will serve Ghana dispensary and export markets.',
      requirements:['NCC Import Licence (Licence 08)','Ghana FDA import permit for pharmaceutical classification of CBD products','GMP-certified supplier qualification — EU-GMP or equivalent','Superintendent pharmacist (registered with Pharmacy Council of Ghana) as responsible officer','Cold-chain storage capability for pharmaceutical products'],
      advantages:['Highest per-kg margin in import category — pharmaceutical-grade pricing reflects compliance investment','Natural integration with Ghana pharmaceutical distribution sector — existing infrastructure adaptable','API supply is essential for pharmaceutical-grade processing — Licence 02 holders cannot produce medicines without it','Ghana FDA registration creates regulatory barrier to entry — second importer faces same 18-month delay'],
      risks:['Ghana FDA registration timeline is 12–24 months — the longest regulatory pathway in import category','Pharmaceutical importation requires superintendent pharmacist — hard to recruit and retain','Market limited to Licence 02 pharmaceutical processors and Licence 04 R&D — smaller immediate customer base'],
      ideal:'Pharmaceutical distribution companies adding cannabis to portfolio; investors with Ghana FDA registration experience; companies already holding FDA import permits for other pharmaceutical products',
    },
    {
      n:'04',name:'Multi-Category Import Hub',tag:'MAXIMUM COVERAGE',color:C.limeDark,
      tagline:'Seed + equipment + consumables + APIs. One-stop supply partner for every licence holder.',
      scale:'5+ import categories · 3–5 exclusive supplier agreements · national distribution network',
      capital:'$150K–500K (multi-category working capital; warehouse; 2–3 staff)',
      timeline:'18–30 months to full multi-category operation',
      revenue:'Combined import revenue $500K–3M/yr at sector maturity; diversified margin profile',
      fit:'★★★★☆ Most defensible long-term position — deepest client relationships',
      description:'The multi-category import hub combines seed, equipment, consumables, and API import under one NCC Licence 08 operation, becoming the single-source supply partner for all licence holder types. A cultivation applicant buys seed through the hub. A processing licence holder buys the decorticator and extraction skid through the hub. A testing lab buys reference standards through the hub. A pharmaceutical processor orders CBD isolate through the hub. The consolidated client relationship creates switching costs and cross-selling opportunities that single-category importers cannot replicate. This model requires more capital and operational complexity but creates the most durable competitive position.',
      requirements:['NCC Import Licence (Licence 08) with broad scope covering all categories','Multiple regulatory registrations: PPRSD, Ghana FDA (different categories), NCC per product class','Multiple exclusive supplier agreements across seed, equipment, and API categories','Warehouse or bonded storage facility for inventory management','Trade finance facilities and FX hedging for multi-currency procurement'],
      advantages:['Client stickiness — once all imports come through one supplier, switching to competitors is high-friction','Cross-selling: seed sale leads to equipment sale leads to consumables contract','Deepest regulatory knowledge across all import categories — competitive advantage that takes years to replicate','Best positioned for ECOWAS re-export hub as West African neighbours develop hemp frameworks'],
      risks:['Higher operational complexity — multiple regulatory streams, multiple supplier relationships, multiple product categories','Larger working capital requirement — multi-category inventory financing','Management bandwidth risk — spreading too thin before any single category is profitable'],
      ideal:'Well-capitalised trade and distribution companies; investors targeting the supply chain intermediary position; companies with existing multi-product import infrastructure in Ghana',
    },
  ];
  const m = models[active];
  return (
    <div id="s04" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <MobileCollapse num="§ 04" title="Business Models" stat="4 Models" label="$30K to $500K Entry">
        <SectionRule/>
        <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
          <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 04</span>
          <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Business Models</span>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>Four Import Business Models — from Seed Agent to Multi-Category Hub</h2>
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
      <MobileCollapse num="§ 05" title="Unit Economics" stat="15–40%" label="Typical Import Margin">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 05</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Unit Economics</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'12px',maxWidth:'680px'}}>What Import Margins Look Like Across Five Product Categories</h2>
      <p style={{fontFamily:F.body,fontSize:'15px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'36px',maxWidth:'700px'}}>
        Import economics are driven by the gap between landed cost (CIF Tema + duties + logistics) and resale price in the domestic market. Cannabis import benefits from scarcity premium: no domestic competitors, mandatory demand, and a sector willing to pay for compliance documentation and reliability.
      </p>
      <div style={{background:C.paperDark,padding:'28px',marginBottom:'32px'}}>
        <Eyebrow>Import Margin Profile by Product Category</Eyebrow>
        <div style={{marginTop:'18px'}}>
          {[
            {label:'Certified hemp seed (EU catalogue varieties)',v:60,max:100,note:'Import €200–400/kg; sell €450–900/kg — 2–3× mark-up in scarcity market'},
            {label:'Processing equipment (decorticators, extraction)',v:45,max:100,note:'15–35% mark-up on landed cost; $50K–1M per order value'},
            {label:'Lab reference standards and consumables',v:80,max:100,note:'30–60% mark-up; small volume, high frequency, captive lab customers'},
            {label:'CBD isolate pharmaceutical-grade API',v:70,max:100,note:'20–40% mark-up; highest absolute margin per kg; FDA-registered products'},
            {label:'Hemp food ingredients (oil, protein, hearts)',v:35,max:100,note:'10–20% mark-up; competitive with food-grade commodity; lower margin'},
          ].map((s,i) => (
            <div key={i} style={{marginBottom:'14px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px',flexWrap:'wrap',gap:'6px'}}>
                <div>
                  <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{s.label}</span>
                  <span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,marginLeft:'10px'}}>{s.note}</span>
                </div>
                <span style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:C.forest}}>{s.v}%+</span>
              </div>
              <div style={{height:'16px',background:C.border,position:'relative'}}>
                <div style={{position:'absolute',left:0,top:0,height:'100%',width:`${s.v}%`,background:i===2?C.lime:i===3?C.limeDark:C.forest}}/>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',marginBottom:'32px'}} className="tc">
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Revenue Scenarios — 3 Model Scales</div>
          {[
            {item:'Seed agent only (Year 1, 10 cultivation licences)',range:'$50K–150K',pct:'Conservative',note:'10 licence holders × 5–10kg/ha × 50–200ha each at retail price'},
            {item:'Seed + consumables (Year 2, 20 licence holders)',range:'$200K–500K',pct:'Growing',note:'Seed recurring + lab consumables from 2 active testing labs'},
            {item:'Multi-category hub (Year 3, mature sector)',range:'$800K–2.5M',pct:'Scale',note:'Seed + equipment + consumables + APIs; regional re-export beginning'},
            {item:'Equipment deal (single large processing facility)',range:'$100K–400K',pct:'Per-deal',note:'Single decorticator + extraction skid package at 20–30% mark-up'},
            {item:'API supply contract (quarterly pharmaceutical)',range:'$150K–600K/yr',pct:'Annual',note:'Quarterly pharmaceutical CBD shipments to 2–3 processing licence holders'},
            {item:'ECOWAS re-export (Year 4+)',range:'$300K–1M/yr',pct:'Regional',note:'Ghana as West African import hub as neighbours develop frameworks'},
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
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Working Capital &amp; Cost Structure</div>
          <div style={{background:C.ink,padding:'20px',marginBottom:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>Annual Operating Cost — Small Import Operation</div>
            {[
              {scale:'Staff (2–3 persons)', capex:'$25K–70K/yr', note:'Import manager, documentation/regulatory, sales — Ghana salary scale'},
              {scale:'Trade finance and FX costs', capex:'2–5% of import value', note:'LC fees, currency conversion spread, forward contract premiums'},
              {scale:'Customs clearance and duties', capex:'Varies by HS code', note:'Standard customs duty + VAT + levies; GIPC incentives for equipment'},
              {scale:'Bonded storage / warehouse', capex:'$8K–25K/yr', note:'For seed seasonal stock and API cold storage'},
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
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>FX Risk Management</div>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.7,color:C.ink,marginBottom:'10px'}}>Ghana cedi volatility against EUR and USD is a key profitability driver. Importer buys in EUR/USD, sells in GH₵ — a cedi depreciation between purchase order and sale can destroy margin.</p>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.7,color:C.ink,marginBottom:'10px'}}>Mitigation: invoice domestic customers in USD or EUR where possible. Forward foreign exchange contracts through Ghanaian commercial banks. Build FX buffer of 15–20% into margin assumptions. Quarterly price list updates to pass FX movement through to customers.</p>
            <div style={{borderLeft:`2px solid ${C.amber}`,paddingLeft:'10px'}}>
              <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.amber,lineHeight:1.6}}>⚠ FX risk is the primary P&L risk in import operations — manage it actively from Day 1.</p>
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
    {num:'08',name:'Import',pos:'TRADE',color:C.lime,rel:null,active:true},
    {num:'01',name:'Cultivation',pos:'UPSTREAM',color:C.forest,rel:'RECEIVES SEED'},
    {num:'03',name:'Breeding & Seed',pos:'UPSTREAM',color:C.teal,rel:'RECEIVES GENETICS'},
    {num:'05',name:'Testing Lab',pos:'ENABLING',color:C.limeDark,rel:'RECEIVES STANDARDS'},
    {num:'06',name:'Storage',pos:'ENABLING',color:C.limeDark,rel:'SEEDS STORED'},
    {num:'04',name:'R&D',pos:'SPECIALIST',color:C.teal,rel:'RECEIVES MATERIAL'},
    {num:'02',name:'Processing',pos:'MID-CHAIN',color:C.forest,rel:'RECEIVES EQUIP/API'},
    {num:'07',name:'Transport',pos:'ENABLING',color:C.limeDark,rel:'DELIVERS'},
    {num:'11',name:'Dispensing',pos:'DOWNSTREAM',color:C.forest,rel:'RECEIVES PRODUCTS'},
    {num:'09',name:'Export',pos:'TRADE',color:C.teal,rel:'ENABLES RE-EXPORT'},
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
      <MobileCollapse num="§ 06" title="Value Chain" stat="10 of 11" label="Licences Benefit From Imports">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 06</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Value Chain Position</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>The Global Supply Gateway — All Imports Flow Through Licence 08</h2>
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
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>What Import Supplies to Each Licence</div>
          {[
            {lic:'Licence 01 — Cultivation',role:'100% of certified hemp seed in Ghana early years. EU and Canadian certified varieties with phytosanitary certificates and THC compliance COAs.'},
            {lic:'Licence 02 — Processing',role:'Processing equipment — decorticators, extraction skids, seed presses — and pharmaceutical-grade CBD APIs and intermediates.'},
            {lic:'Licence 05 — Testing Lab',role:'Certified cannabinoid reference standards from ISO 17034-accredited suppliers. HPLC columns, mobile phases, and analytical kit consumables.'},
            {lic:'Licence 03 — Breeding & Seed',role:'Initial trial seed genetics from EU and Canadian breeding programmes for adaptive trials. Import is the feedstock for domestic variety development.'},
          ].map((r,i) => (
            <div key={i} style={{padding:'10px 0',borderBottom:`1px solid ${C.border}`}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,marginBottom:'3px'}}>{r.lic}</div>
              <p style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.6}}>{r.role}</p>
            </div>
          ))}
        </div>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>What Import Enables (Downstream)</div>
          {[
            {lic:'Licence 04 — R&D',role:'Imports research-grade cannabis materials, reference compounds, and lab equipment that enable clinical research programmes under NCC Licence 04.'},
            {lic:'Licence 11 — Dispensing',role:'Pharmaceutical cannabis products not yet produced domestically may be imported directly for dispensing. As domestic processing scales, import reduces but does not disappear.'},
            {lic:'ECOWAS Re-Export',role:'As West African neighbouring countries develop hemp frameworks, Ghana-based importers can re-export seed, equipment, and inputs under AfCFTA preferential terms.'},
            {lic:'Licence 09 — Export',role:'Import of export-enabling equipment (packaging lines, labelling systems, cold-chain containers) supports the export licence holders in meeting destination market standards.'},
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
      <MobileCollapse num="§ 07" title="Competition" stat="Tema Port" label="Ghana Import Gateway">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 07</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Competitive Landscape</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>Ghana vs. Seven African Peers — Cannabis Import Trade Position</h2>
      {/* Desktop table */}
      <div className="mob-hide" style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',minWidth:'680px'}}>
          <thead>
            <tr style={{background:C.ink}}>
              {['Country','Status','Import Readiness','Port / Customs','Supplier Access','Framework','BRIDGE View'].map((h,i) => (
                <th key={i} style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.35)',textAlign:'left',borderRight:i<6?`1px solid rgba(255,255,255,0.05)`:'none'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {country:'🇬🇭 Ghana',status:'Active 2026',aFit:'★★★★★ — NCC + FDA + PPRSD',port:'★★★★★ — Tema port ICUMS',labour:'★★★★★ — EU, US, CN suppliers',fw:'★★★☆☆ — NCC L.I. 2475',view:'Only West African country with comprehensive cannabis import licence framework in 2026',hl:true},
              {country:'🇿🇦 South Africa',status:'Active 2023',aFit:'★★★★☆ — Active imports',port:'★★★★☆ — Durban port',labour:'★★★★☆',fw:'★★★★★',view:'Most developed cannabis import framework; active seed and equipment imports'},
              {country:'🇱🇸 Lesotho',status:'Active 2017',aFit:'★★★☆☆ — Seed imports',port:'★☆☆☆☆ — Landlocked',labour:'★★★☆☆',fw:'★★★★☆',view:'Medicinal-focused imports; routes via SA; landlocked complexity'},
              {country:'🇲🇦 Morocco',status:'Recent 2021',aFit:'★★★☆☆ — EU access',port:'★★★★☆ — EU proximity',labour:'★★★☆☆',fw:'★★★☆☆',view:'EU proximity strong for seed and equipment; pharmaceutical import developing'},
              {country:'🇰🇪 Kenya',status:'Emerging 2023',aFit:'★★★☆☆ — Building',port:'★★★☆☆ — Mombasa',labour:'★★★☆☆',fw:'★★☆☆☆',view:'Mombasa port access; building import capability; regulations incomplete'},
              {country:'🇿🇼 Zimbabwe',status:'Active 2022',aFit:'★★☆☆☆ — Limited',port:'★☆☆☆☆ — Landlocked',labour:'★★☆☆☆',fw:'★★☆☆☆',view:'Landlocked; import complexity via Mozambique/South Africa ports'},
              {country:'🇲🇼 Malawi',status:'Active 2020',aFit:'★★☆☆☆ — Minimal',port:'★☆☆☆☆ — Landlocked',labour:'★★☆☆☆',fw:'★★☆☆☆',view:'Very limited import capability; landlocked and framework weak'},
              {country:'🇿🇲 Zambia',status:'Emerging',aFit:'★☆☆☆☆ — Pre-framework',port:'★★☆☆☆',labour:'★☆☆☆☆',fw:'★★☆☆☆',view:'No cannabis import framework yet; developing'},
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
        {country:'🇬🇭 Ghana',status:'Active 2026',aFit:'★★★★★ — Full framework',port:'★★★★★ — Tema ICUMS',labour:'★★★★★ — EU/US/CN access',fw:'★★★☆☆',view:'Only West African country with full cannabis import licence framework in 2026.',hl:true},
        {country:'🇿🇦 South Africa',status:'Active 2023',aFit:'★★★★☆ — Active',port:'★★★★☆ — Durban',labour:'★★★★☆',fw:'★★★★★',view:'Most developed cannabis imports; active seed and equipment trade'},
        {country:'🇱🇸 Lesotho',status:'Active 2017',aFit:'★★★☆☆ — Seed imports',port:'★☆☆☆☆ — Via SA',labour:'★★★☆☆',fw:'★★★★☆',view:'Medicinal imports via SA; landlocked complexity'},
        {country:'🇲🇦 Morocco',status:'Recent 2021',aFit:'★★★☆☆ — EU proximity',port:'★★★★☆',labour:'★★★☆☆',fw:'★★★☆☆',view:'EU proximity strong; pharmaceutical import developing'},
        {country:'🇰🇪 Kenya',status:'Emerging 2023',aFit:'★★★☆☆ — Building',port:'★★★☆☆ — Mombasa',labour:'★★★☆☆',fw:'★★☆☆☆',view:'Mombasa access; building cannabis import capability'},
        {country:'🇿🇼 Zimbabwe',status:'Active 2022',aFit:'★★☆☆☆ — Limited',port:'★☆☆☆☆ — Landlocked',labour:'★★☆☆☆',fw:'★★☆☆☆',view:'Landlocked; complex import via Mozambique/SA ports'},
        {country:'🇲🇼 Malawi',status:'Active 2020',aFit:'★★☆☆☆ — Minimal',port:'★☆☆☆☆ — Landlocked',labour:'★★☆☆☆',fw:'★★☆☆☆',view:'Very limited; landlocked and framework weak'},
        {country:'🇿🇲 Zambia',status:'Emerging',aFit:'★☆☆☆☆ — Pre-framework',port:'★★☆☆☆',labour:'★☆☆☆☆',fw:'★★☆☆☆',view:'No cannabis import framework yet'},
      ]}/>
      <PullQuote>
        Ghana is the only West African country with an active, comprehensive cannabis import licence framework in 2026. The first importer to secure exclusive supply agreements with key global seed, equipment, and API companies will be the mandatory supply partner for every licence holder in Ghana's cannabis sector — and the natural ECOWAS hub as West African neighbours follow.
      </PullQuote>
      <div style={{background:C.paperDark,padding:'20px',marginTop:'8px'}}>
        <Eyebrow>Ghana Import Structural Advantages</Eyebrow>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0',marginTop:'14px'}} className="tc3">
          {[
            {title:'First and Only West African Licence',body:'Ghana is the only country in West Africa with a comprehensive cannabis import licensing framework in 2026. The first licensed importer captures the entire domestic market by default and has a 2–4 year head start on any subsequent competitor.'},
            {title:'Tema Port ICUMS Clearance',body:'Ghana ICUMS electronic clearance system and Tema port infrastructure provide streamlined import processing. Bonded warehouse and EPZ capabilities at Tema support inventory staging and ECOWAS re-export operations under AfCFTA preferential terms.'},
            {title:'ECOWAS Regional Hub Potential',body:'As West African neighbours develop cannabis frameworks, a Ghana-licensed importer becomes the natural re-export hub for the region — supplying seed, equipment, and inputs to Nigeria, Senegal, Ivory Coast, and others through an already-established supply chain and regulatory track record.'},
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
      <MobileCollapse num="§ 08" title="Regulatory Roadmap" stat="5 Phases" label="to First Import Cleared">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 08</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Regulatory Roadmap</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>From NCC Import Licence to First Cleared Cannabis Shipment</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px'}} className="tc mob-hide">
        <div>
          {[
            {phase:'Phase 1',label:'NCC Import Licence Application (Months 1–4)',steps:['Submit NCC Import Licence (Licence 08) application covering intended product categories — seed, equipment, APIs, consumables','Provide supplier details, product descriptions, intended buyer licence categories, and import volumes for NCC review','Register importer company with Registrar General Department if not already registered','Obtain Ghana Revenue Authority Tax Clearance Certificate — required for all importers','Engage a licensed customs clearing agent with experience in regulated goods (food, pharmaceutical, agricultural inputs)'],color:C.teal},
            {phase:'Phase 2',label:'Category-Specific Permit Registration (Months 2–8)',steps:['For hemp seed: apply to PPRSD for phytosanitary import permit — submit variety list, intended use (planting), exporting country phytosanitary authority documentation','For pharmaceutical APIs: apply to Ghana FDA for import permit under medicines import framework; appoint superintendent pharmacist as responsible officer','For food-grade hemp products (oil, protein): verify Ghana FDA food import permit and novel food status — pre-clearance consultation recommended','For equipment: confirm HS tariff classification with customs; apply for GIPC investment incentives if qualifying for duty relief','Establish trade finance facility with Ghanaian commercial bank for Letter of Credit issuance — cannabis declaration will be required'],color:C.forest},
            {phase:'Phase 3',label:'Supplier Qualification & Exclusive Agreements (Months 2–6)',steps:['Identify 2–3 target EU or Canadian seed companies with EU Common Catalogue varieties — confirm THC compliance track record for all varieties','Negotiate exclusive distribution rights for Ghana (and ideally ECOWAS) — include minimum order commitments and territorial protection clauses','For equipment: negotiate exclusive representation with 1–2 European or Chinese manufacturers — include installation and after-sales support terms','For APIs: qualify GMP-certified supplier; review COA package; confirm Ghana FDA registration pathway for each product','For all suppliers: negotiate Incoterms (CIF Tema preferred), payment terms, and force-majeure/regulatory change provisions'],color:C.limeDark},
            {phase:'Phase 4',label:'First Shipment Clearance (Months 6–14)',steps:['Place first import order — coordinate with supplier on documentation package: commercial invoice, packing list, certificate of origin, COA, phytosanitary certificate where applicable','Submit Bill of Entry through ICUMS electronic system with all supporting documents','Pay applicable customs duties, VAT (15%), and import levies — confirm duty rate with customs for each HS code in advance','Ghana FDA or PPRSD inspection on arrival if regulated product — confirm inspection lead times and sampling procedures before shipment arrival','Obtain customs release and deliver to NCC-approved storage facility or directly to first client under chain-of-custody documentation'],color:C.amber},
            {phase:'Phase 5',label:'Commercial Operations Scale-Up (Months 12+)',steps:['File NCC import reports: quantities imported by product, destination licence holders, COA references','Build domestic distribution network — bonded warehouse for seed, cold room for APIs, standard warehouse for equipment','Develop ECOWAS re-export capability as neighbouring country hemp frameworks develop — AfCFTA preference documentation','Expand exclusive agreement portfolio — new seed varieties, new equipment manufacturers, additional API suppliers','Annual licence renewal: update NCC import licence scope as product categories evolve'],color:C.lime},
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
              {item:'NCC import licence renewal',detail:'Every 3 years; scope update if adding new product categories'},
              {item:'Annual import reports to NCC',detail:'Quantities by product category; destination licence holders; COA references per lot'},
              {item:'GRA tax clearance renewal',detail:'Annual Tax Clearance Certificate required; customs duty payments current'},
              {item:'PPRSD phytosanitary permits renewal',detail:'Annual renewal; permit required per variety imported for seed category'},
              {item:'Ghana FDA import permit renewal',detail:'For pharmaceutical products — annual renewal with updated product list'},
              {item:'Adverse event reporting',detail:'Non-compliant import detected (THC above limit, contaminants) — immediate NCC and FDA notification; re-export or destruction'},
              {item:'Superintendent pharmacist records',detail:'If importing pharmaceutical APIs — pharmacist inspection records, dispensing oversight logs'},
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
              {body:'Plant Protection and Regulatory Services Directorate (PPRSD)',role:'Phytosanitary import permit for hemp seed and plant material; port inspection on arrival'},
              {body:'Ghana Food and Drugs Authority (FDA)',role:'Import permit for pharmaceutical APIs and food products; superintendent pharmacist designation'},
              {body:'Ghana Revenue Authority — Customs',role:'ICUMS electronic clearance; duty assessment; bonded warehouse registration for staging'},
              {body:'Ghana Standards Authority (GSA)',role:'Standards compliance for food-grade hemp products; GSA mark where required'},
              {body:'Ghana Free Zones Authority',role:'EPZ bonded warehouse incentives for re-export operations; import duty relief on qualifying goods'},
            ].map((r,i) => (
              <div key={i} style={{padding:'7px 0',borderBottom:i<4?`1px solid ${C.border}`:'none'}}>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>{r.body}</div>
                <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.muted}}>{r.role}</div>
              </div>
            ))}
          </div>
          <div style={{borderLeft:`3px solid ${C.amber}`,paddingLeft:'14px',background:C.paper,padding:'14px 14px 14px 16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.amber,marginBottom:'6px'}}>THC Non-Compliance on Import — Critical Customs Risk</div>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.65,color:C.ink}}>If imported hemp seed or product is found to contain THC above 0.3% at Ghanaian customs inspection, NCC may order seizure, re-export, or destruction — with the importer bearing all costs and liability. <strong>Pre-shipment COA verification is not enough. Require ISO 17025-accredited independent testing of every seed lot before shipment. Build re-export or destruction cost provision into import insurance policy. Pre-clear NCC on documentation requirements before the first shipment to avoid surprises at Tema port.</strong></p>
          </div>
        </div>
      </div>
      <MobPhaseAccordion phases={[
        {phase:'Phase 1',label:'NCC Import Licence Application (Months 1–4)',color:C.teal,steps:['Submit NCC Licence 08 application covering intended product categories','Register with Registrar General Department','Obtain GRA Tax Clearance Certificate','Engage customs clearing agent for regulated goods','Define initial import scope: seed, equipment, or API first']},
        {phase:'Phase 2',label:'Category-Specific Permits (Months 2–8)',color:C.forest,steps:['PPRSD phytosanitary permit for hemp seed import','Ghana FDA permit for pharmaceutical APIs','Verify food import permit status for food-grade hemp products','Confirm HS tariff classification for equipment','Establish trade finance LC facility with Ghanaian bank']},
        {phase:'Phase 3',label:'Supplier Qualification & Exclusivity (Months 2–6)',color:C.limeDark,steps:['Identify 2–3 target EU/Canadian seed companies','Negotiate exclusive distribution rights for Ghana','Equipment: exclusive representation with 1–2 manufacturers','Qualify GMP-certified API supplier; COA package review','Negotiate Incoterms, payment terms, force-majeure clauses']},
        {phase:'Phase 4',label:'First Shipment Clearance (Months 6–14)',color:C.amber,steps:['Place first import order with full documentation package','Submit Bill of Entry through ICUMS electronic system','Pay customs duties, VAT, import levies','FDA or PPRSD inspection on arrival for regulated products','Deliver to NCC-approved storage or first client under chain-of-custody']},
        {phase:'Phase 5',label:'Scale-Up (Months 12+)',color:C.lime,steps:['File NCC annual import reports','Build bonded warehouse for seed; cold room for APIs','Develop ECOWAS re-export capability under AfCFTA','Expand exclusive agreement portfolio','Annual NCC licence renewal and scope update']},
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
            r:'Import shipment seized at customs — THC non-compliance or documentation failure',
            sev:'HIGH',likelihood:'Medium (early sector)',cat:'Regulatory / Financial',
            m:'Customs officials unfamiliar with NCC cannabis import framework may misclassify or seize compliant hemp imports. Mitigation: (1) Pre-clear NCC on exact documentation requirements before first shipment. (2) Require ISO 17025-accredited independent pre-shipment THC testing from every supplier. (3) Include re-export cost provision in trade finance structure. (4) Engage a customs broker with NCC cannabis experience for every clearance. (5) File NCC import notification before shipment departure — advance notice reduces surprise customs encounters.',
          },
          {
            r:'FX loss — cedi depreciation between purchase order and domestic sale',
            sev:'HIGH',likelihood:'High (Ghana FX history)',cat:'Financial',
            m:'This is the most persistent financial risk in import operations. Mitigation: (1) Invoice domestic customers in USD or EUR where contractually possible. (2) Forward FX contracts through commercial banks for known import payments. (3) Build 15–20% FX buffer into all domestic pricing. (4) Quarterly price list updates to pass material FX movements through to customers. (5) Minimise inventory holding time — time between import clearance and sale is currency risk exposure.',
          },
          {
            r:'Supplier non-compliance — imported seed contains THC above 0.3%',
            sev:'HIGH',likelihood:'Low-Medium (with supplier qualification)',cat:'Quality / Regulatory',
            m:'Import only from EU Common Catalogue-listed seed varieties with documented multi-season THC compliance data. Require ISO 17025-accredited independent testing of every seed lot before shipment, not just supplier COA. Include contractual liability for THC non-compliance with supplier — re-export or destruction costs must be recoverable. Do not rely solely on exporting country phytosanitary certificate for THC compliance.',
          },
          {
            r:'Ghana FDA registration delays for pharmaceutical APIs',
            sev:'MEDIUM-HIGH',likelihood:'Medium',cat:'Regulatory',
            m:'Ghana FDA registration for pharmaceutical CBD products can take 12–24 months. Start registration process before first import attempt. Identify whether products qualify as medicines, food supplements, or cosmetics under Ghana FDA classification — different registration pathways. Consider importing as research material under Licence 04 R&D provisions initially while pharmaceutical registration is pending.',
          },
          {
            r:'Exclusive agreement supplier exits Ghana market or revokes exclusivity',
            sev:'MEDIUM',likelihood:'Low-Medium',cat:'Commercial',
            m:'Build exclusive agreements on 3–5 year terms with renewal options and territory protection clauses. Include minimum order commitments from importer side (activates exclusivity) and performance obligations from supplier side. Qualify 2–3 backup suppliers in the same category before exclusive agreements are finalised. Diversify exclusive agreements across multiple suppliers to avoid single-supplier dependency.',
          },
          {
            r:'Working capital cycle — slow-paying customers',
            sev:'MEDIUM',likelihood:'Medium',cat:'Financial',
            m:'Cannabis licence holders are new entities with limited credit history. Require upfront payment or irrevocable LC from first-time clients. Introduce 30-day payment terms only after 2–3 successful transactions. Use invoice discounting or factoring facilities if available. Do not place import orders without confirmed downstream sales — import-on-speculation creates working capital risk.',
          },
          {
            r:'PPRSD phytosanitary permit delays — seed arrives after planting window',
            sev:'MEDIUM',likelihood:'Medium (Year 1)',cat:'Operational',
            m:'PPRSD permit processing time is not yet established for cannabis seed import. Allow 8–12 weeks from application submission to permit receipt in project planning. File permit applications 3–4 months before cultivation clients need seed. Consider importing under temporary or provisional permit if PPRSD provides this mechanism while full permit is processed.',
          },
          {
            r:'Domestic sector grows too slowly — insufficient client volume for import viability',
            sev:'LOW-MEDIUM',likelihood:'Low-Medium',cat:'Commercial',
            m:'The seed agent model is viable with as few as 5–10 active cultivation licences. Equipment distribution requires only 1–2 processing licence holders per year. Lab consumables require only 1–2 active testing labs. Do not build multi-category inventory before confirmed clients. Start with pre-order model: cultivation applicants commit to seed purchase before import order is placed.',
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
    {dim:'Market Opportunity',score:72,weight:'30%',rationale:'Every licence holder in the chain needs imported inputs in the early years — and the importer is the only legal supplier. ECOWAS re-export potential multiplies the addressable market. Score reflects the time-limited nature of import dependency (domestic production will eventually substitute) but also the significant first-mover monopoly period.'},
    {dim:'Development Impact',score:62,weight:'30%',rationale:'Import enables every other licence in the chain — without certified seed, no cultivation; without processing equipment, no processing. The multiplier effect on sector development is high. Direct employment is moderate: import and distribution operations are not labour-intensive relative to capital deployed. Impact is enabling rather than direct.'},
    {dim:'Implementation Feasibility',score:72,weight:'25%',rationale:'Ghana ICUMS electronic clearance system is functional. Customs clearing agents are available. Trade finance is available from commercial banks. The main feasibility challenges are multi-agency permit coordination (NCC, PPRSD, FDA) and FX management — both manageable with experienced teams. No fixed asset investment required.'},
    {dim:'Financial Sustainability',score:74,weight:'15%',rationale:'Import margins on scarce inputs (seed, APIs) are high in the early-market period. FX risk is the primary sustainability challenge — cedi volatility can erode margins if not actively managed. Multi-category diversification and recurring consumable revenue (lab standards, spare parts) provide baseline stability. Exclusive agreements protect revenue for 3–5 years.'},
  ];
  return (
  <div id="s10" className="pad-section" style={{background:C.ink,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 10" title="BRIDGE Score™" stat="70/100" label="Core Tier · Trade" onDark={true}>
      <div style={{borderTop:`6px solid ${C.paper}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 10</span>
        <Eyebrow light>BRIDGE Impact Score™</Eyebrow>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.paper,lineHeight:1.2,marginBottom:'32px',maxWidth:'680px'}}>Import Scores 70/100 — Capital-Light, Fast-to-Revenue, First-Mover Exclusive Agreements Are the Prize</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:'40px'}} className="tc">
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'16px'}}>Composite Score</div>
          <div style={{display:'flex',alignItems:'baseline',gap:'6px',marginBottom:'4px'}}>
            <div style={{fontFamily:F.mono,fontSize:'clamp(72px,12vw,120px)',fontWeight:500,color:C.lime,lineHeight:1}}>70</div>
            <div style={{fontFamily:F.mono,fontSize:'clamp(22px,4vw,36px)',fontWeight:300,color:'rgba(184,217,53,0.3)',lineHeight:1,marginBottom:'6px'}}>/100</div>
          </div>
          <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.28)',letterSpacing:'0.5px',marginBottom:'28px'}}>Core Tier · Trade · NCC Licence 08</div>
          <ScoreBar label="Market Opportunity  ×30%" value={72} onDark/>
          <ScoreBar label="Development Impact  ×30%" value={62} onDark/>
          <ScoreBar label="Impl. Feasibility  ×25%" value={72} onDark/>
          <ScoreBar label="Financial Sustainability  ×15%" value={74} onDark/>
          <div style={{marginTop:'20px',borderTop:`1px solid rgba(255,255,255,0.08)`,paddingTop:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.3)',marginBottom:'10px'}}>Quick Parameters</div>
            {[{l:'Entry Barrier',v:'Medium (permits + supplier agreements)'},{l:'Capital Intensity',v:'Low–Medium (working capital)'},{l:'Timeline to Revenue',v:'6–12 months'},{l:'Licence Tier',v:'Core · Trade'}].map((p,i) => (
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
    {cat:'NCC Import Licence (Licence 08)',range:'$2K–8K',note:'Application + 3-year licence; confirm fee with NCC Cannabis Dept.'},
    {cat:'GRA Tax Clearance Certificate',range:'$500–2K',note:'Annual renewal; required for all importers'},
    {cat:'PPRSD phytosanitary permit (seed)',range:'$500–3K',note:'Per variety per year; confirm processing time with PPRSD before first order'},
    {cat:'Ghana FDA import permit (APIs)',range:'$2K–10K',note:'Product registration + annual import permit; superintendent pharmacist required'},
    {cat:'Customs clearing agent (retainer)',range:'$3K–12K/yr',note:'Licensed clearing agent with NCC cannabis experience — essential'},
    {cat:'Trade finance LC facility',range:'$5K–20K one-time',note:'Bank LC facility setup; annual maintenance fees; % of transaction value'},
    {cat:'Working capital (first import order)',range:'$20K–100K',note:'Seed: seasonal order upfront; APIs: quarterly 30-day payment cycle'},
    {cat:'Bonded warehouse / storage',range:'$5K–20K/yr',note:'Seed seasonal storage + API cold room + equipment staging area'},
    {cat:'Staff (2–3 persons)',range:'$25K–70K/yr',note:'Import manager, regulatory/documentation, sales — Ghana salary scale'},
  ];
  const SHOW_FIRST = 4;
  return (
  <div id="s11" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 11" title="Deployment" stat="$30K+" label="Import Operation Entry Capital">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 11</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Deployment Parameters</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>What It Takes to Launch Ghana's First Licensed Cannabis Import Operation</h2>
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
              {role:'Import Manager',spec:'International trade experience; NCC/FDA/PPRSD permit management; supplier relationship management'},
              {role:'Regulatory & Documentation Officer',spec:'Multi-agency permit coordination; COA verification; ICUMS submission; NCC import reporting'},
              {role:'Superintendent Pharmacist',spec:'Required for pharmaceutical API imports; Pharmacy Council of Ghana registration — can be part-time/consultant initially'},
              {role:'Sales / Business Development',spec:'Client relationship management; distribution to licence holders; contract negotiations'},
              {role:'Finance / Trade Operations',spec:'LC management; FX hedging; working capital tracking; GRA compliance'},
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
              The window to secure exclusive supply agreements with key global suppliers is now — before Ghana's sector is large enough to attract direct supplier attention, and before other Ghanaian importers secure the same agreements. The first licensed importer who signs exclusive distribution rights with 2–3 European seed companies, 1–2 equipment manufacturers, and 1 pharmaceutical API supplier owns the supply chain for Years 1–5.
            </p>
            <p style={{fontFamily:F.body,fontSize:'13px',fontWeight:300,color:'rgba(250,248,243,0.7)',lineHeight:1.75,marginBottom:'16px'}}>
              Import is the fastest-to-revenue Licence 08 business model: no physical construction, no crop cycles, no equipment commissioning. Once permits are in place and first supplier shipment is ordered, revenue can begin within 6–12 months of NCC licence application — faster than any other licence category.
            </p>
            {[
              {l:'NCC application start',v:'Now — Q2 2026'},
              {l:'First import shipment cleared',v:'Q4 2026 – Q1 2027'},
              {l:'First exclusive agreement signed',v:'Q2 2026 (before sector matures)'},
              {l:'ECOWAS re-export capability',v:'2029 onwards'},
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
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(250,248,243,0.45)',letterSpacing:'0.3px'}}>Licence 08 of 11 · Ghana Cannabis Intelligence</div>
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
export default function ImportBrief() {
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
