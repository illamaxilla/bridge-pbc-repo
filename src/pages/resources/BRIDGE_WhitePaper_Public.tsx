import { useState, useEffect, useRef } from "react";

const C={ink:'#0D1A10',paper:'#FAF8F3',paperDark:'#F0EDE4',forest:'#1B4D3E',lime:'#B8D935',limeDark:'#8FA825',muted:'#5C6B5E',faint:'#9AAA9C',border:'#D8D4C8',red:'#A8200D',amber:'#B8730A',positive:'#1A6B2F',white:'#FFFFFF'};
const F={display:'"Playfair Display","Georgia",serif',body:'"Source Serif 4","Georgia",serif',sans:'"DM Sans","Helvetica Neue",sans-serif',mono:'"DM Mono","Courier New",monospace'};

const useIsMobile=()=>{
  const[m,setM]=useState(()=>typeof window!=='undefined'&&window.innerWidth<=600);
  useEffect(()=>{const fn=()=>setM(window.innerWidth<=600);window.addEventListener('resize',fn,{passive:true});return()=>window.removeEventListener('resize',fn);},[]);
  return m;
};

const Logo=({height=28,variant='white'})=>{
  const lf=variant==='white'?'#ffffff':'#1B4D3E';
  const bs=variant==='white'?'#ffffff':'#1B4D3E';
  const bstroke=variant==='white'?'rgba(0,0,0,0.08)':'rgba(27,77,62,0.15)';
  return(
    <svg height={height} viewBox="0 0 3258.5 932.3" xmlns="http://www.w3.org/2000/svg" style={{display:'block',flexShrink:0}}>
      <path fill={lf} d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"/>
      <path fill={lf} stroke={bstroke} strokeWidth="0.5" strokeMiterlimit="10" d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"/>
      <path fill={lf} stroke={bstroke} strokeWidth="0.5" strokeMiterlimit="10" d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"/>
      <rect fill="#b8d935" x="1427.4" y="17.4" width="205.2" height="145"/>
      <rect fill={lf} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/>
      <path fill={lf} d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"/>
      <rect fill={lf} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/>
      <rect fill="#b8d935" x="3083.4" y="339.5" width="175.1" height="257.7"/>
      <rect fill="#b8d935" x="3083.4" y="654.4" width="175.1" height="257.7"/>
      <rect fill="none" stroke={bs} strokeWidth="80" strokeMiterlimit="10" x="40" y="40" width="843.9" height="852.3" rx="36.6" ry="36.6"/>
      <polygon fill="#b8d935" stroke="#1b4d3e" strokeMiterlimit="10" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/>
      <path fill="#74914a" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z"/>
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
sup{font-family:${F.mono};font-size:9px;color:${C.lime};vertical-align:super;margin-left:1px;}
@media print{.np{display:none!important;}}
.tab-row{border-top:1px solid ${C.border};display:flex;overflow-x:auto;scrollbar-width:none;}
.tab-row::-webkit-scrollbar{display:none;}
.mob-show{display:none;}
.pad-footer{padding:20px 80px;}
.pq-text{font-size:20px;}
.pad-cover{padding:64px 64px 64px 80px;}
.pad-section{padding:64px 80px;}
@media(max-width:900px){
  .tc{grid-template-columns:1fr!important;}
  .hm{display:none!important;}
  .pad-cover{padding:40px 32px!important;}
  .pad-section{padding:48px 32px!important;}
  .cover-sidebar{display:none!important;}
}
@media(max-width:600px){
  .tc{grid-template-columns:1fr!important;}
  .hm{display:none!important;}
  .pad-cover{padding:26px 16px 0!important;}
  .pad-section{padding:26px 16px!important;}
  .cover-sidebar{display:none!important;}
  .mob-hide{display:none!important;}
  .mob-show{display:block!important;}
  .mob-flex{display:flex!important;}
  .pq-text{font-size:17px!important;}
  .topbar-inner{padding:8px 16px!important;}
  .tab-row-desktop{display:none!important;}
  .gate-grid{grid-template-columns:1fr!important;}
  .gate-pad{padding:28px 16px!important;}
  .cover-header{padding:10px 16px!important;}
  .pad-footer{padding:16px 18px!important;}
  .score-grid{grid-template-columns:repeat(2,1fr)!important;}
  .inline-gate-grid{grid-template-columns:1fr!important;}
  .tier-grid{grid-template-columns:repeat(2,1fr)!important;}
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
    scrollbar-width:none;-webkit-overflow-scrolling:touch;gap:10px;padding-bottom:2px;
  }
  .mob-car-rail::-webkit-scrollbar{display:none;}
  .mob-car-card{flex:0 0 84vw;scroll-snap-align:start;}
  .mob-car-card-sm{flex:0 0 74vw;scroll-snap-align:start;}
  .desk-only{display:none!important;}
  /* Bottom nav clearance */
  .mob-nav-pad{padding-bottom:64px!important;}
}
`}</style>);


/* ── BOTTOM NAV (mobile only) ─────────────────────────────────────── */
const BottomNav=({active})=>{
  const items=[
    {id:'cover',label:'Cover'},
    {id:'chapter1',label:'§1'},
    {id:'method',label:'§3'},
    {id:'gate',label:'Access'},
  ];
  const go=(id)=>document.getElementById(id)?.scrollIntoView({behavior:'smooth',block:'start'});
  return(
    <div className="np" style={{position:'fixed',bottom:0,left:0,right:0,zIndex:200,background:'rgba(13,26,16,0.97)',borderTop:'1px solid rgba(184,217,53,0.15)',backdropFilter:'blur(8px)',padding:'10px 16px',display:'flex',alignItems:'center',justifyContent:'space-around',paddingBottom:'calc(10px + env(safe-area-inset-bottom))'}}>
      {items.map((it,i)=>(
        <button key={i} onClick={()=>go(it.id)} style={{background:'none',border:'none',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:'3px',padding:'4px 10px'}}>
          <div style={{width:active===i?'20px':'6px',height:'4px',borderRadius:'2px',background:active===i?'#B8D935':'rgba(255,255,255,0.2)',transition:'all 0.3s ease'}}/>
          <span style={{fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'9px',fontWeight:active===i?700:400,color:active===i?'#B8D935':'rgba(255,255,255,0.4)',letterSpacing:'1px',textTransform:'uppercase'}}>{it.label}</span>
        </button>
      ))}
      <a href="#gate" style={{background:'#B8D935',color:'#0D1A10',padding:'8px 16px',fontFamily:'"DM Sans","Helvetica Neue",sans-serif',fontSize:'10px',fontWeight:800,textDecoration:'none',letterSpacing:'0.5px',borderRadius:'2px',whiteSpace:'nowrap'}}>Get Access</a>
    </div>
  );
};

/* ── READING PROGRESS BAR ──────────────────────────────────────────── */
const TopBar=({coverLogoRef})=>{
  const[pct,setPct]=useState(0);
  const[past,setPast]=useState(false);
  useEffect(()=>{
    const fn=()=>{
      const doc=document.documentElement;
      const scrolled=doc.scrollTop||document.body.scrollTop;
      const total=doc.scrollHeight-doc.clientHeight;
      setPct(total>0?Math.min(100,(scrolled/total)*100):0);
      if(coverLogoRef?.current) setPast(coverLogoRef.current.getBoundingClientRect().bottom<0);
    };
    window.addEventListener('scroll',fn,{passive:true});
    fn();
    return()=>window.removeEventListener('scroll',fn);
  },[coverLogoRef]);
  return(
    <div className="np" style={{position:'sticky',top:0,zIndex:100,background:C.paper,borderBottom:`1px solid ${C.border}`,boxShadow:'0 1px 8px rgba(0,0,0,0.06)',overflow:'hidden'}}>
      <div style={{position:'absolute',bottom:0,left:0,height:'2px',width:`${pct}%`,background:C.lime,transition:'width 0.1s linear',pointerEvents:'none',zIndex:10}}/>
      <div className="topbar-inner" style={{padding:'10px 56px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px',minWidth:0,overflow:'hidden'}}>
          <div style={{overflow:'hidden',maxWidth:past?'180px':'0px',opacity:past?1:0,transition:'max-width 0.35s ease,opacity 0.3s ease',display:'flex',alignItems:'center',flexShrink:0}}>
            <Logo height={18} variant="dark"/>
            <div style={{width:'1px',height:'14px',background:C.border,margin:'0 10px',flexShrink:0}}/>
          </div>
          <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:C.muted,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>Research Brief · The Architecture of Opportunity</span>
          <span className="mob-show" style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.forest}}>{Math.round(pct)}%</span>
        </div>
        <div style={{display:'flex',gap:'10px',alignItems:'center',flexShrink:0}}>
          <a href="#gate" className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,textDecoration:'none',whiteSpace:'nowrap'}}>Get Full Access →</a>
          <a href="#gate" style={{background:C.forest,color:C.lime,padding:'7px 16px',fontFamily:F.sans,fontSize:'10px',fontWeight:800,textDecoration:'none',letterSpacing:'0.5px',whiteSpace:'nowrap'}}>Members Access</a>
        </div>
      </div>
    </div>
  );
};

/* ── COVER ─────────────────────────────────────────────────────────── */
const Cover=({logoRef})=>(
  <div id="cover" style={{background:C.paper,minHeight:'100vh',display:'flex',flexDirection:'column',borderBottom:`1px solid ${C.border}`}}>
    <div ref={logoRef} className="cover-header" style={{background:C.forest,padding:'14px 80px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
        <Logo height={22} variant="white"/>
        <div style={{width:'1px',height:'18px',background:'rgba(255,255,255,0.2)'}}/>
        <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.5)'}}>BRIDGE Research Series</span>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
        <span className="mob-hide" style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(255,255,255,0.3)'}}>BRIDGE-WP-01-2025</span>
        <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.lime,border:`1px solid rgba(184,217,53,0.35)`,padding:'2px 8px',letterSpacing:'1px'}}>PUBLIC EXCERPT</span>
      </div>
    </div>
    <div style={{height:'3px',background:C.lime}}/>
    <div style={{flex:1,display:'grid',gridTemplateColumns:'1fr 340px',gap:'0'}} className="tc">
      <div className="pad-cover" style={{borderRight:`1px solid ${C.border}`,display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <div>
          <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'40px'}}>
            <div style={{height:'1px',width:'32px',background:C.lime}}/>
            <span style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted}}>Working Paper · No. 01 · Public Excerpt</span>
          </div>
          <h1 style={{fontFamily:F.display,fontSize:'clamp(32px,5vw,60px)',fontWeight:900,color:C.ink,lineHeight:1.05,letterSpacing:'-2px',marginBottom:'24px'}}>The Architecture<br/><em style={{fontStyle:'italic',color:C.forest}}>of Opportunity</em></h1>
          <h2 style={{fontFamily:F.display,fontSize:'clamp(16px,2vw,22px)',fontWeight:400,fontStyle:'italic',color:C.muted,lineHeight:1.4,marginBottom:'32px'}}>A Framework for Ghana's Integrated Development — Diagnosis, Architecture, and a Path to Peace &amp; Prosperity</h2>
          <div style={{background:C.paperDark,padding:'20px 24px',borderLeft:`4px solid ${C.lime}`,marginBottom:'32px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Abstract</div>
            <p style={{fontFamily:F.body,fontSize:'13px',lineHeight:1.8,color:C.ink,fontWeight:300}}>This paper presents BRIDGE PBC's foundational framework for Ghana's integrated development. Drawing on assessment of 174+ ventures across 12 economic sectors, and analysis of structural constraints affecting 33 million Ghanaians, it proposes a model that connects diaspora capital, institutional reform, and on-the-ground delivery into a single coherent architecture. The central argument: Ghana's development opportunity is not constrained by a resource shortage. It is an alignment gap — and that gap is closable.</p>
            <p style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.muted,marginTop:'8px'}}>Keywords: development finance, Ghana, diaspora capital, BRIDGE Impact Score™, blended finance, alignment gap</p>
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
        </div>
      </div>
      <div className="cover-sidebar" style={{padding:'40px 32px',background:C.paperDark,display:'flex',flexDirection:'column',gap:'0'}}>
        <div style={{marginBottom:'28px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px',borderBottom:`1px solid ${C.border}`,paddingBottom:'6px'}}>Document Info</div>
          {[{l:'Series',v:'Working Paper'},{l:'Number',v:'BRIDGE-WP-01-2025'},{l:'Published',v:'2025'},{l:'Pages',v:'Full: 96pp · Excerpt: 22pp'},{l:'Language',v:'English'},{l:'Access',v:'Excerpt: Open · Full: Members'}].map((d,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:`1px solid ${C.border}`}}>
              <span style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>{d.l}</span>
              <span style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,textAlign:'right',maxWidth:'60%'}}>{d.v}</span>
            </div>
          ))}
        </div>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px',borderBottom:`1px solid ${C.border}`,paddingBottom:'6px'}}>Contents</div>
          {[{n:'Abstract',pg:'02',pub:true},{n:'1. Introduction & Motivation',pg:'04',pub:true},{n:'2. The Alignment Gap Thesis',pg:'08',pub:true},{n:'3. BRIDGE Impact Score™',pg:'16',pub:true},{n:'4. Sector-by-Sector Analysis',pg:'24',pub:false},{n:'5. Capital Architecture',pg:'48',pub:false},{n:'6. Diaspora Integration Model',pg:'62',pub:false},{n:'7. Government Partnership',pg:'72',pub:false},{n:'8. Conclusions & Roadmap',pg:'84',pub:false},{n:'References & Appendices',pg:'90',pub:false}].map((c,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'7px 0',borderBottom:`1px solid ${C.border}`}}>
              <div style={{display:'flex',alignItems:'center',gap:'6px',flex:1}}>
                <div style={{width:'6px',height:'6px',borderRadius:'50%',background:c.pub?C.lime:C.faint,flexShrink:0}}/>
                <span style={{fontFamily:c.pub?F.sans:F.body,fontSize:'11px',color:c.pub?C.ink:C.faint,fontStyle:c.pub?'normal':'italic',fontWeight:c.pub?600:400}}>{c.n}</span>
              </div>
              <span style={{fontFamily:F.mono,fontSize:'10px',color:c.pub?C.muted:C.faint,paddingLeft:'8px'}}>{c.pg}</span>
            </div>
          ))}
          <div style={{marginTop:'12px',display:'flex',alignItems:'center',gap:'8px'}}>
            <div style={{width:'6px',height:'6px',borderRadius:'50%',background:C.lime}}/>
            <span style={{fontFamily:F.sans,fontSize:'10px',color:C.muted}}>Available in this public excerpt</span>
          </div>
        </div>
        {/* Sidebar CTA */}
        <div style={{marginTop:'24px',paddingTop:'20px',borderTop:`1px solid ${C.border}`}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Ready for the full picture?</div>
          <a href="#gate" style={{display:'block',background:C.forest,color:C.lime,padding:'12px 16px',fontFamily:F.sans,fontSize:'11px',fontWeight:800,textDecoration:'none',textAlign:'center',letterSpacing:'0.5px',marginBottom:'8px'}}>Request Members Access →</a>
          <p style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint,lineHeight:1.5,textAlign:'center'}}>Entry from $10K · Professional time welcome · Strategic Partners by invitation</p>
        </div>
      </div>
    </div>
    <div style={{height:'3px',background:C.lime}}/>
  </div>
);

/* ── CHAPTER 1 ─────────────────────────────────────────────────────── */
const Chapter1=()=>{
  const[ch1Open,setCh1Open]=useState(false);
  return(
  <div id="chapter1" className="pad-section" style={{background:C.paper,borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto',display:'grid',gridTemplateColumns:'2fr 1fr',gap:'56px'}} className="tc">
      <div>
        <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}>
          <div style={{height:'1px',width:'24px',background:C.border}}/>
          <span style={{fontFamily:F.mono,fontSize:'9px',color:C.faint,fontStyle:'italic'}}>§1</span>
          <div style={{width:'6px',height:'6px',background:C.lime,borderRadius:'50%'}}/>
          <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted}}>Introduction &amp; Motivation</span>
        </div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(24px,3.5vw,40px)',fontWeight:900,color:C.ink,lineHeight:1.1,letterSpacing:'-1px',marginBottom:'32px'}}>The problem has never been potential. It has always been coordination.</h2>
        <p className="dc" style={{fontFamily:F.body,fontSize:'16px',lineHeight:1.9,color:C.ink,fontWeight:300,marginBottom:'18px'}}>Ghana presents a paradox. A country with robust democratic institutions,<sup>1</sup> a rapidly expanding middle class, and a diaspora of three million people generating upwards of $6.65 billion in annual remittances — yet where 40% of adults remain outside formal financial systems and 56% of trained doctors practice abroad.<sup>2</sup></p>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>Conventional development frameworks attribute this to resource scarcity: insufficient capital, inadequate infrastructure, weak governance. This paper argues the diagnosis is wrong. The constraints are primarily informational and coordinative — a systematic failure to route existing resources, talent, and energy to their highest-impact applications.</p>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>The BRIDGE framework proposes a different model. Rather than identifying new sources of capital, it proposes an intelligence infrastructure that makes existing capital — diaspora savings, DFI commitments, government budgets, private equity — work in coordinated alignment with Ghana's genuine opportunity architecture.<sup>3</sup></p>
        <div style={{borderLeft:`4px solid ${C.lime}`,paddingLeft:'24px',margin:'32px 0'}}>
          <p className="pq-text" style={{fontFamily:F.display,fontSize:'20px',fontStyle:'italic',fontWeight:600,color:C.forest,lineHeight:1.5}}>"The gap between Ghana's potential and its outcomes is not a funding gap. It is an intelligence gap. And intelligence gaps, unlike funding gaps, can be closed without waiting for external actors."</p>
          <div style={{marginTop:'10px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,color:C.muted,letterSpacing:'1px',textTransform:'uppercase'}}>— BRIDGE Working Paper No. 01, p.6</div>
        </div>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>This paper proceeds in eight sections. Sections 2 and 3 develop the theoretical framework and methodology. Sections 4 through 7 apply that framework across Ghana's twelve priority sectors, generating sector-specific investment theses, risk analyses, and policy recommendations. Section 8 synthesises the findings into a concrete 36-month implementation roadmap.</p>
        <button className="mob-show mob-toggle" onClick={()=>setCh1Open(o=>!o)}>
          <span>{ch1Open?'Show less ↑':'Continue reading ↓'}</span>
        </button>
        <div className={ch1Open?'':'mob-item-hidden'}>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:C.ink,fontWeight:300,marginBottom:'18px'}}>Ghana has conducted seven consecutive peaceful democratic transitions since 1992. It hosts a diaspora generating remittances that dwarf foreign direct investment. It has a young, entrepreneurial, highly educated population. And yet, the potential sits largely untapped — not because actors lack goodwill, but because no single institution holds the intelligence architecture to connect them effectively.</p>
        </div>{/* end ch1 collapse */}
        <div style={{borderTop:`1px solid ${C.border}`,marginTop:'40px',paddingTop:'16px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.faint,marginBottom:'10px'}}>Notes</div>
          {['Ghana has conducted seven consecutive peaceful democratic transitions since 1992, placing it in the top quartile of Sub-Saharan African countries on governance indicators (Afrobarometer, 2024).','World Bank Financial Inclusion Database, 2024; Ghana Health Service Staff Survey, 2023. The doctor-to-patient ratio stands at approximately 1:6,000 against a WHO recommended 1:1,000.','This aligns with recent literature on "development intelligence" frameworks. See Hausmann et al. (2022) on the primacy of diagnostic precision over capital mobilisation in middle-income country transitions.'].map((fn,i)=>(
            <div key={i} style={{display:'flex',gap:'10px',marginBottom:'8px',alignItems:'flex-start'}}>
              <span style={{fontFamily:F.mono,fontSize:'10px',color:C.lime,flexShrink:0,paddingTop:'2px'}}>{i+1}.</span>
              <span style={{fontFamily:F.body,fontSize:'11px',color:C.faint,lineHeight:1.6}}>{fn}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hm">
        <div style={{position:'sticky',top:'80px',display:'flex',flexDirection:'column',gap:'24px'}}>
          <div style={{border:`1px solid ${C.border}`,padding:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Key Figures</div>
            {[{v:'3M',l:'Ghanaians in diaspora'},{v:'$6.65B+',l:'Annual remittances'},{v:'40%',l:'Adults unbanked'},{v:'56%',l:'Doctors practising abroad'},{v:'1:6,000',l:'Doctor-to-patient ratio'},{v:'174+',l:'Ventures in BRIDGE database'}].map((d,i)=>(
              <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:i<5?`1px solid ${C.border}`:'none'}}>
                <span style={{fontFamily:F.sans,fontSize:'11px',color:C.muted}}>{d.l}</span>
                <span style={{fontFamily:F.mono,fontSize:'12px',color:C.forest,fontWeight:500}}>{d.v}</span>
              </div>
            ))}
          </div>
          <div style={{background:C.ink,padding:'16px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,marginBottom:'10px'}}>What's in the Full Paper</div>
            {['§4 — 12-sector deep-dives','§5 — Capital deployment models','§6 — Diaspora integration','§7 — Government partnerships','§8 — 36-month roadmap'].map((s,i)=>(<div key={i} style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(250,248,243,0.5)',paddingBottom:'5px',borderBottom:i<4?'1px solid rgba(255,255,255,0.06)':'none',marginBottom:'5px'}}>{s}</div>))}
            <a href="#gate" style={{display:'block',marginTop:'14px',background:C.lime,color:C.ink,padding:'9px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:800,textDecoration:'none',textAlign:'center'}}>Get Full Access →</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

/* ── METHODOLOGY PREVIEW ───────────────────────────────────────────── */
const MethodPreview=()=>(
  <div id="method" className="pad-section" style={{background:C.paperDark,borderBottom:`1px solid ${C.border}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto'}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}>
        <div style={{height:'1px',width:'24px',background:C.border}}/>
        <span style={{fontFamily:F.mono,fontSize:'9px',color:C.faint,fontStyle:'italic'}}>§3</span>
        <div style={{width:'6px',height:'6px',background:C.lime,borderRadius:'50%'}}/>
        <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted}}>BRIDGE Impact Score™ Methodology</span>
      </div>
      <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3vw,34px)',fontWeight:900,color:C.ink,lineHeight:1.15,letterSpacing:'-1px',marginBottom:'32px'}}>A composite score. Four dimensions. Rigorous, reproducible, actionable.</h2>
      {/* Desktop 4-col */}
      <div className="desk-only" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'2px',marginBottom:'40px'}}>
        {[{n:'Market Opportunity',w:'30%',d:'Total addressable market size, competitive density, price point accessibility, and distribution infrastructure maturity.',ex:'Financial inclusion scores high — 40% adult exclusion represents a large, accessible, underserved market.'},{n:'Development Impact',w:'30%',d:'Primary and secondary effects on Ghanaian household welfare, employment generation, supply chain integration, and community resilience.',ex:'Agriculture scores highest on development impact — directly affects 30%+ of the labour force.'},{n:'Implementation Feasibility',w:'25%',d:'Regulatory environment clarity, infrastructure dependency, management talent availability, and timeline to first positive impact.',ex:'Technology scores medium on feasibility — talent is available but infrastructure dependency creates execution risk.'},{n:'Financial Sustainability',w:'15%',d:'Path to positive cash flow, risk-adjusted return profile, exit liquidity, and alignment with commercial capital benchmarks.',ex:'Infrastructure scores lower on sustainability — longer payback periods require patient, development-oriented capital.'}].map((d,i)=>(
          <div key={i} style={{background:C.paper,padding:'20px',borderTop:`3px solid ${i===0||i===1?C.lime:i===2?C.limeDark:'rgba(184,215,53,0.4)'}`}}>
            <div style={{fontFamily:F.mono,fontSize:'10px',color:C.lime,marginBottom:'6px'}}>×{d.w}</div>
            <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:800,color:C.ink,marginBottom:'10px',lineHeight:1.3}}>{d.n}</div>
            <div style={{fontFamily:F.body,fontSize:'12px',color:C.muted,lineHeight:1.6,marginBottom:'12px'}}>{d.d}</div>
            <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'10px',fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.faint,lineHeight:1.5}}>{d.ex}</div>
          </div>
        ))}
      </div>
      {/* Mobile carousel */}
      <div className="mob-car-wrap" style={{display:'none',marginBottom:'24px'}}>
        <div className="mob-car-rail">
          {[
            {n:'Market Opportunity',w:'30%',d:'Total addressable market size, competitive density, price accessibility, and distribution infrastructure maturity.',ex:'Financial inclusion scores high — 40% adult exclusion is a large, accessible, underserved market.',c:C.lime},
            {n:'Development Impact',w:'30%',d:'Primary and secondary effects on Ghanaian household welfare, employment generation, and community resilience.',ex:'Agriculture scores highest — directly affects 30%+ of the labour force.',c:C.lime},
            {n:'Implementation Feasibility',w:'25%',d:'Regulatory clarity, infrastructure dependency, talent availability, and timeline to first positive impact.',ex:'Technology scores medium — talent available but infrastructure dependency creates execution risk.',c:C.limeDark},
            {n:'Financial Sustainability',w:'15%',d:'Path to positive cash flow, risk-adjusted return profile, exit liquidity, and alignment with commercial capital.',ex:'Infrastructure scores lower — longer payback periods require patient capital.',c:'rgba(184,215,53,0.5)'}
          ].map((d,i)=>(
            <div key={i} className="mob-car-card" style={{background:C.paper,padding:'18px',borderTop:`3px solid ${d.c}`}}>
              <div style={{fontFamily:F.mono,fontSize:'10px',color:C.lime,marginBottom:'6px'}}>×{d.w}</div>
              <div style={{fontFamily:F.sans,fontSize:'15px',fontWeight:800,color:C.ink,marginBottom:'12px',lineHeight:1.3}}>{d.n}</div>
              <div style={{fontFamily:F.body,fontSize:'14px',color:C.muted,lineHeight:1.65,marginBottom:'14px'}}>{d.d}</div>
              <div style={{borderTop:`1px solid ${C.border}`,paddingTop:'10px',fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.faint,lineHeight:1.5}}>{d.ex}</div>
            </div>
          ))}
        </div>
        <div style={{fontFamily:F.sans,fontSize:'10px',color:C.faint,textAlign:'center',marginTop:'8px',letterSpacing:'1px'}}>← swipe →</div>
      </div>
      <div style={{background:C.paper,padding:'20px 24px',borderLeft:`4px solid ${C.lime}`,display:'flex',gap:'24px',flexWrap:'wrap',alignItems:'center'}}>
        <div style={{flex:1,minWidth:'240px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'4px'}}>Scoring Output</div>
          <p style={{fontFamily:F.body,fontSize:'13px',color:C.ink,lineHeight:1.7,fontWeight:300}}>Each venture receives a composite score from 0–100. Scores ≥75 indicate Core priority. Scores 60–74 indicate Emerging tier. Below 60 indicates Growth designation. The methodology is fully reproducible — each sub-score is documented with primary source citations. Members access the complete scoring framework and individual venture workbooks.</p>
        </div>
        <div style={{flexShrink:0,textAlign:'center'}}>
          <div style={{fontFamily:F.mono,fontSize:'48px',color:C.forest,lineHeight:1}}>174+</div>
          <div style={{fontFamily:F.sans,fontSize:'10px',color:C.muted,marginTop:'4px'}}>Ventures scored</div>
        </div>
      </div>
    </div>
  </div>
);

/* ── INLINE GATE — interrupts mid-content ──────────────────────────── */
const InlineGate=()=>(
  <div className="pad-section" style={{background:C.ink,borderTop:`1px solid rgba(184,217,53,0.15)`,borderBottom:`1px solid rgba(184,217,53,0.15)`}}>
    <div style={{maxWidth:'900px',margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'40px',alignItems:'center'}} className="inline-gate-grid tc">
      <div>
        <div style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'12px'}}>You've seen the framework.</div>
        <h3 style={{fontFamily:F.display,fontSize:'clamp(20px,2.5vw,30px)',fontWeight:900,color:C.paper,lineHeight:1.15,letterSpacing:'-0.5px',marginBottom:'12px'}}>The sector analysis starts on page 24.</h3>
        <p style={{fontFamily:F.body,fontSize:'14px',color:'rgba(250,248,243,0.55)',lineHeight:1.75,fontWeight:300,marginBottom:'0'}}>12 sectors. 174+ ventures individually scored. Capital deployment models across four engagement approaches. The complete 36-month implementation roadmap. All in the Members edition.</p>
      </div>
      <div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginBottom:'20px'}}>
          {[{v:'12',l:'Sectors analysed'},{v:'174+',l:'Ventures scored'},{v:'$100M',l:'Capital architecture'},{v:'36 mo.',l:'Implementation roadmap'}].map((s,i)=>(
            <div key={i} style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',padding:'12px 14px'}}>
              <div style={{fontFamily:F.display,fontSize:'24px',fontWeight:900,color:C.lime,lineHeight:1}}>{s.v}</div>
              <div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(255,255,255,0.4)',marginTop:'4px'}}>{s.l}</div>
            </div>
          ))}
        </div>
        <a href="#gate" style={{display:'block',background:C.lime,color:C.ink,padding:'13px 20px',fontFamily:F.sans,fontSize:'12px',fontWeight:800,textDecoration:'none',textAlign:'center',letterSpacing:'0.3px'}}>Request Members Access →</a>
        <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:'rgba(255,255,255,0.2)',textAlign:'center',marginTop:'8px'}}>Entry from $10K · $50K · $250K · $1M+ · or professional time commitment</div>
      </div>
    </div>
  </div>
);

