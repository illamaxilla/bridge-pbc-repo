import{useState,useEffect}from"react";

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

  /* ── READING PROGRESS ── */
  #read-bar{position:fixed;top:0;left:0;height:2px;background:${C.lime};z-index:300;transition:width .1s linear;}

  /* ── DESKTOP TOC SIDEBAR ── */
  .toc{position:fixed;left:0;top:0;bottom:0;width:220px;background:${C.ink};padding:80px 0 32px;overflow-y:auto;z-index:90;}
  .toc-item{display:block;padding:7px 24px;font-family:${F.sans};font-size:10px;font-weight:600;color:rgba(250,248,243,.35);text-decoration:none;letter-spacing:.4px;transition:all .15s;border-left:2px solid transparent;cursor:pointer;}
  .toc-item:hover{color:rgba(250,248,243,.7);border-left-color:rgba(184,217,53,.3);}
  .toc-item.active{color:${C.lime};border-left-color:${C.lime};}
  .toc-section{padding:16px 24px 6px;font-family:${F.sans};font-size:8px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:rgba(250,248,243,.18);}
  .toc-logo{padding:0 24px 28px;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:16px;}
  .main{margin-left:220px;}

  /* ── MOBILE STICKY HEADER ── */
  .mob-header{display:none;position:fixed;top:0;left:0;right:0;z-index:200;background:${C.ink};height:52px;padding:0 20px;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.08);}
  .mob-header-section{font-family:${F.sans};font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:rgba(250,248,243,.35);max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
  .mob-menu-btn{background:none;border:none;cursor:pointer;padding:8px;display:flex;flex-direction:column;gap:4px;}
  .mob-menu-btn span{display:block;width:20px;height:2px;background:rgba(250,248,243,.6);border-radius:1px;transition:all .2s;}

  /* ── MOBILE DRAWER NAV ── */
  .mob-drawer{position:fixed;top:0;left:0;right:0;bottom:0;z-index:250;pointer-events:none;}
  .mob-drawer-overlay{position:absolute;inset:0;background:rgba(0,0,0,.5);opacity:0;transition:opacity .25s;}
  .mob-drawer-panel{position:absolute;top:0;right:0;bottom:0;width:280px;background:${C.ink};transform:translateX(100%);transition:transform .28s cubic-bezier(.4,0,.2,1);overflow-y:auto;padding:24px 0 calc(32px + env(safe-area-inset-bottom));}
  .mob-drawer.open .mob-drawer-overlay{opacity:1;pointer-events:all;}
  .mob-drawer.open .mob-drawer-panel{transform:translateX(0);}
  .mob-drawer-close{position:absolute;top:16px;right:16px;background:rgba(255,255,255,.08);border:none;cursor:pointer;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:rgba(250,248,243,.6);font-size:16px;}
  .mob-drawer-logo{padding:16px 24px 24px;border-bottom:1px solid rgba(255,255,255,.08);margin-bottom:12px;}
  .mob-toc-section{padding:14px 24px 5px;font-family:${F.sans};font-size:8px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:rgba(250,248,243,.18);}
  .mob-toc-item{display:block;width:100%;text-align:left;padding:9px 24px;font-family:${F.sans};font-size:12px;font-weight:600;color:rgba(250,248,243,.45);background:none;border:none;cursor:pointer;letter-spacing:.3px;transition:color .15s;}
  .mob-toc-item:active{color:${C.lime};}
  .mob-toc-item.active{color:${C.lime};}

  /* ── LAYOUT ── */
  @media(max-width:900px){.toc{display:none;}.main{margin-left:0;}.mob-header{display:flex;}}
  @media(max-width:900px){.main{padding-top:52px;}}

  /* ── TYPOGRAPHY ── */
  .dc::first-letter{font-family:${F.display};font-size:4.2em;font-weight:900;float:left;line-height:.82;margin:.06em .1em 0 0;color:${C.forest};}
  p{font-family:${F.body};font-size:16px;line-height:1.85;color:${C.ink};font-weight:300;margin-bottom:18px;}
  p+p{text-indent:1.5em;}
  strong{font-weight:600;}
  em{font-style:italic;}
  @media(max-width:600px){
    p{font-size:15px;line-height:1.8;}
    .dc::first-letter{font-size:3.4em;}
  }

  /* ── RULES & PULL QUOTES ── */
  .rule-strong{border-top:6px solid ${C.ink};border-bottom:2px solid ${C.lime};padding-bottom:3px;margin-bottom:20px;}
  .rule-light{border-top:1px solid ${C.border};margin:32px 0;}
  .pq{border-left:3px solid ${C.lime};padding:0 0 0 24px;margin:32px 0;font-family:${F.display};font-size:20px;font-style:italic;color:${C.forest};line-height:1.5;}
  @media(max-width:600px){.pq{font-size:17px;padding-left:16px;margin:24px 0;}}

  /* ── STAT STRIP ── */
  .stat-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:${C.border};border:1px solid ${C.border};margin:32px 0;}
  .stat-cell{background:${C.paper};padding:20px 16px;text-align:center;}
  .stat-n{font-family:${F.mono};font-size:32px;font-weight:500;color:${C.forest};display:block;line-height:1;}
  .stat-l{font-family:${F.sans};font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};margin-top:5px;display:block;}
  @media(max-width:600px){.stat-strip{grid-template-columns:1fr 1fr;}.stat-n{font-size:26px;}}

  /* ── SECTION COVERS ── */
  .section-cover{background:${C.ink};padding:56px 64px;position:relative;overflow:hidden;}
  .section-cover-num{position:absolute;right:-10px;bottom:-20px;font-family:${F.display};font-size:clamp(100px,18vw,200px);font-weight:900;color:rgba(255,255,255,.04);line-height:1;pointer-events:none;user-select:none;}
  .section-eyebrow{font-family:${F.sans};font-size:9px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:rgba(184,217,53,.6);margin-bottom:12px;}
  .section-h{font-family:${F.display};font-size:clamp(24px,4vw,42px);font-weight:900;color:${C.white};line-height:1.15;margin-bottom:12px;}
  .section-sub{font-family:${F.body};font-size:16px;color:rgba(250,248,243,.55);max-width:640px;line-height:1.7;font-weight:300;}
  @media(max-width:600px){.section-sub{font-size:14px;}}

  /* ── BODY PADDING ── */
  .body-pad{padding:56px 64px;max-width:860px;}
  @media(max-width:900px){.body-pad{padding:40px 32px;}.section-cover{padding:40px 32px;}}
  @media(max-width:600px){.body-pad{padding:32px 24px;}.section-cover{padding:32px 24px;}}

  /* ── COVER PADDING (overrides inline style via class) ── */
  .cover-pad{padding:80px 64px 64px;}
  @media(max-width:900px){.cover-pad{padding:64px 32px 48px;}}
  @media(max-width:600px){.cover-pad{padding:48px 24px 40px;}}

  /* ── HEADINGS ── */
  .eyebrow{font-family:${F.sans};font-size:9px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:${C.muted};margin-bottom:8px;}
  .h2{font-family:${F.display};font-size:clamp(20px,3vw,32px);font-weight:700;color:${C.ink};line-height:1.25;margin-bottom:16px;}
  .h3{font-family:${F.sans};font-size:15px;font-weight:700;color:${C.forest};margin-bottom:8px;margin-top:24px;}

  /* ── DESKTOP TABLES ── */
  .tier-tbl{width:100%;border-collapse:collapse;margin:24px 0;font-family:${F.sans};font-size:12px;}
  .tier-tbl th{background:${C.ink};color:${C.lime};font-size:9px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;padding:10px 14px;text-align:left;}
  .tier-tbl td{padding:10px 14px;border-bottom:1px solid ${C.border};color:${C.ink};vertical-align:top;line-height:1.5;}
  .tier-tbl tr:nth-child(even) td{background:${C.paperDark};}
  .tier-tbl td:first-child{font-weight:700;white-space:nowrap;}

  /* ── MOBILE TABLE CARDS (replaces tables ≤600px) ── */
  .mob-show{display:none;}
  .mob-hide{display:block;}
  @media(max-width:600px){
    .mob-show{display:block;}
    .mob-hide{display:none;}
    .tier-tbl{display:none;}
  }
  .mob-card-stack{display:flex;flex-direction:column;gap:12px;margin:20px 0;}
  .mob-card{border:1px solid ${C.border};border-left:3px solid ${C.lime};background:${C.paper};padding:16px;}
  .mob-card-title{font-family:${F.sans};font-size:12px;font-weight:800;color:${C.forest};margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px;}
  .mob-card-row{display:flex;justify-content:space-between;align-items:flex-start;padding:5px 0;border-bottom:1px solid ${C.border};gap:12px;}
  .mob-card-row:last-child{border-bottom:none;}
  .mob-card-key{font-family:${F.sans};font-size:9px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;color:${C.muted};flex-shrink:0;padding-top:2px;}
  .mob-card-val{font-family:${F.body};font-size:13px;color:${C.ink};line-height:1.5;text-align:right;}
  .mob-card.hl{border-left-color:${C.forest};background:rgba(184,217,53,.06);}
  .mob-card.hl .mob-card-title{color:${C.forest};}

  /* ── PROGRESSIVE DISCLOSURE ── */
  .mob-toggle{display:none;}
  @media(max-width:600px){
    .mob-toggle{display:flex;align-items:center;justify-content:space-between;width:100%;background:${C.paperDark};border:1px solid ${C.border};border-radius:0;padding:12px 16px;font-family:${F.sans};font-size:11px;font-weight:700;color:${C.forest};letter-spacing:.5px;cursor:pointer;margin-top:12px;text-transform:uppercase;}
    .mob-toggle-dark{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.1);color:${C.lime};}
    .mob-item-hidden{display:none;}
  }
  .mob-toggle-arrow{font-size:14px;transition:transform .2s;display:inline-block;}

  /* ── CTA BUTTONS ── */
  .cta-section{background:${C.forest};padding:56px 64px;}
  .cta-btn{display:inline-block;background:${C.lime};color:${C.ink};padding:14px 28px;font-family:${F.sans};font-size:13px;font-weight:800;text-decoration:none;letter-spacing:.4px;margin-right:12px;margin-top:10px;border:none;cursor:pointer;}
  .cta-btn-sec{display:inline-block;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);color:${C.white};padding:14px 24px;font-family:${F.sans};font-size:13px;font-weight:700;text-decoration:none;margin-top:10px;}
  @media(max-width:600px){
    .cta-section{padding:40px 24px;}
    .cta-btn,.cta-btn-sec{display:block;text-align:center;margin-right:0;width:100%;}
  }

  /* ── FOOTER ── */
  .doc-footer{background:${C.ink};padding:24px 64px;border-top:3px solid ${C.lime};display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;padding-bottom:calc(24px + env(safe-area-inset-bottom));}
  @media(max-width:600px){.doc-footer{padding:20px 24px;padding-bottom:calc(20px + env(safe-area-inset-bottom));flex-direction:column;align-items:flex-start;gap:8px;}}

  /* ── DATA CARDS ── */
  .data-card{border-left:3px solid ${C.lime};padding:16px 20px;background:${C.paperDark};margin-bottom:16px;}
  .data-card-n{font-family:${F.mono};font-size:28px;font-weight:500;color:${C.forest};line-height:1;display:block;margin-bottom:4px;}
  .data-card-l{font-family:${F.sans};font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${C.muted};}
  .data-card-src{font-family:${F.sans};font-size:9px;color:${C.faint};margin-top:6px;display:block;}
  .data-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:24px 0;}
  @media(max-width:600px){.data-grid{grid-template-columns:1fr;}.data-card-n{font-size:24px;}}

  /* ── PILLS ── */
  .pill{display:inline-block;font-family:${F.sans};font-size:9px;font-weight:800;letter-spacing:2px;text-transform:uppercase;padding:4px 12px;border-radius:50px;margin-right:6px;margin-bottom:6px;}
  .pill-lime{background:rgba(184,217,53,.15);color:${C.teal};border:1px solid rgba(184,217,53,.4);}
  .pill-amber{background:rgba(184,115,10,.1);color:${C.amber};border:1px solid rgba(184,115,10,.3);}
  .pill-dark{background:rgba(27,77,62,.1);color:${C.forest};border:1px solid rgba(27,77,62,.3);}

  /* ── FEATURES ── */
  .feature-row{display:flex;gap:16px;align-items:flex-start;padding:20px 0;border-bottom:1px solid ${C.border};}
  .feature-icon{width:36px;height:36px;min-width:36px;background:${C.forest};display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:${F.mono};font-size:14px;font-weight:500;color:${C.lime};}
  .feature-body{flex:1;min-width:0;}
  .feature-title{font-family:${F.sans};font-size:13px;font-weight:700;color:${C.ink};margin-bottom:6px;}
  .feature-desc{font-family:${F.body};font-size:14px;color:${C.muted};line-height:1.7;margin:0;}
  @media(max-width:600px){
    .feature-row{flex-direction:column;gap:10px;}
    .feature-desc{font-size:13px;}
  }

  /* ── COMPETITIVE TABLE ── */
  .comp-table-wrap{margin:24px 0;border:1px solid ${C.border};overflow:hidden;}
  .comp-row{display:grid;grid-template-columns:2fr 1fr 1fr 1fr 1.2fr;gap:1px;background:${C.border};}
  .comp-cell{background:${C.paper};padding:10px 14px;font-family:${F.sans};font-size:11px;color:${C.ink};line-height:1.4;}
  .comp-cell.hdr{background:${C.ink};color:${C.lime};font-size:9px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;}
  .comp-cell.dim{color:${C.muted};font-size:10px;}
  .comp-cell.hl{background:rgba(184,217,53,.08);font-weight:700;color:${C.forest};}
  /* mobile: competitive table becomes cards */
  @media(max-width:700px){
    .comp-table-wrap .comp-row{display:none;}
    .comp-table-wrap .comp-row.mob-comp-card{display:block;background:none;padding:14px 16px;border-bottom:1px solid ${C.border};}
    .comp-table-wrap .comp-row.mob-comp-card .comp-cell{display:block;background:transparent !important;border:none;padding:2px 0;font-size:12px;}
    .comp-table-wrap .comp-row.mob-comp-card .comp-cell.hdr-col{font-family:${F.sans};font-size:13px;font-weight:800;color:${C.forest};padding-bottom:6px;}
    .comp-table-wrap .comp-row.mob-comp-card .comp-cell.dim{color:${C.muted};}
    .comp-table-wrap .comp-row.mob-comp-card.hl-card{background:rgba(184,217,53,.06) !important;border-left:3px solid ${C.lime};}
    .comp-table-wrap .comp-row.mob-comp-card.hl-card .comp-cell.hdr-col{color:${C.forest};}
  }

  /* ── PHASE BLOCKS ── */
  .phase-block{border-left:3px solid ${C.lime};padding:20px 24px;margin-bottom:20px;background:${C.paperDark};}
  .phase-label{font-family:${F.mono};font-size:10px;font-weight:500;color:${C.lime};letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;display:block;}
  .phase-title{font-family:${F.sans};font-size:15px;font-weight:700;color:${C.ink};margin-bottom:10px;}
  @media(max-width:600px){.phase-block{padding:16px 20px;}}
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

