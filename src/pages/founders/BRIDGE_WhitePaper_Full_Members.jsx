import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   BRIDGE RESEARCH BRIEF  ·  WHITE PAPER — FULL MEMBERS EDITION
   "The Architecture of Opportunity: A Framework for Ghana's Development"
   Working Paper No. 01  ·  BRIDGE-WP-01-2025  ·  96 pages
───────────────────────────────────────────────────────────────────────── */

const C={ink:'#0D1A10',paper:'#FAF8F3',paperDark:'#F0EDE4',forest:'#1B4D3E',lime:'#B8D935',limeDark:'#8FA825',muted:'#5C6B5E',faint:'#9AAA9C',border:'#D8D4C8',red:'#A8200D',amber:'#B8730A',positive:'#1A6B2F',white:'#FFFFFF'};
const F={display:'"Playfair Display","Georgia",serif',body:'"Source Serif 4","Georgia",serif',sans:'"DM Sans","Helvetica Neue",sans-serif',mono:'"DM Mono","Courier New",monospace'};

/* ── isMobile hook ─────────────────────────────────────────────────── */
const useIsMobile=()=>{
  const[mobile,setMobile]=useState(()=>typeof window!=='undefined'&&window.innerWidth<=600);
  useEffect(()=>{
    const fn=()=>setMobile(window.innerWidth<=600);
    window.addEventListener('resize',fn,{passive:true});
    return()=>window.removeEventListener('resize',fn);
  },[]);
  return mobile;
};

/* ── Section registry ──────────────────────────────────────────────── */

const Logo=({height=28,variant='white'})=>{
  const lf=variant==='white'?'#ffffff':'#1B4D3E';
  const bs=variant==='white'?'#ffffff':'#1B4D3E';
  const bstroke=variant==='white'?'rgba(0,0,0,0.08)':'rgba(27,77,62,0.15)';
  return(
    <svg height={height} viewBox="0 0 3258.5 932.3" xmlns="http://www.w3.org/2000/svg" style={{display:'block',flexShrink:0}}>
      {/* D */}
      <path fill={lf} d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"/>
      {/* B upper */}
      <path fill={lf} stroke={bstroke} strokeWidth="0.5" strokeMiterlimit="10" d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"/>
      {/* B lower */}
      <path fill={lf} stroke={bstroke} strokeWidth="0.5" strokeMiterlimit="10" d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"/>
      {/* R — lime accent bar */}
      <rect fill="#b8d935" x="1427.4" y="17.4" width="205.2" height="145"/>
      {/* I — vertical stem */}
      <rect fill={lf} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/>
      {/* G */}
      <path fill={lf} d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"/>
      {/* E — vertical stem */}
      <rect fill={lf} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/>
      {/* E — horizontal bars (always lime) */}
      <rect fill="#b8d935" x="3083.4" y="339.5" width="175.1" height="257.7"/>
      <rect fill="#b8d935" x="3083.4" y="654.4" width="175.1" height="257.7"/>
      {/* Icon — bordered box */}
      <rect fill="none" stroke={bs} strokeWidth="80" strokeMiterlimit="10" x="40" y="40" width="843.9" height="852.3" rx="36.6" ry="36.6"/>
      {/* Icon — top diamond (lime fill, forest stroke) */}
      <polygon fill="#b8d935" stroke="#1b4d3e" strokeMiterlimit="10" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/>
      {/* Icon — mid-green layer */}
      <path fill="#74914a" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z"/>
      {/* Icon — lime bottom layer */}
      <path fill="#b8d935" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"/>
    </svg>
  );
};

const Gf=()=>(<style>{`
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{background:${C.paper};-webkit-font-smoothing:antialiased;overflow-x:hidden;}
.dc::first-letter{font-family:${F.display};font-size:4.5em;font-weight:900;float:left;line-height:0.8;margin:0.1em 0.12em 0 0;color:${C.forest};}
sup a{font-family:${F.mono};font-size:9px;color:${C.lime};vertical-align:super;margin-left:1px;text-decoration:none;cursor:pointer;border-bottom:1px solid transparent;transition:border-color 0.15s;}
sup a:hover{border-bottom:1px solid ${C.lime};}
.fn-back{font-family:${F.mono};font-size:9px;color:${C.lime};text-decoration:none;margin-left:4px;opacity:0.5;transition:opacity 0.15s;}
.fn-back:hover{opacity:1;}
@media print{.np{display:none!important;}}
/* ── Mobile tab row ── */
.mob-show{display:none;}
.pad-footer{padding:20px 80px;}
.tab-row{border-top:1px solid ${C.border};display:flex;overflow-x:auto;scrollbar-width:none;}
.tab-row::-webkit-scrollbar{display:none;}
/* ── Stat strip 2-col on mobile ── */
.stat-strip>div{flex:1 1 50%;}
/* ── Cover sidebar: shown on desktop, hidden on mobile ── */
.cover-sidebar{display:flex;}
/* ── Section padding ── */
.pad-section{padding:64px 80px;}
/* ── Pull quote font size ── */
.pq-text{font-size:20px;}
/* ── Desktop margin note sidebar ── */
.margin-note{display:block;}
/* ── Footer nav safe area ── */
.footer-nav-spacer{height:60px;}
/* ── Tablet ── */
@media(max-width:900px){
  .tc{grid-template-columns:1fr!important;}
  .hm{display:none!important;}
  .tab-row{padding:0 24px!important;}
  .pad-section{padding:48px 32px!important;}
  .cover-sidebar{display:none!important;}
}
/* ── Mobile ── */
@media(max-width:600px){
  .pad-footer{padding:16px 18px!important;}
  .tc{grid-template-columns:1fr!important;}
  .hm{display:none!important;}
  .margin-note{display:none!important;}
  .pad-section{padding:26px 16px!important;}
  .pq-text{font-size:17px!important;}
  .cover-sidebar{display:none!important;}
  .mob-hide{display:none!important;}
  .mob-show{display:block!important;}
  .mob-flex{display:flex!important;}
  .mob-full{width:100%!important;}
  /* Cover header condensed */
  .cover-header{padding:10px 16px!important;}
  /* Stat strip wraps to 2×2 */
  .stat-strip{flex-wrap:wrap!important;}
  .stat-strip>div{flex:0 0 50%!important;border-left:none!important;border-top:1px solid rgba(255,255,255,0.08)!important;}
  .stat-strip>div:nth-child(2){border-left:1px solid rgba(255,255,255,0.08)!important;}
  .stat-strip>div:nth-child(4){border-left:1px solid rgba(255,255,255,0.08)!important;}
  /* Tab row — hidden on mobile */
  .tab-row-desktop{display:none!important;}
  .topbar-inner{padding:8px 16px!important;}
  .stat-v{font-size:clamp(18px,6vw,28px)!important;}
  /* Grid collapses */
  .tier-grid{grid-template-columns:1fr!important;}
  .stack-item{flex-direction:column!important;gap:8px!important;}
  .sector-grid{grid-template-columns:repeat(3,1fr)!important;}
  .budget-grid{grid-template-columns:1fr!important;}
  .phase-grid{grid-template-columns:1fr!important;}
  .appendix-grid{grid-template-columns:1fr!important;}
  /* Section accordion */
  .sec-acc-hdr{
    display:flex!important;width:100%;background:transparent;border:none;
    border-bottom:1px solid rgba(13,26,16,0.1);padding:14px 0;cursor:pointer;
    align-items:center;justify-content:space-between;text-align:left;
  }
  .sec-acc-hdr-dark{border-bottom-color:rgba(255,255,255,0.1)!important;}
  .sec-acc-hdr-forest{border-bottom-color:rgba(255,255,255,0.15)!important;}
  .sec-acc-body{overflow:hidden;}
  /* Progressive disclosure */
  .mob-item-hidden{display:none!important;}
  .mob-toggle{
    display:flex!important;align-items:center;justify-content:space-between;
    width:100%;padding:11px 0;border:none;border-top:1px solid rgba(13,26,16,0.08);
    background:transparent;cursor:pointer;font-size:10px;font-weight:700;
    letter-spacing:1.5px;text-transform:uppercase;color:#5C6B5E;
  }
  .mob-toggle-dark{border-top-color:rgba(255,255,255,0.1)!important;color:rgba(250,248,243,0.4)!important;}
  /* Horizontal swipe carousel */
  .mob-car-wrap{display:block!important;}
  .mob-car-rail{
    display:flex!important;overflow-x:scroll;scroll-snap-type:x mandatory;
    scrollbar-width:none;-webkit-overflow-scrolling:touch;gap:10px;
    padding-bottom:2px;
  }
  .mob-car-rail::-webkit-scrollbar{display:none;}
  .mob-car-card{flex:0 0 84vw;scroll-snap-align:start;}
  .mob-car-card-sm{flex:0 0 74vw;scroll-snap-align:start;}
  .desk-only{display:none!important;}
}
`}</style>);

