import { useState, useEffect, useRef } from "react";

const C={ink:'#0D1A10',paper:'#FAF8F3',paperDark:'#F0EDE4',forest:'#1B4D3E',lime:'#B8D935',limeDark:'#8FA825',muted:'#5C6B5E',faint:'#9AAA9C',border:'#D8D4C8',red:'#A8200D',amber:'#B8730A',positive:'#1A6B2F'};
const F={body:'"Source Serif 4","Georgia",serif',sans:'"DM Sans","Helvetica Neue",sans-serif',mono:'"DM Mono","Courier New",monospace'};

const SECTORS=[{n:'Infra',s:87,t:'▲'},{n:'FinInc',s:84,t:'▲'},{n:'Health',s:79,t:'→'},{n:'Tech',s:76,t:'▲'},{n:'Edu',s:72,t:'→'},{n:'Agri',s:83,t:'▼'},{n:'Sport',s:61,t:'→'},{n:'Hous',s:70,t:'▲'},{n:'Tour',s:68,t:'→'},{n:'Energy',s:74,t:'▲'},{n:'Mfg',s:65,t:'→'},{n:'Trans',s:71,t:'▲'}];
const MACRO=[{l:'Cedi / USD',v:'14.2',ch:'+2.1%',dir:'▼',note:'MoM depreciation'},{l:'Policy Rate (BOG)',v:'27%',ch:'unchanged',dir:'→',note:'Hold expected through Q2'},{l:'Inflation (Feb)',v:'23.2%',ch:'-1.4pp',dir:'▲',note:'Easing trajectory sustained'},{l:'Remittance Index',v:'109.4',ch:'+4.2',dir:'▲',note:'vs. 105.2 prior month'}];
const POLICY=[{tag:'BOG',txt:'Digital payment interoperability framework update expected April',alert:'neutral'},{tag:'MoF',txt:'2026 Budget infrastructure disbursement schedule released',alert:'positive'},{tag:'SEC',txt:'Revised fintech licensing framework — public comment period open',alert:'positive'},{tag:'EPA',txt:'Environmental fast-track designation for renewable projects',alert:'positive'}];
const MARKET=[{sec:'Financial Inclusion',mov:'+3pts',dir:1},{sec:'Agriculture',mov:'-2pts',dir:-1},{sec:'Technology',mov:'+1pt',dir:1},{sec:'Energy',mov:'+2pts',dir:1},{sec:'Housing',mov:'→',dir:0},{sec:'Tourism',mov:'+1pt',dir:1}];
const BRIDGE_ACT=[{tag:'Pipeline',txt:'3 new ventures entered scoring process this month',c:C.positive},{tag:'Research',txt:'Agriculture Crisis strategy paper published — open access',c:C.positive},{tag:'Kejetia',txt:'Phase 1 vendor onboarding: 340 of 10,000 enrolled',c:C.amber},{tag:'Policy',txt:'MoF bilateral meeting: infrastructure co-investment framework',c:C.positive},{tag:'Members',txt:'Q1 2026 Sector Brief series now available',c:C.positive}];
const SCORES=[{n:'01 Infrastructure',s:87,t:'Core',c:C.forest},{n:'02 Financial Inclusion',s:84,t:'Core',c:C.forest},{n:'06 Agriculture',s:83,t:'Core',c:C.forest},{n:'03 Health Systems',s:79,t:'Core',c:C.forest},{n:'04 Technology',s:76,t:'Emerging',c:C.limeDark},{n:'10 Energy',s:74,t:'Emerging',c:C.limeDark},{n:'05 Education',s:72,t:'Emerging',c:C.limeDark},{n:'12 Transportation',s:71,t:'Emerging',c:C.limeDark},{n:'08 Housing',s:70,t:'Growth',c:C.amber},{n:'09 Tourism',s:68,t:'Growth',c:C.amber},{n:'11 Manufacturing',s:65,t:'Growth',c:C.amber},{n:'07 Sports & Creative',s:61,t:'Growth',c:C.amber}];
const WATCH=[{evt:'BOG MPC Decision — 26 March',imp:'Rate trajectory; fintech funding cost implications'},{evt:'Q1 GSS GDP Estimate — Release',imp:'Sectoral growth breakdown; agri vs services split'},{evt:'BRIDGE Kejetia Phase 1 Review',imp:'50-day onboarding assessment; Phase 2 trigger decision'},{evt:'Cocoa Board seasonal pricing announcement',imp:'Agri sector score trigger — potential uplift to 84'}];

