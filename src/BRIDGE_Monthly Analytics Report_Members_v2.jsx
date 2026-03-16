import { useState, useRef, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Tooltip, Cell } from "recharts";

const C={ink:'#0D1A10',paper:'#FAF8F3',paperDark:'#F0EDE4',forest:'#1B4D3E',lime:'#B8D935',limeDark:'#8FA825',muted:'#5C6B5E',faint:'#9AAA9C',border:'#D8D4C8',red:'#A8200D',amber:'#B8730A',positive:'#1A6B2F'};
const F={body:'"Source Serif 4","Georgia",serif',sans:'"DM Sans","Helvetica Neue",sans-serif',mono:'"DM Mono","Courier New",monospace'};

/* ── DATA ─────────────────────────────────────────────────────────────── */
const SECTORS=[{n:'Infra',s:87,t:'▲'},{n:'FinInc',s:84,t:'▲'},{n:'Health',s:79,t:'→'},{n:'Tech',s:76,t:'▲'},{n:'Edu',s:72,t:'→'},{n:'Agri',s:83,t:'▼'},{n:'Sport',s:61,t:'→'},{n:'Hous',s:70,t:'▲'},{n:'Tour',s:68,t:'→'},{n:'Energy',s:74,t:'▲'},{n:'Mfg',s:65,t:'→'},{n:'Trans',s:71,t:'▲'}];
const MACRO=[{l:'Cedi / USD',v:'14.2',ch:'+2.1%',dir:'▼',note:'MoM depreciation'},{l:'Policy Rate (BOG)',v:'27%',ch:'unchanged',dir:'→',note:'Hold expected through Q2'},{l:'Inflation (Feb)',v:'23.2%',ch:'-1.4pp',dir:'▲',note:'Easing trajectory sustained'},{l:'Remittance Index',v:'109.4',ch:'+4.2',dir:'▲',note:'vs. 105.2 prior month'}];
const POLICY=[{tag:'BOG',txt:'Digital payment interoperability framework update expected April',alert:'neutral'},{tag:'MoF',txt:'2026 Budget infrastructure disbursement schedule released',alert:'positive'},{tag:'SEC',txt:'Revised fintech licensing framework — public comment period open',alert:'positive'},{tag:'EPA',txt:'Environmental fast-track designation for renewable projects',alert:'positive'}];
const MARKET=[{sec:'Financial Inclusion',mov:'+3pts',dir:1},{sec:'Agriculture',mov:'-2pts',dir:-1},{sec:'Technology',mov:'+1pt',dir:1},{sec:'Energy',mov:'+2pts',dir:1},{sec:'Housing',mov:'→',dir:0},{sec:'Tourism',mov:'+1pt',dir:1}];
const BRIDGE_ACT=[{tag:'Pipeline',txt:'3 new ventures entered scoring process this month',c:C.positive},{tag:'Research',txt:'Agriculture Crisis strategy paper published — open access',c:C.positive},{tag:'Kejetia',txt:'Phase 1 vendor onboarding: 340 of 10,000 enrolled',c:C.amber},{tag:'Policy',txt:'MoF bilateral meeting: infrastructure co-investment framework',c:C.positive},{tag:'Members',txt:'Q1 2026 Sector Brief series now available',c:C.positive}];
const SCORES=[{n:'01 Infrastructure',s:87,tier:'Core',c:C.forest},{n:'02 Financial Inclusion',s:84,tier:'Core',c:C.forest},{n:'06 Agriculture',s:83,tier:'Core',c:C.forest},{n:'03 Health Systems',s:79,tier:'Core',c:C.forest},{n:'04 Technology',s:76,tier:'Emerging',c:C.limeDark},{n:'10 Energy',s:74,tier:'Emerging',c:C.limeDark},{n:'05 Education',s:72,tier:'Emerging',c:C.limeDark},{n:'12 Transportation',s:71,tier:'Emerging',c:C.limeDark},{n:'08 Housing',s:70,tier:'Growth',c:C.amber},{n:'09 Tourism',s:68,tier:'Growth',c:C.amber},{n:'11 Manufacturing',s:65,tier:'Growth',c:C.amber},{n:'07 Sports & Creative',s:61,tier:'Growth',c:C.amber}];
const WATCH=[{evt:'BOG MPC Decision — 26 March',imp:'Rate trajectory; fintech funding cost implications'},{evt:'Q1 GSS GDP Estimate — Release',imp:'Sectoral growth breakdown; agri vs services split'},{evt:'BRIDGE Kejetia Phase 1 Review',imp:'50-day onboarding assessment; Phase 2 trigger decision'},{evt:'Cocoa Board seasonal pricing',imp:'Agri sector score trigger — potential uplift to 84'}];
const INFLATION_TREND=[{m:'Oct',v:35.2},{m:'Nov',v:32.4},{m:'Dec',v:29.8},{m:'Jan',v:26.1},{m:'Feb',v:23.2}];
const CEDI_TREND=[{m:'Oct',v:13.1},{m:'Nov',v:13.4},{m:'Dec',v:13.8},{m:'Jan',v:13.9},{m:'Feb',v:14.2}];
const PIPELINE_DATA=[{name:'Infrastructure',val:42,fill:C.forest},{name:'Financial Inclusion',val:31,fill:C.forest},{name:'Agriculture',val:28,fill:C.forest},{name:'Technology',val:22,fill:C.limeDark},{name:'Energy',val:19,fill:C.limeDark},{name:'Health',val:17,fill:C.limeDark},{name:'Other',val:15,fill:C.amber}];

