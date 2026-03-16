import React,{useState,useEffect}from"react";

const C={
  ink:'#0D1A10',paper:'#FAF8F3',paperDark:'#F0EDE4',
  forest:'#1B4D3E',lime:'#B8D935',
  muted:'#5C6B5E',faint:'#9AAA9C',border:'#D8D4C8',teal:'#2E5A4D',
  amber:'#B8730A',positive:'#1A6B2F',white:'#FFFFFF',
};
const F={
  display:'"Playfair Display","Georgia",serif',
  body:'"Source Serif 4","Georgia",serif',
  sans:'"DM Sans","Helvetica Neue",sans-serif',
  mono:'"DM Mono","Courier New",monospace',
};

const Gf=()=>(<style>{`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:${C.paper};-webkit-font-smoothing:antialiased;overflow-x:hidden;}
  @media print{.np{display:none!important;} body{background:white;}}

  /* ── DESKTOP TOC SIDEBAR ── */
  .toc{position:fixed;left:0;top:0;bottom:0;width:220px;background:${C.ink};padding:80px 0 32px;overflow-y:auto;z-index:90;}
  .toc-item{display:block;padding:7px 24px;font-family:${F.sans};font-size:10px;font-weight:600;color:rgba(250,248,243,.35);text-decoration:none;letter-spacing:.4px;transition:all .15s;border-left:2px solid transparent;cursor:pointer;}
  .toc-item:hover{color:rgba(250,248,243,.7);border-left-color:rgba(184,217,53,.3);}
  .toc-item.active{color:${C.lime};border-left-color:${C.lime};}
  .toc-section{padding:16px 24px 6px;font-family:${F.sans};font-size:8px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:rgba(250,248,243,.18);}
  .toc-logo{padding:0 24px 28px;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:16px;}
  .main{margin-left:220px;}

  /* ── SKILL v4: Section IDs — scroll-margin so sticky bar doesn't obscure ── */
  [id]{scroll-margin-top:52px;}

  /* ── SKILL v4: Animations ── */
  @keyframes barGrow{from{width:0}to{width:var(--w,100%)}}
  .score-bar{animation:barGrow 1s cubic-bezier(0.16,1,0.3,1) 0.4s both;}

  /* ── SKILL v4: CTA hover lift ── */
  .cta-primary{transition:transform 0.15s ease,box-shadow 0.15s ease!important;}
  .cta-primary:hover{transform:translateY(-1px)!important;box-shadow:0 6px 20px rgba(184,217,53,0.25)!important;}

  /* ── SKILL v4: Global transitions ── */
  a{transition:opacity .15s ease;}
  a:hover{opacity:.76;}
  button{transition:background .15s ease,border-color .15s ease,color .15s ease;}

  /* ── SKILL v4: Visibility defaults ── */
  .mob-show{display:none;}
  .mob-hide{display:inline;}
  .mob-only{display:none!important;}
  .desk-only{display:block;}

  /* ── SKILL v4: Drop cap ── */
  .dc::first-letter{font-family:${F.display};font-size:4.4em;font-weight:900;float:left;line-height:0.8;margin:0.05em 0.12em 0 0;color:${C.forest};}

  /* ── SKILL v4: Animated score bars ── */
  .score-bar-dim{animation:barGrow 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both;}

  /* ── SKILL v4: Row hover ── */
  .row-hover{transition:background 0.12s ease;}
  .row-hover:hover{background:rgba(184,217,53,0.04)!important;}
  .row-hover-dark:hover{background:rgba(255,255,255,0.035)!important;}

  /* ── SKILL v4: Section rule (desktop divider) ── */
  .sec-rule{border-top:5px solid ${C.ink};border-bottom:2.5px solid ${C.lime};padding-bottom:4px;margin-bottom:22px;}

  /* ── SKILL v4: Layout helpers ── */
  .mob-stack{display:flex;}
  .mob-full{}

  /* ── SKILL v4: Carousel ── */
  .mob-car{display:none!important;}
  .mob-scroller{display:flex;overflow-x:scroll;scroll-snap-type:x mandatory;scrollbar-width:none;gap:12px;-webkit-overflow-scrolling:touch;padding-bottom:4px;}
  .mob-scroller::-webkit-scrollbar{display:none;}
  .mob-snap-card{flex:0 0 82vw;scroll-snap-align:start;min-width:0;}
  .mob-snap-wide{flex:0 0 92vw;scroll-snap-align:start;min-width:0;}
  .car-wrap{position:relative;}
  .car-wrap::after{content:'';position:absolute;top:14px;right:0;width:44px;height:calc(100% - 32px);background:linear-gradient(to right,transparent,${C.paper} 90%);pointer-events:none;z-index:2;}
  .car-wrap-dark::after{background:linear-gradient(to right,transparent,${C.paperDark} 90%);}
  .car-wrap-ink::after{background:linear-gradient(to right,transparent,${C.ink} 90%);}

  /* ── PROGRESSIVE DISCLOSURE — app card body ── */
  .app-body-mob{transition:max-height .35s cubic-bezier(.4,0,.2,1),opacity .3s ease;}
  .mob-toggle-btn{display:none;width:100%;background:rgba(27,77,62,.06);border:none;border-top:1px solid ${C.border};padding:11px 22px;font-family:${F.sans};font-size:11px;font-weight:700;color:${C.forest};cursor:pointer;text-align:left;letter-spacing:.3px;align-items:center;justify-content:space-between;}
  .mob-toggle-btn svg{transition:transform .25s;}
  .mob-toggle-btn.open svg{transform:rotate(180deg);}

  /* ── SKILL v4: Upsell ── */
  .upsell-grid{display:grid;}
  .upsell-cta-row{display:flex;}

  /* ── SKILL v4: Footer ── */
  .footer-links{display:flex;gap:18px;}
  .footer-inner{display:flex;}

  /* ── SKILL v4: Section body accordion ── */
  .sec-body-hidden{display:none!important;}
  .mob-item-hidden{display:none!important;}

  /* ── TIER TABLE → MOBILE CARD STACK ── */
  .tier-mob-card{border:1px solid ${C.border};margin-bottom:10px;overflow:hidden;}
  .tier-mob-card-hdr{background:${C.ink};padding:10px 14px;display:flex;align-items:center;justify-content:space-between;}
  .tier-mob-card-num{font-family:${F.mono};font-size:11px;font-weight:500;color:${C.lime};}
  .tier-mob-card-name{font-family:${F.sans};font-size:12px;font-weight:700;color:${C.white};}
  .tier-mob-card-body{padding:12px 14px;}
  .tier-mob-label{font-family:${F.sans};font-size:8px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};margin-bottom:3px;}
  .tier-mob-value{font-family:${F.body};font-size:12px;color:${C.ink};line-height:1.55;margin-bottom:10px;}

  /* ── TYPOGRAPHY ── */
  .dc::first-letter{font-family:${F.display};font-size:4.2em;font-weight:900;float:left;line-height:.82;margin:.06em .1em 0 0;color:${C.forest};}
  p{font-family:${F.body};font-size:16px;line-height:1.85;color:${C.ink};font-weight:300;margin-bottom:18px;}
  p+p{text-indent:1.5em;}
  strong{font-weight:600;}
  em{font-style:italic;}
  .rule-strong{border-top:6px solid ${C.ink};border-bottom:2px solid ${C.lime};padding-bottom:3px;margin-bottom:20px;}
  .rule-light{border-top:1px solid ${C.border};margin:32px 0;}
  .pq{border-left:3px solid ${C.lime};padding:0 0 0 24px;margin:32px 0;font-family:${F.display};font-size:20px;font-style:italic;color:${C.forest};line-height:1.5;}

  /* ── STAT STRIP ── */
  .stat-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:${C.border};border:1px solid ${C.border};margin:32px 0;}
  .stat-cell{background:${C.paper};padding:20px 16px;text-align:center;}
  .stat-n{font-family:${F.mono};font-size:32px;font-weight:500;color:${C.forest};display:block;line-height:1;}
  .stat-l{font-family:${F.sans};font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};margin-top:5px;display:block;}

  /* ── APP CARD ── */
  .app-card{border:1px solid ${C.border};border-top:3px solid ${C.lime};margin-bottom:24px;}
  .app-card-hdr{background:${C.forest};padding:18px 22px;display:flex;align-items:baseline;gap:12px;cursor:pointer;user-select:none;}
  .app-card-num{font-family:${F.mono};font-size:28px;font-weight:500;color:${C.lime};line-height:1;}
  .app-card-name{font-family:${F.display};font-size:18px;font-weight:700;color:${C.white};flex:1;}
  .app-card-chevron{color:rgba(250,248,243,.4);transition:transform .25s;margin-left:8px;}
  .app-card-body{padding:20px 22px;}
  .app-card-meta{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:12px;}
  .app-tag{font-family:${F.sans};font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:3px 9px;border:1px solid ${C.border};color:${C.muted};}
  .app-tag.accent{border-color:${C.lime};color:${C.teal};}

  /* ── TIER TABLE (desktop) ── */
  .tier-tbl{width:100%;border-collapse:collapse;margin:24px 0;font-family:${F.sans};font-size:12px;}
  .tier-tbl th{background:${C.ink};color:${C.lime};font-size:9px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;padding:10px 14px;text-align:left;}
  .tier-tbl td{padding:10px 14px;border-bottom:1px solid ${C.border};color:${C.ink};vertical-align:top;line-height:1.5;}
  .tier-tbl tr:nth-child(even) td{background:${C.paperDark};}
  .tier-tbl td:first-child{font-weight:700;white-space:nowrap;}

  /* ── SECTION COVERS ── */
  .section-cover{background:${C.ink};padding:56px 64px;position:relative;overflow:hidden;}
  .section-cover-num{position:absolute;right:-10px;bottom:-20px;font-family:${F.display};font-size:clamp(100px,18vw,200px);font-weight:900;color:rgba(255,255,255,.04);line-height:1;pointer-events:none;user-select:none;}
  .section-eyebrow{font-family:${F.sans};font-size:9px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:rgba(184,217,53,.6);margin-bottom:12px;}
  .section-h{font-family:${F.display};font-size:clamp(24px,4vw,42px);font-weight:900;color:${C.white};line-height:1.15;margin-bottom:12px;}
  .section-sub{font-family:${F.body};font-size:16px;color:rgba(250,248,243,.55);max-width:640px;line-height:1.7;font-weight:300;}

  /* ── BODY PADDING ── */
  .body-pad{padding:56px 64px;max-width:860px;margin:0 auto;width:100%;}
  .eyebrow{font-family:${F.sans};font-size:9px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:${C.muted};margin-bottom:8px;}
  .h2{font-family:${F.display};font-size:clamp(20px,3vw,32px);font-weight:700;color:${C.ink};line-height:1.25;margin-bottom:16px;}
  .h3{font-family:${F.sans};font-size:15px;font-weight:700;color:${C.forest};margin-bottom:8px;margin-top:24px;}

  /* ── CTA / FOOTER ── */
  .cta-section{background:${C.forest};padding:56px 64px;}
  .cta-btn{display:inline-block;background:${C.lime};color:${C.ink};padding:14px 28px;font-family:${F.sans};font-size:13px;font-weight:800;text-decoration:none;letter-spacing:.4px;margin-right:12px;margin-top:10px;border:none;cursor:pointer;}
  .cta-btn-sec{display:inline-block;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);color:${C.white};padding:14px 24px;font-family:${F.sans};font-size:13px;font-weight:700;text-decoration:none;margin-top:10px;}
  .doc-footer{background:${C.ink};padding:24px 64px;border-top:3px solid ${C.lime};display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
  .fade-up{animation:fadeUp .6s ease forwards;}

  /* ── TABLET ≤900px ── */
  @media(max-width:900px){
    .toc{display:none;}
    .main{margin-left:0;}
    .body-pad{padding:40px 32px;}
    .section-cover{padding:40px 32px;}
    .cta-section{padding:40px 32px;}
    .doc-footer{padding:18px 32px;}
    .stat-strip{grid-template-columns:1fr 1fr;}
    .stat-n{font-size:26px;}
    .pq{font-size:17px;padding-left:16px;}
    .mob-toggle-btn{display:flex;}
    .pad-topbar{padding:10px 24px!important;}
    .pad-section{padding:40px 32px!important;}
    .pad-cover{padding:28px 32px 0!important;}
    .pad-footer{padding:14px 32px!important;}
  }

  /* ── MOBILE ≤600px ── */
  @media(max-width:600px){
    .mob-show{display:block!important;}
    .mob-hide{display:none!important;}
    .mob-only{display:block!important;}
    .mob-car{display:block!important;}
    .desk-only{display:none!important;}
    .mob-stack{flex-direction:column!important;align-items:flex-start!important;gap:10px!important;}
    .mob-full{width:100%!important;}
    .pad-topbar{padding:9px 16px!important;}
    .pad-section{padding:22px 16px!important;}
    .pad-cover{padding:18px 16px 0!important;}
    .pad-footer{padding:14px 16px!important;}
    .cover-pad{padding:24px 16px 32px!important;}
    .body-pad{padding:24px 16px;}
    .section-cover{padding:28px 16px;}
    .cta-section{padding:28px 16px;}
    .doc-footer{padding:16px 16px;flex-direction:column;align-items:flex-start;gap:8px;}
    .footer-links{display:none!important;}
    .footer-inner{justify-content:center!important;}
    .upsell-grid{grid-template-columns:1fr!important;}
    .upsell-cta-row{flex-direction:column!important;}
    .upsell-cta-row a{justify-content:center!important;width:100%!important;}
    .cta-btn,.cta-btn-sec{display:block;text-align:center;margin-right:0;margin-top:10px;width:100%;}
    .stat-strip{grid-template-columns:1fr 1fr;}
    .stat-n{font-size:22px;}
    .stat-cell{padding:14px 10px;}
    .pq{font-size:16px;margin:20px 0;}
    .tier-tbl{display:none;}
    p{font-size:15px;line-height:1.8;}
    .dc::first-letter{font-size:3.4em;}
    .row-hover:hover{background:inherit!important;}
    .car-wrap::after{width:28px;}
    @supports(padding-bottom:env(safe-area-inset-bottom)){
      .doc-footer{padding-bottom:calc(16px + env(safe-area-inset-bottom));}
    }
  }

  /* ── SMALL MOBILE ≤400px ── */
  @media(max-width:400px){
    .body-pad{padding:20px 14px;}
    .section-cover{padding:24px 14px;}
    .cover-pad{padding:18px 14px 24px!important;}
    .stat-strip{grid-template-columns:1fr 1fr;}
  }
`}</style>);