const Logo=({height=28,variant='white'})=>{const bs=variant==='white'?'#ffffff':'#1B4D3E';return(<svg height={height} viewBox="0 0 3258.5 932.3" xmlns="http://www.w3.org/2000/svg" style={{display:'block',flexShrink:0}}><path fill="#ffffff" d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"/><path fill="#ffffff" stroke="#000000" strokeWidth="0.5" strokeMiterlimit="10" d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"/><path fill="#ffffff" stroke="#000000" strokeWidth="0.5" strokeMiterlimit="10" d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"/><rect fill="#b8d935" x="1427.4" y="17.4" width="205.2" height="145"/><rect fill="#ffffff" x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/><path fill="#ffffff" d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7c0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"/><rect fill="#ffffff" x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/><rect fill="#b8d935" x="3083.4" y="339.5" width="175.1" height="257.7"/><rect fill="#b8d935" x="3083.4" y="654.4" width="175.1" height="257.7"/><rect fill="none" stroke={bs} strokeWidth="80" strokeMiterlimit="10" x="40" y="40" width="843.9" height="852.3" rx="36.6" ry="36.6"/><polygon fill="#b8d935" stroke="#1b4d3e" strokeMiterlimit="10" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/><path fill="#74914a" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z"/><path fill="#b8d935" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"/></svg>);};

const Gf=()=>(<style>{`
@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
body{background:#FAF8F3;-webkit-font-smoothing:antialiased;}
@media print{.np{display:none!important;}}
@media(max-width:600px){.desktop-only{display:none!important;}}
@media(min-width:601px){.mobile-only{display:none!important;}}
.mob-app{display:flex;flex-direction:column;height:100dvh;overflow:hidden;background:#0D1A10;}
.mob-header{flex-shrink:0;background:#0D1A10;padding:12px 16px 0;}
.mob-header-row{display:flex;justify-content:space-between;align-items:center;padding-bottom:10px;}
.mob-pulse{display:flex;overflow-x:auto;scrollbar-width:none;border-top:1px solid rgba(255,255,255,0.06);border-bottom:1px solid rgba(255,255,255,0.06);}
.mob-pulse::-webkit-scrollbar{display:none;}
.mob-pulse-cell{flex-shrink:0;padding:7px 11px;text-align:center;border-right:1px solid rgba(255,255,255,0.04);}
.mob-tabs{flex-shrink:0;background:#0D1A10;display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(255,255,255,0.06);}
.mob-tab{padding:9px 4px 8px;text-align:center;cursor:pointer;border:none;background:transparent;border-top:2px solid transparent;transition:all 0.2s;}
.mob-tab.active{background:rgba(184,217,53,0.07);border-top-color:#B8D935;}
.mob-content{flex:1;overflow-y:auto;background:#F3F5F2;-webkit-overflow-scrolling:touch;scrollbar-width:none;}
.mob-content::-webkit-scrollbar{display:none;}
.mob-panel{padding:14px 14px 24px;}
.mob-macro-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;}
.mob-macro-card{background:#fff;border-radius:8px;padding:14px 12px;border-top:3px solid #ccc;}
.mob-accord{background:#fff;border-radius:10px;overflow:hidden;margin-bottom:8px;box-shadow:0 1px 3px rgba(0,0,0,0.04);}
.mob-accord-hdr{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;cursor:pointer;border:none;background:transparent;width:100%;text-align:left;}
.mob-accord-body{overflow:hidden;transition:max-height 0.3s ease;padding:0 16px;}
.mob-accord-body.open{padding:0 16px 14px;}
.mob-chevron{font-size:10px;color:#9AAA9C;transition:transform 0.25s;}
.mob-chevron.open{transform:rotate(180deg);}
.mob-score-row{display:flex;align-items:center;gap:10px;padding:10px 12px;background:#fff;border-radius:6px;margin-bottom:4px;box-shadow:0 1px 2px rgba(0,0,0,0.04);}
.mob-watch-item{background:#fff;border-radius:8px;padding:14px;margin-bottom:8px;display:flex;gap:10px;align-items:flex-start;box-shadow:0 1px 3px rgba(0,0,0,0.04);}
.mob-cta{background:#1B4D3E;border-radius:12px;padding:20px 16px;margin-top:8px;}
.mob-cta-feats{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin:12px 0;}
.mob-cta-feat{background:rgba(255,255,255,0.07);padding:9px 9px;border-left:2px solid rgba(184,217,53,0.4);border-radius:2px;}
`}</style>);

/* ── DESKTOP COMPONENTS ─────────────────────────────────────────────── */
const TopBar=({coverLogoRef})=>{
  const[past,setPast]=useState(false);
  useEffect(()=>{const fn=()=>{if(!coverLogoRef?.current)return;setPast(coverLogoRef.current.getBoundingClientRect().bottom<0);};window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn);},[coverLogoRef]);
  return(
    <div className="np desktop-only" style={{position:'sticky',top:0,zIndex:100,background:C.paper,borderBottom:`1px solid ${C.border}`,padding:'10px 56px',display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 1px 8px rgba(0,0,0,0.06)'}}>
      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
        <div style={{overflow:'hidden',maxWidth:past?'180px':'0px',opacity:past?1:0,transition:'max-width 0.35s ease,opacity 0.3s ease',display:'flex',alignItems:'center'}}>
          <Logo height={18} variant="dark"/><div style={{width:'1px',height:'14px',background:C.border,margin:'0 10px',flexShrink:0}}/>
        </div>
        <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.forest,background:'rgba(27,77,62,0.08)',padding:'3px 8px'}}>Monthly Dashboard</span>
        <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,background:C.paperDark,padding:'3px 8px'}}>March 2026 &middot; Free Edition</span>
      </div>
      <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
        <span style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>bridgepbc.com/dashboard</span>
        <a href="#" style={{background:C.forest,color:C.lime,padding:'7px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none'}}>Members</a>
      </div>
    </div>
  );
};

