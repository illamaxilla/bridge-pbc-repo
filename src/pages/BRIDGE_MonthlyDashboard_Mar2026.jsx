import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   BRIDGE MONTHLY DASHBOARD  ·  MARCH 2026
   Personality: Bloomberg Terminal × editorial infographic
   Dense, data-first, modular card system, high contrast
   Compact: designed for 1–2 print pages; all signal, no noise
───────────────────────────────────────────────────────────────────────── */

const C={ink:'#0D1A10',paper:'#FAF8F3',paperDark:'#F0EDE4',forest:'#1B4D3E',lime:'#B8D935',limeDark:'#8FA825',teal:'#2E5A4D',muted:'#5C6B5E',faint:'#9AAA9C',border:'#D8D4C8',red:'#A8200D',redLight:'rgba(168,32,13,0.12)',amber:'#B8730A',amberLight:'rgba(184,115,10,0.12)',positive:'#1A6B2F',positiveLight:'rgba(26,107,47,0.1)',white:'#FFFFFF'};
const F={display:'"Playfair Display","Georgia",serif',body:'"Source Serif 4","Georgia",serif',sans:'"DM Sans","Helvetica Neue",sans-serif',mono:'"DM Mono","Courier New",monospace'};

const Logo=({height=28,variant='white'})=>{const tf=variant==='white'?'#ffffff':'#1B4D3E';return(<svg height={height} viewBox="0 0 4113.8 932.3" xmlns="http://www.w3.org/2000/svg" style={{display:'block',flexShrink:0}}><polygon fill="#1B4D3E" stroke="#1B4D3E" strokeMiterlimit="10" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/><path fill="#74914a" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1Z"/><path fill="#b8d935" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4Z"/><path fill={tf} d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1Z"/><path fill={tf} d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4c-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1c31.6,18.3,57,47.9,72.9,84.6c29.9,60.2,91.8,84.9,149.2,51.8c9.7-5.5,17.6-11.8,24.2-18.5Z"/><path fill={tf} d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1c20.7,15.4,38.5,34.7,52.2,57c13.3-10,27.7-18.6,43-25.4c27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6Z"/><rect fill="#b8d935" x="1427.4" y="17.4" width="205.2" height="145"/><rect fill={tf} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/><path fill={tf} d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7c0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8Z"/><rect fill={tf} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/><rect fill="#b8d935" x="3083.4" y="339.5" width="175.1" height="257.7"/><rect fill="#b8d935" x="3083.4" y="654.4" width="175.1" height="257.7"/></svg>);};

const Gf=()=>(<style>{`*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}body{background:${C.paper};-webkit-font-smoothing:antialiased;}@media print{.np{display:none!important;}.db{break-inside:avoid;}}@media(max-width:900px){.g3{grid-template-columns:1fr 1fr!important;}.g4{grid-template-columns:1fr 1fr!important;}.g2{grid-template-columns:1fr!important;}}@media(max-width:600px){.g3{grid-template-columns:1fr 1fr!important;}.g4{grid-template-columns:1fr 1fr!important;}.g2{grid-template-columns:1fr!important;}.signals-grid{grid-template-columns:1fr!important;}.mob-hide{display:none!important;}.mob-show{display:block!important;}.pad-topbar{padding:9px 16px!important;}.pad-footer{padding:12px 16px!important;}.pad-header{padding:12px 16px!important;}.pad-dash{padding:16px!important;}.pulse-bar{grid-template-columns:repeat(6,1fr)!important;overflow:hidden!important;}.pulse-bar>div:nth-child(n+7){display:none!important;}.watch-grid{gap:20px!important;}.members-gate{padding:20px 16px!important;}}`}</style>);

const TopBar=({coverLogoRef})=>{
  const[past,setPast]=useState(false);
  useEffect(()=>{const fn=()=>{if(!coverLogoRef?.current)return;setPast(coverLogoRef.current.getBoundingClientRect().bottom<0);};window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn);},[coverLogoRef]);
  return(
    <div className="np pad-topbar" style={{position:'sticky',top:0,zIndex:100,background:C.paper,borderBottom:`1px solid ${C.border}`,padding:'10px 56px',display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 1px 8px rgba(0,0,0,0.06)'}}>
      <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
        <div style={{overflow:'hidden',maxWidth:past?'180px':'0px',opacity:past?1:0,transition:'max-width 0.35s ease,opacity 0.3s ease',display:'flex',alignItems:'center'}}>
          <Logo height={18} variant="dark"/>
          <div style={{width:'1px',height:'14px',background:C.border,margin:'0 10px',flexShrink:0}}/>
        </div>
        <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.forest,background:'rgba(27,77,62,0.08)',padding:'3px 8px'}}>Monthly Dashboard</span>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,background:C.paperDark,padding:'3px 8px'}}>March 2026 &middot; Free Edition</span>
      </div>
      <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>bridgepbc.com/dashboard</span>
        <a href="#" style={{background:C.forest,color:C.lime,padding:'7px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none',letterSpacing:'0.3px'}}>Members</a>
      </div>
    </div>
  );
};

