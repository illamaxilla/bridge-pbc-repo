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
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>Ghana Cannabis Intelligence · Licence 11 · Dispensing · Members Brief</span>
        <span className="mob-show" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>11 · Dispensing</span>
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
    <div style={{position:'absolute',right:'-20px',top:'-30px',fontFamily:F.display,fontSize:'clamp(180px,35vw,480px)',fontWeight:900,color:'rgba(255,255,255,0.022)',pointerEvents:'none',userSelect:'none',letterSpacing:'-12px',lineHeight:1}}>11</div>
    <div style={{maxWidth:'900px',margin:'0 auto',position:'relative'}}>
      <div ref={logoRef} style={{marginBottom:'36px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Logo height={30} variant="white"/>
        <div className="mob-hide" style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(250,248,243,0.22)',letterSpacing:'0.8px'}}>MARCH 2026 · NCC L.I. 2475</div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px',flexWrap:'wrap'}}>
        <div style={{background:C.lime,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'3px',textTransform:'uppercase',color:C.ink}}>LICENCE 11 · DOWNSTREAM</div>
        <div style={{border:`1px solid ${C.lime}`,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime}}>CORE TIER</div>
        <div className="mob-hide" style={{border:`1px solid rgba(255,255,255,0.15)`,padding:'4px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.4)'}}>MEMBERS INTELLIGENCE</div>
      </div>
      <h1 style={{fontFamily:F.display,fontSize:'clamp(30px,5.5vw,68px)',fontWeight:900,color:C.paper,lineHeight:1.08,marginBottom:'20px',maxWidth:'800px'}}>
        Dispensing &amp; Retail<br/>
        <span style={{fontWeight:400,fontStyle:'italic',color:'rgba(250,248,243,0.55)',fontSize:'0.72em'}}>The Patient-Facing Final Mile — Where Ghana Hemp Meets the Consumer</span>
      </h1>
      <PullQuote onDark>
        A sector grows hemp, processes it, tests it, stores it, transports it, imports it, exports it, and distributes it — but the ultimate measure of success is whether a patient receives medicine, and whether a consumer can purchase a hemp wellness product safely and conveniently. Dispensing (Licence 11) is where the value chain delivers its social mandate.
      </PullQuote>
      <div style={{borderTop:`1px solid rgba(255,255,255,0.09)`,paddingTop:'28px',marginTop:'8px',display:'flex',flexWrap:'wrap'}} className="stats-row">
        {[
          {v:'71',      l:'BRIDGE Score™',              s:'Core Tier · Downstream'},
          {v:'~2,000',  l:'Pharmacies in Ghana',         s:'Established dispensing infrastructure for hemp medicines'},
          {v:'9,000+',  l:'Licensed Chemical Sellers',   s:'First-contact health retailers across Ghana'},
          {v:'30–60%',  l:'Supplement Retail Margin',    s:'Wellness supplement and cosmetic retail gross margin range'},
          {v:'30–40%',  l:'Pharmaceutical Dispensing Margin', s:'Medicinal cannabis dispensing margin range'},
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
          {n:'01',t:'Why Now — The February 2026 Milestone',s:'Ghana has the infrastructure — 2,000 pharmacies, 9,000+ LCS shops — ready for hemp medicines',id:'s01'},
          {n:'02',t:'The Dispensing Thesis',s:'The social mandate and the commercial opportunity — patient access at the last mile',id:'s02'},
          {n:'03',t:'Ghana Pharmacy & Retail Landscape',s:'Pharmacy Council, FDA Ghana, LCS network, wellness retail',id:'s03'},
          {n:'04',t:'Business Models',s:'4 dispensing models — pharmacy to wellness retail chain',id:'s04'},
          {n:'05',t:'Unit Economics',s:'Margin structure, prescription revenue, retail gross profit',id:'s05'},
          {n:'06',t:'Value Chain Position',s:"Dispensing's role — the patient-facing final mile",id:'s06'},
          {n:'07',t:'Competitive Landscape',s:'Ghana vs. 7 African peers — patient access model comparison',id:'s07'},
          {n:'08',t:'Regulatory Roadmap',s:'NCC dispensing licence, FDA Ghana, Pharmacy Council, prescribing framework',id:'s08'},
          {n:'09',t:'Risk Register',s:'Full matrix — 8 risks, severity, mitigations',id:'s09'},
          {n:'10',t:'BRIDGE Impact Score™',s:'4-dimension analysis, composite 71/100',id:'s10'},
          {n:'11',t:'Deployment Parameters',s:'Capital, team, timeline, cultural positioning',id:'s11'},
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
      <MobileCollapse num="§ 01" title="Why Now" stat="Feb 2026" label="Patient Access Framework Opens" defaultOpen={true}>
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 01</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Why Now</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'32px',maxWidth:'700px'}}>26 February 2026: Ghana Creates a Legal Pathway for Patients to Access Hemp-Derived Medicines — the Last Mile Counts</h2>
      <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr',gap:'48px'}} className="tc">
        <div>
          <p className="dc" style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            On 26 February 2026, Ghana created the legal framework for patients to access hemp-derived medicines through licensed dispensing outlets. Before this date, no legal pathway existed for a Ghanaian patient to receive a prescription for a cannabis-derived medicine, and no licensed retail channel existed for hemp consumer products. The dispensing licence creates both.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            Ghana has a sophisticated pharmaceutical dispensing infrastructure: approximately 2,000 registered community and hospital pharmacies, over 9,000 licensed chemical seller (LCS) shops serving rural and peri-urban communities, and an active Pharmacy Council regulating standards of practice. In Germany and Israel, medical cannabis is dispensed through regular community pharmacies — the pharmacist is the compliance point. Ghana already has this infrastructure. The dispensing licence activates it for cannabis.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink}}>
            Beyond pharmaceutical dispensing, Licence 11 enables the consumer-facing hemp wellness market: hemp seed foods, hempseed oil, CBD topicals, and hemp cosmetics sold through health-food stores, pharmacies, and online channels to Ghana's growing urban wellness consumer segment. The global wellness retail market is expanding rapidly — hemp is a natural fit for an educated, health-conscious Ghanaian consumer who already buys herbal medicines and imported supplements.
          </p>
        </div>
        <div>
          <div style={{background:C.ink,padding:'24px',marginBottom:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>Dispensing Framework at a Glance</div>
            {[
              {l:'NCC Licence',v:'Licence 11 · Dispensing & Retail'},
              {l:'Pharmaceutical dispensing',v:'Prescriptions from authorised physicians'},
              {l:'Pharmacy Council',v:'Superintendent pharmacist required'},
              {l:'Ghana FDA',v:'Drug/food/cosmetic product registration'},
              {l:'Retail scope',v:'Hemp foods, cosmetics, supplements (non-Rx)'},
              {l:'GDP requirement',v:'For pharmaceutical channel — supply chain'},
              {l:'Cultural positioning',v:'Health and wellness framing — not recreational'},
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
Ghana has ~2,000 pharmacies and 9,000+ licensed chemical sellers — a more developed pharmaceutical retail network than any of its African cannabis-sector peers. The dispensing licence activates this existing network for hemp-derived medicines and consumer products, without requiring new infrastructure to be built.
            </p>
          </div>
        </div>
      </div>
      {/* Timeline visual */}
      <div style={{marginTop:'40px',borderTop:`1px solid ${C.border}`,paddingTop:'28px'}}>
        <Eyebrow>Patient Access Development Timeline · 2026–2031</Eyebrow>
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
      <MobileCollapse num="§ 02" title="The Thesis" stat="9,000+" label="Licensed Chemical Sellers in Ghana">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 02</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>The Dispensing Thesis</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'32px',maxWidth:'680px'}}>Every Downstream Opportunity Runs Through This Licence</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px'}} className="tc">
        <div>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            Dispensing and retail (Licence 11) is the value chain's social purpose made tangible. Every other licence — cultivation, processing, testing, transport, storage, wholesale, export — exists to support the moment when a patient receives a medicine that helps them, or a consumer buys a hemp wellness product they trust. Licence 11 is the patient-facing final mile. It is also where 30–60% retail margins on hemp wellness products and 30–40% margins on pharmaceutical dispensing make the business case compelling.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'18px'}}>
            Ghana has more pharmaceutical retail infrastructure than any of its African cannabis-sector peers. Germany built its medical cannabis programme through community pharmacies — existing pharmacies, existing pharmacists, existing supply chains, with cannabis added as a new therapeutic category. Ghana has the same infrastructure: 2,000 pharmacies, 9,000+ licensed chemical sellers, an active Pharmacy Council, and a well-established FDA Ghana drug and food registration system. The dispensing licence activates this network rather than building from scratch.
          </p>
          <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink}}>
            The two commercial opportunities in Licence 11 are distinct: pharmaceutical dispensing (prescription-based, high clinical compliance, 30–40% margins, pharmacist-supervised) and consumer hemp wellness retail (hemp foods, cosmetics, supplements, 30–60% retail margins). Both sit in growing global markets — medical cannabis worldwide is a multi-billion dollar sector, and the global wellness supplement market exceeds $200 billion annually. Ghana's urban middle class is already spending on imported supplements and herbal health products. Local hemp wellness products are a natural category extension.
          </p>
        </div>
        <div>
          <PullQuote>
            In Germany, the moment medical cannabis became pharmacy-dispensable, an entirely new patient population became accessible. Ghana has the pharmacists, the pharmacy network, and now the legal framework. The first licensed dispensary is not competing — it is creating a market.
          </PullQuote>
          <div style={{background:C.paper,border:`1px solid ${C.border}`,padding:'20px',marginTop:'8px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Global Medical Cannabis Market — Key Access Models</div>
            {/* SVG Bar Chart */}
            <svg viewBox="0 0 340 140" style={{width:'100%',display:'block'}}>
              {[
                {yr:'DE',v:85,val:'Pharmacy'},
                {yr:'IL',v:90,val:'Clinic+Pharm'},
                {yr:'AU',v:75,val:'Telehealth'},
                {yr:'UK',v:60,val:'Private Rx'},
                {yr:'ZA',v:45,val:'Section 21'},
                {yr:'GH',v:30,val:'2026 →'},
              ].map((d,i) => (
                <g key={i}>
                  <rect x={10+i*54} y={140-d.v-20} width={38} height={d.v} fill={i===5?C.lime:i>=4?C.limeDark:C.border}/>
                  <text x={29+i*54} y={135} textAnchor="middle" style={{fontFamily:'DM Sans,sans-serif',fontSize:'8px',fill:C.muted}}>{d.yr}</text>
                  <text x={29+i*54} y={140-d.v-25} textAnchor="middle" style={{fontFamily:'DM Mono,monospace',fontSize:'8px',fontWeight:700,fill:i>=4?C.forest:C.muted}}>{d.val}</text>
                </g>
              ))}
              <text x={10} y={12} style={{fontFamily:'DM Sans,sans-serif',fontSize:'9px',fill:C.faint}}>Regulatory maturity index — medical cannabis patient access models globally</text>
            </svg>
            <div style={{marginTop:'8px',display:'flex',gap:'12px',flexWrap:'wrap'}}>
              {[{c:C.border,l:'Active markets'},{c:C.limeDark,l:'Pharmacy-based'},{c:C.lime,l:'Ghana trajectory'}].map((s,i) => (
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
        <Eyebrow>Four Dispensing Revenue Streams in Ghana</Eyebrow>
        {/* Desktop grid */}
        <div className="mob-hide" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'0',marginTop:'14px'}}>
          {[
            {n:'Pharmaceutical Dispensing',d:'Prescriptions for CBD-based medicines for approved indications (epilepsy, chronic pain, spasticity). 30–40% pharmacy dispensing margin. Pharmacist-supervised. GDP-compliant supply chain from Licence 10 distributor.'},
            {n:'Hemp Wellness Retail',d:'Hemp seed oil, protein powder, hemp hearts, CBD topicals, hemp cosmetics sold through licensed retail channels. 30–60% gross margin. Urban middle-class consumer segment. Growing with health literacy.'},
            {n:'Telemedicine Patient Programme',d:'Online consultation clinics for medical cannabis prescriptions. Mobile-money payment. Home delivery via Licence 07 GDP transport. Subscription patient management model. Mirrors Australian and South African digital-access models.'},
            {n:'Licensed Chemical Seller Network',d:'Ghana has 9,000+ LCS shops serving rural and peri-urban communities. OTC hemp foods and topicals via LCS network dramatically expands consumer reach beyond urban pharmacies to underserved populations.'},
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
          {n:'Pharmaceutical Dispensing',icon:'💊',d:'CBD-based medicine prescriptions for approved indications. 30–40% pharmacy margin. Superintendent pharmacist required.'},
          {n:'Hemp Wellness Retail',icon:'🌿',d:'Hemp foods, cosmetics, CBD topicals. 30–60% retail margin. Urban consumer segment growing with health literacy.'},
          {n:'Telemedicine Programme',icon:'📱',d:'Online consultations, e-prescriptions, home delivery. Mirrors Australian and South African digital-access models.'},
          {n:'LCS Network Reach',icon:'🏪',d:'9,000+ licensed chemical sellers for OTC hemp products. Dramatically expands rural and peri-urban consumer reach.'},
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
      <MobileCollapse num="§ 03" title="Ghana Fit" stat="~11,000" label="Pharmacy + LCS Outlets in Ghana">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 03</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Ghana Pharmacy &amp; Retail Landscape</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'12px',maxWidth:'700px'}}>Ghana Has More Pharmaceutical Retail Points Than Any African Cannabis-Sector Peer</h2>
      <p style={{fontFamily:F.body,fontSize:'16px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'32px',maxWidth:'700px'}}>
        With approximately 2,000 community and hospital pharmacies and over 9,000 licensed chemical seller shops nationally, Ghana has the most developed pharmaceutical retail infrastructure in West Africa. Medical cannabis can enter this system without building new dispensing infrastructure — it activates the network that already exists.
      </p>
      <div className="mob-hide" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',marginBottom:'32px'}}>
        {[
          {
            channel:'Community Pharmacies (~2,000)',tier:'PRIMARY CHANNEL',color:C.lime,
            structure:'Superintendent pharmacist required; FDA-registered; Pharmacy Council regulated',
            scope:'Prescription medicines, OTC drugs, food supplements, cosmetics',
            hemp:'Primary channel for pharmaceutical CBD prescriptions (Rx), CBD wellness supplements, hemp cosmetics. Highest compliance standard. Pharmacist counselling = patient trust.',
            note:'Pharmacist is the compliance point — exactly the Germany and Israel model for medical cannabis dispensing',
          },
          {
            channel:'Licensed Chemical Sellers (9,000+)',tier:'MASS MARKET CHANNEL',color:C.lime,
            structure:'Licensed by FDA Ghana; non-pharmacist operators; OTC medicines only',
            scope:'OTC medicines, herbal medicines, basic health products — especially in rural/peri-urban areas',
            hemp:'Channel for OTC hemp foods (hempseed oil, hemp protein, hemp hearts), hemp cosmetics, and herbal hemp preparations — if classified as food or cosmetic not requiring prescription. Dramatically extends reach beyond urban pharmacies to rural communities.',
            note:'25:1 ratio to pharmacies in rural areas — critical for national hemp consumer product reach',
          },
          {
            channel:'Hospital Pharmacies & Clinical Settings',tier:'HIGH-ACUITY CLINICAL',color:C.limeDark,
            structure:'Teaching hospitals and specialist clinics; prescribing physicians on staff',
            scope:'Scheduled medicines; specialist prescriptions; inpatient and outpatient dispensing',
            hemp:'For high-acuity medical cannabis indications: epilepsy (Dravet syndrome), oncology pain management, palliative care. Physician prescribes; hospital pharmacy dispenses under controlled protocols.',
            note:'Clinical studies and compassionate use access most likely routed through teaching hospitals initially',
          },
          {
            channel:'Health & Wellness Retail',tier:'CONSUMER MARKET',color:C.limeDark,
            structure:'Supermarkets, health food stores, wellness boutiques, e-commerce',
            scope:'Supplements, functional foods, cosmetics, wellness products',
            hemp:'Hemp seed foods (oil, protein, hearts, snack bars), hemp cosmetics and skincare. FDA food and cosmetic classification (not drug) — available in health-food stores without prescription. Growing urban wellness consumer segment.',
            note:'Ghana wellness retail already growing with imported supplements — local hemp products are a natural category',
          },
        ].map((r,i) => (
          <div key={i} style={{border:`1px solid ${C.border}`,padding:'20px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
              <div style={{fontFamily:F.display,fontSize:'14px',fontWeight:700,color:C.ink,lineHeight:1.2,paddingRight:'12px'}}>{r.channel}</div>
              <div style={{background:r.color,color:C.ink,padding:'2px 8px',fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0,whiteSpace:'nowrap'}}>{r.tier}</div>
            </div>
            {[{l:'Structure',v:r.structure},{l:'Scope',v:r.scope},{l:'Hemp fit',v:r.hemp}].map((f,j) => (
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
        {channel:'Community Pharmacies (~2,000)',tier:'PRIMARY CHANNEL',color:C.lime,structure:'Superintendent pharmacist; FDA-registered; Pharmacy Council regulated',scope:'Prescription medicines + OTC + supplements + cosmetics',hemp:'Primary channel for CBD prescriptions + hemp wellness supplements. Pharmacist counselling = trust.',note:'Germany and Israel model: pharmacist as compliance point'},
        {channel:'Licensed Chemical Sellers (9,000+)',tier:'MASS MARKET',color:C.lime,structure:'FDA Ghana licensed; non-pharmacist; OTC only',scope:'OTC medicines, herbal health products',hemp:'OTC hemp foods, hemp cosmetics, herbal hemp preparations. National reach including rural communities.',note:'25:1 ratio to pharmacies in rural areas — essential for scale'},
        {channel:'Hospital Pharmacies & Clinics',tier:'HIGH-ACUITY',color:C.limeDark,structure:'Teaching hospitals; specialist prescribers on staff',scope:'Scheduled medicines; inpatient/outpatient dispensing',hemp:'Epilepsy, oncology pain, palliative care indications. Physician prescribes; hospital pharmacy dispenses.',note:'Clinical studies most likely routed through teaching hospitals'},
        {channel:'Health & Wellness Retail',tier:'CONSUMER MARKET',color:C.limeDark,structure:'Supermarkets, health stores, wellness boutiques, e-commerce',scope:'Supplements, functional foods, cosmetics',hemp:'Hemp seed oil, protein, hearts, snack bars, hemp cosmetics as food/cosmetic not drug category.',note:'Local hemp products can displace imported supplements in growing wellness market'},
      ]} renderCard={(r,i) => (
        <div style={{border:`1px solid ${C.border}`,background:C.paper,padding:'18px',height:'100%'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'12px'}}>
            <div style={{fontFamily:F.display,fontSize:'15px',fontWeight:700,color:C.ink,lineHeight:1.2}}>{r.channel}</div>
            <div style={{background:r.color,color:C.ink,padding:'3px 8px',fontFamily:F.sans,fontSize:'7px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0,marginLeft:'8px'}}>{r.tier}</div>
          </div>
          {[{l:'Structure',v:r.structure},{l:'Hemp fit',v:r.hemp}].map((f,j) => (
            <div key={j} style={{display:'flex',gap:'8px',marginBottom:'6px'}}>
              <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.faint,minWidth:'56px',flexShrink:0,paddingTop:'2px'}}>{f.l.toUpperCase()}</span>
              <span style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.45}}>{f.v}</span>
            </div>
          ))}
          <div style={{borderTop:`2px solid ${r.color}`,paddingTop:'8px',marginTop:'10px'}}>
            <p style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint}}>{r.note}</p>
          </div>
        </div>
      )}/>
      <div style={{background:C.paperDark,padding:'24px',borderTop:`3px solid ${C.ink}`}}>
        <Eyebrow>Regulatory Requirements by Dispensing Channel</Eyebrow>
        <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'0',marginTop:'14px'}} className="tc">
          {[
            {param:'Pharmaceutical (Rx CBD)',req:'NCC Lic 11 · Ghana FDA drug reg · Pharmacy Council · superintendent pharmacist',ghana:'Pharmacy Council and FDA frameworks established; CBD drug reg pathway to be confirmed',fit:'★★★☆☆'},
            {param:'Hemp Food (OTC)',req:'Ghana FDA food registration · NCC Lic 11 · HACCP/food safety',ghana:'FDA food registration process established; hemp novel food status to confirm',fit:'★★★★☆'},
            {param:'Hemp Cosmetics (OTC)',req:'Ghana FDA cosmetics registration · NCC Lic 11',ghana:'FDA cosmetic registration process well-established',fit:'★★★★★'},
            {param:'LCS Channel',req:'OTC classification by FDA · LCS licence · NCC Lic 11',ghana:'LCS network established; hemp OTC classification needed from FDA',fit:'★★★☆☆'},
            {param:'Telemedicine',req:'Ghana Health Service telemedicine framework · NCC Lic 11 · prescribing authority',ghana:'Telemedicine regulations developing; prescribing authority for cannabis to be defined',fit:'★★☆☆☆'},
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
      n:'01',name:'Licensed Cannabis Pharmacy',tag:'PHARMACEUTICAL CHANNEL',color:C.teal,
      tagline:'Prescription CBD medicines. Superintendent pharmacist. 30–40% dispensing margin.',
      scale:'1–3 pharmacies · urban or peri-urban · Pharmacy Council registered',
      capital:'$40K–150K (pharmacy fit-out, product registration, GDP supply chain, superintendent pharmacist)',
      timeline:'18–30 months (FDA Ghana drug registration adds time)',
      revenue:'30–40% dispensing margin on prescription CBD medicines; pharmacist consultation fees',
      fit:'★★★☆☆ Highest per-unit margin — but drug registration and prescribing pathway take time',
      description:'The licensed cannabis pharmacy obtains NCC Licence 11 and dispenses FDA Ghana-registered hemp-derived pharmaceutical products under prescription from authorised physicians. The model mirrors how Germany, Israel, and South Africa have activated medical cannabis through existing pharmacy infrastructure: the pharmacist is the compliance point, the physician prescribes, and the pharmacy dispenses under controlled stock management. A superintendent pharmacist is mandatory. GDP-compliant supply from a Licence 10 wholesale distributor is required. Revenue comes from dispensing margin on prescription product and ancillary pharmacist consultation services. First-mover pharmacies establish prescriber relationships and patient trust before competitors.',
      requirements:['NCC Dispensing Licence (Licence 11)','Pharmacy Council Ghana registration — superintendent pharmacist in situ','Ghana FDA drug registration for each pharmaceutical CBD product dispensed','GDP-compliant supply chain from Licence 10 wholesale distributor or Licence 02 processor','Secure controlled-drugs cabinet and stock management for cannabis pharmaceutical products'],
      advantages:['30–40% pharmacy dispensing margin on prescription CBD products','Pharmacist credibility and counselling capability creates patient trust — critical for medical cannabis adoption','First licensed cannabis pharmacy establishes prescriber relationships that competitors cannot easily displace','Existing pharmacy fit-out infrastructure reduces capital requirement vs. greenfield build'],
      risks:['FDA Ghana pharmaceutical registration for CBD medicines is a lengthy process — 12–24 months','Prescribing authority for cannabis-based medicines needs to be defined by Ghana Health Service — currently unclear','Slow physician adoption may limit prescription volumes in early years — active prescriber education required'],
      ideal:'Existing pharmacy operators adding cannabis; pharmacist entrepreneurs; healthcare investors in pharmaceutical dispensing infrastructure',
    },
    {
      n:'02',name:'Hemp Wellness Retail Store',tag:'CONSUMER CHANNEL',color:C.forest,
      tagline:'Hemp foods, cosmetics, supplements. No prescription. 30–60% retail margin. Urban wellness market.',
      scale:'1–5 urban retail locations · health-food + wellness positioning · e-commerce',
      capital:'$20K–80K (retail fit-out, FDA product registration, initial inventory)',
      timeline:'12–18 months to first revenue',
      revenue:'30–60% gross retail margin on hemp foods, cosmetics, and supplements',
      fit:'★★★★☆ Lowest regulatory barrier for consumer products — cosmetics and food classifications available',
      description:'The hemp wellness retail store sells NCC-licensed and FDA Ghana-registered hemp consumer products — hemp seed oil, hemp protein powder, hemp hearts, hemp cosmetics and topicals, hemp-infused skincare — through a health-focused retail environment. These products are classified as foods or cosmetics (not drugs), which significantly reduces the regulatory pathway: FDA Ghana food and cosmetic registration is well-established. No prescription, no superintendent pharmacist for the OTC/food category. Target consumer is the urban wellness segment already spending on imported supplements, health foods, and natural cosmetics. Gross margins of 30–60% on curated product portfolios with strong brand storytelling.',
      requirements:['NCC Dispensing & Retail Licence (Licence 11)','Ghana FDA food registration for each hemp food product (hempseed oil, protein, hearts)','Ghana FDA cosmetics registration for each hemp cosmetic (skincare, topicals)','Supply from licensed Licence 02 processors or Licence 10 wholesale distributors','Consumer-facing marketing materials: non-psychoactive positioning, nutritional claims only (FDA-approved)'],
      advantages:['Lowest regulatory barrier in Licence 11 category — food and cosmetic registration is standard process','30–60% retail gross margin on wellness products is strong and defensible with brand differentiation','No superintendent pharmacist required for food/cosmetic classification — lower labour cost vs. pharmacy model','E-commerce channel extends reach nationally beyond physical store locations'],
      risks:['Consumer stigma around cannabis association must be actively managed through education and clear messaging','Brand differentiation required — without strong story and quality positioning, hemp products become commodity','Hemp food novel food status in Ghana needs confirmation from FDA Ghana before products can carry specific health claims'],
      ideal:'Health and wellness retail entrepreneurs; natural products retailers; diaspora investors familiar with hemp wellness category from European or US markets',
    },
    {
      n:'03',name:'Telemedicine Medical Cannabis Programme',tag:'DIGITAL HEALTH',color:C.ink,
      tagline:'Online consultation. E-prescription. Home delivery. Ghana mobile-money integration.',
      scale:'Digital platform · national patient reach · GDP-compliant courier delivery',
      capital:'$50K–200K (telemedicine platform, medical team, GDP delivery partnership, product registration)',
      timeline:'24–36 months (prescribing authority and telemedicine regulations need to be defined)',
      revenue:'Consultation fees ($20–50 per consultation); subscription patient management; dispensing margin on delivered products',
      fit:'★★☆☆☆ Highest potential reach — but regulatory framework for telemedicine cannabis prescribing needs Ghana Health Service definition',
      description:'The telemedicine medical cannabis programme replicates the Australian and South African digital access model for Ghana: patients consult authorised physicians online, receive e-prescriptions, and have products delivered to their homes via GDP-compliant licensed transport (Licence 07). Ghana has high mobile phone penetration, active mobile-money systems (MTN Mobile Money, AirtelTigo Money), and existing telemedicine initiatives in the health sector. The cannabis prescription pathway via telemedicine would make specialist medical cannabis access available nationally — not just in Accra — without requiring patients to travel to a specialist clinic. Subscription patient management (regular check-ins, adherence monitoring, refills) creates recurring revenue.',
      requirements:['NCC Dispensing Licence (Licence 11)','Ghana Health Service approval for telemedicine cannabis prescribing — separate regulatory process from NCC','Authorised physician network for cannabis medicine consultations — registered with Ghana Medical and Dental Council','GDP-compliant home delivery partnership with Licence 07 transport operator','Telemedicine platform: patient registration, consultation, e-prescription, mobile-money payment, delivery tracking'],
      advantages:['National reach — patients in all regions can access medical cannabis without travelling to Accra specialist clinic','Mobile-money integration — MTN MoMo and AirtelTigo Money enable frictionless payment for consultations and product delivery','Subscription model creates recurring revenue from managed patient base','Ghana telemedicine regulatory framework is developing — early mover can shape the cannabis telemedicine standards'],
      risks:['Ghana Health Service prescribing authority for cannabis via telemedicine has not yet been defined — significant regulatory uncertainty','Telemedicine regulation in Ghana is still maturing; cannabis adds a controlled-substance complexity layer','Patient data privacy and security obligations in telemedicine context are demanding — technical investment required'],
      ideal:'Digital health investors; telemedicine platform operators; health-tech entrepreneurs with existing Ghana Health Service relationships',
    },
    {
      n:'04',name:'Integrated Cannabis Wellness Centre',tag:'FULL SPECTRUM',color:C.limeDark,
      tagline:'Clinic + pharmacy + retail. Holistic wellness. Medical and consumer in one location.',
      scale:'1–3 centres · urban · integrated clinical and retail footprint',
      capital:'$80K–300K (clinic + pharmacy + retail fit-out; medical staff; full product registration)',
      timeline:'24–36 months to full operation',
      revenue:'Consultation fees + dispensing margin + retail margin; blended 35–50% gross on revenue mix',
      fit:'★★★☆☆ Highest revenue per customer — full-spectrum model captures all Licence 11 revenue streams',
      description:'The integrated cannabis wellness centre combines a licensed cannabis pharmacy (prescription dispensing), a hemp wellness retail shop (OTC foods and cosmetics), and a consultation clinic (cannabis medicine consultations and prescription issuance) under one roof. This is the model emerging in Australia and Germany — specialist cannabis clinics that integrate prescribing and dispensing. For Ghana, it creates a single destination for patients seeking medical cannabis (prescription consultation + pharmacy dispensing) and consumers seeking hemp wellness products (retail). The integrated model captures all revenue streams: consultation fees, pharmaceutical dispensing margin, and retail margin. Highest per-customer revenue but highest capital and operational complexity.',
      requirements:['NCC Dispensing Licence (Licence 11)','Pharmacy Council registration — superintendent pharmacist for pharmaceutical dispensing component','Authorised physician for cannabis prescription consultations','Ghana FDA: drug registration (pharmaceutical), food registration (hemp foods), cosmetics registration (hemp skincare)','GDP supply chain from Licence 10 distributor; retail supply from Licence 10 distributor or directly from Licence 02 processor'],
      advantages:['Highest revenue per customer in the Licence 11 category','One-stop destination for both medical and consumer hemp needs builds strongest patient/customer loyalty','Integrated model captures prescription, consultation, retail, and repeat dispensing revenue streams','Most differentiated market position — competitors must build equivalent integrated capability to compete'],
      risks:['Most operationally complex model — requires medical, pharmaceutical, and retail expertise simultaneously','Highest staff cost: authorised physician + superintendent pharmacist + retail staff minimum viable team','Capital intensive vs. single-channel models — $80K–300K before first revenue'],
      ideal:'Healthcare entrepreneurs with multi-disciplinary management capability; medical group investors; operators combining existing pharmacy and clinic infrastructure',
    },
  ];
  const m = models[active];
  return (
    <div id="s04" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <MobileCollapse num="§ 04" title="Business Models" stat="4 Models" label="$20K to $300K Entry">
        <SectionRule/>
        <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
          <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 04</span>
          <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Business Models</span>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>Four Dispensing Business Models — from Pharmacy to Integrated Wellness Centre</h2>
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
      <MobileCollapse num="§ 05" title="Unit Economics" stat="30–60%" label="Retail Gross Margin">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 05</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Unit Economics</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'12px',maxWidth:'680px'}}>What Dispensing and Retail Revenue Looks Like — from OTC Cosmetics to Prescription Medicines</h2>
      <p style={{fontFamily:F.body,fontSize:'15px',fontWeight:300,lineHeight:1.85,color:C.ink,marginBottom:'36px',maxWidth:'700px'}}>
        Dispensing economics are driven by product mix, channel, and customer volume. OTC hemp cosmetics carry the highest retail margins. Pharmaceutical prescription dispensing carries the highest per-patient value. The integrated model blends both for the strongest per-location revenue.
      </p>
      <div style={{background:C.paperDark,padding:'28px',marginBottom:'32px'}}>
        <Eyebrow>Gross Margin by Product Category and Channel</Eyebrow>
        <div style={{marginTop:'18px'}}>
          {[
            {label:'Hemp cosmetics / topicals (OTC — retail)',v:85,max:100,note:'40–60% gross margin — cosmetics typically have highest retail margin in the portfolio'},
            {label:'Hemp food supplements (OTC — retail)',v:70,max:100,note:'30–50% gross margin — wellness supplements at health-food pricing'},
            {label:'Hemp seed foods (hemp hearts, oil, protein)',v:50,max:100,note:'20–35% gross margin — functional food category; volume dependent'},
            {label:'Pharmaceutical CBD (prescription — pharmacy)',v:75,max:100,note:'30–40% dispensing margin — controlled by Pharmacy Council price schedule'},
          ].map((s,i) => (
            <div key={i} style={{marginBottom:'14px'}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px',flexWrap:'wrap',gap:'6px'}}>
                <div>
                  <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{s.label}</span>
                  <span style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,marginLeft:'10px'}}>{s.note}</span>
                </div>
              </div>
              <div style={{height:'16px',background:C.border,position:'relative'}}>
                <div style={{position:'absolute',left:0,top:0,height:'100%',width:`${s.v}%`,background:i===0?C.lime:i===3?C.limeDark:C.forest}}/>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',marginBottom:'32px'}} className="tc">
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Revenue Scenarios by Dispensing Model</div>
          {[
            {item:'Hemp wellness store (Year 1: 100 monthly customers)',range:'$15K–35K/mo',pct:'Entry',note:'100 customers × GH₵ 200–500 average basket × 30–50% margin'},
            {item:'Hemp wellness store (Year 2: 300 monthly customers)',range:'$45K–100K/mo',pct:'Growth',note:'Growing repeat customer base; expanded SKU range'},
            {item:'Cannabis pharmacy (50 Rx patients/month)',range:'$10K–25K/mo',pct:'Pharmacy launch',note:'50 patients × monthly GH₵ 300–800 prescription value × 35% dispensing margin'},
            {item:'Cannabis pharmacy (200 Rx patients/month)',range:'$40K–100K/mo',pct:'Pharmacy mature',note:'200 patients at steady-state prescription volume + OTC supplements'},
            {item:'Integrated wellness centre (retail + pharmacy)',range:'$60K–150K/mo',pct:'Integrated model',note:'Blended revenue from consultation fees + dispensing + retail'},
            {item:'Telemedicine programme (500 patients national)',range:'$20K–60K/mo',pct:'Digital scale',note:'Consultation fees + delivery dispensing margin from national patient base'},
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
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Operating Cost Structure — Hemp Wellness Store</div>
          <div style={{background:C.ink,padding:'20px',marginBottom:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>Monthly Operating Costs — Single Retail Location</div>
            {[
              {scale:'Premises lease (urban commercial)', capex:'$1,500–5,000/mo', note:'Location quality drives customer traffic — do not compromise on visibility'},
              {scale:'Staff (2–3 retail + 1 manager)', capex:'$2,000–6,000/mo', note:'Product knowledge and customer education are critical differentiators'},
              {scale:'Inventory working capital', capex:'$5,000–20,000/mo', note:'Hemp consumer products: fast turnover; 30–60 day inventory cycle'},
              {scale:'Marketing + consumer education', capex:'$500–2,000/mo', note:'Stigma management requires active education investment — especially in first 2 years'},
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
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.7,color:C.ink,marginBottom:'10px'}}>A hemp wellness store with $10K–15K monthly operating costs and 40% average gross margin needs $25K–40K monthly revenue to break even — approximately 80–150 customers per month at average basket of GH₵ 400–600. Typically achievable within <strong>12–18 months</strong> with strong consumer education and location selection.</p>
            <div style={{borderLeft:`2px solid ${C.lime}`,paddingLeft:'10px'}}>
              <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.forest,lineHeight:1.6}}>✓ Consumer hemp retail has the fastest path to revenue in Licence 11. Hemp cosmetics and food products can be sold with food/cosmetic FDA registration — no prescription, no pharmacist, no lengthy drug registration.</p>
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
    {num:'01',name:'Cultivation',pos:'UPSTREAM',color:C.teal,rel:'BIOMASS'},
    {num:'02',name:'Processing',pos:'MID-CHAIN',color:C.forest,rel:'PROCESSED GOODS'},
    {num:'10',name:'Wholesale',pos:'MID-CHAIN',color:C.forest,rel:'DISTRIBUTES TO'},
    {num:'07',name:'Transport',pos:'ENABLING',color:C.limeDark,rel:'DELIVERS'},
    {num:'05',name:'Testing Lab',pos:'ENABLING',color:C.limeDark,rel:'CERTIFIES'},
    {num:'11',name:'Dispensing',pos:'DOWNSTREAM',color:C.lime,rel:null,active:true},
    {num:'04',name:'R&D',pos:'SPECIALIST',color:C.teal,rel:'CLINICAL DATA'},
    {num:'06',name:'Storage',pos:'ENABLING',color:C.limeDark,rel:'HOLDS STOCK'},
    {num:'03',name:'Breeding & Seed',pos:'UPSTREAM',color:C.teal,rel:'PROVIDES VARIETY'},
    {num:'08',name:'Import',pos:'TRADE',color:C.teal,rel:'ENABLES PRODUCT'},
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
      <MobileCollapse num="§ 06" title="Value Chain" stat="Final Mile" label="Where All Value Is Delivered">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 06</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Value Chain Position</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>The Patient-Facing End — Where the Value Chain Delivers Its Social Mandate</h2>
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
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>What Dispensing Receives (Supply Chain)</div>
          {[
            {lic:'Licence 10 — Wholesale & Distribution',role:'Primary supply partner: delivers medicinal cannabis products, hemp foods, and cosmetics to dispensing outlets. GDP-compliant supply chain for pharmaceutical products.'},
            {lic:'Licence 02 — Processing',role:'Products dispensed originate from processing: CBD oils, standardised extracts, hemp food ingredients, hemp cosmetics.'},
            {lic:'Licence 05 — Testing Lab',role:'COA certification for every dispensed product lot. Pharmacist reviews COA before dispensing prescription product.'},
            {lic:'Licence 07 — Transport',role:'GDP-compliant licensed transport for home delivery in telemedicine model. Prescription delivery under Pharmacy Council oversight.'},
          ].map((r,i) => (
            <div key={i} style={{padding:'10px 0',borderBottom:`1px solid ${C.border}`}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,marginBottom:'3px'}}>{r.lic}</div>
              <p style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.6}}>{r.role}</p>
            </div>
          ))}
        </div>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>What Dispensing Delivers (Downstream)</div>
          {[
            {lic:'Patients (Medical Cannabis)',role:'Licensed cannabis pharmacies dispense prescription CBD medicines to patients with approved indications — epilepsy, chronic pain, spasticity. Direct health impact.'},
            {lic:'Consumers (Hemp Wellness)',role:'Hemp wellness retail outlets deliver hemp foods, cosmetics, and supplements to health-conscious consumers. Non-prescription; FDA food/cosmetic classification.'},
            {lic:'Clinical Research (R&D)',role:'Licensed dispensaries and pharmacy data on patient outcomes, adverse events, and product performance feeds back into Licence 04 R&D programmes.'},
            {lic:'NHIS Integration Potential',role:'Future pathway: Ghana National Health Insurance Scheme coverage for approved CBD medicines could dramatically expand patient access and dispensary volumes.'},
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
      <MobileCollapse num="§ 07" title="Competition" stat="★★★★★" label="Ghana Pharmacy Infrastructure">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 07</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Competitive Landscape</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>Ghana vs. Seven African Peers — Medical Cannabis Patient Access Models</h2>
      {/* Desktop table */}
      <div className="mob-hide" style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',minWidth:'680px'}}>
          <thead>
            <tr style={{background:C.ink}}>
              {['Country','Status','Dispensing Model','Pharmacy Network','Patient Access','Framework','BRIDGE View'].map((h,i) => (
                <th key={i} style={{padding:'10px 12px',fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,0.35)',textAlign:'left',borderRight:i<6?`1px solid rgba(255,255,255,0.05)`:'none'}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {country:'🇬🇭 Ghana',status:'Active 2026',aFit:'★★★★★ — 2,000 pharmacies, 9,000+ LCS',port:'★★★★★ — pharmacy framework established',labour:'★★☆☆☆ — prescribing pathway TBD',fw:'★★★☆☆ — NCC L.I. 2475',view:'Most advanced pharmaceutical retail infrastructure in West Africa — largest LCS network, active Pharmacy Council, FDA Ghana',hl:true},
              {country:'🇿🇦 South Africa',status:'Active 2023',aFit:'★★★★☆ — Section 21 + private clinics',port:'★★★★☆ — 2,800+ pharmacies',labour:'★★★★☆ — active patient access',fw:'★★★★★',view:'Most developed medical cannabis dispensing in Africa; private clinics and Section 21 pharmacy dispensing active'},
              {country:'🇩🇪 Germany (benchmark)',status:'Active 2017',aFit:'★★★★★ — full pharmacy dispensing',port:'★★★★★',labour:'★★★★★ — insurance coverage for some',fw:'★★★★★',view:'Best practice pharmacy dispensing model; insurance reimbursement; highest patient access — benchmark for Ghana to follow'},
              {country:'🇱🇸 Lesotho',status:'Active 2017',aFit:'★★☆☆☆ — export focus, not patient access',port:'★★☆☆☆ — limited pharmacy network',labour:'★★☆☆☆ — limited domestic patient access',fw:'★★★★★',view:'Export-focused; domestic patient access infrastructure is weak; contrasts with Ghana domestic dispensing opportunity'},
              {country:'🇲🇦 Morocco',status:'Recent 2021',aFit:'★★★☆☆ — Pharmacy network developing',port:'★★★★☆ — EU pharmacy links',labour:'★★★☆☆ — developing framework',fw:'★★★☆☆',view:'Pharmacy network exists; EU proximity helps for GMP product access; domestic dispensing framework developing'},
              {country:'🇿🇼 Zimbabwe',status:'Active 2022',aFit:'★★☆☆☆ — limited pharmacy',port:'★★★☆☆ — some private sector',labour:'★★☆☆☆',fw:'★★★☆☆',view:'Export-focused production; limited domestic patient dispensing infrastructure'},
              {country:'🇰🇪 Kenya',status:'Emerging 2023',aFit:'★★☆☆☆ — building framework',port:'★★★☆☆ — pharmacy network',labour:'★★☆☆☆',fw:'★★☆☆☆',view:'Nairobi pharmacy network present; framework incomplete; telemedicine active sector'},
              {country:'🇲🇼 Malawi',status:'Active 2020',aFit:'★☆☆☆☆ — very limited',port:'★★☆☆☆',labour:'★★☆☆☆',fw:'★★☆☆☆',view:'Minimal domestic dispensing infrastructure; cultivation export focused'},
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
        {country:'🇬🇭 Ghana',status:'Active 2026',aFit:'★★★★★ — 2,000 pharma + 9,000 LCS',port:'★★★★★ — Pharmacy Council active',labour:'★★☆☆☆ — prescribing TBD',fw:'★★★☆☆',view:'Most advanced pharma retail in West Africa + LCS network for rural reach.',hl:true},
        {country:'🇿🇦 South Africa',status:'Active 2023',aFit:'★★★★☆ — Section 21 + clinics',port:'★★★★☆ — 2,800+ pharmacies',labour:'★★★★☆ — active patients',fw:'★★★★★',view:'Most developed medical cannabis access in Africa; private clinics + pharmacy dispensing active'},
        {country:'🇩🇪 Germany (benchmark)',status:'Active 2017',aFit:'★★★★★ — full pharmacy',port:'★★★★★',labour:'★★★★★ — insurance coverage',fw:'★★★★★',view:'Best practice — full pharmacy dispensing + insurance coverage; benchmark for Ghana'},
        {country:'🇲🇦 Morocco',status:'Recent 2021',aFit:'★★★☆☆ — pharmacy developing',port:'★★★★☆ — EU links',labour:'★★★☆☆',fw:'★★★☆☆',view:'Pharmacy network exists; EU proximity; domestic dispensing developing'},
        {country:'🇱🇸 Lesotho',status:'Active 2017',aFit:'★★☆☆☆ — export focused',port:'★★☆☆☆ — limited pharma network',labour:'★★☆☆☆',fw:'★★★★★',view:'Export focused; weak domestic patient access infrastructure'},
        {country:'🇰🇪 Kenya',status:'Emerging 2023',aFit:'★★☆☆☆ — building',port:'★★★☆☆ — Nairobi pharmacy',labour:'★★☆☆☆',fw:'★★☆☆☆',view:'Nairobi pharmacy network; framework incomplete; telemedicine active'},
        {country:'🇿🇼 Zimbabwe',status:'Active 2022',aFit:'★★☆☆☆ — limited',port:'★★★☆☆',labour:'★★☆☆☆',fw:'★★★☆☆',view:'Export focus; limited domestic dispensing infrastructure'},
        {country:'🇲🇼 Malawi',status:'Active 2020',aFit:'★☆☆☆☆ — very limited',port:'★★☆☆☆',labour:'★★☆☆☆',fw:'★★☆☆☆',view:'Minimal domestic dispensing; cultivation export focused'},
      ]}/>
      <PullQuote>
        Germany showed how to scale medical cannabis patient access through community pharmacies. Israel showed how specialist dispensing systems can achieve high patient numbers. Ghana has 11,000 pharmacy and LCS dispensing points — more than any other African cannabis market. The dispensing infrastructure is already built. Licence 11 activates it.
      </PullQuote>
      <div style={{background:C.paperDark,padding:'20px',marginTop:'8px'}}>
        <Eyebrow>Ghana Dispensing Structural Advantages</Eyebrow>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'0',marginTop:'14px'}} className="tc3">
          {[
            {title:'Pharmacy and LCS Network',body:'Ghana has ~2,000 pharmacies and 9,000+ licensed chemical seller shops — more pharmaceutical retail points than any African cannabis-sector peer. Medical cannabis can enter this system without building new dispensing infrastructure. Rural access via LCS is unmatched by any comparable market.'},
            {title:'Pharmacy Council and FDA Ghana',body:'Ghana has an active Pharmacy Council, a functional FDA Ghana drug and food registration system, and established pharmaceutical retail standards. The compliance infrastructure for dispensing already exists — cannabis adds a new product category to an established framework.'},
            {title:'Urban Wellness Consumer Demand',body:'Ghana urban middle class spending on wellness products is growing rapidly — imported supplements, herbal medicines, and natural cosmetics are active categories. Local hemp wellness products can displace imported equivalents at lower cost, with a local origin and sustainability narrative. The consumer demand is there, waiting for the product.'},
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
      <MobileCollapse num="§ 08" title="Regulatory Roadmap" stat="5 Phases" label="to First Dispensed Product">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 08</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Regulatory Roadmap</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>From NCC Application to First Hemp Product Dispensed</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px'}} className="tc mob-hide">
        <div>
          {[
            {phase:'Phase 1',label:'NCC Licence + Product Registration Planning (Months 1–4)',steps:['Submit NCC Dispensing & Retail Licence (Licence 11) application — specify product categories (pharmaceutical, food, cosmetic) and channel (pharmacy, retail, online)','Determine product registration pathway for each product to be dispensed: drug (Ghana FDA drug registration), food (Ghana FDA food registration), or cosmetic (Ghana FDA cosmetics registration)','Identify and engage superintendent pharmacist if pharmaceutical channel is included — Pharmacy Council registration required','Secure premises: pharmacy-compliant fit-out for pharmaceutical channel; health-food retail for consumer wellness channel','Identify supply chain partner: Licence 10 wholesale distributor for medical and OTC products or direct Licence 02 processor relationship'],color:C.teal},
            {phase:'Phase 2',label:'Ghana FDA Product Registration (Months 3–18)',steps:['For hemp food products: submit Ghana FDA food registration dossier — confirm hemp novel food status before product claims; registration typically 6–12 months','For hemp cosmetics: submit Ghana FDA cosmetics registration — well-established process; typically 3–6 months','For pharmaceutical CBD (prescription): submit Ghana FDA drug registration — most time-consuming pathway; 12–24 months for new drugs','Obtain NCC product approval for any product under the NCC dispensing framework — confirm which products require NCC clearance in addition to FDA registration','For all products: obtain ISO 17025 COA from NCC-approved testing lab confirming ≤0.3% THC for every product batch'],color:C.forest},
            {phase:'Phase 3',label:'Prescribing Framework and Professional Engagement (Months 2–12)',steps:['Engage Ghana Medical and Dental Council regarding prescribing authority for cannabis-based medicines — which conditions, which specialties, what training required','Engage Ghana Medical Association and relevant specialist societies (neurology for epilepsy, oncology for pain) for physician education on cannabis medicine prescribing','Engage Pharmacy Council regarding dispensing protocols, pharmacist training requirements, and controlled stock management','Community engagement and education: engage religious bodies, community groups, and media on hemp as health and agricultural product — not recreational drug','Cultural positioning: develop consistent messaging that is health and wellness-focused, not recreational cannabis-adjacent'],color:C.limeDark},
            {phase:'Phase 4',label:'Launch — Consumer Products First (Months 12–18)',steps:['Launch hemp cosmetics and food products first — fastest FDA registration, no prescription, accessible to health-food retail channel immediately','Consumer education campaign: in-store educational materials, social media (Instagram, TikTok), pharmacy staff training','Establish supply relationships with Licence 10 wholesale distributors for product replenishment, COA documentation, and GDP supply chain','Patient pilot programme (if pharmaceutical dispensing): enrol first prescribing physicians; onboard first patients under full pharmaceutical protocols','File NCC monthly dispensing reports: products dispensed by category, volume, patient/customer count'],color:C.amber},
            {phase:'Phase 5',label:'Scale and Telemedicine Integration (Months 18+)',steps:['Expand to 2–5 locations once first location reaches positive operating cash flow','Add pharmaceutical dispensing once drug registration is completed and prescribing pathway is defined','Develop telemedicine consultation capability in partnership with authorised physicians and Ghana Health Service','Engage licensed chemical seller network for OTC hemp food and cosmetic distribution beyond pharmacy channel','Annual NCC licence review; update product list as new products achieve FDA registration'],color:C.lime},
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
              {item:'NCC dispensing licence renewal',detail:'Every 3 years; product list and premises details updated'},
              {item:'Ghana FDA product registration renewal',detail:'Drug: annual; food: varies; cosmetic: varies — check per product registration conditions'},
              {item:'Pharmacy Council annual compliance',detail:'For pharmaceutical channel: superintendent pharmacist maintained; annual inspection; controlled drug stock records'},
              {item:'Monthly NCC dispensing reports',detail:'Products dispensed by category and volume; patient/customer counts; supply source licence numbers'},
              {item:'COA file maintenance',detail:'Every dispensed batch must have a current COA confirming ≤0.3% THC — retain minimum 5 years'},
              {item:'Adverse event reporting',detail:'Any adverse health event linked to hemp product — immediate report to Ghana FDA and NCC; controlled product recall protocol'},
              {item:'Staff pharmacist training records',detail:'Pharmacy Council CPD requirements for pharmaceutical channel staff; hemp product training certificates maintained'},
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
              {body:'Ghana Food and Drugs Authority (FDA)',role:'Drug, food, and cosmetics registration; import permits for pharmaceutical products; annual renewals; adverse event reporting'},
              {body:'Pharmacy Council of Ghana',role:'Pharmacy premises accreditation; superintendent pharmacist registration; dispensing protocols for controlled medicines'},
              {body:'Ghana Medical and Dental Council',role:'Physician prescribing authority for cannabis medicines — which conditions and training requirements'},
              {body:'Ghana Health Service',role:'Telemedicine framework; public health policy on medical cannabis access; NHIS integration potential'},
              {body:'National Insurance Commission',role:'Professional indemnity insurance for pharmaceutical dispensing; product liability insurance for consumer products'},
            ].map((r,i) => (
              <div key={i} style={{padding:'7px 0',borderBottom:i<4?`1px solid ${C.border}`:'none'}}>
                <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>{r.body}</div>
                <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.muted}}>{r.role}</div>
              </div>
            ))}
          </div>
          <div style={{borderLeft:`3px solid ${C.amber}`,paddingLeft:'14px',background:C.paper,padding:'14px 14px 14px 16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.amber,marginBottom:'6px'}}>Stigma and Cultural Backlash — Reputational Risk</div>
            <p style={{fontFamily:F.body,fontSize:'12px',lineHeight:1.65,color:C.ink}}>Despite NCC legalisation, public and religious stigma around cannabis is significant in Ghana. A dispensing operation perceived as promoting recreational cannabis use risks community and media backlash that can be more damaging than regulatory sanction. <strong>Invest heavily in cultural positioning from Day 1: health and wellness framing only, no recreational messaging, no cannabis iconography, engage traditional and religious leaders proactively, train all customer-facing staff on sensitive communication. The German and Israeli pharmacy model — pharmacist as trusted health professional — is the cultural template.</strong></p>
          </div>
        </div>
      </div>
      <MobPhaseAccordion phases={[
        {phase:'Phase 1',label:'NCC Licence + Product Planning (Months 1–4)',color:C.teal,steps:['Submit NCC Licence 11 application — specify product categories and channel','Determine FDA registration pathway: drug, food, or cosmetic','Identify superintendent pharmacist for pharmaceutical channel','Secure premises: pharmacy or health-food retail fit-out','Identify supply chain partner: Licence 10 distributor or Licence 02 processor']},
        {phase:'Phase 2',label:'Ghana FDA Product Registration (Months 3–18)',color:C.forest,steps:['Hemp food products: Ghana FDA food registration (6–12 months)','Hemp cosmetics: Ghana FDA cosmetics registration (3–6 months)','Pharmaceutical CBD: Ghana FDA drug registration (12–24 months)','NCC product approval confirmation for dispensing scope','ISO 17025 COA from NCC lab for every product batch']},
        {phase:'Phase 3',label:'Prescribing & Community Engagement (Months 2–12)',color:C.limeDark,steps:['Ghana Medical and Dental Council: prescribing authority for cannabis medicines','Ghana Medical Association and specialist societies: physician education','Pharmacy Council: dispensing protocols and pharmacist training','Community and religious leader engagement on hemp as health product','Cultural positioning strategy: health/wellness framing — no recreational messaging']},
        {phase:'Phase 4',label:'Launch — Consumer Products First (Months 12–18)',color:C.amber,steps:['Launch hemp cosmetics and foods first — fastest FDA, no prescription needed','Consumer education campaign: in-store materials, social media, staff training','Establish Licence 10 supply relationships with COA documentation','Patient pilot programme if pharmaceutical dispensing is ready','Monthly NCC dispensing reports']},
        {phase:'Phase 5',label:'Scale & Telemedicine (Months 18+)',color:C.lime,steps:['Expand to 2–5 locations after first location reaches positive cash flow','Add pharmaceutical dispensing once drug registration and prescribing pathway confirmed','Develop telemedicine consultation with authorised physicians','LCS network engagement for OTC hemp food and cosmetic distribution','Annual NCC licence review and product list expansion']},
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
            r:'Prescribing authority not yet defined — physicians uncertain about legal authority to prescribe cannabis medicines',
            sev:'HIGH',likelihood:'High (framework still maturing)',cat:'Regulatory',
            m:'Ghana Health Service and Ghana Medical and Dental Council have not yet published prescribing guidelines for cannabis-based medicines. Until these are published, physicians may be reluctant to prescribe even legally. Mitigation: engage Ghana Medical and Dental Council proactively during the NCC licence application period. Participate in stakeholder consultations. Advocate for clear prescribing guidelines. Launch with OTC hemp food and cosmetic products first — no prescribing authority needed — while pharmaceutical pathway is being formalised.',
          },
          {
            r:'Cultural stigma and community backlash — dispensing operation perceived as promoting recreational cannabis',
            sev:'HIGH',likelihood:'Medium',cat:'Social / Reputational',
            m:'This is the most distinctive risk in Licence 11 and the one most likely to be underestimated by operators from outside Ghana. Health and wellness framing is non-negotiable from Day 1. Traditional and religious leader engagement before launch. No cannabis leaf imagery, no green cross logos that evoke recreational dispensaries. Pharmacist-as-health-professional is the positioning template (Germany). Every staff member must be trained on sensitive communication protocols. A single media incident can damage years of trust-building.',
          },
          {
            r:'Ghana FDA product registration delays — products cannot be dispensed without registration',
            sev:'MEDIUM-HIGH',likelihood:'Medium',cat:'Regulatory',
            m:'FDA Ghana drug registration for pharmaceutical CBD can take 12–24 months. Food and cosmetic registration is faster (3–12 months) but still requires planning. Start FDA registration processes in parallel with NCC licence application — not sequentially. Launch with the fastest-to-register products (cosmetics, then foods) while pharmaceutical registration proceeds. Do not build out pharmacy dispensing infrastructure before drug registration is confirmed.',
          },
          {
            r:'Slow physician adoption — few prescriptions written despite legal framework',
            sev:'MEDIUM',likelihood:'High (Year 1–2)',cat:'Commercial',
            m:'Physician adoption of new therapeutic categories is reliably slow — studies from Germany and Israel show 12–24 months for medical cannabis prescribing to normalise after legalisation. Mitigation: active physician education programme from pre-launch. Partner with Ghana Medical Association and specialist societies on continuing medical education events. Provide GPs and specialist physicians with evidence-based clinical summaries on cannabis medicine indications. Identify 5–10 champion prescribers who believe in the therapeutic category and support their practice.',
          },
          {
            r:'Product quality incident — adverse event linked to dispensed hemp product',
            sev:'MEDIUM',likelihood:'Low (with rigorous COA management)',cat:'Quality / Liability',
            m:'Any adverse health event linked to a dispensed hemp product — even if caused by patient misuse or product contamination outside the dispensary control — will generate media attention. COA management is non-negotiable: every dispensed batch must have a current ISO 17025 COA from an NCC-approved lab. Implement lot-tracking to enable product recall if needed. Professional indemnity insurance from Day 1. Document all patient counselling.',
          },
          {
            r:'Working capital for inventory — CBD medicines have long shelf life but tied-up capital',
            sev:'LOW-MEDIUM',likelihood:'Medium',cat:'Financial',
            m:'Pharmaceutical inventory has long shelf life but high unit cost. Working capital tied in unsold inventory compounds cash flow pressure for early-stage dispensaries. Manage through minimum viable inventory levels, 45-day reorder triggers, and consignment arrangements with Licence 10 wholesale distributors where available. Consumer wellness products turn faster — prioritise products with high inventory velocity in the retail mix.',
          },
          {
            r:'Hemp food novel food status — FDA Ghana classification unclear for CBD-containing foods',
            sev:'LOW-MEDIUM',likelihood:'Medium',cat:'Regulatory',
            m:'Hemp seed oil, hemp protein, and hemp hearts are well-established as foods globally and should be classifiable under Ghana FDA food regulations. CBD-containing foods are a different category — novel food status and specific health claim rules may apply. Get advance written guidance from Ghana FDA on the classification of each product before filing the registration application. Do not assume EU or US classification automatically applies in Ghana.',
          },
          {
            r:'NHIS non-coverage — medical cannabis medicines not reimbursed',
            sev:'LOW',likelihood:'High (in early years)',cat:'Commercial',
            m:'Ghana National Health Insurance Scheme is unlikely to cover cannabis-based medicines in the near term. Patients will pay out of pocket — limiting the addressable market to urban, higher-income segments initially. Position products accordingly: premium wellness positioning is consistent with private-pay market reality. Advocate for NHIS coverage of approved indications (e.g., paediatric epilepsy) as a long-term access strategy. NHIS coverage, when it comes, will dramatically expand patient volumes.',
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
    {dim:'Market Opportunity',score:72,weight:'30%',rationale:'Ghana urban wellness consumer segment is growing; hemp foods, cosmetics, and supplements address a real demand. Medical cannabis patient demand is latent but dependent on prescribing pathway definition. Score reflects the genuine commercial opportunity tempered by the cultural navigation required and the time needed for physician adoption and patient demand to develop.'},
    {dim:'Development Impact',score:82,weight:'30%',rationale:'Highest social mandate in the value chain: patient access to medicines, consumer access to wellness products, and information about hemp as a safe agricultural and health commodity. LCS network engagement extends access to rural and peri-urban populations. Medical cannabis for paediatric epilepsy represents some of the highest direct health impact in the entire BRIDGE portfolio.'},
    {dim:'Implementation Feasibility',score:60,weight:'25%',rationale:'Ghana pharmacy and LCS infrastructure is highly capable. FDA Ghana registration processes are established. But the pharmaceutical prescribing pathway for cannabis is not yet defined, physician adoption takes time, and cultural stigma management requires sustained investment. The consumer wellness product path is more feasible than pharmaceutical dispensing in the near term.'},
    {dim:'Financial Sustainability',score:68,weight:'15%',rationale:'Hemp cosmetics and food retail margins (30–60%) are excellent and sustainable. Pharmaceutical dispensing margins (30–40%) are strong but dependent on patient volume. Consumer wellness products provide the reliable base revenue; pharmaceutical dispensing adds high-value revenue as the prescribing pathway matures. NHIS coverage, when eventually achieved, dramatically improves sustainability.'},
  ];
  return (
  <div id="s10" className="pad-section" style={{background:C.ink,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 10" title="BRIDGE Score™" stat="71/100" label="Core Tier · Downstream" onDark={true}>
      <div style={{borderTop:`6px solid ${C.paper}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'20px'}}/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 10</span>
        <Eyebrow light>BRIDGE Impact Score™</Eyebrow>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.paper,lineHeight:1.2,marginBottom:'32px',maxWidth:'680px'}}>Dispensing Scores 71/100 — Social Mandate Meets Commercial Opportunity — Cultural Navigation Required</h2>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1.4fr',gap:'40px'}} className="tc">
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'16px'}}>Composite Score</div>
          <div style={{display:'flex',alignItems:'baseline',gap:'6px',marginBottom:'4px'}}>
            <div style={{fontFamily:F.mono,fontSize:'clamp(72px,12vw,120px)',fontWeight:500,color:C.lime,lineHeight:1}}>71</div>
            <div style={{fontFamily:F.mono,fontSize:'clamp(22px,4vw,36px)',fontWeight:300,color:'rgba(184,217,53,0.3)',lineHeight:1,marginBottom:'6px'}}>/100</div>
          </div>
          <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.28)',letterSpacing:'0.5px',marginBottom:'28px'}}>Core Tier · Downstream · NCC Licence 11</div>
          <ScoreBar label="Market Opportunity  ×30%" value={72} onDark/>
          <ScoreBar label="Development Impact  ×30%" value={82} onDark/>
          <ScoreBar label="Impl. Feasibility  ×25%" value={60} onDark/>
          <ScoreBar label="Financial Sustainability  ×15%" value={68} onDark/>
          <div style={{marginTop:'20px',borderTop:`1px solid rgba(255,255,255,0.08)`,paddingTop:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(250,248,243,0.3)',marginBottom:'10px'}}>Quick Parameters</div>
            {[{l:'Entry Barrier',v:'Medium (cosmetic/food) to High (pharmaceutical Rx)'},{l:'Capital Intensity',v:'Low–Medium ($20K–300K)'},{l:'Timeline to Revenue',v:'12–18 months (OTC)'},{l:'Licence Tier',v:'Core · Downstream'}].map((p,i) => (
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
    {cat:'NCC Dispensing & Retail Licence',range:'$2K–8K',note:'Application + 3-year licence; confirm fee with NCC Cannabis Dept.'},
    {cat:'Premises lease + consumer retail fit-out',range:'$5K–30K',note:'Urban health-food retail or pharmacy premises; location quality critical'},
    {cat:'Ghana FDA product registration (per product)',range:'$500–3K/product',note:'Cosmetics: 3–6 months, $500–1K. Food: 6–12 months, $1–2K. Drug: 12–24 months, $2–5K.'},
    {cat:'Superintendent pharmacist (pharmaceutical channel)',range:'$12K–30K/yr',note:'Pharmacy Council registered; cannot be part-time for controlled substance dispensing'},
    {cat:'Initial inventory (launch SKUs)',range:'$5K–30K',note:'Hemp cosmetics and food products to launch consumer channel; sourced from Licence 10 or Licence 02'},
    {cat:'Consumer education + marketing (Year 1)',range:'$3K–15K',note:'In-store materials, social media, staff training — stigma management is not optional'},
    {cat:'Professional indemnity insurance',range:'$1K–5K/yr',note:'Pharmaceutical dispensing channel requires professional indemnity; product liability for consumer products'},
    {cat:'Staff (3–5 persons)',range:'$18K–60K/yr',note:'Retail staff, pharmacist (if Rx), manager — consumer product knowledge essential'},
    {cat:'Working capital (3–6 months pre-profitability)',range:'$10K–50K',note:'Operating costs before consumer volume reaches breakeven'},
  ];
  const SHOW_FIRST = 4;
  return (
  <div id="s11" className="pad-section" style={{background:C.paperDark,padding:'56px 64px'}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <MobileCollapse num="§ 11" title="Deployment" stat="$20K+" label="Hemp Wellness Retail Entry">
      <SectionRule/>
      <div style={{display:'flex',gap:'4px',alignItems:'center',marginBottom:'8px'}}>
        <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px'}}>§ 11</span>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.muted,marginLeft:'6px'}}>Deployment Parameters</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,38px)',fontWeight:700,color:C.ink,lineHeight:1.2,marginBottom:'28px',maxWidth:'680px'}}>What It Takes to Launch Ghana's First Licensed Cannabis Dispensing Operation</h2>
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
              {role:'Dispensary / Retail Manager',spec:'Health retail or pharmaceutical background; NCC compliance; consumer education; supplier management'},
              {role:'Superintendent Pharmacist',spec:'Mandatory for pharmaceutical channel; Pharmacy Council registered; controlled stock management; patient counselling'},
              {role:'Wellness Retail Consultant (×2)',spec:'Product knowledge: hemp nutrition, cosmetics, topicals; stigma-sensitive customer communication; education-first sales approach'},
              {role:'Marketing & Community Engagement',spec:'Ghana wellness consumer marketing; cultural positioning; social media; religious and community leader engagement'},
              {role:'Finance / Compliance Officer',spec:'FDA product registration management; NCC reporting; COA file maintenance; Pharmacy Council annual compliance'},
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
              Ghana has 11,000 pharmaceutical retail points waiting to be activated for hemp products. The first licensed cannabis dispensary opens a new product category in a market that has never had legal access to hemp wellness products. Consumer demand for natural health and wellness products is growing in Ghana's urban centres. The first mover establishes brand, supplier relationships, and consumer trust before competitors arrive.
            </p>
            <p style={{fontFamily:F.body,fontSize:'13px',fontWeight:300,color:'rgba(250,248,243,0.7)',lineHeight:1.75,marginBottom:'16px'}}>
              Start with consumer products — cosmetics and foods — for fastest time to revenue. Build toward pharmaceutical dispensing as the prescribing pathway matures. The consumer wellness foundation funds the pharmaceutical infrastructure build-out. Two markets, one licence, one investment.
            </p>
            {[
              {l:'NCC application start',v:'Now — Q2 2026'},
              {l:'First hemp cosmetic sold',v:'Q4 2026 – Q1 2027 (cosmetic FDA fastest)'},
              {l:'First hemp food product sold',v:'Q1–Q2 2027 (food FDA 6–12 months)'},
              {l:'First pharmaceutical Rx dispensed',v:'2028 (drug registration + prescribing pathway)'},
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
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(250,248,243,0.45)',letterSpacing:'0.3px'}}>Licence 11 of 11 · Ghana Cannabis Intelligence</div>
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
export default function DispensingBrief() {
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