const Header=({logoRef})=>(
  <div className="desktop-only" style={{background:C.ink}}>
    <div ref={logoRef} style={{padding:'14px 32px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:`1px solid rgba(255,255,255,0.06)`}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
        <Logo height={22} variant="white"/>
        <div style={{width:'1px',height:'18px',background:'rgba(255,255,255,0.15)'}}/>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase',color:C.lime}}>Monthly Dashboard</div>
          <div style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(255,255,255,0.35)'}}>March 2026 &middot; Vol.I Issue 03</div>
        </div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
        <div style={{textAlign:'right'}}>
          <div style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.25)',letterSpacing:'1px'}}>ISSUED</div>
          <div style={{fontFamily:F.mono,fontSize:'11px',color:'rgba(255,255,255,0.5)'}}>01 March 2026</div>
        </div>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.lime,border:`1px solid rgba(184,217,53,0.35)`,padding:'3px 8px',letterSpacing:'1px'}}>FREE EDITION</div>
      </div>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(12,1fr)',padding:'0 32px',borderBottom:`1px solid rgba(255,255,255,0.06)`}}>
      {SECTORS.map((s,i)=>(
        <div key={i} style={{padding:'8px 4px',borderRight:i<11?`1px solid rgba(255,255,255,0.04)`:'none',textAlign:'center'}}>
          <div style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.25)',marginBottom:'2px',letterSpacing:'0.5px'}}>{s.n}</div>
          <div style={{fontFamily:F.mono,fontSize:'13px',fontWeight:500,color:s.s>=80?C.lime:s.s>=70?'rgba(184,217,53,0.7)':'rgba(184,115,10,0.9)',lineHeight:1}}>{s.s}</div>
          <div style={{fontFamily:F.mono,fontSize:'9px',color:s.t==='▲'?C.positive:s.t==='▼'?C.red:'rgba(255,255,255,0.2)',marginTop:'1px'}}>{s.t}</div>
        </div>
      ))}
    </div>
  </div>
);