/* ── READING PROGRESS BAR (replaces TopBar) ─────────────────────── */
const ReadingProgressBar=({coverLogoRef,activeSection,setActiveSection,isMobile})=>{
  const[pct,setPct]=useState(0);
  const[logoVisible,setLogoVisible]=useState(false);
  const sections=['Cover','§ 1','§ 2','§ 3','§ 4','§ 5','§ 6','§ 7','§ 8','App.'];
  const ids=['cover','s1','s2','s3','s4','s5','s6','s7','s8','appendix'];

  useEffect(()=>{
    const fn=()=>{
      const doc=document.documentElement;
      const scrolled=doc.scrollTop||document.body.scrollTop;
      const total=doc.scrollHeight-doc.clientHeight;
      setPct(total>0?Math.min(100,(scrolled/total)*100):0);
      if(coverLogoRef?.current){
        setLogoVisible(coverLogoRef.current.getBoundingClientRect().bottom<0);
      }
    };
    window.addEventListener('scroll',fn,{passive:true});
    fn();
    return()=>window.removeEventListener('scroll',fn);
  },[coverLogoRef]);

  return(
    <div className="np" style={{position:'sticky',top:0,zIndex:100,background:C.paper,borderBottom:`1px solid ${C.border}`,boxShadow:'0 1px 8px rgba(0,0,0,0.06)',overflow:'hidden'}}>
      {/* Progress line — 2px lime, sits at bottom of bar */}
      <div style={{position:'absolute',bottom:0,left:0,height:'2px',width:`${pct}%`,background:C.lime,transition:'width 0.1s linear',pointerEvents:'none',zIndex:10}}/>
      {/* Main row */}
      <div className="topbar-inner" style={{padding:'10px 56px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px',minWidth:0,overflow:'hidden'}}>
          <div style={{overflow:'hidden',maxWidth:logoVisible?'200px':'0px',opacity:logoVisible?1:0,transition:'max-width 0.35s ease,opacity 0.3s ease',display:'flex',alignItems:'center',flexShrink:0}}>
            <Logo height={20} variant="dark"/>
            <div style={{width:'1px',height:'16px',background:C.border,margin:'0 10px',flexShrink:0}}/>
          </div>
          {/* Desktop label */}
          <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:C.muted,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>The Architecture of Opportunity · BRIDGE-WP-01-2025</span>
          {/* Mobile compact: reading % */}
          <span className="mob-show" style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.forest}}>{Math.round(pct)}%</span>
        </div>
        <div style={{display:'flex',gap:'10px',alignItems:'center',flexShrink:0}}>
          <span className="mob-hide" style={{fontFamily:F.mono,fontSize:'10px',color:C.lime,border:`1px solid rgba(184,217,53,0.35)`,padding:'2px 8px'}}>MEMBERS</span>
          <button onClick={()=>window.print()} style={{background:C.forest,color:C.lime,border:'none',padding:'7px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,cursor:'pointer',borderRadius:'2px'}}>PDF</button>
        </div>
      </div>
      {/* Section tab strip — hidden on mobile (bottom nav takes over) */}
      <div className="tab-row tab-row-desktop" style={{padding:'0 56px'}}>
        {sections.map((s,i)=>(
          <button key={i} onClick={()=>{document.getElementById(ids[i])?.scrollIntoView({behavior:'smooth'});setActiveSection(i);}} style={{background:'none',border:'none',borderBottom:`2px solid ${activeSection===i?C.lime:'transparent'}`,padding:'8px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:activeSection===i?700:500,color:activeSection===i?C.forest:C.muted,cursor:'pointer',whiteSpace:'nowrap',transition:'all 0.2s'}}>{s}</button>
        ))}
      </div>
    </div>
  );
};

/* ── SECTION FOOTER NAV (mobile bottom navigator) ────────────────── */
const SectionFooterNav=({activeSection,setActiveSection})=>{
  const ids=['cover','s1','s2','s3','s4','s5','s6','s7','s8','appendix'];
  const labels=['Cover','§1','§2','§3','§4','§5','§6','§7','§8','App.'];

  const goTo=(idx)=>{
    const clamped=Math.max(0,Math.min(ids.length-1,idx));
    document.getElementById(ids[clamped])?.scrollIntoView({behavior:'smooth',block:'start'});
    setActiveSection(clamped);
  };

  return(
    <div className="np" style={{position:'fixed',bottom:0,left:0,right:0,zIndex:200,background:'rgba(13,26,16,0.97)',borderTop:`1px solid rgba(184,217,53,0.15)`,backdropFilter:'blur(8px)',padding:'10px 16px',gap:'10px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
      {/* Prev */}
      <button onClick={()=>goTo(activeSection-1)} disabled={activeSection===0} style={{width:'36px',height:'36px',background:activeSection===0?'rgba(255,255,255,0.04)':'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.1)',cursor:activeSection===0?'default':'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,opacity:activeSection===0?0.3:1,transition:'all 0.2s',borderRadius:'2px'}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.lime} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      {/* Label + dots */}
      <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:'6px',minWidth:0,overflow:'hidden'}}>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.5)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:'100%'}}>
          <span style={{color:C.lime,marginRight:'6px'}}>{labels[activeSection]}</span>
        </div>
        <div style={{display:'flex',gap:'4px',alignItems:'center'}}>
          {ids.map((_,i)=>(
            <div key={i} onClick={()=>goTo(i)} style={{width:i===activeSection?'20px':'6px',height:'6px',borderRadius:'3px',background:i===activeSection?C.lime:'rgba(255,255,255,0.18)',cursor:'pointer',transition:'all 0.3s ease',flexShrink:0}}/>
          ))}
        </div>
      </div>
      {/* Next */}
      <button onClick={()=>goTo(activeSection+1)} disabled={activeSection===ids.length-1} style={{width:'36px',height:'36px',background:activeSection===ids.length-1?'rgba(255,255,255,0.04)':C.forest,border:`1px solid ${activeSection===ids.length-1?'rgba(255,255,255,0.1)':'rgba(184,217,53,0.2)'}`,cursor:activeSection===ids.length-1?'default':'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,opacity:activeSection===ids.length-1?0.3:1,transition:'all 0.2s',borderRadius:'2px'}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.lime} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  );
};

/* ── COVER ───────────────────────────────────────────────────────────── */
const Cover=({logoRef})=>(
  <div id="cover" style={{background:C.paper,minHeight:'100vh',display:'flex',flexDirection:'column',borderBottom:`1px solid ${C.border}`}}>
    <div ref={logoRef} className='cover-header' style={{background:C.forest,padding:'14px 80px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
        <Logo height={22} variant="white"/>
        <div style={{width:'1px',height:'18px',background:'rgba(255,255,255,0.2)'}}/>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.5)'}}>BRIDGE Research Series</span>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
        <span className='mob-hide' style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(255,255,255,0.3)'}}>BRIDGE-WP-01-2025</span>
        <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.lime,border:`1px solid rgba(184,217,53,0.35)`,padding:'2px 8px',letterSpacing:'1px'}}>MEMBERS EDITION · 96pp</span>
      </div>
    </div>
    <div style={{height:'3px',background:C.lime}}/>
    <div style={{flex:1,display:'grid',gridTemplateColumns:'1fr 340px',gap:'0'}} className='tc'>
      <div className='pad-cover' style={{padding:'64px 64px 64px 80px',borderRight:`1px solid ${C.border}`,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <div>
          <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'40px'}}>
            <div style={{height:'1px',width:'32px',background:C.lime}}/>
            <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted}}>Working Paper · No. 01 · Full Edition</span>
          </div>
          <h1 style={{fontFamily:F.display,fontSize:'clamp(32px,5vw,60px)',fontWeight:900,color:C.ink,lineHeight:1.05,letterSpacing:'-2px',marginBottom:'24px'}}>The Architecture<br/><em style={{fontStyle:'italic',color:C.forest}}>of Opportunity</em></h1>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(16px,2vw,22px)',fontWeight:400,fontStyle:'italic',color:C.muted,lineHeight:1.4,marginBottom:'32px'}}>A Framework for Ghana's Integrated Development — Diagnosis, Architecture, and a Path to Peace &amp; Prosperity</h2>
          <div style={{background:C.paperDark,padding:'20px 24px',borderLeft:`4px solid ${C.lime}`,marginBottom:'32px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Abstract</div>
            <p style={{fontFamily:F.body,fontSize:'13px',lineHeight:1.8,color:C.ink,fontWeight:300}}>This paper presents BRIDGE PBC's foundational framework for Ghana's integrated development. Drawing on assessment of 174+ ventures across 12 economic sectors, and analysis of structural constraints affecting 33 million Ghanaians, it proposes a model that connects diaspora capital, institutional reform, and on-the-ground delivery into a single coherent architecture. The central argument: Ghana's development gap is not a resource shortage. It is a coordination and intelligence failure — and it is solvable.</p>
            <p style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.muted,marginTop:'8px'}}>Keywords: development finance, Ghana, diaspora capital, BRIDGE Impact Score™, institutional capacity, alignment gap, blended finance</p>
          </div>
          <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'20px',marginBottom:'32px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.faint,marginBottom:'12px'}}>Research &amp; Analysis</div>
            <div style={{display:'flex',gap:'32px',flexWrap:'wrap'}}>
              {[{name:'BRIDGE Analytics Team',role:'Primary Research',aff:'BRIDGE PBC, Accra'},{name:'Joseph A.',role:'Strategic Review',aff:'BRIDGE PBC'}].map((a,i)=>(
                <div key={i}>
                  <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.ink}}>{a.name}</div>
                  <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted}}>{a.role}</div>
                  <div style={{fontFamily:F.mono,fontSize:'10px',color:C.faint}}>{a.aff}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{marginTop:'32px',borderTop:`1px solid ${C.border}`,paddingTop:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.faint,marginBottom:'6px'}}>Suggested Citation</div>
            <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,lineHeight:1.6}}>BRIDGE Analytics Team (2025). <em>The Architecture of Opportunity: A Framework for Ghana's Integrated Development</em>. BRIDGE PBC Working Paper No. 01. Accra: BRIDGE PBC.</p>
          </div>
          {/* Mobile-only compact ToC */}
          <div className='mob-show' style={{marginTop:'24px',paddingTop:'20px',borderTop:`1px solid ${C.border}`}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.faint,marginBottom:'10px'}}>Contents</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0',border:`1px solid ${C.border}`}}>
              {['§1 Introduction','§2 Thesis','§3 Score','§4 Sectors','§5 Capital','§6 Diaspora','§7 Government','§8 Conclusions'].map((s,i)=>(
                <div key={i} onClick={()=>document.getElementById(['s1','s2','s3','s4','s5','s6','s7','s8'][i])?.scrollIntoView({behavior:'smooth'})} style={{padding:'8px 10px',borderBottom:`1px solid ${C.border}`,borderRight:i%2===0?`1px solid ${C.border}`:'none',fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:C.forest,cursor:'pointer'}}>{s}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='cover-sidebar' style={{padding:'40px 32px',background:C.paperDark,display:'flex',flexDirection:'column',gap:'0'}}>
        <div style={{marginBottom:'28px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px',borderBottom:`1px solid ${C.border}`,paddingBottom:'6px'}}>Document Info</div>
          {[{l:'Series',v:'Working Paper'},{l:'Number',v:'BRIDGE-WP-01-2025'},{l:'Published',v:'2025'},{l:'Pages',v:'96 pages'},{l:'Language',v:'English'},{l:'Access',v:'Members Edition'}].map((d,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:`1px solid ${C.border}`}}>
              <span style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>{d.l}</span>
              <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,textAlign:'right',maxWidth:'60%'}}>{d.v}</span>
            </div>
          ))}
        </div>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px',borderBottom:`1px solid ${C.border}`,paddingBottom:'6px'}}>Full Contents</div>
          {[
            {n:'Abstract',pg:'02',pub:true},
            {n:'1. Introduction & Motivation',pg:'04',pub:true},
            {n:'2. The Alignment Gap Thesis',pg:'08',pub:true},
            {n:'3. BRIDGE Impact Score™ Methodology',pg:'16',pub:true},
            {n:'4. Sector-by-Sector Analysis',pg:'24',pub:true},
            {n:'5. Capital Architecture & Deployment',pg:'48',pub:true},
            {n:'6. Diaspora Integration Model',pg:'62',pub:true},
            {n:'7. Government Partnership Framework',pg:'72',pub:true},
            {n:'8. Conclusions & Recommendations',pg:'84',pub:true},
            {n:'References & Appendices',pg:'90',pub:true}
          ].map((c,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'7px 0',borderBottom:`1px solid ${C.border}`}}>
              <div style={{display:'flex',alignItems:'center',gap:'6px',flex:1}}>
                <div style={{width:'6px',height:'6px',borderRadius:'50%',background:C.lime,flexShrink:0}}/>
                <span style={{fontFamily:F.sans,fontSize:'11px',color:C.ink,fontWeight:600}}>{c.n}</span>
              </div>
              <span style={{fontFamily:F.mono,fontSize:'10px',color:C.faint,paddingLeft:'8px'}}>{c.pg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div style={{height:'3px',background:C.lime}}/>
  </div>
);

/* ── SECTION MARKER helper ─────────────────────────────────────────── */
const SM=({sec,label})=>(
  <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}>
    <div style={{height:'1px',width:'24px',background:C.border}}/>
    <span style={{fontFamily:F.mono,fontSize:'9px',color:C.faint,fontStyle:'italic'}}>{sec}</span>
    <div style={{width:'6px',height:'6px',background:C.lime,borderRadius:'50%'}}/>
    <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted}}>{label}</span>
  </div>
);

/* ── PULL QUOTE helper ──────────────────────────────────────────────── */
const PQ=({quote,attr})=>(
  <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'24px',margin:'32px 0'}}>
    <p className='pq-text' style={{fontFamily:F.display,fontSize:'20px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.5}}>{quote}</p>
    {attr&&<div style={{marginTop:'10px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.muted,letterSpacing:'1px',textTransform:'uppercase'}}>— {attr}</div>}
  </div>
);

/* ── STAT STRIP helper ──────────────────────────────────────────────── */
const StatStrip=({stats,dark=false})=>(
  <div className='stat-strip' style={{display:'grid',gridTemplateColumns:`repeat(${stats.length},1fr)`,gap:'1px',margin:'32px 0',background:C.border}}>
    {stats.map((s,i)=>(
      <div key={i} style={{background:dark?C.ink:C.paperDark,padding:'20px 16px',textAlign:'center'}}>
        <div className='stat-v' style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,36px)',fontWeight:900,color:dark?C.lime:C.forest,lineHeight:1}}>{s.v}</div>
        <div style={{fontFamily:F.sans,fontSize:'10px',color:dark?'rgba(255,255,255,0.5)':C.muted,marginTop:'6px',lineHeight:1.4}}>{s.l}</div>
      </div>
    ))}
  </div>
);

/* ── FOOTNOTES helper ──────────────────────────────────────────────── */
const FN=({notes,sec='fn'})=>(
  <div style={{borderTop:`1px solid ${C.border}`,marginTop:'40px',paddingTop:'16px'}}>
    <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.faint,marginBottom:'10px'}}>Notes</div>
    {notes.map((fn,i)=>(
      <div key={i} id={`${sec}-note-${i+1}`} style={{display:'flex',gap:'10px',marginBottom:'8px',alignItems:'flex-start',scrollMarginTop:'120px'}}>
        <span style={{fontFamily:F.mono,fontSize:'10px',color:C.lime,flexShrink:0,paddingTop:'2px'}}>{i+1}.</span>
        <span style={{fontFamily:F.body,fontSize:'11px',color:C.faint,lineHeight:1.6}}>{fn}<a href={`#${sec}-ref-${i+1}`} className="fn-back" title="Back to text">↑</a></span>
      </div>
    ))}
  </div>
);

/* ── §1 INTRODUCTION ───────────────────────────────────────────────── */
const S1=()=>{
  const[s1Open,setS1Open]=useState(true);
  return(
  <div id="s1" className="pad-section" style={{background:C.paper,borderBottom:`1px solid ${C.border}`,scrollMarginTop:"80px"}}>
    <div style={{maxWidth:'900px',margin:'0 auto',display:'grid',gridTemplateColumns:'2fr 1fr',gap:'56px'}} className="tc">
      <div>
        <SM sec="§1" label="Introduction & Motivation"/>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(24px,3.5vw,40px)',fontWeight:900,color:C.ink,lineHeight:1.1,letterSpacing:'-1px',marginBottom:'32px'}}>The problem has never been potential. It has always been coordination.</h2>
        <p className="dc" style={{fontFamily:F.body,fontSize:'16px',lineHeight:1.9,color:C.ink,fontWeight:300,marginBottom:'18px'}}>Ghana presents a paradox. A country with robust democratic institutions,<sup id="s1-ref-1"><a href="#s1-note-1">1</a></sup> a rapidly expanding middle class, and a diaspora of three million people generating upwards of $6.65 billion in annual remittances — yet where 40% of adults remain outside formal financial systems and 56% of trained doctors practice abroad.<sup id="s1-ref-2"><a href="#s1-note-2">2</a></sup></p>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>Conventional development frameworks attribute this to resource scarcity: insufficient capital, inadequate infrastructure, weak governance. This paper argues the diagnosis is wrong. The constraints are primarily informational and coordinative — a systematic failure to route existing resources, talent, and energy to their highest-impact applications.</p>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>The BRIDGE framework proposes a different model. Rather than identifying new sources of capital, it proposes an intelligence infrastructure that makes existing capital — diaspora savings, DFI commitments, government budgets, private equity — work in coordinated alignment with Ghana's genuine opportunity architecture.<sup id="s1-ref-3"><a href="#s1-note-3">3</a></sup></p>
        <PQ quote={"\u201cThe gap between Ghana\u2019s potential and its outcomes is not a funding gap. It is an intelligence gap. And intelligence gaps, unlike funding gaps, can be closed without waiting for external actors.\u201d"} attr="BRIDGE Working Paper No. 01, p.6"/>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>Ghana has conducted seven consecutive peaceful democratic transitions since 1992. It hosts a diaspora generating remittances that dwarf foreign direct investment. It has a young, entrepreneurial, highly educated population. And yet, the potential sits largely untapped — not because actors lack goodwill, but because no single institution holds the intelligence architecture to connect them effectively.</p>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>This paper proceeds in eight sections. Sections 2 and 3 develop the theoretical framework and methodology. Sections 4 through 7 apply that framework across Ghana's twelve priority sectors, generating sector-specific investment theses, risk analyses, and policy recommendations. Section 8 synthesises the findings into a concrete 36-month implementation roadmap.</p>

        <StatStrip stats={[{v:'33M',l:'Ghanaians — unit of analysis'},{v:'$6.65B',l:'Annual remittance inflows'},{v:'174+',l:'Ventures scored in database'},{v:'12',l:'Priority economic sectors'}]}/>

        {/* Mobile: collapse sub-sections behind a toggle */}
        <button className="mob-show mob-toggle" onClick={()=>setS1Open(o=>!o)} style={{marginTop:'8px'}}>
          <span>{s1Open?'Collapse ↑':'Read sub-sections: 1.1 · 1.2 · 1.3 ↓'}</span>
        </button>

        <div className={s1Open?'':'mob-item-hidden'}>
        <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'16px',marginTop:'32px'}}>1.1 Purpose, Scope, and Audience</h3>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>This working paper serves multiple audiences simultaneously. For Ghana's government, it demonstrates how the Sankofa Initiative — articulated as national priority but lacking implementation infrastructure — can be operationalized through public-private partnership. For development finance institutions, it presents a rigorous, replicable model for catalytic capital deployment in frontier markets. For the diaspora, it maps a credible pathway from passive remittance-sender to active development partner. For BRIDGE's own portfolio construction, it provides the analytical foundation for every investment decision the organization makes.</p>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>The scope is deliberately comprehensive. Single-sector analyses are insufficient when the core thesis is that Ghana’s opportunity is systemic and interconnected. A paper addressing only fintech, or only healthcare, or only infrastructure, would miss the cross-sector dynamics that amplify impact when addressed together. Poverty traps are multi-dimensional by nature; solutions that match that dimensionality are disproportionately more effective than the sum of their parts.</p>

        <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'16px',marginTop:'32px'}}>1.2 Why Ghana? Why Now?</h3>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>Ghana occupies a unique position in the landscape of African development opportunities. Its political stability, mature regulatory environment, and government receptivity to diaspora engagement make it the optimal proof-of-concept for BRIDGE's model. Success here is not just valuable for Ghana — it generates a replicable playbook for the continent.</p>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>The timing is equally critical. Ghana's completion of IMF-supported debt restructuring has restored fiscal credibility and investor confidence. The Sankofa Initiative, launched in December 2025, represents the government's formal elevation of diaspora engagement to national strategic priority — creating institutional infrastructure and policy frameworks that did not previously exist. The diaspora itself has reached a generational inflection point: first-generation emigrants are at peak earning years, second-generation professionals are achieving global prominence, and accumulated diaspora wealth stands at historic highs. The window for catalytic intervention is open now in ways it was not five years ago and may not be five years hence.</p>

        <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'16px',marginTop:'32px'}}>1.3 The Brain Drain Crisis</h3>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>Ghana has lost 3 million citizens to emigration — one in every ten Ghanaians. This exodus includes 56% of trained doctors, 24% of nurses, and disproportionate shares of engineers, scientists, teachers, and entrepreneurs. Each month, 500 additional nurses emigrate, primarily to wealthy nations experiencing staffing shortages. The direct economic cost represents $415 million annually in lost training investment and foregone productivity.</p>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>But statistics obscure the human trajectory. When youth measure success by ability to emigrate rather than contribute locally, when families celebrate departure rather than hometown achievement, when communities lose not just current capacity but future commitment to collective advancement — brain drain becomes culturally embedded. The self-reinforcing cycle erodes the very foundations of national capacity. The most ambitious leave. The most educated depart. The most entrepreneurial relocate.</p>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>The BRIDGE thesis is that this cycle is reversible — not through coercive retention policies or appeals to patriotism alone, but through the creation of economic conditions that make meaningful contribution to Ghana’s development as professionally and financially rewarding as employment abroad. Brain circulation is the goal: a two-way flow where Ghanaians abroad contribute expertise and capital to Ghana’s development while continuing to build lives wherever they are.</p>

        </div>{/* end s1 sub-sections */}
        <FN sec='s1' notes={[
          'Ghana has conducted seven consecutive peaceful democratic transitions since 1992, placing it in the top quartile of Sub-Saharan African countries on governance indicators (Afrobarometer, 2024).',
          'World Bank Financial Inclusion Database, 2024; Ghana Health Service Staff Survey, 2023. The doctor-to-patient ratio stands at approximately 1:6,000 against a WHO recommended 1:1,000.',
          'This aligns with recent literature on "development intelligence" frameworks. See Hausmann et al. (2022) on the primacy of diagnostic precision over capital mobilisation in middle-income country transitions.'
        ]}/>
      </div>

      <div className="hm">
        <div style={{position:'sticky',top:'80px',display:'flex',flexDirection:'column',gap:'24px'}}>
          <div style={{border:`1px solid ${C.border}`,padding:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Key Figures</div>
            {[{v:'3M',l:'Ghanaians in diaspora'},{v:'$6.65B+',l:'Annual remittance inflows'},{v:'40%',l:'Adults unbanked'},{v:'56%',l:'Doctors practising abroad'},{v:'1:6,000',l:'Doctor-to-patient ratio'},{v:'174+',l:'Ventures in BRIDGE database'}].map((d,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:i<5?`1px solid ${C.border}`:'none'}}>
                <span style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>{d.l}</span>
                <span style={{fontFamily:F.mono,fontSize:'12px',color:C.forest,fontWeight:500}}>{d.v}</span>
              </div>
            ))}
          </div>
          <div style={{background:C.paperDark,padding:'16px',borderLeft:`3px solid ${C.lime}`}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Continue Reading</div>
            {['§2 — Coordination Failure Thesis','§3 — BRIDGE Impact Score™','§4 — 12-Sector Analysis','§5 — Capital Architecture','§6 — Diaspora Model','§7 — Government Framework','§8 — Conclusions'].map((s,i)=>(<div key={i} style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,paddingBottom:'4px'}}>{s}</div>))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