const Logo=({height=24,variant='white'})=>{
  const tf=variant==='white'?'#ffffff':'#1B4D3E';
  const bk=variant==='white'?'rgba(0,0,0,0.08)':'rgba(27,77,62,0.15)';
  return(<svg height={height} viewBox="0 0 3258.5 932.3" xmlns="http://www.w3.org/2000/svg" style={{display:'block',flexShrink:0}}>
    <rect fill="none" stroke={tf} strokeWidth="80" strokeMiterlimit="10" x="40" y="40" width="843.9" height="852.3" rx="36.6" ry="36.6"/>
    <polygon fill="#b8d935" stroke="#1b4d3e" strokeMiterlimit="10" points="722.6 322.1 462.3 452.8 202 322.8 461.3 192.5 722.6 322.1"/>
    <path fill="#74914a" d="M197.9,426.8c3.9-.5,7,.8,10.7,1.4l252.5,125.7c84.5-40,167.7-83.8,251.9-124.8,33.1-11.5,50.1,34.2,18.5,49.1l-259.2,129.1c-10.2,3.7-14.1,2.6-23.9-1.3l-264.2-133c-17-14.4-8-43.2,13.6-46.1h.1v-.1Z"/>
    <path fill="#b8d935" d="M195.3,558c3.7-.6,7.4-.4,11.1-.2,86.1,40.5,170.4,85.1,255.9,126.8l252.9-126c29.5-7.2,45.4,28.7,22.3,46.5l-270.4,134.4-8.6.3c-91.6-42.2-181.1-89.9-271.7-134.4-18.7-12.1-13.3-43.6,8.5-47.4h0Z"/>
    <path fill={tf} stroke={bk} strokeWidth="0.5" strokeMiterlimit="10" d="M1431.7,224.5h56.4v128.1c-12.6,9.2-26.1,17.1-40.4,23.5-27.9,12.5-58.7,19.5-91.2,19.5s-62.8-6.9-90.5-19.2c-14.8-6.6-28.8-14.8-41.8-24.4-.2-.2-.4-.3-.7-.5-35.3,56.8-97.1,94.4-167.3,94.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6V27.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3h.1c31.6,18.3,57,47.9,72.9,84.6,8,18.5,12.8,38.7,21.7,56.6,29.9,60.2,91.8,84.9,149.2,51.8,9.7-5.5,17.6-11.8,24.2-18.5h.1v.1Z"/>
    <path fill={tf} stroke={bk} strokeWidth="0.5" strokeMiterlimit="10" d="M1488.1,578.7v127.9h-55.9c-32.9-33.7-80.3-42.9-124.9-17.1-58.5,33.6-52.7,91.8-87.8,141.5-16.8,23.7-35,39.8-54.4,50.6-31.3,21.1-68.7,33.4-108.8,33.4h-84.6c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h102.2c35.4,0,64-30.9,64-68.9s-28.6-68.9-64-68.9h-102.2c-5.3,0-9.6-4.3-9.6-9.6v-126.1c0-5.3,4.3-9.6,9.6-9.6h84.6c13.6,0,26.9,1.4,39.7,4.1,12.2,2.6,24.1,6.3,35.4,11,11.3,4.8,22.1,10.6,32.2,17.3,2.8,1.9,5.6,3.8,8.3,5.8,20.7,15.4,38.5,34.7,52.2,57,13.3-10,27.7-18.6,43-25.4,27.9-12.5,58.7-19.5,91.2-19.5s62.8,6.9,90.5,19.2c13.9,6.2,27.1,13.8,39.3,22.6h0Z"/>
    <rect fill="#b8d935" x="1427.4" y="17.4" width="205.2" height="145"/>
    <rect fill={tf} x="1427.5" y="221.8" width="205.2" height="693.2" rx="9.6" ry="9.6"/>
    <path fill={tf} d="M1853.1,17.4h-144.5c-5.3,0-9.6,4.3-9.6,9.6v878.3c0,5.3,4.3,9.6,9.6,9.6h144.5c226.7,0,410.5-195.6,410.5-436.9v-23.7c0-241.3-183.8-436.9-410.5-436.9ZM1894.6,684.3V248c87.5,0,158.5,97.7,158.5,218.1s-71,218.1-158.5,218.1h0v.1Z"/>
    <path fill={tf} d="M2757.3,19.1h491.3c5.4,0,9.8,4.4,9.8,9.8v218.7c0,5.4-4.4,9.8-9.8,9.8h-507.4c-57,0-108.5,23-145.9,60.4-37.3,37.2-60.5,88.8-60.5,145.7,0,113.7,92.4,206,206.3,206h12.9c2.9,0,5.1,2.3,5.1,5.1v236.7c0,1.1-.9,1.9-1.9,1.9h0c-242.2,0-438.5-196-438.5-437.8v-18.5c0-241.8,196.3-437.8,438.5-437.8h.1Z"/>
    <rect fill={tf} x="2812.8" y="339.5" width="216.8" height="572.6" rx="9.6" ry="9.6"/>
    <rect fill="#b8d935" x="3083.4" y="339.5" width="175.1" height="257.7"/>
    <rect fill="#b8d935" x="3083.4" y="654.4" width="175.1" height="257.7"/>
  </svg>);
};