/* ── GATE — full CTA section ───────────────────────────────────────── */
const Gate=()=>{
  const[intent,setIntent]=useState(null);
  return(
  <div id="gate" style={{background:C.ink,position:'relative',overflow:'hidden'}}>
    {/* Watermark */}
    <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:F.display,fontSize:'clamp(60px,12vw,140px)',fontWeight:900,color:'rgba(255,255,255,0.02)',pointerEvents:'none',userSelect:'none',letterSpacing:'-6px'}}>MEMBERS</div>

    <div className="gate-pad" style={{padding:'64px 80px',position:'relative'}}>
      <div style={{maxWidth:'900px',margin:'0 auto'}}>

        {/* Header */}
        <div style={{borderTop:`6px solid ${C.paper}`,borderBottom:`2px solid ${C.lime}`,paddingBottom:'3px',marginBottom:'28px'}}/>
        <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>Members Intelligence — Full Edition</div>
        <h2 style={{fontFamily:F.display,fontSize:'clamp(26px,4vw,48px)',fontWeight:900,fontStyle:'italic',color:C.paper,lineHeight:1.05,letterSpacing:'-1.5px',marginBottom:'16px'}}>
          You've read the argument.<br/>
          <span style={{color:C.lime}}>Now see the evidence.</span>
        </h2>
        <p style={{fontFamily:F.body,fontSize:'15px',lineHeight:1.85,color:'rgba(250,248,243,0.5)',fontWeight:300,maxWidth:'620px',marginBottom:'36px'}}>The public excerpt establishes the case. The full 96-page working paper delivers the proof: 12 sectors fully analysed, 174+ ventures individually scored, four capital deployment models detailed, and a concrete 36-month roadmap for BRIDGE's implementation in Ghana.</p>

        {/* What's locked grid */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px',marginBottom:'32px',background:'rgba(255,255,255,0.06)'}} className="gate-grid">
          {[
            {sec:'§4',title:'Sector-by-Sector Analysis',desc:'12 priority sectors. Each with sub-sector breakdown, investment thesis, market sizing, risk profile, and BRIDGE Impact Score™ for every identified venture.',pg:'pp. 24–47'},
            {sec:'§5',title:'Capital Architecture',desc:'Four deployment models. Complete blended finance stack. Sector capital allocation. 10-year return projections with scenario analysis.',pg:'pp. 48–61'},
            {sec:'§6',title:'Diaspora Integration Model',desc:'Four engagement pathways. Brain circulation framework. Mobilization strategy. Full diaspora value proposition with financial and non-financial return analysis.',pg:'pp. 62–71'},
            {sec:'§7',title:'Government Partnership',desc:'Sankofa Initiative alignment. 2026 Budget co-investment opportunities. Regulatory environment analysis. BRIDGE-government operational model.',pg:'pp. 72–83'},
            {sec:'§8',title:'Conclusions & 36-Month Roadmap',desc:'Phase-by-phase implementation. Milestone targets. Stakeholder recommendations. The urgency case with quantified cost-of-inaction analysis.',pg:'pp. 84–89'},
            {sec:'App.',title:'Full Venture Database + Methodology',desc:'174+ ventures with individual BRIDGE Impact Score™ workbooks. Complete bibliography. Reproducible scoring methodology.',pg:'pp. 90–96'},
          ].map((s,i)=>(
            <div key={i} style={{background:'rgba(255,255,255,0.03)',padding:'18px 20px',borderLeft:i%2===0?'none':'1px solid rgba(255,255,255,0.06)',borderTop:i>=2?'1px solid rgba(255,255,255,0.06)':'none'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'6px'}}>
                <span style={{fontFamily:F.mono,fontSize:'11px',fontWeight:700,color:C.lime}}>{s.sec}</span>
                <span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.2)'}}>{s.pg}</span>
              </div>
              <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper,marginBottom:'6px'}}>{s.title}</div>
              <div style={{fontFamily:F.body,fontSize:'11px',color:'rgba(250,248,243,0.4)',lineHeight:1.6,fontStyle:'italic'}}>{s.desc}</div>
            </div>
          ))}
        </div>

        {/* Membership tiers strip */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1px',background:'rgba(255,255,255,0.06)',marginBottom:'28px'}}>
          {[
            {tier:'Engaged',price:'$10K',note:'LP rights · Quarterly reporting'},
            {tier:'Contributing',price:'$50K',note:'Co-investment access · Deal flow'},
            {tier:'Investing',price:'$250K',note:'Direct deal rights · Advisory Council'},
            {tier:'Strategic',price:'$1M+',note:'Board eligibility · Named programmes'},
          ].map((t,i)=>(
            <div key={i} style={{background:'rgba(255,255,255,0.03)',padding:'12px 14px'}}>
              <div style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.lime,marginBottom:'3px'}}>{t.price}</div>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.paper,marginBottom:'4px'}}>{t.tier}</div>
              <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:'rgba(250,248,243,0.35)',lineHeight:1.4}}>{t.note}</div>
            </div>
          ))}
        </div>
        <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:'rgba(255,255,255,0.25)',marginBottom:'20px'}}>Professional Contributors (10+ hrs/quarter) and General Community (free) also welcome. All tiers reviewed individually.</div>

        {/* Intent selector */}
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:'12px'}}>I am a —</div>
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'24px'}}>
          {['Diaspora Investor','Development Finance Institution','Government Partner','Researcher / Academic','Other'].map((opt)=>(
            <button key={opt} onClick={()=>setIntent(opt)} style={{background:intent===opt?'rgba(184,217,53,0.12)':'rgba(255,255,255,0.04)',border:intent===opt?`1.5px solid ${C.lime}`:'1px solid rgba(255,255,255,0.1)',padding:'8px 16px',fontFamily:F.sans,fontSize:'11px',fontWeight:intent===opt?700:400,color:intent===opt?C.lime:'rgba(250,248,243,0.5)',cursor:'pointer',transition:'all 0.2s'}}>{opt}</button>
          ))}
        </div>

        {/* Dynamic message based on intent */}
        {intent&&(
          <div style={{background:'rgba(184,217,53,0.06)',border:`1px solid rgba(184,217,53,0.2)`,padding:'16px 20px',marginBottom:'24px'}}>
            <p style={{fontFamily:F.body,fontSize:'13px',color:'rgba(250,248,243,0.7)',lineHeight:1.7,fontStyle:'italic'}}>
              {intent==='Diaspora Investor'&&'Investment tiers start at $10K (Engaged Member) through $50K, $250K, and $1M+ (Strategic Partner). Each tier includes LP rights, quarterly reporting, and co-investment access. Full venture pipeline and BRIDGE Impact Score™ workbooks included.'}
              {intent==='Development Finance Institution'&&'Concessional capital partners receive full blended finance architecture documentation, co-investment landscape analysis, and 2026 Ghana Budget alignment mapping. Target: $25-40M second-loss position at 3-6% returns with 7-10 year tenor.'}
              {intent==='Government Partner'&&'Strategic Partner access (by invitation) includes the full Sankofa Initiative alignment analysis, 2026 Budget co-investment opportunities, and BRIDGE\'s government partnership operational model. Co-branding and named programme opportunities available.'}
              {intent==='Researcher / Academic'&&'Contributing Member access ($500-$2,000/year or 10+ hours quarterly) includes the complete BRIDGE Impact Score™ methodology workbooks, full primary data source bibliography, and reproducible scoring framework for all 174+ ventures.'}
              {intent==='Other'&&'Membership ranges from free General Community access through Engaged ($10K), Investing ($50K / $250K), and Strategic Partner ($1M+, by invitation). Professional Contributors welcome at $500-$2,000/year or 10+ hrs/quarter. Tell us what you\'re working on and we\'ll find the right fit.'}
            </p>
          </div>
        )}

        {/* Primary CTA */}
        <div style={{display:'flex',gap:'12px',flexWrap:'wrap',marginBottom:'32px'}}>
          <a href="mailto:intelligence@bridgepbc.com?subject=Members Access Request — Architecture of Opportunity" style={{background:C.lime,color:C.ink,padding:'14px 28px',fontFamily:F.sans,fontSize:'13px',fontWeight:800,textDecoration:'none',letterSpacing:'0.3px',whiteSpace:'nowrap'}}>
            Request Members Access →
          </a>
          <a href="#" style={{border:`1px solid rgba(255,255,255,0.15)`,color:C.paper,padding:'14px 22px',fontFamily:F.sans,fontSize:'12px',fontWeight:600,textDecoration:'none',whiteSpace:'nowrap'}}>
            All BRIDGE Research →
          </a>
        </div>

        {/* Trust signals */}
        <div style={{borderTop:'1px solid rgba(255,255,255,0.08)',paddingTop:'20px',display:'flex',gap:'32px',flexWrap:'wrap'}}>
          {[{v:'96pp',l:'Full working paper'},{v:'174+',l:'Ventures individually scored'},{v:'12',l:'Priority sectors covered'},{v:'BRIDGE-WP-01',l:'Research series, No. 01'}].map((s,i)=>(
            <div key={i}>
              <div style={{fontFamily:F.mono,fontSize:'16px',fontWeight:700,color:C.lime,lineHeight:1}}>{s.v}</div>
              <div style={{fontFamily:F.sans,fontSize:'9px',color:'rgba(255,255,255,0.3)',marginTop:'3px'}}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Urgency strip */}
        <div style={{marginTop:'24px',border:`1px solid ${C.amber}`,background:'rgba(184,115,10,0.06)',padding:'12px 18px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'10px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px',flexWrap:'wrap'}}>
            <span style={{fontFamily:F.mono,fontSize:'10px',fontWeight:700,color:C.amber,letterSpacing:'1.5px',textTransform:'uppercase',flexShrink:0}}>⚡ Q2 2026</span>
            <div style={{width:'1px',height:'20px',background:'rgba(184,115,10,0.35)',flexShrink:0}}/>
            <span style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.paper}}>2026 Ghana Budget co-investment window is open now — first-mover positioning matters.</span>
          </div>
          <a href="mailto:intelligence@bridgepbc.com?subject=Q2 2026 Urgency — Members Access" style={{background:C.amber,color:C.white,padding:'8px 18px',fontFamily:F.sans,fontSize:'11px',fontWeight:800,textDecoration:'none',flexShrink:0,whiteSpace:'nowrap'}}>Enquire Now →</a>
        </div>

      </div>
    </div>
  </div>
);
};