/* ── HEADER BAND: tight, high-density ──────────────────────────────────── */
const Header=({logoRef})=>(
  <div style={{background:C.ink}}>
    <div ref={logoRef} className="pad-header" style={{padding:'14px 32px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:`1px solid rgba(255,255,255,0.06)`}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
        <Logo height={22} variant="white"/>
        <div style={{width:'1px',height:'18px',background:'rgba(255,255,255,0.15)'}}/>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'10px',fontWeight:800,letterSpacing:'2px',textTransform:'uppercase',color:C.lime}}>Monthly Dashboard</div>
          <div style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(255,255,255,0.35)'}}>March 2026 &middot; Vol.I Issue 03</div>
        </div>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
        <div className="mob-hide" style={{textAlign:'right'}}>
          <div style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.25)',letterSpacing:'1px'}}>ISSUED</div>
          <div style={{fontFamily:F.mono,fontSize:'11px',color:'rgba(255,255,255,0.5)'}}>01 March 2026</div>
        </div>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.lime,border:`1px solid rgba(184,217,53,0.35)`,padding:'3px 8px',letterSpacing:'1px'}}>FREE EDITION</div>
      </div>
    </div>
    {/* Pulse bar: 12-sector status indicators */}
    <div className="pulse-bar" style={{display:'grid',gridTemplateColumns:'repeat(12,1fr)',padding:'0 32px',borderBottom:`1px solid rgba(255,255,255,0.06)`}}>
      {[{n:'Infra',s:87,t:'▲'},{n:'FinInc',s:84,t:'▲'},{n:'Health',s:79,t:'→'},{n:'Tech',s:76,t:'▲'},{n:'Edu',s:72,t:'→'},{n:'Agri',s:83,t:'▼'},{n:'Sport',s:61,t:'→'},{n:'Hous',s:70,t:'▲'},{n:'Tour',s:68,t:'→'},{n:'Energy',s:74,t:'▲'},{n:'Mfg',s:65,t:'→'},{n:'Trans',s:71,t:'▲'}].map((sec,i)=>(
        <div key={i} style={{padding:'8px 4px',borderRight:i<11?`1px solid rgba(255,255,255,0.04)`:'none',textAlign:'center'}}>
          <div style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.25)',marginBottom:'2px',letterSpacing:'0.5px'}}>{sec.n}</div>
          <div style={{fontFamily:F.mono,fontSize:'13px',fontWeight:500,color:sec.s>=80?C.lime:sec.s>=70?'rgba(184,217,53,0.7)':'rgba(184,115,10,0.9)',lineHeight:1}}>{sec.s}</div>
          <div style={{fontFamily:F.mono,fontSize:'9px',color:sec.t==='▲'?C.positive:sec.t==='▼'?C.red:'rgba(255,255,255,0.2)',marginTop:'1px'}}>{sec.t}</div>
        </div>
      ))}
    </div>
  </div>
);