/* ── §2 COORDINATION FAILURE THESIS ───────────────────────────────── */
const S2=()=>{
  const[s2Open,setS2Open]=useState(false);
  return(
  <div id="s2" className="pad-section" style={{background:C.paperDark,borderBottom:`1px solid ${C.border}`,scrollMarginTop:"80px"}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <SM sec="§2" label="The Coordination Failure Thesis"/>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(24px,3.5vw,40px)',fontWeight:900,color:C.ink,lineHeight:1.1,letterSpacing:'-1px',marginBottom:'32px'}}>Ghana’s opportunity is not principally about what is missing. It is about what is yet to be aligned.</h2>

      <div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:'48px'}} className="tc">
        <div>
          <p className="dc" style={{fontFamily:F.body,fontSize:'16px',lineHeight:1.9,color:C.ink,fontWeight:300,marginBottom:'18px'}}>The dominant narrative in development economics frames low-income country constraints as resource shortages: insufficient capital, inadequate infrastructure, weak institutions. This diagnosis leads to predictable prescriptions — aid flows, foreign investment, technical assistance — and predictable outcomes. Resources arrive, conditions marginally improve, the fundamental architecture remains unchanged.</p>

          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>This paper advances a different diagnosis. Ghana’s development opportunity is primarily an alignment opportunity — a systematic opening to route existing resources, talent, and institutional capacity to their highest-impact applications. Capital exists in the diaspora and awaits credible deployment vehicles. Expertise exists among Ghanaian professionals abroad and requires structured pathways to connect. Government policy articulates clear priorities and needs the operational infrastructure to execute them at scale.</p>

          <PQ quote='When three million capable, motivated, resourced Ghanaians are systematically disconnected from their country’s development, you do not have a capital problem. You have an architecture problem.' attr="BRIDGE Working Paper No. 01, §2"/>

          <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'16px',marginTop:'32px'}}>2.1 Three Alignment Gaps to Close</h3>

          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'12px'}}><strong style={{fontWeight:700}}>The Information Gap.</strong> Diaspora investors cannot accurately assess risk and return in Ghana's investment landscape. Government priorities are articulated in policy documents rarely reaching private capital. Entrepreneurs cannot access the knowledge needed to build viable ventures. The result: capital remains in foreign banks earning below-market returns; policy goes unimplemented for lack of private partners; entrepreneurs fail for want of market intelligence they could not access.</p>

          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'12px'}}><strong style={{fontWeight:700}}>The Intermediation Gap.</strong> Even when information is available, no trusted, professionally-managed vehicle exists to connect diaspora intent with local opportunity. Remittances flow person-to-person — efficient for consumption, useless for development investment. Direct investment in local businesses is fraught with governance risk, management challenges, and geographic distance. The institutional infrastructure that mediates between capital and opportunity in developed markets — investment funds, professional due diligence, portfolio management — is absent at the scale Ghana's diaspora requires.</p>

          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}><strong style={{fontWeight:700}}>The Accountability Gap.</strong> When resources do reach Ghana, measurement systems are insufficient to determine whether they are creating the intended impact. Aid projects report inputs (dollars spent, facilities built) not outcomes (lives improved, capabilities expanded). Investments report financial returns but rarely development indicators. Without credible impact measurement, the feedback loops that would improve resource allocation over time are broken. Poor programmes survive. High-impact models go unscaled.</p>

          {/* Mobile: collapse §2.2–2.5 */}
          <button className="mob-show mob-toggle" onClick={()=>setS2Open(o=>!o)} style={{marginTop:'4px'}}>
            <span>{s2Open?'Show less ↑':'Continue reading §2.2 – 2.5 ↓'}</span>
          </button>
          <div className={s2Open?'':'mob-item-hidden'}>
          <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'16px',marginTop:'32px'}}>2.2 Brain Drain as Coordination Failure</h3>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>The brain drain crisis is perhaps the clearest manifestation of coordination failure at scale. Ghana invests heavily in human capital formation — training doctors, engineers, educators, and entrepreneurs. Destination-country recruitment structures then systematically extract that human capital before it can generate returns in Ghana. The problem is not that Ghanaians choose to leave; it is that no credible mechanism exists for their expertise to generate comparable economic and professional rewards at home.</p>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>The Philippines offers an instructive counter-model. Beginning in the 1970s, the Philippine government systematically structured overseas employment as circular migration — temporary, skills-building, and connected to home through formal investment vehicles. The result: nurse emigration became nurse circulation. The Philippines now exports healthcare expertise and imports remittance capital, with substantial two-way flows of skills and investment. Ghana's trajectory could follow a similar arc with appropriate institutional architecture.</p>

          <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'16px',marginTop:'32px'}}>2.3 Diaspora Capital as Untapped Coordination Resource</h3>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>Ghana's diaspora remits $6.65–11.5 billion annually — four times larger than foreign direct investment. Yet 90% finances immediate consumption: food, rent, school fees, healthcare, emergencies. Essential for recipient families. Transformative for national development, no. Meanwhile, the diaspora holds $50+ billion in accumulated savings abroad, earning minimal returns in foreign banks while seeking meaningful investment opportunities at home.</p>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>If just 10% of annual remittances shifted from consumption to productive investment, Ghana would gain $665 million to $1.15 billion annually in development capital. If 5% of diaspora savings found productive deployment, Ghana would access $2.5+ billion — more than total annual FDI. Over a decade, this capital accumulation would transform Ghana's development trajectory. The barrier is not motivation — surveys consistently show 72% of diaspora members express interest in formal investment vehicles. The barrier is the absence of credible, professionally-managed structures through which to channel that interest.</p>

          <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'16px',marginTop:'32px'}}>2.4 The BRIDGE Thesis</h3>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>BRIDGE addresses all three alignment gaps simultaneously. It resolves the information gap through the BRIDGE Impact Score™ methodology — a systematic, reproducible framework for assessing investment opportunities across Ghana's 12 priority sectors. It resolves the intermediation gap by providing a professionally-managed, PBC-structured vehicle through which diaspora capital can reach vetted opportunities at portfolio scale. And it resolves the accountability gap through a rigorous three-tier measurement framework connecting operational performance to development indicators to ultimate Peace & Prosperity outcomes.</p>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>The model is not primarily a fund. It is an intelligence architecture — one that, once established, creates the conditions for private capital, institutional capital, and diaspora capital to coordinate around Ghana's highest-impact opportunities in a self-reinforcing cycle.</p>

          <StatStrip stats={[{v:'72%',l:'Diaspora interested in formal vehicles'},{v:'$50B+',l:'Diaspora savings seeking deployment'},{v:'90%',l:'Remittances financing consumption only'},{v:'$415M',l:'Annual cost of brain drain'}]}/>

          <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'16px',marginTop:'32px'}}>2.5 What Closing These Gaps Requires</h3>
          <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>Closing all three gaps simultaneously is precisely what BRIDGE is designed to do. No single initiative — a diaspora investment fund alone, a government policy alone, a single sector intervention alone — addresses the full architecture. What is needed is an intelligence platform that reduces information asymmetry, a professionally-managed intermediary that provides credible deployment vehicles, and a rigorous measurement system that creates the accountability loop driving continuous improvement. Section 3 introduces the BRIDGE Impact Score™, the methodological core of this platform. Sections 4 through 7 demonstrate its application across Ghana's twelve priority sectors.</p>

          </div>{/* end s2 expanded */}
          <FN sec='s2' notes={[
            'Coordination failure as development constraint: see Rodrik, D. (2008). The real exchange rate and economic growth. Brookings Papers on Economic Activity, 2008(2), 365-412.',
            'Philippines Overseas Employment Administration data, 2023. The circular migration model is documented in Semyonov, M., & Gorodzeisky, A. (2008). Labor migration, remittances and economic well-being of households in the Philippines. Population Research and Policy Review.',
            'Diaspora investment survey conducted by BRIDGE Analytics, 2024, n=847 diaspora members across US, UK, Canada, Germany, and Netherlands.'
          ]}/>
        </div>
        <div className="hm">
          <div style={{position:'sticky',top:'80px',display:'flex',flexDirection:'column',gap:'16px'}}>
            <div style={{background:C.ink,padding:'20px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.4)',marginBottom:'12px'}}>Three Gaps to Close</div>
              {['The Information Gap','The Intermediation Gap','The Accountability Gap'].map((f,i)=>(
                <div key={i} style={{display:'flex',gap:'10px',alignItems:'center',padding:'8px 0',borderBottom:i<2?`1px solid rgba(255,255,255,0.08)`:'none'}}>
                  <span style={{fontFamily:F.mono,fontSize:'10px',color:C.lime}}>{i+1}.</span>
                  <span style={{fontFamily:F.sans,fontSize:'11px',color:'rgba(255,255,255,0.7)'}}>{f}</span>
                </div>
              ))}
              <div style={{marginTop:'16px',paddingTop:'12px',borderTop:`1px solid rgba(255,255,255,0.08)`}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(255,255,255,0.4)',marginBottom:'6px'}}>BRIDGE resolves all three</div>
                <div style={{fontFamily:F.display,fontSize:'14px',fontStyle:'italic',color:C.lime}}>Intelligence architecture, not capital intermediary alone.</div>
              </div>
            </div>
            <div style={{border:`1px solid ${C.border}`,padding:'16px',background:C.paper}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Comparative Cases</div>
              {[{n:'Philippines',l:'Nurse circulation model — 40 years of brain return'},{n:'India',l:'IT diaspora capital — $100B in tech investment'},{n:'China',l:'Manufacturing knowledge transfer — returnee incentives'},{n:'Mexico',l:'3×1 remittance matching — diaspora as dev. partner'}].map((c,i)=>(
                <div key={i} style={{paddingBottom:'10px',borderBottom:i<3?`1px solid ${C.border}`:'none',marginBottom:'10px'}}>
                  <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>{c.n}</div>
                  <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,lineHeight:1.5}}>{c.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

/* ── §3 METHODOLOGY ───────────────────────────────────────────────── */
const S3=()=>(
  <div id="s3" className="pad-section" style={{background:C.paper,borderBottom:`1px solid ${C.border}`,scrollMarginTop:"80px"}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <SM sec="§3" label="BRIDGE Impact Score™ Methodology"/>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,36px)',fontWeight:900,color:C.ink,lineHeight:1.15,letterSpacing:'-1px',marginBottom:'32px'}}>A composite score. Four dimensions. Rigorous, reproducible, actionable.</h2>
      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>The BRIDGE Impact Score™ is the analytical foundation of every investment and strategic decision BRIDGE makes. It was designed to solve a specific problem: how does one compare opportunities across 12 heterogeneous sectors, ranging from fintech to agriculture to health systems, against a unified standard that honors both commercial viability and development impact? The answer is a composite methodology that is rigorous, transparent, and practically executable.</p>

      {/* Desktop: 4-col grid */}
      <div className="desk-only" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'2px',marginBottom:'40px'}}>
        {[
          {n:'Market Opportunity',w:'30%',d:'Total addressable market size, competitive density, price point accessibility, and distribution infrastructure maturity.',ex:'Financial inclusion scores high — 40% adult exclusion represents a large, accessible, underserved market.',color:C.lime},
          {n:'Development Impact',w:'30%',d:'Primary and secondary effects on Ghanaian household welfare, employment generation, supply chain integration, and community resilience.',ex:'Agriculture scores highest on development impact — directly affects 30%+ of the labour force.',color:C.lime},
          {n:'Implementation Feasibility',w:'25%',d:'Regulatory environment clarity, infrastructure dependency, management talent availability, and timeline to first positive impact.',ex:'Technology scores medium on feasibility — talent available but infrastructure dependency creates execution risk.',color:C.limeDark},
          {n:'Financial Sustainability',w:'15%',d:'Path to positive cash flow, risk-adjusted return profile, exit liquidity, and alignment with commercial capital benchmarks.',ex:'Infrastructure scores lower — longer payback periods require patient, development-oriented capital.',color:'rgba(184,215,53,0.4)'}
        ].map((d,i)=>(
          <div key={i} style={{background:C.paper,padding:'20px',borderTop:`3px solid ${d.color}`}}>
            <div style={{fontFamily:F.mono,fontSize:'10px',color:C.lime,marginBottom:'6px'}}>×{d.w}</div>
            <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:800,color:C.ink,marginBottom:'10px',lineHeight:1.3}}>{d.n}</div>
            <div style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.6,marginBottom:'12px'}}>{d.d}</div>
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'10px',fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.faint,lineHeight:1.5}}>{d.ex}</div>
          </div>
        ))}
      </div>
      {/* Mobile: swipe carousel */}
      <div className="mob-car-wrap" style={{display:'none',marginBottom:'20px'}}>
        <div className="mob-car-rail">
          {[
            {n:'Market Opportunity',w:'30%',d:'Total addressable market size, competitive density, price point accessibility, and distribution infrastructure maturity.',ex:'Financial inclusion scores high — 40% adult exclusion is a large, underserved market.',color:C.lime},
            {n:'Development Impact',w:'30%',d:'Primary and secondary effects on Ghanaian household welfare, employment generation, supply chain integration, and community resilience.',ex:'Agriculture scores highest — directly affects 30%+ of the labour force.',color:C.lime},
            {n:'Implementation Feasibility',w:'25%',d:'Regulatory clarity, infrastructure dependency, talent availability, and timeline to first positive impact.',ex:'Technology scores medium — talent available but infrastructure dependency creates risk.',color:C.limeDark},
            {n:'Financial Sustainability',w:'15%',d:'Path to positive cash flow, risk-adjusted return profile, exit liquidity, and commercial capital alignment.',ex:'Infrastructure scores lower — longer payback periods require patient capital.',color:'rgba(184,215,53,0.4)'}
          ].map((d,i)=>(
            <div key={i} className="mob-car-card" style={{background:C.paper,padding:'18px',borderTop:`3px solid ${d.color}`}}>
              <div style={{fontFamily:F.mono,fontSize:'10px',color:C.lime,marginBottom:'6px'}}>×{d.w}</div>
              <div style={{fontFamily:F.sans,fontSize:'14px',fontWeight:800,color:C.ink,marginBottom:'10px',lineHeight:1.3}}>{d.n}</div>
              <div style={{fontFamily:F.body,fontSize:'13px',color:C.muted,lineHeight:1.65,marginBottom:'12px'}}>{d.d}</div>
              <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'10px',fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.faint,lineHeight:1.5}}>{d.ex}</div>
            </div>
          ))}
        </div>
        <div style={{fontFamily:F.sans,fontSize:'10px',color:C.faint,textAlign:'center',marginTop:'8px',letterSpacing:'1px'}}>← swipe →</div>
      </div>

      <div style={{background:C.paperDark,padding:'20px 24px',borderLeft:`4px solid ${C.lime}`,marginBottom:'32px',display:'flex',gap:'24px',flexWrap:'wrap',alignItems:'center'}}>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'4px'}}>Scoring Output</div>
          <p style={{fontFamily:F.body,fontSize:'13px',color:C.ink,lineHeight:1.7,fontWeight:300}}>Each venture receives a composite score from 0–100. Scores ≥75 indicate Core priority (immediate deployment mandate). Scores 60–74 indicate Emerging tier (active pipeline). Scores below 60 indicate Growth designation (monitor and develop). The methodology is fully reproducible — each sub-score is documented with primary source citations.</p>
        </div>
        <div style={{flexShrink:0,textAlign:'center'}}>
          <div style={{fontFamily:F.mono,fontSize:'48px',color:C.forest,lineHeight:1}}>174+</div>
          <div style={{fontFamily:F.sans,fontSize:'10px',color:C.muted,marginTop:'4px'}}>Ventures scored</div>
        </div>
      </div>

      <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'16px',marginTop:'32px'}}>3.1 Sub-Score Construction</h3>
      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>Each of the four dimensions is scored on a 0–25 scale before being added to produce the composite. Sub-scores are derived from a standardized questionnaire applied to each venture, with responses grounded in verifiable primary data sources — World Bank databases, Ghana Statistical Service surveys, sector ministry reports, and independent market research. BRIDGE analysts complete the questionnaire independently, with discrepancies resolved through structured deliberation documented in the scoring record.</p>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',marginBottom:'32px'}} className="tc">
        {[
          {tier:'Core Priority',score:'≥75',color:C.positive,desc:'Immediate deployment mandate. These ventures receive first capital allocation and dedicated management attention.'},
          {tier:'Emerging',score:'60–74',color:C.amber,desc:'Active pipeline. Capital allocated as capacity allows. Management support provided to strengthen to Core tier.'},
          {tier:'Growth',score:'<60',color:C.muted,desc:'Monitor and develop. These ventures require further development before capital commitment.'},
          {tier:'Watch List',score:'Variable',color:C.faint,desc:'High-potential ventures with identifiable barriers. Subject to active monitoring and barrier-removal strategy.'}
        ].map((t,i)=>(
          <div key={i} style={{border:`1px solid ${C.border}`,padding:'16px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
              <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink}}>{t.tier}</div>
              <div style={{fontFamily:F.mono,fontSize:'14px',fontWeight:700,color:t.color}}>{t.score}</div>
            </div>
            <p style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.6}}>{t.desc}</p>
          </div>
        ))}
      </div>

      <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'16px',marginTop:'32px'}}>3.2 Three-Tier Impact Measurement Framework</h3>
      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>The BRIDGE Impact Score™ governs investment selection. A separate but integrated Three-Tier Impact Measurement Framework governs post-investment accountability. This framework connects every operational metric to a development indicator to a Peace & Prosperity outcome, ensuring that financial performance and human impact are tracked in coherent alignment — not as separate silos.</p>

      <div style={{background:C.ink,padding:'24px',marginBottom:'24px'}}>
        <div className='tier-grid' style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1px',background:C.border}}>
          {[
            {tier:'Tier 1',label:'Peace & Prosperity Outcomes',color:C.lime,items:['Individual dignity and agency','Family security and stability','Community cohesion','Intergenerational mobility']},
            {tier:'Tier 2',label:'Development Indicators',color:'rgba(184,217,53,0.6)',items:['Jobs created','Incomes increased','Healthcare access','Financial inclusion rate']},
            {tier:'Tier 3',label:'Operational Performance',color:'rgba(184,217,53,0.3)',items:['Capital deployed','Businesses supported','Training completions','Loan repayment rates']}
          ].map((t,i)=>(
            <div key={i} style={{background:C.ink,padding:'16px'}}>
              <div style={{fontFamily:F.mono,fontSize:'9px',color:t.color,marginBottom:'4px'}}>{t.tier}</div>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.paper,marginBottom:'12px',lineHeight:1.3}}>{t.label}</div>
              {t.items.map((it,j)=>(
                <div key={j} style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.5)',paddingBottom:'4px'}}>{it}</div>
              ))}
            </div>
          ))}
        </div>
        <p style={{fontFamily:F.body,fontSize:'12px',color:'rgba(250,248,243,0.4)',marginTop:'12px',fontStyle:'italic'}}>If Peace & Prosperity does not advance, BRIDGE is failing — regardless of financial returns or operational metrics.</p>
      </div>

      <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'16px',marginTop:'32px'}}>3.3 Reproducibility and Independence</h3>
      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>Every score produced by the BRIDGE methodology is fully reproducible. Each sub-score is documented with specific data sources, with page-level citations where available. Scoring records are maintained in an auditable format. BRIDGE's Investment Committee reviews and validates all Core priority scores before capital commitment. An independent external review of the methodology is conducted annually.</p>
      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>The full methodology workbooks, including individual venture scoring records, are available to Members in the Appendix B digital supplement. All primary data sources used in sector scores are cited in Appendix C.</p>
    </div>
  </div>
);

