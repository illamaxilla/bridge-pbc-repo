import React, { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// RENTGUARD GHANA — v4.1 PRODUCTION DEMO
// Ghana Rent Enforcement & Intelligence Platform
// Roles: National Admin · Case Manager · Taskforce Officer · Landlord · Tenant
// Legal basis: Act 220 (Rent Act 1963) · PNDCL 138 (Rent Control Law 1986)
// ─────────────────────────────────────────────────────────────────────────────

// ── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  bg:'#0B1210', surface:'#111916', surfaceL:'#162019',
  card:'#1A2820', cardHov:'#1F3025',
  border:'#243628', borderL:'#2E4435',
  green:'#0FA86A', greenD:'#0C8A55', greenFade:'rgba(15,168,106,0.12)',
  lime:'#C8E830', limeD:'#A0BA25', limeFade:'rgba(200,232,48,0.10)',
  t1:'#E8F0EB', t2:'#8FA898', t3:'#536358',
  red:'#E5483A', redFade:'rgba(229,72,58,0.12)',
  amber:'#E8900A', amberFade:'rgba(232,144,10,0.12)',
  blue:'#3B82F6', blueFade:'rgba(59,130,246,0.10)',
};
const F = {
  head:'"Syne","Space Grotesk",sans-serif',
  body:'"DM Sans","Helvetica Neue",sans-serif',
  mono:'"JetBrains Mono","Fira Mono",monospace',
};

// ── TOAST SYSTEM (module-level) ──────────────────────────────────────────────
let _toastFn = null;
const setGlobalToast = (fn) => { _toastFn = fn; };
const useToast = () => _toastFn || (() => {});

// ── CASE STATE (module-level store) ──────────────────────────────────────────
const _caseStatusOverrides = {};
const useCaseState = () => ({
  advanceCaseStatus: (caseId, newStatus) => { _caseStatusOverrides[caseId] = newStatus; },
  getStatus: (caseId, fallback) => _caseStatusOverrides[caseId] || fallback,
});