// ─── TOC ──────────────────────────────────────────────────────────────────────
const SECTIONS=[
  {id:'cover',label:'Cover'},
  {id:'executive',label:'Executive Summary',group:'Overview'},
  {id:'context',label:'The Ghana Opportunity',group:'Context'},
  {id:'why-digital',label:'Why Digital, Why Now'},
  {id:'bridge-org',label:'BRIDGE as an Organisation',group:'Organisation'},
  {id:'intelligence',label:'The Intelligence Asset'},
  {id:'apps-overview',label:'The Applications Suite',group:'The Suite'},
  {id:'app-01',label:'01 — Impact Score Assessor'},
  {id:'app-02',label:'02 — Opportunity Finder'},
  {id:'app-03',label:'03 — Readiness Diagnostic'},
  {id:'app-04',label:'04 — Diaspora Matcher'},
  {id:'app-05',label:'05 — Sector Pulse Tracker'},
  {id:'app-06',label:'06 — P&P Community Survey'},
  {id:'funnel',label:'The Conversion Funnel',group:'Business Model'},
  {id:'revenue',label:'Revenue & Projections'},
  {id:'data-moat',label:'The Data Moat'},
  {id:'investor',label:'For Investors',group:'Strategic'},
  {id:'founder',label:'For Founders & Partners'},
  {id:'roadmap',label:'Implementation Roadmap'},
  {id:'close',label:'Closing Argument'},
];

const TOC=({active})=>(
  <nav className="toc np">
    <div className="toc-logo"><Logo height={18} variant="white"/></div>
    {SECTIONS.map((s,i)=>(
      <span key={i}>
        {s.group&&<div className="toc-section">{s.group}</div>}
        <a className={`toc-item${active===s.id?' active':''}`} onClick={()=>{document.getElementById(s.id)?.scrollIntoView({behavior:'smooth',block:'start'});}}>
          {s.label}
        </a>
      </span>
    ))}
  </nav>
);

const Rule=()=><div className="rule-strong"/>;
const RuleLight=()=><div className="rule-light"/>;
const Eyebrow=({children})=><div className="eyebrow">{children}</div>;
const H2=({children})=><h2 className="h2">{children}</h2>;
const H3=({children})=><h3 className="h3">{children}</h3>;
const PQ=({children})=><blockquote className="pq">{children}</blockquote>;

// ─── SKILL v4: ReadingProgressBar ─────────────────────────────────────────────
const ReadingProgressBar=({coverRef})=>{
  const[pct,setPct]=useState(0);
  const[logoVisible,setLogoVisible]=useState(false);
  useEffect(()=>{
    const fn=()=>{
      const doc=document.documentElement;
      const scrolled=doc.scrollTop||document.body.scrollTop;
      const total=doc.scrollHeight-doc.clientHeight;
      setPct(total>0?Math.min(100,(scrolled/total)*100):0);
      if(coverRef?.current)setLogoVisible(coverRef.current.getBoundingClientRect().bottom<0);
    };
    window.addEventListener('scroll',fn,{passive:true});fn();
    return()=>window.removeEventListener('scroll',fn);
  },[coverRef]);
  const pctR=Math.round(pct);
  return(
    <div className="np pad-topbar" style={{position:'sticky',top:0,zIndex:100,background:C.paper,borderBottom:`1px solid ${C.border}`,padding:'10px 40px',display:'flex',justifyContent:'space-between',alignItems:'center',boxShadow:'0 1px 8px rgba(13,26,16,0.05)',overflow:'hidden'}}>
      <div style={{position:'absolute',bottom:0,left:0,height:'3px',width:`${pct}%`,background:C.lime,transition:'width .1s linear',pointerEvents:'none'}}/>
      <div style={{display:'flex',alignItems:'center',gap:'10px',minWidth:0,overflow:'hidden'}}>
        <div style={{overflow:'hidden',maxWidth:logoVisible?'180px':'0',opacity:logoVisible?1:0,transition:'max-width .38s cubic-bezier(0.16,1,0.3,1),opacity .3s ease',display:'flex',alignItems:'center',flexShrink:0}}>
          <Logo height={19} variant="dark"/>
          <div style={{width:'1px',height:'15px',background:C.border,margin:'0 12px',flexShrink:0}}/>
        </div>
        <span className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',color:C.muted,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>
          Digital Applications Suite Whitepaper · BRIDGE PBC · March 2026
        </span>
        <span className="mob-show" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest}}>
          Apps Suite
        </span>
        {pct>5&&<span className="mob-hide" style={{fontFamily:F.mono,fontSize:'10px',color:C.faint,marginLeft:'4px',flexShrink:0}}>{pctR}%</span>}
      </div>
      <div style={{display:'flex',gap:'10px',alignItems:'center',flexShrink:0}}>
        <a href="https://bridgepbc.com" className="mob-hide" style={{fontFamily:F.sans,fontSize:'11px',fontWeight:700,color:C.forest,textDecoration:'none',letterSpacing:'.2px'}}>bridgepbc.com →</a>
        <a href="#close" className="cta-primary" style={{background:C.forest,color:C.lime,padding:'7px 16px',fontFamily:F.sans,fontSize:'10px',fontWeight:700,textDecoration:'none',letterSpacing:'.5px'}}>Invest →</a>
      </div>
    </div>
  );
};

// ─── SKILL v4: SectionFooterNav ────────────────────────────────────────────────
const SectionFooterNav=()=>{
  const[active,setActive]=useState(0);
  useEffect(()=>{
    const obs=new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          const idx=SECTIONS.findIndex(s=>s.id===e.target.id);
          if(idx>=0)setActive(idx);
        }
      });
    },{rootMargin:'-40% 0px -55% 0px'});
    SECTIONS.forEach(s=>{const el=document.getElementById(s.id);if(el)obs.observe(el);});
    return()=>obs.disconnect();
  },[]);
  const goTo=idx=>{
    const cl=Math.max(0,Math.min(SECTIONS.length-1,idx));
    document.getElementById(SECTIONS[cl].id)?.scrollIntoView({behavior:'smooth',block:'start'});
    setActive(cl);
  };
  const BtnStyle=(disabled,isNext)=>({
    width:'38px',height:'38px',
    background:disabled?'rgba(255,255,255,.03)':isNext?C.forest:'rgba(255,255,255,.07)',
    border:`1px solid ${disabled?'rgba(255,255,255,.08)':isNext?'rgba(184,217,53,.25)':'rgba(255,255,255,.14)'}`,
    cursor:disabled?'default':'pointer',
    display:'flex',alignItems:'center',justifyContent:'center',
    flexShrink:0,opacity:disabled?.28:1,
    transition:'background .15s,transform .12s',
  });
  return(
    <div className="np" style={{position:'fixed',bottom:0,left:0,right:0,zIndex:200,background:'rgba(10,20,12,0.97)',borderTop:`1px solid rgba(184,217,53,.12)`,backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'9px 18px',gap:'10px'}}>
      <button onClick={()=>goTo(active-1)} disabled={active===0} style={BtnStyle(active===0,false)}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={active===0?'rgba(255,255,255,.2)':C.lime} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:'6px',minWidth:0,overflow:'hidden'}}>
        <div style={{display:'flex',alignItems:'center',gap:'7px',maxWidth:'100%',overflow:'hidden'}}>
          <span style={{fontFamily:F.mono,fontSize:'9px',fontWeight:700,color:C.lime,letterSpacing:'1px',flexShrink:0}}>§{String(active+1).padStart(2,'0')}</span>
          <span style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(255,255,255,.45)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{SECTIONS[active]?.label}</span>
          <span className="mob-hide" style={{fontFamily:F.mono,fontSize:'8px',color:'rgba(255,255,255,.18)',flexShrink:0}}>/ {SECTIONS.length}</span>
        </div>
        <div style={{display:'flex',gap:'4px',alignItems:'center'}}>
          {SECTIONS.map((_,i)=>(
            <div key={i} onClick={()=>goTo(i)} style={{width:i===active?'24px':'6px',height:'6px',borderRadius:'3px',background:i===active?C.lime:i<active?'rgba(184,217,53,.3)':'rgba(255,255,255,.15)',cursor:'pointer',transition:'width .3s cubic-bezier(0.16,1,0.3,1),background .2s',flexShrink:0}}/>
          ))}
        </div>
      </div>
      <button onClick={()=>goTo(active+1)} disabled={active===SECTIONS.length-1} style={BtnStyle(active===SECTIONS.length-1,true)}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={active===SECTIONS.length-1?'rgba(255,255,255,.2)':C.lime} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  );
};