/* ── §4 SECTOR ANALYSIS ───────────────────────────────────────────── */
const S4=()=>{
  const[active,setActive]=useState(0);
  const sectors=[
    {
      num:'01',icon:'Blocks',name:'Infrastructure & Built Environment',score:82,tier:'Core',
      market:'$8.2B addressable market across commercial, transport, real estate, and energy verticals.',
      impact:'30,000+ businesses benefit from improved infrastructure. Transaction costs decline 15-25%.',
      thesis:'Commercial infrastructure digitization — beginning with Kejetia Market, West Africa\'s largest traditional market serving 10,000+ traders — demonstrates the transformative potential of technology-enabled market systems. BRIDGE\'s infrastructure thesis is grounded in the evidence that Ghanaian commerce is structurally sound but operationally inefficient: the capital, customers, and commercial relationships exist; what is absent is the digital layer connecting them.',
      ventures:['Market digitization platforms','Last-mile logistics networks','Commercial real estate development','Distributed solar and mini-grid systems','Cold chain infrastructure'],
      risk:'Infrastructure projects carry longer payback periods (5-8 years), requiring patient capital. Government partnership is essential for commercial-scale deployment. Execution risk is manageable given mature PPP frameworks.',
      irf:'8-12% target IRR on commercial infrastructure. Energy assets return 12-18% with offtake agreements.'
    },
    {
      num:'02',icon:'Wallet',name:'Financial Inclusion & FinTech',score:88,tier:'Core',
      market:'$4-6B SME credit gap. 40% of adults financially excluded. 57 licensed fintech platforms.',
      impact:'12,000 SMEs access credit. 250,000 individuals open savings accounts. Inclusion rate rises to 60%.',
      thesis:'Ghana\'s fintech ecosystem is the most developed in West Africa by licensing and transaction volume. The opportunity is not to build from scratch but to capitalize proven platforms with patient growth capital, enabling scale, rate reduction, and product expansion. BRIDGE\'s financial inclusion thesis is that digital credit, paired with savings and insurance products, is the fastest pathway to formal financial inclusion for the 40% currently excluded.',
      ventures:['Digital credit platforms for SMEs','Mobile savings and investment products','Payment infrastructure expansion','Microinsurance platforms','Remittance-to-investment conversion products'],
      risk:'Credit risk requires robust underwriting. Regulatory compliance is essential under Bank of Ghana Digital Credit Directive (Oct 2025). Currency risk managed through local-currency lending.',
      irf:'15-25% IRR demonstrated on proven platforms. Blended portfolio target: 10-12% accounting for early-stage allocations.'
    },
    {
      num:'03',icon:'Cross',name:'Health Systems & Medical Services',score:76,tier:'Core',
      market:'Healthcare worker shortage creates $2B+ service gap. Private healthcare market growing 12% annually.',
      impact:'50,000-75,000 patients receive care annually. 200 healthcare workers retained who would otherwise emigrate.',
      thesis:'Ghana\'s healthcare crisis is simultaneously a staffing crisis, an infrastructure crisis, and a financing crisis. BRIDGE\'s health systems thesis addresses all three through an integrated model: diaspora-connected telemedicine extends specialist reach without requiring permanent return; community health facilities demonstrate what adequately-resourced care looks like; and healthcare worker retention programs close the economic differential that drives emigration.',
      ventures:['Diaspora telemedicine platforms','Community health clinic networks','Medical equipment financing','Healthcare worker retention programs','Health insurance expansion vehicles'],
      risk:'Healthcare requires regulatory compliance and quality management systems. Government partnership essential for NHIS reimbursement. Long path to profitability without concessional capital support.',
      irf:'7-10% IRR on commercial components. Concessional capital required for fully subsidized care layers.'
    },
    {
      num:'04',icon:'Cpu',name:'Technology & Innovation',score:79,tier:'Core',
      market:'Ghana\'s ICT sector growing 18% annually. Digital economy potential $25B+ by 2030.',
      impact:'5,000+ tech jobs created. 50 startups achieving scale with BRIDGE portfolio support.',
      thesis:'Ghana risks irrelevance in the global digital economy without strategic intervention at the startup growth stage. Early-stage capital is available from angel networks; later-stage institutional capital is available from pan-African VCs. The gap is the Series A and growth capital required for promising Ghanaian startups to achieve the scale necessary to compete. BRIDGE fills this gap while simultaneously providing the diaspora network connections, talent, and market access that capital alone cannot provide.',
      ventures:['Series A growth capital for tech startups','Digital infrastructure development','Youth digital skills training','Tech co-working and incubation hubs','AI and data platform development'],
      risk:'Technology investment carries high failure rates. Portfolio diversification across sectors (fintech, agtech, edtech, healthtech) mitigates single-segment risk. Exit liquidity limited but improving.',
      irf:'Portfolio approach targeting 20%+ IRR on Core tier technology bets, with higher failure rates factored in.'
    },
    {
      num:'05',icon:'GraduationCap',name:'Education & Skills Development',score:74,tier:'Emerging',
      market:'Education sector spending $3.5B annually. Skills gap creates $1.5B+ training market.',
      impact:'10,000 students annually complete job-ready training. Youth unemployment reduced in served communities.',
      thesis:'Ghana\'s education system produces graduates without job-ready skills, while the economy demands capabilities the formal system does not supply. BRIDGE\'s education thesis targets the skills gap directly: investing in technical and vocational training aligned with employer demand, digital literacy programs enabling participation in technology-enabled commerce, and professional development that retains talent by providing in-Ghana career advancement pathways.',
      ventures:['Technical and vocational training centers','Digital literacy programs','Professional certification platforms','University partnership programs','Career placement and employer networks'],
      risk:'Education revenue models require scale to achieve sustainability. Government partnership for recognition and accreditation is essential. Long outcome timelines complicate impact measurement.',
      irf:'8-12% IRR on commercial training platforms. Philanthropy required for fully subsidized access programs.'
    },
    {
      num:'06',icon:'Sprout',name:'Agriculture & Value Chains',score:85,tier:'Core',
      market:'Agriculture employs 40% of workforce. Post-harvest losses exceed 40%. $500M+ export opportunity.',
      impact:'5,000 farmers connected to premium markets. Income increases 30-60% through value chain integration.',
      thesis:'Ghana\'s agricultural sector is structurally productive but commercially inefficient. Farmers produce abundant crops that generate limited income because value is captured at every intermediary step between farm gate and consumer. BRIDGE\'s agriculture thesis targets value chain integration: connecting farmers directly to processors, providing storage infrastructure that eliminates forced sale at harvest, and building export quality assurance systems that unlock premium markets. The Ejura Agricultural Hub anchors this model.',
      ventures:['Agricultural market linkage platforms','Processing and storage infrastructure','Export quality assurance systems','Smallholder finance and input provision','Cooperative strengthening programs'],
      risk:'Agricultural investment faces weather, price, and logistics risk. Diversification across crops and regions mitigates concentration. Government support for rural infrastructure reduces logistics risk.',
      irf:'12-18% IRR on processing infrastructure with offtake agreements. Lower on direct smallholder lending.'
    },
    {
      num:'07',icon:'Camera',name:'Sports, Entertainment & Creative Industries',score:68,tier:'Emerging',
      market:'Ghana\'s creative economy growing 8% annually. Music, film, fashion generating $1.2B+ annually.',
      impact:'Cultural export revenue doubled. 3,000+ creative economy jobs created and retained in Ghana.',
      thesis:'Ghana\'s creative industries — Highlife and Afrobeats music, Ghallywood film, Kente and Ghanaian fashion, contemporary art — are globally recognized but commercially under-developed. The talent and cultural product exist; what is absent is professional management infrastructure, intellectual property protection, and distribution pathways to global markets. BRIDGE\'s creative industries thesis is that diaspora networks — which extend directly into global entertainment, fashion, and art markets — can provide exactly these missing links.',
      ventures:['Music production and distribution platforms','Film production and distribution','Fashion design and export brands','Sports infrastructure and academies','Cultural tourism development'],
      risk:'Creative industries carry high commercial uncertainty. IP protection is challenging in Ghana\'s legal environment. Diaspora market relationships provide partial risk mitigation.',
      irf:'Variable — potentially 20%+ on music and film with global distribution. Lower on physical creative infrastructure.'
    },
    {
      num:'08',icon:'Home',name:'Housing & Real Estate',score:71,tier:'Emerging',
      market:'Housing deficit of 1.8 million units. Mortgage market growing but affordability constrained.',
      impact:'10,000 housing units developed. 50,000 Ghanaians in affordable, quality housing.',
      thesis:'Ghana faces a structural housing affordability crisis driven by the combination of rapid urbanization, constrained construction finance, and inadequate long-term mortgage markets. BRIDGE\'s housing thesis targets the affordable mid-market — households with incomes above the subsidy threshold but below formal bank mortgage eligibility. Developer finance and innovative ownership structures bridge this gap.',
      ventures:['Affordable housing development','Construction finance facilities','Mortgage product innovation','Community land trust models','Diaspora residential investment'],
      risk:'Real estate is capital-intensive with long payback periods. Currency and inflation risk is significant. Government land tenure and permitting creates execution uncertainty.',
      irf:'10-15% IRR on commercial housing development. Lower on affordable housing requiring concessional capital.'
    },
    {
      num:'09',icon:'Luggage',name:'Tourism & Hospitality',score:66,tier:'Emerging',
      market:'Tourism sector $8.7B potential. Year of Return demonstrated diaspora tourism viability.',
      impact:'Ghana positions as premium diaspora tourism destination. 15,000 tourism sector jobs created.',
      thesis:'The Year of Return demonstrated that Ghana possesses a unique and monetizable cultural asset: the opportunity for members of the African diaspora globally to reconnect with ancestral homeland. BRIDGE\'s tourism thesis extends this insight into a sustainable industry: developing premium hospitality infrastructure oriented to diaspora and cultural heritage tourism, connecting international visitors to authentic Ghanaian cultural experiences, and positioning Ghana\'s creative and culinary economy as tourism anchors.',
      ventures:['Heritage tourism infrastructure','Premium hospitality development','Cultural tour and experience platforms','Diaspora homecoming programmes','Culinary and agritourism development'],
      risk:'Tourism is highly sensitive to economic cycles and external events. Infrastructure investment requires long lead times. Positioning requires marketing investment with delayed returns.',
      irf:'12-16% IRR on premium hospitality development with stable occupancy rates.'
    },
    {
      num:'10',icon:'BatteryCharging',name:'Energy & Renewable Resources',score:80,tier:'Core',
      market:'Energy access gap represents $3B+ investment opportunity. Renewable transition accelerating.',
      impact:'Clean energy reaches 100,000 households. Energy costs for SMEs reduced 30%.',
      thesis:'Ghana\'s energy sector is at an inflection point: sufficient grid infrastructure exists to support urban business, but reliability is inadequate, cost is high, and rural access remains limited. Distributed solar and mini-grid systems address all three challenges simultaneously, delivering reliable, affordable energy without requiring grid extension. BRIDGE\'s energy thesis targets the commercial SME solar market and rural community mini-grids as the highest-impact, most commercially viable near-term opportunities.',
      ventures:['Commercial solar installation platforms','Rural mini-grid development','SME energy efficiency solutions','Solar manufacturing capacity','Energy access finance facilities'],
      risk:'Energy investment requires long-term offtake certainty. Regulatory framework for independent power producers is improving but requires monitoring. Currency risk on equipment imports is significant.',
      irf:'14-18% IRR on commercial solar with PPAs. 10-14% on rural mini-grids with government subsidy.'
    },
    {
      num:'11',icon:'Factory',name:'Manufacturing & Light Industry',score:72,tier:'Emerging',
      market:'Manufacturing sector 25% of GDP potential. Import substitution opportunity $4B+ annually.',
      impact:'15,000 manufacturing jobs created. Import substitution reducing foreign exchange drain.',
      thesis:'Ghana imports manufactured goods it has the capacity to produce domestically — food products, textiles, basic chemicals, building materials. The import substitution opportunity is substantial and directly addresses foreign exchange vulnerability. BRIDGE\'s manufacturing thesis targets light industry with short payback periods and clear domestic demand: food processing, packaging, textiles, and construction materials. Diaspora expertise in manufacturing management and global supply chains provides competitive advantage.',
      ventures:['Food processing facilities','Textile and garment manufacturing','Packaging and plastics','Building materials production','Export-oriented light manufacturing'],
      risk:'Manufacturing requires significant capital and management depth. Infrastructure dependencies (power, logistics) create execution risk. Competition from imports requires protection or clear cost advantage.',
      irf:'12-18% IRR on food processing with secured offtake. Variable on other light manufacturing.'
    },
    {
      num:'12',icon:'Truck',name:'Transportation & Logistics',score:77,tier:'Core',
      market:'Logistics market $2.5B and growing. Last-mile delivery infrastructure largely absent.',
      impact:'Transaction costs reduced 20% across served markets. Rural-urban market integration improved.',
      thesis:'Ghana\'s logistics infrastructure is the invisible constraint on every other sector. Agricultural produce spoils in transit. Manufacturing inputs arrive late. SME delivery costs erode margins. The absence of reliable, affordable last-mile logistics reduces the economic viability of every commercial activity dependent on physical goods movement. BRIDGE\'s logistics thesis targets platform-enabled logistics aggregation — connecting dispersed small operators through technology platforms that reduce empty miles, improve route optimization, and enable reliable scheduling.',
      ventures:['Logistics aggregation platforms','Cold chain infrastructure development','Intercity freight networks','Urban last-mile delivery platforms','Customs and trade facilitation technology'],
      risk:'Logistics operations require ongoing capital for fleet and technology. Fuel cost volatility is significant. Platform business models require critical mass to achieve unit economics.',
      irf:'15-20% IRR on platform models achieving network effects. Lower on asset-heavy infrastructure plays.'
    }
  ];
  return(
    <div id="s4" className="pad-section" style={{background:C.paperDark,borderBottom:`1px solid ${C.border}`,scrollMarginTop:"80px"}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>
        <SM sec="§4" label="Sector-by-Sector Analysis"/>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,36px)',fontWeight:900,color:C.ink,lineHeight:1.15,letterSpacing:'-1px',marginBottom:'16px'}}>Twelve sectors. One coherent architecture.</h2>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'32px'}}>The following sector analyses synthesize BRIDGE's research across Ghana's 12 priority economic sectors. Each analysis applies the BRIDGE Impact Score™ methodology to generate a sector-level investment thesis, supported by market data, impact projections, and risk assessment. The 174+ individual venture scores underpinning each sector thesis are available in the full Members database (Appendix A).</p>

        {/* Sector selector */}
        <div className='sector-grid' style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'2px',marginBottom:'32px',background:C.border}}>
          {sectors.map((s,i)=>(
            <button key={i} onClick={()=>setActive(i)} style={{background:active===i?C.forest:C.paper,border:'none',padding:'10px 8px',cursor:'pointer',transition:'all 0.2s',textAlign:'left'}}>
              <div style={{fontFamily:F.mono,fontSize:'9px',color:active===i?C.lime:C.faint,marginBottom:'3px'}}>{s.num}</div>
              <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:active===i?C.paper:C.ink,lineHeight:1.3}}>{s.name.split(' ').slice(0,2).join(' ')}</div>
              <div style={{fontFamily:F.mono,fontSize:'10px',color:active===i?C.lime:s.tier==='Core'?C.positive:C.amber,marginTop:'3px',fontWeight:700}}>{s.score}</div>
            </button>
          ))}
        </div>

        {/* Active sector detail */}
        {sectors.map((s,i)=>active===i&&(
          <div key={i}>
            <div style={{background:C.ink,padding:'24px 28px',marginBottom:'24px',display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'16px'}}>
              <div>
                <div style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(255,255,255,0.3)',marginBottom:'6px'}}>Sector {s.num} of 12</div>
                <h3 style={{fontFamily:F.display,fontSize:'clamp(18px,2.5vw,28px)',fontWeight:700,color:C.paper,lineHeight:1.2}}>{s.name}</h3>
              </div>
              <div style={{textAlign:'right'}}>
                <div style={{fontFamily:F.display,fontSize:'48px',color:C.lime,lineHeight:1,fontWeight:900}}>{s.score}</div>
                <div style={{fontFamily:F.sans,fontSize:'10px',color:s.tier==='Core'?C.lime:C.amber,fontWeight:700,letterSpacing:'1px'}}>{s.tier.toUpperCase()} PRIORITY</div>
              </div>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'24px'}} className="tc">
              <div style={{background:C.paper,padding:'16px',borderLeft:`3px solid ${C.lime}`}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Market Opportunity</div>
                <p style={{fontFamily:F.body,fontSize:'13px',color:C.ink,lineHeight:1.6}}>{s.market}</p>
              </div>
              <div style={{background:C.paper,padding:'16px',borderLeft:`3px solid ${C.positive}`}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Development Impact</div>
                <p style={{fontFamily:F.body,fontSize:'13px',color:C.ink,lineHeight:1.6}}>{s.impact}</p>
              </div>
            </div>

            <div style={{background:C.paper,padding:'20px 24px',marginBottom:'16px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Investment Thesis</div>
              <p style={{fontFamily:F.body,fontSize:'14px',color:C.ink,lineHeight:1.8,fontWeight:300}}>{s.thesis}</p>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'16px',marginBottom:'8px'}} className="tc">
              <div style={{background:C.paper,padding:'16px'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Venture Categories</div>
                {s.ventures.map((v,j)=>(
                  <div key={j} style={{display:'flex',gap:'8px',alignItems:'flex-start',marginBottom:'6px'}}>
                    <div style={{width:'4px',height:'4px',borderRadius:'50%',background:C.lime,flexShrink:0,marginTop:'6px'}}/>
                    <span style={{fontFamily:F.body,fontSize:'11px',color:C.muted,lineHeight:1.5}}>{v}</span>
                  </div>
                ))}
              </div>
              <div style={{background:C.paper,padding:'16px'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Risk Assessment</div>
                <p style={{fontFamily:F.body,fontSize:'12px',color:C.ink,lineHeight:1.7,fontStyle:'italic'}}>{s.risk}</p>
              </div>
              <div style={{background:C.paper,padding:'16px'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Return Profile</div>
                <p style={{fontFamily:F.body,fontSize:'12px',color:C.ink,lineHeight:1.7,fontStyle:'italic'}}>{s.irf}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Sector score matrix */}
        <div style={{marginTop:'40px',borderTop:`1px solid ${C.border}`,paddingTop:'32px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'16px'}}>Sector Score Summary</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'2px',background:C.border}}>
            {sectors.map((s,i)=>(
              <div key={i} style={{background:C.paper,padding:'12px',cursor:'pointer'}} onClick={()=>setActive(i)}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'4px'}}>
                  <span style={{fontFamily:F.mono,fontSize:'9px',color:C.faint}}>{s.num}</span>
                  <span style={{fontFamily:F.mono,fontSize:'13px',fontWeight:700,color:s.tier==='Core'?C.positive:C.amber}}>{s.score}</span>
                </div>
                <div style={{fontFamily:F.sans,fontSize:'10px',color:C.ink,lineHeight:1.3}}>{s.name.split('&')[0].trim()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── §5 CAPITAL ARCHITECTURE ─────────────────────────────────────── */
const S5=()=>{
  const[s5Open,setS5Open]=useState(false);
  return(
  <div id="s5" className="pad-section" style={{background:C.paper,borderBottom:`1px solid ${C.border}`,scrollMarginTop:"80px"}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <SM sec="§5" label="Capital Architecture & Deployment"/>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,36px)',fontWeight:900,color:C.ink,lineHeight:1.15,letterSpacing:'-1px',marginBottom:'32px'}}>Four deployment models. One blended architecture. $100M total capitalisation.</h2>

      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'32px'}}>BRIDGE does not pursue a single investment model. Ghana’s opportunity landscape spans early-stage tech startups, infrastructure PPPs, agricultural value chains, and community health networks. A single investment model cannot serve them all. BRIDGE’s capital architecture adapts to each context while maintaining coherent risk management and unified impact measurement. BRIDGE's four deployment models are designed to address distinct segments of this landscape, each leveraging BRIDGE's strengths appropriately.</p>

      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'2px',marginBottom:'40px',background:C.border}}>
        {[
          {model:'Direct Investment',pct:'20-30%',desc:'BRIDGE takes controlling stakes (>50%) in transformative initiatives requiring operational control. Suited to flagship demonstrations and culturally sensitive interventions where beneficiary trust depends on mission integrity.',best:'Market digitization, community health networks, agricultural hubs'},
          {model:'Portfolio Investment',pct:'50-60%',desc:'BRIDGE takes minority stakes (15-35% equity) with board representation in proven businesses needing growth capital. Capital-efficient model leveraging existing management while providing governance expertise and patient capital.',best:'Fintech platforms, tech startups, established SMEs seeking scale'},
          {model:'Strategic Partnership',pct:'5-10%',desc:'BRIDGE acts as catalyst, facilitator, and co-investor in government-led or multilateral initiatives where the role is mobilizing resources and providing expertise rather than capital alone.',best:'Government digital infrastructure, DFI-led sector programs'},
          {model:'Incubation',pct:'10-20%',desc:'BRIDGE develops early-stage initiatives from concept through proof-of-concept, then spins them out or converts them to portfolio investments. Enables innovation without permanent management burden.',best:'New market segments, pilot programs, technology experiments'}
        ].map((m,i)=>(
          <div key={i} style={{background:C.paper,padding:'24px'}}>
            <div style={{fontFamily:F.mono,fontSize:'28px',color:C.forest,lineHeight:1,marginBottom:'4px'}}>{m.pct}</div>
            <div style={{fontFamily:F.sans,fontSize:'14px',fontWeight:800,color:C.ink,marginBottom:'12px'}}>{m.model}</div>
            <p style={{fontFamily:F.body,fontSize:'13px',color:C.muted,lineHeight:1.7,marginBottom:'12px'}}>{m.desc}</p>
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'10px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.faint,marginBottom:'4px'}}>Best Suited For</div>
              <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted}}>{m.best}</div>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'16px',marginTop:'32px'}}>5.1 Capital Stack Architecture</h3>
      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'24px'}}>BRIDGE's blended finance capital stack is designed to mobilize commercial capital by absorbing the first-loss risk that would otherwise deter private participation. The architecture is as follows:</p>

      {/* Desktop */}
      <div className="desk-only" style={{background:C.ink,padding:'2px',marginBottom:'32px'}}>
        {[
          {layer:'Concessional Capital (DFIs)',amount:'$25-40M',pct:'25-40%',return:'3-6%',pos:'Second-Loss',color:C.lime,desc:'Patient DFI capital absorbs first loss, enabling commercial participation.'},
          {layer:'Diaspora Investment Layer',amount:'$45-65M',pct:'45-65%',return:'8-15%',pos:'Senior',color:'rgba(184,217,53,0.6)',desc:'Entry: $10K · $50K · $250K · $1M+. Priority distributions with first-loss protection.'},
          {layer:'Commercial Co-Investment',amount:'$20-30M',pct:'20-30%',return:'8-15%',pos:'Pari Passu',color:'rgba(184,217,53,0.3)',desc:'Impact investors and family offices co-investing alongside the diaspora layer.'}
        ].map((l,i)=>(
          <div key={i} className='stack-item' style={{background:'#0F2214',padding:'16px 20px',borderLeft:`4px solid ${l.color}`,marginBottom:'2px',display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:'12px'}}>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper}}>{l.layer}</div>
              <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.5)',marginTop:'4px'}}>{l.desc}</div>
            </div>
            <div style={{textAlign:'right',flexShrink:0}}>
              <div style={{fontFamily:F.mono,fontSize:'18px',color:l.color,lineHeight:1}}>{l.amount}</div>
              <div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(255,255,255,0.3)',marginTop:'2px'}}>{l.pos} · {l.return}</div>
            </div>
          </div>
        ))}
        <div style={{background:'#0F2214',padding:'12px 20px',borderTop:`1px solid rgba(255,255,255,0.05)`}}>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(255,255,255,0.3)'}}>Total Capitalisation</span>
            <span style={{fontFamily:F.mono,fontSize:'16px',color:C.lime}}>$100M+</span>
          </div>
        </div>
      </div>
      {/* Mobile carousel */}
      <div className="mob-car-wrap" style={{display:'none',marginBottom:'24px'}}>
        <div className="mob-car-rail">
          {[
            {layer:'Concessional Capital',amount:'$25-40M',pct:'25-40%',ret:'3-6%',pos:'First-Loss',color:C.lime,desc:'DFI and philanthropic capital absorbs first loss — making commercial participation possible.'},
            {layer:'Diaspora Layer',amount:'$45-65M',pct:'45-65%',ret:'8-15%',pos:'Senior',color:'rgba(184,217,53,0.7)',desc:'Entry: $10K · $50K · $250K · $1M+. Priority distributions with first-loss protection.'},
            {layer:'Commercial Co-Investment',amount:'$20-30M',pct:'20-30%',ret:'8-15%',pos:'Pari Passu',color:'rgba(184,217,53,0.4)',desc:'Impact investors and family offices co-investing alongside the diaspora layer.'}
          ].map((l,i)=>(
            <div key={i} className="mob-car-card" style={{background:C.ink,padding:'20px',borderLeft:`4px solid ${l.color}`}}>
              <div style={{fontFamily:F.display,fontSize:'34px',fontWeight:900,color:l.color,lineHeight:1,marginBottom:'2px'}}>{l.amount}</div>
              <div style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(255,255,255,0.4)',marginBottom:'14px'}}>{l.pct} · {l.ret} target · {l.pos}</div>
              <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.paper,marginBottom:'8px'}}>{l.layer}</div>
              <p style={{fontFamily:F.body,fontSize:'13px',color:'rgba(250,248,243,0.65)',lineHeight:1.65}}>{l.desc}</p>
            </div>
          ))}
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'10px'}}>
          <span style={{fontFamily:F.sans,fontSize:'10px',color:C.faint,letterSpacing:'1px'}}>← swipe →</span>
          <span style={{fontFamily:F.mono,fontSize:'12px',color:C.lime}}>Total: $100M+</span>
        </div>
      </div>

      <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'16px',marginTop:'32px'}}>5.2 Sector Capital Allocation</h3>
      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'24px'}}>Capital allocation across sectors reflects both BRIDGE Impact Score™ results and strategic diversification principles. Core priority sectors receive the majority of first-fund deployment; Emerging tier sectors receive growth capital as the portfolio matures.</p>

      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',marginBottom:'32px'}} className="tc">
        {[
          {sector:'Infrastructure',alloc:'$25-30M',pct:'25-30%',rationale:'Highest tangible impact on commercial ecosystem. Anchor in Kejetia Market digitization.'},
          {sector:'Financial Inclusion',alloc:'$30-35M',pct:'30-35%',rationale:'Largest addressable market. Most mature ecosystem. Best demonstrated unit economics.'},
          {sector:'Health Systems',alloc:'$10-15M',pct:'10-15%',rationale:'Highest development urgency. Requires concessional capital for full impact.'},
          {sector:'Technology',alloc:'$15-20M',pct:'15-20%',rationale:'Highest return potential. Enables platform effects across other sectors.'},
          {sector:'Agriculture',alloc:'$10-15M',pct:'10-15%',rationale:'Highest development impact per dollar. Ejura Hub anchors deployment.'},
          {sector:'Education & Other',alloc:'$10-15M',pct:'10-15%',rationale:'Emerging tier sectors receiving growth capital in initial fund phase.'}
        ].map((s,i)=>(
          <div key={i} style={{border:`1px solid ${C.border}`,padding:'16px',background:C.paperDark}}>
            <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,marginBottom:'6px'}}>{s.sector}</div>
            <div style={{fontFamily:F.display,fontSize:'22px',color:C.forest,fontWeight:900,lineHeight:1,marginBottom:'4px'}}>{s.alloc}</div>
            <div style={{fontFamily:F.mono,fontSize:'10px',color:C.muted,marginBottom:'8px'}}>{s.pct} of fund</div>
            <p style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.faint,lineHeight:1.5}}>{s.rationale}</p>
          </div>
        ))}
      </div>

      <PQ quote='Blended finance is not charity dressed as investment. It is the correct structural response to the risk premium that frontier markets carry — a premium that often exceeds actual risk, particularly when local knowledge and alignment are present.' attr="BRIDGE Working Paper No. 01, §5"/>

      <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'16px',marginTop:'32px'}}>5.3 Return Projections and Timeline</h3>
      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>BRIDGE targets a blended portfolio IRR of 8-15% for the diaspora and commercial investment layers over a 10-year fund life. This range reflects the portfolio's deliberate mix of higher-return commercial bets (technology, fintech) with lower-return but higher-impact development investments (health, education). The concessional capital layer accepts 3-6% returns in exchange for first-loss protection and the development impact mandate.</p>
      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>Fund deployment is phased over three years, with the first $30-40M deployed in years 1-2 to Core priority sectors with highest confidence. Full deployment is projected by year 3. Portfolio maturation and distributions begin in years 5-7 as initial investments reach scale or exit liquidity events. The fund is structured with a 7-year base life and 3-year extension option.</p>
    </div>
  </div>
  );
};