// ── GLOBAL CSS ───────────────────────────────────────────────────────────────
const GlobalCSS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=JetBrains+Mono:wght@300;400;500&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
    html{font-size:14px;}
    body{background:${T.bg};color:${T.t1};font-family:${F.body};-webkit-font-smoothing:antialiased;overflow:hidden;}
    ::-webkit-scrollbar{width:4px;height:4px;}
    ::-webkit-scrollbar-track{background:transparent;}
    ::-webkit-scrollbar-thumb{background:${T.border};border-radius:2px;}
    ::-webkit-scrollbar-thumb:hover{background:${T.borderL};}
    button{cursor:pointer;font-family:${F.body};}
    input,textarea,select{font-family:${F.body};}
    a{color:inherit;text-decoration:none;}
    .rg-app{display:flex;height:100vh;overflow:hidden;}
    .rg-sidebar{width:220px;flex-shrink:0;background:${T.surface};border-right:1px solid ${T.border};display:flex;flex-direction:column;overflow:hidden;}
    .rg-main{flex:1;display:flex;flex-direction:column;overflow:hidden;}
    .rg-topbar{height:52px;flex-shrink:0;background:${T.surface};border-bottom:1px solid ${T.border};display:flex;align-items:center;padding:0 24px;gap:12px;}
    .rg-content{flex:1;overflow-y:auto;padding:24px;}
    .rg-nav-item{display:flex;align-items:center;gap:10px;padding:8px 16px;margin:1px 8px;border-radius:6px;cursor:pointer;transition:all 0.15s;color:${T.t2};font-size:13px;font-weight:500;border:none;background:transparent;width:calc(100% - 16px);text-align:left;}
    .rg-nav-item:hover{background:${T.card};color:${T.t1};}
    .rg-nav-item.active{background:${T.greenFade};color:${T.green};}
    .rg-nav-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
    .rg-card{background:${T.card};border:1px solid ${T.border};border-radius:10px;}
    .rg-card-sm{background:${T.card};border:1px solid ${T.border};border-radius:8px;padding:16px;}
    .rg-btn{display:inline-flex;align-items:center;gap:7px;padding:8px 16px;border-radius:6px;font-size:12px;font-weight:600;border:none;cursor:pointer;transition:all 0.15s;letter-spacing:0.3px;}
    .rg-btn-primary{background:${T.green};color:#fff;}
    .rg-btn-primary:hover{background:${T.greenD};}
    .rg-btn-ghost{background:transparent;color:${T.t2};border:1px solid ${T.border};}
    .rg-btn-ghost:hover{background:${T.card};color:${T.t1};border-color:${T.borderL};}
    .rg-btn-danger{background:${T.redFade};color:${T.red};border:1px solid rgba(229,72,58,0.2);}
    .rg-btn-danger:hover{background:rgba(229,72,58,0.2);}
    .rg-btn-lime{background:${T.lime};color:${T.bg};}
    .rg-btn-lime:hover{background:${T.limeD};}
    .rg-badge{display:inline-flex;align-items:center;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;}
    .rg-badge-green{color:${T.green};}
    .rg-badge-red{color:${T.red};}
    .rg-badge-amber{color:${T.amber};}
    .rg-badge-blue{color:${T.blue};}
    .rg-badge-muted{color:${T.t3};}
    .rg-input{background:${T.surfaceL};border:1px solid ${T.border};border-radius:6px;padding:9px 12px;font-size:13px;color:${T.t1};outline:none;transition:border-color 0.15s;width:100%;}
    .rg-input:focus{border-color:${T.green};}
    .rg-input::placeholder{color:${T.t3};}
    .rg-textarea{background:${T.surfaceL};border:1px solid ${T.border};border-radius:6px;padding:10px 12px;font-size:13px;color:${T.t1};outline:none;transition:border-color 0.15s;width:100%;resize:vertical;}
    .rg-textarea:focus{border-color:${T.green};}
    .rg-select{width:100%;padding:8px 12px;background:${T.card};border:1px solid ${T.border};border-radius:6px;color:${T.t1};font-size:12px;outline:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23536358' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;cursor:pointer;}
    .rg-select:focus{border-color:${T.green};}
    .rg-select option{background:${T.surface};color:${T.t1};}
    .rg-table{width:100%;border-collapse:collapse;}
    .rg-table th{padding:10px 14px;text-align:left;font-size:10px;font-weight:700;color:${T.t3};letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid ${T.border};}
    .rg-table td{padding:12px 14px;font-size:13px;border-bottom:1px solid rgba(36,54,40,0.5);vertical-align:middle;}
    .rg-table tr:last-child td{border-bottom:none;}
    .rg-table tbody tr{transition:background 0.1s;}
    .rg-table tbody tr:hover{background:rgba(255,255,255,0.02);}
    .rg-table-clickable tbody tr{cursor:pointer;}
    .rg-table-clickable tbody tr:hover{background:${T.cardHov};}
    .rg-stat-val{font-family:${F.mono};font-size:28px;font-weight:500;line-height:1;}
    .rg-stat-label{font-size:11px;color:${T.t2};margin-top:4px;font-weight:500;}
    .rg-stat-change{font-family:${F.mono};font-size:10px;margin-top:4px;}
    .rg-progress{height:4px;background:${T.border};border-radius:2px;overflow:hidden;}
    .rg-progress-fill{height:100%;border-radius:2px;transition:width 0.6s ease;}
    .rg-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(4px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:24px;}
    .rg-modal{background:${T.surface};border:1px solid ${T.border};border-radius:12px;width:100%;max-width:520px;max-height:80vh;overflow-y:auto;}
    .rg-modal-header{padding:20px 24px 16px;border-bottom:1px solid ${T.border};display:flex;justify-content:space-between;align-items:center;}
    .rg-modal-body{padding:20px 24px 24px;}
    .rg-tabs{display:flex;gap:0;border-bottom:1px solid ${T.border};}
    .rg-tab{padding:10px 18px;font-size:12px;font-weight:600;color:${T.t2};border:none;background:transparent;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;transition:all 0.15s;letter-spacing:0.3px;}
    .rg-tab.active{color:${T.green};border-bottom-color:${T.green};}
    .rg-tab:hover:not(.active){color:${T.t1};}
    .rg-section-title{font-family:${F.head};font-size:11px;font-weight:700;color:${T.t3};letter-spacing:1.5px;text-transform:uppercase;margin-bottom:12px;}
    .rg-field{margin-bottom:16px;}
    .rg-field label{display:block;font-size:11px;font-weight:600;color:${T.t2};letter-spacing:0.5px;margin-bottom:6px;text-transform:uppercase;}
    .rg-checklist-row{display:flex;align-items:flex-start;gap:12px;padding:12px 0;border-bottom:1px solid rgba(36,54,40,0.4);}
    .rg-checklist-row:last-child{border-bottom:none;}
    .rg-toggle{width:36px;height:20px;border-radius:10px;cursor:pointer;transition:background 0.2s;position:relative;flex-shrink:0;margin-top:2px;border:none;}
    .rg-toggle-on{background:${T.green};}
    .rg-toggle-off{background:${T.red};}
    .rg-toggle-neutral{background:${T.border};}
    .rg-toggle-thumb{position:absolute;top:2px;width:16px;height:16px;border-radius:50%;background:#fff;transition:left 0.2s;}
    .rg-phone-frame{width:340px;height:680px;background:${T.surface};border:2px solid ${T.border};border-radius:36px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 32px 80px rgba(0,0,0,0.6),0 0 0 1px rgba(255,255,255,0.04);}
    .rg-phone-nav{height:60px;background:${T.bg};border-top:1px solid ${T.border};display:flex;flex-shrink:0;}
    .rg-phone-nav-btn{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;cursor:pointer;background:transparent;border:none;}
    .risk-bar{display:flex;align-items:center;gap:8px;}
    .risk-bar-track{flex:1;height:5px;background:${T.border};border-radius:3px;overflow:hidden;}
    .risk-bar-fill{height:100%;border-radius:3px;transition:width 0.4s ease;}
    .rg-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
    .rg-grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;}
    .rg-grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
    .rg-page-title{font-family:${F.head};font-size:22px;font-weight:700;color:${T.t1};}
    .rg-page-sub{font-size:13px;color:${T.t2};margin-top:3px;}
    .sparkline{display:flex;align-items:flex-end;gap:2px;height:32px;}
    .sparkline-bar{flex:1;border-radius:2px 2px 0 0;transition:height 0.3s;min-width:4px;}
    @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
    @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.35}}
    @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes scanLine{0%{top:20%}50%{top:80%}100%{top:20%}}
    @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
    .fade-in{animation:fadeIn 0.2s ease both;}
    .slide-up{animation:slideUp 0.25s ease both;}
    .pulse{animation:pulse 2s ease-in-out infinite;}
    .rg-mob-header{display:none;}
    .rg-mob-footer{display:none;position:fixed;bottom:0;left:0;right:0;z-index:90;background:${T.surface};}
    .rg-root{display:flex;flex-direction:column;height:100vh;overflow:hidden;}
    @media print{.rg-sidebar,.rg-topbar,.rg-mob-header,.rg-mob-footer{display:none!important;}.rg-content{padding:0!important;overflow:visible!important;}.rg-main{display:block!important;}body{background:#fff!important;color:#000!important;}.rg-card{border:1px solid #ccc!important;background:#fff!important;}}

    /* ═══ MOBILE ═══════════════════════════════════════════════════════════ */
    @media(max-width:768px){
      /* Shell */
      body{overflow:hidden!important;}
      .rg-mob-header{display:block!important;}
      .rg-mob-footer{display:block!important;}
      .rg-sidebar{display:none!important;}
      .rg-topbar{display:none!important;}
      .rg-app{flex:1!important;overflow:hidden!important;}
      .rg-main{overflow:hidden!important;}
      .rg-content{padding:16px 14px 80px!important;overflow-y:auto!important;-webkit-overflow-scrolling:touch;}

      /* Typography */
      .rg-page-title{font-size:20px!important;line-height:1.2!important;}
      .rg-page-sub{font-size:12px!important;}

      /* Grids — stack on mobile */
      .rg-grid-4{grid-template-columns:1fr 1fr!important;gap:8px!important;}
      .rg-grid-3{grid-template-columns:1fr!important;gap:10px!important;}
      .rg-grid-2{grid-template-columns:1fr!important;gap:10px!important;}

      /* Cards */
      .rg-card{border-radius:12px!important;}
      .rg-card-sm{padding:12px!important;border-radius:10px!important;}
      .rg-stat-val{font-size:24px!important;}
      .rg-stat-label{font-size:10px!important;}

      /* Tables — scroll wrapper with edge fades */
      .rg-table{min-width:580px;}

      /* Tabs — scrollable pills */
      .rg-tabs{overflow-x:auto!important;-webkit-overflow-scrolling:touch;gap:4px!important;padding-bottom:1px;}
      .rg-tab{white-space:nowrap!important;padding:8px 14px!important;font-size:11px!important;flex-shrink:0!important;}

      /* Buttons — touch-friendly */
      .rg-btn{min-height:44px!important;padding:10px 16px!important;font-size:13px!important;}
      button{-webkit-tap-highlight-color:transparent;}

      /* Inputs — prevent iOS zoom */
      input,select,textarea{font-size:16px!important;}
      .rg-input{padding:12px 14px!important;border-radius:8px!important;}
      .rg-textarea{padding:12px 14px!important;border-radius:8px!important;}
      .rg-select{padding:12px 14px!important;border-radius:8px!important;}
      .rg-field{margin-bottom:14px!important;}
      .rg-field label{font-size:10px!important;}

      /* Phone frame — native on mobile */
      .rg-phone-frame{width:100%!important;height:auto!important;min-height:500px!important;border:none!important;border-radius:12px!important;box-shadow:none!important;}

      /* Modals */
      .rg-modal{max-width:100%!important;margin:8px!important;max-height:92vh!important;border-radius:16px!important;}
      .rg-modal-overlay{padding:8px!important;}
      .rg-modal-header{padding:16px!important;}
      .rg-modal-body{padding:16px!important;}

      /* Progress bars — thicker on mobile for visibility */
      .rg-progress{height:6px!important;border-radius:3px!important;}

      /* Sparklines */
      .sparkline{height:28px!important;}

      /* Section headers — stack on narrow */
      [class*="fade-in"]>div:first-child{flex-wrap:wrap!important;}

      /* Responsive grids — inline styles overridden */
      .rg-r{grid-template-columns:1fr!important;}
      .rg-f{flex-direction:column!important;}
      .rg-f>div{width:100%!important;flex:none!important;}
      .rg-aside{width:100%!important;flex:none!important;}
      .rg-sh{flex-wrap:wrap!important;gap:10px!important;}
      .rg-sh>div:first-child{min-width:0!important;flex:1 1 100%!important;}

      .rg-mw{max-width:100%!important;}
      .rg-officer-bg{display:none!important;}
      .rg-officer-label{display:none!important;}

      /* Scenario modal — full-screen on mobile */
      .rg-scenario-overlay{padding:8px!important;align-items:flex-end!important;}
      .rg-scenario-box{border-radius:16px 16px 0 0!important;max-height:85vh!important;overflow-y:auto!important;}
      .rg-scenario-body{padding:20px 18px!important;}
      .rg-scenario-title{font-size:20px!important;}
      .rg-scenario-text{font-size:13px!important;line-height:1.7!important;margin-bottom:16px!important;}

      /* Demo banner — compact on mobile */
      .rg-demo-banner{flex-direction:row!important;align-items:center!important;padding:10px 12px!important;margin:0 0 12px!important;}
      .rg-demo-banner>div:first-child>div:nth-child(2){display:none!important;}
      .rg-demo-title+span{display:none;}

      /* Checklist rows — more padding */
      .rg-checklist-row{padding:14px 0!important;gap:14px!important;}
      .rg-toggle{width:44px!important;height:24px!important;border-radius:12px!important;}
      .rg-toggle-thumb{width:20px!important;height:20px!important;}
    }

    /* ═══ SMALL PHONE ═══════════════════════════════════════════════════════ */
    @media(max-width:420px){
      .rg-grid-4{grid-template-columns:1fr!important;gap:8px!important;}
      .rg-r{grid-template-columns:1fr!important;gap:8px!important;}
      .rg-content{padding:12px 10px 80px!important;}
      .rg-stat-val{font-size:22px!important;}
      .rg-page-title{font-size:18px!important;}
      .rg-btn{font-size:12px!important;padding:10px 12px!important;}
    }
  `}</style>
);

// ── ROLES & DEMO ACCOUNTS ────────────────────────────────────────────────────
const ROLES = [
  { id:'admin',    label:'National Admin',   badge:'National Admin', color:T.lime   },
  { id:'manager',  label:'Case Manager',     badge:'Case Manager',   color:T.blue   },
  { id:'officer',  label:'Taskforce Officer', badge:'Field Officer', color:T.green  },
  { id:'landlord', label:'Landlord Portal',  badge:'Landlord',       color:T.amber  },
  { id:'tenant',   label:'Tenant Portal',    badge:'Tenant',         color:T.t2     },
];

const DEMO_ACCOUNTS = [
  { id:'admin',    name:'Commissioner Ama Antwi',  role:'National Admin',     email:'a.antwi@rentcontrol.gov.gh',  pass:'demo2026', color:T.green },
  { id:'manager',  name:'Mgr. Kwame Acheampong',   role:'Case Manager',       email:'k.acheampong@rentguard.gh',   pass:'demo2026', color:T.blue  },
  { id:'officer',  name:'Ofc. Kofi Mensah',        role:'Taskforce Officer',  email:'k.mensah@rentguard.gh',       pass:'demo2026', color:T.amber },
  { id:'landlord', name:'Kwame Asante Boateng',    role:'Registered Landlord', email:'k.boateng@gmail.com',        pass:'demo2026', color:'#C8E830' },
  { id:'tenant',   name:'Abena Sarpong',           role:'Tenant',             email:'abena.sarpong@gmail.com',     pass:'demo2026', color:T.red   },
];

// ── MOCK DATA ────────────────────────────────────────────────────────────────
const REGIONS = [
  { name:'Greater Accra', reg:78, cards:52, violations:312, risk:'high',   score:52 },
  { name:'Ashanti',       reg:61, cards:38, violations:187, risk:'high',   score:38 },
  { name:'Western',       reg:84, cards:67, violations:94,  risk:'medium', score:67 },
  { name:'Central',       reg:91, cards:74, violations:61,  risk:'low',    score:74 },
  { name:'Eastern',       reg:87, cards:71, violations:78,  risk:'medium', score:71 },
  { name:'Volta',         reg:93, cards:82, violations:32,  risk:'low',    score:82 },
  { name:'Northern',      reg:44, cards:21, violations:143, risk:'high',   score:21 },
  { name:'Upper East',    reg:68, cards:49, violations:55,  risk:'medium', score:49 },
  { name:'Upper West',    reg:59, cards:33, violations:71,  risk:'high',   score:33 },
  { name:'Bono',          reg:76, cards:58, violations:44,  risk:'medium', score:58 },
];

const PROPERTIES = [
  { id:'P-001', address:'14 Osu Ako-Adjei Ave, Accra', mmda:'Ayawaso East',    landlord:'Kwame Asante Boateng',    lid:'L-2291', units:6,  registered:true,  cards:4, tenancies:6,  advance:9.5,  risk:87, violations:3, complaints:3, lastInsp:'—' },
  { id:'P-002', address:'7 Labone Close, East Legon',  mmda:'La Nkwantanang',  landlord:'Abena Osei-Mensah',       lid:'L-1104', units:3,  registered:true,  cards:3, tenancies:3,  advance:6.0,  risk:42, violations:1, complaints:1, lastInsp:'2026-01-14' },
  { id:'P-003', address:'22 Dzorwulu Crescent, Accra', mmda:'Ayawaso West',    landlord:'Emmanuel Nkrumah-Appiah', lid:'L-3378', units:12, registered:false, cards:0, tenancies:12, advance:18.0, risk:96, violations:4, complaints:7, lastInsp:'—' },
  { id:'P-004', address:'4 Ring Road West, Accra',     mmda:'Okaikwei North',  landlord:'Yaa Darko-Mensah',        lid:'L-0882', units:4,  registered:true,  cards:4, tenancies:4,  advance:3.0,  risk:12, violations:0, complaints:0, lastInsp:'2026-02-28' },
  { id:'P-005', address:'19 Spintex Road, Tema',       mmda:'Tema West',       landlord:'Kofi Acheampong',         lid:'L-4451', units:8,  registered:true,  cards:5, tenancies:8,  advance:11.2, risk:73, violations:2, complaints:2, lastInsp:'2026-01-03' },
  { id:'P-006', address:'44 Accra New Town',            mmda:'Ayawaso Central', landlord:'Kofi Adjei-Mensah',       lid:'L-5512', units:5,  registered:true,  cards:5, tenancies:5,  advance:14.0, risk:88, violations:3, complaints:3, lastInsp:'—' },
  { id:'P-007', address:'12 Tesano Ave, Accra',         mmda:'Okaikwei North', landlord:'Akosua Darteh',           lid:'L-6621', units:3,  registered:true,  cards:2, tenancies:3,  advance:5.0,  risk:38, violations:1, complaints:1, lastInsp:'2026-02-10' },
  { id:'P-008', address:'2 Ringway Estate, Cantonments',mmda:'Cantonments',    landlord:'Charles Appiah-Kubi',     lid:'L-7734', units:6,  registered:false, cards:0, tenancies:6,  advance:8.0,  risk:79, violations:2, complaints:2, lastInsp:'—' },
];

const CASES = [
  { id:'RC-2026-ACC-00291', type:'illegal_advance',      src:'taskforce_field', sev:'critical', property:'14 Osu Ako-Adjei Ave', landlord:'Kwame Asante Boateng',    status:'under_investigation', opened:'2026-03-10', assigned:'Ofc. Mensah',  advance:9.5,  district:'Ayawaso East' },
  { id:'RC-2026-ACC-00290', type:'no_rent_card',         src:'portal',          sev:'high',     property:'22 Dzorwulu Crescent',  landlord:'Emmanuel Nkrumah-Appiah', status:'received',            opened:'2026-03-09', assigned:null,            advance:18,   district:'Ayawaso West' },
  { id:'RC-2026-ACC-00289', type:'unlawful_eviction',    src:'ussd',            sev:'high',     property:'3 Cantonments Rd',      landlord:'Patricia Asante',         status:'notice_issued',       opened:'2026-03-08', assigned:'Ofc. Amankwa', advance:0,    district:'Cantonments' },
  { id:'RC-2026-ACC-00288', type:'no_agreement',         src:'portal',          sev:'medium',   property:'18 Spintex Rd',         landlord:'Samuel Tetteh',           status:'received',            opened:'2026-03-08', assigned:null,            advance:0,    district:'Tema West' },
  { id:'RC-2026-ACC-00287', type:'rent_overcharge',      src:'call_centre',     sev:'medium',   property:'7 Burma Camp Rd',       landlord:'Grace Owusu',             status:'resolved',            opened:'2026-03-07', assigned:'Ofc. Quaye',   advance:0,    district:'Cantonments' },
  { id:'RC-2026-ACC-00286', type:'illegal_advance',      src:'whatsapp',        sev:'high',     property:'31 North Kaneshie',     landlord:'Benjamin Frimpong',       status:'under_investigation', opened:'2026-03-06', assigned:'Ofc. Mensah',  advance:11.2, district:'Ablekuma Central' },
  { id:'RC-2026-ACC-00285', type:'unregistered_tenancy', src:'system_flag',     sev:'low',      property:'9 Asylum Down',         landlord:'Ama Kyei-Mensah',         status:'received',            opened:'2026-03-05', assigned:null,            advance:0,    district:'Accra Central' },
  { id:'RC-2026-ACC-00284', type:'illegal_advance',      src:'portal',          sev:'critical', property:'44 Accra New Town',     landlord:'Kofi Adjei-Mensah',       status:'notice_issued',       opened:'2026-03-04', assigned:'Ofc. Osei',    advance:14.0, district:'Ayawaso Central' },
  { id:'RC-2026-ACC-00283', type:'maintenance_failure',  src:'call_centre',     sev:'medium',   property:'12 Tesano Ave',         landlord:'Akosua Darteh',           status:'under_investigation', opened:'2026-03-03', assigned:'Ofc. Boateng', advance:0,    district:'Okaikwei North' },
  { id:'RC-2026-ACC-00282', type:'harassment',           src:'ussd',            sev:'high',     property:'5 Pig Farm Rd',         landlord:'James Owusu-Acheampong',  status:'received',            opened:'2026-03-02', assigned:null,            advance:0,    district:'Ablekuma North' },
  { id:'RC-2026-ACC-00281', type:'false_particulars',    src:'portal',          sev:'medium',   property:'77 Adabraka High St',   landlord:'Yaa Asantewaa Boafo',     status:'resolved',            opened:'2026-03-01', assigned:'Ofc. Amankwa', advance:0,    district:'Accra Central' },
  { id:'RC-2026-ACC-00280', type:'illegal_advance',      src:'taskforce_field', sev:'high',     property:'2 Ringway Estate',      landlord:'Charles Appiah-Kubi',     status:'referred_to_court',   opened:'2026-02-28', assigned:'Ofc. Quaye',   advance:8.0,  district:'Cantonment' },
  { id:'RC-2026-ACC-00279', type:'no_rent_card',         src:'system_flag',     sev:'low',      property:'19 Abeka Junction',     landlord:'Comfort Asante',          status:'closed',              opened:'2026-02-25', assigned:'Ofc. Mensah',  advance:0,    district:'Ablekuma Central' },
  { id:'RC-2026-ACC-00278', type:'unlawful_eviction',    src:'whatsapp',        sev:'critical', property:'8 East Legon Hills',    landlord:'Kwadwo Mensah-Bonsu',     status:'referred_to_court',   opened:'2026-02-20', assigned:'Ofc. Osei',    advance:0,    district:'La Nkwantanang' },
];

const LANDLORD_DATA = {
  name:'Kwame Asante Boateng', id:'L-2291', tin:'GH-TIN-8821-4490', score:34,
  properties:3, registered:2, tenancies:6, agreements:4, cards:4, compliant:1,
  props:[
    { address:'14 Osu Ako-Adjei Ave', units:6, cards:4, advance:9.5, registered:true,  score:28 },
    { address:'3A Labone Link',       units:2, cards:2, advance:5.0, registered:true,  score:72 },
    { address:'8 Kpehe Rd, Achimota', units:4, cards:0, advance:7.2, registered:false, score:18 },
  ]
};

const RENT_CARDS = {
  'RG-2025-ACC-00123': { valid:true, address:'14 Osu Ako-Adjei Ave, Accra', landlord:'K. Boateng (L-2291)',      rent:1800, issued:'2025-11-01', status:'active', advMonths:9.5, compliant:false, warning:'Advance at 9.5 months — exceeds 6-month cap under Act 220 s.16(5)' },
  'RG-2026-ACC-00441': { valid:true, address:'4 Ring Road West, Accra',     landlord:'Y. Darko-Mensah (L-0882)', rent:1200, issued:'2026-01-10', status:'active', advMonths:3.0, compliant:true,  warning:null },
  'RG-2025-ACC-00088': { valid:true, address:'3A Labone Link, East Legon',  landlord:'K. Boateng (L-2291)',      rent:2200, issued:'2025-09-15', status:'active', advMonths:5.5, compliant:true,  warning:null },
};

const CHECKLIST = [
  { id:'agreement',  label:'Written tenancy agreement exists',          law:'PNDCL 138 s.4',      required:true  },
  { id:'registered', label:'Agreement registered with Rent Control',    law:'PNDCL 138 s.4 (14d)',required:true  },
  { id:'card',       label:'Rent Card issued to tenant',                law:'Act 220 s.20',       required:true  },
  { id:'card_acc',   label:'Rent Card details accurate and up-to-date', law:'PNDCL 138 s.5',      required:true  },
  { id:'advance',    label:'Advance rent within 6-month legal cap',     law:'Act 220 s.16(5)',    required:true  },
  { id:'list',       label:'Tenant and rent list filed with Committee', law:'PNDCL 138 s.5(2)',   required:false },
  { id:'habitab',    label:'Property in habitable condition',           law:'Act 220 s.17',       required:false },
  { id:'landlord',   label:'Landlord or agent present for inspection',  law:'Procedure',          required:false },
];

const PAYMENTS_DATA = [
  { id:'PAY-001', date:'2026-03-01', amount:10800, method:'momo_mtn',      period:'Mar–Aug 2026', advance:6.0,  ref:'MTN-2291AA',  compliant:true,  recorded:'Ofc. Mensah' },
  { id:'PAY-002', date:'2026-02-01', amount:5400,  method:'bank_transfer', period:'Feb–Apr 2026', advance:3.0,  ref:'GCB-441882',  compliant:true,  recorded:'Self' },
  { id:'PAY-003', date:'2025-11-01', amount:19800, method:'cash',          period:'Nov 25–Jul 26',advance:11.0, ref:'—',           compliant:false, recorded:'Self' },
  { id:'PAY-004', date:'2026-01-10', amount:3600,  method:'momo_mtn',      period:'Jan–Mar 2026', advance:3.0,  ref:'MTN-0882BB',  compliant:true,  recorded:'Self' },
];

// FIX: Added missing rent field on T-003
const TENANTS_DATA = [
  { id:'T-001', name:'Abena Sarpong', phone:'0277-441-001', property:'14 Osu Ako-Adjei Ave', unit:'Unit 2A', rentCard:'RG-2025-ACC-00123', advance:9.5, rent:1800, status:'active', complaint:true  },
  { id:'T-002', name:'Yaw Frimpong',  phone:'0277-441-002', property:'14 Osu Ako-Adjei Ave', unit:'Unit 3B', rentCard:'RG-2025-ACC-00124', advance:9.5, rent:1800, status:'active', complaint:false },
  { id:'T-003', name:'Efua Mensah',   phone:'0277-441-003', property:'4 Ring Road West',     unit:'Unit 1',  rentCard:'RG-2026-ACC-00441', advance:3.0, rent:1200, status:'active', complaint:false },
  { id:'T-004', name:'Kojo Asante',   phone:'0277-441-004', property:'22 Dzorwulu Cres.',    unit:'Unit 5',  rentCard:'—',                 advance:18,  rent:1500, status:'active', complaint:true  },
];

const AUDIT_LOG = [
  { id:'AL-001', ts:'2026-03-16 09:31', actor:'Ofc. Mensah',     action:'COMPLETE_INSPECTION',   entity:'P-001',                 detail:'3 violations flagged. Cases auto-generated.' },
  { id:'AL-002', ts:'2026-03-16 09:18', actor:'System',          action:'RISK_SCORE_UPDATED',    entity:'L-3378',                detail:'Risk score: 92 → 96. New complaint filed.' },
  { id:'AL-003', ts:'2026-03-16 08:55', actor:'Mgr. Acheampong', action:'CASE_ASSIGNED',         entity:'RC-2026-ACC-00291',     detail:'Assigned to Ofc. Mensah.' },
  { id:'AL-004', ts:'2026-03-16 08:44', actor:'Tenant Portal',   action:'COMPLAINT_FILED',       entity:'RC-2026-ACC-00291',     detail:'USSD source. Phone: 0277-441-004.' },
  { id:'AL-005', ts:'2026-03-15 17:22', actor:'System',          action:'GRA_EXPORT_QUEUED',     entity:'2026-02',               detail:'847 landlord records. Period: Feb 2026.' },
  { id:'AL-006', ts:'2026-03-15 16:10', actor:'Mgr. Acheampong', action:'CASE_STATUS_UPDATED',   entity:'RC-2026-ACC-00289',     detail:'Status: received → notice_issued.' },
  { id:'AL-007', ts:'2026-03-15 14:05', actor:'Ofc. Amankwa',    action:'COMPLETE_INSPECTION',   entity:'P-003',                 detail:'4 violations. Legal referral recommended.' },
  { id:'AL-008', ts:'2026-03-15 11:30', actor:'Landlord Portal', action:'RENT_CARD_ISSUED',      entity:'RG-2026-ACC-00553',     detail:'Tenancy T-009. Card issued by landlord.' },
  { id:'AL-009', ts:'2026-03-15 09:00', actor:'System',          action:'RISK_SCORE_BATCH',      entity:'All landlords',         detail:'Daily risk scoring complete. 312 properties rescored.' },
  { id:'AL-010', ts:'2026-03-14 17:45', actor:'Ofc. Amankwa',    action:'CASE_EVIDENCE_UPLOAD',  entity:'RC-2026-ACC-00290',     detail:'3 photos uploaded. GPS: 5.583°N, 0.204°W.' },
];

const OFFICERS = [
  { id:'OFF-001', name:'Kofi Mensah',      district:'Ayawaso East',     insp:14, cases:8, active:true,  phone:'0244-231-001', badge:'RC-TF-001' },
  { id:'OFF-002', name:'Ama Amankwa',      district:'Ayawaso West',     insp:11, cases:5, active:true,  phone:'0244-231-002', badge:'RC-TF-002' },
  { id:'OFF-003', name:'Samuel Quaye',     district:'Okaikwei North',   insp:9,  cases:4, active:false, phone:'0244-231-003', badge:'RC-TF-003' },
  { id:'OFF-004', name:'Grace Osei',       district:'La Nkwantanang',   insp:16, cases:9, active:true,  phone:'0244-231-004', badge:'RC-TF-004' },
  { id:'OFF-005', name:'Prince Ampofo',    district:'Tema West',        insp:7,  cases:3, active:true,  phone:'0244-231-005', badge:'RC-TF-005' },
  { id:'OFF-006', name:'Janet Amoah',      district:'Accra Central',    insp:12, cases:6, active:true,  phone:'0244-231-006', badge:'RC-TF-006' },
  { id:'OFF-007', name:'Emmanuel Tetteh',  district:'Ablekuma Central', insp:10, cases:5, active:true,  phone:'0244-231-007', badge:'RC-TF-007' },
  { id:'OFF-008', name:'Patricia Asare',   district:'Cantonments',      insp:8,  cases:4, active:true,  phone:'0244-231-008', badge:'RC-TF-008' },
  { id:'OFF-009', name:'Francis Boateng',  district:'Tema East',        insp:13, cases:7, active:false, phone:'0244-231-009', badge:'RC-TF-009' },
  { id:'OFF-010', name:'Adwoa Nyarko',     district:'Ashanti North',    insp:15, cases:8, active:true,  phone:'0244-231-010', badge:'RC-TF-010' },
  { id:'OFF-011', name:'Kwame Frimpong',   district:'Kumasi Central',   insp:11, cases:6, active:true,  phone:'0244-231-011', badge:'RC-TF-011' },
  { id:'OFF-012', name:'Abena Acheampong', district:'Sunyani East',     insp:6,  cases:3, active:true,  phone:'0244-231-012', badge:'RC-TF-012' },
];

const TREND_DATA = {
  cards:[8,11,15,19,23,28,33,40,46,52,58,65],
  violations:[310,295,320,340,315,305,298,312,308,294,288,272],
  complaints:[28,31,26,34,29,38,32,41,36,44,38,47],
  resolved:[12,18,22,19,28,31,26,35,30,38,34,42],
  months:['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'],
};

const CASE_NOTES = {
  'RC-2026-ACC-00291': [
    { ts:'2026-03-10 14:22', by:'System',          note:'Case auto-generated from inspection RC-2026-INSP-0081. Advance rent 9.5 months detected via payment analysis.' },
    { ts:'2026-03-10 15:04', by:'Mgr. Acheampong', note:'Reviewed. Severity confirmed CRITICAL. Assigning to Ofc. Mensah for in-person verification.' },
    { ts:'2026-03-11 09:15', by:'Ofc. Mensah',     note:'Landlord contacted. Claims 3 months were "deposit not advance". Dispute noted. Evidence capture scheduled.' },
    { ts:'2026-03-12 11:30', by:'Mgr. Acheampong', note:'Deposit argument reviewed — not valid under Act 220. Preparing formal notice for service.' },
  ],
  'RC-2026-ACC-00290': [
    { ts:'2026-03-09 11:00', by:'Tenant Portal', note:'Filed via web portal by tenant. No rent card issued at tenancy start (Nov 2025).' },
    { ts:'2026-03-09 12:45', by:'System',        note:'Cross-checked registry. 0 of 12 units at property P-003 have rent cards. PNDCL 138 s.5 systemic breach.' },
  ],
};

const INSPECTION_HISTORY = [
  { id:'INS-081', date:'2026-03-16', property:'14 Osu Ako-Adjei Ave', officer:'Ofc. Mensah',  violations:3, status:'completed', cases:['RC-2026-ACC-00291'] },
  { id:'INS-080', date:'2026-03-15', property:'22 Dzorwulu Cres.',    officer:'Ofc. Amankwa', violations:4, status:'completed', cases:['RC-2026-ACC-00290'] },
  { id:'INS-079', date:'2026-03-14', property:'4 Ring Road West',     officer:'Ofc. Quaye',   violations:0, status:'completed', cases:[] },
  { id:'INS-078', date:'2026-03-13', property:'19 Spintex Road',      officer:'Ofc. Mensah',  violations:2, status:'completed', cases:['RC-2026-ACC-00286'] },
  { id:'INS-077', date:'2026-03-12', property:'7 Labone Close',       officer:'Ofc. Boateng', violations:1, status:'completed', cases:['RC-2026-ACC-00288'] },
];

// FIX: GRA_ROWS moved to module scope so exportGRACSV can access it
const GRA_ROWS = [
  { tin:'GH-TIN-8821-4490', card:'GHA-001-2291-XXXX', props:3, tenancies:6,  income:194400, period_payments:16200, advance_violations:3, unreg_tenancies:1, district:'Ayawaso East',   region:'Greater Accra' },
  { tin:'GH-TIN-3378-9920', card:'GHA-003-3378-XXXX', props:1, tenancies:12, income:388800, period_payments:0,     advance_violations:4, unreg_tenancies:12,district:'Ayawaso West',  region:'Greater Accra' },
  { tin:'GH-TIN-4451-3312', card:'GHA-004-4451-XXXX', props:2, tenancies:8,  income:259200, period_payments:8640,  advance_violations:2, unreg_tenancies:3, district:'Tema West',      region:'Greater Accra' },
  { tin:'GH-TIN-1104-5521', card:'GHA-001-1104-XXXX', props:1, tenancies:3,  income:79200,  period_payments:6600,  advance_violations:0, unreg_tenancies:0, district:'La Nkwantanang', region:'Greater Accra' },
  { tin:'GH-TIN-0882-7734', card:'GHA-001-0882-XXXX', props:1, tenancies:4,  income:57600,  period_payments:4800,  advance_violations:0, unreg_tenancies:0, district:'Okaikwei North', region:'Greater Accra' },
];

// ── HELPERS ──────────────────────────────────────────────────────────────────
const riskColor = (r) => r >= 70 ? T.red : r >= 40 ? T.amber : T.green;
const riskLabel = (r) => r >= 70 ? 'high' : r >= 40 ? 'medium' : 'low';
const riskBadge = (r) => r >= 70 ? 'rg-badge-red' : r >= 40 ? 'rg-badge-amber' : 'rg-badge-green';
const statusBadge = (s) => ({ received:'rg-badge-blue', under_investigation:'rg-badge-amber', notice_issued:'rg-badge-amber', referred_to_court:'rg-badge-red', resolved:'rg-badge-green', closed:'rg-badge-muted' })[s] || 'rg-badge-muted';
const statusLabel = (s) => s.replace(/_/g, ' ');
const caseTypeLabel = (t) => ({ illegal_advance:'Illegal Advance Rent', no_rent_card:'No Rent Card Issued', unlawful_eviction:'Unlawful Eviction', no_agreement:'No Tenancy Agreement', rent_overcharge:'Rent Overcharge', unregistered_tenancy:'Unregistered Tenancy', maintenance_failure:'Maintenance Failure', false_particulars:'False Rent Particulars', harassment:'Landlord Harassment', other:'Other Violation' })[t] || t.replace(/_/g,' ');

// ── CSV EXPORT UTILITIES ─────────────────────────────────────────────────────
const downloadCSV = (filename, headers, rows) => {
  const escape = (v) => { const s = String(v ?? ''); return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s; };
  const csv = [headers, ...rows].map(r => r.map(escape).join(',')).join('\n');
  const blob = new Blob([csv], { type:'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
const exportCasesCSV = () => downloadCSV('rentguard_cases_' + new Date().toISOString().slice(0,10) + '.csv',
  ['Case ID','Type','Severity','Property','Landlord','District','Status','Opened','Assigned Officer','Advance (months)'],
  CASES.map(c => [c.id, caseTypeLabel(c.type), c.sev, c.property, c.landlord, c.district, statusLabel(c.status), c.opened, c.assigned || 'Unassigned', c.advance || 0])
);
const exportGRACSV = () => downloadCSV('rentguard_gra_export_' + new Date().toISOString().slice(0,10) + '.csv',
  ['TIN','Ghana Card Ref','Properties','Tenancies','Est. Annual Income (GH₵)','Advance Violations','Unreg. Tenancies','District','Region'],
  GRA_ROWS.map(r => [r.tin, r.card, r.props, r.tenancies, r.income, r.advance_violations, r.unreg_tenancies, r.district, r.region])
);

// ── SHARED MICRO-COMPONENTS ──────────────────────────────────────────────────
const Sparkline = ({ data, color }) => { const max = Math.max(...data); return (<div className="sparkline">{data.map((v,i) => (<div key={i} className="sparkline-bar" style={{ height:`${(v/max)*100}%`, background:color, opacity:i===data.length-1?1:0.4+(i/data.length)*0.4 }} />))}</div>); };
const ProgressBar = ({ value, color, height = 4 }) => (<div className="rg-progress" style={{ height }}><div className="rg-progress-fill" style={{ width:`${value}%`, background:color }} /></div>);
const StatCard = ({ val, label, change, color, spark }) => (<div className="rg-card-sm fade-in"><div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}><div><div className="rg-stat-val" style={{ color }}>{val}</div><div className="rg-stat-label">{label}</div>{change !== undefined && (<div className="rg-stat-change" style={{ color:change>=0?T.green:T.red }}>{change>=0?'↑':'↓'} {Math.abs(change)}% vs last month</div>)}</div>{spark && <Sparkline data={spark} color={color} />}</div></div>);
const SectionHeader = ({ title, sub, action }) => (<div className="rg-sh" style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:20, flexWrap:'wrap', gap:10 }}><div style={{ flex:1, minWidth:0 }}><div style={{ fontFamily:F.head, fontSize:22, fontWeight:700, color:T.t1 }}>{title}</div>{sub && <div style={{ fontSize:13, color:T.t2, marginTop:3 }}>{sub}</div>}</div>{action}</div>);
const InfoRow = ({ label, value, mono, color }) => (<div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid rgba(36,54,40,0.4)' }}><span style={{ fontSize:12, color:T.t3 }}>{label}</span><span style={{ fontFamily:mono?F.mono:undefined, fontSize:12, fontWeight:600, color:color||T.t1 }}>{value}</span></div>);
const EmptyState = ({ icon, text }) => (<div style={{ padding:'40px 20px', textAlign:'center' }}><div style={{ fontFamily:F.mono, fontSize:10, fontWeight:700, color:T.t3, letterSpacing:2, textTransform:'uppercase', marginBottom:10, opacity:0.5 }}>{icon}</div><div style={{ fontSize:13, color:T.t3 }}>{text}</div></div>);
const TrendChart = ({ data, months, lines }) => { const h=100,w=400; const allVals=lines.flatMap(l=>data[l.key]||[]); const max=Math.max(...allVals)*1.1; const min=Math.min(...allVals)*0.9; const pts=(arr)=>arr.map((v,i)=>{const x=(i/(arr.length-1))*w;const y=h-((v-min)/(max-min))*h;return `${x},${y}`;}).join(' '); return (<div style={{ position:'relative' }}><svg viewBox={`0 0 ${w} ${h+20}`} style={{ width:'100%', overflow:'visible' }}>{lines.map((l,li)=>{const arr=data[l.key]||[];const points=pts(arr);return(<React.Fragment key={li}>{l.fill&&<polygon points={`0,${h} ${points} ${w},${h}`} fill={l.color} opacity="0.07"/>}<polyline points={points} fill="none" stroke={l.color} strokeWidth={l.dashed?1.5:2} strokeDasharray={l.dashed?'4,4':'none'} strokeLinejoin="round"/>{arr.map((v,i)=>i===arr.length-1&&(<circle key={i} cx={(i/(arr.length-1))*w} cy={h-((v-min)/(max-min))*h} r="3.5" fill={l.color}/>))}</React.Fragment>);})}{months&&months.map((m,i)=>(<text key={i} x={(i/(months.length-1))*w} y={h+16} textAnchor="middle" style={{ fontFamily:F.mono, fontSize:9, fill:T.t3 }}>{m}</text>))}</svg><div style={{ display:'flex', gap:16, marginTop:8, flexWrap:'wrap' }}>{lines.map((l,i)=>(<div key={i} style={{ display:'flex', alignItems:'center', gap:6 }}><div style={{ width:20, height:2, background:l.color, borderRadius:1 }}/><span style={{ fontSize:10, color:T.t2 }}>{l.label}</span></div>))}</div></div>); };

// Mobile handled by CSS media queries — no JS state needed.

// ── LOGO ─────────────────────────────────────────────────────────────────────
const Logo = () => (<div style={{ display:'flex', alignItems:'center', gap:8 }}><div style={{ width:28, height:28, background:T.green, borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><span style={{ fontFamily:F.head, fontWeight:800, fontSize:16, color:T.bg }}>R</span></div><div><div style={{ fontFamily:F.head, fontWeight:700, fontSize:14, color:T.t1, lineHeight:1 }}>RentGuard</div><div style={{ fontFamily:F.mono, fontSize:8, color:T.t3, letterSpacing:1.5, lineHeight:1.4 }}>GHANA</div></div></div>);

// ── ROLE SWITCHER ────────────────────────────────────────────────────────────
const RoleSwitcher = ({ role, setRole }) => {
  const [open, setOpen] = useState(false);
  const cur = ROLES.find(r => r.id === role);
  return (<div style={{ position:'relative' }}><button onClick={() => setOpen(!open)} style={{ display:'flex', alignItems:'center', gap:8, padding:'6px 12px', background:T.card, border:`1px solid ${T.border}`, borderRadius:6, cursor:'pointer', color:T.t1 }}><div style={{ width:7, height:7, borderRadius:'50%', background:cur.color, flexShrink:0 }} /><span style={{ fontFamily:F.mono, fontSize:11, fontWeight:500 }}>{cur.badge}</span><span style={{ color:T.t3, fontSize:10 }}>▾</span></button>{open && (<div style={{ position:'absolute', top:'calc(100% + 6px)', right:0, background:T.surface, border:`1px solid ${T.border}`, borderRadius:8, overflow:'hidden', zIndex:200, minWidth:180, boxShadow:'0 8px 32px rgba(0,0,0,0.5)' }}>{ROLES.map(r => (<button key={r.id} onClick={() => { setRole(r.id); setOpen(false); }} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px', width:'100%', background:r.id===role?T.card:'transparent', border:'none', cursor:'pointer', color:r.id===role?T.t1:T.t2, textAlign:'left' }}><div style={{ width:7, height:7, borderRadius:'50%', background:r.color, flexShrink:0 }} /><span style={{ fontFamily:F.mono, fontSize:11 }}>{r.label}</span></button>))}</div>)}</div>);
};

// ── TOAST DISPLAY ────────────────────────────────────────────────────────────
const ToastDisplay = ({ toasts, onDismiss }) => {
  if (!toasts.length) return null;
  const colors = { success:{ border:'rgba(15,168,106,0.4)', dot:T.green }, error:{ border:'rgba(229,72,58,0.4)', dot:T.red }, warning:{ border:'rgba(232,144,10,0.4)', dot:T.amber }, info:{ border:'rgba(59,130,246,0.4)', dot:T.blue } };
  return (<div style={{ position:'fixed', bottom:24, right:24, zIndex:9999, display:'flex', flexDirection:'column', gap:8, maxWidth:360 }}>{toasts.map(t => { const c = colors[t.type] || colors.info; return (<div key={t.id} className="slide-up" style={{ background:T.card, border:`1px solid ${c.border}`, borderLeft:`3px solid ${c.dot}`, borderRadius:8, padding:'12px 40px 12px 14px', position:'relative', boxShadow:'0 8px 32px rgba(0,0,0,0.4)' }}><div style={{ display:'flex', gap:10, alignItems:'flex-start' }}><div style={{ width:7, height:7, borderRadius:'50%', background:c.dot, flexShrink:0, marginTop:4 }} /><span style={{ fontSize:12, color:T.t1, lineHeight:1.5 }}>{t.msg}</span></div><button onClick={() => onDismiss(t.id)} style={{ position:'absolute', top:8, right:10, background:'transparent', border:'none', color:T.t3, fontSize:14, cursor:'pointer', lineHeight:1, padding:2 }}>×</button></div>); })}</div>);
};

// ── ANIMATED COUNTER (CSS-only, no re-render) ───────────────────────────────
// AnimVal removed — was causing React error #310 (too many re-renders from 
// 8 simultaneous RAF-based setState calls). Static values with CSS fade-in
// achieve the same visual effect without the render cascade.

// ── DEMO MODE BANNER ─────────────────────────────────────────────────────────
const DemoBanner = ({ role, onStartScenario }) => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  const scenarios = {
    admin: 'Walk through the national enforcement dashboard — compliance data, case trends, and regional intelligence across all 16 regions.',
    manager: 'Triage incoming cases, assign officers, track SLA deadlines, and advance case status through the enforcement pipeline.',
    officer: 'Experience the field officer mobile app — inspect properties, run the 8-point checklist, file violations with GPS evidence.',
    landlord: 'See your compliance score, register properties, issue rent cards, and understand your tax obligations under the new mandate.',
    tenant: 'Verify your rent card, check if your advance rent is legal, file a complaint, and track it through resolution.',
  };
  return (<div className="slide-up rg-demo-banner" style={{ margin:'0 0 16px', padding:'12px 16px', background:'rgba(200,232,48,0.06)', border:`1px solid rgba(200,232,48,0.2)`, borderLeft:`4px solid ${T.lime}`, borderRadius:8, display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12 }}>
    <div style={{ flex:1, minWidth:0 }}>
      <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6, flexWrap:'wrap' }}>
        <span style={{ fontFamily:F.mono, fontSize:9, fontWeight:700, color:T.lime, letterSpacing:2, textTransform:'uppercase', background:'rgba(200,232,48,0.12)', padding:'2px 8px', borderRadius:3 }}>DEMO</span>
        <span className="rg-demo-title" style={{ fontSize:12, fontWeight:700, color:T.t1 }}>RentGuard v4.1</span>
      </div>
      <div style={{ fontSize:12, color:T.t2, lineHeight:1.65 }}>{scenarios[role]} All data is simulated. Every button is functional.</div>
    </div>
    <div style={{ display:'flex', gap:8, flexShrink:0 }}>
      {role === 'admin' && <button className="rg-btn rg-btn-lime" style={{ fontSize:11 }} onClick={onStartScenario}>Start Guided Scenario</button>}
      <button onClick={() => setDismissed(true)} style={{ background:'transparent', border:'none', color:T.t3, cursor:'pointer', fontSize:16, lineHeight:1, padding:'2px 4px' }}>×</button>
    </div>
  </div>);
};

// ── GUIDED SCENARIO MODAL (the "walk them through it" moment) ────────────────
const GuidedScenario = ({ onClose, onNavigate }) => {
  const [step, setStep] = useState(0);
  const steps = [
    { title:'The Problem', subtitle:'What Rent Control faces today', body:'Ghana\'s Rent Control Department oversees 1.8 million rental units across 16 regions — but only 38% of tenancies are registered, just 29% have rent cards issued, and the average advance rent collected is 9.2 months, far exceeding the 6-month legal cap under Act 220. Officers operate on paper. There is no national enforcement database.', action:null, highlight:T.red },
    { title:'A Tenant Calls *714*1#', subtitle:'Complaint intake via USSD', body:'Tenant Abena Sarpong dials *714*1# on a basic phone — no smartphone or internet needed. She reports her landlord at 14 Osu Ako-Adjei Ave collected 9.5 months advance rent. The USSD system creates case RC-2026-ACC-00291 and routes it into the RentGuard case queue automatically.', action:{ label:'See USSD Simulator →', nav:['tenant','ussd'] }, highlight:T.blue },
    { title:'Risk Score Updates in 60 Seconds', subtitle:'Automated intelligence', body:'The system cross-references the landlord\'s profile: 3 properties, 6 active tenancies, 4 without rent cards, and now a formal complaint. Risk score jumps from 72 to 87. The property is flagged as a Priority Inspection Target and routed to Officer Mensah\'s shift plan in Ayawaso East.', action:{ label:'See Live Dashboard →', nav:['admin','dashboard'] }, highlight:T.amber },
    { title:'Officer Inspects in the Field', subtitle:'Mobile app · Offline-capable · GPS-stamped', body:'Officer Mensah arrives at the property with the RentGuard Android app. He runs the 8-point inspection checklist, photographs the tenancy agreements (no Rent Control stamp), and records that 2 units have no rent cards. 3 violations are auto-generated. All evidence is GPS-stamped and synced.', action:{ label:'See Officer App →', nav:['officer','home'] }, highlight:T.green },
    { title:'Formal Notice Generated', subtitle:'Auto-populated legal document', body:'Case Manager reviews the inspection report. Violation confirmed. A formal notice is auto-generated citing Act 220 s.16(5) and PNDCL 138 s.5, with a 14-day compliance deadline. Served to the landlord by SMS. The tenant receives an SMS update at every stage.', action:{ label:'See Case Management →', nav:['manager','queue'] }, highlight:T.amber },
    { title:'GRA Gets the Data', subtitle:'Tax enforcement integration', body:'Because the landlord has 3 properties, they cross the multi-property threshold. An entry is added to the next GRA export — linking their TIN to estimated annual rental income of GH₵ 194,400. GRA auditors can now cross-check declared vs. actual rental income.', action:{ label:'See GRA Export →', nav:['admin','gra'] }, highlight:T.red },
    { title:'The Result', subtitle:'One complaint → full enforcement chain', body:'From a 30-second USSD call to formal notice, GRA referral, and potential prosecution — every step is digitally recorded, legally referenced, and tamper-logged. The landlord either complies within 14 days or faces the Rent and Housing Committee. The tenant is protected. The data is captured. Revenue is recovered.', action:null, highlight:T.green },
  ];
  const cur = steps[step];
  return (<div className="rg-scenario-overlay" style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', backdropFilter:'blur(6px)', zIndex:3000, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
    <div className="slide-up rg-scenario-box" style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:14, maxWidth:580, width:'100%', overflow:'hidden', boxShadow:'0 24px 80px rgba(0,0,0,0.6)' }}>
      <div style={{ height:3, background:T.border }}><div style={{ height:'100%', width:`${((step+1)/steps.length)*100}%`, background:cur.highlight, transition:'width 0.4s ease' }} /></div>
      <div className="rg-scenario-body" style={{ padding:'28px 32px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
          <span style={{ fontFamily:F.mono, fontSize:10, fontWeight:700, color:cur.highlight, letterSpacing:2 }}>STEP {step+1} OF {steps.length}</span>
          <div style={{ flex:1, height:1, background:T.border }} />
          <button onClick={onClose} style={{ background:'transparent', border:'none', color:T.t3, cursor:'pointer', fontFamily:F.mono, fontSize:10, letterSpacing:1 }}>SKIP</button>
        </div>
        <div className="rg-scenario-title" style={{ fontFamily:F.head, fontSize:24, fontWeight:700, color:T.t1, marginBottom:4, lineHeight:1.2 }}>{cur.title}</div>
        <div style={{ fontFamily:F.mono, fontSize:11, color:cur.highlight, letterSpacing:0.5, marginBottom:12 }}>{cur.subtitle}</div>
        <div className="rg-scenario-text" style={{ fontSize:14, color:T.t2, lineHeight:1.8, marginBottom:20 }}>{cur.body}</div>
        <div style={{ display:'flex', gap:6, marginBottom:16 }}>{steps.map((_,i) => (<div key={i} onClick={() => setStep(i)} style={{ width:i===step?24:8, height:8, borderRadius:4, background:i<=step?cur.highlight:T.border, cursor:'pointer', transition:'all 0.3s' }} />))}</div>
        <div style={{ display:'flex', gap:8, justifyContent:'space-between', alignItems:'center', flexWrap:'wrap' }}>
          <div>{step > 0 && <button className="rg-btn rg-btn-ghost" onClick={() => setStep(s=>s-1)} style={{ fontSize:12 }}>← Back</button>}</div>
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', justifyContent:'flex-end' }}>
            {cur.action && <button className="rg-btn rg-btn-ghost" onClick={() => { onNavigate(cur.action.nav[0], cur.action.nav[1]); onClose(); }} style={{ fontSize:12 }}>{cur.action.label}</button>}
            {step < steps.length-1 ? <button className="rg-btn rg-btn-primary" onClick={() => setStep(s=>s+1)} style={{ fontSize:12, background:cur.highlight, color:cur.highlight===T.lime||cur.highlight===T.amber?T.bg:'#fff' }}>Next →</button> : <button className="rg-btn rg-btn-primary" onClick={onClose} style={{ fontSize:12 }}>Enter Platform →</button>}
          </div>
        </div>
      </div>
    </div>
  </div>);
};

// ── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
const AdminDashboard = ({ onSelectCase }) => {
  const [regionTab, setRegionTab] = useState('table');
  return (<div className="fade-in">
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:24, flexWrap:'wrap', gap:10 }}>
      <div><div className="rg-page-title">National Enforcement Dashboard</div><div className="rg-page-sub">Ghana Rent Control Department · Live · 16 March 2026</div></div>
      <div style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 12px', background:T.greenFade, border:'1px solid rgba(15,168,106,0.2)', borderRadius:6 }}><div style={{ width:7, height:7, borderRadius:'50%', background:T.green }} className="pulse" /><span style={{ fontFamily:F.mono, fontSize:11, color:T.green, fontWeight:500 }}>LIVE</span></div>
    </div>
    <div className="rg-grid-4" style={{ marginBottom:20 }}>
      <StatCard val="38%" label="Tenancies Registered" change={12} color={T.amber} spark={[22,25,28,30,32,34,36,38]} />
      <StatCard val="29%" label="Rent Cards Issued" change={8} color={T.red} spark={[10,12,15,17,20,22,25,29]} />
      <StatCard val="312" label="Active Violations (Accra)" change={-5} color={T.red} spark={[280,330,350,320,310,340,295,312]} />
      <StatCard val="68" label="National Compliance Score" color={T.amber} spark={[58,60,62,63,65,65,67,68]} />
    </div>
    <div className="rg-grid-4" style={{ marginBottom:20 }}>
      <StatCard val="1,482" label="Properties Registered" change={4} color={T.green} spark={[1200,1250,1300,1340,1380,1420,1450,1482]} />
      <StatCard val="127" label="Open Cases" color={T.amber} spark={[90,110,120,115,130,118,124,127]} />
      <StatCard val="18" label="Officers Active Today" color={T.blue} spark={[12,14,16,15,18,17,16,18]} />
      <StatCard val="847" label="Advance Violations (MTD)" change={-3} color={T.red} spark={[700,750,820,860,840,810,830,847]} />
    </div>
    {/* Compliance Map */}
    <div className="rg-f" style={{ display:'flex', gap:16, marginBottom:16 }}>
      <div className="rg-card" style={{ flex:2, padding:20 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700 }}>Compliance Map</div>
          <div className="rg-tabs" style={{ borderBottom:'none' }}>
            {['table','map'].map(t => (<button key={t} className={`rg-tab${regionTab===t?' active':''}`} onClick={() => setRegionTab(t)} style={{ padding:'4px 12px', fontSize:11 }}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>))}
          </div>
        </div>
        {regionTab === 'table' ? (
          <div style={{ overflowX:'auto' }}><table className="rg-table"><thead><tr><th>Region</th><th>Registration</th><th>Rent Cards</th><th>Violations</th><th>Risk</th></tr></thead><tbody>{REGIONS.map((r,i) => (<tr key={i}><td><span style={{ fontFamily:F.mono, fontSize:12, fontWeight:600 }}>{r.name}</span></td><td><div style={{ display:'flex', alignItems:'center', gap:8 }}><div style={{ flex:1, height:4, background:T.border, borderRadius:2, overflow:'hidden', minWidth:60 }}><div style={{ height:'100%', width:`${r.reg}%`, background:r.reg>75?T.green:r.reg>55?T.amber:T.red, borderRadius:2 }} /></div><span style={{ fontFamily:F.mono, fontSize:11, color:T.t2, minWidth:32 }}>{r.reg}%</span></div></td><td><div style={{ display:'flex', alignItems:'center', gap:8 }}><div style={{ flex:1, height:4, background:T.border, borderRadius:2, overflow:'hidden', minWidth:60 }}><div style={{ height:'100%', width:`${r.cards}%`, background:r.cards>65?T.green:r.cards>45?T.amber:T.red, borderRadius:2 }} /></div><span style={{ fontFamily:F.mono, fontSize:11, color:T.t2, minWidth:32 }}>{r.cards}%</span></div></td><td><span style={{ fontFamily:F.mono, fontSize:12, fontWeight:700, color:r.violations>200?T.red:r.violations>80?T.amber:T.green }}>{r.violations}</span></td><td><span className={`rg-badge ${riskBadge(r.score)}`}>{r.risk}</span></td></tr>))}</tbody></table></div>
        ) : (
          <div className="rg-r" style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:6 }}>{REGIONS.map((r,i) => (<div key={i} style={{ borderRadius:6, padding:'10px 8px', background:r.risk==='high'?T.redFade:r.risk==='medium'?T.amberFade:T.greenFade, border:`1px solid ${r.risk==='high'?'rgba(229,72,58,0.2)':r.risk==='medium'?'rgba(232,144,10,0.2)':'rgba(15,168,106,0.2)'}`, textAlign:'center', cursor:'pointer' }}><div style={{ fontFamily:F.mono, fontSize:18, fontWeight:500, color:r.risk==='high'?T.red:r.risk==='medium'?T.amber:T.green }}>{r.cards}%</div><div style={{ fontSize:9, fontWeight:600, color:T.t2, marginTop:3, lineHeight:1.3 }}>{r.name}</div></div>))}</div>
        )}
      </div>
      <div className="rg-card" style={{ flex:1, padding:20 }}>
        <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:16 }}>Advance Rent Distribution</div>
        {[{ l:'≤1 month (legal)', pct:8, color:T.green },{ l:'2–6 months (legal)', pct:31, color:T.limeD },{ l:'7–12 months (illegal)', pct:38, color:T.amber },{ l:'13–24 months (illegal)', pct:23, color:T.red }].map((row,i) => (<div key={i} style={{ marginBottom:12 }}><div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}><span style={{ fontSize:12, color:T.t2 }}>{row.l}</span><span style={{ fontFamily:F.mono, fontSize:11, fontWeight:700, color:row.color }}>{row.pct}%</span></div><ProgressBar value={row.pct*2.5} color={row.color} /></div>))}
        <div style={{ marginTop:14, padding:'10px 12px', background:T.redFade, borderRadius:6, border:'1px solid rgba(229,72,58,0.15)' }}><div style={{ fontSize:11, fontWeight:600, color:T.red }}>61% of tracked tenancies</div><div style={{ fontSize:11, color:T.t2, marginTop:2, lineHeight:1.5 }}>show advance payments exceeding the 6-month legal cap under Act 220 s.16(5)</div></div>
      </div>
    </div>
    {/* Law vs Reality */}
    <div className="rg-card" style={{ padding:20, marginBottom:16 }}>
      <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:4 }}>Law vs. Reality</div>
      <div style={{ fontSize:12, color:T.t2, marginBottom:16 }}>Where enforcement gaps are largest — March 2026</div>
      <div style={{ overflowX:'auto' }}><table className="rg-table"><thead><tr><th>Legal Basis</th><th>What the Law Requires</th><th>Current Reality</th><th>Gap</th></tr></thead><tbody>
        {[{ law:'Act 220 s.16(5)', rule:'Max 6 months advance rent', reality:'Avg 9.2 months collected', gap:true },{ law:'PNDCL 138 s.5', rule:'Rent card for every tenancy', reality:'29% issued nationally', gap:true },{ law:'PNDCL 138 s.4', rule:'Register tenancy within 14 days', reality:'38% registered', gap:true },{ law:'Act 220 s.20', rule:'Landlord to furnish tenant list', reality:'11% compliance', gap:true },{ law:'Act 220 s.17', rule:'Property in habitable condition', reality:'72% passing inspection', gap:false }].map((p,i) => (<tr key={i}><td><span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>{p.law}</span></td><td style={{ fontSize:12 }}>{p.rule}</td><td><span style={{ fontSize:12, fontWeight:600, color:p.gap?T.red:T.green }}>{p.reality}</span></td><td><span className={`rg-badge ${p.gap?'rg-badge-red':'rg-badge-green'}`}>{p.gap?'ENFORCEMENT NEEDED':'COMPLIANT'}</span></td></tr>))}
      </tbody></table></div>
    </div>
    {/* Recent Cases */}
    <div className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
      <div className="rg-card" style={{ padding:20 }}>
        <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:16 }}>6-Month Compliance Trend</div>
        <TrendChart data={TREND_DATA} months={['Oct','Nov','Dec','Jan','Feb','Mar']} lines={[{ key:'cards', label:'Cards Issued (%)', color:T.green, fill:true },{ key:'violations', label:'Violations (÷10)', color:T.red, dashed:true }]} />
      </div>
      <div className="rg-card" style={{ padding:20 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}><div style={{ fontFamily:F.head, fontSize:14, fontWeight:700 }}>Recent Cases</div><span className="rg-badge rg-badge-red">{CASES.filter(c=>c.status==='received').length} unassigned</span></div>
        {CASES.slice(0,5).map((c,i) => (<div key={i} onClick={() => onSelectCase && onSelectCase(c)} style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', padding:'9px 0', borderBottom:i<4?`1px solid ${T.border}`:'none', cursor:'pointer' }}><div style={{ flex:1, paddingRight:10 }}><div style={{ fontSize:12, fontWeight:600, color:T.t1, marginBottom:2 }}>{caseTypeLabel(c.type)}</div><div style={{ fontFamily:F.mono, fontSize:10, color:T.t3 }}>{c.id.replace('RC-2026-ACC-','RC-')} · {c.district}</div></div><div style={{ textAlign:'right', flexShrink:0 }}><div style={{ fontSize:10, fontWeight:700, color:c.status==='received'?T.red:c.status==='under_investigation'?T.amber:T.green, textTransform:'uppercase', letterSpacing:0.8 }}>{statusLabel(c.status)}</div><div style={{ fontSize:10, color:T.t3, marginTop:2 }}>{c.opened}</div></div></div>))}
      </div>
    </div>
  </div>);
};

// ── ADMIN AUDIT LOG ──────────────────────────────────────────────────────────
const AdminAudit = () => (<div className="fade-in"><SectionHeader title="Audit Log" sub="All system actions · Immutable trail · Tamper-logged" /><div className="rg-card" style={{ padding:0 }}><div style={{ overflowX:'auto' }}><table className="rg-table"><thead><tr><th>Timestamp</th><th>Actor</th><th>Action</th><th>Entity</th><th>Detail</th></tr></thead><tbody>{AUDIT_LOG.map((entry,i) => (<tr key={i}><td><span style={{ fontFamily:F.mono, fontSize:11, color:T.t3 }}>{entry.ts}</span></td><td><span style={{ fontFamily:F.mono, fontSize:11, color:entry.actor==='System'?T.t2:T.green }}>{entry.actor}</span></td><td><span style={{ fontFamily:F.mono, fontSize:10, fontWeight:700, letterSpacing:0.5, color:entry.action.includes('VIOLATION')||entry.action.includes('COMPLAINT')?T.red:entry.action.includes('ISSUED')||entry.action.includes('RESOLVED')?T.green:T.amber }}>{entry.action}</span></td><td><span style={{ fontFamily:F.mono, fontSize:11, color:T.t2 }}>{entry.entity}</span></td><td><span style={{ fontSize:12, color:T.t2 }}>{entry.detail}</span></td></tr>))}</tbody></table></div></div></div>);

// ── ADMIN CASES ──────────────────────────────────────────────────────────────
const AdminCases = ({ onSelectCase }) => {
  const toast = useToast();
  return (<div className="fade-in">
    <SectionHeader title="Enforcement Cases" sub="All cases across all regions · Live feed" />
    <div className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
      <div className="rg-card" style={{ padding:20 }}><div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:16 }}>Case Trends — 12 Months</div><TrendChart data={TREND_DATA} months={TREND_DATA.months} lines={[{ key:'complaints', label:'Complaints Filed', color:T.red, fill:true },{ key:'resolved', label:'Resolved', color:T.green, fill:true }]} /></div>
      <div className="rg-card" style={{ padding:20 }}><div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:16 }}>Rent Card Adoption</div><TrendChart data={TREND_DATA} months={TREND_DATA.months} lines={[{ key:'cards', label:'Cards Issued (%)', color:T.green, fill:true },{ key:'violations', label:'Violations (÷10)', color:T.red, dashed:true }]} /></div>
    </div>
    <div className="rg-card" style={{ padding:0 }}>
      <div style={{ padding:'14px 20px', borderBottom:`1px solid ${T.border}`, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8 }}>
        <span style={{ fontFamily:F.head, fontSize:14, fontWeight:700 }}>All Cases</span>
        <div style={{ display:'flex', gap:8 }}><span className="rg-badge rg-badge-red">{CASES.filter(c=>c.status==='received').length} new</span><button className="rg-btn rg-btn-ghost" style={{ fontSize:11, padding:'4px 10px' }} onClick={exportCasesCSV}>Export CSV</button></div>
      </div>
      <div style={{ overflowX:'auto' }}><table className="rg-table rg-table-clickable"><thead><tr><th>Case ID</th><th>Type</th><th>Property</th><th>Severity</th><th>Source</th><th>Status</th><th>Opened</th></tr></thead><tbody>{CASES.map((c,i) => (<tr key={i} onClick={() => onSelectCase && onSelectCase(c)}><td><span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>{c.id.replace('RC-2026-ACC-','')}</span></td><td style={{ fontSize:12 }}>{caseTypeLabel(c.type)}</td><td><div style={{ fontSize:12, color:T.t1 }}>{c.property}</div><div style={{ fontSize:11, color:T.t3 }}>{c.landlord}</div></td><td><span className={`rg-badge ${c.sev==='critical'||c.sev==='high'?'rg-badge-red':c.sev==='medium'?'rg-badge-amber':'rg-badge-muted'}`}>{c.sev}</span></td><td><span className="rg-badge rg-badge-muted">{c.src.replace(/_/g,' ')}</span></td><td><span className={`rg-badge ${statusBadge(c.status)}`}>{statusLabel(c.status)}</span></td><td><span style={{ fontFamily:F.mono, fontSize:11, color:T.t3 }}>{c.opened}</span></td></tr>))}</tbody></table></div>
    </div>
  </div>);
};

// ── CASE DETAIL ──────────────────────────────────────────────────────────────
const CaseDetail = ({ caseData, onBack }) => {
  const toast = useToast();
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState(CASE_NOTES[caseData.id] || []);
  const [status, setStatus] = useState(caseData.status);
  const caseState = useCaseState();
  const statusFlow = ['received','under_investigation','notice_issued','referred_to_court','resolved'];
  const curIdx = statusFlow.indexOf(status);

  const advanceStatus = () => {
    if (curIdx < statusFlow.length - 1) {
      const newStatus = statusFlow[curIdx + 1];
      setStatus(newStatus);
      caseState.advanceCaseStatus(caseData.id, newStatus);
      toast('Status: ' + newStatus.replace(/_/g,' '), 'success');
    }
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes(prev => [...prev, { ts:new Date().toISOString().slice(0,16).replace('T',' '), by:'Mgr. Acheampong', note:newNote }]);
    setNewNote('');
    toast('Note added', 'success');
  };

  return (<div className="fade-in">
    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
      <button onClick={onBack} className="rg-btn rg-btn-ghost" style={{ fontSize:11, padding:'5px 12px' }}>← Cases</button>
      <div style={{ flex:1 }}><div style={{ fontFamily:F.mono, fontSize:12, color:T.green, marginBottom:2 }}>{caseData.id}</div><div style={{ fontFamily:F.head, fontSize:20, fontWeight:700 }}>{caseTypeLabel(caseData.type)}</div></div>
      <span className={`rg-badge ${caseData.sev==='critical'||caseData.sev==='high'?'rg-badge-red':caseData.sev==='medium'?'rg-badge-amber':'rg-badge-muted'}`} style={{ fontSize:11, padding:'5px 10px' }}>{caseData.sev}</span>
    </div>
    {/* Status timeline */}
    <div className="rg-card" style={{ padding:20, marginBottom:16 }}>
      <div style={{ fontFamily:F.head, fontSize:12, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:16 }}>Case Status</div>
      <div style={{ display:'flex', alignItems:'center', overflowX:'auto', paddingBottom:4 }}>
        {statusFlow.map((s,i) => { const done = i<=curIdx; const current = i===curIdx; return (<div key={s} style={{ display:'flex', alignItems:'center', flex:i<statusFlow.length-1?1:'none' }}><div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}><div style={{ width:28, height:28, borderRadius:'50%', background:done?T.green:T.border, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:current?'0 0 0 3px rgba(15,168,106,0.25)':undefined, transition:'all 0.3s' }}>{done && <span style={{ fontSize:12, color:'#fff' }}>✓</span>}</div><span style={{ fontSize:9, fontWeight:700, color:done?T.green:T.t3, letterSpacing:0.5, textTransform:'uppercase', textAlign:'center', maxWidth:72, lineHeight:1.3 }}>{s.replace(/_/g,' ')}</span></div>{i<statusFlow.length-1 && <div style={{ flex:1, height:2, background:i<curIdx?T.green:T.border, margin:'0 4px', marginBottom:22, transition:'background 0.3s' }} />}</div>); })}
      </div>
      <div style={{ display:'flex', gap:8, marginTop:16, flexWrap:'wrap' }}>
        {curIdx<statusFlow.length-1 && <button className="rg-btn rg-btn-primary" onClick={advanceStatus}>Advance → {statusFlow[curIdx+1].replace(/_/g,' ')}</button>}
        <button className="rg-btn rg-btn-ghost" style={{ fontSize:12 }} onClick={() => toast('Open Assign Officers page to route this case','info')}>Assign Officer</button>
        <button className="rg-btn rg-btn-danger" style={{ fontSize:12 }} onClick={() => toast('Case referred to Rent and Housing Committee','warning')}>Refer to Court</button>
      </div>
    </div>
    <div className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:16 }}>
      {/* Case details */}
      <div className="rg-card" style={{ padding:20 }}>
        <div style={{ fontFamily:F.head, fontSize:12, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:14 }}>Case Details</div>
        <InfoRow label="Case Type" value={caseTypeLabel(caseData.type)} /><InfoRow label="Property" value={caseData.property} /><InfoRow label="Landlord" value={caseData.landlord} /><InfoRow label="District" value={caseData.district} /><InfoRow label="Source" value={caseData.src.replace(/_/g,' ')} mono /><InfoRow label="Opened" value={caseData.opened} mono /><InfoRow label="Assigned" value={caseData.assigned || 'Unassigned'} color={caseData.assigned?T.t1:T.red} />
        {caseData.advance > 6 && (<div style={{ marginTop:14, padding:'12px 14px', background:T.redFade, border:'1px solid rgba(229,72,58,0.2)', borderRadius:8 }}><div style={{ fontSize:11, fontWeight:700, color:T.red, marginBottom:4 }}>Advance Rent Calculation</div><div className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:8 }}><div style={{ background:T.bg, borderRadius:6, padding:'8px 10px' }}><div style={{ fontFamily:F.mono, fontSize:16, color:T.red }}>{caseData.advance}</div><div style={{ fontSize:9, color:T.t3, fontWeight:700, letterSpacing:1, textTransform:'uppercase', marginTop:2 }}>Months Collected</div></div><div style={{ background:T.bg, borderRadius:6, padding:'8px 10px' }}><div style={{ fontFamily:F.mono, fontSize:16, color:T.amber }}>6</div><div style={{ fontSize:9, color:T.t3, fontWeight:700, letterSpacing:1, textTransform:'uppercase', marginTop:2 }}>Legal Cap (months)</div></div></div><div style={{ marginTop:10, fontSize:12, color:T.t2, lineHeight:1.6 }}>Excess: ~GH₵ {((caseData.advance-6)*1800).toLocaleString()} · Act 220 s.16(5) breach</div></div>)}
      </div>
      {/* Timeline */}
      <div className="rg-card" style={{ padding:20 }}>
        <div style={{ fontFamily:F.head, fontSize:12, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:14 }}>Case Timeline</div>
        <div style={{ maxHeight:280, overflowY:'auto', paddingRight:4 }}>
          {notes.length > 0 ? notes.map((n,i) => (<div key={i} style={{ display:'flex', gap:12, marginBottom:14 }}><div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}><div style={{ width:8, height:8, borderRadius:'50%', background:n.by==='System'?T.t3:n.by.includes('Ofc')?T.green:T.blue, marginTop:3 }} />{i<notes.length-1 && <div style={{ width:1, flex:1, background:T.border, marginTop:4 }} />}</div><div style={{ flex:1, paddingBottom:i<notes.length-1?12:0 }}><div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}><span style={{ fontFamily:F.mono, fontSize:10, color:n.by==='System'?T.t3:n.by.includes('Ofc')?T.green:T.blue, fontWeight:600 }}>{n.by}</span><span style={{ fontFamily:F.mono, fontSize:9, color:T.t3 }}>{n.ts}</span></div><div style={{ fontSize:12, color:T.t2, lineHeight:1.6 }}>{n.note}</div></div></div>)) : <EmptyState icon="NOTE" text="No notes yet" />}
        </div>
        <div style={{ marginTop:12 }}>
          <textarea value={newNote} onChange={e => setNewNote(e.target.value)} className="rg-textarea" rows={2} placeholder="Add case note…" />
          <div style={{ display:'flex', justifyContent:'flex-end', marginTop:8 }}><button className="rg-btn rg-btn-primary" style={{ fontSize:11 }} disabled={!newNote.trim()} onClick={addNote}>Add Note</button></div>
        </div>
      </div>
    </div>
  </div>);
};

// ── CASE MANAGER VIEW ────────────────────────────────────────────────────────
const CaseManager = ({ onSelectCase }) => {
  const toast = useToast();
  const [tab, setTab] = useState('queue');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const filtered = CASES.filter(c => filter==='all' || c.status===filter || (filter==='unassigned'&&!c.assigned));
  return (<div className="fade-in">
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:20 }}>
      <div><div className="rg-page-title">Case Management</div><div className="rg-page-sub">Triage · Assign · Resolve · Track</div></div>
      <div style={{ display:'flex', gap:8 }}><span className="rg-badge rg-badge-red">{CASES.filter(c=>c.status==='received').length} NEW</span><span className="rg-badge rg-badge-amber">{CASES.filter(c=>c.status==='under_investigation').length} INVESTIGATING</span></div>
    </div>
    <div className="rg-tabs" style={{ marginBottom:16 }}>
      {[['queue','Case Queue'],['properties','Properties'],['risk','Risk Register']].map(([id,lbl]) => (<button key={id} className={`rg-tab${tab===id?' active':''}`} onClick={() => setTab(id)}>{lbl}</button>))}
    </div>
    {tab === 'queue' && (<>
      <div style={{ display:'flex', gap:6, marginBottom:16, flexWrap:'wrap' }}>
        {['all','received','under_investigation','notice_issued','resolved','unassigned'].map(f => (<button key={f} onClick={() => setFilter(f)} className={`rg-btn ${filter===f?'rg-btn-primary':'rg-btn-ghost'}`} style={{ fontSize:11, padding:'5px 12px' }}>{f==='all'?'All':f==='unassigned'?'Unassigned':statusLabel(f).replace(/^\w/,c=>c.toUpperCase())}</button>))}
      </div>
      <div className="rg-card" style={{ padding:0 }}>
        <div style={{ overflowX:'auto' }}><table className="rg-table rg-table-clickable"><thead><tr><th>Case ID</th><th>Type</th><th>Property</th><th>District</th><th>Sev.</th><th>Status</th><th>Opened</th><th>Officer</th></tr></thead><tbody>
          {filtered.map((c,i) => (<tr key={i} onClick={() => onSelectCase ? onSelectCase(c) : setSelected(c)}><td><span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>{c.id.split('-').slice(-1)[0]}</span></td><td style={{ fontSize:12 }}>{caseTypeLabel(c.type)}</td><td><div style={{ fontSize:12 }}>{c.property}</div><div style={{ fontSize:11, color:T.t3 }}>{c.landlord}</div></td><td style={{ fontSize:11, color:T.t2 }}>{c.district}</td><td><span className={`rg-badge ${c.sev==='critical'||c.sev==='high'?'rg-badge-red':c.sev==='medium'?'rg-badge-amber':'rg-badge-muted'}`}>{c.sev}</span></td><td><span className={`rg-badge ${statusBadge(c.status)}`}>{statusLabel(c.status)}</span></td><td><span style={{ fontFamily:F.mono, fontSize:11, color:T.t3 }}>{c.opened}</span></td><td><span style={{ fontSize:12, color:c.assigned?T.t2:T.red }}>{c.assigned||'Unassigned'}</span></td></tr>))}
        </tbody></table></div>
      </div>
    </>)}
    {tab === 'properties' && (<div className="rg-card" style={{ padding:0 }}><div style={{ overflowX:'auto' }}><table className="rg-table"><thead><tr><th>Property</th><th>MMDA</th><th>Units</th><th>Cards</th><th>Advance</th><th>Risk</th><th>Violations</th></tr></thead><tbody>{PROPERTIES.map((p,i) => (<tr key={i}><td><div style={{ fontSize:12, fontWeight:600 }}>{p.address}</div><div style={{ fontSize:11, color:T.t3 }}>{p.landlord}</div></td><td style={{ fontSize:12, color:T.t2 }}>{p.mmda}</td><td style={{ fontFamily:F.mono, fontSize:12 }}>{p.units}</td><td style={{ fontFamily:F.mono, fontSize:12, color:p.cards===p.tenancies?T.green:T.amber }}>{p.cards}/{p.tenancies}</td><td><span style={{ fontFamily:F.mono, fontSize:12, fontWeight:700, color:p.advance>6?T.red:T.green }}>{p.advance} mo</span></td><td><div className="risk-bar"><div className="risk-bar-track"><div className="risk-bar-fill" style={{ width:`${p.risk}%`, background:riskColor(p.risk) }} /></div><span style={{ fontFamily:F.mono, fontSize:11, color:riskColor(p.risk), minWidth:24 }}>{p.risk}</span></div></td><td style={{ fontFamily:F.mono, fontSize:12, color:p.violations>0?T.red:T.green }}>{p.violations}</td></tr>))}</tbody></table></div></div>)}
    {tab === 'risk' && (<div className="rg-card" style={{ padding:0 }}><div style={{ overflowX:'auto' }}><table className="rg-table"><thead><tr><th>Landlord</th><th>ID</th><th>Properties</th><th>Open Cases</th><th>Risk Score</th><th>GRA Flag</th><th>Action</th></tr></thead><tbody>{[...PROPERTIES].sort((a,b)=>b.risk-a.risk).map((p,i) => (<tr key={i}><td style={{ fontFamily:F.mono, fontSize:12, fontWeight:600 }}>{p.landlord}</td><td><span style={{ fontFamily:F.mono, fontSize:11, color:T.t3 }}>{p.lid}</span></td><td style={{ fontFamily:F.mono, fontSize:12 }}>{p.units}</td><td style={{ fontFamily:F.mono, fontSize:12, color:p.complaints>0?T.red:T.green }}>{p.complaints}</td><td><div className="risk-bar" style={{ minWidth:120 }}><div className="risk-bar-track"><div className="risk-bar-fill" style={{ width:`${p.risk}%`, background:riskColor(p.risk) }} /></div><span style={{ fontFamily:F.mono, fontSize:12, fontWeight:700, color:riskColor(p.risk), minWidth:28 }}>{p.risk}</span></div></td><td>{p.units>=3?<span className="rg-badge rg-badge-amber">Flagged</span>:<span style={{ color:T.t3, fontSize:12 }}>—</span>}</td><td><button className={`rg-btn ${p.risk>=70?'rg-btn-danger':'rg-btn-ghost'}`} style={{ padding:'4px 10px', fontSize:11 }} onClick={() => toast(p.risk>=70?`Inspection assigned for ${p.address}`:`Inspection scheduled for ${p.address}`,'info')}>{p.risk>=70?'Inspect Now':'Schedule'}</button></td></tr>))}</tbody></table></div></div>)}
    {/* Case detail modal */}
    {selected && (<div className="rg-modal-overlay" onClick={() => setSelected(null)}><div className="rg-modal slide-up" onClick={e => e.stopPropagation()} style={{ maxWidth:520 }}><div className="rg-modal-header"><div><div style={{ fontFamily:F.mono, fontSize:12, color:T.green, marginBottom:4 }}>{selected.id}</div><div style={{ fontFamily:F.head, fontSize:16, fontWeight:700 }}>{caseTypeLabel(selected.type)}</div></div><div style={{ display:'flex', gap:8 }}><span className={`rg-badge ${selected.sev==='critical'||selected.sev==='high'?'rg-badge-red':'rg-badge-amber'}`}>{selected.sev}</span><button onClick={() => setSelected(null)} style={{ background:'transparent', border:'none', color:T.t3, fontSize:18, cursor:'pointer' }}>×</button></div></div><div className="rg-modal-body">{[['Property',selected.property],['Landlord',selected.landlord],['District',selected.district],['Status',statusLabel(selected.status)],['Opened',selected.opened],['Officer',selected.assigned||'Unassigned']].map(([l,v],i) => (<InfoRow key={i} label={l} value={v} mono={l==='Opened'} />))}{selected.advance>6 && (<div style={{ marginTop:14, padding:'12px 14px', background:T.redFade, border:'1px solid rgba(229,72,58,0.2)', borderRadius:6 }}><div style={{ fontSize:12, fontWeight:700, color:T.red, marginBottom:4 }}>Advance Rent Violation</div><div style={{ fontSize:12, color:T.t2, lineHeight:1.6 }}>{selected.advance} months collected. Legal cap: 6 months. Excess: {((selected.advance-6)*1800).toLocaleString()} GHS est.</div></div>)}<div style={{ display:'flex', gap:8, marginTop:18 }}><button className="rg-btn rg-btn-primary" style={{ flex:1 }} onClick={() => { onSelectCase(selected); setSelected(null); }}>Open Full Detail</button><button className="rg-btn rg-btn-danger" onClick={() => toast('Case referred to Rent and Housing Committee','warning')}>Refer Court</button></div></div></div></div>)}
  </div>);
};

// ── OFFICER MOBILE ───────────────────────────────────────────────────────────
const OfficerMobile = () => {
  const toast = useToast();
  const [screen, setScreen] = useState('home');
  const [scanInput, setScanInput] = useState('');
  const [selected, setSelected] = useState(null);
  const [checks, setChecks] = useState({});
  const [violType, setViolType] = useState('');
  const [evidenceNotes, setEvidenceNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const failedReq = CHECKLIST.filter(c => c.required && checks[c.id] === false);
  const doSubmit = () => { setSubmitting(true); setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1400); };

  const PhoneStatusBar = () => (<div style={{ height:28, background:T.bg, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 16px', flexShrink:0 }}><span style={{ fontFamily:F.mono, fontSize:10, color:T.t3 }}>09:42</span><div style={{ display:'flex', alignItems:'center', gap:6 }}><div style={{ width:7, height:7, borderRadius:'50%', background:T.green }} className="pulse" /><span style={{ fontFamily:F.mono, fontSize:9, color:T.green }}>SYNC</span><span style={{ fontFamily:F.mono, fontSize:9, color:T.t3 }}>4G</span></div></div>);
  const PhoneHeader = ({ title, back }) => (<div style={{ padding:'10px 16px 12px', background:T.surface, borderBottom:`1px solid ${T.border}`, flexShrink:0 }}>{back && <button onClick={back} style={{ background:'transparent', border:'none', color:T.t3, fontSize:12, marginBottom:6, padding:0, display:'block', cursor:'pointer' }}>← Back</button>}<div style={{ fontFamily:F.head, fontSize:15, fontWeight:700, color:T.t1 }}>{title}</div><div style={{ fontSize:11, color:T.green, marginTop:2 }}>Ofc. Kofi Mensah · Ayawaso East</div></div>);

  // HOME SCREEN
  const HomeScreen = () => (<><PhoneStatusBar /><PhoneHeader title="Today's Shift" /><div style={{ flex:1, overflowY:'auto', padding:14 }}>
    <div style={{ fontFamily:F.mono, fontSize:9, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:12 }}>Monday 16 Mar · Shift: 08:30 — 16:00</div>
    <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:8, padding:14, marginBottom:14 }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}><span style={{ fontSize:12, fontWeight:700, color:T.t1 }}>Route Progress</span><span style={{ fontFamily:F.mono, fontSize:12, color:T.green }}>3 / 8</span></div>
      <div style={{ height:6, background:T.border, borderRadius:3, overflow:'hidden' }}><div style={{ height:'100%', width:'37.5%', background:T.green, borderRadius:3 }} /></div>
      <div style={{ display:'flex', gap:16, marginTop:12 }}>{[['3','Inspected',T.green],['2','Cases',T.red],['5','Remaining',T.t3]].map(([v,l,c],i) => (<div key={i}><div style={{ fontFamily:F.mono, fontSize:18, fontWeight:500, color:c }}>{v}</div><div style={{ fontSize:9, color:T.t3, fontWeight:700, letterSpacing:1, textTransform:'uppercase', marginTop:2 }}>{l}</div></div>))}</div>
    </div>
    <div style={{ marginTop:14, background:T.redFade, border:'1px solid rgba(229,72,58,0.2)', borderLeft:`3px solid ${T.red}`, borderRadius:6, padding:'12px 14px' }}>
      <div style={{ fontFamily:F.mono, fontSize:9, color:T.red, letterSpacing:1.5, textTransform:'uppercase', marginBottom:6 }}>Next Priority Stop</div>
      <div style={{ fontSize:12, fontWeight:700, color:T.t1, marginBottom:3 }}>22 Dzorwulu Crescent, Accra</div>
      <div style={{ fontSize:11, color:T.t2 }}>P-003 · Risk 96 · 12 units · 0 rent cards · Unregistered</div>
    </div>
  </div></>);

  // SCAN / INSPECT
  const ScanScreen = () => (<><PhoneStatusBar /><PhoneHeader title="Inspect Property" back={() => setScreen('home')} /><div style={{ flex:1, overflowY:'auto', padding:14 }}>
    <div style={{ fontSize:12, fontWeight:600, color:T.t1, marginBottom:8 }}>Enter Property ID or Landlord ID</div>
    <div style={{ display:'flex', gap:8, marginBottom:16 }}><input value={scanInput} onChange={e => setScanInput(e.target.value)} onKeyDown={e => { if(e.key==='Enter'){ const m=PROPERTIES.find(p=>p.id.toLowerCase()===scanInput.toLowerCase()||p.lid.toLowerCase()===scanInput.toLowerCase()); setSelected(m||null); setScreen('property'); }}} placeholder="e.g. P-001 or L-2291" className="rg-input" style={{ flex:1, fontSize:12 }} /><button className="rg-btn rg-btn-primary" style={{ fontSize:12, flexShrink:0 }} onClick={() => { const m=PROPERTIES.find(p=>p.id.toLowerCase()===scanInput.toLowerCase()||p.lid.toLowerCase()===scanInput.toLowerCase()); setSelected(m||null); setScreen('property'); }}>Go</button></div>
    <div style={{ fontSize:10, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:8 }}>Quick Select</div>
    {PROPERTIES.slice(0,6).map((p,i) => (<div key={i} onClick={() => { setSelected(p); setScreen('property'); }} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:`1px solid ${T.border}`, cursor:'pointer' }}><div><div style={{ fontSize:11, fontWeight:600, color:T.t1 }}>{p.address}</div><div style={{ fontFamily:F.mono, fontSize:10, color:T.t3 }}>{p.id} · {p.landlord}</div></div><span className={`rg-badge ${riskBadge(p.risk)}`}>{riskLabel(p.risk)}</span></div>))}
  </div></>);

  // PROPERTY DETAIL
  const PropertyScreen = () => {
    if (!selected) return (<><PhoneStatusBar /><PhoneHeader title="Not Found" back={() => setScreen('scan')} /><div style={{ padding:16 }}><div style={{ color:T.red, fontSize:13, fontWeight:700, marginBottom:8 }}>Property not in registry</div><div style={{ fontSize:12, color:T.t2, lineHeight:1.6 }}>This ID is not found. May indicate an unregistered tenancy — flag for follow-up.</div></div></>);
    return (<><PhoneStatusBar /><PhoneHeader title="Property Detail" back={() => { setScreen('home'); setSelected(null); setChecks({}); }} /><div style={{ flex:1, overflowY:'auto', padding:12 }}>
      <div style={{ background:riskColor(selected.risk), borderRadius:6, padding:'8px 12px', marginBottom:10, display:'flex', justifyContent:'space-between', alignItems:'center' }}><span style={{ fontSize:11, fontWeight:800, color:'#fff', textTransform:'uppercase' }}>{riskLabel(selected.risk)} Risk Property</span><span style={{ fontFamily:F.mono, fontSize:16, fontWeight:700, color:'#fff' }}>{selected.risk}</span></div>
      <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:8, padding:12, marginBottom:10 }}>
        <div style={{ fontSize:12, fontWeight:700, color:T.t1, marginBottom:8 }}>{selected.address}</div>
        {[['Property ID',selected.id],['MMDA',selected.mmda],['Landlord',selected.landlord],['Registered',selected.registered?'✓ Yes':'✗ NO'],['Rent Cards',`${selected.cards}/${selected.tenancies}`],['Avg Advance',selected.advance+' mo'],['Complaints',String(selected.complaints)]].map(([l,v],i) => (<div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'5px 0', borderBottom:'1px solid rgba(36,54,40,0.3)' }}><span style={{ fontSize:10, color:T.t3 }}>{l}</span><span style={{ fontFamily:F.mono, fontSize:11, fontWeight:700, color:v==='✗ NO'?T.red:v==='✓ Yes'?T.green:(l==='Avg Advance'&&selected.advance>6)?T.red:T.t1 }}>{v}</span></div>))}
      </div>
      {selected.violations > 0 && (<div style={{ marginBottom:10 }}><div style={{ fontSize:10, fontWeight:700, color:T.red, letterSpacing:1.5, textTransform:'uppercase', marginBottom:8 }}>Detected Issues</div>{selected.advance>6 && <div style={{ padding:'7px 10px', background:T.redFade, borderLeft:`3px solid ${T.red}`, borderRadius:4, marginBottom:6, fontSize:11, color:T.t1, lineHeight:1.4 }}>Advance rent {selected.advance} months — exceeds 6-month cap (Act 220 s.16)</div>}{selected.cards<selected.tenancies && <div style={{ padding:'7px 10px', background:T.redFade, borderLeft:`3px solid ${T.red}`, borderRadius:4, marginBottom:6, fontSize:11, color:T.t1, lineHeight:1.4 }}>{selected.tenancies-selected.cards} units have no rent card (PNDCL 138 s.5)</div>}{!selected.registered && <div style={{ padding:'7px 10px', background:T.redFade, borderLeft:`3px solid ${T.red}`, borderRadius:4, marginBottom:6, fontSize:11, color:T.t1, lineHeight:1.4 }}>Property NOT registered with Rent Control</div>}</div>)}
      {selected.violations === 0 && (<div style={{ padding:12, background:T.greenFade, border:'1px solid rgba(15,168,106,0.2)', borderRadius:8, marginBottom:10, display:'flex', gap:8, alignItems:'center' }}><span style={{ fontSize:18, color:T.green }}>✓</span><div><div style={{ fontSize:12, fontWeight:700, color:T.green }}>Fully Compliant</div><div style={{ fontSize:11, color:T.t2 }}>Last inspection: {selected.lastInsp}</div></div></div>)}
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        <button className="rg-btn rg-btn-primary" style={{ justifyContent:'center' }} onClick={() => setScreen('checklist')}>Run Inspection Checklist</button>
        {selected.violations > 0 && <button className="rg-btn rg-btn-danger" style={{ justifyContent:'center' }} onClick={() => setScreen('violation')}>File Violation Case</button>}
        <button className="rg-btn rg-btn-ghost" style={{ justifyContent:'center' }} onClick={() => toast('Inspection logged — no violations recorded','success')}>Mark Inspected — No Action</button>
      </div>
    </div></>);
  };

  // CHECKLIST
  const ChecklistScreen = () => (<><PhoneStatusBar /><PhoneHeader title="Inspection Checklist" back={() => setScreen('property')} /><div style={{ flex:1, overflowY:'auto', padding:'12px 14px' }}>
    <div style={{ fontSize:11, color:T.t2, marginBottom:12, lineHeight:1.5 }}>Toggle each item. Failed required items auto-generate a case.</div>
    {CHECKLIST.map(item => { const val=checks[item.id]; const isOff=val===false; return (<div key={item.id} className="rg-checklist-row"><button onClick={() => setChecks(p => ({...p,[item.id]:val===true?false:val===false?undefined:true}))} className={`rg-toggle ${val===true?'rg-toggle-on':val===false?'rg-toggle-off':'rg-toggle-neutral'}`}><div className="rg-toggle-thumb" style={{ left:val===true?'18px':val===false?'2px':'10px' }} /></button><div style={{ flex:1 }}><div style={{ fontSize:12, fontWeight:600, color:isOff?T.red:val===true?T.green:T.t1, lineHeight:1.3 }}>{item.label}</div><div style={{ fontSize:10, color:T.t3, marginTop:2 }}>{item.law}{item.required?' · Required':''}</div></div></div>); })}
    {failedReq.length > 0 && (<div style={{ marginTop:12, padding:'10px 12px', background:T.redFade, border:'1px solid rgba(229,72,58,0.2)', borderRadius:6 }}><div style={{ fontSize:11, fontWeight:700, color:T.red, marginBottom:4 }}>{failedReq.length} violation{failedReq.length!==1?'s':''} flagged</div><div style={{ fontSize:10, color:T.t2 }}>Cases will be auto-generated and synced.</div></div>)}
    <button className="rg-btn rg-btn-primary" style={{ width:'100%', justifyContent:'center', marginTop:14 }} onClick={doSubmit}>{submitting?'Saving…':'Submit Inspection'}</button>
    {submitted && <div style={{ marginTop:10, fontSize:12, color:T.green, textAlign:'center', fontWeight:600 }}>✓ Saved and queued for sync</div>}
  </div></>);

  // VIOLATION FILING
  const ViolationScreen = () => (<><PhoneStatusBar /><PhoneHeader title="File Violation" back={() => setScreen('property')} /><div style={{ flex:1, overflowY:'auto', padding:14 }}>
    {submitted ? (<div style={{ textAlign:'center', padding:'24px 0' }} className="fade-in"><div style={{ fontFamily:F.mono, fontSize:11, fontWeight:700, color:T.green, letterSpacing:2, marginBottom:12 }}>SUBMITTED</div><div style={{ fontFamily:F.head, fontSize:16, fontWeight:700, color:T.green, marginBottom:6 }}>Case Filed</div><div style={{ fontFamily:F.mono, fontSize:12, color:T.lime, marginBottom:14 }}>Case ID: RC-2026-ACC-00293</div><div style={{ fontSize:12, color:T.t2, lineHeight:1.65, marginBottom:18 }}>Routed to Rent Control Case Manager. GRA flag applied. Expected response: 48hrs.</div><button className="rg-btn rg-btn-primary" style={{ justifyContent:'center' }} onClick={() => { setSubmitted(false); setViolType(''); setEvidenceNotes(''); setScreen('home'); }}>Done</button></div>) : (<>
      <div style={{ fontSize:10, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:8 }}>Violation Type</div>
      {['Excessive Advance Rent (Act 220 s.16)','No Rent Card Issued (PNDCL 138 s.5)','Unregistered Tenancy (PNDCL 138 s.4)','No Tenancy Agreement','Unlawful Eviction'].map((v,i) => (<div key={i} onClick={() => setViolType(v)} style={{ display:'flex', gap:10, alignItems:'center', padding:'10px 12px', marginBottom:6, borderRadius:6, cursor:'pointer', background:violType===v?T.redFade:T.card, border:`1px solid ${violType===v?'rgba(229,72,58,0.3)':T.border}` }}><div style={{ width:13, height:13, borderRadius:'50%', border:`2px solid ${violType===v?T.red:T.border}`, background:violType===v?T.red:'transparent', flexShrink:0 }} /><span style={{ fontSize:12, color:violType===v?T.t1:T.t2 }}>{v}</span></div>))}
      <div style={{ fontSize:10, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:6, marginTop:12 }}>Evidence Notes</div>
      <textarea value={evidenceNotes} onChange={e => setEvidenceNotes(e.target.value)} className="rg-textarea" rows={3} placeholder="Describe observations…" />
      <div style={{ display:'flex', gap:8, marginTop:10, marginBottom:14 }}>
        <div style={{ flex:1, padding:'9px 10px', background:T.greenFade, border:'1px solid rgba(15,168,106,0.2)', borderRadius:6, display:'flex', gap:7, alignItems:'center' }}><span style={{ color:T.green, fontSize:13 }}>◎</span><span style={{ fontFamily:F.mono, fontSize:10, color:T.green }}>GPS: 5.558, -0.187</span></div>
        <button className="rg-btn rg-btn-ghost" style={{ fontSize:11 }} onClick={() => toast('Camera opened — photo captured','success')}>+ Photo</button>
      </div>
      <button disabled={!violType} className={`rg-btn ${violType?'rg-btn-danger':'rg-btn-ghost'}`} style={{ width:'100%', justifyContent:'center' }} onClick={doSubmit}>{submitting?'Submitting…':'Submit to Rent Control →'}</button>
    </>)}
  </div></>);

  // MAP
  const MapScreen = () => {
    const [hovered, setHovered] = useState(null);
    const cells = [{ id:'P-003', label:'22 Dzorwulu', risk:96, x:2, y:1 },{ id:'P-001', label:'14 Osu Ako-Adjei', risk:87, x:4, y:2 },{ id:'P-005', label:'19 Spintex Rd', risk:73, x:6, y:1 },{ id:'P-002', label:'7 Labone Close', risk:42, x:3, y:3 },{ id:'P-004', label:'4 Ring Rd West', risk:12, x:5, y:4 }];
    const col = (risk) => risk>=70?T.red:risk>=40?T.amber:T.green;
    return (<div style={{ padding:14, height:'100%', display:'flex', flexDirection:'column' }}>
      <div style={{ fontFamily:F.mono, fontSize:9, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:10 }}>Ayawaso East · Route Map</div>
      <div style={{ flex:1, background:T.bg, borderRadius:8, border:`1px solid ${T.border}`, position:'relative', overflow:'hidden', minHeight:200 }}>
        {[...Array(6)].map((_,i) => (<div key={i} style={{ position:'absolute', top:0, bottom:0, left:`${(i+1)*14.28}%`, borderLeft:'1px solid rgba(36,54,40,0.3)' }} />))}
        {cells.map((cell,i) => (<div key={i} onMouseEnter={() => setHovered(cell)} onMouseLeave={() => setHovered(null)} style={{ position:'absolute', left:`${cell.x*13+5}%`, top:`${cell.y*18+5}%`, display:'flex', flexDirection:'column', alignItems:'center', gap:3, cursor:'pointer', zIndex:2 }}>{cell.risk>=70 && <div style={{ position:'absolute', width:28, height:28, borderRadius:'50%', border:`2px solid ${col(cell.risk)}`, opacity:0.3, animation:'pulse 2s infinite' }} />}<div style={{ width:20, height:20, borderRadius:'50%', background:col(cell.risk), border:`2px solid ${hovered?.id===cell.id?'#fff':col(cell.risk)}`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:F.mono, fontSize:9, fontWeight:700, color:'#fff', boxShadow:`0 0 12px ${col(cell.risk)}44` }}>{cell.risk}</div><div style={{ fontFamily:F.mono, fontSize:7, color:'rgba(255,255,255,0.5)', letterSpacing:0.5, textAlign:'center', maxWidth:60, lineHeight:1.3 }}>{cell.label}</div></div>))}
        <div style={{ position:'absolute', left:'32%', top:'55%', display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}><div style={{ width:14, height:14, borderRadius:'50%', background:T.lime, border:'2px solid #fff', boxShadow:'0 0 10px #C8E83066' }} className="pulse" /><div style={{ fontFamily:F.mono, fontSize:7, color:T.lime, letterSpacing:1 }}>YOU</div></div>
      </div>
      <div style={{ display:'flex', gap:12, marginTop:10, justifyContent:'center' }}>{[['#E5483A','High'],['#E8900A','Medium'],['#0FA86A','Low'],['#C8E830','You']].map(([c,l],i) => (<div key={i} style={{ display:'flex', alignItems:'center', gap:4 }}><div style={{ width:8, height:8, borderRadius:'50%', background:c }} /><span style={{ fontFamily:F.mono, fontSize:9, color:T.t3 }}>{l}</span></div>))}</div>
      <div style={{ marginTop:10 }}><div style={{ fontFamily:F.mono, fontSize:9, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:8 }}>Priority Route</div>{[...cells].sort((a,b)=>b.risk-a.risk).map((c,i) => (<div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid rgba(36,54,40,0.3)' }}><div style={{ display:'flex', gap:8, alignItems:'center' }}><div style={{ fontFamily:F.mono, fontSize:10, color:T.t3 }}>{String(i+1).padStart(2,'0')}</div><span style={{ fontSize:11, color:T.t1 }}>{c.label}</span></div><span style={{ fontFamily:F.mono, fontSize:10, fontWeight:700, color:col(c.risk) }}>{c.risk}</span></div>))}</div>
    </div>);
  };

  // CASES
  const CasesScreen = () => (<><PhoneStatusBar /><PhoneHeader title="My Cases" /><div style={{ flex:1, overflowY:'auto', padding:'12px 14px' }}>
    <div style={{ fontFamily:F.mono, fontSize:9, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:10 }}>{CASES.length} cases · {CASES.filter(c=>c.status==='under_investigation').length} under investigation</div>
    {CASES.slice(0,6).map((c,i) => (<div key={i} style={{ padding:'12px 0', borderBottom:`1px solid ${T.border}`, cursor:'pointer' }}><div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4 }}><div style={{ fontSize:12, fontWeight:700, color:T.t1, flex:1, paddingRight:8 }}>{caseTypeLabel(c.type)}</div><span className={`rg-badge ${statusBadge(c.status)}`}>{statusLabel(c.status)}</span></div><div style={{ fontSize:11, color:T.t2, marginBottom:2 }}>{c.property}</div><div style={{ display:'flex', justifyContent:'space-between' }}><span style={{ fontFamily:F.mono, fontSize:10, color:T.t3 }}>{c.id.replace('RC-2026-ACC-','RC-')}</span><span style={{ fontFamily:F.mono, fontSize:10, color:c.sev==='critical'||c.sev==='high'?T.red:c.sev==='medium'?T.amber:T.t3 }}>{c.sev}</span></div></div>))}
  </div></>);

  const screens = { home:<HomeScreen/>, scan:<ScanScreen/>, map:<MapScreen/>, property:<PropertyScreen/>, checklist:<ChecklistScreen/>, violation:<ViolationScreen/>, cases:<CasesScreen/> };

  // Phone frame — CSS media query makes it full-width on mobile via .rg-phone-frame rule
  return (<div className="fade-in" style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', background:'#0a110b', position:'relative' }}>
    <div className="rg-officer-bg" style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 60%, rgba(15,168,106,0.06) 0%, transparent 70%)' }} />
    <div className="rg-officer-label" style={{ position:'absolute', bottom:16, right:24 }}><div style={{ fontFamily:F.mono, fontSize:10, color:T.t3 }}>Android · GPS · Offline-capable</div></div>
    <div className="rg-phone-frame">
      <div style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column' }}>{screens[screen]}</div>
      <div className="rg-phone-nav">
        {[['home','◼','Today'],['scan','⬡','Inspect'],['map','◈','Map'],['cases','▤','Cases']].map(([id,ic,lbl]) => (<button key={id} className="rg-phone-nav-btn" onClick={() => { setScreen(id); setSelected(null); setSubmitted(false); }}><span style={{ fontSize:16, color:screen===id||((screen==='property'||screen==='checklist'||screen==='violation')&&id==='scan')?T.green:T.t3 }}>{ic}</span><span style={{ fontFamily:F.mono, fontSize:9, color:screen===id?T.green:T.t3, letterSpacing:1 }}>{lbl}</span></button>))}
      </div>
    </div>
  </div>);
};

// ── ADVANCE RENT CALCULATOR ──────────────────────────────────────────────────
const AdvanceCalc = () => {
  const [rent, setRent] = useState(''); const [advance, setAdvance] = useState(''); const [freq, setFreq] = useState('longer');
  const calc = () => { const r=parseFloat(rent),a=parseFloat(advance); if(!r||!a) return null; const months=(a/r).toFixed(1); const cap=freq==='monthly'?1:6; const legal=parseFloat(months)<=cap; const excess=legal?0:(parseFloat(months)-cap)*r; return { months, cap, legal, excess:excess.toFixed(2) }; };
  const res = calc();
  return (<div className="rg-card" style={{ padding:20, marginBottom:14 }}>
    <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:14 }}>Advance Rent Calculator</div>
    <div className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
      <div className="rg-field"><label>Monthly Rent (GH₵)</label><input type="number" className="rg-input" value={rent} onChange={e => setRent(e.target.value)} placeholder="e.g. 1800" /></div>
      <div className="rg-field"><label>Total Advance Paid (GH₵)</label><input type="number" className="rg-input" value={advance} onChange={e => setAdvance(e.target.value)} placeholder="e.g. 21600" /></div>
    </div>
    <div className="rg-field"><label>Tenancy Type</label><div style={{ display:'flex', gap:8 }}>{[['monthly','Monthly (cap: 1 mo)'],['longer','Longer (cap: 6 mo)']].map(([v,l]) => (<div key={v} onClick={() => setFreq(v)} style={{ flex:1, padding:'9px 12px', borderRadius:6, cursor:'pointer', border:`2px solid ${freq===v?T.green:T.border}`, background:freq===v?T.greenFade:T.card, textAlign:'center' }}><div style={{ fontSize:12, fontWeight:700, color:freq===v?T.green:T.t2 }}>{l}</div></div>))}</div></div>
    {res && (<div style={{ padding:'14px 16px', borderRadius:8, background:res.legal?T.greenFade:T.redFade, border:`2px solid ${res.legal?'rgba(15,168,106,0.25)':'rgba(229,72,58,0.25)'}`, marginTop:4 }} className="fade-in"><div style={{ fontFamily:F.mono, fontSize:26, fontWeight:700, color:res.legal?T.green:T.red, marginBottom:4 }}>{res.months} months</div><div style={{ fontSize:13, fontWeight:700, color:res.legal?T.green:T.red, marginBottom:6 }}>{res.legal?`✓ LEGAL — within the ${res.cap}-month cap`:`✗ ILLEGAL — exceeds ${res.cap}-month cap (Act 220 s.16)`}</div>{!res.legal && (<div style={{ fontSize:12, color:T.t2, lineHeight:1.6 }}>Excess collected: <strong style={{ color:T.red }}>GH₵ {parseFloat(res.excess).toLocaleString()}</strong>. Tenant may file a complaint for refund of excess advance.</div>)}</div>)}
  </div>);
};

// ── LANDLORD PORTAL ──────────────────────────────────────────────────────────
const LandlordPortal = ({ onNav }) => {
  const toast = useToast();
  const d = LANDLORD_DATA;
  const [tab, setTab] = useState('overview');
  return (<div className="fade-in">
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:20, flexWrap:'wrap', gap:8 }}>
      <div style={{ flex:1, minWidth:0 }}><div className="rg-page-title">Landlord Compliance Portal</div><div className="rg-page-sub">{d.name} · {d.id} · TIN: {d.tin}</div></div>
      {d.score>=80?<span className="rg-badge rg-badge-green">Good Standing</span>:d.score>=60?<span className="rg-badge rg-badge-amber">Partial Compliance</span>:<span className="rg-badge rg-badge-red">Non-Compliant · Risk of Sanctions</span>}
    </div>
    {/* Score card */}
    <div className="rg-card" style={{ padding:24, marginBottom:16, borderColor:d.score>=80?T.green:d.score>=60?T.amber:T.red, borderWidth:2 }}>
      <div className="rg-f" style={{ display:'flex', gap:24, alignItems:'center' }}>
        <div style={{ position:'relative', width:100, height:100, flexShrink:0 }}><svg width="100" height="100" style={{ transform:'rotate(-90deg)' }}><circle cx="50" cy="50" r="42" fill="none" stroke={T.border} strokeWidth="8" /><circle cx="50" cy="50" r="42" fill="none" stroke={d.score>=80?T.green:d.score>=60?T.amber:T.red} strokeWidth="8" strokeDasharray={`${2*Math.PI*42}`} strokeDashoffset={`${2*Math.PI*42*(1-d.score/100)}`} strokeLinecap="round" style={{ transition:'stroke-dashoffset 1s ease' }} /></svg><div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}><span style={{ fontFamily:F.mono, fontSize:24, fontWeight:700, color:d.score>=80?T.green:d.score>=60?T.amber:T.red, lineHeight:1 }}>{d.score}</span><span style={{ fontSize:10, color:T.t3 }}>/100</span></div></div>
        <div style={{ flex:1 }}><div style={{ fontFamily:F.head, fontSize:16, fontWeight:700, marginBottom:10 }}>Compliance Score</div><ProgressBar value={d.score} color={d.score>=80?T.green:d.score>=60?T.amber:T.red} height={6} /><div className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginTop:14 }}>{[['Properties',`${d.registered}/${d.properties}`,'Registered'],['Rent Cards',`${d.cards}/${d.tenancies}`,'Issued'],['Agreements',`${d.agreements}/${d.tenancies}`,'Written']].map(([l,v,sub],i) => (<div key={i} style={{ background:T.bg, borderRadius:6, padding:'10px 12px' }}><div style={{ fontFamily:F.mono, fontSize:16, fontWeight:600, color:T.t1 }}>{v}</div><div style={{ fontSize:10, color:T.t3, marginTop:2 }}>{sub}</div></div>))}</div></div>
      </div>
    </div>
    <div className="rg-tabs" style={{ marginBottom:16 }}>
      {[['overview','Overview'],['properties','My Properties'],['cards','Rent Cards'],['cases','Open Cases']].map(([id,lbl]) => (<button key={id} className={`rg-tab${tab===id?' active':''}`} onClick={() => setTab(id)}>{lbl}</button>))}
    </div>
    {tab === 'overview' && (<>
      <div className="rg-card" style={{ padding:20, marginBottom:14 }}>
        <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:16 }}>Compliance Checklist</div>
        {[{ l:'Properties Registered', done:d.registered, total:d.properties, law:'PNDCL 138 s.4' },{ l:'Written Agreements', done:d.agreements, total:d.tenancies, law:'PNDCL 138 s.4' },{ l:'Rent Cards Issued', done:d.cards, total:d.tenancies, law:'Act 220 s.20' },{ l:'Advance Within Limit', done:d.compliant, total:d.tenancies, law:'Act 220 s.16(5)' }].map((item,i) => { const allDone=item.done===item.total&&item.total>0; const pct=item.total?(item.done/item.total)*100:0; return (<div key={i} style={{ marginBottom:14 }}><div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:5 }}><div style={{ display:'flex', gap:8, alignItems:'center' }}><span style={{ color:allDone?T.green:item.done>0?T.amber:T.red, fontSize:14 }}>{allDone?'✓':item.done>0?'◐':'✗'}</span><div><div style={{ fontSize:12, fontWeight:600, color:T.t1 }}>{item.l}</div><div style={{ fontSize:10, color:T.t3 }}>{item.law}</div></div></div><div style={{ display:'flex', gap:8, alignItems:'center' }}><span style={{ fontFamily:F.mono, fontSize:12, color:T.t2 }}>{item.done}/{item.total}</span>{!allDone && <button className="rg-btn rg-btn-ghost" style={{ padding:'3px 10px', fontSize:11 }} onClick={() => onNav && onNav(item.l.includes('Properties')?'register':item.l.includes('Rent')?'cards':'overview')}>Fix →</button>}</div></div><ProgressBar value={pct} color={allDone?T.green:item.done>0?T.amber:T.red} /></div>); })}
      </div>
      <AdvanceCalc />
    </>)}
    {tab === 'properties' && (<div className="rg-card" style={{ padding:0 }}><div style={{ overflowX:'auto' }}><table className="rg-table"><thead><tr><th>Address</th><th>Units</th><th>Rent Cards</th><th>Avg Advance</th><th>Registered</th><th>Score</th></tr></thead><tbody>{d.props.map((p,i) => (<tr key={i}><td style={{ fontSize:12, fontWeight:600, color:T.t1 }}>{p.address}</td><td style={{ fontFamily:F.mono, fontSize:12 }}>{p.units}</td><td style={{ fontFamily:F.mono, fontSize:12, color:p.cards===p.units?T.green:T.amber }}>{p.cards}/{p.units}</td><td style={{ fontFamily:F.mono, fontSize:12, color:p.advance>6?T.red:T.green }}>{p.advance} mo</td><td>{p.registered?<span className="rg-badge rg-badge-green">Yes</span>:<span className="rg-badge rg-badge-red">No</span>}</td><td><div className="risk-bar"><div className="risk-bar-track"><div className="risk-bar-fill" style={{ width:`${p.score}%`, background:riskColor(100-p.score) }} /></div><span style={{ fontFamily:F.mono, fontSize:11, color:riskColor(100-p.score), minWidth:24 }}>{p.score}</span></div></td></tr>))}</tbody></table></div></div>)}
    {tab === 'cards' && (<div>{Object.entries(RENT_CARDS).map(([num,card]) => (<div key={num} className="rg-card" style={{ padding:18, marginBottom:10 }}><div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}><div><div style={{ fontFamily:F.mono, fontSize:13, fontWeight:700, color:T.green }}>{num}</div><div style={{ fontSize:12, color:T.t2, marginTop:2 }}>{card.address}</div></div><div style={{ display:'flex', gap:8 }}><span className="rg-badge rg-badge-green">Active</span>{!card.compliant && <span className="rg-badge rg-badge-red">Violation</span>}</div></div>{[['Monthly Rent',`GH₵ ${card.rent.toLocaleString()}`],['Issued',card.issued],['Advance',`${card.advMonths} months`]].map(([l,v],i) => (<div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'5px 0', borderTop:i>0?`1px solid ${T.border}`:'none' }}><span style={{ fontSize:11, color:T.t3 }}>{l}</span><span style={{ fontFamily:F.mono, fontSize:11, color:T.t1 }}>{v}</span></div>))}{card.warning && (<div style={{ marginTop:10, padding:'8px 10px', background:T.redFade, border:'1px solid rgba(229,72,58,0.2)', borderRadius:5, fontSize:11, color:T.red, lineHeight:1.5 }}>{card.warning}</div>)}</div>))}<button className="rg-btn rg-btn-primary" style={{ marginTop:6 }} onClick={() => toast('Rent card issuance form would open here','info')}>+ Issue New Rent Card</button></div>)}
    {tab === 'cases' && (<div>{CASES.filter(c => c.landlord.includes('Boateng')).length===0?<div style={{ padding:20, color:T.t3, fontSize:13 }}>No open cases. ✓</div>:CASES.filter(c => c.landlord.includes('Boateng')).map((c,i) => (<div key={i} className="rg-card" style={{ padding:16, marginBottom:10, borderLeft:`3px solid ${riskColor(c.sev==='critical'?90:c.sev==='high'?70:45)}` }}><div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}><span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>{c.id}</span><span className={`rg-badge ${statusBadge(c.status)}`}>{statusLabel(c.status)}</span></div><div style={{ fontSize:13, fontWeight:600, color:T.t1, marginBottom:3 }}>{caseTypeLabel(c.type)}</div><div style={{ fontSize:12, color:T.t2 }}>{c.property}</div></div>))}</div>)}
  </div>);
};

// ── TENANT PORTAL ────────────────────────────────────────────────────────────
const TenantPortal = ({ onNav }) => {
  const toast = useToast();
  const [tab, setTab] = useState('verify');
  const [cardInput, setCardInput] = useState(''); const [searched, setSearched] = useState('');
  const [cType, setCType] = useState(''); const [cDesc, setCDesc] = useState('');
  const [filing, setFiling] = useState(false); const [filed, setFiled] = useState(false);
  const card = searched ? RENT_CARDS[searched.toUpperCase()] : null;
  const notFound = searched && !card;
  const doFile = () => { setFiling(true); setTimeout(() => { setFiling(false); setFiled(true); }, 1400); };

  return (<div className="fade-in">
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:20, flexWrap:'wrap', gap:8 }}>
      <div style={{ flex:1, minWidth:0 }}><div className="rg-page-title">Tenant Protection Portal</div><div className="rg-page-sub">Know your rights · Verify your rent card · File a complaint</div></div>
    </div>
    <div className="rg-tabs" style={{ marginBottom:16 }}>
      {[['verify','Verify Rent Card'],['rights','Know Your Rights'],['complaint','File Complaint'],['calc','Advance Calculator']].map(([id,lbl]) => (<button key={id} className={`rg-tab${tab===id?' active':''}`} onClick={() => setTab(id)}>{lbl}</button>))}
    </div>
    {tab === 'verify' && (<div className="rg-mw" style={{ maxWidth:620 }}>
      <div className="rg-card-sm" style={{ marginBottom:16 }}>
        <div style={{ fontFamily:F.head, fontSize:15, fontWeight:700, marginBottom:10 }}>Verify Your Rent Card</div>
        <div style={{ fontSize:13, color:T.t2, marginBottom:12, lineHeight:1.65 }}>Enter the rent card number. Try: <code style={{ fontFamily:F.mono, fontSize:12, background:T.bg, padding:'2px 7px', borderRadius:3, color:T.lime }}>RG-2025-ACC-00123</code></div>
        <div style={{ display:'flex', gap:8 }}><input value={cardInput} onChange={e => setCardInput(e.target.value)} onKeyDown={e => e.key==='Enter'&&setSearched(cardInput)} placeholder="e.g. RG-2025-ACC-00123" className="rg-input" style={{ flex:1 }} /><button className="rg-btn rg-btn-primary" onClick={() => setSearched(cardInput)}>Verify</button></div>
        <div style={{ marginTop:10, fontSize:11, color:T.t3 }}>No smartphone? Dial <span style={{ fontFamily:F.mono, color:T.green }}>*714*1#</span> → Option 1 on any mobile phone</div>
      </div>
      {card && (<div className="fade-in" style={{ marginBottom:14 }}>
        <div style={{ padding:'12px 16px', background:T.greenFade, border:'1px solid rgba(15,168,106,0.25)', borderRadius:8, display:'flex', gap:12, alignItems:'center', marginBottom:10 }}><span style={{ fontFamily:F.mono, fontSize:11, fontWeight:700, color:T.green, letterSpacing:1 }}>VERIFIED</span><div><div style={{ fontWeight:700, color:T.green, fontSize:13 }}>VALID RENT CARD</div><div style={{ fontSize:12, color:T.t2 }}>Officially registered in Rent Control national database</div></div></div>
        {card.warning && (<div style={{ padding:'12px 16px', background:T.redFade, border:'1px solid rgba(229,72,58,0.25)', borderLeft:`4px solid ${T.red}`, borderRadius:6, marginBottom:10 }}><div style={{ fontSize:12, fontWeight:700, color:T.red, marginBottom:4 }}>Violation Detected</div><div style={{ fontSize:12, color:T.t2, lineHeight:1.6, marginBottom:10 }}>{card.warning}</div><button className="rg-btn rg-btn-danger" style={{ fontSize:11 }} onClick={() => setTab('complaint')}>File Complaint →</button></div>)}
        <div className="rg-card-sm">{[['Card Number',searched.toUpperCase()],['Property',card.address],['Landlord',card.landlord],['Monthly Rent',`GH₵ ${card.rent.toLocaleString()}`],['Issued',card.issued],['Advance Status',card.compliant?'✓ Within legal limit':'✗ Exceeds legal limit']].map(([l,v],i) => (<div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:i<5?`1px solid ${T.border}`:'none' }}><span style={{ fontSize:12, color:T.t3 }}>{l}</span><span style={{ fontFamily:F.mono, fontSize:12, fontWeight:600, color:l==='Advance Status'?(card.compliant?T.green:T.red):T.t1 }}>{v}</span></div>))}</div>
      </div>)}
      {notFound && (<div style={{ padding:'16px 18px', background:T.redFade, border:'1px solid rgba(229,72,58,0.25)', borderLeft:`4px solid ${T.red}`, borderRadius:6 }} className="fade-in"><div style={{ fontSize:13, fontWeight:700, color:T.red, marginBottom:6 }}>Rent Card Not Found</div><div style={{ fontSize:13, color:T.t2, lineHeight:1.65, marginBottom:12 }}>This card is not in the Rent Control registry. Your landlord may not have issued a valid card — this is a violation of PNDCL 138 s.5.</div><button className="rg-btn rg-btn-danger" onClick={() => setTab('complaint')}>File Complaint →</button></div>)}
    </div>)}
    {tab === 'rights' && (<div className="rg-mw" style={{ maxWidth:680 }}>
      <div style={{ padding:'12px 16px', background:T.card, border:`1px solid ${T.border}`, borderRadius:8, marginBottom:14, borderLeft:`4px solid ${T.green}` }}><div style={{ fontSize:11, fontWeight:700, color:T.green, letterSpacing:1.2, textTransform:'uppercase', marginBottom:6 }}>April 1, 2026 Mandate</div><div style={{ fontSize:13, color:T.t1, lineHeight:1.7 }}>As of April 1, 2026, all landlords are legally required to issue Rent Cards and register tenancy agreements. These rights have always existed — they are now being actively enforced.</div></div>
      <div className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>{[{ icon:'01', title:'Written Tenancy Agreement', text:'Your landlord must provide a written agreement before or at the start of your tenancy.', law:'PNDCL 138 s.4' },{ icon:'02', title:'Official Rent Card', text:'Every tenant must receive a Rent Card with verified tenancy details. Demand it.', law:'Act 220 s.20 · PNDCL 138 s.5' },{ icon:'03', title:'6-Month Advance Limit', text:'Your landlord cannot demand more than 6 months advance. Monthly tenancies: 1 month max.', law:'Act 220 s.16(5)' },{ icon:'04', title:'Habitable Premises', text:'Landlords must maintain the property in a fit and habitable condition.', law:'Act 220 s.17' },{ icon:'05', title:'Protection from Eviction', text:'You cannot be evicted without valid grounds and due process through Rent Control.', law:'Act 220 s.18' },{ icon:'06', title:'Registered Tenancy', text:'Your agreement must be registered with Rent Control within 14 days of signing.', law:'PNDCL 138 s.4' }].map((r,i) => (<div key={i} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:8, padding:'14px 16px' }}><div style={{ fontFamily:F.mono, fontSize:10, fontWeight:700, color:T.green, letterSpacing:1.5, marginBottom:8 }}>RIGHT {r.icon}</div><div style={{ fontSize:13, fontWeight:700, color:T.t1, marginBottom:5 }}>{r.title}</div><div style={{ fontSize:12, color:T.t2, lineHeight:1.6, marginBottom:8 }}>{r.text}</div><span style={{ fontFamily:F.mono, fontSize:10, color:T.t3 }}>{r.law}</span></div>))}</div>
    </div>)}
    {tab === 'complaint' && (<div className="rg-mw" style={{ maxWidth:540 }}>
      {filed ? (<div style={{ textAlign:'center', padding:'32px 20px' }} className="fade-in"><div style={{ fontFamily:F.mono, fontSize:11, fontWeight:700, color:T.green, letterSpacing:2, marginBottom:14 }}>FILED</div><div style={{ fontFamily:F.head, fontSize:20, fontWeight:700, color:T.green, marginBottom:8 }}>Complaint Filed</div><div style={{ fontFamily:F.mono, fontSize:14, color:T.lime, marginBottom:14 }}>Reference: RC-2026-ACC-00293</div><div style={{ fontSize:13, color:T.t2, lineHeight:1.7, marginBottom:20, margin:'0 auto 20px' }}>Your complaint has been routed to the Rent Control Department. A case officer will contact you within 48 hours. You will receive SMS updates.</div><div className="rg-card-sm" style={{ textAlign:'left', marginBottom:18 }}><div style={{ fontFamily:F.head, fontSize:12, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:10 }}>What Happens Next</div>{['Case assigned to Rent Control officer (48hrs)','Landlord receives official notice','Mediation scheduled or prosecution referred','You receive outcome notification by SMS'].map((s,i) => (<div key={i} style={{ display:'flex', gap:10, marginBottom:7 }}><span style={{ fontFamily:F.mono, fontSize:11, color:T.green, flexShrink:0 }}>{i+1}.</span><span style={{ fontSize:12, color:T.t2, lineHeight:1.4 }}>{s}</span></div>))}</div><button className="rg-btn rg-btn-primary" onClick={() => { setFiled(false); setCType(''); setCDesc(''); }}>Done</button></div>
      ) : (<>
        <div style={{ marginBottom:16 }}><div style={{ fontFamily:F.head, fontSize:15, fontWeight:700, marginBottom:4 }}>File a Complaint</div><div style={{ fontSize:13, color:T.t2 }}>Reports go directly to the Rent Control Department case queue.</div></div>
        <div className="rg-field"><label>Violation Type</label><div style={{ display:'flex', flexDirection:'column', gap:6 }}>{['Excessive advance rent (Act 220 s.16)','No rent card issued','No tenancy agreement','Unlawful eviction / threat','Rent increase without approval','Other violation'].map((t,i) => (<div key={i} onClick={() => setCType(t)} style={{ display:'flex', gap:10, alignItems:'center', padding:'10px 14px', borderRadius:6, cursor:'pointer', background:cType===t?T.greenFade:T.card, border:`1.5px solid ${cType===t?T.green:T.border}` }}><div style={{ width:13, height:13, borderRadius:'50%', border:`2px solid ${cType===t?T.green:T.border}`, background:cType===t?T.green:'transparent', flexShrink:0 }} /><span style={{ fontSize:12, color:cType===t?T.t1:T.t2 }}>{t}</span></div>))}</div></div>
        <div className="rg-field"><label>Describe the Situation</label><textarea value={cDesc} onChange={e => setCDesc(e.target.value)} className="rg-textarea" rows={4} placeholder="What happened? When? How much was collected?" /></div>
        <button disabled={!cType} className={`rg-btn ${cType?'rg-btn-primary':'rg-btn-ghost'}`} style={{ width:'100%', justifyContent:'center' }} onClick={doFile}>{filing?'Submitting…':'Submit to Rent Control →'}</button>
        <div style={{ marginTop:12, padding:'12px 14px', background:T.card, borderRadius:6, border:`1px solid ${T.border}` }}><div style={{ fontSize:11, fontWeight:700, color:T.t3, marginBottom:4 }}>Alternative channels</div><div style={{ display:'flex', gap:16, flexWrap:'wrap' }}><span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>*714*1# → Option 2</span><span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>WhatsApp: 0302-664-000</span><span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>Hotline: 0302-664-000</span></div></div>
      </>)}
    </div>)}
    {tab === 'calc' && <div className="rg-mw" style={{ maxWidth:540 }}><AdvanceCalc /></div>}
  </div>);
};

// ── GRA TAX EXPORT ───────────────────────────────────────────────────────────
const GRAExport = () => {
  const toast = useToast();
  const [generating, setGenerating] = useState(false); const [generated, setGenerated] = useState(false); const [preview, setPreview] = useState(false);
  const doGenerate = () => { setGenerating(true); setTimeout(() => { setGenerating(false); setGenerated(true); }, 1800); };
  return (<div className="fade-in">
    <SectionHeader title="GRA Tax Export" sub="Rental income data · Periodic export to Ghana Revenue Authority · February 2026" />
    <div style={{ padding:'16px 20px', background:'rgba(59,130,246,0.08)', border:'1px solid rgba(59,130,246,0.2)', borderLeft:`4px solid ${T.blue}`, borderRadius:8, marginBottom:20 }}><div style={{ fontFamily:F.head, fontSize:13, fontWeight:700, color:T.blue, marginBottom:6 }}>How This Works</div><div style={{ fontSize:13, color:T.t2, lineHeight:1.75 }}>The Rent Taskforce works with GRA to ensure rental income is properly declared. RentGuard generates a secure CSV linking landlord TINs to their registered properties, tenancies, and estimated annual rental income.<br /><br /><strong style={{ color:T.t1 }}>Data sharing is governed by MOU</strong> between Rent Control and GRA.</div></div>
    <div className="rg-r" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:20 }}>{[['847','Landlords with TIN on file',T.green],['GH₵ 4.2B','Est. annual rental income tracked',T.lime],['312','Landlords with advance violations',T.red],['22','Multi-property landlords flagged',T.amber]].map(([v,l,c],i) => (<div key={i} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:8, padding:16 }}><div style={{ fontFamily:F.mono, fontSize:22, fontWeight:500, color:c, marginBottom:6 }}>{v}</div><div style={{ fontSize:11, color:T.t2, lineHeight:1.4 }}>{l}</div></div>))}</div>
    <div className="rg-card" style={{ padding:24, marginBottom:16 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
        <div><div style={{ fontFamily:F.head, fontSize:16, fontWeight:700, marginBottom:4 }}>Generate Export</div><div style={{ fontSize:13, color:T.t2 }}>gra-rental-export-2026-02.csv · 847 records · Encrypted</div></div>
        {generated?<button className="rg-btn rg-btn-lime" style={{ fontSize:12 }} onClick={exportGRACSV}>↓ Download CSV</button>:<button className="rg-btn rg-btn-primary" onClick={doGenerate} style={{ fontSize:12 }}>{generating?<span style={{ display:'flex', alignItems:'center', gap:8 }}><span style={{ width:12, height:12, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', borderRadius:'50%', display:'inline-block', animation:'spin 0.8s linear infinite' }} />Generating…</span>:'Generate Export'}</button>}
      </div>
      {generated && (<div className="fade-in">
        <div className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginBottom:16 }}>{[['847','Landlords exported'],['GH₵ 979.2M','Total est. income'],['313','Violations flagged']].map(([v,l],i) => (<div key={i} style={{ background:T.bg, borderRadius:6, padding:'12px 14px' }}><div style={{ fontFamily:F.mono, fontSize:16, fontWeight:600, color:T.green }}>{v}</div><div style={{ fontSize:11, color:T.t3, marginTop:3 }}>{l}</div></div>))}</div>
        <div style={{ display:'flex', gap:8, marginBottom:16 }}><button className="rg-btn rg-btn-ghost" style={{ fontSize:11 }} onClick={() => setPreview(!preview)}>{preview?'Hide Preview':'Preview CSV Structure'}</button><button className="rg-btn rg-btn-ghost" style={{ fontSize:11 }} onClick={() => toast('SFTP transfer initiated to GRA','success')}>Notify GRA via SFTP</button></div>
        {preview && (<div className="fade-in" style={{ background:T.bg, border:`1px solid ${T.border}`, borderRadius:6, padding:'14px 16px', overflowX:'auto' }}><div style={{ fontSize:10, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:8 }}>CSV Preview (first 5 rows)</div><pre style={{ fontFamily:F.mono, fontSize:10, color:T.t2, lineHeight:1.8, whiteSpace:'pre', overflow:'auto' }}>{`landlord_tin,properties,tenancies,est_annual_income,advance_violations,district\n${GRA_ROWS.map(r=>`${r.tin},${r.props},${r.tenancies},${r.income},${r.advance_violations},${r.district}`).join('\n')}`}</pre></div>)}
      </div>)}
    </div>
    <div className="rg-card" style={{ padding:0 }}><div style={{ padding:'14px 20px', borderBottom:`1px solid ${T.border}` }}><span style={{ fontFamily:F.head, fontSize:14, fontWeight:700 }}>Export Preview — Sample Rows</span></div><div style={{ overflowX:'auto' }}><table className="rg-table"><thead><tr><th>Landlord TIN</th><th>Properties</th><th>Tenancies</th><th>Est. Annual Income</th><th>Violations</th><th>Unreg.</th><th>District</th></tr></thead><tbody>{GRA_ROWS.map((r,i) => (<tr key={i}><td><span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>{r.tin}</span></td><td style={{ fontFamily:F.mono, fontSize:12 }}>{r.props}</td><td style={{ fontFamily:F.mono, fontSize:12 }}>{r.tenancies}</td><td><span style={{ fontFamily:F.mono, fontSize:12, fontWeight:700, color:T.lime }}>{r.income.toLocaleString()}</span></td><td><span style={{ fontFamily:F.mono, fontSize:12, color:r.advance_violations>0?T.red:T.green }}>{r.advance_violations}</span></td><td><span style={{ fontFamily:F.mono, fontSize:12, color:r.unreg_tenancies>0?T.amber:T.green }}>{r.unreg_tenancies}</span></td><td style={{ fontSize:12, color:T.t2 }}>{r.district}</td></tr>))}</tbody></table></div></div>
  </div>);
};

// ── ENFORCEMENT FLOW ─────────────────────────────────────────────────────────
const EnforcementFlow = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { num:'01', title:'Complaint Received', who:'Tenant · USSD / Web / WhatsApp', detail:'Tenant Abena Sarpong dials *714*1# → Option 2. She reports that her landlord at 14 Osu Ako-Adjei Ave collected 9.5 months advance. The USSD handler creates a structured case record.', data:{ 'Source':'USSD *714*1#', 'Violation':'Illegal Advance Rent', 'Property':'14 Osu Ako-Adjei Ave', 'Advance':'9.5 months', 'Case Created':'RC-2026-ACC-00291' }, law:'Act 220 s.16(5) — max 6 months advance', color:T.blue },
    { num:'02', title:'Auto-Risk Scoring', who:'System · Runs within 60 seconds', detail:'The risk engine fetches the landlord profile. Cross-references 3 open cases, 4 tenancies without rent cards, and the 9.5-month advance. Risk score updates from 72 to 87.', data:{ 'Risk before':'72', 'Risk after':'87', 'Trigger':'Cases + advance violation', 'GRA flag':'Applied (3 properties)', 'Officer notified':'Ofc. Kofi Mensah' }, law:'Weighted scoring: advance(25%) + cases(30%) + no-cards(20%) + unreg(25%)', color:T.amber },
    { num:'03', title:'Officer Assignment', who:'Case Manager · Manual assignment', detail:'Case Manager reviews the queue. CRITICAL severity — 3 open cases in 90 days. Assigns to Ofc. Kofi Mensah in Ayawaso East.', data:{ 'Assigned by':'Mgr. Acheampong', 'Assigned to':'Ofc. Kofi Mensah', 'SLA deadline':'48hrs', 'Priority':'Critical' }, law:'PNDCL 138 s.4 — investigation duty', color:T.green },
    { num:'04', title:'Field Inspection', who:'Ofc. Mensah · In the field, offline-capable', detail:'Officer Mensah arrives at 14 Osu Ako-Adjei Ave. Runs the 8-point inspection checklist. Photographs tenancy agreements, captures GPS coordinates. App works offline.', data:{ 'Checklist failed':'5 of 8 (required)', 'Photos':'3 (GPS-stamped)', 'GPS':'5.558°N, 0.187°W', 'Cases generated':'2 additional' }, law:'PNDCL 138 s.5 — rent cards; Act 220 s.20 — inspection powers', color:T.green },
    { num:'05', title:'Formal Notice Issued', who:'Case Manager · System-generated', detail:'Violation confirmed. Formal notice RC-2026-NOTICE-00291 is generated with all violation details. Served digitally to the landlord with a 14-day compliance deadline.', data:{ 'Notice ID':'RC-2026-NOTICE-00291', 'Violations cited':'3', 'Deadline':'30 March 2026', 'Delivery':'SMS + Email + Portal' }, law:'Act 220 offence provisions; PNDCL 138 sanction powers', color:T.amber },
    { num:'06', title:'GRA Cross-Referral', who:'System · Automated on violation confirmation', detail:'Landlord has 3 properties and 6 tenancies — crosses the multi-property threshold. GRA auditors will cross-check declared rental income against GH₵ 194,400 tracked by RentGuard.', data:{ 'GRA flag':'Applied', 'Est. annual income':'GH₵ 194,400', 'TIN on file':'GH-TIN-8821-4490', 'Audit risk':'High' }, law:'Income Tax Act — rental income obligations; GRA-Rent Control MOU', color:T.red },
    { num:'07', title:'Resolution or Prosecution', who:'Case Manager / Rent Control Committee', detail:'If landlord complies within 14 days, case is resolved and score improves. If not, referred to Rent and Housing Committee for prosecution under Act 220.', data:{ 'If compliant':'Resolved · Score +18 pts', 'If not':'Referred to Committee', 'Tenant notified':'SMS at every stage', 'Record':'Permanent · visible to GRA' }, law:'Act 220 offence provisions; Committee jurisdiction', color:T.green },
  ];
  const cur = steps[step];
  return (<div className="fade-in">
    <SectionHeader title="End-to-End Enforcement Flow" sub="A single complaint — from USSD dial to resolution or prosecution" />
    <div style={{ display:'flex', alignItems:'center', marginBottom:24, overflowX:'auto', paddingBottom:4 }}>
      {steps.map((s,i) => (<div key={i} style={{ display:'flex', alignItems:'center', flexShrink:0 }}><button onClick={() => setStep(i)} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 14px', borderRadius:20, cursor:'pointer', transition:'all 0.15s', background:step===i?s.color:'transparent', border:`2px solid ${step===i?s.color:T.border}`, color:step===i?'#fff':T.t3, fontSize:11, fontWeight:700 }}><span style={{ fontFamily:F.mono }}>{s.num}</span>{step===i && <span>{s.title}</span>}</button>{i<steps.length-1 && <div style={{ width:20, height:2, background:i<step?T.green:T.border, flexShrink:0 }} />}</div>))}
    </div>
    <div key={step} className="rg-card slide-up" style={{ padding:0, borderTop:`3px solid ${cur.color}` }}>
      <div style={{ padding:'20px 24px', borderBottom:`1px solid ${T.border}` }}>
        <div style={{ display:'flex', gap:10, alignItems:'center', marginBottom:6 }}><span style={{ fontFamily:F.mono, fontSize:11, color:cur.color }}>{cur.num}</span><div style={{ width:1, height:14, background:T.border }} /><span style={{ fontFamily:F.head, fontSize:18, fontWeight:700 }}>{cur.title}</span></div>
        <div style={{ fontSize:12, color:T.t3, marginBottom:10 }}>{cur.who}</div>
        <div style={{ fontSize:13, color:T.t2, lineHeight:1.8 }}>{cur.detail}</div>
      </div>
      <div className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:0 }}>
        <div style={{ padding:'20px 24px', borderRight:`1px solid ${T.border}` }}><div style={{ fontSize:10, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:12 }}>Data at this step</div>{Object.entries(cur.data).map(([k,v],i) => (<div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid rgba(36,54,40,0.35)' }}><span style={{ fontSize:12, color:T.t3 }}>{k}</span><span style={{ fontFamily:F.mono, fontSize:11, fontWeight:600, color:T.t1, textAlign:'right', maxWidth:'55%' }}>{v}</span></div>))}</div>
        <div style={{ padding:'20px 24px' }}><div style={{ fontSize:10, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:12 }}>Legal Authority</div><div style={{ padding:'12px 14px', background:T.bg, borderRadius:6, border:`1px solid ${T.border}`, fontSize:12, color:T.t2, lineHeight:1.7, marginBottom:16 }}>{cur.law}</div><div style={{ display:'flex', gap:8 }}>{step>0 && <button onClick={() => setStep(step-1)} className="rg-btn rg-btn-ghost" style={{ fontSize:11 }}>← Previous</button>}{step<steps.length-1 && <button onClick={() => setStep(step+1)} className="rg-btn rg-btn-primary" style={{ fontSize:11 }}>Next Step →</button>}{step===steps.length-1 && <span style={{ fontSize:12, color:T.green, padding:'8px 0' }}>✓ Full workflow demonstrated</span>}</div></div>
      </div>
    </div>
  </div>);
};

// ── LANDLORD REGISTRATION ────────────────────────────────────────────────────
const LandlordRegistration = () => {
  const toast = useToast();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ address:'', type:'', units:'', tin:'', digital:'' });
  const [done, setDone] = useState(false); const [submitting, setSubmitting] = useState(false);
  const steps = [{ title:'Property Details', fields:[{ key:'address', label:'Street Address', placeholder:'e.g. 14 Osu Ako-Adjei Ave, Accra' },{ key:'type', label:'Property Type', placeholder:'e.g. Compound house' },{ key:'units', label:'Number of Units', placeholder:'e.g. 6', type:'number' }] },{ title:'Landlord Identity', fields:[{ key:'tin', label:'TIN Number', placeholder:'GH-TIN-XXXX-XXXX' },{ key:'card', label:'Ghana Card Number', placeholder:'GHA-XXXXXXXXX-X' },{ key:'phone', label:'Phone Number', placeholder:'024XXXXXXX' }] },{ title:'Rent Control Link', fields:[{ key:'digital', label:'Digital Property Address (if known)', placeholder:'GHA-ACC-XXXX-2024' },{ key:'reg_id', label:'Existing Rent Control Reg. ID (if any)', placeholder:'Leave blank if new' }] }];
  const submit = () => { setSubmitting(true); setTimeout(() => { setSubmitting(false); setDone(true); }, 1600); };
  if (done) return (<div className="rg-mw" style={{ padding:'32px 20px', textAlign:'center', maxWidth:480, margin:'0 auto' }} className="fade-in"><div style={{ fontFamily:F.mono, fontSize:11, fontWeight:700, color:T.green, letterSpacing:2, marginBottom:12 }}>REGISTERED</div><div style={{ fontFamily:F.head, fontSize:20, fontWeight:700, marginBottom:8 }}>Property Registered</div><div style={{ fontFamily:F.mono, fontSize:12, color:T.lime, marginBottom:20 }}>Reg ID: RC-PROP-2026-01483</div><div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:8, padding:20, textAlign:'left', marginBottom:20 }}>{[['Digital Property Address','GHA-ACC-01483-2026'],['Status','Registered with Rent Control'],['Next step','Issue Rent Cards'],['Synced to','rentcontrol.mwh.gov.gh']].map(([l,v],i) => (<InfoRow key={i} label={l} value={v} mono color={T.green} />))}</div><div style={{ display:'flex', gap:8, justifyContent:'center', flexWrap:'wrap' }}><button className="rg-btn rg-btn-primary" onClick={() => toast('Go to Rent Cards tab to issue cards','info')}>Issue Rent Cards Now</button><button className="rg-btn rg-btn-ghost" onClick={() => { setDone(false); setStep(0); setForm({}); }}>Register Another</button></div></div>);
  const cur = steps[step];
  return (<div className="fade-in rg-mw" style={{ maxWidth:520 }}>
    <div style={{ display:'flex', gap:0, marginBottom:24 }}>{steps.map((s,i) => (<div key={i} style={{ flex:1 }}><div style={{ height:3, background:i<=step?T.green:T.border, transition:'background 0.3s', marginRight:i<2?8:0 }} /><div style={{ fontFamily:F.mono, fontSize:9, color:i<=step?T.green:T.t3, marginTop:5, letterSpacing:1 }}>{String(i+1).padStart(2,'0')} {s.title.toUpperCase()}</div></div>))}</div>
    <div className="rg-card" style={{ padding:24 }}>
      <div style={{ fontFamily:F.head, fontSize:18, fontWeight:700, marginBottom:4 }}>{cur.title}</div>
      <div style={{ fontSize:13, color:T.t2, marginBottom:20 }}>{step===0?'Register this property with Rent Control.':step===1?'Your identity will be verified against NIA Ghana Card and GRA TIN.':'Link to existing Rent Control records.'}</div>
      {cur.fields.map(f => (<div key={f.key} className="rg-field"><label>{f.label}</label><input type={f.type||'text'} className="rg-input" placeholder={f.placeholder} value={form[f.key]||''} onChange={e => setForm(p=>({...p,[f.key]:e.target.value}))} /></div>))}
      <div style={{ display:'flex', gap:8, justifyContent:'flex-end', marginTop:8 }}>{step>0 && <button className="rg-btn rg-btn-ghost" onClick={() => setStep(s=>s-1)}>← Back</button>}{step<steps.length-1?<button className="rg-btn rg-btn-primary" onClick={() => setStep(s=>s+1)}>Continue →</button>:<button className="rg-btn rg-btn-primary" onClick={submit}>{submitting?'Registering…':'Submit Registration'}</button>}</div>
    </div>
  </div>);
};

// ── LANDLORD PAYMENTS ────────────────────────────────────────────────────────
const LandlordPayments = () => {
  const toast = useToast();
  const [showForm, setShowForm] = useState(false); const [amount, setAmount] = useState(''); const [recorded, setRecorded] = useState(false);
  return (<div className="fade-in">
    <SectionHeader title="Payment Records" sub="All rent payments · Advance tracking · Act 220 compliance" action={<button className="rg-btn rg-btn-primary" onClick={() => setShowForm(!showForm)}>+ Record Payment</button>} />
    {showForm && (<div className="rg-card slide-up" style={{ padding:20, marginBottom:16 }}>
      <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:16 }}>Record New Payment</div>
      {recorded ? (<div style={{ padding:14, background:T.greenFade, border:'1px solid rgba(15,168,106,0.25)', borderRadius:8, textAlign:'center' }}><div style={{ fontFamily:F.mono, fontSize:11, fontWeight:700, color:T.green, letterSpacing:2, marginBottom:6 }}>RECORDED</div><div style={{ fontSize:14, fontWeight:700, color:T.green }}>Payment Recorded</div><button className="rg-btn rg-btn-ghost" style={{ marginTop:12 }} onClick={() => { setRecorded(false); setShowForm(false); setAmount(''); }}>Done</button></div>) : (<div className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}><div className="rg-field"><label>Amount (GH₵)</label><input type="number" className="rg-input" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="e.g. 1800" /></div><div className="rg-field"><label>Payment Method</label><select className="rg-select"><option value="momo_mtn">MTN Mobile Money</option><option value="bank_transfer">Bank Transfer</option><option value="cash">Cash</option></select></div><div style={{ gridColumn:'1/-1' }}><button className="rg-btn rg-btn-primary" onClick={() => amount && setRecorded(true)} style={{ marginRight:8 }}>Record Payment</button><button className="rg-btn rg-btn-ghost" onClick={() => setShowForm(false)}>Cancel</button></div></div>)}
    </div>)}
    <div className="rg-card" style={{ padding:0 }}><div style={{ overflowX:'auto' }}><table className="rg-table"><thead><tr><th>Date</th><th>Amount</th><th>Method</th><th>Period</th><th>Advance</th><th>Compliant</th><th>Reference</th></tr></thead><tbody>{PAYMENTS_DATA.map((p,i) => (<tr key={i}><td><span style={{ fontFamily:F.mono, fontSize:11, color:T.t2 }}>{p.date}</span></td><td><span style={{ fontFamily:F.mono, fontSize:12, fontWeight:700 }}>GH₵ {p.amount.toLocaleString()}</span></td><td><span className="rg-badge rg-badge-muted">{p.method.replace(/_/g,' ')}</span></td><td style={{ fontSize:12, color:T.t2 }}>{p.period}</td><td><span style={{ fontFamily:F.mono, fontSize:12, color:p.advance>6?T.red:T.t2 }}>{p.advance} mo</span></td><td>{p.compliant?<span className="rg-badge rg-badge-green">✓ Legal</span>:<span className="rg-badge rg-badge-red">✗ Violation</span>}</td><td><span style={{ fontFamily:F.mono, fontSize:11, color:T.t3 }}>{p.ref}</span></td></tr>))}</tbody></table></div></div>
  </div>);
};

// ── LANDLORD TENANTS ─────────────────────────────────────────────────────────
const LandlordTenants = () => {
  const toast = useToast();
  const [selected, setSelected] = useState(null);
  return (<div className="fade-in">
    <SectionHeader title="My Tenants" sub="Active tenancies · Rent cards · Advance compliance" action={<button className="rg-btn rg-btn-primary" onClick={() => toast('Go to Register Property to add a new tenancy','info')}>+ Add Tenancy</button>} />
    <div className="rg-card" style={{ padding:0 }}><div style={{ overflowX:'auto' }}><table className="rg-table rg-table-clickable"><thead><tr><th>Tenant</th><th>Property · Unit</th><th>Rent Card</th><th>Advance</th><th>Status</th><th>Complaint</th></tr></thead><tbody>{TENANTS_DATA.map((t,i) => (<tr key={i} onClick={() => setSelected(selected===t.id?null:t.id)}><td><div style={{ fontSize:13, fontWeight:700, color:T.t1 }}>{t.name}</div><div style={{ fontFamily:F.mono, fontSize:10, color:T.t3 }}>{t.phone}</div></td><td><div style={{ fontSize:12 }}>{t.property}</div><div style={{ fontSize:11, color:T.t3 }}>{t.unit}</div></td><td>{t.rentCard!=='—'?<span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>{t.rentCard}</span>:<span className="rg-badge rg-badge-red">Not Issued</span>}</td><td><span style={{ fontFamily:F.mono, fontSize:12, fontWeight:700, color:t.advance>6?T.red:T.green }}>{t.advance} mo</span></td><td><span className="rg-badge rg-badge-green">{t.status}</span></td><td>{t.complaint?<span className="rg-badge rg-badge-red">Open</span>:<span style={{ fontSize:12, color:T.t3 }}>—</span>}</td></tr>))}</tbody></table></div></div>
    {TENANTS_DATA.filter(t=>t.id===selected).map(t => (<div key={t.id} className="rg-card slide-up" style={{ padding:24, marginTop:14 }}><div style={{ fontFamily:F.head, fontSize:16, fontWeight:700, marginBottom:16 }}>Tenancy Detail — {t.name}</div><div className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}><div><InfoRow label="Phone" value={t.phone} mono /><InfoRow label="Property" value={t.property} /><InfoRow label="Unit" value={t.unit} /><InfoRow label="Rent Card" value={t.rentCard} mono color={t.rentCard!=='—'?T.green:T.red} /><InfoRow label="Advance Paid" value={`${t.advance} months`} mono color={t.advance>6?T.red:T.green} />{t.advance>6 && <div style={{ marginTop:12, padding:'10px 12px', background:T.redFade, border:'1px solid rgba(229,72,58,0.2)', borderRadius:6, fontSize:12, color:T.red, lineHeight:1.6 }}>Advance exceeds 6-month cap. Exposure: ~GH₵ {((t.advance-6)*(t.rent||1800)).toLocaleString()}</div>}</div><div><div style={{ fontSize:10, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:10 }}>Actions</div><div style={{ display:'flex', flexDirection:'column', gap:8 }}>{t.rentCard==='—' && <button className="rg-btn rg-btn-primary" style={{ justifyContent:'center' }} onClick={() => toast('Rent card issuance form opening','info')}>Issue Rent Card</button>}<button className="rg-btn rg-btn-ghost" style={{ justifyContent:'center' }} onClick={() => toast('Payment recording form opening','info')}>Record Payment</button></div></div></div></div>))}
  </div>);
};

// ── ACCOUNT SETTINGS ─────────────────────────────────────────────────────────
const AccountSettings = ({ currentUser, onLogout }) => {
  const toast = useToast();
  const [tab, setTab] = useState('profile');
  const roleColor = { admin:T.green, manager:T.blue, officer:T.amber, landlord:'#C8E830', tenant:T.red };
  const accent = roleColor[currentUser?.id] || T.green;
  return (<div className="fade-in rg-mw" style={{ maxWidth:620 }}>
    <div style={{ display:'flex', gap:16, alignItems:'center', marginBottom:24 }}>
      <div style={{ width:56, height:56, borderRadius:'50%', background:`${accent}18`, border:`2.5px solid ${accent}`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:F.mono, fontSize:18, fontWeight:700, color:accent, flexShrink:0 }}>{(currentUser?.name||'U').split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
      <div><div style={{ fontFamily:F.head, fontSize:18, fontWeight:700 }}>{currentUser?.name}</div><div style={{ fontSize:12, color:T.t3, marginTop:2 }}>{currentUser?.role} · {currentUser?.email}</div></div>
    </div>
    <div className="rg-tabs" style={{ marginBottom:16 }}>{[['profile','Profile'],['security','Security']].map(([id,lbl]) => (<button key={id} className={`rg-tab${tab===id?' active':''}`} onClick={() => setTab(id)}>{lbl}</button>))}</div>
    {tab === 'profile' && (<div className="rg-card" style={{ padding:22 }}>
      <div className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}><div className="rg-field"><label>Full Name</label><input className="rg-input" defaultValue={currentUser?.name} /></div><div className="rg-field"><label>Email Address</label><input type="email" className="rg-input" defaultValue={currentUser?.email} /></div><div className="rg-field"><label>Phone Number</label><input className="rg-input" placeholder="024XXXXXXX" /></div><div className="rg-field"><label>District / Region</label><input className="rg-input" placeholder="e.g. Ayawaso East" /></div></div>
      <button className="rg-btn rg-btn-primary" style={{ marginTop:8 }} onClick={() => toast('Profile updated','success')}>Save Profile</button>
    </div>)}
    {tab === 'security' && (<div className="rg-card" style={{ padding:22, borderColor:'rgba(229,72,58,0.3)' }}>
      <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, color:T.red, marginBottom:6 }}>Danger Zone</div>
      <div style={{ fontSize:12, color:T.t2, marginBottom:14, lineHeight:1.6 }}>Signing out will end your current session.</div>
      <button className="rg-btn rg-btn-danger" onClick={onLogout}>Sign Out</button>
    </div>)}
  </div>);
};


// ═══════════════════════════════════════════════════════════════════════════
// DEPTH PASS — ALL MISSING COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

// ── ADMIN: REGIONS ───────────────────────────────────────────────────────────
const AdminRegions = () => {
  const toast = useToast();
  const [selected, setSelected] = useState(null);
  const region = selected !== null ? REGIONS[selected] : null;
  return (<div className="fade-in">
    <SectionHeader title="Regional Intelligence" sub="Compliance rates, violations and risk levels by region" />
    <div className="rg-f" style={{ display:'flex', gap:16 }}>
      <div style={{ flex:1 }}>
        <div className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {REGIONS.map((r,i) => (<div key={i} onClick={() => setSelected(selected===i?null:i)} style={{ background:selected===i?(r.risk==='high'?'rgba(229,72,58,0.1)':r.risk==='medium'?'rgba(232,144,10,0.1)':'rgba(15,168,106,0.1)'):T.card, border:`2px solid ${selected===i?(r.risk==='high'?'rgba(229,72,58,0.4)':r.risk==='medium'?'rgba(232,144,10,0.4)':'rgba(15,168,106,0.4)'):T.border}`, borderRadius:10, padding:16, cursor:'pointer', transition:'all 0.15s' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}><div style={{ fontFamily:F.head, fontSize:14, fontWeight:700 }}>{r.name}</div><span className={`rg-badge ${r.risk==='high'?'rg-badge-red':r.risk==='medium'?'rg-badge-amber':'rg-badge-green'}`}>{r.risk}</span></div>
            <div className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:10 }}><div><div style={{ fontFamily:F.mono, fontSize:18, fontWeight:500, color:r.reg>75?T.green:r.reg>55?T.amber:T.red }}>{r.reg}%</div><div style={{ fontSize:9, color:T.t3, fontWeight:600, letterSpacing:1, textTransform:'uppercase' }}>Registered</div></div><div><div style={{ fontFamily:F.mono, fontSize:18, fontWeight:500, color:r.cards>65?T.green:r.cards>45?T.amber:T.red }}>{r.cards}%</div><div style={{ fontSize:9, color:T.t3, fontWeight:600, letterSpacing:1, textTransform:'uppercase' }}>Rent Cards</div></div></div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}><span style={{ fontSize:11, color:T.t2 }}>{r.violations} violations</span><div style={{ display:'flex', gap:2 }}>{[...Array(10)].map((_,j) => (<div key={j} style={{ width:6, height:16, borderRadius:2, background:j<Math.round(r.score/10)?(r.risk==='high'?T.red:r.risk==='medium'?T.amber:T.green):T.border }} />))}</div></div>
          </div>))}
        </div>
      </div>
      <div className="rg-aside" style={{ width:280, flexShrink:0 }}>
        {region ? (<div className="rg-card slide-up" style={{ padding:20 }}>
          <div style={{ fontFamily:F.head, fontSize:16, fontWeight:700, marginBottom:4 }}>{region.name} Region</div>
          <span className={`rg-badge ${region.risk==='high'?'rg-badge-red':region.risk==='medium'?'rg-badge-amber':'rg-badge-green'}`} style={{ marginBottom:16, display:'inline-flex' }}>{region.risk} priority</span>
          <InfoRow label="Registration Rate" value={`${region.reg}%`} mono color={region.reg>75?T.green:region.reg>55?T.amber:T.red} />
          <InfoRow label="Rent Cards Issued" value={`${region.cards}%`} mono color={region.cards>65?T.green:region.cards>45?T.amber:T.red} />
          <InfoRow label="Active Violations" value={String(region.violations)} mono color={region.violations>200?T.red:region.violations>80?T.amber:T.green} />
          <InfoRow label="Compliance Score" value={`${region.score}/100`} mono />
          <div style={{ marginTop:16 }}><div style={{ fontSize:10, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:10 }}>Score Breakdown</div>
            {[['Registration',region.reg,T.blue],['Rent Cards',region.cards,T.green],['Low Violations',Math.max(0,100-Math.floor(region.violations/3)),T.amber]].map(([l,v,c],i) => (<div key={i} style={{ marginBottom:8 }}><div style={{ display:'flex', justifyContent:'space-between', marginBottom:3 }}><span style={{ fontSize:11, color:T.t2 }}>{l}</span><span style={{ fontFamily:F.mono, fontSize:11, color:c }}>{v}%</span></div><ProgressBar value={v} color={c} /></div>))}
          </div>
          <button className="rg-btn rg-btn-ghost" style={{ justifyContent:'center', fontSize:11, width:'100%', marginTop:12 }} onClick={() => toast('Region report queued for download','info')}>Export Region Report</button>
        </div>) : (<div className="rg-card" style={{ padding:20, height:'100%', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:8 }}><div style={{ fontFamily:F.mono, fontSize:10, color:T.t3, letterSpacing:2, opacity:0.3 }}>NO SELECTION</div><div style={{ fontSize:12, color:T.t3, textAlign:'center' }}>Click a region to see detailed breakdown</div></div>)}
      </div>
    </div>
  </div>);
};

// ── ADMIN: OFFICERS ──────────────────────────────────────────────────────────
const AdminOfficers = () => {
  const toast = useToast();
  const [selected, setSelected] = useState(null);
  const officer = OFFICERS.find(o => o.id === selected);
  return (<div className="fade-in">
    <SectionHeader title="Taskforce Officers" sub={`${OFFICERS.filter(o=>o.active).length} active today · ${OFFICERS.length} total deployed`} action={<button className="rg-btn rg-btn-primary" onClick={() => toast('Invite flow opening','info')}>+ Add Officer</button>} />
    <div className="rg-r" className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:16 }}>
      {OFFICERS.map((o,i) => (<div key={i} onClick={() => setSelected(selected===o.id?null:o.id)} style={{ background:selected===o.id?T.cardHov:T.card, border:`2px solid ${selected===o.id?T.green:T.border}`, borderRadius:10, padding:16, cursor:'pointer', transition:'all 0.15s' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
          <div style={{ width:36, height:36, borderRadius:'50%', background:o.active?T.greenFade:'rgba(83,99,88,0.2)', border:`2px solid ${o.active?T.green:T.t3}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, color:o.active?T.green:T.t3 }}>{o.name.split(' ').map(n=>n[0]).join('')}</div>
          <div style={{ display:'flex', alignItems:'center', gap:5 }}>{o.active && <div style={{ width:6, height:6, borderRadius:'50%', background:T.green }} className="pulse" />}<span style={{ fontSize:10, fontWeight:700, color:o.active?T.green:T.t3, letterSpacing:1, textTransform:'uppercase' }}>{o.active?'On Duty':'Off Duty'}</span></div>
        </div>
        <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:2 }}>{o.name}</div>
        <div style={{ fontSize:12, color:T.t2, marginBottom:12 }}>{o.district}</div>
        <div className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
          <div style={{ background:T.surface, borderRadius:6, padding:'8px 10px' }}><div style={{ fontFamily:F.mono, fontSize:16, fontWeight:500, color:T.green }}>{o.insp}</div><div style={{ fontSize:9, color:T.t3, fontWeight:600, letterSpacing:1, textTransform:'uppercase', marginTop:2 }}>Inspections</div></div>
          <div style={{ background:T.surface, borderRadius:6, padding:'8px 10px' }}><div style={{ fontFamily:F.mono, fontSize:16, fontWeight:500, color:T.amber }}>{o.cases}</div><div style={{ fontSize:9, color:T.t3, fontWeight:600, letterSpacing:1, textTransform:'uppercase', marginTop:2 }}>Cases Filed</div></div>
        </div>
      </div>))}
    </div>
    {officer && (<div className="rg-card slide-up" style={{ padding:24 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}><div><div style={{ fontFamily:F.head, fontSize:18, fontWeight:700 }}>{officer.name}</div><div style={{ fontSize:13, color:T.t2, marginTop:2 }}>{officer.id} · {officer.district} District</div></div><div style={{ display:'flex', gap:8 }}><button className="rg-btn rg-btn-ghost" style={{ fontSize:11 }} onClick={() => toast(`Message sent to ${officer.name}`,'info')}>Message Officer</button><button className="rg-btn rg-btn-primary" style={{ fontSize:11 }} onClick={() => toast(`Case queue opened for ${officer.name}`,'info')}>Assign Case</button></div></div>
      <div className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:14 }}>{[['Inspections MTD',officer.insp,T.green],['Cases Filed',officer.cases,T.amber],['Phone',officer.phone,T.t2],['Badge',officer.badge,T.t2]].map(([l,v,c],i) => (<div key={i} style={{ background:T.surface, borderRadius:8, padding:'12px 14px' }}><div style={{ fontFamily:F.mono, fontSize:16, fontWeight:500, color:c, marginBottom:4 }}>{v}</div><div style={{ fontSize:10, color:T.t3, fontWeight:600, letterSpacing:1, textTransform:'uppercase' }}>{l}</div></div>))}</div>
      <div style={{ marginTop:16, fontFamily:F.head, fontSize:12, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:10 }}>Recent Inspections</div>
      {INSPECTION_HISTORY.filter(h => h.officer.includes(officer.name.split(' ')[1]) || h.officer.includes(officer.name.split(' ')[0])).slice(0,3).map((h,i) => (<div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:i<2?'1px solid rgba(36,54,40,0.4)':'none' }}><div><div style={{ fontSize:12, fontWeight:600 }}>{h.property}</div><div style={{ fontFamily:F.mono, fontSize:10, color:T.t3, marginTop:2 }}>{h.id} · {h.date}</div></div><div style={{ textAlign:'right' }}><div style={{ fontSize:12, color:h.violations>0?T.red:T.green, fontWeight:600 }}>{h.violations} violation{h.violations!==1?'s':''}</div></div></div>))}
    </div>)}
  </div>);
};