// ─── COLLAPSIBLE APP CARD (mobile progressive disclosure) ─────────────────────
const AppCard=({num,name,children,tags})=>{
  const[open,setOpen]=useState(false);
  const ChevronIcon=()=>(
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={open?'':''}
      style={{transform:open?'rotate(180deg)':'rotate(0)',transition:'transform .25s',flexShrink:0}}>
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  );
  return(
    <div className="app-card">
      <div className="app-card-hdr" onClick={()=>setOpen(o=>!o)}>
        <span className="app-card-num">{num}</span>
        <span className="app-card-name">{name}</span>
        <span className="app-card-chevron" style={{display:'none'}}><ChevronIcon/></span>
      </div>
      {tags&&<div className="app-card-meta" style={{padding:'12px 22px 0'}}>{tags}</div>}
      {/* Desktop: always visible. Mobile: toggle */}
      <div className="app-card-body mob-hide">{children}</div>
      {/* Mobile toggle button */}
      <button className="mob-toggle-btn" onClick={()=>setOpen(o=>!o)} style={{display:'none'}}>
        <span>{open?'Show less ↑':`Read more about App ${num} ↓`}</span>
      </button>
      <div className="mob-show" style={{display:'none'}}>
        {open&&<div className="app-card-body">{children}</div>}
      </div>
    </div>
  );
};