/* ── §6 DIASPORA INTEGRATION ─────────────────────────────────────── */
const S6=()=>{
  const[s6Extra,setS6Extra]=useState(false);
  return(
  <div id="s6" className="pad-section" style={{background:C.paperDark,borderBottom:`1px solid ${C.border}`,scrollMarginTop:"80px"}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <SM sec="§6" label="Diaspora Integration Model"/>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,36px)',fontWeight:900,color:C.ink,lineHeight:1.15,letterSpacing:'-1px',marginBottom:'32px'}}>From remittance senders to development architects.</h2>

      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'32px'}}>Three million Ghanaians abroad send over $6.65 billion home every year. That sustained flow of capital is not the problem — it is proof of intent. What has been missing are the vehicles to redirect even a fraction of that commitment from family-level consumption into national-level development investment. BRIDGE’s diaspora integration model provides exactly this.</p>

      <StatStrip stats={[{v:'3M',l:'Ghanaians in diaspora'},{v:'$6.65B',l:'Annual remittances'},{v:'72%',l:'Interested in investment vehicles'},{v:'$50B+',l:'Accumulated diaspora savings'}]}/>

      <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'16px',marginTop:'32px'}}>6.1 The Four Engagement Pathways</h3>

      {/* Desktop 2-col grid */}
      <div className="desk-only" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'32px'}}>
        {[
          {pathway:'Financial Capital',icon:'I.',desc:'Direct investment through BRIDGE Ventures fund structure. Annual reporting on both financial returns and development impact.',gives:'Entry: $10K · $50K · $250K · $1M+. Target IRR 8-15%. First-priority distributions.'},
          {pathway:'Professional Expertise',icon:'II.',desc:'BRIDGE Connect matching diaspora professionals with portfolio companies. Advisory roles, mentorship, and short-term technical assistance deployments.',gives:'500+ professionals engaged annually. Skills transfer without permanent return.'},
          {pathway:'Network Activation',icon:'III.',desc:'Diaspora networks into global corporations, capital markets, and institutions provide market access unavailable to locally-embedded organizations.',gives:'Market access, partnership introductions, fundraising referrals, technology transfer.'},
          {pathway:'Community Mobilization',icon:'IV.',desc:'Hometown associations, professional networks, and religious organizations as mobilization channels for community-level capital and intelligence.',gives:'Grassroots capital, local intelligence, community trust, beneficiary networks.'}
        ].map((p,i)=>(
          <div key={i} style={{background:C.paper,padding:'20px',border:`1px solid ${C.border}`}}>
            <div style={{fontFamily:F.mono,fontSize:'11px',color:C.lime,marginBottom:'8px',letterSpacing:'2px'}}>{p.icon}</div>
            <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:800,color:C.ink,marginBottom:'10px'}}>{p.pathway}</div>
            <p style={{fontFamily:F.body,fontSize:'13px',color:C.muted,lineHeight:1.7,marginBottom:'12px'}}>{p.desc}</p>
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'10px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.faint,marginBottom:'4px'}}>What This Delivers</div>
              <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,lineHeight:1.5}}>{p.gives}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Mobile carousel */}
      <div className="mob-car-wrap" style={{display:'none',marginBottom:'24px'}}>
        <div className="mob-car-rail">
          {[
            {pathway:'Financial Capital',icon:'I.',desc:'Direct investment through BRIDGE Ventures. Annual reporting on financial returns and development impact.',gives:'Entry: $10K · $50K · $250K · $1M+. Target IRR 8-15%.'},
            {pathway:'Professional Expertise',icon:'II.',desc:'BRIDGE Connect matches diaspora professionals with portfolio companies for advisory, mentorship, and short-term deployments.',gives:'500+ professionals engaged annually — no permanent return required.'},
            {pathway:'Network Activation',icon:'III.',desc:'Global networks into corporations, capital markets, and institutions — providing access unavailable to locally-based organizations.',gives:'Market access, partnerships, fundraising referrals, technology transfer.'},
            {pathway:'Community Mobilization',icon:'IV.',desc:'Hometown associations, professional networks, and religious organizations as mobilization channels for community-level capital.',gives:'Grassroots capital, local intelligence, community trust.'}
          ].map((p,i)=>(
            <div key={i} className="mob-car-card" style={{background:C.paper,padding:'18px',border:`1px solid ${C.border}`}}>
              <div style={{fontFamily:F.mono,fontSize:'13px',color:C.lime,marginBottom:'8px',letterSpacing:'2px'}}>{p.icon}</div>
              <div style={{fontFamily:F.sans,fontSize:'15px',fontWeight:800,color:C.ink,marginBottom:'12px'}}>{p.pathway}</div>
              <p style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.7,marginBottom:'14px'}}>{p.desc}</p>
              <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'10px'}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.faint,marginBottom:'4px'}}>Delivers</div>
                <div style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.forest,lineHeight:1.5}}>{p.gives}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{fontFamily:F.sans,fontSize:'10px',color:C.faint,textAlign:'center',marginTop:'8px',letterSpacing:'1px'}}>← swipe →</div>
      </div>

      <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'16px',marginTop:'32px'}}>6.2 Brain Circulation: The Long-Term Vision</h3>
      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>The long-term ambition of BRIDGE's diaspora integration model is not remittance mobilization. It is brain circulation: the creation of a two-way flow of talent, knowledge, and capital between Ghana and the global Ghanaian diaspora, in which the act of contributing to Ghana's development is professionally and financially rewarding enough to be self-sustaining.</p>
      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>Brain circulation requires three conditions, each of which BRIDGE's model addresses. First, economic equivalence: the financial and professional rewards available in Ghana must be competitive with those available abroad. BRIDGE creates this through investment returns, professional engagement fees, and career opportunities in portfolio companies that are globally competitive. Second, infrastructure: the mechanisms through which expertise and capital can be deployed in Ghana must be professional, reliable, and trustworthy. BRIDGE's PBC structure, governance practices, and impact reporting provide this credibility. Third, identity integration: Ghanaian professionals abroad must be able to simultaneously maintain their lives in destination countries while contributing meaningfully to Ghana. BRIDGE's remote advisory, virtual mentorship, and periodic short-term engagement models enable exactly this.</p>

      <PQ quote='We are not asking the diaspora to come home. We are asking them to invest where they already have the deepest interest: in the country that formed them, and in the people who remain.' attr="BRIDGE Working Paper No. 01, §6"/>

      <button className="mob-show mob-toggle" onClick={()=>setS6Extra(o=>!o)} style={{marginTop:'4px'}}>
        <span>{s6Extra?'Show less ↑':'Read §6.3 Value Proposition + §6.4 Strategy ↓'}</span>
      </button>
      <div className={s6Extra?'':'mob-item-hidden'}>
      <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'16px',marginTop:'32px'}}>6.3 Diaspora Value Proposition</h3>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'32px'}} className="tc">
        {[
          {title:'Financial Returns',items:['Investment entry: $10K (Engaged) · $50K · $250K · $1M+ (Strategic Partner)','8-15% IRR target — competitive with US equity markets','First-loss capital protection from blended finance structure','Annual impact reports connecting financial returns to development outcomes','Multiple exit pathways across 10-year fund life']},
          {title:'Non-Financial Returns',items:['Reconnection with homeland through active contribution','Legacy building: visible, tangible transformation','Professional engagement without life disruption','Identity integration: diaspora and Ghanaian identity reconciled']}
        ].map((v,i)=>(
          <div key={i} style={{background:C.ink,padding:'20px'}}>
            <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.lime,marginBottom:'12px',letterSpacing:'1px',textTransform:'uppercase'}}>{v.title}</div>
            {v.items.map((it,j)=>(
              <div key={j} style={{display:'flex',gap:'8px',marginBottom:'8px'}}>
                <span style={{color:C.lime,flexShrink:0,fontSize:'10px',marginTop:'3px'}}>✓</span>
                <span style={{fontFamily:F.body,fontSize:'12px',color:'rgba(250,248,243,0.7)',lineHeight:1.5}}>{it}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'16px',marginTop:'32px'}}>6.4 Diaspora Mobilization Strategy</h3>
      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>BRIDGE's diaspora mobilization strategy operates across three channels simultaneously. Direct outreach to individual diaspora investors through the BRIDGE platform, professional networks, and partnership with diaspora-serving financial institutions. Community mobilization through hometown associations, Ghanaian professional networks, and religious organizations in destination cities. Institutional mobilization through partnerships with Ghana embassies, the Ghana Investment Promotion Centre, and diaspora organizations such as the African Diaspora Investment Symposium.</p>
      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>The mobilization sequence is designed to build credibility through early demonstration. Years 1-2 focus on establishing first-mover relationships with diaspora investors already engaged with Ghana's development. Years 3-5 leverage demonstrated results to access a broader diaspora investor pool. The long-term vision is a platform that becomes the default vehicle for any Ghanaian abroad who wants to invest meaningfully in homeland.</p>
      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>Investment entry is structured across four thresholds: Engaged ($10K), Investing ($50K and $250K), and Strategic Partners ($1M+). Each tier carries corresponding access — from LP rights and quarterly reporting through to co-investment in direct deals, board eligibility, and named programme recognition. Professional Contributors who prefer time over capital commit 10+ hours quarterly in advisory, mentorship, or technical assistance roles.</p>

      </div>{/* end s6 extra */}
      <FN sec='s6' notes={[
        'Diaspora remittance figures from World Bank, Migration and Development Brief, 2024. The $6.65B figure represents official remittances; the total including informal channels is estimated at $11.5B.',
        'BRIDGE Diaspora Survey, 2024. 72% of respondents expressed interest in formal investment vehicles; barriers cited were lack of trusted vehicle (68%), minimum investment thresholds too high (41%), and insufficient transparency on use of funds (38%).',
        'Brain circulation theory: Saxenian, A. (2006). The New Argonauts: Regional Advantage in a Global Economy. Harvard University Press. Applied to African context in Ionescu, D. (2006). Engaging Diasporas as Development Partners for Home and Destination Countries. International Organization for Migration.'
      ]}/>
    </div>
  </div>
  );
};