/* ── LOGO ─────────────────────────────────────────────────────────────── */
const Logo=({height=28,variant='white'})=>{
  const wf=variant==='white'?'#ffffff':'#1B4D3E';
  const bs=variant==='white'?'#ffffff':'#1B4D3E';
  const ws=variant==='white'?'#000000':'#1B4D3E';
  return(
    <svg height={height} viewBox="0 0 3258.5 932.3" xmlns="http://www.w3.org/2000/svg" style={{display:'block',flexShrink:0}}>
      <path fill={wf} d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"/>
      <path fill={wf} stroke={ws} strokeWidth="0.5" strokeMiterlimit="10" d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"/>
      <path fill={wf} stroke={ws} strokeWidth="0.5" strokeMiterlimit="10" d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"/>
      <rect fill="#b8d935" x="1427.4" y="17.4" width="205.2" height="145"/>
      <rect fill={wf} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/>
      <path fill={wf} d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7c0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"/>
      <rect fill={wf} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/>
      <rect fill="#b8d935" x="3083.4" y="339.5" width="175.1" height="257.7"/>
      <rect fill="#b8d935" x="3083.4" y="654.4" width="175.1" height="257.7"/>
      <rect fill="none" stroke={bs} strokeWidth="80" strokeMiterlimit="10" x="40" y="40" width="843.9" height="852.3" rx="36.6" ry="36.6"/>
      <polygon fill="#b8d935" stroke="#1b4d3e" strokeMiterlimit="10" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/>
      <path fill="#74914a" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z"/>
      <path fill="#b8d935" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"/>
    </svg>
  );
};

/* ── GLOBAL STYLES ────────────────────────────────────────────────────── */
const Gf=()=>(<style>{`
@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{scroll-behavior:smooth;}
body{background:#FAF8F3;-webkit-font-smoothing:antialiased;overflow-x:hidden;}
button{outline:none;-webkit-tap-highlight-color:transparent;}
@media print{.np{display:none!important;}.db{break-inside:avoid;}}
.recharts-tooltip-wrapper{outline:none;}
.mob-show{display:none;}
@media(max-width:900px){
  .tc{grid-template-columns:1fr!important;}
  .tc3{grid-template-columns:1fr 1fr!important;}
  .tc4{grid-template-columns:1fr 1fr!important;}
  .pad-section{padding:32px 24px!important;}
  .pad-topbar{padding:10px 24px!important;}
  .pad-footer{padding:14px 24px!important;}
  .hm{display:none!important;}
}
@media(max-width:600px){
  .tc{grid-template-columns:1fr!important;}
  .tc3{grid-template-columns:1fr!important;}
  .tc4{grid-template-columns:1fr 1fr!important;}
  .tc2w{grid-template-columns:1fr!important;}
  .pad-section{padding:20px 16px!important;}
  .pad-topbar{padding:10px 16px!important;}
  .pad-footer{padding:16px 16px!important;}
  .mob-hide{display:none!important;}
  .mob-show{display:block!important;}
  .mob-show-flex{display:flex!important;}
  .mob-stack{flex-direction:column!important;align-items:flex-start!important;gap:10px!important;}
  .mob-full{width:100%!important;}
  .mob-item-hidden{display:none!important;}
  .mob-toggle{display:flex!important;align-items:center;justify-content:space-between;width:100%;
    padding:10px 0;border:none;border-bottom:1px solid #D8D4C8;background:transparent;
    cursor:pointer;font-family:'DM Sans','Helvetica Neue',sans-serif;font-size:10px;font-weight:700;
    letter-spacing:1.5px;text-transform:uppercase;color:#5C6B5E;}
  .mob-toggle-dark{border-color:rgba(255,255,255,0.12)!important;color:rgba(250,248,243,0.35)!important;}
  .pulse-scroll{display:flex!important;overflow-x:auto!important;scrollbar-width:none!important;
    -webkit-overflow-scrolling:touch;}
  .pulse-scroll::-webkit-scrollbar{display:none;}
  .pulse-grid{display:none!important;}
  .mob-scores-list{display:block!important;}
  .mob-scores-grid{display:none!important;}
  .mob-nav{display:flex!important;}
  .mob-nav-spacer{display:block!important;}
  .mob-chart-hide{display:none!important;}
  .mob-preview-2col{grid-template-columns:1fr 1fr!important;}
  .mob-preview-hide{display:none!important;}
  .mob-cta-stack{flex-direction:column!important;align-items:stretch!important;}
  .mob-cta-stack a{text-align:center!important;}
}
`}</style>);

/* ── TOPBAR ───────────────────────────────────────────────────────────── */
const TopBar=()=>(
  <div className="np pad-topbar" style={{position:'sticky',top:0,zIndex:100,background:C.paper,borderBottom:`1px solid ${C.border}`,padding:'10px 40px',display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 1px 8px rgba(0,0,0,0.05)'}}>
    <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
      {/* Desktop: full logo */}
      <div className="mob-hide"><Logo height={20} variant="dark"/></div>
      {/* Mobile: icon mark only — extract just the icon portion via cropped viewBox */}
      <div className="mob-show" style={{display:'none'}}>
        <svg height="28" viewBox="0 0 932 932" xmlns="http://www.w3.org/2000/svg" style={{display:'block'}}>
          <rect fill="none" stroke="#1B4D3E" strokeWidth="80" strokeMiterlimit="10" x="40" y="40" width="843.9" height="852.3" rx="36.6" ry="36.6"/>
          <polygon fill="#b8d935" stroke="#1b4d3e" strokeMiterlimit="10" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/>
          <path fill="#74914a" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z"/>
          <path fill="#b8d935" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"/>
        </svg>
      </div>
      <div style={{width:'1px',height:'16px',background:C.border}}/>
      <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.forest,background:'rgba(27,77,62,0.08)',padding:'3px 8px'}}>Member Dashboard</span>
      <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'9px',fontWeight:600,letterSpacing:'1px',textTransform:'uppercase',color:C.muted,background:C.paperDark,padding:'3px 8px'}}>March 2026 · Member Edition</span>
    </div>
    <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
      <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'9px',color:C.faint}}>bridgepbc.com/members</span>
      <a href="#upgrade" style={{background:C.forest,color:C.lime,padding:'7px 14px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none',letterSpacing:'0.3px',whiteSpace:'nowrap'}}>Upgrade →</a>
    </div>
  </div>
);