const MacroSnap=()=>(
  <div className="desktop-only" style={{background:C.paper,padding:'24px 32px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Ghana Macro · March 2026</div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'2px'}}>
      {MACRO.map((d,i)=>(
        <div key={i} style={{background:C.paperDark,padding:'14px 16px',borderTop:`2px solid ${d.dir==='▲'?C.limeDark:d.dir==='▼'?C.red:C.amber}`}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',letterSpacing:'1px',textTransform:'uppercase',color:C.faint,marginBottom:'6px'}}>{d.l}</div>
          <div style={{fontFamily:F.mono,fontSize:'24px',color:C.ink,lineHeight:1,marginBottom:'4px'}}>{d.v}</div>
          <div style={{fontFamily:F.mono,fontSize:'11px',color:d.dir==='▲'?C.positive:d.dir==='▼'?C.red:C.amber,marginBottom:'4px'}}>{d.ch} {d.dir}</div>
          <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint}}>{d.note}</div>
        </div>
      ))}
    </div>
  </div>
);

const Signals=()=>(
  <div className="desktop-only" style={{background:C.paperDark,padding:'24px 32px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'16px'}}>
      <div>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px',paddingBottom:'6px',borderBottom:`1px solid ${C.border}`}}>Policy Signals</div>
        {POLICY.map((s,i)=>(<div key={i} style={{display:'flex',gap:'8px',marginBottom:'8px',alignItems:'flex-start'}}><div style={{fontFamily:F.mono,fontSize:'9px',color:s.alert==='positive'?C.positive:C.amber,minWidth:'28px',paddingTop:'1px',fontWeight:700}}>{s.tag}</div><div style={{fontFamily:F.sans,fontSize:'11px',color:C.ink,lineHeight:1.5}}>{s.txt}</div></div>))}
      </div>
      <div>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px',paddingBottom:'6px',borderBottom:`1px solid ${C.border}`}}>Market Movements</div>
        {MARKET.map((m,i)=>(<div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0',borderBottom:i<5?`1px solid ${C.border}`:'none'}}><div style={{fontFamily:F.sans,fontSize:'11px',color:C.ink}}>{m.sec}</div><span style={{fontFamily:F.mono,fontSize:'11px',color:m.dir>0?C.positive:m.dir<0?C.red:C.amber,fontWeight:700}}>{m.mov}</span></div>))}
      </div>
      <div>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px',paddingBottom:'6px',borderBottom:`1px solid ${C.border}`}}>BRIDGE Activity</div>
        {BRIDGE_ACT.map((s,i)=>(<div key={i} style={{display:'flex',gap:'8px',marginBottom:'8px',alignItems:'flex-start'}}><div style={{fontFamily:F.mono,fontSize:'9px',color:s.c,minWidth:'48px',paddingTop:'1px',fontWeight:700}}>{s.tag}</div><div style={{fontFamily:F.sans,fontSize:'11px',color:C.ink,lineHeight:1.5}}>{s.txt}</div></div>))}
      </div>
    </div>
  </div>
);

const ScoreGrid=()=>(
  <div className="desktop-only" style={{background:C.paper,padding:'24px 32px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>BRIDGE Impact Score&#x2122; · All 12 Sectors</div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:'2px'}}>
      {SCORES.map((sec,i)=>(<div key={i} style={{background:C.paperDark,padding:'10px 12px',borderLeft:`2px solid ${sec.c}`}}><div style={{fontFamily:F.sans,fontSize:'9px',color:C.muted,marginBottom:'4px',lineHeight:1.3}}>{sec.n}</div><div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}><span style={{fontFamily:F.mono,fontSize:'18px',color:sec.c,lineHeight:1}}>{sec.s}</span><span style={{fontFamily:F.sans,fontSize:'8px',color:C.faint,textTransform:'uppercase',letterSpacing:'0.5px'}}>{sec.t}</span></div><div style={{height:'2px',background:C.border,marginTop:'6px',borderRadius:'1px',overflow:'hidden'}}><div style={{height:'100%',width:`${sec.s}%`,background:sec.c,borderRadius:'1px',opacity:0.6}}/></div></div>))}
    </div>
    <div style={{marginTop:'10px',fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint}}>Score thresholds: Core &#x2265;75 · Emerging 60&#x2013;74 · Growth below 60 · Scores updated quarterly.</div>
  </div>
);

const WatchItems=()=>(
  <div className="desktop-only" style={{background:C.paperDark,padding:'20px 32px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px'}}>
      <div>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Watch This Month</div>
        {WATCH.map((w,i)=>(<div key={i} style={{display:'flex',gap:'10px',marginBottom:'8px',paddingBottom:'8px',borderBottom:i<3?`1px solid ${C.border}`:'none',alignItems:'flex-start'}}><div style={{width:'4px',height:'4px',borderRadius:'50%',background:C.lime,flexShrink:0,marginTop:'6px'}}/><div><div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,marginBottom:'2px'}}>{w.evt}</div><div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.muted,lineHeight:1.4}}>{w.imp}</div></div></div>))}
      </div>
      <div style={{background:C.forest,padding:'16px 20px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'8px'}}>Members · Full Dashboard</div>
        <p style={{fontFamily:F.sans,fontSize:'12px',color:'rgba(250,248,243,0.6)',lineHeight:1.6,marginBottom:'14px'}}>Members receive the expanded monthly dashboard: 174+ venture status tracker, sector alert notifications, pipeline deal-flow updates, and direct analyst commentary on each Watch Item.</p>
        <a href="#" style={{background:C.lime,color:C.ink,padding:'10px 18px',fontFamily:F.sans,fontSize:'11px',fontWeight:800,textDecoration:'none',borderRadius:'2px',letterSpacing:'0.5px',display:'inline-block',width:'fit-content'}}>Apply for Members Access</a>
      </div>
    </div>
  </div>
);

const MembersCTA=()=>(
  <div className="desktop-only" style={{background:C.ink}}>
    <div style={{padding:'56px 32px',maxWidth:'900px',margin:'0 auto'}}>
      <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px'}}><div style={{width:'24px',height:'1px',background:C.lime}}/><span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.lime}}>BRIDGE Members</span></div>
      <div style={{fontFamily:F.sans,fontSize:'36px',fontWeight:300,lineHeight:1.15,color:'#FAF8F3',letterSpacing:'-0.5px',maxWidth:'580px',marginBottom:'12px'}}>You're seeing<br/><span style={{fontWeight:800,color:C.lime}}>20% of the picture.</span></div>
      <p style={{fontFamily:F.sans,fontSize:'14px',color:'rgba(250,248,243,0.5)',lineHeight:1.7,maxWidth:'480px'}}>The full dashboard is reserved for Members — live sector scores, venture pipeline, policy tracker, and the complete document library.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'2px',margin:'32px 0'}}>
        {[{t:'Intelligence Dashboard',b:'Live sector scores, macro alerts, and portfolio-level views across all 12 sectors.'},{t:'Venture Pipeline',b:'174+ tracked ventures, BRIDGE Impact Scores, and deal-flow updates reviewed monthly.'},{t:'Document Library',b:'All 12 sector deep-dives, policy trackers, and investment memos — unrestricted access.'},{t:'Policy Tracker',b:'Real-time alerts when regulations shift across BOG, MoF, SEC, EPA, and sector ministries.'},{t:'Community Portal',b:'Forums, member directory, working groups, and direct introductions to BRIDGE partners.'},{t:'Analyst Briefings',b:'Monthly sector commentary from the BRIDGE team. Early access to new research before public release.'}].map((f,i)=>(<div key={i} style={{background:'rgba(255,255,255,0.04)',padding:'18px 16px',borderLeft:`2px solid rgba(184,217,53,0.3)`}}><div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(184,217,53,0.7)',marginBottom:'8px'}}>{f.t}</div><div style={{fontFamily:F.sans,fontSize:'12px',color:'rgba(250,248,243,0.6)',lineHeight:1.6}}>{f.b}</div></div>))}
      </div>
      <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',padding:'20px',marginBottom:'28px'}}>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.2)',marginBottom:'12px'}}>Dashboard Preview — Members Only</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'2px',marginBottom:'2px'}}>
          {[{l:'Active Ventures',v:'174',ch:'+12 this month ▲',vc:C.positive,clear:true},{l:'Avg Impact Score',v:'74.3',ch:'+1.2 QoQ ▲',vc:C.positive,clear:true},{l:'Pipeline Value',v:'$2.4B',ch:'estimated GVA',vc:C.positive,clear:false},{l:'Policy Alerts',v:'7',ch:'active this month',vc:C.amber,clear:false}].map((d,i)=>(<div key={i} style={{background:'rgba(255,255,255,0.05)',padding:'10px 12px',position:'relative'}}><div style={{fontFamily:F.mono,fontSize:'8px',color:'rgba(255,255,255,0.2)',marginBottom:'4px',textTransform:'uppercase',letterSpacing:'1px'}}>{d.l}</div><div style={{fontFamily:F.mono,fontSize:'22px',color:C.lime,lineHeight:1}}>{d.v}</div><div style={{fontFamily:F.mono,fontSize:'9px',color:d.vc,marginTop:'2px'}}>{d.ch}</div>{!d.clear&&<div style={{position:'absolute',inset:0,backdropFilter:'blur(5px)',background:'rgba(13,26,16,0.5)',display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(184,217,53,0.5)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>}</div>))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'2px'}}>
          {[{l:'Top Venture · Infra',v:'Kejetia Digital Platform'},{l:'Watchlist Alert',v:'SEC Fintech Rule — Final'},{l:'New Brief',v:'Energy — Q1 2026'},{l:'Members This Month',v:'+34 new members'}].map((d,i)=>(<div key={i} style={{background:'rgba(255,255,255,0.05)',padding:'10px 12px',position:'relative',height:'48px'}}><div style={{fontFamily:F.mono,fontSize:'8px',color:'rgba(255,255,255,0.15)',letterSpacing:'1px',textTransform:'uppercase'}}>{d.l}</div><div style={{fontFamily:F.mono,fontSize:'11px',color:'rgba(255,255,255,0.3)',marginTop:'4px'}}>{d.v}</div><div style={{position:'absolute',inset:0,backdropFilter:'blur(5px)',background:'rgba(13,26,16,0.5)',display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(184,217,53,0.5)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div></div>))}
        </div>
        <div style={{textAlign:'center',paddingTop:'10px',fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.15)',letterSpacing:'1px'}}>FULL DASHBOARD VISIBLE TO PAID MEMBERS · BRIDGEPBC.COM/DASHBOARD</div>
      </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'20px'}}>
        <div><div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:'6px'}}>Annual Membership</div><div style={{display:'flex',alignItems:'baseline',gap:'8px'}}><span style={{fontFamily:F.mono,fontSize:'28px',fontWeight:500,color:'#FAF8F3'}}>$100</span><span style={{fontFamily:F.sans,fontSize:'12px',color:'rgba(250,248,243,0.35)'}}>– $500 / year · USD</span></div><div style={{fontFamily:F.sans,fontSize:'11px',color:'rgba(250,248,243,0.3)',marginTop:'4px'}}>Start free · Upgrade when ready · Application reviewed by the BRIDGE team</div></div>
        <div style={{display:'flex',gap:'12px',alignItems:'center',flexWrap:'wrap'}}>
          <a href="#" style={{background:C.lime,color:C.ink,padding:'13px 28px',fontFamily:F.sans,fontSize:'13px',fontWeight:800,textDecoration:'none',letterSpacing:'0.3px',display:'inline-block',whiteSpace:'nowrap'}}>Apply for Membership</a>
          <a href="#" style={{border:'1px solid rgba(255,255,255,0.15)',color:'rgba(250,248,243,0.6)',padding:'13px 22px',fontFamily:F.sans,fontSize:'13px',fontWeight:600,textDecoration:'none',display:'inline-block',whiteSpace:'nowrap'}}>Start Free First</a>
        </div>
      </div>
    </div>
  </div>
);

const Footer=()=>(
  <div className="desktop-only" style={{background:'#060e08',padding:'14px 32px',borderTop:'2px solid rgba(184,217,53,0.25)'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}><Logo height={16} variant="white"/><div style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.1)'}}/><span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.2)'}}>Monthly Dashboard &middot; March 2026 &middot; bridgepbc.com/dashboard</span></div>
      <div style={{display:'flex',gap:'14px'}}>{['Archive','Members','Contact'].map((l,i)=>(<a key={i} href="#" style={{fontFamily:F.sans,fontSize:'9px',fontWeight:600,color:'rgba(255,255,255,0.2)',textDecoration:'none'}}>{l}</a>))}</div>
    </div>
  </div>
);