const Footer=()=>(
  <div className="pad-footer" style={{background:C.forest,borderTop:`3px solid ${C.lime}`}}>
    <div style={{maxWidth:'900px',margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'16px'}}><Logo height={18} variant="white"/><div style={{width:'1px',height:'16px',background:'rgba(255,255,255,0.15)'}}/><div style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,0.4)'}}>Working Paper No. 01 · BRIDGE-WP-01-2025 · Public Excerpt · bridgepbc.com/research</div></div>
      <div style={{display:'flex',gap:'16px'}}>{['Research','Members','Contact','bridgepbc.com'].map((l,i)=>(<a key={i} href="#" style={{fontFamily:F.sans,fontSize:'10px',fontWeight:600,color:'rgba(250,248,243,0.4)',textDecoration:'none'}}>{l}</a>))}</div>
    </div>
  </div>
);

export default function ResearchBrief(){
  const r=useRef(null);
  const isMobile=useIsMobile();
  const[active,setActive]=useState(0);

  useEffect(()=>{
    const ids=['cover','chapter1','method','gate'];
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
    <div className={isMobile?'mob-nav-pad':''} style={{fontFamily:F.body,background:C.paper}}>
      <Gf/>
      <TopBar coverLogoRef={r}/>
      {isMobile&&<BottomNav active={active}/>}
      <Cover logoRef={r}/>
      <Chapter1/>
      <MethodPreview/>
      <InlineGate/>
      <Gate/>
      <Footer/>
    </div>
  );
}