/* ── MOBILE BOTTOM NAV ────────────────────────────────────────────────── */
const MobileNav=({active,setActive})=>{
  const tabs=[
    {id:'macro',label:'Macro',icon:(<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>)},
    {id:'scores',label:'Scores',icon:(<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>)},
    {id:'signals',label:'Signals',icon:(<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>)},
    {id:'watch',label:'Watch',icon:(<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>)},
    {id:'upgrade',label:'Upgrade',icon:(<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>)},
  ];
  return(
    <div className="mob-nav" style={{display:'none',position:'fixed',bottom:0,left:0,right:0,zIndex:200,background:C.ink,borderTop:`1px solid rgba(255,255,255,0.08)`,paddingBottom:'env(safe-area-inset-bottom)',WebkitTapHighlightColor:'transparent'}}>
      {tabs.map(t=>{
        const isActive=active===t.id;
        const isUpgrade=t.id==='upgrade';
        return(
          <button key={t.id} onClick={()=>setActive(t.id)} style={{
            flex:1,padding:'9px 4px 7px',
            border:'none',
            outline:'none',
            background:isUpgrade&&isActive?'rgba(184,217,53,0.1)':isActive?'rgba(255,255,255,0.04)':'transparent',
            cursor:'pointer',
            display:'flex',flexDirection:'column',alignItems:'center',gap:'3px',
            color:isActive?C.lime:'rgba(255,255,255,0.32)',
            transition:'color 0.15s,background 0.15s',
            WebkitTapHighlightColor:'transparent',
            borderTop:isActive?`2px solid ${C.lime}`:'2px solid transparent',
          }}>
            {t.icon}
            <span style={{fontFamily:F.sans,fontSize:'8px',fontWeight:700,letterSpacing:'0.5px',textTransform:'uppercase'}}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
};

/* ── HEADER ───────────────────────────────────────────────────────────── */
const Header=()=>(
  <div style={{background:C.ink}}>
    <div className="pad-section tc" style={{padding:'20px 40px',display:'grid',gridTemplateColumns:'1fr auto',gap:'20px',alignItems:'flex-start',borderBottom:`1px solid rgba(255,255,255,0.06)`}}>
      <div>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'rgba(184,217,53,0.6)',marginBottom:'8px'}}>BRIDGE Member Intelligence</div>
        <div style={{fontFamily:F.sans,fontSize:'28px',fontWeight:300,color:'#FAF8F3',lineHeight:1.2,letterSpacing:'-0.3px'}}>
          Ghana Opportunity Monitor<br/>
          <span style={{fontWeight:700,color:C.lime}}>March 2026</span>
        </div>
        <div style={{fontFamily:F.body,fontSize:'13px',fontStyle:'italic',color:'rgba(250,248,243,0.45)',marginTop:'8px',maxWidth:'480px',lineHeight:1.6}}>
          Your member-tier briefing — macro conditions, sector intelligence, and policy signals across all 12 sectors. Analytics and venture pipeline available in the full Dashboard.
        </div>
      </div>
      <div className="mob-hide" style={{textAlign:'right',flexShrink:0}}>
        <div style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.2)',letterSpacing:'1px',marginBottom:'4px'}}>ISSUED</div>
        <div style={{fontFamily:F.mono,fontSize:'13px',color:'rgba(255,255,255,0.45)'}}>01 March 2026</div>
        <div style={{fontFamily:F.mono,fontSize:'10px',color:'rgba(255,255,255,0.2)',marginTop:'8px'}}>Vol.I Issue 03</div>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.lime,border:`1px solid rgba(184,217,53,0.3)`,padding:'3px 8px',letterSpacing:'1px',marginTop:'8px',display:'inline-block'}}>MEMBER EDITION</div>
      </div>
    </div>
    {/* Pulse bar — desktop grid, mobile horizontal scroll */}
    <div className="pulse-grid" style={{display:'grid',gridTemplateColumns:'repeat(12,1fr)',padding:'0 40px',borderBottom:`1px solid rgba(255,255,255,0.06)`}}>
      {SECTORS.map((s,i)=>(
        <div key={i} style={{padding:'8px 4px',borderRight:i<11?`1px solid rgba(255,255,255,0.04)`:'none',textAlign:'center'}}>
          <div style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.25)',marginBottom:'2px',letterSpacing:'0.5px'}}>{s.n}</div>
          <div style={{fontFamily:F.mono,fontSize:'13px',fontWeight:500,color:s.s>=80?C.lime:s.s>=70?'rgba(184,217,53,0.7)':'rgba(184,115,10,0.9)',lineHeight:1}}>{s.s}</div>
          <div style={{fontFamily:F.mono,fontSize:'9px',color:s.t==='▲'?C.positive:s.t==='▼'?C.red:'rgba(255,255,255,0.2)',marginTop:'1px'}}>{s.t}</div>
        </div>
      ))}
    </div>
    {/* Mobile pulse scroll */}
    <div className="pulse-scroll" style={{display:'none',borderBottom:`1px solid rgba(255,255,255,0.06)`}}>
      {SECTORS.map((s,i)=>(
        <div key={i} style={{flexShrink:0,padding:'7px 12px',textAlign:'center',borderRight:`1px solid rgba(255,255,255,0.04)`}}>
          <div style={{fontFamily:F.mono,fontSize:'8px',color:'rgba(255,255,255,0.25)',marginBottom:'2px',letterSpacing:'0.3px'}}>{s.n}</div>
          <div style={{fontFamily:F.mono,fontSize:'12px',fontWeight:500,color:s.s>=80?C.lime:s.s>=70?'rgba(184,217,53,0.7)':'rgba(184,115,10,0.9)',lineHeight:1}}>{s.s}</div>
          <div style={{fontFamily:F.mono,fontSize:'9px',color:s.t==='▲'?C.positive:s.t==='▼'?C.red:'rgba(255,255,255,0.2)',marginTop:'1px'}}>{s.t}</div>
        </div>
      ))}
    </div>
  </div>
);