// ── ADMIN: LIVE ACTIVITY FEED ────────────────────────────────────────────────
const ActivityFeed = () => {
  const [items, setItems] = useState([
    { ts:'09:42:11', type:'case_filed',  text:'New case RC-2026-ACC-00291 filed via Taskforce inspection at 14 Osu Ako-Adjei Ave.', color:T.red },
    { ts:'09:38:44', type:'risk_update', text:'Landlord L-3378 risk score updated: 92 → 96. Trigger: new complaint + advance violation.', color:T.amber },
    { ts:'09:31:05', type:'inspection',  text:'Inspection INS-081 completed by Ofc. Mensah. 3 violations flagged.', color:T.amber },
    { ts:'09:18:22', type:'card_issued', text:'Rent Card RG-2026-ACC-00553 issued for tenancy T-009 at 3A Labone Link.', color:T.green },
    { ts:'09:12:01', type:'sync',        text:'Portal sync complete. rentcontrol.mwh.gov.gh — 14 new registrations pulled.', color:T.blue },
    { ts:'08:55:30', type:'case_update', text:'Case RC-2026-ACC-00289 advanced: received → notice_issued.', color:T.amber },
    { ts:'08:44:17', type:'complaint',   text:'USSD complaint received from 0277-441-004. Excess advance at 22 Dzorwulu Cres.', color:T.red },
    { ts:'08:30:00', type:'shift_start', text:'18 officers clocked in for morning shift. Ayawaso East (3), West (4), Okaikwei (3)...', color:T.green },
  ]);
  const addEvent = () => {
    const events = [{ type:'card_issued', text:'Rent Card RG-2026-ACC-00561 issued for 7 Labone Close Unit 2.', color:T.green },{ type:'complaint', text:'Web portal complaint filed. Advance violation at 31 North Kaneshie.', color:T.red },{ type:'inspection', text:'Inspection INS-082 started by Ofc. Amankwa at 19 Spintex Road.', color:T.amber },{ type:'sync', text:'GRA export queued for February 2026. 847 landlord records.', color:T.blue }];
    const ev = events[Math.floor(Math.random()*events.length)];
    const now = new Date(); const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
    setItems(prev => [{ ts, ...ev }, ...prev.slice(0,9)]);
  };
  return (<div className="fade-in">
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}><div><div style={{ fontFamily:F.head, fontSize:16, fontWeight:700 }}>Live Activity Feed</div><div style={{ fontSize:12, color:T.t2, marginTop:2 }}>Real-time enforcement events across all regions</div></div><div style={{ display:'flex', gap:8, alignItems:'center' }}><div style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 10px', background:T.greenFade, border:'1px solid rgba(15,168,106,0.2)', borderRadius:5 }}><div style={{ width:6, height:6, borderRadius:'50%', background:T.green }} className="pulse" /><span style={{ fontFamily:F.mono, fontSize:10, color:T.green }}>LIVE</span></div><button className="rg-btn rg-btn-ghost" style={{ fontSize:11 }} onClick={addEvent}>+ Simulate Event</button></div></div>
    <div className="rg-r" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:20 }}>{[['18','Officers on shift',T.green],['3','Inspections today',T.green],['7','Events last hour',T.amber],['2','Critical cases',T.red]].map(([v,l,c],i) => (<div key={i} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:8, padding:14 }}><div style={{ fontFamily:F.mono, fontSize:22, fontWeight:500, color:c }}>{v}</div><div style={{ fontSize:11, color:T.t3, marginTop:4 }}>{l}</div></div>))}</div>
    <div className="rg-card" style={{ padding:0 }}><div style={{ padding:'12px 18px', borderBottom:`1px solid ${T.border}`, display:'flex', justifyContent:'space-between' }}><span style={{ fontFamily:F.head, fontSize:13, fontWeight:700 }}>Event Stream</span><span style={{ fontFamily:F.mono, fontSize:10, color:T.t3 }}>auto-updating</span></div>
      {items.map((item,i) => (<div key={i} className={i===0?'fade-in':''} style={{ display:'flex', gap:14, padding:'12px 18px', borderBottom:i<items.length-1?'1px solid rgba(36,54,40,0.4)':'none', alignItems:'flex-start' }}><div style={{ flexShrink:0, display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}><div style={{ width:8, height:8, borderRadius:'50%', background:item.color, marginTop:3 }} />{i<items.length-1 && <div style={{ width:1, height:20, background:T.border }} />}</div><div style={{ flex:1 }}><div style={{ fontFamily:F.mono, fontSize:9, color:T.t3, marginBottom:4, letterSpacing:1 }}>{item.ts} · {item.type.replace(/_/g,' ').toUpperCase()}</div><div style={{ fontSize:12, color:T.t2, lineHeight:1.6 }}>{item.text}</div></div></div>))}
    </div>
  </div>);
};