/* ── §7 GOVERNMENT PARTNERSHIP ──────────────────────────────────── */
const S7=()=>{
  const[s7Extra,setS7Extra]=useState(false);
  return(
  <div id="s7" className="pad-section" style={{background:C.paper,borderBottom:`1px solid ${C.border}`,scrollMarginTop:"80px"}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <SM sec="§7" label="Government Partnership Framework"/>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,36px)',fontWeight:900,color:C.ink,lineHeight:1.15,letterSpacing:'-1px',marginBottom:'32px'}}>Policy articulated. Operations executed. Partnership makes both real.</h2>

      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'32px'}}>Ghana's government has formally elevated diaspora engagement to national strategic priority. The Sankofa Initiative, launched in December 2025 under Presidential directive, represents the most significant institutional commitment to diaspora mobilization in Ghana's history. Five institutional pillars anchor this commitment: policy coordination (DAOOP), investment promotion (GIPC Diaspora Desk), financial infrastructure (Consolidated Bank Ghana and Access Bank), global network (50+ Ghana missions abroad), and regulatory frameworks (Bank of Ghana and SEC sandbox programs).</p>

      <div style={{background:C.forest,padding:'24px',marginBottom:'32px',color:C.paper}}>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'16px'}}>The Sankofa Initiative — Five Pillars</div>
        {/* Desktop 5-col */}
        <div className="desk-only" style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'2px',background:'rgba(255,255,255,0.1)'}}>
          {[
            {n:'Policy & Coordination',inst:'DAOOP + Presidential Adviser'},
            {n:'Investment Promotion',inst:'GIPC Diaspora Desk'},
            {n:'Financial Infrastructure',inst:'Consolidated Bank + Access Bank'},
            {n:'Global Network',inst:'50+ Ghana Missions Abroad'},
            {n:'Regulatory Frameworks',inst:'Bank of Ghana + SEC Sandbox'}
          ].map((p,i)=>(
            <div key={i} style={{background:'rgba(0,0,0,0.2)',padding:'12px 10px'}}>
              <div style={{fontFamily:F.mono,fontSize:'9px',color:C.lime,marginBottom:'4px'}}>{String(i+1).padStart(2,'0')}</div>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.paper,lineHeight:1.3,marginBottom:'6px'}}>{p.n}</div>
              <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:'rgba(250,248,243,0.5)'}}>{p.inst}</div>
            </div>
          ))}
        </div>
        {/* Mobile carousel */}
        <div className="mob-car-wrap" style={{display:'none'}}>
          <div className="mob-car-rail">
            {[
              {n:'Policy & Coordination',inst:'DAOOP + Presidential Adviser',n2:'01'},
              {n:'Investment Promotion',inst:'GIPC Diaspora Desk',n2:'02'},
              {n:'Financial Infrastructure',inst:'Consolidated Bank + Access Bank',n2:'03'},
              {n:'Global Network',inst:'50+ Ghana Missions Abroad',n2:'04'},
              {n:'Regulatory Frameworks',inst:'Bank of Ghana + SEC Sandbox',n2:'05'}
            ].map((p,i)=>(
              <div key={i} className="mob-car-card-sm" style={{background:'rgba(0,0,0,0.25)',padding:'16px 14px'}}>
                <div style={{fontFamily:F.mono,fontSize:'11px',color:C.lime,marginBottom:'8px'}}>{p.n2}</div>
                <div style={{fontFamily:F.sans,fontSize:'14px',fontWeight:700,color:C.paper,lineHeight:1.3,marginBottom:'8px'}}>{p.n}</div>
                <div style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:'rgba(250,248,243,0.55)'}}>{p.inst}</div>
              </div>
            ))}
          </div>
          <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(255,255,255,0.3)',textAlign:'center',marginTop:'8px',letterSpacing:'1px'}}>← swipe →</div>
        </div>
      </div>

      <button className="mob-show mob-toggle" onClick={()=>setS7Extra(o=>!o)} style={{marginTop:'16px'}}>
        <span>{s7Extra?'Show less ↑':'Read §7.1 – 7.3: Partnership details ↓'}</span>
      </button>
      <div className={s7Extra?'':'mob-item-hidden'}>
      <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'16px'}}>7.1 The Policy-Execution Gap</h3>
      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>Ghana has excellent diaspora engagement policy but no professional operational vehicle to execute it at scale. Government envisions diaspora investment mechanisms; BRIDGE operates them. This is not a competitive relationship but a complementary one: government provides the policy framework, institutional legitimacy, and network access; BRIDGE provides the operational infrastructure, professional management, and transparent governance.</p>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px',marginBottom:'32px',background:C.border}}>
        <div style={{background:C.paperDark,padding:'20px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>What Government Needs</div>
          {['Professional vehicle to deploy diaspora capital','Systematic process for opportunity evaluation','Structured mechanism for expertise mobilization','Institutional credibility with skeptical diaspora','Transparent outcome measurement and accountability'].map((n,i)=>(
            <div key={i} style={{display:'flex',gap:'8px',marginBottom:'8px'}}>
              <div style={{width:'4px',height:'4px',borderRadius:'50%',background:C.muted,flexShrink:0,marginTop:'7px'}}/>
              <span style={{fontFamily:F.body,fontSize:'13px',color:C.ink,lineHeight:1.5}}>{n}</span>
            </div>
          ))}
        </div>
        <div style={{background:C.forest,padding:'20px'}}>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>What BRIDGE Delivers</div>
          {['BRIDGE Ventures — professional investment fund','BRIDGE Impact Score™ evaluation framework','BRIDGE Connect — structured expertise pathways','BRIDGE PBC structure + transparent governance','Three-tier measurement + annual public reporting'].map((n,i)=>(
            <div key={i} style={{display:'flex',gap:'8px',marginBottom:'8px'}}>
              <span style={{color:C.lime,flexShrink:0,fontSize:'10px',marginTop:'3px'}}>✓</span>
              <span style={{fontFamily:F.body,fontSize:'13px',color:'rgba(250,248,243,0.8)',lineHeight:1.5}}>{n}</span>
            </div>
          ))}
        </div>
      </div>

      <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'16px',marginTop:'32px'}}>7.2 2026 Budget Alignment</h3>
      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>Ghana's 2026 national budget identifies six priority areas that map precisely onto BRIDGE's portfolio sectors: infrastructure development, financial sector strengthening, healthcare capacity, technology and digitization, agricultural transformation, and education and skills development. This alignment is not coincidental — it reflects the analytical convergence of independent assessments of Ghana's highest-impact development opportunities.</p>
      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>For government, BRIDGE represents an opportunity to mobilize private capital behind budget priorities without fiscal expansion. For BRIDGE, government budget alignment provides co-investment potential, regulatory facilitation, and the institutional credibility that comes from operating in demonstrably aligned relationship with national priorities.</p>

      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',marginBottom:'32px'}} className="tc">
        {[
          {priority:'2026 Budget Priority',color:C.forest,items:['Infrastructure investment','Financial sector reform','Healthcare capacity','Digital transformation','Agricultural value chains','Education and skills']},
          {priority:'BRIDGE Portfolio',color:C.positive,items:['Infrastructure & Built Environment','Financial Inclusion & FinTech','Health Systems & Medical','Technology & Innovation','Agriculture & Value Chains','Education & Skills Development']},
          {priority:'Shared Outcomes',color:C.amber,items:['Market efficiency gains','SME credit access','Healthcare worker retention','Digital economy participation','Farmer income improvement','Youth employment creation']}
        ].map((c,i)=>(
          <div key={i} style={{border:`2px solid ${c.color}`,padding:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:c.color,marginBottom:'12px'}}>{c.priority}</div>
            {c.items.map((it,j)=>(
              <div key={j} style={{fontFamily:F.body,fontSize:'12px',color:C.muted,paddingBottom:'6px',borderBottom:`1px solid ${C.border}`,marginBottom:'6px'}}>{it}</div>
            ))}
          </div>
        ))}
      </div>

      <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'16px',marginTop:'32px'}}>7.3 Regulatory Environment</h3>
      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>BRIDGE's operational environment is shaped by four key regulatory frameworks, each of which has been strengthened in the past 24 months in ways that reduce operating risk and increase opportunity for scale. Bank of Ghana's Digital Credit Directive (October 2025) provides clear licensing pathways for BRIDGE's fintech portfolio companies. The Securities and Exchange Commission Regulatory Sandbox offers structured pathways for innovative investment products including BRIDGE's proposed diaspora investment certificates. The Ministry of Finance Crowdfunding Guidelines (2024) enable community-level capital mobilization. And the Ghana Investment Promotion Centre's diaspora investment protocols provide preferential registration and tax treatment for qualifying diaspora investments.</p>

      </div>{/* end s7 extra */}
      <FN sec='s7' notes={[
        'Sankofa Initiative formally launched December 2025 under Presidential directive. Institutional architecture per DAOOP establishment documents and Cabinet Memorandum, December 2025.',
        'Bank of Ghana Digital Credit Directive, October 2025. Licensed digital lenders must maintain minimum capital of GHS 2 million, maintain prudential reserve requirements, and report quarterly to Bank of Ghana.',
        '2026 Ghana National Budget Statement, Ministry of Finance. Priority sector identification based on fiscal allocation analysis conducted by BRIDGE Analytics.'
      ]}/>
    </div>
  </div>
  );
};