/* ── MACRO ────────────────────────────────────────────────────────────── */
const MacroSection=()=>{
  const[open,setOpen]=useState(false);
  return(
    <div id="macro" className="pad-section" style={{background:C.paper,padding:'24px 40px',borderBottom:`1px solid ${C.border}`}}>
      <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'16px'}}>Ghana Macro · March 2026</div>
      {/* Stat tiles — 4-col desktop, 2-col mobile */}
      <div className="tc4" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'2px',marginBottom:'16px'}}>
        {MACRO.map((d,i)=>(
          <div key={i} style={{background:C.paperDark,padding:'14px 16px',borderTop:`2px solid ${d.dir==='▲'?C.limeDark:d.dir==='▼'?C.red:C.amber}`}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',letterSpacing:'1px',textTransform:'uppercase',color:C.faint,marginBottom:'6px'}}>{d.l}</div>
            <div style={{fontFamily:F.mono,fontSize:'24px',color:C.ink,lineHeight:1,marginBottom:'4px'}}>{d.v}</div>
            <div style={{fontFamily:F.mono,fontSize:'11px',color:d.dir==='▲'?C.positive:d.dir==='▼'?C.red:C.amber,marginBottom:'4px'}}>{d.ch} {d.dir}</div>
            <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint}}>{d.note}</div>
          </div>
        ))}
      </div>
      {/* Sparklines — hidden on mobile to reduce weight */}
      <div className="mob-chart-hide tc" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px'}}>
        <div style={{background:C.paperDark,padding:'14px 16px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Inflation Trajectory (%) · 5-Month</div>
          <ResponsiveContainer width="100%" height={60}>
            <LineChart data={INFLATION_TREND} margin={{top:2,right:4,bottom:2,left:0}}>
              <Line type="monotone" dataKey="v" stroke={C.positive} strokeWidth={2} dot={{r:3,fill:C.positive}}/>
              <XAxis dataKey="m" tick={{fontFamily:F.mono,fontSize:9,fill:C.faint}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{background:C.ink,border:'none',borderRadius:2,fontFamily:F.mono,fontSize:10,color:'#FAF8F3'}} formatter={(v)=>[`${v}%`,'']} labelFormatter={()=>''}/>
            </LineChart>
          </ResponsiveContainer>
          <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint,marginTop:'4px'}}>Easing trend sustained — 12pp decline Oct–Feb</div>
        </div>
        <div style={{background:C.paperDark,padding:'14px 16px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'10px'}}>Cedi / USD Rate · 5-Month</div>
          <ResponsiveContainer width="100%" height={60}>
            <LineChart data={CEDI_TREND} margin={{top:2,right:4,bottom:2,left:0}}>
              <Line type="monotone" dataKey="v" stroke={C.red} strokeWidth={2} dot={{r:3,fill:C.red}}/>
              <XAxis dataKey="m" tick={{fontFamily:F.mono,fontSize:9,fill:C.faint}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{background:C.ink,border:'none',borderRadius:2,fontFamily:F.mono,fontSize:10,color:'#FAF8F3'}} formatter={(v)=>[`₵${v}`,'']} labelFormatter={()=>''}/>
            </LineChart>
          </ResponsiveContainer>
          <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint,marginTop:'4px'}}>Gradual depreciation — +8.4% since October</div>
        </div>
      </div>
      {/* Mobile sparkline summary note (replaces charts) */}
      <div className="mob-show" style={{display:'none',background:C.paperDark,padding:'12px 14px',borderLeft:`3px solid ${C.lime}`,marginTop:'0'}}>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'4px'}}>Trend Summary</div>
        <div style={{fontFamily:F.body,fontSize:'12px',fontStyle:'italic',color:C.muted,lineHeight:1.6}}>Inflation easing 35.2% → 23.2% (Oct–Feb). Cedi depreciating gradually ₵13.1 → ₵14.2 against USD over the same period.</div>
      </div>
    </div>
  );
};