// ── ADMIN: SETTINGS ──────────────────────────────────────────────────────────
const SettingsPage = () => {
  const toast = useToast();
  const [tab, setTab] = useState('system');
  const [settings, setSettings] = useState({ syncInterval:'30', autoAssign:false, slaHours:'48', graExportDay:'1', riskHigh:'70', riskMedium:'40', advanceCapMonthly:'1', advanceCapLonger:'6' });
  const upd = (k,v) => setSettings(p => ({...p,[k]:v}));
  return (<div className="fade-in">
    <SectionHeader title="System Settings" sub="Platform configuration · Enforcement thresholds · Integration parameters" />
    <div className="rg-tabs" style={{ marginBottom:16 }}>{[['system','System'],['enforcement','Enforcement'],['integrations','Integrations']].map(([id,lbl]) => (<button key={id} className={`rg-tab${tab===id?' active':''}`} onClick={() => setTab(id)}>{lbl}</button>))}</div>
    {tab === 'system' && (<div className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
      <div className="rg-card" style={{ padding:20 }}><div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:16 }}>Portal Sync</div><div className="rg-field"><label>Portal URL</label><input className="rg-input" value="rentcontrol.mwh.gov.gh" readOnly /></div><div className="rg-field"><label>Sync Interval (minutes)</label><input className="rg-input" value={settings.syncInterval} onChange={e=>upd('syncInterval',e.target.value)} /></div><div className="rg-field"><label>SLA Deadline (hours)</label><input type="number" className="rg-input" value={settings.slaHours} onChange={e=>upd('slaHours',e.target.value)} /></div></div>
      <div className="rg-card" style={{ padding:20 }}><div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:16 }}>Case Management</div><div className="rg-field"><label>Auto-assign cases</label><div style={{ display:'flex', alignItems:'center', gap:10 }}><div onClick={() => upd('autoAssign',!settings.autoAssign)} style={{ width:40, height:22, borderRadius:11, background:settings.autoAssign?T.green:T.border, cursor:'pointer', position:'relative', transition:'background 0.2s' }}><div style={{ position:'absolute', top:3, left:settings.autoAssign?20:3, width:16, height:16, borderRadius:'50%', background:'#fff', transition:'left 0.2s' }} /></div><span style={{ fontSize:12, color:T.t2 }}>{settings.autoAssign?'Enabled':'Disabled'}</span></div></div><div className="rg-field"><label>GRA Export Day of Month</label><input type="number" min="1" max="28" className="rg-input" value={settings.graExportDay} onChange={e=>upd('graExportDay',e.target.value)} /></div></div>
    </div>)}
    {tab === 'enforcement' && (<div className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
      <div className="rg-card" style={{ padding:20 }}><div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:16 }}>Risk Score Thresholds</div><div style={{ padding:'12px 14px', background:T.blueFade, border:'1px solid rgba(59,130,246,0.15)', borderRadius:6, marginBottom:14, fontSize:12, color:T.t2, lineHeight:1.7 }}>These thresholds control when properties are flagged for Taskforce inspection.</div>{[{key:'riskHigh',label:'High Risk Threshold',color:T.red},{key:'riskMedium',label:'Medium Risk Threshold',color:T.amber}].map(f => (<div className="rg-field" key={f.key}><label style={{ color:f.color }}>{f.label}</label><div style={{ display:'flex', alignItems:'center', gap:10 }}><input type="range" min="0" max="100" value={settings[f.key]} onChange={e=>upd(f.key,e.target.value)} style={{ flex:1, accentColor:f.color }} /><span style={{ fontFamily:F.mono, fontSize:14, fontWeight:700, color:f.color, minWidth:32 }}>{settings[f.key]}</span></div></div>))}</div>
      <div className="rg-card" style={{ padding:20 }}><div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:16 }}>Legal Advance Caps</div><div style={{ padding:'12px 14px', background:T.redFade, border:'1px solid rgba(229,72,58,0.15)', borderRadius:6, marginBottom:14, fontSize:12, color:T.t2, lineHeight:1.7 }}>Set by Act 220 s.16(5). Only modify if the law changes.</div>{[{key:'advanceCapMonthly',label:'Monthly Tenancy Cap (months)',law:'Act 220 s.16(5)'},{key:'advanceCapLonger',label:'Longer Tenancy Cap (months)',law:'Act 220 s.16(5)'}].map(f => (<div className="rg-field" key={f.key}><label>{f.label} <span style={{ fontFamily:F.mono, fontSize:9, color:T.t3 }}>§ {f.law}</span></label><input type="number" className="rg-input" value={settings[f.key]} onChange={e=>upd(f.key,e.target.value)} /></div>))}</div>
    </div>)}
    {tab === 'integrations' && (<div className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>{[{name:'Rent Control Portal',url:'rentcontrol.mwh.gov.gh',status:'connected',color:T.green},{name:'NIA Ghana Card API',url:'api.nia.gov.gh/verify',status:'connected',color:T.blue},{name:'GRA Tax System',url:'api.gra.gov.gh',status:'pending',color:T.amber},{name:'MTN MoMo Webhook',url:'api.mtn.com.gh/momo',status:'connected',color:'#FFCB05'},{name:'Africa\'s Talking USSD',url:'api.africastalking.com',status:'connected',color:T.green},{name:'Meta WhatsApp API',url:'graph.facebook.com',status:'pending',color:T.amber}].map((sys,i) => (<div key={i} className="rg-card" style={{ padding:18, borderLeft:`3px solid ${sys.status==='connected'?T.green:T.amber}` }}><div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}><div style={{ fontFamily:F.head, fontSize:14, fontWeight:700 }}>{sys.name}</div><span className={`rg-badge ${sys.status==='connected'?'rg-badge-green':'rg-badge-amber'}`}>{sys.status}</span></div><div style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>{sys.url}</div></div>))}</div>)}
    <div style={{ marginTop:20, display:'flex', gap:8, flexWrap:'wrap' }}><button className="rg-btn rg-btn-primary" onClick={() => toast('Settings saved','success')}>Save Changes</button><button className="rg-btn rg-btn-ghost" onClick={() => toast('Settings reset','warning')}>Reset to Defaults</button></div>
  </div>);
};