/* ── §8 CONCLUSIONS ─────────────────────────────────────────────── */
const S8=()=>{
  const[s8RoadOpen,setS8RoadOpen]=useState(false);
  return(
  <div id="s8" className="pad-section" style={{background:C.ink,borderBottom:`1px solid ${C.border}`,scrollMarginTop:"80px"}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <SM sec="§8" label="Conclusions & Recommendations"/>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,36px)',fontWeight:900,color:C.paper,lineHeight:1.15,letterSpacing:'-1px',marginBottom:'32px'}}>The architecture is coherent. The timing is right. The question is whether to act — and when.</h2>

      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:'rgba(250,248,243,0.8)',fontWeight:300,marginBottom:'32px'}}>This paper has argued that Ghana’s development opportunity is an alignment challenge, not a resource shortage. Capital exists in the diaspora and awaits credible deployment vehicles. Expertise exists among Ghanaian professionals abroad and requires structured pathways to connect. Government policy articulates clear national priorities and needs the operational infrastructure to execute them at scale. BRIDGE closes all three alignment gaps through an intelligence architecture — the BRIDGE Impact Score™ — that makes existing resources findable, credible, and deployable.</p>

      <StatStrip stats={[{v:'96',l:'Pages of analysis'},{v:'174+',l:'Ventures assessed'},{v:'12',l:'Sectors mapped'},{v:'$100M',l:'Target capitalisation'}]} dark={true}/>

      <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.paper,marginBottom:'16px',marginTop:'32px'}}>8.1 The 36-Month Implementation Roadmap</h3>

      <button className="mob-show mob-toggle mob-toggle-dark" onClick={()=>setS8RoadOpen(o=>!o)} style={{marginBottom:'8px'}}>
        <span>{s8RoadOpen?'Collapse roadmap ↑':'View 36-month roadmap phases ↓'}</span>
      </button>
      <div className={s8RoadOpen?'':'mob-item-hidden'} style={{marginBottom:'32px'}}>
        {[
          {phase:'Phase 1: Foundation',period:'Months 1-12',color:C.lime,items:['Complete capital raise — $30-40M first close','Legal entity establishment: BRIDGE PBC (US) + Ghana Company Limited by Guarantee','BRIDGE Impact Score™ validation — independent review','First 3 Core priority investments deployed','Kejetia Market digitization Phase 1 launched','Diaspora Connect platform live — 100+ professionals registered','Government MOU signed with DAOOP and GIPC']},
          {phase:'Phase 2: Deployment',period:'Months 13-24',color:'rgba(184,217,53,0.6)',items:['Full capital deployment — $100M+ total raise','All 12 sectors with active portfolio companies','174+ ventures re-scored with live data','BRIDGE Intelligence platform launched for Members','First annual impact report published','50+ portfolio companies operating','5,000+ direct beneficiaries tracked']},
          {phase:'Phase 3: Scale & Replication',period:'Months 25-36',color:'rgba(184,217,53,0.3)',items:['Portfolio maturation — first exits and distributions','Fund II pipeline development ($250-300M)','Replication framework for other African markets','100+ portfolio companies','25,000+ direct beneficiaries','Demonstrable movement on Peace & Prosperity metrics','BRIDGE as recognized model for diaspora-driven development']}
        ].map((p,i)=>(
          <div key={i} style={{borderLeft:`4px solid ${p.color}`,paddingLeft:'20px',marginBottom:'24px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'8px'}}>
              <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.paper}}>{p.phase}</div>
              <div style={{fontFamily:F.mono,fontSize:'11px',color:p.color}}>{p.period}</div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'4px'}}>
              {p.items.map((it,j)=>(
                <div key={j} style={{display:'flex',gap:'8px',alignItems:'flex-start'}}>
                  <span style={{color:p.color,flexShrink:0,fontSize:'10px',marginTop:'3px'}}>→</span>
                  <span style={{fontFamily:F.body,fontSize:'11px',color:'rgba(250,248,243,0.6)',lineHeight:1.5}}>{it}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.paper,marginBottom:'16px',marginTop:'32px'}}>8.2 Recommendations for Each Stakeholder Group</h3>

      {/* Desktop 2-col grid */}
      <div className="desk-only" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'32px'}}>
        {[
          {group:'Government of Ghana',color:C.lime,recs:['Formally designate BRIDGE as operational partner to Sankofa Initiative','Co-invest modest government capital to signal institutional commitment','Provide regulatory facilitation and expedited licensing for portfolio companies','Share anonymized public data enabling enhanced BRIDGE Impact Score™ accuracy','Integrate BRIDGE methodology into national development planning processes']},
          {group:'Development Finance Institutions',color:'rgba(184,217,53,0.7)',recs:['Commit $25-40M concessional capital as second-loss layer to catalyze commercial participation','Provide technical assistance on impact measurement and blended finance structuring','Leverage DFI-government relationships to facilitate BRIDGE partnership agreements','Disseminate BRIDGE model learnings to peer institutions and government partners','Co-fund evaluation studies generating transferable evidence on diaspora investment effectiveness']},
          {group:'Ghana Diaspora',color:'rgba(184,217,53,0.5)',recs:['Invest through BRIDGE Ventures — minimum thresholds designed for accessibility','Register on BRIDGE Connect as professional advisor or mentor','Activate professional networks for market access and partnership introductions','Mobilize hometown associations and community networks','Provide feedback through Diaspora Advisory Council on platform effectiveness']},
          {group:'Commercial Investors',color:'rgba(184,217,53,0.3)',recs:['Co-invest $20-30M alongside diaspora layer in blended finance structure','Provide governance expertise through portfolio company board participation','Facilitate follow-on capital for highest-performing portfolio companies','Share risk management and portfolio construction expertise','Champion BRIDGE model in impact investing and frontier market communities']}
        ].map((s,i)=>(
          <div key={i} style={{background:'rgba(255,255,255,0.04)',padding:'16px',borderTop:`3px solid ${s.color}`}}>
            <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:s.color,marginBottom:'12px',letterSpacing:'1px',textTransform:'uppercase'}}>{s.group}</div>
            {s.recs.map((r,j)=>(
              <div key={j} style={{display:'flex',gap:'8px',marginBottom:'8px'}}>
                <span style={{color:s.color,flexShrink:0,fontSize:'10px',marginTop:'3px'}}>→</span>
                <span style={{fontFamily:F.body,fontSize:'11px',color:'rgba(250,248,243,0.65)',lineHeight:1.5}}>{r}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Mobile: swipe carousel */}
      <div className="mob-car-wrap" style={{display:'none',marginBottom:'24px'}}>
        <div className="mob-car-rail">
          {[
            {group:'Government of Ghana',color:C.lime,recs:['Formally designate BRIDGE as Sankofa Initiative operational partner','Co-invest government capital to signal institutional commitment','Provide regulatory facilitation and expedited licensing','Share anonymized public data to enhance BRIDGE Impact Score™','Integrate BRIDGE methodology into national development planning']},
            {group:'Development Finance Institutions',color:'rgba(184,217,53,0.7)',recs:['Commit $25-40M concessional capital as second-loss layer','Provide technical assistance on impact measurement','Leverage DFI-government relationships for BRIDGE partnerships','Disseminate BRIDGE model learnings to peer institutions','Co-fund evaluation studies on diaspora investment effectiveness']},
            {group:'Ghana Diaspora',color:'rgba(184,217,53,0.5)',recs:['Invest through BRIDGE Ventures — from $10K','Register on BRIDGE Connect as advisor or mentor','Activate networks for market access and introductions','Mobilize hometown associations and community networks','Provide feedback through the Diaspora Advisory Council']},
            {group:'Commercial Investors',color:'rgba(184,217,53,0.3)',recs:['Co-invest $20-30M alongside the diaspora layer','Contribute governance expertise to portfolio company boards','Facilitate follow-on capital for top performers','Share risk management and portfolio construction expertise','Champion BRIDGE in the impact investing community']}
          ].map((s,i)=>(
            <div key={i} className="mob-car-card" style={{background:'rgba(255,255,255,0.04)',padding:'18px',borderTop:`3px solid ${s.color}`}}>
              <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:s.color,marginBottom:'14px',letterSpacing:'0.5px',textTransform:'uppercase'}}>{s.group}</div>
              {s.recs.map((r,j)=>(
                <div key={j} style={{display:'flex',gap:'8px',marginBottom:'10px'}}>
                  <span style={{color:s.color,flexShrink:0,fontSize:'11px',marginTop:'2px'}}>→</span>
                  <span style={{fontFamily:F.body,fontSize:'13px',color:'rgba(250,248,243,0.7)',lineHeight:1.55}}>{r}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(255,255,255,0.3)',textAlign:'center',marginTop:'8px',letterSpacing:'1px'}}>← swipe →</div>
      </div>

      <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.paper,marginBottom:'16px',marginTop:'32px'}}>8.3 The Case for Urgency</h3>
      <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:'rgba(250,248,243,0.8)',fontWeight:300,marginBottom:'18px'}}>Every year without effective diaspora mobilization represents $415 million in brain drain losses, $6.65+ billion in remittances financing consumption rather than investment, and another cohort of Ghanaian youth measuring success by ability to emigrate. The convergence of conditions that make BRIDGE possible — government receptivity through Sankofa, diaspora wealth at historic highs, regulatory infrastructure maturing, technology enabling new models — is not permanent. These windows close. The 36-month roadmap in §8.1 is designed to move decisively while this window is open.</p>

      <PQ quote='BRIDGE is necessary because alternatives have not worked at scale. It is necessary because the cost of inaction is unacceptable. It is necessary because Ghana deserves better — and because, for the first time, the architecture to deliver better is within reach.' attr="BRIDGE Working Paper No. 01, Conclusions"/>

      <div style={{borderTop:`1px solid rgba(255,255,255,0.1)`,paddingTop:'32px',marginTop:'40px'}}>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.3)',marginBottom:'16px'}}>From the Research Team</div>
        <p style={{fontFamily:F.body,fontSize:'14px',lineHeight:1.9,color:'rgba(250,248,243,0.6)',fontStyle:'italic',fontWeight:300}}>This paper represents the most rigorous public articulation of BRIDGE's intellectual foundation. The 174+ venture scores, the sector analyses, the capital architecture, and the implementation roadmap are not theoretical — they are the living documentation of an organization's analytical process made transparent and accountable. Members who engage with the full methodology workbooks (Appendix B) will find that every number cited here has a data source, every claim has a citation, and every recommendation has an analytical foundation. That is the BRIDGE commitment: intelligence that is not just useful, but auditable.</p>
      </div>
    </div>
  </div>
  );
};