/* ── SCORES ───────────────────────────────────────────────────────────── */
const ScoreSection=()=>{
  const[exp,setExp]=useState(false);
  return(
    <div id="scores" className="pad-section" style={{background:C.paperDark,padding:'24px 40px',borderBottom:`1px solid ${C.border}`}}>
      <div className="tc" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',alignItems:'start'}}>
        <div>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>BRIDGE Impact Score™ · All 12 Sectors</div>
          {/* Desktop: 3-col tile grid */}
          <div className="mob-scores-grid" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'2px'}}>
            {SCORES.map((sec,i)=>(
              <div key={i} style={{background:C.paper,padding:'10px 12px',borderLeft:`2px solid ${sec.c}`}}>
                <div style={{fontFamily:F.sans,fontSize:'9px',color:C.muted,marginBottom:'4px',lineHeight:1.3}}>{sec.n}</div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
                  <span style={{fontFamily:F.mono,fontSize:'18px',color:sec.c,lineHeight:1}}>{sec.s}</span>
                  <span style={{fontFamily:F.sans,fontSize:'8px',color:C.faint,textTransform:'uppercase',letterSpacing:'0.5px'}}>{sec.tier}</span>
                </div>
                <div style={{height:'2px',background:C.border,marginTop:'6px',borderRadius:'1px',overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${sec.s}%`,background:sec.c,borderRadius:'1px',opacity:0.65}}/>
                </div>
              </div>
            ))}
          </div>
          {/* Mobile: progressive list */}
          <div className="mob-scores-list" style={{display:'none'}}>
            <button className="mob-toggle" onClick={()=>setExp(o=>!o)}>
              <span>All 12 Sectors</span>
              <span style={{transition:'transform 0.2s',display:'inline-block',transform:exp?'rotate(180deg)':'none'}}>↓</span>
            </button>
            {SCORES.map((sec,i)=>(
              <div key={i} className={i>=4?(exp?'':'mob-item-hidden'):''} style={{display:'flex',alignItems:'center',gap:'10px',padding:'9px 0',borderBottom:`1px solid ${C.border}`}}>
                <div style={{width:'3px',height:'28px',background:sec.c,borderRadius:'2px',flexShrink:0}}/>
                <div style={{flex:1}}>
                  <div style={{fontFamily:F.sans,fontSize:'11px',color:C.ink,fontWeight:500}}>{sec.n}</div>
                  <div style={{height:'2px',background:C.border,marginTop:'4px',borderRadius:'1px',overflow:'hidden'}}>
                    <div style={{height:'100%',width:`${sec.s}%`,background:sec.c,opacity:0.7}}/>
                  </div>
                </div>
                <div style={{fontFamily:F.mono,fontSize:'18px',color:sec.c,fontWeight:500,flexShrink:0}}>{sec.s}</div>
              </div>
            ))}
            {!exp&&<button className="mob-show mob-toggle" onClick={()=>setExp(true)} style={{display:'flex',color:C.forest,borderColor:C.forest}}>
              <span>View remaining {SCORES.length-4} sectors ↓</span>
            </button>}
          </div>
          <div style={{marginTop:'8px',fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint}}>Core ≥75 · Emerging 60–74 · Growth &lt;60 · Updated quarterly</div>
        </div>
        {/* Bar chart — hidden on mobile */}
        <div className="mob-chart-hide">
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Score Distribution — Visual</div>
          <div style={{background:C.paper,padding:'16px 12px 8px'}}>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={SCORES.map(s=>({name:s.n.replace(/^\d+ /,''),score:s.s,c:s.c}))} layout="vertical" margin={{top:0,right:12,bottom:0,left:0}}>
                <CartesianGrid horizontal={false} stroke={C.border} strokeDasharray="2 2"/>
                <XAxis type="number" domain={[0,100]} tick={{fontFamily:F.mono,fontSize:8,fill:C.faint}} axisLine={false} tickLine={false}/>
                <YAxis type="category" dataKey="name" tick={{fontFamily:F.sans,fontSize:9,fill:C.muted}} axisLine={false} tickLine={false} width={90}/>
                <Tooltip contentStyle={{background:C.ink,border:'none',borderRadius:2,fontFamily:F.mono,fontSize:10,color:'#FAF8F3'}} formatter={(v)=>[v,'']}/>
                <Bar dataKey="score" radius={[0,2,2,0]}>
                  {SCORES.map((s,i)=><Cell key={i} fill={s.c} opacity={0.8}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div style={{display:'flex',gap:'16px',paddingTop:'8px',borderTop:`1px solid ${C.border}`,marginTop:'4px'}}>
              {[{l:'Core',c:C.forest},{l:'Emerging',c:C.limeDark},{l:'Growth',c:C.amber}].map((g,i)=>(
                <div key={i} style={{display:'flex',alignItems:'center',gap:'5px'}}>
                  <div style={{width:'8px',height:'8px',background:g.c,opacity:0.8}}/>
                  <span style={{fontFamily:F.sans,fontSize:'9px',color:C.muted}}>{g.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── SIGNALS ──────────────────────────────────────────────────────────── */
const SignalsSection=()=>{
  const[openPol,setOpenPol]=useState(false);
  const[openMkt,setOpenMkt]=useState(false);
  const[openBri,setOpenBri]=useState(false);
  return(
    <div id="signals" className="pad-section" style={{background:C.paper,padding:'24px 40px',borderBottom:`1px solid ${C.border}`}}>
      <div className="tc" style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'20px'}}>
        {/* Policy */}
        <div>
          <button className="mob-toggle" onClick={()=>setOpenPol(o=>!o)}>
            <span>Policy Signals</span>
            <span className="mob-show" style={{display:'none',transition:'transform 0.2s',transform:openPol?'rotate(180deg)':'none'}}>↓</span>
          </button>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px',paddingBottom:'6px',borderBottom:`1px solid ${C.border}`}} className="mob-hide">Policy Signals</div>
          {POLICY.map((s,i)=>(
            <div key={i} className={i>=1?(openPol?'':'mob-item-hidden'):''} style={{display:'flex',gap:'8px',marginBottom:'10px',alignItems:'flex-start'}}>
              <div style={{fontFamily:F.mono,fontSize:'9px',color:s.alert==='positive'?C.positive:C.amber,minWidth:'28px',paddingTop:'2px',fontWeight:700}}>{s.tag}</div>
              <div style={{fontFamily:F.sans,fontSize:'11px',color:C.ink,lineHeight:1.5}}>{s.txt}</div>
            </div>
          ))}
        </div>
        {/* Market */}
        <div>
          <button className="mob-toggle" onClick={()=>setOpenMkt(o=>!o)}>
            <span>Market Movements</span>
            <span className="mob-show" style={{display:'none',transition:'transform 0.2s',transform:openMkt?'rotate(180deg)':'none'}}>↓</span>
          </button>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px',paddingBottom:'6px',borderBottom:`1px solid ${C.border}`}} className="mob-hide">Market Movements</div>
          {MARKET.map((m,i)=>(
            <div key={i} className={i>=2?(openMkt?'':'mob-item-hidden'):''} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'7px 0',borderBottom:i<MARKET.length-1?`1px solid ${C.border}`:'none'}}>
              <div style={{fontFamily:F.sans,fontSize:'11px',color:C.ink}}>{m.sec}</div>
              <span style={{fontFamily:F.mono,fontSize:'11px',color:m.dir>0?C.positive:m.dir<0?C.red:C.amber,fontWeight:700}}>{m.mov}</span>
            </div>
          ))}
        </div>
        {/* BRIDGE Activity */}
        <div>
          <button className="mob-toggle" onClick={()=>setOpenBri(o=>!o)}>
            <span>BRIDGE Activity</span>
            <span className="mob-show" style={{display:'none',transition:'transform 0.2s',transform:openBri?'rotate(180deg)':'none'}}>↓</span>
          </button>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'10px',paddingBottom:'6px',borderBottom:`1px solid ${C.border}`}} className="mob-hide">BRIDGE Activity</div>
          {BRIDGE_ACT.map((s,i)=>(
            <div key={i} className={i>=2?(openBri?'':'mob-item-hidden'):''} style={{display:'flex',gap:'8px',marginBottom:'10px',alignItems:'flex-start'}}>
              <div style={{fontFamily:F.mono,fontSize:'9px',color:s.c,minWidth:'48px',paddingTop:'2px',fontWeight:700}}>{s.tag}</div>
              <div style={{fontFamily:F.sans,fontSize:'11px',color:C.ink,lineHeight:1.5}}>{s.txt}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── PIPELINE ─────────────────────────────────────────────────────────── */
const PipelineSection=()=>(
  <div style={{background:C.paperDark,padding:'24px 40px',borderBottom:`1px solid ${C.border}`}} className="pad-section">
    <div className="tc" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px',alignItems:'start'}}>
      <div>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'4px'}}>Venture Pipeline · By Sector</div>
        <div style={{fontFamily:F.body,fontSize:'10px',fontStyle:'italic',color:C.faint,marginBottom:'12px'}}>174 ventures tracked · March 2026</div>
        <div style={{background:C.paper,padding:'16px 12px 10px'}}>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={PIPELINE_DATA} margin={{top:0,right:8,bottom:0,left:0}}>
              <CartesianGrid vertical={false} stroke={C.border} strokeDasharray="2 2"/>
              <XAxis dataKey="name" tick={{fontFamily:F.sans,fontSize:8,fill:C.faint}} axisLine={false} tickLine={false} interval={0} angle={-20} textAnchor="end" height={36}/>
              <YAxis tick={{fontFamily:F.mono,fontSize:9,fill:C.faint}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{background:C.ink,border:'none',borderRadius:2,fontFamily:F.mono,fontSize:10,color:'#FAF8F3'}} formatter={(v)=>[`${v} ventures`,'']}/>
              <Bar dataKey="val" radius={[2,2,0,0]}>
                {PIPELINE_DATA.map((d,i)=><Cell key={i} fill={d.fill} opacity={0.75}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div>
        <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>Pipeline Summary</div>
        <div className="tc4" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px',marginBottom:'12px'}}>
          {[{l:'Total Ventures',v:'174',ch:'+12 this month'},{l:'Avg Impact Score',v:'74.3',ch:'+1.2 QoQ'},{l:'Core Sector %',v:'64%',ch:'of pipeline'},{l:'New This Month',v:'12',ch:'entered scoring'}].map((d,i)=>(
            <div key={i} style={{background:C.paper,padding:'12px 14px'}}>
              <div style={{fontFamily:F.sans,fontSize:'9px',textTransform:'uppercase',letterSpacing:'1px',color:C.faint,marginBottom:'4px'}}>{d.l}</div>
              <div style={{fontFamily:F.mono,fontSize:'20px',color:C.forest,lineHeight:1,marginBottom:'2px'}}>{d.v}</div>
              <div style={{fontFamily:F.mono,fontSize:'10px',color:C.muted}}>{d.ch}</div>
            </div>
          ))}
        </div>
        <div style={{background:C.paper,padding:'12px 14px',position:'relative',overflow:'hidden'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Top Ventures by Score</div>
          {[{n:'Kejetia Digital Platform',s:91,sec:'Infrastructure'},{n:'GhIPSS FinTech Bridge',s:88,sec:'Financial Inclusion'},{n:'SolarGen Rural Grid',s:86,sec:'Energy'},{n:'AgriTech Cooperative Hub',s:84,sec:'Agriculture'}].map((v,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:i<3?`1px solid ${C.border}`:'none',alignItems:'center'}}>
              <div><div style={{fontFamily:F.sans,fontSize:'11px',color:C.ink}}>{v.n}</div><div style={{fontFamily:F.mono,fontSize:'9px',color:C.faint}}>{v.sec}</div></div>
              <div style={{fontFamily:F.mono,fontSize:'14px',color:C.forest,fontWeight:600}}>{v.s}</div>
            </div>
          ))}
          <div style={{position:'absolute',bottom:0,left:0,right:0,height:'55%',backdropFilter:'blur(4px)',background:'rgba(240,237,228,0.75)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'6px'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.forest} strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,color:C.forest,letterSpacing:'1px',textTransform:'uppercase'}}>Full list in Dashboard</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ── WATCH ────────────────────────────────────────────────────────────── */
const WatchSection=()=>(
  <div id="watch" className="pad-section" style={{background:C.paper,padding:'24px 40px',borderBottom:`1px solid ${C.border}`}}>
    <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:C.muted,marginBottom:'14px'}}>Watch This Month</div>
    <div className="tc2w" style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'2px'}}>
      {WATCH.map((w,i)=>(
        <div key={i} style={{background:C.paperDark,padding:'14px 16px',display:'flex',gap:'12px',alignItems:'flex-start'}}>
          <div style={{width:'5px',height:'5px',borderRadius:'50%',background:C.lime,flexShrink:0,marginTop:'5px'}}/>
          <div>
            <div style={{fontFamily:F.sans,fontSize:'12px',fontWeight:700,color:C.ink,marginBottom:'3px'}}>{w.evt}</div>
            <div style={{fontFamily:F.body,fontSize:'11px',fontStyle:'italic',color:C.muted,lineHeight:1.5}}>{w.imp}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ── DASHBOARD CTA ────────────────────────────────────────────────────── */
const DashboardCTA=()=>{
  const lockIcon=(<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(184,217,53,0.5)" strokeWidth="2" style={{flexShrink:0}}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>);
  return(
    <div id="upgrade" style={{background:C.ink}}>
      <div className="pad-section" style={{padding:'56px 40px',maxWidth:'960px',margin:'0 auto'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'20px'}}>
          <div style={{width:'24px',height:'1px',background:C.lime}}/>
          <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'2.5px',textTransform:'uppercase',color:C.lime}}>BRIDGE Intelligence Dashboard</span>
        </div>
        <div style={{maxWidth:'620px',marginBottom:'14px'}}>
          <div style={{fontFamily:F.sans,fontSize:'38px',fontWeight:300,lineHeight:1.15,color:'#FAF8F3',letterSpacing:'-0.5px'}}>
            You're working with<br/>
            <span style={{fontWeight:800,color:C.lime}}>half the intelligence.</span>
          </div>
        </div>
        <p style={{fontFamily:F.sans,fontSize:'14px',color:'rgba(250,248,243,0.5)',lineHeight:1.7,maxWidth:'520px',marginBottom:'32px'}}>
          Your Member account unlocks sector briefs, policy signals, and this monthly dashboard. The BRIDGE Intelligence Dashboard is the next tier — live data, full venture pipeline, deal-flow alerts, and direct analyst access. Priced separately from membership.
        </p>
        {/* Access comparison — stacks on mobile */}
        <div className="tc" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'2px',marginBottom:'28px'}}>
          <div style={{background:'rgba(255,255,255,0.04)',padding:'22px 20px',borderTop:`2px solid rgba(255,255,255,0.1)`}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.35)',marginBottom:'14px'}}>Your Current Access · Member</div>
            {['Monthly Intelligence Briefing (this document)','12-sector BRIDGE Impact Scores','Macro indicators & trend lines','Policy signals & regulatory alerts','BRIDGE Activity updates','Community portal & member directory','Sector deep-dive documents'].map((f,i)=>(
              <div key={i} style={{display:'flex',gap:'8px',marginBottom:'8px',alignItems:'flex-start'}}>
                <div style={{width:'14px',height:'14px',borderRadius:'50%',background:'rgba(255,255,255,0.08)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:'1px'}}><div style={{width:'5px',height:'5px',borderRadius:'50%',background:'rgba(255,255,255,0.3)'}}/></div>
                <div style={{fontFamily:F.sans,fontSize:'12px',color:'rgba(250,248,243,0.45)',lineHeight:1.4}}>{f}</div>
              </div>
            ))}
          </div>
          <div style={{background:'rgba(184,217,53,0.06)',padding:'22px 20px',borderTop:`2px solid ${C.lime}`}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>Intelligence Dashboard · Upgrade</div>
            {['Live sector scores — updated in real-time','Full 174+ venture pipeline with status tracking','Deal-flow alerts & investment opportunity feed','Sector-level analytics & comparative charts','Direct analyst commentary per Watch Item','Policy change notifications as they happen','Early-access research before public release','Co-investment introduction programme'].map((f,i)=>(
              <div key={i} style={{display:'flex',gap:'8px',marginBottom:'8px',alignItems:'flex-start'}}>
                <div style={{width:'14px',height:'14px',borderRadius:'50%',background:'rgba(184,217,53,0.15)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:'1px'}}><div style={{width:'5px',height:'5px',borderRadius:'50%',background:C.lime}}/></div>
                <div style={{fontFamily:F.sans,fontSize:'12px',color:'rgba(250,248,243,0.7)',lineHeight:1.4}}>{f}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Preview — 50% visible */}
        <div style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)',padding:'20px',marginBottom:'28px'}}>
          <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.2)',marginBottom:'14px'}}>Dashboard Preview · Intelligence Platform</div>
          {/* Row 1 — all visible — 2-col on mobile */}
          <div className="mob-preview-2col" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'2px',marginBottom:'2px'}}>
            {[{l:'Active Ventures',v:'174',ch:'+12 this month ▲',vc:C.positive},{l:'Avg Impact Score',v:'74.3',ch:'+1.2 QoQ ▲',vc:C.positive},{l:'Pipeline Value',v:'$2.4B',ch:'est. GVA impact',vc:C.positive},{l:'Policy Alerts',v:'7',ch:'active this month',vc:C.amber}].map((d,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,0.06)',padding:'12px 14px'}}>
                <div style={{fontFamily:F.mono,fontSize:'8px',color:'rgba(255,255,255,0.25)',marginBottom:'4px',textTransform:'uppercase',letterSpacing:'1px'}}>{d.l}</div>
                <div style={{fontFamily:F.mono,fontSize:'22px',color:C.lime,lineHeight:1}}>{d.v}</div>
                <div style={{fontFamily:F.mono,fontSize:'9px',color:d.vc,marginTop:'2px'}}>{d.ch}</div>
              </div>
            ))}
          </div>
          {/* Row 2 — 2 visible, 2 locked — hide row on mobile */}
          <div className="mob-preview-hide" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'2px',marginBottom:'2px'}}>
            {[{l:'Top Venture · Infra',v:'Kejetia Digital Platform',s:'Score: 91',vis:true},{l:'New Alert · FinTech',v:'SEC Rule — Final Reading',s:'High impact',vis:true},{l:'Deal Flow Alert',v:'Infrastructure SPV',s:'Series B open',vis:false},{l:'Watchlist Move',v:'Energy +2pts',s:'Score update',vis:false}].map((d,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,0.05)',padding:'10px 12px',position:'relative',minHeight:'56px'}}>
                <div style={{fontFamily:F.mono,fontSize:'8px',color:'rgba(255,255,255,0.2)',letterSpacing:'1px',textTransform:'uppercase',marginBottom:'3px'}}>{d.l}</div>
                <div style={{fontFamily:F.mono,fontSize:'11px',color:'rgba(255,255,255,0.5)'}}>{d.v}</div>
                <div style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.25)',marginTop:'2px'}}>{d.s}</div>
                {!d.vis&&<div style={{position:'absolute',inset:0,backdropFilter:'blur(5px)',background:'rgba(13,26,16,0.55)',display:'flex',alignItems:'center',justifyContent:'center',gap:'5px'}}>{lockIcon}<span style={{fontFamily:F.sans,fontSize:'8px',color:'rgba(184,217,53,0.5)',letterSpacing:'1px',textTransform:'uppercase'}}>Dashboard</span></div>}
              </div>
            ))}
          </div>
          {/* Row 3 — all locked — hide on mobile */}
          <div className="mob-preview-hide" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'2px'}}>
            {[{l:'Analyst Commentary',v:'BOG rate hold implications'},{l:'Research Alert',v:'Q1 Agriculture Brief'},{l:'Co-investment',v:'Solar infrastructure round'},{l:'Member Intro',v:'3 new match requests'}].map((d,i)=>(
              <div key={i} style={{background:'rgba(255,255,255,0.04)',padding:'10px 12px',position:'relative',minHeight:'48px'}}>
                <div style={{fontFamily:F.mono,fontSize:'8px',color:'rgba(255,255,255,0.15)',letterSpacing:'1px',textTransform:'uppercase'}}>{d.l}</div>
                <div style={{fontFamily:F.mono,fontSize:'11px',color:'rgba(255,255,255,0.2)',marginTop:'3px'}}>{d.v}</div>
                <div style={{position:'absolute',inset:0,backdropFilter:'blur(5px)',background:'rgba(13,26,16,0.6)',display:'flex',alignItems:'center',justifyContent:'center',gap:'5px'}}>{lockIcon}</div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',paddingTop:'12px',fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.12)',letterSpacing:'1px'}}>BRIDGE INTELLIGENCE DASHBOARD · LIVE PLATFORM · BRIDGEPBC.COM/DASHBOARD</div>
        </div>
        {/* Pricing + CTAs */}
        <div className="mob-cta-stack" style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'20px',paddingTop:'4px'}}>
          <div>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:'6px'}}>Intelligence Dashboard Access</div>
            <div style={{display:'flex',alignItems:'baseline',gap:'10px',marginBottom:'6px',flexWrap:'wrap'}}>
              <span style={{fontFamily:F.mono,fontSize:'13px',color:'rgba(255,255,255,0.3)',textDecoration:'line-through'}}>Public</span>
              <span style={{fontFamily:F.mono,fontSize:'30px',fontWeight:500,color:'#FAF8F3'}}>Members</span>
              <span style={{fontFamily:F.sans,fontSize:'12px',color:'rgba(250,248,243,0.35)'}}>+ Dashboard tier</span>
            </div>
            <div style={{fontFamily:F.sans,fontSize:'11px',color:'rgba(250,248,243,0.3)'}}>Already a member — unlock the next tier. Contact the BRIDGE team to activate.</div>
          </div>
          <div className="mob-cta-stack mob-full" style={{display:'flex',gap:'12px',alignItems:'center',flexWrap:'wrap'}}>
            <a href="#" className="mob-full" style={{background:C.lime,color:C.ink,padding:'14px 32px',fontFamily:F.sans,fontSize:'13px',fontWeight:800,textDecoration:'none',letterSpacing:'0.3px',display:'inline-block',whiteSpace:'nowrap',textAlign:'center'}}>Activate Dashboard Access</a>
            <a href="#" className="mob-full" style={{border:'1px solid rgba(255,255,255,0.15)',color:'rgba(250,248,243,0.6)',padding:'14px 22px',fontFamily:F.sans,fontSize:'13px',fontWeight:600,textDecoration:'none',display:'inline-block',whiteSpace:'nowrap',textAlign:'center'}}>Learn More</a>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── FOOTER ───────────────────────────────────────────────────────────── */
const Footer=()=>(
  <div className="pad-footer" style={{background:'#060e08',padding:'14px 40px',borderTop:'2px solid rgba(184,217,53,0.25)'}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'8px'}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
        <Logo height={16} variant="white"/>
        <div style={{width:'1px',height:'14px',background:'rgba(255,255,255,0.1)'}}/>
        <span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(255,255,255,0.2)'}}>Member Dashboard · March 2026 · bridgepbc.com/members</span>
      </div>
      <div className="mob-hide" style={{display:'flex',gap:'16px'}}>
        {['Archive','Dashboard','Contact','Members'].map((l,i)=>(<a key={i} href="#" style={{fontFamily:F.sans,fontSize:'9px',fontWeight:600,color:'rgba(255,255,255,0.2)',textDecoration:'none'}}>{l}</a>))}
      </div>
    </div>
  </div>
);

/* ── MOBILE NAV SPACER ────────────────────────────────────────────────── */
const MobileNavSpacer=()=>(
  <div className="mob-nav-spacer" style={{display:'none',height:'58px',background:'#060e08'}}/>
);

/* ── ROOT ─────────────────────────────────────────────────────────────── */
export default function MemberDashboard(){
  const[activeNav,setActiveNav]=useState('macro');
  const scrollTo=(id)=>{
    const el=document.getElementById(id);
    if(el){el.scrollIntoView({behavior:'smooth',block:'start'});}
    setActiveNav(id);
  };
  return(
    <div style={{fontFamily:F.body,background:C.paper}}>
      <Gf/>
      <TopBar/>
      <Header/>
      <MacroSection/>
      <ScoreSection/>
      <SignalsSection/>
      <PipelineSection/>
      <WatchSection/>
      <DashboardCTA/>
      <Footer/>
      <MobileNavSpacer/>
      <MobileNav active={activeNav} setActive={scrollTo}/>
    </div>
  );
}