// ── MANAGER: SLA TRACKER ─────────────────────────────────────────────────────
const SLATracker = () => {
  const now = new Date('2026-03-16');
  const withSLA = CASES.filter(c=>c.status!=='resolved'&&c.status!=='closed').map(c => {
    const opened = new Date(c.opened); const hoursOpen = Math.floor((now-opened)/36e5);
    const slaHours = c.sev==='critical'?24:c.sev==='high'?48:c.sev==='medium'?72:120;
    const hoursLeft = slaHours-hoursOpen; const slaStatus = hoursLeft<0?'overdue':hoursLeft<12?'critical':hoursLeft<24?'warning':'ok';
    return { ...c, hoursOpen, slaHours, hoursLeft, slaStatus };
  });
  return (<div className="fade-in">
    <SectionHeader title="SLA Tracker" sub="Case response deadlines · Based on severity thresholds" />
    <div className="rg-r" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:20 }}>{[[withSLA.filter(c=>c.slaStatus==='overdue').length,'Overdue',T.red,'Exceeded SLA'],[withSLA.filter(c=>c.slaStatus==='critical').length,'Critical',T.red,'< 12hrs left'],[withSLA.filter(c=>c.slaStatus==='warning').length,'Warning',T.amber,'12–24hrs left'],[withSLA.filter(c=>c.slaStatus==='ok').length,'On Track',T.green,'Within SLA']].map(([v,l,c,sub],i) => (<div key={i} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:8, padding:16 }}><div style={{ fontFamily:F.mono, fontSize:26, fontWeight:500, color:c, marginBottom:4 }}>{v}</div><div style={{ fontSize:12, fontWeight:600, color:T.t1, marginBottom:2 }}>{l}</div><div style={{ fontSize:11, color:T.t3 }}>{sub}</div></div>))}</div>
    <div className="rg-card" style={{ padding:0 }}><div style={{ overflowX:'auto' }}><table className="rg-table"><thead><tr><th>Case</th><th>Type</th><th>Severity</th><th>SLA</th><th>Hours Open</th><th>Status</th><th>Assigned</th></tr></thead><tbody>{withSLA.map((c,i) => (<tr key={i}><td><span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>{c.id.replace('RC-2026-ACC-','RC-')}</span></td><td style={{ fontSize:12 }}>{caseTypeLabel(c.type)}</td><td><span className={`rg-badge ${c.sev==='critical'||c.sev==='high'?'rg-badge-red':c.sev==='medium'?'rg-badge-amber':'rg-badge-muted'}`}>{c.sev}</span></td><td><span style={{ fontFamily:F.mono, fontSize:11, color:T.t2 }}>{c.slaHours}h</span></td><td><div style={{ display:'flex', alignItems:'center', gap:8 }}><div style={{ width:60, height:4, background:T.border, borderRadius:2, overflow:'hidden' }}><div style={{ height:'100%', width:`${Math.min(100,(c.hoursOpen/c.slaHours)*100)}%`, background:c.slaStatus==='ok'?T.green:c.slaStatus==='warning'?T.amber:T.red, borderRadius:2 }} /></div><span style={{ fontFamily:F.mono, fontSize:11, color:T.t2 }}>{c.hoursOpen}h</span></div></td><td><span style={{ fontFamily:F.mono, fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:0.8, color:c.slaStatus==='overdue'?T.red:c.slaStatus==='critical'?T.red:c.slaStatus==='warning'?T.amber:T.green }}>{c.slaStatus==='overdue'?`${Math.abs(c.hoursLeft)}h overdue`:`${c.hoursLeft}h left`}</span></td><td><span style={{ fontSize:12, color:c.assigned?T.t2:T.red }}>{c.assigned||'Unassigned'}</span></td></tr>))}</tbody></table></div></div>
  </div>);
};