const SECTIONS=[
  {id:'cover',label:'Cover'},
  {id:'executive',label:'Executive Summary',group:'Overview'},
  {id:'crisis',label:'The Urgency in Numbers',group:'The Problem'},
  {id:'predators',label:'The Predator Economy'},
  {id:'paradox',label:'The Talent-Opportunity Paradox'},
  {id:'solution',label:'The BRIDGE Advantage',group:'The Solution'},
  {id:'platform',label:'BRIDGE Connect Platform'},
  {id:'features',label:'Five Core Capabilities'},
  {id:'pathways',label:'Three Opportunity Pathways'},
  {id:'landscape',label:'Competitive Landscape'},
  {id:'trust',label:'The Trust Architecture'},
  {id:'impact',label:'Projected Impact',group:'Impact & Business'},
  {id:'revenue',label:'Revenue Model'},
  {id:'roadmap',label:'Implementation Roadmap'},
  {id:'investor',label:'For Investors'},
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

const MobHeader=({activeLabel,onOpen})=>(
  <div className="mob-header np">
    <Logo height={16} variant="white"/>
    <span className="mob-header-section">{activeLabel}</span>
    <button className="mob-menu-btn" onClick={onOpen} aria-label="Open navigation">
      <span/><span/><span/>
    </button>
  </div>
);

const MobDrawer=({active,open,onClose})=>(
  <div className={`mob-drawer np${open?' open':''}`}>
    <div className="mob-drawer-overlay" onClick={onClose}/>
    <div className="mob-drawer-panel">
      <button className="mob-drawer-close" onClick={onClose}>✕</button>
      <div className="mob-drawer-logo"><Logo height={16} variant="white"/></div>
      {SECTIONS.map((s,i)=>(
        <span key={i}>
          {s.group&&<div className="mob-toc-section">{s.group}</div>}
          <button
            className={`mob-toc-item${active===s.id?' active':''}`}
            onClick={()=>{
              document.getElementById(s.id)?.scrollIntoView({behavior:'smooth',block:'start'});
              onClose();
            }}
          >{s.label}</button>
        </span>
      ))}
    </div>
  </div>
);

const Rule=()=><div className="rule-strong"/>;
const Eyebrow=({children})=><div className="eyebrow">{children}</div>;
const H2=({children})=><h2 className="h2">{children}</h2>;
const H3=({children})=><h3 className="h3">{children}</h3>;
const PQ=({children})=><blockquote className="pq">{children}</blockquote>;
const DataCard=({n,label,source})=>(
  <div className="data-card">
    <span className="data-card-n">{n}</span>
    <span className="data-card-l">{label}</span>
    {source&&<span className="data-card-src">Source: {source}</span>}
  </div>
);

export default function BRIDGEConnectWhitepaper(){
  const [activeSection,setActiveSection]=useState('cover');
  const [readPct,setReadPct]=useState(0);
  const [drawerOpen,setDrawerOpen]=useState(false);

  useEffect(()=>{
    const onScroll=()=>{
      const el=document.documentElement;
      const pct=Math.round((el.scrollTop/(el.scrollHeight-el.clientHeight))*100);
      setReadPct(Math.min(100,pct||0));
      for(let i=SECTIONS.length-1;i>=0;i--){
        const el2=document.getElementById(SECTIONS[i].id);
        if(el2&&el2.getBoundingClientRect().top<=120){setActiveSection(SECTIONS[i].id);break;}
      }
    };
    window.addEventListener('scroll',onScroll,{passive:true});
    return()=>window.removeEventListener('scroll',onScroll);
  },[]);

  // Lock body scroll when drawer open
  useEffect(()=>{
    document.body.style.overflow=drawerOpen?'hidden':'';
    return()=>{document.body.style.overflow='';};
  },[drawerOpen]);

  const activeLabel=SECTIONS.find(s=>s.id===activeSection)?.label||'';

  return(
    <div style={{fontFamily:F.body,background:C.paper,minHeight:'100vh'}}>
      <Gf/>
      <div id="read-bar" style={{width:`${readPct}%`}}/>
      <TOC active={activeSection}/>
      <MobHeader activeLabel={activeLabel} onOpen={()=>setDrawerOpen(true)}/>
      <MobDrawer active={activeSection} open={drawerOpen} onClose={()=>setDrawerOpen(false)}/>
      <div className="main">

        {/* ── COVER ──────────────────────────────────────────────────────────── */}
        <div id="cover" className="cover-pad" style={{background:C.ink,minHeight:'92vh',display:'flex',flexDirection:'column',justifyContent:'space-between',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',right:0,bottom:0,fontFamily:F.display,fontSize:'clamp(160px,28vw,400px)',fontWeight:900,color:'rgba(255,255,255,.025)',lineHeight:1,pointerEvents:'none',userSelect:'none',letterSpacing:'-12px'}}>C</div>
          <div>
            <Logo height={28} variant="white"/>
            <div style={{borderTop:'1px solid rgba(255,255,255,.1)',marginTop:'28px',marginBottom:'48px'}}/>
          </div>
          <div style={{maxWidth:'760px',position:'relative',zIndex:1}}>
            <div style={{display:'inline-block',background:'rgba(184,217,53,.1)',border:'1px solid rgba(184,217,53,.2)',padding:'5px 14px',marginBottom:'24px',fontFamily:F.sans,fontSize:'9px',fontWeight:800,letterSpacing:'3px',textTransform:'uppercase',color:C.lime}}>Whitepaper · BRIDGE Connect · March 2026</div>
            <h1 style={{fontFamily:F.display,fontSize:'clamp(36px,5.5vw,72px)',fontWeight:900,color:C.white,lineHeight:1.05,marginBottom:'24px',letterSpacing:'-1px'}}>
              Ghana's Talent Is Not<br/>the Problem.<br/><em style={{color:C.lime,fontStyle:'italic'}}>The Missing Bridge Is.</em>
            </h1>
            <p style={{fontFamily:F.body,fontSize:'18px',color:'rgba(250,248,243,.6)',lineHeight:1.75,maxWidth:'600px',fontWeight:300,marginBottom:'0'}}>Ghana produces engineers, nurses, developers, creatives, and tradespeople at a rate the world needs. In the absence of safe, verified pathways to global opportunity, a predator economy has filled the vacuum — extracting hundreds of millions from citizens while delivering nothing but false promises. BRIDGE Connect changes that. It matches skilled Ghanaians to verified real opportunities — remote work, ethical international employment, and structured advancement — at zero cost, with every listing screened and every employer accountable.</p>
          </div>
          <div style={{borderTop:'1px solid rgba(255,255,255,.1)',marginTop:'48px',paddingTop:'28px',display:'flex',gap:'32px',flexWrap:'wrap'}}>
            {[['21%','Youth unemployment (Ghana, 2023)'],['273','Trafficking cases investigated (2024)'],['$37.7B','Africa freelance market by 2034'],['$0','Cost to access BRIDGE Connect'],['3','Verified opportunity pathways']].map(([n,l])=>(
              <div key={l} style={{minWidth:'80px'}}>
                <div style={{fontFamily:F.mono,fontSize:'24px',fontWeight:500,color:C.lime,lineHeight:1}}>{n}</div>
                <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,.28)',marginTop:'4px'}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── EXECUTIVE SUMMARY ──────────────────────────────────────────────── */}
        <div id="executive" style={{background:C.paper}}>
          <div className="body-pad">
            <Eyebrow>Executive Summary</Eyebrow>
            <Rule/>
            <H2>The talent is here.<br/>The global demand is real.<br/>What is missing is the connection.</H2>
            <p className="dc">Ghana's human capital story is one of extraordinary potential already in motion. The country produces engineers, nurses, accountants, software developers, creatives, tradespeople, teachers, and entrepreneurs at a rate that should power decades of national and international contribution. Its literacy rate approaches 79%. Internet penetration has reached 69.8%, with 24 million users online. Over 57% of the population is under 25 — one of the most energetic and digitally-capable youth workforces on the continent. This is not a country struggling to produce talent. It is a country that has not yet built adequate infrastructure to connect that talent to the opportunities it deserves.</p>
            <p>The result of that infrastructure gap is not idleness. It is desperation — and desperation has consequences. Youth unemployment runs at 21% by official measure and higher in practice for urban graduates. The mismatch between skills and accessible opportunity is severe enough that hundreds of thousands of Ghanaians make an agonising calculation every year: drain the savings account, sell the family land, pay a "recruitment agency" a sum equal to two years of wages — and attempt to leave by whatever means available. Many of those agencies are fraudulent. Many of those attempts are dangerous. Some are fatal.</p>
            <p>This does not need to happen. The global demand for Ghanaian talent is real and growing. Africa's freelance tech market is projected to grow from $7.3 billion in 2024 to $37.7 billion by 2034. International employers across healthcare, hospitality, manufacturing, and digital services are actively seeking English-proficient, educated, motivated workers with exactly the profiles Ghana produces. The obstacle is not supply. It is not demand. It is the absence of a trusted, verified, accessible bridge between the two.</p>
            <PQ>BRIDGE Connect does not create opportunity. It makes visible the opportunity that already exists — and puts a verified, accountable pathway between Ghanaian talent and the global economy that is actively searching for it.</PQ>
            <p>BRIDGE PBC is building BRIDGE Connect: a platform that matches skilled Ghanaians to three categories of real, verified opportunity — remote and digital work, ethical international employment, and structured upskilling that advances users to higher-value positions. The platform is free to all Ghanaian users. Every opportunity is verified before it appears. Every employer and recruiter is screened and accountable. The predator economy does not get through.</p>
            <div className="stat-strip">
              {[['Free','Platform access — always'],['3','Opportunity pathways'],['Verified','Every listing, every employer'],['Ghana-first','Outcomes, not placement fees']].map(([n,l])=>(
                <div className="stat-cell" key={l}><span className="stat-n">{n}</span><span className="stat-l">{l}</span></div>
              ))}
            </div>
          </div>
        </div>

        {/* ── THE URGENCY IN NUMBERS ─────────────────────────────────────────── */}
        <div id="crisis">
          <div className="section-cover">
            <div className="section-cover-num">01</div>
            <div className="section-eyebrow">The Problem</div>
            <h2 className="section-h">The human cost of a<br/>broken opportunity infrastructure.</h2>
            <p className="section-sub">These are not projections. They are a documented record of what happens when skilled, ambitious people have no safe pathway to the opportunities they have earned.</p>
          </div>
          <div className="body-pad" style={{background:C.paperDark}}>
            <H3>The employment gap</H3>
            <p>Ghana's official youth unemployment figure of 21% for 2023 understates the practical reality. Urban unemployment ran at 15.9% in 2024 — and rising — while the category of "employed" absorbs millions in precarious informal work that provides neither stability nor a path forward. For university graduates, the gap between what their education promised and what the formal job market delivers is one of the defining frustrations of a generation.</p>
            <p>The scale of the opportunity: over 57% of Ghanaians are under 25 years old. That is a youth workforce of extraordinary depth — motivated, increasingly digitally capable, educated under a national curriculum that has prioritised STEM and English. If the infrastructure to connect this workforce to accessible opportunity existed at scale, the development implications would be transformational. That infrastructure does not yet exist.</p>
            <div className="data-grid">
              <DataCard n="21%" label="Youth unemployment rate, Ghana (2023)" source="Ghana Statistical Service"/>
              <DataCard n="15.9%" label="Urban unemployment rate, 2024" source="GSS Labour Statistics Bulletin 2025"/>
              <DataCard n="57%" label="Share of Ghanaians under age 25" source="Ghana Statistical Service"/>
              <DataCard n="79%" label="National literacy rate" source="UNESCO / Ghana Statistical Service"/>
            </div>
            <H3>The talent circulation challenge</H3>
            <p>Ghana's skilled professionals move internationally because the conditions for a dignified professional life have not been sufficient at home — not because they have abandoned their country. The consequence is a pattern where Ghana invests in training its best talent, and that investment is captured elsewhere. Fifty-six percent of trained doctors practice abroad. Twenty-four percent of trained nurses work internationally — with 500 nurses leaving every single month, primarily to the United Kingdom and United States. Engineers, teachers, tech professionals, and entrepreneurs follow similar paths.</p>
            <p>Ghana invests approximately $45,000 per medical professional in subsidised training. The annual cost of training investment that does not return to serve Ghanaian communities approaches $415 million. This is not a criticism of the individuals who made these decisions. It is a quantification of what is lost when the infrastructure to retain and reconnect talent does not exist.</p>
            <p>The distinction that matters here — and that defines BRIDGE Connect's design — is between permanent departure and active circulation. A Ghanaian nurse who practices in London and never returns is a talent loss. A Ghanaian professional who accesses international opportunity, develops skills, earns internationally, and maintains an active connection to Ghanaian institutions, networks, and communities is a national asset. BRIDGE Connect is designed to create the second outcome, not to prevent the first.</p>
            <PQ>The goal is not to stop Ghanaians from pursuing international opportunity. It is to ensure they can access that opportunity safely, ethically, and with pathways that keep their skills and earnings circulating back into the country that developed them.</PQ>
            <H3>The migration risk</H3>
            <p>When formal and affordable pathways to opportunity are unavailable, informal and dangerous ones fill the gap. In 2024 — the deadliest year on record for migration — more than 8,700 migrants died or disappeared globally. The Central Mediterranean route alone claimed more than 1,700 lives. Roughly one in every 120 people who attempted the Mediterranean crossing in 2024 died in the attempt. Ghanaians are among those making these journeys, alongside West African peers who have concluded that the risk of the crossing is preferable to the certainty of the constraint at home.</p>
            <div className="data-grid">
              <DataCard n="8,700+" label="Migrants died or disappeared globally in 2024 — deadliest year on record" source="IOM Missing Migrants Project"/>
              <DataCard n="1 in 120" label="People who attempted the Mediterranean crossing died in 2024" source="IOM Missing Migrants Project"/>
              <DataCard n="$415M" label="Annual training investment lost through professional emigration" source="BRIDGE Research"/>
              <DataCard n="500/mo" label="Nurses leaving Ghana every month to practice abroad" source="BRIDGE White Paper"/>
            </div>
          </div>
        </div>

        {/* ── THE PREDATOR ECONOMY ───────────────────────────────────────────── */}
        <div id="predators" style={{background:C.paper}}>
          <div className="body-pad">
            <Eyebrow>The Exploitation Landscape</Eyebrow>
            <Rule/>
            <H2>When legitimate pathways are absent,<br/>predators fill the space.</H2>
            <p>The demand for a route to opportunity is rational and legitimate. The supply of fraudulent, exploitative, and dangerous responses to that demand is the problem that must be named precisely. Ghana's placement on the US State Department's Tier 2 Trafficking in Persons list reflects significant government effort — but also documents a persistent, growing exploitation ecosystem. In 2024, authorities investigated 273 trafficking cases, up from 109 in 2023. They prosecuted 65 alleged traffickers and convicted 25. These numbers represent only what was caught and formally processed through a system under-resourced for the scale of the problem.</p>
            <H3>How predatory agencies operate</H3>
            <p>The typical fraudulent recruitment operation does not present as a criminal enterprise. It presents as a legitimate employment agency: a social media presence, professional-looking website, testimonials, and the language of opportunity. It targets precisely: ambitious young people with some education, enough household savings to pay an upfront fee, and enough desperation to suspend the scepticism they might otherwise apply. Fees of $1,000–$5,000 USD — framed as "placement fees," "processing costs," or "insurance deposits" — are extracted across one or multiple interactions.</p>
            <p>Outcomes vary. Some victims are placed in domestic servitude abroad under conditions entirely unlike what was promised. Others are trafficked to Gulf states — a 2017 Ghanaian government ban on labour migration to the Gulf remains in effect, but observers confirmed to the State Department that the number of Ghanaians exploited in the Gulf continued to increase, partly because the ban restricts legal migration without reducing criminal supply. In early 2025, 76 young Ghanaian men were trafficked to Nigeria under the guise of football academy placements — their phones and identity documents confiscated, their families extorted through them, all recruited through Facebook posts and WhatsApp messages visually indistinguishable from legitimate scouting.</p>
            <PQ>The predator economy does not cause desperation. It services desperation that broken infrastructure produces. Every fraudulent agency extracting fees from a Ghanaian job seeker is operating in a vacuum that a functioning opportunity system should have filled.</PQ>
            <H3>The digital escalation</H3>
            <p>Predatory recruitment has fully migrated online. Traffickers now weaponise sporting ambitions, professional aspirations, and the trust embedded in personal WhatsApp networks. Targeted digital advertising serves fraudulent "job opportunities" to exactly the demographic profiles most likely to respond. The platforms hosting these campaigns bear partial responsibility — but enforcement is reactive, slow, and systemically outpaced by criminal ingenuity. The upstream solution is not primarily a policing problem. It is an infrastructure problem: eliminate the conditions of vulnerability by providing a trustworthy alternative that makes the predatory offer unnecessary.</p>
            <H3>The financial extraction</H3>
            <p>The scale of financial harm is substantial. At even modest estimates — 50,000 Ghanaians per year paying an average of $1,500 to fraudulent or ineffective agencies — the annual extraction from Ghanaian households exceeds $75 million. This is not capital that flows into productive investment. It is savings that families accumulated over years, transferred to criminal networks, and lost permanently. BRIDGE Connect's zero-cost access model is not a marketing decision. It is a direct structural intervention against this extraction.</p>
          </div>
        </div>

        {/* ── THE TALENT-OPPORTUNITY PARADOX ────────────────────────────────── */}
        <div id="paradox">
          <div className="section-cover">
            <div className="section-cover-num">02</div>
            <div className="section-eyebrow">The Paradox</div>
            <h2 className="section-h">The world is actively searching<br/>for what Ghana has.<br/>The connection has not been built.</h2>
            <p className="section-sub">While Ghanaians are spending their savings on dangerous or fraudulent migration attempts, global employers and remote-work platforms are actively searching for the skilled, English-proficient, digitally-capable talent that Ghana produces in abundance.</p>
          </div>
          <div className="body-pad" style={{background:C.paperDark}}>
            <H3>The global demand that already exists</H3>
            <p>The same decade that produced a surge in dangerous migration attempts from West Africa has also produced a structural transformation in how global work is organised. Remote employment is no longer a pandemic-era experiment — it is the primary talent acquisition strategy for a growing share of global companies. Firms in the United States, Europe, Canada, and Australia are building distributed teams. They need software developers, data analysts, customer experience professionals, content creators, financial operators, and technical specialists. They need English-proficient, educated, motivated workers. They are, in many cases, willing to pay wages pegged to global market rates — which in Ghana's cost-of-living context represent extraordinary purchasing power.</p>
            <p>Africa's freelance tech sector was valued at $7.32 billion in 2024. By 2034, projections place it at $37.71 billion — a five-fold expansion driven by exactly this dynamic. Ghanaian freelancers are already active on platforms like Upwork and Fiverr. But those platforms assume existing portfolios, familiarity with international payment infrastructure, and comfort with self-marketing to a global audience. They serve the already-connected minority. BRIDGE Connect is designed for the talented-but-unconnected majority — the skilled Ghanaians who have never been given a structured, safe entry point into this market.</p>
            <div className="data-grid">
              <DataCard n="$37.7B" label="Projected Africa freelance tech market by 2034 (from $7.3B in 2024)" source="NewsGhana / Market Research 2025"/>
              <DataCard n="69.8%" label="Ghana internet penetration (2024) — 24 million users online" source="DataReportal 2024"/>
              <DataCard n="25%" label="Projected share of Ghana's workforce in remote roles by 2030" source="World Bank / NewsGhana 2024"/>
              <DataCard n="8hr" label="Time zone overlap between Ghana and the United States" source="BRIDGE Research"/>
            </div>
            <H3>The structural readiness that already exists</H3>
            <p>Ghana is not starting from scratch on any of this. A 79% national literacy rate. An English-language educational system producing graduates at every skill level. A Free Senior High School Policy that has dramatically expanded secondary enrolment since 2017. Growing STEM focus in the national curriculum. An established co-working infrastructure in Accra, Kumasi, and secondary cities — Impact Hub, Basecamp Initiative, iSpace Foundation, MEST Africa — that gives remote workers the space and connectivity to operate professionally. An 8-hour time zone overlap with the US East Coast that makes synchronous collaboration straightforward.</p>
            <p>What Ghana currently lacks is not the underlying capability. It is the structured, verified, trusted interface between that capability and the global markets seeking it. That is precisely the gap BRIDGE Connect closes.</p>
            <PQ>A Ghanaian software developer earning international remote rates earns more than double the local average salary — without leaving Accra, without selling family land, without crossing any water. The infrastructure to make that connection at scale is the only thing missing.</PQ>
          </div>
        </div>

        {/* ── THE BRIDGE ADVANTAGE ───────────────────────────────────────────── */}
        <div id="solution">
          <div className="section-cover">
            <div className="section-cover-num">03</div>
            <div className="section-eyebrow">The BRIDGE Advantage</div>
            <h2 className="section-h">What BRIDGE brings to this problem<br/>that no newcomer can replicate.</h2>
            <p className="section-sub">Matching platforms are not novel technology. What is rare is the combination of Ghana-specific intelligence, government relationships, verification infrastructure, and mission structure that makes this platform structurally safe rather than aspirationally safe.</p>
          </div>
          <div className="body-pad" style={{background:C.paperDark}}>
            <p>The talent-matching challenge for Ghana's skilled workforce is not unsolved because it is technically difficult. Matching platforms are not novel technology. It is unsolved because this specific problem — serving ordinary Ghanaian workers safely, in a market infiltrated by predatory actors — requires a combination of assets that no purely commercial entrant possesses: deep Ghana-specific market intelligence, established relationships with government and community institutions, a rigorous verification infrastructure, and a mission structure that keeps user welfare as the primary success metric rather than placement volume or revenue.</p>
            <H3>The intelligence base</H3>
            <p>BRIDGE PBC has spent two years building a comprehensive intelligence base on Ghana's development landscape — including detailed Education and Labour sector analyses that document precisely where Ghana's skill supply concentrates, where it meets underserved demand, and which sectors present the most immediate matching opportunity. This intelligence base is already operationalised through the BRIDGE Impact Score™ Assessor. BRIDGE Connect's matching engine extends that same intelligence into the talent marketplace — meaning the platform understands Ghana's workforce at a sectoral depth that a generic jobs platform built without this foundation could not achieve.</p>
            <H3>Government partnership</H3>
            <p>BRIDGE's institutional relationships with Ghana's Ministry of Employment and Labour Relations — the body responsible for licensing and regulating recruitment agencies — provide direct access to the official registry of licensed recruiters. This access is not available to commercial platforms on day one. It takes years of relationship-building to obtain, and it is the foundation of the verification system that makes BRIDGE Connect structurally safer than any alternative currently available to Ghanaian job seekers.</p>
            <H3>Mission structure as product design</H3>
            <p>BRIDGE PBC is a Public Benefit Corporation. That designation is not a marketing label. It creates legally enforceable mission obligations that prevent the organisation from drifting toward the kind of commercial optimisation that produces predatory dynamics — charging users, prioritising high-volume low-quality listings, deprioritising verification when it slows growth. The PBC structure means that the commitment to user welfare is embedded in the company's legal foundation, not dependent on the intentions of any particular management team. For users who have been systematically preyed upon by operators who had no such constraints, this matters enormously.</p>
          </div>
        </div>

        {/* ── THE PLATFORM ───────────────────────────────────────────────────── */}
        <div id="platform">
          <div className="section-cover">
            <div className="section-cover-num">04</div>
            <div className="section-eyebrow">The Platform</div>
            <h2 className="section-h">BRIDGE Connect:<br/>A verified talent marketplace<br/>built around Ghanaian dignity.</h2>
            <p className="section-sub">Not a job board. Not a recruitment agency. A trust-verified opportunity platform — designed from the ground up for Ghana's skilled workforce and the global employers who need them.</p>
          </div>
          <div className="body-pad" style={{background:C.paperDark}}>
            <p>BRIDGE Connect is a digital platform that sits at the intersection of three relationships: the skilled Ghanaian worker seeking legitimate opportunity, the verified global employer or opportunity provider seeking talent, and BRIDGE PBC as the trusted intermediary that makes both relationships safe and productive. The platform is accessible via web and mobile, optimised for Ghana's connectivity realities, and free at the point of access for all Ghanaian users. Opportunity providers — employers, recruiters, training partners — pay to be listed. This fee structure is not incidental; it is a deliberate alignment of incentives. BRIDGE's revenue depends on attracting and retaining quality opportunity providers, which requires maintaining strict verification standards. Commercial interest and user protection point in the same direction.</p>
            <H3>The three-step user journey</H3>
            <p><strong>Step 1 — Profile.</strong> The user builds a structured profile through a guided builder that maps their skills, education, experience, certifications, work preferences, time availability, income expectations, and aspirations to BRIDGE's opportunity taxonomy. Completing the profile produces both a match-ready data record and a formatted professional CV to international standards — a tangible deliverable even before any application is made.</p>
            <p><strong>Step 2 — Match.</strong> The matching engine returns a personalised set of verified opportunities across all three pathways, ranked by fit score against the user's actual profile. Every opportunity displays a verified badge, a BRIDGE trust rating, and full transparent detail: employer name, compensation range, requirements, applicable bilateral agreements for international roles, and last verification date. No hidden fees. No unlabelled brokers. No "contact us for details."</p>
            <p><strong>Step 3 — Advance.</strong> The user applies through the platform with profile data pre-populated. BRIDGE tracks application status throughout. For shortlisted candidates, the platform provides preparation support: interview guidance, plain-language contract review for international placements, and salary benchmarking against verified market data. Post-placement outcome data is collected — both to strengthen future matching and to identify users who are ready for the next advancement opportunity.</p>
          </div>
        </div>

        {/* ── FIVE CORE CAPABILITIES ────────────────────────────────────────── */}
        <div id="features" style={{background:C.paper}}>
          <div className="body-pad">
            <Eyebrow>Platform Capabilities</Eyebrow>
            <Rule/>
            <H2>Five capabilities that change<br/>what a Ghanaian job seeker<br/>can access and trust.</H2>
            <p>The design brief for BRIDGE Connect was specific: what would need to be true for a first-generation graduate in Kumasi — with real skills but no international network, no existing portfolio, no experience navigating global hiring systems — to safely access the same opportunities that a well-connected Accra professional currently reaches through informal means? Every capability below addresses a specific failure point in that journey as it currently exists.</p>

            {[
              ['01','Verified Opportunity Catalogue',
                'Every listing is manually vetted before publication. Employers submit documentation. International recruiters provide MELR licensing credentials and bilateral agreement evidence. Training providers demonstrate completion rates and learner outcomes. The catalogue is deliberately smaller than an unscreened job board — and entirely trustworthy. A user who sees a listing on BRIDGE Connect has already cleared the first and most important filter: it is real.'],
              ['02','AI-Powered Skill Matching',
                'The matching engine applies BRIDGE\'s Ghana-specific sector intelligence — the same intelligence base that powers the BRIDGE Impact Score™ Assessor — to rank opportunities by genuine fit, not keyword overlap. A nurse with three years of experience in Tamale sees different opportunities from a newly qualified nurse in Accra. A software developer with Python skills and no portfolio sees a different pathway from one with client history on Upwork. The match is specific because the intelligence behind it is specific.'],
              ['03','Red Flag Alert System',
                'The platform actively surfaces warning signs in real time: requests for upfront fees, unverifiable employer details, compensation figures that deviate implausibly from verified benchmarks, requests for documents before a formal offer has been extended. Alerts are plain-language, integrated into the application flow, and visible without the user having to search for them. The system is not a disclaimer buried in terms and conditions. It is an active protective layer at every decision point.'],
              ['04','Contract and Offer Review',
                'For all international employment opportunities, BRIDGE provides a plain-language contract review service. A user who receives an offer from a verified employer submits the contract and receives a structured review identifying any terms that deviate from Ghana\'s National Labour Migration Policy protections, standard bilateral agreement provisions, or BRIDGE\'s benchmarked fair-terms database. Legal sophistication is not required from the user. BRIDGE\'s review makes the complex transparent.'],
              ['05','Upskilling Pathway Planner',
                'Users who do not yet meet the requirements for their target opportunities do not hit a wall — they receive a roadmap. The Pathway Planner identifies the specific certifications, courses, or experience gaps between a user\'s current profile and their target role, with verified training partners at each stage and a realistic timeline. Pathways are demand-driven: built from actual employer requirements posted on the platform, not assumptions about what skills are generally useful. A user who completes a pathway re-enters the matching engine at a higher qualification level with a measurably improved set of matched opportunities.'],
            ].map(([n,title,desc])=>(
              <div className="feature-row" key={n}>
                <div className="feature-icon">{n}</div>
                <div className="feature-body">
                  <div className="feature-title">{title}</div>
                  <p className="feature-desc">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── THREE PATHWAYS ─────────────────────────────────────────────────── */}
        <div id="pathways">
          <div className="section-cover">
            <div className="section-cover-num">05</div>
            <div className="section-eyebrow">Opportunity Architecture</div>
            <h2 className="section-h">Three pathways.<br/>One direction: forward.</h2>
            <p className="section-sub">BRIDGE Connect serves users wherever they are in their career journey — not just the fully prepared and already-connected, but the skilled-and-unconnected majority who make up most of Ghana's workforce.</p>
          </div>
          <div className="body-pad" style={{background:C.paperDark}}>
            <H3>Pathway 1 — Remote & Digital Work</H3>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'16px'}}>
              {['Software Development','Data & Analytics','Digital Marketing','Customer Experience','Design & Creative','Finance & Accounting','Content & Writing','Virtual Assistance'].map(d=><span className="pill pill-lime" key={d}>{d}</span>)}
            </div>
            <p>Remote and digital work is the largest and most immediately accessible opportunity category for Ghana's skilled workforce. The global market is already open. The question is whether Ghanaian talent has a structured, trusted entry point into it. Currently, most do not — access is informal, dependent on knowing the right person, or filtered through global platforms that assume the kind of existing portfolio and payment infrastructure that most Ghanaian job seekers have not yet had the opportunity to build.</p>
            <p>BRIDGE Connect aggregates verified remote and freelance opportunities from screened global employers and matches them to Ghanaian talent with a structured application process that works for users without existing international profiles. For employers, the platform addresses a genuine sourcing challenge: finding reliable, English-proficient, vetted talent in an African market where quality signals are hard to read without local knowledge. BRIDGE's intelligence infrastructure provides those quality signals. For users, the benefit is unambiguous: international earnings, at home, without the cost or risk of physical relocation.</p>

            <div style={{borderTop:`1px solid ${C.border}`,margin:'32px 0'}}/>
            <H3>Pathway 2 — Ethical International Employment</H3>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'16px'}}>
              {['Healthcare','Hospitality & Tourism','Construction & Trades','Agriculture','Manufacturing','Logistics & Transport','Professional Services','Domestic & Eldercare'].map(d=><span className="pill pill-dark" key={d}>{d}</span>)}
            </div>
            <p>A legitimate, regulated international employment market for Ghanaian workers already exists. The United Kingdom, Canada, Germany, and select Gulf states under appropriate bilateral frameworks all have established legal pathways for Ghanaian workers in specific sectors. The National Labour Migration Policy provides the regulatory framework. Bilateral labour agreements provide the worker protections. What has been missing is a trusted, accessible intermediary that makes these pathways navigable for ordinary job seekers — and that actively filters out the fraudulent actors who currently operate in the same space.</p>
            <p>BRIDGE Connect works exclusively with recruitment partners that are MELR-registered, operating under bilateral labour agreements, charging no worker-paid fees, and holding documented track records of successful, protected placements. Every international listing displays the recruiter's license number, the applicable bilateral agreement, the destination country's worker protection framework, and BRIDGE's independently maintained trust rating. This pathway is not a migration facilitation service. It is a legitimacy filter — one that makes the genuine international employment market accessible to the people it was designed to serve.</p>

            <div style={{borderTop:`1px solid ${C.border}`,margin:'32px 0'}}/>
            <H3>Pathway 3 — Upskilling & Advancement</H3>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'16px'}}>
              {['Tech Bootcamps','Professional Certifications','Language Training','Financial Literacy','Digital Skills','Healthcare Specialisations','Trade Qualifications','Entrepreneurship'].map(d=><span className="pill pill-amber" key={d}>{d}</span>)}
            </div>
            <p>The upskilling pathway is not a consolation prize for users who don't yet qualify for their target roles. It is a strategic pillar — and the one that most directly addresses the long-term talent development challenge Ghana faces. A platform that only matches today's qualified workers to today's available roles is a transaction engine. A platform that advances workers from their current capability to higher-value positions is a development infrastructure. BRIDGE Connect is designed to be the latter.</p>
            <p>BRIDGE's positioning here is uniquely credible. The same sector intelligence that identifies where Ghana's skill supply concentrates also identifies the specific gaps between what the domestic education system currently produces and what global employers are actively hiring for. The Upskilling Pathway Planner is built directly from this gap analysis — not from generic skills taxonomies, but from actual employer requirements posted on the platform. BRIDGE's diaspora network provides mentors who have already navigated the transitions users are attempting. TVET institution partnerships, international certification bodies, and coding bootcamps provide the verified training delivery. Completers re-enter the matching engine with improved profiles and materially better matches. The pathway closes — and when it does, BRIDGE has produced not just a placement but a career trajectory.</p>
            <p>This is also where BRIDGE's mission and its commercial model align most completely. Every user who advances through a pathway becomes a stronger candidate for higher-value opportunities on the platform. Higher-value opportunities attract higher-quality employers willing to pay more for listing access. The advancement of Ghanaian workers is simultaneously the mission outcome and the platform's primary growth engine.</p>
          </div>
        </div>

        {/* ── COMPETITIVE LANDSCAPE ─────────────────────────────────────────── */}
        <div id="landscape" style={{background:C.paper}}>
          <div className="body-pad">
            <Eyebrow>Competitive Landscape</Eyebrow>
            <Rule/>
            <H2>What exists. What it does not do.<br/>Where BRIDGE Connect stands.</H2>
            <p>The Ghana talent marketplace is not empty. Several categories of actor operate in overlapping spaces — each with genuine strengths and significant gaps. Understanding precisely what each does and does not provide makes BRIDGE Connect's differentiation concrete rather than claimed.</p>

            <div className="comp-table-wrap">
              {/* Desktop rows */}
              <div className="comp-row">
                {['Platform / Actor','Ghana Context','Verification','Free to User','Advancement','Upskilling Path'].map((h,j)=>(
                  <div key={j} className="comp-cell hdr">{h}</div>
                ))}
              </div>
              {[
                {cells:['Upwork / Fiverr','Generic global — not Ghana-specific','Employer not screened','No (commission fees)','Self-directed','None'],hl:false},
                {cells:['LinkedIn Jobs','Generic — no Ghana market intelligence','Employer not screened','Limited','Self-directed','Courses (paid)'],hl:false},
                {cells:['Local recruitment agencies','Ghana-present but inconsistent quality','Self-regulated; fraud risk high','No (candidate fees common)','Placement only','None'],hl:false},
                {cells:['International recruiters','High-end professional only; inaccessible to most','Variable','No (fees common)','Placement only','None'],hl:false},
                {cells:['BRIDGE Connect','Ghana-first, sector-intelligent','MELR registry + BRIDGE verification','Yes — always','Placement + advancement loop','Demand-driven pathway planner'],hl:true},
              ].map((row,i)=>(
                <div key={i} className={`comp-row mob-comp-card${row.hl?' hl-card':''}`}>
                  {row.cells.map((c,j)=>(
                    <div key={j} className={`comp-cell${row.hl?' hl':''}${j===0?' hdr-col':' dim'}`}>
                      {j===0?<strong>{c}</strong>:c}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <H3>The specific gaps BRIDGE Connect fills</H3>
            <p><strong>Upwork and Fiverr</strong> serve the already-connected. They require existing portfolios, experience with international payment systems, self-marketing capability, and the digital literacy to navigate competitive global bidding. They are valuable for experienced freelancers and largely inaccessible to the talented majority who haven't yet built that track record. They also take commission fees from worker earnings — a structural conflict of interest with user welfare that BRIDGE Connect's employer-funded model avoids entirely.</p>
            <p><strong>LinkedIn</strong> is the world's largest professional network, but it is not a Ghana-intelligence platform. It cannot tell you that a software developer in Kumasi with two years of Django experience is in the 80th percentile of matchable candidates for a specific German remote employer's current opening. BRIDGE Connect can, because its matching engine is built on BRIDGE's Ghana-specific sector intelligence rather than generic keyword search.</p>
            <p><strong>Local recruitment agencies</strong> range from excellent to predatory, with no reliable signal to distinguish them at the point of first contact. The MELR registry exists but is not surfaced in any accessible consumer-facing way. BRIDGE Connect makes registry compliance the non-negotiable baseline — not a differentiator but a precondition for listing. Users do not need to research whether an agency is licensed. The platform has already done that work.</p>
          </div>
        </div>

        {/* ── TRUST ARCHITECTURE ─────────────────────────────────────────────── */}
        <div id="trust">
          <div className="section-cover">
            <div className="section-cover-num">06</div>
            <div className="section-eyebrow">Trust Infrastructure</div>
            <h2 className="section-h">Verification is not a feature.<br/>It is the product.</h2>
            <p className="section-sub">In a market where fraudulent agencies use the same language and visual design as legitimate ones, the only meaningful differentiator is a verification system that is independently credible and visibly enforced.</p>
          </div>
          <div className="body-pad" style={{background:C.paperDark}}>
            <p>Trust architecture in BRIDGE Connect operates across four levels — each visible to users, each maintained by BRIDGE's operations team, and each tied to concrete accountability mechanisms that survive changes in personnel or commercial pressure. The system is structural, not discretionary.</p>
            <table className="tier-tbl mob-hide">
              <thead><tr><th>Level</th><th>What is verified</th><th>Method</th><th>User-visible signal</th></tr></thead>
              <tbody>
                {[
                  ['Employer Registration','Legal incorporation, business registration, employment track record, no fee-charging history','Document review + GIPC / MELR registry check + direct employer confirmation','Verified badge + registration number + last verification date'],
                  ['Recruiter Licensing','MELR registration, bilateral agreement compliance, worker-fee history, placement outcome record','MELR registry match + user complaint history + outcome database','License number + bilateral agreement flag + BRIDGE trust rating'],
                  ['Opportunity Authenticity','Live role (not expired listing), accurate compensation range, real hiring company, no upfront fee requirement','Direct employer confirmation + periodic re-verification at 30-day intervals','Last verified date + compensation range + BRIDGE rating'],
                  ['Training Provider Quality','Learner completion rates, post-completion employment outcomes, certification validity, full cost transparency','Partner assessment + cohort outcome tracking + learner feedback aggregation','Outcome score + completion rate + certification partner logos'],
                ].map(([lvl,what,method,signal])=>(
                  <tr key={lvl}><td>{lvl}</td><td>{what}</td><td>{method}</td><td>{signal}</td></tr>
                ))}
              </tbody>
            </table>
            <div className="mob-card-stack mob-show">
              {[
                ['Employer Registration','What','Legal incorporation, business registration, employment track record, no fee-charging history','How','Document review + GIPC / MELR registry check','Signal','Verified badge + registration number + last verified date'],
                ['Recruiter Licensing','What','MELR registration, bilateral agreement compliance, worker-fee history','How','MELR registry match + complaint history + outcome database','Signal','License number + bilateral agreement flag + BRIDGE rating'],
                ['Opportunity Authenticity','What','Live role, accurate compensation, no upfront fee requirement','How','Direct employer confirmation + 30-day re-verification','Signal','Last verified date + compensation range + BRIDGE rating'],
                ['Training Provider Quality','What','Completion rates, post-completion outcomes, certification validity','How','Partner assessment + cohort outcome tracking','Signal','Outcome score + completion rate + certification logos'],
              ].map(([title,...pairs])=>(
                <div className="mob-card" key={title}>
                  <div className="mob-card-title">{title}</div>
                  {pairs.reduce((acc,_,i)=>i%2===0?[...acc,[pairs[i],pairs[i+1]]]:acc,[]).map(([k,v])=>(
                    <div className="mob-card-row" key={k}>
                      <span className="mob-card-key">{k}</span>
                      <span className="mob-card-val">{v}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <H3>The government registry anchor</H3>
            <p>BRIDGE's direct relationship with the Ministry of Employment and Labour Relations provides the verification system's most important structural element: live access to the official registry of licensed recruitment agencies. BRIDGE Connect lists only recruiters who appear on that registry. Any recruiter removed from the registry is immediately removed from the platform. This is not a process that depends on user complaints or periodic audits — it is a live, government-backed filter that operates continuously and cannot be overridden by commercial considerations.</p>
            <H3>The complaint and accountability system</H3>
            <p>Trust is not maintained by screening alone — it is maintained by how the platform responds when something goes wrong. Any user who experiences a problem with a listed opportunity, employer, or recruiter files a structured complaint that triggers a mandatory review. Substantiated complaints result in immediate delisting. Patterns of complaints — even unsubstantiated individually — trigger escalation to MELR notification and enhanced monitoring. Users who encounter fraud or exploitation through a platform listing receive priority support and direct referral to legal and government assistance resources, even if the fraud was not detectable at the time of verification.</p>
            <PQ>Every user who opens BRIDGE Connect needs to know, before they look at a single listing, that what they are about to see has been checked by people who care whether it is real — and who will be accountable if it is not.</PQ>
          </div>
        </div>

        {/* ── PROJECTED IMPACT ───────────────────────────────────────────────── */}
        <div id="impact" style={{background:C.paper}}>
          <div className="body-pad">
            <Eyebrow>Impact Framework</Eyebrow>
            <Rule/>
            <H2>What success looks like<br/>for Ghanaian citizens,<br/>households, and communities.</H2>
            <p>BRIDGE measures success not by platform metrics but by Peace & Prosperity outcomes: individual dignity, family security, community cohesion, and intergenerational possibility. The impact framework below maps each outcome dimension to BRIDGE Connect's specific mechanisms.</p>
            <table className="tier-tbl mob-hide">
              <thead><tr><th>P&P Dimension</th><th>The problem addressed</th><th>How BRIDGE Connect addresses it</th><th>Measurement signal</th></tr></thead>
              <tbody>
                {[
                  ['Individual Dignity','Job seekers are preyed upon by fraudulent agencies and have no trustworthy alternative','Verified catalogue at zero cost; no fee extraction; transparent terms','Predatory agency fees avoided per user ($1,500–$5,000 avg)'],
                  ['Family Security','Household savings lost to fraudulent placements; families destabilised by risky migration','Zero-cost access preserves savings; verified placements reduce migration risk','Savings retained; income gains from verified placements'],
                  ['Community Cohesion','Talent departs permanently with no structured connection maintained to home communities','Remote work keeps talent in Ghana; circulation pathways maintain active connection','% of users in remote roles remaining resident in Ghana'],
                  ['Intergenerational Possibility','Skills gaps compound across generations; no durable advancement infrastructure','Upskilling pathways create competency gains beyond single placements','Pathway completers advancing to higher-value roles within 12 months'],
                ].map(([dim,prob,how,signal])=>(
                  <tr key={dim}><td>{dim}</td><td>{prob}</td><td>{how}</td><td>{signal}</td></tr>
                ))}
              </tbody>
            </table>
            <div className="mob-card-stack mob-show">
              {[
                ['Individual Dignity','Problem','Job seekers preyed upon by fraudulent agencies with no trustworthy alternative','Solution','Verified catalogue at zero cost; no fee extraction; transparent terms','Signal','Predatory fees avoided per user ($1,500–$5,000 avg)'],
                ['Family Security','Problem','Household savings lost to fraudulent placements; families destabilised by risky migration','Solution','Zero-cost access preserves savings; verified placements reduce migration risk','Signal','Savings retained + income gains from verified placements'],
                ['Community Cohesion','Problem','Talent departs permanently with no structured connection maintained to home communities','Solution','Remote work keeps talent in Ghana; circulation pathways maintain active connection','Signal','% of users in remote roles remaining resident in Ghana'],
                ['Intergenerational Possibility','Problem','Skills gaps compound across generations; no durable advancement infrastructure','Solution','Upskilling pathways create competency gains beyond single placements','Signal','Pathway completers in higher-value roles within 12 months'],
              ].map(([title,...pairs])=>(
                <div className="mob-card" key={title}>
                  <div className="mob-card-title">{title}</div>
                  {pairs.reduce((acc,_,i)=>i%2===0?[...acc,[pairs[i],pairs[i+1]]]:acc,[]).map(([k,v])=>(
                    <div className="mob-card-row" key={k}>
                      <span className="mob-card-key">{k}</span>
                      <span className="mob-card-val">{v}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <H3>Quantified projections</H3>
            <div className="data-grid" style={{marginTop:'24px'}}>
              <DataCard n="10,000" label="Year 1 target: user profiles created in first 90 days of launch" source="BRIDGE Projection"/>
              <DataCard n="2,000" label="Year 1 target: verified opportunity placements across all three pathways" source="BRIDGE Projection"/>
              <DataCard n="50,000" label="Year 3 target: active users; 15,000 annual placements" source="BRIDGE Projection"/>
              <DataCard n="$75M+" label="Annual financial harm to Ghanaian households from fraudulent agencies — the market BRIDGE Connect directly displaces" source="BRIDGE Research Estimate"/>
            </div>
            <p style={{marginTop:'8px'}}>The counterfactual against which BRIDGE Connect should be assessed is not an ideal domestic opportunity landscape — it is the predator economy that currently fills this gap. A user who accesses a verified remote role instead of paying a fraudulent agency retains $1,500–$5,000 in household savings while gaining real, durable income. The platform's impact is the sum of those individual stories, at scale.</p>
          </div>
        </div>

        {/* ── REVENUE MODEL ──────────────────────────────────────────────────── */}
        <div id="revenue" style={{background:C.paperDark}}>
          <div className="body-pad">
            <Eyebrow>Business Model</Eyebrow>
            <Rule/>
            <H2>Revenue from opportunity providers.<br/>Never from users.</H2>
            <p>The monetisation structure of BRIDGE Connect is inseparable from its mission structure. BRIDGE PBC's Public Benefit Corporation obligations make charging Ghanaian users for access to opportunity structurally impermissible — it would directly contradict the platform's stated purpose. All revenue is generated from the opportunity provider side: the employers, recruiters, and training partners who gain access to BRIDGE's verified, matched talent pool.</p>
            <table className="tier-tbl mob-hide">
              <thead><tr><th>Revenue Stream</th><th>Source</th><th>Pricing Structure</th><th>Year 1 Target</th></tr></thead>
              <tbody>
                {[
                  ['Employer Listing','Verified employers listing remote and hybrid roles on the platform','$200–500 per active listing / month','$60,000–150,000'],
                  ['Recruiter Partner Access','Licensed international recruitment agencies; premium matching and direct candidate introductions','$500–2,000 / month subscription','$30,000–120,000'],
                  ['Training Provider Revenue Share','Upskilling pathway partners, certification bodies, bootcamps referred by BRIDGE Connect','10–15% of program fees from BRIDGE-referred learners','$20,000–60,000'],
                  ['Institutional Data Intelligence','Government agencies, development partners, research organisations purchasing Ghana talent market data','Custom: $10,000–50,000 / year','$10,000–50,000'],
                  ['BRIDGE Member Concierge','BRIDGE platform members accessing premium preparation: contract review, interview coaching, salary benchmarking','$49–149 per engagement','$10,000–30,000'],
                ].map(([rs,src,pr,y1])=>(
                  <tr key={rs}><td>{rs}</td><td>{src}</td><td>{pr}</td><td>{y1}</td></tr>
                ))}
              </tbody>
            </table>
            <div className="mob-card-stack mob-show">
              {[
                ['Employer Listing','Source','Verified employers listing remote and hybrid roles','Pricing','$200–500 per active listing / month','Y1 Target','$60,000–150,000'],
                ['Recruiter Partner Access','Source','Licensed international recruitment agencies','Pricing','$500–2,000 / month subscription','Y1 Target','$30,000–120,000'],
                ['Training Revenue Share','Source','Upskilling pathway partners and bootcamps','Pricing','10–15% of program fees (BRIDGE-referred)','Y1 Target','$20,000–60,000'],
                ['Institutional Data','Source','Government agencies, DFIs, research organisations','Pricing','Custom: $10,000–50,000 / year','Y1 Target','$10,000–50,000'],
                ['Member Concierge','Source','BRIDGE members: contract review, interview coaching','Pricing','$49–149 per engagement','Y1 Target','$10,000–30,000'],
              ].map(([title,...pairs])=>(
                <div className="mob-card" key={title}>
                  <div className="mob-card-title">{title}</div>
                  {pairs.reduce((acc,_,i)=>i%2===0?[...acc,[pairs[i],pairs[i+1]]]:acc,[]).map(([k,v])=>(
                    <div className="mob-card-row" key={k}>
                      <span className="mob-card-key">{k}</span>
                      <span className="mob-card-val">{v}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <H3>Projections</H3>
            <table className="tier-tbl mob-hide">
              <thead><tr><th>Metric</th><th>Conservative</th><th>Moderate</th><th>Optimistic</th></tr></thead>
              <tbody>
                {[
                  ['Active user profiles (Y1)','10,000','25,000','50,000'],
                  ['Verified placements (Y1)','2,000','5,000','12,000'],
                  ['Employer partners (Y1)','50','150','400'],
                  ['Recruiter partners (Y1)','10','30','75'],
                  ['Total Year 1 Revenue','$130,000','$360,000','$410,000'],
                  ['Total Year 3 Revenue','$800,000','$2,100,000','$4,500,000'],
                ].map(([m,c,mo,o])=>(
                  <tr key={m}><td>{m}</td><td>{c}</td><td>{mo}</td><td>{o}</td></tr>
                ))}
              </tbody>
            </table>
            <div className="mob-card-stack mob-show">
              {[
                ['User Profiles (Y1)','Conservative','10,000','Moderate','25,000','Optimistic','50,000'],
                ['Verified Placements (Y1)','Conservative','2,000','Moderate','5,000','Optimistic','12,000'],
                ['Employer Partners (Y1)','Conservative','50','Moderate','150','Optimistic','400'],
                ['Total Year 1 Revenue','Conservative','$130,000','Moderate','$360,000','Optimistic','$410,000'],
                ['Total Year 3 Revenue','Conservative','$800,000','Moderate','$2,100,000','Optimistic','$4,500,000'],
              ].map(([title,...pairs],idx)=>(
                <div className={`mob-card${idx>=3?' hl':''}`} key={title}>
                  <div className="mob-card-title">{title}</div>
                  {pairs.reduce((acc,_,i)=>i%2===0?[...acc,[pairs[i],pairs[i+1]]]:acc,[]).map(([k,v])=>(
                    <div className="mob-card-row" key={k}>
                      <span className="mob-card-key">{k}</span>
                      <span className="mob-card-val">{v}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p>At moderate Year 3 projections — $2.1M annually — BRIDGE Connect is financially self-sustaining, contributes to BRIDGE PBC's overhead, and generates surplus for reinvestment in user services. The institutional data intelligence stream becomes increasingly significant as the talent dataset matures: aggregated, anonymised insight into Ghana's workforce composition, skill concentrations, employer demand patterns, and placement outcomes is a product that development finance institutions, government ministries, and international research organisations will pay substantial fees to access. That value compounds with every profile created and every placement completed.</p>
          </div>
        </div>

        {/* ── ROADMAP ────────────────────────────────────────────────────────── */}
        <div id="roadmap" style={{background:C.paper}}>
          <div className="body-pad">
            <Eyebrow>Implementation Roadmap</Eyebrow>
            <Rule/>
            <H2>A realistic three-phase build.<br/>Eighteen months to full platform.</H2>
            <p>The roadmap below distributes development across three phases — not because the ambition is modest, but because sustainable platform quality requires it. Launching all three pathways simultaneously risks compromising the verification infrastructure that is the platform's core value proposition. Phase 1 launches what can be done rigorously. Phases 2 and 3 build on proven foundations.</p>

            <div style={{marginTop:'32px'}}>
              <div className="phase-block">
                <span className="phase-label">Phase 1 · Q2–Q3 2026 · Foundation</span>
                <div className="phase-title">Remote Work Pathway Launch + Core Infrastructure</div>
                <p style={{margin:0,fontFamily:F.body,fontSize:'15px',lineHeight:1.8,color:C.ink,fontWeight:300}}>The platform launches with the Remote Work pathway only — a deliberate scope constraint that allows verification infrastructure to be built and proven before international employment complexity is added. Core deliverables: user profile builder, verified remote-work opportunity catalogue (50 screened employers at launch), AI-powered matching engine, red flag alert system, and SMS/email application tracking. Government partnership with MELR formalised and registry API access secured. Target: 5,000 user profiles in 60 days; 500 verified placements in first quarter. Media and community launch through BRIDGE's existing diaspora network, positioning the platform explicitly as the verified alternative to predatory agencies.</p>
              </div>
              <div className="phase-block">
                <span className="phase-label">Phase 2 · Q4 2026–Q1 2027 · Ethical International Employment</span>
                <div className="phase-title">International Pathway + Upskilling Planner Launch</div>
                <p style={{margin:0,fontFamily:F.body,fontSize:'15px',lineHeight:1.8,color:C.ink,fontWeight:300}}>International employment pathway launches with the full recruiter verification stack — MELR registry integration live, bilateral agreement display, contract review service operational. Upskilling Pathway Planner launches with 10 priority skill transitions and 3–5 verified training provider partnerships. Diaspora Mentor Connect activates BRIDGE's network as the founding mentor cohort. Salary benchmarking tool and post-placement outcome tracking go live. First institutional data intelligence report published — establishing BRIDGE Connect as a primary source for Ghana talent market intelligence. Cross-application lead attribution links users who have also engaged with the BRIDGE Impact Score™ Assessor, creating a unified relationship record.</p>
              </div>
              <div className="phase-block">
                <span className="phase-label">Phase 3 · Q2–Q3 2027 · Scale and Depth</span>
                <div className="phase-title">Mobile Optimisation + Regional Expansion + API Layer</div>
                <p style={{margin:0,fontFamily:F.body,fontSize:'15px',lineHeight:1.8,color:C.ink,fontWeight:300}}>Offline-capable mobile redesign for Ghana's connectivity realities — core features functional at low bandwidth, SMS fallback for application updates. Active outreach to Kumasi, Tamale, Cape Coast, and secondary cities where talent supply is strong and platform awareness is low. First cohort of Upskilling Pathway completers tracked through re-matching — demonstrating the advancement loop with published outcome data. API layer for institutional partners goes live. First annual Ghana Talent Opportunity Report published, drawing on 12 months of aggregated placement and profile data. At this stage, the platform has enough longitudinal data to begin publishing the kind of workforce intelligence that commands institutional pricing.</p>
              </div>
            </div>

            <H3>Technology foundation</H3>
            <p>The frontend is React/JSX — fully consistent with BRIDGE's existing platform architecture, reducing build time and ensuring design system continuity. The backend requires a PostgreSQL database (user profiles, opportunity listings, matching data, outcome tracking); a matching algorithm operating on BRIDGE's Ghana sector intelligence taxonomy; Stripe for employer/recruiter payment processing; a notification layer (email + SMS) for application updates and alerts; and PDF generation for contract review outputs. BRIDGE's existing Claude API integration from the Impact Score Assessor extends naturally to BRIDGE Connect's matching and red flag detection features. The foundation is substantially already built — BRIDGE Connect is an extension of an existing platform, not a greenfield build.</p>
          </div>
        </div>

        {/* ── FOR INVESTORS ──────────────────────────────────────────────────── */}
        <div id="investor" style={{background:C.paperDark}}>
          <div className="body-pad">
            <Eyebrow>For Investors</Eyebrow>
            <Rule/>
            <H2>The investment case for<br/>BRIDGE Connect.</H2>
            <p>BRIDGE Connect is not a social programme that requires subsidy to operate. It is a commercially viable platform with a defensible market position, a revenue model that structurally aligns commercial and mission incentives, and a data asset that compounds in value with every user interaction. The case for investment rests on five specific pillars.</p>
            <H3>The market is enormous and structurally underserved</H3>
            <p>Africa's freelance tech market alone grows from $7.3 billion to $37.7 billion by 2034. Ghana's potential remote workforce is projected at 25% of the labour force by 2030. The ethical international employment market for Ghanaian workers expands under bilateral labour agreements that are already in place. The upskilling market grows as employers globally shift to skills-based hiring. BRIDGE Connect addresses all three of these expanding markets through a single trusted platform — a position that no competitor currently holds for Ghana's mass workforce market. That is not a temporary first-mover advantage. It is a position that becomes more defensible with each passing month of data accumulation.</p>
            <H3>The data moat is structural and compounding</H3>
            <p>Every user profile, every application, every placement outcome, every employer rating deposits structured data into a Ghana talent intelligence dataset that has no existing equivalent. After 50,000 user profiles, BRIDGE possesses a real-time view of Ghana's skilled workforce — its geographic distribution, skill concentrations, employer demand signals, and career trajectory patterns — that government agencies, development finance institutions, and international research organisations will pay significant institutional fees to access. That dataset cannot be replicated by a later entrant without years of user accumulation. BRIDGE builds it from day one, funded by employer listing fees.</p>
            <H3>Mission and commercial incentives align completely</H3>
            <p>The predator economy that BRIDGE Connect displaces is its direct commercial competitor. Every Ghanaian job seeker who pays a fraudulent agency instead of using BRIDGE Connect is simultaneously a mission failure and a revenue loss. This creates unusual commercial urgency around mission outcomes — BRIDGE's revenue grows precisely as harmful extraction from Ghanaian households shrinks. The interests of investors, beneficiaries, and BRIDGE's team all point in the same direction. That alignment is rare. It is also durable — it is structural rather than dependent on management intentions.</p>
            <H3>Government partnership is a durable competitive moat</H3>
            <p>Direct MELR registry access is not available to a startup entering this space tomorrow. Building the institutional relationships required to obtain it takes years. BRIDGE's existing position — as a PBC with established government engagement across multiple sectors — means that BRIDGE Connect launches with a verification foundation that a well-capitalised competitor could not replicate in less than two to three years. By the time a competitor built equivalent trust with MELR, BRIDGE Connect would have 18 months of placement data, thousands of employer relationships, and a talent dataset no one else holds.</p>
            <H3>The platform builds BRIDGE PBC's broader investment pipeline</H3>
            <p>The highest-performing users on BRIDGE Connect — particularly those on the Upskilling Pathway who demonstrate ambition, capability growth, and market fit — are prospective portfolio companies and investable founders for BRIDGE's investment operation. The platform identifies them, builds a relationship through the placement journey, and surfaces them to BRIDGE's pipeline at the moment they are most ready for structured support. BRIDGE Connect does not just generate platform revenue. It generates deal flow intelligence for BRIDGE's core investment operation — at zero marginal sourcing cost.</p>
          </div>
        </div>

        {/* ── CLOSING ────────────────────────────────────────────────────────── */}
        <div id="close">
          <div className="section-cover" style={{minHeight:'60vh',display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <div className="section-cover-num">07</div>
            <div className="section-eyebrow">Closing Argument</div>
            <h2 className="section-h" style={{maxWidth:'700px'}}>The talent is real.<br/>The opportunity is real.<br/>The only missing thing is the bridge.</h2>
            <p className="section-sub" style={{marginBottom:'32px'}}>Every day the infrastructure gap remains open, Ghanaians make decisions they should not have to make. They pay fraudulent agencies. They attempt dangerous journeys. They sell their inheritance for a promise that turns out to be a lie. The predator economy does not cause this — it services the desperation that a broken opportunity infrastructure produces. BRIDGE Connect addresses that desperation at the source: by making legitimate, verified, accessible opportunity visible to every skilled Ghanaian with a phone and an ambition. That is the intervention. That is the bridge. And there is no good reason it does not already exist.</p>
            <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
              <a href="https://bridgepbc.com" className="cta-btn">Explore bridgepbc.com →</a>
              <a href="https://bridgepbc.com/connect" className="cta-btn-sec">Learn about BRIDGE Connect</a>
            </div>
          </div>
        </div>

        {/* ── CTA ────────────────────────────────────────────────────────────── */}
        <div className="cta-section">
          <div style={{maxWidth:'860px',padding:'0 4px'}}>
            <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:800,letterSpacing:'3px',textTransform:'uppercase',color:C.lime,marginBottom:'14px'}}>BRIDGE PBC · BRIDGE Connect Initiative · March 2026</div>
            <h2 style={{fontFamily:F.display,fontSize:'clamp(22px,3.5vw,36px)',fontWeight:700,color:C.white,lineHeight:1.2,marginBottom:'14px',fontStyle:'italic'}}>For partnership inquiries, employer listings, and investment conversations:</h2>
            <p style={{fontFamily:F.body,fontSize:'15px',color:'rgba(250,248,243,.55)',lineHeight:1.7,maxWidth:'560px',marginBottom:'0'}}>BRIDGE PBC is a Public Benefit Corporation advancing Peace & Prosperity for Ghanaian citizens, households, and communities. BRIDGE Connect is our human capital platform — matching Ghana's skilled workforce to verified global opportunities at zero cost to users, with every listing screened and every employer accountable.</p>
            <div style={{borderTop:'1px solid rgba(255,255,255,.1)',marginTop:'28px',paddingTop:'24px',display:'flex',gap:'32px',flexWrap:'wrap'}}>
              {[['bridgepbc.com','Website'],['hello@bridgepbc.com','General enquiries'],['talent@bridgepbc.com','BRIDGE Connect — talent'],['employers@bridgepbc.com','BRIDGE Connect — employers']].map(([v,l])=>(
                <div key={l}>
                  <div style={{fontFamily:F.mono,fontSize:'12px',fontWeight:500,color:C.lime}}>{v}</div>
                  <div style={{fontFamily:F.sans,fontSize:'9px',fontWeight:700,letterSpacing:'1.5px',textTransform:'uppercase',color:'rgba(250,248,243,.28)',marginTop:'3px'}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
        <div className="doc-footer np">
          <Logo height={16} variant="white"/>
          <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,.3)'}}>BRIDGE Connect Platform Whitepaper · Confidential · March 2026</span>
          <span style={{fontFamily:F.sans,fontSize:'10px',color:'rgba(250,248,243,.3)'}}>bridgepbc.com</span>
        </div>

      </div>
    </div>
  );
}