/* ── MACRO SNAPSHOT: 3-column data tiles ────────────────────────────────── */
const MacroSnap=()=>(
  <div className="pad-dash" style={{background:C.paper,padding:'24px 32px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Ghana Macro · March 2026</div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'2px'}} className="g4">
      {[{l:'Cedi / USD',v:'14.2',ch:'+2.1%',dir:'▼',note:'MoM depreciation'},
        {l:'Policy Rate (BOG)',v:'27%',ch:'unchanged',dir:'→',note:'Hold expected through Q2'},
        {l:'Inflation (Feb)',v:'23.2%',ch:'-1.4pp',dir:'▲',note:'Easing trajectory sustained'},
        {l:'Remittance Index',v:'109.4',ch:'+4.2',dir:'▲',note:'vs. 105.2 prior month'}].map((d,i)=>(
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

/* ── SIGNALS: key events this month ─────────────────────────────────────── */
const Signals=()=>(
  <div className="pad-dash" style={{background:C.paperDark,padding:'24px 32px',borderBottom:`1px solid ${C.border}`}}>
    <div className="signals-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'16px'}}>
      {/* Policy signals */}
      <div className="db">
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px',paddingBottom:'6px',borderBottom:`1px solid ${C.border}`}}>Policy Signals</div>
        {[{tag:'BOG',txt:'Digital payment interoperability framework update expected April',alert:'neutral'},
          {tag:'MoF',txt:'2026 Budget infrastructure disbursement schedule released',alert:'positive'},
          {tag:'SEC',txt:'Revised fintech licensing framework — public comment period open',alert:'positive'},
          {tag:'EPA',txt:'Environmental fast-track designation for renewable projects',alert:'positive'}].map((s,i)=>(
          <div key={i} style={{display:'flex',gap:'8px',marginBottom:'8px',alignItems:'flex-start'}}>
            <div style={{fontFamily:F.mono,fontSize:'9px',color:s.alert==='positive'?C.positive:s.alert==='negative'?C.red:C.amber,minWidth:'28px',paddingTop:'1px',fontWeight:700}}>{s.tag}</div>
            <div style={{fontFamily:F.sans,fontSize:'11px',color:C.ink,lineHeight:1.5}}>{s.txt}</div>
          </div>
        ))}
      </div>
      {/* Market movements */}
      <div className="db">
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px',paddingBottom:'6px',borderBottom:`1px solid ${C.border}`}}>Market Movements</div>
        {[{sec:'Financial Inclusion',mov:'+3pts',dir:1,note:'Fintech consolidation accelerating'},
          {sec:'Agriculture',mov:'-2pts',dir:-1,note:'Seasonal rainfall deficit risk'},
          {sec:'Technology',mov:'+1pt',dir:1,note:'Two Series A closings in pipeline'},
          {sec:'Energy',mov:'+2pts',dir:1,note:'New solar capacity commissioned'},
          {sec:'Housing',mov:'→',dir:0,note:'Mortgage rate stabilisation'},
          {sec:'Tourism',mov:'+1pt',dir:1,note:'Q1 arrivals up 12% YoY'}].map((m,i)=>(
          <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0',borderBottom:i<5?`1px solid ${C.border}`:'none'}}>
            <div style={{fontFamily:F.sans,fontSize:'11px',color:C.ink}}>{m.sec}</div>
            <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
              <span style={{fontFamily:F.mono,fontSize:'11px',color:m.dir>0?C.positive:m.dir<0?C.red:C.amber,fontWeight:700}}>{m.mov}</span>
            </div>
          </div>
        ))}
      </div>
      {/* BRIDGE signals */}
      <div className="db">
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px',paddingBottom:'6px',borderBottom:`1px solid ${C.border}`}}>BRIDGE Activity</div>
        {[{tag:'Pipeline',txt:'3 new ventures entered scoring process this month',c:C.positive},
          {tag:'Research',txt:'Agriculture Crisis strategy paper published — open access',c:C.positive},
          {tag:'Kejetia',txt:'Phase 1 vendor onboarding: 340 of 10,000 enrolled',c:C.amber},
          {tag:'Policy',txt:'MoF bilateral meeting: infrastructure co-investment framework',c:C.positive},
          {tag:'Members',txt:'Q1 2026 Sector Brief series now available',c:C.positive}].map((s,i)=>(
          <div key={i} style={{display:'flex',gap:'8px',marginBottom:'8px',alignItems:'flex-start'}}>
            <div style={{fontFamily:F.mono,fontSize:'9px',color:s.c,minWidth:'48px',paddingTop:'1px',fontWeight:700}}>{s.tag}</div>
            <div style={{fontFamily:F.sans,fontSize:'11px',color:C.ink,lineHeight:1.5}}>{s.txt}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── SECTOR SCORE GRID: all 12 at a glance ──────────────────────────────── */
const ScoreGrid=()=>(
  <div className="pad-dash" style={{background:C.paper,padding:'24px 32px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>BRIDGE Impact Score™ · All 12 Sectors</div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(6,1fr)',gap:'2px'}} className="g3">
      {[{n:'01 Infrastructure',s:87,t:'Core',c:C.forest},{n:'02 Financial Inclusion',s:84,t:'Core',c:C.forest},{n:'06 Agriculture',s:83,t:'Core',c:C.forest},{n:'03 Health Systems',s:79,t:'Core',c:C.forest},{n:'04 Technology',s:76,t:'Emerging',c:C.limeDark},{n:'10 Energy',s:74,t:'Emerging',c:C.limeDark},{n:'05 Education',s:72,t:'Emerging',c:C.limeDark},{n:'12 Transportation',s:71,t:'Emerging',c:C.limeDark},{n:'08 Housing',s:70,t:'Growth',c:C.amber},{n:'09 Tourism',s:68,t:'Growth',c:C.amber},{n:'11 Manufacturing',s:65,t:'Growth',c:C.amber},{n:'07 Sports & Creative',s:61,t:'Growth',c:C.amber}].map((sec,i)=>(
        <div key={i} style={{background:C.paperDark,padding:'10px 12px',borderLeft:`2px solid ${sec.c}`}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',color:C.muted,marginBottom:'4px',lineHeight:1.3}}>{sec.n}</div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
            <span style={{fontFamily:F.mono,fontSize:'18px',color:sec.c,lineHeight:1}}>{sec.s}</span>
            <span style={{fontFamily:F.sans,fontSize:'8px',color:C.faint,textTransform:'uppercase',letterSpacing:'0.5px'}}>{sec.t}</span>
          </div>
          <div style={{height:'2px',background:C.border,marginTop:'6px',borderRadius:'1px',overflow:'hidden'}}>
            <div style={{height:'100%',width:`${sec.s}%`,background:sec.c,borderRadius:'1px',opacity:0.6}}/>
          </div>
        </div>
      ))}
    </div>
    <div style={{marginTop:'10px',fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint}}>Score thresholds: Core ≥75 · Emerging 60–74 · Growth below 60 · Scores updated quarterly. Full methodology: Members.</div>
  </div>
);

/* ── WATCH ITEMS + FOOTNOTE ─────────────────────────────────────────────── */
const WatchItems=()=>(
  <div className="pad-dash" style={{background:C.paperDark,padding:'20px 32px',borderBottom:`1px solid ${C.border}`}}>
    <div className="g2 watch-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px'}}>
      <div>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Watch This Month</div>
        {[{evt:'BOG MPC Decision — 26 March',imp:'Rate trajectory; fintech funding cost implications'},
          {evt:'Q1 GSS GDP Estimate — Release',imp:'Sectoral growth breakdown; agri vs services split'},
          {evt:'BRIDGE Kejetia Phase 1 Review',imp:'50-day onboarding assessment; Phase 2 trigger decision'},
          {evt:'Cocoa Board seasonal pricing announcement',imp:'Agri sector score trigger — potential uplift to 84'}].map((w,i)=>(
          <div key={i} style={{display:'flex',gap:'10px',marginBottom:'8px',paddingBottom:'8px',borderBottom:i<3?`1px solid ${C.border}`:'none',alignItems:'flex-start'}}>
            <div style={{width:'4px',height:'4px',borderRadius:'50%',background:C.lime,flexShrink:0,marginTop:'6px'}}/>
            <div>
              <div style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.ink,marginBottom:'2px'}}>{w.evt}</div>
              <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.muted,lineHeight:1.4}}>{w.imp}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Members gate — compact */}
      <div className="members-gate" style={{background:C.forest,padding:'16px 20px',display:'flex',flexDirection:'column',justifyContent:'center'}}>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.lime,marginBottom:'8px'}}>Members · Full Dashboard</div>
        <p style={{fontFamily:F.sans,fontSize:'12px',color:'rgba(250,248,243,0.6)',lineHeight:1.6,marginBottom:'14px'}}>Members receive the expanded monthly dashboard: 174+ venture status tracker, sector alert notifications, pipeline deal-flow updates, and direct analyst commentary on each Watch Item.</p>
        <a href="#" style={{background:C.lime,color:C.ink,padding:'10px 18px',fontFamily:F.sans,fontSize:'11px',fontWeight:800,textDecoration:'none',borderRadius:'2px',letterSpacing:'0.5px',display:'inline-block',width:'fit-content'}}>Apply for Members Access</a>
      </div>
    </div>
  </div>
);

const Footer=()=>{
  const bt='2px solid rgba(184,217,53,0.25)';
  return(
  <div className="pad-footer" style={{background:'#060e08',padding:'14px 32px',borderTop:bt}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
        <Logo height={16} variant="white"/>
        <div style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.1)'}}/>
        <span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.2)'}}>Monthly Dashboard &middot; March 2026 &middot; bridgepbc.com/dashboard</span>
      </div>
      <div className="mob-hide" style={{display:'flex',gap:'14px'}}>
        {['Archive','Members','Contact'].map((l,i)=>(<a key={i} href="#" style={{fontFamily:F.sans,fontSize:'9px',fontWeight:600,color:'rgba(255,255,255,0.2)',textDecoration:'none'}}>{l}</a>))}
      </div>
    </div>
  </div>
  );
};

export default function MonthlyDashboard(){
  const r=useRef(null);
  return(<div style={{fontFamily:F.body,background:C.paper}}><Gf/><TopBar coverLogoRef={r}/><Header logoRef={r}/><MacroSnap/><Signals/><ScoreGrid/><WatchItems/><Footer/></div>);
}