/* ── APPENDIX ───────────────────────────────────────────────────── */
const Appendix=()=>{
  const[bibOpen,setBibOpen]=useState(false);
  return(
  <div id="appendix" className="pad-section" style={{background:C.paperDark,borderBottom:`1px solid ${C.border}`,scrollMarginTop:"80px"}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <SM sec="App." label="References & Appendices"/>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,36px)',fontWeight:900,color:C.ink,lineHeight:1.15,letterSpacing:'-1px',marginBottom:'32px'}}>Sources, methodology, and the full venture database.</h2>

      <div className='appendix-grid tc' style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',marginBottom:'40px'}}>
        {[
          {app:'Appendix A',title:'Full Venture Database',desc:'Complete scoring records for all 174+ ventures assessed by BRIDGE Analytics as of Q4 2025. Each record includes sector classification, BRIDGE Impact Score™ composite and sub-scores, primary data sources, scoring analyst, date of assessment, and current status (Core, Emerging, Growth, or Watch List).',access:'Available to Members in digital supplement. Updated quarterly.'},
          {app:'Appendix B',title:'Methodology Workbooks',desc:'Detailed scoring workbooks for each of the four BRIDGE Impact Score™ dimensions. Includes question sets, response scales, data source requirements, and scoring algorithms. Structured to enable independent replication of any score produced by BRIDGE Analytics.',access:'Members digital supplement. Independently reviewed annually.'},
          {app:'Appendix C',title:'Primary Data Sources',desc:'Complete bibliography of primary data sources used in sector analyses and venture scoring. Includes World Bank databases, Ghana Statistical Service surveys, sector ministry reports, independent market research, and BRIDGE primary surveys. All citations are page-level where available.',access:'Available to all readers in the following section of this document.'},
          {app:'Appendix D',title:'Legal & Governance Documents',desc:'BRIDGE PBC Articles of Incorporation, Public Benefit Certificate, Ghana Company Limited by Guarantee registration, Investment Committee charter, and Beneficiary Advisory Council terms of reference. Governance transparency is foundational to BRIDGE\'s institutional credibility.',access:'Available to qualified investors and institutional partners on request.'}
        ].map((a,i)=>(
          <div key={i} style={{border:`1px solid ${C.border}`,padding:'20px',background:C.paper}}>
            <div style={{fontFamily:F.mono,fontSize:'10px',color:C.lime,marginBottom:'4px'}}>{a.app}</div>
            <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:800,color:C.ink,marginBottom:'10px'}}>{a.title}</div>
            <p style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.7,marginBottom:'12px'}}>{a.desc}</p>
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'8px',fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.faint}}>{a.access}</div>
          </div>
        ))}
      </div>

      <h3 style={{fontFamily:F.display,fontSize:'22px',fontWeight:700,color:C.ink,marginBottom:'16px',marginTop:'32px'}}>Selected Bibliography</h3>
      <div style={{display:'grid',gridTemplateColumns:'1fr',gap:'0'}}>
        {[
          'Afrobarometer. (2024). Governance and Democratic Satisfaction Survey — Ghana. Accra: Afrobarometer Research Network.',
          'Bank of Ghana. (2025). Digital Credit Directive — Guidelines for Licensed Digital Lenders. Accra: Bank of Ghana.',
          'Ghana Health Service. (2023). Staff Survey: Emigration Intent and Retention Factors. Accra: Ghana Health Service.',
          'Ghana Investment Promotion Centre. (2024). Diaspora Investment Guidelines and Incentive Framework. Accra: GIPC.',
          'Ghana Statistical Service. (2023). Integrated Business Establishment Survey. Accra: GSS.',
          'Hausmann, R., Rodrik, D., & Velasco, A. (2008). Growth Diagnostics. In J. Stiglitz & N. Serra (Eds.), The Washington Consensus Reconsidered. Oxford: Oxford University Press.',
          'Ionescu, D. (2006). Engaging Diasporas as Development Partners for Home and Destination Countries. Geneva: IOM.',
          'Ministry of Finance, Ghana. (2026). Budget Statement and Economic Policy. Accra: Ministry of Finance.',
          'OECD. (2024). Development Co-operation Report: Blended Finance in Developing Countries. Paris: OECD.',
          'Saxenian, A. (2006). The New Argonauts: Regional Advantage in a Global Economy. Cambridge: Harvard University Press.',
          'Sen, A. (1999). Development as Freedom. Oxford: Oxford University Press.',
          'World Bank. (2024). Migration and Development Brief 41: Remittance Flows Reach $685 Billion in 2022. Washington: World Bank.',
          'World Bank. (2024). Financial Inclusion Database — Ghana Country Profile. Washington: World Bank.',
          'World Health Organization. (2023). Density of Physicians, Nurses and Midwives — Country Profiles. Geneva: WHO.'
        ].map((ref,i)=>(
          <div key={i} className={i>=5?(bibOpen?'':'mob-item-hidden'):''} style={{padding:'8px 0',borderBottom:`1px solid ${C.border}`,display:'flex',gap:'12px'}}>
            <span style={{fontFamily:F.mono,fontSize:'9px',color:C.lime,flexShrink:0,paddingTop:'2px'}}>{String(i+1).padStart(2,'0')}.</span>
            <span style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.6}}>{ref}</span>
          </div>
        ))}
      </div>
      <button className="mob-show mob-toggle" onClick={()=>setBibOpen(o=>!o)} style={{marginTop:'4px'}}>
        <span>{bibOpen?'Show less ↑':'View remaining 9 references ↓'}</span>
      </button>
    </div>
  </div>
  );
};

/* ── FOOTER ─────────────────────────────────────────────────────── */
const Footer=()=>(
  <div className='pad-footer' style={{background:C.forest,borderTop:`3px solid ${C.lime}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
        <Logo height={18} variant="white"/>
        <div style={{width:'1px',height:'16px',background:'rgba(255,255,255,0.15)'}}/>
        <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.4)'}}>Working Paper No. 01 · BRIDGE-WP-01-2025 · Members Edition · © 2025 BRIDGE PBC · bridgepbc.com/research</div>
      </div>
      <div style={{display:'flex',gap:'16px'}}>{['Research','Members','Intelligence','Contact','bridgepbc.com'].map((l,i)=>(<a key={i} href="#" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(250,248,243,0.4)',textDecoration:'none'}}>{l}</a>))}</div>
    </div>
  </div>
);

/* ── ROOT ───────────────────────────────────────────────────────── */
export default function WhitePaperFull(){
  const r=useRef(null);
  const[active,setActive]=useState(0);
  const isMobile=useIsMobile();

  // Scroll-sync active section for both topbar tabs and bottom nav
  useEffect(()=>{
    const ids=['cover','s1','s2','s3','s4','s5','s6','s7','s8','appendix'];
    const fn=()=>{
      for(let i=ids.length-1;i>=0;i--){
        const el=document.getElementById(ids[i]);
        if(el&&el.getBoundingClientRect().top<=120){setActive(i);return;}
      }
      setActive(0);
    };
    window.addEventListener('scroll',fn,{passive:true});
    fn();
    return()=>window.removeEventListener('scroll',fn);
  },[]);

  return(
    <div style={{fontFamily:F.body,background:C.paper,paddingBottom:isMobile?'60px':'0'}}>
      <Gf/>
      <ReadingProgressBar coverLogoRef={r} activeSection={active} setActiveSection={setActive} isMobile={isMobile}/>
      {isMobile&&<SectionFooterNav activeSection={active} setActiveSection={setActive}/>}
      <Cover logoRef={r}/>
      <S1/>
      <S2/>
      <S3/>
      <S4/>
      <S5/>
      <S6/>
      <S7/>
      <S8/>
      <Appendix/>
      <Footer/>
    </div>
  );
}