/* ── MOBILE ACCORDION ───────────────────────────────────────────────── */
const Accord=({label,children,open:initOpen=false})=>{
  const[open,setOpen]=useState(initOpen);
  return(
    <div className="mob-accord">
      <button className="mob-accord-hdr" onClick={()=>setOpen(o=>!o)}>
        <span style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.ink}}>{label}</span>
        <span className={`mob-chevron${open?' open':''}`}>▼</span>
      </button>
      <div className={`mob-accord-body${open?' open':''}`}>{children}</div>
    </div>
  );
};

/* ── MOBILE APP ─────────────────────────────────────────────────────── */
const MobileApp=()=>{
  const[tab,setTab]=useState(0);
  const TABS=[{l:'Macro',i:'◈'},{l:'Signals',i:'◉'},{l:'Scores',i:'◎'},{l:'Watch',i:'◐'}];
  return(
    <div className="mob-app mobile-only">

      {/* Header */}
      <div className="mob-header">
        <div className="mob-header-row">
          <div style={{display:'flex',alignItems:'center',gap:'9px'}}>
            <Logo height={15} variant="white"/>
            <div style={{width:'1px',height:'13px',background:'rgba(255,255,255,0.15)'}}/>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime}}>Monthly Dashboard</div>
              <div style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.28)'}}>March 2026 · Issue 03</div>
            </div>
          </div>
          <a href="#" style={{background:C.lime,color:C.ink,padding:'7px 12px',fontFamily:F.sans,fontSize:'10px',fontWeight:800,textDecoration:'none',borderRadius:'2px'}}>Members</a>
        </div>
        {/* Scrollable pulse */}
        <div className="mob-pulse">
          {SECTORS.map((s,i)=>(
            <div key={i} className="mob-pulse-cell">
              <div style={{fontFamily:F.mono,fontSize:'8px',color:'rgba(255,255,255,0.28)',marginBottom:'1px'}}>{s.n}</div>
              <div style={{fontFamily:F.mono,fontSize:'11px',fontWeight:600,color:s.s>=80?C.lime:s.s>=70?'rgba(184,217,53,0.7)':'rgba(184,115,10,0.9)',lineHeight:1}}>{s.s}</div>
              <div style={{fontFamily:F.mono,fontSize:'8px',color:s.t==='▲'?C.positive:s.t==='▼'?C.red:'rgba(255,255,255,0.2)'}}>{s.t}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <div className="mob-tabs">
        {TABS.map((t,i)=>(
          <button key={i} className={`mob-tab${tab===i?' active':''}`} onClick={()=>setTab(i)}>
            <div style={{fontFamily:F.mono,fontSize:'14px',color:tab===i?C.lime:'rgba(255,255,255,0.25)',marginBottom:'1px'}}>{t.i}</div>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'0.6px',textTransform:'uppercase',color:tab===i?C.lime:'rgba(255,255,255,0.3)'}}>{t.l}</div>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mob-content">

        {/* ── MACRO ── */}
        {tab===0&&<div className="mob-panel">
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Ghana Macro · March 2026</div>
          <div className="mob-macro-grid">
            {MACRO.map((d,i)=>{
              const bc=d.dir==='▲'?C.limeDark:d.dir==='▼'?C.red:C.amber;
              const vc=d.dir==='▲'?C.positive:d.dir==='▼'?C.red:C.amber;
              return(<div key={i} className="mob-macro-card" style={{borderTopColor:bc}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',letterSpacing:'0.8px',textTransform:'uppercase',color:C.faint,marginBottom:'6px'}}>{d.l}</div>
                <div style={{fontFamily:F.mono,fontSize:'26px',color:C.ink,lineHeight:1,marginBottom:'3px'}}>{d.v}</div>
                <div style={{fontFamily:F.mono,fontSize:'11px',color:vc,marginBottom:'4px'}}>{d.ch} {d.dir}</div>
                <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint,lineHeight:1.4}}>{d.note}</div>
              </div>);
            })}
          </div>
          <div style={{background:'#fff',borderRadius:'8px',padding:'14px',borderLeft:`3px solid ${C.lime}`,marginTop:'8px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>Analyst Note</div>
            <div style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.muted,lineHeight:1.6}}>Inflation continues its easing path despite cedi pressure. BOG rate hold through Q2 keeps credit conditions tight, but the remittance index uptick signals sustained diaspora inflows.</div>
          </div>
        </div>}

        {/* ── SIGNALS ── */}
        {tab===1&&<div className="mob-panel">
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Signals · March 2026</div>
          <Accord label="Policy Signals" open={true}>
            {POLICY.map((s,i)=>(<div key={i} style={{display:'flex',gap:'10px',marginBottom:'10px',alignItems:'flex-start'}}>
              <div style={{fontFamily:F.mono,fontSize:'9px',color:s.alert==='positive'?C.positive:C.amber,minWidth:'30px',paddingTop:'2px',fontWeight:700}}>{s.tag}</div>
              <div style={{fontFamily:F.sans,fontSize:'12px',color:C.ink,lineHeight:1.5}}>{s.txt}</div>
            </div>))}
          </Accord>
          <Accord label="Market Movements">
            {MARKET.map((m,i)=>(<div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'8px 0',borderBottom:i<MARKET.length-1?`1px solid ${C.border}`:'none'}}>
              <div style={{fontFamily:F.sans,fontSize:'12px',color:C.ink}}>{m.sec}</div>
              <span style={{fontFamily:F.mono,fontSize:'12px',color:m.dir>0?C.positive:m.dir<0?C.red:C.amber,fontWeight:700}}>{m.mov}</span>
            </div>))}
          </Accord>
          <Accord label="BRIDGE Activity">
            {BRIDGE_ACT.map((s,i)=>(<div key={i} style={{display:'flex',gap:'10px',marginBottom:'10px',alignItems:'flex-start'}}>
              <div style={{fontFamily:F.mono,fontSize:'9px',color:s.c,minWidth:'52px',paddingTop:'2px',fontWeight:700}}>{s.tag}</div>
              <div style={{fontFamily:F.sans,fontSize:'12px',color:C.ink,lineHeight:1.5}}>{s.txt}</div>
            </div>))}
          </Accord>
        </div>}

        {/* ── SCORES ── */}
        {tab===2&&<div className="mob-panel">
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'4px'}}>BRIDGE Impact Score™</div>
          <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint,marginBottom:'14px'}}>Core ≥75 · Emerging 60–74 · Growth &lt;60</div>
          {[{label:'Core Sectors',color:C.forest},{label:'Emerging Sectors',color:C.limeDark},{label:'Growth Sectors',color:C.amber}].map((g,gi)=>(
            <div key={gi} style={{marginBottom:'16px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:g.color,marginBottom:'6px',paddingLeft:'2px'}}>{g.label}</div>
              {SCORES.filter(s=>s.t===['Core','Emerging','Growth'][gi]).map((sec,i)=>(
                <div key={i} className="mob-score-row" style={{borderLeft:`3px solid ${sec.c}`}}>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:F.sans,fontSize:'12px',color:C.ink,fontWeight:500,marginBottom:'5px'}}>{sec.n}</div>
                    <div style={{height:'3px',background:C.border,borderRadius:'2px',overflow:'hidden'}}>
                      <div style={{height:'100%',width:`${sec.s}%`,background:sec.c,borderRadius:'2px',opacity:0.7}}/>
                    </div>
                  </div>
                  <div style={{fontFamily:F.mono,fontSize:'22px',color:sec.c,lineHeight:1,fontWeight:500,flexShrink:0}}>{sec.s}</div>
                </div>
              ))}
            </div>
          ))}
        </div>}

        {/* ── WATCH ── */}
        {tab===3&&<div className="mob-panel">
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Watch This Month</div>
          {WATCH.map((w,i)=>(
            <div key={i} className="mob-watch-item">
              <div style={{width:'6px',height:'6px',borderRadius:'50%',background:C.lime,flexShrink:0,marginTop:'4px'}}/>
              <div>
                <div style={{fontFamily:F.sans,fontSize:'13px',fontWeight:700,color:C.ink,marginBottom:'4px',lineHeight:1.3}}>{w.evt}</div>
                <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,lineHeight:1.5}}>{w.imp}</div>
              </div>
            </div>
          ))}
          {/* Inline Members CTA */}
          <div className="mob-cta">
            <div style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'8px'}}>BRIDGE Members</div>
            <div style={{fontFamily:F.sans,fontSize:'22px',fontWeight:300,color:'#FAF8F3',lineHeight:1.2,marginBottom:'6px'}}>
              You're seeing<br/><span style={{fontWeight:800,color:C.lime}}>20% of the picture.</span>
            </div>
            <div style={{fontFamily:F.sans,fontSize:'12px',color:'rgba(250,248,243,0.5)',lineHeight:1.6,marginBottom:'14px'}}>Members access the full intelligence dashboard — venture pipeline, policy tracker, sector deep-dives, and analyst briefings.</div>
            <div className="mob-cta-feats">
              {['Intelligence Dashboard','Venture Pipeline','Document Library','Policy Tracker','Community Portal','Analyst Briefings'].map((f,i)=>(
                <div key={i} className="mob-cta-feat">
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:'rgba(184,217,53,0.85)',lineHeight:1.3}}>{f}</div>
                </div>
              ))}
            </div>
            <div style={{fontFamily:F.mono,fontSize:'20px',fontWeight:500,color:'#FAF8F3',marginBottom:'12px'}}>$100<span style={{fontSize:'12px',color:'rgba(250,248,243,0.35)',fontWeight:400}}> – $500 / yr</span></div>
            <a href="#" style={{background:C.lime,color:C.ink,padding:'13px 20px',fontFamily:F.sans,fontSize:'13px',fontWeight:800,textDecoration:'none',textAlign:'center',borderRadius:'2px',display:'block',marginBottom:'8px'}}>Apply for Membership</a>
            <a href="#" style={{border:'1px solid rgba(255,255,255,0.2)',color:'rgba(250,248,243,0.6)',padding:'11px 20px',fontFamily:F.sans,fontSize:'12px',fontWeight:600,textDecoration:'none',textAlign:'center',borderRadius:'2px',display:'block'}}>Start Free First</a>
          </div>
        </div>}

      </div>
    </div>
  );
};

/* ── ROOT ───────────────────────────────────────────────────────────── */
export default function MonthlyDashboard(){
  const r=useRef(null);
  return(<>
    <Gf/>
    <div style={{fontFamily:F.body,background:C.paper}} className="desktop-only">
      <TopBar coverLogoRef={r}/>
      <Header logoRef={r}/>
      <MacroSnap/>
      <Signals/>
      <ScoreGrid/>
      <WatchItems/>
      <MembersCTA/>
      <Footer/>
    </div>
    <MobileApp/>
  </>);
}