// ─── MOBILE TIER CARD STACK (replaces table on mobile) ─────────────────────────
const TierMobStack=({rows,cols})=>(
  <div className="mob-show" style={{marginTop:'16px'}}>
    {rows.map((row,ri)=>(
      <div key={ri} className="tier-mob-card">
        <div className="tier-mob-card-hdr">
          <span className="tier-mob-card-num">{row[0]}</span>
          {row[1]&&<span className="tier-mob-card-name">{row[1]}</span>}
        </div>
        <div className="tier-mob-card-body">
          {cols.slice(2).map((col,ci)=>(
            <div key={ci}>
              <div className="tier-mob-label">{col}</div>
              <div className="tier-mob-value">{row[ci+2]}</div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default function BRIDGEAppsWhitepaper(){
  const coverRef=React.useRef(null);

  useEffect(()=>{
    let vm=document.querySelector('meta[name="viewport"]');
    if(!vm){vm=document.createElement('meta');vm.name='viewport';document.head.appendChild(vm);}
    vm.content='width=device-width,initial-scale=1,viewport-fit=cover';
  },[]);

  // ── App 01 tier data ──
  const app01TierRows=[
    ['Free','$0','Score + tier + AI narrative + 2 strengths','Name, email, venture, sector, region, stage'],
    ['Standard','$29','Full 4-dimension breakdown + gaps + recommendations','Payment confirmation + depth signal'],
    ['Intelligence','$99','Sector brief + 174+ venture matches + analyst access','High-value lead + willingness-to-pay signal'],
  ];
  const app01TierCols=['Tier','Price','What the user receives','What BRIDGE captures'];

  // ── Apps overview table data ──
  const appsOverviewRows=[
    ['01','Impact Score™ Assessor','Entrepreneurs / Investors','Score + AI narrative + tier badge','Sector brief + venture matches + strategic roadmap · $99'],
    ['02','Market Opportunity Finder','Diaspora / Institutional','Top 3 opportunity gaps by sector/region','Full venture breakdown + BRIDGE thesis + entry pathways · $49'],
    ['03','Investment Readiness Diagnostic','SMEs / Founders in-market','Readiness score + 1-paragraph verdict','5-dimension breakdown + improvement plan + advisory intro · $79'],
    ['04','Diaspora Skills Matcher','Diaspora professionals','3 matched contribution pathways','Personalised engagement roadmap + network introductions · $39'],
    ['05','Sector Pulse Tracker','General public / Field teams','Public sector sentiment dashboard','Full filtered dataset + regional breakdowns + trend lines · $9/mo'],
    ['06','P&P Community Survey','NGOs / Communities / Government','P&P alignment score + community profile','Comparative benchmarking + priority action framework · Custom'],
  ];
  const appsOverviewCols=['#','Application','Primary audience','Free output','Paid ceiling'];

  // ── Revenue table data ──
  const revenueRows=[
    ['Total submissions (Year 1)','5,000','12,000','25,000'],
    ['Email leads captured','5,000','12,000','25,000'],
    ['Standard tier conversions (2%)','100','240','500'],
    ['Intelligence tier conversions (0.5%)','25','60','125'],
    ['Transaction revenue','$8,500','$20,400','$42,500'],
    ['Institutional / API revenue','$10,000','$25,000','$60,000'],
    ['Total Year 1 target','$18,500','$45,400','$102,500'],
  ];
  const revenueCols=['Metric','Conservative','Moderate','Optimistic'];

  return(
    <div style={{fontFamily:F.body,background:C.paper,minHeight:'100vh',paddingBottom:'60px'}}>
      <Gf/>
      <ReadingProgressBar coverRef={coverRef}/>
      <SectionFooterNav/>
      <TOC active=""/>

      <div className="main">

        {/* ── COVER ── */}
        <div id="cover" className="cover-pad" style={{background:C.ink,padding:'48px 64px 56px',minHeight:'auto',display:'flex',flexDirection:'column',justifyContent:'flex-start',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',right:0,bottom:0,fontFamily:F.display,fontSize:'clamp(160px,28vw,400px)',fontWeight:900,color:'rgba(255,255,255,.025)',lineHeight:1,pointerEvents:'none',userSelect:'none',letterSpacing:'-12px'}}>B</div>
          <div ref={coverRef} style={{marginBottom:'36px'}}>
            <Logo height={26} variant="white"/>
            <div style={{borderTop:'1px solid rgba(255,255,255,.08)',marginTop:'20px'}}/>
          </div>
          <div style={{maxWidth:'760px',position:'relative',zIndex:1}}>
            <div style={{display:'inline-block',background:'rgba(184,217,53,.1)',border:'1px solid rgba(184,217,53,.2)',padding:'5px 14px',marginBottom:'24px',fontFamily:F.sans,fontSize:'9px',fontWeight:800,letterSpacing:'3px',textTransform:'uppercase',color:C.lime}}>Whitepaper · Digital Applications Suite · March 2026</div>
            <h1 style={{fontFamily:F.display,fontSize:'clamp(28px,6vw,72px)',fontWeight:900,color:C.white,lineHeight:1.05,marginBottom:'24px',letterSpacing:'-1px'}}>
              Intelligence as a<br/><em style={{color:C.lime,fontStyle:'italic'}}>Revenue Engine</em>
            </h1>
            <p style={{fontFamily:F.body,fontSize:'clamp(14px,2vw,17px)',color:'rgba(250,248,243,.6)',lineHeight:1.75,maxWidth:'580px',fontWeight:300,marginBottom:'0'}}>How BRIDGE PBC converts its proprietary Ghana development intelligence into a suite of digital applications that simultaneously generate revenue, capture market data, identify investment opportunities, and advance the Peace &amp; Prosperity mission — at scale.</p>
          </div>
          <div style={{borderTop:'1px solid rgba(255,255,255,.08)',marginTop:'36px',paddingTop:'24px',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(80px,1fr))',gap:'24px'}}>
            {[['6','Web applications'],['174+','Ventures analyzed'],['12','Sectors covered'],['$135–259M','Portfolio scope'],['$0','Entry point for users']].map(([n,l])=>(
              <div key={l}>
                <div style={{fontFamily:F.mono,fontSize:'clamp(18px,2.5vw,24px)',fontWeight:500,color:C.lime,lineHeight:1}}>{n}</div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,.28)',marginTop:'4px'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── EXECUTIVE SUMMARY ── */}
        <div id="executive" style={{background:C.paper}}>
          <div className="body-pad">
            <Eyebrow>Executive Summary</Eyebrow>
            <Rule/>
            <H2>The intelligence already exists.<br/>What's been missing is the interface.</H2>
            <p className="dc">BRIDGE PBC has spent the better part of two years building something no other organisation has: a comprehensive, rigorously documented intelligence base on Ghana's development landscape. Twelve sector analyses totalling over 80,000 words. A proprietary evaluation framework — the BRIDGE Impact Score™ — validated against international development standards. A portfolio of 174+ identified ventures with capital ranges, risk profiles, and cross-sector integration maps. Government policy alignment data. Competitive landscape assessments. Beneficiary pain point research drawn directly from Ghanaian communities.</p>
            <p>Until now, that intelligence has primarily served BRIDGE's internal investment process and the organisation's relationships with institutional partners. This whitepaper describes a strategic decision to change that — to build a suite of digital applications that make BRIDGE's intelligence publicly accessible, on a tiered basis, in exchange for something valuable: leads, market signal data, and direct revenue.</p>
            <PQ>The best intelligence operation in the room is the one that gets smarter every time someone interacts with it. The BRIDGE Applications Suite turns every submission into an intelligence asset.</PQ>
            <p>Six applications. One operating principle. Free entry, segmented output. Every user receives genuine, useful output at no cost. Users who need more — and they will — pay for access to the deeper intelligence layer that only BRIDGE possesses. The gap between what the free tier shows and what the paid tier reveals is BRIDGE's proprietary advantage, delivered in seconds.</p>
            <p>This is not a marketing campaign. It is an intelligence infrastructure — one that compounds in value with every submission, converts high-intent users into leads, captures structured market signal data on who is trying to build what in Ghana, and establishes BRIDGE as the authoritative public voice on Ghana development intelligence. It also generates direct revenue that funds the ongoing research that makes the intelligence worth paying for in the first place.</p>
            <div className="stat-strip">
              {[['6','Applications in suite'],['$0','Free entry — always'],['$29–99','Paid tier range'],['90 days','Free results preserved']].map(([n,l])=>(
                <div className="stat-cell" key={l}><span className="stat-n">{n}</span><span className="stat-l">{l}</span></div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CONTEXT ── */}
        <div id="context">
          <div className="section-cover">
            <div className="section-cover-num">01</div>
            <div className="section-eyebrow">Context</div>
            <h2 className="section-h">The Ghana opportunity is documented.<br/>What's missing is access.</h2>
            <p className="section-sub">Ghana is not a mystery. The problems are known, quantified, and mapped. The question is whether the people with capital and ideas can find each other efficiently enough to do something about it.</p>
          </div>
          <div className="body-pad" style={{background:C.paperDark}}>
            <H3>What the numbers say</H3>
            <p>Ghana enters 2026 in a position of unusual clarity about its own challenges. Post-harvest losses in agriculture total $1.9 billion annually — not because the country cannot grow food, but because the infrastructure to move it from farm to market does not adequately exist. The SME credit gap sits at $4–6 billion — not because there are no businesses worth lending to, but because the assessment and distribution infrastructure for small business finance remains underdeveloped. The physician-to-population ratio is 1:6,000 — not because Ghanaians cannot be trained as doctors, but because the conditions that retain trained professionals within the country have not been sufficient.</p>
            <p>These numbers are not estimates. They are documented in sector analyses, government statistical reports, World Bank assessments, and the direct testimony of Ghanaian communities collected through BRIDGE's own research process. They represent not problems without solutions but gaps between what exists and what is possible — precisely the territory that well-structured investment occupies.</p>
            <H3>The investment gap</H3>
            <p>Ghana has a large, educated, economically active diaspora — an estimated 3 million Ghanaians abroad, including significant concentrations in the United States, United Kingdom, and Germany, with collective annual remittances exceeding $4 billion. The majority of that capital flows into consumption and family support. A meaningful fraction — estimates suggest 15–20% — is available for investment, but has historically lacked structured vehicles that combine appropriate risk profiles, local market intelligence, and genuine accountability to Ghanaian outcomes.</p>
            <p>Development finance institutions are present but constrained by their own mandates and approval processes. Commercial investors find Ghana's risk-adjusted returns insufficient without the intelligence to identify the specific opportunities that outperform. Local entrepreneurs often have the ideas and the market knowledge but lack access to capital and to the international networks that help them execute.</p>
            <PQ>BRIDGE's fundamental insight is that the gap is not capital. It is intelligence — the structured knowledge of which opportunities exist, where they are, what they require, and which of them will actually work.</PQ>
            <H3>Where the applications fit</H3>
            <p>The BRIDGE Applications Suite does not attempt to solve Ghana's development challenges directly. That work happens in the portfolio — in the investments, incubations, and partnerships that BRIDGE deploys through its operational infrastructure. The applications do something else: they function as an intelligence exchange, connecting people who have ideas, capital, skills, or community knowledge to the structured intelligence base that makes those resources productive. In doing so, they generate the leads, data, and revenue that allow the intelligence base itself to grow.</p>
          </div>
        </div>

        {/* ── WHY DIGITAL ── */}
        <div id="why-digital" style={{background:C.paper}}>
          <div className="body-pad">
            <Eyebrow>Strategic Rationale</Eyebrow>
            <Rule/>
            <H2>Why digital applications. Why now.</H2>
            <p>Three conditions have converged that make 2026 the right moment to launch the BRIDGE Digital Applications Suite. Each is independently significant. Together they constitute a narrow window that rewards moving quickly.</p>
            <H3>Condition 1 — The intelligence base is complete</H3>
            <p>Building the intelligence base took two years. Twelve sector analyses. The BRIDGE Impact Score™ methodology, developed and refined against real assessment cases. A venture pipeline of 174+ identified opportunities with documented capital requirements and risk profiles. Government policy alignment research. Competitive landscape maps for each sector. This is the foundational work. It is done. The applications are not a build-it-and-wait bet — they are the interface layer on top of a fully constructed intelligence product.</p>
            <H3>Condition 2 — The audience is at the door</H3>
            <p>The diaspora investment conversation is at a historic high. Ghana's Sankofa Initiative — the government's formal diaspora engagement programme — has created an institutional context for diaspora capital that did not exist five years ago. The African Continental Free Trade Area has repositioned Ghana as a manufacturing and logistics hub in ways that are attracting new investor attention. The Year of Return and its successors created durable diaspora engagement momentum. The audience that needs what BRIDGE offers — structured intelligence on Ghana investment opportunities — exists, is growing, and is actively looking for exactly what the applications provide.</p>
            <H3>Condition 3 — AI makes the product irresistible</H3>
            <p>The integration of Claude — Anthropic's AI — into the BRIDGE Impact Score™ Assessor fundamentally changes what a free tool can deliver. Previous generations of venture assessment tools returned generic rubric scores. The BRIDGE assessor returns a live, personalised analyst narrative — three sentences written specifically about a user's venture, their sector, their region, their stage — by an AI that has absorbed BRIDGE's entire intelligence base. The free output is genuinely impressive. The paid output, which layers on sector briefs and venture matches from the proprietary database, is indistinguishable from what a boutique development finance consultant would charge $5,000 to produce.</p>
          </div>
        </div>

        {/* ── BRIDGE ORG ── */}
        <div id="bridge-org">
          <div className="section-cover">
            <div className="section-cover-num">02</div>
            <div className="section-eyebrow">The Organisation</div>
            <h2 className="section-h">BRIDGE PBC is not a fund.<br/>It is a development ecosystem.</h2>
            <p className="section-sub">Understanding what BRIDGE is — and is not — is essential context for understanding why the applications represent such a significant strategic asset rather than a standalone product.</p>
          </div>
          <div className="body-pad" style={{background:C.paperDark}}>
            <p>BRIDGE PBC — Blending Resources and Innovation to Drive Ghana's Empowerment — is a Public Benefit Corporation. The PBC structure is deliberate: it creates legally enforceable mission obligations that prevent the organisation from drifting toward pure commercial optimisation at the expense of Ghanaian outcomes. Every investment decision, every product launch, every partnership agreement is evaluated against a single question: does this advance Peace &amp; Prosperity for Ghanaian citizens, households, and communities?</p>
            <H3>Two-part architecture</H3>
            <p>BRIDGE operates through two interlocking structures. BRIDGE PBC is the company — the development engine that identifies, evaluates, executes, and manages investments. It is the institutional actor with the deal pipeline, the sector expertise, the government relationships, and the Impact Score methodology. Alongside it, BRIDGE operates a Diaspora Network — the resource base that provides capital, professional expertise, market access, and advocacy capacity from the global Ghanaian community.</p>
            <p>The applications serve both structures simultaneously. For the company, they generate investment pipeline leads — high-scoring submissions become prospective portfolio companies. For the network, they provide a structured engagement pathway that converts passive interest into active contribution.</p>
            <H3>The Peace &amp; Prosperity framework</H3>
            <p>BRIDGE measures success not by capital mobilised but by outcomes achieved for Ghanaian individuals, families, and communities. This is operationalised through the Peace &amp; Prosperity framework — a four-dimensional assessment that asks whether an intervention improves individual dignity, family security, community cohesion, and intergenerational possibility. The BRIDGE Impact Score™ translates this framework into a 100-point scoring system that is both rigorous enough for institutional use and transparent enough for public deployment.</p>
            <PQ>The applications are not a marketing tool for BRIDGE. They are a delivery mechanism for the Peace &amp; Prosperity methodology — making BRIDGE's analytical rigour available to anyone with a venture idea, regardless of whether BRIDGE ultimately invests in it.</PQ>
            <H3>Why this matters for investors reading this document</H3>
            <p>The applications suite represents an independently viable revenue line within the BRIDGE architecture — one that does not depend on investment exits or fund performance to generate returns. Conservative Year 1 projections suggest $18,500 in direct application revenue. Moderate projections exceed $45,000. At scale, institutional and API access packages for development finance institutions, government agencies, and research organisations represent a revenue layer that operates independently of the investment cycle and provides income stability during the patient capital deployment phase that characterises BRIDGE's early years.</p>
          </div>
        </div>

        {/* ── INTELLIGENCE ASSET ── */}
        <div id="intelligence" style={{background:C.paper}}>
          <div className="body-pad">
            <Eyebrow>The Proprietary Asset</Eyebrow>
            <Rule/>
            <H2>What makes BRIDGE's intelligence worth paying for.</H2>
            <p>The value proposition of the applications rests entirely on the quality and exclusivity of the intelligence behind the paywall. It is worth being specific about what that intelligence actually is.</p>
            <H3>Sector depth</H3>
            <p>Each of BRIDGE's 12 sector analyses runs 5,000–7,000 words and follows a standardised architecture: pain point identification with economic quantification, root cause analysis, competitive landscape mapping, government policy alignment review, venture opportunity identification with capital ranges and implementation timelines, risk matrices with Ghana-specific mitigation strategies, and cross-sector integration analysis. The 12 documents combined represent more than 80,000 words of primary research conducted specifically for the Ghanaian market context. No comparable public resource exists.</p>
            <H3>Venture pipeline intelligence</H3>
            <p>BRIDGE has identified 174+ specific venture opportunities across its 12 sectors, each with a defined problem it addresses, an indicative capital requirement, a risk rating, and a categorisation within BRIDGE's three-tier priority framework. For any venture idea submitted through the applications, the Intelligence tier report can identify which of those 174+ opportunities are adjacent — effectively giving the user a map of the competitive and complementary landscape around their concept.</p>
            <H3>The BRIDGE Impact Score™</H3>
            <p>The methodology itself is proprietary. Developed over two years and calibrated against actual assessment cases, the 100-point framework evaluates Peace &amp; Prosperity Alignment (30 points), Local Asset Integration (25 points), Community Participation (20 points), and Feasibility &amp; Sustainability (25 points). Each dimension has defined sub-criteria, scoring rubrics, and Ghana-specific benchmarks. The score is not a generic impact assessment tool adapted to Ghana — it is a Ghana-first framework that treats Ghanaian community outcomes as the primary unit of measurement, with financial viability as a necessary but secondary condition.</p>
            <div className="stat-strip" style={{marginTop:'32px'}}>
              {[['80,000+','Words of sector research'],['174+','Identified ventures'],['12','Sectors analyzed'],['4','Score dimensions']].map(([n,l])=>(
                <div className="stat-cell" key={l}><span className="stat-n">{n}</span><span className="stat-l">{l}</span></div>
              ))}
            </div>
          </div>
        </div>

        {/* ── APPS OVERVIEW ── */}
        <div id="apps-overview">
          <div className="section-cover">
            <div className="section-cover-num">03</div>
            <div className="section-eyebrow">The Digital Suite</div>
            <h2 className="section-h">Six applications.<br/>One intelligence base.<br/>One operating principle.</h2>
            <p className="section-sub">Free entry. Segmented output. Every submission is simultaneously a lead, a market signal, and a data point that makes the intelligence base more valuable for every subsequent user.</p>
          </div>
          <div className="body-pad" style={{background:C.paperDark}}>
            <p>Each application in the suite follows the same fundamental architecture: a structured submission form that captures user and venture data, a processing layer that applies BRIDGE's intelligence to the submission, and a tiered output that delivers genuine value at the free level and irresistible depth at the paid levels. The six applications span the full range of BRIDGE's stakeholder surface — from Ghanaian entrepreneurs to diaspora professionals to community organisations to institutional research partners.</p>
            {/* Desktop table */}
            <table className="tier-tbl mob-hide" style={{marginTop:'24px'}}>
              <thead><tr><th>#</th><th>Application</th><th>Primary audience</th><th>Free output</th><th>Paid ceiling</th></tr></thead>
              <tbody>
                {appsOverviewRows.map(([n,name,aud,free,paid])=>(
                  <tr key={n}><td>{n}</td><td><strong>{name}</strong></td><td>{aud}</td><td>{free}</td><td>{paid}</td></tr>
                ))}
              </tbody>
            </table>
            {/* Mobile card stack */}
            <TierMobStack rows={appsOverviewRows} cols={appsOverviewCols}/>
          </div>
        </div>

        {/* ── APP 01 ── */}
        <div id="app-01" style={{background:C.paper}}>
          <div className="body-pad">
            <Eyebrow>Application 01 · Flagship</Eyebrow>
            <Rule/>
            <H2>BRIDGE Impact Score™ Assessor</H2>
            <p>The flagship. The highest-intent, richest-data application in the suite and the one that most directly monetises BRIDGE's core intellectual property. A user submits a venture concept — in their own words, at whatever level of development — and receives within seconds a scored assessment powered by the same methodology BRIDGE applies to its own investment decisions.</p>
            <p>The application is live, fully built, and Babel-validated for production deployment. It includes a multi-step animated scoring sequence, a live Claude AI narrative generation call that produces a personalised 3-sentence analyst assessment, a score ring that counts up in real time to the user's actual score, dimension bars that animate on arrival, two blurred locked findings cards that create visible desire for the paid tier, a tiered upgrade modal, and a full gate section presenting the Intelligence tier deliverables.</p>
            <PQ>The free output must be genuinely useful — not a teaser. The paid output must be irresistible. The gap between them is BRIDGE's proprietary advantage.</PQ>
            <H3>The three tiers in detail</H3>
            {/* Desktop table */}
            <table className="tier-tbl mob-hide">
              <thead><tr><th>Tier</th><th>Price</th><th>What the user receives</th><th>What BRIDGE captures</th></tr></thead>
              <tbody>
                {app01TierRows.map(r=>(
                  <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td></tr>
                ))}
              </tbody>
            </table>
            {/* Mobile card stack */}
            <TierMobStack rows={app01TierRows} cols={app01TierCols}/>
            <H3>Score thresholds and BRIDGE action triggers</H3>
            <p>The scoring thresholds are not arbitrary bands — they are calibrated action triggers that link the application to BRIDGE's investment pipeline. Exceptional scores (80+) trigger proactive BRIDGE outreach. Strong scores (65–79) generate automatic invitation to the BRIDGE partner network. Promising scores (50–64) receive advisory support and a development pathway. Potential scores (35–49) receive a resubmission plan. Decline scores receive constructive feedback and an explanation of what would need to change — because a Decline today is a Strong tomorrow if the model is refined correctly.</p>
            <p>This architecture means the assessor is not just a lead generator. It is an active pipeline management tool — automatically triaging inbound interest into the appropriate level of BRIDGE engagement without requiring manual review of every submission.</p>
          </div>
        </div>

        {/* ── APPS 02–06 with progressive disclosure ── */}
        <div id="app-02" style={{background:C.paperDark}}>
          <div className="body-pad">
            <Eyebrow>Application 02</Eyebrow>
            <Rule/>
            <AppCard num="02" name="Ghana Market Opportunity Finder">
              <p>Where the Impact Score Assessor serves people with a specific venture idea, the Opportunity Finder serves people who are at an earlier stage — they know they want to engage with Ghana's development landscape but haven't yet identified where their capital or expertise would have the highest impact. The user selects a sector and a region. The application surfaces BRIDGE's top identified opportunity gaps in that combination, drawn directly from the sector analysis documents.</p>
              <p>The free tier delivers a curated summary of 3–5 opportunities with enough context to orient the user. The Standard tier ($19) provides full opportunity descriptions, capital range benchmarks, and identification of the key actors already in the space. The Intelligence tier ($49) adds BRIDGE's investment thesis for each opportunity, recommended entry pathways, and partnership facilitation options.</p>
              <p>This is the most direct conversion of sector research into a sellable product. The research exists. The Opportunity Finder is the retail interface for it — allowing individual investors and institutional partners to purchase targeted access to exactly the intelligence they need, without purchasing more than they need.</p>
            </AppCard>
          </div>
        </div>

        <div id="app-03" style={{background:C.paper}}>
          <div className="body-pad">
            <Eyebrow>Application 03</Eyebrow>
            <Rule/>
            <AppCard num="03" name="Investment Readiness Diagnostic">
              <p>The Readiness Diagnostic serves a distinct user profile from the Impact Score Assessor: people who are already operating in Ghana and need to understand what institutional investors will see when they look at their business. The form covers five readiness dimensions — Financial Foundations, Governance &amp; Compliance, Market Positioning, Team Capability, and Growth Strategy — and returns a composite Investment Readiness Score alongside a tier-appropriate analysis.</p>
              <p>This application is strategically significant beyond its direct revenue potential because of the data it captures. Every submission is a structured health assessment of a Ghanaian SME or venture — the kind of data that banks, development finance institutions, and government agencies pay significantly to obtain through expensive survey programmes. At scale, BRIDGE's Readiness Diagnostic database becomes a proprietary view into the health and sophistication of Ghana's entrepreneurial ecosystem that has independent institutional value.</p>
              <p>For investors in BRIDGE, this is worth noting specifically: the Diagnostic generates data that strengthens BRIDGE's investment selection process, its government partnership conversations, and its institutional fundraising — all at a cost of zero, funded entirely by the subscription fees of the businesses being assessed.</p>
            </AppCard>
          </div>
        </div>

        <div id="app-04" style={{background:C.paperDark}}>
          <div className="body-pad">
            <Eyebrow>Application 04</Eyebrow>
            <Rule/>
            <AppCard num="04" name="Diaspora Skills Matcher">
              <p>The diaspora engagement challenge is not primarily a capital problem. Most diaspora members who want to contribute to Ghana's development are not blocked by lack of funds — they are blocked by lack of structure. They don't know which opportunities match their skills. They don't know which organisations are credible. They don't know what a one-year commitment of three hours per week actually produces. The Diaspora Skills Matcher answers these questions directly.</p>
              <p>The user submits a professional profile — field, years of experience, specific competencies, geographic flexibility, time availability, contribution preferences (capital, expertise, mentorship, or network). The application maps the profile against BRIDGE's sector intelligence and returns the 3–5 highest-alignment contribution pathways. The Intelligence tier ($39) adds a personalised BRIDGE engagement roadmap and introductions to active ventures seeking exactly the user's profile.</p>
              <p>The data value here is equally significant. Every submission builds BRIDGE's skills inventory — a searchable, structured database of diaspora professionals categorised by sector, competency, and availability. Portfolio companies seeking specific technical expertise, government agencies planning skills transfer programmes, and development finance institutions designing diaspora engagement initiatives all need exactly this data and currently have no reliable way to obtain it.</p>
            </AppCard>
          </div>
        </div>

        <div id="app-05" style={{background:C.paper}}>
          <div className="body-pad">
            <Eyebrow>Application 05</Eyebrow>
            <Rule/>
            <AppCard num="05" name="Ghana Sector Pulse Tracker">
              <p>The Pulse Tracker is explicitly a data farming tool. It is the application that looks least like a product and most like a public service — which is intentional, because the most effective data collection instruments are the ones that users engage with voluntarily, repeatedly, because they find them valuable. The Tracker is a lightweight, mobile-first reporting interface. Users flag what they are observing on the ground — barriers, emerging opportunities, infrastructure gaps, market changes — categorised by sector and region. Aggregate findings display publicly as a sector sentiment dashboard.</p>
              <p>The premium tier ($9/month or $79/year) unlocks the full filtered dataset, regional trend lines, and downloadable intelligence reports. Institutional access — priced on custom terms — provides API access and the ability to query the database directly. At the institutional level, this becomes a subscription intelligence product for development finance institutions, government ministries, research organisations, and international NGOs.</p>
              <p>The competitive moat here is time. Every month of Pulse Tracker operation makes the dataset more valuable — because longitudinal data on community-level economic conditions in Ghana is extraordinarily rare and commands significant premium with the right institutional buyers. BRIDGE starts building that moat on day one, funded by the individual subscriptions of the users who find the aggregate view useful.</p>
            </AppCard>
          </div>
        </div>

        <div id="app-06" style={{background:C.paperDark}}>
          <div className="body-pad">
            <Eyebrow>Application 06</Eyebrow>
            <Rule/>
            <AppCard num="06" name="Peace &amp; Prosperity Community Survey">
              <p>The P&P Community Survey is the application most directly aligned with BRIDGE's core mission infrastructure. It is a structured assessment tool that translates BRIDGE's Peace &amp; Prosperity framework — the same framework that underlies every investment decision BRIDGE makes — into a self-administered community diagnostic that any organisation can use.</p>
              <p>The target users are community organisations, NGOs, local government offices, and development partners who need a credible, structured way to assess community needs and demonstrate outcomes. The free output delivers an overall P&P alignment score and a summary profile. Paid tiers unlock comparative benchmarking against similar communities in BRIDGE's database, sector-specific gap analysis, and a recommended priority action framework. The Partnership tier — custom pricing — positions BRIDGE to conduct community assessments directly, with on-the-ground validation, as a consulting engagement.</p>
              <p>Beyond its direct revenue, this application achieves something strategically significant: it positions BRIDGE as the methodology holder for community-level development assessment in Ghana. That positioning has value with government partners, with international development organisations seeking local counterparts, and with academic institutions looking for rigorous local frameworks to study. It is the application that most directly converts BRIDGE's intellectual capital into institutional standing.</p>
            </AppCard>
          </div>
        </div>

        {/* ── FUNNEL ── */}
        <div id="funnel">
          <div className="section-cover">
            <div className="section-cover-num">04</div>
            <div className="section-eyebrow">Business Model</div>
            <h2 className="section-h">A marketing funnel<br/>built into the product architecture.</h2>
            <p className="section-sub">The applications do not require a separate marketing funnel because the applications are the funnel. Every screen, every interaction, every output is designed to move the user toward the next meaningful engagement with BRIDGE.</p>
          </div>
          <div className="body-pad" style={{background:C.paperDark}}>
            <p>Traditional lead generation separates the product from the conversion mechanism — you build a tool, then you build a separate email sequence that tries to convert the user into a paying customer. The BRIDGE suite collapses that separation entirely. The conversion mechanism is structural, not persuasive. It operates through visible scarcity — the blurred locked findings cards on the results page that show the user exactly what they cannot see — and through genuine desire that the free output creates rather than manufactured urgency that marketing copy tries to generate.</p>
            <H3>The funnel in four stages</H3>
            <p><strong>Stage 1 — Awareness.</strong> The user encounters the assessor through organic search ("how do I know if my Ghana venture will work"), diaspora community referral, BRIDGE's direct channels, or partner distribution. The free entry point removes every barrier to first contact. No credit card. No commitment. Nothing to lose.</p>
            <p><strong>Stage 2 — Engagement.</strong> The 6-second scoring animation, the real score counting up in real time, the Claude AI narrative generating live — these are not decorative. They are engagement mechanisms that hold the user's attention through a moment of genuine curiosity. What will my number be? What will the AI say about my specific idea? The user arrives at the results page in a state of active interest, not passive reception.</p>
            <p><strong>Stage 3 — Desire.</strong> The results page shows two strength findings clearly. Two development area findings are blurred with unlock buttons directly overlaid. The upgrade strip is dark, full-bleed, authoritative. The Intelligence gate section lists eight specific deliverables — each one something the user demonstrably needs. This is not teaser content. It is a catalogue of genuinely valuable intelligence that the user can see, understand, and want.</p>
            <p><strong>Stage 4 — Conversion.</strong> The upgrade modal presents Standard ($29) and Intelligence ($99) in a tabbed comparison — no full-page redirect, no friction, just a clear choice and a Stripe payment flow. For users who don't convert immediately, they have provided their email address and their venture data. The nurture sequence — automated, BRIDGE-branded — delivers sector intelligence teasers at Day 2, Day 5, and Day 10 that create multiple conversion opportunities without requiring any additional user interaction with the product.</p>
            <PQ>Every free submission is simultaneously a lead, a market signal, and an entry point into a nurture sequence that continues working for months after the initial interaction.</PQ>
          </div>
        </div>

        {/* ── REVENUE ── */}
        <div id="revenue" style={{background:C.paper}}>
          <div className="body-pad">
            <Eyebrow>Revenue Model</Eyebrow>
            <Rule/>
            <H2>Three revenue streams.<br/>All compounding.</H2>
            <p>The applications generate revenue through three distinct streams that operate independently and reinforce each other as the user base grows. The projections below are deliberately conservative — they assume modest conversion rates and no institutional partnerships in Year 1.</p>
            <H3>Stream 1 — Transaction revenue</H3>
            <p>Direct paid tier purchases across all six applications. Pricing is set at the intersection of genuine value and low decision friction — $29 and $99 are the kinds of numbers that a serious entrepreneur or investor processes as a rounding error relative to the cost of making a bad decision. At 2% free-to-standard conversion and 0.5% free-to-intelligence conversion across 5,000 Year 1 submissions, transaction revenue is approximately $8,500. At 12,000 submissions with moderate conversion, it reaches $20,400.</p>
            <H3>Stream 2 — Subscription revenue</H3>
            <p>The Sector Pulse Tracker's $9/month and $79/year tiers, plus the P&P Community Survey's premium tier for repeat users. This stream is smaller in Year 1 but grows with compounding loyalty — users who subscribe to the Pulse Tracker tend to stay subscribed because the value of the data increases over time as their local reference base expands.</p>
            <H3>Stream 3 — Institutional and API revenue</H3>
            <p>Custom pricing for development finance institutions, government agencies, research organisations, and international NGOs seeking bulk access to BRIDGE's intelligence database or API integration. This stream requires the least user volume to generate meaningful revenue — a single institutional partner at $25,000 annually exceeds the combined transaction revenue from 2,000 individual free-tier users. Year 1 target for institutional revenue is $10,000 conservative, $60,000 optimistic.</p>
            {/* Desktop table */}
            <table className="tier-tbl mob-hide">
              <thead><tr><th>Metric</th><th>Conservative</th><th>Moderate</th><th>Optimistic</th></tr></thead>
              <tbody>
                {revenueRows.map(([m,c,mo,o])=>(
                  <tr key={m}><td>{m}</td><td>{c}</td><td>{mo}</td><td>{o}</td></tr>
                ))}
              </tbody>
            </table>
            {/* Mobile card stack */}
            <TierMobStack rows={revenueRows} cols={revenueCols}/>
            <p>Year 3 projections, modelling network effects and institutional relationships that take time to establish, suggest annual application revenue of $250,000–$500,000. At that scale, the applications suite is a meaningful independent revenue line — one that funds the research operation and contributes to BRIDGE's overhead, reducing dependency on fund management fees during the patient capital deployment phase.</p>
          </div>
        </div>

        {/* ── DATA MOAT ── */}
        <div id="data-moat" style={{background:C.paperDark}}>
          <div className="body-pad">
            <Eyebrow>Strategic Asset</Eyebrow>
            <Rule/>
            <H2>The data moat that makes BRIDGE<br/>harder to compete with every month.</H2>
            <p>Revenue and leads are the obvious value of the applications suite. There is a third, less visible value that compounds more powerfully than either: the intelligence asset that every submission creates.</p>
            <p>Each submission across the six applications deposits structured data into BRIDGE's intelligence base. An Impact Score submission tells BRIDGE what someone is trying to build, in which sector, in which region, at what stage, with what capital. An Opportunity Finder submission tells BRIDGE which combinations of sector and geography are generating the most investor interest. A Readiness Diagnostic submission tells BRIDGE what the actual capability profile of Ghana's SME ecosystem looks like at a point in time. A Skills Matcher submission tells BRIDGE which professional competencies are available in the diaspora and at what level of commitment.</p>
            <PQ>After 10,000 submissions, BRIDGE possesses a view of Ghana's development landscape — who is building what, where, with what, for whom — that no other organisation on earth has. That view is a product that commands institutional pricing independent of BRIDGE's investment operation.</PQ>
            <p>The compounding effect matters for competitive positioning. Building the intelligence base took two years. A competitor starting today could replicate the sector research in another two years — but they cannot replicate two years of submission data that has already been collected. The first-mover advantage in data accumulation is structural, not temporary. Each month of operation increases the cost and time required for a competitor to match BRIDGE's dataset.</p>
            <H3>What the data enables internally</H3>
            <p>Beyond its commercial value, the submission dataset improves BRIDGE's own investment operation in ways that justify the application development cost independently. The Impact Score Assessor surfaces high-scoring ventures that BRIDGE would not otherwise encounter — effectively crowd-sourcing deal flow discovery across the diaspora and entrepreneur ecosystem. The Readiness Diagnostic creates a pipeline of investment-ready companies at exactly the moment they are seeking capital. The Opportunity Finder creates warm relationships with potential co-investors at the top of their research process. The applications are not just a product for users — they are infrastructure for BRIDGE's own sourcing, evaluation, and relationship-building process.</p>
          </div>
        </div>

        {/* ── FOR INVESTORS ── */}
        <div id="investor">
          <div className="section-cover">
            <div className="section-cover-num">05</div>
            <div className="section-eyebrow">For Investors</div>
            <h2 className="section-h">Why the applications suite<br/>matters to your investment thesis.</h2>
            <p className="section-sub">Four specific reasons why the applications suite strengthens the case for a capital commitment to BRIDGE PBC — beyond the fund returns themselves.</p>
          </div>
          <div className="body-pad" style={{background:C.paperDark}}>
            <H3>It de-risks the early years</H3>
            <p>Impact investment funds of BRIDGE's type — blended finance vehicles with $100M target capitalisation and 7–10 year return horizons — typically operate at a loss for the first 2–3 years as capital is deployed and portfolio companies begin generating returns. The applications suite creates a revenue line that begins generating income immediately, on day one of launch, before a single portfolio investment has been made. This revenue does not change the fund return profile materially — the amounts are too small relative to total fund size — but it changes the operating narrative significantly. BRIDGE is not a development finance startup burning through its reserves. It is an operating business generating revenue from its intellectual property while its investment portfolio matures.</p>
            <H3>It validates the methodology's market value</H3>
            <p>The BRIDGE Impact Score™ was developed for internal use. The fact that external users will pay $29 and $99 to access it provides independent market validation that the methodology has value beyond BRIDGE's own assessment processes. This validation matters for conversations with development finance institutions, government partners, and potential co-investors — it demonstrates that BRIDGE's analytical framework is not just internally credible but externally valued at commercial rates.</p>
            <H3>It creates compounding proprietary advantages</H3>
            <p>The submission dataset described in the previous section is a balance sheet asset that does not appear on any financial statement but creates genuine competitive advantage that grows with time. Investors in BRIDGE are acquiring an interest in that asset alongside their interest in the investment portfolio. As the dataset grows, so does the premium that institutional partners will pay for access to it — and so does the barrier to entry for any potential competitor seeking to replicate BRIDGE's position in the Ghana development intelligence market.</p>
            <H3>It generates a deal flow pipeline at no marginal cost</H3>
            <p>The highest-scoring submissions from the Impact Score Assessor are prospective portfolio companies. The applications identify them, score them against BRIDGE's own investment criteria, and initiate a relationship through the free report and automated nurture sequence — all before BRIDGE has invested any analyst time in evaluation. The applications effectively pre-screen inbound deal flow, reducing sourcing costs and ensuring that the most promising Ghana ventures find their way into BRIDGE's pipeline whether or not their founders knew BRIDGE existed when they first submitted.</p>
          </div>
        </div>

        {/* ── FOR FOUNDERS ── */}
        <div id="founder" style={{background:C.paper}}>
          <div className="body-pad">
            <Eyebrow>For Founders &amp; Partners</Eyebrow>
            <Rule/>
            <H2>What the applications offer the people<br/>who use them.</H2>
            <p>This whitepaper has spent considerable space on the strategic and commercial dimensions of the applications suite. It is equally important to be direct about what the applications actually offer to the founders, entrepreneurs, diaspora professionals, and community organisations who will use them — because the applications only work if they are genuinely valuable to users, and understanding that value is how we ensure we build products worth using.</p>
            <H3>For the Ghanaian entrepreneur</H3>
            <p>You have a venture idea. You may have spent months or years developing it. You believe it can work. What you lack is a credible, external assessment that tells you whether the idea is strong enough to attract investment, where its weaknesses are, and what specific steps would make it stronger. That assessment — the kind that development finance consultancies charge $3,000–$10,000 for — is available to you for free through the Impact Score Assessor, and for $29 or $99 in full analytical depth. No appointment required. No relationship needed. No gatekeeping beyond submitting a form.</p>
            <H3>For the diaspora professional</H3>
            <p>You want to contribute to Ghana's development. You have skills — in finance, technology, healthcare, agriculture, logistics — that are directly applicable to the challenges Ghana faces. What you lack is a structured pathway that matches your specific profile to the specific opportunities that need exactly what you have. The Diaspora Skills Matcher provides that pathway in minutes, with an output that is specific enough to be actionable rather than generic enough to be useless.</p>
            <H3>For the institutional partner</H3>
            <p>You are a development finance institution, a government agency, or an international NGO operating in Ghana. You need current, structured intelligence on market conditions, sector dynamics, and community needs. You commission surveys and research reports that take months to produce and cost more than you wish they did. The BRIDGE applications — particularly the Sector Pulse Tracker and the P&P Community Survey — provide that intelligence on a continuous, structured basis at a fraction of the cost of commissioned research. At the institutional access tier, you can query BRIDGE's dataset directly and integrate it into your own reporting infrastructure.</p>
          </div>
        </div>

        {/* ── ROADMAP ── */}
        <div id="roadmap" style={{background:C.paperDark}}>
          <div className="body-pad">
            <Eyebrow>Implementation</Eyebrow>
            <Rule/>
            <H2>Three phases.<br/>Eighteen months to full suite.</H2>
            <H3>Phase 1 — Q2 2026 · Flagship launch</H3>
            <p>App 01 (Impact Score Assessor) launches in full production with all three access tiers, Stripe payment integration, Claude API narrative generation, email delivery, and CRM lead capture. Simultaneously, the unified data infrastructure that all subsequent applications will feed is established — database schema, API architecture, analytics tracking. Target: 500 submissions in the first 60 days.</p>
            <H3>Phase 2 — Q3 2026 · Market intelligence tools</H3>
            <p>App 02 (Opportunity Finder) and App 03 (Readiness Diagnostic) launch with full tier structure. Cross-application lead attribution is established — a user who submits to the Assessor and later uses the Opportunity Finder is tracked as a single relationship, allowing BRIDGE to understand the full arc of each stakeholder's engagement. First institutional access packages are launched targeting two to three anchor clients in the development finance space.</p>
            <H3>Phase 3 — Q4 2026 · Community and network tools</H3>
            <p>Apps 04, 05, and 06 launch. Full suite integration — unified user profiles, cross-application history, a single login that persists across all six tools. The API layer for institutional partners goes live. Annual data intelligence report published, drawing on six months of aggregated submission data, establishing BRIDGE as a credible data intelligence publisher in the Ghana development space.</p>
            <H3>Backend requirements for production</H3>
            <p>The frontend application (App 01) is complete, Babel-validated, and ready for integration. The production backend requires: Stripe payment processing with webhook integration, PostgreSQL database with the schema documented in the production handoff, Claude API key with rate limit management, email delivery via Resend or SendGrid, PDF report generation for paid tiers, and CRM integration for nurture sequence automation. A full technical handoff document covering all backend requirements, with complete code samples for every API route, is available alongside this whitepaper.</p>
          </div>
        </div>

        {/* ── CLOSE ── */}
        <div id="close">
          <div className="section-cover" style={{minHeight:'60vh',display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <div className="section-cover-num">06</div>
            <div className="section-eyebrow">Closing Argument</div>
            <h2 className="section-h" style={{maxWidth:'680px'}}>BRIDGE already owns the product.<br/>The applications are just the storefront.</h2>
            <p className="section-sub" style={{marginBottom:'32px'}}>The intelligence exists. The methodology is validated. The research is complete. What has been missing is a structured, scalable interface between that intelligence and the people who need it most. These six applications provide that interface — and in providing it, they transform BRIDGE from an organisation that holds intelligence into one that delivers it, at scale, to the people it was always intended to serve.</p>
            <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
              <a href="https://bridgepbc.com" className="cta-btn">Explore bridgepbc.com →</a>
              <a href="https://bridgepbc.com/score" className="cta-btn-sec">Try the Impact Score Assessor</a>
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="cta-section">
          <div style={{maxWidth:'860px',padding:'0 4px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:800,letterSpacing:'3px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>BRIDGE PBC · March 2026</div>
            <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3.5vw,36px)',fontWeight:700,color:C.white,lineHeight:1.2,marginBottom:'14px',fontStyle:'italic'}}>For investment enquiries, partnership conversations, or media requests:</h2>
            <p style={{fontFamily:F.body,fontSize:'15px',color:'rgba(250,248,243,.55)',lineHeight:1.7,maxWidth:'560px',marginBottom:'0'}}>BRIDGE PBC is a Public Benefit Corporation incorporated to advance Peace &amp; Prosperity for Ghanaian citizens, households, and communities through diaspora-driven development investment across 12 integrated sectors.</p>
            <div style={{borderTop:'1px solid rgba(255,255,255,.1)',marginTop:'28px',paddingTop:'24px',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'20px'}}>
              {[['bridgepbc.com','Website'],['hello@bridgepbc.com','General enquiries'],['invest@bridgepbc.com','Investment enquiries'],['partners@bridgepbc.com','Partnerships']].map(([v,l])=>(
                <div key={l}>
                  <div style={{fontFamily:F.mono,fontSize:'12px',fontWeight:500,color:C.lime}}>{v}</div>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,.28)',marginTop:'3px'}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="doc-footer np">
          <div className="footer-inner" style={{maxWidth:'860px',margin:'0 auto',width:'100%',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'10px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
              <Logo height={16} variant="white"/>
              <div style={{width:'1px',height:'14px',background:'rgba(255,255,255,.08)'}}/>
              <span style={{fontFamily:F.mono,fontSize:'9px',color:'rgba(250,248,243,.16)',letterSpacing:'.5px',lineHeight:1.5}}>
                Digital Applications Suite Whitepaper · March 2026 · bridgepbc.com
              </span>
            </div>
            <div className="footer-links" style={{display:'flex',gap:'18px'}}>
              {['Overview','Apps Suite','Invest','Contact'].map((l,i)=>(
                <a key={i} href="#" style={{fontFamily:F.sans,fontSize:'9px',fontWeight:600,color:'rgba(255,255,255,.2)',textDecoration:'none',letterSpacing:'.5px'}}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