// ── MANAGER: ASSIGN OFFICERS ─────────────────────────────────────────────────
const AssignOfficers = () => {
  const toast = useToast();
  const [assignments, setAssignments] = useState({});
  const unassigned = CASES.filter(c => !c.assigned && c.status==='received');
  return (<div className="fade-in">
    <SectionHeader title="Assign Officers" sub={`${unassigned.length} unassigned cases · ${OFFICERS.filter(o=>o.active).length} officers on duty`} />
    <div className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
      <div><div style={{ fontSize:10, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:10 }}>Unassigned Cases</div>{unassigned.length===0 && <EmptyState icon="OK" text="All cases assigned" />}{unassigned.map((c,i) => (<div key={i} className="rg-card" style={{ padding:14, marginBottom:8, borderLeft:`3px solid ${c.sev==='critical'||c.sev==='high'?T.red:T.amber}` }}><div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:8 }}><div><div style={{ fontFamily:F.mono, fontSize:10, color:T.green, marginBottom:2 }}>{c.id.replace('RC-2026-ACC-','')}</div><div style={{ fontSize:13, fontWeight:700 }}>{caseTypeLabel(c.type)}</div><div style={{ fontSize:12, color:T.t2 }}>{c.district}</div></div><span className={`rg-badge ${c.sev==='critical'||c.sev==='high'?'rg-badge-red':'rg-badge-amber'}`}>{c.sev}</span></div><select value={assignments[c.id]||''} onChange={e => setAssignments(p=>({...p,[c.id]:e.target.value}))} className="rg-select" style={{ fontSize:12 }}><option value="">Select officer…</option>{OFFICERS.filter(o=>o.active).map(o => (<option key={o.id} value={o.id}>{o.name} — {o.district} ({o.cases} cases)</option>))}</select>{assignments[c.id] && (<button className="rg-btn rg-btn-primary" style={{ marginTop:8, width:'100%', justifyContent:'center', fontSize:11 }} onClick={() => { toast(`Case assigned to ${OFFICERS.find(o=>o.id===assignments[c.id])?.name}`,'success'); setAssignments(p => { const n={...p}; delete n[c.id]; return n; }); }}>Assign to {OFFICERS.find(o=>o.id===assignments[c.id])?.name}</button>)}</div>))}</div>
      <div><div style={{ fontSize:10, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:10 }}>Officers on Duty</div>{OFFICERS.filter(o=>o.active).map((o,i) => (<div key={i} className="rg-card" style={{ padding:14, marginBottom:8 }}><div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}><div style={{ display:'flex', gap:10, alignItems:'center' }}><div style={{ width:32, height:32, borderRadius:'50%', background:T.greenFade, border:`2px solid ${T.green}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:T.green }}>{o.name.split(' ').map(n=>n[0]).join('')}</div><div><div style={{ fontSize:13, fontWeight:700 }}>{o.name}</div><div style={{ fontSize:11, color:T.t2 }}>{o.district}</div></div></div><div style={{ textAlign:'right' }}><div style={{ fontFamily:F.mono, fontSize:13, color:T.amber }}>{o.cases} cases</div><div style={{ fontSize:10, color:T.t3 }}>current load</div></div></div></div>))}</div>
    </div>
  </div>);
};

// ── OFFICER: SYNC STATUS ─────────────────────────────────────────────────────
const OfficerSync = () => {
  const toast = useToast();
  const [syncing, setSyncing] = useState(false); const [synced, setSynced] = useState(false);
  const queue = [{id:'OFFLINE-001',type:'COMPLETE_INSPECTION',priority:'high',status:'pending',size:'2 photos + checklist'},{id:'OFFLINE-002',type:'CREATE_CASE',priority:'high',status:'pending',size:'GPS + 1 photo'},{id:'OFFLINE-003',type:'RECORD_PAYMENT',priority:'normal',status:'synced',size:'Payment record'},{id:'OFFLINE-004',type:'COMPLETE_INSPECTION',priority:'normal',status:'synced',size:'Checklist only'}];
  const doSync = () => { setSyncing(true); setTimeout(() => { setSyncing(false); setSynced(true); toast('All items synced','success'); }, 2000); };
  return (<div className="fade-in">
    <SectionHeader title="Sync Status" sub="Offline queue · Connection status" />
    <div style={{ background:T.greenFade, border:'1px solid rgba(15,168,106,0.25)', borderRadius:10, padding:16, marginBottom:16, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:10 }}><div style={{ display:'flex', gap:10, alignItems:'center' }}><div style={{ width:10, height:10, borderRadius:'50%', background:T.green }} className="pulse" /><div><div style={{ fontSize:13, fontWeight:700, color:T.green }}>Online · 4G Connected</div><div style={{ fontSize:11, color:T.t2, marginTop:1 }}>rentguard.gh · Last sync: 2 min ago</div></div></div><button className="rg-btn rg-btn-primary" onClick={doSync} style={{ fontSize:11 }}>{syncing?'Syncing…':synced?'✓ Synced':'Sync Now'}</button></div>
    <div style={{ fontSize:10, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:10 }}>Offline Queue</div>
    {queue.map((item,i) => (<div key={i} style={{ background:item.status==='synced'?T.surface:T.card, border:`1px solid ${item.status==='synced'?T.border:item.priority==='high'?'rgba(232,144,10,0.3)':T.border}`, borderRadius:8, padding:'12px 14px', marginBottom:8, display:'flex', gap:12, alignItems:'center' }}><div style={{ width:8, height:8, borderRadius:'50%', flexShrink:0, background:item.status==='synced'?T.green:item.priority==='high'?T.amber:T.t3 }} /><div style={{ flex:1 }}><div style={{ fontSize:12, fontWeight:700, color:item.status==='synced'?T.t2:T.t1 }}>{item.type.replace(/_/g,' ')}</div><div style={{ fontSize:10, color:T.t3, marginTop:2 }}>{item.id} · {item.size}</div></div><span className={`rg-badge ${item.status==='synced'?'rg-badge-green':item.priority==='high'?'rg-badge-amber':'rg-badge-muted'}`}>{item.status}</span></div>))}
    <div style={{ fontSize:10, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:10, marginTop:20 }}>My Stats This Month</div>
    <div className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>{[['14','Inspections'],['8','Cases Filed'],['3','Critical Violations'],['22','Properties Visited']].map(([v,l],i) => (<div key={i} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:8, padding:14, textAlign:'center' }}><div style={{ fontFamily:F.mono, fontSize:24, fontWeight:500, color:T.green }}>{v}</div><div style={{ fontSize:11, color:T.t3, marginTop:4 }}>{l}</div></div>))}</div>
  </div>);
};

// ── OFFICER: SHIFT HANDOVER ──────────────────────────────────────────────────
const ShiftHandover = () => {
  const toast = useToast();
  const [notes, setNotes] = useState(''); const [submitted, setSubmitted] = useState(false);
  return (<div className="fade-in rg-mw" style={{ maxWidth:600 }}>
    <SectionHeader title="Shift Handover" sub="End-of-shift summary · Hand off to next officer" />
    <div className="rg-card" style={{ padding:20, marginBottom:16 }}>
      <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:14 }}>Shift Summary — Ofc. Kofi Mensah</div>
      <div className="rg-r" className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginBottom:16 }}>{[['3','Inspections',T.green],['5','Violations Found',T.red],['2','Cases Generated',T.amber],['6','Photos Captured',T.blue],['1','Offline Syncs',T.t2],['37.5%','Route Complete',T.amber]].map(([v,l,c],i) => (<div key={i} style={{ background:T.bg, borderRadius:6, padding:'10px 12px' }}><div style={{ fontFamily:F.mono, fontSize:18, fontWeight:600, color:c }}>{v}</div><div style={{ fontSize:10, color:T.t3, marginTop:3 }}>{l}</div></div>))}</div>
      <div style={{ marginBottom:14 }}><div style={{ fontFamily:F.mono, fontSize:9, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:8 }}>Pending Properties (not inspected)</div>{['22 Dzorwulu Crescent (P-003)','19 Spintex Road (P-005)','7 Burma Camp Rd'].map((p,i) => (<div key={i} style={{ display:'flex', gap:8, alignItems:'center', padding:'5px 0', borderBottom:'1px solid rgba(36,54,40,0.3)' }}><div style={{ width:6, height:6, borderRadius:'50%', background:T.amber, flexShrink:0 }} /><span style={{ fontSize:12, color:T.t2 }}>{p}</span></div>))}</div>
      <div className="rg-field"><label>Handover Notes to Ofc. Patricia Asare</label><textarea className="rg-textarea" rows={4} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Urgent items, landlord contacts, access issues…" /></div>
      {submitted?(<div style={{ padding:12, background:T.greenFade, border:'1px solid rgba(15,168,106,0.2)', borderRadius:6, fontFamily:F.mono, fontSize:11, color:T.green }}>Handover submitted · Ofc. Asare notified · Shift log archived</div>):(<button className="rg-btn rg-btn-primary" onClick={() => { setSubmitted(true); toast('Shift handover submitted','success'); }}>Submit Handover Report</button>)}
    </div>
  </div>);
};

// ── LANDLORD: TAX SUMMARY ────────────────────────────────────────────────────
const LandlordTaxSummary = () => {
  const toast = useToast();
  return (<div className="fade-in">
    <SectionHeader title="Tax & Income Summary" sub="Tax Year 2025 · GRA Reference: GH-TIN-8821-4490" action={<button className="rg-btn rg-btn-ghost" style={{ fontSize:11 }} onClick={() => toast('Tax summary downloaded','success')}>↓ Download Statement</button>} />
    <div style={{ padding:'12px 16px', background:T.blueFade, border:'1px solid rgba(59,130,246,0.15)', borderLeft:`3px solid ${T.blue}`, borderRadius:6, marginBottom:20, fontSize:12, color:T.t2, lineHeight:1.7 }}>This summary is derived from your rent cards and payment records. Your TIN (8% rental income tax rate) is shared with GRA as part of the Rent Taskforce data-sharing mandate.</div>
    <div className="rg-r" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:20 }}>{[['GH₵ 194K','Est. Annual Income','All 6 tenancies',T.lime],['GH₵ 120K','Declared to GRA','Based on filings',T.green],['GH₵ 74K','Potential Undeclared Gap','Reconcile with GRA',T.red],['GH₵ 15,552','Estimated Tax Due','At 8% rental rate',T.amber],['GH₵ 9,600','Tax Paid (on record)','From GRA receipts',T.green],['GH₵ 5,952','Outstanding Balance','Reconcile with GRA',T.red]].map(([v,l,sub,c],i) => (<div key={i} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:8, padding:16 }}><div style={{ fontFamily:F.mono, fontSize:20, fontWeight:600, color:c, marginBottom:4 }}>{v}</div><div style={{ fontSize:12, fontWeight:600, color:T.t1, marginBottom:2 }}>{l}</div><div style={{ fontSize:11, color:T.t3 }}>{sub}</div></div>))}</div>
    <div className="rg-card" style={{ padding:20 }}>
      <div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:14 }}>Income by Property</div>
      <div style={{ overflowX:'auto' }}><table className="rg-table"><thead><tr><th>Property</th><th>Units</th><th>Monthly Income</th><th>Annual Estimate</th><th>Tax Due</th><th>Registered</th></tr></thead><tbody>{LANDLORD_DATA.props.map((p,i) => { const monthly=p.units*1800; const annual=monthly*12; return (<tr key={i}><td style={{ fontSize:12, fontWeight:600 }}>{p.address}</td><td style={{ fontFamily:F.mono, fontSize:12 }}>{p.units}</td><td style={{ fontFamily:F.mono, fontSize:12 }}>GH₵ {monthly.toLocaleString()}</td><td><span style={{ fontFamily:F.mono, fontSize:12, fontWeight:700, color:T.lime }}>GH₵ {annual.toLocaleString()}</span></td><td style={{ fontFamily:F.mono, fontSize:12, color:T.amber }}>GH₵ {Math.round(annual*0.08).toLocaleString()}</td><td><span className={`rg-badge ${p.registered?'rg-badge-green':'rg-badge-red'}`}>{p.registered?'Yes':'No'}</span></td></tr>); })}</tbody></table></div>
    </div>
  </div>);
};

// ── TENANT: COMPLAINT TRACKER ────────────────────────────────────────────────
const ComplaintTracker = () => {
  const statusSteps = ['received','under_investigation','notice_issued','referred_to_court','resolved'];
  const curStep = 1;
  const updates = [
    { date:'2026-03-10 14:22', msg:'Your complaint was received and logged. Case ID assigned.', type:'system' },
    { date:'2026-03-10 15:04', msg:'Severity confirmed as CRITICAL. Assigned to Ofc. Kofi Mensah.', type:'action' },
    { date:'2026-03-11 09:15', msg:'Officer visited property. Landlord contacted. Formal notice being prepared.', type:'update' },
    { date:'2026-03-12 11:30', msg:'Landlord\'s "deposit" argument reviewed — not valid under Act 220.', type:'update' },
  ];
  const statusColors = { system:T.t3, action:T.green, update:T.amber };
  return (<div className="fade-in rg-mw" style={{ maxWidth:640 }}>
    <SectionHeader title="My Complaints" sub="Track the status of your filed complaints in real time" />
    <div className="rg-card" style={{ padding:0, overflow:'hidden' }}>
      <div style={{ padding:'16px 20px', borderBottom:`1px solid ${T.border}`, background:T.surfaceL }}><div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}><div><div style={{ fontFamily:F.mono, fontSize:11, color:T.green, marginBottom:4 }}>RC-2026-ACC-00291</div><div style={{ fontFamily:F.head, fontSize:16, fontWeight:700 }}>Illegal Advance Rent</div><div style={{ fontSize:12, color:T.t2, marginTop:2 }}>Filed 2026-03-10</div></div><span className="rg-badge rg-badge-amber">under investigation</span></div></div>
      <div style={{ padding:'16px 20px', borderBottom:`1px solid ${T.border}` }}><div style={{ display:'flex', alignItems:'center', overflowX:'auto', paddingBottom:4 }}>
        {statusSteps.map((s,i) => { const done=i<=curStep; const current=i===curStep; return (<div key={s} style={{ display:'flex', alignItems:'center', flexShrink:0 }}><div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:5 }}><div style={{ width:24, height:24, borderRadius:'50%', background:done?T.green:T.border, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:current?'0 0 0 3px rgba(15,168,106,0.25)':undefined }}>{done && <span style={{ fontSize:10, color:'#fff' }}>✓</span>}</div><span style={{ fontSize:8, fontWeight:700, color:done?T.green:T.t3, letterSpacing:0.5, textTransform:'uppercase', textAlign:'center', maxWidth:64, lineHeight:1.3 }}>{s.replace(/_/g,' ')}</span></div>{i<statusSteps.length-1 && <div style={{ width:32, height:2, background:i<curStep?T.green:T.border, margin:'0 4px 18px' }} />}</div>); })}
      </div></div>
      <div style={{ padding:'16px 20px' }}><div style={{ fontFamily:F.mono, fontSize:9, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:12 }}>Activity Timeline</div>{updates.map((u,i) => (<div key={i} style={{ display:'flex', gap:12, marginBottom:12 }}><div style={{ display:'flex', flexDirection:'column', alignItems:'center', flexShrink:0 }}><div style={{ width:8, height:8, borderRadius:'50%', background:statusColors[u.type], marginTop:3 }} />{i<updates.length-1 && <div style={{ width:1, flex:1, background:T.border, marginTop:4 }} />}</div><div style={{ flex:1, paddingBottom:i<updates.length-1?8:0 }}><div style={{ fontFamily:F.mono, fontSize:9, color:T.t3, marginBottom:4 }}>{u.date}</div><div style={{ fontSize:12, color:T.t2, lineHeight:1.65 }}>{u.msg}</div></div></div>))}</div>
    </div>
  </div>);
};

// ── TENANT: PAYMENT RECEIPTS ─────────────────────────────────────────────────
const PaymentReceipt = () => {
  const toast = useToast();
  const receipts = [{id:'REC-2026-001',date:'2026-03-01',amount:1800,method:'MTN MoMo',period:'March 2026',status:'verified'},{id:'REC-2026-002',date:'2026-02-01',amount:1800,method:'MTN MoMo',period:'February 2026',status:'verified'},{id:'REC-2025-ADV',date:'2025-11-01',amount:16200,method:'Bank Transfer',period:'Nov 2025 – Jul 2026 (advance)',status:'flagged'}];
  return (<div className="fade-in">
    <SectionHeader title="My Payment Receipts" sub="Verified · Tamper-logged · Court-admissible" />
    <div className="rg-card" style={{ padding:0 }}><div style={{ overflowX:'auto' }}><table className="rg-table rg-table-clickable"><thead><tr><th>Receipt ID</th><th>Date</th><th>Amount</th><th>Period</th><th>Method</th><th>Status</th><th></th></tr></thead><tbody>{receipts.map((r,i) => (<tr key={i}><td><span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>{r.id}</span></td><td><span style={{ fontFamily:F.mono, fontSize:11, color:T.t2 }}>{r.date}</span></td><td><span style={{ fontFamily:F.mono, fontSize:12, fontWeight:700 }}>GH₵ {r.amount.toLocaleString()}</span></td><td style={{ fontSize:12, color:r.status==='flagged'?T.red:T.t2 }}>{r.period}</td><td style={{ fontSize:12, color:T.t2 }}>{r.method}</td><td><span className={`rg-badge ${r.status==='verified'?'rg-badge-green':'rg-badge-red'}`}>{r.status}</span></td><td><button className="rg-btn rg-btn-ghost" style={{ fontSize:10, padding:'3px 8px' }} onClick={() => toast('Receipt PDF downloaded','success')}>↓ PDF</button></td></tr>))}</tbody></table></div></div>
  </div>);
};

// ── TENANT: EVICTION & LEGAL AID ─────────────────────────────────────────────
const EvictionAndLegalAid = () => {
  const toast = useToast();
  const [alertFiled, setAlertFiled] = useState(false); const [alertType, setAlertType] = useState('');
  const legalAid = [{org:'Rent Control Department',service:'Free mediation and dispute resolution',contact:'0302-664-000',type:'government'},{org:'Legal Aid Commission',service:'Free legal representation for low-income tenants',contact:'0302-664-000',type:'government'},{org:'Ghana Bar Association',service:'Referral to pro-bono property lawyers',contact:'0302-664-000',type:'private'},{org:'National Tenants Union',service:'Tenant rights advocacy and advice',contact:'0244-315-500',type:'ngo'},{org:'CHRAJ Ghana',service:'Human rights complaints including unlawful eviction',contact:'0302-664-000',type:'government'}];
  const orgColor = { government:T.green, private:T.blue, ngo:T.amber };
  return (<div className="fade-in">
    <SectionHeader title="Eviction Protection & Legal Aid" sub="Your rights · Emergency alert · Free legal resources" />
    <div style={{ padding:'16px 20px', background:T.redFade, border:'1px solid rgba(229,72,58,0.3)', borderLeft:`4px solid ${T.red}`, borderRadius:8, marginBottom:20 }}>
      <div style={{ fontFamily:F.head, fontSize:16, fontWeight:700, color:T.red, marginBottom:6 }}>Are you facing unlawful eviction?</div>
      <div style={{ fontSize:13, color:T.t2, lineHeight:1.7, marginBottom:14 }}>Your landlord CANNOT evict you without: (1) a valid legal ground, (2) written notice, and (3) a Rent and Housing Committee order. Lock-outs, removing belongings, cutting utilities, or threats are all illegal under Act 220 s.18.</div>
      {alertFiled?(<div style={{ padding:'12px 14px', background:T.greenFade, border:'1px solid rgba(15,168,106,0.25)', borderRadius:6 }}><div style={{ fontFamily:F.mono, fontSize:11, fontWeight:700, color:T.green, marginBottom:4 }}>EMERGENCY ALERT SENT</div><div style={{ fontSize:12, color:T.t2 }}>Rent Control emergency line notified. An officer will contact you within 2 hours. Ref: EVA-2026-00044</div></div>):(<><div style={{ display:'flex', gap:6, marginBottom:10, flexWrap:'wrap' }}>{['Lock-out / door blocked','Belongings removed','Utilities cut','Physical threats','Court order served'].map(t => (<div key={t} onClick={() => setAlertType(t)} style={{ padding:'7px 12px', borderRadius:20, cursor:'pointer', fontSize:12, background:alertType===t?T.redFade:'transparent', border:`1px solid ${alertType===t?T.red:T.border}`, color:alertType===t?T.red:T.t2 }}>{t}</div>))}</div><button className="rg-btn rg-btn-danger" disabled={!alertType} onClick={() => { setAlertFiled(true); toast('Emergency alert sent','error'); }}>File Emergency Eviction Alert →</button></>)}
    </div>
    <div className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:20 }}>{[{ground:'Non-payment of rent',valid:true},{ground:'Breach of agreement',valid:true},{ground:'Landlord personal use',valid:true},{ground:'Because tenant complained',valid:false},{ground:'Without any notice',valid:false},{ground:'Redevelopment (with notice)',valid:true}].map((item,i) => (<div key={i} style={{ padding:'12px 14px', background:item.valid?'rgba(15,168,106,0.05)':'rgba(229,72,58,0.06)', border:`1px solid ${item.valid?'rgba(15,168,106,0.15)':'rgba(229,72,58,0.15)'}`, borderRadius:6 }}><div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:5 }}><span style={{ fontSize:12, color:item.valid?T.green:T.red }}>{item.valid?'✓':'✗'}</span><span style={{ fontSize:12, fontWeight:700, color:item.valid?T.green:T.red }}>{item.valid?'VALID GROUND':'ILLEGAL'}</span></div><div style={{ fontSize:12, color:T.t1 }}>{item.ground}</div></div>))}</div>
    <div style={{ fontFamily:F.head, fontSize:15, fontWeight:700, marginBottom:14 }}>Free Legal Aid in Ghana</div>
    {legalAid.map((org,i) => (<div key={i} className="rg-card" style={{ padding:16, marginBottom:10, borderLeft:`3px solid ${orgColor[org.type]}` }}><div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}><div style={{ flex:1, paddingRight:12 }}><div style={{ fontFamily:F.head, fontSize:14, fontWeight:700, marginBottom:3 }}>{org.org}</div><div style={{ fontSize:12, color:T.t2, marginBottom:6 }}>{org.service}</div><span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>{org.contact}</span></div><button className="rg-btn rg-btn-ghost" style={{ fontSize:11, flexShrink:0 }} onClick={() => toast(`Calling ${org.org}…`,'info')}>Call Now</button></div></div>))}
  </div>);
};

// ── TENANT: NOTIFICATIONS ────────────────────────────────────────────────────
const NotificationCentre = () => {
  const [notifs, setNotifs] = useState([{id:1,title:'Case Update — RC-2026-ACC-00291',body:'Officer Mensah visited your property. Notice being prepared.',time:'2 hours ago',read:false,type:'case'},{id:2,title:'Advance Violation Confirmed',body:'Your complaint about excess advance rent has been confirmed.',time:'Yesterday',read:false,type:'alert'},{id:3,title:'Rent Card Verified',body:'Your Rent Card RG-2025-ACC-00123 was verified by Rent Control.',time:'3 days ago',read:true,type:'info'},{id:4,title:'Know Your Rights Reminder',body:'April 1 is the Rent Card mandate deadline. Demand your card.',time:'1 week ago',read:true,type:'info'}]);
  const unread = notifs.filter(n=>!n.read).length;
  const typeColor = { case:T.amber, alert:T.red, info:T.blue };
  return (<div className="fade-in rg-mw" style={{ maxWidth:520 }}>
    <SectionHeader title="Notifications" sub={`${unread} unread`} action={<button className="rg-btn rg-btn-ghost" style={{ fontSize:11 }} onClick={() => setNotifs(p=>p.map(n=>({...n,read:true})))}>Mark all read</button>} />
    {notifs.map((n,i) => (<div key={n.id} onClick={() => setNotifs(p=>p.map(x=>x.id===n.id?{...x,read:true}:x))} style={{ display:'flex', gap:12, padding:'14px 0', borderBottom:i<notifs.length-1?`1px solid ${T.border}`:'none', cursor:'pointer', opacity:n.read?0.6:1, transition:'opacity 0.2s' }}><div style={{ width:9, height:9, borderRadius:'50%', background:n.read?T.border:typeColor[n.type], flexShrink:0, marginTop:4 }} /><div style={{ flex:1 }}><div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:4 }}><div style={{ fontSize:13, fontWeight:n.read?400:700, color:T.t1 }}>{n.title}</div><span style={{ fontFamily:F.mono, fontSize:10, color:T.t3, flexShrink:0, marginLeft:10 }}>{n.time}</span></div><div style={{ fontSize:12, color:T.t2, lineHeight:1.6 }}>{n.body}</div></div></div>))}
  </div>);
};

// ── USSD SIMULATOR ───────────────────────────────────────────────────────────
const USSDSimulator = () => {
  const [step, setStep] = useState('idle'); const [input, setInput] = useState('');
  const SCREEN = { idle:{text:'Dial *714*1# to start',prompt:null}, main:{text:'CON Ghana Rent Control\n\n1. Verify Rent Card\n2. File Complaint\n3. Check Landlord\n4. My Rights',prompt:'Enter option:'}, verify_prompt:{text:'CON Enter your Rent Card number\n(e.g. RG-2025-ACC-00123)',prompt:'Card number:'}, verify_ok:{text:'END RENT CARD VERIFIED\n\nCard: RG-2025-ACC-00123\nAddress: 14 Osu Ako-Adjei Ave\nRent: GHS 1,800/month\nStatus: ACTIVE\n\nAdvance: VIOLATION (9.5 mo)\n\nReport: *714*1# > Option 2',prompt:null}, verify_fail:{text:'END CARD NOT FOUND\n\nNot in Rent Control registry.\nViolation of PNDCL 138 s.5.\n\nReport: *714*1# > Option 2\nHotline: 0302-664-000',prompt:null}, complaint_done:{text:'END COMPLAINT FILED\n\nCase ID: RC-2026-ACC-00293\n\nA Rent Control officer will\ncontact you within 48 hours.\n\nHotline: 0302-664-000',prompt:null}, rights:{text:'END YOUR RIGHTS:\n\n• Max 6 months advance rent\n  (Act 220 s.16)\n• Right to written agreement\n  (PNDCL 138 s.4)\n• Right to Rent Card\n  (Act 220 s.20)\n• Protected from eviction\n\nHotline: 0302-664-000',prompt:null} };
  const transitions = { idle:(val)=>val==='*714*1#'?'main':null, main:(val)=>({1:'verify_prompt',2:'complaint_done',3:'verify_prompt',4:'rights'})[val]||null, verify_prompt:(val)=>RENT_CARDS[val.toUpperCase()]?'verify_ok':'verify_fail' };
  const submit = () => { if(!input.trim()) return; const next=transitions[step]?.(input.trim()); if(!next) return; setStep(next); setInput(''); };
  const reset = () => { setStep('idle'); setInput(''); };
  const cur = SCREEN[step]; const isEnd=cur?.text?.startsWith('END');
  return (<div style={{ padding:14, display:'flex', flexDirection:'column', height:'100%' }}>
    <div style={{ fontFamily:F.mono, fontSize:9, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:10 }}>USSD Simulator · *714*1#</div>
    <div style={{ flex:1, background:T.bg, borderRadius:8, border:`1px solid ${T.border}`, padding:'16px 14px', display:'flex', flexDirection:'column' }}>
      <div style={{ flex:1 }}>{step==='idle'?(<div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:12 }}><div style={{ fontFamily:F.mono, fontSize:22, color:T.border }}>*714*1#</div><div style={{ fontSize:12, color:T.t3, textAlign:'center', lineHeight:1.6 }}>Type the USSD code below</div></div>):(<div style={{ fontFamily:F.mono, fontSize:11, color:isEnd?T.green:T.t1, lineHeight:1.9, whiteSpace:'pre-wrap' }}>{cur.text}</div>)}</div>
      <div style={{ borderTop:`1px solid ${T.border}`, paddingTop:10, marginTop:10 }}>{isEnd||!cur?.prompt?(<button onClick={reset} style={{ width:'100%', background:'transparent', border:`1px solid ${T.border}`, borderRadius:4, padding:8, fontFamily:F.mono, fontSize:10, color:T.t3, cursor:'pointer' }}>END SESSION · Dial again</button>):(<div style={{ display:'flex', gap:6 }}><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()} placeholder={cur.prompt} className="rg-input" style={{ flex:1, background:T.surface, fontFamily:F.mono, fontSize:11 }} /><button onClick={submit} style={{ background:T.green, color:'#fff', border:'none', borderRadius:4, padding:'0 14px', fontFamily:F.mono, fontSize:11, fontWeight:700, cursor:'pointer' }}>Send</button></div>)}</div>
    </div>
    <div style={{ marginTop:10 }}><div style={{ fontFamily:F.mono, fontSize:9, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:6 }}>Quick demos</div><div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>{[['Verify Card',()=>{reset();setTimeout(()=>setStep('verify_prompt'),0);}],['File Complaint',()=>{reset();setTimeout(()=>setStep('complaint_done'),0);}],['View Rights',()=>{reset();setTimeout(()=>setStep('rights'),0);}]].map(([l,fn],i)=>(<button key={i} onClick={fn} style={{ padding:'5px 10px', background:'transparent', border:`1px solid ${T.border}`, borderRadius:4, fontFamily:F.mono, fontSize:9, color:T.t3, cursor:'pointer' }}>{l}</button>))}</div></div>
  </div>);
};

// ── TENANT DASHBOARD ─────────────────────────────────────────────────────────
const TenantDashboard = ({ onNav }) => {
  const toast = useToast();
  return (<div className="fade-in">
    <SectionHeader title="My Tenancy" sub="Abena Sarpong · 14 Osu Ako-Adjei Ave, Unit 2A" />
    <div style={{ padding:'14px 18px', background:T.redFade, border:'1px solid rgba(229,72,58,0.25)', borderLeft:`4px solid ${T.red}`, borderRadius:8, marginBottom:16, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}><div style={{ flex:1, minWidth:200 }}><div style={{ fontSize:13, fontWeight:700, color:T.red, marginBottom:3 }}>Advance Rent Violation Detected</div><div style={{ fontSize:12, color:T.t2, lineHeight:1.6 }}>Your landlord collected 9.5 months advance — the legal cap is 6 months. Excess: ~GH₵ 6,300.</div></div><button className="rg-btn rg-btn-danger" style={{ flexShrink:0, fontSize:11 }} onClick={() => onNav && onNav('complaint')}>File Complaint</button></div>
    <div className="rg-r" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:16 }}>
      <div className="rg-card" style={{ padding:20 }}><div style={{ fontSize:10, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:12 }}>Your Rent Card</div><div style={{ fontFamily:F.mono, fontSize:13, fontWeight:700, color:T.green, marginBottom:2 }}>RG-2025-ACC-00123</div><div style={{ fontSize:11, color:T.t2, marginBottom:14 }}>Active · Issued 2025-11-01</div><InfoRow label="Property" value="14 Osu Ako-Adjei Ave" /><InfoRow label="Monthly Rent" value="GH₵ 1,800" mono /><InfoRow label="Advance Paid" value="9.5 months" mono color={T.red} /><InfoRow label="Legal Limit" value="6 months" mono color={T.green} /></div>
      <div className="rg-card" style={{ padding:20 }}><div style={{ fontSize:10, fontWeight:700, color:T.t3, letterSpacing:1.5, textTransform:'uppercase', marginBottom:12 }}>Your Rights Status</div>{[{right:'Written Tenancy Agreement',ok:true,law:'PNDCL 138 s.4'},{right:'Registered Tenancy',ok:false,law:'PNDCL 138 s.4'},{right:'Official Rent Card',ok:true,law:'Act 220 s.20'},{right:'Advance Within Limit',ok:false,law:'Act 220 s.16(5)'},{right:'Habitable Premises',ok:true,law:'Act 220 s.17'}].map((r,i)=>(<div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'7px 0', borderBottom:i<4?'1px solid rgba(36,54,40,0.4)':'none' }}><span style={{ fontSize:14, color:r.ok?T.green:T.red, flexShrink:0 }}>{r.ok?'✓':'✗'}</span><div style={{ flex:1 }}><div style={{ fontSize:12, color:r.ok?T.t1:T.red, fontWeight:r.ok?400:600 }}>{r.right}</div><div style={{ fontFamily:F.mono, fontSize:9, color:T.t3 }}>{r.law}</div></div>{!r.ok&&<button className="rg-btn rg-btn-danger" style={{ fontSize:10, padding:'3px 8px' }} onClick={()=>onNav&&onNav('complaint')}>Act</button>}</div>))}</div>
    </div>
    <div className="rg-card" style={{ padding:0 }}><div style={{ padding:'14px 20px', borderBottom:`1px solid ${T.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}><span style={{ fontFamily:F.head, fontSize:14, fontWeight:700 }}>My Complaints</span><span className="rg-badge rg-badge-amber">1 open</span></div><div style={{ overflowX:'auto' }}><table className="rg-table"><thead><tr><th>Case ID</th><th>Type</th><th>Opened</th><th>Status</th><th>Update</th></tr></thead><tbody><tr><td><span style={{ fontFamily:F.mono, fontSize:11, color:T.green }}>RC-2026-ACC-00291</span></td><td style={{ fontSize:12 }}>Illegal Advance Rent</td><td><span style={{ fontFamily:F.mono, fontSize:11, color:T.t3 }}>2026-03-10</span></td><td><span className="rg-badge rg-badge-amber">under investigation</span></td><td style={{ fontSize:12, color:T.t2 }}>Ofc. Mensah contacted landlord. Notice pending.</td></tr></tbody></table></div></div>
  </div>);
};

// ── LOGIN SCREEN ─────────────────────────────────────────────────────────────
const LoginScreen = ({ onLogin }) => {
  const [email,setEmail]=useState(''); const [pass,setPass]=useState('');
  const [error,setError]=useState(''); const [loading,setLoading]=useState(false);
  const [showPass,setShowPass]=useState(false); const [demoOpen,setDemoOpen]=useState(false);
  const attempt=(e)=>{e&&e.preventDefault();setError('');setLoading(true);setTimeout(()=>{const match=DEMO_ACCOUNTS.find(a=>a.email===email&&a.pass===pass);if(match){onLogin(match);}else{setError('Invalid email or password. Use a demo account below.');setLoading(false);}},900);};
  const quickLogin=(account)=>{setEmail(account.email);setPass(account.pass);setError('');setLoading(true);setTimeout(()=>onLogin(account),700);};
  const L={label:{display:'block',fontSize:11,fontWeight:700,color:'#C8D8C4',letterSpacing:0.8,marginBottom:6,textTransform:'uppercase'},input:{width:'100%',padding:'10px 14px',background:'#0B1210',border:'1.5px solid #3A5245',borderRadius:6,color:T.t1,fontFamily:F.body,fontSize:13,outline:'none',boxSizing:'border-box'}};
  return (<div style={{ minHeight:'100vh', background:T.bg, display:'flex', alignItems:'center', justifyContent:'center', padding:24, fontFamily:F.body }}>
    <div style={{ width:'100%', maxWidth:400 }}>
      <div style={{ textAlign:'center', marginBottom:36 }}><div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12, marginBottom:14 }}><div style={{ width:40, height:40, borderRadius:10, background:T.green, display:'flex', alignItems:'center', justifyContent:'center' }}><span style={{ fontFamily:F.head, fontWeight:800, fontSize:20, color:T.bg }}>R</span></div><span style={{ fontFamily:F.head, fontSize:26, fontWeight:700, color:T.t1 }}>RentGuard</span></div><div style={{ fontFamily:F.mono, fontSize:10, color:'#4A6A56', letterSpacing:2.5, textTransform:'uppercase', marginBottom:6 }}>Ghana Rent Enforcement Platform</div><div style={{ fontSize:12, color:'#4A6A56' }}>Rent Control Department · Ministry of Works and Housing</div></div>
      <div style={{ background:T.surface, border:`1px solid ${T.borderL}`, borderRadius:14, padding:32, boxShadow:'0 20px 60px rgba(0,0,0,0.5)' }}>
        <div style={{ fontFamily:F.head, fontSize:20, fontWeight:700, marginBottom:24 }}>Sign In</div>
        <form onSubmit={attempt}><div style={{ marginBottom:16 }}><label style={L.label}>Email</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your.name@rentcontrol.gov.gh" style={L.input} /></div><div style={{ marginBottom:20 }}><label style={L.label}>Password</label><div style={{ position:'relative' }}><input type={showPass?'text':'password'} value={pass} onChange={e=>setPass(e.target.value)} placeholder="Enter password" style={{...L.input,paddingRight:52}} /><button type="button" onClick={()=>setShowPass(s=>!s)} style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', background:'transparent', border:'none', color:'#4A6A56', cursor:'pointer', fontFamily:F.mono, fontSize:10, fontWeight:700 }}>{showPass?'HIDE':'SHOW'}</button></div></div>{error&&(<div style={{ padding:'10px 14px', background:T.redFade, border:'1px solid rgba(229,72,58,0.3)', borderRadius:6, fontSize:12, color:T.red, marginBottom:16 }}>{error}</div>)}<button type="submit" disabled={loading||!email||!pass} style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'12px 20px', background:loading||!email||!pass?'#1A3028':T.green, color:loading||!email||!pass?'#4A6A56':'#fff', border:'none', borderRadius:8, fontFamily:F.body, fontSize:13, fontWeight:700, cursor:loading||!email||!pass?'not-allowed':'pointer' }}>{loading?<><span style={{ width:14, height:14, border:'2px solid rgba(255,255,255,0.25)', borderTopColor:'#fff', borderRadius:'50%', display:'inline-block', animation:'spin 0.8s linear infinite' }}/>Signing in…</>:'Sign In →'}</button></form>
        <div style={{ marginTop:18, textAlign:'center' }}><button type="button" onClick={()=>setDemoOpen(s=>!s)} style={{ background:'transparent', border:'none', fontFamily:F.mono, fontSize:10, color:'#4A6A56', cursor:'pointer', letterSpacing:1, textDecoration:'underline', textDecorationStyle:'dotted', textUnderlineOffset:3 }}>{demoOpen?'↑ Hide demo accounts':'↓ View demo accounts'}</button></div>
        {demoOpen&&(<div style={{ marginTop:14 }} className="slide-up"><div style={{ fontFamily:F.mono, fontSize:9, color:'#4A6A56', letterSpacing:1.5, textTransform:'uppercase', marginBottom:10 }}>Demo Accounts · password: demo2026</div>{DEMO_ACCOUNTS.map((a,i)=>(<button key={i} type="button" onClick={()=>quickLogin(a)} style={{ width:'100%', display:'flex', alignItems:'center', gap:12, padding:'10px 12px', background:'#0D1610', border:`1px solid ${T.borderL}`, borderRadius:8, cursor:'pointer', marginBottom:6, textAlign:'left' }} onMouseEnter={e=>e.currentTarget.style.borderColor=a.color} onMouseLeave={e=>e.currentTarget.style.borderColor=T.borderL}><div style={{ width:32, height:32, borderRadius:'50%', background:`${a.color}18`, border:`2px solid ${a.color}`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:F.mono, fontSize:10, fontWeight:700, color:a.color, flexShrink:0 }}>{a.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div><div style={{ flex:1, minWidth:0 }}><div style={{ fontSize:12, fontWeight:700, color:T.t1, marginBottom:2 }}>{a.name}</div><div style={{ fontSize:11, color:'#6A8A76', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{a.role} · {a.email}</div></div><div style={{ fontFamily:F.mono, fontSize:9, color:a.color, opacity:0.8 }}>→</div></button>))}</div>)}
      </div>
      <div style={{ textAlign:'center', marginTop:20 }}><div style={{ fontFamily:F.mono, fontSize:9, color:'#2A4030', letterSpacing:1 }}>Act 220 · PNDCL 138 · Enforcement v4.1 · March 2026</div></div>
    </div>
  </div>);
};

// ── MOBILE TOP BAR ───────────────────────────────────────────────────────────
const MobileTopBar = ({ currentUser, navPage, role, onAccount }) => {
  const accent = {admin:T.green,manager:T.blue,officer:T.amber,landlord:'#C8E830',tenant:T.red}[role]||T.green;
  const roleLabel = {admin:'Admin',manager:'Manager',officer:'Officer',landlord:'Landlord',tenant:'Tenant'}[role]||'User';
  const titles = {dashboard:'Dashboard',activity:'Activity',regions:'Regions',cases:'Cases',sla:'SLA',flow:'Flow',officers:'Officers',gra:'GRA',audit:'Audit',settings:'Settings',account:'Account',queue:'Queue',casedetail:'Case',assign:'Assign',home:'Shift',sync:'Sync',handover:'Handover',overview:'Overview',register:'Register',tenants:'Tenants',payments:'Payments',tax:'Tax',mytenancy:'Home',tracker:'Complaints',receipts:'Receipts',eviction:'Legal Aid',notifications:'Alerts',ussd:'USSD',verify:'Verify',complaint:'Report',calc:'Calc'};
  return (<div style={{height:56,background:T.surface,borderBottom:`1px solid ${T.border}`,display:'flex',alignItems:'center',padding:'0 14px',gap:12,flexShrink:0}}>
    <div style={{width:30,height:30,borderRadius:7,background:T.green,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}><span style={{fontFamily:F.head,fontWeight:800,fontSize:16,color:T.bg}}>R</span></div>
    <div style={{flex:1,minWidth:0}}>
      <div style={{fontFamily:F.head,fontSize:15,fontWeight:700,color:T.t1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{titles[navPage]||navPage}</div>
      <div style={{display:'flex',alignItems:'center',gap:6,marginTop:1}}><div style={{width:5,height:5,borderRadius:'50%',background:T.green}} className="pulse"/><span style={{fontFamily:F.mono,fontSize:9,color:T.t3,letterSpacing:0.5}}>LIVE</span><span style={{fontFamily:F.mono,fontSize:9,color:T.border}}>·</span><span style={{fontFamily:F.mono,fontSize:9,color:accent,fontWeight:600}}>{roleLabel}</span></div>
    </div>
    <button onClick={onAccount} style={{background:'transparent',border:'none',cursor:'pointer',padding:0,flexShrink:0}}><div style={{width:32,height:32,borderRadius:'50%',background:`${accent}18`,border:`1.5px solid ${accent}`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:F.mono,fontSize:10,fontWeight:700,color:accent}}>{(currentUser?.name||'U').split(' ').map(n=>n[0]).join('').slice(0,2)}</div></button>
  </div>);
};

// ── MOBILE BOTTOM TABS ───────────────────────────────────────────────────────
const MobIcon = ({d,active,color}) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active?color:'#536358'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d}/></svg>);
const MobileBottomTabs = ({ role, navPage, onNav }) => {
  const accent = {admin:T.green,manager:T.blue,officer:T.amber,landlord:'#C8E830',tenant:T.red}[role]||T.green;
  const I = {home:'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z',cases:'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6',flow:'M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3',gra:'M12 1v22 M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6',settings:'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33',queue:'M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2 M9 12h6 M9 16h6 M15 2H9v2h6z',sla:'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2',assign:'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87',shift:'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z M12 13a3 3 0 100-6 3 3 0 000 6z',sync:'M23 4v6h-6 M1 20v-6h6 M3.51 9a9 9 0 0114.85-3.36L23 10 M1 14l4.64 4.36A9 9 0 0020.49 15',handover:'M17 1l4 4-4 4 M3 11V9a4 4 0 014-4h14 M7 23l-4-4 4-4 M21 13v2a4 4 0 01-4 4H3',ussd:'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 M3.59 1.68l2 2',overview:'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 100-6 3 3 0 000 6z',tenants:'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8z',payments:'M12 1v22 M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6',tax:'M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z',track:'M22 11.08V12a10 10 0 11-5.93-9.14',verify:'M9 11l3 3L22 4 M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11',complaint:'M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z',account:'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z'};
  const tabs = {
    admin:[{id:'dashboard',label:'Home',icon:I.home},{id:'cases',label:'Cases',icon:I.cases},{id:'flow',label:'Flow',icon:I.flow},{id:'gra',label:'GRA',icon:I.gra},{id:'settings',label:'More',icon:I.settings}],
    manager:[{id:'queue',label:'Queue',icon:I.queue},{id:'sla',label:'SLA',icon:I.sla},{id:'assign',label:'Assign',icon:I.assign},{id:'account',label:'Me',icon:I.account}],
    officer:[{id:'home',label:'Shift',icon:I.shift},{id:'sync',label:'Sync',icon:I.sync},{id:'handover',label:'Handover',icon:I.handover},{id:'ussd',label:'USSD',icon:I.ussd},{id:'account',label:'Me',icon:I.account}],
    landlord:[{id:'overview',label:'Home',icon:I.overview},{id:'tenants',label:'Tenants',icon:I.tenants},{id:'payments',label:'Pay',icon:I.payments},{id:'tax',label:'Tax',icon:I.tax},{id:'account',label:'Me',icon:I.account}],
    tenant:[{id:'mytenancy',label:'Home',icon:I.home},{id:'tracker',label:'Track',icon:I.track},{id:'verify',label:'Verify',icon:I.verify},{id:'complaint',label:'Report',icon:I.complaint},{id:'account',label:'Me',icon:I.account}],
  };
  const items = tabs[role]||tabs.admin;
  return (<div style={{height:64,background:T.surface,borderTop:`1px solid ${T.border}`,display:'flex',flexShrink:0,paddingBottom:'env(safe-area-inset-bottom,0px)'}}>
    {items.map(tab=>{const active=navPage===tab.id||(tab.id==='queue'&&navPage==='casedetail');return(<button key={tab.id} onClick={()=>onNav(tab.id)} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:3,background:'transparent',border:'none',cursor:'pointer',padding:'8px 0',opacity:active?1:0.55,transition:'opacity 0.15s'}}><MobIcon d={tab.icon} active={active} color={accent}/><span style={{fontFamily:F.mono,fontSize:9,fontWeight:700,color:active?accent:T.t3,letterSpacing:0.3}}>{tab.label}</span>{active&&<div style={{width:4,height:4,borderRadius:2,background:accent,marginTop:-1}}/>}</button>);})}
  </div>);
};

// ── EXPANDED NAVIGATION ──────────────────────────────────────────────────────
const NAV = {
  admin:[
    {id:'dashboard',label:'Dashboard',dot:T.green},{id:'activity',label:'Live Activity',dot:T.lime},{id:'regions',label:'Regions',dot:T.blue},
    {id:'cases',label:'All Cases',dot:T.amber},{id:'flow',label:'Enforcement Flow',dot:T.lime},{id:'officers',label:'Officers',dot:T.green},
    {id:'gra',label:'GRA Export',dot:T.amber},{id:'audit',label:'Audit Log',dot:T.t3},{id:'settings',label:'Settings',dot:T.t3},{id:'account',label:'My Account',dot:T.t3},
  ],
  manager:[
    {id:'queue',label:'Case Queue',dot:T.red},{id:'casedetail',label:'Case Detail',dot:T.red,hidden:true},
    {id:'sla',label:'SLA Tracker',dot:T.red},{id:'assign',label:'Assign Officers',dot:T.blue},{id:'account',label:'My Account',dot:T.t3},
  ],
  officer:[
    {id:'home',label:'Today',dot:T.green},{id:'sync',label:'Sync Status',dot:T.blue},{id:'handover',label:'Shift Handover',dot:T.t3},
    {id:'ussd',label:'USSD Simulator',dot:T.lime},{id:'account',label:'My Account',dot:T.t3},
  ],
  landlord:[
    {id:'overview',label:'Overview',dot:T.green},{id:'register',label:'Register Property',dot:T.lime},
    {id:'tenants',label:'Tenants',dot:T.blue},{id:'payments',label:'Payments',dot:T.green},{id:'tax',label:'Tax Summary',dot:T.amber},{id:'account',label:'My Account',dot:T.t3},
  ],
  tenant:[
    {id:'mytenancy',label:'My Tenancy',dot:T.green},{id:'tracker',label:'Complaint Tracker',dot:T.amber},{id:'receipts',label:'Payment Receipts',dot:T.green},
    {id:'verify',label:'Verify Card',dot:T.green},{id:'eviction',label:'Eviction & Legal',dot:T.red},{id:'notifications',label:'Notifications',dot:T.blue},
    {id:'ussd',label:'USSD Simulator',dot:T.lime},{id:'complaint',label:'File Complaint',dot:T.red},{id:'calc',label:'Advance Calc',dot:T.amber},{id:'account',label:'My Account',dot:T.t3},
  ],
};

// ═════════════════════════════════════════════════════════════════════════════
// MAIN APPLICATION
// ═════════════════════════════════════════════════════════════════════════════
export default function RentGuard() {
  const [appState, setAppState] = useState({ currentUser:null, role:'admin', navPage:'dashboard', selectedCase:null });
  const { currentUser, role, navPage, selectedCase } = appState;
  const [toasts, setToasts] = useState([]);
  const [showScenario, setShowScenario] = useState(false);
  const showToast = (msg, type='success') => { const id=Date.now()+Math.random(); setToasts(prev=>[...prev.slice(-3),{id,msg,type}]); setTimeout(()=>setToasts(prev=>prev.filter(t=>t.id!==id)),3500); };
  useEffect(() => { setGlobalToast(showToast); }, []);
  const dismissToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));
  const handleRole = (r) => { const a=DEMO_ACCOUNTS.find(x=>x.id===r); setAppState(s=>({...s,role:r,currentUser:a||s.currentUser,navPage:(NAV[r]||[]).filter(n=>!n.hidden)[0]?.id||'dashboard',selectedCase:null})); };
  const handleNav = (id) => setAppState(s=>({...s,navPage:id,selectedCase:null}));
  const handleSelectCase = (c) => setAppState(s=>({...s,selectedCase:c,navPage:'casedetail'}));
  const handleLogin = (account) => { setAppState({currentUser:account,role:account.id,navPage:(NAV[account.id]||[]).filter(n=>!n.hidden)[0]?.id||'dashboard',selectedCase:null}); if(account.id==='admin') setShowScenario(true); };
  const handleLogout = () => setAppState({currentUser:null,role:'admin',navPage:'dashboard',selectedCase:null});
  const handleScenarioNav = (r, page) => { handleRole(r); setTimeout(() => handleNav(page), 50); };

  if (!currentUser) return (<div><GlobalCSS /><LoginScreen onLogin={handleLogin} /></div>);

  const navItems = (NAV[role]||[]).filter(n=>!n.hidden);
  const roleColor = ROLES.find(r=>r.id===role)?.color||T.green;

  // ── CONTENT ROUTING (ALL ROLES, ALL PAGES) ─────────────────────────────
  const AdminContent = () => {
    if (navPage==='dashboard') return <AdminDashboard onSelectCase={handleSelectCase} />;
    if (navPage==='activity') return <ActivityFeed />;
    if (navPage==='regions') return <AdminRegions />;
    if (navPage==='cases') return <AdminCases onSelectCase={handleSelectCase} />;
    if (navPage==='flow') return <EnforcementFlow />;
    if (navPage==='officers') return <AdminOfficers />;
    if (navPage==='gra') return <GRAExport />;
    if (navPage==='audit') return <AdminAudit />;
    if (navPage==='settings') return <SettingsPage />;
    if (navPage==='account') return <AccountSettings currentUser={currentUser} onLogout={handleLogout} />;
    return <AdminDashboard onSelectCase={handleSelectCase} />;
  };
  const ManagerContent = () => {
    if (navPage==='casedetail'&&selectedCase) return <CaseDetail caseData={selectedCase} onBack={()=>handleNav('queue')} />;
    if (navPage==='sla') return <SLATracker />;
    if (navPage==='assign') return <AssignOfficers />;
    if (navPage==='account') return <AccountSettings currentUser={currentUser} onLogout={handleLogout} />;
    return <CaseManager onSelectCase={handleSelectCase} />;
  };
  const OfficerContent = () => {
    if (navPage==='sync') return <OfficerSync />;
    if (navPage==='handover') return <ShiftHandover />;
    if (navPage==='ussd') return <div className="fade-in"><SectionHeader title="USSD Simulator" sub="*714*1# — works on any phone" /><div className="rg-mw" style={{maxWidth:400}}><div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,overflow:'hidden',height:520}}><USSDSimulator /></div></div></div>;
    if (navPage==='account') return <AccountSettings currentUser={currentUser} onLogout={handleLogout} />;
    return <OfficerMobile />;
  };
  const LandlordContent = () => {
    if (navPage==='register') return <LandlordRegistration />;
    if (navPage==='tenants') return <LandlordTenants />;
    if (navPage==='payments') return <LandlordPayments />;
    if (navPage==='tax') return <LandlordTaxSummary />;
    if (navPage==='account') return <AccountSettings currentUser={currentUser} onLogout={handleLogout} />;
    return <LandlordPortal onNav={handleNav} />;
  };
  const TenantContent = () => {
    if (navPage==='mytenancy') return <TenantDashboard onNav={handleNav} />;
    if (navPage==='tracker') return <ComplaintTracker />;
    if (navPage==='receipts') return <PaymentReceipt />;
    if (navPage==='eviction') return <EvictionAndLegalAid />;
    if (navPage==='notifications') return <NotificationCentre />;
    if (navPage==='ussd') return <div className="fade-in"><SectionHeader title="USSD Simulator" sub="*714*1# — works on any phone" /><div className="rg-mw" style={{maxWidth:400}}><div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,overflow:'hidden',height:520}}><USSDSimulator /></div></div></div>;
    if (navPage==='account') return <AccountSettings currentUser={currentUser} onLogout={handleLogout} />;
    return <TenantPortal onNav={handleNav} />;
  };
  const mainContent = () => {
    // CRITICAL: Call these as FUNCTIONS, not as <Components/>.
    // They're defined inside the render body, so rendering them as JSX
    // components would create new types each render → unmount/remount loop.
    if (role==='admin') return AdminContent();
    if (role==='manager') return ManagerContent();
    if (role==='officer') return OfficerContent();
    if (role==='landlord') return LandlordContent();
    if (role==='tenant') return TenantContent();
    return AdminContent();
  };

  // ── SINGLE RETURN — content rendered ONCE, chrome toggled by CSS ────────
  return (<div className="rg-root"><GlobalCSS /><ToastDisplay toasts={toasts} onDismiss={dismissToast} />
    {showScenario && <GuidedScenario onClose={() => setShowScenario(false)} onNavigate={handleScenarioNav} />}

    {/* MOBILE HEADER — visible <=768px only */}
    <div className="rg-mob-header">
      <MobileTopBar currentUser={currentUser} navPage={navPage} role={role} onAccount={()=>handleNav('account')} />
    </div>

    <div className="rg-app">
      {/* SIDEBAR — hidden <=768px */}
      <div className="rg-sidebar">
        <div style={{padding:'16px 16px 12px',borderBottom:`1px solid ${T.border}`}}><Logo /></div>
        <div style={{padding:'8px 0',flex:1,overflowY:'auto'}}>
          <div style={{padding:'6px 16px 8px'}}><div style={{fontSize:9,fontWeight:700,color:T.t3,letterSpacing:1.5,textTransform:'uppercase'}}>Navigation</div></div>
          {navItems.map(item => { const active=navPage===item.id||(navPage==='casedetail'&&item.id==='queue'); const badge=(item.id==='queue'||item.id==='cases')?CASES.filter(c=>c.status==='received').length:item.id==='notifications'?2:null; return (<button key={item.id} className={`rg-nav-item${active?' active':''}`} onClick={()=>handleNav(item.id)} style={{justifyContent:'space-between'}}><div style={{display:'flex',alignItems:'center',gap:10}}><div className="rg-nav-dot" style={{background:active?roleColor:item.dot,opacity:active?1:0.4}} />{item.label}</div>{badge>0&&<span style={{fontFamily:F.mono,fontSize:9,fontWeight:700,color:T.red,background:'rgba(229,72,58,0.15)',borderRadius:10,padding:'1px 6px'}}>{badge}</span>}</button>); })}
        </div>
        <div style={{borderTop:`1px solid ${T.border}`,padding:12}}>
          {role==='admin' && <button onClick={() => setShowScenario(true)} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',gap:8,padding:'8px 10px',background:T.limeFade,border:`1px solid rgba(200,232,48,0.2)`,borderRadius:6,cursor:'pointer',marginBottom:8,color:T.lime,fontFamily:F.mono,fontSize:10,fontWeight:700,letterSpacing:0.5}}>▶ Replay Guided Scenario</button>}
          <div style={{padding:'8px 10px',background:T.card,borderRadius:6,border:`1px solid ${T.border}`}}><div style={{display:'flex',alignItems:'center',gap:5,marginBottom:4}}><div style={{width:5,height:5,borderRadius:'50%',background:T.green}} className="pulse" /><div style={{fontSize:9,fontWeight:700,color:T.green,letterSpacing:1,textTransform:'uppercase'}}>Connected</div></div><div style={{fontFamily:F.mono,fontSize:10,color:T.t2,marginBottom:2}}>rentcontrol.mwh.gov.gh</div><div style={{fontFamily:F.mono,fontSize:9,color:T.t3,marginBottom:4}}>15 offices · Sync: 2 min ago</div><div style={{borderTop:`1px solid ${T.border}`,paddingTop:4,display:'flex',justifyContent:'space-between'}}><span style={{fontFamily:F.mono,fontSize:9,color:T.t3}}>Open cases</span><span style={{fontFamily:F.mono,fontSize:9,fontWeight:700,color:T.amber}}>{CASES.filter(c=>c.status!=='resolved'&&c.status!=='closed').length}</span></div><div style={{display:'flex',justifyContent:'space-between',marginTop:3}}><span style={{fontFamily:F.mono,fontSize:9,color:T.t3}}>Officers on shift</span><span style={{fontFamily:F.mono,fontSize:9,fontWeight:700,color:T.green}}>18</span></div></div>
        </div>
      </div>

      {/* MAIN AREA */}
      <div className="rg-main">
        {/* DESKTOP TOPBAR — hidden <=768px */}
        <div className="rg-topbar">
          <div style={{flex:1,display:'flex',alignItems:'center'}}><span style={{fontFamily:F.mono,fontSize:11,color:T.t3}}>RentGuard</span><span style={{fontFamily:F.mono,fontSize:11,color:T.border,margin:'0 8px'}}>/</span><span style={{fontFamily:F.mono,fontSize:11,color:T.t2}}>{ROLES.find(r=>r.id===role)?.label}</span><span style={{fontFamily:F.mono,fontSize:11,color:T.border,margin:'0 8px'}}>/</span><span style={{fontFamily:F.mono,fontSize:11,color:T.t1,fontWeight:600}}>{navPage==='casedetail'&&selectedCase?selectedCase.id.replace('RC-2026-ACC-','RC-'):navItems.find(n=>n.id===navPage)?.label||navPage}</span></div>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <div style={{display:'flex',alignItems:'center',gap:5}}><div style={{width:6,height:6,borderRadius:'50%',background:T.green}} className="pulse"/><span style={{fontFamily:F.mono,fontSize:9,color:T.t3}}>LIVE</span></div>
            <div style={{width:1,height:18,background:T.border}}/>
            <span style={{fontFamily:F.mono,fontSize:9,color:T.t3}}>Act 220 · PNDCL 138</span>
            <div style={{width:1,height:18,background:T.border}}/>
            <RoleSwitcher role={role} setRole={handleRole} />
            <div style={{width:1,height:18,background:T.border}}/>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <div style={{width:26,height:26,borderRadius:'50%',background:`${currentUser.color||T.green}20`,border:`1.5px solid ${currentUser.color||T.green}`,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:F.mono,fontSize:9,fontWeight:700,color:currentUser.color||T.green}}>{currentUser.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
              <button onClick={handleLogout} style={{background:'transparent',border:`1px solid ${T.border}`,borderRadius:4,padding:'3px 8px',fontFamily:F.mono,fontSize:9,color:T.t3,cursor:'pointer',letterSpacing:1}}>SIGN OUT</button>
            </div>
          </div>
        </div>

        {/* CONTENT — rendered exactly ONCE */}
        <div className="rg-content" style={{padding:role==='officer'&&navPage==='home'?0:undefined}}>
          {mainContent()}
        </div>
      </div>
    </div>

    {/* MOBILE BOTTOM TABS — visible <=768px only */}
    <div className="rg-mob-footer">
      <MobileBottomTabs role={role} navPage={navPage} onNav={handleNav} />
    </div>
  </div>);
}
